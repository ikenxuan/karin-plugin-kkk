import { Link } from "react-router"
import { TextHoverEffect } from "./ui/text-hover-effect"
import { NoiseBackground } from "./ui/noise-background"

export function HeroSection () {
  return (
    <div className="h-svh w-full flex flex-col relative overflow-hidden">
      {/* 霸屏背景文字效果 - 贴着顶部 */}
      <div className="absolute inset-x-0 top-0 z-0 pointer-events-none">
        <div className="w-screen">
          <TextHoverEffect text="KKK" />
        </div>
      </div>

      {/* 主内容区域 */}
      <div className="flex flex-1 relative z-10 flex-col items-center justify-center px-4">
        {/* 主标题 */}
        <h1 className="text-4xl md:text-6xl font-bold text-center text-fd-foreground mb-4">
          karin-plugin-kkk
        </h1>
        
        {/* 副标题 */}
        <p className="text-lg md:text-xl text-center text-fd-muted-foreground max-w-2xl mb-8">
          多平台短视频/图文内容解析与推送
          <br />
          <span className="text-base">
            抖音 · B站 · 快手 · 小红书
          </span>
        </p>

        {/* 快捷跳转按钮 */}
        <div className="flex flex-wrap gap-4 justify-center">
          {/* NoiseBackground 样式按钮 */}
          <Link
            className="inline-flex overflow-hidden relative p-px h-12 rounded-full focus:outline-none focus:ring-2 focus:ring-fd-ring focus:ring-offset-2"
            to="/docs"
          >
            <NoiseBackground
              containerClassName="w-full h-full rounded-full flex items-center justify-center bg-transparent dark:bg-transparent"
              className="px-6 py-1"
              gradientColors={[
                "rgb(255, 100, 150)",
                "rgb(100, 150, 255)",
                "rgb(255, 200, 100)",
              ]}
            >
              <span className="flex relative z-10 gap-2 items-center text-lg text-fd-foreground">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                阅读文档
              </span>
            </NoiseBackground>
          </Link>

          <Link
            className="inline-flex gap-2 items-center px-6 py-3 font-medium rounded-full border transition-colors text-fd-foreground border-fd-border bg-fd-background/50 backdrop-blur-sm hover:bg-fd-accent"
            to="/docs/guide/quick-start"
          >
            快速开始
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>

          <a
            className="inline-flex gap-2 items-center px-6 py-3 font-medium rounded-full border transition-colors text-fd-foreground border-fd-border bg-fd-background/50 backdrop-blur-sm hover:bg-fd-accent"
            href="https://github.com/ikenxuan/karin-plugin-kkk"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
            GitHub
          </a>
        </div>
      </div>
    </div>
  )
}
