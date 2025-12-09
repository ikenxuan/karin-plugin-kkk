import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { AnimatedThemeToggler } from '@/components/ui/animated-theme-toggler';
import { KKKLogo } from '@/components/kkk-logo';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: <KKKLogo />,
      // children: <GitHubLink />,
      transparentMode: 'always'
    },
    themeSwitch: {
      component: <AnimatedThemeToggler />,
    },
  };
}
