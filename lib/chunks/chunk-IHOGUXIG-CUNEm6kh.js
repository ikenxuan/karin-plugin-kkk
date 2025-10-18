import { __toESM, require_react } from "./react-tSI5bnDQ.js";
import { require_react_dom } from "./react-dom-DjLB5oxT.js";
import { $7215afc6de606d6b$export$de79e2c695e052f3, $c87311424ea30a05$export$9ac100e40613ea10, $c87311424ea30a05$export$a11b0059900ceec8, $c87311424ea30a05$export$fedb369cb70207f1, $ea8dcbcb9ea1b556$export$95185d699e05d4d7, clsx_default, require_jsx_runtime } from "./DefaultLayout-Di27JJeb.js";

//#region ../../node_modules/.pnpm/@heroui+react-utils@2.1.14_react@19.2.0/node_modules/@heroui/react-utils/dist/chunk-BDGLNRCW.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function canUseDOM() {
	return !!(typeof window !== "undefined" && window.document && window.document.createElement);
}
var isBrowser = canUseDOM();
function useDOMRef(ref) {
	const domRef = (0, import_react.useRef)(null);
	(0, import_react.useImperativeHandle)(ref, () => domRef.current);
	return domRef;
}

//#endregion
//#region ../../node_modules/.pnpm/@heroui+shared-utils@2.1.12/node_modules/@heroui/shared-utils/dist/index.mjs
var __DEV__ = process.env.NODE_ENV !== "production";
var __TEST__ = process.env.NODE_ENV === "test";
var dataAttr = (condition) => condition ? "true" : void 0;
function toVal(mix) {
	var k$1, y$1, str = "";
	if (typeof mix === "string" || typeof mix === "number") str += mix;
	else if (typeof mix === "object") {
		if (Array.isArray(mix)) {
			for (k$1 = 0; k$1 < mix.length; k$1++) if (mix[k$1]) {
				if (y$1 = toVal(mix[k$1])) {
					str && (str += " ");
					str += y$1;
				}
			}
		} else for (k$1 in mix) if (mix[k$1]) {
			str && (str += " ");
			str += k$1;
		}
	}
	return str;
}
function clsx(...args) {
	var i$1 = 0, tmp, x$1, str = "";
	while (i$1 < args.length) if (tmp = args[i$1++]) {
		if (x$1 = toVal(tmp)) {
			str && (str += " ");
			str += x$1;
		}
	}
	return str;
}
function getUniqueID(prefix) {
	return `${prefix}-${Math.floor(Math.random() * 1e6)}`;
}
function objectToDeps(obj) {
	if (!obj || typeof obj !== "object") return "";
	try {
		return JSON.stringify(obj);
	} catch {
		return "";
	}
}
function clamp(value, min, max) {
	return Math.min(Math.max(value, min), max);
}
function chain(...callbacks) {
	return (...args) => {
		for (let callback of callbacks) if (typeof callback === "function") callback(...args);
	};
}
var idsUpdaterMap = /* @__PURE__ */ new Map();
function mergeIds(idA, idB) {
	if (idA === idB) return idA;
	let setIdsA = idsUpdaterMap.get(idA);
	if (setIdsA) {
		setIdsA.forEach((ref) => ref.current = idB);
		return idB;
	}
	let setIdsB = idsUpdaterMap.get(idB);
	if (setIdsB) {
		setIdsB.forEach((ref) => ref.current = idA);
		return idA;
	}
	return idB;
}
function mergeProps(...args) {
	let result = { ...args[0] };
	for (let i$1 = 1; i$1 < args.length; i$1++) {
		let props = args[i$1];
		for (let key in props) {
			let a$1 = result[key];
			let b = props[key];
			if (typeof a$1 === "function" && typeof b === "function" && key[0] === "o" && key[1] === "n" && key.charCodeAt(2) >= 65 && key.charCodeAt(2) <= 90) result[key] = chain(a$1, b);
			else if ((key === "className" || key === "UNSAFE_className") && typeof a$1 === "string" && typeof b === "string") result[key] = clsx(a$1, b);
			else if (key === "id" && a$1 && b) result.id = mergeIds(a$1, b);
			else result[key] = b !== void 0 ? b : a$1;
		}
	}
	return result;
}

//#endregion
//#region ../../node_modules/.pnpm/@swc+helpers@0.5.17/node_modules/@swc/helpers/esm/_check_private_redeclaration.js
function _check_private_redeclaration(obj, privateCollection) {
	if (privateCollection.has(obj)) throw new TypeError("Cannot initialize the same private elements twice on an object");
}

//#endregion
//#region ../../node_modules/.pnpm/@swc+helpers@0.5.17/node_modules/@swc/helpers/esm/_class_private_field_init.js
function _class_private_field_init(obj, privateMap, value) {
	_check_private_redeclaration(obj, privateMap);
	privateMap.set(obj, value);
}

//#endregion
//#region ../../node_modules/.pnpm/@react-aria+utils@3.31.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/@react-aria/utils/dist/useLayoutEffect.mjs
const $f0a04ccd8dbdd83b$export$e5c5a5f917a5871c = typeof document !== "undefined" ? import_react.useLayoutEffect : () => {};

//#endregion
//#region ../../node_modules/.pnpm/@react-aria+utils@3.31.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/@react-aria/utils/dist/useEffectEvent.mjs
var $8ae05eaa5c114e9c$var$_React_useInsertionEffect;
const $8ae05eaa5c114e9c$var$useEarlyEffect = ($8ae05eaa5c114e9c$var$_React_useInsertionEffect = import_react.useInsertionEffect) !== null && $8ae05eaa5c114e9c$var$_React_useInsertionEffect !== void 0 ? $8ae05eaa5c114e9c$var$_React_useInsertionEffect : $f0a04ccd8dbdd83b$export$e5c5a5f917a5871c;
function $8ae05eaa5c114e9c$export$7f54fc3180508a52(fn) {
	const ref = (0, import_react.useRef)(null);
	$8ae05eaa5c114e9c$var$useEarlyEffect(() => {
		ref.current = fn;
	}, [fn]);
	return (0, import_react.useCallback)((...args) => {
		const f$1 = ref.current;
		return f$1 === null || f$1 === void 0 ? void 0 : f$1(...args);
	}, []);
}

//#endregion
//#region ../../node_modules/.pnpm/@react-aria+utils@3.31.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/@react-aria/utils/dist/useId.mjs
let $bdb11010cef70236$var$canUseDOM = Boolean(typeof window !== "undefined" && window.document && window.document.createElement);
let $bdb11010cef70236$export$d41a04c74483c6ef = /* @__PURE__ */ new Map();
let $bdb11010cef70236$var$registry;
if (typeof FinalizationRegistry !== "undefined") $bdb11010cef70236$var$registry = new FinalizationRegistry((heldValue) => {
	$bdb11010cef70236$export$d41a04c74483c6ef.delete(heldValue);
});
function $bdb11010cef70236$export$cd8c9cb68f842629(idA, idB) {
	if (idA === idB) return idA;
	let setIdsA = $bdb11010cef70236$export$d41a04c74483c6ef.get(idA);
	if (setIdsA) {
		setIdsA.forEach((ref) => ref.current = idB);
		return idB;
	}
	let setIdsB = $bdb11010cef70236$export$d41a04c74483c6ef.get(idB);
	if (setIdsB) {
		setIdsB.forEach((ref) => ref.current = idA);
		return idA;
	}
	return idB;
}

//#endregion
//#region ../../node_modules/.pnpm/@react-aria+utils@3.31.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/@react-aria/utils/dist/chain.mjs
/**
* Calls all functions in the order they were chained with the same arguments.
*/ function $ff5963eb1fccf552$export$e08e3b67e392101e(...callbacks) {
	return (...args) => {
		for (let callback of callbacks) if (typeof callback === "function") callback(...args);
	};
}

//#endregion
//#region ../../node_modules/.pnpm/@react-aria+utils@3.31.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/@react-aria/utils/dist/domHelpers.mjs
const $431fbd86ca7dc216$export$b204af158042fbac = (el) => {
	var _el_ownerDocument;
	return (_el_ownerDocument = el === null || el === void 0 ? void 0 : el.ownerDocument) !== null && _el_ownerDocument !== void 0 ? _el_ownerDocument : document;
};
const $431fbd86ca7dc216$export$f21a1ffae260145a = (el) => {
	if (el && "window" in el && el.window === el) return el;
	return $431fbd86ca7dc216$export$b204af158042fbac(el).defaultView || window;
};
/**
* Type guard that checks if a value is a Node. Verifies the presence and type of the nodeType property.
*/ function $431fbd86ca7dc216$var$isNode(value) {
	return value !== null && typeof value === "object" && "nodeType" in value && typeof value.nodeType === "number";
}
function $431fbd86ca7dc216$export$af51f0f06c0f328a(node) {
	return $431fbd86ca7dc216$var$isNode(node) && node.nodeType === Node.DOCUMENT_FRAGMENT_NODE && "host" in node;
}

//#endregion
//#region ../../node_modules/.pnpm/@react-stately+flags@3.1.2/node_modules/@react-stately/flags/dist/import.mjs
let $f4e2df6bd15f8569$var$_shadowDOM = false;
function $f4e2df6bd15f8569$export$98658e8c59125e6a() {
	return $f4e2df6bd15f8569$var$_shadowDOM;
}

//#endregion
//#region ../../node_modules/.pnpm/@react-aria+utils@3.31.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/@react-aria/utils/dist/DOMFunctions.mjs
function $d4ee10de306f2510$export$4282f70798064fe0(node, otherNode) {
	if (!$f4e2df6bd15f8569$export$98658e8c59125e6a()) return otherNode && node ? node.contains(otherNode) : false;
	if (!node || !otherNode) return false;
	let currentNode = otherNode;
	while (currentNode !== null) {
		if (currentNode === node) return true;
		if (currentNode.tagName === "SLOT" && currentNode.assignedSlot) currentNode = currentNode.assignedSlot.parentNode;
		else if ($431fbd86ca7dc216$export$af51f0f06c0f328a(currentNode)) currentNode = currentNode.host;
		else currentNode = currentNode.parentNode;
	}
	return false;
}
const $d4ee10de306f2510$export$cd4e5573fbe2b576 = (doc = document) => {
	var _activeElement_shadowRoot;
	if (!$f4e2df6bd15f8569$export$98658e8c59125e6a()) return doc.activeElement;
	let activeElement = doc.activeElement;
	while (activeElement && "shadowRoot" in activeElement && ((_activeElement_shadowRoot = activeElement.shadowRoot) === null || _activeElement_shadowRoot === void 0 ? void 0 : _activeElement_shadowRoot.activeElement)) activeElement = activeElement.shadowRoot.activeElement;
	return activeElement;
};
function $d4ee10de306f2510$export$e58f029f0fbfdb29(event) {
	if ($f4e2df6bd15f8569$export$98658e8c59125e6a() && event.target.shadowRoot) {
		if (event.composedPath) return event.composedPath()[0];
	}
	return event.target;
}

//#endregion
//#region ../../node_modules/.pnpm/@react-aria+utils@3.31.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/@react-aria/utils/dist/mergeProps.mjs
function $3ef42575df84b30b$export$9d1611c77c2fe928(...args) {
	let result = { ...args[0] };
	for (let i$1 = 1; i$1 < args.length; i$1++) {
		let props = args[i$1];
		for (let key in props) {
			let a$1 = result[key];
			let b = props[key];
			if (typeof a$1 === "function" && typeof b === "function" && key[0] === "o" && key[1] === "n" && key.charCodeAt(2) >= 65 && key.charCodeAt(2) <= 90) result[key] = $ff5963eb1fccf552$export$e08e3b67e392101e(a$1, b);
			else if ((key === "className" || key === "UNSAFE_className") && typeof a$1 === "string" && typeof b === "string") result[key] = clsx_default(a$1, b);
			else if (key === "id" && a$1 && b) result.id = $bdb11010cef70236$export$cd8c9cb68f842629(a$1, b);
			else result[key] = b !== void 0 ? b : a$1;
		}
	}
	return result;
}

//#endregion
//#region ../../node_modules/.pnpm/@react-aria+utils@3.31.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/@react-aria/utils/dist/runAfterTransition.mjs
let $bbed8b41f857bcc0$var$transitionsByElement = /* @__PURE__ */ new Map();
let $bbed8b41f857bcc0$var$transitionCallbacks = /* @__PURE__ */ new Set();
function $bbed8b41f857bcc0$var$setupGlobalEvents() {
	if (typeof window === "undefined") return;
	function isTransitionEvent(event) {
		return "propertyName" in event;
	}
	let onTransitionStart = (e) => {
		if (!isTransitionEvent(e) || !e.target) return;
		let transitions = $bbed8b41f857bcc0$var$transitionsByElement.get(e.target);
		if (!transitions) {
			transitions = /* @__PURE__ */ new Set();
			$bbed8b41f857bcc0$var$transitionsByElement.set(e.target, transitions);
			e.target.addEventListener("transitioncancel", onTransitionEnd, { once: true });
		}
		transitions.add(e.propertyName);
	};
	let onTransitionEnd = (e) => {
		if (!isTransitionEvent(e) || !e.target) return;
		let properties = $bbed8b41f857bcc0$var$transitionsByElement.get(e.target);
		if (!properties) return;
		properties.delete(e.propertyName);
		if (properties.size === 0) {
			e.target.removeEventListener("transitioncancel", onTransitionEnd);
			$bbed8b41f857bcc0$var$transitionsByElement.delete(e.target);
		}
		if ($bbed8b41f857bcc0$var$transitionsByElement.size === 0) {
			for (let cb of $bbed8b41f857bcc0$var$transitionCallbacks) cb();
			$bbed8b41f857bcc0$var$transitionCallbacks.clear();
		}
	};
	document.body.addEventListener("transitionrun", onTransitionStart);
	document.body.addEventListener("transitionend", onTransitionEnd);
}
if (typeof document !== "undefined") if (document.readyState !== "loading") $bbed8b41f857bcc0$var$setupGlobalEvents();
else document.addEventListener("DOMContentLoaded", $bbed8b41f857bcc0$var$setupGlobalEvents);
/**
* Cleans up any elements that are no longer in the document.
* This is necessary because we can't rely on transitionend events to fire
* for elements that are removed from the document while transitioning.
*/ function $bbed8b41f857bcc0$var$cleanupDetachedElements() {
	for (const [eventTarget] of $bbed8b41f857bcc0$var$transitionsByElement) if ("isConnected" in eventTarget && !eventTarget.isConnected) $bbed8b41f857bcc0$var$transitionsByElement.delete(eventTarget);
}
function $bbed8b41f857bcc0$export$24490316f764c430(fn) {
	requestAnimationFrame(() => {
		$bbed8b41f857bcc0$var$cleanupDetachedElements();
		if ($bbed8b41f857bcc0$var$transitionsByElement.size === 0) fn();
		else $bbed8b41f857bcc0$var$transitionCallbacks.add(fn);
	});
}

//#endregion
//#region ../../node_modules/.pnpm/@react-aria+utils@3.31.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/@react-aria/utils/dist/useGlobalListeners.mjs
function $03deb23ff14920c4$export$4eaf04e54aa8eed6() {
	let globalListeners = (0, import_react.useRef)(/* @__PURE__ */ new Map());
	let addGlobalListener = (0, import_react.useCallback)((eventTarget, type, listener, options) => {
		let fn = (options === null || options === void 0 ? void 0 : options.once) ? (...args) => {
			globalListeners.current.delete(listener);
			listener(...args);
		} : listener;
		globalListeners.current.set(listener, {
			type,
			eventTarget,
			fn,
			options
		});
		eventTarget.addEventListener(type, fn, options);
	}, []);
	let removeGlobalListener = (0, import_react.useCallback)((eventTarget, type, listener, options) => {
		var _globalListeners_current_get;
		let fn = ((_globalListeners_current_get = globalListeners.current.get(listener)) === null || _globalListeners_current_get === void 0 ? void 0 : _globalListeners_current_get.fn) || listener;
		eventTarget.removeEventListener(type, fn, options);
		globalListeners.current.delete(listener);
	}, []);
	let removeAllGlobalListeners = (0, import_react.useCallback)(() => {
		globalListeners.current.forEach((value, key) => {
			removeGlobalListener(value.eventTarget, value.type, key, value.options);
		});
	}, [removeGlobalListener]);
	(0, import_react.useEffect)(() => {
		return removeAllGlobalListeners;
	}, [removeAllGlobalListeners]);
	return {
		addGlobalListener,
		removeGlobalListener,
		removeAllGlobalListeners
	};
}

//#endregion
//#region ../../node_modules/.pnpm/@react-aria+utils@3.31.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/@react-aria/utils/dist/useSyncRef.mjs
function $e7801be82b4b2a53$export$4debdb1a3f0fa79e(context, ref) {
	$f0a04ccd8dbdd83b$export$e5c5a5f917a5871c(() => {
		if (context && context.ref && ref) {
			context.ref.current = ref.current;
			return () => {
				if (context.ref) context.ref.current = null;
			};
		}
	});
}

//#endregion
//#region ../../node_modules/.pnpm/@react-aria+utils@3.31.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/@react-aria/utils/dist/isVirtualEvent.mjs
function $6a7db85432448f7f$export$60278871457622de(event) {
	if (event.pointerType === "" && event.isTrusted) return true;
	if ($c87311424ea30a05$export$a11b0059900ceec8() && event.pointerType) return event.type === "click" && event.buttons === 1;
	return event.detail === 0 && !event.pointerType;
}
function $6a7db85432448f7f$export$29bf1b5f2c56cf63(event) {
	return !$c87311424ea30a05$export$a11b0059900ceec8() && event.width === 0 && event.height === 0 || event.width === 1 && event.height === 1 && event.pressure === 0 && event.detail === 0 && event.pointerType === "mouse";
}

//#endregion
//#region ../../node_modules/.pnpm/@react-aria+utils@3.31.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/@react-aria/utils/dist/isElementVisible.mjs
const $7d2416ea0959daaa$var$supportsCheckVisibility = typeof Element !== "undefined" && "checkVisibility" in Element.prototype;
function $7d2416ea0959daaa$var$isStyleVisible(element) {
	const windowObject = $431fbd86ca7dc216$export$f21a1ffae260145a(element);
	if (!(element instanceof windowObject.HTMLElement) && !(element instanceof windowObject.SVGElement)) return false;
	let { display, visibility } = element.style;
	let isVisible = display !== "none" && visibility !== "hidden" && visibility !== "collapse";
	if (isVisible) {
		const { getComputedStyle } = element.ownerDocument.defaultView;
		let { display: computedDisplay, visibility: computedVisibility } = getComputedStyle(element);
		isVisible = computedDisplay !== "none" && computedVisibility !== "hidden" && computedVisibility !== "collapse";
	}
	return isVisible;
}
function $7d2416ea0959daaa$var$isAttributeVisible(element, childElement) {
	return !element.hasAttribute("hidden") && !element.hasAttribute("data-react-aria-prevent-focus") && (element.nodeName === "DETAILS" && childElement && childElement.nodeName !== "SUMMARY" ? element.hasAttribute("open") : true);
}
function $7d2416ea0959daaa$export$e989c0fffaa6b27a(element, childElement) {
	if ($7d2416ea0959daaa$var$supportsCheckVisibility) return element.checkVisibility({ visibilityProperty: true }) && !element.closest("[data-react-aria-prevent-focus]");
	return element.nodeName !== "#comment" && $7d2416ea0959daaa$var$isStyleVisible(element) && $7d2416ea0959daaa$var$isAttributeVisible(element, childElement) && (!element.parentElement || $7d2416ea0959daaa$export$e989c0fffaa6b27a(element.parentElement, element));
}

//#endregion
//#region ../../node_modules/.pnpm/@react-aria+utils@3.31.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/@react-aria/utils/dist/isFocusable.mjs
const $b4b717babfbb907b$var$focusableElements = [
	"input:not([disabled]):not([type=hidden])",
	"select:not([disabled])",
	"textarea:not([disabled])",
	"button:not([disabled])",
	"a[href]",
	"area[href]",
	"summary",
	"iframe",
	"object",
	"embed",
	"audio[controls]",
	"video[controls]",
	"[contenteditable]:not([contenteditable^=\"false\"])",
	"permission"
];
const $b4b717babfbb907b$var$FOCUSABLE_ELEMENT_SELECTOR = $b4b717babfbb907b$var$focusableElements.join(":not([hidden]),") + ",[tabindex]:not([disabled]):not([hidden])";
$b4b717babfbb907b$var$focusableElements.push("[tabindex]:not([tabindex=\"-1\"]):not([disabled])");
const $b4b717babfbb907b$var$TABBABLE_ELEMENT_SELECTOR = $b4b717babfbb907b$var$focusableElements.join(":not([hidden]):not([tabindex=\"-1\"]),");
function $b4b717babfbb907b$export$4c063cf1350e6fed(element) {
	return element.matches($b4b717babfbb907b$var$FOCUSABLE_ELEMENT_SELECTOR) && $7d2416ea0959daaa$export$e989c0fffaa6b27a(element) && !$b4b717babfbb907b$var$isInert(element);
}
function $b4b717babfbb907b$var$isInert(element) {
	let node = element;
	while (node != null) {
		if (node instanceof node.ownerDocument.defaultView.HTMLElement && node.inert) return true;
		node = node.parentElement;
	}
	return false;
}

