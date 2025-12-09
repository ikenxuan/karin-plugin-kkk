'use client';

import { SiTypescript, SiReact, SiVite, SiTailwindcss } from 'react-icons/si';
import Image from 'next/image';
import { cn } from '@/lib/cn';
import { GlowImage } from './GlowImage';

export function SidebarBanner() {
  return (
    <div className="flex flex-col gap-2.5 pb-2 w-full select-none group/container">
      {/* Main Card */}
      <div className="overflow-hidden relative w-full rounded-xl border transition-colors bg-linear-to-br from-purple-500/5 to-blue-500/5 dark:from-purple-500/10 dark:to-blue-500/10 border-border/40 hover:border-border/60">
        <div className="flex flex-row items-stretch min-h-[110px]">
          
          {/* Left: Text Content (60%) */}
          <div className="flex z-10 flex-col gap-2 justify-center p-3 flex-3">
            {/* Tech Stack Icons */}
            <div className="flex items-center gap-2 text-muted-foreground/60 mb-0.5">
              <a href="https://www.typescriptlang.org/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                <SiTypescript className="w-3 h-3 transition-colors hover:text-[#3178C6]" />
              </a>
              <a href="https://react.dev/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                <SiReact className="w-3 h-3 transition-colors hover:text-[#61DAFB]" />
              </a>
              <a href="https://vitejs.dev/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                <Image 
                  src="/vite.svg" 
                  alt="Vite" 
                  width={12} 
                  height={12} 
                  className="w-3 h-3 opacity-60 grayscale transition-all hover:grayscale-0 hover:opacity-100"
                />
              </a>
              <a href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                <SiTailwindcss className="w-3 h-3 transition-colors hover:text-[#06B6D4]" />
              </a>
            </div>

            <div className="space-y-1">
              <h2 className="text-[14px] font-bold leading-none tracking-tight text-foreground/90">
                多平台媒体解析
              </h2>
              <h3 className="text-[14px] font-bold leading-none tracking-tight text-transparent bg-clip-text bg-linear-to-r from-primary to-purple-500">
                群聊分享体验升级
              </h3>
            </div>
            
            <p className="text-[10px] text-muted-foreground leading-snug opacity-80 line-clamp-2 pr-1">
              抖音/B站等多平台一键解析，视频/图文/热评智能提取
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-1.5 mt-1">
               <FeatureTag text="无需跳转" />
               <FeatureTag text="精美模板" />
               <FeatureTag text="博主订阅" />
               <FeatureTag text="智能提取" />
            </div>
          </div>

          {/* Right: Phones (40%) */}
          <div className="relative min-w-0 flex-2 group/phones">
             {/* Container for phones to ensure they stay within bounds but overlap nicely */}
             <div className="overflow-visible absolute inset-0 cursor-pointer">
                {/* Back Phone (Right) */}
                <div className="absolute top-[10%] right-[-5%] w-[85%] h-[85%] transition-transform duration-500 ease-out group-hover/phones:translate-x-1 group-hover/phones:rotate-6 origin-bottom-right z-10">
                    <Image 
                        src="/iPhone 15 Pro 右.png" 
                        alt="Preview" 
                        width={200} 
                        height={400} 
                        className="object-contain w-full h-full drop-shadow-md"
                        priority
                    />
                </div>
                {/* Front Phone (Left) */}
                <div className="absolute top-[16%] right-[25%] w-[85%] h-[85%] transition-transform duration-500 ease-out group-hover/phones:-translate-x-2 group-hover/phones:-rotate-3 origin-bottom-right z-20">
                    <Image 
                        src="/iPhone 15 Pro 左.png" 
                        alt="Preview" 
                        width={200} 
                        height={400} 
                        className="object-contain w-full h-full drop-shadow-lg"
                        priority
                    />
                </div>
             </div>
             {/* Gradient Fade to blend phones with background if they get too close to edge */}
             <div className="absolute inset-y-0 left-0 w-6 to-transparent pointer-events-none bg-linear-to-r from-background/0" />
          </div>

        </div>
      </div>
    </div>
  );
}

function FeatureTag({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center justify-center px-1.5 py-0.5 rounded-[5px] bg-background/60 border border-border/30 text-[9px] text-muted-foreground whitespace-nowrap shadow-sm backdrop-blur-sm">
      {text}
    </span>
  );
}
