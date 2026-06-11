import type * as PageTree from 'fumadocs-core/page-tree'
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/layouts/notebook/page'
import { createRelativeLink } from 'fumadocs-ui/mdx'
import { PageLastUpdate } from 'fumadocs-ui/page'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { MarkdownCopyButton, ViewOptionsPopover } from '@/components/ai/page-actions'
import { DocsPageAnimate } from '@/components/docs-page-animate'
import { DocsFooter } from '@/components/DocsFooter'
import { TocCopyUrl, TocBottomLinks } from '@/components/toc-extras'
import { getPageImage, source } from '@/lib/source'
import { getMDXComponents } from '@/mdx-components'

interface PageProps {
  params: Promise<{ slug?: string[] }>
}

interface NavItem {
  name: string
  description?: string
  url: string
}

interface DocsFooterNavProps {
  prev?: NavItem
  next?: NavItem
}

function getNavItems(tree: PageTree.Root, currentPath: string): DocsFooterNavProps {
  const pages: NavItem[] = []

  function flattenTree(nodes: PageTree.Node[]) {
    for (const node of nodes) {
      if (node.type === 'page') {
        pages.push({
          name: typeof node.name === 'string' ? node.name : String(node.name),
          url: node.url,
          description: typeof node.description === 'string' ? node.description : undefined
        })
      } else if (node.type === 'folder' && node.children) {
        flattenTree(node.children)
      }
    }
  }
  flattenTree(tree.children)

  const currentIndex = pages.findIndex((p) => p.url === currentPath)
  return {
    prev: currentIndex > 0 ? pages[currentIndex - 1] : undefined,
    next: currentIndex < pages.length - 1 ? pages[currentIndex + 1] : undefined
  }
}

function PageActions({ pageUrl, filePath }: { pageUrl: string; filePath: string }) {
  const markdownUrl = `${pageUrl}.mdx`
  return (
    <div className="flex flex-row gap-2 items-center border-b pt-2 pb-6">
      <MarkdownCopyButton markdownUrl={markdownUrl}>复制 Markdown</MarkdownCopyButton>
      <ViewOptionsPopover
        markdownUrl={markdownUrl}
        githubUrl={`https://github.com/ikenxuan/karin-plugin-kkk/blob/main/packages/docs/content/docs/${filePath}.mdx`}
      >
        打开
      </ViewOptionsPopover>
    </div>
  )
}

export default async function Page(props: PageProps) {
  const params = await props.params
  const page = source.getPage(params.slug)
  if (!page) notFound()

  const { body: MDX, toc, lastModified } = await page.data.load()
  const tree = source.pageTree
  const navItems = getNavItems(tree, page.url)
  const filePath = params.slug?.join('/') || 'index'

  return (
    <DocsPageAnimate>
      <DocsPage
        toc={toc}
        tableOfContent={{
          style: 'clerk',
          header: <TocCopyUrl />,
          footer: <TocBottomLinks />
        }}
        full={page.data.full}
        footer={{ component: <DocsFooter {...navItems} /> }}
      >
        <div className="docs-animate-entry">
          <DocsTitle>{page.data.title}</DocsTitle>
        </div>
        <div className="docs-animate-entry">
          <DocsDescription>{page.data.description}</DocsDescription>
        </div>
        <div className="docs-animate-entry">
          <PageActions pageUrl={page.url} filePath={filePath} />
        </div>
        <DocsBody className="docs-animate-body">
          <MDX
            components={getMDXComponents({
              a: createRelativeLink(source, page)
            })}
          />
          {lastModified && (
            <div className="pt-8 mt-8 border-t">
              <PageLastUpdate date={new Date(lastModified)} />
            </div>
          )}
        </DocsBody>
      </DocsPage>
    </DocsPageAnimate>
  )
}

export async function generateStaticParams() {
  return source.generateParams()
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params
  const page = source.getPage(params.slug)
  if (!page) notFound()

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      images: getPageImage(page).url
    }
  }
}
