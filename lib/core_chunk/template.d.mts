import React$1 from "react";

//#region ../template/src/types/platforms/douyin/comment.d.ts

/**
 * 抖音评论组件属性接口
 */
interface DouyinCommentProps extends BaseComponentProps {
  /** 渲染请求数据 */
  data: {
    /** 是否使用深色主题 */
    useDarkTheme?: boolean;
    /** 作品类型：视频/图集/合辑 */
    Type: '视频' | '图集' | '合辑';
    /** 评论数量 */
    CommentLength: number;
    /** 视频大小(MB) */
    VideoSize?: string;
    /** 视频帧率(Hz) */
    VideoFPS?: number;
    /** 图片数量 */
    ImageLength?: number;
    /** 区域 */
    Region: string;
    /** 相关搜索（大家都在搜） */
    suggestWrod: string[];
    /** 视频分辨率 */
    Resolution: string | null;
    /** 分享链接 */
    share_url: string;
    /** 评论数据列表 */
    CommentsData: Array<{
      /** 评论ID */
      id?: number;
      /** 评论CID */
      cid?: string;
      /** 作品ID */
      aweme_id?: string;
      /** 用户头像URL */
      userimageurl: string;
      /** 用户昵称 */
      nickname: string;
      /** 标签类型 (1=作者) */
      label_type?: number;
      /** 状态标签 */
      status_label?: string;
      /** 评论内容 */
      text: string;
      /** 评论图片 */
      commentimage?: string;
      /** 贴纸 */
      sticker?: string;
      /** 创建时间 */
      create_time: string;
      /** IP标签 */
      ip_label: string;
      /** 点赞数 */
      digg_count: number | string;
      /** 搜索文本 */
      search_text?: Array<{
        /** 搜索文本内容 */
        search_text: string;
        /** 搜索查询ID */
        search_query_id: string;
      }> | null;
      /** 是否@用户ID */
      is_At_user_id?: any;
      /** 回复评论数据 */
      replyComment?: DouyinSubComment[];
      /** 作者是否点赞 */
      is_author_digged?: boolean;
    }>;
    /** 最大嵌套层级 */
    maxDepth?: number;
  };
  /** 预生成的二维码数据URL */
  qrCodeDataUrl: string;
}
/**
 * 抖音子评论数据接口
 */
interface DouyinSubComment {
  /** 创建时间 */
  create_time: string;
  /** 用户昵称 */
  nickname: string;
  /** 用户头像URL */
  userimageurl: string;
  /** 评论内容 */
  text: string;
  /** 点赞数 */
  digg_count: number | string;
  /** IP标签 */
  ip_label: string;
  /** 文本额外信息 */
  text_extra: any[];
  /** 标签文本 */
  label_text: string;
  /** 评论图片 */
  image_list: string[] | null;
  /** 评论ID */
  cid: string;
  /** 回复的评论ID */
  reply_to_reply_id: string;
  /** 回复的用户昵称 */
  reply_to_username: string;
}
//#endregion
//#region ../template/src/types/platforms/douyin/dynamic.d.ts
/**
 * 抖音动态组件属性接口
 */
interface DouyinDynamicProps extends BaseComponentProps {
  /** 渲染请求数据 */
  data: {
    /** 是否使用深色主题 */
    useDarkTheme?: boolean;
    /** 图片URL */
    image_url: string;
    /** 描述内容 */
    desc: string;
    /** 点赞数 */
    dianzan: string;
    /** 评论数 */
    pinglun: string;
    /** 收藏数 */
    shouchang: string;
    /** 分享数 */
    share: string;
    /** 创建时间 */
    create_time: string;
    /** 用户头像URL */
    avater_url: string;
    /** 用户名 */
    username: string;
    /** 抖音号 */
    抖音号: string;
    /** 获赞数 */
    获赞: string;
    /** 关注数 */
    关注: string;
    /** 粉丝数 */
    粉丝: string;
    /** 分享链接 */
    share_url: string;
    /** 合作信息 */
    cooperation_info?: {
      co_creator_nums: number;
      co_creators: Array<{
        avatar_thumb: {
          url_list: string[];
        };
        nickname: string;
        role_title: string;
      }>;
    };
  };
  /** 预生成的二维码数据URL */
  qrCodeDataUrl: string;
}
//#endregion
//#region ../template/src/types/platforms/douyin/live.d.ts
/**
 * 抖音直播组件属性接口
 */
interface DouyinLiveProps extends BaseComponentProps {
  /** 渲染请求数据 */
  data: {
    /** 是否使用深色主题 */
    useDarkTheme?: boolean;
    /** 直播封面图片URL */
    image_url: string;
    /** 直播标题/描述 */
    text: string;
    /** 直播信息 */
    liveinf: string;
    /** 总观看次数 */
    总观看次数: string;
    /** 在线观众数 */
    在线观众: string;
    /** 用户头像URL */
    avater_url: string;
    /** 用户名 */
    username: string;
    /** 粉丝数 */
    fans: string;
    /** 动态类型 */
    dynamicTYPE: string;
    /** 分享链接 */
    share_url: string;
  };
  /** 预生成的二维码数据URL */
  qrCodeDataUrl: string;
}
//#endregion
//#region ../template/src/types/platforms/douyin/musicinfo.d.ts
/**
 * 抖音音乐信息组件属性接口
 */
interface DouyinMusicInfoProps extends BaseComponentProps {
  /** 渲染请求数据 */
  data: {
    /** 是否使用深色主题 */
    useDarkTheme?: boolean;
    /** 音乐封面图片URL */
    image_url: string;
    /** 音乐描述/标题 */
    desc: string;
    /** 音乐ID */
    music_id: string;
    /** 创建时间 */
    create_time: string;
    /** 使用该音乐的用户数量 */
    user_count: string;
    /** 用户头像URL */
    avater_url: string;
    /** 用户名 */
    username: string;
    /** 用户短ID */
    user_shortid: string;
    /** 获赞数 */
    total_favorited: number;
    /** 关注数 */
    following_count: number;
    /** 粉丝数 */
    fans: number;
    /** 分享链接 */
    share_url: string;
  };
  /** 预生成的二维码数据URL */
  qrCodeDataUrl: string;
}
//#endregion
//#region ../template/src/types/platforms/douyin/userlist.d.ts
/**
 * 抖音用户列表组件属性接口
 */
interface DouyinUserListProps extends BaseComponentProps {
  /** 渲染请求数据 */
  data: {
    /** 是否使用深色主题 */
    useDarkTheme?: boolean;
    /** 群组信息 */
    groupInfo: {
      /** 群号 */
      groupId: string;
      /** 群名称 */
      groupName: string;
    };
    /** 用户列表数据 */
    renderOpt: {
      /** 用户头像图片URL */
      avatar_img: string;
      /** 用户名 */
      username: string;
      /** 抖音短ID */
      short_id: string;
      /** 粉丝数 */
      fans: string;
      /** 获赞总数 */
      total_favorited: string;
      /** 关注数 */
      following_count: string;
      /** 全局推送开关状态 */
      switch: boolean;
    }[];
  };
}
//#endregion
//#region ../template/src/types/platforms/douyin/videoInfo.d.ts
/**
 * 抖音视频统计信息接口
 */
