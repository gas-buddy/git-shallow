import fs from 'fs';
import tap from 'tap';
import gitShallow from '../src';

tap.test('test_basic', async (t) => {
  t.ok(gitShallow, 'Should export a symbol');
  gitShallow({
    repositoryUrl: 'git@github.com:gas-buddy/git-shallow.git',
    repositoryPath: '.github/workflows',
    workingDirectory: 'local-test',
  });
  t.ok(fs.existsSync('local-test/.github/workflows/nodejs.yaml'), 'File should exist');
  t.notOk(fs.existsSync('local-test/package.json'), 'Should not fetch files outside of path');
});
