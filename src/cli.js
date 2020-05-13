#!/usr/bin/env node
/* eslint-disable no-console */
import gitShallow from '.';

const [repoAndBranch, repositoryPath, workingDirectory] = process.argv.slice(2);

if (!repositoryPath || !repoAndBranch || !workingDirectory) {
  console.error(`
Usage:
  npx git-shallow <repository_url>[#<branch_name>] <path_in_repo> <local_path>

`);
  process.exit(-1);
}

const [repositoryUrl, branch] = repoAndBranch.split('#');

const request = {
  repositoryPath,
  repositoryUrl,
  workingDirectory,
};

if (branch) {
  request.branch = branch;
}

gitShallow(request);
