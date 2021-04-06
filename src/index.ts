import { spawn } from "child_process";
import { resolve } from "node:path";
import binary from "./select-bin";

export interface GenerateOptions {
  silent?: boolean;
  exitOnFail?: boolean;
  dir?: string; // absolute path
  timeout?: string;
}

export interface ServeOptions {
  silent?: boolean;
  exitOnFail?: boolean;
  dir?: string; // absolute path
  address?: string;
}

export const generate = ({
  silent = false,
  exitOnFail = true,
  dir = ".",
  timeout = "1m",
}: GenerateOptions = {}) => {
  const child = spawn(binary, [
    "generate",
    `--chdir="${resolve(dir)}"`,
    `--timeout="${timeout}"`,
  ]);

  if (!silent) {
    child.stderr.pipe(process.stderr);
    child.stdout.pipe(process.stdout);
  }

  if (exitOnFail) child.on("close", process.exit);
};

export const serve = ({
  address = "localhost:3000",
  dir = ".",
  exitOnFail = true,
  silent = false,
}: ServeOptions = {}) => {
  const child = spawn(binary, [
    "serve",
    `--chdir="${resolve(dir)}"`,
    `--address="${address}"`,
  ]);

  if (!silent) {
    child.stderr.pipe(process.stderr);
    child.stdout.pipe(process.stdout);
  }

  if (exitOnFail) child.on("close", process.exit);
};
