'use client';

import { Dropdown, DropdownItem, DropdownMenu, DropdownPopover, DropdownTrigger } from '@heroui/react';
import { ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMemo, useState, type Key } from 'react';
import { cn } from '@/lib/cn';

interface ChangelogDropdownProps {
  latestVersion?: string;
  currentVersion?: string;
}

export function ChangelogDropdown({ latestVersion = 'v2.x.x', currentVersion = 'v2' }: ChangelogDropdownProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const versionItems = useMemo(
    () => [
      { key: 'v2', label: 'v2' },
      { key: 'v1', label: 'v1' },
      { key: 'v0', label: 'v0' },
    ],
    []
  );
  const selectedKeys = useMemo(() => new Set([currentVersion]), [currentVersion]);

  const handleAction = (key: Key) => {
    router.push(`/changelog?version=${String(key)}`);
  };
  const triggerClassName = cn(
    'relative isolate inline-flex w-fit origin-center items-center justify-center gap-2 whitespace-nowrap outline-none select-none no-highlight',
    'h-9 px-3 text-sm font-medium md:h-8 rounded-3xl',
    'transform-gpu motion-reduce:transition-none',
    '[transition:transform_250ms_var(--ease-smooth),background-color_100ms_var(--ease-out),box-shadow_100ms_var(--ease-out)]',
    'cursor-(--cursor-interactive)',
    '[--button-bg:transparent] [--button-bg-hover:var(--color-default)] [--button-bg-pressed:var(--color-default)] [--button-fg:var(--color-default-foreground)]',
    'bg-(--button-bg) text-(--button-fg)',
    'focus-visible:status-focused data-[focus-visible=true]:status-focused',
    'disabled:status-disabled aria-disabled:status-disabled',
    'data-[pending=true]:status-pending',
    'active:bg-(--button-bg-pressed) data-[pressed=true]:bg-(--button-bg-pressed)',
    'active:scale-[0.98] data-[pressed=true]:scale-[0.98]',
    'hover:bg-(--button-bg-hover) data-[hovered=true]:bg-(--button-bg-hover)',
    '[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:self-center'
  );

  return (
    <Dropdown onOpenChange={setOpen}>
      <DropdownTrigger className={triggerClassName}>
        <span className="whitespace-nowrap text-sm">{latestVersion}</span>
        <ChevronDown className={cn('size-3 transition-transform', open && 'rotate-180')} />
      </DropdownTrigger>
      <DropdownPopover placement="bottom end">
        <DropdownMenu
          aria-label="更新日志版本"
          selectionMode="single"
          disallowEmptySelection
          selectedKeys={selectedKeys}
          onAction={handleAction}
        >
          <DropdownItem
            key="changelog-title"
            isDisabled
            className="cursor-default text-xs font-medium text-fd-muted-foreground opacity-100"
          >
            更新日志
          </DropdownItem>
          {versionItems.map((item) => (
            <DropdownItem key={item.key}>
              {item.label}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </DropdownPopover>
    </Dropdown>
  );
}
