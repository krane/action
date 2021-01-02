import * as core from "@actions/core";

import { KraneClient } from "@krane/common";
import { resolveConfig } from "./config";

const run = async () => {
  const url = core.getInput("url");
  const token = core.getInput("token");
  const file = core.getInput("file");

  const config = await resolveConfig(file);
  core.info(` Deployment configuration:\n${JSON.stringify(config, null, 2)}`);

  const client = new KraneClient(url, token);

  core.startGroup(`Save ${config.name} configuration`);
  core.info(`Saving ${config.name} configuration`);
  await client.saveDeployment(config);
  core.info(`Configuration for ${config.name} saved succesfully`);
  core.endGroup();

  core.startGroup(`Trigger deployment ${config.name}`);
  core.info(`Triggering new run for ${config.name}`);
  await client.runDeployment(config.name);
  core.info(`Deployment ${config.name} triggered succesfully`);
  core.endGroup();
};

run().catch((error: Error) => core.setFailed(error.message));
