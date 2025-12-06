import { Link } from "react-router"
import { TextHoverEffect } from "./ui/text-hover-effect"
import { NoiseBackground } from "./ui/noise-background"
import { SparklesText } from "./ui/sparkles-text"
import { MorphingText } from "./ui/morphing-text"
import { InteractiveHoverButton } from "./ui/interactive-hover-button"
import { Highlighter } from "./ui/highlighter"
import { LinkPreview } from "./ui/link-preview"

export function HeroSection () {
  return (
    <div className="h-svh w-full flex flex-col relative overflow-hidden">
      {/* 霸屏背景文字效果 */}
      <div className="absolute inset-x-0 top-0 z-0 pointer-events-none">
        <div className="w-screen">
          <TextHoverEffect text="KKK" />
        </div>
      </div>

      {/* 主内容区域 */}
      <div className="flex flex-1 relative z-10 flex-col items-center justify-center px-4">
        {/* 主标题 */}
        <div className="relative h-12 md:h-20 w-full max-w-4xl mb-8">
          <MorphingText 
            texts={["karin-plugin-kkk", "视频解析", "动态推送", "评论渲染"]} 
            className="text-fd-foreground text-4xl md:text-6xl"
          />
        </div>
        
        {/* 副标题 */}
        <p className="text-lg md:text-xl text-center text-fd-muted-foreground max-w-2xl mb-12">
          基于{" "}
          <LinkPreview url="https://karinjs.com" className="cursor-pointer">
            <Highlighter action="underline" color="#FFD700" strokeWidth={2}>
              Karin
            </Highlighter>
          </LinkPreview>
          {" "}框架的视频解析与动态推送插件
        </p>

        {/* 快捷跳转按钮 */}
        <div className="flex flex-wrap gap-4 justify-center">
          {/* SparklesText 包裹整个按钮 */}
          <SparklesText 
            className="p-4 -m-4"
            sparklesCount={10}
            colors={{ first: "#9E7AFF", second: "#FE8BBB" }}
          >
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
          </SparklesText>

          <a
            href="https://github.com/ikenxuan/karin-plugin-kkk"
            target="_blank"
            rel="noopener noreferrer"
          >
            <InteractiveHoverButton className="h-12">
              访问源代码
            </InteractiveHoverButton>
          </a>
        </div>
      </div>
    </div>
  )
}
