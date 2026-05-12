import { HeroSection } from '@/components/hero-section';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'karin-plugin-kkk 文档',
  description: '抖音与B站短视频/图文内容解析与动态推送插件 - 基于 Karin 框架',
};

export default function HomePage() {
  return (
    <HeroSection />
  );
}
