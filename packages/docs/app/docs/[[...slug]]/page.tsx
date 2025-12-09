import { getPageImage, source } from '@/lib/source';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/layouts/notebook/page';
import { notFound } from 'next/navigation';
import { getMDXComponents } from '@/mdx-components';
import type { Metadata } from 'next';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { DocsFooter } from '@/components/DocsFooter';
import { LLMCopyButton, ViewOptions } from '@/components/page-actions';
import { TocCopyUrl, TocBottomLinks } from '@/components/toc-extras';
import type * as PageTree from 'fumadocs-core/page-tree';
import { PageLastUpdate } from 'fumadocs-ui/page';

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

interface NavItem {
  name: string;
  description?: string;
  url: string;
}

interface DocsFooterProps {
  prev?: NavItem;
  next?: NavItem;
}

function getNavItems(tree: PageTree.Root, currentPath: string): DocsFooterProps {
  const pages: NavItem[] = [];

  function flattenTree(nodes: PageTree.Node[]) {
    for (const node of nodes) {
      if (node.type === 'page') {
        pages.push({
          name: typeof node.name === 'string' ? node.name : String(node.name),
          url: node.url,
          description: typeof node.description === 'string' ? node.description : undefined,
        });
      } else if (node.type === 'folder' && node.children) {
        flattenTree(node.children);
      }
    }
  }
  flattenTree(tree.children);

  const currentIndex = pages.findIndex((p) => p.url === currentPath);
  return {
    prev: currentIndex > 0 ? pages[currentIndex - 1] : undefined,
    next: currentIndex < pages.length - 1 ? pages[currentIndex + 1] : undefined,
  };
}

function PageActions({ pageUrl, filePath }: { pageUrl: string; filePath: string }) {
  const markdownUrl = `${pageUrl}.mdx`;
  return (
    <div className="flex flex-row gap-2 items-center pt-2 pb-6 border-b">
      <LLMCopyButton markdownUrl={markdownUrl} />
      <ViewOptions
        markdownUrl={markdownUrl}
        githubUrl={`https://github.com/ikenxuan/karin-plugin-kkk/blob/main/packages/docs/content/docs/${filePath}.mdx`}
      />
    </div>
  );
}

export default async function Page(props: PageProps) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const { body: MDX, toc, lastModified } = await page.data.load();
  const tree = source.pageTree;
  const navItems = getNavItems(tree, page.url);
  const filePath = params.slug?.join('/') || 'index';

  return (
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
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <PageActions pageUrl={page.url} filePath={filePath} />
      <DocsBody>
        <MDX
          components={getMDXComponents({
            a: createRelativeLink(source, page),
          })}
        />
        {lastModified && (
           <div className="pt-8 mt-8 border-t">
               <PageLastUpdate date={new Date(lastModified)} />
           </div>
        )}
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(
  props: PageProps,
): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      images: getPageImage(page).url,
    },
  };
}
