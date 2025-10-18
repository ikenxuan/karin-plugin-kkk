//#region ../../node_modules/.pnpm/framer-motion@12.23.22_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/framer-motion/dist/es/utils/is-browser.mjs
const isBrowser = typeof window !== "undefined";

//#endregion
//#region ../../node_modules/.pnpm/motion-utils@12.23.6/node_modules/motion-utils/dist/es/clamp.mjs
const clamp = (min, max, v) => {
	if (v > max) return max;
	if (v < min) return min;
	return v;
};

//#endregion
//#region ../../node_modules/.pnpm/motion-utils@12.23.6/node_modules/motion-utils/dist/es/format-error-message.mjs
function formatErrorMessage(message, errorCode) {
	return errorCode ? `${message}. For more information and steps for solving, visit https://motion.dev/troubleshooting/${errorCode}` : message;
}

//#endregion
//#region ../../node_modules/.pnpm/motion-utils@12.23.6/node_modules/motion-utils/dist/es/errors.mjs
let warning = () => {};
let invariant = () => {};
if (process.env.NODE_ENV !== "production") {
	warning = (check, message, errorCode) => {
		if (!check && typeof console !== "undefined") console.warn(formatErrorMessage(message, errorCode));
	};
	invariant = (check, message, errorCode) => {
		if (!check) throw new Error(formatErrorMessage(message, errorCode));
	};
}

//#endregion
//#region ../../node_modules/.pnpm/motion-utils@12.23.6/node_modules/motion-utils/dist/es/is-object.mjs
function isObject(value) {
	return typeof value === "object" && value !== null;
}

//#endregion
//#region ../../node_modules/.pnpm/motion-utils@12.23.6/node_modules/motion-utils/dist/es/warn-once.mjs
const warned = /* @__PURE__ */ new Set();
function warnOnce(condition, message, errorCode) {
	if (condition || warned.has(message)) return;
	console.warn(formatErrorMessage(message, errorCode));
	warned.add(message);
}

//#endregion
//#region ../../node_modules/.pnpm/motion-dom@12.23.21/node_modules/motion-dom/dist/es/animation/utils/is-css-variable.mjs
const checkStringStartsWith = (token) => (key) => typeof key === "string" && key.startsWith(token);
const isCSSVariableName = /* @__PURE__ */ checkStringStartsWith("--");
const startsAsVariableToken = /* @__PURE__ */ checkStringStartsWith("var(--");
const isCSSVariableToken = (value) => {
	if (!startsAsVariableToken(value)) return false;
	return singleCssVariableRegex.test(value.split("/*")[0].trim());
};
const singleCssVariableRegex = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;

//#endregion
//#region ../../node_modules/.pnpm/motion-dom@12.23.21/node_modules/motion-dom/dist/es/value/types/numbers/index.mjs
const number = {
	test: (v) => typeof v === "number",
	parse: parseFloat,
	transform: (v) => v
};
const alpha = {
	...number,
	transform: (v) => clamp(0, 1, v)
};
const scale = {
	...number,
	default: 1
};

//#endregion
//#region ../../node_modules/.pnpm/motion-dom@12.23.21/node_modules/motion-dom/dist/es/value/types/numbers/units.mjs
const createUnitType = /* @__NO_SIDE_EFFECTS__ */ (unit) => ({
	test: (v) => typeof v === "string" && v.endsWith(unit) && v.split(" ").length === 1,
	parse: parseFloat,
	transform: (v) => `${v}${unit}`
});
const degrees = /* @__PURE__ */ createUnitType("deg");
const percent = /* @__PURE__ */ createUnitType("%");
const px = /* @__PURE__ */ createUnitType("px");
const vh = /* @__PURE__ */ createUnitType("vh");
const vw = /* @__PURE__ */ createUnitType("vw");
const progressPercentage = /* @__PURE__ */ (() => ({
	...percent,
	parse: (v) => percent.parse(v) / 100,
	transform: (v) => percent.transform(v * 100)
}))();

//#endregion
//#region ../../node_modules/.pnpm/motion-dom@12.23.21/node_modules/motion-dom/dist/es/render/utils/keys-transform.mjs
/**
* Generate a list of every possible transform key.
*/
const transformPropOrder = [
	"transformPerspective",
	"x",
	"y",
	"z",
	"translateX",
	"translateY",
	"translateZ",
	"scale",
	"scaleX",
	"scaleY",
	"rotate",
	"rotateX",
	"rotateY",
	"rotateZ",
	"skew",
	"skewX",
	"skewY"
];
/**
* A quick lookup for transform props.
*/
const transformProps = /* @__PURE__ */ (() => new Set(transformPropOrder))();

