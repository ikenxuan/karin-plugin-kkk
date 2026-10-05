/**
 * PC端主内容区组件
 */

import gsap from 'gsap'
import { useEffect, useRef } from 'react'

import type { MainMenuKey } from '../../types/navigation'
import { getAnimationDuration } from '../../utils/animations'
import AboutPanel from '../common/AboutPanel'
import ConfigPanel from '../common/ConfigPanel'

interface MainContentProps {
  activeMenu: MainMenuKey
}

/**
 * 主内容区组件 - 根据当前菜单显示对应内容
 */
const MainContent = ({ activeMenu }: MainContentProps) => {
  const contentRef = useRef<HTMLDivElement>(null)

  /**
   * 菜单切换时的入场过渡：整层淡入衔接内容替换。
   * 只动 opacity 不动 transform，避免打断面板内 fixed 定位的悬浮操作按钮。
   */
  useEffect(() => {
    if (!contentRef.current) return

    gsap.fromTo(
      contentRef.current,
      { autoAlpha: 0 },
      {
        autoAlpha: 1,
        duration: getAnimationDuration(0.2),
        ease: 'power2.out',
        overwrite: 'auto'
      }
    )
  }, [activeMenu])

  /**
   * 渲染对应菜单的内容面板
   */
  const renderContent = () => {
    switch (activeMenu) {
      case 'config':
        return <ConfigPanel device="desktop" />
      case 'about':
        return <AboutPanel />
      default:
        return <ConfigPanel device="desktop" />
    }
  }

  return (
    <div ref={contentRef} className="mx-auto w-full max-w-7xl px-4">
      {renderContent()}
    </div>
  )
}

export default MainContent
