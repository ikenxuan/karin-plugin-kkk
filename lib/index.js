import { __commonJS, __require, __toESM } from "./chunks/react-tSI5bnDQ.js";
import "./chunks/src-DwjIyIa6.js";
import { Client, Common, Config, createBilibiliRoutes, createDouyinRoutes, createKuaishouRoutes, getBilibiliDB, getBilibiliData, getDouyinDB, getDouyinData, logMiddleware, logger as logger$1, require_follow_redirects, require_src } from "./chunks/module-eOc7Zf1N.js";
import { Root } from "./root-BijQeroW.js";
import "./chunks/react-dom-DjLB5oxT.js";
import { webConfig } from "./chunks/web.config-XZ60cEhB.js";
import path from "node:path";
import fs from "node:fs";
import { app, authMiddleware, createBadRequestResponse, createNotFoundResponse, createServerErrorResponse, createSuccessResponse, getBot, logger, mkdirSync as mkdirSync$1 } from "node-karin";
import express from "node-karin/express";
import { karinPathBase } from "node-karin/root";
import axios from "node-karin/axios";
import template from "node-karin/template";
import crypto from "node:crypto";

//#region ../../node_modules/.pnpm/connect-history-api-fallback@2.0.0/node_modules/connect-history-api-fallback/lib/index.js
var require_lib$1 = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/connect-history-api-fallback@2.0.0/node_modules/connect-history-api-fallback/lib/index.js": ((exports, module) => {
	var url$4 = __require("url");
	exports = module.exports = function historyApiFallback(options) {
		options = options || {};
		var logger$2 = getLogger$1(options);
		return function(req, res, next) {
			var headers = req.headers;
			if (req.method !== "GET" && req.method !== "HEAD") {
				logger$2("Not rewriting", req.method, req.url, "because the method is not GET or HEAD.");
				return next();
			} else if (!headers || typeof headers.accept !== "string") {
				logger$2("Not rewriting", req.method, req.url, "because the client did not send an HTTP accept header.");
				return next();
			} else if (headers.accept.indexOf("application/json") === 0) {
				logger$2("Not rewriting", req.method, req.url, "because the client prefers JSON.");
				return next();
			} else if (!acceptsHtml(headers.accept, options)) {
				logger$2("Not rewriting", req.method, req.url, "because the client does not accept HTML.");
				return next();
			}
			var parsedUrl = url$4.parse(req.url);
			var rewriteTarget;
			options.rewrites = options.rewrites || [];
			for (var i = 0; i < options.rewrites.length; i++) {
				var rewrite = options.rewrites[i];
				var match = parsedUrl.pathname.match(rewrite.from);
				if (match !== null) {
					rewriteTarget = evaluateRewriteRule(parsedUrl, match, rewrite.to, req);
					if (rewriteTarget.charAt(0) !== "/") logger$2("We recommend using an absolute path for the rewrite target.", "Received a non-absolute rewrite target", rewriteTarget, "for URL", req.url);
					logger$2("Rewriting", req.method, req.url, "to", rewriteTarget);
					req.url = rewriteTarget;
					return next();
				}
			}
			var pathname = parsedUrl.pathname;
			if (pathname.lastIndexOf(".") > pathname.lastIndexOf("/") && options.disableDotRule !== true) {
				logger$2("Not rewriting", req.method, req.url, "because the path includes a dot (.) character.");
				return next();
			}
			rewriteTarget = options.index || "/index.html";
			logger$2("Rewriting", req.method, req.url, "to", rewriteTarget);
			req.url = rewriteTarget;
			next();
		};
	};
	function evaluateRewriteRule(parsedUrl, match, rule, req) {
		if (typeof rule === "string") return rule;
		else if (typeof rule !== "function") throw new Error("Rewrite rule can only be of type string or function.");
		return rule({
			parsedUrl,
			match,
			request: req
		});
	}
	function acceptsHtml(header, options) {
		options.htmlAcceptHeaders = options.htmlAcceptHeaders || ["text/html", "*/*"];
		for (var i = 0; i < options.htmlAcceptHeaders.length; i++) if (header.indexOf(options.htmlAcceptHeaders[i]) !== -1) return true;
		return false;
	}
	function getLogger$1(options) {
		if (options && options.logger) return options.logger;
		else if (options && options.verbose) return console.log.bind(console);
		return function() {};
	}
}) });

//#endregion
//#region ../../node_modules/.pnpm/object-assign@4.1.1/node_modules/object-assign/index.js
var require_object_assign = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/object-assign@4.1.1/node_modules/object-assign/index.js": ((exports, module) => {
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;
	function toObject(val) {
		if (val === null || val === void 0) throw new TypeError("Object.assign cannot be called with null or undefined");
		return Object(val);
	}
	function shouldUseNative() {
		try {
			if (!Object.assign) return false;
			var test1 = /* @__PURE__ */ new String("abc");
			test1[5] = "de";
			if (Object.getOwnPropertyNames(test1)[0] === "5") return false;
			var test2 = {};
			for (var i = 0; i < 10; i++) test2["_" + String.fromCharCode(i)] = i;
			if (Object.getOwnPropertyNames(test2).map(function(n) {
				return test2[n];
			}).join("") !== "0123456789") return false;
			var test3 = {};
			"abcdefghijklmnopqrst".split("").forEach(function(letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join("") !== "abcdefghijklmnopqrst") return false;
			return true;
		} catch (err) {
			return false;
		}
	}
	module.exports = shouldUseNative() ? Object.assign : function(target, source) {
		var from;
		var to = toObject(target);
		var symbols;
		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);
			for (var key in from) if (hasOwnProperty.call(from, key)) to[key] = from[key];
			if (getOwnPropertySymbols) {
				symbols = getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) if (propIsEnumerable.call(from, symbols[i])) to[symbols[i]] = from[symbols[i]];
			}
		}
		return to;
	};
}) });

//#endregion
//#region ../../node_modules/.pnpm/vary@1.1.2/node_modules/vary/index.js
var require_vary = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/vary@1.1.2/node_modules/vary/index.js": ((exports, module) => {
	/**
	* Module exports.
	*/
	module.exports = vary;
	module.exports.append = append$1;
	/**
	* RegExp to match field-name in RFC 7230 sec 3.2
	*
	* field-name    = token
	* token         = 1*tchar
	* tchar         = "!" / "#" / "$" / "%" / "&" / "'" / "*"
	*               / "+" / "-" / "." / "^" / "_" / "`" / "|" / "~"
	*               / DIGIT / ALPHA
	*               ; any VCHAR, except delimiters
	*/
	var FIELD_NAME_REGEXP = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/;
	/**
	* Append a field to a vary header.
	*
	* @param {String} header
	* @param {String|Array} field
	* @return {String}
	* @public
	*/
	function append$1(header, field) {
		if (typeof header !== "string") throw new TypeError("header argument is required");
		if (!field) throw new TypeError("field argument is required");
		var fields = !Array.isArray(field) ? parse$4(String(field)) : field;
		for (var j = 0; j < fields.length; j++) if (!FIELD_NAME_REGEXP.test(fields[j])) throw new TypeError("field argument contains an invalid header name");
		if (header === "*") return header;
		var val = header;
		var vals = parse$4(header.toLowerCase());
		if (fields.indexOf("*") !== -1 || vals.indexOf("*") !== -1) return "*";
		for (var i = 0; i < fields.length; i++) {
			var fld = fields[i].toLowerCase();
			if (vals.indexOf(fld) === -1) {
				vals.push(fld);
				val = val ? val + ", " + fields[i] : fields[i];
			}
		}
		return val;
	}
	/**
	* Parse a vary header into an array.
	*
	* @param {String} header
	* @return {Array}
	* @private
	*/
	function parse$4(header) {
		var end = 0;
		var list = [];
		var start = 0;
		for (var i = 0, len = header.length; i < len; i++) switch (header.charCodeAt(i)) {
			case 32:
				if (start === end) start = end = i + 1;
				break;
			case 44:
				list.push(header.substring(start, end));
				start = end = i + 1;
				break;
			default:
				end = i + 1;
				break;
		}
		list.push(header.substring(start, end));
		return list;
	}
	/**
	* Mark that a request is varied on a header field.
	*
	* @param {Object} res
	* @param {String|Array} field
	* @public
	*/
	function vary(res, field) {
		if (!res || !res.getHeader || !res.setHeader) throw new TypeError("res argument is required");
		var val = res.getHeader("Vary") || "";
		if (val = append$1(Array.isArray(val) ? val.join(", ") : String(val), field)) res.setHeader("Vary", val);
	}
}) });

//#endregion
//#region ../../node_modules/.pnpm/cors@2.8.5/node_modules/cors/lib/index.js
var require_lib = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/cors@2.8.5/node_modules/cors/lib/index.js": ((exports, module) => {
	(function() {
		var assign = require_object_assign();
		var vary$1 = require_vary();
		var defaults = {
			origin: "*",
			methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
			preflightContinue: false,
			optionsSuccessStatus: 204
		};
		function isString(s) {
			return typeof s === "string" || s instanceof String;
		}
		function isOriginAllowed(origin, allowedOrigin) {
			if (Array.isArray(allowedOrigin)) {
				for (var i = 0; i < allowedOrigin.length; ++i) if (isOriginAllowed(origin, allowedOrigin[i])) return true;
				return false;
			} else if (isString(allowedOrigin)) return origin === allowedOrigin;
			else if (allowedOrigin instanceof RegExp) return allowedOrigin.test(origin);
			else return !!allowedOrigin;
		}
		function configureOrigin(options, req) {
			var requestOrigin = req.headers.origin, headers = [], isAllowed;
			if (!options.origin || options.origin === "*") headers.push([{
				key: "Access-Control-Allow-Origin",
				value: "*"
			}]);
			else if (isString(options.origin)) {
				headers.push([{
					key: "Access-Control-Allow-Origin",
					value: options.origin
				}]);
				headers.push([{
					key: "Vary",
					value: "Origin"
				}]);
			} else {
				isAllowed = isOriginAllowed(requestOrigin, options.origin);
				headers.push([{
					key: "Access-Control-Allow-Origin",
					value: isAllowed ? requestOrigin : false
				}]);
				headers.push([{
					key: "Vary",
					value: "Origin"
				}]);
			}
			return headers;
		}
		function configureMethods(options) {
			var methods = options.methods;
			if (methods.join) methods = options.methods.join(",");
			return {
				key: "Access-Control-Allow-Methods",
				value: methods
			};
		}
		function configureCredentials(options) {
			if (options.credentials === true) return {
				key: "Access-Control-Allow-Credentials",
				value: "true"
			};
			return null;
		}
		function configureAllowedHeaders(options, req) {
			var allowedHeaders = options.allowedHeaders || options.headers;
			var headers = [];
			if (!allowedHeaders) {
				allowedHeaders = req.headers["access-control-request-headers"];
				headers.push([{
					key: "Vary",
					value: "Access-Control-Request-Headers"
				}]);
			} else if (allowedHeaders.join) allowedHeaders = allowedHeaders.join(",");
			if (allowedHeaders && allowedHeaders.length) headers.push([{
				key: "Access-Control-Allow-Headers",
				value: allowedHeaders
			}]);
			return headers;
		}
		function configureExposedHeaders(options) {
			var headers = options.exposedHeaders;
			if (!headers) return null;
			else if (headers.join) headers = headers.join(",");
			if (headers && headers.length) return {
				key: "Access-Control-Expose-Headers",
				value: headers
			};
			return null;
		}
		function configureMaxAge(options) {
			var maxAge = (typeof options.maxAge === "number" || options.maxAge) && options.maxAge.toString();
			if (maxAge && maxAge.length) return {
				key: "Access-Control-Max-Age",
				value: maxAge
			};
			return null;
		}
		function applyHeaders(headers, res) {
			for (var i = 0, n = headers.length; i < n; i++) {
				var header = headers[i];
				if (header) {
					if (Array.isArray(header)) applyHeaders(header, res);
					else if (header.key === "Vary" && header.value) vary$1(res, header.value);
					else if (header.value) res.setHeader(header.key, header.value);
				}
			}
		}
		function cors(options, req, res, next) {
			var headers = [];
			if ((req.method && req.method.toUpperCase && req.method.toUpperCase()) === "OPTIONS") {
				headers.push(configureOrigin(options, req));
				headers.push(configureCredentials(options, req));
				headers.push(configureMethods(options, req));
				headers.push(configureAllowedHeaders(options, req));
				headers.push(configureMaxAge(options, req));
				headers.push(configureExposedHeaders(options, req));
				applyHeaders(headers, res);
				if (options.preflightContinue) next();
				else {
					res.statusCode = options.optionsSuccessStatus;
					res.setHeader("Content-Length", "0");
					res.end();
				}
			} else {
				headers.push(configureOrigin(options, req));
				headers.push(configureCredentials(options, req));
				headers.push(configureExposedHeaders(options, req));
				applyHeaders(headers, res);
				next();
			}
		}
		function middlewareWrapper(o) {
			var optionsCallback = null;
			if (typeof o === "function") optionsCallback = o;
			else optionsCallback = function(req, cb) {
				cb(null, o);
			};
			return function corsMiddleware(req, res, next) {
				optionsCallback(req, function(err, options) {
					if (err) next(err);
					else {
						var corsOptions = assign({}, defaults, options);
						var originCallback = null;
						if (corsOptions.origin && typeof corsOptions.origin === "function") originCallback = corsOptions.origin;
						else if (corsOptions.origin) originCallback = function(origin, cb) {
							cb(null, corsOptions.origin);
						};
						if (originCallback) originCallback(req.headers.origin, function(err2, origin) {
							if (err2 || !origin) next(err2);
							else {
								corsOptions.origin = origin;
								cors(corsOptions, req, res, next);
							}
						});
						else next();
					}
				});
			};
		}
		module.exports = middlewareWrapper;
	})();
}) });

//#endregion
//#region ../../node_modules/.pnpm/eventemitter3@4.0.7/node_modules/eventemitter3/index.js
var require_eventemitter3 = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/eventemitter3@4.0.7/node_modules/eventemitter3/index.js": ((exports, module) => {
	var has = Object.prototype.hasOwnProperty, prefix = "~";
	/**
	* Constructor to create a storage for our `EE` objects.
	* An `Events` instance is a plain object whose properties are event names.
	*
	* @constructor
	* @private
	*/
	function Events() {}
	if (Object.create) {
		Events.prototype = Object.create(null);
		if (!new Events().__proto__) prefix = false;
	}
	/**
	* Representation of a single event listener.
	*
	* @param {Function} fn The listener function.
	* @param {*} context The context to invoke the listener with.
	* @param {Boolean} [once=false] Specify if the listener is a one-time listener.
	* @constructor
	* @private
	*/
	function EE(fn, context, once) {
		this.fn = fn;
		this.context = context;
		this.once = once || false;
	}
	/**
	* Add a listener for a given event.
	*
	* @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
	* @param {(String|Symbol)} event The event name.
	* @param {Function} fn The listener function.
	* @param {*} context The context to invoke the listener with.
	* @param {Boolean} once Specify if the listener is a one-time listener.
	* @returns {EventEmitter}
	* @private
	*/
	function addListener(emitter, event, fn, context, once) {
		if (typeof fn !== "function") throw new TypeError("The listener must be a function");
		var listener = new EE(fn, context || emitter, once), evt = prefix ? prefix + event : event;
		if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
		else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
		else emitter._events[evt] = [emitter._events[evt], listener];
		return emitter;
	}
	/**
	* Clear event by name.
	*
	* @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
	* @param {(String|Symbol)} evt The Event name.
	* @private
	*/
	function clearEvent(emitter, evt) {
		if (--emitter._eventsCount === 0) emitter._events = new Events();
		else delete emitter._events[evt];
	}
	/**
	* Minimal `EventEmitter` interface that is molded against the Node.js
	* `EventEmitter` interface.
	*
	* @constructor
	* @public
	*/
	function EventEmitter() {
		this._events = new Events();
		this._eventsCount = 0;
	}
	/**
	* Return an array listing the events for which the emitter has registered
	* listeners.
	*
	* @returns {Array}
	* @public
	*/
	EventEmitter.prototype.eventNames = function eventNames() {
		var names = [], events, name;
		if (this._eventsCount === 0) return names;
		for (name in events = this._events) if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
		if (Object.getOwnPropertySymbols) return names.concat(Object.getOwnPropertySymbols(events));
		return names;
	};
	/**
	* Return the listeners registered for a given event.
	*
	* @param {(String|Symbol)} event The event name.
	* @returns {Array} The registered listeners.
	* @public
	*/
	EventEmitter.prototype.listeners = function listeners(event) {
		var evt = prefix ? prefix + event : event, handlers = this._events[evt];
		if (!handlers) return [];
		if (handlers.fn) return [handlers.fn];
		for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) ee[i] = handlers[i].fn;
		return ee;
	};
	/**
	* Return the number of listeners listening to a given event.
	*
	* @param {(String|Symbol)} event The event name.
	* @returns {Number} The number of listeners.
	* @public
	*/
	EventEmitter.prototype.listenerCount = function listenerCount(event) {
		var evt = prefix ? prefix + event : event, listeners = this._events[evt];
		if (!listeners) return 0;
		if (listeners.fn) return 1;
		return listeners.length;
	};
	/**
	* Calls each of the listeners registered for a given event.
	*
	* @param {(String|Symbol)} event The event name.
	* @returns {Boolean} `true` if the event had listeners, else `false`.
	* @public
	*/
	EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
		var evt = prefix ? prefix + event : event;
		if (!this._events[evt]) return false;
		var listeners = this._events[evt], len = arguments.length, args, i;
		if (listeners.fn) {
			if (listeners.once) this.removeListener(event, listeners.fn, void 0, true);
			switch (len) {
				case 1: return listeners.fn.call(listeners.context), true;
				case 2: return listeners.fn.call(listeners.context, a1), true;
				case 3: return listeners.fn.call(listeners.context, a1, a2), true;
				case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
				case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
				case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
			}
			for (i = 1, args = new Array(len - 1); i < len; i++) args[i - 1] = arguments[i];
			listeners.fn.apply(listeners.context, args);
		} else {
			var length = listeners.length, j;
			for (i = 0; i < length; i++) {
				if (listeners[i].once) this.removeListener(event, listeners[i].fn, void 0, true);
				switch (len) {
					case 1:
						listeners[i].fn.call(listeners[i].context);
						break;
					case 2:
						listeners[i].fn.call(listeners[i].context, a1);
						break;
					case 3:
						listeners[i].fn.call(listeners[i].context, a1, a2);
						break;
					case 4:
						listeners[i].fn.call(listeners[i].context, a1, a2, a3);
						break;
					default:
						if (!args) for (j = 1, args = new Array(len - 1); j < len; j++) args[j - 1] = arguments[j];
						listeners[i].fn.apply(listeners[i].context, args);
				}
			}
		}
		return true;
	};
	/**
	* Add a listener for a given event.
	*
	* @param {(String|Symbol)} event The event name.
	* @param {Function} fn The listener function.
	* @param {*} [context=this] The context to invoke the listener with.
	* @returns {EventEmitter} `this`.
	* @public
	*/
	EventEmitter.prototype.on = function on(event, fn, context) {
		return addListener(this, event, fn, context, false);
	};
	/**
	* Add a one-time listener for a given event.
	*
	* @param {(String|Symbol)} event The event name.
	* @param {Function} fn The listener function.
	* @param {*} [context=this] The context to invoke the listener with.
	* @returns {EventEmitter} `this`.
	* @public
	*/
	EventEmitter.prototype.once = function once(event, fn, context) {
		return addListener(this, event, fn, context, true);
	};
	/**
	* Remove the listeners of a given event.
	*
	* @param {(String|Symbol)} event The event name.
	* @param {Function} fn Only remove the listeners that match this function.
	* @param {*} context Only remove the listeners that have this context.
	* @param {Boolean} once Only remove one-time listeners.
	* @returns {EventEmitter} `this`.
	* @public
	*/
	EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
		var evt = prefix ? prefix + event : event;
		if (!this._events[evt]) return this;
		if (!fn) {
			clearEvent(this, evt);
			return this;
		}
		var listeners = this._events[evt];
		if (listeners.fn) {
			if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) clearEvent(this, evt);
		} else {
			for (var i = 0, events = [], length = listeners.length; i < length; i++) if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) events.push(listeners[i]);
			if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
			else clearEvent(this, evt);
		}
		return this;
	};
	/**
	* Remove all listeners, or those of the specified event.
	*
	* @param {(String|Symbol)} [event] The event name.
	* @returns {EventEmitter} `this`.
	* @public
	*/
	EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
		var evt;
		if (event) {
			evt = prefix ? prefix + event : event;
			if (this._events[evt]) clearEvent(this, evt);
		} else {
			this._events = new Events();
			this._eventsCount = 0;
		}
		return this;
	};
	EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
	EventEmitter.prototype.addListener = EventEmitter.prototype.on;
	EventEmitter.prefixed = prefix;
	EventEmitter.EventEmitter = EventEmitter;
	if ("undefined" !== typeof module) module.exports = EventEmitter;
}) });

//#endregion
//#region ../../node_modules/.pnpm/requires-port@1.0.0/node_modules/requires-port/index.js
var require_requires_port = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/requires-port@1.0.0/node_modules/requires-port/index.js": ((exports, module) => {
	/**
	* Check if we're required to add a port number.
	*
	* @see https://url.spec.whatwg.org/#default-port
	* @param {Number|String} port Port number we need to check
	* @param {String} protocol Protocol we need to check against.
	* @returns {Boolean} Is it a default port for the given protocol
	* @api private
	*/
	module.exports = function required$1(port, protocol) {
		protocol = protocol.split(":")[0];
		port = +port;
		if (!port) return false;
		switch (protocol) {
			case "http":
			case "ws": return port !== 80;
			case "https":
			case "wss": return port !== 443;
			case "ftp": return port !== 21;
			case "gopher": return port !== 70;
			case "file": return false;
		}
		return port !== 0;
	};
}) });

//#endregion
//#region ../../node_modules/.pnpm/http-proxy@1.18.1_debug@4.4.1/node_modules/http-proxy/lib/http-proxy/common.js
var require_common = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/http-proxy@1.18.1_debug@4.4.1/node_modules/http-proxy/lib/http-proxy/common.js": ((exports) => {
	var common$4 = exports, url$3 = __require("url"), extend$1 = __require("util")._extend, required = require_requires_port();
	var upgradeHeader = /(^|,)\s*upgrade\s*($|,)/i, isSSL = /^https|wss/;
	/**
	* Simple Regex for testing if protocol is https
	*/
	common$4.isSSL = isSSL;
	/**
	* Copies the right headers from `options` and `req` to
	* `outgoing` which is then used to fire the proxied
	* request.
	*
	* Examples:
	*
	*    common.setupOutgoing(outgoing, options, req)
	*    // => { host: ..., hostname: ...}
	*
	* @param {Object} Outgoing Base object to be filled with required properties
	* @param {Object} Options Config object passed to the proxy
	* @param {ClientRequest} Req Request Object
	* @param {String} Forward String to select forward or target
	* 
	* @return {Object} Outgoing Object with all required properties set
	*
	* @api private
	*/
	common$4.setupOutgoing = function(outgoing, options, req, forward) {
		outgoing.port = options[forward || "target"].port || (isSSL.test(options[forward || "target"].protocol) ? 443 : 80);
		[
			"host",
			"hostname",
			"socketPath",
			"pfx",
			"key",
			"passphrase",
			"cert",
			"ca",
			"ciphers",
			"secureProtocol"
		].forEach(function(e) {
			outgoing[e] = options[forward || "target"][e];
		});
		outgoing.method = options.method || req.method;
		outgoing.headers = extend$1({}, req.headers);
		if (options.headers) extend$1(outgoing.headers, options.headers);
		if (options.auth) outgoing.auth = options.auth;
		if (options.ca) outgoing.ca = options.ca;
		if (isSSL.test(options[forward || "target"].protocol)) outgoing.rejectUnauthorized = typeof options.secure === "undefined" ? true : options.secure;
		outgoing.agent = options.agent || false;
		outgoing.localAddress = options.localAddress;
		if (!outgoing.agent) {
			outgoing.headers = outgoing.headers || {};
			if (typeof outgoing.headers.connection !== "string" || !upgradeHeader.test(outgoing.headers.connection)) outgoing.headers.connection = "close";
		}
		var target = options[forward || "target"];
		var targetPath = target && options.prependPath !== false ? target.path || "" : "";
		var outgoingPath = !options.toProxy ? url$3.parse(req.url).path || "" : req.url;
		outgoingPath = !options.ignorePath ? outgoingPath : "";
		outgoing.path = common$4.urlJoin(targetPath, outgoingPath);
		if (options.changeOrigin) outgoing.headers.host = required(outgoing.port, options[forward || "target"].protocol) && !hasPort(outgoing.host) ? outgoing.host + ":" + outgoing.port : outgoing.host;
		return outgoing;
	};
	/**
	* Set the proper configuration for sockets,
	* set no delay and set keep alive, also set
	* the timeout to 0.
	*
	* Examples:
	*
	*    common.setupSocket(socket)
	*    // => Socket
	*
	* @param {Socket} Socket instance to setup
	* 
	* @return {Socket} Return the configured socket.
	*
	* @api private
	*/
	common$4.setupSocket = function(socket) {
		socket.setTimeout(0);
		socket.setNoDelay(true);
		socket.setKeepAlive(true, 0);
		return socket;
	};
	/**
	* Get the port number from the host. Or guess it based on the connection type.
	*
	* @param {Request} req Incoming HTTP request.
	*
	* @return {String} The port number.
	*
	* @api private
	*/
	common$4.getPort = function(req) {
		var res = req.headers.host ? req.headers.host.match(/:(\d+)/) : "";
		return res ? res[1] : common$4.hasEncryptedConnection(req) ? "443" : "80";
	};
	/**
	* Check if the request has an encrypted connection.
	*
	* @param {Request} req Incoming HTTP request.
	*
	* @return {Boolean} Whether the connection is encrypted or not.
	*
	* @api private
	*/
	common$4.hasEncryptedConnection = function(req) {
		return Boolean(req.connection.encrypted || req.connection.pair);
	};
	/**
	* OS-agnostic join (doesn't break on URLs like path.join does on Windows)>
	*
	* @return {String} The generated path.
	*
	* @api private
	*/
	common$4.urlJoin = function() {
		var args = Array.prototype.slice.call(arguments), lastIndex = args.length - 1, lastSegs = args[lastIndex].split("?"), retSegs;
		args[lastIndex] = lastSegs.shift();
		retSegs = [args.filter(Boolean).join("/").replace(/\/+/g, "/").replace("http:/", "http://").replace("https:/", "https://")];
		retSegs.push.apply(retSegs, lastSegs);
		return retSegs.join("?");
	};
	/**
	* Rewrites or removes the domain of a cookie header
	*
	* @param {String|Array} Header
	* @param {Object} Config, mapping of domain to rewritten domain.
	*                 '*' key to match any domain, null value to remove the domain.
	*
	* @api private
	*/
	common$4.rewriteCookieProperty = function rewriteCookieProperty(header, config$1, property) {
		if (Array.isArray(header)) return header.map(function(headerElement) {
			return rewriteCookieProperty(headerElement, config$1, property);
		});
		return header.replace(new RegExp("(;\\s*" + property + "=)([^;]+)", "i"), function(match, prefix$1, previousValue) {
			var newValue;
			if (previousValue in config$1) newValue = config$1[previousValue];
			else if ("*" in config$1) newValue = config$1["*"];
			else return match;
			if (newValue) return prefix$1 + newValue;
			else return "";
		});
	};
	/**
	* Check the host and see if it potentially has a port in it (keep it simple)
	*
	* @returns {Boolean} Whether we have one or not
	*
	* @api private
	*/
	function hasPort(host) {
		return !!~host.indexOf(":");
	}
}) });

