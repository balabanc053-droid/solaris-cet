export const GITHUB_API_BASE = "https://api.github.com";

export const commitToGithub = async (
  token: string,
  owner: string,
  repo: string,
  path: string,
  message: string,
  content: string,
  sha?: string
) => {
  const response = await fetch(`${GITHUB_API_BASE}/repos/${owner}/${repo}/contents/${path}`, {
    method: "PUT",
    headers: {
      Authorization: `token ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
      content: btoa(content),
      sha,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to commit to GitHub");
  }

  return response.json();
};

export const getRepoContent = async (token: string, owner: string, repo: string, path: string) => {
  const response = await fetch(`${GITHUB_API_BASE}/repos/${owner}/${repo}/contents/${path}`, {
    headers: {
      Authorization: `token ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch repo content");
  }

  return response.json();
};

export const listUserRepos = async (token: string) => {
  const response = await fetch(`${GITHUB_API_BASE}/user/repos?sort=updated&per_page=100`, {
    headers: {
      Authorization: `token ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch repositories");
  }

  return response.json();
};