//#endregion
//#region ../../node_modules/.pnpm/@react-aria+interactions@3.25.6_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/@react-aria/interactions/dist/utils.mjs
function $8a9cb279dc87e130$export$525bc4921d56d4a(nativeEvent) {
	let event = nativeEvent;
	event.nativeEvent = nativeEvent;
	event.isDefaultPrevented = () => event.defaultPrevented;
	event.isPropagationStopped = () => event.cancelBubble;
	event.persist = () => {};
	return event;
}
function $8a9cb279dc87e130$export$c2b7abe5d61ec696(event, target) {
	Object.defineProperty(event, "target", { value: target });
	Object.defineProperty(event, "currentTarget", { value: target });
}
function $8a9cb279dc87e130$export$715c682d09d639cc(onBlur) {
	let stateRef = (0, import_react.useRef)({
		isFocused: false,
		observer: null
	});
	$f0a04ccd8dbdd83b$export$e5c5a5f917a5871c(() => {
		const state = stateRef.current;
		return () => {
			if (state.observer) {
				state.observer.disconnect();
				state.observer = null;
			}
		};
	}, []);
	let dispatchBlur = $8ae05eaa5c114e9c$export$7f54fc3180508a52((e) => {
		onBlur === null || onBlur === void 0 || onBlur(e);
	});
	return (0, import_react.useCallback)((e) => {
		if (e.target instanceof HTMLButtonElement || e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLSelectElement) {
			stateRef.current.isFocused = true;
			let target = e.target;
			let onBlurHandler = (e$1) => {
				stateRef.current.isFocused = false;
				if (target.disabled) dispatchBlur($8a9cb279dc87e130$export$525bc4921d56d4a(e$1));
				if (stateRef.current.observer) {
					stateRef.current.observer.disconnect();
					stateRef.current.observer = null;
				}
			};
			target.addEventListener("focusout", onBlurHandler, { once: true });
			stateRef.current.observer = new MutationObserver(() => {
				if (stateRef.current.isFocused && target.disabled) {
					var _stateRef_current_observer;
					(_stateRef_current_observer = stateRef.current.observer) === null || _stateRef_current_observer === void 0 || _stateRef_current_observer.disconnect();
					let relatedTargetEl = target === document.activeElement ? null : document.activeElement;
					target.dispatchEvent(new FocusEvent("blur", { relatedTarget: relatedTargetEl }));
					target.dispatchEvent(new FocusEvent("focusout", {
						bubbles: true,
						relatedTarget: relatedTargetEl
					}));
				}
			});
			stateRef.current.observer.observe(target, {
				attributes: true,
				attributeFilter: ["disabled"]
			});
		}
	}, [dispatchBlur]);
}
let $8a9cb279dc87e130$export$fda7da73ab5d4c48 = false;
function $8a9cb279dc87e130$export$cabe61c495ee3649(target) {
	while (target && !$b4b717babfbb907b$export$4c063cf1350e6fed(target)) target = target.parentElement;
	let window$1 = $431fbd86ca7dc216$export$f21a1ffae260145a(target);
	let activeElement = window$1.document.activeElement;
	if (!activeElement || activeElement === target) return;
	$8a9cb279dc87e130$export$fda7da73ab5d4c48 = true;
	let isRefocusing = false;
	let onBlur = (e) => {
		if (e.target === activeElement || isRefocusing) e.stopImmediatePropagation();
	};
	let onFocusOut = (e) => {
		if (e.target === activeElement || isRefocusing) {
			e.stopImmediatePropagation();
			if (!target && !isRefocusing) {
				isRefocusing = true;
				$7215afc6de606d6b$export$de79e2c695e052f3(activeElement);
				cleanup();
			}
		}
	};
	let onFocus = (e) => {
		if (e.target === target || isRefocusing) e.stopImmediatePropagation();
	};
	let onFocusIn = (e) => {
		if (e.target === target || isRefocusing) {
			e.stopImmediatePropagation();
			if (!isRefocusing) {
				isRefocusing = true;
				$7215afc6de606d6b$export$de79e2c695e052f3(activeElement);
				cleanup();
			}
		}
	};
	window$1.addEventListener("blur", onBlur, true);
	window$1.addEventListener("focusout", onFocusOut, true);
	window$1.addEventListener("focusin", onFocusIn, true);
	window$1.addEventListener("focus", onFocus, true);
	let cleanup = () => {
		cancelAnimationFrame(raf);
		window$1.removeEventListener("blur", onBlur, true);
		window$1.removeEventListener("focusout", onFocusOut, true);
		window$1.removeEventListener("focusin", onFocusIn, true);
		window$1.removeEventListener("focus", onFocus, true);
		$8a9cb279dc87e130$export$fda7da73ab5d4c48 = false;
		isRefocusing = false;
	};
	let raf = requestAnimationFrame(cleanup);
	return cleanup;
}

//#endregion
//#region ../../node_modules/.pnpm/@react-aria+interactions@3.25.6_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/@react-aria/interactions/dist/textSelection.mjs
let $14c0b72509d70225$var$state = "default";
let $14c0b72509d70225$var$savedUserSelect = "";
let $14c0b72509d70225$var$modifiedElementMap = /* @__PURE__ */ new WeakMap();
function $14c0b72509d70225$export$16a4697467175487(target) {
	if ($c87311424ea30a05$export$fedb369cb70207f1()) {
		if ($14c0b72509d70225$var$state === "default") {
			const documentObject = $431fbd86ca7dc216$export$b204af158042fbac(target);
			$14c0b72509d70225$var$savedUserSelect = documentObject.documentElement.style.webkitUserSelect;
			documentObject.documentElement.style.webkitUserSelect = "none";
		}
		$14c0b72509d70225$var$state = "disabled";
	} else if (target instanceof HTMLElement || target instanceof SVGElement) {
		let property = "userSelect" in target.style ? "userSelect" : "webkitUserSelect";
		$14c0b72509d70225$var$modifiedElementMap.set(target, target.style[property]);
		target.style[property] = "none";
	}
}
function $14c0b72509d70225$export$b0d6fa1ab32e3295(target) {
	if ($c87311424ea30a05$export$fedb369cb70207f1()) {
		if ($14c0b72509d70225$var$state !== "disabled") return;
		$14c0b72509d70225$var$state = "restoring";
		setTimeout(() => {
			$bbed8b41f857bcc0$export$24490316f764c430(() => {
				if ($14c0b72509d70225$var$state === "restoring") {
					const documentObject = $431fbd86ca7dc216$export$b204af158042fbac(target);
					if (documentObject.documentElement.style.webkitUserSelect === "none") documentObject.documentElement.style.webkitUserSelect = $14c0b72509d70225$var$savedUserSelect || "";
					$14c0b72509d70225$var$savedUserSelect = "";
					$14c0b72509d70225$var$state = "default";
				}
			});
		}, 300);
	} else if (target instanceof HTMLElement || target instanceof SVGElement) {
		if (target && $14c0b72509d70225$var$modifiedElementMap.has(target)) {
			let targetOldUserSelect = $14c0b72509d70225$var$modifiedElementMap.get(target);
			let property = "userSelect" in target.style ? "userSelect" : "webkitUserSelect";
			if (target.style[property] === "none") target.style[property] = targetOldUserSelect;
			if (target.getAttribute("style") === "") target.removeAttribute("style");
			$14c0b72509d70225$var$modifiedElementMap.delete(target);
		}
	}
}

//#endregion
//#region ../../node_modules/.pnpm/@react-aria+interactions@3.25.6_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/@react-aria/interactions/dist/context.mjs
const $ae1eeba8b9eafd08$export$5165eccb35aaadb5 = import_react.createContext({ register: () => {} });
$ae1eeba8b9eafd08$export$5165eccb35aaadb5.displayName = "PressResponderContext";

//#endregion
//#region ../../node_modules/.pnpm/@swc+helpers@0.5.17/node_modules/@swc/helpers/esm/_class_apply_descriptor_get.js
function _class_apply_descriptor_get(receiver, descriptor) {
	if (descriptor.get) return descriptor.get.call(receiver);
	return descriptor.value;
}

//#endregion
//#region ../../node_modules/.pnpm/@swc+helpers@0.5.17/node_modules/@swc/helpers/esm/_class_extract_field_descriptor.js
function _class_extract_field_descriptor(receiver, privateMap, action) {
	if (!privateMap.has(receiver)) throw new TypeError("attempted to " + action + " private field on non-instance");
	return privateMap.get(receiver);
}

//#endregion
//#region ../../node_modules/.pnpm/@swc+helpers@0.5.17/node_modules/@swc/helpers/esm/_class_private_field_get.js
function _class_private_field_get(receiver, privateMap) {
	return _class_apply_descriptor_get(receiver, _class_extract_field_descriptor(receiver, privateMap, "get"));
}

//#endregion
//#region ../../node_modules/.pnpm/@swc+helpers@0.5.17/node_modules/@swc/helpers/esm/_class_apply_descriptor_set.js
function _class_apply_descriptor_set(receiver, descriptor, value) {
	if (descriptor.set) descriptor.set.call(receiver, value);
	else {
		if (!descriptor.writable) throw new TypeError("attempted to set read only private field");
		descriptor.value = value;
	}
}

//#endregion
//#region ../../node_modules/.pnpm/@swc+helpers@0.5.17/node_modules/@swc/helpers/esm/_class_private_field_set.js
function _class_private_field_set(receiver, privateMap, value) {
	_class_apply_descriptor_set(receiver, _class_extract_field_descriptor(receiver, privateMap, "set"), value);
	return value;
}

