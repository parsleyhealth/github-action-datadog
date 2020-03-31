# Hello world javascript action

This action reports Parsleyhealth cicd metrics and events to datadog

## Inputs


### `datadog_api_key`: ${{ secrets.DATADOG_API_KEY_STAGING }}
**Required** The name of the datadog api key.

### `parsley_componentname`: cicd
**Required** The name of the parsley componentname.

### `parsley_environment`: "staging"
**Required** The name of the parsley environment.

## Outputs

### `datadog_response`

Datadog respone

## Example usage

```
on: [push]

jobs:
  deploy_job:
    runs-on: ubuntu-latest
    name: A test datadog
    steps:
      - name: github_action_datadog
        id: hello
        uses: parsleyhealth/github-action-datadog@v1
        with:
          datadog_api_key: ${{ secrets.DATADOG_API_KEY_STAGING }}
          parsley_componentname: cicd
          parsley_environment: "staging"
```
