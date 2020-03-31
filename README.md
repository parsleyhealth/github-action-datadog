# Hello world javascript action

This action reports Parsleyhealth cicd metrics and events to datadog

## Inputs


### `datadog-api-key`: 

**Required** The name of the datadog api key.

**Example:**  ${{ secrets.DATADOG_API_KEY_STAGING }}
### `parsley-componentname`
**Required** The name of the parsley componentname.

**Example:**  cicd

### `parsley-environment`
**Required** The name of the parsley environment.

**Example:**  staging

## Outputs

### `datadog-response`

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
          datadog-api-key: ${{ secrets.DATADOG_API_KEY_STAGING }}
          parsley-componentname: cicd
          parsley-environment: "staging"
```