//#endregion
//#region ../../node_modules/.pnpm/@react-aria+interactions@3.25.6_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/@react-aria/interactions/dist/usePress.mjs
var import_react_dom = /* @__PURE__ */ __toESM(require_react_dom(), 1);
function $f6c31cce2adf654f$var$usePressResponderContext(props) {
	let context = (0, import_react.useContext)($ae1eeba8b9eafd08$export$5165eccb35aaadb5);
	if (context) {
		let { register,...contextProps } = context;
		props = $3ef42575df84b30b$export$9d1611c77c2fe928(contextProps, props);
		register();
	}
	$e7801be82b4b2a53$export$4debdb1a3f0fa79e(context, props.ref);
	return props;
}
var $f6c31cce2adf654f$var$_shouldStopPropagation = /* @__PURE__ */ new WeakMap();
var $f6c31cce2adf654f$var$PressEvent = class {
	continuePropagation() {
		_class_private_field_set(this, $f6c31cce2adf654f$var$_shouldStopPropagation, false);
	}
	get shouldStopPropagation() {
		return _class_private_field_get(this, $f6c31cce2adf654f$var$_shouldStopPropagation);
	}
	constructor(type, pointerType, originalEvent, state) {
		_class_private_field_init(this, $f6c31cce2adf654f$var$_shouldStopPropagation, {
			writable: true,
			value: void 0
		});
		_class_private_field_set(this, $f6c31cce2adf654f$var$_shouldStopPropagation, true);
		var _state_target;
		let currentTarget = (_state_target = state === null || state === void 0 ? void 0 : state.target) !== null && _state_target !== void 0 ? _state_target : originalEvent.currentTarget;
		const rect = currentTarget === null || currentTarget === void 0 ? void 0 : currentTarget.getBoundingClientRect();
		let x$1, y$1 = 0;
		let clientX, clientY = null;
		if (originalEvent.clientX != null && originalEvent.clientY != null) {
			clientX = originalEvent.clientX;
			clientY = originalEvent.clientY;
		}
		if (rect) if (clientX != null && clientY != null) {
			x$1 = clientX - rect.left;
			y$1 = clientY - rect.top;
		} else {
			x$1 = rect.width / 2;
			y$1 = rect.height / 2;
		}
		this.type = type;
		this.pointerType = pointerType;
		this.target = originalEvent.currentTarget;
		this.shiftKey = originalEvent.shiftKey;
		this.metaKey = originalEvent.metaKey;
		this.ctrlKey = originalEvent.ctrlKey;
		this.altKey = originalEvent.altKey;
		this.x = x$1;
		this.y = y$1;
	}
};
const $f6c31cce2adf654f$var$LINK_CLICKED = Symbol("linkClicked");
const $f6c31cce2adf654f$var$STYLE_ID = "react-aria-pressable-style";
const $f6c31cce2adf654f$var$PRESSABLE_ATTRIBUTE = "data-react-aria-pressable";
function $f6c31cce2adf654f$export$45712eceda6fad21(props) {
	let { onPress, onPressChange, onPressStart, onPressEnd, onPressUp, onClick, isDisabled, isPressed: isPressedProp, preventFocusOnPress, shouldCancelOnPointerExit, allowTextSelectionOnPress, ref: domRef,...domProps } = $f6c31cce2adf654f$var$usePressResponderContext(props);
	let [isPressed, setPressed] = (0, import_react.useState)(false);
	let ref = (0, import_react.useRef)({
		isPressed: false,
		ignoreEmulatedMouseEvents: false,
		didFirePressStart: false,
		isTriggeringEvent: false,
		activePointerId: null,
		target: null,
		isOverTarget: false,
		pointerType: null,
		disposables: []
	});
	let { addGlobalListener, removeAllGlobalListeners } = $03deb23ff14920c4$export$4eaf04e54aa8eed6();
	let triggerPressStart = $8ae05eaa5c114e9c$export$7f54fc3180508a52((originalEvent, pointerType) => {
		let state = ref.current;
		if (isDisabled || state.didFirePressStart) return false;
		let shouldStopPropagation = true;
		state.isTriggeringEvent = true;
		if (onPressStart) {
			let event = new $f6c31cce2adf654f$var$PressEvent("pressstart", pointerType, originalEvent);
			onPressStart(event);
			shouldStopPropagation = event.shouldStopPropagation;
		}
		if (onPressChange) onPressChange(true);
		state.isTriggeringEvent = false;
		state.didFirePressStart = true;
		setPressed(true);
		return shouldStopPropagation;
	});
	let triggerPressEnd = $8ae05eaa5c114e9c$export$7f54fc3180508a52((originalEvent, pointerType, wasPressed = true) => {
		let state = ref.current;
		if (!state.didFirePressStart) return false;
		state.didFirePressStart = false;
		state.isTriggeringEvent = true;
		let shouldStopPropagation = true;
		if (onPressEnd) {
			let event = new $f6c31cce2adf654f$var$PressEvent("pressend", pointerType, originalEvent);
			onPressEnd(event);
			shouldStopPropagation = event.shouldStopPropagation;
		}
		if (onPressChange) onPressChange(false);
		setPressed(false);
		if (onPress && wasPressed && !isDisabled) {
			let event = new $f6c31cce2adf654f$var$PressEvent("press", pointerType, originalEvent);
			onPress(event);
			shouldStopPropagation && (shouldStopPropagation = event.shouldStopPropagation);
		}
		state.isTriggeringEvent = false;
		return shouldStopPropagation;
	});
	let triggerPressUp = $8ae05eaa5c114e9c$export$7f54fc3180508a52((originalEvent, pointerType) => {
		let state = ref.current;
		if (isDisabled) return false;
		if (onPressUp) {
			state.isTriggeringEvent = true;
			let event = new $f6c31cce2adf654f$var$PressEvent("pressup", pointerType, originalEvent);
			onPressUp(event);
			state.isTriggeringEvent = false;
			return event.shouldStopPropagation;
		}
		return true;
	});
	let cancel = $8ae05eaa5c114e9c$export$7f54fc3180508a52((e) => {
		let state = ref.current;
		if (state.isPressed && state.target) {
			if (state.didFirePressStart && state.pointerType != null) triggerPressEnd($f6c31cce2adf654f$var$createEvent(state.target, e), state.pointerType, false);
			state.isPressed = false;
			state.isOverTarget = false;
			state.activePointerId = null;
			state.pointerType = null;
			removeAllGlobalListeners();
			if (!allowTextSelectionOnPress) $14c0b72509d70225$export$b0d6fa1ab32e3295(state.target);
			for (let dispose of state.disposables) dispose();
			state.disposables = [];
		}
	});
	let cancelOnPointerExit = $8ae05eaa5c114e9c$export$7f54fc3180508a52((e) => {
		if (shouldCancelOnPointerExit) cancel(e);
	});
	let triggerClick = $8ae05eaa5c114e9c$export$7f54fc3180508a52((e) => {
		if (isDisabled) return;
		onClick === null || onClick === void 0 || onClick(e);
	});
	let triggerSyntheticClick = $8ae05eaa5c114e9c$export$7f54fc3180508a52((e, target) => {
		if (isDisabled) return;
		if (onClick) {
			let event = new MouseEvent("click", e);
			$8a9cb279dc87e130$export$c2b7abe5d61ec696(event, target);
			onClick($8a9cb279dc87e130$export$525bc4921d56d4a(event));
		}
	});
	let pressProps = (0, import_react.useMemo)(() => {
		let state = ref.current;
		let pressProps$1 = {
			onKeyDown(e) {
				if ($f6c31cce2adf654f$var$isValidKeyboardEvent(e.nativeEvent, e.currentTarget) && $d4ee10de306f2510$export$4282f70798064fe0(e.currentTarget, $d4ee10de306f2510$export$e58f029f0fbfdb29(e.nativeEvent))) {
					var _state_metaKeyEvents;
					if ($f6c31cce2adf654f$var$shouldPreventDefaultKeyboard($d4ee10de306f2510$export$e58f029f0fbfdb29(e.nativeEvent), e.key)) e.preventDefault();
					let shouldStopPropagation = true;
					if (!state.isPressed && !e.repeat) {
						state.target = e.currentTarget;
						state.isPressed = true;
						state.pointerType = "keyboard";
						shouldStopPropagation = triggerPressStart(e, "keyboard");
						let originalTarget = e.currentTarget;
						let pressUp = (e$1) => {
							if ($f6c31cce2adf654f$var$isValidKeyboardEvent(e$1, originalTarget) && !e$1.repeat && $d4ee10de306f2510$export$4282f70798064fe0(originalTarget, $d4ee10de306f2510$export$e58f029f0fbfdb29(e$1)) && state.target) triggerPressUp($f6c31cce2adf654f$var$createEvent(state.target, e$1), "keyboard");
						};
						addGlobalListener($431fbd86ca7dc216$export$b204af158042fbac(e.currentTarget), "keyup", $ff5963eb1fccf552$export$e08e3b67e392101e(pressUp, onKeyUp), true);
					}
					if (shouldStopPropagation) e.stopPropagation();
					if (e.metaKey && $c87311424ea30a05$export$9ac100e40613ea10()) (_state_metaKeyEvents = state.metaKeyEvents) === null || _state_metaKeyEvents === void 0 || _state_metaKeyEvents.set(e.key, e.nativeEvent);
				} else if (e.key === "Meta") state.metaKeyEvents = /* @__PURE__ */ new Map();
			},
			onClick(e) {
				if (e && !$d4ee10de306f2510$export$4282f70798064fe0(e.currentTarget, $d4ee10de306f2510$export$e58f029f0fbfdb29(e.nativeEvent))) return;
				if (e && e.button === 0 && !state.isTriggeringEvent && !$ea8dcbcb9ea1b556$export$95185d699e05d4d7.isOpening) {
					let shouldStopPropagation = true;
					if (isDisabled) e.preventDefault();
					if (!state.ignoreEmulatedMouseEvents && !state.isPressed && (state.pointerType === "virtual" || $6a7db85432448f7f$export$60278871457622de(e.nativeEvent))) {
						let stopPressStart = triggerPressStart(e, "virtual");
						let stopPressUp = triggerPressUp(e, "virtual");
						let stopPressEnd = triggerPressEnd(e, "virtual");
						triggerClick(e);
						shouldStopPropagation = stopPressStart && stopPressUp && stopPressEnd;
					} else if (state.isPressed && state.pointerType !== "keyboard") {
						let pointerType = state.pointerType || e.nativeEvent.pointerType || "virtual";
						let stopPressUp = triggerPressUp($f6c31cce2adf654f$var$createEvent(e.currentTarget, e), pointerType);
						let stopPressEnd = triggerPressEnd($f6c31cce2adf654f$var$createEvent(e.currentTarget, e), pointerType, true);
						shouldStopPropagation = stopPressUp && stopPressEnd;
						state.isOverTarget = false;
						triggerClick(e);
						cancel(e);
					}
					state.ignoreEmulatedMouseEvents = false;
					if (shouldStopPropagation) e.stopPropagation();
				}
			}
		};
		let onKeyUp = (e) => {
			var _state_metaKeyEvents;
			if (state.isPressed && state.target && $f6c31cce2adf654f$var$isValidKeyboardEvent(e, state.target)) {
				var _state_metaKeyEvents1;
				if ($f6c31cce2adf654f$var$shouldPreventDefaultKeyboard($d4ee10de306f2510$export$e58f029f0fbfdb29(e), e.key)) e.preventDefault();
				let target = $d4ee10de306f2510$export$e58f029f0fbfdb29(e);
				let wasPressed = $d4ee10de306f2510$export$4282f70798064fe0(state.target, $d4ee10de306f2510$export$e58f029f0fbfdb29(e));
				triggerPressEnd($f6c31cce2adf654f$var$createEvent(state.target, e), "keyboard", wasPressed);
				if (wasPressed) triggerSyntheticClick(e, state.target);
				removeAllGlobalListeners();
				if (e.key !== "Enter" && $f6c31cce2adf654f$var$isHTMLAnchorLink(state.target) && $d4ee10de306f2510$export$4282f70798064fe0(state.target, target) && !e[$f6c31cce2adf654f$var$LINK_CLICKED]) {
					e[$f6c31cce2adf654f$var$LINK_CLICKED] = true;
					$ea8dcbcb9ea1b556$export$95185d699e05d4d7(state.target, e, false);
				}
				state.isPressed = false;
				(_state_metaKeyEvents1 = state.metaKeyEvents) === null || _state_metaKeyEvents1 === void 0 || _state_metaKeyEvents1.delete(e.key);
			} else if (e.key === "Meta" && ((_state_metaKeyEvents = state.metaKeyEvents) === null || _state_metaKeyEvents === void 0 ? void 0 : _state_metaKeyEvents.size)) {
				var _state_target;
				let events = state.metaKeyEvents;
				state.metaKeyEvents = void 0;
				for (let event of events.values()) (_state_target = state.target) === null || _state_target === void 0 || _state_target.dispatchEvent(new KeyboardEvent("keyup", event));
			}
		};
		if (typeof PointerEvent !== "undefined") {
			pressProps$1.onPointerDown = (e) => {
				if (e.button !== 0 || !$d4ee10de306f2510$export$4282f70798064fe0(e.currentTarget, $d4ee10de306f2510$export$e58f029f0fbfdb29(e.nativeEvent))) return;
				if ($6a7db85432448f7f$export$29bf1b5f2c56cf63(e.nativeEvent)) {
					state.pointerType = "virtual";
					return;
				}
				state.pointerType = e.pointerType;
				let shouldStopPropagation = true;
				if (!state.isPressed) {
					state.isPressed = true;
					state.isOverTarget = true;
					state.activePointerId = e.pointerId;
					state.target = e.currentTarget;
					if (!allowTextSelectionOnPress) $14c0b72509d70225$export$16a4697467175487(state.target);
					shouldStopPropagation = triggerPressStart(e, state.pointerType);
					let target = $d4ee10de306f2510$export$e58f029f0fbfdb29(e.nativeEvent);
					if ("releasePointerCapture" in target) target.releasePointerCapture(e.pointerId);
					addGlobalListener($431fbd86ca7dc216$export$b204af158042fbac(e.currentTarget), "pointerup", onPointerUp, false);
					addGlobalListener($431fbd86ca7dc216$export$b204af158042fbac(e.currentTarget), "pointercancel", onPointerCancel, false);
				}
				if (shouldStopPropagation) e.stopPropagation();
			};
			pressProps$1.onMouseDown = (e) => {
				if (!$d4ee10de306f2510$export$4282f70798064fe0(e.currentTarget, $d4ee10de306f2510$export$e58f029f0fbfdb29(e.nativeEvent))) return;
				if (e.button === 0) {
					if (preventFocusOnPress) {
						let dispose = $8a9cb279dc87e130$export$cabe61c495ee3649(e.target);
						if (dispose) state.disposables.push(dispose);
					}
					e.stopPropagation();
				}
			};
			pressProps$1.onPointerUp = (e) => {
				if (!$d4ee10de306f2510$export$4282f70798064fe0(e.currentTarget, $d4ee10de306f2510$export$e58f029f0fbfdb29(e.nativeEvent)) || state.pointerType === "virtual") return;
				if (e.button === 0 && !state.isPressed) triggerPressUp(e, state.pointerType || e.pointerType);
			};
			pressProps$1.onPointerEnter = (e) => {
				if (e.pointerId === state.activePointerId && state.target && !state.isOverTarget && state.pointerType != null) {
					state.isOverTarget = true;
					triggerPressStart($f6c31cce2adf654f$var$createEvent(state.target, e), state.pointerType);
				}
			};
			pressProps$1.onPointerLeave = (e) => {
				if (e.pointerId === state.activePointerId && state.target && state.isOverTarget && state.pointerType != null) {
					state.isOverTarget = false;
					triggerPressEnd($f6c31cce2adf654f$var$createEvent(state.target, e), state.pointerType, false);
					cancelOnPointerExit(e);
				}
			};
			let onPointerUp = (e) => {
				if (e.pointerId === state.activePointerId && state.isPressed && e.button === 0 && state.target) {
					if ($d4ee10de306f2510$export$4282f70798064fe0(state.target, $d4ee10de306f2510$export$e58f029f0fbfdb29(e)) && state.pointerType != null) {
						let clicked = false;
						let timeout = setTimeout(() => {
							if (state.isPressed && state.target instanceof HTMLElement) if (clicked) cancel(e);
							else {
								$7215afc6de606d6b$export$de79e2c695e052f3(state.target);
								state.target.click();
							}
						}, 80);
						addGlobalListener(e.currentTarget, "click", () => clicked = true, true);
						state.disposables.push(() => clearTimeout(timeout));
					} else cancel(e);
					state.isOverTarget = false;
				}
			};
			let onPointerCancel = (e) => {
				cancel(e);
			};
			pressProps$1.onDragStart = (e) => {
				if (!$d4ee10de306f2510$export$4282f70798064fe0(e.currentTarget, $d4ee10de306f2510$export$e58f029f0fbfdb29(e.nativeEvent))) return;
				cancel(e);
			};
		} else if (process.env.NODE_ENV === "test") {
			pressProps$1.onMouseDown = (e) => {
				if (e.button !== 0 || !$d4ee10de306f2510$export$4282f70798064fe0(e.currentTarget, $d4ee10de306f2510$export$e58f029f0fbfdb29(e.nativeEvent))) return;
				if (state.ignoreEmulatedMouseEvents) {
					e.stopPropagation();
					return;
				}
				state.isPressed = true;
				state.isOverTarget = true;
				state.target = e.currentTarget;
				state.pointerType = $6a7db85432448f7f$export$60278871457622de(e.nativeEvent) ? "virtual" : "mouse";
				if ((0, import_react_dom.flushSync)(() => triggerPressStart(e, state.pointerType))) e.stopPropagation();
				if (preventFocusOnPress) {
					let dispose = $8a9cb279dc87e130$export$cabe61c495ee3649(e.target);
					if (dispose) state.disposables.push(dispose);
				}
				addGlobalListener($431fbd86ca7dc216$export$b204af158042fbac(e.currentTarget), "mouseup", onMouseUp, false);
			};
			pressProps$1.onMouseEnter = (e) => {
				if (!$d4ee10de306f2510$export$4282f70798064fe0(e.currentTarget, $d4ee10de306f2510$export$e58f029f0fbfdb29(e.nativeEvent))) return;
				let shouldStopPropagation = true;
				if (state.isPressed && !state.ignoreEmulatedMouseEvents && state.pointerType != null) {
					state.isOverTarget = true;
					shouldStopPropagation = triggerPressStart(e, state.pointerType);
				}
				if (shouldStopPropagation) e.stopPropagation();
			};
			pressProps$1.onMouseLeave = (e) => {
				if (!$d4ee10de306f2510$export$4282f70798064fe0(e.currentTarget, $d4ee10de306f2510$export$e58f029f0fbfdb29(e.nativeEvent))) return;
				let shouldStopPropagation = true;
				if (state.isPressed && !state.ignoreEmulatedMouseEvents && state.pointerType != null) {
					state.isOverTarget = false;
					shouldStopPropagation = triggerPressEnd(e, state.pointerType, false);
					cancelOnPointerExit(e);
				}
				if (shouldStopPropagation) e.stopPropagation();
			};
			pressProps$1.onMouseUp = (e) => {
				if (!$d4ee10de306f2510$export$4282f70798064fe0(e.currentTarget, $d4ee10de306f2510$export$e58f029f0fbfdb29(e.nativeEvent))) return;
				if (!state.ignoreEmulatedMouseEvents && e.button === 0 && !state.isPressed) triggerPressUp(e, state.pointerType || "mouse");
			};
			let onMouseUp = (e) => {
				if (e.button !== 0) return;
				if (state.ignoreEmulatedMouseEvents) {
					state.ignoreEmulatedMouseEvents = false;
					return;
				}
				if (state.target && state.target.contains(e.target) && state.pointerType != null);
				else cancel(e);
				state.isOverTarget = false;
			};
			pressProps$1.onTouchStart = (e) => {
				if (!$d4ee10de306f2510$export$4282f70798064fe0(e.currentTarget, $d4ee10de306f2510$export$e58f029f0fbfdb29(e.nativeEvent))) return;
				let touch = $f6c31cce2adf654f$var$getTouchFromEvent(e.nativeEvent);
				if (!touch) return;
				state.activePointerId = touch.identifier;
				state.ignoreEmulatedMouseEvents = true;
				state.isOverTarget = true;
				state.isPressed = true;
				state.target = e.currentTarget;
				state.pointerType = "touch";
				if (!allowTextSelectionOnPress) $14c0b72509d70225$export$16a4697467175487(state.target);
				if (triggerPressStart($f6c31cce2adf654f$var$createTouchEvent(state.target, e), state.pointerType)) e.stopPropagation();
				addGlobalListener($431fbd86ca7dc216$export$f21a1ffae260145a(e.currentTarget), "scroll", onScroll, true);
			};
			pressProps$1.onTouchMove = (e) => {
				if (!$d4ee10de306f2510$export$4282f70798064fe0(e.currentTarget, $d4ee10de306f2510$export$e58f029f0fbfdb29(e.nativeEvent))) return;
				if (!state.isPressed) {
					e.stopPropagation();
					return;
				}
				let touch = $f6c31cce2adf654f$var$getTouchById(e.nativeEvent, state.activePointerId);
				let shouldStopPropagation = true;
				if (touch && $f6c31cce2adf654f$var$isOverTarget(touch, e.currentTarget)) {
					if (!state.isOverTarget && state.pointerType != null) {
						state.isOverTarget = true;
						shouldStopPropagation = triggerPressStart($f6c31cce2adf654f$var$createTouchEvent(state.target, e), state.pointerType);
					}
				} else if (state.isOverTarget && state.pointerType != null) {
					state.isOverTarget = false;
					shouldStopPropagation = triggerPressEnd($f6c31cce2adf654f$var$createTouchEvent(state.target, e), state.pointerType, false);
					cancelOnPointerExit($f6c31cce2adf654f$var$createTouchEvent(state.target, e));
				}
				if (shouldStopPropagation) e.stopPropagation();
			};
			pressProps$1.onTouchEnd = (e) => {
				if (!$d4ee10de306f2510$export$4282f70798064fe0(e.currentTarget, $d4ee10de306f2510$export$e58f029f0fbfdb29(e.nativeEvent))) return;
				if (!state.isPressed) {
					e.stopPropagation();
					return;
				}
				let touch = $f6c31cce2adf654f$var$getTouchById(e.nativeEvent, state.activePointerId);
				let shouldStopPropagation = true;
				if (touch && $f6c31cce2adf654f$var$isOverTarget(touch, e.currentTarget) && state.pointerType != null) {
					triggerPressUp($f6c31cce2adf654f$var$createTouchEvent(state.target, e), state.pointerType);
					shouldStopPropagation = triggerPressEnd($f6c31cce2adf654f$var$createTouchEvent(state.target, e), state.pointerType);
					triggerSyntheticClick(e.nativeEvent, state.target);
				} else if (state.isOverTarget && state.pointerType != null) shouldStopPropagation = triggerPressEnd($f6c31cce2adf654f$var$createTouchEvent(state.target, e), state.pointerType, false);
				if (shouldStopPropagation) e.stopPropagation();
				state.isPressed = false;
				state.activePointerId = null;
				state.isOverTarget = false;
				state.ignoreEmulatedMouseEvents = true;
				if (state.target && !allowTextSelectionOnPress) $14c0b72509d70225$export$b0d6fa1ab32e3295(state.target);
				removeAllGlobalListeners();
			};
			pressProps$1.onTouchCancel = (e) => {
				if (!$d4ee10de306f2510$export$4282f70798064fe0(e.currentTarget, $d4ee10de306f2510$export$e58f029f0fbfdb29(e.nativeEvent))) return;
				e.stopPropagation();
				if (state.isPressed) cancel($f6c31cce2adf654f$var$createTouchEvent(state.target, e));
			};
			let onScroll = (e) => {
				if (state.isPressed && $d4ee10de306f2510$export$4282f70798064fe0($d4ee10de306f2510$export$e58f029f0fbfdb29(e), state.target)) cancel({
					currentTarget: state.target,
					shiftKey: false,
					ctrlKey: false,
					metaKey: false,
					altKey: false
				});
			};
			pressProps$1.onDragStart = (e) => {
				if (!$d4ee10de306f2510$export$4282f70798064fe0(e.currentTarget, $d4ee10de306f2510$export$e58f029f0fbfdb29(e.nativeEvent))) return;
				cancel(e);
			};
		}
		return pressProps$1;
	}, [
		addGlobalListener,
		isDisabled,
		preventFocusOnPress,
		removeAllGlobalListeners,
		allowTextSelectionOnPress,
		cancel,
		cancelOnPointerExit,
		triggerPressEnd,
		triggerPressStart,
		triggerPressUp,
		triggerClick,
		triggerSyntheticClick
	]);
	(0, import_react.useEffect)(() => {
		if (!domRef || process.env.NODE_ENV === "test") return;
		const ownerDocument = $431fbd86ca7dc216$export$b204af158042fbac(domRef.current);
		if (!ownerDocument || !ownerDocument.head || ownerDocument.getElementById($f6c31cce2adf654f$var$STYLE_ID)) return;
		const style = ownerDocument.createElement("style");
		style.id = $f6c31cce2adf654f$var$STYLE_ID;
		style.textContent = `
@layer {
  [${$f6c31cce2adf654f$var$PRESSABLE_ATTRIBUTE}] {
    touch-action: pan-x pan-y pinch-zoom;
  }
}
    `.trim();
		ownerDocument.head.prepend(style);
	}, [domRef]);
	(0, import_react.useEffect)(() => {
		let state = ref.current;
		return () => {
			var _state_target;
			if (!allowTextSelectionOnPress) $14c0b72509d70225$export$b0d6fa1ab32e3295((_state_target = state.target) !== null && _state_target !== void 0 ? _state_target : void 0);
			for (let dispose of state.disposables) dispose();
			state.disposables = [];
		};
	}, [allowTextSelectionOnPress]);
	return {
		isPressed: isPressedProp || isPressed,
		pressProps: $3ef42575df84b30b$export$9d1611c77c2fe928(domProps, pressProps, { [$f6c31cce2adf654f$var$PRESSABLE_ATTRIBUTE]: true })
	};
}
function $f6c31cce2adf654f$var$isHTMLAnchorLink(target) {
	return target.tagName === "A" && target.hasAttribute("href");
}
function $f6c31cce2adf654f$var$isValidKeyboardEvent(event, currentTarget) {
	const { key, code } = event;
	const element = currentTarget;
	const role = element.getAttribute("role");
	return (key === "Enter" || key === " " || key === "Spacebar" || code === "Space") && !(element instanceof $431fbd86ca7dc216$export$f21a1ffae260145a(element).HTMLInputElement && !$f6c31cce2adf654f$var$isValidInputKey(element, key) || element instanceof $431fbd86ca7dc216$export$f21a1ffae260145a(element).HTMLTextAreaElement || element.isContentEditable) && !((role === "link" || !role && $f6c31cce2adf654f$var$isHTMLAnchorLink(element)) && key !== "Enter");
}
function $f6c31cce2adf654f$var$getTouchFromEvent(event) {
	const { targetTouches } = event;
	if (targetTouches.length > 0) return targetTouches[0];
	return null;
}
function $f6c31cce2adf654f$var$getTouchById(event, pointerId) {
	const changedTouches = event.changedTouches;
	for (let i$1 = 0; i$1 < changedTouches.length; i$1++) {
		const touch = changedTouches[i$1];
		if (touch.identifier === pointerId) return touch;
	}
	return null;
}
function $f6c31cce2adf654f$var$createTouchEvent(target, e) {
	let clientX = 0;
	let clientY = 0;
	if (e.targetTouches && e.targetTouches.length === 1) {
		clientX = e.targetTouches[0].clientX;
		clientY = e.targetTouches[0].clientY;
	}
	return {
		currentTarget: target,
		shiftKey: e.shiftKey,
		ctrlKey: e.ctrlKey,
		metaKey: e.metaKey,
		altKey: e.altKey,
		clientX,
		clientY
	};
}
function $f6c31cce2adf654f$var$createEvent(target, e) {
	let clientX = e.clientX;
	let clientY = e.clientY;
	return {
		currentTarget: target,
		shiftKey: e.shiftKey,
		ctrlKey: e.ctrlKey,
		metaKey: e.metaKey,
		altKey: e.altKey,
		clientX,
		clientY
	};
}
function $f6c31cce2adf654f$var$getPointClientRect(point) {
	let offsetX = 0;
	let offsetY = 0;
	if (point.width !== void 0) offsetX = point.width / 2;
	else if (point.radiusX !== void 0) offsetX = point.radiusX;
	if (point.height !== void 0) offsetY = point.height / 2;
	else if (point.radiusY !== void 0) offsetY = point.radiusY;
	return {
		top: point.clientY - offsetY,
		right: point.clientX + offsetX,
		bottom: point.clientY + offsetY,
		left: point.clientX - offsetX
	};
}
function $f6c31cce2adf654f$var$areRectanglesOverlapping(a$1, b) {
	if (a$1.left > b.right || b.left > a$1.right) return false;
	if (a$1.top > b.bottom || b.top > a$1.bottom) return false;
	return true;
}
function $f6c31cce2adf654f$var$isOverTarget(point, target) {
	return $f6c31cce2adf654f$var$areRectanglesOverlapping(target.getBoundingClientRect(), $f6c31cce2adf654f$var$getPointClientRect(point));
}
function $f6c31cce2adf654f$var$shouldPreventDefaultUp(target) {
	if (target instanceof HTMLInputElement) return false;
	if (target instanceof HTMLButtonElement) return target.type !== "submit" && target.type !== "reset";
	if ($f6c31cce2adf654f$var$isHTMLAnchorLink(target)) return false;
	return true;
}
function $f6c31cce2adf654f$var$shouldPreventDefaultKeyboard(target, key) {
	if (target instanceof HTMLInputElement) return !$f6c31cce2adf654f$var$isValidInputKey(target, key);
	return $f6c31cce2adf654f$var$shouldPreventDefaultUp(target);
}
const $f6c31cce2adf654f$var$nonTextInputTypes = new Set([
	"checkbox",
	"radio",
	"range",
	"color",
	"file",
	"image",
	"button",
	"submit",
	"reset"
]);
function $f6c31cce2adf654f$var$isValidInputKey(target, key) {
	return target.type === "checkbox" || target.type === "radio" ? key === " " : $f6c31cce2adf654f$var$nonTextInputTypes.has(target.type);
}