//#endregion
//#region ../../node_modules/.pnpm/http-proxy@1.18.1_debug@4.4.1/node_modules/http-proxy/lib/http-proxy/passes/web-outgoing.js
var require_web_outgoing = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/http-proxy@1.18.1_debug@4.4.1/node_modules/http-proxy/lib/http-proxy/passes/web-outgoing.js": ((exports, module) => {
	var url$2 = __require("url"), common$3 = require_common();
	var redirectRegex = /^201|30(1|2|7|8)$/;
	/*!
	* Array of passes.
	*
	* A `pass` is just a function that is executed on `req, res, options`
	* so that you can easily add new checks while still keeping the base
	* flexible.
	*/
	module.exports = {
		removeChunked: function removeChunked(req, res, proxyRes) {
			if (req.httpVersion === "1.0") delete proxyRes.headers["transfer-encoding"];
		},
		setConnection: function setConnection(req, res, proxyRes) {
			if (req.httpVersion === "1.0") proxyRes.headers.connection = req.headers.connection || "close";
			else if (req.httpVersion !== "2.0" && !proxyRes.headers.connection) proxyRes.headers.connection = req.headers.connection || "keep-alive";
		},
		setRedirectHostRewrite: function setRedirectHostRewrite(req, res, proxyRes, options) {
			if ((options.hostRewrite || options.autoRewrite || options.protocolRewrite) && proxyRes.headers["location"] && redirectRegex.test(proxyRes.statusCode)) {
				var target = url$2.parse(options.target);
				var u = url$2.parse(proxyRes.headers["location"]);
				if (target.host != u.host) return;
				if (options.hostRewrite) u.host = options.hostRewrite;
				else if (options.autoRewrite) u.host = req.headers["host"];
				if (options.protocolRewrite) u.protocol = options.protocolRewrite;
				proxyRes.headers["location"] = u.format();
			}
		},
		writeHeaders: function writeHeaders(req, res, proxyRes, options) {
			var rewriteCookieDomainConfig = options.cookieDomainRewrite, rewriteCookiePathConfig = options.cookiePathRewrite, preserveHeaderKeyCase = options.preserveHeaderKeyCase, rawHeaderKeyMap, setHeader = function(key$1, header) {
				if (header == void 0) return;
				if (rewriteCookieDomainConfig && key$1.toLowerCase() === "set-cookie") header = common$3.rewriteCookieProperty(header, rewriteCookieDomainConfig, "domain");
				if (rewriteCookiePathConfig && key$1.toLowerCase() === "set-cookie") header = common$3.rewriteCookieProperty(header, rewriteCookiePathConfig, "path");
				res.setHeader(String(key$1).trim(), header);
			};
			if (typeof rewriteCookieDomainConfig === "string") rewriteCookieDomainConfig = { "*": rewriteCookieDomainConfig };
			if (typeof rewriteCookiePathConfig === "string") rewriteCookiePathConfig = { "*": rewriteCookiePathConfig };
			if (preserveHeaderKeyCase && proxyRes.rawHeaders != void 0) {
				rawHeaderKeyMap = {};
				for (var i = 0; i < proxyRes.rawHeaders.length; i += 2) {
					var key = proxyRes.rawHeaders[i];
					rawHeaderKeyMap[key.toLowerCase()] = key;
				}
			}
			Object.keys(proxyRes.headers).forEach(function(key$1) {
				var header = proxyRes.headers[key$1];
				if (preserveHeaderKeyCase && rawHeaderKeyMap) key$1 = rawHeaderKeyMap[key$1] || key$1;
				setHeader(key$1, header);
			});
		},
		writeStatusCode: function writeStatusCode(req, res, proxyRes) {
			if (proxyRes.statusMessage) {
				res.statusCode = proxyRes.statusCode;
				res.statusMessage = proxyRes.statusMessage;
			} else res.statusCode = proxyRes.statusCode;
		}
	};
}) });

//#endregion
//#region ../../node_modules/.pnpm/http-proxy@1.18.1_debug@4.4.1/node_modules/http-proxy/lib/http-proxy/passes/web-incoming.js
var require_web_incoming = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/http-proxy@1.18.1_debug@4.4.1/node_modules/http-proxy/lib/http-proxy/passes/web-incoming.js": ((exports, module) => {
	var httpNative = __require("http"), httpsNative = __require("https"), web_o = require_web_outgoing(), common$2 = require_common(), followRedirects = require_follow_redirects();
	web_o = Object.keys(web_o).map(function(pass) {
		return web_o[pass];
	});
	var nativeAgents = {
		http: httpNative,
		https: httpsNative
	};
	/*!
	* Array of passes.
	*
	* A `pass` is just a function that is executed on `req, res, options`
	* so that you can easily add new checks while still keeping the base
	* flexible.
	*/
	module.exports = {
		deleteLength: function deleteLength(req, res, options) {
			if ((req.method === "DELETE" || req.method === "OPTIONS") && !req.headers["content-length"]) {
				req.headers["content-length"] = "0";
				delete req.headers["transfer-encoding"];
			}
		},
		timeout: function timeout(req, res, options) {
			if (options.timeout) req.socket.setTimeout(options.timeout);
		},
		XHeaders: function XHeaders(req, res, options) {
			if (!options.xfwd) return;
			var encrypted = req.isSpdy || common$2.hasEncryptedConnection(req);
			var values = {
				for: req.connection.remoteAddress || req.socket.remoteAddress,
				port: common$2.getPort(req),
				proto: encrypted ? "https" : "http"
			};
			[
				"for",
				"port",
				"proto"
			].forEach(function(header) {
				req.headers["x-forwarded-" + header] = (req.headers["x-forwarded-" + header] || "") + (req.headers["x-forwarded-" + header] ? "," : "") + values[header];
			});
			req.headers["x-forwarded-host"] = req.headers["x-forwarded-host"] || req.headers["host"] || "";
		},
		stream: function stream(req, res, options, _, server$1, clb) {
			server$1.emit("start", req, res, options.target || options.forward);
			var agents = options.followRedirects ? followRedirects : nativeAgents;
			var http$2 = agents.http;
			var https$2 = agents.https;
			if (options.forward) {
				var forwardReq = (options.forward.protocol === "https:" ? https$2 : http$2).request(common$2.setupOutgoing(options.ssl || {}, options, req, "forward"));
				var forwardError = createErrorHandler(forwardReq, options.forward);
				req.on("error", forwardError);
				forwardReq.on("error", forwardError);
				(options.buffer || req).pipe(forwardReq);
				if (!options.target) return res.end();
			}
			var proxyReq = (options.target.protocol === "https:" ? https$2 : http$2).request(common$2.setupOutgoing(options.ssl || {}, options, req));
			proxyReq.on("socket", function(socket) {
				if (server$1 && !proxyReq.getHeader("expect")) server$1.emit("proxyReq", proxyReq, req, res, options);
			});
			if (options.proxyTimeout) proxyReq.setTimeout(options.proxyTimeout, function() {
				proxyReq.abort();
			});
			req.on("aborted", function() {
				proxyReq.abort();
			});
			var proxyError = createErrorHandler(proxyReq, options.target);
			req.on("error", proxyError);
			proxyReq.on("error", proxyError);
			function createErrorHandler(proxyReq$1, url$5) {
				return function proxyError$1(err) {
					if (req.socket.destroyed && err.code === "ECONNRESET") {
						server$1.emit("econnreset", err, req, res, url$5);
						return proxyReq$1.abort();
					}
					if (clb) clb(err, req, res, url$5);
					else server$1.emit("error", err, req, res, url$5);
				};
			}
			(options.buffer || req).pipe(proxyReq);
			proxyReq.on("response", function(proxyRes) {
				if (server$1) server$1.emit("proxyRes", proxyRes, req, res);
				if (!res.headersSent && !options.selfHandleResponse) {
					for (var i = 0; i < web_o.length; i++) if (web_o[i](req, res, proxyRes, options)) break;
				}
				if (!res.finished) {
					proxyRes.on("end", function() {
						if (server$1) server$1.emit("end", req, res, proxyRes);
					});
					if (!options.selfHandleResponse) proxyRes.pipe(res);
				} else if (server$1) server$1.emit("end", req, res, proxyRes);
			});
		}
	};
}) });

//#endregion
//#region ../../node_modules/.pnpm/http-proxy@1.18.1_debug@4.4.1/node_modules/http-proxy/lib/http-proxy/passes/ws-incoming.js
var require_ws_incoming = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/http-proxy@1.18.1_debug@4.4.1/node_modules/http-proxy/lib/http-proxy/passes/ws-incoming.js": ((exports, module) => {
	var http$1 = __require("http"), https$1 = __require("https"), common$1 = require_common();
	/*!
	* Array of passes.
	*
	* A `pass` is just a function that is executed on `req, socket, options`
	* so that you can easily add new checks while still keeping the base
	* flexible.
	*/
	module.exports = {
		checkMethodAndHeader: function checkMethodAndHeader(req, socket) {
			if (req.method !== "GET" || !req.headers.upgrade) {
				socket.destroy();
				return true;
			}
			if (req.headers.upgrade.toLowerCase() !== "websocket") {
				socket.destroy();
				return true;
			}
		},
		XHeaders: function XHeaders(req, socket, options) {
			if (!options.xfwd) return;
			var values = {
				for: req.connection.remoteAddress || req.socket.remoteAddress,
				port: common$1.getPort(req),
				proto: common$1.hasEncryptedConnection(req) ? "wss" : "ws"
			};
			[
				"for",
				"port",
				"proto"
			].forEach(function(header) {
				req.headers["x-forwarded-" + header] = (req.headers["x-forwarded-" + header] || "") + (req.headers["x-forwarded-" + header] ? "," : "") + values[header];
			});
		},
		stream: function stream(req, socket, options, head, server$1, clb) {
			var createHttpHeader = function(line, headers) {
				return Object.keys(headers).reduce(function(head$1, key) {
					var value = headers[key];
					if (!Array.isArray(value)) {
						head$1.push(key + ": " + value);
						return head$1;
					}
					for (var i = 0; i < value.length; i++) head$1.push(key + ": " + value[i]);
					return head$1;
				}, [line]).join("\r\n") + "\r\n\r\n";
			};
			common$1.setupSocket(socket);
			if (head && head.length) socket.unshift(head);
			var proxyReq = (common$1.isSSL.test(options.target.protocol) ? https$1 : http$1).request(common$1.setupOutgoing(options.ssl || {}, options, req));
			if (server$1) server$1.emit("proxyReqWs", proxyReq, req, socket, options, head);
			proxyReq.on("error", onOutgoingError);
			proxyReq.on("response", function(res) {
				if (!res.upgrade) {
					socket.write(createHttpHeader("HTTP/" + res.httpVersion + " " + res.statusCode + " " + res.statusMessage, res.headers));
					res.pipe(socket);
				}
			});
			proxyReq.on("upgrade", function(proxyRes, proxySocket, proxyHead) {
				proxySocket.on("error", onOutgoingError);
				proxySocket.on("end", function() {
					server$1.emit("close", proxyRes, proxySocket, proxyHead);
				});
				socket.on("error", function() {
					proxySocket.end();
				});
				common$1.setupSocket(proxySocket);
				if (proxyHead && proxyHead.length) proxySocket.unshift(proxyHead);
				socket.write(createHttpHeader("HTTP/1.1 101 Switching Protocols", proxyRes.headers));
				proxySocket.pipe(socket).pipe(proxySocket);
				server$1.emit("open", proxySocket);
				server$1.emit("proxySocket", proxySocket);
			});
			return proxyReq.end();
			function onOutgoingError(err) {
				if (clb) clb(err, req, socket);
				else server$1.emit("error", err, req, socket);
				socket.end();
			}
		}
	};
}) });

//#endregion
//#region ../../node_modules/.pnpm/http-proxy@1.18.1_debug@4.4.1/node_modules/http-proxy/lib/http-proxy/index.js
var require_http_proxy$2 = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/http-proxy@1.18.1_debug@4.4.1/node_modules/http-proxy/lib/http-proxy/index.js": ((exports, module) => {
	var httpProxy$1 = module.exports, extend = __require("util")._extend, parse_url = __require("url").parse, EE3 = require_eventemitter3(), http = __require("http"), https = __require("https"), web = require_web_incoming(), ws = require_ws_incoming();
	httpProxy$1.Server = ProxyServer$1;
	/**
	* Returns a function that creates the loader for
	* either `ws` or `web`'s  passes.
	*
	* Examples:
	*
	*    httpProxy.createRightProxy('ws')
	*    // => [Function]
	*
	* @param {String} Type Either 'ws' or 'web'
	* 
	* @return {Function} Loader Function that when called returns an iterator for the right passes
	*
	* @api private
	*/
	function createRightProxy(type) {
		return function(options) {
			return function(req, res) {
				var passes = type === "ws" ? this.wsPasses : this.webPasses, args = [].slice.call(arguments), cntr = args.length - 1, head, cbl;
				if (typeof args[cntr] === "function") {
					cbl = args[cntr];
					cntr--;
				}
				var requestOptions = options;
				if (!(args[cntr] instanceof Buffer) && args[cntr] !== res) {
					requestOptions = extend({}, options);
					extend(requestOptions, args[cntr]);
					cntr--;
				}
				if (args[cntr] instanceof Buffer) head = args[cntr];
				["target", "forward"].forEach(function(e) {
					if (typeof requestOptions[e] === "string") requestOptions[e] = parse_url(requestOptions[e]);
				});
				if (!requestOptions.target && !requestOptions.forward) return this.emit("error", /* @__PURE__ */ new Error("Must provide a proper URL as target"));
				for (var i = 0; i < passes.length; i++)
 /**
				* Call of passes functions
				* pass(req, res, options, head)
				*
				* In WebSockets case the `res` variable
				* refer to the connection socket
				* pass(req, socket, options, head)
				*/
				if (passes[i](req, res, requestOptions, head, this, cbl)) break;
			};
		};
	}
	httpProxy$1.createRightProxy = createRightProxy;
	function ProxyServer$1(options) {
		EE3.call(this);
		options = options || {};
		options.prependPath = options.prependPath === false ? false : true;
		this.web = this.proxyRequest = createRightProxy("web")(options);
		this.ws = this.proxyWebsocketRequest = createRightProxy("ws")(options);
		this.options = options;
		this.webPasses = Object.keys(web).map(function(pass) {
			return web[pass];
		});
		this.wsPasses = Object.keys(ws).map(function(pass) {
			return ws[pass];
		});
		this.on("error", this.onError, this);
	}
	__require("util").inherits(ProxyServer$1, EE3);
	ProxyServer$1.prototype.onError = function(err) {
		if (this.listeners("error").length === 1) throw err;
	};
	ProxyServer$1.prototype.listen = function(port, hostname) {
		var self = this, closure = function(req, res) {
			self.web(req, res);
		};
		this._server = this.options.ssl ? https.createServer(this.options.ssl, closure) : http.createServer(closure);
		if (this.options.ws) this._server.on("upgrade", function(req, socket, head) {
			self.ws(req, socket, head);
		});
		this._server.listen(port, hostname);
		return this;
	};
	ProxyServer$1.prototype.close = function(callback) {
		var self = this;
		if (this._server) this._server.close(done);
		function done() {
			self._server = null;
			if (callback) callback.apply(null, arguments);
		}
	};
	ProxyServer$1.prototype.before = function(type, passName, callback) {
		if (type !== "ws" && type !== "web") throw new Error("type must be `web` or `ws`");
		var passes = type === "ws" ? this.wsPasses : this.webPasses, i = false;
		passes.forEach(function(v, idx) {
			if (v.name === passName) i = idx;
		});
		if (i === false) throw new Error("No such pass");
		passes.splice(i, 0, callback);
	};
	ProxyServer$1.prototype.after = function(type, passName, callback) {
		if (type !== "ws" && type !== "web") throw new Error("type must be `web` or `ws`");
		var passes = type === "ws" ? this.wsPasses : this.webPasses, i = false;
		passes.forEach(function(v, idx) {
			if (v.name === passName) i = idx;
		});
		if (i === false) throw new Error("No such pass");
		passes.splice(i++, 0, callback);
	};
}) });

//#endregion
//#region ../../node_modules/.pnpm/http-proxy@1.18.1_debug@4.4.1/node_modules/http-proxy/lib/http-proxy.js
var require_http_proxy$1 = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/http-proxy@1.18.1_debug@4.4.1/node_modules/http-proxy/lib/http-proxy.js": ((exports, module) => {
	var ProxyServer = require_http_proxy$2().Server;
	/**
	* Creates the proxy server.
	*
	* Examples:
	*
	*    httpProxy.createProxyServer({ .. }, 8000)
	*    // => '{ web: [Function], ws: [Function] ... }'
	*
	* @param {Object} Options Config object passed to the proxy
	*
	* @return {Object} Proxy Proxy object with handlers for `ws` and `web` requests
	*
	* @api public
	*/
	function createProxyServer(options) {
		return new ProxyServer(options);
	}
	ProxyServer.createProxyServer = createProxyServer;
	ProxyServer.createServer = createProxyServer;
	ProxyServer.createProxy = createProxyServer;
	/**
	* Export the proxy "Server" as the main export.
	*/
	module.exports = ProxyServer;
}) });

//#endregion
//#region ../../node_modules/.pnpm/http-proxy@1.18.1_debug@4.4.1/node_modules/http-proxy/index.js
var require_http_proxy = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/http-proxy@1.18.1_debug@4.4.1/node_modules/http-proxy/index.js": ((exports, module) => {
	/*!
	* Caron dimonio, con occhi di bragia
	* loro accennando, tutte le raccoglie;
	* batte col remo qualunque s’adagia 
	*
	* Charon the demon, with the eyes of glede,
	* Beckoning to them, collects them all together,
	* Beats with his oar whoever lags behind
	*          
	*          Dante - The Divine Comedy (Canto III)
	*/
	module.exports = require_http_proxy$1();
}) });

//#endregion
//#region ../../node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/errors.js
var require_errors = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/errors.js": ((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var ERRORS;
	(function(ERRORS$1) {
		ERRORS$1["ERR_CONFIG_FACTORY_TARGET_MISSING"] = "[HPM] Missing \"target\" option. Example: {target: \"http://www.example.org\"}";
		ERRORS$1["ERR_CONTEXT_MATCHER_GENERIC"] = "[HPM] Invalid pathFilter. Expecting something like: \"/api\" or [\"/api\", \"/ajax\"]";
		ERRORS$1["ERR_CONTEXT_MATCHER_INVALID_ARRAY"] = "[HPM] Invalid pathFilter. Plain paths (e.g. \"/api\") can not be mixed with globs (e.g. \"/api/**\"). Expecting something like: [\"/api\", \"/ajax\"] or [\"/api/**\", \"!**.html\"].";
		ERRORS$1["ERR_PATH_REWRITER_CONFIG"] = "[HPM] Invalid pathRewrite config. Expecting object with pathRewrite config or a rewrite function";
	})(ERRORS || (exports.ERRORS = ERRORS = {}));
}) });

//#endregion
//#region ../../node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/configuration.js
var require_configuration = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/configuration.js": ((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.verifyConfig = verifyConfig;
	const errors_1$2 = require_errors();
	function verifyConfig(options) {
		if (!options.target && !options.router) throw new Error(errors_1$2.ERRORS.ERR_CONFIG_FACTORY_TARGET_MISSING);
	}
}) });

//#endregion
//#region ../../node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/debug.js
var require_debug = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/debug.js": ((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	const createDebug = require_src();
	/**
	* Debug instance with the given namespace: http-proxy-middleware
	*/
	exports.Debug = createDebug("http-proxy-middleware");
}) });

//#endregion
//#region ../../node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/plugins/default/debug-proxy-errors-plugin.js
var require_debug_proxy_errors_plugin = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/plugins/default/debug-proxy-errors-plugin.js": ((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	const debug$6 = require_debug().Debug.extend("debug-proxy-errors-plugin");
	/**
	* Subscribe to {@link https://www.npmjs.com/package/http-proxy#listening-for-proxy-events http-proxy error events} to prevent server from crashing.
	* Errors are logged with {@link https://www.npmjs.com/package/debug debug} library.
	*/
	const debugProxyErrorsPlugin = (proxyServer) => {
		/**
		* http-proxy doesn't handle any errors by default (https://github.com/http-party/node-http-proxy#listening-for-proxy-events)
		* Prevent server from crashing when http-proxy errors (uncaught errors)
		*/
		proxyServer.on("error", (error, req, res, target) => {
			debug$6(`http-proxy error event: \n%O`, error);
		});
		proxyServer.on("proxyReq", (proxyReq, req, socket) => {
			socket.on("error", (error) => {
				debug$6("Socket error in proxyReq event: \n%O", error);
			});
		});
		/**
		* Fix SSE close events
		* @link https://github.com/chimurai/http-proxy-middleware/issues/678
		* @link https://github.com/http-party/node-http-proxy/issues/1520#issue-877626125
		*/
		proxyServer.on("proxyRes", (proxyRes, req, res) => {
			res.on("close", () => {
				if (!res.writableEnded) {
					debug$6("Destroying proxyRes in proxyRes close event");
					proxyRes.destroy();
				}
			});
		});
		/**
		* Fix crash when target server restarts
		* https://github.com/chimurai/http-proxy-middleware/issues/476#issuecomment-746329030
		* https://github.com/webpack/webpack-dev-server/issues/1642#issuecomment-790602225
		*/
		proxyServer.on("proxyReqWs", (proxyReq, req, socket) => {
			socket.on("error", (error) => {
				debug$6("Socket error in proxyReqWs event: \n%O", error);
			});
		});
		proxyServer.on("open", (proxySocket) => {
			proxySocket.on("error", (error) => {
				debug$6("Socket error in open event: \n%O", error);
			});
		});
		proxyServer.on("close", (req, socket, head) => {
			socket.on("error", (error) => {
				debug$6("Socket error in close event: \n%O", error);
			});
		});
		proxyServer.on("econnreset", (error, req, res, target) => {
			debug$6(`http-proxy econnreset event: \n%O`, error);
		});
	};
	exports.debugProxyErrorsPlugin = debugProxyErrorsPlugin;
}) });

//#endregion
//#region ../../node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/status-code.js
var require_status_code = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/status-code.js": ((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.getStatusCode = getStatusCode;
	function getStatusCode(errorCode) {
		let statusCode;
		if (/HPE_INVALID/.test(errorCode)) statusCode = 502;
		else switch (errorCode) {
			case "ECONNRESET":
			case "ENOTFOUND":
			case "ECONNREFUSED":
			case "ETIMEDOUT":
				statusCode = 504;
				break;
			default:
				statusCode = 500;
				break;
		}
		return statusCode;
	}
}) });

//#endregion
//#region ../../node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/plugins/default/error-response-plugin.js
var require_error_response_plugin = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/plugins/default/error-response-plugin.js": ((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	const status_code_1 = require_status_code();
	function isResponseLike(obj) {
		return obj && typeof obj.writeHead === "function";
	}
	function isSocketLike(obj) {
		return obj && typeof obj.write === "function" && !("writeHead" in obj);
	}
	const errorResponsePlugin = (proxyServer, options) => {
		proxyServer.on("error", (err, req, res, target) => {
			if (!req && !res) throw err;
			if (isResponseLike(res)) {
				if (!res.headersSent) {
					const statusCode = (0, status_code_1.getStatusCode)(err.code);
					res.writeHead(statusCode);
				}
				const host = req.headers && req.headers.host;
				res.end(`Error occurred while trying to proxy: ${host}${req.url}`);
			} else if (isSocketLike(res)) res.destroy();
		});
	};
	exports.errorResponsePlugin = errorResponsePlugin;
}) });

//#endregion
//#region ../../node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/logger.js
var require_logger = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/logger.js": ((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.getLogger = getLogger;
	/**
	* Compatibility matrix
	*
	| Library  |  log  |  info  | warn  |  error  | \<interpolation\> |
	|----------|:------|:-------|:------|:--------|:------------------|
	| console  |   ✅   |  ✅   |   ✅   |   ✅    |   ✅ (%s %o %O)   |
	| bunyan   |   ❌   |  ✅   |   ✅   |   ✅    |   ✅ (%s %o %O)   |
	| pino     |   ❌   |  ✅   |   ✅   |   ✅    |   ✅ (%s %o %O)   |
	| winston  |   ❌   |  ✅   |   ✅   |   ✅    |   ✅ (%s %o %O)^1 |
	| log4js   |   ❌   |  ✅   |   ✅   |   ✅    |   ✅ (%s %o %O)   |
	*
	* ^1: https://github.com/winstonjs/winston#string-interpolation
	*/
	const noopLogger = {
		info: () => {},
		warn: () => {},
		error: () => {}
	};
	function getLogger(options) {
		return options.logger || noopLogger;
	}
}) });

//#endregion
//#region ../../node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/utils/logger-plugin.js
var require_logger_plugin$1 = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/utils/logger-plugin.js": ((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.getPort = getPort;
	/**
	* Get port from target
	* Using proxyRes.req.agent.sockets to determine the target port
	*/
	function getPort(sockets) {
		return Object.keys(sockets || {})?.[0]?.split(":")[1];
	}
}) });

//#endregion
//#region ../../node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/plugins/default/logger-plugin.js
var require_logger_plugin = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/plugins/default/logger-plugin.js": ((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	const url_1 = __require("url");
	const logger_1$2 = require_logger();
	const logger_plugin_1 = require_logger_plugin$1();
	const loggerPlugin = (proxyServer, options) => {
		const logger$2 = (0, logger_1$2.getLogger)(options);
		proxyServer.on("error", (err, req, res, target) => {
			const requestHref = `${req?.headers?.host}${req?.url}`;
			const targetHref = `${target?.href}`;
			logger$2.error("[HPM] Error occurred while proxying request %s to %s [%s] (%s)", requestHref, targetHref, err.code || err, "https://nodejs.org/api/errors.html#errors_common_system_errors");
		});
		/**
		* Log request and response
		* @example
		* ```shell
		* [HPM] GET /users/ -> http://jsonplaceholder.typicode.com/users/ [304]
		* ```
		*/
		proxyServer.on("proxyRes", (proxyRes, req, res) => {
			const originalUrl = req.originalUrl ?? `${req.baseUrl || ""}${req.url}`;
			let target;
			try {
				const port = (0, logger_plugin_1.getPort)(proxyRes.req?.agent?.sockets);
				const obj = {
					protocol: proxyRes.req.protocol,
					host: proxyRes.req.host,
					pathname: proxyRes.req.path
				};
				target = new url_1.URL(`${obj.protocol}//${obj.host}${obj.pathname}`);
				if (port) target.port = port;
			} catch (err) {
				target = new url_1.URL(options.target);
				target.pathname = proxyRes.req.path;
			}
			const targetUrl = target.toString();
			const exchange = `[HPM] ${req.method} ${originalUrl} -> ${targetUrl} [${proxyRes.statusCode}]`;
			logger$2.info(exchange);
		});
		/**
		* When client opens WebSocket connection
		*/
		proxyServer.on("open", (socket) => {
			logger$2.info("[HPM] Client connected: %o", socket.address());
		});
		/**
		* When client closes WebSocket connection
		*/
		proxyServer.on("close", (req, proxySocket, proxyHead) => {
			logger$2.info("[HPM] Client disconnected: %o", proxySocket.address());
		});
	};
	exports.loggerPlugin = loggerPlugin;
}) });

