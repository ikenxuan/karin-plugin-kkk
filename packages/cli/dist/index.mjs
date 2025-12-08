#!/usr/bin/env node
import { execSync, spawn } from "node:child_process";
import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import pc from "picocolors";

//#region src/index.ts
const TARGETS = {
	core: [
		"pnpm",
		"--filter",
		"karin-plugin-kkk",
		"run",
		"build"
	],
	docs: [
		"pnpm",
		"--filter",
		"docs",
		"run",
		"build"
	],
	template: [
		"pnpm",
		"--filter",
		"template",
		"run",
		"build"
	],
	web: [
		"pnpm",
		"--filter",
		"web",
		"run",
		"build"
	]
};
function formatTime(ms) {
	return (ms / 1e3).toFixed(2) + "s";
}
async function buildTarget(name, command) {
	const startTime = Date.now();
	return new Promise((resolve) => {
		const [cmd, ...args] = command;
		const child = spawn(cmd, args, {
			stdio: "inherit",
			shell: true
		});
		child.on("close", (code) => {
			const duration = Date.now() - startTime;
			resolve({
				success: code === 0,
				duration
			});
		});
		child.on("error", () => {
			resolve({
				success: false,
				duration: Date.now() - startTime
			});
		});
	});
}
async function main() {
	const args = process.argv.slice(2);
	if (args.length === 0 || args[0] !== "build") {
		console.log(pc.bold(pc.red("❌ 请使用: kkk build <target1> [target2] ...")));
		console.log("\n可用的构建目标:");
		Object.keys(TARGETS).forEach((key) => {
			console.log(`  - ${key}`);
		});
		process.exit(1);
	}
	const targets = args.slice(1);
	if (targets.length === 0) {
		console.log(pc.bold(pc.red("❌ 请指定至少一个构建目标")));
		process.exit(1);
	}
	const invalidTargets = targets.filter((t) => !TARGETS[t]);
	if (invalidTargets.length > 0) {
		console.log(pc.bold(pc.red(`❌ 无效的构建目标: ${invalidTargets.join(", ")}`)));
		console.log("\n可用的构建目标:");
		Object.keys(TARGETS).forEach((key) => {
			console.log(`  - ${key}`);
		});
		process.exit(1);
	}
	const totalStartTime = Date.now();
	const results = [];
	console.log(pc.bold(pc.cyan(`🚀 开始构建 ${targets.length} 个包: ${targets.join(", ")}\n`)));
	for (const target of targets) {
		console.log(pc.bold(pc.blue(`\n📦 构建 ${target}...`)));
		const result = await buildTarget(target, TARGETS[target]);
		results.push({
			name: target,
			...result
		});
		if (result.success) console.log(pc.bold(pc.green(`✨ ${target} 构建成功！耗时: ${formatTime(result.duration)}`)));
		else {
			console.log(pc.bold(pc.red(`❌ ${target} 构建失败！耗时: ${formatTime(result.duration)}`)));
			break;
		}
	}
	const totalDuration = Date.now() - totalStartTime;
	const allSuccess = results.every((r) => r.success);
	console.log("\n" + pc.bold("=".repeat(50)));
	console.log(pc.bold("📊 构建统计:"));
	results.forEach((r) => {
		const status = r.success ? pc.green("✓") : pc.red("✗");
		console.log(`  ${status} ${r.name}: ${formatTime(r.duration)}`);
	});
	console.log(pc.bold(`\n⏱️  总耗时: ${formatTime(totalDuration)}`));
	console.log(pc.bold("=".repeat(50)));
	if (allSuccess) {
		if (targets.includes("core")) await printCorePackageSize();
		console.log(pc.bold(pc.green("\n🎉 所有包构建成功！")));
		process.exit(0);
	} else {
		console.log(pc.bold(pc.red("\n💥 构建失败！")));
		process.exit(1);
	}
}
function formatSize(bytes) {
	if (bytes < 1024) return bytes + " B";
	if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB";
	return (bytes / (1024 * 1024)).toFixed(2) + " MB";
}
function getDirSize(dir) {
	let size = 0;
	try {
		const entries = readdirSync(dir, { withFileTypes: true });
		for (const entry of entries) {
			const fullPath = join(dir, entry.name);
			if (entry.isDirectory()) size += getDirSize(fullPath);
			else if (entry.isFile()) size += statSync(fullPath).size;
		}
	} catch {}
	return size;
}
function getFileSize(filePath) {
	try {
		return statSync(filePath).size;
	} catch {
		return 0;
	}
}
async function printCorePackageSize() {
	const coreDir = "packages/core";
	const files = [
		"config/",
		"lib/",
		"resources/",
		"LICENSE",
		"package.json",
		"README.md",
		"CHANGELOG.md"
	];
	let totalSize = 0;
	const details = [];
	for (const file of files) {
		const fullPath = join(coreDir, file);
		let size = 0;
		if (file.endsWith("/")) size = getDirSize(fullPath);
		else size = getFileSize(fullPath);
		if (size > 0) {
			details.push({
				name: file,
				size
			});
			totalSize += size;
		}
	}
	console.log("\n" + pc.bold("=".repeat(50)));
	console.log(pc.bold(pc.cyan("📦 core 包发布大小统计:")));
	details.forEach((d) => {
		console.log(`  ${d.name.padEnd(20)} ${formatSize(d.size)}`);
	});
	console.log(pc.bold(`\n  未压缩总大小: ${formatSize(totalSize)}`));
	try {
		const output = execSync("npm pack --dry-run --json 2>&1", {
			cwd: coreDir,
			encoding: "utf-8"
		});
		const packInfo = JSON.parse(output);
		if (Array.isArray(packInfo) && packInfo[0]?.size) console.log(pc.bold(pc.green(`  压缩后大小:   ${formatSize(packInfo[0].size)}`)));
	} catch {
		const estimatedSize = Math.round(totalSize * .3);
		console.log(pc.bold(pc.yellow(`  预估压缩大小: ~${formatSize(estimatedSize)}`)));
	}
	console.log(pc.bold("=".repeat(50)));
}
main();

//#endregion
export {  };