//#endregion
//#region ../../node_modules/.pnpm/@react-aria+interactions@3.25.6_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/@react-aria/interactions/dist/useFocusVisible.mjs
let $507fabe10e71c6fb$var$currentModality = null;
let $507fabe10e71c6fb$var$changeHandlers = /* @__PURE__ */ new Set();
let $507fabe10e71c6fb$export$d90243b58daecda7 = /* @__PURE__ */ new Map();
let $507fabe10e71c6fb$var$hasEventBeforeFocus = false;
let $507fabe10e71c6fb$var$hasBlurredWindowRecently = false;
const $507fabe10e71c6fb$var$FOCUS_VISIBLE_INPUT_KEYS = {
	Tab: true,
	Escape: true
};
function $507fabe10e71c6fb$var$triggerChangeHandlers(modality, e) {
	for (let handler of $507fabe10e71c6fb$var$changeHandlers) handler(modality, e);
}
/**
* Helper function to determine if a KeyboardEvent is unmodified and could make keyboard focus styles visible.
*/ function $507fabe10e71c6fb$var$isValidKey(e) {
	return !(e.metaKey || !$c87311424ea30a05$export$9ac100e40613ea10() && e.altKey || e.ctrlKey || e.key === "Control" || e.key === "Shift" || e.key === "Meta");
}
function $507fabe10e71c6fb$var$handleKeyboardEvent(e) {
	$507fabe10e71c6fb$var$hasEventBeforeFocus = true;
	if ($507fabe10e71c6fb$var$isValidKey(e)) {
		$507fabe10e71c6fb$var$currentModality = "keyboard";
		$507fabe10e71c6fb$var$triggerChangeHandlers("keyboard", e);
	}
}
function $507fabe10e71c6fb$var$handlePointerEvent(e) {
	$507fabe10e71c6fb$var$currentModality = "pointer";
	if (e.type === "mousedown" || e.type === "pointerdown") {
		$507fabe10e71c6fb$var$hasEventBeforeFocus = true;
		$507fabe10e71c6fb$var$triggerChangeHandlers("pointer", e);
	}
}
function $507fabe10e71c6fb$var$handleClickEvent(e) {
	if ($6a7db85432448f7f$export$60278871457622de(e)) {
		$507fabe10e71c6fb$var$hasEventBeforeFocus = true;
		$507fabe10e71c6fb$var$currentModality = "virtual";
	}
}
function $507fabe10e71c6fb$var$handleFocusEvent(e) {
	if (e.target === window || e.target === document || $8a9cb279dc87e130$export$fda7da73ab5d4c48 || !e.isTrusted) return;
	if (!$507fabe10e71c6fb$var$hasEventBeforeFocus && !$507fabe10e71c6fb$var$hasBlurredWindowRecently) {
		$507fabe10e71c6fb$var$currentModality = "virtual";
		$507fabe10e71c6fb$var$triggerChangeHandlers("virtual", e);
	}
	$507fabe10e71c6fb$var$hasEventBeforeFocus = false;
	$507fabe10e71c6fb$var$hasBlurredWindowRecently = false;
}
function $507fabe10e71c6fb$var$handleWindowBlur() {
	if ($8a9cb279dc87e130$export$fda7da73ab5d4c48) return;
	$507fabe10e71c6fb$var$hasEventBeforeFocus = false;
	$507fabe10e71c6fb$var$hasBlurredWindowRecently = true;
}
/**
* Setup global event listeners to control when keyboard focus style should be visible.
*/ function $507fabe10e71c6fb$var$setupGlobalFocusEvents(element) {
	if (typeof window === "undefined" || typeof document === "undefined" || $507fabe10e71c6fb$export$d90243b58daecda7.get($431fbd86ca7dc216$export$f21a1ffae260145a(element))) return;
	const windowObject = $431fbd86ca7dc216$export$f21a1ffae260145a(element);
	const documentObject = $431fbd86ca7dc216$export$b204af158042fbac(element);
	let focus = windowObject.HTMLElement.prototype.focus;
	windowObject.HTMLElement.prototype.focus = function() {
		$507fabe10e71c6fb$var$hasEventBeforeFocus = true;
		focus.apply(this, arguments);
	};
	documentObject.addEventListener("keydown", $507fabe10e71c6fb$var$handleKeyboardEvent, true);
	documentObject.addEventListener("keyup", $507fabe10e71c6fb$var$handleKeyboardEvent, true);
	documentObject.addEventListener("click", $507fabe10e71c6fb$var$handleClickEvent, true);
	windowObject.addEventListener("focus", $507fabe10e71c6fb$var$handleFocusEvent, true);
	windowObject.addEventListener("blur", $507fabe10e71c6fb$var$handleWindowBlur, false);
	if (typeof PointerEvent !== "undefined") {
		documentObject.addEventListener("pointerdown", $507fabe10e71c6fb$var$handlePointerEvent, true);
		documentObject.addEventListener("pointermove", $507fabe10e71c6fb$var$handlePointerEvent, true);
		documentObject.addEventListener("pointerup", $507fabe10e71c6fb$var$handlePointerEvent, true);
	} else if (process.env.NODE_ENV === "test") {
		documentObject.addEventListener("mousedown", $507fabe10e71c6fb$var$handlePointerEvent, true);
		documentObject.addEventListener("mousemove", $507fabe10e71c6fb$var$handlePointerEvent, true);
		documentObject.addEventListener("mouseup", $507fabe10e71c6fb$var$handlePointerEvent, true);
	}
	windowObject.addEventListener("beforeunload", () => {
		$507fabe10e71c6fb$var$tearDownWindowFocusTracking(element);
	}, { once: true });
	$507fabe10e71c6fb$export$d90243b58daecda7.set(windowObject, { focus });
}
const $507fabe10e71c6fb$var$tearDownWindowFocusTracking = (element, loadListener) => {
	const windowObject = $431fbd86ca7dc216$export$f21a1ffae260145a(element);
	const documentObject = $431fbd86ca7dc216$export$b204af158042fbac(element);
	if (loadListener) documentObject.removeEventListener("DOMContentLoaded", loadListener);
	if (!$507fabe10e71c6fb$export$d90243b58daecda7.has(windowObject)) return;
	windowObject.HTMLElement.prototype.focus = $507fabe10e71c6fb$export$d90243b58daecda7.get(windowObject).focus;
	documentObject.removeEventListener("keydown", $507fabe10e71c6fb$var$handleKeyboardEvent, true);
	documentObject.removeEventListener("keyup", $507fabe10e71c6fb$var$handleKeyboardEvent, true);
	documentObject.removeEventListener("click", $507fabe10e71c6fb$var$handleClickEvent, true);
	windowObject.removeEventListener("focus", $507fabe10e71c6fb$var$handleFocusEvent, true);
	windowObject.removeEventListener("blur", $507fabe10e71c6fb$var$handleWindowBlur, false);
	if (typeof PointerEvent !== "undefined") {
		documentObject.removeEventListener("pointerdown", $507fabe10e71c6fb$var$handlePointerEvent, true);
		documentObject.removeEventListener("pointermove", $507fabe10e71c6fb$var$handlePointerEvent, true);
		documentObject.removeEventListener("pointerup", $507fabe10e71c6fb$var$handlePointerEvent, true);
	} else if (process.env.NODE_ENV === "test") {
		documentObject.removeEventListener("mousedown", $507fabe10e71c6fb$var$handlePointerEvent, true);
		documentObject.removeEventListener("mousemove", $507fabe10e71c6fb$var$handlePointerEvent, true);
		documentObject.removeEventListener("mouseup", $507fabe10e71c6fb$var$handlePointerEvent, true);
	}
	$507fabe10e71c6fb$export$d90243b58daecda7.delete(windowObject);
};
function $507fabe10e71c6fb$export$2f1888112f558a7d(element) {
	const documentObject = $431fbd86ca7dc216$export$b204af158042fbac(element);
	let loadListener;
	if (documentObject.readyState !== "loading") $507fabe10e71c6fb$var$setupGlobalFocusEvents(element);
	else {
		loadListener = () => {
			$507fabe10e71c6fb$var$setupGlobalFocusEvents(element);
		};
		documentObject.addEventListener("DOMContentLoaded", loadListener);
	}
	return () => $507fabe10e71c6fb$var$tearDownWindowFocusTracking(element, loadListener);
}
if (typeof document !== "undefined") $507fabe10e71c6fb$export$2f1888112f558a7d();
function $507fabe10e71c6fb$export$b9b3dfddab17db27() {
	return $507fabe10e71c6fb$var$currentModality !== "pointer";
}
function $507fabe10e71c6fb$export$630ff653c5ada6a9() {
	return $507fabe10e71c6fb$var$currentModality;
}
const $507fabe10e71c6fb$var$nonTextInputTypes = new Set([
	"checkbox",
	"radio",
	"range",
	"color",
	"file",
	"image",
	"button",
	"submit",
	"reset"
]);
/**
* If this is attached to text input component, return if the event is a focus event (Tab/Escape keys pressed) so that
* focus visible style can be properly set.
*/ function $507fabe10e71c6fb$var$isKeyboardFocusEvent(isTextInput, modality, e) {
	let document1 = $431fbd86ca7dc216$export$b204af158042fbac(e === null || e === void 0 ? void 0 : e.target);
	const IHTMLInputElement = typeof window !== "undefined" ? $431fbd86ca7dc216$export$f21a1ffae260145a(e === null || e === void 0 ? void 0 : e.target).HTMLInputElement : HTMLInputElement;
	const IHTMLTextAreaElement = typeof window !== "undefined" ? $431fbd86ca7dc216$export$f21a1ffae260145a(e === null || e === void 0 ? void 0 : e.target).HTMLTextAreaElement : HTMLTextAreaElement;
	const IHTMLElement = typeof window !== "undefined" ? $431fbd86ca7dc216$export$f21a1ffae260145a(e === null || e === void 0 ? void 0 : e.target).HTMLElement : HTMLElement;
	const IKeyboardEvent = typeof window !== "undefined" ? $431fbd86ca7dc216$export$f21a1ffae260145a(e === null || e === void 0 ? void 0 : e.target).KeyboardEvent : KeyboardEvent;
	isTextInput = isTextInput || document1.activeElement instanceof IHTMLInputElement && !$507fabe10e71c6fb$var$nonTextInputTypes.has(document1.activeElement.type) || document1.activeElement instanceof IHTMLTextAreaElement || document1.activeElement instanceof IHTMLElement && document1.activeElement.isContentEditable;
	return !(isTextInput && modality === "keyboard" && e instanceof IKeyboardEvent && !$507fabe10e71c6fb$var$FOCUS_VISIBLE_INPUT_KEYS[e.key]);
}
function $507fabe10e71c6fb$export$ec71b4b83ac08ec3(fn, deps, opts) {
	$507fabe10e71c6fb$var$setupGlobalFocusEvents();
	(0, import_react.useEffect)(() => {
		let handler = (modality, e) => {
			if (!$507fabe10e71c6fb$var$isKeyboardFocusEvent(!!(opts === null || opts === void 0 ? void 0 : opts.isTextInput), modality, e)) return;
			fn($507fabe10e71c6fb$export$b9b3dfddab17db27());
		};
		$507fabe10e71c6fb$var$changeHandlers.add(handler);
		return () => {
			$507fabe10e71c6fb$var$changeHandlers.delete(handler);
		};
	}, deps);
}

//#endregion
//#region ../../node_modules/.pnpm/@react-aria+interactions@3.25.6_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/@react-aria/interactions/dist/useFocus.mjs
function $a1ea59d68270f0dd$export$f8168d8dd8fd66e6(props) {
	let { isDisabled, onFocus: onFocusProp, onBlur: onBlurProp, onFocusChange } = props;
	const onBlur = (0, import_react.useCallback)((e) => {
		if (e.target === e.currentTarget) {
			if (onBlurProp) onBlurProp(e);
			if (onFocusChange) onFocusChange(false);
			return true;
		}
	}, [onBlurProp, onFocusChange]);
	const onSyntheticFocus = $8a9cb279dc87e130$export$715c682d09d639cc(onBlur);
	const onFocus = (0, import_react.useCallback)((e) => {
		const ownerDocument = $431fbd86ca7dc216$export$b204af158042fbac(e.target);
		const activeElement = ownerDocument ? $d4ee10de306f2510$export$cd4e5573fbe2b576(ownerDocument) : $d4ee10de306f2510$export$cd4e5573fbe2b576();
		if (e.target === e.currentTarget && activeElement === $d4ee10de306f2510$export$e58f029f0fbfdb29(e.nativeEvent)) {
			if (onFocusProp) onFocusProp(e);
			if (onFocusChange) onFocusChange(true);
			onSyntheticFocus(e);
		}
	}, [
		onFocusChange,
		onFocusProp,
		onSyntheticFocus
	]);
	return { focusProps: {
		onFocus: !isDisabled && (onFocusProp || onFocusChange || onBlurProp) ? onFocus : void 0,
		onBlur: !isDisabled && (onBlurProp || onFocusChange) ? onBlur : void 0
	} };
}

//#endregion
//#region ../../node_modules/.pnpm/@react-aria+interactions@3.25.6_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/@react-aria/interactions/dist/useFocusWithin.mjs
function $9ab94262bd0047c7$export$420e68273165f4ec(props) {
	let { isDisabled, onBlurWithin, onFocusWithin, onFocusWithinChange } = props;
	let state = (0, import_react.useRef)({ isFocusWithin: false });
	let { addGlobalListener, removeAllGlobalListeners } = $03deb23ff14920c4$export$4eaf04e54aa8eed6();
	let onBlur = (0, import_react.useCallback)((e) => {
		if (!e.currentTarget.contains(e.target)) return;
		if (state.current.isFocusWithin && !e.currentTarget.contains(e.relatedTarget)) {
			state.current.isFocusWithin = false;
			removeAllGlobalListeners();
			if (onBlurWithin) onBlurWithin(e);
			if (onFocusWithinChange) onFocusWithinChange(false);
		}
	}, [
		onBlurWithin,
		onFocusWithinChange,
		state,
		removeAllGlobalListeners
	]);
	let onSyntheticFocus = $8a9cb279dc87e130$export$715c682d09d639cc(onBlur);
	let onFocus = (0, import_react.useCallback)((e) => {
		if (!e.currentTarget.contains(e.target)) return;
		const ownerDocument = $431fbd86ca7dc216$export$b204af158042fbac(e.target);
		const activeElement = $d4ee10de306f2510$export$cd4e5573fbe2b576(ownerDocument);
		if (!state.current.isFocusWithin && activeElement === $d4ee10de306f2510$export$e58f029f0fbfdb29(e.nativeEvent)) {
			if (onFocusWithin) onFocusWithin(e);
			if (onFocusWithinChange) onFocusWithinChange(true);
			state.current.isFocusWithin = true;
			onSyntheticFocus(e);
			let currentTarget = e.currentTarget;
			addGlobalListener(ownerDocument, "focus", (e$1) => {
				if (state.current.isFocusWithin && !$d4ee10de306f2510$export$4282f70798064fe0(currentTarget, e$1.target)) {
					let nativeEvent = new ownerDocument.defaultView.FocusEvent("blur", { relatedTarget: e$1.target });
					$8a9cb279dc87e130$export$c2b7abe5d61ec696(nativeEvent, currentTarget);
					onBlur($8a9cb279dc87e130$export$525bc4921d56d4a(nativeEvent));
				}
			}, { capture: true });
		}
	}, [
		onFocusWithin,
		onFocusWithinChange,
		onSyntheticFocus,
		addGlobalListener,
		onBlur
	]);
	if (isDisabled) return { focusWithinProps: {
		onFocus: void 0,
		onBlur: void 0
	} };
	return { focusWithinProps: {
		onFocus,
		onBlur
	} };
}

//#endregion
//#region ../../node_modules/.pnpm/@react-aria+focus@3.21.2_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/@react-aria/focus/dist/useFocusRing.mjs
function $f7dceffc5ad7768b$export$4e328f61c538687f(props = {}) {
	let { autoFocus = false, isTextInput, within } = props;
	let state = (0, import_react.useRef)({
		isFocused: false,
		isFocusVisible: autoFocus || $507fabe10e71c6fb$export$b9b3dfddab17db27()
	});
	let [isFocused, setFocused] = (0, import_react.useState)(false);
	let [isFocusVisibleState, setFocusVisible] = (0, import_react.useState)(() => state.current.isFocused && state.current.isFocusVisible);
	let updateState = (0, import_react.useCallback)(() => setFocusVisible(state.current.isFocused && state.current.isFocusVisible), []);
	let onFocusChange = (0, import_react.useCallback)((isFocused$1) => {
		state.current.isFocused = isFocused$1;
		setFocused(isFocused$1);
		updateState();
	}, [updateState]);
	$507fabe10e71c6fb$export$ec71b4b83ac08ec3((isFocusVisible) => {
		state.current.isFocusVisible = isFocusVisible;
		updateState();
	}, [], { isTextInput });
	let { focusProps } = $a1ea59d68270f0dd$export$f8168d8dd8fd66e6({
		isDisabled: within,
		onFocusChange
	});
	let { focusWithinProps } = $9ab94262bd0047c7$export$420e68273165f4ec({
		isDisabled: !within,
		onFocusWithinChange: onFocusChange
	});
	return {
		isFocused,
		isFocusVisible: isFocusVisibleState,
		focusProps: within ? focusWithinProps : focusProps
	};
}

//#endregion
//#region ../../node_modules/.pnpm/@heroui+system-rsc@2.3.20_@heroui+theme@2.4.23_tailwindcss@4.1.14__react@19.2.0/node_modules/@heroui/system-rsc/dist/chunk-YFAKJTDR.mjs
function forwardRef(component) {
	return (0, import_react.forwardRef)(component);
}
var mapPropsVariants = (props, variantKeys, removeVariantProps = true) => {
	if (!variantKeys) return [props, {}];
	const picked = variantKeys.reduce((acc, key) => {
		if (key in props) return {
			...acc,
			[key]: props[key]
		};
		else return acc;
	}, {});
	if (removeVariantProps) return [Object.keys(props).filter((key) => !variantKeys.includes(key)).reduce((acc, key) => ({
		...acc,
		[key]: props[key]
	}), {}), picked];
	else return [props, picked];
};

//#endregion
//#region ../../node_modules/.pnpm/@heroui+theme@2.4.23_tailwindcss@4.1.14/node_modules/@heroui/theme/dist/chunk-GQT3YUX3.mjs
var colorVariants = {
	solid: {
		default: "bg-default text-default-foreground",
		primary: "bg-primary text-primary-foreground",
		secondary: "bg-secondary text-secondary-foreground",
		success: "bg-success text-success-foreground",
		warning: "bg-warning text-warning-foreground",
		danger: "bg-danger text-danger-foreground",
		foreground: "bg-foreground text-background"
	},
	shadow: {
		default: "shadow-lg shadow-default/50 bg-default text-default-foreground",
		primary: "shadow-lg shadow-primary/40 bg-primary text-primary-foreground",
		secondary: "shadow-lg shadow-secondary/40 bg-secondary text-secondary-foreground",
		success: "shadow-lg shadow-success/40 bg-success text-success-foreground",
		warning: "shadow-lg shadow-warning/40 bg-warning text-warning-foreground",
		danger: "shadow-lg shadow-danger/40 bg-danger text-danger-foreground",
		foreground: "shadow-lg shadow-foreground/40 bg-foreground text-background"
	},
	bordered: {
		default: "bg-transparent border-default text-foreground",
		primary: "bg-transparent border-primary text-primary",
		secondary: "bg-transparent border-secondary text-secondary",
		success: "bg-transparent border-success text-success",
		warning: "bg-transparent border-warning text-warning",
		danger: "bg-transparent border-danger text-danger",
		foreground: "bg-transparent border-foreground text-foreground"
	},
	flat: {
		default: "bg-default/40 text-default-700",
		primary: "bg-primary/20 text-primary-600",
		secondary: "bg-secondary/20 text-secondary-600",
		success: "bg-success/20 text-success-700 dark:text-success",
		warning: "bg-warning/20 text-warning-700 dark:text-warning",
		danger: "bg-danger/20 text-danger-600 dark:text-danger-500",
		foreground: "bg-foreground/10 text-foreground"
	},
	faded: {
		default: "border-default bg-default-100 text-default-foreground",
		primary: "border-default bg-default-100 text-primary",
		secondary: "border-default bg-default-100 text-secondary",
		success: "border-default bg-default-100 text-success",
		warning: "border-default bg-default-100 text-warning",
		danger: "border-default bg-default-100 text-danger",
		foreground: "border-default bg-default-100 text-foreground"
	},
	light: {
		default: "bg-transparent text-default-foreground",
		primary: "bg-transparent text-primary",
		secondary: "bg-transparent text-secondary",
		success: "bg-transparent text-success",
		warning: "bg-transparent text-warning",
		danger: "bg-transparent text-danger",
		foreground: "bg-transparent text-foreground"
	},
	ghost: {
		default: "border-default text-default-foreground",
		primary: "border-primary text-primary",
		secondary: "border-secondary text-secondary",
		success: "border-success text-success",
		warning: "border-warning text-warning",
		danger: "border-danger text-danger",
		foreground: "border-foreground text-foreground hover:!bg-foreground"
	}
};

//#endregion
//#region ../../node_modules/.pnpm/@heroui+theme@2.4.23_tailwindcss@4.1.14/node_modules/@heroui/theme/dist/chunk-POSTVCTR.mjs
var animation_default = {
	".spinner-bar-animation": {
		"animation-delay": "calc(-1.2s + (0.1s * var(--bar-index)))",
		transform: "rotate(calc(30deg * var(--bar-index)))translate(140%)"
	},
	".spinner-dot-animation": { "animation-delay": "calc(250ms * var(--dot-index))" },
	".spinner-dot-blink-animation": { "animation-delay": "calc(200ms * var(--dot-index))" }
};

//#endregion
//#region ../../node_modules/.pnpm/@heroui+theme@2.4.23_tailwindcss@4.1.14/node_modules/@heroui/theme/dist/chunk-MPVWW3DX.mjs
var custom_default = {
	".leading-inherit": { "line-height": "inherit" },
	".bg-img-inherit": { "background-image": "inherit" },
	".bg-clip-inherit": { "background-clip": "inherit" },
	".text-fill-inherit": { "-webkit-text-fill-color": "inherit" },
	".tap-highlight-transparent": { "-webkit-tap-highlight-color": "transparent" },
	".input-search-cancel-button-none": { "&::-webkit-search-cancel-button": { "-webkit-appearance": "none" } }
};

//#endregion
//#region ../../node_modules/.pnpm/@heroui+theme@2.4.23_tailwindcss@4.1.14/node_modules/@heroui/theme/dist/chunk-WH6SPIFG.mjs
var scrollbar_hide_default = {
	".scrollbar-hide": {
		"-ms-overflow-style": "none",
		"scrollbar-width": "none",
		"&::-webkit-scrollbar": { display: "none" }
	},
	".scrollbar-default": {
		"-ms-overflow-style": "auto",
		"scrollbar-width": "auto",
		"&::-webkit-scrollbar": { display: "block" }
	}
};

//#endregion
//#region ../../node_modules/.pnpm/@heroui+theme@2.4.23_tailwindcss@4.1.14/node_modules/@heroui/theme/dist/chunk-RUIUXVZ4.mjs
var text_default = {
	".text-tiny": {
		"font-size": "var(--heroui-font-size-tiny)",
		"line-height": "var(--heroui-line-height-tiny)"
	},
	".text-small": {
		"font-size": "var(--heroui-font-size-small)",
		"line-height": "var(--heroui-line-height-small)"
	},
	".text-medium": {
		"font-size": "var(--heroui-font-size-medium)",
		"line-height": "var(--heroui-line-height-medium)"
	},
	".text-large": {
		"font-size": "var(--heroui-font-size-large)",
		"line-height": "var(--heroui-line-height-large)"
	}
};

//#endregion
//#region ../../node_modules/.pnpm/@heroui+theme@2.4.23_tailwindcss@4.1.14/node_modules/@heroui/theme/dist/chunk-GSRZWDGA.mjs
var DEFAULT_TRANSITION_DURATION = "250ms";
var transition_default = {
	".transition-background": {
		"transition-property": "background",
		"transition-timing-function": "ease",
		"transition-duration": DEFAULT_TRANSITION_DURATION
	},
	".transition-colors-opacity": {
		"transition-property": "color, background-color, border-color, text-decoration-color, fill, stroke, opacity",
		"transition-timing-function": "ease",
		"transition-duration": DEFAULT_TRANSITION_DURATION
	},
	".transition-width": {
		"transition-property": "width",
		"transition-timing-function": "ease",
		"transition-duration": DEFAULT_TRANSITION_DURATION
	},
	".transition-height": {
		"transition-property": "height",
		"transition-timing-function": "ease",
		"transition-duration": DEFAULT_TRANSITION_DURATION
	},
	".transition-size": {
		"transition-property": "width, height",
		"transition-timing-function": "ease",
		"transition-duration": DEFAULT_TRANSITION_DURATION
	},
	".transition-left": {
		"transition-property": "left",
		"transition-timing-function": "ease",
		"transition-duration": DEFAULT_TRANSITION_DURATION
	},
	".transition-transform-opacity": {
		"transition-property": "transform, scale, opacity rotate",
		"transition-timing-function": "ease",
		"transition-duration": DEFAULT_TRANSITION_DURATION
	},
	".transition-transform-background": {
		"transition-property": "transform, scale, background",
		"transition-timing-function": "ease",
		"transition-duration": DEFAULT_TRANSITION_DURATION
	},
	".transition-transform-colors": {
		"transition-property": "transform, scale, color, background, background-color, border-color, text-decoration-color, fill, stroke",
		"transition-timing-function": "ease",
		"transition-duration": DEFAULT_TRANSITION_DURATION
	},
	".transition-transform-colors-opacity": {
		"transition-property": "transform, scale, color, background, background-color, border-color, text-decoration-color, fill, stroke, opacity",
		"transition-timing-function": "ease",
		"transition-duration": DEFAULT_TRANSITION_DURATION
	}
};

//#endregion
//#region ../../node_modules/.pnpm/@heroui+theme@2.4.23_tailwindcss@4.1.14/node_modules/@heroui/theme/dist/chunk-6JJPIEK7.mjs
var utilities = {
	...custom_default,
	...transition_default,
	...scrollbar_hide_default,
	...text_default,
	...animation_default
};