interface DouyinVideoStatistics {
  /** 点赞数 */
  admire_count: number;
  /** 视频ID */
  aweme_id: string;
  /** 收藏数 */
  collect_count: number;
  /** 评论数 */
  comment_count: number;
  /** 点赞数 */
  digg_count: number;
  /** 播放数 */
  play_count: number;
  /** 推荐数 */
  recommend_count?: number;
  /** 分享数 */
  share_count: number;
}
/**
 * 抖音作者信息接口
 */
interface DouyinAuthor {
  /** 作者名称 */
  name: string;
  /** 作者头像URL */
  avatar: string;
  /** 抖音号 */
  short_id: string;
}
/**
 * 抖音用户主页扩展信息接口
 */
interface DouyinUserProfile {
  /** IP属地 */
  ip_location: string;
  /** 粉丝数 */
  follower_count: number;
  /** 获赞数 */
  total_favorited: number;
  /** 作品数 */
  aweme_count: number;
  /** 性别 1:男 2:女 0:未知 */
  gender: number;
  /** 年龄 */
  user_age: number;
}
/**
 * 抖音视频信息数据接口
 */
interface DouyinVideoInfoData {
  /** 视频描述 */
  desc: string;
  /** 统计信息 */
  statistics: DouyinVideoStatistics;
  /** 视频ID */
  aweme_id: string;
  /** 作者信息 */
  author: DouyinAuthor;
  /** 用户主页扩展信息 */
  user_profile?: DouyinUserProfile;
  /** 视频封面图片URL */
  image_url: string;
  /** 封面图片尺寸 */
  cover_size?: {
    width: number;
    height: number;
  };
  /** 创建时间戳 */
  create_time: number;
  /** 音乐信息 */
  music?: {
    author: string;
    title: string;
    cover: string;
  };
  /** 视频原始信息 */
  video?: {
    duration: number;
    width: number;
    height: number;
    ratio: string;
  };
  /** 是否使用深色主题 */
  useDarkTheme?: boolean;
}
/**
 * 抖音视频信息组件属性接口
 */
interface DouyinVideoInfoProps {
  /** 模板类型 */
  templateType: string;
  /** 模板名称 */
  templateName: string;
  /** 视频数据 */
  data: DouyinVideoInfoData;
  /** 是否使用深色主题 */
  useDarkTheme?: boolean;
}
//#endregion
//#region ../template/src/types/platforms/douyin/index.d.ts
/** 抖音二维码登录组件属性 */
interface DouyinQrcodeImgProps {
  data: {
    /** 二维码数据URL */
    qrCodeDataUrl?: string;
  };
  /** 是否使用深色主题 */
  useDarkTheme?: boolean;
}
//#endregion
//#region ../template/src/types/platforms/douyin/UserVideoList.d.ts
/**
 * 用户视频列表页面的数据类型定义
 */
interface VideoListItem {
  /** 视频ID */
  aweme_id: string;
  /** 是否置顶 */
  is_top: boolean;
  /** 视频标题/描述 */
  title: string;
  /** 视频封面URL */
  cover: string;
  /** 视频时长（秒） */
  duration: number;
  /** 创建时间戳 */
  create_time: number;
  /** 统计数据 */
  statistics: {
    like_count: number;
    comment_count: number;
    share_count: number;
    collect_count: number;
  };
  /** 是否为视频(true)还是图集(false) */
  is_video: boolean;
  /** 背景音乐信息 */
  music?: {
    title: string;
    author: string;
  };
}
interface UserVideoListData {
  /** 用户基本信息 */
  user: {
    head_image: string | null;
    nickname: string;
    short_id: string;
    avatar: string;
    signature: string;
    follower_count: number;
    following_count: number;
    total_favorited: number;
    verified: boolean;
    ip_location: string;
  };
  /** 视频列表 */
  videos: VideoListItem[];
}
interface DouyinUserVideoListProps {
  data: UserVideoListData & {
    useDarkTheme?: boolean;
  };
}
//#endregion
//#region ../template/src/types/platforms/bilibili/bangumi.d.ts
/**
 * 徽章信息接口
 */
interface BangumiBilibiliEpisodeBadgeInfo {
  /** 背景颜色 */
  bg_color: string;
  /** 夜间模式背景颜色 */
  bg_color_night: string;
  /** 徽章文本 */
  text: string;
}
/**
 * 番剧剧集信息接口
 */
interface BangumiBilibiliEpisode {
  /** 剧集封面图片URL */
  cover: string;
  /** 视频BV号 */
  bvid: string;
  /** 剧集链接 */
  link: string;
  /** 剧集完整标题 */
  long_title: string;
  /** 发布时间戳 */
  pub_time: number;
  /** 徽章标识（如：限免、会员） */
  badge: string;
  /** 徽章详细信息 */
  badge_info: BangumiBilibiliEpisodeBadgeInfo;
}
/**
 * 番剧最新剧集信息接口
 */
interface BangumiBilibiliNewEP {
  /** 剧集描述 */
  desc: string;
  /** 剧集ID */
  id: number;
  /** 是否为新剧集 */
  is_new: number;
  /** 剧集标题 */
  title: string;
}
/**
 * 番剧统计数据接口
 */
interface BangumiBilibiliStat {
  /** 硬币数 */
  coins: number;
  /** 弹幕数 */
  danmakus: number;
  /** 收藏数 */
  favorite: number;
  /** 总收藏数 */
  favorites: number;
  /** 追番文本 */
  follow_text: string;
  /** 点赞数 */
  likes: number;
  /** 评论数 */
  reply: number;
  /** 分享数 */
  share: number;
  /** 播放量 */
  views: number;
  /** VT标识 */
  vt: number;
}
/**
 * UP主挂件信息接口
 */
interface BangumiBilibiliPendant {
  /** 挂件图片URL */
  image: string;
  /** 挂件名称 */
  name: string;
  /** 挂件ID */
  pid: number;
}
/**
 * UP主VIP标签信息接口
 */
interface BangumiBilibiliVipLabel {
  /** 背景颜色 */
  bg_color: string;
  /** 背景样式 */
  bg_style: number;
  /** 边框颜色 */
  border_color: string;
  /** 标签文本 */
  text: string;
  /** 文本颜色 */
  text_color: string;
}
/**
 * UP主信息接口
 */
