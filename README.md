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

## Usage

### CLI
This package adds a new binary called staticgen which can be used in package.json scripts and using e.g `yarn run staticgen`
### API
This npm package also includes a JS API and typescript definitions. Currently, only synchronous functions are available, promise versions might be added later on.

NOTE: the API can be a bit weird and is build around a specific usecase I have @ [snowstorm](https://github.com/explodingcamera/snowstorm).

```ts
// ES-Modules
import staticgen from "staticgen-node";
// Common-JS
const staticgen = require("staticgen-node");

staticgen.generate();
staticgen.serve();
```