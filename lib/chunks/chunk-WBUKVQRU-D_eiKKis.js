import { __toESM, require_react } from "./react-tSI5bnDQ.js";
import { $7215afc6de606d6b$export$de79e2c695e052f3, MotionConfigContext, createContext2, filterProps, require_jsx_runtime, useConstant, useProviderContext } from "./DefaultLayout-Di27JJeb.js";
import { buildHTMLStyles, buildSVGAttrs, featureDefinitions, invariant, isAnimationControls, isBrowser, isControllingVariants, isForcedMotionValue, isHTMLElement, isMotionValue, isSVGComponent, isSVGTag, isVariantLabel, isVariantNode, optimizedAppearDataAttribute, resolveVariantFromProps, scrapeMotionValuesFromProps, scrapeMotionValuesFromProps$1, warnOnce, warning } from "./data-id-rnp0ln5R.js";
import { $03deb23ff14920c4$export$4eaf04e54aa8eed6, $3ef42575df84b30b$export$9d1611c77c2fe928, $431fbd86ca7dc216$export$b204af158042fbac, $507fabe10e71c6fb$export$630ff653c5ada6a9, $a1ea59d68270f0dd$export$f8168d8dd8fd66e6, $bbed8b41f857bcc0$export$24490316f764c430, $d4ee10de306f2510$export$4282f70798064fe0, $d4ee10de306f2510$export$cd4e5573fbe2b576, $e7801be82b4b2a53$export$4debdb1a3f0fa79e, $f6c31cce2adf654f$export$45712eceda6fad21, $f7dceffc5ad7768b$export$4e328f61c538687f, chain, clamp, clsx, collapseAdjacentVariantBorders, colorVariants, dataAttr, dataFocusVisibleClasses, forwardRef, getUniqueID, mapPropsVariants, mergeProps, objectToDeps, tv, useDOMRef } from "./chunk-IHOGUXIG-CUNEm6kh.js";

//#region ../../node_modules/.pnpm/framer-motion@12.23.22_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/framer-motion/dist/es/context/LayoutGroupContext.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
const LayoutGroupContext = (0, import_react.createContext)({});

//#endregion
//#region ../../node_modules/.pnpm/framer-motion@12.23.22_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/framer-motion/dist/es/utils/use-isomorphic-effect.mjs
const useIsomorphicLayoutEffect = isBrowser ? import_react.useLayoutEffect : import_react.useEffect;

//#endregion
//#region ../../node_modules/.pnpm/framer-motion@12.23.22_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/framer-motion/dist/es/context/PresenceContext.mjs
/**
* @public
*/
const PresenceContext = /* @__PURE__ */ (0, import_react.createContext)(null);

//#endregion
//#region ../../node_modules/.pnpm/framer-motion@12.23.22_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/framer-motion/dist/es/utils/use-composed-ref.mjs
/**
* Taken from https://github.com/radix-ui/primitives/blob/main/packages/react/compose-refs/src/compose-refs.tsx
*/
/**
* Set a given ref to a given value
* This utility takes care of different types of refs: callback refs and RefObject(s)
*/
function setRef(ref, value) {
	if (typeof ref === "function") return ref(value);
	else if (ref !== null && ref !== void 0) ref.current = value;
}
/**
* A utility to compose multiple refs together
* Accepts callback refs and RefObject(s)
*/
function composeRefs(...refs) {
	return (node) => {
		let hasCleanup = false;
		const cleanups = refs.map((ref) => {
			const cleanup = setRef(ref, node);
			if (!hasCleanup && typeof cleanup === "function") hasCleanup = true;
			return cleanup;
		});
		if (hasCleanup) return () => {
			for (let i = 0; i < cleanups.length; i++) {
				const cleanup = cleanups[i];
				if (typeof cleanup === "function") cleanup();
				else setRef(refs[i], null);
			}
		};
	};
}
/**
* A custom hook that composes multiple refs
* Accepts callback refs and RefObject(s)
*/
function useComposedRefs(...refs) {
	return import_react.useCallback(composeRefs(...refs), refs);
}

//#endregion
//#region ../../node_modules/.pnpm/framer-motion@12.23.22_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/framer-motion/dist/es/components/AnimatePresence/PopChild.mjs
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
/**
* Measurement functionality has to be within a separate component
* to leverage snapshot lifecycle.
*/
var PopChildMeasure = class extends import_react.Component {
	getSnapshotBeforeUpdate(prevProps) {
		const element = this.props.childRef.current;
		if (element && prevProps.isPresent && !this.props.isPresent) {
			const parent = element.offsetParent;
			const parentWidth = isHTMLElement(parent) ? parent.offsetWidth || 0 : 0;
			const size = this.props.sizeRef.current;
			size.height = element.offsetHeight || 0;
			size.width = element.offsetWidth || 0;
			size.top = element.offsetTop;
			size.left = element.offsetLeft;
			size.right = parentWidth - size.width - size.left;
		}
		return null;
	}
	/**
	* Required with getSnapshotBeforeUpdate to stop React complaining.
	*/
	componentDidUpdate() {}
	render() {
		return this.props.children;
	}
};
function PopChild({ children, isPresent, anchorX, root }) {
	const id = (0, import_react.useId)();
	const ref = (0, import_react.useRef)(null);
	const size = (0, import_react.useRef)({
		width: 0,
		height: 0,
		top: 0,
		left: 0,
		right: 0
	});
	const { nonce } = (0, import_react.useContext)(MotionConfigContext);
	const composedRef = useComposedRefs(ref, children?.ref);
	/**
	* We create and inject a style block so we can apply this explicit
	* sizing in a non-destructive manner by just deleting the style block.
	*
	* We can't apply size via render as the measurement happens
	* in getSnapshotBeforeUpdate (post-render), likewise if we apply the
	* styles directly on the DOM node, we might be overwriting
	* styles set via the style prop.
	*/
	(0, import_react.useInsertionEffect)(() => {
		const { width, height, top, left, right } = size.current;
		if (isPresent || !ref.current || !width || !height) return;
		const x = anchorX === "left" ? `left: ${left}` : `right: ${right}`;
		ref.current.dataset.motionPopId = id;
		const style = document.createElement("style");
		if (nonce) style.nonce = nonce;
		const parent = root ?? document.head;
		parent.appendChild(style);
		if (style.sheet) style.sheet.insertRule(`
          [data-motion-pop-id="${id}"] {
            position: absolute !important;
            width: ${width}px !important;
            height: ${height}px !important;
            ${x}px !important;
            top: ${top}px !important;
          }
        `);
		return () => {
			if (parent.contains(style)) parent.removeChild(style);
		};
	}, [isPresent]);
	return (0, import_jsx_runtime.jsx)(PopChildMeasure, {
		isPresent,
		childRef: ref,
		sizeRef: size,
		children: import_react.cloneElement(children, { ref: composedRef })
	});
}

//#endregion
//#region ../../node_modules/.pnpm/framer-motion@12.23.22_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/framer-motion/dist/es/components/AnimatePresence/PresenceChild.mjs
const PresenceChild = ({ children, initial, isPresent, onExitComplete, custom, presenceAffectsLayout, mode, anchorX, root }) => {
	const presenceChildren = useConstant(newChildrenMap);
	const id = (0, import_react.useId)();
	let isReusedContext = true;
	let context = (0, import_react.useMemo)(() => {
		isReusedContext = false;
		return {
			id,
			initial,
			isPresent,
			custom,
			onExitComplete: (childId) => {
				presenceChildren.set(childId, true);
				for (const isComplete of presenceChildren.values()) if (!isComplete) return;
				onExitComplete && onExitComplete();
			},
			register: (childId) => {
				presenceChildren.set(childId, false);
				return () => presenceChildren.delete(childId);
			}
		};
	}, [
		isPresent,
		presenceChildren,
		onExitComplete
	]);
	/**
	* If the presence of a child affects the layout of the components around it,
	* we want to make a new context value to ensure they get re-rendered
	* so they can detect that layout change.
	*/
	if (presenceAffectsLayout && isReusedContext) context = { ...context };
	(0, import_react.useMemo)(() => {
		presenceChildren.forEach((_, key) => presenceChildren.set(key, false));
	}, [isPresent]);
	/**
	* If there's no `motion` components to fire exit animations, we want to remove this
	* component immediately.
	*/
	import_react.useEffect(() => {
		!isPresent && !presenceChildren.size && onExitComplete && onExitComplete();
	}, [isPresent]);
	if (mode === "popLayout") children = (0, import_jsx_runtime.jsx)(PopChild, {
		isPresent,
		anchorX,
		root,
		children
	});
	return (0, import_jsx_runtime.jsx)(PresenceContext.Provider, {
		value: context,
		children
	});
};
function newChildrenMap() {
	return /* @__PURE__ */ new Map();
}

//#endregion
//#region ../../node_modules/.pnpm/framer-motion@12.23.22_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/framer-motion/dist/es/components/AnimatePresence/use-presence.mjs
/**
* When a component is the child of `AnimatePresence`, it can use `usePresence`
* to access information about whether it's still present in the React tree.
*
* ```jsx
* import { usePresence } from "framer-motion"
*
* export const Component = () => {
*   const [isPresent, safeToRemove] = usePresence()
*
*   useEffect(() => {
*     !isPresent && setTimeout(safeToRemove, 1000)
*   }, [isPresent])
*
*   return <div />
* }
* ```
*
* If `isPresent` is `false`, it means that a component has been removed the tree, but
* `AnimatePresence` won't really remove it until `safeToRemove` has been called.
*
* @public
*/
function usePresence(subscribe = true) {
	const context = (0, import_react.useContext)(PresenceContext);
	if (context === null) return [true, null];
	const { isPresent, onExitComplete, register } = context;
	const id = (0, import_react.useId)();
	(0, import_react.useEffect)(() => {
		if (subscribe) return register(id);
	}, [subscribe]);
	const safeToRemove = (0, import_react.useCallback)(() => subscribe && onExitComplete && onExitComplete(id), [
		id,
		onExitComplete,
		subscribe
	]);
	return !isPresent && onExitComplete ? [false, safeToRemove] : [true];
}

//#endregion
//#region ../../node_modules/.pnpm/framer-motion@12.23.22_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/framer-motion/dist/es/components/AnimatePresence/utils.mjs
const getChildKey = (child) => child.key || "";
function onlyElements(children) {
	const filtered = [];
	import_react.Children.forEach(children, (child) => {
		if ((0, import_react.isValidElement)(child)) filtered.push(child);
	});
	return filtered;
}