interface BangumiBilibiliUPInfo {
  /** 头像URL */
  avatar: string;
  /** 头像角标URL */
  avatar_subscript_url: string;
  /** 粉丝数 */
  follower: number;
  /** 是否已关注 */
  is_follow: number;
  /** 用户ID */
  mid: number;
  /** 昵称颜色 */
  nickname_color: string;
  /** 挂件信息 */
  pendant: BangumiBilibiliPendant;
  /** 主题类型 */
  theme_type: number;
  /** 用户名 */
  uname: string;
  /** 认证类型 */
  verify_type: number;
  /** VIP标签信息 */
  vip_label: BangumiBilibiliVipLabel;
  /** VIP状态 */
  vip_status: number;
  /** VIP类型 */
  vip_type: number;
}
/**
 * B站番剧组件数据接口
 */
interface BangumiBilibiliData {
  /** 主封面图片URL */
  mainCover: string;
  /** 演员信息 */
  Actors: string;
  /** 番剧评价描述 */
  Evaluate: string;
  /** 番剧链接 */
  Link: string;
  /** 最新剧集信息 */
  newEP: BangumiBilibiliNewEP;
  /** 番剧标题 */
  Title: string;
  /** 番剧风格标签 */
  Styles: string[];
  /** 季度ID */
  seasonID: number;
  /** 副标题信息 */
  subtitle: string;
  /** UP主信息 */
  UPInfo: BangumiBilibiliUPInfo;
  /** 版权信息 */
  Copyright: string;
  /** 统计数据 */
  Stat: BangumiBilibiliStat;
  /** 剧集列表 */
  Episodes: BangumiBilibiliEpisode[];
  /** 剧集总数 */
  length: number;
}
/**
 * B站番剧组件属性接口
 */
interface BilibiliBangumiProps extends BaseComponentProps {
  /** 番剧数据 */
  data: BangumiBilibiliData;
  /** 预生成的二维码数据URL */
  qrCodeDataUrl?: string;
}
//#endregion
//#region ../template/src/types/platforms/bilibili/comment.d.ts
/**
 * B站评论组件属性接口
 */
interface BilibiliCommentProps extends BaseComponentProps {
  /** 渲染请求数据 */
  data: {
    /** 是否使用深色主题 */
    useDarkTheme?: boolean;
    /** 作品类型：视频/图集/动态 */
    Type: '视频' | '动态';
    /** 评论数量 */
    CommentLength: string;
    /** 视频大小(MB) */
    VideoSize?: string;
    /** 视频画质 */
    Clarity?: string;
    /** 图片数量 */
    ImageLength?: number;
    /** 分享链接 */
    shareurl: string;
    /** 分享URL */
    share_url: string;
    /** 视频分辨率 */
    Resolution: string | null;
    /** 评论数据 */
    CommentsData: CommentItem[];
  };
  /** 预生成的二维码数据URL */
  qrCodeDataUrl: string;
}
/**
 * 粉丝卡片信息接口
 */
interface FanCardInfo {
  /** 卡片背景图片 */
  image: string | null;
  /** 序号前缀 */
  numPrefix: string;
  /** 序号描述 */
  numDesc: string;
  /** 渐变色样式 */
  gradientStyle: string;
}
/**
 * B站二级评论项数据接口
 */
interface SubCommentItem {
  /** 用户头像URL */
  avatar: string;
  /** 用户昵称 */
  uname: string;
  /** 用户等级 */
  level: number;
  /** 头像框 */
  frame?: string;
  /** 评论内容 */
  message: string;
  /** 评论图片 */
  img_src?: string | null;
  /** 创建时间 */
  ctime: string;
  /** IP标签/地理位置 */
  location: string;
  /** 点赞数 */
  like: string | number;
  /** 是否为UP主评论 */
  isUP: boolean;
  /** VIP状态 */
  vipstatus?: number;
  /** 大会员图标 */
  icon_big_vip?: string | null;
  /** 被艾特的用户 */
  members?: any[];
  /** 粉丝卡片信息 */
  fanCard?: FanCardInfo | null;
}
/**
 * B站评论项数据接口
 */
interface CommentItem {
  /** 用户头像URL */
  avatar: string;
  /** 用户昵称 */
  uname: string;
  /** 用户等级 */
  level: number;
  /** 头像框 */
  frame?: string;
  /** 标签类型 (1=作者) */
  label_type?: number;
  /** 状态标签 */
  status_label?: string | null;
  /** 评论内容 */
  message: string;
  /** 评论图片 */
  img_src?: string;
  /** VIP状态 */
  vipstatus?: number;
  /** 贴纸 */
  sticker?: string;
  /** 创建时间 */
  ctime: string;
  /** IP标签/地理位置 */
  location: string;
  /** 回复数量 */
  replylength: number;
  /** 点赞数 */
  like: string;
  /** 是否置顶评论 */
  isTop: boolean;
  /** 是否为UP主评论 */
  isUP: boolean;
  /** 二级评论列表 */
  replies?: SubCommentItem[];
  /** 粉丝卡片信息 */
  fanCard?: FanCardInfo | null;
}
//#endregion
//#region ../template/src/types/platforms/bilibili/dynamic/article.d.ts
/**
 * B站专栏动态组件属性接口
 */
interface BilibiliArticleDynamicProps extends BaseComponentProps {
  /** 渲染请求数据 */
  data: {
    /** 是否使用深色主题 */
    useDarkTheme?: boolean;
    /** 用户头像URL */
    avatar_url: string;
    /** 头像框 */
    frame?: string;
    /** 用户名 */
    username: string;
    /** 动态创建时间 */
    create_time: string;
    /** 装饰卡片 */
    decoration_card?: {
      card_url: string;
      [key: string]: any;
    };
    /** 专栏标题 */
    title: string;
    /** 专栏摘要 */
    summary: string;
    /** 专栏封面图片URL */
    banner_url?: string;
    /** 专栏分类 */
    categories: Array<{
      id: number;
      name: string;
      parent_id: number;
    }>;
    /** 专栏字数 */
    words: number;
    /** 专栏统计数据 */
    stats: {
      /** 阅读数 */
      view: number;
      /** 点赞数 */
      like: number;
      /** 收藏数 */
      favorite: number;
      /** 评论数 */
      reply: number;
      /** 分享数 */
      share: number;
      /** 投币数 */
      coin: number;
      /** 转发动态 */
      dynamic: number;
    };
    /** 专栏正文的html字符串 */
    content?: string;
    /** 专栏结构化内容 */
    opus?: {
      content: {
        paragraphs: Array<{
          para_type: number;
          text?: {
            nodes: Array<{
              node_type: number;
              word?: {
                words: string;
                font_size: number;
                style: Record<string, any>;
                font_level: string;
              };
            }>;
          };
          pic?: {
            pics: Array<{
              url: string;
              width: number;
              height: number;
              size: number;
            }>;
          };
        }>;
      };
    };
    /** 渲染时间 */
    render_time: string;
    /** 动态类型 */
    dynamicTYPE: string;
    /** 分享链接 */
    share_url: string;
    /** 用户短ID */
    user_shortid: string | number;
    /** 获赞总数 */
    total_favorited: string | number;
    /** 关注数 */
    following_count: string | number;
    /** 粉丝数 */
    fans: string | number;
  };
  /** 预生成的二维码数据URL */
  qrCodeDataUrl?: string;
}
//#endregion
//#region ../template/src/types/platforms/bilibili/dynamic/forward.d.ts
/**
 * 原始内容AV类型接口
 */
