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
        className='flex w-[90%] items-center px-[45px] py-[35px] rounded-[25px] shadow-large bg-content1 select-text'
        data-index={index}
      >
        <img 
          src={user.avatar_img} 
          alt="用户头像" 
          className="w-[150px] h-[150px] rounded-full mr-[50px] object-cover select-text"
        />
        <div className="flex flex-grow justify-between items-center">
          <div className="flex flex-col">
            <span className='text-[55px] mb-[15px] font-medium text-foreground select-text'>
              {user.username}
            </span>
            <div className='flex gap-[30px] text-[25px] text-foreground select-text'>
              <span>抖音号: {user.short_id}</span>
              <span>粉丝: {user.fans}</span>
              <span>获赞: {user.total_favorited}</span>
              <span>关注: {user.following_count}</span>
            </div>
          </div>
        </div>
      </li>
      <div className="h-[40px]"></div>
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
      <ul className="flex flex-col-reverse items-center p-0 list-none">
        {prop.data.renderOpt.map((user, index) => (
          <DouyinUserItem
            key={`${user.short_id}-${index}`}
            user={user}
            index={index}
            useDarkTheme={prop.data.useDarkTheme}
          />
        ))}
      </ul>
    </DefaultLayout>
  )
}

export default DouyinUserList