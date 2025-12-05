import type { Route } from './+types/page';
import { createContext, useContext } from 'react';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/layouts/docs/page';
import { source } from '@/lib/source';
import type * as PageTree from 'fumadocs-core/page-tree';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import { ImageZoom } from 'fumadocs-ui/components/image-zoom';
import * as Twoslash from 'fumadocs-twoslash/ui';
import { Mermaid } from '@/components/Mermaid';
import browserCollections from 'fumadocs-mdx:collections/browser';
import { baseOptions } from '@/lib/layout.shared';
import { DocsFooter, type DocsFooterProps } from '@/components/DocsFooter';
import { LLMCopyButton, ViewOptions } from '../../components/page-actions';

interface NavItem {
  name: string;
  description?: string;
  url: string;
}

function getNavItems(tree: PageTree.Root, currentPath: string): DocsFooterProps {
  const pages: NavItem[] = [];
  
  function flattenTree(nodes: PageTree.Node[]) {
    for (const node of nodes) {
      if (node.type === 'page') {
        pages.push({ 
          name: typeof node.name === 'string' ? node.name : String(node.name), 
          url: node.url, 
          description: typeof node.description === 'string' ? node.description : undefined 
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

export async function loader({ params }: Route.LoaderArgs) {
  const slugs = params['*'].split('/').filter((v) => v.length > 0);
  const page = source.getPage(slugs);
  if (!page) throw new Response('Not found', { status: 404 });

  const tree = source.getPageTree();
  const navItems = getNavItems(tree, page.url);

  return {
    path: page.path,
    tree,
    slugs: params['*'],
    navItems,
  };
}

const SlugsContext = createContext<string>('');

function PageActions() {
  const slugs = useContext(SlugsContext);
  // 首页 slugs 为空，对应 index.mdx
  const filePath = slugs || 'index';
  // 直接使用 llms.mdx 路由，避免 redirect 问题
  const markdownUrl = `/llms.mdx${slugs ? `/${slugs}` : ''}`;
  return (
    <div className="flex flex-row gap-2 items-center border-b pt-2 pb-6">
      <LLMCopyButton markdownUrl={markdownUrl} />
      <ViewOptions
        markdownUrl={markdownUrl}
        githubUrl={`https://github.com/ikenxuan/karin-plugin-kkk/blob/main/packages/docs/content/docs/${filePath}.mdx`}
      />
    </div>
  );
}

const NavContext = createContext<DocsFooterProps>({});

const clientLoader = browserCollections.docs.createClientLoader({
  component({ toc, default: Mdx, frontmatter }) {
    const navItems = useContext(NavContext);
    return (
      <DocsPage toc={toc} footer={{ component: <DocsFooter {...navItems} /> }}>
        <title>{frontmatter.title}</title>
        <meta name="description" content={frontmatter.description} />
        <DocsTitle>{frontmatter.title}</DocsTitle>
        <DocsDescription>{frontmatter.description}</DocsDescription>
        <PageActions />
        <DocsBody>
          <Mdx components={{ ...defaultMdxComponents, ...Twoslash, Mermaid, img: (props) => <ImageZoom {...(props as any)} /> }} />
        </DocsBody>
      </DocsPage>
    );
  },
});


export default function Page({ loaderData }: Route.ComponentProps) {
  const { tree, path, slugs, navItems } = loaderData;
  const Content = clientLoader.getComponent(path);

  return (
    <SlugsContext.Provider value={slugs}>
      <NavContext.Provider value={navItems}>
        <DocsLayout {...baseOptions()} tree={tree as PageTree.Root}>
          <Content />
        </DocsLayout>
      </NavContext.Provider>
    </SlugsContext.Provider>
  );
}
