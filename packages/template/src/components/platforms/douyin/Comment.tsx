import clsx from 'clsx'
import { CircleEllipsis, Heart, Play, QrCode } from 'lucide-react'
import React from 'react'
import { IoSearch } from 'react-icons/io5'

import type { QRCodeSectionProps } from '../../../types'
import type {
  DouyinCommentProps,
  DouyinSubComment
} from '../../../types/platforms/douyin'
import { DefaultLayout } from '../../layouts/DefaultLayout'

/**
 * 二维码组件
 * @param props 组件属性
 * @returns JSX元素
 */
const QRCodeSection: React.FC<QRCodeSectionProps> = ({
  qrCodeDataUrl
}) => {
  return (
    <div className='flex flex-col items-center'>
      <div className='flex justify-center items-center w-100 h-100 p-4'>
        {qrCodeDataUrl
          ? (
            <img src={qrCodeDataUrl} alt='二维码' className='object-contain w-full h-full rounded-lg' />
          )
          : (
            <div className='flex flex-col justify-center items-center text-foreground-400'>
              <QrCode size={80} className='mb-4' />
              <span className='text-lg'>二维码生成失败</span>
            </div>
          )}
      </div>
    </div>
  )
}

/**
 * 视频信息头部组件
 * @param props 组件属性
 * @returns JSX元素
 */
const VideoInfoHeader: React.FC<Omit<DouyinCommentProps['data'], 'CommentsData'> & { qrCodeDataUrl: string }> = (props) => {
  return (
    <div className='max-w-350 mx-auto px-10 py-8'>
      <div className='flex gap-16 justify-between items-start'>
        {/* 左侧信息区域 */}
        <div className='flex flex-col flex-1'>
          {/* Logo 和分辨率区域 */}
          <div className='mb-12'>
            {/* Logo */}
            <div className='h-45 flex items-center'>
              <img
                src={props.useDarkTheme ? '/image/douyin/dylogo-light.svg' : '/image/douyin/dylogo-dark.svg'}
                alt='抖音Logo'
                className='object-contain h-full w-auto max-w-125'
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                  const parent = target.parentElement
                  if (parent) {
                    parent.innerHTML = '<div class="flex items-center h-full text-6xl font-bold text-foreground-600">抖音</div>'
                  }
                }}
              />
              {/* 分辨率信息 - 仅视频类型显示 */}
              {props.Type === '视频' && props.Resolution && (
                <div className='flex flex-col gap-2 px-8 py-4 ml-8 rounded-3xl bg-default-100/50 w-fit'>
                  <span className='text-[42px] text-foreground-400'>分辨率（px）</span>
                  <span className='text-[48px] font-medium text-foreground-600'>{props.Resolution}</span>
                </div>
              )}
            </div>

          </div>

          {/* 信息列表 */}
          <div className='grid grid-cols-2 gap-y-6 gap-x-16 pl-2'>
            <div className='flex items-center tracking-[6px] text-[45px] text-foreground-500 select-text'>
              <span className='mr-4 text-foreground-400'>类型</span>
              <span className='font-medium text-foreground-600'>{props.Type}</span>
            </div>
            <div className='flex items-center tracking-[6px] text-[45px] text-foreground-500 select-text'>
              <span className='mr-4 text-foreground-400'>评论</span>
              <span className='font-medium text-foreground-600'>{props.CommentLength}条</span>
            </div>
            {props.Type === '视频' ? (
              <>
                <div className='flex items-center tracking-[6px] text-[45px] text-foreground-500 select-text'>
                  <span className='mr-4 text-foreground-400'>大小</span>
                  <span className='font-medium text-foreground-600'>{props.VideoSize}MB</span>
                </div>
                <div className='flex items-center tracking-[6px] text-[45px] text-foreground-500 select-text'>
                  <span className='mr-4 text-foreground-400'>帧率</span>
                  <span className='font-medium text-foreground-600'>{props.VideoFPS}Hz</span>
                </div>
              </>
            ) : (
              <>
                <div className='flex items-center tracking-[6px] text-[45px] text-foreground-500 select-text'>
                  <span className='mr-4 text-foreground-400'>区域</span>
                  <span className='font-medium text-foreground-600'>{props.Region}</span>
                </div>
                <div className='flex items-center tracking-[6px] text-[45px] text-foreground-500 select-text'>
                  <span className='mr-4 text-foreground-400'>数量</span>
                  <span className='font-medium text-foreground-600'>{props.ImageLength}张</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* 右侧二维码区域 */}
        <div className='shrink-0'>
          <QRCodeSection qrCodeDataUrl={props.qrCodeDataUrl} />
        </div>
      </div>
    </div>
  )
}