//#endregion
//#region ../../node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/utils/function.js
var require_function = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/utils/function.js": ((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.getFunctionName = getFunctionName;
	function getFunctionName(fn) {
		return fn.name || "[anonymous Function]";
	}
}) });

//#endregion
//#region ../../node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/plugins/default/proxy-events.js
var require_proxy_events = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/plugins/default/proxy-events.js": ((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	const debug_1$4 = require_debug();
	const function_1$2 = require_function();
	const debug$5 = debug_1$4.Debug.extend("proxy-events-plugin");
	/**
	* Implements option.on object to subscribe to http-proxy events.
	*
	* @example
	* ```js
	* createProxyMiddleware({
	*  on: {
	*    error: (error, req, res, target) => {},
	*    proxyReq: (proxyReq, req, res, options) => {},
	*    proxyReqWs: (proxyReq, req, socket, options) => {},
	*    proxyRes: (proxyRes, req, res) => {},
	*    open: (proxySocket) => {},
	*    close: (proxyRes, proxySocket, proxyHead) => {},
	*    start: (req, res, target) => {},
	*    end: (req, res, proxyRes) => {},
	*    econnreset: (error, req, res, target) => {},
	*  }
	* });
	* ```
	*/
	const proxyEventsPlugin = (proxyServer, options) => {
		Object.entries(options.on || {}).forEach(([eventName, handler]) => {
			debug$5(`register event handler: "${eventName}" -> "${(0, function_1$2.getFunctionName)(handler)}"`);
			proxyServer.on(eventName, handler);
		});
	};
	exports.proxyEventsPlugin = proxyEventsPlugin;
}) });

//#endregion
//#region ../../node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/plugins/default/index.js
var require_default = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/plugins/default/index.js": ((exports) => {
	var __createBinding$3 = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __exportStar$3 = exports && exports.__exportStar || function(m, exports$1) {
		for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports$1, p)) __createBinding$3(exports$1, m, p);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	__exportStar$3(require_debug_proxy_errors_plugin(), exports);
	__exportStar$3(require_error_response_plugin(), exports);
	__exportStar$3(require_logger_plugin(), exports);
	__exportStar$3(require_proxy_events(), exports);
}) });

//#endregion
//#region ../../node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/get-plugins.js
var require_get_plugins = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/get-plugins.js": ((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.getPlugins = getPlugins;
	const default_1 = require_default();
	function getPlugins(options) {
		const maybeErrorResponsePlugin = options.on?.error ? [] : [default_1.errorResponsePlugin];
		const defaultPlugins = options.ejectPlugins ? [] : [
			default_1.debugProxyErrorsPlugin,
			default_1.proxyEventsPlugin,
			default_1.loggerPlugin,
			...maybeErrorResponsePlugin
		];
		const userPlugins = options.plugins ?? [];
		return [...defaultPlugins, ...userPlugins];
	}
}) });

//#endregion
//#region ../../node_modules/.pnpm/is-extglob@2.1.1/node_modules/is-extglob/index.js
var require_is_extglob = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/is-extglob@2.1.1/node_modules/is-extglob/index.js": ((exports, module) => {
	/*!
	* is-extglob <https://github.com/jonschlinkert/is-extglob>
	*
	* Copyright (c) 2014-2016, Jon Schlinkert.
	* Licensed under the MIT License.
	*/
	module.exports = function isExtglob$1(str) {
		if (typeof str !== "string" || str === "") return false;
		var match;
		while (match = /(\\).|([@?!+*]\(.*\))/g.exec(str)) {
			if (match[2]) return true;
			str = str.slice(match.index + match[0].length);
		}
		return false;
	};
}) });

//#endregion
//#region ../../node_modules/.pnpm/is-glob@4.0.3/node_modules/is-glob/index.js
var require_is_glob = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/is-glob@4.0.3/node_modules/is-glob/index.js": ((exports, module) => {
	/*!
	* is-glob <https://github.com/jonschlinkert/is-glob>
	*
	* Copyright (c) 2014-2017, Jon Schlinkert.
	* Released under the MIT License.
	*/
	var isExtglob = require_is_extglob();
	var chars = {
		"{": "}",
		"(": ")",
		"[": "]"
	};
	var strictCheck = function(str) {
		if (str[0] === "!") return true;
		var index = 0;
		var pipeIndex = -2;
		var closeSquareIndex = -2;
		var closeCurlyIndex = -2;
		var closeParenIndex = -2;
		var backSlashIndex = -2;
		while (index < str.length) {
			if (str[index] === "*") return true;
			if (str[index + 1] === "?" && /[\].+)]/.test(str[index])) return true;
			if (closeSquareIndex !== -1 && str[index] === "[" && str[index + 1] !== "]") {
				if (closeSquareIndex < index) closeSquareIndex = str.indexOf("]", index);
				if (closeSquareIndex > index) {
					if (backSlashIndex === -1 || backSlashIndex > closeSquareIndex) return true;
					backSlashIndex = str.indexOf("\\", index);
					if (backSlashIndex === -1 || backSlashIndex > closeSquareIndex) return true;
				}
			}
			if (closeCurlyIndex !== -1 && str[index] === "{" && str[index + 1] !== "}") {
				closeCurlyIndex = str.indexOf("}", index);
				if (closeCurlyIndex > index) {
					backSlashIndex = str.indexOf("\\", index);
					if (backSlashIndex === -1 || backSlashIndex > closeCurlyIndex) return true;
				}
			}
			if (closeParenIndex !== -1 && str[index] === "(" && str[index + 1] === "?" && /[:!=]/.test(str[index + 2]) && str[index + 3] !== ")") {
				closeParenIndex = str.indexOf(")", index);
				if (closeParenIndex > index) {
					backSlashIndex = str.indexOf("\\", index);
					if (backSlashIndex === -1 || backSlashIndex > closeParenIndex) return true;
				}
			}
			if (pipeIndex !== -1 && str[index] === "(" && str[index + 1] !== "|") {
				if (pipeIndex < index) pipeIndex = str.indexOf("|", index);
				if (pipeIndex !== -1 && str[pipeIndex + 1] !== ")") {
					closeParenIndex = str.indexOf(")", pipeIndex);
					if (closeParenIndex > pipeIndex) {
						backSlashIndex = str.indexOf("\\", pipeIndex);
						if (backSlashIndex === -1 || backSlashIndex > closeParenIndex) return true;
					}
				}
			}
			if (str[index] === "\\") {
				var open = str[index + 1];
				index += 2;
				var close = chars[open];
				if (close) {
					var n = str.indexOf(close, index);
					if (n !== -1) index = n + 1;
				}
				if (str[index] === "!") return true;
			} else index++;
		}
		return false;
	};
	var relaxedCheck = function(str) {
		if (str[0] === "!") return true;
		var index = 0;
		while (index < str.length) {
			if (/[*?{}()[\]]/.test(str[index])) return true;
			if (str[index] === "\\") {
				var open = str[index + 1];
				index += 2;
				var close = chars[open];
				if (close) {
					var n = str.indexOf(close, index);
					if (n !== -1) index = n + 1;
				}
				if (str[index] === "!") return true;
			} else index++;
		}
		return false;
	};
	module.exports = function isGlob$1(str, options) {
		if (typeof str !== "string" || str === "") return false;
		if (isExtglob(str)) return true;
		var check = strictCheck;
		if (options && options.strict === false) check = relaxedCheck;
		return check(str);
	};
}) });

//#endregion
//#region ../../node_modules/.pnpm/braces@3.0.3/node_modules/braces/lib/utils.js
var require_utils$1 = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/braces@3.0.3/node_modules/braces/lib/utils.js": ((exports) => {
	exports.isInteger = (num) => {
		if (typeof num === "number") return Number.isInteger(num);
		if (typeof num === "string" && num.trim() !== "") return Number.isInteger(Number(num));
		return false;
	};
	/**
	* Find a node of the given type
	*/
	exports.find = (node, type) => node.nodes.find((node$1) => node$1.type === type);
	/**
	* Find a node of the given type
	*/
	exports.exceedsLimit = (min, max, step = 1, limit) => {
		if (limit === false) return false;
		if (!exports.isInteger(min) || !exports.isInteger(max)) return false;
		return (Number(max) - Number(min)) / Number(step) >= limit;
	};
	/**
	* Escape the given node with '\\' before node.value
	*/
	exports.escapeNode = (block, n = 0, type) => {
		const node = block.nodes[n];
		if (!node) return;
		if (type && node.type === type || node.type === "open" || node.type === "close") {
			if (node.escaped !== true) {
				node.value = "\\" + node.value;
				node.escaped = true;
			}
		}
	};
	/**
	* Returns true if the given brace node should be enclosed in literal braces
	*/
	exports.encloseBrace = (node) => {
		if (node.type !== "brace") return false;
		if (node.commas >> 0 + node.ranges >> 0 === 0) {
			node.invalid = true;
			return true;
		}
		return false;
	};
	/**
	* Returns true if a brace node is invalid.
	*/
	exports.isInvalidBrace = (block) => {
		if (block.type !== "brace") return false;
		if (block.invalid === true || block.dollar) return true;
		if (block.commas >> 0 + block.ranges >> 0 === 0) {
			block.invalid = true;
			return true;
		}
		if (block.open !== true || block.close !== true) {
			block.invalid = true;
			return true;
		}
		return false;
	};
	/**
	* Returns true if a node is an open or close node
	*/
	exports.isOpenOrClose = (node) => {
		if (node.type === "open" || node.type === "close") return true;
		return node.open === true || node.close === true;
	};
	/**
	* Reduce an array of text nodes.
	*/
	exports.reduce = (nodes) => nodes.reduce((acc, node) => {
		if (node.type === "text") acc.push(node.value);
		if (node.type === "range") node.type = "text";
		return acc;
	}, []);
	/**
	* Flatten an array
	*/
	exports.flatten = (...args) => {
		const result = [];
		const flat = (arr) => {
			for (let i = 0; i < arr.length; i++) {
				const ele = arr[i];
				if (Array.isArray(ele)) {
					flat(ele);
					continue;
				}
				if (ele !== void 0) result.push(ele);
			}
			return result;
		};
		flat(args);
		return result;
	};
}) });

//#endregion
//#region ../../node_modules/.pnpm/braces@3.0.3/node_modules/braces/lib/stringify.js
var require_stringify = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/braces@3.0.3/node_modules/braces/lib/stringify.js": ((exports, module) => {
	const utils$6 = require_utils$1();
	module.exports = (ast, options = {}) => {
		const stringify$4 = (node, parent = {}) => {
			const invalidBlock = options.escapeInvalid && utils$6.isInvalidBrace(parent);
			const invalidNode = node.invalid === true && options.escapeInvalid === true;
			let output = "";
			if (node.value) {
				if ((invalidBlock || invalidNode) && utils$6.isOpenOrClose(node)) return "\\" + node.value;
				return node.value;
			}
			if (node.value) return node.value;
			if (node.nodes) for (const child of node.nodes) output += stringify$4(child);
			return output;
		};
		return stringify$4(ast);
	};
}) });

//#endregion
//#region ../../node_modules/.pnpm/is-number@7.0.0/node_modules/is-number/index.js
var require_is_number = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/is-number@7.0.0/node_modules/is-number/index.js": ((exports, module) => {
	module.exports = function(num) {
		if (typeof num === "number") return num - num === 0;
		if (typeof num === "string" && num.trim() !== "") return Number.isFinite ? Number.isFinite(+num) : isFinite(+num);
		return false;
	};
}) });

//#endregion
//#region ../../node_modules/.pnpm/to-regex-range@5.0.1/node_modules/to-regex-range/index.js
var require_to_regex_range = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/to-regex-range@5.0.1/node_modules/to-regex-range/index.js": ((exports, module) => {
	const isNumber$1 = require_is_number();
	const toRegexRange$1 = (min, max, options) => {
		if (isNumber$1(min) === false) throw new TypeError("toRegexRange: expected the first argument to be a number");
		if (max === void 0 || min === max) return String(min);
		if (isNumber$1(max) === false) throw new TypeError("toRegexRange: expected the second argument to be a number.");
		let opts = {
			relaxZeros: true,
			...options
		};
		if (typeof opts.strictZeros === "boolean") opts.relaxZeros = opts.strictZeros === false;
		let relax = String(opts.relaxZeros);
		let shorthand = String(opts.shorthand);
		let capture = String(opts.capture);
		let wrap = String(opts.wrap);
		let cacheKey = min + ":" + max + "=" + relax + shorthand + capture + wrap;
		if (toRegexRange$1.cache.hasOwnProperty(cacheKey)) return toRegexRange$1.cache[cacheKey].result;
		let a = Math.min(min, max);
		let b = Math.max(min, max);
		if (Math.abs(a - b) === 1) {
			let result = min + "|" + max;
			if (opts.capture) return `(${result})`;
			if (opts.wrap === false) return result;
			return `(?:${result})`;
		}
		let isPadded = hasPadding(min) || hasPadding(max);
		let state = {
			min,
			max,
			a,
			b
		};
		let positives = [];
		let negatives = [];
		if (isPadded) {
			state.isPadded = isPadded;
			state.maxLen = String(state.max).length;
		}
		if (a < 0) {
			negatives = splitToPatterns(b < 0 ? Math.abs(b) : 1, Math.abs(a), state, opts);
			a = state.a = 0;
		}
		if (b >= 0) positives = splitToPatterns(a, b, state, opts);
		state.negatives = negatives;
		state.positives = positives;
		state.result = collatePatterns(negatives, positives, opts);
		if (opts.capture === true) state.result = `(${state.result})`;
		else if (opts.wrap !== false && positives.length + negatives.length > 1) state.result = `(?:${state.result})`;
		toRegexRange$1.cache[cacheKey] = state;
		return state.result;
	};
	function collatePatterns(neg, pos, options) {
		let onlyNegative = filterPatterns(neg, pos, "-", false, options) || [];
		let onlyPositive = filterPatterns(pos, neg, "", false, options) || [];
		let intersected = filterPatterns(neg, pos, "-?", true, options) || [];
		return onlyNegative.concat(intersected).concat(onlyPositive).join("|");
	}
	function splitToRanges(min, max) {
		let nines = 1;
		let zeros$1 = 1;
		let stop = countNines(min, nines);
		let stops = new Set([max]);
		while (min <= stop && stop <= max) {
			stops.add(stop);
			nines += 1;
			stop = countNines(min, nines);
		}
		stop = countZeros(max + 1, zeros$1) - 1;
		while (min < stop && stop <= max) {
			stops.add(stop);
			zeros$1 += 1;
			stop = countZeros(max + 1, zeros$1) - 1;
		}
		stops = [...stops];
		stops.sort(compare);
		return stops;
	}
	/**
	* Convert a range to a regex pattern
	* @param {Number} `start`
	* @param {Number} `stop`
	* @return {String}
	*/
	function rangeToPattern(start, stop, options) {
		if (start === stop) return {
			pattern: start,
			count: [],
			digits: 0
		};
		let zipped = zip(start, stop);
		let digits = zipped.length;
		let pattern = "";
		let count = 0;
		for (let i = 0; i < digits; i++) {
			let [startDigit, stopDigit] = zipped[i];
			if (startDigit === stopDigit) pattern += startDigit;
			else if (startDigit !== "0" || stopDigit !== "9") pattern += toCharacterClass(startDigit, stopDigit, options);
			else count++;
		}
		if (count) pattern += options.shorthand === true ? "\\d" : "[0-9]";
		return {
			pattern,
			count: [count],
			digits
		};
	}
	function splitToPatterns(min, max, tok, options) {
		let ranges = splitToRanges(min, max);
		let tokens = [];
		let start = min;
		let prev;
		for (let i = 0; i < ranges.length; i++) {
			let max$1 = ranges[i];
			let obj = rangeToPattern(String(start), String(max$1), options);
			let zeros$1 = "";
			if (!tok.isPadded && prev && prev.pattern === obj.pattern) {
				if (prev.count.length > 1) prev.count.pop();
				prev.count.push(obj.count[0]);
				prev.string = prev.pattern + toQuantifier(prev.count);
				start = max$1 + 1;
				continue;
			}
			if (tok.isPadded) zeros$1 = padZeros(max$1, tok, options);
			obj.string = zeros$1 + obj.pattern + toQuantifier(obj.count);
			tokens.push(obj);
			start = max$1 + 1;
			prev = obj;
		}
		return tokens;
	}
	function filterPatterns(arr, comparison, prefix$1, intersection, options) {
		let result = [];
		for (let ele of arr) {
			let { string } = ele;
			if (!intersection && !contains(comparison, "string", string)) result.push(prefix$1 + string);
			if (intersection && contains(comparison, "string", string)) result.push(prefix$1 + string);
		}
		return result;
	}
	/**
	* Zip strings
	*/
	function zip(a, b) {
		let arr = [];
		for (let i = 0; i < a.length; i++) arr.push([a[i], b[i]]);
		return arr;
	}
	function compare(a, b) {
		return a > b ? 1 : b > a ? -1 : 0;
	}
	function contains(arr, key, val) {
		return arr.some((ele) => ele[key] === val);
	}
	function countNines(min, len) {
		return Number(String(min).slice(0, -len) + "9".repeat(len));
	}
	function countZeros(integer, zeros$1) {
		return integer - integer % Math.pow(10, zeros$1);
	}
	function toQuantifier(digits) {
		let [start = 0, stop = ""] = digits;
		if (stop || start > 1) return `{${start + (stop ? "," + stop : "")}}`;
		return "";
	}
	function toCharacterClass(a, b, options) {
		return `[${a}${b - a === 1 ? "" : "-"}${b}]`;
	}
	function hasPadding(str) {
		return /^-?(0+)\d/.test(str);
	}
	function padZeros(value, tok, options) {
		if (!tok.isPadded) return value;
		let diff = Math.abs(tok.maxLen - String(value).length);
		let relax = options.relaxZeros !== false;
		switch (diff) {
			case 0: return "";
			case 1: return relax ? "0?" : "0";
			case 2: return relax ? "0{0,2}" : "00";
			default: return relax ? `0{0,${diff}}` : `0{${diff}}`;
		}
	}
	/**
	* Cache
	*/
	toRegexRange$1.cache = {};
	toRegexRange$1.clearCache = () => toRegexRange$1.cache = {};
	/**
	* Expose `toRegexRange`
	*/
	module.exports = toRegexRange$1;
}) });

//#endregion
//#region ../../node_modules/.pnpm/fill-range@7.1.1/node_modules/fill-range/index.js
var require_fill_range = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/fill-range@7.1.1/node_modules/fill-range/index.js": ((exports, module) => {
	const util$1 = __require("util");
	const toRegexRange = require_to_regex_range();
	const isObject$2 = (val) => val !== null && typeof val === "object" && !Array.isArray(val);
	const transform = (toNumber) => {
		return (value) => toNumber === true ? Number(value) : String(value);
	};
	const isValidValue = (value) => {
		return typeof value === "number" || typeof value === "string" && value !== "";
	};
	const isNumber = (num) => Number.isInteger(+num);
	const zeros = (input) => {
		let value = `${input}`;
		let index = -1;
		if (value[0] === "-") value = value.slice(1);
		if (value === "0") return false;
		while (value[++index] === "0");
		return index > 0;
	};
	const stringify$3 = (start, end, options) => {
		if (typeof start === "string" || typeof end === "string") return true;
		return options.stringify === true;
	};
	const pad = (input, maxLength, toNumber) => {
		if (maxLength > 0) {
			let dash = input[0] === "-" ? "-" : "";
			if (dash) input = input.slice(1);
			input = dash + input.padStart(dash ? maxLength - 1 : maxLength, "0");
		}
		if (toNumber === false) return String(input);
		return input;
	};
	const toMaxLen = (input, maxLength) => {
		let negative = input[0] === "-" ? "-" : "";
		if (negative) {
			input = input.slice(1);
			maxLength--;
		}
		while (input.length < maxLength) input = "0" + input;
		return negative ? "-" + input : input;
	};
	const toSequence = (parts, options, maxLen) => {
		parts.negatives.sort((a, b) => a < b ? -1 : a > b ? 1 : 0);
		parts.positives.sort((a, b) => a < b ? -1 : a > b ? 1 : 0);
		let prefix$1 = options.capture ? "" : "?:";
		let positives = "";
		let negatives = "";
		let result;
		if (parts.positives.length) positives = parts.positives.map((v) => toMaxLen(String(v), maxLen)).join("|");
		if (parts.negatives.length) negatives = `-(${prefix$1}${parts.negatives.map((v) => toMaxLen(String(v), maxLen)).join("|")})`;
		if (positives && negatives) result = `${positives}|${negatives}`;
		else result = positives || negatives;
		if (options.wrap) return `(${prefix$1}${result})`;
		return result;
	};
	const toRange = (a, b, isNumbers, options) => {
		if (isNumbers) return toRegexRange(a, b, {
			wrap: false,
			...options
		});
		let start = String.fromCharCode(a);
		if (a === b) return start;
		return `[${start}-${String.fromCharCode(b)}]`;
	};
	const toRegex = (start, end, options) => {
		if (Array.isArray(start)) {
			let wrap = options.wrap === true;
			let prefix$1 = options.capture ? "" : "?:";
			return wrap ? `(${prefix$1}${start.join("|")})` : start.join("|");
		}
		return toRegexRange(start, end, options);
	};
	const rangeError = (...args) => {
		return /* @__PURE__ */ new RangeError("Invalid range arguments: " + util$1.inspect(...args));
	};
	const invalidRange = (start, end, options) => {
		if (options.strictRanges === true) throw rangeError([start, end]);
		return [];
	};
	const invalidStep = (step, options) => {
		if (options.strictRanges === true) throw new TypeError(`Expected step "${step}" to be a number`);
		return [];
	};
	const fillNumbers = (start, end, step = 1, options = {}) => {
		let a = Number(start);
		let b = Number(end);
		if (!Number.isInteger(a) || !Number.isInteger(b)) {
			if (options.strictRanges === true) throw rangeError([start, end]);
			return [];
		}
		if (a === 0) a = 0;
		if (b === 0) b = 0;
		let descending = a > b;
		let startString = String(start);
		let endString = String(end);
		let stepString = String(step);
		step = Math.max(Math.abs(step), 1);
		let padded = zeros(startString) || zeros(endString) || zeros(stepString);
		let maxLen = padded ? Math.max(startString.length, endString.length, stepString.length) : 0;
		let toNumber = padded === false && stringify$3(start, end, options) === false;
		let format = options.transform || transform(toNumber);
		if (options.toRegex && step === 1) return toRange(toMaxLen(start, maxLen), toMaxLen(end, maxLen), true, options);
		let parts = {
			negatives: [],
			positives: []
		};
		let push = (num) => parts[num < 0 ? "negatives" : "positives"].push(Math.abs(num));
		let range$1 = [];
		let index = 0;
		while (descending ? a >= b : a <= b) {
			if (options.toRegex === true && step > 1) push(a);
			else range$1.push(pad(format(a, index), maxLen, toNumber));
			a = descending ? a - step : a + step;
			index++;
		}
		if (options.toRegex === true) return step > 1 ? toSequence(parts, options, maxLen) : toRegex(range$1, null, {
			wrap: false,
			...options
		});
		return range$1;
	};
	const fillLetters = (start, end, step = 1, options = {}) => {
		if (!isNumber(start) && start.length > 1 || !isNumber(end) && end.length > 1) return invalidRange(start, end, options);
		let format = options.transform || ((val) => String.fromCharCode(val));
		let a = `${start}`.charCodeAt(0);
		let b = `${end}`.charCodeAt(0);
		let descending = a > b;
		let min = Math.min(a, b);
		let max = Math.max(a, b);
		if (options.toRegex && step === 1) return toRange(min, max, false, options);
		let range$1 = [];
		let index = 0;
		while (descending ? a >= b : a <= b) {
			range$1.push(format(a, index));
			a = descending ? a - step : a + step;
			index++;
		}
		if (options.toRegex === true) return toRegex(range$1, null, {
			wrap: false,
			options
		});
		return range$1;
	};
	const fill$2 = (start, end, step, options = {}) => {
		if (end == null && isValidValue(start)) return [start];
		if (!isValidValue(start) || !isValidValue(end)) return invalidRange(start, end, options);
		if (typeof step === "function") return fill$2(start, end, 1, { transform: step });
		if (isObject$2(step)) return fill$2(start, end, 0, step);
		let opts = { ...options };
		if (opts.capture === true) opts.wrap = true;
		step = step || opts.step || 1;
		if (!isNumber(step)) {
			if (step != null && !isObject$2(step)) return invalidStep(step, opts);
			return fill$2(start, end, 1, step);
		}
		if (isNumber(start) && isNumber(end)) return fillNumbers(start, end, step, opts);
		return fillLetters(start, end, Math.max(Math.abs(step), 1), opts);
	};
	module.exports = fill$2;
}) });

//#endregion
//#region ../../node_modules/.pnpm/braces@3.0.3/node_modules/braces/lib/compile.js
var require_compile = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/braces@3.0.3/node_modules/braces/lib/compile.js": ((exports, module) => {
	const fill$1 = require_fill_range();
	const utils$5 = require_utils$1();
	const compile$1 = (ast, options = {}) => {
		const walk = (node, parent = {}) => {
			const invalidBlock = utils$5.isInvalidBrace(parent);
			const invalidNode = node.invalid === true && options.escapeInvalid === true;
			const invalid = invalidBlock === true || invalidNode === true;
			const prefix$1 = options.escapeInvalid === true ? "\\" : "";
			let output = "";
			if (node.isOpen === true) return prefix$1 + node.value;
			if (node.isClose === true) {
				console.log("node.isClose", prefix$1, node.value);
				return prefix$1 + node.value;
			}
			if (node.type === "open") return invalid ? prefix$1 + node.value : "(";
			if (node.type === "close") return invalid ? prefix$1 + node.value : ")";
			if (node.type === "comma") return node.prev.type === "comma" ? "" : invalid ? node.value : "|";
			if (node.value) return node.value;
			if (node.nodes && node.ranges > 0) {
				const args = utils$5.reduce(node.nodes);
				const range$1 = fill$1(...args, {
					...options,
					wrap: false,
					toRegex: true,
					strictZeros: true
				});
				if (range$1.length !== 0) return args.length > 1 && range$1.length > 1 ? `(${range$1})` : range$1;
			}
			if (node.nodes) for (const child of node.nodes) output += walk(child, node);
			return output;
		};
		return walk(ast);
	};
	module.exports = compile$1;
}) });

