import { basename, join } from 'node:path';
import { render, segment } from 'node-karin';
import { Common, Config, Version } from '../../module/index.js';
function scale(pct = 1) {
    const scale = Math.min(2, Math.max(0.5, Number(Config.app.renderScale) / 100));
    pct = pct * scale;
    return `style=transform:scale(${pct})`;
}
/**
 *
 * @param {string} path html模板路径
 * @param {*} params 模板参数
 * @returns
 */
export async function Render(path, params) {
    const basePaths = {
        douyin: 'douyin/html',
        bilibili: 'bilibili/html',
        admin: 'admin/html',
        kuaishou: 'kuaishou/html',
        help: 'help/html'
    };
    const platform = Object.keys(basePaths).find(key => path.startsWith(key));
    let newPath = path.substring(platform.length);
    // 如果 newPath 以斜杠开头，去掉这个斜杠
    if (newPath.startsWith('/')) {
        newPath = newPath.substring(1);
    }
    path = `${basePaths[platform]}/${newPath}`;
    const renderOpt = {
        pageGotoParams: {
            waitUntil: 'load'
        },
        name: `${Version.pluginName}/${platform}/${newPath}/`.replace(/\\/g, '/'),
        file: `${Version.pluginPath}/resources/template/${path}.html`,
        // 这里是模板引擎渲染完成之后生成的html文件名称 如果这里不传递会默认使用name作为默认值 建议传递。
        fileID: basename(newPath),
        type: 'jpeg',
        multiPage: 12000
    };
    const img = await render.render({
        ...renderOpt,
        data: {
            ...params,
            _res_path: (join(Version.pluginPath, '/resources') + '/').replace(/\\/g, '/'),
            _layout_path: (join(Version.pluginPath, '/resources', 'template', 'extend') + '/').replace(/\\/g, '/'),
            defaultLayout: (join(Version.pluginPath, '/resources', 'template', 'extend', 'html') + '/default.html').replace(/\\/g, '/'),
            sys: {
                scale: scale(params?.scale || 1)
            },
            pluResPath: `${Version.pluginPath}/resources/`,
            copyright: `<span class="name">kkk</span><span class="version">${Version.pluginVersion} Preview</span> Powered By <span class="name">Karin</span>`,
            useDarkTheme: Common.useDarkTheme()
        },
        screensEval: '#container'
    });
    // 分片截图传回来的是数组
    const ret = [];
    for (const imgae of img) {
        ret.push(segment.image(imgae));
    }
    return ret;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVuZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21vZHVsZS91dGlscy9SZW5kZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsTUFBTSxXQUFXLENBQUE7QUFFMUMsT0FBTyxFQUFpQyxNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU0sWUFBWSxDQUFBO0FBRTNFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUVsRCxTQUFTLEtBQUssQ0FBRSxHQUFHLEdBQUcsQ0FBQztJQUNyQixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFBO0lBQzlFLEdBQUcsR0FBRyxHQUFHLEdBQUcsS0FBSyxDQUFBO0lBQ2pCLE9BQU8seUJBQXlCLEdBQUcsR0FBRyxDQUFBO0FBQ3hDLENBQUM7QUFFRDs7Ozs7R0FLRztBQUNILE1BQU0sQ0FBQyxLQUFLLFVBQVUsTUFBTSxDQUFFLElBQVksRUFBRSxNQUFZO0lBQ3RELE1BQU0sU0FBUyxHQUEyQjtRQUN4QyxNQUFNLEVBQUUsYUFBYTtRQUNyQixRQUFRLEVBQUUsZUFBZTtRQUN6QixLQUFLLEVBQUUsWUFBWTtRQUNuQixRQUFRLEVBQUUsZUFBZTtRQUN6QixJQUFJLEVBQUUsV0FBVztLQUNsQixDQUFBO0lBQ0QsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFFLENBQUE7SUFDMUUsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDN0MsMEJBQTBCO0lBQzFCLElBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO1FBQzVCLE9BQU8sR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ2hDLENBQUM7SUFDRCxJQUFJLEdBQUcsR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksT0FBTyxFQUFFLENBQUE7SUFDMUMsTUFBTSxTQUFTLEdBQW9CO1FBQ2pDLGNBQWMsRUFBRTtZQUNkLFNBQVMsRUFBRSxNQUFNO1NBQ2xCO1FBQ0QsSUFBSSxFQUFFLEdBQUcsT0FBTyxDQUFDLFVBQVUsSUFBSSxRQUFRLElBQUksT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUM7UUFDekUsSUFBSSxFQUFFLEdBQUcsT0FBTyxDQUFDLFVBQVUsdUJBQXVCLElBQUksT0FBTztRQUM3RCx1REFBdUQ7UUFDdkQsTUFBTSxFQUFFLFFBQVEsQ0FBQyxPQUFPLENBQUM7UUFDekIsSUFBSSxFQUFFLE1BQU07UUFDWixTQUFTLEVBQUUsS0FBSztLQUNqQixDQUFBO0lBRUQsTUFBTSxHQUFHLEdBQUcsTUFBTSxNQUFNLENBQUMsTUFBTSxDQUFDO1FBQzlCLEdBQUcsU0FBUztRQUNaLElBQUksRUFBRTtZQUNKLEdBQUcsTUFBTTtZQUNULFNBQVMsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLFlBQVksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO1lBQzdFLFlBQVksRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsUUFBUSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUM7WUFDdEcsYUFBYSxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLEdBQUcsZUFBZSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUM7WUFDM0gsR0FBRyxFQUFFO2dCQUNILEtBQUssRUFBRSxLQUFLLENBQUMsTUFBTSxFQUFFLEtBQUssSUFBSSxDQUFDLENBQUM7YUFDakM7WUFDRCxVQUFVLEVBQUUsR0FBRyxPQUFPLENBQUMsVUFBVSxhQUFhO1lBQzlDLFNBQVMsRUFBRSxzREFBc0QsT0FBTyxDQUFDLGFBQWEsNERBQTREO1lBQ2xKLFlBQVksRUFBRSxNQUFNLENBQUMsWUFBWSxFQUFFO1NBQ3BDO1FBQ0QsV0FBVyxFQUFFLFlBQVk7S0FDMUIsQ0FBQyxDQUFBO0lBQ0YsY0FBYztJQUNkLE1BQU0sR0FBRyxHQUFtQixFQUFFLENBQUE7SUFDOUIsS0FBSyxNQUFNLEtBQUssSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUN4QixHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQTtJQUNoQyxDQUFDO0lBQ0QsT0FBTyxHQUFHLENBQUE7QUFDWixDQUFDIn0=