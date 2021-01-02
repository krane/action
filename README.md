![Action](https://user-images.githubusercontent.com/21694364/103450363-49f2ae80-4c83-11eb-82a9-7fcbb8a2f4d0.png)

[Marketplace](https://github.com/marketplace/actions/krane)

The Krane Github Action allows you to automate deployments using [Krane](https://krane.sh).

Typically in your pipelines you'll have a _build image_ step and a _push image_ step. The last step ideally being auto-deploying your apps in your pipeline.

```
uses: actions/krane@v1
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

- required: `true`
