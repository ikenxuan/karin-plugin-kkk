import { heroui } from "@heroui/react"
// or import from theme package if you are using individual packages.
// import { heroui } from "@heroui/theme";

/**
 * 导出的 HeroUI + Tailwind v4 配置
 * 说明：
 * 1. 由于 TypeScript 在生成声明文件时会试图命名默认导出的类型，
 *    而 heroui() 返回类型内含 tailwindcss v4 的内部类型，跨项目构建时不可命名，触发 TS2742。
 * 2. 这里显式将类型标注为 any，避免 TypeScript 推断为不可命名的第三方内部类型。
 *
 * @constant 配置
 * @type any 任意类型，避免类型推断导致的声明文件生成失败
 */
const Config: any = heroui() as any
export default Config