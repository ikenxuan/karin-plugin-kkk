import YAML from 'yaml';
import fs from 'node:fs';
import { logger } from 'node-karin';
import { Version } from './Version.js';
import chokidar from 'chokidar';
class config {
    config = {};
    watcher = { config: {}, defSet: {} };
    constructor() {
        this.initCfg();
    }
    /** 初始化配置 */
    initCfg() {
        let path;
        path = `${Version.karinPath}/config/plugin/${Version.pluginName}/`;
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
        watcher.on('change', async () => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21vZHVsZS91dGlscy9Db25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxJQUFJLE1BQU0sTUFBTSxDQUFBO0FBQ3ZCLE9BQU8sRUFBRSxNQUFNLFNBQVMsQ0FBQTtBQUN4QixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sWUFBWSxDQUFBO0FBQ25DLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxXQUFXLENBQUE7QUFDbkMsT0FBTyxRQUF1QixNQUFNLFVBQVUsQ0FBQTtBQUs5QyxNQUFNLE1BQU07SUFDRixNQUFNLEdBQXdCLEVBQUUsQ0FBQTtJQUNoQyxPQUFPLEdBQThCLEVBQUUsTUFBTSxFQUFFLEVBQWUsRUFBRSxNQUFNLEVBQUUsRUFBZSxFQUFFLENBQUE7SUFFakc7UUFDRSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUE7SUFDaEIsQ0FBQztJQUVELFlBQVk7SUFDSixPQUFPO1FBQ2IsSUFBSSxJQUFZLENBQUE7UUFDaEIsSUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDLFNBQVMsa0JBQWtCLE9BQU8sQ0FBQyxVQUFVLEdBQUcsQ0FBQTtRQUNsRSxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7WUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQzVDLE1BQU0sT0FBTyxHQUFHLEdBQUcsT0FBTyxDQUFDLFVBQVUseUJBQXlCLENBQUE7UUFDOUQsTUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUE7UUFDNUUsS0FBSyxNQUFNLElBQUksSUFBSSxLQUFLLEVBQUUsQ0FBQztZQUN6QixJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FB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