//#endregion
//#region ../../node_modules/.pnpm/motion-dom@12.23.21/node_modules/motion-dom/dist/es/value/types/int.mjs
const int = {
	...number,
	transform: Math.round
};

//#endregion
//#region ../../node_modules/.pnpm/motion-dom@12.23.21/node_modules/motion-dom/dist/es/value/types/maps/transform.mjs
const transformValueTypes = {
	rotate: degrees,
	rotateX: degrees,
	rotateY: degrees,
	rotateZ: degrees,
	scale,
	scaleX: scale,
	scaleY: scale,
	scaleZ: scale,
	skew: degrees,
	skewX: degrees,
	skewY: degrees,
	distance: px,
	translateX: px,
	translateY: px,
	translateZ: px,
	x: px,
	y: px,
	z: px,
	perspective: px,
	transformPerspective: px,
	opacity: alpha,
	originX: progressPercentage,
	originY: progressPercentage,
	originZ: px
};

//#endregion
//#region ../../node_modules/.pnpm/motion-dom@12.23.21/node_modules/motion-dom/dist/es/value/types/maps/number.mjs
const numberValueTypes = {
	borderWidth: px,
	borderTopWidth: px,
	borderRightWidth: px,
	borderBottomWidth: px,
	borderLeftWidth: px,
	borderRadius: px,
	radius: px,
	borderTopLeftRadius: px,
	borderTopRightRadius: px,
	borderBottomRightRadius: px,
	borderBottomLeftRadius: px,
	width: px,
	maxWidth: px,
	height: px,
	maxHeight: px,
	top: px,
	right: px,
	bottom: px,
	left: px,
	padding: px,
	paddingTop: px,
	paddingRight: px,
	paddingBottom: px,
	paddingLeft: px,
	margin: px,
	marginTop: px,
	marginRight: px,
	marginBottom: px,
	marginLeft: px,
	backgroundPositionX: px,
	backgroundPositionY: px,
	...transformValueTypes,
	zIndex: int,
	fillOpacity: alpha,
	strokeOpacity: alpha,
	numOctaves: int
};

//#endregion
//#region ../../node_modules/.pnpm/motion-dom@12.23.21/node_modules/motion-dom/dist/es/value/types/utils/get-as-type.mjs
/**
* Provided a value and a ValueType, returns the value as that value type.
*/
const getValueAsType = (value, type) => {
	return type && typeof value === "number" ? type.transform(value) : value;
};

//#endregion
//#region ../../node_modules/.pnpm/motion-dom@12.23.21/node_modules/motion-dom/dist/es/utils/is-html-element.mjs
/**
* Checks if an element is an HTML element in a way
* that works across iframes
*/
function isHTMLElement(element) {
	return isObject(element) && "offsetHeight" in element;
}

//#endregion
//#region ../../node_modules/.pnpm/motion-dom@12.23.21/node_modules/motion-dom/dist/es/value/utils/is-motion-value.mjs
const isMotionValue = (value) => Boolean(value && value.getVelocity);

//#endregion
//#region ../../node_modules/.pnpm/framer-motion@12.23.22_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/framer-motion/dist/es/motion/features/definitions.mjs
const featureProps = {
	animation: [
		"animate",
		"variants",
		"whileHover",
		"whileTap",
		"exit",
		"whileInView",
		"whileFocus",
		"whileDrag"
	],
	exit: ["exit"],
	drag: ["drag", "dragControls"],
	focus: ["whileFocus"],
	hover: [
		"whileHover",
		"onHoverStart",
		"onHoverEnd"
	],
	tap: [
		"whileTap",
		"onTap",
		"onTapStart",
		"onTapCancel"
	],
	pan: [
		"onPan",
		"onPanStart",
		"onPanSessionStart",
		"onPanEnd"
	],
	inView: [
		"whileInView",
		"onViewportEnter",
		"onViewportLeave"
	],
	layout: ["layout", "layoutId"]
};
const featureDefinitions = {};
for (const key in featureProps) featureDefinitions[key] = { isEnabled: (props) => featureProps[key].some((name) => !!props[name]) };

