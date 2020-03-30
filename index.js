const core = require('@actions/core');
const github = require('@actions/github');
const http = require('@actions/http-client');

try {
    // `who-to-greet` input defined in action metadata file
    const datadog_api_key = core.getInput('datadog_api_key');
    const parsley_environment = core.getInput('parsley_environment');
    const parsley_componentname = core.getInput('parsley_componentname');
    const datadog_type = core.getInput('datadog_type');

    const event_title = core.getInput('event_title');
    const event_text = core.getInput('event_text');
    const event_priority = core.getInput('event_priority');
    const alert_type = core.getInput('alert_type');
    const datadog_uri = "https://api.datadoghq.com/api/v1/series?api_key=" + datadog_api_key

    console.log(`Hello  ${datadog_api_key} ${parsley_componentname}   ${parsley_environment}  ${event_title} ${event_text} ${event_priority} ${alert_type} `);
    const time = (new Date()).toTimeString();
    core.setOutput("datadog_response", datadog_api_key);
    // Get the JSON webhook payload for the event that triggered the workflow
    // const payload = JSON.stringify(github.context.payload, undefined, 2)
    var datadog_payload = {
                                    'metric': 'bar'
                            };
    console.log(`The event payload: ${payload}`);

    var json = JsonConvert.SerializeObject(datadog_payload);

    //aqui el json lo convertimos a lo que el metodo Post esta esperando
    // Indicando el tipo de Encoding y tambien el tipo de contenido que estamos enviando
    var content = new StringContent(json, Encoding.UTF8, "application/json");

    //nombre_del_script.php lo vas a cambiar con el nombre de tu script PHP
    // var response = await client.PostAsync("http://ruta_completa_de_tu_script.php", content);
    var res = http.post(datadog_uri, content);

    // expect(res.message.statusCode).toBe(200);
    // let body = res.readBody();
    // let obj = JSON.parse(body);
    // expect(obj.data).toBe(b);
    // expect(obj.url).toBe("http://httpbin.org/post");
    // done();

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