interface ReplyNode extends DouyinSubComment {
  children: ReplyNode[]
  hiddenCount?: number
}

const organizeReplies = (replies: DouyinSubComment[], rootCid: string, maxDepth: number = 6): ReplyNode[] => {
  const map = new Map<string, ReplyNode>()
  const roots: ReplyNode[] = []

  // 第一遍：创建节点
  replies.forEach(r => {
    map.set(r.cid, { ...r, children: [] })
  })

  // 第二遍：构建树
  replies.forEach(r => {
    const node = map.get(r.cid)!
    const parentId = r.reply_to_reply_id
    if (parentId && map.has(parentId) && parentId !== rootCid && parentId !== '0') {
      map.get(parentId)!.children.push(node)
    } else {
      roots.push(node)
    }
  })

  // 计算深度并修剪树的函数
  const pruneTree = (nodes: ReplyNode[], currentDepth: number): ReplyNode[] => {
    if (currentDepth > maxDepth) {
      const count = nodes.length + nodes.reduce((acc, node) => acc + countChildren(node), 0)
      if (count > 0) {
        return [{
          cid: `more-${Date.now()}-${Math.random()}`,
          text: '',
          digg_count: 0,
          create_time: '',
          nickname: '',
          userimageurl: '',
          ip_label: '',
          text_extra: [],
          label_text: '',
          image_list: null,
          reply_to_reply_id: '',
          reply_to_username: '',
          children: [],
          hiddenCount: count
        }]
      }
      return []
    }

    return nodes.map(node => {
      node.children = pruneTree(node.children, currentDepth + 1)
      return node
    })
  }

  const countChildren = (node: ReplyNode): number => {
    return node.children.length + node.children.reduce((acc, child) => acc + countChildren(child), 0)
  }

  return pruneTree(roots, 1)
}

