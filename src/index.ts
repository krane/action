import * as core from "@actions/core";

import { KraneClient } from "@krane/common";
import { resolveConfig } from "./config";
import { KraneAction } from "./action";

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
