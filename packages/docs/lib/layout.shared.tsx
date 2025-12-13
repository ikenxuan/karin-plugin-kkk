import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { AnimatedThemeToggler } from '@/components/ui/animated-theme-toggler';
import { KKKLogo } from '@/components/kkk-logo';
import { i18n } from '@/lib/i18n';
import { ChangelogDropdown } from '@/components/changelog-dropdown';

export function baseOptions(locale: string): BaseLayoutProps {
  return {
    nav: {
      title: <KKKLogo />,
      children: (
        <div className="flex gap-2 items-center">
          <ChangelogDropdown />
        </div>
      ),
      transparentMode: 'always'
    },
    themeSwitch: {
      component: <AnimatedThemeToggler />,
    },
    i18n,
  };
}