interface OriginalContentAV {
  /** 用户头像URL */
  avatar_url: string;
  /** 头像框 */
  frame?: string;
  /** 用户名 */
  username: string;
  /** 创建时间 */
  create_time: string;
  /** 装饰卡片 */
  decoration_card?: string;
  /** 视频封面 */
  cover: string;
  /** 视频时长文本 */
  duration_text: string;
  /** 播放量 */
  play: string;
  /** 弹幕数 */
  danmaku: string;
  /** 视频标题 */
  title: string;
}
/**
 * 原始内容图文类型接口
 */
interface OriginalContentDraw {
  /** 标题 */
  title?: string;
  /** 用户头像URL */
  avatar_url: string;
  /** 头像框 */
  frame?: string;
  /** 用户名 */
  username: string;
  /** 创建时间 */
  create_time: string;
  /** 装饰卡片 */
  decoration_card?: string;
  /** 动态文本内容 */
  text: string;
  /** 图片URL数组 */
  image_url: Array<{
    image_src: string;
  }>;
}
/**
 * 原始内容文字类型接口
 */
interface OriginalContentWord {
  /** 用户头像URL */
  avatar_url: string;
  /** 头像框 */
  frame?: string;
  /** 用户名 */
  username: string;
  /** 创建时间 */
  create_time: string;
  /** 装饰卡片 */
  decoration_card?: string;
  /** 动态文本内容 */
  text: string;
}
/**
 * 原始内容直播推荐类型接口
 */
interface OriginalContentLiveRcmd {
  /** 用户头像URL */
  avatar_url: string;
  /** 头像框 */
  frame?: string;
  /** 用户名 */
  username: string;
  /** 创建时间 */
  create_time: string;
  /** 装饰卡片 */
  decoration_card?: string;
  /** 直播封面 */
  cover: string;
  /** 分区名称 */
  area_name: string;
  /** 大文本 */
  text_large: string;
  /** 在线人数 */
  online: string;
  /** 直播标题 */
  title: string;
}
/**
 * 转发动态原始内容Props接口
 */
interface BilibiliForwardOriginalContentProps {
  /** 原始内容 */
  original_content: {
    /** AV类型内容 */
    DYNAMIC_TYPE_AV?: OriginalContentAV;
    /** 图文类型内容 */
    DYNAMIC_TYPE_DRAW?: OriginalContentDraw;
    /** 文字类型内容 */
    DYNAMIC_TYPE_WORD?: OriginalContentWord;
    /** 直播推荐类型内容 */
    DYNAMIC_TYPE_LIVE_RCMD?: OriginalContentLiveRcmd;
  };
}
/**
 * B站转发动态组件属性接口
 */
interface BilibiliForwardDynamicProps extends BaseComponentProps {
  /** 渲染请求数据 */
  data: {
    /** 是否使用深色主题 */
    useDarkTheme?: boolean;
    /** 用户头像URL */
    avatar_url: string;
    /** 头像框 */
    frame?: string;
    /** 用户名 */
    username: string;
    /** 动态创建时间 */
    create_time: string;
    /** 装饰卡片 */
    decoration_card?: string;
    /** 动态文本内容 */
    text: string;
    /** 原始内容 */
    original_content: BilibiliForwardOriginalContentProps['original_content'];
    /** 点赞数 */
    dianzan: string | number;
    /** 评论数 */
    pinglun: string | number;
    /** 分享数 */
    share: string | number;
    /** 渲染时间 */
    render_time: string;
    /** 用户短ID */
    user_shortid: string | number;
    /** 获赞总数 */
    total_favorited: string | number;
    /** 关注数 */
    following_count: string | number;
    /** 粉丝数 */
    fans: string | number;
    /** 动态类型 */
    dynamicTYPE: string;
    /** 分享链接 */
    share_url: string;
    /** 图片URL */
    imgList: string[] | null;
  };
  /** 预生成的二维码数据URL */
  qrCodeDataUrl?: string;
}
//#endregion
//#region ../template/src/types/platforms/bilibili/dynamic/live.d.ts
/**
 * B站直播动态组件属性接口
 */
interface BilibiliLiveDynamicProps extends BaseComponentProps {
  /** 渲染请求数据 */
  data: {
    /** 是否使用深色主题 */
    useDarkTheme?: boolean;
    /** 直播封面 */
    image_url: string;
    /** 直播标题 */
    text: string;
    /** 直播房间信息（分区 | 房间号） */
    liveinf: string;
    /** 用户信息 */
    username: string;
    /** 用户头像URL */
    avatar_url: string;
    /** 头像框 */
    frame?: string;
    /** 粉丝数 */
    fans: string;
    /** 时间信息 */
    create_time: string;
    /** 直播开始时间 */
    now_time: string;
    /** 分享和配置 */
    share_url: string;
    /** 动态类型 */
    dynamicTYPE: string;
  };
  /** 预生成的二维码数据URL */
  qrCodeDataUrl?: string;
}
//#endregion
//#region ../template/src/types/platforms/bilibili/dynamic/normal.d.ts
/**
 * B站普通动态组件属性接口
 */
interface BilibiliDynamicProps extends BaseComponentProps {
  /** 渲染请求数据 */
  data: {
    /** 是否使用深色主题 */
    useDarkTheme?: boolean;
    /** 用户头像URL */
    avatar_url: string;
    /** 头像框 */
    frame?: string;
    /** 用户名 */
    username: string;
    /** 动态创建时间 */
    create_time: string;
    /** 装饰卡片 */
    decoration_card?: string;
    /** 动态文本内容 */
    text: string;
    /** 图片URL数组 */
    image_url: Array<{
      image_src: string;
    }>;
    /** 点赞数 */
    dianzan: string | number;
    /** 评论数 */
    pinglun: string | number;
    /** 分享数 */
    share: string | number;
    /** 渲染时间 */
    render_time: string;
    /** 用户短ID */
    user_shortid: string | number;
    /** 获赞总数 */
    total_favorited: string | number;
    /** 关注数 */
    following_count: string | number;
    /** 粉丝数 */
    fans: string | number;
    /** 动态类型 */
    dynamicTYPE: string;
    /** 分享链接 */
    share_url: string;
    /** 图片布局方式 */
    imageLayout: string;
  };
  /** 预生成的二维码数据URL */
  qrCodeDataUrl?: string;
}
//#endregion
//#region ../template/src/types/platforms/bilibili/dynamic/video.d.ts
/**
 * B站视频动态组件属性接口
 */
