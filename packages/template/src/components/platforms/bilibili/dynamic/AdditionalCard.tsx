import { Button } from '@heroui/react'
import { BarChart3, Bell, Gamepad2, Gift } from 'lucide-react'
import React from 'react'

import type { BilibiliAdditionalData } from '../../../../types/platforms/bilibili'
import { EnhancedImage } from '../shared'

/**
 * B站预约卡片组件
 */
export const BilibiliReserveCard: React.FC<{ reserve: NonNullable<BilibiliAdditionalData>['reserve'] }> = ({ reserve }) => {
  if (!reserve) return null

  return (
    <div className='overflow-hidden rounded-2xl bg-default-100'>
      <div className='flex gap-8 justify-between items-center px-10 py-10'>
        <div className='flex flex-col gap-4 flex-1'>
          <div className='text-5xl font-normal text-foreground select-text leading-tight'>
            {reserve.title}
          </div>
          <div className='flex gap-8 items-center font-light text-4xl text-foreground-500'>
            <span className='select-text'>{reserve.desc1}</span>
            <span className='select-text'>{reserve.desc2}</span>
          </div>
          {reserve.desc3 && (
            <div className='flex gap-2 items-center text-4xl select-text leading-none text-[#fb7299]'>
              <Gift size={40} className='shrink-0' />
              <span className='line-clamp-1'>{reserve.desc3}</span>
            </div>
          )}
        </div>
        <div className='shrink-0'>
          <Button
            startContent={reserve.buttonText !== '已结束' ? <Bell className='scale-180 mr-4' /> : undefined}
            className={`text-5xl font-normal px-8 py-5 h-auto min-w-0 ${
              reserve.buttonText === '已结束'
                ? 'bg-default/70 text-default-400'
                : 'bg-[#fb7299] text-white'
            }`}
            radius='md'
          >
            {reserve.buttonText}
          </Button>
        </div>
      </div>
    </div>
  )
}

/**
 * B站投票卡片组件
 */
export const BilibiliVoteCard: React.FC<{ vote: NonNullable<BilibiliAdditionalData>['vote'] }> = ({ vote }) => {
  if (!vote) return null

  const isEnded = vote.status === 4

  return (
    <div className='overflow-hidden rounded-2xl bg-default-100'>
      <div className='flex gap-8 items-center px-10 py-8'>
        <div className='shrink-0'>
          <BarChart3 size={56} className='text-foreground-400' />
        </div>
        <div className='flex flex-col gap-3 flex-1 min-w-0'>
          <div className='text-5xl font-medium text-foreground select-text line-clamp-1'>
            {vote.title}
          </div>
          <div className='text-4xl text-foreground-500 select-text'>
            {vote.desc}
          </div>
        </div>
        <div className='shrink-0'>
          <Button
            className={`text-5xl font-normal px-8 py-5 h-auto min-w-0 ${
              isEnded
                ? 'bg-default/70 text-default-400'
                : 'bg-[#fb7299] text-white'
            }`}
            radius='md'
          >
            {isEnded ? '已结束' : '参与'}
          </Button>
        </div>
      </div>
    </div>
  )
}

/**
 * B站通用卡片组件（游戏等）
 */
export const BilibiliCommonCard: React.FC<{ common: NonNullable<BilibiliAdditionalData>['common'] }> = ({ common }) => {
  if (!common) return null

  const getTagText = () => {
    if (common.sub_type === 'game') return '游戏'
    return common.desc1
  }

  return (
    <div className='flex flex-col gap-4'>
      {common.head_text && (
        <div className='flex gap-2 items-center text-4xl text-foreground-500'>
          <Gamepad2 size={40} />
          <span>{common.head_text}</span>
        </div>
      )}
      <div className='overflow-hidden rounded-2xl bg-default-100'>
        <div className='flex gap-8 items-center px-10 py-8'>
          <div className='shrink-0'>
            <EnhancedImage
              src={common.cover}
              alt={common.title}
              className='w-40 h-40 rounded-2xl object-cover'
            />
          </div>
          <div className='flex flex-col gap-3 flex-1 min-w-0'>
            <div className='text-5xl font-medium text-foreground select-text line-clamp-1'>
              {common.title}
            </div>
            <div className='flex gap-3 items-center text-4xl'>
              <span className='shrink-0 px-3 py-1 rounded-md bg-[#fb7299]/10 text-[#fb7299] text-3xl'>
                {getTagText()}
              </span>
              {common.sub_type === 'game' && common.desc1 && (
                <span className='text-foreground-500 line-clamp-1 select-text'>
                  {common.desc1}
                </span>
              )}
            </div>
            {common.desc2 && (
              <div className='text-4xl text-foreground-500 line-clamp-1 select-text'>
                {common.desc2}
              </div>
            )}
          </div>
          {common.button_text && (
            <div className='shrink-0'>
              <Button
                className='text-5xl font-normal px-8 py-5 h-auto min-w-0 bg-[#fb7299] text-white'
                radius='md'
              >
                {common.button_text}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/**
 * B站视频跳转卡片组件（UGC）
 */
export const BilibiliUgcCard: React.FC<{ ugc: NonNullable<BilibiliAdditionalData>['ugc'] }> = ({ ugc }) => {
  if (!ugc) return null

  return (
    <div className='overflow-hidden rounded-3xl bg-default-100'>
      <div className='flex gap-8 items-center pr-8'>
        <div className='relative shrink-0 p-5'>
          <EnhancedImage
            src={ugc.cover}
            alt={ugc.title}
            className='h-52 w-auto rounded-2xl'
          />
          <div className='absolute bottom-7 right-7 px-3 py-1 rounded-lg bg-black/70 text-white text-3xl'>
            {ugc.duration}
          </div>
        </div>
        <div className='flex flex-col gap-4 flex-1 min-w-0'>
          <div className='text-5xl font-medium text-foreground select-text line-clamp-2 leading-normal'>
            {ugc.title}
          </div>
          <div className='flex gap-8 items-center text-4xl text-foreground-500'>
            <span>{ugc.play}播放</span>
            <span>{ugc.danmaku}弹幕</span>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * B站相关卡片容器组件
 */
export const BilibiliAdditionalCard: React.FC<{ additional: BilibiliAdditionalData | undefined }> = ({ additional }) => {
  if (!additional) return null

  return (
    <div className='px-20 pb-20'>
      {additional.type === 'ADDITIONAL_TYPE_RESERVE' && additional.reserve && (
        <BilibiliReserveCard reserve={additional.reserve} />
      )}
      {additional.type === 'ADDITIONAL_TYPE_VOTE' && additional.vote && (
        <BilibiliVoteCard vote={additional.vote} />
      )}
      {additional.type === 'ADDITIONAL_TYPE_COMMON' && additional.common && (
        <BilibiliCommonCard common={additional.common} />
      )}
      {additional.type === 'ADDITIONAL_TYPE_UGC' && additional.ugc && (
        <BilibiliUgcCard ugc={additional.ugc} />
      )}
    </div>
  )
}
