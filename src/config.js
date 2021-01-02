const { promises: fs } = require("fs");

const resolveConfig = async (path) => {
  return await fs.readFile(path, "utf8");
};

module.exports = { resolveConfig };