interface BilibiliVideoDynamicProps extends BaseComponentProps {
  /** 渲染请求数据 */
  data: {
    /** 是否使用深色主题 */
    useDarkTheme?: boolean;
    /** 用户头像URL */
    avatar_url: string;
    /** 头像框 */
    frame?: string;
    /** 用户名 */
    username: string;
    /** 动态创建时间 */
    create_time: string;
    /** 装饰卡片 */
    decoration_card?: string;
    /** 视频标题 */
    text: string;
    /** 视频描述 */
    desc: string;
    /** 视频封面图片URL */
    image_url: string;
    /** 点赞数 */
    dianzan: string | number;
    /** 评论数 */
    pinglun: string | number;
    /** 分享数 */
    share: string | number;
    /** 硬币数 */
    coin: string | number;
    /** 浏览量 */
    view: string | number;
    /** 视频时长 */
    duration_text: string;
    /** 渲染时间 */
    render_time: string;
    /** 用户短ID */
    user_shortid: string | number;
    /** 获赞总数 */
    total_favorited: string | number;
    /** 关注数 */
    following_count: string | number;
    /** 粉丝数 */
    fans: string | number;
    /** 动态类型 */
    dynamicTYPE: string;
    /** 分享链接 */
    share_url: string;
    /** 动态ID */
    dynamic_id: string;
  };
  /** 预生成的二维码数据URL */
  qrCodeDataUrl?: string;
}
//#endregion
//#region ../template/src/types/platforms/bilibili/userlist.d.ts
/**
 * B站用户列表组件属性接口
 */
interface BilibiliUserListProps extends BaseComponentProps {
  /** 渲染请求数据 */
  data: {
    /** 是否使用深色主题 */
    useDarkTheme?: boolean;
    /** 群组信息 */
    groupInfo: {
      /** 群号 */
      groupId: string;
      /** 群名称 */
      groupName: string;
    };
    /** 用户列表数据 */
    renderOpt: {
      /** 用户头像图片URL */
      avatar_img: string;
      /** 用户名 */
      username: string;
      /** 用户UID */
      host_mid: string;
      /** 粉丝数 */
      fans: string;
      /** 获赞总数 */
      total_favorited: string;
      /** 关注数 */
      following_count: string;
      /** 全局推送开关状态 */
      switch: boolean;
    }[];
  };
}
//#endregion
//#region ../template/src/types/platforms/bilibili/videoInfo.d.ts
/**
 * B站视频统计数据接口
 */
interface BilibiliVideoStat {
  /** 视频AV号 */
  aid: number;
  /** 播放量 */
  view: number;
  /** 弹幕数 */
  danmaku: number;
  /** 评论数 */
  reply: number;
  /** 收藏数 */
  favorite: number;
  /** 投币数 */
  coin: number;
  /** 分享数 */
  share: number;
  /** 当前排名 */
  now_rank: number;
  /** 历史最高排名 */
  his_rank: number;
  /** 点赞数 */
  like: number;
  /** 点踩数 */
  dislike: number;
  /** 评价 */
  evaluation: string;
  /** VT标识 */
  vt: number;
}
/**
 * B站视频UP主信息接口
 */
interface BilibiliVideoOwner {
  /** UP主用户ID */
  mid: number;
  /** UP主昵称 */
  name: string;
  /** UP主头像URL */
  face: string;
}
/**
 * B站视频信息数据接口
 */
interface BilibiliVideoInfoData {
  /** 分享链接 */
  share_url: string;
  /** 视频标题 */
  title: string;
  /** 视频简介 */
  desc: string;
  /** 统计数据 */
  stat: BilibiliVideoStat;
  /** 视频BV号 */
  bvid: string;
  /** 创建时间戳 */
  ctime: number;
  /** 视频封面图片URL */
  pic: string;
  /** UP主信息 */
  owner: BilibiliVideoOwner;
  /** 是否使用深色主题 */
  useDarkTheme?: boolean;
}
/**
 * B站视频信息组件属性接口
 */
interface BilibiliVideoInfoProps extends BaseComponentProps {
  /** 渲染请求数据 */
  data: BilibiliVideoInfoData;
  /** 预生成的二维码数据URL */
  qrCodeDataUrl?: string;
}
//#endregion
//#region ../template/src/types/platforms/bilibili/index.d.ts
/** B站二维码登录组件属性 */
interface BilibiliQrcodeImgProps {
  data: {
    /** 分享链接 */
    share_url: string;
    /** 是否使用深色主题 */
    useDarkTheme?: boolean;
  };
  /** 二维码数据URL */
  qrCodeDataUrl?: string;
}
//#endregion
//#region ../template/src/types/platforms/kuaishou/comment.d.ts
/**
 * 快手评论组件属性接口
 */
interface KuaishouCommentProps extends BaseComponentProps {
  /** 渲染请求数据 */
  data: {
    /** 是否使用深色主题 */
    useDarkTheme?: boolean;
    /** 作品类型：视频/图集 */
    Type: '视频' | '图集';
    /** 评论数量 */
    CommentLength: number;
    /** 视频大小(MB) */
    VideoSize?: string;
    /** 点赞数量 */
    likeCount?: number;
    /** 观看次数 */
    viewCount?: number;
    /** 图片数量 */
    ImageLength?: number;
    /** 分享链接 */
    share_url: string;
    /** 评论数据 */
    CommentsData: {
      jsonArray: KuaishouCommentItem[];
    };
  };
  /** 预生成的二维码数据URL */
  qrCodeDataUrl: string;
}
/**
 * 快手评论项数据接口
 */
interface KuaishouCommentItem {
  /** 评论ID */
  cid: string;
  /** 作品ID */
  aweme_id: string;
  /** 用户昵称 */
  nickname: string;
  /** 用户头像URL */
  userimageurl: string;
  /** 评论内容 */
  text: string;
  /** 点赞数 */
  digg_count: number | string;
  /** 创建时间 */
  create_time: string;
  /** 评论图片 */
  commentimage?: string;
  /** 贴纸 */
  sticker?: string;
  /** 回复数量 */
  reply_comment_total?: number;
  /** IP标签 */
  ip_label?: string;
}
//#endregion
//#region ../template/src/types/platforms/xiaohongshu/comment.d.ts
/**
 * 小红书评论组件属性接口
 */
interface XiaohongshuCommentProps extends BaseComponentProps {
  /** 渲染请求数据 */
  data: {
    /** 是否使用深色主题 */
    useDarkTheme?: boolean;
    /** 笔记类型：图文/视频 */
    Type: '图文' | '视频';
    /** 评论数量 */
    CommentLength: number;
    /** 图片数量 */
    ImageLength?: number;
    /** 分享链接 */
    share_url: string;
    /** 评论数据 - 简化为直接的评论数组 */
    CommentsData: XiaohongshuCommentItem[];
  };
  /** 预生成的二维码数据URL */
  qrCodeDataUrl: string;
}
/**
 * 小红书评论项数据接口
 */
