/// <reference types="node" />
import { O as RichTextDocument } from "./index-CN7AJkHp.mjs";
import { EventEmitter } from "node:events";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import React$1 from "react";
import { Agent, ClientRequest, ClientRequestArgs, IncomingMessage, OutgoingHttpHeaders, Server } from "http";
import { EventEmitter as EventEmitter$1 } from "events";
import { createConnection } from "net";
import { SecureContextOptions } from "tls";
import { Server as Server$1 } from "https";
import { URL } from "url";
import { ZlibOptions } from "zlib";

//#region ../template/src/types/platforms/douyin/articleWork.d.ts
/**
 * 文章图片信息
 */
interface ArticleImage {
  /** AI高清图片URL */
  ai_high_image_url: string;
  /** 高清图片URL */
  high_image_url: string;
  /** Markdown图片URL */
  markdown_url: string;
  /** 原始图片URL */
  origin_image_url: string;
}
/**
 * 抖音文章作品组件属性接口
 */
interface DouyinArticleWorkProps extends BaseComponentProps {
  /** 渲染请求数据 */
  data: {
    /** 是否使用深色主题 */useDarkTheme?: boolean; /** 文章标题 */
    title: string; /** 文章Markdown内容 */
    markdown: string; /** 文章图片列表 */
    images: ArticleImage[]; /** 阅读时间(分钟) */
    read_time: number; /** 点赞数 */
    dianzan: string; /** 评论数 */
    pinglun: string; /** 收藏数 */
    shouchang: string; /** 分享数 */
    share: string; /** 创建时间 */
    create_time: string; /** 用户头像URL */
    avater_url: string; /** 用户名 */
    username: string; /** 抖音号 */
    抖音号: string; /** 获赞数 */
    获赞: string; /** 关注数 */
    关注: string; /** 粉丝数 */
    粉丝: string; /** 分享链接 */
    share_url: string;
  };
  /** 预生成的二维码数据URL */
  qrCodeDataUrl: string;
}
//#endregion
//#region ../template/src/types/platforms/douyin/comment.d.ts
/**
 * 抖音评论组件属性接口
 */
interface DouyinCommentProps extends BaseComponentProps {
  /** 渲染请求数据 */
  data: {
    /** 是否使用深色主题 */useDarkTheme?: boolean; /** 作品类型：视频/图集/合辑/文章 */
    Type: '视频' | '图集' | '合辑' | '文章'; /** 评论数量 */
    CommentLength: number; /** 视频大小(MB) */
    VideoSize?: string; /** 视频帧率(Hz) */
    VideoFPS?: number; /** 图片数量 */
    ImageLength?: number; /** 区域 */
    Region: string; /** 相关搜索（大家都在搜） */
    suggestWrod: string[]; /** 视频分辨率 */
    Resolution: string | null; /** 分享链接 */
    share_url: string; /** 评论数据列表 */
    CommentsData: Array<{
      /** 评论ID */id?: number; /** 评论CID */
      cid?: string; /** 作品ID */
      aweme_id?: string; /** 用户头像URL */
      userimageurl: string; /** 用户昵称 */
      nickname: string; /** 标签类型 (1=作者) */
      label_type?: number; /** 状态标签 */
      status_label?: string; /** 评论内容 */
      text: RichTextDocument; /** 评论图片 */
      commentimage?: string; /** 贴纸 */
      sticker?: string; /** 创建时间戳（秒） */
      create_time: number; /** IP标签 */
      ip_label: string; /** 点赞数 */
      digg_count: number; /** 搜索文本 */
      search_text?: Array<{
        /** 搜索文本内容 */search_text: string; /** 搜索查询ID */
        search_query_id: string;
      }> | null; /** 是否@用户ID */
      is_At_user_id?: any; /** 回复评论数据 */
      replyComment?: DouyinSubComment[]; /** 作者是否点赞 */
      is_author_digged?: boolean;
    }>; /** 最大嵌套层级 */
    maxDepth?: number;
  };
  /** 预生成的二维码数据URL */
  qrCodeDataUrl: string;
}
/**
 * 抖音子评论数据接口
 */
interface DouyinSubComment {
  /** 创建时间戳（秒） */
  create_time: number;
  /** 用户昵称 */
  nickname: string;
  /** 用户头像URL */
  userimageurl: string;
  /** 评论内容 */
  text: RichTextDocument;
  /** 点赞数 */
  digg_count: number;
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
    /** 是否使用深色主题 */useDarkTheme?: boolean; /** 图片URL */
    image_url: string; /** 描述内容 */
    desc: string; /** 点赞数 */
    dianzan: string; /** 评论数 */
    pinglun: string; /** 收藏数 */
    shouchang: string; /** 分享数 */
    share: string; /** 创建时间 */
    create_time: string; /** 用户头像URL */
    avater_url: string; /** 用户名 */
    username: string; /** 抖音号 */
    抖音号: string; /** 获赞数 */
    获赞: string; /** 关注数 */
    关注: string; /** 粉丝数 */
    粉丝: string; /** 分享链接 */
    share_url: string; /** 动态类型 */
    dynamicTYPE?: string; /** 合作信息 */
    cooperation_info?: {
      co_creator_nums: number;
      co_creators: Array<{
        avatar_url?: string;
        nickname: string;
        role_title: string;
      }>;
    };
  };
  /** 预生成的二维码数据URL */
  qrCodeDataUrl: string;
}
//#endregion
//#region ../template/src/types/platforms/douyin/favorite-list.d.ts
/**
 * 抖音喜欢列表组件属性接口
 * 用于展示"谁喜欢了谁的作品"
 */
interface DouyinFavoriteListProps extends BaseComponentProps {
  /** 渲染请求数据 */
  data: {
    /** 是否使用深色主题 */useDarkTheme?: boolean; /** 作品封面图片URL */
    image_url: string; /** 作品描述内容 */
    desc: string; /** 点赞数 */
    dianzan: string; /** 评论数 */
    pinglun: string; /** 收藏数 */
    shouchang: string; /** 分享数 */
    share: string; /** 推荐数 */
    tuijian: string; /** 作品创建时间 */
    create_time: string; /** 点赞者（订阅者）用户名 */
    liker_username: string; /** 点赞者头像URL */
    liker_avatar: string; /** 点赞者抖音号 */
    liker_douyin_id: string; /** 作品作者用户名 */
    author_username: string; /** 作品作者头像URL */
    author_avatar: string; /** 作品作者抖音号 */
    author_douyin_id: string; /** 分享链接 */
    share_url: string;
  };
  /** 预生成的二维码数据URL */
  qrCodeDataUrl: string;
}
//#endregion
//#region ../template/src/types/platforms/douyin/imageWork.d.ts
/**
 * 抖音图文作品组件属性接口
 */
