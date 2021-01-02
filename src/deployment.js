const saveDeployment = async (baseUrl, token, config) => {
  return await fetch(`${baseUrl}/deployments`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(config),
  });
};

const runDeployment = async (baseUrl, token, deployment) => {
  return await fetch(`${baseUrl}/deployments/${deployment}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });
};

module.exports = { saveDeployment, runDeployment };
