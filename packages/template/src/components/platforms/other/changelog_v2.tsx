import { Card, CardBody } from '@heroui/react'
import { 
  Bug,
  Code, 
  FileText,
  GitBranch,
  Globe, 
  Layers,
  Monitor,
  Package,
  Palette, 
  RefreshCw, 
  Settings,
  Shield, 
  Sparkles, 
  TestTube,
  Zap } from 'lucide-react'
import React from 'react'

import type { BaseComponentProps } from '../../../types'
import { DefaultLayout } from '../../layouts/DefaultLayout'

/**
 * 2.0版本更新日志组件属性接口
 */
export interface ChangelogV2Props extends BaseComponentProps {
  /** 渲染请求数据 */
  data: {
    /** 是否使用深色主题 */
    useDarkTheme?: boolean
    /** 页面标题 */
    title?: string
  }
}

/**
 * 更新项接口
 */
interface ChangelogItem {
  /** 更新项标题 */
  title: string
  /** 更新项描述 */
  description: string
}

/**
 * 更新分组接口
 */
interface ChangelogGroup {
  /** 分组标题 */
  title: string
  /** 分组图标 */
  icon: React.ReactNode
  /** 分组颜色主题 */
  color: string
  /** 更新项列表 */
  items: ChangelogItem[]
}

/**
 * 2.0版本更新日志数据
 */
