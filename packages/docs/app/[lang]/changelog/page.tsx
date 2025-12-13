import { getChangelog } from '@/lib/changelog';
import { ChangelogViewer } from '@/components/changelog-viewer';
import { DocsLayout } from 'fumadocs-ui/layouts/notebook';
import { DocsPage, DocsBody, DocsTitle } from 'fumadocs-ui/page';
import { source } from '@/lib/source';
import { baseOptions } from '@/lib/layout.shared';
import { SidebarBanner } from '@/components/sidebar-banner';
import { KKKLogo } from '@/components/kkk-logo';
import { ChangelogDropdown } from '@/components/changelog-dropdown';
import { GitHubLink } from '@/components/github-link';

export default async function ChangelogPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ version?: string }>;
}) {
  const { lang } = await params;
  const { version } = await searchParams;
  const changelogs = await getChangelog();
  const latestVersion = changelogs.v2.latest || 'v2.x.x';

  const currentVersion = version || 'v2'; // Default to v2

  // Filter content based on version query param
  let displayItems = changelogs.all;
  if (currentVersion === 'v2') {
    // Filter for 2.x.x
    displayItems = changelogs.all.filter(item => item.version.startsWith('2.'));
  } else if (currentVersion === 'v1') {
     // Filter for 1.x.x
    displayItems = changelogs.all.filter(item => item.version.startsWith('1.'));
  } else if (currentVersion === 'v0') {
     // Filter for 0.x.x
    displayItems = changelogs.all.filter(item => item.version.startsWith('0.'));
  }

  // Generate TOC only for displayed items
  const toc = displayItems.map((item) => ({
    title: `v${item.version}`,
    url: `#version-${item.version}`,
    depth: 2,
  }));

  return (
    <DocsLayout
      tree={source.pageTree[lang]}
      {...baseOptions(lang)}
      sidebar={{
        banner: <SidebarBanner />
      }}
      nav={{
        ...baseOptions(lang).nav,
        children: (
          <div className="flex gap-3 items-center mr-2 md:mr-0 in-[aside]:hidden">
            <ChangelogDropdown latestVersion={latestVersion} currentVersion={currentVersion} />
            <GitHubLink />
          </div>
        ),
        mode: "top",
        title: <KKKLogo />,
      }}
    >
      <DocsPage toc={toc} full={false} tableOfContent={{ enabled: true, footer: null }}>
        <DocsBody>
          <ChangelogViewer items={displayItems} />
        </DocsBody>
      </DocsPage>
    </DocsLayout>
  );
}
