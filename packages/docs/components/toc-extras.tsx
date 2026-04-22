'use client';

import { useState } from 'react';
import { Button } from '@heroui/react';
import { FaGithub } from 'react-icons/fa';
import { Icon } from '@iconify/react';
import Link from 'next/link';

export function TocCopyUrl() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (typeof window === 'undefined') return;
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="pb-4">
        <Button
          size="sm"
          variant={copied ? 'primary' : 'secondary'}
          onPress={handleCopy}
          className="w-full font-medium bg-fd-secondary hover:bg-fd-accent text-fd-secondary-foreground"
        >
          {copied ? <Icon icon="lucide:check" width={14} /> : <Icon icon="lucide:link" width={14} />}
          {copied ? '已复制链接' : '复制此页链接'}
        </Button>
    </div>
  );
}

export function TocBottomLinks() {
  return (
    <div className="flex flex-col gap-3 pt-6 mt-2">
      <Link
        href="https://github.com/ikenxuan/karin-plugin-kkk"
        target="_blank"
        className="group flex items-center gap-2.5 text-xs text-muted-foreground hover:text-primary transition-colors"
      >
        <div className="p-1 rounded-md bg-fd-secondary group-hover:bg-fd-accent transition-colors">
            <FaGithub className="size-3.5" />
        </div>
        <span>给项目点个 Star ⭐</span>
      </Link>
      <Link
        href="https://github.com/ikenxuan/karin-plugin-kkk/issues/new/choose"
        target="_blank"
        className="group flex items-center gap-2.5 text-xs text-muted-foreground hover:text-primary transition-colors"
      >
        <div className="p-1 rounded-md bg-fd-secondary group-hover:bg-fd-accent transition-colors">
            <Icon icon="lucide:bug" className="size-3.5" />
        </div>
        <span>遇到问题？反馈 Issue</span>
      </Link>
    </div>
  );
}
