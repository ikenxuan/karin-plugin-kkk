declare module 'virtual:karin-templates' {
  import type { TemplateDefinition } from 'karin-plugin-kkk-template'
  
  export interface RegisteredTemplate extends TemplateDefinition {
    id: string
    component: ComponentType<BaseTemplateProps>
    entry: string
  }
  
  export const templates: RegisteredTemplate[]
}
