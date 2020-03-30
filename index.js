const core = require('@actions/core');
const github = require('@actions/github');

try {
    // `who-to-greet` input defined in action metadata file
    const datadog_api_key = core.getInput('datadog_api_key');
    const parsley_environment = core.getInput('parsley_environment');
    const parsley_componentname = core.getInput('parsley_componentname');
    const datadog_uri = "https://api.datadoghq.com/api/v1/series?api_key=" + datadog_api_key
    const current_time = (new Date()).toTimeString();

    console.log(`Hello ${datadog_uri}!`);
    const time = (new Date()).toTimeString();
    core.setOutput("time", time);
    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload: ${payload}`);
} catch (error) {
    core.setFailed(error.message);
}
