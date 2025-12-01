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
import { LLMCopyButton, ViewOptions } from '../../components/page-actions';

export async function loader({ params }: Route.LoaderArgs) {
  const slugs = params['*'].split('/').filter((v) => v.length > 0);
  const page = source.getPage(slugs);
  if (!page) throw new Response('Not found', { status: 404 });

  return {
    path: page.path,
    tree: source.getPageTree(),
    slugs: params['*'],
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

const clientLoader = browserCollections.docs.createClientLoader({
  component({ toc, default: Mdx, frontmatter }) {
    return (
      <DocsPage toc={toc}>
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
  const { tree, path, slugs } = loaderData;
  const Content = clientLoader.getComponent(path);

  return (
    <SlugsContext.Provider value={slugs}>
      <DocsLayout {...baseOptions()} tree={tree as PageTree.Root}>
        <Content />
      </DocsLayout>
    </SlugsContext.Provider>
  );
}
