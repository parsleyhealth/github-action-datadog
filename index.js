const core = require('@actions/core');');
const http = require('http');


try {
    // `who-to-greet` input defined in action metadata file
    const datadog_api_key = core.getInput('datadog_api_key');
    const parsley_environment = core.getInput('parsley_environment');
    const parsley_componentname = core.getInput('parsley_componentname');
    const datadog_uri = "https://api.datadoghq.com/api/v1/series?api_key=" + datadog_api_key
    const current_time = (new Date()).toTimeString();
    const keepAliveAgent = new http.Agent({ keepAlive: true });

    const postData =  JSON.stringify({
        'msg': 'Hello World!'
    });

    const options = {
        hostname: 'www.google.com',
        agent: keepAliveAgent,
        port: 80,
        path: '/upload',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(postData)
        }
    };

    const req = http.get(options, (res) => {
        console.log(`STATUS: ${res.statusCode}`);
        console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
            console.log(`BODY: ${chunk}`);
        });
        res.on('end', () => {
            console.log('No more data in response.');
        });
    });

    req.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
    });

// Write data to request body
    req.write(postData);
    req.end();
    //
    // switch(core.getInput('datadog_type')) {
    //     case 'event':
    //         // code block
    //         const event_title = core.getInput('event_title');
    //         const event_text = core.getInput('event_text');
    //         const event_priority = core.getInput('event_priority');
    //         const event_tags = core.getInput('event_tags');
    //         const alert_type = core.getInput('alert_type');
    //
    //         break;
    //     case 'metric':
    //         const metric_name = core.getInput('metric_name');
    //         const metric_value = core.getInput('metric_value');
    //         const metric_type = core.getInput('metric_type');
    //         const metric_interval = core.getInput('metric_interval');
    //         const metric_host = core.getInput('metric_host');
    //         const metric_tags = core.getInput('metric_tags');
    //
    //
    //         var datadog_payload = { 'series': [{
    //                 'metric': metric_name,
    //                 'points': [[current_time, metric_value]],
    //                 'type':  metric_type,
    //                 'interval': metric_interval,
    //                 'host': metric_host,
    //                 'tags': metric_tags
    //             }]
    //         };
    //         request.queryParams.datadog_api_key = datadog_api_key
    //         response.content = '';
    //         response.headers['Content-Type'] = 'application/json';
    //         resp = httpClient.post(datadog_uri, datadog_payload);
    //         var body = resp.content.asJSON;
    //        // var response =
    //         console.log(`response ${body}`)
    //
    //
    //     // code block
    // }
    //
    // console.log(`Hello  ${datadog_api_key} ${parsley_componentname}   ${parsley_environment}  ${event_title} ${event_text} ${event_priority} ${alert_type} `);
    //
    // console.log(`The event payload: ${payload}`);
    //

} catch (error) {
    core.setFailed(error.message);
}


// current_time=`date +%s`
// METRIC_JSON="{ \"series\":  [{ \"metric\":\"${METRIC_NAME}\",
//                               \"points\":[[$current_time,${METRIC_VALUE}]],
//                               \"type\":\"${METRIC_TYPE}\",
//                               \"interval\": ${METRIC_INTERVAL},
//                               \"host\":\"${METRIC_HOST}\",
//                               \"tags\": ${METRIC_TAGS}
// }]
// }"
//
// DATADOG_URL="https://api.datadoghq.com/api/v1/series?api_key=${DATADOG_API_KEY}"
// curl  -X POST -H "Content-type: application/json" -d "$METRIC_JSON" "$DATADOG_URL"
//

