![Action](https://user-images.githubusercontent.com/21694364/103450363-49f2ae80-4c83-11eb-82a9-7fcbb8a2f4d0.png)

[Marketplace](https://github.com/marketplace/actions/krane)

The Krane Github Action allows you to automate deployments using [Krane](https://krane.sh).

Typically in your pipelines you'll have a _build image_ step and a _push image_ step. The last step ideally _auto-deploying_ your apps in that same pipeline.

```yml
uses: krane/action@master
with:
  url: ${{ secrets.KRANE_URL }}
  token: ${{ secrets.KRANE_TOKEN }}
  file: ./deployment.json
```

| Input | Description                                                                        | Required |
| ----- | ---------------------------------------------------------------------------------- | -------- |
| url   | URL of the Krane instance                                                          | true     |
| token | Token used for authenticated Krane requests                                        | true     |
| file  | Path to Krane [deployment config](https://www.krane.sh/#/deployment-configuration) | true     |

## Complete Example

The following builds and publishes and image to Docker then deploys to Krane.

`.github/workflows/deploy.yml`

```yml
name: deploy

on:
  push:
    branches:
      - master

jobs:
  build-and-publish-to-docker:
    name: Publish Docker image
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v1
      - uses: docker/build-push-action@v1
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}
          repository: my-repo/my-image
          tags: latest
  deploy-to-krane:
    name: Deploy to Krane
    needs: [build-and-publish-to-docker]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
        with:
          repository: my-github-repo
      - uses: krane/action@master
        with:
          url: ${{ secrets.KRANE_URL }}
          token: ${{ secrets.KRANE_TOKEN }}
          file: ./deployment.json
```

## Contributing

This GitHub action is written in TypeScript using the [`@krane/common`](https://github.com/krane/common) library to interact with the Krane API.
