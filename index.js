
const core = require("@actions/core");
const github = require("@actions/github");
const httpm = require("@actions/http-client");

const run = async () => {
    const datadog_api_key = core.getInput("datadog_api_key");
    const datadog_metric_uri = "https://api.datadoghq.com/api/v1/series?api_key=" + datadog_api_key
    const datadog_event_uri  = "https://api.datadoghq.com/api/v1/events?api_key=" + datadog_api_key
    const parsley_componentname = core.getInput("parsley_componentname");
    const parsley_environment = core.getInput("parsley_environment");

    let payload = await github.context.payload;

    const current_time = parseInt(Math.round((new Date()).getTime() / 1000));
    const reponame = payload.repository.full_name;
    const ref_path = payload.ref;
    const branchname = ref_path.split('/').pop();
    const gitsha = payload.after;
    const gitauthor = payload.commits[0]['author']['username'];
    const head_commit_timestamp = Date.parse(payload.head_commit['timestamp']);
    const last_commit_epoch = parseInt(Math.round(head_commit_timestamp / 1000));
    const lead_time = (current_time - last_commit_epoch);

    const event_title = "Deploy event for " + parsley_componentname + " in env: " + parsley_environment;
    const event_text = "Deploy event for " + parsley_componentname + " in env: " + parsley_environment;
    const event_priority = "normal";

    const http = new httpm.HttpClient("http-client-tests");

    const parsley_tags = [
        "environment:" + parsley_environment,
        "componentname:" + parsley_componentname,
        "reponame:" + reponame,
        "branchname:" + branchname,
        "gitsha:" + gitsha,
        "gitauthor:" + gitauthor
    ];

    let datadog_lead_time_metric_payload = JSON.stringify({
            series: [
            {
              metric: "com.parsleyhealth.cicd.deploy_lead_time",
              points: [[current_time, lead_time]],
              type: "count",
              unit: "seconds",
              interval: 20,
              host: "cicd.parsleyhealth.com",
              tags: parsley_tags
            }
            ]
    });
    let datadog_metric_payload = JSON.stringify({
            series: [
                {
                    metric: "com.parsleyhealth.cicd.deploy",
                    points: [[current_time, 1]],
                    type: "count",
                    unit: "boolean",
                    interval: 20,
                    host: "cicd.parsleyhealth.com",
                    tags: parsley_tags
                }
            ]
    });

    let datadog_event_payload = JSON.stringify({
        title: "Deploy event for " + parsley_componentname,
        text: "Deploy event for " + parsley_componentname,
        priority: "normal",
        tags: parsley_tags
    });

    var response = await http.post(datadog_metric_uri, datadog_metric_payload);
    var body1 = await response.readBody();
    core.debug(body1);

    var response = await http.post(datadog_metric_uri, datadog_lead_time_metric_payload);
    var body2 = await response.readBody();
    core.debug(body2);

    var response = await http.post(datadog_event_uri, datadog_event_payload);
    var body3 = await response.readBody();
    core.debug(body3);
    var output = {
            datadog_deploy_metric: body1,
            datadog_lead_time_metric: body2,
            datadog_deploy_event: body3
    }
    core.setOutput("datadog_response", JSON.stringify(output))
};

run();
