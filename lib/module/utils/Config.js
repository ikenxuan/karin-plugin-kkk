import fs from 'node:fs';
import chokidar from 'chokidar';
import { logger } from 'node-karin';
import YAML from 'yaml';
import { Version } from './Version.js';
class config {
    config = {};
    watcher = { config: {}, defSet: {} };
    constructor() {
        this.initCfg();
    }
    /** 初始化配置 */
    initCfg() {
        const path = `${Version.karinPath}/config/plugin/${Version.pluginName}/`;
        if (!fs.existsSync(path))
            fs.mkdirSync(path);
        const pathDef = `${Version.pluginPath}/config/default_config/`;
        const files = fs.readdirSync(pathDef).filter(file => file.endsWith('.yaml'));
        for (const file of files) {
            if (!fs.existsSync(`${path}${file}`)) {
                fs.copyFileSync(`${pathDef}${file}`, `${path}${file}`);
            }
            else {
                const config = YAML.parseDocument(fs.readFileSync(`${path}${file}`, 'utf8'));
                const defConfig = YAML.parseDocument(fs.readFileSync(`${pathDef}${file}`, 'utf8'));
                const { differences, result } = this.mergeObjectsWithPriority(config, defConfig);
                if (differences) {
                    fs.writeFileSync(`${path}${file}`, result.toString());
                }
            }
            this.watch(`${path}${file}`, file.replace('.yaml', ''), 'config');
        }
    }
    /** 插件相关配置 */
    get app() {
        return this.getDefOrConfig('app');
    }
    /** ck相关配置 */
    get cookies() {
        return this.getDefOrConfig('cookies');
    }
    /** 抖音相关配置 */
    get douyin() {
        return this.getDefOrConfig('douyin');
    }
    /** B站相关配置 */
    get bilibili() {
        return this.getDefOrConfig('bilibili');
    }
    /** 推送列表 */
    get pushlist() {
        return this.getDefOrConfig('pushlist');
    }
    /** 上传相关配置 */
    get upload() {
        return this.getDefOrConfig('upload');
    }
    /** 快手相关配置 */
    get kuaishou() {
        return this.getDefOrConfig('kuaishou');
    }
    All() {
        return {
            cookies: this.cookies,
            app: this.app,
            douyin: this.douyin,
            bilibili: this.bilibili,
            pushlist: this.pushlist,
            upload: this.upload,
            kuaishou: this.kuaishou
        };
    }
    /** 默认配置和用户配置 */
    getDefOrConfig(name) {
        const def = this.getdefSet(name);
        const config = this.getConfig(name);
        return { ...def, ...config };
    }
    /** 默认配置 */
    getdefSet(name) {
        return this.getYaml('default_config', name);
    }
    /** 用户配置 */
    getConfig(name) {
        return this.getYaml('config', name);
    }
    /**
     * 获取配置yaml
     * @param type 默认跑配置-defSet，用户配置-config
     * @param name 名称
     */
    getYaml(type, name) {
        let file = '';
        if (type === 'config') {
            file = `${Version.karinPath}/config/plugin/${Version.pluginName}/${name}.yaml`;
        }
        else {
            file = `${Version.pluginPath}/config/default_config/${name}.yaml`;
        }
        const key = `${type}.${name}`;
        if (this.config[key])
            return this.config[key];
        this.config[key] = YAML.parse(fs.readFileSync(file, 'utf8'));
        this.watch(file, name, type);
        return this.config[key];
    }
    /** 监听配置文件 */
    watch(file, name, type = 'default_config') {
        const key = `${type}.${name}`;
        if (this.watcher[key])
            return;
        const watcher = chokidar.watch(file);
        watcher.on('change', () => {
            delete this.config[key];
            logger.mark(`[${Version.pluginName}][修改配置文件][${type}][${name}]`);
        });
        this.watcher[key] = watcher;
    }
    /**
     * 修改设置
     * @param name 文件名
     * @param key 修改的key值
     * @param value 修改的value值
     * @param type 配置文件或默认
     */
    modify(name, key, value, type = 'config') {
        let path = '';
        if (type === 'config') {
            path = `${Version.karinPath}/config/plugin/${Version.pluginName}/${name}.yaml`;
        }
        else {
            path = `${Version.pluginPath}/config/default_config/${name}.yaml`;
        }
        // 读取 YAML 文件
        const yamlData = YAML.parseDocument(fs.readFileSync(path, 'utf8'));
        // 处理嵌套路径
        const keys = key.split('.');
        let current = yamlData.contents;
        // 遍历键并确保每个子键都有对应的结构
        for (let i = 0; i < keys.length - 1; i++) {
            const subKey = keys[i];
            if (current instanceof YAML.YAMLMap) {
                let subValue = current.get(subKey);
                // 类型保护，确保 subValue 是 YAMLMap
                if (!YAML.isMap(subValue)) {
                    subValue = new YAML.YAMLMap(); // 创建新的 YAMLMap
                    current.set(subKey, subValue); // 设置新的子值
                }
                current = subValue; // 更新 current 为子结构
            }
            else {
                throw new Error(`Invalid YAML structure: ${subKey} is not a YAMLMap.`);
            }
        }
        // 设置最终值
        if (current instanceof YAML.YAMLMap) {
            current.set(keys[keys.length - 1], value);
        }
        else {
            throw new Error('Invalid YAML structure: Unable to set value.');
        }
        // 写回 YAML 文件并保留注释
        fs.writeFileSync(path, yamlData.toString(), 'utf8');
        // 删除缓存
        delete this.config[`${type}.${name}`];
    }
    mergeObjectsWithPriority(userDoc, defaultDoc) {
        let differences = false;
        // 合并 YAML 对象，确保注释保留
        function mergeYamlNodes(target, source) {
            if (YAML.isMap(target) && YAML.isMap(source)) {
                // 遍历 source 中的每一项，合并到 target 中
                for (const pair of source.items) {
                    const key = pair.key;
                    const value = pair.value;
                    // 查找现有的键
                    const existing = target.get(key);
                    // 如果目标中没有该键，则添加新的键值对
                    if (existing === undefined) {
                        differences = true;
                        target.set(key, value);
                    }
                    else if (YAML.isMap(value) && YAML.isMap(existing)) {
                        // 如果值是一个嵌套的 Map 类型，则递归合并
                        mergeYamlNodes(existing, value);
                    }
                    else if (existing !== value) {
                        // 如果值不同，进行覆盖
                        differences = true;
                        target.set(key, value);
                    }
                }
            }
        }
        // 执行合并操作
        mergeYamlNodes(defaultDoc.contents, userDoc.contents);
        return { differences, result: defaultDoc };
    }
}
/**
 * YamlReader类提供了对YAML文件的动态读写功能
 */
