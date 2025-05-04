import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { karinPathRoot } from "node-karin/root";
const pluginPath = path.join(fileURLToPath(import.meta.url), "../..");
const pkg = JSON.parse(fs.readFileSync(path.join(pluginPath, "package.json"), "utf-8"));
const Version = {
  pluginName: pkg.name,
  pluginVersion: pkg.version,
  pluginPath,
  karinVersion: process.env.KARIN_VERSION,
  karinPath: karinPathRoot
};
export {
  Version
};
