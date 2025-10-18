import { __commonJS, __require, __toESM, require_react } from "./react-tSI5bnDQ.js";
import { require_react_dom } from "./react-dom-DjLB5oxT.js";
import { MotionGlobalConfig } from "./global-config-CeRFn-Gh.js";

//#region ../../node_modules/.pnpm/react@19.2.0/node_modules/react/cjs/react-jsx-runtime.production.js
var require_react_jsx_runtime_production = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/react@19.2.0/node_modules/react/cjs/react-jsx-runtime.production.js": ((exports) => {
	var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
	function jsxProd(type, config, maybeKey) {
		var key = null;
		void 0 !== maybeKey && (key = "" + maybeKey);
		void 0 !== config.key && (key = "" + config.key);
		if ("key" in config) {
			maybeKey = {};
			for (var propName in config) "key" !== propName && (maybeKey[propName] = config[propName]);
		} else maybeKey = config;
		config = maybeKey.ref;
		return {
			$$typeof: REACT_ELEMENT_TYPE,
			type,
			key,
			ref: void 0 !== config ? config : null,
			props: maybeKey
		};
	}
	exports.Fragment = REACT_FRAGMENT_TYPE;
	exports.jsx = jsxProd;
	exports.jsxs = jsxProd;
}) });

//#endregion
//#region ../../node_modules/.pnpm/react@19.2.0/node_modules/react/cjs/react-jsx-runtime.development.js
var require_react_jsx_runtime_development = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/react@19.2.0/node_modules/react/cjs/react-jsx-runtime.development.js": ((exports) => {
	"production" !== process.env.NODE_ENV && (function() {
		function getComponentNameFromType(type) {
			if (null == type) return null;
			if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
			if ("string" === typeof type) return type;
			switch (type) {
				case REACT_FRAGMENT_TYPE$1: return "Fragment";
				case REACT_PROFILER_TYPE: return "Profiler";
				case REACT_STRICT_MODE_TYPE: return "StrictMode";
				case REACT_SUSPENSE_TYPE: return "Suspense";
				case REACT_SUSPENSE_LIST_TYPE: return "SuspenseList";
				case REACT_ACTIVITY_TYPE: return "Activity";
			}
			if ("object" === typeof type) switch ("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof) {
				case REACT_PORTAL_TYPE: return "Portal";
				case REACT_CONTEXT_TYPE: return type.displayName || "Context";
				case REACT_CONSUMER_TYPE: return (type._context.displayName || "Context") + ".Consumer";
				case REACT_FORWARD_REF_TYPE:
					var innerType = type.render;
					type = type.displayName;
					type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
					return type;
				case REACT_MEMO_TYPE: return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
				case REACT_LAZY_TYPE:
					innerType = type._payload;
					type = type._init;
					try {
						return getComponentNameFromType(type(innerType));
					} catch (x) {}
			}
			return null;
		}
		function testStringCoercion(value) {
			return "" + value;
		}
		function checkKeyStringCoercion(value) {
			try {
				testStringCoercion(value);
				var JSCompiler_inline_result = !1;
			} catch (e) {
				JSCompiler_inline_result = !0;
			}
			if (JSCompiler_inline_result) {
				JSCompiler_inline_result = console;
				var JSCompiler_temp_const = JSCompiler_inline_result.error;
				var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
				JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
				return testStringCoercion(value);
			}
		}
		function getTaskName(type) {
			if (type === REACT_FRAGMENT_TYPE$1) return "<>";
			if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
			try {
				var name = getComponentNameFromType(type);
				return name ? "<" + name + ">" : "<...>";
			} catch (x) {
				return "<...>";
			}
		}
		function getOwner() {
			var dispatcher = ReactSharedInternals.A;
			return null === dispatcher ? null : dispatcher.getOwner();
		}
		function UnknownOwner() {
			return Error("react-stack-top-frame");
		}
		function hasValidKey(config) {
			if (hasOwnProperty.call(config, "key")) {
				var getter = Object.getOwnPropertyDescriptor(config, "key").get;
				if (getter && getter.isReactWarning) return !1;
			}
			return void 0 !== config.key;
		}
		function defineKeyPropWarningGetter(props, displayName) {
			function warnAboutAccessingKey() {
				specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
			}
			warnAboutAccessingKey.isReactWarning = !0;
			Object.defineProperty(props, "key", {
				get: warnAboutAccessingKey,
				configurable: !0
			});
		}
		function elementRefGetterWithDeprecationWarning() {
			var componentName = getComponentNameFromType(this.type);
			didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
			componentName = this.props.ref;
			return void 0 !== componentName ? componentName : null;
		}
		function ReactElement(type, key, props, owner, debugStack, debugTask) {
			var refProp = props.ref;
			type = {
				$$typeof: REACT_ELEMENT_TYPE$1,
				type,
				key,
				props,
				_owner: owner
			};
			null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
				enumerable: !1,
				get: elementRefGetterWithDeprecationWarning
			}) : Object.defineProperty(type, "ref", {
				enumerable: !1,
				value: null
			});
			type._store = {};
			Object.defineProperty(type._store, "validated", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: 0
			});
			Object.defineProperty(type, "_debugInfo", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: null
			});
			Object.defineProperty(type, "_debugStack", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: debugStack
			});
			Object.defineProperty(type, "_debugTask", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: debugTask
			});
			Object.freeze && (Object.freeze(type.props), Object.freeze(type));
			return type;
		}
		function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
			var children = config.children;
			if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
				for (isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++) validateChildKeys(children[isStaticChildren]);
				Object.freeze && Object.freeze(children);
			} else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
			else validateChildKeys(children);
			if (hasOwnProperty.call(config, "key")) {
				children = getComponentNameFromType(type);
				var keys = Object.keys(config).filter(function(k) {
					return "key" !== k;
				});
				isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
				didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error("A props object containing a \"key\" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />", isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
			}
			children = null;
			void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
			hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
			if ("key" in config) {
				maybeKey = {};
				for (var propName in config) "key" !== propName && (maybeKey[propName] = config[propName]);
			} else maybeKey = config;
			children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
			return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
		}
		function validateChildKeys(node) {
			isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
		}
		function isValidElement(object) {
			return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE$1;
		}
		var React$2 = require_react(), REACT_ELEMENT_TYPE$1 = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE$1 = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React$2.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
			return null;
		};
		React$2 = { react_stack_bottom_frame: function(callStackForError) {
			return callStackForError();
		} };
		var specialPropKeyWarningShown;
		var didWarnAboutElementRef = {};
		var unknownOwnerDebugStack = React$2.react_stack_bottom_frame.bind(React$2, UnknownOwner)();
		var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
		var didWarnAboutKeySpread = {};
		exports.Fragment = REACT_FRAGMENT_TYPE$1;
		exports.jsx = function(type, config, maybeKey) {
			var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
			return jsxDEVImpl(type, config, maybeKey, !1, trackActualOwner ? Error("react-stack-top-frame") : unknownOwnerDebugStack, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
		};
		exports.jsxs = function(type, config, maybeKey) {
			var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
			return jsxDEVImpl(type, config, maybeKey, !0, trackActualOwner ? Error("react-stack-top-frame") : unknownOwnerDebugStack, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
		};
	})();
}) });

//#endregion
//#region ../../node_modules/.pnpm/react@19.2.0/node_modules/react/jsx-runtime.js
var require_jsx_runtime = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/react@19.2.0/node_modules/react/jsx-runtime.js": ((exports, module) => {
	if (process.env.NODE_ENV === "production") module.exports = require_react_jsx_runtime_production();
	else module.exports = require_react_jsx_runtime_development();
}) });

//#endregion
//#region ../../node_modules/.pnpm/framer-motion@12.23.22_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/framer-motion/dist/es/utils/use-constant.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
/**
* Creates a constant value over the lifecycle of a component.
*
* Even if `useMemo` is provided an empty array as its final argument, it doesn't offer
* a guarantee that it won't re-run for performance reasons later on. By using `useConstant`
* you can ensure that initialisers don't execute twice or more.
*/
function useConstant(init) {
	const ref = (0, import_react.useRef)(null);
	if (ref.current === null) ref.current = init();
	return ref.current;
}

//#endregion
//#region ../../node_modules/.pnpm/framer-motion@12.23.22_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/framer-motion/dist/es/context/MotionConfigContext.mjs
/**
* @public
*/
const MotionConfigContext = (0, import_react.createContext)({
	transformPagePoint: (p) => p,
	isStatic: false,
	reducedMotion: "never"
});

//#endregion
//#region ../../node_modules/.pnpm/framer-motion@12.23.22_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/framer-motion/dist/es/motion/utils/valid-prop.mjs
/**
* A list of all valid MotionProps.
*
* @privateRemarks
* This doesn't throw if a `MotionProp` name is missing - it should.
*/
const validMotionProps = new Set([
	"animate",
	"exit",
	"variants",
	"initial",
	"style",
	"values",
	"variants",
	"transition",
	"transformTemplate",
	"custom",
	"inherit",
	"onBeforeLayoutMeasure",
	"onAnimationStart",
	"onAnimationComplete",
	"onUpdate",
	"onDragStart",
	"onDrag",
	"onDragEnd",
	"onMeasureDragConstraints",
	"onDirectionLock",
	"onDragTransitionEnd",
	"_dragX",
	"_dragY",
	"onHoverStart",
	"onHoverEnd",
	"onViewportEnter",
	"onViewportLeave",
	"globalTapTarget",
	"ignoreStrict",
	"viewport"
]);
/**
* Check whether a prop name is a valid `MotionProp` key.
*
* @param key - Name of the property to check
* @returns `true` is key is a valid `MotionProp`.
*
* @public
*/
function isValidMotionProp(key) {
	return key.startsWith("while") || key.startsWith("drag") && key !== "draggable" || key.startsWith("layout") || key.startsWith("onTap") || key.startsWith("onPan") || key.startsWith("onLayout") || validMotionProps.has(key);
}

//#endregion
//#region ../../node_modules/.pnpm/framer-motion@12.23.22_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/framer-motion/dist/es/render/dom/utils/filter-props.mjs
let shouldForward = (key) => !isValidMotionProp(key);
function loadExternalIsValidProp(isValidProp) {
	if (typeof isValidProp !== "function") return;
	shouldForward = (key) => key.startsWith("on") ? !isValidMotionProp(key) : isValidProp(key);
}
/**
* Emotion and Styled Components both allow users to pass through arbitrary props to their components
* to dynamically generate CSS. They both use the `@emotion/is-prop-valid` package to determine which
* of these should be passed to the underlying DOM node.
*
* However, when styling a Motion component `styled(motion.div)`, both packages pass through *all* props
* as it's seen as an arbitrary component rather than a DOM node. Motion only allows arbitrary props
* passed through the `custom` prop so it doesn't *need* the payload or computational overhead of
* `@emotion/is-prop-valid`, however to fix this problem we need to use it.
*
* By making it an optionalDependency we can offer this functionality only in the situations where it's
* actually required.
*/
try {
	/**
	* We attempt to import this package but require won't be defined in esm environments, in that case
	* isPropValid will have to be provided via `MotionContext`. In a 6.0.0 this should probably be removed
	* in favour of explicit injection.
	*/
	loadExternalIsValidProp(__require("@emotion/is-prop-valid").default);
} catch {}
function filterProps(props, isDom, forwardMotionProps) {
	const filteredProps = {};
	for (const key in props) {
		/**
		* values is considered a valid prop by Emotion, so if it's present
		* this will be rendered out to the DOM unless explicitly filtered.
		*
		* We check the type as it could be used with the `feColorMatrix`
		* element, which we support.
		*/
		if (key === "values" && typeof props.values === "object") continue;
		if (shouldForward(key) || forwardMotionProps === true && isValidMotionProp(key) || !isDom && !isValidMotionProp(key) || props["draggable"] && key.startsWith("onDrag")) filteredProps[key] = props[key];
	}
	return filteredProps;
}

//#endregion
//#region ../../node_modules/.pnpm/framer-motion@12.23.22_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/framer-motion/dist/es/components/MotionConfig/index.mjs
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
/**
* `MotionConfig` is used to set configuration options for all children `motion` components.
*
* ```jsx
* import { motion, MotionConfig } from "framer-motion"
*
* export function App() {
*   return (
*     <MotionConfig transition={{ type: "spring" }}>
*       <motion.div animate={{ x: 100 }} />
*     </MotionConfig>
*   )
* }
* ```
*
* @public
*/
function MotionConfig({ children, isValidProp,...config }) {
	isValidProp && loadExternalIsValidProp(isValidProp);
	/**
	* Inherit props from any parent MotionConfig components
	*/
	config = {
		...(0, import_react.useContext)(MotionConfigContext),
		...config
	};
	/**
	* Don't allow isStatic to change between renders as it affects how many hooks
	* motion components fire.
	*/
	config.isStatic = useConstant(() => config.isStatic);
	/**
	* Creating a new config context object will re-render every `motion` component
	* every time it renders. So we only want to create a new one sparingly.
	*/
	const context = (0, import_react.useMemo)(() => config, [
		JSON.stringify(config.transition),
		config.transformPagePoint,
		config.reducedMotion
	]);
	return (0, import_jsx_runtime.jsx)(MotionConfigContext.Provider, {
		value: context,
		children
	});
}

//#endregion
//#region ../../node_modules/.pnpm/clsx@2.1.1/node_modules/clsx/dist/clsx.mjs
function r(e) {
	var t, f, n = "";
	if ("string" == typeof e || "number" == typeof e) n += e;
	else if ("object" == typeof e) if (Array.isArray(e)) {
		var o = e.length;
		for (t = 0; t < o; t++) e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
	} else for (f in e) e[f] && (n && (n += " "), n += f);
	return n;
}
function clsx() {
	for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++) (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
	return n;
}
var clsx_default = clsx;

//#endregion
//#region ../../node_modules/.pnpm/lucide-react@0.546.0_react@19.2.0/node_modules/lucide-react/dist/cjs/lucide-react.js
var require_lucide_react = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/lucide-react@0.546.0_react@19.2.0/node_modules/lucide-react/dist/cjs/lucide-react.js": ((exports) => {
	var react = require_react();
	const toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
	const toCamelCase = (string) => string.replace(/^([A-Z])|[\s-_]+(\w)/g, (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase());
	const toPascalCase = (string) => {
		const camelCase = toCamelCase(string);
		return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
	};
	const mergeClasses = (...classes) => classes.filter((className, index, array) => {
		return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
	}).join(" ").trim();
	const hasA11yProp = (props) => {
		for (const prop in props) if (prop.startsWith("aria-") || prop === "role" || prop === "title") return true;
	};
	var defaultAttributes = {
		xmlns: "http://www.w3.org/2000/svg",
		width: 24,
		height: 24,
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: 2,
		strokeLinecap: "round",
		strokeLinejoin: "round"
	};
	const Icon = react.forwardRef(({ color = "currentColor", size = 24, strokeWidth = 2, absoluteStrokeWidth, className = "", children, iconNode,...rest }, ref) => react.createElement("svg", {
		ref,
		...defaultAttributes,
		width: size,
		height: size,
		stroke: color,
		strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
		className: mergeClasses("lucide", className),
		...!children && !hasA11yProp(rest) && { "aria-hidden": "true" },
		...rest
	}, [...iconNode.map(([tag, attrs]) => react.createElement(tag, attrs)), ...Array.isArray(children) ? children : [children]]));
	const createLucideIcon = (iconName, iconNode) => {
		const Component$1 = react.forwardRef(({ className,...props }, ref) => react.createElement(Icon, {
			ref,
			iconNode,
			className: mergeClasses(`lucide-${toKebabCase(toPascalCase(iconName))}`, `lucide-${iconName}`, className),
			...props
		}));
		Component$1.displayName = toPascalCase(iconName);
		return Component$1;
	};
	const AArrowDown = createLucideIcon("a-arrow-down", [
		["path", {
			d: "m14 12 4 4 4-4",
			key: "buelq4"
		}],
		["path", {
			d: "M18 16V7",
			key: "ty0viw"
		}],
		["path", {
			d: "m2 16 4.039-9.69a.5.5 0 0 1 .923 0L11 16",
			key: "d5nyq2"
		}],
		["path", {
			d: "M3.304 13h6.392",
			key: "1q3zxz"
		}]
	]);
	const AArrowUp = createLucideIcon("a-arrow-up", [
		["path", {
			d: "m14 11 4-4 4 4",
			key: "1pu57t"
		}],
		["path", {
			d: "M18 16V7",
			key: "ty0viw"
		}],
		["path", {
			d: "m2 16 4.039-9.69a.5.5 0 0 1 .923 0L11 16",
			key: "d5nyq2"
		}],
		["path", {
			d: "M3.304 13h6.392",
			key: "1q3zxz"
		}]
	]);
	const ALargeSmall = createLucideIcon("a-large-small", [
		["path", {
			d: "m15 16 2.536-7.328a1.02 1.02 1 0 1 1.928 0L22 16",
			key: "xik6mr"
		}],
		["path", {
			d: "M15.697 14h5.606",
			key: "1stdlc"
		}],
		["path", {
			d: "m2 16 4.039-9.69a.5.5 0 0 1 .923 0L11 16",
			key: "d5nyq2"
		}],
		["path", {
			d: "M3.304 13h6.392",
			key: "1q3zxz"
		}]
	]);
	const Accessibility = createLucideIcon("accessibility", [
		["circle", {
			cx: "16",
			cy: "4",
			r: "1",
			key: "1grugj"
		}],
		["path", {
			d: "m18 19 1-7-6 1",
			key: "r0i19z"
		}],
		["path", {
			d: "m5 8 3-3 5.5 3-2.36 3.5",
			key: "9ptxx2"
		}],
		["path", {
			d: "M4.24 14.5a5 5 0 0 0 6.88 6",
			key: "10kmtu"
		}],
		["path", {
			d: "M13.76 17.5a5 5 0 0 0-6.88-6",
			key: "2qq6rc"
		}]
	]);
	const Activity = createLucideIcon("activity", [["path", {
		d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
		key: "169zse"
	}]]);
	const AirVent = createLucideIcon("air-vent", [
		["path", {
			d: "M18 17.5a2.5 2.5 0 1 1-4 2.03V12",
			key: "yd12zl"
		}],
		["path", {
			d: "M6 12H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",
			key: "larmp2"
		}],
		["path", {
			d: "M6 8h12",
			key: "6g4wlu"
		}],
		["path", {
			d: "M6.6 15.572A2 2 0 1 0 10 17v-5",
			key: "1x1kqn"
		}]
	]);
	const Airplay = createLucideIcon("airplay", [["path", {
		d: "M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1",
		key: "ns4c3b"
	}], ["path", {
		d: "m12 15 5 6H7Z",
		key: "14qnn2"
	}]]);
	const AlarmClockCheck = createLucideIcon("alarm-clock-check", [
		["circle", {
			cx: "12",
			cy: "13",
			r: "8",
			key: "3y4lt7"
		}],
		["path", {
			d: "M5 3 2 6",
			key: "18tl5t"
		}],
		["path", {
			d: "m22 6-3-3",
			key: "1opdir"
		}],
		["path", {
			d: "M6.38 18.7 4 21",
			key: "17xu3x"
		}],
		["path", {
			d: "M17.64 18.67 20 21",
			key: "kv2oe2"
		}],
		["path", {
			d: "m9 13 2 2 4-4",
			key: "6343dt"
		}]
	]);
	const AlarmClockMinus = createLucideIcon("alarm-clock-minus", [
		["circle", {
			cx: "12",
			cy: "13",
			r: "8",
			key: "3y4lt7"
		}],
		["path", {
			d: "M5 3 2 6",
			key: "18tl5t"
		}],
		["path", {
			d: "m22 6-3-3",
			key: "1opdir"
		}],
		["path", {
			d: "M6.38 18.7 4 21",
			key: "17xu3x"
		}],
		["path", {
			d: "M17.64 18.67 20 21",
			key: "kv2oe2"
		}],
		["path", {
			d: "M9 13h6",
			key: "1uhe8q"
		}]
	]);
	const AlarmClockOff = createLucideIcon("alarm-clock-off", [
		["path", {
			d: "M6.87 6.87a8 8 0 1 0 11.26 11.26",
			key: "3on8tj"
		}],
		["path", {
			d: "M19.9 14.25a8 8 0 0 0-9.15-9.15",
			key: "15ghsc"
		}],
		["path", {
			d: "m22 6-3-3",
			key: "1opdir"
		}],
		["path", {
			d: "M6.26 18.67 4 21",
			key: "yzmioq"
		}],
		["path", {
			d: "m2 2 20 20",
			key: "1ooewy"
		}],
		["path", {
			d: "M4 4 2 6",
			key: "1ycko6"
		}]
	]);
	const AlarmClockPlus = createLucideIcon("alarm-clock-plus", [
		["circle", {
			cx: "12",
			cy: "13",
			r: "8",
			key: "3y4lt7"
		}],
		["path", {
			d: "M5 3 2 6",
			key: "18tl5t"
		}],
		["path", {
			d: "m22 6-3-3",
			key: "1opdir"
		}],
		["path", {
			d: "M6.38 18.7 4 21",
			key: "17xu3x"
		}],
		["path", {
			d: "M17.64 18.67 20 21",
			key: "kv2oe2"
		}],
		["path", {
			d: "M12 10v6",
			key: "1bos4e"
		}],
		["path", {
			d: "M9 13h6",
			key: "1uhe8q"
		}]
	]);
	const AlarmClock = createLucideIcon("alarm-clock", [
		["circle", {
			cx: "12",
			cy: "13",
			r: "8",
			key: "3y4lt7"
		}],
		["path", {
			d: "M12 9v4l2 2",
			key: "1c63tq"
		}],
		["path", {
			d: "M5 3 2 6",
			key: "18tl5t"
		}],
		["path", {
			d: "m22 6-3-3",
			key: "1opdir"
		}],
		["path", {
			d: "M6.38 18.7 4 21",
			key: "17xu3x"
		}],
		["path", {
			d: "M17.64 18.67 20 21",
			key: "kv2oe2"
		}]
	]);
	const AlarmSmoke = createLucideIcon("alarm-smoke", [
		["path", {
			d: "M11 21c0-2.5 2-2.5 2-5",
			key: "1sicvv"
		}],
		["path", {
			d: "M16 21c0-2.5 2-2.5 2-5",
			key: "1o3eny"
		}],
		["path", {
			d: "m19 8-.8 3a1.25 1.25 0 0 1-1.2 1H7a1.25 1.25 0 0 1-1.2-1L5 8",
			key: "1bvca4"
		}],
		["path", {
			d: "M21 3a1 1 0 0 1 1 1v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a1 1 0 0 1 1-1z",
			key: "x3qr1j"
		}],
		["path", {
			d: "M6 21c0-2.5 2-2.5 2-5",
			key: "i3w1gp"
		}]
	]);
	const Album = createLucideIcon("album", [["rect", {
		width: "18",
		height: "18",
		x: "3",
		y: "3",
		rx: "2",
		ry: "2",
		key: "1m3agn"
	}], ["polyline", {
		points: "11 3 11 11 14 8 17 11 17 3",
		key: "1wcwz3"
	}]]);
	const AlignCenterHorizontal = createLucideIcon("align-center-horizontal", [
		["path", {
			d: "M2 12h20",
			key: "9i4pu4"
		}],
		["path", {
			d: "M10 16v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-4",
			key: "11f1s0"
		}],
		["path", {
			d: "M10 8V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v4",
			key: "t14dx9"
		}],
		["path", {
			d: "M20 16v1a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-1",
			key: "1w07xs"
		}],
		["path", {
			d: "M14 8V7c0-1.1.9-2 2-2h2a2 2 0 0 1 2 2v1",
			key: "1apec2"
		}]
	]);
	const AlignCenterVertical = createLucideIcon("align-center-vertical", [
		["path", {
			d: "M12 2v20",
			key: "t6zp3m"
		}],
		["path", {
			d: "M8 10H4a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h4",
			key: "14d6g8"
		}],
		["path", {
			d: "M16 10h4a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-4",
			key: "1e2lrw"
		}],
		["path", {
			d: "M8 20H7a2 2 0 0 1-2-2v-2c0-1.1.9-2 2-2h1",
			key: "1fkdwx"
		}],
		["path", {
			d: "M16 14h1a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-1",
			key: "1euafb"
		}]
	]);
	const AlignEndHorizontal = createLucideIcon("align-end-horizontal", [
		["rect", {
			width: "6",
			height: "16",
			x: "4",
			y: "2",
			rx: "2",
			key: "z5wdxg"
		}],
		["rect", {
			width: "6",
			height: "9",
			x: "14",
			y: "9",
			rx: "2",
			key: "um7a8w"
		}],
		["path", {
			d: "M22 22H2",
			key: "19qnx5"
		}]
	]);
	const AlignEndVertical = createLucideIcon("align-end-vertical", [
		["rect", {
			width: "16",
			height: "6",
			x: "2",
			y: "4",
			rx: "2",
			key: "10wcwx"
		}],
		["rect", {
			width: "9",
			height: "6",
			x: "9",
			y: "14",
			rx: "2",
			key: "4p5bwg"
		}],
		["path", {
			d: "M22 22V2",
			key: "12ipfv"
		}]
	]);
	const AlignHorizontalDistributeCenter = createLucideIcon("align-horizontal-distribute-center", [
		["rect", {
			width: "6",
			height: "14",
			x: "4",
			y: "5",
			rx: "2",
			key: "1wwnby"
		}],
		["rect", {
			width: "6",
			height: "10",
			x: "14",
			y: "7",
			rx: "2",
			key: "1fe6j6"
		}],
		["path", {
			d: "M17 22v-5",
			key: "4b6g73"
		}],
		["path", {
			d: "M17 7V2",
			key: "hnrr36"
		}],
		["path", {
			d: "M7 22v-3",
			key: "1r4jpn"
		}],
		["path", {
			d: "M7 5V2",
			key: "liy1u9"
		}]
	]);
	const AlignHorizontalDistributeEnd = createLucideIcon("align-horizontal-distribute-end", [
		["rect", {
			width: "6",
			height: "14",
			x: "4",
			y: "5",
			rx: "2",
			key: "1wwnby"
		}],
		["rect", {
			width: "6",
			height: "10",
			x: "14",
			y: "7",
			rx: "2",
			key: "1fe6j6"
		}],
		["path", {
			d: "M10 2v20",
			key: "uyc634"
		}],
		["path", {
			d: "M20 2v20",
			key: "1tx262"
		}]
	]);
	const AlignHorizontalDistributeStart = createLucideIcon("align-horizontal-distribute-start", [
		["rect", {
			width: "6",
			height: "14",
			x: "4",
			y: "5",
			rx: "2",
			key: "1wwnby"
		}],
		["rect", {
			width: "6",
			height: "10",
			x: "14",
			y: "7",
			rx: "2",
			key: "1fe6j6"
		}],
		["path", {
			d: "M4 2v20",
			key: "gtpd5x"
		}],
		["path", {
			d: "M14 2v20",
			key: "tg6bpw"
		}]
	]);
	const AlignHorizontalJustifyCenter = createLucideIcon("align-horizontal-justify-center", [
		["rect", {
			width: "6",
			height: "14",
			x: "2",
			y: "5",
			rx: "2",
			key: "dy24zr"
		}],
		["rect", {
			width: "6",
			height: "10",
			x: "16",
			y: "7",
			rx: "2",
			key: "13zkjt"
		}],
		["path", {
			d: "M12 2v20",
			key: "t6zp3m"
		}]
	]);
	const AlignHorizontalJustifyEnd = createLucideIcon("align-horizontal-justify-end", [
		["rect", {
			width: "6",
			height: "14",
			x: "2",
			y: "5",
			rx: "2",
			key: "dy24zr"
		}],
		["rect", {
			width: "6",
			height: "10",
			x: "12",
			y: "7",
			rx: "2",
			key: "1ht384"
		}],
		["path", {
			d: "M22 2v20",
			key: "40qfg1"
		}]
	]);
	const AlignHorizontalJustifyStart = createLucideIcon("align-horizontal-justify-start", [
		["rect", {
			width: "6",
			height: "14",
			x: "6",
			y: "5",
			rx: "2",
			key: "hsirpf"
		}],
		["rect", {
			width: "6",
			height: "10",
			x: "16",
			y: "7",
			rx: "2",
			key: "13zkjt"
		}],
		["path", {
			d: "M2 2v20",
			key: "1ivd8o"
		}]
	]);
	const AlignHorizontalSpaceAround = createLucideIcon("align-horizontal-space-around", [
		["rect", {
			width: "6",
			height: "10",
			x: "9",
			y: "7",
			rx: "2",
			key: "yn7j0q"
		}],
		["path", {
			d: "M4 22V2",
			key: "tsjzd3"
		}],
		["path", {
			d: "M20 22V2",
			key: "1bnhr8"
		}]
	]);
	const AlignHorizontalSpaceBetween = createLucideIcon("align-horizontal-space-between", [
		["rect", {
			width: "6",
			height: "14",
			x: "3",
			y: "5",
			rx: "2",
			key: "j77dae"
		}],
		["rect", {
			width: "6",
			height: "10",
			x: "15",
			y: "7",
			rx: "2",
			key: "bq30hj"
		}],
		["path", {
			d: "M3 2v20",
			key: "1d2pfg"
		}],
		["path", {
			d: "M21 2v20",
			key: "p059bm"
		}]
	]);
	const AlignStartHorizontal = createLucideIcon("align-start-horizontal", [
		["rect", {
			width: "6",
			height: "16",
			x: "4",
			y: "6",
			rx: "2",
			key: "1n4dg1"
		}],
		["rect", {
			width: "6",
			height: "9",
			x: "14",
			y: "6",
			rx: "2",
			key: "17khns"
		}],
		["path", {
			d: "M22 2H2",
			key: "fhrpnj"
		}]
	]);
	const AlignStartVertical = createLucideIcon("align-start-vertical", [
		["rect", {
			width: "9",
			height: "6",
			x: "6",
			y: "14",
			rx: "2",
			key: "lpm2y7"
		}],
		["rect", {
			width: "16",
			height: "6",
			x: "6",
			y: "4",
			rx: "2",
			key: "rdj6ps"
		}],
		["path", {
			d: "M2 2v20",
			key: "1ivd8o"
		}]
	]);
	const AlignVerticalDistributeCenter = createLucideIcon("align-vertical-distribute-center", [
		["path", {
			d: "M22 17h-3",
			key: "1lwga1"
		}],
		["path", {
			d: "M22 7h-5",
			key: "o2endc"
		}],
		["path", {
			d: "M5 17H2",
			key: "1gx9xc"
		}],
		["path", {
			d: "M7 7H2",
			key: "6bq26l"
		}],
		["rect", {
			x: "5",
			y: "14",
			width: "14",
			height: "6",
			rx: "2",
			key: "1qrzuf"
		}],
		["rect", {
			x: "7",
			y: "4",
			width: "10",
			height: "6",
			rx: "2",
			key: "we8e9z"
		}]
	]);
	const AlignVerticalDistributeEnd = createLucideIcon("align-vertical-distribute-end", [
		["rect", {
			width: "14",
			height: "6",
			x: "5",
			y: "14",
			rx: "2",
			key: "jmoj9s"
		}],
		["rect", {
			width: "10",
			height: "6",
			x: "7",
			y: "4",
			rx: "2",
			key: "aza5on"
		}],
		["path", {
			d: "M2 20h20",
			key: "owomy5"
		}],
		["path", {
			d: "M2 10h20",
			key: "1ir3d8"
		}]
	]);
	const AlignVerticalDistributeStart = createLucideIcon("align-vertical-distribute-start", [
		["rect", {
			width: "14",
			height: "6",
			x: "5",
			y: "14",
			rx: "2",
			key: "jmoj9s"
		}],
		["rect", {
			width: "10",
			height: "6",
			x: "7",
			y: "4",
			rx: "2",
			key: "aza5on"
		}],
		["path", {
			d: "M2 14h20",
			key: "myj16y"
		}],
		["path", {
			d: "M2 4h20",
			key: "mda7wb"
		}]
	]);
	const AlignVerticalJustifyCenter = createLucideIcon("align-vertical-justify-center", [
		["rect", {
			width: "14",
			height: "6",
			x: "5",
			y: "16",
			rx: "2",
			key: "1i8z2d"
		}],
		["rect", {
			width: "10",
			height: "6",
			x: "7",
			y: "2",
			rx: "2",
			key: "ypihtt"
		}],
		["path", {
			d: "M2 12h20",
			key: "9i4pu4"
		}]
	]);
	const AlignVerticalJustifyEnd = createLucideIcon("align-vertical-justify-end", [
		["rect", {
			width: "14",
			height: "6",
			x: "5",
			y: "12",
			rx: "2",
			key: "4l4tp2"
		}],
		["rect", {
			width: "10",
			height: "6",
			x: "7",
			y: "2",
			rx: "2",
			key: "ypihtt"
		}],
		["path", {
			d: "M2 22h20",
			key: "272qi7"
		}]
	]);
	const AlignVerticalJustifyStart = createLucideIcon("align-vertical-justify-start", [
		["rect", {
			width: "14",
			height: "6",
			x: "5",
			y: "16",
			rx: "2",
			key: "1i8z2d"
		}],
		["rect", {
			width: "10",
			height: "6",
			x: "7",
			y: "6",
			rx: "2",
			key: "13squh"
		}],
		["path", {
			d: "M2 2h20",
			key: "1ennik"
		}]
	]);
	const AlignVerticalSpaceAround = createLucideIcon("align-vertical-space-around", [
		["rect", {
			width: "10",
			height: "6",
			x: "7",
			y: "9",
			rx: "2",
			key: "b1zbii"
		}],
		["path", {
			d: "M22 20H2",
			key: "1p1f7z"
		}],
		["path", {
			d: "M22 4H2",
			key: "1b7qnq"
		}]
	]);
	const AlignVerticalSpaceBetween = createLucideIcon("align-vertical-space-between", [
		["rect", {
			width: "14",
			height: "6",
			x: "5",
			y: "15",
			rx: "2",
			key: "1w91an"
		}],
		["rect", {
			width: "10",
			height: "6",
			x: "7",
			y: "3",
			rx: "2",
			key: "17wqzy"
		}],
		["path", {
			d: "M2 21h20",
			key: "1nyx9w"
		}],
		["path", {
			d: "M2 3h20",
			key: "91anmk"
		}]
	]);
	const Ambulance = createLucideIcon("ambulance", [
		["path", {
			d: "M10 10H6",
			key: "1bsnug"
		}],
		["path", {
			d: "M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2",
			key: "wrbu53"
		}],
		["path", {
			d: "M19 18h2a1 1 0 0 0 1-1v-3.28a1 1 0 0 0-.684-.948l-1.923-.641a1 1 0 0 1-.578-.502l-1.539-3.076A1 1 0 0 0 16.382 8H14",
			key: "lrkjwd"
		}],
		["path", {
			d: "M8 8v4",
			key: "1fwk8c"
		}],
		["path", {
			d: "M9 18h6",
			key: "x1upvd"
		}],
		["circle", {
			cx: "17",
			cy: "18",
			r: "2",
			key: "332jqn"
		}],
		["circle", {
			cx: "7",
			cy: "18",
			r: "2",
			key: "19iecd"
		}]
	]);
	const Ampersand = createLucideIcon("ampersand", [["path", {
		d: "M17.5 12c0 4.4-3.6 8-8 8A4.5 4.5 0 0 1 5 15.5c0-6 8-4 8-8.5a3 3 0 1 0-6 0c0 3 2.5 8.5 12 13",
		key: "1o9ehi"
	}], ["path", {
		d: "M16 12h3",
		key: "4uvgyw"
	}]]);
	const Ampersands = createLucideIcon("ampersands", [["path", {
		d: "M10 17c-5-3-7-7-7-9a2 2 0 0 1 4 0c0 2.5-5 2.5-5 6 0 1.7 1.3 3 3 3 2.8 0 5-2.2 5-5",
		key: "12lh1k"
	}], ["path", {
		d: "M22 17c-5-3-7-7-7-9a2 2 0 0 1 4 0c0 2.5-5 2.5-5 6 0 1.7 1.3 3 3 3 2.8 0 5-2.2 5-5",
		key: "173c68"
	}]]);
	const Amphora = createLucideIcon("amphora", [
		["path", {
			d: "M10 2v5.632c0 .424-.272.795-.653.982A6 6 0 0 0 6 14c.006 4 3 7 5 8",
			key: "1h8rid"
		}],
		["path", {
			d: "M10 5H8a2 2 0 0 0 0 4h.68",
			key: "3ezsi6"
		}],
		["path", {
			d: "M14 2v5.632c0 .424.272.795.652.982A6 6 0 0 1 18 14c0 4-3 7-5 8",
			key: "yt6q09"
		}],
		["path", {
			d: "M14 5h2a2 2 0 0 1 0 4h-.68",
			key: "8f95yk"
		}],
		["path", {
			d: "M18 22H6",
			key: "mg6kv4"
		}],
		["path", {
			d: "M9 2h6",
			key: "1jrp98"
		}]
	]);
	const Anchor = createLucideIcon("anchor", [
		["path", {
			d: "M12 22V8",
			key: "qkxhtm"
		}],
		["path", {
			d: "M5 12H2a10 10 0 0 0 20 0h-3",
			key: "1hv3nh"
		}],
		["circle", {
			cx: "12",
			cy: "5",
			r: "3",
			key: "rqqgnr"
		}]
	]);
	const Angry = createLucideIcon("angry", [
		["circle", {
			cx: "12",
			cy: "12",
			r: "10",
			key: "1mglay"
		}],
		["path", {
			d: "M16 16s-1.5-2-4-2-4 2-4 2",
			key: "epbg0q"
		}],
		["path", {
			d: "M7.5 8 10 9",
			key: "olxxln"
		}],
		["path", {
			d: "m14 9 2.5-1",
			key: "1j6cij"
		}],
		["path", {
			d: "M9 10h.01",
			key: "qbtxuw"
		}],
		["path", {
			d: "M15 10h.01",
			key: "1qmjsl"
		}]
	]);
	const Annoyed = createLucideIcon("annoyed", [
		["circle", {
			cx: "12",
			cy: "12",
			r: "10",
			key: "1mglay"
		}],
		["path", {
			d: "M8 15h8",
			key: "45n4r"
		}],
		["path", {
			d: "M8 9h2",
			key: "1g203m"
		}],
		["path", {
			d: "M14 9h2",
			key: "116p9w"
		}]
	]);
	const Antenna = createLucideIcon("antenna", [
		["path", {
			d: "M2 12 7 2",
			key: "117k30"
		}],
		["path", {
			d: "m7 12 5-10",
			key: "1tvx22"
		}],
		["path", {
			d: "m12 12 5-10",
			key: "ev1o1a"
		}],
		["path", {
			d: "m17 12 5-10",
			key: "1e4ti3"
		}],
		["path", {
			d: "M4.5 7h15",
			key: "vlsxkz"
		}],
		["path", {
			d: "M12 16v6",
			key: "c8a4gj"
		}]
	]);
	const Anvil = createLucideIcon("anvil", [
		["path", {
			d: "M7 10H6a4 4 0 0 1-4-4 1 1 0 0 1 1-1h4",
			key: "1hjpb6"
		}],
		["path", {
			d: "M7 5a1 1 0 0 1 1-1h13a1 1 0 0 1 1 1 7 7 0 0 1-7 7H8a1 1 0 0 1-1-1z",
			key: "1qn45f"
		}],
		["path", {
			d: "M9 12v5",
			key: "3anwtq"
		}],
		["path", {
			d: "M15 12v5",
			key: "5xh3zn"
		}],
		["path", {
			d: "M5 20a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3 1 1 0 0 1-1 1H6a1 1 0 0 1-1-1",
			key: "1fi4x8"
		}]
	]);
	const Aperture = createLucideIcon("aperture", [
		["circle", {
			cx: "12",
			cy: "12",
			r: "10",
			key: "1mglay"
		}],
		["path", {
			d: "m14.31 8 5.74 9.94",
			key: "1y6ab4"
		}],
		["path", {
			d: "M9.69 8h11.48",
			key: "1wxppr"
		}],
		["path", {
			d: "m7.38 12 5.74-9.94",
			key: "1grp0k"
		}],
		["path", {
			d: "M9.69 16 3.95 6.06",
			key: "libnyf"
		}],
		["path", {
			d: "M14.31 16H2.83",
			key: "x5fava"
		}],
		["path", {
			d: "m16.62 12-5.74 9.94",
			key: "1vwawt"
		}]
	]);
	const AppWindowMac = createLucideIcon("app-window-mac", [
		["rect", {
			width: "20",
			height: "16",
			x: "2",
			y: "4",
			rx: "2",
			key: "18n3k1"
		}],
		["path", {
			d: "M6 8h.01",
			key: "x9i8wu"
		}],
		["path", {
			d: "M10 8h.01",
			key: "1r9ogq"
		}],
		["path", {
			d: "M14 8h.01",
			key: "1primd"
		}]
	]);
	const AppWindow = createLucideIcon("app-window", [
		["rect", {
			x: "2",
			y: "4",
			width: "20",
			height: "16",
			rx: "2",
			key: "izxlao"
		}],
		["path", {
			d: "M10 4v4",
			key: "pp8u80"
		}],
		["path", {
			d: "M2 8h20",
			key: "d11cs7"
		}],
		["path", {
			d: "M6 4v4",
			key: "1svtjw"
		}]
	]);
	const Apple = createLucideIcon("apple", [["path", {
		d: "M12 6.528V3a1 1 0 0 1 1-1h0",
		key: "11qiee"
	}], ["path", {
		d: "M18.237 21A15 15 0 0 0 22 11a6 6 0 0 0-10-4.472A6 6 0 0 0 2 11a15.1 15.1 0 0 0 3.763 10 3 3 0 0 0 3.648.648 5.5 5.5 0 0 1 5.178 0A3 3 0 0 0 18.237 21",
		key: "110c12"
	}]]);
	const ArchiveRestore = createLucideIcon("archive-restore", [
		["rect", {
			width: "20",
			height: "5",
			x: "2",
			y: "3",
			rx: "1",
			key: "1wp1u1"
		}],
		["path", {
			d: "M4 8v11a2 2 0 0 0 2 2h2",
			key: "tvwodi"
		}],
		["path", {
			d: "M20 8v11a2 2 0 0 1-2 2h-2",
			key: "1gkqxj"
		}],
		["path", {
			d: "m9 15 3-3 3 3",
			key: "1pd0qc"
		}],
		["path", {
			d: "M12 12v9",
			key: "192myk"
		}]
	]);
	const ArchiveX = createLucideIcon("archive-x", [
		["rect", {
			width: "20",
			height: "5",
			x: "2",
			y: "3",
			rx: "1",
			key: "1wp1u1"
		}],
		["path", {
			d: "M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8",
			key: "1s80jp"
		}],
		["path", {
			d: "m9.5 17 5-5",
			key: "nakeu6"
		}],
		["path", {
			d: "m9.5 12 5 5",
			key: "1hccrj"
		}]
	]);
	const Archive = createLucideIcon("archive", [
		["rect", {
			width: "20",
			height: "5",
			x: "2",
			y: "3",
			rx: "1",
			key: "1wp1u1"
		}],
		["path", {
			d: "M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8",
			key: "1s80jp"
		}],
		["path", {
			d: "M10 12h4",
			key: "a56b0p"
		}]
	]);
	const Armchair = createLucideIcon("armchair", [
		["path", {
			d: "M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3",
			key: "irtipd"
		}],
		["path", {
			d: "M3 16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V11a2 2 0 0 0-4 0z",
			key: "1qyhux"
		}],
		["path", {
			d: "M5 18v2",
			key: "ppbyun"
		}],
		["path", {
			d: "M19 18v2",
			key: "gy7782"
		}]
	]);
	const ArrowBigDownDash = createLucideIcon("arrow-big-down-dash", [["path", {
		d: "M15 11a1 1 0 0 0 1 1h2.939a1 1 0 0 1 .75 1.811l-6.835 6.836a1.207 1.207 0 0 1-1.707 0L4.31 13.81a1 1 0 0 1 .75-1.811H8a1 1 0 0 0 1-1V9a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1z",
		key: "1hy3w3"
	}], ["path", {
		d: "M9 4h6",
		key: "10am2s"
	}]]);
	const ArrowBigDown = createLucideIcon("arrow-big-down", [["path", {
		d: "M15 11a1 1 0 0 0 1 1h2.939a1 1 0 0 1 .75 1.811l-6.835 6.836a1.207 1.207 0 0 1-1.707 0L4.31 13.81a1 1 0 0 1 .75-1.811H8a1 1 0 0 0 1-1V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1z",
		key: "1eaqc3"
	}]]);
	const ArrowBigLeftDash = createLucideIcon("arrow-big-left-dash", [["path", {
		d: "M13 9a1 1 0 0 1-1-1V5.061a1 1 0 0 0-1.811-.75l-6.835 6.836a1.207 1.207 0 0 0 0 1.707l6.835 6.835a1 1 0 0 0 1.811-.75V16a1 1 0 0 1 1-1h2a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1z",
		key: "p8w4w5"
	}], ["path", {
		d: "M20 9v6",
		key: "14roy0"
	}]]);
	const ArrowBigLeft = createLucideIcon("arrow-big-left", [["path", {
		d: "M13 9a1 1 0 0 1-1-1V5.061a1 1 0 0 0-1.811-.75l-6.835 6.836a1.207 1.207 0 0 0 0 1.707l6.835 6.835a1 1 0 0 0 1.811-.75V16a1 1 0 0 1 1-1h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1z",
		key: "aztept"
	}]]);
	const ArrowBigRightDash = createLucideIcon("arrow-big-right-dash", [["path", {
		d: "M11 9a1 1 0 0 0 1-1V5.061a1 1 0 0 1 1.811-.75l6.836 6.836a1.207 1.207 0 0 1 0 1.707l-6.836 6.835a1 1 0 0 1-1.811-.75V16a1 1 0 0 0-1-1H9a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1z",
		key: "67vhrh"
	}], ["path", {
		d: "M4 9v6",
		key: "bns7oa"
	}]]);
	const ArrowBigRight = createLucideIcon("arrow-big-right", [["path", {
		d: "M11 9a1 1 0 0 0 1-1V5.061a1 1 0 0 1 1.811-.75l6.836 6.836a1.207 1.207 0 0 1 0 1.707l-6.836 6.835a1 1 0 0 1-1.811-.75V16a1 1 0 0 0-1-1H5a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1z",
		key: "1232du"
	}]]);
	const ArrowBigUpDash = createLucideIcon("arrow-big-up-dash", [["path", {
		d: "M9 13a1 1 0 0 0-1-1H5.061a1 1 0 0 1-.75-1.811l6.836-6.835a1.207 1.207 0 0 1 1.707 0l6.835 6.835a1 1 0 0 1-.75 1.811H16a1 1 0 0 0-1 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1z",
		key: "pnzqmc"
	}], ["path", {
		d: "M9 20h6",
		key: "s66wpe"
	}]]);
	const ArrowBigUp = createLucideIcon("arrow-big-up", [["path", {
		d: "M9 13a1 1 0 0 0-1-1H5.061a1 1 0 0 1-.75-1.811l6.836-6.835a1.207 1.207 0 0 1 1.707 0l6.835 6.835a1 1 0 0 1-.75 1.811H16a1 1 0 0 0-1 1v6a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1z",
		key: "lh0v7k"
	}]]);
	const ArrowDown10 = createLucideIcon("arrow-down-1-0", [
		["path", {
			d: "m3 16 4 4 4-4",
			key: "1co6wj"
		}],
		["path", {
			d: "M7 20V4",
			key: "1yoxec"
		}],
		["path", {
			d: "M17 10V4h-2",
			key: "zcsr5x"
		}],
		["path", {
			d: "M15 10h4",
			key: "id2lce"
		}],
		["rect", {
			x: "15",
			y: "14",
			width: "4",
			height: "6",
			ry: "2",
			key: "33xykx"
		}]
	]);
	const ArrowDown01 = createLucideIcon("arrow-down-0-1", [
		["path", {
			d: "m3 16 4 4 4-4",
			key: "1co6wj"
		}],
		["path", {
			d: "M7 20V4",
			key: "1yoxec"
		}],
		["rect", {
			x: "15",
			y: "4",
			width: "4",
			height: "6",
			ry: "2",
			key: "1bwicg"
		}],
		["path", {
			d: "M17 20v-6h-2",
			key: "1qp1so"
		}],
		["path", {
			d: "M15 20h4",
			key: "1j968p"
		}]
	]);
	const ArrowDownAZ = createLucideIcon("arrow-down-a-z", [
		["path", {
			d: "m3 16 4 4 4-4",
			key: "1co6wj"
		}],
		["path", {
			d: "M7 20V4",
			key: "1yoxec"
		}],
		["path", {
			d: "M20 8h-5",
			key: "1vsyxs"
		}],
		["path", {
			d: "M15 10V6.5a2.5 2.5 0 0 1 5 0V10",
			key: "ag13bf"
		}],
		["path", {
			d: "M15 14h5l-5 6h5",
			key: "ur5jdg"
		}]
	]);
	const ArrowDownFromLine = createLucideIcon("arrow-down-from-line", [
		["path", {
			d: "M19 3H5",
			key: "1236rx"
		}],
		["path", {
			d: "M12 21V7",
			key: "gj6g52"
		}],
		["path", {
			d: "m6 15 6 6 6-6",
			key: "h15q88"
		}]
	]);
	const ArrowDownNarrowWide = createLucideIcon("arrow-down-narrow-wide", [
		["path", {
			d: "m3 16 4 4 4-4",
			key: "1co6wj"
		}],
		["path", {
			d: "M7 20V4",
			key: "1yoxec"
		}],
		["path", {
			d: "M11 4h4",
			key: "6d7r33"
		}],
		["path", {
			d: "M11 8h7",
			key: "djye34"
		}],
		["path", {
			d: "M11 12h10",
			key: "1438ji"
		}]
	]);
	const ArrowDownLeft = createLucideIcon("arrow-down-left", [["path", {
		d: "M17 7 7 17",
		key: "15tmo1"
	}], ["path", {
		d: "M17 17H7V7",
		key: "1org7z"
	}]]);
	const ArrowDownRight = createLucideIcon("arrow-down-right", [["path", {
		d: "m7 7 10 10",
		key: "1fmybs"
	}], ["path", {
		d: "M17 7v10H7",
		key: "6fjiku"
	}]]);
	const ArrowDownToDot = createLucideIcon("arrow-down-to-dot", [
		["path", {
			d: "M12 2v14",
			key: "jyx4ut"
		}],
		["path", {
			d: "m19 9-7 7-7-7",
			key: "1oe3oy"
		}],
		["circle", {
			cx: "12",
			cy: "21",
			r: "1",
			key: "o0uj5v"
		}]
	]);
	const ArrowDownToLine = createLucideIcon("arrow-down-to-line", [
		["path", {
			d: "M12 17V3",
			key: "1cwfxf"
		}],
		["path", {
			d: "m6 11 6 6 6-6",
			key: "12ii2o"
		}],
		["path", {
			d: "M19 21H5",
			key: "150jfl"
		}]
	]);
	const ArrowDownUp = createLucideIcon("arrow-down-up", [
		["path", {
			d: "m3 16 4 4 4-4",
			key: "1co6wj"
		}],
		["path", {
			d: "M7 20V4",
			key: "1yoxec"
		}],
		["path", {
			d: "m21 8-4-4-4 4",
			key: "1c9v7m"
		}],
		["path", {
			d: "M17 4v16",
			key: "7dpous"
		}]
	]);
	const ArrowDownWideNarrow = createLucideIcon("arrow-down-wide-narrow", [
		["path", {
			d: "m3 16 4 4 4-4",
			key: "1co6wj"
		}],
		["path", {
			d: "M7 20V4",
			key: "1yoxec"
		}],
		["path", {
			d: "M11 4h10",
			key: "1w87gc"
		}],
		["path", {
			d: "M11 8h7",
			key: "djye34"
		}],
		["path", {
			d: "M11 12h4",
			key: "q8tih4"
		}]
	]);
	const ArrowDownZA = createLucideIcon("arrow-down-z-a", [
		["path", {
			d: "m3 16 4 4 4-4",
			key: "1co6wj"
		}],
		["path", {
			d: "M7 4v16",
			key: "1glfcx"
		}],
		["path", {
			d: "M15 4h5l-5 6h5",
			key: "8asdl1"
		}],
		["path", {
			d: "M15 20v-3.5a2.5 2.5 0 0 1 5 0V20",
			key: "r6l5cz"
		}],
		["path", {
			d: "M20 18h-5",
			key: "18j1r2"
		}]
	]);
	const ArrowDown = createLucideIcon("arrow-down", [["path", {
		d: "M12 5v14",
		key: "s699le"
	}], ["path", {
		d: "m19 12-7 7-7-7",
		key: "1idqje"
	}]]);
	const ArrowLeftFromLine = createLucideIcon("arrow-left-from-line", [
		["path", {
			d: "m9 6-6 6 6 6",
			key: "7v63n9"
		}],
		["path", {
			d: "M3 12h14",
			key: "13k4hi"
		}],
		["path", {
			d: "M21 19V5",
			key: "b4bplr"
		}]
	]);
	const ArrowLeftRight = createLucideIcon("arrow-left-right", [
		["path", {
			d: "M8 3 4 7l4 4",
			key: "9rb6wj"
		}],
		["path", {
			d: "M4 7h16",
			key: "6tx8e3"
		}],
		["path", {
			d: "m16 21 4-4-4-4",
			key: "siv7j2"
		}],
		["path", {
			d: "M20 17H4",
			key: "h6l3hr"
		}]
	]);
	const ArrowLeftToLine = createLucideIcon("arrow-left-to-line", [
		["path", {
			d: "M3 19V5",
			key: "rwsyhb"
		}],
		["path", {
			d: "m13 6-6 6 6 6",
			key: "1yhaz7"
		}],
		["path", {
			d: "M7 12h14",
			key: "uoisry"
		}]
	]);
	const ArrowLeft = createLucideIcon("arrow-left", [["path", {
		d: "m12 19-7-7 7-7",
		key: "1l729n"
	}], ["path", {
		d: "M19 12H5",
		key: "x3x0zl"
	}]]);
	const ArrowRightFromLine = createLucideIcon("arrow-right-from-line", [
		["path", {
			d: "M3 5v14",
			key: "1nt18q"
		}],
		["path", {
			d: "M21 12H7",
			key: "13ipq5"
		}],
		["path", {
			d: "m15 18 6-6-6-6",
			key: "6tx3qv"
		}]
	]);
	const ArrowRightLeft = createLucideIcon("arrow-right-left", [
		["path", {
			d: "m16 3 4 4-4 4",
			key: "1x1c3m"
		}],
		["path", {
			d: "M20 7H4",
			key: "zbl0bi"
		}],
		["path", {
			d: "m8 21-4-4 4-4",
			key: "h9nckh"
		}],
		["path", {
			d: "M4 17h16",
			key: "g4d7ey"
		}]
	]);
	const ArrowRightToLine = createLucideIcon("arrow-right-to-line", [
		["path", {
			d: "M17 12H3",
			key: "8awo09"
		}],
		["path", {
			d: "m11 18 6-6-6-6",
			key: "8c2y43"
		}],
		["path", {
			d: "M21 5v14",
			key: "nzette"
		}]
	]);
	const ArrowRight = createLucideIcon("arrow-right", [["path", {
		d: "M5 12h14",
		key: "1ays0h"
	}], ["path", {
		d: "m12 5 7 7-7 7",
		key: "xquz4c"
	}]]);
	const ArrowUp01 = createLucideIcon("arrow-up-0-1", [
		["path", {
			d: "m3 8 4-4 4 4",
			key: "11wl7u"
		}],
		["path", {
			d: "M7 4v16",
			key: "1glfcx"
		}],
		["rect", {
			x: "15",
			y: "4",
			width: "4",
			height: "6",
			ry: "2",
			key: "1bwicg"
		}],
		["path", {
			d: "M17 20v-6h-2",
			key: "1qp1so"
		}],
		["path", {
			d: "M15 20h4",
			key: "1j968p"
		}]
	]);
	const ArrowUp10 = createLucideIcon("arrow-up-1-0", [
		["path", {
			d: "m3 8 4-4 4 4",
			key: "11wl7u"
		}],
		["path", {
			d: "M7 4v16",
			key: "1glfcx"
		}],
		["path", {
			d: "M17 10V4h-2",
			key: "zcsr5x"
		}],
		["path", {
			d: "M15 10h4",
			key: "id2lce"
		}],
		["rect", {
			x: "15",
			y: "14",
			width: "4",
			height: "6",
			ry: "2",
			key: "33xykx"
		}]
	]);
	const ArrowUpAZ = createLucideIcon("arrow-up-a-z", [
		["path", {
			d: "m3 8 4-4 4 4",
			key: "11wl7u"
		}],
		["path", {
			d: "M7 4v16",
			key: "1glfcx"
		}],
		["path", {
			d: "M20 8h-5",
			key: "1vsyxs"
		}],
		["path", {
			d: "M15 10V6.5a2.5 2.5 0 0 1 5 0V10",
			key: "ag13bf"
		}],
		["path", {
			d: "M15 14h5l-5 6h5",
			key: "ur5jdg"
		}]
	]);
	const ArrowUpDown = createLucideIcon("arrow-up-down", [
		["path", {
			d: "m21 16-4 4-4-4",
			key: "f6ql7i"
		}],
		["path", {
			d: "M17 20V4",
			key: "1ejh1v"
		}],
		["path", {
			d: "m3 8 4-4 4 4",
			key: "11wl7u"
		}],
		["path", {
			d: "M7 4v16",
			key: "1glfcx"
		}]
	]);
	const ArrowUpFromDot = createLucideIcon("arrow-up-from-dot", [
		["path", {
			d: "m5 9 7-7 7 7",
			key: "1hw5ic"
		}],
		["path", {
			d: "M12 16V2",
			key: "ywoabb"
		}],
		["circle", {
			cx: "12",
			cy: "21",
			r: "1",
			key: "o0uj5v"
		}]
	]);
	const ArrowUpFromLine = createLucideIcon("arrow-up-from-line", [
		["path", {
			d: "m18 9-6-6-6 6",
			key: "kcunyi"
		}],
		["path", {
			d: "M12 3v14",
			key: "7cf3v8"
		}],
		["path", {
			d: "M5 21h14",
			key: "11awu3"
		}]
	]);
	const ArrowUpLeft = createLucideIcon("arrow-up-left", [["path", {
		d: "M7 17V7h10",
		key: "11bw93"
	}], ["path", {
		d: "M17 17 7 7",
		key: "2786uv"
	}]]);
	const ArrowUpNarrowWide = createLucideIcon("arrow-up-narrow-wide", [
		["path", {
			d: "m3 8 4-4 4 4",
			key: "11wl7u"
		}],
		["path", {
			d: "M7 4v16",
			key: "1glfcx"
		}],
		["path", {
			d: "M11 12h4",
			key: "q8tih4"
		}],
		["path", {
			d: "M11 16h7",
			key: "uosisv"
		}],
		["path", {
			d: "M11 20h10",
			key: "jvxblo"
		}]
	]);
	const ArrowUpRight = createLucideIcon("arrow-up-right", [["path", {
		d: "M7 7h10v10",
		key: "1tivn9"
	}], ["path", {
		d: "M7 17 17 7",
		key: "1vkiza"
	}]]);
	const ArrowUpToLine = createLucideIcon("arrow-up-to-line", [
		["path", {
			d: "M5 3h14",
			key: "7usisc"
		}],
		["path", {
			d: "m18 13-6-6-6 6",
			key: "1kf1n9"
		}],
		["path", {
			d: "M12 7v14",
			key: "1akyts"
		}]
	]);
	const ArrowUpWideNarrow = createLucideIcon("arrow-up-wide-narrow", [
		["path", {
			d: "m3 8 4-4 4 4",
			key: "11wl7u"
		}],
		["path", {
			d: "M7 4v16",
			key: "1glfcx"
		}],
		["path", {
			d: "M11 12h10",
			key: "1438ji"
		}],
		["path", {
			d: "M11 16h7",
			key: "uosisv"
		}],
		["path", {
			d: "M11 20h4",
			key: "1krc32"
		}]
	]);
	const ArrowUpZA = createLucideIcon("arrow-up-z-a", [
		["path", {
			d: "m3 8 4-4 4 4",
			key: "11wl7u"
		}],
		["path", {
			d: "M7 4v16",
			key: "1glfcx"
		}],
		["path", {
			d: "M15 4h5l-5 6h5",
			key: "8asdl1"
		}],
		["path", {
			d: "M15 20v-3.5a2.5 2.5 0 0 1 5 0V20",
			key: "r6l5cz"
		}],
		["path", {
			d: "M20 18h-5",
			key: "18j1r2"
		}]
	]);
	const ArrowUp = createLucideIcon("arrow-up", [["path", {
		d: "m5 12 7-7 7 7",
		key: "hav0vg"
	}], ["path", {
		d: "M12 19V5",
		key: "x0mq9r"
	}]]);
	const ArrowsUpFromLine = createLucideIcon("arrows-up-from-line", [
		["path", {
			d: "m4 6 3-3 3 3",
			key: "9aidw8"
		}],
		["path", {
			d: "M7 17V3",
			key: "19qxw1"
		}],
		["path", {
			d: "m14 6 3-3 3 3",
			key: "6iy689"
		}],
		["path", {
			d: "M17 17V3",
			key: "o0fmgi"
		}],
		["path", {
			d: "M4 21h16",
			key: "1h09gz"
		}]
	]);
	const Asterisk = createLucideIcon("asterisk", [
		["path", {
			d: "M12 6v12",
			key: "1vza4d"
		}],
		["path", {
			d: "M17.196 9 6.804 15",
			key: "1ah31z"
		}],
		["path", {
			d: "m6.804 9 10.392 6",
			key: "1b6pxd"
		}]
	]);
	const AtSign = createLucideIcon("at-sign", [["circle", {
		cx: "12",
		cy: "12",
		r: "4",
		key: "4exip2"
	}], ["path", {
		d: "M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8",
		key: "7n84p3"
	}]]);
	const Atom = createLucideIcon("atom", [
		["circle", {
			cx: "12",
			cy: "12",
			r: "1",
			key: "41hilf"
		}],
		["path", {
			d: "M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z",
			key: "1l2ple"
		}],
		["path", {
			d: "M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z",
			key: "1wam0m"
		}]
	]);
	const AudioLines = createLucideIcon("audio-lines", [
		["path", {
			d: "M2 10v3",
			key: "1fnikh"
		}],
		["path", {
			d: "M6 6v11",
			key: "11sgs0"
		}],
		["path", {
			d: "M10 3v18",
			key: "yhl04a"
		}],
		["path", {
			d: "M14 8v7",
			key: "3a1oy3"
		}],
		["path", {
			d: "M18 5v13",
			key: "123xd1"
		}],
		["path", {
			d: "M22 10v3",
			key: "154ddg"
		}]
	]);
	const AudioWaveform = createLucideIcon("audio-waveform", [["path", {
		d: "M2 13a2 2 0 0 0 2-2V7a2 2 0 0 1 4 0v13a2 2 0 0 0 4 0V4a2 2 0 0 1 4 0v13a2 2 0 0 0 4 0v-4a2 2 0 0 1 2-2",
		key: "57tc96"
	}]]);
	const Award = createLucideIcon("award", [["path", {
		d: "m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",
		key: "1yiouv"
	}], ["circle", {
		cx: "12",
		cy: "8",
		r: "6",
		key: "1vp47v"
	}]]);
	const Axe = createLucideIcon("axe", [["path", {
		d: "m14 12-8.381 8.38a1 1 0 0 1-3.001-3L11 9",
		key: "5z9253"
	}], ["path", {
		d: "M15 15.5a.5.5 0 0 0 .5.5A6.5 6.5 0 0 0 22 9.5a.5.5 0 0 0-.5-.5h-1.672a2 2 0 0 1-1.414-.586l-5.062-5.062a1.205 1.205 0 0 0-1.704 0L9.352 5.648a1.205 1.205 0 0 0 0 1.704l5.062 5.062A2 2 0 0 1 15 13.828z",
		key: "19zklq"
	}]]);
	const Baby = createLucideIcon("baby", [
		["path", {
			d: "M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5",
			key: "1u7htd"
		}],
		["path", {
			d: "M15 12h.01",
			key: "1k8ypt"
		}],
		["path", {
			d: "M19.38 6.813A9 9 0 0 1 20.8 10.2a2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1",
			key: "11xh7x"
		}],
		["path", {
			d: "M9 12h.01",
			key: "157uk2"
		}]
	]);
	const Axis3d = createLucideIcon("axis-3d", [
		["path", {
			d: "M13.5 10.5 15 9",
			key: "1nsxvm"
		}],
		["path", {
			d: "M4 4v15a1 1 0 0 0 1 1h15",
			key: "1w6lkd"
		}],
		["path", {
			d: "M4.293 19.707 6 18",
			key: "3g1p8c"
		}],
		["path", {
			d: "m9 15 1.5-1.5",
			key: "1xfbes"
		}]
	]);
	const Backpack = createLucideIcon("backpack", [
		["path", {
			d: "M4 10a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z",
			key: "1ol0lm"
		}],
		["path", {
			d: "M8 10h8",
			key: "c7uz4u"
		}],
		["path", {
			d: "M8 18h8",
			key: "1no2b1"
		}],
		["path", {
			d: "M8 22v-6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v6",
			key: "1fr6do"
		}],
		["path", {
			d: "M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2",
			key: "donm21"
		}]
	]);
	const BadgeAlert = createLucideIcon("badge-alert", [
		["path", {
			d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
			key: "3c2336"
		}],
		["line", {
			x1: "12",
			x2: "12",
			y1: "8",
			y2: "12",
			key: "1pkeuh"
		}],
		["line", {
			x1: "12",
			x2: "12.01",
			y1: "16",
			y2: "16",
			key: "4dfq90"
		}]
	]);
	const BadgeCent = createLucideIcon("badge-cent", [
		["path", {
			d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
			key: "3c2336"
		}],
		["path", {
			d: "M12 7v10",
			key: "jspqdw"
		}],
		["path", {
			d: "M15.4 10a4 4 0 1 0 0 4",
			key: "2eqtx8"
		}]
	]);
	const BadgeCheck = createLucideIcon("badge-check", [["path", {
		d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
		key: "3c2336"
	}], ["path", {
		d: "m9 12 2 2 4-4",
		key: "dzmm74"
	}]]);
	const BadgeDollarSign = createLucideIcon("badge-dollar-sign", [
		["path", {
			d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
			key: "3c2336"
		}],
		["path", {
			d: "M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8",
			key: "1h4pet"
		}],
		["path", {
			d: "M12 18V6",
			key: "zqpxq5"
		}]
	]);
	const BadgeEuro = createLucideIcon("badge-euro", [
		["path", {
			d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
			key: "3c2336"
		}],
		["path", {
			d: "M7 12h5",
			key: "gblrwe"
		}],
		["path", {
			d: "M15 9.4a4 4 0 1 0 0 5.2",
			key: "1makmb"
		}]
	]);
	const BadgeIndianRupee = createLucideIcon("badge-indian-rupee", [
		["path", {
			d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
			key: "3c2336"
		}],
		["path", {
			d: "M8 8h8",
			key: "1bis0t"
		}],
		["path", {
			d: "M8 12h8",
			key: "1wcyev"
		}],
		["path", {
			d: "m13 17-5-1h1a4 4 0 0 0 0-8",
			key: "nu2bwa"
		}]
	]);
	const BadgeInfo = createLucideIcon("badge-info", [
		["path", {
			d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
			key: "3c2336"
		}],
		["line", {
			x1: "12",
			x2: "12",
			y1: "16",
			y2: "12",
			key: "1y1yb1"
		}],
		["line", {
			x1: "12",
			x2: "12.01",
			y1: "8",
			y2: "8",
			key: "110wyk"
		}]
	]);
	const BadgeJapaneseYen = createLucideIcon("badge-japanese-yen", [
		["path", {
			d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
			key: "3c2336"
		}],
		["path", {
			d: "m9 8 3 3v7",
			key: "17yadx"
		}],
		["path", {
			d: "m12 11 3-3",
			key: "p4cfq1"
		}],
		["path", {
			d: "M9 12h6",
			key: "1c52cq"
		}],
		["path", {
			d: "M9 16h6",
			key: "8wimt3"
		}]
	]);
	const BadgeMinus = createLucideIcon("badge-minus", [["path", {
		d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
		key: "3c2336"
	}], ["line", {
		x1: "8",
		x2: "16",
		y1: "12",
		y2: "12",
		key: "1jonct"
	}]]);
	const BadgePercent = createLucideIcon("badge-percent", [
		["path", {
			d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
			key: "3c2336"
		}],
		["path", {
			d: "m15 9-6 6",
			key: "1uzhvr"
		}],
		["path", {
			d: "M9 9h.01",
			key: "1q5me6"
		}],
		["path", {
			d: "M15 15h.01",
			key: "lqbp3k"
		}]
	]);
	const BadgePlus = createLucideIcon("badge-plus", [
		["path", {
			d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
			key: "3c2336"
		}],
		["line", {
			x1: "12",
			x2: "12",
			y1: "8",
			y2: "16",
			key: "10p56q"
		}],
		["line", {
			x1: "8",
			x2: "16",
			y1: "12",
			y2: "12",
			key: "1jonct"
		}]
	]);
	const BadgePoundSterling = createLucideIcon("badge-pound-sterling", [
		["path", {
			d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
			key: "3c2336"
		}],
		["path", {
			d: "M8 12h4",
			key: "qz6y1c"
		}],
		["path", {
			d: "M10 16V9.5a2.5 2.5 0 0 1 5 0",
			key: "3mlbjk"
		}],
		["path", {
			d: "M8 16h7",
			key: "sbedsn"
		}]
	]);
	const BadgeQuestionMark = createLucideIcon("badge-question-mark", [
		["path", {
			d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
			key: "3c2336"
		}],
		["path", {
			d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",
			key: "1u773s"
		}],
		["line", {
			x1: "12",
			x2: "12.01",
			y1: "17",
			y2: "17",
			key: "io3f8k"
		}]
	]);
	const BadgeRussianRuble = createLucideIcon("badge-russian-ruble", [
		["path", {
			d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
			key: "3c2336"
		}],
		["path", {
			d: "M9 16h5",
			key: "1syiyw"
		}],
		["path", {
			d: "M9 12h5a2 2 0 1 0 0-4h-3v9",
			key: "1ge9c1"
		}]
	]);
	const BadgeSwissFranc = createLucideIcon("badge-swiss-franc", [
		["path", {
			d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
			key: "3c2336"
		}],
		["path", {
			d: "M11 17V8h4",
			key: "1bfq6y"
		}],
		["path", {
			d: "M11 12h3",
			key: "2eqnfz"
		}],
		["path", {
			d: "M9 16h4",
			key: "1skf3a"
		}]
	]);
	const BadgeTurkishLira = createLucideIcon("badge-turkish-lira", [
		["path", {
			d: "M11 7v10a5 5 0 0 0 5-5",
			key: "1ja3ih"
		}],
		["path", {
			d: "m15 8-6 3",
			key: "4x0uwz"
		}],
		["path", {
			d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76",
			key: "18242g"
		}]
	]);
	const BadgeX = createLucideIcon("badge-x", [
		["path", {
			d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
			key: "3c2336"
		}],
		["line", {
			x1: "15",
			x2: "9",
			y1: "9",
			y2: "15",
			key: "f7djnv"
		}],
		["line", {
			x1: "9",
			x2: "15",
			y1: "9",
			y2: "15",
			key: "1shsy8"
		}]
	]);
	const Badge = createLucideIcon("badge", [["path", {
		d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
		key: "3c2336"
	}]]);
	const BaggageClaim = createLucideIcon("baggage-claim", [
		["path", {
			d: "M22 18H6a2 2 0 0 1-2-2V7a2 2 0 0 0-2-2",
			key: "4irg2o"
		}],
		["path", {
			d: "M17 14V4a2 2 0 0 0-2-2h-1a2 2 0 0 0-2 2v10",
			key: "14fcyx"
		}],
		["rect", {
			width: "13",
			height: "8",
			x: "8",
			y: "6",
			rx: "1",
			key: "o6oiis"
		}],
		["circle", {
			cx: "18",
			cy: "20",
			r: "2",
			key: "t9985n"
		}],
		["circle", {
			cx: "9",
			cy: "20",
			r: "2",
			key: "e5v82j"
		}]
	]);
	const Ban = createLucideIcon("ban", [["path", {
		d: "M4.929 4.929 19.07 19.071",
		key: "196cmz"
	}], ["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}]]);
	const Banana = createLucideIcon("banana", [["path", {
		d: "M4 13c3.5-2 8-2 10 2a5.5 5.5 0 0 1 8 5",
		key: "1cscit"
	}], ["path", {
		d: "M5.15 17.89c5.52-1.52 8.65-6.89 7-12C11.55 4 11.5 2 13 2c3.22 0 5 5.5 5 8 0 6.5-4.2 12-10.49 12C5.11 22 2 22 2 20c0-1.5 1.14-1.55 3.15-2.11Z",
		key: "1y1nbv"
	}]]);
	const Bandage = createLucideIcon("bandage", [
		["path", {
			d: "M10 10.01h.01",
			key: "1e9xi7"
		}],
		["path", {
			d: "M10 14.01h.01",
			key: "ac23bv"
		}],
		["path", {
			d: "M14 10.01h.01",
			key: "2wfrvf"
		}],
		["path", {
			d: "M14 14.01h.01",
			key: "8tw8yn"
		}],
		["path", {
			d: "M18 6v11.5",
			key: "dkbidh"
		}],
		["path", {
			d: "M6 6v12",
			key: "vkc79e"
		}],
		["rect", {
			x: "2",
			y: "6",
			width: "20",
			height: "12",
			rx: "2",
			key: "1wpnh2"
		}]
	]);
	const BanknoteArrowDown = createLucideIcon("banknote-arrow-down", [
		["path", {
			d: "M12 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5",
			key: "x6cv4u"
		}],
		["path", {
			d: "m16 19 3 3 3-3",
			key: "1ibux0"
		}],
		["path", {
			d: "M18 12h.01",
			key: "yjnet6"
		}],
		["path", {
			d: "M19 16v6",
			key: "tddt3s"
		}],
		["path", {
			d: "M6 12h.01",
			key: "c2rlol"
		}],
		["circle", {
			cx: "12",
			cy: "12",
			r: "2",
			key: "1c9p78"
		}]
	]);
	const BanknoteArrowUp = createLucideIcon("banknote-arrow-up", [
		["path", {
			d: "M12 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5",
			key: "x6cv4u"
		}],
		["path", {
			d: "M18 12h.01",
			key: "yjnet6"
		}],
		["path", {
			d: "M19 22v-6",
			key: "qhmiwi"
		}],
		["path", {
			d: "m22 19-3-3-3 3",
			key: "rn6bg2"
		}],
		["path", {
			d: "M6 12h.01",
			key: "c2rlol"
		}],
		["circle", {
			cx: "12",
			cy: "12",
			r: "2",
			key: "1c9p78"
		}]
	]);
	const BanknoteX = createLucideIcon("banknote-x", [
		["path", {
			d: "M13 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5",
			key: "16nib6"
		}],
		["path", {
			d: "m17 17 5 5",
			key: "p7ous7"
		}],
		["path", {
			d: "M18 12h.01",
			key: "yjnet6"
		}],
		["path", {
			d: "m22 17-5 5",
			key: "gqnmv0"
		}],
		["path", {
			d: "M6 12h.01",
			key: "c2rlol"
		}],
		["circle", {
			cx: "12",
			cy: "12",
			r: "2",
			key: "1c9p78"
		}]
	]);
	const Banknote = createLucideIcon("banknote", [
		["rect", {
			width: "20",
			height: "12",
			x: "2",
			y: "6",
			rx: "2",
			key: "9lu3g6"
		}],
		["circle", {
			cx: "12",
			cy: "12",
			r: "2",
			key: "1c9p78"
		}],
		["path", {
			d: "M6 12h.01M18 12h.01",
			key: "113zkx"
		}]
	]);
	const Barcode = createLucideIcon("barcode", [
		["path", {
			d: "M3 5v14",
			key: "1nt18q"
		}],
		["path", {
			d: "M8 5v14",
			key: "1ybrkv"
		}],
		["path", {
			d: "M12 5v14",
			key: "s699le"
		}],
		["path", {
			d: "M17 5v14",
			key: "ycjyhj"
		}],
		["path", {
			d: "M21 5v14",
			key: "nzette"
		}]
	]);
	const Barrel = createLucideIcon("barrel", [
		["path", {
			d: "M10 3a41 41 0 0 0 0 18",
			key: "1qcnzb"
		}],
		["path", {
			d: "M14 3a41 41 0 0 1 0 18",
			key: "547vd4"
		}],
		["path", {
			d: "M17 3a2 2 0 0 1 1.68.92 15.25 15.25 0 0 1 0 16.16A2 2 0 0 1 17 21H7a2 2 0 0 1-1.68-.92 15.25 15.25 0 0 1 0-16.16A2 2 0 0 1 7 3z",
			key: "1wepyy"
		}],
		["path", {
			d: "M3.84 17h16.32",
			key: "1wh981"
		}],
		["path", {
			d: "M3.84 7h16.32",
			key: "19jf4x"
		}]
	]);
	const Baseline = createLucideIcon("baseline", [
		["path", {
			d: "M4 20h16",
			key: "14thso"
		}],
		["path", {
			d: "m6 16 6-12 6 12",
			key: "1b4byz"
		}],
		["path", {
			d: "M8 12h8",
			key: "1wcyev"
		}]
	]);
	const Bath = createLucideIcon("bath", [
		["path", {
			d: "M10 4 8 6",
			key: "1rru8s"
		}],
		["path", {
			d: "M17 19v2",
			key: "ts1sot"
		}],
		["path", {
			d: "M2 12h20",
			key: "9i4pu4"
		}],
		["path", {
			d: "M7 19v2",
			key: "12npes"
		}],
		["path", {
			d: "M9 5 7.621 3.621A2.121 2.121 0 0 0 4 5v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5",
			key: "14ym8i"
		}]
	]);
	const BatteryCharging = createLucideIcon("battery-charging", [
		["path", {
			d: "m11 7-3 5h4l-3 5",
			key: "b4a64w"
		}],
		["path", {
			d: "M14.856 6H16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.935",
			key: "lre1cr"
		}],
		["path", {
			d: "M22 14v-4",
			key: "14q9d5"
		}],
		["path", {
			d: "M5.14 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2.936",
			key: "13q5k0"
		}]
	]);
	const BatteryFull = createLucideIcon("battery-full", [
		["path", {
			d: "M10 10v4",
			key: "1mb2ec"
		}],
		["path", {
			d: "M14 10v4",
			key: "1nt88p"
		}],
		["path", {
			d: "M22 14v-4",
			key: "14q9d5"
		}],
		["path", {
			d: "M6 10v4",
			key: "1n77qd"
		}],
		["rect", {
			x: "2",
			y: "6",
			width: "16",
			height: "12",
			rx: "2",
			key: "13zb55"
		}]
	]);
	const BatteryLow = createLucideIcon("battery-low", [
		["path", {
			d: "M22 14v-4",
			key: "14q9d5"
		}],
		["path", {
			d: "M6 14v-4",
			key: "14a6bd"
		}],
		["rect", {
			x: "2",
			y: "6",
			width: "16",
			height: "12",
			rx: "2",
			key: "13zb55"
		}]
	]);
	const BatteryMedium = createLucideIcon("battery-medium", [
		["path", {
			d: "M10 14v-4",
			key: "suye4c"
		}],
		["path", {
			d: "M22 14v-4",
			key: "14q9d5"
		}],
		["path", {
			d: "M6 14v-4",
			key: "14a6bd"
		}],
		["rect", {
			x: "2",
			y: "6",
			width: "16",
			height: "12",
			rx: "2",
			key: "13zb55"
		}]
	]);
	const BatteryPlus = createLucideIcon("battery-plus", [
		["path", {
			d: "M10 9v6",
			key: "17i7lo"
		}],
		["path", {
			d: "M12.543 6H16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-3.605",
			key: "o09yah"
		}],
		["path", {
			d: "M22 14v-4",
			key: "14q9d5"
		}],
		["path", {
			d: "M7 12h6",
			key: "iekk3h"
		}],
		["path", {
			d: "M7.606 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.606",
			key: "xyqvf1"
		}]
	]);
	const BatteryWarning = createLucideIcon("battery-warning", [
		["path", {
			d: "M10 17h.01",
			key: "nbq80n"
		}],
		["path", {
			d: "M10 7v6",
			key: "nne03l"
		}],
		["path", {
			d: "M14 6h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2",
			key: "1m83kb"
		}],
		["path", {
			d: "M22 14v-4",
			key: "14q9d5"
		}],
		["path", {
			d: "M6 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2",
			key: "h8lgfh"
		}]
	]);
	const Battery = createLucideIcon("battery", [["path", {
		d: "M 22 14 L 22 10",
		key: "nqc4tb"
	}], ["rect", {
		x: "2",
		y: "6",
		width: "16",
		height: "12",
		rx: "2",
		key: "13zb55"
	}]]);
	const Beaker = createLucideIcon("beaker", [
		["path", {
			d: "M4.5 3h15",
			key: "c7n0jr"
		}],
		["path", {
			d: "M6 3v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3",
			key: "m1uhx7"
		}],
		["path", {
			d: "M6 14h12",
			key: "4cwo0f"
		}]
	]);
	const BeanOff = createLucideIcon("bean-off", [
		["path", {
			d: "M9 9c-.64.64-1.521.954-2.402 1.165A6 6 0 0 0 8 22a13.96 13.96 0 0 0 9.9-4.1",
			key: "bq3udt"
		}],
		["path", {
			d: "M10.75 5.093A6 6 0 0 1 22 8c0 2.411-.61 4.68-1.683 6.66",
			key: "17ccse"
		}],
		["path", {
			d: "M5.341 10.62a4 4 0 0 0 6.487 1.208M10.62 5.341a4.015 4.015 0 0 1 2.039 2.04",
			key: "18zqgq"
		}],
		["line", {
			x1: "2",
			x2: "22",
			y1: "2",
			y2: "22",
			key: "a6p6uj"
		}]
	]);
	const Bean = createLucideIcon("bean", [["path", {
		d: "M10.165 6.598C9.954 7.478 9.64 8.36 9 9c-.64.64-1.521.954-2.402 1.165A6 6 0 0 0 8 22c7.732 0 14-6.268 14-14a6 6 0 0 0-11.835-1.402Z",
		key: "1tvzk7"
	}], ["path", {
		d: "M5.341 10.62a4 4 0 1 0 5.279-5.28",
		key: "2cyri2"
	}]]);
	const BedDouble = createLucideIcon("bed-double", [
		["path", {
			d: "M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8",
			key: "1k78r4"
		}],
		["path", {
			d: "M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4",
			key: "fb3tl2"
		}],
		["path", {
			d: "M12 4v6",
			key: "1dcgq2"
		}],
		["path", {
			d: "M2 18h20",
			key: "ajqnye"
		}]
	]);
	const BedSingle = createLucideIcon("bed-single", [
		["path", {
			d: "M3 20v-8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8",
			key: "1wm6mi"
		}],
		["path", {
			d: "M5 10V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4",
			key: "4k93s5"
		}],
		["path", {
			d: "M3 18h18",
			key: "1h113x"
		}]
	]);
	const Bed = createLucideIcon("bed", [
		["path", {
			d: "M2 4v16",
			key: "vw9hq8"
		}],
		["path", {
			d: "M2 8h18a2 2 0 0 1 2 2v10",
			key: "1dgv2r"
		}],
		["path", {
			d: "M2 17h20",
			key: "18nfp3"
		}],
		["path", {
			d: "M6 8v9",
			key: "1yriud"
		}]
	]);
	const Beef = createLucideIcon("beef", [
		["path", {
			d: "M16.4 13.7A6.5 6.5 0 1 0 6.28 6.6c-1.1 3.13-.78 3.9-3.18 6.08A3 3 0 0 0 5 18c4 0 8.4-1.8 11.4-4.3",
			key: "cisjcv"
		}],
		["path", {
			d: "m18.5 6 2.19 4.5a6.48 6.48 0 0 1-2.29 7.2C15.4 20.2 11 22 7 22a3 3 0 0 1-2.68-1.66L2.4 16.5",
			key: "5byaag"
		}],
		["circle", {
			cx: "12.5",
			cy: "8.5",
			r: "2.5",
			key: "9738u8"
		}]
	]);
	const BeerOff = createLucideIcon("beer-off", [
		["path", {
			d: "M13 13v5",
			key: "igwfh0"
		}],
		["path", {
			d: "M17 11.47V8",
			key: "16yw0g"
		}],
		["path", {
			d: "M17 11h1a3 3 0 0 1 2.745 4.211",
			key: "1xbt65"
		}],
		["path", {
			d: "m2 2 20 20",
			key: "1ooewy"
		}],
		["path", {
			d: "M5 8v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-3",
			key: "c55o3e"
		}],
		["path", {
			d: "M7.536 7.535C6.766 7.649 6.154 8 5.5 8a2.5 2.5 0 0 1-1.768-4.268",
			key: "1ydug7"
		}],
		["path", {
			d: "M8.727 3.204C9.306 2.767 9.885 2 11 2c1.56 0 2 1.5 3 1.5s1.72-.5 2.5-.5a1 1 0 1 1 0 5c-.78 0-1.5-.5-2.5-.5a3.149 3.149 0 0 0-.842.12",
			key: "q81o7q"
		}],
		["path", {
			d: "M9 14.6V18",
			key: "20ek98"
		}]
	]);
	const Beer = createLucideIcon("beer", [
		["path", {
			d: "M17 11h1a3 3 0 0 1 0 6h-1",
			key: "1yp76v"
		}],
		["path", {
			d: "M9 12v6",
			key: "1u1cab"
		}],
		["path", {
			d: "M13 12v6",
			key: "1sugkk"
		}],
		["path", {
			d: "M14 7.5c-1 0-1.44.5-3 .5s-2-.5-3-.5-1.72.5-2.5.5a2.5 2.5 0 0 1 0-5c.78 0 1.57.5 2.5.5S9.44 2 11 2s2 1.5 3 1.5 1.72-.5 2.5-.5a2.5 2.5 0 0 1 0 5c-.78 0-1.5-.5-2.5-.5Z",
			key: "1510fo"
		}],
		["path", {
			d: "M5 8v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8",
			key: "19jb7n"
		}]
	]);
	const BellDot = createLucideIcon("bell-dot", [
		["path", {
			d: "M10.268 21a2 2 0 0 0 3.464 0",
			key: "vwvbt9"
		}],
		["path", {
			d: "M13.916 2.314A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.74 7.327A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673 9 9 0 0 1-.585-.665",
			key: "1tip0g"
		}],
		["circle", {
			cx: "18",
			cy: "8",
			r: "3",
			key: "1g0gzu"
		}]
	]);
	const BellElectric = createLucideIcon("bell-electric", [
		["path", {
			d: "M18.518 17.347A7 7 0 0 1 14 19",
			key: "1emhpo"
		}],
		["path", {
			d: "M18.8 4A11 11 0 0 1 20 9",
			key: "127b67"
		}],
		["path", {
			d: "M9 9h.01",
			key: "1q5me6"
		}],
		["circle", {
			cx: "20",
			cy: "16",
			r: "2",
			key: "1v9bxh"
		}],
		["circle", {
			cx: "9",
			cy: "9",
			r: "7",
			key: "p2h5vp"
		}],
		["rect", {
			x: "4",
			y: "16",
			width: "10",
			height: "6",
			rx: "2",
			key: "bfnviv"
		}]
	]);
	const BellMinus = createLucideIcon("bell-minus", [
		["path", {
			d: "M10.268 21a2 2 0 0 0 3.464 0",
			key: "vwvbt9"
		}],
		["path", {
			d: "M15 8h6",
			key: "8ybuxh"
		}],
		["path", {
			d: "M16.243 3.757A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673A9.4 9.4 0 0 1 18.667 12",
			key: "bdwj86"
		}]
	]);
	const BellOff = createLucideIcon("bell-off", [
		["path", {
			d: "M10.268 21a2 2 0 0 0 3.464 0",
			key: "vwvbt9"
		}],
		["path", {
			d: "M17 17H4a1 1 0 0 1-.74-1.673C4.59 13.956 6 12.499 6 8a6 6 0 0 1 .258-1.742",
			key: "178tsu"
		}],
		["path", {
			d: "m2 2 20 20",
			key: "1ooewy"
		}],
		["path", {
			d: "M8.668 3.01A6 6 0 0 1 18 8c0 2.687.77 4.653 1.707 6.05",
			key: "1hqiys"
		}]
	]);
	const BellPlus = createLucideIcon("bell-plus", [
		["path", {
			d: "M10.268 21a2 2 0 0 0 3.464 0",
			key: "vwvbt9"
		}],
		["path", {
			d: "M15 8h6",
			key: "8ybuxh"
		}],
		["path", {
			d: "M18 5v6",
			key: "g5ayrv"
		}],
		["path", {
			d: "M20.002 14.464a9 9 0 0 0 .738.863A1 1 0 0 1 20 17H4a1 1 0 0 1-.74-1.673C4.59 13.956 6 12.499 6 8a6 6 0 0 1 8.75-5.332",
			key: "1abcvy"
		}]
	]);
	const BellRing = createLucideIcon("bell-ring", [
		["path", {
			d: "M10.268 21a2 2 0 0 0 3.464 0",
			key: "vwvbt9"
		}],
		["path", {
			d: "M22 8c0-2.3-.8-4.3-2-6",
			key: "5bb3ad"
		}],
		["path", {
			d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",
			key: "11g9vi"
		}],
		["path", {
			d: "M4 2C2.8 3.7 2 5.7 2 8",
			key: "tap9e0"
		}]
	]);
	const Bell = createLucideIcon("bell", [["path", {
		d: "M10.268 21a2 2 0 0 0 3.464 0",
		key: "vwvbt9"
	}], ["path", {
		d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",
		key: "11g9vi"
	}]]);
	const BetweenHorizontalEnd = createLucideIcon("between-horizontal-end", [
		["rect", {
			width: "13",
			height: "7",
			x: "3",
			y: "3",
			rx: "1",
			key: "11xb64"
		}],
		["path", {
			d: "m22 15-3-3 3-3",
			key: "26chmm"
		}],
		["rect", {
			width: "13",
			height: "7",
			x: "3",
			y: "14",
			rx: "1",
			key: "k6ky7n"
		}]
	]);
	const BetweenHorizontalStart = createLucideIcon("between-horizontal-start", [
		["rect", {
			width: "13",
			height: "7",
			x: "8",
			y: "3",
			rx: "1",
			key: "pkso9a"
		}],
		["path", {
			d: "m2 9 3 3-3 3",
			key: "1agib5"
		}],
		["rect", {
			width: "13",
			height: "7",
			x: "8",
			y: "14",
			rx: "1",
			key: "1q5fc1"
		}]
	]);
	const BetweenVerticalEnd = createLucideIcon("between-vertical-end", [
		["rect", {
			width: "7",
			height: "13",
			x: "3",
			y: "3",
			rx: "1",
			key: "1fdu0f"
		}],
		["path", {
			d: "m9 22 3-3 3 3",
			key: "17z65a"
		}],
		["rect", {
			width: "7",
			height: "13",
			x: "14",
			y: "3",
			rx: "1",
			key: "1squn4"
		}]
	]);
	const BetweenVerticalStart = createLucideIcon("between-vertical-start", [
		["rect", {
			width: "7",
			height: "13",
			x: "3",
			y: "8",
			rx: "1",
			key: "1fjrkv"
		}],
		["path", {
			d: "m15 2-3 3-3-3",
			key: "1uh6eb"
		}],
		["rect", {
			width: "7",
			height: "13",
			x: "14",
			y: "8",
			rx: "1",
			key: "w3fjg8"
		}]
	]);
	const BicepsFlexed = createLucideIcon("biceps-flexed", [
		["path", {
			d: "M12.409 13.017A5 5 0 0 1 22 15c0 3.866-4 7-9 7-4.077 0-8.153-.82-10.371-2.462-.426-.316-.631-.832-.62-1.362C2.118 12.723 2.627 2 10 2a3 3 0 0 1 3 3 2 2 0 0 1-2 2c-1.105 0-1.64-.444-2-1",
			key: "1pmlyh"
		}],
		["path", {
			d: "M15 14a5 5 0 0 0-7.584 2",
			key: "5rb254"
		}],
		["path", {
			d: "M9.964 6.825C8.019 7.977 9.5 13 8 15",
			key: "kbvsx9"
		}]
	]);
	const Bike = createLucideIcon("bike", [
		["circle", {
			cx: "18.5",
			cy: "17.5",
			r: "3.5",
			key: "15x4ox"
		}],
		["circle", {
			cx: "5.5",
			cy: "17.5",
			r: "3.5",
			key: "1noe27"
		}],
		["circle", {
			cx: "15",
			cy: "5",
			r: "1",
			key: "19l28e"
		}],
		["path", {
			d: "M12 17.5V14l-3-3 4-3 2 3h2",
			key: "1npguv"
		}]
	]);
	const Binary = createLucideIcon("binary", [
		["rect", {
			x: "14",
			y: "14",
			width: "4",
			height: "6",
			rx: "2",
			key: "p02svl"
		}],
		["rect", {
			x: "6",
			y: "4",
			width: "4",
			height: "6",
			rx: "2",
			key: "xm4xkj"
		}],
		["path", {
			d: "M6 20h4",
			key: "1i6q5t"
		}],
		["path", {
			d: "M14 10h4",
			key: "ru81e7"
		}],
		["path", {
			d: "M6 14h2v6",
			key: "16z9wg"
		}],
		["path", {
			d: "M14 4h2v6",
			key: "1idq9u"
		}]
	]);
	const Binoculars = createLucideIcon("binoculars", [
		["path", {
			d: "M10 10h4",
			key: "tcdvrf"
		}],
		["path", {
			d: "M19 7V4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3",
			key: "3apit1"
		}],
		["path", {
			d: "M20 21a2 2 0 0 0 2-2v-3.851c0-1.39-2-2.962-2-4.829V8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v11a2 2 0 0 0 2 2z",
			key: "rhpgnw"
		}],
		["path", {
			d: "M 22 16 L 2 16",
			key: "14lkq7"
		}],
		["path", {
			d: "M4 21a2 2 0 0 1-2-2v-3.851c0-1.39 2-2.962 2-4.829V8a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v11a2 2 0 0 1-2 2z",
			key: "104b3k"
		}],
		["path", {
			d: "M9 7V4a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v3",
			key: "14fczp"
		}]
	]);
	const Biohazard = createLucideIcon("biohazard", [
		["circle", {
			cx: "12",
			cy: "11.9",
			r: "2",
			key: "e8h31w"
		}],
		["path", {
			d: "M6.7 3.4c-.9 2.5 0 5.2 2.2 6.7C6.5 9 3.7 9.6 2 11.6",
			key: "17bolr"
		}],
		["path", {
			d: "m8.9 10.1 1.4.8",
			key: "15ezny"
		}],
		["path", {
			d: "M17.3 3.4c.9 2.5 0 5.2-2.2 6.7 2.4-1.2 5.2-.6 6.9 1.5",
			key: "wtwa5u"
		}],
		["path", {
			d: "m15.1 10.1-1.4.8",
			key: "1r0b28"
		}],
		["path", {
			d: "M16.7 20.8c-2.6-.4-4.6-2.6-4.7-5.3-.2 2.6-2.1 4.8-4.7 5.2",
			key: "m7qszh"
		}],
		["path", {
			d: "M12 13.9v1.6",
			key: "zfyyim"
		}],
		["path", {
			d: "M13.5 5.4c-1-.2-2-.2-3 0",
			key: "1bi9q0"
		}],
		["path", {
			d: "M17 16.4c.7-.7 1.2-1.6 1.5-2.5",
			key: "1rhjqw"
		}],
		["path", {
			d: "M5.5 13.9c.3.9.8 1.8 1.5 2.5",
			key: "8gsud3"
		}]
	]);
	const Bird = createLucideIcon("bird", [
		["path", {
			d: "M16 7h.01",
			key: "1kdx03"
		}],
		["path", {
			d: "M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.28-2.3L2 20",
			key: "oj1oa8"
		}],
		["path", {
			d: "m20 7 2 .5-2 .5",
			key: "12nv4d"
		}],
		["path", {
			d: "M10 18v3",
			key: "1yea0a"
		}],
		["path", {
			d: "M14 17.75V21",
			key: "1pymcb"
		}],
		["path", {
			d: "M7 18a6 6 0 0 0 3.84-10.61",
			key: "1npnn0"
		}]
	]);
	const Bitcoin = createLucideIcon("bitcoin", [["path", {
		d: "M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894m-1.216 6.894L5.86 18.047m5.908 1.042-.347 1.97m1.563-8.864c4.924.869 6.14-6.025 1.215-6.893m-1.215 6.893-3.94-.694m5.155-6.2L8.29 4.26m5.908 1.042.348-1.97M7.48 20.364l3.126-17.727",
		key: "yr8idg"
	}]]);
	const Blend = createLucideIcon("blend", [["circle", {
		cx: "9",
		cy: "9",
		r: "7",
		key: "p2h5vp"
	}], ["circle", {
		cx: "15",
		cy: "15",
		r: "7",
		key: "19ennj"
	}]]);
	const Blinds = createLucideIcon("blinds", [
		["path", {
			d: "M3 3h18",
			key: "o7r712"
		}],
		["path", {
			d: "M20 7H8",
			key: "gd2fo2"
		}],
		["path", {
			d: "M20 11H8",
			key: "1ynp89"
		}],
		["path", {
			d: "M10 19h10",
			key: "19hjk5"
		}],
		["path", {
			d: "M8 15h12",
			key: "1yqzne"
		}],
		["path", {
			d: "M4 3v14",
			key: "fggqzn"
		}],
		["circle", {
			cx: "4",
			cy: "19",
			r: "2",
			key: "p3m9r0"
		}]
	]);
	const Blocks = createLucideIcon("blocks", [["path", {
		d: "M10 22V7a1 1 0 0 0-1-1H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5a1 1 0 0 0-1-1H2",
		key: "1ah6g2"
	}], ["rect", {
		x: "14",
		y: "2",
		width: "8",
		height: "8",
		rx: "1",
		key: "88lufb"
	}]]);
	const BluetoothConnected = createLucideIcon("bluetooth-connected", [
		["path", {
			d: "m7 7 10 10-5 5V2l5 5L7 17",
			key: "1q5490"
		}],
		["line", {
			x1: "18",
			x2: "21",
			y1: "12",
			y2: "12",
			key: "1rsjjs"
		}],
		["line", {
			x1: "3",
			x2: "6",
			y1: "12",
			y2: "12",
			key: "11yl8c"
		}]
	]);
	const BluetoothOff = createLucideIcon("bluetooth-off", [
		["path", {
			d: "m17 17-5 5V12l-5 5",
			key: "v5aci6"
		}],
		["path", {
			d: "m2 2 20 20",
			key: "1ooewy"
		}],
		["path", {
			d: "M14.5 9.5 17 7l-5-5v4.5",
			key: "1kddfz"
		}]
	]);
	const BluetoothSearching = createLucideIcon("bluetooth-searching", [
		["path", {
			d: "m7 7 10 10-5 5V2l5 5L7 17",
			key: "1q5490"
		}],
		["path", {
			d: "M20.83 14.83a4 4 0 0 0 0-5.66",
			key: "k8tn1j"
		}],
		["path", {
			d: "M18 12h.01",
			key: "yjnet6"
		}]
	]);
	const Bluetooth = createLucideIcon("bluetooth", [["path", {
		d: "m7 7 10 10-5 5V2l5 5L7 17",
		key: "1q5490"
	}]]);
	const Bold = createLucideIcon("bold", [["path", {
		d: "M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8",
		key: "mg9rjx"
	}]]);
	const Bolt = createLucideIcon("bolt", [["path", {
		d: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z",
		key: "yt0hxn"
	}], ["circle", {
		cx: "12",
		cy: "12",
		r: "4",
		key: "4exip2"
	}]]);
	const Bomb = createLucideIcon("bomb", [
		["circle", {
			cx: "11",
			cy: "13",
			r: "9",
			key: "hd149"
		}],
		["path", {
			d: "M14.35 4.65 16.3 2.7a2.41 2.41 0 0 1 3.4 0l1.6 1.6a2.4 2.4 0 0 1 0 3.4l-1.95 1.95",
			key: "jp4j1b"
		}],
		["path", {
			d: "m22 2-1.5 1.5",
			key: "ay92ug"
		}]
	]);
	const Bone = createLucideIcon("bone", [["path", {
		d: "M17 10c.7-.7 1.69 0 2.5 0a2.5 2.5 0 1 0 0-5 .5.5 0 0 1-.5-.5 2.5 2.5 0 1 0-5 0c0 .81.7 1.8 0 2.5l-7 7c-.7.7-1.69 0-2.5 0a2.5 2.5 0 0 0 0 5c.28 0 .5.22.5.5a2.5 2.5 0 1 0 5 0c0-.81-.7-1.8 0-2.5Z",
		key: "w610uw"
	}]]);
	const BookA = createLucideIcon("book-a", [
		["path", {
			d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",
			key: "k3hazp"
		}],
		["path", {
			d: "m8 13 4-7 4 7",
			key: "4rari8"
		}],
		["path", {
			d: "M9.1 11h5.7",
			key: "1gkovt"
		}]
	]);
	const BookAlert = createLucideIcon("book-alert", [
		["path", {
			d: "M12 13h.01",
			key: "y0uutt"
		}],
		["path", {
			d: "M12 6v3",
			key: "1m4b9j"
		}],
		["path", {
			d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",
			key: "k3hazp"
		}]
	]);
	const BookAudio = createLucideIcon("book-audio", [
		["path", {
			d: "M12 6v7",
			key: "1f6ttz"
		}],
		["path", {
			d: "M16 8v3",
			key: "gejaml"
		}],
		["path", {
			d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",
			key: "k3hazp"
		}],
		["path", {
			d: "M8 8v3",
			key: "1qzp49"
		}]
	]);
	const BookCheck = createLucideIcon("book-check", [["path", {
		d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",
		key: "k3hazp"
	}], ["path", {
		d: "m9 9.5 2 2 4-4",
		key: "1dth82"
	}]]);
	const BookCopy = createLucideIcon("book-copy", [
		["path", {
			d: "M5 7a2 2 0 0 0-2 2v11",
			key: "1yhqjt"
		}],
		["path", {
			d: "M5.803 18H5a2 2 0 0 0 0 4h9.5a.5.5 0 0 0 .5-.5V21",
			key: "edzzo5"
		}],
		["path", {
			d: "M9 15V4a2 2 0 0 1 2-2h9.5a.5.5 0 0 1 .5.5v14a.5.5 0 0 1-.5.5H11a2 2 0 0 1 0-4h10",
			key: "1nwzrg"
		}]
	]);
	const BookDashed = createLucideIcon("book-dashed", [
		["path", {
			d: "M12 17h1.5",
			key: "1gkc67"
		}],
		["path", {
			d: "M12 22h1.5",
			key: "1my7sn"
		}],
		["path", {
			d: "M12 2h1.5",
			key: "19tvb7"
		}],
		["path", {
			d: "M17.5 22H19a1 1 0 0 0 1-1",
			key: "10akbh"
		}],
		["path", {
			d: "M17.5 2H19a1 1 0 0 1 1 1v1.5",
			key: "1vrfjs"
		}],
		["path", {
			d: "M20 14v3h-2.5",
			key: "1naeju"
		}],
		["path", {
			d: "M20 8.5V10",
			key: "1ctpfu"
		}],
		["path", {
			d: "M4 10V8.5",
			key: "1o3zg5"
		}],
		["path", {
			d: "M4 19.5V14",
			key: "ob81pf"
		}],
		["path", {
			d: "M4 4.5A2.5 2.5 0 0 1 6.5 2H8",
			key: "s8vcyb"
		}],
		["path", {
			d: "M8 22H6.5a1 1 0 0 1 0-5H8",
			key: "1cu73q"
		}]
	]);
	const BookDown = createLucideIcon("book-down", [
		["path", {
			d: "M12 13V7",
			key: "h0r20n"
		}],
		["path", {
			d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",
			key: "k3hazp"
		}],
		["path", {
			d: "m9 10 3 3 3-3",
			key: "zt5b4y"
		}]
	]);
	const BookHeadphones = createLucideIcon("book-headphones", [
		["path", {
			d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",
			key: "k3hazp"
		}],
		["path", {
			d: "M8 12v-2a4 4 0 0 1 8 0v2",
			key: "1vsqkj"
		}],
		["circle", {
			cx: "15",
			cy: "12",
			r: "1",
			key: "1tmaij"
		}],
		["circle", {
			cx: "9",
			cy: "12",
			r: "1",
			key: "1vctgf"
		}]
	]);
	const BookHeart = createLucideIcon("book-heart", [["path", {
		d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",
		key: "k3hazp"
	}], ["path", {
		d: "M8.62 9.8A2.25 2.25 0 1 1 12 6.836a2.25 2.25 0 1 1 3.38 2.966l-2.626 2.856a.998.998 0 0 1-1.507 0z",
		key: "9v40y5"
	}]]);
	const BookImage = createLucideIcon("book-image", [
		["path", {
			d: "m20 13.7-2.1-2.1a2 2 0 0 0-2.8 0L9.7 17",
			key: "q6ojf0"
		}],
		["path", {
			d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",
			key: "k3hazp"
		}],
		["circle", {
			cx: "10",
			cy: "8",
			r: "2",
			key: "2qkj4p"
		}]
	]);
	const BookKey = createLucideIcon("book-key", [
		["path", {
			d: "m19 3 1 1",
			key: "ze14oc"
		}],
		["path", {
			d: "m20 2-4.5 4.5",
			key: "1sppr8"
		}],
		["path", {
			d: "M20 7.898V21a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",
			key: "1xzogz"
		}],
		["path", {
			d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2h7.844",
			key: "vtdg6h"
		}],
		["circle", {
			cx: "14",
			cy: "8",
			r: "2",
			key: "u49eql"
		}]
	]);
	const BookLock = createLucideIcon("book-lock", [
		["path", {
			d: "M18 6V4a2 2 0 1 0-4 0v2",
			key: "1aquzs"
		}],
		["path", {
			d: "M20 15v6a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",
			key: "1rkj32"
		}],
		["path", {
			d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H10",
			key: "18wgow"
		}],
		["rect", {
			x: "12",
			y: "6",
			width: "8",
			height: "5",
			rx: "1",
			key: "73l30o"
		}]
	]);
	const BookMarked = createLucideIcon("book-marked", [["path", {
		d: "M10 2v8l3-3 3 3V2",
		key: "sqw3rj"
	}], ["path", {
		d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",
		key: "k3hazp"
	}]]);
	const BookMinus = createLucideIcon("book-minus", [["path", {
		d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",
		key: "k3hazp"
	}], ["path", {
		d: "M9 10h6",
		key: "9gxzsh"
	}]]);
	const BookOpenCheck = createLucideIcon("book-open-check", [
		["path", {
			d: "M12 21V7",
			key: "gj6g52"
		}],
		["path", {
			d: "m16 12 2 2 4-4",
			key: "mdajum"
		}],
		["path", {
			d: "M22 6V4a1 1 0 0 0-1-1h-5a4 4 0 0 0-4 4 4 4 0 0 0-4-4H3a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h6a3 3 0 0 1 3 3 3 3 0 0 1 3-3h6a1 1 0 0 0 1-1v-1.3",
			key: "8arnkb"
		}]
	]);
	const BookOpenText = createLucideIcon("book-open-text", [
		["path", {
			d: "M12 7v14",
			key: "1akyts"
		}],
		["path", {
			d: "M16 12h2",
			key: "7q9ll5"
		}],
		["path", {
			d: "M16 8h2",
			key: "msurwy"
		}],
		["path", {
			d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",
			key: "ruj8y"
		}],
		["path", {
			d: "M6 12h2",
			key: "32wvfc"
		}],
		["path", {
			d: "M6 8h2",
			key: "30oboj"
		}]
	]);
	const BookOpen = createLucideIcon("book-open", [["path", {
		d: "M12 7v14",
		key: "1akyts"
	}], ["path", {
		d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",
		key: "ruj8y"
	}]]);
	const BookPlus = createLucideIcon("book-plus", [
		["path", {
			d: "M12 7v6",
			key: "lw1j43"
		}],
		["path", {
			d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",
			key: "k3hazp"
		}],
		["path", {
			d: "M9 10h6",
			key: "9gxzsh"
		}]
	]);
	const BookText = createLucideIcon("book-text", [
		["path", {
			d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",
			key: "k3hazp"
		}],
		["path", {
			d: "M8 11h8",
			key: "vwpz6n"
		}],
		["path", {
			d: "M8 7h6",
			key: "1f0q6e"
		}]
	]);
	const BookType = createLucideIcon("book-type", [
		["path", {
			d: "M10 13h4",
			key: "ytezjc"
		}],
		["path", {
			d: "M12 6v7",
			key: "1f6ttz"
		}],
		["path", {
			d: "M16 8V6H8v2",
			key: "x8j6u4"
		}],
		["path", {
			d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",
			key: "k3hazp"
		}]
	]);
	const BookUp2 = createLucideIcon("book-up-2", [
		["path", {
			d: "M12 13V7",
			key: "h0r20n"
		}],
		["path", {
			d: "M18 2h1a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",
			key: "161d7n"
		}],
		["path", {
			d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2",
			key: "1lorq7"
		}],
		["path", {
			d: "m9 10 3-3 3 3",
			key: "11gsxs"
		}],
		["path", {
			d: "m9 5 3-3 3 3",
			key: "l8vdw6"
		}]
	]);
	const BookUp = createLucideIcon("book-up", [
		["path", {
			d: "M12 13V7",
			key: "h0r20n"
		}],
		["path", {
			d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",
			key: "k3hazp"
		}],
		["path", {
			d: "m9 10 3-3 3 3",
			key: "11gsxs"
		}]
	]);
	const BookUser = createLucideIcon("book-user", [
		["path", {
			d: "M15 13a3 3 0 1 0-6 0",
			key: "10j68g"
		}],
		["path", {
			d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",
			key: "k3hazp"
		}],
		["circle", {
			cx: "12",
			cy: "8",
			r: "2",
			key: "1822b1"
		}]
	]);
	const BookX = createLucideIcon("book-x", [
		["path", {
			d: "m14.5 7-5 5",
			key: "dy991v"
		}],
		["path", {
			d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",
			key: "k3hazp"
		}],
		["path", {
			d: "m9.5 7 5 5",
			key: "s45iea"
		}]
	]);
	const Book = createLucideIcon("book", [["path", {
		d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",
		key: "k3hazp"
	}]]);
	const BookmarkCheck = createLucideIcon("bookmark-check", [["path", {
		d: "m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z",
		key: "169p4p"
	}], ["path", {
		d: "m9 10 2 2 4-4",
		key: "1gnqz4"
	}]]);
	const BookmarkMinus = createLucideIcon("bookmark-minus", [["path", {
		d: "m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z",
		key: "1fy3hk"
	}], ["line", {
		x1: "15",
		x2: "9",
		y1: "10",
		y2: "10",
		key: "1gty7f"
	}]]);
	const BookmarkPlus = createLucideIcon("bookmark-plus", [
		["path", {
			d: "m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z",
			key: "1fy3hk"
		}],
		["line", {
			x1: "12",
			x2: "12",
			y1: "7",
			y2: "13",
			key: "1cppfj"
		}],
		["line", {
			x1: "15",
			x2: "9",
			y1: "10",
			y2: "10",
			key: "1gty7f"
		}]
	]);
	const BookmarkX = createLucideIcon("bookmark-x", [
		["path", {
			d: "m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z",
			key: "169p4p"
		}],
		["path", {
			d: "m14.5 7.5-5 5",
			key: "3lb6iw"
		}],
		["path", {
			d: "m9.5 7.5 5 5",
			key: "ko136h"
		}]
	]);
	const Bookmark = createLucideIcon("bookmark", [["path", {
		d: "m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z",
		key: "1fy3hk"
	}]]);
	const BoomBox = createLucideIcon("boom-box", [
		["path", {
			d: "M4 9V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4",
			key: "vvzvr1"
		}],
		["path", {
			d: "M8 8v1",
			key: "xcqmfk"
		}],
		["path", {
			d: "M12 8v1",
			key: "1rj8u4"
		}],
		["path", {
			d: "M16 8v1",
			key: "1q12zr"
		}],
		["rect", {
			width: "20",
			height: "12",
			x: "2",
			y: "9",
			rx: "2",
			key: "igpb89"
		}],
		["circle", {
			cx: "8",
			cy: "15",
			r: "2",
			key: "fa4a8s"
		}],
		["circle", {
			cx: "16",
			cy: "15",
			r: "2",
			key: "14c3ya"
		}]
	]);
	const BotMessageSquare = createLucideIcon("bot-message-square", [
		["path", {
			d: "M12 6V2H8",
			key: "1155em"
		}],
		["path", {
			d: "M15 11v2",
			key: "i11awn"
		}],
		["path", {
			d: "M2 12h2",
			key: "1t8f8n"
		}],
		["path", {
			d: "M20 12h2",
			key: "1q8mjw"
		}],
		["path", {
			d: "M20 16a2 2 0 0 1-2 2H8.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 4 20.286V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2z",
			key: "11gyqh"
		}],
		["path", {
			d: "M9 11v2",
			key: "1ueba0"
		}]
	]);
	const Bot = createLucideIcon("bot", [
		["path", {
			d: "M12 8V4H8",
			key: "hb8ula"
		}],
		["rect", {
			width: "16",
			height: "12",
			x: "4",
			y: "8",
			rx: "2",
			key: "enze0r"
		}],
		["path", {
			d: "M2 14h2",
			key: "vft8re"
		}],
		["path", {
			d: "M20 14h2",
			key: "4cs60a"
		}],
		["path", {
			d: "M15 13v2",
			key: "1xurst"
		}],
		["path", {
			d: "M9 13v2",
			key: "rq6x2g"
		}]
	]);
	const BotOff = createLucideIcon("bot-off", [
		["path", {
			d: "M13.67 8H18a2 2 0 0 1 2 2v4.33",
			key: "7az073"
		}],
		["path", {
			d: "M2 14h2",
			key: "vft8re"
		}],
		["path", {
			d: "M20 14h2",
			key: "4cs60a"
		}],
		["path", {
			d: "M22 22 2 2",
			key: "1r8tn9"
		}],
		["path", {
			d: "M8 8H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 1.414-.586",
			key: "s09a7a"
		}],
		["path", {
			d: "M9 13v2",
			key: "rq6x2g"
		}],
		["path", {
			d: "M9.67 4H12v2.33",
			key: "110xot"
		}]
	]);
	const BottleWine = createLucideIcon("bottle-wine", [["path", {
		d: "M10 3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a6 6 0 0 0 1.2 3.6l.6.8A6 6 0 0 1 17 13v8a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-8a6 6 0 0 1 1.2-3.6l.6-.8A6 6 0 0 0 10 5z",
		key: "blqgoc"
	}], ["path", {
		d: "M17 13h-4a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h4",
		key: "43jbee"
	}]]);
	const BowArrow = createLucideIcon("bow-arrow", [
		["path", {
			d: "M17 3h4v4",
			key: "19p9u1"
		}],
		["path", {
			d: "M18.575 11.082a13 13 0 0 1 1.048 9.027 1.17 1.17 0 0 1-1.914.597L14 17",
			key: "12t3w9"
		}],
		["path", {
			d: "M7 10 3.29 6.29a1.17 1.17 0 0 1 .6-1.91 13 13 0 0 1 9.03 1.05",
			key: "ogng5l"
		}],
		["path", {
			d: "M7 14a1.7 1.7 0 0 0-1.207.5l-2.646 2.646A.5.5 0 0 0 3.5 18H5a1 1 0 0 1 1 1v1.5a.5.5 0 0 0 .854.354L9.5 18.207A1.7 1.7 0 0 0 10 17v-2a1 1 0 0 0-1-1z",
			key: "8v3fy2"
		}],
		["path", {
			d: "M9.707 14.293 21 3",
			key: "ydm3bn"
		}]
	]);
	const Box = createLucideIcon("box", [
		["path", {
			d: "M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z",
			key: "hh9hay"
		}],
		["path", {
			d: "m3.3 7 8.7 5 8.7-5",
			key: "g66t2b"
		}],
		["path", {
			d: "M12 22V12",
			key: "d0xqtd"
		}]
	]);
	const Boxes = createLucideIcon("boxes", [
		["path", {
			d: "M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z",
			key: "lc1i9w"
		}],
		["path", {
			d: "m7 16.5-4.74-2.85",
			key: "1o9zyk"
		}],
		["path", {
			d: "m7 16.5 5-3",
			key: "va8pkn"
		}],
		["path", {
			d: "M7 16.5v5.17",
			key: "jnp8gn"
		}],
		["path", {
			d: "M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z",
			key: "8zsnat"
		}],
		["path", {
			d: "m17 16.5-5-3",
			key: "8arw3v"
		}],
		["path", {
			d: "m17 16.5 4.74-2.85",
			key: "8rfmw"
		}],
		["path", {
			d: "M17 16.5v5.17",
			key: "k6z78m"
		}],
		["path", {
			d: "M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z",
			key: "1xygjf"
		}],
		["path", {
			d: "M12 8 7.26 5.15",
			key: "1vbdud"
		}],
		["path", {
			d: "m12 8 4.74-2.85",
			key: "3rx089"
		}],
		["path", {
			d: "M12 13.5V8",
			key: "1io7kd"
		}]
	]);
	const Braces = createLucideIcon("braces", [["path", {
		d: "M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1",
		key: "ezmyqa"
	}], ["path", {
		d: "M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1",
		key: "e1hn23"
	}]]);
	const Brackets = createLucideIcon("brackets", [["path", {
		d: "M16 3h3a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-3",
		key: "1kt8lf"
	}], ["path", {
		d: "M8 21H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h3",
		key: "gduv9"
	}]]);
	const BrainCircuit = createLucideIcon("brain-circuit", [
		["path", {
			d: "M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z",
			key: "l5xja"
		}],
		["path", {
			d: "M9 13a4.5 4.5 0 0 0 3-4",
			key: "10igwf"
		}],
		["path", {
			d: "M6.003 5.125A3 3 0 0 0 6.401 6.5",
			key: "105sqy"
		}],
		["path", {
			d: "M3.477 10.896a4 4 0 0 1 .585-.396",
			key: "ql3yin"
		}],
		["path", {
			d: "M6 18a4 4 0 0 1-1.967-.516",
			key: "2e4loj"
		}],
		["path", {
			d: "M12 13h4",
			key: "1ku699"
		}],
		["path", {
			d: "M12 18h6a2 2 0 0 1 2 2v1",
			key: "105ag5"
		}],
		["path", {
			d: "M12 8h8",
			key: "1lhi5i"
		}],
		["path", {
			d: "M16 8V5a2 2 0 0 1 2-2",
			key: "u6izg6"
		}],
		["circle", {
			cx: "16",
			cy: "13",
			r: ".5",
			key: "ry7gng"
		}],
		["circle", {
			cx: "18",
			cy: "3",
			r: ".5",
			key: "1aiba7"
		}],
		["circle", {
			cx: "20",
			cy: "21",
			r: ".5",
			key: "yhc1fs"
		}],
		["circle", {
			cx: "20",
			cy: "8",
			r: ".5",
			key: "1e43v0"
		}]
	]);
	const BrainCog = createLucideIcon("brain-cog", [
		["path", {
			d: "m10.852 14.772-.383.923",
			key: "11vil6"
		}],
		["path", {
			d: "m10.852 9.228-.383-.923",
			key: "1fjppe"
		}],
		["path", {
			d: "m13.148 14.772.382.924",
			key: "je3va1"
		}],
		["path", {
			d: "m13.531 8.305-.383.923",
			key: "18epck"
		}],
		["path", {
			d: "m14.772 10.852.923-.383",
			key: "k9m8cz"
		}],
		["path", {
			d: "m14.772 13.148.923.383",
			key: "1xvhww"
		}],
		["path", {
			d: "M17.598 6.5A3 3 0 1 0 12 5a3 3 0 0 0-5.63-1.446 3 3 0 0 0-.368 1.571 4 4 0 0 0-2.525 5.771",
			key: "jcbbz1"
		}],
		["path", {
			d: "M17.998 5.125a4 4 0 0 1 2.525 5.771",
			key: "1kkn7e"
		}],
		["path", {
			d: "M19.505 10.294a4 4 0 0 1-1.5 7.706",
			key: "18bmuc"
		}],
		["path", {
			d: "M4.032 17.483A4 4 0 0 0 11.464 20c.18-.311.892-.311 1.072 0a4 4 0 0 0 7.432-2.516",
			key: "uozx0d"
		}],
		["path", {
			d: "M4.5 10.291A4 4 0 0 0 6 18",
			key: "whdemb"
		}],
		["path", {
			d: "M6.002 5.125a3 3 0 0 0 .4 1.375",
			key: "1kqy2g"
		}],
		["path", {
			d: "m9.228 10.852-.923-.383",
			key: "1wtb30"
		}],
		["path", {
			d: "m9.228 13.148-.923.383",
			key: "1a830x"
		}],
		["circle", {
			cx: "12",
			cy: "12",
			r: "3",
			key: "1v7zrd"
		}]
	]);
	const BrickWallFire = createLucideIcon("brick-wall-fire", [
		["path", {
			d: "M16 3v2.107",
			key: "gq8xun"
		}],
		["path", {
			d: "M17 9c1 3 2.5 3.5 3.5 4.5A5 5 0 0 1 22 17a5 5 0 0 1-10 0c0-.3 0-.6.1-.9a2 2 0 1 0 3.3-2C13 11.5 16 9 17 9",
			key: "1l2pih"
		}],
		["path", {
			d: "M21 8.274V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.938",
			key: "jrnqjp"
		}],
		["path", {
			d: "M3 15h5.253",
			key: "xqg7rb"
		}],
		["path", {
			d: "M3 9h8.228",
			key: "1ppb70"
		}],
		["path", {
			d: "M8 15v6",
			key: "1stoo3"
		}],
		["path", {
			d: "M8 3v6",
			key: "vlvjmk"
		}]
	]);
	const Brain = createLucideIcon("brain", [
		["path", {
			d: "M12 18V5",
			key: "adv99a"
		}],
		["path", {
			d: "M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4",
			key: "1e3is1"
		}],
		["path", {
			d: "M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5",
			key: "1gqd8o"
		}],
		["path", {
			d: "M17.997 5.125a4 4 0 0 1 2.526 5.77",
			key: "iwvgf7"
		}],
		["path", {
			d: "M18 18a4 4 0 0 0 2-7.464",
			key: "efp6ie"
		}],
		["path", {
			d: "M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517",
			key: "1gq6am"
		}],
		["path", {
			d: "M6 18a4 4 0 0 1-2-7.464",
			key: "k1g0md"
		}],
		["path", {
			d: "M6.003 5.125a4 4 0 0 0-2.526 5.77",
			key: "q97ue3"
		}]
	]);
	const BrickWallShield = createLucideIcon("brick-wall-shield", [
		["path", {
			d: "M12 9v1.258",
			key: "iwpddn"
		}],
		["path", {
			d: "M16 3v5.46",
			key: "d7ew98"
		}],
		["path", {
			d: "M21 9.118V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h5.75",
			key: "137t5x"
		}],
		["path", {
			d: "M22 17.5c0 2.499-1.75 3.749-3.83 4.474a.5.5 0 0 1-.335-.005c-2.085-.72-3.835-1.97-3.835-4.47V14a.5.5 0 0 1 .5-.499c1 0 2.25-.6 3.12-1.36a.6.6 0 0 1 .76-.001c.875.765 2.12 1.36 3.12 1.36a.5.5 0 0 1 .5.5z",
			key: "16j3tf"
		}],
		["path", {
			d: "M3 15h7",
			key: "1qldh6"
		}],
		["path", {
			d: "M3 9h12.142",
			key: "1yjd6m"
		}],
		["path", {
			d: "M8 15v6",
			key: "1stoo3"
		}],
		["path", {
			d: "M8 3v6",
			key: "vlvjmk"
		}]
	]);
	const BrickWall = createLucideIcon("brick-wall", [
		["rect", {
			width: "18",
			height: "18",
			x: "3",
			y: "3",
			rx: "2",
			key: "afitv7"
		}],
		["path", {
			d: "M12 9v6",
			key: "199k2o"
		}],
		["path", {
			d: "M16 15v6",
			key: "8rj2es"
		}],
		["path", {
			d: "M16 3v6",
			key: "1j6rpj"
		}],
		["path", {
			d: "M3 15h18",
			key: "5xshup"
		}],
		["path", {
			d: "M3 9h18",
			key: "1pudct"
		}],
		["path", {
			d: "M8 15v6",
			key: "1stoo3"
		}],
		["path", {
			d: "M8 3v6",
			key: "vlvjmk"
		}]
	]);
	const BriefcaseBusiness = createLucideIcon("briefcase-business", [
		["path", {
			d: "M12 12h.01",
			key: "1mp3jc"
		}],
		["path", {
			d: "M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2",
			key: "1ksdt3"
		}],
		["path", {
			d: "M22 13a18.15 18.15 0 0 1-20 0",
			key: "12hx5q"
		}],
		["rect", {
			width: "20",
			height: "14",
			x: "2",
			y: "6",
			rx: "2",
			key: "i6l2r4"
		}]
	]);
	const BriefcaseConveyorBelt = createLucideIcon("briefcase-conveyor-belt", [
		["path", {
			d: "M10 20v2",
			key: "1n8e1g"
		}],
		["path", {
			d: "M14 20v2",
			key: "1lq872"
		}],
		["path", {
			d: "M18 20v2",
			key: "10uadw"
		}],
		["path", {
			d: "M21 20H3",
			key: "kdqkdp"
		}],
		["path", {
			d: "M6 20v2",
			key: "a9bc87"
		}],
		["path", {
			d: "M8 16V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v12",
			key: "17n9tx"
		}],
		["rect", {
			x: "4",
			y: "6",
			width: "16",
			height: "10",
			rx: "2",
			key: "1097i5"
		}]
	]);
	const BriefcaseMedical = createLucideIcon("briefcase-medical", [
		["path", {
			d: "M12 11v4",
			key: "a6ujw6"
		}],
		["path", {
			d: "M14 13h-4",
			key: "1pl8zg"
		}],
		["path", {
			d: "M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2",
			key: "1ksdt3"
		}],
		["path", {
			d: "M18 6v14",
			key: "1mu4gy"
		}],
		["path", {
			d: "M6 6v14",
			key: "1s15cj"
		}],
		["rect", {
			width: "20",
			height: "14",
			x: "2",
			y: "6",
			rx: "2",
			key: "i6l2r4"
		}]
	]);
	const Briefcase = createLucideIcon("briefcase", [["path", {
		d: "M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16",
		key: "jecpp"
	}], ["rect", {
		width: "20",
		height: "14",
		x: "2",
		y: "6",
		rx: "2",
		key: "i6l2r4"
	}]]);
	const BringToFront = createLucideIcon("bring-to-front", [
		["rect", {
			x: "8",
			y: "8",
			width: "8",
			height: "8",
			rx: "2",
			key: "yj20xf"
		}],
		["path", {
			d: "M4 10a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2",
			key: "1ltk23"
		}],
		["path", {
			d: "M14 20a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2",
			key: "1q24h9"
		}]
	]);
	const BrushCleaning = createLucideIcon("brush-cleaning", [
		["path", {
			d: "m16 22-1-4",
			key: "1ow2iv"
		}],
		["path", {
			d: "M19 13.99a1 1 0 0 0 1-1V12a2 2 0 0 0-2-2h-3a1 1 0 0 1-1-1V4a2 2 0 0 0-4 0v5a1 1 0 0 1-1 1H6a2 2 0 0 0-2 2v.99a1 1 0 0 0 1 1",
			key: "iw8jdu"
		}],
		["path", {
			d: "M5 14h14l1.973 6.767A1 1 0 0 1 20 22H4a1 1 0 0 1-.973-1.233z",
			key: "1soew8"
		}],
		["path", {
			d: "m8 22 1-4",
			key: "s3unb"
		}]
	]);
	const Brush = createLucideIcon("brush", [
		["path", {
			d: "m11 10 3 3",
			key: "fzmg1i"
		}],
		["path", {
			d: "M6.5 21A3.5 3.5 0 1 0 3 17.5a2.62 2.62 0 0 1-.708 1.792A1 1 0 0 0 3 21z",
			key: "p4q2r7"
		}],
		["path", {
			d: "M9.969 17.031 21.378 5.624a1 1 0 0 0-3.002-3.002L6.967 14.031",
			key: "wy6l02"
		}]
	]);
	const Bubbles = createLucideIcon("bubbles", [
		["path", {
			d: "M7.2 14.8a2 2 0 0 1 2 2",
			key: "1tw9gg"
		}],
		["circle", {
			cx: "18.5",
			cy: "8.5",
			r: "3.5",
			key: "1wadoa"
		}],
		["circle", {
			cx: "7.5",
			cy: "16.5",
			r: "5.5",
			key: "6mdt3g"
		}],
		["circle", {
			cx: "7.5",
			cy: "4.5",
			r: "2.5",
			key: "637s54"
		}]
	]);
	const BugOff = createLucideIcon("bug-off", [
		["path", {
			d: "M12 20v-8",
			key: "i3yub9"
		}],
		["path", {
			d: "M14.12 3.88 16 2",
			key: "qol33r"
		}],
		["path", {
			d: "M15 7.13V6a3 3 0 0 0-5.14-2.1L8 2",
			key: "vl8zik"
		}],
		["path", {
			d: "M18 12.34V11a4 4 0 0 0-4-4h-1.3",
			key: "sz915m"
		}],
		["path", {
			d: "m2 2 20 20",
			key: "1ooewy"
		}],
		["path", {
			d: "M21 5a4 4 0 0 1-3.55 3.97",
			key: "5cxbf6"
		}],
		["path", {
			d: "M22 13h-3.34",
			key: "1y15gv"
		}],
		["path", {
			d: "M3 21a4 4 0 0 1 3.81-4",
			key: "1fjd4g"
		}],
		["path", {
			d: "M6 13H2",
			key: "82j7cp"
		}],
		["path", {
			d: "M7.7 7.7A4 4 0 0 0 6 11v3a6 6 0 0 0 11.13 3.13",
			key: "1njkjs"
		}]
	]);
	const BugPlay = createLucideIcon("bug-play", [
		["path", {
			d: "M10 19.655A6 6 0 0 1 6 14v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 3.97",
			key: "1gnv52"
		}],
		["path", {
			d: "M14 15.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997a1 1 0 0 1-1.517-.86z",
			key: "1weqy9"
		}],
		["path", {
			d: "M14.12 3.88 16 2",
			key: "qol33r"
		}],
		["path", {
			d: "M21 5a4 4 0 0 1-3.55 3.97",
			key: "5cxbf6"
		}],
		["path", {
			d: "M3 21a4 4 0 0 1 3.81-4",
			key: "1fjd4g"
		}],
		["path", {
			d: "M3 5a4 4 0 0 0 3.55 3.97",
			key: "1d7oge"
		}],
		["path", {
			d: "M6 13H2",
			key: "82j7cp"
		}],
		["path", {
			d: "m8 2 1.88 1.88",
			key: "fmnt4t"
		}],
		["path", {
			d: "M9 7.13V6a3 3 0 1 1 6 0v1.13",
			key: "1vgav8"
		}]
	]);
	const Bug = createLucideIcon("bug", [
		["path", {
			d: "M12 20v-9",
			key: "1qisl0"
		}],
		["path", {
			d: "M14 7a4 4 0 0 1 4 4v3a6 6 0 0 1-12 0v-3a4 4 0 0 1 4-4z",
			key: "uouzyp"
		}],
		["path", {
			d: "M14.12 3.88 16 2",
			key: "qol33r"
		}],
		["path", {
			d: "M21 21a4 4 0 0 0-3.81-4",
			key: "1b0z45"
		}],
		["path", {
			d: "M21 5a4 4 0 0 1-3.55 3.97",
			key: "5cxbf6"
		}],
		["path", {
			d: "M22 13h-4",
			key: "1jl80f"
		}],
		["path", {
			d: "M3 21a4 4 0 0 1 3.81-4",
			key: "1fjd4g"
		}],
		["path", {
			d: "M3 5a4 4 0 0 0 3.55 3.97",
			key: "1d7oge"
		}],
		["path", {
			d: "M6 13H2",
			key: "82j7cp"
		}],
		["path", {
			d: "m8 2 1.88 1.88",
			key: "fmnt4t"
		}],
		["path", {
			d: "M9 7.13V6a3 3 0 1 1 6 0v1.13",
			key: "1vgav8"
		}]
	]);
	const Building2 = createLucideIcon("building-2", [
		["path", {
			d: "M10 12h4",
			key: "a56b0p"
		}],
		["path", {
			d: "M10 8h4",
			key: "1sr2af"
		}],
		["path", {
			d: "M14 21v-3a2 2 0 0 0-4 0v3",
			key: "1rgiei"
		}],
		["path", {
			d: "M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2",
			key: "secmi2"
		}],
		["path", {
			d: "M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16",
			key: "16ra0t"
		}]
	]);
	const Building = createLucideIcon("building", [
		["path", {
			d: "M12 10h.01",
			key: "1nrarc"
		}],
		["path", {
			d: "M12 14h.01",
			key: "1etili"
		}],
		["path", {
			d: "M12 6h.01",
			key: "1vi96p"
		}],
		["path", {
			d: "M16 10h.01",
			key: "1m94wz"
		}],
		["path", {
			d: "M16 14h.01",
			key: "1gbofw"
		}],
		["path", {
			d: "M16 6h.01",
			key: "1x0f13"
		}],
		["path", {
			d: "M8 10h.01",
			key: "19clt8"
		}],
		["path", {
			d: "M8 14h.01",
			key: "6423bh"
		}],
		["path", {
			d: "M8 6h.01",
			key: "1dz90k"
		}],
		["path", {
			d: "M9 22v-3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3",
			key: "cabbwy"
		}],
		["rect", {
			x: "4",
			y: "2",
			width: "16",
			height: "20",
			rx: "2",
			key: "1uxh74"
		}]
	]);
	const BusFront = createLucideIcon("bus-front", [
		["path", {
			d: "M4 6 2 7",
			key: "1mqr15"
		}],
		["path", {
			d: "M10 6h4",
			key: "1itunk"
		}],
		["path", {
			d: "m22 7-2-1",
			key: "1umjhc"
		}],
		["rect", {
			width: "16",
			height: "16",
			x: "4",
			y: "3",
			rx: "2",
			key: "1wxw4b"
		}],
		["path", {
			d: "M4 11h16",
			key: "mpoxn0"
		}],
		["path", {
			d: "M8 15h.01",
			key: "a7atzg"
		}],
		["path", {
			d: "M16 15h.01",
			key: "rnfrdf"
		}],
		["path", {
			d: "M6 19v2",
			key: "1loha6"
		}],
		["path", {
			d: "M18 21v-2",
			key: "sqyl04"
		}]
	]);
	const Bus = createLucideIcon("bus", [
		["path", {
			d: "M8 6v6",
			key: "18i7km"
		}],
		["path", {
			d: "M15 6v6",
			key: "1sg6z9"
		}],
		["path", {
			d: "M2 12h19.6",
			key: "de5uta"
		}],
		["path", {
			d: "M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3",
			key: "1wwztk"
		}],
		["circle", {
			cx: "7",
			cy: "18",
			r: "2",
			key: "19iecd"
		}],
		["path", {
			d: "M9 18h5",
			key: "lrx6i"
		}],
		["circle", {
			cx: "16",
			cy: "18",
			r: "2",
			key: "1v4tcr"
		}]
	]);
	const CableCar = createLucideIcon("cable-car", [
		["path", {
			d: "M10 3h.01",
			key: "lbucoy"
		}],
		["path", {
			d: "M14 2h.01",
			key: "1k8aa1"
		}],
		["path", {
			d: "m2 9 20-5",
			key: "1kz0j5"
		}],
		["path", {
			d: "M12 12V6.5",
			key: "1vbrij"
		}],
		["rect", {
			width: "16",
			height: "10",
			x: "4",
			y: "12",
			rx: "3",
			key: "if91er"
		}],
		["path", {
			d: "M9 12v5",
			key: "3anwtq"
		}],
		["path", {
			d: "M15 12v5",
			key: "5xh3zn"
		}],
		["path", {
			d: "M4 17h16",
			key: "g4d7ey"
		}]
	]);
	const Cable = createLucideIcon("cable", [
		["path", {
			d: "M17 19a1 1 0 0 1-1-1v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a1 1 0 0 1-1 1z",
			key: "trhst0"
		}],
		["path", {
			d: "M17 21v-2",
			key: "ds4u3f"
		}],
		["path", {
			d: "M19 14V6.5a1 1 0 0 0-7 0v11a1 1 0 0 1-7 0V10",
			key: "1mo9zo"
		}],
		["path", {
			d: "M21 21v-2",
			key: "eo0ou"
		}],
		["path", {
			d: "M3 5V3",
			key: "1k5hjh"
		}],
		["path", {
			d: "M4 10a2 2 0 0 1-2-2V6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2a2 2 0 0 1-2 2z",
			key: "1dd30t"
		}],
		["path", {
			d: "M7 5V3",
			key: "1t1388"
		}]
	]);
	const CakeSlice = createLucideIcon("cake-slice", [
		["path", {
			d: "M16 13H3",
			key: "1wpj08"
		}],
		["path", {
			d: "M16 17H3",
			key: "3lvfcd"
		}],
		["path", {
			d: "m7.2 7.9-3.388 2.5A2 2 0 0 0 3 12.01V20a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-8.654c0-2-2.44-6.026-6.44-8.026a1 1 0 0 0-1.082.057L10.4 5.6",
			key: "1gmhf7"
		}],
		["circle", {
			cx: "9",
			cy: "7",
			r: "2",
			key: "1305pl"
		}]
	]);
	const Cake = createLucideIcon("cake", [
		["path", {
			d: "M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8",
			key: "1w3rig"
		}],
		["path", {
			d: "M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1",
			key: "n2jgmb"
		}],
		["path", {
			d: "M2 21h20",
			key: "1nyx9w"
		}],
		["path", {
			d: "M7 8v3",
			key: "1qtyvj"
		}],
		["path", {
			d: "M12 8v3",
			key: "hwp4zt"
		}],
		["path", {
			d: "M17 8v3",
			key: "1i6e5u"
		}],
		["path", {
			d: "M7 4h.01",
			key: "1bh4kh"
		}],
		["path", {
			d: "M12 4h.01",
			key: "1ujb9j"
		}],
		["path", {
			d: "M17 4h.01",
			key: "1upcoc"
		}]
	]);
	const Calculator = createLucideIcon("calculator", [
		["rect", {
			width: "16",
			height: "20",
			x: "4",
			y: "2",
			rx: "2",
			key: "1nb95v"
		}],
		["line", {
			x1: "8",
			x2: "16",
			y1: "6",
			y2: "6",
			key: "x4nwl0"
		}],
		["line", {
			x1: "16",
			x2: "16",
			y1: "14",
			y2: "18",
			key: "wjye3r"
		}],
		["path", {
			d: "M16 10h.01",
			key: "1m94wz"
		}],
		["path", {
			d: "M12 10h.01",
			key: "1nrarc"
		}],
		["path", {
			d: "M8 10h.01",
			key: "19clt8"
		}],
		["path", {
			d: "M12 14h.01",
			key: "1etili"
		}],
		["path", {
			d: "M8 14h.01",
			key: "6423bh"
		}],
		["path", {
			d: "M12 18h.01",
			key: "mhygvu"
		}],
		["path", {
			d: "M8 18h.01",
			key: "lrp35t"
		}]
	]);
	const Calendar1 = createLucideIcon("calendar-1", [
		["path", {
			d: "M11 14h1v4",
			key: "fy54vd"
		}],
		["path", {
			d: "M16 2v4",
			key: "4m81vk"
		}],
		["path", {
			d: "M3 10h18",
			key: "8toen8"
		}],
		["path", {
			d: "M8 2v4",
			key: "1cmpym"
		}],
		["rect", {
			x: "3",
			y: "4",
			width: "18",
			height: "18",
			rx: "2",
			key: "12vinp"
		}]
	]);
	const CalendarArrowDown = createLucideIcon("calendar-arrow-down", [
		["path", {
			d: "m14 18 4 4 4-4",
			key: "1waygx"
		}],
		["path", {
			d: "M16 2v4",
			key: "4m81vk"
		}],
		["path", {
			d: "M18 14v8",
			key: "irew45"
		}],
		["path", {
			d: "M21 11.354V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7.343",
			key: "bse4f3"
		}],
		["path", {
			d: "M3 10h18",
			key: "8toen8"
		}],
		["path", {
			d: "M8 2v4",
			key: "1cmpym"
		}]
	]);
	const CalendarArrowUp = createLucideIcon("calendar-arrow-up", [
		["path", {
			d: "m14 18 4-4 4 4",
			key: "ftkppy"
		}],
		["path", {
			d: "M16 2v4",
			key: "4m81vk"
		}],
		["path", {
			d: "M18 22v-8",
			key: "su0gjh"
		}],
		["path", {
			d: "M21 11.343V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h9",
			key: "1exg90"
		}],
		["path", {
			d: "M3 10h18",
			key: "8toen8"
		}],
		["path", {
			d: "M8 2v4",
			key: "1cmpym"
		}]
	]);
	const CalendarCheck2 = createLucideIcon("calendar-check-2", [
		["path", {
			d: "M8 2v4",
			key: "1cmpym"
		}],
		["path", {
			d: "M16 2v4",
			key: "4m81vk"
		}],
		["path", {
			d: "M21 14V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8",
			key: "bce9hv"
		}],
		["path", {
			d: "M3 10h18",
			key: "8toen8"
		}],
		["path", {
			d: "m16 20 2 2 4-4",
			key: "13tcca"
		}]
	]);
	const CalendarCheck = createLucideIcon("calendar-check", [
		["path", {
			d: "M8 2v4",
			key: "1cmpym"
		}],
		["path", {
			d: "M16 2v4",
			key: "4m81vk"
		}],
		["rect", {
			width: "18",
			height: "18",
			x: "3",
			y: "4",
			rx: "2",
			key: "1hopcy"
		}],
		["path", {
			d: "M3 10h18",
			key: "8toen8"
		}],
		["path", {
			d: "m9 16 2 2 4-4",
			key: "19s6y9"
		}]
	]);
	const CalendarClock = createLucideIcon("calendar-clock", [
		["path", {
			d: "M16 14v2.2l1.6 1",
			key: "fo4ql5"
		}],
		["path", {
			d: "M16 2v4",
			key: "4m81vk"
		}],
		["path", {
			d: "M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5",
			key: "1osxxc"
		}],
		["path", {
			d: "M3 10h5",
			key: "r794hk"
		}],
		["path", {
			d: "M8 2v4",
			key: "1cmpym"
		}],
		["circle", {
			cx: "16",
			cy: "16",
			r: "6",
			key: "qoo3c4"
		}]
	]);
	const CalendarCog = createLucideIcon("calendar-cog", [
		["path", {
			d: "m15.228 16.852-.923-.383",
			key: "npixar"
		}],
		["path", {
			d: "m15.228 19.148-.923.383",
			key: "51cr3n"
		}],
		["path", {
			d: "M16 2v4",
			key: "4m81vk"
		}],
		["path", {
			d: "m16.47 14.305.382.923",
			key: "obybxd"
		}],
		["path", {
			d: "m16.852 20.772-.383.924",
			key: "dpfhf9"
		}],
		["path", {
			d: "m19.148 15.228.383-.923",
			key: "1reyyz"
		}],
		["path", {
			d: "m19.53 21.696-.382-.924",
			key: "1goivc"
		}],
		["path", {
			d: "m20.772 16.852.924-.383",
			key: "htqkph"
		}],
		["path", {
			d: "m20.772 19.148.924.383",
			key: "9w9pjp"
		}],
		["path", {
			d: "M21 10.592V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6",
			key: "1pvbig"
		}],
		["path", {
			d: "M3 10h18",
			key: "8toen8"
		}],
		["path", {
			d: "M8 2v4",
			key: "1cmpym"
		}],
		["circle", {
			cx: "18",
			cy: "18",
			r: "3",
			key: "1xkwt0"
		}]
	]);
	const CalendarDays = createLucideIcon("calendar-days", [
		["path", {
			d: "M8 2v4",
			key: "1cmpym"
		}],
		["path", {
			d: "M16 2v4",
			key: "4m81vk"
		}],
		["rect", {
			width: "18",
			height: "18",
			x: "3",
			y: "4",
			rx: "2",
			key: "1hopcy"
		}],
		["path", {
			d: "M3 10h18",
			key: "8toen8"
		}],
		["path", {
			d: "M8 14h.01",
			key: "6423bh"
		}],
		["path", {
			d: "M12 14h.01",
			key: "1etili"
		}],
		["path", {
			d: "M16 14h.01",
			key: "1gbofw"
		}],
		["path", {
			d: "M8 18h.01",
			key: "lrp35t"
		}],
		["path", {
			d: "M12 18h.01",
			key: "mhygvu"
		}],
		["path", {
			d: "M16 18h.01",
			key: "kzsmim"
		}]
	]);
	const CalendarFold = createLucideIcon("calendar-fold", [
		["path", {
			d: "M8 2v4",
			key: "1cmpym"
		}],
		["path", {
			d: "M16 2v4",
			key: "4m81vk"
		}],
		["path", {
			d: "M21 17V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11Z",
			key: "kg77oy"
		}],
		["path", {
			d: "M3 10h18",
			key: "8toen8"
		}],
		["path", {
			d: "M15 22v-4a2 2 0 0 1 2-2h4",
			key: "1gnbqr"
		}]
	]);
	const CalendarHeart = createLucideIcon("calendar-heart", [
		["path", {
			d: "M12.127 22H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5.125",
			key: "vxdnp4"
		}],
		["path", {
			d: "M14.62 18.8A2.25 2.25 0 1 1 18 15.836a2.25 2.25 0 1 1 3.38 2.966l-2.626 2.856a.998.998 0 0 1-1.507 0z",
			key: "15cy7q"
		}],
		["path", {
			d: "M16 2v4",
			key: "4m81vk"
		}],
		["path", {
			d: "M3 10h18",
			key: "8toen8"
		}],
		["path", {
			d: "M8 2v4",
			key: "1cmpym"
		}]
	]);
	const CalendarMinus2 = createLucideIcon("calendar-minus-2", [
		["path", {
			d: "M8 2v4",
			key: "1cmpym"
		}],
		["path", {
			d: "M16 2v4",
			key: "4m81vk"
		}],
		["rect", {
			width: "18",
			height: "18",
			x: "3",
			y: "4",
			rx: "2",
			key: "1hopcy"
		}],
		["path", {
			d: "M3 10h18",
			key: "8toen8"
		}],
		["path", {
			d: "M10 16h4",
			key: "17e571"
		}]
	]);
	const CalendarMinus = createLucideIcon("calendar-minus", [
		["path", {
			d: "M16 19h6",
			key: "xwg31i"
		}],
		["path", {
			d: "M16 2v4",
			key: "4m81vk"
		}],
		["path", {
			d: "M21 15V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8.5",
			key: "1scpom"
		}],
		["path", {
			d: "M3 10h18",
			key: "8toen8"
		}],
		["path", {
			d: "M8 2v4",
			key: "1cmpym"
		}]
	]);
	const CalendarOff = createLucideIcon("calendar-off", [
		["path", {
			d: "M4.2 4.2A2 2 0 0 0 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 1.82-1.18",
			key: "16swn3"
		}],
		["path", {
			d: "M21 15.5V6a2 2 0 0 0-2-2H9.5",
			key: "yhw86o"
		}],
		["path", {
			d: "M16 2v4",
			key: "4m81vk"
		}],
		["path", {
			d: "M3 10h7",
			key: "1wap6i"
		}],
		["path", {
			d: "M21 10h-5.5",
			key: "quycpq"
		}],
		["path", {
			d: "m2 2 20 20",
			key: "1ooewy"
		}]
	]);
	const CalendarPlus2 = createLucideIcon("calendar-plus-2", [
		["path", {
			d: "M8 2v4",
			key: "1cmpym"
		}],
		["path", {
			d: "M16 2v4",
			key: "4m81vk"
		}],
		["rect", {
			width: "18",
			height: "18",
			x: "3",
			y: "4",
			rx: "2",
			key: "1hopcy"
		}],
		["path", {
			d: "M3 10h18",
			key: "8toen8"
		}],
		["path", {
			d: "M10 16h4",
			key: "17e571"
		}],
		["path", {
			d: "M12 14v4",
			key: "1thi36"
		}]
	]);
	const CalendarPlus = createLucideIcon("calendar-plus", [
		["path", {
			d: "M16 19h6",
			key: "xwg31i"
		}],
		["path", {
			d: "M16 2v4",
			key: "4m81vk"
		}],
		["path", {
			d: "M19 16v6",
			key: "tddt3s"
		}],
		["path", {
			d: "M21 12.598V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8.5",
			key: "1glfrc"
		}],
		["path", {
			d: "M3 10h18",
			key: "8toen8"
		}],
		["path", {
			d: "M8 2v4",
			key: "1cmpym"
		}]
	]);
	const CalendarRange = createLucideIcon("calendar-range", [
		["rect", {
			width: "18",
			height: "18",
			x: "3",
			y: "4",
			rx: "2",
			key: "1hopcy"
		}],
		["path", {
			d: "M16 2v4",
			key: "4m81vk"
		}],
		["path", {
			d: "M3 10h18",
			key: "8toen8"
		}],
		["path", {
			d: "M8 2v4",
			key: "1cmpym"
		}],
		["path", {
			d: "M17 14h-6",
			key: "bkmgh3"
		}],
		["path", {
			d: "M13 18H7",
			key: "bb0bb7"
		}],
		["path", {
			d: "M7 14h.01",
			key: "1qa3f1"
		}],
		["path", {
			d: "M17 18h.01",
			key: "1bdyru"
		}]
	]);
	const CalendarSearch = createLucideIcon("calendar-search", [
		["path", {
			d: "M16 2v4",
			key: "4m81vk"
		}],
		["path", {
			d: "M21 11.75V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7.25",
			key: "1jrsq6"
		}],
		["path", {
			d: "m22 22-1.875-1.875",
			key: "13zax7"
		}],
		["path", {
			d: "M3 10h18",
			key: "8toen8"
		}],
		["path", {
			d: "M8 2v4",
			key: "1cmpym"
		}],
		["circle", {
			cx: "18",
			cy: "18",
			r: "3",
			key: "1xkwt0"
		}]
	]);
	const CalendarSync = createLucideIcon("calendar-sync", [
		["path", {
			d: "M11 10v4h4",
			key: "172dkj"
		}],
		["path", {
			d: "m11 14 1.535-1.605a5 5 0 0 1 8 1.5",
			key: "vu0qm5"
		}],
		["path", {
			d: "M16 2v4",
			key: "4m81vk"
		}],
		["path", {
			d: "m21 18-1.535 1.605a5 5 0 0 1-8-1.5",
			key: "1qgeyt"
		}],
		["path", {
			d: "M21 22v-4h-4",
			key: "hrummi"
		}],
		["path", {
			d: "M21 8.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h4.3",
			key: "mctw84"
		}],
		["path", {
			d: "M3 10h4",
			key: "1el30a"
		}],
		["path", {
			d: "M8 2v4",
			key: "1cmpym"
		}]
	]);
	const CalendarX2 = createLucideIcon("calendar-x-2", [
		["path", {
			d: "M8 2v4",
			key: "1cmpym"
		}],
		["path", {
			d: "M16 2v4",
			key: "4m81vk"
		}],
		["path", {
			d: "M21 13V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8",
			key: "3spt84"
		}],
		["path", {
			d: "M3 10h18",
			key: "8toen8"
		}],
		["path", {
			d: "m17 22 5-5",
			key: "1k6ppv"
		}],
		["path", {
			d: "m17 17 5 5",
			key: "p7ous7"
		}]
	]);
	const CalendarX = createLucideIcon("calendar-x", [
		["path", {
			d: "M8 2v4",
			key: "1cmpym"
		}],
		["path", {
			d: "M16 2v4",
			key: "4m81vk"
		}],
		["rect", {
			width: "18",
			height: "18",
			x: "3",
			y: "4",
			rx: "2",
			key: "1hopcy"
		}],
		["path", {
			d: "M3 10h18",
			key: "8toen8"
		}],
		["path", {
			d: "m14 14-4 4",
			key: "rymu2i"
		}],
		["path", {
			d: "m10 14 4 4",
			key: "3sz06r"
		}]
	]);
	const Calendar = createLucideIcon("calendar", [
		["path", {
			d: "M8 2v4",
			key: "1cmpym"
		}],
		["path", {
			d: "M16 2v4",
			key: "4m81vk"
		}],
		["rect", {
			width: "18",
			height: "18",
			x: "3",
			y: "4",
			rx: "2",
			key: "1hopcy"
		}],
		["path", {
			d: "M3 10h18",
			key: "8toen8"
		}]
	]);
	const CameraOff = createLucideIcon("camera-off", [
		["path", {
			d: "M14.564 14.558a3 3 0 1 1-4.122-4.121",
			key: "1rnrzw"
		}],
		["path", {
			d: "m2 2 20 20",
			key: "1ooewy"
		}],
		["path", {
			d: "M20 20H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 .819-.175",
			key: "1x3arw"
		}],
		["path", {
			d: "M9.695 4.024A2 2 0 0 1 10.004 4h3.993a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v7.344",
			key: "1i84u0"
		}]
	]);
	const Camera = createLucideIcon("camera", [["path", {
		d: "M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z",
		key: "18u6gg"
	}], ["circle", {
		cx: "12",
		cy: "13",
		r: "3",
		key: "1vg3eu"
	}]]);
	const CandyCane = createLucideIcon("candy-cane", [
		["path", {
			d: "M5.7 21a2 2 0 0 1-3.5-2l8.6-14a6 6 0 0 1 10.4 6 2 2 0 1 1-3.464-2 2 2 0 1 0-3.464-2Z",
			key: "isaq8g"
		}],
		["path", {
			d: "M17.75 7 15 2.1",
			key: "12x7e8"
		}],
		["path", {
			d: "M10.9 4.8 13 9",
			key: "100a87"
		}],
		["path", {
			d: "m7.9 9.7 2 4.4",
			key: "ntfhaj"
		}],
		["path", {
			d: "M4.9 14.7 7 18.9",
			key: "1x43jy"
		}]
	]);
	const CandyOff = createLucideIcon("candy-off", [
		["path", {
			d: "M10 10v7.9",
			key: "m8g9tt"
		}],
		["path", {
			d: "M11.802 6.145a5 5 0 0 1 6.053 6.053",
			key: "dn87i3"
		}],
		["path", {
			d: "M14 6.1v2.243",
			key: "1kzysn"
		}],
		["path", {
			d: "m15.5 15.571-.964.964a5 5 0 0 1-7.071 0 5 5 0 0 1 0-7.07l.964-.965",
			key: "3sxy18"
		}],
		["path", {
			d: "M16 7V3a1 1 0 0 1 1.707-.707 2.5 2.5 0 0 0 2.152.717 1 1 0 0 1 1.131 1.131 2.5 2.5 0 0 0 .717 2.152A1 1 0 0 1 21 8h-4",
			key: "gpb6xx"
		}],
		["path", {
			d: "m2 2 20 20",
			key: "1ooewy"
		}],
		["path", {
			d: "M8 17v4a1 1 0 0 1-1.707.707 2.5 2.5 0 0 0-2.152-.717 1 1 0 0 1-1.131-1.131 2.5 2.5 0 0 0-.717-2.152A1 1 0 0 1 3 16h4",
			key: "qexcha"
		}]
	]);
	const Candy = createLucideIcon("candy", [
		["path", {
			d: "M10 7v10.9",
			key: "1gynux"
		}],
		["path", {
			d: "M14 6.1V17",
			key: "116kdf"
		}],
		["path", {
			d: "M16 7V3a1 1 0 0 1 1.707-.707 2.5 2.5 0 0 0 2.152.717 1 1 0 0 1 1.131 1.131 2.5 2.5 0 0 0 .717 2.152A1 1 0 0 1 21 8h-4",
			key: "gpb6xx"
		}],
		["path", {
			d: "M16.536 7.465a5 5 0 0 0-7.072 0l-2 2a5 5 0 0 0 0 7.07 5 5 0 0 0 7.072 0l2-2a5 5 0 0 0 0-7.07",
			key: "1tsln4"
		}],
		["path", {
			d: "M8 17v4a1 1 0 0 1-1.707.707 2.5 2.5 0 0 0-2.152-.717 1 1 0 0 1-1.131-1.131 2.5 2.5 0 0 0-.717-2.152A1 1 0 0 1 3 16h4",
			key: "qexcha"
		}]
	]);
	const Cannabis = createLucideIcon("cannabis", [["path", {
		d: "M12 22v-4",
		key: "1utk9m"
	}], ["path", {
		d: "M7 12c-1.5 0-4.5 1.5-5 3 3.5 1.5 6 1 6 1-1.5 1.5-2 3.5-2 5 2.5 0 4.5-1.5 6-3 1.5 1.5 3.5 3 6 3 0-1.5-.5-3.5-2-5 0 0 2.5.5 6-1-.5-1.5-3.5-3-5-3 1.5-1 4-4 4-6-2.5 0-5.5 1.5-7 3 0-2.5-.5-5-2-7-1.5 2-2 4.5-2 7-1.5-1.5-4.5-3-7-3 0 2 2.5 5 4 6",
		key: "1mezod"
	}]]);
	const CaptionsOff = createLucideIcon("captions-off", [
		["path", {
			d: "M10.5 5H19a2 2 0 0 1 2 2v8.5",
			key: "jqtk4d"
		}],
		["path", {
			d: "M17 11h-.5",
			key: "1961ue"
		}],
		["path", {
			d: "M19 19H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2",
			key: "1keqsi"
		}],
		["path", {
			d: "m2 2 20 20",
			key: "1ooewy"
		}],
		["path", {
			d: "M7 11h4",
			key: "1o1z6v"
		}],
		["path", {
			d: "M7 15h2.5",
			key: "1ina1g"
		}]
	]);
	const Captions = createLucideIcon("captions", [["rect", {
		width: "18",
		height: "14",
		x: "3",
		y: "5",
		rx: "2",
		ry: "2",
		key: "12ruh7"
	}], ["path", {
		d: "M7 15h4M15 15h2M7 11h2M13 11h4",
		key: "1ueiar"
	}]]);
	const CarFront = createLucideIcon("car-front", [
		["path", {
			d: "m21 8-2 2-1.5-3.7A2 2 0 0 0 15.646 5H8.4a2 2 0 0 0-1.903 1.257L5 10 3 8",
			key: "1imjwt"
		}],
		["path", {
			d: "M7 14h.01",
			key: "1qa3f1"
		}],
		["path", {
			d: "M17 14h.01",
			key: "7oqj8z"
		}],
		["rect", {
			width: "18",
			height: "8",
			x: "3",
			y: "10",
			rx: "2",
			key: "a7itu8"
		}],
		["path", {
			d: "M5 18v2",
			key: "ppbyun"
		}],
		["path", {
			d: "M19 18v2",
			key: "gy7782"
		}]
	]);
	const CarTaxiFront = createLucideIcon("car-taxi-front", [
		["path", {
			d: "M10 2h4",
			key: "n1abiw"
		}],
		["path", {
			d: "m21 8-2 2-1.5-3.7A2 2 0 0 0 15.646 5H8.4a2 2 0 0 0-1.903 1.257L5 10 3 8",
			key: "1imjwt"
		}],
		["path", {
			d: "M7 14h.01",
			key: "1qa3f1"
		}],
		["path", {
			d: "M17 14h.01",
			key: "7oqj8z"
		}],
		["rect", {
			width: "18",
			height: "8",
			x: "3",
			y: "10",
			rx: "2",
			key: "a7itu8"
		}],
		["path", {
			d: "M5 18v2",
			key: "ppbyun"
		}],
		["path", {
			d: "M19 18v2",
			key: "gy7782"
		}]
	]);
	const Car = createLucideIcon("car", [
		["path", {
			d: "M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2",
			key: "5owen"
		}],
		["circle", {
			cx: "7",
			cy: "17",
			r: "2",
			key: "u2ysq9"
		}],
		["path", {
			d: "M9 17h6",
			key: "r8uit2"
		}],
		["circle", {
			cx: "17",
			cy: "17",
			r: "2",
			key: "axvx0g"
		}]
	]);
	const Caravan = createLucideIcon("caravan", [
		["path", {
			d: "M18 19V9a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v8a2 2 0 0 0 2 2h2",
			key: "19jm3t"
		}],
		["path", {
			d: "M2 9h3a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2",
			key: "13hakp"
		}],
		["path", {
			d: "M22 17v1a1 1 0 0 1-1 1H10v-9a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v9",
			key: "1crci8"
		}],
		["circle", {
			cx: "8",
			cy: "19",
			r: "2",
			key: "t8fc5s"
		}]
	]);
	const CardSim = createLucideIcon("card-sim", [
		["path", {
			d: "M12 14v4",
			key: "1thi36"
		}],
		["path", {
			d: "M14.172 2a2 2 0 0 1 1.414.586l3.828 3.828A2 2 0 0 1 20 7.828V20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z",
			key: "1o66bk"
		}],
		["path", {
			d: "M8 14h8",
			key: "1fgep2"
		}],
		["rect", {
			x: "8",
			y: "10",
			width: "8",
			height: "8",
			rx: "1",
			key: "1aonk6"
		}]
	]);
	const Carrot = createLucideIcon("carrot", [
		["path", {
			d: "M2.27 21.7s9.87-3.5 12.73-6.36a4.5 4.5 0 0 0-6.36-6.37C5.77 11.84 2.27 21.7 2.27 21.7zM8.64 14l-2.05-2.04M15.34 15l-2.46-2.46",
			key: "rfqxbe"
		}],
		["path", {
			d: "M22 9s-1.33-2-3.5-2C16.86 7 15 9 15 9s1.33 2 3.5 2S22 9 22 9z",
			key: "6b25w4"
		}],
		["path", {
			d: "M15 2s-2 1.33-2 3.5S15 9 15 9s2-1.84 2-3.5C17 3.33 15 2 15 2z",
			key: "fn65lo"
		}]
	]);
	const CaseLower = createLucideIcon("case-lower", [
		["path", {
			d: "M10 9v7",
			key: "ylp826"
		}],
		["path", {
			d: "M14 6v10",
			key: "1jy4vg"
		}],
		["circle", {
			cx: "17.5",
			cy: "12.5",
			r: "3.5",
			key: "1a9481"
		}],
		["circle", {
			cx: "6.5",
			cy: "12.5",
			r: "3.5",
			key: "2jlv1r"
		}]
	]);
	const CaseSensitive = createLucideIcon("case-sensitive", [
		["path", {
			d: "m2 16 4.039-9.69a.5.5 0 0 1 .923 0L11 16",
			key: "d5nyq2"
		}],
		["path", {
			d: "M22 9v7",
			key: "pvm9v3"
		}],
		["path", {
			d: "M3.304 13h6.392",
			key: "1q3zxz"
		}],
		["circle", {
			cx: "18.5",
			cy: "12.5",
			r: "3.5",
			key: "z97x68"
		}]
	]);
	const CaseUpper = createLucideIcon("case-upper", [
		["path", {
			d: "M15 11h4.5a1 1 0 0 1 0 5h-4a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h3a1 1 0 0 1 0 5",
			key: "nxs35"
		}],
		["path", {
			d: "m2 16 4.039-9.69a.5.5 0 0 1 .923 0L11 16",
			key: "d5nyq2"
		}],
		["path", {
			d: "M3.304 13h6.392",
			key: "1q3zxz"
		}]
	]);
	const CassetteTape = createLucideIcon("cassette-tape", [
		["rect", {
			width: "20",
			height: "16",
			x: "2",
			y: "4",
			rx: "2",
			key: "18n3k1"
		}],
		["circle", {
			cx: "8",
			cy: "10",
			r: "2",
			key: "1xl4ub"
		}],
		["path", {
			d: "M8 12h8",
			key: "1wcyev"
		}],
		["circle", {
			cx: "16",
			cy: "10",
			r: "2",
			key: "r14t7q"
		}],
		["path", {
			d: "m6 20 .7-2.9A1.4 1.4 0 0 1 8.1 16h7.8a1.4 1.4 0 0 1 1.4 1l.7 3",
			key: "l01ucn"
		}]
	]);
	const Cast = createLucideIcon("cast", [
		["path", {
			d: "M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6",
			key: "3zrzxg"
		}],
		["path", {
			d: "M2 12a9 9 0 0 1 8 8",
			key: "g6cvee"
		}],
		["path", {
			d: "M2 16a5 5 0 0 1 4 4",
			key: "1y1dii"
		}],
		["line", {
			x1: "2",
			x2: "2.01",
			y1: "20",
			y2: "20",
			key: "xu2jvo"
		}]
	]);
	const Castle = createLucideIcon("castle", [
		["path", {
			d: "M10 5V3",
			key: "1y54qe"
		}],
		["path", {
			d: "M14 5V3",
			key: "m6isi"
		}],
		["path", {
			d: "M15 21v-3a3 3 0 0 0-6 0v3",
			key: "lbp5hj"
		}],
		["path", {
			d: "M18 3v8",
			key: "2ollhf"
		}],
		["path", {
			d: "M18 5H6",
			key: "98imr9"
		}],
		["path", {
			d: "M22 11H2",
			key: "1lmjae"
		}],
		["path", {
			d: "M22 9v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9",
			key: "1rly83"
		}],
		["path", {
			d: "M6 3v8",
			key: "csox7g"
		}]
	]);
	const Cat = createLucideIcon("cat", [
		["path", {
			d: "M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0 1 12 5Z",
			key: "x6xyqk"
		}],
		["path", {
			d: "M8 14v.5",
			key: "1nzgdb"
		}],
		["path", {
			d: "M16 14v.5",
			key: "1lajdz"
		}],
		["path", {
			d: "M11.25 16.25h1.5L12 17l-.75-.75Z",
			key: "12kq1m"
		}]
	]);
	const Cctv = createLucideIcon("cctv", [
		["path", {
			d: "M16.75 12h3.632a1 1 0 0 1 .894 1.447l-2.034 4.069a1 1 0 0 1-1.708.134l-2.124-2.97",
			key: "ir91b5"
		}],
		["path", {
			d: "M17.106 9.053a1 1 0 0 1 .447 1.341l-3.106 6.211a1 1 0 0 1-1.342.447L3.61 12.3a2.92 2.92 0 0 1-1.3-3.91L3.69 5.6a2.92 2.92 0 0 1 3.92-1.3z",
			key: "jlp8i1"
		}],
		["path", {
			d: "M2 19h3.76a2 2 0 0 0 1.8-1.1L9 15",
			key: "19bib8"
		}],
		["path", {
			d: "M2 21v-4",
			key: "l40lih"
		}],
		["path", {
			d: "M7 9h.01",
			key: "19b3jx"
		}]
	]);
	const ChartArea = createLucideIcon("chart-area", [["path", {
		d: "M3 3v16a2 2 0 0 0 2 2h16",
		key: "c24i48"
	}], ["path", {
		d: "M7 11.207a.5.5 0 0 1 .146-.353l2-2a.5.5 0 0 1 .708 0l3.292 3.292a.5.5 0 0 0 .708 0l4.292-4.292a.5.5 0 0 1 .854.353V16a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1z",
		key: "q0gr47"
	}]]);
	const ChartBarBig = createLucideIcon("chart-bar-big", [
		["path", {
			d: "M3 3v16a2 2 0 0 0 2 2h16",
			key: "c24i48"
		}],
		["rect", {
			x: "7",
			y: "13",
			width: "9",
			height: "4",
			rx: "1",
			key: "1iip1u"
		}],
		["rect", {
			x: "7",
			y: "5",
			width: "12",
			height: "4",
			rx: "1",
			key: "1anskk"
		}]
	]);
	const ChartBarDecreasing = createLucideIcon("chart-bar-decreasing", [
		["path", {
			d: "M3 3v16a2 2 0 0 0 2 2h16",
			key: "c24i48"
		}],
		["path", {
			d: "M7 11h8",
			key: "1feolt"
		}],
		["path", {
			d: "M7 16h3",
			key: "ur6vzw"
		}],
		["path", {
			d: "M7 6h12",
			key: "sz5b0d"
		}]
	]);
	const ChartBarIncreasing = createLucideIcon("chart-bar-increasing", [
		["path", {
			d: "M3 3v16a2 2 0 0 0 2 2h16",
			key: "c24i48"
		}],
		["path", {
			d: "M7 11h8",
			key: "1feolt"
		}],
		["path", {
			d: "M7 16h12",
			key: "wsnu98"
		}],
		["path", {
			d: "M7 6h3",
			key: "w9rmul"
		}]
	]);
	const ChartBarStacked = createLucideIcon("chart-bar-stacked", [
		["path", {
			d: "M11 13v4",
			key: "vyy2rb"
		}],
		["path", {
			d: "M15 5v4",
			key: "1gx88a"
		}],
		["path", {
			d: "M3 3v16a2 2 0 0 0 2 2h16",
			key: "c24i48"
		}],
		["rect", {
			x: "7",
			y: "13",
			width: "9",
			height: "4",
			rx: "1",
			key: "1iip1u"
		}],
		["rect", {
			x: "7",
			y: "5",
			width: "12",
			height: "4",
			rx: "1",
			key: "1anskk"
		}]
	]);
	const ChartBar = createLucideIcon("chart-bar", [
		["path", {
			d: "M3 3v16a2 2 0 0 0 2 2h16",
			key: "c24i48"
		}],
		["path", {
			d: "M7 16h8",
			key: "srdodz"
		}],
		["path", {
			d: "M7 11h12",
			key: "127s9w"
		}],
		["path", {
			d: "M7 6h3",
			key: "w9rmul"
		}]
	]);
	const ChartCandlestick = createLucideIcon("chart-candlestick", [
		["path", {
			d: "M9 5v4",
			key: "14uxtq"
		}],
		["rect", {
			width: "4",
			height: "6",
			x: "7",
			y: "9",
			rx: "1",
			key: "f4fvz0"
		}],
		["path", {
			d: "M9 15v2",
			key: "r5rk32"
		}],
		["path", {
			d: "M17 3v2",
			key: "1l2re6"
		}],
		["rect", {
			width: "4",
			height: "8",
			x: "15",
			y: "5",
			rx: "1",
			key: "z38je5"
		}],
		["path", {
			d: "M17 13v3",
			key: "5l0wba"
		}],
		["path", {
			d: "M3 3v16a2 2 0 0 0 2 2h16",
			key: "c24i48"
		}]
	]);
	const ChartColumnBig = createLucideIcon("chart-column-big", [
		["path", {
			d: "M3 3v16a2 2 0 0 0 2 2h16",
			key: "c24i48"
		}],
		["rect", {
			x: "15",
			y: "5",
			width: "4",
			height: "12",
			rx: "1",
			key: "q8uenq"
		}],
		["rect", {
			x: "7",
			y: "8",
			width: "4",
			height: "9",
			rx: "1",
			key: "sr5ea"
		}]
	]);
	const ChartColumnDecreasing = createLucideIcon("chart-column-decreasing", [
		["path", {
			d: "M13 17V9",
			key: "1fwyjl"
		}],
		["path", {
			d: "M18 17v-3",
			key: "1sqioe"
		}],
		["path", {
			d: "M3 3v16a2 2 0 0 0 2 2h16",
			key: "c24i48"
		}],
		["path", {
			d: "M8 17V5",
			key: "1wzmnc"
		}]
	]);
	const ChartColumnIncreasing = createLucideIcon("chart-column-increasing", [
		["path", {
			d: "M13 17V9",
			key: "1fwyjl"
		}],
		["path", {
			d: "M18 17V5",
			key: "sfb6ij"
		}],
		["path", {
			d: "M3 3v16a2 2 0 0 0 2 2h16",
			key: "c24i48"
		}],
		["path", {
			d: "M8 17v-3",
			key: "17ska0"
		}]
	]);
	const ChartColumnStacked = createLucideIcon("chart-column-stacked", [
		["path", {
			d: "M11 13H7",
			key: "t0o9gq"
		}],
		["path", {
			d: "M19 9h-4",
			key: "rera1j"
		}],
		["path", {
			d: "M3 3v16a2 2 0 0 0 2 2h16",
			key: "c24i48"
		}],
		["rect", {
			x: "15",
			y: "5",
			width: "4",
			height: "12",
			rx: "1",
			key: "q8uenq"
		}],
		["rect", {
			x: "7",
			y: "8",
			width: "4",
			height: "9",
			rx: "1",
			key: "sr5ea"
		}]
	]);
	const ChartColumn = createLucideIcon("chart-column", [
		["path", {
			d: "M3 3v16a2 2 0 0 0 2 2h16",
			key: "c24i48"
		}],
		["path", {
			d: "M18 17V9",
			key: "2bz60n"
		}],
		["path", {
			d: "M13 17V5",
			key: "1frdt8"
		}],
		["path", {
			d: "M8 17v-3",
			key: "17ska0"
		}]
	]);
	const ChartGantt = createLucideIcon("chart-gantt", [
		["path", {
			d: "M10 6h8",
			key: "zvc2xc"
		}],
		["path", {
			d: "M12 16h6",
			key: "yi5mkt"
		}],
		["path", {
			d: "M3 3v16a2 2 0 0 0 2 2h16",
			key: "c24i48"
		}],
		["path", {
			d: "M8 11h7",
			key: "wz2hg0"
		}]
	]);
	const ChartLine = createLucideIcon("chart-line", [["path", {
		d: "M3 3v16a2 2 0 0 0 2 2h16",
		key: "c24i48"
	}], ["path", {
		d: "m19 9-5 5-4-4-3 3",
		key: "2osh9i"
	}]]);
	const ChartNetwork = createLucideIcon("chart-network", [
		["path", {
			d: "m13.11 7.664 1.78 2.672",
			key: "go2gg9"
		}],
		["path", {
			d: "m14.162 12.788-3.324 1.424",
			key: "11x848"
		}],
		["path", {
			d: "m20 4-6.06 1.515",
			key: "1wxxh7"
		}],
		["path", {
			d: "M3 3v16a2 2 0 0 0 2 2h16",
			key: "c24i48"
		}],
		["circle", {
			cx: "12",
			cy: "6",
			r: "2",
			key: "1jj5th"
		}],
		["circle", {
			cx: "16",
			cy: "12",
			r: "2",
			key: "4ma0v8"
		}],
		["circle", {
			cx: "9",
			cy: "15",
			r: "2",
			key: "lf2ghp"
		}]
	]);
	const ChartNoAxesColumnDecreasing = createLucideIcon("chart-no-axes-column-decreasing", [
		["path", {
			d: "M5 21V3",
			key: "clc1r8"
		}],
		["path", {
			d: "M12 21V9",
			key: "uvy0l4"
		}],
		["path", {
			d: "M19 21v-6",
			key: "tkawy9"
		}]
	]);
	const ChartNoAxesColumnIncreasing = createLucideIcon("chart-no-axes-column-increasing", [
		["path", {
			d: "M5 21v-6",
			key: "1hz6c0"
		}],
		["path", {
			d: "M12 21V9",
			key: "uvy0l4"
		}],
		["path", {
			d: "M19 21V3",
			key: "11j9sm"
		}]
	]);
	const ChartNoAxesColumn = createLucideIcon("chart-no-axes-column", [
		["path", {
			d: "M5 21v-6",
			key: "1hz6c0"
		}],
		["path", {
			d: "M12 21V3",
			key: "1lcnhd"
		}],
		["path", {
			d: "M19 21V9",
			key: "unv183"
		}]
	]);
	const ChartNoAxesCombined = createLucideIcon("chart-no-axes-combined", [
		["path", {
			d: "M12 16v5",
			key: "zza2cw"
		}],
		["path", {
			d: "M16 14v7",
			key: "1g90b9"
		}],
		["path", {
			d: "M20 10v11",
			key: "1iqoj0"
		}],
		["path", {
			d: "m22 3-8.646 8.646a.5.5 0 0 1-.708 0L9.354 8.354a.5.5 0 0 0-.707 0L2 15",
			key: "1fw8x9"
		}],
		["path", {
			d: "M4 18v3",
			key: "1yp0dc"
		}],
		["path", {
			d: "M8 14v7",
			key: "n3cwzv"
		}]
	]);
	const ChartNoAxesGantt = createLucideIcon("chart-no-axes-gantt", [
		["path", {
			d: "M6 5h12",
			key: "fvfigv"
		}],
		["path", {
			d: "M4 12h10",
			key: "oujl3d"
		}],
		["path", {
			d: "M12 19h8",
			key: "baeox8"
		}]
	]);
	const ChartPie = createLucideIcon("chart-pie", [["path", {
		d: "M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z",
		key: "pzmjnu"
	}], ["path", {
		d: "M21.21 15.89A10 10 0 1 1 8 2.83",
		key: "k2fpak"
	}]]);
	const ChartScatter = createLucideIcon("chart-scatter", [
		["circle", {
			cx: "7.5",
			cy: "7.5",
			r: ".5",
			fill: "currentColor",
			key: "kqv944"
		}],
		["circle", {
			cx: "18.5",
			cy: "5.5",
			r: ".5",
			fill: "currentColor",
			key: "lysivs"
		}],
		["circle", {
			cx: "11.5",
			cy: "11.5",
			r: ".5",
			fill: "currentColor",
			key: "byv1b8"
		}],
		["circle", {
			cx: "7.5",
			cy: "16.5",
			r: ".5",
			fill: "currentColor",
			key: "nkw3mc"
		}],
		["circle", {
			cx: "17.5",
			cy: "14.5",
			r: ".5",
			fill: "currentColor",
			key: "1gjh6j"
		}],
		["path", {
			d: "M3 3v16a2 2 0 0 0 2 2h16",
			key: "c24i48"
		}]
	]);
	const CheckCheck = createLucideIcon("check-check", [["path", {
		d: "M18 6 7 17l-5-5",
		key: "116fxf"
	}], ["path", {
		d: "m22 10-7.5 7.5L13 16",
		key: "ke71qq"
	}]]);
	const ChartSpline = createLucideIcon("chart-spline", [["path", {
		d: "M3 3v16a2 2 0 0 0 2 2h16",
		key: "c24i48"
	}], ["path", {
		d: "M7 16c.5-2 1.5-7 4-7 2 0 2 3 4 3 2.5 0 4.5-5 5-7",
		key: "lw07rv"
	}]]);
	const CheckLine = createLucideIcon("check-line", [
		["path", {
			d: "M20 4L9 15",
			key: "1qkx8z"
		}],
		["path", {
			d: "M21 19L3 19",
			key: "100sma"
		}],
		["path", {
			d: "M9 15L4 10",
			key: "9zxff7"
		}]
	]);
	const Check = createLucideIcon("check", [["path", {
		d: "M20 6 9 17l-5-5",
		key: "1gmf2c"
	}]]);
	const ChefHat = createLucideIcon("chef-hat", [["path", {
		d: "M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589 5 5 0 0 0-9.186 0 4 4 0 0 0-2.134 7.588c.411.198.727.585.727 1.041V20a1 1 0 0 0 1 1Z",
		key: "1qvrer"
	}], ["path", {
		d: "M6 17h12",
		key: "1jwigz"
	}]]);
	const Cherry = createLucideIcon("cherry", [
		["path", {
			d: "M2 17a5 5 0 0 0 10 0c0-2.76-2.5-5-5-3-2.5-2-5 .24-5 3Z",
			key: "cvxqlc"
		}],
		["path", {
			d: "M12 17a5 5 0 0 0 10 0c0-2.76-2.5-5-5-3-2.5-2-5 .24-5 3Z",
			key: "1ostrc"
		}],
		["path", {
			d: "M7 14c3.22-2.91 4.29-8.75 5-12 1.66 2.38 4.94 9 5 12",
			key: "hqx58h"
		}],
		["path", {
			d: "M22 9c-4.29 0-7.14-2.33-10-7 5.71 0 10 4.67 10 7Z",
			key: "eykp1o"
		}]
	]);
	const ChevronDown = createLucideIcon("chevron-down", [["path", {
		d: "m6 9 6 6 6-6",
		key: "qrunsl"
	}]]);
	const ChevronFirst = createLucideIcon("chevron-first", [["path", {
		d: "m17 18-6-6 6-6",
		key: "1yerx2"
	}], ["path", {
		d: "M7 6v12",
		key: "1p53r6"
	}]]);
	const ChevronLast = createLucideIcon("chevron-last", [["path", {
		d: "m7 18 6-6-6-6",
		key: "lwmzdw"
	}], ["path", {
		d: "M17 6v12",
		key: "1o0aio"
	}]]);
	const ChevronLeft = createLucideIcon("chevron-left", [["path", {
		d: "m15 18-6-6 6-6",
		key: "1wnfg3"
	}]]);
	const ChevronRight = createLucideIcon("chevron-right", [["path", {
		d: "m9 18 6-6-6-6",
		key: "mthhwq"
	}]]);
	const ChevronUp = createLucideIcon("chevron-up", [["path", {
		d: "m18 15-6-6-6 6",
		key: "153udz"
	}]]);
	const ChevronsDownUp = createLucideIcon("chevrons-down-up", [["path", {
		d: "m7 20 5-5 5 5",
		key: "13a0gw"
	}], ["path", {
		d: "m7 4 5 5 5-5",
		key: "1kwcof"
	}]]);
	const ChevronsDown = createLucideIcon("chevrons-down", [["path", {
		d: "m7 6 5 5 5-5",
		key: "1lc07p"
	}], ["path", {
		d: "m7 13 5 5 5-5",
		key: "1d48rs"
	}]]);
	const ChevronsLeftRightEllipsis = createLucideIcon("chevrons-left-right-ellipsis", [
		["path", {
			d: "M12 12h.01",
			key: "1mp3jc"
		}],
		["path", {
			d: "M16 12h.01",
			key: "1l6xoz"
		}],
		["path", {
			d: "m17 7 5 5-5 5",
			key: "1xlxn0"
		}],
		["path", {
			d: "m7 7-5 5 5 5",
			key: "19njba"
		}],
		["path", {
			d: "M8 12h.01",
			key: "czm47f"
		}]
	]);
	const ChevronsLeftRight = createLucideIcon("chevrons-left-right", [["path", {
		d: "m9 7-5 5 5 5",
		key: "j5w590"
	}], ["path", {
		d: "m15 7 5 5-5 5",
		key: "1bl6da"
	}]]);
	const ChevronsLeft = createLucideIcon("chevrons-left", [["path", {
		d: "m11 17-5-5 5-5",
		key: "13zhaf"
	}], ["path", {
		d: "m18 17-5-5 5-5",
		key: "h8a8et"
	}]]);
	const ChevronsRightLeft = createLucideIcon("chevrons-right-left", [["path", {
		d: "m20 17-5-5 5-5",
		key: "30x0n2"
	}], ["path", {
		d: "m4 17 5-5-5-5",
		key: "16spf4"
	}]]);
	const ChevronsRight = createLucideIcon("chevrons-right", [["path", {
		d: "m6 17 5-5-5-5",
		key: "xnjwq"
	}], ["path", {
		d: "m13 17 5-5-5-5",
		key: "17xmmf"
	}]]);
	const ChevronsUpDown = createLucideIcon("chevrons-up-down", [["path", {
		d: "m7 15 5 5 5-5",
		key: "1hf1tw"
	}], ["path", {
		d: "m7 9 5-5 5 5",
		key: "sgt6xg"
	}]]);
	const ChevronsUp = createLucideIcon("chevrons-up", [["path", {
		d: "m17 11-5-5-5 5",
		key: "e8nh98"
	}], ["path", {
		d: "m17 18-5-5-5 5",
		key: "2avn1x"
	}]]);
	const Chromium = createLucideIcon("chromium", [
		["path", {
			d: "M10.88 21.94 15.46 14",
			key: "xkve6t"
		}],
		["path", {
			d: "M21.17 8H12",
			key: "19dcdn"
		}],
		["path", {
			d: "M3.95 6.06 8.54 14",
			key: "g8jz9m"
		}],
		["circle", {
			cx: "12",
			cy: "12",
			r: "10",
			key: "1mglay"
		}],
		["circle", {
			cx: "12",
			cy: "12",
			r: "4",
			key: "4exip2"
		}]
	]);
	const Church = createLucideIcon("church", [
		["path", {
			d: "M10 9h4",
			key: "u4k05v"
		}],
		["path", {
			d: "M12 7v5",
			key: "ma6bk"
		}],
		["path", {
			d: "M14 21v-3a2 2 0 0 0-4 0v3",
			key: "1rgiei"
		}],
		["path", {
			d: "m18 9 3.52 2.147a1 1 0 0 1 .48.854V19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6.999a1 1 0 0 1 .48-.854L6 9",
			key: "flvdwo"
		}],
		["path", {
			d: "M6 21V7a1 1 0 0 1 .376-.782l5-3.999a1 1 0 0 1 1.249.001l5 4A1 1 0 0 1 18 7v14",
			key: "a5i0n2"
		}]
	]);
	const Cigarette = createLucideIcon("cigarette", [
		["path", {
			d: "M17 12H3a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h14",
			key: "1mb5g1"
		}],
		["path", {
			d: "M18 8c0-2.5-2-2.5-2-5",
			key: "1il607"
		}],
		["path", {
			d: "M21 16a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1",
			key: "1yl5r7"
		}],
		["path", {
			d: "M22 8c0-2.5-2-2.5-2-5",
			key: "1gah44"
		}],
		["path", {
			d: "M7 12v4",
			key: "jqww69"
		}]
	]);
	const CigaretteOff = createLucideIcon("cigarette-off", [
		["path", {
			d: "M12 12H3a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h13",
			key: "1gdiyg"
		}],
		["path", {
			d: "M18 8c0-2.5-2-2.5-2-5",
			key: "1il607"
		}],
		["path", {
			d: "m2 2 20 20",
			key: "1ooewy"
		}],
		["path", {
			d: "M21 12a1 1 0 0 1 1 1v2a1 1 0 0 1-.5.866",
			key: "166zjj"
		}],
		["path", {
			d: "M22 8c0-2.5-2-2.5-2-5",
			key: "1gah44"
		}],
		["path", {
			d: "M7 12v4",
			key: "jqww69"
		}]
	]);
	const CircleAlert = createLucideIcon("circle-alert", [
		["circle", {
			cx: "12",
			cy: "12",
			r: "10",
			key: "1mglay"
		}],
		["line", {
			x1: "12",
			x2: "12",
			y1: "8",
			y2: "12",
			key: "1pkeuh"
		}],
		["line", {
			x1: "12",
			x2: "12.01",
			y1: "16",
			y2: "16",
			key: "4dfq90"
		}]
	]);
	const CircleArrowDown = createLucideIcon("circle-arrow-down", [
		["circle", {
			cx: "12",
			cy: "12",
			r: "10",
			key: "1mglay"
		}],
		["path", {
			d: "M12 8v8",
			key: "napkw2"
		}],
		["path", {
			d: "m8 12 4 4 4-4",
			key: "k98ssh"
		}]
	]);
	const CircleArrowLeft = createLucideIcon("circle-arrow-left", [
		["circle", {
			cx: "12",
			cy: "12",
			r: "10",
			key: "1mglay"
		}],
		["path", {
			d: "m12 8-4 4 4 4",
			key: "15vm53"
		}],
		["path", {
			d: "M16 12H8",
			key: "1fr5h0"
		}]
	]);
	const CircleArrowOutDownLeft = createLucideIcon("circle-arrow-out-down-left", [
		["path", {
			d: "M2 12a10 10 0 1 1 10 10",
			key: "1yn6ov"
		}],
		["path", {
			d: "m2 22 10-10",
			key: "28ilpk"
		}],
		["path", {
			d: "M8 22H2v-6",
			key: "sulq54"
		}]
	]);
	const CircleArrowOutDownRight = createLucideIcon("circle-arrow-out-down-right", [
		["path", {
			d: "M12 22a10 10 0 1 1 10-10",
			key: "130bv5"
		}],
		["path", {
			d: "M22 22 12 12",
			key: "131aw7"
		}],
		["path", {
			d: "M22 16v6h-6",
			key: "1gvm70"
		}]
	]);
	const CircleArrowOutUpLeft = createLucideIcon("circle-arrow-out-up-left", [
		["path", {
			d: "M2 8V2h6",
			key: "hiwtdz"
		}],
		["path", {
			d: "m2 2 10 10",
			key: "1oh8rs"
		}],
		["path", {
			d: "M12 2A10 10 0 1 1 2 12",
			key: "rrk4fa"
		}]
	]);
	const CircleArrowOutUpRight = createLucideIcon("circle-arrow-out-up-right", [
		["path", {
			d: "M22 12A10 10 0 1 1 12 2",
			key: "1fm58d"
		}],
		["path", {
			d: "M22 2 12 12",
			key: "yg2myt"
		}],
		["path", {
			d: "M16 2h6v6",
			key: "zan5cs"
		}]
	]);
	const CircleArrowRight = createLucideIcon("circle-arrow-right", [
		["circle", {
			cx: "12",
			cy: "12",
			r: "10",
			key: "1mglay"
		}],
		["path", {
			d: "m12 16 4-4-4-4",
			key: "1i9zcv"
		}],
		["path", {
			d: "M8 12h8",
			key: "1wcyev"
		}]
	]);
	const CircleArrowUp = createLucideIcon("circle-arrow-up", [
		["circle", {
			cx: "12",
			cy: "12",
			r: "10",
			key: "1mglay"
		}],
		["path", {
			d: "m16 12-4-4-4 4",
			key: "177agl"
		}],
		["path", {
			d: "M12 16V8",
			key: "1sbj14"
		}]
	]);
	const CircleCheckBig = createLucideIcon("circle-check-big", [["path", {
		d: "M21.801 10A10 10 0 1 1 17 3.335",
		key: "yps3ct"
	}], ["path", {
		d: "m9 11 3 3L22 4",
		key: "1pflzl"
	}]]);
	const CircleCheck = createLucideIcon("circle-check", [["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}], ["path", {
		d: "m9 12 2 2 4-4",
		key: "dzmm74"
	}]]);
	const CircleChevronDown = createLucideIcon("circle-chevron-down", [["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}], ["path", {
		d: "m16 10-4 4-4-4",
		key: "894hmk"
	}]]);
	const CircleChevronLeft = createLucideIcon("circle-chevron-left", [["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}], ["path", {
		d: "m14 16-4-4 4-4",
		key: "ojs7w8"
	}]]);
	const CircleChevronRight = createLucideIcon("circle-chevron-right", [["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}], ["path", {
		d: "m10 8 4 4-4 4",
		key: "1wy4r4"
	}]]);
	const CircleChevronUp = createLucideIcon("circle-chevron-up", [["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}], ["path", {
		d: "m8 14 4-4 4 4",
		key: "fy2ptz"
	}]]);
	const CircleDashed = createLucideIcon("circle-dashed", [
		["path", {
			d: "M10.1 2.182a10 10 0 0 1 3.8 0",
			key: "5ilxe3"
		}],
		["path", {
			d: "M13.9 21.818a10 10 0 0 1-3.8 0",
			key: "11zvb9"
		}],
		["path", {
			d: "M17.609 3.721a10 10 0 0 1 2.69 2.7",
			key: "1iw5b2"
		}],
		["path", {
			d: "M2.182 13.9a10 10 0 0 1 0-3.8",
			key: "c0bmvh"
		}],
		["path", {
			d: "M20.279 17.609a10 10 0 0 1-2.7 2.69",
			key: "1ruxm7"
		}],
		["path", {
			d: "M21.818 10.1a10 10 0 0 1 0 3.8",
			key: "qkgqxc"
		}],
		["path", {
			d: "M3.721 6.391a10 10 0 0 1 2.7-2.69",
			key: "1mcia2"
		}],
		["path", {
			d: "M6.391 20.279a10 10 0 0 1-2.69-2.7",
			key: "1fvljs"
		}]
	]);
	const CircleDivide = createLucideIcon("circle-divide", [
		["line", {
			x1: "8",
			x2: "16",
			y1: "12",
			y2: "12",
			key: "1jonct"
		}],
		["line", {
			x1: "12",
			x2: "12",
			y1: "16",
			y2: "16",
			key: "aqc6ln"
		}],
		["line", {
			x1: "12",
			x2: "12",
			y1: "8",
			y2: "8",
			key: "1mkcni"
		}],
		["circle", {
			cx: "12",
			cy: "12",
			r: "10",
			key: "1mglay"
		}]
	]);
	const CircleDollarSign = createLucideIcon("circle-dollar-sign", [
		["circle", {
			cx: "12",
			cy: "12",
			r: "10",
			key: "1mglay"
		}],
		["path", {
			d: "M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8",
			key: "1h4pet"
		}],
		["path", {
			d: "M12 18V6",
			key: "zqpxq5"
		}]
	]);
	const CircleDotDashed = createLucideIcon("circle-dot-dashed", [
		["path", {
			d: "M10.1 2.18a9.93 9.93 0 0 1 3.8 0",
			key: "1qdqn0"
		}],
		["path", {
			d: "M17.6 3.71a9.95 9.95 0 0 1 2.69 2.7",
			key: "1bq7p6"
		}],
		["path", {
			d: "M21.82 10.1a9.93 9.93 0 0 1 0 3.8",
			key: "1rlaqf"
		}],
		["path", {
			d: "M20.29 17.6a9.95 9.95 0 0 1-2.7 2.69",
			key: "1xk03u"
		}],
		["path", {
			d: "M13.9 21.82a9.94 9.94 0 0 1-3.8 0",
			key: "l7re25"
		}],
		["path", {
			d: "M6.4 20.29a9.95 9.95 0 0 1-2.69-2.7",
			key: "1v18p6"
		}],
		["path", {
			d: "M2.18 13.9a9.93 9.93 0 0 1 0-3.8",
			key: "xdo6bj"
		}],
		["path", {
			d: "M3.71 6.4a9.95 9.95 0 0 1 2.7-2.69",
			key: "1jjmaz"
		}],
		["circle", {
			cx: "12",
			cy: "12",
			r: "1",
			key: "41hilf"
		}]
	]);
	const CircleDot = createLucideIcon("circle-dot", [["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}], ["circle", {
		cx: "12",
		cy: "12",
		r: "1",
		key: "41hilf"
	}]]);
	const CircleEllipsis = createLucideIcon("circle-ellipsis", [
		["circle", {
			cx: "12",
			cy: "12",
			r: "10",
			key: "1mglay"
		}],
		["path", {
			d: "M17 12h.01",
			key: "1m0b6t"
		}],
		["path", {
			d: "M12 12h.01",
			key: "1mp3jc"
		}],
		["path", {
			d: "M7 12h.01",
			key: "eqddd0"
		}]
	]);
	const CircleEqual = createLucideIcon("circle-equal", [
		["path", {
			d: "M7 10h10",
			key: "1101jm"
		}],
		["path", {
			d: "M7 14h10",
			key: "1mhdw3"
		}],
		["circle", {
			cx: "12",
			cy: "12",
			r: "10",
			key: "1mglay"
		}]
	]);
	const CircleFadingArrowUp = createLucideIcon("circle-fading-arrow-up", [
		["path", {
			d: "M12 2a10 10 0 0 1 7.38 16.75",
			key: "175t95"
		}],
		["path", {
			d: "m16 12-4-4-4 4",
			key: "177agl"
		}],
		["path", {
			d: "M12 16V8",
			key: "1sbj14"
		}],
		["path", {
			d: "M2.5 8.875a10 10 0 0 0-.5 3",
			key: "1vce0s"
		}],
		["path", {
			d: "M2.83 16a10 10 0 0 0 2.43 3.4",
			key: "o3fkw4"
		}],
		["path", {
			d: "M4.636 5.235a10 10 0 0 1 .891-.857",
			key: "1szpfk"
		}],
		["path", {
			d: "M8.644 21.42a10 10 0 0 0 7.631-.38",
			key: "9yhvd4"
		}]
	]);
	const CircleFadingPlus = createLucideIcon("circle-fading-plus", [
		["path", {
			d: "M12 2a10 10 0 0 1 7.38 16.75",
			key: "175t95"
		}],
		["path", {
			d: "M12 8v8",
			key: "napkw2"
		}],
		["path", {
			d: "M16 12H8",
			key: "1fr5h0"
		}],
		["path", {
			d: "M2.5 8.875a10 10 0 0 0-.5 3",
			key: "1vce0s"
		}],
		["path", {
			d: "M2.83 16a10 10 0 0 0 2.43 3.4",
			key: "o3fkw4"
		}],
		["path", {
			d: "M4.636 5.235a10 10 0 0 1 .891-.857",
			key: "1szpfk"
		}],
		["path", {
			d: "M8.644 21.42a10 10 0 0 0 7.631-.38",
			key: "9yhvd4"
		}]
	]);
	const CircleGauge = createLucideIcon("circle-gauge", [
		["path", {
			d: "M15.6 2.7a10 10 0 1 0 5.7 5.7",
			key: "1e0p6d"
		}],
		["circle", {
			cx: "12",
			cy: "12",
			r: "2",
			key: "1c9p78"
		}],
		["path", {
			d: "M13.4 10.6 19 5",
			key: "1kr7tw"
		}]
	]);
	const CircleMinus = createLucideIcon("circle-minus", [["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}], ["path", {
		d: "M8 12h8",
		key: "1wcyev"
	}]]);
	const CircleOff = createLucideIcon("circle-off", [
		["path", {
			d: "m2 2 20 20",
			key: "1ooewy"
		}],
		["path", {
			d: "M8.35 2.69A10 10 0 0 1 21.3 15.65",
			key: "1pfsoa"
		}],
		["path", {
			d: "M19.08 19.08A10 10 0 1 1 4.92 4.92",
			key: "1ablyi"
		}]
	]);
	const CircleParkingOff = createLucideIcon("circle-parking-off", [
		["path", {
			d: "M12.656 7H13a3 3 0 0 1 2.984 3.307",
			key: "1sjx87"
		}],
		["path", {
			d: "M13 13H9",
			key: "e2beee"
		}],
		["path", {
			d: "M19.071 19.071A1 1 0 0 1 4.93 4.93",
			key: "1kb595"
		}],
		["path", {
			d: "m2 2 20 20",
			key: "1ooewy"
		}],
		["path", {
			d: "M8.357 2.687a10 10 0 0 1 12.956 12.956",
			key: "5bsfdx"
		}],
		["path", {
			d: "M9 17V9",
			key: "ojradj"
		}]
	]);
	const CircleParking = createLucideIcon("circle-parking", [["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}], ["path", {
		d: "M9 17V7h4a3 3 0 0 1 0 6H9",
		key: "1dfk2c"
	}]]);
	const CirclePause = createLucideIcon("circle-pause", [
		["circle", {
			cx: "12",
			cy: "12",
			r: "10",
			key: "1mglay"
		}],
		["line", {
			x1: "10",
			x2: "10",
			y1: "15",
			y2: "9",
			key: "c1nkhi"
		}],
		["line", {
			x1: "14",
			x2: "14",
			y1: "15",
			y2: "9",
			key: "h65svq"
		}]
	]);
	const CirclePlay = createLucideIcon("circle-play", [["path", {
		d: "M9 9.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997A1 1 0 0 1 9 14.996z",
		key: "kmsa83"
	}], ["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}]]);
	const CirclePercent = createLucideIcon("circle-percent", [
		["circle", {
			cx: "12",
			cy: "12",
			r: "10",
			key: "1mglay"
		}],
		["path", {
			d: "m15 9-6 6",
			key: "1uzhvr"
		}],
		["path", {
			d: "M9 9h.01",
			key: "1q5me6"
		}],
		["path", {
			d: "M15 15h.01",
			key: "lqbp3k"
		}]
	]);
	const CirclePlus = createLucideIcon("circle-plus", [
		["circle", {
			cx: "12",
			cy: "12",
			r: "10",
			key: "1mglay"
		}],
		["path", {
			d: "M8 12h8",
			key: "1wcyev"
		}],
		["path", {
			d: "M12 8v8",
			key: "napkw2"
		}]
	]);
	const CirclePoundSterling = createLucideIcon("circle-pound-sterling", [
		["path", {
			d: "M10 16V9.5a1 1 0 0 1 5 0",
			key: "1i1are"
		}],
		["path", {
			d: "M8 12h4",
			key: "qz6y1c"
		}],
		["path", {
			d: "M8 16h7",
			key: "sbedsn"
		}],
		["circle", {
			cx: "12",
			cy: "12",
			r: "10",
			key: "1mglay"
		}]
	]);
	const CirclePower = createLucideIcon("circle-power", [
		["path", {
			d: "M12 7v4",
			key: "xawao1"
		}],
		["path", {
			d: "M7.998 9.003a5 5 0 1 0 8-.005",
			key: "1pek45"
		}],
		["circle", {
			cx: "12",
			cy: "12",
			r: "10",
			key: "1mglay"
		}]
	]);
	const CircleQuestionMark = createLucideIcon("circle-question-mark", [
		["circle", {
			cx: "12",
			cy: "12",
			r: "10",
			key: "1mglay"
		}],
		["path", {
			d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",
			key: "1u773s"
		}],
		["path", {
			d: "M12 17h.01",
			key: "p32p05"
		}]
	]);
	const CircleSlash2 = createLucideIcon("circle-slash-2", [["path", {
		d: "M22 2 2 22",
		key: "y4kqgn"
	}], ["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}]]);
	const CircleSlash = createLucideIcon("circle-slash", [["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}], ["line", {
		x1: "9",
		x2: "15",
		y1: "15",
		y2: "9",
		key: "1dfufj"
	}]]);
	const CircleSmall = createLucideIcon("circle-small", [["circle", {
		cx: "12",
		cy: "12",
		r: "6",
		key: "1vlfrh"
	}]]);
	const CircleStar = createLucideIcon("circle-star", [["path", {
		d: "M11.051 7.616a1 1 0 0 1 1.909.024l.737 1.452a1 1 0 0 0 .737.535l1.634.256a1 1 0 0 1 .588 1.806l-1.172 1.168a1 1 0 0 0-.282.866l.259 1.613a1 1 0 0 1-1.541 1.134l-1.465-.75a1 1 0 0 0-.912 0l-1.465.75a1 1 0 0 1-1.539-1.133l.258-1.613a1 1 0 0 0-.282-.867l-1.156-1.152a1 1 0 0 1 .572-1.822l1.633-.256a1 1 0 0 0 .737-.535z",
		key: "285bvi"
	}], ["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}]]);
	const CircleStop = createLucideIcon("circle-stop", [["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}], ["rect", {
		x: "9",
		y: "9",
		width: "6",
		height: "6",
		rx: "1",
		key: "1ssd4o"
	}]]);
	const CircleUserRound = createLucideIcon("circle-user-round", [
		["path", {
			d: "M18 20a6 6 0 0 0-12 0",
			key: "1qehca"
		}],
		["circle", {
			cx: "12",
			cy: "10",
			r: "4",
			key: "1h16sb"
		}],
		["circle", {
			cx: "12",
			cy: "12",
			r: "10",
			key: "1mglay"
		}]
	]);
	const CircleUser = createLucideIcon("circle-user", [
		["circle", {
			cx: "12",
			cy: "12",
			r: "10",
			key: "1mglay"
		}],
		["circle", {
			cx: "12",
			cy: "10",
			r: "3",
			key: "ilqhr7"
		}],
		["path", {
			d: "M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662",
			key: "154egf"
		}]
	]);
	const CircleX = createLucideIcon("circle-x", [
		["circle", {
			cx: "12",
			cy: "12",
			r: "10",
			key: "1mglay"
		}],
		["path", {
			d: "m15 9-6 6",
			key: "1uzhvr"
		}],
		["path", {
			d: "m9 9 6 6",
			key: "z0biqf"
		}]
	]);
	const Circle = createLucideIcon("circle", [["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}]]);
	const CircuitBoard = createLucideIcon("circuit-board", [
		["rect", {
			width: "18",
			height: "18",
			x: "3",
			y: "3",
			rx: "2",
			key: "afitv7"
		}],
		["path", {
			d: "M11 9h4a2 2 0 0 0 2-2V3",
			key: "1ve2rv"
		}],
		["circle", {
			cx: "9",
			cy: "9",
			r: "2",
			key: "af1f0g"
		}],
		["path", {
			d: "M7 21v-4a2 2 0 0 1 2-2h4",
			key: "1fwkro"
		}],
		["circle", {
			cx: "15",
			cy: "15",
			r: "2",
			key: "3i40o0"
		}]
	]);
	const Citrus = createLucideIcon("citrus", [
		["path", {
			d: "M21.66 17.67a1.08 1.08 0 0 1-.04 1.6A12 12 0 0 1 4.73 2.38a1.1 1.1 0 0 1 1.61-.04z",
			key: "4ite01"
		}],
		["path", {
			d: "M19.65 15.66A8 8 0 0 1 8.35 4.34",
			key: "1gxipu"
		}],
		["path", {
			d: "m14 10-5.5 5.5",
			key: "92pfem"
		}],
		["path", {
			d: "M14 17.85V10H6.15",
			key: "xqmtsk"
		}]
	]);
	const Clapperboard = createLucideIcon("clapperboard", [
		["path", {
			d: "M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3Z",
			key: "1tn4o7"
		}],
		["path", {
			d: "m6.2 5.3 3.1 3.9",
			key: "iuk76l"
		}],
		["path", {
			d: "m12.4 3.4 3.1 4",
			key: "6hsd6n"
		}],
		["path", {
			d: "M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z",
			key: "ltgou9"
		}]
	]);
	const ClipboardCheck = createLucideIcon("clipboard-check", [
		["rect", {
			width: "8",
			height: "4",
			x: "8",
			y: "2",
			rx: "1",
			ry: "1",
			key: "tgr4d6"
		}],
		["path", {
			d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",
			key: "116196"
		}],
		["path", {
			d: "m9 14 2 2 4-4",
			key: "df797q"
		}]
	]);
	const ClipboardClock = createLucideIcon("clipboard-clock", [
		["path", {
			d: "M16 14v2.2l1.6 1",
			key: "fo4ql5"
		}],
		["path", {
			d: "M16 4h2a2 2 0 0 1 2 2v.832",
			key: "1ujtp2"
		}],
		["path", {
			d: "M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h2",
			key: "qvpao1"
		}],
		["circle", {
			cx: "16",
			cy: "16",
			r: "6",
			key: "qoo3c4"
		}],
		["rect", {
			x: "8",
			y: "2",
			width: "8",
			height: "4",
			rx: "1",
			key: "ublpy"
		}]
	]);
	const ClipboardCopy = createLucideIcon("clipboard-copy", [
		["rect", {
			width: "8",
			height: "4",
			x: "8",
			y: "2",
			rx: "1",
			ry: "1",
			key: "tgr4d6"
		}],
		["path", {
			d: "M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2",
			key: "4jdomd"
		}],
		["path", {
			d: "M16 4h2a2 2 0 0 1 2 2v4",
			key: "3hqy98"
		}],
		["path", {
			d: "M21 14H11",
			key: "1bme5i"
		}],
		["path", {
			d: "m15 10-4 4 4 4",
			key: "5dvupr"
		}]
	]);
	const ClipboardList = createLucideIcon("clipboard-list", [
		["rect", {
			width: "8",
			height: "4",
			x: "8",
			y: "2",
			rx: "1",
			ry: "1",
			key: "tgr4d6"
		}],
		["path", {
			d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",
			key: "116196"
		}],
		["path", {
			d: "M12 11h4",
			key: "1jrz19"
		}],
		["path", {
			d: "M12 16h4",
			key: "n85exb"
		}],
		["path", {
			d: "M8 11h.01",
			key: "1dfujw"
		}],
		["path", {
			d: "M8 16h.01",
			key: "18s6g9"
		}]
	]);
	const ClipboardMinus = createLucideIcon("clipboard-minus", [
		["rect", {
			width: "8",
			height: "4",
			x: "8",
			y: "2",
			rx: "1",
			ry: "1",
			key: "tgr4d6"
		}],
		["path", {
			d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",
			key: "116196"
		}],
		["path", {
			d: "M9 14h6",
			key: "159ibu"
		}]
	]);
	const ClipboardPaste = createLucideIcon("clipboard-paste", [
		["path", {
			d: "M11 14h10",
			key: "1w8e9d"
		}],
		["path", {
			d: "M16 4h2a2 2 0 0 1 2 2v1.344",
			key: "1e62lh"
		}],
		["path", {
			d: "m17 18 4-4-4-4",
			key: "z2g111"
		}],
		["path", {
			d: "M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 1.793-1.113",
			key: "bjbb7m"
		}],
		["rect", {
			x: "8",
			y: "2",
			width: "8",
			height: "4",
			rx: "1",
			key: "ublpy"
		}]
	]);
	const ClipboardPenLine = createLucideIcon("clipboard-pen-line", [
		["rect", {
			width: "8",
			height: "4",
			x: "8",
			y: "2",
			rx: "1",
			key: "1oijnt"
		}],
		["path", {
			d: "M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-.5",
			key: "1but9f"
		}],
		["path", {
			d: "M16 4h2a2 2 0 0 1 1.73 1",
			key: "1p8n7l"
		}],
		["path", {
			d: "M8 18h1",
			key: "13wk12"
		}],
		["path", {
			d: "M21.378 12.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z",
			key: "2t3380"
		}]
	]);
	const ClipboardPen = createLucideIcon("clipboard-pen", [
		["rect", {
			width: "8",
			height: "4",
			x: "8",
			y: "2",
			rx: "1",
			key: "1oijnt"
		}],
		["path", {
			d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-5.5",
			key: "cereej"
		}],
		["path", {
			d: "M4 13.5V6a2 2 0 0 1 2-2h2",
			key: "5ua5vh"
		}],
		["path", {
			d: "M13.378 15.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z",
			key: "1y4qbx"
		}]
	]);
	const ClipboardPlus = createLucideIcon("clipboard-plus", [
		["rect", {
			width: "8",
			height: "4",
			x: "8",
			y: "2",
			rx: "1",
			ry: "1",
			key: "tgr4d6"
		}],
		["path", {
			d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",
			key: "116196"
		}],
		["path", {
			d: "M9 14h6",
			key: "159ibu"
		}],
		["path", {
			d: "M12 17v-6",
			key: "1y8rbf"
		}]
	]);
	const ClipboardX = createLucideIcon("clipboard-x", [
		["rect", {
			width: "8",
			height: "4",
			x: "8",
			y: "2",
			rx: "1",
			ry: "1",
			key: "tgr4d6"
		}],
		["path", {
			d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",
			key: "116196"
		}],
		["path", {
			d: "m15 11-6 6",
			key: "1toa9n"
		}],
		["path", {
			d: "m9 11 6 6",
			key: "wlibny"
		}]
	]);
	const Clipboard = createLucideIcon("clipboard", [["rect", {
		width: "8",
		height: "4",
		x: "8",
		y: "2",
		rx: "1",
		ry: "1",
		key: "tgr4d6"
	}], ["path", {
		d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",
		key: "116196"
	}]]);
	const ClipboardType = createLucideIcon("clipboard-type", [
		["rect", {
			width: "8",
			height: "4",
			x: "8",
			y: "2",
			rx: "1",
			ry: "1",
			key: "tgr4d6"
		}],
		["path", {
			d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",
			key: "116196"
		}],
		["path", {
			d: "M9 12v-1h6v1",
			key: "iehl6m"
		}],
		["path", {
			d: "M11 17h2",
			key: "12w5me"
		}],
		["path", {
			d: "M12 11v6",
			key: "1bwqyc"
		}]
	]);
	const Clock1 = createLucideIcon("clock-1", [["path", {
		d: "M12 6v6l2-4",
		key: "miptyd"
	}], ["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}]]);
	const Clock10 = createLucideIcon("clock-10", [["path", {
		d: "M12 6v6l-4-2",
		key: "cedpoo"
	}], ["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}]]);
	const Clock11 = createLucideIcon("clock-11", [["path", {
		d: "M12 6v6l-2-4",
		key: "ns39ag"
	}], ["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}]]);
	const Clock12 = createLucideIcon("clock-12", [["path", {
		d: "M12 6v6",
		key: "1ipuwl"
	}], ["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}]]);
	const Clock2 = createLucideIcon("clock-2", [["path", {
		d: "M12 6v6l4-2",
		key: "1r2kuh"
	}], ["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}]]);
	const Clock3 = createLucideIcon("clock-3", [["path", {
		d: "M12 6v6h4",
		key: "135r8i"
	}], ["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}]]);
	const Clock4 = createLucideIcon("clock-4", [["path", {
		d: "M12 6v6l4 2",
		key: "mmk7yg"
	}], ["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}]]);
	const Clock5 = createLucideIcon("clock-5", [["path", {
		d: "M12 6v6l2 4",
		key: "1287s9"
	}], ["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}]]);
	const Clock6 = createLucideIcon("clock-6", [["path", {
		d: "M12 6v10",
		key: "wf7rdh"
	}], ["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}]]);
	const Clock7 = createLucideIcon("clock-7", [["path", {
		d: "M12 6v6l-2 4",
		key: "1095bu"
	}], ["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}]]);
	const Clock8 = createLucideIcon("clock-8", [["path", {
		d: "M12 6v6l-4 2",
		key: "imc3wl"
	}], ["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}]]);
	const Clock9 = createLucideIcon("clock-9", [["path", {
		d: "M12 6v6H8",
		key: "u39vzm"
	}], ["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}]]);
	const ClockAlert = createLucideIcon("clock-alert", [
		["path", {
			d: "M12 6v6l4 2",
			key: "mmk7yg"
		}],
		["path", {
			d: "M20 12v5",
			key: "12wsvk"
		}],
		["path", {
			d: "M20 21h.01",
			key: "1p6o6n"
		}],
		["path", {
			d: "M21.25 8.2A10 10 0 1 0 16 21.16",
			key: "17fp9f"
		}]
	]);
	const ClockArrowUp = createLucideIcon("clock-arrow-up", [
		["path", {
			d: "M12 6v6l1.56.78",
			key: "14ed3g"
		}],
		["path", {
			d: "M13.227 21.925a10 10 0 1 1 8.767-9.588",
			key: "jwkls1"
		}],
		["path", {
			d: "m14 18 4-4 4 4",
			key: "ftkppy"
		}],
		["path", {
			d: "M18 22v-8",
			key: "su0gjh"
		}]
	]);
	const ClockArrowDown = createLucideIcon("clock-arrow-down", [
		["path", {
			d: "M12 6v6l2 1",
			key: "19cm8n"
		}],
		["path", {
			d: "M12.337 21.994a10 10 0 1 1 9.588-8.767",
			key: "28moa"
		}],
		["path", {
			d: "m14 18 4 4 4-4",
			key: "1waygx"
		}],
		["path", {
			d: "M18 14v8",
			key: "irew45"
		}]
	]);
	const ClockFading = createLucideIcon("clock-fading", [
		["path", {
			d: "M12 2a10 10 0 0 1 7.38 16.75",
			key: "175t95"
		}],
		["path", {
			d: "M12 6v6l4 2",
			key: "mmk7yg"
		}],
		["path", {
			d: "M2.5 8.875a10 10 0 0 0-.5 3",
			key: "1vce0s"
		}],
		["path", {
			d: "M2.83 16a10 10 0 0 0 2.43 3.4",
			key: "o3fkw4"
		}],
		["path", {
			d: "M4.636 5.235a10 10 0 0 1 .891-.857",
			key: "1szpfk"
		}],
		["path", {
			d: "M8.644 21.42a10 10 0 0 0 7.631-.38",
			key: "9yhvd4"
		}]
	]);
	const ClockPlus = createLucideIcon("clock-plus", [
		["path", {
			d: "M12 6v6l3.644 1.822",
			key: "1jmett"
		}],
		["path", {
			d: "M16 19h6",
			key: "xwg31i"
		}],
		["path", {
			d: "M19 16v6",
			key: "tddt3s"
		}],
		["path", {
			d: "M21.92 13.267a10 10 0 1 0-8.653 8.653",
			key: "1u0osk"
		}]
	]);
	const Clock = createLucideIcon("clock", [["path", {
		d: "M12 6v6l4 2",
		key: "mmk7yg"
	}], ["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}]]);
	const ClosedCaption = createLucideIcon("closed-caption", [
		["path", {
			d: "M10 9.17a3 3 0 1 0 0 5.66",
			key: "h9wayk"
		}],
		["path", {
			d: "M17 9.17a3 3 0 1 0 0 5.66",
			key: "1v6zke"
		}],
		["rect", {
			x: "2",
			y: "5",
			width: "20",
			height: "14",
			rx: "2",
			key: "qneu4z"
		}]
	]);
	const CloudAlert = createLucideIcon("cloud-alert", [
		["path", {
			d: "M12 12v4",
			key: "tww15h"
		}],
		["path", {
			d: "M12 20h.01",
			key: "zekei9"
		}],
		["path", {
			d: "M17 18h.5a1 1 0 0 0 0-9h-1.79A7 7 0 1 0 7 17.708",
			key: "xsb5ju"
		}]
	]);
	const CloudCheck = createLucideIcon("cloud-check", [["path", {
		d: "m17 15-5.5 5.5L9 18",
		key: "15q87x"
	}], ["path", {
		d: "M5 17.743A7 7 0 1 1 15.71 10h1.79a4.5 4.5 0 0 1 1.5 8.742",
		key: "9ho6ki"
	}]]);
	const CloudCog = createLucideIcon("cloud-cog", [
		["path", {
			d: "m10.852 19.772-.383.924",
			key: "r7sl7d"
		}],
		["path", {
			d: "m13.148 14.228.383-.923",
			key: "1d5zpm"
		}],
		["path", {
			d: "M13.148 19.772a3 3 0 1 0-2.296-5.544l-.383-.923",
			key: "1ydik7"
		}],
		["path", {
			d: "m13.53 20.696-.382-.924a3 3 0 1 1-2.296-5.544",
			key: "1m1vsf"
		}],
		["path", {
			d: "m14.772 15.852.923-.383",
			key: "660p6e"
		}],
		["path", {
			d: "m14.772 18.148.923.383",
			key: "hrcpis"
		}],
		["path", {
			d: "M4.2 15.1a7 7 0 1 1 9.93-9.858A7 7 0 0 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.2",
			key: "j2q98n"
		}],
		["path", {
			d: "m9.228 15.852-.923-.383",
			key: "1p9ong"
		}],
		["path", {
			d: "m9.228 18.148-.923.383",
			key: "6558rz"
		}]
	]);
	const CloudDownload = createLucideIcon("cloud-download", [
		["path", {
			d: "M12 13v8l-4-4",
			key: "1f5nwf"
		}],
		["path", {
			d: "m12 21 4-4",
			key: "1lfcce"
		}],
		["path", {
			d: "M4.393 15.269A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.436 8.284",
			key: "ui1hmy"
		}]
	]);
	const CloudDrizzle = createLucideIcon("cloud-drizzle", [
		["path", {
			d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242",
			key: "1pljnt"
		}],
		["path", {
			d: "M8 19v1",
			key: "1dk2by"
		}],
		["path", {
			d: "M8 14v1",
			key: "84yxot"
		}],
		["path", {
			d: "M16 19v1",
			key: "v220m7"
		}],
		["path", {
			d: "M16 14v1",
			key: "g12gj6"
		}],
		["path", {
			d: "M12 21v1",
			key: "q8vafk"
		}],
		["path", {
			d: "M12 16v1",
			key: "1mx6rx"
		}]
	]);
	const CloudFog = createLucideIcon("cloud-fog", [
		["path", {
			d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242",
			key: "1pljnt"
		}],
		["path", {
			d: "M16 17H7",
			key: "pygtm1"
		}],
		["path", {
			d: "M17 21H9",
			key: "1u2q02"
		}]
	]);
	const CloudHail = createLucideIcon("cloud-hail", [
		["path", {
			d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242",
			key: "1pljnt"
		}],
		["path", {
			d: "M16 14v2",
			key: "a1is7l"
		}],
		["path", {
			d: "M8 14v2",
			key: "1e9m6t"
		}],
		["path", {
			d: "M16 20h.01",
			key: "xwek51"
		}],
		["path", {
			d: "M8 20h.01",
			key: "1vjney"
		}],
		["path", {
			d: "M12 16v2",
			key: "z66u1j"
		}],
		["path", {
			d: "M12 22h.01",
			key: "1urd7a"
		}]
	]);
	const CloudLightning = createLucideIcon("cloud-lightning", [["path", {
		d: "M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973",
		key: "1cez44"
	}], ["path", {
		d: "m13 12-3 5h4l-3 5",
		key: "1t22er"
	}]]);
	const CloudMoonRain = createLucideIcon("cloud-moon-rain", [
		["path", {
			d: "M11 20v2",
			key: "174qtz"
		}],
		["path", {
			d: "M18.376 14.512a6 6 0 0 0 3.461-4.127c.148-.625-.659-.97-1.248-.714a4 4 0 0 1-5.259-5.26c.255-.589-.09-1.395-.716-1.248a6 6 0 0 0-4.594 5.36",
			key: "zwnc1e"
		}],
		["path", {
			d: "M3 20a5 5 0 1 1 8.9-4H13a3 3 0 0 1 2 5.24",
			key: "1qmrp3"
		}],
		["path", {
			d: "M7 19v2",
			key: "12npes"
		}]
	]);
	const CloudMoon = createLucideIcon("cloud-moon", [["path", {
		d: "M13 16a3 3 0 0 1 0 6H7a5 5 0 1 1 4.9-6z",
		key: "ie2ih4"
	}], ["path", {
		d: "M18.376 14.512a6 6 0 0 0 3.461-4.127c.148-.625-.659-.97-1.248-.714a4 4 0 0 1-5.259-5.26c.255-.589-.09-1.395-.716-1.248a6 6 0 0 0-4.594 5.36",
		key: "zwnc1e"
	}]]);
	const CloudOff = createLucideIcon("cloud-off", [
		["path", {
			d: "m2 2 20 20",
			key: "1ooewy"
		}],
		["path", {
			d: "M5.782 5.782A7 7 0 0 0 9 19h8.5a4.5 4.5 0 0 0 1.307-.193",
			key: "yfwify"
		}],
		["path", {
			d: "M21.532 16.5A4.5 4.5 0 0 0 17.5 10h-1.79A7.008 7.008 0 0 0 10 5.07",
			key: "jlfiyv"
		}]
	]);
	const CloudRainWind = createLucideIcon("cloud-rain-wind", [
		["path", {
			d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242",
			key: "1pljnt"
		}],
		["path", {
			d: "m9.2 22 3-7",
			key: "sb5f6j"
		}],
		["path", {
			d: "m9 13-3 7",
			key: "500co5"
		}],
		["path", {
			d: "m17 13-3 7",
			key: "8t2fiy"
		}]
	]);
	const CloudRain = createLucideIcon("cloud-rain", [
		["path", {
			d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242",
			key: "1pljnt"
		}],
		["path", {
			d: "M16 14v6",
			key: "1j4efv"
		}],
		["path", {
			d: "M8 14v6",
			key: "17c4r9"
		}],
		["path", {
			d: "M12 16v6",
			key: "c8a4gj"
		}]
	]);
	const CloudSnow = createLucideIcon("cloud-snow", [
		["path", {
			d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242",
			key: "1pljnt"
		}],
		["path", {
			d: "M8 15h.01",
			key: "a7atzg"
		}],
		["path", {
			d: "M8 19h.01",
			key: "puxtts"
		}],
		["path", {
			d: "M12 17h.01",
			key: "p32p05"
		}],
		["path", {
			d: "M12 21h.01",
			key: "h35vbk"
		}],
		["path", {
			d: "M16 15h.01",
			key: "rnfrdf"
		}],
		["path", {
			d: "M16 19h.01",
			key: "1vcnzz"
		}]
	]);
	const CloudSunRain = createLucideIcon("cloud-sun-rain", [
		["path", {
			d: "M12 2v2",
			key: "tus03m"
		}],
		["path", {
			d: "m4.93 4.93 1.41 1.41",
			key: "149t6j"
		}],
		["path", {
			d: "M20 12h2",
			key: "1q8mjw"
		}],
		["path", {
			d: "m19.07 4.93-1.41 1.41",
			key: "1shlcs"
		}],
		["path", {
			d: "M15.947 12.65a4 4 0 0 0-5.925-4.128",
			key: "dpwdj0"
		}],
		["path", {
			d: "M3 20a5 5 0 1 1 8.9-4H13a3 3 0 0 1 2 5.24",
			key: "1qmrp3"
		}],
		["path", {
			d: "M11 20v2",
			key: "174qtz"
		}],
		["path", {
			d: "M7 19v2",
			key: "12npes"
		}]
	]);
	const CloudSun = createLucideIcon("cloud-sun", [
		["path", {
			d: "M12 2v2",
			key: "tus03m"
		}],
		["path", {
			d: "m4.93 4.93 1.41 1.41",
			key: "149t6j"
		}],
		["path", {
			d: "M20 12h2",
			key: "1q8mjw"
		}],
		["path", {
			d: "m19.07 4.93-1.41 1.41",
			key: "1shlcs"
		}],
		["path", {
			d: "M15.947 12.65a4 4 0 0 0-5.925-4.128",
			key: "dpwdj0"
		}],
		["path", {
			d: "M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z",
			key: "s09mg5"
		}]
	]);
	const CloudUpload = createLucideIcon("cloud-upload", [
		["path", {
			d: "M12 13v8",
			key: "1l5pq0"
		}],
		["path", {
			d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242",
			key: "1pljnt"
		}],
		["path", {
			d: "m8 17 4-4 4 4",
			key: "1quai1"
		}]
	]);
	const Cloud = createLucideIcon("cloud", [["path", {
		d: "M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z",
		key: "p7xjir"
	}]]);
	const Cloudy = createLucideIcon("cloudy", [["path", {
		d: "M17.5 21H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z",
		key: "gqqjvc"
	}], ["path", {
		d: "M22 10a3 3 0 0 0-3-3h-2.207a5.502 5.502 0 0 0-10.702.5",
		key: "1p2s76"
	}]]);
	const Clover = createLucideIcon("clover", [
		["path", {
			d: "M16.17 7.83 2 22",
			key: "t58vo8"
		}],
		["path", {
			d: "M4.02 12a2.827 2.827 0 1 1 3.81-4.17A2.827 2.827 0 1 1 12 4.02a2.827 2.827 0 1 1 4.17 3.81A2.827 2.827 0 1 1 19.98 12a2.827 2.827 0 1 1-3.81 4.17A2.827 2.827 0 1 1 12 19.98a2.827 2.827 0 1 1-4.17-3.81A1 1 0 1 1 4 12",
			key: "17k36q"
		}],
		["path", {
			d: "m7.83 7.83 8.34 8.34",
			key: "1d7sxk"
		}]
	]);
	const Club = createLucideIcon("club", [["path", {
		d: "M17.28 9.05a5.5 5.5 0 1 0-10.56 0A5.5 5.5 0 1 0 12 17.66a5.5 5.5 0 1 0 5.28-8.6Z",
		key: "27yuqz"
	}], ["path", {
		d: "M12 17.66L12 22",
		key: "ogfahf"
	}]]);
	const CodeXml = createLucideIcon("code-xml", [
		["path", {
			d: "m18 16 4-4-4-4",
			key: "1inbqp"
		}],
		["path", {
			d: "m6 8-4 4 4 4",
			key: "15zrgr"
		}],
		["path", {
			d: "m14.5 4-5 16",
			key: "e7oirm"
		}]
	]);
	const Codepen = createLucideIcon("codepen", [
		["polygon", {
			points: "12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2",
			key: "srzb37"
		}],
		["line", {
			x1: "12",
			x2: "12",
			y1: "22",
			y2: "15.5",
			key: "1t73f2"
		}],
		["polyline", {
			points: "22 8.5 12 15.5 2 8.5",
			key: "ajlxae"
		}],
		["polyline", {
			points: "2 15.5 12 8.5 22 15.5",
			key: "susrui"
		}],
		["line", {
			x1: "12",
			x2: "12",
			y1: "2",
			y2: "8.5",
			key: "2cldga"
		}]
	]);
	const Code$1 = createLucideIcon("code", [["path", {
		d: "m16 18 6-6-6-6",
		key: "eg8j8"
	}], ["path", {
		d: "m8 6-6 6 6 6",
		key: "ppft3o"
	}]]);
	const Codesandbox = createLucideIcon("codesandbox", [
		["path", {
			d: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z",
			key: "yt0hxn"
		}],
		["polyline", {
			points: "7.5 4.21 12 6.81 16.5 4.21",
			key: "fabo96"
		}],
		["polyline", {
			points: "7.5 19.79 7.5 14.6 3 12",
			key: "z377f1"
		}],
		["polyline", {
			points: "21 12 16.5 14.6 16.5 19.79",
			key: "9nrev1"
		}],
		["polyline", {
			points: "3.27 6.96 12 12.01 20.73 6.96",
			key: "1180pa"
		}],
		["line", {
			x1: "12",
			x2: "12",
			y1: "22.08",
			y2: "12",
			key: "3z3uq6"
		}]
	]);
	const Cog = createLucideIcon("cog", [
		["path", {
			d: "M11 10.27 7 3.34",
			key: "16pf9h"
		}],
		["path", {
			d: "m11 13.73-4 6.93",
			key: "794ttg"
		}],
		["path", {
			d: "M12 22v-2",
			key: "1osdcq"
		}],
		["path", {
			d: "M12 2v2",
			key: "tus03m"
		}],
		["path", {
			d: "M14 12h8",
			key: "4f43i9"
		}],
		["path", {
			d: "m17 20.66-1-1.73",
			key: "eq3orb"
		}],
		["path", {
			d: "m17 3.34-1 1.73",
			key: "2wel8s"
		}],
		["path", {
			d: "M2 12h2",
			key: "1t8f8n"
		}],
		["path", {
			d: "m20.66 17-1.73-1",
			key: "sg0v6f"
		}],
		["path", {
			d: "m20.66 7-1.73 1",
			key: "1ow05n"
		}],
		["path", {
			d: "m3.34 17 1.73-1",
			key: "nuk764"
		}],
		["path", {
			d: "m3.34 7 1.73 1",
			key: "1ulond"
		}],
		["circle", {
			cx: "12",
			cy: "12",
			r: "2",
			key: "1c9p78"
		}],
		["circle", {
			cx: "12",
			cy: "12",
			r: "8",
			key: "46899m"
		}]
	]);
	const Coins = createLucideIcon("coins", [
		["circle", {
			cx: "8",
			cy: "8",
			r: "6",
			key: "3yglwk"
		}],
		["path", {
			d: "M18.09 10.37A6 6 0 1 1 10.34 18",
			key: "t5s6rm"
		}],
		["path", {
			d: "M7 6h1v4",
			key: "1obek4"
		}],
		["path", {
			d: "m16.71 13.88.7.71-2.82 2.82",
			key: "1rbuyh"
		}]
	]);
	const Coffee = createLucideIcon("coffee", [
		["path", {
			d: "M10 2v2",
			key: "7u0qdc"
		}],
		["path", {
			d: "M14 2v2",
			key: "6buw04"
		}],
		["path", {
			d: "M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1",
			key: "pwadti"
		}],
		["path", {
			d: "M6 2v2",
			key: "colzsn"
		}]
	]);
	const Columns2 = createLucideIcon("columns-2", [["rect", {
		width: "18",
		height: "18",
		x: "3",
		y: "3",
		rx: "2",
		key: "afitv7"
	}], ["path", {
		d: "M12 3v18",
		key: "108xh3"
	}]]);
	const Columns3Cog = createLucideIcon("columns-3-cog", [
		["path", {
			d: "M10.5 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5.5",
			key: "1g2yzs"
		}],
		["path", {
			d: "m14.3 19.6 1-.4",
			key: "11sv9r"
		}],
		["path", {
			d: "M15 3v7.5",
			key: "7lm50a"
		}],
		["path", {
			d: "m15.2 16.9-.9-.3",
			key: "1t7mvx"
		}],
		["path", {
			d: "m16.6 21.7.3-.9",
			key: "1j67ps"
		}],
		["path", {
			d: "m16.8 15.3-.4-1",
			key: "1ei7r6"
		}],
		["path", {
			d: "m19.1 15.2.3-.9",
			key: "18r7jp"
		}],
		["path", {
			d: "m19.6 21.7-.4-1",
			key: "z2vh2"
		}],
		["path", {
			d: "m20.7 16.8 1-.4",
			key: "19m87a"
		}],
		["path", {
			d: "m21.7 19.4-.9-.3",
			key: "1qgwi9"
		}],
		["path", {
			d: "M9 3v18",
			key: "fh3hqa"
		}],
		["circle", {
			cx: "18",
			cy: "18",
			r: "3",
			key: "1xkwt0"
		}]
	]);
	const Columns3 = createLucideIcon("columns-3", [
		["rect", {
			width: "18",
			height: "18",
			x: "3",
			y: "3",
			rx: "2",
			key: "afitv7"
		}],
		["path", {
			d: "M9 3v18",
			key: "fh3hqa"
		}],
		["path", {
			d: "M15 3v18",
			key: "14nvp0"
		}]
	]);
	const Columns4 = createLucideIcon("columns-4", [
		["rect", {
			width: "18",
			height: "18",
			x: "3",
			y: "3",
			rx: "2",
			key: "afitv7"
		}],
		["path", {
			d: "M7.5 3v18",
			key: "w0wo6v"
		}],
		["path", {
			d: "M12 3v18",
			key: "108xh3"
		}],
		["path", {
			d: "M16.5 3v18",
			key: "10tjh1"
		}]
	]);
	const Combine = createLucideIcon("combine", [
		["path", {
			d: "M14 3a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1",
			key: "1l7d7l"
		}],
		["path", {
			d: "M19 3a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1",
			key: "9955pe"
		}],
		["path", {
			d: "m7 15 3 3",
			key: "4hkfgk"
		}],
		["path", {
			d: "m7 21 3-3H5a2 2 0 0 1-2-2v-2",
			key: "1xljwe"
		}],
		["rect", {
			x: "14",
			y: "14",
			width: "7",
			height: "7",
			rx: "1",
			key: "1cdgtw"
		}],
		["rect", {
			x: "3",
			y: "3",
			width: "7",
			height: "7",
			rx: "1",
			key: "zi3rio"
		}]
	]);
	const Command = createLucideIcon("command", [["path", {
		d: "M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3",
		key: "11bfej"
	}]]);
	const Compass = createLucideIcon("compass", [["path", {
		d: "m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z",
		key: "9ktpf1"
	}], ["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}]]);
	const Component = createLucideIcon("component", [
		["path", {
			d: "M15.536 11.293a1 1 0 0 0 0 1.414l2.376 2.377a1 1 0 0 0 1.414 0l2.377-2.377a1 1 0 0 0 0-1.414l-2.377-2.377a1 1 0 0 0-1.414 0z",
			key: "1uwlt4"
		}],
		["path", {
			d: "M2.297 11.293a1 1 0 0 0 0 1.414l2.377 2.377a1 1 0 0 0 1.414 0l2.377-2.377a1 1 0 0 0 0-1.414L6.088 8.916a1 1 0 0 0-1.414 0z",
			key: "10291m"
		}],
		["path", {
			d: "M8.916 17.912a1 1 0 0 0 0 1.415l2.377 2.376a1 1 0 0 0 1.414 0l2.377-2.376a1 1 0 0 0 0-1.415l-2.377-2.376a1 1 0 0 0-1.414 0z",
			key: "1tqoq1"
		}],
		["path", {
			d: "M8.916 4.674a1 1 0 0 0 0 1.414l2.377 2.376a1 1 0 0 0 1.414 0l2.377-2.376a1 1 0 0 0 0-1.414l-2.377-2.377a1 1 0 0 0-1.414 0z",
			key: "1x6lto"
		}]
	]);
	const ConciergeBell = createLucideIcon("concierge-bell", [
		["path", {
			d: "M3 20a1 1 0 0 1-1-1v-1a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1Z",
			key: "1pvr1r"
		}],
		["path", {
			d: "M20 16a8 8 0 1 0-16 0",
			key: "1pa543"
		}],
		["path", {
			d: "M12 4v4",
			key: "1bq03y"
		}],
		["path", {
			d: "M10 4h4",
			key: "1xpv9s"
		}]
	]);
	const Computer = createLucideIcon("computer", [
		["rect", {
			width: "14",
			height: "8",
			x: "5",
			y: "2",
			rx: "2",
			key: "wc9tft"
		}],
		["rect", {
			width: "20",
			height: "8",
			x: "2",
			y: "14",
			rx: "2",
			key: "w68u3i"
		}],
		["path", {
			d: "M6 18h2",
			key: "rwmk9e"
		}],
		["path", {
			d: "M12 18h6",
			key: "aqd8w3"
		}]
	]);
	const Cone = createLucideIcon("cone", [["path", {
		d: "m20.9 18.55-8-15.98a1 1 0 0 0-1.8 0l-8 15.98",
		key: "53pte7"
	}], ["ellipse", {
		cx: "12",
		cy: "19",
		rx: "9",
		ry: "3",
		key: "1ji25f"
	}]]);
	const Construction = createLucideIcon("construction", [
		["rect", {
			x: "2",
			y: "6",
			width: "20",
			height: "8",
			rx: "1",
			key: "1estib"
		}],
		["path", {
			d: "M17 14v7",
			key: "7m2elx"
		}],
		["path", {
			d: "M7 14v7",
			key: "1cm7wv"
		}],
		["path", {
			d: "M17 3v3",
			key: "1v4jwn"
		}],
		["path", {
			d: "M7 3v3",
			key: "7o6guu"
		}],
		["path", {
			d: "M10 14 2.3 6.3",
			key: "1023jk"
		}],
		["path", {
			d: "m14 6 7.7 7.7",
			key: "1s8pl2"
		}],
		["path", {
			d: "m8 6 8 8",
			key: "hl96qh"
		}]
	]);
	const ContactRound = createLucideIcon("contact-round", [
		["path", {
			d: "M16 2v2",
			key: "scm5qe"
		}],
		["path", {
			d: "M17.915 22a6 6 0 0 0-12 0",
			key: "suqz9p"
		}],
		["path", {
			d: "M8 2v2",
			key: "pbkmx"
		}],
		["circle", {
			cx: "12",
			cy: "12",
			r: "4",
			key: "4exip2"
		}],
		["rect", {
			x: "3",
			y: "4",
			width: "18",
			height: "18",
			rx: "2",
			key: "12vinp"
		}]
	]);
	const Container = createLucideIcon("container", [
		["path", {
			d: "M22 7.7c0-.6-.4-1.2-.8-1.5l-6.3-3.9a1.72 1.72 0 0 0-1.7 0l-10.3 6c-.5.2-.9.8-.9 1.4v6.6c0 .5.4 1.2.8 1.5l6.3 3.9a1.72 1.72 0 0 0 1.7 0l10.3-6c.5-.3.9-1 .9-1.5Z",
			key: "1t2lqe"
		}],
		["path", {
			d: "M10 21.9V14L2.1 9.1",
			key: "o7czzq"
		}],
		["path", {
			d: "m10 14 11.9-6.9",
			key: "zm5e20"
		}],
		["path", {
			d: "M14 19.8v-8.1",
			key: "159ecu"
		}],
		["path", {
			d: "M18 17.5V9.4",
			key: "11uown"
		}]
	]);
	const Contrast = createLucideIcon("contrast", [["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}], ["path", {
		d: "M12 18a6 6 0 0 0 0-12v12z",
		key: "j4l70d"
	}]]);
	const Contact = createLucideIcon("contact", [
		["path", {
			d: "M16 2v2",
			key: "scm5qe"
		}],
		["path", {
			d: "M7 22v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2",
			key: "1waht3"
		}],
		["path", {
			d: "M8 2v2",
			key: "pbkmx"
		}],
		["circle", {
			cx: "12",
			cy: "11",
			r: "3",
			key: "itu57m"
		}],
		["rect", {
			x: "3",
			y: "4",
			width: "18",
			height: "18",
			rx: "2",
			key: "12vinp"
		}]
	]);
	const Cookie = createLucideIcon("cookie", [
		["path", {
			d: "M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5",
			key: "laymnq"
		}],
		["path", {
			d: "M8.5 8.5v.01",
			key: "ue8clq"
		}],
		["path", {
			d: "M16 15.5v.01",
			key: "14dtrp"
		}],
		["path", {
			d: "M12 12v.01",
			key: "u5ubse"
		}],
		["path", {
			d: "M11 17v.01",
			key: "1hyl5a"
		}],
		["path", {
			d: "M7 14v.01",
			key: "uct60s"
		}]
	]);
	const CookingPot = createLucideIcon("cooking-pot", [
		["path", {
			d: "M2 12h20",
			key: "9i4pu4"
		}],
		["path", {
			d: "M20 12v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8",
			key: "u0tga0"
		}],
		["path", {
			d: "m4 8 16-4",
			key: "16g0ng"
		}],
		["path", {
			d: "m8.86 6.78-.45-1.81a2 2 0 0 1 1.45-2.43l1.94-.48a2 2 0 0 1 2.43 1.46l.45 1.8",
			key: "12cejc"
		}]
	]);
	const CopyCheck = createLucideIcon("copy-check", [
		["path", {
			d: "m12 15 2 2 4-4",
			key: "2c609p"
		}],
		["rect", {
			width: "14",
			height: "14",
			x: "8",
			y: "8",
			rx: "2",
			ry: "2",
			key: "17jyea"
		}],
		["path", {
			d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",
			key: "zix9uf"
		}]
	]);
	const CopyMinus = createLucideIcon("copy-minus", [
		["line", {
			x1: "12",
			x2: "18",
			y1: "15",
			y2: "15",
			key: "1nscbv"
		}],
		["rect", {
			width: "14",
			height: "14",
			x: "8",
			y: "8",
			rx: "2",
			ry: "2",
			key: "17jyea"
		}],
		["path", {
			d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",
			key: "zix9uf"
		}]
	]);
	const CopyPlus = createLucideIcon("copy-plus", [
		["line", {
			x1: "15",
			x2: "15",
			y1: "12",
			y2: "18",
			key: "1p7wdc"
		}],
		["line", {
			x1: "12",
			x2: "18",
			y1: "15",
			y2: "15",
			key: "1nscbv"
		}],
		["rect", {
			width: "14",
			height: "14",
			x: "8",
			y: "8",
			rx: "2",
			ry: "2",
			key: "17jyea"
		}],
		["path", {
			d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",
			key: "zix9uf"
		}]
	]);
	const CopySlash = createLucideIcon("copy-slash", [
		["line", {
			x1: "12",
			x2: "18",
			y1: "18",
			y2: "12",
			key: "ebkxgr"
		}],
		["rect", {
			width: "14",
			height: "14",
			x: "8",
			y: "8",
			rx: "2",
			ry: "2",
			key: "17jyea"
		}],
		["path", {
			d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",
			key: "zix9uf"
		}]
	]);
	const CopyX = createLucideIcon("copy-x", [
		["line", {
			x1: "12",
			x2: "18",
			y1: "12",
			y2: "18",
			key: "1rg63v"
		}],
		["line", {
			x1: "12",
			x2: "18",
			y1: "18",
			y2: "12",
			key: "ebkxgr"
		}],
		["rect", {
			width: "14",
			height: "14",
			x: "8",
			y: "8",
			rx: "2",
			ry: "2",
			key: "17jyea"
		}],
		["path", {
			d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",
			key: "zix9uf"
		}]
	]);
	const Copyleft = createLucideIcon("copyleft", [["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}], ["path", {
		d: "M9.17 14.83a4 4 0 1 0 0-5.66",
		key: "1sveal"
	}]]);
	const Copy = createLucideIcon("copy", [["rect", {
		width: "14",
		height: "14",
		x: "8",
		y: "8",
		rx: "2",
		ry: "2",
		key: "17jyea"
	}], ["path", {
		d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",
		key: "zix9uf"
	}]]);
	const Copyright = createLucideIcon("copyright", [["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}], ["path", {
		d: "M14.83 14.83a4 4 0 1 1 0-5.66",
		key: "1i56pz"
	}]]);
	const CornerDownLeft = createLucideIcon("corner-down-left", [["path", {
		d: "M20 4v7a4 4 0 0 1-4 4H4",
		key: "6o5b7l"
	}], ["path", {
		d: "m9 10-5 5 5 5",
		key: "1kshq7"
	}]]);
	const CornerDownRight = createLucideIcon("corner-down-right", [["path", {
		d: "m15 10 5 5-5 5",
		key: "qqa56n"
	}], ["path", {
		d: "M4 4v7a4 4 0 0 0 4 4h12",
		key: "z08zvw"
	}]]);
	const CornerLeftDown = createLucideIcon("corner-left-down", [["path", {
		d: "m14 15-5 5-5-5",
		key: "1eia93"
	}], ["path", {
		d: "M20 4h-7a4 4 0 0 0-4 4v12",
		key: "nbpdq2"
	}]]);
	const CornerLeftUp = createLucideIcon("corner-left-up", [["path", {
		d: "M14 9 9 4 4 9",
		key: "1af5af"
	}], ["path", {
		d: "M20 20h-7a4 4 0 0 1-4-4V4",
		key: "1blwi3"
	}]]);
	const CornerRightDown = createLucideIcon("corner-right-down", [["path", {
		d: "m10 15 5 5 5-5",
		key: "1hpjnr"
	}], ["path", {
		d: "M4 4h7a4 4 0 0 1 4 4v12",
		key: "wcbgct"
	}]]);
	const CornerRightUp = createLucideIcon("corner-right-up", [["path", {
		d: "m10 9 5-5 5 5",
		key: "9ctzwi"
	}], ["path", {
		d: "M4 20h7a4 4 0 0 0 4-4V4",
		key: "1plgdj"
	}]]);
	const CornerUpLeft = createLucideIcon("corner-up-left", [["path", {
		d: "M20 20v-7a4 4 0 0 0-4-4H4",
		key: "1nkjon"
	}], ["path", {
		d: "M9 14 4 9l5-5",
		key: "102s5s"
	}]]);
	const CornerUpRight = createLucideIcon("corner-up-right", [["path", {
		d: "m15 14 5-5-5-5",
		key: "12vg1m"
	}], ["path", {
		d: "M4 20v-7a4 4 0 0 1 4-4h12",
		key: "1lu4f8"
	}]]);
	const Cpu = createLucideIcon("cpu", [
		["path", {
			d: "M12 20v2",
			key: "1lh1kg"
		}],
		["path", {
			d: "M12 2v2",
			key: "tus03m"
		}],
		["path", {
			d: "M17 20v2",
			key: "1rnc9c"
		}],
		["path", {
			d: "M17 2v2",
			key: "11trls"
		}],
		["path", {
			d: "M2 12h2",
			key: "1t8f8n"
		}],
		["path", {
			d: "M2 17h2",
			key: "7oei6x"
		}],
		["path", {
			d: "M2 7h2",
			key: "asdhe0"
		}],
		["path", {
			d: "M20 12h2",
			key: "1q8mjw"
		}],
		["path", {
			d: "M20 17h2",
			key: "1fpfkl"
		}],
		["path", {
			d: "M20 7h2",
			key: "1o8tra"
		}],
		["path", {
			d: "M7 20v2",
			key: "4gnj0m"
		}],
		["path", {
			d: "M7 2v2",
			key: "1i4yhu"
		}],
		["rect", {
			x: "4",
			y: "4",
			width: "16",
			height: "16",
			rx: "2",
			key: "1vbyd7"
		}],
		["rect", {
			x: "8",
			y: "8",
			width: "8",
			height: "8",
			rx: "1",
			key: "z9xiuo"
		}]
	]);
	const CreativeCommons = createLucideIcon("creative-commons", [
		["circle", {
			cx: "12",
			cy: "12",
			r: "10",
			key: "1mglay"
		}],
		["path", {
			d: "M10 9.3a2.8 2.8 0 0 0-3.5 1 3.1 3.1 0 0 0 0 3.4 2.7 2.7 0 0 0 3.5 1",
			key: "1ss3eq"
		}],
		["path", {
			d: "M17 9.3a2.8 2.8 0 0 0-3.5 1 3.1 3.1 0 0 0 0 3.4 2.7 2.7 0 0 0 3.5 1",
			key: "1od56t"
		}]
	]);
	const CreditCard = createLucideIcon("credit-card", [["rect", {
		width: "20",
		height: "14",
		x: "2",
		y: "5",
		rx: "2",
		key: "ynyp8z"
	}], ["line", {
		x1: "2",
		x2: "22",
		y1: "10",
		y2: "10",
		key: "1b3vmo"
	}]]);
	const Croissant = createLucideIcon("croissant", [
		["path", {
			d: "M10.2 18H4.774a1.5 1.5 0 0 1-1.352-.97 11 11 0 0 1 .132-6.487",
			key: "14kkz9"
		}],
		["path", {
			d: "M18 10.2V4.774a1.5 1.5 0 0 0-.97-1.352 11 11 0 0 0-6.486.132",
			key: "1g7v07"
		}],
		["path", {
			d: "M18 5a4 3 0 0 1 4 3 2 2 0 0 1-2 2 10 10 0 0 0-5.139 1.42",
			key: "ratg6b"
		}],
		["path", {
			d: "M5 18a3 4 0 0 0 3 4 2 2 0 0 0 2-2 10 10 0 0 1 1.42-5.14",
			key: "4454f0"
		}],
		["path", {
			d: "M8.709 2.554a10 10 0 0 0-6.155 6.155 1.5 1.5 0 0 0 .676 1.626l9.807 5.42a2 2 0 0 0 2.718-2.718l-5.42-9.807a1.5 1.5 0 0 0-1.626-.676",
			key: "qmemie"
		}]
	]);
	const Crop = createLucideIcon("crop", [["path", {
		d: "M6 2v14a2 2 0 0 0 2 2h14",
		key: "ron5a4"
	}], ["path", {
		d: "M18 22V8a2 2 0 0 0-2-2H2",
		key: "7s9ehn"
	}]]);
	const Cross = createLucideIcon("cross", [["path", {
		d: "M4 9a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h4a1 1 0 0 1 1 1v4a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-4a1 1 0 0 1 1-1h4a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-4a1 1 0 0 1-1-1V4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4a1 1 0 0 1-1 1z",
		key: "1xbrqy"
	}]]);
	const Crosshair = createLucideIcon("crosshair", [
		["circle", {
			cx: "12",
			cy: "12",
			r: "10",
			key: "1mglay"
		}],
		["line", {
			x1: "22",
			x2: "18",
			y1: "12",
			y2: "12",
			key: "l9bcsi"
		}],
		["line", {
			x1: "6",
			x2: "2",
			y1: "12",
			y2: "12",
			key: "13hhkx"
		}],
		["line", {
			x1: "12",
			x2: "12",
			y1: "6",
			y2: "2",
			key: "10w3f3"
		}],
		["line", {
			x1: "12",
			x2: "12",
			y1: "22",
			y2: "18",
			key: "15g9kq"
		}]
	]);
	const Crown = createLucideIcon("crown", [["path", {
		d: "M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z",
		key: "1vdc57"
	}], ["path", {
		d: "M5 21h14",
		key: "11awu3"
	}]]);
	const Cuboid = createLucideIcon("cuboid", [
		["path", {
			d: "m21.12 6.4-6.05-4.06a2 2 0 0 0-2.17-.05L2.95 8.41a2 2 0 0 0-.95 1.7v5.82a2 2 0 0 0 .88 1.66l6.05 4.07a2 2 0 0 0 2.17.05l9.95-6.12a2 2 0 0 0 .95-1.7V8.06a2 2 0 0 0-.88-1.66Z",
			key: "1u2ovd"
		}],
		["path", {
			d: "M10 22v-8L2.25 9.15",
			key: "11pn4q"
		}],
		["path", {
			d: "m10 14 11.77-6.87",
			key: "1kt1wh"
		}]
	]);
	const CupSoda = createLucideIcon("cup-soda", [
		["path", {
			d: "m6 8 1.75 12.28a2 2 0 0 0 2 1.72h4.54a2 2 0 0 0 2-1.72L18 8",
			key: "8166m8"
		}],
		["path", {
			d: "M5 8h14",
			key: "pcz4l3"
		}],
		["path", {
			d: "M7 15a6.47 6.47 0 0 1 5 0 6.47 6.47 0 0 0 5 0",
			key: "yjz344"
		}],
		["path", {
			d: "m12 8 1-6h2",
			key: "3ybfa4"
		}]
	]);
	const Currency = createLucideIcon("currency", [
		["circle", {
			cx: "12",
			cy: "12",
			r: "8",
			key: "46899m"
		}],
		["line", {
			x1: "3",
			x2: "6",
			y1: "3",
			y2: "6",
			key: "1jkytn"
		}],
		["line", {
			x1: "21",
			x2: "18",
			y1: "3",
			y2: "6",
			key: "14zfjt"
		}],
		["line", {
			x1: "3",
			x2: "6",
			y1: "21",
			y2: "18",
			key: "iusuec"
		}],
		["line", {
			x1: "21",
			x2: "18",
			y1: "21",
			y2: "18",
			key: "yj2dd7"
		}]
	]);
	const Cylinder = createLucideIcon("cylinder", [["ellipse", {
		cx: "12",
		cy: "5",
		rx: "9",
		ry: "3",
		key: "msslwz"
	}], ["path", {
		d: "M3 5v14a9 3 0 0 0 18 0V5",
		key: "aqi0yr"
	}]]);
	const Dam = createLucideIcon("dam", [
		["path", {
			d: "M11 11.31c1.17.56 1.54 1.69 3.5 1.69 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",
			key: "157kva"
		}],
		["path", {
			d: "M11.75 18c.35.5 1.45 1 2.75 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",
			key: "d7q6m6"
		}],
		["path", {
			d: "M2 10h4",
			key: "l0bgd4"
		}],
		["path", {
			d: "M2 14h4",
			key: "1gsvsf"
		}],
		["path", {
			d: "M2 18h4",
			key: "1bu2t1"
		}],
		["path", {
			d: "M2 6h4",
			key: "aawbzj"
		}],
		["path", {
			d: "M7 3a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1L10 4a1 1 0 0 0-1-1z",
			key: "pr6s65"
		}]
	]);
	const DatabaseBackup = createLucideIcon("database-backup", [
		["ellipse", {
			cx: "12",
			cy: "5",
			rx: "9",
			ry: "3",
			key: "msslwz"
		}],
		["path", {
			d: "M3 12a9 3 0 0 0 5 2.69",
			key: "1ui2ym"
		}],
		["path", {
			d: "M21 9.3V5",
			key: "6k6cib"
		}],
		["path", {
			d: "M3 5v14a9 3 0 0 0 6.47 2.88",
			key: "i62tjy"
		}],
		["path", {
			d: "M12 12v4h4",
			key: "1bxaet"
		}],
		["path", {
			d: "M13 20a5 5 0 0 0 9-3 4.5 4.5 0 0 0-4.5-4.5c-1.33 0-2.54.54-3.41 1.41L12 16",
			key: "1f4ei9"
		}]
	]);
	const DatabaseZap = createLucideIcon("database-zap", [
		["ellipse", {
			cx: "12",
			cy: "5",
			rx: "9",
			ry: "3",
			key: "msslwz"
		}],
		["path", {
			d: "M3 5V19A9 3 0 0 0 15 21.84",
			key: "14ibmq"
		}],
		["path", {
			d: "M21 5V8",
			key: "1marbg"
		}],
		["path", {
			d: "M21 12L18 17H22L19 22",
			key: "zafso"
		}],
		["path", {
			d: "M3 12A9 3 0 0 0 14.59 14.87",
			key: "1y4wr8"
		}]
	]);
	const Database = createLucideIcon("database", [
		["ellipse", {
			cx: "12",
			cy: "5",
			rx: "9",
			ry: "3",
			key: "msslwz"
		}],
		["path", {
			d: "M3 5V19A9 3 0 0 0 21 19V5",
			key: "1wlel7"
		}],
		["path", {
			d: "M3 12A9 3 0 0 0 21 12",
			key: "mv7ke4"
		}]
	]);
	const DecimalsArrowLeft = createLucideIcon("decimals-arrow-left", [
		["path", {
			d: "m13 21-3-3 3-3",
			key: "s3o1nf"
		}],
		["path", {
			d: "M20 18H10",
			key: "14r3mt"
		}],
		["path", {
			d: "M3 11h.01",
			key: "1eifu7"
		}],
		["rect", {
			x: "6",
			y: "3",
			width: "5",
			height: "8",
			rx: "2.5",
			key: "v9paqo"
		}]
	]);
	const DecimalsArrowRight = createLucideIcon("decimals-arrow-right", [
		["path", {
			d: "M10 18h10",
			key: "1y5s8o"
		}],
		["path", {
			d: "m17 21 3-3-3-3",
			key: "1ammt0"
		}],
		["path", {
			d: "M3 11h.01",
			key: "1eifu7"
		}],
		["rect", {
			x: "15",
			y: "3",
			width: "5",
			height: "8",
			rx: "2.5",
			key: "76md6a"
		}],
		["rect", {
			x: "6",
			y: "3",
			width: "5",
			height: "8",
			rx: "2.5",
			key: "v9paqo"
		}]
	]);
	const Delete = createLucideIcon("delete", [
		["path", {
			d: "M10 5a2 2 0 0 0-1.344.519l-6.328 5.74a1 1 0 0 0 0 1.481l6.328 5.741A2 2 0 0 0 10 19h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z",
			key: "1yo7s0"
		}],
		["path", {
			d: "m12 9 6 6",
			key: "anjzzh"
		}],
		["path", {
			d: "m18 9-6 6",
			key: "1fp51s"
		}]
	]);
	const Dessert = createLucideIcon("dessert", [
		["path", {
			d: "M10.162 3.167A10 10 0 0 0 2 13a2 2 0 0 0 4 0v-1a2 2 0 0 1 4 0v4a2 2 0 0 0 4 0v-4a2 2 0 0 1 4 0v1a2 2 0 0 0 4-.006 10 10 0 0 0-8.161-9.826",
			key: "xi88qy"
		}],
		["path", {
			d: "M20.804 14.869a9 9 0 0 1-17.608 0",
			key: "1r28rg"
		}],
		["circle", {
			cx: "12",
			cy: "4",
			r: "2",
			key: "muu5ef"
		}]
	]);
	const Diameter = createLucideIcon("diameter", [
		["circle", {
			cx: "19",
			cy: "19",
			r: "2",
			key: "17f5cg"
		}],
		["circle", {
			cx: "5",
			cy: "5",
			r: "2",
			key: "1gwv83"
		}],
		["path", {
			d: "M6.48 3.66a10 10 0 0 1 13.86 13.86",
			key: "xr8kdq"
		}],
		["path", {
			d: "m6.41 6.41 11.18 11.18",
			key: "uhpjw7"
		}],
		["path", {
			d: "M3.66 6.48a10 10 0 0 0 13.86 13.86",
			key: "cldpwv"
		}]
	]);
	const DiamondPercent = createLucideIcon("diamond-percent", [
		["path", {
			d: "M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41L13.7 2.71a2.41 2.41 0 0 0-3.41 0Z",
			key: "1tpxz2"
		}],
		["path", {
			d: "M9.2 9.2h.01",
			key: "1b7bvt"
		}],
		["path", {
			d: "m14.5 9.5-5 5",
			key: "17q4r4"
		}],
		["path", {
			d: "M14.7 14.8h.01",
			key: "17nsh4"
		}]
	]);
	const DiamondMinus = createLucideIcon("diamond-minus", [["path", {
		d: "M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41L13.7 2.71a2.41 2.41 0 0 0-3.41 0z",
		key: "1ey20j"
	}], ["path", {
		d: "M8 12h8",
		key: "1wcyev"
	}]]);
	const DiamondPlus = createLucideIcon("diamond-plus", [
		["path", {
			d: "M12 8v8",
			key: "napkw2"
		}],
		["path", {
			d: "M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41L13.7 2.71a2.41 2.41 0 0 0-3.41 0z",
			key: "1ey20j"
		}],
		["path", {
			d: "M8 12h8",
			key: "1wcyev"
		}]
	]);
	const Diamond = createLucideIcon("diamond", [["path", {
		d: "M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41l-7.59-7.59a2.41 2.41 0 0 0-3.41 0Z",
		key: "1f1r0c"
	}]]);
	const Dice1 = createLucideIcon("dice-1", [["rect", {
		width: "18",
		height: "18",
		x: "3",
		y: "3",
		rx: "2",
		ry: "2",
		key: "1m3agn"
	}], ["path", {
		d: "M12 12h.01",
		key: "1mp3jc"
	}]]);
	const Dice2 = createLucideIcon("dice-2", [
		["rect", {
			width: "18",
			height: "18",
			x: "3",
			y: "3",
			rx: "2",
			ry: "2",
			key: "1m3agn"
		}],
		["path", {
			d: "M15 9h.01",
			key: "x1ddxp"
		}],
		["path", {
			d: "M9 15h.01",
			key: "fzyn71"
		}]
	]);
	const Dice3 = createLucideIcon("dice-3", [
		["rect", {
			width: "18",
			height: "18",
			x: "3",
			y: "3",
			rx: "2",
			ry: "2",
			key: "1m3agn"
		}],
		["path", {
			d: "M16 8h.01",
			key: "cr5u4v"
		}],
		["path", {
			d: "M12 12h.01",
			key: "1mp3jc"
		}],
		["path", {
			d: "M8 16h.01",
			key: "18s6g9"
		}]
	]);
	const Dice5 = createLucideIcon("dice-5", [
		["rect", {
			width: "18",
			height: "18",
			x: "3",
			y: "3",
			rx: "2",
			ry: "2",
			key: "1m3agn"
		}],
		["path", {
			d: "M16 8h.01",
			key: "cr5u4v"
		}],
		["path", {
			d: "M8 8h.01",
			key: "1e4136"
		}],
		["path", {
			d: "M8 16h.01",
			key: "18s6g9"
		}],
		["path", {
			d: "M16 16h.01",
			key: "1f9h7w"
		}],
		["path", {
			d: "M12 12h.01",
			key: "1mp3jc"
		}]
	]);
	const Dice4 = createLucideIcon("dice-4", [
		["rect", {
			width: "18",
			height: "18",
			x: "3",
			y: "3",
			rx: "2",
			ry: "2",
			key: "1m3agn"
		}],
		["path", {
			d: "M16 8h.01",
			key: "cr5u4v"
		}],
		["path", {
			d: "M8 8h.01",
			key: "1e4136"
		}],
		["path", {
			d: "M8 16h.01",
			key: "18s6g9"
		}],
		["path", {
			d: "M16 16h.01",
			key: "1f9h7w"
		}]
	]);
	const Dice6 = createLucideIcon("dice-6", [
		["rect", {
			width: "18",
			height: "18",
			x: "3",
			y: "3",
			rx: "2",
			ry: "2",
			key: "1m3agn"
		}],
		["path", {
			d: "M16 8h.01",
			key: "cr5u4v"
		}],
		["path", {
			d: "M16 12h.01",
			key: "1l6xoz"
		}],
		["path", {
			d: "M16 16h.01",
			key: "1f9h7w"
		}],
		["path", {
			d: "M8 8h.01",
			key: "1e4136"
		}],
		["path", {
			d: "M8 12h.01",
			key: "czm47f"
		}],
		["path", {
			d: "M8 16h.01",
			key: "18s6g9"
		}]
	]);
	const Dices = createLucideIcon("dices", [
		["rect", {
			width: "12",
			height: "12",
			x: "2",
			y: "10",
			rx: "2",
			ry: "2",
			key: "6agr2n"
		}],
		["path", {
			d: "m17.92 14 3.5-3.5a2.24 2.24 0 0 0 0-3l-5-4.92a2.24 2.24 0 0 0-3 0L10 6",
			key: "1o487t"
		}],
		["path", {
			d: "M6 18h.01",
			key: "uhywen"
		}],
		["path", {
			d: "M10 14h.01",
			key: "ssrbsk"
		}],
		["path", {
			d: "M15 6h.01",
			key: "cblpky"
		}],
		["path", {
			d: "M18 9h.01",
			key: "2061c0"
		}]
	]);
	const Diff = createLucideIcon("diff", [
		["path", {
			d: "M12 3v14",
			key: "7cf3v8"
		}],
		["path", {
			d: "M5 10h14",
			key: "elsbfy"
		}],
		["path", {
			d: "M5 21h14",
			key: "11awu3"
		}]
	]);
	const Disc2 = createLucideIcon("disc-2", [
		["circle", {
			cx: "12",
			cy: "12",
			r: "10",
			key: "1mglay"
		}],
		["circle", {
			cx: "12",
			cy: "12",
			r: "4",
			key: "4exip2"
		}],
		["path", {
			d: "M12 12h.01",
			key: "1mp3jc"
		}]
	]);
	const Disc3 = createLucideIcon("disc-3", [
		["circle", {
			cx: "12",
			cy: "12",
			r: "10",
			key: "1mglay"
		}],
		["path", {
			d: "M6 12c0-1.7.7-3.2 1.8-4.2",
			key: "oqkarx"
		}],
		["circle", {
			cx: "12",
			cy: "12",
			r: "2",
			key: "1c9p78"
		}],
		["path", {
			d: "M18 12c0 1.7-.7 3.2-1.8 4.2",
			key: "1eah9h"
		}]
	]);
	const DiscAlbum = createLucideIcon("disc-album", [
		["rect", {
			width: "18",
			height: "18",
			x: "3",
			y: "3",
			rx: "2",
			key: "afitv7"
		}],
		["circle", {
			cx: "12",
			cy: "12",
			r: "5",
			key: "nd82uf"
		}],
		["path", {
			d: "M12 12h.01",
			key: "1mp3jc"
		}]
	]);
	const Disc = createLucideIcon("disc", [["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}], ["circle", {
		cx: "12",
		cy: "12",
		r: "2",
		key: "1c9p78"
	}]]);
	const Divide = createLucideIcon("divide", [
		["circle", {
			cx: "12",
			cy: "6",
			r: "1",
			key: "1bh7o1"
		}],
		["line", {
			x1: "5",
			x2: "19",
			y1: "12",
			y2: "12",
			key: "13b5wn"
		}],
		["circle", {
			cx: "12",
			cy: "18",
			r: "1",
			key: "lqb9t5"
		}]
	]);
	const DnaOff = createLucideIcon("dna-off", [
		["path", {
			d: "M15 2c-1.35 1.5-2.092 3-2.5 4.5L14 8",
			key: "1bivrr"
		}],
		["path", {
			d: "m17 6-2.891-2.891",
			key: "xu6p2f"
		}],
		["path", {
			d: "M2 15c3.333-3 6.667-3 10-3",
			key: "nxix30"
		}],
		["path", {
			d: "m2 2 20 20",
			key: "1ooewy"
		}],
		["path", {
			d: "m20 9 .891.891",
			key: "3xwk7g"
		}],
		["path", {
			d: "M22 9c-1.5 1.35-3 2.092-4.5 2.5l-1-1",
			key: "18cutr"
		}],
		["path", {
			d: "M3.109 14.109 4 15",
			key: "q76aoh"
		}],
		["path", {
			d: "m6.5 12.5 1 1",
			key: "cs35ky"
		}],
		["path", {
			d: "m7 18 2.891 2.891",
			key: "1sisit"
		}],
		["path", {
			d: "M9 22c1.35-1.5 2.092-3 2.5-4.5L10 16",
			key: "rlvei3"
		}]
	]);
	const Dna = createLucideIcon("dna", [
		["path", {
			d: "m10 16 1.5 1.5",
			key: "11lckj"
		}],
		["path", {
			d: "m14 8-1.5-1.5",
			key: "1ohn8i"
		}],
		["path", {
			d: "M15 2c-1.798 1.998-2.518 3.995-2.807 5.993",
			key: "80uv8i"
		}],
		["path", {
			d: "m16.5 10.5 1 1",
			key: "696xn5"
		}],
		["path", {
			d: "m17 6-2.891-2.891",
			key: "xu6p2f"
		}],
		["path", {
			d: "M2 15c6.667-6 13.333 0 20-6",
			key: "1pyr53"
		}],
		["path", {
			d: "m20 9 .891.891",
			key: "3xwk7g"
		}],
		["path", {
			d: "M3.109 14.109 4 15",
			key: "q76aoh"
		}],
		["path", {
			d: "m6.5 12.5 1 1",
			key: "cs35ky"
		}],
		["path", {
			d: "m7 18 2.891 2.891",
			key: "1sisit"
		}],
		["path", {
			d: "M9 22c1.798-1.998 2.518-3.995 2.807-5.993",
			key: "q3hbxp"
		}]
	]);
	const Dock = createLucideIcon("dock", [
		["path", {
			d: "M2 8h20",
			key: "d11cs7"
		}],
		["rect", {
			width: "20",
			height: "16",
			x: "2",
			y: "4",
			rx: "2",
			key: "18n3k1"
		}],
		["path", {
			d: "M6 16h12",
			key: "u522kt"
		}]
	]);
	const Dog = createLucideIcon("dog", [
		["path", {
			d: "M11.25 16.25h1.5L12 17z",
			key: "w7jh35"
		}],
		["path", {
			d: "M16 14v.5",
			key: "1lajdz"
		}],
		["path", {
			d: "M4.42 11.247A13.152 13.152 0 0 0 4 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444a11.702 11.702 0 0 0-.493-3.309",
			key: "u7s9ue"
		}],
		["path", {
			d: "M8 14v.5",
			key: "1nzgdb"
		}],
		["path", {
			d: "M8.5 8.5c-.384 1.05-1.083 2.028-2.344 2.5-1.931.722-3.576-.297-3.656-1-.113-.994 1.177-6.53 4-7 1.923-.321 3.651.845 3.651 2.235A7.497 7.497 0 0 1 14 5.277c0-1.39 1.844-2.598 3.767-2.277 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.855-1.45-2.239-2.5",
			key: "v8hric"
		}]
	]);
	const DollarSign = createLucideIcon("dollar-sign", [["line", {
		x1: "12",
		x2: "12",
		y1: "2",
		y2: "22",
		key: "7eqyqh"
	}], ["path", {
		d: "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
		key: "1b0p4s"
	}]]);
	const Donut = createLucideIcon("donut", [["path", {
		d: "M20.5 10a2.5 2.5 0 0 1-2.4-3H18a2.95 2.95 0 0 1-2.6-4.4 10 10 0 1 0 6.3 7.1c-.3.2-.8.3-1.2.3",
		key: "19sr3x"
	}], ["circle", {
		cx: "12",
		cy: "12",
		r: "3",
		key: "1v7zrd"
	}]]);
	const DoorClosedLocked = createLucideIcon("door-closed-locked", [
		["path", {
			d: "M10 12h.01",
			key: "1kxr2c"
		}],
		["path", {
			d: "M18 9V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14",
			key: "1bnhmg"
		}],
		["path", {
			d: "M2 20h8",
			key: "10ntw1"
		}],
		["path", {
			d: "M20 17v-2a2 2 0 1 0-4 0v2",
			key: "pwaxnr"
		}],
		["rect", {
			x: "14",
			y: "17",
			width: "8",
			height: "5",
			rx: "1",
			key: "15pjcy"
		}]
	]);
	const DoorClosed = createLucideIcon("door-closed", [
		["path", {
			d: "M10 12h.01",
			key: "1kxr2c"
		}],
		["path", {
			d: "M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14",
			key: "36qu9e"
		}],
		["path", {
			d: "M2 20h20",
			key: "owomy5"
		}]
	]);
	const Dot = createLucideIcon("dot", [["circle", {
		cx: "12.1",
		cy: "12.1",
		r: "1",
		key: "18d7e5"
	}]]);
	const Download = createLucideIcon("download", [
		["path", {
			d: "M12 15V3",
			key: "m9g1x1"
		}],
		["path", {
			d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",
			key: "ih7n3h"
		}],
		["path", {
			d: "m7 10 5 5 5-5",
			key: "brsn70"
		}]
	]);
	const DoorOpen = createLucideIcon("door-open", [
		["path", {
			d: "M11 20H2",
			key: "nlcfvz"
		}],
		["path", {
			d: "M11 4.562v16.157a1 1 0 0 0 1.242.97L19 20V5.562a2 2 0 0 0-1.515-1.94l-4-1A2 2 0 0 0 11 4.561z",
			key: "au4z13"
		}],
		["path", {
			d: "M11 4H8a2 2 0 0 0-2 2v14",
			key: "74r1mk"
		}],
		["path", {
			d: "M14 12h.01",
			key: "1jfl7z"
		}],
		["path", {
			d: "M22 20h-3",
			key: "vhrsz"
		}]
	]);
	const DraftingCompass = createLucideIcon("drafting-compass", [
		["path", {
			d: "m12.99 6.74 1.93 3.44",
			key: "iwagvd"
		}],
		["path", {
			d: "M19.136 12a10 10 0 0 1-14.271 0",
			key: "ppmlo4"
		}],
		["path", {
			d: "m21 21-2.16-3.84",
			key: "vylbct"
		}],
		["path", {
			d: "m3 21 8.02-14.26",
			key: "1ssaw4"
		}],
		["circle", {
			cx: "12",
			cy: "5",
			r: "2",
			key: "f1ur92"
		}]
	]);
	const Drama = createLucideIcon("drama", [
		["path", {
			d: "M10 11h.01",
			key: "d2at3l"
		}],
		["path", {
			d: "M14 6h.01",
			key: "k028ub"
		}],
		["path", {
			d: "M18 6h.01",
			key: "1v4wsw"
		}],
		["path", {
			d: "M6.5 13.1h.01",
			key: "1748ia"
		}],
		["path", {
			d: "M22 5c0 9-4 12-6 12s-6-3-6-12c0-2 2-3 6-3s6 1 6 3",
			key: "172yzv"
		}],
		["path", {
			d: "M17.4 9.9c-.8.8-2 .8-2.8 0",
			key: "1obv0w"
		}],
		["path", {
			d: "M10.1 7.1C9 7.2 7.7 7.7 6 8.6c-3.5 2-4.7 3.9-3.7 5.6 4.5 7.8 9.5 8.4 11.2 7.4.9-.5 1.9-2.1 1.9-4.7",
			key: "rqjl8i"
		}],
		["path", {
			d: "M9.1 16.5c.3-1.1 1.4-1.7 2.4-1.4",
			key: "1mr6wy"
		}]
	]);
	const Dribbble = createLucideIcon("dribbble", [
		["circle", {
			cx: "12",
			cy: "12",
			r: "10",
			key: "1mglay"
		}],
		["path", {
			d: "M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94",
			key: "hpej1"
		}],
		["path", {
			d: "M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32",
			key: "1tr44o"
		}],
		["path", {
			d: "M8.56 2.75c4.37 6 6 9.42 8 17.72",
			key: "kbh691"
		}]
	]);
	const Drill = createLucideIcon("drill", [
		["path", {
			d: "M10 18a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H5a3 3 0 0 1-3-3 1 1 0 0 1 1-1z",
			key: "ioqxb1"
		}],
		["path", {
			d: "M13 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1l-.81 3.242a1 1 0 0 1-.97.758H8",
			key: "1rs59n"
		}],
		["path", {
			d: "M14 4h3a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-3",
			key: "105ega"
		}],
		["path", {
			d: "M18 6h4",
			key: "66u95g"
		}],
		["path", {
			d: "m5 10-2 8",
			key: "xt2lic"
		}],
		["path", {
			d: "m7 18 2-8",
			key: "1bzku2"
		}]
	]);
	const Drone = createLucideIcon("drone", [
		["path", {
			d: "M10 10 7 7",
			key: "zp14k7"
		}],
		["path", {
			d: "m10 14-3 3",
			key: "1jrpxk"
		}],
		["path", {
			d: "m14 10 3-3",
			key: "7tigam"
		}],
		["path", {
			d: "m14 14 3 3",
			key: "vm23p3"
		}],
		["path", {
			d: "M14.205 4.139a4 4 0 1 1 5.439 5.863",
			key: "1tm5p2"
		}],
		["path", {
			d: "M19.637 14a4 4 0 1 1-5.432 5.868",
			key: "16egi2"
		}],
		["path", {
			d: "M4.367 10a4 4 0 1 1 5.438-5.862",
			key: "1wta6a"
		}],
		["path", {
			d: "M9.795 19.862a4 4 0 1 1-5.429-5.873",
			key: "q39hpv"
		}],
		["rect", {
			x: "10",
			y: "8",
			width: "4",
			height: "8",
			rx: "1",
			key: "phrjt1"
		}]
	]);
	const DropletOff = createLucideIcon("droplet-off", [
		["path", {
			d: "M18.715 13.186C18.29 11.858 17.384 10.607 16 9.5c-2-1.6-3.5-4-4-6.5a10.7 10.7 0 0 1-.884 2.586",
			key: "8suz2t"
		}],
		["path", {
			d: "m2 2 20 20",
			key: "1ooewy"
		}],
		["path", {
			d: "M8.795 8.797A11 11 0 0 1 8 9.5C6 11.1 5 13 5 15a7 7 0 0 0 13.222 3.208",
			key: "19dw9m"
		}]
	]);
	const Droplet = createLucideIcon("droplet", [["path", {
		d: "M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z",
		key: "c7niix"
	}]]);
	const Droplets = createLucideIcon("droplets", [["path", {
		d: "M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z",
		key: "1ptgy4"
	}], ["path", {
		d: "M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97",
		key: "1sl1rz"
	}]]);
	const Drum = createLucideIcon("drum", [
		["path", {
			d: "m2 2 8 8",
			key: "1v6059"
		}],
		["path", {
			d: "m22 2-8 8",
			key: "173r8a"
		}],
		["ellipse", {
			cx: "12",
			cy: "9",
			rx: "10",
			ry: "5",
			key: "liohsx"
		}],
		["path", {
			d: "M7 13.4v7.9",
			key: "1yi6u9"
		}],
		["path", {
			d: "M12 14v8",
			key: "1tn2tj"
		}],
		["path", {
			d: "M17 13.4v7.9",
			key: "eqz2v3"
		}],
		["path", {
			d: "M2 9v8a10 5 0 0 0 20 0V9",
			key: "1750ul"
		}]
	]);
	const Drumstick = createLucideIcon("drumstick", [["path", {
		d: "M15.4 15.63a7.875 6 135 1 1 6.23-6.23 4.5 3.43 135 0 0-6.23 6.23",
		key: "1dtqwm"
	}], ["path", {
		d: "m8.29 12.71-2.6 2.6a2.5 2.5 0 1 0-1.65 4.65A2.5 2.5 0 1 0 8.7 18.3l2.59-2.59",
		key: "1oq1fw"
	}]]);
	const Dumbbell = createLucideIcon("dumbbell", [
		["path", {
			d: "M17.596 12.768a2 2 0 1 0 2.829-2.829l-1.768-1.767a2 2 0 0 0 2.828-2.829l-2.828-2.828a2 2 0 0 0-2.829 2.828l-1.767-1.768a2 2 0 1 0-2.829 2.829z",
			key: "9m4mmf"
		}],
		["path", {
			d: "m2.5 21.5 1.4-1.4",
			key: "17g3f0"
		}],
		["path", {
			d: "m20.1 3.9 1.4-1.4",
			key: "1qn309"
		}],
		["path", {
			d: "M5.343 21.485a2 2 0 1 0 2.829-2.828l1.767 1.768a2 2 0 1 0 2.829-2.829l-6.364-6.364a2 2 0 1 0-2.829 2.829l1.768 1.767a2 2 0 0 0-2.828 2.829z",
			key: "1t2c92"
		}],
		["path", {
			d: "m9.6 14.4 4.8-4.8",
			key: "6umqxw"
		}]
	]);
	const EarOff = createLucideIcon("ear-off", [
		["path", {
			d: "M6 18.5a3.5 3.5 0 1 0 7 0c0-1.57.92-2.52 2.04-3.46",
			key: "1qngmn"
		}],
		["path", {
			d: "M6 8.5c0-.75.13-1.47.36-2.14",
			key: "b06bma"
		}],
		["path", {
			d: "M8.8 3.15A6.5 6.5 0 0 1 19 8.5c0 1.63-.44 2.81-1.09 3.76",
			key: "g10hsz"
		}],
		["path", {
			d: "M12.5 6A2.5 2.5 0 0 1 15 8.5M10 13a2 2 0 0 0 1.82-1.18",
			key: "ygzou7"
		}],
		["line", {
			x1: "2",
			x2: "22",
			y1: "2",
			y2: "22",
			key: "a6p6uj"
		}]
	]);
	const Ear = createLucideIcon("ear", [["path", {
		d: "M6 8.5a6.5 6.5 0 1 1 13 0c0 6-6 6-6 10a3.5 3.5 0 1 1-7 0",
		key: "1dfaln"
	}], ["path", {
		d: "M15 8.5a2.5 2.5 0 0 0-5 0v1a2 2 0 1 1 0 4",
		key: "1qnva7"
	}]]);
	const EarthLock = createLucideIcon("earth-lock", [
		["path", {
			d: "M7 3.34V5a3 3 0 0 0 3 3",
			key: "w732o8"
		}],
		["path", {
			d: "M11 21.95V18a2 2 0 0 0-2-2 2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05",
			key: "f02343"
		}],
		["path", {
			d: "M21.54 15H17a2 2 0 0 0-2 2v4.54",
			key: "1djwo0"
		}],
		["path", {
			d: "M12 2a10 10 0 1 0 9.54 13",
			key: "zjsr6q"
		}],
		["path", {
			d: "M20 6V4a2 2 0 1 0-4 0v2",
			key: "1of5e8"
		}],
		["rect", {
			width: "8",
			height: "5",
			x: "14",
			y: "6",
			rx: "1",
			key: "1fmf51"
		}]
	]);
	const Earth = createLucideIcon("earth", [
		["path", {
			d: "M21.54 15H17a2 2 0 0 0-2 2v4.54",
			key: "1djwo0"
		}],
		["path", {
			d: "M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17",
			key: "1tzkfa"
		}],
		["path", {
			d: "M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05",
			key: "14pb5j"
		}],
		["circle", {
			cx: "12",
			cy: "12",
			r: "10",
			key: "1mglay"
		}]
	]);
	const Eclipse = createLucideIcon("eclipse", [["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}], ["path", {
		d: "M12 2a7 7 0 1 0 10 10",
		key: "1yuj32"
	}]]);
	const EggFried = createLucideIcon("egg-fried", [["circle", {
		cx: "11.5",
		cy: "12.5",
		r: "3.5",
		key: "1cl1mi"
	}], ["path", {
		d: "M3 8c0-3.5 2.5-6 6.5-6 5 0 4.83 3 7.5 5s5 2 5 6c0 4.5-2.5 6.5-7 6.5-2.5 0-2.5 2.5-6 2.5s-7-2-7-5.5c0-3 1.5-3 1.5-5C3.5 10 3 9 3 8Z",
		key: "165ef9"
	}]]);
	const EggOff = createLucideIcon("egg-off", [
		["path", {
			d: "m2 2 20 20",
			key: "1ooewy"
		}],
		["path", {
			d: "M20 14.347V14c0-6-4-12-8-12-1.078 0-2.157.436-3.157 1.19",
			key: "13g2jy"
		}],
		["path", {
			d: "M6.206 6.21C4.871 8.4 4 11.2 4 14a8 8 0 0 0 14.568 4.568",
			key: "1581id"
		}]
	]);
	const Egg = createLucideIcon("egg", [["path", {
		d: "M12 2C8 2 4 8 4 14a8 8 0 0 0 16 0c0-6-4-12-8-12",
		key: "1le142"
	}]]);
	const EllipsisVertical = createLucideIcon("ellipsis-vertical", [
		["circle", {
			cx: "12",
			cy: "12",
			r: "1",
			key: "41hilf"
		}],
		["circle", {
			cx: "12",
			cy: "5",
			r: "1",
			key: "gxeob9"
		}],
		["circle", {
			cx: "12",
			cy: "19",
			r: "1",
			key: "lyex9k"
		}]
	]);
	const Ellipsis = createLucideIcon("ellipsis", [
		["circle", {
			cx: "12",
			cy: "12",
			r: "1",
			key: "41hilf"
		}],
		["circle", {
			cx: "19",
			cy: "12",
			r: "1",
			key: "1wjl8i"
		}],
		["circle", {
			cx: "5",
			cy: "12",
			r: "1",
			key: "1pcz8c"
		}]
	]);
	const EqualApproximately = createLucideIcon("equal-approximately", [["path", {
		d: "M5 15a6.5 6.5 0 0 1 7 0 6.5 6.5 0 0 0 7 0",
		key: "yrdkhy"
	}], ["path", {
		d: "M5 9a6.5 6.5 0 0 1 7 0 6.5 6.5 0 0 0 7 0",
		key: "gzkvyz"
	}]]);
	const Equal = createLucideIcon("equal", [["line", {
		x1: "5",
		x2: "19",
		y1: "9",
		y2: "9",
		key: "1nwqeh"
	}], ["line", {
		x1: "5",
		x2: "19",
		y1: "15",
		y2: "15",
		key: "g8yjpy"
	}]]);
	const EqualNot = createLucideIcon("equal-not", [
		["line", {
			x1: "5",
			x2: "19",
			y1: "9",
			y2: "9",
			key: "1nwqeh"
		}],
		["line", {
			x1: "5",
			x2: "19",
			y1: "15",
			y2: "15",
			key: "g8yjpy"
		}],
		["line", {
			x1: "19",
			x2: "5",
			y1: "5",
			y2: "19",
			key: "1x9vlm"
		}]
	]);
	const Eraser = createLucideIcon("eraser", [["path", {
		d: "M21 21H8a2 2 0 0 1-1.42-.587l-3.994-3.999a2 2 0 0 1 0-2.828l10-10a2 2 0 0 1 2.829 0l5.999 6a2 2 0 0 1 0 2.828L12.834 21",
		key: "g5wo59"
	}], ["path", {
		d: "m5.082 11.09 8.828 8.828",
		key: "1wx5vj"
	}]]);
	const EthernetPort = createLucideIcon("ethernet-port", [
		["path", {
			d: "m15 20 3-3h2a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h2l3 3z",
			key: "rbahqx"
		}],
		["path", {
			d: "M6 8v1",
			key: "1636ez"
		}],
		["path", {
			d: "M10 8v1",
			key: "1talb4"
		}],
		["path", {
			d: "M14 8v1",
			key: "1rsfgr"
		}],
		["path", {
			d: "M18 8v1",
			key: "gnkwox"
		}]
	]);
	const Euro = createLucideIcon("euro", [
		["path", {
			d: "M4 10h12",
			key: "1y6xl8"
		}],
		["path", {
			d: "M4 14h9",
			key: "1loblj"
		}],
		["path", {
			d: "M19 6a7.7 7.7 0 0 0-5.2-2A7.9 7.9 0 0 0 6 12c0 4.4 3.5 8 7.8 8 2 0 3.8-.8 5.2-2",
			key: "1j6lzo"
		}]
	]);
	const EvCharger = createLucideIcon("ev-charger", [
		["path", {
			d: "M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 4 0v-6.998a2 2 0 0 0-.59-1.42L18 5",
			key: "1wtuz0"
		}],
		["path", {
			d: "M14 21V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v16",
			key: "e09ifn"
		}],
		["path", {
			d: "M2 21h13",
			key: "1x0fut"
		}],
		["path", {
			d: "M3 7h11",
			key: "19efrr"
		}],
		["path", {
			d: "m9 11-2 3h3l-2 3",
			key: "lmzxi1"
		}]
	]);
	const Expand = createLucideIcon("expand", [
		["path", {
			d: "m15 15 6 6",
			key: "1s409w"
		}],
		["path", {
			d: "m15 9 6-6",
			key: "ko1vev"
		}],
		["path", {
			d: "M21 16v5h-5",
			key: "1ck2sf"
		}],
		["path", {
			d: "M21 8V3h-5",
			key: "1qoq8a"
		}],
		["path", {
			d: "M3 16v5h5",
			key: "1t08am"
		}],
		["path", {
			d: "m3 21 6-6",
			key: "wwnumi"
		}],
		["path", {
			d: "M3 8V3h5",
			key: "1ln10m"
		}],
		["path", {
			d: "M9 9 3 3",
			key: "v551iv"
		}]
	]);
	const ExternalLink = createLucideIcon("external-link", [
		["path", {
			d: "M15 3h6v6",
			key: "1q9fwt"
		}],
		["path", {
			d: "M10 14 21 3",
			key: "gplh6r"
		}],
		["path", {
			d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",
			key: "a6xqqp"
		}]
	]);
	const EyeClosed = createLucideIcon("eye-closed", [
		["path", {
			d: "m15 18-.722-3.25",
			key: "1j64jw"
		}],
		["path", {
			d: "M2 8a10.645 10.645 0 0 0 20 0",
			key: "1e7gxb"
		}],
		["path", {
			d: "m20 15-1.726-2.05",
			key: "1cnuld"
		}],
		["path", {
			d: "m4 15 1.726-2.05",
			key: "1dsqqd"
		}],
		["path", {
			d: "m9 18 .722-3.25",
			key: "ypw2yx"
		}]
	]);
	const EyeOff = createLucideIcon("eye-off", [
		["path", {
			d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",
			key: "ct8e1f"
		}],
		["path", {
			d: "M14.084 14.158a3 3 0 0 1-4.242-4.242",
			key: "151rxh"
		}],
		["path", {
			d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",
			key: "13bj9a"
		}],
		["path", {
			d: "m2 2 20 20",
			key: "1ooewy"
		}]
	]);
	const Eye = createLucideIcon("eye", [["path", {
		d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
		key: "1nclc0"
	}], ["circle", {
		cx: "12",
		cy: "12",
		r: "3",
		key: "1v7zrd"
	}]]);
	const Facebook = createLucideIcon("facebook", [["path", {
		d: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
		key: "1jg4f8"
	}]]);
	const Factory = createLucideIcon("factory", [
		["path", {
			d: "M12 16h.01",
			key: "1drbdi"
		}],
		["path", {
			d: "M16 16h.01",
			key: "1f9h7w"
		}],
		["path", {
			d: "M3 19a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.5a.5.5 0 0 0-.769-.422l-4.462 2.844A.5.5 0 0 1 15 10.5v-2a.5.5 0 0 0-.769-.422L9.77 10.922A.5.5 0 0 1 9 10.5V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z",
			key: "1iv0i2"
		}],
		["path", {
			d: "M8 16h.01",
			key: "18s6g9"
		}]
	]);
	const Fan = createLucideIcon("fan", [["path", {
		d: "M10.827 16.379a6.082 6.082 0 0 1-8.618-7.002l5.412 1.45a6.082 6.082 0 0 1 7.002-8.618l-1.45 5.412a6.082 6.082 0 0 1 8.618 7.002l-5.412-1.45a6.082 6.082 0 0 1-7.002 8.618l1.45-5.412Z",
		key: "484a7f"
	}], ["path", {
		d: "M12 12v.01",
		key: "u5ubse"
	}]]);
	const Feather = createLucideIcon("feather", [
		["path", {
			d: "M12.67 19a2 2 0 0 0 1.416-.588l6.154-6.172a6 6 0 0 0-8.49-8.49L5.586 9.914A2 2 0 0 0 5 11.328V18a1 1 0 0 0 1 1z",
			key: "18jl4k"
		}],
		["path", {
			d: "M16 8 2 22",
			key: "vp34q"
		}],
		["path", {
			d: "M17.5 15H9",
			key: "1oz8nu"
		}]
	]);
	const FastForward = createLucideIcon("fast-forward", [["path", {
		d: "M12 6a2 2 0 0 1 3.414-1.414l6 6a2 2 0 0 1 0 2.828l-6 6A2 2 0 0 1 12 18z",
		key: "b19h5q"
	}], ["path", {
		d: "M2 6a2 2 0 0 1 3.414-1.414l6 6a2 2 0 0 1 0 2.828l-6 6A2 2 0 0 1 2 18z",
		key: "h7h5ge"
	}]]);
	const Fence = createLucideIcon("fence", [
		["path", {
			d: "M4 3 2 5v15c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V5Z",
			key: "1n2rgs"
		}],
		["path", {
			d: "M6 8h4",
			key: "utf9t1"
		}],
		["path", {
			d: "M6 18h4",
			key: "12yh4b"
		}],
		["path", {
			d: "m12 3-2 2v15c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V5Z",
			key: "3ha7mj"
		}],
		["path", {
			d: "M14 8h4",
			key: "1r8wg2"
		}],
		["path", {
			d: "M14 18h4",
			key: "1t3kbu"
		}],
		["path", {
			d: "m20 3-2 2v15c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V5Z",
			key: "dfd4e2"
		}]
	]);
	const FerrisWheel = createLucideIcon("ferris-wheel", [
		["circle", {
			cx: "12",
			cy: "12",
			r: "2",
			key: "1c9p78"
		}],
		["path", {
			d: "M12 2v4",
			key: "3427ic"
		}],
		["path", {
			d: "m6.8 15-3.5 2",
			key: "hjy98k"
		}],
		["path", {
			d: "m20.7 7-3.5 2",
			key: "f08gto"
		}],
		["path", {
			d: "M6.8 9 3.3 7",
			key: "1aevh4"
		}],
		["path", {
			d: "m20.7 17-3.5-2",
			key: "1liqo3"
		}],
		["path", {
			d: "m9 22 3-8 3 8",
			key: "wees03"
		}],
		["path", {
			d: "M8 22h8",
			key: "rmew8v"
		}],
		["path", {
			d: "M18 18.7a9 9 0 1 0-12 0",
			key: "dhzg4g"
		}]
	]);
	const Figma = createLucideIcon("figma", [
		["path", {
			d: "M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z",
			key: "1340ok"
		}],
		["path", {
			d: "M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z",
			key: "1hz3m3"
		}],
		["path", {
			d: "M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z",
			key: "1oz8n2"
		}],
		["path", {
			d: "M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z",
			key: "1ff65i"
		}],
		["path", {
			d: "M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z",
			key: "pdip6e"
		}]
	]);
	const FileArchive = createLucideIcon("file-archive", [
		["path", {
			d: "M10 12v-1",
			key: "v7bkov"
		}],
		["path", {
			d: "M10 18v-2",
			key: "1cjy8d"
		}],
		["path", {
			d: "M10 7V6",
			key: "dljcrl"
		}],
		["path", {
			d: "M14 2v4a2 2 0 0 0 2 2h4",
			key: "tnqrlb"
		}],
		["path", {
			d: "M15.5 22H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v16a2 2 0 0 0 .274 1.01",
			key: "gkbcor"
		}],
		["circle", {
			cx: "10",
			cy: "20",
			r: "2",
			key: "1xzdoj"
		}]
	]);
	const FileAudio = createLucideIcon("file-audio", [
		["path", {
			d: "M17.5 22h.5a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3",
			key: "rslqgf"
		}],
		["path", {
			d: "M14 2v4a2 2 0 0 0 2 2h4",
			key: "tnqrlb"
		}],
		["path", {
			d: "M2 19a2 2 0 1 1 4 0v1a2 2 0 1 1-4 0v-4a6 6 0 0 1 12 0v4a2 2 0 1 1-4 0v-1a2 2 0 1 1 4 0",
			key: "9f7x3i"
		}]
	]);
	const FileAudio2 = createLucideIcon("file-audio-2", [
		["path", {
			d: "M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v2",
			key: "17k7jt"
		}],
		["path", {
			d: "M14 2v4a2 2 0 0 0 2 2h4",
			key: "tnqrlb"
		}],
		["circle", {
			cx: "3",
			cy: "17",
			r: "1",
			key: "vo6nti"
		}],
		["path", {
			d: "M2 17v-3a4 4 0 0 1 8 0v3",
			key: "1ggdre"
		}],
		["circle", {
			cx: "9",
			cy: "17",
			r: "1",
			key: "bc1fq4"
		}]
	]);
	const FileAxis3d = createLucideIcon("file-axis-3d", [
		["path", {
			d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",
			key: "1rqfz7"
		}],
		["path", {
			d: "M14 2v4a2 2 0 0 0 2 2h4",
			key: "tnqrlb"
		}],
		["path", {
			d: "m8 18 4-4",
			key: "12zab0"
		}],
		["path", {
			d: "M8 10v8h8",
			key: "tlaukw"
		}]
	]);
	const FileBadge2 = createLucideIcon("file-badge-2", [
		["path", {
			d: "m13.69 12.479 1.29 4.88a.5.5 0 0 1-.697.591l-1.844-.849a1 1 0 0 0-.88.001l-1.846.85a.5.5 0 0 1-.693-.593l1.29-4.88",
			key: "7a4gmr"
		}],
		["path", {
			d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z",
			key: "1mlx9k"
		}],
		["circle", {
			cx: "12",
			cy: "10",
			r: "3",
			key: "ilqhr7"
		}]
	]);
	const FileBadge = createLucideIcon("file-badge", [
		["path", {
			d: "M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3.072",
			key: "n6s66f"
		}],
		["path", {
			d: "M14 2v4a2 2 0 0 0 2 2h4",
			key: "tnqrlb"
		}],
		["path", {
			d: "m6.69 16.479 1.29 4.88a.5.5 0 0 1-.698.591l-1.843-.849a1 1 0 0 0-.88.001l-1.846.85a.5.5 0 0 1-.693-.593l1.29-4.88",
			key: "1e6yvx"
		}],
		["circle", {
			cx: "5",
			cy: "14",
			r: "3",
			key: "ufru5t"
		}]
	]);
	const FileBox = createLucideIcon("file-box", [
		["path", {
			d: "M14.5 22H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4",
			key: "16lz6z"
		}],
		["path", {
			d: "M14 2v4a2 2 0 0 0 2 2h4",
			key: "tnqrlb"
		}],
		["path", {
			d: "M3 13.1a2 2 0 0 0-1 1.76v3.24a2 2 0 0 0 .97 1.78L6 21.7a2 2 0 0 0 2.03.01L11 19.9a2 2 0 0 0 1-1.76V14.9a2 2 0 0 0-.97-1.78L8 11.3a2 2 0 0 0-2.03-.01Z",
			key: "99pj1s"
		}],
		["path", {
			d: "M7 17v5",
			key: "1yj1jh"
		}],
		["path", {
			d: "M11.7 14.2 7 17l-4.7-2.8",
			key: "1yk8tc"
		}]
	]);
	const FileChartColumnIncreasing = createLucideIcon("file-chart-column-increasing", [
		["path", {
			d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",
			key: "1rqfz7"
		}],
		["path", {
			d: "M14 2v4a2 2 0 0 0 2 2h4",
			key: "tnqrlb"
		}],
		["path", {
			d: "M8 18v-2",
			key: "qcmpov"
		}],
		["path", {
			d: "M12 18v-4",
			key: "q1q25u"
		}],
		["path", {
			d: "M16 18v-6",
			key: "15y0np"
		}]
	]);
	const FileChartColumn = createLucideIcon("file-chart-column", [
		["path", {
			d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",
			key: "1rqfz7"
		}],
		["path", {
			d: "M14 2v4a2 2 0 0 0 2 2h4",
			key: "tnqrlb"
		}],
		["path", {
			d: "M8 18v-1",
			key: "zg0ygc"
		}],
		["path", {
			d: "M12 18v-6",
			key: "17g6i2"
		}],
		["path", {
			d: "M16 18v-3",
			key: "j5jt4h"
		}]
	]);
	const FileChartLine = createLucideIcon("file-chart-line", [
		["path", {
			d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",
			key: "1rqfz7"
		}],
		["path", {
			d: "M14 2v4a2 2 0 0 0 2 2h4",
			key: "tnqrlb"
		}],
		["path", {
			d: "m16 13-3.5 3.5-2-2L8 17",
			key: "zz7yod"
		}]
	]);
	const FileChartPie = createLucideIcon("file-chart-pie", [
		["path", {
			d: "M14 2v4a2 2 0 0 0 2 2h4",
			key: "tnqrlb"
		}],
		["path", {
			d: "M16 22h2a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3.5",
			key: "13ddob"
		}],
		["path", {
			d: "M4.017 11.512a6 6 0 1 0 8.466 8.475",
			key: "s6vs5t"
		}],
		["path", {
			d: "M9 16a1 1 0 0 1-1-1v-4c0-.552.45-1.008.995-.917a6 6 0 0 1 4.922 4.922c.091.544-.365.995-.917.995z",
			key: "1dl6s6"
		}]
	]);
	const FileCheck2 = createLucideIcon("file-check-2", [
		["path", {
			d: "M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4",
			key: "1pf5j1"
		}],
		["path", {
			d: "M14 2v4a2 2 0 0 0 2 2h4",
			key: "tnqrlb"
		}],
		["path", {
			d: "m3 15 2 2 4-4",
			key: "1lhrkk"
		}]
	]);
	const FileCheck = createLucideIcon("file-check", [
		["path", {
			d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",
			key: "1rqfz7"
		}],
		["path", {
			d: "M14 2v4a2 2 0 0 0 2 2h4",
			key: "tnqrlb"
		}],
		["path", {
			d: "m9 15 2 2 4-4",
			key: "1grp1n"
		}]
	]);
	const FileClock = createLucideIcon("file-clock", [
		["path", {
			d: "M14 2v4a2 2 0 0 0 2 2h4",
			key: "tnqrlb"
		}],
		["path", {
			d: "M16 22h2a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3",
			key: "37hlfg"
		}],
		["path", {
			d: "M8 14v2.2l1.6 1",
			key: "6m4bie"
		}],
		["circle", {
			cx: "8",
			cy: "16",
			r: "6",
			key: "10v15b"
		}]
	]);
	const FileCode2 = createLucideIcon("file-code-2", [
		["path", {
			d: "M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4",
			key: "1pf5j1"
		}],
		["path", {
			d: "M14 2v4a2 2 0 0 0 2 2h4",
			key: "tnqrlb"
		}],
		["path", {
			d: "m5 12-3 3 3 3",
			key: "oke12k"
		}],
		["path", {
			d: "m9 18 3-3-3-3",
			key: "112psh"
		}]
	]);
	const FileCode = createLucideIcon("file-code", [
		["path", {
			d: "M10 12.5 8 15l2 2.5",
			key: "1tg20x"
		}],
		["path", {
			d: "m14 12.5 2 2.5-2 2.5",
			key: "yinavb"
		}],
		["path", {
			d: "M14 2v4a2 2 0 0 0 2 2h4",
			key: "tnqrlb"
		}],
		["path", {
			d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z",
			key: "1mlx9k"
		}]
	]);
	const FileCog = createLucideIcon("file-cog", [
		["path", {
			d: "M14 2v4a2 2 0 0 0 2 2h4",
			key: "tnqrlb"
		}],
		["path", {
			d: "m2.305 15.53.923-.382",
			key: "yfp9st"
		}],
		["path", {
			d: "m3.228 12.852-.924-.383",
			key: "bckynb"
		}],
		["path", {
			d: "M4.677 21.5a2 2 0 0 0 1.313.5H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v2.5",
			key: "1yo3oz"
		}],
		["path", {
			d: "m4.852 11.228-.383-.923",
			key: "1j88i9"
		}],
		["path", {
			d: "m4.852 16.772-.383.924",
			key: "sag1dv"
		}],
		["path", {
			d: "m7.148 11.228.383-.923",
			key: "rj39hk"
		}],
		["path", {
			d: "m7.53 17.696-.382-.924",
			key: "1uu5cs"
		}],
		["path", {
			d: "m8.772 12.852.923-.383",
			key: "13811l"
		}],
		["path", {
			d: "m8.772 15.148.923.383",
			key: "z1a5l0"
		}],
		["circle", {
			cx: "6",
			cy: "14",
			r: "3",
			key: "a1xfv6"
		}]
	]);
	const FileDiff = createLucideIcon("file-diff", [
		["path", {
			d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",
			key: "1rqfz7"
		}],
		["path", {
			d: "M9 10h6",
			key: "9gxzsh"
		}],
		["path", {
			d: "M12 13V7",
			key: "h0r20n"
		}],
		["path", {
			d: "M9 17h6",
			key: "r8uit2"
		}]
	]);
	const FileDigit = createLucideIcon("file-digit", [
		["path", {
			d: "M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4",
			key: "1pf5j1"
		}],
		["path", {
			d: "M14 2v4a2 2 0 0 0 2 2h4",
			key: "tnqrlb"
		}],
		["rect", {
			width: "4",
			height: "6",
			x: "2",
			y: "12",
			rx: "2",
			key: "jm304g"
		}],
		["path", {
			d: "M10 12h2v6",
			key: "12zw74"
		}],
		["path", {
			d: "M10 18h4",
			key: "1ulq68"
		}]
	]);
	const FileDown = createLucideIcon("file-down", [
		["path", {
			d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",
			key: "1rqfz7"
		}],
		["path", {
			d: "M14 2v4a2 2 0 0 0 2 2h4",
			key: "tnqrlb"
		}],
		["path", {
			d: "M12 18v-6",
			key: "17g6i2"
		}],
		["path", {
			d: "m9 15 3 3 3-3",
			key: "1npd3o"
		}]
	]);
	const FileHeart = createLucideIcon("file-heart", [
		["path", {
			d: "M14 2v4a2 2 0 0 0 2 2h4",
			key: "tnqrlb"
		}],
		["path", {
			d: "M2.62 13.8A2.25 2.25 0 1 1 6 10.836a2.25 2.25 0 1 1 3.38 2.966l-2.626 2.856a.998.998 0 0 1-1.507 0z",
			key: "1cfqzq"
		}],
		["path", {
			d: "M4 6.005V4a2 2 0 0 1 2-2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-1.9-1.376",
			key: "gjdjhc"
		}]
	]);
	const FileImage = createLucideIcon("file-image", [
		["path", {
			d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",
			key: "1rqfz7"
		}],
		["path", {
			d: "M14 2v4a2 2 0 0 0 2 2h4",
			key: "tnqrlb"
		}],
		["circle", {
			cx: "10",
			cy: "12",
			r: "2",
			key: "737tya"
		}],
		["path", {
			d: "m20 17-1.296-1.296a2.41 2.41 0 0 0-3.408 0L9 22",
			key: "wt3hpn"
		}]
	]);
	const FileInput = createLucideIcon("file-input", [
		["path", {
			d: "M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4",
			key: "1pf5j1"
		}],
		["path", {
			d: "M14 2v4a2 2 0 0 0 2 2h4",
			key: "tnqrlb"
		}],
		["path", {
			d: "M2 15h10",
			key: "jfw4w8"
		}],
		["path", {
			d: "m9 18 3-3-3-3",
			key: "112psh"
		}]
	]);
	const FileJson2 = createLucideIcon("file-json-2", [
		["path", {
			d: "M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4",
			key: "1pf5j1"
		}],
		["path", {
			d: "M14 2v4a2 2 0 0 0 2 2h4",
			key: "tnqrlb"
		}],
		["path", {
			d: "M4 12a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1 1 1 0 0 1 1 1v1a1 1 0 0 0 1 1",
			key: "fq0c9t"
		}],
		["path", {
			d: "M8 18a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-1a1 1 0 0 0-1-1",
			key: "4gibmv"
		}]
	]);
	const FileJson = createLucideIcon("file-json", [
		["path", {
			d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",
			key: "1rqfz7"
		}],
		["path", {
			d: "M14 2v4a2 2 0 0 0 2 2h4",
			key: "tnqrlb"
		}],
		["path", {
			d: "M10 12a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1 1 1 0 0 1 1 1v1a1 1 0 0 0 1 1",
			key: "1oajmo"
		}],
		["path", {
			d: "M14 18a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-1a1 1 0 0 0-1-1",
			key: "mpwhp6"
		}]
	]);
	const FileKey2 = createLucideIcon("file-key-2", [
		["path", {
			d: "M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v6",
			key: "rc0qvx"
		}],
		["path", {
			d: "M14 2v4a2 2 0 0 0 2 2h4",
			key: "tnqrlb"
		}],
		["circle", {
			cx: "4",
			cy: "16",
			r: "2",
			key: "1ehqvc"
		}],
		["path", {
			d: "m10 10-4.5 4.5",
			key: "7fwrp6"
		}],
		["path", {
			d: "m9 11 1 1",
			key: "wa6s5q"
		}]
	]);
	const FileKey = createLucideIcon("file-key", [
		["path", {
			d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",
			key: "1rqfz7"
		}],
		["circle", {
			cx: "10",
			cy: "16",
			r: "2",
			key: "4ckbqe"
		}],
		["path", {
			d: "m16 10-4.5 4.5",
			key: "7p3ebg"
		}],
		["path", {
			d: "m15 11 1 1",
			key: "1bsyx3"
		}]
	]);
	const FileLock2 = createLucideIcon("file-lock-2", [
		["path", {
			d: "M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v1",
			key: "jmtmu2"
		}],
		["path", {
			d: "M14 2v4a2 2 0 0 0 2 2h4",
			key: "tnqrlb"
		}],
		["rect", {
			width: "8",
			height: "5",
			x: "2",
			y: "13",
			rx: "1",
			key: "10y5wo"
		}],
		["path", {
			d: "M8 13v-2a2 2 0 1 0-4 0v2",
			key: "1pdxzg"
		}]
	]);
	const FileMinus2 = createLucideIcon("file-minus-2", [
		["path", {
			d: "M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4",
			key: "1pf5j1"
		}],
		["path", {
			d: "M14 2v4a2 2 0 0 0 2 2h4",
			key: "tnqrlb"
		}],
		["path", {
			d: "M3 15h6",
			key: "4e2qda"
		}]
	]);
	const FileLock = createLucideIcon("file-lock", [
		["path", {
			d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",
			key: "1rqfz7"
		}],
		["rect", {
			width: "8",
			height: "6",
			x: "8",
			y: "12",
			rx: "1",
			key: "3yr8at"
		}],
		["path", {
			d: "M10 12v-2a2 2 0 1 1 4 0v2",
			key: "j4i8d"
		}]
	]);
	const FileMinus = createLucideIcon("file-minus", [
		["path", {
			d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",
			key: "1rqfz7"
		}],
		["path", {
			d: "M14 2v4a2 2 0 0 0 2 2h4",
			key: "tnqrlb"
		}],
		["path", {
			d: "M9 15h6",
			key: "cctwl0"
		}]
	]);
	const FileMusic = createLucideIcon("file-music", [
		["path", {
			d: "M10.5 22H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v8.4",
			key: "1d3kfm"
		}],
		["path", {
			d: "M8 18v-7.7L16 9v7",
			key: "1oie6o"
		}],
		["circle", {
			cx: "14",
			cy: "16",
			r: "2",
			key: "1bzzi3"
		}],
		["circle", {
			cx: "6",
			cy: "18",
			r: "2",
			key: "1fncim"
		}]
	]);
	const FileOutput = createLucideIcon("file-output", [
		["path", {
			d: "M14 2v4a2 2 0 0 0 2 2h4",
			key: "tnqrlb"
		}],
		["path", {
			d: "M4 7V4a2 2 0 0 1 2-2 2 2 0 0 0-2 2",
			key: "1vk7w2"
		}],
		["path", {
			d: "M4.063 20.999a2 2 0 0 0 2 1L18 22a2 2 0 0 0 2-2V7l-5-5H6",
			key: "1jink5"
		}],
		["path", {
			d: "m5 11-3 3",
			key: "1dgrs4"
		}],
		["path", {
			d: "m5 17-3-3h10",
			key: "1mvvaf"
		}]
	]);
	const FilePenLine = createLucideIcon("file-pen-line", [
		["path", {
			d: "m18 5-2.414-2.414A2 2 0 0 0 14.172 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2",
			key: "142zxg"
		}],
		["path", {
			d: "M21.378 12.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z",
			key: "2t3380"
		}],
		["path", {
			d: "M8 18h1",
			key: "13wk12"
		}]
	]);
	const FilePen = createLucideIcon("file-pen", [
		["path", {
			d: "M12.5 22H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v9.5",
			key: "1couwa"
		}],
		["path", {
			d: "M14 2v4a2 2 0 0 0 2 2h4",
			key: "tnqrlb"
		}],
		["path", {
			d: "M13.378 15.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z",
			key: "1y4qbx"
		}]
	]);
	const FilePlus2 = createLucideIcon("file-plus-2", [
		["path", {
			d: "M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4",
			key: "1pf5j1"
		}],
		["path", {
			d: "M14 2v4a2 2 0 0 0 2 2h4",
			key: "tnqrlb"
		}],
		["path", {
			d: "M3 15h6",
			key: "4e2qda"
		}],
		["path", {
			d: "M6 12v6",
			key: "1u72j0"
		}]
	]);
	const FilePlus = createLucideIcon("file-plus", [
		["path", {
			d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",
			key: "1rqfz7"
		}],
		["path", {
			d: "M14 2v4a2 2 0 0 0 2 2h4",
			key: "tnqrlb"
		}],
		["path", {
			d: "M9 15h6",
			key: "cctwl0"
		}],
		["path", {
			d: "M12 18v-6",
			key: "17g6i2"
		}]
	]);
	const FilePlay = createLucideIcon("file-play", [
		["path", {
			d: "M14 2v4a2 2 0 0 0 2 2h4",
			key: "tnqrlb"
		}],
		["path", {
			d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z",
			key: "1mlx9k"
		}],
		["path", {
			d: "M15.033 13.44a.647.647 0 0 1 0 1.12l-4.065 2.352a.645.645 0 0 1-.968-.56v-4.704a.645.645 0 0 1 .967-.56z",
			key: "1tzo1f"
		}]
	]);
	const FileQuestionMark = createLucideIcon("file-question-mark", [
		["path", {
			d: "M12 17h.01",
			key: "p32p05"
		}],
		["path", {
			d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z",
			key: "1mlx9k"
		}],
		["path", {
			d: "M9.1 9a3 3 0 0 1 5.82 1c0 2-3 3-3 3",
			key: "mhlwft"
		}]
	]);
	const FileScan = createLucideIcon("file-scan", [
		["path", {
			d: "M20 10V7l-5-5H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h4",
			key: "1rdf37"
		}],
		["path", {
			d: "M14 2v4a2 2 0 0 0 2 2h4",
			key: "tnqrlb"
		}],
		["path", {
			d: "M16 14a2 2 0 0 0-2 2",
			key: "ceaadl"
		}],
		["path", {
			d: "M20 14a2 2 0 0 1 2 2",
			key: "1ny6zw"
		}],
		["path", {
			d: "M20 22a2 2 0 0 0 2-2",
			key: "1l9q4k"
		}],
		["path", {
			d: "M16 22a2 2 0 0 1-2-2",
			key: "1wqh5n"
		}]
	]);
	const FileSearch2 = createLucideIcon("file-search-2", [
		["path", {
			d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",
			key: "1rqfz7"
		}],
		["path", {
			d: "M14 2v4a2 2 0 0 0 2 2h4",
			key: "tnqrlb"
		}],
		["circle", {
			cx: "11.5",
			cy: "14.5",
			r: "2.5",
			key: "1bq0ko"
		}],
		["path", {
			d: "M13.3 16.3 15 18",
			key: "2quom7"
		}]
	]);
	const FileSearch = createLucideIcon("file-search", [
		["path", {
			d: "M14 2v4a2 2 0 0 0 2 2h4",
			key: "tnqrlb"
		}],
		["path", {
			d: "M4.268 21a2 2 0 0 0 1.727 1H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3",
			key: "ms7g94"
		}],
		["path", {
			d: "m9 18-1.5-1.5",
			key: "1j6qii"
		}],
		["circle", {
			cx: "5",
			cy: "14",
			r: "3",
			key: "ufru5t"
		}]
	]);
	const FileSliders = createLucideIcon("file-sliders", [
		["path", {
			d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",
			key: "1rqfz7"
		}],
		["path", {
			d: "M14 2v4a2 2 0 0 0 2 2h4",
			key: "tnqrlb"
		}],
		["path", {
			d: "M8 12h8",
			key: "1wcyev"
		}],
		["path", {
			d: "M10 11v2",
			key: "1s651w"
		}],
		["path", {
			d: "M8 17h8",
			key: "wh5c61"
		}],
		["path", {
			d: "M14 16v2",
			key: "12fp5e"
		}]
	]);
	const FileSpreadsheet = createLucideIcon("file-spreadsheet", [
		["path", {
			d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",
			key: "1rqfz7"
		}],
		["path", {
			d: "M14 2v4a2 2 0 0 0 2 2h4",
			key: "tnqrlb"
		}],
		["path", {
			d: "M8 13h2",
			key: "yr2amv"
		}],
		["path", {
			d: "M14 13h2",
			key: "un5t4a"
		}],
		["path", {
			d: "M8 17h2",
			key: "2yhykz"
		}],
		["path", {
			d: "M14 17h2",
			key: "10kma7"
		}]
	]);
	const FileStack = createLucideIcon("file-stack", [
		["path", {
			d: "M11 21a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1",
			key: "likhh7"
		}],
		["path", {
			d: "M16 16a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1",
			key: "17ky3x"
		}],
		["path", {
			d: "M21 6a2 2 0 0 0-.586-1.414l-2-2A2 2 0 0 0 17 2h-3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1z",
			key: "1hyeo0"
		}]
	]);
	const FileSymlink = createLucideIcon("file-symlink", [
		["path", {
			d: "m10 18 3-3-3-3",
			key: "18f6ys"
		}],
		["path", {
			d: "M14 2v4a2 2 0 0 0 2 2h4",
			key: "tnqrlb"
		}],
		["path", {
			d: "M4 11V4a2 2 0 0 1 2-2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h7",
			key: "50q2rw"
		}]
	]);
	const FileTerminal = createLucideIcon("file-terminal", [
		["path", {
			d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",
			key: "1rqfz7"
		}],
		["path", {
			d: "M14 2v4a2 2 0 0 0 2 2h4",
			key: "tnqrlb"
		}],
		["path", {
			d: "m8 16 2-2-2-2",
			key: "10vzyd"
		}],
		["path", {
			d: "M12 18h4",
			key: "1wd2n7"
		}]
	]);
	const FileText = createLucideIcon("file-text", [
		["path", {
			d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",
			key: "1rqfz7"
		}],
		["path", {
			d: "M14 2v4a2 2 0 0 0 2 2h4",
			key: "tnqrlb"
		}],
		["path", {
			d: "M10 9H8",
			key: "b1mrlr"
		}],
		["path", {
			d: "M16 13H8",
			key: "t4e002"
		}],
		["path", {
			d: "M16 17H8",
			key: "z1uh3a"
		}]
	]);
	const FileType2 = createLucideIcon("file-type-2", [
		["path", {
			d: "M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4",
			key: "1pf5j1"
		}],
		["path", {
			d: "M14 2v4a2 2 0 0 0 2 2h4",
			key: "tnqrlb"
		}],
		["path", {
			d: "M2 13v-1h6v1",
			key: "1dh9dg"
		}],
		["path", {
			d: "M5 12v6",
			key: "150t9c"
		}],
		["path", {
			d: "M4 18h2",
			key: "1xrofg"
		}]
	]);
	const FileType = createLucideIcon("file-type", [
		["path", {
			d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",
			key: "1rqfz7"
		}],
		["path", {
			d: "M14 2v4a2 2 0 0 0 2 2h4",
			key: "tnqrlb"
		}],
		["path", {
			d: "M9 13v-1h6v1",
			key: "1bb014"
		}],
		["path", {
			d: "M12 12v6",
			key: "3ahymv"
		}],
		["path", {
			d: "M11 18h2",
			key: "12mj7e"
		}]
	]);
	const FileUp = createLucideIcon("file-up", [
		["path", {
			d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",
			key: "1rqfz7"
		}],
		["path", {
			d: "M14 2v4a2 2 0 0 0 2 2h4",
			key: "tnqrlb"
		}],
		["path", {
			d: "M12 12v6",
			key: "3ahymv"
		}],
		["path", {
			d: "m15 15-3-3-3 3",
			key: "15xj92"
		}]
	]);
	const FileUser = createLucideIcon("file-user", [
		["path", {
			d: "M14 2v4a2 2 0 0 0 2 2h4",
			key: "tnqrlb"
		}],
		["path", {
			d: "M15 18a3 3 0 1 0-6 0",
			key: "16awa0"
		}],
		["path", {
			d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z",
			key: "1mlx9k"
		}],
		["circle", {
			cx: "12",
			cy: "13",
			r: "2",
			key: "1c1ljs"
		}]
	]);
	const FileVideoCamera = createLucideIcon("file-video-camera", [
		["path", {
			d: "M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4",
			key: "1pf5j1"
		}],
		["path", {
			d: "M14 2v4a2 2 0 0 0 2 2h4",
			key: "tnqrlb"
		}],
		["rect", {
			width: "8",
			height: "6",
			x: "2",
			y: "12",
			rx: "1",
			key: "1a6c1e"
		}],
		["path", {
			d: "m10 13.843 3.033-1.755a.645.645 0 0 1 .967.56v4.704a.645.645 0 0 1-.967.56L10 16.157",
			key: "vd9ei0"
		}]
	]);
	const FileVolume = createLucideIcon("file-volume", [
		["path", {
			d: "M11 11a5 5 0 0 1 0 6",
			key: "193qb2"
		}],
		["path", {
			d: "M14 2v4a2 2 0 0 0 2 2h4",
			key: "tnqrlb"
		}],
		["path", {
			d: "M4 6.765V4a2 2 0 0 1 2-2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-.93-.23",
			key: "ifyjnl"
		}],
		["path", {
			d: "M7 10.51a.5.5 0 0 0-.826-.38l-1.893 1.628A1 1 0 0 1 3.63 12H2.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h1.129a1 1 0 0 1 .652.242l1.893 1.63a.5.5 0 0 0 .826-.38z",
			key: "mk8rxu"
		}]
	]);
	const FileVolume2 = createLucideIcon("file-volume-2", [
		["path", {
			d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",
			key: "1rqfz7"
		}],
		["path", {
			d: "M14 2v4a2 2 0 0 0 2 2h4",
			key: "tnqrlb"
		}],
		["path", {
			d: "M8 15h.01",
			key: "a7atzg"
		}],
		["path", {
			d: "M11.5 13.5a2.5 2.5 0 0 1 0 3",
			key: "1fccat"
		}],
		["path", {
			d: "M15 12a5 5 0 0 1 0 6",
			key: "ps46cm"
		}]
	]);
	const FileWarning = createLucideIcon("file-warning", [
		["path", {
			d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",
			key: "1rqfz7"
		}],
		["path", {
			d: "M12 9v4",
			key: "juzpu7"
		}],
		["path", {
			d: "M12 17h.01",
			key: "p32p05"
		}]
	]);
	const FileX2 = createLucideIcon("file-x-2", [
		["path", {
			d: "M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4",
			key: "1pf5j1"
		}],
		["path", {
			d: "M14 2v4a2 2 0 0 0 2 2h4",
			key: "tnqrlb"
		}],
		["path", {
			d: "m8 12.5-5 5",
			key: "b853mi"
		}],
		["path", {
			d: "m3 12.5 5 5",
			key: "1qls4r"
		}]
	]);
	const FileX = createLucideIcon("file-x", [
		["path", {
			d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",
			key: "1rqfz7"
		}],
		["path", {
			d: "M14 2v4a2 2 0 0 0 2 2h4",
			key: "tnqrlb"
		}],
		["path", {
			d: "m14.5 12.5-5 5",
			key: "b62r18"
		}],
		["path", {
			d: "m9.5 12.5 5 5",
			key: "1rk7el"
		}]
	]);
	const Files = createLucideIcon("files", [
		["path", {
			d: "M15 2a2 2 0 0 1 1.414.586l4 4A2 2 0 0 1 21 8v7a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z",
			key: "1vo8kb"
		}],
		["path", {
			d: "M15 2v4a2 2 0 0 0 2 2h4",
			key: "sud9ri"
		}],
		["path", {
			d: "M5 7a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h8a2 2 0 0 0 1.732-1",
			key: "l4dndm"
		}]
	]);
	const Film = createLucideIcon("film", [
		["rect", {
			width: "18",
			height: "18",
			x: "3",
			y: "3",
			rx: "2",
			key: "afitv7"
		}],
		["path", {
			d: "M7 3v18",
			key: "bbkbws"
		}],
		["path", {
			d: "M3 7.5h4",
			key: "zfgn84"
		}],
		["path", {
			d: "M3 12h18",
			key: "1i2n21"
		}],
		["path", {
			d: "M3 16.5h4",
			key: "1230mu"
		}],
		["path", {
			d: "M17 3v18",
			key: "in4fa5"
		}],
		["path", {
			d: "M17 7.5h4",
			key: "myr1c1"
		}],
		["path", {
			d: "M17 16.5h4",
			key: "go4c1d"
		}]
	]);
	const File = createLucideIcon("file", [["path", {
		d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",
		key: "1rqfz7"
	}], ["path", {
		d: "M14 2v4a2 2 0 0 0 2 2h4",
		key: "tnqrlb"
	}]]);
	const Fingerprint = createLucideIcon("fingerprint", [
		["path", {
			d: "M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4",
			key: "1nerag"
		}],
		["path", {
			d: "M14 13.12c0 2.38 0 6.38-1 8.88",
			key: "o46ks0"
		}],
		["path", {
			d: "M17.29 21.02c.12-.6.43-2.3.5-3.02",
			key: "ptglia"
		}],
		["path", {
			d: "M2 12a10 10 0 0 1 18-6",
			key: "ydlgp0"
		}],
		["path", {
			d: "M2 16h.01",
			key: "1gqxmh"
		}],
		["path", {
			d: "M21.8 16c.2-2 .131-5.354 0-6",
			key: "drycrb"
		}],
		["path", {
			d: "M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2",
			key: "1tidbn"
		}],
		["path", {
			d: "M8.65 22c.21-.66.45-1.32.57-2",
			key: "13wd9y"
		}],
		["path", {
			d: "M9 6.8a6 6 0 0 1 9 5.2v2",
			key: "1fr1j5"
		}]
	]);
	const FishOff = createLucideIcon("fish-off", [
		["path", {
			d: "M18 12.47v.03m0-.5v.47m-.475 5.056A6.744 6.744 0 0 1 15 18c-3.56 0-7.56-2.53-8.5-6 .348-1.28 1.114-2.433 2.121-3.38m3.444-2.088A8.802 8.802 0 0 1 15 6c3.56 0 6.06 2.54 7 6-.309 1.14-.786 2.177-1.413 3.058",
			key: "1j1hse"
		}],
		["path", {
			d: "M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 1.5-1 5 .23 6.5-1.24 1.5-1.24 5-.23 6.5C5.58 18.03 7 16 7 13.33m7.48-4.372A9.77 9.77 0 0 1 16 6.07m0 11.86a9.77 9.77 0 0 1-1.728-3.618",
			key: "1q46z8"
		}],
		["path", {
			d: "m16.01 17.93-.23 1.4A2 2 0 0 1 13.8 21H9.5a5.96 5.96 0 0 0 1.49-3.98M8.53 3h5.27a2 2 0 0 1 1.98 1.67l.23 1.4M2 2l20 20",
			key: "1407gh"
		}]
	]);
	const FireExtinguisher = createLucideIcon("fire-extinguisher", [
		["path", {
			d: "M15 6.5V3a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3.5",
			key: "sqyvz"
		}],
		["path", {
			d: "M9 18h8",
			key: "i7pszb"
		}],
		["path", {
			d: "M18 3h-3",
			key: "7idoqj"
		}],
		["path", {
			d: "M11 3a6 6 0 0 0-6 6v11",
			key: "1v5je3"
		}],
		["path", {
			d: "M5 13h4",
			key: "svpcxo"
		}],
		["path", {
			d: "M17 10a4 4 0 0 0-8 0v10a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2Z",
			key: "vsjego"
		}]
	]);
	const Fish = createLucideIcon("fish", [
		["path", {
			d: "M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.47-3.44 6-7 6s-7.56-2.53-8.5-6Z",
			key: "15baut"
		}],
		["path", {
			d: "M18 12v.5",
			key: "18hhni"
		}],
		["path", {
			d: "M16 17.93a9.77 9.77 0 0 1 0-11.86",
			key: "16dt7o"
		}],
		["path", {
			d: "M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 1.5-1 5 .23 6.5-1.24 1.5-1.24 5-.23 6.5C5.58 18.03 7 16 7 13.33",
			key: "l9di03"
		}],
		["path", {
			d: "M10.46 7.26C10.2 5.88 9.17 4.24 8 3h5.8a2 2 0 0 1 1.98 1.67l.23 1.4",
			key: "1kjonw"
		}],
		["path", {
			d: "m16.01 17.93-.23 1.4A2 2 0 0 1 13.8 21H9.5a5.96 5.96 0 0 0 1.49-3.98",
			key: "1zlm23"
		}]
	]);
	const FlagOff = createLucideIcon("flag-off", [
		["path", {
			d: "M16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528",
			key: "1q158e"
		}],
		["path", {
			d: "m2 2 20 20",
			key: "1ooewy"
		}],
		["path", {
			d: "M4 22V4",
			key: "1plyxx"
		}],
		["path", {
			d: "M7.656 2H8c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10.347",
			key: "xj1b71"
		}]
	]);
	const FishSymbol = createLucideIcon("fish-symbol", [["path", {
		d: "M2 16s9-15 20-4C11 23 2 8 2 8",
		key: "h4oh4o"
	}]]);
	const FlagTriangleLeft = createLucideIcon("flag-triangle-left", [["path", {
		d: "M18 22V2.8a.8.8 0 0 0-1.17-.71L5.45 7.78a.8.8 0 0 0 0 1.44L18 15.5",
		key: "rbbtmw"
	}]]);
	const FlagTriangleRight = createLucideIcon("flag-triangle-right", [["path", {
		d: "M6 22V2.8a.8.8 0 0 1 1.17-.71l11.38 5.69a.8.8 0 0 1 0 1.44L6 15.5",
		key: "kfjsu0"
	}]]);
	const Flag = createLucideIcon("flag", [["path", {
		d: "M4 22V4a1 1 0 0 1 .4-.8A6 6 0 0 1 8 2c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10a1 1 0 0 1-.4.8A6 6 0 0 1 16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528",
		key: "1jaruq"
	}]]);
	const FlameKindling = createLucideIcon("flame-kindling", [
		["path", {
			d: "M12 2c1 3 2.5 3.5 3.5 4.5A5 5 0 0 1 17 10a5 5 0 1 1-10 0c0-.3 0-.6.1-.9a2 2 0 1 0 3.3-2C8 4.5 11 2 12 2Z",
			key: "1ir223"
		}],
		["path", {
			d: "m5 22 14-4",
			key: "1brv4h"
		}],
		["path", {
			d: "m5 18 14 4",
			key: "lgyyje"
		}]
	]);
	const Flame = createLucideIcon("flame", [["path", {
		d: "M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4",
		key: "1slcih"
	}]]);
	const FlashlightOff = createLucideIcon("flashlight-off", [
		["path", {
			d: "M16 16v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V10c0-2-2-2-2-4",
			key: "1r120k"
		}],
		["path", {
			d: "M7 2h11v4c0 2-2 2-2 4v1",
			key: "dz1920"
		}],
		["line", {
			x1: "11",
			x2: "18",
			y1: "6",
			y2: "6",
			key: "bi1vpe"
		}],
		["line", {
			x1: "2",
			x2: "22",
			y1: "2",
			y2: "22",
			key: "a6p6uj"
		}]
	]);
	const Flashlight = createLucideIcon("flashlight", [
		["path", {
			d: "M18 6c0 2-2 2-2 4v10a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V10c0-2-2-2-2-4V2h12z",
			key: "1orkel"
		}],
		["line", {
			x1: "6",
			x2: "18",
			y1: "6",
			y2: "6",
			key: "1z11jq"
		}],
		["line", {
			x1: "12",
			x2: "12",
			y1: "12",
			y2: "12",
			key: "1f4yc1"
		}]
	]);
	const FlaskConicalOff = createLucideIcon("flask-conical-off", [
		["path", {
			d: "M10 2v2.343",
			key: "15t272"
		}],
		["path", {
			d: "M14 2v6.343",
			key: "sxr80q"
		}],
		["path", {
			d: "m2 2 20 20",
			key: "1ooewy"
		}],
		["path", {
			d: "M20 20a2 2 0 0 1-2 2H6a2 2 0 0 1-1.755-2.96l5.227-9.563",
			key: "k0duyd"
		}],
		["path", {
			d: "M6.453 15H15",
			key: "1f0z33"
		}],
		["path", {
			d: "M8.5 2h7",
			key: "csnxdl"
		}]
	]);
	const FlaskConical = createLucideIcon("flask-conical", [
		["path", {
			d: "M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2",
			key: "18mbvz"
		}],
		["path", {
			d: "M6.453 15h11.094",
			key: "3shlmq"
		}],
		["path", {
			d: "M8.5 2h7",
			key: "csnxdl"
		}]
	]);
	const FlaskRound = createLucideIcon("flask-round", [
		["path", {
			d: "M10 2v6.292a7 7 0 1 0 4 0V2",
			key: "1s42pc"
		}],
		["path", {
			d: "M5 15h14",
			key: "m0yey3"
		}],
		["path", {
			d: "M8.5 2h7",
			key: "csnxdl"
		}]
	]);
	const FlipHorizontal2 = createLucideIcon("flip-horizontal-2", [
		["path", {
			d: "m3 7 5 5-5 5V7",
			key: "couhi7"
		}],
		["path", {
			d: "m21 7-5 5 5 5V7",
			key: "6ouia7"
		}],
		["path", {
			d: "M12 20v2",
			key: "1lh1kg"
		}],
		["path", {
			d: "M12 14v2",
			key: "8jcxud"
		}],
		["path", {
			d: "M12 8v2",
			key: "1woqiv"
		}],
		["path", {
			d: "M12 2v2",
			key: "tus03m"
		}]
	]);
	const FlipHorizontal = createLucideIcon("flip-horizontal", [
		["path", {
			d: "M8 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h3",
			key: "1i73f7"
		}],
		["path", {
			d: "M16 3h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3",
			key: "saxlbk"
		}],
		["path", {
			d: "M12 20v2",
			key: "1lh1kg"
		}],
		["path", {
			d: "M12 14v2",
			key: "8jcxud"
		}],
		["path", {
			d: "M12 8v2",
			key: "1woqiv"
		}],
		["path", {
			d: "M12 2v2",
			key: "tus03m"
		}]
	]);
	const FlipVertical2 = createLucideIcon("flip-vertical-2", [
		["path", {
			d: "m17 3-5 5-5-5h10",
			key: "1ftt6x"
		}],
		["path", {
			d: "m17 21-5-5-5 5h10",
			key: "1m0wmu"
		}],
		["path", {
			d: "M4 12H2",
			key: "rhcxmi"
		}],
		["path", {
			d: "M10 12H8",
			key: "s88cx1"
		}],
		["path", {
			d: "M16 12h-2",
			key: "10asgb"
		}],
		["path", {
			d: "M22 12h-2",
			key: "14jgyd"
		}]
	]);
	const FlipVertical = createLucideIcon("flip-vertical", [
		["path", {
			d: "M21 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3",
			key: "14bfxa"
		}],
		["path", {
			d: "M21 16v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3",
			key: "14rx03"
		}],
		["path", {
			d: "M4 12H2",
			key: "rhcxmi"
		}],
		["path", {
			d: "M10 12H8",
			key: "s88cx1"
		}],
		["path", {
			d: "M16 12h-2",
			key: "10asgb"
		}],
		["path", {
			d: "M22 12h-2",
			key: "14jgyd"
		}]
	]);
	const Flower2 = createLucideIcon("flower-2", [
		["path", {
			d: "M12 5a3 3 0 1 1 3 3m-3-3a3 3 0 1 0-3 3m3-3v1M9 8a3 3 0 1 0 3 3M9 8h1m5 0a3 3 0 1 1-3 3m3-3h-1m-2 3v-1",
			key: "3pnvol"
		}],
		["circle", {
			cx: "12",
			cy: "8",
			r: "2",
			key: "1822b1"
		}],
		["path", {
			d: "M12 10v12",
			key: "6ubwww"
		}],
		["path", {
			d: "M12 22c4.2 0 7-1.667 7-5-4.2 0-7 1.667-7 5Z",
			key: "9hd38g"
		}],
		["path", {
			d: "M12 22c-4.2 0-7-1.667-7-5 4.2 0 7 1.667 7 5Z",
			key: "ufn41s"
		}]
	]);
	const Flower = createLucideIcon("flower", [
		["circle", {
			cx: "12",
			cy: "12",
			r: "3",
			key: "1v7zrd"
		}],
		["path", {
			d: "M12 16.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 1 1 12 7.5a4.5 4.5 0 1 1 4.5 4.5 4.5 4.5 0 1 1-4.5 4.5",
			key: "14wa3c"
		}],
		["path", {
			d: "M12 7.5V9",
			key: "1oy5b0"
		}],
		["path", {
			d: "M7.5 12H9",
			key: "eltsq1"
		}],
		["path", {
			d: "M16.5 12H15",
			key: "vk5kw4"
		}],
		["path", {
			d: "M12 16.5V15",
			key: "k7eayi"
		}],
		["path", {
			d: "m8 8 1.88 1.88",
			key: "nxy4qf"
		}],
		["path", {
			d: "M14.12 9.88 16 8",
			key: "1lst6k"
		}],
		["path", {
			d: "m8 16 1.88-1.88",
			key: "h2eex1"
		}],
		["path", {
			d: "M14.12 14.12 16 16",
			key: "uqkrx3"
		}]
	]);
	const Focus = createLucideIcon("focus", [
		["circle", {
			cx: "12",
			cy: "12",
			r: "3",
			key: "1v7zrd"
		}],
		["path", {
			d: "M3 7V5a2 2 0 0 1 2-2h2",
			key: "aa7l1z"
		}],
		["path", {
			d: "M17 3h2a2 2 0 0 1 2 2v2",
			key: "4qcy5o"
		}],
		["path", {
			d: "M21 17v2a2 2 0 0 1-2 2h-2",
			key: "6vwrx8"
		}],
		["path", {
			d: "M7 21H5a2 2 0 0 1-2-2v-2",
			key: "ioqczr"
		}]
	]);
	const FoldVertical = createLucideIcon("fold-vertical", [
		["path", {
			d: "M12 22v-6",
			key: "6o8u61"
		}],
		["path", {
			d: "M12 8V2",
			key: "1wkif3"
		}],
		["path", {
			d: "M4 12H2",
			key: "rhcxmi"
		}],
		["path", {
			d: "M10 12H8",
			key: "s88cx1"
		}],
		["path", {
			d: "M16 12h-2",
			key: "10asgb"
		}],
		["path", {
			d: "M22 12h-2",
			key: "14jgyd"
		}],
		["path", {
			d: "m15 19-3-3-3 3",
			key: "e37ymu"
		}],
		["path", {
			d: "m15 5-3 3-3-3",
			key: "19d6lf"
		}]
	]);
	const FoldHorizontal = createLucideIcon("fold-horizontal", [
		["path", {
			d: "M2 12h6",
			key: "1wqiqv"
		}],
		["path", {
			d: "M22 12h-6",
			key: "1eg9hc"
		}],
		["path", {
			d: "M12 2v2",
			key: "tus03m"
		}],
		["path", {
			d: "M12 8v2",
			key: "1woqiv"
		}],
		["path", {
			d: "M12 14v2",
			key: "8jcxud"
		}],
		["path", {
			d: "M12 20v2",
			key: "1lh1kg"
		}],
		["path", {
			d: "m19 9-3 3 3 3",
			key: "12ol22"
		}],
		["path", {
			d: "m5 15 3-3-3-3",
			key: "1kdhjc"
		}]
	]);
	const FolderArchive = createLucideIcon("folder-archive", [
		["circle", {
			cx: "15",
			cy: "19",
			r: "2",
			key: "u2pros"
		}],
		["path", {
			d: "M20.9 19.8A2 2 0 0 0 22 18V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h5.1",
			key: "1jj40k"
		}],
		["path", {
			d: "M15 11v-1",
			key: "cntcp"
		}],
		["path", {
			d: "M15 17v-2",
			key: "1279jj"
		}]
	]);
	const FolderCheck = createLucideIcon("folder-check", [["path", {
		d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
		key: "1kt360"
	}], ["path", {
		d: "m9 13 2 2 4-4",
		key: "6343dt"
	}]]);
	const FolderClock = createLucideIcon("folder-clock", [
		["path", {
			d: "M16 14v2.2l1.6 1",
			key: "fo4ql5"
		}],
		["path", {
			d: "M7 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2",
			key: "1urifu"
		}],
		["circle", {
			cx: "16",
			cy: "16",
			r: "6",
			key: "qoo3c4"
		}]
	]);
	const FolderClosed = createLucideIcon("folder-closed", [["path", {
		d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
		key: "1kt360"
	}], ["path", {
		d: "M2 10h20",
		key: "1ir3d8"
	}]]);
	const FolderCode = createLucideIcon("folder-code", [
		["path", {
			d: "M10 10.5 8 13l2 2.5",
			key: "m4t9c1"
		}],
		["path", {
			d: "m14 10.5 2 2.5-2 2.5",
			key: "14w2eb"
		}],
		["path", {
			d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2z",
			key: "1u1bxd"
		}]
	]);
	const FolderCog = createLucideIcon("folder-cog", [
		["path", {
			d: "M10.3 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.98a2 2 0 0 1 1.69.9l.66 1.2A2 2 0 0 0 12 6h8a2 2 0 0 1 2 2v3.3",
			key: "128dxu"
		}],
		["path", {
			d: "m14.305 19.53.923-.382",
			key: "3m78fa"
		}],
		["path", {
			d: "m15.228 16.852-.923-.383",
			key: "npixar"
		}],
		["path", {
			d: "m16.852 15.228-.383-.923",
			key: "5xggr7"
		}],
		["path", {
			d: "m16.852 20.772-.383.924",
			key: "dpfhf9"
		}],
		["path", {
			d: "m19.148 15.228.383-.923",
			key: "1reyyz"
		}],
		["path", {
			d: "m19.53 21.696-.382-.924",
			key: "1goivc"
		}],
		["path", {
			d: "m20.772 16.852.924-.383",
			key: "htqkph"
		}],
		["path", {
			d: "m20.772 19.148.924.383",
			key: "9w9pjp"
		}],
		["circle", {
			cx: "18",
			cy: "18",
			r: "3",
			key: "1xkwt0"
		}]
	]);
	const FolderDot = createLucideIcon("folder-dot", [["path", {
		d: "M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z",
		key: "1fr9dc"
	}], ["circle", {
		cx: "12",
		cy: "13",
		r: "1",
		key: "49l61u"
	}]]);
	const FolderDown = createLucideIcon("folder-down", [
		["path", {
			d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
			key: "1kt360"
		}],
		["path", {
			d: "M12 10v6",
			key: "1bos4e"
		}],
		["path", {
			d: "m15 13-3 3-3-3",
			key: "6j2sf0"
		}]
	]);
	const FolderGit2 = createLucideIcon("folder-git-2", [
		["path", {
			d: "M9 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v5",
			key: "1w6njk"
		}],
		["circle", {
			cx: "13",
			cy: "12",
			r: "2",
			key: "1j92g6"
		}],
		["path", {
			d: "M18 19c-2.8 0-5-2.2-5-5v8",
			key: "pkpw2h"
		}],
		["circle", {
			cx: "20",
			cy: "19",
			r: "2",
			key: "1obnsp"
		}]
	]);
	const FolderGit = createLucideIcon("folder-git", [
		["circle", {
			cx: "12",
			cy: "13",
			r: "2",
			key: "1c1ljs"
		}],
		["path", {
			d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
			key: "1kt360"
		}],
		["path", {
			d: "M14 13h3",
			key: "1dgedf"
		}],
		["path", {
			d: "M7 13h3",
			key: "1pygq7"
		}]
	]);
	const FolderHeart = createLucideIcon("folder-heart", [["path", {
		d: "M10.638 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v3.417",
		key: "10r6g4"
	}], ["path", {
		d: "M14.62 18.8A2.25 2.25 0 1 1 18 15.836a2.25 2.25 0 1 1 3.38 2.966l-2.626 2.856a.998.998 0 0 1-1.507 0z",
		key: "15cy7q"
	}]]);
	const FolderInput = createLucideIcon("folder-input", [
		["path", {
			d: "M2 9V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-1",
			key: "fm4g5t"
		}],
		["path", {
			d: "M2 13h10",
			key: "pgb2dq"
		}],
		["path", {
			d: "m9 16 3-3-3-3",
			key: "6m91ic"
		}]
	]);
	const FolderKanban = createLucideIcon("folder-kanban", [
		["path", {
			d: "M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z",
			key: "1fr9dc"
		}],
		["path", {
			d: "M8 10v4",
			key: "tgpxqk"
		}],
		["path", {
			d: "M12 10v2",
			key: "hh53o1"
		}],
		["path", {
			d: "M16 10v6",
			key: "1d6xys"
		}]
	]);
	const FolderKey = createLucideIcon("folder-key", [
		["circle", {
			cx: "16",
			cy: "20",
			r: "2",
			key: "1vifvg"
		}],
		["path", {
			d: "M10 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v2",
			key: "3hgo9p"
		}],
		["path", {
			d: "m22 14-4.5 4.5",
			key: "1ef6z8"
		}],
		["path", {
			d: "m21 15 1 1",
			key: "1ejcpy"
		}]
	]);
	const FolderLock = createLucideIcon("folder-lock", [
		["rect", {
			width: "8",
			height: "5",
			x: "14",
			y: "17",
			rx: "1",
			key: "19aais"
		}],
		["path", {
			d: "M10 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v2.5",
			key: "1w6v7t"
		}],
		["path", {
			d: "M20 17v-2a2 2 0 1 0-4 0v2",
			key: "pwaxnr"
		}]
	]);
	const FolderOpenDot = createLucideIcon("folder-open-dot", [["path", {
		d: "m6 14 1.45-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.55 6a2 2 0 0 1-1.94 1.5H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H18a2 2 0 0 1 2 2v2",
		key: "1nmvlm"
	}], ["circle", {
		cx: "14",
		cy: "15",
		r: "1",
		key: "1gm4qj"
	}]]);
	const FolderMinus = createLucideIcon("folder-minus", [["path", {
		d: "M9 13h6",
		key: "1uhe8q"
	}], ["path", {
		d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
		key: "1kt360"
	}]]);
	const FolderOpen = createLucideIcon("folder-open", [["path", {
		d: "m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",
		key: "usdka0"
	}]]);
	const FolderOutput = createLucideIcon("folder-output", [
		["path", {
			d: "M2 7.5V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-1.5",
			key: "1yk7aj"
		}],
		["path", {
			d: "M2 13h10",
			key: "pgb2dq"
		}],
		["path", {
			d: "m5 10-3 3 3 3",
			key: "1r8ie0"
		}]
	]);
	const FolderPen = createLucideIcon("folder-pen", [["path", {
		d: "M2 11.5V5a2 2 0 0 1 2-2h3.9c.7 0 1.3.3 1.7.9l.8 1.2c.4.6 1 .9 1.7.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-9.5",
		key: "a8xqs0"
	}], ["path", {
		d: "M11.378 13.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z",
		key: "1saktj"
	}]]);
	const FolderRoot = createLucideIcon("folder-root", [
		["path", {
			d: "M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z",
			key: "1fr9dc"
		}],
		["circle", {
			cx: "12",
			cy: "13",
			r: "2",
			key: "1c1ljs"
		}],
		["path", {
			d: "M12 15v5",
			key: "11xva1"
		}]
	]);
	const FolderPlus = createLucideIcon("folder-plus", [
		["path", {
			d: "M12 10v6",
			key: "1bos4e"
		}],
		["path", {
			d: "M9 13h6",
			key: "1uhe8q"
		}],
		["path", {
			d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
			key: "1kt360"
		}]
	]);
	const FolderSearch2 = createLucideIcon("folder-search-2", [
		["circle", {
			cx: "11.5",
			cy: "12.5",
			r: "2.5",
			key: "1ea5ju"
		}],
		["path", {
			d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
			key: "1kt360"
		}],
		["path", {
			d: "M13.3 14.3 15 16",
			key: "1y4v1n"
		}]
	]);
	const FolderSearch = createLucideIcon("folder-search", [
		["path", {
			d: "M10.7 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v4.1",
			key: "1bw5m7"
		}],
		["path", {
			d: "m21 21-1.9-1.9",
			key: "1g2n9r"
		}],
		["circle", {
			cx: "17",
			cy: "17",
			r: "3",
			key: "18b49y"
		}]
	]);
	const FolderSymlink = createLucideIcon("folder-symlink", [["path", {
		d: "M2 9.35V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h7",
		key: "y8kt7d"
	}], ["path", {
		d: "m8 16 3-3-3-3",
		key: "rlqrt1"
	}]]);
	const FolderSync = createLucideIcon("folder-sync", [
		["path", {
			d: "M9 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v.5",
			key: "1dkoa9"
		}],
		["path", {
			d: "M12 10v4h4",
			key: "1czhmt"
		}],
		["path", {
			d: "m12 14 1.535-1.605a5 5 0 0 1 8 1.5",
			key: "lvuxfi"
		}],
		["path", {
			d: "M22 22v-4h-4",
			key: "1ewp4q"
		}],
		["path", {
			d: "m22 18-1.535 1.605a5 5 0 0 1-8-1.5",
			key: "14ync0"
		}]
	]);
	const FolderTree = createLucideIcon("folder-tree", [
		["path", {
			d: "M20 10a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-2.5a1 1 0 0 1-.8-.4l-.9-1.2A1 1 0 0 0 15 3h-2a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z",
			key: "hod4my"
		}],
		["path", {
			d: "M20 21a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-2.9a1 1 0 0 1-.88-.55l-.42-.85a1 1 0 0 0-.92-.6H13a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z",
			key: "w4yl2u"
		}],
		["path", {
			d: "M3 5a2 2 0 0 0 2 2h3",
			key: "f2jnh7"
		}],
		["path", {
			d: "M3 3v13a2 2 0 0 0 2 2h3",
			key: "k8epm1"
		}]
	]);
	const FolderUp = createLucideIcon("folder-up", [
		["path", {
			d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
			key: "1kt360"
		}],
		["path", {
			d: "M12 10v6",
			key: "1bos4e"
		}],
		["path", {
			d: "m9 13 3-3 3 3",
			key: "1pxg3c"
		}]
	]);
	const FolderX = createLucideIcon("folder-x", [
		["path", {
			d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
			key: "1kt360"
		}],
		["path", {
			d: "m9.5 10.5 5 5",
			key: "ra9qjz"
		}],
		["path", {
			d: "m14.5 10.5-5 5",
			key: "l2rkpq"
		}]
	]);
	const Folder = createLucideIcon("folder", [["path", {
		d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
		key: "1kt360"
	}]]);
	const Folders = createLucideIcon("folders", [["path", {
		d: "M20 5a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2.5a1.5 1.5 0 0 1 1.2.6l.6.8a1.5 1.5 0 0 0 1.2.6z",
		key: "a4852j"
	}], ["path", {
		d: "M3 8.268a2 2 0 0 0-1 1.738V19a2 2 0 0 0 2 2h11a2 2 0 0 0 1.732-1",
		key: "yxbcw3"
	}]]);
	const Footprints = createLucideIcon("footprints", [
		["path", {
			d: "M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0Z",
			key: "1dudjm"
		}],
		["path", {
			d: "M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0Z",
			key: "l2t8xc"
		}],
		["path", {
			d: "M16 17h4",
			key: "1dejxt"
		}],
		["path", {
			d: "M4 13h4",
			key: "1bwh8b"
		}]
	]);
	const Forklift = createLucideIcon("forklift", [
		["path", {
			d: "M12 12H5a2 2 0 0 0-2 2v5",
			key: "7zsz91"
		}],
		["circle", {
			cx: "13",
			cy: "19",
			r: "2",
			key: "wjnkru"
		}],
		["circle", {
			cx: "5",
			cy: "19",
			r: "2",
			key: "v8kfzx"
		}],
		["path", {
			d: "M8 19h3m5-17v17h6M6 12V7c0-1.1.9-2 2-2h3l5 5",
			key: "13bk1p"
		}]
	]);
	const Forward = createLucideIcon("forward", [["path", {
		d: "m15 17 5-5-5-5",
		key: "nf172w"
	}], ["path", {
		d: "M4 18v-2a4 4 0 0 1 4-4h12",
		key: "jmiej9"
	}]]);
	const Frame = createLucideIcon("frame", [
		["line", {
			x1: "22",
			x2: "2",
			y1: "6",
			y2: "6",
			key: "15w7dq"
		}],
		["line", {
			x1: "22",
			x2: "2",
			y1: "18",
			y2: "18",
			key: "1ip48p"
		}],
		["line", {
			x1: "6",
			x2: "6",
			y1: "2",
			y2: "22",
			key: "a2lnyx"
		}],
		["line", {
			x1: "18",
			x2: "18",
			y1: "2",
			y2: "22",
			key: "8vb6jd"
		}]
	]);
	const Framer = createLucideIcon("framer", [["path", {
		d: "M5 16V9h14V2H5l14 14h-7m-7 0 7 7v-7m-7 0h7",
		key: "1a2nng"
	}]]);
	const Frown = createLucideIcon("frown", [
		["circle", {
			cx: "12",
			cy: "12",
			r: "10",
			key: "1mglay"
		}],
		["path", {
			d: "M16 16s-1.5-2-4-2-4 2-4 2",
			key: "epbg0q"
		}],
		["line", {
			x1: "9",
			x2: "9.01",
			y1: "9",
			y2: "9",
			key: "yxxnd0"
		}],
		["line", {
			x1: "15",
			x2: "15.01",
			y1: "9",
			y2: "9",
			key: "1p4y9e"
		}]
	]);
	const Fuel = createLucideIcon("fuel", [
		["path", {
			d: "M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 4 0v-6.998a2 2 0 0 0-.59-1.42L18 5",
			key: "1wtuz0"
		}],
		["path", {
			d: "M14 21V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v16",
			key: "e09ifn"
		}],
		["path", {
			d: "M2 21h13",
			key: "1x0fut"
		}],
		["path", {
			d: "M3 9h11",
			key: "1p7c0w"
		}]
	]);
	const Fullscreen = createLucideIcon("fullscreen", [
		["path", {
			d: "M3 7V5a2 2 0 0 1 2-2h2",
			key: "aa7l1z"
		}],
		["path", {
			d: "M17 3h2a2 2 0 0 1 2 2v2",
			key: "4qcy5o"
		}],
		["path", {
			d: "M21 17v2a2 2 0 0 1-2 2h-2",
			key: "6vwrx8"
		}],
		["path", {
			d: "M7 21H5a2 2 0 0 1-2-2v-2",
			key: "ioqczr"
		}],
		["rect", {
			width: "10",
			height: "8",
			x: "7",
			y: "8",
			rx: "1",
			key: "vys8me"
		}]
	]);
	const FunnelPlus = createLucideIcon("funnel-plus", [
		["path", {
			d: "M13.354 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14v6a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341l1.218-1.348",
			key: "8mvsmf"
		}],
		["path", {
			d: "M16 6h6",
			key: "1dogtp"
		}],
		["path", {
			d: "M19 3v6",
			key: "1ytpjt"
		}]
	]);
	const FunnelX = createLucideIcon("funnel-x", [
		["path", {
			d: "M12.531 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14v6a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341l.427-.473",
			key: "ol2ft2"
		}],
		["path", {
			d: "m16.5 3.5 5 5",
			key: "15e6fa"
		}],
		["path", {
			d: "m21.5 3.5-5 5",
			key: "m0lwru"
		}]
	]);
	const Funnel = createLucideIcon("funnel", [["path", {
		d: "M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",
		key: "sc7q7i"
	}]]);
	const GalleryHorizontal = createLucideIcon("gallery-horizontal", [
		["path", {
			d: "M2 3v18",
			key: "pzttux"
		}],
		["rect", {
			width: "12",
			height: "18",
			x: "6",
			y: "3",
			rx: "2",
			key: "btr8bg"
		}],
		["path", {
			d: "M22 3v18",
			key: "6jf3v"
		}]
	]);
	const GalleryThumbnails = createLucideIcon("gallery-thumbnails", [
		["rect", {
			width: "18",
			height: "14",
			x: "3",
			y: "3",
			rx: "2",
			key: "74y24f"
		}],
		["path", {
			d: "M4 21h1",
			key: "16zlid"
		}],
		["path", {
			d: "M9 21h1",
			key: "15o7lz"
		}],
		["path", {
			d: "M14 21h1",
			key: "v9vybs"
		}],
		["path", {
			d: "M19 21h1",
			key: "edywat"
		}]
	]);
	const GalleryHorizontalEnd = createLucideIcon("gallery-horizontal-end", [
		["path", {
			d: "M2 7v10",
			key: "a2pl2d"
		}],
		["path", {
			d: "M6 5v14",
			key: "1kq3d7"
		}],
		["rect", {
			width: "12",
			height: "18",
			x: "10",
			y: "3",
			rx: "2",
			key: "13i7bc"
		}]
	]);
	const GalleryVerticalEnd = createLucideIcon("gallery-vertical-end", [
		["path", {
			d: "M7 2h10",
			key: "nczekb"
		}],
		["path", {
			d: "M5 6h14",
			key: "u2x4p"
		}],
		["rect", {
			width: "18",
			height: "12",
			x: "3",
			y: "10",
			rx: "2",
			key: "l0tzu3"
		}]
	]);
	const GalleryVertical = createLucideIcon("gallery-vertical", [
		["path", {
			d: "M3 2h18",
			key: "15qxfx"
		}],
		["rect", {
			width: "18",
			height: "12",
			x: "3",
			y: "6",
			rx: "2",
			key: "1439r6"
		}],
		["path", {
			d: "M3 22h18",
			key: "8prr45"
		}]
	]);
	const Gamepad2 = createLucideIcon("gamepad-2", [
		["line", {
			x1: "6",
			x2: "10",
			y1: "11",
			y2: "11",
			key: "1gktln"
		}],
		["line", {
			x1: "8",
			x2: "8",
			y1: "9",
			y2: "13",
			key: "qnk9ow"
		}],
		["line", {
			x1: "15",
			x2: "15.01",
			y1: "12",
			y2: "12",
			key: "krot7o"
		}],
		["line", {
			x1: "18",
			x2: "18.01",
			y1: "10",
			y2: "10",
			key: "1lcuu1"
		}],
		["path", {
			d: "M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z",
			key: "mfqc10"
		}]
	]);
	const Gamepad = createLucideIcon("gamepad", [
		["line", {
			x1: "6",
			x2: "10",
			y1: "12",
			y2: "12",
			key: "161bw2"
		}],
		["line", {
			x1: "8",
			x2: "8",
			y1: "10",
			y2: "14",
			key: "1i6ji0"
		}],
		["line", {
			x1: "15",
			x2: "15.01",
			y1: "13",
			y2: "13",
			key: "dqpgro"
		}],
		["line", {
			x1: "18",
			x2: "18.01",
			y1: "11",
			y2: "11",
			key: "meh2c"
		}],
		["rect", {
			width: "20",
			height: "12",
			x: "2",
			y: "6",
			rx: "2",
			key: "9lu3g6"
		}]
	]);
	const Gauge = createLucideIcon("gauge", [["path", {
		d: "m12 14 4-4",
		key: "9kzdfg"
	}], ["path", {
		d: "M3.34 19a10 10 0 1 1 17.32 0",
		key: "19p75a"
	}]]);
	const Gavel = createLucideIcon("gavel", [
		["path", {
			d: "m14 13-8.381 8.38a1 1 0 0 1-3.001-3l8.384-8.381",
			key: "pgg06f"
		}],
		["path", {
			d: "m16 16 6-6",
			key: "vzrcl6"
		}],
		["path", {
			d: "m21.5 10.5-8-8",
			key: "a17d9x"
		}],
		["path", {
			d: "m8 8 6-6",
			key: "18bi4p"
		}],
		["path", {
			d: "m8.5 7.5 8 8",
			key: "1oyaui"
		}]
	]);
	const Gem = createLucideIcon("gem", [
		["path", {
			d: "M10.5 3 8 9l4 13 4-13-2.5-6",
			key: "b3dvk1"
		}],
		["path", {
			d: "M17 3a2 2 0 0 1 1.6.8l3 4a2 2 0 0 1 .013 2.382l-7.99 10.986a2 2 0 0 1-3.247 0l-7.99-10.986A2 2 0 0 1 2.4 7.8l2.998-3.997A2 2 0 0 1 7 3z",
			key: "7w4byz"
		}],
		["path", {
			d: "M2 9h20",
			key: "16fsjt"
		}]
	]);
	const GeorgianLari = createLucideIcon("georgian-lari", [
		["path", {
			d: "M11.5 21a7.5 7.5 0 1 1 7.35-9",
			key: "1gyj8k"
		}],
		["path", {
			d: "M13 12V3",
			key: "18om2a"
		}],
		["path", {
			d: "M4 21h16",
			key: "1h09gz"
		}],
		["path", {
			d: "M9 12V3",
			key: "geutu0"
		}]
	]);
	const Ghost = createLucideIcon("ghost", [
		["path", {
			d: "M9 10h.01",
			key: "qbtxuw"
		}],
		["path", {
			d: "M15 10h.01",
			key: "1qmjsl"
		}],
		["path", {
			d: "M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z",
			key: "uwwb07"
		}]
	]);
	const Gift = createLucideIcon("gift", [
		["rect", {
			x: "3",
			y: "8",
			width: "18",
			height: "4",
			rx: "1",
			key: "bkv52"
		}],
		["path", {
			d: "M12 8v13",
			key: "1c76mn"
		}],
		["path", {
			d: "M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7",
			key: "6wjy6b"
		}],
		["path", {
			d: "M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5",
			key: "1ihvrl"
		}]
	]);
	const GitBranchPlus = createLucideIcon("git-branch-plus", [
		["path", {
			d: "M6 3v12",
			key: "qpgusn"
		}],
		["path", {
			d: "M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
			key: "1d02ji"
		}],
		["path", {
			d: "M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
			key: "chk6ph"
		}],
		["path", {
			d: "M15 6a9 9 0 0 0-9 9",
			key: "or332x"
		}],
		["path", {
			d: "M18 15v6",
			key: "9wciyi"
		}],
		["path", {
			d: "M21 18h-6",
			key: "139f0c"
		}]
	]);
	const GitCommitHorizontal = createLucideIcon("git-commit-horizontal", [
		["circle", {
			cx: "12",
			cy: "12",
			r: "3",
			key: "1v7zrd"
		}],
		["line", {
			x1: "3",
			x2: "9",
			y1: "12",
			y2: "12",
			key: "1dyftd"
		}],
		["line", {
			x1: "15",
			x2: "21",
			y1: "12",
			y2: "12",
			key: "oup4p8"
		}]
	]);
	const GitBranch = createLucideIcon("git-branch", [
		["line", {
			x1: "6",
			x2: "6",
			y1: "3",
			y2: "15",
			key: "17qcm7"
		}],
		["circle", {
			cx: "18",
			cy: "6",
			r: "3",
			key: "1h7g24"
		}],
		["circle", {
			cx: "6",
			cy: "18",
			r: "3",
			key: "fqmcym"
		}],
		["path", {
			d: "M18 9a9 9 0 0 1-9 9",
			key: "n2h4wq"
		}]
	]);
	const GitCommitVertical = createLucideIcon("git-commit-vertical", [
		["path", {
			d: "M12 3v6",
			key: "1holv5"
		}],
		["circle", {
			cx: "12",
			cy: "12",
			r: "3",
			key: "1v7zrd"
		}],
		["path", {
			d: "M12 15v6",
			key: "a9ows0"
		}]
	]);
	const GitCompareArrows = createLucideIcon("git-compare-arrows", [
		["circle", {
			cx: "5",
			cy: "6",
			r: "3",
			key: "1qnov2"
		}],
		["path", {
			d: "M12 6h5a2 2 0 0 1 2 2v7",
			key: "1yj91y"
		}],
		["path", {
			d: "m15 9-3-3 3-3",
			key: "1lwv8l"
		}],
		["circle", {
			cx: "19",
			cy: "18",
			r: "3",
			key: "1qljk2"
		}],
		["path", {
			d: "M12 18H7a2 2 0 0 1-2-2V9",
			key: "16sdep"
		}],
		["path", {
			d: "m9 15 3 3-3 3",
			key: "1m3kbl"
		}]
	]);
	const GitCompare = createLucideIcon("git-compare", [
		["circle", {
			cx: "18",
			cy: "18",
			r: "3",
			key: "1xkwt0"
		}],
		["circle", {
			cx: "6",
			cy: "6",
			r: "3",
			key: "1lh9wr"
		}],
		["path", {
			d: "M13 6h3a2 2 0 0 1 2 2v7",
			key: "1yeb86"
		}],
		["path", {
			d: "M11 18H8a2 2 0 0 1-2-2V9",
			key: "19pyzm"
		}]
	]);
	const GitFork = createLucideIcon("git-fork", [
		["circle", {
			cx: "12",
			cy: "18",
			r: "3",
			key: "1mpf1b"
		}],
		["circle", {
			cx: "6",
			cy: "6",
			r: "3",
			key: "1lh9wr"
		}],
		["circle", {
			cx: "18",
			cy: "6",
			r: "3",
			key: "1h7g24"
		}],
		["path", {
			d: "M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9",
			key: "1uq4wg"
		}],
		["path", {
			d: "M12 12v3",
			key: "158kv8"
		}]
	]);
	const GitGraph = createLucideIcon("git-graph", [
		["circle", {
			cx: "5",
			cy: "6",
			r: "3",
			key: "1qnov2"
		}],
		["path", {
			d: "M5 9v6",
			key: "158jrl"
		}],
		["circle", {
			cx: "5",
			cy: "18",
			r: "3",
			key: "104gr9"
		}],
		["path", {
			d: "M12 3v18",
			key: "108xh3"
		}],
		["circle", {
			cx: "19",
			cy: "6",
			r: "3",
			key: "108a5v"
		}],
		["path", {
			d: "M16 15.7A9 9 0 0 0 19 9",
			key: "1e3vqb"
		}]
	]);
	const GitMerge = createLucideIcon("git-merge", [
		["circle", {
			cx: "18",
			cy: "18",
			r: "3",
			key: "1xkwt0"
		}],
		["circle", {
			cx: "6",
			cy: "6",
			r: "3",
			key: "1lh9wr"
		}],
		["path", {
			d: "M6 21V9a9 9 0 0 0 9 9",
			key: "7kw0sc"
		}]
	]);
	const GitPullRequestArrow = createLucideIcon("git-pull-request-arrow", [
		["circle", {
			cx: "5",
			cy: "6",
			r: "3",
			key: "1qnov2"
		}],
		["path", {
			d: "M5 9v12",
			key: "ih889a"
		}],
		["circle", {
			cx: "19",
			cy: "18",
			r: "3",
			key: "1qljk2"
		}],
		["path", {
			d: "m15 9-3-3 3-3",
			key: "1lwv8l"
		}],
		["path", {
			d: "M12 6h5a2 2 0 0 1 2 2v7",
			key: "1yj91y"
		}]
	]);
	const GitPullRequestClosed = createLucideIcon("git-pull-request-closed", [
		["circle", {
			cx: "6",
			cy: "6",
			r: "3",
			key: "1lh9wr"
		}],
		["path", {
			d: "M6 9v12",
			key: "1sc30k"
		}],
		["path", {
			d: "m21 3-6 6",
			key: "16nqsk"
		}],
		["path", {
			d: "m21 9-6-6",
			key: "9j17rh"
		}],
		["path", {
			d: "M18 11.5V15",
			key: "65xf6f"
		}],
		["circle", {
			cx: "18",
			cy: "18",
			r: "3",
			key: "1xkwt0"
		}]
	]);
	const GitPullRequestCreateArrow = createLucideIcon("git-pull-request-create-arrow", [
		["circle", {
			cx: "5",
			cy: "6",
			r: "3",
			key: "1qnov2"
		}],
		["path", {
			d: "M5 9v12",
			key: "ih889a"
		}],
		["path", {
			d: "m15 9-3-3 3-3",
			key: "1lwv8l"
		}],
		["path", {
			d: "M12 6h5a2 2 0 0 1 2 2v3",
			key: "1rbwk6"
		}],
		["path", {
			d: "M19 15v6",
			key: "10aioa"
		}],
		["path", {
			d: "M22 18h-6",
			key: "1d5gi5"
		}]
	]);
	const GitPullRequestCreate = createLucideIcon("git-pull-request-create", [
		["circle", {
			cx: "6",
			cy: "6",
			r: "3",
			key: "1lh9wr"
		}],
		["path", {
			d: "M6 9v12",
			key: "1sc30k"
		}],
		["path", {
			d: "M13 6h3a2 2 0 0 1 2 2v3",
			key: "1jb6z3"
		}],
		["path", {
			d: "M18 15v6",
			key: "9wciyi"
		}],
		["path", {
			d: "M21 18h-6",
			key: "139f0c"
		}]
	]);
	const GitPullRequestDraft = createLucideIcon("git-pull-request-draft", [
		["circle", {
			cx: "18",
			cy: "18",
			r: "3",
			key: "1xkwt0"
		}],
		["circle", {
			cx: "6",
			cy: "6",
			r: "3",
			key: "1lh9wr"
		}],
		["path", {
			d: "M18 6V5",
			key: "1oao2s"
		}],
		["path", {
			d: "M18 11v-1",
			key: "11c8tz"
		}],
		["line", {
			x1: "6",
			x2: "6",
			y1: "9",
			y2: "21",
			key: "rroup"
		}]
	]);
	const GitPullRequest = createLucideIcon("git-pull-request", [
		["circle", {
			cx: "18",
			cy: "18",
			r: "3",
			key: "1xkwt0"
		}],
		["circle", {
			cx: "6",
			cy: "6",
			r: "3",
			key: "1lh9wr"
		}],
		["path", {
			d: "M13 6h3a2 2 0 0 1 2 2v7",
			key: "1yeb86"
		}],
		["line", {
			x1: "6",
			x2: "6",
			y1: "9",
			y2: "21",
			key: "rroup"
		}]
	]);
	const Github = createLucideIcon("github", [["path", {
		d: "M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4",
		key: "tonef"
	}], ["path", {
		d: "M9 18c-4.51 2-5-2-7-2",
		key: "9comsn"
	}]]);
	const Gitlab = createLucideIcon("gitlab", [["path", {
		d: "m22 13.29-3.33-10a.42.42 0 0 0-.14-.18.38.38 0 0 0-.22-.11.39.39 0 0 0-.23.07.42.42 0 0 0-.14.18l-2.26 6.67H8.32L6.1 3.26a.42.42 0 0 0-.1-.18.38.38 0 0 0-.26-.08.39.39 0 0 0-.23.07.42.42 0 0 0-.14.18L2 13.29a.74.74 0 0 0 .27.83L12 21l9.69-6.88a.71.71 0 0 0 .31-.83Z",
		key: "148pdi"
	}]]);
	const GlassWater = createLucideIcon("glass-water", [["path", {
		d: "M5.116 4.104A1 1 0 0 1 6.11 3h11.78a1 1 0 0 1 .994 1.105L17.19 20.21A2 2 0 0 1 15.2 22H8.8a2 2 0 0 1-2-1.79z",
		key: "p55z4y"
	}], ["path", {
		d: "M6 12a5 5 0 0 1 6 0 5 5 0 0 0 6 0",
		key: "mjntcy"
	}]]);
	const Glasses = createLucideIcon("glasses", [
		["circle", {
			cx: "6",
			cy: "15",
			r: "4",
			key: "vux9w4"
		}],
		["circle", {
			cx: "18",
			cy: "15",
			r: "4",
			key: "18o8ve"
		}],
		["path", {
			d: "M14 15a2 2 0 0 0-2-2 2 2 0 0 0-2 2",
			key: "1ag4bs"
		}],
		["path", {
			d: "M2.5 13 5 7c.7-1.3 1.4-2 3-2",
			key: "1hm1gs"
		}],
		["path", {
			d: "M21.5 13 19 7c-.7-1.3-1.5-2-3-2",
			key: "1r31ai"
		}]
	]);
	const GlobeLock = createLucideIcon("globe-lock", [
		["path", {
			d: "M15.686 15A14.5 14.5 0 0 1 12 22a14.5 14.5 0 0 1 0-20 10 10 0 1 0 9.542 13",
			key: "qkt0x6"
		}],
		["path", {
			d: "M2 12h8.5",
			key: "ovaggd"
		}],
		["path", {
			d: "M20 6V4a2 2 0 1 0-4 0v2",
			key: "1of5e8"
		}],
		["rect", {
			width: "8",
			height: "5",
			x: "14",
			y: "6",
			rx: "1",
			key: "1fmf51"
		}]
	]);
	const Goal = createLucideIcon("goal", [
		["path", {
			d: "M12 13V2l8 4-8 4",
			key: "5wlwwj"
		}],
		["path", {
			d: "M20.561 10.222a9 9 0 1 1-12.55-5.29",
			key: "1c0wjv"
		}],
		["path", {
			d: "M8.002 9.997a5 5 0 1 0 8.9 2.02",
			key: "gb1g7m"
		}]
	]);
	const Gpu = createLucideIcon("gpu", [
		["path", {
			d: "M2 21V3",
			key: "1bzk4w"
		}],
		["path", {
			d: "M2 5h18a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2.26",
			key: "1d64pi"
		}],
		["path", {
			d: "M7 17v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-3",
			key: "5hbqbf"
		}],
		["circle", {
			cx: "16",
			cy: "11",
			r: "2",
			key: "qt15rb"
		}],
		["circle", {
			cx: "8",
			cy: "11",
			r: "2",
			key: "ssideg"
		}]
	]);
	const GraduationCap = createLucideIcon("graduation-cap", [
		["path", {
			d: "M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z",
			key: "j76jl0"
		}],
		["path", {
			d: "M22 10v6",
			key: "1lu8f3"
		}],
		["path", {
			d: "M6 12.5V16a6 3 0 0 0 12 0v-3.5",
			key: "1r8lef"
		}]
	]);
	const Globe = createLucideIcon("globe", [
		["circle", {
			cx: "12",
			cy: "12",
			r: "10",
			key: "1mglay"
		}],
		["path", {
			d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",
			key: "13o1zl"
		}],
		["path", {
			d: "M2 12h20",
			key: "9i4pu4"
		}]
	]);
	const Grape = createLucideIcon("grape", [
		["path", {
			d: "M22 5V2l-5.89 5.89",
			key: "1eenpo"
		}],
		["circle", {
			cx: "16.6",
			cy: "15.89",
			r: "3",
			key: "xjtalx"
		}],
		["circle", {
			cx: "8.11",
			cy: "7.4",
			r: "3",
			key: "u2fv6i"
		}],
		["circle", {
			cx: "12.35",
			cy: "11.65",
			r: "3",
			key: "i6i8g7"
		}],
		["circle", {
			cx: "13.91",
			cy: "5.85",
			r: "3",
			key: "6ye0dv"
		}],
		["circle", {
			cx: "18.15",
			cy: "10.09",
			r: "3",
			key: "snx9no"
		}],
		["circle", {
			cx: "6.56",
			cy: "13.2",
			r: "3",
			key: "17x4xg"
		}],
		["circle", {
			cx: "10.8",
			cy: "17.44",
			r: "3",
			key: "1hogw9"
		}],
		["circle", {
			cx: "5",
			cy: "19",
			r: "3",
			key: "1sn6vo"
		}]
	]);
	const Grid2x2Check = createLucideIcon("grid-2x2-check", [["path", {
		d: "M12 3v17a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a1 1 0 0 1-1 1H3",
		key: "11za1p"
	}], ["path", {
		d: "m16 19 2 2 4-4",
		key: "1b14m6"
	}]]);
	const Grid2x2Plus = createLucideIcon("grid-2x2-plus", [
		["path", {
			d: "M12 3v17a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a1 1 0 0 1-1 1H3",
			key: "11za1p"
		}],
		["path", {
			d: "M16 19h6",
			key: "xwg31i"
		}],
		["path", {
			d: "M19 22v-6",
			key: "qhmiwi"
		}]
	]);
	const Grid2x2X = createLucideIcon("grid-2x2-x", [
		["path", {
			d: "M12 3v17a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a1 1 0 0 1-1 1H3",
			key: "11za1p"
		}],
		["path", {
			d: "m16 16 5 5",
			key: "8tpb07"
		}],
		["path", {
			d: "m16 21 5-5",
			key: "193jll"
		}]
	]);
	const Grid2x2 = createLucideIcon("grid-2x2", [
		["path", {
			d: "M12 3v18",
			key: "108xh3"
		}],
		["path", {
			d: "M3 12h18",
			key: "1i2n21"
		}],
		["rect", {
			x: "3",
			y: "3",
			width: "18",
			height: "18",
			rx: "2",
			key: "h1oib"
		}]
	]);
	const Grid3x3 = createLucideIcon("grid-3x3", [
		["rect", {
			width: "18",
			height: "18",
			x: "3",
			y: "3",
			rx: "2",
			key: "afitv7"
		}],
		["path", {
			d: "M3 9h18",
			key: "1pudct"
		}],
		["path", {
			d: "M3 15h18",
			key: "5xshup"
		}],
		["path", {
			d: "M9 3v18",
			key: "fh3hqa"
		}],
		["path", {
			d: "M15 3v18",
			key: "14nvp0"
		}]
	]);
	const Grid3x2 = createLucideIcon("grid-3x2", [
		["path", {
			d: "M15 3v18",
			key: "14nvp0"
		}],
		["path", {
			d: "M3 12h18",
			key: "1i2n21"
		}],
		["path", {
			d: "M9 3v18",
			key: "fh3hqa"
		}],
		["rect", {
			x: "3",
			y: "3",
			width: "18",
			height: "18",
			rx: "2",
			key: "h1oib"
		}]
	]);
	const GripHorizontal = createLucideIcon("grip-horizontal", [
		["circle", {
			cx: "12",
			cy: "9",
			r: "1",
			key: "124mty"
		}],
		["circle", {
			cx: "19",
			cy: "9",
			r: "1",
			key: "1ruzo2"
		}],
		["circle", {
			cx: "5",
			cy: "9",
			r: "1",
			key: "1a8b28"
		}],
		["circle", {
			cx: "12",
			cy: "15",
			r: "1",
			key: "1e56xg"
		}],
		["circle", {
			cx: "19",
			cy: "15",
			r: "1",
			key: "1a92ep"
		}],
		["circle", {
			cx: "5",
			cy: "15",
			r: "1",
			key: "5r1jwy"
		}]
	]);
	const GripVertical = createLucideIcon("grip-vertical", [
		["circle", {
			cx: "9",
			cy: "12",
			r: "1",
			key: "1vctgf"
		}],
		["circle", {
			cx: "9",
			cy: "5",
			r: "1",
			key: "hp0tcf"
		}],
		["circle", {
			cx: "9",
			cy: "19",
			r: "1",
			key: "fkjjf6"
		}],
		["circle", {
			cx: "15",
			cy: "12",
			r: "1",
			key: "1tmaij"
		}],
		["circle", {
			cx: "15",
			cy: "5",
			r: "1",
			key: "19l28e"
		}],
		["circle", {
			cx: "15",
			cy: "19",
			r: "1",
			key: "f4zoj3"
		}]
	]);
	const Grip = createLucideIcon("grip", [
		["circle", {
			cx: "12",
			cy: "5",
			r: "1",
			key: "gxeob9"
		}],
		["circle", {
			cx: "19",
			cy: "5",
			r: "1",
			key: "w8mnmm"
		}],
		["circle", {
			cx: "5",
			cy: "5",
			r: "1",
			key: "lttvr7"
		}],
		["circle", {
			cx: "12",
			cy: "12",
			r: "1",
			key: "41hilf"
		}],
		["circle", {
			cx: "19",
			cy: "12",
			r: "1",
			key: "1wjl8i"
		}],
		["circle", {
			cx: "5",
			cy: "12",
			r: "1",
			key: "1pcz8c"
		}],
		["circle", {
			cx: "12",
			cy: "19",
			r: "1",
			key: "lyex9k"
		}],
		["circle", {
			cx: "19",
			cy: "19",
			r: "1",
			key: "shf9b7"
		}],
		["circle", {
			cx: "5",
			cy: "19",
			r: "1",
			key: "bfqh0e"
		}]
	]);
	const Group = createLucideIcon("group", [
		["path", {
			d: "M3 7V5c0-1.1.9-2 2-2h2",
			key: "adw53z"
		}],
		["path", {
			d: "M17 3h2c1.1 0 2 .9 2 2v2",
			key: "an4l38"
		}],
		["path", {
			d: "M21 17v2c0 1.1-.9 2-2 2h-2",
			key: "144t0e"
		}],
		["path", {
			d: "M7 21H5c-1.1 0-2-.9-2-2v-2",
			key: "rtnfgi"
		}],
		["rect", {
			width: "7",
			height: "5",
			x: "7",
			y: "7",
			rx: "1",
			key: "1eyiv7"
		}],
		["rect", {
			width: "7",
			height: "5",
			x: "10",
			y: "12",
			rx: "1",
			key: "1qlmkx"
		}]
	]);
	const Guitar = createLucideIcon("guitar", [
		["path", {
			d: "m11.9 12.1 4.514-4.514",
			key: "109xqo"
		}],
		["path", {
			d: "M20.1 2.3a1 1 0 0 0-1.4 0l-1.114 1.114A2 2 0 0 0 17 4.828v1.344a2 2 0 0 1-.586 1.414A2 2 0 0 1 17.828 7h1.344a2 2 0 0 0 1.414-.586L21.7 5.3a1 1 0 0 0 0-1.4z",
			key: "txyc8t"
		}],
		["path", {
			d: "m6 16 2 2",
			key: "16qmzd"
		}],
		["path", {
			d: "M8.23 9.85A3 3 0 0 1 11 8a5 5 0 0 1 5 5 3 3 0 0 1-1.85 2.77l-.92.38A2 2 0 0 0 12 18a4 4 0 0 1-4 4 6 6 0 0 1-6-6 4 4 0 0 1 4-4 2 2 0 0 0 1.85-1.23z",
			key: "1de1vg"
		}]
	]);
	const Ham = createLucideIcon("ham", [
		["path", {
			d: "M13.144 21.144A7.274 10.445 45 1 0 2.856 10.856",
			key: "1k1t7q"
		}],
		["path", {
			d: "M13.144 21.144A7.274 4.365 45 0 0 2.856 10.856a7.274 4.365 45 0 0 10.288 10.288",
			key: "153t1g"
		}],
		["path", {
			d: "M16.565 10.435 18.6 8.4a2.501 2.501 0 1 0 1.65-4.65 2.5 2.5 0 1 0-4.66 1.66l-2.024 2.025",
			key: "gzrt0n"
		}],
		["path", {
			d: "m8.5 16.5-1-1",
			key: "otr954"
		}]
	]);
	const Hamburger = createLucideIcon("hamburger", [
		["path", {
			d: "M12 16H4a2 2 0 1 1 0-4h16a2 2 0 1 1 0 4h-4.25",
			key: "5dloqd"
		}],
		["path", {
			d: "M5 12a2 2 0 0 1-2-2 9 7 0 0 1 18 0 2 2 0 0 1-2 2",
			key: "1vl3my"
		}],
		["path", {
			d: "M5 16a2 2 0 0 0-2 2 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 2 2 0 0 0-2-2q0 0 0 0",
			key: "1us75o"
		}],
		["path", {
			d: "m6.67 12 6.13 4.6a2 2 0 0 0 2.8-.4l3.15-4.2",
			key: "qqzweh"
		}]
	]);
	const Hammer = createLucideIcon("hammer", [
		["path", {
			d: "m15 12-9.373 9.373a1 1 0 0 1-3.001-3L12 9",
			key: "1hayfq"
		}],
		["path", {
			d: "m18 15 4-4",
			key: "16gjal"
		}],
		["path", {
			d: "m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172v-.344a2 2 0 0 0-.586-1.414l-1.657-1.657A6 6 0 0 0 12.516 3H9l1.243 1.243A6 6 0 0 1 12 8.485V10l2 2h1.172a2 2 0 0 1 1.414.586L18.5 14.5",
			key: "15ts47"
		}]
	]);
	const HandCoins = createLucideIcon("hand-coins", [
		["path", {
			d: "M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17",
			key: "geh8rc"
		}],
		["path", {
			d: "m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9",
			key: "1fto5m"
		}],
		["path", {
			d: "m2 16 6 6",
			key: "1pfhp9"
		}],
		["circle", {
			cx: "16",
			cy: "9",
			r: "2.9",
			key: "1n0dlu"
		}],
		["circle", {
			cx: "6",
			cy: "5",
			r: "3",
			key: "151irh"
		}]
	]);
	const HandFist = createLucideIcon("hand-fist", [
		["path", {
			d: "M12.035 17.012a3 3 0 0 0-3-3l-.311-.002a.72.72 0 0 1-.505-1.229l1.195-1.195A2 2 0 0 1 10.828 11H12a2 2 0 0 0 0-4H9.243a3 3 0 0 0-2.122.879l-2.707 2.707A4.83 4.83 0 0 0 3 14a8 8 0 0 0 8 8h2a8 8 0 0 0 8-8V7a2 2 0 1 0-4 0v2a2 2 0 1 0 4 0",
			key: "1ff7rl"
		}],
		["path", {
			d: "M13.888 9.662A2 2 0 0 0 17 8V5A2 2 0 1 0 13 5",
			key: "1xmd21"
		}],
		["path", {
			d: "M9 5A2 2 0 1 0 5 5V10",
			key: "f3wfjw"
		}],
		["path", {
			d: "M9 7V4A2 2 0 1 1 13 4V7.268",
			key: "eaoucv"
		}]
	]);
	const HandGrab = createLucideIcon("hand-grab", [
		["path", {
			d: "M18 11.5V9a2 2 0 0 0-2-2a2 2 0 0 0-2 2v1.4",
			key: "edstyy"
		}],
		["path", {
			d: "M14 10V8a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2",
			key: "19wdwo"
		}],
		["path", {
			d: "M10 9.9V9a2 2 0 0 0-2-2a2 2 0 0 0-2 2v5",
			key: "1lugqo"
		}],
		["path", {
			d: "M6 14a2 2 0 0 0-2-2a2 2 0 0 0-2 2",
			key: "1hbeus"
		}],
		["path", {
			d: "M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-4a8 8 0 0 1-8-8 2 2 0 1 1 4 0",
			key: "1etffm"
		}]
	]);
	const HandHeart = createLucideIcon("hand-heart", [
		["path", {
			d: "M11 14h2a2 2 0 0 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 16",
			key: "1v1a37"
		}],
		["path", {
			d: "m14.45 13.39 5.05-4.694C20.196 8 21 6.85 21 5.75a2.75 2.75 0 0 0-4.797-1.837.276.276 0 0 1-.406 0A2.75 2.75 0 0 0 11 5.75c0 1.2.802 2.248 1.5 2.946L16 11.95",
			key: "fhfbnt"
		}],
		["path", {
			d: "m2 15 6 6",
			key: "10dquu"
		}],
		["path", {
			d: "m7 20 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a1 1 0 0 0-2.75-2.91",
			key: "1x6kdw"
		}]
	]);
	const HandMetal = createLucideIcon("hand-metal", [
		["path", {
			d: "M18 12.5V10a2 2 0 0 0-2-2a2 2 0 0 0-2 2v1.4",
			key: "wc6myp"
		}],
		["path", {
			d: "M14 11V9a2 2 0 1 0-4 0v2",
			key: "94qvcw"
		}],
		["path", {
			d: "M10 10.5V5a2 2 0 1 0-4 0v9",
			key: "m1ah89"
		}],
		["path", {
			d: "m7 15-1.76-1.76a2 2 0 0 0-2.83 2.82l3.6 3.6C7.5 21.14 9.2 22 12 22h2a8 8 0 0 0 8-8V7a2 2 0 1 0-4 0v5",
			key: "t1skq1"
		}]
	]);
	const HandHelping = createLucideIcon("hand-helping", [
		["path", {
			d: "M11 12h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 14",
			key: "1j4xps"
		}],
		["path", {
			d: "m7 18 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9",
			key: "uospg8"
		}],
		["path", {
			d: "m2 13 6 6",
			key: "16e5sb"
		}]
	]);
	const HandPlatter = createLucideIcon("hand-platter", [
		["path", {
			d: "M12 3V2",
			key: "ar7q03"
		}],
		["path", {
			d: "m15.4 17.4 3.2-2.8a2 2 0 1 1 2.8 2.9l-3.6 3.3c-.7.8-1.7 1.2-2.8 1.2h-4c-1.1 0-2.1-.4-2.8-1.2l-1.302-1.464A1 1 0 0 0 6.151 19H5",
			key: "n2g93r"
		}],
		["path", {
			d: "M2 14h12a2 2 0 0 1 0 4h-2",
			key: "1o2jem"
		}],
		["path", {
			d: "M4 10h16",
			key: "img6z1"
		}],
		["path", {
			d: "M5 10a7 7 0 0 1 14 0",
			key: "1ega1o"
		}],
		["path", {
			d: "M5 14v6a1 1 0 0 1-1 1H2",
			key: "1hescx"
		}]
	]);
	const Hand = createLucideIcon("hand", [
		["path", {
			d: "M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2",
			key: "1fvzgz"
		}],
		["path", {
			d: "M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2",
			key: "1kc0my"
		}],
		["path", {
			d: "M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8",
			key: "10h0bg"
		}],
		["path", {
			d: "M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15",
			key: "1s1gnw"
		}]
	]);
	const Handbag = createLucideIcon("handbag", [["path", {
		d: "M2.048 18.566A2 2 0 0 0 4 21h16a2 2 0 0 0 1.952-2.434l-2-9A2 2 0 0 0 18 8H6a2 2 0 0 0-1.952 1.566z",
		key: "1qbui5"
	}], ["path", {
		d: "M8 11V6a4 4 0 0 1 8 0v5",
		key: "tcht90"
	}]]);
	const Handshake = createLucideIcon("handshake", [
		["path", {
			d: "m11 17 2 2a1 1 0 1 0 3-3",
			key: "efffak"
		}],
		["path", {
			d: "m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4",
			key: "9pr0kb"
		}],
		["path", {
			d: "m21 3 1 11h-2",
			key: "1tisrp"
		}],
		["path", {
			d: "M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3",
			key: "1uvwmv"
		}],
		["path", {
			d: "M3 4h8",
			key: "1ep09j"
		}]
	]);
	const HardDriveDownload = createLucideIcon("hard-drive-download", [
		["path", {
			d: "M12 2v8",
			key: "1q4o3n"
		}],
		["path", {
			d: "m16 6-4 4-4-4",
			key: "6wukr"
		}],
		["rect", {
			width: "20",
			height: "8",
			x: "2",
			y: "14",
			rx: "2",
			key: "w68u3i"
		}],
		["path", {
			d: "M6 18h.01",
			key: "uhywen"
		}],
		["path", {
			d: "M10 18h.01",
			key: "h775k"
		}]
	]);
	const HardDriveUpload = createLucideIcon("hard-drive-upload", [
		["path", {
			d: "m16 6-4-4-4 4",
			key: "13yo43"
		}],
		["path", {
			d: "M12 2v8",
			key: "1q4o3n"
		}],
		["rect", {
			width: "20",
			height: "8",
			x: "2",
			y: "14",
			rx: "2",
			key: "w68u3i"
		}],
		["path", {
			d: "M6 18h.01",
			key: "uhywen"
		}],
		["path", {
			d: "M10 18h.01",
			key: "h775k"
		}]
	]);
	const HardDrive = createLucideIcon("hard-drive", [
		["line", {
			x1: "22",
			x2: "2",
			y1: "12",
			y2: "12",
			key: "1y58io"
		}],
		["path", {
			d: "M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",
			key: "oot6mr"
		}],
		["line", {
			x1: "6",
			x2: "6.01",
			y1: "16",
			y2: "16",
			key: "sgf278"
		}],
		["line", {
			x1: "10",
			x2: "10.01",
			y1: "16",
			y2: "16",
			key: "1l4acy"
		}]
	]);
	const HardHat = createLucideIcon("hard-hat", [
		["path", {
			d: "M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5",
			key: "1p9q5i"
		}],
		["path", {
			d: "M14 6a6 6 0 0 1 6 6v3",
			key: "1hnv84"
		}],
		["path", {
			d: "M4 15v-3a6 6 0 0 1 6-6",
			key: "9ciidu"
		}],
		["rect", {
			x: "2",
			y: "15",
			width: "20",
			height: "4",
			rx: "1",
			key: "g3x8cw"
		}]
	]);
	const Hash = createLucideIcon("hash", [
		["line", {
			x1: "4",
			x2: "20",
			y1: "9",
			y2: "9",
			key: "4lhtct"
		}],
		["line", {
			x1: "4",
			x2: "20",
			y1: "15",
			y2: "15",
			key: "vyu0kd"
		}],
		["line", {
			x1: "10",
			x2: "8",
			y1: "3",
			y2: "21",
			key: "1ggp8o"
		}],
		["line", {
			x1: "16",
			x2: "14",
			y1: "3",
			y2: "21",
			key: "weycgp"
		}]
	]);
	const HatGlasses = createLucideIcon("hat-glasses", [
		["path", {
			d: "M14 18a2 2 0 0 0-4 0",
			key: "1v8fkw"
		}],
		["path", {
			d: "m19 11-2.11-6.657a2 2 0 0 0-2.752-1.148l-1.276.61A2 2 0 0 1 12 4H8.5a2 2 0 0 0-1.925 1.456L5 11",
			key: "1fkr7p"
		}],
		["path", {
			d: "M2 11h20",
			key: "3eubbj"
		}],
		["circle", {
			cx: "17",
			cy: "18",
			r: "3",
			key: "82mm0e"
		}],
		["circle", {
			cx: "7",
			cy: "18",
			r: "3",
			key: "lvkj7j"
		}]
	]);
	const HdmiPort = createLucideIcon("hdmi-port", [["path", {
		d: "M22 9a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h1l2 2h12l2-2h1a1 1 0 0 0 1-1Z",
		key: "2128wb"
	}], ["path", {
		d: "M7.5 12h9",
		key: "1t0ckc"
	}]]);
	const Haze = createLucideIcon("haze", [
		["path", {
			d: "m5.2 6.2 1.4 1.4",
			key: "17imol"
		}],
		["path", {
			d: "M2 13h2",
			key: "13gyu8"
		}],
		["path", {
			d: "M20 13h2",
			key: "16rner"
		}],
		["path", {
			d: "m17.4 7.6 1.4-1.4",
			key: "t4xlah"
		}],
		["path", {
			d: "M22 17H2",
			key: "1gtaj3"
		}],
		["path", {
			d: "M22 21H2",
			key: "1gy6en"
		}],
		["path", {
			d: "M16 13a4 4 0 0 0-8 0",
			key: "1dyczq"
		}],
		["path", {
			d: "M12 5V2.5",
			key: "1vytko"
		}]
	]);
	const Heading1 = createLucideIcon("heading-1", [
		["path", {
			d: "M4 12h8",
			key: "17cfdx"
		}],
		["path", {
			d: "M4 18V6",
			key: "1rz3zl"
		}],
		["path", {
			d: "M12 18V6",
			key: "zqpxq5"
		}],
		["path", {
			d: "m17 12 3-2v8",
			key: "1hhhft"
		}]
	]);
	const Heading2 = createLucideIcon("heading-2", [
		["path", {
			d: "M4 12h8",
			key: "17cfdx"
		}],
		["path", {
			d: "M4 18V6",
			key: "1rz3zl"
		}],
		["path", {
			d: "M12 18V6",
			key: "zqpxq5"
		}],
		["path", {
			d: "M21 18h-4c0-4 4-3 4-6 0-1.5-2-2.5-4-1",
			key: "9jr5yi"
		}]
	]);
	const Heading3 = createLucideIcon("heading-3", [
		["path", {
			d: "M4 12h8",
			key: "17cfdx"
		}],
		["path", {
			d: "M4 18V6",
			key: "1rz3zl"
		}],
		["path", {
			d: "M12 18V6",
			key: "zqpxq5"
		}],
		["path", {
			d: "M17.5 10.5c1.7-1 3.5 0 3.5 1.5a2 2 0 0 1-2 2",
			key: "68ncm8"
		}],
		["path", {
			d: "M17 17.5c2 1.5 4 .3 4-1.5a2 2 0 0 0-2-2",
			key: "1ejuhz"
		}]
	]);
	const Heading4 = createLucideIcon("heading-4", [
		["path", {
			d: "M12 18V6",
			key: "zqpxq5"
		}],
		["path", {
			d: "M17 10v3a1 1 0 0 0 1 1h3",
			key: "tj5zdr"
		}],
		["path", {
			d: "M21 10v8",
			key: "1kdml4"
		}],
		["path", {
			d: "M4 12h8",
			key: "17cfdx"
		}],
		["path", {
			d: "M4 18V6",
			key: "1rz3zl"
		}]
	]);
	const Heading5 = createLucideIcon("heading-5", [
		["path", {
			d: "M4 12h8",
			key: "17cfdx"
		}],
		["path", {
			d: "M4 18V6",
			key: "1rz3zl"
		}],
		["path", {
			d: "M12 18V6",
			key: "zqpxq5"
		}],
		["path", {
			d: "M17 13v-3h4",
			key: "1nvgqp"
		}],
		["path", {
			d: "M17 17.7c.4.2.8.3 1.3.3 1.5 0 2.7-1.1 2.7-2.5S19.8 13 18.3 13H17",
			key: "2nebdn"
		}]
	]);
	const Heading6 = createLucideIcon("heading-6", [
		["path", {
			d: "M4 12h8",
			key: "17cfdx"
		}],
		["path", {
			d: "M4 18V6",
			key: "1rz3zl"
		}],
		["path", {
			d: "M12 18V6",
			key: "zqpxq5"
		}],
		["circle", {
			cx: "19",
			cy: "16",
			r: "2",
			key: "15mx69"
		}],
		["path", {
			d: "M20 10c-2 2-3 3.5-3 6",
			key: "f35dl0"
		}]
	]);
	const Heading = createLucideIcon("heading", [
		["path", {
			d: "M6 12h12",
			key: "8npq4p"
		}],
		["path", {
			d: "M6 20V4",
			key: "1w1bmo"
		}],
		["path", {
			d: "M18 20V4",
			key: "o2hl4u"
		}]
	]);
	const HeadphoneOff = createLucideIcon("headphone-off", [
		["path", {
			d: "M21 14h-1.343",
			key: "1jdnxi"
		}],
		["path", {
			d: "M9.128 3.47A9 9 0 0 1 21 12v3.343",
			key: "6kipu2"
		}],
		["path", {
			d: "m2 2 20 20",
			key: "1ooewy"
		}],
		["path", {
			d: "M20.414 20.414A2 2 0 0 1 19 21h-1a2 2 0 0 1-2-2v-3",
			key: "9x50f4"
		}],
		["path", {
			d: "M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 2.636-6.364",
			key: "1bkxnm"
		}]
	]);
	const Headphones = createLucideIcon("headphones", [["path", {
		d: "M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3",
		key: "1xhozi"
	}]]);
	const Headset = createLucideIcon("headset", [["path", {
		d: "M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z",
		key: "12oyoe"
	}], ["path", {
		d: "M21 16v2a4 4 0 0 1-4 4h-5",
		key: "1x7m43"
	}]]);
	const HeartCrack = createLucideIcon("heart-crack", [["path", {
		d: "M12.409 5.824c-.702.792-1.15 1.496-1.415 2.166l2.153 2.156a.5.5 0 0 1 0 .707l-2.293 2.293a.5.5 0 0 0 0 .707L12 15",
		key: "idzbju"
	}], ["path", {
		d: "M13.508 20.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5a5.5 5.5 0 0 1 9.591-3.677.6.6 0 0 0 .818.001A5.5 5.5 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5z",
		key: "1su70f"
	}]]);
	const HeartHandshake = createLucideIcon("heart-handshake", [["path", {
		d: "M19.414 14.414C21 12.828 22 11.5 22 9.5a5.5 5.5 0 0 0-9.591-3.676.6.6 0 0 1-.818.001A5.5 5.5 0 0 0 2 9.5c0 2.3 1.5 4 3 5.5l5.535 5.362a2 2 0 0 0 2.879.052 2.12 2.12 0 0 0-.004-3 2.124 2.124 0 1 0 3-3 2.124 2.124 0 0 0 3.004 0 2 2 0 0 0 0-2.828l-1.881-1.882a2.41 2.41 0 0 0-3.409 0l-1.71 1.71a2 2 0 0 1-2.828 0 2 2 0 0 1 0-2.828l2.823-2.762",
		key: "17lmqv"
	}]]);
	const HeartMinus = createLucideIcon("heart-minus", [["path", {
		d: "m14.876 18.99-1.368 1.323a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5a5.2 5.2 0 0 1-.244 1.572",
		key: "15yztm"
	}], ["path", {
		d: "M15 15h6",
		key: "1u4692"
	}]]);
	const HeartOff = createLucideIcon("heart-off", [
		["path", {
			d: "M10.5 4.893a5.5 5.5 0 0 1 1.091.931.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 1.872-1.002 3.356-2.187 4.655",
			key: "1inpfl"
		}],
		["path", {
			d: "m16.967 16.967-3.459 3.346a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5a5.5 5.5 0 0 1 2.747-4.761",
			key: "vbc6x7"
		}],
		["path", {
			d: "m2 2 20 20",
			key: "1ooewy"
		}]
	]);
	const HeartPlus = createLucideIcon("heart-plus", [
		["path", {
			d: "m14.479 19.374-.971.939a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5a5.2 5.2 0 0 1-.219 1.49",
			key: "wg5jx"
		}],
		["path", {
			d: "M15 15h6",
			key: "1u4692"
		}],
		["path", {
			d: "M18 12v6",
			key: "1houu1"
		}]
	]);
	const HeartPulse = createLucideIcon("heart-pulse", [["path", {
		d: "M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5",
		key: "mvr1a0"
	}], ["path", {
		d: "M3.22 13H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27",
		key: "auskq0"
	}]]);
	const Heart = createLucideIcon("heart", [["path", {
		d: "M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5",
		key: "mvr1a0"
	}]]);
	const Heater = createLucideIcon("heater", [
		["path", {
			d: "M11 8c2-3-2-3 0-6",
			key: "1ldv5m"
		}],
		["path", {
			d: "M15.5 8c2-3-2-3 0-6",
			key: "1otqoz"
		}],
		["path", {
			d: "M6 10h.01",
			key: "1lbq93"
		}],
		["path", {
			d: "M6 14h.01",
			key: "zudwn7"
		}],
		["path", {
			d: "M10 16v-4",
			key: "1c25yv"
		}],
		["path", {
			d: "M14 16v-4",
			key: "1dkbt8"
		}],
		["path", {
			d: "M18 16v-4",
			key: "1yg9me"
		}],
		["path", {
			d: "M20 6a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3",
			key: "1ubg90"
		}],
		["path", {
			d: "M5 20v2",
			key: "1abpe8"
		}],
		["path", {
			d: "M19 20v2",
			key: "kqn6ft"
		}]
	]);
	const Hexagon = createLucideIcon("hexagon", [["path", {
		d: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z",
		key: "yt0hxn"
	}]]);
	const History = createLucideIcon("history", [
		["path", {
			d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",
			key: "1357e3"
		}],
		["path", {
			d: "M3 3v5h5",
			key: "1xhq8a"
		}],
		["path", {
			d: "M12 7v5l4 2",
			key: "1fdv2h"
		}]
	]);
	const Highlighter = createLucideIcon("highlighter", [["path", {
		d: "m9 11-6 6v3h9l3-3",
		key: "1a3l36"
	}], ["path", {
		d: "m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4",
		key: "14a9rk"
	}]]);
	const HopOff = createLucideIcon("hop-off", [
		["path", {
			d: "M10.82 16.12c1.69.6 3.91.79 5.18.85.28.01.53-.09.7-.27",
			key: "qyzcap"
		}],
		["path", {
			d: "M11.14 20.57c.52.24 2.44 1.12 4.08 1.37.46.06.86-.25.9-.71.12-1.52-.3-3.43-.5-4.28",
			key: "y078lb"
		}],
		["path", {
			d: "M16.13 21.05c1.65.63 3.68.84 4.87.91a.9.9 0 0 0 .7-.26",
			key: "1utre3"
		}],
		["path", {
			d: "M17.99 5.52a20.83 20.83 0 0 1 3.15 4.5.8.8 0 0 1-.68 1.13c-1.17.1-2.5.02-3.9-.25",
			key: "17o9hm"
		}],
		["path", {
			d: "M20.57 11.14c.24.52 1.12 2.44 1.37 4.08.04.3-.08.59-.31.75",
			key: "1d1n4p"
		}],
		["path", {
			d: "M4.93 4.93a10 10 0 0 0-.67 13.4c.35.43.96.4 1.17-.12.69-1.71 1.07-5.07 1.07-6.71 1.34.45 3.1.9 4.88.62a.85.85 0 0 0 .48-.24",
			key: "9uv3tt"
		}],
		["path", {
			d: "M5.52 17.99c1.05.95 2.91 2.42 4.5 3.15a.8.8 0 0 0 1.13-.68c.2-2.34-.33-5.3-1.57-8.28",
			key: "1292wz"
		}],
		["path", {
			d: "M8.35 2.68a10 10 0 0 1 9.98 1.58c.43.35.4.96-.12 1.17-1.5.6-4.3.98-6.07 1.05",
			key: "7ozu9p"
		}],
		["path", {
			d: "m2 2 20 20",
			key: "1ooewy"
		}]
	]);
	const Hop = createLucideIcon("hop", [
		["path", {
			d: "M10.82 16.12c1.69.6 3.91.79 5.18.85.55.03 1-.42.97-.97-.06-1.27-.26-3.5-.85-5.18",
			key: "18lxf1"
		}],
		["path", {
			d: "M11.5 6.5c1.64 0 5-.38 6.71-1.07.52-.2.55-.82.12-1.17A10 10 0 0 0 4.26 18.33c.35.43.96.4 1.17-.12.69-1.71 1.07-5.07 1.07-6.71 1.34.45 3.1.9 4.88.62a.88.88 0 0 0 .73-.74c.3-2.14-.15-3.5-.61-4.88",
			key: "vtfxrw"
		}],
		["path", {
			d: "M15.62 16.95c.2.85.62 2.76.5 4.28a.77.77 0 0 1-.9.7 16.64 16.64 0 0 1-4.08-1.36",
			key: "13hl71"
		}],
		["path", {
			d: "M16.13 21.05c1.65.63 3.68.84 4.87.91a.9.9 0 0 0 .96-.96 17.68 17.68 0 0 0-.9-4.87",
			key: "1sl8oj"
		}],
		["path", {
			d: "M16.94 15.62c.86.2 2.77.62 4.29.5a.77.77 0 0 0 .7-.9 16.64 16.64 0 0 0-1.36-4.08",
			key: "19c6kt"
		}],
		["path", {
			d: "M17.99 5.52a20.82 20.82 0 0 1 3.15 4.5.8.8 0 0 1-.68 1.13c-2.33.2-5.3-.32-8.27-1.57",
			key: "85ghs3"
		}],
		["path", {
			d: "M4.93 4.93 3 3a.7.7 0 0 1 0-1",
			key: "x087yj"
		}],
		["path", {
			d: "M9.58 12.18c1.24 2.98 1.77 5.95 1.57 8.28a.8.8 0 0 1-1.13.68 20.82 20.82 0 0 1-4.5-3.15",
			key: "11xdqo"
		}]
	]);
	const Hospital = createLucideIcon("hospital", [
		["path", {
			d: "M12 7v4",
			key: "xawao1"
		}],
		["path", {
			d: "M14 21v-3a2 2 0 0 0-4 0v3",
			key: "1rgiei"
		}],
		["path", {
			d: "M14 9h-4",
			key: "1w2s2s"
		}],
		["path", {
			d: "M18 11h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2",
			key: "1tthqt"
		}],
		["path", {
			d: "M18 21V5a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16",
			key: "dw4p4i"
		}]
	]);
	const Hotel = createLucideIcon("hotel", [
		["path", {
			d: "M10 22v-6.57",
			key: "1wmca3"
		}],
		["path", {
			d: "M12 11h.01",
			key: "z322tv"
		}],
		["path", {
			d: "M12 7h.01",
			key: "1ivr5q"
		}],
		["path", {
			d: "M14 15.43V22",
			key: "1q2vjd"
		}],
		["path", {
			d: "M15 16a5 5 0 0 0-6 0",
			key: "o9wqvi"
		}],
		["path", {
			d: "M16 11h.01",
			key: "xkw8gn"
		}],
		["path", {
			d: "M16 7h.01",
			key: "1kdx03"
		}],
		["path", {
			d: "M8 11h.01",
			key: "1dfujw"
		}],
		["path", {
			d: "M8 7h.01",
			key: "1vti4s"
		}],
		["rect", {
			x: "4",
			y: "2",
			width: "16",
			height: "20",
			rx: "2",
			key: "1uxh74"
		}]
	]);
	const Hourglass = createLucideIcon("hourglass", [
		["path", {
			d: "M5 22h14",
			key: "ehvnwv"
		}],
		["path", {
			d: "M5 2h14",
			key: "pdyrp9"
		}],
		["path", {
			d: "M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22",
			key: "1d314k"
		}],
		["path", {
			d: "M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2",
			key: "1vvvr6"
		}]
	]);
	const HouseHeart = createLucideIcon("house-heart", [["path", {
		d: "M8.62 13.8A2.25 2.25 0 1 1 12 10.836a2.25 2.25 0 1 1 3.38 2.966l-2.626 2.856a.998.998 0 0 1-1.507 0z",
		key: "n9s7kx"
	}], ["path", {
		d: "M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
		key: "r6nss1"
	}]]);
	const HousePlug = createLucideIcon("house-plug", [
		["path", {
			d: "M10 12V8.964",
			key: "1vll13"
		}],
		["path", {
			d: "M14 12V8.964",
			key: "1x3qvg"
		}],
		["path", {
			d: "M15 12a1 1 0 0 1 1 1v2a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-2a1 1 0 0 1 1-1z",
			key: "ppykja"
		}],
		["path", {
			d: "M8.5 21H5a2 2 0 0 1-2-2v-9a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2h-5a2 2 0 0 1-2-2v-2",
			key: "365xoy"
		}]
	]);
	const HousePlus = createLucideIcon("house-plus", [
		["path", {
			d: "M12.35 21H5a2 2 0 0 1-2-2v-9a2 2 0 0 1 .71-1.53l7-6a2 2 0 0 1 2.58 0l7 6A2 2 0 0 1 21 10v2.35",
			key: "8ek5ge"
		}],
		["path", {
			d: "M14.8 12.4A1 1 0 0 0 14 12h-4a1 1 0 0 0-1 1v8",
			key: "1rbg29"
		}],
		["path", {
			d: "M15 18h6",
			key: "3b3c90"
		}],
		["path", {
			d: "M18 15v6",
			key: "9wciyi"
		}]
	]);
	const HouseWifi = createLucideIcon("house-wifi", [
		["path", {
			d: "M9.5 13.866a4 4 0 0 1 5 .01",
			key: "1wy54i"
		}],
		["path", {
			d: "M12 17h.01",
			key: "p32p05"
		}],
		["path", {
			d: "M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
			key: "r6nss1"
		}],
		["path", {
			d: "M7 10.754a8 8 0 0 1 10 0",
			key: "exoy2g"
		}]
	]);
	const House = createLucideIcon("house", [["path", {
		d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",
		key: "5wwlr5"
	}], ["path", {
		d: "M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
		key: "r6nss1"
	}]]);
	const IceCreamBowl = createLucideIcon("ice-cream-bowl", [
		["path", {
			d: "M12 17c5 0 8-2.69 8-6H4c0 3.31 3 6 8 6m-4 4h8m-4-3v3M5.14 11a3.5 3.5 0 1 1 6.71 0",
			key: "1uxfcu"
		}],
		["path", {
			d: "M12.14 11a3.5 3.5 0 1 1 6.71 0",
			key: "4k3m1s"
		}],
		["path", {
			d: "M15.5 6.5a3.5 3.5 0 1 0-7 0",
			key: "zmuahr"
		}]
	]);
	const IceCreamCone = createLucideIcon("ice-cream-cone", [
		["path", {
			d: "m7 11 4.08 10.35a1 1 0 0 0 1.84 0L17 11",
			key: "1v6356"
		}],
		["path", {
			d: "M17 7A5 5 0 0 0 7 7",
			key: "151p3v"
		}],
		["path", {
			d: "M17 7a2 2 0 0 1 0 4H7a2 2 0 0 1 0-4",
			key: "1sdaij"
		}]
	]);
	const IdCardLanyard = createLucideIcon("id-card-lanyard", [
		["path", {
			d: "M13.5 8h-3",
			key: "xvov4w"
		}],
		["path", {
			d: "m15 2-1 2h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h3",
			key: "16uttc"
		}],
		["path", {
			d: "M16.899 22A5 5 0 0 0 7.1 22",
			key: "1d0ppr"
		}],
		["path", {
			d: "m9 2 3 6",
			key: "1o7bd9"
		}],
		["circle", {
			cx: "12",
			cy: "15",
			r: "3",
			key: "g36mzq"
		}]
	]);
	const IdCard = createLucideIcon("id-card", [
		["path", {
			d: "M16 10h2",
			key: "8sgtl7"
		}],
		["path", {
			d: "M16 14h2",
			key: "epxaof"
		}],
		["path", {
			d: "M6.17 15a3 3 0 0 1 5.66 0",
			key: "n6f512"
		}],
		["circle", {
			cx: "9",
			cy: "11",
			r: "2",
			key: "yxgjnd"
		}],
		["rect", {
			x: "2",
			y: "5",
			width: "20",
			height: "14",
			rx: "2",
			key: "qneu4z"
		}]
	]);
	const ImageDown = createLucideIcon("image-down", [
		["path", {
			d: "M10.3 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10l-3.1-3.1a2 2 0 0 0-2.814.014L6 21",
			key: "9csbqa"
		}],
		["path", {
			d: "m14 19 3 3v-5.5",
			key: "9ldu5r"
		}],
		["path", {
			d: "m17 22 3-3",
			key: "1nkfve"
		}],
		["circle", {
			cx: "9",
			cy: "9",
			r: "2",
			key: "af1f0g"
		}]
	]);
	const ImageMinus = createLucideIcon("image-minus", [
		["path", {
			d: "M21 9v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7",
			key: "m87ecr"
		}],
		["line", {
			x1: "16",
			x2: "22",
			y1: "5",
			y2: "5",
			key: "ez7e4s"
		}],
		["circle", {
			cx: "9",
			cy: "9",
			r: "2",
			key: "af1f0g"
		}],
		["path", {
			d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",
			key: "1xmnt7"
		}]
	]);
	const ImageOff = createLucideIcon("image-off", [
		["line", {
			x1: "2",
			x2: "22",
			y1: "2",
			y2: "22",
			key: "a6p6uj"
		}],
		["path", {
			d: "M10.41 10.41a2 2 0 1 1-2.83-2.83",
			key: "1bzlo9"
		}],
		["line", {
			x1: "13.5",
			x2: "6",
			y1: "13.5",
			y2: "21",
			key: "1q0aeu"
		}],
		["line", {
			x1: "18",
			x2: "21",
			y1: "12",
			y2: "15",
			key: "5mozeu"
		}],
		["path", {
			d: "M3.59 3.59A1.99 1.99 0 0 0 3 5v14a2 2 0 0 0 2 2h14c.55 0 1.052-.22 1.41-.59",
			key: "mmje98"
		}],
		["path", {
			d: "M21 15V5a2 2 0 0 0-2-2H9",
			key: "43el77"
		}]
	]);
	const ImagePlay = createLucideIcon("image-play", [
		["path", {
			d: "M15 15.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997a1 1 0 0 1-1.517-.86z",
			key: "nrt1m3"
		}],
		["path", {
			d: "M21 12.17V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6",
			key: "99hgts"
		}],
		["path", {
			d: "m6 21 5-5",
			key: "1wyjai"
		}],
		["circle", {
			cx: "9",
			cy: "9",
			r: "2",
			key: "af1f0g"
		}]
	]);
	const ImagePlus = createLucideIcon("image-plus", [
		["path", {
			d: "M16 5h6",
			key: "1vod17"
		}],
		["path", {
			d: "M19 2v6",
			key: "4bpg5p"
		}],
		["path", {
			d: "M21 11.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5",
			key: "1ue2ih"
		}],
		["path", {
			d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",
			key: "1xmnt7"
		}],
		["circle", {
			cx: "9",
			cy: "9",
			r: "2",
			key: "af1f0g"
		}]
	]);
	const ImageUp = createLucideIcon("image-up", [
		["path", {
			d: "M10.3 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10l-3.1-3.1a2 2 0 0 0-2.814.014L6 21",
			key: "9csbqa"
		}],
		["path", {
			d: "m14 19.5 3-3 3 3",
			key: "9vmjn0"
		}],
		["path", {
			d: "M17 22v-5.5",
			key: "1aa6fl"
		}],
		["circle", {
			cx: "9",
			cy: "9",
			r: "2",
			key: "af1f0g"
		}]
	]);
	const ImageUpscale = createLucideIcon("image-upscale", [
		["path", {
			d: "M16 3h5v5",
			key: "1806ms"
		}],
		["path", {
			d: "M17 21h2a2 2 0 0 0 2-2",
			key: "130fy9"
		}],
		["path", {
			d: "M21 12v3",
			key: "1wzk3p"
		}],
		["path", {
			d: "m21 3-5 5",
			key: "1g5oa7"
		}],
		["path", {
			d: "M3 7V5a2 2 0 0 1 2-2",
			key: "kk3yz1"
		}],
		["path", {
			d: "m5 21 4.144-4.144a1.21 1.21 0 0 1 1.712 0L13 19",
			key: "fyekpt"
		}],
		["path", {
			d: "M9 3h3",
			key: "d52fa"
		}],
		["rect", {
			x: "3",
			y: "11",
			width: "10",
			height: "10",
			rx: "1",
			key: "1wpmix"
		}]
	]);
	const Image$1 = createLucideIcon("image", [
		["rect", {
			width: "18",
			height: "18",
			x: "3",
			y: "3",
			rx: "2",
			ry: "2",
			key: "1m3agn"
		}],
		["circle", {
			cx: "9",
			cy: "9",
			r: "2",
			key: "af1f0g"
		}],
		["path", {
			d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",
			key: "1xmnt7"
		}]
	]);
	const Images = createLucideIcon("images", [
		["path", {
			d: "m22 11-1.296-1.296a2.4 2.4 0 0 0-3.408 0L11 16",
			key: "9kzy35"
		}],
		["path", {
			d: "M4 8a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2",
			key: "1t0f0t"
		}],
		["circle", {
			cx: "13",
			cy: "7",
			r: "1",
			fill: "currentColor",
			key: "1obus6"
		}],
		["rect", {
			x: "8",
			y: "2",
			width: "14",
			height: "14",
			rx: "2",
			key: "1gvhby"
		}]
	]);
	const Import = createLucideIcon("import", [
		["path", {
			d: "M12 3v12",
			key: "1x0j5s"
		}],
		["path", {
			d: "m8 11 4 4 4-4",
			key: "1dohi6"
		}],
		["path", {
			d: "M8 5H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-4",
			key: "1ywtjm"
		}]
	]);
	const Inbox = createLucideIcon("inbox", [["polyline", {
		points: "22 12 16 12 14 15 10 15 8 12 2 12",
		key: "o97t9d"
	}], ["path", {
		d: "M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",
		key: "oot6mr"
	}]]);
	const IndianRupee = createLucideIcon("indian-rupee", [
		["path", {
			d: "M6 3h12",
			key: "ggurg9"
		}],
		["path", {
			d: "M6 8h12",
			key: "6g4wlu"
		}],
		["path", {
			d: "m6 13 8.5 8",
			key: "u1kupk"
		}],
		["path", {
			d: "M6 13h3",
			key: "wdp6ag"
		}],
		["path", {
			d: "M9 13c6.667 0 6.667-10 0-10",
			key: "1nkvk2"
		}]
	]);
	const Infinity$1 = createLucideIcon("infinity", [["path", {
		d: "M6 16c5 0 7-8 12-8a4 4 0 0 1 0 8c-5 0-7-8-12-8a4 4 0 1 0 0 8",
		key: "18ogeb"
	}]]);
	const Info$1 = createLucideIcon("info", [
		["circle", {
			cx: "12",
			cy: "12",
			r: "10",
			key: "1mglay"
		}],
		["path", {
			d: "M12 16v-4",
			key: "1dtifu"
		}],
		["path", {
			d: "M12 8h.01",
			key: "e9boi3"
		}]
	]);
	const InspectionPanel = createLucideIcon("inspection-panel", [
		["rect", {
			width: "18",
			height: "18",
			x: "3",
			y: "3",
			rx: "2",
			key: "afitv7"
		}],
		["path", {
			d: "M7 7h.01",
			key: "7u93v4"
		}],
		["path", {
			d: "M17 7h.01",
			key: "14a9sn"
		}],
		["path", {
			d: "M7 17h.01",
			key: "19xn7k"
		}],
		["path", {
			d: "M17 17h.01",
			key: "1sd3ek"
		}]
	]);
	const Instagram = createLucideIcon("instagram", [
		["rect", {
			width: "20",
			height: "20",
			x: "2",
			y: "2",
			rx: "5",
			ry: "5",
			key: "2e1cvw"
		}],
		["path", {
			d: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z",
			key: "9exkf1"
		}],
		["line", {
			x1: "17.5",
			x2: "17.51",
			y1: "6.5",
			y2: "6.5",
			key: "r4j83e"
		}]
	]);
	const Italic = createLucideIcon("italic", [
		["line", {
			x1: "19",
			x2: "10",
			y1: "4",
			y2: "4",
			key: "15jd3p"
		}],
		["line", {
			x1: "14",
			x2: "5",
			y1: "20",
			y2: "20",
			key: "bu0au3"
		}],
		["line", {
			x1: "15",
			x2: "9",
			y1: "4",
			y2: "20",
			key: "uljnxc"
		}]
	]);
	const IterationCcw = createLucideIcon("iteration-ccw", [["path", {
		d: "m16 14 4 4-4 4",
		key: "hkso8o"
	}], ["path", {
		d: "M20 10a8 8 0 1 0-8 8h8",
		key: "1bik7b"
	}]]);
	const IterationCw = createLucideIcon("iteration-cw", [["path", {
		d: "M4 10a8 8 0 1 1 8 8H4",
		key: "svv66n"
	}], ["path", {
		d: "m8 22-4-4 4-4",
		key: "6g7gki"
	}]]);
	const JapaneseYen = createLucideIcon("japanese-yen", [
		["path", {
			d: "M12 9.5V21m0-11.5L6 3m6 6.5L18 3",
			key: "2ej80x"
		}],
		["path", {
			d: "M6 15h12",
			key: "1hwgt5"
		}],
		["path", {
			d: "M6 11h12",
			key: "wf4gp6"
		}]
	]);
	const Joystick = createLucideIcon("joystick", [
		["path", {
			d: "M21 17a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2Z",
			key: "jg2n2t"
		}],
		["path", {
			d: "M6 15v-2",
			key: "gd6mvg"
		}],
		["path", {
			d: "M12 15V9",
			key: "8c7uyn"
		}],
		["circle", {
			cx: "12",
			cy: "6",
			r: "3",
			key: "1gm2ql"
		}]
	]);
	const Kanban = createLucideIcon("kanban", [
		["path", {
			d: "M5 3v14",
			key: "9nsxs2"
		}],
		["path", {
			d: "M12 3v8",
			key: "1h2ygw"
		}],
		["path", {
			d: "M19 3v18",
			key: "1sk56x"
		}]
	]);
	const Kayak = createLucideIcon("kayak", [
		["path", {
			d: "M18 17a1 1 0 0 0-1 1v1a2 2 0 1 0 2-2z",
			key: "skzb1g"
		}],
		["path", {
			d: "M20.97 3.61a.45.45 0 0 0-.58-.58C10.2 6.6 6.6 10.2 3.03 20.39a.45.45 0 0 0 .58.58C13.8 17.4 17.4 13.8 20.97 3.61",
			key: "cv9jm7"
		}],
		["path", {
			d: "m6.707 6.707 10.586 10.586",
			key: "d2l993"
		}],
		["path", {
			d: "M7 5a2 2 0 1 0-2 2h1a1 1 0 0 0 1-1z",
			key: "i0et4n"
		}]
	]);
	const KeyRound = createLucideIcon("key-round", [["path", {
		d: "M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z",
		key: "1s6t7t"
	}], ["circle", {
		cx: "16.5",
		cy: "7.5",
		r: ".5",
		fill: "currentColor",
		key: "w0ekpg"
	}]]);
	const KeySquare = createLucideIcon("key-square", [
		["path", {
			d: "M12.4 2.7a2.5 2.5 0 0 1 3.4 0l5.5 5.5a2.5 2.5 0 0 1 0 3.4l-3.7 3.7a2.5 2.5 0 0 1-3.4 0L8.7 9.8a2.5 2.5 0 0 1 0-3.4z",
			key: "165ttr"
		}],
		["path", {
			d: "m14 7 3 3",
			key: "1r5n42"
		}],
		["path", {
			d: "m9.4 10.6-6.814 6.814A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814",
			key: "1ubxi2"
		}]
	]);
	const Key = createLucideIcon("key", [
		["path", {
			d: "m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4",
			key: "g0fldk"
		}],
		["path", {
			d: "m21 2-9.6 9.6",
			key: "1j0ho8"
		}],
		["circle", {
			cx: "7.5",
			cy: "15.5",
			r: "5.5",
			key: "yqb3hr"
		}]
	]);
	const KeyboardMusic = createLucideIcon("keyboard-music", [
		["rect", {
			width: "20",
			height: "16",
			x: "2",
			y: "4",
			rx: "2",
			key: "18n3k1"
		}],
		["path", {
			d: "M6 8h4",
			key: "utf9t1"
		}],
		["path", {
			d: "M14 8h.01",
			key: "1primd"
		}],
		["path", {
			d: "M18 8h.01",
			key: "emo2bl"
		}],
		["path", {
			d: "M2 12h20",
			key: "9i4pu4"
		}],
		["path", {
			d: "M6 12v4",
			key: "dy92yo"
		}],
		["path", {
			d: "M10 12v4",
			key: "1fxnav"
		}],
		["path", {
			d: "M14 12v4",
			key: "1hft58"
		}],
		["path", {
			d: "M18 12v4",
			key: "tjjnbz"
		}]
	]);
	const KeyboardOff = createLucideIcon("keyboard-off", [
		["path", {
			d: "M 20 4 A2 2 0 0 1 22 6",
			key: "1g1fkt"
		}],
		["path", {
			d: "M 22 6 L 22 16.41",
			key: "1qjg3w"
		}],
		["path", {
			d: "M 7 16 L 16 16",
			key: "n0yqwb"
		}],
		["path", {
			d: "M 9.69 4 L 20 4",
			key: "kbpcgx"
		}],
		["path", {
			d: "M14 8h.01",
			key: "1primd"
		}],
		["path", {
			d: "M18 8h.01",
			key: "emo2bl"
		}],
		["path", {
			d: "m2 2 20 20",
			key: "1ooewy"
		}],
		["path", {
			d: "M20 20H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2",
			key: "s23sx2"
		}],
		["path", {
			d: "M6 8h.01",
			key: "x9i8wu"
		}],
		["path", {
			d: "M8 12h.01",
			key: "czm47f"
		}]
	]);
	const Keyboard = createLucideIcon("keyboard", [
		["path", {
			d: "M10 8h.01",
			key: "1r9ogq"
		}],
		["path", {
			d: "M12 12h.01",
			key: "1mp3jc"
		}],
		["path", {
			d: "M14 8h.01",
			key: "1primd"
		}],
		["path", {
			d: "M16 12h.01",
			key: "1l6xoz"
		}],
		["path", {
			d: "M18 8h.01",
			key: "emo2bl"
		}],
		["path", {
			d: "M6 8h.01",
			key: "x9i8wu"
		}],
		["path", {
			d: "M7 16h10",
			key: "wp8him"
		}],
		["path", {
			d: "M8 12h.01",
			key: "czm47f"
		}],
		["rect", {
			width: "20",
			height: "16",
			x: "2",
			y: "4",
			rx: "2",
			key: "18n3k1"
		}]
	]);
	const LampCeiling = createLucideIcon("lamp-ceiling", [
		["path", {
			d: "M12 2v5",
			key: "nd4vlx"
		}],
		["path", {
			d: "M14.829 15.998a3 3 0 1 1-5.658 0",
			key: "1pybiy"
		}],
		["path", {
			d: "M20.92 14.606A1 1 0 0 1 20 16H4a1 1 0 0 1-.92-1.394l3-7A1 1 0 0 1 7 7h10a1 1 0 0 1 .92.606z",
			key: "ma1wor"
		}]
	]);
	const LampDesk = createLucideIcon("lamp-desk", [
		["path", {
			d: "M10.293 2.293a1 1 0 0 1 1.414 0l2.5 2.5 5.994 1.227a1 1 0 0 1 .506 1.687l-7 7a1 1 0 0 1-1.687-.506l-1.227-5.994-2.5-2.5a1 1 0 0 1 0-1.414z",
			key: "sb8slu"
		}],
		["path", {
			d: "m14.207 4.793-3.414 3.414",
			key: "m2x3oj"
		}],
		["path", {
			d: "M3 20a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z",
			key: "8b3myj"
		}],
		["path", {
			d: "m9.086 6.5-4.793 4.793a1 1 0 0 0-.18 1.17L7 18",
			key: "43s6cu"
		}]
	]);
	const LampFloor = createLucideIcon("lamp-floor", [
		["path", {
			d: "M12 10v12",
			key: "6ubwww"
		}],
		["path", {
			d: "M17.929 7.629A1 1 0 0 1 17 9H7a1 1 0 0 1-.928-1.371l2-5A1 1 0 0 1 9 2h6a1 1 0 0 1 .928.629z",
			key: "1o95gh"
		}],
		["path", {
			d: "M9 22h6",
			key: "1rlq3v"
		}]
	]);
	const LampWallDown = createLucideIcon("lamp-wall-down", [
		["path", {
			d: "M19.929 18.629A1 1 0 0 1 19 20H9a1 1 0 0 1-.928-1.371l2-5A1 1 0 0 1 11 13h6a1 1 0 0 1 .928.629z",
			key: "u4w2d7"
		}],
		["path", {
			d: "M6 3a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z",
			key: "15356w"
		}],
		["path", {
			d: "M8 6h4a2 2 0 0 1 2 2v5",
			key: "1m6m7x"
		}]
	]);
	const LampWallUp = createLucideIcon("lamp-wall-up", [
		["path", {
			d: "M19.929 9.629A1 1 0 0 1 19 11H9a1 1 0 0 1-.928-1.371l2-5A1 1 0 0 1 11 4h6a1 1 0 0 1 .928.629z",
			key: "1uvrbf"
		}],
		["path", {
			d: "M6 15a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H5a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1z",
			key: "154r2a"
		}],
		["path", {
			d: "M8 18h4a2 2 0 0 0 2-2v-5",
			key: "z9mbu0"
		}]
	]);
	const Lamp = createLucideIcon("lamp", [
		["path", {
			d: "M12 12v6",
			key: "3ahymv"
		}],
		["path", {
			d: "M4.077 10.615A1 1 0 0 0 5 12h14a1 1 0 0 0 .923-1.385l-3.077-7.384A2 2 0 0 0 15 2H9a2 2 0 0 0-1.846 1.23Z",
			key: "1l7kg2"
		}],
		["path", {
			d: "M8 20a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1z",
			key: "1mmzpi"
		}]
	]);
	const LandPlot = createLucideIcon("land-plot", [
		["path", {
			d: "m12 8 6-3-6-3v10",
			key: "mvpnpy"
		}],
		["path", {
			d: "m8 11.99-5.5 3.14a1 1 0 0 0 0 1.74l8.5 4.86a2 2 0 0 0 2 0l8.5-4.86a1 1 0 0 0 0-1.74L16 12",
			key: "ek95tt"
		}],
		["path", {
			d: "m6.49 12.85 11.02 6.3",
			key: "1kt42w"
		}],
		["path", {
			d: "M17.51 12.85 6.5 19.15",
			key: "v55bdg"
		}]
	]);
	const Landmark = createLucideIcon("landmark", [
		["path", {
			d: "M10 18v-7",
			key: "wt116b"
		}],
		["path", {
			d: "M11.12 2.198a2 2 0 0 1 1.76.006l7.866 3.847c.476.233.31.949-.22.949H3.474c-.53 0-.695-.716-.22-.949z",
			key: "1m329m"
		}],
		["path", {
			d: "M14 18v-7",
			key: "vav6t3"
		}],
		["path", {
			d: "M18 18v-7",
			key: "aexdmj"
		}],
		["path", {
			d: "M3 22h18",
			key: "8prr45"
		}],
		["path", {
			d: "M6 18v-7",
			key: "1ivflk"
		}]
	]);
	const Languages = createLucideIcon("languages", [
		["path", {
			d: "m5 8 6 6",
			key: "1wu5hv"
		}],
		["path", {
			d: "m4 14 6-6 2-3",
			key: "1k1g8d"
		}],
		["path", {
			d: "M2 5h12",
			key: "or177f"
		}],
		["path", {
			d: "M7 2h1",
			key: "1t2jsx"
		}],
		["path", {
			d: "m22 22-5-10-5 10",
			key: "don7ne"
		}],
		["path", {
			d: "M14 18h6",
			key: "1m8k6r"
		}]
	]);
	const LaptopMinimalCheck = createLucideIcon("laptop-minimal-check", [
		["path", {
			d: "M2 20h20",
			key: "owomy5"
		}],
		["path", {
			d: "m9 10 2 2 4-4",
			key: "1gnqz4"
		}],
		["rect", {
			x: "3",
			y: "4",
			width: "18",
			height: "12",
			rx: "2",
			key: "8ur36m"
		}]
	]);
	const LaptopMinimal = createLucideIcon("laptop-minimal", [["rect", {
		width: "18",
		height: "12",
		x: "3",
		y: "4",
		rx: "2",
		ry: "2",
		key: "1qhy41"
	}], ["line", {
		x1: "2",
		x2: "22",
		y1: "20",
		y2: "20",
		key: "ni3hll"
	}]]);
	const Laptop = createLucideIcon("laptop", [["path", {
		d: "M18 5a2 2 0 0 1 2 2v8.526a2 2 0 0 0 .212.897l1.068 2.127a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45l1.068-2.127A2 2 0 0 0 4 15.526V7a2 2 0 0 1 2-2z",
		key: "1pdavp"
	}], ["path", {
		d: "M20.054 15.987H3.946",
		key: "14rxg9"
	}]]);
	const LassoSelect = createLucideIcon("lasso-select", [
		["path", {
			d: "M7 22a5 5 0 0 1-2-4",
			key: "umushi"
		}],
		["path", {
			d: "M7 16.93c.96.43 1.96.74 2.99.91",
			key: "ybbtv3"
		}],
		["path", {
			d: "M3.34 14A6.8 6.8 0 0 1 2 10c0-4.42 4.48-8 10-8s10 3.58 10 8a7.19 7.19 0 0 1-.33 2",
			key: "gt5e1w"
		}],
		["path", {
			d: "M5 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
			key: "bq3ynw"
		}],
		["path", {
			d: "M14.33 22h-.09a.35.35 0 0 1-.24-.32v-10a.34.34 0 0 1 .33-.34c.08 0 .15.03.21.08l7.34 6a.33.33 0 0 1-.21.59h-4.49l-2.57 3.85a.35.35 0 0 1-.28.14z",
			key: "72q637"
		}]
	]);
	const Lasso = createLucideIcon("lasso", [
		["path", {
			d: "M3.704 14.467A10 8 0 0 1 2 10a10 8 0 0 1 20 0 10 8 0 0 1-10 8 10 8 0 0 1-5.181-1.158",
			key: "1yant3"
		}],
		["path", {
			d: "M7 22a5 5 0 0 1-2-3.994",
			key: "1xp6a4"
		}],
		["circle", {
			cx: "5",
			cy: "16",
			r: "2",
			key: "18csp3"
		}]
	]);
	const Laugh = createLucideIcon("laugh", [
		["circle", {
			cx: "12",
			cy: "12",
			r: "10",
			key: "1mglay"
		}],
		["path", {
			d: "M18 13a6 6 0 0 1-6 5 6 6 0 0 1-6-5h12Z",
			key: "b2q4dd"
		}],
		["line", {
			x1: "9",
			x2: "9.01",
			y1: "9",
			y2: "9",
			key: "yxxnd0"
		}],
		["line", {
			x1: "15",
			x2: "15.01",
			y1: "9",
			y2: "9",
			key: "1p4y9e"
		}]
	]);
	const Layers2 = createLucideIcon("layers-2", [["path", {
		d: "M13 13.74a2 2 0 0 1-2 0L2.5 8.87a1 1 0 0 1 0-1.74L11 2.26a2 2 0 0 1 2 0l8.5 4.87a1 1 0 0 1 0 1.74z",
		key: "15q6uc"
	}], ["path", {
		d: "m20 14.285 1.5.845a1 1 0 0 1 0 1.74L13 21.74a2 2 0 0 1-2 0l-8.5-4.87a1 1 0 0 1 0-1.74l1.5-.845",
		key: "byia6g"
	}]]);
	const Layers = createLucideIcon("layers", [
		["path", {
			d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",
			key: "zw3jo"
		}],
		["path", {
			d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",
			key: "1wduqc"
		}],
		["path", {
			d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",
			key: "kqbvx6"
		}]
	]);
	const LayoutDashboard = createLucideIcon("layout-dashboard", [
		["rect", {
			width: "7",
			height: "9",
			x: "3",
			y: "3",
			rx: "1",
			key: "10lvy0"
		}],
		["rect", {
			width: "7",
			height: "5",
			x: "14",
			y: "3",
			rx: "1",
			key: "16une8"
		}],
		["rect", {
			width: "7",
			height: "9",
			x: "14",
			y: "12",
			rx: "1",
			key: "1hutg5"
		}],
		["rect", {
			width: "7",
			height: "5",
			x: "3",
			y: "16",
			rx: "1",
			key: "ldoo1y"
		}]
	]);
	const LayoutGrid = createLucideIcon("layout-grid", [
		["rect", {
			width: "7",
			height: "7",
			x: "3",
			y: "3",
			rx: "1",
			key: "1g98yp"
		}],
		["rect", {
			width: "7",
			height: "7",
			x: "14",
			y: "3",
			rx: "1",
			key: "6d4xhi"
		}],
		["rect", {
			width: "7",
			height: "7",
			x: "14",
			y: "14",
			rx: "1",
			key: "nxv5o0"
		}],
		["rect", {
			width: "7",
			height: "7",
			x: "3",
			y: "14",
			rx: "1",
			key: "1bb6yr"
		}]
	]);
	const LayoutList = createLucideIcon("layout-list", [
		["rect", {
			width: "7",
			height: "7",
			x: "3",
			y: "3",
			rx: "1",
			key: "1g98yp"
		}],
		["rect", {
			width: "7",
			height: "7",
			x: "3",
			y: "14",
			rx: "1",
			key: "1bb6yr"
		}],
		["path", {
			d: "M14 4h7",
			key: "3xa0d5"
		}],
		["path", {
			d: "M14 9h7",
			key: "1icrd9"
		}],
		["path", {
			d: "M14 15h7",
			key: "1mj8o2"
		}],
		["path", {
			d: "M14 20h7",
			key: "11slyb"
		}]
	]);
	const LayoutPanelLeft = createLucideIcon("layout-panel-left", [
		["rect", {
			width: "7",
			height: "18",
			x: "3",
			y: "3",
			rx: "1",
			key: "2obqm"
		}],
		["rect", {
			width: "7",
			height: "7",
			x: "14",
			y: "3",
			rx: "1",
			key: "6d4xhi"
		}],
		["rect", {
			width: "7",
			height: "7",
			x: "14",
			y: "14",
			rx: "1",
			key: "nxv5o0"
		}]
	]);
	const LayoutPanelTop = createLucideIcon("layout-panel-top", [
		["rect", {
			width: "18",
			height: "7",
			x: "3",
			y: "3",
			rx: "1",
			key: "f1a2em"
		}],
		["rect", {
			width: "7",
			height: "7",
			x: "3",
			y: "14",
			rx: "1",
			key: "1bb6yr"
		}],
		["rect", {
			width: "7",
			height: "7",
			x: "14",
			y: "14",
			rx: "1",
			key: "nxv5o0"
		}]
	]);
	const LayoutTemplate = createLucideIcon("layout-template", [
		["rect", {
			width: "18",
			height: "7",
			x: "3",
			y: "3",
			rx: "1",
			key: "f1a2em"
		}],
		["rect", {
			width: "9",
			height: "7",
			x: "3",
			y: "14",
			rx: "1",
			key: "jqznyg"
		}],
		["rect", {
			width: "5",
			height: "7",
			x: "16",
			y: "14",
			rx: "1",
			key: "q5h2i8"
		}]
	]);
	const Leaf = createLucideIcon("leaf", [["path", {
		d: "M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z",
		key: "nnexq3"
	}], ["path", {
		d: "M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12",
		key: "mt58a7"
	}]]);
	const LeafyGreen = createLucideIcon("leafy-green", [["path", {
		d: "M2 22c1.25-.987 2.27-1.975 3.9-2.2a5.56 5.56 0 0 1 3.8 1.5 4 4 0 0 0 6.187-2.353 3.5 3.5 0 0 0 3.69-5.116A3.5 3.5 0 0 0 20.95 8 3.5 3.5 0 1 0 16 3.05a3.5 3.5 0 0 0-5.831 1.373 3.5 3.5 0 0 0-5.116 3.69 4 4 0 0 0-2.348 6.155C3.499 15.42 4.409 16.712 4.2 18.1 3.926 19.743 3.014 20.732 2 22",
		key: "1134nt"
	}], ["path", {
		d: "M2 22 17 7",
		key: "1q7jp2"
	}]]);
	const Lectern = createLucideIcon("lectern", [
		["path", {
			d: "M16 12h3a2 2 0 0 0 1.902-1.38l1.056-3.333A1 1 0 0 0 21 6H3a1 1 0 0 0-.958 1.287l1.056 3.334A2 2 0 0 0 5 12h3",
			key: "13jjxg"
		}],
		["path", {
			d: "M18 6V3a1 1 0 0 0-1-1h-3",
			key: "1550fe"
		}],
		["rect", {
			width: "8",
			height: "12",
			x: "8",
			y: "10",
			rx: "1",
			key: "qmu8b6"
		}]
	]);
	const LibraryBig = createLucideIcon("library-big", [
		["rect", {
			width: "8",
			height: "18",
			x: "3",
			y: "3",
			rx: "1",
			key: "oynpb5"
		}],
		["path", {
			d: "M7 3v18",
			key: "bbkbws"
		}],
		["path", {
			d: "M20.4 18.9c.2.5-.1 1.1-.6 1.3l-1.9.7c-.5.2-1.1-.1-1.3-.6L11.1 5.1c-.2-.5.1-1.1.6-1.3l1.9-.7c.5-.2 1.1.1 1.3.6Z",
			key: "1qboyk"
		}]
	]);
	const LifeBuoy = createLucideIcon("life-buoy", [
		["circle", {
			cx: "12",
			cy: "12",
			r: "10",
			key: "1mglay"
		}],
		["path", {
			d: "m4.93 4.93 4.24 4.24",
			key: "1ymg45"
		}],
		["path", {
			d: "m14.83 9.17 4.24-4.24",
			key: "1cb5xl"
		}],
		["path", {
			d: "m14.83 14.83 4.24 4.24",
			key: "q42g0n"
		}],
		["path", {
			d: "m9.17 14.83-4.24 4.24",
			key: "bqpfvv"
		}],
		["circle", {
			cx: "12",
			cy: "12",
			r: "4",
			key: "4exip2"
		}]
	]);
	const Library = createLucideIcon("library", [
		["path", {
			d: "m16 6 4 14",
			key: "ji33uf"
		}],
		["path", {
			d: "M12 6v14",
			key: "1n7gus"
		}],
		["path", {
			d: "M8 8v12",
			key: "1gg7y9"
		}],
		["path", {
			d: "M4 4v16",
			key: "6qkkli"
		}]
	]);
	const Ligature = createLucideIcon("ligature", [
		["path", {
			d: "M14 12h2v8",
			key: "c1fccl"
		}],
		["path", {
			d: "M14 20h4",
			key: "lzx1xo"
		}],
		["path", {
			d: "M6 12h4",
			key: "a4o3ry"
		}],
		["path", {
			d: "M6 20h4",
			key: "1i6q5t"
		}],
		["path", {
			d: "M8 20V8a4 4 0 0 1 7.464-2",
			key: "wk9t6r"
		}]
	]);
	const LightbulbOff = createLucideIcon("lightbulb-off", [
		["path", {
			d: "M16.8 11.2c.8-.9 1.2-2 1.2-3.2a6 6 0 0 0-9.3-5",
			key: "1fkcox"
		}],
		["path", {
			d: "m2 2 20 20",
			key: "1ooewy"
		}],
		["path", {
			d: "M6.3 6.3a4.67 4.67 0 0 0 1.2 5.2c.7.7 1.3 1.5 1.5 2.5",
			key: "10m8kw"
		}],
		["path", {
			d: "M9 18h6",
			key: "x1upvd"
		}],
		["path", {
			d: "M10 22h4",
			key: "ceow96"
		}]
	]);
	const LineSquiggle = createLucideIcon("line-squiggle", [["path", {
		d: "M7 3.5c5-2 7 2.5 3 4C1.5 10 2 15 5 16c5 2 9-10 14-7s.5 13.5-4 12c-5-2.5.5-11 6-2",
		key: "1lrphd"
	}]]);
	const Lightbulb = createLucideIcon("lightbulb", [
		["path", {
			d: "M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5",
			key: "1gvzjb"
		}],
		["path", {
			d: "M9 18h6",
			key: "x1upvd"
		}],
		["path", {
			d: "M10 22h4",
			key: "ceow96"
		}]
	]);
	const Link2Off = createLucideIcon("link-2-off", [
		["path", {
			d: "M9 17H7A5 5 0 0 1 7 7",
			key: "10o201"
		}],
		["path", {
			d: "M15 7h2a5 5 0 0 1 4 8",
			key: "1d3206"
		}],
		["line", {
			x1: "8",
			x2: "12",
			y1: "12",
			y2: "12",
			key: "rvw6j4"
		}],
		["line", {
			x1: "2",
			x2: "22",
			y1: "2",
			y2: "22",
			key: "a6p6uj"
		}]
	]);
	const Link2 = createLucideIcon("link-2", [
		["path", {
			d: "M9 17H7A5 5 0 0 1 7 7h2",
			key: "8i5ue5"
		}],
		["path", {
			d: "M15 7h2a5 5 0 1 1 0 10h-2",
			key: "1b9ql8"
		}],
		["line", {
			x1: "8",
			x2: "16",
			y1: "12",
			y2: "12",
			key: "1jonct"
		}]
	]);
	const Link = createLucideIcon("link", [["path", {
		d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71",
		key: "1cjeqo"
	}], ["path", {
		d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",
		key: "19qd67"
	}]]);
	const Linkedin = createLucideIcon("linkedin", [
		["path", {
			d: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z",
			key: "c2jq9f"
		}],
		["rect", {
			width: "4",
			height: "12",
			x: "2",
			y: "9",
			key: "mk3on5"
		}],
		["circle", {
			cx: "4",
			cy: "4",
			r: "2",
			key: "bt5ra8"
		}]
	]);
	const ListCheck = createLucideIcon("list-check", [
		["path", {
			d: "M16 5H3",
			key: "m91uny"
		}],
		["path", {
			d: "M16 12H3",
			key: "1a2rj7"
		}],
		["path", {
			d: "M11 19H3",
			key: "zflm78"
		}],
		["path", {
			d: "m15 18 2 2 4-4",
			key: "1szwhi"
		}]
	]);
	const ListChecks = createLucideIcon("list-checks", [
		["path", {
			d: "M13 5h8",
			key: "a7qcls"
		}],
		["path", {
			d: "M13 12h8",
			key: "h98zly"
		}],
		["path", {
			d: "M13 19h8",
			key: "c3s6r1"
		}],
		["path", {
			d: "m3 17 2 2 4-4",
			key: "1jhpwq"
		}],
		["path", {
			d: "m3 7 2 2 4-4",
			key: "1obspn"
		}]
	]);
	const ListChevronsDownUp = createLucideIcon("list-chevrons-down-up", [
		["path", {
			d: "M3 5h8",
			key: "18g2rq"
		}],
		["path", {
			d: "M3 12h8",
			key: "1xfjp6"
		}],
		["path", {
			d: "M3 19h8",
			key: "fpbke4"
		}],
		["path", {
			d: "m15 5 3 3 3-3",
			key: "1t4thf"
		}],
		["path", {
			d: "m15 19 3-3 3 3",
			key: "y4ckd2"
		}]
	]);
	const ListChevronsUpDown = createLucideIcon("list-chevrons-up-down", [
		["path", {
			d: "M3 5h8",
			key: "18g2rq"
		}],
		["path", {
			d: "M3 12h8",
			key: "1xfjp6"
		}],
		["path", {
			d: "M3 19h8",
			key: "fpbke4"
		}],
		["path", {
			d: "m15 8 3-3 3 3",
			key: "bc4io6"
		}],
		["path", {
			d: "m15 16 3 3 3-3",
			key: "9wmg1l"
		}]
	]);
	const ListCollapse = createLucideIcon("list-collapse", [
		["path", {
			d: "M10 5h11",
			key: "1hkqpe"
		}],
		["path", {
			d: "M10 12h11",
			key: "6m4ad9"
		}],
		["path", {
			d: "M10 19h11",
			key: "14g2nv"
		}],
		["path", {
			d: "m3 10 3-3-3-3",
			key: "i7pm08"
		}],
		["path", {
			d: "m3 20 3-3-3-3",
			key: "20gx1n"
		}]
	]);
	const ListEnd = createLucideIcon("list-end", [
		["path", {
			d: "M16 5H3",
			key: "m91uny"
		}],
		["path", {
			d: "M16 12H3",
			key: "1a2rj7"
		}],
		["path", {
			d: "M9 19H3",
			key: "s61nz1"
		}],
		["path", {
			d: "m16 16-3 3 3 3",
			key: "117b85"
		}],
		["path", {
			d: "M21 5v12a2 2 0 0 1-2 2h-6",
			key: "hey24a"
		}]
	]);
	const ListFilter = createLucideIcon("list-filter", [
		["path", {
			d: "M2 5h20",
			key: "1fs1ex"
		}],
		["path", {
			d: "M6 12h12",
			key: "8npq4p"
		}],
		["path", {
			d: "M9 19h6",
			key: "456am0"
		}]
	]);
	const ListFilterPlus = createLucideIcon("list-filter-plus", [
		["path", {
			d: "M12 5H2",
			key: "1o22fu"
		}],
		["path", {
			d: "M6 12h12",
			key: "8npq4p"
		}],
		["path", {
			d: "M9 19h6",
			key: "456am0"
		}],
		["path", {
			d: "M16 5h6",
			key: "1vod17"
		}],
		["path", {
			d: "M19 8V2",
			key: "1wcffq"
		}]
	]);
	const ListIndentDecrease = createLucideIcon("list-indent-decrease", [
		["path", {
			d: "M21 5H11",
			key: "us1j55"
		}],
		["path", {
			d: "M21 12H11",
			key: "wd7e0v"
		}],
		["path", {
			d: "M21 19H11",
			key: "saa85w"
		}],
		["path", {
			d: "m7 8-4 4 4 4",
			key: "o5hrat"
		}]
	]);
	const ListIndentIncrease = createLucideIcon("list-indent-increase", [
		["path", {
			d: "M21 5H11",
			key: "us1j55"
		}],
		["path", {
			d: "M21 12H11",
			key: "wd7e0v"
		}],
		["path", {
			d: "M21 19H11",
			key: "saa85w"
		}],
		["path", {
			d: "m3 8 4 4-4 4",
			key: "1a3j6y"
		}]
	]);
	const ListMinus = createLucideIcon("list-minus", [
		["path", {
			d: "M16 5H3",
			key: "m91uny"
		}],
		["path", {
			d: "M11 12H3",
			key: "51ecnj"
		}],
		["path", {
			d: "M16 19H3",
			key: "zzsher"
		}],
		["path", {
			d: "M21 12h-6",
			key: "bt1uis"
		}]
	]);
	const ListMusic = createLucideIcon("list-music", [
		["path", {
			d: "M16 5H3",
			key: "m91uny"
		}],
		["path", {
			d: "M11 12H3",
			key: "51ecnj"
		}],
		["path", {
			d: "M11 19H3",
			key: "zflm78"
		}],
		["path", {
			d: "M21 16V5",
			key: "yxg4q8"
		}],
		["circle", {
			cx: "18",
			cy: "16",
			r: "3",
			key: "1hluhg"
		}]
	]);
	const ListOrdered = createLucideIcon("list-ordered", [
		["path", {
			d: "M11 5h10",
			key: "1cz7ny"
		}],
		["path", {
			d: "M11 12h10",
			key: "1438ji"
		}],
		["path", {
			d: "M11 19h10",
			key: "11t30w"
		}],
		["path", {
			d: "M4 4h1v5",
			key: "10yrso"
		}],
		["path", {
			d: "M4 9h2",
			key: "r1h2o0"
		}],
		["path", {
			d: "M6.5 20H3.4c0-1 2.6-1.925 2.6-3.5a1.5 1.5 0 0 0-2.6-1.02",
			key: "xtkcd5"
		}]
	]);
	const ListPlus = createLucideIcon("list-plus", [
		["path", {
			d: "M16 5H3",
			key: "m91uny"
		}],
		["path", {
			d: "M11 12H3",
			key: "51ecnj"
		}],
		["path", {
			d: "M16 19H3",
			key: "zzsher"
		}],
		["path", {
			d: "M18 9v6",
			key: "1twb98"
		}],
		["path", {
			d: "M21 12h-6",
			key: "bt1uis"
		}]
	]);
	const ListRestart = createLucideIcon("list-restart", [
		["path", {
			d: "M21 5H3",
			key: "1fi0y6"
		}],
		["path", {
			d: "M7 12H3",
			key: "13ou7f"
		}],
		["path", {
			d: "M7 19H3",
			key: "wbqt3n"
		}],
		["path", {
			d: "M12 18a5 5 0 0 0 9-3 4.5 4.5 0 0 0-4.5-4.5c-1.33 0-2.54.54-3.41 1.41L11 14",
			key: "qth677"
		}],
		["path", {
			d: "M11 10v4h4",
			key: "172dkj"
		}]
	]);
	const ListStart = createLucideIcon("list-start", [
		["path", {
			d: "M3 5h6",
			key: "1ltk0q"
		}],
		["path", {
			d: "M3 12h13",
			key: "ppymz1"
		}],
		["path", {
			d: "M3 19h13",
			key: "bpdczq"
		}],
		["path", {
			d: "m16 8-3-3 3-3",
			key: "1pjpp6"
		}],
		["path", {
			d: "M21 19V7a2 2 0 0 0-2-2h-6",
			key: "4zzq67"
		}]
	]);
	const ListTodo = createLucideIcon("list-todo", [
		["path", {
			d: "M13 5h8",
			key: "a7qcls"
		}],
		["path", {
			d: "M13 12h8",
			key: "h98zly"
		}],
		["path", {
			d: "M13 19h8",
			key: "c3s6r1"
		}],
		["path", {
			d: "m3 17 2 2 4-4",
			key: "1jhpwq"
		}],
		["rect", {
			x: "3",
			y: "4",
			width: "6",
			height: "6",
			rx: "1",
			key: "cif1o7"
		}]
	]);
	const ListTree = createLucideIcon("list-tree", [
		["path", {
			d: "M8 5h13",
			key: "1pao27"
		}],
		["path", {
			d: "M13 12h8",
			key: "h98zly"
		}],
		["path", {
			d: "M13 19h8",
			key: "c3s6r1"
		}],
		["path", {
			d: "M3 10a2 2 0 0 0 2 2h3",
			key: "1npucw"
		}],
		["path", {
			d: "M3 5v12a2 2 0 0 0 2 2h3",
			key: "x1gjn2"
		}]
	]);
	const ListVideo = createLucideIcon("list-video", [
		["path", {
			d: "M21 5H3",
			key: "1fi0y6"
		}],
		["path", {
			d: "M10 12H3",
			key: "1ulcyk"
		}],
		["path", {
			d: "M10 19H3",
			key: "108z41"
		}],
		["path", {
			d: "M15 12.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997a1 1 0 0 1-1.517-.86z",
			key: "ms4nik"
		}]
	]);
	const List = createLucideIcon("list", [
		["path", {
			d: "M3 5h.01",
			key: "18ugdj"
		}],
		["path", {
			d: "M3 12h.01",
			key: "nlz23k"
		}],
		["path", {
			d: "M3 19h.01",
			key: "noohij"
		}],
		["path", {
			d: "M8 5h13",
			key: "1pao27"
		}],
		["path", {
			d: "M8 12h13",
			key: "1za7za"
		}],
		["path", {
			d: "M8 19h13",
			key: "m83p4d"
		}]
	]);
	const ListX = createLucideIcon("list-x", [
		["path", {
			d: "M16 5H3",
			key: "m91uny"
		}],
		["path", {
			d: "M11 12H3",
			key: "51ecnj"
		}],
		["path", {
			d: "M16 19H3",
			key: "zzsher"
		}],
		["path", {
			d: "m15.5 9.5 5 5",
			key: "ytk86i"
		}],
		["path", {
			d: "m20.5 9.5-5 5",
			key: "17o44f"
		}]
	]);
	const LoaderCircle = createLucideIcon("loader-circle", [["path", {
		d: "M21 12a9 9 0 1 1-6.219-8.56",
		key: "13zald"
	}]]);
	const LoaderPinwheel = createLucideIcon("loader-pinwheel", [
		["path", {
			d: "M22 12a1 1 0 0 1-10 0 1 1 0 0 0-10 0",
			key: "1lzz15"
		}],
		["path", {
			d: "M7 20.7a1 1 0 1 1 5-8.7 1 1 0 1 0 5-8.6",
			key: "1gnrpi"
		}],
		["path", {
			d: "M7 3.3a1 1 0 1 1 5 8.6 1 1 0 1 0 5 8.6",
			key: "u9yy5q"
		}],
		["circle", {
			cx: "12",
			cy: "12",
			r: "10",
			key: "1mglay"
		}]
	]);
	const Loader = createLucideIcon("loader", [
		["path", {
			d: "M12 2v4",
			key: "3427ic"
		}],
		["path", {
			d: "m16.2 7.8 2.9-2.9",
			key: "r700ao"
		}],
		["path", {
			d: "M18 12h4",
			key: "wj9ykh"
		}],
		["path", {
			d: "m16.2 16.2 2.9 2.9",
			key: "1bxg5t"
		}],
		["path", {
			d: "M12 18v4",
			key: "jadmvz"
		}],
		["path", {
			d: "m4.9 19.1 2.9-2.9",
			key: "bwix9q"
		}],
		["path", {
			d: "M2 12h4",
			key: "j09sii"
		}],
		["path", {
			d: "m4.9 4.9 2.9 2.9",
			key: "giyufr"
		}]
	]);
	const LocateFixed = createLucideIcon("locate-fixed", [
		["line", {
			x1: "2",
			x2: "5",
			y1: "12",
			y2: "12",
			key: "bvdh0s"
		}],
		["line", {
			x1: "19",
			x2: "22",
			y1: "12",
			y2: "12",
			key: "1tbv5k"
		}],
		["line", {
			x1: "12",
			x2: "12",
			y1: "2",
			y2: "5",
			key: "11lu5j"
		}],
		["line", {
			x1: "12",
			x2: "12",
			y1: "19",
			y2: "22",
			key: "x3vr5v"
		}],
		["circle", {
			cx: "12",
			cy: "12",
			r: "7",
			key: "fim9np"
		}],
		["circle", {
			cx: "12",
			cy: "12",
			r: "3",
			key: "1v7zrd"
		}]
	]);
	const LocateOff = createLucideIcon("locate-off", [
		["path", {
			d: "M12 19v3",
			key: "npa21l"
		}],
		["path", {
			d: "M12 2v3",
			key: "qbqxhf"
		}],
		["path", {
			d: "M18.89 13.24a7 7 0 0 0-8.13-8.13",
			key: "1v9jrh"
		}],
		["path", {
			d: "M19 12h3",
			key: "osuazr"
		}],
		["path", {
			d: "M2 12h3",
			key: "1wrr53"
		}],
		["path", {
			d: "m2 2 20 20",
			key: "1ooewy"
		}],
		["path", {
			d: "M7.05 7.05a7 7 0 0 0 9.9 9.9",
			key: "rc5l2e"
		}]
	]);
	const Locate = createLucideIcon("locate", [
		["line", {
			x1: "2",
			x2: "5",
			y1: "12",
			y2: "12",
			key: "bvdh0s"
		}],
		["line", {
			x1: "19",
			x2: "22",
			y1: "12",
			y2: "12",
			key: "1tbv5k"
		}],
		["line", {
			x1: "12",
			x2: "12",
			y1: "2",
			y2: "5",
			key: "11lu5j"
		}],
		["line", {
			x1: "12",
			x2: "12",
			y1: "19",
			y2: "22",
			key: "x3vr5v"
		}],
		["circle", {
			cx: "12",
			cy: "12",
			r: "7",
			key: "fim9np"
		}]
	]);
	const LockKeyholeOpen = createLucideIcon("lock-keyhole-open", [
		["circle", {
			cx: "12",
			cy: "16",
			r: "1",
			key: "1au0dj"
		}],
		["rect", {
			width: "18",
			height: "12",
			x: "3",
			y: "10",
			rx: "2",
			key: "l0tzu3"
		}],
		["path", {
			d: "M7 10V7a5 5 0 0 1 9.33-2.5",
			key: "car5b7"
		}]
	]);
	const LockKeyhole = createLucideIcon("lock-keyhole", [
		["circle", {
			cx: "12",
			cy: "16",
			r: "1",
			key: "1au0dj"
		}],
		["rect", {
			x: "3",
			y: "10",
			width: "18",
			height: "12",
			rx: "2",
			key: "6s8ecr"
		}],
		["path", {
			d: "M7 10V7a5 5 0 0 1 10 0v3",
			key: "1pqi11"
		}]
	]);
	const LockOpen = createLucideIcon("lock-open", [["rect", {
		width: "18",
		height: "11",
		x: "3",
		y: "11",
		rx: "2",
		ry: "2",
		key: "1w4ew1"
	}], ["path", {
		d: "M7 11V7a5 5 0 0 1 9.9-1",
		key: "1mm8w8"
	}]]);
	const Lock = createLucideIcon("lock", [["rect", {
		width: "18",
		height: "11",
		x: "3",
		y: "11",
		rx: "2",
		ry: "2",
		key: "1w4ew1"
	}], ["path", {
		d: "M7 11V7a5 5 0 0 1 10 0v4",
		key: "fwvmzm"
	}]]);
	const Logs = createLucideIcon("logs", [
		["path", {
			d: "M3 5h1",
			key: "1mv5vm"
		}],
		["path", {
			d: "M3 12h1",
			key: "lp3yf2"
		}],
		["path", {
			d: "M3 19h1",
			key: "w6f3n9"
		}],
		["path", {
			d: "M8 5h1",
			key: "1nxr5w"
		}],
		["path", {
			d: "M8 12h1",
			key: "1con00"
		}],
		["path", {
			d: "M8 19h1",
			key: "k7p10e"
		}],
		["path", {
			d: "M13 5h8",
			key: "a7qcls"
		}],
		["path", {
			d: "M13 12h8",
			key: "h98zly"
		}],
		["path", {
			d: "M13 19h8",
			key: "c3s6r1"
		}]
	]);
	const LogIn = createLucideIcon("log-in", [
		["path", {
			d: "m10 17 5-5-5-5",
			key: "1bsop3"
		}],
		["path", {
			d: "M15 12H3",
			key: "6jk70r"
		}],
		["path", {
			d: "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4",
			key: "u53s6r"
		}]
	]);
	const Lollipop = createLucideIcon("lollipop", [
		["circle", {
			cx: "11",
			cy: "11",
			r: "8",
			key: "4ej97u"
		}],
		["path", {
			d: "m21 21-4.3-4.3",
			key: "1qie3q"
		}],
		["path", {
			d: "M11 11a2 2 0 0 0 4 0 4 4 0 0 0-8 0 6 6 0 0 0 12 0",
			key: "107gwy"
		}]
	]);
	const Luggage = createLucideIcon("luggage", [
		["path", {
			d: "M6 20a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2",
			key: "1m57jg"
		}],
		["path", {
			d: "M8 18V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v14",
			key: "1l99gc"
		}],
		["path", {
			d: "M10 20h4",
			key: "ni2waw"
		}],
		["circle", {
			cx: "16",
			cy: "20",
			r: "2",
			key: "1vifvg"
		}],
		["circle", {
			cx: "8",
			cy: "20",
			r: "2",
			key: "ckkr5m"
		}]
	]);
	const LogOut = createLucideIcon("log-out", [
		["path", {
			d: "m16 17 5-5-5-5",
			key: "1bji2h"
		}],
		["path", {
			d: "M21 12H9",
			key: "dn1m92"
		}],
		["path", {
			d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",
			key: "1uf3rs"
		}]
	]);
	const Magnet = createLucideIcon("magnet", [
		["path", {
			d: "m12 15 4 4",
			key: "lnac28"
		}],
		["path", {
			d: "M2.352 10.648a1.205 1.205 0 0 0 0 1.704l2.296 2.296a1.205 1.205 0 0 0 1.704 0l6.029-6.029a1 1 0 1 1 3 3l-6.029 6.029a1.205 1.205 0 0 0 0 1.704l2.296 2.296a1.205 1.205 0 0 0 1.704 0l6.365-6.367A1 1 0 0 0 8.716 4.282z",
			key: "nlhkjb"
		}],
		["path", {
			d: "m5 8 4 4",
			key: "j6kj7e"
		}]
	]);
	const MailMinus = createLucideIcon("mail-minus", [
		["path", {
			d: "M22 15V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8",
			key: "fuxbkv"
		}],
		["path", {
			d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",
			key: "1ocrg3"
		}],
		["path", {
			d: "M16 19h6",
			key: "xwg31i"
		}]
	]);
	const MailCheck = createLucideIcon("mail-check", [
		["path", {
			d: "M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8",
			key: "12jkf8"
		}],
		["path", {
			d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",
			key: "1ocrg3"
		}],
		["path", {
			d: "m16 19 2 2 4-4",
			key: "1b14m6"
		}]
	]);
	const MailOpen = createLucideIcon("mail-open", [["path", {
		d: "M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z",
		key: "1jhwl8"
	}], ["path", {
		d: "m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10",
		key: "1qfld7"
	}]]);
	const MailPlus = createLucideIcon("mail-plus", [
		["path", {
			d: "M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8",
			key: "12jkf8"
		}],
		["path", {
			d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",
			key: "1ocrg3"
		}],
		["path", {
			d: "M19 16v6",
			key: "tddt3s"
		}],
		["path", {
			d: "M16 19h6",
			key: "xwg31i"
		}]
	]);
	const MailQuestionMark = createLucideIcon("mail-question-mark", [
		["path", {
			d: "M22 10.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h12.5",
			key: "e61zoh"
		}],
		["path", {
			d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",
			key: "1ocrg3"
		}],
		["path", {
			d: "M18 15.28c.2-.4.5-.8.9-1a2.1 2.1 0 0 1 2.6.4c.3.4.5.8.5 1.3 0 1.3-2 2-2 2",
			key: "7z9rxb"
		}],
		["path", {
			d: "M20 22v.01",
			key: "12bgn6"
		}]
	]);
	const MailSearch = createLucideIcon("mail-search", [
		["path", {
			d: "M22 12.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h7.5",
			key: "w80f2v"
		}],
		["path", {
			d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",
			key: "1ocrg3"
		}],
		["path", {
			d: "M18 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
			key: "8lzu5m"
		}],
		["circle", {
			cx: "18",
			cy: "18",
			r: "3",
			key: "1xkwt0"
		}],
		["path", {
			d: "m22 22-1.5-1.5",
			key: "1x83k4"
		}]
	]);
	const MailWarning = createLucideIcon("mail-warning", [
		["path", {
			d: "M22 10.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h12.5",
			key: "e61zoh"
		}],
		["path", {
			d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",
			key: "1ocrg3"
		}],
		["path", {
			d: "M20 14v4",
			key: "1hm744"
		}],
		["path", {
			d: "M20 22v.01",
			key: "12bgn6"
		}]
	]);
	const MailX = createLucideIcon("mail-x", [
		["path", {
			d: "M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h9",
			key: "1j9vog"
		}],
		["path", {
			d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",
			key: "1ocrg3"
		}],
		["path", {
			d: "m17 17 4 4",
			key: "1b3523"
		}],
		["path", {
			d: "m21 17-4 4",
			key: "uinynz"
		}]
	]);
	const Mail = createLucideIcon("mail", [["path", {
		d: "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7",
		key: "132q7q"
	}], ["rect", {
		x: "2",
		y: "4",
		width: "20",
		height: "16",
		rx: "2",
		key: "izxlao"
	}]]);
	const Mails = createLucideIcon("mails", [
		["path", {
			d: "M17 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 1-1.732",
			key: "1vyzll"
		}],
		["path", {
			d: "m22 5.5-6.419 4.179a2 2 0 0 1-2.162 0L7 5.5",
			key: "k7ramc"
		}],
		["rect", {
			x: "7",
			y: "3",
			width: "15",
			height: "12",
			rx: "2",
			key: "17196g"
		}]
	]);
	const Mailbox = createLucideIcon("mailbox", [
		["path", {
			d: "M22 17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.5C2 7 4 5 6.5 5H18c2.2 0 4 1.8 4 4v8Z",
			key: "1lbycx"
		}],
		["polyline", {
			points: "15,9 18,9 18,11",
			key: "1pm9c0"
		}],
		["path", {
			d: "M6.5 5C9 5 11 7 11 9.5V17a2 2 0 0 1-2 2",
			key: "15i455"
		}],
		["line", {
			x1: "6",
			x2: "7",
			y1: "10",
			y2: "10",
			key: "1e2scm"
		}]
	]);
	const MapMinus = createLucideIcon("map-minus", [
		["path", {
			d: "m11 19-1.106-.552a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0l4.212 2.106a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619V14",
			key: "40pylx"
		}],
		["path", {
			d: "M15 5.764V14",
			key: "1bab71"
		}],
		["path", {
			d: "M21 18h-6",
			key: "139f0c"
		}],
		["path", {
			d: "M9 3.236v15",
			key: "1uimfh"
		}]
	]);
	const MapPinCheckInside = createLucideIcon("map-pin-check-inside", [["path", {
		d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
		key: "1r0f0z"
	}], ["path", {
		d: "m9 10 2 2 4-4",
		key: "1gnqz4"
	}]]);
	const MapPinCheck = createLucideIcon("map-pin-check", [
		["path", {
			d: "M19.43 12.935c.357-.967.57-1.955.57-2.935a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 1.202 0 32.197 32.197 0 0 0 .813-.728",
			key: "1dq61d"
		}],
		["circle", {
			cx: "12",
			cy: "10",
			r: "3",
			key: "ilqhr7"
		}],
		["path", {
			d: "m16 18 2 2 4-4",
			key: "1mkfmb"
		}]
	]);
	const MapPinHouse = createLucideIcon("map-pin-house", [
		["path", {
			d: "M15 22a1 1 0 0 1-1-1v-4a1 1 0 0 1 .445-.832l3-2a1 1 0 0 1 1.11 0l3 2A1 1 0 0 1 22 17v4a1 1 0 0 1-1 1z",
			key: "1p1rcz"
		}],
		["path", {
			d: "M18 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 .601.2",
			key: "mcbcs9"
		}],
		["path", {
			d: "M18 22v-3",
			key: "1t1ugv"
		}],
		["circle", {
			cx: "10",
			cy: "10",
			r: "3",
			key: "1ns7v1"
		}]
	]);
	const MapPinMinusInside = createLucideIcon("map-pin-minus-inside", [["path", {
		d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
		key: "1r0f0z"
	}], ["path", {
		d: "M9 10h6",
		key: "9gxzsh"
	}]]);
	const MapPinMinus = createLucideIcon("map-pin-minus", [
		["path", {
			d: "M18.977 14C19.6 12.701 20 11.343 20 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 1.202 0 32 32 0 0 0 .824-.738",
			key: "11uxia"
		}],
		["circle", {
			cx: "12",
			cy: "10",
			r: "3",
			key: "ilqhr7"
		}],
		["path", {
			d: "M16 18h6",
			key: "987eiv"
		}]
	]);
	const MapPinOff = createLucideIcon("map-pin-off", [
		["path", {
			d: "M12.75 7.09a3 3 0 0 1 2.16 2.16",
			key: "1d4wjd"
		}],
		["path", {
			d: "M17.072 17.072c-1.634 2.17-3.527 3.912-4.471 4.727a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 1.432-4.568",
			key: "12yil7"
		}],
		["path", {
			d: "m2 2 20 20",
			key: "1ooewy"
		}],
		["path", {
			d: "M8.475 2.818A8 8 0 0 1 20 10c0 1.183-.31 2.377-.81 3.533",
			key: "lhrkcz"
		}],
		["path", {
			d: "M9.13 9.13a3 3 0 0 0 3.74 3.74",
			key: "13wojd"
		}]
	]);
	const MapPinPen = createLucideIcon("map-pin-pen", [
		["path", {
			d: "M17.97 9.304A8 8 0 0 0 2 10c0 4.69 4.887 9.562 7.022 11.468",
			key: "1fahp3"
		}],
		["path", {
			d: "M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z",
			key: "1817ys"
		}],
		["circle", {
			cx: "10",
			cy: "10",
			r: "3",
			key: "1ns7v1"
		}]
	]);
	const MapPinPlusInside = createLucideIcon("map-pin-plus-inside", [
		["path", {
			d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
			key: "1r0f0z"
		}],
		["path", {
			d: "M12 7v6",
			key: "lw1j43"
		}],
		["path", {
			d: "M9 10h6",
			key: "9gxzsh"
		}]
	]);
	const MapPinPlus = createLucideIcon("map-pin-plus", [
		["path", {
			d: "M19.914 11.105A7.298 7.298 0 0 0 20 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 1.202 0 32 32 0 0 0 .824-.738",
			key: "fcdtly"
		}],
		["circle", {
			cx: "12",
			cy: "10",
			r: "3",
			key: "ilqhr7"
		}],
		["path", {
			d: "M16 18h6",
			key: "987eiv"
		}],
		["path", {
			d: "M19 15v6",
			key: "10aioa"
		}]
	]);
	const MapPinXInside = createLucideIcon("map-pin-x-inside", [
		["path", {
			d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
			key: "1r0f0z"
		}],
		["path", {
			d: "m14.5 7.5-5 5",
			key: "3lb6iw"
		}],
		["path", {
			d: "m9.5 7.5 5 5",
			key: "ko136h"
		}]
	]);
	const MapPinX = createLucideIcon("map-pin-x", [
		["path", {
			d: "M19.752 11.901A7.78 7.78 0 0 0 20 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 1.202 0 19 19 0 0 0 .09-.077",
			key: "y0ewhp"
		}],
		["circle", {
			cx: "12",
			cy: "10",
			r: "3",
			key: "ilqhr7"
		}],
		["path", {
			d: "m21.5 15.5-5 5",
			key: "11iqnx"
		}],
		["path", {
			d: "m21.5 20.5-5-5",
			key: "1bylgx"
		}]
	]);
	const MapPin = createLucideIcon("map-pin", [["path", {
		d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
		key: "1r0f0z"
	}], ["circle", {
		cx: "12",
		cy: "10",
		r: "3",
		key: "ilqhr7"
	}]]);
	const MapPinned = createLucideIcon("map-pinned", [
		["path", {
			d: "M18 8c0 3.613-3.869 7.429-5.393 8.795a1 1 0 0 1-1.214 0C9.87 15.429 6 11.613 6 8a6 6 0 0 1 12 0",
			key: "11u0oz"
		}],
		["circle", {
			cx: "12",
			cy: "8",
			r: "2",
			key: "1822b1"
		}],
		["path", {
			d: "M8.714 14h-3.71a1 1 0 0 0-.948.683l-2.004 6A1 1 0 0 0 3 22h18a1 1 0 0 0 .948-1.316l-2-6a1 1 0 0 0-.949-.684h-3.712",
			key: "q8zwxj"
		}]
	]);
	const MapPlus = createLucideIcon("map-plus", [
		["path", {
			d: "m11 19-1.106-.552a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0l4.212 2.106a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619V12",
			key: "svfegj"
		}],
		["path", {
			d: "M15 5.764V12",
			key: "1ocw4k"
		}],
		["path", {
			d: "M18 15v6",
			key: "9wciyi"
		}],
		["path", {
			d: "M21 18h-6",
			key: "139f0c"
		}],
		["path", {
			d: "M9 3.236v15",
			key: "1uimfh"
		}]
	]);
	const Map = createLucideIcon("map", [
		["path", {
			d: "M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z",
			key: "169xi5"
		}],
		["path", {
			d: "M15 5.764v15",
			key: "1pn4in"
		}],
		["path", {
			d: "M9 3.236v15",
			key: "1uimfh"
		}]
	]);
	const MarsStroke = createLucideIcon("mars-stroke", [
		["path", {
			d: "m14 6 4 4",
			key: "1q72g9"
		}],
		["path", {
			d: "M17 3h4v4",
			key: "19p9u1"
		}],
		["path", {
			d: "m21 3-7.75 7.75",
			key: "1cjbfd"
		}],
		["circle", {
			cx: "9",
			cy: "15",
			r: "6",
			key: "bx5svt"
		}]
	]);
	const Mars = createLucideIcon("mars", [
		["path", {
			d: "M16 3h5v5",
			key: "1806ms"
		}],
		["path", {
			d: "m21 3-6.75 6.75",
			key: "pv0uzu"
		}],
		["circle", {
			cx: "10",
			cy: "14",
			r: "6",
			key: "1qwbdc"
		}]
	]);
	const Martini = createLucideIcon("martini", [
		["path", {
			d: "M8 22h8",
			key: "rmew8v"
		}],
		["path", {
			d: "M12 11v11",
			key: "ur9y6a"
		}],
		["path", {
			d: "m19 3-7 8-7-8Z",
			key: "1sgpiw"
		}]
	]);
	const Maximize2 = createLucideIcon("maximize-2", [
		["path", {
			d: "M15 3h6v6",
			key: "1q9fwt"
		}],
		["path", {
			d: "m21 3-7 7",
			key: "1l2asr"
		}],
		["path", {
			d: "m3 21 7-7",
			key: "tjx5ai"
		}],
		["path", {
			d: "M9 21H3v-6",
			key: "wtvkvv"
		}]
	]);
	const Medal = createLucideIcon("medal", [
		["path", {
			d: "M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15",
			key: "143lza"
		}],
		["path", {
			d: "M11 12 5.12 2.2",
			key: "qhuxz6"
		}],
		["path", {
			d: "m13 12 5.88-9.8",
			key: "hbye0f"
		}],
		["path", {
			d: "M8 7h8",
			key: "i86dvs"
		}],
		["circle", {
			cx: "12",
			cy: "17",
			r: "5",
			key: "qbz8iq"
		}],
		["path", {
			d: "M12 18v-2h-.5",
			key: "fawc4q"
		}]
	]);
	const Maximize = createLucideIcon("maximize", [
		["path", {
			d: "M8 3H5a2 2 0 0 0-2 2v3",
			key: "1dcmit"
		}],
		["path", {
			d: "M21 8V5a2 2 0 0 0-2-2h-3",
			key: "1e4gt3"
		}],
		["path", {
			d: "M3 16v3a2 2 0 0 0 2 2h3",
			key: "wsl5sc"
		}],
		["path", {
			d: "M16 21h3a2 2 0 0 0 2-2v-3",
			key: "18trek"
		}]
	]);
	const MegaphoneOff = createLucideIcon("megaphone-off", [
		["path", {
			d: "M11.636 6A13 13 0 0 0 19.4 3.2 1 1 0 0 1 21 4v11.344",
			key: "bycexp"
		}],
		["path", {
			d: "M14.378 14.357A13 13 0 0 0 11 14H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h1",
			key: "1t17s6"
		}],
		["path", {
			d: "m2 2 20 20",
			key: "1ooewy"
		}],
		["path", {
			d: "M6 14a12 12 0 0 0 2.4 7.2 2 2 0 0 0 3.2-2.4A8 8 0 0 1 10 14",
			key: "1853fq"
		}],
		["path", {
			d: "M8 8v6",
			key: "aieo6v"
		}]
	]);
	const Megaphone = createLucideIcon("megaphone", [
		["path", {
			d: "M11 6a13 13 0 0 0 8.4-2.8A1 1 0 0 1 21 4v12a1 1 0 0 1-1.6.8A13 13 0 0 0 11 14H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z",
			key: "q8bfy3"
		}],
		["path", {
			d: "M6 14a12 12 0 0 0 2.4 7.2 2 2 0 0 0 3.2-2.4A8 8 0 0 1 10 14",
			key: "1853fq"
		}],
		["path", {
			d: "M8 6v8",
			key: "15ugcq"
		}]
	]);
	const Meh = createLucideIcon("meh", [
		["circle", {
			cx: "12",
			cy: "12",
			r: "10",
			key: "1mglay"
		}],
		["line", {
			x1: "8",
			x2: "16",
			y1: "15",
			y2: "15",
			key: "1xb1d9"
		}],
		["line", {
			x1: "9",
			x2: "9.01",
			y1: "9",
			y2: "9",
			key: "yxxnd0"
		}],
		["line", {
			x1: "15",
			x2: "15.01",
			y1: "9",
			y2: "9",
			key: "1p4y9e"
		}]
	]);
	const MemoryStick = createLucideIcon("memory-stick", [
		["path", {
			d: "M6 19v-3",
			key: "1nvgqn"
		}],
		["path", {
			d: "M10 19v-3",
			key: "iu8nkm"
		}],
		["path", {
			d: "M14 19v-3",
			key: "kcehxu"
		}],
		["path", {
			d: "M18 19v-3",
			key: "1vh91z"
		}],
		["path", {
			d: "M8 11V9",
			key: "63erz4"
		}],
		["path", {
			d: "M16 11V9",
			key: "fru6f3"
		}],
		["path", {
			d: "M12 11V9",
			key: "ha00sb"
		}],
		["path", {
			d: "M2 15h20",
			key: "16ne18"
		}],
		["path", {
			d: "M2 7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v1.1a2 2 0 0 0 0 3.837V17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-5.1a2 2 0 0 0 0-3.837Z",
			key: "lhddv3"
		}]
	]);
	const Menu = createLucideIcon("menu", [
		["path", {
			d: "M4 5h16",
			key: "1tepv9"
		}],
		["path", {
			d: "M4 12h16",
			key: "1lakjw"
		}],
		["path", {
			d: "M4 19h16",
			key: "1djgab"
		}]
	]);
	const Merge = createLucideIcon("merge", [
		["path", {
			d: "m8 6 4-4 4 4",
			key: "ybng9g"
		}],
		["path", {
			d: "M12 2v10.3a4 4 0 0 1-1.172 2.872L4 22",
			key: "1hyw0i"
		}],
		["path", {
			d: "m20 22-5-5",
			key: "1m27yz"
		}]
	]);
	const MessageCircleCode = createLucideIcon("message-circle-code", [
		["path", {
			d: "m10 9-3 3 3 3",
			key: "1oro0q"
		}],
		["path", {
			d: "m14 15 3-3-3-3",
			key: "bz13h7"
		}],
		["path", {
			d: "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",
			key: "1sd12s"
		}]
	]);
	const MessageCircleDashed = createLucideIcon("message-circle-dashed", [
		["path", {
			d: "M10.1 2.182a10 10 0 0 1 3.8 0",
			key: "5ilxe3"
		}],
		["path", {
			d: "M13.9 21.818a10 10 0 0 1-3.8 0",
			key: "11zvb9"
		}],
		["path", {
			d: "M17.609 3.72a10 10 0 0 1 2.69 2.7",
			key: "jiglxs"
		}],
		["path", {
			d: "M2.182 13.9a10 10 0 0 1 0-3.8",
			key: "c0bmvh"
		}],
		["path", {
			d: "M20.28 17.61a10 10 0 0 1-2.7 2.69",
			key: "elg7ff"
		}],
		["path", {
			d: "M21.818 10.1a10 10 0 0 1 0 3.8",
			key: "qkgqxc"
		}],
		["path", {
			d: "M3.721 6.391a10 10 0 0 1 2.7-2.69",
			key: "1mcia2"
		}],
		["path", {
			d: "m6.163 21.117-2.906.85a1 1 0 0 1-1.236-1.169l.965-2.98",
			key: "1qsu07"
		}]
	]);
	const MessageCircleHeart = createLucideIcon("message-circle-heart", [["path", {
		d: "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",
		key: "1sd12s"
	}], ["path", {
		d: "M7.828 13.07A3 3 0 0 1 12 8.764a3 3 0 0 1 5.004 2.224 3 3 0 0 1-.832 2.083l-3.447 3.62a1 1 0 0 1-1.45-.001z",
		key: "hoo97p"
	}]]);
	const MessageCircleOff = createLucideIcon("message-circle-off", [
		["path", {
			d: "m2 2 20 20",
			key: "1ooewy"
		}],
		["path", {
			d: "M4.93 4.929a10 10 0 0 0-1.938 11.412 2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 0 0 11.302-1.989",
			key: "7il5tn"
		}],
		["path", {
			d: "M8.35 2.69A10 10 0 0 1 21.3 15.65",
			key: "1pfsoa"
		}]
	]);
	const MessageCircleMore = createLucideIcon("message-circle-more", [
		["path", {
			d: "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",
			key: "1sd12s"
		}],
		["path", {
			d: "M8 12h.01",
			key: "czm47f"
		}],
		["path", {
			d: "M12 12h.01",
			key: "1mp3jc"
		}],
		["path", {
			d: "M16 12h.01",
			key: "1l6xoz"
		}]
	]);
	const MessageCirclePlus = createLucideIcon("message-circle-plus", [
		["path", {
			d: "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",
			key: "1sd12s"
		}],
		["path", {
			d: "M8 12h8",
			key: "1wcyev"
		}],
		["path", {
			d: "M12 8v8",
			key: "napkw2"
		}]
	]);
	const MessageCircleQuestionMark = createLucideIcon("message-circle-question-mark", [
		["path", {
			d: "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",
			key: "1sd12s"
		}],
		["path", {
			d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",
			key: "1u773s"
		}],
		["path", {
			d: "M12 17h.01",
			key: "p32p05"
		}]
	]);
	const MessageCircleReply = createLucideIcon("message-circle-reply", [
		["path", {
			d: "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",
			key: "1sd12s"
		}],
		["path", {
			d: "m10 15-3-3 3-3",
			key: "1pgupc"
		}],
		["path", {
			d: "M7 12h8a2 2 0 0 1 2 2v1",
			key: "89sh1g"
		}]
	]);
	const MessageCircleWarning = createLucideIcon("message-circle-warning", [
		["path", {
			d: "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",
			key: "1sd12s"
		}],
		["path", {
			d: "M12 8v4",
			key: "1got3b"
		}],
		["path", {
			d: "M12 16h.01",
			key: "1drbdi"
		}]
	]);
	const MessageCircleX = createLucideIcon("message-circle-x", [
		["path", {
			d: "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",
			key: "1sd12s"
		}],
		["path", {
			d: "m15 9-6 6",
			key: "1uzhvr"
		}],
		["path", {
			d: "m9 9 6 6",
			key: "z0biqf"
		}]
	]);
	const MessageCircle = createLucideIcon("message-circle", [["path", {
		d: "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",
		key: "1sd12s"
	}]]);
	const MessageSquareCode = createLucideIcon("message-square-code", [
		["path", {
			d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",
			key: "18887p"
		}],
		["path", {
			d: "m10 8-3 3 3 3",
			key: "fp6dz7"
		}],
		["path", {
			d: "m14 14 3-3-3-3",
			key: "1yrceu"
		}]
	]);
	const MessageSquareDashed = createLucideIcon("message-square-dashed", [
		["path", {
			d: "M12 19h.01",
			key: "1wutuc"
		}],
		["path", {
			d: "M12 3h.01",
			key: "n36tog"
		}],
		["path", {
			d: "M16 19h.01",
			key: "1vcnzz"
		}],
		["path", {
			d: "M16 3h.01",
			key: "ll0zb8"
		}],
		["path", {
			d: "M2 13h.01",
			key: "1aptou"
		}],
		["path", {
			d: "M2 17v4.286a.71.71 0 0 0 1.212.502l2.202-2.202A2 2 0 0 1 6.828 19H8",
			key: "4cp7zq"
		}],
		["path", {
			d: "M2 5a2 2 0 0 1 2-2",
			key: "1iztiu"
		}],
		["path", {
			d: "M2 9h.01",
			key: "1nzd1v"
		}],
		["path", {
			d: "M20 3a2 2 0 0 1 2 2",
			key: "m48m3a"
		}],
		["path", {
			d: "M22 13h.01",
			key: "ke7esy"
		}],
		["path", {
			d: "M22 17a2 2 0 0 1-2 2",
			key: "17q5fo"
		}],
		["path", {
			d: "M22 9h.01",
			key: "npkp49"
		}],
		["path", {
			d: "M8 3h.01",
			key: "133hau"
		}]
	]);
	const MessageSquareDiff = createLucideIcon("message-square-diff", [
		["path", {
			d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",
			key: "18887p"
		}],
		["path", {
			d: "M10 15h4",
			key: "192ueg"
		}],
		["path", {
			d: "M10 9h4",
			key: "u4k05v"
		}],
		["path", {
			d: "M12 7v4",
			key: "xawao1"
		}]
	]);
	const MessageSquareDot = createLucideIcon("message-square-dot", [["path", {
		d: "M12.7 3H4a2 2 0 0 0-2 2v16.286a.71.71 0 0 0 1.212.502l2.202-2.202A2 2 0 0 1 6.828 19H20a2 2 0 0 0 2-2v-4.7",
		key: "wjb7ig"
	}], ["circle", {
		cx: "19",
		cy: "6",
		r: "3",
		key: "108a5v"
	}]]);
	const MessageSquareHeart = createLucideIcon("message-square-heart", [["path", {
		d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",
		key: "18887p"
	}], ["path", {
		d: "M7.5 9.5c0 .687.265 1.383.697 1.844l3.009 3.264a1.14 1.14 0 0 0 .407.314 1 1 0 0 0 .783-.004 1.14 1.14 0 0 0 .398-.31l3.008-3.264A2.77 2.77 0 0 0 16.5 9.5 2.5 2.5 0 0 0 12 8a2.5 2.5 0 0 0-4.5 1.5",
		key: "1faxuh"
	}]]);
	const MessageSquareLock = createLucideIcon("message-square-lock", [
		["path", {
			d: "M22 8.5V5a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v16.286a.71.71 0 0 0 1.212.502l2.202-2.202A2 2 0 0 1 6.828 19H10",
			key: "fu6chl"
		}],
		["path", {
			d: "M20 15v-2a2 2 0 0 0-4 0v2",
			key: "vl8a78"
		}],
		["rect", {
			x: "14",
			y: "15",
			width: "8",
			height: "5",
			rx: "1",
			key: "37aafw"
		}]
	]);
	const MessageSquareMore = createLucideIcon("message-square-more", [
		["path", {
			d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",
			key: "18887p"
		}],
		["path", {
			d: "M12 11h.01",
			key: "z322tv"
		}],
		["path", {
			d: "M16 11h.01",
			key: "xkw8gn"
		}],
		["path", {
			d: "M8 11h.01",
			key: "1dfujw"
		}]
	]);
	const MessageSquareOff = createLucideIcon("message-square-off", [
		["path", {
			d: "M19 19H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.7.7 0 0 1 2 21.286V5a2 2 0 0 1 1.184-1.826",
			key: "1wyg69"
		}],
		["path", {
			d: "m2 2 20 20",
			key: "1ooewy"
		}],
		["path", {
			d: "M8.656 3H20a2 2 0 0 1 2 2v11.344",
			key: "mhl4k6"
		}]
	]);
	const MessageSquarePlus = createLucideIcon("message-square-plus", [
		["path", {
			d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",
			key: "18887p"
		}],
		["path", {
			d: "M12 8v6",
			key: "1ib9pf"
		}],
		["path", {
			d: "M9 11h6",
			key: "1fldmi"
		}]
	]);
	const MessageSquareQuote = createLucideIcon("message-square-quote", [
		["path", {
			d: "M14 14a2 2 0 0 0 2-2V8h-2",
			key: "1r06pg"
		}],
		["path", {
			d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",
			key: "18887p"
		}],
		["path", {
			d: "M8 14a2 2 0 0 0 2-2V8H8",
			key: "1jzu5j"
		}]
	]);
	const MessageSquareReply = createLucideIcon("message-square-reply", [
		["path", {
			d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",
			key: "18887p"
		}],
		["path", {
			d: "m10 8-3 3 3 3",
			key: "fp6dz7"
		}],
		["path", {
			d: "M17 14v-1a2 2 0 0 0-2-2H7",
			key: "1tkjnz"
		}]
	]);
	const MessageSquareShare = createLucideIcon("message-square-share", [
		["path", {
			d: "M12 3H4a2 2 0 0 0-2 2v16.286a.71.71 0 0 0 1.212.502l2.202-2.202A2 2 0 0 1 6.828 19H20a2 2 0 0 0 2-2v-4",
			key: "11da1y"
		}],
		["path", {
			d: "M16 3h6v6",
			key: "1bx56c"
		}],
		["path", {
			d: "m16 9 6-6",
			key: "m4dnic"
		}]
	]);
	const MessageSquareText = createLucideIcon("message-square-text", [
		["path", {
			d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",
			key: "18887p"
		}],
		["path", {
			d: "M7 11h10",
			key: "1twpyw"
		}],
		["path", {
			d: "M7 15h6",
			key: "d9of3u"
		}],
		["path", {
			d: "M7 7h8",
			key: "af5zfr"
		}]
	]);
	const MessageSquareWarning = createLucideIcon("message-square-warning", [
		["path", {
			d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",
			key: "18887p"
		}],
		["path", {
			d: "M12 15h.01",
			key: "q59x07"
		}],
		["path", {
			d: "M12 7v4",
			key: "xawao1"
		}]
	]);
	const MessageSquareX = createLucideIcon("message-square-x", [
		["path", {
			d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",
			key: "18887p"
		}],
		["path", {
			d: "m14.5 8.5-5 5",
			key: "19tnj2"
		}],
		["path", {
			d: "m9.5 8.5 5 5",
			key: "1oa8ql"
		}]
	]);
	const MessageSquare = createLucideIcon("message-square", [["path", {
		d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",
		key: "18887p"
	}]]);
	const MessagesSquare = createLucideIcon("messages-square", [["path", {
		d: "M16 10a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 14.286V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z",
		key: "1n2ejm"
	}], ["path", {
		d: "M20 9a2 2 0 0 1 2 2v10.286a.71.71 0 0 1-1.212.502l-2.202-2.202A2 2 0 0 0 17.172 19H10a2 2 0 0 1-2-2v-1",
		key: "1qfcsi"
	}]]);
	const MicOff = createLucideIcon("mic-off", [
		["path", {
			d: "M12 19v3",
			key: "npa21l"
		}],
		["path", {
			d: "M15 9.34V5a3 3 0 0 0-5.68-1.33",
			key: "1gzdoj"
		}],
		["path", {
			d: "M16.95 16.95A7 7 0 0 1 5 12v-2",
			key: "cqa7eg"
		}],
		["path", {
			d: "M18.89 13.23A7 7 0 0 0 19 12v-2",
			key: "16hl24"
		}],
		["path", {
			d: "m2 2 20 20",
			key: "1ooewy"
		}],
		["path", {
			d: "M9 9v3a3 3 0 0 0 5.12 2.12",
			key: "r2i35w"
		}]
	]);
	const MicVocal = createLucideIcon("mic-vocal", [
		["path", {
			d: "m11 7.601-5.994 8.19a1 1 0 0 0 .1 1.298l.817.818a1 1 0 0 0 1.314.087L15.09 12",
			key: "80a601"
		}],
		["path", {
			d: "M16.5 21.174C15.5 20.5 14.372 20 13 20c-2.058 0-3.928 2.356-6 2-2.072-.356-2.775-3.369-1.5-4.5",
			key: "j0ngtp"
		}],
		["circle", {
			cx: "16",
			cy: "7",
			r: "5",
			key: "d08jfb"
		}]
	]);
	const Mic = createLucideIcon("mic", [
		["path", {
			d: "M12 19v3",
			key: "npa21l"
		}],
		["path", {
			d: "M19 10v2a7 7 0 0 1-14 0v-2",
			key: "1vc78b"
		}],
		["rect", {
			x: "9",
			y: "2",
			width: "6",
			height: "13",
			rx: "3",
			key: "s6n7sd"
		}]
	]);
	const Microchip = createLucideIcon("microchip", [
		["path", {
			d: "M18 12h2",
			key: "quuxs7"
		}],
		["path", {
			d: "M18 16h2",
			key: "zsn3lv"
		}],
		["path", {
			d: "M18 20h2",
			key: "9x5y9y"
		}],
		["path", {
			d: "M18 4h2",
			key: "1luxfb"
		}],
		["path", {
			d: "M18 8h2",
			key: "nxqzg"
		}],
		["path", {
			d: "M4 12h2",
			key: "1ltxp0"
		}],
		["path", {
			d: "M4 16h2",
			key: "8a5zha"
		}],
		["path", {
			d: "M4 20h2",
			key: "27dk57"
		}],
		["path", {
			d: "M4 4h2",
			key: "10groj"
		}],
		["path", {
			d: "M4 8h2",
			key: "18vq6w"
		}],
		["path", {
			d: "M8 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-1.5c-.276 0-.494.227-.562.495a2 2 0 0 1-3.876 0C9.994 2.227 9.776 2 9.5 2z",
			key: "1681fp"
		}]
	]);
	const Microscope = createLucideIcon("microscope", [
		["path", {
			d: "M6 18h8",
			key: "1borvv"
		}],
		["path", {
			d: "M3 22h18",
			key: "8prr45"
		}],
		["path", {
			d: "M14 22a7 7 0 1 0 0-14h-1",
			key: "1jwaiy"
		}],
		["path", {
			d: "M9 14h2",
			key: "197e7h"
		}],
		["path", {
			d: "M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z",
			key: "1bmzmy"
		}],
		["path", {
			d: "M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3",
			key: "1drr47"
		}]
	]);
	const Microwave = createLucideIcon("microwave", [
		["rect", {
			width: "20",
			height: "15",
			x: "2",
			y: "4",
			rx: "2",
			key: "2no95f"
		}],
		["rect", {
			width: "8",
			height: "7",
			x: "6",
			y: "8",
			rx: "1",
			key: "zh9wx"
		}],
		["path", {
			d: "M18 8v7",
			key: "o5zi4n"
		}],
		["path", {
			d: "M6 19v2",
			key: "1loha6"
		}],
		["path", {
			d: "M18 19v2",
			key: "1dawf0"
		}]
	]);
	const Milestone = createLucideIcon("milestone", [
		["path", {
			d: "M12 13v8",
			key: "1l5pq0"
		}],
		["path", {
			d: "M12 3v3",
			key: "1n5kay"
		}],
		["path", {
			d: "M4 6a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h13a2 2 0 0 0 1.152-.365l3.424-2.317a1 1 0 0 0 0-1.635l-3.424-2.318A2 2 0 0 0 17 6z",
			key: "1btarq"
		}]
	]);
	const MilkOff = createLucideIcon("milk-off", [
		["path", {
			d: "M8 2h8",
			key: "1ssgc1"
		}],
		["path", {
			d: "M9 2v1.343M15 2v2.789a4 4 0 0 0 .672 2.219l.656.984a4 4 0 0 1 .672 2.22v1.131M7.8 7.8l-.128.192A4 4 0 0 0 7 10.212V20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-3",
			key: "y0ejgx"
		}],
		["path", {
			d: "M7 15a6.47 6.47 0 0 1 5 0 6.472 6.472 0 0 0 3.435.435",
			key: "iaxqsy"
		}],
		["line", {
			x1: "2",
			x2: "22",
			y1: "2",
			y2: "22",
			key: "a6p6uj"
		}]
	]);
	const Milk = createLucideIcon("milk", [
		["path", {
			d: "M8 2h8",
			key: "1ssgc1"
		}],
		["path", {
			d: "M9 2v2.789a4 4 0 0 1-.672 2.219l-.656.984A4 4 0 0 0 7 10.212V20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-9.789a4 4 0 0 0-.672-2.219l-.656-.984A4 4 0 0 1 15 4.788V2",
			key: "qtp12x"
		}],
		["path", {
			d: "M7 15a6.472 6.472 0 0 1 5 0 6.47 6.47 0 0 0 5 0",
			key: "ygeh44"
		}]
	]);
	const Minimize2 = createLucideIcon("minimize-2", [
		["path", {
			d: "m14 10 7-7",
			key: "oa77jy"
		}],
		["path", {
			d: "M20 10h-6V4",
			key: "mjg0md"
		}],
		["path", {
			d: "m3 21 7-7",
			key: "tjx5ai"
		}],
		["path", {
			d: "M4 14h6v6",
			key: "rmj7iw"
		}]
	]);
	const Minimize = createLucideIcon("minimize", [
		["path", {
			d: "M8 3v3a2 2 0 0 1-2 2H3",
			key: "hohbtr"
		}],
		["path", {
			d: "M21 8h-3a2 2 0 0 1-2-2V3",
			key: "5jw1f3"
		}],
		["path", {
			d: "M3 16h3a2 2 0 0 1 2 2v3",
			key: "198tvr"
		}],
		["path", {
			d: "M16 21v-3a2 2 0 0 1 2-2h3",
			key: "ph8mxp"
		}]
	]);
	const Minus = createLucideIcon("minus", [["path", {
		d: "M5 12h14",
		key: "1ays0h"
	}]]);
	const MonitorCheck = createLucideIcon("monitor-check", [
		["path", {
			d: "m9 10 2 2 4-4",
			key: "1gnqz4"
		}],
		["rect", {
			width: "20",
			height: "14",
			x: "2",
			y: "3",
			rx: "2",
			key: "48i651"
		}],
		["path", {
			d: "M12 17v4",
			key: "1riwvh"
		}],
		["path", {
			d: "M8 21h8",
			key: "1ev6f3"
		}]
	]);
	const MonitorCloud = createLucideIcon("monitor-cloud", [
		["path", {
			d: "M11 13a3 3 0 1 1 2.83-4H14a2 2 0 0 1 0 4z",
			key: "1da4q6"
		}],
		["path", {
			d: "M12 17v4",
			key: "1riwvh"
		}],
		["path", {
			d: "M8 21h8",
			key: "1ev6f3"
		}],
		["rect", {
			x: "2",
			y: "3",
			width: "20",
			height: "14",
			rx: "2",
			key: "x3v2xh"
		}]
	]);
	const MonitorCog = createLucideIcon("monitor-cog", [
		["path", {
			d: "M12 17v4",
			key: "1riwvh"
		}],
		["path", {
			d: "m14.305 7.53.923-.382",
			key: "1mlnsw"
		}],
		["path", {
			d: "m15.228 4.852-.923-.383",
			key: "82mpwg"
		}],
		["path", {
			d: "m16.852 3.228-.383-.924",
			key: "ln4sir"
		}],
		["path", {
			d: "m16.852 8.772-.383.923",
			key: "1dejw0"
		}],
		["path", {
			d: "m19.148 3.228.383-.924",
			key: "192kgf"
		}],
		["path", {
			d: "m19.53 9.696-.382-.924",
			key: "fiavlr"
		}],
		["path", {
			d: "m20.772 4.852.924-.383",
			key: "1j8mgp"
		}],
		["path", {
			d: "m20.772 7.148.924.383",
			key: "zix9be"
		}],
		["path", {
			d: "M22 13v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7",
			key: "1tnzv8"
		}],
		["path", {
			d: "M8 21h8",
			key: "1ev6f3"
		}],
		["circle", {
			cx: "18",
			cy: "6",
			r: "3",
			key: "1h7g24"
		}]
	]);
	const MonitorDot = createLucideIcon("monitor-dot", [
		["path", {
			d: "M12 17v4",
			key: "1riwvh"
		}],
		["path", {
			d: "M22 12.307V15a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8.693",
			key: "1dx6ho"
		}],
		["path", {
			d: "M8 21h8",
			key: "1ev6f3"
		}],
		["circle", {
			cx: "19",
			cy: "6",
			r: "3",
			key: "108a5v"
		}]
	]);
	const MonitorDown = createLucideIcon("monitor-down", [
		["path", {
			d: "M12 13V7",
			key: "h0r20n"
		}],
		["path", {
			d: "m15 10-3 3-3-3",
			key: "lzhmyn"
		}],
		["rect", {
			width: "20",
			height: "14",
			x: "2",
			y: "3",
			rx: "2",
			key: "48i651"
		}],
		["path", {
			d: "M12 17v4",
			key: "1riwvh"
		}],
		["path", {
			d: "M8 21h8",
			key: "1ev6f3"
		}]
	]);
	const MonitorOff = createLucideIcon("monitor-off", [
		["path", {
			d: "M17 17H4a2 2 0 0 1-2-2V5c0-1.5 1-2 1-2",
			key: "k0q8oc"
		}],
		["path", {
			d: "M22 15V5a2 2 0 0 0-2-2H9",
			key: "cp1ac0"
		}],
		["path", {
			d: "M8 21h8",
			key: "1ev6f3"
		}],
		["path", {
			d: "M12 17v4",
			key: "1riwvh"
		}],
		["path", {
			d: "m2 2 20 20",
			key: "1ooewy"
		}]
	]);
	const MonitorPause = createLucideIcon("monitor-pause", [
		["path", {
			d: "M10 13V7",
			key: "1u13u9"
		}],
		["path", {
			d: "M14 13V7",
			key: "1vj9om"
		}],
		["rect", {
			width: "20",
			height: "14",
			x: "2",
			y: "3",
			rx: "2",
			key: "48i651"
		}],
		["path", {
			d: "M12 17v4",
			key: "1riwvh"
		}],
		["path", {
			d: "M8 21h8",
			key: "1ev6f3"
		}]
	]);
	const MonitorPlay = createLucideIcon("monitor-play", [
		["path", {
			d: "M15.033 9.44a.647.647 0 0 1 0 1.12l-4.065 2.352a.645.645 0 0 1-.968-.56V7.648a.645.645 0 0 1 .967-.56z",
			key: "vbtd3f"
		}],
		["path", {
			d: "M12 17v4",
			key: "1riwvh"
		}],
		["path", {
			d: "M8 21h8",
			key: "1ev6f3"
		}],
		["rect", {
			x: "2",
			y: "3",
			width: "20",
			height: "14",
			rx: "2",
			key: "x3v2xh"
		}]
	]);
	const MonitorSmartphone = createLucideIcon("monitor-smartphone", [
		["path", {
			d: "M18 8V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8",
			key: "10dyio"
		}],
		["path", {
			d: "M10 19v-3.96 3.15",
			key: "1irgej"
		}],
		["path", {
			d: "M7 19h5",
			key: "qswx4l"
		}],
		["rect", {
			width: "6",
			height: "10",
			x: "16",
			y: "12",
			rx: "2",
			key: "1egngj"
		}]
	]);
	const MonitorSpeaker = createLucideIcon("monitor-speaker", [
		["path", {
			d: "M5.5 20H8",
			key: "1k40s5"
		}],
		["path", {
			d: "M17 9h.01",
			key: "1j24nn"
		}],
		["rect", {
			width: "10",
			height: "16",
			x: "12",
			y: "4",
			rx: "2",
			key: "ixliua"
		}],
		["path", {
			d: "M8 6H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h4",
			key: "1mp6e1"
		}],
		["circle", {
			cx: "17",
			cy: "15",
			r: "1",
			key: "tqvash"
		}]
	]);
	const MonitorStop = createLucideIcon("monitor-stop", [
		["path", {
			d: "M12 17v4",
			key: "1riwvh"
		}],
		["path", {
			d: "M8 21h8",
			key: "1ev6f3"
		}],
		["rect", {
			x: "2",
			y: "3",
			width: "20",
			height: "14",
			rx: "2",
			key: "x3v2xh"
		}],
		["rect", {
			x: "9",
			y: "7",
			width: "6",
			height: "6",
			rx: "1",
			key: "5m2oou"
		}]
	]);
	const MonitorUp = createLucideIcon("monitor-up", [
		["path", {
			d: "m9 10 3-3 3 3",
			key: "11gsxs"
		}],
		["path", {
			d: "M12 13V7",
			key: "h0r20n"
		}],
		["rect", {
			width: "20",
			height: "14",
			x: "2",
			y: "3",
			rx: "2",
			key: "48i651"
		}],
		["path", {
			d: "M12 17v4",
			key: "1riwvh"
		}],
		["path", {
			d: "M8 21h8",
			key: "1ev6f3"
		}]
	]);
	const MonitorX = createLucideIcon("monitor-x", [
		["path", {
			d: "m14.5 12.5-5-5",
			key: "1jahn5"
		}],
		["path", {
			d: "m9.5 12.5 5-5",
			key: "1k2t7b"
		}],
		["rect", {
			width: "20",
			height: "14",
			x: "2",
			y: "3",
			rx: "2",
			key: "48i651"
		}],
		["path", {
			d: "M12 17v4",
			key: "1riwvh"
		}],
		["path", {
			d: "M8 21h8",
			key: "1ev6f3"
		}]
	]);
	const Monitor = createLucideIcon("monitor", [
		["rect", {
			width: "20",
			height: "14",
			x: "2",
			y: "3",
			rx: "2",
			key: "48i651"
		}],
		["line", {
			x1: "8",
			x2: "16",
			y1: "21",
			y2: "21",
			key: "1svkeh"
		}],
		["line", {
			x1: "12",
			x2: "12",
			y1: "17",
			y2: "21",
			key: "vw1qmm"
		}]
	]);
	const MoonStar = createLucideIcon("moon-star", [
		["path", {
			d: "M18 5h4",
			key: "1lhgn2"
		}],
		["path", {
			d: "M20 3v4",
			key: "1olli1"
		}],
		["path", {
			d: "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",
			key: "kfwtm"
		}]
	]);
	const Moon = createLucideIcon("moon", [["path", {
		d: "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",
		key: "kfwtm"
	}]]);
	const Motorbike = createLucideIcon("motorbike", [
		["path", {
			d: "m18 14-1-3",
			key: "bdajw9"
		}],
		["path", {
			d: "m3 9 6 2a2 2 0 0 1 2-2h2a2 2 0 0 1 1.99 1.81",
			key: "f5fotj"
		}],
		["path", {
			d: "M8 17h3a1 1 0 0 0 1-1 6 6 0 0 1 6-6 1 1 0 0 0 1-1v-.75A5 5 0 0 0 17 5",
			key: "3i90e2"
		}],
		["circle", {
			cx: "19",
			cy: "17",
			r: "3",
			key: "1otbdv"
		}],
		["circle", {
			cx: "5",
			cy: "17",
			r: "3",
			key: "1d8p0c"
		}]
	]);
	const MountainSnow = createLucideIcon("mountain-snow", [["path", {
		d: "m8 3 4 8 5-5 5 15H2L8 3z",
		key: "otkl63"
	}], ["path", {
		d: "M4.14 15.08c2.62-1.57 5.24-1.43 7.86.42 2.74 1.94 5.49 2 8.23.19",
		key: "1pvmmp"
	}]]);
	const Mountain = createLucideIcon("mountain", [["path", {
		d: "m8 3 4 8 5-5 5 15H2L8 3z",
		key: "otkl63"
	}]]);
	const MouseOff = createLucideIcon("mouse-off", [
		["path", {
			d: "M12 6v.343",
			key: "1gyhex"
		}],
		["path", {
			d: "M18.218 18.218A7 7 0 0 1 5 15V9a7 7 0 0 1 .782-3.218",
			key: "ukzz01"
		}],
		["path", {
			d: "M19 13.343V9A7 7 0 0 0 8.56 2.902",
			key: "104jy9"
		}],
		["path", {
			d: "M22 22 2 2",
			key: "1r8tn9"
		}]
	]);
	const MousePointer2 = createLucideIcon("mouse-pointer-2", [["path", {
		d: "M4.037 4.688a.495.495 0 0 1 .651-.651l16 6.5a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063z",
		key: "edeuup"
	}]]);
	const MousePointerBan = createLucideIcon("mouse-pointer-ban", [
		["path", {
			d: "M2.034 2.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.944L8.204 7.545a1 1 0 0 0-.66.66l-1.066 3.443a.5.5 0 0 1-.944.033z",
			key: "11pp1i"
		}],
		["circle", {
			cx: "16",
			cy: "16",
			r: "6",
			key: "qoo3c4"
		}],
		["path", {
			d: "m11.8 11.8 8.4 8.4",
			key: "oogvdj"
		}]
	]);
	const MousePointerClick = createLucideIcon("mouse-pointer-click", [
		["path", {
			d: "M14 4.1 12 6",
			key: "ita8i4"
		}],
		["path", {
			d: "m5.1 8-2.9-.8",
			key: "1go3kf"
		}],
		["path", {
			d: "m6 12-1.9 2",
			key: "mnht97"
		}],
		["path", {
			d: "M7.2 2.2 8 5.1",
			key: "1cfko1"
		}],
		["path", {
			d: "M9.037 9.69a.498.498 0 0 1 .653-.653l11 4.5a.5.5 0 0 1-.074.949l-4.349 1.041a1 1 0 0 0-.74.739l-1.04 4.35a.5.5 0 0 1-.95.074z",
			key: "s0h3yz"
		}]
	]);
	const MousePointer = createLucideIcon("mouse-pointer", [["path", {
		d: "M12.586 12.586 19 19",
		key: "ea5xo7"
	}], ["path", {
		d: "M3.688 3.037a.497.497 0 0 0-.651.651l6.5 15.999a.501.501 0 0 0 .947-.062l1.569-6.083a2 2 0 0 1 1.448-1.479l6.124-1.579a.5.5 0 0 0 .063-.947z",
		key: "277e5u"
	}]]);
	const Mouse = createLucideIcon("mouse", [["rect", {
		x: "5",
		y: "2",
		width: "14",
		height: "20",
		rx: "7",
		key: "11ol66"
	}], ["path", {
		d: "M12 6v4",
		key: "16clxf"
	}]]);
	const Move3d = createLucideIcon("move-3d", [
		["path", {
			d: "M5 3v16h16",
			key: "1mqmf9"
		}],
		["path", {
			d: "m5 19 6-6",
			key: "jh6hbb"
		}],
		["path", {
			d: "m2 6 3-3 3 3",
			key: "tkyvxa"
		}],
		["path", {
			d: "m18 16 3 3-3 3",
			key: "1d4glt"
		}]
	]);
	const MoveDiagonal2 = createLucideIcon("move-diagonal-2", [
		["path", {
			d: "M19 13v6h-6",
			key: "1hxl6d"
		}],
		["path", {
			d: "M5 11V5h6",
			key: "12e2xe"
		}],
		["path", {
			d: "m5 5 14 14",
			key: "11anup"
		}]
	]);
	const MoveDiagonal = createLucideIcon("move-diagonal", [
		["path", {
			d: "M11 19H5v-6",
			key: "8awifj"
		}],
		["path", {
			d: "M13 5h6v6",
			key: "7voy1q"
		}],
		["path", {
			d: "M19 5 5 19",
			key: "wwaj1z"
		}]
	]);
	const MoveDownLeft = createLucideIcon("move-down-left", [["path", {
		d: "M11 19H5V13",
		key: "1akmht"
	}], ["path", {
		d: "M19 5L5 19",
		key: "72u4yj"
	}]]);
	const MoveDownRight = createLucideIcon("move-down-right", [["path", {
		d: "M19 13V19H13",
		key: "10vkzq"
	}], ["path", {
		d: "M5 5L19 19",
		key: "5zm2fv"
	}]]);
	const MoveDown = createLucideIcon("move-down", [["path", {
		d: "M8 18L12 22L16 18",
		key: "cskvfv"
	}], ["path", {
		d: "M12 2V22",
		key: "r89rzk"
	}]]);
	const MoveHorizontal = createLucideIcon("move-horizontal", [
		["path", {
			d: "m18 8 4 4-4 4",
			key: "1ak13k"
		}],
		["path", {
			d: "M2 12h20",
			key: "9i4pu4"
		}],
		["path", {
			d: "m6 8-4 4 4 4",
			key: "15zrgr"
		}]
	]);
	const MoveLeft = createLucideIcon("move-left", [["path", {
		d: "M6 8L2 12L6 16",
		key: "kyvwex"
	}], ["path", {
		d: "M2 12H22",
		key: "1m8cig"
	}]]);
	const MoveRight = createLucideIcon("move-right", [["path", {
		d: "M18 8L22 12L18 16",
		key: "1r0oui"
	}], ["path", {
		d: "M2 12H22",
		key: "1m8cig"
	}]]);
	const MoveUpLeft = createLucideIcon("move-up-left", [["path", {
		d: "M5 11V5H11",
		key: "3q78g9"
	}], ["path", {
		d: "M5 5L19 19",
		key: "5zm2fv"
	}]]);
	const MoveUpRight = createLucideIcon("move-up-right", [["path", {
		d: "M13 5H19V11",
		key: "1n1gyv"
	}], ["path", {
		d: "M19 5L5 19",
		key: "72u4yj"
	}]]);
	const MoveUp = createLucideIcon("move-up", [["path", {
		d: "M8 6L12 2L16 6",
		key: "1yvkyx"
	}], ["path", {
		d: "M12 2V22",
		key: "r89rzk"
	}]]);
	const MoveVertical = createLucideIcon("move-vertical", [
		["path", {
			d: "M12 2v20",
			key: "t6zp3m"
		}],
		["path", {
			d: "m8 18 4 4 4-4",
			key: "bh5tu3"
		}],
		["path", {
			d: "m8 6 4-4 4 4",
			key: "ybng9g"
		}]
	]);
	const Move = createLucideIcon("move", [
		["path", {
			d: "M12 2v20",
			key: "t6zp3m"
		}],
		["path", {
			d: "m15 19-3 3-3-3",
			key: "11eu04"
		}],
		["path", {
			d: "m19 9 3 3-3 3",
			key: "1mg7y2"
		}],
		["path", {
			d: "M2 12h20",
			key: "9i4pu4"
		}],
		["path", {
			d: "m5 9-3 3 3 3",
			key: "j64kie"
		}],
		["path", {
			d: "m9 5 3-3 3 3",
			key: "l8vdw6"
		}]
	]);
	const Music2 = createLucideIcon("music-2", [["circle", {
		cx: "8",
		cy: "18",
		r: "4",
		key: "1fc0mg"
	}], ["path", {
		d: "M12 18V2l7 4",
		key: "g04rme"
	}]]);
	const Music3 = createLucideIcon("music-3", [["circle", {
		cx: "12",
		cy: "18",
		r: "4",
		key: "m3r9ws"
	}], ["path", {
		d: "M16 18V2",
		key: "40x2m5"
	}]]);
	const Music4 = createLucideIcon("music-4", [
		["path", {
			d: "M9 18V5l12-2v13",
			key: "1jmyc2"
		}],
		["path", {
			d: "m9 9 12-2",
			key: "1e64n2"
		}],
		["circle", {
			cx: "6",
			cy: "18",
			r: "3",
			key: "fqmcym"
		}],
		["circle", {
			cx: "18",
			cy: "16",
			r: "3",
			key: "1hluhg"
		}]
	]);
	const Music = createLucideIcon("music", [
		["path", {
			d: "M9 18V5l12-2v13",
			key: "1jmyc2"
		}],
		["circle", {
			cx: "6",
			cy: "18",
			r: "3",
			key: "fqmcym"
		}],
		["circle", {
			cx: "18",
			cy: "16",
			r: "3",
			key: "1hluhg"
		}]
	]);
	const Navigation2Off = createLucideIcon("navigation-2-off", [
		["path", {
			d: "M9.31 9.31 5 21l7-4 7 4-1.17-3.17",
			key: "qoq2o2"
		}],
		["path", {
			d: "M14.53 8.88 12 2l-1.17 3.17",
			key: "k3sjzy"
		}],
		["line", {
			x1: "2",
			x2: "22",
			y1: "2",
			y2: "22",
			key: "a6p6uj"
		}]
	]);
	const Navigation2 = createLucideIcon("navigation-2", [["polygon", {
		points: "12 2 19 21 12 17 5 21 12 2",
		key: "x8c0qg"
	}]]);
	const NavigationOff = createLucideIcon("navigation-off", [
		["path", {
			d: "M8.43 8.43 3 11l8 2 2 8 2.57-5.43",
			key: "1vdtb7"
		}],
		["path", {
			d: "M17.39 11.73 22 2l-9.73 4.61",
			key: "tya3r6"
		}],
		["line", {
			x1: "2",
			x2: "22",
			y1: "2",
			y2: "22",
			key: "a6p6uj"
		}]
	]);
	const Navigation = createLucideIcon("navigation", [["polygon", {
		points: "3 11 22 2 13 21 11 13 3 11",
		key: "1ltx0t"
	}]]);
	const Network = createLucideIcon("network", [
		["rect", {
			x: "16",
			y: "16",
			width: "6",
			height: "6",
			rx: "1",
			key: "4q2zg0"
		}],
		["rect", {
			x: "2",
			y: "16",
			width: "6",
			height: "6",
			rx: "1",
			key: "8cvhb9"
		}],
		["rect", {
			x: "9",
			y: "2",
			width: "6",
			height: "6",
			rx: "1",
			key: "1egb70"
		}],
		["path", {
			d: "M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3",
			key: "1jsf9p"
		}],
		["path", {
			d: "M12 12V8",
			key: "2874zd"
		}]
	]);
	const Newspaper = createLucideIcon("newspaper", [
		["path", {
			d: "M15 18h-5",
			key: "95g1m2"
		}],
		["path", {
			d: "M18 14h-8",
			key: "sponae"
		}],
		["path", {
			d: "M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2",
			key: "39pd36"
		}],
		["rect", {
			width: "8",
			height: "4",
			x: "10",
			y: "6",
			rx: "1",
			key: "aywv1n"
		}]
	]);
	const Nfc = createLucideIcon("nfc", [
		["path", {
			d: "M6 8.32a7.43 7.43 0 0 1 0 7.36",
			key: "9iaqei"
		}],
		["path", {
			d: "M9.46 6.21a11.76 11.76 0 0 1 0 11.58",
			key: "1yha7l"
		}],
		["path", {
			d: "M12.91 4.1a15.91 15.91 0 0 1 .01 15.8",
			key: "4iu2gk"
		}],
		["path", {
			d: "M16.37 2a20.16 20.16 0 0 1 0 20",
			key: "sap9u2"
		}]
	]);
	const NonBinary = createLucideIcon("non-binary", [
		["path", {
			d: "M12 2v10",
			key: "mnfbl"
		}],
		["path", {
			d: "m8.5 4 7 4",
			key: "m1xjk3"
		}],
		["path", {
			d: "m8.5 8 7-4",
			key: "t0m5j6"
		}],
		["circle", {
			cx: "12",
			cy: "17",
			r: "5",
			key: "qbz8iq"
		}]
	]);
	const NotebookPen = createLucideIcon("notebook-pen", [
		["path", {
			d: "M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4",
			key: "re6nr2"
		}],
		["path", {
			d: "M2 6h4",
			key: "aawbzj"
		}],
		["path", {
			d: "M2 10h4",
			key: "l0bgd4"
		}],
		["path", {
			d: "M2 14h4",
			key: "1gsvsf"
		}],
		["path", {
			d: "M2 18h4",
			key: "1bu2t1"
		}],
		["path", {
			d: "M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z",
			key: "pqwjuv"
		}]
	]);
	const NotebookTabs = createLucideIcon("notebook-tabs", [
		["path", {
			d: "M2 6h4",
			key: "aawbzj"
		}],
		["path", {
			d: "M2 10h4",
			key: "l0bgd4"
		}],
		["path", {
			d: "M2 14h4",
			key: "1gsvsf"
		}],
		["path", {
			d: "M2 18h4",
			key: "1bu2t1"
		}],
		["rect", {
			width: "16",
			height: "20",
			x: "4",
			y: "2",
			rx: "2",
			key: "1nb95v"
		}],
		["path", {
			d: "M15 2v20",
			key: "dcj49h"
		}],
		["path", {
			d: "M15 7h5",
			key: "1xj5lc"
		}],
		["path", {
			d: "M15 12h5",
			key: "w5shd9"
		}],
		["path", {
			d: "M15 17h5",
			key: "1qaofu"
		}]
	]);
	const NotebookText = createLucideIcon("notebook-text", [
		["path", {
			d: "M2 6h4",
			key: "aawbzj"
		}],
		["path", {
			d: "M2 10h4",
			key: "l0bgd4"
		}],
		["path", {
			d: "M2 14h4",
			key: "1gsvsf"
		}],
		["path", {
			d: "M2 18h4",
			key: "1bu2t1"
		}],
		["rect", {
			width: "16",
			height: "20",
			x: "4",
			y: "2",
			rx: "2",
			key: "1nb95v"
		}],
		["path", {
			d: "M9.5 8h5",
			key: "11mslq"
		}],
		["path", {
			d: "M9.5 12H16",
			key: "ktog6x"
		}],
		["path", {
			d: "M9.5 16H14",
			key: "p1seyn"
		}]
	]);
	const Notebook = createLucideIcon("notebook", [
		["path", {
			d: "M2 6h4",
			key: "aawbzj"
		}],
		["path", {
			d: "M2 10h4",
			key: "l0bgd4"
		}],
		["path", {
			d: "M2 14h4",
			key: "1gsvsf"
		}],
		["path", {
			d: "M2 18h4",
			key: "1bu2t1"
		}],
		["rect", {
			width: "16",
			height: "20",
			x: "4",
			y: "2",
			rx: "2",
			key: "1nb95v"
		}],
		["path", {
			d: "M16 2v20",
			key: "rotuqe"
		}]
	]);
	const NotepadText = createLucideIcon("notepad-text", [
		["path", {
			d: "M8 2v4",
			key: "1cmpym"
		}],
		["path", {
			d: "M12 2v4",
			key: "3427ic"
		}],
		["path", {
			d: "M16 2v4",
			key: "4m81vk"
		}],
		["rect", {
			width: "16",
			height: "18",
			x: "4",
			y: "4",
			rx: "2",
			key: "1u9h20"
		}],
		["path", {
			d: "M8 10h6",
			key: "3oa6kw"
		}],
		["path", {
			d: "M8 14h8",
			key: "1fgep2"
		}],
		["path", {
			d: "M8 18h5",
			key: "17enja"
		}]
	]);
	const NutOff = createLucideIcon("nut-off", [
		["path", {
			d: "M12 4V2",
			key: "1k5q1u"
		}],
		["path", {
			d: "M5 10v4a7.004 7.004 0 0 0 5.277 6.787c.412.104.802.292 1.102.592L12 22l.621-.621c.3-.3.69-.488 1.102-.592a7.01 7.01 0 0 0 4.125-2.939",
			key: "1xcvy9"
		}],
		["path", {
			d: "M19 10v3.343",
			key: "163tfc"
		}],
		["path", {
			d: "M12 12c-1.349-.573-1.905-1.005-2.5-2-.546.902-1.048 1.353-2.5 2-1.018-.644-1.46-1.08-2-2-1.028.71-1.69.918-3 1 1.081-1.048 1.757-2.03 2-3 .194-.776.84-1.551 1.79-2.21m11.654 5.997c.887-.457 1.28-.891 1.556-1.787 1.032.916 1.683 1.157 3 1-1.297-1.036-1.758-2.03-2-3-.5-2-4-4-8-4-.74 0-1.461.068-2.15.192",
			key: "17914v"
		}],
		["line", {
			x1: "2",
			x2: "22",
			y1: "2",
			y2: "22",
			key: "a6p6uj"
		}]
	]);
	const NotepadTextDashed = createLucideIcon("notepad-text-dashed", [
		["path", {
			d: "M8 2v4",
			key: "1cmpym"
		}],
		["path", {
			d: "M12 2v4",
			key: "3427ic"
		}],
		["path", {
			d: "M16 2v4",
			key: "4m81vk"
		}],
		["path", {
			d: "M16 4h2a2 2 0 0 1 2 2v2",
			key: "j91f56"
		}],
		["path", {
			d: "M20 12v2",
			key: "w8o0tu"
		}],
		["path", {
			d: "M20 18v2a2 2 0 0 1-2 2h-1",
			key: "1c9ggx"
		}],
		["path", {
			d: "M13 22h-2",
			key: "191ugt"
		}],
		["path", {
			d: "M7 22H6a2 2 0 0 1-2-2v-2",
			key: "1rt9px"
		}],
		["path", {
			d: "M4 14v-2",
			key: "1v0sqh"
		}],
		["path", {
			d: "M4 8V6a2 2 0 0 1 2-2h2",
			key: "1mwabg"
		}],
		["path", {
			d: "M8 10h6",
			key: "3oa6kw"
		}],
		["path", {
			d: "M8 14h8",
			key: "1fgep2"
		}],
		["path", {
			d: "M8 18h5",
			key: "17enja"
		}]
	]);
	const Nut = createLucideIcon("nut", [
		["path", {
			d: "M12 4V2",
			key: "1k5q1u"
		}],
		["path", {
			d: "M5 10v4a7.004 7.004 0 0 0 5.277 6.787c.412.104.802.292 1.102.592L12 22l.621-.621c.3-.3.69-.488 1.102-.592A7.003 7.003 0 0 0 19 14v-4",
			key: "1tgyif"
		}],
		["path", {
			d: "M12 4C8 4 4.5 6 4 8c-.243.97-.919 1.952-2 3 1.31-.082 1.972-.29 3-1 .54.92.982 1.356 2 2 1.452-.647 1.954-1.098 2.5-2 .595.995 1.151 1.427 2.5 2 1.31-.621 1.862-1.058 2.5-2 .629.977 1.162 1.423 2.5 2 1.209-.548 1.68-.967 2-2 1.032.916 1.683 1.157 3 1-1.297-1.036-1.758-2.03-2-3-.5-2-4-4-8-4Z",
			key: "tnsqj"
		}]
	]);
	const OctagonAlert = createLucideIcon("octagon-alert", [
		["path", {
			d: "M12 16h.01",
			key: "1drbdi"
		}],
		["path", {
			d: "M12 8v4",
			key: "1got3b"
		}],
		["path", {
			d: "M15.312 2a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586l-4.688-4.688A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2z",
			key: "1fd625"
		}]
	]);
	const OctagonMinus = createLucideIcon("octagon-minus", [["path", {
		d: "M2.586 16.726A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2h6.624a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586z",
		key: "2d38gg"
	}], ["path", {
		d: "M8 12h8",
		key: "1wcyev"
	}]]);
	const OctagonPause = createLucideIcon("octagon-pause", [
		["path", {
			d: "M10 15V9",
			key: "1lckn7"
		}],
		["path", {
			d: "M14 15V9",
			key: "1muqhk"
		}],
		["path", {
			d: "M2.586 16.726A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2h6.624a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586z",
			key: "2d38gg"
		}]
	]);
	const OctagonX = createLucideIcon("octagon-x", [
		["path", {
			d: "m15 9-6 6",
			key: "1uzhvr"
		}],
		["path", {
			d: "M2.586 16.726A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2h6.624a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586z",
			key: "2d38gg"
		}],
		["path", {
			d: "m9 9 6 6",
			key: "z0biqf"
		}]
	]);
	const Octagon = createLucideIcon("octagon", [["path", {
		d: "M2.586 16.726A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2h6.624a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586z",
		key: "2d38gg"
	}]]);
	const Omega = createLucideIcon("omega", [["path", {
		d: "M3 20h4.5a.5.5 0 0 0 .5-.5v-.282a.52.52 0 0 0-.247-.437 8 8 0 1 1 8.494-.001.52.52 0 0 0-.247.438v.282a.5.5 0 0 0 .5.5H21",
		key: "1x94xo"
	}]]);
	const Option = createLucideIcon("option", [["path", {
		d: "M3 3h6l6 18h6",
		key: "ph9rgk"
	}], ["path", {
		d: "M14 3h7",
		key: "16f0ms"
	}]]);
	const Orbit = createLucideIcon("orbit", [
		["path", {
			d: "M20.341 6.484A10 10 0 0 1 10.266 21.85",
			key: "1enhxb"
		}],
		["path", {
			d: "M3.659 17.516A10 10 0 0 1 13.74 2.152",
			key: "1crzgf"
		}],
		["circle", {
			cx: "12",
			cy: "12",
			r: "3",
			key: "1v7zrd"
		}],
		["circle", {
			cx: "19",
			cy: "5",
			r: "2",
			key: "mhkx31"
		}],
		["circle", {
			cx: "5",
			cy: "19",
			r: "2",
			key: "v8kfzx"
		}]
	]);
	const Origami = createLucideIcon("origami", [
		["path", {
			d: "M12 12V4a1 1 0 0 1 1-1h6.297a1 1 0 0 1 .651 1.759l-4.696 4.025",
			key: "1bx4vc"
		}],
		["path", {
			d: "m12 21-7.414-7.414A2 2 0 0 1 4 12.172V6.415a1.002 1.002 0 0 1 1.707-.707L20 20.009",
			key: "1h3km6"
		}],
		["path", {
			d: "m12.214 3.381 8.414 14.966a1 1 0 0 1-.167 1.199l-1.168 1.163a1 1 0 0 1-.706.291H6.351a1 1 0 0 1-.625-.219L3.25 18.8a1 1 0 0 1 .631-1.781l4.165.027",
			key: "1hj4wg"
		}]
	]);
	const Package2 = createLucideIcon("package-2", [
		["path", {
			d: "M12 3v6",
			key: "1holv5"
		}],
		["path", {
			d: "M16.76 3a2 2 0 0 1 1.8 1.1l2.23 4.479a2 2 0 0 1 .21.891V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9.472a2 2 0 0 1 .211-.894L5.45 4.1A2 2 0 0 1 7.24 3z",
			key: "187q7i"
		}],
		["path", {
			d: "M3.054 9.013h17.893",
			key: "grwhos"
		}]
	]);
	const PackageCheck = createLucideIcon("package-check", [
		["path", {
			d: "m16 16 2 2 4-4",
			key: "gfu2re"
		}],
		["path", {
			d: "M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14",
			key: "e7tb2h"
		}],
		["path", {
			d: "m7.5 4.27 9 5.15",
			key: "1c824w"
		}],
		["polyline", {
			points: "3.29 7 12 12 20.71 7",
			key: "ousv84"
		}],
		["line", {
			x1: "12",
			x2: "12",
			y1: "22",
			y2: "12",
			key: "a4e8g8"
		}]
	]);
	const PackageMinus = createLucideIcon("package-minus", [
		["path", {
			d: "M16 16h6",
			key: "100bgy"
		}],
		["path", {
			d: "M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14",
			key: "e7tb2h"
		}],
		["path", {
			d: "m7.5 4.27 9 5.15",
			key: "1c824w"
		}],
		["polyline", {
			points: "3.29 7 12 12 20.71 7",
			key: "ousv84"
		}],
		["line", {
			x1: "12",
			x2: "12",
			y1: "22",
			y2: "12",
			key: "a4e8g8"
		}]
	]);
	const PackageOpen = createLucideIcon("package-open", [
		["path", {
			d: "M12 22v-9",
			key: "x3hkom"
		}],
		["path", {
			d: "M15.17 2.21a1.67 1.67 0 0 1 1.63 0L21 4.57a1.93 1.93 0 0 1 0 3.36L8.82 14.79a1.655 1.655 0 0 1-1.64 0L3 12.43a1.93 1.93 0 0 1 0-3.36z",
			key: "2ntwy6"
		}],
		["path", {
			d: "M20 13v3.87a2.06 2.06 0 0 1-1.11 1.83l-6 3.08a1.93 1.93 0 0 1-1.78 0l-6-3.08A2.06 2.06 0 0 1 4 16.87V13",
			key: "1pmm1c"
		}],
		["path", {
			d: "M21 12.43a1.93 1.93 0 0 0 0-3.36L8.83 2.2a1.64 1.64 0 0 0-1.63 0L3 4.57a1.93 1.93 0 0 0 0 3.36l12.18 6.86a1.636 1.636 0 0 0 1.63 0z",
			key: "12ttoo"
		}]
	]);
	const PackageSearch = createLucideIcon("package-search", [
		["path", {
			d: "M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14",
			key: "e7tb2h"
		}],
		["path", {
			d: "m7.5 4.27 9 5.15",
			key: "1c824w"
		}],
		["polyline", {
			points: "3.29 7 12 12 20.71 7",
			key: "ousv84"
		}],
		["line", {
			x1: "12",
			x2: "12",
			y1: "22",
			y2: "12",
			key: "a4e8g8"
		}],
		["circle", {
			cx: "18.5",
			cy: "15.5",
			r: "2.5",
			key: "b5zd12"
		}],
		["path", {
			d: "M20.27 17.27 22 19",
			key: "1l4muz"
		}]
	]);
	const PackagePlus = createLucideIcon("package-plus", [
		["path", {
			d: "M16 16h6",
			key: "100bgy"
		}],
		["path", {
			d: "M19 13v6",
			key: "85cyf1"
		}],
		["path", {
			d: "M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14",
			key: "e7tb2h"
		}],
		["path", {
			d: "m7.5 4.27 9 5.15",
			key: "1c824w"
		}],
		["polyline", {
			points: "3.29 7 12 12 20.71 7",
			key: "ousv84"
		}],
		["line", {
			x1: "12",
			x2: "12",
			y1: "22",
			y2: "12",
			key: "a4e8g8"
		}]
	]);
	const PackageX = createLucideIcon("package-x", [
		["path", {
			d: "M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14",
			key: "e7tb2h"
		}],
		["path", {
			d: "m7.5 4.27 9 5.15",
			key: "1c824w"
		}],
		["polyline", {
			points: "3.29 7 12 12 20.71 7",
			key: "ousv84"
		}],
		["line", {
			x1: "12",
			x2: "12",
			y1: "22",
			y2: "12",
			key: "a4e8g8"
		}],
		["path", {
			d: "m17 13 5 5m-5 0 5-5",
			key: "im3w4b"
		}]
	]);
	const Package = createLucideIcon("package", [
		["path", {
			d: "M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z",
			key: "1a0edw"
		}],
		["path", {
			d: "M12 22V12",
			key: "d0xqtd"
		}],
		["polyline", {
			points: "3.29 7 12 12 20.71 7",
			key: "ousv84"
		}],
		["path", {
			d: "m7.5 4.27 9 5.15",
			key: "1c824w"
		}]
	]);
	const PaintBucket = createLucideIcon("paint-bucket", [
		["path", {
			d: "m19 11-8-8-8.6 8.6a2 2 0 0 0 0 2.8l5.2 5.2c.8.8 2 .8 2.8 0L19 11Z",
			key: "irua1i"
		}],
		["path", {
			d: "m5 2 5 5",
			key: "1lls2c"
		}],
		["path", {
			d: "M2 13h15",
			key: "1hkzvu"
		}],
		["path", {
			d: "M22 20a2 2 0 1 1-4 0c0-1.6 1.7-2.4 2-4 .3 1.6 2 2.4 2 4Z",
			key: "xk76lq"
		}]
	]);
	const PaintRoller = createLucideIcon("paint-roller", [
		["rect", {
			width: "16",
			height: "6",
			x: "2",
			y: "2",
			rx: "2",
			key: "jcyz7m"
		}],
		["path", {
			d: "M10 16v-2a2 2 0 0 1 2-2h8a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2",
			key: "1b9h7c"
		}],
		["rect", {
			width: "4",
			height: "6",
			x: "8",
			y: "16",
			rx: "1",
			key: "d6e7yl"
		}]
	]);
	const Paintbrush = createLucideIcon("paintbrush", [
		["path", {
			d: "m14.622 17.897-10.68-2.913",
			key: "vj2p1u"
		}],
		["path", {
			d: "M18.376 2.622a1 1 0 1 1 3.002 3.002L17.36 9.643a.5.5 0 0 0 0 .707l.944.944a2.41 2.41 0 0 1 0 3.408l-.944.944a.5.5 0 0 1-.707 0L8.354 7.348a.5.5 0 0 1 0-.707l.944-.944a2.41 2.41 0 0 1 3.408 0l.944.944a.5.5 0 0 0 .707 0z",
			key: "18tc5c"
		}],
		["path", {
			d: "M9 8c-1.804 2.71-3.97 3.46-6.583 3.948a.507.507 0 0 0-.302.819l7.32 8.883a1 1 0 0 0 1.185.204C12.735 20.405 16 16.792 16 15",
			key: "ytzfxy"
		}]
	]);
	const PaintbrushVertical = createLucideIcon("paintbrush-vertical", [
		["path", {
			d: "M10 2v2",
			key: "7u0qdc"
		}],
		["path", {
			d: "M14 2v4",
			key: "qmzblu"
		}],
		["path", {
			d: "M17 2a1 1 0 0 1 1 1v9H6V3a1 1 0 0 1 1-1z",
			key: "ycvu00"
		}],
		["path", {
			d: "M6 12a1 1 0 0 0-1 1v1a2 2 0 0 0 2 2h2a1 1 0 0 1 1 1v2.9a2 2 0 1 0 4 0V17a1 1 0 0 1 1-1h2a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1",
			key: "iw4wnp"
		}]
	]);
	const Palette = createLucideIcon("palette", [
		["path", {
			d: "M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z",
			key: "e79jfc"
		}],
		["circle", {
			cx: "13.5",
			cy: "6.5",
			r: ".5",
			fill: "currentColor",
			key: "1okk4w"
		}],
		["circle", {
			cx: "17.5",
			cy: "10.5",
			r: ".5",
			fill: "currentColor",
			key: "f64h9f"
		}],
		["circle", {
			cx: "6.5",
			cy: "12.5",
			r: ".5",
			fill: "currentColor",
			key: "qy21gx"
		}],
		["circle", {
			cx: "8.5",
			cy: "7.5",
			r: ".5",
			fill: "currentColor",
			key: "fotxhn"
		}]
	]);
	const Panda = createLucideIcon("panda", [
		["path", {
			d: "M11.25 17.25h1.5L12 18z",
			key: "1wmwwj"
		}],
		["path", {
			d: "m15 12 2 2",
			key: "k60wz4"
		}],
		["path", {
			d: "M18 6.5a.5.5 0 0 0-.5-.5",
			key: "1ch4h4"
		}],
		["path", {
			d: "M20.69 9.67a4.5 4.5 0 1 0-7.04-5.5 8.35 8.35 0 0 0-3.3 0 4.5 4.5 0 1 0-7.04 5.5C2.49 11.2 2 12.88 2 14.5 2 19.47 6.48 22 12 22s10-2.53 10-7.5c0-1.62-.48-3.3-1.3-4.83",
			key: "1c660l"
		}],
		["path", {
			d: "M6 6.5a.495.495 0 0 1 .5-.5",
			key: "eviuep"
		}],
		["path", {
			d: "m9 12-2 2",
			key: "326nkw"
		}]
	]);
	const PanelBottomClose = createLucideIcon("panel-bottom-close", [
		["rect", {
			width: "18",
			height: "18",
			x: "3",
			y: "3",
			rx: "2",
			key: "afitv7"
		}],
		["path", {
			d: "M3 15h18",
			key: "5xshup"
		}],
		["path", {
			d: "m15 8-3 3-3-3",
			key: "1oxy1z"
		}]
	]);
	const PanelBottomDashed = createLucideIcon("panel-bottom-dashed", [
		["rect", {
			width: "18",
			height: "18",
			x: "3",
			y: "3",
			rx: "2",
			key: "afitv7"
		}],
		["path", {
			d: "M14 15h1",
			key: "171nev"
		}],
		["path", {
			d: "M19 15h2",
			key: "1vnucp"
		}],
		["path", {
			d: "M3 15h2",
			key: "8bym0q"
		}],
		["path", {
			d: "M9 15h1",
			key: "1tg3ks"
		}]
	]);
	const PanelBottomOpen = createLucideIcon("panel-bottom-open", [
		["rect", {
			width: "18",
			height: "18",
			x: "3",
			y: "3",
			rx: "2",
			key: "afitv7"
		}],
		["path", {
			d: "M3 15h18",
			key: "5xshup"
		}],
		["path", {
			d: "m9 10 3-3 3 3",
			key: "11gsxs"
		}]
	]);
	const PanelBottom = createLucideIcon("panel-bottom", [["rect", {
		width: "18",
		height: "18",
		x: "3",
		y: "3",
		rx: "2",
		key: "afitv7"
	}], ["path", {
		d: "M3 15h18",
		key: "5xshup"
	}]]);
	const PanelLeftClose = createLucideIcon("panel-left-close", [
		["rect", {
			width: "18",
			height: "18",
			x: "3",
			y: "3",
			rx: "2",
			key: "afitv7"
		}],
		["path", {
			d: "M9 3v18",
			key: "fh3hqa"
		}],
		["path", {
			d: "m16 15-3-3 3-3",
			key: "14y99z"
		}]
	]);
	const PanelLeftDashed = createLucideIcon("panel-left-dashed", [
		["rect", {
			width: "18",
			height: "18",
			x: "3",
			y: "3",
			rx: "2",
			key: "afitv7"
		}],
		["path", {
			d: "M9 14v1",
			key: "askpd8"
		}],
		["path", {
			d: "M9 19v2",
			key: "16tejx"
		}],
		["path", {
			d: "M9 3v2",
			key: "1noubl"
		}],
		["path", {
			d: "M9 9v1",
			key: "19ebxg"
		}]
	]);
	const PanelLeftOpen = createLucideIcon("panel-left-open", [
		["rect", {
			width: "18",
			height: "18",
			x: "3",
			y: "3",
			rx: "2",
			key: "afitv7"
		}],
		["path", {
			d: "M9 3v18",
			key: "fh3hqa"
		}],
		["path", {
			d: "m14 9 3 3-3 3",
			key: "8010ee"
		}]
	]);
	const PanelLeftRightDashed = createLucideIcon("panel-left-right-dashed", [
		["path", {
			d: "M15 10V9",
			key: "4dkmfx"
		}],
		["path", {
			d: "M15 15v-1",
			key: "6a4afx"
		}],
		["path", {
			d: "M15 21v-2",
			key: "1qshmc"
		}],
		["path", {
			d: "M15 5V3",
			key: "1fk0mb"
		}],
		["path", {
			d: "M9 10V9",
			key: "1lazqi"
		}],
		["path", {
			d: "M9 15v-1",
			key: "9lx740"
		}],
		["path", {
			d: "M9 21v-2",
			key: "1fwk0n"
		}],
		["path", {
			d: "M9 5V3",
			key: "2q8zi6"
		}],
		["rect", {
			x: "3",
			y: "3",
			width: "18",
			height: "18",
			rx: "2",
			key: "h1oib"
		}]
	]);
	const PanelLeft = createLucideIcon("panel-left", [["rect", {
		width: "18",
		height: "18",
		x: "3",
		y: "3",
		rx: "2",
		key: "afitv7"
	}], ["path", {
		d: "M9 3v18",
		key: "fh3hqa"
	}]]);
	const PanelRightClose = createLucideIcon("panel-right-close", [
		["rect", {
			width: "18",
			height: "18",
			x: "3",
			y: "3",
			rx: "2",
			key: "afitv7"
		}],
		["path", {
			d: "M15 3v18",
			key: "14nvp0"
		}],
		["path", {
			d: "m8 9 3 3-3 3",
			key: "12hl5m"
		}]
	]);
	const PanelRightDashed = createLucideIcon("panel-right-dashed", [
		["rect", {
			width: "18",
			height: "18",
			x: "3",
			y: "3",
			rx: "2",
			key: "afitv7"
		}],
		["path", {
			d: "M15 14v1",
			key: "ilsfch"
		}],
		["path", {
			d: "M15 19v2",
			key: "1fst2f"
		}],
		["path", {
			d: "M15 3v2",
			key: "z204g4"
		}],
		["path", {
			d: "M15 9v1",
			key: "z2a8b1"
		}]
	]);
	const PanelRightOpen = createLucideIcon("panel-right-open", [
		["rect", {
			width: "18",
			height: "18",
			x: "3",
			y: "3",
			rx: "2",
			key: "afitv7"
		}],
		["path", {
			d: "M15 3v18",
			key: "14nvp0"
		}],
		["path", {
			d: "m10 15-3-3 3-3",
			key: "1pgupc"
		}]
	]);
	const PanelRight = createLucideIcon("panel-right", [["rect", {
		width: "18",
		height: "18",
		x: "3",
		y: "3",
		rx: "2",
		key: "afitv7"
	}], ["path", {
		d: "M15 3v18",
		key: "14nvp0"
	}]]);
	const PanelTopBottomDashed = createLucideIcon("panel-top-bottom-dashed", [
		["path", {
			d: "M14 15h1",
			key: "171nev"
		}],
		["path", {
			d: "M14 9h1",
			key: "l0svgy"
		}],
		["path", {
			d: "M19 15h2",
			key: "1vnucp"
		}],
		["path", {
			d: "M19 9h2",
			key: "te2zfg"
		}],
		["path", {
			d: "M3 15h2",
			key: "8bym0q"
		}],
		["path", {
			d: "M3 9h2",
			key: "1h4ldw"
		}],
		["path", {
			d: "M9 15h1",
			key: "1tg3ks"
		}],
		["path", {
			d: "M9 9h1",
			key: "15jzuz"
		}],
		["rect", {
			x: "3",
			y: "3",
			width: "18",
			height: "18",
			rx: "2",
			key: "h1oib"
		}]
	]);
	const PanelTopClose = createLucideIcon("panel-top-close", [
		["rect", {
			width: "18",
			height: "18",
			x: "3",
			y: "3",
			rx: "2",
			key: "afitv7"
		}],
		["path", {
			d: "M3 9h18",
			key: "1pudct"
		}],
		["path", {
			d: "m9 16 3-3 3 3",
			key: "1idcnm"
		}]
	]);
	const PanelTopDashed = createLucideIcon("panel-top-dashed", [
		["rect", {
			width: "18",
			height: "18",
			x: "3",
			y: "3",
			rx: "2",
			key: "afitv7"
		}],
		["path", {
			d: "M14 9h1",
			key: "l0svgy"
		}],
		["path", {
			d: "M19 9h2",
			key: "te2zfg"
		}],
		["path", {
			d: "M3 9h2",
			key: "1h4ldw"
		}],
		["path", {
			d: "M9 9h1",
			key: "15jzuz"
		}]
	]);
	const PanelTopOpen = createLucideIcon("panel-top-open", [
		["rect", {
			width: "18",
			height: "18",
			x: "3",
			y: "3",
			rx: "2",
			key: "afitv7"
		}],
		["path", {
			d: "M3 9h18",
			key: "1pudct"
		}],
		["path", {
			d: "m15 14-3 3-3-3",
			key: "g215vf"
		}]
	]);
	const PanelTop = createLucideIcon("panel-top", [["rect", {
		width: "18",
		height: "18",
		x: "3",
		y: "3",
		rx: "2",
		key: "afitv7"
	}], ["path", {
		d: "M3 9h18",
		key: "1pudct"
	}]]);
	const PanelsLeftBottom = createLucideIcon("panels-left-bottom", [
		["rect", {
			width: "18",
			height: "18",
			x: "3",
			y: "3",
			rx: "2",
			key: "afitv7"
		}],
		["path", {
			d: "M9 3v18",
			key: "fh3hqa"
		}],
		["path", {
			d: "M9 15h12",
			key: "5ijen5"
		}]
	]);
	const PanelsRightBottom = createLucideIcon("panels-right-bottom", [
		["rect", {
			width: "18",
			height: "18",
			x: "3",
			y: "3",
			rx: "2",
			key: "afitv7"
		}],
		["path", {
			d: "M3 15h12",
			key: "1wkqb3"
		}],
		["path", {
			d: "M15 3v18",
			key: "14nvp0"
		}]
	]);
	const PanelsTopLeft = createLucideIcon("panels-top-left", [
		["rect", {
			width: "18",
			height: "18",
			x: "3",
			y: "3",
			rx: "2",
			key: "afitv7"
		}],
		["path", {
			d: "M3 9h18",
			key: "1pudct"
		}],
		["path", {
			d: "M9 21V9",
			key: "1oto5p"
		}]
	]);
	const Paperclip = createLucideIcon("paperclip", [["path", {
		d: "m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551",
		key: "1miecu"
	}]]);
	const Parentheses = createLucideIcon("parentheses", [["path", {
		d: "M8 21s-4-3-4-9 4-9 4-9",
		key: "uto9ud"
	}], ["path", {
		d: "M16 3s4 3 4 9-4 9-4 9",
		key: "4w2vsq"
	}]]);
	const PartyPopper = createLucideIcon("party-popper", [
		["path", {
			d: "M5.8 11.3 2 22l10.7-3.79",
			key: "gwxi1d"
		}],
		["path", {
			d: "M4 3h.01",
			key: "1vcuye"
		}],
		["path", {
			d: "M22 8h.01",
			key: "1mrtc2"
		}],
		["path", {
			d: "M15 2h.01",
			key: "1cjtqr"
		}],
		["path", {
			d: "M22 20h.01",
			key: "1mrys2"
		}],
		["path", {
			d: "m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10",
			key: "hbicv8"
		}],
		["path", {
			d: "m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11c-.11.7-.72 1.22-1.43 1.22H17",
			key: "1i94pl"
		}],
		["path", {
			d: "m11 2 .33.82c.34.86-.2 1.82-1.11 1.98C9.52 4.9 9 5.52 9 6.23V7",
			key: "1cofks"
		}],
		["path", {
			d: "M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z",
			key: "4kbmks"
		}]
	]);
	const ParkingMeter = createLucideIcon("parking-meter", [
		["path", {
			d: "M11 15h2",
			key: "199qp6"
		}],
		["path", {
			d: "M12 12v3",
			key: "158kv8"
		}],
		["path", {
			d: "M12 19v3",
			key: "npa21l"
		}],
		["path", {
			d: "M15.282 19a1 1 0 0 0 .948-.68l2.37-6.988a7 7 0 1 0-13.2 0l2.37 6.988a1 1 0 0 0 .948.68z",
			key: "1jofit"
		}],
		["path", {
			d: "M9 9a3 3 0 1 1 6 0",
			key: "jdoeu8"
		}]
	]);
	const Pause = createLucideIcon("pause", [["rect", {
		x: "14",
		y: "3",
		width: "5",
		height: "18",
		rx: "1",
		key: "kaeet6"
	}], ["rect", {
		x: "5",
		y: "3",
		width: "5",
		height: "18",
		rx: "1",
		key: "1wsw3u"
	}]]);
	const PawPrint = createLucideIcon("paw-print", [
		["circle", {
			cx: "11",
			cy: "4",
			r: "2",
			key: "vol9p0"
		}],
		["circle", {
			cx: "18",
			cy: "8",
			r: "2",
			key: "17gozi"
		}],
		["circle", {
			cx: "20",
			cy: "16",
			r: "2",
			key: "1v9bxh"
		}],
		["path", {
			d: "M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z",
			key: "1ydw1z"
		}]
	]);
	const PcCase = createLucideIcon("pc-case", [
		["rect", {
			width: "14",
			height: "20",
			x: "5",
			y: "2",
			rx: "2",
			key: "1uq1d7"
		}],
		["path", {
			d: "M15 14h.01",
			key: "1kp3bh"
		}],
		["path", {
			d: "M9 6h6",
			key: "dgm16u"
		}],
		["path", {
			d: "M9 10h6",
			key: "9gxzsh"
		}]
	]);
	const PenLine = createLucideIcon("pen-line", [["path", {
		d: "M13 21h8",
		key: "1jsn5i"
	}], ["path", {
		d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
		key: "1a8usu"
	}]]);
	const PenOff = createLucideIcon("pen-off", [
		["path", {
			d: "m10 10-6.157 6.162a2 2 0 0 0-.5.833l-1.322 4.36a.5.5 0 0 0 .622.624l4.358-1.323a2 2 0 0 0 .83-.5L14 13.982",
			key: "bjo8r8"
		}],
		["path", {
			d: "m12.829 7.172 4.359-4.346a1 1 0 1 1 3.986 3.986l-4.353 4.353",
			key: "16h5ne"
		}],
		["path", {
			d: "m2 2 20 20",
			key: "1ooewy"
		}]
	]);
	const Pen = createLucideIcon("pen", [["path", {
		d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
		key: "1a8usu"
	}]]);
	const PenTool = createLucideIcon("pen-tool", [
		["path", {
			d: "M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z",
			key: "nt11vn"
		}],
		["path", {
			d: "m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18",
			key: "15qc1e"
		}],
		["path", {
			d: "m2.3 2.3 7.286 7.286",
			key: "1wuzzi"
		}],
		["circle", {
			cx: "11",
			cy: "11",
			r: "2",
			key: "xmgehs"
		}]
	]);
	const PencilLine = createLucideIcon("pencil-line", [
		["path", {
			d: "M13 21h8",
			key: "1jsn5i"
		}],
		["path", {
			d: "m15 5 4 4",
			key: "1mk7zo"
		}],
		["path", {
			d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
			key: "1a8usu"
		}]
	]);
	const PencilOff = createLucideIcon("pencil-off", [
		["path", {
			d: "m10 10-6.157 6.162a2 2 0 0 0-.5.833l-1.322 4.36a.5.5 0 0 0 .622.624l4.358-1.323a2 2 0 0 0 .83-.5L14 13.982",
			key: "bjo8r8"
		}],
		["path", {
			d: "m12.829 7.172 4.359-4.346a1 1 0 1 1 3.986 3.986l-4.353 4.353",
			key: "16h5ne"
		}],
		["path", {
			d: "m15 5 4 4",
			key: "1mk7zo"
		}],
		["path", {
			d: "m2 2 20 20",
			key: "1ooewy"
		}]
	]);
	const PencilRuler = createLucideIcon("pencil-ruler", [
		["path", {
			d: "M13 7 8.7 2.7a2.41 2.41 0 0 0-3.4 0L2.7 5.3a2.41 2.41 0 0 0 0 3.4L7 13",
			key: "orapub"
		}],
		["path", {
			d: "m8 6 2-2",
			key: "115y1s"
		}],
		["path", {
			d: "m18 16 2-2",
			key: "ee94s4"
		}],
		["path", {
			d: "m17 11 4.3 4.3c.94.94.94 2.46 0 3.4l-2.6 2.6c-.94.94-2.46.94-3.4 0L11 17",
			key: "cfq27r"
		}],
		["path", {
			d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
			key: "1a8usu"
		}],
		["path", {
			d: "m15 5 4 4",
			key: "1mk7zo"
		}]
	]);
	const Pencil = createLucideIcon("pencil", [["path", {
		d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
		key: "1a8usu"
	}], ["path", {
		d: "m15 5 4 4",
		key: "1mk7zo"
	}]]);
	const Pentagon = createLucideIcon("pentagon", [["path", {
		d: "M10.83 2.38a2 2 0 0 1 2.34 0l8 5.74a2 2 0 0 1 .73 2.25l-3.04 9.26a2 2 0 0 1-1.9 1.37H7.04a2 2 0 0 1-1.9-1.37L2.1 10.37a2 2 0 0 1 .73-2.25z",
		key: "2hea0t"
	}]]);
	const Percent = createLucideIcon("percent", [
		["line", {
			x1: "19",
			x2: "5",
			y1: "5",
			y2: "19",
			key: "1x9vlm"
		}],
		["circle", {
			cx: "6.5",
			cy: "6.5",
			r: "2.5",
			key: "4mh3h7"
		}],
		["circle", {
			cx: "17.5",
			cy: "17.5",
			r: "2.5",
			key: "1mdrzq"
		}]
	]);
	const PersonStanding = createLucideIcon("person-standing", [
		["circle", {
			cx: "12",
			cy: "5",
			r: "1",
			key: "gxeob9"
		}],
		["path", {
			d: "m9 20 3-6 3 6",
			key: "se2kox"
		}],
		["path", {
			d: "m6 8 6 2 6-2",
			key: "4o3us4"
		}],
		["path", {
			d: "M12 10v4",
			key: "1kjpxc"
		}]
	]);
	const PhilippinePeso = createLucideIcon("philippine-peso", [
		["path", {
			d: "M20 11H4",
			key: "6ut86h"
		}],
		["path", {
			d: "M20 7H4",
			key: "zbl0bi"
		}],
		["path", {
			d: "M7 21V4a1 1 0 0 1 1-1h4a1 1 0 0 1 0 12H7",
			key: "1ana5r"
		}]
	]);
	const PhoneCall = createLucideIcon("phone-call", [
		["path", {
			d: "M13 2a9 9 0 0 1 9 9",
			key: "1itnx2"
		}],
		["path", {
			d: "M13 6a5 5 0 0 1 5 5",
			key: "11nki7"
		}],
		["path", {
			d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
			key: "9njp5v"
		}]
	]);
	const PhoneIncoming = createLucideIcon("phone-incoming", [
		["path", {
			d: "M16 2v6h6",
			key: "1mfrl5"
		}],
		["path", {
			d: "m22 2-6 6",
			key: "6f0sa0"
		}],
		["path", {
			d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
			key: "9njp5v"
		}]
	]);
	const PhoneForwarded = createLucideIcon("phone-forwarded", [
		["path", {
			d: "M14 6h8",
			key: "yd68k4"
		}],
		["path", {
			d: "m18 2 4 4-4 4",
			key: "pucp1d"
		}],
		["path", {
			d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
			key: "9njp5v"
		}]
	]);
	const PhoneMissed = createLucideIcon("phone-missed", [
		["path", {
			d: "m16 2 6 6",
			key: "1gw87d"
		}],
		["path", {
			d: "m22 2-6 6",
			key: "6f0sa0"
		}],
		["path", {
			d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
			key: "9njp5v"
		}]
	]);
	const PhoneOff = createLucideIcon("phone-off", [
		["path", {
			d: "M10.1 13.9a14 14 0 0 0 3.732 2.668 1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2 18 18 0 0 1-12.728-5.272",
			key: "1wngk7"
		}],
		["path", {
			d: "M22 2 2 22",
			key: "y4kqgn"
		}],
		["path", {
			d: "M4.76 13.582A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 .244.473",
			key: "10hv5p"
		}]
	]);
	const PhoneOutgoing = createLucideIcon("phone-outgoing", [
		["path", {
			d: "m16 8 6-6",
			key: "oawc05"
		}],
		["path", {
			d: "M22 8V2h-6",
			key: "oqy2zc"
		}],
		["path", {
			d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
			key: "9njp5v"
		}]
	]);
	const Phone = createLucideIcon("phone", [["path", {
		d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
		key: "9njp5v"
	}]]);
	const Pi = createLucideIcon("pi", [
		["line", {
			x1: "9",
			x2: "9",
			y1: "4",
			y2: "20",
			key: "ovs5a5"
		}],
		["path", {
			d: "M4 7c0-1.7 1.3-3 3-3h13",
			key: "10pag4"
		}],
		["path", {
			d: "M18 20c-1.7 0-3-1.3-3-3V4",
			key: "1gaosr"
		}]
	]);
	const Pickaxe = createLucideIcon("pickaxe", [
		["path", {
			d: "m14 13-8.381 8.38a1 1 0 0 1-3.001-3L11 9.999",
			key: "1lw9ds"
		}],
		["path", {
			d: "M15.973 4.027A13 13 0 0 0 5.902 2.373c-1.398.342-1.092 2.158.277 2.601a19.9 19.9 0 0 1 5.822 3.024",
			key: "ffj4ej"
		}],
		["path", {
			d: "M16.001 11.999a19.9 19.9 0 0 1 3.024 5.824c.444 1.369 2.26 1.676 2.603.278A13 13 0 0 0 20 8.069",
			key: "8tj4zw"
		}],
		["path", {
			d: "M18.352 3.352a1.205 1.205 0 0 0-1.704 0l-5.296 5.296a1.205 1.205 0 0 0 0 1.704l2.296 2.296a1.205 1.205 0 0 0 1.704 0l5.296-5.296a1.205 1.205 0 0 0 0-1.704z",
			key: "hh6h97"
		}]
	]);
	const Piano = createLucideIcon("piano", [
		["path", {
			d: "M18.5 8c-1.4 0-2.6-.8-3.2-2A6.87 6.87 0 0 0 2 9v11a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-8.5C22 9.6 20.4 8 18.5 8",
			key: "lag0yf"
		}],
		["path", {
			d: "M2 14h20",
			key: "myj16y"
		}],
		["path", {
			d: "M6 14v4",
			key: "9ng0ue"
		}],
		["path", {
			d: "M10 14v4",
			key: "1v8uk5"
		}],
		["path", {
			d: "M14 14v4",
			key: "1tqops"
		}],
		["path", {
			d: "M18 14v4",
			key: "18uqwm"
		}]
	]);
	const PictureInPicture2 = createLucideIcon("picture-in-picture-2", [["path", {
		d: "M21 9V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h4",
		key: "daa4of"
	}], ["rect", {
		width: "10",
		height: "7",
		x: "12",
		y: "13",
		rx: "2",
		key: "1nb8gs"
	}]]);
	const PictureInPicture = createLucideIcon("picture-in-picture", [
		["path", {
			d: "M2 10h6V4",
			key: "zwrco"
		}],
		["path", {
			d: "m2 4 6 6",
			key: "ug085t"
		}],
		["path", {
			d: "M21 10V7a2 2 0 0 0-2-2h-7",
			key: "git5jr"
		}],
		["path", {
			d: "M3 14v2a2 2 0 0 0 2 2h3",
			key: "1f7fh3"
		}],
		["rect", {
			x: "12",
			y: "14",
			width: "10",
			height: "7",
			rx: "1",
			key: "1wjs3o"
		}]
	]);
	const PiggyBank = createLucideIcon("piggy-bank", [
		["path", {
			d: "M11 17h3v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3a3.16 3.16 0 0 0 2-2h1a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-1a5 5 0 0 0-2-4V3a4 4 0 0 0-3.2 1.6l-.3.4H11a6 6 0 0 0-6 6v1a5 5 0 0 0 2 4v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1z",
			key: "1piglc"
		}],
		["path", {
			d: "M16 10h.01",
			key: "1m94wz"
		}],
		["path", {
			d: "M2 8v1a2 2 0 0 0 2 2h1",
			key: "1env43"
		}]
	]);
	const PilcrowRight = createLucideIcon("pilcrow-right", [
		["path", {
			d: "M10 3v11",
			key: "o3l5kj"
		}],
		["path", {
			d: "M10 9H7a1 1 0 0 1 0-6h8",
			key: "1wb1nc"
		}],
		["path", {
			d: "M14 3v11",
			key: "mlfb7b"
		}],
		["path", {
			d: "m18 14 4 4H2",
			key: "4r8io1"
		}],
		["path", {
			d: "m22 18-4 4",
			key: "1hjjrd"
		}]
	]);
	const PilcrowLeft = createLucideIcon("pilcrow-left", [
		["path", {
			d: "M14 3v11",
			key: "mlfb7b"
		}],
		["path", {
			d: "M14 9h-3a3 3 0 0 1 0-6h9",
			key: "1ulc19"
		}],
		["path", {
			d: "M18 3v11",
			key: "1phi0r"
		}],
		["path", {
			d: "M22 18H2l4-4",
			key: "yt65j9"
		}],
		["path", {
			d: "m6 22-4-4",
			key: "6jgyf5"
		}]
	]);
	const Pilcrow = createLucideIcon("pilcrow", [
		["path", {
			d: "M13 4v16",
			key: "8vvj80"
		}],
		["path", {
			d: "M17 4v16",
			key: "7dpous"
		}],
		["path", {
			d: "M19 4H9.5a4.5 4.5 0 0 0 0 9H13",
			key: "sh4n9v"
		}]
	]);
	const PillBottle = createLucideIcon("pill-bottle", [
		["path", {
			d: "M18 11h-4a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h4",
			key: "17ldeb"
		}],
		["path", {
			d: "M6 7v13a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7",
			key: "nc37y6"
		}],
		["rect", {
			width: "16",
			height: "5",
			x: "4",
			y: "2",
			rx: "1",
			key: "3jeezo"
		}]
	]);
	const Pill = createLucideIcon("pill", [["path", {
		d: "m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z",
		key: "wa1lgi"
	}], ["path", {
		d: "m8.5 8.5 7 7",
		key: "rvfmvr"
	}]]);
	const PinOff = createLucideIcon("pin-off", [
		["path", {
			d: "M12 17v5",
			key: "bb1du9"
		}],
		["path", {
			d: "M15 9.34V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H7.89",
			key: "znwnzq"
		}],
		["path", {
			d: "m2 2 20 20",
			key: "1ooewy"
		}],
		["path", {
			d: "M9 9v1.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h11",
			key: "c9qhm2"
		}]
	]);
	const Pin = createLucideIcon("pin", [["path", {
		d: "M12 17v5",
		key: "bb1du9"
	}], ["path", {
		d: "M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z",
		key: "1nkz8b"
	}]]);
	const Pipette = createLucideIcon("pipette", [
		["path", {
			d: "m12 9-8.414 8.414A2 2 0 0 0 3 18.828v1.344a2 2 0 0 1-.586 1.414A2 2 0 0 1 3.828 21h1.344a2 2 0 0 0 1.414-.586L15 12",
			key: "1y3wsu"
		}],
		["path", {
			d: "m18 9 .4.4a1 1 0 1 1-3 3l-3.8-3.8a1 1 0 1 1 3-3l.4.4 3.4-3.4a1 1 0 1 1 3 3z",
			key: "110lr1"
		}],
		["path", {
			d: "m2 22 .414-.414",
			key: "jhxm08"
		}]
	]);
	const Pizza = createLucideIcon("pizza", [
		["path", {
			d: "m12 14-1 1",
			key: "11onhr"
		}],
		["path", {
			d: "m13.75 18.25-1.25 1.42",
			key: "1yisr3"
		}],
		["path", {
			d: "M17.775 5.654a15.68 15.68 0 0 0-12.121 12.12",
			key: "1qtqk6"
		}],
		["path", {
			d: "M18.8 9.3a1 1 0 0 0 2.1 7.7",
			key: "fbbbr2"
		}],
		["path", {
			d: "M21.964 20.732a1 1 0 0 1-1.232 1.232l-18-5a1 1 0 0 1-.695-1.232A19.68 19.68 0 0 1 15.732 2.037a1 1 0 0 1 1.232.695z",
			key: "1hyfdd"
		}]
	]);
	const PlaneTakeoff = createLucideIcon("plane-takeoff", [["path", {
		d: "M2 22h20",
		key: "272qi7"
	}], ["path", {
		d: "M6.36 17.4 4 17l-2-4 1.1-.55a2 2 0 0 1 1.8 0l.17.1a2 2 0 0 0 1.8 0L8 12 5 6l.9-.45a2 2 0 0 1 2.09.2l4.02 3a2 2 0 0 0 2.1.2l4.19-2.06a2.41 2.41 0 0 1 1.73-.17L21 7a1.4 1.4 0 0 1 .87 1.99l-.38.76c-.23.46-.6.84-1.07 1.08L7.58 17.2a2 2 0 0 1-1.22.18Z",
		key: "fkigj9"
	}]]);
	const PlaneLanding = createLucideIcon("plane-landing", [["path", {
		d: "M2 22h20",
		key: "272qi7"
	}], ["path", {
		d: "M3.77 10.77 2 9l2-4.5 1.1.55c.55.28.9.84.9 1.45s.35 1.17.9 1.45L8 8.5l3-6 1.05.53a2 2 0 0 1 1.09 1.52l.72 5.4a2 2 0 0 0 1.09 1.52l4.4 2.2c.42.22.78.55 1.01.96l.6 1.03c.49.88-.06 1.98-1.06 2.1l-1.18.15c-.47.06-.95-.02-1.37-.24L4.29 11.15a2 2 0 0 1-.52-.38Z",
		key: "1ma21e"
	}]]);
	const Plane = createLucideIcon("plane", [["path", {
		d: "M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z",
		key: "1v9wt8"
	}]]);
	const Play = createLucideIcon("play", [["path", {
		d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",
		key: "10ikf1"
	}]]);
	const Plug2 = createLucideIcon("plug-2", [
		["path", {
			d: "M9 2v6",
			key: "17ngun"
		}],
		["path", {
			d: "M15 2v6",
			key: "s7yy2p"
		}],
		["path", {
			d: "M12 17v5",
			key: "bb1du9"
		}],
		["path", {
			d: "M5 8h14",
			key: "pcz4l3"
		}],
		["path", {
			d: "M6 11V8h12v3a6 6 0 1 1-12 0Z",
			key: "wtfw2c"
		}]
	]);
	const PlugZap = createLucideIcon("plug-zap", [
		["path", {
			d: "M6.3 20.3a2.4 2.4 0 0 0 3.4 0L12 18l-6-6-2.3 2.3a2.4 2.4 0 0 0 0 3.4Z",
			key: "goz73y"
		}],
		["path", {
			d: "m2 22 3-3",
			key: "19mgm9"
		}],
		["path", {
			d: "M7.5 13.5 10 11",
			key: "7xgeeb"
		}],
		["path", {
			d: "M10.5 16.5 13 14",
			key: "10btkg"
		}],
		["path", {
			d: "m18 3-4 4h6l-4 4",
			key: "16psg9"
		}]
	]);
	const Plug = createLucideIcon("plug", [
		["path", {
			d: "M12 22v-5",
			key: "1ega77"
		}],
		["path", {
			d: "M9 8V2",
			key: "14iosj"
		}],
		["path", {
			d: "M15 8V2",
			key: "18g5xt"
		}],
		["path", {
			d: "M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z",
			key: "osxo6l"
		}]
	]);
	const Plus = createLucideIcon("plus", [["path", {
		d: "M5 12h14",
		key: "1ays0h"
	}], ["path", {
		d: "M12 5v14",
		key: "s699le"
	}]]);
	const PocketKnife = createLucideIcon("pocket-knife", [
		["path", {
			d: "M3 2v1c0 1 2 1 2 2S3 6 3 7s2 1 2 2-2 1-2 2 2 1 2 2",
			key: "19w3oe"
		}],
		["path", {
			d: "M18 6h.01",
			key: "1v4wsw"
		}],
		["path", {
			d: "M6 18h.01",
			key: "uhywen"
		}],
		["path", {
			d: "M20.83 8.83a4 4 0 0 0-5.66-5.66l-12 12a4 4 0 1 0 5.66 5.66Z",
			key: "6fykxj"
		}],
		["path", {
			d: "M18 11.66V22a4 4 0 0 0 4-4V6",
			key: "1utzek"
		}]
	]);
	const Pocket = createLucideIcon("pocket", [["path", {
		d: "M20 3a2 2 0 0 1 2 2v6a1 1 0 0 1-20 0V5a2 2 0 0 1 2-2z",
		key: "1uodqw"
	}], ["path", {
		d: "m8 10 4 4 4-4",
		key: "1mxd5q"
	}]]);
	const Podcast = createLucideIcon("podcast", [
		["path", {
			d: "M13 17a1 1 0 1 0-2 0l.5 4.5a0.5 0.5 0 0 0 1 0z",
			fill: "currentColor",
			key: "x1mxqr"
		}],
		["path", {
			d: "M16.85 18.58a9 9 0 1 0-9.7 0",
			key: "d71mpg"
		}],
		["path", {
			d: "M8 14a5 5 0 1 1 8 0",
			key: "fc81rn"
		}],
		["circle", {
			cx: "12",
			cy: "11",
			r: "1",
			fill: "currentColor",
			key: "vqiwd"
		}]
	]);
	const PointerOff = createLucideIcon("pointer-off", [
		["path", {
			d: "M10 4.5V4a2 2 0 0 0-2.41-1.957",
			key: "jsi14n"
		}],
		["path", {
			d: "M13.9 8.4a2 2 0 0 0-1.26-1.295",
			key: "hirc7f"
		}],
		["path", {
			d: "M21.7 16.2A8 8 0 0 0 22 14v-3a2 2 0 1 0-4 0v-1a2 2 0 0 0-3.63-1.158",
			key: "1jxb2e"
		}],
		["path", {
			d: "m7 15-1.8-1.8a2 2 0 0 0-2.79 2.86L6 19.7a7.74 7.74 0 0 0 6 2.3h2a8 8 0 0 0 5.657-2.343",
			key: "10r7hm"
		}],
		["path", {
			d: "M6 6v8",
			key: "tv5xkp"
		}],
		["path", {
			d: "m2 2 20 20",
			key: "1ooewy"
		}]
	]);
	const Pointer = createLucideIcon("pointer", [
		["path", {
			d: "M22 14a8 8 0 0 1-8 8",
			key: "56vcr3"
		}],
		["path", {
			d: "M18 11v-1a2 2 0 0 0-2-2a2 2 0 0 0-2 2",
			key: "1agjmk"
		}],
		["path", {
			d: "M14 10V9a2 2 0 0 0-2-2a2 2 0 0 0-2 2v1",
			key: "wdbh2u"
		}],
		["path", {
			d: "M10 9.5V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v10",
			key: "1ibuk9"
		}],
		["path", {
			d: "M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15",
			key: "g6ys72"
		}]
	]);
	const Popcorn = createLucideIcon("popcorn", [
		["path", {
			d: "M18 8a2 2 0 0 0 0-4 2 2 0 0 0-4 0 2 2 0 0 0-4 0 2 2 0 0 0-4 0 2 2 0 0 0 0 4",
			key: "10td1f"
		}],
		["path", {
			d: "M10 22 9 8",
			key: "yjptiv"
		}],
		["path", {
			d: "m14 22 1-14",
			key: "8jwc8b"
		}],
		["path", {
			d: "M20 8c.5 0 .9.4.8 1l-2.6 12c-.1.5-.7 1-1.2 1H7c-.6 0-1.1-.4-1.2-1L3.2 9c-.1-.6.3-1 .8-1Z",
			key: "1qo33t"
		}]
	]);
	const Popsicle = createLucideIcon("popsicle", [["path", {
		d: "M18.6 14.4c.8-.8.8-2 0-2.8l-8.1-8.1a4.95 4.95 0 1 0-7.1 7.1l8.1 8.1c.9.7 2.1.7 2.9-.1Z",
		key: "1o68ps"
	}], ["path", {
		d: "m22 22-5.5-5.5",
		key: "17o70y"
	}]]);
	const PoundSterling = createLucideIcon("pound-sterling", [
		["path", {
			d: "M18 7c0-5.333-8-5.333-8 0",
			key: "1prm2n"
		}],
		["path", {
			d: "M10 7v14",
			key: "18tmcs"
		}],
		["path", {
			d: "M6 21h12",
			key: "4dkmi1"
		}],
		["path", {
			d: "M6 13h10",
			key: "ybwr4a"
		}]
	]);
	const PowerOff = createLucideIcon("power-off", [
		["path", {
			d: "M18.36 6.64A9 9 0 0 1 20.77 15",
			key: "dxknvb"
		}],
		["path", {
			d: "M6.16 6.16a9 9 0 1 0 12.68 12.68",
			key: "1x7qb5"
		}],
		["path", {
			d: "M12 2v4",
			key: "3427ic"
		}],
		["path", {
			d: "m2 2 20 20",
			key: "1ooewy"
		}]
	]);
	const Power = createLucideIcon("power", [["path", {
		d: "M12 2v10",
		key: "mnfbl"
	}], ["path", {
		d: "M18.4 6.6a9 9 0 1 1-12.77.04",
		key: "obofu9"
	}]]);
	const Presentation = createLucideIcon("presentation", [
		["path", {
			d: "M2 3h20",
			key: "91anmk"
		}],
		["path", {
			d: "M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3",
			key: "2k9sn8"
		}],
		["path", {
			d: "m7 21 5-5 5 5",
			key: "bip4we"
		}]
	]);
	const PrinterCheck = createLucideIcon("printer-check", [
		["path", {
			d: "M13.5 22H7a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v.5",
			key: "qeb09x"
		}],
		["path", {
			d: "m16 19 2 2 4-4",
			key: "1b14m6"
		}],
		["path", {
			d: "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v2",
			key: "1md90i"
		}],
		["path", {
			d: "M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6",
			key: "1itne7"
		}]
	]);
	const Printer = createLucideIcon("printer", [
		["path", {
			d: "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",
			key: "143wyd"
		}],
		["path", {
			d: "M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6",
			key: "1itne7"
		}],
		["rect", {
			x: "6",
			y: "14",
			width: "12",
			height: "8",
			rx: "1",
			key: "1ue0tg"
		}]
	]);
	const Projector = createLucideIcon("projector", [
		["path", {
			d: "M5 7 3 5",
			key: "1yys58"
		}],
		["path", {
			d: "M9 6V3",
			key: "1ptz9u"
		}],
		["path", {
			d: "m13 7 2-2",
			key: "1w3vmq"
		}],
		["circle", {
			cx: "9",
			cy: "13",
			r: "3",
			key: "1mma13"
		}],
		["path", {
			d: "M11.83 12H20a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h2.17",
			key: "2frwzc"
		}],
		["path", {
			d: "M16 16h2",
			key: "dnq2od"
		}]
	]);
	const Proportions = createLucideIcon("proportions", [
		["rect", {
			width: "20",
			height: "16",
			x: "2",
			y: "4",
			rx: "2",
			key: "18n3k1"
		}],
		["path", {
			d: "M12 9v11",
			key: "1fnkrn"
		}],
		["path", {
			d: "M2 9h13a2 2 0 0 1 2 2v9",
			key: "11z3ex"
		}]
	]);
	const Puzzle = createLucideIcon("puzzle", [["path", {
		d: "M15.39 4.39a1 1 0 0 0 1.68-.474 2.5 2.5 0 1 1 3.014 3.015 1 1 0 0 0-.474 1.68l1.683 1.682a2.414 2.414 0 0 1 0 3.414L19.61 15.39a1 1 0 0 1-1.68-.474 2.5 2.5 0 1 0-3.014 3.015 1 1 0 0 1 .474 1.68l-1.683 1.682a2.414 2.414 0 0 1-3.414 0L8.61 19.61a1 1 0 0 0-1.68.474 2.5 2.5 0 1 1-3.014-3.015 1 1 0 0 0 .474-1.68l-1.683-1.682a2.414 2.414 0 0 1 0-3.414L4.39 8.61a1 1 0 0 1 1.68.474 2.5 2.5 0 1 0 3.014-3.015 1 1 0 0 1-.474-1.68l1.683-1.682a2.414 2.414 0 0 1 3.414 0z",
		key: "w46dr5"
	}]]);
	const Pyramid = createLucideIcon("pyramid", [["path", {
		d: "M2.5 16.88a1 1 0 0 1-.32-1.43l9-13.02a1 1 0 0 1 1.64 0l9 13.01a1 1 0 0 1-.32 1.44l-8.51 4.86a2 2 0 0 1-1.98 0Z",
		key: "aenxs0"
	}], ["path", {
		d: "M12 2v20",
		key: "t6zp3m"
	}]]);
	const QrCode = createLucideIcon("qr-code", [
		["rect", {
			width: "5",
			height: "5",
			x: "3",
			y: "3",
			rx: "1",
			key: "1tu5fj"
		}],
		["rect", {
			width: "5",
			height: "5",
			x: "16",
			y: "3",
			rx: "1",
			key: "1v8r4q"
		}],
		["rect", {
			width: "5",
			height: "5",
			x: "3",
			y: "16",
			rx: "1",
			key: "1x03jg"
		}],
		["path", {
			d: "M21 16h-3a2 2 0 0 0-2 2v3",
			key: "177gqh"
		}],
		["path", {
			d: "M21 21v.01",
			key: "ents32"
		}],
		["path", {
			d: "M12 7v3a2 2 0 0 1-2 2H7",
			key: "8crl2c"
		}],
		["path", {
			d: "M3 12h.01",
			key: "nlz23k"
		}],
		["path", {
			d: "M12 3h.01",
			key: "n36tog"
		}],
		["path", {
			d: "M12 16v.01",
			key: "133mhm"
		}],
		["path", {
			d: "M16 12h1",
			key: "1slzba"
		}],
		["path", {
			d: "M21 12v.01",
			key: "1lwtk9"
		}],
		["path", {
			d: "M12 21v-1",
			key: "1880an"
		}]
	]);
	const Quote = createLucideIcon("quote", [["path", {
		d: "M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z",
		key: "rib7q0"
	}], ["path", {
		d: "M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z",
		key: "1ymkrd"
	}]]);
	const Rabbit = createLucideIcon("rabbit", [
		["path", {
			d: "M13 16a3 3 0 0 1 2.24 5",
			key: "1epib5"
		}],
		["path", {
			d: "M18 12h.01",
			key: "yjnet6"
		}],
		["path", {
			d: "M18 21h-8a4 4 0 0 1-4-4 7 7 0 0 1 7-7h.2L9.6 6.4a1 1 0 1 1 2.8-2.8L15.8 7h.2c3.3 0 6 2.7 6 6v1a2 2 0 0 1-2 2h-1a3 3 0 0 0-3 3",
			key: "ue9ozu"
		}],
		["path", {
			d: "M20 8.54V4a2 2 0 1 0-4 0v3",
			key: "49iql8"
		}],
		["path", {
			d: "M7.612 12.524a3 3 0 1 0-1.6 4.3",
			key: "1e33i0"
		}]
	]);
	const Radar = createLucideIcon("radar", [
		["path", {
			d: "M19.07 4.93A10 10 0 0 0 6.99 3.34",
			key: "z3du51"
		}],
		["path", {
			d: "M4 6h.01",
			key: "oypzma"
		}],
		["path", {
			d: "M2.29 9.62A10 10 0 1 0 21.31 8.35",
			key: "qzzz0"
		}],
		["path", {
			d: "M16.24 7.76A6 6 0 1 0 8.23 16.67",
			key: "1yjesh"
		}],
		["path", {
			d: "M12 18h.01",
			key: "mhygvu"
		}],
		["path", {
			d: "M17.99 11.66A6 6 0 0 1 15.77 16.67",
			key: "1u2y91"
		}],
		["circle", {
			cx: "12",
			cy: "12",
			r: "2",
			key: "1c9p78"
		}],
		["path", {
			d: "m13.41 10.59 5.66-5.66",
			key: "mhq4k0"
		}]
	]);
	const Radiation = createLucideIcon("radiation", [
		["path", {
			d: "M12 12h.01",
			key: "1mp3jc"
		}],
		["path", {
			d: "M14 15.4641a4 4 0 0 1-4 0L7.52786 19.74597 A 1 1 0 0 0 7.99303 21.16211 10 10 0 0 0 16.00697 21.16211 1 1 0 0 0 16.47214 19.74597z",
			key: "1y4lzb"
		}],
		["path", {
			d: "M16 12a4 4 0 0 0-2-3.464l2.472-4.282a1 1 0 0 1 1.46-.305 10 10 0 0 1 4.006 6.94A1 1 0 0 1 21 12z",
			key: "163ggk"
		}],
		["path", {
			d: "M8 12a4 4 0 0 1 2-3.464L7.528 4.254a1 1 0 0 0-1.46-.305 10 10 0 0 0-4.006 6.94A1 1 0 0 0 3 12z",
			key: "1l9i0b"
		}]
	]);
	const Radical = createLucideIcon("radical", [["path", {
		d: "M3 12h3.28a1 1 0 0 1 .948.684l2.298 7.934a.5.5 0 0 0 .96-.044L13.82 4.771A1 1 0 0 1 14.792 4H21",
		key: "1mqj8i"
	}]]);
	const RadioReceiver = createLucideIcon("radio-receiver", [
		["path", {
			d: "M5 16v2",
			key: "g5qcv5"
		}],
		["path", {
			d: "M19 16v2",
			key: "1gbaio"
		}],
		["rect", {
			width: "20",
			height: "8",
			x: "2",
			y: "8",
			rx: "2",
			key: "vjsjur"
		}],
		["path", {
			d: "M18 12h.01",
			key: "yjnet6"
		}]
	]);
	const RadioTower = createLucideIcon("radio-tower", [
		["path", {
			d: "M4.9 16.1C1 12.2 1 5.8 4.9 1.9",
			key: "s0qx1y"
		}],
		["path", {
			d: "M7.8 4.7a6.14 6.14 0 0 0-.8 7.5",
			key: "1idnkw"
		}],
		["circle", {
			cx: "12",
			cy: "9",
			r: "2",
			key: "1092wv"
		}],
		["path", {
			d: "M16.2 4.8c2 2 2.26 5.11.8 7.47",
			key: "ojru2q"
		}],
		["path", {
			d: "M19.1 1.9a9.96 9.96 0 0 1 0 14.1",
			key: "rhi7fg"
		}],
		["path", {
			d: "M9.5 18h5",
			key: "mfy3pd"
		}],
		["path", {
			d: "m8 22 4-11 4 11",
			key: "25yftu"
		}]
	]);
	const Radio = createLucideIcon("radio", [
		["path", {
			d: "M16.247 7.761a6 6 0 0 1 0 8.478",
			key: "1fwjs5"
		}],
		["path", {
			d: "M19.075 4.933a10 10 0 0 1 0 14.134",
			key: "ehdyv1"
		}],
		["path", {
			d: "M4.925 19.067a10 10 0 0 1 0-14.134",
			key: "1q22gi"
		}],
		["path", {
			d: "M7.753 16.239a6 6 0 0 1 0-8.478",
			key: "r2q7qm"
		}],
		["circle", {
			cx: "12",
			cy: "12",
			r: "2",
			key: "1c9p78"
		}]
	]);
	const Radius = createLucideIcon("radius", [
		["path", {
			d: "M20.34 17.52a10 10 0 1 0-2.82 2.82",
			key: "fydyku"
		}],
		["circle", {
			cx: "19",
			cy: "19",
			r: "2",
			key: "17f5cg"
		}],
		["path", {
			d: "m13.41 13.41 4.18 4.18",
			key: "1gqbwc"
		}],
		["circle", {
			cx: "12",
			cy: "12",
			r: "2",
			key: "1c9p78"
		}]
	]);
	const RailSymbol = createLucideIcon("rail-symbol", [
		["path", {
			d: "M5 15h14",
			key: "m0yey3"
		}],
		["path", {
			d: "M5 9h14",
			key: "7tsvo6"
		}],
		["path", {
			d: "m14 20-5-5 6-6-5-5",
			key: "1jo42i"
		}]
	]);
	const Rat = createLucideIcon("rat", [
		["path", {
			d: "M13 22H4a2 2 0 0 1 0-4h12",
			key: "bt3f23"
		}],
		["path", {
			d: "M13.236 18a3 3 0 0 0-2.2-5",
			key: "1tbvmo"
		}],
		["path", {
			d: "M16 9h.01",
			key: "1bdo4e"
		}],
		["path", {
			d: "M16.82 3.94a3 3 0 1 1 3.237 4.868l1.815 2.587a1.5 1.5 0 0 1-1.5 2.1l-2.872-.453a3 3 0 0 0-3.5 3",
			key: "9ch7kn"
		}],
		["path", {
			d: "M17 4.988a3 3 0 1 0-5.2 2.052A7 7 0 0 0 4 14.015 4 4 0 0 0 8 18",
			key: "3s7e9i"
		}]
	]);
	const Rainbow = createLucideIcon("rainbow", [
		["path", {
			d: "M22 17a10 10 0 0 0-20 0",
			key: "ozegv"
		}],
		["path", {
			d: "M6 17a6 6 0 0 1 12 0",
			key: "5giftw"
		}],
		["path", {
			d: "M10 17a2 2 0 0 1 4 0",
			key: "gnsikk"
		}]
	]);
	const Ratio = createLucideIcon("ratio", [["rect", {
		width: "12",
		height: "20",
		x: "6",
		y: "2",
		rx: "2",
		key: "1oxtiu"
	}], ["rect", {
		width: "20",
		height: "12",
		x: "2",
		y: "6",
		rx: "2",
		key: "9lu3g6"
	}]]);
	const ReceiptCent = createLucideIcon("receipt-cent", [
		["path", {
			d: "M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z",
			key: "q3az6g"
		}],
		["path", {
			d: "M12 6.5v11",
			key: "ecfhkf"
		}],
		["path", {
			d: "M15 9.4a4 4 0 1 0 0 5.2",
			key: "1makmb"
		}]
	]);
	const ReceiptIndianRupee = createLucideIcon("receipt-indian-rupee", [
		["path", {
			d: "M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z",
			key: "q3az6g"
		}],
		["path", {
			d: "M8 7h8",
			key: "i86dvs"
		}],
		["path", {
			d: "M12 17.5 8 15h1a4 4 0 0 0 0-8",
			key: "grpkl4"
		}],
		["path", {
			d: "M8 11h8",
			key: "vwpz6n"
		}]
	]);
	const ReceiptEuro = createLucideIcon("receipt-euro", [
		["path", {
			d: "M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z",
			key: "q3az6g"
		}],
		["path", {
			d: "M8 12h5",
			key: "1g6qi8"
		}],
		["path", {
			d: "M16 9.5a4 4 0 1 0 0 5.2",
			key: "b2px4r"
		}]
	]);
	const ReceiptJapaneseYen = createLucideIcon("receipt-japanese-yen", [
		["path", {
			d: "M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z",
			key: "q3az6g"
		}],
		["path", {
			d: "m12 10 3-3",
			key: "1mc12w"
		}],
		["path", {
			d: "m9 7 3 3v7.5",
			key: "39i0xv"
		}],
		["path", {
			d: "M9 11h6",
			key: "1fldmi"
		}],
		["path", {
			d: "M9 15h6",
			key: "cctwl0"
		}]
	]);
	const ReceiptPoundSterling = createLucideIcon("receipt-pound-sterling", [
		["path", {
			d: "M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z",
			key: "q3az6g"
		}],
		["path", {
			d: "M8 13h5",
			key: "1k9z8w"
		}],
		["path", {
			d: "M10 17V9.5a2.5 2.5 0 0 1 5 0",
			key: "1dzgp0"
		}],
		["path", {
			d: "M8 17h7",
			key: "8mjdqu"
		}]
	]);
	const ReceiptRussianRuble = createLucideIcon("receipt-russian-ruble", [
		["path", {
			d: "M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z",
			key: "q3az6g"
		}],
		["path", {
			d: "M8 15h5",
			key: "vxg57a"
		}],
		["path", {
			d: "M8 11h5a2 2 0 1 0 0-4h-3v10",
			key: "1usi5u"
		}]
	]);
	const ReceiptSwissFranc = createLucideIcon("receipt-swiss-franc", [
		["path", {
			d: "M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z",
			key: "q3az6g"
		}],
		["path", {
			d: "M10 17V7h5",
			key: "k7jq18"
		}],
		["path", {
			d: "M10 11h4",
			key: "1i0mka"
		}],
		["path", {
			d: "M8 15h5",
			key: "vxg57a"
		}]
	]);
	const ReceiptText = createLucideIcon("receipt-text", [
		["path", {
			d: "M13 16H8",
			key: "wsln4y"
		}],
		["path", {
			d: "M14 8H8",
			key: "1l3xfs"
		}],
		["path", {
			d: "M16 12H8",
			key: "1fr5h0"
		}],
		["path", {
			d: "M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z",
			key: "ycz6yz"
		}]
	]);
	const ReceiptTurkishLira = createLucideIcon("receipt-turkish-lira", [
		["path", {
			d: "M10 6.5v11a5.5 5.5 0 0 0 5.5-5.5",
			key: "nw10mp"
		}],
		["path", {
			d: "m14 8-6 3",
			key: "2tb98i"
		}],
		["path", {
			d: "M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1z",
			key: "io9ry0"
		}]
	]);
	const RectangleCircle = createLucideIcon("rectangle-circle", [["path", {
		d: "M14 4v16H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z",
		key: "1m5n7q"
	}], ["circle", {
		cx: "14",
		cy: "12",
		r: "8",
		key: "1pag6k"
	}]]);
	const Receipt = createLucideIcon("receipt", [
		["path", {
			d: "M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z",
			key: "q3az6g"
		}],
		["path", {
			d: "M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8",
			key: "1h4pet"
		}],
		["path", {
			d: "M12 17.5v-11",
			key: "1jc1ny"
		}]
	]);
	const RectangleEllipsis = createLucideIcon("rectangle-ellipsis", [
		["rect", {
			width: "20",
			height: "12",
			x: "2",
			y: "6",
			rx: "2",
			key: "9lu3g6"
		}],
		["path", {
			d: "M12 12h.01",
			key: "1mp3jc"
		}],
		["path", {
			d: "M17 12h.01",
			key: "1m0b6t"
		}],
		["path", {
			d: "M7 12h.01",
			key: "eqddd0"
		}]
	]);
	const RectangleGoggles = createLucideIcon("rectangle-goggles", [["path", {
		d: "M20 6a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-4a2 2 0 0 1-1.6-.8l-1.6-2.13a1 1 0 0 0-1.6 0L9.6 17.2A2 2 0 0 1 8 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z",
		key: "d5y1f"
	}]]);
	const RectangleHorizontal = createLucideIcon("rectangle-horizontal", [["rect", {
		width: "20",
		height: "12",
		x: "2",
		y: "6",
		rx: "2",
		key: "9lu3g6"
	}]]);
	const RectangleVertical = createLucideIcon("rectangle-vertical", [["rect", {
		width: "12",
		height: "20",
		x: "6",
		y: "2",
		rx: "2",
		key: "1oxtiu"
	}]]);
	const Recycle = createLucideIcon("recycle", [
		["path", {
			d: "M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5",
			key: "x6z5xu"
		}],
		["path", {
			d: "M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12",
			key: "1x4zh5"
		}],
		["path", {
			d: "m14 16-3 3 3 3",
			key: "f6jyew"
		}],
		["path", {
			d: "M8.293 13.596 7.196 9.5 3.1 10.598",
			key: "wf1obh"
		}],
		["path", {
			d: "m9.344 5.811 1.093-1.892A1.83 1.83 0 0 1 11.985 3a1.784 1.784 0 0 1 1.546.888l3.943 6.843",
			key: "9tzpgr"
		}],
		["path", {
			d: "m13.378 9.633 4.096 1.098 1.097-4.096",
			key: "1oe83g"
		}]
	]);
	const Redo2 = createLucideIcon("redo-2", [["path", {
		d: "m15 14 5-5-5-5",
		key: "12vg1m"
	}], ["path", {
		d: "M20 9H9.5A5.5 5.5 0 0 0 4 14.5A5.5 5.5 0 0 0 9.5 20H13",
		key: "6uklza"
	}]]);
	const RedoDot = createLucideIcon("redo-dot", [
		["circle", {
			cx: "12",
			cy: "17",
			r: "1",
			key: "1ixnty"
		}],
		["path", {
			d: "M21 7v6h-6",
			key: "3ptur4"
		}],
		["path", {
			d: "M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7",
			key: "1kgawr"
		}]
	]);
	const Redo = createLucideIcon("redo", [["path", {
		d: "M21 7v6h-6",
		key: "3ptur4"
	}], ["path", {
		d: "M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7",
		key: "1kgawr"
	}]]);
	const RefreshCcwDot = createLucideIcon("refresh-ccw-dot", [
		["path", {
			d: "M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",
			key: "14sxne"
		}],
		["path", {
			d: "M3 3v5h5",
			key: "1xhq8a"
		}],
		["path", {
			d: "M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16",
			key: "1hlbsb"
		}],
		["path", {
			d: "M16 16h5v5",
			key: "ccwih5"
		}],
		["circle", {
			cx: "12",
			cy: "12",
			r: "1",
			key: "41hilf"
		}]
	]);
	const RefreshCcw = createLucideIcon("refresh-ccw", [
		["path", {
			d: "M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",
			key: "14sxne"
		}],
		["path", {
			d: "M3 3v5h5",
			key: "1xhq8a"
		}],
		["path", {
			d: "M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16",
			key: "1hlbsb"
		}],
		["path", {
			d: "M16 16h5v5",
			key: "ccwih5"
		}]
	]);
	const RefreshCwOff = createLucideIcon("refresh-cw-off", [
		["path", {
			d: "M21 8L18.74 5.74A9.75 9.75 0 0 0 12 3C11 3 10.03 3.16 9.13 3.47",
			key: "1krf6h"
		}],
		["path", {
			d: "M8 16H3v5",
			key: "1cv678"
		}],
		["path", {
			d: "M3 12C3 9.51 4 7.26 5.64 5.64",
			key: "ruvoct"
		}],
		["path", {
			d: "m3 16 2.26 2.26A9.75 9.75 0 0 0 12 21c2.49 0 4.74-1 6.36-2.64",
			key: "19q130"
		}],
		["path", {
			d: "M21 12c0 1-.16 1.97-.47 2.87",
			key: "4w8emr"
		}],
		["path", {
			d: "M21 3v5h-5",
			key: "1q7to0"
		}],
		["path", {
			d: "M22 22 2 2",
			key: "1r8tn9"
		}]
	]);
	const RefreshCw = createLucideIcon("refresh-cw", [
		["path", {
			d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",
			key: "v9h5vc"
		}],
		["path", {
			d: "M21 3v5h-5",
			key: "1q7to0"
		}],
		["path", {
			d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",
			key: "3uifl3"
		}],
		["path", {
			d: "M8 16H3v5",
			key: "1cv678"
		}]
	]);
	const Refrigerator = createLucideIcon("refrigerator", [
		["path", {
			d: "M5 6a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6Z",
			key: "fpq118"
		}],
		["path", {
			d: "M5 10h14",
			key: "elsbfy"
		}],
		["path", {
			d: "M15 7v6",
			key: "1nx30x"
		}]
	]);
	const Regex = createLucideIcon("regex", [
		["path", {
			d: "M17 3v10",
			key: "15fgeh"
		}],
		["path", {
			d: "m12.67 5.5 8.66 5",
			key: "1gpheq"
		}],
		["path", {
			d: "m12.67 10.5 8.66-5",
			key: "1dkfa6"
		}],
		["path", {
			d: "M9 17a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2z",
			key: "swwfx4"
		}]
	]);
	const RemoveFormatting = createLucideIcon("remove-formatting", [
		["path", {
			d: "M4 7V4h16v3",
			key: "9msm58"
		}],
		["path", {
			d: "M5 20h6",
			key: "1h6pxn"
		}],
		["path", {
			d: "M13 4 8 20",
			key: "kqq6aj"
		}],
		["path", {
			d: "m15 15 5 5",
			key: "me55sn"
		}],
		["path", {
			d: "m20 15-5 5",
			key: "11p7ol"
		}]
	]);
	const Repeat1 = createLucideIcon("repeat-1", [
		["path", {
			d: "m17 2 4 4-4 4",
			key: "nntrym"
		}],
		["path", {
			d: "M3 11v-1a4 4 0 0 1 4-4h14",
			key: "84bu3i"
		}],
		["path", {
			d: "m7 22-4-4 4-4",
			key: "1wqhfi"
		}],
		["path", {
			d: "M21 13v1a4 4 0 0 1-4 4H3",
			key: "1rx37r"
		}],
		["path", {
			d: "M11 10h1v4",
			key: "70cz1p"
		}]
	]);
	const Repeat2 = createLucideIcon("repeat-2", [
		["path", {
			d: "m2 9 3-3 3 3",
			key: "1ltn5i"
		}],
		["path", {
			d: "M13 18H7a2 2 0 0 1-2-2V6",
			key: "1r6tfw"
		}],
		["path", {
			d: "m22 15-3 3-3-3",
			key: "4rnwn2"
		}],
		["path", {
			d: "M11 6h6a2 2 0 0 1 2 2v10",
			key: "2f72bc"
		}]
	]);
	const Repeat = createLucideIcon("repeat", [
		["path", {
			d: "m17 2 4 4-4 4",
			key: "nntrym"
		}],
		["path", {
			d: "M3 11v-1a4 4 0 0 1 4-4h14",
			key: "84bu3i"
		}],
		["path", {
			d: "m7 22-4-4 4-4",
			key: "1wqhfi"
		}],
		["path", {
			d: "M21 13v1a4 4 0 0 1-4 4H3",
			key: "1rx37r"
		}]
	]);
	const ReplaceAll = createLucideIcon("replace-all", [
		["path", {
			d: "M14 14a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1",
			key: "zg1ipl"
		}],
		["path", {
			d: "M14 4a1 1 0 0 1 1-1",
			key: "dhj8ez"
		}],
		["path", {
			d: "M15 10a1 1 0 0 1-1-1",
			key: "1mnyi5"
		}],
		["path", {
			d: "M19 14a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1",
			key: "txt6k4"
		}],
		["path", {
			d: "M21 4a1 1 0 0 0-1-1",
			key: "sfs9ap"
		}],
		["path", {
			d: "M21 9a1 1 0 0 1-1 1",
			key: "mp6qeo"
		}],
		["path", {
			d: "m3 7 3 3 3-3",
			key: "x25e72"
		}],
		["path", {
			d: "M6 10V5a2 2 0 0 1 2-2h2",
			key: "15xut4"
		}],
		["rect", {
			x: "3",
			y: "14",
			width: "7",
			height: "7",
			rx: "1",
			key: "1bkyp8"
		}]
	]);
	const Replace = createLucideIcon("replace", [
		["path", {
			d: "M14 4a1 1 0 0 1 1-1",
			key: "dhj8ez"
		}],
		["path", {
			d: "M15 10a1 1 0 0 1-1-1",
			key: "1mnyi5"
		}],
		["path", {
			d: "M21 4a1 1 0 0 0-1-1",
			key: "sfs9ap"
		}],
		["path", {
			d: "M21 9a1 1 0 0 1-1 1",
			key: "mp6qeo"
		}],
		["path", {
			d: "m3 7 3 3 3-3",
			key: "x25e72"
		}],
		["path", {
			d: "M6 10V5a2 2 0 0 1 2-2h2",
			key: "15xut4"
		}],
		["rect", {
			x: "3",
			y: "14",
			width: "7",
			height: "7",
			rx: "1",
			key: "1bkyp8"
		}]
	]);
	const ReplyAll = createLucideIcon("reply-all", [
		["path", {
			d: "m12 17-5-5 5-5",
			key: "1s3y5u"
		}],
		["path", {
			d: "M22 18v-2a4 4 0 0 0-4-4H7",
			key: "1fcyog"
		}],
		["path", {
			d: "m7 17-5-5 5-5",
			key: "1ed8i2"
		}]
	]);
	const Reply = createLucideIcon("reply", [["path", {
		d: "M20 18v-2a4 4 0 0 0-4-4H4",
		key: "5vmcpk"
	}], ["path", {
		d: "m9 17-5-5 5-5",
		key: "nvlc11"
	}]]);
	const Rewind = createLucideIcon("rewind", [["path", {
		d: "M12 6a2 2 0 0 0-3.414-1.414l-6 6a2 2 0 0 0 0 2.828l6 6A2 2 0 0 0 12 18z",
		key: "2a1g8i"
	}], ["path", {
		d: "M22 6a2 2 0 0 0-3.414-1.414l-6 6a2 2 0 0 0 0 2.828l6 6A2 2 0 0 0 22 18z",
		key: "rg3s36"
	}]]);
	const Ribbon = createLucideIcon("ribbon", [
		["path", {
			d: "M12 11.22C11 9.997 10 9 10 8a2 2 0 0 1 4 0c0 1-.998 2.002-2.01 3.22",
			key: "1rnhq3"
		}],
		["path", {
			d: "m12 18 2.57-3.5",
			key: "116vt7"
		}],
		["path", {
			d: "M6.243 9.016a7 7 0 0 1 11.507-.009",
			key: "10dq0b"
		}],
		["path", {
			d: "M9.35 14.53 12 11.22",
			key: "tdsyp2"
		}],
		["path", {
			d: "M9.35 14.53C7.728 12.246 6 10.221 6 7a6 5 0 0 1 12 0c-.005 3.22-1.778 5.235-3.43 7.5l3.557 4.527a1 1 0 0 1-.203 1.43l-1.894 1.36a1 1 0 0 1-1.384-.215L12 18l-2.679 3.593a1 1 0 0 1-1.39.213l-1.865-1.353a1 1 0 0 1-.203-1.422z",
			key: "nmifey"
		}]
	]);
	const Rocket = createLucideIcon("rocket", [
		["path", {
			d: "M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z",
			key: "m3kijz"
		}],
		["path", {
			d: "m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z",
			key: "1fmvmk"
		}],
		["path", {
			d: "M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0",
			key: "1f8sc4"
		}],
		["path", {
			d: "M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5",
			key: "qeys4"
		}]
	]);
	const RockingChair = createLucideIcon("rocking-chair", [
		["polyline", {
			points: "3.5 2 6.5 12.5 18 12.5",
			key: "y3iy52"
		}],
		["line", {
			x1: "9.5",
			x2: "5.5",
			y1: "12.5",
			y2: "20",
			key: "19vg5i"
		}],
		["line", {
			x1: "15",
			x2: "18.5",
			y1: "12.5",
			y2: "20",
			key: "1inpmv"
		}],
		["path", {
			d: "M2.75 18a13 13 0 0 0 18.5 0",
			key: "1nquas"
		}]
	]);
	const RollerCoaster = createLucideIcon("roller-coaster", [
		["path", {
			d: "M6 19V5",
			key: "1r845m"
		}],
		["path", {
			d: "M10 19V6.8",
			key: "9j2tfs"
		}],
		["path", {
			d: "M14 19v-7.8",
			key: "10s8qv"
		}],
		["path", {
			d: "M18 5v4",
			key: "1tajlv"
		}],
		["path", {
			d: "M18 19v-6",
			key: "ielfq3"
		}],
		["path", {
			d: "M22 19V9",
			key: "158nzp"
		}],
		["path", {
			d: "M2 19V9a4 4 0 0 1 4-4c2 0 4 1.33 6 4s4 4 6 4a4 4 0 1 0-3-6.65",
			key: "1930oh"
		}]
	]);
	const Rose = createLucideIcon("rose", [
		["path", {
			d: "M17 10h-1a4 4 0 1 1 4-4v.534",
			key: "7qf5zm"
		}],
		["path", {
			d: "M17 6h1a4 4 0 0 1 1.42 7.74l-2.29.87a6 6 0 0 1-5.339-10.68l2.069-1.31",
			key: "1et29u"
		}],
		["path", {
			d: "M4.5 17c2.8-.5 4.4 0 5.5.8s1.8 2.2 2.3 3.7c-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2",
			key: "kiv2lz"
		}],
		["path", {
			d: "M9.77 12C4 15 2 22 2 22",
			key: "h28rw0"
		}],
		["circle", {
			cx: "17",
			cy: "8",
			r: "2",
			key: "1330xn"
		}]
	]);
	const Rotate3d = createLucideIcon("rotate-3d", [
		["path", {
			d: "M16.466 7.5C15.643 4.237 13.952 2 12 2 9.239 2 7 6.477 7 12s2.239 10 5 10c.342 0 .677-.069 1-.2",
			key: "10n0gc"
		}],
		["path", {
			d: "m15.194 13.707 3.814 1.86-1.86 3.814",
			key: "16shm9"
		}],
		["path", {
			d: "M19 15.57c-1.804.885-4.274 1.43-7 1.43-5.523 0-10-2.239-10-5s4.477-5 10-5c4.838 0 8.873 1.718 9.8 4",
			key: "1lxi77"
		}]
	]);
	const RotateCcwKey = createLucideIcon("rotate-ccw-key", [
		["path", {
			d: "m14.5 9.5 1 1",
			key: "159eiq"
		}],
		["path", {
			d: "m15.5 8.5-4 4",
			key: "iirg3q"
		}],
		["path", {
			d: "M3 12a9 9 0 1 0 9-9 9.74 9.74 0 0 0-6.74 2.74L3 8",
			key: "g2jlw"
		}],
		["path", {
			d: "M3 3v5h5",
			key: "1xhq8a"
		}],
		["circle", {
			cx: "10",
			cy: "14",
			r: "2",
			key: "1239so"
		}]
	]);
	const RotateCcwSquare = createLucideIcon("rotate-ccw-square", [
		["path", {
			d: "M20 9V7a2 2 0 0 0-2-2h-6",
			key: "19z8uc"
		}],
		["path", {
			d: "m15 2-3 3 3 3",
			key: "177bxs"
		}],
		["path", {
			d: "M20 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2",
			key: "d36hnl"
		}]
	]);
	const RotateCcw = createLucideIcon("rotate-ccw", [["path", {
		d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",
		key: "1357e3"
	}], ["path", {
		d: "M3 3v5h5",
		key: "1xhq8a"
	}]]);
	const RotateCwSquare = createLucideIcon("rotate-cw-square", [
		["path", {
			d: "M12 5H6a2 2 0 0 0-2 2v3",
			key: "l96uqu"
		}],
		["path", {
			d: "m9 8 3-3-3-3",
			key: "1gzgc3"
		}],
		["path", {
			d: "M4 14v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2",
			key: "1w2k5h"
		}]
	]);
	const RotateCw = createLucideIcon("rotate-cw", [["path", {
		d: "M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8",
		key: "1p45f6"
	}], ["path", {
		d: "M21 3v5h-5",
		key: "1q7to0"
	}]]);
	const RouteOff = createLucideIcon("route-off", [
		["circle", {
			cx: "6",
			cy: "19",
			r: "3",
			key: "1kj8tv"
		}],
		["path", {
			d: "M9 19h8.5c.4 0 .9-.1 1.3-.2",
			key: "1effex"
		}],
		["path", {
			d: "M5.2 5.2A3.5 3.53 0 0 0 6.5 12H12",
			key: "k9y2ds"
		}],
		["path", {
			d: "m2 2 20 20",
			key: "1ooewy"
		}],
		["path", {
			d: "M21 15.3a3.5 3.5 0 0 0-3.3-3.3",
			key: "11nlu2"
		}],
		["path", {
			d: "M15 5h-4.3",
			key: "6537je"
		}],
		["circle", {
			cx: "18",
			cy: "5",
			r: "3",
			key: "gq8acd"
		}]
	]);
	const Route = createLucideIcon("route", [
		["circle", {
			cx: "6",
			cy: "19",
			r: "3",
			key: "1kj8tv"
		}],
		["path", {
			d: "M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15",
			key: "1d8sl"
		}],
		["circle", {
			cx: "18",
			cy: "5",
			r: "3",
			key: "gq8acd"
		}]
	]);
	const Router = createLucideIcon("router", [
		["rect", {
			width: "20",
			height: "8",
			x: "2",
			y: "14",
			rx: "2",
			key: "w68u3i"
		}],
		["path", {
			d: "M6.01 18H6",
			key: "19vcac"
		}],
		["path", {
			d: "M10.01 18H10",
			key: "uamcmx"
		}],
		["path", {
			d: "M15 10v4",
			key: "qjz1xs"
		}],
		["path", {
			d: "M17.84 7.17a4 4 0 0 0-5.66 0",
			key: "1rif40"
		}],
		["path", {
			d: "M20.66 4.34a8 8 0 0 0-11.31 0",
			key: "6a5xfq"
		}]
	]);
	const Rows2 = createLucideIcon("rows-2", [["rect", {
		width: "18",
		height: "18",
		x: "3",
		y: "3",
		rx: "2",
		key: "afitv7"
	}], ["path", {
		d: "M3 12h18",
		key: "1i2n21"
	}]]);
	const Rows3 = createLucideIcon("rows-3", [
		["rect", {
			width: "18",
			height: "18",
			x: "3",
			y: "3",
			rx: "2",
			key: "afitv7"
		}],
		["path", {
			d: "M21 9H3",
			key: "1338ky"
		}],
		["path", {
			d: "M21 15H3",
			key: "9uk58r"
		}]
	]);
	const Rows4 = createLucideIcon("rows-4", [
		["rect", {
			width: "18",
			height: "18",
			x: "3",
			y: "3",
			rx: "2",
			key: "afitv7"
		}],
		["path", {
			d: "M21 7.5H3",
			key: "1hm9pq"
		}],
		["path", {
			d: "M21 12H3",
			key: "2avoz0"
		}],
		["path", {
			d: "M21 16.5H3",
			key: "n7jzkj"
		}]
	]);
	const Rss = createLucideIcon("rss", [
		["path", {
			d: "M4 11a9 9 0 0 1 9 9",
			key: "pv89mb"
		}],
		["path", {
			d: "M4 4a16 16 0 0 1 16 16",
			key: "k0647b"
		}],
		["circle", {
			cx: "5",
			cy: "19",
			r: "1",
			key: "bfqh0e"
		}]
	]);
	const RulerDimensionLine = createLucideIcon("ruler-dimension-line", [
		["path", {
			d: "M12 15v-3.014",
			key: "aw6ppf"
		}],
		["path", {
			d: "M16 15v-3.014",
			key: "9e0vc7"
		}],
		["path", {
			d: "M20 6H4",
			key: "1lfz86"
		}],
		["path", {
			d: "M20 8V4",
			key: "1l2g47"
		}],
		["path", {
			d: "M4 8V4",
			key: "sppxzt"
		}],
		["path", {
			d: "M8 15v-3.014",
			key: "when08"
		}],
		["rect", {
			x: "3",
			y: "12",
			width: "18",
			height: "7",
			rx: "1",
			key: "1ucwdz"
		}]
	]);
	const Ruler = createLucideIcon("ruler", [
		["path", {
			d: "M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z",
			key: "icamh8"
		}],
		["path", {
			d: "m14.5 12.5 2-2",
			key: "inckbg"
		}],
		["path", {
			d: "m11.5 9.5 2-2",
			key: "fmmyf7"
		}],
		["path", {
			d: "m8.5 6.5 2-2",
			key: "vc6u1g"
		}],
		["path", {
			d: "m17.5 15.5 2-2",
			key: "wo5hmg"
		}]
	]);
	const RussianRuble = createLucideIcon("russian-ruble", [["path", {
		d: "M6 11h8a4 4 0 0 0 0-8H9v18",
		key: "18ai8t"
	}], ["path", {
		d: "M6 15h8",
		key: "1y8f6l"
	}]]);
	const Sailboat = createLucideIcon("sailboat", [
		["path", {
			d: "M10 2v15",
			key: "1qf71f"
		}],
		["path", {
			d: "M7 22a4 4 0 0 1-4-4 1 1 0 0 1 1-1h16a1 1 0 0 1 1 1 4 4 0 0 1-4 4z",
			key: "1pxcvx"
		}],
		["path", {
			d: "M9.159 2.46a1 1 0 0 1 1.521-.193l9.977 8.98A1 1 0 0 1 20 13H4a1 1 0 0 1-.824-1.567z",
			key: "5oog16"
		}]
	]);
	const Salad = createLucideIcon("salad", [
		["path", {
			d: "M7 21h10",
			key: "1b0cd5"
		}],
		["path", {
			d: "M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z",
			key: "4rw317"
		}],
		["path", {
			d: "M11.38 12a2.4 2.4 0 0 1-.4-4.77 2.4 2.4 0 0 1 3.2-2.77 2.4 2.4 0 0 1 3.47-.63 2.4 2.4 0 0 1 3.37 3.37 2.4 2.4 0 0 1-1.1 3.7 2.51 2.51 0 0 1 .03 1.1",
			key: "10xrj0"
		}],
		["path", {
			d: "m13 12 4-4",
			key: "1hckqy"
		}],
		["path", {
			d: "M10.9 7.25A3.99 3.99 0 0 0 4 10c0 .73.2 1.41.54 2",
			key: "1p4srx"
		}]
	]);
	const Sandwich = createLucideIcon("sandwich", [
		["path", {
			d: "m2.37 11.223 8.372-6.777a2 2 0 0 1 2.516 0l8.371 6.777",
			key: "f1wd0e"
		}],
		["path", {
			d: "M21 15a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-5.25",
			key: "1pfu07"
		}],
		["path", {
			d: "M3 15a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h9",
			key: "1oq9qw"
		}],
		["path", {
			d: "m6.67 15 6.13 4.6a2 2 0 0 0 2.8-.4l3.15-4.2",
			key: "1fnwu5"
		}],
		["rect", {
			width: "20",
			height: "4",
			x: "2",
			y: "11",
			rx: "1",
			key: "itshg"
		}]
	]);
	const SatelliteDish = createLucideIcon("satellite-dish", [
		["path", {
			d: "M4 10a7.31 7.31 0 0 0 10 10Z",
			key: "1fzpp3"
		}],
		["path", {
			d: "m9 15 3-3",
			key: "88sc13"
		}],
		["path", {
			d: "M17 13a6 6 0 0 0-6-6",
			key: "15cc6u"
		}],
		["path", {
			d: "M21 13A10 10 0 0 0 11 3",
			key: "11nf8s"
		}]
	]);
	const Satellite = createLucideIcon("satellite", [
		["path", {
			d: "m13.5 6.5-3.148-3.148a1.205 1.205 0 0 0-1.704 0L6.352 5.648a1.205 1.205 0 0 0 0 1.704L9.5 10.5",
			key: "dzhfyz"
		}],
		["path", {
			d: "M16.5 7.5 19 5",
			key: "1ltcjm"
		}],
		["path", {
			d: "m17.5 10.5 3.148 3.148a1.205 1.205 0 0 1 0 1.704l-2.296 2.296a1.205 1.205 0 0 1-1.704 0L13.5 14.5",
			key: "nfoymv"
		}],
		["path", {
			d: "M9 21a6 6 0 0 0-6-6",
			key: "1iajcf"
		}],
		["path", {
			d: "M9.352 10.648a1.205 1.205 0 0 0 0 1.704l2.296 2.296a1.205 1.205 0 0 0 1.704 0l4.296-4.296a1.205 1.205 0 0 0 0-1.704l-2.296-2.296a1.205 1.205 0 0 0-1.704 0z",
			key: "nv9zqy"
		}]
	]);
	const SaudiRiyal = createLucideIcon("saudi-riyal", [
		["path", {
			d: "m20 19.5-5.5 1.2",
			key: "1aenhr"
		}],
		["path", {
			d: "M14.5 4v11.22a1 1 0 0 0 1.242.97L20 15.2",
			key: "2rtezt"
		}],
		["path", {
			d: "m2.978 19.351 5.549-1.363A2 2 0 0 0 10 16V2",
			key: "1kbm92"
		}],
		["path", {
			d: "M20 10 4 13.5",
			key: "8nums9"
		}]
	]);
	const SaveAll = createLucideIcon("save-all", [
		["path", {
			d: "M10 2v3a1 1 0 0 0 1 1h5",
			key: "1xspal"
		}],
		["path", {
			d: "M18 18v-6a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v6",
			key: "1ra60u"
		}],
		["path", {
			d: "M18 22H4a2 2 0 0 1-2-2V6",
			key: "pblm9e"
		}],
		["path", {
			d: "M8 18a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9.172a2 2 0 0 1 1.414.586l2.828 2.828A2 2 0 0 1 22 6.828V16a2 2 0 0 1-2.01 2z",
			key: "1yve0x"
		}]
	]);
	const SaveOff = createLucideIcon("save-off", [
		["path", {
			d: "M13 13H8a1 1 0 0 0-1 1v7",
			key: "h8g396"
		}],
		["path", {
			d: "M14 8h1",
			key: "1lfen6"
		}],
		["path", {
			d: "M17 21v-4",
			key: "1yknxs"
		}],
		["path", {
			d: "m2 2 20 20",
			key: "1ooewy"
		}],
		["path", {
			d: "M20.41 20.41A2 2 0 0 1 19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 .59-1.41",
			key: "1t4vdl"
		}],
		["path", {
			d: "M29.5 11.5s5 5 4 5",
			key: "zzn4i6"
		}],
		["path", {
			d: "M9 3h6.2a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V15",
			key: "24cby9"
		}]
	]);
	const Save = createLucideIcon("save", [
		["path", {
			d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
			key: "1c8476"
		}],
		["path", {
			d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7",
			key: "1ydtos"
		}],
		["path", {
			d: "M7 3v4a1 1 0 0 0 1 1h7",
			key: "t51u73"
		}]
	]);
	const Scale3d = createLucideIcon("scale-3d", [
		["path", {
			d: "M5 7v11a1 1 0 0 0 1 1h11",
			key: "13dt1j"
		}],
		["path", {
			d: "M5.293 18.707 11 13",
			key: "ezgbsx"
		}],
		["circle", {
			cx: "19",
			cy: "19",
			r: "2",
			key: "17f5cg"
		}],
		["circle", {
			cx: "5",
			cy: "5",
			r: "2",
			key: "1gwv83"
		}]
	]);
	const Scaling = createLucideIcon("scaling", [
		["path", {
			d: "M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7",
			key: "1m0v6g"
		}],
		["path", {
			d: "M14 15H9v-5",
			key: "pi4jk9"
		}],
		["path", {
			d: "M16 3h5v5",
			key: "1806ms"
		}],
		["path", {
			d: "M21 3 9 15",
			key: "15kdhq"
		}]
	]);
	const Scale = createLucideIcon("scale", [
		["path", {
			d: "m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z",
			key: "7g6ntu"
		}],
		["path", {
			d: "m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z",
			key: "ijws7r"
		}],
		["path", {
			d: "M7 21h10",
			key: "1b0cd5"
		}],
		["path", {
			d: "M12 3v18",
			key: "108xh3"
		}],
		["path", {
			d: "M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2",
			key: "3gwbw2"
		}]
	]);
	const ScanBarcode = createLucideIcon("scan-barcode", [
		["path", {
			d: "M3 7V5a2 2 0 0 1 2-2h2",
			key: "aa7l1z"
		}],
		["path", {
			d: "M17 3h2a2 2 0 0 1 2 2v2",
			key: "4qcy5o"
		}],
		["path", {
			d: "M21 17v2a2 2 0 0 1-2 2h-2",
			key: "6vwrx8"
		}],
		["path", {
			d: "M7 21H5a2 2 0 0 1-2-2v-2",
			key: "ioqczr"
		}],
		["path", {
			d: "M8 7v10",
			key: "23sfjj"
		}],
		["path", {
			d: "M12 7v10",
			key: "jspqdw"
		}],
		["path", {
			d: "M17 7v10",
			key: "578dap"
		}]
	]);
	const ScanEye = createLucideIcon("scan-eye", [
		["path", {
			d: "M3 7V5a2 2 0 0 1 2-2h2",
			key: "aa7l1z"
		}],
		["path", {
			d: "M17 3h2a2 2 0 0 1 2 2v2",
			key: "4qcy5o"
		}],
		["path", {
			d: "M21 17v2a2 2 0 0 1-2 2h-2",
			key: "6vwrx8"
		}],
		["path", {
			d: "M7 21H5a2 2 0 0 1-2-2v-2",
			key: "ioqczr"
		}],
		["circle", {
			cx: "12",
			cy: "12",
			r: "1",
			key: "41hilf"
		}],
		["path", {
			d: "M18.944 12.33a1 1 0 0 0 0-.66 7.5 7.5 0 0 0-13.888 0 1 1 0 0 0 0 .66 7.5 7.5 0 0 0 13.888 0",
			key: "11ak4c"
		}]
	]);
	const ScanFace = createLucideIcon("scan-face", [
		["path", {
			d: "M3 7V5a2 2 0 0 1 2-2h2",
			key: "aa7l1z"
		}],
		["path", {
			d: "M17 3h2a2 2 0 0 1 2 2v2",
			key: "4qcy5o"
		}],
		["path", {
			d: "M21 17v2a2 2 0 0 1-2 2h-2",
			key: "6vwrx8"
		}],
		["path", {
			d: "M7 21H5a2 2 0 0 1-2-2v-2",
			key: "ioqczr"
		}],
		["path", {
			d: "M8 14s1.5 2 4 2 4-2 4-2",
			key: "1y1vjs"
		}],
		["path", {
			d: "M9 9h.01",
			key: "1q5me6"
		}],
		["path", {
			d: "M15 9h.01",
			key: "x1ddxp"
		}]
	]);
	const ScanHeart = createLucideIcon("scan-heart", [
		["path", {
			d: "M17 3h2a2 2 0 0 1 2 2v2",
			key: "4qcy5o"
		}],
		["path", {
			d: "M21 17v2a2 2 0 0 1-2 2h-2",
			key: "6vwrx8"
		}],
		["path", {
			d: "M3 7V5a2 2 0 0 1 2-2h2",
			key: "aa7l1z"
		}],
		["path", {
			d: "M7 21H5a2 2 0 0 1-2-2v-2",
			key: "ioqczr"
		}],
		["path", {
			d: "M7.828 13.07A3 3 0 0 1 12 8.764a3 3 0 0 1 4.172 4.306l-3.447 3.62a1 1 0 0 1-1.449 0z",
			key: "1ak1ef"
		}]
	]);
	const ScanLine = createLucideIcon("scan-line", [
		["path", {
			d: "M3 7V5a2 2 0 0 1 2-2h2",
			key: "aa7l1z"
		}],
		["path", {
			d: "M17 3h2a2 2 0 0 1 2 2v2",
			key: "4qcy5o"
		}],
		["path", {
			d: "M21 17v2a2 2 0 0 1-2 2h-2",
			key: "6vwrx8"
		}],
		["path", {
			d: "M7 21H5a2 2 0 0 1-2-2v-2",
			key: "ioqczr"
		}],
		["path", {
			d: "M7 12h10",
			key: "b7w52i"
		}]
	]);
	const ScanQrCode = createLucideIcon("scan-qr-code", [
		["path", {
			d: "M17 12v4a1 1 0 0 1-1 1h-4",
			key: "uk4fdo"
		}],
		["path", {
			d: "M17 3h2a2 2 0 0 1 2 2v2",
			key: "4qcy5o"
		}],
		["path", {
			d: "M17 8V7",
			key: "q2g9wo"
		}],
		["path", {
			d: "M21 17v2a2 2 0 0 1-2 2h-2",
			key: "6vwrx8"
		}],
		["path", {
			d: "M3 7V5a2 2 0 0 1 2-2h2",
			key: "aa7l1z"
		}],
		["path", {
			d: "M7 17h.01",
			key: "19xn7k"
		}],
		["path", {
			d: "M7 21H5a2 2 0 0 1-2-2v-2",
			key: "ioqczr"
		}],
		["rect", {
			x: "7",
			y: "7",
			width: "5",
			height: "5",
			rx: "1",
			key: "m9kyts"
		}]
	]);
	const ScanSearch = createLucideIcon("scan-search", [
		["path", {
			d: "M3 7V5a2 2 0 0 1 2-2h2",
			key: "aa7l1z"
		}],
		["path", {
			d: "M17 3h2a2 2 0 0 1 2 2v2",
			key: "4qcy5o"
		}],
		["path", {
			d: "M21 17v2a2 2 0 0 1-2 2h-2",
			key: "6vwrx8"
		}],
		["path", {
			d: "M7 21H5a2 2 0 0 1-2-2v-2",
			key: "ioqczr"
		}],
		["circle", {
			cx: "12",
			cy: "12",
			r: "3",
			key: "1v7zrd"
		}],
		["path", {
			d: "m16 16-1.9-1.9",
			key: "1dq9hf"
		}]
	]);
	const ScanText = createLucideIcon("scan-text", [
		["path", {
			d: "M3 7V5a2 2 0 0 1 2-2h2",
			key: "aa7l1z"
		}],
		["path", {
			d: "M17 3h2a2 2 0 0 1 2 2v2",
			key: "4qcy5o"
		}],
		["path", {
			d: "M21 17v2a2 2 0 0 1-2 2h-2",
			key: "6vwrx8"
		}],
		["path", {
			d: "M7 21H5a2 2 0 0 1-2-2v-2",
			key: "ioqczr"
		}],
		["path", {
			d: "M7 8h8",
			key: "1jbsf9"
		}],
		["path", {
			d: "M7 12h10",
			key: "b7w52i"
		}],
		["path", {
			d: "M7 16h6",
			key: "1vyc9m"
		}]
	]);
	const Scan = createLucideIcon("scan", [
		["path", {
			d: "M3 7V5a2 2 0 0 1 2-2h2",
			key: "aa7l1z"
		}],
		["path", {
			d: "M17 3h2a2 2 0 0 1 2 2v2",
			key: "4qcy5o"
		}],
		["path", {
			d: "M21 17v2a2 2 0 0 1-2 2h-2",
			key: "6vwrx8"
		}],
		["path", {
			d: "M7 21H5a2 2 0 0 1-2-2v-2",
			key: "ioqczr"
		}]
	]);
	const School = createLucideIcon("school", [
		["path", {
			d: "M14 21v-3a2 2 0 0 0-4 0v3",
			key: "1rgiei"
		}],
		["path", {
			d: "M18 5v16",
			key: "1ethyx"
		}],
		["path", {
			d: "m4 6 7.106-3.79a2 2 0 0 1 1.788 0L20 6",
			key: "zywc2d"
		}],
		["path", {
			d: "m6 11-3.52 2.147a1 1 0 0 0-.48.854V19a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a1 1 0 0 0-.48-.853L18 11",
			key: "1d4ql0"
		}],
		["path", {
			d: "M6 5v16",
			key: "1sn0nx"
		}],
		["circle", {
			cx: "12",
			cy: "9",
			r: "2",
			key: "1092wv"
		}]
	]);
	const ScissorsLineDashed = createLucideIcon("scissors-line-dashed", [
		["path", {
			d: "M5.42 9.42 8 12",
			key: "12pkuq"
		}],
		["circle", {
			cx: "4",
			cy: "8",
			r: "2",
			key: "107mxr"
		}],
		["path", {
			d: "m14 6-8.58 8.58",
			key: "gvzu5l"
		}],
		["circle", {
			cx: "4",
			cy: "16",
			r: "2",
			key: "1ehqvc"
		}],
		["path", {
			d: "M10.8 14.8 14 18",
			key: "ax7m9r"
		}],
		["path", {
			d: "M16 12h-2",
			key: "10asgb"
		}],
		["path", {
			d: "M22 12h-2",
			key: "14jgyd"
		}]
	]);
	const Scissors = createLucideIcon("scissors", [
		["circle", {
			cx: "6",
			cy: "6",
			r: "3",
			key: "1lh9wr"
		}],
		["path", {
			d: "M8.12 8.12 12 12",
			key: "1alkpv"
		}],
		["path", {
			d: "M20 4 8.12 15.88",
			key: "xgtan2"
		}],
		["circle", {
			cx: "6",
			cy: "18",
			r: "3",
			key: "fqmcym"
		}],
		["path", {
			d: "M14.8 14.8 20 20",
			key: "ptml3r"
		}]
	]);
	const ScreenShareOff = createLucideIcon("screen-share-off", [
		["path", {
			d: "M13 3H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-3",
			key: "i8wdob"
		}],
		["path", {
			d: "M8 21h8",
			key: "1ev6f3"
		}],
		["path", {
			d: "M12 17v4",
			key: "1riwvh"
		}],
		["path", {
			d: "m22 3-5 5",
			key: "12jva0"
		}],
		["path", {
			d: "m17 3 5 5",
			key: "k36vhe"
		}]
	]);
	const ScreenShare = createLucideIcon("screen-share", [
		["path", {
			d: "M13 3H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-3",
			key: "i8wdob"
		}],
		["path", {
			d: "M8 21h8",
			key: "1ev6f3"
		}],
		["path", {
			d: "M12 17v4",
			key: "1riwvh"
		}],
		["path", {
			d: "m17 8 5-5",
			key: "fqif7o"
		}],
		["path", {
			d: "M17 3h5v5",
			key: "1o3tu8"
		}]
	]);
	const Scroll = createLucideIcon("scroll", [["path", {
		d: "M19 17V5a2 2 0 0 0-2-2H4",
		key: "zz82l3"
	}], ["path", {
		d: "M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3",
		key: "1ph1d7"
	}]]);
	const ScrollText = createLucideIcon("scroll-text", [
		["path", {
			d: "M15 12h-5",
			key: "r7krc0"
		}],
		["path", {
			d: "M15 8h-5",
			key: "1khuty"
		}],
		["path", {
			d: "M19 17V5a2 2 0 0 0-2-2H4",
			key: "zz82l3"
		}],
		["path", {
			d: "M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3",
			key: "1ph1d7"
		}]
	]);
	const SearchCheck = createLucideIcon("search-check", [
		["path", {
			d: "m8 11 2 2 4-4",
			key: "1sed1v"
		}],
		["circle", {
			cx: "11",
			cy: "11",
			r: "8",
			key: "4ej97u"
		}],
		["path", {
			d: "m21 21-4.3-4.3",
			key: "1qie3q"
		}]
	]);
	const SearchCode = createLucideIcon("search-code", [
		["path", {
			d: "m13 13.5 2-2.5-2-2.5",
			key: "1rvxrh"
		}],
		["path", {
			d: "m21 21-4.3-4.3",
			key: "1qie3q"
		}],
		["path", {
			d: "M9 8.5 7 11l2 2.5",
			key: "6ffwbx"
		}],
		["circle", {
			cx: "11",
			cy: "11",
			r: "8",
			key: "4ej97u"
		}]
	]);
	const SearchSlash = createLucideIcon("search-slash", [
		["path", {
			d: "m13.5 8.5-5 5",
			key: "1cs55j"
		}],
		["circle", {
			cx: "11",
			cy: "11",
			r: "8",
			key: "4ej97u"
		}],
		["path", {
			d: "m21 21-4.3-4.3",
			key: "1qie3q"
		}]
	]);
	const Search = createLucideIcon("search", [["path", {
		d: "m21 21-4.34-4.34",
		key: "14j7rj"
	}], ["circle", {
		cx: "11",
		cy: "11",
		r: "8",
		key: "4ej97u"
	}]]);
	const Section = createLucideIcon("section", [["path", {
		d: "M16 5a4 3 0 0 0-8 0c0 4 8 3 8 7a4 3 0 0 1-8 0",
		key: "vqan6v"
	}], ["path", {
		d: "M8 19a4 3 0 0 0 8 0c0-4-8-3-8-7a4 3 0 0 1 8 0",
		key: "wdjd8o"
	}]]);
	const SearchX = createLucideIcon("search-x", [
		["path", {
			d: "m13.5 8.5-5 5",
			key: "1cs55j"
		}],
		["path", {
			d: "m8.5 8.5 5 5",
			key: "a8mexj"
		}],
		["circle", {
			cx: "11",
			cy: "11",
			r: "8",
			key: "4ej97u"
		}],
		["path", {
			d: "m21 21-4.3-4.3",
			key: "1qie3q"
		}]
	]);
	const SendHorizontal = createLucideIcon("send-horizontal", [["path", {
		d: "M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z",
		key: "117uat"
	}], ["path", {
		d: "M6 12h16",
		key: "s4cdu5"
	}]]);
	const SendToBack = createLucideIcon("send-to-back", [
		["rect", {
			x: "14",
			y: "14",
			width: "8",
			height: "8",
			rx: "2",
			key: "1b0bso"
		}],
		["rect", {
			x: "2",
			y: "2",
			width: "8",
			height: "8",
			rx: "2",
			key: "1x09vl"
		}],
		["path", {
			d: "M7 14v1a2 2 0 0 0 2 2h1",
			key: "pao6x6"
		}],
		["path", {
			d: "M14 7h1a2 2 0 0 1 2 2v1",
			key: "19tdru"
		}]
	]);
	const Send = createLucideIcon("send", [["path", {
		d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
		key: "1ffxy3"
	}], ["path", {
		d: "m21.854 2.147-10.94 10.939",
		key: "12cjpa"
	}]]);
	const SeparatorHorizontal = createLucideIcon("separator-horizontal", [
		["path", {
			d: "m16 16-4 4-4-4",
			key: "3dv8je"
		}],
		["path", {
			d: "M3 12h18",
			key: "1i2n21"
		}],
		["path", {
			d: "m8 8 4-4 4 4",
			key: "2bscm2"
		}]
	]);
	const SeparatorVertical = createLucideIcon("separator-vertical", [
		["path", {
			d: "M12 3v18",
			key: "108xh3"
		}],
		["path", {
			d: "m16 16 4-4-4-4",
			key: "1js579"
		}],
		["path", {
			d: "m8 8-4 4 4 4",
			key: "1whems"
		}]
	]);
	const ServerCog = createLucideIcon("server-cog", [
		["path", {
			d: "m10.852 14.772-.383.923",
			key: "11vil6"
		}],
		["path", {
			d: "M13.148 14.772a3 3 0 1 0-2.296-5.544l-.383-.923",
			key: "1v3clb"
		}],
		["path", {
			d: "m13.148 9.228.383-.923",
			key: "t2zzyc"
		}],
		["path", {
			d: "m13.53 15.696-.382-.924a3 3 0 1 1-2.296-5.544",
			key: "1bxfiv"
		}],
		["path", {
			d: "m14.772 10.852.923-.383",
			key: "k9m8cz"
		}],
		["path", {
			d: "m14.772 13.148.923.383",
			key: "1xvhww"
		}],
		["path", {
			d: "M4.5 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-.5",
			key: "tn8das"
		}],
		["path", {
			d: "M4.5 14H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-.5",
			key: "1g2pve"
		}],
		["path", {
			d: "M6 18h.01",
			key: "uhywen"
		}],
		["path", {
			d: "M6 6h.01",
			key: "1utrut"
		}],
		["path", {
			d: "m9.228 10.852-.923-.383",
			key: "1wtb30"
		}],
		["path", {
			d: "m9.228 13.148-.923.383",
			key: "1a830x"
		}]
	]);
	const ServerCrash = createLucideIcon("server-crash", [
		["path", {
			d: "M6 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2",
			key: "4b9dqc"
		}],
		["path", {
			d: "M6 14H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2",
			key: "22nnkd"
		}],
		["path", {
			d: "M6 6h.01",
			key: "1utrut"
		}],
		["path", {
			d: "M6 18h.01",
			key: "uhywen"
		}],
		["path", {
			d: "m13 6-4 6h6l-4 6",
			key: "14hqih"
		}]
	]);
	const ServerOff = createLucideIcon("server-off", [
		["path", {
			d: "M7 2h13a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-5",
			key: "bt2siv"
		}],
		["path", {
			d: "M10 10 2.5 2.5C2 2 2 2.5 2 5v3a2 2 0 0 0 2 2h6z",
			key: "1hjrv1"
		}],
		["path", {
			d: "M22 17v-1a2 2 0 0 0-2-2h-1",
			key: "1iynyr"
		}],
		["path", {
			d: "M4 14a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16.5l1-.5.5.5-8-8H4z",
			key: "161ggg"
		}],
		["path", {
			d: "M6 18h.01",
			key: "uhywen"
		}],
		["path", {
			d: "m2 2 20 20",
			key: "1ooewy"
		}]
	]);
	const Server = createLucideIcon("server", [
		["rect", {
			width: "20",
			height: "8",
			x: "2",
			y: "2",
			rx: "2",
			ry: "2",
			key: "ngkwjq"
		}],
		["rect", {
			width: "20",
			height: "8",
			x: "2",
			y: "14",
			rx: "2",
			ry: "2",
			key: "iecqi9"
		}],
		["line", {
			x1: "6",
			x2: "6.01",
			y1: "6",
			y2: "6",
			key: "16zg32"
		}],
		["line", {
			x1: "6",
			x2: "6.01",
			y1: "18",
			y2: "18",
			key: "nzw8ys"
		}]
	]);
	const Settings2 = createLucideIcon("settings-2", [
		["path", {
			d: "M14 17H5",
			key: "gfn3mx"
		}],
		["path", {
			d: "M19 7h-9",
			key: "6i9tg"
		}],
		["circle", {
			cx: "17",
			cy: "17",
			r: "3",
			key: "18b49y"
		}],
		["circle", {
			cx: "7",
			cy: "7",
			r: "3",
			key: "dfmy0x"
		}]
	]);
	const Settings = createLucideIcon("settings", [["path", {
		d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",
		key: "1i5ecw"
	}], ["circle", {
		cx: "12",
		cy: "12",
		r: "3",
		key: "1v7zrd"
	}]]);
	const Shapes = createLucideIcon("shapes", [
		["path", {
			d: "M8.3 10a.7.7 0 0 1-.626-1.079L11.4 3a.7.7 0 0 1 1.198-.043L16.3 8.9a.7.7 0 0 1-.572 1.1Z",
			key: "1bo67w"
		}],
		["rect", {
			x: "3",
			y: "14",
			width: "7",
			height: "7",
			rx: "1",
			key: "1bkyp8"
		}],
		["circle", {
			cx: "17.5",
			cy: "17.5",
			r: "3.5",
			key: "w3z12y"
		}]
	]);
	const Share2 = createLucideIcon("share-2", [
		["circle", {
			cx: "18",
			cy: "5",
			r: "3",
			key: "gq8acd"
		}],
		["circle", {
			cx: "6",
			cy: "12",
			r: "3",
			key: "w7nqdw"
		}],
		["circle", {
			cx: "18",
			cy: "19",
			r: "3",
			key: "1xt0gg"
		}],
		["line", {
			x1: "8.59",
			x2: "15.42",
			y1: "13.51",
			y2: "17.49",
			key: "47mynk"
		}],
		["line", {
			x1: "15.41",
			x2: "8.59",
			y1: "6.51",
			y2: "10.49",
			key: "1n3mei"
		}]
	]);
	const Share = createLucideIcon("share", [
		["path", {
			d: "M12 2v13",
			key: "1km8f5"
		}],
		["path", {
			d: "m16 6-4-4-4 4",
			key: "13yo43"
		}],
		["path", {
			d: "M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8",
			key: "1b2hhj"
		}]
	]);
	const Shell = createLucideIcon("shell", [["path", {
		d: "M14 11a2 2 0 1 1-4 0 4 4 0 0 1 8 0 6 6 0 0 1-12 0 8 8 0 0 1 16 0 10 10 0 1 1-20 0 11.93 11.93 0 0 1 2.42-7.22 2 2 0 1 1 3.16 2.44",
		key: "1cn552"
	}]]);
	const Sheet = createLucideIcon("sheet", [
		["rect", {
			width: "18",
			height: "18",
			x: "3",
			y: "3",
			rx: "2",
			ry: "2",
			key: "1m3agn"
		}],
		["line", {
			x1: "3",
			x2: "21",
			y1: "9",
			y2: "9",
			key: "1vqk6q"
		}],
		["line", {
			x1: "3",
			x2: "21",
			y1: "15",
			y2: "15",
			key: "o2sbyz"
		}],
		["line", {
			x1: "9",
			x2: "9",
			y1: "9",
			y2: "21",
			key: "1ib60c"
		}],
		["line", {
			x1: "15",
			x2: "15",
			y1: "9",
			y2: "21",
			key: "1n26ft"
		}]
	]);
	const ShieldAlert = createLucideIcon("shield-alert", [
		["path", {
			d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
			key: "oel41y"
		}],
		["path", {
			d: "M12 8v4",
			key: "1got3b"
		}],
		["path", {
			d: "M12 16h.01",
			key: "1drbdi"
		}]
	]);
	const ShieldBan = createLucideIcon("shield-ban", [["path", {
		d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
		key: "oel41y"
	}], ["path", {
		d: "m4.243 5.21 14.39 12.472",
		key: "1c9a7c"
	}]]);
	const ShieldCheck = createLucideIcon("shield-check", [["path", {
		d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
		key: "oel41y"
	}], ["path", {
		d: "m9 12 2 2 4-4",
		key: "dzmm74"
	}]]);
	const ShieldEllipsis = createLucideIcon("shield-ellipsis", [
		["path", {
			d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
			key: "oel41y"
		}],
		["path", {
			d: "M8 12h.01",
			key: "czm47f"
		}],
		["path", {
			d: "M12 12h.01",
			key: "1mp3jc"
		}],
		["path", {
			d: "M16 12h.01",
			key: "1l6xoz"
		}]
	]);
	const ShieldHalf = createLucideIcon("shield-half", [["path", {
		d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
		key: "oel41y"
	}], ["path", {
		d: "M12 22V2",
		key: "zs6s6o"
	}]]);
	const ShieldMinus = createLucideIcon("shield-minus", [["path", {
		d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
		key: "oel41y"
	}], ["path", {
		d: "M9 12h6",
		key: "1c52cq"
	}]]);
	const ShieldOff = createLucideIcon("shield-off", [
		["path", {
			d: "m2 2 20 20",
			key: "1ooewy"
		}],
		["path", {
			d: "M5 5a1 1 0 0 0-1 1v7c0 5 3.5 7.5 7.67 8.94a1 1 0 0 0 .67.01c2.35-.82 4.48-1.97 5.9-3.71",
			key: "1jlk70"
		}],
		["path", {
			d: "M9.309 3.652A12.252 12.252 0 0 0 11.24 2.28a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1v7a9.784 9.784 0 0 1-.08 1.264",
			key: "18rp1v"
		}]
	]);
	const ShieldPlus = createLucideIcon("shield-plus", [
		["path", {
			d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
			key: "oel41y"
		}],
		["path", {
			d: "M9 12h6",
			key: "1c52cq"
		}],
		["path", {
			d: "M12 9v6",
			key: "199k2o"
		}]
	]);
	const ShieldQuestionMark = createLucideIcon("shield-question-mark", [
		["path", {
			d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
			key: "oel41y"
		}],
		["path", {
			d: "M9.1 9a3 3 0 0 1 5.82 1c0 2-3 3-3 3",
			key: "mhlwft"
		}],
		["path", {
			d: "M12 17h.01",
			key: "p32p05"
		}]
	]);
	const ShieldX = createLucideIcon("shield-x", [
		["path", {
			d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
			key: "oel41y"
		}],
		["path", {
			d: "m14.5 9.5-5 5",
			key: "17q4r4"
		}],
		["path", {
			d: "m9.5 9.5 5 5",
			key: "18nt4w"
		}]
	]);
	const Shield = createLucideIcon("shield", [["path", {
		d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
		key: "oel41y"
	}]]);
	const ShieldUser = createLucideIcon("shield-user", [
		["path", {
			d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
			key: "oel41y"
		}],
		["path", {
			d: "M6.376 18.91a6 6 0 0 1 11.249.003",
			key: "hnjrf2"
		}],
		["circle", {
			cx: "12",
			cy: "11",
			r: "4",
			key: "1gt34v"
		}]
	]);
	const ShipWheel = createLucideIcon("ship-wheel", [
		["circle", {
			cx: "12",
			cy: "12",
			r: "8",
			key: "46899m"
		}],
		["path", {
			d: "M12 2v7.5",
			key: "1e5rl5"
		}],
		["path", {
			d: "m19 5-5.23 5.23",
			key: "1ezxxf"
		}],
		["path", {
			d: "M22 12h-7.5",
			key: "le1719"
		}],
		["path", {
			d: "m19 19-5.23-5.23",
			key: "p3fmgn"
		}],
		["path", {
			d: "M12 14.5V22",
			key: "dgcmos"
		}],
		["path", {
			d: "M10.23 13.77 5 19",
			key: "qwopd4"
		}],
		["path", {
			d: "M9.5 12H2",
			key: "r7bup8"
		}],
		["path", {
			d: "M10.23 10.23 5 5",
			key: "k2y7lj"
		}],
		["circle", {
			cx: "12",
			cy: "12",
			r: "2.5",
			key: "ix0uyj"
		}]
	]);
	const Ship = createLucideIcon("ship", [
		["path", {
			d: "M12 10.189V14",
			key: "1p8cqu"
		}],
		["path", {
			d: "M12 2v3",
			key: "qbqxhf"
		}],
		["path", {
			d: "M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6",
			key: "qpkstq"
		}],
		["path", {
			d: "M19.38 20A11.6 11.6 0 0 0 21 14l-8.188-3.639a2 2 0 0 0-1.624 0L3 14a11.6 11.6 0 0 0 2.81 7.76",
			key: "7tigtc"
		}],
		["path", {
			d: "M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1s1.2 1 2.5 1c2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",
			key: "1924j5"
		}]
	]);
	const Shirt = createLucideIcon("shirt", [["path", {
		d: "M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z",
		key: "1wgbhj"
	}]]);
	const ShoppingBasket = createLucideIcon("shopping-basket", [
		["path", {
			d: "m15 11-1 9",
			key: "5wnq3a"
		}],
		["path", {
			d: "m19 11-4-7",
			key: "cnml18"
		}],
		["path", {
			d: "M2 11h20",
			key: "3eubbj"
		}],
		["path", {
			d: "m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4",
			key: "yiazzp"
		}],
		["path", {
			d: "M4.5 15.5h15",
			key: "13mye1"
		}],
		["path", {
			d: "m5 11 4-7",
			key: "116ra9"
		}],
		["path", {
			d: "m9 11 1 9",
			key: "1ojof7"
		}]
	]);
	const ShoppingBag = createLucideIcon("shopping-bag", [
		["path", {
			d: "M16 10a4 4 0 0 1-8 0",
			key: "1ltviw"
		}],
		["path", {
			d: "M3.103 6.034h17.794",
			key: "awc11p"
		}],
		["path", {
			d: "M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z",
			key: "o988cm"
		}]
	]);
	const ShoppingCart = createLucideIcon("shopping-cart", [
		["circle", {
			cx: "8",
			cy: "21",
			r: "1",
			key: "jimo8o"
		}],
		["circle", {
			cx: "19",
			cy: "21",
			r: "1",
			key: "13723u"
		}],
		["path", {
			d: "M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12",
			key: "9zh506"
		}]
	]);
	const Shovel = createLucideIcon("shovel", [
		["path", {
			d: "M21.56 4.56a1.5 1.5 0 0 1 0 2.122l-.47.47a3 3 0 0 1-4.212-.03 3 3 0 0 1 0-4.243l.44-.44a1.5 1.5 0 0 1 2.121 0z",
			key: "1gcedi"
		}],
		["path", {
			d: "M3 22a1 1 0 0 1-1-1v-3.586a1 1 0 0 1 .293-.707l3.355-3.355a1.205 1.205 0 0 1 1.704 0l3.296 3.296a1.205 1.205 0 0 1 0 1.704l-3.355 3.355a1 1 0 0 1-.707.293z",
			key: "pg9kv3"
		}],
		["path", {
			d: "m9 15 7.879-7.878",
			key: "1o1zgh"
		}]
	]);
	const ShowerHead = createLucideIcon("shower-head", [
		["path", {
			d: "m4 4 2.5 2.5",
			key: "uv2vmf"
		}],
		["path", {
			d: "M13.5 6.5a4.95 4.95 0 0 0-7 7",
			key: "frdkwv"
		}],
		["path", {
			d: "M15 5 5 15",
			key: "1ag8rq"
		}],
		["path", {
			d: "M14 17v.01",
			key: "eokfpp"
		}],
		["path", {
			d: "M10 16v.01",
			key: "14uyyl"
		}],
		["path", {
			d: "M13 13v.01",
			key: "1v1k97"
		}],
		["path", {
			d: "M16 10v.01",
			key: "5169yg"
		}],
		["path", {
			d: "M11 20v.01",
			key: "cj92p8"
		}],
		["path", {
			d: "M17 14v.01",
			key: "11cswd"
		}],
		["path", {
			d: "M20 11v.01",
			key: "19e0od"
		}]
	]);
	const Shredder = createLucideIcon("shredder", [
		["path", {
			d: "M10 22v-5",
			key: "sfixh4"
		}],
		["path", {
			d: "M14 19v-2",
			key: "pdve8j"
		}],
		["path", {
			d: "M14 2v4a2 2 0 0 0 2 2h4",
			key: "tnqrlb"
		}],
		["path", {
			d: "M18 20v-3",
			key: "uox2gk"
		}],
		["path", {
			d: "M2 13h20",
			key: "5evz65"
		}],
		["path", {
			d: "M20 13V7l-5-5H6a2 2 0 0 0-2 2v9",
			key: "1rnpe2"
		}],
		["path", {
			d: "M6 20v-3",
			key: "c6pdcb"
		}]
	]);
	const Shrimp = createLucideIcon("shrimp", [
		["path", {
			d: "M11 12h.01",
			key: "1lr4k6"
		}],
		["path", {
			d: "M13 22c.5-.5 1.12-1 2.5-1-1.38 0-2-.5-2.5-1",
			key: "fatpdi"
		}],
		["path", {
			d: "M14 2a3.28 3.28 0 0 1-3.227 1.798l-6.17-.561A2.387 2.387 0 1 0 4.387 8H15.5a1 1 0 0 1 0 13 1 1 0 0 0 0-5H12a7 7 0 0 1-7-7V8",
			key: "kehrqe"
		}],
		["path", {
			d: "M14 8a8.5 8.5 0 0 1 0 8",
			key: "1imjx2"
		}],
		["path", {
			d: "M16 16c2 0 4.5-4 4-6",
			key: "z0nejz"
		}]
	]);
	const Shrink = createLucideIcon("shrink", [
		["path", {
			d: "m15 15 6 6m-6-6v4.8m0-4.8h4.8",
			key: "17vawe"
		}],
		["path", {
			d: "M9 19.8V15m0 0H4.2M9 15l-6 6",
			key: "chjx8e"
		}],
		["path", {
			d: "M15 4.2V9m0 0h4.8M15 9l6-6",
			key: "lav6yq"
		}],
		["path", {
			d: "M9 4.2V9m0 0H4.2M9 9 3 3",
			key: "1pxi2q"
		}]
	]);
	const Shrub = createLucideIcon("shrub", [
		["path", {
			d: "M12 22v-5.172a2 2 0 0 0-.586-1.414L9.5 13.5",
			key: "1p17fm"
		}],
		["path", {
			d: "M14.5 14.5 12 17",
			key: "dy5w4y"
		}],
		["path", {
			d: "M17 8.8A6 6 0 0 1 13.8 20H10A6.5 6.5 0 0 1 7 8a5 5 0 0 1 10 0z",
			key: "6z7b3o"
		}]
	]);
	const Shuffle = createLucideIcon("shuffle", [
		["path", {
			d: "m18 14 4 4-4 4",
			key: "10pe0f"
		}],
		["path", {
			d: "m18 2 4 4-4 4",
			key: "pucp1d"
		}],
		["path", {
			d: "M2 18h1.973a4 4 0 0 0 3.3-1.7l5.454-8.6a4 4 0 0 1 3.3-1.7H22",
			key: "1ailkh"
		}],
		["path", {
			d: "M2 6h1.972a4 4 0 0 1 3.6 2.2",
			key: "km57vx"
		}],
		["path", {
			d: "M22 18h-6.041a4 4 0 0 1-3.3-1.8l-.359-.45",
			key: "os18l9"
		}]
	]);
	const Sigma = createLucideIcon("sigma", [["path", {
		d: "M18 7V5a1 1 0 0 0-1-1H6.5a.5.5 0 0 0-.4.8l4.5 6a2 2 0 0 1 0 2.4l-4.5 6a.5.5 0 0 0 .4.8H17a1 1 0 0 0 1-1v-2",
		key: "wuwx1p"
	}]]);
	const SignalHigh = createLucideIcon("signal-high", [
		["path", {
			d: "M2 20h.01",
			key: "4haj6o"
		}],
		["path", {
			d: "M7 20v-4",
			key: "j294jx"
		}],
		["path", {
			d: "M12 20v-8",
			key: "i3yub9"
		}],
		["path", {
			d: "M17 20V8",
			key: "1tkaf5"
		}]
	]);
	const SignalLow = createLucideIcon("signal-low", [["path", {
		d: "M2 20h.01",
		key: "4haj6o"
	}], ["path", {
		d: "M7 20v-4",
		key: "j294jx"
	}]]);
	const SignalMedium = createLucideIcon("signal-medium", [
		["path", {
			d: "M2 20h.01",
			key: "4haj6o"
		}],
		["path", {
			d: "M7 20v-4",
			key: "j294jx"
		}],
		["path", {
			d: "M12 20v-8",
			key: "i3yub9"
		}]
	]);
	const SignalZero = createLucideIcon("signal-zero", [["path", {
		d: "M2 20h.01",
		key: "4haj6o"
	}]]);
	const Signal = createLucideIcon("signal", [
		["path", {
			d: "M2 20h.01",
			key: "4haj6o"
		}],
		["path", {
			d: "M7 20v-4",
			key: "j294jx"
		}],
		["path", {
			d: "M12 20v-8",
			key: "i3yub9"
		}],
		["path", {
			d: "M17 20V8",
			key: "1tkaf5"
		}],
		["path", {
			d: "M22 4v16",
			key: "sih9yq"
		}]
	]);
	const Signature = createLucideIcon("signature", [["path", {
		d: "m21 17-2.156-1.868A.5.5 0 0 0 18 15.5v.5a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1c0-2.545-3.991-3.97-8.5-4a1 1 0 0 0 0 5c4.153 0 4.745-11.295 5.708-13.5a2.5 2.5 0 1 1 3.31 3.284",
		key: "y32ogt"
	}], ["path", {
		d: "M3 21h18",
		key: "itz85i"
	}]]);
	const SignpostBig = createLucideIcon("signpost-big", [
		["path", {
			d: "M10 9H4L2 7l2-2h6",
			key: "1hq7x2"
		}],
		["path", {
			d: "M14 5h6l2 2-2 2h-6",
			key: "bv62ej"
		}],
		["path", {
			d: "M10 22V4a2 2 0 1 1 4 0v18",
			key: "eqpcf2"
		}],
		["path", {
			d: "M8 22h8",
			key: "rmew8v"
		}]
	]);
	const Signpost = createLucideIcon("signpost", [
		["path", {
			d: "M12 13v8",
			key: "1l5pq0"
		}],
		["path", {
			d: "M12 3v3",
			key: "1n5kay"
		}],
		["path", {
			d: "M18 6a2 2 0 0 1 1.387.56l2.307 2.22a1 1 0 0 1 0 1.44l-2.307 2.22A2 2 0 0 1 18 13H6a2 2 0 0 1-1.387-.56l-2.306-2.22a1 1 0 0 1 0-1.44l2.306-2.22A2 2 0 0 1 6 6z",
			key: "gqqp9m"
		}]
	]);
	const Siren = createLucideIcon("siren", [
		["path", {
			d: "M7 18v-6a5 5 0 1 1 10 0v6",
			key: "pcx96s"
		}],
		["path", {
			d: "M5 21a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-1a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2z",
			key: "1b4s83"
		}],
		["path", {
			d: "M21 12h1",
			key: "jtio3y"
		}],
		["path", {
			d: "M18.5 4.5 18 5",
			key: "g5sp9y"
		}],
		["path", {
			d: "M2 12h1",
			key: "1uaihz"
		}],
		["path", {
			d: "M12 2v1",
			key: "11qlp1"
		}],
		["path", {
			d: "m4.929 4.929.707.707",
			key: "1i51kw"
		}],
		["path", {
			d: "M12 12v6",
			key: "3ahymv"
		}]
	]);
	const SkipBack = createLucideIcon("skip-back", [["path", {
		d: "M17.971 4.285A2 2 0 0 1 21 6v12a2 2 0 0 1-3.029 1.715l-9.997-5.998a2 2 0 0 1-.003-3.432z",
		key: "15892j"
	}], ["path", {
		d: "M3 20V4",
		key: "1ptbpl"
	}]]);
	const Skull = createLucideIcon("skull", [
		["path", {
			d: "m12.5 17-.5-1-.5 1h1z",
			key: "3me087"
		}],
		["path", {
			d: "M15 22a1 1 0 0 0 1-1v-1a2 2 0 0 0 1.56-3.25 8 8 0 1 0-11.12 0A2 2 0 0 0 8 20v1a1 1 0 0 0 1 1z",
			key: "1o5pge"
		}],
		["circle", {
			cx: "15",
			cy: "12",
			r: "1",
			key: "1tmaij"
		}],
		["circle", {
			cx: "9",
			cy: "12",
			r: "1",
			key: "1vctgf"
		}]
	]);
	const SkipForward = createLucideIcon("skip-forward", [["path", {
		d: "M21 4v16",
		key: "7j8fe9"
	}], ["path", {
		d: "M6.029 4.285A2 2 0 0 0 3 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z",
		key: "zs4d6"
	}]]);
	const Slack = createLucideIcon("slack", [
		["rect", {
			width: "3",
			height: "8",
			x: "13",
			y: "2",
			rx: "1.5",
			key: "diqz80"
		}],
		["path", {
			d: "M19 8.5V10h1.5A1.5 1.5 0 1 0 19 8.5",
			key: "183iwg"
		}],
		["rect", {
			width: "3",
			height: "8",
			x: "8",
			y: "14",
			rx: "1.5",
			key: "hqg7r1"
		}],
		["path", {
			d: "M5 15.5V14H3.5A1.5 1.5 0 1 0 5 15.5",
			key: "76g71w"
		}],
		["rect", {
			width: "8",
			height: "3",
			x: "14",
			y: "13",
			rx: "1.5",
			key: "1kmz0a"
		}],
		["path", {
			d: "M15.5 19H14v1.5a1.5 1.5 0 1 0 1.5-1.5",
			key: "jc4sz0"
		}],
		["rect", {
			width: "8",
			height: "3",
			x: "2",
			y: "8",
			rx: "1.5",
			key: "1omvl4"
		}],
		["path", {
			d: "M8.5 5H10V3.5A1.5 1.5 0 1 0 8.5 5",
			key: "16f3cl"
		}]
	]);
	const Slash = createLucideIcon("slash", [["path", {
		d: "M22 2 2 22",
		key: "y4kqgn"
	}]]);
	const Slice = createLucideIcon("slice", [["path", {
		d: "M11 16.586V19a1 1 0 0 1-1 1H2L18.37 3.63a1 1 0 1 1 3 3l-9.663 9.663a1 1 0 0 1-1.414 0L8 14",
		key: "1sllp5"
	}]]);
	const SlidersVertical = createLucideIcon("sliders-vertical", [
		["path", {
			d: "M10 8h4",
			key: "1sr2af"
		}],
		["path", {
			d: "M12 21v-9",
			key: "17s77i"
		}],
		["path", {
			d: "M12 8V3",
			key: "13r4qs"
		}],
		["path", {
			d: "M17 16h4",
			key: "h1uq16"
		}],
		["path", {
			d: "M19 12V3",
			key: "o1uvq1"
		}],
		["path", {
			d: "M19 21v-5",
			key: "qua636"
		}],
		["path", {
			d: "M3 14h4",
			key: "bcjad9"
		}],
		["path", {
			d: "M5 10V3",
			key: "cb8scm"
		}],
		["path", {
			d: "M5 21v-7",
			key: "1w1uti"
		}]
	]);
	const SlidersHorizontal = createLucideIcon("sliders-horizontal", [
		["path", {
			d: "M10 5H3",
			key: "1qgfaw"
		}],
		["path", {
			d: "M12 19H3",
			key: "yhmn1j"
		}],
		["path", {
			d: "M14 3v4",
			key: "1sua03"
		}],
		["path", {
			d: "M16 17v4",
			key: "1q0r14"
		}],
		["path", {
			d: "M21 12h-9",
			key: "1o4lsq"
		}],
		["path", {
			d: "M21 19h-5",
			key: "1rlt1p"
		}],
		["path", {
			d: "M21 5h-7",
			key: "1oszz2"
		}],
		["path", {
			d: "M8 10v4",
			key: "tgpxqk"
		}],
		["path", {
			d: "M8 12H3",
			key: "a7s4jb"
		}]
	]);
	const SmartphoneCharging = createLucideIcon("smartphone-charging", [["rect", {
		width: "14",
		height: "20",
		x: "5",
		y: "2",
		rx: "2",
		ry: "2",
		key: "1yt0o3"
	}], ["path", {
		d: "M12.667 8 10 12h4l-2.667 4",
		key: "h9lk2d"
	}]]);
	const SmartphoneNfc = createLucideIcon("smartphone-nfc", [
		["rect", {
			width: "7",
			height: "12",
			x: "2",
			y: "6",
			rx: "1",
			key: "5nje8w"
		}],
		["path", {
			d: "M13 8.32a7.43 7.43 0 0 1 0 7.36",
			key: "1g306n"
		}],
		["path", {
			d: "M16.46 6.21a11.76 11.76 0 0 1 0 11.58",
			key: "uqvjvo"
		}],
		["path", {
			d: "M19.91 4.1a15.91 15.91 0 0 1 .01 15.8",
			key: "ujntz3"
		}]
	]);
	const Smartphone = createLucideIcon("smartphone", [["rect", {
		width: "14",
		height: "20",
		x: "5",
		y: "2",
		rx: "2",
		ry: "2",
		key: "1yt0o3"
	}], ["path", {
		d: "M12 18h.01",
		key: "mhygvu"
	}]]);
	const SmilePlus = createLucideIcon("smile-plus", [
		["path", {
			d: "M22 11v1a10 10 0 1 1-9-10",
			key: "ew0xw9"
		}],
		["path", {
			d: "M8 14s1.5 2 4 2 4-2 4-2",
			key: "1y1vjs"
		}],
		["line", {
			x1: "9",
			x2: "9.01",
			y1: "9",
			y2: "9",
			key: "yxxnd0"
		}],
		["line", {
			x1: "15",
			x2: "15.01",
			y1: "9",
			y2: "9",
			key: "1p4y9e"
		}],
		["path", {
			d: "M16 5h6",
			key: "1vod17"
		}],
		["path", {
			d: "M19 2v6",
			key: "4bpg5p"
		}]
	]);
	const Smile = createLucideIcon("smile", [
		["circle", {
			cx: "12",
			cy: "12",
			r: "10",
			key: "1mglay"
		}],
		["path", {
			d: "M8 14s1.5 2 4 2 4-2 4-2",
			key: "1y1vjs"
		}],
		["line", {
			x1: "9",
			x2: "9.01",
			y1: "9",
			y2: "9",
			key: "yxxnd0"
		}],
		["line", {
			x1: "15",
			x2: "15.01",
			y1: "9",
			y2: "9",
			key: "1p4y9e"
		}]
	]);
	const Snail = createLucideIcon("snail", [
		["path", {
			d: "M2 13a6 6 0 1 0 12 0 4 4 0 1 0-8 0 2 2 0 0 0 4 0",
			key: "hneq2s"
		}],
		["circle", {
			cx: "10",
			cy: "13",
			r: "8",
			key: "194lz3"
		}],
		["path", {
			d: "M2 21h12c4.4 0 8-3.6 8-8V7a2 2 0 1 0-4 0v6",
			key: "ixqyt7"
		}],
		["path", {
			d: "M18 3 19.1 5.2",
			key: "9tjm43"
		}],
		["path", {
			d: "M22 3 20.9 5.2",
			key: "j3odrs"
		}]
	]);
	const Snowflake = createLucideIcon("snowflake", [
		["path", {
			d: "m10 20-1.25-2.5L6 18",
			key: "18frcb"
		}],
		["path", {
			d: "M10 4 8.75 6.5 6 6",
			key: "7mghy3"
		}],
		["path", {
			d: "m14 20 1.25-2.5L18 18",
			key: "1chtki"
		}],
		["path", {
			d: "m14 4 1.25 2.5L18 6",
			key: "1b4wsy"
		}],
		["path", {
			d: "m17 21-3-6h-4",
			key: "15hhxa"
		}],
		["path", {
			d: "m17 3-3 6 1.5 3",
			key: "11697g"
		}],
		["path", {
			d: "M2 12h6.5L10 9",
			key: "kv9z4n"
		}],
		["path", {
			d: "m20 10-1.5 2 1.5 2",
			key: "1swlpi"
		}],
		["path", {
			d: "M22 12h-6.5L14 15",
			key: "1mxi28"
		}],
		["path", {
			d: "m4 10 1.5 2L4 14",
			key: "k9enpj"
		}],
		["path", {
			d: "m7 21 3-6-1.5-3",
			key: "j8hb9u"
		}],
		["path", {
			d: "m7 3 3 6h4",
			key: "1otusx"
		}]
	]);
	const SoapDispenserDroplet = createLucideIcon("soap-dispenser-droplet", [
		["path", {
			d: "M10.5 2v4",
			key: "1xt6in"
		}],
		["path", {
			d: "M14 2H7a2 2 0 0 0-2 2",
			key: "e6xig3"
		}],
		["path", {
			d: "M19.29 14.76A6.67 6.67 0 0 1 17 11a6.6 6.6 0 0 1-2.29 3.76c-1.15.92-1.71 2.04-1.71 3.19 0 2.22 1.8 4.05 4 4.05s4-1.83 4-4.05c0-1.16-.57-2.26-1.71-3.19",
			key: "adq7uc"
		}],
		["path", {
			d: "M9.607 21H6a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h7V7a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3",
			key: "t9hm96"
		}]
	]);
	const Sofa = createLucideIcon("sofa", [
		["path", {
			d: "M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3",
			key: "1dgpiv"
		}],
		["path", {
			d: "M2 16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1.5a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5V11a2 2 0 0 0-4 0z",
			key: "xacw8m"
		}],
		["path", {
			d: "M4 18v2",
			key: "jwo5n2"
		}],
		["path", {
			d: "M20 18v2",
			key: "1ar1qi"
		}],
		["path", {
			d: "M12 4v9",
			key: "oqhhn3"
		}]
	]);
	const Soup = createLucideIcon("soup", [
		["path", {
			d: "M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z",
			key: "4rw317"
		}],
		["path", {
			d: "M7 21h10",
			key: "1b0cd5"
		}],
		["path", {
			d: "M19.5 12 22 6",
			key: "shfsr5"
		}],
		["path", {
			d: "M16.25 3c.27.1.8.53.75 1.36-.06.83-.93 1.2-1 2.02-.05.78.34 1.24.73 1.62",
			key: "rpc6vp"
		}],
		["path", {
			d: "M11.25 3c.27.1.8.53.74 1.36-.05.83-.93 1.2-.98 2.02-.06.78.33 1.24.72 1.62",
			key: "1lf63m"
		}],
		["path", {
			d: "M6.25 3c.27.1.8.53.75 1.36-.06.83-.93 1.2-1 2.02-.05.78.34 1.24.74 1.62",
			key: "97tijn"
		}]
	]);
	const Spade = createLucideIcon("spade", [["path", {
		d: "M12 18v4",
		key: "jadmvz"
	}], ["path", {
		d: "M2 14.499a5.5 5.5 0 0 0 9.591 3.675.6.6 0 0 1 .818.001A5.5 5.5 0 0 0 22 14.5c0-2.29-1.5-4-3-5.5l-5.492-5.312a2 2 0 0 0-3-.02L5 8.999c-1.5 1.5-3 3.2-3 5.5",
		key: "1aw2pz"
	}]]);
	const Space = createLucideIcon("space", [["path", {
		d: "M22 17v1c0 .5-.5 1-1 1H3c-.5 0-1-.5-1-1v-1",
		key: "lt2kga"
	}]]);
	const Sparkle = createLucideIcon("sparkle", [["path", {
		d: "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",
		key: "1s2grr"
	}]]);
	const Sparkles = createLucideIcon("sparkles", [
		["path", {
			d: "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",
			key: "1s2grr"
		}],
		["path", {
			d: "M20 2v4",
			key: "1rf3ol"
		}],
		["path", {
			d: "M22 4h-4",
			key: "gwowj6"
		}],
		["circle", {
			cx: "4",
			cy: "20",
			r: "2",
			key: "6kqj1y"
		}]
	]);
	const Speaker = createLucideIcon("speaker", [
		["rect", {
			width: "16",
			height: "20",
			x: "4",
			y: "2",
			rx: "2",
			key: "1nb95v"
		}],
		["path", {
			d: "M12 6h.01",
			key: "1vi96p"
		}],
		["circle", {
			cx: "12",
			cy: "14",
			r: "4",
			key: "1jruaj"
		}],
		["path", {
			d: "M12 14h.01",
			key: "1etili"
		}]
	]);
	const Speech = createLucideIcon("speech", [
		["path", {
			d: "M8.8 20v-4.1l1.9.2a2.3 2.3 0 0 0 2.164-2.1V8.3A5.37 5.37 0 0 0 2 8.25c0 2.8.656 3.054 1 4.55a5.77 5.77 0 0 1 .029 2.758L2 20",
			key: "11atix"
		}],
		["path", {
			d: "M19.8 17.8a7.5 7.5 0 0 0 .003-10.603",
			key: "yol142"
		}],
		["path", {
			d: "M17 15a3.5 3.5 0 0 0-.025-4.975",
			key: "ssbmkc"
		}]
	]);
	const SpellCheck2 = createLucideIcon("spell-check-2", [
		["path", {
			d: "m6 16 6-12 6 12",
			key: "1b4byz"
		}],
		["path", {
			d: "M8 12h8",
			key: "1wcyev"
		}],
		["path", {
			d: "M4 21c1.1 0 1.1-1 2.3-1s1.1 1 2.3 1c1.1 0 1.1-1 2.3-1 1.1 0 1.1 1 2.3 1 1.1 0 1.1-1 2.3-1 1.1 0 1.1 1 2.3 1 1.1 0 1.1-1 2.3-1",
			key: "8mdmtu"
		}]
	]);
	const SpellCheck = createLucideIcon("spell-check", [
		["path", {
			d: "m6 16 6-12 6 12",
			key: "1b4byz"
		}],
		["path", {
			d: "M8 12h8",
			key: "1wcyev"
		}],
		["path", {
			d: "m16 20 2 2 4-4",
			key: "13tcca"
		}]
	]);
	const SplinePointer = createLucideIcon("spline-pointer", [
		["path", {
			d: "M12.034 12.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.943l-3.444 1.068a1 1 0 0 0-.66.66l-1.067 3.443a.5.5 0 0 1-.943.033z",
			key: "xwnzip"
		}],
		["path", {
			d: "M5 17A12 12 0 0 1 17 5",
			key: "1okkup"
		}],
		["circle", {
			cx: "19",
			cy: "5",
			r: "2",
			key: "mhkx31"
		}],
		["circle", {
			cx: "5",
			cy: "19",
			r: "2",
			key: "v8kfzx"
		}]
	]);
	const Spline = createLucideIcon("spline", [
		["circle", {
			cx: "19",
			cy: "5",
			r: "2",
			key: "mhkx31"
		}],
		["circle", {
			cx: "5",
			cy: "19",
			r: "2",
			key: "v8kfzx"
		}],
		["path", {
			d: "M5 17A12 12 0 0 1 17 5",
			key: "1okkup"
		}]
	]);
	const Split = createLucideIcon("split", [
		["path", {
			d: "M16 3h5v5",
			key: "1806ms"
		}],
		["path", {
			d: "M8 3H3v5",
			key: "15dfkv"
		}],
		["path", {
			d: "M12 22v-8.3a4 4 0 0 0-1.172-2.872L3 3",
			key: "1qrqzj"
		}],
		["path", {
			d: "m15 9 6-6",
			key: "ko1vev"
		}]
	]);
	const Spool = createLucideIcon("spool", [["path", {
		d: "M17 13.44 4.442 17.082A2 2 0 0 0 4.982 21H19a2 2 0 0 0 .558-3.921l-1.115-.32A2 2 0 0 1 17 14.837V7.66",
		key: "13vns8"
	}], ["path", {
		d: "m7 10.56 12.558-3.642A2 2 0 0 0 19.018 3H5a2 2 0 0 0-.558 3.921l1.115.32A2 2 0 0 1 7 9.163v7.178",
		key: "s8x3u0"
	}]]);
	const Spotlight = createLucideIcon("spotlight", [
		["path", {
			d: "M15.295 19.562 16 22",
			key: "31jsb7"
		}],
		["path", {
			d: "m17 16 3.758 2.098",
			key: "121ar7"
		}],
		["path", {
			d: "m19 12.5 3.026-.598",
			key: "19ukd3"
		}],
		["path", {
			d: "M7.61 6.3a3 3 0 0 0-3.92 1.3l-1.38 2.79a3 3 0 0 0 1.3 3.91l6.89 3.597a1 1 0 0 0 1.342-.447l3.106-6.211a1 1 0 0 0-.447-1.341z",
			key: "lwb9l9"
		}],
		["path", {
			d: "M8 9V2",
			key: "1xa0v7"
		}]
	]);
	const SprayCan = createLucideIcon("spray-can", [
		["path", {
			d: "M3 3h.01",
			key: "159qn6"
		}],
		["path", {
			d: "M7 5h.01",
			key: "1hq22a"
		}],
		["path", {
			d: "M11 7h.01",
			key: "1osv80"
		}],
		["path", {
			d: "M3 7h.01",
			key: "1xzrh3"
		}],
		["path", {
			d: "M7 9h.01",
			key: "19b3jx"
		}],
		["path", {
			d: "M3 11h.01",
			key: "1eifu7"
		}],
		["rect", {
			width: "4",
			height: "4",
			x: "15",
			y: "5",
			key: "mri9e4"
		}],
		["path", {
			d: "m19 9 2 2v10c0 .6-.4 1-1 1h-6c-.6 0-1-.4-1-1V11l2-2",
			key: "aib6hk"
		}],
		["path", {
			d: "m13 14 8-2",
			key: "1d7bmk"
		}],
		["path", {
			d: "m13 19 8-2",
			key: "1y2vml"
		}]
	]);
	const Sprout = createLucideIcon("sprout", [
		["path", {
			d: "M14 9.536V7a4 4 0 0 1 4-4h1.5a.5.5 0 0 1 .5.5V5a4 4 0 0 1-4 4 4 4 0 0 0-4 4c0 2 1 3 1 5a5 5 0 0 1-1 3",
			key: "139s4v"
		}],
		["path", {
			d: "M4 9a5 5 0 0 1 8 4 5 5 0 0 1-8-4",
			key: "1dlkgp"
		}],
		["path", {
			d: "M5 21h14",
			key: "11awu3"
		}]
	]);
	const SquareArrowDownLeft = createLucideIcon("square-arrow-down-left", [
		["rect", {
			width: "18",
			height: "18",
			x: "3",
			y: "3",
			rx: "2",
			key: "afitv7"
		}],
		["path", {
			d: "m16 8-8 8",
			key: "166keh"
		}],
		["path", {
			d: "M16 16H8V8",
			key: "1w2ppm"
		}]
	]);
	const SquareActivity = createLucideIcon("square-activity", [["rect", {
		width: "18",
		height: "18",
		x: "3",
		y: "3",
		rx: "2",
		key: "afitv7"
	}], ["path", {
		d: "M17 12h-2l-2 5-2-10-2 5H7",
		key: "15hlnc"
	}]]);
	const SquareArrowDownRight = createLucideIcon("square-arrow-down-right", [
		["rect", {
			width: "18",
			height: "18",
			x: "3",
			y: "3",
			rx: "2",
			key: "afitv7"
		}],
		["path", {
			d: "m8 8 8 8",
			key: "1imecy"
		}],
		["path", {
			d: "M16 8v8H8",
			key: "1lbpgo"
		}]
	]);
	const SquareArrowDown = createLucideIcon("square-arrow-down", [
		["rect", {
			width: "18",
			height: "18",
			x: "3",
			y: "3",
			rx: "2",
			key: "afitv7"
		}],
		["path", {
			d: "M12 8v8",
			key: "napkw2"
		}],
		["path", {
			d: "m8 12 4 4 4-4",
			key: "k98ssh"
		}]
	]);
	const SquareArrowLeft = createLucideIcon("square-arrow-left", [
		["rect", {
			width: "18",
			height: "18",
			x: "3",
			y: "3",
			rx: "2",
			key: "afitv7"
		}],
		["path", {
			d: "m12 8-4 4 4 4",
			key: "15vm53"
		}],
		["path", {
			d: "M16 12H8",
			key: "1fr5h0"
		}]
	]);
	const SquareArrowOutDownLeft = createLucideIcon("square-arrow-out-down-left", [
		["path", {
			d: "M13 21h6a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6",
			key: "14qz4y"
		}],
		["path", {
			d: "m3 21 9-9",
			key: "1jfql5"
		}],
		["path", {
			d: "M9 21H3v-6",
			key: "wtvkvv"
		}]
	]);
	const SquareArrowOutDownRight = createLucideIcon("square-arrow-out-down-right", [
		["path", {
			d: "M21 11V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6",
			key: "14rsvq"
		}],
		["path", {
			d: "m21 21-9-9",
			key: "1et2py"
		}],
		["path", {
			d: "M21 15v6h-6",
			key: "1jko0i"
		}]
	]);
	const SquareArrowOutUpRight = createLucideIcon("square-arrow-out-up-right", [
		["path", {
			d: "M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6",
			key: "y09zxi"
		}],
		["path", {
			d: "m21 3-9 9",
			key: "mpx6sq"
		}],
		["path", {
			d: "M15 3h6v6",
			key: "1q9fwt"
		}]
	]);
	const SquareArrowOutUpLeft = createLucideIcon("square-arrow-out-up-left", [
		["path", {
			d: "M13 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6",
			key: "14mv1t"
		}],
		["path", {
			d: "m3 3 9 9",
			key: "rks13r"
		}],
		["path", {
			d: "M3 9V3h6",
			key: "ira0h2"
		}]
	]);
	const SquareArrowRight = createLucideIcon("square-arrow-right", [
		["rect", {
			width: "18",
			height: "18",
			x: "3",
			y: "3",
			rx: "2",
			key: "afitv7"
		}],
		["path", {
			d: "M8 12h8",
			key: "1wcyev"
		}],
		["path", {
			d: "m12 16 4-4-4-4",
			key: "1i9zcv"
		}]
	]);
	const SquareArrowUpLeft = createLucideIcon("square-arrow-up-left", [
		["rect", {
			width: "18",
			height: "18",
			x: "3",
			y: "3",
			rx: "2",
			key: "afitv7"
		}],
		["path", {
			d: "M8 16V8h8",
			key: "19xb1h"
		}],
		["path", {
			d: "M16 16 8 8",
			key: "1qdy8n"
		}]
	]);
	const SquareArrowUpRight = createLucideIcon("square-arrow-up-right", [
		["rect", {
			width: "18",
			height: "18",
			x: "3",
			y: "3",
			rx: "2",
			key: "afitv7"
		}],
		["path", {
			d: "M8 8h8v8",
			key: "b65dnt"
		}],
		["path", {
			d: "m8 16 8-8",
			key: "13b9ih"
		}]
	]);
	const SquareArrowUp = createLucideIcon("square-arrow-up", [
		["rect", {
			width: "18",
			height: "18",
			x: "3",
			y: "3",
			rx: "2",
			key: "afitv7"
		}],
		["path", {
			d: "m16 12-4-4-4 4",
			key: "177agl"
		}],
		["path", {
			d: "M12 16V8",
			key: "1sbj14"
		}]
	]);
	const SquareAsterisk = createLucideIcon("square-asterisk", [
		["rect", {
			width: "18",
			height: "18",
			x: "3",
			y: "3",
			rx: "2",
			key: "afitv7"
		}],
		["path", {
			d: "M12 8v8",
			key: "napkw2"
		}],
		["path", {
			d: "m8.5 14 7-4",
			key: "12hpby"
		}],
		["path", {
			d: "m8.5 10 7 4",
			key: "wwy2dy"
		}]
	]);
	const SquareBottomDashedScissors = createLucideIcon("square-bottom-dashed-scissors", [
		["path", {
			d: "M4 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2",
			key: "1vzg26"
		}],
		["path", {
			d: "M10 22H8",
			key: "euku7a"
		}],
		["path", {
			d: "M16 22h-2",
			key: "18d249"
		}],
		["circle", {
			cx: "8",
			cy: "8",
			r: "2",
			key: "14cg06"
		}],
		["path", {
			d: "M9.414 9.414 12 12",
			key: "qz4lzr"
		}],
		["path", {
			d: "M14.8 14.8 18 18",
			key: "11flf1"
		}],
		["circle", {
			cx: "8",
			cy: "16",
			r: "2",
			key: "1acxsx"
		}],
		["path", {
			d: "m18 6-8.586 8.586",
			key: "11kzk1"
		}]
	]);
	const SquareCheckBig = createLucideIcon("square-check-big", [["path", {
		d: "M21 10.656V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.344",
		key: "2acyp4"
	}], ["path", {
		d: "m9 11 3 3L22 4",
		key: "1pflzl"
	}]]);
	const SquareCheck = createLucideIcon("square-check", [["rect", {
		width: "18",
		height: "18",
		x: "3",
		y: "3",
		rx: "2",
		key: "afitv7"
	}], ["path", {
		d: "m9 12 2 2 4-4",
		key: "dzmm74"
	}]]);
	const SquareChartGantt = createLucideIcon("square-chart-gantt", [
		["rect", {
			width: "18",
			height: "18",
			x: "3",
			y: "3",
			rx: "2",
			key: "afitv7"
		}],
		["path", {
			d: "M9 8h7",
			key: "kbo1nt"
		}],
		["path", {
			d: "M8 12h6",
			key: "ikassy"
		}],
		["path", {
			d: "M11 16h5",
			key: "oq65wt"
		}]
	]);
	const SquareChevronDown = createLucideIcon("square-chevron-down", [["rect", {
		width: "18",
		height: "18",
		x: "3",
		y: "3",
		rx: "2",
		key: "afitv7"
	}], ["path", {
		d: "m16 10-4 4-4-4",
		key: "894hmk"
	}]]);
	const SquareChevronLeft = createLucideIcon("square-chevron-left", [["rect", {
		width: "18",
		height: "18",
		x: "3",
		y: "3",
		rx: "2",
		key: "afitv7"
	}], ["path", {
		d: "m14 16-4-4 4-4",
		key: "ojs7w8"
	}]]);
	const SquareChevronRight = createLucideIcon("square-chevron-right", [["rect", {
		width: "18",
		height: "18",
		x: "3",
		y: "3",
		rx: "2",
		key: "afitv7"
	}], ["path", {
		d: "m10 8 4 4-4 4",
		key: "1wy4r4"
	}]]);
	const SquareChevronUp = createLucideIcon("square-chevron-up", [["rect", {
		width: "18",
		height: "18",
		x: "3",
		y: "3",
		rx: "2",
		key: "afitv7"
	}], ["path", {
		d: "m8 14 4-4 4 4",
		key: "fy2ptz"
	}]]);
	const SquareCode = createLucideIcon("square-code", [
		["path", {
			d: "m10 9-3 3 3 3",
			key: "1oro0q"
		}],
		["path", {
			d: "m14 15 3-3-3-3",
			key: "bz13h7"
		}],
		["rect", {
			x: "3",
			y: "3",
			width: "18",
			height: "18",
			rx: "2",
			key: "h1oib"
		}]
	]);
	const SquareDashedBottomCode = createLucideIcon("square-dashed-bottom-code", [
		["path", {
			d: "M10 9.5 8 12l2 2.5",
			key: "3mjy60"
		}],
		["path", {
			d: "M14 21h1",
			key: "v9vybs"
		}],
		["path", {
			d: "m14 9.5 2 2.5-2 2.5",
			key: "1bir2l"
		}],
		["path", {
			d: "M5 21a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2",
			key: "as5y1o"
		}],
		["path", {
			d: "M9 21h1",
			key: "15o7lz"
		}]
	]);
	const SquareDashedBottom = createLucideIcon("square-dashed-bottom", [
		["path", {
			d: "M5 21a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2",
			key: "as5y1o"
		}],
		["path", {
			d: "M9 21h1",
			key: "15o7lz"
		}],
		["path", {
			d: "M14 21h1",
			key: "v9vybs"
		}]
	]);
	const SquareDashedKanban = createLucideIcon("square-dashed-kanban", [
		["path", {
			d: "M8 7v7",
			key: "1x2jlm"
		}],
		["path", {
			d: "M12 7v4",
			key: "xawao1"
		}],
		["path", {
			d: "M16 7v9",
			key: "1hp2iy"
		}],
		["path", {
			d: "M5 3a2 2 0 0 0-2 2",
			key: "y57alp"
		}],
		["path", {
			d: "M9 3h1",
			key: "1yesri"
		}],
		["path", {
			d: "M14 3h1",
			key: "1ec4yj"
		}],
		["path", {
			d: "M19 3a2 2 0 0 1 2 2",
			key: "18rm91"
		}],
		["path", {
			d: "M21 9v1",
			key: "mxsmne"
		}],
		["path", {
			d: "M21 14v1",
			key: "169vum"
		}],
		["path", {
			d: "M21 19a2 2 0 0 1-2 2",
			key: "1j7049"
		}],
		["path", {
			d: "M14 21h1",
			key: "v9vybs"
		}],
		["path", {
			d: "M9 21h1",
			key: "15o7lz"
		}],
		["path", {
			d: "M5 21a2 2 0 0 1-2-2",
			key: "sbafld"
		}],
		["path", {
			d: "M3 14v1",
			key: "vnatye"
		}],
		["path", {
			d: "M3 9v1",
			key: "1r0deq"
		}]
	]);
	const SquareDashedMousePointer = createLucideIcon("square-dashed-mouse-pointer", [
		["path", {
			d: "M12.034 12.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.943l-3.444 1.068a1 1 0 0 0-.66.66l-1.067 3.443a.5.5 0 0 1-.943.033z",
			key: "xwnzip"
		}],
		["path", {
			d: "M5 3a2 2 0 0 0-2 2",
			key: "y57alp"
		}],
		["path", {
			d: "M19 3a2 2 0 0 1 2 2",
			key: "18rm91"
		}],
		["path", {
			d: "M5 21a2 2 0 0 1-2-2",
			key: "sbafld"
		}],
		["path", {
			d: "M9 3h1",
			key: "1yesri"
		}],
		["path", {
			d: "M9 21h2",
			key: "1qve2z"
		}],
		["path", {
			d: "M14 3h1",
			key: "1ec4yj"
		}],
		["path", {
			d: "M3 9v1",
			key: "1r0deq"
		}],
		["path", {
			d: "M21 9v2",
			key: "p14lih"
		}],
		["path", {
			d: "M3 14v1",
			key: "vnatye"
		}]
	]);
	const SquareDashedTopSolid = createLucideIcon("square-dashed-top-solid", [
		["path", {
			d: "M14 21h1",
			key: "v9vybs"
		}],
		["path", {
			d: "M21 14v1",
			key: "169vum"
		}],
		["path", {
			d: "M21 19a2 2 0 0 1-2 2",
			key: "1j7049"
		}],
		["path", {
			d: "M21 9v1",
			key: "mxsmne"
		}],
		["path", {
			d: "M3 14v1",
			key: "vnatye"
		}],
		["path", {
			d: "M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2",
			key: "89voep"
		}],
		["path", {
			d: "M3 9v1",
			key: "1r0deq"
		}],
		["path", {
			d: "M5 21a2 2 0 0 1-2-2",
			key: "sbafld"
		}],
		["path", {
			d: "M9 21h1",
			key: "15o7lz"
		}]
	]);
	const SquareDashed = createLucideIcon("square-dashed", [
		["path", {
			d: "M5 3a2 2 0 0 0-2 2",
			key: "y57alp"
		}],
		["path", {
			d: "M19 3a2 2 0 0 1 2 2",
			key: "18rm91"
		}],
		["path", {
			d: "M21 19a2 2 0 0 1-2 2",
			key: "1j7049"
		}],
		["path", {
			d: "M5 21a2 2 0 0 1-2-2",
			key: "sbafld"
		}],
		["path", {
			d: "M9 3h1",
			key: "1yesri"
		}],
		["path", {
			d: "M9 21h1",
			key: "15o7lz"
		}],
		["path", {
			d: "M14 3h1",
			key: "1ec4yj"
		}],
		["path", {
			d: "M14 21h1",
			key: "v9vybs"
		}],
		["path", {
			d: "M3 9v1",
			key: "1r0deq"
		}],
		["path", {
			d: "M21 9v1",
			key: "mxsmne"
		}],
		["path", {
			d: "M3 14v1",
			key: "vnatye"
		}],
		["path", {
			d: "M21 14v1",
			key: "169vum"
		}]
	]);
	const SquareDivide = createLucideIcon("square-divide", [
		["rect", {
			width: "18",
			height: "18",
			x: "3",
			y: "3",
			rx: "2",
			ry: "2",
			key: "1m3agn"
		}],
		["line", {
			x1: "8",
			x2: "16",
			y1: "12",
			y2: "12",
			key: "1jonct"
		}],
		["line", {
			x1: "12",
			x2: "12",
			y1: "16",
			y2: "16",
			key: "aqc6ln"
		}],
		["line", {
			x1: "12",
			x2: "12",
			y1: "8",
			y2: "8",
			key: "1mkcni"
		}]
	]);
	const SquareDot = createLucideIcon("square-dot", [["rect", {
		width: "18",
		height: "18",
		x: "3",
		y: "3",
		rx: "2",
		key: "afitv7"
	}], ["circle", {
		cx: "12",
		cy: "12",
		r: "1",
		key: "41hilf"
	}]]);
	const SquareEqual = createLucideIcon("square-equal", [
		["rect", {
			width: "18",
			height: "18",
			x: "3",
			y: "3",
			rx: "2",
			key: "afitv7"
		}],
		["path", {
			d: "M7 10h10",
			key: "1101jm"
		}],
		["path", {
			d: "M7 14h10",
			key: "1mhdw3"
		}]
	]);
	const SquareFunction = createLucideIcon("square-function", [
		["rect", {
			width: "18",
			height: "18",
			x: "3",
			y: "3",
			rx: "2",
			ry: "2",
			key: "1m3agn"
		}],
		["path", {
			d: "M9 17c2 0 2.8-1 2.8-2.8V10c0-2 1-3.3 3.2-3",
			key: "m1af9g"
		}],
		["path", {
			d: "M9 11.2h5.7",
			key: "3zgcl2"
		}]
	]);
	const SquareKanban = createLucideIcon("square-kanban", [
		["rect", {
			width: "18",
			height: "18",
			x: "3",
			y: "3",
			rx: "2",
			key: "afitv7"
		}],
		["path", {
			d: "M8 7v7",
			key: "1x2jlm"
		}],
		["path", {
			d: "M12 7v4",
			key: "xawao1"
		}],
		["path", {
			d: "M16 7v9",
			key: "1hp2iy"
		}]
	]);
	const SquareLibrary = createLucideIcon("square-library", [
		["rect", {
			width: "18",
			height: "18",
			x: "3",
			y: "3",
			rx: "2",
			key: "afitv7"
		}],
		["path", {
			d: "M7 7v10",
			key: "d5nglc"
		}],
		["path", {
			d: "M11 7v10",
			key: "pptsnr"
		}],
		["path", {
			d: "m15 7 2 10",
			key: "1m7qm5"
		}]
	]);
	const SquareM = createLucideIcon("square-m", [["path", {
		d: "M8 16V8.5a.5.5 0 0 1 .9-.3l2.7 3.599a.5.5 0 0 0 .8 0l2.7-3.6a.5.5 0 0 1 .9.3V16",
		key: "1ywlsj"
	}], ["rect", {
		x: "3",
		y: "3",
		width: "18",
		height: "18",
		rx: "2",
		key: "h1oib"
	}]]);
	const SquareMenu = createLucideIcon("square-menu", [
		["rect", {
			width: "18",
			height: "18",
			x: "3",
			y: "3",
			rx: "2",
			key: "afitv7"
		}],
		["path", {
			d: "M7 8h10",
			key: "1jw688"
		}],
		["path", {
			d: "M7 12h10",
			key: "b7w52i"
		}],
		["path", {
			d: "M7 16h10",
			key: "wp8him"
		}]
	]);
	const SquareMinus = createLucideIcon("square-minus", [["rect", {
		width: "18",
		height: "18",
		x: "3",
		y: "3",
		rx: "2",
		key: "afitv7"
	}], ["path", {
		d: "M8 12h8",
		key: "1wcyev"
	}]]);
	const SquareMousePointer = createLucideIcon("square-mouse-pointer", [["path", {
		d: "M12.034 12.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.943l-3.444 1.068a1 1 0 0 0-.66.66l-1.067 3.443a.5.5 0 0 1-.943.033z",
		key: "xwnzip"
	}], ["path", {
		d: "M21 11V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6",
		key: "14rsvq"
	}]]);
	const SquareParkingOff = createLucideIcon("square-parking-off", [
		["path", {
			d: "M3.6 3.6A2 2 0 0 1 5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-.59 1.41",
			key: "9l1ft6"
		}],
		["path", {
			d: "M3 8.7V19a2 2 0 0 0 2 2h10.3",
			key: "17knke"
		}],
		["path", {
			d: "m2 2 20 20",
			key: "1ooewy"
		}],
		["path", {
			d: "M13 13a3 3 0 1 0 0-6H9v2",
			key: "uoagbd"
		}],
		["path", {
			d: "M9 17v-2.3",
			key: "1jxgo2"
		}]
	]);
	const SquareParking = createLucideIcon("square-parking", [["rect", {
		width: "18",
		height: "18",
		x: "3",
		y: "3",
		rx: "2",
		key: "afitv7"
	}], ["path", {
		d: "M9 17V7h4a3 3 0 0 1 0 6H9",
		key: "1dfk2c"
	}]]);
	const SquarePause = createLucideIcon("square-pause", [
		["rect", {
			width: "18",
			height: "18",
			x: "3",
			y: "3",
			rx: "2",
			key: "afitv7"
		}],
		["line", {
			x1: "10",
			x2: "10",
			y1: "15",
			y2: "9",
			key: "c1nkhi"
		}],
		["line", {
			x1: "14",
			x2: "14",
			y1: "15",
			y2: "9",
			key: "h65svq"
		}]
	]);
	const SquarePercent = createLucideIcon("square-percent", [
		["rect", {
			width: "18",
			height: "18",
			x: "3",
			y: "3",
			rx: "2",
			key: "afitv7"
		}],
		["path", {
			d: "m15 9-6 6",
			key: "1uzhvr"
		}],
		["path", {
			d: "M9 9h.01",
			key: "1q5me6"
		}],
		["path", {
			d: "M15 15h.01",
			key: "lqbp3k"
		}]
	]);
	const SquarePen = createLucideIcon("square-pen", [["path", {
		d: "M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7",
		key: "1m0v6g"
	}], ["path", {
		d: "M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z",
		key: "ohrbg2"
	}]]);
	const SquarePi = createLucideIcon("square-pi", [
		["rect", {
			width: "18",
			height: "18",
			x: "3",
			y: "3",
			rx: "2",
			key: "afitv7"
		}],
		["path", {
			d: "M7 7h10",
			key: "udp07y"
		}],
		["path", {
			d: "M10 7v10",
			key: "i1d9ee"
		}],
		["path", {
			d: "M16 17a2 2 0 0 1-2-2V7",
			key: "ftwdc7"
		}]
	]);
	const SquarePilcrow = createLucideIcon("square-pilcrow", [
		["rect", {
			width: "18",
			height: "18",
			x: "3",
			y: "3",
			rx: "2",
			key: "afitv7"
		}],
		["path", {
			d: "M12 12H9.5a2.5 2.5 0 0 1 0-5H17",
			key: "1l9586"
		}],
		["path", {
			d: "M12 7v10",
			key: "jspqdw"
		}],
		["path", {
			d: "M16 7v10",
			key: "lavkr4"
		}]
	]);
	const SquarePlay = createLucideIcon("square-play", [["rect", {
		x: "3",
		y: "3",
		width: "18",
		height: "18",
		rx: "2",
		key: "h1oib"
	}], ["path", {
		d: "M9 9.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997A1 1 0 0 1 9 14.996z",
		key: "kmsa83"
	}]]);
	const SquarePlus = createLucideIcon("square-plus", [
		["rect", {
			width: "18",
			height: "18",
			x: "3",
			y: "3",
			rx: "2",
			key: "afitv7"
		}],
		["path", {
			d: "M8 12h8",
			key: "1wcyev"
		}],
		["path", {
			d: "M12 8v8",
			key: "napkw2"
		}]
	]);
	const SquarePower = createLucideIcon("square-power", [
		["path", {
			d: "M12 7v4",
			key: "xawao1"
		}],
		["path", {
			d: "M7.998 9.003a5 5 0 1 0 8-.005",
			key: "1pek45"
		}],
		["rect", {
			x: "3",
			y: "3",
			width: "18",
			height: "18",
			rx: "2",
			key: "h1oib"
		}]
	]);
	const SquareRadical = createLucideIcon("square-radical", [["path", {
		d: "M7 12h2l2 5 2-10h4",
		key: "1fxv6h"
	}], ["rect", {
		x: "3",
		y: "3",
		width: "18",
		height: "18",
		rx: "2",
		key: "h1oib"
	}]]);
	const SquareRoundCorner = createLucideIcon("square-round-corner", [["path", {
		d: "M21 11a8 8 0 0 0-8-8",
		key: "1lxwo5"
	}], ["path", {
		d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",
		key: "1dv2y5"
	}]]);
	const SquareScissors = createLucideIcon("square-scissors", [
		["rect", {
			width: "20",
			height: "20",
			x: "2",
			y: "2",
			rx: "2",
			key: "1btzen"
		}],
		["circle", {
			cx: "8",
			cy: "8",
			r: "2",
			key: "14cg06"
		}],
		["path", {
			d: "M9.414 9.414 12 12",
			key: "qz4lzr"
		}],
		["path", {
			d: "M14.8 14.8 18 18",
			key: "11flf1"
		}],
		["circle", {
			cx: "8",
			cy: "16",
			r: "2",
			key: "1acxsx"
		}],
		["path", {
			d: "m18 6-8.586 8.586",
			key: "11kzk1"
		}]
	]);
	const SquareSigma = createLucideIcon("square-sigma", [["rect", {
		width: "18",
		height: "18",
		x: "3",
		y: "3",
		rx: "2",
		key: "afitv7"
	}], ["path", {
		d: "M16 8.9V7H8l4 5-4 5h8v-1.9",
		key: "9nih0i"
	}]]);
	const SquareSlash = createLucideIcon("square-slash", [["rect", {
		width: "18",
		height: "18",
		x: "3",
		y: "3",
		rx: "2",
		key: "afitv7"
	}], ["line", {
		x1: "9",
		x2: "15",
		y1: "15",
		y2: "9",
		key: "1dfufj"
	}]]);
	const SquareSplitHorizontal = createLucideIcon("square-split-horizontal", [
		["path", {
			d: "M8 19H5c-1 0-2-1-2-2V7c0-1 1-2 2-2h3",
			key: "lubmu8"
		}],
		["path", {
			d: "M16 5h3c1 0 2 1 2 2v10c0 1-1 2-2 2h-3",
			key: "1ag34g"
		}],
		["line", {
			x1: "12",
			x2: "12",
			y1: "4",
			y2: "20",
			key: "1tx1rr"
		}]
	]);
	const SquareSplitVertical = createLucideIcon("square-split-vertical", [
		["path", {
			d: "M5 8V5c0-1 1-2 2-2h10c1 0 2 1 2 2v3",
			key: "1pi83i"
		}],
		["path", {
			d: "M19 16v3c0 1-1 2-2 2H7c-1 0-2-1-2-2v-3",
			key: "ido5k7"
		}],
		["line", {
			x1: "4",
			x2: "20",
			y1: "12",
			y2: "12",
			key: "1e0a9i"
		}]
	]);
	const SquareSquare = createLucideIcon("square-square", [["rect", {
		x: "3",
		y: "3",
		width: "18",
		height: "18",
		rx: "2",
		key: "h1oib"
	}], ["rect", {
		x: "8",
		y: "8",
		width: "8",
		height: "8",
		rx: "1",
		key: "z9xiuo"
	}]]);
	const SquareStack = createLucideIcon("square-stack", [
		["path", {
			d: "M4 10c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2",
			key: "4i38lg"
		}],
		["path", {
			d: "M10 16c-1.1 0-2-.9-2-2v-4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2",
			key: "mlte4a"
		}],
		["rect", {
			width: "8",
			height: "8",
			x: "14",
			y: "14",
			rx: "2",
			key: "1fa9i4"
		}]
	]);
	const SquareStar = createLucideIcon("square-star", [["path", {
		d: "M11.035 7.69a1 1 0 0 1 1.909.024l.737 1.452a1 1 0 0 0 .737.535l1.634.256a1 1 0 0 1 .588 1.806l-1.172 1.168a1 1 0 0 0-.282.866l.259 1.613a1 1 0 0 1-1.541 1.134l-1.465-.75a1 1 0 0 0-.912 0l-1.465.75a1 1 0 0 1-1.539-1.133l.258-1.613a1 1 0 0 0-.282-.866l-1.156-1.153a1 1 0 0 1 .572-1.822l1.633-.256a1 1 0 0 0 .737-.535z",
		key: "13edca"
	}], ["rect", {
		x: "3",
		y: "3",
		width: "18",
		height: "18",
		rx: "2",
		key: "h1oib"
	}]]);
	const SquareStop = createLucideIcon("square-stop", [["rect", {
		width: "18",
		height: "18",
		x: "3",
		y: "3",
		rx: "2",
		key: "afitv7"
	}], ["rect", {
		x: "9",
		y: "9",
		width: "6",
		height: "6",
		rx: "1",
		key: "1ssd4o"
	}]]);
	const SquareTerminal = createLucideIcon("square-terminal", [
		["path", {
			d: "m7 11 2-2-2-2",
			key: "1lz0vl"
		}],
		["path", {
			d: "M11 13h4",
			key: "1p7l4v"
		}],
		["rect", {
			width: "18",
			height: "18",
			x: "3",
			y: "3",
			rx: "2",
			ry: "2",
			key: "1m3agn"
		}]
	]);
	const SquareUserRound = createLucideIcon("square-user-round", [
		["path", {
			d: "M18 21a6 6 0 0 0-12 0",
			key: "kaz2du"
		}],
		["circle", {
			cx: "12",
			cy: "11",
			r: "4",
			key: "1gt34v"
		}],
		["rect", {
			width: "18",
			height: "18",
			x: "3",
			y: "3",
			rx: "2",
			key: "afitv7"
		}]
	]);
	const SquareUser = createLucideIcon("square-user", [
		["rect", {
			width: "18",
			height: "18",
			x: "3",
			y: "3",
			rx: "2",
			key: "afitv7"
		}],
		["circle", {
			cx: "12",
			cy: "10",
			r: "3",
			key: "ilqhr7"
		}],
		["path", {
			d: "M7 21v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2",
			key: "1m6ac2"
		}]
	]);
	const Square = createLucideIcon("square", [["rect", {
		width: "18",
		height: "18",
		x: "3",
		y: "3",
		rx: "2",
		key: "afitv7"
	}]]);
	const SquareX = createLucideIcon("square-x", [
		["rect", {
			width: "18",
			height: "18",
			x: "3",
			y: "3",
			rx: "2",
			ry: "2",
			key: "1m3agn"
		}],
		["path", {
			d: "m15 9-6 6",
			key: "1uzhvr"
		}],
		["path", {
			d: "m9 9 6 6",
			key: "z0biqf"
		}]
	]);
	const SquaresExclude = createLucideIcon("squares-exclude", [["path", {
		d: "M16 12v2a2 2 0 0 1-2 2H9a1 1 0 0 0-1 1v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2h0",
		key: "1mcohs"
	}], ["path", {
		d: "M4 16a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3a1 1 0 0 1-1 1h-5a2 2 0 0 0-2 2v2",
		key: "1r1efp"
	}]]);
	const SquaresIntersect = createLucideIcon("squares-intersect", [
		["path", {
			d: "M10 22a2 2 0 0 1-2-2",
			key: "i7yj1i"
		}],
		["path", {
			d: "M14 2a2 2 0 0 1 2 2",
			key: "170a0m"
		}],
		["path", {
			d: "M16 22h-2",
			key: "18d249"
		}],
		["path", {
			d: "M2 10V8",
			key: "7yj4fe"
		}],
		["path", {
			d: "M2 4a2 2 0 0 1 2-2",
			key: "ddgnws"
		}],
		["path", {
			d: "M20 8a2 2 0 0 1 2 2",
			key: "1770vt"
		}],
		["path", {
			d: "M22 14v2",
			key: "iot8ja"
		}],
		["path", {
			d: "M22 20a2 2 0 0 1-2 2",
			key: "qj8q6g"
		}],
		["path", {
			d: "M4 16a2 2 0 0 1-2-2",
			key: "1dnafg"
		}],
		["path", {
			d: "M8 10a2 2 0 0 1 2-2h5a1 1 0 0 1 1 1v5a2 2 0 0 1-2 2H9a1 1 0 0 1-1-1z",
			key: "ci6f0b"
		}],
		["path", {
			d: "M8 2h2",
			key: "1gmkwm"
		}]
	]);
	const SquaresSubtract = createLucideIcon("squares-subtract", [
		["path", {
			d: "M10 22a2 2 0 0 1-2-2",
			key: "i7yj1i"
		}],
		["path", {
			d: "M16 22h-2",
			key: "18d249"
		}],
		["path", {
			d: "M16 4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-5a2 2 0 0 1 2-2h5a1 1 0 0 0 1-1z",
			key: "1njgbb"
		}],
		["path", {
			d: "M20 8a2 2 0 0 1 2 2",
			key: "1770vt"
		}],
		["path", {
			d: "M22 14v2",
			key: "iot8ja"
		}],
		["path", {
			d: "M22 20a2 2 0 0 1-2 2",
			key: "qj8q6g"
		}]
	]);
	const SquaresUnite = createLucideIcon("squares-unite", [["path", {
		d: "M4 16a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3a1 1 0 0 0 1 1h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-3a1 1 0 0 0-1-1z",
		key: "17jnth"
	}]]);
	const SquircleDashed = createLucideIcon("squircle-dashed", [
		["path", {
			d: "M13.77 3.043a34 34 0 0 0-3.54 0",
			key: "1oaobr"
		}],
		["path", {
			d: "M13.771 20.956a33 33 0 0 1-3.541.001",
			key: "95iq0j"
		}],
		["path", {
			d: "M20.18 17.74c-.51 1.15-1.29 1.93-2.439 2.44",
			key: "1u6qty"
		}],
		["path", {
			d: "M20.18 6.259c-.51-1.148-1.291-1.929-2.44-2.438",
			key: "1ew6g6"
		}],
		["path", {
			d: "M20.957 10.23a33 33 0 0 1 0 3.54",
			key: "1l9npr"
		}],
		["path", {
			d: "M3.043 10.23a34 34 0 0 0 .001 3.541",
			key: "1it6jm"
		}],
		["path", {
			d: "M6.26 20.179c-1.15-.508-1.93-1.29-2.44-2.438",
			key: "14uchd"
		}],
		["path", {
			d: "M6.26 3.82c-1.149.51-1.93 1.291-2.44 2.44",
			key: "8k4agb"
		}]
	]);
	const Squircle = createLucideIcon("squircle", [["path", {
		d: "M12 3c7.2 0 9 1.8 9 9s-1.8 9-9 9-9-1.8-9-9 1.8-9 9-9",
		key: "garfkc"
	}]]);
	const Squirrel = createLucideIcon("squirrel", [
		["path", {
			d: "M15.236 22a3 3 0 0 0-2.2-5",
			key: "21bitc"
		}],
		["path", {
			d: "M16 20a3 3 0 0 1 3-3h1a2 2 0 0 0 2-2v-2a4 4 0 0 0-4-4V4",
			key: "oh0fg0"
		}],
		["path", {
			d: "M18 13h.01",
			key: "9veqaj"
		}],
		["path", {
			d: "M18 6a4 4 0 0 0-4 4 7 7 0 0 0-7 7c0-5 4-5 4-10.5a4.5 4.5 0 1 0-9 0 2.5 2.5 0 0 0 5 0C7 10 3 11 3 17c0 2.8 2.2 5 5 5h10",
			key: "980v8a"
		}]
	]);
	const Stamp = createLucideIcon("stamp", [
		["path", {
			d: "M14 13V8.5C14 7 15 7 15 5a3 3 0 0 0-6 0c0 2 1 2 1 3.5V13",
			key: "i9gjdv"
		}],
		["path", {
			d: "M20 15.5a2.5 2.5 0 0 0-2.5-2.5h-11A2.5 2.5 0 0 0 4 15.5V17a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1z",
			key: "1vzg3v"
		}],
		["path", {
			d: "M5 22h14",
			key: "ehvnwv"
		}]
	]);
	const StarHalf = createLucideIcon("star-half", [["path", {
		d: "M12 18.338a2.1 2.1 0 0 0-.987.244L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16l2.309-4.679A.53.53 0 0 1 12 2",
		key: "2ksp49"
	}]]);
	const StarOff = createLucideIcon("star-off", [
		["path", {
			d: "M8.34 8.34 2 9.27l5 4.87L5.82 21 12 17.77 18.18 21l-.59-3.43",
			key: "16m0ql"
		}],
		["path", {
			d: "M18.42 12.76 22 9.27l-6.91-1L12 2l-1.44 2.91",
			key: "1vt8nq"
		}],
		["line", {
			x1: "2",
			x2: "22",
			y1: "2",
			y2: "22",
			key: "a6p6uj"
		}]
	]);
	const Star = createLucideIcon("star", [["path", {
		d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
		key: "r04s7s"
	}]]);
	const StepBack = createLucideIcon("step-back", [["path", {
		d: "M13.971 4.285A2 2 0 0 1 17 6v12a2 2 0 0 1-3.029 1.715l-9.997-5.998a2 2 0 0 1-.003-3.432z",
		key: "19qhus"
	}], ["path", {
		d: "M21 20V4",
		key: "cb8qj8"
	}]]);
	const StepForward = createLucideIcon("step-forward", [["path", {
		d: "M10.029 4.285A2 2 0 0 0 7 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z",
		key: "1ystz2"
	}], ["path", {
		d: "M3 4v16",
		key: "1ph11n"
	}]]);
	const Sticker = createLucideIcon("sticker", [
		["path", {
			d: "M15.5 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V8.5L15.5 3Z",
			key: "1wis1t"
		}],
		["path", {
			d: "M14 3v4a2 2 0 0 0 2 2h4",
			key: "36rjfy"
		}],
		["path", {
			d: "M8 13h.01",
			key: "1sbv64"
		}],
		["path", {
			d: "M16 13h.01",
			key: "wip0gl"
		}],
		["path", {
			d: "M10 16s.8 1 2 1c1.3 0 2-1 2-1",
			key: "1vvgv3"
		}]
	]);
	const Stethoscope = createLucideIcon("stethoscope", [
		["path", {
			d: "M11 2v2",
			key: "1539x4"
		}],
		["path", {
			d: "M5 2v2",
			key: "1yf1q8"
		}],
		["path", {
			d: "M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1",
			key: "rb5t3r"
		}],
		["path", {
			d: "M8 15a6 6 0 0 0 12 0v-3",
			key: "x18d4x"
		}],
		["circle", {
			cx: "20",
			cy: "10",
			r: "2",
			key: "ts1r5v"
		}]
	]);
	const StickyNote = createLucideIcon("sticky-note", [["path", {
		d: "M16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8Z",
		key: "qazsjp"
	}], ["path", {
		d: "M15 3v4a2 2 0 0 0 2 2h4",
		key: "40519r"
	}]]);
	const Store = createLucideIcon("store", [
		["path", {
			d: "M15 21v-5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v5",
			key: "slp6dd"
		}],
		["path", {
			d: "M17.774 10.31a1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.451 0 1.12 1.12 0 0 0-1.548 0 2.5 2.5 0 0 1-3.452 0 1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.77-3.248l2.889-4.184A2 2 0 0 1 7 2h10a2 2 0 0 1 1.653.873l2.895 4.192a2.5 2.5 0 0 1-3.774 3.244",
			key: "o0xfot"
		}],
		["path", {
			d: "M4 10.95V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8.05",
			key: "wn3emo"
		}]
	]);
	const StretchVertical = createLucideIcon("stretch-vertical", [["rect", {
		width: "6",
		height: "20",
		x: "4",
		y: "2",
		rx: "2",
		key: "19qu7m"
	}], ["rect", {
		width: "6",
		height: "20",
		x: "14",
		y: "2",
		rx: "2",
		key: "24v0nk"
	}]]);
	const StretchHorizontal = createLucideIcon("stretch-horizontal", [["rect", {
		width: "20",
		height: "6",
		x: "2",
		y: "4",
		rx: "2",
		key: "qdearl"
	}], ["rect", {
		width: "20",
		height: "6",
		x: "2",
		y: "14",
		rx: "2",
		key: "1xrn6j"
	}]]);
	const Strikethrough = createLucideIcon("strikethrough", [
		["path", {
			d: "M16 4H9a3 3 0 0 0-2.83 4",
			key: "43sutm"
		}],
		["path", {
			d: "M14 12a4 4 0 0 1 0 8H6",
			key: "nlfj13"
		}],
		["line", {
			x1: "4",
			x2: "20",
			y1: "12",
			y2: "12",
			key: "1e0a9i"
		}]
	]);
	const Subscript = createLucideIcon("subscript", [
		["path", {
			d: "m4 5 8 8",
			key: "1eunvl"
		}],
		["path", {
			d: "m12 5-8 8",
			key: "1ah0jp"
		}],
		["path", {
			d: "M20 19h-4c0-1.5.44-2 1.5-2.5S20 15.33 20 14c0-.47-.17-.93-.48-1.29a2.11 2.11 0 0 0-2.62-.44c-.42.24-.74.62-.9 1.07",
			key: "e8ta8j"
		}]
	]);
	const SunMedium = createLucideIcon("sun-medium", [
		["circle", {
			cx: "12",
			cy: "12",
			r: "4",
			key: "4exip2"
		}],
		["path", {
			d: "M12 3v1",
			key: "1asbbs"
		}],
		["path", {
			d: "M12 20v1",
			key: "1wcdkc"
		}],
		["path", {
			d: "M3 12h1",
			key: "lp3yf2"
		}],
		["path", {
			d: "M20 12h1",
			key: "1vloll"
		}],
		["path", {
			d: "m18.364 5.636-.707.707",
			key: "1hakh0"
		}],
		["path", {
			d: "m6.343 17.657-.707.707",
			key: "18m9nf"
		}],
		["path", {
			d: "m5.636 5.636.707.707",
			key: "1xv1c5"
		}],
		["path", {
			d: "m17.657 17.657.707.707",
			key: "vl76zb"
		}]
	]);
	const SunDim = createLucideIcon("sun-dim", [
		["circle", {
			cx: "12",
			cy: "12",
			r: "4",
			key: "4exip2"
		}],
		["path", {
			d: "M12 4h.01",
			key: "1ujb9j"
		}],
		["path", {
			d: "M20 12h.01",
			key: "1ykeid"
		}],
		["path", {
			d: "M12 20h.01",
			key: "zekei9"
		}],
		["path", {
			d: "M4 12h.01",
			key: "158zrr"
		}],
		["path", {
			d: "M17.657 6.343h.01",
			key: "31pqzk"
		}],
		["path", {
			d: "M17.657 17.657h.01",
			key: "jehnf4"
		}],
		["path", {
			d: "M6.343 17.657h.01",
			key: "gdk6ow"
		}],
		["path", {
			d: "M6.343 6.343h.01",
			key: "1uurf0"
		}]
	]);
	const SunMoon = createLucideIcon("sun-moon", [
		["path", {
			d: "M12 2v2",
			key: "tus03m"
		}],
		["path", {
			d: "M14.837 16.385a6 6 0 1 1-7.223-7.222c.624-.147.97.66.715 1.248a4 4 0 0 0 5.26 5.259c.589-.255 1.396.09 1.248.715",
			key: "xlf6rm"
		}],
		["path", {
			d: "M16 12a4 4 0 0 0-4-4",
			key: "6vsxu"
		}],
		["path", {
			d: "m19 5-1.256 1.256",
			key: "1yg6a6"
		}],
		["path", {
			d: "M20 12h2",
			key: "1q8mjw"
		}]
	]);
	const SunSnow = createLucideIcon("sun-snow", [
		["path", {
			d: "M10 21v-1",
			key: "1u8rkd"
		}],
		["path", {
			d: "M10 4V3",
			key: "pkzwkn"
		}],
		["path", {
			d: "M10 9a3 3 0 0 0 0 6",
			key: "gv75dk"
		}],
		["path", {
			d: "m14 20 1.25-2.5L18 18",
			key: "1chtki"
		}],
		["path", {
			d: "m14 4 1.25 2.5L18 6",
			key: "1b4wsy"
		}],
		["path", {
			d: "m17 21-3-6 1.5-3H22",
			key: "o5qa3v"
		}],
		["path", {
			d: "m17 3-3 6 1.5 3",
			key: "11697g"
		}],
		["path", {
			d: "M2 12h1",
			key: "1uaihz"
		}],
		["path", {
			d: "m20 10-1.5 2 1.5 2",
			key: "1swlpi"
		}],
		["path", {
			d: "m3.64 18.36.7-.7",
			key: "105rm9"
		}],
		["path", {
			d: "m4.34 6.34-.7-.7",
			key: "d3unjp"
		}]
	]);
	const Sun = createLucideIcon("sun", [
		["circle", {
			cx: "12",
			cy: "12",
			r: "4",
			key: "4exip2"
		}],
		["path", {
			d: "M12 2v2",
			key: "tus03m"
		}],
		["path", {
			d: "M12 20v2",
			key: "1lh1kg"
		}],
		["path", {
			d: "m4.93 4.93 1.41 1.41",
			key: "149t6j"
		}],
		["path", {
			d: "m17.66 17.66 1.41 1.41",
			key: "ptbguv"
		}],
		["path", {
			d: "M2 12h2",
			key: "1t8f8n"
		}],
		["path", {
			d: "M20 12h2",
			key: "1q8mjw"
		}],
		["path", {
			d: "m6.34 17.66-1.41 1.41",
			key: "1m8zz5"
		}],
		["path", {
			d: "m19.07 4.93-1.41 1.41",
			key: "1shlcs"
		}]
	]);
	const Sunrise = createLucideIcon("sunrise", [
		["path", {
			d: "M12 2v8",
			key: "1q4o3n"
		}],
		["path", {
			d: "m4.93 10.93 1.41 1.41",
			key: "2a7f42"
		}],
		["path", {
			d: "M2 18h2",
			key: "j10viu"
		}],
		["path", {
			d: "M20 18h2",
			key: "wocana"
		}],
		["path", {
			d: "m19.07 10.93-1.41 1.41",
			key: "15zs5n"
		}],
		["path", {
			d: "M22 22H2",
			key: "19qnx5"
		}],
		["path", {
			d: "m8 6 4-4 4 4",
			key: "ybng9g"
		}],
		["path", {
			d: "M16 18a4 4 0 0 0-8 0",
			key: "1lzouq"
		}]
	]);
	const Sunset = createLucideIcon("sunset", [
		["path", {
			d: "M12 10V2",
			key: "16sf7g"
		}],
		["path", {
			d: "m4.93 10.93 1.41 1.41",
			key: "2a7f42"
		}],
		["path", {
			d: "M2 18h2",
			key: "j10viu"
		}],
		["path", {
			d: "M20 18h2",
			key: "wocana"
		}],
		["path", {
			d: "m19.07 10.93-1.41 1.41",
			key: "15zs5n"
		}],
		["path", {
			d: "M22 22H2",
			key: "19qnx5"
		}],
		["path", {
			d: "m16 6-4 4-4-4",
			key: "6wukr"
		}],
		["path", {
			d: "M16 18a4 4 0 0 0-8 0",
			key: "1lzouq"
		}]
	]);
	const Superscript = createLucideIcon("superscript", [
		["path", {
			d: "m4 19 8-8",
			key: "hr47gm"
		}],
		["path", {
			d: "m12 19-8-8",
			key: "1dhhmo"
		}],
		["path", {
			d: "M20 12h-4c0-1.5.442-2 1.5-2.5S20 8.334 20 7.002c0-.472-.17-.93-.484-1.29a2.105 2.105 0 0 0-2.617-.436c-.42.239-.738.614-.899 1.06",
			key: "1dfcux"
		}]
	]);
	const SwatchBook = createLucideIcon("swatch-book", [
		["path", {
			d: "M11 17a4 4 0 0 1-8 0V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2Z",
			key: "1ldrpk"
		}],
		["path", {
			d: "M16.7 13H19a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H7",
			key: "11i5po"
		}],
		["path", {
			d: "M 7 17h.01",
			key: "1euzgo"
		}],
		["path", {
			d: "m11 8 2.3-2.3a2.4 2.4 0 0 1 3.404.004L18.6 7.6a2.4 2.4 0 0 1 .026 3.434L9.9 19.8",
			key: "o2gii7"
		}]
	]);
	const SwissFranc = createLucideIcon("swiss-franc", [
		["path", {
			d: "M10 21V3h8",
			key: "br2l0g"
		}],
		["path", {
			d: "M6 16h9",
			key: "2py0wn"
		}],
		["path", {
			d: "M10 9.5h7",
			key: "13dmhz"
		}]
	]);
	const SwitchCamera = createLucideIcon("switch-camera", [
		["path", {
			d: "M11 19H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5",
			key: "mtk2lu"
		}],
		["path", {
			d: "M13 5h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-5",
			key: "120jsl"
		}],
		["circle", {
			cx: "12",
			cy: "12",
			r: "3",
			key: "1v7zrd"
		}],
		["path", {
			d: "m18 22-3-3 3-3",
			key: "kgdoj7"
		}],
		["path", {
			d: "m6 2 3 3-3 3",
			key: "1fnbkv"
		}]
	]);
	const Sword = createLucideIcon("sword", [
		["path", {
			d: "m11 19-6-6",
			key: "s7kpr"
		}],
		["path", {
			d: "m5 21-2-2",
			key: "1kw20b"
		}],
		["path", {
			d: "m8 16-4 4",
			key: "1oqv8h"
		}],
		["path", {
			d: "M9.5 17.5 21 6V3h-3L6.5 14.5",
			key: "pkxemp"
		}]
	]);
	const Swords = createLucideIcon("swords", [
		["polyline", {
			points: "14.5 17.5 3 6 3 3 6 3 17.5 14.5",
			key: "1hfsw2"
		}],
		["line", {
			x1: "13",
			x2: "19",
			y1: "19",
			y2: "13",
			key: "1vrmhu"
		}],
		["line", {
			x1: "16",
			x2: "20",
			y1: "16",
			y2: "20",
			key: "1bron3"
		}],
		["line", {
			x1: "19",
			x2: "21",
			y1: "21",
			y2: "19",
			key: "13pww6"
		}],
		["polyline", {
			points: "14.5 6.5 18 3 21 3 21 6 17.5 9.5",
			key: "hbey2j"
		}],
		["line", {
			x1: "5",
			x2: "9",
			y1: "14",
			y2: "18",
			key: "1hf58s"
		}],
		["line", {
			x1: "7",
			x2: "4",
			y1: "17",
			y2: "20",
			key: "pidxm4"
		}],
		["line", {
			x1: "3",
			x2: "5",
			y1: "19",
			y2: "21",
			key: "1pehsh"
		}]
	]);
	const Syringe = createLucideIcon("syringe", [
		["path", {
			d: "m18 2 4 4",
			key: "22kx64"
		}],
		["path", {
			d: "m17 7 3-3",
			key: "1w1zoj"
		}],
		["path", {
			d: "M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-2.5 0-3.4L15 5",
			key: "1exhtz"
		}],
		["path", {
			d: "m9 11 4 4",
			key: "rovt3i"
		}],
		["path", {
			d: "m5 19-3 3",
			key: "59f2uf"
		}],
		["path", {
			d: "m14 4 6 6",
			key: "yqp9t2"
		}]
	]);
	const TableCellsMerge = createLucideIcon("table-cells-merge", [
		["path", {
			d: "M12 21v-6",
			key: "lihzve"
		}],
		["path", {
			d: "M12 9V3",
			key: "da5inc"
		}],
		["path", {
			d: "M3 15h18",
			key: "5xshup"
		}],
		["path", {
			d: "M3 9h18",
			key: "1pudct"
		}],
		["rect", {
			width: "18",
			height: "18",
			x: "3",
			y: "3",
			rx: "2",
			key: "afitv7"
		}]
	]);
	const TableCellsSplit = createLucideIcon("table-cells-split", [
		["path", {
			d: "M12 15V9",
			key: "8c7uyn"
		}],
		["path", {
			d: "M3 15h18",
			key: "5xshup"
		}],
		["path", {
			d: "M3 9h18",
			key: "1pudct"
		}],
		["rect", {
			width: "18",
			height: "18",
			x: "3",
			y: "3",
			rx: "2",
			key: "afitv7"
		}]
	]);
	const Table2 = createLucideIcon("table-2", [["path", {
		d: "M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18",
		key: "gugj83"
	}]]);
	const TableColumnsSplit = createLucideIcon("table-columns-split", [
		["path", {
			d: "M14 14v2",
			key: "w2a1xv"
		}],
		["path", {
			d: "M14 20v2",
			key: "1lq872"
		}],
		["path", {
			d: "M14 2v2",
			key: "6buw04"
		}],
		["path", {
			d: "M14 8v2",
			key: "i67w9a"
		}],
		["path", {
			d: "M2 15h8",
			key: "82wtch"
		}],
		["path", {
			d: "M2 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H2",
			key: "up0l64"
		}],
		["path", {
			d: "M2 9h8",
			key: "yelfik"
		}],
		["path", {
			d: "M22 15h-4",
			key: "1es58f"
		}],
		["path", {
			d: "M22 3h-2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h2",
			key: "pdjoqf"
		}],
		["path", {
			d: "M22 9h-4",
			key: "1luja7"
		}],
		["path", {
			d: "M5 3v18",
			key: "14hmio"
		}]
	]);
	const TableOfContents = createLucideIcon("table-of-contents", [
		["path", {
			d: "M16 5H3",
			key: "m91uny"
		}],
		["path", {
			d: "M16 12H3",
			key: "1a2rj7"
		}],
		["path", {
			d: "M16 19H3",
			key: "zzsher"
		}],
		["path", {
			d: "M21 5h.01",
			key: "wa75ra"
		}],
		["path", {
			d: "M21 12h.01",
			key: "msek7k"
		}],
		["path", {
			d: "M21 19h.01",
			key: "qvbq2j"
		}]
	]);
	const TableProperties = createLucideIcon("table-properties", [
		["path", {
			d: "M15 3v18",
			key: "14nvp0"
		}],
		["rect", {
			width: "18",
			height: "18",
			x: "3",
			y: "3",
			rx: "2",
			key: "afitv7"
		}],
		["path", {
			d: "M21 9H3",
			key: "1338ky"
		}],
		["path", {
			d: "M21 15H3",
			key: "9uk58r"
		}]
	]);
	const TableRowsSplit = createLucideIcon("table-rows-split", [
		["path", {
			d: "M14 10h2",
			key: "1lstlu"
		}],
		["path", {
			d: "M15 22v-8",
			key: "1fwwgm"
		}],
		["path", {
			d: "M15 2v4",
			key: "1044rn"
		}],
		["path", {
			d: "M2 10h2",
			key: "1r8dkt"
		}],
		["path", {
			d: "M20 10h2",
			key: "1ug425"
		}],
		["path", {
			d: "M3 19h18",
			key: "awlh7x"
		}],
		["path", {
			d: "M3 22v-6a2 2 135 0 1 2-2h14a2 2 45 0 1 2 2v6",
			key: "ibqhof"
		}],
		["path", {
			d: "M3 2v2a2 2 45 0 0 2 2h14a2 2 135 0 0 2-2V2",
			key: "1uenja"
		}],
		["path", {
			d: "M8 10h2",
			key: "66od0"
		}],
		["path", {
			d: "M9 22v-8",
			key: "fmnu31"
		}],
		["path", {
			d: "M9 2v4",
			key: "j1yeou"
		}]
	]);
	const Table = createLucideIcon("table", [
		["path", {
			d: "M12 3v18",
			key: "108xh3"
		}],
		["rect", {
			width: "18",
			height: "18",
			x: "3",
			y: "3",
			rx: "2",
			key: "afitv7"
		}],
		["path", {
			d: "M3 9h18",
			key: "1pudct"
		}],
		["path", {
			d: "M3 15h18",
			key: "5xshup"
		}]
	]);
	const TabletSmartphone = createLucideIcon("tablet-smartphone", [
		["rect", {
			width: "10",
			height: "14",
			x: "3",
			y: "8",
			rx: "2",
			key: "1vrsiq"
		}],
		["path", {
			d: "M5 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2h-2.4",
			key: "1j4zmg"
		}],
		["path", {
			d: "M8 18h.01",
			key: "lrp35t"
		}]
	]);
	const Tablet = createLucideIcon("tablet", [["rect", {
		width: "16",
		height: "20",
		x: "4",
		y: "2",
		rx: "2",
		ry: "2",
		key: "76otgf"
	}], ["line", {
		x1: "12",
		x2: "12.01",
		y1: "18",
		y2: "18",
		key: "1dp563"
	}]]);
	const Tablets = createLucideIcon("tablets", [
		["circle", {
			cx: "7",
			cy: "7",
			r: "5",
			key: "x29byf"
		}],
		["circle", {
			cx: "17",
			cy: "17",
			r: "5",
			key: "1op1d2"
		}],
		["path", {
			d: "M12 17h10",
			key: "ls21zv"
		}],
		["path", {
			d: "m3.46 10.54 7.08-7.08",
			key: "1rehiu"
		}]
	]);
	const Tag = createLucideIcon("tag", [["path", {
		d: "M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",
		key: "vktsd0"
	}], ["circle", {
		cx: "7.5",
		cy: "7.5",
		r: ".5",
		fill: "currentColor",
		key: "kqv944"
	}]]);
	const Tags = createLucideIcon("tags", [
		["path", {
			d: "M13.172 2a2 2 0 0 1 1.414.586l6.71 6.71a2.4 2.4 0 0 1 0 3.408l-4.592 4.592a2.4 2.4 0 0 1-3.408 0l-6.71-6.71A2 2 0 0 1 6 9.172V3a1 1 0 0 1 1-1z",
			key: "16rjxf"
		}],
		["path", {
			d: "M2 7v6.172a2 2 0 0 0 .586 1.414l6.71 6.71a2.4 2.4 0 0 0 3.191.193",
			key: "178nd4"
		}],
		["circle", {
			cx: "10.5",
			cy: "6.5",
			r: ".5",
			fill: "currentColor",
			key: "12ikhr"
		}]
	]);
	const Tally1 = createLucideIcon("tally-1", [["path", {
		d: "M4 4v16",
		key: "6qkkli"
	}]]);
	const Tally2 = createLucideIcon("tally-2", [["path", {
		d: "M4 4v16",
		key: "6qkkli"
	}], ["path", {
		d: "M9 4v16",
		key: "81ygyz"
	}]]);
	const Tally3 = createLucideIcon("tally-3", [
		["path", {
			d: "M4 4v16",
			key: "6qkkli"
		}],
		["path", {
			d: "M9 4v16",
			key: "81ygyz"
		}],
		["path", {
			d: "M14 4v16",
			key: "12vmem"
		}]
	]);
	const Tally4 = createLucideIcon("tally-4", [
		["path", {
			d: "M4 4v16",
			key: "6qkkli"
		}],
		["path", {
			d: "M9 4v16",
			key: "81ygyz"
		}],
		["path", {
			d: "M14 4v16",
			key: "12vmem"
		}],
		["path", {
			d: "M19 4v16",
			key: "8ij5ei"
		}]
	]);
	const Tally5 = createLucideIcon("tally-5", [
		["path", {
			d: "M4 4v16",
			key: "6qkkli"
		}],
		["path", {
			d: "M9 4v16",
			key: "81ygyz"
		}],
		["path", {
			d: "M14 4v16",
			key: "12vmem"
		}],
		["path", {
			d: "M19 4v16",
			key: "8ij5ei"
		}],
		["path", {
			d: "M22 6 2 18",
			key: "h9moai"
		}]
	]);
	const Tangent = createLucideIcon("tangent", [
		["circle", {
			cx: "17",
			cy: "4",
			r: "2",
			key: "y5j2s2"
		}],
		["path", {
			d: "M15.59 5.41 5.41 15.59",
			key: "l0vprr"
		}],
		["circle", {
			cx: "4",
			cy: "17",
			r: "2",
			key: "9p4efm"
		}],
		["path", {
			d: "M12 22s-4-9-1.5-11.5S22 12 22 12",
			key: "1twk4o"
		}]
	]);
	const Target = createLucideIcon("target", [
		["circle", {
			cx: "12",
			cy: "12",
			r: "10",
			key: "1mglay"
		}],
		["circle", {
			cx: "12",
			cy: "12",
			r: "6",
			key: "1vlfrh"
		}],
		["circle", {
			cx: "12",
			cy: "12",
			r: "2",
			key: "1c9p78"
		}]
	]);
	const Telescope = createLucideIcon("telescope", [
		["path", {
			d: "m10.065 12.493-6.18 1.318a.934.934 0 0 1-1.108-.702l-.537-2.15a1.07 1.07 0 0 1 .691-1.265l13.504-4.44",
			key: "k4qptu"
		}],
		["path", {
			d: "m13.56 11.747 4.332-.924",
			key: "19l80z"
		}],
		["path", {
			d: "m16 21-3.105-6.21",
			key: "7oh9d"
		}],
		["path", {
			d: "M16.485 5.94a2 2 0 0 1 1.455-2.425l1.09-.272a1 1 0 0 1 1.212.727l1.515 6.06a1 1 0 0 1-.727 1.213l-1.09.272a2 2 0 0 1-2.425-1.455z",
			key: "m7xp4m"
		}],
		["path", {
			d: "m6.158 8.633 1.114 4.456",
			key: "74o979"
		}],
		["path", {
			d: "m8 21 3.105-6.21",
			key: "1fvxut"
		}],
		["circle", {
			cx: "12",
			cy: "13",
			r: "2",
			key: "1c1ljs"
		}]
	]);
	const Tent = createLucideIcon("tent", [
		["path", {
			d: "M3.5 21 14 3",
			key: "1szst5"
		}],
		["path", {
			d: "M20.5 21 10 3",
			key: "1310c3"
		}],
		["path", {
			d: "M15.5 21 12 15l-3.5 6",
			key: "1ddtfw"
		}],
		["path", {
			d: "M2 21h20",
			key: "1nyx9w"
		}]
	]);
	const TentTree = createLucideIcon("tent-tree", [
		["circle", {
			cx: "4",
			cy: "4",
			r: "2",
			key: "bt5ra8"
		}],
		["path", {
			d: "m14 5 3-3 3 3",
			key: "1sorif"
		}],
		["path", {
			d: "m14 10 3-3 3 3",
			key: "1jyi9h"
		}],
		["path", {
			d: "M17 14V2",
			key: "8ymqnk"
		}],
		["path", {
			d: "M17 14H7l-5 8h20Z",
			key: "13ar7p"
		}],
		["path", {
			d: "M8 14v8",
			key: "1ghmqk"
		}],
		["path", {
			d: "m9 14 5 8",
			key: "13pgi6"
		}]
	]);
	const Terminal = createLucideIcon("terminal", [["path", {
		d: "M12 19h8",
		key: "baeox8"
	}], ["path", {
		d: "m4 17 6-6-6-6",
		key: "1yngyt"
	}]]);
	const TestTubeDiagonal = createLucideIcon("test-tube-diagonal", [
		["path", {
			d: "M21 7 6.82 21.18a2.83 2.83 0 0 1-3.99-.01a2.83 2.83 0 0 1 0-4L17 3",
			key: "1ub6xw"
		}],
		["path", {
			d: "m16 2 6 6",
			key: "1gw87d"
		}],
		["path", {
			d: "M12 16H4",
			key: "1cjfip"
		}]
	]);
	const TestTube = createLucideIcon("test-tube", [
		["path", {
			d: "M14.5 2v17.5c0 1.4-1.1 2.5-2.5 2.5c-1.4 0-2.5-1.1-2.5-2.5V2",
			key: "125lnx"
		}],
		["path", {
			d: "M8.5 2h7",
			key: "csnxdl"
		}],
		["path", {
			d: "M14.5 16h-5",
			key: "1ox875"
		}]
	]);
	const TestTubes = createLucideIcon("test-tubes", [
		["path", {
			d: "M9 2v17.5A2.5 2.5 0 0 1 6.5 22A2.5 2.5 0 0 1 4 19.5V2",
			key: "1hjrqt"
		}],
		["path", {
			d: "M20 2v17.5a2.5 2.5 0 0 1-2.5 2.5a2.5 2.5 0 0 1-2.5-2.5V2",
			key: "16lc8n"
		}],
		["path", {
			d: "M3 2h7",
			key: "7s29d5"
		}],
		["path", {
			d: "M14 2h7",
			key: "7sicin"
		}],
		["path", {
			d: "M9 16H4",
			key: "1bfye3"
		}],
		["path", {
			d: "M20 16h-5",
			key: "ddnjpe"
		}]
	]);
	const TextAlignCenter = createLucideIcon("text-align-center", [
		["path", {
			d: "M21 5H3",
			key: "1fi0y6"
		}],
		["path", {
			d: "M17 12H7",
			key: "16if0g"
		}],
		["path", {
			d: "M19 19H5",
			key: "vjpgq2"
		}]
	]);
	const TextAlignEnd = createLucideIcon("text-align-end", [
		["path", {
			d: "M21 5H3",
			key: "1fi0y6"
		}],
		["path", {
			d: "M21 12H9",
			key: "dn1m92"
		}],
		["path", {
			d: "M21 19H7",
			key: "4cu937"
		}]
	]);
	const TextAlignJustify = createLucideIcon("text-align-justify", [
		["path", {
			d: "M3 5h18",
			key: "1u36vt"
		}],
		["path", {
			d: "M3 12h18",
			key: "1i2n21"
		}],
		["path", {
			d: "M3 19h18",
			key: "awlh7x"
		}]
	]);
	const TextAlignStart = createLucideIcon("text-align-start", [
		["path", {
			d: "M21 5H3",
			key: "1fi0y6"
		}],
		["path", {
			d: "M15 12H3",
			key: "6jk70r"
		}],
		["path", {
			d: "M17 19H3",
			key: "z6ezky"
		}]
	]);
	const TextCursorInput = createLucideIcon("text-cursor-input", [
		["path", {
			d: "M12 20h-1a2 2 0 0 1-2-2 2 2 0 0 1-2 2H6",
			key: "1528k5"
		}],
		["path", {
			d: "M13 8h7a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-7",
			key: "13ksps"
		}],
		["path", {
			d: "M5 16H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h1",
			key: "1n9rhb"
		}],
		["path", {
			d: "M6 4h1a2 2 0 0 1 2 2 2 2 0 0 1 2-2h1",
			key: "1mj8rg"
		}],
		["path", {
			d: "M9 6v12",
			key: "velyjx"
		}]
	]);
	const TextCursor = createLucideIcon("text-cursor", [
		["path", {
			d: "M17 22h-1a4 4 0 0 1-4-4V6a4 4 0 0 1 4-4h1",
			key: "uvaxm9"
		}],
		["path", {
			d: "M7 22h1a4 4 0 0 0 4-4v-1",
			key: "11xy8d"
		}],
		["path", {
			d: "M7 2h1a4 4 0 0 1 4 4v1",
			key: "1uw06m"
		}]
	]);
	const TextInitial = createLucideIcon("text-initial", [
		["path", {
			d: "M15 5h6",
			key: "1pr8yx"
		}],
		["path", {
			d: "M15 12h6",
			key: "upa0zy"
		}],
		["path", {
			d: "M3 19h18",
			key: "awlh7x"
		}],
		["path", {
			d: "m3 12 3.553-7.724a.5.5 0 0 1 .894 0L11 12",
			key: "6lvno8"
		}],
		["path", {
			d: "M3.92 10h6.16",
			key: "1tl8ex"
		}]
	]);
	const TextQuote = createLucideIcon("text-quote", [
		["path", {
			d: "M17 5H3",
			key: "1cn7zz"
		}],
		["path", {
			d: "M21 12H8",
			key: "scolzb"
		}],
		["path", {
			d: "M21 19H8",
			key: "13qgcb"
		}],
		["path", {
			d: "M3 12v7",
			key: "1ri8j3"
		}]
	]);
	const TextSearch = createLucideIcon("text-search", [
		["path", {
			d: "M21 5H3",
			key: "1fi0y6"
		}],
		["path", {
			d: "M10 12H3",
			key: "1ulcyk"
		}],
		["path", {
			d: "M10 19H3",
			key: "108z41"
		}],
		["circle", {
			cx: "17",
			cy: "15",
			r: "3",
			key: "1upz2a"
		}],
		["path", {
			d: "m21 19-1.9-1.9",
			key: "dwi7p8"
		}]
	]);
	const TextSelect = createLucideIcon("text-select", [
		["path", {
			d: "M14 21h1",
			key: "v9vybs"
		}],
		["path", {
			d: "M14 3h1",
			key: "1ec4yj"
		}],
		["path", {
			d: "M19 3a2 2 0 0 1 2 2",
			key: "18rm91"
		}],
		["path", {
			d: "M21 14v1",
			key: "169vum"
		}],
		["path", {
			d: "M21 19a2 2 0 0 1-2 2",
			key: "1j7049"
		}],
		["path", {
			d: "M21 9v1",
			key: "mxsmne"
		}],
		["path", {
			d: "M3 14v1",
			key: "vnatye"
		}],
		["path", {
			d: "M3 9v1",
			key: "1r0deq"
		}],
		["path", {
			d: "M5 21a2 2 0 0 1-2-2",
			key: "sbafld"
		}],
		["path", {
			d: "M5 3a2 2 0 0 0-2 2",
			key: "y57alp"
		}],
		["path", {
			d: "M7 12h10",
			key: "b7w52i"
		}],
		["path", {
			d: "M7 16h6",
			key: "1vyc9m"
		}],
		["path", {
			d: "M7 8h8",
			key: "1jbsf9"
		}],
		["path", {
			d: "M9 21h1",
			key: "15o7lz"
		}],
		["path", {
			d: "M9 3h1",
			key: "1yesri"
		}]
	]);
	const TextWrap = createLucideIcon("text-wrap", [
		["path", {
			d: "m16 16-3 3 3 3",
			key: "117b85"
		}],
		["path", {
			d: "M3 12h14.5a1 1 0 0 1 0 7H13",
			key: "18xa6z"
		}],
		["path", {
			d: "M3 19h6",
			key: "1ygdsz"
		}],
		["path", {
			d: "M3 5h18",
			key: "1u36vt"
		}]
	]);
	const Theater = createLucideIcon("theater", [
		["path", {
			d: "M2 10s3-3 3-8",
			key: "3xiif0"
		}],
		["path", {
			d: "M22 10s-3-3-3-8",
			key: "ioaa5q"
		}],
		["path", {
			d: "M10 2c0 4.4-3.6 8-8 8",
			key: "16fkpi"
		}],
		["path", {
			d: "M14 2c0 4.4 3.6 8 8 8",
			key: "b9eulq"
		}],
		["path", {
			d: "M2 10s2 2 2 5",
			key: "1au1lb"
		}],
		["path", {
			d: "M22 10s-2 2-2 5",
			key: "qi2y5e"
		}],
		["path", {
			d: "M8 15h8",
			key: "45n4r"
		}],
		["path", {
			d: "M2 22v-1a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1",
			key: "1vsc2m"
		}],
		["path", {
			d: "M14 22v-1a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1",
			key: "hrha4u"
		}]
	]);
	const ThermometerSnowflake = createLucideIcon("thermometer-snowflake", [
		["path", {
			d: "m10 20-1.25-2.5L6 18",
			key: "18frcb"
		}],
		["path", {
			d: "M10 4 8.75 6.5 6 6",
			key: "7mghy3"
		}],
		["path", {
			d: "M10.585 15H10",
			key: "4nqulp"
		}],
		["path", {
			d: "M2 12h6.5L10 9",
			key: "kv9z4n"
		}],
		["path", {
			d: "M20 14.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0z",
			key: "yu0u2z"
		}],
		["path", {
			d: "m4 10 1.5 2L4 14",
			key: "k9enpj"
		}],
		["path", {
			d: "m7 21 3-6-1.5-3",
			key: "j8hb9u"
		}],
		["path", {
			d: "m7 3 3 6h2",
			key: "1bbqgq"
		}]
	]);
	const ThermometerSun = createLucideIcon("thermometer-sun", [
		["path", {
			d: "M12 9a4 4 0 0 0-2 7.5",
			key: "1jvsq6"
		}],
		["path", {
			d: "M12 3v2",
			key: "1w22ol"
		}],
		["path", {
			d: "m6.6 18.4-1.4 1.4",
			key: "w2yidj"
		}],
		["path", {
			d: "M20 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z",
			key: "iof6y5"
		}],
		["path", {
			d: "M4 13H2",
			key: "118le4"
		}],
		["path", {
			d: "M6.34 7.34 4.93 5.93",
			key: "1brd51"
		}]
	]);
	const Thermometer = createLucideIcon("thermometer", [["path", {
		d: "M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z",
		key: "17jzev"
	}]]);
	const ThumbsDown = createLucideIcon("thumbs-down", [["path", {
		d: "M17 14V2",
		key: "8ymqnk"
	}], ["path", {
		d: "M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z",
		key: "m61m77"
	}]]);
	const ThumbsUp = createLucideIcon("thumbs-up", [["path", {
		d: "M7 10v12",
		key: "1qc93n"
	}], ["path", {
		d: "M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z",
		key: "emmmcr"
	}]]);
	const TicketCheck = createLucideIcon("ticket-check", [["path", {
		d: "M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z",
		key: "qn84l0"
	}], ["path", {
		d: "m9 12 2 2 4-4",
		key: "dzmm74"
	}]]);
	const TicketMinus = createLucideIcon("ticket-minus", [["path", {
		d: "M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z",
		key: "qn84l0"
	}], ["path", {
		d: "M9 12h6",
		key: "1c52cq"
	}]]);
	const TicketPercent = createLucideIcon("ticket-percent", [
		["path", {
			d: "M2 9a3 3 0 1 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 1 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z",
			key: "1l48ns"
		}],
		["path", {
			d: "M9 9h.01",
			key: "1q5me6"
		}],
		["path", {
			d: "m15 9-6 6",
			key: "1uzhvr"
		}],
		["path", {
			d: "M15 15h.01",
			key: "lqbp3k"
		}]
	]);
	const TicketPlus = createLucideIcon("ticket-plus", [
		["path", {
			d: "M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z",
			key: "qn84l0"
		}],
		["path", {
			d: "M9 12h6",
			key: "1c52cq"
		}],
		["path", {
			d: "M12 9v6",
			key: "199k2o"
		}]
	]);
	const TicketSlash = createLucideIcon("ticket-slash", [["path", {
		d: "M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z",
		key: "qn84l0"
	}], ["path", {
		d: "m9.5 14.5 5-5",
		key: "qviqfa"
	}]]);
	const TicketX = createLucideIcon("ticket-x", [
		["path", {
			d: "M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z",
			key: "qn84l0"
		}],
		["path", {
			d: "m9.5 14.5 5-5",
			key: "qviqfa"
		}],
		["path", {
			d: "m9.5 9.5 5 5",
			key: "18nt4w"
		}]
	]);
	const Ticket = createLucideIcon("ticket", [
		["path", {
			d: "M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z",
			key: "qn84l0"
		}],
		["path", {
			d: "M13 5v2",
			key: "dyzc3o"
		}],
		["path", {
			d: "M13 17v2",
			key: "1ont0d"
		}],
		["path", {
			d: "M13 11v2",
			key: "1wjjxi"
		}]
	]);
	const TicketsPlane = createLucideIcon("tickets-plane", [
		["path", {
			d: "M10.5 17h1.227a2 2 0 0 0 1.345-.52L18 12",
			key: "16muxl"
		}],
		["path", {
			d: "m12 13.5 3.75.5",
			key: "1i9qhk"
		}],
		["path", {
			d: "m4.5 8 10.58-5.06a1 1 0 0 1 1.342.488L18.5 8",
			key: "12lg5p"
		}],
		["path", {
			d: "M6 10V8",
			key: "1y41hn"
		}],
		["path", {
			d: "M6 14v1",
			key: "cao2tf"
		}],
		["path", {
			d: "M6 19v2",
			key: "1loha6"
		}],
		["rect", {
			x: "2",
			y: "8",
			width: "20",
			height: "13",
			rx: "2",
			key: "p3bz5l"
		}]
	]);
	const Tickets = createLucideIcon("tickets", [
		["path", {
			d: "m4.5 8 10.58-5.06a1 1 0 0 1 1.342.488L18.5 8",
			key: "12lg5p"
		}],
		["path", {
			d: "M6 10V8",
			key: "1y41hn"
		}],
		["path", {
			d: "M6 14v1",
			key: "cao2tf"
		}],
		["path", {
			d: "M6 19v2",
			key: "1loha6"
		}],
		["rect", {
			x: "2",
			y: "8",
			width: "20",
			height: "13",
			rx: "2",
			key: "p3bz5l"
		}]
	]);
	const TimerOff = createLucideIcon("timer-off", [
		["path", {
			d: "M10 2h4",
			key: "n1abiw"
		}],
		["path", {
			d: "M4.6 11a8 8 0 0 0 1.7 8.7 8 8 0 0 0 8.7 1.7",
			key: "10he05"
		}],
		["path", {
			d: "M7.4 7.4a8 8 0 0 1 10.3 1 8 8 0 0 1 .9 10.2",
			key: "15f7sh"
		}],
		["path", {
			d: "m2 2 20 20",
			key: "1ooewy"
		}],
		["path", {
			d: "M12 12v-2",
			key: "fwoke6"
		}]
	]);
	const Timer = createLucideIcon("timer", [
		["line", {
			x1: "10",
			x2: "14",
			y1: "2",
			y2: "2",
			key: "14vaq8"
		}],
		["line", {
			x1: "12",
			x2: "15",
			y1: "14",
			y2: "11",
			key: "17fdiu"
		}],
		["circle", {
			cx: "12",
			cy: "14",
			r: "8",
			key: "1e1u0o"
		}]
	]);
	const ToggleLeft = createLucideIcon("toggle-left", [["circle", {
		cx: "9",
		cy: "12",
		r: "3",
		key: "u3jwor"
	}], ["rect", {
		width: "20",
		height: "14",
		x: "2",
		y: "5",
		rx: "7",
		key: "g7kal2"
	}]]);
	const TimerReset = createLucideIcon("timer-reset", [
		["path", {
			d: "M10 2h4",
			key: "n1abiw"
		}],
		["path", {
			d: "M12 14v-4",
			key: "1evpnu"
		}],
		["path", {
			d: "M4 13a8 8 0 0 1 8-7 8 8 0 1 1-5.3 14L4 17.6",
			key: "1ts96g"
		}],
		["path", {
			d: "M9 17H4v5",
			key: "8t5av"
		}]
	]);
	const ToggleRight = createLucideIcon("toggle-right", [["circle", {
		cx: "15",
		cy: "12",
		r: "3",
		key: "1afu0r"
	}], ["rect", {
		width: "20",
		height: "14",
		x: "2",
		y: "5",
		rx: "7",
		key: "g7kal2"
	}]]);
	const Toilet = createLucideIcon("toilet", [["path", {
		d: "M7 12h13a1 1 0 0 1 1 1 5 5 0 0 1-5 5h-.598a.5.5 0 0 0-.424.765l1.544 2.47a.5.5 0 0 1-.424.765H5.402a.5.5 0 0 1-.424-.765L7 18",
		key: "kc4kqr"
	}], ["path", {
		d: "M8 18a5 5 0 0 1-5-5V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8",
		key: "1tqs57"
	}]]);
	const ToolCase = createLucideIcon("tool-case", [
		["path", {
			d: "M10 15h4",
			key: "192ueg"
		}],
		["path", {
			d: "m14.817 10.995-.971-1.45 1.034-1.232a2 2 0 0 0-2.025-3.238l-1.82.364L9.91 3.885a2 2 0 0 0-3.625.748L6.141 6.55l-1.725.426a2 2 0 0 0-.19 3.756l.657.27",
			key: "xbnumr"
		}],
		["path", {
			d: "m18.822 10.995 2.26-5.38a1 1 0 0 0-.557-1.318L16.954 2.9a1 1 0 0 0-1.281.533l-.924 2.122",
			key: "eaw7gc"
		}],
		["path", {
			d: "M4 12.006A1 1 0 0 1 4.994 11H19a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z",
			key: "1vaooh"
		}]
	]);
	const Tornado = createLucideIcon("tornado", [
		["path", {
			d: "M21 4H3",
			key: "1hwok0"
		}],
		["path", {
			d: "M18 8H6",
			key: "41n648"
		}],
		["path", {
			d: "M19 12H9",
			key: "1g4lpz"
		}],
		["path", {
			d: "M16 16h-6",
			key: "1j5d54"
		}],
		["path", {
			d: "M11 20H9",
			key: "39obr8"
		}]
	]);
	const Torus = createLucideIcon("torus", [["ellipse", {
		cx: "12",
		cy: "11",
		rx: "3",
		ry: "2",
		key: "1b2qxu"
	}], ["ellipse", {
		cx: "12",
		cy: "12.5",
		rx: "10",
		ry: "8.5",
		key: "h8emeu"
	}]]);
	const TouchpadOff = createLucideIcon("touchpad-off", [
		["path", {
			d: "M12 20v-6",
			key: "1rm09r"
		}],
		["path", {
			d: "M19.656 14H22",
			key: "170xzr"
		}],
		["path", {
			d: "M2 14h12",
			key: "d8icqz"
		}],
		["path", {
			d: "m2 2 20 20",
			key: "1ooewy"
		}],
		["path", {
			d: "M20 20H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2",
			key: "s23sx2"
		}],
		["path", {
			d: "M9.656 4H20a2 2 0 0 1 2 2v10.344",
			key: "ovjcvl"
		}]
	]);
	const Touchpad = createLucideIcon("touchpad", [
		["rect", {
			width: "20",
			height: "16",
			x: "2",
			y: "4",
			rx: "2",
			key: "18n3k1"
		}],
		["path", {
			d: "M2 14h20",
			key: "myj16y"
		}],
		["path", {
			d: "M12 20v-6",
			key: "1rm09r"
		}]
	]);
	const TowerControl = createLucideIcon("tower-control", [
		["path", {
			d: "M18.2 12.27 20 6H4l1.8 6.27a1 1 0 0 0 .95.73h10.5a1 1 0 0 0 .96-.73Z",
			key: "1pledb"
		}],
		["path", {
			d: "M8 13v9",
			key: "hmv0ci"
		}],
		["path", {
			d: "M16 22v-9",
			key: "ylnf1u"
		}],
		["path", {
			d: "m9 6 1 7",
			key: "dpdgam"
		}],
		["path", {
			d: "m15 6-1 7",
			key: "ls7zgu"
		}],
		["path", {
			d: "M12 6V2",
			key: "1pj48d"
		}],
		["path", {
			d: "M13 2h-2",
			key: "mj6ths"
		}]
	]);
	const ToyBrick = createLucideIcon("toy-brick", [
		["rect", {
			width: "18",
			height: "12",
			x: "3",
			y: "8",
			rx: "1",
			key: "158fvp"
		}],
		["path", {
			d: "M10 8V5c0-.6-.4-1-1-1H6a1 1 0 0 0-1 1v3",
			key: "s0042v"
		}],
		["path", {
			d: "M19 8V5c0-.6-.4-1-1-1h-3a1 1 0 0 0-1 1v3",
			key: "9wmeh2"
		}]
	]);
	const Tractor = createLucideIcon("tractor", [
		["path", {
			d: "m10 11 11 .9a1 1 0 0 1 .8 1.1l-.665 4.158a1 1 0 0 1-.988.842H20",
			key: "she1j9"
		}],
		["path", {
			d: "M16 18h-5",
			key: "bq60fd"
		}],
		["path", {
			d: "M18 5a1 1 0 0 0-1 1v5.573",
			key: "1kv8ia"
		}],
		["path", {
			d: "M3 4h8.129a1 1 0 0 1 .99.863L13 11.246",
			key: "1q1ert"
		}],
		["path", {
			d: "M4 11V4",
			key: "9ft8pt"
		}],
		["path", {
			d: "M7 15h.01",
			key: "k5ht0j"
		}],
		["path", {
			d: "M8 10.1V4",
			key: "1jgyzo"
		}],
		["circle", {
			cx: "18",
			cy: "18",
			r: "2",
			key: "1emm8v"
		}],
		["circle", {
			cx: "7",
			cy: "15",
			r: "5",
			key: "ddtuc"
		}]
	]);
	const TrafficCone = createLucideIcon("traffic-cone", [
		["path", {
			d: "M16.05 10.966a5 2.5 0 0 1-8.1 0",
			key: "m5jpwb"
		}],
		["path", {
			d: "m16.923 14.049 4.48 2.04a1 1 0 0 1 .001 1.831l-8.574 3.9a2 2 0 0 1-1.66 0l-8.574-3.91a1 1 0 0 1 0-1.83l4.484-2.04",
			key: "rbg3g8"
		}],
		["path", {
			d: "M16.949 14.14a5 2.5 0 1 1-9.9 0L10.063 3.5a2 2 0 0 1 3.874 0z",
			key: "vap8c8"
		}],
		["path", {
			d: "M9.194 6.57a5 2.5 0 0 0 5.61 0",
			key: "15hn5c"
		}]
	]);
	const TrainFrontTunnel = createLucideIcon("train-front-tunnel", [
		["path", {
			d: "M2 22V12a10 10 0 1 1 20 0v10",
			key: "o0fyp0"
		}],
		["path", {
			d: "M15 6.8v1.4a3 2.8 0 1 1-6 0V6.8",
			key: "m8q3n9"
		}],
		["path", {
			d: "M10 15h.01",
			key: "44in9x"
		}],
		["path", {
			d: "M14 15h.01",
			key: "5mohn5"
		}],
		["path", {
			d: "M10 19a4 4 0 0 1-4-4v-3a6 6 0 1 1 12 0v3a4 4 0 0 1-4 4Z",
			key: "hckbmu"
		}],
		["path", {
			d: "m9 19-2 3",
			key: "iij7hm"
		}],
		["path", {
			d: "m15 19 2 3",
			key: "npx8sa"
		}]
	]);
	const TrainFront = createLucideIcon("train-front", [
		["path", {
			d: "M8 3.1V7a4 4 0 0 0 8 0V3.1",
			key: "1v71zp"
		}],
		["path", {
			d: "m9 15-1-1",
			key: "1yrq24"
		}],
		["path", {
			d: "m15 15 1-1",
			key: "1t0d6s"
		}],
		["path", {
			d: "M9 19c-2.8 0-5-2.2-5-5v-4a8 8 0 0 1 16 0v4c0 2.8-2.2 5-5 5Z",
			key: "1p0hjs"
		}],
		["path", {
			d: "m8 19-2 3",
			key: "13i0xs"
		}],
		["path", {
			d: "m16 19 2 3",
			key: "xo31yx"
		}]
	]);
	const TrainTrack = createLucideIcon("train-track", [
		["path", {
			d: "M2 17 17 2",
			key: "18b09t"
		}],
		["path", {
			d: "m2 14 8 8",
			key: "1gv9hu"
		}],
		["path", {
			d: "m5 11 8 8",
			key: "189pqp"
		}],
		["path", {
			d: "m8 8 8 8",
			key: "1imecy"
		}],
		["path", {
			d: "m11 5 8 8",
			key: "ummqn6"
		}],
		["path", {
			d: "m14 2 8 8",
			key: "1vk7dn"
		}],
		["path", {
			d: "M7 22 22 7",
			key: "15mb1i"
		}]
	]);
	const Transgender = createLucideIcon("transgender", [
		["path", {
			d: "M12 16v6",
			key: "c8a4gj"
		}],
		["path", {
			d: "M14 20h-4",
			key: "m8m19d"
		}],
		["path", {
			d: "M18 2h4v4",
			key: "1341mj"
		}],
		["path", {
			d: "m2 2 7.17 7.17",
			key: "13q8l2"
		}],
		["path", {
			d: "M2 5.355V2h3.357",
			key: "18136r"
		}],
		["path", {
			d: "m22 2-7.17 7.17",
			key: "1epvy4"
		}],
		["path", {
			d: "M8 5 5 8",
			key: "mgbjhz"
		}],
		["circle", {
			cx: "12",
			cy: "12",
			r: "4",
			key: "4exip2"
		}]
	]);
	const TramFront = createLucideIcon("tram-front", [
		["rect", {
			width: "16",
			height: "16",
			x: "4",
			y: "3",
			rx: "2",
			key: "1wxw4b"
		}],
		["path", {
			d: "M4 11h16",
			key: "mpoxn0"
		}],
		["path", {
			d: "M12 3v8",
			key: "1h2ygw"
		}],
		["path", {
			d: "m8 19-2 3",
			key: "13i0xs"
		}],
		["path", {
			d: "m18 22-2-3",
			key: "1p0ohu"
		}],
		["path", {
			d: "M8 15h.01",
			key: "a7atzg"
		}],
		["path", {
			d: "M16 15h.01",
			key: "rnfrdf"
		}]
	]);
	const Trash2 = createLucideIcon("trash-2", [
		["path", {
			d: "M10 11v6",
			key: "nco0om"
		}],
		["path", {
			d: "M14 11v6",
			key: "outv1u"
		}],
		["path", {
			d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",
			key: "miytrc"
		}],
		["path", {
			d: "M3 6h18",
			key: "d0wm0j"
		}],
		["path", {
			d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",
			key: "e791ji"
		}]
	]);
	const Trash = createLucideIcon("trash", [
		["path", {
			d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",
			key: "miytrc"
		}],
		["path", {
			d: "M3 6h18",
			key: "d0wm0j"
		}],
		["path", {
			d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",
			key: "e791ji"
		}]
	]);
	const TreeDeciduous = createLucideIcon("tree-deciduous", [["path", {
		d: "M8 19a4 4 0 0 1-2.24-7.32A3.5 3.5 0 0 1 9 6.03V6a3 3 0 1 1 6 0v.04a3.5 3.5 0 0 1 3.24 5.65A4 4 0 0 1 16 19Z",
		key: "oadzkq"
	}], ["path", {
		d: "M12 19v3",
		key: "npa21l"
	}]]);
	const TreePalm = createLucideIcon("tree-palm", [
		["path", {
			d: "M13 8c0-2.76-2.46-5-5.5-5S2 5.24 2 8h2l1-1 1 1h4",
			key: "foxbe7"
		}],
		["path", {
			d: "M13 7.14A5.82 5.82 0 0 1 16.5 6c3.04 0 5.5 2.24 5.5 5h-3l-1-1-1 1h-3",
			key: "18arnh"
		}],
		["path", {
			d: "M5.89 9.71c-2.15 2.15-2.3 5.47-.35 7.43l4.24-4.25.7-.7.71-.71 2.12-2.12c-1.95-1.96-5.27-1.8-7.42.35",
			key: "ywahnh"
		}],
		["path", {
			d: "M11 15.5c.5 2.5-.17 4.5-1 6.5h4c2-5.5-.5-12-1-14",
			key: "ft0feo"
		}]
	]);
	const TreePine = createLucideIcon("tree-pine", [["path", {
		d: "m17 14 3 3.3a1 1 0 0 1-.7 1.7H4.7a1 1 0 0 1-.7-1.7L7 14h-.3a1 1 0 0 1-.7-1.7L9 9h-.2A1 1 0 0 1 8 7.3L12 3l4 4.3a1 1 0 0 1-.8 1.7H15l3 3.3a1 1 0 0 1-.7 1.7H17Z",
		key: "cpyugq"
	}], ["path", {
		d: "M12 22v-3",
		key: "kmzjlo"
	}]]);
	const Trees = createLucideIcon("trees", [
		["path", {
			d: "M10 10v.2A3 3 0 0 1 8.9 16H5a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0Z",
			key: "1l6gj6"
		}],
		["path", {
			d: "M7 16v6",
			key: "1a82de"
		}],
		["path", {
			d: "M13 19v3",
			key: "13sx9i"
		}],
		["path", {
			d: "M12 19h8.3a1 1 0 0 0 .7-1.7L18 14h.3a1 1 0 0 0 .7-1.7L16 9h.2a1 1 0 0 0 .8-1.7L13 3l-1.4 1.5",
			key: "1sj9kv"
		}]
	]);
	const Trello = createLucideIcon("trello", [
		["rect", {
			width: "18",
			height: "18",
			x: "3",
			y: "3",
			rx: "2",
			ry: "2",
			key: "1m3agn"
		}],
		["rect", {
			width: "3",
			height: "9",
			x: "7",
			y: "7",
			key: "14n3xi"
		}],
		["rect", {
			width: "3",
			height: "5",
			x: "14",
			y: "7",
			key: "s4azjd"
		}]
	]);
	const TrendingDown = createLucideIcon("trending-down", [["path", {
		d: "M16 17h6v-6",
		key: "t6n2it"
	}], ["path", {
		d: "m22 17-8.5-8.5-5 5L2 7",
		key: "x473p"
	}]]);
	const TrendingUpDown = createLucideIcon("trending-up-down", [
		["path", {
			d: "M14.828 14.828 21 21",
			key: "ar5fw7"
		}],
		["path", {
			d: "M21 16v5h-5",
			key: "1ck2sf"
		}],
		["path", {
			d: "m21 3-9 9-4-4-6 6",
			key: "1h02xo"
		}],
		["path", {
			d: "M21 8V3h-5",
			key: "1qoq8a"
		}]
	]);
	const TrendingUp = createLucideIcon("trending-up", [["path", {
		d: "M16 7h6v6",
		key: "box55l"
	}], ["path", {
		d: "m22 7-8.5 8.5-5-5L2 17",
		key: "1t1m79"
	}]]);
	const TriangleAlert = createLucideIcon("triangle-alert", [
		["path", {
			d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
			key: "wmoenq"
		}],
		["path", {
			d: "M12 9v4",
			key: "juzpu7"
		}],
		["path", {
			d: "M12 17h.01",
			key: "p32p05"
		}]
	]);
	const TriangleDashed = createLucideIcon("triangle-dashed", [
		["path", {
			d: "M10.17 4.193a2 2 0 0 1 3.666.013",
			key: "pltmmw"
		}],
		["path", {
			d: "M14 21h2",
			key: "v4qezv"
		}],
		["path", {
			d: "m15.874 7.743 1 1.732",
			key: "10m0iw"
		}],
		["path", {
			d: "m18.849 12.952 1 1.732",
			key: "zadnam"
		}],
		["path", {
			d: "M21.824 18.18a2 2 0 0 1-1.835 2.824",
			key: "fvwuk4"
		}],
		["path", {
			d: "M4.024 21a2 2 0 0 1-1.839-2.839",
			key: "1e1kah"
		}],
		["path", {
			d: "m5.136 12.952-1 1.732",
			key: "1u4ldi"
		}],
		["path", {
			d: "M8 21h2",
			key: "i9zjee"
		}],
		["path", {
			d: "m8.102 7.743-1 1.732",
			key: "1zzo4u"
		}]
	]);
	const TriangleRight = createLucideIcon("triangle-right", [["path", {
		d: "M22 18a2 2 0 0 1-2 2H3c-1.1 0-1.3-.6-.4-1.3L20.4 4.3c.9-.7 1.6-.4 1.6.7Z",
		key: "183wce"
	}]]);
	const Triangle = createLucideIcon("triangle", [["path", {
		d: "M13.73 4a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z",
		key: "14u9p9"
	}]]);
	const Trophy = createLucideIcon("trophy", [
		["path", {
			d: "M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978",
			key: "1n3hpd"
		}],
		["path", {
			d: "M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978",
			key: "rfe1zi"
		}],
		["path", {
			d: "M18 9h1.5a1 1 0 0 0 0-5H18",
			key: "7xy6bh"
		}],
		["path", {
			d: "M4 22h16",
			key: "57wxv0"
		}],
		["path", {
			d: "M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z",
			key: "1mhfuq"
		}],
		["path", {
			d: "M6 9H4.5a1 1 0 0 1 0-5H6",
			key: "tex48p"
		}]
	]);
	const TruckElectric = createLucideIcon("truck-electric", [
		["path", {
			d: "M14 19V7a2 2 0 0 0-2-2H9",
			key: "15peso"
		}],
		["path", {
			d: "M15 19H9",
			key: "18q6dt"
		}],
		["path", {
			d: "M19 19h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62L18.3 9.38a1 1 0 0 0-.78-.38H14",
			key: "1dkp3j"
		}],
		["path", {
			d: "M2 13v5a1 1 0 0 0 1 1h2",
			key: "pkmmzz"
		}],
		["path", {
			d: "M4 3 2.15 5.15a.495.495 0 0 0 .35.86h2.15a.47.47 0 0 1 .35.86L3 9.02",
			key: "1n26pd"
		}],
		["circle", {
			cx: "17",
			cy: "19",
			r: "2",
			key: "1nxcgd"
		}],
		["circle", {
			cx: "7",
			cy: "19",
			r: "2",
			key: "gzo7y7"
		}]
	]);
	const Truck = createLucideIcon("truck", [
		["path", {
			d: "M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2",
			key: "wrbu53"
		}],
		["path", {
			d: "M15 18H9",
			key: "1lyqi6"
		}],
		["path", {
			d: "M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14",
			key: "lysw3i"
		}],
		["circle", {
			cx: "17",
			cy: "18",
			r: "2",
			key: "332jqn"
		}],
		["circle", {
			cx: "7",
			cy: "18",
			r: "2",
			key: "19iecd"
		}]
	]);
	const TurkishLira = createLucideIcon("turkish-lira", [
		["path", {
			d: "M15 4 5 9",
			key: "14bkc9"
		}],
		["path", {
			d: "m15 8.5-10 5",
			key: "1grtsx"
		}],
		["path", {
			d: "M18 12a9 9 0 0 1-9 9V3",
			key: "1sst7f"
		}]
	]);
	const Turntable = createLucideIcon("turntable", [
		["path", {
			d: "M10 12.01h.01",
			key: "7rp0yl"
		}],
		["path", {
			d: "M18 8v4a8 8 0 0 1-1.07 4",
			key: "1st48v"
		}],
		["circle", {
			cx: "10",
			cy: "12",
			r: "4",
			key: "19levz"
		}],
		["rect", {
			x: "2",
			y: "4",
			width: "20",
			height: "16",
			rx: "2",
			key: "izxlao"
		}]
	]);
	const TvMinimalPlay = createLucideIcon("tv-minimal-play", [
		["path", {
			d: "M15.033 9.44a.647.647 0 0 1 0 1.12l-4.065 2.352a.645.645 0 0 1-.968-.56V7.648a.645.645 0 0 1 .967-.56z",
			key: "vbtd3f"
		}],
		["path", {
			d: "M7 21h10",
			key: "1b0cd5"
		}],
		["rect", {
			width: "20",
			height: "14",
			x: "2",
			y: "3",
			rx: "2",
			key: "48i651"
		}]
	]);
	const Turtle = createLucideIcon("turtle", [
		["path", {
			d: "m12 10 2 4v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3a8 8 0 1 0-16 0v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3l2-4h4Z",
			key: "1lbbv7"
		}],
		["path", {
			d: "M4.82 7.9 8 10",
			key: "m9wose"
		}],
		["path", {
			d: "M15.18 7.9 12 10",
			key: "p8dp2u"
		}],
		["path", {
			d: "M16.93 10H20a2 2 0 0 1 0 4H2",
			key: "12nsm7"
		}]
	]);
	const TvMinimal = createLucideIcon("tv-minimal", [["path", {
		d: "M7 21h10",
		key: "1b0cd5"
	}], ["rect", {
		width: "20",
		height: "14",
		x: "2",
		y: "3",
		rx: "2",
		key: "48i651"
	}]]);
	const Tv = createLucideIcon("tv", [["path", {
		d: "m17 2-5 5-5-5",
		key: "16satq"
	}], ["rect", {
		width: "20",
		height: "15",
		x: "2",
		y: "7",
		rx: "2",
		key: "1e6viu"
	}]]);
	const Twitch = createLucideIcon("twitch", [["path", {
		d: "M21 2H3v16h5v4l4-4h5l4-4V2zm-10 9V7m5 4V7",
		key: "c0yzno"
	}]]);
	const Twitter = createLucideIcon("twitter", [["path", {
		d: "M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z",
		key: "pff0z6"
	}]]);
	const TypeOutline = createLucideIcon("type-outline", [["path", {
		d: "M14 16.5a.5.5 0 0 0 .5.5h.5a2 2 0 0 1 0 4H9a2 2 0 0 1 0-4h.5a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5V8a2 2 0 0 1-4 0V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v3a2 2 0 0 1-4 0v-.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5Z",
		key: "1reda3"
	}]]);
	const Type = createLucideIcon("type", [
		["path", {
			d: "M12 4v16",
			key: "1654pz"
		}],
		["path", {
			d: "M4 7V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2",
			key: "e0r10z"
		}],
		["path", {
			d: "M9 20h6",
			key: "s66wpe"
		}]
	]);
	const UmbrellaOff = createLucideIcon("umbrella-off", [
		["path", {
			d: "M12 13v7a2 2 0 0 0 4 0",
			key: "rpgb42"
		}],
		["path", {
			d: "M12 2v2",
			key: "tus03m"
		}],
		["path", {
			d: "M18.656 13h2.336a1 1 0 0 0 .97-1.274 10.284 10.284 0 0 0-12.07-7.51",
			key: "yawknk"
		}],
		["path", {
			d: "m2 2 20 20",
			key: "1ooewy"
		}],
		["path", {
			d: "M5.961 5.957a10.28 10.28 0 0 0-3.922 5.769A1 1 0 0 0 3 13h10",
			key: "5sfalc"
		}]
	]);
	const Umbrella = createLucideIcon("umbrella", [
		["path", {
			d: "M12 13v7a2 2 0 0 0 4 0",
			key: "rpgb42"
		}],
		["path", {
			d: "M12 2v2",
			key: "tus03m"
		}],
		["path", {
			d: "M20.992 13a1 1 0 0 0 .97-1.274 10.284 10.284 0 0 0-19.923 0A1 1 0 0 0 3 13z",
			key: "124nyo"
		}]
	]);
	const Underline = createLucideIcon("underline", [["path", {
		d: "M6 4v6a6 6 0 0 0 12 0V4",
		key: "9kb039"
	}], ["line", {
		x1: "4",
		x2: "20",
		y1: "20",
		y2: "20",
		key: "nun2al"
	}]]);
	const Undo2 = createLucideIcon("undo-2", [["path", {
		d: "M9 14 4 9l5-5",
		key: "102s5s"
	}], ["path", {
		d: "M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11",
		key: "f3b9sd"
	}]]);
	const UndoDot = createLucideIcon("undo-dot", [
		["path", {
			d: "M21 17a9 9 0 0 0-15-6.7L3 13",
			key: "8mp6z9"
		}],
		["path", {
			d: "M3 7v6h6",
			key: "1v2h90"
		}],
		["circle", {
			cx: "12",
			cy: "17",
			r: "1",
			key: "1ixnty"
		}]
	]);
	const Undo = createLucideIcon("undo", [["path", {
		d: "M3 7v6h6",
		key: "1v2h90"
	}], ["path", {
		d: "M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13",
		key: "1r6uu6"
	}]]);
	const UnfoldHorizontal = createLucideIcon("unfold-horizontal", [
		["path", {
			d: "M16 12h6",
			key: "15xry1"
		}],
		["path", {
			d: "M8 12H2",
			key: "1jqql6"
		}],
		["path", {
			d: "M12 2v2",
			key: "tus03m"
		}],
		["path", {
			d: "M12 8v2",
			key: "1woqiv"
		}],
		["path", {
			d: "M12 14v2",
			key: "8jcxud"
		}],
		["path", {
			d: "M12 20v2",
			key: "1lh1kg"
		}],
		["path", {
			d: "m19 15 3-3-3-3",
			key: "wjy7rq"
		}],
		["path", {
			d: "m5 9-3 3 3 3",
			key: "j64kie"
		}]
	]);
	const UnfoldVertical = createLucideIcon("unfold-vertical", [
		["path", {
			d: "M12 22v-6",
			key: "6o8u61"
		}],
		["path", {
			d: "M12 8V2",
			key: "1wkif3"
		}],
		["path", {
			d: "M4 12H2",
			key: "rhcxmi"
		}],
		["path", {
			d: "M10 12H8",
			key: "s88cx1"
		}],
		["path", {
			d: "M16 12h-2",
			key: "10asgb"
		}],
		["path", {
			d: "M22 12h-2",
			key: "14jgyd"
		}],
		["path", {
			d: "m15 19-3 3-3-3",
			key: "11eu04"
		}],
		["path", {
			d: "m15 5-3-3-3 3",
			key: "itvq4r"
		}]
	]);
	const Ungroup = createLucideIcon("ungroup", [["rect", {
		width: "8",
		height: "6",
		x: "5",
		y: "4",
		rx: "1",
		key: "nzclkv"
	}], ["rect", {
		width: "8",
		height: "6",
		x: "11",
		y: "14",
		rx: "1",
		key: "4tytwb"
	}]]);
	const University = createLucideIcon("university", [
		["path", {
			d: "M14 21v-3a2 2 0 0 0-4 0v3",
			key: "1rgiei"
		}],
		["path", {
			d: "M18 12h.01",
			key: "yjnet6"
		}],
		["path", {
			d: "M18 16h.01",
			key: "plv8zi"
		}],
		["path", {
			d: "M22 7a1 1 0 0 0-1-1h-2a2 2 0 0 1-1.143-.359L13.143 2.36a2 2 0 0 0-2.286-.001L6.143 5.64A2 2 0 0 1 5 6H3a1 1 0 0 0-1 1v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2z",
			key: "1ogmi3"
		}],
		["path", {
			d: "M6 12h.01",
			key: "c2rlol"
		}],
		["path", {
			d: "M6 16h.01",
			key: "1pmjb7"
		}],
		["circle", {
			cx: "12",
			cy: "10",
			r: "2",
			key: "1yojzk"
		}]
	]);
	const Unlink2 = createLucideIcon("unlink-2", [["path", {
		d: "M15 7h2a5 5 0 0 1 0 10h-2m-6 0H7A5 5 0 0 1 7 7h2",
		key: "1re2ne"
	}]]);
	const Unlink = createLucideIcon("unlink", [
		["path", {
			d: "m18.84 12.25 1.72-1.71h-.02a5.004 5.004 0 0 0-.12-7.07 5.006 5.006 0 0 0-6.95 0l-1.72 1.71",
			key: "yqzxt4"
		}],
		["path", {
			d: "m5.17 11.75-1.71 1.71a5.004 5.004 0 0 0 .12 7.07 5.006 5.006 0 0 0 6.95 0l1.71-1.71",
			key: "4qinb0"
		}],
		["line", {
			x1: "8",
			x2: "8",
			y1: "2",
			y2: "5",
			key: "1041cp"
		}],
		["line", {
			x1: "2",
			x2: "5",
			y1: "8",
			y2: "8",
			key: "14m1p5"
		}],
		["line", {
			x1: "16",
			x2: "16",
			y1: "19",
			y2: "22",
			key: "rzdirn"
		}],
		["line", {
			x1: "19",
			x2: "22",
			y1: "16",
			y2: "16",
			key: "ox905f"
		}]
	]);
	const Unplug = createLucideIcon("unplug", [
		["path", {
			d: "m19 5 3-3",
			key: "yk6iyv"
		}],
		["path", {
			d: "m2 22 3-3",
			key: "19mgm9"
		}],
		["path", {
			d: "M6.3 20.3a2.4 2.4 0 0 0 3.4 0L12 18l-6-6-2.3 2.3a2.4 2.4 0 0 0 0 3.4Z",
			key: "goz73y"
		}],
		["path", {
			d: "M7.5 13.5 10 11",
			key: "7xgeeb"
		}],
		["path", {
			d: "M10.5 16.5 13 14",
			key: "10btkg"
		}],
		["path", {
			d: "m12 6 6 6 2.3-2.3a2.4 2.4 0 0 0 0-3.4l-2.6-2.6a2.4 2.4 0 0 0-3.4 0Z",
			key: "1snsnr"
		}]
	]);
	const Upload = createLucideIcon("upload", [
		["path", {
			d: "M12 3v12",
			key: "1x0j5s"
		}],
		["path", {
			d: "m17 8-5-5-5 5",
			key: "7q97r8"
		}],
		["path", {
			d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",
			key: "ih7n3h"
		}]
	]);
	const Usb = createLucideIcon("usb", [
		["circle", {
			cx: "10",
			cy: "7",
			r: "1",
			key: "dypaad"
		}],
		["circle", {
			cx: "4",
			cy: "20",
			r: "1",
			key: "22iqad"
		}],
		["path", {
			d: "M4.7 19.3 19 5",
			key: "1enqfc"
		}],
		["path", {
			d: "m21 3-3 1 2 2Z",
			key: "d3ov82"
		}],
		["path", {
			d: "M9.26 7.68 5 12l2 5",
			key: "1esawj"
		}],
		["path", {
			d: "m10 14 5 2 3.5-3.5",
			key: "v8oal5"
		}],
		["path", {
			d: "m18 12 1-1 1 1-1 1Z",
			key: "1bh22v"
		}]
	]);
	const UserCheck = createLucideIcon("user-check", [
		["path", {
			d: "m16 11 2 2 4-4",
			key: "9rsbq5"
		}],
		["path", {
			d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",
			key: "1yyitq"
		}],
		["circle", {
			cx: "9",
			cy: "7",
			r: "4",
			key: "nufk8"
		}]
	]);
	const UserCog = createLucideIcon("user-cog", [
		["path", {
			d: "M10 15H6a4 4 0 0 0-4 4v2",
			key: "1nfge6"
		}],
		["path", {
			d: "m14.305 16.53.923-.382",
			key: "1itpsq"
		}],
		["path", {
			d: "m15.228 13.852-.923-.383",
			key: "eplpkm"
		}],
		["path", {
			d: "m16.852 12.228-.383-.923",
			key: "13v3q0"
		}],
		["path", {
			d: "m16.852 17.772-.383.924",
			key: "1i8mnm"
		}],
		["path", {
			d: "m19.148 12.228.383-.923",
			key: "1q8j1v"
		}],
		["path", {
			d: "m19.53 18.696-.382-.924",
			key: "vk1qj3"
		}],
		["path", {
			d: "m20.772 13.852.924-.383",
			key: "n880s0"
		}],
		["path", {
			d: "m20.772 16.148.924.383",
			key: "1g6xey"
		}],
		["circle", {
			cx: "18",
			cy: "15",
			r: "3",
			key: "gjjjvw"
		}],
		["circle", {
			cx: "9",
			cy: "7",
			r: "4",
			key: "nufk8"
		}]
	]);
	const UserLock = createLucideIcon("user-lock", [
		["circle", {
			cx: "10",
			cy: "7",
			r: "4",
			key: "e45bow"
		}],
		["path", {
			d: "M10.3 15H7a4 4 0 0 0-4 4v2",
			key: "3bnktk"
		}],
		["path", {
			d: "M15 15.5V14a2 2 0 0 1 4 0v1.5",
			key: "12ym5i"
		}],
		["rect", {
			width: "8",
			height: "5",
			x: "13",
			y: "16",
			rx: ".899",
			key: "4p176n"
		}]
	]);
	const UserPlus = createLucideIcon("user-plus", [
		["path", {
			d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",
			key: "1yyitq"
		}],
		["circle", {
			cx: "9",
			cy: "7",
			r: "4",
			key: "nufk8"
		}],
		["line", {
			x1: "19",
			x2: "19",
			y1: "8",
			y2: "14",
			key: "1bvyxn"
		}],
		["line", {
			x1: "22",
			x2: "16",
			y1: "11",
			y2: "11",
			key: "1shjgl"
		}]
	]);
	const UserMinus = createLucideIcon("user-minus", [
		["path", {
			d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",
			key: "1yyitq"
		}],
		["circle", {
			cx: "9",
			cy: "7",
			r: "4",
			key: "nufk8"
		}],
		["line", {
			x1: "22",
			x2: "16",
			y1: "11",
			y2: "11",
			key: "1shjgl"
		}]
	]);
	const UserPen = createLucideIcon("user-pen", [
		["path", {
			d: "M11.5 15H7a4 4 0 0 0-4 4v2",
			key: "15lzij"
		}],
		["path", {
			d: "M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z",
			key: "1817ys"
		}],
		["circle", {
			cx: "10",
			cy: "7",
			r: "4",
			key: "e45bow"
		}]
	]);
	const UserRoundCheck = createLucideIcon("user-round-check", [
		["path", {
			d: "M2 21a8 8 0 0 1 13.292-6",
			key: "bjp14o"
		}],
		["circle", {
			cx: "10",
			cy: "8",
			r: "5",
			key: "o932ke"
		}],
		["path", {
			d: "m16 19 2 2 4-4",
			key: "1b14m6"
		}]
	]);
	const UserRoundCog = createLucideIcon("user-round-cog", [
		["path", {
			d: "m14.305 19.53.923-.382",
			key: "3m78fa"
		}],
		["path", {
			d: "m15.228 16.852-.923-.383",
			key: "npixar"
		}],
		["path", {
			d: "m16.852 15.228-.383-.923",
			key: "5xggr7"
		}],
		["path", {
			d: "m16.852 20.772-.383.924",
			key: "dpfhf9"
		}],
		["path", {
			d: "m19.148 15.228.383-.923",
			key: "1reyyz"
		}],
		["path", {
			d: "m19.53 21.696-.382-.924",
			key: "1goivc"
		}],
		["path", {
			d: "M2 21a8 8 0 0 1 10.434-7.62",
			key: "1yezr2"
		}],
		["path", {
			d: "m20.772 16.852.924-.383",
			key: "htqkph"
		}],
		["path", {
			d: "m20.772 19.148.924.383",
			key: "9w9pjp"
		}],
		["circle", {
			cx: "10",
			cy: "8",
			r: "5",
			key: "o932ke"
		}],
		["circle", {
			cx: "18",
			cy: "18",
			r: "3",
			key: "1xkwt0"
		}]
	]);
	const UserRoundMinus = createLucideIcon("user-round-minus", [
		["path", {
			d: "M2 21a8 8 0 0 1 13.292-6",
			key: "bjp14o"
		}],
		["circle", {
			cx: "10",
			cy: "8",
			r: "5",
			key: "o932ke"
		}],
		["path", {
			d: "M22 19h-6",
			key: "vcuq98"
		}]
	]);
	const UserRoundPen = createLucideIcon("user-round-pen", [
		["path", {
			d: "M2 21a8 8 0 0 1 10.821-7.487",
			key: "1c8h7z"
		}],
		["path", {
			d: "M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z",
			key: "1817ys"
		}],
		["circle", {
			cx: "10",
			cy: "8",
			r: "5",
			key: "o932ke"
		}]
	]);
	const UserRoundPlus = createLucideIcon("user-round-plus", [
		["path", {
			d: "M2 21a8 8 0 0 1 13.292-6",
			key: "bjp14o"
		}],
		["circle", {
			cx: "10",
			cy: "8",
			r: "5",
			key: "o932ke"
		}],
		["path", {
			d: "M19 16v6",
			key: "tddt3s"
		}],
		["path", {
			d: "M22 19h-6",
			key: "vcuq98"
		}]
	]);
	const UserRoundSearch = createLucideIcon("user-round-search", [
		["circle", {
			cx: "10",
			cy: "8",
			r: "5",
			key: "o932ke"
		}],
		["path", {
			d: "M2 21a8 8 0 0 1 10.434-7.62",
			key: "1yezr2"
		}],
		["circle", {
			cx: "18",
			cy: "18",
			r: "3",
			key: "1xkwt0"
		}],
		["path", {
			d: "m22 22-1.9-1.9",
			key: "1e5ubv"
		}]
	]);
	const UserRoundX = createLucideIcon("user-round-x", [
		["path", {
			d: "M2 21a8 8 0 0 1 11.873-7",
			key: "74fkxq"
		}],
		["circle", {
			cx: "10",
			cy: "8",
			r: "5",
			key: "o932ke"
		}],
		["path", {
			d: "m17 17 5 5",
			key: "p7ous7"
		}],
		["path", {
			d: "m22 17-5 5",
			key: "gqnmv0"
		}]
	]);
	const UserRound = createLucideIcon("user-round", [["circle", {
		cx: "12",
		cy: "8",
		r: "5",
		key: "1hypcn"
	}], ["path", {
		d: "M20 21a8 8 0 0 0-16 0",
		key: "rfgkzh"
	}]]);
	const UserSearch = createLucideIcon("user-search", [
		["circle", {
			cx: "10",
			cy: "7",
			r: "4",
			key: "e45bow"
		}],
		["path", {
			d: "M10.3 15H7a4 4 0 0 0-4 4v2",
			key: "3bnktk"
		}],
		["circle", {
			cx: "17",
			cy: "17",
			r: "3",
			key: "18b49y"
		}],
		["path", {
			d: "m21 21-1.9-1.9",
			key: "1g2n9r"
		}]
	]);
	const UserStar = createLucideIcon("user-star", [
		["path", {
			d: "M16.051 12.616a1 1 0 0 1 1.909.024l.737 1.452a1 1 0 0 0 .737.535l1.634.256a1 1 0 0 1 .588 1.806l-1.172 1.168a1 1 0 0 0-.282.866l.259 1.613a1 1 0 0 1-1.541 1.134l-1.465-.75a1 1 0 0 0-.912 0l-1.465.75a1 1 0 0 1-1.539-1.133l.258-1.613a1 1 0 0 0-.282-.866l-1.156-1.153a1 1 0 0 1 .572-1.822l1.633-.256a1 1 0 0 0 .737-.535z",
			key: "1m8t9f"
		}],
		["path", {
			d: "M8 15H7a4 4 0 0 0-4 4v2",
			key: "l9tmp8"
		}],
		["circle", {
			cx: "10",
			cy: "7",
			r: "4",
			key: "e45bow"
		}]
	]);
	const UserX = createLucideIcon("user-x", [
		["path", {
			d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",
			key: "1yyitq"
		}],
		["circle", {
			cx: "9",
			cy: "7",
			r: "4",
			key: "nufk8"
		}],
		["line", {
			x1: "17",
			x2: "22",
			y1: "8",
			y2: "13",
			key: "3nzzx3"
		}],
		["line", {
			x1: "22",
			x2: "17",
			y1: "8",
			y2: "13",
			key: "1swrse"
		}]
	]);
	const User = createLucideIcon("user", [["path", {
		d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",
		key: "975kel"
	}], ["circle", {
		cx: "12",
		cy: "7",
		r: "4",
		key: "17ys0d"
	}]]);
	const UsersRound = createLucideIcon("users-round", [
		["path", {
			d: "M18 21a8 8 0 0 0-16 0",
			key: "3ypg7q"
		}],
		["circle", {
			cx: "10",
			cy: "8",
			r: "5",
			key: "o932ke"
		}],
		["path", {
			d: "M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3",
			key: "10s06x"
		}]
	]);
	const Users = createLucideIcon("users", [
		["path", {
			d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",
			key: "1yyitq"
		}],
		["path", {
			d: "M16 3.128a4 4 0 0 1 0 7.744",
			key: "16gr8j"
		}],
		["path", {
			d: "M22 21v-2a4 4 0 0 0-3-3.87",
			key: "kshegd"
		}],
		["circle", {
			cx: "9",
			cy: "7",
			r: "4",
			key: "nufk8"
		}]
	]);
	const UtensilsCrossed = createLucideIcon("utensils-crossed", [
		["path", {
			d: "m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8",
			key: "n7qcjb"
		}],
		["path", {
			d: "M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7",
			key: "d0u48b"
		}],
		["path", {
			d: "m2.1 21.8 6.4-6.3",
			key: "yn04lh"
		}],
		["path", {
			d: "m19 5-7 7",
			key: "194lzd"
		}]
	]);
	const Utensils = createLucideIcon("utensils", [
		["path", {
			d: "M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2",
			key: "cjf0a3"
		}],
		["path", {
			d: "M7 2v20",
			key: "1473qp"
		}],
		["path", {
			d: "M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7",
			key: "j28e5"
		}]
	]);
	const UtilityPole = createLucideIcon("utility-pole", [
		["path", {
			d: "M12 2v20",
			key: "t6zp3m"
		}],
		["path", {
			d: "M2 5h20",
			key: "1fs1ex"
		}],
		["path", {
			d: "M3 3v2",
			key: "9imdir"
		}],
		["path", {
			d: "M7 3v2",
			key: "n0os7"
		}],
		["path", {
			d: "M17 3v2",
			key: "1l2re6"
		}],
		["path", {
			d: "M21 3v2",
			key: "1duuac"
		}],
		["path", {
			d: "m19 5-7 7-7-7",
			key: "133zxf"
		}]
	]);
	const Vault = createLucideIcon("vault", [
		["rect", {
			width: "18",
			height: "18",
			x: "3",
			y: "3",
			rx: "2",
			key: "afitv7"
		}],
		["circle", {
			cx: "7.5",
			cy: "7.5",
			r: ".5",
			fill: "currentColor",
			key: "kqv944"
		}],
		["path", {
			d: "m7.9 7.9 2.7 2.7",
			key: "hpeyl3"
		}],
		["circle", {
			cx: "16.5",
			cy: "7.5",
			r: ".5",
			fill: "currentColor",
			key: "w0ekpg"
		}],
		["path", {
			d: "m13.4 10.6 2.7-2.7",
			key: "264c1n"
		}],
		["circle", {
			cx: "7.5",
			cy: "16.5",
			r: ".5",
			fill: "currentColor",
			key: "nkw3mc"
		}],
		["path", {
			d: "m7.9 16.1 2.7-2.7",
			key: "p81g5e"
		}],
		["circle", {
			cx: "16.5",
			cy: "16.5",
			r: ".5",
			fill: "currentColor",
			key: "fubopw"
		}],
		["path", {
			d: "m13.4 13.4 2.7 2.7",
			key: "abhel3"
		}],
		["circle", {
			cx: "12",
			cy: "12",
			r: "2",
			key: "1c9p78"
		}]
	]);
	const Variable = createLucideIcon("variable", [
		["path", {
			d: "M8 21s-4-3-4-9 4-9 4-9",
			key: "uto9ud"
		}],
		["path", {
			d: "M16 3s4 3 4 9-4 9-4 9",
			key: "4w2vsq"
		}],
		["line", {
			x1: "15",
			x2: "9",
			y1: "9",
			y2: "15",
			key: "f7djnv"
		}],
		["line", {
			x1: "9",
			x2: "15",
			y1: "9",
			y2: "15",
			key: "1shsy8"
		}]
	]);
	const VectorSquare = createLucideIcon("vector-square", [
		["path", {
			d: "M19.5 7a24 24 0 0 1 0 10",
			key: "8n60xe"
		}],
		["path", {
			d: "M4.5 7a24 24 0 0 0 0 10",
			key: "2lmadr"
		}],
		["path", {
			d: "M7 19.5a24 24 0 0 0 10 0",
			key: "1q94o2"
		}],
		["path", {
			d: "M7 4.5a24 24 0 0 1 10 0",
			key: "2z8ypa"
		}],
		["rect", {
			x: "17",
			y: "17",
			width: "5",
			height: "5",
			rx: "1",
			key: "1ac74s"
		}],
		["rect", {
			x: "17",
			y: "2",
			width: "5",
			height: "5",
			rx: "1",
			key: "1e7h5j"
		}],
		["rect", {
			x: "2",
			y: "17",
			width: "5",
			height: "5",
			rx: "1",
			key: "1t4eah"
		}],
		["rect", {
			x: "2",
			y: "2",
			width: "5",
			height: "5",
			rx: "1",
			key: "940dhs"
		}]
	]);
	const Vegan = createLucideIcon("vegan", [
		["path", {
			d: "M16 8q6 0 6-6-6 0-6 6",
			key: "qsyyc4"
		}],
		["path", {
			d: "M17.41 3.59a10 10 0 1 0 3 3",
			key: "41m9h7"
		}],
		["path", {
			d: "M2 2a26.6 26.6 0 0 1 10 20c.9-6.82 1.5-9.5 4-14",
			key: "qiv7li"
		}]
	]);
	const VenetianMask = createLucideIcon("venetian-mask", [
		["path", {
			d: "M18 11c-1.5 0-2.5.5-3 2",
			key: "1fod00"
		}],
		["path", {
			d: "M4 6a2 2 0 0 0-2 2v4a5 5 0 0 0 5 5 8 8 0 0 1 5 2 8 8 0 0 1 5-2 5 5 0 0 0 5-5V8a2 2 0 0 0-2-2h-3a8 8 0 0 0-5 2 8 8 0 0 0-5-2z",
			key: "d70hit"
		}],
		["path", {
			d: "M6 11c1.5 0 2.5.5 3 2",
			key: "136fht"
		}]
	]);
	const VenusAndMars = createLucideIcon("venus-and-mars", [
		["path", {
			d: "M10 20h4",
			key: "ni2waw"
		}],
		["path", {
			d: "M12 16v6",
			key: "c8a4gj"
		}],
		["path", {
			d: "M17 2h4v4",
			key: "vhe59"
		}],
		["path", {
			d: "m21 2-5.46 5.46",
			key: "19kypf"
		}],
		["circle", {
			cx: "12",
			cy: "11",
			r: "5",
			key: "16gxyc"
		}]
	]);
	const Venus = createLucideIcon("venus", [
		["path", {
			d: "M12 15v7",
			key: "t2xh3l"
		}],
		["path", {
			d: "M9 19h6",
			key: "456am0"
		}],
		["circle", {
			cx: "12",
			cy: "9",
			r: "6",
			key: "1nw4tq"
		}]
	]);
	const VibrateOff = createLucideIcon("vibrate-off", [
		["path", {
			d: "m2 8 2 2-2 2 2 2-2 2",
			key: "sv1b1"
		}],
		["path", {
			d: "m22 8-2 2 2 2-2 2 2 2",
			key: "101i4y"
		}],
		["path", {
			d: "M8 8v10c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2",
			key: "1hbad5"
		}],
		["path", {
			d: "M16 10.34V6c0-.55-.45-1-1-1h-4.34",
			key: "1x5tf0"
		}],
		["line", {
			x1: "2",
			x2: "22",
			y1: "2",
			y2: "22",
			key: "a6p6uj"
		}]
	]);
	const Vibrate = createLucideIcon("vibrate", [
		["path", {
			d: "m2 8 2 2-2 2 2 2-2 2",
			key: "sv1b1"
		}],
		["path", {
			d: "m22 8-2 2 2 2-2 2 2 2",
			key: "101i4y"
		}],
		["rect", {
			width: "8",
			height: "14",
			x: "8",
			y: "5",
			rx: "1",
			key: "1oyrl4"
		}]
	]);
	const VideoOff = createLucideIcon("video-off", [
		["path", {
			d: "M10.66 6H14a2 2 0 0 1 2 2v2.5l5.248-3.062A.5.5 0 0 1 22 7.87v8.196",
			key: "w8jjjt"
		}],
		["path", {
			d: "M16 16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2",
			key: "1xawa7"
		}],
		["path", {
			d: "m2 2 20 20",
			key: "1ooewy"
		}]
	]);
	const Video = createLucideIcon("video", [["path", {
		d: "m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5",
		key: "ftymec"
	}], ["rect", {
		x: "2",
		y: "6",
		width: "14",
		height: "12",
		rx: "2",
		key: "158x01"
	}]]);
	const Videotape = createLucideIcon("videotape", [
		["rect", {
			width: "20",
			height: "16",
			x: "2",
			y: "4",
			rx: "2",
			key: "18n3k1"
		}],
		["path", {
			d: "M2 8h20",
			key: "d11cs7"
		}],
		["circle", {
			cx: "8",
			cy: "14",
			r: "2",
			key: "1k2qr5"
		}],
		["path", {
			d: "M8 12h8",
			key: "1wcyev"
		}],
		["circle", {
			cx: "16",
			cy: "14",
			r: "2",
			key: "14k7lr"
		}]
	]);
	const View = createLucideIcon("view", [
		["path", {
			d: "M21 17v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2",
			key: "mrq65r"
		}],
		["path", {
			d: "M21 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2",
			key: "be3xqs"
		}],
		["circle", {
			cx: "12",
			cy: "12",
			r: "1",
			key: "41hilf"
		}],
		["path", {
			d: "M18.944 12.33a1 1 0 0 0 0-.66 7.5 7.5 0 0 0-13.888 0 1 1 0 0 0 0 .66 7.5 7.5 0 0 0 13.888 0",
			key: "11ak4c"
		}]
	]);
	const Voicemail = createLucideIcon("voicemail", [
		["circle", {
			cx: "6",
			cy: "12",
			r: "4",
			key: "1ehtga"
		}],
		["circle", {
			cx: "18",
			cy: "12",
			r: "4",
			key: "4vafl8"
		}],
		["line", {
			x1: "6",
			x2: "18",
			y1: "16",
			y2: "16",
			key: "pmt8us"
		}]
	]);
	const Volleyball = createLucideIcon("volleyball", [
		["path", {
			d: "M11.1 7.1a16.55 16.55 0 0 1 10.9 4",
			key: "2880wi"
		}],
		["path", {
			d: "M12 12a12.6 12.6 0 0 1-8.7 5",
			key: "113sja"
		}],
		["path", {
			d: "M16.8 13.6a16.55 16.55 0 0 1-9 7.5",
			key: "1qmsgl"
		}],
		["path", {
			d: "M20.7 17a12.8 12.8 0 0 0-8.7-5 13.3 13.3 0 0 1 0-10",
			key: "1bmeqp"
		}],
		["path", {
			d: "M6.3 3.8a16.55 16.55 0 0 0 1.9 11.5",
			key: "iekzv9"
		}],
		["circle", {
			cx: "12",
			cy: "12",
			r: "10",
			key: "1mglay"
		}]
	]);
	const Volume1 = createLucideIcon("volume-1", [["path", {
		d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",
		key: "uqj9uw"
	}], ["path", {
		d: "M16 9a5 5 0 0 1 0 6",
		key: "1q6k2b"
	}]]);
	const Volume2 = createLucideIcon("volume-2", [
		["path", {
			d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",
			key: "uqj9uw"
		}],
		["path", {
			d: "M16 9a5 5 0 0 1 0 6",
			key: "1q6k2b"
		}],
		["path", {
			d: "M19.364 18.364a9 9 0 0 0 0-12.728",
			key: "ijwkga"
		}]
	]);
	const VolumeOff = createLucideIcon("volume-off", [
		["path", {
			d: "M16 9a5 5 0 0 1 .95 2.293",
			key: "1fgyg8"
		}],
		["path", {
			d: "M19.364 5.636a9 9 0 0 1 1.889 9.96",
			key: "l3zxae"
		}],
		["path", {
			d: "m2 2 20 20",
			key: "1ooewy"
		}],
		["path", {
			d: "m7 7-.587.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298V11",
			key: "1gbwow"
		}],
		["path", {
			d: "M9.828 4.172A.686.686 0 0 1 11 4.657v.686",
			key: "s2je0y"
		}]
	]);
	const VolumeX = createLucideIcon("volume-x", [
		["path", {
			d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",
			key: "uqj9uw"
		}],
		["line", {
			x1: "22",
			x2: "16",
			y1: "9",
			y2: "15",
			key: "1ewh16"
		}],
		["line", {
			x1: "16",
			x2: "22",
			y1: "9",
			y2: "15",
			key: "5ykzw1"
		}]
	]);
	const Volume = createLucideIcon("volume", [["path", {
		d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",
		key: "uqj9uw"
	}]]);
	const Vote = createLucideIcon("vote", [
		["path", {
			d: "m9 12 2 2 4-4",
			key: "dzmm74"
		}],
		["path", {
			d: "M5 7c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v12H5V7Z",
			key: "1ezoue"
		}],
		["path", {
			d: "M22 19H2",
			key: "nuriw5"
		}]
	]);
	const WalletCards = createLucideIcon("wallet-cards", [
		["rect", {
			width: "18",
			height: "18",
			x: "3",
			y: "3",
			rx: "2",
			key: "afitv7"
		}],
		["path", {
			d: "M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2",
			key: "4125el"
		}],
		["path", {
			d: "M3 11h3c.8 0 1.6.3 2.1.9l1.1.9c1.6 1.6 4.1 1.6 5.7 0l1.1-.9c.5-.5 1.3-.9 2.1-.9H21",
			key: "1dpki6"
		}]
	]);
	const WalletMinimal = createLucideIcon("wallet-minimal", [["path", {
		d: "M17 14h.01",
		key: "7oqj8z"
	}], ["path", {
		d: "M7 7h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14",
		key: "u1rqew"
	}]]);
	const Wallpaper = createLucideIcon("wallpaper", [
		["path", {
			d: "M12 17v4",
			key: "1riwvh"
		}],
		["path", {
			d: "M8 21h8",
			key: "1ev6f3"
		}],
		["path", {
			d: "m9 17 6.1-6.1a2 2 0 0 1 2.81.01L22 15",
			key: "1sl52q"
		}],
		["circle", {
			cx: "8",
			cy: "9",
			r: "2",
			key: "gjzl9d"
		}],
		["rect", {
			x: "2",
			y: "3",
			width: "20",
			height: "14",
			rx: "2",
			key: "x3v2xh"
		}]
	]);
	const Wallet = createLucideIcon("wallet", [["path", {
		d: "M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1",
		key: "18etb6"
	}], ["path", {
		d: "M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4",
		key: "xoc0q4"
	}]]);
	const WandSparkles = createLucideIcon("wand-sparkles", [
		["path", {
			d: "m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72",
			key: "ul74o6"
		}],
		["path", {
			d: "m14 7 3 3",
			key: "1r5n42"
		}],
		["path", {
			d: "M5 6v4",
			key: "ilb8ba"
		}],
		["path", {
			d: "M19 14v4",
			key: "blhpug"
		}],
		["path", {
			d: "M10 2v2",
			key: "7u0qdc"
		}],
		["path", {
			d: "M7 8H3",
			key: "zfb6yr"
		}],
		["path", {
			d: "M21 16h-4",
			key: "1cnmox"
		}],
		["path", {
			d: "M11 3H9",
			key: "1obp7u"
		}]
	]);
	const Wand = createLucideIcon("wand", [
		["path", {
			d: "M15 4V2",
			key: "z1p9b7"
		}],
		["path", {
			d: "M15 16v-2",
			key: "px0unx"
		}],
		["path", {
			d: "M8 9h2",
			key: "1g203m"
		}],
		["path", {
			d: "M20 9h2",
			key: "19tzq7"
		}],
		["path", {
			d: "M17.8 11.8 19 13",
			key: "yihg8r"
		}],
		["path", {
			d: "M15 9h.01",
			key: "x1ddxp"
		}],
		["path", {
			d: "M17.8 6.2 19 5",
			key: "fd4us0"
		}],
		["path", {
			d: "m3 21 9-9",
			key: "1jfql5"
		}],
		["path", {
			d: "M12.2 6.2 11 5",
			key: "i3da3b"
		}]
	]);
	const Warehouse = createLucideIcon("warehouse", [
		["path", {
			d: "M18 21V10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v11",
			key: "pb2vm6"
		}],
		["path", {
			d: "M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 1.132-1.803l7.95-3.974a2 2 0 0 1 1.837 0l7.948 3.974A2 2 0 0 1 22 8z",
			key: "doq5xv"
		}],
		["path", {
			d: "M6 13h12",
			key: "yf64js"
		}],
		["path", {
			d: "M6 17h12",
			key: "1jwigz"
		}]
	]);
	const WashingMachine = createLucideIcon("washing-machine", [
		["path", {
			d: "M3 6h3",
			key: "155dbl"
		}],
		["path", {
			d: "M17 6h.01",
			key: "e2y6kg"
		}],
		["rect", {
			width: "18",
			height: "20",
			x: "3",
			y: "2",
			rx: "2",
			key: "od3kk9"
		}],
		["circle", {
			cx: "12",
			cy: "13",
			r: "5",
			key: "nlbqau"
		}],
		["path", {
			d: "M12 18a2.5 2.5 0 0 0 0-5 2.5 2.5 0 0 1 0-5",
			key: "17lach"
		}]
	]);
	const Watch = createLucideIcon("watch", [
		["path", {
			d: "M12 10v2.2l1.6 1",
			key: "n3r21l"
		}],
		["path", {
			d: "m16.13 7.66-.81-4.05a2 2 0 0 0-2-1.61h-2.68a2 2 0 0 0-2 1.61l-.78 4.05",
			key: "18k57s"
		}],
		["path", {
			d: "m7.88 16.36.8 4a2 2 0 0 0 2 1.61h2.72a2 2 0 0 0 2-1.61l.81-4.05",
			key: "16ny36"
		}],
		["circle", {
			cx: "12",
			cy: "12",
			r: "6",
			key: "1vlfrh"
		}]
	]);
	const WavesLadder = createLucideIcon("waves-ladder", [
		["path", {
			d: "M19 5a2 2 0 0 0-2 2v11",
			key: "s41o68"
		}],
		["path", {
			d: "M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",
			key: "rd2r6e"
		}],
		["path", {
			d: "M7 13h10",
			key: "1rwob1"
		}],
		["path", {
			d: "M7 9h10",
			key: "12czzb"
		}],
		["path", {
			d: "M9 5a2 2 0 0 0-2 2v11",
			key: "x0q4gh"
		}]
	]);
	const Waves = createLucideIcon("waves", [
		["path", {
			d: "M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",
			key: "knzxuh"
		}],
		["path", {
			d: "M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",
			key: "2jd2cc"
		}],
		["path", {
			d: "M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",
			key: "rd2r6e"
		}]
	]);
	const Waypoints = createLucideIcon("waypoints", [
		["circle", {
			cx: "12",
			cy: "4.5",
			r: "2.5",
			key: "r5ysbb"
		}],
		["path", {
			d: "m10.2 6.3-3.9 3.9",
			key: "1nzqf6"
		}],
		["circle", {
			cx: "4.5",
			cy: "12",
			r: "2.5",
			key: "jydg6v"
		}],
		["path", {
			d: "M7 12h10",
			key: "b7w52i"
		}],
		["circle", {
			cx: "19.5",
			cy: "12",
			r: "2.5",
			key: "1piiel"
		}],
		["path", {
			d: "m13.8 17.7 3.9-3.9",
			key: "1wyg1y"
		}],
		["circle", {
			cx: "12",
			cy: "19.5",
			r: "2.5",
			key: "13o1pw"
		}]
	]);
	const Webcam = createLucideIcon("webcam", [
		["circle", {
			cx: "12",
			cy: "10",
			r: "8",
			key: "1gshiw"
		}],
		["circle", {
			cx: "12",
			cy: "10",
			r: "3",
			key: "ilqhr7"
		}],
		["path", {
			d: "M7 22h10",
			key: "10w4w3"
		}],
		["path", {
			d: "M12 22v-4",
			key: "1utk9m"
		}]
	]);
	const WebhookOff = createLucideIcon("webhook-off", [
		["path", {
			d: "M17 17h-5c-1.09-.02-1.94.92-2.5 1.9A3 3 0 1 1 2.57 15",
			key: "1tvl6x"
		}],
		["path", {
			d: "M9 3.4a4 4 0 0 1 6.52.66",
			key: "q04jfq"
		}],
		["path", {
			d: "m6 17 3.1-5.8a2.5 2.5 0 0 0 .057-2.05",
			key: "azowf0"
		}],
		["path", {
			d: "M20.3 20.3a4 4 0 0 1-2.3.7",
			key: "5joiws"
		}],
		["path", {
			d: "M18.6 13a4 4 0 0 1 3.357 3.414",
			key: "cangb8"
		}],
		["path", {
			d: "m12 6 .6 1",
			key: "tpjl1n"
		}],
		["path", {
			d: "m2 2 20 20",
			key: "1ooewy"
		}]
	]);
	const Webhook = createLucideIcon("webhook", [
		["path", {
			d: "M18 16.98h-5.99c-1.1 0-1.95.94-2.48 1.9A4 4 0 0 1 2 17c.01-.7.2-1.4.57-2",
			key: "q3hayz"
		}],
		["path", {
			d: "m6 17 3.13-5.78c.53-.97.1-2.18-.5-3.1a4 4 0 1 1 6.89-4.06",
			key: "1go1hn"
		}],
		["path", {
			d: "m12 6 3.13 5.73C15.66 12.7 16.9 13 18 13a4 4 0 0 1 0 8",
			key: "qlwsc0"
		}]
	]);
	const Weight = createLucideIcon("weight", [["circle", {
		cx: "12",
		cy: "5",
		r: "3",
		key: "rqqgnr"
	}], ["path", {
		d: "M6.5 8a2 2 0 0 0-1.905 1.46L2.1 18.5A2 2 0 0 0 4 21h16a2 2 0 0 0 1.925-2.54L19.4 9.5A2 2 0 0 0 17.48 8Z",
		key: "56o5sh"
	}]]);
	const WheatOff = createLucideIcon("wheat-off", [
		["path", {
			d: "m2 22 10-10",
			key: "28ilpk"
		}],
		["path", {
			d: "m16 8-1.17 1.17",
			key: "1qqm82"
		}],
		["path", {
			d: "M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z",
			key: "1rdhi6"
		}],
		["path", {
			d: "m8 8-.53.53a3.5 3.5 0 0 0 0 4.94L9 15l1.53-1.53c.55-.55.88-1.25.98-1.97",
			key: "4wz8re"
		}],
		["path", {
			d: "M10.91 5.26c.15-.26.34-.51.56-.73L13 3l1.53 1.53a3.5 3.5 0 0 1 .28 4.62",
			key: "rves66"
		}],
		["path", {
			d: "M20 2h2v2a4 4 0 0 1-4 4h-2V6a4 4 0 0 1 4-4Z",
			key: "19rau1"
		}],
		["path", {
			d: "M11.47 17.47 13 19l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L5 19l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z",
			key: "tc8ph9"
		}],
		["path", {
			d: "m16 16-.53.53a3.5 3.5 0 0 1-4.94 0L9 15l1.53-1.53a3.49 3.49 0 0 1 1.97-.98",
			key: "ak46r"
		}],
		["path", {
			d: "M18.74 13.09c.26-.15.51-.34.73-.56L21 11l-1.53-1.53a3.5 3.5 0 0 0-4.62-.28",
			key: "1tw520"
		}],
		["line", {
			x1: "2",
			x2: "22",
			y1: "2",
			y2: "22",
			key: "a6p6uj"
		}]
	]);
	const Wheat = createLucideIcon("wheat", [
		["path", {
			d: "M2 22 16 8",
			key: "60hf96"
		}],
		["path", {
			d: "M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z",
			key: "1rdhi6"
		}],
		["path", {
			d: "M7.47 8.53 9 7l1.53 1.53a3.5 3.5 0 0 1 0 4.94L9 15l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z",
			key: "1sdzmb"
		}],
		["path", {
			d: "M11.47 4.53 13 3l1.53 1.53a3.5 3.5 0 0 1 0 4.94L13 11l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z",
			key: "eoatbi"
		}],
		["path", {
			d: "M20 2h2v2a4 4 0 0 1-4 4h-2V6a4 4 0 0 1 4-4Z",
			key: "19rau1"
		}],
		["path", {
			d: "M11.47 17.47 13 19l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L5 19l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z",
			key: "tc8ph9"
		}],
		["path", {
			d: "M15.47 13.47 17 15l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L9 15l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z",
			key: "2m8kc5"
		}],
		["path", {
			d: "M19.47 9.47 21 11l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L13 11l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z",
			key: "vex3ng"
		}]
	]);
	const WholeWord = createLucideIcon("whole-word", [
		["circle", {
			cx: "7",
			cy: "12",
			r: "3",
			key: "12clwm"
		}],
		["path", {
			d: "M10 9v6",
			key: "17i7lo"
		}],
		["circle", {
			cx: "17",
			cy: "12",
			r: "3",
			key: "gl7c2s"
		}],
		["path", {
			d: "M14 7v8",
			key: "dl84cr"
		}],
		["path", {
			d: "M22 17v1c0 .5-.5 1-1 1H3c-.5 0-1-.5-1-1v-1",
			key: "lt2kga"
		}]
	]);
	const WifiHigh = createLucideIcon("wifi-high", [
		["path", {
			d: "M12 20h.01",
			key: "zekei9"
		}],
		["path", {
			d: "M5 12.859a10 10 0 0 1 14 0",
			key: "1x1e6c"
		}],
		["path", {
			d: "M8.5 16.429a5 5 0 0 1 7 0",
			key: "1bycff"
		}]
	]);
	const WifiLow = createLucideIcon("wifi-low", [["path", {
		d: "M12 20h.01",
		key: "zekei9"
	}], ["path", {
		d: "M8.5 16.429a5 5 0 0 1 7 0",
		key: "1bycff"
	}]]);
	const WifiCog = createLucideIcon("wifi-cog", [
		["path", {
			d: "m14.305 19.53.923-.382",
			key: "3m78fa"
		}],
		["path", {
			d: "m15.228 16.852-.923-.383",
			key: "npixar"
		}],
		["path", {
			d: "m16.852 15.228-.383-.923",
			key: "5xggr7"
		}],
		["path", {
			d: "m16.852 20.772-.383.924",
			key: "dpfhf9"
		}],
		["path", {
			d: "m19.148 15.228.383-.923",
			key: "1reyyz"
		}],
		["path", {
			d: "m19.53 21.696-.382-.924",
			key: "1goivc"
		}],
		["path", {
			d: "M2 7.82a15 15 0 0 1 20 0",
			key: "1ovjuk"
		}],
		["path", {
			d: "m20.772 16.852.924-.383",
			key: "htqkph"
		}],
		["path", {
			d: "m20.772 19.148.924.383",
			key: "9w9pjp"
		}],
		["path", {
			d: "M5 11.858a10 10 0 0 1 11.5-1.785",
			key: "3sn16i"
		}],
		["path", {
			d: "M8.5 15.429a5 5 0 0 1 2.413-1.31",
			key: "1pxovh"
		}],
		["circle", {
			cx: "18",
			cy: "18",
			r: "3",
			key: "1xkwt0"
		}]
	]);
	const WifiOff = createLucideIcon("wifi-off", [
		["path", {
			d: "M12 20h.01",
			key: "zekei9"
		}],
		["path", {
			d: "M8.5 16.429a5 5 0 0 1 7 0",
			key: "1bycff"
		}],
		["path", {
			d: "M5 12.859a10 10 0 0 1 5.17-2.69",
			key: "1dl1wf"
		}],
		["path", {
			d: "M19 12.859a10 10 0 0 0-2.007-1.523",
			key: "4k23kn"
		}],
		["path", {
			d: "M2 8.82a15 15 0 0 1 4.177-2.643",
			key: "1grhjp"
		}],
		["path", {
			d: "M22 8.82a15 15 0 0 0-11.288-3.764",
			key: "z3jwby"
		}],
		["path", {
			d: "m2 2 20 20",
			key: "1ooewy"
		}]
	]);
	const WifiPen = createLucideIcon("wifi-pen", [
		["path", {
			d: "M2 8.82a15 15 0 0 1 20 0",
			key: "dnpr2z"
		}],
		["path", {
			d: "M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z",
			key: "1817ys"
		}],
		["path", {
			d: "M5 12.859a10 10 0 0 1 10.5-2.222",
			key: "rpb7oy"
		}],
		["path", {
			d: "M8.5 16.429a5 5 0 0 1 3-1.406",
			key: "r8bmzl"
		}]
	]);
	const WifiSync = createLucideIcon("wifi-sync", [
		["path", {
			d: "M11.965 10.105v4L13.5 12.5a5 5 0 0 1 8 1.5",
			key: "1immaq"
		}],
		["path", {
			d: "M11.965 14.105h4",
			key: "uejny8"
		}],
		["path", {
			d: "M17.965 18.105h4L20.43 19.71a5 5 0 0 1-8-1.5",
			key: "1i3a7e"
		}],
		["path", {
			d: "M2 8.82a15 15 0 0 1 20 0",
			key: "dnpr2z"
		}],
		["path", {
			d: "M21.965 22.105v-4",
			key: "1ku6vx"
		}],
		["path", {
			d: "M5 12.86a10 10 0 0 1 3-2.032",
			key: "pemdtu"
		}],
		["path", {
			d: "M8.5 16.429h.01",
			key: "2bm739"
		}]
	]);
	const WifiZero = createLucideIcon("wifi-zero", [["path", {
		d: "M12 20h.01",
		key: "zekei9"
	}]]);
	const Wifi = createLucideIcon("wifi", [
		["path", {
			d: "M12 20h.01",
			key: "zekei9"
		}],
		["path", {
			d: "M2 8.82a15 15 0 0 1 20 0",
			key: "dnpr2z"
		}],
		["path", {
			d: "M5 12.859a10 10 0 0 1 14 0",
			key: "1x1e6c"
		}],
		["path", {
			d: "M8.5 16.429a5 5 0 0 1 7 0",
			key: "1bycff"
		}]
	]);
	const WindArrowDown = createLucideIcon("wind-arrow-down", [
		["path", {
			d: "M10 2v8",
			key: "d4bbey"
		}],
		["path", {
			d: "M12.8 21.6A2 2 0 1 0 14 18H2",
			key: "19kp1d"
		}],
		["path", {
			d: "M17.5 10a2.5 2.5 0 1 1 2 4H2",
			key: "19kpjc"
		}],
		["path", {
			d: "m6 6 4 4 4-4",
			key: "k13n16"
		}]
	]);
	const Wind = createLucideIcon("wind", [
		["path", {
			d: "M12.8 19.6A2 2 0 1 0 14 16H2",
			key: "148xed"
		}],
		["path", {
			d: "M17.5 8a2.5 2.5 0 1 1 2 4H2",
			key: "1u4tom"
		}],
		["path", {
			d: "M9.8 4.4A2 2 0 1 1 11 8H2",
			key: "75valh"
		}]
	]);
	const WineOff = createLucideIcon("wine-off", [
		["path", {
			d: "M8 22h8",
			key: "rmew8v"
		}],
		["path", {
			d: "M7 10h3m7 0h-1.343",
			key: "v48bem"
		}],
		["path", {
			d: "M12 15v7",
			key: "t2xh3l"
		}],
		["path", {
			d: "M7.307 7.307A12.33 12.33 0 0 0 7 10a5 5 0 0 0 7.391 4.391M8.638 2.981C8.75 2.668 8.872 2.34 9 2h6c1.5 4 2 6 2 8 0 .407-.05.809-.145 1.198",
			key: "1ymjlu"
		}],
		["line", {
			x1: "2",
			x2: "22",
			y1: "2",
			y2: "22",
			key: "a6p6uj"
		}]
	]);
	const Wine = createLucideIcon("wine", [
		["path", {
			d: "M8 22h8",
			key: "rmew8v"
		}],
		["path", {
			d: "M7 10h10",
			key: "1101jm"
		}],
		["path", {
			d: "M12 15v7",
			key: "t2xh3l"
		}],
		["path", {
			d: "M12 15a5 5 0 0 0 5-5c0-2-.5-4-2-8H9c-1.5 4-2 6-2 8a5 5 0 0 0 5 5Z",
			key: "10ffi3"
		}]
	]);
	const Workflow = createLucideIcon("workflow", [
		["rect", {
			width: "8",
			height: "8",
			x: "3",
			y: "3",
			rx: "2",
			key: "by2w9f"
		}],
		["path", {
			d: "M7 11v4a2 2 0 0 0 2 2h4",
			key: "xkn7yn"
		}],
		["rect", {
			width: "8",
			height: "8",
			x: "13",
			y: "13",
			rx: "2",
			key: "1cgmvn"
		}]
	]);
	const Worm = createLucideIcon("worm", [
		["path", {
			d: "m19 12-1.5 3",
			key: "9bcu4o"
		}],
		["path", {
			d: "M19.63 18.81 22 20",
			key: "121v98"
		}],
		["path", {
			d: "M6.47 8.23a1.68 1.68 0 0 1 2.44 1.93l-.64 2.08a6.76 6.76 0 0 0 10.16 7.67l.42-.27a1 1 0 1 0-2.73-4.21l-.42.27a1.76 1.76 0 0 1-2.63-1.99l.64-2.08A6.66 6.66 0 0 0 3.94 3.9l-.7.4a1 1 0 1 0 2.55 4.34z",
			key: "1tij6q"
		}]
	]);
	const Wrench = createLucideIcon("wrench", [["path", {
		d: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z",
		key: "1ngwbx"
	}]]);
	const X = createLucideIcon("x", [["path", {
		d: "M18 6 6 18",
		key: "1bl5f8"
	}], ["path", {
		d: "m6 6 12 12",
		key: "d8bk6v"
	}]]);
	const Youtube = createLucideIcon("youtube", [["path", {
		d: "M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17",
		key: "1q2vi4"
	}], ["path", {
		d: "m10 15 5-3-5-3z",
		key: "1jp15x"
	}]]);
	const ZapOff = createLucideIcon("zap-off", [
		["path", {
			d: "M10.513 4.856 13.12 2.17a.5.5 0 0 1 .86.46l-1.377 4.317",
			key: "193nxd"
		}],
		["path", {
			d: "M15.656 10H20a1 1 0 0 1 .78 1.63l-1.72 1.773",
			key: "27a7lr"
		}],
		["path", {
			d: "M16.273 16.273 10.88 21.83a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14H4a1 1 0 0 1-.78-1.63l4.507-4.643",
			key: "1e0qe9"
		}],
		["path", {
			d: "m2 2 20 20",
			key: "1ooewy"
		}]
	]);
	const Zap$1 = createLucideIcon("zap", [["path", {
		d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
		key: "1xq2db"
	}]]);
	const ZoomIn = createLucideIcon("zoom-in", [
		["circle", {
			cx: "11",
			cy: "11",
			r: "8",
			key: "4ej97u"
		}],
		["line", {
			x1: "21",
			x2: "16.65",
			y1: "21",
			y2: "16.65",
			key: "13gj7c"
		}],
		["line", {
			x1: "11",
			x2: "11",
			y1: "8",
			y2: "14",
			key: "1vmskp"
		}],
		["line", {
			x1: "8",
			x2: "14",
			y1: "11",
			y2: "11",
			key: "durymu"
		}]
	]);
	const ZoomOut = createLucideIcon("zoom-out", [
		["circle", {
			cx: "11",
			cy: "11",
			r: "8",
			key: "4ej97u"
		}],
		["line", {
			x1: "21",
			x2: "16.65",
			y1: "21",
			y2: "16.65",
			key: "13gj7c"
		}],
		["line", {
			x1: "8",
			x2: "14",
			y1: "11",
			y2: "11",
			key: "durymu"
		}]
	]);
	exports.AlertCircle = CircleAlert;
	exports.AlertTriangle = TriangleAlert;
	exports.Bell = Bell;
	exports.Bookmark = Bookmark;
	exports.Bot = Bot;
	exports.Calendar = Calendar;
	exports.CheckCircle = CircleCheckBig;
	exports.Clock = Clock;
	exports.Code = Code$1;
	exports.Coins = Coins;
	exports.CornerDownLeft = CornerDownLeft;
	exports.Crown = Crown;
	exports.ExternalLink = ExternalLink;
	exports.Eye = Eye;
	exports.FileText = FileText;
	exports.Hash = Hash;
	exports.Heart = Heart;
	exports.HelpCircle = CircleQuestionMark;
	exports.Info = Info$1;
	exports.Link = Link;
	exports.List = List;
	exports.LogIn = LogIn;
	exports.MapPin = MapPin;
	exports.MessageCircle = MessageCircle;
	exports.Music = Music;
	exports.Play = Play;
	exports.QrCode = QrCode;
	exports.Radio = Radio;
	exports.RefreshCw = RefreshCw;
	exports.Send = Send;
	exports.Share2 = Share2;
	exports.Shield = Shield;
	exports.Sparkles = Sparkles;
	exports.Star = Star;
	exports.Terminal = Terminal;
	exports.ThumbsDown = ThumbsDown;
	exports.ThumbsUp = ThumbsUp;
	exports.TrendingUp = TrendingUp;
	exports.User = User;
	exports.UserPlus = UserPlus;
	exports.Users = Users;
	exports.Zap = Zap$1;
}) });

//#endregion
//#region ../../node_modules/.pnpm/@heroui+react-utils@2.1.14_react@19.2.0/node_modules/@heroui/react-utils/dist/chunk-3XT5V4LF.mjs
function createContext2(options = {}) {
	const { strict = true, errorMessage = "useContext: `context` is undefined. Seems you forgot to wrap component within the Provider", name } = options;
	const Context = import_react.createContext(void 0);
	Context.displayName = name;
	function useContext2() {
		var _a;
		const context = import_react.useContext(Context);
		if (!context && strict) {
			const error = new Error(errorMessage);
			error.name = "ContextError";
			(_a = Error.captureStackTrace) == null || _a.call(Error, error, useContext2);
			throw error;
		}
		return context;
	}
	return [
		Context.Provider,
		useContext2,
		Context
	];
}

//#endregion
//#region ../../node_modules/.pnpm/@heroui+system@2.4.23_@heroui+theme@2.4.23_tailwindcss@4.1.14__framer-motion@12.23.22_react-d_u5me233ujugc5cvibuor2iotcu/node_modules/@heroui/system/dist/chunk-Q3W45BN5.mjs
var [ProviderContext, useProviderContext] = createContext2({
	name: "ProviderContext",
	strict: false
});

//#endregion
//#region ../../node_modules/.pnpm/@react-aria+i18n@3.12.13_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/@react-aria/i18n/dist/utils.mjs
const $148a7a147e38ea7f$var$RTL_SCRIPTS = new Set([
	"Arab",
	"Syrc",
	"Samr",
	"Mand",
	"Thaa",
	"Mend",
	"Nkoo",
	"Adlm",
	"Rohg",
	"Hebr"
]);
const $148a7a147e38ea7f$var$RTL_LANGS = new Set([
	"ae",
	"ar",
	"arc",
	"bcc",
	"bqi",
	"ckb",
	"dv",
	"fa",
	"glk",
	"he",
	"ku",
	"mzn",
	"nqo",
	"pnb",
	"ps",
	"sd",
	"ug",
	"ur",
	"yi"
]);
function $148a7a147e38ea7f$export$702d680b21cbd764(localeString) {
	if (Intl.Locale) {
		let locale = new Intl.Locale(localeString).maximize();
		let textInfo = typeof locale.getTextInfo === "function" ? locale.getTextInfo() : locale.textInfo;
		if (textInfo) return textInfo.direction === "rtl";
		if (locale.script) return $148a7a147e38ea7f$var$RTL_SCRIPTS.has(locale.script);
	}
	let lang = localeString.split("-")[0];
	return $148a7a147e38ea7f$var$RTL_LANGS.has(lang);
}

//#endregion
//#region ../../node_modules/.pnpm/@react-aria+ssr@3.9.10_react@19.2.0/node_modules/@react-aria/ssr/dist/SSRProvider.mjs
const $b5e257d569688ac6$var$defaultContext = {
	prefix: String(Math.round(Math.random() * 1e10)),
	current: 0
};
const $b5e257d569688ac6$var$SSRContext = /* @__PURE__ */ import_react.createContext($b5e257d569688ac6$var$defaultContext);
const $b5e257d569688ac6$var$IsSSRContext = /* @__PURE__ */ import_react.createContext(false);
let $b5e257d569688ac6$var$canUseDOM = Boolean(typeof window !== "undefined" && window.document && window.document.createElement);
let $b5e257d569688ac6$var$componentIds = /* @__PURE__ */ new WeakMap();
function $b5e257d569688ac6$var$useCounter(isDisabled = false) {
	let ctx = (0, import_react.useContext)($b5e257d569688ac6$var$SSRContext);
	let ref = (0, import_react.useRef)(null);
	if (ref.current === null && !isDisabled) {
		var _React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_ReactCurrentOwner, _React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
		let currentOwner = (_React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = import_react.default.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED) === null || _React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED === void 0 ? void 0 : (_React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_ReactCurrentOwner = _React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner) === null || _React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_ReactCurrentOwner === void 0 ? void 0 : _React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_ReactCurrentOwner.current;
		if (currentOwner) {
			let prevComponentValue = $b5e257d569688ac6$var$componentIds.get(currentOwner);
			if (prevComponentValue == null) $b5e257d569688ac6$var$componentIds.set(currentOwner, {
				id: ctx.current,
				state: currentOwner.memoizedState
			});
			else if (currentOwner.memoizedState !== prevComponentValue.state) {
				ctx.current = prevComponentValue.id;
				$b5e257d569688ac6$var$componentIds.delete(currentOwner);
			}
		}
		ref.current = ++ctx.current;
	}
	return ref.current;
}
function $b5e257d569688ac6$var$useLegacySSRSafeId(defaultId) {
	let ctx = (0, import_react.useContext)($b5e257d569688ac6$var$SSRContext);
	if (ctx === $b5e257d569688ac6$var$defaultContext && !$b5e257d569688ac6$var$canUseDOM && process.env.NODE_ENV !== "production") console.warn("When server rendering, you must wrap your application in an <SSRProvider> to ensure consistent ids are generated between the client and server.");
	let counter = $b5e257d569688ac6$var$useCounter(!!defaultId);
	let prefix = ctx === $b5e257d569688ac6$var$defaultContext && process.env.NODE_ENV === "test" ? "react-aria" : `react-aria${ctx.prefix}`;
	return defaultId || `${prefix}-${counter}`;
}
function $b5e257d569688ac6$var$useModernSSRSafeId(defaultId) {
	let id = import_react.useId();
	let [didSSR] = (0, import_react.useState)($b5e257d569688ac6$export$535bd6ca7f90a273());
	let prefix = didSSR || process.env.NODE_ENV === "test" ? "react-aria" : `react-aria${$b5e257d569688ac6$var$defaultContext.prefix}`;
	return defaultId || `${prefix}-${id}`;
}
const $b5e257d569688ac6$export$619500959fc48b26 = typeof import_react.useId === "function" ? $b5e257d569688ac6$var$useModernSSRSafeId : $b5e257d569688ac6$var$useLegacySSRSafeId;
function $b5e257d569688ac6$var$getSnapshot() {
	return false;
}
function $b5e257d569688ac6$var$getServerSnapshot() {
	return true;
}
function $b5e257d569688ac6$var$subscribe(onStoreChange) {
	return () => {};
}
function $b5e257d569688ac6$export$535bd6ca7f90a273() {
	if (typeof import_react.useSyncExternalStore === "function") return import_react.useSyncExternalStore($b5e257d569688ac6$var$subscribe, $b5e257d569688ac6$var$getSnapshot, $b5e257d569688ac6$var$getServerSnapshot);
	return (0, import_react.useContext)($b5e257d569688ac6$var$IsSSRContext);
}

//#endregion
//#region ../../node_modules/.pnpm/@react-aria+i18n@3.12.13_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/@react-aria/i18n/dist/useDefaultLocale.mjs
const $1e5a04cdaf7d1af8$var$localeSymbol = Symbol.for("react-aria.i18n.locale");
function $1e5a04cdaf7d1af8$export$f09106e7c6677ec5() {
	let locale = typeof window !== "undefined" && window[$1e5a04cdaf7d1af8$var$localeSymbol] || typeof navigator !== "undefined" && (navigator.language || navigator.userLanguage) || "en-US";
	try {
		Intl.DateTimeFormat.supportedLocalesOf([locale]);
	} catch {
		locale = "en-US";
	}
	return {
		locale,
		direction: $148a7a147e38ea7f$export$702d680b21cbd764(locale) ? "rtl" : "ltr"
	};
}
let $1e5a04cdaf7d1af8$var$currentLocale = $1e5a04cdaf7d1af8$export$f09106e7c6677ec5();
let $1e5a04cdaf7d1af8$var$listeners = /* @__PURE__ */ new Set();
function $1e5a04cdaf7d1af8$var$updateLocale() {
	$1e5a04cdaf7d1af8$var$currentLocale = $1e5a04cdaf7d1af8$export$f09106e7c6677ec5();
	for (let listener of $1e5a04cdaf7d1af8$var$listeners) listener($1e5a04cdaf7d1af8$var$currentLocale);
}
function $1e5a04cdaf7d1af8$export$188ec29ebc2bdc3a() {
	let isSSR = $b5e257d569688ac6$export$535bd6ca7f90a273();
	let [defaultLocale, setDefaultLocale] = (0, import_react.useState)($1e5a04cdaf7d1af8$var$currentLocale);
	(0, import_react.useEffect)(() => {
		if ($1e5a04cdaf7d1af8$var$listeners.size === 0) window.addEventListener("languagechange", $1e5a04cdaf7d1af8$var$updateLocale);
		$1e5a04cdaf7d1af8$var$listeners.add(setDefaultLocale);
		return () => {
			$1e5a04cdaf7d1af8$var$listeners.delete(setDefaultLocale);
			if ($1e5a04cdaf7d1af8$var$listeners.size === 0) window.removeEventListener("languagechange", $1e5a04cdaf7d1af8$var$updateLocale);
		};
	}, []);
	if (isSSR) return {
		locale: "en-US",
		direction: "ltr"
	};
	return defaultLocale;
}

//#endregion
//#region ../../node_modules/.pnpm/@react-aria+i18n@3.12.13_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/@react-aria/i18n/dist/context.mjs
const $18f2051aff69b9bf$var$I18nContext = /* @__PURE__ */ import_react.createContext(null);
/**
* Internal component that handles the case when locale is provided.
*/ function $18f2051aff69b9bf$var$I18nProviderWithLocale(props) {
	let { locale, children } = props;
	let value = import_react.useMemo(() => ({
		locale,
		direction: $148a7a147e38ea7f$export$702d680b21cbd764(locale) ? "rtl" : "ltr"
	}), [locale]);
	return /* @__PURE__ */ import_react.createElement($18f2051aff69b9bf$var$I18nContext.Provider, { value }, children);
}
/**
* Internal component that handles the case when no locale is provided.
*/ function $18f2051aff69b9bf$var$I18nProviderWithDefaultLocale(props) {
	let { children } = props;
	let defaultLocale = $1e5a04cdaf7d1af8$export$188ec29ebc2bdc3a();
	return /* @__PURE__ */ import_react.createElement($18f2051aff69b9bf$var$I18nContext.Provider, { value: defaultLocale }, children);
}
function $18f2051aff69b9bf$export$a54013f0d02a8f82(props) {
	let { locale, children } = props;
	if (locale) return /* @__PURE__ */ import_react.createElement($18f2051aff69b9bf$var$I18nProviderWithLocale, {
		locale,
		children
	});
	return /* @__PURE__ */ import_react.createElement($18f2051aff69b9bf$var$I18nProviderWithDefaultLocale, { children });
}

//#endregion
//#region ../../node_modules/.pnpm/@react-aria+utils@3.31.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/@react-aria/utils/dist/focusWithoutScrolling.mjs
function $7215afc6de606d6b$export$de79e2c695e052f3(element) {
	if ($7215afc6de606d6b$var$supportsPreventScroll()) element.focus({ preventScroll: true });
	else {
		let scrollableElements = $7215afc6de606d6b$var$getScrollableElements(element);
		element.focus();
		$7215afc6de606d6b$var$restoreScrollPosition(scrollableElements);
	}
}
let $7215afc6de606d6b$var$supportsPreventScrollCached = null;
function $7215afc6de606d6b$var$supportsPreventScroll() {
	if ($7215afc6de606d6b$var$supportsPreventScrollCached == null) {
		$7215afc6de606d6b$var$supportsPreventScrollCached = false;
		try {
			document.createElement("div").focus({ get preventScroll() {
				$7215afc6de606d6b$var$supportsPreventScrollCached = true;
				return true;
			} });
		} catch {}
	}
	return $7215afc6de606d6b$var$supportsPreventScrollCached;
}
function $7215afc6de606d6b$var$getScrollableElements(element) {
	let parent = element.parentNode;
	let scrollableElements = [];
	let rootScrollingElement = document.scrollingElement || document.documentElement;
	while (parent instanceof HTMLElement && parent !== rootScrollingElement) {
		if (parent.offsetHeight < parent.scrollHeight || parent.offsetWidth < parent.scrollWidth) scrollableElements.push({
			element: parent,
			scrollTop: parent.scrollTop,
			scrollLeft: parent.scrollLeft
		});
		parent = parent.parentNode;
	}
	if (rootScrollingElement instanceof HTMLElement) scrollableElements.push({
		element: rootScrollingElement,
		scrollTop: rootScrollingElement.scrollTop,
		scrollLeft: rootScrollingElement.scrollLeft
	});
	return scrollableElements;
}
function $7215afc6de606d6b$var$restoreScrollPosition(scrollableElements) {
	for (let { element, scrollTop, scrollLeft } of scrollableElements) {
		element.scrollTop = scrollTop;
		element.scrollLeft = scrollLeft;
	}
}

//#endregion
//#region ../../node_modules/.pnpm/@react-aria+utils@3.31.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/@react-aria/utils/dist/platform.mjs
function $c87311424ea30a05$var$testUserAgent(re) {
	var _window_navigator_userAgentData;
	if (typeof window === "undefined" || window.navigator == null) return false;
	let brands = (_window_navigator_userAgentData = window.navigator["userAgentData"]) === null || _window_navigator_userAgentData === void 0 ? void 0 : _window_navigator_userAgentData.brands;
	return Array.isArray(brands) && brands.some((brand) => re.test(brand.brand)) || re.test(window.navigator.userAgent);
}
function $c87311424ea30a05$var$testPlatform(re) {
	var _window_navigator_userAgentData;
	return typeof window !== "undefined" && window.navigator != null ? re.test(((_window_navigator_userAgentData = window.navigator["userAgentData"]) === null || _window_navigator_userAgentData === void 0 ? void 0 : _window_navigator_userAgentData.platform) || window.navigator.platform) : false;
}
function $c87311424ea30a05$var$cached(fn) {
	if (process.env.NODE_ENV === "test") return fn;
	let res = null;
	return () => {
		if (res == null) res = fn();
		return res;
	};
}
const $c87311424ea30a05$export$9ac100e40613ea10 = $c87311424ea30a05$var$cached(function() {
	return $c87311424ea30a05$var$testPlatform(/^Mac/i);
});
const $c87311424ea30a05$export$186c6964ca17d99 = $c87311424ea30a05$var$cached(function() {
	return $c87311424ea30a05$var$testPlatform(/^iPhone/i);
});
const $c87311424ea30a05$export$7bef049ce92e4224 = $c87311424ea30a05$var$cached(function() {
	return $c87311424ea30a05$var$testPlatform(/^iPad/i) || $c87311424ea30a05$export$9ac100e40613ea10() && navigator.maxTouchPoints > 1;
});
const $c87311424ea30a05$export$fedb369cb70207f1 = $c87311424ea30a05$var$cached(function() {
	return $c87311424ea30a05$export$186c6964ca17d99() || $c87311424ea30a05$export$7bef049ce92e4224();
});
const $c87311424ea30a05$export$e1865c3bedcd822b = $c87311424ea30a05$var$cached(function() {
	return $c87311424ea30a05$export$9ac100e40613ea10() || $c87311424ea30a05$export$fedb369cb70207f1();
});
const $c87311424ea30a05$export$78551043582a6a98 = $c87311424ea30a05$var$cached(function() {
	return $c87311424ea30a05$var$testUserAgent(/AppleWebKit/i) && !$c87311424ea30a05$export$6446a186d09e379e();
});
const $c87311424ea30a05$export$6446a186d09e379e = $c87311424ea30a05$var$cached(function() {
	return $c87311424ea30a05$var$testUserAgent(/Chrome/i);
});
const $c87311424ea30a05$export$a11b0059900ceec8 = $c87311424ea30a05$var$cached(function() {
	return $c87311424ea30a05$var$testUserAgent(/Android/i);
});
const $c87311424ea30a05$export$b7d78993b74f766d = $c87311424ea30a05$var$cached(function() {
	return $c87311424ea30a05$var$testUserAgent(/Firefox/i);
});

//#endregion
//#region ../../node_modules/.pnpm/@react-aria+utils@3.31.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/@react-aria/utils/dist/openLink.mjs
const $ea8dcbcb9ea1b556$var$RouterContext = /* @__PURE__ */ (0, import_react.createContext)({
	isNative: true,
	open: $ea8dcbcb9ea1b556$var$openSyntheticLink,
	useHref: (href) => href
});
function $ea8dcbcb9ea1b556$export$323e4fc2fa4753fb(props) {
	let { children, navigate, useHref } = props;
	let ctx = (0, import_react.useMemo)(() => ({
		isNative: false,
		open: (target, modifiers, href, routerOptions) => {
			$ea8dcbcb9ea1b556$var$getSyntheticLink(target, (link) => {
				if ($ea8dcbcb9ea1b556$export$efa8c9099e530235(link, modifiers)) navigate(href, routerOptions);
				else $ea8dcbcb9ea1b556$export$95185d699e05d4d7(link, modifiers);
			});
		},
		useHref: useHref || ((href) => href)
	}), [navigate, useHref]);
	return /* @__PURE__ */ import_react.createElement($ea8dcbcb9ea1b556$var$RouterContext.Provider, { value: ctx }, children);
}
function $ea8dcbcb9ea1b556$export$efa8c9099e530235(link, modifiers) {
	let target = link.getAttribute("target");
	return (!target || target === "_self") && link.origin === location.origin && !link.hasAttribute("download") && !modifiers.metaKey && !modifiers.ctrlKey && !modifiers.altKey && !modifiers.shiftKey;
}
function $ea8dcbcb9ea1b556$export$95185d699e05d4d7(target, modifiers, setOpening = true) {
	var _window_event_type, _window_event;
	let { metaKey, ctrlKey, altKey, shiftKey } = modifiers;
	if ($c87311424ea30a05$export$b7d78993b74f766d() && ((_window_event = window.event) === null || _window_event === void 0 ? void 0 : (_window_event_type = _window_event.type) === null || _window_event_type === void 0 ? void 0 : _window_event_type.startsWith("key")) && target.target === "_blank") if ($c87311424ea30a05$export$9ac100e40613ea10()) metaKey = true;
	else ctrlKey = true;
	let event = $c87311424ea30a05$export$78551043582a6a98() && $c87311424ea30a05$export$9ac100e40613ea10() && !$c87311424ea30a05$export$7bef049ce92e4224() && process.env.NODE_ENV !== "test" ? new KeyboardEvent("keydown", {
		keyIdentifier: "Enter",
		metaKey,
		ctrlKey,
		altKey,
		shiftKey
	}) : new MouseEvent("click", {
		metaKey,
		ctrlKey,
		altKey,
		shiftKey,
		bubbles: true,
		cancelable: true
	});
	$ea8dcbcb9ea1b556$export$95185d699e05d4d7.isOpening = setOpening;
	$7215afc6de606d6b$export$de79e2c695e052f3(target);
	target.dispatchEvent(event);
	$ea8dcbcb9ea1b556$export$95185d699e05d4d7.isOpening = false;
}
$ea8dcbcb9ea1b556$export$95185d699e05d4d7.isOpening = false;
function $ea8dcbcb9ea1b556$var$getSyntheticLink(target, open) {
	if (target instanceof HTMLAnchorElement) open(target);
	else if (target.hasAttribute("data-href")) {
		let link = document.createElement("a");
		link.href = target.getAttribute("data-href");
		if (target.hasAttribute("data-target")) link.target = target.getAttribute("data-target");
		if (target.hasAttribute("data-rel")) link.rel = target.getAttribute("data-rel");
		if (target.hasAttribute("data-download")) link.download = target.getAttribute("data-download");
		if (target.hasAttribute("data-ping")) link.ping = target.getAttribute("data-ping");
		if (target.hasAttribute("data-referrer-policy")) link.referrerPolicy = target.getAttribute("data-referrer-policy");
		target.appendChild(link);
		open(link);
		target.removeChild(link);
	}
}
function $ea8dcbcb9ea1b556$var$openSyntheticLink(target, modifiers) {
	$ea8dcbcb9ea1b556$var$getSyntheticLink(target, (link) => $ea8dcbcb9ea1b556$export$95185d699e05d4d7(link, modifiers));
}

//#endregion
//#region ../../node_modules/.pnpm/@react-aria+overlays@3.30.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/@react-aria/overlays/dist/useModal.mjs
var import_react_dom = /* @__PURE__ */ __toESM(require_react_dom(), 1);
const $f57aed4a881a3485$var$Context = /* @__PURE__ */ import_react.createContext(null);
function $f57aed4a881a3485$export$178405afcd8c5eb(props) {
	let { children } = props;
	let parent = (0, import_react.useContext)($f57aed4a881a3485$var$Context);
	let [modalCount, setModalCount] = (0, import_react.useState)(0);
	let context = (0, import_react.useMemo)(() => ({
		parent,
		modalCount,
		addModal() {
			setModalCount((count) => count + 1);
			if (parent) parent.addModal();
		},
		removeModal() {
			setModalCount((count) => count - 1);
			if (parent) parent.removeModal();
		}
	}), [parent, modalCount]);
	return /* @__PURE__ */ import_react.createElement($f57aed4a881a3485$var$Context.Provider, { value: context }, children);
}
function $f57aed4a881a3485$export$d9aaed4c3ece1bc0() {
	let context = (0, import_react.useContext)($f57aed4a881a3485$var$Context);
	return { modalProviderProps: { "aria-hidden": context && context.modalCount > 0 ? true : void 0 } };
}
/**
* Creates a root node that will be aria-hidden if there are other modals open.
*/ function $f57aed4a881a3485$var$OverlayContainerDOM(props) {
	let { modalProviderProps } = $f57aed4a881a3485$export$d9aaed4c3ece1bc0();
	return /* @__PURE__ */ import_react.createElement("div", {
		"data-overlay-container": true,
		...props,
		...modalProviderProps
	});
}
function $f57aed4a881a3485$export$bf688221f59024e5(props) {
	return /* @__PURE__ */ import_react.createElement($f57aed4a881a3485$export$178405afcd8c5eb, null, /* @__PURE__ */ import_react.createElement($f57aed4a881a3485$var$OverlayContainerDOM, props));
}

//#endregion
//#region ../../node_modules/.pnpm/@heroui+system@2.4.23_@heroui+theme@2.4.23_tailwindcss@4.1.14__framer-motion@12.23.22_react-d_u5me233ujugc5cvibuor2iotcu/node_modules/@heroui/system/dist/chunk-3KFOFPK7.mjs
var HeroUIProvider = ({ children, navigate, disableAnimation, useHref, disableRipple = false, skipFramerMotionAnimations = disableAnimation, reducedMotion = "never", validationBehavior, locale = "en-US", labelPlacement, defaultDates, createCalendar, spinnerVariant,...otherProps }) => {
	let contents = children;
	if (navigate) contents = /* @__PURE__ */ (0, import_jsx_runtime.jsx)($ea8dcbcb9ea1b556$export$323e4fc2fa4753fb, {
		navigate,
		useHref,
		children: contents
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProviderContext, {
		value: (0, import_react.useMemo)(() => {
			if (disableAnimation && skipFramerMotionAnimations) MotionGlobalConfig.skipAnimations = true;
			return {
				createCalendar,
				defaultDates,
				disableAnimation,
				disableRipple,
				validationBehavior,
				labelPlacement,
				spinnerVariant
			};
		}, [
			createCalendar,
			defaultDates == null ? void 0 : defaultDates.maxDate,
			defaultDates == null ? void 0 : defaultDates.minDate,
			disableAnimation,
			disableRipple,
			validationBehavior,
			labelPlacement,
			spinnerVariant
		]),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)($18f2051aff69b9bf$export$a54013f0d02a8f82, {
			locale,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MotionConfig, {
				reducedMotion,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)($f57aed4a881a3485$export$bf688221f59024e5, {
					...otherProps,
					children: contents
				})
			})
		})
	});
};

//#endregion
//#region ../template/src/components/common/GlowImage.tsx
const GlowImage = ({ src, alt, className, imgClassName, mode = "blur-layer", blurRadius = 18, glowStrength = .6, scale = 1.06, shadowRadius = 28, crossOrigin }) => {
	const [shadowColor, setShadowColor] = import_react.useState("rgba(255,255,255,0.5)");
	import_react.useEffect(() => {
		if (mode !== "dominant-shadow") return;
		const img = new Image();
		if (crossOrigin) img.crossOrigin = crossOrigin;
		img.src = src;
		img.onload = () => {
			try {
				const size = 16;
				const canvas = document.createElement("canvas");
				canvas.width = size;
				canvas.height = size;
				const ctx = canvas.getContext("2d");
				if (!ctx) return;
				ctx.drawImage(img, 0, 0, size, size);
				const data = ctx.getImageData(0, 0, size, size).data;
				let r$1 = 0, g = 0, b = 0, count = 0;
				for (let i = 0; i < data.length; i += 4) {
					if (data[i + 3] < 10) continue;
					r$1 += data[i];
					g += data[i + 1];
					b += data[i + 2];
					count++;
				}
				if (count > 0) {
					r$1 = Math.round(r$1 / count);
					g = Math.round(g / count);
					b = Math.round(b / count);
					setShadowColor(`rgba(${r$1}, ${g}, ${b}, ${Math.min(glowStrength, .85)})`);
				}
			} catch {}
		};
	}, [
		mode,
		src,
		glowStrength,
		crossOrigin
	]);
	if (mode === "dominant-shadow") return /* @__PURE__ */ import_react.default.createElement("img", {
		src,
		alt,
		className: imgClassName,
		style: { filter: `drop-shadow(0 0 ${shadowRadius}px ${shadowColor}) drop-shadow(0 0 ${Math.round(shadowRadius * .6)}px ${shadowColor})` }
	});
	return /* @__PURE__ */ import_react.default.createElement("div", {
		className,
		style: {
			position: "relative",
			display: "inline-block"
		}
	}, /* @__PURE__ */ import_react.default.createElement("img", {
		src,
		alt,
		"aria-hidden": "true",
		style: {
			position: "absolute",
			inset: 0,
			transform: `scale(${scale})`,
			filter: `blur(${blurRadius}px) saturate(1.2)`,
			opacity: glowStrength,
			pointerEvents: "none"
		}
	}), /* @__PURE__ */ import_react.default.createElement("img", {
		src,
		alt,
		className: imgClassName
	}));
};
const GlowText = ({ children, className, glowClassName, blurRadius = 12, glowStrength = .6, scale = 1.02 }) => {
	return /* @__PURE__ */ import_react.default.createElement("span", {
		className,
		style: {
			position: "relative",
			display: "inline-block"
		}
	}, /* @__PURE__ */ import_react.default.createElement("span", {
		"aria-hidden": "true",
		className: glowClassName,
		style: {
			position: "absolute",
			inset: 0,
			transform: `scale(${scale})`,
			filter: `blur(${blurRadius}px) saturate(1.1)`,
			opacity: glowStrength,
			pointerEvents: "none"
		}
	}, children), /* @__PURE__ */ import_react.default.createElement("span", null, children));
};
const GlowIcon = ({ Icon: Icon$1, iconProps = {}, className, glowColor, glowStrength = .8, glowRadius = 12, glowLayers = 3, glowSpread = 4 }) => {
	const dropShadow = import_react.useMemo(() => {
		return Array.from({ length: glowLayers }, (_, i) => {
			const radius = glowRadius + i * glowSpread;
			const opacity = Math.min(glowStrength * (1 - i * .2), 1);
			return `drop-shadow(0 0 ${radius}px ${glowColor ? glowColor.replace(/rgb\(([^)]+)\)/, `rgba($1, ${opacity})`) : `rgba(255, 255, 255, ${opacity})`})`;
		}).join(" ");
	}, [
		glowColor,
		glowStrength,
		glowRadius,
		glowLayers,
		glowSpread
	]);
	return /* @__PURE__ */ import_react.default.createElement("div", {
		className,
		style: { display: "inline-block" }
	}, /* @__PURE__ */ import_react.default.createElement(Icon$1, {
		...iconProps,
		style: {
			filter: dropShadow,
			...iconProps.style
		}
	}));
};
const GlowBorderContainer = ({ children, className, glowColor = "rgb(245, 158, 11)", glowStrength = .6, borderWidth = 1, borderRadius, glowPosition = "left-top", lightInfluenceRange = .3 }) => {
	/**
	* 根据发光位置生成边框渐变样式
	* @param position 发光元素位置
	* @returns CSS渐变字符串
	*/
	const generateBorderGradient = (position) => {
		const glowRgbMatch = glowColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
		const glowRgb = glowRgbMatch ? `${glowRgbMatch[1]}, ${glowRgbMatch[2]}, ${glowRgbMatch[3]}` : "245, 158, 11";
		const maxGlow = `rgba(${glowRgb}, ${glowStrength})`;
		const strongGlow = `rgba(${glowRgb}, ${glowStrength * .7})`;
		const mediumGlow = `rgba(${glowRgb}, ${glowStrength * .4})`;
		const weakGlow = `rgba(${glowRgb}, ${glowStrength * .15})`;
		const maxInfluence = Math.round(lightInfluenceRange * 100);
		switch (position) {
			case "left-top": return `
          radial-gradient(circle 220px at 5% 15%, 
            ${maxGlow} 0%, 
            ${strongGlow} 20%, 
            ${mediumGlow} 40%, 
            ${weakGlow} 65%, 
            transparent ${maxInfluence}%
          )
        `;
			case "left": return `
          radial-gradient(circle 150px at 10% 50%, 
            ${maxGlow} 0%, 
            ${strongGlow} 25%, 
            ${mediumGlow} 45%, 
            ${weakGlow} 70%, 
            transparent ${maxInfluence}%
          )
        `;
			case "right": return `
          radial-gradient(circle 150px at 90% 50%, 
            ${maxGlow} 0%, 
            ${strongGlow} 25%, 
            ${mediumGlow} 45%, 
            ${weakGlow} 70%, 
            transparent ${maxInfluence}%
          )
        `;
			case "top": return `
          radial-gradient(circle 150px at 50% 10%, 
            ${maxGlow} 0%, 
            ${strongGlow} 25%, 
            ${mediumGlow} 45%, 
            ${weakGlow} 70%, 
            transparent ${maxInfluence}%
          )
        `;
			case "bottom": return `
          radial-gradient(circle 150px at 50% 90%, 
            ${maxGlow} 0%, 
            ${strongGlow} 25%, 
            ${mediumGlow} 45%, 
            ${weakGlow} 70%, 
            transparent ${maxInfluence}%
          )
        `;
			case "right-top": return `
          radial-gradient(circle 150px at 92% 15%, 
            ${maxGlow} 0%, 
            ${strongGlow} 20%, 
            ${mediumGlow} 40%, 
            ${weakGlow} 65%, 
            transparent ${maxInfluence}%
          )
        `;
			case "left-bottom": return `
          radial-gradient(circle 150px at 8% 85%, 
            ${maxGlow} 0%, 
            ${strongGlow} 20%, 
            ${mediumGlow} 40%, 
            ${weakGlow} 65%, 
            transparent ${maxInfluence}%
          )
        `;
			case "right-bottom": return `
          radial-gradient(circle 150px at 92% 85%, 
            ${maxGlow} 0%, 
            ${strongGlow} 20%, 
            ${mediumGlow} 40%, 
            ${weakGlow} 65%, 
            transparent ${maxInfluence}%
          )
        `;
			case "center": return `
          radial-gradient(circle at center, 
            ${maxGlow} 0%, 
            ${strongGlow} 30%, 
            ${mediumGlow} 55%, 
            ${weakGlow} 80%, 
            transparent ${maxInfluence}%
          )
        `;
			default: return "transparent";
		}
	};
	const borderGradient = generateBorderGradient(glowPosition);
	return /* @__PURE__ */ import_react.default.createElement("div", {
		className,
		style: {
			position: "relative",
			background: borderGradient,
			padding: `${borderWidth}px`,
			borderRadius
		}
	}, /* @__PURE__ */ import_react.default.createElement("div", { style: {
		borderRadius: borderRadius ? `calc(${borderRadius} - ${borderWidth}px)` : void 0,
		overflow: "hidden",
		background: "var(--background)",
		width: "100%",
		height: "100%"
	} }, children));
};
const SmartGlowBorder = ({ children, className, glowColor, glowStrength = .5, borderWidth = 1, borderRadius = "1.5rem", glowPosition = "left-top", lightInfluenceRange = .3, enableDynamicGlow = true }) => {
	const containerRef = import_react.useRef(null);
	const [detectedGlowColor, setDetectedGlowColor] = import_react.useState("rgb(245, 158, 11)");
	import_react.useEffect(() => {
		if (!enableDynamicGlow || glowColor) return;
		const container = containerRef.current;
		if (container) {
			if (container.querySelectorAll("[style*=\"drop-shadow\"], [style*=\"filter\"]").length > 0) setDetectedGlowColor("rgb(245, 158, 11)");
		}
	}, [
		enableDynamicGlow,
		glowColor,
		children
	]);
	const finalGlowColor = glowColor || detectedGlowColor;
	return /* @__PURE__ */ import_react.default.createElement("div", { ref: containerRef }, /* @__PURE__ */ import_react.default.createElement(GlowBorderContainer, {
		className,
		glowColor: finalGlowColor,
		glowStrength,
		borderWidth,
		borderRadius,
		glowPosition,
		lightInfluenceRange
	}, children));
};

//#endregion
//#region ../template/src/components/layouts/DefaultLayout.tsx
var import_lucide_react = /* @__PURE__ */ __toESM(require_lucide_react());
/**
* 默认布局组件
* @param props 组件属性
* @returns JSX元素
*/
const DefaultLayout = ({ children, version, data, scale = 3, className = "", style = {} }) => {
	const { useDarkTheme } = data;
	return /* @__PURE__ */ import_react.default.createElement(HeroUIProvider, null, /* @__PURE__ */ import_react.default.createElement("div", {
		className: clsx_default("w-[1440px]", "bg-default-50 text-default-900", className, useDarkTheme),
		id: "container",
		style: {
			transform: `scale(${scale})`,
			transformOrigin: "top left",
			width: "1440px",
			...style
		}
	}, children, version ? /* @__PURE__ */ import_react.default.createElement("div", { className: "pt-32 pb-20 text-default-800" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex relative justify-center items-center space-x-8" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-end space-x-8" }, /* @__PURE__ */ import_react.default.createElement(GlowImage, {
		src: "/image/logo.png",
		alt: "logo",
		imgClassName: "w-auto h-18",
		glowStrength: 1,
		blurRadius: 50
	}), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-col items-start" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center mb-1 space-x-2 text-sm font-bold uppercase text-default-900" }, /* @__PURE__ */ import_react.default.createElement("span", { className: "opacity-50 text-warning" }, "karin-plugin")), /* @__PURE__ */ import_react.default.createElement("span", { className: "text-5xl font-black text-warning" }, version.pluginName))), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-col items-start opacity-80" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center mb-1 space-x-2 text-sm font-bold tracking-widest uppercase text-default-900" }, version.releaseType === "Stable" ? /* @__PURE__ */ import_react.default.createElement(import_lucide_react.CheckCircle, {
		strokeWidth: 3,
		className: "w-4 h-4"
	}) : version.releaseType === "Preview" ? /* @__PURE__ */ import_react.default.createElement(import_lucide_react.AlertTriangle, {
		strokeWidth: 3,
		className: "w-4 h-4"
	}) : /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Info, {
		strokeWidth: 3,
		className: "w-4 h-4"
	}), /* @__PURE__ */ import_react.default.createElement("span", null, version.releaseType)), /* @__PURE__ */ import_react.default.createElement("div", { className: "text-5xl font-bold tracking-wide" }, "v", version.pluginVersion)), /* @__PURE__ */ import_react.default.createElement("div", { className: "w-1 h-14 opacity-80 bg-default-900" }), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-end space-x-8" }, /* @__PURE__ */ import_react.default.createElement("img", {
		src: "/image/frame-logo.png",
		className: "self-center w-auto h-18"
	}), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-col items-start" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center mb-1 space-x-2 text-sm font-bold tracking-widest uppercase text-default-900" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Zap, {
		strokeWidth: 3,
		className: "w-4 h-4 opacity-50 text-warning"
	}), /* @__PURE__ */ import_react.default.createElement("span", { className: "opacity-50 text-warning" }, "Powered By")), /* @__PURE__ */ import_react.default.createElement("span", { className: "text-5xl font-black text-warning" }, version.poweredBy))), /* @__PURE__ */ import_react.default.createElement("div", { className: "w-1 h-14 opacity-80 bg-default-900" }), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-end space-x-8" }, /* @__PURE__ */ import_react.default.createElement("img", {
		src: "/image/vite.svg",
		className: "self-center w-auto h-16"
	}), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-col items-start opacity-80" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center mb-1 space-x-2 text-sm font-bold tracking-widest uppercase text-default-900" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Code, {
		strokeWidth: 3,
		className: "w-4 h-4"
	}), /* @__PURE__ */ import_react.default.createElement("span", null, "Built with")), /* @__PURE__ */ import_react.default.createElement("span", { className: "text-5xl font-black" }, "Vite"))))) : /* @__PURE__ */ import_react.default.createElement("div", { className: "h-24" })));
};

//#endregion
export { $7215afc6de606d6b$export$de79e2c695e052f3, $c87311424ea30a05$export$9ac100e40613ea10, $c87311424ea30a05$export$a11b0059900ceec8, $c87311424ea30a05$export$fedb369cb70207f1, $ea8dcbcb9ea1b556$export$95185d699e05d4d7, DefaultLayout, GlowIcon, GlowText, MotionConfigContext, SmartGlowBorder, clsx_default, createContext2, filterProps, require_jsx_runtime, require_lucide_react, useConstant, useProviderContext };