//#endregion
//#region ../../node_modules/.pnpm/braces@3.0.3/node_modules/braces/lib/expand.js
var require_expand = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/braces@3.0.3/node_modules/braces/lib/expand.js": ((exports, module) => {
	const fill = require_fill_range();
	const stringify$2 = require_stringify();
	const utils$4 = require_utils$1();
	const append = (queue = "", stash = "", enclose = false) => {
		const result = [];
		queue = [].concat(queue);
		stash = [].concat(stash);
		if (!stash.length) return queue;
		if (!queue.length) return enclose ? utils$4.flatten(stash).map((ele) => `{${ele}}`) : stash;
		for (const item of queue) if (Array.isArray(item)) for (const value of item) result.push(append(value, stash, enclose));
		else for (let ele of stash) {
			if (enclose === true && typeof ele === "string") ele = `{${ele}}`;
			result.push(Array.isArray(ele) ? append(item, ele, enclose) : item + ele);
		}
		return utils$4.flatten(result);
	};
	const expand$1 = (ast, options = {}) => {
		const rangeLimit = options.rangeLimit === void 0 ? 1e3 : options.rangeLimit;
		const walk = (node, parent = {}) => {
			node.queue = [];
			let p = parent;
			let q = parent.queue;
			while (p.type !== "brace" && p.type !== "root" && p.parent) {
				p = p.parent;
				q = p.queue;
			}
			if (node.invalid || node.dollar) {
				q.push(append(q.pop(), stringify$2(node, options)));
				return;
			}
			if (node.type === "brace" && node.invalid !== true && node.nodes.length === 2) {
				q.push(append(q.pop(), ["{}"]));
				return;
			}
			if (node.nodes && node.ranges > 0) {
				const args = utils$4.reduce(node.nodes);
				if (utils$4.exceedsLimit(...args, options.step, rangeLimit)) throw new RangeError("expanded array length exceeds range limit. Use options.rangeLimit to increase or disable the limit.");
				let range$1 = fill(...args, options);
				if (range$1.length === 0) range$1 = stringify$2(node, options);
				q.push(append(q.pop(), range$1));
				node.nodes = [];
				return;
			}
			const enclose = utils$4.encloseBrace(node);
			let queue = node.queue;
			let block = node;
			while (block.type !== "brace" && block.type !== "root" && block.parent) {
				block = block.parent;
				queue = block.queue;
			}
			for (let i = 0; i < node.nodes.length; i++) {
				const child = node.nodes[i];
				if (child.type === "comma" && node.type === "brace") {
					if (i === 1) queue.push("");
					queue.push("");
					continue;
				}
				if (child.type === "close") {
					q.push(append(q.pop(), queue, enclose));
					continue;
				}
				if (child.value && child.type !== "open") {
					queue.push(append(queue.pop(), child.value));
					continue;
				}
				if (child.nodes) walk(child, node);
			}
			return queue;
		};
		return utils$4.flatten(walk(ast));
	};
	module.exports = expand$1;
}) });

//#endregion
//#region ../../node_modules/.pnpm/braces@3.0.3/node_modules/braces/lib/constants.js
var require_constants$1 = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/braces@3.0.3/node_modules/braces/lib/constants.js": ((exports, module) => {
	module.exports = {
		MAX_LENGTH: 1e4,
		CHAR_0: "0",
		CHAR_9: "9",
		CHAR_UPPERCASE_A: "A",
		CHAR_LOWERCASE_A: "a",
		CHAR_UPPERCASE_Z: "Z",
		CHAR_LOWERCASE_Z: "z",
		CHAR_LEFT_PARENTHESES: "(",
		CHAR_RIGHT_PARENTHESES: ")",
		CHAR_ASTERISK: "*",
		CHAR_AMPERSAND: "&",
		CHAR_AT: "@",
		CHAR_BACKSLASH: "\\",
		CHAR_BACKTICK: "`",
		CHAR_CARRIAGE_RETURN: "\r",
		CHAR_CIRCUMFLEX_ACCENT: "^",
		CHAR_COLON: ":",
		CHAR_COMMA: ",",
		CHAR_DOLLAR: "$",
		CHAR_DOT: ".",
		CHAR_DOUBLE_QUOTE: "\"",
		CHAR_EQUAL: "=",
		CHAR_EXCLAMATION_MARK: "!",
		CHAR_FORM_FEED: "\f",
		CHAR_FORWARD_SLASH: "/",
		CHAR_HASH: "#",
		CHAR_HYPHEN_MINUS: "-",
		CHAR_LEFT_ANGLE_BRACKET: "<",
		CHAR_LEFT_CURLY_BRACE: "{",
		CHAR_LEFT_SQUARE_BRACKET: "[",
		CHAR_LINE_FEED: "\n",
		CHAR_NO_BREAK_SPACE: "\xA0",
		CHAR_PERCENT: "%",
		CHAR_PLUS: "+",
		CHAR_QUESTION_MARK: "?",
		CHAR_RIGHT_ANGLE_BRACKET: ">",
		CHAR_RIGHT_CURLY_BRACE: "}",
		CHAR_RIGHT_SQUARE_BRACKET: "]",
		CHAR_SEMICOLON: ";",
		CHAR_SINGLE_QUOTE: "'",
		CHAR_SPACE: " ",
		CHAR_TAB: "	",
		CHAR_UNDERSCORE: "_",
		CHAR_VERTICAL_LINE: "|",
		CHAR_ZERO_WIDTH_NOBREAK_SPACE: "﻿"
	};
}) });

//#endregion
//#region ../../node_modules/.pnpm/braces@3.0.3/node_modules/braces/lib/parse.js
var require_parse$1 = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/braces@3.0.3/node_modules/braces/lib/parse.js": ((exports, module) => {
	const stringify$1 = require_stringify();
	/**
	* Constants
	*/
	const { MAX_LENGTH: MAX_LENGTH$1, CHAR_BACKSLASH, CHAR_BACKTICK, CHAR_COMMA: CHAR_COMMA$1, CHAR_DOT: CHAR_DOT$1, CHAR_LEFT_PARENTHESES: CHAR_LEFT_PARENTHESES$1, CHAR_RIGHT_PARENTHESES: CHAR_RIGHT_PARENTHESES$1, CHAR_LEFT_CURLY_BRACE: CHAR_LEFT_CURLY_BRACE$1, CHAR_RIGHT_CURLY_BRACE: CHAR_RIGHT_CURLY_BRACE$1, CHAR_LEFT_SQUARE_BRACKET: CHAR_LEFT_SQUARE_BRACKET$1, CHAR_RIGHT_SQUARE_BRACKET: CHAR_RIGHT_SQUARE_BRACKET$1, CHAR_DOUBLE_QUOTE, CHAR_SINGLE_QUOTE, CHAR_NO_BREAK_SPACE, CHAR_ZERO_WIDTH_NOBREAK_SPACE } = require_constants$1();
	/**
	* parse
	*/
	const parse$3 = (input, options = {}) => {
		if (typeof input !== "string") throw new TypeError("Expected a string");
		const opts = options || {};
		const max = typeof opts.maxLength === "number" ? Math.min(MAX_LENGTH$1, opts.maxLength) : MAX_LENGTH$1;
		if (input.length > max) throw new SyntaxError(`Input length (${input.length}), exceeds max characters (${max})`);
		const ast = {
			type: "root",
			input,
			nodes: []
		};
		const stack = [ast];
		let block = ast;
		let prev = ast;
		let brackets = 0;
		const length = input.length;
		let index = 0;
		let depth$1 = 0;
		let value;
		/**
		* Helpers
		*/
		const advance = () => input[index++];
		const push = (node) => {
			if (node.type === "text" && prev.type === "dot") prev.type = "text";
			if (prev && prev.type === "text" && node.type === "text") {
				prev.value += node.value;
				return;
			}
			block.nodes.push(node);
			node.parent = block;
			node.prev = prev;
			prev = node;
			return node;
		};
		push({ type: "bos" });
		while (index < length) {
			block = stack[stack.length - 1];
			value = advance();
			/**
			* Invalid chars
			*/
			if (value === CHAR_ZERO_WIDTH_NOBREAK_SPACE || value === CHAR_NO_BREAK_SPACE) continue;
			/**
			* Escaped chars
			*/
			if (value === CHAR_BACKSLASH) {
				push({
					type: "text",
					value: (options.keepEscaping ? value : "") + advance()
				});
				continue;
			}
			/**
			* Right square bracket (literal): ']'
			*/
			if (value === CHAR_RIGHT_SQUARE_BRACKET$1) {
				push({
					type: "text",
					value: "\\" + value
				});
				continue;
			}
			/**
			* Left square bracket: '['
			*/
			if (value === CHAR_LEFT_SQUARE_BRACKET$1) {
				brackets++;
				let next;
				while (index < length && (next = advance())) {
					value += next;
					if (next === CHAR_LEFT_SQUARE_BRACKET$1) {
						brackets++;
						continue;
					}
					if (next === CHAR_BACKSLASH) {
						value += advance();
						continue;
					}
					if (next === CHAR_RIGHT_SQUARE_BRACKET$1) {
						brackets--;
						if (brackets === 0) break;
					}
				}
				push({
					type: "text",
					value
				});
				continue;
			}
			/**
			* Parentheses
			*/
			if (value === CHAR_LEFT_PARENTHESES$1) {
				block = push({
					type: "paren",
					nodes: []
				});
				stack.push(block);
				push({
					type: "text",
					value
				});
				continue;
			}
			if (value === CHAR_RIGHT_PARENTHESES$1) {
				if (block.type !== "paren") {
					push({
						type: "text",
						value
					});
					continue;
				}
				block = stack.pop();
				push({
					type: "text",
					value
				});
				block = stack[stack.length - 1];
				continue;
			}
			/**
			* Quotes: '|"|`
			*/
			if (value === CHAR_DOUBLE_QUOTE || value === CHAR_SINGLE_QUOTE || value === CHAR_BACKTICK) {
				const open = value;
				let next;
				if (options.keepQuotes !== true) value = "";
				while (index < length && (next = advance())) {
					if (next === CHAR_BACKSLASH) {
						value += next + advance();
						continue;
					}
					if (next === open) {
						if (options.keepQuotes === true) value += next;
						break;
					}
					value += next;
				}
				push({
					type: "text",
					value
				});
				continue;
			}
			/**
			* Left curly brace: '{'
			*/
			if (value === CHAR_LEFT_CURLY_BRACE$1) {
				depth$1++;
				block = push({
					type: "brace",
					open: true,
					close: false,
					dollar: prev.value && prev.value.slice(-1) === "$" || block.dollar === true,
					depth: depth$1,
					commas: 0,
					ranges: 0,
					nodes: []
				});
				stack.push(block);
				push({
					type: "open",
					value
				});
				continue;
			}
			/**
			* Right curly brace: '}'
			*/
			if (value === CHAR_RIGHT_CURLY_BRACE$1) {
				if (block.type !== "brace") {
					push({
						type: "text",
						value
					});
					continue;
				}
				const type = "close";
				block = stack.pop();
				block.close = true;
				push({
					type,
					value
				});
				depth$1--;
				block = stack[stack.length - 1];
				continue;
			}
			/**
			* Comma: ','
			*/
			if (value === CHAR_COMMA$1 && depth$1 > 0) {
				if (block.ranges > 0) {
					block.ranges = 0;
					block.nodes = [block.nodes.shift(), {
						type: "text",
						value: stringify$1(block)
					}];
				}
				push({
					type: "comma",
					value
				});
				block.commas++;
				continue;
			}
			/**
			* Dot: '.'
			*/
			if (value === CHAR_DOT$1 && depth$1 > 0 && block.commas === 0) {
				const siblings = block.nodes;
				if (depth$1 === 0 || siblings.length === 0) {
					push({
						type: "text",
						value
					});
					continue;
				}
				if (prev.type === "dot") {
					block.range = [];
					prev.value += value;
					prev.type = "range";
					if (block.nodes.length !== 3 && block.nodes.length !== 5) {
						block.invalid = true;
						block.ranges = 0;
						prev.type = "text";
						continue;
					}
					block.ranges++;
					block.args = [];
					continue;
				}
				if (prev.type === "range") {
					siblings.pop();
					const before = siblings[siblings.length - 1];
					before.value += prev.value + value;
					prev = before;
					block.ranges--;
					continue;
				}
				push({
					type: "dot",
					value
				});
				continue;
			}
			/**
			* Text
			*/
			push({
				type: "text",
				value
			});
		}
		do {
			block = stack.pop();
			if (block.type !== "root") {
				block.nodes.forEach((node) => {
					if (!node.nodes) {
						if (node.type === "open") node.isOpen = true;
						if (node.type === "close") node.isClose = true;
						if (!node.nodes) node.type = "text";
						node.invalid = true;
					}
				});
				const parent = stack[stack.length - 1];
				const index$1 = parent.nodes.indexOf(block);
				parent.nodes.splice(index$1, 1, ...block.nodes);
			}
		} while (stack.length > 0);
		push({ type: "eos" });
		return ast;
	};
	module.exports = parse$3;
}) });

//#endregion
//#region ../../node_modules/.pnpm/braces@3.0.3/node_modules/braces/index.js
var require_braces = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/braces@3.0.3/node_modules/braces/index.js": ((exports, module) => {
	const stringify = require_stringify();
	const compile = require_compile();
	const expand = require_expand();
	const parse$2 = require_parse$1();
	/**
	* Expand the given pattern or create a regex-compatible string.
	*
	* ```js
	* const braces = require('braces');
	* console.log(braces('{a,b,c}', { compile: true })); //=> ['(a|b|c)']
	* console.log(braces('{a,b,c}')); //=> ['a', 'b', 'c']
	* ```
	* @param {String} `str`
	* @param {Object} `options`
	* @return {String}
	* @api public
	*/
	const braces$1 = (input, options = {}) => {
		let output = [];
		if (Array.isArray(input)) for (const pattern of input) {
			const result = braces$1.create(pattern, options);
			if (Array.isArray(result)) output.push(...result);
			else output.push(result);
		}
		else output = [].concat(braces$1.create(input, options));
		if (options && options.expand === true && options.nodupes === true) output = [...new Set(output)];
		return output;
	};
	/**
	* Parse the given `str` with the given `options`.
	*
	* ```js
	* // braces.parse(pattern, [, options]);
	* const ast = braces.parse('a/{b,c}/d');
	* console.log(ast);
	* ```
	* @param {String} pattern Brace pattern to parse
	* @param {Object} options
	* @return {Object} Returns an AST
	* @api public
	*/
	braces$1.parse = (input, options = {}) => parse$2(input, options);
	/**
	* Creates a braces string from an AST, or an AST node.
	*
	* ```js
	* const braces = require('braces');
	* let ast = braces.parse('foo/{a,b}/bar');
	* console.log(stringify(ast.nodes[2])); //=> '{a,b}'
	* ```
	* @param {String} `input` Brace pattern or AST.
	* @param {Object} `options`
	* @return {Array} Returns an array of expanded values.
	* @api public
	*/
	braces$1.stringify = (input, options = {}) => {
		if (typeof input === "string") return stringify(braces$1.parse(input, options), options);
		return stringify(input, options);
	};
	/**
	* Compiles a brace pattern into a regex-compatible, optimized string.
	* This method is called by the main [braces](#braces) function by default.
	*
	* ```js
	* const braces = require('braces');
	* console.log(braces.compile('a/{b,c}/d'));
	* //=> ['a/(b|c)/d']
	* ```
	* @param {String} `input` Brace pattern or AST.
	* @param {Object} `options`
	* @return {Array} Returns an array of expanded values.
	* @api public
	*/
	braces$1.compile = (input, options = {}) => {
		if (typeof input === "string") input = braces$1.parse(input, options);
		return compile(input, options);
	};
	/**
	* Expands a brace pattern into an array. This method is called by the
	* main [braces](#braces) function when `options.expand` is true. Before
	* using this method it's recommended that you read the [performance notes](#performance))
	* and advantages of using [.compile](#compile) instead.
	*
	* ```js
	* const braces = require('braces');
	* console.log(braces.expand('a/{b,c}/d'));
	* //=> ['a/b/d', 'a/c/d'];
	* ```
	* @param {String} `pattern` Brace pattern
	* @param {Object} `options`
	* @return {Array} Returns an array of expanded values.
	* @api public
	*/
	braces$1.expand = (input, options = {}) => {
		if (typeof input === "string") input = braces$1.parse(input, options);
		let result = expand(input, options);
		if (options.noempty === true) result = result.filter(Boolean);
		if (options.nodupes === true) result = [...new Set(result)];
		return result;
	};
	/**
	* Processes a brace pattern and returns either an expanded array
	* (if `options.expand` is true), a highly optimized regex-compatible string.
	* This method is called by the main [braces](#braces) function.
	*
	* ```js
	* const braces = require('braces');
	* console.log(braces.create('user-{200..300}/project-{a,b,c}-{1..10}'))
	* //=> 'user-(20[0-9]|2[1-9][0-9]|300)/project-(a|b|c)-([1-9]|10)'
	* ```
	* @param {String} `pattern` Brace pattern
	* @param {Object} `options`
	* @return {Array} Returns an array of expanded values.
	* @api public
	*/
	braces$1.create = (input, options = {}) => {
		if (input === "" || input.length < 3) return [input];
		return options.expand !== true ? braces$1.compile(input, options) : braces$1.expand(input, options);
	};
	/**
	* Expose "braces"
	*/
	module.exports = braces$1;
}) });

//#endregion
//#region ../../node_modules/.pnpm/picomatch@2.3.1/node_modules/picomatch/lib/constants.js
var require_constants = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/picomatch@2.3.1/node_modules/picomatch/lib/constants.js": ((exports, module) => {
	const path$3 = __require("path");
	const WIN_SLASH = "\\\\/";
	const WIN_NO_SLASH = `[^${WIN_SLASH}]`;
	/**
	* Posix glob regex
	*/
	const DOT_LITERAL = "\\.";
	const PLUS_LITERAL = "\\+";
	const QMARK_LITERAL = "\\?";
	const SLASH_LITERAL = "\\/";
	const ONE_CHAR = "(?=.)";
	const QMARK = "[^/]";
	const END_ANCHOR = `(?:${SLASH_LITERAL}|$)`;
	const START_ANCHOR = `(?:^|${SLASH_LITERAL})`;
	const DOTS_SLASH = `${DOT_LITERAL}{1,2}${END_ANCHOR}`;
	const POSIX_CHARS = {
		DOT_LITERAL,
		PLUS_LITERAL,
		QMARK_LITERAL,
		SLASH_LITERAL,
		ONE_CHAR,
		QMARK,
		END_ANCHOR,
		DOTS_SLASH,
		NO_DOT: `(?!${DOT_LITERAL})`,
		NO_DOTS: `(?!${START_ANCHOR}${DOTS_SLASH})`,
		NO_DOT_SLASH: `(?!${DOT_LITERAL}{0,1}${END_ANCHOR})`,
		NO_DOTS_SLASH: `(?!${DOTS_SLASH})`,
		QMARK_NO_DOT: `[^.${SLASH_LITERAL}]`,
		STAR: `${QMARK}*?`,
		START_ANCHOR
	};
	/**
	* Windows glob regex
	*/
	const WINDOWS_CHARS = {
		...POSIX_CHARS,
		SLASH_LITERAL: `[${WIN_SLASH}]`,
		QMARK: WIN_NO_SLASH,
		STAR: `${WIN_NO_SLASH}*?`,
		DOTS_SLASH: `${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$)`,
		NO_DOT: `(?!${DOT_LITERAL})`,
		NO_DOTS: `(?!(?:^|[${WIN_SLASH}])${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
		NO_DOT_SLASH: `(?!${DOT_LITERAL}{0,1}(?:[${WIN_SLASH}]|$))`,
		NO_DOTS_SLASH: `(?!${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
		QMARK_NO_DOT: `[^.${WIN_SLASH}]`,
		START_ANCHOR: `(?:^|[${WIN_SLASH}])`,
		END_ANCHOR: `(?:[${WIN_SLASH}]|$)`
	};
	/**
	* POSIX Bracket Regex
	*/
	const POSIX_REGEX_SOURCE$1 = {
		alnum: "a-zA-Z0-9",
		alpha: "a-zA-Z",
		ascii: "\\x00-\\x7F",
		blank: " \\t",
		cntrl: "\\x00-\\x1F\\x7F",
		digit: "0-9",
		graph: "\\x21-\\x7E",
		lower: "a-z",
		print: "\\x20-\\x7E ",
		punct: "\\-!\"#$%&'()\\*+,./:;<=>?@[\\]^_`{|}~",
		space: " \\t\\r\\n\\v\\f",
		upper: "A-Z",
		word: "A-Za-z0-9_",
		xdigit: "A-Fa-f0-9"
	};
	module.exports = {
		MAX_LENGTH: 1024 * 64,
		POSIX_REGEX_SOURCE: POSIX_REGEX_SOURCE$1,
		REGEX_BACKSLASH: /\\(?![*+?^${}(|)[\]])/g,
		REGEX_NON_SPECIAL_CHARS: /^[^@![\].,$*+?^{}()|\\/]+/,
		REGEX_SPECIAL_CHARS: /[-*+?.^${}(|)[\]]/,
		REGEX_SPECIAL_CHARS_BACKREF: /(\\?)((\W)(\3*))/g,
		REGEX_SPECIAL_CHARS_GLOBAL: /([-*+?.^${}(|)[\]])/g,
		REGEX_REMOVE_BACKSLASH: /(?:\[.*?[^\\]\]|\\(?=.))/g,
		REPLACEMENTS: {
			"***": "*",
			"**/**": "**",
			"**/**/**": "**"
		},
		CHAR_0: 48,
		CHAR_9: 57,
		CHAR_UPPERCASE_A: 65,
		CHAR_LOWERCASE_A: 97,
		CHAR_UPPERCASE_Z: 90,
		CHAR_LOWERCASE_Z: 122,
		CHAR_LEFT_PARENTHESES: 40,
		CHAR_RIGHT_PARENTHESES: 41,
		CHAR_ASTERISK: 42,
		CHAR_AMPERSAND: 38,
		CHAR_AT: 64,
		CHAR_BACKWARD_SLASH: 92,
		CHAR_CARRIAGE_RETURN: 13,
		CHAR_CIRCUMFLEX_ACCENT: 94,
		CHAR_COLON: 58,
		CHAR_COMMA: 44,
		CHAR_DOT: 46,
		CHAR_DOUBLE_QUOTE: 34,
		CHAR_EQUAL: 61,
		CHAR_EXCLAMATION_MARK: 33,
		CHAR_FORM_FEED: 12,
		CHAR_FORWARD_SLASH: 47,
		CHAR_GRAVE_ACCENT: 96,
		CHAR_HASH: 35,
		CHAR_HYPHEN_MINUS: 45,
		CHAR_LEFT_ANGLE_BRACKET: 60,
		CHAR_LEFT_CURLY_BRACE: 123,
		CHAR_LEFT_SQUARE_BRACKET: 91,
		CHAR_LINE_FEED: 10,
		CHAR_NO_BREAK_SPACE: 160,
		CHAR_PERCENT: 37,
		CHAR_PLUS: 43,
		CHAR_QUESTION_MARK: 63,
		CHAR_RIGHT_ANGLE_BRACKET: 62,
		CHAR_RIGHT_CURLY_BRACE: 125,
		CHAR_RIGHT_SQUARE_BRACKET: 93,
		CHAR_SEMICOLON: 59,
		CHAR_SINGLE_QUOTE: 39,
		CHAR_SPACE: 32,
		CHAR_TAB: 9,
		CHAR_UNDERSCORE: 95,
		CHAR_VERTICAL_LINE: 124,
		CHAR_ZERO_WIDTH_NOBREAK_SPACE: 65279,
		SEP: path$3.sep,
		extglobChars(chars$1) {
			return {
				"!": {
					type: "negate",
					open: "(?:(?!(?:",
					close: `))${chars$1.STAR})`
				},
				"?": {
					type: "qmark",
					open: "(?:",
					close: ")?"
				},
				"+": {
					type: "plus",
					open: "(?:",
					close: ")+"
				},
				"*": {
					type: "star",
					open: "(?:",
					close: ")*"
				},
				"@": {
					type: "at",
					open: "(?:",
					close: ")"
				}
			};
		},
		globChars(win32$1) {
			return win32$1 === true ? WINDOWS_CHARS : POSIX_CHARS;
		}
	};
}) });

//#endregion
//#region ../../node_modules/.pnpm/picomatch@2.3.1/node_modules/picomatch/lib/utils.js
var require_utils = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/picomatch@2.3.1/node_modules/picomatch/lib/utils.js": ((exports) => {
	const path$2 = __require("path");
	const win32 = process.platform === "win32";
	const { REGEX_BACKSLASH, REGEX_REMOVE_BACKSLASH, REGEX_SPECIAL_CHARS, REGEX_SPECIAL_CHARS_GLOBAL } = require_constants();
	exports.isObject = (val) => val !== null && typeof val === "object" && !Array.isArray(val);
	exports.hasRegexChars = (str) => REGEX_SPECIAL_CHARS.test(str);
	exports.isRegexChar = (str) => str.length === 1 && exports.hasRegexChars(str);
	exports.escapeRegex = (str) => str.replace(REGEX_SPECIAL_CHARS_GLOBAL, "\\$1");
	exports.toPosixSlashes = (str) => str.replace(REGEX_BACKSLASH, "/");
	exports.removeBackslashes = (str) => {
		return str.replace(REGEX_REMOVE_BACKSLASH, (match) => {
			return match === "\\" ? "" : match;
		});
	};
	exports.supportsLookbehinds = () => {
		const segs = process.version.slice(1).split(".").map(Number);
		if (segs.length === 3 && segs[0] >= 9 || segs[0] === 8 && segs[1] >= 10) return true;
		return false;
	};
	exports.isWindows = (options) => {
		if (options && typeof options.windows === "boolean") return options.windows;
		return win32 === true || path$2.sep === "\\";
	};
	exports.escapeLast = (input, char, lastIdx) => {
		const idx = input.lastIndexOf(char, lastIdx);
		if (idx === -1) return input;
		if (input[idx - 1] === "\\") return exports.escapeLast(input, char, idx - 1);
		return `${input.slice(0, idx)}\\${input.slice(idx)}`;
	};
	exports.removePrefix = (input, state = {}) => {
		let output = input;
		if (output.startsWith("./")) {
			output = output.slice(2);
			state.prefix = "./";
		}
		return output;
	};
	exports.wrapOutput = (input, state = {}, options = {}) => {
		let output = `${options.contains ? "" : "^"}(?:${input})${options.contains ? "" : "$"}`;
		if (state.negated === true) output = `(?:^(?!${output}).*$)`;
		return output;
	};
}) });

