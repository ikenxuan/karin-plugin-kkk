import { join, basename } from 'node:path';
import { Config, Version, Common } from '../../module/index.js';
import { render, segment } from 'node-karin';
function scale(pct = 1) {
    const scale = Math.min(2, Math.max(0.5, Number(Config.app.renderScale) / 100));
    pct = pct * scale;
    return `style=transform:scale(${pct})`;
}
async function gitstatus() {
    const status = await Version.checkCommitIdAndUpdateStatus(Version.pluginPath);
    if (status.latest) {
        return ` SHA: <span class="version">${status.currentCommitId}</span>`;
    }
    else {
        return ` SHA: <span class="version">${status.currentCommitId}</span> <span class="tip">(有新版本: ${status.remoteCommitId})</span>`;
    }
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
    let ret = [];
    for (const imgae of img) {
        ret.push(segment.image(imgae));
    }
    return ret;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVuZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21vZHVsZS91dGlscy9SZW5kZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsTUFBTSxXQUFXLENBQUE7QUFDMUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sVUFBVSxDQUFBO0FBQ2xELE9BQU8sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFpQyxNQUFNLFlBQVksQ0FBQTtBQUUzRSxTQUFTLEtBQUssQ0FBRSxHQUFHLEdBQUcsQ0FBQztJQUNyQixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFBO0lBQzlFLEdBQUcsR0FBRyxHQUFHLEdBQUcsS0FBSyxDQUFBO0lBQ2pCLE9BQU8seUJBQXlCLEdBQUcsR0FBRyxDQUFBO0FBQ3hDLENBQUM7QUFFRCxLQUFLLFVBQVUsU0FBUztJQUN0QixNQUFNLE1BQU0sR0FBRyxNQUFNLE9BQU8sQ0FBQyw0QkFBNEIsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUE7SUFDN0UsSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDbEIsT0FBTywrQkFBK0IsTUFBTSxDQUFDLGVBQWUsU0FBUyxDQUFBO0lBQ3ZFLENBQUM7U0FBTSxDQUFDO1FBQ04sT0FBTywrQkFBK0IsTUFBTSxDQUFDLGVBQWUsb0NBQW9DLE1BQU0sQ0FBQyxjQUFjLFVBQVUsQ0FBQTtJQUNqSSxDQUFDO0FBQ0gsQ0FBQztBQUVEOzs7OztHQUtHO0FBQ0gsTUFBTSxDQUFDLEtBQUssVUFBVSxNQUFNLENBQUUsSUFBWSxFQUFFLE1BQVk7SUFDdEQsTUFBTSxTQUFTLEdBQTJCO1FBQ3hDLE1BQU0sRUFBRSxhQUFhO1FBQ3JCLFFBQVEsRUFBRSxlQUFlO1FBQ3pCLEtBQUssRUFBRSxZQUFZO1FBQ25CLFFBQVEsRUFBRSxlQUFlO1FBQ3pCLElBQUksRUFBRSxXQUFXO0tBQ2xCLENBQUE7SUFDRCxNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUUsQ0FBQTtJQUMxRSxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUM3QywwQkFBMEI7SUFDMUIsSUFBSSxPQUFPLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7UUFDNUIsT0FBTyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDaEMsQ0FBQztJQUNELElBQUksR0FBRyxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxPQUFPLEVBQUUsQ0FBQTtJQUMxQyxNQUFNLFNBQVMsR0FBb0I7UUFDakMsY0FBYyxFQUFFO1lBQ2QsU0FBUyxFQUFFLE1BQU07U0FDbEI7UUFDRCxJQUFJLEVBQUUsR0FBRyxPQUFPLENBQUMsVUFBVSxJQUFJLFFBQVEsSUFBSSxPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQztRQUN6RSxJQUFJLEVBQUUsR0FBRyxPQUFPLENBQUMsVUFBVSx1QkFBdUIsSUFBSSxPQUFPO1FBQzdELHVEQUF1RDtRQUN2RCxNQUFNLEVBQUUsUUFBUSxDQUFDLE9BQU8sQ0FBQztRQUN6QixJQUFJLEVBQUUsTUFBTTtRQUNaLFNBQVMsRUFBRSxLQUFLO0tBQ2pCLENBQUE7SUFFRCxNQUFNLEdBQUcsR0FBRyxNQUFNLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDOUIsR0FBRyxTQUFTO1FBQ1osSUFBSSxFQUFFO1lBQ0osR0FBRyxNQUFNO1lBQ1QsU0FBUyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUM7WUFDN0UsWUFBWSxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxRQUFRLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQztZQUN0RyxhQUFhLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsR0FBRyxlQUFlLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQztZQUMzSCxHQUFHLEVBQUU7Z0JBQ0gsS0FBSyxFQUFFLEtBQUssQ0FBQyxNQUFNLEVBQUUsS0FBSyxJQUFJLENBQUMsQ0FBQzthQUNqQztZQUNELFVBQVUsRUFBRSxHQUFHLE9BQU8sQ0FBQyxVQUFVLGFBQWE7WUFDOUMsU0FBUyxFQUFFLHNEQUFzRCxPQUFPLENBQUMsYUFBYSw0REFBNEQ7WUFDbEosWUFBWSxFQUFFLE1BQU0sQ0FBQyxZQUFZLEVBQUU7U0FDcEM7UUFDRCxXQUFXLEVBQUUsWUFBWTtLQUMxQixDQUFDLENBQUE7SUFDRixjQUFjO0lBQ2QsSUFBSSxHQUFHLEdBQW1CLEVBQUUsQ0FBQTtJQUM1QixLQUFLLE1BQU0sS0FBSyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ3hCLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFBO0lBQ2hDLENBQUM7SUFDRCxPQUFPLEdBQUcsQ0FBQTtBQUNaLENBQUMifQ==