class YamlReader {
    filePath;
    document;
    constructor(filePath) {
        this.filePath = filePath;
        this.document = this.parseDocument();
    }
    parseDocument() {
        const fileContent = fs.readFileSync(this.filePath, 'utf8');
        return YAML.parseDocument(fileContent);
    }
    set(key, value) {
        this.document.set(key, value);
        this.write();
    }
    rm(key) {
        this.document.delete(key);
        this.write();
    }
    write() {
        fs.writeFileSync(this.filePath, this.document.toString({
            lineWidth: -1,
            simpleKeys: true
        }), 'utf8');
    }
}
export const Config = new config();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21vZHVsZS91dGlscy9Db25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sU0FBUyxDQUFBO0FBRXhCLE9BQU8sUUFBdUIsTUFBTSxVQUFVLENBQUE7QUFFOUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFlBQVksQ0FBQTtBQUNuQyxPQUFPLElBQUksTUFBTSxNQUFNLENBQUE7QUFJdkIsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLFdBQVcsQ0FBQTtBQUluQyxNQUFNLE1BQU07SUFDRixNQUFNLEdBQXdCLEVBQUUsQ0FBQTtJQUNoQyxPQUFPLEdBQThCLEVBQUUsTUFBTSxFQUFFLEVBQWUsRUFBRSxNQUFNLEVBQUUsRUFBZSxFQUFFLENBQUE7SUFFakc7UUFDRSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUE7SUFDaEIsQ0FBQztJQUVELFlBQVk7SUFDSixPQUFPO1FBQ2IsTUFBTSxJQUFJLEdBQUcsR0FBRyxPQUFPLENBQUMsU0FBUyxrQkFBa0IsT0FBTyxDQUFDLFVBQVUsR0FBRyxDQUFBO1FBQ3hFLElBQUksQ0FBRSxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQztZQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDN0MsTUFBTSxPQUFPLEdBQUcsR0FBRyxPQUFPLENBQUMsVUFBVSx5QkFBeUIsQ0FBQTtRQUM5RCxNQUFNLEtBQUssR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQTtRQUM1RSxLQUFLLE1BQU0sSUFBSSxJQUFJLEtBQUssRUFBRSxDQUFDO1lBQ3pCLElBQUksQ0FBRSxFQUFFLENBQUMsVUFBVSxDQUFDLEdBQUcsSUFBSSxHQUFHLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQztnQkFDdEMsRUFBRSxDQUFDLFlBQVksQ0FBQyxHQUFHLE9BQU8sR0FBRyxJQUFJLEVBQUUsRUFBRSxHQUFHLElBQUksR0FBRyxJQUFJLEVBQUUsQ0FBQyxDQUFBO1lBQ3hELENBQUM7aUJBQU0sQ0FBQztnQkFDTixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsR0FBRyxJQUFJLEdBQUcsSUFBSSxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQTtnQkFDNUUsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLEdBQUcsT0FBTyxHQUFHLElBQUksRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUE7Z0JBQ2xGLE1BQU0sRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQTtnQkFDaEYsSUFBSSxXQUFXLEVBQUUsQ0FBQztvQkFDaEIsRUFBRSxDQUFDLGFBQWEsQ0FBQyxHQUFHLElBQUksR0FBRyxJQUFJLEVBQUUsRUFBRSxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQTtnQkFDdkQsQ0FBQztZQUNILENBQUM7WUFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxHQUFHLElBQUksRUFBRSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFBO1FBQ25FLENBQUM7SUFDSCxDQUFDO0lBRUQsYUFBYTtJQUNiLElBQUksR0FBRztRQUNMLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUNuQyxDQUFDO0lBRUQsYUFBYTtJQUNiLElBQUksT0FBTztRQUNULE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUN2QyxDQUFDO0lBRUQsYUFBYTtJQUNiLElBQUksTUFBTTtRQUNSLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUN0QyxDQUFDO0lBRUQsYUFBYTtJQUNiLElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQTtJQUN4QyxDQUFDO0lBRUQsV0FBVztJQUNYLElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQTtJQUN4QyxDQUFDO0lBRUQsYUFBYTtJQUNiLElBQUksTUFBTTtRQUNSLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUN0QyxDQUFDO0lBRUQsYUFBYTtJQUNiLElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQTtJQUN4QyxDQUFDO0lBR0QsR0FBRztRQUNELE9BQU87WUFDTCxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87WUFDckIsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHO1lBQ2IsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1lBQ25CLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN2QixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDdkIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1lBQ25CLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtTQUN4QixDQUFBO0lBQ0gsQ0FBQztJQUVELGdCQUFnQjtJQUNSLGNBQWMsQ0FBRSxJQUFZO1FBQ2xDLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDaEMsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUNuQyxPQUFPLEVBQUUsR0FBRyxHQUFHLEVBQUUsR0FBRyxNQUFNLEVBQUUsQ0FBQTtJQUM5QixDQUFDO0lBRUQsV0FBVztJQUNILFNBQVMsQ0FBRSxJQUFZO1FBQzdCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsQ0FBQTtJQUM3QyxDQUFDO0lBRUQsV0FBVztJQUNILFNBQVMsQ0FBRSxJQUFZO1FBQzdCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUE7SUFDckMsQ0FBQztJQUVEOzs7O09BSUc7SUFDSyxPQUFPLENBQUUsSUFBbUIsRUFBRSxJQUFZO1FBQ2hELElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQTtRQUNiLElBQUksSUFBSSxLQUFLLFFBQVEsRUFBRSxDQUFDO1lBQ3RCLElBQUksR0FBRyxHQUFHLE9BQU8sQ0FBQyxTQUFTLGtCQUFrQixPQUFPLENBQUMsVUFBVSxJQUFJLElBQUksT0FBTyxDQUFBO1FBQ2hGLENBQUM7YUFBTSxDQUFDO1lBQUMsSUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDLFVBQVUsMEJBQTBCLElBQUksT0FBTyxDQUFBO1FBQUMsQ0FBQztRQUU1RSxNQUFNLEdBQUcsR0FBRyxHQUFHLElBQUksSUFBSSxJQUFJLEVBQUUsQ0FBQTtRQUU3QixJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDO1lBQUUsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBRTdDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FDM0IsRUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQzlCLENBQUE7UUFFRCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUE7UUFFNUIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ3pCLENBQUM7SUFFRCxhQUFhO0lBQ0wsS0FBSyxDQUFFLElBQVksRUFBRSxJQUFZLEVBQUUsT0FBc0IsZ0JBQWdCO1FBQy9FLE1BQU0sR0FBRyxHQUFHLEdBQUcsSUFBSSxJQUFJLElBQUksRUFBRSxDQUFBO1FBQzdCLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7WUFBRSxPQUFNO1FBRTdCLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDcEMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFO1lBQ3hCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUN2QixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksT0FBTyxDQUFDLFVBQVUsYUFBYSxJQUFJLEtBQUssSUFBSSxHQUFHLENBQUMsQ0FBQTtRQUNsRSxDQUFDLENBQUMsQ0FBQTtRQUVGLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFBO0lBQzdCLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxNQUFNLENBQ0osSUFBb0YsRUFDcEYsR0FBVyxFQUNYLEtBQVUsRUFDVixPQUFzQixRQUFRO1FBRTlCLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQTtRQUNiLElBQUksSUFBSSxLQUFLLFFBQVEsRUFBRSxDQUFDO1lBQ3RCLElBQUksR0FBRyxHQUFHLE9BQU8sQ0FBQyxTQUFTLGtCQUFrQixPQUFPLENBQUMsVUFBVSxJQUFJLElBQUksT0FBTyxDQUFBO1FBQ2hGLENBQUM7YUFBTSxDQUFDO1lBQ04sSUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDLFVBQVUsMEJBQTBCLElBQUksT0FBTyxDQUFBO1FBQ25FLENBQUM7UUFFRCxhQUFhO1FBQ2IsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFBO1FBRWxFLFNBQVM7UUFDVCxNQUFNLElBQUksR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQzNCLElBQUksT0FBTyxHQUE2QixRQUFRLENBQUMsUUFBd0IsQ0FBQTtRQUV6RSxvQkFBb0I7UUFDcEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRyxFQUFFLENBQUM7WUFDMUMsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQ3RCLElBQUksT0FBTyxZQUFZLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDcEMsSUFBSSxRQUFRLEdBQVEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtnQkFFdkMsNkJBQTZCO2dCQUM3QixJQUFJLENBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDO29CQUMzQixRQUFRLEdBQUcsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUEsQ0FBQyxlQUFlO29CQUM3QyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQSxDQUFDLFNBQVM7Z0JBQ3pDLENBQUM7Z0JBRUQsT0FBTyxHQUFHLFFBQVEsQ0FBQSxDQUFDLGtCQUFrQjtZQUN2QyxDQUFDO2lCQUFNLENBQUM7Z0JBQ04sTUFBTSxJQUFJLEtBQUssQ0FBQywyQkFBMkIsTUFBTSxvQkFBb0IsQ0FBQyxDQUFBO1lBQ3hFLENBQUM7UUFDSCxDQUFDO1FBRUQsUUFBUTtRQUNSLElBQUksT0FBTyxZQUFZLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNwQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFBO1FBQzNDLENBQUM7YUFBTSxDQUFDO1lBQ04sTUFBTSxJQUFJLEtBQUssQ0FBQyw4Q0FBOEMsQ0FBQyxDQUFBO1FBQ2pFLENBQUM7UUFFRCxrQkFBa0I7UUFDbEIsRUFBRSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLFFBQVEsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFBO1FBRW5ELE9BQU87UUFDUCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQTtJQUN2QyxDQUFDO0lBR08sd0JBQXdCLENBQzlCLE9BQTZCLEVBQzdCLFVBQWdDO1FBRWhDLElBQUksV0FBVyxHQUFHLEtBQUssQ0FBQTtRQUV2QixvQkFBb0I7UUFDcEIsU0FBUyxjQUFjLENBQUUsTUFBVyxFQUFFLE1BQVc7WUFDL0MsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztnQkFDN0MsK0JBQStCO2dCQUMvQixLQUFLLE1BQU0sSUFBSSxJQUFJLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztvQkFDaEMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQTtvQkFDcEIsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQTtvQkFFeEIsU0FBUztvQkFDVCxNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO29CQUVoQyxxQkFBcUI7b0JBQ3JCLElBQUksUUFBUSxLQUFLLFNBQVMsRUFBRSxDQUFDO3dCQUMzQixXQUFXLEdBQUcsSUFBSSxDQUFBO3dCQUNsQixNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQTtvQkFDeEIsQ0FBQzt5QkFBTSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDO3dCQUNyRCx5QkFBeUI7d0JBQ3pCLGNBQWMsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUE7b0JBQ2pDLENBQUM7eUJBQU0sSUFBSSxRQUFRLEtBQUssS0FBSyxFQUFFLENBQUM7d0JBQzlCLGFBQWE7d0JBQ2IsV0FBVyxHQUFHLElBQUksQ0FBQTt3QkFDbEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUE7b0JBQ3hCLENBQUM7Z0JBQ0gsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDO1FBRUQsU0FBUztRQUNULGNBQWMsQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUVyRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsQ0FBQTtJQUM1QyxDQUFDO0NBQ0Y7QUFFRDs7R0FFRztBQUNILE1BQU0sVUFBVTtJQUNOLFFBQVEsQ0FBUTtJQUNoQixRQUFRLENBQXNCO0lBRXRDLFlBQWEsUUFBZ0I7UUFDM0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUE7UUFDeEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUE7SUFDdEMsQ0FBQztJQUVPLGFBQWE7UUFDbkIsTUFBTSxXQUFXLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFBO1FBQzFELE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQTtJQUN4QyxDQUFDO0lBRUQsR0FBRyxDQUFFLEdBQVcsRUFBRSxLQUFVO1FBQzFCLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQTtRQUM3QixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUE7SUFDZCxDQUFDO0lBRUQsRUFBRSxDQUFFLEdBQVc7UUFDYixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUN6QixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUE7SUFDZCxDQUFDO0lBRU8sS0FBSztRQUNYLEVBQUUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFDNUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7WUFDckIsU0FBUyxFQUFFLENBQUUsQ0FBQztZQUNkLFVBQVUsRUFBRSxJQUFJO1NBQ2pCLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQTtJQUNmLENBQUM7Q0FDRjtBQUVELE1BQU0sQ0FBQyxNQUFNLE1BQU0sR0FBRyxJQUFJLE1BQU0sRUFBRSxDQUFBIn0=