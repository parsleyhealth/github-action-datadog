const core = require('@actions/core');
const github = require('@actions/github');

try {
    // `who-to-greet` input defined in action metadata file
    const key = core.getInput('datadog_api_key');
    console.log(`Hello ${key}}!`);
    const time = (new Date()).toTimeString();
    core.setOutput("response", key);
    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload: ${payload}`);
} catch (error) {
    core.setFailed(error.message);
}
