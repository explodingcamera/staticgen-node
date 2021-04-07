# StaticGen-Node

StaticGen-Node is a simple wrapper around [staticgen](https://github.com/tj/staticgen) which simplifies using this tool in CI-Scenarios.

```bash
# npm
npm install -S staticgen-node

# yarn
yarn add staticgen-node
```

Currently, the latest binaries for linux, osx and windows for amd64 and arm64 are included in the npm package (I might change this in a later version to download the binarys on runtime).

StaticGen-Node also includes a couple of small changes to staticgen to improve the tool for CI, like windows support and all config variables are now also configurable using flags.