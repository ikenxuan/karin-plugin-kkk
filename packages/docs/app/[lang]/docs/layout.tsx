import { source } from '@/lib/source'
import { DocsLayout } from 'fumadocs-ui/layouts/notebook'
import { baseOptions } from '@/lib/layout.shared'
import { KKKLogo } from '@/components/kkk-logo'
import { GitHubLink } from '@/components/github-link'
import { SidebarBanner } from '@/components/sidebar-banner'
import { SidebarFooter } from '@/components/sidebar-footer'
import { ChangelogDropdown } from '@/components/changelog-dropdown'
import { getChangelog } from '@/lib/changelog'

export default async function Layout ({ 
  children, 
  params 
}: { 
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const changelogData = await getChangelog();
  const latestVersion = changelogData.v2.latest || 'v2.x.x';

  return (
    <DocsLayout
      tree={source.pageTree[lang]} 
      {...baseOptions(lang)}
      sidebar={{
        banner: <SidebarBanner />,
        footer: <SidebarFooter latestVersion={latestVersion} />,
        defaultOpenLevel: 5,
        collapsible: false
      }}
      nav={{
        ...baseOptions(lang).nav,
        children: (
          <div className="flex gap-3 items-center mr-2 md:mr-0 in-[aside]:hidden">
            <div className="hidden md:block">
              <ChangelogDropdown latestVersion={latestVersion} />
            </div>
            <GitHubLink />
          </div>
        ),
        mode: "top",
        title: <KKKLogo />,
      }}
    >
      {children}
    </DocsLayout>
  )
}
