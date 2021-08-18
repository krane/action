<img src="https://github.com/krane/krane/blob/main/docs/assets/krane-wordmark.png?raw=true" width="350">

> The [Krane](https://github.com/krane/krane) Github Action to continuously deploy changes

[Marketplace](https://github.com/marketplace/actions/krane)

Typically in your pipelines you'll have a _build image_ step and a _push image_ step. The last step deploying your changes to a target environment or machine. Below is an example setting up the Krane Github Action. 

```yml
on:
  push:
    branches:
      - main
jobs:
  deploy-to-krane:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: krane/action@master
        with:
          endpoint: https://krane.example.com
          token: ${{ secrets.KRANE_TOKEN }}
          file: ./deployment.json
          tag: latest
```

| Input    | Description                                                                              | Required                 |
| -------- | ---------------------------------------------------------------------------------------  | ------------------------ |
| endpoint | Endpoint to the Krane instance, for example https://krane.example.com                    | true                     |
| token    | Token used for authenticated Krane requests                                              | true                     |
| file     | Path to Krane [deployment config](https://docs.krane.sh/#/docs/deployment)               | true                     |
| tag      | Image tag to use when triggering new deployment                                          | false (default `latest`) |

## Complete Example

The following builds and publishes and image to Docker then triggers a deployment with Krane.

`.github/workflows/deploy.yml`

```yml
name: deploy

on:
  push:
    branches:
      - main

jobs:
  build-and-publish-to-docker:
    name: Publish Docker image
    runs-on: ubuntu-latest
    steps:
      - name: Setup Docker Buildx
        uses: docker/setup-buildx-action@v1

      - name: Login to Docker
        uses: docker/login-action@v1
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}

      - name: Build and push
        uses: docker/build-push-action@v2
        with:
          push: true
          tags: my-repo/my-app:my-tag

  deploy-to-krane:
    name: Deploy to Krane
    needs: [build-and-publish-to-docker]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: krane/action@master
        with:
          endpoint: ${{ secrets.KRANE_ENDPOINT }}
          token: ${{ secrets.KRANE_TOKEN }}
          file: ./deployment.json
```

## Contributing

This GitHub action is written in Typescript using the [`@krane/common`](https://github.com/krane/common) library to interface with the Krane API.