interface XiaohongshuCommentItem {
  /** 评论ID */
  id: string;
  /** 笔记ID */
  note_id: string;
  /** 评论内容 */
  content: string;
  /** 用户信息 */
  user_info: {
    user_id: string;
    nickname: string;
    image: string;
    xsec_token: string;
  };
  /** 创建时间 - 已格式化为相对时间 */
  create_time: string;
  /** IP位置 */
  ip_location: string;
  /** 点赞数 - 已格式化（如1.2w） */
  like_count: string;
  /** 是否已点赞 */
  liked: boolean;
  /** 评论图片 */
  pictures: Array<{
    height: number;
    width: number;
    url_pre: string;
    url_default: string;
    info_list: Array<{
      image_scene: string;
      url: string;
    }>;
  }>;
  /** 子评论数量 */
  sub_comment_count: string;
  /** 子评论列表 */
  sub_comments: XiaohongshuSubComment[];
  /** 显示标签 */
  show_tags: string[];
  /** @用户列表 */
  at_users: string[];
  /** 状态 */
  status: number;
}
/**
 * 小红书子评论数据接口
 */
interface XiaohongshuSubComment {
  /** 子评论ID */
  id: string;
  /** 笔记ID */
  note_id: string;
  /** 评论内容 */
  content: string;
  /** 用户信息 */
  user_info: {
    user_id: string;
    nickname: string;
    image: string;
    xsec_token: string;
  };
  /** 创建时间 - 已格式化为相对时间 */
  create_time: string;
  /** IP位置 */
  ip_location: string;
  /** 点赞数 - 已格式化（如1.2w） */
  like_count: string;
  /** 是否已点赞 */
  liked: boolean;
  /** 评论图片 */
  pictures: string[];
  /** 显示标签 */
  show_tags: string[];
  /** @用户列表 */
  at_users: string[];
  /** 状态 */
  status: number;
  /** 目标评论 */
  target_comment?: {
    id: string;
    user_info: {
      user_id: string;
      nickname: string;
      image: string;
      xsec_token: string;
    };
  };
}
//#endregion
//#region ../template/src/types/platforms/xiaohongshu/noteInfo.d.ts
/**
 * 小红书笔记统计信息接口
 */
interface XiaohongshuNoteStatistics {
  /** 分享数 */
  share_count: string | number;
  /** 是否已关注 */
  followed: boolean;
  /** 关系状态 */
  relation: string;
  /** 是否已点赞 */
  liked: boolean;
  /** 点赞数 */
  liked_count: string | number;
  /** 是否已收藏 */
  collected: boolean;
  /** 收藏数 */
  collected_count: string | number;
  /** 评论数 */
  comment_count: string | number;
}
/**
 * 小红书作者信息接口
 */
interface XiaohongshuAuthor {
  /** xsec_token */
  xsec_token?: string;
  /** 用户ID */
  user_id: string;
  /** 用户昵称 */
  nickname: string;
  /** 用户头像URL */
  avatar: string;
}
/**
 * 小红书笔记信息数据接口
 */
interface XiaohongshuNoteInfoData {
  /** 笔记标题 */
  title: string;
  /** 笔记描述 */
  desc: string;
  /** 统计信息 */
  statistics: XiaohongshuNoteStatistics;
  /** 笔记ID */
  note_id: string;
  /** 作者信息 */
  author: XiaohongshuAuthor;
  /** 笔记封面图片URL */
  image_url: string;
  /** 创建时间戳 */
  time: number;
  /** IP位置 */
  ip_location: string;
  /** 是否使用深色主题 */
  useDarkTheme?: boolean;
}
/**
 * 小红书笔记信息组件属性接口
 */
interface XiaohongshuNoteInfoProps extends BaseComponentProps {
  /** 渲染请求数据 */
  data: XiaohongshuNoteInfoData;
}
//#endregion
//#region ../template/src/types/platforms/ohter/help.d.ts
/**
 * 帮助页面组件属性接口
 */
interface HelpProps extends BaseComponentProps {
  /** 渲染请求数据 */
  data: {
    /** 是否使用深色主题 */
    useDarkTheme?: boolean;
    /** 页面标题 */
    title?: string;
    /** 角色：主人/普通 */
    role?: 'master' | 'member';
    /** 菜单数据：按角色筛选后的分组 */
    menu?: MenuGroup[];
  };
}
/**
 * 菜单项接口
 */
interface MenuItem {
  /** 菜单项标题 */
  title: string;
  /** 菜单项描述 */
  description: string;
  /** 图标名称 */
  icon?: string;
}
/**
 * 菜单分组接口
 */
interface MenuGroup {
  /** 分组标题 */
  title: string;
  /** 菜单项列表 */
  items: MenuItem[];
  /** 子分组（可选） */
  subGroups?: {
    /** 子分组标题 */
    title: string;
    /** 子分组菜单项 */
    items: MenuItem[];
  }[];
}
//#endregion
//#region ../template/src/types/platforms/ohter/handlerError.d.ts
/**
 * 业务错误类型
 */
interface BusinessError {
  /** 错误消息 */
  message: string;
  /** 错误名称 */
  name: string;
  /** 调用栈信息 */
  stack: string;
  /** 业务名称 */
  businessName: string;
}
/**
 * 日志等级类型
 */
type LogLevel = 'TRAC' | 'DEBU' | 'MARK' | 'INFO' | 'ERRO' | 'WARN' | 'FATA';
/**
 * 日志条目接口
 */
interface LogEntry {
  /** 时间戳 */
  timestamp: string;
  /** 日志等级 */
  level: LogLevel;
  /** 日志内容 */
  message: string;
  /** 原始日志字符串 */
  raw: string;
}
/**
 * 适配器信息接口
 */
interface AdapterInfo {
  /** 适配器名称 */
  name: string;
  /** 适配器版本 */
  version: string;
  /** 平台名称 */
  platform: string;
  /** 协议名称 */
  protocol: string;
  /** 标准协议 */
  standard?: string;
}
/**
 * API错误组件属性接口
 */
interface ApiErrorProps extends BaseComponentProps {
  /** 渲染请求数据 */
  data: {
    /** 错误类型 */
    type: 'business_error';
    /** 平台名称 */
    platform: 'douyin' | 'bilibili' | 'kuaishou' | 'system' | 'unknown';
    /** 错误信息 */
    error: BusinessError;
    /** 调用的方法名 */
    method: string;
    /** 错误发生时间 */
    timestamp: string;
    /** 收集到的日志信息 */
    logs?: LogEntry[];
    /** 触发命令 */
    triggerCommand?: string;
    /** 框架版本 */
    frameworkVersion: string;
    /** 插件版本 */
    pluginVersion: string;
    /** 构建时间 */
    buildTime?: string;
    /** Commit ID */
    commitHash?: string;
    /** 适配器信息 */
    adapterInfo?: AdapterInfo;
    /** Amagi 库版本 */
    amagiVersion?: string;
    /** 是否为验证流程 */
    isVerification?: boolean;
    /** 验证链接 */
    verificationUrl?: string;
    /** 分享链接（用于生成二维码） */
    share_url?: string;
  };
  /** 分享链接二维码 */
  qrCodeDataUrl?: string;
}
//#endregion
//#region ../template/src/types/platforms/ohter/changelog.d.ts
/**
 * 更新日志组件属性接口
 */
