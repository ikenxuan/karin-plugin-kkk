import type { ConfigPanelLayoutClasses } from './desktopConfigPanel'

/**
 * 手机端配置面板布局类。
 * 只放布局、间距和尺寸，不覆盖 HeroUI 组件视觉。
 */
export const mobileConfigPanelClasses: ConfigPanelLayoutClasses = {
  root: 'relative flex min-w-0 max-w-full flex-col gap-6',
  loading: 'flex min-h-80 items-center justify-center gap-3',
  header: 'flex flex-col gap-3 pt-12',
  headerCopy: 'flex min-w-0 flex-col gap-2',
  form: 'flex min-w-0 max-w-full flex-col gap-5',
  floatingActions: 'fixed right-4 top-16 z-10 flex items-center justify-end gap-3',
  sectionHeader: 'p-1',
  sectionContent: 'p-5',
  fields: 'grid grid-cols-1 gap-5',
  field: 'flex min-w-0 flex-col gap-2',
  choiceGrid: 'grid grid-cols-1 gap-3',
  divider: 'col-span-full flex min-w-0 flex-col gap-2 pt-3',
  tabsListContainer: 'w-full min-w-0 max-w-full overflow-x-auto overflow-y-hidden overscroll-x-contain overscroll-y-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
  tabsList: 'w-fit min-w-max *:w-fit *:min-w-fit *:flex-none *:shrink-0 *:whitespace-nowrap',
  topLevelFields: 'mb-4 space-y-4 px-4'
}
