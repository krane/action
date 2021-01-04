import * as core from "@actions/core";
import { KraneClient, Config } from "@krane/common";

export class KraneAction {
  private client: KraneClient;
  private config: Config;

  constructor(client: KraneClient, config: Config) {
    this.client = client;
    this.config = config;
  }

  async saveDeployment() {
    const deployment = this.config.name;

    core.startGroup(`Saving configuration for deployment ${deployment}`);
    core.info(`Configuration:\n${JSON.stringify(this.config, null, 2)}`);
    await this.client.saveDeployment(this.config);
    core.info(`Configuration for deployment ${deployment} saved succesfully`);
    core.endGroup();
  }

  async runDeployment() {
    const deployment = this.config.name;

    core.startGroup(`Triggering deployment ${deployment}`);
    core.info(`Triggering new run for ${deployment}`);
    await this.client.runDeployment(deployment);
    core.info(`Deployment ${deployment} triggered succesfully`);
    core.endGroup();
  }
}
