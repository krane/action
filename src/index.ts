import * as core from "@actions/core";

import { KraneClient } from "@krane/common";
import { KraneAction } from "./action";
import { resolveConfig } from "./config";

const run = async () => {
  const endpoint = core.getInput("endpoint");
  const token = core.getInput("token");
  const file = core.getInput("file");

  const config = await resolveConfig(file);

  const client = new KraneClient(endpoint, token);
  const action = new KraneAction(client, config);

  await action.saveDeployment();
  await action.runDeployment();
};

run().catch((error: Error) => core.setFailed(error.message));
