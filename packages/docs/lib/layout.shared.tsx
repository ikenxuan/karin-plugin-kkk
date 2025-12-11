import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { AnimatedThemeToggler } from '@/components/ui/animated-theme-toggler';
import { KKKLogo } from '@/components/kkk-logo';
import { i18n } from '@/lib/i18n';

export function baseOptions(locale: string): BaseLayoutProps {
  return {
    nav: {
      title: <KKKLogo />,
      // children: <GitHubLink />,
      transparentMode: 'always'
    },
    themeSwitch: {
      component: <AnimatedThemeToggler />,
    },
    i18n,
  };
}
