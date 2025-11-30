import type { Route } from './+types/home';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { Link } from 'react-router';
import { baseOptions } from '@/lib/layout.shared';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'karin-plugin-kkk 文档' },
    { name: 'description', content: '抖音/B站/快手/小红书解析与推送，评论解析全覆盖，精美图片 UI' },
  ];
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="group relative p-6 rounded-2xl border border-fd-border/50 bg-fd-card/50 backdrop-blur-sm hover:border-fd-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-fd-primary/5">
      <div className="mb-4 text-fd-primary">{icon}</div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-fd-muted-foreground text-sm leading-relaxed">{description}</p>
    </div>
  );
}

function PlatformBadge({ name, supported }: { name: string; supported: boolean }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm ${
      supported 
        ? 'bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20' 
        : 'bg-fd-muted/50 text-fd-muted-foreground border border-fd-border/50'
    }`}>
      {supported && (
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      )}
      {name}
    </span>
  );
}



export default function Home() {
  return (
    <HomeLayout {...baseOptions()}>

      <div className="flex flex-col min-h-[calc(100vh-4rem)]">
        {/* Hero Section */}
        <section className="relative flex-1 flex flex-col items-center justify-center px-4 py-20">
          {/* Badge */}
          <div className="mb-6 px-4 py-1.5 rounded-full border border-fd-border/50 bg-fd-background/60 backdrop-blur-sm text-sm text-fd-muted-foreground">
            🎉 Karin 机器人插件
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-4 pb-2 bg-linear-to-r from-fd-foreground via-fd-primary to-purple-500 bg-clip-text text-transparent leading-normal">
            karin-plugin-kkk
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl text-fd-muted-foreground text-center max-w-2xl mb-8 leading-relaxed">
            抖音 / B站 / 快手 / 小红书 解析与推送
            <br />
            <span className="text-fd-foreground font-medium">评论解析全覆盖，精美图片 UI</span>
          </p>

          {/* Platform badges */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            <PlatformBadge name="抖音" supported />
            <PlatformBadge name="B站" supported />
            <PlatformBadge name="快手" supported />
            <PlatformBadge name="小红书" supported />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-fd-primary text-fd-primary-foreground font-medium hover:opacity-90 transition-opacity shadow-lg shadow-fd-primary/25"
              to="/docs"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              阅读文档
            </Link>
            <Link
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-fd-border/50 bg-fd-background/60 backdrop-blur-sm hover:bg-fd-accent/60 transition-colors font-medium"
              to="/docs/guide/quick-start"
            >
              快速开始
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <a
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-fd-border/50 bg-fd-background/60 backdrop-blur-sm hover:bg-fd-accent/60 transition-colors font-medium"
              href="https://github.com/ikenxuan/karin-plugin-kkk"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              GitHub
            </a>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <svg className="w-6 h-6 text-fd-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-4 py-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">核心功能</h2>
            <p className="text-fd-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              为 Karin 机器人提供全面的社交媒体内容解析与推送能力
            </p>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <FeatureCard
                icon={
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                }
                title="多平台解析"
                description="自动识别抖音、B站、快手、小红书链接，一键解析视频、图片、文本内容"
              />
              <FeatureCard
                icon={
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                }
                title="评论解析"
                description="支持多平台评论抓取，统一渲染为精美图片，保持视觉一致性"
              />
              <FeatureCard
                icon={
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                }
                title="自动推送"
                description="订阅创作者账号，定时监控并推送新内容到指定群聊"
              />
              <FeatureCard
                icon={
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                }
                title="精美渲染"
                description="基于 React SSR 的模板系统，提供高质量图片输出"
              />
              <FeatureCard
                icon={
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                }
                title="灵活配置"
                description="支持画质偏好、体积限制、过滤策略等多维度配置"
              />
              <FeatureCard
                icon={
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                }
                title="Web 管理"
                description="可视化配置界面，支持推送历史查看和数据库管理"
              />
            </div>
          </div>
        </section>

        {/* Platform Support Section */}
        <section className="px-4 py-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">平台支持</h2>
            <p className="text-fd-muted-foreground text-center mb-12">
              全面覆盖主流社交媒体平台
            </p>
            
            <div className="overflow-x-auto rounded-2xl border border-fd-border/50 bg-fd-card/30 backdrop-blur-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-fd-border/50">
                    <th className="text-left py-4 px-6 font-semibold">平台</th>
                    <th className="text-center py-4 px-4 font-semibold">内容解析</th>
                    <th className="text-center py-4 px-4 font-semibold">评论解析</th>
                    <th className="text-center py-4 px-4 font-semibold">自动推送</th>
                    <th className="text-center py-4 px-4 font-semibold">扫码登录</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: '抖音', parse: true, comment: true, push: true, login: true },
                    { name: 'B站', parse: true, comment: true, push: true, login: true },
                    { name: '快手', parse: true, comment: true, push: false, login: false },
                    { name: '小红书', parse: true, comment: true, push: false, login: false },
                  ].map((platform, index, arr) => (
                    <tr key={platform.name} className={`hover:bg-fd-muted/20 transition-colors ${index !== arr.length - 1 ? 'border-b border-fd-border/30' : ''}`}>
                      <td className="py-4 px-6 font-medium">{platform.name}</td>
                      <td className="text-center py-4 px-4">
                        <span className={platform.parse ? 'text-green-500' : 'text-fd-muted-foreground'}>
                          {platform.parse ? '✓' : '—'}
                        </span>
                      </td>
                      <td className="text-center py-4 px-4">
                        <span className={platform.comment ? 'text-green-500' : 'text-fd-muted-foreground'}>
                          {platform.comment ? '✓' : '—'}
                        </span>
                      </td>
                      <td className="text-center py-4 px-4">
                        <span className={platform.push ? 'text-green-500' : 'text-fd-muted-foreground'}>
                          {platform.push ? '✓' : '—'}
                        </span>
                      </td>
                      <td className="text-center py-4 px-4">
                        <span className={platform.login ? 'text-green-500' : 'text-fd-muted-foreground'}>
                          {platform.login ? '✓' : '—'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Tools Section */}
        <section className="px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">实用工具</h2>
            <p className="text-fd-muted-foreground text-center mb-8">
              解决使用过程中的常见问题
            </p>
            <div className="flex justify-center">
              <Link
                to="/geetest?v=3"
                className="group p-6 rounded-2xl border border-fd-border/50 bg-fd-card/50 backdrop-blur-sm hover:border-fd-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-fd-primary/5 max-w-sm w-full"
              >
                <div className="mb-4 text-fd-primary">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg mb-2">极验验证器</h3>
                <p className="text-fd-muted-foreground text-sm leading-relaxed">
                  B站解析遇到 -352 风控时，使用此工具手动完成验证
                </p>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 py-20">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">准备好开始了吗？</h2>
            <p className="text-fd-muted-foreground mb-8">
              只需几分钟即可完成安装配置，让你的 Karin 机器人拥有强大的解析能力
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-fd-primary text-fd-primary-foreground font-medium hover:opacity-90 transition-opacity shadow-lg shadow-fd-primary/25"
                to="/docs/guide/quick-start"
              >
                立即安装
              </Link>
              <a
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-fd-border/50 bg-fd-background/60 backdrop-blur-sm hover:bg-fd-accent/60 transition-colors font-medium"
                href="http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=S8y6baEcSkO6TEO5kEdfgmJhz79Oxdw5&authKey=ficWQytHGz3KIv5i0HpGbEeMBpABBXfjEMYRzo3ZwMV%2B0Y5mq8cC0Yxbczfa904H&noverify=0&group_code=795874649"
                target="_blank"
                rel="noopener noreferrer"
              >
                加入交流群
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-4 py-8 border-t border-fd-border/50">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-fd-muted-foreground">
            <p>GPL-3.0 Licensed | Copyright © 2024-present ikenxuan</p>
            <div className="flex items-center gap-4">
              <a href="https://github.com/ikenxuan/karin-plugin-kkk" target="_blank" rel="noopener noreferrer" className="hover:text-fd-foreground transition-colors">
                GitHub
              </a>
              <a href="https://afdian.com/a/ikenxuan" target="_blank" rel="noopener noreferrer" className="hover:text-fd-foreground transition-colors">
                爱发电
              </a>
            </div>
          </div>
        </footer>
      </div>
    </HomeLayout>
  );
}