//#endregion
//#region ../../node_modules/.pnpm/framer-motion@12.23.22_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs
/**
* `AnimatePresence` enables the animation of components that have been removed from the tree.
*
* When adding/removing more than a single child, every child **must** be given a unique `key` prop.
*
* Any `motion` components that have an `exit` property defined will animate out when removed from
* the tree.
*
* ```jsx
* import { motion, AnimatePresence } from 'framer-motion'
*
* export const Items = ({ items }) => (
*   <AnimatePresence>
*     {items.map(item => (
*       <motion.div
*         key={item.id}
*         initial={{ opacity: 0 }}
*         animate={{ opacity: 1 }}
*         exit={{ opacity: 0 }}
*       />
*     ))}
*   </AnimatePresence>
* )
* ```
*
* You can sequence exit animations throughout a tree using variants.
*
* If a child contains multiple `motion` components with `exit` props, it will only unmount the child
* once all `motion` components have finished animating out. Likewise, any components using
* `usePresence` all need to call `safeToRemove`.
*
* @public
*/
const AnimatePresence = ({ children, custom, initial = true, onExitComplete, presenceAffectsLayout = true, mode = "sync", propagate = false, anchorX = "left", root }) => {
	const [isParentPresent, safeToRemove] = usePresence(propagate);
	/**
	* Filter any children that aren't ReactElements. We can only track components
	* between renders with a props.key.
	*/
	const presentChildren = (0, import_react.useMemo)(() => onlyElements(children), [children]);
	/**
	* Track the keys of the currently rendered children. This is used to
	* determine which children are exiting.
	*/
	const presentKeys = propagate && !isParentPresent ? [] : presentChildren.map(getChildKey);
	/**
	* If `initial={false}` we only want to pass this to components in the first render.
	*/
	const isInitialRender = (0, import_react.useRef)(true);
	/**
	* A ref containing the currently present children. When all exit animations
	* are complete, we use this to re-render the component with the latest children
	* *committed* rather than the latest children *rendered*.
	*/
	const pendingPresentChildren = (0, import_react.useRef)(presentChildren);
	/**
	* Track which exiting children have finished animating out.
	*/
	const exitComplete = useConstant(() => /* @__PURE__ */ new Map());
	/**
	* Save children to render as React state. To ensure this component is concurrent-safe,
	* we check for exiting children via an effect.
	*/
	const [diffedChildren, setDiffedChildren] = (0, import_react.useState)(presentChildren);
	const [renderedChildren, setRenderedChildren] = (0, import_react.useState)(presentChildren);
	useIsomorphicLayoutEffect(() => {
		isInitialRender.current = false;
		pendingPresentChildren.current = presentChildren;
		/**
		* Update complete status of exiting children.
		*/
		for (let i = 0; i < renderedChildren.length; i++) {
			const key = getChildKey(renderedChildren[i]);
			if (!presentKeys.includes(key)) {
				if (exitComplete.get(key) !== true) exitComplete.set(key, false);
			} else exitComplete.delete(key);
		}
	}, [
		renderedChildren,
		presentKeys.length,
		presentKeys.join("-")
	]);
	const exitingChildren = [];
	if (presentChildren !== diffedChildren) {
		let nextChildren = [...presentChildren];
		/**
		* Loop through all the currently rendered components and decide which
		* are exiting.
		*/
		for (let i = 0; i < renderedChildren.length; i++) {
			const child = renderedChildren[i];
			const key = getChildKey(child);
			if (!presentKeys.includes(key)) {
				nextChildren.splice(i, 0, child);
				exitingChildren.push(child);
			}
		}
		/**
		* If we're in "wait" mode, and we have exiting children, we want to
		* only render these until they've all exited.
		*/
		if (mode === "wait" && exitingChildren.length) nextChildren = exitingChildren;
		setRenderedChildren(onlyElements(nextChildren));
		setDiffedChildren(presentChildren);
		/**
		* Early return to ensure once we've set state with the latest diffed
		* children, we can immediately re-render.
		*/
		return null;
	}
	if (process.env.NODE_ENV !== "production" && mode === "wait" && renderedChildren.length > 1) console.warn(`You're attempting to animate multiple children within AnimatePresence, but its mode is set to "wait". This will lead to odd visual behaviour.`);
	/**
	* If we've been provided a forceRender function by the LayoutGroupContext,
	* we can use it to force a re-render amongst all surrounding components once
	* all components have finished animating out.
	*/
	const { forceRender } = (0, import_react.useContext)(LayoutGroupContext);
	return (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: renderedChildren.map((child) => {
		const key = getChildKey(child);
		const isPresent = propagate && !isParentPresent ? false : presentChildren === renderedChildren || presentKeys.includes(key);
		const onExit = () => {
			if (exitComplete.has(key)) exitComplete.set(key, true);
			else return;
			let isEveryExitComplete = true;
			exitComplete.forEach((isExitComplete) => {
				if (!isExitComplete) isEveryExitComplete = false;
			});
			if (isEveryExitComplete) {
				forceRender?.();
				setRenderedChildren(pendingPresentChildren.current);
				propagate && safeToRemove?.();
				onExitComplete && onExitComplete();
			}
		};
		return (0, import_jsx_runtime.jsx)(PresenceChild, {
			isPresent,
			initial: !isInitialRender.current || initial ? void 0 : false,
			custom,
			presenceAffectsLayout,
			mode,
			root,
			onExitComplete: isPresent ? void 0 : onExit,
			anchorX,
			children: child
		}, key);
	}) });
};

//#endregion
//#region ../../node_modules/.pnpm/framer-motion@12.23.22_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/framer-motion/dist/es/context/LazyContext.mjs
const LazyContext = (0, import_react.createContext)({ strict: false });

//#endregion
//#region ../../node_modules/.pnpm/framer-motion@12.23.22_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/framer-motion/dist/es/motion/features/load-features.mjs
function loadFeatures(features) {
	for (const key in features) featureDefinitions[key] = {
		...featureDefinitions[key],
		...features[key]
	};
}

//#endregion
//#region ../../node_modules/.pnpm/framer-motion@12.23.22_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/framer-motion/dist/es/components/LazyMotion/index.mjs
/**
* Used in conjunction with the `m` component to reduce bundle size.
*
* `m` is a version of the `motion` component that only loads functionality
* critical for the initial render.
*
* `LazyMotion` can then be used to either synchronously or asynchronously
* load animation and gesture support.
*
* ```jsx
* // Synchronous loading
* import { LazyMotion, m, domAnimation } from "framer-motion"
*
* function App() {
*   return (
*     <LazyMotion features={domAnimation}>
*       <m.div animate={{ scale: 2 }} />
*     </LazyMotion>
*   )
* }
*
* // Asynchronous loading
* import { LazyMotion, m } from "framer-motion"
*
* function App() {
*   return (
*     <LazyMotion features={() => import('./path/to/domAnimation')}>
*       <m.div animate={{ scale: 2 }} />
*     </LazyMotion>
*   )
* }
* ```
*
* @public
*/
function LazyMotion({ children, features, strict = false }) {
	const [, setIsLoaded] = (0, import_react.useState)(!isLazyBundle(features));
	const loadedRenderer = (0, import_react.useRef)(void 0);
	/**
	* If this is a synchronous load, load features immediately
	*/
	if (!isLazyBundle(features)) {
		const { renderer,...loadedFeatures } = features;
		loadedRenderer.current = renderer;
		loadFeatures(loadedFeatures);
	}
	(0, import_react.useEffect)(() => {
		if (isLazyBundle(features)) features().then(({ renderer,...loadedFeatures }) => {
			loadFeatures(loadedFeatures);
			loadedRenderer.current = renderer;
			setIsLoaded(true);
		});
	}, []);
	return (0, import_jsx_runtime.jsx)(LazyContext.Provider, {
		value: {
			renderer: loadedRenderer.current,
			strict
		},
		children
	});
}
function isLazyBundle(features) {
	return typeof features === "function";
}

//#endregion
//#region ../../node_modules/.pnpm/framer-motion@12.23.22_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/framer-motion/dist/es/context/MotionContext/index.mjs
const MotionContext = /* @__PURE__ */ (0, import_react.createContext)({});

//#endregion
//#region ../../node_modules/.pnpm/framer-motion@12.23.22_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/framer-motion/dist/es/context/MotionContext/utils.mjs
function getCurrentTreeVariants(props, context) {
	if (isControllingVariants(props)) {
		const { initial, animate } = props;
		return {
			initial: initial === false || isVariantLabel(initial) ? initial : void 0,
			animate: isVariantLabel(animate) ? animate : void 0
		};
	}
	return props.inherit !== false ? context : {};
}

//#endregion
//#region ../../node_modules/.pnpm/framer-motion@12.23.22_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/framer-motion/dist/es/context/MotionContext/create.mjs
function useCreateMotionContext(props) {
	const { initial, animate } = getCurrentTreeVariants(props, (0, import_react.useContext)(MotionContext));
	return (0, import_react.useMemo)(() => ({
		initial,
		animate
	}), [variantLabelsAsDependency(initial), variantLabelsAsDependency(animate)]);
}
function variantLabelsAsDependency(prop) {
	return Array.isArray(prop) ? prop.join(" ") : prop;
}

//#endregion
//#region ../../node_modules/.pnpm/framer-motion@12.23.22_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/framer-motion/dist/es/render/html/utils/create-render-state.mjs
const createHtmlRenderState = () => ({
	style: {},
	transform: {},
	transformOrigin: {},
	vars: {}
});

//#endregion
//#region ../../node_modules/.pnpm/framer-motion@12.23.22_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/framer-motion/dist/es/render/html/use-props.mjs
function copyRawValuesOnly(target, source, props) {
	for (const key in source) if (!isMotionValue(source[key]) && !isForcedMotionValue(key, props)) target[key] = source[key];
}
function useInitialMotionValues({ transformTemplate }, visualState) {
	return (0, import_react.useMemo)(() => {
		const state = createHtmlRenderState();
		buildHTMLStyles(state, visualState, transformTemplate);
		return Object.assign({}, state.vars, state.style);
	}, [visualState]);
}
function useStyle(props, visualState) {
	const styleProp = props.style || {};
	const style = {};
	/**
	* Copy non-Motion Values straight into style
	*/
	copyRawValuesOnly(style, styleProp, props);
	Object.assign(style, useInitialMotionValues(props, visualState));
	return style;
}
function useHTMLProps(props, visualState) {
	const htmlProps = {};
	const style = useStyle(props, visualState);
	if (props.drag && props.dragListener !== false) {
		htmlProps.draggable = false;
		style.userSelect = style.WebkitUserSelect = style.WebkitTouchCallout = "none";
		style.touchAction = props.drag === true ? "none" : `pan-${props.drag === "x" ? "y" : "x"}`;
	}
	if (props.tabIndex === void 0 && (props.onTap || props.onTapStart || props.whileTap)) htmlProps.tabIndex = 0;
	htmlProps.style = style;
	return htmlProps;
}

//#endregion
//#region ../../node_modules/.pnpm/framer-motion@12.23.22_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/framer-motion/dist/es/render/svg/utils/create-render-state.mjs
const createSvgRenderState = () => ({
	...createHtmlRenderState(),
	attrs: {}
});

