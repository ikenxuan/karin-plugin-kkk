import type { Metadata } from 'next'

import { Footer } from '@/components/Footer'
import { HeroSection } from '@/components/hero-section'
import { PokerCardsSection } from '@/components/poker-cards-section'

export const metadata: Metadata = {
  title: 'karin-plugin-kkk 文档',
  description: '抖音与B站短视频/图文内容解析与动态推送插件 - 基于 Karin 框架'
}

export default function HomePage() {
  return (
    <div className="w-full">
      <HeroSection />
      <PokerCardsSection />
      <div className="px-4">
        <Footer />
      </div>
    </div>
  )
}
