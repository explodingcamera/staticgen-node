import { spawn } from "child_process";
import binary from "./select-bin";

export interface BaseOptions {
  /**
   * When silent is enabled, the output of staticgen is not piped to stdout
   */
  silent?: boolean;

  /**
   * When exitOnFail is enabled, the host process calling generate will also get terminated
   */
  exitOnFail?: boolean;

  /**
   * working directory
   */
  cwd?: string;
}
export interface GenerateOptions extends BaseOptions {
  /**
   * directory is the static website output directory. Defaults to "build".
   */
  directory?: string;

  /**
   * Timeout of website generation
   */
  timeout?: string;

  /**
   * Allow404 can be enabled to opt-in to pages resulting in a 404,
   * which otherwise lead to an error.
   */
  allow404?: boolean;

  /**
   * Concurrency is the number of concurrent pages to crawl. Defaults to 30.
   */
  concurrency?: number;

  /**
   * URL is the target website to crawl. Defaults to "http://127.0.0.1:3000".
   */
  url?: string;

  /**
   * Pages is a list of paths added to crawl, typically
   * including unlinked pages such as error pages,
   * landing pages and so on.
   */
  pages: string[];
}

export interface ServeOptions extends BaseOptions {
  address?: string;
}

export const generate = (
  {
    silent = false,
    exitOnFail = true,
    cwd,
    timeout = "1m",
    directory = "build",
    allow404 = false,
    concurrency = 30,
    url = "http://127.0.0.1:3000",
    pages = [],
  }: GenerateOptions = { pages: [] }
) => {
  const child = spawn(binary, [
    "generate",
    `--timeout=${timeout}`,
    `--directory=${directory}`,
    allow404 ? `--allow404` : "",
    `--concurrency=${concurrency}`,
    `--url=${url}`,
    pages.length ? `--pages="${pages.join(" ")}"` : "",
  ], {
    cwd: cwd || process.cwd()
  });

  if (!silent) {
    child.stderr.pipe(process.stderr);
    child.stdout.pipe(process.stdout);
  }

  if (exitOnFail) child.on("close", process.exit);
};

export const serve = ({
  address = "http://localhost:3000",
  cwd,
  exitOnFail = true,
  silent = false,
}: ServeOptions = {}) => {
  const child = spawn(binary, [
    "serve",
    `--address=${address}`,
  ], {
    cwd: cwd || process.cwd()
  });

  if (!silent) {
    child.stderr.pipe(process.stderr);
    child.stdout.pipe(process.stdout);
  }

  if (exitOnFail) child.on("close", process.exit);
};
