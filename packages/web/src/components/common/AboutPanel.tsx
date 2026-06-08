/**
 * 关于插件面板组件（通用）
 * PC端和移动端共用此组件
 */

import { Package, ExternalLink } from 'lucide-react'
import { Button, Card, Description } from '@heroui/react'

/**
 * 关于面板组件
 */
const AboutPanel = () => {
  /**
   * 打开外部链接
   */
  const openLink = (url: string) => {
    window.open(url, '_blank')
  }

  return (
    <Card className="mx-auto max-w-3xl">
      {/* 头部 */}
      <Card.Header className="items-center text-center gap-4 pt-8 pb-6">
        <Package size={64} aria-hidden="true" />
        <Card.Title>karin-plugin-kkk</Card.Title>
        <Card.Description>版本 2.33.0</Card.Description>
      </Card.Header>

      {/* 内容 */}
      <Card.Content className="flex flex-col gap-6 pb-8">
        {/* 描述 */}
        <section>
          <h3 className="mb-3 text-base font-semibold">插件简介</h3>
          <Description>
            Karin 的「抖音」「B站」视频解析/动态推送插件。
            支持视频解析、动态推送、扫码登录等功能。
          </Description>
        </section>

        {/* 作者 */}
        <section>
          <h3 className="mb-3 text-base font-semibold">开发者</h3>
          <Description>
            ikenxuan, sj817
          </Description>
        </section>

        {/* 链接 */}
        <section>
          <h3 className="mb-3 text-base font-semibold">相关链接</h3>
          <div className="mt-3 flex flex-wrap gap-3">
            <Button
              variant="outline"
              onPress={() => openLink('https://github.com/ikenxuan/karin-plugin-kkk')}
            >
              <ExternalLink size={18} aria-hidden="true" />
              <span>GitHub 仓库</span>
            </Button>
            <Button
              variant="outline"
              onPress={() => openLink('https://github.com/ikenxuan/karin-plugin-kkk/issues')}
            >
              <ExternalLink size={18} aria-hidden="true" />
              <span>反馈问题</span>
            </Button>
          </div>
        </section>
      </Card.Content>
    </Card>
  )
}

export default AboutPanel