//#endregion
//#region ../../node_modules/.pnpm/framer-motion@12.23.22_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/framer-motion/dist/es/render/svg/use-props.mjs
function useSVGProps(props, visualState, _isStatic, Component) {
	const visualProps = (0, import_react.useMemo)(() => {
		const state = createSvgRenderState();
		buildSVGAttrs(state, visualState, isSVGTag(Component), props.transformTemplate, props.style);
		return {
			...state.attrs,
			style: { ...state.style }
		};
	}, [visualState]);
	if (props.style) {
		const rawStyles = {};
		copyRawValuesOnly(rawStyles, props.style, props);
		visualProps.style = {
			...rawStyles,
			...visualProps.style
		};
	}
	return visualProps;
}

//#endregion
//#region ../../node_modules/.pnpm/framer-motion@12.23.22_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/framer-motion/dist/es/render/dom/use-render.mjs
function useRender(Component, props, ref, { latestValues }, isStatic, forwardMotionProps = false) {
	const visualProps = (isSVGComponent(Component) ? useSVGProps : useHTMLProps)(props, latestValues, isStatic, Component);
	const filteredProps = filterProps(props, typeof Component === "string", forwardMotionProps);
	const elementProps = Component !== import_react.Fragment ? {
		...filteredProps,
		...visualProps,
		ref
	} : {};
	/**
	* If component has been handed a motion value as its child,
	* memoise its initial value and render that. Subsequent updates
	* will be handled by the onChange handler
	*/
	const { children } = props;
	const renderedChildren = (0, import_react.useMemo)(() => isMotionValue(children) ? children.get() : children, [children]);
	return (0, import_react.createElement)(Component, {
		...elementProps,
		children: renderedChildren
	});
}

//#endregion
//#region ../../node_modules/.pnpm/framer-motion@12.23.22_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/framer-motion/dist/es/value/utils/resolve-motion-value.mjs
/**
* If the provided value is a MotionValue, this returns the actual value, otherwise just the value itself
*
* TODO: Remove and move to library
*/
function resolveMotionValue(value) {
	return isMotionValue(value) ? value.get() : value;
}

//#endregion
//#region ../../node_modules/.pnpm/framer-motion@12.23.22_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/framer-motion/dist/es/motion/utils/use-visual-state.mjs
function makeState({ scrapeMotionValuesFromProps: scrapeMotionValuesFromProps$2, createRenderState }, props, context, presenceContext) {
	return {
		latestValues: makeLatestValues(props, context, presenceContext, scrapeMotionValuesFromProps$2),
		renderState: createRenderState()
	};
}
function makeLatestValues(props, context, presenceContext, scrapeMotionValues) {
	const values = {};
	const motionValues = scrapeMotionValues(props, {});
	for (const key in motionValues) values[key] = resolveMotionValue(motionValues[key]);
	let { initial, animate } = props;
	const isControllingVariants$1 = isControllingVariants(props);
	const isVariantNode$1 = isVariantNode(props);
	if (context && isVariantNode$1 && !isControllingVariants$1 && props.inherit !== false) {
		if (initial === void 0) initial = context.initial;
		if (animate === void 0) animate = context.animate;
	}
	let isInitialAnimationBlocked = presenceContext ? presenceContext.initial === false : false;
	isInitialAnimationBlocked = isInitialAnimationBlocked || initial === false;
	const variantToSet = isInitialAnimationBlocked ? animate : initial;
	if (variantToSet && typeof variantToSet !== "boolean" && !isAnimationControls(variantToSet)) {
		const list = Array.isArray(variantToSet) ? variantToSet : [variantToSet];
		for (let i = 0; i < list.length; i++) {
			const resolved = resolveVariantFromProps(props, list[i]);
			if (resolved) {
				const { transitionEnd, transition,...target } = resolved;
				for (const key in target) {
					let valueTarget = target[key];
					if (Array.isArray(valueTarget)) {
						/**
						* Take final keyframe if the initial animation is blocked because
						* we want to initialise at the end of that blocked animation.
						*/
						const index = isInitialAnimationBlocked ? valueTarget.length - 1 : 0;
						valueTarget = valueTarget[index];
					}
					if (valueTarget !== null) values[key] = valueTarget;
				}
				for (const key in transitionEnd) values[key] = transitionEnd[key];
			}
		}
	}
	return values;
}
const makeUseVisualState = (config) => (props, isStatic) => {
	const context = (0, import_react.useContext)(MotionContext);
	const presenceContext = (0, import_react.useContext)(PresenceContext);
	const make = () => makeState(config, props, context, presenceContext);
	return isStatic ? make() : useConstant(make);
};

//#endregion
//#region ../../node_modules/.pnpm/framer-motion@12.23.22_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/framer-motion/dist/es/render/html/use-html-visual-state.mjs
const useHTMLVisualState = /* @__PURE__ */ makeUseVisualState({
	scrapeMotionValuesFromProps: scrapeMotionValuesFromProps$1,
	createRenderState: createHtmlRenderState
});

//#endregion
//#region ../../node_modules/.pnpm/framer-motion@12.23.22_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/framer-motion/dist/es/render/svg/use-svg-visual-state.mjs
const useSVGVisualState = /* @__PURE__ */ makeUseVisualState({
	scrapeMotionValuesFromProps,
	createRenderState: createSvgRenderState
});

//#endregion
//#region ../../node_modules/.pnpm/framer-motion@12.23.22_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/framer-motion/dist/es/motion/utils/symbol.mjs
const motionComponentSymbol = Symbol.for("motionComponentSymbol");

//#endregion
//#region ../../node_modules/.pnpm/framer-motion@12.23.22_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/framer-motion/dist/es/utils/is-ref-object.mjs
function isRefObject(ref) {
	return ref && typeof ref === "object" && Object.prototype.hasOwnProperty.call(ref, "current");
}

//#endregion
//#region ../../node_modules/.pnpm/framer-motion@12.23.22_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/framer-motion/dist/es/motion/utils/use-motion-ref.mjs
/**
* Creates a ref function that, when called, hydrates the provided
* external ref and VisualElement.
*/
function useMotionRef(visualState, visualElement, externalRef) {
	return (0, import_react.useCallback)(
		(instance) => {
			if (instance) visualState.onMount && visualState.onMount(instance);
			if (visualElement) if (instance) visualElement.mount(instance);
			else visualElement.unmount();
			if (externalRef) {
				if (typeof externalRef === "function") externalRef(instance);
				else if (isRefObject(externalRef)) externalRef.current = instance;
			}
		},
		/**
		* Include externalRef in dependencies to ensure the callback updates
		* when the ref changes, allowing proper ref forwarding.
		*/
		[visualElement]
	);
}

//#endregion
//#region ../../node_modules/.pnpm/framer-motion@12.23.22_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/framer-motion/dist/es/context/SwitchLayoutGroupContext.mjs
/**
* Internal, exported only for usage in Framer
*/
const SwitchLayoutGroupContext = (0, import_react.createContext)({});

//#endregion
//#region ../../node_modules/.pnpm/framer-motion@12.23.22_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/framer-motion/dist/es/motion/utils/use-visual-element.mjs
function useVisualElement(Component, visualState, props, createVisualElement, ProjectionNodeConstructor) {
	const { visualElement: parent } = (0, import_react.useContext)(MotionContext);
	const lazyContext = (0, import_react.useContext)(LazyContext);
	const presenceContext = (0, import_react.useContext)(PresenceContext);
	const reducedMotionConfig = (0, import_react.useContext)(MotionConfigContext).reducedMotion;
	const visualElementRef = (0, import_react.useRef)(null);
	/**
	* If we haven't preloaded a renderer, check to see if we have one lazy-loaded
	*/
	createVisualElement = createVisualElement || lazyContext.renderer;
	if (!visualElementRef.current && createVisualElement) visualElementRef.current = createVisualElement(Component, {
		visualState,
		parent,
		props,
		presenceContext,
		blockInitialAnimation: presenceContext ? presenceContext.initial === false : false,
		reducedMotionConfig
	});
	const visualElement = visualElementRef.current;
	/**
	* Load Motion gesture and animation features. These are rendered as renderless
	* components so each feature can optionally make use of React lifecycle methods.
	*/
	const initialLayoutGroupConfig = (0, import_react.useContext)(SwitchLayoutGroupContext);
	if (visualElement && !visualElement.projection && ProjectionNodeConstructor && (visualElement.type === "html" || visualElement.type === "svg")) createProjectionNode(visualElementRef.current, props, ProjectionNodeConstructor, initialLayoutGroupConfig);
	const isMounted = (0, import_react.useRef)(false);
	(0, import_react.useInsertionEffect)(() => {
		/**
		* Check the component has already mounted before calling
		* `update` unnecessarily. This ensures we skip the initial update.
		*/
		if (visualElement && isMounted.current) visualElement.update(props, presenceContext);
	});
	/**
	* Cache this value as we want to know whether HandoffAppearAnimations
	* was present on initial render - it will be deleted after this.
	*/
	const optimisedAppearId = props[optimizedAppearDataAttribute];
	const wantsHandoff = (0, import_react.useRef)(Boolean(optimisedAppearId) && !window.MotionHandoffIsComplete?.(optimisedAppearId) && window.MotionHasOptimisedAnimation?.(optimisedAppearId));
	useIsomorphicLayoutEffect(() => {
		if (!visualElement) return;
		isMounted.current = true;
		window.MotionIsMounted = true;
		visualElement.updateFeatures();
		visualElement.scheduleRenderMicrotask();
		/**
		* Ideally this function would always run in a useEffect.
		*
		* However, if we have optimised appear animations to handoff from,
		* it needs to happen synchronously to ensure there's no flash of
		* incorrect styles in the event of a hydration error.
		*
		* So if we detect a situtation where optimised appear animations
		* are running, we use useLayoutEffect to trigger animations.
		*/
		if (wantsHandoff.current && visualElement.animationState) visualElement.animationState.animateChanges();
	});
	(0, import_react.useEffect)(() => {
		if (!visualElement) return;
		if (!wantsHandoff.current && visualElement.animationState) visualElement.animationState.animateChanges();
		if (wantsHandoff.current) {
			queueMicrotask(() => {
				window.MotionHandoffMarkAsComplete?.(optimisedAppearId);
			});
			wantsHandoff.current = false;
		}
		/**
		* Now we've finished triggering animations for this element we
		* can wipe the enteringChildren set for the next render.
		*/
		visualElement.enteringChildren = void 0;
	});
	return visualElement;
}
function createProjectionNode(visualElement, props, ProjectionNodeConstructor, initialPromotionConfig) {
	const { layoutId, layout, drag, dragConstraints, layoutScroll, layoutRoot, layoutCrossfade } = props;
	visualElement.projection = new ProjectionNodeConstructor(visualElement.latestValues, props["data-framer-portal-id"] ? void 0 : getClosestProjectingNode(visualElement.parent));
	visualElement.projection.setOptions({
		layoutId,
		layout,
		alwaysMeasureLayout: Boolean(drag) || dragConstraints && isRefObject(dragConstraints),
		visualElement,
		animationType: typeof layout === "string" ? layout : "both",
		initialPromotionConfig,
		crossfade: layoutCrossfade,
		layoutScroll,
		layoutRoot
	});
}
function getClosestProjectingNode(visualElement) {
	if (!visualElement) return void 0;
	return visualElement.options.allowProjection !== false ? visualElement.projection : getClosestProjectingNode(visualElement.parent);
}

