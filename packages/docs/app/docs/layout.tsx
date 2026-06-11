import { DocsLayout } from 'fumadocs-ui/layouts/notebook'

import { ChangelogDropdown } from '@/components/changelog-dropdown'
import { GitHubLink } from '@/components/github-link'
import { KKKLogo } from '@/components/kkk-logo'
import { MirrorSiteDropdown } from '@/components/mirror-site-dropdown'
import { SidebarFooter } from '@/components/sidebar-footer'
import { getChangelog } from '@/lib/changelog'
import { baseOptions } from '@/lib/layout.shared'
import { source } from '@/lib/source'

export default async function Layout({ children }: { children: React.ReactNode }) {
  const changelogData = await getChangelog()
  const latestVersion = changelogData.v2.latest || 'v2.x.x'

  return (
    <DocsLayout
      tree={source.pageTree}
      {...baseOptions()}
      sidebar={{
        footer: <SidebarFooter latestVersion={latestVersion} />,
        defaultOpenLevel: 5,
        collapsible: false
      }}
      nav={{
        ...baseOptions().nav,
        children: (
          <div className="ml-4 flex gap-3 items-center mr-2 md:mr-0 in-[aside]:hidden">
            <div className="hidden md:block">
              <ChangelogDropdown latestVersion={latestVersion} />
            </div>
            <div className="hidden md:block">
              <MirrorSiteDropdown />
            </div>
            <GitHubLink />
          </div>
        ),
        mode: 'top',
        title: <KKKLogo />
      }}
    >
      {children}
    </DocsLayout>
  )
}