//#endregion
//#region ../../node_modules/.pnpm/framer-motion@12.23.22_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/framer-motion/dist/es/animation/utils/is-animation-controls.mjs
function isAnimationControls(v) {
	return v !== null && typeof v === "object" && typeof v.start === "function";
}

//#endregion
//#region ../../node_modules/.pnpm/framer-motion@12.23.22_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/framer-motion/dist/es/render/utils/is-variant-label.mjs
/**
* Decides if the supplied variable is variant label
*/
function isVariantLabel(v) {
	return typeof v === "string" || Array.isArray(v);
}

//#endregion
//#region ../../node_modules/.pnpm/framer-motion@12.23.22_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/framer-motion/dist/es/render/utils/variant-props.mjs
const variantPriorityOrder = [
	"animate",
	"whileInView",
	"whileFocus",
	"whileHover",
	"whileTap",
	"whileDrag",
	"exit"
];
const variantProps = ["initial", ...variantPriorityOrder];

//#endregion
//#region ../../node_modules/.pnpm/framer-motion@12.23.22_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/framer-motion/dist/es/render/utils/is-controlling-variants.mjs
function isControllingVariants(props) {
	return isAnimationControls(props.animate) || variantProps.some((name) => isVariantLabel(props[name]));
}
function isVariantNode(props) {
	return Boolean(isControllingVariants(props) || props.variants);
}

//#endregion
//#region ../../node_modules/.pnpm/framer-motion@12.23.22_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/framer-motion/dist/es/projection/styles/scale-correction.mjs
const scaleCorrectors = {};

//#endregion
//#region ../../node_modules/.pnpm/framer-motion@12.23.22_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/framer-motion/dist/es/motion/utils/is-forced-motion-value.mjs
function isForcedMotionValue(key, { layout, layoutId }) {
	return transformProps.has(key) || key.startsWith("origin") || (layout || layoutId !== void 0) && (!!scaleCorrectors[key] || key === "opacity");
}

//#endregion
//#region ../../node_modules/.pnpm/framer-motion@12.23.22_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/framer-motion/dist/es/render/html/utils/build-transform.mjs
const translateAlias = {
	x: "translateX",
	y: "translateY",
	z: "translateZ",
	transformPerspective: "perspective"
};
const numTransforms = transformPropOrder.length;
/**
* Build a CSS transform style from individual x/y/scale etc properties.
*
* This outputs with a default order of transforms/scales/rotations, this can be customised by
* providing a transformTemplate function.
*/
function buildTransform(latestValues, transform, transformTemplate) {
	let transformString = "";
	let transformIsDefault = true;
	/**
	* Loop over all possible transforms in order, adding the ones that
	* are present to the transform string.
	*/
	for (let i = 0; i < numTransforms; i++) {
		const key = transformPropOrder[i];
		const value = latestValues[key];
		if (value === void 0) continue;
		let valueIsDefault = true;
		if (typeof value === "number") valueIsDefault = value === (key.startsWith("scale") ? 1 : 0);
		else valueIsDefault = parseFloat(value) === 0;
		if (!valueIsDefault || transformTemplate) {
			const valueAsType = getValueAsType(value, numberValueTypes[key]);
			if (!valueIsDefault) {
				transformIsDefault = false;
				const transformName = translateAlias[key] || key;
				transformString += `${transformName}(${valueAsType}) `;
			}
			if (transformTemplate) transform[key] = valueAsType;
		}
	}
	transformString = transformString.trim();
	if (transformTemplate) transformString = transformTemplate(transform, transformIsDefault ? "" : transformString);
	else if (transformIsDefault) transformString = "none";
	return transformString;
}

//#endregion
//#region ../../node_modules/.pnpm/framer-motion@12.23.22_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/framer-motion/dist/es/render/html/utils/build-styles.mjs
function buildHTMLStyles(state, latestValues, transformTemplate) {
	const { style, vars, transformOrigin } = state;
	let hasTransform = false;
	let hasTransformOrigin = false;
	/**
	* Loop over all our latest animated values and decide whether to handle them
	* as a style or CSS variable.
	*
	* Transforms and transform origins are kept separately for further processing.
	*/
	for (const key in latestValues) {
		const value = latestValues[key];
		if (transformProps.has(key)) {
			hasTransform = true;
			continue;
		} else if (isCSSVariableName(key)) {
			vars[key] = value;
			continue;
		} else {
			const valueAsType = getValueAsType(value, numberValueTypes[key]);
			if (key.startsWith("origin")) {
				hasTransformOrigin = true;
				transformOrigin[key] = valueAsType;
			} else style[key] = valueAsType;
		}
	}
	if (!latestValues.transform) {
		if (hasTransform || transformTemplate) style.transform = buildTransform(latestValues, state.transform, transformTemplate);
		else if (style.transform)
 /**
		* If we have previously created a transform but currently don't have any,
		* reset transform style to none.
		*/
		style.transform = "none";
	}
	/**
	* Build a transformOrigin style. Uses the same defaults as the browser for
	* undefined origins.
	*/
	if (hasTransformOrigin) {
		const { originX = "50%", originY = "50%", originZ = 0 } = transformOrigin;
		style.transformOrigin = `${originX} ${originY} ${originZ}`;
	}
}

