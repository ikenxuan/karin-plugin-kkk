import React from 'react'

import type { HelpProps, MenuGroup } from '../../../types/help'
import { DefaultLayout } from '../../layouts/DefaultLayout'

/**
 * 帮助页面菜单数据
 */
const menuData: MenuGroup[] = [
  {
    title: '常用功能',
    items: [
      {
        title: '「#解析」「#kkk解析」',
        description: '在解析功能关闭的情况下，可对引用消息进行解析'
      }
    ]
  },
  {
    title: '推送相关',
    items: [
      {
        title: '#抖音/B站全部?强制推送',
        description: '全部强制推送：手动模拟一次定时任务；\n强制推送：只在触发群模拟一次定时任务；\n已推送过的不会再推送'
      },
      {
        title: '#kkk设置推送机器人 + Bot ID',
        description: '一键更换推送机器人'
      },
      {
        title: '#抖音/B站推送列表',
        description: '查看当前群的订阅推送列表'
      }
    ],
    subGroups: [
      {
        title: '在群聊中再发送一次即可取消订阅',
        items: [
          {
            title: '#设置抖音推送 + 抖音号',
            description: '在群聊中发送以对该群订阅该博主的作品更新'
          },
          {
            title: '#设置B站推送 + UP主UID',
            description: '在群聊中发送以对该群订阅该博主的作品更新'
          }
        ]
      }
    ]
  },
  {
    title: '其他',
    items: [
      {
        title: '#抖音登录',
        description: '使用抖音APP扫码登录获取 Cookies'
      },
      {
        title: '#B站登录',
        description: '使用哔哩哔哩APP扫码登录获取 Cookies'
      },
      {
        title: '「#kkk更新日志」「#kkk更新」「#kkk更新预览版」',
        description: '字面意思~'
      }
    ]
  }
]

/**
 * 菜单项组件
 * @param props 组件属性
 * @returns JSX元素
 */
const MenuItemComponent: React.FC<{
  item: { title: string; description: string }
  useDarkTheme?: boolean
}> = ({ item, useDarkTheme }) => {
  return (
    <>
      <div className={`
        flex justify-center items-center font-bold cursor-pointer rounded-[26px] p-5 text-[34px]
        ${useDarkTheme 
      ? 'bg-[#1e1e1e] text-[cornsilk] hover:bg-[#d6d6d6]' 
      : 'bg-[#e9e9e9] text-black hover:bg-[#d6d6d6]'
    }
      `}>
        {item.title}
      </div>
      <div className={`
        flex text-[27px] mx-[15px] my-[10px] mb-5
        ${useDarkTheme ? 'text-[#b4b4b4]' : 'text-[#666]'}
      `}>
        {item.description.split('\\n').map((line, index) => (
          <React.Fragment key={index}>
            {line}
            {index < item.description.split('\\n').length - 1 && <br />}
          </React.Fragment>
        ))}
      </div>
    </>
  )
}

/**
 * 菜单分组组件
 * @param props 组件属性
 * @returns JSX元素
 */
const MenuGroupComponent: React.FC<{
  group: MenuGroup
  useDarkTheme?: boolean
}> = ({ group, useDarkTheme }) => {
  return (
    <div className="flex justify-around p-5">
      <div className={`
        flex-[0_0_88%] p-[45px] rounded-[70px_15px_70px_15px] shadow-[0_2px_20px_3px_rgba(0,0,0,0.21)]
        ${useDarkTheme ? 'bg-[#303030]' : 'bg-[#f4f4f4]'}
      `}>
        <h2 className={`
          text-[50px] m-0 mb-[15px]
          ${useDarkTheme ? 'text-[cornsilk]' : 'text-[#333]'}
        `}>
          {group.title}
        </h2>
        
        {/* 子分组 */}
        {group.subGroups?.map((subGroup, subIndex) => (
          <div key={subIndex} className={`
            p-[60px] rounded-[70px_15px_70px_15px] shadow-[0_2px_20px_3px_rgba(0,0,0,0.21)] mb-[45px]
            ${useDarkTheme ? 'bg-[#393939]' : 'bg-[#f4f4f4]'}
          `}>
            <h3 className={`
              text-[xx-large] m-0 mb-[25px]
              ${useDarkTheme ? 'text-[cornsilk]' : 'text-[#333]'}
            `}>
              {subGroup.title}
            </h3>
            {subGroup.items.map((item, itemIndex) => (
              <MenuItemComponent 
                key={itemIndex} 
                item={item} 
                useDarkTheme={useDarkTheme} 
              />
            ))}
          </div>
        ))}
        
        {/* 主菜单项 */}
        {group.items.map((item, itemIndex) => (
          <MenuItemComponent 
            key={itemIndex} 
            item={item} 
            useDarkTheme={useDarkTheme} 
          />
        ))}
      </div>
    </div>
  )
}

/**
 * 帮助页面组件
 * @param props 组件属性
 * @returns JSX元素
 */
export const Help: React.FC<Omit<HelpProps, 'templateType' | 'templateName'>> = React.memo((props) => {
  const useDarkTheme = props.data?.useDarkTheme || false

  return (
    <DefaultLayout {...props}>
      <div className="h-[100px]" /> {/* spacer */}
      
      {menuData.map((group, index) => (
        <MenuGroupComponent 
          key={index} 
          group={group} 
          useDarkTheme={useDarkTheme} 
        />
      ))}
    </DefaultLayout>
  )
})

Help.displayName = 'Help'

export default Help