interface ChangelogProps extends BaseComponentProps {
  /** 渲染请求数据 */
  data: {
    /** 是否包含更新提示 */
    Tip?: boolean;
    /** 后端传入的 Markdown 源码 */
    markdown: string;
    /** 本地版本号 */
    localVersion: string;
    /** 远程版本号 */
    remoteVersion: string;
    /** 构建时间 */
    buildTime?: string;
  };
}
//#endregion
//#region ../template/src/types/platforms/ohter/VersionWarningProps.d.ts
interface VersionWarningProps extends BaseComponentProps {
  /** 插件构建时的 karin 版本 */
  requireVersion: string;
  /** 当前运行的 karin 版本 */
  currentVersion: string;
}
//#endregion
//#region ../template/src/types/index.d.ts
/**
 * 二维码区域组件属性接口
 */
interface QRCodeSectionProps {
  /** 预生成的二维码数据URL */
  qrCodeDataUrl: string;
  /** 是否使用深色主题 */
  useDarkTheme?: boolean;
}
/**
 * 渲染请求参数接口
 */
interface RenderRequest<T = Record<string, unknown>> {
  /** 模板类型 */
  templateType: 'douyin' | 'bilibili' | 'kuaishou' | 'other' | 'apiError';
  /** 模板名称 */
  templateName: string;
  /** 缩放比例 */
  scale?: number;
  /** 是否使用深色主题 */
  useDarkTheme?: boolean;
  /** 版本信息 */
  version?: {
    /** 框架插件 */
    plugin: string;
    /** 插件名称 */
    pluginName: string;
    /** 插件版本 */
    pluginVersion: string;
    /** 发布类型 */
    releaseType: 'Stable' | 'Preview';
    /** 驱动框架 */
    poweredBy: string;
    /** 框架版本 */
    frameworkVersion: string;
    /** 是否有可用更新 */
    hasUpdate?: boolean;
  };
  /** 渲染数据 */
  data: T & {
    /** 是否使用深色主题 */
    useDarkTheme?: boolean;
    /** 二维码分享链接 */
    share_url?: string;
  };
}
/**
 * 渲染响应结果接口
 */
interface RenderResponse {
  /** 是否成功 */
  success: boolean;
  /** HTML文件路径 */
  htmlPath: string;
  /** 错误信息 */
  error?: string;
}
/**
 * 组件属性基础接口 - 泛型T为子组件的具体数据类型
 * @template T 子组件的数据类型
 */
interface BaseComponentProps<T = Record<string, any>> extends Pick<TypedRenderRequest<keyof DataTypeMap>, 'data' | 'version' | 'scale'> {
  /** 渲染数据 - 子组件的具体参数 */
  data: {
    /** 是否使用深色主题 */
    useDarkTheme?: boolean;
  } & T;
}
/**
 * 抖音平台组件ID
 */
type DouyinComponentIds = 'comment' | 'dynamic' | 'live' | 'musicinfo' | 'user_profile' | 'userlist' | 'videoInfo' | 'user_videolist' | 'qrcodeImg';
/**
 * B站平台组件ID
 */
type BilibiliComponentIds = 'comment' | 'userlist' | 'bangumi' | 'videoInfo' | 'qrcodeImg' | 'dynamic/DYNAMIC_TYPE_DRAW' | 'dynamic/DYNAMIC_TYPE_AV' | 'dynamic/DYNAMIC_TYPE_FORWARD' | 'dynamic/DYNAMIC_TYPE_LIVE_RCMD' | 'dynamic/DYNAMIC_TYPE_WORD' | 'dynamic/DYNAMIC_TYPE_ARTICLE';
/**
 * 快手平台组件ID
 */
type KuaishouComponentIds = 'comment';
/**
 * 小红书平台组件ID
 */
type XiaohongshuComponentIds = 'noteInfo' | 'comment';
/**
 * 其他平台组件ID
 */
type OtherComponentIds = 'help' | 'handlerError' | 'changelog' | 'version_warning';
/**
 * 路径类型
 */
type DynamicRenderPath = `douyin/${DouyinComponentIds}` | `bilibili/${BilibiliComponentIds}` | `kuaishou/${KuaishouComponentIds}` | `xiaohongshu/${XiaohongshuComponentIds}` | `other/${OtherComponentIds}`;
/**
 * 路径到数据类型的精确映射接口
 */
interface PathToDataTypeMap {
  'douyin/comment': DouyinCommentProps['data'];
  'douyin/dynamic': DouyinDynamicProps['data'];
  'douyin/live': DouyinLiveProps['data'];
  'douyin/musicinfo': DouyinMusicInfoProps['data'];
  'douyin/user_profile': DouyinUserVideoListProps['data'];
  'douyin/userlist': DouyinUserListProps['data'];
  'douyin/videoInfo': DouyinVideoInfoProps['data'];
  'douyin/qrcodeImg': DouyinQrcodeImgProps['data'];
  'bilibili/comment': BilibiliCommentProps['data'];
  'bilibili/userlist': BilibiliUserListProps['data'];
  'bilibili/bangumi': BilibiliBangumiProps['data'];
  'bilibili/videoInfo': BilibiliVideoInfoProps['data'];
  'bilibili/qrcodeImg': BilibiliQrcodeImgProps['data'];
  'bilibili/dynamic/DYNAMIC_TYPE_DRAW': BilibiliDynamicProps['data'];
  'bilibili/dynamic/DYNAMIC_TYPE_AV': BilibiliVideoDynamicProps['data'];
  'bilibili/dynamic/DYNAMIC_TYPE_FORWARD': BilibiliForwardDynamicProps['data'];
  'bilibili/dynamic/DYNAMIC_TYPE_LIVE_RCMD': BilibiliLiveDynamicProps['data'];
  'bilibili/dynamic/DYNAMIC_TYPE_ARTICLE': BilibiliArticleDynamicProps['data'];
  'bilibili/dynamic/DYNAMIC_TYPE_WORD': BilibiliDynamicProps['data'];
  'kuaishou/comment': KuaishouCommentProps['data'];
  'xiaohongshu/noteInfo': XiaohongshuNoteInfoProps['data'];
  'xiaohongshu/comment': XiaohongshuCommentProps['data'];
  'other/help': HelpProps['data'];
  'other/handlerError': ApiErrorProps['data'];
  'other/changelog': ChangelogProps['data'];
  'other/version_warning': VersionWarningProps['data'];
}
/**
 * 从路径字符串中提取数据类型的工具类型
 * @template P 路径字符串
 */
