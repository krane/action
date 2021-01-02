import { promises } from "fs";
import { Config } from "@krane/common";

const readFile = promises.readFile;

export const resolveConfig = async (path: string) => {
  const rawConfig = await readFile(path, "utf8");
  const config = JSON.parse(rawConfig) as Config;
  applyConfigDefaults(config);
  return config;
};

const applyConfigDefaults = (config: Config) => {
  if (config.tag == null) {
    config.tag = "latest";
  }

  if (config.scale == null) {
    config.scale = 1;
  }
};