const changelogData: ChangelogGroup[] = [
  {
    title: '重大变更',
    icon: <Shield className="w-8 h-8" />,
    color: 'danger',
    items: [
      {
        title: '多包工作区架构',
        description: '重构项目结构为多包工作区模式，提升开发效率和代码管理'
      },
      {
        title: 'SQLite3操作升级',
        description: '使用sql语句操作sqlite3，提升数据库功能和性能表现'
      }
    ]
  },
  {
    title: '核心功能',
    icon: <Sparkles className="w-8 h-8" />,
    color: 'primary',
    items: [
      {
        title: 'React渲染引擎',
        description: '使用React替代art-template，集成Vite支持实时开发调试'
      },
      {
        title: 'Tauri桌面应用',
        description: '添加Tauri桌面支持和Web UI增强，支持跨平台桌面应用'
      },
      {
        title: '多层编码签名验证',
        description: '添加多层编码签名验证中间件和前端实现，提升安全性'
      },
      {
        title: '心跳检测功能',
        description: '添加心跳检测和登录功能改进，提升系统稳定性'
      }
    ]
  },
  {
    title: 'B站功能增强',
    icon: <Palette className="w-8 h-8" />,
    color: 'secondary',
    items: [
      {
        title: '视频和直播动态',
        description: '新增视频和直播动态组件及共享功能，支持完整动态展示'
      },
      {
        title: '8K视频支持',
        description: '添加8K视频质量支持并更新依赖，提供超高清视频体验'
      },
      {
        title: 'B站图文动态',
        description: '添加B站图文动态组件及支持，完善动态内容展示'
      },
      {
        title: '番剧组件支持',
        description: '添加番剧组件支持及完善相关功能，丰富内容类型'
      },
      {
        title: '评论组件重构',
        description: '重构Bilibili评论组件并优化预览面板功能'
      },
      {
        title: '合辑解析支持',
        description: '支持合辑解析，扩展B站内容解析能力'
      }
    ]
  },
  {
    title: '渲染系统',
    icon: <Code className="w-8 h-8" />,
    color: 'success',
    items: [
      {
        title: 'URL参数控制',
        description: '支持URL参数控制平台和模板选择，提升使用灵活性'
      },
      {
        title: 'React渲染服务',
        description: '新增React渲染服务模块，提供强大的渲染能力'
      },
      {
        title: '组件自动注册',
        description: '重构组件注册和渲染逻辑，实现自动注册功能'
      }
    ]
  },
  {
    title: '抖音平台',
    icon: <Monitor className="w-8 h-8" />,
    color: 'warning',
    items: [
      {
        title: '抖音动态和直播',
        description: '添加抖音动态和直播组件，优化评论组件及开发环境配置'
      },
      {
        title: '抖音作品推送',
        description: '优化抖音作品推送文本描述及日志信息显示'
      }
    ]
  },
  {
    title: 'Web功能',
    icon: <Globe className="w-8 h-8" />,
    color: 'warning',
    items: [
      {
        title: '内容管理界面',
        description: '添加web解析页面鉴权开关并优化内容管理界面'
      },
      {
        title: '进度条和404页面',
        description: '添加进度条组件和404页面，提升用户体验'
      },
      {
        title: '前端路由支持',
        description: '添加connect-history-api-fallback支持前端路由'
      },
      {
        title: '主题支持',
        description: '重构内容管理页面并添加主题支持，提升界面美观度'
      }
    ]
  },
  {
    title: '错误修复',
    icon: <Bug className="w-8 h-8" />,
    color: 'danger',
    items: [
      {
        title: 'B站动态修复',
        description: '修复动态卡片中图片可能为空的判断缺失问题'
      },
      {
        title: '抖音解析优化',
        description: '修复抖音平台音乐数据解析中sec_uid的变量引用问题'
      },
      {
        title: '动态数据处理',
        description: '修正动态数据渲染逻辑和类型定义，提升数据处理准确性'
      },
      {
        title: '文件路径生成',
        description: '修正DataService文件路径生成逻辑，解决路径错误问题'
      },
      {
        title: '构建错误修复',
        description: '修复构建过程中的各种错误和配置问题'
      },
      {
        title: '动态过滤增强',
        description: '增强动态过滤日志并支持直播内容处理'
      }
    ]
  },
  {
    title: '性能优化',
    icon: <Zap className="w-8 h-8" />,
    color: 'success',
    items: [
      {
        title: '图片加载优化',
        description: '优化图片加载和错误处理机制，提升加载速度'
      },
      {
        title: '日志收集器优化',
        description: '优化日志收集器性能减少内存占用，提升系统效率'
      }
    ]
  },
  {
    title: '文档更新',
    icon: <FileText className="w-8 h-8" />,
    color: 'primary',
    items: [
      {
        title: 'B站动态类型定义',
        description: '添加B站动态相关类型定义，完善代码文档'
      },
      {
        title: '组件文档完善',
        description: '更新错误处理组件文档和类型定义'
      },
      {
        title: '类型注释添加',
        description: '添加类型注释和组件文档，提升代码可维护性'
      },
      {
        title: 'README更新',
        description: '更新项目README文档，完善使用说明'
      }
    ]
  },
  {
    title: '代码样式',
    icon: <Layers className="w-8 h-8" />,
    color: 'secondary',
    items: [
      {
        title: '代码格式统一',
        description: '统一代码格式和命名规范，提升代码质量'
      },
      {
        title: 'CSS变量优化',
        description: '统一组件样式使用CSS变量替代硬编码颜色'
      },
      {
        title: '无用代码清理',
        description: '清理无用文件和代码注释，保持代码整洁'
      }
    ]
  },
  {
    title: '代码重构',
    icon: <RefreshCw className="w-8 h-8" />,
    color: 'secondary',
    items: [
      {
        title: '动态组件优化',
        description: '优化动态组件代码结构并提取共享模块'
      },
      {
        title: '路径解析重构',
        description: '重构路径解析逻辑以支持三级路径格式'
      },
      {
        title: '数据库模型优化',
        description: '优化数据库模型和API路由，提升数据处理效率'
      },
      {
        title: '构建输出优化',
        description: '更新构建输出目录和chunk命名规范'
      },
      {
        title: '错误处理简化',
        description: '移除冗余代码并简化错误处理逻辑'
      }
    ]
  },
  {
    title: '测试完善',
    icon: <TestTube className="w-8 h-8" />,
    color: 'primary',
    items: [
      {
        title: '图文动态测试',
        description: '添加B站图文动态测试数据，完善测试覆盖'
      },
      {
        title: '动态组件测试',
        description: '添加动态组件测试数据，确保功能稳定性'
      },
      {
        title: '错误处理测试',
        description: '添加错误处理相关测试用例，提升代码健壮性'
      }
    ]
  },
  {
    title: '构建系统',
    icon: <Package className="w-8 h-8" />,
    color: 'warning',
    items: [
      {
        title: '依赖更新',
        description: '更新@ikenxuan/amagi依赖至5.2.0版本，获得最新功能'
      },
      {
        title: '构建配置优化',
        description: '更新构建输出目录和chunk命名，优化构建流程'
      },
      {
        title: 'TypeScript配置',
        description: '更新tsconfig和vite配置，提升开发体验'
      },
      {
        title: '依赖包版本统一',
        description: '更新依赖包版本，保持技术栈一致性'
      }
    ]
  },
  {
    title: '持续集成',
    icon: <GitBranch className="w-8 h-8" />,
    color: 'secondary',
    items: [
      {
        title: '构建配置调整',
        description: '调整构建配置和外部依赖，优化CI/CD流程'
      }
    ]
  },
  {
    title: '其他更新',
    icon: <Settings className="w-8 h-8" />,
    color: 'default',
    items: [
      {
        title: 'Mock服务器改进',
        description: '改进数据文件路由处理，提升开发调试体验'
      },
      {
        title: '日志级别配置',
        description: '更新依赖项和日志级别配置，优化系统监控'
      },
      {
        title: '动态卡片类型处理',
        description: '更新依赖并添加动态卡片类型处理功能'
      }
    ]
  }
]

