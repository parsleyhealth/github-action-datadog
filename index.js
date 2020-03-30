const core = require("@actions/core");
const github = require("@actions/github");
const httpm = require("@actions/http-client");

const run = async () => {
  const datadog_api_key = core.getInput("datadog_api_key");
  const datadog_uri = "https://api.datadoghq.com/api/v1/series?api_key=" + datadog_api_key

  core.debug("debugging debug");

  core.debug(`datadog_api_key: ${datadog_api_key}`);

  const http = new httpm.HttpClient("http-client-tests");
  let data =  JSON.stringify({ name: 'foo' });

  const response  = await http.post(datadog_, data);
  const body = await response.readBody();
  core.debug(body);
};

run();

// try {
//   // `who-to-greet` input defined in action metadata file
//   const datadog_api_key = core.getInput("datadog_api_key");
//   const parsley_environment = core.getInput("parsley_environment");
//   const parsley_componentname = core.getInput("parsley_componentname");
//   const datadog_uri =
//     "https://api.datadoghq.com/api/v1/series?api_key=" + datadog_api_key;
//   const current_time = new Date().toTimeString();

//   switch (core.getInput("datadog_type")) {
//     case "event":
//       // code block
//       const event_title = core.getInput("event_title");
//       const event_text = core.getInput("event_text");
//       const event_priority = core.getInput("event_priority");
//       const event_tags = core.getInput("event_tags");
//       const alert_type = core.getInput("alert_type");

//       break;
//     case "metric":
//       const metric_name = core.getInput("metric_name");
//       const metric_value = core.getInput("metric_value");
//       const metric_type = core.getInput("metric_type");
//       const metric_interval = core.getInput("metric_interval");
//       const metric_host = core.getInput("metric_host");
//       const metric_tags = core.getInput("metric_tags");

//       var datadog_metric_payload = {
//         series: [
//           {
//             metric: "com.parsleyhealth.cicd.test",
//             points: [[current_time, metric_value]],
//             type: metric_type,
//             interval: metric_interval,
//             host: metric_host,
//             tags: metric_tags
//           }
//         ]
//       };

//       var json = JsonConvert.SerializeObject(datadog_metric_payload);
//       var content = new StringContent(json, Encoding.UTF8, "application/json");
//       var response = http.post(datadog_uri, content);
//       core.setOutput("datadog_response", response);

//       break;
//     default:
//     // code block
//   }

//   console.log(
//     `Hello  ${datadog_api_key} ${parsley_componentname}   ${parsley_environment}  ${event_title} ${event_text} ${event_priority} ${alert_type} `
//   );

//   console.log(`The event payload: ${payload}`);
// } catch (error) {
//   core.setFailed(error.message);
// }

// // current_time=`date +%s`
// // METRIC_JSON="{ \"series\":  [{ \"metric\":\"${METRIC_NAME}\",
// //                               \"points\":[[$current_time,${METRIC_VALUE}]],
// //                               \"type\":\"${METRIC_TYPE}\",
// //                               \"interval\": ${METRIC_INTERVAL},
// //                               \"host\":\"${METRIC_HOST}\",
// //                               \"tags\": ${METRIC_TAGS}
// // }]
// // }"
// //
// // DATADOG_URL="https://api.datadoghq.com/api/v1/series?api_key=${DATADOG_API_KEY}"
// // curl  -X POST -H "Content-type: application/json" -d "$METRIC_JSON" "$DATADOG_URL"
// //
