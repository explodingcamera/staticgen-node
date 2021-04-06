const { spawn } = require("child_process");
const binary = require("./select-bin");

const child = spawn(binary, process.argv.slice(2));

child.stderr.pipe(process.stderr);
child.stdout.pipe(process.stdout);
child.on("close", process.exit);
