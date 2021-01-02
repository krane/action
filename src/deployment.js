const runDeployment = async (baseUrl, token, config) => {
  return await fetch(`${baseUrl}/deployment`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(config),
  });
};

module.exports = { runDeployment };
