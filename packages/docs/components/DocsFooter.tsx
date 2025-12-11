'use client';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'fumadocs-core/link';
import { Footer } from './Footer';

interface NavItem {
  name: string;
  description?: string;
  url: string;
}

export interface DocsFooterProps {
  prev?: NavItem;
  next?: NavItem;
  lang?: string;
}

function NavCard({ item, direction }: { item: NavItem; direction: 'prev' | 'next' }) {
  const isNext = direction === 'next';

  return (
    <Link
      href={item.url}
      className="flex flex-col rounded-lg border border-fd-border p-4 text-sm transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground"
    >
      <span className={`flex items-center gap-1 font-medium ${isNext ? 'flex-row-reverse' : ''}`}>
        {isNext ? <ChevronRight className="size-4" /> : <ChevronLeft className="size-4" />}
        {item.name}
      </span>
      {item.description && (
        <span className={`text-fd-muted-foreground text-xs mt-1 ${isNext ? 'text-right' : ''}`}>
          {item.description}
        </span>
      )}
    </Link>
  );
}

export function DocsFooter({ prev, next, lang }: DocsFooterProps) {
  return (
    <>
      {(prev || next) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          {prev ? <NavCard item={prev} direction="prev" /> : <div />}
          {next && <NavCard item={next} direction="next" />}
        </div>
      )}
      <Footer lang={lang} />
    </>
  );
}