//#endregion
//#region ../../node_modules/.pnpm/@heroui+theme@2.4.23_tailwindcss@4.1.14/node_modules/@heroui/theme/dist/chunk-UFVD3L5A.mjs
var COMMON_UNITS = [
	"small",
	"medium",
	"large"
];
var twMergeConfig = {
	theme: {
		spacing: ["divider"],
		radius: COMMON_UNITS
	},
	classGroups: {
		shadow: [{ shadow: COMMON_UNITS }],
		opacity: [{ opacity: ["disabled"] }],
		"font-size": [{ text: ["tiny", ...COMMON_UNITS] }],
		"border-w": [{ border: COMMON_UNITS }],
		"bg-image": [
			"bg-stripe-gradient-default",
			"bg-stripe-gradient-primary",
			"bg-stripe-gradient-secondary",
			"bg-stripe-gradient-success",
			"bg-stripe-gradient-warning",
			"bg-stripe-gradient-danger"
		],
		transition: Object.keys(utilities).filter((key) => key.includes(".transition")).map((key) => key.replace(".", ""))
	}
};

//#endregion
//#region ../../node_modules/.pnpm/tailwind-variants@3.1.1_tailwind-merge@3.3.1_tailwindcss@4.1.14/node_modules/tailwind-variants/dist/chunk-GQLG7IS2.js
var y = /\s+/g, a = (t) => typeof t != "string" || !t ? t : t.replace(y, " ").trim(), u = (...t) => {
	let r = [], n = (e) => {
		if (!e && e !== 0 && e !== 0n) return;
		if (Array.isArray(e)) {
			for (let s = 0, o = e.length; s < o; s++) n(e[s]);
			return;
		}
		let f$1 = typeof e;
		if (f$1 === "string" || f$1 === "number" || f$1 === "bigint") {
			if (f$1 === "number" && e !== e) return;
			r.push(String(e));
		} else if (f$1 === "object") {
			let s = Object.keys(e);
			for (let o = 0, i$1 = s.length; o < i$1; o++) {
				let l = s[o];
				e[l] && r.push(l);
			}
		}
	};
	for (let e = 0, f$1 = t.length; e < f$1; e++) {
		let s = t[e];
		s != null && n(s);
	}
	return r.length > 0 ? a(r.join(" ")) : void 0;
}, h = (t) => t === false ? "false" : t === true ? "true" : t === 0 ? "0" : t, x = (t) => {
	if (!t || typeof t != "object") return true;
	for (let r in t) return false;
	return true;
}, k = (t, r) => {
	if (t === r) return true;
	if (!t || !r) return false;
	let n = Object.keys(t), e = Object.keys(r);
	if (n.length !== e.length) return false;
	for (let f$1 = 0; f$1 < n.length; f$1++) {
		let s = n[f$1];
		if (!e.includes(s) || t[s] !== r[s]) return false;
	}
	return true;
}, A = (t) => t === true || t === false, d = (t, r) => {
	for (let n in r) if (Object.prototype.hasOwnProperty.call(r, n)) {
		let e = r[n];
		n in t ? t[n] = u(t[n], e) : t[n] = e;
	}
	return t;
}, c = (t, r) => {
	for (let n = 0; n < t.length; n++) {
		let e = t[n];
		Array.isArray(e) ? c(e, r) : e && r.push(e);
	}
};
var g = (...t) => {
	let r = [];
	c(t, r);
	let n = [];
	for (let e = 0; e < r.length; e++) r[e] && n.push(r[e]);
	return n;
}, p = (t, r) => {
	let n = {};
	for (let e in t) {
		let f$1 = t[e];
		if (e in r) {
			let s = r[e];
			Array.isArray(f$1) || Array.isArray(s) ? n[e] = g(s, f$1) : typeof f$1 == "object" && typeof s == "object" && f$1 && s ? n[e] = p(f$1, s) : n[e] = s + " " + f$1;
		} else n[e] = f$1;
	}
	for (let e in r) e in t || (n[e] = r[e]);
	return n;
};

//#endregion
//#region ../../node_modules/.pnpm/tailwind-variants@3.1.1_tailwind-merge@3.3.1_tailwindcss@4.1.14/node_modules/tailwind-variants/dist/chunk-IFWU2MEM.js
var Q = {
	twMerge: true,
	twMergeConfig: {},
	responsiveVariants: false
};
function ne() {
	let b = null, w = {}, A$1 = false;
	return {
		get cachedTwMerge() {
			return b;
		},
		set cachedTwMerge(u$1) {
			b = u$1;
		},
		get cachedTwMergeConfig() {
			return w;
		},
		set cachedTwMergeConfig(u$1) {
			w = u$1;
		},
		get didTwMergeConfigChange() {
			return A$1;
		},
		set didTwMergeConfigChange(u$1) {
			A$1 = u$1;
		},
		reset() {
			b = null, w = {}, A$1 = false;
		}
	};
}
var S = ne();
var le = (b$1) => {
	let w = (u$1, $) => {
		let { extend: c$1 = null, slots: M = {}, variants: q = {}, compoundVariants: L = [], compoundSlots: v = [], defaultVariants: U = {} } = u$1, d$1 = {
			...Q,
			...$
		}, x$1 = c$1?.base ? u(c$1.base, u$1?.base) : u$1?.base, p$1 = c$1?.variants && !x(c$1.variants) ? p(q, c$1.variants) : q, E = c$1?.defaultVariants && !x(c$1.defaultVariants) ? {
			...c$1.defaultVariants,
			...U
		} : U;
		!x(d$1.twMergeConfig) && !k(d$1.twMergeConfig, S.cachedTwMergeConfig) && (S.didTwMergeConfigChange = true, S.cachedTwMergeConfig = d$1.twMergeConfig);
		let N = x(c$1?.slots), O = x(M) ? {} : {
			base: u(u$1?.base, N && c$1?.base),
			...M
		}, j$1 = N ? O : d({ ...c$1?.slots }, x(O) ? { base: u$1?.base } : O), T$1 = x(c$1?.compoundVariants) ? L : g(c$1?.compoundVariants, L), y$1 = (h$1) => {
			if (x(p$1) && x(M) && N) return b$1(x$1, h$1?.class, h$1?.className)(d$1);
			if (T$1 && !Array.isArray(T$1)) throw new TypeError(`The "compoundVariants" prop must be an array. Received: ${typeof T$1}`);
			if (v && !Array.isArray(v)) throw new TypeError(`The "compoundSlots" prop must be an array. Received: ${typeof v}`);
			let Y = (t, e, n = [], a$1) => {
				let r = n;
				if (typeof e == "string") {
					let i$1 = a(e).split(" ");
					for (let l = 0; l < i$1.length; l++) r.push(`${t}:${i$1[l]}`);
				} else if (Array.isArray(e)) for (let s = 0; s < e.length; s++) r.push(`${t}:${e[s]}`);
				else if (typeof e == "object" && typeof a$1 == "string" && a$1 in e) {
					let s = e[a$1];
					if (s && typeof s == "string") {
						let l = a(s).split(" "), f$1 = [];
						for (let o = 0; o < l.length; o++) f$1.push(`${t}:${l[o]}`);
						r[a$1] = r[a$1] ? r[a$1].concat(f$1) : f$1;
					} else if (Array.isArray(s) && s.length > 0) {
						let i$1 = [];
						for (let l = 0; l < s.length; l++) i$1.push(`${t}:${s[l]}`);
						r[a$1] = i$1;
					}
				}
				return r;
			}, W = (t, e = p$1, n = null, a$1 = null) => {
				let r = e[t];
				if (!r || x(r)) return null;
				let s = a$1?.[t] ?? h$1?.[t];
				if (s === null) return null;
				let i$1 = h(s), l = Array.isArray(d$1.responsiveVariants) && d$1.responsiveVariants.length > 0 || d$1.responsiveVariants === true, f$1 = E?.[t], o = [];
				if (typeof i$1 == "object" && l) for (let [C$1, H] of Object.entries(i$1)) {
					let te = r[H];
					if (C$1 === "initial") {
						f$1 = H;
						continue;
					}
					Array.isArray(d$1.responsiveVariants) && !d$1.responsiveVariants.includes(C$1) || (o = Y(C$1, te, o, n));
				}
				let m = r[(i$1 != null && typeof i$1 != "object" ? i$1 : h(f$1)) || "false"];
				return typeof o == "object" && typeof n == "string" && o[n] ? d(o, m) : o.length > 0 ? (o.push(m), n === "base" ? o.join(" ") : o) : m;
			}, Z = () => {
				if (!p$1) return null;
				let t = Object.keys(p$1), e = [];
				for (let n = 0; n < t.length; n++) {
					let a$1 = W(t[n], p$1);
					a$1 && e.push(a$1);
				}
				return e;
			}, _ = (t, e) => {
				if (!p$1 || typeof p$1 != "object") return null;
				let n = [];
				for (let a$1 in p$1) {
					let r = W(a$1, p$1, t, e), s = t === "base" && typeof r == "string" ? r : r && r[t];
					s && n.push(s);
				}
				return n;
			}, z = {};
			for (let t in h$1) {
				let e = h$1[t];
				e !== void 0 && (z[t] = e);
			}
			let D = (t, e) => {
				let n = typeof h$1?.[t] == "object" ? { [t]: h$1[t]?.initial } : {};
				return {
					...E,
					...z,
					...n,
					...e
				};
			}, G = (t = [], e) => {
				let n = [], a$1 = t.length;
				for (let r = 0; r < a$1; r++) {
					let { class: s, className: i$1,...l } = t[r], f$1 = true, o = D(null, e);
					for (let V in l) {
						let m = l[V], C$1 = o[V];
						if (Array.isArray(m)) {
							if (!m.includes(C$1)) {
								f$1 = false;
								break;
							}
						} else {
							if ((m == null || m === false) && (C$1 == null || C$1 === false)) continue;
							if (C$1 !== m) {
								f$1 = false;
								break;
							}
						}
					}
					f$1 && (s && n.push(s), i$1 && n.push(i$1));
				}
				return n;
			}, K = (t) => {
				let e = G(T$1, t);
				if (!Array.isArray(e)) return e;
				let n = {}, a$1 = b$1;
				for (let r = 0; r < e.length; r++) {
					let s = e[r];
					if (typeof s == "string") n.base = a$1(n.base, s)(d$1);
					else if (typeof s == "object") for (let i$1 in s) n[i$1] = a$1(n[i$1], s[i$1])(d$1);
				}
				return n;
			}, ee = (t) => {
				if (v.length < 1) return null;
				let e = {}, n = D(null, t);
				for (let a$1 = 0; a$1 < v.length; a$1++) {
					let { slots: r = [], class: s, className: i$1,...l } = v[a$1];
					if (!x(l)) {
						let f$1 = true;
						for (let o in l) {
							let V = n[o], m = l[o];
							if (V === void 0 || (Array.isArray(m) ? !m.includes(V) : m !== V)) {
								f$1 = false;
								break;
							}
						}
						if (!f$1) continue;
					}
					for (let f$1 = 0; f$1 < r.length; f$1++) {
						let o = r[f$1];
						e[o] || (e[o] = []), e[o].push([s, i$1]);
					}
				}
				return e;
			};
			if (!x(M) || !N) {
				let t = {};
				if (typeof j$1 == "object" && !x(j$1)) {
					let e = b$1;
					for (let n in j$1) t[n] = (a$1) => {
						let r = K(a$1), s = ee(a$1);
						return e(j$1[n], _(n, a$1), r ? r[n] : void 0, s ? s[n] : void 0, a$1?.class, a$1?.className)(d$1);
					};
				}
				return t;
			}
			return b$1(x$1, Z(), G(T$1), h$1?.class, h$1?.className)(d$1);
		}, X = () => {
			if (!(!p$1 || typeof p$1 != "object")) return Object.keys(p$1);
		};
		return y$1.variantKeys = X(), y$1.extend = c$1, y$1.base = x$1, y$1.slots = j$1, y$1.variants = p$1, y$1.defaultVariants = E, y$1.compoundSlots = v, y$1.compoundVariants = T$1, y$1;
	};
	return {
		tv: w,
		createTV: (u$1) => ($, c$1) => w($, c$1 ? p(u$1, c$1) : u$1)
	};
};