//#endregion
//#region ../../node_modules/.pnpm/framer-motion@12.23.22_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/framer-motion/dist/es/motion/index.mjs
/**
* Create a `motion` component.
*
* This function accepts a Component argument, which can be either a string (ie "div"
* for `motion.div`), or an actual React component.
*
* Alongside this is a config option which provides a way of rendering the provided
* component "offline", or outside the React render cycle.
*/
function createMotionComponent(Component, { forwardMotionProps = false } = {}, preloadedFeatures, createVisualElement) {
	preloadedFeatures && loadFeatures(preloadedFeatures);
	const useVisualState = isSVGComponent(Component) ? useSVGVisualState : useHTMLVisualState;
	function MotionDOMComponent(props, externalRef) {
		/**
		* If we need to measure the element we load this functionality in a
		* separate class component in order to gain access to getSnapshotBeforeUpdate.
		*/
		let MeasureLayout;
		const configAndProps = {
			...(0, import_react.useContext)(MotionConfigContext),
			...props,
			layoutId: useLayoutId(props)
		};
		const { isStatic } = configAndProps;
		const context = useCreateMotionContext(props);
		const visualState = useVisualState(props, isStatic);
		if (!isStatic && isBrowser) {
			useStrictMode(configAndProps, preloadedFeatures);
			const layoutProjection = getProjectionFunctionality(configAndProps);
			MeasureLayout = layoutProjection.MeasureLayout;
			/**
			* Create a VisualElement for this component. A VisualElement provides a common
			* interface to renderer-specific APIs (ie DOM/Three.js etc) as well as
			* providing a way of rendering to these APIs outside of the React render loop
			* for more performant animations and interactions
			*/
			context.visualElement = useVisualElement(Component, visualState, configAndProps, createVisualElement, layoutProjection.ProjectionNode);
		}
		/**
		* The mount order and hierarchy is specific to ensure our element ref
		* is hydrated by the time features fire their effects.
		*/
		return (0, import_jsx_runtime.jsxs)(MotionContext.Provider, {
			value: context,
			children: [MeasureLayout && context.visualElement ? (0, import_jsx_runtime.jsx)(MeasureLayout, {
				visualElement: context.visualElement,
				...configAndProps
			}) : null, useRender(Component, props, useMotionRef(visualState, context.visualElement, externalRef), visualState, isStatic, forwardMotionProps)]
		});
	}
	MotionDOMComponent.displayName = `motion.${typeof Component === "string" ? Component : `create(${Component.displayName ?? Component.name ?? ""})`}`;
	const ForwardRefMotionComponent = (0, import_react.forwardRef)(MotionDOMComponent);
	ForwardRefMotionComponent[motionComponentSymbol] = Component;
	return ForwardRefMotionComponent;
}
function useLayoutId({ layoutId }) {
	const layoutGroupId = (0, import_react.useContext)(LayoutGroupContext).id;
	return layoutGroupId && layoutId !== void 0 ? layoutGroupId + "-" + layoutId : layoutId;
}
function useStrictMode(configAndProps, preloadedFeatures) {
	const isStrict = (0, import_react.useContext)(LazyContext).strict;
	/**
	* If we're in development mode, check to make sure we're not rendering a motion component
	* as a child of LazyMotion, as this will break the file-size benefits of using it.
	*/
	if (process.env.NODE_ENV !== "production" && preloadedFeatures && isStrict) {
		const strictMessage = "You have rendered a `motion` component within a `LazyMotion` component. This will break tree shaking. Import and render a `m` component instead.";
		configAndProps.ignoreStrict ? warning(false, strictMessage, "lazy-strict-mode") : invariant(false, strictMessage, "lazy-strict-mode");
	}
}
function getProjectionFunctionality(props) {
	const { drag, layout } = featureDefinitions;
	if (!drag && !layout) return {};
	const combined = {
		...drag,
		...layout
	};
	return {
		MeasureLayout: drag?.isEnabled(props) || layout?.isEnabled(props) ? combined.MeasureLayout : void 0,
		ProjectionNode: combined.ProjectionNode
	};
}

//#endregion
//#region ../../node_modules/.pnpm/framer-motion@12.23.22_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/framer-motion/dist/es/render/components/create-proxy.mjs
function createMotionProxy(preloadedFeatures, createVisualElement) {
	if (typeof Proxy === "undefined") return createMotionComponent;
	/**
	* A cache of generated `motion` components, e.g `motion.div`, `motion.input` etc.
	* Rather than generating them anew every render.
	*/
	const componentCache = /* @__PURE__ */ new Map();
	const factory = (Component, options) => {
		return createMotionComponent(Component, options, preloadedFeatures, createVisualElement);
	};
	/**
	* Support for deprecated`motion(Component)` pattern
	*/
	const deprecatedFactoryFunction = (Component, options) => {
		if (process.env.NODE_ENV !== "production") warnOnce(false, "motion() is deprecated. Use motion.create() instead.");
		return factory(Component, options);
	};
	return new Proxy(deprecatedFactoryFunction, { get: (_target, key) => {
		if (key === "create") return factory;
		/**
		* If this element doesn't exist in the component cache, create it and cache.
		*/
		if (!componentCache.has(key)) componentCache.set(key, createMotionComponent(key, void 0, preloadedFeatures, createVisualElement));
		return componentCache.get(key);
	} });
}

//#endregion
//#region ../../node_modules/.pnpm/framer-motion@12.23.22_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/framer-motion/dist/es/render/components/m/proxy.mjs
const m = /* @__PURE__ */ createMotionProxy();

//#endregion
//#region ../../node_modules/.pnpm/@heroui+react-rsc-utils@2.1.9_react@19.2.0/node_modules/@heroui/react-rsc-utils/dist/chunk-RFWDHYLZ.mjs
var DOMPropNames = /* @__PURE__ */ new Set([
	"id",
	"type",
	"style",
	"title",
	"role",
	"tabIndex",
	"htmlFor",
	"width",
	"height",
	"abbr",
	"accept",
	"acceptCharset",
	"accessKey",
	"action",
	"allowFullScreen",
	"allowTransparency",
	"alt",
	"async",
	"autoComplete",
	"autoFocus",
	"autoPlay",
	"cellPadding",
	"cellSpacing",
	"challenge",
	"charset",
	"checked",
	"cite",
	"class",
	"className",
	"cols",
	"colSpan",
	"command",
	"content",
	"contentEditable",
	"contextMenu",
	"controls",
	"coords",
	"crossOrigin",
	"data",
	"dateTime",
	"default",
	"defer",
	"dir",
	"disabled",
	"download",
	"draggable",
	"dropzone",
	"encType",
	"enterKeyHint",
	"for",
	"form",
	"formAction",
	"formEncType",
	"formMethod",
	"formNoValidate",
	"formTarget",
	"frameBorder",
	"headers",
	"hidden",
	"high",
	"href",
	"hrefLang",
	"httpEquiv",
	"icon",
	"inputMode",
	"isMap",
	"itemId",
	"itemProp",
	"itemRef",
	"itemScope",
	"itemType",
	"kind",
	"label",
	"lang",
	"list",
	"loop",
	"manifest",
	"max",
	"maxLength",
	"media",
	"mediaGroup",
	"method",
	"min",
	"minLength",
	"multiple",
	"muted",
	"name",
	"noValidate",
	"open",
	"optimum",
	"pattern",
	"ping",
	"placeholder",
	"poster",
	"preload",
	"radioGroup",
	"referrerPolicy",
	"readOnly",
	"rel",
	"required",
	"rows",
	"rowSpan",
	"sandbox",
	"scope",
	"scoped",
	"scrolling",
	"seamless",
	"selected",
	"shape",
	"size",
	"sizes",
	"slot",
	"sortable",
	"span",
	"spellCheck",
	"src",
	"srcDoc",
	"srcSet",
	"start",
	"step",
	"target",
	"translate",
	"typeMustMatch",
	"useMap",
	"value",
	"wmode",
	"wrap"
]);
var DOMEventNames = /* @__PURE__ */ new Set([
	"onCopy",
	"onCut",
	"onPaste",
	"onLoad",
	"onError",
	"onWheel",
	"onScroll",
	"onCompositionEnd",
	"onCompositionStart",
	"onCompositionUpdate",
	"onKeyDown",
	"onKeyPress",
	"onKeyUp",
	"onFocus",
	"onBlur",
	"onChange",
	"onInput",
	"onSubmit",
	"onClick",
	"onContextMenu",
	"onDoubleClick",
	"onDrag",
	"onDragEnd",
	"onDragEnter",
	"onDragExit",
	"onDragLeave",
	"onDragOver",
	"onDragStart",
	"onDrop",
	"onMouseDown",
	"onMouseEnter",
	"onMouseLeave",
	"onMouseMove",
	"onMouseOut",
	"onMouseOver",
	"onMouseUp",
	"onPointerDown",
	"onPointerEnter",
	"onPointerLeave",
	"onPointerUp",
	"onSelect",
	"onTouchCancel",
	"onTouchEnd",
	"onTouchMove",
	"onTouchStart",
	"onAnimationStart",
	"onAnimationEnd",
	"onAnimationIteration",
	"onTransitionEnd"
]);

//#endregion
//#region ../../node_modules/.pnpm/@heroui+react-rsc-utils@2.1.9_react@19.2.0/node_modules/@heroui/react-rsc-utils/dist/chunk-RJKRL3AU.mjs
var propRe = /^(data-.*)$/;
var ariaRe = /^(aria-.*)$/;
var funcRe = /^(on[A-Z].*)$/;
function filterDOMProps(props, opts = {}) {
	let { labelable = true, enabled = true, propNames, omitPropNames, omitEventNames, omitDataProps, omitEventProps } = opts;
	let filteredProps = {};
	if (!enabled) return props;
	for (const prop in props) {
		if (omitPropNames == null ? void 0 : omitPropNames.has(prop)) continue;
		if ((omitEventNames == null ? void 0 : omitEventNames.has(prop)) && funcRe.test(prop)) continue;
		if (funcRe.test(prop) && !DOMEventNames.has(prop)) continue;
		if (omitDataProps && propRe.test(prop)) continue;
		if (omitEventProps && funcRe.test(prop)) continue;
		if (Object.prototype.hasOwnProperty.call(props, prop) && (DOMPropNames.has(prop) || labelable && ariaRe.test(prop) || (propNames == null ? void 0 : propNames.has(prop)) || propRe.test(prop)) || funcRe.test(prop)) filteredProps[prop] = props[prop];
	}
	return filteredProps;
}