/**
 * 更新分组组件
 * @param group 更新分组数据
 * @returns JSX元素
 */
const ChangelogGroupComponent: React.FC<{
  group: ChangelogGroup
}> = ({ group }) => {
  return (
    <Card className="w-full border-0 shadow-lg transition-all duration-300 bg-content1/95">
      <CardBody className="p-6">
        <div className="flex gap-4 items-center mb-5">
          <div className={`p-3 rounded-xl bg-${group.color}/10 flex-shrink-0`}>
            <div className={`text-${group.color}`}>
              {group.icon}
            </div>
          </div>
          <h3 className="text-3xl font-bold leading-tight text-foreground">{group.title}</h3>
        </div>
        
        <div className="space-y-4">
          {group.items.map((item, itemIndex) => (
            <div key={itemIndex} className="pl-4 transition-colors border-l-3 border-divider">
              <h4 className="mb-2 text-xl font-semibold leading-tight text-foreground">{item.title}</h4>
              <p className="text-lg leading-relaxed text-foreground-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  )
}

/**
 * 2.0版本更新日志组件
 * @param props 组件属性
 * @returns JSX元素
 */
export const ChangelogV2: React.FC<Omit<ChangelogV2Props, 'templateType' | 'templateName'>> = React.memo((props) => {
  const { data, version, scale } = props

  return (
    <DefaultLayout data={data} version={version} scale={scale}>
      <div className="min-h-screen bg-gradient-to-br from-background via-content1/20 to-content2/10">
        <div className="container px-10 py-10 pt-30 mx-auto max-w-[1400px]">
          <div className="mb-12 text-center">
            
            <h1 className="mb-4 text-6xl font-black leading-tight text-foreground">
              重磅功能 * karin-plugin-kkk v2.0 已发布
            </h1>
            
            <p className="mx-auto mb-6 max-w-4xl text-3xl leading-relaxed text-foreground-600">
              项目架构重构，React渲染引擎，多端应用支持，带来更强大的功能和更优秀的体验
            </p>
          </div>
          <div className="gap-6 space-y-6 columns-3">
            {changelogData.map((group, index) => (
              <div key={index} className="mb-6 break-inside-avoid">
                <ChangelogGroupComponent group={group} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </DefaultLayout>
  )
})

ChangelogV2.displayName = 'ChangelogV2'

export default ChangelogV2