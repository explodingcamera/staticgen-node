const { join } = require("path");

let arch = process.arch;
if (arch === "x64") arch = "amd64";

let platform = process.platform;
if (platform === "win32") platform = "windows";

if (!["amd64", "arm64"].includes(arch))
  throw new Error(
    "Currently, only arm64 and amd64 based architectures are supported"
  );

if (!["darwin", "linux", "windows"].includes(platform))
  throw new Error("Currently, only osx, linux and windows are supported");

const staticgenBinary = join(
  __dirname,
  "../dist/",
  `staticgen_${platform}_${arch}/staticgen`
);
module.exports = staticgenBinary;
