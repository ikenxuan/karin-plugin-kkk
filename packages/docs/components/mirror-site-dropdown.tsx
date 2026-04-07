'use client';

import { Dropdown, DropdownItem, DropdownMenu, DropdownPopover, DropdownTrigger, Link } from '@heroui/react';
import { Globe } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

type MirrorSite = {
  key: string;
  label: string;
  origin: string;
};

const mirrorSiteList: readonly MirrorSite[] = [
  {
    key: 'official',
    label: '主站',
    origin: 'https://karin-plugin-kkk-docs.vercel.app',
  },
  {
    key: 'netlify',
    label: 'Netlify 镜像',
    origin: 'https://karin-plugin-kkk-docs.netlify.app',
  },
  {
    key: 'cdn',
    label: 'CDN 镜像 1',
    origin: 'https://kkk.karinjs.com',
  },
  {
    key: 'cdn1',
    label: 'CDN 镜像 2',
    origin: 'https://kkk.qwqo.cn',
  },
];

const getHostname = (origin: string) => {
  try {
    return new URL(origin).host.toLowerCase();
  } catch {
    return '';
  }
};

const createTargetUrl = (origin: string) => {
  const currentUrl = new URL(window.location.href);
  const targetUrl = new URL(origin);
  targetUrl.pathname = currentUrl.pathname;
  targetUrl.search = currentUrl.search;
  targetUrl.hash = currentUrl.hash;
  return targetUrl.toString();
};

export const MirrorSiteDropdown = () => {
  const [currentHost, setCurrentHost] = useState('');
  const [currentHref, setCurrentHref] = useState('');

  useEffect(() => {
    setCurrentHost(window.location.host.toLowerCase());
    setCurrentHref(window.location.href);
  }, []);

  const availableSites = useMemo(() => {
    if (!currentHost) return mirrorSiteList;
    const isCurrentInMirrorList = mirrorSiteList.some((site) => getHostname(site.origin) === currentHost);
    if (!isCurrentInMirrorList) return mirrorSiteList;
    return mirrorSiteList.filter((site) => getHostname(site.origin) !== currentHost);
  }, [currentHost]);

  if (!availableSites.length) return null;

  return (
    <Dropdown>
      <DropdownTrigger className="inline-flex items-center gap-2 rounded-full px-3 h-8 text-sm bg-transparent hover:bg-default">
        <span className="inline-flex items-center gap-2">
          <Globe size={16} />
          镜像站
        </span>
      </DropdownTrigger>
      <DropdownPopover placement="bottom end">
        <DropdownMenu aria-label="镜像站列表" className="min-w-52">
          {availableSites.map((site) => (
            <DropdownItem key={site.key} textValue={site.label} className="text-left">
              <Link
                href={currentHref ? createTargetUrl(site.origin) : site.origin}
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline text-current hover:text-current w-full flex flex-col items-start text-left"
              >
                <span>{site.label}</span>
                <span className="text-xs text-fd-muted-foreground">{getHostname(site.origin)}</span>
              </Link>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </DropdownPopover>
    </Dropdown>
  );
};
