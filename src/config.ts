import { promises } from "fs";
import { Config } from "@krane/common";

const readFile = promises.readFile;

export const resolveConfig = async (path: string) => {
  const rawConfig = await readFile(path, "utf8");
  return JSON.parse(rawConfig);
};
