import { HeroSection } from '@/components/hero-section';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'karin-plugin-kkk 文档',
  description: '多平台短视频/图文内容解析与推送 - 抖音/B站/快手/小红书',
};

export default function HomePage() {
  return <HeroSection />;
}
