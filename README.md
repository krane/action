# Automate Krane deployments

This action allows you to automate Krane deployments.

Once you build and push your image to a registry (ie. Docker Hub), you'll be able to use this action to trigger re-deployments.

## Inputs

### `url`

URL of the Krane instance

- required: `true`

### `token`

Token used for authenticated Krane requests

- required: `true`

### `configPath`

Path to Krane [deployment config](https://www.krane.sh/#/deployment-configuration)

- required: `false`
- default: `./deployment.json`

## Example usage

```
uses: actions/krane-action
with:
    url: 'http://example.com:8500'
    token: $KRANE_TOKEN
    configPath: './deployment.json'
```