interface DouyinImageWorkProps extends BaseComponentProps {
  /** 渲染请求数据 */
  data: {
    /** 是否使用深色主题 */useDarkTheme?: boolean; /** 图文封面URL */
    image_url: string; /** 描述内容 */
    desc: string; /** 点赞数 */
    dianzan: string; /** 评论数 */
    pinglun: string; /** 收藏数 */
    shouchang: string; /** 分享数 */
    share: string; /** 创建时间 */
    create_time: string; /** 用户头像URL */
    avater_url: string; /** 用户名 */
    username: string; /** 抖音号 */
    抖音号: string; /** 获赞数 */
    获赞: string; /** 关注数 */
    关注: string; /** 粉丝数 */
    粉丝: string; /** 分享链接 */
    share_url: string; /** 动态类型 */
    dynamicTYPE?: string; /** 合作信息 */
    cooperation_info?: {
      co_creator_nums: number;
      co_creators: Array<{
        avatar_url?: string;
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
    /** 是否使用深色主题 */useDarkTheme?: boolean; /** 直播封面图片URL */
    image_url: string; /** 直播标题/描述 */
    text: string; /** 直播信息 */
    liveinf: string; /** 总观看次数 */
    总观看次数: string; /** 在线观众数 */
    在线观众: string; /** 用户头像URL */
    avater_url: string; /** 用户名 */
    username: string; /** 粉丝数 */
    fans: string; /** 动态类型 */
    dynamicTYPE: string; /** 分享链接 */
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
    /** 是否使用深色主题 */useDarkTheme?: boolean; /** 音乐封面图片URL */
    image_url: string; /** 音乐描述/标题 */
    desc: string; /** 音乐ID */
    music_id: string; /** 创建时间 */
    create_time: string; /** 使用该音乐的用户数量 */
    user_count: string; /** 用户头像URL */
    avater_url: string; /** 用户名 */
    username: string; /** 用户短ID */
    user_shortid: string; /** 获赞数 */
    total_favorited: number; /** 关注数 */
    following_count: number; /** 粉丝数 */
    fans: number; /** 分享链接 */
    share_url: string;
  };
  /** 预生成的二维码数据URL */
  qrCodeDataUrl: string;
}
//#endregion
//#region ../template/src/types/platforms/douyin/recommend-list.d.ts
/**
 * 抖音推荐列表组件属性接口
 */
interface DouyinRecommendListProps extends BaseComponentProps {
  /** 渲染请求数据 */
  data: {
    /** 是否使用深色主题 */useDarkTheme?: boolean; /** 图片URL */
    image_url: string; /** 描述内容 */
    desc: string; /** 点赞数 */
    dianzan: string; /** 评论数 */
    pinglun: string; /** 收藏数 */
    shouchang: string; /** 推荐数 */
    tuijian: string; /** 分享数 */
    share: string; /** 创建时间 */
    create_time: string; /** 推荐者（订阅者）用户名 */
    recommender_username: string; /** 推荐者头像URL */
    recommender_avatar: string; /** 推荐者抖音号 */
    recommender_douyin_id: string; /** 作品作者用户名 */
    author_username: string; /** 作品作者头像URL */
    author_avatar: string; /** 作品作者抖音号 */
    author_douyin_id: string; /** 分享链接 */
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
    /** 是否使用深色主题 */useDarkTheme?: boolean; /** 群组信息 */
    groupInfo: {
      /** 群号 */groupId: string; /** 群名称 */
      groupName: string;
    }; /** 用户列表数据 */
    renderOpt: {
      /** 用户头像图片URL */avatar_img: string; /** 用户名 */
      username: string; /** 抖音短ID */
      short_id: string; /** 粉丝数 */
      fans: string; /** 获赞总数 */
      total_favorited: string; /** 关注数 */
      following_count: string; /** 全局推送开关状态 */
      switch: boolean; /** 推送类型列表 */
      pushTypes: string[];
    }[];
  };
}
//#endregion
//#region ../template/src/types/platforms/douyin/UserVideoList.d.ts
/**
 * 用户视频列表页面的数据类型定义
 */
type VideoListItem = {
  /** 视频ID */aweme_id: string; /** 视频索引 */
  index?: number; /** 是否置顶 */
  is_top: boolean; /** 视频标题/描述 */
  title: string; /** 视频封面URL */
  cover: string; /** 视频时长（秒） */
  duration: number; /** 创建时间戳 */
  create_time: number; /** 统计数据 */
  statistics: {
    /** 点赞数 */like_count: number; /** 评论数 */
    comment_count: number; /** 分享数 */
    share_count: number; /** 收藏数 */
    collect_count: number;
  }; /** 是否为视频(true)还是图集(false) */
  is_video: boolean; /** 背景音乐信息 */
  music?: {
    /** 音乐标题 */title: string; /** 音乐作者 */
    author: string;
  };
};
type UserVideoListData = {
  /** 用户基本信息 */user: {
    /** 头像图片（可能为 null） */head_image: string | null; /** 用户昵称 */
    nickname: string; /** 抖音号 */
    short_id: string; /** 头像URL */
    avatar: string; /** 用户签名/简介 */
    signature: string; /** 粉丝数 */
    follower_count: number; /** 关注数 */
    following_count: number; /** 获赞总数 */
    total_favorited: number; /** 是否认证 */
    verified: boolean; /** IP属地 */
    ip_location: string;
  }; /** 视频列表 */
  videos: VideoListItem[]; /** 超时秒数 */
  timeoutSeconds?: number;
};
interface DouyinUserVideoListProps {
  data: UserVideoListData & {
    useDarkTheme?: boolean;
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
//#region ../template/src/types/platforms/douyin/videoWork.d.ts
/**
 * 抖音视频作品组件属性接口
 */
interface DouyinVideoWorkProps extends BaseComponentProps {
  /** 渲染请求数据 */
  data: {
    /** 是否使用深色主题 */useDarkTheme?: boolean; /** 视频封面URL */
    image_url: string; /** 描述内容 */
    desc: string; /** 点赞数 */
    dianzan: string; /** 评论数 */
    pinglun: string; /** 收藏数 */
    shouchang: string; /** 分享数 */
    share: string; /** 创建时间 */
    create_time: string; /** 用户头像URL */
    avater_url: string; /** 用户名 */
    username: string; /** 抖音号 */
    抖音号: string; /** 获赞数 */
    获赞: string; /** 关注数 */
    关注: string; /** 粉丝数 */
    粉丝: string; /** 分享链接 */
    share_url: string; /** 动态类型 */
    dynamicTYPE?: string; /** 合作信息 */
    cooperation_info?: {
      co_creator_nums: number;
      co_creators: Array<{
        avatar_url?: string;
        nickname: string;
        role_title: string;
      }>;
      subscriber_role?: string;
    };
  };
  /** 预生成的二维码数据URL */
  qrCodeDataUrl: string;
}
//#endregion
//#region ../template/src/types/platforms/douyin/index.d.ts
/** 抖音二维码登录组件属性 */
interface DouyinQrcodeImgProps extends BaseComponentProps<{
  /** 二维码数据URL（插件生成的自定义二维码，或原始二维码图片） */qrCodeDataUrl?: string; /** 分享链接（用于生成自定义二维码） */
  share_url?: string;
}> {
  /** 是否使用深色主题 */
  useDarkTheme?: boolean;
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
    /** 是否使用深色主题 */useDarkTheme?: boolean; /** 作品类型：视频/图集/动态 */
    Type: '视频' | '动态'; /** 评论数量 */
    CommentLength: string; /** 视频大小(MB) */
    VideoSize?: string; /** 视频画质 */
    Clarity?: string; /** 图片数量 */
    ImageLength?: number; /** 分享链接 */
    shareurl: string; /** 分享URL */
    share_url: string; /** 视频分辨率 */
    Resolution: string | null; /** 评论数据 */
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
  /** 用户昵称颜色 */
  unameColor?: string | null;
  /** 用户等级 */
  level: number;
  /** 头像框 */
  frame?: string;
  /** 评论内容 */
  message: RichTextDocument;
  /** 评论所有图片 */
  pictures: string[];
  /** 创建时间戳（秒） */
  ctime: number;
  /** IP标签/地理位置 */
  location: string;
  /** 点赞数 */
  like: number;
  /** 是否为UP主评论 */
  isUP: boolean;
  /** VIP状态 */
  vipstatus?: number;
  /** 粉丝卡片信息 */
  fanCard?: FanCardInfo | null;
  /** 粉丝勋章详情 */
  fansDetail?: FansDetail | null;
}
/**
 * 粉丝勋章详情
 */
interface FansDetail {
  /** 用户ID */
  uid: number;
  /** 勋章ID */
  medal_id: number;
  /** 勋章名称 */
  medal_name: string;
  /** 分数 */
  score: number;
  /** 等级 */
  level: number;
  /** 亲密度 */
  intimacy: number;
  /** 主播状态 */
  master_status: number;
  /** 是否领取 */
  is_receive: number;
  /** 勋章颜色（起始） */
  medal_color: number;
  /** 勋章颜色（结束） */
  medal_color_end: number;
  /** 边框颜色 */
  medal_color_border: number;
  /** 名称颜色 */
  medal_color_name: number;
  /** 等级颜色 */
  medal_color_level: number;
  /** 守护等级 */
  guard_level: number;
  /** 守护图标 */
  guard_icon: string;
  /** 荣誉图标 */
  honor_icon: string;
  /** 首图标（可选） */
  first_icon?: string;
  /** 等级背景色 */
  medal_level_bg_color: number;
}
/**
 * B站评论项数据接口
 */
interface CommentItem {
  /** 用户头像URL */
  avatar: string;
  /** 用户昵称 */
  uname: string;
  /** 用户昵称颜色 */
  unameColor?: string | null;
  /** 用户等级 */
  level: number;
  /** 头像框 */
  frame?: string;
  /** 标签类型 (1=作者) */
  label_type?: number;
  /** 状态标签 */
  status_label?: string | null;
  /** 评论内容 */
  message: RichTextDocument;
  /** 评论所有图片 */
  pictures: string[];
  /** VIP状态 */
  vipstatus?: number;
  /** 贴纸 */
  sticker?: string;
  /** 创建时间戳（秒） */
  ctime: number;
  /** IP标签/地理位置 */
  location: string;
  /** 回复数量 */
  replylength: number;
  /** 点赞数 */
  like: number;
  /** 是否置顶评论 */
  isTop: boolean;
  /** 是否为UP主评论 */
  isUP: boolean;
  /** 二级评论列表 */
  replies?: SubCommentItem[];
  /** 粉丝卡片信息 */
  fanCard?: FanCardInfo | null;
  /** 粉丝勋章详情 */
  fansDetail?: FansDetail | null;
}
//#endregion
//#region ../template/src/types/platforms/bilibili/dynamic/normal.d.ts
/**
 * 装饰卡片数据
 */
interface DecorationCardData {
  /** 卡片背景图片URL */
  card_url: string;
  /** 渐变颜色数组 */
  colors: string[];
  /** 卡片显示文字 */
  text: string;
}
/**
 * 用户名元数据，用于传递 VIP 状态和颜色信息
 */
interface UsernameMetadata$1 {
  /** 用户名 */
  name: string;
  /** VIP状态，1为年度大会员 */
  vipStatus: number;
  /** 昵称颜色，VIP用户特有 */
  nicknameColor: string | null;
}
/**
 * B站普通动态组件属性接口
 */
interface BilibiliDynamicProps extends BaseComponentProps {
  /** 渲染请求数据 */
  data: {
    /** 是否使用深色主题 */useDarkTheme?: boolean; /** 用户头像URL */
    avatar_url: string; /** 头像框 */
    frame?: string; /** 用户名元数据 */
    usernameMeta: UsernameMetadata$1; /** 动态创建时间 */
    create_time: string; /** 装饰卡片 */
    decoration_card?: DecorationCardData; /** 图文动态标题 */
    title?: string; /** 动态文本内容（富文本文档） */
    text: RichTextDocument | null; /** 图片URL数组 */
    image_url: Array<{
      image_src: string;
    }>; /** 点赞数 */
    dianzan: string | number; /** 评论数 */
    pinglun: string | number; /** 分享数 */
    share: string | number; /** 渲染时间 */
    render_time: string; /** 用户短ID */
    user_shortid: string | number; /** 获赞总数 */
    total_favorited: string | number; /** 关注数 */
    following_count: string | number; /** 粉丝数 */
    fans: string | number; /** 动态类型 */
    dynamicTYPE: string; /** 分享链接 */
    share_url: string; /** 图片布局方式 */
    imageLayout: string; /** 相关内容卡片 */
    additional?: BilibiliAdditionalData;
  };
  /** 预生成的二维码数据URL */
  qrCodeDataUrl?: string;
}
/**
 * B站预约卡片数据接口
 */
interface BilibiliReserveData {
  /** 预约标题 */
  title: string;
  /** 时间信息 */
  desc1: string;
  /** 预约人数 */
  desc2: string;
  /** 预约奖励信息（可选） */
  desc3?: string;
  /** 按钮文本 */
  buttonText: string;
}
/**
 * B站投票卡片数据接口
 */
interface BilibiliVoteData {
  /** 投票标题 */
  title: string;
  /** 参与人数描述（如 "1703人参与"） */
  desc: string;
  /** 投票状态: 4-已结束 */
  status: number;
}
/**
 * B站通用卡片数据接口（游戏等）
 */
interface BilibiliCommonData {
  /** 封面图 */
  cover: string;
  /** 标题 */
  title: string;
  /** 描述1（标签） */
  desc1: string;
  /** 描述2（副标题） */
  desc2: string;
  /** 按钮文本 */
  button_text?: string;
  /** 头部文本（如"相关游戏"） */
  head_text?: string;
  /** 子类型 */
  sub_type?: string;
}
/**
 * B站视频跳转卡片数据接口（UGC）
 */
interface BilibiliUgcData {
  /** 封面图 */
  cover: string;
  /** 标题 */
  title: string;
  /** 时长（如 "08:01"） */
  duration: string;
  /** 播放量（如 "12.6万播放"） */
  play: string;
  /** 弹幕数（如 "1061弹幕"） */
  danmaku: string;
}
/**
 * B站相关内容卡片联合类型
 */
interface BilibiliAdditionalData {
  /** 卡片类型 */
  type: 'ADDITIONAL_TYPE_RESERVE' | 'ADDITIONAL_TYPE_VOTE' | 'ADDITIONAL_TYPE_COMMON' | 'ADDITIONAL_TYPE_UGC' | 'ADDITIONAL_TYPE_GOODS' | 'ADDITIONAL_TYPE_UPOWER_LOTTERY' | 'ADDITIONAL_TYPE_NONE';
  /** 预约数据 */
  reserve?: BilibiliReserveData;
  /** 投票数据 */
  vote?: BilibiliVoteData;
  /** 通用卡片数据 */
  common?: BilibiliCommonData;
  /** 视频跳转数据 */
  ugc?: BilibiliUgcData;
}
/**
 * B站纯文动态组件属性接口
 */
interface BilibiliWordDynamicProps extends BaseComponentProps {
  /** 渲染请求数据 */
  data: {
    /** 是否使用深色主题 */useDarkTheme?: boolean; /** 用户头像URL */
    avatar_url: string; /** 头像框 */
    frame?: string; /** 用户名元数据 */
    usernameMeta: UsernameMetadata$1; /** 动态创建时间 */
    create_time: string; /** 装饰卡片 */
    decoration_card?: DecorationCardData; /** 动态文本内容（富文本文档） */
    text: RichTextDocument | null; /** 点赞数 */
    dianzan: string | number; /** 评论数 */
    pinglun: string | number; /** 分享数 */
    share: string | number; /** 渲染时间 */
    render_time: string; /** 用户短ID */
    user_shortid: string | number; /** 获赞总数 */
    total_favorited: string | number; /** 关注数 */
    following_count: string | number; /** 粉丝数 */
    fans: string | number; /** 动态类型 */
    dynamicTYPE: string; /** 分享链接 */
    share_url: string; /** 相关内容卡片 */
    additional?: BilibiliAdditionalData;
  };
  /** 预生成的二维码数据URL */
  qrCodeDataUrl?: string;
}
//#endregion
//#region ../template/src/types/platforms/bilibili/dynamic/article.d.ts
/**
 * B站专栏动态组件属性接口
 */
interface BilibiliArticleDynamicProps extends BaseComponentProps {
  /** 渲染请求数据 */
  data: {
    /** 是否使用深色主题 */useDarkTheme?: boolean; /** 用户头像URL */
    avatar_url: string; /** 头像框 */
    frame?: string; /** 用户名元数据 */
    usernameMeta: UsernameMetadata$1; /** 动态创建时间 */
    create_time: string; /** 装饰卡片 */
    decoration_card?: DecorationCardData; /** 专栏标题 */
    title: string; /** 专栏摘要 */
    summary: string; /** 专栏封面图片URL */
    banner_url?: string; /** 专栏分类 */
    categories: Array<{
      id: number;
      name: string;
      parent_id: number;
    }>; /** 专栏字数 */
    words: number; /** 专栏统计数据 */
    stats: {
      /** 阅读数 */view: number; /** 点赞数 */
      like: number; /** 收藏数 */
      favorite: number; /** 评论数 */
      reply: number; /** 分享数 */
      share: number; /** 投币数 */
      coin: number; /** 转发动态 */
      dynamic: number;
    }; /** 专栏正文（richtext 格式） */
    body: RichTextDocument; /** 渲染时间 */
    render_time: string; /** 动态类型 */
    dynamicTYPE: string; /** 分享链接 */
    share_url: string; /** 用户短ID */
    user_shortid: string | number; /** 获赞总数 */
    total_favorited: string | number; /** 关注数 */
    following_count: string | number; /** 粉丝数 */
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
  /** 用户名元数据 */
  usernameMeta: UsernameMetadata$1;
  /** 创建时间 */
  create_time: string;
  /** 装饰卡片 */
  decoration_card?: DecorationCardData;
  /** 视频封面 */
  cover: string;
  /** 视频时长文本 */
  duration_text: string;
  /** 播放量 */
  play: string;
  /** 弹幕数 */
  danmaku: string;
  /** 视频标题 */
  title: RichTextDocument;
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
  /** 用户名元数据 */
  usernameMeta: UsernameMetadata$1;
  /** 创建时间 */
  create_time: string;
  /** 装饰卡片 */
  decoration_card?: DecorationCardData;
  /** 动态文本内容（富文本文档） */
  text: RichTextDocument;
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
  /** 用户名元数据 */
  usernameMeta: UsernameMetadata$1;
  /** 创建时间 */
  create_time: string;
  /** 装饰卡片 */
  decoration_card?: DecorationCardData;
  /** 动态文本内容（富文本文档） */
  text: RichTextDocument;
}
/**
 * 原始内容直播推荐类型接口
 */
interface OriginalContentLiveRcmd {
  /** 用户头像URL */
  avatar_url: string;
  /** 头像框 */
  frame?: string;
  /** 用户名元数据 */
  usernameMeta: UsernameMetadata$1;
  /** 创建时间 */
  create_time: string;
  /** 装饰卡片 */
  decoration_card?: DecorationCardData;
  /** 直播封面 */
  cover: string;
  /** 分区名称 */
  area_name: string;
  /** 大文本 */
  text_large: string;
  /** 在线人数 */
  online: string;
  /** 直播标题 */
  title: RichTextDocument;
}
/**
 * 转发动态原始内容Props接口
 */
interface BilibiliForwardOriginalContentProps {
  /** 原始内容 */
  original_content: {
    /** AV类型内容 */DYNAMIC_TYPE_AV?: OriginalContentAV; /** 图文类型内容 */
    DYNAMIC_TYPE_DRAW?: OriginalContentDraw; /** 文字类型内容 */
    DYNAMIC_TYPE_WORD?: OriginalContentWord; /** 直播推荐类型内容 */
    DYNAMIC_TYPE_LIVE_RCMD?: OriginalContentLiveRcmd;
  };
}
/**
 * B站转发动态组件属性接口
 */
interface BilibiliForwardDynamicProps extends BaseComponentProps {
  /** 渲染请求数据 */
  data: {
    /** 是否使用深色主题 */useDarkTheme?: boolean; /** 用户头像URL */
    avatar_url: string; /** 头像框 */
    frame?: string; /** 用户名元数据 */
    usernameMeta: UsernameMetadata$1; /** 动态创建时间 */
    create_time: string; /** 装饰卡片 */
    decoration_card?: DecorationCardData; /** 动态文本内容（富文本文档） */
    text: RichTextDocument; /** 原始内容 */
    original_content: BilibiliForwardOriginalContentProps['original_content']; /** 点赞数 */
    dianzan: string | number; /** 评论数 */
    pinglun: string | number; /** 分享数 */
    share: string | number; /** 渲染时间 */
    render_time: string; /** 用户短ID */
    user_shortid: string | number; /** 获赞总数 */
    total_favorited: string | number; /** 关注数 */
    following_count: string | number; /** 粉丝数 */
    fans: string | number; /** 动态类型 */
    dynamicTYPE: string; /** 分享链接 */
    share_url: string; /** 图片URL */
    imgList: string[] | null;
  };
  /** 预生成的二维码数据URL */
  qrCodeDataUrl?: string;
}
//#endregion
//#region ../template/src/types/platforms/bilibili/dynamic/live.d.ts
interface BilibiliPosterPalette {
  bgColor: string;
  primaryColor: string;
  secondaryColor: string;
  mutedColor: string;
  accentColor: string;
  deepColor: string;
  coverShade: string;
}
interface BilibiliPosterPalettes {
  light: BilibiliPosterPalette;
  dark: BilibiliPosterPalette;
}
/**
 * B站直播动态组件属性接口
 */
interface BilibiliLiveDynamicProps extends BaseComponentProps {
  /** 渲染请求数据 */
  data: {
    /** 是否使用深色主题 */useDarkTheme?: boolean; /** 直播封面 */
    image_url: string; /** 直播标题 */
    text: RichTextDocument; /** 直播房间信息（分区 | 房间号） */
    liveinf: string; /** 用户名元数据 */
    usernameMeta: UsernameMetadata$1; /** 用户头像URL */
    avatar_url: string; /** 头像框 */
    frame?: string; /** 粉丝数 */
    fans: string; /** 时间信息 */
    create_time: string; /** 直播开始时间 */
    now_time: string; /** 分享和配置 */
    share_url: string; /** 动态类型 */
    dynamicTYPE: string;
  };
  /** 预生成的二维码数据URL */
  qrCodeDataUrl?: string;
  /** 服务端预计算的海报色板（亮色/深色） */
  posterPalettes?: BilibiliPosterPalettes;
  /** 服务端预计算的海报色板 */
  posterPalette?: BilibiliPosterPalette;
}
//#endregion
//#region ../template/src/types/platforms/bilibili/dynamic/video.d.ts
/**
 * B站视频动态组件属性接口
 */
interface BilibiliVideoDynamicProps extends BaseComponentProps {
  /** 渲染请求数据 */
  data: {
    /** 是否使用深色主题 */useDarkTheme?: boolean; /** 用户头像URL */
    avatar_url: string; /** 头像框 */
    frame?: string; /** 用户名元数据 */
    usernameMeta: UsernameMetadata$1; /** 动态创建时间 */
    create_time: string; /** 装饰卡片 */
    decoration_card?: DecorationCardData; /** 视频标题 */
    text: RichTextDocument; /** 视频描述 */
    desc: RichTextDocument; /** 视频封面图片URL */
    image_url: string; /** 点赞数 */
    dianzan: string | number; /** 评论数 */
    pinglun: string | number; /** 分享数 */
    share: string | number; /** 硬币数 */
    coin: string | number; /** 浏览量 */
    view: string | number; /** 视频时长 */
    duration_text: string; /** 渲染时间 */
    render_time: string; /** 用户短ID */
    user_shortid: string | number; /** 获赞总数 */
    total_favorited: string | number; /** 关注数 */
    following_count: string | number; /** 粉丝数 */
    fans: string | number; /** 动态类型 */
    dynamicTYPE: string; /** 分享链接 */
    share_url: string; /** 动态ID */
    dynamic_id: string; /** 共创者列表 (可选) */
    staff?: Array<{
      /** 用户ID */mid: number; /** 职位标题 (UP主/参演) */
      title: string; /** 用户名 */
      name: string; /** 头像URL */
      face: string; /** 粉丝数 */
      follower: number;
    }>;
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
    /** 是否使用深色主题 */useDarkTheme?: boolean; /** 群组信息 */
    groupInfo: {
      /** 群号 */groupId: string; /** 群名称 */
      groupName: string;
    }; /** 用户列表数据 */
    renderOpt: {
      /** 用户头像图片URL */avatar_img: string; /** 用户名 */
      username: string; /** 用户UID */
      host_mid: string; /** 粉丝数 */
      fans: string; /** 获赞总数 */
      total_favorited: string; /** 关注数 */
      following_count: string; /** 全局推送开关状态 */
      switch: boolean; /** 推送类型列表 */
      pushTypes?: ('video' | 'draw' | 'word' | 'live' | 'forward' | 'article')[];
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
 * 用户名元数据接口
 */
interface UsernameMetadata {
  /** 用户名 */
  name: string;
  /** VIP状态 */
  vipStatus: number;
  /** 昵称颜色 */
  nicknameColor: string | null;
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
  /** 用户名元数据（VIP颜色等） */
  usernameMeta?: UsernameMetadata;
  /** 头像框图片URL */
  frame?: string;
}
/**
 * B站视频信息数据接口
 */
interface BilibiliVideoInfoData {
  /** 分享链接 */
  share_url: string;
  /** 视频标题 */
  title: string;
  /** 视频简介（富文本格式） */
  desc: RichTextDocument;
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
    /** 分享链接 */share_url: string; /** 是否使用深色主题 */
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
    /** 是否使用深色主题 */useDarkTheme?: boolean; /** 作品类型：视频/图集 */
    Type: '视频' | '图集'; /** 评论数量 */
    CommentLength: number; /** 视频大小(MB) */
    VideoSize?: string; /** 点赞数量 */
    likeCount?: number; /** 观看次数 */
    viewCount?: number; /** 图片数量 */
    ImageLength?: number; /** 分享链接 */
    share_url: string; /** 评论数据 */
    CommentsData: KuaishouCommentItem[];
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
  text: RichTextDocument;
  /** 点赞数 */
  digg_count: number;
  /** 创建时间戳（毫秒） */
  create_time: number;
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
    /** 是否使用深色主题 */useDarkTheme?: boolean; /** 笔记类型：图文/视频 */
    Type: '图文' | '视频'; /** 评论数量 */
    CommentLength: number; /** 图片数量 */
    ImageLength?: number; /** 分享链接 */
    share_url: string; /** 评论数据 - 简化为直接的评论数组 */
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
  content: RichTextDocument;
  /** 用户信息 */
  user_info: {
    user_id: string;
    nickname: string;
    image: string;
    xsec_token: string;
  };
  /** 创建时间戳（毫秒） */
  create_time: number;
  /** IP位置 */
  ip_location: string;
  /** 点赞数 */
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
  content: RichTextDocument;
  /** 用户信息 */
  user_info: {
    user_id: string;
    nickname: string;
    image: string;
    xsec_token: string;
  };
  /** 创建时间戳（毫秒） */
  create_time: number;
  /** IP位置 */
  ip_location: string;
  /** 点赞数 */
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
  desc: RichTextDocument;
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
//#region ../template/src/types/platforms/other/help.d.ts
/**
 * 帮助页面组件属性接口
 */
interface HelpProps extends BaseComponentProps {
  /** 渲染请求数据 */
  data: {
    /** 是否使用深色主题 */useDarkTheme?: boolean; /** 页面标题 */
    title?: string; /** 角色：主人/普通 */
    role?: 'master' | 'member'; /** 菜单数据：按角色筛选后的分组 */
    menu?: MenuGroup[]; /** 简单的列表数据 (用于 Help.tsx 渲染) */
    list: {
      title: string;
      description: string;
    }[];
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
    /** 子分组标题 */title: string; /** 子分组菜单项 */
    items: MenuItem[];
  }[];
}
//#endregion
//#region ../../node_modules/.pnpm/@karinjs+ws@1.0.4/node_modules/@karinjs/ws/dist/index.d.ts
// can not get all overload of BufferConstructor['from'], need to copy all it's first arguments here
// https://github.com/microsoft/TypeScript/issues/32164
type BufferLike = string | Buffer | DataView | number | ArrayBufferView | Uint8Array | ArrayBuffer | SharedArrayBuffer | Blob | readonly any[] | readonly number[] | {
  valueOf(): ArrayBuffer;
} | {
  valueOf(): SharedArrayBuffer;
} | {
  valueOf(): Uint8Array;
} | {
  valueOf(): readonly number[];
} | {
  valueOf(): string;
} | {
  [Symbol.toPrimitive](hint: string): string;
}; // WebSocket socket.
declare class WebSocket extends EventEmitter$1 {
  /** The connection is not yet open. */
  static readonly CONNECTING: 0;
  /** The connection is open and ready to communicate. */
  static readonly OPEN: 1;
  /** The connection is in the process of closing. */
  static readonly CLOSING: 2;
  /** The connection is closed. */
  static readonly CLOSED: 3;
  binaryType: "nodebuffer" | "arraybuffer" | "fragments";
  readonly bufferedAmount: number;
  readonly extensions: string;
  /** Indicates whether the websocket is paused */
  readonly isPaused: boolean;
  readonly protocol: string;
  /** The current state of the connection */
  readonly readyState: typeof WebSocket.CONNECTING | typeof WebSocket.OPEN | typeof WebSocket.CLOSING | typeof WebSocket.CLOSED;
  readonly url: string;
  /** The connection is not yet open. */
  readonly CONNECTING: 0;
  /** The connection is open and ready to communicate. */
  readonly OPEN: 1;
  /** The connection is in the process of closing. */
  readonly CLOSING: 2;
  /** The connection is closed. */
  readonly CLOSED: 3;
  onopen: ((event: WebSocket.Event) => void) | null;
  onerror: ((event: WebSocket.ErrorEvent) => void) | null;
  onclose: ((event: WebSocket.CloseEvent) => void) | null;
  onmessage: ((event: WebSocket.MessageEvent) => void) | null;
  constructor(address: null);
  constructor(address: string | URL, options?: WebSocket.ClientOptions | ClientRequestArgs);
  constructor(address: string | URL, protocols?: string | string[], options?: WebSocket.ClientOptions | ClientRequestArgs);
  close(code?: number, data?: string | Buffer): void;
  ping(data?: any, mask?: boolean, cb?: (err: Error) => void): void;
  pong(data?: any, mask?: boolean, cb?: (err: Error) => void): void; // https://github.com/websockets/ws/issues/2076#issuecomment-1250354722
  send(data: BufferLike, cb?: (err?: Error) => void): void;
  send(data: BufferLike, options: {
    mask?: boolean | undefined;
    binary?: boolean | undefined;
    compress?: boolean | undefined;
    fin?: boolean | undefined;
  }, cb?: (err?: Error) => void): void;
  terminate(): void;
  /**
   * Pause the websocket causing it to stop emitting events. Some events can still be
   * emitted after this is called, until all buffered data is consumed. This method
   * is a noop if the ready state is `CONNECTING` or `CLOSED`.
   */
  pause(): void;
  /**
   * Make a paused socket resume emitting events. This method is a noop if the ready
   * state is `CONNECTING` or `CLOSED`.
   */
  resume(): void; // HTML5 WebSocket events
  addEventListener<K extends keyof WebSocket.WebSocketEventMap>(type: K, listener: ((event: WebSocket.WebSocketEventMap[K]) => void) | {
    handleEvent(event: WebSocket.WebSocketEventMap[K]): void;
  }, options?: WebSocket.EventListenerOptions): void;
  removeEventListener<K extends keyof WebSocket.WebSocketEventMap>(type: K, listener: ((event: WebSocket.WebSocketEventMap[K]) => void) | {
    handleEvent(event: WebSocket.WebSocketEventMap[K]): void;
  }): void; // Events
  on(event: "close", listener: (this: WebSocket, code: number, reason: Buffer) => void): this;
  on(event: "error", listener: (this: WebSocket, error: Error) => void): this;
  on(event: "upgrade", listener: (this: WebSocket, request: IncomingMessage) => void): this;
  on(event: "message", listener: (this: WebSocket, data: WebSocket.RawData, isBinary: boolean) => void): this;
  on(event: "open", listener: (this: WebSocket) => void): this;
  on(event: "ping" | "pong", listener: (this: WebSocket, data: Buffer) => void): this;
  on(event: "redirect", listener: (this: WebSocket, url: string, request: ClientRequest) => void): this;
  on(event: "unexpected-response", listener: (this: WebSocket, request: ClientRequest, response: IncomingMessage) => void): this;
  on(event: string | symbol, listener: (this: WebSocket, ...args: any[]) => void): this;
  once(event: "close", listener: (this: WebSocket, code: number, reason: Buffer) => void): this;
  once(event: "error", listener: (this: WebSocket, error: Error) => void): this;
  once(event: "upgrade", listener: (this: WebSocket, request: IncomingMessage) => void): this;
  once(event: "message", listener: (this: WebSocket, data: WebSocket.RawData, isBinary: boolean) => void): this;
  once(event: "open", listener: (this: WebSocket) => void): this;
  once(event: "ping" | "pong", listener: (this: WebSocket, data: Buffer) => void): this;
  once(event: "redirect", listener: (this: WebSocket, url: string, request: ClientRequest) => void): this;
  once(event: "unexpected-response", listener: (this: WebSocket, request: ClientRequest, response: IncomingMessage) => void): this;
  once(event: string | symbol, listener: (this: WebSocket, ...args: any[]) => void): this;
  off(event: "close", listener: (this: WebSocket, code: number, reason: Buffer) => void): this;
  off(event: "error", listener: (this: WebSocket, error: Error) => void): this;
  off(event: "upgrade", listener: (this: WebSocket, request: IncomingMessage) => void): this;
  off(event: "message", listener: (this: WebSocket, data: WebSocket.RawData, isBinary: boolean) => void): this;
  off(event: "open", listener: (this: WebSocket) => void): this;
  off(event: "ping" | "pong", listener: (this: WebSocket, data: Buffer) => void): this;
  off(event: "redirect", listener: (this: WebSocket, url: string, request: ClientRequest) => void): this;
  off(event: "unexpected-response", listener: (this: WebSocket, request: ClientRequest, response: IncomingMessage) => void): this;
  off(event: string | symbol, listener: (this: WebSocket, ...args: any[]) => void): this;
  addListener(event: "close", listener: (code: number, reason: Buffer) => void): this;
  addListener(event: "error", listener: (error: Error) => void): this;
  addListener(event: "upgrade", listener: (request: IncomingMessage) => void): this;
  addListener(event: "message", listener: (data: WebSocket.RawData, isBinary: boolean) => void): this;
  addListener(event: "open", listener: () => void): this;
  addListener(event: "ping" | "pong", listener: (data: Buffer) => void): this;
  addListener(event: "redirect", listener: (url: string, request: ClientRequest) => void): this;
  addListener(event: "unexpected-response", listener: (request: ClientRequest, response: IncomingMessage) => void): this;
  addListener(event: string | symbol, listener: (...args: any[]) => void): this;
  removeListener(event: "close", listener: (code: number, reason: Buffer) => void): this;
  removeListener(event: "error", listener: (error: Error) => void): this;
  removeListener(event: "upgrade", listener: (request: IncomingMessage) => void): this;
  removeListener(event: "message", listener: (data: WebSocket.RawData, isBinary: boolean) => void): this;
  removeListener(event: "open", listener: () => void): this;
  removeListener(event: "ping" | "pong", listener: (data: Buffer) => void): this;
  removeListener(event: "redirect", listener: (url: string, request: ClientRequest) => void): this;
  removeListener(event: "unexpected-response", listener: (request: ClientRequest, response: IncomingMessage) => void): this;
  removeListener(event: string | symbol, listener: (...args: any[]) => void): this;
}
declare namespace WebSocket {
  /**
   * Data represents the raw message payload received over the WebSocket.
   */
  type RawData = Buffer | ArrayBuffer | Buffer[];
  /**
   * Data represents the message payload received over the WebSocket.
   */
  type Data = string | Buffer | ArrayBuffer | Buffer[];
  /**
   * CertMeta represents the accepted types for certificate & key data.
   */
  type CertMeta = string | string[] | Buffer | Buffer[];
  /**
   * VerifyClientCallbackSync is a synchronous callback used to inspect the
   * incoming message. The return value (boolean) of the function determines
   * whether or not to accept the handshake.
   */
  type VerifyClientCallbackSync<Request extends IncomingMessage = IncomingMessage> = (info: {
    origin: string;
    secure: boolean;
    req: Request;
  }) => boolean;
  /**
   * VerifyClientCallbackAsync is an asynchronous callback used to inspect the
   * incoming message. The return value (boolean) of the function determines
   * whether or not to accept the handshake.
   */
  type VerifyClientCallbackAsync<Request extends IncomingMessage = IncomingMessage> = (info: {
    origin: string;
    secure: boolean;
    req: Request;
  }, callback: (res: boolean, code?: number, message?: string, headers?: OutgoingHttpHeaders) => void) => void;
  /**
   * FinishRequestCallback is a callback for last minute customization of the
   * headers. If finishRequest is set, then it has the responsibility to call
   * request.end() once it is done setting request headers.
   */
  type FinishRequestCallback = (request: ClientRequest, websocket: WebSocket) => void;
  interface ClientOptions extends SecureContextOptions {
    protocol?: string | undefined;
    followRedirects?: boolean | undefined;
    generateMask?(mask: Buffer): void;
    handshakeTimeout?: number | undefined;
    maxRedirects?: number | undefined;
    perMessageDeflate?: boolean | PerMessageDeflateOptions | undefined;
    localAddress?: string | undefined;
    protocolVersion?: number | undefined;
    headers?: {
      [key: string]: string;
    } | undefined;
    origin?: string | undefined;
    agent?: Agent | undefined;
    host?: string | undefined;
    family?: number | undefined;
    checkServerIdentity?(servername: string, cert: CertMeta): boolean;
    rejectUnauthorized?: boolean | undefined;
    allowSynchronousEvents?: boolean | undefined;
    autoPong?: boolean | undefined;
    maxPayload?: number | undefined;
    skipUTF8Validation?: boolean | undefined;
    createConnection?: typeof createConnection | undefined;
    finishRequest?: FinishRequestCallback | undefined;
  }
  interface PerMessageDeflateOptions {
    serverNoContextTakeover?: boolean | undefined;
    clientNoContextTakeover?: boolean | undefined;
    serverMaxWindowBits?: number | undefined;
    clientMaxWindowBits?: number | undefined;
    zlibDeflateOptions?: {
      flush?: number | undefined;
      finishFlush?: number | undefined;
      chunkSize?: number | undefined;
      windowBits?: number | undefined;
      level?: number | undefined;
      memLevel?: number | undefined;
      strategy?: number | undefined;
      dictionary?: Buffer | Buffer[] | DataView | undefined;
      info?: boolean | undefined;
    } | undefined;
    zlibInflateOptions?: ZlibOptions | undefined;
    threshold?: number | undefined;
    concurrencyLimit?: number | undefined;
  }
  interface Event {
    type: string;
    target: WebSocket;
  }
  interface ErrorEvent {
    error: any;
    message: string;
    type: string;
    target: WebSocket;
  }
  interface CloseEvent {
    wasClean: boolean;
    code: number;
    reason: string;
    type: string;
    target: WebSocket;
  }
  interface MessageEvent {
    data: Data;
    type: string;
    target: WebSocket;
  }
  interface WebSocketEventMap {
    open: Event;
    error: ErrorEvent;
    close: CloseEvent;
    message: MessageEvent;
  }
  interface EventListenerOptions {
    once?: boolean | undefined;
  }
  interface ServerOptions<U extends typeof WebSocket = typeof WebSocket, V extends typeof IncomingMessage = typeof IncomingMessage> {
    host?: string | undefined;
    port?: number | undefined;
    backlog?: number | undefined;
    server?: Server<V> | Server$1<V> | undefined;
    verifyClient?: VerifyClientCallbackAsync<InstanceType<V>> | VerifyClientCallbackSync<InstanceType<V>> | undefined;
    handleProtocols?: (protocols: Set<string>, request: InstanceType<V>) => string | false;
    path?: string | undefined;
    noServer?: boolean | undefined;
    allowSynchronousEvents?: boolean | undefined;
    autoPong?: boolean | undefined;
    clientTracking?: boolean | undefined;
    perMessageDeflate?: boolean | PerMessageDeflateOptions | undefined;
    maxPayload?: number | undefined;
    skipUTF8Validation?: boolean | undefined;
    WebSocket?: U | undefined;
  }
  interface AddressInfo {
    address: string;
    family: string;
    port: number;
  }
}
//#endregion
//#region ../../node_modules/.pnpm/node-karin@1.15.5/node_modules/node-karin/dist/index.d.ts
/**
 * 适配器所属平台
 * - `qq`: QQ
 * - `wechat`: 微信
 * - `wecom`: 企业微信
 * - `telegram`: Telegram
 * - `discord`: Discord
 * - `koko`: 开黑吧
 * - `dingtalk`: 钉钉
 * - `feishu`: 飞书
 * - `slack`: Slack
 * - `whatsapp`: WhatsApp
 * - `other`: 其他
 */
type AdapterPlatform = 'qq' | 'wechat' | 'telegram' | 'discord' | 'koko' | 'dingtalk' | 'feishu' | 'slack' | 'wecom' | 'whatsapp' | 'other' | (string & {});
/**
 * 适配器所使用的标准接口协议
 * - `onebot11`: OneBot v11 标准
 * - `onebot12`: OneBot v12 标准
 * - `oicq`: OICQ 标准
 * - `icqq`: OICQ fork 标准
 * - `milky`: Milky 标准
 * - `satori`: Satori 标准
 * - `other`: 其他标准
 */
type AdapterStandard = 'onebot11' | 'onebot12' | 'oicq' | 'icqq' | 'milky' | 'satori' | 'other' | (string & {});
/**
 * 适配器协议实现名称
 * - `console`: 控制台
 * - `qqbot`: https://bot.q.qq.com/wiki
 * - `icqq`: https://github.com/icqqjs/icqq
 * - `gocq-http`: https://docs.go-cqhttp.org/
 * - `napcat`: https://napneko.github.io/zh-CN/
 * - `oicq`: https://github.com/takayama-lily/oicq
 * - `llonebot`: https://llonebot.github.io/zh-CN/
 * - `conwechat`: https://justundertaker.github.io/ComWeChatBotClient/
 * - `lagrange`: https://lagrangedev.github.io/Lagrange.Doc/Lagrange.OneBot/
 * - `yogurt`: https://acidify.ntqqrev.org/
 */
type AdapterProtocol = 'qqbot' | 'icqq' | 'gocq-http' | 'napcat' | 'oicq' | 'llonebot' | 'conwechat' | 'lagrange' | 'console' | 'yogurt' | 'other' | (string & {});
/**
 * 适配器通信方式
 * - `http`: HTTP 通信
 * - `webSocketServer`: WebSocket 服务端
 * - `webSocketClient`: WebSocket 客户端
 * - `grpc`: gRPC 通信
 * - `sse`: Server-Sent Events 通信
 * - `other`: 其他通信方式
 */
type AdapterCommunication = 'http' | 'webSocketServer' | 'webSocketClient' | 'grpc' | 'sse' | 'other' | (string & {});
/**
 * 适配器基本信息
 */
interface AdapterInfo$1 {
  /** 适配器索引 默认为-1 在注册适配器时会自动更改为对应的索引 */
  index: number;
  /** 适配器名称 如lagrange-onebot */
  name: string;
  /** 适配器版本 */
  version: string;
  /** 适配器平台 */
  platform: AdapterPlatform;
  /** 适配器使用的协议标准 如onebot11 */
  standard: AdapterStandard;
  /** 适配器协议实现 如gocq、napcat */
  protocol: AdapterProtocol;
  /** 适配器通信方式 */
  communication: AdapterCommunication;
  /**
   * 适配器通信地址
   * @example `http://127.0.0.1:7000`
   * @example `ws://127.0.0.1:7000/ws`
   * @example `grpc://127.0.0.1:7001`
   * @example `internal://127.0.0.1`
   */
  address: string;
  /** 连接时间 */
  connectTime: number;
  /** 鉴权秘钥 */
  secret: string | null;
}
/**
 * 适配器账号信息
 */
//#endregion
//#region ../template/src/types/platforms/other/handlerError.d.ts
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
type AdapterInfo = Omit<AdapterInfo$1, 'index' | 'secret' | 'connectTime' | 'address'>;
/**
 * API错误组件属性接口
 */
interface ApiErrorProps extends BaseComponentProps {
  /** 渲染请求数据 */
  data: {
    /** 是否使用深色主题 */useDarkTheme?: boolean; /** 错误类型 */
    type: 'business_error'; /** 平台名称 */
    platform: 'douyin' | 'bilibili' | 'kuaishou' | 'system' | 'unknown'; /** 错误信息 */
    error: BusinessError; /** 调用的方法名 */
    method: string; /** 错误发生时间 */
    timestamp: string; /** 收集到的日志信息 */
    logs?: LogEntry[]; /** 触发命令 */
    triggerCommand?: string; /** 框架版本 */
    frameworkVersion: string; /** 插件版本 */
    pluginVersion: string; /** 构建时间 */
    buildTime?: string; /** Commit ID */
    commitHash?: string; /** 适配器信息 */
    adapterInfo?: AdapterInfo; /** 是否为验证流程 */
    isVerification?: boolean; /** 验证链接 */
    verificationUrl?: string; /** 分享链接（用于生成二维码） */
    share_url?: string;
  };
  /** 分享链接二维码 */
  qrCodeDataUrl?: string;
}
//#endregion
//#region ../template/src/types/platforms/other/changelog.d.ts
/**
 * 更新日志组件属性接口
 */
interface ChangelogProps extends BaseComponentProps {
  /** 渲染请求数据 */
  data: {
    /** 是否包含更新提示 */Tip?: boolean; /** 后端传入的 Markdown 源码 */
    markdown: string; /** 本地版本号 */
    localVersion: string; /** 远程版本号 */
    remoteVersion: string; /** 落后的版本数量 */
    lagVersionCount?: number; /** 构建时间 */
    buildTime?: string; /** 版本差异对比页面分享链接 */
    share_url?: string;
  };
}
//#endregion
//#region ../template/src/types/platforms/other/VersionWarningProps.d.ts
interface VersionWarningProps extends BaseComponentProps {
  /** 插件构建时的 karin 版本 */
  requireVersion: string;
  /** 当前运行的 karin 版本 */
  currentVersion: string;
}
//#endregion
//#region ../template/src/types/platforms/other/qrlogin.d.ts
/** APP 扫码登录组件属性 */
interface QrLoginProps {
  data: {
    /** 服务器地址 */serverUrl: string; /** 分享链接（用于生成二维码） */
    share_url: string; /** 是否使用深色主题 */
    useDarkTheme?: boolean;
  };
  /** 二维码数据URL（由 createQrCodePlugin 自动生成，作为顶级 prop） */
  qrCodeDataUrl?: string;
  /** 是否使用深色主题 */
  useDarkTheme?: boolean;
}
//#endregion
//#region ../template/src/types/platforms/other/statistics.d.ts
/**
 * 群组解析统计数据接口
 */
interface GroupStatisticsProps extends BaseComponentProps {
  data: {
    /** 是否使用深色主题 */useDarkTheme?: boolean; /** 群组ID */
    groupId: string; /** 群组名称 */
    groupName?: string; /** 群组人数 */
    groupMemberCount?: number; /** 群组头像 */
    groupAvatar?: string; /** 群组总解析次数 */
    groupTotalParses: number; /** 群组唯一用户数 */
    groupUniqueUsers: number; /** 各平台解析数据 */
    platformData: {
      douyin: number;
      bilibili: number;
      kuaishou: number;
      xiaohongshu: number;
    }; /** 全局总群组数 */
    globalTotalGroups: number; /** 全局总解析次数 */
    globalTotalParses: number;
  };
}
/**
 * 全局解析统计数据接口
 */
interface GlobalStatisticsProps extends BaseComponentProps {
  data: {
    /** 是否使用深色主题 */useDarkTheme?: boolean; /** 所有统计数据 */
    allStats: Array<{
      id: number;
      groupId: string;
      userId: string;
      platform: 'douyin' | 'bilibili' | 'kuaishou' | 'xiaohongshu';
      parseCount: number;
      createdAt: string;
      updatedAt: string;
    }>; /** 历史数据（最近30天） */
    historyData: Array<{
      date: string;
      totalParses: number;
      douyin: number;
      bilibili: number;
      kuaishou: number;
      xiaohongshu: number;
    }>; /** 群组信息映射 */
    groupInfoMap: Record<string, {
      groupName?: string;
      groupAvatar?: string;
    }>;
  };
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
    /** 框架插件 */plugin: string; /** 插件名称 */
    pluginName: string; /** 插件版本 */
    pluginVersion: string; /** 发布类型 */
    releaseType: 'Stable' | 'Preview'; /** 驱动框架 */
    poweredBy: string; /** 框架版本 */
    frameworkVersion: string; /** 是否有可用更新 */
    hasUpdate?: boolean;
  };
  /** 渲染数据 */
  data: T & {
    /** 是否使用深色主题 */useDarkTheme?: boolean; /** 二维码分享链接 */
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
interface BaseComponentProps<T = Record<string, any>> extends Pick<RenderRequest, 'version' | 'scale'> {
  /** 渲染数据 - 子组件的具体参数 */
  data: {
    /** 是否使用深色主题 */useDarkTheme?: boolean;
  } & T;
}
/**
 * 抖音平台组件ID
 */
type DouyinComponentIds = 'article-work' | 'comment' | 'dynamic' | 'favorite-list' | 'image-work' | 'live' | 'musicinfo' | 'recommend-list' | 'user_profile' | 'userlist' | 'video-work' | 'videoInfo' | 'user_videolist' | 'qrcodeImg';
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
type OtherComponentIds = 'help' | 'handlerError' | 'changelog' | 'version_warning' | 'qrlogin';
/**
 * 统计平台组件ID
 */
type StatisticsComponentIds = 'group' | 'global';
/**
 * 路径类型
 */
type DynamicRenderPath = `douyin/${DouyinComponentIds}` | `bilibili/${BilibiliComponentIds}` | `kuaishou/${KuaishouComponentIds}` | `xiaohongshu/${XiaohongshuComponentIds}` | `other/${OtherComponentIds}` | `statistics/${StatisticsComponentIds}`;
/**
 * 路径到数据类型的精确映射接口
 */
interface PathToDataTypeMap {
  'douyin/comment': DouyinCommentProps['data'];
  'douyin/dynamic': DouyinDynamicProps['data'];
  'douyin/favorite-list': DouyinFavoriteListProps['data'];
  'douyin/image-work': DouyinImageWorkProps['data'];
  'douyin/article-work': DouyinArticleWorkProps['data'];
  'douyin/live': DouyinLiveProps['data'];
  'douyin/musicinfo': DouyinMusicInfoProps['data'];
  'douyin/recommend-list': DouyinRecommendListProps['data'];
  'douyin/user_profile': DouyinUserVideoListProps['data'];
  'douyin/userlist': DouyinUserListProps['data'];
  'douyin/video-work': DouyinVideoWorkProps['data'];
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
  'bilibili/dynamic/DYNAMIC_TYPE_WORD': BilibiliWordDynamicProps['data'];
  'kuaishou/comment': KuaishouCommentProps['data'];
  'xiaohongshu/noteInfo': XiaohongshuNoteInfoProps['data'];
  'xiaohongshu/comment': XiaohongshuCommentProps['data'];
  'other/help': HelpProps['data'];
  'other/handlerError': ApiErrorProps['data'];
  'other/changelog': ChangelogProps['data'];
  'other/version_warning': VersionWarningProps['data'];
  'other/qrlogin': QrLoginProps['data'];
  'statistics/group': GroupStatisticsProps['data'];
  'statistics/global': GlobalStatisticsProps['data'];
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
  douyin: DouyinCommentProps['data'] | DouyinDynamicProps['data'] | DouyinFavoriteListProps['data'] | DouyinLiveProps['data'] | DouyinMusicInfoProps['data'] | DouyinQrcodeImgProps['data'] | DouyinRecommendListProps['data'] | DouyinUserVideoListProps['data'];
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
  private isDevelopment;
  constructor();
  /**
   * 获取包目录路径
   * @returns 包目录的绝对路径
   */
  private getPackageDir;
  /**
   * 查找开发环境目录
   * @param cwd 当前工作目录
   * @returns 开发环境目录路径，如果找不到返回 null
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
   * 统一处理开发和生产环境的资源路径
   * @returns 静态资源路径配置对象
   */
  getResourcePaths(): {
    cssDir: string;
    imageDir: string;
  };
  /**
   * 获取所有可能的资源路径
   * @returns 可能的 CSS 和图片路径列表
   */
  private getPossibleResourcePaths;
  /**
   * 从当前模块路径向上查找 karin-plugin-kkk 包
   * @returns karin-plugin-kkk 包的路径，如果找不到返回 null
   */
  private findKarinPluginKkkPackage;
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
type VideoPreviewRenderOptions = {
  filename: string;
  filePath: string;
  videoUrl: string;
  removeCache: boolean;
  createdAt: number;
  expireAt?: number;
  eventsUrl?: string;
};
declare const renderVideoPreviewPage: (options: VideoPreviewRenderOptions) => string;
//#endregion
export { BaseComponentProps, type DataTypeMap, DynamicRenderPath, ExtractDataTypeFromPath, type Plugin, type PluginContext, type PluginFactory, QRCodeSectionProps, type ReactServerRenderOptions, RenderRequest, RenderResponse, type TypedRenderRequest, reactServerRender as default, reactServerRender, renderVideoPreviewPage };