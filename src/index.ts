import { setFailed, getInput } from "@actions/core";

import { KraneClient } from "@krane/common";
import { resolveConfig } from "./config";

const run = async () => {
  const url = getInput("url");
  const token = getInput("token");
  const file = getInput("file");
  const config = await resolveConfig(file);

  const client = new KraneClient(url, token);
  await client.saveDeployment(config);
  await client.runDeployment(config.name);
};

run().catch((error: Error) => setFailed(error.message));
