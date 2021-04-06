const { spawn } = require('child_process');
const os = require('os');
const { join } = require('path');

let arch = os.arch()
if (arch === "x64") arch = "amd64"

let platform = os.platform()
if (platform === "win32") platform = "windows"

if (!["amd64", "arm64"].includes(arch))
  throw new Error("Currently, only arm64 and amd64 based architectures are supported")

  if (!["darwin", "linux", "windows"].includes(platform))
  throw new Error("Currently, only osx, linux and windows are supported")

const staticgenBinary = join(__dirname, "./dist/", `staticgen_${platform}_${arch}/staticgen`)
const child = spawn(staticgenBinary, process.argv.slice(2));

child.stderr.pipe(process.stderr);
child.stdout.pipe(process.stdout);
child.on('close', process.exit);
