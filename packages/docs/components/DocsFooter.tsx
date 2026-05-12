'use client';
import Link from 'fumadocs-core/link';
import { Footer } from './Footer';

function ChevronLeftIcon() {
  return (
    <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}

interface NavItem {
  name: string;
  description?: string;
  url: string;
}

export interface DocsFooterProps {
  prev?: NavItem;
  next?: NavItem;
}

function NavCard({ item, direction }: { item: NavItem; direction: 'prev' | 'next' }) {
  const isNext = direction === 'next';

  return (
    <Link
      href={item.url}
      className="flex flex-col rounded-lg border border-fd-border p-4 text-sm transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground"
    >
      <span className={`flex items-center gap-1 font-medium ${isNext ? 'flex-row-reverse' : ''}`}>
        {isNext ? <ChevronRightIcon /> : <ChevronLeftIcon />}
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

export function DocsFooter({ prev, next }: DocsFooterProps) {
  return (
    <>
      {(prev || next) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          {prev ? <NavCard item={prev} direction="prev" /> : <div />}
          {next && <NavCard item={next} direction="next" />}
        </div>
      )}
      <Footer />
    </>
  );
}
