'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CornerDownLeft, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/cn';

interface ChangelogItem {
  version: string;
  content: string;
}

interface ChangelogViewerProps {
  items: ChangelogItem[];
}

export function ChangelogViewer({ items }: ChangelogViewerProps) {
  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="space-y-12">
        {items.map((item) => (
          <div key={item.version} id={`version-${item.version}`} className="mb-20 scroll-mt-24">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ children, ...props }) => (
                  <h1 className="pb-2 mb-6 text-4xl font-semibold border-b-2 border-fd-border text-fd-foreground" {...props}>
                    {children}
                  </h1>
                ),
                h2: ({ children, ...props }) => (
                  <div className="relative mt-10 mb-4 group">
                    <div
                      className="absolute left-0 -top-8 text-7xl font-black leading-none uppercase pointer-events-none select-none text-default-200/60"
                      aria-hidden="true"
                    >
                      {typeof children === 'string' ? children : 'H2'}
                    </div>
                    <h2 className="relative z-10 pb-2 text-3xl font-medium border-b border-fd-border text-fd-foreground" {...props}>
                      {children}
                    </h2>
                  </div>
                ),
                h3: ({ children, ...props }) => (
                  <h3 className="flex gap-2 items-baseline mt-6 mb-4 text-xl font-semibold text-fd-foreground" {...props}>
                    {children}
                    <CornerDownLeft strokeWidth={2.5} className="w-4 h-4 text-fd-muted-foreground" />
                  </h3>
                ),
                h4: ({ children, ...props }) => (
                  <h4 className="mt-4 mb-3 text-lg font-semibold text-fd-foreground" {...props}>
                    {children}
                  </h4>
                ),
                h5: ({ children, ...props }) => (
                  <h5 className="mt-3 mb-2 text-base font-semibold text-fd-foreground" {...props}>
                    {children}
                  </h5>
                ),
                h6: ({ children, ...props }) => (
                  <h6 className="mt-2 mb-2 text-sm font-semibold text-fd-muted-foreground" {...props}>
                    {children}
                  </h6>
                ),
                p: ({ children, ...props }) => (
                  <p className="mb-4 leading-7 text-fd-foreground" {...props}>
                    {children}
                  </p>
                ),
                ul: ({ children, ...props }) => (
                  <ul className="pl-6 mb-4 list-disc text-fd-foreground" {...props}>
                    {children}
                  </ul>
                ),
                ol: ({ children, ...props }) => (
                  <ol className="pl-6 mb-4 list-decimal text-fd-foreground" {...props}>
                    {children}
                  </ol>
                ),
                li: ({ children, ...props }) => (
                  <li className="mb-1 leading-6" {...props}>
                    {children}
                  </li>
                ),
                blockquote: ({ children, ...props }) => (
                  <blockquote className="py-2 pl-4 mb-4 rounded-r border-l-4 border-fd-primary/50 text-fd-muted-foreground bg-fd-secondary/30" {...props}>
                    {children}
                  </blockquote>
                ),
                code: ({ children, className, ...props }) => {
                   const isInline = !className?.includes('language-');
                   return (
                      <code
                        className={cn(
                          "relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm",
                          isInline ? "bg-fd-secondary text-fd-secondary-foreground" : "block bg-transparent p-0",
                          className
                        )}
                        {...props}
                      >
                        {children}
                      </code>
                   );
                },
                pre: ({ children, ...props }) => (
                  <pre className="overflow-x-auto p-4 mb-4 font-mono text-sm rounded-lg border bg-fd-secondary border-fd-border" {...props}>
                    {children}
                  </pre>
                ),
                a: ({ children, href, ...props }) => (
                  <a
                    className="inline-flex gap-1 items-center font-bold cursor-pointer text-fd-primary hover:underline"
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    {...props}
                  >
                    {children}
                    <ExternalLink className="w-6 h-auto" />
                  </a>
                ),
                img: ({ ...props }) => (
                  <img className="my-4 max-w-full h-auto rounded-lg border border-fd-border" {...props} alt={props.alt || 'image'} />
                ),
                table: ({ children, ...props }) => (
                  <div className="overflow-x-auto mb-4 rounded-lg border border-fd-border">
                    <table className="w-full text-sm border-collapse" {...props}>
                      {children}
                    </table>
                  </div>
                ),
                th: ({ children, ...props }) => (
                  <th className="px-4 py-2 font-semibold text-left border-b border-fd-border bg-fd-secondary/50" {...props}>
                    {children}
                  </th>
                ),
                td: ({ children, ...props }) => (
                  <td className="px-4 py-2 border-b border-fd-border last:border-0" {...props}>
                    {children}
                  </td>
                )
              }}
            >
              {item.content}
            </ReactMarkdown>
          </div>
        ))}
        {items.length === 0 && (
          <div className="py-12 text-center text-muted-foreground">
            No changelogs found for this version range.
          </div>
        )}
      </div>
    </div>
  );
}
