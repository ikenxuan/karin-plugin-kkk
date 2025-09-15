import React from 'react'

import type { BilibiliUserItemProps, BilibiliUserListProps } from '../../../types/platforms/bilibili/userlist'
import { DefaultLayout } from '../../layouts/DefaultLayout'
import { EnhancedImage } from './shared'

/**
 * B站用户项组件
 * @param props 组件属性
 * @returns B站用户项JSX元素
 */
const BilibiliUserItem: React.FC<BilibiliUserItemProps> = ({ user }) => {
  return (
    <>
      <li 
        className='flex w-[90%] items-center px-[45px] py-[35px] rounded-[25px] shadow-large bg-content1 select-text'
      >
        <EnhancedImage 
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
              <span>UID: {user.host_mid}</span>
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
 * B站用户列表组件
 * @param props 组件属性，包含用户列表数据和主题设置
 * @returns B站用户列表JSX元素
 */
const BilibiliUserList: React.FC<BilibiliUserListProps> = (prop) => {
  return (
    <DefaultLayout {...prop}>
      <ul className="flex flex-col-reverse items-center p-0 list-none">
        {prop.data.renderOpt.map((user, index) => (
          <BilibiliUserItem
            key={`${user.host_mid}-${index}`}
            user={user}
            useDarkTheme={prop.data.useDarkTheme}
          />
        ))}
      </ul>
    </DefaultLayout>
  )
}

export default BilibiliUserList