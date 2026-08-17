//#region ktr/template/_preview/render.d.ts
type VideoPreviewRenderOptions = {
  filename: string;
  filePath: string;
  videoUrl: string;
  removeCache: boolean;
  createdAt: number;
  expireAt?: number;
  eventsUrl?: string;
};
/**
 * 渲染临时视频预览页 HTML（/kkk/ssr/video/* 使用）。
 * 逻辑与旧引擎 main.ts 中的实现一致，仅 CSS 来源换成 ktr 构建的 style.css。
 */
declare const renderVideoPreviewPage: (options: VideoPreviewRenderOptions) => string;
//#endregion
export { type VideoPreviewRenderOptions, renderVideoPreviewPage };