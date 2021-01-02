import { Config } from "@krane/common";
import { promises } from "fs";

const readFile = promises.readFile;

export const resolveConfig = async (path: string) => {
  const rawConfig = await readFile(path, "utf8");
  return JSON.parse(rawConfig) as Config;
};