//#endregion
//#region ../../node_modules/.pnpm/@react-aria+utils@3.31.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/@react-aria/utils/dist/filterDOMProps.mjs
const $65484d02dcb7eb3e$var$DOMPropNames = new Set(["id"]);
const $65484d02dcb7eb3e$var$labelablePropNames = new Set([
	"aria-label",
	"aria-labelledby",
	"aria-describedby",
	"aria-details"
]);
const $65484d02dcb7eb3e$var$linkPropNames = new Set([
	"href",
	"hrefLang",
	"target",
	"rel",
	"download",
	"ping",
	"referrerPolicy"
]);
const $65484d02dcb7eb3e$var$globalAttrs = new Set([
	"dir",
	"lang",
	"hidden",
	"inert",
	"translate"
]);
const $65484d02dcb7eb3e$var$globalEvents = new Set([
	"onClick",
	"onAuxClick",
	"onContextMenu",
	"onDoubleClick",
	"onMouseDown",
	"onMouseEnter",
	"onMouseLeave",
	"onMouseMove",
	"onMouseOut",
	"onMouseOver",
	"onMouseUp",
	"onTouchCancel",
	"onTouchEnd",
	"onTouchMove",
	"onTouchStart",
	"onPointerDown",
	"onPointerMove",
	"onPointerUp",
	"onPointerCancel",
	"onPointerEnter",
	"onPointerLeave",
	"onPointerOver",
	"onPointerOut",
	"onGotPointerCapture",
	"onLostPointerCapture",
	"onScroll",
	"onWheel",
	"onAnimationStart",
	"onAnimationEnd",
	"onAnimationIteration",
	"onTransitionCancel",
	"onTransitionEnd",
	"onTransitionRun",
	"onTransitionStart"
]);
const $65484d02dcb7eb3e$var$propRe = /^(data-.*)$/;
function $65484d02dcb7eb3e$export$457c3d6518dd4c6f(props, opts = {}) {
	let { labelable, isLink, global, events = global, propNames } = opts;
	let filteredProps = {};
	for (const prop in props) if (Object.prototype.hasOwnProperty.call(props, prop) && ($65484d02dcb7eb3e$var$DOMPropNames.has(prop) || labelable && $65484d02dcb7eb3e$var$labelablePropNames.has(prop) || isLink && $65484d02dcb7eb3e$var$linkPropNames.has(prop) || global && $65484d02dcb7eb3e$var$globalAttrs.has(prop) || events && $65484d02dcb7eb3e$var$globalEvents.has(prop) || prop.endsWith("Capture") && $65484d02dcb7eb3e$var$globalEvents.has(prop.slice(0, -7)) || (propNames === null || propNames === void 0 ? void 0 : propNames.has(prop)) || $65484d02dcb7eb3e$var$propRe.test(prop))) filteredProps[prop] = props[prop];
	return filteredProps;
}

//#endregion
//#region ../../node_modules/.pnpm/@react-aria+interactions@3.25.6_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/@react-aria/interactions/dist/focusSafely.mjs
function $3ad3f6e1647bc98d$export$80f3e147d781571c(element) {
	const ownerDocument = $431fbd86ca7dc216$export$b204af158042fbac(element);
	const activeElement = $d4ee10de306f2510$export$cd4e5573fbe2b576(ownerDocument);
	if ($507fabe10e71c6fb$export$630ff653c5ada6a9() === "virtual") {
		let lastFocusedElement = activeElement;
		$bbed8b41f857bcc0$export$24490316f764c430(() => {
			if ($d4ee10de306f2510$export$cd4e5573fbe2b576(ownerDocument) === lastFocusedElement && element.isConnected) $7215afc6de606d6b$export$de79e2c695e052f3(element);
		});
	} else $7215afc6de606d6b$export$de79e2c695e052f3(element);
}

//#endregion
//#region ../../node_modules/.pnpm/@react-aria+interactions@3.25.6_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/@react-aria/interactions/dist/createEventHandler.mjs
function $93925083ecbb358c$export$48d1ea6320830260(handler) {
	if (!handler) return void 0;
	let shouldStopPropagation = true;
	return (e) => {
		handler({
			...e,
			preventDefault() {
				e.preventDefault();
			},
			isDefaultPrevented() {
				return e.isDefaultPrevented();
			},
			stopPropagation() {
				if (shouldStopPropagation && process.env.NODE_ENV !== "production") console.error("stopPropagation is now the default behavior for events in React Spectrum. You can use continuePropagation() to revert this behavior.");
				else shouldStopPropagation = true;
			},
			continuePropagation() {
				shouldStopPropagation = false;
			},
			isPropagationStopped() {
				return shouldStopPropagation;
			}
		});
		if (shouldStopPropagation) e.stopPropagation();
	};
}

//#endregion
//#region ../../node_modules/.pnpm/@react-aria+interactions@3.25.6_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/@react-aria/interactions/dist/useKeyboard.mjs
function $46d819fcbaf35654$export$8f71654801c2f7cd(props) {
	return { keyboardProps: props.isDisabled ? {} : {
		onKeyDown: $93925083ecbb358c$export$48d1ea6320830260(props.onKeyDown),
		onKeyUp: $93925083ecbb358c$export$48d1ea6320830260(props.onKeyUp)
	} };
}

//#endregion
//#region ../../node_modules/.pnpm/@react-aria+interactions@3.25.6_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/@react-aria/interactions/dist/useFocusable.mjs
let $f645667febf57a63$export$f9762fab77588ecb = /* @__PURE__ */ import_react.createContext(null);
function $f645667febf57a63$var$useFocusableContext(ref) {
	let context = (0, import_react.useContext)($f645667febf57a63$export$f9762fab77588ecb) || {};
	$e7801be82b4b2a53$export$4debdb1a3f0fa79e(context, ref);
	let { ref: _,...otherProps } = context;
	return otherProps;
}
function $f645667febf57a63$export$4c014de7c8940b4c(props, domRef) {
	let { focusProps } = $a1ea59d68270f0dd$export$f8168d8dd8fd66e6(props);
	let { keyboardProps } = $46d819fcbaf35654$export$8f71654801c2f7cd(props);
	let interactions = $3ef42575df84b30b$export$9d1611c77c2fe928(focusProps, keyboardProps);
	let domProps = $f645667febf57a63$var$useFocusableContext(domRef);
	let interactionProps = props.isDisabled ? {} : domProps;
	let autoFocusRef = (0, import_react.useRef)(props.autoFocus);
	(0, import_react.useEffect)(() => {
		if (autoFocusRef.current && domRef.current) $3ad3f6e1647bc98d$export$80f3e147d781571c(domRef.current);
		autoFocusRef.current = false;
	}, [domRef]);
	let tabIndex = props.excludeFromTabOrder ? -1 : 0;
	if (props.isDisabled) tabIndex = void 0;
	return { focusableProps: $3ef42575df84b30b$export$9d1611c77c2fe928({
		...interactions,
		tabIndex
	}, interactionProps) };
}

//#endregion
//#region ../../node_modules/.pnpm/@react-aria+interactions@3.25.6_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/@react-aria/interactions/dist/useHover.mjs
let $6179b936705e76d3$var$globalIgnoreEmulatedMouseEvents = false;
let $6179b936705e76d3$var$hoverCount = 0;
function $6179b936705e76d3$var$setGlobalIgnoreEmulatedMouseEvents() {
	$6179b936705e76d3$var$globalIgnoreEmulatedMouseEvents = true;
	setTimeout(() => {
		$6179b936705e76d3$var$globalIgnoreEmulatedMouseEvents = false;
	}, 50);
}
function $6179b936705e76d3$var$handleGlobalPointerEvent(e) {
	if (e.pointerType === "touch") $6179b936705e76d3$var$setGlobalIgnoreEmulatedMouseEvents();
}
function $6179b936705e76d3$var$setupGlobalTouchEvents() {
	if (typeof document === "undefined") return;
	if ($6179b936705e76d3$var$hoverCount === 0) {
		if (typeof PointerEvent !== "undefined") document.addEventListener("pointerup", $6179b936705e76d3$var$handleGlobalPointerEvent);
		else if (process.env.NODE_ENV === "test") document.addEventListener("touchend", $6179b936705e76d3$var$setGlobalIgnoreEmulatedMouseEvents);
	}
	$6179b936705e76d3$var$hoverCount++;
	return () => {
		$6179b936705e76d3$var$hoverCount--;
		if ($6179b936705e76d3$var$hoverCount > 0) return;
		if (typeof PointerEvent !== "undefined") document.removeEventListener("pointerup", $6179b936705e76d3$var$handleGlobalPointerEvent);
		else if (process.env.NODE_ENV === "test") document.removeEventListener("touchend", $6179b936705e76d3$var$setGlobalIgnoreEmulatedMouseEvents);
	};
}
function $6179b936705e76d3$export$ae780daf29e6d456(props) {
	let { onHoverStart, onHoverChange, onHoverEnd, isDisabled } = props;
	let [isHovered, setHovered] = (0, import_react.useState)(false);
	let state = (0, import_react.useRef)({
		isHovered: false,
		ignoreEmulatedMouseEvents: false,
		pointerType: "",
		target: null
	}).current;
	(0, import_react.useEffect)($6179b936705e76d3$var$setupGlobalTouchEvents, []);
	let { addGlobalListener, removeAllGlobalListeners } = $03deb23ff14920c4$export$4eaf04e54aa8eed6();
	let { hoverProps, triggerHoverEnd } = (0, import_react.useMemo)(() => {
		let triggerHoverStart = (event, pointerType) => {
			state.pointerType = pointerType;
			if (isDisabled || pointerType === "touch" || state.isHovered || !event.currentTarget.contains(event.target)) return;
			state.isHovered = true;
			let target = event.currentTarget;
			state.target = target;
			addGlobalListener($431fbd86ca7dc216$export$b204af158042fbac(event.target), "pointerover", (e) => {
				if (state.isHovered && state.target && !$d4ee10de306f2510$export$4282f70798064fe0(state.target, e.target)) triggerHoverEnd$1(e, e.pointerType);
			}, { capture: true });
			if (onHoverStart) onHoverStart({
				type: "hoverstart",
				target,
				pointerType
			});
			if (onHoverChange) onHoverChange(true);
			setHovered(true);
		};
		let triggerHoverEnd$1 = (event, pointerType) => {
			let target = state.target;
			state.pointerType = "";
			state.target = null;
			if (pointerType === "touch" || !state.isHovered || !target) return;
			state.isHovered = false;
			removeAllGlobalListeners();
			if (onHoverEnd) onHoverEnd({
				type: "hoverend",
				target,
				pointerType
			});
			if (onHoverChange) onHoverChange(false);
			setHovered(false);
		};
		let hoverProps$1 = {};
		if (typeof PointerEvent !== "undefined") {
			hoverProps$1.onPointerEnter = (e) => {
				if ($6179b936705e76d3$var$globalIgnoreEmulatedMouseEvents && e.pointerType === "mouse") return;
				triggerHoverStart(e, e.pointerType);
			};
			hoverProps$1.onPointerLeave = (e) => {
				if (!isDisabled && e.currentTarget.contains(e.target)) triggerHoverEnd$1(e, e.pointerType);
			};
		} else if (process.env.NODE_ENV === "test") {
			hoverProps$1.onTouchStart = () => {
				state.ignoreEmulatedMouseEvents = true;
			};
			hoverProps$1.onMouseEnter = (e) => {
				if (!state.ignoreEmulatedMouseEvents && !$6179b936705e76d3$var$globalIgnoreEmulatedMouseEvents) triggerHoverStart(e, "mouse");
				state.ignoreEmulatedMouseEvents = false;
			};
			hoverProps$1.onMouseLeave = (e) => {
				if (!isDisabled && e.currentTarget.contains(e.target)) triggerHoverEnd$1(e, "mouse");
			};
		}
		return {
			hoverProps: hoverProps$1,
			triggerHoverEnd: triggerHoverEnd$1
		};
	}, [
		onHoverStart,
		onHoverChange,
		onHoverEnd,
		isDisabled,
		state,
		addGlobalListener,
		removeAllGlobalListeners
	]);
	(0, import_react.useEffect)(() => {
		if (isDisabled) triggerHoverEnd({ currentTarget: state.target }, state.pointerType);
	}, [isDisabled]);
	return {
		hoverProps,
		isHovered
	};
}

