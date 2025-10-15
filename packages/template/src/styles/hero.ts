// hero.ts
import { heroui } from '@heroui/react'
// or import from theme package if you are using individual packages.
// import { heroui } from "@heroui/theme";
type HeroUIPlugin = ReturnType<typeof heroui>
const heroPlugin: HeroUIPlugin = heroui()

export default heroPlugin