import fs from 'fs';
import { execFileSync } from 'child_process';

export function git(cwd, ...args: string[]) {
  return execFileSync('git', args, { cwd, encoding: 'utf8' });
}

export function gitWithInput(args: string[], input: string) {
  return execFileSync('git', args, { input, encoding: 'utf8' });
}

/**
 * Shallow clone a path inside a repo
 */
export default function gitShallow({ repositoryUrl, branch = 'master', repositoryPath, workingDirectory }) {
  if (!fs.existsSync(workingDirectory)) {
    git(null, 'clone', '--filter=blob:none', '--no-checkout', repositoryUrl, workingDirectory);
    git(workingDirectory, 'sparse-checkout', 'init', '--cone');
    git(workingDirectory, 'sparse-checkout', 'set', repositoryPath);
  }
  git(workingDirectory, 'checkout', branch);
  git(workingDirectory, 'pull');
  const hash = git(workingDirectory, 'ls-tree', 'HEAD', repositoryPath);
  const match = hash.match(/^\S+\s+\S+\s+(\S+)\s*/);
  return match[1];
}