type ExtractDataTypeFromPath<P extends string> = P extends keyof PathToDataTypeMap ? PathToDataTypeMap[P] : Record<string, any>;
/**
 * 模板类型到数据类型的映射接口
 */
interface DataTypeMap {
  /** 抖音平台数据类型 */
  douyin: DouyinCommentProps['data'] | DouyinDynamicProps['data'] | DouyinLiveProps['data'] | DouyinMusicInfoProps['data'] | DouyinQrcodeImgProps['data'];
  /** B站平台数据类型 */
  bilibili: BilibiliCommentProps['data'] | BilibiliForwardDynamicProps['data'];
  /** 快手平台数据类型 */
  kuaishou: KuaishouCommentProps['data'];
  /** 其他类型数据 */
  other: HelpProps['data'];
}
/**
 * 渲染请求接口
 * @template K 模板类型键
 */
interface TypedRenderRequest<K extends keyof DataTypeMap> extends Omit<RenderRequest, 'templateType' | 'data'> {
  /** 模板类型 */
  templateType: K;
  /** 渲染数据 */
  data: DataTypeMap[K];
}
//#endregion
//#region ../template/src/main.d.ts
/**
 * 插件执行时机
 * - pre: 在渲染前执行
 * - normal: 在渲染时执行
 * - post: 在渲染后执行
 */
type PluginEnforce = 'pre' | 'normal' | 'post';
/**
 * 渲染状态接口
 * 用于在插件之间传递和修改渲染状态
 */
interface RenderState {
  /** 传递给组件的额外属性 */
  props: Record<string, unknown>;
  /** React 组件实例 */
  component?: React$1.ReactElement | null;
  /** 渲染后的 HTML 字符串 */
  html?: string;
}
/**
 * 插件上下文接口
 * 提供插件执行时所需的所有上下文信息
 * @template T 渲染数据类型
 */
interface PluginContext<T extends Record<string, unknown> = Record<string, unknown>> {
  /** 渲染请求对象 */
  request: RenderRequest<T>;
  /** 输出目录路径 */
  outputDir: string;
  /** 资源路径管理器实例 */
  resourceManager: ResourcePathManager;
  /** 当前渲染状态 */
  state: RenderState;
}
/**
 * 模板插件接口
 * 定义插件的生命周期钩子和配置
 * @template T 渲染数据类型
 */
interface TemplatePlugin<T extends Record<string, unknown> = Record<string, unknown>> {
  /** 插件名称，用于标识和调试 */
  name: string;
  /** 插件执行时机，默认为 'normal' */
  enforce?: PluginEnforce;
  /** 插件应用条件，返回 true 时插件生效 */
  apply?: (request: RenderRequest<T>) => boolean;
  /** 渲染前钩子，用于准备数据和属性 */
  beforeRender?: (ctx: PluginContext<T>) => Promise<void> | void;
  /** 渲染时钩子，可以包装或替换组件 */
  render?: (ctx: PluginContext<T>) => Promise<void> | void;
  /** 渲染后钩子，可以修改最终的 HTML */
  afterRender?: (ctx: PluginContext<T>) => Promise<void> | void;
}
/**
 * 简化的插件类型，下游使用时无需手动指定泛型
 * 自动使用 Record<string, unknown> 作为数据类型
 */
type Plugin = TemplatePlugin<Record<string, unknown>>;
/**
 * 插件工厂函数类型
 * 用于创建可配置的插件实例
 * @template T 插件配置类型
 */
type PluginFactory<T = Record<string, unknown>> = (options?: T) => Plugin;
/**
 * 资源路径管理器类
 * 负责管理不同环境下的资源路径配置
 */
declare class ResourcePathManager {
  private packageDir;
  private NODE_ENV;
  private static initialized;
  constructor();
  /**
   * 获取包目录路径
   * @returns 包目录的绝对路径
   */
  private getPackageDir;
  /**
   * 查找开发环境目录
   * @param cwd 当前工作目录
   * @returns 开发环境目录路径
   */
  private findDevelopmentDir;
  /**
   * 通过 import.meta.url 获取 npm 包的安装目录
   * @returns npm 包的安装目录路径
   */
  private getPackageDirFromImportMeta;
  /**
   * 从 pnpm 路径中提取插件目录
   * @param pnpmPath pnpm 的符号链接路径
   * @returns 插件目录路径，如果无法提取则返回 null
   */
  private extractPluginDirFromPnpmPath;
  /**
   * 通过扫描当前工作目录查找插件目录
   * @returns 插件目录路径，如果找不到则返回 null
   */
  private findPluginDirByScanning;
  /**
   * 在指定目录中查找包含 karin-plugin-kkk 的插件目录
   * @param pluginsDir 插件目录路径
   * @returns 找到的插件目录路径，如果找不到则返回 null
   */
  private findKarinPluginInDir;
  /**
   * 检测当前是否运行在插件模式
   * @returns 如果是插件模式返回 true，否则返回 false
   */
  private isPluginMode;
  /**
   * 获取静态资源路径配置
   * @returns 静态资源路径配置对象
   */
  getResourcePaths(): {
    cssDir: string;
    imageDir: string;
  };
}
/**
 * 渲染器配置选项接口
 * @template K 模板类型键
 */
interface ReactServerRenderOptions<K extends keyof DataTypeMap> {
  /** 渲染请求对象 */
  request: RenderRequest<DataTypeMap[K]>;
  /** 输出目录路径 */
  outputDir: string;
  /** 插件列表 */
  plugins?: Plugin[];
}
/**
 * SSR 预渲染组件为 HTML 的具体实现
 *
 * @template K 模板类型键，用于类型推断
 * @param options 渲染配置选项
 * @returns 渲染结果 Promise
 *
 * # Example
 * ```typescript
 * // 基础使用
 * const result = await reactServerRender({
 *   request: {
 *     templateType: 'douyin',
 *     templateName: 'videoInfo',
 *     data: { share_url: 'https://example.com' }
 *   },
 *   outputDir: './output'
 * })
 *
 * // 使用插件
 * const result = await reactServerRender({
 *   request: renderRequest,
 *   outputDir: './output',
 *   plugins: [customPlugin()]
 * })
 * ```
 */
declare const reactServerRender: <K extends keyof DataTypeMap>(options: ReactServerRenderOptions<K>) => Promise<RenderResponse>;
//#endregion
export { BaseComponentProps, type DataTypeMap, DynamicRenderPath, ExtractDataTypeFromPath, type Plugin, type PluginContext, type PluginFactory, QRCodeSectionProps, type ReactServerRenderOptions, RenderRequest, RenderResponse, type TypedRenderRequest, reactServerRender as default, reactServerRender };