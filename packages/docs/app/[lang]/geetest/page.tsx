'use client';
import { useState, useEffect, useMemo, Suspense } from 'react';
import type { Key } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter, useParams } from 'next/navigation';
import { Tabs, Toast } from '@heroui/react';
import { Geetest3Panel } from '@/components/geetest/Geetest3Panel';
import { Geetest4Panel } from '@/components/geetest/Geetest4Panel';
import type { GeetestVersion } from '@/components/geetest/types';

function GeetestAppContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { lang } = useParams();

  const urlParams = useMemo(() => {
    const versionParam = searchParams.get('v') || searchParams.get('version');
    let version: GeetestVersion = 'v3';
    if (versionParam === '4' || versionParam === 'v4') {
      version = 'v4';
    }
    return {
      version,
      hasVersionParam: Boolean(versionParam),
      gt: searchParams.get('gt') || undefined,
      challenge: searchParams.get('challenge') || undefined,
      captchaId: searchParams.get('captcha_id') || searchParams.get('captchaId') || undefined,
    };
  }, [searchParams]);

  const [version, setVersion] = useState<GeetestVersion>(urlParams.version);

  useEffect(() => {
    if (!urlParams.hasVersionParam) {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set('v', version === 'v3' ? '3' : '4');
      router.replace(`/${lang}/geetest?${newParams.toString()}`);
    }
  }, [urlParams.hasVersionParam, version, searchParams, router, lang]);

  const handleVersionChange = (newVersion: GeetestVersion) => {
    if (newVersion === version) return;

    setVersion(newVersion);
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('v', newVersion === 'v3' ? '3' : '4');
    if (newVersion === 'v3') {
      newParams.delete('captcha_id');
      newParams.delete('captchaId');
    } else {
      newParams.delete('gt');
      newParams.delete('challenge');
    }
    router.replace(`/${lang}/geetest?${newParams.toString()}`);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 gap-6">
      <Toast.Provider placement="top" />
      <div className="w-full max-w-md flex justify-between items-center">
        <Link
          href={`/${lang}`}
          className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          返回首页
        </Link>
        <Link
          href={`/${lang}/docs/guide/faq`}
          className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors"
        >
          查看文档
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      <div
        className="w-full max-w-md rounded-2xl border border-border/70 bg-surface/95 backdrop-blur-sm shadow-lg"
        style={{ minHeight: '480px' }}
      >
        <div className="flex flex-col gap-1 px-6 pt-6 pb-4">
          <h1 className="text-xl font-bold text-center text-foreground tracking-wider">极验验证器</h1>
          <p className="text-xs text-muted text-center">B站 -352 风控验证工具</p>
        </div>

        <div className="px-6 pb-6 pt-0">
          <Tabs
            selectedKey={version}
            onSelectionChange={(key: Key) => handleVersionChange(key as GeetestVersion)}
            className='w-full max-w-md'
          >
            <Tabs.ListContainer>
              <Tabs.List aria-label="极验版本切换" className="grid w-full grid-cols-2 gap-2">
                <Tabs.Tab id="v3" className="h-8 text-sm">
                  极验3
                  <Tabs.Indicator/>
                </Tabs.Tab>
                <Tabs.Tab id="v4" className="h-8 text-sm">
                  极验4
                  <Tabs.Indicator/>
                </Tabs.Tab>
              </Tabs.List>
            </Tabs.ListContainer>

            <Tabs.Panel id="v3" className="mt-5">
              <Geetest3Panel initialGt={urlParams.gt} initialChallenge={urlParams.challenge} />
            </Tabs.Panel>
            <Tabs.Panel id="v4" className="mt-5">
              <Geetest4Panel initialCaptchaId={urlParams.captchaId} />
            </Tabs.Panel>
          </Tabs>
        </div>
      </div>

      <div className="w-full max-w-md text-sm text-muted text-center space-y-1">
        <p>当 B站解析遇到 -352 错误时，使用此工具手动完成验证</p>
        <p>验证成功后结果会自动复制到剪贴板</p>
      </div>
    </div>
  );
}

export default function GeetestPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">加载中...</div>}>
      <GeetestAppContent />
    </Suspense>
  );
}
