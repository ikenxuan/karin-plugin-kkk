#!/usr/bin/env node
import fs from 'node:fs';
/**
 * @description 获取package.json路径
 */
const getPkgPath = () => process.cwd() + '/package.json';
/**
 * @description 读取package.json
 */
const readPkg = () => JSON.parse(fs.readFileSync(getPkgPath(), 'utf-8'));
/**
 * @description 写入package.json
 * @param pkg package.json
 */
const writePkg = (pkg) => fs.writeFileSync(getPkgPath(), JSON.stringify(pkg, null, 2));
/**
 * @description 删除devDependencies
 */
const clean = () => {
    const pkg = readPkg();
    delete pkg.devDependencies;
    writePkg(pkg);
};
clean();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xlYW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvY2xlYW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUVBLE9BQU8sRUFBRSxNQUFNLFNBQVMsQ0FBQTtBQUV4Qjs7R0FFRztBQUNILE1BQU0sVUFBVSxHQUFHLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxlQUFlLENBQUE7QUFFeEQ7O0dBRUc7QUFDSCxNQUFNLE9BQU8sR0FBRyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQTtBQUV4RTs7O0dBR0c7QUFDSCxNQUFNLFFBQVEsR0FBRyxDQUFDLEdBQVEsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQUUsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUUzRjs7R0FFRztBQUNILE1BQU0sS0FBSyxHQUFHLEdBQUcsRUFBRTtJQUNqQixNQUFNLEdBQUcsR0FBRyxPQUFPLEVBQUUsQ0FBQTtJQUNyQixPQUFPLEdBQUcsQ0FBQyxlQUFlLENBQUE7SUFDMUIsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0FBQ2YsQ0FBQyxDQUFBO0FBRUQsS0FBSyxFQUFFLENBQUEifQ==