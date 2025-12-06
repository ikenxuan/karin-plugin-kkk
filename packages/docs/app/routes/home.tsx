import type { Route } from './+types/home'
import { HomeLayout } from 'fumadocs-ui/layouts/home'
import { baseOptions } from '@/lib/layout.shared'
import { HeroSection } from '@/components/hero-section'
import { AuroraBackground } from '@/components/ui/aurora-background'

export function meta ({ }: Route.MetaArgs) {
  return [
    { title: 'karin-plugin-kkk 文档' },
    { name: 'description', content: '多平台短视频/图文内容解析与推送 - 抖音/B站/快手/小红书' },
  ]
}

export default function Home () {
  return (
    <AuroraBackground>
      <HomeLayout {...baseOptions()}>
        <HeroSection />
      </HomeLayout>
    </AuroraBackground>
  )
}
