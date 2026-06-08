/**
 * PC端主内容区组件
 */

import ConfigPanel from '../common/ConfigPanel'
import AboutPanel from '../common/AboutPanel'
import type { MainMenuKey } from '../../types/navigation'

interface MainContentProps {
  activeMenu: MainMenuKey
}

/**
 * 主内容区组件 - 根据当前菜单显示对应内容
 */
const MainContent = ({ activeMenu }: MainContentProps) => {
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
        return <ConfigPanel />
    }
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4">
      {renderContent()}
    </div>
  )
}

export default MainContent
