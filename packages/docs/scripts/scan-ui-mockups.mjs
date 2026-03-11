#!/usr/bin/env node
import { readdir, writeFile } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function scanUIMockups() {
  try {
    const publicDir = join(__dirname, "../public/UI-example");
    const files = await readdir(publicDir);
    
    const pngFiles = files
      .filter(file => file.endsWith(".png"))
      .sort();

    const outputPath = join(__dirname, "../lib/ui-mockups-data.json");
    await writeFile(outputPath, JSON.stringify(pngFiles, null, 2));

    console.log(`✅ 扫描完成！找到 ${pngFiles.length} 个图片文件`);
    console.log(`📝 数据已保存到: ${outputPath}`);
    
    return pngFiles;
  } catch (error) {
    console.error("❌ 扫描失败:", error);
    process.exit(1);
  }
}

scanUIMockups();
