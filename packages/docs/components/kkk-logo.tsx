'use client'

import { cn } from '@/lib/cn'
import { GlowImage } from './GlowImage'

interface HeroUILogoProps {
  className?: string
  size?: number
  height?: number
  width?: number
}

export const KKKLogo = ({ className }: HeroUILogoProps) => {
  return (
    <>
      <div className='flex items-center gap-2'>
        <GlowImage glowStrength={1} blurRadius={15} darkOnly>
          <svg
            id="114514"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 178.23 178.23"
            className={cn("w-auto h-7", className)}
            aria-hidden="true"
            fill="none"
          >
            <path id="_1" fill="currentColor" d="M104.26,65.94L50.54,12.58C45.88,7.95,49.16,0,55.72,0h115.13C177.42,0,180.7,7.95,176.04,12.58l-53.72,53.37c-4.99,4.96-13.06,4.96-18.05,0Z" />
            <path id="_2" fill="currentColor" d="M0,165.47l.03-51.42c-.02-6.57,7.92-9.87,12.56-5.23l57.02,57.02c4.64,4.64,1.34,12.41-5.23,12.39H12.96C5.92,178.21.02,172.51,0,165.47Z" />
            <path fill="currentColor" d="M12.66,2.17l162.19,162.13c4.63,4.63,2.56,13.93-3.99,13.93h-49.23c-9.4,0-18.41-6.33-25.06-12.97L12.97,81.65C6.32,75,0,65.99,0,56.59V7.37C0,.82,8.03-2.46,12.66,2.17Z" />
          </svg>
        </GlowImage>

        <div className='flex flex-col items-start'>
          <span className='text-[10px] font-semibold uppercase opacity-70'>karin-plugin</span>
          <span className='text-base font-bold leading-tight'>kkk</span>
        </div>
      </div>
    </>
  )
}
