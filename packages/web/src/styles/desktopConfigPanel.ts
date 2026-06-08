/**
 * PC 端配置面板布局类。
 * 只放布局、间距和尺寸，不覆盖 HeroUI 组件视觉。
 */
export interface ConfigPanelLayoutClasses {
  root: string
  loading: string
  header: string
  headerCopy: string
  form: string
  floatingActions: string
  sectionHeader: string
  sectionContent: string
  fields: string
  field: string
  choiceGrid: string
  divider: string
  tabsListContainer: string
  tabsList: string
  topLevelFields: string
}

/**
 * PC 端配置面板布局类。
 */
export const desktopConfigPanelClasses: ConfigPanelLayoutClasses = {
  root: 'relative flex flex-col gap-8',
  loading: 'flex min-h-80 items-center justify-center gap-3',
  header: 'grid grid-cols-[minmax(0,1fr)_auto] items-start gap-8 pr-44',
  headerCopy: 'flex min-w-0 flex-col gap-2',
  form: 'flex flex-col gap-6',
  floatingActions: 'fixed right-6 top-20 z-10 flex items-center justify-end gap-3',
  sectionHeader: 'p-2',
  sectionContent: 'p-6',
  fields: 'grid grid-cols-2 gap-x-6 gap-y-5',
  field: 'flex min-w-0 flex-col gap-2',
  choiceGrid: 'grid grid-cols-2 gap-3',
  divider: 'col-span-full flex min-w-0 flex-col gap-2 pt-3',
  tabsListContainer: 'scrollbar overflow-x-auto',
  tabsList: 'min-w-max',
  topLevelFields: 'mb-4 space-y-4 px-2'
}
