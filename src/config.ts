import * as core from "@actions/core";
import { promises } from "fs";
import { Config } from "@krane/common";

const readFile = promises.readFile;

export const resolveConfig = async (path: string) => {
  const rawConfig = await readFile(path, "utf8");
  const config = JSON.parse(rawConfig) as Config;

  const tag = core.getInput("tag") ?? "latest";
  if (config.tag == null) {
    config.tag = tag;
  }

  if (config.scale == null) {
    config.scale = 1;
  }

  return config;
};
