import { Chip } from '@heroui/react'
import { Hash, Heart, Power, User, UserPlus, Users } from 'lucide-react'
import React from 'react'

import type { DouyinUserListProps } from '../../../types/platforms/douyin/userlist'
import { DefaultLayout } from '../../layouts/DefaultLayout'

/**
 * 抖音用户项组件
 * @param props 组件属性
 * @returns 抖音用户项JSX元素
 */
const DouyinUserItem: React.FC<DouyinUserListProps['data']['renderOpt'][number]> = (props) => {
  return (
    <li
      className='flex items-center p-8 gap-8 rounded-3xl shadow-large bg-content1 select-text'
    >
      <img
        src={props.avatar_img}
        alt="用户头像"
        className="w-28 h-28 rounded-full object-cover select-text flex-shrink-0"
      />
      <div className="flex flex-col flex-grow min-w-0">
        <div className='flex items-center gap-5 mb-3'>
          <span className='text-4xl font-medium text-foreground select-text inline-flex items-center gap-2.5 truncate'>
            <User className="w-8 h-8 opacity-80 flex-shrink-0" aria-hidden="true" />
            <span className="truncate">{props.username}</span>
          </span>
          <Chip
            color={props.switch ? 'success' : 'default'}
            variant="flat"
            size="lg"
            startContent={<Power className="w-4 h-4" aria-hidden="true" />}
            className="flex-shrink-0"
          >
            <span className='text-xl'>{props.switch ? '开启' : '关闭'}</span>
          </Chip>
        </div>
        <div className='grid grid-cols-2 gap-x-8 gap-y-3 text-xl text-foreground/80 select-text'>
          <span className="inline-flex items-center gap-2.5 truncate">
            <Hash className="w-5 h-5 opacity-70 flex-shrink-0" aria-hidden="true" />
            <span className="truncate">抖音号: {props.short_id}</span>
          </span>
          <span className="inline-flex items-center gap-2.5 truncate">
            <Users className="w-5 h-5 opacity-70 flex-shrink-0" aria-hidden="true" />
            <span className="truncate">粉丝: {props.fans}</span>
          </span>
          <span className="inline-flex items-center gap-2.5 truncate">
            <Heart className="w-5 h-5 opacity-70 flex-shrink-0" aria-hidden="true" />
            <span className="truncate">获赞: {props.total_favorited}</span>
          </span>
          <span className="inline-flex items-center gap-2.5 truncate">
            <UserPlus className="w-5 h-5 opacity-70 flex-shrink-0" aria-hidden="true" />
            <span className="truncate">关注: {props.following_count}</span>
          </span>
        </div>
      </div>
    </li>
  )
}

/**
 * 抖音用户列表组件
 * @param props 组件属性，包含用户列表数据和主题设置
 * @returns 抖音用户列表JSX元素
 */
const DouyinUserList: React.FC<DouyinUserListProps> = (prop) => {
  return (
    <DefaultLayout {...prop}>
      <div className="w-full px-10 py-16">
        {/* 群组信息头部 */}
        <div className="mb-8 p-7 rounded-3xl bg-content2 shadow-medium">
          <h2 className="text-5xl font-bold text-foreground mb-2 select-text">
            {prop.data.groupInfo.groupName}
          </h2>
          <p className="text-2xl text-foreground/70 select-text">
            群号: {prop.data.groupInfo.groupId}
          </p>
          <p className="text-xl text-foreground/60 mt-2 select-text">
            共订阅 {prop.data.renderOpt.length} 个博主
          </p>
        </div>

        {/* 两列网格布局 */}
        <ul 
          className="grid grid-cols-2 gap-7 list-none p-0" 
          aria-label="抖音用户列表"
        >
          {prop.data.renderOpt.map((user, index) => (
            <DouyinUserItem
              key={`${user.short_id}-${index}`}
              {...user}
            />
          ))}
        </ul>
      </div>
    </DefaultLayout>
  )
}

export default DouyinUserList