import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";
const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const configuredBasePath = process.env.GITHUB_PAGES_BASE_PATH;
const basePath = isGitHubPages
  ? configuredBasePath === "/"
    ? ""
    : configuredBasePath ?? (repositoryName ? `/${repositoryName}` : "")
  : "";

const nextConfig: NextConfig = {
  output: isGitHubPages ? "export" : undefined,
  basePath: basePath || undefined,
  trailingSlash: isGitHubPages,
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