//#endregion
//#region ../../node_modules/.pnpm/@heroui+theme@2.4.23_tailwindcss@4.1.14/node_modules/@heroui/theme/dist/chunk-SCJBZBCG.mjs
var spinner = tv({
	slots: {
		base: "relative inline-flex flex-col gap-2 items-center justify-center",
		wrapper: "relative flex",
		label: "text-foreground dark:text-foreground-dark font-regular",
		circle1: "absolute w-full h-full rounded-full",
		circle2: "absolute w-full h-full rounded-full",
		dots: "relative rounded-full mx-auto",
		spinnerBars: [
			"absolute",
			"animate-fade-out",
			"rounded-full",
			"w-[25%]",
			"h-[8%]",
			"left-[calc(37.5%)]",
			"top-[calc(46%)]",
			"spinner-bar-animation"
		]
	},
	variants: {
		size: {
			sm: {
				wrapper: "w-5 h-5",
				circle1: "border-2",
				circle2: "border-2",
				dots: "size-1",
				label: "text-small"
			},
			md: {
				wrapper: "w-8 h-8",
				circle1: "border-3",
				circle2: "border-3",
				dots: "size-1.5",
				label: "text-medium"
			},
			lg: {
				wrapper: "w-10 h-10",
				circle1: "border-3",
				circle2: "border-3",
				dots: "size-2",
				label: "text-large"
			}
		},
		color: {
			current: {
				circle1: "border-b-current",
				circle2: "border-b-current",
				dots: "bg-current",
				spinnerBars: "bg-current"
			},
			white: {
				circle1: "border-b-white",
				circle2: "border-b-white",
				dots: "bg-white",
				spinnerBars: "bg-white"
			},
			default: {
				circle1: "border-b-default",
				circle2: "border-b-default",
				dots: "bg-default",
				spinnerBars: "bg-default"
			},
			primary: {
				circle1: "border-b-primary",
				circle2: "border-b-primary",
				dots: "bg-primary",
				spinnerBars: "bg-primary"
			},
			secondary: {
				circle1: "border-b-secondary",
				circle2: "border-b-secondary",
				dots: "bg-secondary",
				spinnerBars: "bg-secondary"
			},
			success: {
				circle1: "border-b-success",
				circle2: "border-b-success",
				dots: "bg-success",
				spinnerBars: "bg-success"
			},
			warning: {
				circle1: "border-b-warning",
				circle2: "border-b-warning",
				dots: "bg-warning",
				spinnerBars: "bg-warning"
			},
			danger: {
				circle1: "border-b-danger",
				circle2: "border-b-danger",
				dots: "bg-danger",
				spinnerBars: "bg-danger"
			}
		},
		labelColor: {
			foreground: { label: "text-foreground" },
			primary: { label: "text-primary" },
			secondary: { label: "text-secondary" },
			success: { label: "text-success" },
			warning: { label: "text-warning" },
			danger: { label: "text-danger" }
		},
		variant: {
			default: {
				circle1: [
					"animate-spinner-ease-spin",
					"border-solid",
					"border-t-transparent",
					"border-l-transparent",
					"border-r-transparent"
				],
				circle2: [
					"opacity-75",
					"animate-spinner-linear-spin",
					"border-dotted",
					"border-t-transparent",
					"border-l-transparent",
					"border-r-transparent"
				]
			},
			gradient: {
				circle1: [
					"border-0",
					"bg-gradient-to-b",
					"from-transparent",
					"via-transparent",
					"to-primary",
					"animate-spinner-linear-spin",
					"[animation-duration:1s]",
					"[-webkit-mask:radial-gradient(closest-side,rgba(0,0,0,0.0)calc(100%-3px),rgba(0,0,0,1)calc(100%-3px))]"
				],
				circle2: ["hidden"]
			},
			wave: {
				wrapper: "translate-y-3/4",
				dots: ["animate-sway", "spinner-dot-animation"]
			},
			dots: {
				wrapper: "translate-y-2/4",
				dots: ["animate-blink", "spinner-dot-blink-animation"]
			},
			spinner: {},
			simple: {
				wrapper: "text-foreground h-5 w-5 animate-spin",
				circle1: "opacity-25",
				circle2: "opacity-75"
			}
		}
	},
	defaultVariants: {
		size: "md",
		color: "primary",
		labelColor: "foreground",
		variant: "default"
	},
	compoundVariants: [
		{
			variant: "gradient",
			color: "current",
			class: { circle1: "to-current" }
		},
		{
			variant: "gradient",
			color: "white",
			class: { circle1: "to-white" }
		},
		{
			variant: "gradient",
			color: "default",
			class: { circle1: "to-default" }
		},
		{
			variant: "gradient",
			color: "primary",
			class: { circle1: "to-primary" }
		},
		{
			variant: "gradient",
			color: "secondary",
			class: { circle1: "to-secondary" }
		},
		{
			variant: "gradient",
			color: "success",
			class: { circle1: "to-success" }
		},
		{
			variant: "gradient",
			color: "warning",
			class: { circle1: "to-warning" }
		},
		{
			variant: "gradient",
			color: "danger",
			class: { circle1: "to-danger" }
		},
		{
			variant: "wave",
			size: "sm",
			class: { wrapper: "w-5 h-5" }
		},
		{
			variant: "wave",
			size: "md",
			class: { wrapper: "w-8 h-8" }
		},
		{
			variant: "wave",
			size: "lg",
			class: { wrapper: "w-12 h-12" }
		},
		{
			variant: "dots",
			size: "sm",
			class: { wrapper: "w-5 h-5" }
		},
		{
			variant: "dots",
			size: "md",
			class: { wrapper: "w-8 h-8" }
		},
		{
			variant: "dots",
			size: "lg",
			class: { wrapper: "w-12 h-12" }
		},
		{
			variant: "simple",
			size: "sm",
			class: { wrapper: "w-5 h-5" }
		},
		{
			variant: "simple",
			size: "md",
			class: { wrapper: "w-8 h-8" }
		},
		{
			variant: "simple",
			size: "lg",
			class: { wrapper: "w-12 h-12" }
		},
		{
			variant: "simple",
			color: "current",
			class: { wrapper: "text-current" }
		},
		{
			variant: "simple",
			color: "white",
			class: { wrapper: "text-white" }
		},
		{
			variant: "simple",
			color: "default",
			class: { wrapper: "text-default" }
		},
		{
			variant: "simple",
			color: "primary",
			class: { wrapper: "text-primary" }
		},
		{
			variant: "simple",
			color: "secondary",
			class: { wrapper: "text-secondary" }
		},
		{
			variant: "simple",
			color: "success",
			class: { wrapper: "text-success" }
		},
		{
			variant: "simple",
			color: "warning",
			class: { wrapper: "text-warning" }
		},
		{
			variant: "simple",
			color: "danger",
			class: { wrapper: "text-danger" }
		}
	]
});

