#!/usr/bin/env node
import { createRequire } from 'module';
import { init_esm_shims } from '../chunk-2FTP7FNI.js';
import fs from 'fs';

createRequire(import.meta.url);

// src/cli/commit.ts
init_esm_shims();
var getPkgPath = () => process.cwd() + "/package.json";
var readPkg = () => JSON.parse(fs.readFileSync(getPkgPath(), "utf-8"));
var writePkg = (pkg) => fs.writeFileSync(getPkgPath(), JSON.stringify(pkg, null, 2));
var updateVersion = (pkg) => {
  const list = pkg.version.split(".");
  console.log("COMMIT_HASH: " + process.env.COMMIT_HASH);
  const shortHash = process.env.COMMIT_HASH?.substring(0, 7) ?? "unknown";
  list[2] = `${Number(list[2]) + 1}`;
  pkg.version = `${list.join(".")}-commit.${shortHash}`;
};
var setEnvVariables = (pkg) => {
  const githubEnvPath = process.env.GITHUB_ENV;
  if (!githubEnvPath) {
    throw new Error("GITHUB_ENV \u73AF\u5883\u53D8\u91CF\u672A\u5B9A\u4E49");
  }
  fs.appendFileSync(githubEnvPath, `PKG_NAME=${pkg.name}
PKG_VERSION=${pkg.version}
`);
};
var version = () => {
  console.log("\u5F00\u59CB\u6267\u884C\u7248\u672C\u66F4\u65B0...");
  const pkg = readPkg();
  console.log(`\u5F53\u524D\u7248\u672C: ${pkg.version}`);
  updateVersion(pkg);
  console.log(`\u66F4\u65B0\u540E\u7248\u672C: ${pkg.version}`);
  writePkg(pkg);
  console.log("package.json \u5199\u5165\u6210\u529F");
  setEnvVariables(pkg);
  console.log("\u73AF\u5883\u53D8\u91CF\u8BBE\u7F6E\u5B8C\u6210");
};
var clean = () => {
  console.log("\u5F00\u59CB\u6E05\u7406\u4F9D\u8D56...");
  const pkg = readPkg();
  console.log("\u6B63\u5728\u5220\u9664 devDependencies");
  delete pkg.devDependencies;
  writePkg(pkg);
  console.log("\u4F9D\u8D56\u6E05\u7406\u5B8C\u6210");
};
var all = () => {
  console.log("\u5F00\u59CB\u6267\u884C\u6240\u6709\u64CD\u4F5C...");
  const pkg = readPkg();
  console.log(`\u5F53\u524D\u7248\u672C: ${pkg.version}`);
  updateVersion(pkg);
  console.log(`\u66F4\u65B0\u540E\u7248\u672C: ${pkg.version}`);
  console.log("\u6B63\u5728\u5220\u9664 devDependencies");
  delete pkg.devDependencies;
  writePkg(pkg);
  console.log("package.json \u5199\u5165\u6210\u529F");
  setEnvVariables(pkg);
  console.log("\u73AF\u5883\u53D8\u91CF\u8BBE\u7F6E\u5B8C\u6210");
  console.log("\u6240\u6709\u64CD\u4F5C\u6267\u884C\u5B8C\u6BD5");
};
var cmd = process.argv[2];
console.log(`\u6267\u884C\u547D\u4EE4: ${cmd}`);
if (cmd.includes("version")) {
  version();
} else if (cmd.includes("clean")) {
  clean();
} else if (cmd.includes("all")) {
  all();
} else {
  console.log("\u672A\u77E5\u547D\u4EE4\uFF0C\u53EF\u7528\u547D\u4EE4: version, clean, all");
}
