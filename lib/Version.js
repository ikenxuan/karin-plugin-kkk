import fs from "node:fs";
import require$$7$1 from "node:path";
import { fileURLToPath } from "node:url";
import { karinPathRoot } from "node-karin/root";
const pluginPath = require$$7$1.join(fileURLToPath(import.meta.url), "../..");
const pkg = JSON.parse(fs.readFileSync(require$$7$1.join(pluginPath, "package.json"), "utf-8"));
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
