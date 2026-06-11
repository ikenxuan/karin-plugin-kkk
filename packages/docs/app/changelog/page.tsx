import { DocsLayout } from 'fumadocs-ui/layouts/notebook'
import { DocsPage, DocsBody } from 'fumadocs-ui/page'

import { ChangelogDropdown } from '@/components/changelog-dropdown'
import { ChangelogViewer } from '@/components/changelog-viewer'
import { GitHubLink } from '@/components/github-link'
import { KKKLogo } from '@/components/kkk-logo'
import { MirrorSiteDropdown } from '@/components/mirror-site-dropdown'
import { SidebarFooter } from '@/components/sidebar-footer'
import { getChangelog } from '@/lib/changelog'
import { baseOptions } from '@/lib/layout.shared'
import { source } from '@/lib/source'

export default async function ChangelogPage({ searchParams }: { searchParams: Promise<{ version?: string }> }) {
  const { version } = await searchParams
  const changelogs = await getChangelog()
  const latestVersion = changelogs.v2.latest || 'v2.x.x'

  const currentVersion = version || 'v2'

  let displayItems = changelogs.all
  if (currentVersion === 'v2') {
    displayItems = changelogs.all.filter((item) => item.version.startsWith('2.'))
  } else if (currentVersion === 'v1') {
    displayItems = changelogs.all.filter((item) => item.version.startsWith('1.'))
  } else if (currentVersion === 'v0') {
    displayItems = changelogs.all.filter((item) => item.version.startsWith('0.'))
  }

  const toc = displayItems.map((item) => ({
    title: `v${item.version}`,
    url: `#version-${item.version}`,
    depth: 2
  }))

  return (
    <DocsLayout
      tree={source.pageTree}
      {...baseOptions()}
      sidebar={{
        footer: <SidebarFooter latestVersion={latestVersion} currentVersion={currentVersion} />
      }}
      nav={{
        ...baseOptions().nav,
        children: (
          <div className="flex gap-3 items-center mr-2 md:mr-0 in-[aside]:hidden">
            <div className="hidden md:block">
              <ChangelogDropdown latestVersion={latestVersion} currentVersion={currentVersion} />
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
      <DocsPage toc={toc} full={false} tableOfContent={{ enabled: true, footer: null }}>
        <DocsBody>
          <ChangelogViewer items={displayItems} />
        </DocsBody>
      </DocsPage>
    </DocsLayout>
  )
}