//#endregion
//#region ../../node_modules/.pnpm/picomatch@2.3.1/node_modules/picomatch/lib/scan.js
var require_scan = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/picomatch@2.3.1/node_modules/picomatch/lib/scan.js": ((exports, module) => {
	const utils$3 = require_utils();
	const { CHAR_ASTERISK, CHAR_AT, CHAR_BACKWARD_SLASH, CHAR_COMMA, CHAR_DOT, CHAR_EXCLAMATION_MARK, CHAR_FORWARD_SLASH, CHAR_LEFT_CURLY_BRACE, CHAR_LEFT_PARENTHESES, CHAR_LEFT_SQUARE_BRACKET, CHAR_PLUS, CHAR_QUESTION_MARK, CHAR_RIGHT_CURLY_BRACE, CHAR_RIGHT_PARENTHESES, CHAR_RIGHT_SQUARE_BRACKET } = require_constants();
	const isPathSeparator = (code) => {
		return code === CHAR_FORWARD_SLASH || code === CHAR_BACKWARD_SLASH;
	};
	const depth = (token) => {
		if (token.isPrefix !== true) token.depth = token.isGlobstar ? Infinity : 1;
	};
	/**
	* Quickly scans a glob pattern and returns an object with a handful of
	* useful properties, like `isGlob`, `path` (the leading non-glob, if it exists),
	* `glob` (the actual pattern), `negated` (true if the path starts with `!` but not
	* with `!(`) and `negatedExtglob` (true if the path starts with `!(`).
	*
	* ```js
	* const pm = require('picomatch');
	* console.log(pm.scan('foo/bar/*.js'));
	* { isGlob: true, input: 'foo/bar/*.js', base: 'foo/bar', glob: '*.js' }
	* ```
	* @param {String} `str`
	* @param {Object} `options`
	* @return {Object} Returns an object with tokens and regex source string.
	* @api public
	*/
	const scan$1 = (input, options) => {
		const opts = options || {};
		const length = input.length - 1;
		const scanToEnd = opts.parts === true || opts.scanToEnd === true;
		const slashes = [];
		const tokens = [];
		const parts = [];
		let str = input;
		let index = -1;
		let start = 0;
		let lastIndex = 0;
		let isBrace = false;
		let isBracket = false;
		let isGlob$1 = false;
		let isExtglob$1 = false;
		let isGlobstar = false;
		let braceEscaped = false;
		let backslashes = false;
		let negated = false;
		let negatedExtglob = false;
		let finished = false;
		let braces$2 = 0;
		let prev;
		let code;
		let token = {
			value: "",
			depth: 0,
			isGlob: false
		};
		const eos = () => index >= length;
		const peek = () => str.charCodeAt(index + 1);
		const advance = () => {
			prev = code;
			return str.charCodeAt(++index);
		};
		while (index < length) {
			code = advance();
			let next;
			if (code === CHAR_BACKWARD_SLASH) {
				backslashes = token.backslashes = true;
				code = advance();
				if (code === CHAR_LEFT_CURLY_BRACE) braceEscaped = true;
				continue;
			}
			if (braceEscaped === true || code === CHAR_LEFT_CURLY_BRACE) {
				braces$2++;
				while (eos() !== true && (code = advance())) {
					if (code === CHAR_BACKWARD_SLASH) {
						backslashes = token.backslashes = true;
						advance();
						continue;
					}
					if (code === CHAR_LEFT_CURLY_BRACE) {
						braces$2++;
						continue;
					}
					if (braceEscaped !== true && code === CHAR_DOT && (code = advance()) === CHAR_DOT) {
						isBrace = token.isBrace = true;
						isGlob$1 = token.isGlob = true;
						finished = true;
						if (scanToEnd === true) continue;
						break;
					}
					if (braceEscaped !== true && code === CHAR_COMMA) {
						isBrace = token.isBrace = true;
						isGlob$1 = token.isGlob = true;
						finished = true;
						if (scanToEnd === true) continue;
						break;
					}
					if (code === CHAR_RIGHT_CURLY_BRACE) {
						braces$2--;
						if (braces$2 === 0) {
							braceEscaped = false;
							isBrace = token.isBrace = true;
							finished = true;
							break;
						}
					}
				}
				if (scanToEnd === true) continue;
				break;
			}
			if (code === CHAR_FORWARD_SLASH) {
				slashes.push(index);
				tokens.push(token);
				token = {
					value: "",
					depth: 0,
					isGlob: false
				};
				if (finished === true) continue;
				if (prev === CHAR_DOT && index === start + 1) {
					start += 2;
					continue;
				}
				lastIndex = index + 1;
				continue;
			}
			if (opts.noext !== true) {
				if ((code === CHAR_PLUS || code === CHAR_AT || code === CHAR_ASTERISK || code === CHAR_QUESTION_MARK || code === CHAR_EXCLAMATION_MARK) === true && peek() === CHAR_LEFT_PARENTHESES) {
					isGlob$1 = token.isGlob = true;
					isExtglob$1 = token.isExtglob = true;
					finished = true;
					if (code === CHAR_EXCLAMATION_MARK && index === start) negatedExtglob = true;
					if (scanToEnd === true) {
						while (eos() !== true && (code = advance())) {
							if (code === CHAR_BACKWARD_SLASH) {
								backslashes = token.backslashes = true;
								code = advance();
								continue;
							}
							if (code === CHAR_RIGHT_PARENTHESES) {
								isGlob$1 = token.isGlob = true;
								finished = true;
								break;
							}
						}
						continue;
					}
					break;
				}
			}
			if (code === CHAR_ASTERISK) {
				if (prev === CHAR_ASTERISK) isGlobstar = token.isGlobstar = true;
				isGlob$1 = token.isGlob = true;
				finished = true;
				if (scanToEnd === true) continue;
				break;
			}
			if (code === CHAR_QUESTION_MARK) {
				isGlob$1 = token.isGlob = true;
				finished = true;
				if (scanToEnd === true) continue;
				break;
			}
			if (code === CHAR_LEFT_SQUARE_BRACKET) {
				while (eos() !== true && (next = advance())) {
					if (next === CHAR_BACKWARD_SLASH) {
						backslashes = token.backslashes = true;
						advance();
						continue;
					}
					if (next === CHAR_RIGHT_SQUARE_BRACKET) {
						isBracket = token.isBracket = true;
						isGlob$1 = token.isGlob = true;
						finished = true;
						break;
					}
				}
				if (scanToEnd === true) continue;
				break;
			}
			if (opts.nonegate !== true && code === CHAR_EXCLAMATION_MARK && index === start) {
				negated = token.negated = true;
				start++;
				continue;
			}
			if (opts.noparen !== true && code === CHAR_LEFT_PARENTHESES) {
				isGlob$1 = token.isGlob = true;
				if (scanToEnd === true) {
					while (eos() !== true && (code = advance())) {
						if (code === CHAR_LEFT_PARENTHESES) {
							backslashes = token.backslashes = true;
							code = advance();
							continue;
						}
						if (code === CHAR_RIGHT_PARENTHESES) {
							finished = true;
							break;
						}
					}
					continue;
				}
				break;
			}
			if (isGlob$1 === true) {
				finished = true;
				if (scanToEnd === true) continue;
				break;
			}
		}
		if (opts.noext === true) {
			isExtglob$1 = false;
			isGlob$1 = false;
		}
		let base = str;
		let prefix$1 = "";
		let glob = "";
		if (start > 0) {
			prefix$1 = str.slice(0, start);
			str = str.slice(start);
			lastIndex -= start;
		}
		if (base && isGlob$1 === true && lastIndex > 0) {
			base = str.slice(0, lastIndex);
			glob = str.slice(lastIndex);
		} else if (isGlob$1 === true) {
			base = "";
			glob = str;
		} else base = str;
		if (base && base !== "" && base !== "/" && base !== str) {
			if (isPathSeparator(base.charCodeAt(base.length - 1))) base = base.slice(0, -1);
		}
		if (opts.unescape === true) {
			if (glob) glob = utils$3.removeBackslashes(glob);
			if (base && backslashes === true) base = utils$3.removeBackslashes(base);
		}
		const state = {
			prefix: prefix$1,
			input,
			start,
			base,
			glob,
			isBrace,
			isBracket,
			isGlob: isGlob$1,
			isExtglob: isExtglob$1,
			isGlobstar,
			negated,
			negatedExtglob
		};
		if (opts.tokens === true) {
			state.maxDepth = 0;
			if (!isPathSeparator(code)) tokens.push(token);
			state.tokens = tokens;
		}
		if (opts.parts === true || opts.tokens === true) {
			let prevIndex;
			for (let idx = 0; idx < slashes.length; idx++) {
				const n = prevIndex ? prevIndex + 1 : start;
				const i = slashes[idx];
				const value = input.slice(n, i);
				if (opts.tokens) {
					if (idx === 0 && start !== 0) {
						tokens[idx].isPrefix = true;
						tokens[idx].value = prefix$1;
					} else tokens[idx].value = value;
					depth(tokens[idx]);
					state.maxDepth += tokens[idx].depth;
				}
				if (idx !== 0 || value !== "") parts.push(value);
				prevIndex = i;
			}
			if (prevIndex && prevIndex + 1 < input.length) {
				const value = input.slice(prevIndex + 1);
				parts.push(value);
				if (opts.tokens) {
					tokens[tokens.length - 1].value = value;
					depth(tokens[tokens.length - 1]);
					state.maxDepth += tokens[tokens.length - 1].depth;
				}
			}
			state.slashes = slashes;
			state.parts = parts;
		}
		return state;
	};
	module.exports = scan$1;
}) });

