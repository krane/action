import * as core from "@actions/core";

import { KraneClient } from "@krane/common";
import { resolveConfig } from "./config";

const run = async () => {
  const url = core.getInput("url");
  const token = core.getInput("token");
  const file = core.getInput("file");

  const config = await resolveConfig(file);
  if (config.scale == null) {
    config.scale = 1;
  }

  console.log(`Deploying to Krane instance ${url}`);
  console.log(` Deployment configuration \n${JSON.stringify(config, null, 2)}`);

  const client = new KraneClient(url, token);

  console.log(`Saving ${config.name} configuration`);
  await client.saveDeployment(config);
  console.log(`Configuration for ${config.name} saved succesfully`);

  console.log(`Triggering new run for ${config.name}`);
  await client.runDeployment(config.name);
  console.log(`Deployment ${config.name} triggered succesfully`);
};

run().catch((error: Error) => core.setFailed(error.message));