//#endregion
//#region ../../node_modules/.pnpm/tailwind-merge@3.3.1/node_modules/tailwind-merge/dist/bundle-mjs.mjs
const CLASS_PART_SEPARATOR = "-";
const createClassGroupUtils = (config) => {
	const classMap = createClassMap(config);
	const { conflictingClassGroups, conflictingClassGroupModifiers } = config;
	const getClassGroupId = (className) => {
		const classParts = className.split(CLASS_PART_SEPARATOR);
		if (classParts[0] === "" && classParts.length !== 1) classParts.shift();
		return getGroupRecursive(classParts, classMap) || getGroupIdForArbitraryProperty(className);
	};
	const getConflictingClassGroupIds = (classGroupId, hasPostfixModifier) => {
		const conflicts = conflictingClassGroups[classGroupId] || [];
		if (hasPostfixModifier && conflictingClassGroupModifiers[classGroupId]) return [...conflicts, ...conflictingClassGroupModifiers[classGroupId]];
		return conflicts;
	};
	return {
		getClassGroupId,
		getConflictingClassGroupIds
	};
};
const getGroupRecursive = (classParts, classPartObject) => {
	if (classParts.length === 0) return classPartObject.classGroupId;
	const currentClassPart = classParts[0];
	const nextClassPartObject = classPartObject.nextPart.get(currentClassPart);
	const classGroupFromNextClassPart = nextClassPartObject ? getGroupRecursive(classParts.slice(1), nextClassPartObject) : void 0;
	if (classGroupFromNextClassPart) return classGroupFromNextClassPart;
	if (classPartObject.validators.length === 0) return;
	const classRest = classParts.join(CLASS_PART_SEPARATOR);
	return classPartObject.validators.find(({ validator }) => validator(classRest))?.classGroupId;
};
const arbitraryPropertyRegex = /^\[(.+)\]$/;
const getGroupIdForArbitraryProperty = (className) => {
	if (arbitraryPropertyRegex.test(className)) {
		const arbitraryPropertyClassName = arbitraryPropertyRegex.exec(className)[1];
		const property = arbitraryPropertyClassName?.substring(0, arbitraryPropertyClassName.indexOf(":"));
		if (property) return "arbitrary.." + property;
	}
};
/**
* Exported for testing only
*/
const createClassMap = (config) => {
	const { theme, classGroups } = config;
	const classMap = {
		nextPart: /* @__PURE__ */ new Map(),
		validators: []
	};
	for (const classGroupId in classGroups) processClassesRecursively(classGroups[classGroupId], classMap, classGroupId, theme);
	return classMap;
};
const processClassesRecursively = (classGroup, classPartObject, classGroupId, theme) => {
	classGroup.forEach((classDefinition) => {
		if (typeof classDefinition === "string") {
			const classPartObjectToEdit = classDefinition === "" ? classPartObject : getPart(classPartObject, classDefinition);
			classPartObjectToEdit.classGroupId = classGroupId;
			return;
		}
		if (typeof classDefinition === "function") {
			if (isThemeGetter(classDefinition)) {
				processClassesRecursively(classDefinition(theme), classPartObject, classGroupId, theme);
				return;
			}
			classPartObject.validators.push({
				validator: classDefinition,
				classGroupId
			});
			return;
		}
		Object.entries(classDefinition).forEach(([key, classGroup$1]) => {
			processClassesRecursively(classGroup$1, getPart(classPartObject, key), classGroupId, theme);
		});
	});
};
const getPart = (classPartObject, path) => {
	let currentClassPartObject = classPartObject;
	path.split(CLASS_PART_SEPARATOR).forEach((pathPart) => {
		if (!currentClassPartObject.nextPart.has(pathPart)) currentClassPartObject.nextPart.set(pathPart, {
			nextPart: /* @__PURE__ */ new Map(),
			validators: []
		});
		currentClassPartObject = currentClassPartObject.nextPart.get(pathPart);
	});
	return currentClassPartObject;
};
const isThemeGetter = (func) => func.isThemeGetter;
const createLruCache = (maxCacheSize) => {
	if (maxCacheSize < 1) return {
		get: () => void 0,
		set: () => {}
	};
	let cacheSize = 0;
	let cache = /* @__PURE__ */ new Map();
	let previousCache = /* @__PURE__ */ new Map();
	const update = (key, value) => {
		cache.set(key, value);
		cacheSize++;
		if (cacheSize > maxCacheSize) {
			cacheSize = 0;
			previousCache = cache;
			cache = /* @__PURE__ */ new Map();
		}
	};
	return {
		get(key) {
			let value = cache.get(key);
			if (value !== void 0) return value;
			if ((value = previousCache.get(key)) !== void 0) {
				update(key, value);
				return value;
			}
		},
		set(key, value) {
			if (cache.has(key)) cache.set(key, value);
			else update(key, value);
		}
	};
};
const IMPORTANT_MODIFIER = "!";
const MODIFIER_SEPARATOR = ":";
const MODIFIER_SEPARATOR_LENGTH = 1;
const createParseClassName = (config) => {
	const { prefix, experimentalParseClassName } = config;
	/**
	* Parse class name into parts.
	*
	* Inspired by `splitAtTopLevelOnly` used in Tailwind CSS
	* @see https://github.com/tailwindlabs/tailwindcss/blob/v3.2.2/src/util/splitAtTopLevelOnly.js
	*/
	let parseClassName = (className) => {
		const modifiers = [];
		let bracketDepth = 0;
		let parenDepth = 0;
		let modifierStart = 0;
		let postfixModifierPosition;
		for (let index = 0; index < className.length; index++) {
			let currentCharacter = className[index];
			if (bracketDepth === 0 && parenDepth === 0) {
				if (currentCharacter === MODIFIER_SEPARATOR) {
					modifiers.push(className.slice(modifierStart, index));
					modifierStart = index + MODIFIER_SEPARATOR_LENGTH;
					continue;
				}
				if (currentCharacter === "/") {
					postfixModifierPosition = index;
					continue;
				}
			}
			if (currentCharacter === "[") bracketDepth++;
			else if (currentCharacter === "]") bracketDepth--;
			else if (currentCharacter === "(") parenDepth++;
			else if (currentCharacter === ")") parenDepth--;
		}
		const baseClassNameWithImportantModifier = modifiers.length === 0 ? className : className.substring(modifierStart);
		const baseClassName = stripImportantModifier(baseClassNameWithImportantModifier);
		return {
			modifiers,
			hasImportantModifier: baseClassName !== baseClassNameWithImportantModifier,
			baseClassName,
			maybePostfixModifierPosition: postfixModifierPosition && postfixModifierPosition > modifierStart ? postfixModifierPosition - modifierStart : void 0
		};
	};
	if (prefix) {
		const fullPrefix = prefix + MODIFIER_SEPARATOR;
		const parseClassNameOriginal = parseClassName;
		parseClassName = (className) => className.startsWith(fullPrefix) ? parseClassNameOriginal(className.substring(fullPrefix.length)) : {
			isExternal: true,
			modifiers: [],
			hasImportantModifier: false,
			baseClassName: className,
			maybePostfixModifierPosition: void 0
		};
	}
	if (experimentalParseClassName) {
		const parseClassNameOriginal = parseClassName;
		parseClassName = (className) => experimentalParseClassName({
			className,
			parseClassName: parseClassNameOriginal
		});
	}
	return parseClassName;
};
const stripImportantModifier = (baseClassName) => {
	if (baseClassName.endsWith(IMPORTANT_MODIFIER)) return baseClassName.substring(0, baseClassName.length - 1);
	/**
	* In Tailwind CSS v3 the important modifier was at the start of the base class name. This is still supported for legacy reasons.
	* @see https://github.com/dcastil/tailwind-merge/issues/513#issuecomment-2614029864
	*/
	if (baseClassName.startsWith(IMPORTANT_MODIFIER)) return baseClassName.substring(1);
	return baseClassName;
};
/**
* Sorts modifiers according to following schema:
* - Predefined modifiers are sorted alphabetically
* - When an arbitrary variant appears, it must be preserved which modifiers are before and after it
*/
const createSortModifiers = (config) => {
	const orderSensitiveModifiers = Object.fromEntries(config.orderSensitiveModifiers.map((modifier) => [modifier, true]));
	const sortModifiers = (modifiers) => {
		if (modifiers.length <= 1) return modifiers;
		const sortedModifiers = [];
		let unsortedModifiers = [];
		modifiers.forEach((modifier) => {
			if (modifier[0] === "[" || orderSensitiveModifiers[modifier]) {
				sortedModifiers.push(...unsortedModifiers.sort(), modifier);
				unsortedModifiers = [];
			} else unsortedModifiers.push(modifier);
		});
		sortedModifiers.push(...unsortedModifiers.sort());
		return sortedModifiers;
	};
	return sortModifiers;
};
const createConfigUtils = (config) => ({
	cache: createLruCache(config.cacheSize),
	parseClassName: createParseClassName(config),
	sortModifiers: createSortModifiers(config),
	...createClassGroupUtils(config)
});
const SPLIT_CLASSES_REGEX = /\s+/;
const mergeClassList = (classList, configUtils) => {
	const { parseClassName, getClassGroupId, getConflictingClassGroupIds, sortModifiers } = configUtils;
	/**
	* Set of classGroupIds in following format:
	* `{importantModifier}{variantModifiers}{classGroupId}`
	* @example 'float'
	* @example 'hover:focus:bg-color'
	* @example 'md:!pr'
	*/
	const classGroupsInConflict = [];
	const classNames = classList.trim().split(SPLIT_CLASSES_REGEX);
	let result = "";
	for (let index = classNames.length - 1; index >= 0; index -= 1) {
		const originalClassName = classNames[index];
		const { isExternal, modifiers, hasImportantModifier, baseClassName, maybePostfixModifierPosition } = parseClassName(originalClassName);
		if (isExternal) {
			result = originalClassName + (result.length > 0 ? " " + result : result);
			continue;
		}
		let hasPostfixModifier = !!maybePostfixModifierPosition;
		let classGroupId = getClassGroupId(hasPostfixModifier ? baseClassName.substring(0, maybePostfixModifierPosition) : baseClassName);
		if (!classGroupId) {
			if (!hasPostfixModifier) {
				result = originalClassName + (result.length > 0 ? " " + result : result);
				continue;
			}
			classGroupId = getClassGroupId(baseClassName);
			if (!classGroupId) {
				result = originalClassName + (result.length > 0 ? " " + result : result);
				continue;
			}
			hasPostfixModifier = false;
		}
		const variantModifier = sortModifiers(modifiers).join(":");
		const modifierId = hasImportantModifier ? variantModifier + IMPORTANT_MODIFIER : variantModifier;
		const classId = modifierId + classGroupId;
		if (classGroupsInConflict.includes(classId)) continue;
		classGroupsInConflict.push(classId);
		const conflictGroups = getConflictingClassGroupIds(classGroupId, hasPostfixModifier);
		for (let i$1 = 0; i$1 < conflictGroups.length; ++i$1) {
			const group = conflictGroups[i$1];
			classGroupsInConflict.push(modifierId + group);
		}
		result = originalClassName + (result.length > 0 ? " " + result : result);
	}
	return result;
};
/**
* The code in this file is copied from https://github.com/lukeed/clsx and modified to suit the needs of tailwind-merge better.
*
* Specifically:
* - Runtime code from https://github.com/lukeed/clsx/blob/v1.2.1/src/index.js
* - TypeScript types from https://github.com/lukeed/clsx/blob/v1.2.1/clsx.d.ts
*
* Original code has MIT license: Copyright (c) Luke Edwards <luke.edwards05@gmail.com> (lukeed.com)
*/
function twJoin() {
	let index = 0;
	let argument;
	let resolvedValue;
	let string = "";
	while (index < arguments.length) if (argument = arguments[index++]) {
		if (resolvedValue = toValue(argument)) {
			string && (string += " ");
			string += resolvedValue;
		}
	}
	return string;
}
const toValue = (mix) => {
	if (typeof mix === "string") return mix;
	let resolvedValue;
	let string = "";
	for (let k$1 = 0; k$1 < mix.length; k$1++) if (mix[k$1]) {
		if (resolvedValue = toValue(mix[k$1])) {
			string && (string += " ");
			string += resolvedValue;
		}
	}
	return string;
};
function createTailwindMerge(createConfigFirst, ...createConfigRest) {
	let configUtils;
	let cacheGet;
	let cacheSet;
	let functionToCall = initTailwindMerge;
	function initTailwindMerge(classList) {
		configUtils = createConfigUtils(createConfigRest.reduce((previousConfig, createConfigCurrent) => createConfigCurrent(previousConfig), createConfigFirst()));
		cacheGet = configUtils.cache.get;
		cacheSet = configUtils.cache.set;
		functionToCall = tailwindMerge;
		return tailwindMerge(classList);
	}
	function tailwindMerge(classList) {
		const cachedResult = cacheGet(classList);
		if (cachedResult) return cachedResult;
		const result = mergeClassList(classList, configUtils);
		cacheSet(classList, result);
		return result;
	}
	return function callTailwindMerge() {
		return functionToCall(twJoin.apply(null, arguments));
	};
}
const fromTheme = (key) => {
	const themeGetter = (theme) => theme[key] || [];
	themeGetter.isThemeGetter = true;
	return themeGetter;
};
const arbitraryValueRegex = /^\[(?:(\w[\w-]*):)?(.+)\]$/i;
const arbitraryVariableRegex = /^\((?:(\w[\w-]*):)?(.+)\)$/i;
const fractionRegex = /^\d+\/\d+$/;
const tshirtUnitRegex = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/;
const lengthUnitRegex = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/;
const colorFunctionRegex = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/;
const shadowRegex = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/;
const imageRegex = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/;
const isFraction = (value) => fractionRegex.test(value);
const isNumber = (value) => !!value && !Number.isNaN(Number(value));
const isInteger = (value) => !!value && Number.isInteger(Number(value));
const isPercent = (value) => value.endsWith("%") && isNumber(value.slice(0, -1));
const isTshirtSize = (value) => tshirtUnitRegex.test(value);
const isAny = () => true;
const isLengthOnly = (value) => lengthUnitRegex.test(value) && !colorFunctionRegex.test(value);
const isNever = () => false;
const isShadow = (value) => shadowRegex.test(value);
const isImage = (value) => imageRegex.test(value);
const isAnyNonArbitrary = (value) => !isArbitraryValue(value) && !isArbitraryVariable(value);
const isArbitrarySize = (value) => getIsArbitraryValue(value, isLabelSize, isNever);
const isArbitraryValue = (value) => arbitraryValueRegex.test(value);
const isArbitraryLength = (value) => getIsArbitraryValue(value, isLabelLength, isLengthOnly);
const isArbitraryNumber = (value) => getIsArbitraryValue(value, isLabelNumber, isNumber);
const isArbitraryPosition = (value) => getIsArbitraryValue(value, isLabelPosition, isNever);
const isArbitraryImage = (value) => getIsArbitraryValue(value, isLabelImage, isImage);
const isArbitraryShadow = (value) => getIsArbitraryValue(value, isLabelShadow, isShadow);
const isArbitraryVariable = (value) => arbitraryVariableRegex.test(value);
const isArbitraryVariableLength = (value) => getIsArbitraryVariable(value, isLabelLength);
const isArbitraryVariableFamilyName = (value) => getIsArbitraryVariable(value, isLabelFamilyName);
const isArbitraryVariablePosition = (value) => getIsArbitraryVariable(value, isLabelPosition);
const isArbitraryVariableSize = (value) => getIsArbitraryVariable(value, isLabelSize);
const isArbitraryVariableImage = (value) => getIsArbitraryVariable(value, isLabelImage);
const isArbitraryVariableShadow = (value) => getIsArbitraryVariable(value, isLabelShadow, true);
const getIsArbitraryValue = (value, testLabel, testValue) => {
	const result = arbitraryValueRegex.exec(value);
	if (result) {
		if (result[1]) return testLabel(result[1]);
		return testValue(result[2]);
	}
	return false;
};
const getIsArbitraryVariable = (value, testLabel, shouldMatchNoLabel = false) => {
	const result = arbitraryVariableRegex.exec(value);
	if (result) {
		if (result[1]) return testLabel(result[1]);
		return shouldMatchNoLabel;
	}
	return false;
};
const isLabelPosition = (label) => label === "position" || label === "percentage";
const isLabelImage = (label) => label === "image" || label === "url";
const isLabelSize = (label) => label === "length" || label === "size" || label === "bg-size";
const isLabelLength = (label) => label === "length";
const isLabelNumber = (label) => label === "number";
const isLabelFamilyName = (label) => label === "family-name";
const isLabelShadow = (label) => label === "shadow";
const getDefaultConfig = () => {
	/**
	* Theme getters for theme variable namespaces
	* @see https://tailwindcss.com/docs/theme#theme-variable-namespaces
	*/
	const themeColor = fromTheme("color");
	const themeFont = fromTheme("font");
	const themeText = fromTheme("text");
	const themeFontWeight = fromTheme("font-weight");
	const themeTracking = fromTheme("tracking");
	const themeLeading = fromTheme("leading");
	const themeBreakpoint = fromTheme("breakpoint");
	const themeContainer = fromTheme("container");
	const themeSpacing = fromTheme("spacing");
	const themeRadius = fromTheme("radius");
	const themeShadow = fromTheme("shadow");
	const themeInsetShadow = fromTheme("inset-shadow");
	const themeTextShadow = fromTheme("text-shadow");
	const themeDropShadow = fromTheme("drop-shadow");
	const themeBlur = fromTheme("blur");
	const themePerspective = fromTheme("perspective");
	const themeAspect = fromTheme("aspect");
	const themeEase = fromTheme("ease");
	const themeAnimate = fromTheme("animate");
	/**
	* Helpers to avoid repeating the same scales
	*
	* We use functions that create a new array every time they're called instead of static arrays.
	* This ensures that users who modify any scale by mutating the array (e.g. with `array.push(element)`) don't accidentally mutate arrays in other parts of the config.
	*/
	const scaleBreak = () => [
		"auto",
		"avoid",
		"all",
		"avoid-page",
		"page",
		"left",
		"right",
		"column"
	];
	const scalePosition = () => [
		"center",
		"top",
		"bottom",
		"left",
		"right",
		"top-left",
		"left-top",
		"top-right",
		"right-top",
		"bottom-right",
		"right-bottom",
		"bottom-left",
		"left-bottom"
	];
	const scalePositionWithArbitrary = () => [
		...scalePosition(),
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleOverflow = () => [
		"auto",
		"hidden",
		"clip",
		"visible",
		"scroll"
	];
	const scaleOverscroll = () => [
		"auto",
		"contain",
		"none"
	];
	const scaleUnambiguousSpacing = () => [
		isArbitraryVariable,
		isArbitraryValue,
		themeSpacing
	];
	const scaleInset = () => [
		isFraction,
		"full",
		"auto",
		...scaleUnambiguousSpacing()
	];
	const scaleGridTemplateColsRows = () => [
		isInteger,
		"none",
		"subgrid",
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleGridColRowStartAndEnd = () => [
		"auto",
		{ span: [
			"full",
			isInteger,
			isArbitraryVariable,
			isArbitraryValue
		] },
		isInteger,
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleGridColRowStartOrEnd = () => [
		isInteger,
		"auto",
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleGridAutoColsRows = () => [
		"auto",
		"min",
		"max",
		"fr",
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleAlignPrimaryAxis = () => [
		"start",
		"end",
		"center",
		"between",
		"around",
		"evenly",
		"stretch",
		"baseline",
		"center-safe",
		"end-safe"
	];
	const scaleAlignSecondaryAxis = () => [
		"start",
		"end",
		"center",
		"stretch",
		"center-safe",
		"end-safe"
	];
	const scaleMargin = () => ["auto", ...scaleUnambiguousSpacing()];
	const scaleSizing = () => [
		isFraction,
		"auto",
		"full",
		"dvw",
		"dvh",
		"lvw",
		"lvh",
		"svw",
		"svh",
		"min",
		"max",
		"fit",
		...scaleUnambiguousSpacing()
	];
	const scaleColor = () => [
		themeColor,
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleBgPosition = () => [
		...scalePosition(),
		isArbitraryVariablePosition,
		isArbitraryPosition,
		{ position: [isArbitraryVariable, isArbitraryValue] }
	];
	const scaleBgRepeat = () => ["no-repeat", { repeat: [
		"",
		"x",
		"y",
		"space",
		"round"
	] }];
	const scaleBgSize = () => [
		"auto",
		"cover",
		"contain",
		isArbitraryVariableSize,
		isArbitrarySize,
		{ size: [isArbitraryVariable, isArbitraryValue] }
	];
	const scaleGradientStopPosition = () => [
		isPercent,
		isArbitraryVariableLength,
		isArbitraryLength
	];
	const scaleRadius = () => [
		"",
		"none",
		"full",
		themeRadius,
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleBorderWidth = () => [
		"",
		isNumber,
		isArbitraryVariableLength,
		isArbitraryLength
	];
	const scaleLineStyle = () => [
		"solid",
		"dashed",
		"dotted",
		"double"
	];
	const scaleBlendMode = () => [
		"normal",
		"multiply",
		"screen",
		"overlay",
		"darken",
		"lighten",
		"color-dodge",
		"color-burn",
		"hard-light",
		"soft-light",
		"difference",
		"exclusion",
		"hue",
		"saturation",
		"color",
		"luminosity"
	];
	const scaleMaskImagePosition = () => [
		isNumber,
		isPercent,
		isArbitraryVariablePosition,
		isArbitraryPosition
	];
	const scaleBlur = () => [
		"",
		"none",
		themeBlur,
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleRotate = () => [
		"none",
		isNumber,
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleScale = () => [
		"none",
		isNumber,
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleSkew = () => [
		isNumber,
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleTranslate = () => [
		isFraction,
		"full",
		...scaleUnambiguousSpacing()
	];
	return {
		cacheSize: 500,
		theme: {
			animate: [
				"spin",
				"ping",
				"pulse",
				"bounce"
			],
			aspect: ["video"],
			blur: [isTshirtSize],
			breakpoint: [isTshirtSize],
			color: [isAny],
			container: [isTshirtSize],
			"drop-shadow": [isTshirtSize],
			ease: [
				"in",
				"out",
				"in-out"
			],
			font: [isAnyNonArbitrary],
			"font-weight": [
				"thin",
				"extralight",
				"light",
				"normal",
				"medium",
				"semibold",
				"bold",
				"extrabold",
				"black"
			],
			"inset-shadow": [isTshirtSize],
			leading: [
				"none",
				"tight",
				"snug",
				"normal",
				"relaxed",
				"loose"
			],
			perspective: [
				"dramatic",
				"near",
				"normal",
				"midrange",
				"distant",
				"none"
			],
			radius: [isTshirtSize],
			shadow: [isTshirtSize],
			spacing: ["px", isNumber],
			text: [isTshirtSize],
			"text-shadow": [isTshirtSize],
			tracking: [
				"tighter",
				"tight",
				"normal",
				"wide",
				"wider",
				"widest"
			]
		},
		classGroups: {
			aspect: [{ aspect: [
				"auto",
				"square",
				isFraction,
				isArbitraryValue,
				isArbitraryVariable,
				themeAspect
			] }],
			container: ["container"],
			columns: [{ columns: [
				isNumber,
				isArbitraryValue,
				isArbitraryVariable,
				themeContainer
			] }],
			"break-after": [{ "break-after": scaleBreak() }],
			"break-before": [{ "break-before": scaleBreak() }],
			"break-inside": [{ "break-inside": [
				"auto",
				"avoid",
				"avoid-page",
				"avoid-column"
			] }],
			"box-decoration": [{ "box-decoration": ["slice", "clone"] }],
			box: [{ box: ["border", "content"] }],
			display: [
				"block",
				"inline-block",
				"inline",
				"flex",
				"inline-flex",
				"table",
				"inline-table",
				"table-caption",
				"table-cell",
				"table-column",
				"table-column-group",
				"table-footer-group",
				"table-header-group",
				"table-row-group",
				"table-row",
				"flow-root",
				"grid",
				"inline-grid",
				"contents",
				"list-item",
				"hidden"
			],
			sr: ["sr-only", "not-sr-only"],
			float: [{ float: [
				"right",
				"left",
				"none",
				"start",
				"end"
			] }],
			clear: [{ clear: [
				"left",
				"right",
				"both",
				"none",
				"start",
				"end"
			] }],
			isolation: ["isolate", "isolation-auto"],
			"object-fit": [{ object: [
				"contain",
				"cover",
				"fill",
				"none",
				"scale-down"
			] }],
			"object-position": [{ object: scalePositionWithArbitrary() }],
			overflow: [{ overflow: scaleOverflow() }],
			"overflow-x": [{ "overflow-x": scaleOverflow() }],
			"overflow-y": [{ "overflow-y": scaleOverflow() }],
			overscroll: [{ overscroll: scaleOverscroll() }],
			"overscroll-x": [{ "overscroll-x": scaleOverscroll() }],
			"overscroll-y": [{ "overscroll-y": scaleOverscroll() }],
			position: [
				"static",
				"fixed",
				"absolute",
				"relative",
				"sticky"
			],
			inset: [{ inset: scaleInset() }],
			"inset-x": [{ "inset-x": scaleInset() }],
			"inset-y": [{ "inset-y": scaleInset() }],
			start: [{ start: scaleInset() }],
			end: [{ end: scaleInset() }],
			top: [{ top: scaleInset() }],
			right: [{ right: scaleInset() }],
			bottom: [{ bottom: scaleInset() }],
			left: [{ left: scaleInset() }],
			visibility: [
				"visible",
				"invisible",
				"collapse"
			],
			z: [{ z: [
				isInteger,
				"auto",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			basis: [{ basis: [
				isFraction,
				"full",
				"auto",
				themeContainer,
				...scaleUnambiguousSpacing()
			] }],
			"flex-direction": [{ flex: [
				"row",
				"row-reverse",
				"col",
				"col-reverse"
			] }],
			"flex-wrap": [{ flex: [
				"nowrap",
				"wrap",
				"wrap-reverse"
			] }],
			flex: [{ flex: [
				isNumber,
				isFraction,
				"auto",
				"initial",
				"none",
				isArbitraryValue
			] }],
			grow: [{ grow: [
				"",
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			shrink: [{ shrink: [
				"",
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			order: [{ order: [
				isInteger,
				"first",
				"last",
				"none",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"grid-cols": [{ "grid-cols": scaleGridTemplateColsRows() }],
			"col-start-end": [{ col: scaleGridColRowStartAndEnd() }],
			"col-start": [{ "col-start": scaleGridColRowStartOrEnd() }],
			"col-end": [{ "col-end": scaleGridColRowStartOrEnd() }],
			"grid-rows": [{ "grid-rows": scaleGridTemplateColsRows() }],
			"row-start-end": [{ row: scaleGridColRowStartAndEnd() }],
			"row-start": [{ "row-start": scaleGridColRowStartOrEnd() }],
			"row-end": [{ "row-end": scaleGridColRowStartOrEnd() }],
			"grid-flow": [{ "grid-flow": [
				"row",
				"col",
				"dense",
				"row-dense",
				"col-dense"
			] }],
			"auto-cols": [{ "auto-cols": scaleGridAutoColsRows() }],
			"auto-rows": [{ "auto-rows": scaleGridAutoColsRows() }],
			gap: [{ gap: scaleUnambiguousSpacing() }],
			"gap-x": [{ "gap-x": scaleUnambiguousSpacing() }],
			"gap-y": [{ "gap-y": scaleUnambiguousSpacing() }],
			"justify-content": [{ justify: [...scaleAlignPrimaryAxis(), "normal"] }],
			"justify-items": [{ "justify-items": [...scaleAlignSecondaryAxis(), "normal"] }],
			"justify-self": [{ "justify-self": ["auto", ...scaleAlignSecondaryAxis()] }],
			"align-content": [{ content: ["normal", ...scaleAlignPrimaryAxis()] }],
			"align-items": [{ items: [...scaleAlignSecondaryAxis(), { baseline: ["", "last"] }] }],
			"align-self": [{ self: [
				"auto",
				...scaleAlignSecondaryAxis(),
				{ baseline: ["", "last"] }
			] }],
			"place-content": [{ "place-content": scaleAlignPrimaryAxis() }],
			"place-items": [{ "place-items": [...scaleAlignSecondaryAxis(), "baseline"] }],
			"place-self": [{ "place-self": ["auto", ...scaleAlignSecondaryAxis()] }],
			p: [{ p: scaleUnambiguousSpacing() }],
			px: [{ px: scaleUnambiguousSpacing() }],
			py: [{ py: scaleUnambiguousSpacing() }],
			ps: [{ ps: scaleUnambiguousSpacing() }],
			pe: [{ pe: scaleUnambiguousSpacing() }],
			pt: [{ pt: scaleUnambiguousSpacing() }],
			pr: [{ pr: scaleUnambiguousSpacing() }],
			pb: [{ pb: scaleUnambiguousSpacing() }],
			pl: [{ pl: scaleUnambiguousSpacing() }],
			m: [{ m: scaleMargin() }],
			mx: [{ mx: scaleMargin() }],
			my: [{ my: scaleMargin() }],
			ms: [{ ms: scaleMargin() }],
			me: [{ me: scaleMargin() }],
			mt: [{ mt: scaleMargin() }],
			mr: [{ mr: scaleMargin() }],
			mb: [{ mb: scaleMargin() }],
			ml: [{ ml: scaleMargin() }],
			"space-x": [{ "space-x": scaleUnambiguousSpacing() }],
			"space-x-reverse": ["space-x-reverse"],
			"space-y": [{ "space-y": scaleUnambiguousSpacing() }],
			"space-y-reverse": ["space-y-reverse"],
			size: [{ size: scaleSizing() }],
			w: [{ w: [
				themeContainer,
				"screen",
				...scaleSizing()
			] }],
			"min-w": [{ "min-w": [
				themeContainer,
				"screen",
				"none",
				...scaleSizing()
			] }],
			"max-w": [{ "max-w": [
				themeContainer,
				"screen",
				"none",
				"prose",
				{ screen: [themeBreakpoint] },
				...scaleSizing()
			] }],
			h: [{ h: [
				"screen",
				"lh",
				...scaleSizing()
			] }],
			"min-h": [{ "min-h": [
				"screen",
				"lh",
				"none",
				...scaleSizing()
			] }],
			"max-h": [{ "max-h": [
				"screen",
				"lh",
				...scaleSizing()
			] }],
			"font-size": [{ text: [
				"base",
				themeText,
				isArbitraryVariableLength,
				isArbitraryLength
			] }],
			"font-smoothing": ["antialiased", "subpixel-antialiased"],
			"font-style": ["italic", "not-italic"],
			"font-weight": [{ font: [
				themeFontWeight,
				isArbitraryVariable,
				isArbitraryNumber
			] }],
			"font-stretch": [{ "font-stretch": [
				"ultra-condensed",
				"extra-condensed",
				"condensed",
				"semi-condensed",
				"normal",
				"semi-expanded",
				"expanded",
				"extra-expanded",
				"ultra-expanded",
				isPercent,
				isArbitraryValue
			] }],
			"font-family": [{ font: [
				isArbitraryVariableFamilyName,
				isArbitraryValue,
				themeFont
			] }],
			"fvn-normal": ["normal-nums"],
			"fvn-ordinal": ["ordinal"],
			"fvn-slashed-zero": ["slashed-zero"],
			"fvn-figure": ["lining-nums", "oldstyle-nums"],
			"fvn-spacing": ["proportional-nums", "tabular-nums"],
			"fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
			tracking: [{ tracking: [
				themeTracking,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"line-clamp": [{ "line-clamp": [
				isNumber,
				"none",
				isArbitraryVariable,
				isArbitraryNumber
			] }],
			leading: [{ leading: [themeLeading, ...scaleUnambiguousSpacing()] }],
			"list-image": [{ "list-image": [
				"none",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"list-style-position": [{ list: ["inside", "outside"] }],
			"list-style-type": [{ list: [
				"disc",
				"decimal",
				"none",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"text-alignment": [{ text: [
				"left",
				"center",
				"right",
				"justify",
				"start",
				"end"
			] }],
			"placeholder-color": [{ placeholder: scaleColor() }],
			"text-color": [{ text: scaleColor() }],
			"text-decoration": [
				"underline",
				"overline",
				"line-through",
				"no-underline"
			],
			"text-decoration-style": [{ decoration: [...scaleLineStyle(), "wavy"] }],
			"text-decoration-thickness": [{ decoration: [
				isNumber,
				"from-font",
				"auto",
				isArbitraryVariable,
				isArbitraryLength
			] }],
			"text-decoration-color": [{ decoration: scaleColor() }],
			"underline-offset": [{ "underline-offset": [
				isNumber,
				"auto",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"text-transform": [
				"uppercase",
				"lowercase",
				"capitalize",
				"normal-case"
			],
			"text-overflow": [
				"truncate",
				"text-ellipsis",
				"text-clip"
			],
			"text-wrap": [{ text: [
				"wrap",
				"nowrap",
				"balance",
				"pretty"
			] }],
			indent: [{ indent: scaleUnambiguousSpacing() }],
			"vertical-align": [{ align: [
				"baseline",
				"top",
				"middle",
				"bottom",
				"text-top",
				"text-bottom",
				"sub",
				"super",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			whitespace: [{ whitespace: [
				"normal",
				"nowrap",
				"pre",
				"pre-line",
				"pre-wrap",
				"break-spaces"
			] }],
			break: [{ break: [
				"normal",
				"words",
				"all",
				"keep"
			] }],
			wrap: [{ wrap: [
				"break-word",
				"anywhere",
				"normal"
			] }],
			hyphens: [{ hyphens: [
				"none",
				"manual",
				"auto"
			] }],
			content: [{ content: [
				"none",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"bg-attachment": [{ bg: [
				"fixed",
				"local",
				"scroll"
			] }],
			"bg-clip": [{ "bg-clip": [
				"border",
				"padding",
				"content",
				"text"
			] }],
			"bg-origin": [{ "bg-origin": [
				"border",
				"padding",
				"content"
			] }],
			"bg-position": [{ bg: scaleBgPosition() }],
			"bg-repeat": [{ bg: scaleBgRepeat() }],
			"bg-size": [{ bg: scaleBgSize() }],
			"bg-image": [{ bg: [
				"none",
				{
					linear: [
						{ to: [
							"t",
							"tr",
							"r",
							"br",
							"b",
							"bl",
							"l",
							"tl"
						] },
						isInteger,
						isArbitraryVariable,
						isArbitraryValue
					],
					radial: [
						"",
						isArbitraryVariable,
						isArbitraryValue
					],
					conic: [
						isInteger,
						isArbitraryVariable,
						isArbitraryValue
					]
				},
				isArbitraryVariableImage,
				isArbitraryImage
			] }],
			"bg-color": [{ bg: scaleColor() }],
			"gradient-from-pos": [{ from: scaleGradientStopPosition() }],
			"gradient-via-pos": [{ via: scaleGradientStopPosition() }],
			"gradient-to-pos": [{ to: scaleGradientStopPosition() }],
			"gradient-from": [{ from: scaleColor() }],
			"gradient-via": [{ via: scaleColor() }],
			"gradient-to": [{ to: scaleColor() }],
			rounded: [{ rounded: scaleRadius() }],
			"rounded-s": [{ "rounded-s": scaleRadius() }],
			"rounded-e": [{ "rounded-e": scaleRadius() }],
			"rounded-t": [{ "rounded-t": scaleRadius() }],
			"rounded-r": [{ "rounded-r": scaleRadius() }],
			"rounded-b": [{ "rounded-b": scaleRadius() }],
			"rounded-l": [{ "rounded-l": scaleRadius() }],
			"rounded-ss": [{ "rounded-ss": scaleRadius() }],
			"rounded-se": [{ "rounded-se": scaleRadius() }],
			"rounded-ee": [{ "rounded-ee": scaleRadius() }],
			"rounded-es": [{ "rounded-es": scaleRadius() }],
			"rounded-tl": [{ "rounded-tl": scaleRadius() }],
			"rounded-tr": [{ "rounded-tr": scaleRadius() }],
			"rounded-br": [{ "rounded-br": scaleRadius() }],
			"rounded-bl": [{ "rounded-bl": scaleRadius() }],
			"border-w": [{ border: scaleBorderWidth() }],
			"border-w-x": [{ "border-x": scaleBorderWidth() }],
			"border-w-y": [{ "border-y": scaleBorderWidth() }],
			"border-w-s": [{ "border-s": scaleBorderWidth() }],
			"border-w-e": [{ "border-e": scaleBorderWidth() }],
			"border-w-t": [{ "border-t": scaleBorderWidth() }],
			"border-w-r": [{ "border-r": scaleBorderWidth() }],
			"border-w-b": [{ "border-b": scaleBorderWidth() }],
			"border-w-l": [{ "border-l": scaleBorderWidth() }],
			"divide-x": [{ "divide-x": scaleBorderWidth() }],
			"divide-x-reverse": ["divide-x-reverse"],
			"divide-y": [{ "divide-y": scaleBorderWidth() }],
			"divide-y-reverse": ["divide-y-reverse"],
			"border-style": [{ border: [
				...scaleLineStyle(),
				"hidden",
				"none"
			] }],
			"divide-style": [{ divide: [
				...scaleLineStyle(),
				"hidden",
				"none"
			] }],
			"border-color": [{ border: scaleColor() }],
			"border-color-x": [{ "border-x": scaleColor() }],
			"border-color-y": [{ "border-y": scaleColor() }],
			"border-color-s": [{ "border-s": scaleColor() }],
			"border-color-e": [{ "border-e": scaleColor() }],
			"border-color-t": [{ "border-t": scaleColor() }],
			"border-color-r": [{ "border-r": scaleColor() }],
			"border-color-b": [{ "border-b": scaleColor() }],
			"border-color-l": [{ "border-l": scaleColor() }],
			"divide-color": [{ divide: scaleColor() }],
			"outline-style": [{ outline: [
				...scaleLineStyle(),
				"none",
				"hidden"
			] }],
			"outline-offset": [{ "outline-offset": [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"outline-w": [{ outline: [
				"",
				isNumber,
				isArbitraryVariableLength,
				isArbitraryLength
			] }],
			"outline-color": [{ outline: scaleColor() }],
			shadow: [{ shadow: [
				"",
				"none",
				themeShadow,
				isArbitraryVariableShadow,
				isArbitraryShadow
			] }],
			"shadow-color": [{ shadow: scaleColor() }],
			"inset-shadow": [{ "inset-shadow": [
				"none",
				themeInsetShadow,
				isArbitraryVariableShadow,
				isArbitraryShadow
			] }],
			"inset-shadow-color": [{ "inset-shadow": scaleColor() }],
			"ring-w": [{ ring: scaleBorderWidth() }],
			"ring-w-inset": ["ring-inset"],
			"ring-color": [{ ring: scaleColor() }],
			"ring-offset-w": [{ "ring-offset": [isNumber, isArbitraryLength] }],
			"ring-offset-color": [{ "ring-offset": scaleColor() }],
			"inset-ring-w": [{ "inset-ring": scaleBorderWidth() }],
			"inset-ring-color": [{ "inset-ring": scaleColor() }],
			"text-shadow": [{ "text-shadow": [
				"none",
				themeTextShadow,
				isArbitraryVariableShadow,
				isArbitraryShadow
			] }],
			"text-shadow-color": [{ "text-shadow": scaleColor() }],
			opacity: [{ opacity: [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"mix-blend": [{ "mix-blend": [
				...scaleBlendMode(),
				"plus-darker",
				"plus-lighter"
			] }],
			"bg-blend": [{ "bg-blend": scaleBlendMode() }],
			"mask-clip": [{ "mask-clip": [
				"border",
				"padding",
				"content",
				"fill",
				"stroke",
				"view"
			] }, "mask-no-clip"],
			"mask-composite": [{ mask: [
				"add",
				"subtract",
				"intersect",
				"exclude"
			] }],
			"mask-image-linear-pos": [{ "mask-linear": [isNumber] }],
			"mask-image-linear-from-pos": [{ "mask-linear-from": scaleMaskImagePosition() }],
			"mask-image-linear-to-pos": [{ "mask-linear-to": scaleMaskImagePosition() }],
			"mask-image-linear-from-color": [{ "mask-linear-from": scaleColor() }],
			"mask-image-linear-to-color": [{ "mask-linear-to": scaleColor() }],
			"mask-image-t-from-pos": [{ "mask-t-from": scaleMaskImagePosition() }],
			"mask-image-t-to-pos": [{ "mask-t-to": scaleMaskImagePosition() }],
			"mask-image-t-from-color": [{ "mask-t-from": scaleColor() }],
			"mask-image-t-to-color": [{ "mask-t-to": scaleColor() }],
			"mask-image-r-from-pos": [{ "mask-r-from": scaleMaskImagePosition() }],
			"mask-image-r-to-pos": [{ "mask-r-to": scaleMaskImagePosition() }],
			"mask-image-r-from-color": [{ "mask-r-from": scaleColor() }],
			"mask-image-r-to-color": [{ "mask-r-to": scaleColor() }],
			"mask-image-b-from-pos": [{ "mask-b-from": scaleMaskImagePosition() }],
			"mask-image-b-to-pos": [{ "mask-b-to": scaleMaskImagePosition() }],
			"mask-image-b-from-color": [{ "mask-b-from": scaleColor() }],
			"mask-image-b-to-color": [{ "mask-b-to": scaleColor() }],
			"mask-image-l-from-pos": [{ "mask-l-from": scaleMaskImagePosition() }],
			"mask-image-l-to-pos": [{ "mask-l-to": scaleMaskImagePosition() }],
			"mask-image-l-from-color": [{ "mask-l-from": scaleColor() }],
			"mask-image-l-to-color": [{ "mask-l-to": scaleColor() }],
			"mask-image-x-from-pos": [{ "mask-x-from": scaleMaskImagePosition() }],
			"mask-image-x-to-pos": [{ "mask-x-to": scaleMaskImagePosition() }],
			"mask-image-x-from-color": [{ "mask-x-from": scaleColor() }],
			"mask-image-x-to-color": [{ "mask-x-to": scaleColor() }],
			"mask-image-y-from-pos": [{ "mask-y-from": scaleMaskImagePosition() }],
			"mask-image-y-to-pos": [{ "mask-y-to": scaleMaskImagePosition() }],
			"mask-image-y-from-color": [{ "mask-y-from": scaleColor() }],
			"mask-image-y-to-color": [{ "mask-y-to": scaleColor() }],
			"mask-image-radial": [{ "mask-radial": [isArbitraryVariable, isArbitraryValue] }],
			"mask-image-radial-from-pos": [{ "mask-radial-from": scaleMaskImagePosition() }],
			"mask-image-radial-to-pos": [{ "mask-radial-to": scaleMaskImagePosition() }],
			"mask-image-radial-from-color": [{ "mask-radial-from": scaleColor() }],
			"mask-image-radial-to-color": [{ "mask-radial-to": scaleColor() }],
			"mask-image-radial-shape": [{ "mask-radial": ["circle", "ellipse"] }],
			"mask-image-radial-size": [{ "mask-radial": [{
				closest: ["side", "corner"],
				farthest: ["side", "corner"]
			}] }],
			"mask-image-radial-pos": [{ "mask-radial-at": scalePosition() }],
			"mask-image-conic-pos": [{ "mask-conic": [isNumber] }],
			"mask-image-conic-from-pos": [{ "mask-conic-from": scaleMaskImagePosition() }],
			"mask-image-conic-to-pos": [{ "mask-conic-to": scaleMaskImagePosition() }],
			"mask-image-conic-from-color": [{ "mask-conic-from": scaleColor() }],
			"mask-image-conic-to-color": [{ "mask-conic-to": scaleColor() }],
			"mask-mode": [{ mask: [
				"alpha",
				"luminance",
				"match"
			] }],
			"mask-origin": [{ "mask-origin": [
				"border",
				"padding",
				"content",
				"fill",
				"stroke",
				"view"
			] }],
			"mask-position": [{ mask: scaleBgPosition() }],
			"mask-repeat": [{ mask: scaleBgRepeat() }],
			"mask-size": [{ mask: scaleBgSize() }],
			"mask-type": [{ "mask-type": ["alpha", "luminance"] }],
			"mask-image": [{ mask: [
				"none",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			filter: [{ filter: [
				"",
				"none",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			blur: [{ blur: scaleBlur() }],
			brightness: [{ brightness: [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			contrast: [{ contrast: [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"drop-shadow": [{ "drop-shadow": [
				"",
				"none",
				themeDropShadow,
				isArbitraryVariableShadow,
				isArbitraryShadow
			] }],
			"drop-shadow-color": [{ "drop-shadow": scaleColor() }],
			grayscale: [{ grayscale: [
				"",
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"hue-rotate": [{ "hue-rotate": [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			invert: [{ invert: [
				"",
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			saturate: [{ saturate: [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			sepia: [{ sepia: [
				"",
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"backdrop-filter": [{ "backdrop-filter": [
				"",
				"none",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"backdrop-blur": [{ "backdrop-blur": scaleBlur() }],
			"backdrop-brightness": [{ "backdrop-brightness": [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"backdrop-contrast": [{ "backdrop-contrast": [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"backdrop-grayscale": [{ "backdrop-grayscale": [
				"",
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"backdrop-hue-rotate": [{ "backdrop-hue-rotate": [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"backdrop-invert": [{ "backdrop-invert": [
				"",
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"backdrop-opacity": [{ "backdrop-opacity": [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"backdrop-saturate": [{ "backdrop-saturate": [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"backdrop-sepia": [{ "backdrop-sepia": [
				"",
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"border-collapse": [{ border: ["collapse", "separate"] }],
			"border-spacing": [{ "border-spacing": scaleUnambiguousSpacing() }],
			"border-spacing-x": [{ "border-spacing-x": scaleUnambiguousSpacing() }],
			"border-spacing-y": [{ "border-spacing-y": scaleUnambiguousSpacing() }],
			"table-layout": [{ table: ["auto", "fixed"] }],
			caption: [{ caption: ["top", "bottom"] }],
			transition: [{ transition: [
				"",
				"all",
				"colors",
				"opacity",
				"shadow",
				"transform",
				"none",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"transition-behavior": [{ transition: ["normal", "discrete"] }],
			duration: [{ duration: [
				isNumber,
				"initial",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			ease: [{ ease: [
				"linear",
				"initial",
				themeEase,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			delay: [{ delay: [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			animate: [{ animate: [
				"none",
				themeAnimate,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			backface: [{ backface: ["hidden", "visible"] }],
			perspective: [{ perspective: [
				themePerspective,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"perspective-origin": [{ "perspective-origin": scalePositionWithArbitrary() }],
			rotate: [{ rotate: scaleRotate() }],
			"rotate-x": [{ "rotate-x": scaleRotate() }],
			"rotate-y": [{ "rotate-y": scaleRotate() }],
			"rotate-z": [{ "rotate-z": scaleRotate() }],
			scale: [{ scale: scaleScale() }],
			"scale-x": [{ "scale-x": scaleScale() }],
			"scale-y": [{ "scale-y": scaleScale() }],
			"scale-z": [{ "scale-z": scaleScale() }],
			"scale-3d": ["scale-3d"],
			skew: [{ skew: scaleSkew() }],
			"skew-x": [{ "skew-x": scaleSkew() }],
			"skew-y": [{ "skew-y": scaleSkew() }],
			transform: [{ transform: [
				isArbitraryVariable,
				isArbitraryValue,
				"",
				"none",
				"gpu",
				"cpu"
			] }],
			"transform-origin": [{ origin: scalePositionWithArbitrary() }],
			"transform-style": [{ transform: ["3d", "flat"] }],
			translate: [{ translate: scaleTranslate() }],
			"translate-x": [{ "translate-x": scaleTranslate() }],
			"translate-y": [{ "translate-y": scaleTranslate() }],
			"translate-z": [{ "translate-z": scaleTranslate() }],
			"translate-none": ["translate-none"],
			accent: [{ accent: scaleColor() }],
			appearance: [{ appearance: ["none", "auto"] }],
			"caret-color": [{ caret: scaleColor() }],
			"color-scheme": [{ scheme: [
				"normal",
				"dark",
				"light",
				"light-dark",
				"only-dark",
				"only-light"
			] }],
			cursor: [{ cursor: [
				"auto",
				"default",
				"pointer",
				"wait",
				"text",
				"move",
				"help",
				"not-allowed",
				"none",
				"context-menu",
				"progress",
				"cell",
				"crosshair",
				"vertical-text",
				"alias",
				"copy",
				"no-drop",
				"grab",
				"grabbing",
				"all-scroll",
				"col-resize",
				"row-resize",
				"n-resize",
				"e-resize",
				"s-resize",
				"w-resize",
				"ne-resize",
				"nw-resize",
				"se-resize",
				"sw-resize",
				"ew-resize",
				"ns-resize",
				"nesw-resize",
				"nwse-resize",
				"zoom-in",
				"zoom-out",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"field-sizing": [{ "field-sizing": ["fixed", "content"] }],
			"pointer-events": [{ "pointer-events": ["auto", "none"] }],
			resize: [{ resize: [
				"none",
				"",
				"y",
				"x"
			] }],
			"scroll-behavior": [{ scroll: ["auto", "smooth"] }],
			"scroll-m": [{ "scroll-m": scaleUnambiguousSpacing() }],
			"scroll-mx": [{ "scroll-mx": scaleUnambiguousSpacing() }],
			"scroll-my": [{ "scroll-my": scaleUnambiguousSpacing() }],
			"scroll-ms": [{ "scroll-ms": scaleUnambiguousSpacing() }],
			"scroll-me": [{ "scroll-me": scaleUnambiguousSpacing() }],
			"scroll-mt": [{ "scroll-mt": scaleUnambiguousSpacing() }],
			"scroll-mr": [{ "scroll-mr": scaleUnambiguousSpacing() }],
			"scroll-mb": [{ "scroll-mb": scaleUnambiguousSpacing() }],
			"scroll-ml": [{ "scroll-ml": scaleUnambiguousSpacing() }],
			"scroll-p": [{ "scroll-p": scaleUnambiguousSpacing() }],
			"scroll-px": [{ "scroll-px": scaleUnambiguousSpacing() }],
			"scroll-py": [{ "scroll-py": scaleUnambiguousSpacing() }],
			"scroll-ps": [{ "scroll-ps": scaleUnambiguousSpacing() }],
			"scroll-pe": [{ "scroll-pe": scaleUnambiguousSpacing() }],
			"scroll-pt": [{ "scroll-pt": scaleUnambiguousSpacing() }],
			"scroll-pr": [{ "scroll-pr": scaleUnambiguousSpacing() }],
			"scroll-pb": [{ "scroll-pb": scaleUnambiguousSpacing() }],
			"scroll-pl": [{ "scroll-pl": scaleUnambiguousSpacing() }],
			"snap-align": [{ snap: [
				"start",
				"end",
				"center",
				"align-none"
			] }],
			"snap-stop": [{ snap: ["normal", "always"] }],
			"snap-type": [{ snap: [
				"none",
				"x",
				"y",
				"both"
			] }],
			"snap-strictness": [{ snap: ["mandatory", "proximity"] }],
			touch: [{ touch: [
				"auto",
				"none",
				"manipulation"
			] }],
			"touch-x": [{ "touch-pan": [
				"x",
				"left",
				"right"
			] }],
			"touch-y": [{ "touch-pan": [
				"y",
				"up",
				"down"
			] }],
			"touch-pz": ["touch-pinch-zoom"],
			select: [{ select: [
				"none",
				"text",
				"all",
				"auto"
			] }],
			"will-change": [{ "will-change": [
				"auto",
				"scroll",
				"contents",
				"transform",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			fill: [{ fill: ["none", ...scaleColor()] }],
			"stroke-w": [{ stroke: [
				isNumber,
				isArbitraryVariableLength,
				isArbitraryLength,
				isArbitraryNumber
			] }],
			stroke: [{ stroke: ["none", ...scaleColor()] }],
			"forced-color-adjust": [{ "forced-color-adjust": ["auto", "none"] }]
		},
		conflictingClassGroups: {
			overflow: ["overflow-x", "overflow-y"],
			overscroll: ["overscroll-x", "overscroll-y"],
			inset: [
				"inset-x",
				"inset-y",
				"start",
				"end",
				"top",
				"right",
				"bottom",
				"left"
			],
			"inset-x": ["right", "left"],
			"inset-y": ["top", "bottom"],
			flex: [
				"basis",
				"grow",
				"shrink"
			],
			gap: ["gap-x", "gap-y"],
			p: [
				"px",
				"py",
				"ps",
				"pe",
				"pt",
				"pr",
				"pb",
				"pl"
			],
			px: ["pr", "pl"],
			py: ["pt", "pb"],
			m: [
				"mx",
				"my",
				"ms",
				"me",
				"mt",
				"mr",
				"mb",
				"ml"
			],
			mx: ["mr", "ml"],
			my: ["mt", "mb"],
			size: ["w", "h"],
			"font-size": ["leading"],
			"fvn-normal": [
				"fvn-ordinal",
				"fvn-slashed-zero",
				"fvn-figure",
				"fvn-spacing",
				"fvn-fraction"
			],
			"fvn-ordinal": ["fvn-normal"],
			"fvn-slashed-zero": ["fvn-normal"],
			"fvn-figure": ["fvn-normal"],
			"fvn-spacing": ["fvn-normal"],
			"fvn-fraction": ["fvn-normal"],
			"line-clamp": ["display", "overflow"],
			rounded: [
				"rounded-s",
				"rounded-e",
				"rounded-t",
				"rounded-r",
				"rounded-b",
				"rounded-l",
				"rounded-ss",
				"rounded-se",
				"rounded-ee",
				"rounded-es",
				"rounded-tl",
				"rounded-tr",
				"rounded-br",
				"rounded-bl"
			],
			"rounded-s": ["rounded-ss", "rounded-es"],
			"rounded-e": ["rounded-se", "rounded-ee"],
			"rounded-t": ["rounded-tl", "rounded-tr"],
			"rounded-r": ["rounded-tr", "rounded-br"],
			"rounded-b": ["rounded-br", "rounded-bl"],
			"rounded-l": ["rounded-tl", "rounded-bl"],
			"border-spacing": ["border-spacing-x", "border-spacing-y"],
			"border-w": [
				"border-w-x",
				"border-w-y",
				"border-w-s",
				"border-w-e",
				"border-w-t",
				"border-w-r",
				"border-w-b",
				"border-w-l"
			],
			"border-w-x": ["border-w-r", "border-w-l"],
			"border-w-y": ["border-w-t", "border-w-b"],
			"border-color": [
				"border-color-x",
				"border-color-y",
				"border-color-s",
				"border-color-e",
				"border-color-t",
				"border-color-r",
				"border-color-b",
				"border-color-l"
			],
			"border-color-x": ["border-color-r", "border-color-l"],
			"border-color-y": ["border-color-t", "border-color-b"],
			translate: [
				"translate-x",
				"translate-y",
				"translate-none"
			],
			"translate-none": [
				"translate",
				"translate-x",
				"translate-y",
				"translate-z"
			],
			"scroll-m": [
				"scroll-mx",
				"scroll-my",
				"scroll-ms",
				"scroll-me",
				"scroll-mt",
				"scroll-mr",
				"scroll-mb",
				"scroll-ml"
			],
			"scroll-mx": ["scroll-mr", "scroll-ml"],
			"scroll-my": ["scroll-mt", "scroll-mb"],
			"scroll-p": [
				"scroll-px",
				"scroll-py",
				"scroll-ps",
				"scroll-pe",
				"scroll-pt",
				"scroll-pr",
				"scroll-pb",
				"scroll-pl"
			],
			"scroll-px": ["scroll-pr", "scroll-pl"],
			"scroll-py": ["scroll-pt", "scroll-pb"],
			touch: [
				"touch-x",
				"touch-y",
				"touch-pz"
			],
			"touch-x": ["touch"],
			"touch-y": ["touch"],
			"touch-pz": ["touch"]
		},
		conflictingClassGroupModifiers: { "font-size": ["leading"] },
		orderSensitiveModifiers: [
			"*",
			"**",
			"after",
			"backdrop",
			"before",
			"details-content",
			"file",
			"first-letter",
			"first-line",
			"marker",
			"placeholder",
			"selection"
		]
	};
};
/**
* @param baseConfig Config where other config will be merged into. This object will be mutated.
* @param configExtension Partial config to merge into the `baseConfig`.
*/
const mergeConfigs = (baseConfig, { cacheSize, prefix, experimentalParseClassName, extend = {}, override = {} }) => {
	overrideProperty(baseConfig, "cacheSize", cacheSize);
	overrideProperty(baseConfig, "prefix", prefix);
	overrideProperty(baseConfig, "experimentalParseClassName", experimentalParseClassName);
	overrideConfigProperties(baseConfig.theme, override.theme);
	overrideConfigProperties(baseConfig.classGroups, override.classGroups);
	overrideConfigProperties(baseConfig.conflictingClassGroups, override.conflictingClassGroups);
	overrideConfigProperties(baseConfig.conflictingClassGroupModifiers, override.conflictingClassGroupModifiers);
	overrideProperty(baseConfig, "orderSensitiveModifiers", override.orderSensitiveModifiers);
	mergeConfigProperties(baseConfig.theme, extend.theme);
	mergeConfigProperties(baseConfig.classGroups, extend.classGroups);
	mergeConfigProperties(baseConfig.conflictingClassGroups, extend.conflictingClassGroups);
	mergeConfigProperties(baseConfig.conflictingClassGroupModifiers, extend.conflictingClassGroupModifiers);
	mergeArrayProperties(baseConfig, extend, "orderSensitiveModifiers");
	return baseConfig;
};
const overrideProperty = (baseObject, overrideKey, overrideValue) => {
	if (overrideValue !== void 0) baseObject[overrideKey] = overrideValue;
};
const overrideConfigProperties = (baseObject, overrideObject) => {
	if (overrideObject) for (const key in overrideObject) overrideProperty(baseObject, key, overrideObject[key]);
};
const mergeConfigProperties = (baseObject, mergeObject) => {
	if (mergeObject) for (const key in mergeObject) mergeArrayProperties(baseObject, mergeObject, key);
};
const mergeArrayProperties = (baseObject, mergeObject, key) => {
	const mergeValue = mergeObject[key];
	if (mergeValue !== void 0) baseObject[key] = baseObject[key] ? baseObject[key].concat(mergeValue) : mergeValue;
};
const extendTailwindMerge = (configExtension, ...createConfig) => typeof configExtension === "function" ? createTailwindMerge(getDefaultConfig, configExtension, ...createConfig) : createTailwindMerge(() => mergeConfigs(getDefaultConfig(), configExtension), ...createConfig);
const twMerge = /* @__PURE__ */ createTailwindMerge(getDefaultConfig);

//#endregion
//#region ../../node_modules/.pnpm/tailwind-variants@3.1.1_tailwind-merge@3.3.1_tailwindcss@4.1.14/node_modules/tailwind-variants/dist/index.js
var f = (e) => x(e) ? twMerge : extendTailwindMerge({
	...e,
	extend: {
		theme: e.theme,
		classGroups: e.classGroups,
		conflictingClassGroupModifiers: e.conflictingClassGroupModifiers,
		conflictingClassGroups: e.conflictingClassGroups,
		...e.extend
	}
}), i = (...e) => (a$1) => {
	let t = u(e);
	return !t || !a$1.twMerge ? t : ((!S.cachedTwMerge || S.didTwMergeConfigChange) && (S.didTwMergeConfigChange = false, S.cachedTwMerge = f(S.cachedTwMergeConfig)), S.cachedTwMerge(t) || void 0);
};
var { createTV: C, tv: T } = le(i);

//#endregion
//#region ../../node_modules/.pnpm/@heroui+theme@2.4.23_tailwindcss@4.1.14/node_modules/@heroui/theme/dist/chunk-TX3FPB7D.mjs
var tv = (options, config) => {
	var _a, _b, _c;
	return T(options, {
		...config,
		twMerge: (_a = config == null ? void 0 : config.twMerge) != null ? _a : true,
		twMergeConfig: {
			...config == null ? void 0 : config.twMergeConfig,
			theme: {
				...(_b = config == null ? void 0 : config.twMergeConfig) == null ? void 0 : _b.theme,
				...twMergeConfig.theme
			},
			classGroups: {
				...(_c = config == null ? void 0 : config.twMergeConfig) == null ? void 0 : _c.classGroups,
				...twMergeConfig.classGroups
			}
		}
	});
};

//#endregion
//#region ../../node_modules/.pnpm/@heroui+theme@2.4.23_tailwindcss@4.1.14/node_modules/@heroui/theme/dist/chunk-JGY6VQQQ.mjs
var dataFocusVisibleClasses = [
	"outline-solid outline-transparent",
	"data-[focus-visible=true]:z-10",
	"data-[focus-visible=true]:outline-2",
	"data-[focus-visible=true]:outline-focus",
	"data-[focus-visible=true]:outline-offset-2"
];
var ringClasses = [
	"outline-solid outline-transparent",
	"ring-2",
	"ring-focus",
	"ring-offset-2",
	"ring-offset-background"
];
var collapseAdjacentVariantBorders = {
	default: ["[&+.border-medium.border-default]:ms-[calc(var(--heroui-border-width-medium)*-1)]"],
	primary: ["[&+.border-medium.border-primary]:ms-[calc(var(--heroui-border-width-medium)*-1)]"],
	secondary: ["[&+.border-medium.border-secondary]:ms-[calc(var(--heroui-border-width-medium)*-1)]"],
	success: ["[&+.border-medium.border-success]:ms-[calc(var(--heroui-border-width-medium)*-1)]"],
	warning: ["[&+.border-medium.border-warning]:ms-[calc(var(--heroui-border-width-medium)*-1)]"],
	danger: ["[&+.border-medium.border-danger]:ms-[calc(var(--heroui-border-width-medium)*-1)]"]
};

//#endregion
//#region ../../node_modules/.pnpm/@heroui+theme@2.4.23_tailwindcss@4.1.14/node_modules/@heroui/theme/dist/chunk-OZTMQS2F.mjs
var chip = tv({
	slots: {
		base: [
			"relative",
			"max-w-fit",
			"min-w-min",
			"inline-flex",
			"items-center",
			"justify-between",
			"box-border",
			"whitespace-nowrap"
		],
		content: "flex-1 text-inherit font-normal",
		dot: [
			"w-2",
			"h-2",
			"ml-1",
			"rounded-full"
		],
		avatar: "shrink-0",
		closeButton: [
			"z-10",
			"appearance-none",
			"outline-solid outline-transparent",
			"select-none",
			"transition-opacity",
			"opacity-70",
			"hover:opacity-100",
			"cursor-pointer",
			"active:opacity-disabled",
			"tap-highlight-transparent"
		]
	},
	variants: {
		variant: {
			solid: {},
			bordered: { base: "border-medium bg-transparent" },
			light: { base: "bg-transparent" },
			flat: {},
			faded: { base: "border-medium" },
			shadow: {},
			dot: { base: "border-medium border-default text-foreground bg-transparent" }
		},
		color: {
			default: { dot: "bg-default-400" },
			primary: { dot: "bg-primary" },
			secondary: { dot: "bg-secondary" },
			success: { dot: "bg-success" },
			warning: { dot: "bg-warning" },
			danger: { dot: "bg-danger" }
		},
		size: {
			sm: {
				base: "px-1 h-6 text-tiny",
				content: "px-1",
				closeButton: "text-medium",
				avatar: "w-4 h-4"
			},
			md: {
				base: "px-1 h-7 text-small",
				content: "px-2",
				closeButton: "text-large",
				avatar: "w-5 h-5"
			},
			lg: {
				base: "px-2 h-8 text-medium",
				content: "px-2",
				closeButton: "text-xl",
				avatar: "w-6 h-6"
			}
		},
		radius: {
			none: { base: "rounded-none" },
			sm: { base: "rounded-small" },
			md: { base: "rounded-medium" },
			lg: { base: "rounded-large" },
			full: { base: "rounded-full" }
		},
		isOneChar: {
			true: {},
			false: {}
		},
		isCloseable: {
			true: {},
			false: {}
		},
		hasStartContent: { true: {} },
		hasEndContent: { true: {} },
		isDisabled: { true: { base: "opacity-disabled pointer-events-none" } },
		isCloseButtonFocusVisible: { true: { closeButton: [
			...ringClasses,
			"ring-1",
			"rounded-full"
		] } }
	},
	defaultVariants: {
		variant: "solid",
		color: "default",
		size: "md",
		radius: "full",
		isDisabled: false
	},
	compoundVariants: [
		{
			variant: "solid",
			color: "default",
			class: { base: colorVariants.solid.default }
		},
		{
			variant: "solid",
			color: "primary",
			class: { base: colorVariants.solid.primary }
		},
		{
			variant: "solid",
			color: "secondary",
			class: { base: colorVariants.solid.secondary }
		},
		{
			variant: "solid",
			color: "success",
			class: { base: colorVariants.solid.success }
		},
		{
			variant: "solid",
			color: "warning",
			class: { base: colorVariants.solid.warning }
		},
		{
			variant: "solid",
			color: "danger",
			class: { base: colorVariants.solid.danger }
		},
		{
			variant: "shadow",
			color: "default",
			class: { base: colorVariants.shadow.default }
		},
		{
			variant: "shadow",
			color: "primary",
			class: { base: colorVariants.shadow.primary }
		},
		{
			variant: "shadow",
			color: "secondary",
			class: { base: colorVariants.shadow.secondary }
		},
		{
			variant: "shadow",
			color: "success",
			class: { base: colorVariants.shadow.success }
		},
		{
			variant: "shadow",
			color: "warning",
			class: { base: colorVariants.shadow.warning }
		},
		{
			variant: "shadow",
			color: "danger",
			class: { base: colorVariants.shadow.danger }
		},
		{
			variant: "bordered",
			color: "default",
			class: { base: colorVariants.bordered.default }
		},
		{
			variant: "bordered",
			color: "primary",
			class: { base: colorVariants.bordered.primary }
		},
		{
			variant: "bordered",
			color: "secondary",
			class: { base: colorVariants.bordered.secondary }
		},
		{
			variant: "bordered",
			color: "success",
			class: { base: colorVariants.bordered.success }
		},
		{
			variant: "bordered",
			color: "warning",
			class: { base: colorVariants.bordered.warning }
		},
		{
			variant: "bordered",
			color: "danger",
			class: { base: colorVariants.bordered.danger }
		},
		{
			variant: "flat",
			color: "default",
			class: { base: colorVariants.flat.default }
		},
		{
			variant: "flat",
			color: "primary",
			class: { base: colorVariants.flat.primary }
		},
		{
			variant: "flat",
			color: "secondary",
			class: { base: colorVariants.flat.secondary }
		},
		{
			variant: "flat",
			color: "success",
			class: { base: colorVariants.flat.success }
		},
		{
			variant: "flat",
			color: "warning",
			class: { base: colorVariants.flat.warning }
		},
		{
			variant: "flat",
			color: "danger",
			class: { base: colorVariants.flat.danger }
		},
		{
			variant: "faded",
			color: "default",
			class: { base: colorVariants.faded.default }
		},
		{
			variant: "faded",
			color: "primary",
			class: { base: colorVariants.faded.primary }
		},
		{
			variant: "faded",
			color: "secondary",
			class: { base: colorVariants.faded.secondary }
		},
		{
			variant: "faded",
			color: "success",
			class: { base: colorVariants.faded.success }
		},
		{
			variant: "faded",
			color: "warning",
			class: { base: colorVariants.faded.warning }
		},
		{
			variant: "faded",
			color: "danger",
			class: { base: colorVariants.faded.danger }
		},
		{
			variant: "light",
			color: "default",
			class: { base: colorVariants.light.default }
		},
		{
			variant: "light",
			color: "primary",
			class: { base: colorVariants.light.primary }
		},
		{
			variant: "light",
			color: "secondary",
			class: { base: colorVariants.light.secondary }
		},
		{
			variant: "light",
			color: "success",
			class: { base: colorVariants.light.success }
		},
		{
			variant: "light",
			color: "warning",
			class: { base: colorVariants.light.warning }
		},
		{
			variant: "light",
			color: "danger",
			class: { base: colorVariants.light.danger }
		},
		{
			isOneChar: true,
			hasStartContent: false,
			hasEndContent: false,
			size: "sm",
			class: { base: "w-5 h-5 min-w-5 min-h-5" }
		},
		{
			isOneChar: true,
			hasStartContent: false,
			hasEndContent: false,
			size: "md",
			class: { base: "w-6 h-6 min-w-6 min-h-6" }
		},
		{
			isOneChar: true,
			hasStartContent: false,
			hasEndContent: false,
			size: "lg",
			class: { base: "w-7 h-7 min-w-7 min-h-7" }
		},
		{
			isOneChar: true,
			isCloseable: false,
			hasStartContent: false,
			hasEndContent: false,
			class: {
				base: "px-0 justify-center",
				content: "px-0 flex-none"
			}
		},
		{
			isOneChar: true,
			isCloseable: true,
			hasStartContent: false,
			hasEndContent: false,
			class: { base: "w-auto" }
		},
		{
			isOneChar: true,
			variant: "dot",
			class: {
				base: "w-auto h-7 px-1 items-center",
				content: "px-2"
			}
		},
		{
			hasStartContent: true,
			size: "sm",
			class: { content: "pl-0.5" }
		},
		{
			hasStartContent: true,
			size: ["md", "lg"],
			class: { content: "pl-1" }
		},
		{
			hasEndContent: true,
			size: "sm",
			class: { content: "pr-0.5" }
		},
		{
			hasEndContent: true,
			size: ["md", "lg"],
			class: { content: "pr-1" }
		}
	]
});

//#endregion
//#region ../../node_modules/.pnpm/@heroui+shared-icons@2.1.10_react@19.2.0/node_modules/@heroui/shared-icons/dist/chunk-M3MASYO7.mjs
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
var CloseFilledIcon = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	"aria-hidden": "true",
	focusable: "false",
	height: "1em",
	role: "presentation",
	viewBox: "0 0 24 24",
	width: "1em",
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		d: "M12 2a10 10 0 1010 10A10.016 10.016 0 0012 2zm3.36 12.3a.754.754 0 010 1.06.748.748 0 01-1.06 0l-2.3-2.3-2.3 2.3a.748.748 0 01-1.06 0 .754.754 0 010-1.06l2.3-2.3-2.3-2.3A.75.75 0 019.7 8.64l2.3 2.3 2.3-2.3a.75.75 0 011.06 1.06l-2.3 2.3z",
		fill: "currentColor"
	})
});

//#endregion
//#region ../../node_modules/.pnpm/@heroui+chip@2.2.22_@heroui+system@2.4.23_@heroui+theme@2.4.23_tailwindcss@4.1.14__framer-mot_5xyjbhcmiyaqqtj7lejn4sysgm/node_modules/@heroui/chip/dist/chunk-N45CR57R.mjs
function useChip(originalProps) {
	const [props, variantProps] = mapPropsVariants(originalProps, chip.variantKeys);
	const { ref, as, children, avatar, startContent, endContent, onClose, classNames, className,...otherProps } = props;
	const Component = as || "div";
	const domRef = useDOMRef(ref);
	const baseStyles = clsx(classNames == null ? void 0 : classNames.base, className);
	const isCloseable = !!onClose;
	const isDotVariant = originalProps.variant === "dot";
	const { focusProps: closeFocusProps, isFocusVisible: isCloseButtonFocusVisible } = $f7dceffc5ad7768b$export$4e328f61c538687f();
	const isOneChar = (0, import_react.useMemo)(() => typeof children === "string" && (children == null ? void 0 : children.length) === 1, [children]);
	const hasStartContent = (0, import_react.useMemo)(() => !!avatar || !!startContent, [avatar, startContent]);
	const hasEndContent = (0, import_react.useMemo)(() => !!endContent || isCloseable, [endContent, isCloseable]);
	const slots = (0, import_react.useMemo)(() => chip({
		...variantProps,
		hasStartContent,
		hasEndContent,
		isOneChar,
		isCloseable,
		isCloseButtonFocusVisible
	}), [
		objectToDeps(variantProps),
		isCloseButtonFocusVisible,
		hasStartContent,
		hasEndContent,
		isOneChar,
		isCloseable
	]);
	const { pressProps: closePressProps } = $f6c31cce2adf654f$export$45712eceda6fad21({
		isDisabled: !!(originalProps == null ? void 0 : originalProps.isDisabled),
		onPress: onClose
	});
	const getChipProps = () => {
		return {
			ref: domRef,
			className: slots.base({ class: baseStyles }),
			...otherProps
		};
	};
	const getCloseButtonProps = () => {
		return {
			role: "button",
			tabIndex: 0,
			className: slots.closeButton({ class: classNames == null ? void 0 : classNames.closeButton }),
			"aria-label": "close chip",
			...mergeProps(closePressProps, closeFocusProps)
		};
	};
	const getAvatarClone = (avatar2) => {
		if (!(0, import_react.isValidElement)(avatar2)) return null;
		return (0, import_react.cloneElement)(avatar2, { className: slots.avatar({ class: classNames == null ? void 0 : classNames.avatar }) });
	};
	const getContentClone = (content) => (0, import_react.isValidElement)(content) ? (0, import_react.cloneElement)(content, { className: clsx("max-h-[80%]", content.props.className) }) : null;
	return {
		Component,
		children,
		slots,
		classNames,
		isDot: isDotVariant,
		isCloseable,
		startContent: getAvatarClone(avatar) || getContentClone(startContent),
		endContent: getContentClone(endContent),
		getCloseButtonProps,
		getChipProps
	};
}

//#endregion
//#region ../../node_modules/.pnpm/@heroui+chip@2.2.22_@heroui+system@2.4.23_@heroui+theme@2.4.23_tailwindcss@4.1.14__framer-mot_5xyjbhcmiyaqqtj7lejn4sysgm/node_modules/@heroui/chip/dist/chunk-IHOGUXIG.mjs
var Chip = forwardRef((props, ref) => {
	const { Component, children, slots, classNames, isDot, isCloseable, startContent, endContent, getCloseButtonProps, getChipProps } = useChip({
		...props,
		ref
	});
	const start = (0, import_react.useMemo)(() => {
		if (isDot && !startContent) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: slots.dot({ class: classNames == null ? void 0 : classNames.dot }) });
		return startContent;
	}, [
		slots,
		startContent,
		isDot
	]);
	const end = (0, import_react.useMemo)(() => {
		if (isCloseable) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			...getCloseButtonProps(),
			children: endContent || /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloseFilledIcon, {})
		});
		return endContent;
	}, [
		endContent,
		isCloseable,
		getCloseButtonProps
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Component, {
		...getChipProps(),
		children: [
			start,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: slots.content({ class: classNames == null ? void 0 : classNames.content }),
				children
			}),
			end
		]
	});
});
Chip.displayName = "HeroUI.Chip";
var chip_default = Chip;

//#endregion
export { $03deb23ff14920c4$export$4eaf04e54aa8eed6, $3ef42575df84b30b$export$9d1611c77c2fe928, $431fbd86ca7dc216$export$b204af158042fbac, $507fabe10e71c6fb$export$630ff653c5ada6a9, $a1ea59d68270f0dd$export$f8168d8dd8fd66e6, $bbed8b41f857bcc0$export$24490316f764c430, $d4ee10de306f2510$export$4282f70798064fe0, $d4ee10de306f2510$export$cd4e5573fbe2b576, $e7801be82b4b2a53$export$4debdb1a3f0fa79e, $f6c31cce2adf654f$export$45712eceda6fad21, $f7dceffc5ad7768b$export$4e328f61c538687f, chain, chip_default, clamp, clsx, collapseAdjacentVariantBorders, colorVariants, dataAttr, dataFocusVisibleClasses, forwardRef, getUniqueID, mapPropsVariants, mergeProps, objectToDeps, tv, useDOMRef };