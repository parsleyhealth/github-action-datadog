const core = require('@actions/core');
const github = require('@actions/github');
const httpm = require('@actions/http-client');

try {
    // `who-to-greet` input defined in action metadata file
    const datadog_api_key = core.getInput('datadog_api_key');
    const parsley_environment = core.getInput('parsley_environment');
    const parsley_componentname = core.getInput('parsley_componentname');
    const datadog_uri = "https://api.datadoghq.com/api/v1/series?api_key=" + datadog_api_key
    const current_time = (new Date()).toTimeString();

    _http = new httpm.HttpClient('http-client-tests');

    var res = _http.get('http://httpbin.org/get');
    var response = res.resolve;


    var body = response.readBody();
    console.log(body);

    var obj = JSON.parse(body);
    const time = (new Date()).toTimeString();
    core.setOutput("datadog_response", obj);


    console.log(`Hi ${obj}`);


    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2)
} catch (error) {
    core.setFailed(error.message);
}