//#endregion
//#region ../../node_modules/.pnpm/framer-motion@12.23.22_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/framer-motion/dist/es/render/svg/utils/path.mjs
const dashKeys = {
	offset: "stroke-dashoffset",
	array: "stroke-dasharray"
};
const camelKeys = {
	offset: "strokeDashoffset",
	array: "strokeDasharray"
};
/**
* Build SVG path properties. Uses the path's measured length to convert
* our custom pathLength, pathSpacing and pathOffset into stroke-dashoffset
* and stroke-dasharray attributes.
*
* This function is mutative to reduce per-frame GC.
*/
function buildSVGPath(attrs, length, spacing = 1, offset = 0, useDashCase = true) {
	attrs.pathLength = 1;
	const keys = useDashCase ? dashKeys : camelKeys;
	attrs[keys.offset] = px.transform(-offset);
	const pathLength = px.transform(length);
	const pathSpacing = px.transform(spacing);
	attrs[keys.array] = `${pathLength} ${pathSpacing}`;
}

//#endregion
//#region ../../node_modules/.pnpm/framer-motion@12.23.22_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/framer-motion/dist/es/render/svg/utils/build-attrs.mjs
/**
* Build SVG visual attributes, like cx and style.transform
*/
function buildSVGAttrs(state, { attrX, attrY, attrScale, pathLength, pathSpacing = 1, pathOffset = 0,...latest }, isSVGTag$1, transformTemplate, styleProp) {
	buildHTMLStyles(state, latest, transformTemplate);
	/**
	* For svg tags we just want to make sure viewBox is animatable and treat all the styles
	* as normal HTML tags.
	*/
	if (isSVGTag$1) {
		if (state.style.viewBox) state.attrs.viewBox = state.style.viewBox;
		return;
	}
	state.attrs = state.style;
	state.style = {};
	const { attrs, style } = state;
	/**
	* However, we apply transforms as CSS transforms.
	* So if we detect a transform, transformOrigin we take it from attrs and copy it into style.
	*/
	if (attrs.transform) {
		style.transform = attrs.transform;
		delete attrs.transform;
	}
	if (style.transform || attrs.transformOrigin) {
		style.transformOrigin = attrs.transformOrigin ?? "50% 50%";
		delete attrs.transformOrigin;
	}
	if (style.transform) {
		/**
		* SVG's element transform-origin uses its own median as a reference.
		* Therefore, transformBox becomes a fill-box
		*/
		style.transformBox = styleProp?.transformBox ?? "fill-box";
		delete attrs.transformBox;
	}
	if (attrX !== void 0) attrs.x = attrX;
	if (attrY !== void 0) attrs.y = attrY;
	if (attrScale !== void 0) attrs.scale = attrScale;
	if (pathLength !== void 0) buildSVGPath(attrs, pathLength, pathSpacing, pathOffset, false);
}

//#endregion
//#region ../../node_modules/.pnpm/framer-motion@12.23.22_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/framer-motion/dist/es/render/svg/utils/is-svg-tag.mjs
const isSVGTag = (tag) => typeof tag === "string" && tag.toLowerCase() === "svg";

//#endregion
//#region ../../node_modules/.pnpm/framer-motion@12.23.22_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/framer-motion/dist/es/render/svg/lowercase-elements.mjs
/**
* We keep these listed separately as we use the lowercase tag names as part
* of the runtime bundle to detect SVG components
*/
const lowercaseSVGElements = [
	"animate",
	"circle",
	"defs",
	"desc",
	"ellipse",
	"g",
	"image",
	"line",
	"filter",
	"marker",
	"mask",
	"metadata",
	"path",
	"pattern",
	"polygon",
	"polyline",
	"rect",
	"stop",
	"switch",
	"symbol",
	"svg",
	"text",
	"tspan",
	"use",
	"view"
];

