import { createRequire } from "node:module";
var __create = Object.create, __defProp = Object.defineProperty, __getOwnPropDesc = Object.getOwnPropertyDescriptor, __getOwnPropNames = Object.getOwnPropertyNames, __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty, __esmMin = (fn, res) => () => (fn && (res = fn(fn = 0)), res), __commonJSMin = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports), __export = (all) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: !0
	});
	return target;
}, __copyProps = (to, from, except, desc) => {
	if (from && "object" == typeof from || "function" == typeof from) for (var key, keys = __getOwnPropNames(from), i = 0, n = keys.length; i < n; i++) key = keys[i], __hasOwnProp.call(to, key) || key === except || __defProp(to, key, {
		get: ((k) => from[k]).bind(null, key),
		enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
	});
	return to;
}, __toESM = (mod, isNodeMode, target) => (target = null != mod ? __create(__getProtoOf(mod)) : {}, __copyProps(!isNodeMode && mod && mod.__esModule ? target : __defProp(target, "default", {
	value: mod,
	enumerable: !0
}), mod)), __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod), __require = createRequire(import.meta.url);
export { __toCommonJS as a, __require as i, __esmMin as n, __toESM as o, __export as r, __commonJSMin as t };
