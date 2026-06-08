export type MainMenuKey = 'config' | 'about'

export interface MainLayoutProps {
  activeMenu: MainMenuKey
  onMenuChange: (menu: MainMenuKey) => void
}
