const core = require("@actions/core");

const { runDeployment } = require("./deployment");
const { resolveConfig } = require("./config");

const main = async () => {
  const url = core.getInput("url");
  const token = core.getInput("token");
  const config = resolveConfig(core.getInput("file"));

  const response = await runDeployment(url, token, config);
  if (response.status != 202) {
    throw new Error(`Deployment was not accepted, ${response.Error}`);
  }
};

main().catch((error) => core.setFailed(error.message));