//#endregion
//#region ../../node_modules/.pnpm/@heroui+theme@2.4.23_tailwindcss@4.1.14/node_modules/@heroui/theme/dist/chunk-ZQGNWTBN.mjs
var button = tv({
	base: [
		"z-0",
		"group",
		"relative",
		"inline-flex",
		"items-center",
		"justify-center",
		"box-border",
		"appearance-none",
		"outline-solid outline-transparent",
		"select-none",
		"whitespace-nowrap",
		"min-w-max",
		"font-normal",
		"subpixel-antialiased",
		"overflow-hidden",
		"tap-highlight-transparent",
		"transform-gpu data-[pressed=true]:scale-[0.97]",
		"cursor-pointer",
		...dataFocusVisibleClasses
	],
	variants: {
		variant: {
			solid: "",
			bordered: "border-medium bg-transparent",
			light: "bg-transparent",
			flat: "",
			faded: "border-medium",
			shadow: "",
			ghost: "border-medium bg-transparent"
		},
		size: {
			sm: "px-3 min-w-16 h-8 text-tiny gap-2 rounded-small",
			md: "px-4 min-w-20 h-10 text-small gap-2 rounded-medium",
			lg: "px-6 min-w-24 h-12 text-medium gap-3 rounded-large"
		},
		color: {
			default: "",
			primary: "",
			secondary: "",
			success: "",
			warning: "",
			danger: ""
		},
		radius: {
			none: "rounded-none",
			sm: "rounded-small",
			md: "rounded-medium",
			lg: "rounded-large",
			full: "rounded-full"
		},
		fullWidth: { true: "w-full" },
		isDisabled: { true: "opacity-disabled pointer-events-none" },
		isInGroup: { true: "[&:not(:first-child):not(:last-child)]:rounded-none" },
		isIconOnly: {
			true: "px-0 !gap-0",
			false: "[&>svg]:max-w-[theme(spacing.8)]"
		},
		disableAnimation: {
			true: "!transition-none data-[pressed=true]:scale-100",
			false: "transition-transform-colors-opacity motion-reduce:transition-none"
		}
	},
	defaultVariants: {
		size: "md",
		variant: "solid",
		color: "default",
		fullWidth: false,
		isDisabled: false,
		isInGroup: false
	},
	compoundVariants: [
		{
			variant: "solid",
			color: "default",
			class: colorVariants.solid.default
		},
		{
			variant: "solid",
			color: "primary",
			class: colorVariants.solid.primary
		},
		{
			variant: "solid",
			color: "secondary",
			class: colorVariants.solid.secondary
		},
		{
			variant: "solid",
			color: "success",
			class: colorVariants.solid.success
		},
		{
			variant: "solid",
			color: "warning",
			class: colorVariants.solid.warning
		},
		{
			variant: "solid",
			color: "danger",
			class: colorVariants.solid.danger
		},
		{
			variant: "shadow",
			color: "default",
			class: colorVariants.shadow.default
		},
		{
			variant: "shadow",
			color: "primary",
			class: colorVariants.shadow.primary
		},
		{
			variant: "shadow",
			color: "secondary",
			class: colorVariants.shadow.secondary
		},
		{
			variant: "shadow",
			color: "success",
			class: colorVariants.shadow.success
		},
		{
			variant: "shadow",
			color: "warning",
			class: colorVariants.shadow.warning
		},
		{
			variant: "shadow",
			color: "danger",
			class: colorVariants.shadow.danger
		},
		{
			variant: "bordered",
			color: "default",
			class: colorVariants.bordered.default
		},
		{
			variant: "bordered",
			color: "primary",
			class: colorVariants.bordered.primary
		},
		{
			variant: "bordered",
			color: "secondary",
			class: colorVariants.bordered.secondary
		},
		{
			variant: "bordered",
			color: "success",
			class: colorVariants.bordered.success
		},
		{
			variant: "bordered",
			color: "warning",
			class: colorVariants.bordered.warning
		},
		{
			variant: "bordered",
			color: "danger",
			class: colorVariants.bordered.danger
		},
		{
			variant: "flat",
			color: "default",
			class: colorVariants.flat.default
		},
		{
			variant: "flat",
			color: "primary",
			class: colorVariants.flat.primary
		},
		{
			variant: "flat",
			color: "secondary",
			class: colorVariants.flat.secondary
		},
		{
			variant: "flat",
			color: "success",
			class: colorVariants.flat.success
		},
		{
			variant: "flat",
			color: "warning",
			class: colorVariants.flat.warning
		},
		{
			variant: "flat",
			color: "danger",
			class: colorVariants.flat.danger
		},
		{
			variant: "faded",
			color: "default",
			class: colorVariants.faded.default
		},
		{
			variant: "faded",
			color: "primary",
			class: colorVariants.faded.primary
		},
		{
			variant: "faded",
			color: "secondary",
			class: colorVariants.faded.secondary
		},
		{
			variant: "faded",
			color: "success",
			class: colorVariants.faded.success
		},
		{
			variant: "faded",
			color: "warning",
			class: colorVariants.faded.warning
		},
		{
			variant: "faded",
			color: "danger",
			class: colorVariants.faded.danger
		},
		{
			variant: "light",
			color: "default",
			class: [colorVariants.light.default, "data-[hover=true]:bg-default/40"]
		},
		{
			variant: "light",
			color: "primary",
			class: [colorVariants.light.primary, "data-[hover=true]:bg-primary/20"]
		},
		{
			variant: "light",
			color: "secondary",
			class: [colorVariants.light.secondary, "data-[hover=true]:bg-secondary/20"]
		},
		{
			variant: "light",
			color: "success",
			class: [colorVariants.light.success, "data-[hover=true]:bg-success/20"]
		},
		{
			variant: "light",
			color: "warning",
			class: [colorVariants.light.warning, "data-[hover=true]:bg-warning/20"]
		},
		{
			variant: "light",
			color: "danger",
			class: [colorVariants.light.danger, "data-[hover=true]:bg-danger/20"]
		},
		{
			variant: "ghost",
			color: "default",
			class: [colorVariants.ghost.default, "data-[hover=true]:!bg-default"]
		},
		{
			variant: "ghost",
			color: "primary",
			class: [colorVariants.ghost.primary, "data-[hover=true]:!bg-primary data-[hover=true]:!text-primary-foreground"]
		},
		{
			variant: "ghost",
			color: "secondary",
			class: [colorVariants.ghost.secondary, "data-[hover=true]:!bg-secondary data-[hover=true]:!text-secondary-foreground"]
		},
		{
			variant: "ghost",
			color: "success",
			class: [colorVariants.ghost.success, "data-[hover=true]:!bg-success data-[hover=true]:!text-success-foreground"]
		},
		{
			variant: "ghost",
			color: "warning",
			class: [colorVariants.ghost.warning, "data-[hover=true]:!bg-warning data-[hover=true]:!text-warning-foreground"]
		},
		{
			variant: "ghost",
			color: "danger",
			class: [colorVariants.ghost.danger, "data-[hover=true]:!bg-danger data-[hover=true]:!text-danger-foreground"]
		},
		{
			isInGroup: true,
			class: "rounded-none first:rounded-s-medium last:rounded-e-medium"
		},
		{
			isInGroup: true,
			size: "sm",
			class: "rounded-none first:rounded-s-small last:rounded-e-small"
		},
		{
			isInGroup: true,
			size: "md",
			class: "rounded-none first:rounded-s-medium last:rounded-e-medium"
		},
		{
			isInGroup: true,
			size: "lg",
			class: "rounded-none first:rounded-s-large last:rounded-e-large"
		},
		{
			isInGroup: true,
			isRounded: true,
			class: "rounded-none first:rounded-s-full last:rounded-e-full"
		},
		{
			isInGroup: true,
			radius: "none",
			class: "rounded-none first:rounded-s-none last:rounded-e-none"
		},
		{
			isInGroup: true,
			radius: "sm",
			class: "rounded-none first:rounded-s-small last:rounded-e-small"
		},
		{
			isInGroup: true,
			radius: "md",
			class: "rounded-none first:rounded-s-medium last:rounded-e-medium"
		},
		{
			isInGroup: true,
			radius: "lg",
			class: "rounded-none first:rounded-s-large last:rounded-e-large"
		},
		{
			isInGroup: true,
			radius: "full",
			class: "rounded-none first:rounded-s-full last:rounded-e-full"
		},
		{
			isInGroup: true,
			variant: ["ghost", "bordered"],
			color: "default",
			className: collapseAdjacentVariantBorders.default
		},
		{
			isInGroup: true,
			variant: ["ghost", "bordered"],
			color: "primary",
			className: collapseAdjacentVariantBorders.primary
		},
		{
			isInGroup: true,
			variant: ["ghost", "bordered"],
			color: "secondary",
			className: collapseAdjacentVariantBorders.secondary
		},
		{
			isInGroup: true,
			variant: ["ghost", "bordered"],
			color: "success",
			className: collapseAdjacentVariantBorders.success
		},
		{
			isInGroup: true,
			variant: ["ghost", "bordered"],
			color: "warning",
			className: collapseAdjacentVariantBorders.warning
		},
		{
			isInGroup: true,
			variant: ["ghost", "bordered"],
			color: "danger",
			className: collapseAdjacentVariantBorders.danger
		},
		{
			isIconOnly: true,
			size: "sm",
			class: "min-w-8 w-8 h-8"
		},
		{
			isIconOnly: true,
			size: "md",
			class: "min-w-10 w-10 h-10"
		},
		{
			isIconOnly: true,
			size: "lg",
			class: "min-w-12 w-12 h-12"
		},
		{
			variant: [
				"solid",
				"faded",
				"flat",
				"bordered",
				"shadow"
			],
			class: "data-[hover=true]:opacity-hover"
		}
	]
});
var buttonGroup = tv({
	base: "inline-flex items-center justify-center h-auto",
	variants: { fullWidth: { true: "w-full" } },
	defaultVariants: { fullWidth: false }
});

//#endregion
//#region ../../node_modules/.pnpm/@heroui+button@2.2.27_@heroui+system@2.4.23_@heroui+theme@2.4.23_tailwindcss@4.1.14__framer-m_cscvstwoq6vxyqxh4sfdxh5fa4/node_modules/@heroui/button/dist/chunk-3SAWKTTV.mjs
var [ButtonGroupProvider, useButtonGroupContext] = createContext2({
	name: "ButtonGroupContext",
	strict: false
});

//#endregion
//#region ../../node_modules/.pnpm/@heroui+use-aria-button@2.2.20_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/@heroui/use-aria-button/dist/index.mjs
function useAriaButton(props, ref) {
	let { elementType = "button", isDisabled, onPress, onPressStart, onPressEnd, onPressUp, onPressChange, preventFocusOnPress, allowFocusWhenDisabled, onClick, href, target, rel, type = "button", allowTextSelectionOnPress } = props;
	let additionalProps;
	if (elementType === "button") additionalProps = {
		type,
		disabled: isDisabled
	};
	else additionalProps = {
		role: "button",
		href: elementType === "a" && !isDisabled ? href : void 0,
		target: elementType === "a" ? target : void 0,
		type: elementType === "input" ? type : void 0,
		disabled: elementType === "input" ? isDisabled : void 0,
		"aria-disabled": !isDisabled || elementType === "input" ? void 0 : isDisabled,
		rel: elementType === "a" ? rel : void 0
	};
	let { pressProps, isPressed } = $f6c31cce2adf654f$export$45712eceda6fad21({
		onClick,
		onPressStart,
		onPressEnd,
		onPressUp,
		onPressChange,
		onPress,
		isDisabled,
		preventFocusOnPress,
		allowTextSelectionOnPress,
		ref
	});
	let { focusableProps } = $f645667febf57a63$export$4c014de7c8940b4c(props, ref);
	if (allowFocusWhenDisabled) focusableProps.tabIndex = isDisabled ? -1 : focusableProps.tabIndex;
	let buttonProps = $3ef42575df84b30b$export$9d1611c77c2fe928(focusableProps, pressProps, $65484d02dcb7eb3e$export$457c3d6518dd4c6f(props, { labelable: true }));
	return {
		isPressed,
		buttonProps: $3ef42575df84b30b$export$9d1611c77c2fe928(additionalProps, buttonProps, {
			"aria-haspopup": props["aria-haspopup"],
			"aria-expanded": props["aria-expanded"],
			"aria-controls": props["aria-controls"],
			"aria-pressed": props["aria-pressed"],
			"aria-current": props["aria-current"]
		})
	};
}

//#endregion
//#region ../../node_modules/.pnpm/@heroui+ripple@2.2.20_@heroui+system@2.4.23_@heroui+theme@2.4.23_tailwindcss@4.1.14__framer-m_i6esfs3m73ldzav3blog7u7s5q/node_modules/@heroui/ripple/dist/chunk-QHRCZSEO.mjs
var domAnimation = () => import("./dist-DD5NuRSk.js").then((res) => res.default);
var Ripple = (props) => {
	const { ripples = [], motionProps, color = "currentColor", style, onClear } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: ripples.map((ripple) => {
		const duration = clamp(.01 * ripple.size, .2, ripple.size > 100 ? .75 : .5);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LazyMotion, {
			features: domAnimation,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
				mode: "popLayout",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(m.span, {
					animate: {
						transform: "scale(2)",
						opacity: 0
					},
					className: "heroui-ripple",
					exit: { opacity: 0 },
					initial: {
						transform: "scale(0)",
						opacity: .35
					},
					style: {
						position: "absolute",
						backgroundColor: color,
						borderRadius: "100%",
						transformOrigin: "center",
						pointerEvents: "none",
						overflow: "hidden",
						inset: 0,
						zIndex: 0,
						top: ripple.y,
						left: ripple.x,
						width: `${ripple.size}px`,
						height: `${ripple.size}px`,
						...style
					},
					transition: { duration },
					onAnimationComplete: () => {
						onClear(ripple.key);
					},
					...motionProps
				})
			})
		}, ripple.key);
	}) });
};
Ripple.displayName = "HeroUI.Ripple";
var ripple_default = Ripple;

