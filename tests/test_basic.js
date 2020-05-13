import fs from 'fs';
import tap from 'tap';
import gitShallow from '../src';

tap.test('test_basic', async (t) => {
  t.ok(gitShallow, 'Should export a symbol');
  const sha = gitShallow({
    repositoryUrl: 'https://github.com/gas-buddy/git-shallow.git',
    repositoryPath: '.github/workflows',
    workingDirectory: 'local-test',
  });
  t.ok(sha, 'Should get a SHA as a result of the operation');
  t.ok(fs.existsSync('./local-test/.github/workflows/nodejs.yml'), 'File should exist');
  t.notOk(fs.existsSync('./local-test/src/index.js'), 'Should not fetch files outside of path');
});
