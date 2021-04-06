const shell = require("shelljs");


if (!shell.which('git') || !shell.which('goreleaser') || !shell.which('go')) {
  shell.echo('Sorry, this script requires git, goreleaser and go');
  shell.exit(1);
}

console.log("> removing old files");
shell.rm("-rf", "./staticgen")
console.log("> cloning staticgen");
shell.exec(`git clone --depth 1 --branch v1.1.0 https://github.com/tj/staticgen`, {silent: true})
console.log("> applying windows support patch");
shell.exec("git apply remove-syscalls.patch --directory staticgen")
console.log("> building binaries");
shell.exec("goreleaser --snapshot --skip-publish --rm-dist")