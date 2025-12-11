import { source } from '@/lib/source'
import { DocsLayout } from 'fumadocs-ui/layouts/notebook'
import { baseOptions } from '@/lib/layout.shared'
import { KKKLogo } from '@/components/kkk-logo'
import { GitHubLink } from '@/components/github-link'
import { SidebarBanner } from '@/components/sidebar-banner'

export default async function Layout ({ 
  children, 
  params 
}: { 
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
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
