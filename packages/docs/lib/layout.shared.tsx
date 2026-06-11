import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared'

import { ChangelogDropdown } from '@/components/changelog-dropdown'
import { KKKLogo } from '@/components/kkk-logo'

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
    }
  }
}
