import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { ImageZoom } from 'fumadocs-ui/components/image-zoom';
import * as Twoslash from 'fumadocs-twoslash/ui';
import { Mermaid } from '@/components/Mermaid';
import { LinkPreview } from '@/components/ui/link-preview';
import { Meteors } from '@/components/ui/meteors';
import { SponsorList } from '@/components/sponsor-list';

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ...Twoslash,
    Mermaid,
    LinkPreview,
    Meteors,
    SponsorList,
    img: (props) => <ImageZoom {...(props as any)} />,
    ...components,
  };
}
