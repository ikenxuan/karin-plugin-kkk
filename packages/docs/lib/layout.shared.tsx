import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { KKKLogo } from '@/components/kkk-logo';
import { ChangelogDropdown } from '@/components/changelog-dropdown';

export function baseOptions(): BaseLayoutProps {
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
  };
}
