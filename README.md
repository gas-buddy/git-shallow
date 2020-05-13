git-shallow
===========

A package to download subdirectories from a (potentially) large repo with as little network
and disk overhead as possible. Uses git via child_process to shallow clone. Requires git
version 2.26.0 or higher. Currently only supports synchronous usage.

Usage
=====

As a module:
```
npm i git-shallow
```

```
import gitShallow from 'git-shallow';

gitShallow({
  repository: 'git@github.com:gas-buddy/git-shallow.git', // Your repo URL here
  branch: 'master',                                       // Whatever branch you want
  repositoryPath: '.github/workflows',                    // The path inside the repo to download
  workingDirectory: 'my-local-dir',                       // The local directory where the files will be based
})
```

With npx:

```
npx git-shallow git@github.com:gas-buddy/git-shallow.git#master .github/workflows my-local-dir
```

In both cases, the files will be in my-local-dir/.github/workflows, and my-local-dir/.git will exist as
well, and will make future runs faster (so try not to blow it away all the time if you don't have to).
