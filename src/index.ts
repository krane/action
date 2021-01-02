import core from "@actions/core";

import { KraneClient } from "@krane/common";
import { resolveConfig } from "./config";

const run = async () => {
  const url = core.getInput("url");
  const token = core.getInput("token");
  const file = core.getInput("file");
  const config = await resolveConfig(file);

  const client = new KraneClient(url, token);
  await client.saveDeployment(config);
  await client.runDeployment(config.name);
};

run().catch((error) => core.setFailed(error.message));
