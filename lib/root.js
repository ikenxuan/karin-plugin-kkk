import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const pluginPath = path.join(fileURLToPath(import.meta.url), "../..");
const pkg = JSON.parse(fs.readFileSync(path.join(pluginPath, "package.json"), "utf-8"));
const Root = {
  pluginName: pkg.name,
  pluginVersion: pkg.version,
  pluginPath,
  karinVersion: process.env.KARIN_VERSION
};
export {
  Root
};