//#endregion
//#region ../../node_modules/.pnpm/framer-motion@12.23.22_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/framer-motion/dist/es/render/dom/utils/is-svg-component.mjs
function isSVGComponent(Component) {
	if (typeof Component !== "string" || Component.includes("-")) return false;
	else if (lowercaseSVGElements.indexOf(Component) > -1 || /[A-Z]/u.test(Component)) return true;
	return false;
}

//#endregion
//#region ../../node_modules/.pnpm/framer-motion@12.23.22_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/framer-motion/dist/es/render/utils/resolve-variants.mjs
function getValueState(visualElement) {
	const state = [{}, {}];
	visualElement?.values.forEach((value, key) => {
		state[0][key] = value.get();
		state[1][key] = value.getVelocity();
	});
	return state;
}
function resolveVariantFromProps(props, definition, custom, visualElement) {
	/**
	* If the variant definition is a function, resolve.
	*/
	if (typeof definition === "function") {
		const [current, velocity] = getValueState(visualElement);
		definition = definition(custom !== void 0 ? custom : props.custom, current, velocity);
	}
	/**
	* If the variant definition is a variant label, or
	* the function returned a variant label, resolve.
	*/
	if (typeof definition === "string") definition = props.variants && props.variants[definition];
	/**
	* At this point we've resolved both functions and variant labels,
	* but the resolved variant label might itself have been a function.
	* If so, resolve. This can only have returned a valid target object.
	*/
	if (typeof definition === "function") {
		const [current, velocity] = getValueState(visualElement);
		definition = definition(custom !== void 0 ? custom : props.custom, current, velocity);
	}
	return definition;
}

//#endregion
//#region ../../node_modules/.pnpm/framer-motion@12.23.22_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/framer-motion/dist/es/render/html/utils/scrape-motion-values.mjs
function scrapeMotionValuesFromProps(props, prevProps, visualElement) {
	const { style } = props;
	const newValues = {};
	for (const key in style) if (isMotionValue(style[key]) || prevProps.style && isMotionValue(prevProps.style[key]) || isForcedMotionValue(key, props) || visualElement?.getValue(key)?.liveStyle !== void 0) newValues[key] = style[key];
	return newValues;
}

//#endregion
//#region ../../node_modules/.pnpm/framer-motion@12.23.22_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/framer-motion/dist/es/render/svg/utils/scrape-motion-values.mjs
function scrapeMotionValuesFromProps$1(props, prevProps, visualElement) {
	const newValues = scrapeMotionValuesFromProps(props, prevProps, visualElement);
	for (const key in props) if (isMotionValue(props[key]) || isMotionValue(prevProps[key])) {
		const targetKey = transformPropOrder.indexOf(key) !== -1 ? "attr" + key.charAt(0).toUpperCase() + key.substring(1) : key;
		newValues[targetKey] = props[key];
	}
	return newValues;
}

//#endregion
//#region ../../node_modules/.pnpm/framer-motion@12.23.22_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/framer-motion/dist/es/render/dom/utils/camel-to-dash.mjs
/**
* Convert camelCase to dash-case properties.
*/
const camelToDash = (str) => str.replace(/([a-z])([A-Z])/gu, "$1-$2").toLowerCase();

//#endregion
//#region ../../node_modules/.pnpm/framer-motion@12.23.22_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/framer-motion/dist/es/animation/optimized-appear/data-id.mjs
const optimizedAppearDataId = "framerAppearId";
const optimizedAppearDataAttribute = "data-" + camelToDash(optimizedAppearDataId);

//#endregion
export { alpha, buildHTMLStyles, buildSVGAttrs, camelToDash, clamp, degrees, featureDefinitions, invariant, isAnimationControls, isBrowser, isCSSVariableName, isCSSVariableToken, isControllingVariants, isForcedMotionValue, isHTMLElement, isMotionValue, isSVGComponent, isSVGTag, isVariantLabel, isVariantNode, number, numberValueTypes, optimizedAppearDataAttribute, percent, px, resolveVariantFromProps, scrapeMotionValuesFromProps$1 as scrapeMotionValuesFromProps, scrapeMotionValuesFromProps as scrapeMotionValuesFromProps$1, transformPropOrder, transformProps, variantPriorityOrder, variantProps, vh, vw, warnOnce, warning };