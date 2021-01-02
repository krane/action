const core = require("@actions/core");

const { saveDeployment, runDeployment } = require("./deployment");
const { resolveConfig } = require("./config");

const main = async () => {
  const url = core.getInput("url");
  const token = core.getInput("token");
  const config = resolveConfig(core.getInput("file"));

  // save the deployment configuration
  const saveRes = await saveDeployment(url, token, config);
  if (!saveRes.ok) {
    throw new Error(
      `Unable to save deployment configuration, ${response.Error}`
    );
  }

  // run the deployment re-creating any container resources
  const deployment = config["name"];
  const runRes = await runDeployment(url, token, deployment);
  if (runRes.status != 202) {
    throw new Error(`Unable to run deployment, ${response.Error}`);
  }
};

main().catch((error) => core.setFailed(error.message));
