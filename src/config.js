const { promises: fs } = require("fs");

const resolveConfig = async (path) => {
  const rawConfig = await fs.readFile(path, "utf8");
  return JSON.parse(rawConfig);
};

module.exports = { resolveConfig };
