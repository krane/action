![Action](https://user-images.githubusercontent.com/21694364/103450363-49f2ae80-4c83-11eb-82a9-7fcbb8a2f4d0.png)

The Krane Github Action allows you to interact with a Krane instance to automate deployments.

Typically in your pipelines you'll have a _build image_ step and a _push image_ step. The last step ideally being auto-deploying your apps in a true CI/CD fashion... Since GitHub actions lets you control when to trigger an action, you could for example enable this action on merges to master.

```
uses: actions/krane
with:
    url: ${{ secrets.KRANE_URL }}
    token: ${{ secrets.KRANE_TOKEN }}
    file: ./deployment.json
```

### Inputs

#### `url`

URL of the Krane instance

- required: `true`

#### `token`

Token used for authenticated Krane requests

- required: `true`

#### `file`

Path to Krane [deployment config](https://www.krane.sh/#/deployment-configuration)

- required: `false`
- default: `./deployment.json`