//#endregion
//#region ../../node_modules/.pnpm/picomatch@2.3.1/node_modules/picomatch/lib/parse.js
var require_parse = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/picomatch@2.3.1/node_modules/picomatch/lib/parse.js": ((exports, module) => {
	const constants$1 = require_constants();
	const utils$2 = require_utils();
	/**
	* Constants
	*/
	const { MAX_LENGTH, POSIX_REGEX_SOURCE, REGEX_NON_SPECIAL_CHARS, REGEX_SPECIAL_CHARS_BACKREF, REPLACEMENTS } = constants$1;
	/**
	* Helpers
	*/
	const expandRange = (args, options) => {
		if (typeof options.expandRange === "function") return options.expandRange(...args, options);
		args.sort();
		const value = `[${args.join("-")}]`;
		try {
			new RegExp(value);
		} catch (ex) {
			return args.map((v) => utils$2.escapeRegex(v)).join("..");
		}
		return value;
	};
	/**
	* Create the message for a syntax error
	*/
	const syntaxError = (type, char) => {
		return `Missing ${type}: "${char}" - use "\\\\${char}" to match literal characters`;
	};
	/**
	* Parse the given input string.
	* @param {String} input
	* @param {Object} options
	* @return {Object}
	*/
	const parse$1 = (input, options) => {
		if (typeof input !== "string") throw new TypeError("Expected a string");
		input = REPLACEMENTS[input] || input;
		const opts = { ...options };
		const max = typeof opts.maxLength === "number" ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
		let len = input.length;
		if (len > max) throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
		const bos = {
			type: "bos",
			value: "",
			output: opts.prepend || ""
		};
		const tokens = [bos];
		const capture = opts.capture ? "" : "?:";
		const win32$1 = utils$2.isWindows(options);
		const PLATFORM_CHARS = constants$1.globChars(win32$1);
		const EXTGLOB_CHARS = constants$1.extglobChars(PLATFORM_CHARS);
		const { DOT_LITERAL: DOT_LITERAL$1, PLUS_LITERAL: PLUS_LITERAL$1, SLASH_LITERAL: SLASH_LITERAL$1, ONE_CHAR: ONE_CHAR$1, DOTS_SLASH: DOTS_SLASH$1, NO_DOT, NO_DOT_SLASH, NO_DOTS_SLASH, QMARK: QMARK$1, QMARK_NO_DOT, STAR, START_ANCHOR: START_ANCHOR$1 } = PLATFORM_CHARS;
		const globstar = (opts$1) => {
			return `(${capture}(?:(?!${START_ANCHOR$1}${opts$1.dot ? DOTS_SLASH$1 : DOT_LITERAL$1}).)*?)`;
		};
		const nodot = opts.dot ? "" : NO_DOT;
		const qmarkNoDot = opts.dot ? QMARK$1 : QMARK_NO_DOT;
		let star = opts.bash === true ? globstar(opts) : STAR;
		if (opts.capture) star = `(${star})`;
		if (typeof opts.noext === "boolean") opts.noextglob = opts.noext;
		const state = {
			input,
			index: -1,
			start: 0,
			dot: opts.dot === true,
			consumed: "",
			output: "",
			prefix: "",
			backtrack: false,
			negated: false,
			brackets: 0,
			braces: 0,
			parens: 0,
			quotes: 0,
			globstar: false,
			tokens
		};
		input = utils$2.removePrefix(input, state);
		len = input.length;
		const extglobs = [];
		const braces$2 = [];
		const stack = [];
		let prev = bos;
		let value;
		/**
		* Tokenizing helpers
		*/
		const eos = () => state.index === len - 1;
		const peek = state.peek = (n = 1) => input[state.index + n];
		const advance = state.advance = () => input[++state.index] || "";
		const remaining = () => input.slice(state.index + 1);
		const consume = (value$1 = "", num = 0) => {
			state.consumed += value$1;
			state.index += num;
		};
		const append$2 = (token) => {
			state.output += token.output != null ? token.output : token.value;
			consume(token.value);
		};
		const negate = () => {
			let count = 1;
			while (peek() === "!" && (peek(2) !== "(" || peek(3) === "?")) {
				advance();
				state.start++;
				count++;
			}
			if (count % 2 === 0) return false;
			state.negated = true;
			state.start++;
			return true;
		};
		const increment = (type) => {
			state[type]++;
			stack.push(type);
		};
		const decrement = (type) => {
			state[type]--;
			stack.pop();
		};
		/**
		* Push tokens onto the tokens array. This helper speeds up
		* tokenizing by 1) helping us avoid backtracking as much as possible,
		* and 2) helping us avoid creating extra tokens when consecutive
		* characters are plain text. This improves performance and simplifies
		* lookbehinds.
		*/
		const push = (tok) => {
			if (prev.type === "globstar") {
				const isBrace = state.braces > 0 && (tok.type === "comma" || tok.type === "brace");
				const isExtglob$1 = tok.extglob === true || extglobs.length && (tok.type === "pipe" || tok.type === "paren");
				if (tok.type !== "slash" && tok.type !== "paren" && !isBrace && !isExtglob$1) {
					state.output = state.output.slice(0, -prev.output.length);
					prev.type = "star";
					prev.value = "*";
					prev.output = star;
					state.output += prev.output;
				}
			}
			if (extglobs.length && tok.type !== "paren") extglobs[extglobs.length - 1].inner += tok.value;
			if (tok.value || tok.output) append$2(tok);
			if (prev && prev.type === "text" && tok.type === "text") {
				prev.value += tok.value;
				prev.output = (prev.output || "") + tok.value;
				return;
			}
			tok.prev = prev;
			tokens.push(tok);
			prev = tok;
		};
		const extglobOpen = (type, value$1) => {
			const token = {
				...EXTGLOB_CHARS[value$1],
				conditions: 1,
				inner: ""
			};
			token.prev = prev;
			token.parens = state.parens;
			token.output = state.output;
			const output = (opts.capture ? "(" : "") + token.open;
			increment("parens");
			push({
				type,
				value: value$1,
				output: state.output ? "" : ONE_CHAR$1
			});
			push({
				type: "paren",
				extglob: true,
				value: advance(),
				output
			});
			extglobs.push(token);
		};
		const extglobClose = (token) => {
			let output = token.close + (opts.capture ? ")" : "");
			let rest;
			if (token.type === "negate") {
				let extglobStar = star;
				if (token.inner && token.inner.length > 1 && token.inner.includes("/")) extglobStar = globstar(opts);
				if (extglobStar !== star || eos() || /^\)+$/.test(remaining())) output = token.close = `)$))${extglobStar}`;
				if (token.inner.includes("*") && (rest = remaining()) && /^\.[^\\/.]+$/.test(rest)) output = token.close = `)${parse$1(rest, {
					...options,
					fastpaths: false
				}).output})${extglobStar})`;
				if (token.prev.type === "bos") state.negatedExtglob = true;
			}
			push({
				type: "paren",
				extglob: true,
				value,
				output
			});
			decrement("parens");
		};
		/**
		* Fast paths
		*/
		if (opts.fastpaths !== false && !/(^[*!]|[/()[\]{}"])/.test(input)) {
			let backslashes = false;
			let output = input.replace(REGEX_SPECIAL_CHARS_BACKREF, (m, esc, chars$1, first, rest, index) => {
				if (first === "\\") {
					backslashes = true;
					return m;
				}
				if (first === "?") {
					if (esc) return esc + first + (rest ? QMARK$1.repeat(rest.length) : "");
					if (index === 0) return qmarkNoDot + (rest ? QMARK$1.repeat(rest.length) : "");
					return QMARK$1.repeat(chars$1.length);
				}
				if (first === ".") return DOT_LITERAL$1.repeat(chars$1.length);
				if (first === "*") {
					if (esc) return esc + first + (rest ? star : "");
					return star;
				}
				return esc ? m : `\\${m}`;
			});
			if (backslashes === true) if (opts.unescape === true) output = output.replace(/\\/g, "");
			else output = output.replace(/\\+/g, (m) => {
				return m.length % 2 === 0 ? "\\\\" : m ? "\\" : "";
			});
			if (output === input && opts.contains === true) {
				state.output = input;
				return state;
			}
			state.output = utils$2.wrapOutput(output, state, options);
			return state;
		}
		/**
		* Tokenize input until we reach end-of-string
		*/
		while (!eos()) {
			value = advance();
			if (value === "\0") continue;
			/**
			* Escaped characters
			*/
			if (value === "\\") {
				const next = peek();
				if (next === "/" && opts.bash !== true) continue;
				if (next === "." || next === ";") continue;
				if (!next) {
					value += "\\";
					push({
						type: "text",
						value
					});
					continue;
				}
				const match = /^\\+/.exec(remaining());
				let slashes = 0;
				if (match && match[0].length > 2) {
					slashes = match[0].length;
					state.index += slashes;
					if (slashes % 2 !== 0) value += "\\";
				}
				if (opts.unescape === true) value = advance();
				else value += advance();
				if (state.brackets === 0) {
					push({
						type: "text",
						value
					});
					continue;
				}
			}
			/**
			* If we're inside a regex character class, continue
			* until we reach the closing bracket.
			*/
			if (state.brackets > 0 && (value !== "]" || prev.value === "[" || prev.value === "[^")) {
				if (opts.posix !== false && value === ":") {
					const inner = prev.value.slice(1);
					if (inner.includes("[")) {
						prev.posix = true;
						if (inner.includes(":")) {
							const idx = prev.value.lastIndexOf("[");
							const pre = prev.value.slice(0, idx);
							const posix = POSIX_REGEX_SOURCE[prev.value.slice(idx + 2)];
							if (posix) {
								prev.value = pre + posix;
								state.backtrack = true;
								advance();
								if (!bos.output && tokens.indexOf(prev) === 1) bos.output = ONE_CHAR$1;
								continue;
							}
						}
					}
				}
				if (value === "[" && peek() !== ":" || value === "-" && peek() === "]") value = `\\${value}`;
				if (value === "]" && (prev.value === "[" || prev.value === "[^")) value = `\\${value}`;
				if (opts.posix === true && value === "!" && prev.value === "[") value = "^";
				prev.value += value;
				append$2({ value });
				continue;
			}
			/**
			* If we're inside a quoted string, continue
			* until we reach the closing double quote.
			*/
			if (state.quotes === 1 && value !== "\"") {
				value = utils$2.escapeRegex(value);
				prev.value += value;
				append$2({ value });
				continue;
			}
			/**
			* Double quotes
			*/
			if (value === "\"") {
				state.quotes = state.quotes === 1 ? 0 : 1;
				if (opts.keepQuotes === true) push({
					type: "text",
					value
				});
				continue;
			}
			/**
			* Parentheses
			*/
			if (value === "(") {
				increment("parens");
				push({
					type: "paren",
					value
				});
				continue;
			}
			if (value === ")") {
				if (state.parens === 0 && opts.strictBrackets === true) throw new SyntaxError(syntaxError("opening", "("));
				const extglob = extglobs[extglobs.length - 1];
				if (extglob && state.parens === extglob.parens + 1) {
					extglobClose(extglobs.pop());
					continue;
				}
				push({
					type: "paren",
					value,
					output: state.parens ? ")" : "\\)"
				});
				decrement("parens");
				continue;
			}
			/**
			* Square brackets
			*/
			if (value === "[") {
				if (opts.nobracket === true || !remaining().includes("]")) {
					if (opts.nobracket !== true && opts.strictBrackets === true) throw new SyntaxError(syntaxError("closing", "]"));
					value = `\\${value}`;
				} else increment("brackets");
				push({
					type: "bracket",
					value
				});
				continue;
			}
			if (value === "]") {
				if (opts.nobracket === true || prev && prev.type === "bracket" && prev.value.length === 1) {
					push({
						type: "text",
						value,
						output: `\\${value}`
					});
					continue;
				}
				if (state.brackets === 0) {
					if (opts.strictBrackets === true) throw new SyntaxError(syntaxError("opening", "["));
					push({
						type: "text",
						value,
						output: `\\${value}`
					});
					continue;
				}
				decrement("brackets");
				const prevValue = prev.value.slice(1);
				if (prev.posix !== true && prevValue[0] === "^" && !prevValue.includes("/")) value = `/${value}`;
				prev.value += value;
				append$2({ value });
				if (opts.literalBrackets === false || utils$2.hasRegexChars(prevValue)) continue;
				const escaped = utils$2.escapeRegex(prev.value);
				state.output = state.output.slice(0, -prev.value.length);
				if (opts.literalBrackets === true) {
					state.output += escaped;
					prev.value = escaped;
					continue;
				}
				prev.value = `(${capture}${escaped}|${prev.value})`;
				state.output += prev.value;
				continue;
			}
			/**
			* Braces
			*/
			if (value === "{" && opts.nobrace !== true) {
				increment("braces");
				const open = {
					type: "brace",
					value,
					output: "(",
					outputIndex: state.output.length,
					tokensIndex: state.tokens.length
				};
				braces$2.push(open);
				push(open);
				continue;
			}
			if (value === "}") {
				const brace = braces$2[braces$2.length - 1];
				if (opts.nobrace === true || !brace) {
					push({
						type: "text",
						value,
						output: value
					});
					continue;
				}
				let output = ")";
				if (brace.dots === true) {
					const arr = tokens.slice();
					const range$1 = [];
					for (let i = arr.length - 1; i >= 0; i--) {
						tokens.pop();
						if (arr[i].type === "brace") break;
						if (arr[i].type !== "dots") range$1.unshift(arr[i].value);
					}
					output = expandRange(range$1, opts);
					state.backtrack = true;
				}
				if (brace.comma !== true && brace.dots !== true) {
					const out = state.output.slice(0, brace.outputIndex);
					const toks = state.tokens.slice(brace.tokensIndex);
					brace.value = brace.output = "\\{";
					value = output = "\\}";
					state.output = out;
					for (const t of toks) state.output += t.output || t.value;
				}
				push({
					type: "brace",
					value,
					output
				});
				decrement("braces");
				braces$2.pop();
				continue;
			}
			/**
			* Pipes
			*/
			if (value === "|") {
				if (extglobs.length > 0) extglobs[extglobs.length - 1].conditions++;
				push({
					type: "text",
					value
				});
				continue;
			}
			/**
			* Commas
			*/
			if (value === ",") {
				let output = value;
				const brace = braces$2[braces$2.length - 1];
				if (brace && stack[stack.length - 1] === "braces") {
					brace.comma = true;
					output = "|";
				}
				push({
					type: "comma",
					value,
					output
				});
				continue;
			}
			/**
			* Slashes
			*/
			if (value === "/") {
				if (prev.type === "dot" && state.index === state.start + 1) {
					state.start = state.index + 1;
					state.consumed = "";
					state.output = "";
					tokens.pop();
					prev = bos;
					continue;
				}
				push({
					type: "slash",
					value,
					output: SLASH_LITERAL$1
				});
				continue;
			}
			/**
			* Dots
			*/
			if (value === ".") {
				if (state.braces > 0 && prev.type === "dot") {
					if (prev.value === ".") prev.output = DOT_LITERAL$1;
					const brace = braces$2[braces$2.length - 1];
					prev.type = "dots";
					prev.output += value;
					prev.value += value;
					brace.dots = true;
					continue;
				}
				if (state.braces + state.parens === 0 && prev.type !== "bos" && prev.type !== "slash") {
					push({
						type: "text",
						value,
						output: DOT_LITERAL$1
					});
					continue;
				}
				push({
					type: "dot",
					value,
					output: DOT_LITERAL$1
				});
				continue;
			}
			/**
			* Question marks
			*/
			if (value === "?") {
				if (!(prev && prev.value === "(") && opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
					extglobOpen("qmark", value);
					continue;
				}
				if (prev && prev.type === "paren") {
					const next = peek();
					let output = value;
					if (next === "<" && !utils$2.supportsLookbehinds()) throw new Error("Node.js v10 or higher is required for regex lookbehinds");
					if (prev.value === "(" && !/[!=<:]/.test(next) || next === "<" && !/<([!=]|\w+>)/.test(remaining())) output = `\\${value}`;
					push({
						type: "text",
						value,
						output
					});
					continue;
				}
				if (opts.dot !== true && (prev.type === "slash" || prev.type === "bos")) {
					push({
						type: "qmark",
						value,
						output: QMARK_NO_DOT
					});
					continue;
				}
				push({
					type: "qmark",
					value,
					output: QMARK$1
				});
				continue;
			}
			/**
			* Exclamation
			*/
			if (value === "!") {
				if (opts.noextglob !== true && peek() === "(") {
					if (peek(2) !== "?" || !/[!=<:]/.test(peek(3))) {
						extglobOpen("negate", value);
						continue;
					}
				}
				if (opts.nonegate !== true && state.index === 0) {
					negate();
					continue;
				}
			}
			/**
			* Plus
			*/
			if (value === "+") {
				if (opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
					extglobOpen("plus", value);
					continue;
				}
				if (prev && prev.value === "(" || opts.regex === false) {
					push({
						type: "plus",
						value,
						output: PLUS_LITERAL$1
					});
					continue;
				}
				if (prev && (prev.type === "bracket" || prev.type === "paren" || prev.type === "brace") || state.parens > 0) {
					push({
						type: "plus",
						value
					});
					continue;
				}
				push({
					type: "plus",
					value: PLUS_LITERAL$1
				});
				continue;
			}
			/**
			* Plain text
			*/
			if (value === "@") {
				if (opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
					push({
						type: "at",
						extglob: true,
						value,
						output: ""
					});
					continue;
				}
				push({
					type: "text",
					value
				});
				continue;
			}
			/**
			* Plain text
			*/
			if (value !== "*") {
				if (value === "$" || value === "^") value = `\\${value}`;
				const match = REGEX_NON_SPECIAL_CHARS.exec(remaining());
				if (match) {
					value += match[0];
					state.index += match[0].length;
				}
				push({
					type: "text",
					value
				});
				continue;
			}
			/**
			* Stars
			*/
			if (prev && (prev.type === "globstar" || prev.star === true)) {
				prev.type = "star";
				prev.star = true;
				prev.value += value;
				prev.output = star;
				state.backtrack = true;
				state.globstar = true;
				consume(value);
				continue;
			}
			let rest = remaining();
			if (opts.noextglob !== true && /^\([^?]/.test(rest)) {
				extglobOpen("star", value);
				continue;
			}
			if (prev.type === "star") {
				if (opts.noglobstar === true) {
					consume(value);
					continue;
				}
				const prior = prev.prev;
				const before = prior.prev;
				const isStart = prior.type === "slash" || prior.type === "bos";
				const afterStar = before && (before.type === "star" || before.type === "globstar");
				if (opts.bash === true && (!isStart || rest[0] && rest[0] !== "/")) {
					push({
						type: "star",
						value,
						output: ""
					});
					continue;
				}
				const isBrace = state.braces > 0 && (prior.type === "comma" || prior.type === "brace");
				const isExtglob$1 = extglobs.length && (prior.type === "pipe" || prior.type === "paren");
				if (!isStart && prior.type !== "paren" && !isBrace && !isExtglob$1) {
					push({
						type: "star",
						value,
						output: ""
					});
					continue;
				}
				while (rest.slice(0, 3) === "/**") {
					const after = input[state.index + 4];
					if (after && after !== "/") break;
					rest = rest.slice(3);
					consume("/**", 3);
				}
				if (prior.type === "bos" && eos()) {
					prev.type = "globstar";
					prev.value += value;
					prev.output = globstar(opts);
					state.output = prev.output;
					state.globstar = true;
					consume(value);
					continue;
				}
				if (prior.type === "slash" && prior.prev.type !== "bos" && !afterStar && eos()) {
					state.output = state.output.slice(0, -(prior.output + prev.output).length);
					prior.output = `(?:${prior.output}`;
					prev.type = "globstar";
					prev.output = globstar(opts) + (opts.strictSlashes ? ")" : "|$)");
					prev.value += value;
					state.globstar = true;
					state.output += prior.output + prev.output;
					consume(value);
					continue;
				}
				if (prior.type === "slash" && prior.prev.type !== "bos" && rest[0] === "/") {
					const end = rest[1] !== void 0 ? "|$" : "";
					state.output = state.output.slice(0, -(prior.output + prev.output).length);
					prior.output = `(?:${prior.output}`;
					prev.type = "globstar";
					prev.output = `${globstar(opts)}${SLASH_LITERAL$1}|${SLASH_LITERAL$1}${end})`;
					prev.value += value;
					state.output += prior.output + prev.output;
					state.globstar = true;
					consume(value + advance());
					push({
						type: "slash",
						value: "/",
						output: ""
					});
					continue;
				}
				if (prior.type === "bos" && rest[0] === "/") {
					prev.type = "globstar";
					prev.value += value;
					prev.output = `(?:^|${SLASH_LITERAL$1}|${globstar(opts)}${SLASH_LITERAL$1})`;
					state.output = prev.output;
					state.globstar = true;
					consume(value + advance());
					push({
						type: "slash",
						value: "/",
						output: ""
					});
					continue;
				}
				state.output = state.output.slice(0, -prev.output.length);
				prev.type = "globstar";
				prev.output = globstar(opts);
				prev.value += value;
				state.output += prev.output;
				state.globstar = true;
				consume(value);
				continue;
			}
			const token = {
				type: "star",
				value,
				output: star
			};
			if (opts.bash === true) {
				token.output = ".*?";
				if (prev.type === "bos" || prev.type === "slash") token.output = nodot + token.output;
				push(token);
				continue;
			}
			if (prev && (prev.type === "bracket" || prev.type === "paren") && opts.regex === true) {
				token.output = value;
				push(token);
				continue;
			}
			if (state.index === state.start || prev.type === "slash" || prev.type === "dot") {
				if (prev.type === "dot") {
					state.output += NO_DOT_SLASH;
					prev.output += NO_DOT_SLASH;
				} else if (opts.dot === true) {
					state.output += NO_DOTS_SLASH;
					prev.output += NO_DOTS_SLASH;
				} else {
					state.output += nodot;
					prev.output += nodot;
				}
				if (peek() !== "*") {
					state.output += ONE_CHAR$1;
					prev.output += ONE_CHAR$1;
				}
			}
			push(token);
		}
		while (state.brackets > 0) {
			if (opts.strictBrackets === true) throw new SyntaxError(syntaxError("closing", "]"));
			state.output = utils$2.escapeLast(state.output, "[");
			decrement("brackets");
		}
		while (state.parens > 0) {
			if (opts.strictBrackets === true) throw new SyntaxError(syntaxError("closing", ")"));
			state.output = utils$2.escapeLast(state.output, "(");
			decrement("parens");
		}
		while (state.braces > 0) {
			if (opts.strictBrackets === true) throw new SyntaxError(syntaxError("closing", "}"));
			state.output = utils$2.escapeLast(state.output, "{");
			decrement("braces");
		}
		if (opts.strictSlashes !== true && (prev.type === "star" || prev.type === "bracket")) push({
			type: "maybe_slash",
			value: "",
			output: `${SLASH_LITERAL$1}?`
		});
		if (state.backtrack === true) {
			state.output = "";
			for (const token of state.tokens) {
				state.output += token.output != null ? token.output : token.value;
				if (token.suffix) state.output += token.suffix;
			}
		}
		return state;
	};
	/**
	* Fast paths for creating regular expressions for common glob patterns.
	* This can significantly speed up processing and has very little downside
	* impact when none of the fast paths match.
	*/
	parse$1.fastpaths = (input, options) => {
		const opts = { ...options };
		const max = typeof opts.maxLength === "number" ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
		const len = input.length;
		if (len > max) throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
		input = REPLACEMENTS[input] || input;
		const win32$1 = utils$2.isWindows(options);
		const { DOT_LITERAL: DOT_LITERAL$1, SLASH_LITERAL: SLASH_LITERAL$1, ONE_CHAR: ONE_CHAR$1, DOTS_SLASH: DOTS_SLASH$1, NO_DOT, NO_DOTS, NO_DOTS_SLASH, STAR, START_ANCHOR: START_ANCHOR$1 } = constants$1.globChars(win32$1);
		const nodot = opts.dot ? NO_DOTS : NO_DOT;
		const slashDot = opts.dot ? NO_DOTS_SLASH : NO_DOT;
		const capture = opts.capture ? "" : "?:";
		const state = {
			negated: false,
			prefix: ""
		};
		let star = opts.bash === true ? ".*?" : STAR;
		if (opts.capture) star = `(${star})`;
		const globstar = (opts$1) => {
			if (opts$1.noglobstar === true) return star;
			return `(${capture}(?:(?!${START_ANCHOR$1}${opts$1.dot ? DOTS_SLASH$1 : DOT_LITERAL$1}).)*?)`;
		};
		const create = (str) => {
			switch (str) {
				case "*": return `${nodot}${ONE_CHAR$1}${star}`;
				case ".*": return `${DOT_LITERAL$1}${ONE_CHAR$1}${star}`;
				case "*.*": return `${nodot}${star}${DOT_LITERAL$1}${ONE_CHAR$1}${star}`;
				case "*/*": return `${nodot}${star}${SLASH_LITERAL$1}${ONE_CHAR$1}${slashDot}${star}`;
				case "**": return nodot + globstar(opts);
				case "**/*": return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL$1})?${slashDot}${ONE_CHAR$1}${star}`;
				case "**/*.*": return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL$1})?${slashDot}${star}${DOT_LITERAL$1}${ONE_CHAR$1}${star}`;
				case "**/.*": return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL$1})?${DOT_LITERAL$1}${ONE_CHAR$1}${star}`;
				default: {
					const match = /^(.*?)\.(\w+)$/.exec(str);
					if (!match) return;
					const source$1 = create(match[1]);
					if (!source$1) return;
					return source$1 + DOT_LITERAL$1 + match[2];
				}
			}
		};
		let source = create(utils$2.removePrefix(input, state));
		if (source && opts.strictSlashes !== true) source += `${SLASH_LITERAL$1}?`;
		return source;
	};
	module.exports = parse$1;
}) });

//#endregion
//#region ../../node_modules/.pnpm/picomatch@2.3.1/node_modules/picomatch/lib/picomatch.js
var require_picomatch$1 = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/picomatch@2.3.1/node_modules/picomatch/lib/picomatch.js": ((exports, module) => {
	const path$1 = __require("path");
	const scan = require_scan();
	const parse = require_parse();
	const utils$1 = require_utils();
	const constants = require_constants();
	const isObject$1 = (val) => val && typeof val === "object" && !Array.isArray(val);
	/**
	* Creates a matcher function from one or more glob patterns. The
	* returned function takes a string to match as its first argument,
	* and returns true if the string is a match. The returned matcher
	* function also takes a boolean as the second argument that, when true,
	* returns an object with additional information.
	*
	* ```js
	* const picomatch = require('picomatch');
	* // picomatch(glob[, options]);
	*
	* const isMatch = picomatch('*.!(*a)');
	* console.log(isMatch('a.a')); //=> false
	* console.log(isMatch('a.b')); //=> true
	* ```
	* @name picomatch
	* @param {String|Array} `globs` One or more glob patterns.
	* @param {Object=} `options`
	* @return {Function=} Returns a matcher function.
	* @api public
	*/
	const picomatch$1 = (glob, options, returnState = false) => {
		if (Array.isArray(glob)) {
			const fns = glob.map((input) => picomatch$1(input, options, returnState));
			const arrayMatcher = (str) => {
				for (const isMatch of fns) {
					const state$1 = isMatch(str);
					if (state$1) return state$1;
				}
				return false;
			};
			return arrayMatcher;
		}
		const isState = isObject$1(glob) && glob.tokens && glob.input;
		if (glob === "" || typeof glob !== "string" && !isState) throw new TypeError("Expected pattern to be a non-empty string");
		const opts = options || {};
		const posix = utils$1.isWindows(options);
		const regex = isState ? picomatch$1.compileRe(glob, options) : picomatch$1.makeRe(glob, options, false, true);
		const state = regex.state;
		delete regex.state;
		let isIgnored = () => false;
		if (opts.ignore) {
			const ignoreOpts = {
				...options,
				ignore: null,
				onMatch: null,
				onResult: null
			};
			isIgnored = picomatch$1(opts.ignore, ignoreOpts, returnState);
		}
		const matcher = (input, returnObject = false) => {
			const { isMatch, match, output } = picomatch$1.test(input, regex, options, {
				glob,
				posix
			});
			const result = {
				glob,
				state,
				regex,
				posix,
				input,
				output,
				match,
				isMatch
			};
			if (typeof opts.onResult === "function") opts.onResult(result);
			if (isMatch === false) {
				result.isMatch = false;
				return returnObject ? result : false;
			}
			if (isIgnored(input)) {
				if (typeof opts.onIgnore === "function") opts.onIgnore(result);
				result.isMatch = false;
				return returnObject ? result : false;
			}
			if (typeof opts.onMatch === "function") opts.onMatch(result);
			return returnObject ? result : true;
		};
		if (returnState) matcher.state = state;
		return matcher;
	};
	/**
	* Test `input` with the given `regex`. This is used by the main
	* `picomatch()` function to test the input string.
	*
	* ```js
	* const picomatch = require('picomatch');
	* // picomatch.test(input, regex[, options]);
	*
	* console.log(picomatch.test('foo/bar', /^(?:([^/]*?)\/([^/]*?))$/));
	* // { isMatch: true, match: [ 'foo/', 'foo', 'bar' ], output: 'foo/bar' }
	* ```
	* @param {String} `input` String to test.
	* @param {RegExp} `regex`
	* @return {Object} Returns an object with matching info.
	* @api public
	*/
	picomatch$1.test = (input, regex, options, { glob, posix } = {}) => {
		if (typeof input !== "string") throw new TypeError("Expected input to be a string");
		if (input === "") return {
			isMatch: false,
			output: ""
		};
		const opts = options || {};
		const format = opts.format || (posix ? utils$1.toPosixSlashes : null);
		let match = input === glob;
		let output = match && format ? format(input) : input;
		if (match === false) {
			output = format ? format(input) : input;
			match = output === glob;
		}
		if (match === false || opts.capture === true) if (opts.matchBase === true || opts.basename === true) match = picomatch$1.matchBase(input, regex, options, posix);
		else match = regex.exec(output);
		return {
			isMatch: Boolean(match),
			match,
			output
		};
	};
	/**
	* Match the basename of a filepath.
	*
	* ```js
	* const picomatch = require('picomatch');
	* // picomatch.matchBase(input, glob[, options]);
	* console.log(picomatch.matchBase('foo/bar.js', '*.js'); // true
	* ```
	* @param {String} `input` String to test.
	* @param {RegExp|String} `glob` Glob pattern or regex created by [.makeRe](#makeRe).
	* @return {Boolean}
	* @api public
	*/
	picomatch$1.matchBase = (input, glob, options, posix = utils$1.isWindows(options)) => {
		return (glob instanceof RegExp ? glob : picomatch$1.makeRe(glob, options)).test(path$1.basename(input));
	};
	/**
	* Returns true if **any** of the given glob `patterns` match the specified `string`.
	*
	* ```js
	* const picomatch = require('picomatch');
	* // picomatch.isMatch(string, patterns[, options]);
	*
	* console.log(picomatch.isMatch('a.a', ['b.*', '*.a'])); //=> true
	* console.log(picomatch.isMatch('a.a', 'b.*')); //=> false
	* ```
	* @param {String|Array} str The string to test.
	* @param {String|Array} patterns One or more glob patterns to use for matching.
	* @param {Object} [options] See available [options](#options).
	* @return {Boolean} Returns true if any patterns match `str`
	* @api public
	*/
	picomatch$1.isMatch = (str, patterns, options) => picomatch$1(patterns, options)(str);
	/**
	* Parse a glob pattern to create the source string for a regular
	* expression.
	*
	* ```js
	* const picomatch = require('picomatch');
	* const result = picomatch.parse(pattern[, options]);
	* ```
	* @param {String} `pattern`
	* @param {Object} `options`
	* @return {Object} Returns an object with useful properties and output to be used as a regex source string.
	* @api public
	*/
	picomatch$1.parse = (pattern, options) => {
		if (Array.isArray(pattern)) return pattern.map((p) => picomatch$1.parse(p, options));
		return parse(pattern, {
			...options,
			fastpaths: false
		});
	};
	/**
	* Scan a glob pattern to separate the pattern into segments.
	*
	* ```js
	* const picomatch = require('picomatch');
	* // picomatch.scan(input[, options]);
	*
	* const result = picomatch.scan('!./foo/*.js');
	* console.log(result);
	* { prefix: '!./',
	*   input: '!./foo/*.js',
	*   start: 3,
	*   base: 'foo',
	*   glob: '*.js',
	*   isBrace: false,
	*   isBracket: false,
	*   isGlob: true,
	*   isExtglob: false,
	*   isGlobstar: false,
	*   negated: true }
	* ```
	* @param {String} `input` Glob pattern to scan.
	* @param {Object} `options`
	* @return {Object} Returns an object with
	* @api public
	*/
	picomatch$1.scan = (input, options) => scan(input, options);
	/**
	* Compile a regular expression from the `state` object returned by the
	* [parse()](#parse) method.
	*
	* @param {Object} `state`
	* @param {Object} `options`
	* @param {Boolean} `returnOutput` Intended for implementors, this argument allows you to return the raw output from the parser.
	* @param {Boolean} `returnState` Adds the state to a `state` property on the returned regex. Useful for implementors and debugging.
	* @return {RegExp}
	* @api public
	*/
	picomatch$1.compileRe = (state, options, returnOutput = false, returnState = false) => {
		if (returnOutput === true) return state.output;
		const opts = options || {};
		const prepend = opts.contains ? "" : "^";
		const append$2 = opts.contains ? "" : "$";
		let source = `${prepend}(?:${state.output})${append$2}`;
		if (state && state.negated === true) source = `^(?!${source}).*$`;
		const regex = picomatch$1.toRegex(source, options);
		if (returnState === true) regex.state = state;
		return regex;
	};
	/**
	* Create a regular expression from a parsed glob pattern.
	*
	* ```js
	* const picomatch = require('picomatch');
	* const state = picomatch.parse('*.js');
	* // picomatch.compileRe(state[, options]);
	*
	* console.log(picomatch.compileRe(state));
	* //=> /^(?:(?!\.)(?=.)[^/]*?\.js)$/
	* ```
	* @param {String} `state` The object returned from the `.parse` method.
	* @param {Object} `options`
	* @param {Boolean} `returnOutput` Implementors may use this argument to return the compiled output, instead of a regular expression. This is not exposed on the options to prevent end-users from mutating the result.
	* @param {Boolean} `returnState` Implementors may use this argument to return the state from the parsed glob with the returned regular expression.
	* @return {RegExp} Returns a regex created from the given pattern.
	* @api public
	*/
	picomatch$1.makeRe = (input, options = {}, returnOutput = false, returnState = false) => {
		if (!input || typeof input !== "string") throw new TypeError("Expected a non-empty string");
		let parsed = {
			negated: false,
			fastpaths: true
		};
		if (options.fastpaths !== false && (input[0] === "." || input[0] === "*")) parsed.output = parse.fastpaths(input, options);
		if (!parsed.output) parsed = parse(input, options);
		return picomatch$1.compileRe(parsed, options, returnOutput, returnState);
	};
	/**
	* Create a regular expression from the given regex source string.
	*
	* ```js
	* const picomatch = require('picomatch');
	* // picomatch.toRegex(source[, options]);
	*
	* const { output } = picomatch.parse('*.js');
	* console.log(picomatch.toRegex(output));
	* //=> /^(?:(?!\.)(?=.)[^/]*?\.js)$/
	* ```
	* @param {String} `source` Regular expression source string.
	* @param {Object} `options`
	* @return {RegExp}
	* @api public
	*/
	picomatch$1.toRegex = (source, options) => {
		try {
			const opts = options || {};
			return new RegExp(source, opts.flags || (opts.nocase ? "i" : ""));
		} catch (err) {
			if (options && options.debug === true) throw err;
			return /$^/;
		}
	};
	/**
	* Picomatch constants.
	* @return {Object}
	*/
	picomatch$1.constants = constants;
	/**
	* Expose "picomatch"
	*/
	module.exports = picomatch$1;
}) });

//#endregion
//#region ../../node_modules/.pnpm/picomatch@2.3.1/node_modules/picomatch/index.js
var require_picomatch = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/picomatch@2.3.1/node_modules/picomatch/index.js": ((exports, module) => {
	module.exports = require_picomatch$1();
}) });

//#endregion
//#region ../../node_modules/.pnpm/micromatch@4.0.8/node_modules/micromatch/index.js
var require_micromatch = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/micromatch@4.0.8/node_modules/micromatch/index.js": ((exports, module) => {
	const util = __require("util");
	const braces = require_braces();
	const picomatch = require_picomatch();
	const utils = require_utils();
	const isEmptyString = (v) => v === "" || v === "./";
	const hasBraces = (v) => {
		const index = v.indexOf("{");
		return index > -1 && v.indexOf("}", index) > -1;
	};
	/**
	* Returns an array of strings that match one or more glob patterns.
	*
	* ```js
	* const mm = require('micromatch');
	* // mm(list, patterns[, options]);
	*
	* console.log(mm(['a.js', 'a.txt'], ['*.js']));
	* //=> [ 'a.js' ]
	* ```
	* @param {String|Array<string>} `list` List of strings to match.
	* @param {String|Array<string>} `patterns` One or more glob patterns to use for matching.
	* @param {Object} `options` See available [options](#options)
	* @return {Array} Returns an array of matches
	* @summary false
	* @api public
	*/
	const micromatch$1 = (list, patterns, options) => {
		patterns = [].concat(patterns);
		list = [].concat(list);
		let omit = /* @__PURE__ */ new Set();
		let keep = /* @__PURE__ */ new Set();
		let items = /* @__PURE__ */ new Set();
		let negatives = 0;
		let onResult = (state) => {
			items.add(state.output);
			if (options && options.onResult) options.onResult(state);
		};
		for (let i = 0; i < patterns.length; i++) {
			let isMatch = picomatch(String(patterns[i]), {
				...options,
				onResult
			}, true);
			let negated = isMatch.state.negated || isMatch.state.negatedExtglob;
			if (negated) negatives++;
			for (let item of list) {
				let matched = isMatch(item, true);
				if (!(negated ? !matched.isMatch : matched.isMatch)) continue;
				if (negated) omit.add(matched.output);
				else {
					omit.delete(matched.output);
					keep.add(matched.output);
				}
			}
		}
		let matches = (negatives === patterns.length ? [...items] : [...keep]).filter((item) => !omit.has(item));
		if (options && matches.length === 0) {
			if (options.failglob === true) throw new Error(`No matches found for "${patterns.join(", ")}"`);
			if (options.nonull === true || options.nullglob === true) return options.unescape ? patterns.map((p) => p.replace(/\\/g, "")) : patterns;
		}
		return matches;
	};
	/**
	* Backwards compatibility
	*/
	micromatch$1.match = micromatch$1;
	/**
	* Returns a matcher function from the given glob `pattern` and `options`.
	* The returned function takes a string to match as its only argument and returns
	* true if the string is a match.
	*
	* ```js
	* const mm = require('micromatch');
	* // mm.matcher(pattern[, options]);
	*
	* const isMatch = mm.matcher('*.!(*a)');
	* console.log(isMatch('a.a')); //=> false
	* console.log(isMatch('a.b')); //=> true
	* ```
	* @param {String} `pattern` Glob pattern
	* @param {Object} `options`
	* @return {Function} Returns a matcher function.
	* @api public
	*/
	micromatch$1.matcher = (pattern, options) => picomatch(pattern, options);
	/**
	* Returns true if **any** of the given glob `patterns` match the specified `string`.
	*
	* ```js
	* const mm = require('micromatch');
	* // mm.isMatch(string, patterns[, options]);
	*
	* console.log(mm.isMatch('a.a', ['b.*', '*.a'])); //=> true
	* console.log(mm.isMatch('a.a', 'b.*')); //=> false
	* ```
	* @param {String} `str` The string to test.
	* @param {String|Array} `patterns` One or more glob patterns to use for matching.
	* @param {Object} `[options]` See available [options](#options).
	* @return {Boolean} Returns true if any patterns match `str`
	* @api public
	*/
	micromatch$1.isMatch = (str, patterns, options) => picomatch(patterns, options)(str);
	/**
	* Backwards compatibility
	*/
	micromatch$1.any = micromatch$1.isMatch;
	/**
	* Returns a list of strings that _**do not match any**_ of the given `patterns`.
	*
	* ```js
	* const mm = require('micromatch');
	* // mm.not(list, patterns[, options]);
	*
	* console.log(mm.not(['a.a', 'b.b', 'c.c'], '*.a'));
	* //=> ['b.b', 'c.c']
	* ```
	* @param {Array} `list` Array of strings to match.
	* @param {String|Array} `patterns` One or more glob pattern to use for matching.
	* @param {Object} `options` See available [options](#options) for changing how matches are performed
	* @return {Array} Returns an array of strings that **do not match** the given patterns.
	* @api public
	*/
	micromatch$1.not = (list, patterns, options = {}) => {
		patterns = [].concat(patterns).map(String);
		let result = /* @__PURE__ */ new Set();
		let items = [];
		let onResult = (state) => {
			if (options.onResult) options.onResult(state);
			items.push(state.output);
		};
		let matches = new Set(micromatch$1(list, patterns, {
			...options,
			onResult
		}));
		for (let item of items) if (!matches.has(item)) result.add(item);
		return [...result];
	};
	/**
	* Returns true if the given `string` contains the given pattern. Similar
	* to [.isMatch](#isMatch) but the pattern can match any part of the string.
	*
	* ```js
	* var mm = require('micromatch');
	* // mm.contains(string, pattern[, options]);
	*
	* console.log(mm.contains('aa/bb/cc', '*b'));
	* //=> true
	* console.log(mm.contains('aa/bb/cc', '*d'));
	* //=> false
	* ```
	* @param {String} `str` The string to match.
	* @param {String|Array} `patterns` Glob pattern to use for matching.
	* @param {Object} `options` See available [options](#options) for changing how matches are performed
	* @return {Boolean} Returns true if any of the patterns matches any part of `str`.
	* @api public
	*/
	micromatch$1.contains = (str, pattern, options) => {
		if (typeof str !== "string") throw new TypeError(`Expected a string: "${util.inspect(str)}"`);
		if (Array.isArray(pattern)) return pattern.some((p) => micromatch$1.contains(str, p, options));
		if (typeof pattern === "string") {
			if (isEmptyString(str) || isEmptyString(pattern)) return false;
			if (str.includes(pattern) || str.startsWith("./") && str.slice(2).includes(pattern)) return true;
		}
		return micromatch$1.isMatch(str, pattern, {
			...options,
			contains: true
		});
	};
	/**
	* Filter the keys of the given object with the given `glob` pattern
	* and `options`. Does not attempt to match nested keys. If you need this feature,
	* use [glob-object][] instead.
	*
	* ```js
	* const mm = require('micromatch');
	* // mm.matchKeys(object, patterns[, options]);
	*
	* const obj = { aa: 'a', ab: 'b', ac: 'c' };
	* console.log(mm.matchKeys(obj, '*b'));
	* //=> { ab: 'b' }
	* ```
	* @param {Object} `object` The object with keys to filter.
	* @param {String|Array} `patterns` One or more glob patterns to use for matching.
	* @param {Object} `options` See available [options](#options) for changing how matches are performed
	* @return {Object} Returns an object with only keys that match the given patterns.
	* @api public
	*/
	micromatch$1.matchKeys = (obj, patterns, options) => {
		if (!utils.isObject(obj)) throw new TypeError("Expected the first argument to be an object");
		let keys = micromatch$1(Object.keys(obj), patterns, options);
		let res = {};
		for (let key of keys) res[key] = obj[key];
		return res;
	};
	/**
	* Returns true if some of the strings in the given `list` match any of the given glob `patterns`.
	*
	* ```js
	* const mm = require('micromatch');
	* // mm.some(list, patterns[, options]);
	*
	* console.log(mm.some(['foo.js', 'bar.js'], ['*.js', '!foo.js']));
	* // true
	* console.log(mm.some(['foo.js'], ['*.js', '!foo.js']));
	* // false
	* ```
	* @param {String|Array} `list` The string or array of strings to test. Returns as soon as the first match is found.
	* @param {String|Array} `patterns` One or more glob patterns to use for matching.
	* @param {Object} `options` See available [options](#options) for changing how matches are performed
	* @return {Boolean} Returns true if any `patterns` matches any of the strings in `list`
	* @api public
	*/
	micromatch$1.some = (list, patterns, options) => {
		let items = [].concat(list);
		for (let pattern of [].concat(patterns)) {
			let isMatch = picomatch(String(pattern), options);
			if (items.some((item) => isMatch(item))) return true;
		}
		return false;
	};
	/**
	* Returns true if every string in the given `list` matches
	* any of the given glob `patterns`.
	*
	* ```js
	* const mm = require('micromatch');
	* // mm.every(list, patterns[, options]);
	*
	* console.log(mm.every('foo.js', ['foo.js']));
	* // true
	* console.log(mm.every(['foo.js', 'bar.js'], ['*.js']));
	* // true
	* console.log(mm.every(['foo.js', 'bar.js'], ['*.js', '!foo.js']));
	* // false
	* console.log(mm.every(['foo.js'], ['*.js', '!foo.js']));
	* // false
	* ```
	* @param {String|Array} `list` The string or array of strings to test.
	* @param {String|Array} `patterns` One or more glob patterns to use for matching.
	* @param {Object} `options` See available [options](#options) for changing how matches are performed
	* @return {Boolean} Returns true if all `patterns` matches all of the strings in `list`
	* @api public
	*/
	micromatch$1.every = (list, patterns, options) => {
		let items = [].concat(list);
		for (let pattern of [].concat(patterns)) {
			let isMatch = picomatch(String(pattern), options);
			if (!items.every((item) => isMatch(item))) return false;
		}
		return true;
	};
	/**
	* Returns true if **all** of the given `patterns` match
	* the specified string.
	*
	* ```js
	* const mm = require('micromatch');
	* // mm.all(string, patterns[, options]);
	*
	* console.log(mm.all('foo.js', ['foo.js']));
	* // true
	*
	* console.log(mm.all('foo.js', ['*.js', '!foo.js']));
	* // false
	*
	* console.log(mm.all('foo.js', ['*.js', 'foo.js']));
	* // true
	*
	* console.log(mm.all('foo.js', ['*.js', 'f*', '*o*', '*o.js']));
	* // true
	* ```
	* @param {String|Array} `str` The string to test.
	* @param {String|Array} `patterns` One or more glob patterns to use for matching.
	* @param {Object} `options` See available [options](#options) for changing how matches are performed
	* @return {Boolean} Returns true if any patterns match `str`
	* @api public
	*/
	micromatch$1.all = (str, patterns, options) => {
		if (typeof str !== "string") throw new TypeError(`Expected a string: "${util.inspect(str)}"`);
		return [].concat(patterns).every((p) => picomatch(p, options)(str));
	};
	/**
	* Returns an array of matches captured by `pattern` in `string, or `null` if the pattern did not match.
	*
	* ```js
	* const mm = require('micromatch');
	* // mm.capture(pattern, string[, options]);
	*
	* console.log(mm.capture('test/*.js', 'test/foo.js'));
	* //=> ['foo']
	* console.log(mm.capture('test/*.js', 'foo/bar.css'));
	* //=> null
	* ```
	* @param {String} `glob` Glob pattern to use for matching.
	* @param {String} `input` String to match
	* @param {Object} `options` See available [options](#options) for changing how matches are performed
	* @return {Array|null} Returns an array of captures if the input matches the glob pattern, otherwise `null`.
	* @api public
	*/
	micromatch$1.capture = (glob, input, options) => {
		let posix = utils.isWindows(options);
		let match = picomatch.makeRe(String(glob), {
			...options,
			capture: true
		}).exec(posix ? utils.toPosixSlashes(input) : input);
		if (match) return match.slice(1).map((v) => v === void 0 ? "" : v);
	};
	/**
	* Create a regular expression from the given glob `pattern`.
	*
	* ```js
	* const mm = require('micromatch');
	* // mm.makeRe(pattern[, options]);
	*
	* console.log(mm.makeRe('*.js'));
	* //=> /^(?:(\.[\\\/])?(?!\.)(?=.)[^\/]*?\.js)$/
	* ```
	* @param {String} `pattern` A glob pattern to convert to regex.
	* @param {Object} `options`
	* @return {RegExp} Returns a regex created from the given pattern.
	* @api public
	*/
	micromatch$1.makeRe = (...args) => picomatch.makeRe(...args);
	/**
	* Scan a glob pattern to separate the pattern into segments. Used
	* by the [split](#split) method.
	*
	* ```js
	* const mm = require('micromatch');
	* const state = mm.scan(pattern[, options]);
	* ```
	* @param {String} `pattern`
	* @param {Object} `options`
	* @return {Object} Returns an object with
	* @api public
	*/
	micromatch$1.scan = (...args) => picomatch.scan(...args);
	/**
	* Parse a glob pattern to create the source string for a regular
	* expression.
	*
	* ```js
	* const mm = require('micromatch');
	* const state = mm.parse(pattern[, options]);
	* ```
	* @param {String} `glob`
	* @param {Object} `options`
	* @return {Object} Returns an object with useful properties and output to be used as regex source string.
	* @api public
	*/
	micromatch$1.parse = (patterns, options) => {
		let res = [];
		for (let pattern of [].concat(patterns || [])) for (let str of braces(String(pattern), options)) res.push(picomatch.parse(str, options));
		return res;
	};
	/**
	* Process the given brace `pattern`.
	*
	* ```js
	* const { braces } = require('micromatch');
	* console.log(braces('foo/{a,b,c}/bar'));
	* //=> [ 'foo/(a|b|c)/bar' ]
	*
	* console.log(braces('foo/{a,b,c}/bar', { expand: true }));
	* //=> [ 'foo/a/bar', 'foo/b/bar', 'foo/c/bar' ]
	* ```
	* @param {String} `pattern` String with brace pattern to process.
	* @param {Object} `options` Any [options](#options) to change how expansion is performed. See the [braces][] library for all available options.
	* @return {Array}
	* @api public
	*/
	micromatch$1.braces = (pattern, options) => {
		if (typeof pattern !== "string") throw new TypeError("Expected a string");
		if (options && options.nobrace === true || !hasBraces(pattern)) return [pattern];
		return braces(pattern, options);
	};
	/**
	* Expand braces
	*/
	micromatch$1.braceExpand = (pattern, options) => {
		if (typeof pattern !== "string") throw new TypeError("Expected a string");
		return micromatch$1.braces(pattern, {
			...options,
			expand: true
		});
	};
	/**
	* Expose micromatch
	*/
	micromatch$1.hasBraces = hasBraces;
	module.exports = micromatch$1;
}) });

