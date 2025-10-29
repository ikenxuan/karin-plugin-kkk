import { Hash, Heart, User, UserPlus, Users } from 'lucide-react'
import React from 'react'

import type { DouyinUserItemProps, DouyinUserListProps } from '../../../types/platforms/douyin/userlist'
import { DefaultLayout } from '../../layouts/DefaultLayout'

/**
 * 抖音用户项组件
 * @param props 组件属性
 * @returns 抖音用户项JSX元素
 */
const DouyinUserItem: React.FC<DouyinUserItemProps> = ({ user, index }) => {
  return (
    <>
      <li
        className='flex w-[92%] items-center p-[40px] gap-[40px] rounded-[28px] shadow-large bg-content1 select-text'
        data-index={index}
      >
        <img
          src={user.avatar_img}
          alt="用户头像"
          className="w-[140px] h-[140px] rounded-full object-cover select-text"
        />
        <div className="flex flex-grow items-start">
          <div className="flex flex-col">
            <span className='text-[52px] mb-[14px] font-medium text-foreground select-text inline-flex items-center gap-[12px]'>
              <User className="w-[36px] h-[36px] opacity-80" aria-hidden="true" />
              {user.username}
            </span>
            <div className='grid grid-cols-2 gap-x-[40px] gap-y-[18px] text-[26px] text-foreground select-text'>
              <span className="inline-flex items-center gap-[12px]">
                <Hash className="w-[26px] h-[26px] opacity-70" aria-hidden="true" />
                抖音号: {user.short_id}
              </span>
              <span className="inline-flex items-center gap-[12px]">
                <Users className="w-[26px] h-[26px] opacity-70" aria-hidden="true" />
                粉丝: {user.fans}
              </span>
              <span className="inline-flex items-center gap-[12px]">
                <Heart className="w-[26px] h-[26px] opacity-70" aria-hidden="true" />
                获赞: {user.total_favorited}
              </span>
              <span className="inline-flex items-center gap-[12px]">
                <UserPlus className="w-[26px] h-[26px] opacity-70" aria-hidden="true" />
                关注: {user.following_count}
              </span>
            </div>
          </div>
        </div>
      </li>
      <div className="h-[36px]"></div>
    </>
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
      <ul className="flex flex-col-reverse items-center p-0 list-none" aria-label="抖音用户列表">
        {prop.data.renderOpt.map((user, index) => (
          <DouyinUserItem
            key={`${user.short_id}-${index}`}
            user={user}
            index={index}
          />
        ))}
      </ul>
    </DefaultLayout>
  )
}

export default DouyinUserList