//#endregion
//#region ../../node_modules/.pnpm/@heroui+ripple@2.2.20_@heroui+system@2.4.23_@heroui+theme@2.4.23_tailwindcss@4.1.14__framer-m_i6esfs3m73ldzav3blog7u7s5q/node_modules/@heroui/ripple/dist/chunk-6VC6TS2O.mjs
function useRipple(props = {}) {
	const [ripples, setRipples] = (0, import_react.useState)([]);
	const onPress = (0, import_react.useCallback)((event) => {
		const trigger = event.target;
		const size = Math.max(trigger.clientWidth, trigger.clientHeight);
		setRipples((prevRipples) => [...prevRipples, {
			key: getUniqueID(prevRipples.length.toString()),
			size,
			x: event.x - size / 2,
			y: event.y - size / 2
		}]);
	}, []);
	return {
		ripples,
		onClear: (0, import_react.useCallback)((key) => {
			setRipples((prevState) => prevState.filter((ripple) => ripple.key !== key));
		}, []),
		onPress,
		...props
	};
}

//#endregion
//#region ../../node_modules/.pnpm/@heroui+button@2.2.27_@heroui+system@2.4.23_@heroui+theme@2.4.23_tailwindcss@4.1.14__framer-m_cscvstwoq6vxyqxh4sfdxh5fa4/node_modules/@heroui/button/dist/chunk-REKYGLAJ.mjs
function useButton(props) {
	var _a, _b, _c, _d, _e, _f, _g, _h, _i;
	const groupContext = useButtonGroupContext();
	const globalContext = useProviderContext();
	const isInGroup = !!groupContext;
	const { ref, as, children, startContent: startContentProp, endContent: endContentProp, autoFocus, className, spinner: spinner$1, isLoading = false, disableRipple: disableRippleProp = false, fullWidth = (_a = groupContext == null ? void 0 : groupContext.fullWidth) != null ? _a : false, radius = groupContext == null ? void 0 : groupContext.radius, size = (_b = groupContext == null ? void 0 : groupContext.size) != null ? _b : "md", color = (_c = groupContext == null ? void 0 : groupContext.color) != null ? _c : "default", variant = (_d = groupContext == null ? void 0 : groupContext.variant) != null ? _d : "solid", disableAnimation = (_f = (_e = groupContext == null ? void 0 : groupContext.disableAnimation) != null ? _e : globalContext == null ? void 0 : globalContext.disableAnimation) != null ? _f : false, isDisabled: isDisabledProp = (_g = groupContext == null ? void 0 : groupContext.isDisabled) != null ? _g : false, isIconOnly = (_h = groupContext == null ? void 0 : groupContext.isIconOnly) != null ? _h : false, spinnerPlacement = "start", onPress, onClick,...otherProps } = props;
	const Component = as || "button";
	const shouldFilterDOMProps = typeof Component === "string";
	const domRef = useDOMRef(ref);
	const disableRipple = (_i = disableRippleProp || (globalContext == null ? void 0 : globalContext.disableRipple)) != null ? _i : disableAnimation;
	const { isFocusVisible, isFocused, focusProps } = $f7dceffc5ad7768b$export$4e328f61c538687f({ autoFocus });
	const isDisabled = isDisabledProp || isLoading;
	const styles = (0, import_react.useMemo)(() => button({
		size,
		color,
		variant,
		radius,
		fullWidth,
		isDisabled,
		isInGroup,
		disableAnimation,
		isIconOnly,
		className
	}), [
		size,
		color,
		variant,
		radius,
		fullWidth,
		isDisabled,
		isInGroup,
		isIconOnly,
		disableAnimation,
		className
	]);
	const { onPress: onRipplePressHandler, onClear: onClearRipple, ripples } = useRipple();
	const { buttonProps: ariaButtonProps, isPressed } = useAriaButton({
		elementType: as,
		isDisabled,
		onPress: chain(onPress, (0, import_react.useCallback)((e) => {
			if (disableRipple || isDisabled || disableAnimation) return;
			domRef.current && onRipplePressHandler(e);
		}, [
			disableRipple,
			isDisabled,
			disableAnimation,
			domRef,
			onRipplePressHandler
		])),
		onClick,
		...otherProps
	}, domRef);
	const { isHovered, hoverProps } = $6179b936705e76d3$export$ae780daf29e6d456({ isDisabled });
	const getButtonProps = (0, import_react.useCallback)((props2 = {}) => ({
		"data-disabled": dataAttr(isDisabled),
		"data-focus": dataAttr(isFocused),
		"data-pressed": dataAttr(isPressed),
		"data-focus-visible": dataAttr(isFocusVisible),
		"data-hover": dataAttr(isHovered),
		"data-loading": dataAttr(isLoading),
		...mergeProps(ariaButtonProps, focusProps, hoverProps, filterDOMProps(otherProps, { enabled: shouldFilterDOMProps }), filterDOMProps(props2)),
		className: styles
	}), [
		isLoading,
		isDisabled,
		isFocused,
		isPressed,
		shouldFilterDOMProps,
		isFocusVisible,
		isHovered,
		ariaButtonProps,
		focusProps,
		hoverProps,
		otherProps,
		styles
	]);
	const getIconClone = (icon) => (0, import_react.isValidElement)(icon) ? (0, import_react.cloneElement)(icon, {
		"aria-hidden": true,
		focusable: false
	}) : null;
	return {
		Component,
		children,
		domRef,
		spinner: spinner$1,
		styles,
		startContent: getIconClone(startContentProp),
		endContent: getIconClone(endContentProp),
		isLoading,
		spinnerPlacement,
		spinnerSize: (0, import_react.useMemo)(() => {
			return {
				sm: "sm",
				md: "sm",
				lg: "md"
			}[size];
		}, [size]),
		disableRipple,
		getButtonProps,
		getRippleProps: (0, import_react.useCallback)(() => ({
			ripples,
			onClear: onClearRipple
		}), [ripples, onClearRipple]),
		isIconOnly
	};
}

//#endregion
//#region ../../node_modules/.pnpm/@heroui+spinner@2.2.24_@heroui+theme@2.4.23_tailwindcss@4.1.14__framer-motion@12.23.22_react-_axtl4lztukaxww43wqwrjduwo4/node_modules/@heroui/spinner/dist/chunk-IKKYW34A.mjs
function useSpinner(originalProps) {
	var _a, _b;
	const [props, variantProps] = mapPropsVariants(originalProps, spinner.variantKeys);
	const globalContext = useProviderContext();
	const variant = (_b = (_a = originalProps == null ? void 0 : originalProps.variant) != null ? _a : globalContext == null ? void 0 : globalContext.spinnerVariant) != null ? _b : "default";
	const { children, className, classNames, label: labelProp,...otherProps } = props;
	const slots = (0, import_react.useMemo)(() => spinner({ ...variantProps }), [objectToDeps(variantProps)]);
	const baseStyles = clsx(classNames == null ? void 0 : classNames.base, className);
	const label = labelProp || children;
	const ariaLabel = (0, import_react.useMemo)(() => {
		if (label && typeof label === "string") return label;
		return !otherProps["aria-label"] ? "Loading" : "";
	}, [
		children,
		label,
		otherProps["aria-label"]
	]);
	return {
		label,
		slots,
		classNames,
		variant,
		getSpinnerProps: (0, import_react.useCallback)(() => ({
			"aria-label": ariaLabel,
			className: slots.base({ class: baseStyles }),
			...otherProps
		}), [
			ariaLabel,
			slots,
			baseStyles,
			otherProps
		])
	};
}

//#endregion
//#region ../../node_modules/.pnpm/@heroui+spinner@2.2.24_@heroui+theme@2.4.23_tailwindcss@4.1.14__framer-motion@12.23.22_react-_axtl4lztukaxww43wqwrjduwo4/node_modules/@heroui/spinner/dist/chunk-MSDKUXDP.mjs
var Spinner = forwardRef((props, ref) => {
	const { slots, classNames, label, variant, getSpinnerProps } = useSpinner({ ...props });
	if (variant === "wave" || variant === "dots") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref,
		...getSpinnerProps(),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: slots.wrapper({ class: classNames == null ? void 0 : classNames.wrapper }),
			children: [...new Array(3)].map((_, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {
				className: slots.dots({ class: classNames == null ? void 0 : classNames.dots }),
				style: { "--dot-index": index }
			}, `dot-${index}`))
		}), label && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: slots.label({ class: classNames == null ? void 0 : classNames.label }),
			children: label
		})]
	});
	if (variant === "simple") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref,
		...getSpinnerProps(),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			className: slots.wrapper({ class: classNames == null ? void 0 : classNames.wrapper }),
			fill: "none",
			viewBox: "0 0 24 24",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				className: slots.circle1({ class: classNames == null ? void 0 : classNames.circle1 }),
				cx: "12",
				cy: "12",
				r: "10",
				stroke: "currentColor",
				strokeWidth: "4"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				className: slots.circle2({ class: classNames == null ? void 0 : classNames.circle2 }),
				d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z",
				fill: "currentColor"
			})]
		}), label && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: slots.label({ class: classNames == null ? void 0 : classNames.label }),
			children: label
		})]
	});
	if (variant === "spinner") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref,
		...getSpinnerProps(),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: slots.wrapper({ class: classNames == null ? void 0 : classNames.wrapper }),
			children: [...new Array(12)].map((_, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {
				className: slots.spinnerBars({ class: classNames == null ? void 0 : classNames.spinnerBars }),
				style: { "--bar-index": index }
			}, `star-${index}`))
		}), label && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: slots.label({ class: classNames == null ? void 0 : classNames.label }),
			children: label
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref,
		...getSpinnerProps(),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: slots.wrapper({ class: classNames == null ? void 0 : classNames.wrapper }),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: slots.circle1({ class: classNames == null ? void 0 : classNames.circle1 }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: slots.circle2({ class: classNames == null ? void 0 : classNames.circle2 }) })]
		}), label && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: slots.label({ class: classNames == null ? void 0 : classNames.label }),
			children: label
		})]
	});
});
Spinner.displayName = "HeroUI.Spinner";
var spinner_default = Spinner;

//#endregion
//#region ../../node_modules/.pnpm/@heroui+button@2.2.27_@heroui+system@2.4.23_@heroui+theme@2.4.23_tailwindcss@4.1.14__framer-m_cscvstwoq6vxyqxh4sfdxh5fa4/node_modules/@heroui/button/dist/chunk-WBUKVQRU.mjs
var Button = forwardRef((props, ref) => {
	const { Component, domRef, children, spinnerSize, spinner: spinner$1 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(spinner_default, {
		color: "current",
		size: spinnerSize
	}), spinnerPlacement, startContent, endContent, isLoading, disableRipple, getButtonProps, getRippleProps, isIconOnly } = useButton({
		...props,
		ref
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Component, {
		ref: domRef,
		...getButtonProps(),
		children: [
			startContent,
			isLoading && spinnerPlacement === "start" && spinner$1,
			isLoading && isIconOnly ? null : children,
			isLoading && spinnerPlacement === "end" && spinner$1,
			endContent,
			!disableRipple && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ripple_default, { ...getRippleProps() })
		]
	});
});
Button.displayName = "HeroUI.Button";
var button_default = Button;

//#endregion
export { button_default };