//#endregion
//#region ../../node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/path-filter.js
var require_path_filter = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/path-filter.js": ((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.matchPathFilter = matchPathFilter;
	const isGlob = require_is_glob();
	const micromatch = require_micromatch();
	const url$1 = __require("url");
	const errors_1$1 = require_errors();
	function matchPathFilter(pathFilter = "/", uri, req) {
		if (isStringPath(pathFilter)) return matchSingleStringPath(pathFilter, uri);
		if (isGlobPath(pathFilter)) return matchSingleGlobPath(pathFilter, uri);
		if (Array.isArray(pathFilter)) {
			if (pathFilter.every(isStringPath)) return matchMultiPath(pathFilter, uri);
			if (pathFilter.every(isGlobPath)) return matchMultiGlobPath(pathFilter, uri);
			throw new Error(errors_1$1.ERRORS.ERR_CONTEXT_MATCHER_INVALID_ARRAY);
		}
		if (typeof pathFilter === "function") return pathFilter(getUrlPathName(uri), req);
		throw new Error(errors_1$1.ERRORS.ERR_CONTEXT_MATCHER_GENERIC);
	}
	/**
	* @param  {String} pathFilter '/api'
	* @param  {String} uri     'http://example.org/api/b/c/d.html'
	* @return {Boolean}
	*/
	function matchSingleStringPath(pathFilter, uri) {
		return getUrlPathName(uri)?.indexOf(pathFilter) === 0;
	}
	function matchSingleGlobPath(pattern, uri) {
		const matches = micromatch([getUrlPathName(uri)], pattern);
		return matches && matches.length > 0;
	}
	function matchMultiGlobPath(patternList, uri) {
		return matchSingleGlobPath(patternList, uri);
	}
	/**
	* @param  {String} pathFilterList ['/api', '/ajax']
	* @param  {String} uri     'http://example.org/api/b/c/d.html'
	* @return {Boolean}
	*/
	function matchMultiPath(pathFilterList, uri) {
		let isMultiPath = false;
		for (const context of pathFilterList) if (matchSingleStringPath(context, uri)) {
			isMultiPath = true;
			break;
		}
		return isMultiPath;
	}
	/**
	* Parses URI and returns RFC 3986 path
	*
	* @param  {String} uri from req.url
	* @return {String}     RFC 3986 path
	*/
	function getUrlPathName(uri) {
		return uri && url$1.parse(uri).pathname;
	}
	function isStringPath(pathFilter) {
		return typeof pathFilter === "string" && !isGlob(pathFilter);
	}
	function isGlobPath(pathFilter) {
		return isGlob(pathFilter);
	}
}) });

//#endregion
//#region ../../node_modules/.pnpm/is-plain-object@5.0.0/node_modules/is-plain-object/dist/is-plain-object.js
var require_is_plain_object = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/is-plain-object@5.0.0/node_modules/is-plain-object/dist/is-plain-object.js": ((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	/*!
	* is-plain-object <https://github.com/jonschlinkert/is-plain-object>
	*
	* Copyright (c) 2014-2017, Jon Schlinkert.
	* Released under the MIT License.
	*/
	function isObject(o) {
		return Object.prototype.toString.call(o) === "[object Object]";
	}
	function isPlainObject(o) {
		var ctor, prot;
		if (isObject(o) === false) return false;
		ctor = o.constructor;
		if (ctor === void 0) return true;
		prot = ctor.prototype;
		if (isObject(prot) === false) return false;
		if (prot.hasOwnProperty("isPrototypeOf") === false) return false;
		return true;
	}
	exports.isPlainObject = isPlainObject;
}) });

//#endregion
//#region ../../node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/path-rewriter.js
var require_path_rewriter = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/path-rewriter.js": ((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.createPathRewriter = createPathRewriter;
	const is_plain_object_1$1 = require_is_plain_object();
	const errors_1 = require_errors();
	const debug$4 = require_debug().Debug.extend("path-rewriter");
	/**
	* Create rewrite function, to cache parsed rewrite rules.
	*
	* @param {Object} rewriteConfig
	* @return {Function} Function to rewrite paths; This function should accept `path` (request.url) as parameter
	*/
	function createPathRewriter(rewriteConfig) {
		let rulesCache;
		if (!isValidRewriteConfig(rewriteConfig)) return;
		if (typeof rewriteConfig === "function") return rewriteConfig;
		else {
			rulesCache = parsePathRewriteRules(rewriteConfig);
			return rewritePath;
		}
		function rewritePath(path$4) {
			let result = path$4;
			for (const rule of rulesCache) if (rule.regex.test(path$4)) {
				result = result.replace(rule.regex, rule.value);
				debug$4("rewriting path from \"%s\" to \"%s\"", path$4, result);
				break;
			}
			return result;
		}
	}
	function isValidRewriteConfig(rewriteConfig) {
		if (typeof rewriteConfig === "function") return true;
		else if ((0, is_plain_object_1$1.isPlainObject)(rewriteConfig)) return Object.keys(rewriteConfig).length !== 0;
		else if (rewriteConfig === void 0 || rewriteConfig === null) return false;
		else throw new Error(errors_1.ERRORS.ERR_PATH_REWRITER_CONFIG);
	}
	function parsePathRewriteRules(rewriteConfig) {
		const rules = [];
		if ((0, is_plain_object_1$1.isPlainObject)(rewriteConfig)) for (const [key, value] of Object.entries(rewriteConfig)) {
			rules.push({
				regex: new RegExp(key),
				value
			});
			debug$4("rewrite rule created: \"%s\" ~> \"%s\"", key, value);
		}
		return rules;
	}
}) });

//#endregion
//#region ../../node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/router.js
var require_router = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/router.js": ((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.getTarget = getTarget;
	const is_plain_object_1 = require_is_plain_object();
	const debug$3 = require_debug().Debug.extend("router");
	async function getTarget(req, config$1) {
		let newTarget;
		const router = config$1.router;
		if ((0, is_plain_object_1.isPlainObject)(router)) newTarget = getTargetFromProxyTable(req, router);
		else if (typeof router === "function") newTarget = await router(req);
		return newTarget;
	}
	function getTargetFromProxyTable(req, table) {
		let result;
		const host = req.headers.host;
		const hostAndPath = host + req.url;
		for (const [key, value] of Object.entries(table)) if (containsPath(key)) {
			if (hostAndPath.indexOf(key) > -1) {
				result = value;
				debug$3("match: \"%s\" -> \"%s\"", key, result);
				break;
			}
		} else if (key === host) {
			result = value;
			debug$3("match: \"%s\" -> \"%s\"", host, result);
			break;
		}
		return result;
	}
	function containsPath(v) {
		return v.indexOf("/") > -1;
	}
}) });

//#endregion
//#region ../../node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/http-proxy-middleware.js
var require_http_proxy_middleware = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/http-proxy-middleware.js": ((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	const httpProxy = require_http_proxy();
	const configuration_1 = require_configuration();
	const get_plugins_1 = require_get_plugins();
	const path_filter_1 = require_path_filter();
	const PathRewriter = require_path_rewriter();
	const Router = require_router();
	const debug_1$3 = require_debug();
	const function_1$1 = require_function();
	const logger_1$1 = require_logger();
	var HttpProxyMiddleware = class {
		constructor(options) {
			this.wsInternalSubscribed = false;
			this.serverOnCloseSubscribed = false;
			this.middleware = (async (req, res, next) => {
				if (this.shouldProxy(this.proxyOptions.pathFilter, req)) try {
					const activeProxyOptions = await this.prepareProxyRequest(req);
					(0, debug_1$3.Debug)(`proxy request to target: %O`, activeProxyOptions.target);
					this.proxy.web(req, res, activeProxyOptions);
				} catch (err) {
					next?.(err);
				}
				else next?.();
				/**
				* Get the server object to subscribe to server events;
				* 'upgrade' for websocket and 'close' for graceful shutdown
				*
				* NOTE:
				* req.socket: node >= 13
				* req.connection: node < 13 (Remove this when node 12/13 support is dropped)
				*/
				const server$1 = (req.socket ?? req.connection)?.server;
				if (server$1 && !this.serverOnCloseSubscribed) {
					server$1.on("close", () => {
						(0, debug_1$3.Debug)("server close signal received: closing proxy server");
						this.proxy.close();
					});
					this.serverOnCloseSubscribed = true;
				}
				if (this.proxyOptions.ws === true) this.catchUpgradeRequest(server$1);
			});
			this.catchUpgradeRequest = (server$1) => {
				if (!this.wsInternalSubscribed) {
					(0, debug_1$3.Debug)("subscribing to server upgrade event");
					server$1.on("upgrade", this.handleUpgrade);
					this.wsInternalSubscribed = true;
				}
			};
			this.handleUpgrade = async (req, socket, head) => {
				try {
					if (this.shouldProxy(this.proxyOptions.pathFilter, req)) {
						const activeProxyOptions = await this.prepareProxyRequest(req);
						this.proxy.ws(req, socket, head, activeProxyOptions);
						(0, debug_1$3.Debug)("server upgrade event received. Proxying WebSocket");
					}
				} catch (err) {
					this.proxy.emit("error", err, req, socket);
				}
			};
			/**
			* Determine whether request should be proxied.
			*/
			this.shouldProxy = (pathFilter, req) => {
				try {
					return (0, path_filter_1.matchPathFilter)(pathFilter, req.url, req);
				} catch (err) {
					(0, debug_1$3.Debug)("Error: matchPathFilter() called with request url: ", `"${req.url}"`);
					this.logger.error(err);
					return false;
				}
			};
			/**
			* Apply option.router and option.pathRewrite
			* Order matters:
			*    Router uses original path for routing;
			*    NOT the modified path, after it has been rewritten by pathRewrite
			* @param {Object} req
			* @return {Object} proxy options
			*/
			this.prepareProxyRequest = async (req) => {
				/**
				* Incorrect usage confirmed: https://github.com/expressjs/express/issues/4854#issuecomment-1066171160
				* Temporary restore req.url patch for {@link src/legacy/create-proxy-middleware.ts legacyCreateProxyMiddleware()}
				* FIXME: remove this patch in future release
				*/
				if (this.middleware.__LEGACY_HTTP_PROXY_MIDDLEWARE__) req.url = req.originalUrl || req.url;
				const newProxyOptions = Object.assign({}, this.proxyOptions);
				await this.applyRouter(req, newProxyOptions);
				await this.applyPathRewrite(req, this.pathRewriter);
				return newProxyOptions;
			};
			this.applyRouter = async (req, options$1) => {
				let newTarget;
				if (options$1.router) {
					newTarget = await Router.getTarget(req, options$1);
					if (newTarget) {
						(0, debug_1$3.Debug)("router new target: \"%s\"", newTarget);
						options$1.target = newTarget;
					}
				}
			};
			this.applyPathRewrite = async (req, pathRewriter) => {
				if (pathRewriter) {
					const path$4 = await pathRewriter(req.url, req);
					if (typeof path$4 === "string") {
						(0, debug_1$3.Debug)("pathRewrite new path: %s", req.url);
						req.url = path$4;
					} else (0, debug_1$3.Debug)("pathRewrite: no rewritten path found: %s", req.url);
				}
			};
			(0, configuration_1.verifyConfig)(options);
			this.proxyOptions = options;
			this.logger = (0, logger_1$1.getLogger)(options);
			(0, debug_1$3.Debug)(`create proxy server`);
			this.proxy = httpProxy.createProxyServer({});
			this.registerPlugins(this.proxy, this.proxyOptions);
			this.pathRewriter = PathRewriter.createPathRewriter(this.proxyOptions.pathRewrite);
			this.middleware.upgrade = (req, socket, head) => {
				if (!this.wsInternalSubscribed) this.handleUpgrade(req, socket, head);
			};
		}
		registerPlugins(proxy, options) {
			(0, get_plugins_1.getPlugins)(options).forEach((plugin) => {
				(0, debug_1$3.Debug)(`register plugin: "${(0, function_1$1.getFunctionName)(plugin)}"`);
				plugin(proxy, options);
			});
		}
	};
	exports.HttpProxyMiddleware = HttpProxyMiddleware;
}) });

//#endregion
//#region ../../node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/factory.js
var require_factory = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/factory.js": ((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.createProxyMiddleware = createProxyMiddleware;
	const http_proxy_middleware_1 = require_http_proxy_middleware();
	function createProxyMiddleware(options) {
		const { middleware: middleware$1 } = new http_proxy_middleware_1.HttpProxyMiddleware(options);
		return middleware$1;
	}
}) });

//#endregion
//#region ../../node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/handlers/response-interceptor.js
var require_response_interceptor = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/handlers/response-interceptor.js": ((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.responseInterceptor = responseInterceptor;
	const zlib = __require("zlib");
	const debug_1$2 = require_debug();
	const function_1 = require_function();
	const debug$2 = debug_1$2.Debug.extend("response-interceptor");
	/**
	* Intercept responses from upstream.
	* Automatically decompress (deflate, gzip, brotli).
	* Give developer the opportunity to modify intercepted Buffer and http.ServerResponse
	*
	* NOTE: must set options.selfHandleResponse=true (prevent automatic call of res.end())
	*/
	function responseInterceptor(interceptor) {
		return async function proxyResResponseInterceptor(proxyRes, req, res) {
			debug$2("intercept proxy response");
			const originalProxyRes = proxyRes;
			let buffer = Buffer.from("", "utf8");
			const _proxyRes = decompress(proxyRes, proxyRes.headers["content-encoding"]);
			_proxyRes.on("data", (chunk) => buffer = Buffer.concat([buffer, chunk]));
			_proxyRes.on("end", async () => {
				copyHeaders(proxyRes, res);
				debug$2("call interceptor function: %s", (0, function_1.getFunctionName)(interceptor));
				const interceptedBuffer = Buffer.from(await interceptor(buffer, originalProxyRes, req, res));
				debug$2("set content-length: %s", Buffer.byteLength(interceptedBuffer, "utf8"));
				res.setHeader("content-length", Buffer.byteLength(interceptedBuffer, "utf8"));
				debug$2("write intercepted response");
				res.write(interceptedBuffer);
				res.end();
			});
			_proxyRes.on("error", (error) => {
				res.end(`Error fetching proxied request: ${error.message}`);
			});
		};
	}
	/**
	* Streaming decompression of proxy response
	* source: https://github.com/apache/superset/blob/9773aba522e957ed9423045ca153219638a85d2f/superset-frontend/webpack.proxy-config.js#L116
	*/
	function decompress(proxyRes, contentEncoding) {
		let _proxyRes = proxyRes;
		let decompress$1;
		switch (contentEncoding) {
			case "gzip":
				decompress$1 = zlib.createGunzip();
				break;
			case "br":
				decompress$1 = zlib.createBrotliDecompress();
				break;
			case "deflate":
				decompress$1 = zlib.createInflate();
				break;
			default: break;
		}
		if (decompress$1) {
			debug$2(`decompress proxy response with 'content-encoding': %s`, contentEncoding);
			_proxyRes.pipe(decompress$1);
			_proxyRes = decompress$1;
		}
		return _proxyRes;
	}
	/**
	* Copy original headers
	* https://github.com/apache/superset/blob/9773aba522e957ed9423045ca153219638a85d2f/superset-frontend/webpack.proxy-config.js#L78
	*/
	function copyHeaders(originalResponse, response) {
		debug$2("copy original response headers");
		response.statusCode = originalResponse.statusCode;
		response.statusMessage = originalResponse.statusMessage;
		if (response.setHeader) {
			let keys = Object.keys(originalResponse.headers);
			keys = keys.filter((key) => !["content-encoding", "transfer-encoding"].includes(key));
			keys.forEach((key) => {
				let value = originalResponse.headers[key];
				if (key === "set-cookie") {
					value = Array.isArray(value) ? value : [value];
					value = value.map((x) => x.replace(/Domain=[^;]+?/i, ""));
				}
				response.setHeader(key, value);
			});
		} else response.headers = originalResponse.headers;
	}
}) });

//#endregion
//#region ../../node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/handlers/fix-request-body.js
var require_fix_request_body = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/handlers/fix-request-body.js": ((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.fixRequestBody = fixRequestBody;
	const querystring = __require("querystring");
	/**
	* Fix proxied body if bodyParser is involved.
	*/
	function fixRequestBody(proxyReq, req) {
		if (req.readableLength !== 0) return;
		const requestBody = req.body;
		if (!requestBody) return;
		const contentType = proxyReq.getHeader("Content-Type");
		if (!contentType) return;
		const writeBody = (bodyData) => {
			proxyReq.setHeader("Content-Length", Buffer.byteLength(bodyData));
			proxyReq.write(bodyData);
		};
		if (contentType.includes("application/json") || contentType.includes("+json")) writeBody(JSON.stringify(requestBody));
		else if (contentType.includes("application/x-www-form-urlencoded")) writeBody(querystring.stringify(requestBody));
		else if (contentType.includes("multipart/form-data")) writeBody(handlerFormDataBodyData(contentType, requestBody));
	}
	/**
	* format FormData data
	* @param contentType
	* @param data
	* @returns
	*/
	function handlerFormDataBodyData(contentType, data) {
		const boundary = contentType.replace(/^.*boundary=(.*)$/, "$1");
		let str = "";
		for (const [key, value] of Object.entries(data)) str += `--${boundary}\r\nContent-Disposition: form-data; name="${key}"\r\n\r\n${value}\r\n`;
		return str;
	}
}) });

//#endregion
//#region ../../node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/handlers/public.js
var require_public$1 = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/handlers/public.js": ((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.fixRequestBody = exports.responseInterceptor = void 0;
	var response_interceptor_1 = require_response_interceptor();
	Object.defineProperty(exports, "responseInterceptor", {
		enumerable: true,
		get: function() {
			return response_interceptor_1.responseInterceptor;
		}
	});
	var fix_request_body_1 = require_fix_request_body();
	Object.defineProperty(exports, "fixRequestBody", {
		enumerable: true,
		get: function() {
			return fix_request_body_1.fixRequestBody;
		}
	});
}) });

//#endregion
//#region ../../node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/handlers/index.js
var require_handlers = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/handlers/index.js": ((exports) => {
	var __createBinding$2 = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __exportStar$2 = exports && exports.__exportStar || function(m, exports$1) {
		for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports$1, p)) __createBinding$2(exports$1, m, p);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	__exportStar$2(require_public$1(), exports);
}) });

//#endregion
//#region ../../node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/legacy/options-adapter.js
var require_options_adapter = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/legacy/options-adapter.js": ((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.legacyOptionsAdapter = legacyOptionsAdapter;
	const url = __require("url");
	const debug_1$1 = require_debug();
	const logger_1 = require_logger();
	const debug$1 = debug_1$1.Debug.extend("legacy-options-adapter");
	const proxyEventMap = {
		onError: "error",
		onProxyReq: "proxyReq",
		onProxyRes: "proxyRes",
		onProxyReqWs: "proxyReqWs",
		onOpen: "open",
		onClose: "close"
	};
	/**
	* Convert {@link LegacyOptions legacy Options} to new {@link Options}
	*/
	function legacyOptionsAdapter(legacyContext, legacyOptions) {
		let options = {};
		let logger$2;
		if (typeof legacyContext === "string" && !!url.parse(legacyContext).host) throw new Error(`Shorthand syntax is removed from legacyCreateProxyMiddleware().
      Please use "legacyCreateProxyMiddleware({ target: 'http://www.example.org' })" instead.

      More details: https://github.com/chimurai/http-proxy-middleware/blob/master/MIGRATION.md#removed-shorthand-usage
      `);
		if (legacyContext && legacyOptions) {
			debug$1("map legacy context/filter to options.pathFilter");
			options = {
				...legacyOptions,
				pathFilter: legacyContext
			};
			logger$2 = getLegacyLogger(options);
			logger$2.warn(`[http-proxy-middleware] Legacy "context" argument is deprecated. Migrate your "context" to "options.pathFilter":

      const options = {
        pathFilter: '${legacyContext}',
      }

      More details: https://github.com/chimurai/http-proxy-middleware/blob/master/MIGRATION.md#removed-context-argument
      `);
		} else if (legacyContext && !legacyOptions) {
			options = { ...legacyContext };
			logger$2 = getLegacyLogger(options);
		} else logger$2 = getLegacyLogger({});
		Object.entries(proxyEventMap).forEach(([legacyEventName, proxyEventName]) => {
			if (options[legacyEventName]) {
				options.on = { ...options.on };
				options.on[proxyEventName] = options[legacyEventName];
				debug$1("map legacy event \"%s\" to \"on.%s\"", legacyEventName, proxyEventName);
				logger$2.warn(`[http-proxy-middleware] Legacy "${legacyEventName}" is deprecated. Migrate to "options.on.${proxyEventName}":

        const options = {
          on: {
            ${proxyEventName}: () => {},
          },
        }

        More details: https://github.com/chimurai/http-proxy-middleware/blob/master/MIGRATION.md#refactored-proxy-events
        `);
			}
		});
		const logProvider = options.logProvider && options.logProvider();
		const logLevel = options.logLevel;
		debug$1("legacy logLevel", logLevel);
		debug$1("legacy logProvider: %O", logProvider);
		if (typeof logLevel === "string" && logLevel !== "silent") {
			debug$1("map \"logProvider\" to \"logger\"");
			logger$2.warn(`[http-proxy-middleware] Legacy "logLevel" and "logProvider" are deprecated. Migrate to "options.logger":

      const options = {
        logger: console,
      }

      More details: https://github.com/chimurai/http-proxy-middleware/blob/master/MIGRATION.md#removed-logprovider-and-loglevel-options
      `);
		}
		return options;
	}
	function getLegacyLogger(options) {
		const legacyLogger = options.logProvider && options.logProvider();
		if (legacyLogger) options.logger = legacyLogger;
		return (0, logger_1.getLogger)(options);
	}
}) });

//#endregion
//#region ../../node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/legacy/create-proxy-middleware.js
var require_create_proxy_middleware = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/legacy/create-proxy-middleware.js": ((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.legacyCreateProxyMiddleware = legacyCreateProxyMiddleware;
	const factory_1 = require_factory();
	const debug_1 = require_debug();
	const options_adapter_1 = require_options_adapter();
	const debug = debug_1.Debug.extend("legacy-create-proxy-middleware");
	function legacyCreateProxyMiddleware(legacyContext, legacyOptions) {
		debug("init");
		const options = (0, options_adapter_1.legacyOptionsAdapter)(legacyContext, legacyOptions);
		const proxyMiddleware = (0, factory_1.createProxyMiddleware)(options);
		debug("add marker for patching req.url (old behavior)");
		proxyMiddleware.__LEGACY_HTTP_PROXY_MIDDLEWARE__ = true;
		return proxyMiddleware;
	}
}) });