const ReplyItemComponent: React.FC<{ reply: ReplyNode; depth?: number; isLast?: boolean; maxDepth?: number }> = ({ reply, depth = 0, isLast, maxDepth = 6 }) => {
  const nicknameLength = reply.nickname.length
  const replyToLength = reply.reply_to_username?.length || 0
  const isNicknameLonger = nicknameLength >= replyToLength

  if (reply.hiddenCount) {
    return (
      <div className='flex relative flex-col mb-6'>
        {/* 
        外部网格：处理缩进和树连接
        第1列：父级线程线（脊柱） + 连接到此评论的线（曲线）
        第2列：评论本身
      */}
        <div className='grid grid-cols-[100px_minmax(0,1fr)] relative'>
          {/* 第1列：树连接区域 */}
          <div className='flex relative justify-center'>
            {/* 1. 脊柱：来自父级的垂直线 */}
            {/* 如果不是最后一个子节点则穿过 */}
            {!isLast && (
              <div className='absolute top-0 bottom-0 left-1/2 w-0.5 bg-default-300 -ml-px'></div>
            )}

            {/* 脊柱延伸用于边距间隙 */}
            {/* 连接到下一个兄弟节点的 mb-6 间隙 */}
            {!isLast && (
              <div className='absolute -bottom-6 left-1/2 w-0.5 h-6 bg-default-300 -ml-px'></div>
            )}

            {/* 2. 曲线：L形连接到当前评论 */}
            <svg className='absolute top-0 left-0 w-full h-12.5 pointer-events-none overflow-visible z-0 text-default-300'>
              <path
                d='M 50 0 V 15 Q 50 50 85 50 H 90'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
              />
            </svg>
          </div>

          {/* 第2列：显示更多文本 */}
          <div className='flex flex-col mt-6 min-w-0'>
            <div className='flex items-center h-12.5'>
              <div className='flex items-center text-foreground-500'>
                <CircleEllipsis size={45} className='mr-5' />
                <span className='text-4xl font-medium tracking-wide'>
                  另外 {reply.hiddenCount} 条回复
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='flex relative flex-col'>
      {/* 
        外部网格：处理缩进和树连接
        第1列：父级线程线（脊柱） + 连接到此评论的线（曲线）
        第2列：评论本身
      */}
      <div className='grid grid-cols-[100px_minmax(0,1fr)] relative'>
        {/* 第1列：树连接区域 */}
        <div className='flex relative justify-center'>
          {/* 1. 脊柱：来自父级的垂直线 */}
          {/* 如果不是最后一个子节点则穿过 */}
          {!isLast && (
            <div className='absolute top-0 bottom-0 left-1/2 w-0.5 bg-default-300 -ml-px'></div>
          )}

          {/* 脊柱延伸用于边距间隙 */}
          {/* 连接到下一个兄弟节点的 mb-6 间隙 */}
          {!isLast && (
            <div className='absolute -bottom-6 left-1/2 w-0.5 h-6 bg-default-300 -ml-px'></div>
          )}
          
          {/* 2. 曲线：L形连接到当前评论 */}
          <svg className='absolute top-0 left-0 w-full h-12.5 pointer-events-none overflow-visible z-0 text-default-300'>
            <path
              d='M 50 0 V 15 Q 50 50 85 50 H 90'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
            />
          </svg>
        </div>

        {/* 第2列：评论主体（六宫格） */}
        <div className='flex flex-col min-w-0'>
          
          {/* 内部网格：头像 | 内容 */}
          <div className='grid grid-cols-[100px_minmax(0,1fr)] relative'>
            
            {/* 内部第1列：头像 & 子线程线 */}
            {/* 添加 h-full 以确保其拉伸以匹配内容高度 */}
            <div className='flex relative flex-col items-center h-full'>
              {/* 头像 - 固定高度 */}
              <div className='w-25 h-25 shrink-0 z-10 relative'>
                <img
                  src={reply.userimageurl}
                  className='object-cover rounded-full w-25 h-25 bg-background'
                  alt='用户头像'
                />
              </div>
               
              {/* 子线程线 - 从头像下方开始并延伸到此单元格底部 */}
              {reply.children.length > 0 && (
                <div className='w-0.5 bg-default-300 h-full grow mt-3 rounded-t-full'></div>
              )}
            </div>

            {/* 内部第2列：头部、内容、操作 */}
            <div className='flex flex-col pb-8 pl-3 min-w-0'>
              {/* 第1行：头部 */}
              <div className='flex flex-nowrap items-center h-25 content-center w-full overflow-hidden'>
                <span className={clsx(
                  'mr-2 text-5xl font-medium text-foreground-700',
                  isNicknameLonger ? 'min-w-0 truncate shrink' : 'shrink-0'
                )}>
                  {reply.nickname}
                </span>
                {reply.label_text !== '' && (
                  <div className={clsx(
                    'inline-flex shrink-0 items-center px-3 py-1 text-3xl rounded-lg mr-2',
                    reply.label_text === '作者' ?
                      'bg-[#fe2c55] text-white' :
                      'bg-default-100 text-default-500'
                  )}>
                    {reply.label_text}
                  </div>
                )}
                {reply.reply_to_username && (
                  <div className={clsx(
                    'flex items-center',
                    !isNicknameLonger ? 'overflow-hidden min-w-0 shrink' : 'shrink-0'
                  )}>
                    <Play size={35} className='mr-3.5 mx-1 text-foreground-400 shrink-0' fill='currentColor' />
                    <span className={clsx(
                      'text-5xl font-medium text-foreground-700',
                      !isNicknameLonger && 'truncate'
                    )}>
                      {reply.reply_to_username}
                    </span>
                  </div>
                )}
              </div>

              {/* 第2行：内容 */}
              <div className='py-2'>
                <div
                  className='text-5xl text-foreground leading-normal whitespace-pre-wrap select-text [&_img]:mb-2 [&_img]:inline [&_img]:h-[1.3em] [&_img]:w-auto [&_img]:align-middle [&_img]:mx-1 [&_img]:max-w-[1.7em]'
                  dangerouslySetInnerHTML={{ __html: reply.text }}
                  style={{
                    wordBreak: 'break-word',
                    overflowWrap: 'break-word'
                  }}
                />
                
                {reply.image_list && reply.image_list.length > 0 &&
                  reply.image_list.filter(Boolean).map((img, idx) => (
                    <div key={idx} className='my-4 overflow-hidden shadow-sm rounded-xl max-w-150'>
                      <img
                        className='object-contain w-full h-auto rounded-xl'
                        src={img}
                        alt='评论图片'
                      />
                    </div>
                  ))}
              </div>

              {/* 第3行：操作 */}
              <div className='pb-4'>
                <div className='flex gap-6 items-center text-foreground-500'>
                  <div className='flex gap-2 items-center'>
                    <Heart size={40} className='text-foreground-500' />
                    <span className='text-4xl'>{reply.digg_count}</span>
                  </div>
                  <span className='text-4xl'>{reply.ip_label}</span>
                  <span className='ml-2 text-4xl'>{reply.create_time}</span>
                </div>
              </div>
            </div>
          </div>
           
          {/* 子容器 - 递归 */}
          {reply.children.length > 0 && (
            <div className='flex relative flex-col'>
              <div>
                {reply.children.map((child, index) => (
                  <ReplyItemComponent 
                    key={child.cid} 
                    reply={child} 
                    depth={depth + 1} 
                    isLast={index === reply.children.length - 1} 
                    maxDepth={maxDepth}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/**
 * 单个评论组件
 * @param props 组件属性
 * @returns JSX元素
 * @description Root comment component
 */
const CommentItemComponent: React.FC<DouyinCommentProps['data']['CommentsData'][number] & { isLast?: boolean; maxDepth?: number }> = (props) => {
  return (
    <div className={clsx(
      'flex flex-col px-6 pt-8',
      { 'pb-0': props.isLast, 'pb-10': !props.isLast }
    )}>
      {/* 根网格 - 单列主体（根节点没有连接列） */}
      <div className='flex flex-col min-w-0'>
        
        {/* 内部网格：头像 | 内容 */}
        <div className='grid grid-cols-[140px_minmax(0,1fr)] relative'>
          
          {/* 内部第1列：头像 & 子线程线 */}
          <div className='flex relative flex-col items-center'>
            {/* 头像 - 根节点更大 */}
            <div className='w-35 h-35 shrink-0 z-10 relative'>
              <img
                src={props.userimageurl}
                className='w-35 h-35 rounded-full object-cover shadow-md bg-background'
                alt='用户头像'
              />
            </div>
            
            {/* 子线程线 */}
            {props.replyComment && props.replyComment.length > 0 && (
              <div className='w-0.5 bg-default-300 h-full grow mt-4 rounded-t-full'></div>
            )}
          </div>

          {/* 内部第2列：内容 */}
          <div className='flex flex-col pb-4 pl-4 min-w-0'>
            {/* 头部 */}
            <div className='flex flex-wrap gap-4 items-center mb-3 text-5xl select-text text-foreground-700 min-h-35 content-center'>
              <span className='font-medium'>{props.nickname}</span>
              {props.label_type === 1 && (
                <div className='inline-flex items-center px-3 py-1 rounded-lg text-3xl bg-[#fe2c55] text-white'>
                  作者
                </div>
              )}
              {props.is_author_digged && props.status_label !== '作者赞过' && (
                <div className='inline-flex items-center px-3 py-1 text-3xl font-light rounded-lg bg-content2 text-foreground-700'>
                  作者赞过
                </div>
              )}
              {props.status_label && (
                <div className='inline-flex items-center px-3 py-1 text-3xl font-light rounded-lg bg-content2 text-foreground-700'>
                  {props.status_label}
                </div>
              )}
            </div>

            <div
              className='text-5xl text-foreground leading-normal mb-4 whitespace-pre-wrap select-text [&_img]:mb-2 [&_img]:inline [&_img]:h-[1.3em] [&_img]:w-auto [&_img]:align-middle [&_img]:mx-1 [&_img]:max-w-[1.7em]'
              dangerouslySetInnerHTML={{ __html: props.text }}
              style={{
                wordBreak: 'break-word',
                overflowWrap: 'break-word'
              }}
            />

            {/* 评论图片 */}
            {(props.commentimage || props.sticker) && (
              <div className='my-6 overflow-hidden shadow-sm rounded-2xl max-w-200'>
                <img
                  className='object-contain w-full h-auto rounded-2xl'
                  src={props.commentimage || props.sticker}
                  alt='评论图片'
                />
              </div>
            )}

            <div className='flex justify-between items-center mt-3 text-foreground-500'>
              <div className='flex gap-6 items-center shrink-0'>
                <div className='flex gap-2 items-center transition-colors cursor-pointer'>
                  <Heart size={44} className='text-foreground-500' />
                  <span className='text-4xl select-text'>{props.digg_count}</span>
                </div>
                <span className='text-4xl'>{props.ip_label}</span>
                <span className='ml-2 text-4xl'>{props.create_time}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 回复容器 */}
        {/* 
           根缩进调整：
           根头像列为 140px。中心点为 70px。
           子外部列为 100px。中心点为 50px。
           
           我们需要子中心点（50px）与根中心点（70px）对齐。
           所以我们需要将子元素向右推 20px。
           
           容器上使用 pl-5。
        */}
        {props.replyComment && props.replyComment.length > 0 && (
          <div className='flex relative flex-col mt-8 ml-5'>
            <div className='absolute -top-8 left-12.5 w-0.5 h-8 bg-default-300 -ml-px'></div>
            {organizeReplies(props.replyComment, props.cid || '', props.maxDepth).map((reply, index, arr) => (
              <ReplyItemComponent 
                key={reply.cid} 
                reply={reply} 
                depth={1} 
                isLast={index === arr.length - 1} 
                maxDepth={props.maxDepth}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * 抖音评论组件
 * @param props 组件属性
 * @returns JSX元素
 */
export const DouyinComment: React.FC<Omit<DouyinCommentProps, 'templateType' | 'templateName'>> = React.memo((props) => {
  // 随机选择一个搜索词
  const randomSuggestWord = React.useMemo(() => {
    if (props.data.suggestWrod && props.data.suggestWrod.length > 0) {
      const randomIndex = Math.floor(Math.random() * props.data.suggestWrod.length)
      return props.data.suggestWrod[randomIndex]
    }
    return null
  }, [props.data.suggestWrod])

  return (
    <DefaultLayout {...props}>
      <div className='p-5'>
        <div className='h-20'></div>
        {/* 视频信息头部 */}
        <VideoInfoHeader
          {...props.data}
          qrCodeDataUrl={props.qrCodeDataUrl}
        />

        {/* 推荐搜索词 */}
        {randomSuggestWord && (
          <div className='mx-auto my-20 mb-5 ml-10'>
            <div className='flex gap-3 items-center px-6 py-4 rounded-2xl'>
              <span className='text-5xl text-default-500'>大家都在搜：</span>
              <span className='relative text-5xl text-[#04498d] dark:text-[#face15]'>
                {randomSuggestWord}
                <IoSearch size={32} className='absolute -top-2 -right-8' />
              </span>
            </div>
          </div>
        )}
        {/* {randomSuggestWord && (
          <div className='mx-auto my-20 ml-10'>
            <div className='flex gap-10 items-center px-6 py-4 rounded-2xl'>
              <span className='text-5xl font-bold text-default-500'>相关搜索</span>
              <span className='flex gap-2 bg-default-100 py-5 px-5 rounded-3xl relative text-5xl text-[#04498d] dark:text-[#face15]'>
                <IoSearch size={50} />
                {randomSuggestWord}
                
              </span>
            </div>
          </div>
        )} */}

        {/* 评论列表 */}
        <div className='overflow-hidden mt-8'>
          {props.data.CommentsData.length > 0
            ? (
              <>
                {props.data.CommentsData.map((comment, index) => (
                  <CommentItemComponent
                    key={comment.cid || index}
                    {...comment}
                    isLast={index === props.data.CommentsData.length - 1}
                    maxDepth={props.data.maxDepth}
                  />
                ))}
              </>
            )
            : (
              <div className='flex justify-center items-center py-20 text-foreground-400'>
                <div className='text-center'>
                  <p className='text-xl'>暂无评论数据</p>
                </div>
              </div>
            )}
        </div>
      </div>
    </DefaultLayout>
  )
})

export default DouyinComment