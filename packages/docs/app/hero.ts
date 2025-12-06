import { heroui } from '@heroui/react';

type HeroUIPlugin = ReturnType<typeof heroui>;
const heroPlugin: HeroUIPlugin = heroui({
  addCommonColors: true,
});

export default heroPlugin;
