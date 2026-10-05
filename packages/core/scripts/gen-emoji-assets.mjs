import fs from 'node:fs'
// 生成 richtext 的 emoji 文件清单（packages/richtext/src/parse/emojiAssets.generated.ts）。
//
// 清单来自 emoji-datasource-apple 包内 `img/apple/64/` 的实际文件名，分词器用它判断
// 某个 emoji 序列是否有图可查；图源 PNG 本身不进插件产物，运行时由
// `src/module/utils/emojiAssets.ts` 从包内直读。
// 升级数据版本（pnpm --filter karin-plugin-kkk add emoji-datasource-apple@<版本>）后重跑 `pnpm gen:emoji`。
import { createRequire } from 'node:module'
import path from 'node:path'

const require = createRequire(import.meta.url)
const coreRoot = path.resolve(import.meta.dirname, '..')

const pkgRoot = path.dirname(require.resolve('emoji-datasource-apple/package.json'))
const srcDir = path.join(pkgRoot, 'img', 'apple', '64')
const generatedFile = path.resolve(coreRoot, '..', 'richtext', 'src', 'parse', 'emojiAssets.generated.ts')

const stems = fs
  .readdirSync(srcDir)
  .filter((file) => file.endsWith('.png'))
  .map((file) => path.basename(file, '.png'))
  .sort()

const header = `/**
 * Apple emoji 64px 图源文件清单（生成文件，勿手改）。
 *
 * 由 \`packages/core/scripts/gen-emoji-assets.mjs\` 从 emoji-datasource-apple 的
 * \`img/apple/64/\` 目录清单生成，与包内实际文件一一对应（图源随 node_modules 安装，
 * 不进插件产物）；分词器用它在渲染前判断某个 emoji 序列是否有图可查，
 * 未命中的序列回退为纯文本，避免出现死图。
 */
export const APPLE_EMOJI_64_FILES: ReadonlySet<string> = new Set([
`
const body = stems.map((stem) => `  '${stem}',`).join('\n')
fs.writeFileSync(generatedFile, header + body + '\n])\n', 'utf8')

console.log(`[gen:emoji] ${stems.length} 个文件名已写入 ${path.relative(process.cwd(), generatedFile)}`)