//#endregion
//#region ../../node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/legacy/public.js
var require_public = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/legacy/public.js": ((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.legacyCreateProxyMiddleware = void 0;
	var create_proxy_middleware_1 = require_create_proxy_middleware();
	Object.defineProperty(exports, "legacyCreateProxyMiddleware", {
		enumerable: true,
		get: function() {
			return create_proxy_middleware_1.legacyCreateProxyMiddleware;
		}
	});
}) });

//#endregion
//#region ../../node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/legacy/index.js
var require_legacy = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/legacy/index.js": ((exports) => {
	var __createBinding$1 = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __exportStar$1 = exports && exports.__exportStar || function(m, exports$1) {
		for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports$1, p)) __createBinding$1(exports$1, m, p);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	__exportStar$1(require_public(), exports);
}) });

//#endregion
//#region ../../node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/index.js
var require_dist = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/index.js": ((exports) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __exportStar = exports && exports.__exportStar || function(m, exports$1) {
		for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports$1, p)) __createBinding(exports$1, m, p);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	__exportStar(require_factory(), exports);
	__exportStar(require_handlers(), exports);
	/**
	* Default plugins
	*/
	__exportStar(require_default(), exports);
	/**
	* Legacy exports
	*/
	__exportStar(require_legacy(), exports);
}) });

//#endregion
//#region src/module/server/router.ts
var import_dist = /* @__PURE__ */ __toESM(require_dist(), 1);
var import_lib$1 = /* @__PURE__ */ __toESM(require_lib(), 1);
var import_lib = /* @__PURE__ */ __toESM(require_lib$1(), 1);
/** 专门负责传输视频文件流 */
const videoStreamRouter = (req, res) => {
	const filename = req.params.filename;
	const videoPath = Common.validateVideoRequest(filename, res);
	if (!videoPath) return;
	try {
		const fileSize = fs.statSync(videoPath).size;
		const range$1 = req.headers.range;
		if (range$1) {
			const parts = range$1.replace(/bytes=/, "").split("-");
			const start = parseInt(parts[0], 10);
			const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
			if (start >= fileSize || end >= fileSize || start > end) {
				res.status(416).send("Requested range not satisfiable");
				return;
			}
			const chunksize = end - start + 1;
			const file = fs.createReadStream(videoPath, {
				start,
				end
			});
			const head = {
				"Content-Range": `bytes ${start}-${end}/${fileSize}`,
				"Accept-Ranges": "bytes",
				"Content-Length": chunksize,
				"Content-Type": "video/mp4"
			};
			res.writeHead(206, head);
			file.pipe(res);
			file.on("error", (err) => {
				logger.error(`读取视频文件流时出错 (Range: ${start}-${end}): ${err.message}`);
				if (!res.writableEnded) res.end();
			});
		} else {
			const head = {
				"Content-Length": fileSize,
				"Content-Type": "video/mp4",
				"Accept-Ranges": "bytes"
			};
			res.writeHead(200, head);
			const file = fs.createReadStream(videoPath);
			file.pipe(res);
			file.on("error", (err) => {
				logger.error(`读取视频文件流时出错 (Full): ${err.message}`);
				if (!res.headersSent) try {
					createNotFoundResponse(res, "读取视频文件时出错");
				} catch (e) {
					logger.error("发送读取错误响应失败:", e);
					if (!res.writableEnded) res.end();
				}
				else if (!res.writableEnded) res.end();
			});
		}
	} catch (error) {
		if (error.code === "ENOENT") {
			if (!res.headersSent) createNotFoundResponse(res, "视频文件未找到");
			else if (!res.writableEnded) res.end();
		} else {
			logger.error(`处理视频数据请求时发生错误: ${error.message}`);
			if (!res.headersSent) createNotFoundResponse(res, "服务器内部错误");
			else if (!res.writableEnded) res.end();
		}
	}
};
/** 返回包含 <video> 标签的 HTML */
const getVideoRouter = (req, res) => {
	const filename = req.params.filename;
	if (!Common.validateVideoRequest(filename, res)) return;
	const videoDataUrl = `/api/kkk/stream/${encodeURIComponent(filename)}`;
	const resPath = path.join(Root.pluginPath, "/resources") + "/".replace(/\\/g, "/");
	const htmlContent = template(path.join(resPath, "template", "videoView", "index.html"), {
		videoDataUrl,
		filename
	});
	res.setHeader("Content-Type", "text/html; charset=utf-8");
	res.send(htmlContent);
};
/**
* 获取链接重定向地址的路由处理器
* @param req 请求对象，期望body中包含link字段
* @param res 响应对象
*/
const getLongLinkRouter = async (req, res) => {
	try {
		const { link } = req.body;
		if (!link || typeof link !== "string") return createBadRequestResponse(res, "请提供有效的链接");
		const finalUrl = (await axios.get(link, { headers: { "User-Agent": "Apifox/1.0.0 (https://apifox.com)" } })).request.res.responseUrl;
		if (finalUrl.includes("获取链接重定向失败") || finalUrl.includes("403 Forbidden")) return createServerErrorResponse(res, "无法获取链接的重定向地址：" + finalUrl);
		let platform = "unknown";
		if (finalUrl.includes("douyin.com") || finalUrl.includes("iesdouyin.com") || finalUrl.includes("webcast.amemv.com") || finalUrl.includes("live.douyin.com")) platform = "douyin";
		else if (finalUrl.includes("bilibili.com") || finalUrl.includes("b23.tv")) platform = "bilibili";
		else if (finalUrl.includes("kuaishou.com") || finalUrl.includes("kwai.com") || finalUrl.includes("chenzhongtech.com")) platform = "kuaishou";
		createSuccessResponse(res, {
			originalUrl: link,
			finalUrl,
			platform
		});
		logger.debug(`链接重定向获取成功: ${link} -> ${platform}`);
	} catch (error) {
		logger.error(`链接重定向获取失败: ${error.message}`);
		res.status(500).json({
			success: false,
			message: "服务器内部错误",
			error: error.message
		});
	}
};
/**
* 抖音原始数据获取路由处理器
* @param req 请求对象
* @param res 响应对象
*/
const getDouyinDataRouter = async (req, res) => {
	const amagi = Client({ cookies: { douyin: Config.cookies.douyin } });
	try {
		const { dataType, params } = req.body;
		if (!dataType || !params) return createBadRequestResponse(res, "请提供数据类型和参数");
		createSuccessResponse(res, {
			data: (await amagi.getDouyinData(dataType, {
				...params,
				typeMode: "strict"
			})).data,
			platform: "douyin",
			dataType
		});
		logger.debug(`抖音数据获取成功: ${dataType}`);
	} catch (error) {
		logger.error(`抖音数据获取失败: ${error.message}`);
		res.status(500).json({
			success: false,
			message: "抖音数据获取失败",
			error: error.message
		});
	}
};
/**
* 哔哩哔哩原始数据获取路由处理器
* @param req 请求对象
* @param res 响应对象
*/
const getBilibiliDataRouter = async (req, res) => {
	const amagi = Client({ cookies: { bilibili: Config.cookies.bilibili } });
	try {
		const { dataType, params } = req.body;
		if (!dataType || !params) return createBadRequestResponse(res, "请提供数据类型和参数");
		createSuccessResponse(res, {
			data: (await amagi.getBilibiliData(dataType, {
				...params,
				typeMode: "strict"
			})).data,
			platform: "bilibili",
			dataType
		});
		logger.debug(`哔哩哔哩数据获取成功: ${dataType}`);
	} catch (error) {
		logger.error(`哔哩哔哩数据获取失败: ${error.message}`);
		res.status(500).json({
			success: false,
			message: "哔哩哔哩数据获取失败",
			error: error.message
		});
	}
};
/**
* 快手原始数据获取路由处理器
* @param req 请求对象
* @param res 响应对象
*/
const getKuaishouDataRouter = async (req, res) => {
	const amagi = Client({ cookies: { kuaishou: Config.cookies.kuaishou } });
	try {
		const { dataType, params } = req.body;
		if (!dataType || !params) return createBadRequestResponse(res, "请提供数据类型和参数");
		createSuccessResponse(res, {
			data: (await amagi.getKuaishouData(dataType, {
				...params,
				typeMode: "strict"
			})).data,
			platform: "kuaishou",
			dataType
		});
		logger.debug(`快手数据获取成功: ${dataType}`);
	} catch (error) {
		logger.error(`快手数据获取失败: ${error.message}`);
		res.status(500).json({
			success: false,
			message: "快手数据获取失败",
			error: error.message
		});
	}
};

//#endregion
//#region src/module/server/auth.ts
/**
* Base64解码
* @param str Base64编码的字符串
* @returns 解码后的字符串
*/
const base64Decode = (str) => {
	return Buffer.from(str, "base64").toString("utf8");
};
/**
* URL解码
* @param str URL编码的字符串
* @returns 解码后的字符串
*/
const urlDecode = (str) => {
	return decodeURIComponent(str);
};
/**
* 十六进制解码
* @param str 十六进制编码的字符串
* @returns 解码后的字符串
*/
const hexDecode = (str) => {
	return Buffer.from(str, "hex").toString("utf8");
};
/**
* 反转字符串
* @param str 待反转字符串
* @returns 反转后的字符串
*/
const reverseString = (str) => {
	return str.split("").reverse().join("");
};
/**
* 字符偏移解码
* @param str 编码的字符串
* @param offset 偏移量
* @returns 解码后的字符串
*/
const charOffsetDecode = (str, offset = 5) => {
	return str.split("").map((char) => {
		const code = char.charCodeAt(0);
		return String.fromCharCode(code - offset);
	}).join("");
};
/**
* 多层解码解密
* @param str 多层编码的字符串
* @returns 解码后的原始字符串
*/
const multiLayerDecode = (str) => {
	try {
		let decoded = base64Decode(str);
		decoded = urlDecode(decoded);
		decoded = base64Decode(decoded);
		decoded = reverseString(decoded);
		decoded = hexDecode(decoded);
		decoded = charOffsetDecode(decoded, 5);
		return decoded;
	} catch (error) {
		throw new Error("多层解码失败：" + error);
	}
};
/**
* HMAC-SHA256签名验证中间件
* @param req 请求对象
* @param res 响应对象
* @param next 下一个中间件函数
*/
const signatureVerificationMiddleware = (req, res, next) => {
	try {
		const encodedSignature = req.headers["x-signature"];
		const timestamp = req.headers["x-timestamp"];
		const nonce = req.headers["x-nonce"];
		const token = req.headers["authorization"]?.replace("Bearer ", "") || "";
		if (!encodedSignature || !timestamp || !nonce) return createBadRequestResponse(res, "缺少必要的签名参数");
		const currentTime = Date.now();
		const requestTime = parseInt(timestamp);
		if (Math.abs(currentTime - requestTime) > 300 * 1e3) return createBadRequestResponse(res, "请求时间戳已过期");
		let decodedSignature;
		try {
			decodedSignature = multiLayerDecode(encodedSignature);
		} catch (error) {
			return createBadRequestResponse(res, "签名格式错误：" + error);
		}
		const signatureString = `${req.method.toUpperCase()}|${req.headers["x-original-url"] || req.originalUrl}|${req.method === "GET" ? "" : JSON.stringify(req.body || {})}|${timestamp}|${nonce}`;
		const expectedSignature = crypto.createHmac("sha256", token).update(signatureString).digest("hex");
		if (decodedSignature !== expectedSignature) {
			logger.warn(`签名验证失败: 期望=${expectedSignature}, 解码后实际=${decodedSignature}, 签名字符串=${signatureString}`);
			return createBadRequestResponse(res, "签名验证失败");
		}
		next();
	} catch (error) {
		logger.error("签名验证中间件错误:", error);
		return createServerErrorResponse(res, "签名验证失败");
	}
};

//#endregion
//#region src/module/server/content-router.ts
/**
* 获取所有已订阅推送功能的群组列表
* @param req 请求对象
* @param res 响应对象
*/
const getGroupsRouter = async (req, res) => {
	try {
		const douyinDB = await getDouyinDB();
		const bilibiliDB = await getBilibiliDB();
		const [douyinGroups, bilibiliGroups] = await Promise.all([douyinDB.groupRepository.find(), bilibiliDB.groupRepository.find()]);
		const allGroupsMap = /* @__PURE__ */ new Map();
		douyinGroups.forEach((group) => {
			allGroupsMap.set(group.id, {
				id: group.id,
				botId: group.botId
			});
		});
		bilibiliGroups.forEach((group) => {
			if (!allGroupsMap.has(group.id)) allGroupsMap.set(group.id, {
				id: group.id,
				botId: group.botId
			});
		});
		const groupList = [];
		for (const group of allGroupsMap.values()) {
			const douyinSubscriptions = await douyinDB.getGroupSubscriptions(group.id);
			const bilibiliSubscriptions = await bilibiliDB.getGroupSubscriptions(group.id);
			if (douyinSubscriptions.length > 0 || bilibiliSubscriptions.length > 0) {
				const bot = getBot(group.botId);
				const groupInfo = await bot.getGroupInfo(group.id);
				const groupAvatarUrl = await bot.getGroupAvatarUrl(group.id);
				groupList.push({
					id: group.id,
					name: groupInfo.groupName || `群组${group.id}`,
					avatar: groupAvatarUrl,
					botId: group.botId,
					subscriptionCount: {
						douyin: douyinSubscriptions.length,
						bilibili: bilibiliSubscriptions.length
					}
				});
			}
		}
		return createSuccessResponse(res, groupList);
	} catch (error) {
		logger.error("获取群组列表失败:", error);
		return createServerErrorResponse(res, "获取群组列表失败");
	}
};
/**
* 获取群组的作者选项列表
* @param req 请求对象
* @param res 响应对象
*/
const getAuthorsRouter = async (req, res) => {
	try {
		const { groupId } = req.query;
		if (!groupId) return createBadRequestResponse(res, "请提供群组ID");
		const douyinDB = await getDouyinDB();
		const bilibiliDB = await getBilibiliDB();
		const [douyinSubscriptions, bilibiliSubscriptions] = await Promise.all([douyinDB.getGroupSubscriptions(groupId), bilibiliDB.getGroupSubscriptions(groupId)]);
		/**
		* 并发获取抖音用户数据
		* @param subscriptions 抖音订阅列表
		* @returns Promise<AuthorOption[]> 作者选项数组
		*/
		const fetchDouyinAuthors = async (subscriptions) => {
			const validSubscriptions = subscriptions.filter((sub) => sub.douyinUser);
			if (validSubscriptions.length === 0) return [];
			const batchSize = 5;
			const results = [];
			for (let i = 0; i < validSubscriptions.length; i += batchSize) {
				const batchPromises = validSubscriptions.slice(i, i + batchSize).map(async (subscription) => {
					try {
						const userProfile = await getDouyinData("用户主页数据", {
							sec_uid: subscription.douyinUser.sec_uid,
							typeMode: "strict"
						}, Config.cookies.douyin);
						return {
							id: subscription.douyinUser.sec_uid,
							name: subscription.douyinUser.remark || subscription.douyinUser.short_id || subscription.douyinUser.sec_uid,
							avatar: userProfile.data.user.avatar_larger.url_list[0],
							platform: "douyin"
						};
					} catch (error) {
						logger.warn(`获取抖音用户数据失败 (${subscription.douyinUser.sec_uid}):`, error);
						return {
							id: subscription.douyinUser.sec_uid,
							name: subscription.douyinUser.remark || subscription.douyinUser.short_id || subscription.douyinUser.sec_uid,
							avatar: "",
							platform: "douyin"
						};
					}
				});
				const batchResults = await Promise.all(batchPromises);
				results.push(...batchResults);
			}
			return results;
		};
		/**
		* 并发获取B站用户数据
		* @param subscriptions B站订阅列表
		* @returns Promise<AuthorOption[]> 作者选项数组
		*/
		const fetchBilibiliAuthors = async (subscriptions) => {
			const validSubscriptions = subscriptions.filter((sub) => sub.bilibiliUser);
			if (validSubscriptions.length === 0) return [];
			const batchSize = 5;
			const results = [];
			for (let i = 0; i < validSubscriptions.length; i += batchSize) {
				const batchPromises = validSubscriptions.slice(i, i + batchSize).map(async (subscription) => {
					try {
						const userProfile = await getBilibiliData("用户主页数据", {
							host_mid: subscription.bilibiliUser.host_mid,
							typeMode: "strict"
						}, Config.cookies.bilibili);
						return {
							id: subscription.bilibiliUser.host_mid.toString(),
							name: subscription.bilibiliUser.remark || subscription.bilibiliUser.host_mid.toString(),
							avatar: userProfile.data.data.card.face,
							platform: "bilibili"
						};
					} catch (error) {
						logger.warn(`获取B站用户数据失败 (${subscription.bilibiliUser.host_mid}):`, error);
						return {
							id: subscription.bilibiliUser.host_mid.toString(),
							name: subscription.bilibiliUser.remark || subscription.bilibiliUser.host_mid.toString(),
							avatar: "",
							platform: "bilibili"
						};
					}
				});
				const batchResults = await Promise.all(batchPromises);
				results.push(...batchResults);
			}
			return results;
		};
		const [douyinAuthors, bilibiliAuthors] = await Promise.all([fetchDouyinAuthors(douyinSubscriptions), fetchBilibiliAuthors(bilibiliSubscriptions)]);
		return createSuccessResponse(res, [...douyinAuthors, ...bilibiliAuthors]);
	} catch (error) {
		logger.error("获取作者列表失败:", error);
		return createServerErrorResponse(res, "获取作者列表失败");
	}
};
/**
* 获取抖音内容列表的路由处理器
* @param req 请求对象
* @param res 响应对象
*/
const getDouyinContentRouter = async (req, res) => {
	try {
		const { groupId } = req.query;
		if (!groupId) return createBadRequestResponse(res, "请提供群组ID");
		const caches = await (await getDouyinDB()).awemeCacheRepository.find({
			where: { groupId },
			relations: ["douyinUser"],
			order: { createdAt: "DESC" },
			take: 100
		});
		return createSuccessResponse(res, await Promise.all(caches.map(async (cache) => {
			let authorName = cache.sec_uid;
			if (cache.douyinUser) authorName = cache.douyinUser.remark || cache.douyinUser.short_id || cache.douyinUser.sec_uid;
			const userProfile = await getDouyinData("用户主页数据", {
				sec_uid: cache.douyinUser.sec_uid,
				typeMode: "strict"
			}, Config.cookies.douyin);
			return {
				id: cache.aweme_id,
				platform: "douyin",
				title: `抖音作品 ${cache.aweme_id}`,
				author: authorName,
				avatar: userProfile.data?.user?.avatar_larger?.url_list[0] || "",
				publishTime: cache.createdAt.toISOString(),
				thumbnail: "",
				type: "video",
				isBlocked: false,
				pushStatus: "success",
				createdAt: cache.createdAt.toISOString()
			};
		})));
	} catch (error) {
		logger.error("获取抖音内容列表失败:", error);
		return createServerErrorResponse(res, "获取抖音内容列表失败: " + error);
	}
};
/**
* 获取B站内容列表的路由处理器
* @param req 请求对象
* @param res 响应对象
*/
const getBilibiliContentRouter = async (req, res) => {
	try {
		const { groupId } = req.query;
		if (!groupId) return createBadRequestResponse(res, "请提供群组ID");
		const caches = await (await getBilibiliDB()).dynamicCacheRepository.find({
			where: { groupId },
			relations: ["bilibiliUser"],
			order: { createdAt: "DESC" },
			take: 100
		});
		return createSuccessResponse(res, await Promise.all(caches.map(async (cache) => {
			let authorName = cache.host_mid.toString();
			if (cache.bilibiliUser) authorName = cache.bilibiliUser.remark || cache.host_mid.toString();
			const userProfile = await getBilibiliData("用户主页数据", {
				host_mid: cache.host_mid,
				typeMode: "strict"
			}, Config.cookies.bilibili);
			return {
				id: cache.dynamic_id,
				platform: "bilibili",
				title: `B站动态 ${cache.dynamic_id}`,
				author: authorName,
				avatar: userProfile.data?.data?.card?.face || "",
				publishTime: cache.createdAt.toISOString(),
				thumbnail: "",
				type: "dynamic",
				isBlocked: false,
				pushStatus: "success",
				createdAt: cache.createdAt.toISOString()
			};
		})));
	} catch (error) {
		logger.error("获取B站内容列表失败:", error);
		return createServerErrorResponse(res, "获取B站内容列表失败: " + error);
	}
};
/**
* 添加抖音内容的路由处理器
* @param req 请求对象
* @param res 响应对象
*/
const addDouyinContentRouter = async (req, res) => {
	try {
		const { contentId, groupId, authorId } = req.body;
		if (!contentId || !groupId || !authorId) return createBadRequestResponse(res, "请提供内容ID、群组ID和作者ID");
		await (await getDouyinDB()).addAwemeCache(contentId, authorId, groupId);
		return createSuccessResponse(res, { message: "添加成功" });
	} catch (error) {
		logger.error("添加抖音内容失败:", error);
		return createServerErrorResponse(res, "添加抖音内容失败");
	}
};
/**
* 添加B站内容的路由处理器
* @param req 请求对象
* @param res 响应对象
*/
const addBilibiliContentRouter = async (req, res) => {
	try {
		const { contentId, groupId, authorId } = req.body;
		if (!contentId || !groupId || !authorId) return createBadRequestResponse(res, "请提供内容ID、群组ID和作者ID");
		const bilibiliDB = await getBilibiliDB();
		const host_mid = parseInt(authorId);
		await bilibiliDB.addDynamicCache(contentId, host_mid, groupId, "manual");
		return createSuccessResponse(res, { message: "添加成功" });
	} catch (error) {
		logger.error("添加B站内容失败:", error);
		return createServerErrorResponse(res, "添加B站内容失败");
	}
};
/**
* 删除内容的路由处理器
* @param req 请求对象
* @param res 响应对象
*/
const deleteContentRouter = async (req, res) => {
	try {
		const { id, platform, groupId } = req.body;
		if (!id || !platform || !groupId) return createBadRequestResponse(res, "请提供内容ID、平台类型和群组ID");
		if (platform === "douyin") await (await getDouyinDB()).awemeCacheRepository.delete({
			aweme_id: id,
			groupId
		});
		else if (platform === "bilibili") await (await getBilibiliDB()).dynamicCacheRepository.delete({
			dynamic_id: id,
			groupId
		});
		return createSuccessResponse(res, { message: "删除成功" });
	} catch (error) {
		logger.error("删除内容失败:", error);
		return createServerErrorResponse(res, "删除内容失败");
	}
};

//#endregion
//#region src/index.ts
const { initAllDatabases } = await import("./chunks/db-DoTFoR3I.js");
await initAllDatabases();
const server = express();
const proxyOptions = {
	target: "https://developer.huawei.com",
	changeOrigin: true
};
server.use(import_lib$1.default());
server.use("/", import_dist.createProxyMiddleware(proxyOptions));
server.listen(3780);
const app$1 = express.Router();
app$1.use(express.json());
app$1.use(express.urlencoded({ extended: true }));
if (Config.app.APIServer && Config.app.APIServerMount) {
	app$1.use(logMiddleware([
		"/api/bilibili",
		"/api/douyin",
		"/api/kuaishou"
	]));
	app$1.use("/amagi/api/bilibili", createBilibiliRoutes(Config.cookies.bilibili));
	app$1.use("/amagi/api/douyin", createDouyinRoutes(Config.cookies.douyin));
	app$1.use("/amagi/api/kuaishou", createKuaishouRoutes(Config.cookies.kuaishou));
	logger$1.mark(`Amagi server listening on ${logger$1.green("http://localhost:")}${logger$1.green(process.env.HTTP_PORT)} API docs: ${logger$1.yellow("https://amagi.apifox.cn")}`);
} else if (Config.app.APIServer) new Client({ cookies: {
	bilibili: Config.cookies.bilibili,
	douyin: Config.cookies.douyin,
	kuaishou: Config.cookies.kuaishou
} }).startServer(Config.app.APIServerPort);
app$1.get("/stream/:filename", videoStreamRouter);
app$1.get("/video/:filename", getVideoRouter);
const middleware = Config.app.webAuth ? [authMiddleware, signatureVerificationMiddleware] : [];
app$1.use("/getLongLink", ...middleware, getLongLinkRouter);
app$1.use("/douyin/data", ...middleware, getDouyinDataRouter);
app$1.use("/bilibili/data", ...middleware, getBilibiliDataRouter);
app$1.use("/kuaishou/data", ...middleware, getKuaishouDataRouter);
app$1.get("/content/douyin", authMiddleware, signatureVerificationMiddleware, getDouyinContentRouter);
app$1.get("/content/bilibili", authMiddleware, signatureVerificationMiddleware, getBilibiliContentRouter);
app$1.get("/groups", authMiddleware, signatureVerificationMiddleware, getGroupsRouter);
app$1.get("/authors", authMiddleware, signatureVerificationMiddleware, getAuthorsRouter);
app$1.post("/content/douyin", authMiddleware, signatureVerificationMiddleware, addDouyinContentRouter);
app$1.post("/content/bilibili", authMiddleware, signatureVerificationMiddleware, addBilibiliContentRouter);
app$1.post("/content/delete", authMiddleware, signatureVerificationMiddleware, deleteContentRouter);
const staticRouter = express.Router();
staticRouter.use(express.static(path.join(Root.pluginPath, "lib", "web_chunk"), {
	redirect: false,
	setHeaders: (res, path$4) => {
		if (path$4.endsWith(".html")) res.setHeader("Cache-Control", "no-cache");
		else res.setHeader("Cache-Control", "public, max-age=31536000");
	}
}));
staticRouter.use((0, import_lib.default)({
	htmlAcceptHeaders: ["text/html", "application/xhtml+xml"],
	rewrites: [{
		from: /^\/kkk\/(?!.*\.[a-zA-Z0-9]+$).*$/,
		to: "/kkk/index.html"
	}],
	disableDotRule: true
}));
staticRouter.use(express.static(path.join(Root.pluginPath, "lib", "web_chunk"), { redirect: false }));
/** 将子路由挂载到主路由上 */
app.use("/kkk", staticRouter);
app.use("/api/kkk", app$1);
mkdirSync$1(`${`${karinPathBase}/${Root.pluginName}`}/data`);
mkdirSync$1(Common.tempDri.images);
mkdirSync$1(Common.tempDri.video);
console.log("");
console.log("-------------------------- karin-plugin-kkk --------------------------");
logger.info(`${logger.violet(`[插件:v${Root.pluginVersion}]`)} ${logger.green(Root.pluginName)} 初始化完成~`);
logger.info(`${logger.violet("[server]")} ${logger.yellow("外部解析页面:")} ${logger.green(`http://127.0.0.1:${process.env.HTTP_PORT}/kkk/`)}`);
logger.info(`${logger.violet("[server]")} ${logger.yellow("推送历史管理:")} ${logger.green(`http://127.0.0.1:${process.env.HTTP_PORT}/kkk/database`)}`);
console.log("-------------------------- karin-plugin-kkk --------------------------");
console.log("");

//#endregion
export { webConfig };