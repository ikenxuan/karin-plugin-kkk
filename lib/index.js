import { C as Common, a as Config, l as logMiddleware, r as registerBilibiliRoutes, b as registerDouyinRoutes, c as registerKuaishouRoutes, d as logger$2, e as Client } from "./chunk/index-BF46zgOs.js";
import require$$0 from "util";
import require$$0$1 from "url";
import require$$1 from "http";
import require$$2 from "https";
import stream from "stream";
import require$$5 from "assert";
import require$$1$1 from "path";
import zlib from "zlib";
import require$$6$1 from "querystring";
import { logger as logger$1, createNotFoundResponse, app, mkdirSync } from "node-karin";
import express from "node-karin/express";
import { karinPathBase } from "node-karin/root";
import "sequelize";
import { Version } from "./Version.js";
import fs$1 from "node:fs";
import "node-karin/axios";
import "stream/promises";
import path from "node:path";
import fs from "fs";
import require$$1$1$1 from "os";
var lib = { exports: {} };
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var objectAssign;
var hasRequiredObjectAssign;
function requireObjectAssign() {
  if (hasRequiredObjectAssign) return objectAssign;
  hasRequiredObjectAssign = 1;
  var getOwnPropertySymbols = Object.getOwnPropertySymbols;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var propIsEnumerable = Object.prototype.propertyIsEnumerable;
  function toObject(val) {
    if (val === null || val === void 0) {
      throw new TypeError("Object.assign cannot be called with null or undefined");
    }
    return Object(val);
  }
  function shouldUseNative() {
    try {
      if (!Object.assign) {
        return false;
      }
      var test1 = new String("abc");
      test1[5] = "de";
      if (Object.getOwnPropertyNames(test1)[0] === "5") {
        return false;
      }
      var test2 = {};
      for (var i = 0; i < 10; i++) {
        test2["_" + String.fromCharCode(i)] = i;
      }
      var order2 = Object.getOwnPropertyNames(test2).map(function(n) {
        return test2[n];
      });
      if (order2.join("") !== "0123456789") {
        return false;
      }
      var test3 = {};
      "abcdefghijklmnopqrst".split("").forEach(function(letter) {
        test3[letter] = letter;
      });
      if (Object.keys(Object.assign({}, test3)).join("") !== "abcdefghijklmnopqrst") {
        return false;
      }
      return true;
    } catch (err) {
      return false;
    }
  }
  objectAssign = shouldUseNative() ? Object.assign : function(target, source) {
    var from;
    var to = toObject(target);
    var symbols;
    for (var s = 1; s < arguments.length; s++) {
      from = Object(arguments[s]);
      for (var key in from) {
        if (hasOwnProperty.call(from, key)) {
          to[key] = from[key];
        }
      }
      if (getOwnPropertySymbols) {
        symbols = getOwnPropertySymbols(from);
        for (var i = 0; i < symbols.length; i++) {
          if (propIsEnumerable.call(from, symbols[i])) {
            to[symbols[i]] = from[symbols[i]];
          }
        }
      }
    }
    return to;
  };
  return objectAssign;
}
var vary = { exports: {} };
/*!
 * vary
 * Copyright(c) 2014-2017 Douglas Christopher Wilson
 * MIT Licensed
 */
var hasRequiredVary;
function requireVary() {
  if (hasRequiredVary) return vary.exports;
  hasRequiredVary = 1;
  vary.exports = vary$1;
  vary.exports.append = append;
  var FIELD_NAME_REGEXP = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/;
  function append(header, field) {
    if (typeof header !== "string") {
      throw new TypeError("header argument is required");
    }
    if (!field) {
      throw new TypeError("field argument is required");
    }
    var fields = !Array.isArray(field) ? parse(String(field)) : field;
    for (var j = 0; j < fields.length; j++) {
      if (!FIELD_NAME_REGEXP.test(fields[j])) {
        throw new TypeError("field argument contains an invalid header name");
      }
    }
    if (header === "*") {
      return header;
    }
    var val = header;
    var vals = parse(header.toLowerCase());
    if (fields.indexOf("*") !== -1 || vals.indexOf("*") !== -1) {
      return "*";
    }
    for (var i = 0; i < fields.length; i++) {
      var fld = fields[i].toLowerCase();
      if (vals.indexOf(fld) === -1) {
        vals.push(fld);
        val = val ? val + ", " + fields[i] : fields[i];
      }
    }
    return val;
  }
  function parse(header) {
    var end = 0;
    var list = [];
    var start = 0;
    for (var i = 0, len = header.length; i < len; i++) {
      switch (header.charCodeAt(i)) {
        case 32:
          if (start === end) {
            start = end = i + 1;
          }
          break;
        case 44:
          list.push(header.substring(start, end));
          start = end = i + 1;
          break;
        default:
          end = i + 1;
          break;
      }
    }
    list.push(header.substring(start, end));
    return list;
  }
  function vary$1(res, field) {
    if (!res || !res.getHeader || !res.setHeader) {
      throw new TypeError("res argument is required");
    }
    var val = res.getHeader("Vary") || "";
    var header = Array.isArray(val) ? val.join(", ") : String(val);
    if (val = append(header, field)) {
      res.setHeader("Vary", val);
    }
  }
  return vary.exports;
}
var hasRequiredLib;
function requireLib() {
  if (hasRequiredLib) return lib.exports;
  hasRequiredLib = 1;
  (function() {
    var assign = requireObjectAssign();
    var vary2 = requireVary();
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
        for (var i = 0; i < allowedOrigin.length; ++i) {
          if (isOriginAllowed(origin, allowedOrigin[i])) {
            return true;
          }
        }
        return false;
      } else if (isString(allowedOrigin)) {
        return origin === allowedOrigin;
      } else if (allowedOrigin instanceof RegExp) {
        return allowedOrigin.test(origin);
      } else {
        return !!allowedOrigin;
      }
    }
    function configureOrigin(options, req) {
      var requestOrigin = req.headers.origin, headers = [], isAllowed;
      if (!options.origin || options.origin === "*") {
        headers.push([{
          key: "Access-Control-Allow-Origin",
          value: "*"
        }]);
      } else if (isString(options.origin)) {
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
      if (methods.join) {
        methods = options.methods.join(",");
      }
      return {
        key: "Access-Control-Allow-Methods",
        value: methods
      };
    }
    function configureCredentials(options) {
      if (options.credentials === true) {
        return {
          key: "Access-Control-Allow-Credentials",
          value: "true"
        };
      }
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
      } else if (allowedHeaders.join) {
        allowedHeaders = allowedHeaders.join(",");
      }
      if (allowedHeaders && allowedHeaders.length) {
        headers.push([{
          key: "Access-Control-Allow-Headers",
          value: allowedHeaders
        }]);
      }
      return headers;
    }
    function configureExposedHeaders(options) {
      var headers = options.exposedHeaders;
      if (!headers) {
        return null;
      } else if (headers.join) {
        headers = headers.join(",");
      }
      if (headers && headers.length) {
        return {
          key: "Access-Control-Expose-Headers",
          value: headers
        };
      }
      return null;
    }
    function configureMaxAge(options) {
      var maxAge = (typeof options.maxAge === "number" || options.maxAge) && options.maxAge.toString();
      if (maxAge && maxAge.length) {
        return {
          key: "Access-Control-Max-Age",
          value: maxAge
        };
      }
      return null;
    }
    function applyHeaders(headers, res) {
      for (var i = 0, n = headers.length; i < n; i++) {
        var header = headers[i];
        if (header) {
          if (Array.isArray(header)) {
            applyHeaders(header, res);
          } else if (header.key === "Vary" && header.value) {
            vary2(res, header.value);
          } else if (header.value) {
            res.setHeader(header.key, header.value);
          }
        }
      }
    }
    function cors(options, req, res, next) {
      var headers = [], method = req.method && req.method.toUpperCase && req.method.toUpperCase();
      if (method === "OPTIONS") {
        headers.push(configureOrigin(options, req));
        headers.push(configureCredentials(options));
        headers.push(configureMethods(options));
        headers.push(configureAllowedHeaders(options, req));
        headers.push(configureMaxAge(options));
        headers.push(configureExposedHeaders(options));
        applyHeaders(headers, res);
        if (options.preflightContinue) {
          next();
        } else {
          res.statusCode = options.optionsSuccessStatus;
          res.setHeader("Content-Length", "0");
          res.end();
        }
      } else {
        headers.push(configureOrigin(options, req));
        headers.push(configureCredentials(options));
        headers.push(configureExposedHeaders(options));
        applyHeaders(headers, res);
        next();
      }
    }
    function middlewareWrapper(o) {
      var optionsCallback = null;
      if (typeof o === "function") {
        optionsCallback = o;
      } else {
        optionsCallback = function(req, cb) {
          cb(null, o);
        };
      }
      return function corsMiddleware(req, res, next) {
        optionsCallback(req, function(err, options) {
          if (err) {
            next(err);
          } else {
            var corsOptions = assign({}, defaults, options);
            var originCallback = null;
            if (corsOptions.origin && typeof corsOptions.origin === "function") {
              originCallback = corsOptions.origin;
            } else if (corsOptions.origin) {
              originCallback = function(origin, cb) {
                cb(null, corsOptions.origin);
              };
            }
            if (originCallback) {
              originCallback(req.headers.origin, function(err2, origin) {
                if (err2 || !origin) {
                  next(err2);
                } else {
                  corsOptions.origin = origin;
                  cors(corsOptions, req, res, next);
                }
              });
            } else {
              next();
            }
          }
        });
      };
    }
    lib.exports = middlewareWrapper;
  })();
  return lib.exports;
}
var libExports = requireLib();
var dist = {};
var factory = {};
var httpProxyMiddleware = {};
var httpProxy$2 = { exports: {} };
var eventemitter3 = { exports: {} };
var hasRequiredEventemitter3;
function requireEventemitter3() {
  if (hasRequiredEventemitter3) return eventemitter3.exports;
  hasRequiredEventemitter3 = 1;
  (function(module) {
    var has = Object.prototype.hasOwnProperty, prefix = "~";
    function Events() {
    }
    if (Object.create) {
      Events.prototype = /* @__PURE__ */ Object.create(null);
      if (!new Events().__proto__) prefix = false;
    }
    function EE(fn, context, once) {
      this.fn = fn;
      this.context = context;
      this.once = once || false;
    }
    function addListener(emitter, event, fn, context, once) {
      if (typeof fn !== "function") {
        throw new TypeError("The listener must be a function");
      }
      var listener = new EE(fn, context || emitter, once), evt = prefix ? prefix + event : event;
      if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
      else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
      else emitter._events[evt] = [emitter._events[evt], listener];
      return emitter;
    }
    function clearEvent(emitter, evt) {
      if (--emitter._eventsCount === 0) emitter._events = new Events();
      else delete emitter._events[evt];
    }
    function EventEmitter() {
      this._events = new Events();
      this._eventsCount = 0;
    }
    EventEmitter.prototype.eventNames = function eventNames() {
      var names = [], events, name;
      if (this._eventsCount === 0) return names;
      for (name in events = this._events) {
        if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
      }
      if (Object.getOwnPropertySymbols) {
        return names.concat(Object.getOwnPropertySymbols(events));
      }
      return names;
    };
    EventEmitter.prototype.listeners = function listeners(event) {
      var evt = prefix ? prefix + event : event, handlers2 = this._events[evt];
      if (!handlers2) return [];
      if (handlers2.fn) return [handlers2.fn];
      for (var i = 0, l = handlers2.length, ee = new Array(l); i < l; i++) {
        ee[i] = handlers2[i].fn;
      }
      return ee;
    };
    EventEmitter.prototype.listenerCount = function listenerCount(event) {
      var evt = prefix ? prefix + event : event, listeners = this._events[evt];
      if (!listeners) return 0;
      if (listeners.fn) return 1;
      return listeners.length;
    };
    EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt]) return false;
      var listeners = this._events[evt], len = arguments.length, args, i;
      if (listeners.fn) {
        if (listeners.once) this.removeListener(event, listeners.fn, void 0, true);
        switch (len) {
          case 1:
            return listeners.fn.call(listeners.context), true;
          case 2:
            return listeners.fn.call(listeners.context, a1), true;
          case 3:
            return listeners.fn.call(listeners.context, a1, a2), true;
          case 4:
            return listeners.fn.call(listeners.context, a1, a2, a3), true;
          case 5:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
          case 6:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
        }
        for (i = 1, args = new Array(len - 1); i < len; i++) {
          args[i - 1] = arguments[i];
        }
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
              if (!args) for (j = 1, args = new Array(len - 1); j < len; j++) {
                args[j - 1] = arguments[j];
              }
              listeners[i].fn.apply(listeners[i].context, args);
          }
        }
      }
      return true;
    };
    EventEmitter.prototype.on = function on(event, fn, context) {
      return addListener(this, event, fn, context, false);
    };
    EventEmitter.prototype.once = function once(event, fn, context) {
      return addListener(this, event, fn, context, true);
    };
    EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt]) return this;
      if (!fn) {
        clearEvent(this, evt);
        return this;
      }
      var listeners = this._events[evt];
      if (listeners.fn) {
        if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) {
          clearEvent(this, evt);
        }
      } else {
        for (var i = 0, events = [], length = listeners.length; i < length; i++) {
          if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) {
            events.push(listeners[i]);
          }
        }
        if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
        else clearEvent(this, evt);
      }
      return this;
    };
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
    {
      module.exports = EventEmitter;
    }
  })(eventemitter3);
  return eventemitter3.exports;
}
var common$1 = {};
var requiresPort;
var hasRequiredRequiresPort;
function requireRequiresPort() {
  if (hasRequiredRequiresPort) return requiresPort;
  hasRequiredRequiresPort = 1;
  requiresPort = function required(port, protocol) {
    protocol = protocol.split(":")[0];
    port = +port;
    if (!port) return false;
    switch (protocol) {
      case "http":
      case "ws":
        return port !== 80;
      case "https":
      case "wss":
        return port !== 443;
      case "ftp":
        return port !== 21;
      case "gopher":
        return port !== 70;
      case "file":
        return false;
    }
    return port !== 0;
  };
  return requiresPort;
}
var hasRequiredCommon$1;
function requireCommon$1() {
  if (hasRequiredCommon$1) return common$1;
  hasRequiredCommon$1 = 1;
  (function(exports) {
    var common2 = exports, url = require$$0$1, extend = require$$0._extend, required = requireRequiresPort();
    var upgradeHeader = /(^|,)\s*upgrade\s*($|,)/i, isSSL = /^https|wss/;
    common2.isSSL = isSSL;
    common2.setupOutgoing = function(outgoing, options, req, forward) {
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
      ].forEach(
        function(e) {
          outgoing[e] = options[forward || "target"][e];
        }
      );
      outgoing.method = options.method || req.method;
      outgoing.headers = extend({}, req.headers);
      if (options.headers) {
        extend(outgoing.headers, options.headers);
      }
      if (options.auth) {
        outgoing.auth = options.auth;
      }
      if (options.ca) {
        outgoing.ca = options.ca;
      }
      if (isSSL.test(options[forward || "target"].protocol)) {
        outgoing.rejectUnauthorized = typeof options.secure === "undefined" ? true : options.secure;
      }
      outgoing.agent = options.agent || false;
      outgoing.localAddress = options.localAddress;
      if (!outgoing.agent) {
        outgoing.headers = outgoing.headers || {};
        if (typeof outgoing.headers.connection !== "string" || !upgradeHeader.test(outgoing.headers.connection)) {
          outgoing.headers.connection = "close";
        }
      }
      var target = options[forward || "target"];
      var targetPath = target && options.prependPath !== false ? target.path || "" : "";
      var outgoingPath = !options.toProxy ? url.parse(req.url).path || "" : req.url;
      outgoingPath = !options.ignorePath ? outgoingPath : "";
      outgoing.path = common2.urlJoin(targetPath, outgoingPath);
      if (options.changeOrigin) {
        outgoing.headers.host = required(outgoing.port, options[forward || "target"].protocol) && !hasPort(outgoing.host) ? outgoing.host + ":" + outgoing.port : outgoing.host;
      }
      return outgoing;
    };
    common2.setupSocket = function(socket) {
      socket.setTimeout(0);
      socket.setNoDelay(true);
      socket.setKeepAlive(true, 0);
      return socket;
    };
    common2.getPort = function(req) {
      var res = req.headers.host ? req.headers.host.match(/:(\d+)/) : "";
      return res ? res[1] : common2.hasEncryptedConnection(req) ? "443" : "80";
    };
    common2.hasEncryptedConnection = function(req) {
      return Boolean(req.connection.encrypted || req.connection.pair);
    };
    common2.urlJoin = function() {
      var args = Array.prototype.slice.call(arguments), lastIndex = args.length - 1, last = args[lastIndex], lastSegs = last.split("?"), retSegs;
      args[lastIndex] = lastSegs.shift();
      retSegs = [
        args.filter(Boolean).join("/").replace(/\/+/g, "/").replace("http:/", "http://").replace("https:/", "https://")
      ];
      retSegs.push.apply(retSegs, lastSegs);
      return retSegs.join("?");
    };
    common2.rewriteCookieProperty = function rewriteCookieProperty(header, config, property) {
      if (Array.isArray(header)) {
        return header.map(function(headerElement) {
          return rewriteCookieProperty(headerElement, config, property);
        });
      }
      return header.replace(new RegExp("(;\\s*" + property + "=)([^;]+)", "i"), function(match, prefix, previousValue) {
        var newValue;
        if (previousValue in config) {
          newValue = config[previousValue];
        } else if ("*" in config) {
          newValue = config["*"];
        } else {
          return match;
        }
        if (newValue) {
          return prefix + newValue;
        } else {
          return "";
        }
      });
    };
    function hasPort(host) {
      return !!~host.indexOf(":");
    }
  })(common$1);
  return common$1;
}
var webOutgoing;
var hasRequiredWebOutgoing;
function requireWebOutgoing() {
  if (hasRequiredWebOutgoing) return webOutgoing;
  hasRequiredWebOutgoing = 1;
  var url = require$$0$1, common2 = requireCommon$1();
  var redirectRegex = /^201|30(1|2|7|8)$/;
  /*!
   * Array of passes.
   *
   * A `pass` is just a function that is executed on `req, res, options`
   * so that you can easily add new checks while still keeping the base
   * flexible.
   */
  webOutgoing = {
    // <--
    /**
     * If is a HTTP 1.0 request, remove chunk headers
     *
     * @param {ClientRequest} Req Request object
     * @param {IncomingMessage} Res Response object
     * @param {proxyResponse} Res Response object from the proxy request
     *
     * @api private
     */
    removeChunked: function removeChunked(req, res, proxyRes) {
      if (req.httpVersion === "1.0") {
        delete proxyRes.headers["transfer-encoding"];
      }
    },
    /**
     * If is a HTTP 1.0 request, set the correct connection header
     * or if connection header not present, then use `keep-alive`
     *
     * @param {ClientRequest} Req Request object
     * @param {IncomingMessage} Res Response object
     * @param {proxyResponse} Res Response object from the proxy request
     *
     * @api private
     */
    setConnection: function setConnection(req, res, proxyRes) {
      if (req.httpVersion === "1.0") {
        proxyRes.headers.connection = req.headers.connection || "close";
      } else if (req.httpVersion !== "2.0" && !proxyRes.headers.connection) {
        proxyRes.headers.connection = req.headers.connection || "keep-alive";
      }
    },
    setRedirectHostRewrite: function setRedirectHostRewrite(req, res, proxyRes, options) {
      if ((options.hostRewrite || options.autoRewrite || options.protocolRewrite) && proxyRes.headers["location"] && redirectRegex.test(proxyRes.statusCode)) {
        var target = url.parse(options.target);
        var u = url.parse(proxyRes.headers["location"]);
        if (target.host != u.host) {
          return;
        }
        if (options.hostRewrite) {
          u.host = options.hostRewrite;
        } else if (options.autoRewrite) {
          u.host = req.headers["host"];
        }
        if (options.protocolRewrite) {
          u.protocol = options.protocolRewrite;
        }
        proxyRes.headers["location"] = u.format();
      }
    },
    /**
     * Copy headers from proxyResponse to response
     * set each header in response object.
     *
     * @param {ClientRequest} Req Request object
     * @param {IncomingMessage} Res Response object
     * @param {proxyResponse} Res Response object from the proxy request
     * @param {Object} Options options.cookieDomainRewrite: Config to rewrite cookie domain
     *
     * @api private
     */
    writeHeaders: function writeHeaders(req, res, proxyRes, options) {
      var rewriteCookieDomainConfig = options.cookieDomainRewrite, rewriteCookiePathConfig = options.cookiePathRewrite, preserveHeaderKeyCase = options.preserveHeaderKeyCase, rawHeaderKeyMap, setHeader = function(key2, header) {
        if (header == void 0) return;
        if (rewriteCookieDomainConfig && key2.toLowerCase() === "set-cookie") {
          header = common2.rewriteCookieProperty(header, rewriteCookieDomainConfig, "domain");
        }
        if (rewriteCookiePathConfig && key2.toLowerCase() === "set-cookie") {
          header = common2.rewriteCookieProperty(header, rewriteCookiePathConfig, "path");
        }
        res.setHeader(String(key2).trim(), header);
      };
      if (typeof rewriteCookieDomainConfig === "string") {
        rewriteCookieDomainConfig = { "*": rewriteCookieDomainConfig };
      }
      if (typeof rewriteCookiePathConfig === "string") {
        rewriteCookiePathConfig = { "*": rewriteCookiePathConfig };
      }
      if (preserveHeaderKeyCase && proxyRes.rawHeaders != void 0) {
        rawHeaderKeyMap = {};
        for (var i = 0; i < proxyRes.rawHeaders.length; i += 2) {
          var key = proxyRes.rawHeaders[i];
          rawHeaderKeyMap[key.toLowerCase()] = key;
        }
      }
      Object.keys(proxyRes.headers).forEach(function(key2) {
        var header = proxyRes.headers[key2];
        if (preserveHeaderKeyCase && rawHeaderKeyMap) {
          key2 = rawHeaderKeyMap[key2] || key2;
        }
        setHeader(key2, header);
      });
    },
    /**
     * Set the statusCode from the proxyResponse
     *
     * @param {ClientRequest} Req Request object
     * @param {IncomingMessage} Res Response object
     * @param {proxyResponse} Res Response object from the proxy request
     *
     * @api private
     */
    writeStatusCode: function writeStatusCode(req, res, proxyRes) {
      if (proxyRes.statusMessage) {
        res.statusCode = proxyRes.statusCode;
        res.statusMessage = proxyRes.statusMessage;
      } else {
        res.statusCode = proxyRes.statusCode;
      }
    }
  };
  return webOutgoing;
}
var followRedirects = { exports: {} };
var browser = { exports: {} };
var ms;
var hasRequiredMs;
function requireMs() {
  if (hasRequiredMs) return ms;
  hasRequiredMs = 1;
  var s = 1e3;
  var m = s * 60;
  var h = m * 60;
  var d = h * 24;
  var w = d * 7;
  var y = d * 365.25;
  ms = function(val, options) {
    options = options || {};
    var type = typeof val;
    if (type === "string" && val.length > 0) {
      return parse(val);
    } else if (type === "number" && isFinite(val)) {
      return options.long ? fmtLong(val) : fmtShort(val);
    }
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(val)
    );
  };
  function parse(str) {
    str = String(str);
    if (str.length > 100) {
      return;
    }
    var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
      str
    );
    if (!match) {
      return;
    }
    var n = parseFloat(match[1]);
    var type = (match[2] || "ms").toLowerCase();
    switch (type) {
      case "years":
      case "year":
      case "yrs":
      case "yr":
      case "y":
        return n * y;
      case "weeks":
      case "week":
      case "w":
        return n * w;
      case "days":
      case "day":
      case "d":
        return n * d;
      case "hours":
      case "hour":
      case "hrs":
      case "hr":
      case "h":
        return n * h;
      case "minutes":
      case "minute":
      case "mins":
      case "min":
      case "m":
        return n * m;
      case "seconds":
      case "second":
      case "secs":
      case "sec":
      case "s":
        return n * s;
      case "milliseconds":
      case "millisecond":
      case "msecs":
      case "msec":
      case "ms":
        return n;
      default:
        return void 0;
    }
  }
  function fmtShort(ms2) {
    var msAbs = Math.abs(ms2);
    if (msAbs >= d) {
      return Math.round(ms2 / d) + "d";
    }
    if (msAbs >= h) {
      return Math.round(ms2 / h) + "h";
    }
    if (msAbs >= m) {
      return Math.round(ms2 / m) + "m";
    }
    if (msAbs >= s) {
      return Math.round(ms2 / s) + "s";
    }
    return ms2 + "ms";
  }
  function fmtLong(ms2) {
    var msAbs = Math.abs(ms2);
    if (msAbs >= d) {
      return plural(ms2, msAbs, d, "day");
    }
    if (msAbs >= h) {
      return plural(ms2, msAbs, h, "hour");
    }
    if (msAbs >= m) {
      return plural(ms2, msAbs, m, "minute");
    }
    if (msAbs >= s) {
      return plural(ms2, msAbs, s, "second");
    }
    return ms2 + " ms";
  }
  function plural(ms2, msAbs, n, name) {
    var isPlural = msAbs >= n * 1.5;
    return Math.round(ms2 / n) + " " + name + (isPlural ? "s" : "");
  }
  return ms;
}
var common;
var hasRequiredCommon;
function requireCommon() {
  if (hasRequiredCommon) return common;
  hasRequiredCommon = 1;
  function setup(env) {
    createDebug.debug = createDebug;
    createDebug.default = createDebug;
    createDebug.coerce = coerce;
    createDebug.disable = disable;
    createDebug.enable = enable;
    createDebug.enabled = enabled;
    createDebug.humanize = requireMs();
    createDebug.destroy = destroy;
    Object.keys(env).forEach((key) => {
      createDebug[key] = env[key];
    });
    createDebug.names = [];
    createDebug.skips = [];
    createDebug.formatters = {};
    function selectColor(namespace) {
      let hash = 0;
      for (let i = 0; i < namespace.length; i++) {
        hash = (hash << 5) - hash + namespace.charCodeAt(i);
        hash |= 0;
      }
      return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
    }
    createDebug.selectColor = selectColor;
    function createDebug(namespace) {
      let prevTime;
      let enableOverride = null;
      let namespacesCache;
      let enabledCache;
      function debug2(...args) {
        if (!debug2.enabled) {
          return;
        }
        const self2 = debug2;
        const curr = Number(/* @__PURE__ */ new Date());
        const ms2 = curr - (prevTime || curr);
        self2.diff = ms2;
        self2.prev = prevTime;
        self2.curr = curr;
        prevTime = curr;
        args[0] = createDebug.coerce(args[0]);
        if (typeof args[0] !== "string") {
          args.unshift("%O");
        }
        let index2 = 0;
        args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
          if (match === "%%") {
            return "%";
          }
          index2++;
          const formatter = createDebug.formatters[format];
          if (typeof formatter === "function") {
            const val = args[index2];
            match = formatter.call(self2, val);
            args.splice(index2, 1);
            index2--;
          }
          return match;
        });
        createDebug.formatArgs.call(self2, args);
        const logFn = self2.log || createDebug.log;
        logFn.apply(self2, args);
      }
      debug2.namespace = namespace;
      debug2.useColors = createDebug.useColors();
      debug2.color = createDebug.selectColor(namespace);
      debug2.extend = extend;
      debug2.destroy = createDebug.destroy;
      Object.defineProperty(debug2, "enabled", {
        enumerable: true,
        configurable: false,
        get: () => {
          if (enableOverride !== null) {
            return enableOverride;
          }
          if (namespacesCache !== createDebug.namespaces) {
            namespacesCache = createDebug.namespaces;
            enabledCache = createDebug.enabled(namespace);
          }
          return enabledCache;
        },
        set: (v) => {
          enableOverride = v;
        }
      });
      if (typeof createDebug.init === "function") {
        createDebug.init(debug2);
      }
      return debug2;
    }
    function extend(namespace, delimiter) {
      const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
      newDebug.log = this.log;
      return newDebug;
    }
    function enable(namespaces) {
      createDebug.save(namespaces);
      createDebug.namespaces = namespaces;
      createDebug.names = [];
      createDebug.skips = [];
      const split = (typeof namespaces === "string" ? namespaces : "").trim().replace(" ", ",").split(",").filter(Boolean);
      for (const ns of split) {
        if (ns[0] === "-") {
          createDebug.skips.push(ns.slice(1));
        } else {
          createDebug.names.push(ns);
        }
      }
    }
    function matchesTemplate(search, template) {
      let searchIndex = 0;
      let templateIndex = 0;
      let starIndex = -1;
      let matchIndex = 0;
      while (searchIndex < search.length) {
        if (templateIndex < template.length && (template[templateIndex] === search[searchIndex] || template[templateIndex] === "*")) {
          if (template[templateIndex] === "*") {
            starIndex = templateIndex;
            matchIndex = searchIndex;
            templateIndex++;
          } else {
            searchIndex++;
            templateIndex++;
          }
        } else if (starIndex !== -1) {
          templateIndex = starIndex + 1;
          matchIndex++;
          searchIndex = matchIndex;
        } else {
          return false;
        }
      }
      while (templateIndex < template.length && template[templateIndex] === "*") {
        templateIndex++;
      }
      return templateIndex === template.length;
    }
    function disable() {
      const namespaces = [
        ...createDebug.names,
        ...createDebug.skips.map((namespace) => "-" + namespace)
      ].join(",");
      createDebug.enable("");
      return namespaces;
    }
    function enabled(name) {
      for (const skip of createDebug.skips) {
        if (matchesTemplate(name, skip)) {
          return false;
        }
      }
      for (const ns of createDebug.names) {
        if (matchesTemplate(name, ns)) {
          return true;
        }
      }
      return false;
    }
    function coerce(val) {
      if (val instanceof Error) {
        return val.stack || val.message;
      }
      return val;
    }
    function destroy() {
      console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    }
    createDebug.enable(createDebug.load());
    return createDebug;
  }
  common = setup;
  return common;
}
var hasRequiredBrowser;
function requireBrowser() {
  if (hasRequiredBrowser) return browser.exports;
  hasRequiredBrowser = 1;
  (function(module, exports) {
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.storage = localstorage();
    exports.destroy = /* @__PURE__ */ (() => {
      let warned = false;
      return () => {
        if (!warned) {
          warned = true;
          console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
        }
      };
    })();
    exports.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function useColors() {
      if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) {
        return true;
      }
      if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
        return false;
      }
      let m;
      return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator !== "undefined" && navigator.userAgent && (m = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(m[1], 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
      typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function formatArgs(args) {
      args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module.exports.humanize(this.diff);
      if (!this.useColors) {
        return;
      }
      const c = "color: " + this.color;
      args.splice(1, 0, c, "color: inherit");
      let index2 = 0;
      let lastC = 0;
      args[0].replace(/%[a-zA-Z%]/g, (match) => {
        if (match === "%%") {
          return;
        }
        index2++;
        if (match === "%c") {
          lastC = index2;
        }
      });
      args.splice(lastC, 0, c);
    }
    exports.log = console.debug || console.log || (() => {
    });
    function save(namespaces) {
      try {
        if (namespaces) {
          exports.storage.setItem("debug", namespaces);
        } else {
          exports.storage.removeItem("debug");
        }
      } catch (error) {
      }
    }
    function load() {
      let r;
      try {
        r = exports.storage.getItem("debug");
      } catch (error) {
      }
      if (!r && typeof process !== "undefined" && "env" in process) {
        r = process.env.DEBUG;
      }
      return r;
    }
    function localstorage() {
      try {
        return localStorage;
      } catch (error) {
      }
    }
    module.exports = requireCommon()(exports);
    const { formatters } = module.exports;
    formatters.j = function(v) {
      try {
        return JSON.stringify(v);
      } catch (error) {
        return "[UnexpectedJSONParseError]: " + error.message;
      }
    };
  })(browser, browser.exports);
  return browser.exports;
}
var debug_1;
var hasRequiredDebug$1;
function requireDebug$1() {
  if (hasRequiredDebug$1) return debug_1;
  hasRequiredDebug$1 = 1;
  var debug2;
  debug_1 = function() {
    if (!debug2) {
      try {
        debug2 = requireBrowser()("follow-redirects");
      } catch (error) {
      }
      if (typeof debug2 !== "function") {
        debug2 = function() {
        };
      }
    }
    debug2.apply(null, arguments);
  };
  return debug_1;
}
var hasRequiredFollowRedirects;
function requireFollowRedirects() {
  if (hasRequiredFollowRedirects) return followRedirects.exports;
  hasRequiredFollowRedirects = 1;
  var url = require$$0$1;
  var URL = url.URL;
  var http = require$$1;
  var https = require$$2;
  var Writable = stream.Writable;
  var assert = require$$5;
  var debug2 = requireDebug$1();
  (function detectUnsupportedEnvironment() {
    var looksLikeNode = typeof process !== "undefined";
    var looksLikeBrowser = typeof window !== "undefined" && typeof document !== "undefined";
    var looksLikeV8 = isFunction(Error.captureStackTrace);
    if (!looksLikeNode && (looksLikeBrowser || !looksLikeV8)) {
      console.warn("The follow-redirects package should be excluded from browser builds.");
    }
  })();
  var useNativeURL = false;
  try {
    assert(new URL(""));
  } catch (error) {
    useNativeURL = error.code === "ERR_INVALID_URL";
  }
  var preservedUrlFields = [
    "auth",
    "host",
    "hostname",
    "href",
    "path",
    "pathname",
    "port",
    "protocol",
    "query",
    "search",
    "hash"
  ];
  var events = ["abort", "aborted", "connect", "error", "socket", "timeout"];
  var eventHandlers = /* @__PURE__ */ Object.create(null);
  events.forEach(function(event) {
    eventHandlers[event] = function(arg1, arg2, arg3) {
      this._redirectable.emit(event, arg1, arg2, arg3);
    };
  });
  var InvalidUrlError = createErrorType(
    "ERR_INVALID_URL",
    "Invalid URL",
    TypeError
  );
  var RedirectionError = createErrorType(
    "ERR_FR_REDIRECTION_FAILURE",
    "Redirected request failed"
  );
  var TooManyRedirectsError = createErrorType(
    "ERR_FR_TOO_MANY_REDIRECTS",
    "Maximum number of redirects exceeded",
    RedirectionError
  );
  var MaxBodyLengthExceededError = createErrorType(
    "ERR_FR_MAX_BODY_LENGTH_EXCEEDED",
    "Request body larger than maxBodyLength limit"
  );
  var WriteAfterEndError = createErrorType(
    "ERR_STREAM_WRITE_AFTER_END",
    "write after end"
  );
  var destroy = Writable.prototype.destroy || noop;
  function RedirectableRequest(options, responseCallback) {
    Writable.call(this);
    this._sanitizeOptions(options);
    this._options = options;
    this._ended = false;
    this._ending = false;
    this._redirectCount = 0;
    this._redirects = [];
    this._requestBodyLength = 0;
    this._requestBodyBuffers = [];
    if (responseCallback) {
      this.on("response", responseCallback);
    }
    var self2 = this;
    this._onNativeResponse = function(response) {
      try {
        self2._processResponse(response);
      } catch (cause) {
        self2.emit("error", cause instanceof RedirectionError ? cause : new RedirectionError({ cause }));
      }
    };
    this._performRequest();
  }
  RedirectableRequest.prototype = Object.create(Writable.prototype);
  RedirectableRequest.prototype.abort = function() {
    destroyRequest(this._currentRequest);
    this._currentRequest.abort();
    this.emit("abort");
  };
  RedirectableRequest.prototype.destroy = function(error) {
    destroyRequest(this._currentRequest, error);
    destroy.call(this, error);
    return this;
  };
  RedirectableRequest.prototype.write = function(data, encoding, callback) {
    if (this._ending) {
      throw new WriteAfterEndError();
    }
    if (!isString(data) && !isBuffer(data)) {
      throw new TypeError("data should be a string, Buffer or Uint8Array");
    }
    if (isFunction(encoding)) {
      callback = encoding;
      encoding = null;
    }
    if (data.length === 0) {
      if (callback) {
        callback();
      }
      return;
    }
    if (this._requestBodyLength + data.length <= this._options.maxBodyLength) {
      this._requestBodyLength += data.length;
      this._requestBodyBuffers.push({ data, encoding });
      this._currentRequest.write(data, encoding, callback);
    } else {
      this.emit("error", new MaxBodyLengthExceededError());
      this.abort();
    }
  };
  RedirectableRequest.prototype.end = function(data, encoding, callback) {
    if (isFunction(data)) {
      callback = data;
      data = encoding = null;
    } else if (isFunction(encoding)) {
      callback = encoding;
      encoding = null;
    }
    if (!data) {
      this._ended = this._ending = true;
      this._currentRequest.end(null, null, callback);
    } else {
      var self2 = this;
      var currentRequest = this._currentRequest;
      this.write(data, encoding, function() {
        self2._ended = true;
        currentRequest.end(null, null, callback);
      });
      this._ending = true;
    }
  };
  RedirectableRequest.prototype.setHeader = function(name, value) {
    this._options.headers[name] = value;
    this._currentRequest.setHeader(name, value);
  };
  RedirectableRequest.prototype.removeHeader = function(name) {
    delete this._options.headers[name];
    this._currentRequest.removeHeader(name);
  };
  RedirectableRequest.prototype.setTimeout = function(msecs, callback) {
    var self2 = this;
    function destroyOnTimeout(socket) {
      socket.setTimeout(msecs);
      socket.removeListener("timeout", socket.destroy);
      socket.addListener("timeout", socket.destroy);
    }
    function startTimer(socket) {
      if (self2._timeout) {
        clearTimeout(self2._timeout);
      }
      self2._timeout = setTimeout(function() {
        self2.emit("timeout");
        clearTimer();
      }, msecs);
      destroyOnTimeout(socket);
    }
    function clearTimer() {
      if (self2._timeout) {
        clearTimeout(self2._timeout);
        self2._timeout = null;
      }
      self2.removeListener("abort", clearTimer);
      self2.removeListener("error", clearTimer);
      self2.removeListener("response", clearTimer);
      self2.removeListener("close", clearTimer);
      if (callback) {
        self2.removeListener("timeout", callback);
      }
      if (!self2.socket) {
        self2._currentRequest.removeListener("socket", startTimer);
      }
    }
    if (callback) {
      this.on("timeout", callback);
    }
    if (this.socket) {
      startTimer(this.socket);
    } else {
      this._currentRequest.once("socket", startTimer);
    }
    this.on("socket", destroyOnTimeout);
    this.on("abort", clearTimer);
    this.on("error", clearTimer);
    this.on("response", clearTimer);
    this.on("close", clearTimer);
    return this;
  };
  [
    "flushHeaders",
    "getHeader",
    "setNoDelay",
    "setSocketKeepAlive"
  ].forEach(function(method) {
    RedirectableRequest.prototype[method] = function(a, b) {
      return this._currentRequest[method](a, b);
    };
  });
  ["aborted", "connection", "socket"].forEach(function(property) {
    Object.defineProperty(RedirectableRequest.prototype, property, {
      get: function() {
        return this._currentRequest[property];
      }
    });
  });
  RedirectableRequest.prototype._sanitizeOptions = function(options) {
    if (!options.headers) {
      options.headers = {};
    }
    if (options.host) {
      if (!options.hostname) {
        options.hostname = options.host;
      }
      delete options.host;
    }
    if (!options.pathname && options.path) {
      var searchPos = options.path.indexOf("?");
      if (searchPos < 0) {
        options.pathname = options.path;
      } else {
        options.pathname = options.path.substring(0, searchPos);
        options.search = options.path.substring(searchPos);
      }
    }
  };
  RedirectableRequest.prototype._performRequest = function() {
    var protocol = this._options.protocol;
    var nativeProtocol = this._options.nativeProtocols[protocol];
    if (!nativeProtocol) {
      throw new TypeError("Unsupported protocol " + protocol);
    }
    if (this._options.agents) {
      var scheme = protocol.slice(0, -1);
      this._options.agent = this._options.agents[scheme];
    }
    var request = this._currentRequest = nativeProtocol.request(this._options, this._onNativeResponse);
    request._redirectable = this;
    for (var event of events) {
      request.on(event, eventHandlers[event]);
    }
    this._currentUrl = /^\//.test(this._options.path) ? url.format(this._options) : (
      // When making a request to a proxy, […]
      // a client MUST send the target URI in absolute-form […].
      this._options.path
    );
    if (this._isRedirect) {
      var i = 0;
      var self2 = this;
      var buffers = this._requestBodyBuffers;
      (function writeNext(error) {
        if (request === self2._currentRequest) {
          if (error) {
            self2.emit("error", error);
          } else if (i < buffers.length) {
            var buffer = buffers[i++];
            if (!request.finished) {
              request.write(buffer.data, buffer.encoding, writeNext);
            }
          } else if (self2._ended) {
            request.end();
          }
        }
      })();
    }
  };
  RedirectableRequest.prototype._processResponse = function(response) {
    var statusCode2 = response.statusCode;
    if (this._options.trackRedirects) {
      this._redirects.push({
        url: this._currentUrl,
        headers: response.headers,
        statusCode: statusCode2
      });
    }
    var location = response.headers.location;
    if (!location || this._options.followRedirects === false || statusCode2 < 300 || statusCode2 >= 400) {
      response.responseUrl = this._currentUrl;
      response.redirects = this._redirects;
      this.emit("response", response);
      this._requestBodyBuffers = [];
      return;
    }
    destroyRequest(this._currentRequest);
    response.destroy();
    if (++this._redirectCount > this._options.maxRedirects) {
      throw new TooManyRedirectsError();
    }
    var requestHeaders;
    var beforeRedirect = this._options.beforeRedirect;
    if (beforeRedirect) {
      requestHeaders = Object.assign({
        // The Host header was set by nativeProtocol.request
        Host: response.req.getHeader("host")
      }, this._options.headers);
    }
    var method = this._options.method;
    if ((statusCode2 === 301 || statusCode2 === 302) && this._options.method === "POST" || // RFC7231§6.4.4: The 303 (See Other) status code indicates that
    // the server is redirecting the user agent to a different resource […]
    // A user agent can perform a retrieval request targeting that URI
    // (a GET or HEAD request if using HTTP) […]
    statusCode2 === 303 && !/^(?:GET|HEAD)$/.test(this._options.method)) {
      this._options.method = "GET";
      this._requestBodyBuffers = [];
      removeMatchingHeaders(/^content-/i, this._options.headers);
    }
    var currentHostHeader = removeMatchingHeaders(/^host$/i, this._options.headers);
    var currentUrlParts = parseUrl(this._currentUrl);
    var currentHost = currentHostHeader || currentUrlParts.host;
    var currentUrl = /^\w+:/.test(location) ? this._currentUrl : url.format(Object.assign(currentUrlParts, { host: currentHost }));
    var redirectUrl = resolveUrl(location, currentUrl);
    debug2("redirecting to", redirectUrl.href);
    this._isRedirect = true;
    spreadUrlObject(redirectUrl, this._options);
    if (redirectUrl.protocol !== currentUrlParts.protocol && redirectUrl.protocol !== "https:" || redirectUrl.host !== currentHost && !isSubdomain(redirectUrl.host, currentHost)) {
      removeMatchingHeaders(/^(?:(?:proxy-)?authorization|cookie)$/i, this._options.headers);
    }
    if (isFunction(beforeRedirect)) {
      var responseDetails = {
        headers: response.headers,
        statusCode: statusCode2
      };
      var requestDetails = {
        url: currentUrl,
        method,
        headers: requestHeaders
      };
      beforeRedirect(this._options, responseDetails, requestDetails);
      this._sanitizeOptions(this._options);
    }
    this._performRequest();
  };
  function wrap(protocols) {
    var exports = {
      maxRedirects: 21,
      maxBodyLength: 10 * 1024 * 1024
    };
    var nativeProtocols = {};
    Object.keys(protocols).forEach(function(scheme) {
      var protocol = scheme + ":";
      var nativeProtocol = nativeProtocols[protocol] = protocols[scheme];
      var wrappedProtocol = exports[scheme] = Object.create(nativeProtocol);
      function request(input, options, callback) {
        if (isURL(input)) {
          input = spreadUrlObject(input);
        } else if (isString(input)) {
          input = spreadUrlObject(parseUrl(input));
        } else {
          callback = options;
          options = validateUrl(input);
          input = { protocol };
        }
        if (isFunction(options)) {
          callback = options;
          options = null;
        }
        options = Object.assign({
          maxRedirects: exports.maxRedirects,
          maxBodyLength: exports.maxBodyLength
        }, input, options);
        options.nativeProtocols = nativeProtocols;
        if (!isString(options.host) && !isString(options.hostname)) {
          options.hostname = "::1";
        }
        assert.equal(options.protocol, protocol, "protocol mismatch");
        debug2("options", options);
        return new RedirectableRequest(options, callback);
      }
      function get(input, options, callback) {
        var wrappedRequest = wrappedProtocol.request(input, options, callback);
        wrappedRequest.end();
        return wrappedRequest;
      }
      Object.defineProperties(wrappedProtocol, {
        request: { value: request, configurable: true, enumerable: true, writable: true },
        get: { value: get, configurable: true, enumerable: true, writable: true }
      });
    });
    return exports;
  }
  function noop() {
  }
  function parseUrl(input) {
    var parsed;
    if (useNativeURL) {
      parsed = new URL(input);
    } else {
      parsed = validateUrl(url.parse(input));
      if (!isString(parsed.protocol)) {
        throw new InvalidUrlError({ input });
      }
    }
    return parsed;
  }
  function resolveUrl(relative, base2) {
    return useNativeURL ? new URL(relative, base2) : parseUrl(url.resolve(base2, relative));
  }
  function validateUrl(input) {
    if (/^\[/.test(input.hostname) && !/^\[[:0-9a-f]+\]$/i.test(input.hostname)) {
      throw new InvalidUrlError({ input: input.href || input });
    }
    if (/^\[/.test(input.host) && !/^\[[:0-9a-f]+\](:\d+)?$/i.test(input.host)) {
      throw new InvalidUrlError({ input: input.href || input });
    }
    return input;
  }
  function spreadUrlObject(urlObject, target) {
    var spread = target || {};
    for (var key of preservedUrlFields) {
      spread[key] = urlObject[key];
    }
    if (spread.hostname.startsWith("[")) {
      spread.hostname = spread.hostname.slice(1, -1);
    }
    if (spread.port !== "") {
      spread.port = Number(spread.port);
    }
    spread.path = spread.search ? spread.pathname + spread.search : spread.pathname;
    return spread;
  }
  function removeMatchingHeaders(regex, headers) {
    var lastValue;
    for (var header in headers) {
      if (regex.test(header)) {
        lastValue = headers[header];
        delete headers[header];
      }
    }
    return lastValue === null || typeof lastValue === "undefined" ? void 0 : String(lastValue).trim();
  }
  function createErrorType(code, message, baseClass) {
    function CustomError(properties) {
      if (isFunction(Error.captureStackTrace)) {
        Error.captureStackTrace(this, this.constructor);
      }
      Object.assign(this, properties || {});
      this.code = code;
      this.message = this.cause ? message + ": " + this.cause.message : message;
    }
    CustomError.prototype = new (baseClass || Error)();
    Object.defineProperties(CustomError.prototype, {
      constructor: {
        value: CustomError,
        enumerable: false
      },
      name: {
        value: "Error [" + code + "]",
        enumerable: false
      }
    });
    return CustomError;
  }
  function destroyRequest(request, error) {
    for (var event of events) {
      request.removeListener(event, eventHandlers[event]);
    }
    request.on("error", noop);
    request.destroy(error);
  }
  function isSubdomain(subdomain, domain) {
    assert(isString(subdomain) && isString(domain));
    var dot = subdomain.length - domain.length - 1;
    return dot > 0 && subdomain[dot] === "." && subdomain.endsWith(domain);
  }
  function isString(value) {
    return typeof value === "string" || value instanceof String;
  }
  function isFunction(value) {
    return typeof value === "function";
  }
  function isBuffer(value) {
    return typeof value === "object" && "length" in value;
  }
  function isURL(value) {
    return URL && value instanceof URL;
  }
  followRedirects.exports = wrap({ http, https });
  followRedirects.exports.wrap = wrap;
  return followRedirects.exports;
}
var webIncoming;
var hasRequiredWebIncoming;
function requireWebIncoming() {
  if (hasRequiredWebIncoming) return webIncoming;
  hasRequiredWebIncoming = 1;
  var httpNative = require$$1, httpsNative = require$$2, web_o = requireWebOutgoing(), common2 = requireCommon$1(), followRedirects2 = requireFollowRedirects();
  web_o = Object.keys(web_o).map(function(pass) {
    return web_o[pass];
  });
  var nativeAgents = { http: httpNative, https: httpsNative };
  /*!
   * Array of passes.
   *
   * A `pass` is just a function that is executed on `req, res, options`
   * so that you can easily add new checks while still keeping the base
   * flexible.
   */
  webIncoming = {
    /**
     * Sets `content-length` to '0' if request is of DELETE type.
     *
     * @param {ClientRequest} Req Request object
     * @param {IncomingMessage} Res Response object
     * @param {Object} Options Config object passed to the proxy
     *
     * @api private
     */
    deleteLength: function deleteLength(req, res, options) {
      if ((req.method === "DELETE" || req.method === "OPTIONS") && !req.headers["content-length"]) {
        req.headers["content-length"] = "0";
        delete req.headers["transfer-encoding"];
      }
    },
    /**
     * Sets timeout in request socket if it was specified in options.
     *
     * @param {ClientRequest} Req Request object
     * @param {IncomingMessage} Res Response object
     * @param {Object} Options Config object passed to the proxy
     *
     * @api private
     */
    timeout: function timeout(req, res, options) {
      if (options.timeout) {
        req.socket.setTimeout(options.timeout);
      }
    },
    /**
     * Sets `x-forwarded-*` headers if specified in config.
     *
     * @param {ClientRequest} Req Request object
     * @param {IncomingMessage} Res Response object
     * @param {Object} Options Config object passed to the proxy
     *
     * @api private
     */
    XHeaders: function XHeaders(req, res, options) {
      if (!options.xfwd) return;
      var encrypted = req.isSpdy || common2.hasEncryptedConnection(req);
      var values = {
        for: req.connection.remoteAddress || req.socket.remoteAddress,
        port: common2.getPort(req),
        proto: encrypted ? "https" : "http"
      };
      ["for", "port", "proto"].forEach(function(header) {
        req.headers["x-forwarded-" + header] = (req.headers["x-forwarded-" + header] || "") + (req.headers["x-forwarded-" + header] ? "," : "") + values[header];
      });
      req.headers["x-forwarded-host"] = req.headers["x-forwarded-host"] || req.headers["host"] || "";
    },
    /**
     * Does the actual proxying. If `forward` is enabled fires up
     * a ForwardStream, same happens for ProxyStream. The request
     * just dies otherwise.
     *
     * @param {ClientRequest} Req Request object
     * @param {IncomingMessage} Res Response object
     * @param {Object} Options Config object passed to the proxy
     *
     * @api private
     */
    stream: function stream2(req, res, options, _, server2, clb) {
      server2.emit("start", req, res, options.target || options.forward);
      var agents = options.followRedirects ? followRedirects2 : nativeAgents;
      var http = agents.http;
      var https = agents.https;
      if (options.forward) {
        var forwardReq = (options.forward.protocol === "https:" ? https : http).request(
          common2.setupOutgoing(options.ssl || {}, options, req, "forward")
        );
        var forwardError = createErrorHandler(forwardReq, options.forward);
        req.on("error", forwardError);
        forwardReq.on("error", forwardError);
        (options.buffer || req).pipe(forwardReq);
        if (!options.target) {
          return res.end();
        }
      }
      var proxyReq = (options.target.protocol === "https:" ? https : http).request(
        common2.setupOutgoing(options.ssl || {}, options, req)
      );
      proxyReq.on("socket", function(socket) {
        if (server2 && !proxyReq.getHeader("expect")) {
          server2.emit("proxyReq", proxyReq, req, res, options);
        }
      });
      if (options.proxyTimeout) {
        proxyReq.setTimeout(options.proxyTimeout, function() {
          proxyReq.abort();
        });
      }
      req.on("aborted", function() {
        proxyReq.abort();
      });
      var proxyError = createErrorHandler(proxyReq, options.target);
      req.on("error", proxyError);
      proxyReq.on("error", proxyError);
      function createErrorHandler(proxyReq2, url) {
        return function proxyError2(err) {
          if (req.socket.destroyed && err.code === "ECONNRESET") {
            server2.emit("econnreset", err, req, res, url);
            return proxyReq2.abort();
          }
          if (clb) {
            clb(err, req, res, url);
          } else {
            server2.emit("error", err, req, res, url);
          }
        };
      }
      (options.buffer || req).pipe(proxyReq);
      proxyReq.on("response", function(proxyRes) {
        if (server2) {
          server2.emit("proxyRes", proxyRes, req, res);
        }
        if (!res.headersSent && !options.selfHandleResponse) {
          for (var i = 0; i < web_o.length; i++) {
            if (web_o[i](req, res, proxyRes, options)) {
              break;
            }
          }
        }
        if (!res.finished) {
          proxyRes.on("end", function() {
            if (server2) server2.emit("end", req, res, proxyRes);
          });
          if (!options.selfHandleResponse) proxyRes.pipe(res);
        } else {
          if (server2) server2.emit("end", req, res, proxyRes);
        }
      });
    }
  };
  return webIncoming;
}
var wsIncoming;
var hasRequiredWsIncoming;
function requireWsIncoming() {
  if (hasRequiredWsIncoming) return wsIncoming;
  hasRequiredWsIncoming = 1;
  var http = require$$1, https = require$$2, common2 = requireCommon$1();
  /*!
   * Array of passes.
   *
   * A `pass` is just a function that is executed on `req, socket, options`
   * so that you can easily add new checks while still keeping the base
   * flexible.
   */
  wsIncoming = {
    /**
     * WebSocket requests must have the `GET` method and
     * the `upgrade:websocket` header
     *
     * @param {ClientRequest} Req Request object
     * @param {Socket} Websocket
     *
     * @api private
     */
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
    /**
     * Sets `x-forwarded-*` headers if specified in config.
     *
     * @param {ClientRequest} Req Request object
     * @param {Socket} Websocket
     * @param {Object} Options Config object passed to the proxy
     *
     * @api private
     */
    XHeaders: function XHeaders(req, socket, options) {
      if (!options.xfwd) return;
      var values = {
        for: req.connection.remoteAddress || req.socket.remoteAddress,
        port: common2.getPort(req),
        proto: common2.hasEncryptedConnection(req) ? "wss" : "ws"
      };
      ["for", "port", "proto"].forEach(function(header) {
        req.headers["x-forwarded-" + header] = (req.headers["x-forwarded-" + header] || "") + (req.headers["x-forwarded-" + header] ? "," : "") + values[header];
      });
    },
    /**
     * Does the actual proxying. Make the request and upgrade it
     * send the Switching Protocols request and pipe the sockets.
     *
     * @param {ClientRequest} Req Request object
     * @param {Socket} Websocket
     * @param {Object} Options Config object passed to the proxy
     *
     * @api private
     */
    stream: function stream2(req, socket, options, head, server2, clb) {
      var createHttpHeader = function(line, headers) {
        return Object.keys(headers).reduce(function(head2, key) {
          var value = headers[key];
          if (!Array.isArray(value)) {
            head2.push(key + ": " + value);
            return head2;
          }
          for (var i = 0; i < value.length; i++) {
            head2.push(key + ": " + value[i]);
          }
          return head2;
        }, [line]).join("\r\n") + "\r\n\r\n";
      };
      common2.setupSocket(socket);
      if (head && head.length) socket.unshift(head);
      var proxyReq = (common2.isSSL.test(options.target.protocol) ? https : http).request(
        common2.setupOutgoing(options.ssl || {}, options, req)
      );
      if (server2) {
        server2.emit("proxyReqWs", proxyReq, req, socket, options, head);
      }
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
          server2.emit("close", proxyRes, proxySocket, proxyHead);
        });
        socket.on("error", function() {
          proxySocket.end();
        });
        common2.setupSocket(proxySocket);
        if (proxyHead && proxyHead.length) proxySocket.unshift(proxyHead);
        socket.write(createHttpHeader("HTTP/1.1 101 Switching Protocols", proxyRes.headers));
        proxySocket.pipe(socket).pipe(proxySocket);
        server2.emit("open", proxySocket);
        server2.emit("proxySocket", proxySocket);
      });
      return proxyReq.end();
      function onOutgoingError(err) {
        if (clb) {
          clb(err, req, socket);
        } else {
          server2.emit("error", err, req, socket);
        }
        socket.end();
      }
    }
  };
  return wsIncoming;
}
var hasRequiredHttpProxy$2;
function requireHttpProxy$2() {
  if (hasRequiredHttpProxy$2) return httpProxy$2.exports;
  hasRequiredHttpProxy$2 = 1;
  (function(module) {
    var httpProxy2 = module.exports, extend = require$$0._extend, parse_url = require$$0$1.parse, EE3 = requireEventemitter3(), http = require$$1, https = require$$2, web = requireWebIncoming(), ws = requireWsIncoming();
    httpProxy2.Server = ProxyServer;
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
          if (args[cntr] instanceof Buffer) {
            head = args[cntr];
          }
          ["target", "forward"].forEach(function(e) {
            if (typeof requestOptions[e] === "string")
              requestOptions[e] = parse_url(requestOptions[e]);
          });
          if (!requestOptions.target && !requestOptions.forward) {
            return this.emit("error", new Error("Must provide a proper URL as target"));
          }
          for (var i = 0; i < passes.length; i++) {
            if (passes[i](req, res, requestOptions, head, this, cbl)) {
              break;
            }
          }
        };
      };
    }
    httpProxy2.createRightProxy = createRightProxy;
    function ProxyServer(options) {
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
    require$$0.inherits(ProxyServer, EE3);
    ProxyServer.prototype.onError = function(err) {
      if (this.listeners("error").length === 1) {
        throw err;
      }
    };
    ProxyServer.prototype.listen = function(port, hostname) {
      var self2 = this, closure = function(req, res) {
        self2.web(req, res);
      };
      this._server = this.options.ssl ? https.createServer(this.options.ssl, closure) : http.createServer(closure);
      if (this.options.ws) {
        this._server.on("upgrade", function(req, socket, head) {
          self2.ws(req, socket, head);
        });
      }
      this._server.listen(port, hostname);
      return this;
    };
    ProxyServer.prototype.close = function(callback) {
      var self2 = this;
      if (this._server) {
        this._server.close(done);
      }
      function done() {
        self2._server = null;
        if (callback) {
          callback.apply(null, arguments);
        }
      }
    };
    ProxyServer.prototype.before = function(type, passName, callback) {
      if (type !== "ws" && type !== "web") {
        throw new Error("type must be `web` or `ws`");
      }
      var passes = type === "ws" ? this.wsPasses : this.webPasses, i = false;
      passes.forEach(function(v, idx) {
        if (v.name === passName) i = idx;
      });
      if (i === false) throw new Error("No such pass");
      passes.splice(i, 0, callback);
    };
    ProxyServer.prototype.after = function(type, passName, callback) {
      if (type !== "ws" && type !== "web") {
        throw new Error("type must be `web` or `ws`");
      }
      var passes = type === "ws" ? this.wsPasses : this.webPasses, i = false;
      passes.forEach(function(v, idx) {
        if (v.name === passName) i = idx;
      });
      if (i === false) throw new Error("No such pass");
      passes.splice(i++, 0, callback);
    };
  })(httpProxy$2);
  return httpProxy$2.exports;
}
var httpProxy$1;
var hasRequiredHttpProxy$1;
function requireHttpProxy$1() {
  if (hasRequiredHttpProxy$1) return httpProxy$1;
  hasRequiredHttpProxy$1 = 1;
  var ProxyServer = requireHttpProxy$2().Server;
  function createProxyServer(options) {
    return new ProxyServer(options);
  }
  ProxyServer.createProxyServer = createProxyServer;
  ProxyServer.createServer = createProxyServer;
  ProxyServer.createProxy = createProxyServer;
  httpProxy$1 = ProxyServer;
  return httpProxy$1;
}
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
var httpProxy;
var hasRequiredHttpProxy;
function requireHttpProxy() {
  if (hasRequiredHttpProxy) return httpProxy;
  hasRequiredHttpProxy = 1;
  httpProxy = requireHttpProxy$1();
  return httpProxy;
}
var configuration = {};
var errors = {};
var hasRequiredErrors;
function requireErrors() {
  if (hasRequiredErrors) return errors;
  hasRequiredErrors = 1;
  Object.defineProperty(errors, "__esModule", { value: true });
  errors.ERRORS = void 0;
  var ERRORS;
  (function(ERRORS2) {
    ERRORS2["ERR_CONFIG_FACTORY_TARGET_MISSING"] = '[HPM] Missing "target" option. Example: {target: "http://www.example.org"}';
    ERRORS2["ERR_CONTEXT_MATCHER_GENERIC"] = '[HPM] Invalid pathFilter. Expecting something like: "/api" or ["/api", "/ajax"]';
    ERRORS2["ERR_CONTEXT_MATCHER_INVALID_ARRAY"] = '[HPM] Invalid pathFilter. Plain paths (e.g. "/api") can not be mixed with globs (e.g. "/api/**"). Expecting something like: ["/api", "/ajax"] or ["/api/**", "!**.html"].';
    ERRORS2["ERR_PATH_REWRITER_CONFIG"] = "[HPM] Invalid pathRewrite config. Expecting object with pathRewrite config or a rewrite function";
  })(ERRORS || (errors.ERRORS = ERRORS = {}));
  return errors;
}
var hasRequiredConfiguration;
function requireConfiguration() {
  if (hasRequiredConfiguration) return configuration;
  hasRequiredConfiguration = 1;
  Object.defineProperty(configuration, "__esModule", { value: true });
  configuration.verifyConfig = verifyConfig;
  const errors_1 = requireErrors();
  function verifyConfig(options) {
    if (!options.target && !options.router) {
      throw new Error(errors_1.ERRORS.ERR_CONFIG_FACTORY_TARGET_MISSING);
    }
  }
  return configuration;
}
var getPlugins = {};
var _default = {};
var debugProxyErrorsPlugin = {};
var debug = {};
var hasRequiredDebug;
function requireDebug() {
  if (hasRequiredDebug) return debug;
  hasRequiredDebug = 1;
  Object.defineProperty(debug, "__esModule", { value: true });
  debug.Debug = void 0;
  const createDebug = requireBrowser();
  debug.Debug = createDebug("http-proxy-middleware");
  return debug;
}
var hasRequiredDebugProxyErrorsPlugin;
function requireDebugProxyErrorsPlugin() {
  if (hasRequiredDebugProxyErrorsPlugin) return debugProxyErrorsPlugin;
  hasRequiredDebugProxyErrorsPlugin = 1;
  Object.defineProperty(debugProxyErrorsPlugin, "__esModule", { value: true });
  debugProxyErrorsPlugin.debugProxyErrorsPlugin = void 0;
  const debug_12 = requireDebug();
  const debug2 = debug_12.Debug.extend("debug-proxy-errors-plugin");
  const debugProxyErrorsPlugin$1 = (proxyServer) => {
    proxyServer.on("error", (error, req, res, target) => {
      debug2(`http-proxy error event: 
%O`, error);
    });
    proxyServer.on("proxyReq", (proxyReq, req, socket) => {
      socket.on("error", (error) => {
        debug2("Socket error in proxyReq event: \n%O", error);
      });
    });
    proxyServer.on("proxyRes", (proxyRes, req, res) => {
      res.on("close", () => {
        if (!res.writableEnded) {
          debug2("Destroying proxyRes in proxyRes close event");
          proxyRes.destroy();
        }
      });
    });
    proxyServer.on("proxyReqWs", (proxyReq, req, socket) => {
      socket.on("error", (error) => {
        debug2("Socket error in proxyReqWs event: \n%O", error);
      });
    });
    proxyServer.on("open", (proxySocket) => {
      proxySocket.on("error", (error) => {
        debug2("Socket error in open event: \n%O", error);
      });
    });
    proxyServer.on("close", (req, socket, head) => {
      socket.on("error", (error) => {
        debug2("Socket error in close event: \n%O", error);
      });
    });
    proxyServer.on("econnreset", (error, req, res, target) => {
      debug2(`http-proxy econnreset event: 
%O`, error);
    });
  };
  debugProxyErrorsPlugin.debugProxyErrorsPlugin = debugProxyErrorsPlugin$1;
  return debugProxyErrorsPlugin;
}
var errorResponsePlugin = {};
var statusCode = {};
var hasRequiredStatusCode;
function requireStatusCode() {
  if (hasRequiredStatusCode) return statusCode;
  hasRequiredStatusCode = 1;
  Object.defineProperty(statusCode, "__esModule", { value: true });
  statusCode.getStatusCode = getStatusCode;
  function getStatusCode(errorCode) {
    let statusCode2;
    if (/HPE_INVALID/.test(errorCode)) {
      statusCode2 = 502;
    } else {
      switch (errorCode) {
        case "ECONNRESET":
        case "ENOTFOUND":
        case "ECONNREFUSED":
        case "ETIMEDOUT":
          statusCode2 = 504;
          break;
        default:
          statusCode2 = 500;
          break;
      }
    }
    return statusCode2;
  }
  return statusCode;
}
var hasRequiredErrorResponsePlugin;
function requireErrorResponsePlugin() {
  if (hasRequiredErrorResponsePlugin) return errorResponsePlugin;
  hasRequiredErrorResponsePlugin = 1;
  Object.defineProperty(errorResponsePlugin, "__esModule", { value: true });
  errorResponsePlugin.errorResponsePlugin = void 0;
  const status_code_1 = requireStatusCode();
  function isResponseLike(obj) {
    return obj && typeof obj.writeHead === "function";
  }
  function isSocketLike(obj) {
    return obj && typeof obj.write === "function" && !("writeHead" in obj);
  }
  const errorResponsePlugin$1 = (proxyServer, options) => {
    proxyServer.on("error", (err, req, res, target) => {
      if (!req && !res) {
        throw err;
      }
      if (isResponseLike(res)) {
        if (!res.headersSent) {
          const statusCode2 = (0, status_code_1.getStatusCode)(err.code);
          res.writeHead(statusCode2);
        }
        const host = req.headers && req.headers.host;
        res.end(`Error occurred while trying to proxy: ${host}${req.url}`);
      } else if (isSocketLike(res)) {
        res.destroy();
      }
    });
  };
  errorResponsePlugin.errorResponsePlugin = errorResponsePlugin$1;
  return errorResponsePlugin;
}
var loggerPlugin$1 = {};
var logger = {};
var hasRequiredLogger;
function requireLogger() {
  if (hasRequiredLogger) return logger;
  hasRequiredLogger = 1;
  Object.defineProperty(logger, "__esModule", { value: true });
  logger.getLogger = getLogger;
  const noopLogger = {
    info: () => {
    },
    warn: () => {
    },
    error: () => {
    }
  };
  function getLogger(options) {
    return options.logger || noopLogger;
  }
  return logger;
}
var loggerPlugin = {};
var hasRequiredLoggerPlugin$1;
function requireLoggerPlugin$1() {
  if (hasRequiredLoggerPlugin$1) return loggerPlugin;
  hasRequiredLoggerPlugin$1 = 1;
  Object.defineProperty(loggerPlugin, "__esModule", { value: true });
  loggerPlugin.getPort = getPort;
  function getPort(sockets) {
    return Object.keys(sockets || {})?.[0]?.split(":")[1];
  }
  return loggerPlugin;
}
var hasRequiredLoggerPlugin;
function requireLoggerPlugin() {
  if (hasRequiredLoggerPlugin) return loggerPlugin$1;
  hasRequiredLoggerPlugin = 1;
  Object.defineProperty(loggerPlugin$1, "__esModule", { value: true });
  loggerPlugin$1.loggerPlugin = void 0;
  const url_1 = require$$0$1;
  const logger_1 = requireLogger();
  const logger_plugin_1 = requireLoggerPlugin$1();
  const loggerPlugin2 = (proxyServer, options) => {
    const logger2 = (0, logger_1.getLogger)(options);
    proxyServer.on("error", (err, req, res, target) => {
      const hostname = req?.headers?.host;
      const requestHref = `${hostname}${req?.url}`;
      const targetHref = `${target?.href}`;
      const errorMessage = "[HPM] Error occurred while proxying request %s to %s [%s] (%s)";
      const errReference = "https://nodejs.org/api/errors.html#errors_common_system_errors";
      logger2.error(errorMessage, requestHref, targetHref, err.code || err, errReference);
    });
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
        if (port) {
          target.port = port;
        }
      } catch (err) {
        target = new url_1.URL(options.target);
        target.pathname = proxyRes.req.path;
      }
      const targetUrl = target.toString();
      const exchange = `[HPM] ${req.method} ${originalUrl} -> ${targetUrl} [${proxyRes.statusCode}]`;
      logger2.info(exchange);
    });
    proxyServer.on("open", (socket) => {
      logger2.info("[HPM] Client connected: %o", socket.address());
    });
    proxyServer.on("close", (req, proxySocket, proxyHead) => {
      logger2.info("[HPM] Client disconnected: %o", proxySocket.address());
    });
  };
  loggerPlugin$1.loggerPlugin = loggerPlugin2;
  return loggerPlugin$1;
}
var proxyEvents = {};
var _function = {};
var hasRequired_function;
function require_function() {
  if (hasRequired_function) return _function;
  hasRequired_function = 1;
  Object.defineProperty(_function, "__esModule", { value: true });
  _function.getFunctionName = getFunctionName;
  function getFunctionName(fn) {
    return fn.name || "[anonymous Function]";
  }
  return _function;
}
var hasRequiredProxyEvents;
function requireProxyEvents() {
  if (hasRequiredProxyEvents) return proxyEvents;
  hasRequiredProxyEvents = 1;
  Object.defineProperty(proxyEvents, "__esModule", { value: true });
  proxyEvents.proxyEventsPlugin = void 0;
  const debug_12 = requireDebug();
  const function_1 = require_function();
  const debug2 = debug_12.Debug.extend("proxy-events-plugin");
  const proxyEventsPlugin = (proxyServer, options) => {
    Object.entries(options.on || {}).forEach(([eventName, handler]) => {
      debug2(`register event handler: "${eventName}" -> "${(0, function_1.getFunctionName)(handler)}"`);
      proxyServer.on(eventName, handler);
    });
  };
  proxyEvents.proxyEventsPlugin = proxyEventsPlugin;
  return proxyEvents;
}
var hasRequired_default;
function require_default() {
  if (hasRequired_default) return _default;
  hasRequired_default = 1;
  (function(exports) {
    var __createBinding = _default && _default.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = _default && _default.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(requireDebugProxyErrorsPlugin(), exports);
    __exportStar(requireErrorResponsePlugin(), exports);
    __exportStar(requireLoggerPlugin(), exports);
    __exportStar(requireProxyEvents(), exports);
  })(_default);
  return _default;
}
var hasRequiredGetPlugins;
function requireGetPlugins() {
  if (hasRequiredGetPlugins) return getPlugins;
  hasRequiredGetPlugins = 1;
  Object.defineProperty(getPlugins, "__esModule", { value: true });
  getPlugins.getPlugins = getPlugins$1;
  const default_1 = require_default();
  function getPlugins$1(options) {
    const maybeErrorResponsePlugin = options.on?.error ? [] : [default_1.errorResponsePlugin];
    const defaultPlugins = options.ejectPlugins ? [] : [default_1.debugProxyErrorsPlugin, default_1.proxyEventsPlugin, default_1.loggerPlugin, ...maybeErrorResponsePlugin];
    const userPlugins = options.plugins ?? [];
    return [...defaultPlugins, ...userPlugins];
  }
  return getPlugins;
}
var pathFilter = {};
/*!
 * is-extglob <https://github.com/jonschlinkert/is-extglob>
 *
 * Copyright (c) 2014-2016, Jon Schlinkert.
 * Licensed under the MIT License.
 */
var isExtglob;
var hasRequiredIsExtglob;
function requireIsExtglob() {
  if (hasRequiredIsExtglob) return isExtglob;
  hasRequiredIsExtglob = 1;
  isExtglob = function isExtglob2(str) {
    if (typeof str !== "string" || str === "") {
      return false;
    }
    var match;
    while (match = /(\\).|([@?!+*]\(.*\))/g.exec(str)) {
      if (match[2]) return true;
      str = str.slice(match.index + match[0].length);
    }
    return false;
  };
  return isExtglob;
}
/*!
 * is-glob <https://github.com/jonschlinkert/is-glob>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */
var isGlob;
var hasRequiredIsGlob;
function requireIsGlob() {
  if (hasRequiredIsGlob) return isGlob;
  hasRequiredIsGlob = 1;
  var isExtglob2 = requireIsExtglob();
  var chars = { "{": "}", "(": ")", "[": "]" };
  var strictCheck = function(str) {
    if (str[0] === "!") {
      return true;
    }
    var index2 = 0;
    var pipeIndex = -2;
    var closeSquareIndex = -2;
    var closeCurlyIndex = -2;
    var closeParenIndex = -2;
    var backSlashIndex = -2;
    while (index2 < str.length) {
      if (str[index2] === "*") {
        return true;
      }
      if (str[index2 + 1] === "?" && /[\].+)]/.test(str[index2])) {
        return true;
      }
      if (closeSquareIndex !== -1 && str[index2] === "[" && str[index2 + 1] !== "]") {
        if (closeSquareIndex < index2) {
          closeSquareIndex = str.indexOf("]", index2);
        }
        if (closeSquareIndex > index2) {
          if (backSlashIndex === -1 || backSlashIndex > closeSquareIndex) {
            return true;
          }
          backSlashIndex = str.indexOf("\\", index2);
          if (backSlashIndex === -1 || backSlashIndex > closeSquareIndex) {
            return true;
          }
        }
      }
      if (closeCurlyIndex !== -1 && str[index2] === "{" && str[index2 + 1] !== "}") {
        closeCurlyIndex = str.indexOf("}", index2);
        if (closeCurlyIndex > index2) {
          backSlashIndex = str.indexOf("\\", index2);
          if (backSlashIndex === -1 || backSlashIndex > closeCurlyIndex) {
            return true;
          }
        }
      }
      if (closeParenIndex !== -1 && str[index2] === "(" && str[index2 + 1] === "?" && /[:!=]/.test(str[index2 + 2]) && str[index2 + 3] !== ")") {
        closeParenIndex = str.indexOf(")", index2);
        if (closeParenIndex > index2) {
          backSlashIndex = str.indexOf("\\", index2);
          if (backSlashIndex === -1 || backSlashIndex > closeParenIndex) {
            return true;
          }
        }
      }
      if (pipeIndex !== -1 && str[index2] === "(" && str[index2 + 1] !== "|") {
        if (pipeIndex < index2) {
          pipeIndex = str.indexOf("|", index2);
        }
        if (pipeIndex !== -1 && str[pipeIndex + 1] !== ")") {
          closeParenIndex = str.indexOf(")", pipeIndex);
          if (closeParenIndex > pipeIndex) {
            backSlashIndex = str.indexOf("\\", pipeIndex);
            if (backSlashIndex === -1 || backSlashIndex > closeParenIndex) {
              return true;
            }
          }
        }
      }
      if (str[index2] === "\\") {
        var open = str[index2 + 1];
        index2 += 2;
        var close = chars[open];
        if (close) {
          var n = str.indexOf(close, index2);
          if (n !== -1) {
            index2 = n + 1;
          }
        }
        if (str[index2] === "!") {
          return true;
        }
      } else {
        index2++;
      }
    }
    return false;
  };
  var relaxedCheck = function(str) {
    if (str[0] === "!") {
      return true;
    }
    var index2 = 0;
    while (index2 < str.length) {
      if (/[*?{}()[\]]/.test(str[index2])) {
        return true;
      }
      if (str[index2] === "\\") {
        var open = str[index2 + 1];
        index2 += 2;
        var close = chars[open];
        if (close) {
          var n = str.indexOf(close, index2);
          if (n !== -1) {
            index2 = n + 1;
          }
        }
        if (str[index2] === "!") {
          return true;
        }
      } else {
        index2++;
      }
    }
    return false;
  };
  isGlob = function isGlob2(str, options) {
    if (typeof str !== "string" || str === "") {
      return false;
    }
    if (isExtglob2(str)) {
      return true;
    }
    var check = strictCheck;
    if (options && options.strict === false) {
      check = relaxedCheck;
    }
    return check(str);
  };
  return isGlob;
}
var utils$1 = {};
var hasRequiredUtils$1;
function requireUtils$1() {
  if (hasRequiredUtils$1) return utils$1;
  hasRequiredUtils$1 = 1;
  (function(exports) {
    exports.isInteger = (num) => {
      if (typeof num === "number") {
        return Number.isInteger(num);
      }
      if (typeof num === "string" && num.trim() !== "") {
        return Number.isInteger(Number(num));
      }
      return false;
    };
    exports.find = (node, type) => node.nodes.find((node2) => node2.type === type);
    exports.exceedsLimit = (min, max, step = 1, limit) => {
      if (limit === false) return false;
      if (!exports.isInteger(min) || !exports.isInteger(max)) return false;
      return (Number(max) - Number(min)) / Number(step) >= limit;
    };
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
    exports.encloseBrace = (node) => {
      if (node.type !== "brace") return false;
      if (node.commas >> 0 + node.ranges >> 0 === 0) {
        node.invalid = true;
        return true;
      }
      return false;
    };
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
    exports.isOpenOrClose = (node) => {
      if (node.type === "open" || node.type === "close") {
        return true;
      }
      return node.open === true || node.close === true;
    };
    exports.reduce = (nodes) => nodes.reduce((acc, node) => {
      if (node.type === "text") acc.push(node.value);
      if (node.type === "range") node.type = "text";
      return acc;
    }, []);
    exports.flatten = (...args) => {
      const result = [];
      const flat = (arr) => {
        for (let i = 0; i < arr.length; i++) {
          const ele = arr[i];
          if (Array.isArray(ele)) {
            flat(ele);
            continue;
          }
          if (ele !== void 0) {
            result.push(ele);
          }
        }
        return result;
      };
      flat(args);
      return result;
    };
  })(utils$1);
  return utils$1;
}
var stringify;
var hasRequiredStringify;
function requireStringify() {
  if (hasRequiredStringify) return stringify;
  hasRequiredStringify = 1;
  const utils2 = requireUtils$1();
  stringify = (ast, options = {}) => {
    const stringify2 = (node, parent = {}) => {
      const invalidBlock = options.escapeInvalid && utils2.isInvalidBrace(parent);
      const invalidNode = node.invalid === true && options.escapeInvalid === true;
      let output = "";
      if (node.value) {
        if ((invalidBlock || invalidNode) && utils2.isOpenOrClose(node)) {
          return "\\" + node.value;
        }
        return node.value;
      }
      if (node.value) {
        return node.value;
      }
      if (node.nodes) {
        for (const child of node.nodes) {
          output += stringify2(child);
        }
      }
      return output;
    };
    return stringify2(ast);
  };
  return stringify;
}
/*!
 * is-number <https://github.com/jonschlinkert/is-number>
 *
 * Copyright (c) 2014-present, Jon Schlinkert.
 * Released under the MIT License.
 */
var isNumber;
var hasRequiredIsNumber;
function requireIsNumber() {
  if (hasRequiredIsNumber) return isNumber;
  hasRequiredIsNumber = 1;
  isNumber = function(num) {
    if (typeof num === "number") {
      return num - num === 0;
    }
    if (typeof num === "string" && num.trim() !== "") {
      return Number.isFinite ? Number.isFinite(+num) : isFinite(+num);
    }
    return false;
  };
  return isNumber;
}
/*!
 * to-regex-range <https://github.com/micromatch/to-regex-range>
 *
 * Copyright (c) 2015-present, Jon Schlinkert.
 * Released under the MIT License.
 */
var toRegexRange_1;
var hasRequiredToRegexRange;
function requireToRegexRange() {
  if (hasRequiredToRegexRange) return toRegexRange_1;
  hasRequiredToRegexRange = 1;
  const isNumber2 = requireIsNumber();
  const toRegexRange = (min, max, options) => {
    if (isNumber2(min) === false) {
      throw new TypeError("toRegexRange: expected the first argument to be a number");
    }
    if (max === void 0 || min === max) {
      return String(min);
    }
    if (isNumber2(max) === false) {
      throw new TypeError("toRegexRange: expected the second argument to be a number.");
    }
    let opts = { relaxZeros: true, ...options };
    if (typeof opts.strictZeros === "boolean") {
      opts.relaxZeros = opts.strictZeros === false;
    }
    let relax = String(opts.relaxZeros);
    let shorthand = String(opts.shorthand);
    let capture = String(opts.capture);
    let wrap = String(opts.wrap);
    let cacheKey = min + ":" + max + "=" + relax + shorthand + capture + wrap;
    if (toRegexRange.cache.hasOwnProperty(cacheKey)) {
      return toRegexRange.cache[cacheKey].result;
    }
    let a = Math.min(min, max);
    let b = Math.max(min, max);
    if (Math.abs(a - b) === 1) {
      let result = min + "|" + max;
      if (opts.capture) {
        return `(${result})`;
      }
      if (opts.wrap === false) {
        return result;
      }
      return `(?:${result})`;
    }
    let isPadded = hasPadding(min) || hasPadding(max);
    let state = { min, max, a, b };
    let positives = [];
    let negatives = [];
    if (isPadded) {
      state.isPadded = isPadded;
      state.maxLen = String(state.max).length;
    }
    if (a < 0) {
      let newMin = b < 0 ? Math.abs(b) : 1;
      negatives = splitToPatterns(newMin, Math.abs(a), state, opts);
      a = state.a = 0;
    }
    if (b >= 0) {
      positives = splitToPatterns(a, b, state, opts);
    }
    state.negatives = negatives;
    state.positives = positives;
    state.result = collatePatterns(negatives, positives);
    if (opts.capture === true) {
      state.result = `(${state.result})`;
    } else if (opts.wrap !== false && positives.length + negatives.length > 1) {
      state.result = `(?:${state.result})`;
    }
    toRegexRange.cache[cacheKey] = state;
    return state.result;
  };
  function collatePatterns(neg, pos, options) {
    let onlyNegative = filterPatterns(neg, pos, "-", false) || [];
    let onlyPositive = filterPatterns(pos, neg, "", false) || [];
    let intersected = filterPatterns(neg, pos, "-?", true) || [];
    let subpatterns = onlyNegative.concat(intersected).concat(onlyPositive);
    return subpatterns.join("|");
  }
  function splitToRanges(min, max) {
    let nines = 1;
    let zeros = 1;
    let stop = countNines(min, nines);
    let stops = /* @__PURE__ */ new Set([max]);
    while (min <= stop && stop <= max) {
      stops.add(stop);
      nines += 1;
      stop = countNines(min, nines);
    }
    stop = countZeros(max + 1, zeros) - 1;
    while (min < stop && stop <= max) {
      stops.add(stop);
      zeros += 1;
      stop = countZeros(max + 1, zeros) - 1;
    }
    stops = [...stops];
    stops.sort(compare);
    return stops;
  }
  function rangeToPattern(start, stop, options) {
    if (start === stop) {
      return { pattern: start, count: [], digits: 0 };
    }
    let zipped = zip(start, stop);
    let digits = zipped.length;
    let pattern = "";
    let count = 0;
    for (let i = 0; i < digits; i++) {
      let [startDigit, stopDigit] = zipped[i];
      if (startDigit === stopDigit) {
        pattern += startDigit;
      } else if (startDigit !== "0" || stopDigit !== "9") {
        pattern += toCharacterClass(startDigit, stopDigit);
      } else {
        count++;
      }
    }
    if (count) {
      pattern += options.shorthand === true ? "\\d" : "[0-9]";
    }
    return { pattern, count: [count], digits };
  }
  function splitToPatterns(min, max, tok, options) {
    let ranges = splitToRanges(min, max);
    let tokens = [];
    let start = min;
    let prev;
    for (let i = 0; i < ranges.length; i++) {
      let max2 = ranges[i];
      let obj = rangeToPattern(String(start), String(max2), options);
      let zeros = "";
      if (!tok.isPadded && prev && prev.pattern === obj.pattern) {
        if (prev.count.length > 1) {
          prev.count.pop();
        }
        prev.count.push(obj.count[0]);
        prev.string = prev.pattern + toQuantifier(prev.count);
        start = max2 + 1;
        continue;
      }
      if (tok.isPadded) {
        zeros = padZeros(max2, tok, options);
      }
      obj.string = zeros + obj.pattern + toQuantifier(obj.count);
      tokens.push(obj);
      start = max2 + 1;
      prev = obj;
    }
    return tokens;
  }
  function filterPatterns(arr, comparison, prefix, intersection, options) {
    let result = [];
    for (let ele of arr) {
      let { string } = ele;
      if (!intersection && !contains(comparison, "string", string)) {
        result.push(prefix + string);
      }
      if (intersection && contains(comparison, "string", string)) {
        result.push(prefix + string);
      }
    }
    return result;
  }
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
  function countZeros(integer, zeros) {
    return integer - integer % Math.pow(10, zeros);
  }
  function toQuantifier(digits) {
    let [start = 0, stop = ""] = digits;
    if (stop || start > 1) {
      return `{${start + (stop ? "," + stop : "")}}`;
    }
    return "";
  }
  function toCharacterClass(a, b, options) {
    return `[${a}${b - a === 1 ? "" : "-"}${b}]`;
  }
  function hasPadding(str) {
    return /^-?(0+)\d/.test(str);
  }
  function padZeros(value, tok, options) {
    if (!tok.isPadded) {
      return value;
    }
    let diff = Math.abs(tok.maxLen - String(value).length);
    let relax = options.relaxZeros !== false;
    switch (diff) {
      case 0:
        return "";
      case 1:
        return relax ? "0?" : "0";
      case 2:
        return relax ? "0{0,2}" : "00";
      default: {
        return relax ? `0{0,${diff}}` : `0{${diff}}`;
      }
    }
  }
  toRegexRange.cache = {};
  toRegexRange.clearCache = () => toRegexRange.cache = {};
  toRegexRange_1 = toRegexRange;
  return toRegexRange_1;
}
/*!
 * fill-range <https://github.com/jonschlinkert/fill-range>
 *
 * Copyright (c) 2014-present, Jon Schlinkert.
 * Licensed under the MIT License.
 */
var fillRange;
var hasRequiredFillRange;
function requireFillRange() {
  if (hasRequiredFillRange) return fillRange;
  hasRequiredFillRange = 1;
  const util = require$$0;
  const toRegexRange = requireToRegexRange();
  const isObject = (val) => val !== null && typeof val === "object" && !Array.isArray(val);
  const transform = (toNumber) => {
    return (value) => toNumber === true ? Number(value) : String(value);
  };
  const isValidValue = (value) => {
    return typeof value === "number" || typeof value === "string" && value !== "";
  };
  const isNumber2 = (num) => Number.isInteger(+num);
  const zeros = (input) => {
    let value = `${input}`;
    let index2 = -1;
    if (value[0] === "-") value = value.slice(1);
    if (value === "0") return false;
    while (value[++index2] === "0") ;
    return index2 > 0;
  };
  const stringify2 = (start, end, options) => {
    if (typeof start === "string" || typeof end === "string") {
      return true;
    }
    return options.stringify === true;
  };
  const pad = (input, maxLength, toNumber) => {
    if (maxLength > 0) {
      let dash = input[0] === "-" ? "-" : "";
      if (dash) input = input.slice(1);
      input = dash + input.padStart(dash ? maxLength - 1 : maxLength, "0");
    }
    if (toNumber === false) {
      return String(input);
    }
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
    let prefix = options.capture ? "" : "?:";
    let positives = "";
    let negatives = "";
    let result;
    if (parts.positives.length) {
      positives = parts.positives.map((v) => toMaxLen(String(v), maxLen)).join("|");
    }
    if (parts.negatives.length) {
      negatives = `-(${prefix}${parts.negatives.map((v) => toMaxLen(String(v), maxLen)).join("|")})`;
    }
    if (positives && negatives) {
      result = `${positives}|${negatives}`;
    } else {
      result = positives || negatives;
    }
    if (options.wrap) {
      return `(${prefix}${result})`;
    }
    return result;
  };
  const toRange = (a, b, isNumbers, options) => {
    if (isNumbers) {
      return toRegexRange(a, b, { wrap: false, ...options });
    }
    let start = String.fromCharCode(a);
    if (a === b) return start;
    let stop = String.fromCharCode(b);
    return `[${start}-${stop}]`;
  };
  const toRegex = (start, end, options) => {
    if (Array.isArray(start)) {
      let wrap = options.wrap === true;
      let prefix = options.capture ? "" : "?:";
      return wrap ? `(${prefix}${start.join("|")})` : start.join("|");
    }
    return toRegexRange(start, end, options);
  };
  const rangeError = (...args) => {
    return new RangeError("Invalid range arguments: " + util.inspect(...args));
  };
  const invalidRange = (start, end, options) => {
    if (options.strictRanges === true) throw rangeError([start, end]);
    return [];
  };
  const invalidStep = (step, options) => {
    if (options.strictRanges === true) {
      throw new TypeError(`Expected step "${step}" to be a number`);
    }
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
    let toNumber = padded === false && stringify2(start, end, options) === false;
    let format = options.transform || transform(toNumber);
    if (options.toRegex && step === 1) {
      return toRange(toMaxLen(start, maxLen), toMaxLen(end, maxLen), true, options);
    }
    let parts = { negatives: [], positives: [] };
    let push = (num) => parts[num < 0 ? "negatives" : "positives"].push(Math.abs(num));
    let range = [];
    let index2 = 0;
    while (descending ? a >= b : a <= b) {
      if (options.toRegex === true && step > 1) {
        push(a);
      } else {
        range.push(pad(format(a, index2), maxLen, toNumber));
      }
      a = descending ? a - step : a + step;
      index2++;
    }
    if (options.toRegex === true) {
      return step > 1 ? toSequence(parts, options, maxLen) : toRegex(range, null, { wrap: false, ...options });
    }
    return range;
  };
  const fillLetters = (start, end, step = 1, options = {}) => {
    if (!isNumber2(start) && start.length > 1 || !isNumber2(end) && end.length > 1) {
      return invalidRange(start, end, options);
    }
    let format = options.transform || ((val) => String.fromCharCode(val));
    let a = `${start}`.charCodeAt(0);
    let b = `${end}`.charCodeAt(0);
    let descending = a > b;
    let min = Math.min(a, b);
    let max = Math.max(a, b);
    if (options.toRegex && step === 1) {
      return toRange(min, max, false, options);
    }
    let range = [];
    let index2 = 0;
    while (descending ? a >= b : a <= b) {
      range.push(format(a, index2));
      a = descending ? a - step : a + step;
      index2++;
    }
    if (options.toRegex === true) {
      return toRegex(range, null, { wrap: false, options });
    }
    return range;
  };
  const fill = (start, end, step, options = {}) => {
    if (end == null && isValidValue(start)) {
      return [start];
    }
    if (!isValidValue(start) || !isValidValue(end)) {
      return invalidRange(start, end, options);
    }
    if (typeof step === "function") {
      return fill(start, end, 1, { transform: step });
    }
    if (isObject(step)) {
      return fill(start, end, 0, step);
    }
    let opts = { ...options };
    if (opts.capture === true) opts.wrap = true;
    step = step || opts.step || 1;
    if (!isNumber2(step)) {
      if (step != null && !isObject(step)) return invalidStep(step, opts);
      return fill(start, end, 1, step);
    }
    if (isNumber2(start) && isNumber2(end)) {
      return fillNumbers(start, end, step, opts);
    }
    return fillLetters(start, end, Math.max(Math.abs(step), 1), opts);
  };
  fillRange = fill;
  return fillRange;
}
var compile_1;
var hasRequiredCompile;
function requireCompile() {
  if (hasRequiredCompile) return compile_1;
  hasRequiredCompile = 1;
  const fill = requireFillRange();
  const utils2 = requireUtils$1();
  const compile = (ast, options = {}) => {
    const walk = (node, parent = {}) => {
      const invalidBlock = utils2.isInvalidBrace(parent);
      const invalidNode = node.invalid === true && options.escapeInvalid === true;
      const invalid = invalidBlock === true || invalidNode === true;
      const prefix = options.escapeInvalid === true ? "\\" : "";
      let output = "";
      if (node.isOpen === true) {
        return prefix + node.value;
      }
      if (node.isClose === true) {
        console.log("node.isClose", prefix, node.value);
        return prefix + node.value;
      }
      if (node.type === "open") {
        return invalid ? prefix + node.value : "(";
      }
      if (node.type === "close") {
        return invalid ? prefix + node.value : ")";
      }
      if (node.type === "comma") {
        return node.prev.type === "comma" ? "" : invalid ? node.value : "|";
      }
      if (node.value) {
        return node.value;
      }
      if (node.nodes && node.ranges > 0) {
        const args = utils2.reduce(node.nodes);
        const range = fill(...args, { ...options, wrap: false, toRegex: true, strictZeros: true });
        if (range.length !== 0) {
          return args.length > 1 && range.length > 1 ? `(${range})` : range;
        }
      }
      if (node.nodes) {
        for (const child of node.nodes) {
          output += walk(child, node);
        }
      }
      return output;
    };
    return walk(ast);
  };
  compile_1 = compile;
  return compile_1;
}
var expand_1;
var hasRequiredExpand;
function requireExpand() {
  if (hasRequiredExpand) return expand_1;
  hasRequiredExpand = 1;
  const fill = requireFillRange();
  const stringify2 = requireStringify();
  const utils2 = requireUtils$1();
  const append = (queue = "", stash = "", enclose = false) => {
    const result = [];
    queue = [].concat(queue);
    stash = [].concat(stash);
    if (!stash.length) return queue;
    if (!queue.length) {
      return enclose ? utils2.flatten(stash).map((ele) => `{${ele}}`) : stash;
    }
    for (const item of queue) {
      if (Array.isArray(item)) {
        for (const value of item) {
          result.push(append(value, stash, enclose));
        }
      } else {
        for (let ele of stash) {
          if (enclose === true && typeof ele === "string") ele = `{${ele}}`;
          result.push(Array.isArray(ele) ? append(item, ele, enclose) : item + ele);
        }
      }
    }
    return utils2.flatten(result);
  };
  const expand = (ast, options = {}) => {
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
        q.push(append(q.pop(), stringify2(node, options)));
        return;
      }
      if (node.type === "brace" && node.invalid !== true && node.nodes.length === 2) {
        q.push(append(q.pop(), ["{}"]));
        return;
      }
      if (node.nodes && node.ranges > 0) {
        const args = utils2.reduce(node.nodes);
        if (utils2.exceedsLimit(...args, options.step, rangeLimit)) {
          throw new RangeError("expanded array length exceeds range limit. Use options.rangeLimit to increase or disable the limit.");
        }
        let range = fill(...args, options);
        if (range.length === 0) {
          range = stringify2(node, options);
        }
        q.push(append(q.pop(), range));
        node.nodes = [];
        return;
      }
      const enclose = utils2.encloseBrace(node);
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
        if (child.nodes) {
          walk(child, node);
        }
      }
      return queue;
    };
    return utils2.flatten(walk(ast));
  };
  expand_1 = expand;
  return expand_1;
}
var constants$1;
var hasRequiredConstants$1;
function requireConstants$1() {
  if (hasRequiredConstants$1) return constants$1;
  hasRequiredConstants$1 = 1;
  constants$1 = {
    MAX_LENGTH: 1e4,
    // Digits
    CHAR_0: "0",
    /* 0 */
    CHAR_9: "9",
    /* 9 */
    // Alphabet chars.
    CHAR_UPPERCASE_A: "A",
    /* A */
    CHAR_LOWERCASE_A: "a",
    /* a */
    CHAR_UPPERCASE_Z: "Z",
    /* Z */
    CHAR_LOWERCASE_Z: "z",
    /* z */
    CHAR_LEFT_PARENTHESES: "(",
    /* ( */
    CHAR_RIGHT_PARENTHESES: ")",
    /* ) */
    CHAR_ASTERISK: "*",
    /* * */
    // Non-alphabetic chars.
    CHAR_AMPERSAND: "&",
    /* & */
    CHAR_AT: "@",
    /* @ */
    CHAR_BACKSLASH: "\\",
    /* \ */
    CHAR_BACKTICK: "`",
    /* ` */
    CHAR_CARRIAGE_RETURN: "\r",
    /* \r */
    CHAR_CIRCUMFLEX_ACCENT: "^",
    /* ^ */
    CHAR_COLON: ":",
    /* : */
    CHAR_COMMA: ",",
    /* , */
    CHAR_DOLLAR: "$",
    /* . */
    CHAR_DOT: ".",
    /* . */
    CHAR_DOUBLE_QUOTE: '"',
    /* " */
    CHAR_EQUAL: "=",
    /* = */
    CHAR_EXCLAMATION_MARK: "!",
    /* ! */
    CHAR_FORM_FEED: "\f",
    /* \f */
    CHAR_FORWARD_SLASH: "/",
    /* / */
    CHAR_HASH: "#",
    /* # */
    CHAR_HYPHEN_MINUS: "-",
    /* - */
    CHAR_LEFT_ANGLE_BRACKET: "<",
    /* < */
    CHAR_LEFT_CURLY_BRACE: "{",
    /* { */
    CHAR_LEFT_SQUARE_BRACKET: "[",
    /* [ */
    CHAR_LINE_FEED: "\n",
    /* \n */
    CHAR_NO_BREAK_SPACE: " ",
    /* \u00A0 */
    CHAR_PERCENT: "%",
    /* % */
    CHAR_PLUS: "+",
    /* + */
    CHAR_QUESTION_MARK: "?",
    /* ? */
    CHAR_RIGHT_ANGLE_BRACKET: ">",
    /* > */
    CHAR_RIGHT_CURLY_BRACE: "}",
    /* } */
    CHAR_RIGHT_SQUARE_BRACKET: "]",
    /* ] */
    CHAR_SEMICOLON: ";",
    /* ; */
    CHAR_SINGLE_QUOTE: "'",
    /* ' */
    CHAR_SPACE: " ",
    /*   */
    CHAR_TAB: "	",
    /* \t */
    CHAR_UNDERSCORE: "_",
    /* _ */
    CHAR_VERTICAL_LINE: "|",
    /* | */
    CHAR_ZERO_WIDTH_NOBREAK_SPACE: "\uFEFF"
    /* \uFEFF */
  };
  return constants$1;
}
var parse_1$1;
var hasRequiredParse$1;
function requireParse$1() {
  if (hasRequiredParse$1) return parse_1$1;
  hasRequiredParse$1 = 1;
  const stringify2 = requireStringify();
  const {
    MAX_LENGTH,
    CHAR_BACKSLASH,
    /* \ */
    CHAR_BACKTICK,
    /* ` */
    CHAR_COMMA,
    /* , */
    CHAR_DOT,
    /* . */
    CHAR_LEFT_PARENTHESES,
    /* ( */
    CHAR_RIGHT_PARENTHESES,
    /* ) */
    CHAR_LEFT_CURLY_BRACE,
    /* { */
    CHAR_RIGHT_CURLY_BRACE,
    /* } */
    CHAR_LEFT_SQUARE_BRACKET,
    /* [ */
    CHAR_RIGHT_SQUARE_BRACKET,
    /* ] */
    CHAR_DOUBLE_QUOTE,
    /* " */
    CHAR_SINGLE_QUOTE,
    /* ' */
    CHAR_NO_BREAK_SPACE,
    CHAR_ZERO_WIDTH_NOBREAK_SPACE
  } = requireConstants$1();
  const parse = (input, options = {}) => {
    if (typeof input !== "string") {
      throw new TypeError("Expected a string");
    }
    const opts = options || {};
    const max = typeof opts.maxLength === "number" ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
    if (input.length > max) {
      throw new SyntaxError(`Input length (${input.length}), exceeds max characters (${max})`);
    }
    const ast = { type: "root", input, nodes: [] };
    const stack = [ast];
    let block = ast;
    let prev = ast;
    let brackets = 0;
    const length = input.length;
    let index2 = 0;
    let depth = 0;
    let value;
    const advance = () => input[index2++];
    const push = (node) => {
      if (node.type === "text" && prev.type === "dot") {
        prev.type = "text";
      }
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
    while (index2 < length) {
      block = stack[stack.length - 1];
      value = advance();
      if (value === CHAR_ZERO_WIDTH_NOBREAK_SPACE || value === CHAR_NO_BREAK_SPACE) {
        continue;
      }
      if (value === CHAR_BACKSLASH) {
        push({ type: "text", value: (options.keepEscaping ? value : "") + advance() });
        continue;
      }
      if (value === CHAR_RIGHT_SQUARE_BRACKET) {
        push({ type: "text", value: "\\" + value });
        continue;
      }
      if (value === CHAR_LEFT_SQUARE_BRACKET) {
        brackets++;
        let next;
        while (index2 < length && (next = advance())) {
          value += next;
          if (next === CHAR_LEFT_SQUARE_BRACKET) {
            brackets++;
            continue;
          }
          if (next === CHAR_BACKSLASH) {
            value += advance();
            continue;
          }
          if (next === CHAR_RIGHT_SQUARE_BRACKET) {
            brackets--;
            if (brackets === 0) {
              break;
            }
          }
        }
        push({ type: "text", value });
        continue;
      }
      if (value === CHAR_LEFT_PARENTHESES) {
        block = push({ type: "paren", nodes: [] });
        stack.push(block);
        push({ type: "text", value });
        continue;
      }
      if (value === CHAR_RIGHT_PARENTHESES) {
        if (block.type !== "paren") {
          push({ type: "text", value });
          continue;
        }
        block = stack.pop();
        push({ type: "text", value });
        block = stack[stack.length - 1];
        continue;
      }
      if (value === CHAR_DOUBLE_QUOTE || value === CHAR_SINGLE_QUOTE || value === CHAR_BACKTICK) {
        const open = value;
        let next;
        if (options.keepQuotes !== true) {
          value = "";
        }
        while (index2 < length && (next = advance())) {
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
        push({ type: "text", value });
        continue;
      }
      if (value === CHAR_LEFT_CURLY_BRACE) {
        depth++;
        const dollar = prev.value && prev.value.slice(-1) === "$" || block.dollar === true;
        const brace = {
          type: "brace",
          open: true,
          close: false,
          dollar,
          depth,
          commas: 0,
          ranges: 0,
          nodes: []
        };
        block = push(brace);
        stack.push(block);
        push({ type: "open", value });
        continue;
      }
      if (value === CHAR_RIGHT_CURLY_BRACE) {
        if (block.type !== "brace") {
          push({ type: "text", value });
          continue;
        }
        const type = "close";
        block = stack.pop();
        block.close = true;
        push({ type, value });
        depth--;
        block = stack[stack.length - 1];
        continue;
      }
      if (value === CHAR_COMMA && depth > 0) {
        if (block.ranges > 0) {
          block.ranges = 0;
          const open = block.nodes.shift();
          block.nodes = [open, { type: "text", value: stringify2(block) }];
        }
        push({ type: "comma", value });
        block.commas++;
        continue;
      }
      if (value === CHAR_DOT && depth > 0 && block.commas === 0) {
        const siblings = block.nodes;
        if (depth === 0 || siblings.length === 0) {
          push({ type: "text", value });
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
        push({ type: "dot", value });
        continue;
      }
      push({ type: "text", value });
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
        const index3 = parent.nodes.indexOf(block);
        parent.nodes.splice(index3, 1, ...block.nodes);
      }
    } while (stack.length > 0);
    push({ type: "eos" });
    return ast;
  };
  parse_1$1 = parse;
  return parse_1$1;
}
var braces_1;
var hasRequiredBraces;
function requireBraces() {
  if (hasRequiredBraces) return braces_1;
  hasRequiredBraces = 1;
  const stringify2 = requireStringify();
  const compile = requireCompile();
  const expand = requireExpand();
  const parse = requireParse$1();
  const braces = (input, options = {}) => {
    let output = [];
    if (Array.isArray(input)) {
      for (const pattern of input) {
        const result = braces.create(pattern, options);
        if (Array.isArray(result)) {
          output.push(...result);
        } else {
          output.push(result);
        }
      }
    } else {
      output = [].concat(braces.create(input, options));
    }
    if (options && options.expand === true && options.nodupes === true) {
      output = [...new Set(output)];
    }
    return output;
  };
  braces.parse = (input, options = {}) => parse(input, options);
  braces.stringify = (input, options = {}) => {
    if (typeof input === "string") {
      return stringify2(braces.parse(input, options), options);
    }
    return stringify2(input, options);
  };
  braces.compile = (input, options = {}) => {
    if (typeof input === "string") {
      input = braces.parse(input, options);
    }
    return compile(input, options);
  };
  braces.expand = (input, options = {}) => {
    if (typeof input === "string") {
      input = braces.parse(input, options);
    }
    let result = expand(input, options);
    if (options.noempty === true) {
      result = result.filter(Boolean);
    }
    if (options.nodupes === true) {
      result = [...new Set(result)];
    }
    return result;
  };
  braces.create = (input, options = {}) => {
    if (input === "" || input.length < 3) {
      return [input];
    }
    return options.expand !== true ? braces.compile(input, options) : braces.expand(input, options);
  };
  braces_1 = braces;
  return braces_1;
}
var utils = {};
var constants;
var hasRequiredConstants;
function requireConstants() {
  if (hasRequiredConstants) return constants;
  hasRequiredConstants = 1;
  const path2 = require$$1$1;
  const WIN_SLASH = "\\\\/";
  const WIN_NO_SLASH = `[^${WIN_SLASH}]`;
  const DOT_LITERAL = "\\.";
  const PLUS_LITERAL = "\\+";
  const QMARK_LITERAL = "\\?";
  const SLASH_LITERAL = "\\/";
  const ONE_CHAR = "(?=.)";
  const QMARK = "[^/]";
  const END_ANCHOR = `(?:${SLASH_LITERAL}|$)`;
  const START_ANCHOR = `(?:^|${SLASH_LITERAL})`;
  const DOTS_SLASH = `${DOT_LITERAL}{1,2}${END_ANCHOR}`;
  const NO_DOT = `(?!${DOT_LITERAL})`;
  const NO_DOTS = `(?!${START_ANCHOR}${DOTS_SLASH})`;
  const NO_DOT_SLASH = `(?!${DOT_LITERAL}{0,1}${END_ANCHOR})`;
  const NO_DOTS_SLASH = `(?!${DOTS_SLASH})`;
  const QMARK_NO_DOT = `[^.${SLASH_LITERAL}]`;
  const STAR = `${QMARK}*?`;
  const POSIX_CHARS = {
    DOT_LITERAL,
    PLUS_LITERAL,
    QMARK_LITERAL,
    SLASH_LITERAL,
    ONE_CHAR,
    QMARK,
    END_ANCHOR,
    DOTS_SLASH,
    NO_DOT,
    NO_DOTS,
    NO_DOT_SLASH,
    NO_DOTS_SLASH,
    QMARK_NO_DOT,
    STAR,
    START_ANCHOR
  };
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
  const POSIX_REGEX_SOURCE = {
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
  constants = {
    MAX_LENGTH: 1024 * 64,
    POSIX_REGEX_SOURCE,
    // regular expressions
    REGEX_BACKSLASH: /\\(?![*+?^${}(|)[\]])/g,
    REGEX_NON_SPECIAL_CHARS: /^[^@![\].,$*+?^{}()|\\/]+/,
    REGEX_SPECIAL_CHARS: /[-*+?.^${}(|)[\]]/,
    REGEX_SPECIAL_CHARS_BACKREF: /(\\?)((\W)(\3*))/g,
    REGEX_SPECIAL_CHARS_GLOBAL: /([-*+?.^${}(|)[\]])/g,
    REGEX_REMOVE_BACKSLASH: /(?:\[.*?[^\\]\]|\\(?=.))/g,
    // Replace globs with equivalent patterns to reduce parsing time.
    REPLACEMENTS: {
      "***": "*",
      "**/**": "**",
      "**/**/**": "**"
    },
    // Digits
    CHAR_0: 48,
    /* 0 */
    CHAR_9: 57,
    /* 9 */
    // Alphabet chars.
    CHAR_UPPERCASE_A: 65,
    /* A */
    CHAR_LOWERCASE_A: 97,
    /* a */
    CHAR_UPPERCASE_Z: 90,
    /* Z */
    CHAR_LOWERCASE_Z: 122,
    /* z */
    CHAR_LEFT_PARENTHESES: 40,
    /* ( */
    CHAR_RIGHT_PARENTHESES: 41,
    /* ) */
    CHAR_ASTERISK: 42,
    /* * */
    // Non-alphabetic chars.
    CHAR_AMPERSAND: 38,
    /* & */
    CHAR_AT: 64,
    /* @ */
    CHAR_BACKWARD_SLASH: 92,
    /* \ */
    CHAR_CARRIAGE_RETURN: 13,
    /* \r */
    CHAR_CIRCUMFLEX_ACCENT: 94,
    /* ^ */
    CHAR_COLON: 58,
    /* : */
    CHAR_COMMA: 44,
    /* , */
    CHAR_DOT: 46,
    /* . */
    CHAR_DOUBLE_QUOTE: 34,
    /* " */
    CHAR_EQUAL: 61,
    /* = */
    CHAR_EXCLAMATION_MARK: 33,
    /* ! */
    CHAR_FORM_FEED: 12,
    /* \f */
    CHAR_FORWARD_SLASH: 47,
    /* / */
    CHAR_GRAVE_ACCENT: 96,
    /* ` */
    CHAR_HASH: 35,
    /* # */
    CHAR_HYPHEN_MINUS: 45,
    /* - */
    CHAR_LEFT_ANGLE_BRACKET: 60,
    /* < */
    CHAR_LEFT_CURLY_BRACE: 123,
    /* { */
    CHAR_LEFT_SQUARE_BRACKET: 91,
    /* [ */
    CHAR_LINE_FEED: 10,
    /* \n */
    CHAR_NO_BREAK_SPACE: 160,
    /* \u00A0 */
    CHAR_PERCENT: 37,
    /* % */
    CHAR_PLUS: 43,
    /* + */
    CHAR_QUESTION_MARK: 63,
    /* ? */
    CHAR_RIGHT_ANGLE_BRACKET: 62,
    /* > */
    CHAR_RIGHT_CURLY_BRACE: 125,
    /* } */
    CHAR_RIGHT_SQUARE_BRACKET: 93,
    /* ] */
    CHAR_SEMICOLON: 59,
    /* ; */
    CHAR_SINGLE_QUOTE: 39,
    /* ' */
    CHAR_SPACE: 32,
    /*   */
    CHAR_TAB: 9,
    /* \t */
    CHAR_UNDERSCORE: 95,
    /* _ */
    CHAR_VERTICAL_LINE: 124,
    /* | */
    CHAR_ZERO_WIDTH_NOBREAK_SPACE: 65279,
    /* \uFEFF */
    SEP: path2.sep,
    /**
     * Create EXTGLOB_CHARS
     */
    extglobChars(chars) {
      return {
        "!": { type: "negate", open: "(?:(?!(?:", close: `))${chars.STAR})` },
        "?": { type: "qmark", open: "(?:", close: ")?" },
        "+": { type: "plus", open: "(?:", close: ")+" },
        "*": { type: "star", open: "(?:", close: ")*" },
        "@": { type: "at", open: "(?:", close: ")" }
      };
    },
    /**
     * Create GLOB_CHARS
     */
    globChars(win32) {
      return win32 === true ? WINDOWS_CHARS : POSIX_CHARS;
    }
  };
  return constants;
}
var hasRequiredUtils;
function requireUtils() {
  if (hasRequiredUtils) return utils;
  hasRequiredUtils = 1;
  (function(exports) {
    const path2 = require$$1$1;
    const win32 = process.platform === "win32";
    const {
      REGEX_BACKSLASH,
      REGEX_REMOVE_BACKSLASH,
      REGEX_SPECIAL_CHARS,
      REGEX_SPECIAL_CHARS_GLOBAL
    } = requireConstants();
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
      if (segs.length === 3 && segs[0] >= 9 || segs[0] === 8 && segs[1] >= 10) {
        return true;
      }
      return false;
    };
    exports.isWindows = (options) => {
      if (options && typeof options.windows === "boolean") {
        return options.windows;
      }
      return win32 === true || path2.sep === "\\";
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
      const prepend = options.contains ? "" : "^";
      const append = options.contains ? "" : "$";
      let output = `${prepend}(?:${input})${append}`;
      if (state.negated === true) {
        output = `(?:^(?!${output}).*$)`;
      }
      return output;
    };
  })(utils);
  return utils;
}
var scan_1;
var hasRequiredScan;
function requireScan() {
  if (hasRequiredScan) return scan_1;
  hasRequiredScan = 1;
  const utils2 = requireUtils();
  const {
    CHAR_ASTERISK,
    /* * */
    CHAR_AT,
    /* @ */
    CHAR_BACKWARD_SLASH,
    /* \ */
    CHAR_COMMA,
    /* , */
    CHAR_DOT,
    /* . */
    CHAR_EXCLAMATION_MARK,
    /* ! */
    CHAR_FORWARD_SLASH,
    /* / */
    CHAR_LEFT_CURLY_BRACE,
    /* { */
    CHAR_LEFT_PARENTHESES,
    /* ( */
    CHAR_LEFT_SQUARE_BRACKET,
    /* [ */
    CHAR_PLUS,
    /* + */
    CHAR_QUESTION_MARK,
    /* ? */
    CHAR_RIGHT_CURLY_BRACE,
    /* } */
    CHAR_RIGHT_PARENTHESES,
    /* ) */
    CHAR_RIGHT_SQUARE_BRACKET
    /* ] */
  } = requireConstants();
  const isPathSeparator = (code) => {
    return code === CHAR_FORWARD_SLASH || code === CHAR_BACKWARD_SLASH;
  };
  const depth = (token) => {
    if (token.isPrefix !== true) {
      token.depth = token.isGlobstar ? Infinity : 1;
    }
  };
  const scan = (input, options) => {
    const opts = options || {};
    const length = input.length - 1;
    const scanToEnd = opts.parts === true || opts.scanToEnd === true;
    const slashes = [];
    const tokens = [];
    const parts = [];
    let str = input;
    let index2 = -1;
    let start = 0;
    let lastIndex = 0;
    let isBrace = false;
    let isBracket = false;
    let isGlob2 = false;
    let isExtglob2 = false;
    let isGlobstar = false;
    let braceEscaped = false;
    let backslashes = false;
    let negated = false;
    let negatedExtglob = false;
    let finished = false;
    let braces = 0;
    let prev;
    let code;
    let token = { value: "", depth: 0, isGlob: false };
    const eos = () => index2 >= length;
    const peek = () => str.charCodeAt(index2 + 1);
    const advance = () => {
      prev = code;
      return str.charCodeAt(++index2);
    };
    while (index2 < length) {
      code = advance();
      let next;
      if (code === CHAR_BACKWARD_SLASH) {
        backslashes = token.backslashes = true;
        code = advance();
        if (code === CHAR_LEFT_CURLY_BRACE) {
          braceEscaped = true;
        }
        continue;
      }
      if (braceEscaped === true || code === CHAR_LEFT_CURLY_BRACE) {
        braces++;
        while (eos() !== true && (code = advance())) {
          if (code === CHAR_BACKWARD_SLASH) {
            backslashes = token.backslashes = true;
            advance();
            continue;
          }
          if (code === CHAR_LEFT_CURLY_BRACE) {
            braces++;
            continue;
          }
          if (braceEscaped !== true && code === CHAR_DOT && (code = advance()) === CHAR_DOT) {
            isBrace = token.isBrace = true;
            isGlob2 = token.isGlob = true;
            finished = true;
            if (scanToEnd === true) {
              continue;
            }
            break;
          }
          if (braceEscaped !== true && code === CHAR_COMMA) {
            isBrace = token.isBrace = true;
            isGlob2 = token.isGlob = true;
            finished = true;
            if (scanToEnd === true) {
              continue;
            }
            break;
          }
          if (code === CHAR_RIGHT_CURLY_BRACE) {
            braces--;
            if (braces === 0) {
              braceEscaped = false;
              isBrace = token.isBrace = true;
              finished = true;
              break;
            }
          }
        }
        if (scanToEnd === true) {
          continue;
        }
        break;
      }
      if (code === CHAR_FORWARD_SLASH) {
        slashes.push(index2);
        tokens.push(token);
        token = { value: "", depth: 0, isGlob: false };
        if (finished === true) continue;
        if (prev === CHAR_DOT && index2 === start + 1) {
          start += 2;
          continue;
        }
        lastIndex = index2 + 1;
        continue;
      }
      if (opts.noext !== true) {
        const isExtglobChar = code === CHAR_PLUS || code === CHAR_AT || code === CHAR_ASTERISK || code === CHAR_QUESTION_MARK || code === CHAR_EXCLAMATION_MARK;
        if (isExtglobChar === true && peek() === CHAR_LEFT_PARENTHESES) {
          isGlob2 = token.isGlob = true;
          isExtglob2 = token.isExtglob = true;
          finished = true;
          if (code === CHAR_EXCLAMATION_MARK && index2 === start) {
            negatedExtglob = true;
          }
          if (scanToEnd === true) {
            while (eos() !== true && (code = advance())) {
              if (code === CHAR_BACKWARD_SLASH) {
                backslashes = token.backslashes = true;
                code = advance();
                continue;
              }
              if (code === CHAR_RIGHT_PARENTHESES) {
                isGlob2 = token.isGlob = true;
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
        isGlob2 = token.isGlob = true;
        finished = true;
        if (scanToEnd === true) {
          continue;
        }
        break;
      }
      if (code === CHAR_QUESTION_MARK) {
        isGlob2 = token.isGlob = true;
        finished = true;
        if (scanToEnd === true) {
          continue;
        }
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
            isGlob2 = token.isGlob = true;
            finished = true;
            break;
          }
        }
        if (scanToEnd === true) {
          continue;
        }
        break;
      }
      if (opts.nonegate !== true && code === CHAR_EXCLAMATION_MARK && index2 === start) {
        negated = token.negated = true;
        start++;
        continue;
      }
      if (opts.noparen !== true && code === CHAR_LEFT_PARENTHESES) {
        isGlob2 = token.isGlob = true;
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
      if (isGlob2 === true) {
        finished = true;
        if (scanToEnd === true) {
          continue;
        }
        break;
      }
    }
    if (opts.noext === true) {
      isExtglob2 = false;
      isGlob2 = false;
    }
    let base2 = str;
    let prefix = "";
    let glob = "";
    if (start > 0) {
      prefix = str.slice(0, start);
      str = str.slice(start);
      lastIndex -= start;
    }
    if (base2 && isGlob2 === true && lastIndex > 0) {
      base2 = str.slice(0, lastIndex);
      glob = str.slice(lastIndex);
    } else if (isGlob2 === true) {
      base2 = "";
      glob = str;
    } else {
      base2 = str;
    }
    if (base2 && base2 !== "" && base2 !== "/" && base2 !== str) {
      if (isPathSeparator(base2.charCodeAt(base2.length - 1))) {
        base2 = base2.slice(0, -1);
      }
    }
    if (opts.unescape === true) {
      if (glob) glob = utils2.removeBackslashes(glob);
      if (base2 && backslashes === true) {
        base2 = utils2.removeBackslashes(base2);
      }
    }
    const state = {
      prefix,
      input,
      start,
      base: base2,
      glob,
      isBrace,
      isBracket,
      isGlob: isGlob2,
      isExtglob: isExtglob2,
      isGlobstar,
      negated,
      negatedExtglob
    };
    if (opts.tokens === true) {
      state.maxDepth = 0;
      if (!isPathSeparator(code)) {
        tokens.push(token);
      }
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
            tokens[idx].value = prefix;
          } else {
            tokens[idx].value = value;
          }
          depth(tokens[idx]);
          state.maxDepth += tokens[idx].depth;
        }
        if (idx !== 0 || value !== "") {
          parts.push(value);
        }
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
  scan_1 = scan;
  return scan_1;
}
var parse_1;
var hasRequiredParse;
function requireParse() {
  if (hasRequiredParse) return parse_1;
  hasRequiredParse = 1;
  const constants2 = requireConstants();
  const utils2 = requireUtils();
  const {
    MAX_LENGTH,
    POSIX_REGEX_SOURCE,
    REGEX_NON_SPECIAL_CHARS,
    REGEX_SPECIAL_CHARS_BACKREF,
    REPLACEMENTS
  } = constants2;
  const expandRange = (args, options) => {
    if (typeof options.expandRange === "function") {
      return options.expandRange(...args, options);
    }
    args.sort();
    const value = `[${args.join("-")}]`;
    try {
      new RegExp(value);
    } catch (ex) {
      return args.map((v) => utils2.escapeRegex(v)).join("..");
    }
    return value;
  };
  const syntaxError = (type, char) => {
    return `Missing ${type}: "${char}" - use "\\\\${char}" to match literal characters`;
  };
  const parse = (input, options) => {
    if (typeof input !== "string") {
      throw new TypeError("Expected a string");
    }
    input = REPLACEMENTS[input] || input;
    const opts = { ...options };
    const max = typeof opts.maxLength === "number" ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
    let len = input.length;
    if (len > max) {
      throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
    }
    const bos = { type: "bos", value: "", output: opts.prepend || "" };
    const tokens = [bos];
    const capture = opts.capture ? "" : "?:";
    const win32 = utils2.isWindows(options);
    const PLATFORM_CHARS = constants2.globChars(win32);
    const EXTGLOB_CHARS = constants2.extglobChars(PLATFORM_CHARS);
    const {
      DOT_LITERAL,
      PLUS_LITERAL,
      SLASH_LITERAL,
      ONE_CHAR,
      DOTS_SLASH,
      NO_DOT,
      NO_DOT_SLASH,
      NO_DOTS_SLASH,
      QMARK,
      QMARK_NO_DOT,
      STAR,
      START_ANCHOR
    } = PLATFORM_CHARS;
    const globstar = (opts2) => {
      return `(${capture}(?:(?!${START_ANCHOR}${opts2.dot ? DOTS_SLASH : DOT_LITERAL}).)*?)`;
    };
    const nodot = opts.dot ? "" : NO_DOT;
    const qmarkNoDot = opts.dot ? QMARK : QMARK_NO_DOT;
    let star = opts.bash === true ? globstar(opts) : STAR;
    if (opts.capture) {
      star = `(${star})`;
    }
    if (typeof opts.noext === "boolean") {
      opts.noextglob = opts.noext;
    }
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
    input = utils2.removePrefix(input, state);
    len = input.length;
    const extglobs = [];
    const braces = [];
    const stack = [];
    let prev = bos;
    let value;
    const eos = () => state.index === len - 1;
    const peek = state.peek = (n = 1) => input[state.index + n];
    const advance = state.advance = () => input[++state.index] || "";
    const remaining = () => input.slice(state.index + 1);
    const consume = (value2 = "", num = 0) => {
      state.consumed += value2;
      state.index += num;
    };
    const append = (token) => {
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
      if (count % 2 === 0) {
        return false;
      }
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
    const push = (tok) => {
      if (prev.type === "globstar") {
        const isBrace = state.braces > 0 && (tok.type === "comma" || tok.type === "brace");
        const isExtglob2 = tok.extglob === true || extglobs.length && (tok.type === "pipe" || tok.type === "paren");
        if (tok.type !== "slash" && tok.type !== "paren" && !isBrace && !isExtglob2) {
          state.output = state.output.slice(0, -prev.output.length);
          prev.type = "star";
          prev.value = "*";
          prev.output = star;
          state.output += prev.output;
        }
      }
      if (extglobs.length && tok.type !== "paren") {
        extglobs[extglobs.length - 1].inner += tok.value;
      }
      if (tok.value || tok.output) append(tok);
      if (prev && prev.type === "text" && tok.type === "text") {
        prev.value += tok.value;
        prev.output = (prev.output || "") + tok.value;
        return;
      }
      tok.prev = prev;
      tokens.push(tok);
      prev = tok;
    };
    const extglobOpen = (type, value2) => {
      const token = { ...EXTGLOB_CHARS[value2], conditions: 1, inner: "" };
      token.prev = prev;
      token.parens = state.parens;
      token.output = state.output;
      const output = (opts.capture ? "(" : "") + token.open;
      increment("parens");
      push({ type, value: value2, output: state.output ? "" : ONE_CHAR });
      push({ type: "paren", extglob: true, value: advance(), output });
      extglobs.push(token);
    };
    const extglobClose = (token) => {
      let output = token.close + (opts.capture ? ")" : "");
      let rest;
      if (token.type === "negate") {
        let extglobStar = star;
        if (token.inner && token.inner.length > 1 && token.inner.includes("/")) {
          extglobStar = globstar(opts);
        }
        if (extglobStar !== star || eos() || /^\)+$/.test(remaining())) {
          output = token.close = `)$))${extglobStar}`;
        }
        if (token.inner.includes("*") && (rest = remaining()) && /^\.[^\\/.]+$/.test(rest)) {
          const expression = parse(rest, { ...options, fastpaths: false }).output;
          output = token.close = `)${expression})${extglobStar})`;
        }
        if (token.prev.type === "bos") {
          state.negatedExtglob = true;
        }
      }
      push({ type: "paren", extglob: true, value, output });
      decrement("parens");
    };
    if (opts.fastpaths !== false && !/(^[*!]|[/()[\]{}"])/.test(input)) {
      let backslashes = false;
      let output = input.replace(REGEX_SPECIAL_CHARS_BACKREF, (m, esc, chars, first, rest, index2) => {
        if (first === "\\") {
          backslashes = true;
          return m;
        }
        if (first === "?") {
          if (esc) {
            return esc + first + (rest ? QMARK.repeat(rest.length) : "");
          }
          if (index2 === 0) {
            return qmarkNoDot + (rest ? QMARK.repeat(rest.length) : "");
          }
          return QMARK.repeat(chars.length);
        }
        if (first === ".") {
          return DOT_LITERAL.repeat(chars.length);
        }
        if (first === "*") {
          if (esc) {
            return esc + first + (rest ? star : "");
          }
          return star;
        }
        return esc ? m : `\\${m}`;
      });
      if (backslashes === true) {
        if (opts.unescape === true) {
          output = output.replace(/\\/g, "");
        } else {
          output = output.replace(/\\+/g, (m) => {
            return m.length % 2 === 0 ? "\\\\" : m ? "\\" : "";
          });
        }
      }
      if (output === input && opts.contains === true) {
        state.output = input;
        return state;
      }
      state.output = utils2.wrapOutput(output, state, options);
      return state;
    }
    while (!eos()) {
      value = advance();
      if (value === "\0") {
        continue;
      }
      if (value === "\\") {
        const next = peek();
        if (next === "/" && opts.bash !== true) {
          continue;
        }
        if (next === "." || next === ";") {
          continue;
        }
        if (!next) {
          value += "\\";
          push({ type: "text", value });
          continue;
        }
        const match = /^\\+/.exec(remaining());
        let slashes = 0;
        if (match && match[0].length > 2) {
          slashes = match[0].length;
          state.index += slashes;
          if (slashes % 2 !== 0) {
            value += "\\";
          }
        }
        if (opts.unescape === true) {
          value = advance();
        } else {
          value += advance();
        }
        if (state.brackets === 0) {
          push({ type: "text", value });
          continue;
        }
      }
      if (state.brackets > 0 && (value !== "]" || prev.value === "[" || prev.value === "[^")) {
        if (opts.posix !== false && value === ":") {
          const inner = prev.value.slice(1);
          if (inner.includes("[")) {
            prev.posix = true;
            if (inner.includes(":")) {
              const idx = prev.value.lastIndexOf("[");
              const pre = prev.value.slice(0, idx);
              const rest2 = prev.value.slice(idx + 2);
              const posix = POSIX_REGEX_SOURCE[rest2];
              if (posix) {
                prev.value = pre + posix;
                state.backtrack = true;
                advance();
                if (!bos.output && tokens.indexOf(prev) === 1) {
                  bos.output = ONE_CHAR;
                }
                continue;
              }
            }
          }
        }
        if (value === "[" && peek() !== ":" || value === "-" && peek() === "]") {
          value = `\\${value}`;
        }
        if (value === "]" && (prev.value === "[" || prev.value === "[^")) {
          value = `\\${value}`;
        }
        if (opts.posix === true && value === "!" && prev.value === "[") {
          value = "^";
        }
        prev.value += value;
        append({ value });
        continue;
      }
      if (state.quotes === 1 && value !== '"') {
        value = utils2.escapeRegex(value);
        prev.value += value;
        append({ value });
        continue;
      }
      if (value === '"') {
        state.quotes = state.quotes === 1 ? 0 : 1;
        if (opts.keepQuotes === true) {
          push({ type: "text", value });
        }
        continue;
      }
      if (value === "(") {
        increment("parens");
        push({ type: "paren", value });
        continue;
      }
      if (value === ")") {
        if (state.parens === 0 && opts.strictBrackets === true) {
          throw new SyntaxError(syntaxError("opening", "("));
        }
        const extglob = extglobs[extglobs.length - 1];
        if (extglob && state.parens === extglob.parens + 1) {
          extglobClose(extglobs.pop());
          continue;
        }
        push({ type: "paren", value, output: state.parens ? ")" : "\\)" });
        decrement("parens");
        continue;
      }
      if (value === "[") {
        if (opts.nobracket === true || !remaining().includes("]")) {
          if (opts.nobracket !== true && opts.strictBrackets === true) {
            throw new SyntaxError(syntaxError("closing", "]"));
          }
          value = `\\${value}`;
        } else {
          increment("brackets");
        }
        push({ type: "bracket", value });
        continue;
      }
      if (value === "]") {
        if (opts.nobracket === true || prev && prev.type === "bracket" && prev.value.length === 1) {
          push({ type: "text", value, output: `\\${value}` });
          continue;
        }
        if (state.brackets === 0) {
          if (opts.strictBrackets === true) {
            throw new SyntaxError(syntaxError("opening", "["));
          }
          push({ type: "text", value, output: `\\${value}` });
          continue;
        }
        decrement("brackets");
        const prevValue = prev.value.slice(1);
        if (prev.posix !== true && prevValue[0] === "^" && !prevValue.includes("/")) {
          value = `/${value}`;
        }
        prev.value += value;
        append({ value });
        if (opts.literalBrackets === false || utils2.hasRegexChars(prevValue)) {
          continue;
        }
        const escaped = utils2.escapeRegex(prev.value);
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
      if (value === "{" && opts.nobrace !== true) {
        increment("braces");
        const open = {
          type: "brace",
          value,
          output: "(",
          outputIndex: state.output.length,
          tokensIndex: state.tokens.length
        };
        braces.push(open);
        push(open);
        continue;
      }
      if (value === "}") {
        const brace = braces[braces.length - 1];
        if (opts.nobrace === true || !brace) {
          push({ type: "text", value, output: value });
          continue;
        }
        let output = ")";
        if (brace.dots === true) {
          const arr = tokens.slice();
          const range = [];
          for (let i = arr.length - 1; i >= 0; i--) {
            tokens.pop();
            if (arr[i].type === "brace") {
              break;
            }
            if (arr[i].type !== "dots") {
              range.unshift(arr[i].value);
            }
          }
          output = expandRange(range, opts);
          state.backtrack = true;
        }
        if (brace.comma !== true && brace.dots !== true) {
          const out = state.output.slice(0, brace.outputIndex);
          const toks = state.tokens.slice(brace.tokensIndex);
          brace.value = brace.output = "\\{";
          value = output = "\\}";
          state.output = out;
          for (const t of toks) {
            state.output += t.output || t.value;
          }
        }
        push({ type: "brace", value, output });
        decrement("braces");
        braces.pop();
        continue;
      }
      if (value === "|") {
        if (extglobs.length > 0) {
          extglobs[extglobs.length - 1].conditions++;
        }
        push({ type: "text", value });
        continue;
      }
      if (value === ",") {
        let output = value;
        const brace = braces[braces.length - 1];
        if (brace && stack[stack.length - 1] === "braces") {
          brace.comma = true;
          output = "|";
        }
        push({ type: "comma", value, output });
        continue;
      }
      if (value === "/") {
        if (prev.type === "dot" && state.index === state.start + 1) {
          state.start = state.index + 1;
          state.consumed = "";
          state.output = "";
          tokens.pop();
          prev = bos;
          continue;
        }
        push({ type: "slash", value, output: SLASH_LITERAL });
        continue;
      }
      if (value === ".") {
        if (state.braces > 0 && prev.type === "dot") {
          if (prev.value === ".") prev.output = DOT_LITERAL;
          const brace = braces[braces.length - 1];
          prev.type = "dots";
          prev.output += value;
          prev.value += value;
          brace.dots = true;
          continue;
        }
        if (state.braces + state.parens === 0 && prev.type !== "bos" && prev.type !== "slash") {
          push({ type: "text", value, output: DOT_LITERAL });
          continue;
        }
        push({ type: "dot", value, output: DOT_LITERAL });
        continue;
      }
      if (value === "?") {
        const isGroup = prev && prev.value === "(";
        if (!isGroup && opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
          extglobOpen("qmark", value);
          continue;
        }
        if (prev && prev.type === "paren") {
          const next = peek();
          let output = value;
          if (next === "<" && !utils2.supportsLookbehinds()) {
            throw new Error("Node.js v10 or higher is required for regex lookbehinds");
          }
          if (prev.value === "(" && !/[!=<:]/.test(next) || next === "<" && !/<([!=]|\w+>)/.test(remaining())) {
            output = `\\${value}`;
          }
          push({ type: "text", value, output });
          continue;
        }
        if (opts.dot !== true && (prev.type === "slash" || prev.type === "bos")) {
          push({ type: "qmark", value, output: QMARK_NO_DOT });
          continue;
        }
        push({ type: "qmark", value, output: QMARK });
        continue;
      }
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
      if (value === "+") {
        if (opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
          extglobOpen("plus", value);
          continue;
        }
        if (prev && prev.value === "(" || opts.regex === false) {
          push({ type: "plus", value, output: PLUS_LITERAL });
          continue;
        }
        if (prev && (prev.type === "bracket" || prev.type === "paren" || prev.type === "brace") || state.parens > 0) {
          push({ type: "plus", value });
          continue;
        }
        push({ type: "plus", value: PLUS_LITERAL });
        continue;
      }
      if (value === "@") {
        if (opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
          push({ type: "at", extglob: true, value, output: "" });
          continue;
        }
        push({ type: "text", value });
        continue;
      }
      if (value !== "*") {
        if (value === "$" || value === "^") {
          value = `\\${value}`;
        }
        const match = REGEX_NON_SPECIAL_CHARS.exec(remaining());
        if (match) {
          value += match[0];
          state.index += match[0].length;
        }
        push({ type: "text", value });
        continue;
      }
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
          push({ type: "star", value, output: "" });
          continue;
        }
        const isBrace = state.braces > 0 && (prior.type === "comma" || prior.type === "brace");
        const isExtglob2 = extglobs.length && (prior.type === "pipe" || prior.type === "paren");
        if (!isStart && prior.type !== "paren" && !isBrace && !isExtglob2) {
          push({ type: "star", value, output: "" });
          continue;
        }
        while (rest.slice(0, 3) === "/**") {
          const after = input[state.index + 4];
          if (after && after !== "/") {
            break;
          }
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
          prev.output = `${globstar(opts)}${SLASH_LITERAL}|${SLASH_LITERAL}${end})`;
          prev.value += value;
          state.output += prior.output + prev.output;
          state.globstar = true;
          consume(value + advance());
          push({ type: "slash", value: "/", output: "" });
          continue;
        }
        if (prior.type === "bos" && rest[0] === "/") {
          prev.type = "globstar";
          prev.value += value;
          prev.output = `(?:^|${SLASH_LITERAL}|${globstar(opts)}${SLASH_LITERAL})`;
          state.output = prev.output;
          state.globstar = true;
          consume(value + advance());
          push({ type: "slash", value: "/", output: "" });
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
      const token = { type: "star", value, output: star };
      if (opts.bash === true) {
        token.output = ".*?";
        if (prev.type === "bos" || prev.type === "slash") {
          token.output = nodot + token.output;
        }
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
          state.output += ONE_CHAR;
          prev.output += ONE_CHAR;
        }
      }
      push(token);
    }
    while (state.brackets > 0) {
      if (opts.strictBrackets === true) throw new SyntaxError(syntaxError("closing", "]"));
      state.output = utils2.escapeLast(state.output, "[");
      decrement("brackets");
    }
    while (state.parens > 0) {
      if (opts.strictBrackets === true) throw new SyntaxError(syntaxError("closing", ")"));
      state.output = utils2.escapeLast(state.output, "(");
      decrement("parens");
    }
    while (state.braces > 0) {
      if (opts.strictBrackets === true) throw new SyntaxError(syntaxError("closing", "}"));
      state.output = utils2.escapeLast(state.output, "{");
      decrement("braces");
    }
    if (opts.strictSlashes !== true && (prev.type === "star" || prev.type === "bracket")) {
      push({ type: "maybe_slash", value: "", output: `${SLASH_LITERAL}?` });
    }
    if (state.backtrack === true) {
      state.output = "";
      for (const token of state.tokens) {
        state.output += token.output != null ? token.output : token.value;
        if (token.suffix) {
          state.output += token.suffix;
        }
      }
    }
    return state;
  };
  parse.fastpaths = (input, options) => {
    const opts = { ...options };
    const max = typeof opts.maxLength === "number" ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
    const len = input.length;
    if (len > max) {
      throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
    }
    input = REPLACEMENTS[input] || input;
    const win32 = utils2.isWindows(options);
    const {
      DOT_LITERAL,
      SLASH_LITERAL,
      ONE_CHAR,
      DOTS_SLASH,
      NO_DOT,
      NO_DOTS,
      NO_DOTS_SLASH,
      STAR,
      START_ANCHOR
    } = constants2.globChars(win32);
    const nodot = opts.dot ? NO_DOTS : NO_DOT;
    const slashDot = opts.dot ? NO_DOTS_SLASH : NO_DOT;
    const capture = opts.capture ? "" : "?:";
    const state = { negated: false, prefix: "" };
    let star = opts.bash === true ? ".*?" : STAR;
    if (opts.capture) {
      star = `(${star})`;
    }
    const globstar = (opts2) => {
      if (opts2.noglobstar === true) return star;
      return `(${capture}(?:(?!${START_ANCHOR}${opts2.dot ? DOTS_SLASH : DOT_LITERAL}).)*?)`;
    };
    const create = (str) => {
      switch (str) {
        case "*":
          return `${nodot}${ONE_CHAR}${star}`;
        case ".*":
          return `${DOT_LITERAL}${ONE_CHAR}${star}`;
        case "*.*":
          return `${nodot}${star}${DOT_LITERAL}${ONE_CHAR}${star}`;
        case "*/*":
          return `${nodot}${star}${SLASH_LITERAL}${ONE_CHAR}${slashDot}${star}`;
        case "**":
          return nodot + globstar(opts);
        case "**/*":
          return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${slashDot}${ONE_CHAR}${star}`;
        case "**/*.*":
          return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${slashDot}${star}${DOT_LITERAL}${ONE_CHAR}${star}`;
        case "**/.*":
          return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${DOT_LITERAL}${ONE_CHAR}${star}`;
        default: {
          const match = /^(.*?)\.(\w+)$/.exec(str);
          if (!match) return;
          const source2 = create(match[1]);
          if (!source2) return;
          return source2 + DOT_LITERAL + match[2];
        }
      }
    };
    const output = utils2.removePrefix(input, state);
    let source = create(output);
    if (source && opts.strictSlashes !== true) {
      source += `${SLASH_LITERAL}?`;
    }
    return source;
  };
  parse_1 = parse;
  return parse_1;
}
var picomatch_1;
var hasRequiredPicomatch$1;
function requirePicomatch$1() {
  if (hasRequiredPicomatch$1) return picomatch_1;
  hasRequiredPicomatch$1 = 1;
  const path2 = require$$1$1;
  const scan = requireScan();
  const parse = requireParse();
  const utils2 = requireUtils();
  const constants2 = requireConstants();
  const isObject = (val) => val && typeof val === "object" && !Array.isArray(val);
  const picomatch2 = (glob, options, returnState = false) => {
    if (Array.isArray(glob)) {
      const fns = glob.map((input) => picomatch2(input, options, returnState));
      const arrayMatcher = (str) => {
        for (const isMatch of fns) {
          const state2 = isMatch(str);
          if (state2) return state2;
        }
        return false;
      };
      return arrayMatcher;
    }
    const isState = isObject(glob) && glob.tokens && glob.input;
    if (glob === "" || typeof glob !== "string" && !isState) {
      throw new TypeError("Expected pattern to be a non-empty string");
    }
    const opts = options || {};
    const posix = utils2.isWindows(options);
    const regex = isState ? picomatch2.compileRe(glob, options) : picomatch2.makeRe(glob, options, false, true);
    const state = regex.state;
    delete regex.state;
    let isIgnored = () => false;
    if (opts.ignore) {
      const ignoreOpts = { ...options, ignore: null, onMatch: null, onResult: null };
      isIgnored = picomatch2(opts.ignore, ignoreOpts, returnState);
    }
    const matcher = (input, returnObject = false) => {
      const { isMatch, match, output } = picomatch2.test(input, regex, options, { glob, posix });
      const result = { glob, state, regex, posix, input, output, match, isMatch };
      if (typeof opts.onResult === "function") {
        opts.onResult(result);
      }
      if (isMatch === false) {
        result.isMatch = false;
        return returnObject ? result : false;
      }
      if (isIgnored(input)) {
        if (typeof opts.onIgnore === "function") {
          opts.onIgnore(result);
        }
        result.isMatch = false;
        return returnObject ? result : false;
      }
      if (typeof opts.onMatch === "function") {
        opts.onMatch(result);
      }
      return returnObject ? result : true;
    };
    if (returnState) {
      matcher.state = state;
    }
    return matcher;
  };
  picomatch2.test = (input, regex, options, { glob, posix } = {}) => {
    if (typeof input !== "string") {
      throw new TypeError("Expected input to be a string");
    }
    if (input === "") {
      return { isMatch: false, output: "" };
    }
    const opts = options || {};
    const format = opts.format || (posix ? utils2.toPosixSlashes : null);
    let match = input === glob;
    let output = match && format ? format(input) : input;
    if (match === false) {
      output = format ? format(input) : input;
      match = output === glob;
    }
    if (match === false || opts.capture === true) {
      if (opts.matchBase === true || opts.basename === true) {
        match = picomatch2.matchBase(input, regex, options, posix);
      } else {
        match = regex.exec(output);
      }
    }
    return { isMatch: Boolean(match), match, output };
  };
  picomatch2.matchBase = (input, glob, options, posix = utils2.isWindows(options)) => {
    const regex = glob instanceof RegExp ? glob : picomatch2.makeRe(glob, options);
    return regex.test(path2.basename(input));
  };
  picomatch2.isMatch = (str, patterns, options) => picomatch2(patterns, options)(str);
  picomatch2.parse = (pattern, options) => {
    if (Array.isArray(pattern)) return pattern.map((p) => picomatch2.parse(p, options));
    return parse(pattern, { ...options, fastpaths: false });
  };
  picomatch2.scan = (input, options) => scan(input, options);
  picomatch2.compileRe = (state, options, returnOutput = false, returnState = false) => {
    if (returnOutput === true) {
      return state.output;
    }
    const opts = options || {};
    const prepend = opts.contains ? "" : "^";
    const append = opts.contains ? "" : "$";
    let source = `${prepend}(?:${state.output})${append}`;
    if (state && state.negated === true) {
      source = `^(?!${source}).*$`;
    }
    const regex = picomatch2.toRegex(source, options);
    if (returnState === true) {
      regex.state = state;
    }
    return regex;
  };
  picomatch2.makeRe = (input, options = {}, returnOutput = false, returnState = false) => {
    if (!input || typeof input !== "string") {
      throw new TypeError("Expected a non-empty string");
    }
    let parsed = { negated: false, fastpaths: true };
    if (options.fastpaths !== false && (input[0] === "." || input[0] === "*")) {
      parsed.output = parse.fastpaths(input, options);
    }
    if (!parsed.output) {
      parsed = parse(input, options);
    }
    return picomatch2.compileRe(parsed, options, returnOutput, returnState);
  };
  picomatch2.toRegex = (source, options) => {
    try {
      const opts = options || {};
      return new RegExp(source, opts.flags || (opts.nocase ? "i" : ""));
    } catch (err) {
      if (options && options.debug === true) throw err;
      return /$^/;
    }
  };
  picomatch2.constants = constants2;
  picomatch_1 = picomatch2;
  return picomatch_1;
}
var picomatch;
var hasRequiredPicomatch;
function requirePicomatch() {
  if (hasRequiredPicomatch) return picomatch;
  hasRequiredPicomatch = 1;
  picomatch = requirePicomatch$1();
  return picomatch;
}
var micromatch_1;
var hasRequiredMicromatch;
function requireMicromatch() {
  if (hasRequiredMicromatch) return micromatch_1;
  hasRequiredMicromatch = 1;
  const util = require$$0;
  const braces = requireBraces();
  const picomatch2 = requirePicomatch();
  const utils2 = requireUtils();
  const isEmptyString = (v) => v === "" || v === "./";
  const hasBraces = (v) => {
    const index2 = v.indexOf("{");
    return index2 > -1 && v.indexOf("}", index2) > -1;
  };
  const micromatch = (list, patterns, options) => {
    patterns = [].concat(patterns);
    list = [].concat(list);
    let omit = /* @__PURE__ */ new Set();
    let keep = /* @__PURE__ */ new Set();
    let items = /* @__PURE__ */ new Set();
    let negatives = 0;
    let onResult = (state) => {
      items.add(state.output);
      if (options && options.onResult) {
        options.onResult(state);
      }
    };
    for (let i = 0; i < patterns.length; i++) {
      let isMatch = picomatch2(String(patterns[i]), { ...options, onResult }, true);
      let negated = isMatch.state.negated || isMatch.state.negatedExtglob;
      if (negated) negatives++;
      for (let item of list) {
        let matched = isMatch(item, true);
        let match = negated ? !matched.isMatch : matched.isMatch;
        if (!match) continue;
        if (negated) {
          omit.add(matched.output);
        } else {
          omit.delete(matched.output);
          keep.add(matched.output);
        }
      }
    }
    let result = negatives === patterns.length ? [...items] : [...keep];
    let matches = result.filter((item) => !omit.has(item));
    if (options && matches.length === 0) {
      if (options.failglob === true) {
        throw new Error(`No matches found for "${patterns.join(", ")}"`);
      }
      if (options.nonull === true || options.nullglob === true) {
        return options.unescape ? patterns.map((p) => p.replace(/\\/g, "")) : patterns;
      }
    }
    return matches;
  };
  micromatch.match = micromatch;
  micromatch.matcher = (pattern, options) => picomatch2(pattern, options);
  micromatch.isMatch = (str, patterns, options) => picomatch2(patterns, options)(str);
  micromatch.any = micromatch.isMatch;
  micromatch.not = (list, patterns, options = {}) => {
    patterns = [].concat(patterns).map(String);
    let result = /* @__PURE__ */ new Set();
    let items = [];
    let onResult = (state) => {
      if (options.onResult) options.onResult(state);
      items.push(state.output);
    };
    let matches = new Set(micromatch(list, patterns, { ...options, onResult }));
    for (let item of items) {
      if (!matches.has(item)) {
        result.add(item);
      }
    }
    return [...result];
  };
  micromatch.contains = (str, pattern, options) => {
    if (typeof str !== "string") {
      throw new TypeError(`Expected a string: "${util.inspect(str)}"`);
    }
    if (Array.isArray(pattern)) {
      return pattern.some((p) => micromatch.contains(str, p, options));
    }
    if (typeof pattern === "string") {
      if (isEmptyString(str) || isEmptyString(pattern)) {
        return false;
      }
      if (str.includes(pattern) || str.startsWith("./") && str.slice(2).includes(pattern)) {
        return true;
      }
    }
    return micromatch.isMatch(str, pattern, { ...options, contains: true });
  };
  micromatch.matchKeys = (obj, patterns, options) => {
    if (!utils2.isObject(obj)) {
      throw new TypeError("Expected the first argument to be an object");
    }
    let keys = micromatch(Object.keys(obj), patterns, options);
    let res = {};
    for (let key of keys) res[key] = obj[key];
    return res;
  };
  micromatch.some = (list, patterns, options) => {
    let items = [].concat(list);
    for (let pattern of [].concat(patterns)) {
      let isMatch = picomatch2(String(pattern), options);
      if (items.some((item) => isMatch(item))) {
        return true;
      }
    }
    return false;
  };
  micromatch.every = (list, patterns, options) => {
    let items = [].concat(list);
    for (let pattern of [].concat(patterns)) {
      let isMatch = picomatch2(String(pattern), options);
      if (!items.every((item) => isMatch(item))) {
        return false;
      }
    }
    return true;
  };
  micromatch.all = (str, patterns, options) => {
    if (typeof str !== "string") {
      throw new TypeError(`Expected a string: "${util.inspect(str)}"`);
    }
    return [].concat(patterns).every((p) => picomatch2(p, options)(str));
  };
  micromatch.capture = (glob, input, options) => {
    let posix = utils2.isWindows(options);
    let regex = picomatch2.makeRe(String(glob), { ...options, capture: true });
    let match = regex.exec(posix ? utils2.toPosixSlashes(input) : input);
    if (match) {
      return match.slice(1).map((v) => v === void 0 ? "" : v);
    }
  };
  micromatch.makeRe = (...args) => picomatch2.makeRe(...args);
  micromatch.scan = (...args) => picomatch2.scan(...args);
  micromatch.parse = (patterns, options) => {
    let res = [];
    for (let pattern of [].concat(patterns || [])) {
      for (let str of braces(String(pattern), options)) {
        res.push(picomatch2.parse(str, options));
      }
    }
    return res;
  };
  micromatch.braces = (pattern, options) => {
    if (typeof pattern !== "string") throw new TypeError("Expected a string");
    if (options && options.nobrace === true || !hasBraces(pattern)) {
      return [pattern];
    }
    return braces(pattern, options);
  };
  micromatch.braceExpand = (pattern, options) => {
    if (typeof pattern !== "string") throw new TypeError("Expected a string");
    return micromatch.braces(pattern, { ...options, expand: true });
  };
  micromatch.hasBraces = hasBraces;
  micromatch_1 = micromatch;
  return micromatch_1;
}
var hasRequiredPathFilter;
function requirePathFilter() {
  if (hasRequiredPathFilter) return pathFilter;
  hasRequiredPathFilter = 1;
  Object.defineProperty(pathFilter, "__esModule", { value: true });
  pathFilter.matchPathFilter = matchPathFilter;
  const isGlob2 = requireIsGlob();
  const micromatch = requireMicromatch();
  const url = require$$0$1;
  const errors_1 = requireErrors();
  function matchPathFilter(pathFilter2 = "/", uri, req) {
    if (isStringPath(pathFilter2)) {
      return matchSingleStringPath(pathFilter2, uri);
    }
    if (isGlobPath(pathFilter2)) {
      return matchSingleGlobPath(pathFilter2, uri);
    }
    if (Array.isArray(pathFilter2)) {
      if (pathFilter2.every(isStringPath)) {
        return matchMultiPath(pathFilter2, uri);
      }
      if (pathFilter2.every(isGlobPath)) {
        return matchMultiGlobPath(pathFilter2, uri);
      }
      throw new Error(errors_1.ERRORS.ERR_CONTEXT_MATCHER_INVALID_ARRAY);
    }
    if (typeof pathFilter2 === "function") {
      const pathname = getUrlPathName(uri);
      return pathFilter2(pathname, req);
    }
    throw new Error(errors_1.ERRORS.ERR_CONTEXT_MATCHER_GENERIC);
  }
  function matchSingleStringPath(pathFilter2, uri) {
    const pathname = getUrlPathName(uri);
    return pathname?.indexOf(pathFilter2) === 0;
  }
  function matchSingleGlobPath(pattern, uri) {
    const pathname = getUrlPathName(uri);
    const matches = micromatch([pathname], pattern);
    return matches && matches.length > 0;
  }
  function matchMultiGlobPath(patternList, uri) {
    return matchSingleGlobPath(patternList, uri);
  }
  function matchMultiPath(pathFilterList, uri) {
    let isMultiPath = false;
    for (const context of pathFilterList) {
      if (matchSingleStringPath(context, uri)) {
        isMultiPath = true;
        break;
      }
    }
    return isMultiPath;
  }
  function getUrlPathName(uri) {
    return uri && url.parse(uri).pathname;
  }
  function isStringPath(pathFilter2) {
    return typeof pathFilter2 === "string" && !isGlob2(pathFilter2);
  }
  function isGlobPath(pathFilter2) {
    return isGlob2(pathFilter2);
  }
  return pathFilter;
}
var pathRewriter = {};
var isPlainObject = {};
var hasRequiredIsPlainObject;
function requireIsPlainObject() {
  if (hasRequiredIsPlainObject) return isPlainObject;
  hasRequiredIsPlainObject = 1;
  Object.defineProperty(isPlainObject, "__esModule", { value: true });
  /*!
   * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
   *
   * Copyright (c) 2014-2017, Jon Schlinkert.
   * Released under the MIT License.
   */
  function isObject(o) {
    return Object.prototype.toString.call(o) === "[object Object]";
  }
  function isPlainObject$1(o) {
    var ctor, prot;
    if (isObject(o) === false) return false;
    ctor = o.constructor;
    if (ctor === void 0) return true;
    prot = ctor.prototype;
    if (isObject(prot) === false) return false;
    if (prot.hasOwnProperty("isPrototypeOf") === false) {
      return false;
    }
    return true;
  }
  isPlainObject.isPlainObject = isPlainObject$1;
  return isPlainObject;
}
var hasRequiredPathRewriter;
function requirePathRewriter() {
  if (hasRequiredPathRewriter) return pathRewriter;
  hasRequiredPathRewriter = 1;
  Object.defineProperty(pathRewriter, "__esModule", { value: true });
  pathRewriter.createPathRewriter = createPathRewriter;
  const is_plain_object_1 = requireIsPlainObject();
  const errors_1 = requireErrors();
  const debug_12 = requireDebug();
  const debug2 = debug_12.Debug.extend("path-rewriter");
  function createPathRewriter(rewriteConfig) {
    let rulesCache;
    if (!isValidRewriteConfig(rewriteConfig)) {
      return;
    }
    if (typeof rewriteConfig === "function") {
      const customRewriteFn = rewriteConfig;
      return customRewriteFn;
    } else {
      rulesCache = parsePathRewriteRules(rewriteConfig);
      return rewritePath;
    }
    function rewritePath(path2) {
      let result = path2;
      for (const rule of rulesCache) {
        if (rule.regex.test(path2)) {
          result = result.replace(rule.regex, rule.value);
          debug2('rewriting path from "%s" to "%s"', path2, result);
          break;
        }
      }
      return result;
    }
  }
  function isValidRewriteConfig(rewriteConfig) {
    if (typeof rewriteConfig === "function") {
      return true;
    } else if ((0, is_plain_object_1.isPlainObject)(rewriteConfig)) {
      return Object.keys(rewriteConfig).length !== 0;
    } else if (rewriteConfig === void 0 || rewriteConfig === null) {
      return false;
    } else {
      throw new Error(errors_1.ERRORS.ERR_PATH_REWRITER_CONFIG);
    }
  }
  function parsePathRewriteRules(rewriteConfig) {
    const rules = [];
    if ((0, is_plain_object_1.isPlainObject)(rewriteConfig)) {
      for (const [key, value] of Object.entries(rewriteConfig)) {
        rules.push({
          regex: new RegExp(key),
          value
        });
        debug2('rewrite rule created: "%s" ~> "%s"', key, value);
      }
    }
    return rules;
  }
  return pathRewriter;
}
var router = {};
var hasRequiredRouter;
function requireRouter() {
  if (hasRequiredRouter) return router;
  hasRequiredRouter = 1;
  Object.defineProperty(router, "__esModule", { value: true });
  router.getTarget = getTarget;
  const is_plain_object_1 = requireIsPlainObject();
  const debug_12 = requireDebug();
  const debug2 = debug_12.Debug.extend("router");
  async function getTarget(req, config) {
    let newTarget;
    const router2 = config.router;
    if ((0, is_plain_object_1.isPlainObject)(router2)) {
      newTarget = getTargetFromProxyTable(req, router2);
    } else if (typeof router2 === "function") {
      newTarget = await router2(req);
    }
    return newTarget;
  }
  function getTargetFromProxyTable(req, table) {
    let result;
    const host = req.headers.host;
    const path2 = req.url;
    const hostAndPath = host + path2;
    for (const [key, value] of Object.entries(table)) {
      if (containsPath(key)) {
        if (hostAndPath.indexOf(key) > -1) {
          result = value;
          debug2('match: "%s" -> "%s"', key, result);
          break;
        }
      } else {
        if (key === host) {
          result = value;
          debug2('match: "%s" -> "%s"', host, result);
          break;
        }
      }
    }
    return result;
  }
  function containsPath(v) {
    return v.indexOf("/") > -1;
  }
  return router;
}
var hasRequiredHttpProxyMiddleware;
function requireHttpProxyMiddleware() {
  if (hasRequiredHttpProxyMiddleware) return httpProxyMiddleware;
  hasRequiredHttpProxyMiddleware = 1;
  Object.defineProperty(httpProxyMiddleware, "__esModule", { value: true });
  httpProxyMiddleware.HttpProxyMiddleware = void 0;
  const httpProxy2 = requireHttpProxy();
  const configuration_1 = requireConfiguration();
  const get_plugins_1 = requireGetPlugins();
  const path_filter_1 = requirePathFilter();
  const PathRewriter = requirePathRewriter();
  const Router = requireRouter();
  const debug_12 = requireDebug();
  const function_1 = require_function();
  const logger_1 = requireLogger();
  class HttpProxyMiddleware {
    constructor(options) {
      this.wsInternalSubscribed = false;
      this.serverOnCloseSubscribed = false;
      this.middleware = async (req, res, next) => {
        if (this.shouldProxy(this.proxyOptions.pathFilter, req)) {
          try {
            const activeProxyOptions = await this.prepareProxyRequest(req);
            (0, debug_12.Debug)(`proxy request to target: %O`, activeProxyOptions.target);
            this.proxy.web(req, res, activeProxyOptions);
          } catch (err) {
            next?.(err);
          }
        } else {
          next?.();
        }
        const server2 = (req.socket ?? req.connection)?.server;
        if (server2 && !this.serverOnCloseSubscribed) {
          server2.on("close", () => {
            (0, debug_12.Debug)("server close signal received: closing proxy server");
            this.proxy.close();
          });
          this.serverOnCloseSubscribed = true;
        }
        if (this.proxyOptions.ws === true) {
          this.catchUpgradeRequest(server2);
        }
      };
      this.catchUpgradeRequest = (server2) => {
        if (!this.wsInternalSubscribed) {
          (0, debug_12.Debug)("subscribing to server upgrade event");
          server2.on("upgrade", this.handleUpgrade);
          this.wsInternalSubscribed = true;
        }
      };
      this.handleUpgrade = async (req, socket, head) => {
        try {
          if (this.shouldProxy(this.proxyOptions.pathFilter, req)) {
            const activeProxyOptions = await this.prepareProxyRequest(req);
            this.proxy.ws(req, socket, head, activeProxyOptions);
            (0, debug_12.Debug)("server upgrade event received. Proxying WebSocket");
          }
        } catch (err) {
          this.proxy.emit("error", err, req, socket);
        }
      };
      this.shouldProxy = (pathFilter2, req) => {
        try {
          return (0, path_filter_1.matchPathFilter)(pathFilter2, req.url, req);
        } catch (err) {
          (0, debug_12.Debug)("Error: matchPathFilter() called with request url: ", `"${req.url}"`);
          this.logger.error(err);
          return false;
        }
      };
      this.prepareProxyRequest = async (req) => {
        if (this.middleware.__LEGACY_HTTP_PROXY_MIDDLEWARE__) {
          req.url = req.originalUrl || req.url;
        }
        const newProxyOptions = Object.assign({}, this.proxyOptions);
        await this.applyRouter(req, newProxyOptions);
        await this.applyPathRewrite(req, this.pathRewriter);
        return newProxyOptions;
      };
      this.applyRouter = async (req, options2) => {
        let newTarget;
        if (options2.router) {
          newTarget = await Router.getTarget(req, options2);
          if (newTarget) {
            (0, debug_12.Debug)('router new target: "%s"', newTarget);
            options2.target = newTarget;
          }
        }
      };
      this.applyPathRewrite = async (req, pathRewriter2) => {
        if (pathRewriter2) {
          const path2 = await pathRewriter2(req.url, req);
          if (typeof path2 === "string") {
            (0, debug_12.Debug)("pathRewrite new path: %s", req.url);
            req.url = path2;
          } else {
            (0, debug_12.Debug)("pathRewrite: no rewritten path found: %s", req.url);
          }
        }
      };
      (0, configuration_1.verifyConfig)(options);
      this.proxyOptions = options;
      this.logger = (0, logger_1.getLogger)(options);
      (0, debug_12.Debug)(`create proxy server`);
      this.proxy = httpProxy2.createProxyServer({});
      this.registerPlugins(this.proxy, this.proxyOptions);
      this.pathRewriter = PathRewriter.createPathRewriter(this.proxyOptions.pathRewrite);
      this.middleware.upgrade = (req, socket, head) => {
        if (!this.wsInternalSubscribed) {
          this.handleUpgrade(req, socket, head);
        }
      };
    }
    registerPlugins(proxy, options) {
      const plugins = (0, get_plugins_1.getPlugins)(options);
      plugins.forEach((plugin) => {
        (0, debug_12.Debug)(`register plugin: "${(0, function_1.getFunctionName)(plugin)}"`);
        plugin(proxy, options);
      });
    }
  }
  httpProxyMiddleware.HttpProxyMiddleware = HttpProxyMiddleware;
  return httpProxyMiddleware;
}
var hasRequiredFactory;
function requireFactory() {
  if (hasRequiredFactory) return factory;
  hasRequiredFactory = 1;
  Object.defineProperty(factory, "__esModule", { value: true });
  factory.createProxyMiddleware = createProxyMiddleware2;
  const http_proxy_middleware_1 = requireHttpProxyMiddleware();
  function createProxyMiddleware2(options) {
    const { middleware } = new http_proxy_middleware_1.HttpProxyMiddleware(options);
    return middleware;
  }
  return factory;
}
var handlers = {};
var _public$1 = {};
var responseInterceptor = {};
var hasRequiredResponseInterceptor;
function requireResponseInterceptor() {
  if (hasRequiredResponseInterceptor) return responseInterceptor;
  hasRequiredResponseInterceptor = 1;
  Object.defineProperty(responseInterceptor, "__esModule", { value: true });
  responseInterceptor.responseInterceptor = responseInterceptor$1;
  const zlib$1 = zlib;
  const debug_12 = requireDebug();
  const function_1 = require_function();
  const debug2 = debug_12.Debug.extend("response-interceptor");
  function responseInterceptor$1(interceptor) {
    return async function proxyResResponseInterceptor(proxyRes, req, res) {
      debug2("intercept proxy response");
      const originalProxyRes = proxyRes;
      let buffer = Buffer.from("", "utf8");
      const _proxyRes = decompress(proxyRes, proxyRes.headers["content-encoding"]);
      _proxyRes.on("data", (chunk) => buffer = Buffer.concat([buffer, chunk]));
      _proxyRes.on("end", async () => {
        copyHeaders(proxyRes, res);
        debug2("call interceptor function: %s", (0, function_1.getFunctionName)(interceptor));
        const interceptedBuffer = Buffer.from(await interceptor(buffer, originalProxyRes, req, res));
        debug2("set content-length: %s", Buffer.byteLength(interceptedBuffer, "utf8"));
        res.setHeader("content-length", Buffer.byteLength(interceptedBuffer, "utf8"));
        debug2("write intercepted response");
        res.write(interceptedBuffer);
        res.end();
      });
      _proxyRes.on("error", (error) => {
        res.end(`Error fetching proxied request: ${error.message}`);
      });
    };
  }
  function decompress(proxyRes, contentEncoding) {
    let _proxyRes = proxyRes;
    let decompress2;
    switch (contentEncoding) {
      case "gzip":
        decompress2 = zlib$1.createGunzip();
        break;
      case "br":
        decompress2 = zlib$1.createBrotliDecompress();
        break;
      case "deflate":
        decompress2 = zlib$1.createInflate();
        break;
    }
    if (decompress2) {
      debug2(`decompress proxy response with 'content-encoding': %s`, contentEncoding);
      _proxyRes.pipe(decompress2);
      _proxyRes = decompress2;
    }
    return _proxyRes;
  }
  function copyHeaders(originalResponse, response) {
    debug2("copy original response headers");
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
    } else {
      response.headers = originalResponse.headers;
    }
  }
  return responseInterceptor;
}
var fixRequestBody = {};
var hasRequiredFixRequestBody;
function requireFixRequestBody() {
  if (hasRequiredFixRequestBody) return fixRequestBody;
  hasRequiredFixRequestBody = 1;
  Object.defineProperty(fixRequestBody, "__esModule", { value: true });
  fixRequestBody.fixRequestBody = fixRequestBody$1;
  const querystring = require$$6$1;
  function fixRequestBody$1(proxyReq, req) {
    if (req.readableLength !== 0) {
      return;
    }
    const requestBody = req.body;
    if (!requestBody) {
      return;
    }
    const contentType = proxyReq.getHeader("Content-Type");
    if (!contentType) {
      return;
    }
    const writeBody = (bodyData) => {
      proxyReq.setHeader("Content-Length", Buffer.byteLength(bodyData));
      proxyReq.write(bodyData);
    };
    if (contentType.includes("application/json") || contentType.includes("+json")) {
      writeBody(JSON.stringify(requestBody));
    } else if (contentType.includes("application/x-www-form-urlencoded")) {
      writeBody(querystring.stringify(requestBody));
    } else if (contentType.includes("multipart/form-data")) {
      writeBody(handlerFormDataBodyData(contentType, requestBody));
    }
  }
  function handlerFormDataBodyData(contentType, data) {
    const boundary = contentType.replace(/^.*boundary=(.*)$/, "$1");
    let str = "";
    for (const [key, value] of Object.entries(data)) {
      str += `--${boundary}\r
Content-Disposition: form-data; name="${key}"\r
\r
${value}\r
`;
    }
    return str;
  }
  return fixRequestBody;
}
var hasRequired_public$1;
function require_public$1() {
  if (hasRequired_public$1) return _public$1;
  hasRequired_public$1 = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.fixRequestBody = exports.responseInterceptor = void 0;
    var response_interceptor_1 = requireResponseInterceptor();
    Object.defineProperty(exports, "responseInterceptor", { enumerable: true, get: function() {
      return response_interceptor_1.responseInterceptor;
    } });
    var fix_request_body_1 = requireFixRequestBody();
    Object.defineProperty(exports, "fixRequestBody", { enumerable: true, get: function() {
      return fix_request_body_1.fixRequestBody;
    } });
  })(_public$1);
  return _public$1;
}
var hasRequiredHandlers;
function requireHandlers() {
  if (hasRequiredHandlers) return handlers;
  hasRequiredHandlers = 1;
  (function(exports) {
    var __createBinding = handlers && handlers.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = handlers && handlers.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_public$1(), exports);
  })(handlers);
  return handlers;
}
var legacy = {};
var _public = {};
var createProxyMiddleware = {};
var optionsAdapter = {};
var hasRequiredOptionsAdapter;
function requireOptionsAdapter() {
  if (hasRequiredOptionsAdapter) return optionsAdapter;
  hasRequiredOptionsAdapter = 1;
  Object.defineProperty(optionsAdapter, "__esModule", { value: true });
  optionsAdapter.legacyOptionsAdapter = legacyOptionsAdapter;
  const url = require$$0$1;
  const debug_12 = requireDebug();
  const logger_1 = requireLogger();
  const debug2 = debug_12.Debug.extend("legacy-options-adapter");
  const proxyEventMap = {
    onError: "error",
    onProxyReq: "proxyReq",
    onProxyRes: "proxyRes",
    onProxyReqWs: "proxyReqWs",
    onOpen: "open",
    onClose: "close"
  };
  function legacyOptionsAdapter(legacyContext, legacyOptions) {
    let options = {};
    let logger2;
    if (typeof legacyContext === "string" && !!url.parse(legacyContext).host) {
      throw new Error(`Shorthand syntax is removed from legacyCreateProxyMiddleware().
      Please use "legacyCreateProxyMiddleware({ target: 'http://www.example.org' })" instead.

      More details: https://github.com/chimurai/http-proxy-middleware/blob/master/MIGRATION.md#removed-shorthand-usage
      `);
    }
    if (legacyContext && legacyOptions) {
      debug2("map legacy context/filter to options.pathFilter");
      options = { ...legacyOptions, pathFilter: legacyContext };
      logger2 = getLegacyLogger(options);
      logger2.warn(`[http-proxy-middleware] Legacy "context" argument is deprecated. Migrate your "context" to "options.pathFilter":

      const options = {
        pathFilter: '${legacyContext}',
      }

      More details: https://github.com/chimurai/http-proxy-middleware/blob/master/MIGRATION.md#removed-context-argument
      `);
    } else if (legacyContext && !legacyOptions) {
      options = { ...legacyContext };
      logger2 = getLegacyLogger(options);
    } else {
      logger2 = getLegacyLogger({});
    }
    Object.entries(proxyEventMap).forEach(([legacyEventName, proxyEventName]) => {
      if (options[legacyEventName]) {
        options.on = { ...options.on };
        options.on[proxyEventName] = options[legacyEventName];
        debug2('map legacy event "%s" to "on.%s"', legacyEventName, proxyEventName);
        logger2.warn(`[http-proxy-middleware] Legacy "${legacyEventName}" is deprecated. Migrate to "options.on.${proxyEventName}":

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
    debug2("legacy logLevel", logLevel);
    debug2("legacy logProvider: %O", logProvider);
    if (typeof logLevel === "string" && logLevel !== "silent") {
      debug2('map "logProvider" to "logger"');
      logger2.warn(`[http-proxy-middleware] Legacy "logLevel" and "logProvider" are deprecated. Migrate to "options.logger":

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
    if (legacyLogger) {
      options.logger = legacyLogger;
    }
    return (0, logger_1.getLogger)(options);
  }
  return optionsAdapter;
}
var hasRequiredCreateProxyMiddleware;
function requireCreateProxyMiddleware() {
  if (hasRequiredCreateProxyMiddleware) return createProxyMiddleware;
  hasRequiredCreateProxyMiddleware = 1;
  Object.defineProperty(createProxyMiddleware, "__esModule", { value: true });
  createProxyMiddleware.legacyCreateProxyMiddleware = legacyCreateProxyMiddleware;
  const factory_1 = requireFactory();
  const debug_12 = requireDebug();
  const options_adapter_1 = requireOptionsAdapter();
  const debug2 = debug_12.Debug.extend("legacy-create-proxy-middleware");
  function legacyCreateProxyMiddleware(legacyContext, legacyOptions) {
    debug2("init");
    const options = (0, options_adapter_1.legacyOptionsAdapter)(legacyContext, legacyOptions);
    const proxyMiddleware = (0, factory_1.createProxyMiddleware)(options);
    debug2("add marker for patching req.url (old behavior)");
    proxyMiddleware.__LEGACY_HTTP_PROXY_MIDDLEWARE__ = true;
    return proxyMiddleware;
  }
  return createProxyMiddleware;
}
var hasRequired_public;
function require_public() {
  if (hasRequired_public) return _public;
  hasRequired_public = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.legacyCreateProxyMiddleware = void 0;
    var create_proxy_middleware_1 = requireCreateProxyMiddleware();
    Object.defineProperty(exports, "legacyCreateProxyMiddleware", { enumerable: true, get: function() {
      return create_proxy_middleware_1.legacyCreateProxyMiddleware;
    } });
  })(_public);
  return _public;
}
var hasRequiredLegacy;
function requireLegacy() {
  if (hasRequiredLegacy) return legacy;
  hasRequiredLegacy = 1;
  (function(exports) {
    var __createBinding = legacy && legacy.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = legacy && legacy.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_public(), exports);
  })(legacy);
  return legacy;
}
var hasRequiredDist;
function requireDist() {
  if (hasRequiredDist) return dist;
  hasRequiredDist = 1;
  (function(exports) {
    var __createBinding = dist && dist.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = dist && dist.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(requireFactory(), exports);
    __exportStar(requireHandlers(), exports);
    __exportStar(require_default(), exports);
    __exportStar(requireLegacy(), exports);
  })(dist);
  return dist;
}
var distExports = requireDist();
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var cjs;
var hasRequiredCjs;
function requireCjs() {
  if (hasRequiredCjs) return cjs;
  hasRequiredCjs = 1;
  const e = fs, r = require$$1$1$1, t = require$$1, n = require$$2, o = require$$0$1, i = require$$1$1;
  var a, u, s = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof commonjsGlobal ? commonjsGlobal : "undefined" != typeof self ? self : {};
  function l(e2) {
    return e2 && e2.__esModule && Object.prototype.hasOwnProperty.call(e2, "default") ? e2.default : e2;
  }
  var c, p, f, d, m, g, h, v, b, y, E, A, w, O, C, x, S, R, k, T, L, D, _, B = {};
  function q() {
    return c || (c = 1, Object.defineProperty(B, "__esModule", { value: true }), B.default = /((['"])(?:(?!\2|\\).|\\(?:\r\n|[\s\S]))*(\2)?|`(?:[^`\\$]|\\[\s\S]|\$(?!\{)|\$\{(?:[^{}]|\{[^}]*\}?)*\}?)*(`)?)|(\/\/.*)|(\/\*(?:[^*]|\*(?!\/))*(\*\/)?)|(\/(?!\*)(?:\[(?:(?![\]\\]).|\\.)*\]|(?![\/\]\\]).|\\.)+\/(?:(?!\s*(?:\b|[\u0080-\uFFFF$\\'"~({]|[+\-!](?!=)|\.?\d))|[gmiyu]{1,5}\b(?![\u0080-\uFFFF$\\]|\s*(?:[+\-*%&|^<>!=?({]|\/(?![\/*])))))|(0[xX][\da-fA-F]+|0[oO][0-7]+|0[bB][01]+|(?:\d*\.\d+|\d+\.?)(?:[eE][+-]?\d+)?)|((?!\d)(?:(?!\s)[$\w\u0080-\uFFFF]|\\u[\da-fA-F]{4}|\\u\{[\da-fA-F]+\})+)|(--|\+\+|&&|\|\||=>|\.{3}|(?:[+\-\/%&|^]|\*{1,2}|<{1,2}|>{1,3}|!=?|={1,2})=?|[?~.,:;[\](){}])|(\s+)|(^$|[\s\S])/g, B.matchToToken = function(e2) {
      var r2 = { type: "invalid", value: e2[0] };
      return e2[1] ? (r2.type = "string", r2.closed = !(!e2[3] && !e2[4])) : e2[5] ? r2.type = "comment" : e2[6] ? (r2.type = "comment", r2.closed = !!e2[7]) : e2[8] ? r2.type = "regex" : e2[9] ? r2.type = "number" : e2[10] ? r2.type = "name" : e2[11] ? r2.type = "punctuator" : e2[12] && (r2.type = "whitespace"), r2;
    }), B;
  }
  function P() {
    if (f) return p;
    f = 1;
    const e2 = function() {
      if (u) return a;
      u = 1;
      var e3 = { abstract: true, await: true, boolean: true, break: true, byte: true, case: true, catch: true, char: true, class: true, const: true, continue: true, debugger: true, default: true, delete: true, do: true, double: true, else: true, enum: true, export: true, extends: true, false: true, final: true, finally: true, float: true, for: true, function: true, goto: true, if: true, implements: true, import: true, in: true, instanceof: true, int: true, interface: true, let: true, long: true, native: true, new: true, null: true, package: true, private: true, protected: true, public: true, return: true, short: true, static: true, super: true, switch: true, synchronized: true, this: true, throw: true, transient: true, true: true, try: true, typeof: true, var: true, void: true, volatile: true, while: true, with: true, yield: true };
      return a = function(r3) {
        return e3.hasOwnProperty(r3);
      };
    }(), r2 = q().default, t2 = q().matchToToken;
    return p = (n2) => n2.match(r2).map((e3) => (r2.lastIndex = 0, t2(r2.exec(e3)))).map((r3) => ("name" === r3.type && e2(r3.value) && (r3.type = "keyword"), r3));
  }
  function N() {
    if (h) return g;
    h = 1;
    const e2 = P(), r2 = function() {
      if (m) return d;
      m = 1;
      const e3 = "string", r3 = "expression";
      function t3(e4) {
        const r4 = new String(e4.value);
        return r4.line = e4.line, r4.start = e4.start, r4.end = e4.end, r4;
      }
      function n3(e4, r4, t4) {
        this.type = e4, this.value = r4, this.script = null, t4 ? (this.line = t4.line + t4.value.split(/\n/).length - 1, this.line === t4.line ? this.start = t4.end : this.start = t4.value.length - t4.value.lastIndexOf("\n") - 1) : (this.line = 0, this.start = 0), this.end = this.start + this.value.length;
      }
      const o3 = (o4, i3, a3 = {}) => {
        const u3 = [new n3(e3, o4)];
        for (let s3 = 0; s3 < i3.length; s3++) {
          const o5 = i3[s3], l3 = o5.test.ignoreCase ? "ig" : "g", c3 = new RegExp(o5.test.source, l3);
          for (let i4 = 0; i4 < u3.length; i4++) {
            const s4 = u3[i4];
            let l4 = u3[i4 - 1];
            if (s4.type !== e3) continue;
            let p3, f3 = 0;
            const d2 = [], m2 = s4.value;
            for (; null !== (p3 = c3.exec(m2)); ) p3.index > f3 && (l4 = new n3(e3, m2.slice(f3, p3.index), l4), d2.push(l4)), l4 = new n3(r3, p3[0], l4), p3[0] = t3(l4), l4.script = o5.use.apply(a3, p3), d2.push(l4), f3 = p3.index + p3[0].length;
            f3 < m2.length && (l4 = new n3(e3, m2.slice(f3), l4), d2.push(l4)), u3.splice(i4, 1, ...d2), i4 += d2.length - 1;
          }
        }
        return u3;
      };
      return o3.TYPE_STRING = e3, o3.TYPE_EXPRESSION = r3, o3.TYPE_RAW = "raw", o3.TYPE_ESCAPE = "escape", d = o3;
    }(), t2 = "$data", n2 = "$imports", o2 = "$escape", i2 = "$each", a2 = "print", u2 = "include", s2 = "extend", l2 = "block", c2 = "$$out", p2 = "$$line", f2 = "$$blocks", v2 = "$$slice", b2 = "$$from", y2 = "$$options", E2 = (e3, r3) => Object.hasOwnProperty.call(e3, r3), A2 = JSON.stringify;
    class w2 {
      constructor(e3) {
        let o3 = e3.source;
        const i3 = e3.minimize, d2 = e3.htmlMinifier;
        if (this.options = e3, this.stacks = [], this.context = [], this.scripts = [], this.CONTEXT_MAP = {}, this.ignore = [t2, n2, y2, ...e3.ignore], this.internal = { [c2]: "''", [p2]: "[0,0]", [f2]: "arguments[1]||{}", [b2]: "null", [a2]: `function(){var s=''.concat.apply('',arguments);${c2}+=s;return s}`, [u2]: `function(src,data){var s=${y2}.include(src,data||${t2},arguments[2]||${f2},${y2});${c2}+=s;return s}`, [s2]: `function(from){${b2}=from}`, [v2]: `function(c,p,s){p=${c2};${c2}='';c();s=${c2};${c2}=p+s;return s}`, [l2]: `function(){var a=arguments,s;if(typeof a[0]==='function'){return ${v2}(a[0])}else if(${b2}){if(!${f2}[a[0]]){${f2}[a[0]]=${v2}(a[1])}else{${c2}+=${f2}[a[0]]}}else{s=${f2}[a[0]];if(typeof s==='string'){${c2}+=s}else{s=${v2}(a[1])}return s}}` }, this.dependencies = { [a2]: [c2], [u2]: [c2, y2, t2, f2], [s2]: [b2, u2], [l2]: [v2, b2, c2, f2] }, this.importContext(c2), e3.compileDebug && this.importContext(p2), i3) try {
          o3 = d2(o3, e3);
        } catch (m2) {
        }
        this.source = o3, this.getTplTokens(o3, e3.rules, this).forEach((e4) => {
          e4.type === r2.TYPE_STRING ? this.parseString(e4) : this.parseExpression(e4);
        });
      }
      getTplTokens(...e3) {
        return r2(...e3);
      }
      getEsTokens(r3) {
        return e2(r3);
      }
      getVariables(e3) {
        let r3 = false;
        return e3.filter((e4) => "whitespace" !== e4.type && "comment" !== e4.type).filter((e4) => "name" === e4.type && !r3 || (r3 = "punctuator" === e4.type && "." === e4.value, false)).map((e4) => e4.value);
      }
      importContext(e3) {
        let r3 = "";
        const a3 = this.internal, u3 = this.dependencies, s3 = this.ignore, l3 = this.context, c3 = this.options.imports, p3 = this.CONTEXT_MAP;
        E2(p3, e3) || -1 !== s3.indexOf(e3) || (E2(a3, e3) ? (r3 = a3[e3], E2(u3, e3) && u3[e3].forEach((e4) => this.importContext(e4))) : r3 = e3 === o2 || e3 === i2 || E2(c3, e3) ? `${n2}.${e3}` : `${t2}.${e3}`, p3[e3] = r3, l3.push({ name: e3, value: r3 }));
      }
      parseString(e3) {
        let r3 = e3.value;
        if (!r3) return;
        const t3 = `${c2}+=${A2(r3)}`;
        this.scripts.push({ source: r3, tplToken: e3, code: t3 });
      }
      parseExpression(e3) {
        const t3 = e3.value, n3 = e3.script, i3 = n3.output, a3 = this.options.escape;
        let u3 = n3.code;
        i3 && (u3 = false === a3 || i3 === r2.TYPE_RAW ? `${c2}+=${n3.code}` : `${c2}+=${o2}(${n3.code})`);
        const s3 = this.getEsTokens(u3);
        this.getVariables(s3).forEach((e4) => this.importContext(e4)), this.scripts.push({ source: t3, tplToken: e3, code: u3 });
      }
      checkExpression(e3) {
        const r3 = [[/^\s*}[\w\W]*?{?[\s;]*$/, ""], [/(^[\w\W]*?\([\w\W]*?(?:=>|\([\w\W]*?\))\s*{[\s;]*$)/, "$1})"], [/(^[\w\W]*?\([\w\W]*?\)\s*{[\s;]*$)/, "$1}"]];
        let t3 = 0;
        for (; t3 < r3.length; ) {
          if (r3[t3][0].test(e3)) {
            e3 = e3.replace(...r3[t3]);
            break;
          }
          t3++;
        }
        try {
          return new Function(e3), true;
        } catch (n3) {
          return false;
        }
      }
      build() {
        const e3 = this.options, o3 = this.context, i3 = this.scripts, a3 = this.stacks, l3 = this.source, d2 = e3.filename, m2 = e3.imports, g2 = [], h2 = E2(this.CONTEXT_MAP, s2);
        let v3 = 0;
        const w3 = (e4, { line: r3, start: t3 }) => {
          const n3 = { generated: { line: a3.length + v3 + 1, column: 1 }, original: { line: r3 + 1, column: t3 + 1 } };
          return v3 += e4.split(/\n/).length - 1, n3;
        }, O2 = (e4) => e4.replace(/^[\t ]+|[\t ]$/g, "");
        a3.push(`function(${t2}){`), a3.push("'use strict'"), a3.push(`${t2}=${t2}||{}`), a3.push("var " + o3.map(({ name: e4, value: r3 }) => `${e4}=${r3}`).join(",")), e3.compileDebug ? (a3.push("try{"), i3.forEach((e4) => {
          e4.tplToken.type === r2.TYPE_EXPRESSION && a3.push(`${p2}=[${[e4.tplToken.line, e4.tplToken.start].join(",")}]`), g2.push(w3(e4.code, e4.tplToken)), a3.push(O2(e4.code));
        }), a3.push("}catch(error){"), a3.push("throw {" + ["name:'RuntimeError'", `path:${A2(d2)}`, "message:error.message", `line:${p2}[0]+1`, `column:${p2}[1]+1`, `source:${A2(l3)}`, "stack:error.stack"].join(",") + "}"), a3.push("}")) : i3.forEach((e4) => {
          g2.push(w3(e4.code, e4.tplToken)), a3.push(O2(e4.code));
        }), h2 && (a3.push(`${c2}=''`), a3.push(`${u2}(${b2},${t2},${f2})`)), a3.push(`return ${c2}`), a3.push("}");
        const C2 = a3.join("\n");
        try {
          const r3 = new Function(n2, y2, `return ${C2}`)(m2, e3);
          return r3.mappings = g2, r3.sourcesContent = [l3], r3;
        } catch (x2) {
          let e4, r3 = 0, t3 = 0, n3 = 0;
          for (; r3 < i3.length; ) {
            const o4 = i3[r3];
            if (!this.checkExpression(o4.code)) {
              t3 = o4.tplToken.line, n3 = o4.tplToken.start, e4 = o4.code;
              break;
            }
            r3++;
          }
          throw { name: "CompileError", path: d2, message: x2.message, line: t3 + 1, column: n3 + 1, source: l3, generated: e4, stack: x2.stack };
        }
      }
    }
    return w2.CONSTS = { DATA: t2, IMPORTS: n2, PRINT: a2, INCLUDE: u2, EXTEND: s2, BLOCK: l2, OPTIONS: y2, OUT: c2, LINE: p2, BLOCKS: f2, SLICE: v2, FROM: b2, ESCAPE: o2, EACH: i2 }, g = w2;
  }
  /*! art-template@runtime | https://github.com/aui/art-template */
  function U() {
    if (b) return v;
    b = 1;
    const e2 = "undefined" != typeof self ? self : "undefined" != typeof window ? window : void 0 !== s ? s : {}, r2 = Object.create(e2), t2 = /["&'<>]/;
    function n2(e3) {
      return "string" != typeof e3 && (e3 = null == e3 ? "" : "function" == typeof e3 ? n2(e3.call(e3)) : JSON.stringify(e3)), e3;
    }
    return r2.$escape = (e3) => function(e4) {
      const r3 = "" + e4, n3 = t2.exec(r3);
      if (!n3) return e4;
      let o2, i2, a2, u2 = "";
      for (o2 = n3.index, i2 = 0; o2 < r3.length; o2++) {
        switch (r3.charCodeAt(o2)) {
          case 34:
            a2 = "&#34;";
            break;
          case 38:
            a2 = "&#38;";
            break;
          case 39:
            a2 = "&#39;";
            break;
          case 60:
            a2 = "&#60;";
            break;
          case 62:
            a2 = "&#62;";
            break;
          default:
            continue;
        }
        i2 !== o2 && (u2 += r3.substring(i2, o2)), i2 = o2 + 1, u2 += a2;
      }
      return i2 !== o2 ? u2 + r3.substring(i2, o2) : u2;
    }(n2(e3)), r2.$each = (e3, r3) => {
      if (Array.isArray(e3)) for (let t3 = 0, n3 = e3.length; t3 < n3; t3++) r3(e3[t3], t3);
      else for (let t3 in e3) r3(e3[t3], t3);
    }, v = r2;
  }
  function F() {
    if (E) return y;
    E = 1;
    const e2 = Object.prototype.toString, r2 = function(t2, n2) {
      let o2;
      const i2 = null === (a2 = t2) ? "Null" : e2.call(a2).slice(8, -1);
      var a2;
      if ("Object" === i2 ? o2 = Object.create(n2 || {}) : "Array" === i2 && (o2 = [].concat(n2 || [])), o2) {
        for (let e3 in t2) Object.hasOwnProperty.call(t2, e3) && (o2[e3] = r2(t2[e3], o2[e3]));
        return o2;
      }
      return t2;
    };
    return y = r2;
  }
  var V, M, I, j, $, K, z, G, H, Y, W, Q, Z, J, X, ee, re, te, ne, oe, ie, ae, ue, se, le, ce, pe, fe, de, me, ge, he, ve, be, ye, Ee, Ae, we, Oe, Ce, xe, Se, Re, ke, Te, Le, De, _e, Be, qe, Pe, Ne, Ue, Fe, Ve, Me, Ie, je, $e, Ke, ze, Ge, He, Ye, We, Qe, Ze, Je, Xe, er, rr, tr, nr, or, ir, ar, ur, sr, lr, cr, pr, fr, dr, mr, gr, hr, vr, br, yr, Er, Ar, wr, Or, Cr, xr, Sr, Rr, kr, Tr, Lr, Dr, _r, Br, qr, Pr, Nr, Ur, Fr, Vr, Mr, Ir, jr, $r, Kr, zr, Gr, Hr, Yr, Wr, Qr, Zr, Jr, Xr, et, rt, tt, nt, ot, it, at, ut, st, lt, ct, pt, ft, dt, mt, gt, ht, vt, bt, yt, Et, At, wt, Ot = {}, Ct = { exports: {} };
  function xt() {
    if (K) return $;
    function e2(e3, r2, t2) {
      return t2 < 0 && (t2 += 1), t2 > 1 && (t2 -= 1), t2 < 1 / 6 ? e3 + 6 * (r2 - e3) * t2 : t2 < 0.5 ? r2 : t2 < 2 / 3 ? e3 + (r2 - e3) * (2 / 3 - t2) * 6 : e3;
    }
    return K = 1, $ = function(r2, t2, n2) {
      var o2 = function(r3, t3, n3) {
        var o3, i3, a3;
        if ((r3 %= 360) < 0 && (r3 += 360), r3 = ~~r3 / 360, t3 < 0 ? t3 = 0 : t3 > 100 && (t3 = 100), n3 < 0 ? n3 = 0 : n3 > 100 && (n3 = 100), n3 = ~~n3 / 100, 0 == (t3 = ~~t3 / 100)) o3 = i3 = a3 = n3;
        else {
          var u3 = n3 < 0.5 ? n3 * (1 + t3) : n3 + t3 - n3 * t3, s2 = 2 * n3 - u3;
          o3 = e2(s2, u3, r3 + 1 / 3), i3 = e2(s2, u3, r3), a3 = e2(s2, u3, r3 - 1 / 3);
        }
        return [~~(255 * o3), ~~(255 * i3), ~~(255 * a3)];
      }(r2, t2, n2), i2 = o2[0].toString(16), a2 = o2[1].toString(16), u2 = o2[2].toString(16);
      return "#" + (1 == i2.length ? "0" : "") + i2 + (1 == a2.length ? "0" : "") + a2 + (1 == u2.length ? "0" : "") + u2;
    };
  }
  function St() {
    if (Q) return W;
    Q = 1;
    var e2 = function() {
      if (Y) return H;
      Y = 1;
      var e3 = /([0-9]+)/;
      function r3(e4) {
        return "" + parseInt(e4) == e4 ? parseInt(e4) : e4;
      }
      return H = function(t3, n2) {
        var o2, i2, a2, u2, s2 = ("" + t3).split(e3).map(r3), l2 = ("" + n2).split(e3).map(r3);
        for (a2 = 0, u2 = Math.min(s2.length, l2.length); a2 < u2; a2++) if ((o2 = s2[a2]) != (i2 = l2[a2])) return o2 > i2 ? 1 : -1;
        return s2.length > l2.length ? 1 : s2.length == l2.length ? 0 : -1;
      };
    }();
    function r2(r3, t3) {
      return e2(r3[1], t3[1]);
    }
    function t2(e3, r3) {
      return e3[1] > r3[1] ? 1 : -1;
    }
    return W = function(e3, n2) {
      switch (n2) {
        case "natural":
          return e3.sort(r2);
        case "standard":
          return e3.sort(t2);
        case "none":
        case false:
          return e3;
      }
    };
  }
  function Rt() {
    if (J) return Z;
    return J = 1, Z = function e2(r2, t2) {
      var n2, o2, i2, a2 = {};
      for (n2 in r2) i2 = r2[n2], Array.isArray(i2) ? a2[n2] = i2.slice(0) : a2[n2] = "object" == typeof i2 && null !== i2 ? e2(i2, {}) : i2;
      for (o2 in t2) i2 = t2[o2], o2 in a2 && Array.isArray(i2) ? a2[o2] = i2.slice(0) : a2[o2] = o2 in a2 && "object" == typeof i2 && null !== i2 ? e2(a2[o2], i2) : i2;
      return a2;
    }, Z;
  }
  function kt() {
    if (ee) return X;
    ee = 1;
    var e2 = r.EOL, t2 = Rt(), n2 = { AfterAtRule: "afterAtRule", AfterBlockBegins: "afterBlockBegins", AfterBlockEnds: "afterBlockEnds", AfterComment: "afterComment", AfterProperty: "afterProperty", AfterRuleBegins: "afterRuleBegins", AfterRuleEnds: "afterRuleEnds", BeforeBlockEnds: "beforeBlockEnds", BetweenSelectors: "betweenSelectors" }, o2 = { CarriageReturnLineFeed: "\r\n", LineFeed: "\n", System: e2 }, i2 = " ", a2 = "	", u2 = { AroundSelectorRelation: "aroundSelectorRelation", BeforeBlockBegins: "beforeBlockBegins", BeforeValue: "beforeValue" }, s2 = { breaks: p2(false), breakWith: o2.System, indentBy: 0, indentWith: i2, spaces: f2(false), wrapAt: false, semicolonAfterLastProperty: false }, l2 = "false", c2 = "true";
    function p2(e3) {
      var r2 = {};
      return r2[n2.AfterAtRule] = e3, r2[n2.AfterBlockBegins] = e3, r2[n2.AfterBlockEnds] = e3, r2[n2.AfterComment] = e3, r2[n2.AfterProperty] = e3, r2[n2.AfterRuleBegins] = e3, r2[n2.AfterRuleEnds] = e3, r2[n2.BeforeBlockEnds] = e3, r2[n2.BetweenSelectors] = e3, r2;
    }
    function f2(e3) {
      var r2 = {};
      return r2[u2.AroundSelectorRelation] = e3, r2[u2.BeforeBlockBegins] = e3, r2[u2.BeforeValue] = e3, r2;
    }
    function d2(r2) {
      switch (r2) {
        case "windows":
        case "crlf":
        case o2.CarriageReturnLineFeed:
          return o2.CarriageReturnLineFeed;
        case "unix":
        case "lf":
        case o2.LineFeed:
          return o2.LineFeed;
        default:
          return e2;
      }
    }
    function m2(e3) {
      switch (e3) {
        case "space":
          return i2;
        case "tab":
          return a2;
        default:
          return e3;
      }
    }
    return X = { Breaks: n2, Spaces: u2, formatFrom: function(e3) {
      return void 0 !== e3 && false !== e3 && ("object" == typeof e3 && "breakWith" in e3 && (e3 = t2(e3, { breakWith: d2(e3.breakWith) })), "object" == typeof e3 && "indentBy" in e3 && (e3 = t2(e3, { indentBy: parseInt(e3.indentBy) })), "object" == typeof e3 && "indentWith" in e3 && (e3 = t2(e3, { indentWith: m2(e3.indentWith) })), "object" == typeof e3 || "object" == typeof e3 ? t2(s2, e3) : "string" == typeof e3 && "beautify" == e3 ? t2(s2, { breaks: p2(true), indentBy: 2, spaces: f2(true) }) : "string" == typeof e3 && "keep-breaks" == e3 ? t2(s2, { breaks: { afterAtRule: true, afterBlockBegins: true, afterBlockEnds: true, afterComment: true, afterRuleEnds: true, beforeBlockEnds: true } }) : "string" == typeof e3 ? t2(s2, e3.split(";").reduce(function(e4, r2) {
        var t3 = r2.split(":"), n3 = t3[0], o3 = t3[1];
        return "breaks" == n3 || "spaces" == n3 ? e4[n3] = function(e5) {
          return e5.split(",").reduce(function(e6, r3) {
            var t4 = r3.split("="), n4 = t4[0], o4 = t4[1];
            return e6[n4] = function(e7) {
              switch (e7) {
                case l2:
                case "off":
                  return false;
                case c2:
                case "on":
                  return true;
                default:
                  return e7;
              }
            }(o4), e6;
          }, {});
        }(o3) : "indentBy" == n3 || "wrapAt" == n3 ? e4[n3] = parseInt(o3) : "indentWith" == n3 ? e4[n3] = m2(o3) : "breakWith" == n3 && (e4[n3] = d2(o3)), e4;
      }, {})) : s2);
    } };
  }
  function Tt() {
    if (te) return re;
    te = 1;
    return re = { ASTERISK: "*", AT: "@", BACK_SLASH: "\\", CARRIAGE_RETURN: "\r", CLOSE_CURLY_BRACKET: "}", CLOSE_ROUND_BRACKET: ")", CLOSE_SQUARE_BRACKET: "]", COLON: ":", COMMA: ",", DOUBLE_QUOTE: '"', EXCLAMATION: "!", FORWARD_SLASH: "/", INTERNAL: "-clean-css-", NEW_LINE_NIX: "\n", OPEN_CURLY_BRACKET: "{", OPEN_ROUND_BRACKET: "(", OPEN_SQUARE_BRACKET: "[", SEMICOLON: ";", SINGLE_QUOTE: "'", SPACE: " ", TAB: "	", UNDERSCORE: "_" };
  }
  function Lt() {
    if (oe) return ne;
    return oe = 1, ne = function(e2) {
      var r2 = e2[0], t2 = e2[1], n2 = e2[2];
      return n2 ? n2 + ":" + r2 + ":" + t2 : r2 + ":" + t2;
    };
  }
  function Dt() {
    if (ae) return ie;
    ae = 1;
    var e2 = kt().Spaces, r2 = Tt(), t2 = Lt(), n2 = /[\s"'][iI]\s*\]/, o2 = /([\d\w])([iI])\]/g, i2 = /="([a-zA-Z][a-zA-Z\d\-_]+)"([iI])/g, a2 = /="([a-zA-Z][a-zA-Z\d\-_]+)"(\s|\])/g, u2 = /^(?:(?:<!--|-->)\s*)+/, s2 = /='([a-zA-Z][a-zA-Z\d\-_]+)'([iI])/g, l2 = /='([a-zA-Z][a-zA-Z\d\-_]+)'(\s|\])/g, c2 = /[>\+~]/, p2 = /\s/;
    function f2(e3) {
      var t3, n3, o3, i3, a3 = false, u3 = false;
      for (o3 = 0, i3 = e3.length; o3 < i3; o3++) {
        if (n3 = e3[o3], t3) ;
        else if (n3 == r2.SINGLE_QUOTE || n3 == r2.DOUBLE_QUOTE) u3 = !u3;
        else {
          if (!(u3 || n3 != r2.CLOSE_CURLY_BRACKET && n3 != r2.EXCLAMATION && "<" != n3 && n3 != r2.SEMICOLON)) {
            a3 = true;
            break;
          }
          if (!u3 && 0 === o3 && c2.test(n3)) {
            a3 = true;
            break;
          }
        }
        t3 = n3 == r2.BACK_SLASH;
      }
      return a3;
    }
    function d2(t3, i3) {
      var a3, u3, s3, l3, f3, d3, m2, g2, h2, v2, b2, y2, E2, A2 = [], w2 = 0, O2 = false, C2 = false, x2 = n2.test(t3), S2 = i3 && i3.spaces[e2.AroundSelectorRelation];
      for (y2 = 0, E2 = t3.length; y2 < E2; y2++) {
        if (u3 = (a3 = t3[y2]) == r2.NEW_LINE_NIX, s3 = a3 == r2.NEW_LINE_NIX && t3[y2 - 1] == r2.CARRIAGE_RETURN, d3 = m2 || g2, v2 = !h2 && !l3 && 0 === w2 && c2.test(a3), b2 = p2.test(a3), f3 && d3 && s3) A2.pop(), A2.pop();
        else if (l3 && d3 && u3) A2.pop();
        else if (l3) A2.push(a3);
        else if (a3 != r2.OPEN_SQUARE_BRACKET || d3) if (a3 != r2.CLOSE_SQUARE_BRACKET || d3) if (a3 != r2.OPEN_ROUND_BRACKET || d3) if (a3 != r2.CLOSE_ROUND_BRACKET || d3) if (a3 != r2.SINGLE_QUOTE || d3) if (a3 != r2.DOUBLE_QUOTE || d3) if (a3 == r2.SINGLE_QUOTE && d3) A2.push(a3), m2 = false;
        else if (a3 == r2.DOUBLE_QUOTE && d3) A2.push(a3), g2 = false;
        else {
          if (b2 && O2 && !S2) continue;
          !b2 && O2 && S2 ? (A2.push(r2.SPACE), A2.push(a3)) : b2 && (h2 || w2 > 0) && !d3 || b2 && C2 && !d3 || (s3 || u3) && (h2 || w2 > 0) && d3 || (v2 && C2 && !S2 ? (A2.pop(), A2.push(a3)) : v2 && !C2 && S2 ? (A2.push(r2.SPACE), A2.push(a3)) : b2 ? A2.push(r2.SPACE) : A2.push(a3));
        }
        else A2.push(a3), g2 = true;
        else A2.push(a3), m2 = true;
        else A2.push(a3), w2--;
        else A2.push(a3), w2++;
        else A2.push(a3), h2 = false;
        else A2.push(a3), h2 = true;
        f3 = l3, l3 = a3 == r2.BACK_SLASH, O2 = v2, C2 = b2;
      }
      return x2 ? A2.join("").replace(o2, "$1 $2]") : A2.join("");
    }
    return ie = function(e3, r3, n3, o3, c3) {
      var p3, m2 = [], g2 = [];
      function h2(e4, r4) {
        return c3.push("HTML comment '" + r4 + "' at " + t2(e4[2][0]) + ". Removing."), "";
      }
      for (var v2 = 0, b2 = e3.length; v2 < b2; v2++) {
        var y2 = e3[v2], E2 = y2[1];
        f2(E2 = E2.replace(u2, h2.bind(null, y2))) ? c3.push("Invalid selector '" + y2[1] + "' at " + t2(y2[2][0]) + ". Ignoring.") : (E2 = d2(E2, o3), E2 = -1 == (p3 = E2).indexOf("'") && -1 == p3.indexOf('"') ? p3 : p3.replace(s2, "=$1 $2").replace(l2, "=$1$2").replace(i2, "=$1 $2").replace(a2, "=$1$2"), n3 && E2.indexOf("nav") > 0 && (E2 = E2.replace(/\+nav(\S|$)/, "+ nav$1")), r3 && E2.indexOf("*+html ") > -1 || r3 && E2.indexOf("*:first-child+html ") > -1 || (E2.indexOf("*") > -1 && (E2 = E2.replace(/\*([:#\.\[])/g, "$1").replace(/^(\:first\-child)?\+html/, "*$1+html")), g2.indexOf(E2) > -1 || (y2[1] = E2, g2.push(E2), m2.push(y2))));
      }
      return 1 == m2.length && 0 === m2[0][1].length && (c3.push("Empty selector '" + m2[0][1] + "' at " + t2(m2[0][2][0]) + ". Ignoring."), m2 = []), m2;
    };
  }
  function _t() {
    if (fe) return pe;
    fe = 1;
    return pe = { ASTERISK: "asterisk", BANG: "bang", BACKSLASH: "backslash", UNDERSCORE: "underscore" };
  }
  function Bt() {
    if (me) return de;
    return me = 1, de = function(e2) {
      for (var r2 = e2.length - 1; r2 >= 0; r2--) {
        var t2 = e2[r2];
        t2.unused && t2.all.splice(t2.position, 1);
      }
    };
  }
  function qt() {
    if (he) return ge;
    he = 1;
    var e2 = _t(), r2 = Tt();
    function t2(e3) {
      e3.value[e3.value.length - 1][1] += "!important";
    }
    function n2(t3) {
      t3.hack[0] == e2.UNDERSCORE ? t3.name = "_" + t3.name : t3.hack[0] == e2.ASTERISK ? t3.name = "*" + t3.name : t3.hack[0] == e2.BACKSLASH ? t3.value[t3.value.length - 1][1] += "\\" + t3.hack[1] : t3.hack[0] == e2.BANG && (t3.value[t3.value.length - 1][1] += r2.SPACE + "!ie");
    }
    return ge = function(e3, r3) {
      var o2, i2, a2, u2;
      for (u2 = e3.length - 1; u2 >= 0; u2--) (o2 = e3[u2]).unused || (o2.dirty || o2.important || o2.hack) && (r3 ? (i2 = r3(o2), o2.value = i2) : i2 = o2.value, o2.important && t2(o2), o2.hack && n2(o2), "all" in o2 && ((a2 = o2.all[o2.position])[1][1] = o2.name, a2.splice(2, a2.length - 1), Array.prototype.push.apply(a2, i2)));
    };
  }
  function Pt() {
    if (be) return ve;
    be = 1;
    return ve = { AT_RULE: "at-rule", AT_RULE_BLOCK: "at-rule-block", AT_RULE_BLOCK_SCOPE: "at-rule-block-scope", COMMENT: "comment", NESTED_BLOCK: "nested-block", NESTED_BLOCK_SCOPE: "nested-block-scope", PROPERTY: "property", PROPERTY_BLOCK: "property-block", PROPERTY_NAME: "property-name", PROPERTY_VALUE: "property-value", RAW: "raw", RULE: "rule", RULE_SCOPE: "rule-scope" };
  }
  function Nt() {
    if (Ee) return ye;
    Ee = 1;
    var e2 = _t(), r2 = Tt(), t2 = Pt(), n2 = { ASTERISK: "*", BACKSLASH: "\\", BANG: "!", BANG_SUFFIX_PATTERN: /!\w+$/, IMPORTANT_TOKEN_PATTERN: new RegExp("!important$", "i"), IMPORTANT_WORD_PATTERN: new RegExp("important$", "i"), SUFFIX_BANG_PATTERN: /!$/, UNDERSCORE: "_", VARIABLE_REFERENCE_PATTERN: /var\(--.+\)$/ };
    function o2(e3) {
      var r3, n3, o3;
      for (r3 = 2, n3 = e3.length; r3 < n3; r3++) if ((o3 = e3[r3])[0] == t2.PROPERTY_VALUE && i2(o3[1])) return true;
      return false;
    }
    function i2(e3) {
      return n2.VARIABLE_REFERENCE_PATTERN.test(e3);
    }
    function a2(e3) {
      var n3, o3, i3;
      for (o3 = 3, i3 = e3.length; o3 < i3; o3++) if ((n3 = e3[o3])[0] == t2.PROPERTY_VALUE && (n3[1] == r2.COMMA || n3[1] == r2.FORWARD_SLASH)) return true;
      return false;
    }
    function u2(r3) {
      var o3 = function(e3) {
        if (e3.length < 3) return false;
        var r4 = e3[e3.length - 1];
        return !!n2.IMPORTANT_TOKEN_PATTERN.test(r4[1]) || !(!n2.IMPORTANT_WORD_PATTERN.test(r4[1]) || !n2.SUFFIX_BANG_PATTERN.test(e3[e3.length - 2][1]));
      }(r3);
      o3 && function(e3) {
        var r4 = e3[e3.length - 1], t3 = e3[e3.length - 2];
        n2.IMPORTANT_TOKEN_PATTERN.test(r4[1]) ? r4[1] = r4[1].replace(n2.IMPORTANT_TOKEN_PATTERN, "") : (r4[1] = r4[1].replace(n2.IMPORTANT_WORD_PATTERN, ""), t3[1] = t3[1].replace(n2.SUFFIX_BANG_PATTERN, "")), 0 === r4[1].length && e3.pop(), 0 === t3[1].length && e3.pop();
      }(r3);
      var i3 = function(r4) {
        var t3 = false, o4 = r4[1][1], i4 = r4[r4.length - 1];
        return o4[0] == n2.UNDERSCORE ? t3 = [e2.UNDERSCORE] : o4[0] == n2.ASTERISK ? t3 = [e2.ASTERISK] : i4[1][0] != n2.BANG || i4[1].match(n2.IMPORTANT_WORD_PATTERN) ? i4[1].indexOf(n2.BANG) > 0 && !i4[1].match(n2.IMPORTANT_WORD_PATTERN) && n2.BANG_SUFFIX_PATTERN.test(i4[1]) ? t3 = [e2.BANG] : i4[1].indexOf(n2.BACKSLASH) > 0 && i4[1].indexOf(n2.BACKSLASH) == i4[1].length - n2.BACKSLASH.length - 1 ? t3 = [e2.BACKSLASH, i4[1].substring(i4[1].indexOf(n2.BACKSLASH) + 1)] : 0 === i4[1].indexOf(n2.BACKSLASH) && 2 == i4[1].length && (t3 = [e2.BACKSLASH, i4[1].substring(1)]) : t3 = [e2.BANG], t3;
      }(r3);
      return i3[0] == e2.ASTERISK || i3[0] == e2.UNDERSCORE ? function(e3) {
        e3[1][1] = e3[1][1].substring(1);
      }(r3) : i3[0] != e2.BACKSLASH && i3[0] != e2.BANG || function(r4, t3) {
        var o4 = r4[r4.length - 1];
        o4[1] = o4[1].substring(0, o4[1].indexOf(t3[0] == e2.BACKSLASH ? n2.BACKSLASH : n2.BANG)).trim(), 0 === o4[1].length && r4.pop();
      }(r3, i3), { block: r3[2] && r3[2][0] == t2.PROPERTY_BLOCK, components: [], dirty: false, hack: i3, important: o3, name: r3[1][1], multiplex: r3.length > 3 && a2(r3), position: 0, shorthand: false, unused: false, value: r3.slice(2) };
    }
    return ye = { all: function(e3, r3, n3) {
      var i3, a3, s2, l2 = [];
      for (s2 = e3.length - 1; s2 >= 0; s2--) (a3 = e3[s2])[0] == t2.PROPERTY && (!r3 && o2(a3) || n3 && n3.indexOf(a3[1][1]) > -1 || ((i3 = u2(a3)).all = e3, i3.position = s2, l2.unshift(i3)));
      return l2;
    }, single: u2 };
  }
  function Ut() {
    if (we) return Ae;
    we = 1;
    var e2 = Rt(), r2 = /^\d+$/, t2 = ["*", "all"], n2 = "off";
    function o2(e3) {
      return { ch: e3, cm: e3, em: e3, ex: e3, in: e3, mm: e3, pc: e3, pt: e3, px: e3, q: e3, rem: e3, vh: e3, vmax: e3, vmin: e3, vw: e3, "%": e3 };
    }
    return Ae = { DEFAULT: n2, roundingPrecisionFrom: function(i2) {
      return e2(o2(n2), function(i3) {
        if (null == i3) return {};
        if ("boolean" == typeof i3) return {};
        if ("number" == typeof i3 && -1 == i3) return o2(n2);
        if ("number" == typeof i3) return o2(i3);
        if ("string" == typeof i3 && r2.test(i3)) return o2(parseInt(i3));
        if ("string" == typeof i3 && i3 == n2) return o2(n2);
        if ("object" == typeof i3) return i3;
        return i3.split(",").reduce(function(r3, i4) {
          var a2 = i4.split("="), u2 = a2[0], s2 = parseInt(a2[1]);
          return (isNaN(s2) || -1 == s2) && (s2 = n2), t2.indexOf(u2) > -1 ? r3 = e2(r3, o2(s2)) : r3[u2] = s2, r3;
        }, {});
      }(i2));
    } };
  }
  function Ft() {
    if (Ce) return Oe;
    Ce = 1;
    var e2 = Ut().roundingPrecisionFrom, r2 = Rt(), t2 = { Zero: "0", One: "1", Two: "2" }, n2 = {};
    n2[t2.Zero] = {}, n2[t2.One] = { cleanupCharsets: true, normalizeUrls: true, optimizeBackground: true, optimizeBorderRadius: true, optimizeFilter: true, optimizeFontWeight: true, optimizeOutline: true, removeEmpty: true, removeNegativePaddings: true, removeQuotes: true, removeWhitespace: true, replaceMultipleZeros: true, replaceTimeUnits: true, replaceZeroUnits: true, roundingPrecision: e2(void 0), selectorsSortingMethod: "standard", specialComments: "all", tidyAtRules: true, tidyBlockScopes: true, tidySelectors: true, transform: function() {
    } }, n2[t2.Two] = { mergeAdjacentRules: true, mergeIntoShorthands: true, mergeMedia: true, mergeNonAdjacentRules: true, mergeSemantically: false, overrideProperties: true, removeEmpty: true, reduceNonAdjacentRules: true, removeDuplicateFontRules: true, removeDuplicateMediaBlocks: true, removeDuplicateRules: true, removeUnusedAtRules: false, restructureRules: false, skipProperties: [] };
    var o2 = "*", i2 = "all";
    function a2(e3, t3) {
      var o3, i3 = r2(n2[e3], {});
      for (o3 in i3) "boolean" == typeof i3[o3] && (i3[o3] = t3);
      return i3;
    }
    function u2(e3) {
      switch (e3) {
        case "false":
        case "off":
          return false;
        case "true":
        case "on":
          return true;
        default:
          return e3;
      }
    }
    function s2(e3, t3) {
      return e3.split(";").reduce(function(e4, n3) {
        var s3 = n3.split(":"), l2 = s3[0], c2 = u2(s3[1]);
        return o2 == l2 || i2 == l2 ? e4 = r2(e4, a2(t3, c2)) : e4[l2] = c2, e4;
      }, {});
    }
    return Oe = { OptimizationLevel: t2, optimizationLevelFrom: function(l2) {
      var c2 = r2(n2, {}), p2 = t2.Zero, f2 = t2.One, d2 = t2.Two;
      return void 0 === l2 ? (delete c2[d2], c2) : ("string" == typeof l2 && (l2 = parseInt(l2)), "number" == typeof l2 && l2 === parseInt(d2) ? c2 : "number" == typeof l2 && l2 === parseInt(f2) ? (delete c2[d2], c2) : "number" == typeof l2 && l2 === parseInt(p2) ? (delete c2[d2], delete c2[f2], c2) : ("object" == typeof l2 && (l2 = function(e3) {
        var t3, n3, o3 = r2(e3, {});
        for (n3 = 0; n3 <= 2; n3++) !((t3 = "" + n3) in o3) || void 0 !== o3[t3] && false !== o3[t3] || delete o3[t3], t3 in o3 && true === o3[t3] && (o3[t3] = {}), t3 in o3 && "string" == typeof o3[t3] && (o3[t3] = s2(o3[t3], t3));
        return o3;
      }(l2)), f2 in l2 && "roundingPrecision" in l2[f2] && (l2[f2].roundingPrecision = e2(l2[f2].roundingPrecision)), d2 in l2 && "skipProperties" in l2[d2] && "string" == typeof l2[d2].skipProperties && (l2[d2].skipProperties = l2[d2].skipProperties.split(",")), (p2 in l2 || f2 in l2 || d2 in l2) && (c2[p2] = r2(c2[p2], l2[p2])), f2 in l2 && o2 in l2[f2] && (c2[f2] = r2(c2[f2], a2(f2, u2(l2[f2][o2]))), delete l2[f2][o2]), f2 in l2 && i2 in l2[f2] && (c2[f2] = r2(c2[f2], a2(f2, u2(l2[f2][i2]))), delete l2[f2][i2]), f2 in l2 || d2 in l2 ? c2[f2] = r2(c2[f2], l2[f2]) : delete c2[f2], d2 in l2 && o2 in l2[d2] && (c2[d2] = r2(c2[d2], a2(d2, u2(l2[d2][o2]))), delete l2[d2][o2]), d2 in l2 && i2 in l2[d2] && (c2[d2] = r2(c2[d2], a2(d2, u2(l2[d2][i2]))), delete l2[d2][i2]), d2 in l2 ? c2[d2] = r2(c2[d2], l2[d2]) : delete c2[d2], c2));
    } };
  }
  function Vt() {
    if (Se) return xe;
    Se = 1;
    var e2 = Tt();
    return xe = function(r2, t2) {
      var n2, o2 = e2.OPEN_ROUND_BRACKET, i2 = e2.CLOSE_ROUND_BRACKET, a2 = 0, u2 = 0, s2 = 0, l2 = r2.length, c2 = [];
      if (-1 == r2.indexOf(t2)) return [r2];
      if (-1 == r2.indexOf(o2)) return r2.split(t2);
      for (; u2 < l2; ) r2[u2] == o2 ? a2++ : r2[u2] == i2 && a2--, 0 === a2 && u2 > 0 && u2 + 1 < l2 && r2[u2] == t2 && (c2.push(r2.substring(s2, u2)), s2 = u2 + 1), u2++;
      return s2 < u2 + 1 && ((n2 = r2.substring(s2))[n2.length - 1] == t2 && (n2 = n2.substring(0, n2.length - 1)), c2.push(n2)), c2;
    };
  }
  function Mt() {
    if (ke) return Re;
    ke = 1;
    var e2 = "", r2 = kt().Breaks, t2 = kt().Spaces, n2 = Tt(), o2 = Pt();
    function i2(e3) {
      return "filter" == e3[1][1] || "-ms-filter" == e3[1][1];
    }
    function a2(e3, r3, t3) {
      return !e3.spaceAfterClosingBrace && function(e4) {
        return "background" == e4[1][1] || "transform" == e4[1][1] || "src" == e4[1][1];
      }(r3) && function(e4, r4) {
        return e4[r4][1][e4[r4][1].length - 1] == n2.CLOSE_ROUND_BRACKET;
      }(r3, t3) || function(e4, r4) {
        return e4[r4 + 1] && e4[r4 + 1][1] == n2.FORWARD_SLASH;
      }(r3, t3) || function(e4, r4) {
        return e4[r4][1] == n2.FORWARD_SLASH;
      }(r3, t3) || function(e4, r4) {
        return e4[r4 + 1] && e4[r4 + 1][1] == n2.COMMA;
      }(r3, t3) || function(e4, r4) {
        return e4[r4][1] == n2.COMMA;
      }(r3, t3);
    }
    function u2(e3, r3) {
      for (var t3 = e3.store, n3 = 0, o3 = r3.length; n3 < o3; n3++) t3(e3, r3[n3]), n3 < o3 - 1 && t3(e3, h2(e3));
    }
    function s2(e3, r3) {
      for (var t3 = function(e4) {
        for (var r4 = e4.length - 1; r4 >= 0 && e4[r4][0] == o2.COMMENT; r4--) ;
        return r4;
      }(r3), n3 = 0, i3 = r3.length; n3 < i3; n3++) l2(e3, r3, n3, t3);
    }
    function l2(i3, a3, l3, p3) {
      var h3, v2 = i3.store, b2 = a3[l3], y2 = b2[2], E2 = y2 && y2[0] === o2.PROPERTY_BLOCK;
      h3 = i3.format ? !(!i3.format.semicolonAfterLastProperty && !E2) || l3 < p3 : l3 < p3 || E2;
      var A2 = l3 === p3;
      switch (b2[0]) {
        case o2.AT_RULE:
          v2(i3, b2), v2(i3, g2(i3, r2.AfterProperty, false));
          break;
        case o2.AT_RULE_BLOCK:
          u2(i3, b2[1]), v2(i3, d2(i3, r2.AfterRuleBegins, true)), s2(i3, b2[2]), v2(i3, m2(i3, r2.AfterRuleEnds, false, A2));
          break;
        case o2.COMMENT:
          v2(i3, b2);
          break;
        case o2.PROPERTY:
          v2(i3, b2[1]), v2(i3, function(r3) {
            return r3.format ? n2.COLON + (f2(r3, t2.BeforeValue) ? n2.SPACE : e2) : n2.COLON;
          }(i3)), y2 && c2(i3, b2), v2(i3, h3 ? g2(i3, r2.AfterProperty, A2) : e2);
          break;
        case o2.RAW:
          v2(i3, b2);
      }
    }
    function c2(e3, t3) {
      var u3, l3, c3 = e3.store;
      if (t3[2][0] == o2.PROPERTY_BLOCK) c3(e3, d2(e3, r2.AfterBlockBegins, false)), s2(e3, t3[2][1]), c3(e3, m2(e3, r2.AfterBlockEnds, false, true));
      else for (u3 = 2, l3 = t3.length; u3 < l3; u3++) c3(e3, t3[u3]), u3 < l3 - 1 && (i2(t3) || !a2(e3, t3, u3)) && c3(e3, n2.SPACE);
    }
    function p2(e3, r3) {
      return e3.format && e3.format.breaks[r3];
    }
    function f2(e3, r3) {
      return e3.format && e3.format.spaces[r3];
    }
    function d2(r3, o3, i3) {
      return r3.format ? (r3.indentBy += r3.format.indentBy, r3.indentWith = r3.format.indentWith.repeat(r3.indentBy), (i3 && f2(r3, t2.BeforeBlockBegins) ? n2.SPACE : e2) + n2.OPEN_CURLY_BRACKET + (p2(r3, o3) ? r3.format.breakWith : e2) + r3.indentWith) : n2.OPEN_CURLY_BRACKET;
    }
    function m2(t3, o3, i3, a3) {
      return t3.format ? (t3.indentBy -= t3.format.indentBy, t3.indentWith = t3.format.indentWith.repeat(t3.indentBy), (p2(t3, r2.AfterProperty) || i3 && p2(t3, r2.BeforeBlockEnds) ? t3.format.breakWith : e2) + t3.indentWith + n2.CLOSE_CURLY_BRACKET + (a3 ? e2 : (p2(t3, o3) ? t3.format.breakWith : e2) + t3.indentWith)) : n2.CLOSE_CURLY_BRACKET;
    }
    function g2(r3, t3, o3) {
      return r3.format ? n2.SEMICOLON + (o3 || !p2(r3, t3) ? e2 : r3.format.breakWith + r3.indentWith) : n2.SEMICOLON;
    }
    function h2(t3) {
      return t3.format ? n2.COMMA + (p2(t3, r2.BetweenSelectors) ? t3.format.breakWith : e2) + t3.indentWith : n2.COMMA;
    }
    return Re = { all: function t3(n3, i3) {
      var a3, l3, c3, f3, h3 = n3.store;
      for (c3 = 0, f3 = i3.length; c3 < f3; c3++) switch (l3 = c3 == f3 - 1, (a3 = i3[c3])[0]) {
        case o2.AT_RULE:
          h3(n3, a3), h3(n3, g2(n3, r2.AfterAtRule, l3));
          break;
        case o2.AT_RULE_BLOCK:
          u2(n3, a3[1]), h3(n3, d2(n3, r2.AfterRuleBegins, true)), s2(n3, a3[2]), h3(n3, m2(n3, r2.AfterRuleEnds, false, l3));
          break;
        case o2.NESTED_BLOCK:
          u2(n3, a3[1]), h3(n3, d2(n3, r2.AfterBlockBegins, true)), t3(n3, a3[2]), h3(n3, m2(n3, r2.AfterBlockEnds, true, l3));
          break;
        case o2.COMMENT:
          h3(n3, a3), h3(n3, p2(n3, r2.AfterComment) ? n3.format.breakWith : e2);
          break;
        case o2.RAW:
          h3(n3, a3);
          break;
        case o2.RULE:
          u2(n3, a3[1]), h3(n3, d2(n3, r2.AfterRuleBegins, true)), s2(n3, a3[2]), h3(n3, m2(n3, r2.AfterRuleEnds, false, l3));
      }
    }, body: s2, property: l2, rules: u2, value: c2 }, Re;
  }
  function It() {
    if (Le) return Te;
    Le = 1;
    var e2 = Mt();
    function r2(e3, r3) {
      e3.output.push("string" == typeof r3 ? r3 : r3[1]);
    }
    function t2() {
      return { output: [], store: r2 };
    }
    return Te = { all: function(r3) {
      var n2 = t2();
      return e2.all(n2, r3), n2.output.join("");
    }, body: function(r3) {
      var n2 = t2();
      return e2.body(n2, r3), n2.output.join("");
    }, property: function(r3, n2) {
      var o2 = t2();
      return e2.property(o2, r3, n2, true), o2.output.join("");
    }, rules: function(r3) {
      var n2 = t2();
      return e2.rules(n2, r3), n2.output.join("");
    }, value: function(r3) {
      var n2 = t2();
      return e2.value(n2, r3), n2.output.join("");
    } };
  }
  function jt() {
    if (_e) return De;
    _e = 1;
    var e2 = function() {
      if (j) return I;
      j = 1;
      var e3 = { aliceblue: "#f0f8ff", antiquewhite: "#faebd7", aqua: "#0ff", aquamarine: "#7fffd4", azure: "#f0ffff", beige: "#f5f5dc", bisque: "#ffe4c4", black: "#000", blanchedalmond: "#ffebcd", blue: "#00f", blueviolet: "#8a2be2", brown: "#a52a2a", burlywood: "#deb887", cadetblue: "#5f9ea0", chartreuse: "#7fff00", chocolate: "#d2691e", coral: "#ff7f50", cornflowerblue: "#6495ed", cornsilk: "#fff8dc", crimson: "#dc143c", cyan: "#0ff", darkblue: "#00008b", darkcyan: "#008b8b", darkgoldenrod: "#b8860b", darkgray: "#a9a9a9", darkgreen: "#006400", darkgrey: "#a9a9a9", darkkhaki: "#bdb76b", darkmagenta: "#8b008b", darkolivegreen: "#556b2f", darkorange: "#ff8c00", darkorchid: "#9932cc", darkred: "#8b0000", darksalmon: "#e9967a", darkseagreen: "#8fbc8f", darkslateblue: "#483d8b", darkslategray: "#2f4f4f", darkslategrey: "#2f4f4f", darkturquoise: "#00ced1", darkviolet: "#9400d3", deeppink: "#ff1493", deepskyblue: "#00bfff", dimgray: "#696969", dimgrey: "#696969", dodgerblue: "#1e90ff", firebrick: "#b22222", floralwhite: "#fffaf0", forestgreen: "#228b22", fuchsia: "#f0f", gainsboro: "#dcdcdc", ghostwhite: "#f8f8ff", gold: "#ffd700", goldenrod: "#daa520", gray: "#808080", green: "#008000", greenyellow: "#adff2f", grey: "#808080", honeydew: "#f0fff0", hotpink: "#ff69b4", indianred: "#cd5c5c", indigo: "#4b0082", ivory: "#fffff0", khaki: "#f0e68c", lavender: "#e6e6fa", lavenderblush: "#fff0f5", lawngreen: "#7cfc00", lemonchiffon: "#fffacd", lightblue: "#add8e6", lightcoral: "#f08080", lightcyan: "#e0ffff", lightgoldenrodyellow: "#fafad2", lightgray: "#d3d3d3", lightgreen: "#90ee90", lightgrey: "#d3d3d3", lightpink: "#ffb6c1", lightsalmon: "#ffa07a", lightseagreen: "#20b2aa", lightskyblue: "#87cefa", lightslategray: "#778899", lightslategrey: "#778899", lightsteelblue: "#b0c4de", lightyellow: "#ffffe0", lime: "#0f0", limegreen: "#32cd32", linen: "#faf0e6", magenta: "#ff00ff", maroon: "#800000", mediumaquamarine: "#66cdaa", mediumblue: "#0000cd", mediumorchid: "#ba55d3", mediumpurple: "#9370db", mediumseagreen: "#3cb371", mediumslateblue: "#7b68ee", mediumspringgreen: "#00fa9a", mediumturquoise: "#48d1cc", mediumvioletred: "#c71585", midnightblue: "#191970", mintcream: "#f5fffa", mistyrose: "#ffe4e1", moccasin: "#ffe4b5", navajowhite: "#ffdead", navy: "#000080", oldlace: "#fdf5e6", olive: "#808000", olivedrab: "#6b8e23", orange: "#ffa500", orangered: "#ff4500", orchid: "#da70d6", palegoldenrod: "#eee8aa", palegreen: "#98fb98", paleturquoise: "#afeeee", palevioletred: "#db7093", papayawhip: "#ffefd5", peachpuff: "#ffdab9", peru: "#cd853f", pink: "#ffc0cb", plum: "#dda0dd", powderblue: "#b0e0e6", purple: "#800080", rebeccapurple: "#663399", red: "#f00", rosybrown: "#bc8f8f", royalblue: "#4169e1", saddlebrown: "#8b4513", salmon: "#fa8072", sandybrown: "#f4a460", seagreen: "#2e8b57", seashell: "#fff5ee", sienna: "#a0522d", silver: "#c0c0c0", skyblue: "#87ceeb", slateblue: "#6a5acd", slategray: "#708090", slategrey: "#708090", snow: "#fffafa", springgreen: "#00ff7f", steelblue: "#4682b4", tan: "#d2b48c", teal: "#008080", thistle: "#d8bfd8", tomato: "#ff6347", turquoise: "#40e0d0", violet: "#ee82ee", wheat: "#f5deb3", white: "#fff", whitesmoke: "#f5f5f5", yellow: "#ff0", yellowgreen: "#9acd32" }, r3 = {}, t3 = {};
      for (var n3 in e3) {
        var o3 = e3[n3];
        n3.length < o3.length ? t3[o3] = n3 : r3[n3] = o3;
      }
      var i3 = new RegExp("(^| |,|\\))(" + Object.keys(r3).join("|") + ")( |,|\\)|$)", "ig"), a3 = new RegExp("(" + Object.keys(t3).join("|") + ")([^a-f0-9]|$)", "ig");
      function u3(e4, t4, n4, o4) {
        return t4 + r3[n4.toLowerCase()] + o4;
      }
      function s3(e4, r4, n4) {
        return t3[r4.toLowerCase()] + n4;
      }
      return I = function(e4) {
        var r4 = e4.indexOf("#") > -1, t4 = e4.replace(i3, u3);
        return t4 != e4 && (t4 = t4.replace(i3, u3)), r4 ? t4.replace(a3, s3) : t4;
      };
    }(), r2 = xt(), t2 = G ? z : (G = 1, z = function(e3, r3, t3) {
      return "#" + ("00000" + (Math.max(0, Math.min(parseInt(e3), 255)) << 16 | Math.max(0, Math.min(parseInt(r3), 255)) << 8 | Math.max(0, Math.min(parseInt(t3), 255))).toString(16)).slice(-6);
    }), n2 = St(), o2 = Dt(), i2 = function() {
      if (se) return ue;
      se = 1;
      var e3 = /^@media\W/;
      return ue = function(r3, t3) {
        var n3, o3;
        for (o3 = r3.length - 1; o3 >= 0; o3--) n3 = !t3 && e3.test(r3[o3][1]), r3[o3][1] = r3[o3][1].replace(/\n|\r\n/g, " ").replace(/\s+/g, " ").replace(/(,|:|\() /g, "$1").replace(/ \)/g, ")").replace(/'([a-zA-Z][a-zA-Z\d\-_]+)'/, "$1").replace(/"([a-zA-Z][a-zA-Z\d\-_]+)"/, "$1").replace(n3 ? /\) /g : null, ")");
        return r3;
      };
    }(), a2 = ce ? le : (ce = 1, le = function(e3) {
      return e3.replace(/\s+/g, " ").replace(/url\(\s+/g, "url(").replace(/\s+\)/g, ")").trim();
    }), u2 = _t(), s2 = Bt(), l2 = qt(), c2 = Nt().all, p2 = Ft().OptimizationLevel, f2 = Pt(), d2 = Tt(), m2 = Lt(), g2 = Vt(), h2 = It().rules, v2 = "ignore-property", b2 = "@charset", y2 = new RegExp("^" + b2, "i"), E2 = Ut().DEFAULT, A2 = /(?:^|\s|\()(-?\d+)px/, w2 = /^(\-?[\d\.]+)(m?s)$/, O2 = /[0-9a-f]/i, C2 = /^(?:\-chrome\-|\-[\w\-]+\w|\w[\w\-]+\w|\-\-\S+)$/, x2 = /^@import/i, S2 = /^('.*'|".*")$/, R2 = /^['"][a-zA-Z][a-zA-Z\d\-_]+['"]$/, k2 = /^url\(/i, T2 = /^local\(/i, L2 = /^--\S+$/;
    function D2(e3) {
      return T2.test(e3);
    }
    function _2(e3) {
      return e3 && "-" == e3[1][0] && parseFloat(e3[1]) < 0;
    }
    function B2(e3) {
      return S2.test(e3);
    }
    function q2(e3) {
      return k2.test(e3);
    }
    function P2(e3) {
      return e3.replace(k2, "url(").replace(/\\?\n|\\?\r\n/g, "");
    }
    function N2(e3) {
      var r3 = e3.value;
      1 == r3.length && "none" == r3[0][1] && (r3[0][1] = "0 0"), 1 == r3.length && "transparent" == r3[0][1] && (r3[0][1] = "0 0");
    }
    function U2(e3) {
      var r3, t3 = e3.value;
      3 == t3.length && "/" == t3[1][1] && t3[0][1] == t3[2][1] ? r3 = 1 : 5 == t3.length && "/" == t3[2][1] && t3[0][1] == t3[3][1] && t3[1][1] == t3[4][1] ? r3 = 2 : 7 == t3.length && "/" == t3[3][1] && t3[0][1] == t3[4][1] && t3[1][1] == t3[5][1] && t3[2][1] == t3[6][1] ? r3 = 3 : 9 == t3.length && "/" == t3[4][1] && t3[0][1] == t3[5][1] && t3[1][1] == t3[6][1] && t3[2][1] == t3[7][1] && t3[3][1] == t3[8][1] && (r3 = 4), r3 && (e3.value.splice(r3), e3.dirty = true);
    }
    function F2(n3, o3, i3) {
      return o3.match(/#|rgb|hsl/gi) ? (o3 = o3.replace(/(rgb|hsl)a?\((\-?\d+),(\-?\d+\%?),(\-?\d+\%?),(0*[1-9]+[0-9]*(\.?\d*)?)\)/gi, function(e3, r3, t3, n4, o4, i4) {
        return parseInt(i4, 10) >= 1 ? r3 + "(" + [t3, n4, o4].join(",") + ")" : e3;
      }).replace(/rgb\((\-?\d+),(\-?\d+),(\-?\d+)\)/gi, function(e3, r3, n4, o4) {
        return t2(r3, n4, o4);
      }).replace(/hsl\((-?\d+),(-?\d+)%?,(-?\d+)%?\)/gi, function(e3, t3, n4, o4) {
        return r2(t3, n4, o4);
      }).replace(/(^|[^='"])#([0-9a-f]{6})/gi, function(e3, r3, t3, n4, o4) {
        var i4 = o4[n4 + e3.length];
        return i4 && O2.test(i4) ? e3 : t3[0] == t3[1] && t3[2] == t3[3] && t3[4] == t3[5] ? (r3 + "#" + t3[0] + t3[2] + t3[4]).toLowerCase() : (r3 + "#" + t3).toLowerCase();
      }).replace(/(^|[^='"])#([0-9a-f]{3})/gi, function(e3, r3, t3) {
        return r3 + "#" + t3.toLowerCase();
      }).replace(/(rgb|rgba|hsl|hsla)\(([^\)]+)\)/gi, function(e3, r3, t3) {
        var n4 = t3.split(","), o4 = r3 && r3.toLowerCase();
        return "hsl" == o4 && 3 == n4.length || "hsla" == o4 && 4 == n4.length || "rgb" == o4 && 3 === n4.length && t3.indexOf("%") > 0 || "rgba" == o4 && 4 == n4.length && t3.indexOf("%") > 0 ? (-1 == n4[1].indexOf("%") && (n4[1] += "%"), -1 == n4[2].indexOf("%") && (n4[2] += "%"), r3 + "(" + n4.join(",") + ")") : e3;
      }), i3.colors.opacity && -1 == n3.indexOf("background") && (o3 = o3.replace(/(?:rgba|hsla)\(0,0%?,0%?,0\)/g, function(e3) {
        return g2(o3, ",").pop().indexOf("gradient(") > -1 ? e3 : "transparent";
      })), e2(o3)) : e2(o3);
    }
    function V2(e3) {
      1 == e3.value.length && (e3.value[0][1] = e3.value[0][1].replace(/progid:DXImageTransform\.Microsoft\.(Alpha|Chroma)(\W)/, function(e4, r3, t3) {
        return r3.toLowerCase() + t3;
      })), e3.value[0][1] = e3.value[0][1].replace(/,(\S)/g, ", $1").replace(/ ?= ?/g, "=");
    }
    function M2(e3, r3) {
      var t3 = e3.value[r3][1];
      "normal" == t3 ? t3 = "400" : "bold" == t3 && (t3 = "700"), e3.value[r3][1] = t3;
    }
    function $2(e3) {
      var r3, t3 = e3.value;
      4 == t3.length && "0" === t3[0][1] && "0" === t3[1][1] && "0" === t3[2][1] && "0" === t3[3][1] && (r3 = e3.name.indexOf("box-shadow") > -1 ? 2 : 1), r3 && (e3.value.splice(r3), e3.dirty = true);
    }
    function K2(e3) {
      var r3 = e3.value;
      1 == r3.length && "none" == r3[0][1] && (r3[0][1] = "0");
    }
    function H2(e3, r3, t3) {
      return A2.test(r3) ? r3.replace(A2, function(e4, r4) {
        var n3, o3 = parseInt(r4);
        return 0 === o3 ? e4 : (t3.properties.shorterLengthUnits && t3.units.pt && 3 * o3 % 4 == 0 && (n3 = 3 * o3 / 4 + "pt"), t3.properties.shorterLengthUnits && t3.units.pc && o3 % 16 == 0 && (n3 = o3 / 16 + "pc"), t3.properties.shorterLengthUnits && t3.units.in && o3 % 96 == 0 && (n3 = o3 / 96 + "in"), n3 && (n3 = e4.substring(0, e4.indexOf(r4)) + n3), n3 && n3.length < e4.length ? n3 : e4);
      }) : r3;
    }
    function Y2(e3, r3, t3) {
      return t3.enabled && -1 !== r3.indexOf(".") ? r3.replace(t3.decimalPointMatcher, "$1$2$3").replace(t3.zeroMatcher, function(e4, r4, n3, o3) {
        var i3 = t3.units[o3].multiplier, a3 = parseInt(r4), u3 = isNaN(a3) ? 0 : a3, s3 = parseFloat(n3);
        return Math.round((u3 + s3) * i3) / i3 + o3;
      }) : r3;
    }
    function W2(e3, r3) {
      return w2.test(r3) ? r3.replace(w2, function(e4, r4, t3) {
        var n3;
        return "ms" == t3 ? n3 = parseInt(r4) / 1e3 + "s" : "s" == t3 && (n3 = 1e3 * parseFloat(r4) + "ms"), n3.length < e4.length ? n3 : e4;
      }) : r3;
    }
    function Q2(e3, r3, t3) {
      return /^(?:\-moz\-calc|\-webkit\-calc|calc|rgb|hsl|rgba|hsla)\(/.test(r3) || "flex" == e3 || "-ms-flex" == e3 || "-webkit-flex" == e3 || "flex-basis" == e3 || "-webkit-flex-basis" == e3 || r3.indexOf("%") > 0 && ("height" == e3 || "max-height" == e3 || "width" == e3 || "max-width" == e3) ? r3 : r3.replace(t3, "$10$2").replace(t3, "$10$2");
    }
    function Z2(e3, r3) {
      return e3.indexOf("filter") > -1 || -1 == r3.indexOf(" ") || 0 === r3.indexOf("expression") || r3.indexOf(d2.SINGLE_QUOTE) > -1 || r3.indexOf(d2.DOUBLE_QUOTE) > -1 ? r3 : ((r3 = r3.replace(/\s+/g, " ")).indexOf("calc") > -1 && (r3 = r3.replace(/\) ?\/ ?/g, ")/ ")), r3.replace(/(\(;?)\s+/g, "$1").replace(/\s+(;?\))/g, "$1").replace(/, /g, ","));
    }
    function J2(e3, r3) {
      return -1 == r3.indexOf("0deg") ? r3 : r3.replace(/\(0deg\)/g, "(0)");
    }
    function X2(e3, r3) {
      return -1 == r3.indexOf("0") ? r3 : (r3.indexOf("-") > -1 && (r3 = r3.replace(/([^\w\d\-]|^)\-0([^\.]|$)/g, "$10$2").replace(/([^\w\d\-]|^)\-0([^\.]|$)/g, "$10$2")), r3.replace(/(^|\s)0+([1-9])/g, "$1$2").replace(/(^|\D)\.0+(\D|$)/g, "$10$2").replace(/(^|\D)\.0+(\D|$)/g, "$10$2").replace(/\.([1-9]*)0+(\D|$)/g, function(e4, r4, t3) {
        return (r4.length > 0 ? "." : "") + r4 + t3;
      }).replace(/(^|\D)0\.(\d)/g, "$1.$2"));
    }
    function ee2(e3, r3) {
      return "content" == e3 || e3.indexOf("font-variation-settings") > -1 || e3.indexOf("font-feature-settings") > -1 || "grid" == e3 || e3.indexOf("grid-") > -1 ? r3 : R2.test(r3) ? r3.substring(1, r3.length - 1) : r3;
    }
    function re2(e3) {
      return !/^url\(['"].+['"]\)$/.test(e3) || /^url\(['"].*[\*\s\(\)'"].*['"]\)$/.test(e3) || /^url\(['"]data:[^;]+;charset/.test(e3) ? e3 : e3.replace(/["']/g, "");
    }
    function te2(e3, r3, t3, n3) {
      var o3 = n3(e3, r3, h2(t3));
      return void 0 === o3 ? r3 : false === o3 ? v2 : o3;
    }
    function ne2(e3, r3, t3) {
      var n3, o3, i3, a3, d3, g3, h3 = t3.options, b3 = h3.level[p2.One], y3 = c2(r3, true);
      e: for (var E3 = 0, A3 = y3.length; E3 < A3; E3++) if (o3 = (n3 = y3[E3]).name, C2.test(o3) || (g3 = n3.all[n3.position], t3.warnings.push("Invalid property name '" + o3 + "' at " + m2(g3[1][2][0]) + ". Ignoring."), n3.unused = true), 0 === n3.value.length && (g3 = n3.all[n3.position], t3.warnings.push("Empty property '" + o3 + "' at " + m2(g3[1][2][0]) + ". Ignoring."), n3.unused = true), n3.hack && ((n3.hack[0] == u2.ASTERISK || n3.hack[0] == u2.UNDERSCORE) && !h3.compatibility.properties.iePrefixHack || n3.hack[0] == u2.BACKSLASH && !h3.compatibility.properties.ieSuffixHack || n3.hack[0] == u2.BANG && !h3.compatibility.properties.ieBangHack) && (n3.unused = true), b3.removeNegativePaddings && 0 === o3.indexOf("padding") && (_2(n3.value[0]) || _2(n3.value[1]) || _2(n3.value[2]) || _2(n3.value[3])) && (n3.unused = true), !h3.compatibility.properties.ieFilters && ae2(n3) && (n3.unused = true), !n3.unused) {
        if (n3.block) ne2(e3, n3.value[0][1], t3);
        else if (!L2.test(o3)) {
          for (var w3 = 0, O3 = n3.value.length; w3 < O3; w3++) {
            if (i3 = n3.value[w3][0], d3 = q2(a3 = n3.value[w3][1]), i3 == f2.PROPERTY_BLOCK) {
              n3.unused = true, t3.warnings.push("Invalid value token at " + m2(a3[0][1][2][0]) + ". Ignoring.");
              break;
            }
            if (d3 && !t3.validator.isUrl(a3)) {
              n3.unused = true, t3.warnings.push("Broken URL '" + a3 + "' at " + m2(n3.value[w3][2][0]) + ". Ignoring.");
              break;
            }
            if (d3 ? (a3 = b3.normalizeUrls ? P2(a3) : a3, a3 = h3.compatibility.properties.urlQuotes ? a3 : re2(a3)) : B2(a3) || D2(a3) ? a3 = b3.removeQuotes ? ee2(o3, a3) : a3 : (a3 = H2(0, a3 = Y2(0, a3 = b3.removeWhitespace ? Z2(o3, a3) : a3, h3.precision), h3.compatibility), a3 = b3.replaceTimeUnits ? W2(0, a3) : a3, a3 = b3.replaceZeroUnits ? X2(0, a3) : a3, h3.compatibility.properties.zeroUnits && (a3 = Q2(o3, a3 = J2(0, a3), h3.unitsRegexp)), h3.compatibility.properties.colors && (a3 = F2(o3, a3, h3.compatibility))), (a3 = te2(o3, a3, e3, b3.transform)) === v2) {
              n3.unused = true;
              continue e;
            }
            n3.value[w3][1] = a3;
          }
          b3.replaceMultipleZeros && $2(n3), "background" == o3 && b3.optimizeBackground ? N2(n3) : 0 === o3.indexOf("border") && o3.indexOf("radius") > 0 && b3.optimizeBorderRadius ? U2(n3) : "filter" == o3 && b3.optimizeFilter && h3.compatibility.properties.ieFilters ? V2(n3) : "font-weight" == o3 && b3.optimizeFontWeight ? M2(n3, 0) : "outline" == o3 && b3.optimizeOutline && K2(n3);
        }
      }
      l2(y3), s2(y3), function(e4, r4) {
        var t4, n4;
        for (n4 = 0; n4 < e4.length; n4++) (t4 = e4[n4])[0] == f2.COMMENT && (oe2(t4, r4), 0 === t4[1].length && (e4.splice(n4, 1), n4--));
      }(r3, h3);
    }
    function oe2(e3, r3) {
      e3[1][2] == d2.EXCLAMATION && ("all" == r3.level[p2.One].specialComments || r3.commentsKept < r3.level[p2.One].specialComments) ? r3.commentsKept++ : e3[1] = [];
    }
    function ie2(e3) {
      return x2.test(e3[1]);
    }
    function ae2(e3) {
      var r3;
      return ("filter" == e3.name || "-ms-filter" == e3.name) && ((r3 = e3.value[0][1]).indexOf("progid") > -1 || 0 === r3.indexOf("alpha") || 0 === r3.indexOf("chroma"));
    }
    return De = function e3(r3, t3) {
      var u3 = t3.options, s3 = u3.level[p2.One], l3 = u3.compatibility.selectors.ie7Hack, c3 = u3.compatibility.selectors.adjacentSpace, d3 = u3.compatibility.properties.spaceAfterClosingBrace, m3 = u3.format, g3 = false, h3 = false;
      u3.unitsRegexp = u3.unitsRegexp || function(e4) {
        var r4 = ["px", "em", "ex", "cm", "mm", "in", "pt", "pc", "%"];
        return ["ch", "rem", "vh", "vm", "vmax", "vmin", "vw"].forEach(function(t4) {
          e4.compatibility.units[t4] && r4.push(t4);
        }), new RegExp("(^|\\s|\\(|,)0(?:" + r4.join("|") + ")(\\W|$)", "g");
      }(u3), u3.precision = u3.precision || function(e4) {
        var r4, t4, n3 = { matcher: null, units: {} }, o3 = [];
        for (r4 in e4) (t4 = e4[r4]) != E2 && (n3.units[r4] = {}, n3.units[r4].value = t4, n3.units[r4].multiplier = Math.pow(10, t4), o3.push(r4));
        return o3.length > 0 && (n3.enabled = true, n3.decimalPointMatcher = new RegExp("(\\d)\\.($|" + o3.join("|") + ")($|\\W)", "g"), n3.zeroMatcher = new RegExp("(\\d*)(\\.\\d+)(" + o3.join("|") + ")", "g")), n3;
      }(s3.roundingPrecision), u3.commentsKept = u3.commentsKept || 0;
      for (var v3 = 0, A3 = r3.length; v3 < A3; v3++) {
        var w3 = r3[v3];
        switch (w3[0]) {
          case f2.AT_RULE:
            w3[1] = ie2(w3) && h3 ? "" : w3[1], w3[1] = s3.tidyAtRules ? a2(w3[1]) : w3[1], g3 = true;
            break;
          case f2.AT_RULE_BLOCK:
            ne2(w3[1], w3[2], t3), h3 = true;
            break;
          case f2.NESTED_BLOCK:
            w3[1] = s3.tidyBlockScopes ? i2(w3[1], d3) : w3[1], e3(w3[2], t3), h3 = true;
            break;
          case f2.COMMENT:
            oe2(w3, u3);
            break;
          case f2.RULE:
            w3[1] = s3.tidySelectors ? o2(w3[1], !l3, c3, m3, t3.warnings) : w3[1], w3[1] = w3[1].length > 1 ? n2(w3[1], s3.selectorsSortingMethod) : w3[1], ne2(w3[1], w3[2], t3), h3 = true;
        }
        (w3[0] == f2.COMMENT && 0 === w3[1].length || s3.removeEmpty && (0 === w3[1].length || w3[2] && 0 === w3[2].length)) && (r3.splice(v3, 1), v3--, A3--);
      }
      return s3.cleanupCharsets && g3 && function(e4) {
        for (var r4 = false, t4 = 0, n3 = e4.length; t4 < n3; t4++) {
          var o3 = e4[t4];
          o3[0] == f2.AT_RULE && y2.test(o3[1]) && (r4 || -1 == o3[1].indexOf(b2) ? (e4.splice(t4, 1), t4--, n3--) : (r4 = true, e4.splice(t4, 1), e4.unshift([f2.AT_RULE, o3[1].replace(y2, b2)])));
        }
      }(r3), r3;
    }, De;
  }
  function $t() {
    if (qe) return Be;
    qe = 1;
    var e2 = Tt(), r2 = Vt(), t2 = /\/deep\//, n2 = /^::/, o2 = ":not", i2 = [":dir", ":lang", ":not", ":nth-child", ":nth-last-child", ":nth-last-of-type", ":nth-of-type"], a2 = /[>\+~]/, u2 = [":after", ":before", ":first-letter", ":first-line", ":lang"], s2 = ["::after", "::before", "::first-letter", "::first-line"], l2 = "double-quote", c2 = "single-quote", p2 = "root";
    function f2(e3) {
      return t2.test(e3);
    }
    function d2(r3) {
      var t3, n3, o3, i3, u3, s3, f3 = [], d3 = [], m3 = p2, g3 = 0, h2 = false, v2 = false;
      for (u3 = 0, s3 = r3.length; u3 < s3; u3++) t3 = r3[u3], i3 = !o3 && a2.test(t3), n3 = m3 == l2 || m3 == c2, o3 ? d3.push(t3) : t3 == e2.DOUBLE_QUOTE && m3 == p2 ? (d3.push(t3), m3 = l2) : t3 == e2.DOUBLE_QUOTE && m3 == l2 ? (d3.push(t3), m3 = p2) : t3 == e2.SINGLE_QUOTE && m3 == p2 ? (d3.push(t3), m3 = c2) : t3 == e2.SINGLE_QUOTE && m3 == c2 ? (d3.push(t3), m3 = p2) : n3 ? d3.push(t3) : t3 == e2.OPEN_ROUND_BRACKET ? (d3.push(t3), g3++) : t3 == e2.CLOSE_ROUND_BRACKET && 1 == g3 && h2 ? (d3.push(t3), f3.push(d3.join("")), g3--, d3 = [], h2 = false) : t3 == e2.CLOSE_ROUND_BRACKET ? (d3.push(t3), g3--) : t3 == e2.COLON && 0 === g3 && h2 && !v2 ? (f3.push(d3.join("")), (d3 = []).push(t3)) : t3 != e2.COLON || 0 !== g3 || v2 ? t3 == e2.SPACE && 0 === g3 && h2 || i3 && 0 === g3 && h2 ? (f3.push(d3.join("")), d3 = [], h2 = false) : d3.push(t3) : ((d3 = []).push(t3), h2 = true), o3 = t3 == e2.BACK_SLASH, v2 = t3 == e2.COLON;
      return d3.length > 0 && h2 && f3.push(d3.join("")), f3;
    }
    function m2(r3, t3, n3, a3, l3) {
      return function(r4, t4, n4) {
        var o3, i3, a4, u3;
        for (a4 = 0, u3 = r4.length; a4 < u3; a4++) if (i3 = (o3 = r4[a4]).indexOf(e2.OPEN_ROUND_BRACKET) > -1 ? o3.substring(0, o3.indexOf(e2.OPEN_ROUND_BRACKET)) : o3, -1 === t4.indexOf(i3) && -1 === n4.indexOf(i3)) return false;
        return true;
      }(t3, n3, a3) && function(r4) {
        var t4, n4, o3, a4, u3, s3;
        for (u3 = 0, s3 = r4.length; u3 < s3; u3++) {
          if (n4 = (a4 = (o3 = (t4 = r4[u3]).indexOf(e2.OPEN_ROUND_BRACKET)) > -1) ? t4.substring(0, o3) : t4, a4 && -1 == i2.indexOf(n4)) return false;
          if (!a4 && i2.indexOf(n4) > -1) return false;
        }
        return true;
      }(t3) && (t3.length < 2 || !function(r4, t4) {
        var n4, i3, a4, u3, s3, l4, c3, p3, f3 = 0;
        for (c3 = 0, p3 = t4.length; c3 < p3 && (n4 = t4[c3], a4 = t4[c3 + 1]); c3++) if (i3 = r4.indexOf(n4, f3), f3 = u3 = r4.indexOf(n4, i3 + 1), i3 + n4.length == u3 && (s3 = n4.indexOf(e2.OPEN_ROUND_BRACKET) > -1 ? n4.substring(0, n4.indexOf(e2.OPEN_ROUND_BRACKET)) : n4, l4 = a4.indexOf(e2.OPEN_ROUND_BRACKET) > -1 ? a4.substring(0, a4.indexOf(e2.OPEN_ROUND_BRACKET)) : a4, s3 != o2 || l4 != o2)) return true;
        return false;
      }(r3, t3)) && (t3.length < 2 || l3 && function(e3) {
        var r4, t4, n4, o3 = 0;
        for (t4 = 0, n4 = e3.length; t4 < n4; t4++) if (g2(r4 = e3[t4]) ? o3 += s2.indexOf(r4) > -1 ? 1 : 0 : o3 += u2.indexOf(r4) > -1 ? 1 : 0, o3 > 1) return false;
        return true;
      }(t3));
    }
    function g2(e3) {
      return n2.test(e3);
    }
    return Be = function(t3, n3, o3, i3) {
      var a3, u3, s3, l3 = r2(t3, e2.COMMA);
      for (u3 = 0, s3 = l3.length; u3 < s3; u3++) if (0 === (a3 = l3[u3]).length || f2(a3) || a3.indexOf(e2.COLON) > -1 && !m2(a3, d2(a3), n3, o3, i3)) return false;
      return true;
    };
  }
  function Kt() {
    if (Ne) return Pe;
    Ne = 1;
    var e2 = Tt();
    return Pe = function(r2, t2, n2) {
      var o2, i2, a2, u2 = t2.value.length, s2 = n2.value.length, l2 = Math.max(u2, s2), c2 = Math.min(u2, s2) - 1;
      for (a2 = 0; a2 < l2; a2++) if (o2 = t2.value[a2] && t2.value[a2][1] || o2, i2 = n2.value[a2] && n2.value[a2][1] || i2, o2 != e2.COMMA && i2 != e2.COMMA && !r2(o2, i2, a2, a2 <= c2)) return false;
      return true;
    };
  }
  function zt() {
    if (Fe) return Ue;
    return Fe = 1, Ue = function(e2) {
      for (var r2 = e2.value.length - 1; r2 >= 0; r2--) if ("inherit" == e2.value[r2][1]) return true;
      return false;
    };
  }
  function Gt() {
    if (Me) return Ve;
    function e2(e3) {
      this.name = "InvalidPropertyError", this.message = e3, this.stack = new Error().stack;
    }
    return Me = 1, e2.prototype = Object.create(Error.prototype), e2.prototype.constructor = e2, Ve = e2;
  }
  function Ht() {
    if (Ke) return $e;
    Ke = 1;
    var e2 = /(?:^|\W)(\-\w+\-)/g;
    function r2(r3) {
      for (var t2, n2 = []; null !== (t2 = e2.exec(r3)); ) -1 == n2.indexOf(t2[0]) && n2.push(t2[0]);
      return n2;
    }
    return $e = { unique: r2, same: function(e3, t2) {
      return r2(e3).sort().join(",") == r2(t2).sort().join(",");
    } };
  }
  function Yt() {
    if (Ye) return He;
    Ye = 1;
    var e2 = function() {
      if (Ge) return ze;
      Ge = 1;
      var e3 = Ht().same;
      return ze = function(r3, t3, n3, o3, i3) {
        return !(!e3(t3, n3) || i3 && r3.isVariable(t3) !== r3.isVariable(n3));
      };
    }();
    function r2(r3) {
      return function(t3, n3, o3) {
        return !(!e2(t3, n3, o3, 0, true) && !t3.isKeyword(r3)(o3)) && (!(!t3.isVariable(n3) || !t3.isVariable(o3)) || t3.isKeyword(r3)(o3));
      };
    }
    function t2(r3) {
      return function(t3, n3, o3) {
        return !!(e2(t3, n3, o3, 0, true) || t3.isKeyword(r3)(o3) || t3.isGlobal(o3)) && (!(!t3.isVariable(n3) || !t3.isVariable(o3)) || (t3.isKeyword(r3)(o3) || t3.isGlobal(o3)));
      };
    }
    function n2(e3, r3, t3) {
      return !!function(e4, r4, t4) {
        return !(!e4.isFunction(r4) || !e4.isFunction(t4)) && r4.substring(0, r4.indexOf("(")) === t4.substring(0, t4.indexOf("("));
      }(e3, r3, t3) || r3 === t3;
    }
    function o2(r3, t3, o3) {
      return !(!e2(r3, t3, o3, 0, true) && !r3.isUnit(o3)) && (!(!r3.isVariable(t3) || !r3.isVariable(o3)) || !(r3.isUnit(t3) && !r3.isUnit(o3)) && (!!r3.isUnit(o3) || !r3.isUnit(t3) && (!(!r3.isFunction(t3) || r3.isPrefixed(t3) || !r3.isFunction(o3) || r3.isPrefixed(o3)) || n2(r3, t3, o3))));
    }
    function i2(e3) {
      var r3 = t2(e3);
      return function(e4, t3, n3) {
        return o2(e4, t3, n3) || r3(e4, t3, n3);
      };
    }
    return He = { generic: { color: function(r3, t3, o3) {
      return !(!e2(r3, t3, o3, 0, true) && !r3.isColor(o3)) && (!(!r3.isVariable(t3) || !r3.isVariable(o3)) || !(!r3.colorOpacity && (r3.isRgbColor(t3) || r3.isHslColor(t3))) && (!(!r3.colorOpacity && (r3.isRgbColor(o3) || r3.isHslColor(o3))) && (!(!r3.isColor(t3) || !r3.isColor(o3)) || n2(r3, t3, o3))));
    }, components: function(e3) {
      return function(r3, t3, n3, o3) {
        return e3[o3](r3, t3, n3);
      };
    }, image: function(r3, t3, o3) {
      return !(!e2(r3, t3, o3, 0, true) && !r3.isImage(o3)) && (!(!r3.isVariable(t3) || !r3.isVariable(o3)) || (!!r3.isImage(o3) || !r3.isImage(t3) && n2(r3, t3, o3)));
    }, propertyName: function(r3, t3, n3) {
      return !(!e2(r3, t3, n3, 0, true) && !r3.isIdentifier(n3)) && (!(!r3.isVariable(t3) || !r3.isVariable(n3)) || r3.isIdentifier(n3));
    }, time: function(r3, t3, o3) {
      return !(!e2(r3, t3, o3, 0, true) && !r3.isTime(o3)) && (!(!r3.isVariable(t3) || !r3.isVariable(o3)) || !(r3.isTime(t3) && !r3.isTime(o3)) && (!!r3.isTime(o3) || !r3.isTime(t3) && (!(!r3.isFunction(t3) || r3.isPrefixed(t3) || !r3.isFunction(o3) || r3.isPrefixed(o3)) || n2(r3, t3, o3))));
    }, timingFunction: function(r3, t3, n3) {
      return !!(e2(r3, t3, n3, 0, true) || r3.isTimingFunction(n3) || r3.isGlobal(n3)) && (!(!r3.isVariable(t3) || !r3.isVariable(n3)) || (r3.isTimingFunction(n3) || r3.isGlobal(n3)));
    }, unit: o2, unitOrNumber: function(r3, t3, o3) {
      return !!(e2(r3, t3, o3, 0, true) || r3.isUnit(o3) || r3.isNumber(o3)) && (!(!r3.isVariable(t3) || !r3.isVariable(o3)) || !((r3.isUnit(t3) || r3.isNumber(t3)) && !r3.isUnit(o3) && !r3.isNumber(o3)) && (!(!r3.isUnit(o3) && !r3.isNumber(o3)) || !r3.isUnit(t3) && !r3.isNumber(t3) && (!(!r3.isFunction(t3) || r3.isPrefixed(t3) || !r3.isFunction(o3) || r3.isPrefixed(o3)) || n2(r3, t3, o3))));
    } }, property: { animationDirection: t2("animation-direction"), animationFillMode: r2("animation-fill-mode"), animationIterationCount: function(r3, t3, n3) {
      return !!(e2(r3, t3, n3, 0, true) || r3.isAnimationIterationCountKeyword(n3) || r3.isPositiveNumber(n3)) && (!(!r3.isVariable(t3) || !r3.isVariable(n3)) || (r3.isAnimationIterationCountKeyword(n3) || r3.isPositiveNumber(n3)));
    }, animationName: function(r3, t3, n3) {
      return !!(e2(r3, t3, n3, 0, true) || r3.isAnimationNameKeyword(n3) || r3.isIdentifier(n3)) && (!(!r3.isVariable(t3) || !r3.isVariable(n3)) || (r3.isAnimationNameKeyword(n3) || r3.isIdentifier(n3)));
    }, animationPlayState: t2("animation-play-state"), backgroundAttachment: r2("background-attachment"), backgroundClip: t2("background-clip"), backgroundOrigin: r2("background-origin"), backgroundPosition: function(r3, t3, n3) {
      return !!(e2(r3, t3, n3, 0, true) || r3.isBackgroundPositionKeyword(n3) || r3.isGlobal(n3)) && (!(!r3.isVariable(t3) || !r3.isVariable(n3)) || (!(!r3.isBackgroundPositionKeyword(n3) && !r3.isGlobal(n3)) || o2(r3, t3, n3)));
    }, backgroundRepeat: r2("background-repeat"), backgroundSize: function(r3, t3, n3) {
      return !!(e2(r3, t3, n3, 0, true) || r3.isBackgroundSizeKeyword(n3) || r3.isGlobal(n3)) && (!(!r3.isVariable(t3) || !r3.isVariable(n3)) || (!(!r3.isBackgroundSizeKeyword(n3) && !r3.isGlobal(n3)) || o2(r3, t3, n3)));
    }, bottom: i2("bottom"), borderCollapse: r2("border-collapse"), borderStyle: t2("*-style"), clear: t2("clear"), cursor: t2("cursor"), display: t2("display"), float: t2("float"), left: i2("left"), fontFamily: function(r3, t3, n3) {
      return e2(r3, t3, n3, 0, true);
    }, fontStretch: t2("font-stretch"), fontStyle: t2("font-style"), fontVariant: t2("font-variant"), fontWeight: t2("font-weight"), listStyleType: t2("list-style-type"), listStylePosition: t2("list-style-position"), outlineStyle: t2("*-style"), overflow: t2("overflow"), position: t2("position"), right: i2("right"), textAlign: t2("text-align"), textDecoration: t2("text-decoration"), textOverflow: t2("text-overflow"), textShadow: function(r3, t3, n3) {
      return !!(e2(r3, t3, n3, 0, true) || r3.isUnit(n3) || r3.isColor(n3) || r3.isGlobal(n3)) && (!(!r3.isVariable(t3) || !r3.isVariable(n3)) || (r3.isUnit(n3) || r3.isColor(n3) || r3.isGlobal(n3)));
    }, top: i2("top"), transform: n2, verticalAlign: i2("vertical-align"), visibility: t2("visibility"), whiteSpace: t2("white-space"), zIndex: function(r3, t3, n3) {
      return !(!e2(r3, t3, n3, 0, true) && !r3.isZIndex(n3)) && (!(!r3.isVariable(t3) || !r3.isVariable(n3)) || r3.isZIndex(n3));
    } } };
  }
  function Wt() {
    if (Qe) return We;
    Qe = 1;
    var e2 = Nt().single, r2 = Pt();
    function t2(t3) {
      var n2 = e2([r2.PROPERTY, [r2.PROPERTY_NAME, t3.name]]);
      return n2.important = t3.important, n2.hack = t3.hack, n2.unused = false, n2;
    }
    return We = { deep: function(e3) {
      for (var r3 = t2(e3), n2 = e3.components.length - 1; n2 >= 0; n2--) {
        var o2 = t2(e3.components[n2]);
        o2.value = e3.components[n2].value.slice(0), r3.components.unshift(o2);
      }
      return r3.dirty = true, r3.value = e3.value.slice(0), r3;
    }, shallow: t2 };
  }
  function Qt() {
    if (er) return Xe;
    er = 1;
    var e2 = function() {
      if (je) return Ie;
      je = 1;
      var e3 = Gt(), r3 = Nt().single, t3 = Pt(), n3 = Tt(), o3 = Lt();
      function i3(e4) {
        var r4, t4;
        for (r4 = 0, t4 = e4.length; r4 < t4; r4++) if ("inherit" == e4[r4][1]) return true;
        return false;
      }
      function a3(e4, n4, o4) {
        var i4 = o4[e4];
        return i4.doubleValues && 2 == i4.defaultValue.length ? r3([t3.PROPERTY, [t3.PROPERTY_NAME, e4], [t3.PROPERTY_VALUE, i4.defaultValue[0]], [t3.PROPERTY_VALUE, i4.defaultValue[1]]]) : i4.doubleValues && 1 == i4.defaultValue.length ? r3([t3.PROPERTY, [t3.PROPERTY_NAME, e4], [t3.PROPERTY_VALUE, i4.defaultValue[0]]]) : r3([t3.PROPERTY, [t3.PROPERTY_NAME, e4], [t3.PROPERTY_VALUE, i4.defaultValue]]);
      }
      function u3(e4, n4) {
        var o4 = n4[e4.name].components, i4 = [], a4 = e4.value;
        if (a4.length < 1) return [];
        a4.length < 2 && (a4[1] = a4[0].slice(0)), a4.length < 3 && (a4[2] = a4[0].slice(0)), a4.length < 4 && (a4[3] = a4[1].slice(0));
        for (var u4 = o4.length - 1; u4 >= 0; u4--) {
          var s4 = r3([t3.PROPERTY, [t3.PROPERTY_NAME, o4[u4]]]);
          s4.value = [a4[u4]], i4.unshift(s4);
        }
        return i4;
      }
      function s3(e4, r4, t4) {
        for (var n4, o4, i4, u4 = r4[e4.name], s4 = [a3(u4.components[0], 0, r4), a3(u4.components[1], 0, r4), a3(u4.components[2], 0, r4)], l3 = 0; l3 < 3; l3++) {
          var c3 = s4[l3];
          c3.name.indexOf("color") > 0 ? n4 = c3 : c3.name.indexOf("style") > 0 ? o4 = c3 : i4 = c3;
        }
        if (1 == e4.value.length && "inherit" == e4.value[0][1] || 3 == e4.value.length && "inherit" == e4.value[0][1] && "inherit" == e4.value[1][1] && "inherit" == e4.value[2][1]) return n4.value = o4.value = i4.value = [e4.value[0]], s4;
        var p3, f2, d2 = e4.value.slice(0);
        return d2.length > 0 && (f2 = d2.filter(/* @__PURE__ */ function(e5) {
          return function(r5) {
            return "inherit" != r5[1] && (e5.isWidth(r5[1]) || e5.isUnit(r5[1]) && !e5.isDynamicUnit(r5[1])) && !e5.isStyleKeyword(r5[1]) && !e5.isColorFunction(r5[1]);
          };
        }(t4)), (p3 = f2.length > 1 && ("none" == f2[0][1] || "auto" == f2[0][1]) ? f2[1] : f2[0]) && (i4.value = [p3], d2.splice(d2.indexOf(p3), 1))), d2.length > 0 && (p3 = d2.filter(/* @__PURE__ */ function(e5) {
          return function(r5) {
            return "inherit" != r5[1] && e5.isStyleKeyword(r5[1]) && !e5.isColorFunction(r5[1]);
          };
        }(t4))[0], p3 && (o4.value = [p3], d2.splice(d2.indexOf(p3), 1))), d2.length > 0 && (p3 = d2.filter(/* @__PURE__ */ function(e5) {
          return function(r5) {
            return "invert" == r5[1] || e5.isColor(r5[1]) || e5.isPrefixed(r5[1]);
          };
        }(t4))[0], p3 && (n4.value = [p3], d2.splice(d2.indexOf(p3), 1))), s4;
      }
      return Ie = { animation: function(r4, t4, n4) {
        var u4, s4, l3, c3 = a3(r4.name + "-duration", 0, t4), p3 = a3(r4.name + "-timing-function", 0, t4), f2 = a3(r4.name + "-delay", 0, t4), d2 = a3(r4.name + "-iteration-count", 0, t4), m2 = a3(r4.name + "-direction", 0, t4), g2 = a3(r4.name + "-fill-mode", 0, t4), h2 = a3(r4.name + "-play-state", 0, t4), v2 = a3(r4.name + "-name", 0, t4), b2 = [c3, p3, f2, d2, m2, g2, h2, v2], y2 = r4.value, E2 = false, A2 = false, w2 = false, O2 = false, C2 = false, x2 = false, S2 = false, R2 = false;
        if (1 == r4.value.length && "inherit" == r4.value[0][1]) return c3.value = p3.value = f2.value = d2.value = m2.value = g2.value = h2.value = v2.value = r4.value, b2;
        if (y2.length > 1 && i3(y2)) throw new e3("Invalid animation values at " + o3(y2[0][2][0]) + ". Ignoring.");
        for (s4 = 0, l3 = y2.length; s4 < l3; s4++) if (u4 = y2[s4], n4.isTime(u4[1]) && !E2) c3.value = [u4], E2 = true;
        else if (n4.isTime(u4[1]) && !w2) f2.value = [u4], w2 = true;
        else if (!n4.isGlobal(u4[1]) && !n4.isTimingFunction(u4[1]) || A2) if (!n4.isAnimationIterationCountKeyword(u4[1]) && !n4.isPositiveNumber(u4[1]) || O2) if (n4.isAnimationDirectionKeyword(u4[1]) && !C2) m2.value = [u4], C2 = true;
        else if (n4.isAnimationFillModeKeyword(u4[1]) && !x2) g2.value = [u4], x2 = true;
        else if (n4.isAnimationPlayStateKeyword(u4[1]) && !S2) h2.value = [u4], S2 = true;
        else {
          if (!n4.isAnimationNameKeyword(u4[1]) && !n4.isIdentifier(u4[1]) || R2) throw new e3("Invalid animation value at " + o3(u4[2][0]) + ". Ignoring.");
          v2.value = [u4], R2 = true;
        }
        else d2.value = [u4], O2 = true;
        else p3.value = [u4], A2 = true;
        return b2;
      }, background: function(r4, t4, i4) {
        var u4 = a3("background-image", 0, t4), s4 = a3("background-position", 0, t4), l3 = a3("background-size", 0, t4), c3 = a3("background-repeat", 0, t4), p3 = a3("background-attachment", 0, t4), f2 = a3("background-origin", 0, t4), d2 = a3("background-clip", 0, t4), m2 = a3("background-color", 0, t4), g2 = [u4, s4, l3, c3, p3, f2, d2, m2], h2 = r4.value, v2 = false, b2 = false, y2 = false, E2 = false, A2 = false;
        if (1 == r4.value.length && "inherit" == r4.value[0][1]) return m2.value = u4.value = c3.value = s4.value = l3.value = f2.value = d2.value = r4.value, g2;
        if (1 == r4.value.length && "0 0" == r4.value[0][1]) return g2;
        for (var w2 = h2.length - 1; w2 >= 0; w2--) {
          var O2 = h2[w2];
          if (i4.isBackgroundAttachmentKeyword(O2[1])) p3.value = [O2], A2 = true;
          else if (i4.isBackgroundClipKeyword(O2[1]) || i4.isBackgroundOriginKeyword(O2[1])) b2 ? (f2.value = [O2], y2 = true) : (d2.value = [O2], b2 = true), A2 = true;
          else if (i4.isBackgroundRepeatKeyword(O2[1])) E2 ? c3.value.unshift(O2) : (c3.value = [O2], E2 = true), A2 = true;
          else if (i4.isBackgroundPositionKeyword(O2[1]) || i4.isBackgroundSizeKeyword(O2[1]) || i4.isUnit(O2[1]) || i4.isDynamicUnit(O2[1])) {
            if (w2 > 0) {
              var C2 = h2[w2 - 1];
              C2[1] == n3.FORWARD_SLASH ? l3.value = [O2] : w2 > 1 && h2[w2 - 2][1] == n3.FORWARD_SLASH ? (l3.value = [C2, O2], w2 -= 2) : (v2 || (s4.value = []), s4.value.unshift(O2), v2 = true);
            } else v2 || (s4.value = []), s4.value.unshift(O2), v2 = true;
            A2 = true;
          } else m2.value[0][1] != t4[m2.name].defaultValue && "none" != m2.value[0][1] || !i4.isColor(O2[1]) && !i4.isPrefixed(O2[1]) ? (i4.isUrl(O2[1]) || i4.isFunction(O2[1])) && (u4.value = [O2], A2 = true) : (m2.value = [O2], A2 = true);
        }
        if (b2 && !y2 && (f2.value = d2.value.slice(0)), !A2) throw new e3("Invalid background value at " + o3(h2[0][2][0]) + ". Ignoring.");
        return g2;
      }, border: s3, borderRadius: function(r4, t4) {
        for (var i4 = r4.value, s4 = -1, l3 = 0, c3 = i4.length; l3 < c3; l3++) if (i4[l3][1] == n3.FORWARD_SLASH) {
          s4 = l3;
          break;
        }
        if (0 === s4 || s4 === i4.length - 1) throw new e3("Invalid border-radius value at " + o3(i4[0][2][0]) + ". Ignoring.");
        var p3 = a3(r4.name, 0, t4);
        p3.value = s4 > -1 ? i4.slice(0, s4) : i4.slice(0), p3.components = u3(p3, t4);
        var f2 = a3(r4.name, 0, t4);
        f2.value = s4 > -1 ? i4.slice(s4 + 1) : i4.slice(0), f2.components = u3(f2, t4);
        for (var d2 = 0; d2 < 4; d2++) p3.components[d2].multiplex = true, p3.components[d2].value = p3.components[d2].value.concat(f2.components[d2].value);
        return p3.components;
      }, font: function(r4, t4, u4) {
        var s4, l3, c3, p3, f2 = a3("font-style", 0, t4), d2 = a3("font-variant", 0, t4), m2 = a3("font-weight", 0, t4), g2 = a3("font-stretch", 0, t4), h2 = a3("font-size", 0, t4), v2 = a3("line-height", 0, t4), b2 = a3("font-family", 0, t4), y2 = [f2, d2, m2, g2, h2, v2, b2], E2 = r4.value, A2 = 0, w2 = false, O2 = false, C2 = false, x2 = false, S2 = false, R2 = false;
        if (!E2[A2]) throw new e3("Missing font values at " + o3(r4.all[r4.position][1][2][0]) + ". Ignoring.");
        if (1 == E2.length && "inherit" == E2[0][1]) return f2.value = d2.value = m2.value = g2.value = h2.value = v2.value = b2.value = E2, y2;
        if (1 == E2.length && (u4.isFontKeyword(E2[0][1]) || u4.isGlobal(E2[0][1]) || u4.isPrefixed(E2[0][1]))) return E2[0][1] = n3.INTERNAL + E2[0][1], f2.value = d2.value = m2.value = g2.value = h2.value = v2.value = b2.value = E2, y2;
        if (E2.length < 2 || !function(e4, r5) {
          var t5, n4, o4;
          for (n4 = 0, o4 = e4.length; n4 < o4; n4++) if (t5 = e4[n4], r5.isFontSizeKeyword(t5[1]) || r5.isUnit(t5[1]) && !r5.isDynamicUnit(t5[1]) || r5.isFunction(t5[1])) return true;
          return false;
        }(E2, u4) || !function(e4, r5) {
          var t5, n4, o4;
          for (n4 = 0, o4 = e4.length; n4 < o4; n4++) if (t5 = e4[n4], r5.isIdentifier(t5[1])) return true;
          return false;
        }(E2, u4)) throw new e3("Invalid font values at " + o3(r4.all[r4.position][1][2][0]) + ". Ignoring.");
        if (E2.length > 1 && i3(E2)) throw new e3("Invalid font values at " + o3(E2[0][2][0]) + ". Ignoring.");
        for (; A2 < 4; ) {
          if (s4 = u4.isFontStretchKeyword(E2[A2][1]) || u4.isGlobal(E2[A2][1]), l3 = u4.isFontStyleKeyword(E2[A2][1]) || u4.isGlobal(E2[A2][1]), c3 = u4.isFontVariantKeyword(E2[A2][1]) || u4.isGlobal(E2[A2][1]), p3 = u4.isFontWeightKeyword(E2[A2][1]) || u4.isGlobal(E2[A2][1]), l3 && !O2) f2.value = [E2[A2]], O2 = true;
          else if (c3 && !C2) d2.value = [E2[A2]], C2 = true;
          else if (p3 && !x2) m2.value = [E2[A2]], x2 = true;
          else {
            if (!s4 || w2) {
              if (l3 && O2 || c3 && C2 || p3 && x2 || s4 && w2) throw new e3("Invalid font style / variant / weight / stretch value at " + o3(E2[0][2][0]) + ". Ignoring.");
              break;
            }
            g2.value = [E2[A2]], w2 = true;
          }
          A2++;
        }
        if (!(u4.isFontSizeKeyword(E2[A2][1]) || u4.isUnit(E2[A2][1]) && !u4.isDynamicUnit(E2[A2][1]))) throw new e3("Missing font size at " + o3(E2[0][2][0]) + ". Ignoring.");
        if (h2.value = [E2[A2]], S2 = true, !E2[++A2]) throw new e3("Missing font family at " + o3(E2[0][2][0]) + ". Ignoring.");
        for (S2 && E2[A2] && E2[A2][1] == n3.FORWARD_SLASH && E2[A2 + 1] && (u4.isLineHeightKeyword(E2[A2 + 1][1]) || u4.isUnit(E2[A2 + 1][1]) || u4.isNumber(E2[A2 + 1][1])) && (v2.value = [E2[A2 + 1]], A2++, A2++), b2.value = []; E2[A2]; ) E2[A2][1] == n3.COMMA ? R2 = false : (R2 ? b2.value[b2.value.length - 1][1] += n3.SPACE + E2[A2][1] : b2.value.push(E2[A2]), R2 = true), A2++;
        if (0 === b2.value.length) throw new e3("Missing font family at " + o3(E2[0][2][0]) + ". Ignoring.");
        return y2;
      }, fourValues: u3, listStyle: function(e4, r4, t4) {
        var n4 = a3("list-style-type", 0, r4), o4 = a3("list-style-position", 0, r4), i4 = a3("list-style-image", 0, r4), u4 = [n4, o4, i4];
        if (1 == e4.value.length && "inherit" == e4.value[0][1]) return n4.value = o4.value = i4.value = [e4.value[0]], u4;
        var s4 = e4.value.slice(0), l3 = s4.length, c3 = 0;
        for (c3 = 0, l3 = s4.length; c3 < l3; c3++) if (t4.isUrl(s4[c3][1]) || "0" == s4[c3][1]) {
          i4.value = [s4[c3]], s4.splice(c3, 1);
          break;
        }
        for (c3 = 0, l3 = s4.length; c3 < l3; c3++) if (t4.isListStylePositionKeyword(s4[c3][1])) {
          o4.value = [s4[c3]], s4.splice(c3, 1);
          break;
        }
        return s4.length > 0 && (t4.isListStyleTypeKeyword(s4[0][1]) || t4.isIdentifier(s4[0][1])) && (n4.value = [s4[0]]), u4;
      }, multiplex: function(e4) {
        return function(r4, o4, i4) {
          var u4, s4, l3, c3, p3 = [], f2 = r4.value;
          for (u4 = 0, l3 = f2.length; u4 < l3; u4++) "," == f2[u4][1] && p3.push(u4);
          if (0 === p3.length) return e4(r4, o4, i4);
          var d2 = [];
          for (u4 = 0, l3 = p3.length; u4 <= l3; u4++) {
            var m2 = 0 === u4 ? 0 : p3[u4 - 1] + 1, g2 = u4 < l3 ? p3[u4] : f2.length, h2 = a3(r4.name, 0, o4);
            h2.value = f2.slice(m2, g2), d2.push(e4(h2, o4, i4));
          }
          var v2 = d2[0];
          for (u4 = 0, l3 = v2.length; u4 < l3; u4++) for (v2[u4].multiplex = true, s4 = 1, c3 = d2.length; s4 < c3; s4++) v2[u4].value.push([t3.PROPERTY_VALUE, n3.COMMA]), Array.prototype.push.apply(v2[u4].value, d2[s4][u4].value);
          return v2;
        };
      }, outline: s3, transition: function(r4, t4, n4) {
        var u4, s4, l3, c3 = a3(r4.name + "-property", 0, t4), p3 = a3(r4.name + "-duration", 0, t4), f2 = a3(r4.name + "-timing-function", 0, t4), d2 = a3(r4.name + "-delay", 0, t4), m2 = [c3, p3, f2, d2], g2 = r4.value, h2 = false, v2 = false, b2 = false, y2 = false;
        if (1 == r4.value.length && "inherit" == r4.value[0][1]) return c3.value = p3.value = f2.value = d2.value = r4.value, m2;
        if (g2.length > 1 && i3(g2)) throw new e3("Invalid animation values at " + o3(g2[0][2][0]) + ". Ignoring.");
        for (s4 = 0, l3 = g2.length; s4 < l3; s4++) if (u4 = g2[s4], n4.isTime(u4[1]) && !h2) p3.value = [u4], h2 = true;
        else if (n4.isTime(u4[1]) && !v2) d2.value = [u4], v2 = true;
        else if (!n4.isGlobal(u4[1]) && !n4.isTimingFunction(u4[1]) || y2) {
          if (!n4.isIdentifier(u4[1]) || b2) throw new e3("Invalid animation value at " + o3(u4[2][0]) + ". Ignoring.");
          c3.value = [u4], b2 = true;
        } else f2.value = [u4], y2 = true;
        return m2;
      } };
    }(), r2 = Yt(), t2 = function() {
      if (Je) return Ze;
      Je = 1;
      var e3 = Wt().shallow, r3 = Pt(), t3 = Tt();
      function n3(e4) {
        for (var r4 = 0, n4 = e4.length; r4 < n4; r4++) {
          var o4 = e4[r4][1];
          if ("inherit" != o4 && o4 != t3.COMMA && o4 != t3.FORWARD_SLASH) return false;
        }
        return true;
      }
      function o3(e4) {
        var r4 = e4.components, t4 = r4[0].value[0], n4 = r4[1].value[0], o4 = r4[2].value[0], i4 = r4[3].value[0];
        return t4[1] == n4[1] && t4[1] == o4[1] && t4[1] == i4[1] ? [t4] : t4[1] == o4[1] && n4[1] == i4[1] ? [t4, n4] : n4[1] == i4[1] ? [t4, n4, o4] : [t4, n4, o4, i4];
      }
      function i3(e4, r4, t4) {
        var n4, o4, i4;
        for (o4 = 0, i4 = e4.length; o4 < i4; o4++) if ((n4 = e4[o4]).name == t4 && n4.value[0][1] == r4[t4].defaultValue) return true;
        return false;
      }
      return Ze = { background: function(e4, o4, i4) {
        var a3, u3, s3 = e4.components, l3 = [];
        function c3(e5) {
          Array.prototype.unshift.apply(l3, e5.value);
        }
        function p3(e5) {
          var r4 = o4[e5.name];
          return r4.doubleValues && 1 == r4.defaultValue.length ? e5.value[0][1] == r4.defaultValue[0] && (!e5.value[1] || e5.value[1][1] == r4.defaultValue[0]) : r4.doubleValues && 1 != r4.defaultValue.length ? e5.value[0][1] == r4.defaultValue[0] && (e5.value[1] ? e5.value[1][1] : e5.value[0][1]) == r4.defaultValue[1] : e5.value[0][1] == r4.defaultValue;
        }
        for (var f2 = s3.length - 1; f2 >= 0; f2--) {
          var d2 = s3[f2], m2 = p3(d2);
          if ("background-clip" == d2.name) {
            var g2 = s3[f2 - 1], h2 = p3(g2);
            u3 = !(a3 = d2.value[0][1] == g2.value[0][1]) && (h2 && !m2 || !h2 && !m2 || !h2 && m2 && d2.value[0][1] != g2.value[0][1]), a3 ? c3(g2) : u3 && (c3(d2), c3(g2)), f2--;
          } else if ("background-size" == d2.name) {
            var v2 = s3[f2 - 1], b2 = p3(v2);
            u3 = !(a3 = !b2 && m2) && (b2 && !m2 || !b2 && !m2), a3 ? c3(v2) : u3 ? (c3(d2), l3.unshift([r3.PROPERTY_VALUE, t3.FORWARD_SLASH]), c3(v2)) : 1 == v2.value.length && c3(v2), f2--;
          } else {
            if (m2 || o4[d2.name].multiplexLastOnly && !i4) continue;
            c3(d2);
          }
        }
        return 0 === l3.length && 1 == e4.value.length && "0" == e4.value[0][1] && l3.push(e4.value[0]), 0 === l3.length && l3.push([r3.PROPERTY_VALUE, o4[e4.name].defaultValue]), n3(l3) ? [l3[0]] : l3;
      }, borderRadius: function(n4, i4) {
        if (n4.multiplex) {
          for (var a3 = e3(n4), u3 = e3(n4), s3 = 0; s3 < 4; s3++) {
            var l3 = n4.components[s3], c3 = e3(n4);
            c3.value = [l3.value[0]], a3.components.push(c3);
            var p3 = e3(n4);
            p3.value = [l3.value[1] || l3.value[0]], u3.components.push(p3);
          }
          var f2 = o3(a3), d2 = o3(u3);
          return f2.length != d2.length || f2[0][1] != d2[0][1] || f2.length > 1 && f2[1][1] != d2[1][1] || f2.length > 2 && f2[2][1] != d2[2][1] || f2.length > 3 && f2[3][1] != d2[3][1] ? f2.concat([[r3.PROPERTY_VALUE, t3.FORWARD_SLASH]]).concat(d2) : f2;
        }
        return o3(n4);
      }, font: function(e4, o4) {
        var i4, a3 = e4.components, u3 = [], s3 = 0, l3 = 0;
        if (0 === e4.value[0][1].indexOf(t3.INTERNAL)) return e4.value[0][1] = e4.value[0][1].substring(t3.INTERNAL.length), e4.value;
        for (; s3 < 4; ) (i4 = a3[s3]).value[0][1] != o4[i4.name].defaultValue && Array.prototype.push.apply(u3, i4.value), s3++;
        for (Array.prototype.push.apply(u3, a3[s3].value), a3[++s3].value[0][1] != o4[a3[s3].name].defaultValue && (Array.prototype.push.apply(u3, [[r3.PROPERTY_VALUE, t3.FORWARD_SLASH]]), Array.prototype.push.apply(u3, a3[s3].value)), s3++; a3[s3].value[l3]; ) u3.push(a3[s3].value[l3]), a3[s3].value[l3 + 1] && u3.push([r3.PROPERTY_VALUE, t3.COMMA]), l3++;
        return n3(u3) ? [u3[0]] : u3;
      }, fourValues: o3, multiplex: function(n4) {
        return function(o4, i4) {
          if (!o4.multiplex) return n4(o4, i4, true);
          var a3, u3, s3 = 0, l3 = [], c3 = {};
          for (a3 = 0, u3 = o4.components[0].value.length; a3 < u3; a3++) o4.components[0].value[a3][1] == t3.COMMA && s3++;
          for (a3 = 0; a3 <= s3; a3++) {
            for (var p3 = e3(o4), f2 = 0, d2 = o4.components.length; f2 < d2; f2++) {
              var m2 = o4.components[f2], g2 = e3(m2);
              p3.components.push(g2);
              for (var h2 = c3[g2.name] || 0, v2 = m2.value.length; h2 < v2; h2++) {
                if (m2.value[h2][1] == t3.COMMA) {
                  c3[g2.name] = h2 + 1;
                  break;
                }
                g2.value.push(m2.value[h2]);
              }
            }
            var b2 = n4(p3, i4, a3 == s3);
            Array.prototype.push.apply(l3, b2), a3 < s3 && l3.push([r3.PROPERTY_VALUE, t3.COMMA]);
          }
          return l3;
        };
      }, withoutDefaults: function(e4, t4) {
        for (var o4 = e4.components, a3 = [], u3 = o4.length - 1; u3 >= 0; u3--) {
          var s3 = o4[u3], l3 = t4[s3.name];
          (s3.value[0][1] != l3.defaultValue || "keepUnlessDefault" in l3 && !i3(o4, t4, l3.keepUnlessDefault)) && a3.unshift(s3.value[0]);
        }
        return 0 === a3.length && a3.push([r3.PROPERTY_VALUE, t4[e4.name].defaultValue]), n3(a3) ? [a3[0]] : a3;
      } };
    }(), n2 = Rt(), o2 = { animation: { canOverride: r2.generic.components([r2.generic.time, r2.generic.timingFunction, r2.generic.time, r2.property.animationIterationCount, r2.property.animationDirection, r2.property.animationFillMode, r2.property.animationPlayState, r2.property.animationName]), components: ["animation-duration", "animation-timing-function", "animation-delay", "animation-iteration-count", "animation-direction", "animation-fill-mode", "animation-play-state", "animation-name"], breakUp: e2.multiplex(e2.animation), defaultValue: "none", restore: t2.multiplex(t2.withoutDefaults), shorthand: true, vendorPrefixes: ["-moz-", "-o-", "-webkit-"] }, "animation-delay": { canOverride: r2.generic.time, componentOf: ["animation"], defaultValue: "0s", intoMultiplexMode: "real", vendorPrefixes: ["-moz-", "-o-", "-webkit-"] }, "animation-direction": { canOverride: r2.property.animationDirection, componentOf: ["animation"], defaultValue: "normal", intoMultiplexMode: "real", vendorPrefixes: ["-moz-", "-o-", "-webkit-"] }, "animation-duration": { canOverride: r2.generic.time, componentOf: ["animation"], defaultValue: "0s", intoMultiplexMode: "real", keepUnlessDefault: "animation-delay", vendorPrefixes: ["-moz-", "-o-", "-webkit-"] }, "animation-fill-mode": { canOverride: r2.property.animationFillMode, componentOf: ["animation"], defaultValue: "none", intoMultiplexMode: "real", vendorPrefixes: ["-moz-", "-o-", "-webkit-"] }, "animation-iteration-count": { canOverride: r2.property.animationIterationCount, componentOf: ["animation"], defaultValue: "1", intoMultiplexMode: "real", vendorPrefixes: ["-moz-", "-o-", "-webkit-"] }, "animation-name": { canOverride: r2.property.animationName, componentOf: ["animation"], defaultValue: "none", intoMultiplexMode: "real", vendorPrefixes: ["-moz-", "-o-", "-webkit-"] }, "animation-play-state": { canOverride: r2.property.animationPlayState, componentOf: ["animation"], defaultValue: "running", intoMultiplexMode: "real", vendorPrefixes: ["-moz-", "-o-", "-webkit-"] }, "animation-timing-function": { canOverride: r2.generic.timingFunction, componentOf: ["animation"], defaultValue: "ease", intoMultiplexMode: "real", vendorPrefixes: ["-moz-", "-o-", "-webkit-"] }, background: { canOverride: r2.generic.components([r2.generic.image, r2.property.backgroundPosition, r2.property.backgroundSize, r2.property.backgroundRepeat, r2.property.backgroundAttachment, r2.property.backgroundOrigin, r2.property.backgroundClip, r2.generic.color]), components: ["background-image", "background-position", "background-size", "background-repeat", "background-attachment", "background-origin", "background-clip", "background-color"], breakUp: e2.multiplex(e2.background), defaultValue: "0 0", restore: t2.multiplex(t2.background), shortestValue: "0", shorthand: true }, "background-attachment": { canOverride: r2.property.backgroundAttachment, componentOf: ["background"], defaultValue: "scroll", intoMultiplexMode: "real" }, "background-clip": { canOverride: r2.property.backgroundClip, componentOf: ["background"], defaultValue: "border-box", intoMultiplexMode: "real", shortestValue: "border-box" }, "background-color": { canOverride: r2.generic.color, componentOf: ["background"], defaultValue: "transparent", intoMultiplexMode: "real", multiplexLastOnly: true, nonMergeableValue: "none", shortestValue: "red" }, "background-image": { canOverride: r2.generic.image, componentOf: ["background"], defaultValue: "none", intoMultiplexMode: "default" }, "background-origin": { canOverride: r2.property.backgroundOrigin, componentOf: ["background"], defaultValue: "padding-box", intoMultiplexMode: "real", shortestValue: "border-box" }, "background-position": { canOverride: r2.property.backgroundPosition, componentOf: ["background"], defaultValue: ["0", "0"], doubleValues: true, intoMultiplexMode: "real", shortestValue: "0" }, "background-repeat": { canOverride: r2.property.backgroundRepeat, componentOf: ["background"], defaultValue: ["repeat"], doubleValues: true, intoMultiplexMode: "real" }, "background-size": { canOverride: r2.property.backgroundSize, componentOf: ["background"], defaultValue: ["auto"], doubleValues: true, intoMultiplexMode: "real", shortestValue: "0 0" }, bottom: { canOverride: r2.property.bottom, defaultValue: "auto" }, border: { breakUp: e2.border, canOverride: r2.generic.components([r2.generic.unit, r2.property.borderStyle, r2.generic.color]), components: ["border-width", "border-style", "border-color"], defaultValue: "none", overridesShorthands: ["border-bottom", "border-left", "border-right", "border-top"], restore: t2.withoutDefaults, shorthand: true, shorthandComponents: true }, "border-bottom": { breakUp: e2.border, canOverride: r2.generic.components([r2.generic.unit, r2.property.borderStyle, r2.generic.color]), components: ["border-bottom-width", "border-bottom-style", "border-bottom-color"], defaultValue: "none", restore: t2.withoutDefaults, shorthand: true }, "border-bottom-color": { canOverride: r2.generic.color, componentOf: ["border-bottom", "border-color"], defaultValue: "none" }, "border-bottom-left-radius": { canOverride: r2.generic.unit, componentOf: ["border-radius"], defaultValue: "0", vendorPrefixes: ["-moz-", "-o-"] }, "border-bottom-right-radius": { canOverride: r2.generic.unit, componentOf: ["border-radius"], defaultValue: "0", vendorPrefixes: ["-moz-", "-o-"] }, "border-bottom-style": { canOverride: r2.property.borderStyle, componentOf: ["border-bottom", "border-style"], defaultValue: "none" }, "border-bottom-width": { canOverride: r2.generic.unit, componentOf: ["border-bottom", "border-width"], defaultValue: "medium", oppositeTo: "border-top-width", shortestValue: "0" }, "border-collapse": { canOverride: r2.property.borderCollapse, defaultValue: "separate" }, "border-color": { breakUp: e2.fourValues, canOverride: r2.generic.components([r2.generic.color, r2.generic.color, r2.generic.color, r2.generic.color]), componentOf: ["border"], components: ["border-top-color", "border-right-color", "border-bottom-color", "border-left-color"], defaultValue: "none", restore: t2.fourValues, shortestValue: "red", shorthand: true }, "border-left": { breakUp: e2.border, canOverride: r2.generic.components([r2.generic.unit, r2.property.borderStyle, r2.generic.color]), components: ["border-left-width", "border-left-style", "border-left-color"], defaultValue: "none", restore: t2.withoutDefaults, shorthand: true }, "border-left-color": { canOverride: r2.generic.color, componentOf: ["border-color", "border-left"], defaultValue: "none" }, "border-left-style": { canOverride: r2.property.borderStyle, componentOf: ["border-left", "border-style"], defaultValue: "none" }, "border-left-width": { canOverride: r2.generic.unit, componentOf: ["border-left", "border-width"], defaultValue: "medium", oppositeTo: "border-right-width", shortestValue: "0" }, "border-radius": { breakUp: e2.borderRadius, canOverride: r2.generic.components([r2.generic.unit, r2.generic.unit, r2.generic.unit, r2.generic.unit]), components: ["border-top-left-radius", "border-top-right-radius", "border-bottom-right-radius", "border-bottom-left-radius"], defaultValue: "0", restore: t2.borderRadius, shorthand: true, vendorPrefixes: ["-moz-", "-o-"] }, "border-right": { breakUp: e2.border, canOverride: r2.generic.components([r2.generic.unit, r2.property.borderStyle, r2.generic.color]), components: ["border-right-width", "border-right-style", "border-right-color"], defaultValue: "none", restore: t2.withoutDefaults, shorthand: true }, "border-right-color": { canOverride: r2.generic.color, componentOf: ["border-color", "border-right"], defaultValue: "none" }, "border-right-style": { canOverride: r2.property.borderStyle, componentOf: ["border-right", "border-style"], defaultValue: "none" }, "border-right-width": { canOverride: r2.generic.unit, componentOf: ["border-right", "border-width"], defaultValue: "medium", oppositeTo: "border-left-width", shortestValue: "0" }, "border-style": { breakUp: e2.fourValues, canOverride: r2.generic.components([r2.property.borderStyle, r2.property.borderStyle, r2.property.borderStyle, r2.property.borderStyle]), componentOf: ["border"], components: ["border-top-style", "border-right-style", "border-bottom-style", "border-left-style"], defaultValue: "none", restore: t2.fourValues, shorthand: true }, "border-top": { breakUp: e2.border, canOverride: r2.generic.components([r2.generic.unit, r2.property.borderStyle, r2.generic.color]), components: ["border-top-width", "border-top-style", "border-top-color"], defaultValue: "none", restore: t2.withoutDefaults, shorthand: true }, "border-top-color": { canOverride: r2.generic.color, componentOf: ["border-color", "border-top"], defaultValue: "none" }, "border-top-left-radius": { canOverride: r2.generic.unit, componentOf: ["border-radius"], defaultValue: "0", vendorPrefixes: ["-moz-", "-o-"] }, "border-top-right-radius": { canOverride: r2.generic.unit, componentOf: ["border-radius"], defaultValue: "0", vendorPrefixes: ["-moz-", "-o-"] }, "border-top-style": { canOverride: r2.property.borderStyle, componentOf: ["border-style", "border-top"], defaultValue: "none" }, "border-top-width": { canOverride: r2.generic.unit, componentOf: ["border-top", "border-width"], defaultValue: "medium", oppositeTo: "border-bottom-width", shortestValue: "0" }, "border-width": { breakUp: e2.fourValues, canOverride: r2.generic.components([r2.generic.unit, r2.generic.unit, r2.generic.unit, r2.generic.unit]), componentOf: ["border"], components: ["border-top-width", "border-right-width", "border-bottom-width", "border-left-width"], defaultValue: "medium", restore: t2.fourValues, shortestValue: "0", shorthand: true }, clear: { canOverride: r2.property.clear, defaultValue: "none" }, color: { canOverride: r2.generic.color, defaultValue: "transparent", shortestValue: "red" }, cursor: { canOverride: r2.property.cursor, defaultValue: "auto" }, display: { canOverride: r2.property.display }, float: { canOverride: r2.property.float, defaultValue: "none" }, font: { breakUp: e2.font, canOverride: r2.generic.components([r2.property.fontStyle, r2.property.fontVariant, r2.property.fontWeight, r2.property.fontStretch, r2.generic.unit, r2.generic.unit, r2.property.fontFamily]), components: ["font-style", "font-variant", "font-weight", "font-stretch", "font-size", "line-height", "font-family"], restore: t2.font, shorthand: true }, "font-family": { canOverride: r2.property.fontFamily, defaultValue: "user|agent|specific" }, "font-size": { canOverride: r2.generic.unit, defaultValue: "medium", shortestValue: "0" }, "font-stretch": { canOverride: r2.property.fontStretch, defaultValue: "normal" }, "font-style": { canOverride: r2.property.fontStyle, defaultValue: "normal" }, "font-variant": { canOverride: r2.property.fontVariant, defaultValue: "normal" }, "font-weight": { canOverride: r2.property.fontWeight, defaultValue: "normal", shortestValue: "400" }, height: { canOverride: r2.generic.unit, defaultValue: "auto", shortestValue: "0" }, left: { canOverride: r2.property.left, defaultValue: "auto" }, "line-height": { canOverride: r2.generic.unitOrNumber, defaultValue: "normal", shortestValue: "0" }, "list-style": { canOverride: r2.generic.components([r2.property.listStyleType, r2.property.listStylePosition, r2.property.listStyleImage]), components: ["list-style-type", "list-style-position", "list-style-image"], breakUp: e2.listStyle, restore: t2.withoutDefaults, defaultValue: "outside", shortestValue: "none", shorthand: true }, "list-style-image": { canOverride: r2.generic.image, componentOf: ["list-style"], defaultValue: "none" }, "list-style-position": { canOverride: r2.property.listStylePosition, componentOf: ["list-style"], defaultValue: "outside", shortestValue: "inside" }, "list-style-type": { canOverride: r2.property.listStyleType, componentOf: ["list-style"], defaultValue: "decimal|disc", shortestValue: "none" }, margin: { breakUp: e2.fourValues, canOverride: r2.generic.components([r2.generic.unit, r2.generic.unit, r2.generic.unit, r2.generic.unit]), components: ["margin-top", "margin-right", "margin-bottom", "margin-left"], defaultValue: "0", restore: t2.fourValues, shorthand: true }, "margin-bottom": { canOverride: r2.generic.unit, componentOf: ["margin"], defaultValue: "0", oppositeTo: "margin-top" }, "margin-left": { canOverride: r2.generic.unit, componentOf: ["margin"], defaultValue: "0", oppositeTo: "margin-right" }, "margin-right": { canOverride: r2.generic.unit, componentOf: ["margin"], defaultValue: "0", oppositeTo: "margin-left" }, "margin-top": { canOverride: r2.generic.unit, componentOf: ["margin"], defaultValue: "0", oppositeTo: "margin-bottom" }, outline: { canOverride: r2.generic.components([r2.generic.color, r2.property.outlineStyle, r2.generic.unit]), components: ["outline-color", "outline-style", "outline-width"], breakUp: e2.outline, restore: t2.withoutDefaults, defaultValue: "0", shorthand: true }, "outline-color": { canOverride: r2.generic.color, componentOf: ["outline"], defaultValue: "invert", shortestValue: "red" }, "outline-style": { canOverride: r2.property.outlineStyle, componentOf: ["outline"], defaultValue: "none" }, "outline-width": { canOverride: r2.generic.unit, componentOf: ["outline"], defaultValue: "medium", shortestValue: "0" }, overflow: { canOverride: r2.property.overflow, defaultValue: "visible" }, "overflow-x": { canOverride: r2.property.overflow, defaultValue: "visible" }, "overflow-y": { canOverride: r2.property.overflow, defaultValue: "visible" }, padding: { breakUp: e2.fourValues, canOverride: r2.generic.components([r2.generic.unit, r2.generic.unit, r2.generic.unit, r2.generic.unit]), components: ["padding-top", "padding-right", "padding-bottom", "padding-left"], defaultValue: "0", restore: t2.fourValues, shorthand: true }, "padding-bottom": { canOverride: r2.generic.unit, componentOf: ["padding"], defaultValue: "0", oppositeTo: "padding-top" }, "padding-left": { canOverride: r2.generic.unit, componentOf: ["padding"], defaultValue: "0", oppositeTo: "padding-right" }, "padding-right": { canOverride: r2.generic.unit, componentOf: ["padding"], defaultValue: "0", oppositeTo: "padding-left" }, "padding-top": { canOverride: r2.generic.unit, componentOf: ["padding"], defaultValue: "0", oppositeTo: "padding-bottom" }, position: { canOverride: r2.property.position, defaultValue: "static" }, right: { canOverride: r2.property.right, defaultValue: "auto" }, "text-align": { canOverride: r2.property.textAlign, defaultValue: "left|right" }, "text-decoration": { canOverride: r2.property.textDecoration, defaultValue: "none" }, "text-overflow": { canOverride: r2.property.textOverflow, defaultValue: "none" }, "text-shadow": { canOverride: r2.property.textShadow, defaultValue: "none" }, top: { canOverride: r2.property.top, defaultValue: "auto" }, transform: { canOverride: r2.property.transform, vendorPrefixes: ["-moz-", "-ms-", "-webkit-"] }, transition: { breakUp: e2.multiplex(e2.transition), canOverride: r2.generic.components([r2.property.transitionProperty, r2.generic.time, r2.generic.timingFunction, r2.generic.time]), components: ["transition-property", "transition-duration", "transition-timing-function", "transition-delay"], defaultValue: "none", restore: t2.multiplex(t2.withoutDefaults), shorthand: true, vendorPrefixes: ["-moz-", "-o-", "-webkit-"] }, "transition-delay": { canOverride: r2.generic.time, componentOf: ["transition"], defaultValue: "0s", intoMultiplexMode: "real", vendorPrefixes: ["-moz-", "-o-", "-webkit-"] }, "transition-duration": { canOverride: r2.generic.time, componentOf: ["transition"], defaultValue: "0s", intoMultiplexMode: "real", vendorPrefixes: ["-moz-", "-o-", "-webkit-"] }, "transition-property": { canOverride: r2.generic.propertyName, componentOf: ["transition"], defaultValue: "all", intoMultiplexMode: "placeholder", placeholderValue: "_", vendorPrefixes: ["-moz-", "-o-", "-webkit-"] }, "transition-timing-function": { canOverride: r2.generic.timingFunction, componentOf: ["transition"], defaultValue: "ease", intoMultiplexMode: "real", vendorPrefixes: ["-moz-", "-o-", "-webkit-"] }, "vertical-align": { canOverride: r2.property.verticalAlign, defaultValue: "baseline" }, visibility: { canOverride: r2.property.visibility, defaultValue: "visible" }, "white-space": { canOverride: r2.property.whiteSpace, defaultValue: "normal" }, width: { canOverride: r2.generic.unit, defaultValue: "auto", shortestValue: "0" }, "z-index": { canOverride: r2.property.zIndex, defaultValue: "auto" } };
    function i2(e3, r3) {
      var t3 = n2(o2[e3], {});
      return "componentOf" in t3 && (t3.componentOf = t3.componentOf.map(function(e4) {
        return r3 + e4;
      })), "components" in t3 && (t3.components = t3.components.map(function(e4) {
        return r3 + e4;
      })), "keepUnlessDefault" in t3 && (t3.keepUnlessDefault = r3 + t3.keepUnlessDefault), t3;
    }
    var a2 = {};
    for (var u2 in o2) {
      var s2 = o2[u2];
      if ("vendorPrefixes" in s2) {
        for (var l2 = 0; l2 < s2.vendorPrefixes.length; l2++) {
          var c2 = s2.vendorPrefixes[l2], p2 = i2(u2, c2);
          delete p2.vendorPrefixes, a2[c2 + u2] = p2;
        }
        delete s2.vendorPrefixes;
      }
    }
    return Xe = n2(o2, a2);
  }
  function Zt() {
    if (tr) return rr;
    tr = 1;
    var e2 = Qt(), r2 = Gt();
    return rr = function(t2, n2, o2) {
      for (var i2, a2, u2, s2 = t2.length - 1; s2 >= 0; s2--) {
        var l2 = t2[s2], c2 = e2[l2.name];
        if (c2 && c2.shorthand) {
          l2.shorthand = true, l2.dirty = true;
          try {
            if (l2.components = c2.breakUp(l2, e2, n2), c2.shorthandComponents) for (a2 = 0, u2 = l2.components.length; a2 < u2; a2++) (i2 = l2.components[a2]).components = e2[i2.name].breakUp(i2, e2, n2);
          } catch (p2) {
            if (!(p2 instanceof r2)) throw p2;
            l2.components = [], o2.push(p2.message);
          }
          l2.components.length > 0 ? l2.multiplex = l2.components[0].multiplex : l2.unused = true;
        }
      }
    };
  }
  function Jt() {
    if (or) return nr;
    or = 1;
    var e2 = Qt();
    return nr = function(r2) {
      var t2 = e2[r2.name];
      return t2 && t2.shorthand ? t2.restore(r2, e2) : r2.value;
    };
  }
  function Xt() {
    if (ar) return ir;
    ar = 1;
    var e2 = Kt(), r2 = zt(), t2 = Zt(), n2 = Qt(), o2 = Wt().deep, i2 = Jt(), a2 = qt(), u2 = Nt().single, s2 = It().body, l2 = Pt();
    function c2(e3, r3, t3, o3) {
      var i3, a3, u3, s3 = e3[r3];
      for (i3 in t3) void 0 !== s3 && i3 == s3.name || (a3 = n2[i3], u3 = t3[i3], s3 && p2(t3, i3, s3) ? delete t3[i3] : a3.components.length > Object.keys(u3).length || f2(u3) || d2(u3, i3, o3) && m2(u3) && (g2(u3) ? h2(e3, u3, i3, o3) : A2(e3, u3, i3, o3)));
    }
    function p2(e3, r3, t3) {
      var o3, i3 = n2[r3], a3 = n2[t3.name];
      if ("overridesShorthands" in i3 && i3.overridesShorthands.indexOf(t3.name) > -1) return true;
      if (a3 && "componentOf" in a3) {
        for (o3 in e3[r3]) if (a3.componentOf.indexOf(o3) > -1) return true;
      }
      return false;
    }
    function f2(e3) {
      var r3, t3;
      for (t3 in e3) {
        if (void 0 !== r3 && e3[t3].important != r3) return true;
        r3 = e3[t3].important;
      }
      return false;
    }
    function d2(r3, o3, i3) {
      var a3, s3, c3, p3, f3 = n2[o3], d3 = [l2.PROPERTY, [l2.PROPERTY_NAME, o3], [l2.PROPERTY_VALUE, f3.defaultValue]], m3 = u2(d3);
      for (t2([m3], i3, []), c3 = 0, p3 = f3.components.length; c3 < p3; c3++) if (a3 = r3[f3.components[c3]], s3 = n2[a3.name].canOverride, !e2(s3.bind(null, i3), m3.components[c3], a3)) return false;
      return true;
    }
    function m2(e3) {
      var r3, t3, o3, u3, s3 = null;
      for (t3 in e3) if (o3 = e3[t3], "restore" in (u3 = n2[t3])) {
        if (a2([o3.all[o3.position]], i2), r3 = u3.restore(o3, n2).length, null !== s3 && r3 !== s3) return false;
        s3 = r3;
      }
      return true;
    }
    function g2(e3) {
      var t3, n3, o3 = null;
      for (t3 in e3) {
        if (n3 = r2(e3[t3]), null !== o3 && o3 !== n3) return true;
        o3 = n3;
      }
      return false;
    }
    function h2(e3, c3, p3, f3) {
      var d3, m3, g3, h3, y3 = function(e4, s3, c4) {
        var p4, f4, d4, m4, g4, h4, y4 = [], E3 = {}, A4 = {}, w3 = n2[s3], O3 = [l2.PROPERTY, [l2.PROPERTY_NAME, s3], [l2.PROPERTY_VALUE, w3.defaultValue]], C3 = u2(O3);
        for (t2([C3], c4, []), g4 = 0, h4 = w3.components.length; g4 < h4; g4++) p4 = e4[w3.components[g4]], r2(p4) ? (f4 = p4.all[p4.position].slice(0, 2), Array.prototype.push.apply(f4, p4.value), y4.push(f4), (d4 = o2(p4)).value = v2(e4, d4.name), C3.components[g4] = d4, E3[p4.name] = o2(p4)) : ((d4 = o2(p4)).all = p4.all, C3.components[g4] = d4, A4[p4.name] = p4);
        return m4 = b2(A4, 1), O3[1].push(m4), a2([C3], i2), O3 = O3.slice(0, 2), Array.prototype.push.apply(O3, C3.value), y4.unshift(O3), [y4, C3, E3];
      }(c3, p3, f3), A3 = function(e4, i3, a3) {
        var s3, c4, p4, f4, d4, m4, g4 = [], h4 = {}, v3 = {}, y4 = n2[i3], E3 = [l2.PROPERTY, [l2.PROPERTY_NAME, i3], [l2.PROPERTY_VALUE, "inherit"]], A4 = u2(E3);
        for (t2([A4], a3, []), d4 = 0, m4 = y4.components.length; d4 < m4; d4++) s3 = e4[y4.components[d4]], r2(s3) ? h4[s3.name] = s3 : (c4 = s3.all[s3.position].slice(0, 2), Array.prototype.push.apply(c4, s3.value), g4.push(c4), v3[s3.name] = o2(s3));
        return p4 = b2(h4, 1), E3[1].push(p4), f4 = b2(h4, 2), E3[2].push(f4), g4.unshift(E3), [g4, A4, v3];
      }(c3, p3, f3), w2 = y3[0], O2 = A3[0], C2 = s2(w2).length < s2(O2).length, x2 = C2 ? w2 : O2, S2 = C2 ? y3[1] : A3[1], R2 = C2 ? y3[2] : A3[2], k2 = c3[Object.keys(c3)[0]].all;
      for (d3 in S2.position = k2.length, S2.shorthand = true, S2.dirty = true, S2.all = k2, S2.all.push(x2[0]), e3.push(S2), c3) (m3 = c3[d3]).unused = true, m3.name in R2 && (g3 = R2[m3.name], h3 = E2(x2, d3), g3.position = k2.length, g3.all = k2, g3.all.push(h3), e3.push(g3));
    }
    function v2(e3, r3) {
      var t3 = n2[r3];
      return "oppositeTo" in t3 ? e3[t3.oppositeTo].value : [[l2.PROPERTY_VALUE, t3.defaultValue]];
    }
    function b2(e3, r3) {
      var t3, n3, o3, i3, a3 = [];
      for (i3 in e3) o3 = (n3 = (t3 = e3[i3]).all[t3.position])[r3][n3[r3].length - 1], Array.prototype.push.apply(a3, o3);
      return a3.sort(y2);
    }
    function y2(e3, r3) {
      var t3 = e3[0], n3 = r3[0], o3 = e3[1], i3 = r3[1];
      return t3 < n3 || t3 === n3 && o3 < i3 ? -1 : 1;
    }
    function E2(e3, r3) {
      var t3, n3;
      for (t3 = 0, n3 = e3.length; t3 < n3; t3++) if (e3[t3][1][1] == r3) return e3[t3];
    }
    function A2(e3, r3, i3, a3) {
      var s3, c3, p3, f3 = n2[i3], d3 = [l2.PROPERTY, [l2.PROPERTY_NAME, i3], [l2.PROPERTY_VALUE, f3.defaultValue]], m3 = u2(d3);
      m3.shorthand = true, m3.dirty = true, t2([m3], a3, []);
      for (var g3 = 0, h3 = f3.components.length; g3 < h3; g3++) {
        var v3 = r3[f3.components[g3]];
        m3.components[g3] = o2(v3), m3.important = v3.important, p3 = v3.all;
      }
      for (var y3 in r3) r3[y3].unused = true;
      s3 = b2(r3, 1), d3[1].push(s3), c3 = b2(r3, 2), d3[2].push(c3), m3.position = p3.length, m3.all = p3, m3.all.push(d3), e3.push(m3);
    }
    return ir = function(e3, r3) {
      var t3, o3, i3, a3, u3, s3, l3, p3 = {};
      if (!(e3.length < 3)) {
        for (a3 = 0, u3 = e3.length; a3 < u3; a3++) if (i3 = e3[a3], t3 = n2[i3.name], !i3.unused && !i3.hack && !i3.block && (c2(e3, a3, p3, r3), t3 && t3.componentOf)) for (s3 = 0, l3 = t3.componentOf.length; s3 < l3; s3++) p3[o3 = t3.componentOf[s3]] = p3[o3] || {}, p3[o3][i3.name] = i3;
        c2(e3, a3, p3, r3);
      }
    };
  }
  function en() {
    if (sr) return ur;
    sr = 1;
    var e2 = Qt();
    function r2(e3, r3) {
      return e3.components.filter(r3)[0];
    }
    return ur = function(t2, n2) {
      var o2, i2 = (o2 = n2, function(e3) {
        return o2.name === e3.name;
      });
      return r2(t2, i2) || function(t3, n3) {
        var o3, i3, a2;
        if (!e2[t3.name].shorthandComponents) return;
        for (i3 = 0, a2 = t3.components.length; i3 < a2; i3++) if (o3 = r2(t3.components[i3], n3)) return o3;
        return;
      }(t2, i2);
    };
  }
  function rn() {
    if (cr) return lr;
    cr = 1;
    var e2 = Qt();
    function r2(r3, t2) {
      var n2 = e2[r3.name];
      return "components" in n2 && n2.components.indexOf(t2.name) > -1;
    }
    return lr = function(t2, n2, o2) {
      return r2(t2, n2) || !o2 && !!e2[t2.name].shorthandComponents && function(e3, t3) {
        return e3.components.some(function(e4) {
          return r2(e4, t3);
        });
      }(t2, n2);
    };
  }
  function tn() {
    if (hr) return gr;
    hr = 1;
    var e2 = zt(), r2 = Kt(), t2 = en(), n2 = rn(), o2 = function() {
      if (fr) return pr;
      fr = 1;
      var e3 = Tt();
      return pr = function(r3) {
        return "font" != r3.name || -1 == r3.value[0][1].indexOf(e3.INTERNAL);
      };
    }(), i2 = function() {
      if (mr) return dr;
      mr = 1;
      var e3 = Qt();
      return dr = function(r3, t3) {
        return r3.name in e3 && "overridesShorthands" in e3[r3.name] && e3[r3.name].overridesShorthands.indexOf(t3.name) > -1;
      };
    }(), a2 = Ht().same, u2 = Qt(), s2 = Wt().deep, l2 = Jt(), c2 = Wt().shallow, p2 = qt(), f2 = Pt(), d2 = Tt(), m2 = It().property;
    function g2(e3, t3) {
      for (var n3 = 0; n3 < e3.components.length; n3++) {
        var o3 = e3.components[n3], i3 = u2[o3.name], a3 = i3 && i3.canOverride || a3.sameValue, s3 = c2(o3);
        if (s3.value = [[f2.PROPERTY_VALUE, i3.defaultValue]], !r2(a3.bind(null, t3), s3, o3)) return true;
      }
      return false;
    }
    function h2(e3, r3) {
      r3.unused = true, E2(r3, w2(e3)), e3.value = r3.value;
    }
    function v2(e3, r3) {
      r3.unused = true, e3.multiplex = true, e3.value = r3.value;
    }
    function b2(e3, r3) {
      r3.multiplex ? v2(e3, r3) : e3.multiplex ? h2(e3, r3) : function(e4, r4) {
        r4.unused = true, e4.value = r4.value;
      }(e3, r3);
    }
    function y2(e3, r3) {
      r3.unused = true;
      for (var t3 = 0, n3 = e3.components.length; t3 < n3; t3++) b2(e3.components[t3], r3.components[t3], e3.multiplex);
    }
    function E2(e3, r3) {
      e3.multiplex = true, u2[e3.name].shorthand ? function(e4, r4) {
        var t3, n3, o3;
        for (n3 = 0, o3 = e4.components.length; n3 < o3; n3++) (t3 = e4.components[n3]).multiplex || A2(t3, r4);
      }(e3, r3) : A2(e3, r3);
    }
    function A2(e3, r3) {
      for (var t3, n3 = u2[e3.name], o3 = "real" == n3.intoMultiplexMode, i3 = "real" == n3.intoMultiplexMode ? e3.value.slice(0) : "placeholder" == n3.intoMultiplexMode ? n3.placeholderValue : n3.defaultValue, a3 = w2(e3), s3 = i3.length; a3 < r3; a3++) if (e3.value.push([f2.PROPERTY_VALUE, d2.COMMA]), Array.isArray(i3)) for (t3 = 0; t3 < s3; t3++) e3.value.push(o3 ? i3[t3] : [f2.PROPERTY_VALUE, i3[t3]]);
      else e3.value.push(o3 ? i3 : [f2.PROPERTY_VALUE, i3]);
    }
    function w2(e3) {
      for (var r3 = 0, t3 = 0, n3 = e3.value.length; t3 < n3; t3++) e3.value[t3][1] == d2.COMMA && r3++;
      return r3 + 1;
    }
    function O2(e3) {
      var r3 = [f2.PROPERTY, [f2.PROPERTY_NAME, e3.name]].concat(e3.value);
      return m2([r3], 0).length;
    }
    function C2(e3, r3, t3) {
      for (var n3 = 0, o3 = r3; o3 >= 0 && (e3[o3].name != t3 || e3[o3].unused || n3++, !(n3 > 1)); o3--) ;
      return n3 > 1;
    }
    function x2(e3, r3) {
      for (var t3 = 0, n3 = e3.components.length; t3 < n3; t3++) if (!S2(r3.isUrl, e3.components[t3]) && S2(r3.isFunction, e3.components[t3])) return true;
      return false;
    }
    function S2(e3, r3) {
      for (var t3 = 0, n3 = r3.value.length; t3 < n3; t3++) if (r3.value[t3][1] != d2.COMMA && e3(r3.value[t3][1])) return true;
      return false;
    }
    function R2(e3, r3) {
      if (!e3.multiplex && !r3.multiplex || e3.multiplex && r3.multiplex) return false;
      var n3, o3 = e3.multiplex ? e3 : r3, i3 = e3.multiplex ? r3 : e3, a3 = s2(o3);
      p2([a3], l2);
      var u3 = s2(i3);
      p2([u3], l2);
      var c3 = O2(a3) + 1 + O2(u3);
      return e3.multiplex ? h2(n3 = t2(a3, u3), u3) : (n3 = t2(u3, a3), E2(u3, w2(a3)), v2(n3, a3)), p2([u3], l2), c3 <= O2(u3);
    }
    function k2(e3) {
      return e3.name in u2;
    }
    function T2(e3, r3) {
      return !e3.multiplex && ("background" == e3.name || "background-image" == e3.name) && r3.multiplex && ("background" == r3.name || "background-image" == r3.name) && function(e4) {
        for (var r4 = function(e5) {
          for (var r5 = [], t4 = 0, n4 = [], o3 = e5.length; t4 < o3; t4++) {
            var i3 = e5[t4];
            i3[1] == d2.COMMA ? (r5.push(n4), n4 = []) : n4.push(i3);
          }
          return r5.push(n4), r5;
        }(e4), t3 = 0, n3 = r4.length; t3 < n3; t3++) if (1 == r4[t3].length && "none" == r4[t3][0][1]) return true;
        return false;
      }(r3.value);
    }
    return gr = function(s3, l3, c3, p3) {
      var f3, d3, m3, h3, v3, A3, O3, L2, D2, _2, B2;
      e: for (D2 = s3.length - 1; D2 >= 0; D2--) if (k2(d3 = s3[D2]) && !d3.block) {
        f3 = u2[d3.name].canOverride;
        r: for (_2 = D2 - 1; _2 >= 0; _2--) if (k2(m3 = s3[_2]) && !m3.block && !m3.unused && !d3.unused && (!m3.hack || d3.hack || d3.important) && (m3.hack || m3.important || !d3.hack) && (m3.important != d3.important || m3.hack[0] == d3.hack[0]) && !(m3.important == d3.important && (m3.hack[0] != d3.hack[0] || m3.hack[1] && m3.hack[1] != d3.hack[1]) || e2(d3) || T2(m3, d3))) {
          if (d3.shorthand && n2(d3, m3)) {
            if (!d3.important && m3.important) continue;
            if (!a2([m3], d3.components)) continue;
            if (!S2(p3.isFunction, m3) && x2(d3, p3)) continue;
            if (!o2(d3)) {
              m3.unused = true;
              continue;
            }
            h3 = t2(d3, m3), f3 = u2[m3.name].canOverride, r2(f3.bind(null, p3), m3, h3) && (m3.unused = true);
          } else if (d3.shorthand && i2(d3, m3)) {
            if (!d3.important && m3.important) continue;
            if (!a2([m3], d3.components)) continue;
            if (!S2(p3.isFunction, m3) && x2(d3, p3)) continue;
            for (B2 = (v3 = m3.shorthand ? m3.components : [m3]).length - 1; B2 >= 0; B2--) if (A3 = v3[B2], O3 = t2(d3, A3), f3 = u2[A3.name].canOverride, !r2(f3.bind(null, p3), m3, O3)) continue r;
            m3.unused = true;
          } else if (l3 && m3.shorthand && !d3.shorthand && n2(m3, d3, true)) {
            if (d3.important && !m3.important) continue;
            if (!d3.important && m3.important) {
              d3.unused = true;
              continue;
            }
            if (C2(s3, D2 - 1, m3.name)) continue;
            if (x2(m3, p3)) continue;
            if (!o2(m3)) continue;
            if (h3 = t2(m3, d3), r2(f3.bind(null, p3), h3, d3)) {
              var q2 = !c3.properties.backgroundClipMerging && h3.name.indexOf("background-clip") > -1 || !c3.properties.backgroundOriginMerging && h3.name.indexOf("background-origin") > -1 || !c3.properties.backgroundSizeMerging && h3.name.indexOf("background-size") > -1, P2 = u2[d3.name].nonMergeableValue === d3.value[0][1];
              if (q2 || P2) continue;
              if (!c3.properties.merging && g2(m3, p3)) continue;
              if (h3.value[0][1] != d3.value[0][1] && (e2(m3) || e2(d3))) continue;
              if (R2(m3, d3)) continue;
              !m3.multiplex && d3.multiplex && E2(m3, w2(d3)), b2(h3, d3), m3.dirty = true;
            }
          } else if (l3 && m3.shorthand && d3.shorthand && m3.name == d3.name) {
            if (!m3.multiplex && d3.multiplex) continue;
            if (!d3.important && m3.important) {
              d3.unused = true;
              continue e;
            }
            if (d3.important && !m3.important) {
              m3.unused = true;
              continue;
            }
            if (!o2(d3)) {
              m3.unused = true;
              continue;
            }
            for (B2 = m3.components.length - 1; B2 >= 0; B2--) {
              var N2 = m3.components[B2], U2 = d3.components[B2];
              if (f3 = u2[N2.name].canOverride, !r2(f3.bind(null, p3), N2, U2)) continue e;
            }
            y2(m3, d3), m3.dirty = true;
          } else if (l3 && m3.shorthand && d3.shorthand && n2(m3, d3)) {
            if (!m3.important && d3.important) continue;
            if (h3 = t2(m3, d3), f3 = u2[d3.name].canOverride, !r2(f3.bind(null, p3), h3, d3)) continue;
            if (m3.important && !d3.important) {
              d3.unused = true;
              continue;
            }
            if (u2[d3.name].restore(d3, u2).length > 1) continue;
            b2(h3 = t2(m3, d3), d3), d3.dirty = true;
          } else if (m3.name == d3.name) {
            if (L2 = true, d3.shorthand) for (B2 = d3.components.length - 1; B2 >= 0 && L2; B2--) A3 = m3.components[B2], O3 = d3.components[B2], f3 = u2[O3.name].canOverride, L2 = L2 && r2(f3.bind(null, p3), A3, O3);
            else f3 = u2[d3.name].canOverride, L2 = r2(f3.bind(null, p3), m3, d3);
            if (m3.important && !d3.important && L2) {
              d3.unused = true;
              continue;
            }
            if (!m3.important && d3.important && L2) {
              m3.unused = true;
              continue;
            }
            if (!L2) continue;
            m3.unused = true;
          }
        }
      }
    };
  }
  function nn() {
    if (br) return vr;
    br = 1;
    var e2 = Xt(), r2 = tn(), t2 = Zt(), n2 = Jt(), o2 = Nt().all, i2 = Bt(), a2 = qt(), u2 = Ft().OptimizationLevel;
    return vr = function s2(l2, c2, p2, f2) {
      var d2, m2, g2, h2 = f2.options.level[u2.Two], v2 = o2(l2, false, h2.skipProperties);
      for (t2(v2, f2.validator, f2.warnings), m2 = 0, g2 = v2.length; m2 < g2; m2++) (d2 = v2[m2]).block && s2(d2.value[0][1], c2, p2, f2);
      p2 && h2.mergeIntoShorthands && e2(v2, f2.validator), c2 && h2.overrideProperties && r2(v2, p2, f2.options.compatibility, f2.validator), a2(v2, n2), i2(v2);
    }, vr;
  }
  function on() {
    if (wr) return Ar;
    wr = 1;
    var e2 = /\-\-.+$/;
    function r2(r3) {
      return r3.replace(e2, "");
    }
    return Ar = function(e3, t2, n2) {
      var o2, i2, a2, u2, s2, l2;
      for (a2 = 0, u2 = e3.length; a2 < u2; a2++) for (o2 = e3[a2][1], s2 = 0, l2 = t2.length; s2 < l2; s2++) {
        if (o2 == (i2 = t2[s2][1])) return true;
        if (n2 && r2(o2) == r2(i2)) return true;
      }
      return false;
    };
  }
  function an() {
    if (Sr) return xr;
    Sr = 1;
    var e2 = function() {
      if (Cr) return Or;
      Cr = 1;
      var e3 = Tt(), r3 = ".", t2 = "#", n2 = ":", o2 = /[a-zA-Z]/, i2 = /[\s,\(>~\+]/;
      function a2(e4, r4) {
        return e4.indexOf(":not(", r4) === r4;
      }
      return Or = function(u2) {
        var s2, l2, c2, p2, f2, d2, m2, g2 = [0, 0, 0], h2 = 0, v2 = false, b2 = false;
        for (d2 = 0, m2 = u2.length; d2 < m2; d2++) {
          if (s2 = u2[d2], l2) ;
          else if (s2 != e3.SINGLE_QUOTE || p2 || c2) if (s2 == e3.SINGLE_QUOTE && !p2 && c2) c2 = false;
          else if (s2 != e3.DOUBLE_QUOTE || p2 || c2) if (s2 == e3.DOUBLE_QUOTE && p2 && !c2) p2 = false;
          else {
            if (c2 || p2) continue;
            h2 > 0 && !v2 || (s2 == e3.OPEN_ROUND_BRACKET ? h2++ : s2 == e3.CLOSE_ROUND_BRACKET && 1 == h2 ? (h2--, v2 = false) : s2 == e3.CLOSE_ROUND_BRACKET ? h2-- : s2 == t2 ? g2[0]++ : s2 == r3 || s2 == e3.OPEN_SQUARE_BRACKET ? g2[1]++ : s2 != n2 || b2 || a2(u2, d2) ? s2 == n2 ? v2 = true : (0 === d2 || f2) && o2.test(s2) && g2[2]++ : (g2[1]++, v2 = false));
          }
          else p2 = true;
          else c2 = true;
          l2 = s2 == e3.BACK_SLASH, b2 = s2 == n2, f2 = !l2 && i2.test(s2);
        }
        return g2;
      };
    }();
    function r2(r3, t2) {
      var n2;
      return r3 in t2 || (t2[r3] = n2 = e2(r3)), n2 || t2[r3];
    }
    return xr = function(e3, t2, n2) {
      var o2, i2, a2, u2, s2, l2;
      for (a2 = 0, u2 = e3.length; a2 < u2; a2++) for (o2 = r2(e3[a2][1], n2), s2 = 0, l2 = t2.length; s2 < l2; s2++) if (i2 = r2(t2[s2][1], n2), o2[0] === i2[0] && o2[1] === i2[1] && o2[2] === i2[2]) return true;
      return false;
    };
  }
  function un() {
    if (kr) return Rr;
    kr = 1;
    var e2 = on(), r2 = an(), t2 = /align\-items|box\-align|box\-pack|flex|justify/, n2 = /^border\-(top|right|bottom|left|color|style|width|radius)/;
    function o2(o3, p2, f2) {
      var d2, m2, g2 = o3[0], h2 = o3[1], v2 = o3[2], b2 = o3[5], y2 = o3[6], E2 = p2[0], A2 = p2[1], w2 = p2[2], O2 = p2[5], C2 = p2[6];
      return !("font" == g2 && "line-height" == E2 || "font" == E2 && "line-height" == g2) && ((!t2.test(g2) || !t2.test(E2)) && (!(v2 == w2 && a2(g2) == a2(E2) && i2(g2) ^ i2(E2)) && (("border" != v2 || !n2.test(w2) || !("border" == g2 || g2 == w2 || h2 != A2 && u2(g2, E2))) && (("border" != w2 || !n2.test(v2) || !("border" == E2 || E2 == v2 || h2 != A2 && u2(g2, E2))) && (("border" != v2 || "border" != w2 || g2 == E2 || !(s2(g2) && l2(E2) || l2(g2) && s2(E2))) && (v2 != w2 || (!(g2 != E2 || v2 != w2 || h2 != A2 && (d2 = h2, m2 = A2, !i2(d2) || !i2(m2) || d2.split("-")[1] == m2.split("-")[2])) || (g2 != E2 && v2 == w2 && g2 != v2 && E2 != w2 || (g2 != E2 && v2 == w2 && h2 == A2 || (!(!C2 || !y2 || c2(v2) || c2(w2) || e2(O2, b2, false)) || !r2(b2, O2, f2)))))))))));
    }
    function i2(e3) {
      return /^\-(?:moz|webkit|ms|o)\-/.test(e3);
    }
    function a2(e3) {
      return e3.replace(/^\-(?:moz|webkit|ms|o)\-/, "");
    }
    function u2(e3, r3) {
      return e3.split("-").pop() == r3.split("-").pop();
    }
    function s2(e3) {
      return "border-top" == e3 || "border-right" == e3 || "border-bottom" == e3 || "border-left" == e3;
    }
    function l2(e3) {
      return "border-color" == e3 || "border-style" == e3 || "border-width" == e3;
    }
    function c2(e3) {
      return "font" == e3 || "line-height" == e3 || "list-style" == e3;
    }
    return Rr = { canReorder: function(e3, r3, t3) {
      for (var n3 = r3.length - 1; n3 >= 0; n3--) for (var i3 = e3.length - 1; i3 >= 0; i3--) if (!o2(e3[i3], r3[n3], t3)) return false;
      return true;
    }, canReorderSingle: o2 };
  }
  function sn() {
    if (Lr) return Tr;
    Lr = 1;
    var e2 = Pt(), r2 = It().rules, t2 = It().value;
    function n2(e3) {
      return "list-style" == e3 ? e3 : e3.indexOf("-radius") > 0 ? "border-radius" : "border-collapse" == e3 || "border-spacing" == e3 || "border-image" == e3 ? e3 : 0 === e3.indexOf("border-") && /^border\-\w+\-\w+$/.test(e3) ? e3.match(/border\-\w+/)[0] : 0 === e3.indexOf("border-") && /^border\-\w+$/.test(e3) ? "border" : 0 === e3.indexOf("text-") || "-chrome-" == e3 ? e3 : e3.replace(/^\-\w+\-/, "").match(/([a-zA-Z]+)/)[0].toLowerCase();
    }
    return Tr = function o2(i2) {
      var a2, u2, s2, l2, c2, p2, f2 = [];
      if (i2[0] == e2.RULE) for (a2 = !/[\.\+>~]/.test(r2(i2[1])), c2 = 0, p2 = i2[2].length; c2 < p2; c2++) (u2 = i2[2][c2])[0] == e2.PROPERTY && 0 !== (s2 = u2[1][1]).length && 0 !== s2.indexOf("--") && (l2 = t2(u2, c2), f2.push([s2, l2, n2(s2), i2[2][c2], s2 + ":" + l2, i2[1], a2]));
      else if (i2[0] == e2.NESTED_BLOCK) for (c2 = 0, p2 = i2[2].length; c2 < p2; c2++) f2 = f2.concat(o2(i2[2][c2]));
      return f2;
    }, Tr;
  }
  function ln() {
    if (Fr) return Ur;
    return Fr = 1, Ur = function e2(r2) {
      for (var t2 = r2.slice(0), n2 = 0, o2 = t2.length; n2 < o2; n2++) Array.isArray(t2[n2]) && (t2[n2] = e2(t2[n2]));
      return t2;
    }, Ur;
  }
  function cn() {
    if (Mr) return Vr;
    Mr = 1;
    var e2 = $t(), r2 = nn(), t2 = ln(), n2 = Pt(), o2 = It().body, i2 = It().rules;
    function a2(e3) {
      for (var r3 = [], t3 = 0; t3 < e3.length; t3++) r3.push([e3[t3][1]]);
      return r3;
    }
    function u2(e3, n3, o3, i3, a3) {
      for (var u3 = [], s2 = [], l2 = [], c2 = n3.length - 1; c2 >= 0; c2--) if (!o3.filterOut(c2, u3)) {
        var p2 = n3[c2].where, f2 = e3[p2], d2 = t2(f2[2]);
        u3 = u3.concat(d2), s2.push(d2), l2.push(p2);
      }
      r2(u3, true, false, a3);
      for (var m2 = l2.length, g2 = u3.length - 1, h2 = m2 - 1; h2 >= 0; ) if ((0 === h2 || u3[g2] && s2[h2].indexOf(u3[g2]) > -1) && g2 > -1) g2--;
      else {
        var v2 = u3.splice(g2 + 1);
        o3.callback(e3[l2[h2]], v2, m2, h2), h2--;
      }
    }
    return Vr = function(r3, t3) {
      for (var s2 = t3.options, l2 = s2.compatibility.selectors.mergeablePseudoClasses, c2 = s2.compatibility.selectors.mergeablePseudoElements, p2 = s2.compatibility.selectors.multiplePseudoMerging, f2 = {}, d2 = [], m2 = r3.length - 1; m2 >= 0; m2--) {
        var g2 = r3[m2];
        if (g2[0] == n2.RULE && 0 !== g2[2].length) for (var h2 = i2(g2[1]), v2 = g2[1].length > 1 && e2(h2, l2, c2, p2), b2 = a2(g2[1]), y2 = v2 ? [h2].concat(b2) : [h2], E2 = 0, A2 = y2.length; E2 < A2; E2++) {
          var w2 = y2[E2];
          f2[w2] ? d2.push(w2) : f2[w2] = [], f2[w2].push({ where: m2, list: b2, isPartial: v2 && E2 > 0, isComplex: v2 && 0 === E2 });
        }
      }
      !function(e3, r4, t4, n3, o3) {
        function i3(e4, r5) {
          return c3[e4].isPartial && 0 === r5.length;
        }
        function a3(e4, r5, t5, n4) {
          c3[t5 - n4 - 1].isPartial || (e4[2] = r5);
        }
        for (var s3 = 0, l3 = r4.length; s3 < l3; s3++) {
          var c3 = t4[r4[s3]];
          u2(e3, c3, { filterOut: i3, callback: a3 }, n3, o3);
        }
      }(r3, d2, f2, s2, t3), function(r4, t4, n3, i3) {
        var a3 = n3.compatibility.selectors.mergeablePseudoClasses, s3 = n3.compatibility.selectors.mergeablePseudoElements, l3 = n3.compatibility.selectors.multiplePseudoMerging, c3 = {};
        function p3(e3) {
          return c3.data[e3].where < c3.intoPosition;
        }
        function f3(e3, r5, t5, n4) {
          0 === n4 && c3.reducedBodies.push(r5);
        }
        e: for (var d3 in t4) {
          var m3 = t4[d3];
          if (m3[0].isComplex) {
            var g3 = m3[m3.length - 1].where, h3 = r4[g3], v3 = [], b3 = e2(d3, a3, s3, l3) ? m3[0].list : [d3];
            c3.intoPosition = g3, c3.reducedBodies = v3;
            for (var y3 = 0, E3 = b3.length; y3 < E3; y3++) {
              var A3 = t4[b3[y3]];
              if (A3.length < 2) continue e;
              if (c3.data = A3, u2(r4, A3, { filterOut: p3, callback: f3 }, n3, i3), o2(v3[v3.length - 1]) != o2(v3[0])) continue e;
            }
            h3[2] = v3[0];
          }
        }
      }(r3, f2, s2, t3);
    };
  }
  function pn() {
    if (Yr) return Hr;
    Yr = 1;
    var e2 = Zt(), r2 = Nt().single, t2 = qt(), n2 = Pt(), o2 = /^(\-moz\-|\-o\-|\-webkit\-)?animation-name$/, i2 = /^(\-moz\-|\-o\-|\-webkit\-)?animation$/, a2 = /^@(\-moz\-|\-o\-|\-webkit\-)?keyframes /, u2 = /\s{0,31}!important$/, s2 = /^(['"]?)(.*)\1$/;
    function l2(e3) {
      return e3.replace(s2, "$2").replace(u2, "");
    }
    function c2(e3, r3, t3, o3) {
      var i3, a3, u3, s3, l3, c3 = {};
      for (s3 = 0, l3 = e3.length; s3 < l3; s3++) r3(e3[s3], c3);
      if (0 !== Object.keys(c3).length) for (i3 in p2(e3, t3, c3, o3), c3) for (s3 = 0, l3 = (a3 = c3[i3]).length; s3 < l3; s3++) (u3 = a3[s3])[u3[0] == n2.AT_RULE ? 1 : 2] = [];
    }
    function p2(e3, r3, t3, o3) {
      var i3, a3, u3 = r3(t3);
      for (i3 = 0, a3 = e3.length; i3 < a3; i3++) switch (e3[i3][0]) {
        case n2.RULE:
          u3(e3[i3], o3);
          break;
        case n2.NESTED_BLOCK:
          p2(e3[i3][2], r3, t3, o3);
      }
    }
    function f2(e3, r3) {
      var t3;
      e3[0] == n2.AT_RULE_BLOCK && 0 === e3[1][0][1].indexOf("@counter-style") && (r3[t3 = e3[1][0][1].split(" ")[1]] = r3[t3] || [], r3[t3].push(e3));
    }
    function d2(n3) {
      return function(o3, i3) {
        var a3, u3, s3, l3;
        for (s3 = 0, l3 = o3[2].length; s3 < l3; s3++) "list-style" == (a3 = o3[2][s3])[1][1] && (u3 = r2(a3), e2([u3], i3.validator, i3.warnings), u3.components[0].value[0][1] in n3 && delete n3[a3[2][1]], t2([u3])), "list-style-type" == a3[1][1] && a3[2][1] in n3 && delete n3[a3[2][1]];
      };
    }
    function m2(e3, r3) {
      var t3, o3, i3, a3;
      if (e3[0] == n2.AT_RULE_BLOCK && "@font-face" == e3[1][0][1]) {
        for (i3 = 0, a3 = e3[2].length; i3 < a3; i3++) if ("font-family" == (t3 = e3[2][i3])[1][1]) {
          r3[o3 = l2(t3[2][1].toLowerCase())] = r3[o3] || [], r3[o3].push(e3);
          break;
        }
      }
    }
    function g2(n3) {
      return function(o3, i3) {
        var a3, u3, s3, c3, p3, f3, d3, m3;
        for (p3 = 0, f3 = o3[2].length; p3 < f3; p3++) {
          if ("font" == (a3 = o3[2][p3])[1][1]) {
            for (u3 = r2(a3), e2([u3], i3.validator, i3.warnings), d3 = 0, m3 = (s3 = u3.components[6]).value.length; d3 < m3; d3++) (c3 = l2(s3.value[d3][1].toLowerCase())) in n3 && delete n3[c3];
            t2([u3]);
          }
          if ("font-family" == a3[1][1]) for (d3 = 2, m3 = a3.length; d3 < m3; d3++) (c3 = l2(a3[d3][1].toLowerCase())) in n3 && delete n3[c3];
        }
      };
    }
    function h2(e3, r3) {
      var t3;
      e3[0] == n2.NESTED_BLOCK && a2.test(e3[1][0][1]) && (r3[t3 = e3[1][0][1].split(" ")[1]] = r3[t3] || [], r3[t3].push(e3));
    }
    function v2(n3) {
      return function(a3, u3) {
        var s3, l3, c3, p3, f3, d3, m3;
        for (p3 = 0, f3 = a3[2].length; p3 < f3; p3++) {
          if (s3 = a3[2][p3], i2.test(s3[1][1])) {
            for (l3 = r2(s3), e2([l3], u3.validator, u3.warnings), d3 = 0, m3 = (c3 = l3.components[7]).value.length; d3 < m3; d3++) c3.value[d3][1] in n3 && delete n3[c3.value[d3][1]];
            t2([l3]);
          }
          if (o2.test(s3[1][1])) for (d3 = 2, m3 = s3.length; d3 < m3; d3++) s3[d3][1] in n3 && delete n3[s3[d3][1]];
        }
      };
    }
    function b2(e3, r3) {
      var t3;
      e3[0] == n2.AT_RULE && 0 === e3[1].indexOf("@namespace") && (r3[t3 = e3[1].split(" ")[1]] = r3[t3] || [], r3[t3].push(e3));
    }
    function y2(e3) {
      var r3 = new RegExp(Object.keys(e3).join("\\||") + "\\|", "g");
      return function(t3) {
        var n3, o3, i3, a3, u3, s3;
        for (i3 = 0, a3 = t3[1].length; i3 < a3; i3++) for (u3 = 0, s3 = (n3 = t3[1][i3][1].match(r3)).length; u3 < s3; u3++) (o3 = n3[u3].substring(0, n3[u3].length - 1)) in e3 && delete e3[o3];
      };
    }
    return Hr = function(e3, r3) {
      c2(e3, f2, d2, r3), c2(e3, m2, g2, r3), c2(e3, h2, v2, r3), c2(e3, b2, y2, r3);
    };
  }
  function fn() {
    if (Jr) return Zr;
    Jr = 1;
    var e2 = un().canReorderSingle, r2 = sn(), t2 = $t(), n2 = function() {
      if (Qr) return Wr;
      function e3(e4, r3) {
        return e4[1] > r3[1] ? 1 : -1;
      }
      return Qr = 1, Wr = function(r3) {
        for (var t3 = [], n3 = [], o3 = 0, i3 = r3.length; o3 < i3; o3++) {
          var a3 = r3[o3];
          -1 == n3.indexOf(a3[1]) && (n3.push(a3[1]), t3.push(a3));
        }
        return t3.sort(e3);
      };
    }(), o2 = Pt(), i2 = ln(), a2 = It().body, u2 = It().rules;
    function s2(e3, r3) {
      return e3 > r3 ? 1 : -1;
    }
    return Zr = function(l2, c2) {
      var p2, f2, d2, m2 = c2.options, g2 = m2.compatibility.selectors.mergeablePseudoClasses, h2 = m2.compatibility.selectors.mergeablePseudoElements, v2 = m2.compatibility.selectors.mergeLimit, b2 = m2.compatibility.selectors.multiplePseudoMerging, y2 = c2.cache.specificity, E2 = {}, A2 = [], w2 = {}, O2 = [], C2 = "%";
      function x2(e3, r3) {
        var t3 = function(e4) {
          for (var r4 = [], t4 = 0, n3 = e4.length; t4 < n3; t4++) r4.push(u2(e4[t4][1]));
          return r4.join(C2);
        }(r3);
        return w2[t3] = w2[t3] || [], w2[t3].push([e3, r3]), t3;
      }
      function S2(e3) {
        var r3, t3 = e3.split(C2), n3 = [];
        for (var o3 in w2) {
          var i3 = o3.split(C2);
          for (r3 = i3.length - 1; r3 >= 0; r3--) if (t3.indexOf(i3[r3]) > -1) {
            n3.push(o3);
            break;
          }
        }
        for (r3 = n3.length - 1; r3 >= 0; r3--) delete w2[n3[r3]];
      }
      function R2(e3) {
        for (var r3 = [], n3 = [], o3 = e3.length - 1; o3 >= 0; o3--) t2(u2(e3[o3][1]), g2, h2, b2) && (n3.unshift(e3[o3]), e3[o3][2].length > 0 && -1 == r3.indexOf(e3[o3]) && r3.push(e3[o3]));
        return r3.length > 1 ? n3 : [];
      }
      function k2(e3, r3) {
        var t3 = r3[0], o3 = r3[1], i3 = r3[4], a3 = t3.length + o3.length + 1, u3 = [], s3 = [], l3 = R2(E2[i3]);
        if (!(l3.length < 2)) {
          var c3 = L2(l3, a3, 1), p3 = c3[0];
          if (p3[1] > 0) return function(e4, r4, t4) {
            for (var n3 = t4.length - 1; n3 >= 0; n3--) {
              var o4 = x2(r4, t4[n3][0]);
              if (w2[o4].length > 1 && P2(e4, w2[o4])) {
                S2(o4);
                break;
              }
            }
          }(e3, r3, c3);
          for (var f3 = p3[0].length - 1; f3 >= 0; f3--) u3 = p3[0][f3][1].concat(u3), s3.unshift(p3[0][f3]);
          B2(e3, [r3], u3 = n2(u3), s3);
        }
      }
      function T2(e3, r3) {
        return e3[1] > r3[1] ? 1 : e3[1] == r3[1] ? 0 : -1;
      }
      function L2(e3, r3, t3) {
        return D2(e3, r3, t3, 1).sort(T2);
      }
      function D2(e3, r3, t3, n3) {
        var o3 = [[e3, _2(e3, r3, t3)]];
        if (e3.length > 2 && n3 > 0) for (var i3 = e3.length - 1; i3 >= 0; i3--) {
          var a3 = Array.prototype.slice.call(e3, 0);
          a3.splice(i3, 1), o3 = o3.concat(D2(a3, r3, t3, n3 - 1));
        }
        return o3;
      }
      function _2(e3, r3, t3) {
        for (var n3 = 0, o3 = e3.length - 1; o3 >= 0; o3--) n3 += e3[o3][2].length > t3 ? u2(e3[o3][1]).length : -1;
        return n3 - (e3.length - 1) * r3 + 1;
      }
      function B2(e3, r3, t3, n3) {
        var i3, u3, s3, c3, p3 = [];
        for (i3 = n3.length - 1; i3 >= 0; i3--) {
          var f3 = n3[i3];
          for (u3 = f3[2].length - 1; u3 >= 0; u3--) {
            var d3 = f3[2][u3];
            for (s3 = 0, c3 = r3.length; s3 < c3; s3++) {
              var m3 = r3[s3], g3 = d3[1][1], h3 = m3[0], v3 = m3[4];
              if (g3 == h3 && a2([d3]) == v3) {
                f3[2].splice(u3, 1);
                break;
              }
            }
          }
        }
        for (i3 = r3.length - 1; i3 >= 0; i3--) p3.unshift(r3[i3][3]);
        var b3 = [o2.RULE, t3, p3];
        l2.splice(e3, 0, b3);
      }
      function q2(e3, r3) {
        var t3 = r3[4], n3 = E2[t3];
        n3 && n3.length > 1 && (function(e4, r4) {
          var t4, n4, o3 = [], i3 = [], a3 = r4[4], u3 = R2(E2[a3]);
          if (u3.length < 2) return;
          e: for (var s3 in E2) {
            var l3 = E2[s3];
            for (t4 = u3.length - 1; t4 >= 0; t4--) if (-1 == l3.indexOf(u3[t4])) continue e;
            o3.push(s3);
          }
          if (o3.length < 2) return false;
          for (t4 = o3.length - 1; t4 >= 0; t4--) for (n4 = A2.length - 1; n4 >= 0; n4--) if (A2[n4][4] == o3[t4]) {
            i3.unshift([A2[n4], u3]);
            break;
          }
          return P2(e4, i3);
        }(e3, r3) || k2(e3, r3));
      }
      function P2(e3, r3) {
        for (var t3, o3 = 0, i3 = [], a3 = r3.length - 1; a3 >= 0; a3--) {
          o3 += (t3 = r3[a3][0])[4].length + (a3 > 0 ? 1 : 0), i3.push(t3);
        }
        var u3 = L2(r3[0][1], o3, i3.length)[0];
        if (u3[1] > 0) return false;
        var s3 = [], l3 = [];
        for (a3 = u3[0].length - 1; a3 >= 0; a3--) s3 = u3[0][a3][1].concat(s3), l3.unshift(u3[0][a3]);
        for (B2(e3, i3, s3 = n2(s3), l3), a3 = i3.length - 1; a3 >= 0; a3--) {
          t3 = i3[a3];
          var c3 = A2.indexOf(t3);
          delete E2[t3[4]], c3 > -1 && -1 == O2.indexOf(c3) && O2.push(c3);
        }
        return true;
      }
      function N2(e3, r3, t3) {
        if (e3[0] != r3[0]) return false;
        var n3 = r3[4], o3 = E2[n3];
        return o3 && o3.indexOf(t3) > -1;
      }
      for (var U2 = l2.length - 1; U2 >= 0; U2--) {
        var F2, V2, M2, I2, j2, $2 = l2[U2];
        if ($2[0] == o2.RULE) F2 = true;
        else {
          if ($2[0] != o2.NESTED_BLOCK) continue;
          F2 = false;
        }
        var K2 = A2.length, z2 = r2($2);
        O2 = [];
        var G2 = [];
        for (V2 = z2.length - 1; V2 >= 0; V2--) for (M2 = V2 - 1; M2 >= 0; M2--) if (!e2(z2[V2], z2[M2], y2)) {
          G2.push(V2);
          break;
        }
        for (V2 = z2.length - 1; V2 >= 0; V2--) {
          var H2 = z2[V2], Y2 = false;
          for (M2 = 0; M2 < K2; M2++) {
            var W2 = A2[M2];
            -1 == O2.indexOf(M2) && (!e2(H2, W2, y2) && !N2(H2, W2, $2) || E2[W2[4]] && E2[W2[4]].length === v2) && (q2(U2 + 1, W2), -1 == O2.indexOf(M2) && (O2.push(M2), delete E2[W2[4]])), Y2 || (Y2 = H2[0] == W2[0] && H2[1] == W2[1]) && (j2 = M2);
          }
          if (F2 && !(G2.indexOf(V2) > -1)) {
            var Q2 = H2[4];
            Y2 && A2[j2][5].length + H2[5].length > v2 ? (q2(U2 + 1, A2[j2]), A2.splice(j2, 1), E2[Q2] = [$2], Y2 = false) : (E2[Q2] = E2[Q2] || [], E2[Q2].push($2)), Y2 ? A2[j2] = (p2 = A2[j2], f2 = H2, d2 = void 0, (d2 = i2(p2))[5] = d2[5].concat(f2[5]), d2) : A2.push(H2);
          }
        }
        for (V2 = 0, I2 = (O2 = O2.sort(s2)).length; V2 < I2; V2++) {
          var Z2 = O2[V2] - V2;
          A2.splice(Z2, 1);
        }
      }
      for (var J2 = l2[0] && l2[0][0] == o2.AT_RULE && 0 === l2[0][1].indexOf("@charset") ? 1 : 0; J2 < l2.length - 1; J2++) {
        var X2 = l2[J2][0] === o2.AT_RULE && 0 === l2[J2][1].indexOf("@import"), ee2 = l2[J2][0] === o2.COMMENT;
        if (!X2 && !ee2) break;
      }
      for (U2 = 0; U2 < A2.length; U2++) q2(J2, A2[U2]);
    };
  }
  function dn() {
    if (et) return Xr;
    et = 1;
    var e2 = function() {
      if (Er) return yr;
      Er = 1;
      var e3 = $t(), r3 = nn(), t3 = St(), n3 = Dt(), o3 = Ft().OptimizationLevel, i3 = It().body, a3 = It().rules, u3 = Pt();
      return yr = function(s3, l3) {
        for (var c3 = [null, [], []], p3 = l3.options, f3 = p3.compatibility.selectors.adjacentSpace, d3 = p3.level[o3.One].selectorsSortingMethod, m3 = p3.compatibility.selectors.mergeablePseudoClasses, g3 = p3.compatibility.selectors.mergeablePseudoElements, h2 = p3.compatibility.selectors.mergeLimit, v2 = p3.compatibility.selectors.multiplePseudoMerging, b2 = 0, y2 = s3.length; b2 < y2; b2++) {
          var E2 = s3[b2];
          E2[0] == u3.RULE ? c3[0] == u3.RULE && a3(E2[1]) == a3(c3[1]) ? (Array.prototype.push.apply(c3[2], E2[2]), r3(c3[2], true, true, l3), E2[2] = []) : c3[0] == u3.RULE && i3(E2[2]) == i3(c3[2]) && e3(a3(E2[1]), m3, g3, v2) && e3(a3(c3[1]), m3, g3, v2) && c3[1].length < h2 ? (c3[1] = n3(c3[1].concat(E2[1]), false, f3, false, l3.warnings), c3[1] = c3.length > 1 ? t3(c3[1], d3) : c3[1], E2[2] = []) : c3 = E2 : c3 = [null, [], []];
        }
      };
    }(), r2 = function() {
      if (_r) return Dr;
      _r = 1;
      var e3 = un().canReorder, r3 = un().canReorderSingle, t3 = sn(), n3 = on(), o3 = It().rules, i3 = Ft().OptimizationLevel, a3 = Pt();
      function u3(e4, t4, o4) {
        var i4, a4, u4, s3, l3, c3, p3, f3;
        for (l3 = 0, c3 = e4.length; l3 < c3; l3++) for (a4 = (i4 = e4[l3])[5], p3 = 0, f3 = t4.length; p3 < f3; p3++) if (s3 = (u4 = t4[p3])[5], n3(a4, s3, true) && !r3(i4, u4, o4)) return false;
        return true;
      }
      return Dr = function(r4, n4) {
        for (var s3 = n4.options.level[i3.Two].mergeSemantically, l3 = n4.cache.specificity, c3 = {}, p3 = [], f3 = r4.length - 1; f3 >= 0; f3--) {
          var d3 = r4[f3];
          if (d3[0] == a3.NESTED_BLOCK) {
            var m3 = o3(d3[1]), g3 = c3[m3];
            g3 || (g3 = [], c3[m3] = g3), g3.push(f3);
          }
        }
        for (var h2 in c3) {
          var v2 = c3[h2];
          e: for (var b2 = v2.length - 1; b2 > 0; b2--) {
            var y2 = v2[b2], E2 = r4[y2], A2 = v2[b2 - 1], w2 = r4[A2];
            r: for (var O2 = 1; O2 >= -1; O2 -= 2) {
              for (var C2 = 1 == O2, x2 = C2 ? y2 + 1 : A2 - 1, S2 = C2 ? A2 : y2, R2 = C2 ? 1 : -1, k2 = C2 ? E2 : w2, T2 = C2 ? w2 : E2, L2 = t3(k2); x2 != S2; ) {
                var D2 = t3(r4[x2]);
                if (x2 += R2, !(s3 && u3(L2, D2, l3) || e3(L2, D2, l3))) continue r;
              }
              T2[2] = C2 ? k2[2].concat(T2[2]) : T2[2].concat(k2[2]), k2[2] = [], p3.push(T2);
              continue e;
            }
          }
        }
        return p3;
      };
    }(), t2 = function() {
      if (qr) return Br;
      qr = 1;
      var e3 = $t(), r3 = St(), t3 = Dt(), n3 = Ft().OptimizationLevel, o3 = It().body, i3 = It().rules, a3 = Pt();
      function u3(e4) {
        var r4 = i3(e4[1]);
        return r4.indexOf("__") > -1 || r4.indexOf("--") > -1;
      }
      function s3(e4) {
        return e4.replace(/--[^ ,>\+~:]+/g, "");
      }
      function l3(e4, r4) {
        var t4 = s3(i3(e4[1]));
        for (var n4 in r4) {
          var o4 = r4[n4], a4 = s3(i3(o4[1]));
          (a4.indexOf(t4) > -1 || t4.indexOf(a4) > -1) && delete r4[n4];
        }
      }
      return Br = function(s4, c3) {
        for (var p3, f3 = c3.options, d3 = f3.level[n3.Two].mergeSemantically, m3 = f3.compatibility.selectors.adjacentSpace, g3 = f3.level[n3.One].selectorsSortingMethod, h2 = f3.compatibility.selectors.mergeablePseudoClasses, v2 = f3.compatibility.selectors.mergeablePseudoElements, b2 = f3.compatibility.selectors.multiplePseudoMerging, y2 = {}, E2 = s4.length - 1; E2 >= 0; E2--) {
          var A2 = s4[E2];
          if (A2[0] == a3.RULE) {
            A2[2].length > 0 && !d3 && (p3 = i3(A2[1]), /\.|\*| :/.test(p3)) && (y2 = {}), A2[2].length > 0 && d3 && u3(A2) && l3(A2, y2);
            var w2 = o3(A2[2]), O2 = y2[w2];
            O2 && e3(i3(A2[1]), h2, v2, b2) && e3(i3(O2[1]), h2, v2, b2) && (A2[2].length > 0 ? (A2[1] = t3(O2[1].concat(A2[1]), false, m3, false, c3.warnings), A2[1] = A2[1].length > 1 ? r3(A2[1], g3) : A2[1]) : A2[1] = O2[1].concat(A2[1]), O2[2] = [], y2[w2] = null), y2[o3(A2[2])] = A2;
          }
        }
      };
    }(), n2 = function() {
      if (Nr) return Pr;
      Nr = 1;
      var e3 = un().canReorder, r3 = sn(), t3 = nn(), n3 = It().rules, o3 = Pt();
      return Pr = function(i3, a3) {
        var u3, s3 = a3.cache.specificity, l3 = {}, c3 = [];
        for (u3 = i3.length - 1; u3 >= 0; u3--) if (i3[u3][0] == o3.RULE && 0 !== i3[u3][2].length) {
          var p3 = n3(i3[u3][1]);
          l3[p3] = [u3].concat(l3[p3] || []), 2 == l3[p3].length && c3.push(p3);
        }
        for (u3 = c3.length - 1; u3 >= 0; u3--) {
          var f3 = l3[c3[u3]];
          e: for (var d3 = f3.length - 1; d3 > 0; d3--) {
            var m3 = f3[d3 - 1], g3 = i3[m3], h2 = f3[d3], v2 = i3[h2];
            r: for (var b2 = 1; b2 >= -1; b2 -= 2) {
              for (var y2 = 1 == b2, E2 = y2 ? m3 + 1 : h2 - 1, A2 = y2 ? h2 : m3, w2 = y2 ? 1 : -1, O2 = y2 ? g3 : v2, C2 = y2 ? v2 : g3, x2 = r3(O2); E2 != A2; ) {
                var S2 = r3(i3[E2]);
                E2 += w2;
                var R2 = y2 ? e3(x2, S2, s3) : e3(S2, x2, s3);
                if (!R2 && !y2) continue e;
                if (!R2 && y2) continue r;
              }
              y2 ? (Array.prototype.push.apply(O2[2], C2[2]), C2[2] = O2[2]) : Array.prototype.push.apply(C2[2], O2[2]), t3(C2[2], true, true, a3), O2[2] = [];
            }
          }
        }
      };
    }(), o2 = cn(), i2 = function() {
      if (jr) return Ir;
      jr = 1;
      var e3 = Pt(), r3 = It().all;
      return Ir = function(t3) {
        var n3, o3, i3, a3, u3 = [];
        for (i3 = 0, a3 = t3.length; i3 < a3; i3++) (n3 = t3[i3])[0] != e3.AT_RULE_BLOCK && "@font-face" != n3[1][0][1] || (o3 = r3([n3]), u3.indexOf(o3) > -1 ? n3[2] = [] : u3.push(o3));
      };
    }(), a2 = function() {
      if (Kr) return $r;
      Kr = 1;
      var e3 = Pt(), r3 = It().all, t3 = It().rules;
      return $r = function(n3) {
        var o3, i3, a3, u3, s3, l3 = {};
        for (u3 = 0, s3 = n3.length; u3 < s3; u3++) (i3 = n3[u3])[0] == e3.NESTED_BLOCK && ((o3 = l3[a3 = t3(i3[1]) + "%" + r3(i3[2])]) && (o3[2] = []), l3[a3] = i3);
      };
    }(), u2 = function() {
      if (Gr) return zr;
      Gr = 1;
      var e3 = Pt(), r3 = It().body, t3 = It().rules;
      return zr = function(n3) {
        for (var o3, i3, a3, u3, s3 = {}, l3 = [], c3 = 0, p3 = n3.length; c3 < p3; c3++) (i3 = n3[c3])[0] == e3.RULE && (s3[o3 = t3(i3[1])] && 1 == s3[o3].length ? l3.push(o3) : s3[o3] = s3[o3] || [], s3[o3].push(c3));
        for (c3 = 0, p3 = l3.length; c3 < p3; c3++) {
          u3 = [];
          for (var f3 = s3[o3 = l3[c3]].length - 1; f3 >= 0; f3--) i3 = n3[s3[o3][f3]], a3 = r3(i3[2]), u3.indexOf(a3) > -1 ? i3[2] = [] : u3.push(a3);
        }
      };
    }(), s2 = pn(), l2 = fn(), c2 = nn(), p2 = Ft().OptimizationLevel, f2 = Pt();
    function d2(e3) {
      for (var r3 = 0, t3 = e3.length; r3 < t3; r3++) {
        var n3 = e3[r3], o3 = false;
        switch (n3[0]) {
          case f2.RULE:
            o3 = 0 === n3[1].length || 0 === n3[2].length;
            break;
          case f2.NESTED_BLOCK:
            d2(n3[2]), o3 = 0 === n3[2].length;
            break;
          case f2.AT_RULE:
            o3 = 0 === n3[1].length;
            break;
          case f2.AT_RULE_BLOCK:
            o3 = 0 === n3[2].length;
        }
        o3 && (e3.splice(r3, 1), r3--, t3--);
      }
    }
    function m2(e3, r3) {
      for (var t3 = 0, n3 = e3.length; t3 < n3; t3++) {
        var o3 = e3[t3];
        switch (o3[0]) {
          case f2.RULE:
            c2(o3[2], true, true, r3);
            break;
          case f2.NESTED_BLOCK:
            m2(o3[2], r3);
        }
      }
    }
    function g2(c3, h2, v2) {
      var b2, y2, E2 = h2.options.level[p2.Two];
      if (function(e3, r3) {
        for (var t3 = 0, n3 = e3.length; t3 < n3; t3++) {
          var o3 = e3[t3];
          if (o3[0] == f2.NESTED_BLOCK) {
            var i3 = /@(-moz-|-o-|-webkit-)?keyframes/.test(o3[1][0][1]);
            g2(o3[2], r3, !i3);
          }
        }
      }(c3, h2), m2(c3, h2), E2.removeDuplicateRules && u2(c3, h2), E2.mergeAdjacentRules && e2(c3, h2), E2.reduceNonAdjacentRules && o2(c3, h2), E2.mergeNonAdjacentRules && "body" != E2.mergeNonAdjacentRules && n2(c3, h2), E2.mergeNonAdjacentRules && "selector" != E2.mergeNonAdjacentRules && t2(c3, h2), E2.restructureRules && E2.mergeAdjacentRules && v2 && (l2(c3, h2), e2(c3, h2)), E2.restructureRules && !E2.mergeAdjacentRules && v2 && l2(c3, h2), E2.removeDuplicateFontRules && i2(c3, h2), E2.removeDuplicateMediaBlocks && a2(c3, h2), E2.removeUnusedAtRules && s2(c3, h2), E2.mergeMedia) for (y2 = (b2 = r2(c3, h2)).length - 1; y2 >= 0; y2--) g2(b2[y2][2], h2, false);
      return E2.removeEmpty && d2(c3), c3;
    }
    return Xr = g2;
  }
  function mn() {
    if (tt) return rt;
    tt = 1;
    var e2 = "var\\(\\-\\-[^\\)]+\\)", r2 = "(" + e2 + "|[A-Z]+(\\-|[A-Z]|[0-9])+\\(.*?\\)|\\-(\\-|[A-Z]|[0-9])+\\(.*?\\))", t2 = new RegExp("^(\\-moz\\-|\\-webkit\\-)?calc\\([^\\)]+\\)$", "i"), n2 = /[0-9]/, o2 = new RegExp("^" + r2 + "$", "i"), i2 = /^hsl\(\s{0,31}[\-\.]?\d+\s{0,31},\s{0,31}\.?\d+%\s{0,31},\s{0,31}\.?\d+%\s{0,31}\)|hsla\(\s{0,31}[\-\.]?\d+\s{0,31},\s{0,31}\.?\d+%\s{0,31},\s{0,31}\.?\d+%\s{0,31},\s{0,31}\.?\d+\s{0,31}\)$/i, a2 = /^(\-[a-z0-9_][a-z0-9\-_]*|[a-z][a-z0-9\-_]*)$/i, u2 = /^[a-z]+$/i, s2 = /^-([a-z0-9]|-)*$/i, l2 = /^rgb\(\s{0,31}[\d]{1,3}\s{0,31},\s{0,31}[\d]{1,3}\s{0,31},\s{0,31}[\d]{1,3}\s{0,31}\)|rgba\(\s{0,31}[\d]{1,3}\s{0,31},\s{0,31}[\d]{1,3}\s{0,31},\s{0,31}[\d]{1,3}\s{0,31},\s{0,31}[\.\d]+\s{0,31}\)$/i, c2 = /^(cubic\-bezier|steps)\([^\)]+\)$/, p2 = ["ms", "s"], f2 = /^url\([\s\S]+\)$/i, d2 = new RegExp("^" + e2 + "$", "i"), m2 = /^#[0-9a-f]{8}$/i, g2 = /^#[0-9a-f]{4}$/i, h2 = /^#[0-9a-f]{6}$/i, v2 = /^#[0-9a-f]{3}$/i, b2 = { "^": ["inherit", "initial", "unset"], "*-style": ["auto", "dashed", "dotted", "double", "groove", "hidden", "inset", "none", "outset", "ridge", "solid"], "*-timing-function": ["ease", "ease-in", "ease-in-out", "ease-out", "linear", "step-end", "step-start"], "animation-direction": ["alternate", "alternate-reverse", "normal", "reverse"], "animation-fill-mode": ["backwards", "both", "forwards", "none"], "animation-iteration-count": ["infinite"], "animation-name": ["none"], "animation-play-state": ["paused", "running"], "background-attachment": ["fixed", "inherit", "local", "scroll"], "background-clip": ["border-box", "content-box", "inherit", "padding-box", "text"], "background-origin": ["border-box", "content-box", "inherit", "padding-box"], "background-position": ["bottom", "center", "left", "right", "top"], "background-repeat": ["no-repeat", "inherit", "repeat", "repeat-x", "repeat-y", "round", "space"], "background-size": ["auto", "cover", "contain"], "border-collapse": ["collapse", "inherit", "separate"], bottom: ["auto"], clear: ["both", "left", "none", "right"], color: ["transparent"], cursor: ["all-scroll", "auto", "col-resize", "crosshair", "default", "e-resize", "help", "move", "n-resize", "ne-resize", "no-drop", "not-allowed", "nw-resize", "pointer", "progress", "row-resize", "s-resize", "se-resize", "sw-resize", "text", "vertical-text", "w-resize", "wait"], display: ["block", "inline", "inline-block", "inline-table", "list-item", "none", "table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row", "table-row-group"], float: ["left", "none", "right"], left: ["auto"], font: ["caption", "icon", "menu", "message-box", "small-caption", "status-bar", "unset"], "font-size": ["large", "larger", "medium", "small", "smaller", "x-large", "x-small", "xx-large", "xx-small"], "font-stretch": ["condensed", "expanded", "extra-condensed", "extra-expanded", "normal", "semi-condensed", "semi-expanded", "ultra-condensed", "ultra-expanded"], "font-style": ["italic", "normal", "oblique"], "font-variant": ["normal", "small-caps"], "font-weight": ["100", "200", "300", "400", "500", "600", "700", "800", "900", "bold", "bolder", "lighter", "normal"], "line-height": ["normal"], "list-style-position": ["inside", "outside"], "list-style-type": ["armenian", "circle", "decimal", "decimal-leading-zero", "disc", "decimal|disc", "georgian", "lower-alpha", "lower-greek", "lower-latin", "lower-roman", "none", "square", "upper-alpha", "upper-latin", "upper-roman"], overflow: ["auto", "hidden", "scroll", "visible"], position: ["absolute", "fixed", "relative", "static"], right: ["auto"], "text-align": ["center", "justify", "left", "left|right", "right"], "text-decoration": ["line-through", "none", "overline", "underline"], "text-overflow": ["clip", "ellipsis"], top: ["auto"], "vertical-align": ["baseline", "bottom", "middle", "sub", "super", "text-bottom", "text-top", "top"], visibility: ["collapse", "hidden", "visible"], "white-space": ["normal", "nowrap", "pre"], width: ["inherit", "initial", "medium", "thick", "thin"] }, y2 = ["%", "ch", "cm", "em", "ex", "in", "mm", "pc", "pt", "px", "rem", "vh", "vm", "vmax", "vmin", "vw"];
    function E2(e3) {
      return "auto" != e3 && (R2("color")(e3) || function(e4) {
        return v2.test(e4) || g2.test(e4) || h2.test(e4) || m2.test(e4);
      }(e3) || A2(e3) || function(e4) {
        return u2.test(e4);
      }(e3));
    }
    function A2(e3) {
      return T2(e3) || C2(e3);
    }
    function w2(e3) {
      return t2.test(e3);
    }
    function O2(e3) {
      return o2.test(e3);
    }
    function C2(e3) {
      return i2.test(e3);
    }
    function x2(e3) {
      return a2.test(e3);
    }
    function S2(e3) {
      return "none" == e3 || "inherit" == e3 || P2(e3);
    }
    function R2(e3) {
      return function(r3) {
        return b2[e3].indexOf(r3) > -1;
      };
    }
    function k2(e3) {
      return U2(e3) == e3.length;
    }
    function T2(e3) {
      return l2.test(e3);
    }
    function L2(e3) {
      return s2.test(e3);
    }
    function D2(e3) {
      return k2(e3) && parseFloat(e3) >= 0;
    }
    function _2(e3) {
      return d2.test(e3);
    }
    function B2(e3) {
      var r3 = U2(e3);
      return r3 == e3.length && 0 === parseInt(e3) || r3 > -1 && p2.indexOf(e3.slice(r3 + 1)) > -1;
    }
    function q2(e3, r3) {
      var t3 = U2(r3);
      return t3 == r3.length && 0 === parseInt(r3) || t3 > -1 && e3.indexOf(r3.slice(t3 + 1)) > -1 || "auto" == r3 || "inherit" == r3;
    }
    function P2(e3) {
      return f2.test(e3);
    }
    function N2(e3) {
      return "auto" == e3 || k2(e3) || R2("^")(e3);
    }
    function U2(e3) {
      var r3, t3, o3, i3 = false, a3 = false;
      for (t3 = 0, o3 = e3.length; t3 < o3; t3++) if (r3 = e3[t3], 0 !== t3 || "+" != r3 && "-" != r3) {
        if (t3 > 0 && a3 && ("+" == r3 || "-" == r3)) return t3 - 1;
        if ("." != r3 || i3) {
          if ("." == r3 && i3) return t3 - 1;
          if (n2.test(r3)) continue;
          return t3 - 1;
        }
        i3 = true;
      } else a3 = true;
      return t3;
    }
    return rt = function(e3) {
      var r3, t3 = y2.slice(0).filter(function(r4) {
        return !(r4 in e3.units) || true === e3.units[r4];
      });
      return { colorOpacity: e3.colors.opacity, isAnimationDirectionKeyword: R2("animation-direction"), isAnimationFillModeKeyword: R2("animation-fill-mode"), isAnimationIterationCountKeyword: R2("animation-iteration-count"), isAnimationNameKeyword: R2("animation-name"), isAnimationPlayStateKeyword: R2("animation-play-state"), isTimingFunction: (r3 = R2("*-timing-function"), function(e4) {
        return r3(e4) || c2.test(e4);
      }), isBackgroundAttachmentKeyword: R2("background-attachment"), isBackgroundClipKeyword: R2("background-clip"), isBackgroundOriginKeyword: R2("background-origin"), isBackgroundPositionKeyword: R2("background-position"), isBackgroundRepeatKeyword: R2("background-repeat"), isBackgroundSizeKeyword: R2("background-size"), isColor: E2, isColorFunction: A2, isDynamicUnit: w2, isFontKeyword: R2("font"), isFontSizeKeyword: R2("font-size"), isFontStretchKeyword: R2("font-stretch"), isFontStyleKeyword: R2("font-style"), isFontVariantKeyword: R2("font-variant"), isFontWeightKeyword: R2("font-weight"), isFunction: O2, isGlobal: R2("^"), isHslColor: C2, isIdentifier: x2, isImage: S2, isKeyword: R2, isLineHeightKeyword: R2("line-height"), isListStylePositionKeyword: R2("list-style-position"), isListStyleTypeKeyword: R2("list-style-type"), isNumber: k2, isPrefixed: L2, isPositiveNumber: D2, isRgbColor: T2, isStyleKeyword: R2("*-style"), isTime: B2, isUnit: q2.bind(null, t3), isUrl: P2, isVariable: _2, isWidth: R2("width"), isZIndex: N2 };
    };
  }
  function gn() {
    if (ot) return nt;
    ot = 1;
    var e2 = { "*": { colors: { opacity: true }, properties: { backgroundClipMerging: true, backgroundOriginMerging: true, backgroundSizeMerging: true, colors: true, ieBangHack: false, ieFilters: false, iePrefixHack: false, ieSuffixHack: false, merging: true, shorterLengthUnits: false, spaceAfterClosingBrace: true, urlQuotes: false, zeroUnits: true }, selectors: { adjacentSpace: false, ie7Hack: false, mergeablePseudoClasses: [":active", ":after", ":before", ":empty", ":checked", ":disabled", ":empty", ":enabled", ":first-child", ":first-letter", ":first-line", ":first-of-type", ":focus", ":hover", ":lang", ":last-child", ":last-of-type", ":link", ":not", ":nth-child", ":nth-last-child", ":nth-last-of-type", ":nth-of-type", ":only-child", ":only-of-type", ":root", ":target", ":visited"], mergeablePseudoElements: ["::after", "::before", "::first-letter", "::first-line"], mergeLimit: 8191, multiplePseudoMerging: true }, units: { ch: true, in: true, pc: true, pt: true, rem: true, vh: true, vm: true, vmax: true, vmin: true, vw: true } } };
    function r2(e3, t2) {
      for (var n2 in e3) if (Object.prototype.hasOwnProperty.call(e3, n2)) {
        var o2 = e3[n2];
        Object.prototype.hasOwnProperty.call(t2, n2) && "object" == typeof o2 && !Array.isArray(o2) ? t2[n2] = r2(o2, t2[n2] || {}) : t2[n2] = n2 in t2 ? t2[n2] : o2;
      }
      return t2;
    }
    return e2.ie11 = e2["*"], e2.ie10 = e2["*"], e2.ie9 = r2(e2["*"], { properties: { ieFilters: true, ieSuffixHack: true } }), e2.ie8 = r2(e2.ie9, { colors: { opacity: false }, properties: { backgroundClipMerging: false, backgroundOriginMerging: false, backgroundSizeMerging: false, iePrefixHack: true, merging: false }, selectors: { mergeablePseudoClasses: [":after", ":before", ":first-child", ":first-letter", ":focus", ":hover", ":visited"], mergeablePseudoElements: [] }, units: { ch: false, rem: false, vh: false, vm: false, vmax: false, vmin: false, vw: false } }), e2.ie7 = r2(e2.ie8, { properties: { ieBangHack: true }, selectors: { ie7Hack: true, mergeablePseudoClasses: [":first-child", ":first-letter", ":hover", ":visited"] } }), nt = function(t2) {
      return r2(e2["*"], function(t3) {
        if ("object" == typeof t3) return t3;
        if (!/[,\+\-]/.test(t3)) return e2[t3] || e2["*"];
        var n2 = t3.split(","), o2 = n2[0] in e2 ? e2[n2.shift()] : e2["*"];
        return t3 = {}, n2.forEach(function(e3) {
          var r3 = "+" == e3[0], n3 = e3.substring(1).split("."), o3 = n3[0], i2 = n3[1];
          t3[o3] = t3[o3] || {}, t3[o3][i2] = r3;
        }), r2(o2, t3);
      }(t2));
    };
  }
  function hn() {
    if (ct) return lt;
    ct = 1;
    var e2 = t, r2 = n, i2 = o, a2 = function() {
      if (at) return it;
      at = 1;
      var e3 = /^http:\/\//;
      return it = function(r3) {
        return e3.test(r3);
      };
    }(), u2 = function() {
      if (st) return ut;
      st = 1;
      var e3 = /^https:\/\//;
      return ut = function(r3) {
        return e3.test(r3);
      };
    }(), s2 = Rt();
    return lt = function t2(n2, o2, l2, c2) {
      var p2, f2 = o2.protocol || o2.hostname, d2 = false;
      p2 = s2(i2.parse(n2), o2 || {}), void 0 !== o2.hostname && (p2.protocol = o2.protocol || "http:", p2.path = p2.href), (f2 && !u2(f2) || a2(n2) ? e2.get : r2.get)(p2, function(e3) {
        var r3 = [];
        if (!d2) {
          if (e3.statusCode < 200 || e3.statusCode > 399) return c2(e3.statusCode, null);
          if (e3.statusCode > 299) return t2(i2.resolve(n2, e3.headers.location), o2, l2, c2);
          e3.on("data", function(e4) {
            r3.push(e4.toString());
          }), e3.on("end", function() {
            var e4 = r3.join("");
            c2(null, e4);
          });
        }
      }).on("error", function(e3) {
        d2 || (d2 = true, c2(e3.message, null));
      }).on("timeout", function() {
        d2 || (d2 = true, c2("timeout", null));
      }).setTimeout(l2);
    }, lt;
  }
  function vn() {
    if (ht) return gt;
    ht = 1;
    var e2 = o, r2 = Rt();
    return gt = function(t2) {
      return r2((n2 = process.env.HTTP_PROXY || process.env.http_proxy) ? { hostname: e2.parse(n2).hostname, port: parseInt(e2.parse(n2).port) } : {}, t2 || {});
      var n2;
    };
  }
  var bn, yn, En = {}, An = {}, wn = {}, On = {};
  function Cn() {
    if (yn) return wn;
    yn = 1;
    var e2 = function() {
      if (bn) return On;
      bn = 1;
      var e3 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
      return On.encode = function(r2) {
        if (0 <= r2 && r2 < e3.length) return e3[r2];
        throw new TypeError("Must be between 0 and 63: " + r2);
      }, On.decode = function(e4) {
        return 65 <= e4 && e4 <= 90 ? e4 - 65 : 97 <= e4 && e4 <= 122 ? e4 - 97 + 26 : 48 <= e4 && e4 <= 57 ? e4 - 48 + 52 : 43 == e4 ? 62 : 47 == e4 ? 63 : -1;
      }, On;
    }();
    return wn.encode = function(r2) {
      var t2, n2 = "", o2 = function(e3) {
        return e3 < 0 ? 1 + (-e3 << 1) : 0 + (e3 << 1);
      }(r2);
      do {
        t2 = 31 & o2, (o2 >>>= 5) > 0 && (t2 |= 32), n2 += e2.encode(t2);
      } while (o2 > 0);
      return n2;
    }, wn.decode = function(r2, t2, n2) {
      var o2, i2, a2, u2, s2 = r2.length, l2 = 0, c2 = 0;
      do {
        if (t2 >= s2) throw new Error("Expected more digits in base 64 VLQ value.");
        if (-1 === (i2 = e2.decode(r2.charCodeAt(t2++)))) throw new Error("Invalid base64 digit: " + r2.charAt(t2 - 1));
        o2 = !!(32 & i2), l2 += (i2 &= 31) << c2, c2 += 5;
      } while (o2);
      n2.value = (u2 = (a2 = l2) >> 1, 1 & ~a2 ? u2 : -u2), n2.rest = t2;
    }, wn;
  }
  var xn, Sn = {};
  function Rn() {
    return xn || (xn = 1, function(e2) {
      e2.getArg = function(e3, r3, t3) {
        if (r3 in e3) return e3[r3];
        if (3 === arguments.length) return t3;
        throw new Error('"' + r3 + '" is a required argument.');
      };
      var r2 = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/, t2 = /^data:.+\,.+$/;
      function n2(e3) {
        var t3 = e3.match(r2);
        return t3 ? { scheme: t3[1], auth: t3[2], host: t3[3], port: t3[4], path: t3[5] } : null;
      }
      function o2(e3) {
        var r3 = "";
        return e3.scheme && (r3 += e3.scheme + ":"), r3 += "//", e3.auth && (r3 += e3.auth + "@"), e3.host && (r3 += e3.host), e3.port && (r3 += ":" + e3.port), e3.path && (r3 += e3.path), r3;
      }
      function i2(r3) {
        var t3 = r3, i3 = n2(r3);
        if (i3) {
          if (!i3.path) return r3;
          t3 = i3.path;
        }
        for (var a3, u3 = e2.isAbsolute(t3), s3 = t3.split(/\/+/), l3 = 0, c3 = s3.length - 1; c3 >= 0; c3--) "." === (a3 = s3[c3]) ? s3.splice(c3, 1) : ".." === a3 ? l3++ : l3 > 0 && ("" === a3 ? (s3.splice(c3 + 1, l3), l3 = 0) : (s3.splice(c3, 2), l3--));
        return "" === (t3 = s3.join("/")) && (t3 = u3 ? "/" : "."), i3 ? (i3.path = t3, o2(i3)) : t3;
      }
      function a2(e3, r3) {
        "" === e3 && (e3 = "."), "" === r3 && (r3 = ".");
        var a3 = n2(r3), u3 = n2(e3);
        if (u3 && (e3 = u3.path || "/"), a3 && !a3.scheme) return u3 && (a3.scheme = u3.scheme), o2(a3);
        if (a3 || r3.match(t2)) return r3;
        if (u3 && !u3.host && !u3.path) return u3.host = r3, o2(u3);
        var s3 = "/" === r3.charAt(0) ? r3 : i2(e3.replace(/\/+$/, "") + "/" + r3);
        return u3 ? (u3.path = s3, o2(u3)) : s3;
      }
      e2.urlParse = n2, e2.urlGenerate = o2, e2.normalize = i2, e2.join = a2, e2.isAbsolute = function(e3) {
        return "/" === e3.charAt(0) || r2.test(e3);
      }, e2.relative = function(e3, r3) {
        "" === e3 && (e3 = "."), e3 = e3.replace(/\/$/, "");
        for (var t3 = 0; 0 !== r3.indexOf(e3 + "/"); ) {
          var n3 = e3.lastIndexOf("/");
          if (n3 < 0) return r3;
          if ((e3 = e3.slice(0, n3)).match(/^([^\/]+:\/)?\/*$/)) return r3;
          ++t3;
        }
        return Array(t3 + 1).join("../") + r3.substr(e3.length + 1);
      };
      var u2 = !("__proto__" in /* @__PURE__ */ Object.create(null));
      function s2(e3) {
        return e3;
      }
      function l2(e3) {
        if (!e3) return false;
        var r3 = e3.length;
        if (r3 < 9) return false;
        if (95 !== e3.charCodeAt(r3 - 1) || 95 !== e3.charCodeAt(r3 - 2) || 111 !== e3.charCodeAt(r3 - 3) || 116 !== e3.charCodeAt(r3 - 4) || 111 !== e3.charCodeAt(r3 - 5) || 114 !== e3.charCodeAt(r3 - 6) || 112 !== e3.charCodeAt(r3 - 7) || 95 !== e3.charCodeAt(r3 - 8) || 95 !== e3.charCodeAt(r3 - 9)) return false;
        for (var t3 = r3 - 10; t3 >= 0; t3--) if (36 !== e3.charCodeAt(t3)) return false;
        return true;
      }
      function c2(e3, r3) {
        return e3 === r3 ? 0 : null === e3 ? 1 : null === r3 ? -1 : e3 > r3 ? 1 : -1;
      }
      e2.toSetString = u2 ? s2 : function(e3) {
        return l2(e3) ? "$" + e3 : e3;
      }, e2.fromSetString = u2 ? s2 : function(e3) {
        return l2(e3) ? e3.slice(1) : e3;
      }, e2.compareByOriginalPositions = function(e3, r3, t3) {
        var n3 = c2(e3.source, r3.source);
        return 0 !== n3 || 0 !== (n3 = e3.originalLine - r3.originalLine) || 0 !== (n3 = e3.originalColumn - r3.originalColumn) || t3 || 0 !== (n3 = e3.generatedColumn - r3.generatedColumn) || 0 !== (n3 = e3.generatedLine - r3.generatedLine) ? n3 : c2(e3.name, r3.name);
      }, e2.compareByGeneratedPositionsDeflated = function(e3, r3, t3) {
        var n3 = e3.generatedLine - r3.generatedLine;
        return 0 !== n3 || 0 !== (n3 = e3.generatedColumn - r3.generatedColumn) || t3 || 0 !== (n3 = c2(e3.source, r3.source)) || 0 !== (n3 = e3.originalLine - r3.originalLine) || 0 !== (n3 = e3.originalColumn - r3.originalColumn) ? n3 : c2(e3.name, r3.name);
      }, e2.compareByGeneratedPositionsInflated = function(e3, r3) {
        var t3 = e3.generatedLine - r3.generatedLine;
        return 0 !== t3 || 0 !== (t3 = e3.generatedColumn - r3.generatedColumn) || 0 !== (t3 = c2(e3.source, r3.source)) || 0 !== (t3 = e3.originalLine - r3.originalLine) || 0 !== (t3 = e3.originalColumn - r3.originalColumn) ? t3 : c2(e3.name, r3.name);
      }, e2.parseSourceMapInput = function(e3) {
        return JSON.parse(e3.replace(/^\)]}'[^\n]*\n/, ""));
      }, e2.computeSourceURL = function(e3, r3, t3) {
        if (r3 = r3 || "", e3 && ("/" !== e3[e3.length - 1] && "/" !== r3[0] && (e3 += "/"), r3 = e3 + r3), t3) {
          var u3 = n2(t3);
          if (!u3) throw new Error("sourceMapURL could not be parsed");
          if (u3.path) {
            var s3 = u3.path.lastIndexOf("/");
            s3 >= 0 && (u3.path = u3.path.substring(0, s3 + 1));
          }
          r3 = a2(o2(u3), r3);
        }
        return i2(r3);
      };
    }(Sn)), Sn;
  }
  var kn, Tn = {};
  function Ln() {
    if (kn) return Tn;
    kn = 1;
    var e2 = Rn(), r2 = Object.prototype.hasOwnProperty, t2 = "undefined" != typeof Map;
    function n2() {
      this._array = [], this._set = t2 ? /* @__PURE__ */ new Map() : /* @__PURE__ */ Object.create(null);
    }
    return n2.fromArray = function(e3, r3) {
      for (var t3 = new n2(), o2 = 0, i2 = e3.length; o2 < i2; o2++) t3.add(e3[o2], r3);
      return t3;
    }, n2.prototype.size = function() {
      return t2 ? this._set.size : Object.getOwnPropertyNames(this._set).length;
    }, n2.prototype.add = function(n3, o2) {
      var i2 = t2 ? n3 : e2.toSetString(n3), a2 = t2 ? this.has(n3) : r2.call(this._set, i2), u2 = this._array.length;
      a2 && !o2 || this._array.push(n3), a2 || (t2 ? this._set.set(n3, u2) : this._set[i2] = u2);
    }, n2.prototype.has = function(n3) {
      if (t2) return this._set.has(n3);
      var o2 = e2.toSetString(n3);
      return r2.call(this._set, o2);
    }, n2.prototype.indexOf = function(n3) {
      if (t2) {
        var o2 = this._set.get(n3);
        if (o2 >= 0) return o2;
      } else {
        var i2 = e2.toSetString(n3);
        if (r2.call(this._set, i2)) return this._set[i2];
      }
      throw new Error('"' + n3 + '" is not in the set.');
    }, n2.prototype.at = function(e3) {
      if (e3 >= 0 && e3 < this._array.length) return this._array[e3];
      throw new Error("No element indexed by " + e3);
    }, n2.prototype.toArray = function() {
      return this._array.slice();
    }, Tn.ArraySet = n2, Tn;
  }
  var Dn, _n, Bn = {};
  function qn() {
    if (Dn) return Bn;
    Dn = 1;
    var e2 = Rn();
    function r2() {
      this._array = [], this._sorted = true, this._last = { generatedLine: -1, generatedColumn: 0 };
    }
    return r2.prototype.unsortedForEach = function(e3, r3) {
      this._array.forEach(e3, r3);
    }, r2.prototype.add = function(r3) {
      var t2, n2, o2, i2, a2, u2;
      t2 = this._last, n2 = r3, o2 = t2.generatedLine, i2 = n2.generatedLine, a2 = t2.generatedColumn, u2 = n2.generatedColumn, i2 > o2 || i2 == o2 && u2 >= a2 || e2.compareByGeneratedPositionsInflated(t2, n2) <= 0 ? (this._last = r3, this._array.push(r3)) : (this._sorted = false, this._array.push(r3));
    }, r2.prototype.toArray = function() {
      return this._sorted || (this._array.sort(e2.compareByGeneratedPositionsInflated), this._sorted = true), this._array;
    }, Bn.MappingList = r2, Bn;
  }
  function Pn() {
    if (_n) return An;
    _n = 1;
    var e2 = Cn(), r2 = Rn(), t2 = Ln().ArraySet, n2 = qn().MappingList;
    function o2(e3) {
      e3 || (e3 = {}), this._file = r2.getArg(e3, "file", null), this._sourceRoot = r2.getArg(e3, "sourceRoot", null), this._skipValidation = r2.getArg(e3, "skipValidation", false), this._sources = new t2(), this._names = new t2(), this._mappings = new n2(), this._sourcesContents = null;
    }
    return o2.prototype._version = 3, o2.fromSourceMap = function(e3) {
      var t3 = e3.sourceRoot, n3 = new o2({ file: e3.file, sourceRoot: t3 });
      return e3.eachMapping(function(e4) {
        var o3 = { generated: { line: e4.generatedLine, column: e4.generatedColumn } };
        null != e4.source && (o3.source = e4.source, null != t3 && (o3.source = r2.relative(t3, o3.source)), o3.original = { line: e4.originalLine, column: e4.originalColumn }, null != e4.name && (o3.name = e4.name)), n3.addMapping(o3);
      }), e3.sources.forEach(function(o3) {
        var i2 = o3;
        null !== t3 && (i2 = r2.relative(t3, o3)), n3._sources.has(i2) || n3._sources.add(i2);
        var a2 = e3.sourceContentFor(o3);
        null != a2 && n3.setSourceContent(o3, a2);
      }), n3;
    }, o2.prototype.addMapping = function(e3) {
      var t3 = r2.getArg(e3, "generated"), n3 = r2.getArg(e3, "original", null), o3 = r2.getArg(e3, "source", null), i2 = r2.getArg(e3, "name", null);
      this._skipValidation || this._validateMapping(t3, n3, o3, i2), null != o3 && (o3 = String(o3), this._sources.has(o3) || this._sources.add(o3)), null != i2 && (i2 = String(i2), this._names.has(i2) || this._names.add(i2)), this._mappings.add({ generatedLine: t3.line, generatedColumn: t3.column, originalLine: null != n3 && n3.line, originalColumn: null != n3 && n3.column, source: o3, name: i2 });
    }, o2.prototype.setSourceContent = function(e3, t3) {
      var n3 = e3;
      null != this._sourceRoot && (n3 = r2.relative(this._sourceRoot, n3)), null != t3 ? (this._sourcesContents || (this._sourcesContents = /* @__PURE__ */ Object.create(null)), this._sourcesContents[r2.toSetString(n3)] = t3) : this._sourcesContents && (delete this._sourcesContents[r2.toSetString(n3)], 0 === Object.keys(this._sourcesContents).length && (this._sourcesContents = null));
    }, o2.prototype.applySourceMap = function(e3, n3, o3) {
      var i2 = n3;
      if (null == n3) {
        if (null == e3.file) throw new Error(`SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, or the source map's "file" property. Both were omitted.`);
        i2 = e3.file;
      }
      var a2 = this._sourceRoot;
      null != a2 && (i2 = r2.relative(a2, i2));
      var u2 = new t2(), s2 = new t2();
      this._mappings.unsortedForEach(function(t3) {
        if (t3.source === i2 && null != t3.originalLine) {
          var n4 = e3.originalPositionFor({ line: t3.originalLine, column: t3.originalColumn });
          null != n4.source && (t3.source = n4.source, null != o3 && (t3.source = r2.join(o3, t3.source)), null != a2 && (t3.source = r2.relative(a2, t3.source)), t3.originalLine = n4.line, t3.originalColumn = n4.column, null != n4.name && (t3.name = n4.name));
        }
        var l2 = t3.source;
        null == l2 || u2.has(l2) || u2.add(l2);
        var c2 = t3.name;
        null == c2 || s2.has(c2) || s2.add(c2);
      }, this), this._sources = u2, this._names = s2, e3.sources.forEach(function(t3) {
        var n4 = e3.sourceContentFor(t3);
        null != n4 && (null != o3 && (t3 = r2.join(o3, t3)), null != a2 && (t3 = r2.relative(a2, t3)), this.setSourceContent(t3, n4));
      }, this);
    }, o2.prototype._validateMapping = function(e3, r3, t3, n3) {
      if (r3 && "number" != typeof r3.line && "number" != typeof r3.column) throw new Error("original.line and original.column are not numbers -- you probably meant to omit the original mapping entirely and only map the generated position. If so, pass null for the original mapping instead of an object with empty or null values.");
      if ((!(e3 && "line" in e3 && "column" in e3 && e3.line > 0 && e3.column >= 0) || r3 || t3 || n3) && !(e3 && "line" in e3 && "column" in e3 && r3 && "line" in r3 && "column" in r3 && e3.line > 0 && e3.column >= 0 && r3.line > 0 && r3.column >= 0 && t3)) throw new Error("Invalid mapping: " + JSON.stringify({ generated: e3, source: t3, original: r3, name: n3 }));
    }, o2.prototype._serializeMappings = function() {
      for (var t3, n3, o3, i2, a2 = 0, u2 = 1, s2 = 0, l2 = 0, c2 = 0, p2 = 0, f2 = "", d2 = this._mappings.toArray(), m2 = 0, g2 = d2.length; m2 < g2; m2++) {
        if (t3 = "", (n3 = d2[m2]).generatedLine !== u2) for (a2 = 0; n3.generatedLine !== u2; ) t3 += ";", u2++;
        else if (m2 > 0) {
          if (!r2.compareByGeneratedPositionsInflated(n3, d2[m2 - 1])) continue;
          t3 += ",";
        }
        t3 += e2.encode(n3.generatedColumn - a2), a2 = n3.generatedColumn, null != n3.source && (i2 = this._sources.indexOf(n3.source), t3 += e2.encode(i2 - p2), p2 = i2, t3 += e2.encode(n3.originalLine - 1 - l2), l2 = n3.originalLine - 1, t3 += e2.encode(n3.originalColumn - s2), s2 = n3.originalColumn, null != n3.name && (o3 = this._names.indexOf(n3.name), t3 += e2.encode(o3 - c2), c2 = o3)), f2 += t3;
      }
      return f2;
    }, o2.prototype._generateSourcesContent = function(e3, t3) {
      return e3.map(function(e4) {
        if (!this._sourcesContents) return null;
        null != t3 && (e4 = r2.relative(t3, e4));
        var n3 = r2.toSetString(e4);
        return Object.prototype.hasOwnProperty.call(this._sourcesContents, n3) ? this._sourcesContents[n3] : null;
      }, this);
    }, o2.prototype.toJSON = function() {
      var e3 = { version: this._version, sources: this._sources.toArray(), names: this._names.toArray(), mappings: this._serializeMappings() };
      return null != this._file && (e3.file = this._file), null != this._sourceRoot && (e3.sourceRoot = this._sourceRoot), this._sourcesContents && (e3.sourcesContent = this._generateSourcesContent(e3.sources, e3.sourceRoot)), e3;
    }, o2.prototype.toString = function() {
      return JSON.stringify(this.toJSON());
    }, An.SourceMapGenerator = o2, An;
  }
  var Nn, Un = {}, Fn = {};
  function Vn() {
    return Nn || (Nn = 1, function(e2) {
      function r2(t2, n2, o2, i2, a2, u2) {
        var s2 = Math.floor((n2 - t2) / 2) + t2, l2 = a2(o2, i2[s2], true);
        return 0 === l2 ? s2 : l2 > 0 ? n2 - s2 > 1 ? r2(s2, n2, o2, i2, a2, u2) : u2 == e2.LEAST_UPPER_BOUND ? n2 < i2.length ? n2 : -1 : s2 : s2 - t2 > 1 ? r2(t2, s2, o2, i2, a2, u2) : u2 == e2.LEAST_UPPER_BOUND ? s2 : t2 < 0 ? -1 : t2;
      }
      e2.GREATEST_LOWER_BOUND = 1, e2.LEAST_UPPER_BOUND = 2, e2.search = function(t2, n2, o2, i2) {
        if (0 === n2.length) return -1;
        var a2 = r2(-1, n2.length, t2, n2, o2, i2 || e2.GREATEST_LOWER_BOUND);
        if (a2 < 0) return -1;
        for (; a2 - 1 >= 0 && 0 === o2(n2[a2], n2[a2 - 1], true); ) --a2;
        return a2;
      };
    }(Fn)), Fn;
  }
  var Mn, In, jn = {};
  function $n() {
    if (Mn) return jn;
    function e2(e3, r3, t2) {
      var n2 = e3[r3];
      e3[r3] = e3[t2], e3[t2] = n2;
    }
    function r2(t2, n2, o2, i2) {
      if (o2 < i2) {
        var a2 = o2 - 1;
        e2(t2, (c2 = o2, p2 = i2, Math.round(c2 + Math.random() * (p2 - c2))), i2);
        for (var u2 = t2[i2], s2 = o2; s2 < i2; s2++) n2(t2[s2], u2) <= 0 && e2(t2, a2 += 1, s2);
        e2(t2, a2 + 1, s2);
        var l2 = a2 + 1;
        r2(t2, n2, o2, l2 - 1), r2(t2, n2, l2 + 1, i2);
      }
      var c2, p2;
    }
    return Mn = 1, jn.quickSort = function(e3, t2) {
      r2(e3, t2, 0, e3.length - 1);
    }, jn;
  }
  var Kn, zn, Gn, Hn, Yn, Wn, Qn, Zn, Jn, Xn, eo, ro, to, no, oo, io, ao, uo, so, lo, co, po, fo, mo, go, ho, vo, bo, yo, Eo, Ao, wo, Oo, Co, xo, So, Ro, ko, To, Lo, Do, _o, Bo, qo, Po, No = {};
  function Uo() {
    return zn || (zn = 1, En.SourceMapGenerator = Pn().SourceMapGenerator, En.SourceMapConsumer = function() {
      if (In) return Un;
      In = 1;
      var e2 = Rn(), r2 = Vn(), t2 = Ln().ArraySet, n2 = Cn(), o2 = $n().quickSort;
      function i2(r3, t3) {
        var n3 = r3;
        return "string" == typeof r3 && (n3 = e2.parseSourceMapInput(r3)), null != n3.sections ? new s2(n3, t3) : new a2(n3, t3);
      }
      function a2(r3, n3) {
        var o3 = r3;
        "string" == typeof r3 && (o3 = e2.parseSourceMapInput(r3));
        var i3 = e2.getArg(o3, "version"), a3 = e2.getArg(o3, "sources"), u3 = e2.getArg(o3, "names", []), s3 = e2.getArg(o3, "sourceRoot", null), l2 = e2.getArg(o3, "sourcesContent", null), c2 = e2.getArg(o3, "mappings"), p2 = e2.getArg(o3, "file", null);
        if (i3 != this._version) throw new Error("Unsupported version: " + i3);
        s3 && (s3 = e2.normalize(s3)), a3 = a3.map(String).map(e2.normalize).map(function(r4) {
          return s3 && e2.isAbsolute(s3) && e2.isAbsolute(r4) ? e2.relative(s3, r4) : r4;
        }), this._names = t2.fromArray(u3.map(String), true), this._sources = t2.fromArray(a3, true), this._absoluteSources = this._sources.toArray().map(function(r4) {
          return e2.computeSourceURL(s3, r4, n3);
        }), this.sourceRoot = s3, this.sourcesContent = l2, this._mappings = c2, this._sourceMapURL = n3, this.file = p2;
      }
      function u2() {
        this.generatedLine = 0, this.generatedColumn = 0, this.source = null, this.originalLine = null, this.originalColumn = null, this.name = null;
      }
      function s2(r3, n3) {
        var o3 = r3;
        "string" == typeof r3 && (o3 = e2.parseSourceMapInput(r3));
        var a3 = e2.getArg(o3, "version"), u3 = e2.getArg(o3, "sections");
        if (a3 != this._version) throw new Error("Unsupported version: " + a3);
        this._sources = new t2(), this._names = new t2();
        var s3 = { line: -1, column: 0 };
        this._sections = u3.map(function(r4) {
          if (r4.url) throw new Error("Support for url field in sections not implemented.");
          var t3 = e2.getArg(r4, "offset"), o4 = e2.getArg(t3, "line"), a4 = e2.getArg(t3, "column");
          if (o4 < s3.line || o4 === s3.line && a4 < s3.column) throw new Error("Section offsets must be ordered and non-overlapping.");
          return s3 = t3, { generatedOffset: { generatedLine: o4 + 1, generatedColumn: a4 + 1 }, consumer: new i2(e2.getArg(r4, "map"), n3) };
        });
      }
      return i2.fromSourceMap = function(e3, r3) {
        return a2.fromSourceMap(e3, r3);
      }, i2.prototype._version = 3, i2.prototype.__generatedMappings = null, Object.defineProperty(i2.prototype, "_generatedMappings", { configurable: true, enumerable: true, get: function() {
        return this.__generatedMappings || this._parseMappings(this._mappings, this.sourceRoot), this.__generatedMappings;
      } }), i2.prototype.__originalMappings = null, Object.defineProperty(i2.prototype, "_originalMappings", { configurable: true, enumerable: true, get: function() {
        return this.__originalMappings || this._parseMappings(this._mappings, this.sourceRoot), this.__originalMappings;
      } }), i2.prototype._charIsMappingSeparator = function(e3, r3) {
        var t3 = e3.charAt(r3);
        return ";" === t3 || "," === t3;
      }, i2.prototype._parseMappings = function(e3, r3) {
        throw new Error("Subclasses must implement _parseMappings");
      }, i2.GENERATED_ORDER = 1, i2.ORIGINAL_ORDER = 2, i2.GREATEST_LOWER_BOUND = 1, i2.LEAST_UPPER_BOUND = 2, i2.prototype.eachMapping = function(r3, t3, n3) {
        var o3, a3 = t3 || null;
        switch (n3 || i2.GENERATED_ORDER) {
          case i2.GENERATED_ORDER:
            o3 = this._generatedMappings;
            break;
          case i2.ORIGINAL_ORDER:
            o3 = this._originalMappings;
            break;
          default:
            throw new Error("Unknown order of iteration.");
        }
        var u3 = this.sourceRoot;
        o3.map(function(r4) {
          var t4 = null === r4.source ? null : this._sources.at(r4.source);
          return { source: t4 = e2.computeSourceURL(u3, t4, this._sourceMapURL), generatedLine: r4.generatedLine, generatedColumn: r4.generatedColumn, originalLine: r4.originalLine, originalColumn: r4.originalColumn, name: null === r4.name ? null : this._names.at(r4.name) };
        }, this).forEach(r3, a3);
      }, i2.prototype.allGeneratedPositionsFor = function(t3) {
        var n3 = e2.getArg(t3, "line"), o3 = { source: e2.getArg(t3, "source"), originalLine: n3, originalColumn: e2.getArg(t3, "column", 0) };
        if (o3.source = this._findSourceIndex(o3.source), o3.source < 0) return [];
        var i3 = [], a3 = this._findMapping(o3, this._originalMappings, "originalLine", "originalColumn", e2.compareByOriginalPositions, r2.LEAST_UPPER_BOUND);
        if (a3 >= 0) {
          var u3 = this._originalMappings[a3];
          if (void 0 === t3.column) for (var s3 = u3.originalLine; u3 && u3.originalLine === s3; ) i3.push({ line: e2.getArg(u3, "generatedLine", null), column: e2.getArg(u3, "generatedColumn", null), lastColumn: e2.getArg(u3, "lastGeneratedColumn", null) }), u3 = this._originalMappings[++a3];
          else for (var l2 = u3.originalColumn; u3 && u3.originalLine === n3 && u3.originalColumn == l2; ) i3.push({ line: e2.getArg(u3, "generatedLine", null), column: e2.getArg(u3, "generatedColumn", null), lastColumn: e2.getArg(u3, "lastGeneratedColumn", null) }), u3 = this._originalMappings[++a3];
        }
        return i3;
      }, Un.SourceMapConsumer = i2, a2.prototype = Object.create(i2.prototype), a2.prototype.consumer = i2, a2.prototype._findSourceIndex = function(r3) {
        var t3, n3 = r3;
        if (null != this.sourceRoot && (n3 = e2.relative(this.sourceRoot, n3)), this._sources.has(n3)) return this._sources.indexOf(n3);
        for (t3 = 0; t3 < this._absoluteSources.length; ++t3) if (this._absoluteSources[t3] == r3) return t3;
        return -1;
      }, a2.fromSourceMap = function(r3, n3) {
        var i3 = Object.create(a2.prototype), s3 = i3._names = t2.fromArray(r3._names.toArray(), true), l2 = i3._sources = t2.fromArray(r3._sources.toArray(), true);
        i3.sourceRoot = r3._sourceRoot, i3.sourcesContent = r3._generateSourcesContent(i3._sources.toArray(), i3.sourceRoot), i3.file = r3._file, i3._sourceMapURL = n3, i3._absoluteSources = i3._sources.toArray().map(function(r4) {
          return e2.computeSourceURL(i3.sourceRoot, r4, n3);
        });
        for (var c2 = r3._mappings.toArray().slice(), p2 = i3.__generatedMappings = [], f2 = i3.__originalMappings = [], d2 = 0, m2 = c2.length; d2 < m2; d2++) {
          var g2 = c2[d2], h2 = new u2();
          h2.generatedLine = g2.generatedLine, h2.generatedColumn = g2.generatedColumn, g2.source && (h2.source = l2.indexOf(g2.source), h2.originalLine = g2.originalLine, h2.originalColumn = g2.originalColumn, g2.name && (h2.name = s3.indexOf(g2.name)), f2.push(h2)), p2.push(h2);
        }
        return o2(i3.__originalMappings, e2.compareByOriginalPositions), i3;
      }, a2.prototype._version = 3, Object.defineProperty(a2.prototype, "sources", { get: function() {
        return this._absoluteSources.slice();
      } }), a2.prototype._parseMappings = function(r3, t3) {
        for (var i3, a3, s3, l2, c2, p2 = 1, f2 = 0, d2 = 0, m2 = 0, g2 = 0, h2 = 0, v2 = r3.length, b2 = 0, y2 = {}, E2 = {}, A2 = [], w2 = []; b2 < v2; ) if (";" === r3.charAt(b2)) p2++, b2++, f2 = 0;
        else if ("," === r3.charAt(b2)) b2++;
        else {
          for ((i3 = new u2()).generatedLine = p2, l2 = b2; l2 < v2 && !this._charIsMappingSeparator(r3, l2); l2++) ;
          if (s3 = y2[a3 = r3.slice(b2, l2)]) b2 += a3.length;
          else {
            for (s3 = []; b2 < l2; ) n2.decode(r3, b2, E2), c2 = E2.value, b2 = E2.rest, s3.push(c2);
            if (2 === s3.length) throw new Error("Found a source, but no line and column");
            if (3 === s3.length) throw new Error("Found a source and line, but no column");
            y2[a3] = s3;
          }
          i3.generatedColumn = f2 + s3[0], f2 = i3.generatedColumn, s3.length > 1 && (i3.source = g2 + s3[1], g2 += s3[1], i3.originalLine = d2 + s3[2], d2 = i3.originalLine, i3.originalLine += 1, i3.originalColumn = m2 + s3[3], m2 = i3.originalColumn, s3.length > 4 && (i3.name = h2 + s3[4], h2 += s3[4])), w2.push(i3), "number" == typeof i3.originalLine && A2.push(i3);
        }
        o2(w2, e2.compareByGeneratedPositionsDeflated), this.__generatedMappings = w2, o2(A2, e2.compareByOriginalPositions), this.__originalMappings = A2;
      }, a2.prototype._findMapping = function(e3, t3, n3, o3, i3, a3) {
        if (e3[n3] <= 0) throw new TypeError("Line must be greater than or equal to 1, got " + e3[n3]);
        if (e3[o3] < 0) throw new TypeError("Column must be greater than or equal to 0, got " + e3[o3]);
        return r2.search(e3, t3, i3, a3);
      }, a2.prototype.computeColumnSpans = function() {
        for (var e3 = 0; e3 < this._generatedMappings.length; ++e3) {
          var r3 = this._generatedMappings[e3];
          if (e3 + 1 < this._generatedMappings.length) {
            var t3 = this._generatedMappings[e3 + 1];
            if (r3.generatedLine === t3.generatedLine) {
              r3.lastGeneratedColumn = t3.generatedColumn - 1;
              continue;
            }
          }
          r3.lastGeneratedColumn = 1 / 0;
        }
      }, a2.prototype.originalPositionFor = function(r3) {
        var t3 = { generatedLine: e2.getArg(r3, "line"), generatedColumn: e2.getArg(r3, "column") }, n3 = this._findMapping(t3, this._generatedMappings, "generatedLine", "generatedColumn", e2.compareByGeneratedPositionsDeflated, e2.getArg(r3, "bias", i2.GREATEST_LOWER_BOUND));
        if (n3 >= 0) {
          var o3 = this._generatedMappings[n3];
          if (o3.generatedLine === t3.generatedLine) {
            var a3 = e2.getArg(o3, "source", null);
            null !== a3 && (a3 = this._sources.at(a3), a3 = e2.computeSourceURL(this.sourceRoot, a3, this._sourceMapURL));
            var u3 = e2.getArg(o3, "name", null);
            return null !== u3 && (u3 = this._names.at(u3)), { source: a3, line: e2.getArg(o3, "originalLine", null), column: e2.getArg(o3, "originalColumn", null), name: u3 };
          }
        }
        return { source: null, line: null, column: null, name: null };
      }, a2.prototype.hasContentsOfAllSources = function() {
        return !!this.sourcesContent && this.sourcesContent.length >= this._sources.size() && !this.sourcesContent.some(function(e3) {
          return null == e3;
        });
      }, a2.prototype.sourceContentFor = function(r3, t3) {
        if (!this.sourcesContent) return null;
        var n3 = this._findSourceIndex(r3);
        if (n3 >= 0) return this.sourcesContent[n3];
        var o3, i3 = r3;
        if (null != this.sourceRoot && (i3 = e2.relative(this.sourceRoot, i3)), null != this.sourceRoot && (o3 = e2.urlParse(this.sourceRoot))) {
          var a3 = i3.replace(/^file:\/\//, "");
          if ("file" == o3.scheme && this._sources.has(a3)) return this.sourcesContent[this._sources.indexOf(a3)];
          if ((!o3.path || "/" == o3.path) && this._sources.has("/" + i3)) return this.sourcesContent[this._sources.indexOf("/" + i3)];
        }
        if (t3) return null;
        throw new Error('"' + i3 + '" is not in the SourceMap.');
      }, a2.prototype.generatedPositionFor = function(r3) {
        var t3 = e2.getArg(r3, "source");
        if ((t3 = this._findSourceIndex(t3)) < 0) return { line: null, column: null, lastColumn: null };
        var n3 = { source: t3, originalLine: e2.getArg(r3, "line"), originalColumn: e2.getArg(r3, "column") }, o3 = this._findMapping(n3, this._originalMappings, "originalLine", "originalColumn", e2.compareByOriginalPositions, e2.getArg(r3, "bias", i2.GREATEST_LOWER_BOUND));
        if (o3 >= 0) {
          var a3 = this._originalMappings[o3];
          if (a3.source === n3.source) return { line: e2.getArg(a3, "generatedLine", null), column: e2.getArg(a3, "generatedColumn", null), lastColumn: e2.getArg(a3, "lastGeneratedColumn", null) };
        }
        return { line: null, column: null, lastColumn: null };
      }, Un.BasicSourceMapConsumer = a2, s2.prototype = Object.create(i2.prototype), s2.prototype.constructor = i2, s2.prototype._version = 3, Object.defineProperty(s2.prototype, "sources", { get: function() {
        for (var e3 = [], r3 = 0; r3 < this._sections.length; r3++) for (var t3 = 0; t3 < this._sections[r3].consumer.sources.length; t3++) e3.push(this._sections[r3].consumer.sources[t3]);
        return e3;
      } }), s2.prototype.originalPositionFor = function(t3) {
        var n3 = { generatedLine: e2.getArg(t3, "line"), generatedColumn: e2.getArg(t3, "column") }, o3 = r2.search(n3, this._sections, function(e3, r3) {
          return e3.generatedLine - r3.generatedOffset.generatedLine || e3.generatedColumn - r3.generatedOffset.generatedColumn;
        }), i3 = this._sections[o3];
        return i3 ? i3.consumer.originalPositionFor({ line: n3.generatedLine - (i3.generatedOffset.generatedLine - 1), column: n3.generatedColumn - (i3.generatedOffset.generatedLine === n3.generatedLine ? i3.generatedOffset.generatedColumn - 1 : 0), bias: t3.bias }) : { source: null, line: null, column: null, name: null };
      }, s2.prototype.hasContentsOfAllSources = function() {
        return this._sections.every(function(e3) {
          return e3.consumer.hasContentsOfAllSources();
        });
      }, s2.prototype.sourceContentFor = function(e3, r3) {
        for (var t3 = 0; t3 < this._sections.length; t3++) {
          var n3 = this._sections[t3].consumer.sourceContentFor(e3, true);
          if (n3) return n3;
        }
        if (r3) return null;
        throw new Error('"' + e3 + '" is not in the SourceMap.');
      }, s2.prototype.generatedPositionFor = function(r3) {
        for (var t3 = 0; t3 < this._sections.length; t3++) {
          var n3 = this._sections[t3];
          if (-1 !== n3.consumer._findSourceIndex(e2.getArg(r3, "source"))) {
            var o3 = n3.consumer.generatedPositionFor(r3);
            if (o3) return { line: o3.line + (n3.generatedOffset.generatedLine - 1), column: o3.column + (n3.generatedOffset.generatedLine === o3.line ? n3.generatedOffset.generatedColumn - 1 : 0) };
          }
        }
        return { line: null, column: null };
      }, s2.prototype._parseMappings = function(r3, t3) {
        this.__generatedMappings = [], this.__originalMappings = [];
        for (var n3 = 0; n3 < this._sections.length; n3++) for (var i3 = this._sections[n3], a3 = i3.consumer._generatedMappings, u3 = 0; u3 < a3.length; u3++) {
          var s3 = a3[u3], l2 = i3.consumer._sources.at(s3.source);
          l2 = e2.computeSourceURL(i3.consumer.sourceRoot, l2, this._sourceMapURL), this._sources.add(l2), l2 = this._sources.indexOf(l2);
          var c2 = null;
          s3.name && (c2 = i3.consumer._names.at(s3.name), this._names.add(c2), c2 = this._names.indexOf(c2));
          var p2 = { source: l2, generatedLine: s3.generatedLine + (i3.generatedOffset.generatedLine - 1), generatedColumn: s3.generatedColumn + (i3.generatedOffset.generatedLine === s3.generatedLine ? i3.generatedOffset.generatedColumn - 1 : 0), originalLine: s3.originalLine, originalColumn: s3.originalColumn, name: c2 };
          this.__generatedMappings.push(p2), "number" == typeof p2.originalLine && this.__originalMappings.push(p2);
        }
        o2(this.__generatedMappings, e2.compareByGeneratedPositionsDeflated), o2(this.__originalMappings, e2.compareByOriginalPositions);
      }, Un.IndexedSourceMapConsumer = s2, Un;
    }().SourceMapConsumer, En.SourceNode = function() {
      if (Kn) return No;
      Kn = 1;
      var e2 = Pn().SourceMapGenerator, r2 = Rn(), t2 = /(\r?\n)/, n2 = "$$$isSourceNode$$$";
      function o2(e3, r3, t3, o3, i2) {
        this.children = [], this.sourceContents = {}, this.line = null == e3 ? null : e3, this.column = null == r3 ? null : r3, this.source = null == t3 ? null : t3, this.name = null == i2 ? null : i2, this[n2] = true, null != o3 && this.add(o3);
      }
      return o2.fromStringWithSourceMap = function(e3, n3, i2) {
        var a2 = new o2(), u2 = e3.split(t2), s2 = 0, l2 = function() {
          return e4() + (e4() || "");
          function e4() {
            return s2 < u2.length ? u2[s2++] : void 0;
          }
        }, c2 = 1, p2 = 0, f2 = null;
        return n3.eachMapping(function(e4) {
          if (null !== f2) {
            if (!(c2 < e4.generatedLine)) {
              var r3 = (t3 = u2[s2] || "").substr(0, e4.generatedColumn - p2);
              return u2[s2] = t3.substr(e4.generatedColumn - p2), p2 = e4.generatedColumn, d2(f2, r3), void (f2 = e4);
            }
            d2(f2, l2()), c2++, p2 = 0;
          }
          for (; c2 < e4.generatedLine; ) a2.add(l2()), c2++;
          if (p2 < e4.generatedColumn) {
            var t3 = u2[s2] || "";
            a2.add(t3.substr(0, e4.generatedColumn)), u2[s2] = t3.substr(e4.generatedColumn), p2 = e4.generatedColumn;
          }
          f2 = e4;
        }, this), s2 < u2.length && (f2 && d2(f2, l2()), a2.add(u2.splice(s2).join(""))), n3.sources.forEach(function(e4) {
          var t3 = n3.sourceContentFor(e4);
          null != t3 && (null != i2 && (e4 = r2.join(i2, e4)), a2.setSourceContent(e4, t3));
        }), a2;
        function d2(e4, t3) {
          if (null === e4 || void 0 === e4.source) a2.add(t3);
          else {
            var n4 = i2 ? r2.join(i2, e4.source) : e4.source;
            a2.add(new o2(e4.originalLine, e4.originalColumn, n4, t3, e4.name));
          }
        }
      }, o2.prototype.add = function(e3) {
        if (Array.isArray(e3)) e3.forEach(function(e4) {
          this.add(e4);
        }, this);
        else {
          if (!e3[n2] && "string" != typeof e3) throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + e3);
          e3 && this.children.push(e3);
        }
        return this;
      }, o2.prototype.prepend = function(e3) {
        if (Array.isArray(e3)) for (var r3 = e3.length - 1; r3 >= 0; r3--) this.prepend(e3[r3]);
        else {
          if (!e3[n2] && "string" != typeof e3) throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + e3);
          this.children.unshift(e3);
        }
        return this;
      }, o2.prototype.walk = function(e3) {
        for (var r3, t3 = 0, o3 = this.children.length; t3 < o3; t3++) (r3 = this.children[t3])[n2] ? r3.walk(e3) : "" !== r3 && e3(r3, { source: this.source, line: this.line, column: this.column, name: this.name });
      }, o2.prototype.join = function(e3) {
        var r3, t3, n3 = this.children.length;
        if (n3 > 0) {
          for (r3 = [], t3 = 0; t3 < n3 - 1; t3++) r3.push(this.children[t3]), r3.push(e3);
          r3.push(this.children[t3]), this.children = r3;
        }
        return this;
      }, o2.prototype.replaceRight = function(e3, r3) {
        var t3 = this.children[this.children.length - 1];
        return t3[n2] ? t3.replaceRight(e3, r3) : "string" == typeof t3 ? this.children[this.children.length - 1] = t3.replace(e3, r3) : this.children.push("".replace(e3, r3)), this;
      }, o2.prototype.setSourceContent = function(e3, t3) {
        this.sourceContents[r2.toSetString(e3)] = t3;
      }, o2.prototype.walkSourceContents = function(e3) {
        for (var t3 = 0, o3 = this.children.length; t3 < o3; t3++) this.children[t3][n2] && this.children[t3].walkSourceContents(e3);
        var i2 = Object.keys(this.sourceContents);
        for (t3 = 0, o3 = i2.length; t3 < o3; t3++) e3(r2.fromSetString(i2[t3]), this.sourceContents[i2[t3]]);
      }, o2.prototype.toString = function() {
        var e3 = "";
        return this.walk(function(r3) {
          e3 += r3;
        }), e3;
      }, o2.prototype.toStringWithSourceMap = function(r3) {
        var t3 = { code: "", line: 1, column: 0 }, n3 = new e2(r3), o3 = false, i2 = null, a2 = null, u2 = null, s2 = null;
        return this.walk(function(e3, r4) {
          t3.code += e3, null !== r4.source && null !== r4.line && null !== r4.column ? (i2 === r4.source && a2 === r4.line && u2 === r4.column && s2 === r4.name || n3.addMapping({ source: r4.source, original: { line: r4.line, column: r4.column }, generated: { line: t3.line, column: t3.column }, name: r4.name }), i2 = r4.source, a2 = r4.line, u2 = r4.column, s2 = r4.name, o3 = true) : o3 && (n3.addMapping({ generated: { line: t3.line, column: t3.column } }), i2 = null, o3 = false);
          for (var l2 = 0, c2 = e3.length; l2 < c2; l2++) 10 === e3.charCodeAt(l2) ? (t3.line++, t3.column = 0, l2 + 1 === c2 ? (i2 = null, o3 = false) : o3 && n3.addMapping({ source: r4.source, original: { line: r4.line, column: r4.column }, generated: { line: t3.line, column: t3.column }, name: r4.name })) : t3.column++;
        }), this.walkSourceContents(function(e3, r4) {
          n3.setSourceContent(e3, r4);
        }), { code: t3.code, map: n3 };
      }, No.SourceNode = o2, No;
    }().SourceNode), En;
  }
  function Fo() {
    if (Wn) return Yn;
    Wn = 1;
    var e2 = /^(\w+:\/\/|\/\/)/;
    return Yn = function(r2) {
      return e2.test(r2);
    };
  }
  function Vo() {
    if (Zn) return Qn;
    Zn = 1;
    var e2 = /^\/\//;
    return Qn = function(r2) {
      return !e2.test(r2);
    };
  }
  function Mo() {
    if (Xn) return Jn;
    Xn = 1;
    var e2 = i, r2 = o, t2 = Fo(), n2 = Vo(), a2 = "http:";
    function u2(e3) {
      return t2(e3) || r2.parse(a2 + "//" + e3).host == e3;
    }
    return Jn = function t3(o2, i2, s2) {
      var l2, c2, p2, f2, d2, m2, g2 = !i2;
      if (0 === s2.length) return false;
      for (i2 && !n2(o2) && (o2 = a2 + o2), l2 = i2 ? r2.parse(o2).host : o2, c2 = i2 ? o2 : e2.resolve(o2), m2 = 0; m2 < s2.length; m2++) f2 = "!" == (p2 = s2[m2])[0], d2 = p2.substring(1), g2 = f2 && i2 && u2(d2) ? g2 && !t3(o2, true, [d2]) : !f2 || i2 || u2(d2) ? f2 ? g2 && true : "all" == p2 || (i2 && "local" == p2 ? g2 || false : !(!i2 || "remote" != p2) || !(!i2 && "remote" == p2) && (!i2 && "local" == p2 || (p2 === l2 || (p2 === o2 || (!(!i2 || 0 !== c2.indexOf(p2)) || (!i2 && 0 === c2.indexOf(e2.resolve(p2)) || i2 != u2(d2) && (g2 && true))))))) : g2 && !t3(o2, false, [d2]);
      return g2;
    }, Jn;
  }
  function Io() {
    if (no) return to;
    no = 1;
    var e2 = i;
    return to = function(r2, t2, n2) {
      var o2 = e2.resolve(""), i2 = e2.resolve(o2, t2), a2 = e2.dirname(i2);
      return r2.sources = r2.sources.map(function(r3) {
        return e2.relative(n2, e2.resolve(a2, r3));
      }), r2;
    };
  }
  function jo() {
    if (io) return oo;
    io = 1;
    var e2 = i, r2 = o;
    return oo = function(t2, n2) {
      var o2 = e2.dirname(n2);
      return t2.sources = t2.sources.map(function(e3) {
        return r2.resolve(o2, e3);
      }), t2;
    };
  }
  function $o() {
    if (lo) return so;
    lo = 1;
    var r2 = e, t2 = i, n2 = Mo(), o2 = function() {
      if (ro) return eo;
      ro = 1;
      var e2 = /^data:(\S*?)?(;charset=[^;]+)?(;[^,]+?)?,(.+)/;
      return eo = function(r3) {
        return e2.exec(r3);
      };
    }(), a2 = Io(), u2 = jo(), l2 = Pt(), c2 = Vo(), p2 = function() {
      if (uo) return ao;
      uo = 1;
      var e2 = /^data:(\S*?)?(;charset=[^;]+)?(;[^,]+?)?,(.+)/;
      return ao = function(r3) {
        return e2.test(r3);
      };
    }(), f2 = Fo(), d2 = /^\/\*# sourceMappingURL=(\S+) \*\/$/;
    function m2(e2) {
      var r3, t3, n3, o3 = [], i2 = g2(e2.sourceTokens[0]);
      for (n3 = e2.sourceTokens.length; e2.index < n3; e2.index++) if ((r3 = g2(t3 = e2.sourceTokens[e2.index])) != i2 && (o3 = [], i2 = r3), o3.push(t3), e2.processedTokens.push(t3), t3[0] == l2.COMMENT && d2.test(t3[1])) return h2(t3[1], r3, o3, e2);
      return e2.callback(e2.processedTokens);
    }
    function g2(e2) {
      return (e2[0] == l2.AT_RULE || e2[0] == l2.COMMENT ? e2[2][0] : e2[1][0][2][0])[2];
    }
    function h2(e2, i2, l3, g3) {
      return function(e3, i3, l4) {
        var m3, g4, h3, v3 = d2.exec(e3)[1];
        return p2(v3) ? (g4 = function(e4) {
          var r3 = o2(e4), t3 = r3[2] ? r3[2].split(/[=;]/)[2] : "us-ascii", n3 = r3[3] ? r3[3].split(";")[1] : "utf8", i4 = "utf8" == n3 ? s.unescape(r3[4]) : r3[4], a3 = new Buffer(i4, n3);
          return a3.charset = t3, JSON.parse(a3.toString());
        }(v3), l4(g4)) : f2(v3) ? function(e4, r3, t3) {
          var o3 = n2(e4, true, r3.inline), i4 = !c2(e4);
          if (r3.localOnly) return r3.warnings.push('Cannot fetch remote resource from "' + e4 + '" as no callback given.'), t3(null);
          if (i4) return r3.warnings.push('Cannot fetch "' + e4 + '" as no protocol given.'), t3(null);
          if (!o3) return r3.warnings.push('Cannot fetch "' + e4 + '" as resource is not allowed.'), t3(null);
          r3.fetch(e4, r3.inlineRequest, r3.inlineTimeout, function(n3, o4) {
            if (n3) return r3.warnings.push('Missing source map at "' + e4 + '" - ' + n3), t3(null);
            t3(o4);
          });
        }(v3, i3, function(e4) {
          var r3;
          e4 ? (r3 = JSON.parse(e4), h3 = u2(r3, v3), l4(h3)) : l4(null);
        }) : (g4 = function(e4, t3) {
          var o3, i4 = n2(e4, false, t3.inline);
          if (!r2.existsSync(e4) || !r2.statSync(e4).isFile()) return t3.warnings.push('Ignoring local source map at "' + e4 + '" as resource is missing.'), null;
          if (!i4) return t3.warnings.push('Cannot fetch "' + e4 + '" as resource is not allowed.'), null;
          return o3 = r2.readFileSync(e4, "utf-8"), JSON.parse(o3);
        }(m3 = t2.resolve(i3.rebaseTo, v3), i3), g4 ? (h3 = a2(g4, m3, i3.rebaseTo), l4(h3)) : l4(null));
      }(e2, g3, function(e3) {
        return e3 && (g3.inputSourceMapTracker.track(i2, e3), v2(l3, g3.inputSourceMapTracker)), g3.index++, m2(g3);
      });
    }
    function v2(e2, r3) {
      var t3, n3, o3;
      for (n3 = 0, o3 = e2.length; n3 < o3; n3++) switch ((t3 = e2[n3])[0]) {
        case l2.AT_RULE:
          b2(t3, r3);
          break;
        case l2.AT_RULE_BLOCK:
          v2(t3[1], r3), v2(t3[2], r3);
          break;
        case l2.AT_RULE_BLOCK_SCOPE:
          b2(t3, r3);
          break;
        case l2.NESTED_BLOCK:
          v2(t3[1], r3), v2(t3[2], r3);
          break;
        case l2.NESTED_BLOCK_SCOPE:
        case l2.COMMENT:
          b2(t3, r3);
          break;
        case l2.PROPERTY:
          v2(t3, r3);
          break;
        case l2.PROPERTY_BLOCK:
          v2(t3[1], r3);
          break;
        case l2.PROPERTY_NAME:
        case l2.PROPERTY_VALUE:
          b2(t3, r3);
          break;
        case l2.RULE:
          v2(t3[1], r3), v2(t3[2], r3);
          break;
        case l2.RULE_SCOPE:
          b2(t3, r3);
      }
      return e2;
    }
    function b2(e2, r3) {
      var t3, n3, o3 = e2[1], i2 = e2[2], a3 = [];
      for (t3 = 0, n3 = i2.length; t3 < n3; t3++) a3.push(r3.originalPositionFor(i2[t3], o3.length));
      e2[2] = a3;
    }
    return so = function(e2, r3, t3) {
      var n3 = { callback: t3, fetch: r3.options.fetch, index: 0, inline: r3.options.inline, inlineRequest: r3.options.inlineRequest, inlineTimeout: r3.options.inlineTimeout, inputSourceMapTracker: r3.inputSourceMapTracker, localOnly: r3.localOnly, processedTokens: [], rebaseTo: r3.options.rebaseTo, sourceTokens: e2, warnings: r3.warnings };
      return r3.options.sourceMap && e2.length > 0 ? m2(n3) : t3(e2);
    };
  }
  function Ko() {
    if (po) return co;
    po = 1;
    var e2 = Vt(), r2 = /^\(/, t2 = /\)$/, n2 = /^@import/i, o2 = /['"]\s*/, i2 = /\s*['"]/, a2 = /^url\(\s*/i, u2 = /\s*\)/i;
    return co = function(s2) {
      var l2, c2;
      return l2 = s2.replace(n2, "").trim().replace(a2, "(").replace(u2, ")").replace(o2, "").replace(i2, ""), [(c2 = e2(l2, " "))[0].replace(r2, "").replace(t2, ""), c2.slice(1).join(" ")];
    };
  }
  function zo() {
    if (mo) return fo;
    mo = 1;
    var r2 = e, t2 = i, n2 = Mo(), o2 = Vo(), a2 = Fo();
    function u2(e2) {
      var r3, t3, n3, o3, i2, a3 = {};
      for (n3 in e2) for (o3 = 0, i2 = (r3 = e2[n3]).sources.length; o3 < i2; o3++) t3 = r3.sources[o3], n3 = r3.sourceContentFor(t3, true), a3[t3] = n3;
      return a3;
    }
    function s2(e2) {
      var r3, t3, n3, o3 = Object.keys(e2.uriToSource);
      for (n3 = o3.length; e2.index < n3; e2.index++) {
        if (r3 = o3[e2.index], !(t3 = e2.uriToSource[r3])) return l2(r3, e2);
        e2.sourcesContent[r3] = t3;
      }
      return e2.callback();
    }
    function l2(e2, i2) {
      var u3;
      return a2(e2) ? function(e3, r3, t3) {
        var i3 = n2(e3, true, r3.inline), a3 = !o2(e3);
        if (r3.localOnly) return r3.warnings.push('Cannot fetch remote resource from "' + e3 + '" as no callback given.'), t3(null);
        if (a3) return r3.warnings.push('Cannot fetch "' + e3 + '" as no protocol given.'), t3(null);
        if (!i3) return r3.warnings.push('Cannot fetch "' + e3 + '" as resource is not allowed.'), t3(null);
        r3.fetch(e3, r3.inlineRequest, r3.inlineTimeout, function(n3, o3) {
          n3 && r3.warnings.push('Missing original source at "' + e3 + '" - ' + n3), t3(o3);
        });
      }(e2, i2, function(r3) {
        return i2.index++, i2.sourcesContent[e2] = r3, s2(i2);
      }) : (u3 = function(e3, o3) {
        var i3 = n2(e3, false, o3.inline), a3 = t2.resolve(o3.rebaseTo, e3);
        if (!r2.existsSync(a3) || !r2.statSync(a3).isFile()) return o3.warnings.push('Ignoring local source map at "' + a3 + '" as resource is missing.'), null;
        if (!i3) return o3.warnings.push('Cannot fetch "' + a3 + '" as resource is not allowed.'), null;
        return r2.readFileSync(a3, "utf8");
      }(e2, i2), i2.index++, i2.sourcesContent[e2] = u3, s2(i2));
    }
    return fo = function(e2, r3) {
      var t3 = { callback: r3, fetch: e2.options.fetch, index: 0, inline: e2.options.inline, inlineRequest: e2.options.inlineRequest, inlineTimeout: e2.options.inlineTimeout, localOnly: e2.localOnly, rebaseTo: e2.options.rebaseTo, sourcesContent: e2.sourcesContent, uriToSource: u2(e2.inputSourceMapTracker.all()), warnings: e2.warnings };
      return e2.options.sourceMap && e2.options.sourceMapInlineSources ? s2(t3) : r3();
    };
  }
  function Go() {
    if (bo) return vo;
    return bo = 1, vo = function(e2, r2) {
      return ("@import " + e2 + " " + r2).trim();
    };
  }
  function Ho() {
    if (Eo) return yo;
    Eo = 1;
    var e2 = i, r2 = o, t2 = "'", n2 = /^["']/, a2 = /["']$/, u2 = /[\(\)]/, s2 = /^url\(/i, l2 = /\)$/, c2 = /\s/, p2 = "win32" == process.platform;
    function f2(t3, n3) {
      return n3 ? function(r3) {
        return e2.isAbsolute(r3);
      }(t3) && !d2(n3.toBase) || d2(t3) || function(e3) {
        return "#" == e3[0];
      }(t3) || function(e3) {
        return /^\w+:\w+/.test(e3);
      }(t3) ? t3 : function(e3) {
        return 0 === e3.indexOf("data:");
      }(t3) ? "'" + t3 + "'" : d2(n3.toBase) ? r2.resolve(n3.toBase, t3) : n3.absolute ? m2(function(r3, t4) {
        return e2.resolve(e2.join(t4.fromBase || "", r3)).replace(t4.toBase, "");
      }(t3, n3)) : m2(function(r3, t4) {
        return e2.relative(t4.toBase, e2.join(t4.fromBase || "", r3));
      }(t3, n3)) : t3;
    }
    function d2(e3) {
      return /^[^:]+?:\/\//.test(e3) || 0 === e3.indexOf("//");
    }
    function m2(e3) {
      return p2 ? e3.replace(/\\/g, "/") : e3;
    }
    function g2(e3) {
      return e3.indexOf(t2) > -1 ? '"' : e3.indexOf('"') > -1 ? t2 : (r3 = e3, c2.test(r3) || function(e4) {
        return u2.test(e4);
      }(e3) ? t2 : "");
      var r3;
    }
    return yo = function(e3, r3, o2) {
      var i2 = e3.replace(s2, "").replace(l2, "").trim(), u3 = i2.replace(n2, "").replace(a2, "").trim(), c3 = i2[0] == t2 || '"' == i2[0] ? i2[0] : g2(u3);
      return o2 ? f2(u3, r3) : "url(" + c3 + f2(u3, r3) + c3 + ")";
    };
  }
  function Yo() {
    if (wo) return Ao;
    wo = 1;
    var e2 = /^@import/i;
    return Ao = function(r2) {
      return e2.test(r2);
    };
  }
  function Wo() {
    if (Co) return Oo;
    Co = 1;
    var e2 = Ko(), r2 = Go(), t2 = Ho(), n2 = Pt(), o2 = Yo(), i2 = /^\/\*# sourceMappingURL=(\S+) \*\/$/;
    function a2(e3, r3, t3) {
      var o3, i3, c2;
      for (i3 = 0, c2 = e3.length; i3 < c2; i3++) switch ((o3 = e3[i3])[0]) {
        case n2.AT_RULE:
          u2(o3, r3, t3);
          break;
        case n2.AT_RULE_BLOCK:
          l2(o3[2], r3, t3);
          break;
        case n2.COMMENT:
          s2(o3, t3);
          break;
        case n2.NESTED_BLOCK:
          a2(o3[2], r3, t3);
          break;
        case n2.RULE:
          l2(o3[2], r3, t3);
      }
      return e3;
    }
    function u2(n3, i3, a3) {
      if (o2(n3[1])) {
        var u3 = e2(n3[1]), s3 = t2(u3[0], a3), l3 = u3[1];
        n3[1] = r2(s3, l3);
      }
    }
    function s2(e3, r3) {
      var n3 = i2.exec(e3[1]);
      n3 && -1 === n3[1].indexOf("data:") && (e3[1] = e3[1].replace(n3[1], t2(n3[1], r3, true)));
    }
    function l2(e3, r3, n3) {
      var o3, i3, a3, u3, s3, l3;
      for (a3 = 0, u3 = e3.length; a3 < u3; a3++) for (s3 = 2, l3 = (o3 = e3[a3]).length; s3 < l3; s3++) i3 = o3[s3][1], r3.isUrl(i3) && (o3[s3][1] = t2(i3, n3));
    }
    return Oo = function(e3, r3, t3, o3) {
      return r3 ? a2(e3, t3, o3) : function(e4, r4, t4) {
        var o4, i3, a3;
        for (i3 = 0, a3 = e4.length; i3 < a3; i3++) if ((o4 = e4[i3])[0] === n2.AT_RULE) u2(o4, r4, t4);
        return e4;
      }(e3, t3, o3);
    };
  }
  function Qo() {
    if (So) return xo;
    So = 1;
    var e2 = Tt(), r2 = Pt(), t2 = Lt(), n2 = "block", o2 = "comment", i2 = "double-quote", a2 = "rule", u2 = "single-quote", s2 = ["@charset", "@import"], l2 = ["@-moz-document", "@document", "@-moz-keyframes", "@-ms-keyframes", "@-o-keyframes", "@-webkit-keyframes", "@keyframes", "@media", "@supports"], c2 = /\/\* clean\-css ignore:end \*\/$/, p2 = /^\/\* clean\-css ignore:start \*\//, f2 = ["@bottom-center", "@bottom-left", "@bottom-left-corner", "@bottom-right", "@bottom-right-corner", "@left-bottom", "@left-middle", "@left-top", "@right-bottom", "@right-middle", "@right-top", "@top-center", "@top-left", "@top-left-corner", "@top-right", "@top-right-corner"], d2 = ["@footnote", "@footnotes", "@left", "@page-float-bottom", "@page-float-top", "@right"], m2 = /^\[\s{0,31}\d+\s{0,31}\]$/, g2 = /[\s\(]/, h2 = /[\s|\}]*$/;
    function v2(s3, l3, c3, p3) {
      for (var f3, d3, m3, g3, x2, S2, R2, k2, T2, L2, D2, _2, B2, q2, P2, N2, U2 = [], F2 = U2, V2 = [], M2 = [], I2 = c3.level, j2 = [], $2 = [], K2 = [], z2 = 0, G2 = false, H2 = false, Y2 = false, W2 = false, Q2 = false, Z2 = c3.position; Z2.index < s3.length; Z2.index++) {
        var J2 = s3[Z2.index];
        if (R2 = I2 == u2 || I2 == i2, k2 = J2 == e2.SPACE || J2 == e2.TAB, T2 = J2 == e2.NEW_LINE_NIX, L2 = J2 == e2.NEW_LINE_NIX && s3[Z2.index - 1] == e2.CARRIAGE_RETURN, D2 = J2 == e2.CARRIAGE_RETURN && s3[Z2.index + 1] && s3[Z2.index + 1] != e2.NEW_LINE_NIX, _2 = !H2 && I2 != o2 && !R2 && J2 == e2.ASTERISK && s3[Z2.index - 1] == e2.FORWARD_SLASH, q2 = !G2 && !R2 && J2 == e2.FORWARD_SLASH && s3[Z2.index - 1] == e2.ASTERISK, B2 = I2 == o2 && q2, z2 = Math.max(z2, 0), g3 = 0 === $2.length ? [Z2.line, Z2.column, Z2.source] : g3, P2) $2.push(J2);
        else if (B2 || I2 != o2) if (_2 || B2 || !Y2) if (_2 && (I2 == n2 || I2 == a2) && $2.length > 1) M2.push(g3), $2.push(J2), K2.push($2.slice(0, $2.length - 2)), $2 = $2.slice($2.length - 2), g3 = [Z2.line, Z2.column - 1, Z2.source], j2.push(I2), I2 = o2;
        else if (_2) j2.push(I2), I2 = o2, $2.push(J2);
        else if (B2 && b2($2)) x2 = $2.join("").trim() + J2, f3 = [r2.COMMENT, x2, [E2(g3, x2, l3)]], F2.push(f3), Y2 = true, g3 = M2.pop() || null, $2 = K2.pop() || [];
        else if (B2 && y2($2)) N2 = (x2 = $2.join("") + J2).lastIndexOf(e2.FORWARD_SLASH + e2.ASTERISK), S2 = x2.substring(0, N2), f3 = [r2.RAW, S2, [E2(g3, S2, l3)]], F2.push(f3), S2 = x2.substring(N2), g3 = [Z2.line, Z2.column - S2.length + 1, Z2.source], f3 = [r2.COMMENT, S2, [E2(g3, S2, l3)]], F2.push(f3), Y2 = false, I2 = j2.pop(), g3 = M2.pop() || null, $2 = K2.pop() || [];
        else if (B2) x2 = $2.join("").trim() + J2, f3 = [r2.COMMENT, x2, [E2(g3, x2, l3)]], F2.push(f3), I2 = j2.pop(), g3 = M2.pop() || null, $2 = K2.pop() || [];
        else if (q2 && s3[Z2.index + 1] != e2.ASTERISK) l3.warnings.push("Unexpected '*/' at " + t2([Z2.line, Z2.column, Z2.source]) + "."), $2 = [];
        else if (J2 != e2.SINGLE_QUOTE || R2) if (J2 == e2.SINGLE_QUOTE && I2 == u2) I2 = j2.pop(), $2.push(J2);
        else if (J2 != e2.DOUBLE_QUOTE || R2) if (J2 == e2.DOUBLE_QUOTE && I2 == i2) I2 = j2.pop(), $2.push(J2);
        else if (!_2 && !B2 && J2 != e2.CLOSE_ROUND_BRACKET && J2 != e2.OPEN_ROUND_BRACKET && I2 != o2 && !R2 && z2 > 0) $2.push(J2);
        else if (J2 != e2.OPEN_ROUND_BRACKET || R2 || I2 == o2 || W2) if (J2 != e2.CLOSE_ROUND_BRACKET || R2 || I2 == o2 || W2) if (J2 == e2.SEMICOLON && I2 == n2 && $2[0] == e2.AT) x2 = $2.join("").trim(), U2.push([r2.AT_RULE, x2, [E2(g3, x2, l3)]]), $2 = [];
        else if (J2 == e2.COMMA && I2 == n2 && d3) x2 = $2.join("").trim(), d3[1].push([w2(d3[0]), x2, [E2(g3, x2, l3, d3[1].length)]]), $2 = [];
        else if (J2 == e2.COMMA && I2 == n2 && A2($2) == r2.AT_RULE) $2.push(J2);
        else if (J2 == e2.COMMA && I2 == n2) d3 = [A2($2), [], []], x2 = $2.join("").trim(), d3[1].push([w2(d3[0]), x2, [E2(g3, x2, l3, 0)]]), $2 = [];
        else if (J2 == e2.OPEN_CURLY_BRACKET && I2 == n2 && d3 && d3[0] == r2.NESTED_BLOCK) x2 = $2.join("").trim(), d3[1].push([r2.NESTED_BLOCK_SCOPE, x2, [E2(g3, x2, l3)]]), U2.push(d3), j2.push(I2), Z2.column++, Z2.index++, $2 = [], d3[2] = v2(s3, l3, c3, true), d3 = null;
        else if (J2 == e2.OPEN_CURLY_BRACKET && I2 == n2 && A2($2) == r2.NESTED_BLOCK) x2 = $2.join("").trim(), (d3 = d3 || [r2.NESTED_BLOCK, [], []])[1].push([r2.NESTED_BLOCK_SCOPE, x2, [E2(g3, x2, l3)]]), U2.push(d3), j2.push(I2), Z2.column++, Z2.index++, $2 = [], d3[2] = v2(s3, l3, c3, true), d3 = null;
        else if (J2 == e2.OPEN_CURLY_BRACKET && I2 == n2) x2 = $2.join("").trim(), (d3 = d3 || [A2($2), [], []])[1].push([w2(d3[0]), x2, [E2(g3, x2, l3, d3[1].length)]]), F2 = d3[2], U2.push(d3), j2.push(I2), I2 = a2, $2 = [];
        else if (J2 == e2.OPEN_CURLY_BRACKET && I2 == a2 && W2) V2.push(d3), d3 = [r2.PROPERTY_BLOCK, []], m3.push(d3), F2 = d3[1], j2.push(I2), I2 = a2, W2 = false;
        else if (J2 == e2.OPEN_CURLY_BRACKET && I2 == a2 && O2($2)) x2 = $2.join("").trim(), V2.push(d3), (d3 = [r2.AT_RULE_BLOCK, [], []])[1].push([r2.AT_RULE_BLOCK_SCOPE, x2, [E2(g3, x2, l3)]]), F2.push(d3), F2 = d3[2], j2.push(I2), I2 = a2, $2 = [];
        else if (J2 != e2.COLON || I2 != a2 || W2) if (J2 == e2.SEMICOLON && I2 == a2 && m3 && V2.length > 0 && $2.length > 0 && $2[0] == e2.AT) x2 = $2.join("").trim(), d3[1].push([r2.AT_RULE, x2, [E2(g3, x2, l3)]]), $2 = [];
        else if (J2 == e2.SEMICOLON && I2 == a2 && m3 && $2.length > 0) x2 = $2.join("").trim(), m3.push([r2.PROPERTY_VALUE, x2, [E2(g3, x2, l3)]]), m3 = null, W2 = false, $2 = [];
        else if (J2 == e2.SEMICOLON && I2 == a2 && m3 && 0 === $2.length) m3 = null, W2 = false;
        else if (J2 == e2.SEMICOLON && I2 == a2 && $2.length > 0 && $2[0] == e2.AT) x2 = $2.join(""), F2.push([r2.AT_RULE, x2, [E2(g3, x2, l3)]]), W2 = false, $2 = [];
        else if (J2 == e2.SEMICOLON && I2 == a2 && Q2) Q2 = false, $2 = [];
        else if (J2 == e2.SEMICOLON && I2 == a2 && 0 === $2.length) ;
        else if (J2 == e2.CLOSE_CURLY_BRACKET && I2 == a2 && m3 && W2 && $2.length > 0 && V2.length > 0) x2 = $2.join(""), m3.push([r2.PROPERTY_VALUE, x2, [E2(g3, x2, l3)]]), m3 = null, F2 = (d3 = V2.pop())[2], I2 = j2.pop(), W2 = false, $2 = [];
        else if (J2 == e2.CLOSE_CURLY_BRACKET && I2 == a2 && m3 && $2.length > 0 && $2[0] == e2.AT && V2.length > 0) x2 = $2.join(""), d3[1].push([r2.AT_RULE, x2, [E2(g3, x2, l3)]]), m3 = null, F2 = (d3 = V2.pop())[2], I2 = j2.pop(), W2 = false, $2 = [];
        else if (J2 == e2.CLOSE_CURLY_BRACKET && I2 == a2 && m3 && V2.length > 0) m3 = null, F2 = (d3 = V2.pop())[2], I2 = j2.pop(), W2 = false;
        else if (J2 == e2.CLOSE_CURLY_BRACKET && I2 == a2 && m3 && $2.length > 0) x2 = $2.join(""), m3.push([r2.PROPERTY_VALUE, x2, [E2(g3, x2, l3)]]), m3 = null, d3 = V2.pop(), F2 = U2, I2 = j2.pop(), W2 = false, $2 = [];
        else if (J2 == e2.CLOSE_CURLY_BRACKET && I2 == a2 && $2.length > 0 && $2[0] == e2.AT) m3 = null, d3 = null, x2 = $2.join("").trim(), F2.push([r2.AT_RULE, x2, [E2(g3, x2, l3)]]), F2 = U2, I2 = j2.pop(), W2 = false, $2 = [];
        else if (J2 == e2.CLOSE_CURLY_BRACKET && I2 == a2 && j2[j2.length - 1] == a2) m3 = null, F2 = (d3 = V2.pop())[2], I2 = j2.pop(), W2 = false, Q2 = true, $2 = [];
        else if (J2 == e2.CLOSE_CURLY_BRACKET && I2 == a2) m3 = null, d3 = null, F2 = U2, I2 = j2.pop(), W2 = false;
        else if (J2 == e2.CLOSE_CURLY_BRACKET && I2 == n2 && !p3 && Z2.index <= s3.length - 1) l3.warnings.push("Unexpected '}' at " + t2([Z2.line, Z2.column, Z2.source]) + "."), $2.push(J2);
        else {
          if (J2 == e2.CLOSE_CURLY_BRACKET && I2 == n2) break;
          J2 == e2.OPEN_ROUND_BRACKET && I2 == a2 && W2 ? ($2.push(J2), z2++) : J2 == e2.CLOSE_ROUND_BRACKET && I2 == a2 && W2 && 1 == z2 ? ($2.push(J2), x2 = $2.join("").trim(), m3.push([r2.PROPERTY_VALUE, x2, [E2(g3, x2, l3)]]), z2--, $2 = []) : J2 == e2.CLOSE_ROUND_BRACKET && I2 == a2 && W2 ? ($2.push(J2), z2--) : J2 == e2.FORWARD_SLASH && s3[Z2.index + 1] != e2.ASTERISK && I2 == a2 && W2 && $2.length > 0 ? (x2 = $2.join("").trim(), m3.push([r2.PROPERTY_VALUE, x2, [E2(g3, x2, l3)]]), m3.push([r2.PROPERTY_VALUE, J2, [[Z2.line, Z2.column, Z2.source]]]), $2 = []) : J2 == e2.FORWARD_SLASH && s3[Z2.index + 1] != e2.ASTERISK && I2 == a2 && W2 ? (m3.push([r2.PROPERTY_VALUE, J2, [[Z2.line, Z2.column, Z2.source]]]), $2 = []) : J2 == e2.COMMA && I2 == a2 && W2 && $2.length > 0 ? (x2 = $2.join("").trim(), m3.push([r2.PROPERTY_VALUE, x2, [E2(g3, x2, l3)]]), m3.push([r2.PROPERTY_VALUE, J2, [[Z2.line, Z2.column, Z2.source]]]), $2 = []) : J2 == e2.COMMA && I2 == a2 && W2 ? (m3.push([r2.PROPERTY_VALUE, J2, [[Z2.line, Z2.column, Z2.source]]]), $2 = []) : J2 == e2.CLOSE_SQUARE_BRACKET && m3 && m3.length > 1 && $2.length > 0 && C2($2) ? ($2.push(J2), x2 = $2.join("").trim(), m3[m3.length - 1][1] += x2, $2 = []) : (k2 || T2 && !L2) && I2 == a2 && W2 && m3 && $2.length > 0 || L2 && I2 == a2 && W2 && m3 && $2.length > 1 ? (x2 = $2.join("").trim(), m3.push([r2.PROPERTY_VALUE, x2, [E2(g3, x2, l3)]]), $2 = []) : L2 && I2 == a2 && W2 ? $2 = [] : 1 == $2.length && L2 ? $2.pop() : ($2.length > 0 || !k2 && !T2 && !L2 && !D2) && $2.push(J2);
        }
        else x2 = $2.join("").trim(), m3 = [r2.PROPERTY, [r2.PROPERTY_NAME, x2, [E2(g3, x2, l3)]]], F2.push(m3), W2 = true, $2 = [];
        else $2.push(J2), z2--;
        else $2.push(J2), z2++;
        else j2.push(I2), I2 = i2, $2.push(J2);
        else j2.push(I2), I2 = u2, $2.push(J2);
        else $2.push(J2);
        else $2.push(J2);
        P2 = !P2 && J2 == e2.BACK_SLASH, G2 = _2, H2 = B2, Z2.line = L2 || T2 || D2 ? Z2.line + 1 : Z2.line, Z2.column = L2 || T2 || D2 ? 0 : Z2.column + 1;
      }
      return W2 && l3.warnings.push("Missing '}' at " + t2([Z2.line, Z2.column, Z2.source]) + "."), W2 && $2.length > 0 && (x2 = $2.join("").replace(h2, ""), m3.push([r2.PROPERTY_VALUE, x2, [E2(g3, x2, l3)]]), $2 = []), $2.length > 0 && l3.warnings.push("Invalid character(s) '" + $2.join("") + "' at " + t2(g3) + ". Ignoring."), U2;
    }
    function b2(r3) {
      return p2.test(r3.join("") + e2.FORWARD_SLASH);
    }
    function y2(r3) {
      return c2.test(r3.join("") + e2.FORWARD_SLASH);
    }
    function E2(e3, r3, t3, n3) {
      var o3 = e3[2];
      return t3.inputSourceMapTracker.isTracking(o3) ? t3.inputSourceMapTracker.originalPositionFor(e3, r3.length, n3) : e3;
    }
    function A2(t3) {
      var n3 = t3[0] == e2.AT || t3[0] == e2.UNDERSCORE, o3 = t3.join("").split(g2)[0];
      return n3 && l2.indexOf(o3) > -1 ? r2.NESTED_BLOCK : n3 && s2.indexOf(o3) > -1 ? r2.AT_RULE : n3 ? r2.AT_RULE_BLOCK : r2.RULE;
    }
    function w2(e3) {
      return e3 == r2.RULE ? r2.RULE_SCOPE : e3 == r2.NESTED_BLOCK ? r2.NESTED_BLOCK_SCOPE : e3 == r2.AT_RULE_BLOCK ? r2.AT_RULE_BLOCK_SCOPE : void 0;
    }
    function O2(e3) {
      var r3 = e3.join("").trim();
      return f2.indexOf(r3) > -1 || d2.indexOf(r3) > -1;
    }
    function C2(r3) {
      return m2.test(r3.join("") + e2.CLOSE_SQUARE_BRACKET);
    }
    return xo = function(e3, r3) {
      return v2(e3, r3, { level: n2, position: { source: r3.source || void 0, line: 1, column: 0, index: 0 } }, false);
    };
  }
  function Zo() {
    if (ko) return Ro;
    ko = 1;
    var r2 = e, t2 = i, n2 = $o(), o2 = Ko(), a2 = Mo(), u2 = zo(), s2 = function() {
      if (ho) return go;
      ho = 1;
      var e2 = /\\/g;
      return go = function(r3) {
        return r3.replace(e2, "/");
      };
    }(), l2 = Wo(), c2 = Io(), p2 = jo(), f2 = Go(), d2 = Qo(), m2 = Pt(), g2 = Tt(), h2 = Vo(), v2 = Yo(), b2 = Fo();
    function y2(e2, r3, t3) {
      return r3.source = void 0, r3.sourcesContent[void 0] = e2, r3.stats.originalSize += e2.length, C2(e2, r3, { inline: r3.options.inline }, t3);
    }
    function E2(e2, r3, t3) {
      var n3, o3, i2;
      for (n3 in e2) i2 = e2[n3], o3 = A2(n3), t3.push(O2(o3)), r3.sourcesContent[o3] = i2.styles, i2.sourceMap && w2(i2.sourceMap, o3, r3);
      return t3;
    }
    function A2(e2) {
      var r3, n3, o3 = t2.resolve("");
      return b2(e2) ? e2 : (r3 = t2.isAbsolute(e2) ? e2 : t2.resolve(e2), n3 = t2.relative(o3, r3), s2(n3));
    }
    function w2(e2, r3, t3) {
      var n3 = "string" == typeof e2 ? JSON.parse(e2) : e2, o3 = b2(r3) ? p2(n3, r3) : c2(n3, r3 || "uri:unknown", t3.options.rebaseTo);
      t3.inputSourceMapTracker.track(r3, o3);
    }
    function O2(e2) {
      return f2("url(" + e2 + ")", "") + g2.SEMICOLON;
    }
    function C2(e2, r3, n3, o3) {
      var i2, a3, u3 = {};
      return r3.source ? b2(r3.source) ? (u3.fromBase = r3.source, u3.toBase = r3.source) : t2.isAbsolute(r3.source) ? (u3.fromBase = t2.dirname(r3.source), u3.toBase = r3.options.rebaseTo) : (u3.fromBase = t2.dirname(t2.resolve(r3.source)), u3.toBase = r3.options.rebaseTo) : (u3.fromBase = t2.resolve(""), u3.toBase = r3.options.rebaseTo), i2 = d2(e2, r3), i2 = l2(i2, r3.options.rebase, r3.validator, u3), 1 != (a3 = n3.inline).length || "none" != a3[0] ? function(e3, r4, t3, n4) {
        var o4 = { afterContent: false, callback: n4, errors: r4.errors, externalContext: r4, fetch: r4.options.fetch, inlinedStylesheets: t3.inlinedStylesheets || r4.inlinedStylesheets, inline: t3.inline, inlineRequest: r4.options.inlineRequest, inlineTimeout: r4.options.inlineTimeout, isRemote: t3.isRemote || false, localOnly: r4.localOnly, outputTokens: [], rebaseTo: r4.options.rebaseTo, sourceTokens: e3, warnings: r4.warnings };
        return x2(o4);
      }(i2, r3, n3, o3) : o3(i2);
    }
    function x2(e2) {
      var r3, t3, n3;
      for (t3 = 0, n3 = e2.sourceTokens.length; t3 < n3; t3++) {
        if ((r3 = e2.sourceTokens[t3])[0] == m2.AT_RULE && v2(r3[1])) return e2.sourceTokens.splice(0, t3), S2(r3, e2);
        r3[0] == m2.AT_RULE || r3[0] == m2.COMMENT ? e2.outputTokens.push(r3) : (e2.outputTokens.push(r3), e2.afterContent = true);
      }
      return e2.sourceTokens = [], e2.callback(e2.outputTokens);
    }
    function S2(e2, n3) {
      var i2 = o2(e2[1]), u3 = i2[0], l3 = i2[1], c3 = e2[2];
      return b2(u3) ? function(e3, r3, t3, n4) {
        var o3 = a2(e3, true, n4.inline), i3 = e3, u4 = e3 in n4.externalContext.sourcesContent, s3 = !h2(e3);
        if (n4.inlinedStylesheets.indexOf(e3) > -1) return n4.warnings.push('Ignoring remote @import of "' + e3 + '" as it has already been imported.'), n4.sourceTokens = n4.sourceTokens.slice(1), x2(n4);
        if (n4.localOnly && n4.afterContent) return n4.warnings.push('Ignoring remote @import of "' + e3 + '" as no callback given and after other content.'), n4.sourceTokens = n4.sourceTokens.slice(1), x2(n4);
        if (s3) return n4.warnings.push('Skipping remote @import of "' + e3 + '" as no protocol given.'), n4.outputTokens = n4.outputTokens.concat(n4.sourceTokens.slice(0, 1)), n4.sourceTokens = n4.sourceTokens.slice(1), x2(n4);
        if (n4.localOnly && !u4) return n4.warnings.push('Skipping remote @import of "' + e3 + '" as no callback given.'), n4.outputTokens = n4.outputTokens.concat(n4.sourceTokens.slice(0, 1)), n4.sourceTokens = n4.sourceTokens.slice(1), x2(n4);
        if (!o3 && n4.afterContent) return n4.warnings.push('Ignoring remote @import of "' + e3 + '" as resource is not allowed and after other content.'), n4.sourceTokens = n4.sourceTokens.slice(1), x2(n4);
        if (!o3) return n4.warnings.push('Skipping remote @import of "' + e3 + '" as resource is not allowed.'), n4.outputTokens = n4.outputTokens.concat(n4.sourceTokens.slice(0, 1)), n4.sourceTokens = n4.sourceTokens.slice(1), x2(n4);
        function l4(o4, a3) {
          return o4 ? (n4.errors.push('Broken @import declaration of "' + e3 + '" - ' + o4), process.nextTick(function() {
            n4.outputTokens = n4.outputTokens.concat(n4.sourceTokens.slice(0, 1)), n4.sourceTokens = n4.sourceTokens.slice(1), x2(n4);
          })) : (n4.inline = n4.externalContext.options.inline, n4.isRemote = true, n4.externalContext.source = i3, n4.externalContext.sourcesContent[e3] = a3, n4.externalContext.stats.originalSize += a3.length, C2(a3, n4.externalContext, n4, function(e4) {
            return e4 = R2(e4, r3, t3), n4.outputTokens = n4.outputTokens.concat(e4), n4.sourceTokens = n4.sourceTokens.slice(1), x2(n4);
          }));
        }
        return n4.inlinedStylesheets.push(e3), u4 ? l4(null, n4.externalContext.sourcesContent[e3]) : n4.fetch(e3, n4.inlineRequest, n4.inlineTimeout, l4);
      }(u3, l3, c3, n3) : function(e3, n4, o3, i3) {
        var u4, l4 = t2.resolve(""), c4 = t2.isAbsolute(e3) ? t2.resolve(l4, "/" == e3[0] ? e3.substring(1) : e3) : t2.resolve(i3.rebaseTo, e3), p3 = t2.relative(l4, c4), f3 = a2(e3, false, i3.inline), d3 = s2(p3), m3 = d3 in i3.externalContext.sourcesContent;
        if (i3.inlinedStylesheets.indexOf(c4) > -1) i3.warnings.push('Ignoring local @import of "' + e3 + '" as it has already been imported.');
        else if (m3 || r2.existsSync(c4) && r2.statSync(c4).isFile()) if (!f3 && i3.afterContent) i3.warnings.push('Ignoring local @import of "' + e3 + '" as resource is not allowed and after other content.');
        else if (i3.afterContent) i3.warnings.push('Ignoring local @import of "' + e3 + '" as after other content.');
        else {
          if (f3) return u4 = m3 ? i3.externalContext.sourcesContent[d3] : r2.readFileSync(c4, "utf-8"), i3.inlinedStylesheets.push(c4), i3.inline = i3.externalContext.options.inline, i3.externalContext.source = d3, i3.externalContext.sourcesContent[d3] = u4, i3.externalContext.stats.originalSize += u4.length, C2(u4, i3.externalContext, i3, function(e4) {
            return e4 = R2(e4, n4, o3), i3.outputTokens = i3.outputTokens.concat(e4), i3.sourceTokens = i3.sourceTokens.slice(1), x2(i3);
          });
          i3.warnings.push('Skipping local @import of "' + e3 + '" as resource is not allowed.'), i3.outputTokens = i3.outputTokens.concat(i3.sourceTokens.slice(0, 1));
        }
        else i3.errors.push('Ignoring local @import of "' + e3 + '" as resource is missing.');
        return i3.sourceTokens = i3.sourceTokens.slice(1), x2(i3);
      }(u3, l3, c3, n3);
    }
    function R2(e2, r3, t3) {
      return r3 ? [[m2.NESTED_BLOCK, [[m2.NESTED_BLOCK_SCOPE, "@media " + r3, t3]], e2]] : e2;
    }
    return Ro = function(e2, r3, t3) {
      return function(e3, r4, t4) {
        if ("string" == typeof e3) return y2(e3, r4, t4);
        if (Buffer.isBuffer(e3)) return y2(e3.toString(), r4, t4);
        if (Array.isArray(e3)) return function(e4, r5, t5) {
          var n3 = e4.reduce(function(e5, t6) {
            return "string" == typeof t6 ? function(e6, r6) {
              return r6.push(O2(A2(e6))), r6;
            }(t6, e5) : E2(t6, r5, e5);
          }, []);
          return C2(n3.join(""), r5, { inline: ["all"] }, t5);
        }(e3, r4, t4);
        if ("object" == typeof e3) return function(e4, r5, t5) {
          var n3 = E2(e4, r5, []);
          return C2(n3.join(""), r5, { inline: ["all"] }, t5);
        }(e3, r4, t4);
      }(e2, r3, function(e3) {
        return n2(e3, r3, function() {
          return u2(r3, function() {
            return t3(e3);
          });
        });
      });
    };
  }
  function Jo() {
    if (_o) return Do;
    _o = 1;
    var e2 = Uo().SourceMapGenerator, r2 = Mt().all, t2 = Fo(), n2 = "win32" == process.platform, o2 = /\//g;
    function i2(e3, r3) {
      var t3 = "string" == typeof r3, n3 = t3 ? r3 : r3[1], o3 = t3 ? null : r3[2];
      (0, e3.wrap)(e3, n3), u2(e3, n3, o3), e3.output.push(n3);
    }
    function a2(e3, r3) {
      e3.column + r3.length > e3.format.wrapAt && (u2(e3, e3.format.breakWith, false), e3.output.push(e3.format.breakWith));
    }
    function u2(e3, r3, t3) {
      var n3 = r3.split("\n");
      t3 && function(e4, r4) {
        for (var t4 = 0, n4 = r4.length; t4 < n4; t4++) s2(e4, r4[t4]);
      }(e3, t3), e3.line += n3.length - 1, e3.column = n3.length > 1 ? 0 : e3.column + n3.pop().length;
    }
    function s2(e3, r3) {
      var i3 = r3[0], a3 = r3[1], u3 = r3[2], s3 = u3, l2 = s3 || "$stdin";
      n2 && s3 && !t2(s3) && (l2 = s3.replace(o2, "\\")), e3.outputMap.addMapping({ generated: { line: e3.line, column: e3.column }, source: l2, original: { line: i3, column: a3 } }), e3.inlineSources && u3 in e3.sourcesContent && e3.outputMap.setSourceContent(l2, e3.sourcesContent[u3]);
    }
    return Do = function(t3, n3) {
      var o3 = { column: 0, format: n3.options.format, indentBy: 0, indentWith: "", inlineSources: n3.options.sourceMapInlineSources, line: 1, output: [], outputMap: new e2(), sourcesContent: n3.sourcesContent, spaceAfterClosingBrace: n3.options.compatibility.properties.spaceAfterClosingBrace, store: i2, wrap: n3.options.format.wrapAt ? a2 : function() {
      } };
      return r2(o3, t3), { sourceMap: o3.outputMap, styles: o3.output.join("") };
    };
  }
  function Xo() {
    if (Bo) return Ct.exports;
    Bo = 1;
    var e2 = M ? V : (M = 1, V = function(e3) {
      return e3;
    }), r2 = jt(), t2 = dn(), n2 = mn(), o2 = gn(), a2 = function() {
      if (ft) return pt;
      ft = 1;
      var e3 = hn();
      return pt = function(r3) {
        return r3 || e3;
      };
    }(), u2 = kt().formatFrom, s2 = mt ? dt : (mt = 1, dt = function(e3) {
      return Array.isArray(e3) ? e3 : false === e3 ? ["none"] : void 0 === e3 ? ["local"] : e3.split(",");
    }), l2 = vn(), c2 = bt ? vt : (bt = 1, vt = function(e3) {
      return e3 || 5e3;
    }), p2 = Ft().OptimizationLevel, f2 = Ft().optimizationLevelFrom, d2 = Et ? yt : (Et = 1, yt = function(e3) {
      return void 0 === e3 || !!e3;
    }), m2 = function() {
      if (wt) return At;
      wt = 1;
      var e3 = i;
      return At = function(r3) {
        return r3 ? e3.resolve(r3) : process.cwd();
      };
    }(), g2 = function() {
      if (Hn) return Gn;
      Hn = 1;
      var e3 = Uo().SourceMapConsumer;
      function r3(e4) {
        return e4;
      }
      function t3(e4, r4) {
        return r4 in e4;
      }
      function n3(e4, r4, t4, o4) {
        for (var i2, a3, u3 = r4[0], s3 = r4[1], l3 = r4[2], c3 = { line: u3, column: s3 + t4 }; !i2 && c3.column > s3; ) c3.column--, i2 = e4[l3].originalPositionFor(c3);
        return !i2 || i2.column < 0 ? r4 : null === i2.line && u3 > 1 && o4 > 0 ? n3(e4, [u3 - 1, s3, l3], t4, o4 - 1) : null !== i2.line ? [(a3 = i2).line, a3.column, a3.source] : r4;
      }
      function o3(r4, t4, n4) {
        r4[t4] = new e3(n4);
      }
      return Gn = function() {
        var e4 = {};
        return { all: r3.bind(null, e4), isTracking: t3.bind(null, e4), originalPositionFor: n3.bind(null, e4), track: o3.bind(null, e4) };
      };
    }(), h2 = Zo(), v2 = function() {
      if (Lo) return To;
      Lo = 1;
      var e3 = Mt().all;
      function r3(e4, r4) {
        var t4 = "string" == typeof r4 ? r4 : r4[1];
        (0, e4.wrap)(e4, t4), n3(e4, t4), e4.output.push(t4);
      }
      function t3(e4, r4) {
        e4.column + r4.length > e4.format.wrapAt && (n3(e4, e4.format.breakWith), e4.output.push(e4.format.breakWith));
      }
      function n3(e4, r4) {
        var t4 = r4.split("\n");
        e4.line += t4.length - 1, e4.column = t4.length > 1 ? 0 : e4.column + t4.pop().length;
      }
      return To = function(n4, o3) {
        var i2 = { column: 0, format: o3.options.format, indentBy: 0, indentWith: "", line: 1, output: [], spaceAfterClosingBrace: o3.options.compatibility.properties.spaceAfterClosingBrace, store: r3, wrap: o3.options.format.wrapAt ? t3 : function() {
        } };
        return e3(i2, n4), { styles: i2.output.join("") };
      };
    }(), b2 = Jo(), y2 = Ct.exports = function(e3) {
      e3 = e3 || {}, this.options = { compatibility: o2(e3.compatibility), fetch: a2(e3.fetch), format: u2(e3.format), inline: s2(e3.inline), inlineRequest: l2(e3.inlineRequest), inlineTimeout: c2(e3.inlineTimeout), level: f2(e3.level), rebase: d2(e3.rebase), rebaseTo: m2(e3.rebaseTo), returnPromise: !!e3.returnPromise, sourceMap: !!e3.sourceMap, sourceMapInlineSources: !!e3.sourceMapInlineSources };
    };
    function E2(o3, i2, a3, u3) {
      var s3 = "function" != typeof a3 ? a3 : null, l3 = "function" == typeof u3 ? u3 : "function" == typeof a3 ? a3 : null, c3 = { stats: { efficiency: 0, minifiedSize: 0, originalSize: 0, startedAt: Date.now(), timeSpent: 0 }, cache: { specificity: {} }, errors: [], inlinedStylesheets: [], inputSourceMapTracker: g2(), localOnly: !l3, options: i2, source: null, sourcesContent: {}, validator: n2(i2.compatibility), warnings: [] };
      return s3 && c3.inputSourceMapTracker.track(void 0, s3), (c3.localOnly ? function(e3) {
        return e3();
      } : process.nextTick)(function() {
        return h2(o3, c3, function(n3) {
          var o4 = c3.options.sourceMap ? b2 : v2, i3 = function(n4, o5) {
            var i4;
            return i4 = e2(n4, o5), i4 = p2.One in o5.options.level ? r2(n4, o5) : n4, i4 = p2.Two in o5.options.level ? t2(n4, o5, true) : i4, i4;
          }(n3, c3), a4 = function(e3, r3) {
            return e3.stats = function(e4, r4) {
              var t3 = Date.now() - r4.stats.startedAt;
              return delete r4.stats.startedAt, r4.stats.timeSpent = t3, r4.stats.efficiency = 1 - e4.length / r4.stats.originalSize, r4.stats.minifiedSize = e4.length, r4.stats;
            }(e3.styles, r3), e3.errors = r3.errors, e3.inlinedStylesheets = r3.inlinedStylesheets, e3.warnings = r3.warnings, e3;
          }(o4(i3, c3), c3);
          return l3 ? l3(c3.errors.length > 0 ? c3.errors : null, a4) : a4;
        });
      });
    }
    return y2.process = function(e3, r3) {
      var t3 = r3.to;
      return delete r3.to, new y2(Object.assign({ returnPromise: true, rebaseTo: t3 }, r3)).minify(e3).then(function(e4) {
        return { css: e4.styles };
      });
    }, y2.prototype.minify = function(e3, r3, t3) {
      var n3 = this.options;
      return n3.returnPromise ? new Promise(function(t4, o3) {
        E2(e3, n3, r3, function(e4, r4) {
          return e4 ? o3(e4) : t4(r4);
        });
      }) : E2(e3, n3, r3, t3);
    }, Ct.exports;
  }
  var ei, ri = { exports: {} }, ti = ri.exports;
  /*! https://mths.be/he v1.2.0 by @mathias | MIT license */
  var ni, oi, ii, ai, ui, si, li, ci, pi, fi, di, mi, gi, hi, vi, bi, yi, Ei, Ai, wi, Oi, Ci, xi, Si, Ri, ki, Ti, Li, Di, _i, Bi, qi, Pi, Ni, Ui, Fi, Vi, Mi, Ii = {}, ji = {};
  function $i() {
    if (ni) return ji;
    function e2(e3, r2) {
      var t2 = {};
      return e3.forEach(function(e4) {
        t2[e4] = 1;
      }), r2 ? function(e4) {
        return 1 === t2[e4.toLowerCase()];
      } : function(e4) {
        return 1 === t2[e4];
      };
    }
    return ni = 1, ji.createMap = e2, ji.createMapFromString = function(r2, t2) {
      return e2(r2.split(/,/), t2);
    }, ji;
  }
  /*!
   * HTML Parser By John Resig (ejohn.org)
   * Modified by Juriy "kangax" Zaytsev
   * Original code by Erik Arvidsson, Mozilla Public License
   * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
   */
  function Ki() {
    if (oi) return Ii;
    oi = 1;
    var e2 = $i().createMapFromString;
    function r2(r3) {
      return e2(r3, true);
    }
    var t2, n2, o2 = /([^\s"'<>/=]+)/, i2 = [/=/], a2 = [/"([^"]*)"+/.source, /'([^']*)'+/.source, /([^ \t\n\f\r"'`=<>]+)/.source], u2 = "((?:" + (n2 = "[" + (t2 = "A-Za-z\\xC0-\\xD6\\xD8-\\xF6\\xF8-\\u0131\\u0134-\\u013E\\u0141-\\u0148\\u014A-\\u017E\\u0180-\\u01C3\\u01CD-\\u01F0\\u01F4\\u01F5\\u01FA-\\u0217\\u0250-\\u02A8\\u02BB-\\u02C1\\u0386\\u0388-\\u038A\\u038C\\u038E-\\u03A1\\u03A3-\\u03CE\\u03D0-\\u03D6\\u03DA\\u03DC\\u03DE\\u03E0\\u03E2-\\u03F3\\u0401-\\u040C\\u040E-\\u044F\\u0451-\\u045C\\u045E-\\u0481\\u0490-\\u04C4\\u04C7\\u04C8\\u04CB\\u04CC\\u04D0-\\u04EB\\u04EE-\\u04F5\\u04F8\\u04F9\\u0531-\\u0556\\u0559\\u0561-\\u0586\\u05D0-\\u05EA\\u05F0-\\u05F2\\u0621-\\u063A\\u0641-\\u064A\\u0671-\\u06B7\\u06BA-\\u06BE\\u06C0-\\u06CE\\u06D0-\\u06D3\\u06D5\\u06E5\\u06E6\\u0905-\\u0939\\u093D\\u0958-\\u0961\\u0985-\\u098C\\u098F\\u0990\\u0993-\\u09A8\\u09AA-\\u09B0\\u09B2\\u09B6-\\u09B9\\u09DC\\u09DD\\u09DF-\\u09E1\\u09F0\\u09F1\\u0A05-\\u0A0A\\u0A0F\\u0A10\\u0A13-\\u0A28\\u0A2A-\\u0A30\\u0A32\\u0A33\\u0A35\\u0A36\\u0A38\\u0A39\\u0A59-\\u0A5C\\u0A5E\\u0A72-\\u0A74\\u0A85-\\u0A8B\\u0A8D\\u0A8F-\\u0A91\\u0A93-\\u0AA8\\u0AAA-\\u0AB0\\u0AB2\\u0AB3\\u0AB5-\\u0AB9\\u0ABD\\u0AE0\\u0B05-\\u0B0C\\u0B0F\\u0B10\\u0B13-\\u0B28\\u0B2A-\\u0B30\\u0B32\\u0B33\\u0B36-\\u0B39\\u0B3D\\u0B5C\\u0B5D\\u0B5F-\\u0B61\\u0B85-\\u0B8A\\u0B8E-\\u0B90\\u0B92-\\u0B95\\u0B99\\u0B9A\\u0B9C\\u0B9E\\u0B9F\\u0BA3\\u0BA4\\u0BA8-\\u0BAA\\u0BAE-\\u0BB5\\u0BB7-\\u0BB9\\u0C05-\\u0C0C\\u0C0E-\\u0C10\\u0C12-\\u0C28\\u0C2A-\\u0C33\\u0C35-\\u0C39\\u0C60\\u0C61\\u0C85-\\u0C8C\\u0C8E-\\u0C90\\u0C92-\\u0CA8\\u0CAA-\\u0CB3\\u0CB5-\\u0CB9\\u0CDE\\u0CE0\\u0CE1\\u0D05-\\u0D0C\\u0D0E-\\u0D10\\u0D12-\\u0D28\\u0D2A-\\u0D39\\u0D60\\u0D61\\u0E01-\\u0E2E\\u0E30\\u0E32\\u0E33\\u0E40-\\u0E45\\u0E81\\u0E82\\u0E84\\u0E87\\u0E88\\u0E8A\\u0E8D\\u0E94-\\u0E97\\u0E99-\\u0E9F\\u0EA1-\\u0EA3\\u0EA5\\u0EA7\\u0EAA\\u0EAB\\u0EAD\\u0EAE\\u0EB0\\u0EB2\\u0EB3\\u0EBD\\u0EC0-\\u0EC4\\u0F40-\\u0F47\\u0F49-\\u0F69\\u10A0-\\u10C5\\u10D0-\\u10F6\\u1100\\u1102\\u1103\\u1105-\\u1107\\u1109\\u110B\\u110C\\u110E-\\u1112\\u113C\\u113E\\u1140\\u114C\\u114E\\u1150\\u1154\\u1155\\u1159\\u115F-\\u1161\\u1163\\u1165\\u1167\\u1169\\u116D\\u116E\\u1172\\u1173\\u1175\\u119E\\u11A8\\u11AB\\u11AE\\u11AF\\u11B7\\u11B8\\u11BA\\u11BC-\\u11C2\\u11EB\\u11F0\\u11F9\\u1E00-\\u1E9B\\u1EA0-\\u1EF9\\u1F00-\\u1F15\\u1F18-\\u1F1D\\u1F20-\\u1F45\\u1F48-\\u1F4D\\u1F50-\\u1F57\\u1F59\\u1F5B\\u1F5D\\u1F5F-\\u1F7D\\u1F80-\\u1FB4\\u1FB6-\\u1FBC\\u1FBE\\u1FC2-\\u1FC4\\u1FC6-\\u1FCC\\u1FD0-\\u1FD3\\u1FD6-\\u1FDB\\u1FE0-\\u1FEC\\u1FF2-\\u1FF4\\u1FF6-\\u1FFC\\u2126\\u212A\\u212B\\u212E\\u2180-\\u2182\\u3007\\u3021-\\u3029\\u3041-\\u3094\\u30A1-\\u30FA\\u3105-\\u312C\\u4E00-\\u9FA5\\uAC00-\\uD7A3") + "_][" + t2 + "0-9\\u0660-\\u0669\\u06F0-\\u06F9\\u0966-\\u096F\\u09E6-\\u09EF\\u0A66-\\u0A6F\\u0AE6-\\u0AEF\\u0B66-\\u0B6F\\u0BE7-\\u0BEF\\u0C66-\\u0C6F\\u0CE6-\\u0CEF\\u0D66-\\u0D6F\\u0E50-\\u0E59\\u0ED0-\\u0ED9\\u0F20-\\u0F29\\.\\-_\\u0300-\\u0345\\u0360\\u0361\\u0483-\\u0486\\u0591-\\u05A1\\u05A3-\\u05B9\\u05BB-\\u05BD\\u05BF\\u05C1\\u05C2\\u05C4\\u064B-\\u0652\\u0670\\u06D6-\\u06E4\\u06E7\\u06E8\\u06EA-\\u06ED\\u0901-\\u0903\\u093C\\u093E-\\u094D\\u0951-\\u0954\\u0962\\u0963\\u0981-\\u0983\\u09BC\\u09BE-\\u09C4\\u09C7\\u09C8\\u09CB-\\u09CD\\u09D7\\u09E2\\u09E3\\u0A02\\u0A3C\\u0A3E-\\u0A42\\u0A47\\u0A48\\u0A4B-\\u0A4D\\u0A70\\u0A71\\u0A81-\\u0A83\\u0ABC\\u0ABE-\\u0AC5\\u0AC7-\\u0AC9\\u0ACB-\\u0ACD\\u0B01-\\u0B03\\u0B3C\\u0B3E-\\u0B43\\u0B47\\u0B48\\u0B4B-\\u0B4D\\u0B56\\u0B57\\u0B82\\u0B83\\u0BBE-\\u0BC2\\u0BC6-\\u0BC8\\u0BCA-\\u0BCD\\u0BD7\\u0C01-\\u0C03\\u0C3E-\\u0C44\\u0C46-\\u0C48\\u0C4A-\\u0C4D\\u0C55\\u0C56\\u0C82\\u0C83\\u0CBE-\\u0CC4\\u0CC6-\\u0CC8\\u0CCA-\\u0CCD\\u0CD5\\u0CD6\\u0D02\\u0D03\\u0D3E-\\u0D43\\u0D46-\\u0D48\\u0D4A-\\u0D4D\\u0D57\\u0E31\\u0E34-\\u0E3A\\u0E47-\\u0E4E\\u0EB1\\u0EB4-\\u0EB9\\u0EBB\\u0EBC\\u0EC8-\\u0ECD\\u0F18\\u0F19\\u0F35\\u0F37\\u0F39\\u0F3E\\u0F3F\\u0F71-\\u0F84\\u0F86-\\u0F8B\\u0F90-\\u0F95\\u0F97\\u0F99-\\u0FAD\\u0FB1-\\u0FB7\\u0FB9\\u20D0-\\u20DC\\u20E1\\u302A-\\u302F\\u3099\\u309A\\xB7\\u02D0\\u02D1\\u0387\\u0640\\u0E46\\u0EC6\\u3005\\u3031-\\u3035\\u309D\\u309E\\u30FC-\\u30FE]*") + "\\:)?" + n2 + ")", s2 = new RegExp("^<" + u2), l2 = /^\s*(\/?)>/, c2 = new RegExp("^<\\/" + u2 + "[^>]*>"), p2 = /^<!DOCTYPE\s?[^>]+>/i, f2 = false;
    "x".replace(/x(.)?/g, function(e3, r3) {
      f2 = "" === r3;
    });
    var d2 = r2("area,base,basefont,br,col,embed,frame,hr,img,input,isindex,keygen,link,meta,param,source,track,wbr"), m2 = r2("a,abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,noscript,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,svg,textarea,tt,u,var"), g2 = r2("colgroup,dd,dt,li,option,p,td,tfoot,th,thead,tr,source"), h2 = r2("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected"), v2 = r2("script,style"), b2 = r2("address,article,aside,base,blockquote,body,caption,col,colgroup,dd,details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,ol,optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,title,tr,track,ul"), y2 = {};
    function E2(e3) {
      var r3 = o2.source + "(?:\\s*(" + function(e4) {
        return i2.concat(e4.customAttrAssign || []).map(function(e5) {
          return "(?:" + e5.source + ")";
        }).join("|");
      }(e3) + ")[ \\t\\n\\f\\r]*(?:" + a2.join("|") + "))?";
      if (e3.customAttrSurround) {
        for (var t3 = [], n3 = e3.customAttrSurround.length - 1; n3 >= 0; n3--) t3[n3] = "(?:(" + e3.customAttrSurround[n3][0].source + ")\\s*" + r3 + "\\s*(" + e3.customAttrSurround[n3][1].source + "))";
        t3.push("(?:" + r3 + ")"), r3 = "(?:" + t3.join("|") + ")";
      }
      return new RegExp("^\\s*" + r3);
    }
    function A2(e3, r3) {
      for (var t3, n3, o3, i3, a3 = [], u3 = E2(r3); e3; ) {
        if (n3 = e3, t3 && v2(t3)) {
          var A3 = t3.toLowerCase(), w2 = y2[A3] || (y2[A3] = new RegExp("([\\s\\S]*?)</" + A3 + "[^>]*>", "i"));
          e3 = e3.replace(w2, function(e4, t4) {
            return "script" !== A3 && "style" !== A3 && "noscript" !== A3 && (t4 = t4.replace(/<!--([\s\S]*?)-->/g, "$1").replace(/<!\[CDATA\[([\s\S]*?)]]>/g, "$1")), r3.chars && r3.chars(t4), "";
          }), P2("</" + A3 + ">", A3);
        } else {
          var O2, C2 = e3.indexOf("<");
          if (0 === C2) {
            if (/^<!--/.test(e3)) {
              var x2 = e3.indexOf("-->");
              if (x2 >= 0) {
                r3.comment && r3.comment(e3.substring(4, x2)), e3 = e3.substring(x2 + 3), o3 = "";
                continue;
              }
            }
            if (/^<!\[/.test(e3)) {
              var S2 = e3.indexOf("]>");
              if (S2 >= 0) {
                r3.comment && r3.comment(e3.substring(2, S2 + 1), true), e3 = e3.substring(S2 + 2), o3 = "";
                continue;
              }
            }
            var R2 = e3.match(p2);
            if (R2) {
              r3.doctype && r3.doctype(R2[0]), e3 = e3.substring(R2[0].length), o3 = "";
              continue;
            }
            var k2 = e3.match(c2);
            if (k2) {
              e3 = e3.substring(k2[0].length), k2[0].replace(c2, P2), o3 = "/" + k2[1].toLowerCase();
              continue;
            }
            var T2 = D2(e3);
            if (T2) {
              e3 = T2.rest, B2(T2), o3 = T2.tagName.toLowerCase();
              continue;
            }
          }
          C2 >= 0 ? (O2 = e3.substring(0, C2), e3 = e3.substring(C2)) : (O2 = e3, e3 = "");
          var L2 = D2(e3);
          i3 = L2 ? L2.tagName : (L2 = e3.match(c2)) ? "/" + L2[1] : "", r3.chars && r3.chars(O2, o3, i3), o3 = "";
        }
        if (e3 === n3) throw new Error("Parse Error: " + e3);
      }
      function D2(e4) {
        var r4 = e4.match(s2);
        if (r4) {
          var t4, n4, o4 = { tagName: r4[1], attrs: [] };
          for (e4 = e4.slice(r4[0].length); !(t4 = e4.match(l2)) && (n4 = e4.match(u3)); ) e4 = e4.slice(n4[0].length), o4.attrs.push(n4);
          if (t4) return o4.unarySlash = t4[1], o4.rest = e4.slice(t4[0].length), o4;
        }
      }
      function _2(e4) {
        if (q2(e4) >= 0) return P2("", e4), true;
      }
      function B2(e4) {
        var n4 = e4.tagName, o4 = e4.unarySlash;
        if (r3.html5 && ("p" === t3 && b2(n4) ? P2("", t3) : "tbody" === n4 ? _2("thead") : "tfoot" === n4 && (_2("tbody") || _2("thead")), "col" === n4 && q2("colgroup") < 0 && (t3 = "colgroup", a3.push({ tag: t3, attrs: [] }), r3.start && r3.start(t3, [], false, ""))), !r3.html5 && !m2(n4)) for (; t3 && m2(t3); ) P2("", t3);
        g2(n4) && t3 === n4 && P2("", n4);
        var i4 = d2(n4) || "html" === n4 && "head" === t3 || !!o4, u4 = e4.attrs.map(function(e5) {
          var t4, n5, o5, i5, a4, u5;
          function s3(r4) {
            return a4 = e5[r4], void 0 !== (n5 = e5[r4 + 1]) ? '"' : void 0 !== (n5 = e5[r4 + 2]) ? "'" : (void 0 === (n5 = e5[r4 + 3]) && h2(t4) && (n5 = t4), "");
          }
          f2 && -1 === e5[0].indexOf('""') && ("" === e5[3] && delete e5[3], "" === e5[4] && delete e5[4], "" === e5[5] && delete e5[5]);
          var l3 = 1;
          if (r3.customAttrSurround) {
            for (var c3 = 0, p3 = r3.customAttrSurround.length; c3 < p3; c3++, l3 += 7) if (t4 = e5[l3 + 1]) {
              u5 = s3(l3 + 2), o5 = e5[l3], i5 = e5[l3 + 6];
              break;
            }
          }
          return !t4 && (t4 = e5[l3]) && (u5 = s3(l3 + 1)), { name: t4, value: n5, customAssign: a4 || "=", customOpen: o5 || "", customClose: i5 || "", quote: u5 || "" };
        });
        i4 || (a3.push({ tag: n4, attrs: u4 }), t3 = n4, o4 = ""), r3.start && r3.start(n4, u4, i4, o4);
      }
      function q2(e4) {
        var r4, t4 = e4.toLowerCase();
        for (r4 = a3.length - 1; r4 >= 0 && a3[r4].tag.toLowerCase() !== t4; r4--) ;
        return r4;
      }
      function P2(e4, n4) {
        var o4;
        if ((o4 = n4 ? q2(n4) : 0) >= 0) {
          for (var i4 = a3.length - 1; i4 >= o4; i4--) r3.end && r3.end(a3[i4].tag, a3[i4].attrs, i4 > o4 || !e4);
          a3.length = o4, t3 = o4 && a3[o4 - 1].tag;
        } else "br" === n4.toLowerCase() ? r3.start && r3.start(n4, [], true, "") : "p" === n4.toLowerCase() && (r3.start && r3.start(n4, [], false, "", true), r3.end && r3.end(n4, []));
      }
      r3.partialMarkup || P2();
    }
    return Ii.HTMLParser = A2, Ii.HTMLtoXML = function(e3) {
      var r3 = "";
      return new A2(e3, { start: function(e4, t3, n3) {
        r3 += "<" + e4;
        for (var o3 = 0, i3 = t3.length; o3 < i3; o3++) r3 += " " + t3[o3].name + '="' + (t3[o3].value || "").replace(/"/g, "&#34;") + '"';
        r3 += (n3 ? "/" : "") + ">";
      }, end: function(e4) {
        r3 += "</" + e4 + ">";
      }, chars: function(e4) {
        r3 += e4;
      }, comment: function(e4) {
        r3 += "<!--" + e4 + "-->";
      }, ignore: function(e4) {
        r3 += e4;
      } }), r3;
    }, Ii.HTMLtoDOM = function(e3, r3) {
      var t3 = { html: true, head: true, body: true, title: true }, n3 = { link: "head", base: "head" };
      r3 ? r3 = r3.ownerDocument || r3.getOwnerDocument && r3.getOwnerDocument() || r3 : "undefined" != typeof DOMDocument ? r3 = new DOMDocument() : "undefined" != typeof document && document.implementation && document.implementation.createDocument ? r3 = document.implementation.createDocument("", "", null) : "undefined" != typeof ActiveX && (r3 = new ActiveXObject("Msxml.DOMDocument"));
      var o3, i3, a3 = [];
      if (!(r3.documentElement || r3.getDocumentElement && r3.getDocumentElement()) && r3.createElement && (o3 = r3.createElement("html"), (i3 = r3.createElement("head")).appendChild(r3.createElement("title")), o3.appendChild(i3), o3.appendChild(r3.createElement("body")), r3.appendChild(o3)), r3.getElementsByTagName) for (var u3 in t3) t3[u3] = r3.getElementsByTagName(u3)[0];
      var s3 = t3.body;
      return new A2(e3, { start: function(e4, o4, i4) {
        if (t3[e4]) s3 = t3[e4];
        else {
          var u4 = r3.createElement(e4);
          for (var l3 in o4) u4.setAttribute(o4[l3].name, o4[l3].value);
          n3[e4] && "boolean" != typeof t3[n3[e4]] ? t3[n3[e4]].appendChild(u4) : s3 && s3.appendChild && s3.appendChild(u4), i4 || (a3.push(u4), s3 = u4);
        }
      }, end: function() {
        a3.length -= 1, s3 = a3[a3.length - 1];
      }, chars: function(e4) {
        s3.appendChild(r3.createTextNode(e4));
      }, comment: function() {
      }, ignore: function() {
      } }), r3;
    }, Ii;
  }
  function zi() {
    return ai ? ii : (ai = 1, ii = { ABSOLUTE: "absolute", PATH_RELATIVE: "pathRelative", ROOT_RELATIVE: "rootRelative", SHORTEST: "shortest" });
  }
  function Gi() {
    if (si) return ui;
    si = 1;
    var e2 = zi();
    function r2(e3, r3) {
      var t3 = r3.removeEmptyQueries && e3.extra.relation.minimumPort;
      return e3.query.string[t3 ? "stripped" : "full"];
    }
    function t2(r3, t3) {
      return !r3.extra.relation.minimumQuery || t3.output === e2.ABSOLUTE || t3.output === e2.ROOT_RELATIVE;
    }
    function n2(r3, t3) {
      var n3 = t3.removeDirectoryIndexes && r3.extra.resourceIsIndex, o2 = r3.extra.relation.minimumResource && t3.output !== e2.ABSOLUTE && t3.output !== e2.ROOT_RELATIVE;
      return !!r3.resource && !o2 && !n3;
    }
    return ui = function(o2, i2) {
      var a2 = "";
      return a2 += function(r3, t3) {
        var n3 = "";
        return (r3.extra.relation.maximumHost || t3.output === e2.ABSOLUTE) && (r3.extra.relation.minimumScheme && t3.schemeRelative && t3.output !== e2.ABSOLUTE ? n3 += "//" : n3 += r3.scheme + "://"), n3;
      }(o2, i2), a2 += function(r3, t3) {
        return !r3.auth || t3.removeAuth || !r3.extra.relation.maximumHost && t3.output !== e2.ABSOLUTE ? "" : r3.auth + "@";
      }(o2, i2), a2 += function(r3, t3) {
        return r3.host.full && (r3.extra.relation.maximumAuth || t3.output === e2.ABSOLUTE) ? r3.host.full : "";
      }(o2, i2), a2 += function(e3) {
        return e3.port && !e3.extra.portIsDefault && e3.extra.relation.maximumHost ? ":" + e3.port : "";
      }(o2), a2 += function(o3, i3) {
        var a3 = "", u2 = o3.path.absolute.string, s2 = o3.path.relative.string, l2 = n2(o3, i3);
        if (o3.extra.relation.maximumHost || i3.output === e2.ABSOLUTE || i3.output === e2.ROOT_RELATIVE) a3 = u2;
        else if (s2.length <= u2.length && i3.output === e2.SHORTEST || i3.output === e2.PATH_RELATIVE) {
          if ("" === (a3 = s2)) {
            var c2 = t2(o3, i3) && !!r2(o3, i3);
            o3.extra.relation.maximumPath && !l2 ? a3 = "./" : !o3.extra.relation.overridesQuery || l2 || c2 || (a3 = "./");
          }
        } else a3 = u2;
        return "/" !== a3 || l2 || !i3.removeRootTrailingSlash || o3.extra.relation.minimumPort && i3.output !== e2.ABSOLUTE || (a3 = ""), a3;
      }(o2, i2), a2 += function(e3, r3) {
        return n2(e3, r3) ? e3.resource : "";
      }(o2, i2), a2 += function(e3, n3) {
        return t2(e3, n3) ? r2(e3, n3) : "";
      }(o2, i2), a2 += function(e3) {
        return e3.hash ? e3.hash : "";
      }(o2);
    };
  }
  function Hi() {
    if (ci) return li;
    return ci = 1, li = { clone: function e2(r2) {
      if (r2 instanceof Object) {
        var t2 = r2 instanceof Array ? [] : {};
        for (var n2 in r2) r2.hasOwnProperty(n2) && (t2[n2] = e2(r2[n2]));
        return t2;
      }
      return r2;
    }, isPlainObject: function(e2) {
      return !!e2 && "object" == typeof e2 && e2.constructor === Object;
    }, shallowMerge: function(e2, r2) {
      if (e2 instanceof Object && r2 instanceof Object) for (var t2 in r2) r2.hasOwnProperty(t2) && (e2[t2] = r2[t2]);
      return e2;
    } }, li;
  }
  function Yi() {
    if (Si) return xi;
    return Si = 1, xi = { join: function(e2) {
      return e2.length > 0 ? e2.join("/") + "/" : "";
    }, resolveDotSegments: function(e2) {
      var r2 = [];
      return e2.forEach(function(e3) {
        ".." !== e3 ? "." !== e3 && r2.push(e3) : r2.length > 0 && r2.splice(r2.length - 1, 1);
      }), r2;
    } };
  }
  function Wi() {
    if (ki) return Ri;
    ki = 1;
    var e2 = mi ? di : (mi = 1, di = function(e3) {
      var r3 = !(e3.scheme || e3.auth || e3.host.full || e3.port), t3 = r3 && !e3.path.absolute.string, n3 = t3 && !e3.resource, o2 = n3 && !e3.query.string.full.length, i3 = o2 && !e3.hash;
      e3.extra.hrefInfo.minimumPathOnly = r3, e3.extra.hrefInfo.minimumResourceOnly = t3, e3.extra.hrefInfo.minimumQueryOnly = n3, e3.extra.hrefInfo.minimumHashOnly = o2, e3.extra.hrefInfo.empty = i3;
    }), r2 = hi ? gi : (hi = 1, gi = function(e3, r3) {
      if (r3.ignore_www) {
        var t3 = e3.host.full;
        if (t3) {
          var n3 = t3;
          0 === t3.indexOf("www.") && (n3 = t3.substr(4)), e3.host.stripped = n3;
        }
      }
    }), t2 = function() {
      if (bi) return vi;
      function e3(e4) {
        if ("/" !== e4) {
          var r3 = [];
          return e4.split("/").forEach(function(e5) {
            "" !== e5 && r3.push(e5);
          }), r3;
        }
        return [];
      }
      return bi = 1, vi = function(r3, t3) {
        var n3 = r3.path.absolute.string;
        if (n3) {
          var o2 = n3.lastIndexOf("/");
          if (o2 > -1) {
            if (++o2 < n3.length) {
              var i3 = n3.substr(o2);
              "." !== i3 && ".." !== i3 ? (r3.resource = i3, n3 = n3.substr(0, o2)) : n3 += "/";
            }
            r3.path.absolute.string = n3, r3.path.absolute.array = e3(n3);
          } else "." === n3 || ".." === n3 ? (n3 += "/", r3.path.absolute.string = n3, r3.path.absolute.array = e3(n3)) : (r3.resource = n3, r3.path.absolute.string = null);
          r3.extra.resourceIsIndex = function(e4, r4) {
            var t4 = false;
            return r4.directoryIndexes.every(function(r5) {
              return r5 !== e4 || (t4 = true, false);
            }), t4;
          }(r3.resource, t3);
        }
      };
    }(), n2 = Ei ? yi : (Ei = 1, yi = function(e3, r3) {
      var t3 = -1;
      for (var n3 in r3.defaultPorts) if (n3 === e3.scheme && r3.defaultPorts.hasOwnProperty(n3)) {
        t3 = r3.defaultPorts[n3];
        break;
      }
      t3 > -1 && (t3 = t3.toString(), null === e3.port && (e3.port = t3), e3.extra.portIsDefault = e3.port === t3);
    }), i2 = function() {
      if (wi) return Ai;
      wi = 1;
      var e3 = Object.prototype.hasOwnProperty;
      function r3(r4, t3) {
        var n3 = 0, o2 = "";
        for (var i3 in r4) if ("" !== i3 && true === e3.call(r4, i3)) {
          var a3 = r4[i3];
          "" === a3 && t3 || (o2 += 1 == ++n3 ? "?" : "&", i3 = encodeURIComponent(i3), o2 += "" !== a3 ? i3 + "=" + encodeURIComponent(a3).replace(/%20/g, "+") : i3);
        }
        return o2;
      }
      return Ai = function(e4, t3) {
        e4.query.string.full = r3(e4.query.object, false), t3.removeEmptyQueries && (e4.query.string.stripped = r3(e4.query.object, true));
      };
    }(), a2 = function() {
      if (Ci) return Oi;
      Ci = 1;
      var e3 = o.parse;
      return Oi = function(r3, t3) {
        return function(e4, r4) {
          var t4 = true;
          return r4.rejectedSchemes.every(function(r5) {
            return t4 = !(0 === e4.indexOf(r5 + ":"));
          }), t4;
        }(r3, t3) ? ((o2 = (n3 = e3(r3, true, t3.slashesDenoteHost)).protocol) && o2.indexOf(":") === o2.length - 1 && (o2 = o2.substr(0, o2.length - 1)), n3.host = { full: n3.hostname, stripped: null }, n3.path = { absolute: { array: null, string: n3.pathname }, relative: { array: null, string: null } }, n3.query = { object: n3.query, string: { full: null, stripped: null } }, n3.extra = { hrefInfo: { minimumPathOnly: null, minimumResourceOnly: null, minimumQueryOnly: null, minimumHashOnly: null, empty: null, separatorOnlyQuery: "?" === n3.search }, portIsDefault: null, relation: { maximumScheme: null, maximumAuth: null, maximumHost: null, maximumPort: null, maximumPath: null, maximumResource: null, maximumQuery: null, maximumHash: null, minimumScheme: null, minimumAuth: null, minimumHost: null, minimumPort: null, minimumPath: null, minimumResource: null, minimumQuery: null, minimumHash: null, overridesQuery: null }, resourceIsIndex: null, slashes: n3.slashes }, n3.resource = null, n3.scheme = o2, delete n3.hostname, delete n3.pathname, delete n3.protocol, delete n3.search, delete n3.slashes, n3) : { href: r3, valid: false };
        var n3, o2;
      };
    }(), u2 = Yi();
    function s2(o2, u3) {
      var s3 = a2(o2, u3);
      return false === s3.valid || (r2(s3, u3), n2(s3, u3), t2(s3, u3), i2(s3, u3), e2(s3)), s3;
    }
    return Ri = { from: function(e3, r3, t3) {
      if (e3) {
        var n3 = s2(e3, r3), o2 = u2.resolveDotSegments(n3.path.absolute.array);
        return n3.path.absolute.array = o2, n3.path.absolute.string = "/" + u2.join(o2), n3;
      }
      return t3;
    }, to: s2 };
  }
  function Qi() {
    if (_i) return Di;
    _i = 1;
    var e2 = Li ? Ti : (Li = 1, Ti = { pathOn: function(e3, r3, t3) {
      var n2 = e3.extra.hrefInfo.minimumQueryOnly, o2 = e3.extra.hrefInfo.minimumHashOnly, i2 = e3.extra.hrefInfo.empty, a2 = e3.extra.relation.minimumPort, u2 = e3.extra.relation.minimumScheme, s2 = a2 && e3.path.absolute.string === r3.path.absolute.string, l2 = e3.resource === r3.resource || !e3.resource && r3.extra.resourceIsIndex || t3.removeDirectoryIndexes && e3.extra.resourceIsIndex && !r3.resource, c2 = s2 && (l2 || n2 || o2 || i2), p2 = t3.removeEmptyQueries ? "stripped" : "full", f2 = e3.query.string[p2], d2 = r3.query.string[p2], m2 = c2 && !!f2 && f2 === d2 || (o2 || i2) && !e3.extra.hrefInfo.separatorOnlyQuery, g2 = m2 && e3.hash === r3.hash;
      e3.extra.relation.minimumPath = s2, e3.extra.relation.minimumResource = c2, e3.extra.relation.minimumQuery = m2, e3.extra.relation.minimumHash = g2, e3.extra.relation.maximumPort = !u2 || u2 && !s2, e3.extra.relation.maximumPath = !u2 || u2 && !c2, e3.extra.relation.maximumResource = !u2 || u2 && !m2, e3.extra.relation.maximumQuery = !u2 || u2 && !g2, e3.extra.relation.maximumHash = !u2 || u2 && !g2, e3.extra.relation.overridesQuery = s2 && e3.extra.relation.maximumResource && !m2 && !!d2;
    }, upToPath: function(e3, r3, t3) {
      var n2 = e3.extra.hrefInfo.minimumPathOnly, o2 = e3.scheme === r3.scheme || !e3.scheme, i2 = o2 && (e3.auth === r3.auth || t3.removeAuth || n2), a2 = t3.ignore_www ? "stripped" : "full", u2 = i2 && (e3.host[a2] === r3.host[a2] || n2), s2 = u2 && (e3.port === r3.port || n2);
      e3.extra.relation.minimumScheme = o2, e3.extra.relation.minimumAuth = i2, e3.extra.relation.minimumHost = u2, e3.extra.relation.minimumPort = s2, e3.extra.relation.maximumScheme = !o2 || o2 && !i2, e3.extra.relation.maximumAuth = !o2 || o2 && !u2, e3.extra.relation.maximumHost = !o2 || o2 && !s2;
    } }), r2 = Hi(), t2 = Yi();
    return Di = function(n2, o2, i2) {
      e2.upToPath(n2, o2, i2), n2.extra.relation.minimumScheme && (n2.scheme = o2.scheme), n2.extra.relation.minimumAuth && (n2.auth = o2.auth), n2.extra.relation.minimumHost && (n2.host = r2.clone(o2.host)), n2.extra.relation.minimumPort && function(e3, r3) {
        e3.port = r3.port, e3.extra.portIsDefault = r3.extra.portIsDefault;
      }(n2, o2), n2.extra.relation.minimumScheme && function(e3, n3) {
        if (e3.extra.relation.maximumHost || !e3.extra.hrefInfo.minimumResourceOnly) {
          var o3 = e3.path.absolute.array, i3 = "/";
          o3 ? (e3.extra.hrefInfo.minimumPathOnly && 0 !== e3.path.absolute.string.indexOf("/") && (o3 = n3.path.absolute.array.concat(o3)), o3 = t2.resolveDotSegments(o3), i3 += t2.join(o3)) : o3 = [], e3.path.absolute.array = o3, e3.path.absolute.string = i3;
        } else e3.path = r2.clone(n3.path);
      }(n2, o2), e2.pathOn(n2, o2, i2), n2.extra.relation.minimumResource && function(e3, r3) {
        e3.resource = r3.resource, e3.extra.resourceIsIndex = r3.extra.resourceIsIndex;
      }(n2, o2), n2.extra.relation.minimumQuery && (n2.query = r2.clone(o2.query)), n2.extra.relation.minimumHash && (n2.hash = o2.hash);
    };
  }
  function Zi() {
    if (Ni) return Pi;
    Ni = 1;
    var e2 = Qi(), r2 = function() {
      if (qi) return Bi;
      qi = 1;
      var e3 = Yi();
      return Bi = function(r3, t2, n2) {
        if (r3.extra.relation.minimumScheme) {
          var o2 = (i2 = r3.path.absolute.array, a2 = t2.path.absolute.array, u2 = [], s2 = true, l2 = -1, a2.forEach(function(e4, r4) {
            s2 && (i2[r4] !== e4 ? s2 = false : l2 = r4), s2 || u2.push("..");
          }), i2.forEach(function(e4, r4) {
            r4 > l2 && u2.push(e4);
          }), u2);
          r3.path.relative.array = o2, r3.path.relative.string = e3.join(o2);
        }
        var i2, a2, u2, s2, l2;
      };
    }();
    return Pi = function(t2, n2, o2) {
      return e2(n2, t2, o2), r2(n2, t2, o2), n2;
    };
  }
  function Ji() {
    if (Fi) return Ui;
    Fi = 1;
    var e2 = zi(), r2 = Gi(), t2 = function() {
      if (fi) return pi;
      fi = 1;
      var e3 = Hi();
      function r3(r4, t3) {
        return t3 instanceof Object && r4 instanceof Object ? t3 instanceof Array && r4 instanceof Array ? t3.concat(r4) : e3.shallowMerge(r4, t3) : r4;
      }
      return pi = function(t3, n3) {
        if (e3.isPlainObject(t3)) {
          var o3 = {};
          for (var i3 in n3) n3.hasOwnProperty(i3) && (void 0 !== t3[i3] ? o3[i3] = r3(t3[i3], n3[i3]) : o3[i3] = n3[i3]);
          return o3;
        }
        return n3;
      };
    }(), n2 = Hi(), o2 = Wi(), i2 = Zi();
    function a2(e3, r3) {
      this.options = t2(r3, { defaultPorts: { ftp: 21, http: 80, https: 443 }, directoryIndexes: ["index.html"], ignore_www: false, output: a2.SHORTEST, rejectedSchemes: ["data", "javascript", "mailto"], removeAuth: false, removeDirectoryIndexes: true, removeEmptyQueries: false, removeRootTrailingSlash: true, schemeRelative: true, site: void 0, slashesDenoteHost: true }), this.from = o2.from(e3, this.options, null);
    }
    return a2.prototype.relate = function(e3, a3, u2) {
      if (n2.isPlainObject(a3) ? (u2 = a3, a3 = e3, e3 = null) : a3 || (a3 = e3, e3 = null), u2 = t2(u2, this.options), e3 = e3 || u2.site, !(e3 = o2.from(e3, u2, this.from)) || !e3.href) throw new Error("from value not defined.");
      if (e3.extra.hrefInfo.minimumPathOnly) throw new Error("from value supplied is not absolute: " + e3.href);
      return false === (a3 = o2.to(a3, u2)).valid ? a3.href : (a3 = i2(e3, a3, u2), a3 = r2(a3, u2));
    }, a2.relate = function(e3, r3, t3) {
      return new a2().relate(e3, r3, t3);
    }, n2.shallowMerge(a2, e2), Ui = a2;
  }
  var Xi, ea, ra, ta, na, oa, ia, aa, ua, sa, la, ca, pa, fa, da, ma, ga, ha, va = {};
  function ba() {
    return Xi || (Xi = 1, function(r2) {
      var t2, n2 = e;
      function o2() {
        var e2 = OutputStream({ beautify: true });
        return function r3(t3) {
          e2.print("AST_" + t3.TYPE);
          var n3 = t3.SELF_PROPS.filter(function(e3) {
            return !/^\$/.test(e3);
          });
          n3.length > 0 && (e2.space(), e2.with_parens(function() {
            n3.forEach(function(r4, t4) {
              t4 && e2.space(), e2.print(r4);
            });
          })), t3.documentation && (e2.space(), e2.print_string(t3.documentation)), t3.SUBCLASSES.length > 0 && (e2.space(), e2.with_block(function() {
            t3.SUBCLASSES.forEach(function(t4, n4) {
              e2.indent(), r3(t4), e2.newline();
            });
          }));
        }(AST_Node), e2 + "\n";
      }
      function i2(e2) {
        var t3 = r2.minify("", e2);
        return t3.error && t3.error.defs;
      }
      r2.FILES = ["../lib/utils.js", "../lib/ast.js", "../lib/parse.js", "../lib/transform.js", "../lib/scope.js", "../lib/output.js", "../lib/compress.js", "../lib/sourcemap.js", "../lib/mozilla-ast.js", "../lib/propmangle.js", "../lib/minify.js", "./exports.js"].map(function(e2) {
        return require.resolve(e2);
      }), new Function("MOZ_SourceMap", "exports", ((t2 = r2.FILES.map(function(e2) {
        return n2.readFileSync(e2, "utf8");
      })).push("exports.describe_ast = " + o2.toString()), t2.join("\n\n")))(Uo(), r2), r2.default_options = function() {
        var e2 = {};
        return Object.keys(i2({ 0: 0 })).forEach(function(r3) {
          var t3 = {};
          t3[r3] = { 0: 0 }, (t3 = i2(t3)) && (e2[r3] = t3);
        }), e2;
      };
    }(va)), va;
  }
  function ya() {
    if (ea) return Ot;
    ea = 1;
    var e2, r2, t2 = Po ? qo : (Po = 1, qo = Xo()), n2 = (ei || (ei = 1, e2 = ri, r2 = ri.exports, function(t3) {
      var n3 = r2, o3 = e2 && e2.exports == n3 && e2, i3 = "object" == typeof s && s;
      i3.global !== i3 && i3.window !== i3 || (t3 = i3);
      var a3 = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g, u3 = /[\x01-\x7F]/g, l3 = /[\x01-\t\x0B\f\x0E-\x1F\x7F\x81\x8D\x8F\x90\x9D\xA0-\uFFFF]/g, c3 = /<\u20D2|=\u20E5|>\u20D2|\u205F\u200A|\u219D\u0338|\u2202\u0338|\u2220\u20D2|\u2229\uFE00|\u222A\uFE00|\u223C\u20D2|\u223D\u0331|\u223E\u0333|\u2242\u0338|\u224B\u0338|\u224D\u20D2|\u224E\u0338|\u224F\u0338|\u2250\u0338|\u2261\u20E5|\u2264\u20D2|\u2265\u20D2|\u2266\u0338|\u2267\u0338|\u2268\uFE00|\u2269\uFE00|\u226A\u0338|\u226A\u20D2|\u226B\u0338|\u226B\u20D2|\u227F\u0338|\u2282\u20D2|\u2283\u20D2|\u228A\uFE00|\u228B\uFE00|\u228F\u0338|\u2290\u0338|\u2293\uFE00|\u2294\uFE00|\u22B4\u20D2|\u22B5\u20D2|\u22D8\u0338|\u22D9\u0338|\u22DA\uFE00|\u22DB\uFE00|\u22F5\u0338|\u22F9\u0338|\u2933\u0338|\u29CF\u0338|\u29D0\u0338|\u2A6D\u0338|\u2A70\u0338|\u2A7D\u0338|\u2A7E\u0338|\u2AA1\u0338|\u2AA2\u0338|\u2AAC\uFE00|\u2AAD\uFE00|\u2AAF\u0338|\u2AB0\u0338|\u2AC5\u0338|\u2AC6\u0338|\u2ACB\uFE00|\u2ACC\uFE00|\u2AFD\u20E5|[\xA0-\u0113\u0116-\u0122\u0124-\u012B\u012E-\u014D\u0150-\u017E\u0192\u01B5\u01F5\u0237\u02C6\u02C7\u02D8-\u02DD\u0311\u0391-\u03A1\u03A3-\u03A9\u03B1-\u03C9\u03D1\u03D2\u03D5\u03D6\u03DC\u03DD\u03F0\u03F1\u03F5\u03F6\u0401-\u040C\u040E-\u044F\u0451-\u045C\u045E\u045F\u2002-\u2005\u2007-\u2010\u2013-\u2016\u2018-\u201A\u201C-\u201E\u2020-\u2022\u2025\u2026\u2030-\u2035\u2039\u203A\u203E\u2041\u2043\u2044\u204F\u2057\u205F-\u2063\u20AC\u20DB\u20DC\u2102\u2105\u210A-\u2113\u2115-\u211E\u2122\u2124\u2127-\u2129\u212C\u212D\u212F-\u2131\u2133-\u2138\u2145-\u2148\u2153-\u215E\u2190-\u219B\u219D-\u21A7\u21A9-\u21AE\u21B0-\u21B3\u21B5-\u21B7\u21BA-\u21DB\u21DD\u21E4\u21E5\u21F5\u21FD-\u2205\u2207-\u2209\u220B\u220C\u220F-\u2214\u2216-\u2218\u221A\u221D-\u2238\u223A-\u2257\u2259\u225A\u225C\u225F-\u2262\u2264-\u228B\u228D-\u229B\u229D-\u22A5\u22A7-\u22B0\u22B2-\u22BB\u22BD-\u22DB\u22DE-\u22E3\u22E6-\u22F7\u22F9-\u22FE\u2305\u2306\u2308-\u2310\u2312\u2313\u2315\u2316\u231C-\u231F\u2322\u2323\u232D\u232E\u2336\u233D\u233F\u237C\u23B0\u23B1\u23B4-\u23B6\u23DC-\u23DF\u23E2\u23E7\u2423\u24C8\u2500\u2502\u250C\u2510\u2514\u2518\u251C\u2524\u252C\u2534\u253C\u2550-\u256C\u2580\u2584\u2588\u2591-\u2593\u25A1\u25AA\u25AB\u25AD\u25AE\u25B1\u25B3-\u25B5\u25B8\u25B9\u25BD-\u25BF\u25C2\u25C3\u25CA\u25CB\u25EC\u25EF\u25F8-\u25FC\u2605\u2606\u260E\u2640\u2642\u2660\u2663\u2665\u2666\u266A\u266D-\u266F\u2713\u2717\u2720\u2736\u2758\u2772\u2773\u27C8\u27C9\u27E6-\u27ED\u27F5-\u27FA\u27FC\u27FF\u2902-\u2905\u290C-\u2913\u2916\u2919-\u2920\u2923-\u292A\u2933\u2935-\u2939\u293C\u293D\u2945\u2948-\u294B\u294E-\u2976\u2978\u2979\u297B-\u297F\u2985\u2986\u298B-\u2996\u299A\u299C\u299D\u29A4-\u29B7\u29B9\u29BB\u29BC\u29BE-\u29C5\u29C9\u29CD-\u29D0\u29DC-\u29DE\u29E3-\u29E5\u29EB\u29F4\u29F6\u2A00-\u2A02\u2A04\u2A06\u2A0C\u2A0D\u2A10-\u2A17\u2A22-\u2A27\u2A29\u2A2A\u2A2D-\u2A31\u2A33-\u2A3C\u2A3F\u2A40\u2A42-\u2A4D\u2A50\u2A53-\u2A58\u2A5A-\u2A5D\u2A5F\u2A66\u2A6A\u2A6D-\u2A75\u2A77-\u2A9A\u2A9D-\u2AA2\u2AA4-\u2AB0\u2AB3-\u2AC8\u2ACB\u2ACC\u2ACF-\u2ADB\u2AE4\u2AE6-\u2AE9\u2AEB-\u2AF3\u2AFD\uFB00-\uFB04]|\uD835[\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDCCF\uDD04\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDD6B]/g, p3 = { "­": "shy", "‌": "zwnj", "‍": "zwj", "‎": "lrm", "⁣": "ic", "⁢": "it", "⁡": "af", "‏": "rlm", "​": "ZeroWidthSpace", "⁠": "NoBreak", "̑": "DownBreve", "⃛": "tdot", "⃜": "DotDot", "	": "Tab", "\n": "NewLine", " ": "puncsp", " ": "MediumSpace", " ": "thinsp", " ": "hairsp", " ": "emsp13", " ": "ensp", " ": "emsp14", " ": "emsp", " ": "numsp", " ": "nbsp", "  ": "ThickSpace", "‾": "oline", _: "lowbar", "‐": "dash", "–": "ndash", "—": "mdash", "―": "horbar", ",": "comma", ";": "semi", "⁏": "bsemi", ":": "colon", "⩴": "Colone", "!": "excl", "¡": "iexcl", "?": "quest", "¿": "iquest", ".": "period", "‥": "nldr", "…": "mldr", "·": "middot", "'": "apos", "‘": "lsquo", "’": "rsquo", "‚": "sbquo", "‹": "lsaquo", "›": "rsaquo", '"': "quot", "“": "ldquo", "”": "rdquo", "„": "bdquo", "«": "laquo", "»": "raquo", "(": "lpar", ")": "rpar", "[": "lsqb", "]": "rsqb", "{": "lcub", "}": "rcub", "⌈": "lceil", "⌉": "rceil", "⌊": "lfloor", "⌋": "rfloor", "⦅": "lopar", "⦆": "ropar", "⦋": "lbrke", "⦌": "rbrke", "⦍": "lbrkslu", "⦎": "rbrksld", "⦏": "lbrksld", "⦐": "rbrkslu", "⦑": "langd", "⦒": "rangd", "⦓": "lparlt", "⦔": "rpargt", "⦕": "gtlPar", "⦖": "ltrPar", "⟦": "lobrk", "⟧": "robrk", "⟨": "lang", "⟩": "rang", "⟪": "Lang", "⟫": "Rang", "⟬": "loang", "⟭": "roang", "❲": "lbbrk", "❳": "rbbrk", "‖": "Vert", "§": "sect", "¶": "para", "@": "commat", "*": "ast", "/": "sol", undefined: null, "&": "amp", "#": "num", "%": "percnt", "‰": "permil", "‱": "pertenk", "†": "dagger", "‡": "Dagger", "•": "bull", "⁃": "hybull", "′": "prime", "″": "Prime", "‴": "tprime", "⁗": "qprime", "‵": "bprime", "⁁": "caret", "`": "grave", "´": "acute", "˜": "tilde", "^": "Hat", "¯": "macr", "˘": "breve", "˙": "dot", "¨": "die", "˚": "ring", "˝": "dblac", "¸": "cedil", "˛": "ogon", "ˆ": "circ", "ˇ": "caron", "°": "deg", "©": "copy", "®": "reg", "℗": "copysr", "℘": "wp", "℞": "rx", "℧": "mho", "℩": "iiota", "←": "larr", "↚": "nlarr", "→": "rarr", "↛": "nrarr", "↑": "uarr", "↓": "darr", "↔": "harr", "↮": "nharr", "↕": "varr", "↖": "nwarr", "↗": "nearr", "↘": "searr", "↙": "swarr", "↝": "rarrw", "↝̸": "nrarrw", "↞": "Larr", "↟": "Uarr", "↠": "Rarr", "↡": "Darr", "↢": "larrtl", "↣": "rarrtl", "↤": "mapstoleft", "↥": "mapstoup", "↦": "map", "↧": "mapstodown", "↩": "larrhk", "↪": "rarrhk", "↫": "larrlp", "↬": "rarrlp", "↭": "harrw", "↰": "lsh", "↱": "rsh", "↲": "ldsh", "↳": "rdsh", "↵": "crarr", "↶": "cularr", "↷": "curarr", "↺": "olarr", "↻": "orarr", "↼": "lharu", "↽": "lhard", "↾": "uharr", "↿": "uharl", "⇀": "rharu", "⇁": "rhard", "⇂": "dharr", "⇃": "dharl", "⇄": "rlarr", "⇅": "udarr", "⇆": "lrarr", "⇇": "llarr", "⇈": "uuarr", "⇉": "rrarr", "⇊": "ddarr", "⇋": "lrhar", "⇌": "rlhar", "⇐": "lArr", "⇍": "nlArr", "⇑": "uArr", "⇒": "rArr", "⇏": "nrArr", "⇓": "dArr", "⇔": "iff", "⇎": "nhArr", "⇕": "vArr", "⇖": "nwArr", "⇗": "neArr", "⇘": "seArr", "⇙": "swArr", "⇚": "lAarr", "⇛": "rAarr", "⇝": "zigrarr", "⇤": "larrb", "⇥": "rarrb", "⇵": "duarr", "⇽": "loarr", "⇾": "roarr", "⇿": "hoarr", "∀": "forall", "∁": "comp", "∂": "part", "∂̸": "npart", "∃": "exist", "∄": "nexist", "∅": "empty", "∇": "Del", "∈": "in", "∉": "notin", "∋": "ni", "∌": "notni", "϶": "bepsi", "∏": "prod", "∐": "coprod", "∑": "sum", "+": "plus", "±": "pm", "÷": "div", "×": "times", "<": "lt", "≮": "nlt", "<⃒": "nvlt", "=": "equals", "≠": "ne", "=⃥": "bne", "⩵": "Equal", ">": "gt", "≯": "ngt", ">⃒": "nvgt", "¬": "not", "|": "vert", "¦": "brvbar", "−": "minus", "∓": "mp", "∔": "plusdo", "⁄": "frasl", "∖": "setmn", "∗": "lowast", "∘": "compfn", "√": "Sqrt", "∝": "prop", "∞": "infin", "∟": "angrt", "∠": "ang", "∠⃒": "nang", "∡": "angmsd", "∢": "angsph", "∣": "mid", "∤": "nmid", "∥": "par", "∦": "npar", "∧": "and", "∨": "or", "∩": "cap", "∩︀": "caps", "∪": "cup", "∪︀": "cups", "∫": "int", "∬": "Int", "∭": "tint", "⨌": "qint", "∮": "oint", "∯": "Conint", "∰": "Cconint", "∱": "cwint", "∲": "cwconint", "∳": "awconint", "∴": "there4", "∵": "becaus", "∶": "ratio", "∷": "Colon", "∸": "minusd", "∺": "mDDot", "∻": "homtht", "∼": "sim", "≁": "nsim", "∼⃒": "nvsim", "∽": "bsim", "∽̱": "race", "∾": "ac", "∾̳": "acE", "∿": "acd", "≀": "wr", "≂": "esim", "≂̸": "nesim", "≃": "sime", "≄": "nsime", "≅": "cong", "≇": "ncong", "≆": "simne", "≈": "ap", "≉": "nap", "≊": "ape", "≋": "apid", "≋̸": "napid", "≌": "bcong", "≍": "CupCap", "≭": "NotCupCap", "≍⃒": "nvap", "≎": "bump", "≎̸": "nbump", "≏": "bumpe", "≏̸": "nbumpe", "≐": "doteq", "≐̸": "nedot", "≑": "eDot", "≒": "efDot", "≓": "erDot", "≔": "colone", "≕": "ecolon", "≖": "ecir", "≗": "cire", "≙": "wedgeq", "≚": "veeeq", "≜": "trie", "≟": "equest", "≡": "equiv", "≢": "nequiv", "≡⃥": "bnequiv", "≤": "le", "≰": "nle", "≤⃒": "nvle", "≥": "ge", "≱": "nge", "≥⃒": "nvge", "≦": "lE", "≦̸": "nlE", "≧": "gE", "≧̸": "ngE", "≨︀": "lvnE", "≨": "lnE", "≩": "gnE", "≩︀": "gvnE", "≪": "ll", "≪̸": "nLtv", "≪⃒": "nLt", "≫": "gg", "≫̸": "nGtv", "≫⃒": "nGt", "≬": "twixt", "≲": "lsim", "≴": "nlsim", "≳": "gsim", "≵": "ngsim", "≶": "lg", "≸": "ntlg", "≷": "gl", "≹": "ntgl", "≺": "pr", "⊀": "npr", "≻": "sc", "⊁": "nsc", "≼": "prcue", "⋠": "nprcue", "≽": "sccue", "⋡": "nsccue", "≾": "prsim", "≿": "scsim", "≿̸": "NotSucceedsTilde", "⊂": "sub", "⊄": "nsub", "⊂⃒": "vnsub", "⊃": "sup", "⊅": "nsup", "⊃⃒": "vnsup", "⊆": "sube", "⊈": "nsube", "⊇": "supe", "⊉": "nsupe", "⊊︀": "vsubne", "⊊": "subne", "⊋︀": "vsupne", "⊋": "supne", "⊍": "cupdot", "⊎": "uplus", "⊏": "sqsub", "⊏̸": "NotSquareSubset", "⊐": "sqsup", "⊐̸": "NotSquareSuperset", "⊑": "sqsube", "⋢": "nsqsube", "⊒": "sqsupe", "⋣": "nsqsupe", "⊓": "sqcap", "⊓︀": "sqcaps", "⊔": "sqcup", "⊔︀": "sqcups", "⊕": "oplus", "⊖": "ominus", "⊗": "otimes", "⊘": "osol", "⊙": "odot", "⊚": "ocir", "⊛": "oast", "⊝": "odash", "⊞": "plusb", "⊟": "minusb", "⊠": "timesb", "⊡": "sdotb", "⊢": "vdash", "⊬": "nvdash", "⊣": "dashv", "⊤": "top", "⊥": "bot", "⊧": "models", "⊨": "vDash", "⊭": "nvDash", "⊩": "Vdash", "⊮": "nVdash", "⊪": "Vvdash", "⊫": "VDash", "⊯": "nVDash", "⊰": "prurel", "⊲": "vltri", "⋪": "nltri", "⊳": "vrtri", "⋫": "nrtri", "⊴": "ltrie", "⋬": "nltrie", "⊴⃒": "nvltrie", "⊵": "rtrie", "⋭": "nrtrie", "⊵⃒": "nvrtrie", "⊶": "origof", "⊷": "imof", "⊸": "mumap", "⊹": "hercon", "⊺": "intcal", "⊻": "veebar", "⊽": "barvee", "⊾": "angrtvb", "⊿": "lrtri", "⋀": "Wedge", "⋁": "Vee", "⋂": "xcap", "⋃": "xcup", "⋄": "diam", "⋅": "sdot", "⋆": "Star", "⋇": "divonx", "⋈": "bowtie", "⋉": "ltimes", "⋊": "rtimes", "⋋": "lthree", "⋌": "rthree", "⋍": "bsime", "⋎": "cuvee", "⋏": "cuwed", "⋐": "Sub", "⋑": "Sup", "⋒": "Cap", "⋓": "Cup", "⋔": "fork", "⋕": "epar", "⋖": "ltdot", "⋗": "gtdot", "⋘": "Ll", "⋘̸": "nLl", "⋙": "Gg", "⋙̸": "nGg", "⋚︀": "lesg", "⋚": "leg", "⋛": "gel", "⋛︀": "gesl", "⋞": "cuepr", "⋟": "cuesc", "⋦": "lnsim", "⋧": "gnsim", "⋨": "prnsim", "⋩": "scnsim", "⋮": "vellip", "⋯": "ctdot", "⋰": "utdot", "⋱": "dtdot", "⋲": "disin", "⋳": "isinsv", "⋴": "isins", "⋵": "isindot", "⋵̸": "notindot", "⋶": "notinvc", "⋷": "notinvb", "⋹": "isinE", "⋹̸": "notinE", "⋺": "nisd", "⋻": "xnis", "⋼": "nis", "⋽": "notnivc", "⋾": "notnivb", "⌅": "barwed", "⌆": "Barwed", "⌌": "drcrop", "⌍": "dlcrop", "⌎": "urcrop", "⌏": "ulcrop", "⌐": "bnot", "⌒": "profline", "⌓": "profsurf", "⌕": "telrec", "⌖": "target", "⌜": "ulcorn", "⌝": "urcorn", "⌞": "dlcorn", "⌟": "drcorn", "⌢": "frown", "⌣": "smile", "⌭": "cylcty", "⌮": "profalar", "⌶": "topbot", "⌽": "ovbar", "⌿": "solbar", "⍼": "angzarr", "⎰": "lmoust", "⎱": "rmoust", "⎴": "tbrk", "⎵": "bbrk", "⎶": "bbrktbrk", "⏜": "OverParenthesis", "⏝": "UnderParenthesis", "⏞": "OverBrace", "⏟": "UnderBrace", "⏢": "trpezium", "⏧": "elinters", "␣": "blank", "─": "boxh", "│": "boxv", "┌": "boxdr", "┐": "boxdl", "└": "boxur", "┘": "boxul", "├": "boxvr", "┤": "boxvl", "┬": "boxhd", "┴": "boxhu", "┼": "boxvh", "═": "boxH", "║": "boxV", "╒": "boxdR", "╓": "boxDr", "╔": "boxDR", "╕": "boxdL", "╖": "boxDl", "╗": "boxDL", "╘": "boxuR", "╙": "boxUr", "╚": "boxUR", "╛": "boxuL", "╜": "boxUl", "╝": "boxUL", "╞": "boxvR", "╟": "boxVr", "╠": "boxVR", "╡": "boxvL", "╢": "boxVl", "╣": "boxVL", "╤": "boxHd", "╥": "boxhD", "╦": "boxHD", "╧": "boxHu", "╨": "boxhU", "╩": "boxHU", "╪": "boxvH", "╫": "boxVh", "╬": "boxVH", "▀": "uhblk", "▄": "lhblk", "█": "block", "░": "blk14", "▒": "blk12", "▓": "blk34", "□": "squ", "▪": "squf", "▫": "EmptyVerySmallSquare", "▭": "rect", "▮": "marker", "▱": "fltns", "△": "xutri", "▴": "utrif", "▵": "utri", "▸": "rtrif", "▹": "rtri", "▽": "xdtri", "▾": "dtrif", "▿": "dtri", "◂": "ltrif", "◃": "ltri", "◊": "loz", "○": "cir", "◬": "tridot", "◯": "xcirc", "◸": "ultri", "◹": "urtri", "◺": "lltri", "◻": "EmptySmallSquare", "◼": "FilledSmallSquare", "★": "starf", "☆": "star", "☎": "phone", "♀": "female", "♂": "male", "♠": "spades", "♣": "clubs", "♥": "hearts", "♦": "diams", "♪": "sung", "✓": "check", "✗": "cross", "✠": "malt", "✶": "sext", "❘": "VerticalSeparator", "⟈": "bsolhsub", "⟉": "suphsol", "⟵": "xlarr", "⟶": "xrarr", "⟷": "xharr", "⟸": "xlArr", "⟹": "xrArr", "⟺": "xhArr", "⟼": "xmap", "⟿": "dzigrarr", "⤂": "nvlArr", "⤃": "nvrArr", "⤄": "nvHarr", "⤅": "Map", "⤌": "lbarr", "⤍": "rbarr", "⤎": "lBarr", "⤏": "rBarr", "⤐": "RBarr", "⤑": "DDotrahd", "⤒": "UpArrowBar", "⤓": "DownArrowBar", "⤖": "Rarrtl", "⤙": "latail", "⤚": "ratail", "⤛": "lAtail", "⤜": "rAtail", "⤝": "larrfs", "⤞": "rarrfs", "⤟": "larrbfs", "⤠": "rarrbfs", "⤣": "nwarhk", "⤤": "nearhk", "⤥": "searhk", "⤦": "swarhk", "⤧": "nwnear", "⤨": "toea", "⤩": "tosa", "⤪": "swnwar", "⤳": "rarrc", "⤳̸": "nrarrc", "⤵": "cudarrr", "⤶": "ldca", "⤷": "rdca", "⤸": "cudarrl", "⤹": "larrpl", "⤼": "curarrm", "⤽": "cularrp", "⥅": "rarrpl", "⥈": "harrcir", "⥉": "Uarrocir", "⥊": "lurdshar", "⥋": "ldrushar", "⥎": "LeftRightVector", "⥏": "RightUpDownVector", "⥐": "DownLeftRightVector", "⥑": "LeftUpDownVector", "⥒": "LeftVectorBar", "⥓": "RightVectorBar", "⥔": "RightUpVectorBar", "⥕": "RightDownVectorBar", "⥖": "DownLeftVectorBar", "⥗": "DownRightVectorBar", "⥘": "LeftUpVectorBar", "⥙": "LeftDownVectorBar", "⥚": "LeftTeeVector", "⥛": "RightTeeVector", "⥜": "RightUpTeeVector", "⥝": "RightDownTeeVector", "⥞": "DownLeftTeeVector", "⥟": "DownRightTeeVector", "⥠": "LeftUpTeeVector", "⥡": "LeftDownTeeVector", "⥢": "lHar", "⥣": "uHar", "⥤": "rHar", "⥥": "dHar", "⥦": "luruhar", "⥧": "ldrdhar", "⥨": "ruluhar", "⥩": "rdldhar", "⥪": "lharul", "⥫": "llhard", "⥬": "rharul", "⥭": "lrhard", "⥮": "udhar", "⥯": "duhar", "⥰": "RoundImplies", "⥱": "erarr", "⥲": "simrarr", "⥳": "larrsim", "⥴": "rarrsim", "⥵": "rarrap", "⥶": "ltlarr", "⥸": "gtrarr", "⥹": "subrarr", "⥻": "suplarr", "⥼": "lfisht", "⥽": "rfisht", "⥾": "ufisht", "⥿": "dfisht", "⦚": "vzigzag", "⦜": "vangrt", "⦝": "angrtvbd", "⦤": "ange", "⦥": "range", "⦦": "dwangle", "⦧": "uwangle", "⦨": "angmsdaa", "⦩": "angmsdab", "⦪": "angmsdac", "⦫": "angmsdad", "⦬": "angmsdae", "⦭": "angmsdaf", "⦮": "angmsdag", "⦯": "angmsdah", "⦰": "bemptyv", "⦱": "demptyv", "⦲": "cemptyv", "⦳": "raemptyv", "⦴": "laemptyv", "⦵": "ohbar", "⦶": "omid", "⦷": "opar", "⦹": "operp", "⦻": "olcross", "⦼": "odsold", "⦾": "olcir", "⦿": "ofcir", "⧀": "olt", "⧁": "ogt", "⧂": "cirscir", "⧃": "cirE", "⧄": "solb", "⧅": "bsolb", "⧉": "boxbox", "⧍": "trisb", "⧎": "rtriltri", "⧏": "LeftTriangleBar", "⧏̸": "NotLeftTriangleBar", "⧐": "RightTriangleBar", "⧐̸": "NotRightTriangleBar", "⧜": "iinfin", "⧝": "infintie", "⧞": "nvinfin", "⧣": "eparsl", "⧤": "smeparsl", "⧥": "eqvparsl", "⧫": "lozf", "⧴": "RuleDelayed", "⧶": "dsol", "⨀": "xodot", "⨁": "xoplus", "⨂": "xotime", "⨄": "xuplus", "⨆": "xsqcup", "⨍": "fpartint", "⨐": "cirfnint", "⨑": "awint", "⨒": "rppolint", "⨓": "scpolint", "⨔": "npolint", "⨕": "pointint", "⨖": "quatint", "⨗": "intlarhk", "⨢": "pluscir", "⨣": "plusacir", "⨤": "simplus", "⨥": "plusdu", "⨦": "plussim", "⨧": "plustwo", "⨩": "mcomma", "⨪": "minusdu", "⨭": "loplus", "⨮": "roplus", "⨯": "Cross", "⨰": "timesd", "⨱": "timesbar", "⨳": "smashp", "⨴": "lotimes", "⨵": "rotimes", "⨶": "otimesas", "⨷": "Otimes", "⨸": "odiv", "⨹": "triplus", "⨺": "triminus", "⨻": "tritime", "⨼": "iprod", "⨿": "amalg", "⩀": "capdot", "⩂": "ncup", "⩃": "ncap", "⩄": "capand", "⩅": "cupor", "⩆": "cupcap", "⩇": "capcup", "⩈": "cupbrcap", "⩉": "capbrcup", "⩊": "cupcup", "⩋": "capcap", "⩌": "ccups", "⩍": "ccaps", "⩐": "ccupssm", "⩓": "And", "⩔": "Or", "⩕": "andand", "⩖": "oror", "⩗": "orslope", "⩘": "andslope", "⩚": "andv", "⩛": "orv", "⩜": "andd", "⩝": "ord", "⩟": "wedbar", "⩦": "sdote", "⩪": "simdot", "⩭": "congdot", "⩭̸": "ncongdot", "⩮": "easter", "⩯": "apacir", "⩰": "apE", "⩰̸": "napE", "⩱": "eplus", "⩲": "pluse", "⩳": "Esim", "⩷": "eDDot", "⩸": "equivDD", "⩹": "ltcir", "⩺": "gtcir", "⩻": "ltquest", "⩼": "gtquest", "⩽": "les", "⩽̸": "nles", "⩾": "ges", "⩾̸": "nges", "⩿": "lesdot", "⪀": "gesdot", "⪁": "lesdoto", "⪂": "gesdoto", "⪃": "lesdotor", "⪄": "gesdotol", "⪅": "lap", "⪆": "gap", "⪇": "lne", "⪈": "gne", "⪉": "lnap", "⪊": "gnap", "⪋": "lEg", "⪌": "gEl", "⪍": "lsime", "⪎": "gsime", "⪏": "lsimg", "⪐": "gsiml", "⪑": "lgE", "⪒": "glE", "⪓": "lesges", "⪔": "gesles", "⪕": "els", "⪖": "egs", "⪗": "elsdot", "⪘": "egsdot", "⪙": "el", "⪚": "eg", "⪝": "siml", "⪞": "simg", "⪟": "simlE", "⪠": "simgE", "⪡": "LessLess", "⪡̸": "NotNestedLessLess", "⪢": "GreaterGreater", "⪢̸": "NotNestedGreaterGreater", "⪤": "glj", "⪥": "gla", "⪦": "ltcc", "⪧": "gtcc", "⪨": "lescc", "⪩": "gescc", "⪪": "smt", "⪫": "lat", "⪬": "smte", "⪬︀": "smtes", "⪭": "late", "⪭︀": "lates", "⪮": "bumpE", "⪯": "pre", "⪯̸": "npre", "⪰": "sce", "⪰̸": "nsce", "⪳": "prE", "⪴": "scE", "⪵": "prnE", "⪶": "scnE", "⪷": "prap", "⪸": "scap", "⪹": "prnap", "⪺": "scnap", "⪻": "Pr", "⪼": "Sc", "⪽": "subdot", "⪾": "supdot", "⪿": "subplus", "⫀": "supplus", "⫁": "submult", "⫂": "supmult", "⫃": "subedot", "⫄": "supedot", "⫅": "subE", "⫅̸": "nsubE", "⫆": "supE", "⫆̸": "nsupE", "⫇": "subsim", "⫈": "supsim", "⫋︀": "vsubnE", "⫋": "subnE", "⫌︀": "vsupnE", "⫌": "supnE", "⫏": "csub", "⫐": "csup", "⫑": "csube", "⫒": "csupe", "⫓": "subsup", "⫔": "supsub", "⫕": "subsub", "⫖": "supsup", "⫗": "suphsub", "⫘": "supdsub", "⫙": "forkv", "⫚": "topfork", "⫛": "mlcp", "⫤": "Dashv", "⫦": "Vdashl", "⫧": "Barv", "⫨": "vBar", "⫩": "vBarv", "⫫": "Vbar", "⫬": "Not", "⫭": "bNot", "⫮": "rnmid", "⫯": "cirmid", "⫰": "midcir", "⫱": "topcir", "⫲": "nhpar", "⫳": "parsim", "⫽": "parsl", "⫽⃥": "nparsl", "♭": "flat", "♮": "natur", "♯": "sharp", "¤": "curren", "¢": "cent", $: "dollar", "£": "pound", "¥": "yen", "€": "euro", "¹": "sup1", "½": "half", "⅓": "frac13", "¼": "frac14", "⅕": "frac15", "⅙": "frac16", "⅛": "frac18", "²": "sup2", "⅔": "frac23", "⅖": "frac25", "³": "sup3", "¾": "frac34", "⅗": "frac35", "⅜": "frac38", "⅘": "frac45", "⅚": "frac56", "⅝": "frac58", "⅞": "frac78", "𝒶": "ascr", "𝕒": "aopf", "𝔞": "afr", "𝔸": "Aopf", "𝔄": "Afr", "𝒜": "Ascr", "ª": "ordf", "á": "aacute", "Á": "Aacute", "à": "agrave", "À": "Agrave", "ă": "abreve", "Ă": "Abreve", "â": "acirc", "Â": "Acirc", "å": "aring", "Å": "angst", "ä": "auml", "Ä": "Auml", "ã": "atilde", "Ã": "Atilde", "ą": "aogon", "Ą": "Aogon", "ā": "amacr", "Ā": "Amacr", "æ": "aelig", "Æ": "AElig", "𝒷": "bscr", "𝕓": "bopf", "𝔟": "bfr", "𝔹": "Bopf", "ℬ": "Bscr", "𝔅": "Bfr", "𝔠": "cfr", "𝒸": "cscr", "𝕔": "copf", "ℭ": "Cfr", "𝒞": "Cscr", "ℂ": "Copf", "ć": "cacute", "Ć": "Cacute", "ĉ": "ccirc", "Ĉ": "Ccirc", "č": "ccaron", "Č": "Ccaron", "ċ": "cdot", "Ċ": "Cdot", "ç": "ccedil", "Ç": "Ccedil", "℅": "incare", "𝔡": "dfr", "ⅆ": "dd", "𝕕": "dopf", "𝒹": "dscr", "𝒟": "Dscr", "𝔇": "Dfr", "ⅅ": "DD", "𝔻": "Dopf", "ď": "dcaron", "Ď": "Dcaron", "đ": "dstrok", "Đ": "Dstrok", "ð": "eth", "Ð": "ETH", "ⅇ": "ee", "ℯ": "escr", "𝔢": "efr", "𝕖": "eopf", "ℰ": "Escr", "𝔈": "Efr", "𝔼": "Eopf", "é": "eacute", "É": "Eacute", "è": "egrave", "È": "Egrave", "ê": "ecirc", "Ê": "Ecirc", "ě": "ecaron", "Ě": "Ecaron", "ë": "euml", "Ë": "Euml", "ė": "edot", "Ė": "Edot", "ę": "eogon", "Ę": "Eogon", "ē": "emacr", "Ē": "Emacr", "𝔣": "ffr", "𝕗": "fopf", "𝒻": "fscr", "𝔉": "Ffr", "𝔽": "Fopf", "ℱ": "Fscr", "ﬀ": "fflig", "ﬃ": "ffilig", "ﬄ": "ffllig", "ﬁ": "filig", fj: "fjlig", "ﬂ": "fllig", "ƒ": "fnof", "ℊ": "gscr", "𝕘": "gopf", "𝔤": "gfr", "𝒢": "Gscr", "𝔾": "Gopf", "𝔊": "Gfr", "ǵ": "gacute", "ğ": "gbreve", "Ğ": "Gbreve", "ĝ": "gcirc", "Ĝ": "Gcirc", "ġ": "gdot", "Ġ": "Gdot", "Ģ": "Gcedil", "𝔥": "hfr", "ℎ": "planckh", "𝒽": "hscr", "𝕙": "hopf", "ℋ": "Hscr", "ℌ": "Hfr", "ℍ": "Hopf", "ĥ": "hcirc", "Ĥ": "Hcirc", "ℏ": "hbar", "ħ": "hstrok", "Ħ": "Hstrok", "𝕚": "iopf", "𝔦": "ifr", "𝒾": "iscr", "ⅈ": "ii", "𝕀": "Iopf", "ℐ": "Iscr", "ℑ": "Im", "í": "iacute", "Í": "Iacute", "ì": "igrave", "Ì": "Igrave", "î": "icirc", "Î": "Icirc", "ï": "iuml", "Ï": "Iuml", "ĩ": "itilde", "Ĩ": "Itilde", "İ": "Idot", "į": "iogon", "Į": "Iogon", "ī": "imacr", "Ī": "Imacr", "ĳ": "ijlig", "Ĳ": "IJlig", "ı": "imath", "𝒿": "jscr", "𝕛": "jopf", "𝔧": "jfr", "𝒥": "Jscr", "𝔍": "Jfr", "𝕁": "Jopf", "ĵ": "jcirc", "Ĵ": "Jcirc", "ȷ": "jmath", "𝕜": "kopf", "𝓀": "kscr", "𝔨": "kfr", "𝒦": "Kscr", "𝕂": "Kopf", "𝔎": "Kfr", "ķ": "kcedil", "Ķ": "Kcedil", "𝔩": "lfr", "𝓁": "lscr", "ℓ": "ell", "𝕝": "lopf", "ℒ": "Lscr", "𝔏": "Lfr", "𝕃": "Lopf", "ĺ": "lacute", "Ĺ": "Lacute", "ľ": "lcaron", "Ľ": "Lcaron", "ļ": "lcedil", "Ļ": "Lcedil", "ł": "lstrok", "Ł": "Lstrok", "ŀ": "lmidot", "Ŀ": "Lmidot", "𝔪": "mfr", "𝕞": "mopf", "𝓂": "mscr", "𝔐": "Mfr", "𝕄": "Mopf", "ℳ": "Mscr", "𝔫": "nfr", "𝕟": "nopf", "𝓃": "nscr", "ℕ": "Nopf", "𝒩": "Nscr", "𝔑": "Nfr", "ń": "nacute", "Ń": "Nacute", "ň": "ncaron", "Ň": "Ncaron", "ñ": "ntilde", "Ñ": "Ntilde", "ņ": "ncedil", "Ņ": "Ncedil", "№": "numero", "ŋ": "eng", "Ŋ": "ENG", "𝕠": "oopf", "𝔬": "ofr", "ℴ": "oscr", "𝒪": "Oscr", "𝔒": "Ofr", "𝕆": "Oopf", "º": "ordm", "ó": "oacute", "Ó": "Oacute", "ò": "ograve", "Ò": "Ograve", "ô": "ocirc", "Ô": "Ocirc", "ö": "ouml", "Ö": "Ouml", "ő": "odblac", "Ő": "Odblac", "õ": "otilde", "Õ": "Otilde", "ø": "oslash", "Ø": "Oslash", "ō": "omacr", "Ō": "Omacr", "œ": "oelig", "Œ": "OElig", "𝔭": "pfr", "𝓅": "pscr", "𝕡": "popf", "ℙ": "Popf", "𝔓": "Pfr", "𝒫": "Pscr", "𝕢": "qopf", "𝔮": "qfr", "𝓆": "qscr", "𝒬": "Qscr", "𝔔": "Qfr", "ℚ": "Qopf", "ĸ": "kgreen", "𝔯": "rfr", "𝕣": "ropf", "𝓇": "rscr", "ℛ": "Rscr", "ℜ": "Re", "ℝ": "Ropf", "ŕ": "racute", "Ŕ": "Racute", "ř": "rcaron", "Ř": "Rcaron", "ŗ": "rcedil", "Ŗ": "Rcedil", "𝕤": "sopf", "𝓈": "sscr", "𝔰": "sfr", "𝕊": "Sopf", "𝔖": "Sfr", "𝒮": "Sscr", "Ⓢ": "oS", "ś": "sacute", "Ś": "Sacute", "ŝ": "scirc", "Ŝ": "Scirc", "š": "scaron", "Š": "Scaron", "ş": "scedil", "Ş": "Scedil", "ß": "szlig", "𝔱": "tfr", "𝓉": "tscr", "𝕥": "topf", "𝒯": "Tscr", "𝔗": "Tfr", "𝕋": "Topf", "ť": "tcaron", "Ť": "Tcaron", "ţ": "tcedil", "Ţ": "Tcedil", "™": "trade", "ŧ": "tstrok", "Ŧ": "Tstrok", "𝓊": "uscr", "𝕦": "uopf", "𝔲": "ufr", "𝕌": "Uopf", "𝔘": "Ufr", "𝒰": "Uscr", "ú": "uacute", "Ú": "Uacute", "ù": "ugrave", "Ù": "Ugrave", "ŭ": "ubreve", "Ŭ": "Ubreve", "û": "ucirc", "Û": "Ucirc", "ů": "uring", "Ů": "Uring", "ü": "uuml", "Ü": "Uuml", "ű": "udblac", "Ű": "Udblac", "ũ": "utilde", "Ũ": "Utilde", "ų": "uogon", "Ų": "Uogon", "ū": "umacr", "Ū": "Umacr", "𝔳": "vfr", "𝕧": "vopf", "𝓋": "vscr", "𝔙": "Vfr", "𝕍": "Vopf", "𝒱": "Vscr", "𝕨": "wopf", "𝓌": "wscr", "𝔴": "wfr", "𝒲": "Wscr", "𝕎": "Wopf", "𝔚": "Wfr", "ŵ": "wcirc", "Ŵ": "Wcirc", "𝔵": "xfr", "𝓍": "xscr", "𝕩": "xopf", "𝕏": "Xopf", "𝔛": "Xfr", "𝒳": "Xscr", "𝔶": "yfr", "𝓎": "yscr", "𝕪": "yopf", "𝒴": "Yscr", "𝔜": "Yfr", "𝕐": "Yopf", "ý": "yacute", "Ý": "Yacute", "ŷ": "ycirc", "Ŷ": "Ycirc", "ÿ": "yuml", "Ÿ": "Yuml", "𝓏": "zscr", "𝔷": "zfr", "𝕫": "zopf", "ℨ": "Zfr", "ℤ": "Zopf", "𝒵": "Zscr", "ź": "zacute", "Ź": "Zacute", "ž": "zcaron", "Ž": "Zcaron", "ż": "zdot", "Ż": "Zdot", "Ƶ": "imped", "þ": "thorn", "Þ": "THORN", "ŉ": "napos", "α": "alpha", "Α": "Alpha", "β": "beta", "Β": "Beta", "γ": "gamma", "Γ": "Gamma", "δ": "delta", "Δ": "Delta", "ε": "epsi", "ϵ": "epsiv", "Ε": "Epsilon", "ϝ": "gammad", "Ϝ": "Gammad", "ζ": "zeta", "Ζ": "Zeta", "η": "eta", "Η": "Eta", "θ": "theta", "ϑ": "thetav", "Θ": "Theta", "ι": "iota", "Ι": "Iota", "κ": "kappa", "ϰ": "kappav", "Κ": "Kappa", "λ": "lambda", "Λ": "Lambda", "μ": "mu", "µ": "micro", "Μ": "Mu", "ν": "nu", "Ν": "Nu", "ξ": "xi", "Ξ": "Xi", "ο": "omicron", "Ο": "Omicron", "π": "pi", "ϖ": "piv", "Π": "Pi", "ρ": "rho", "ϱ": "rhov", "Ρ": "Rho", "σ": "sigma", "Σ": "Sigma", "ς": "sigmaf", "τ": "tau", "Τ": "Tau", "υ": "upsi", "Υ": "Upsilon", "ϒ": "Upsi", "φ": "phi", "ϕ": "phiv", "Φ": "Phi", "χ": "chi", "Χ": "Chi", "ψ": "psi", "Ψ": "Psi", "ω": "omega", "Ω": "ohm", "а": "acy", "А": "Acy", "б": "bcy", "Б": "Bcy", "в": "vcy", "В": "Vcy", "г": "gcy", "Г": "Gcy", "ѓ": "gjcy", "Ѓ": "GJcy", "д": "dcy", "Д": "Dcy", "ђ": "djcy", "Ђ": "DJcy", "е": "iecy", "Е": "IEcy", "ё": "iocy", "Ё": "IOcy", "є": "jukcy", "Є": "Jukcy", "ж": "zhcy", "Ж": "ZHcy", "з": "zcy", "З": "Zcy", "ѕ": "dscy", "Ѕ": "DScy", "и": "icy", "И": "Icy", "і": "iukcy", "І": "Iukcy", "ї": "yicy", "Ї": "YIcy", "й": "jcy", "Й": "Jcy", "ј": "jsercy", "Ј": "Jsercy", "к": "kcy", "К": "Kcy", "ќ": "kjcy", "Ќ": "KJcy", "л": "lcy", "Л": "Lcy", "љ": "ljcy", "Љ": "LJcy", "м": "mcy", "М": "Mcy", "н": "ncy", "Н": "Ncy", "њ": "njcy", "Њ": "NJcy", "о": "ocy", "О": "Ocy", "п": "pcy", "П": "Pcy", "р": "rcy", "Р": "Rcy", "с": "scy", "С": "Scy", "т": "tcy", "Т": "Tcy", "ћ": "tshcy", "Ћ": "TSHcy", "у": "ucy", "У": "Ucy", "ў": "ubrcy", "Ў": "Ubrcy", "ф": "fcy", "Ф": "Fcy", "х": "khcy", "Х": "KHcy", "ц": "tscy", "Ц": "TScy", "ч": "chcy", "Ч": "CHcy", "џ": "dzcy", "Џ": "DZcy", "ш": "shcy", "Ш": "SHcy", "щ": "shchcy", "Щ": "SHCHcy", "ъ": "hardcy", "Ъ": "HARDcy", "ы": "ycy", "Ы": "Ycy", "ь": "softcy", "Ь": "SOFTcy", "э": "ecy", "Э": "Ecy", "ю": "yucy", "Ю": "YUcy", "я": "yacy", "Я": "YAcy", "ℵ": "aleph", "ℶ": "beth", "ℷ": "gimel", "ℸ": "daleth" }, f3 = /["&'<>`]/g, d3 = { '"': "&quot;", "&": "&amp;", "'": "&#x27;", "<": "&lt;", ">": "&gt;", "`": "&#x60;" }, m3 = /&#(?:[xX][^a-fA-F0-9]|[^0-9xX])/, g3 = /[\0-\x08\x0B\x0E-\x1F\x7F-\x9F\uFDD0-\uFDEF\uFFFE\uFFFF]|[\uD83F\uD87F\uD8BF\uD8FF\uD93F\uD97F\uD9BF\uD9FF\uDA3F\uDA7F\uDABF\uDAFF\uDB3F\uDB7F\uDBBF\uDBFF][\uDFFE\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, h3 = /&(CounterClockwiseContourIntegral|DoubleLongLeftRightArrow|ClockwiseContourIntegral|NotNestedGreaterGreater|NotSquareSupersetEqual|DiacriticalDoubleAcute|NotRightTriangleEqual|NotSucceedsSlantEqual|NotPrecedesSlantEqual|CloseCurlyDoubleQuote|NegativeVeryThinSpace|DoubleContourIntegral|FilledVerySmallSquare|CapitalDifferentialD|OpenCurlyDoubleQuote|EmptyVerySmallSquare|NestedGreaterGreater|DoubleLongRightArrow|NotLeftTriangleEqual|NotGreaterSlantEqual|ReverseUpEquilibrium|DoubleLeftRightArrow|NotSquareSubsetEqual|NotDoubleVerticalBar|RightArrowLeftArrow|NotGreaterFullEqual|NotRightTriangleBar|SquareSupersetEqual|DownLeftRightVector|DoubleLongLeftArrow|leftrightsquigarrow|LeftArrowRightArrow|NegativeMediumSpace|blacktriangleright|RightDownVectorBar|PrecedesSlantEqual|RightDoubleBracket|SucceedsSlantEqual|NotLeftTriangleBar|RightTriangleEqual|SquareIntersection|RightDownTeeVector|ReverseEquilibrium|NegativeThickSpace|longleftrightarrow|Longleftrightarrow|LongLeftRightArrow|DownRightTeeVector|DownRightVectorBar|GreaterSlantEqual|SquareSubsetEqual|LeftDownVectorBar|LeftDoubleBracket|VerticalSeparator|rightleftharpoons|NotGreaterGreater|NotSquareSuperset|blacktriangleleft|blacktriangledown|NegativeThinSpace|LeftDownTeeVector|NotLessSlantEqual|leftrightharpoons|DoubleUpDownArrow|DoubleVerticalBar|LeftTriangleEqual|FilledSmallSquare|twoheadrightarrow|NotNestedLessLess|DownLeftTeeVector|DownLeftVectorBar|RightAngleBracket|NotTildeFullEqual|NotReverseElement|RightUpDownVector|DiacriticalTilde|NotSucceedsTilde|circlearrowright|NotPrecedesEqual|rightharpoondown|DoubleRightArrow|NotSucceedsEqual|NonBreakingSpace|NotRightTriangle|LessEqualGreater|RightUpTeeVector|LeftAngleBracket|GreaterFullEqual|DownArrowUpArrow|RightUpVectorBar|twoheadleftarrow|GreaterEqualLess|downharpoonright|RightTriangleBar|ntrianglerighteq|NotSupersetEqual|LeftUpDownVector|DiacriticalAcute|rightrightarrows|vartriangleright|UpArrowDownArrow|DiacriticalGrave|UnderParenthesis|EmptySmallSquare|LeftUpVectorBar|leftrightarrows|DownRightVector|downharpoonleft|trianglerighteq|ShortRightArrow|OverParenthesis|DoubleLeftArrow|DoubleDownArrow|NotSquareSubset|bigtriangledown|ntrianglelefteq|UpperRightArrow|curvearrowright|vartriangleleft|NotLeftTriangle|nleftrightarrow|LowerRightArrow|NotHumpDownHump|NotGreaterTilde|rightthreetimes|LeftUpTeeVector|NotGreaterEqual|straightepsilon|LeftTriangleBar|rightsquigarrow|ContourIntegral|rightleftarrows|CloseCurlyQuote|RightDownVector|LeftRightVector|nLeftrightarrow|leftharpoondown|circlearrowleft|SquareSuperset|OpenCurlyQuote|hookrightarrow|HorizontalLine|DiacriticalDot|NotLessGreater|ntriangleright|DoubleRightTee|InvisibleComma|InvisibleTimes|LowerLeftArrow|DownLeftVector|NotSubsetEqual|curvearrowleft|trianglelefteq|NotVerticalBar|TildeFullEqual|downdownarrows|NotGreaterLess|RightTeeVector|ZeroWidthSpace|looparrowright|LongRightArrow|doublebarwedge|ShortLeftArrow|ShortDownArrow|RightVectorBar|GreaterGreater|ReverseElement|rightharpoonup|LessSlantEqual|leftthreetimes|upharpoonright|rightarrowtail|LeftDownVector|Longrightarrow|NestedLessLess|UpperLeftArrow|nshortparallel|leftleftarrows|leftrightarrow|Leftrightarrow|LeftRightArrow|longrightarrow|upharpoonleft|RightArrowBar|ApplyFunction|LeftTeeVector|leftarrowtail|NotEqualTilde|varsubsetneqq|varsupsetneqq|RightTeeArrow|SucceedsEqual|SucceedsTilde|LeftVectorBar|SupersetEqual|hookleftarrow|DifferentialD|VerticalTilde|VeryThinSpace|blacktriangle|bigtriangleup|LessFullEqual|divideontimes|leftharpoonup|UpEquilibrium|ntriangleleft|RightTriangle|measuredangle|shortparallel|longleftarrow|Longleftarrow|LongLeftArrow|DoubleLeftTee|Poincareplane|PrecedesEqual|triangleright|DoubleUpArrow|RightUpVector|fallingdotseq|looparrowleft|PrecedesTilde|NotTildeEqual|NotTildeTilde|smallsetminus|Proportional|triangleleft|triangledown|UnderBracket|NotHumpEqual|exponentiale|ExponentialE|NotLessTilde|HilbertSpace|RightCeiling|blacklozenge|varsupsetneq|HumpDownHump|GreaterEqual|VerticalLine|LeftTeeArrow|NotLessEqual|DownTeeArrow|LeftTriangle|varsubsetneq|Intersection|NotCongruent|DownArrowBar|LeftUpVector|LeftArrowBar|risingdotseq|GreaterTilde|RoundImplies|SquareSubset|ShortUpArrow|NotSuperset|quaternions|precnapprox|backepsilon|preccurlyeq|OverBracket|blacksquare|MediumSpace|VerticalBar|circledcirc|circleddash|CircleMinus|CircleTimes|LessGreater|curlyeqprec|curlyeqsucc|diamondsuit|UpDownArrow|Updownarrow|RuleDelayed|Rrightarrow|updownarrow|RightVector|nRightarrow|nrightarrow|eqslantless|LeftCeiling|Equilibrium|SmallCircle|expectation|NotSucceeds|thickapprox|GreaterLess|SquareUnion|NotPrecedes|NotLessLess|straightphi|succnapprox|succcurlyeq|SubsetEqual|sqsupseteq|Proportion|Laplacetrf|ImaginaryI|supsetneqq|NotGreater|gtreqqless|NotElement|ThickSpace|TildeEqual|TildeTilde|Fouriertrf|rmoustache|EqualTilde|eqslantgtr|UnderBrace|LeftVector|UpArrowBar|nLeftarrow|nsubseteqq|subsetneqq|nsupseteqq|nleftarrow|succapprox|lessapprox|UpTeeArrow|upuparrows|curlywedge|lesseqqgtr|varepsilon|varnothing|RightFloor|complement|CirclePlus|sqsubseteq|Lleftarrow|circledast|RightArrow|Rightarrow|rightarrow|lmoustache|Bernoullis|precapprox|mapstoleft|mapstodown|longmapsto|dotsquare|downarrow|DoubleDot|nsubseteq|supsetneq|leftarrow|nsupseteq|subsetneq|ThinSpace|ngeqslant|subseteqq|HumpEqual|NotSubset|triangleq|NotCupCap|lesseqgtr|heartsuit|TripleDot|Leftarrow|Coproduct|Congruent|varpropto|complexes|gvertneqq|LeftArrow|LessTilde|supseteqq|MinusPlus|CircleDot|nleqslant|NotExists|gtreqless|nparallel|UnionPlus|LeftFloor|checkmark|CenterDot|centerdot|Mellintrf|gtrapprox|bigotimes|OverBrace|spadesuit|therefore|pitchfork|rationals|PlusMinus|Backslash|Therefore|DownBreve|backsimeq|backprime|DownArrow|nshortmid|Downarrow|lvertneqq|eqvparsl|imagline|imagpart|infintie|integers|Integral|intercal|LessLess|Uarrocir|intlarhk|sqsupset|angmsdaf|sqsubset|llcorner|vartheta|cupbrcap|lnapprox|Superset|SuchThat|succnsim|succneqq|angmsdag|biguplus|curlyvee|trpezium|Succeeds|NotTilde|bigwedge|angmsdah|angrtvbd|triminus|cwconint|fpartint|lrcorner|smeparsl|subseteq|urcorner|lurdshar|laemptyv|DDotrahd|approxeq|ldrushar|awconint|mapstoup|backcong|shortmid|triangle|geqslant|gesdotol|timesbar|circledR|circledS|setminus|multimap|naturals|scpolint|ncongdot|RightTee|boxminus|gnapprox|boxtimes|andslope|thicksim|angmsdaa|varsigma|cirfnint|rtriltri|angmsdab|rppolint|angmsdac|barwedge|drbkarow|clubsuit|thetasym|bsolhsub|capbrcup|dzigrarr|doteqdot|DotEqual|dotminus|UnderBar|NotEqual|realpart|otimesas|ulcorner|hksearow|hkswarow|parallel|PartialD|elinters|emptyset|plusacir|bbrktbrk|angmsdad|pointint|bigoplus|angmsdae|Precedes|bigsqcup|varkappa|notindot|supseteq|precneqq|precnsim|profalar|profline|profsurf|leqslant|lesdotor|raemptyv|subplus|notnivb|notnivc|subrarr|zigrarr|vzigzag|submult|subedot|Element|between|cirscir|larrbfs|larrsim|lotimes|lbrksld|lbrkslu|lozenge|ldrdhar|dbkarow|bigcirc|epsilon|simrarr|simplus|ltquest|Epsilon|luruhar|gtquest|maltese|npolint|eqcolon|npreceq|bigodot|ddagger|gtrless|bnequiv|harrcir|ddotseq|equivDD|backsim|demptyv|nsqsube|nsqsupe|Upsilon|nsubset|upsilon|minusdu|nsucceq|swarrow|nsupset|coloneq|searrow|boxplus|napprox|natural|asympeq|alefsym|congdot|nearrow|bigstar|diamond|supplus|tritime|LeftTee|nvinfin|triplus|NewLine|nvltrie|nvrtrie|nwarrow|nexists|Diamond|ruluhar|Implies|supmult|angzarr|suplarr|suphsub|questeq|because|digamma|Because|olcross|bemptyv|omicron|Omicron|rotimes|NoBreak|intprod|angrtvb|orderof|uwangle|suphsol|lesdoto|orslope|DownTee|realine|cudarrl|rdldhar|OverBar|supedot|lessdot|supdsub|topfork|succsim|rbrkslu|rbrksld|pertenk|cudarrr|isindot|planckh|lessgtr|pluscir|gesdoto|plussim|plustwo|lesssim|cularrp|rarrsim|Cayleys|notinva|notinvb|notinvc|UpArrow|Uparrow|uparrow|NotLess|dwangle|precsim|Product|curarrm|Cconint|dotplus|rarrbfs|ccupssm|Cedilla|cemptyv|notniva|quatint|frac35|frac38|frac45|frac56|frac58|frac78|tridot|xoplus|gacute|gammad|Gammad|lfisht|lfloor|bigcup|sqsupe|gbreve|Gbreve|lharul|sqsube|sqcups|Gcedil|apacir|llhard|lmidot|Lmidot|lmoust|andand|sqcaps|approx|Abreve|spades|circeq|tprime|divide|topcir|Assign|topbot|gesdot|divonx|xuplus|timesd|gesles|atilde|solbar|SOFTcy|loplus|timesb|lowast|lowbar|dlcorn|dlcrop|softcy|dollar|lparlt|thksim|lrhard|Atilde|lsaquo|smashp|bigvee|thinsp|wreath|bkarow|lsquor|lstrok|Lstrok|lthree|ltimes|ltlarr|DotDot|simdot|ltrPar|weierp|xsqcup|angmsd|sigmav|sigmaf|zeetrf|Zcaron|zcaron|mapsto|vsupne|thetav|cirmid|marker|mcomma|Zacute|vsubnE|there4|gtlPar|vsubne|bottom|gtrarr|SHCHcy|shchcy|midast|midcir|middot|minusb|minusd|gtrdot|bowtie|sfrown|mnplus|models|colone|seswar|Colone|mstpos|searhk|gtrsim|nacute|Nacute|boxbox|telrec|hairsp|Tcedil|nbumpe|scnsim|ncaron|Ncaron|ncedil|Ncedil|hamilt|Scedil|nearhk|hardcy|HARDcy|tcedil|Tcaron|commat|nequiv|nesear|tcaron|target|hearts|nexist|varrho|scedil|Scaron|scaron|hellip|Sacute|sacute|hercon|swnwar|compfn|rtimes|rthree|rsquor|rsaquo|zacute|wedgeq|homtht|barvee|barwed|Barwed|rpargt|horbar|conint|swarhk|roplus|nltrie|hslash|hstrok|Hstrok|rmoust|Conint|bprime|hybull|hyphen|iacute|Iacute|supsup|supsub|supsim|varphi|coprod|brvbar|agrave|Supset|supset|igrave|Igrave|notinE|Agrave|iiiint|iinfin|copysr|wedbar|Verbar|vangrt|becaus|incare|verbar|inodot|bullet|drcorn|intcal|drcrop|cularr|vellip|Utilde|bumpeq|cupcap|dstrok|Dstrok|CupCap|cupcup|cupdot|eacute|Eacute|supdot|iquest|easter|ecaron|Ecaron|ecolon|isinsv|utilde|itilde|Itilde|curarr|succeq|Bumpeq|cacute|ulcrop|nparsl|Cacute|nprcue|egrave|Egrave|nrarrc|nrarrw|subsup|subsub|nrtrie|jsercy|nsccue|Jsercy|kappav|kcedil|Kcedil|subsim|ulcorn|nsimeq|egsdot|veebar|kgreen|capand|elsdot|Subset|subset|curren|aacute|lacute|Lacute|emptyv|ntilde|Ntilde|lagran|lambda|Lambda|capcap|Ugrave|langle|subdot|emsp13|numero|emsp14|nvdash|nvDash|nVdash|nVDash|ugrave|ufisht|nvHarr|larrfs|nvlArr|larrhk|larrlp|larrpl|nvrArr|Udblac|nwarhk|larrtl|nwnear|oacute|Oacute|latail|lAtail|sstarf|lbrace|odblac|Odblac|lbrack|udblac|odsold|eparsl|lcaron|Lcaron|ograve|Ograve|lcedil|Lcedil|Aacute|ssmile|ssetmn|squarf|ldquor|capcup|ominus|cylcty|rharul|eqcirc|dagger|rfloor|rfisht|Dagger|daleth|equals|origof|capdot|equest|dcaron|Dcaron|rdquor|oslash|Oslash|otilde|Otilde|otimes|Otimes|urcrop|Ubreve|ubreve|Yacute|Uacute|uacute|Rcedil|rcedil|urcorn|parsim|Rcaron|Vdashl|rcaron|Tstrok|percnt|period|permil|Exists|yacute|rbrack|rbrace|phmmat|ccaron|Ccaron|planck|ccedil|plankv|tstrok|female|plusdo|plusdu|ffilig|plusmn|ffllig|Ccedil|rAtail|dfisht|bernou|ratail|Rarrtl|rarrtl|angsph|rarrpl|rarrlp|rarrhk|xwedge|xotime|forall|ForAll|Vvdash|vsupnE|preceq|bigcap|frac12|frac13|frac14|primes|rarrfs|prnsim|frac15|Square|frac16|square|lesdot|frac18|frac23|propto|prurel|rarrap|rangle|puncsp|frac25|Racute|qprime|racute|lesges|frac34|abreve|AElig|eqsim|utdot|setmn|urtri|Equal|Uring|seArr|uring|searr|dashv|Dashv|mumap|nabla|iogon|Iogon|sdote|sdotb|scsim|napid|napos|equiv|natur|Acirc|dblac|erarr|nbump|iprod|erDot|ucirc|awint|esdot|angrt|ncong|isinE|scnap|Scirc|scirc|ndash|isins|Ubrcy|nearr|neArr|isinv|nedot|ubrcy|acute|Ycirc|iukcy|Iukcy|xutri|nesim|caret|jcirc|Jcirc|caron|twixt|ddarr|sccue|exist|jmath|sbquo|ngeqq|angst|ccaps|lceil|ngsim|UpTee|delta|Delta|rtrif|nharr|nhArr|nhpar|rtrie|jukcy|Jukcy|kappa|rsquo|Kappa|nlarr|nlArr|TSHcy|rrarr|aogon|Aogon|fflig|xrarr|tshcy|ccirc|nleqq|filig|upsih|nless|dharl|nlsim|fjlig|ropar|nltri|dharr|robrk|roarr|fllig|fltns|roang|rnmid|subnE|subne|lAarr|trisb|Ccirc|acirc|ccups|blank|VDash|forkv|Vdash|langd|cedil|blk12|blk14|laquo|strns|diams|notin|vDash|larrb|blk34|block|disin|uplus|vdash|vBarv|aelig|starf|Wedge|check|xrArr|lates|lbarr|lBarr|notni|lbbrk|bcong|frasl|lbrke|frown|vrtri|vprop|vnsup|gamma|Gamma|wedge|xodot|bdquo|srarr|doteq|ldquo|boxdl|boxdL|gcirc|Gcirc|boxDl|boxDL|boxdr|boxdR|boxDr|TRADE|trade|rlhar|boxDR|vnsub|npart|vltri|rlarr|boxhd|boxhD|nprec|gescc|nrarr|nrArr|boxHd|boxHD|boxhu|boxhU|nrtri|boxHu|clubs|boxHU|times|colon|Colon|gimel|xlArr|Tilde|nsime|tilde|nsmid|nspar|THORN|thorn|xlarr|nsube|nsubE|thkap|xhArr|comma|nsucc|boxul|boxuL|nsupe|nsupE|gneqq|gnsim|boxUl|boxUL|grave|boxur|boxuR|boxUr|boxUR|lescc|angle|bepsi|boxvh|varpi|boxvH|numsp|Theta|gsime|gsiml|theta|boxVh|boxVH|boxvl|gtcir|gtdot|boxvL|boxVl|boxVL|crarr|cross|Cross|nvsim|boxvr|nwarr|nwArr|sqsup|dtdot|Uogon|lhard|lharu|dtrif|ocirc|Ocirc|lhblk|duarr|odash|sqsub|Hacek|sqcup|llarr|duhar|oelig|OElig|ofcir|boxvR|uogon|lltri|boxVr|csube|uuarr|ohbar|csupe|ctdot|olarr|olcir|harrw|oline|sqcap|omacr|Omacr|omega|Omega|boxVR|aleph|lneqq|lnsim|loang|loarr|rharu|lobrk|hcirc|operp|oplus|rhard|Hcirc|orarr|Union|order|ecirc|Ecirc|cuepr|szlig|cuesc|breve|reals|eDDot|Breve|hoarr|lopar|utrif|rdquo|Umacr|umacr|efDot|swArr|ultri|alpha|rceil|ovbar|swarr|Wcirc|wcirc|smtes|smile|bsemi|lrarr|aring|parsl|lrhar|bsime|uhblk|lrtri|cupor|Aring|uharr|uharl|slarr|rbrke|bsolb|lsime|rbbrk|RBarr|lsimg|phone|rBarr|rbarr|icirc|lsquo|Icirc|emacr|Emacr|ratio|simne|plusb|simlE|simgE|simeq|pluse|ltcir|ltdot|empty|xharr|xdtri|iexcl|Alpha|ltrie|rarrw|pound|ltrif|xcirc|bumpe|prcue|bumpE|asymp|amacr|cuvee|Sigma|sigma|iiint|udhar|iiota|ijlig|IJlig|supnE|imacr|Imacr|prime|Prime|image|prnap|eogon|Eogon|rarrc|mdash|mDDot|cuwed|imath|supne|imped|Amacr|udarr|prsim|micro|rarrb|cwint|raquo|infin|eplus|range|rangd|Ucirc|radic|minus|amalg|veeeq|rAarr|epsiv|ycirc|quest|sharp|quot|zwnj|Qscr|race|qscr|Qopf|qopf|qint|rang|Rang|Zscr|zscr|Zopf|zopf|rarr|rArr|Rarr|Pscr|pscr|prop|prod|prnE|prec|ZHcy|zhcy|prap|Zeta|zeta|Popf|popf|Zdot|plus|zdot|Yuml|yuml|phiv|YUcy|yucy|Yscr|yscr|perp|Yopf|yopf|part|para|YIcy|Ouml|rcub|yicy|YAcy|rdca|ouml|osol|Oscr|rdsh|yacy|real|oscr|xvee|andd|rect|andv|Xscr|oror|ordm|ordf|xscr|ange|aopf|Aopf|rHar|Xopf|opar|Oopf|xopf|xnis|rhov|oopf|omid|xmap|oint|apid|apos|ogon|ascr|Ascr|odot|odiv|xcup|xcap|ocir|oast|nvlt|nvle|nvgt|nvge|nvap|Wscr|wscr|auml|ntlg|ntgl|nsup|nsub|nsim|Nscr|nscr|nsce|Wopf|ring|npre|wopf|npar|Auml|Barv|bbrk|Nopf|nopf|nmid|nLtv|beta|ropf|Ropf|Beta|beth|nles|rpar|nleq|bnot|bNot|nldr|NJcy|rscr|Rscr|Vscr|vscr|rsqb|njcy|bopf|nisd|Bopf|rtri|Vopf|nGtv|ngtr|vopf|boxh|boxH|boxv|nges|ngeq|boxV|bscr|scap|Bscr|bsim|Vert|vert|bsol|bull|bump|caps|cdot|ncup|scnE|ncap|nbsp|napE|Cdot|cent|sdot|Vbar|nang|vBar|chcy|Mscr|mscr|sect|semi|CHcy|Mopf|mopf|sext|circ|cire|mldr|mlcp|cirE|comp|shcy|SHcy|vArr|varr|cong|copf|Copf|copy|COPY|malt|male|macr|lvnE|cscr|ltri|sime|ltcc|simg|Cscr|siml|csub|Uuml|lsqb|lsim|uuml|csup|Lscr|lscr|utri|smid|lpar|cups|smte|lozf|darr|Lopf|Uscr|solb|lopf|sopf|Sopf|lneq|uscr|spar|dArr|lnap|Darr|dash|Sqrt|LJcy|ljcy|lHar|dHar|Upsi|upsi|diam|lesg|djcy|DJcy|leqq|dopf|Dopf|dscr|Dscr|dscy|ldsh|ldca|squf|DScy|sscr|Sscr|dsol|lcub|late|star|Star|Uopf|Larr|lArr|larr|uopf|dtri|dzcy|sube|subE|Lang|lang|Kscr|kscr|Kopf|kopf|KJcy|kjcy|KHcy|khcy|DZcy|ecir|edot|eDot|Jscr|jscr|succ|Jopf|jopf|Edot|uHar|emsp|ensp|Iuml|iuml|eopf|isin|Iscr|iscr|Eopf|epar|sung|epsi|escr|sup1|sup2|sup3|Iota|iota|supe|supE|Iopf|iopf|IOcy|iocy|Escr|esim|Esim|imof|Uarr|QUOT|uArr|uarr|euml|IEcy|iecy|Idot|Euml|euro|excl|Hscr|hscr|Hopf|hopf|TScy|tscy|Tscr|hbar|tscr|flat|tbrk|fnof|hArr|harr|half|fopf|Fopf|tdot|gvnE|fork|trie|gtcc|fscr|Fscr|gdot|gsim|Gscr|gscr|Gopf|gopf|gneq|Gdot|tosa|gnap|Topf|topf|geqq|toea|GJcy|gjcy|tint|gesl|mid|Sfr|ggg|top|ges|gla|glE|glj|geq|gne|gEl|gel|gnE|Gcy|gcy|gap|Tfr|tfr|Tcy|tcy|Hat|Tau|Ffr|tau|Tab|hfr|Hfr|ffr|Fcy|fcy|icy|Icy|iff|ETH|eth|ifr|Ifr|Eta|eta|int|Int|Sup|sup|ucy|Ucy|Sum|sum|jcy|ENG|ufr|Ufr|eng|Jcy|jfr|els|ell|egs|Efr|efr|Jfr|uml|kcy|Kcy|Ecy|ecy|kfr|Kfr|lap|Sub|sub|lat|lcy|Lcy|leg|Dot|dot|lEg|leq|les|squ|div|die|lfr|Lfr|lgE|Dfr|dfr|Del|deg|Dcy|dcy|lne|lnE|sol|loz|smt|Cup|lrm|cup|lsh|Lsh|sim|shy|map|Map|mcy|Mcy|mfr|Mfr|mho|gfr|Gfr|sfr|cir|Chi|chi|nap|Cfr|vcy|Vcy|cfr|Scy|scy|ncy|Ncy|vee|Vee|Cap|cap|nfr|scE|sce|Nfr|nge|ngE|nGg|vfr|Vfr|ngt|bot|nGt|nis|niv|Rsh|rsh|nle|nlE|bne|Bfr|bfr|nLl|nlt|nLt|Bcy|bcy|not|Not|rlm|wfr|Wfr|npr|nsc|num|ocy|ast|Ocy|ofr|xfr|Xfr|Ofr|ogt|ohm|apE|olt|Rho|ape|rho|Rfr|rfr|ord|REG|ang|reg|orv|And|and|AMP|Rcy|amp|Afr|ycy|Ycy|yen|yfr|Yfr|rcy|par|pcy|Pcy|pfr|Pfr|phi|Phi|afr|Acy|acy|zcy|Zcy|piv|acE|acd|zfr|Zfr|pre|prE|psi|Psi|qfr|Qfr|zwj|Or|ge|Gg|gt|gg|el|oS|lt|Lt|LT|Re|lg|gl|eg|ne|Im|it|le|DD|wp|wr|nu|Nu|dd|lE|Sc|sc|pi|Pi|ee|af|ll|Ll|rx|gE|xi|pm|Xi|ic|pr|Pr|in|ni|mp|mu|ac|Mu|or|ap|Gt|GT|ii);|&(Aacute|Agrave|Atilde|Ccedil|Eacute|Egrave|Iacute|Igrave|Ntilde|Oacute|Ograve|Oslash|Otilde|Uacute|Ugrave|Yacute|aacute|agrave|atilde|brvbar|ccedil|curren|divide|eacute|egrave|frac12|frac14|frac34|iacute|igrave|iquest|middot|ntilde|oacute|ograve|oslash|otilde|plusmn|uacute|ugrave|yacute|AElig|Acirc|Aring|Ecirc|Icirc|Ocirc|THORN|Ucirc|acirc|acute|aelig|aring|cedil|ecirc|icirc|iexcl|laquo|micro|ocirc|pound|raquo|szlig|thorn|times|ucirc|Auml|COPY|Euml|Iuml|Ouml|QUOT|Uuml|auml|cent|copy|euml|iuml|macr|nbsp|ordf|ordm|ouml|para|quot|sect|sup1|sup2|sup3|uuml|yuml|AMP|ETH|REG|amp|deg|eth|not|reg|shy|uml|yen|GT|LT|gt|lt)(?!;)([=a-zA-Z0-9]?)|&#([0-9]+)(;?)|&#[xX]([a-fA-F0-9]+)(;?)|&([0-9a-zA-Z]+)/g, v3 = { aacute: "á", Aacute: "Á", abreve: "ă", Abreve: "Ă", ac: "∾", acd: "∿", acE: "∾̳", acirc: "â", Acirc: "Â", acute: "´", acy: "а", Acy: "А", aelig: "æ", AElig: "Æ", af: "⁡", afr: "𝔞", Afr: "𝔄", agrave: "à", Agrave: "À", alefsym: "ℵ", aleph: "ℵ", alpha: "α", Alpha: "Α", amacr: "ā", Amacr: "Ā", amalg: "⨿", amp: "&", AMP: "&", and: "∧", And: "⩓", andand: "⩕", andd: "⩜", andslope: "⩘", andv: "⩚", ang: "∠", ange: "⦤", angle: "∠", angmsd: "∡", angmsdaa: "⦨", angmsdab: "⦩", angmsdac: "⦪", angmsdad: "⦫", angmsdae: "⦬", angmsdaf: "⦭", angmsdag: "⦮", angmsdah: "⦯", angrt: "∟", angrtvb: "⊾", angrtvbd: "⦝", angsph: "∢", angst: "Å", angzarr: "⍼", aogon: "ą", Aogon: "Ą", aopf: "𝕒", Aopf: "𝔸", ap: "≈", apacir: "⩯", ape: "≊", apE: "⩰", apid: "≋", apos: "'", ApplyFunction: "⁡", approx: "≈", approxeq: "≊", aring: "å", Aring: "Å", ascr: "𝒶", Ascr: "𝒜", Assign: "≔", ast: "*", asymp: "≈", asympeq: "≍", atilde: "ã", Atilde: "Ã", auml: "ä", Auml: "Ä", awconint: "∳", awint: "⨑", backcong: "≌", backepsilon: "϶", backprime: "‵", backsim: "∽", backsimeq: "⋍", Backslash: "∖", Barv: "⫧", barvee: "⊽", barwed: "⌅", Barwed: "⌆", barwedge: "⌅", bbrk: "⎵", bbrktbrk: "⎶", bcong: "≌", bcy: "б", Bcy: "Б", bdquo: "„", becaus: "∵", because: "∵", Because: "∵", bemptyv: "⦰", bepsi: "϶", bernou: "ℬ", Bernoullis: "ℬ", beta: "β", Beta: "Β", beth: "ℶ", between: "≬", bfr: "𝔟", Bfr: "𝔅", bigcap: "⋂", bigcirc: "◯", bigcup: "⋃", bigodot: "⨀", bigoplus: "⨁", bigotimes: "⨂", bigsqcup: "⨆", bigstar: "★", bigtriangledown: "▽", bigtriangleup: "△", biguplus: "⨄", bigvee: "⋁", bigwedge: "⋀", bkarow: "⤍", blacklozenge: "⧫", blacksquare: "▪", blacktriangle: "▴", blacktriangledown: "▾", blacktriangleleft: "◂", blacktriangleright: "▸", blank: "␣", blk12: "▒", blk14: "░", blk34: "▓", block: "█", bne: "=⃥", bnequiv: "≡⃥", bnot: "⌐", bNot: "⫭", bopf: "𝕓", Bopf: "𝔹", bot: "⊥", bottom: "⊥", bowtie: "⋈", boxbox: "⧉", boxdl: "┐", boxdL: "╕", boxDl: "╖", boxDL: "╗", boxdr: "┌", boxdR: "╒", boxDr: "╓", boxDR: "╔", boxh: "─", boxH: "═", boxhd: "┬", boxhD: "╥", boxHd: "╤", boxHD: "╦", boxhu: "┴", boxhU: "╨", boxHu: "╧", boxHU: "╩", boxminus: "⊟", boxplus: "⊞", boxtimes: "⊠", boxul: "┘", boxuL: "╛", boxUl: "╜", boxUL: "╝", boxur: "└", boxuR: "╘", boxUr: "╙", boxUR: "╚", boxv: "│", boxV: "║", boxvh: "┼", boxvH: "╪", boxVh: "╫", boxVH: "╬", boxvl: "┤", boxvL: "╡", boxVl: "╢", boxVL: "╣", boxvr: "├", boxvR: "╞", boxVr: "╟", boxVR: "╠", bprime: "‵", breve: "˘", Breve: "˘", brvbar: "¦", bscr: "𝒷", Bscr: "ℬ", bsemi: "⁏", bsim: "∽", bsime: "⋍", bsol: "\\", bsolb: "⧅", bsolhsub: "⟈", bull: "•", bullet: "•", bump: "≎", bumpe: "≏", bumpE: "⪮", bumpeq: "≏", Bumpeq: "≎", cacute: "ć", Cacute: "Ć", cap: "∩", Cap: "⋒", capand: "⩄", capbrcup: "⩉", capcap: "⩋", capcup: "⩇", capdot: "⩀", CapitalDifferentialD: "ⅅ", caps: "∩︀", caret: "⁁", caron: "ˇ", Cayleys: "ℭ", ccaps: "⩍", ccaron: "č", Ccaron: "Č", ccedil: "ç", Ccedil: "Ç", ccirc: "ĉ", Ccirc: "Ĉ", Cconint: "∰", ccups: "⩌", ccupssm: "⩐", cdot: "ċ", Cdot: "Ċ", cedil: "¸", Cedilla: "¸", cemptyv: "⦲", cent: "¢", centerdot: "·", CenterDot: "·", cfr: "𝔠", Cfr: "ℭ", chcy: "ч", CHcy: "Ч", check: "✓", checkmark: "✓", chi: "χ", Chi: "Χ", cir: "○", circ: "ˆ", circeq: "≗", circlearrowleft: "↺", circlearrowright: "↻", circledast: "⊛", circledcirc: "⊚", circleddash: "⊝", CircleDot: "⊙", circledR: "®", circledS: "Ⓢ", CircleMinus: "⊖", CirclePlus: "⊕", CircleTimes: "⊗", cire: "≗", cirE: "⧃", cirfnint: "⨐", cirmid: "⫯", cirscir: "⧂", ClockwiseContourIntegral: "∲", CloseCurlyDoubleQuote: "”", CloseCurlyQuote: "’", clubs: "♣", clubsuit: "♣", colon: ":", Colon: "∷", colone: "≔", Colone: "⩴", coloneq: "≔", comma: ",", commat: "@", comp: "∁", compfn: "∘", complement: "∁", complexes: "ℂ", cong: "≅", congdot: "⩭", Congruent: "≡", conint: "∮", Conint: "∯", ContourIntegral: "∮", copf: "𝕔", Copf: "ℂ", coprod: "∐", Coproduct: "∐", copy: "©", COPY: "©", copysr: "℗", CounterClockwiseContourIntegral: "∳", crarr: "↵", cross: "✗", Cross: "⨯", cscr: "𝒸", Cscr: "𝒞", csub: "⫏", csube: "⫑", csup: "⫐", csupe: "⫒", ctdot: "⋯", cudarrl: "⤸", cudarrr: "⤵", cuepr: "⋞", cuesc: "⋟", cularr: "↶", cularrp: "⤽", cup: "∪", Cup: "⋓", cupbrcap: "⩈", cupcap: "⩆", CupCap: "≍", cupcup: "⩊", cupdot: "⊍", cupor: "⩅", cups: "∪︀", curarr: "↷", curarrm: "⤼", curlyeqprec: "⋞", curlyeqsucc: "⋟", curlyvee: "⋎", curlywedge: "⋏", curren: "¤", curvearrowleft: "↶", curvearrowright: "↷", cuvee: "⋎", cuwed: "⋏", cwconint: "∲", cwint: "∱", cylcty: "⌭", dagger: "†", Dagger: "‡", daleth: "ℸ", darr: "↓", dArr: "⇓", Darr: "↡", dash: "‐", dashv: "⊣", Dashv: "⫤", dbkarow: "⤏", dblac: "˝", dcaron: "ď", Dcaron: "Ď", dcy: "д", Dcy: "Д", dd: "ⅆ", DD: "ⅅ", ddagger: "‡", ddarr: "⇊", DDotrahd: "⤑", ddotseq: "⩷", deg: "°", Del: "∇", delta: "δ", Delta: "Δ", demptyv: "⦱", dfisht: "⥿", dfr: "𝔡", Dfr: "𝔇", dHar: "⥥", dharl: "⇃", dharr: "⇂", DiacriticalAcute: "´", DiacriticalDot: "˙", DiacriticalDoubleAcute: "˝", DiacriticalGrave: "`", DiacriticalTilde: "˜", diam: "⋄", diamond: "⋄", Diamond: "⋄", diamondsuit: "♦", diams: "♦", die: "¨", DifferentialD: "ⅆ", digamma: "ϝ", disin: "⋲", div: "÷", divide: "÷", divideontimes: "⋇", divonx: "⋇", djcy: "ђ", DJcy: "Ђ", dlcorn: "⌞", dlcrop: "⌍", dollar: "$", dopf: "𝕕", Dopf: "𝔻", dot: "˙", Dot: "¨", DotDot: "⃜", doteq: "≐", doteqdot: "≑", DotEqual: "≐", dotminus: "∸", dotplus: "∔", dotsquare: "⊡", doublebarwedge: "⌆", DoubleContourIntegral: "∯", DoubleDot: "¨", DoubleDownArrow: "⇓", DoubleLeftArrow: "⇐", DoubleLeftRightArrow: "⇔", DoubleLeftTee: "⫤", DoubleLongLeftArrow: "⟸", DoubleLongLeftRightArrow: "⟺", DoubleLongRightArrow: "⟹", DoubleRightArrow: "⇒", DoubleRightTee: "⊨", DoubleUpArrow: "⇑", DoubleUpDownArrow: "⇕", DoubleVerticalBar: "∥", downarrow: "↓", Downarrow: "⇓", DownArrow: "↓", DownArrowBar: "⤓", DownArrowUpArrow: "⇵", DownBreve: "̑", downdownarrows: "⇊", downharpoonleft: "⇃", downharpoonright: "⇂", DownLeftRightVector: "⥐", DownLeftTeeVector: "⥞", DownLeftVector: "↽", DownLeftVectorBar: "⥖", DownRightTeeVector: "⥟", DownRightVector: "⇁", DownRightVectorBar: "⥗", DownTee: "⊤", DownTeeArrow: "↧", drbkarow: "⤐", drcorn: "⌟", drcrop: "⌌", dscr: "𝒹", Dscr: "𝒟", dscy: "ѕ", DScy: "Ѕ", dsol: "⧶", dstrok: "đ", Dstrok: "Đ", dtdot: "⋱", dtri: "▿", dtrif: "▾", duarr: "⇵", duhar: "⥯", dwangle: "⦦", dzcy: "џ", DZcy: "Џ", dzigrarr: "⟿", eacute: "é", Eacute: "É", easter: "⩮", ecaron: "ě", Ecaron: "Ě", ecir: "≖", ecirc: "ê", Ecirc: "Ê", ecolon: "≕", ecy: "э", Ecy: "Э", eDDot: "⩷", edot: "ė", eDot: "≑", Edot: "Ė", ee: "ⅇ", efDot: "≒", efr: "𝔢", Efr: "𝔈", eg: "⪚", egrave: "è", Egrave: "È", egs: "⪖", egsdot: "⪘", el: "⪙", Element: "∈", elinters: "⏧", ell: "ℓ", els: "⪕", elsdot: "⪗", emacr: "ē", Emacr: "Ē", empty: "∅", emptyset: "∅", EmptySmallSquare: "◻", emptyv: "∅", EmptyVerySmallSquare: "▫", emsp: " ", emsp13: " ", emsp14: " ", eng: "ŋ", ENG: "Ŋ", ensp: " ", eogon: "ę", Eogon: "Ę", eopf: "𝕖", Eopf: "𝔼", epar: "⋕", eparsl: "⧣", eplus: "⩱", epsi: "ε", epsilon: "ε", Epsilon: "Ε", epsiv: "ϵ", eqcirc: "≖", eqcolon: "≕", eqsim: "≂", eqslantgtr: "⪖", eqslantless: "⪕", Equal: "⩵", equals: "=", EqualTilde: "≂", equest: "≟", Equilibrium: "⇌", equiv: "≡", equivDD: "⩸", eqvparsl: "⧥", erarr: "⥱", erDot: "≓", escr: "ℯ", Escr: "ℰ", esdot: "≐", esim: "≂", Esim: "⩳", eta: "η", Eta: "Η", eth: "ð", ETH: "Ð", euml: "ë", Euml: "Ë", euro: "€", excl: "!", exist: "∃", Exists: "∃", expectation: "ℰ", exponentiale: "ⅇ", ExponentialE: "ⅇ", fallingdotseq: "≒", fcy: "ф", Fcy: "Ф", female: "♀", ffilig: "ﬃ", fflig: "ﬀ", ffllig: "ﬄ", ffr: "𝔣", Ffr: "𝔉", filig: "ﬁ", FilledSmallSquare: "◼", FilledVerySmallSquare: "▪", fjlig: "fj", flat: "♭", fllig: "ﬂ", fltns: "▱", fnof: "ƒ", fopf: "𝕗", Fopf: "𝔽", forall: "∀", ForAll: "∀", fork: "⋔", forkv: "⫙", Fouriertrf: "ℱ", fpartint: "⨍", frac12: "½", frac13: "⅓", frac14: "¼", frac15: "⅕", frac16: "⅙", frac18: "⅛", frac23: "⅔", frac25: "⅖", frac34: "¾", frac35: "⅗", frac38: "⅜", frac45: "⅘", frac56: "⅚", frac58: "⅝", frac78: "⅞", frasl: "⁄", frown: "⌢", fscr: "𝒻", Fscr: "ℱ", gacute: "ǵ", gamma: "γ", Gamma: "Γ", gammad: "ϝ", Gammad: "Ϝ", gap: "⪆", gbreve: "ğ", Gbreve: "Ğ", Gcedil: "Ģ", gcirc: "ĝ", Gcirc: "Ĝ", gcy: "г", Gcy: "Г", gdot: "ġ", Gdot: "Ġ", ge: "≥", gE: "≧", gel: "⋛", gEl: "⪌", geq: "≥", geqq: "≧", geqslant: "⩾", ges: "⩾", gescc: "⪩", gesdot: "⪀", gesdoto: "⪂", gesdotol: "⪄", gesl: "⋛︀", gesles: "⪔", gfr: "𝔤", Gfr: "𝔊", gg: "≫", Gg: "⋙", ggg: "⋙", gimel: "ℷ", gjcy: "ѓ", GJcy: "Ѓ", gl: "≷", gla: "⪥", glE: "⪒", glj: "⪤", gnap: "⪊", gnapprox: "⪊", gne: "⪈", gnE: "≩", gneq: "⪈", gneqq: "≩", gnsim: "⋧", gopf: "𝕘", Gopf: "𝔾", grave: "`", GreaterEqual: "≥", GreaterEqualLess: "⋛", GreaterFullEqual: "≧", GreaterGreater: "⪢", GreaterLess: "≷", GreaterSlantEqual: "⩾", GreaterTilde: "≳", gscr: "ℊ", Gscr: "𝒢", gsim: "≳", gsime: "⪎", gsiml: "⪐", gt: ">", Gt: "≫", GT: ">", gtcc: "⪧", gtcir: "⩺", gtdot: "⋗", gtlPar: "⦕", gtquest: "⩼", gtrapprox: "⪆", gtrarr: "⥸", gtrdot: "⋗", gtreqless: "⋛", gtreqqless: "⪌", gtrless: "≷", gtrsim: "≳", gvertneqq: "≩︀", gvnE: "≩︀", Hacek: "ˇ", hairsp: " ", half: "½", hamilt: "ℋ", hardcy: "ъ", HARDcy: "Ъ", harr: "↔", hArr: "⇔", harrcir: "⥈", harrw: "↭", Hat: "^", hbar: "ℏ", hcirc: "ĥ", Hcirc: "Ĥ", hearts: "♥", heartsuit: "♥", hellip: "…", hercon: "⊹", hfr: "𝔥", Hfr: "ℌ", HilbertSpace: "ℋ", hksearow: "⤥", hkswarow: "⤦", hoarr: "⇿", homtht: "∻", hookleftarrow: "↩", hookrightarrow: "↪", hopf: "𝕙", Hopf: "ℍ", horbar: "―", HorizontalLine: "─", hscr: "𝒽", Hscr: "ℋ", hslash: "ℏ", hstrok: "ħ", Hstrok: "Ħ", HumpDownHump: "≎", HumpEqual: "≏", hybull: "⁃", hyphen: "‐", iacute: "í", Iacute: "Í", ic: "⁣", icirc: "î", Icirc: "Î", icy: "и", Icy: "И", Idot: "İ", iecy: "е", IEcy: "Е", iexcl: "¡", iff: "⇔", ifr: "𝔦", Ifr: "ℑ", igrave: "ì", Igrave: "Ì", ii: "ⅈ", iiiint: "⨌", iiint: "∭", iinfin: "⧜", iiota: "℩", ijlig: "ĳ", IJlig: "Ĳ", Im: "ℑ", imacr: "ī", Imacr: "Ī", image: "ℑ", ImaginaryI: "ⅈ", imagline: "ℐ", imagpart: "ℑ", imath: "ı", imof: "⊷", imped: "Ƶ", Implies: "⇒", in: "∈", incare: "℅", infin: "∞", infintie: "⧝", inodot: "ı", int: "∫", Int: "∬", intcal: "⊺", integers: "ℤ", Integral: "∫", intercal: "⊺", Intersection: "⋂", intlarhk: "⨗", intprod: "⨼", InvisibleComma: "⁣", InvisibleTimes: "⁢", iocy: "ё", IOcy: "Ё", iogon: "į", Iogon: "Į", iopf: "𝕚", Iopf: "𝕀", iota: "ι", Iota: "Ι", iprod: "⨼", iquest: "¿", iscr: "𝒾", Iscr: "ℐ", isin: "∈", isindot: "⋵", isinE: "⋹", isins: "⋴", isinsv: "⋳", isinv: "∈", it: "⁢", itilde: "ĩ", Itilde: "Ĩ", iukcy: "і", Iukcy: "І", iuml: "ï", Iuml: "Ï", jcirc: "ĵ", Jcirc: "Ĵ", jcy: "й", Jcy: "Й", jfr: "𝔧", Jfr: "𝔍", jmath: "ȷ", jopf: "𝕛", Jopf: "𝕁", jscr: "𝒿", Jscr: "𝒥", jsercy: "ј", Jsercy: "Ј", jukcy: "є", Jukcy: "Є", kappa: "κ", Kappa: "Κ", kappav: "ϰ", kcedil: "ķ", Kcedil: "Ķ", kcy: "к", Kcy: "К", kfr: "𝔨", Kfr: "𝔎", kgreen: "ĸ", khcy: "х", KHcy: "Х", kjcy: "ќ", KJcy: "Ќ", kopf: "𝕜", Kopf: "𝕂", kscr: "𝓀", Kscr: "𝒦", lAarr: "⇚", lacute: "ĺ", Lacute: "Ĺ", laemptyv: "⦴", lagran: "ℒ", lambda: "λ", Lambda: "Λ", lang: "⟨", Lang: "⟪", langd: "⦑", langle: "⟨", lap: "⪅", Laplacetrf: "ℒ", laquo: "«", larr: "←", lArr: "⇐", Larr: "↞", larrb: "⇤", larrbfs: "⤟", larrfs: "⤝", larrhk: "↩", larrlp: "↫", larrpl: "⤹", larrsim: "⥳", larrtl: "↢", lat: "⪫", latail: "⤙", lAtail: "⤛", late: "⪭", lates: "⪭︀", lbarr: "⤌", lBarr: "⤎", lbbrk: "❲", lbrace: "{", lbrack: "[", lbrke: "⦋", lbrksld: "⦏", lbrkslu: "⦍", lcaron: "ľ", Lcaron: "Ľ", lcedil: "ļ", Lcedil: "Ļ", lceil: "⌈", lcub: "{", lcy: "л", Lcy: "Л", ldca: "⤶", ldquo: "“", ldquor: "„", ldrdhar: "⥧", ldrushar: "⥋", ldsh: "↲", le: "≤", lE: "≦", LeftAngleBracket: "⟨", leftarrow: "←", Leftarrow: "⇐", LeftArrow: "←", LeftArrowBar: "⇤", LeftArrowRightArrow: "⇆", leftarrowtail: "↢", LeftCeiling: "⌈", LeftDoubleBracket: "⟦", LeftDownTeeVector: "⥡", LeftDownVector: "⇃", LeftDownVectorBar: "⥙", LeftFloor: "⌊", leftharpoondown: "↽", leftharpoonup: "↼", leftleftarrows: "⇇", leftrightarrow: "↔", Leftrightarrow: "⇔", LeftRightArrow: "↔", leftrightarrows: "⇆", leftrightharpoons: "⇋", leftrightsquigarrow: "↭", LeftRightVector: "⥎", LeftTee: "⊣", LeftTeeArrow: "↤", LeftTeeVector: "⥚", leftthreetimes: "⋋", LeftTriangle: "⊲", LeftTriangleBar: "⧏", LeftTriangleEqual: "⊴", LeftUpDownVector: "⥑", LeftUpTeeVector: "⥠", LeftUpVector: "↿", LeftUpVectorBar: "⥘", LeftVector: "↼", LeftVectorBar: "⥒", leg: "⋚", lEg: "⪋", leq: "≤", leqq: "≦", leqslant: "⩽", les: "⩽", lescc: "⪨", lesdot: "⩿", lesdoto: "⪁", lesdotor: "⪃", lesg: "⋚︀", lesges: "⪓", lessapprox: "⪅", lessdot: "⋖", lesseqgtr: "⋚", lesseqqgtr: "⪋", LessEqualGreater: "⋚", LessFullEqual: "≦", LessGreater: "≶", lessgtr: "≶", LessLess: "⪡", lesssim: "≲", LessSlantEqual: "⩽", LessTilde: "≲", lfisht: "⥼", lfloor: "⌊", lfr: "𝔩", Lfr: "𝔏", lg: "≶", lgE: "⪑", lHar: "⥢", lhard: "↽", lharu: "↼", lharul: "⥪", lhblk: "▄", ljcy: "љ", LJcy: "Љ", ll: "≪", Ll: "⋘", llarr: "⇇", llcorner: "⌞", Lleftarrow: "⇚", llhard: "⥫", lltri: "◺", lmidot: "ŀ", Lmidot: "Ŀ", lmoust: "⎰", lmoustache: "⎰", lnap: "⪉", lnapprox: "⪉", lne: "⪇", lnE: "≨", lneq: "⪇", lneqq: "≨", lnsim: "⋦", loang: "⟬", loarr: "⇽", lobrk: "⟦", longleftarrow: "⟵", Longleftarrow: "⟸", LongLeftArrow: "⟵", longleftrightarrow: "⟷", Longleftrightarrow: "⟺", LongLeftRightArrow: "⟷", longmapsto: "⟼", longrightarrow: "⟶", Longrightarrow: "⟹", LongRightArrow: "⟶", looparrowleft: "↫", looparrowright: "↬", lopar: "⦅", lopf: "𝕝", Lopf: "𝕃", loplus: "⨭", lotimes: "⨴", lowast: "∗", lowbar: "_", LowerLeftArrow: "↙", LowerRightArrow: "↘", loz: "◊", lozenge: "◊", lozf: "⧫", lpar: "(", lparlt: "⦓", lrarr: "⇆", lrcorner: "⌟", lrhar: "⇋", lrhard: "⥭", lrm: "‎", lrtri: "⊿", lsaquo: "‹", lscr: "𝓁", Lscr: "ℒ", lsh: "↰", Lsh: "↰", lsim: "≲", lsime: "⪍", lsimg: "⪏", lsqb: "[", lsquo: "‘", lsquor: "‚", lstrok: "ł", Lstrok: "Ł", lt: "<", Lt: "≪", LT: "<", ltcc: "⪦", ltcir: "⩹", ltdot: "⋖", lthree: "⋋", ltimes: "⋉", ltlarr: "⥶", ltquest: "⩻", ltri: "◃", ltrie: "⊴", ltrif: "◂", ltrPar: "⦖", lurdshar: "⥊", luruhar: "⥦", lvertneqq: "≨︀", lvnE: "≨︀", macr: "¯", male: "♂", malt: "✠", maltese: "✠", map: "↦", Map: "⤅", mapsto: "↦", mapstodown: "↧", mapstoleft: "↤", mapstoup: "↥", marker: "▮", mcomma: "⨩", mcy: "м", Mcy: "М", mdash: "—", mDDot: "∺", measuredangle: "∡", MediumSpace: " ", Mellintrf: "ℳ", mfr: "𝔪", Mfr: "𝔐", mho: "℧", micro: "µ", mid: "∣", midast: "*", midcir: "⫰", middot: "·", minus: "−", minusb: "⊟", minusd: "∸", minusdu: "⨪", MinusPlus: "∓", mlcp: "⫛", mldr: "…", mnplus: "∓", models: "⊧", mopf: "𝕞", Mopf: "𝕄", mp: "∓", mscr: "𝓂", Mscr: "ℳ", mstpos: "∾", mu: "μ", Mu: "Μ", multimap: "⊸", mumap: "⊸", nabla: "∇", nacute: "ń", Nacute: "Ń", nang: "∠⃒", nap: "≉", napE: "⩰̸", napid: "≋̸", napos: "ŉ", napprox: "≉", natur: "♮", natural: "♮", naturals: "ℕ", nbsp: " ", nbump: "≎̸", nbumpe: "≏̸", ncap: "⩃", ncaron: "ň", Ncaron: "Ň", ncedil: "ņ", Ncedil: "Ņ", ncong: "≇", ncongdot: "⩭̸", ncup: "⩂", ncy: "н", Ncy: "Н", ndash: "–", ne: "≠", nearhk: "⤤", nearr: "↗", neArr: "⇗", nearrow: "↗", nedot: "≐̸", NegativeMediumSpace: "​", NegativeThickSpace: "​", NegativeThinSpace: "​", NegativeVeryThinSpace: "​", nequiv: "≢", nesear: "⤨", nesim: "≂̸", NestedGreaterGreater: "≫", NestedLessLess: "≪", NewLine: "\n", nexist: "∄", nexists: "∄", nfr: "𝔫", Nfr: "𝔑", nge: "≱", ngE: "≧̸", ngeq: "≱", ngeqq: "≧̸", ngeqslant: "⩾̸", nges: "⩾̸", nGg: "⋙̸", ngsim: "≵", ngt: "≯", nGt: "≫⃒", ngtr: "≯", nGtv: "≫̸", nharr: "↮", nhArr: "⇎", nhpar: "⫲", ni: "∋", nis: "⋼", nisd: "⋺", niv: "∋", njcy: "њ", NJcy: "Њ", nlarr: "↚", nlArr: "⇍", nldr: "‥", nle: "≰", nlE: "≦̸", nleftarrow: "↚", nLeftarrow: "⇍", nleftrightarrow: "↮", nLeftrightarrow: "⇎", nleq: "≰", nleqq: "≦̸", nleqslant: "⩽̸", nles: "⩽̸", nless: "≮", nLl: "⋘̸", nlsim: "≴", nlt: "≮", nLt: "≪⃒", nltri: "⋪", nltrie: "⋬", nLtv: "≪̸", nmid: "∤", NoBreak: "⁠", NonBreakingSpace: " ", nopf: "𝕟", Nopf: "ℕ", not: "¬", Not: "⫬", NotCongruent: "≢", NotCupCap: "≭", NotDoubleVerticalBar: "∦", NotElement: "∉", NotEqual: "≠", NotEqualTilde: "≂̸", NotExists: "∄", NotGreater: "≯", NotGreaterEqual: "≱", NotGreaterFullEqual: "≧̸", NotGreaterGreater: "≫̸", NotGreaterLess: "≹", NotGreaterSlantEqual: "⩾̸", NotGreaterTilde: "≵", NotHumpDownHump: "≎̸", NotHumpEqual: "≏̸", notin: "∉", notindot: "⋵̸", notinE: "⋹̸", notinva: "∉", notinvb: "⋷", notinvc: "⋶", NotLeftTriangle: "⋪", NotLeftTriangleBar: "⧏̸", NotLeftTriangleEqual: "⋬", NotLess: "≮", NotLessEqual: "≰", NotLessGreater: "≸", NotLessLess: "≪̸", NotLessSlantEqual: "⩽̸", NotLessTilde: "≴", NotNestedGreaterGreater: "⪢̸", NotNestedLessLess: "⪡̸", notni: "∌", notniva: "∌", notnivb: "⋾", notnivc: "⋽", NotPrecedes: "⊀", NotPrecedesEqual: "⪯̸", NotPrecedesSlantEqual: "⋠", NotReverseElement: "∌", NotRightTriangle: "⋫", NotRightTriangleBar: "⧐̸", NotRightTriangleEqual: "⋭", NotSquareSubset: "⊏̸", NotSquareSubsetEqual: "⋢", NotSquareSuperset: "⊐̸", NotSquareSupersetEqual: "⋣", NotSubset: "⊂⃒", NotSubsetEqual: "⊈", NotSucceeds: "⊁", NotSucceedsEqual: "⪰̸", NotSucceedsSlantEqual: "⋡", NotSucceedsTilde: "≿̸", NotSuperset: "⊃⃒", NotSupersetEqual: "⊉", NotTilde: "≁", NotTildeEqual: "≄", NotTildeFullEqual: "≇", NotTildeTilde: "≉", NotVerticalBar: "∤", npar: "∦", nparallel: "∦", nparsl: "⫽⃥", npart: "∂̸", npolint: "⨔", npr: "⊀", nprcue: "⋠", npre: "⪯̸", nprec: "⊀", npreceq: "⪯̸", nrarr: "↛", nrArr: "⇏", nrarrc: "⤳̸", nrarrw: "↝̸", nrightarrow: "↛", nRightarrow: "⇏", nrtri: "⋫", nrtrie: "⋭", nsc: "⊁", nsccue: "⋡", nsce: "⪰̸", nscr: "𝓃", Nscr: "𝒩", nshortmid: "∤", nshortparallel: "∦", nsim: "≁", nsime: "≄", nsimeq: "≄", nsmid: "∤", nspar: "∦", nsqsube: "⋢", nsqsupe: "⋣", nsub: "⊄", nsube: "⊈", nsubE: "⫅̸", nsubset: "⊂⃒", nsubseteq: "⊈", nsubseteqq: "⫅̸", nsucc: "⊁", nsucceq: "⪰̸", nsup: "⊅", nsupe: "⊉", nsupE: "⫆̸", nsupset: "⊃⃒", nsupseteq: "⊉", nsupseteqq: "⫆̸", ntgl: "≹", ntilde: "ñ", Ntilde: "Ñ", ntlg: "≸", ntriangleleft: "⋪", ntrianglelefteq: "⋬", ntriangleright: "⋫", ntrianglerighteq: "⋭", nu: "ν", Nu: "Ν", num: "#", numero: "№", numsp: " ", nvap: "≍⃒", nvdash: "⊬", nvDash: "⊭", nVdash: "⊮", nVDash: "⊯", nvge: "≥⃒", nvgt: ">⃒", nvHarr: "⤄", nvinfin: "⧞", nvlArr: "⤂", nvle: "≤⃒", nvlt: "<⃒", nvltrie: "⊴⃒", nvrArr: "⤃", nvrtrie: "⊵⃒", nvsim: "∼⃒", nwarhk: "⤣", nwarr: "↖", nwArr: "⇖", nwarrow: "↖", nwnear: "⤧", oacute: "ó", Oacute: "Ó", oast: "⊛", ocir: "⊚", ocirc: "ô", Ocirc: "Ô", ocy: "о", Ocy: "О", odash: "⊝", odblac: "ő", Odblac: "Ő", odiv: "⨸", odot: "⊙", odsold: "⦼", oelig: "œ", OElig: "Œ", ofcir: "⦿", ofr: "𝔬", Ofr: "𝔒", ogon: "˛", ograve: "ò", Ograve: "Ò", ogt: "⧁", ohbar: "⦵", ohm: "Ω", oint: "∮", olarr: "↺", olcir: "⦾", olcross: "⦻", oline: "‾", olt: "⧀", omacr: "ō", Omacr: "Ō", omega: "ω", Omega: "Ω", omicron: "ο", Omicron: "Ο", omid: "⦶", ominus: "⊖", oopf: "𝕠", Oopf: "𝕆", opar: "⦷", OpenCurlyDoubleQuote: "“", OpenCurlyQuote: "‘", operp: "⦹", oplus: "⊕", or: "∨", Or: "⩔", orarr: "↻", ord: "⩝", order: "ℴ", orderof: "ℴ", ordf: "ª", ordm: "º", origof: "⊶", oror: "⩖", orslope: "⩗", orv: "⩛", oS: "Ⓢ", oscr: "ℴ", Oscr: "𝒪", oslash: "ø", Oslash: "Ø", osol: "⊘", otilde: "õ", Otilde: "Õ", otimes: "⊗", Otimes: "⨷", otimesas: "⨶", ouml: "ö", Ouml: "Ö", ovbar: "⌽", OverBar: "‾", OverBrace: "⏞", OverBracket: "⎴", OverParenthesis: "⏜", par: "∥", para: "¶", parallel: "∥", parsim: "⫳", parsl: "⫽", part: "∂", PartialD: "∂", pcy: "п", Pcy: "П", percnt: "%", period: ".", permil: "‰", perp: "⊥", pertenk: "‱", pfr: "𝔭", Pfr: "𝔓", phi: "φ", Phi: "Φ", phiv: "ϕ", phmmat: "ℳ", phone: "☎", pi: "π", Pi: "Π", pitchfork: "⋔", piv: "ϖ", planck: "ℏ", planckh: "ℎ", plankv: "ℏ", plus: "+", plusacir: "⨣", plusb: "⊞", pluscir: "⨢", plusdo: "∔", plusdu: "⨥", pluse: "⩲", PlusMinus: "±", plusmn: "±", plussim: "⨦", plustwo: "⨧", pm: "±", Poincareplane: "ℌ", pointint: "⨕", popf: "𝕡", Popf: "ℙ", pound: "£", pr: "≺", Pr: "⪻", prap: "⪷", prcue: "≼", pre: "⪯", prE: "⪳", prec: "≺", precapprox: "⪷", preccurlyeq: "≼", Precedes: "≺", PrecedesEqual: "⪯", PrecedesSlantEqual: "≼", PrecedesTilde: "≾", preceq: "⪯", precnapprox: "⪹", precneqq: "⪵", precnsim: "⋨", precsim: "≾", prime: "′", Prime: "″", primes: "ℙ", prnap: "⪹", prnE: "⪵", prnsim: "⋨", prod: "∏", Product: "∏", profalar: "⌮", profline: "⌒", profsurf: "⌓", prop: "∝", Proportion: "∷", Proportional: "∝", propto: "∝", prsim: "≾", prurel: "⊰", pscr: "𝓅", Pscr: "𝒫", psi: "ψ", Psi: "Ψ", puncsp: " ", qfr: "𝔮", Qfr: "𝔔", qint: "⨌", qopf: "𝕢", Qopf: "ℚ", qprime: "⁗", qscr: "𝓆", Qscr: "𝒬", quaternions: "ℍ", quatint: "⨖", quest: "?", questeq: "≟", quot: '"', QUOT: '"', rAarr: "⇛", race: "∽̱", racute: "ŕ", Racute: "Ŕ", radic: "√", raemptyv: "⦳", rang: "⟩", Rang: "⟫", rangd: "⦒", range: "⦥", rangle: "⟩", raquo: "»", rarr: "→", rArr: "⇒", Rarr: "↠", rarrap: "⥵", rarrb: "⇥", rarrbfs: "⤠", rarrc: "⤳", rarrfs: "⤞", rarrhk: "↪", rarrlp: "↬", rarrpl: "⥅", rarrsim: "⥴", rarrtl: "↣", Rarrtl: "⤖", rarrw: "↝", ratail: "⤚", rAtail: "⤜", ratio: "∶", rationals: "ℚ", rbarr: "⤍", rBarr: "⤏", RBarr: "⤐", rbbrk: "❳", rbrace: "}", rbrack: "]", rbrke: "⦌", rbrksld: "⦎", rbrkslu: "⦐", rcaron: "ř", Rcaron: "Ř", rcedil: "ŗ", Rcedil: "Ŗ", rceil: "⌉", rcub: "}", rcy: "р", Rcy: "Р", rdca: "⤷", rdldhar: "⥩", rdquo: "”", rdquor: "”", rdsh: "↳", Re: "ℜ", real: "ℜ", realine: "ℛ", realpart: "ℜ", reals: "ℝ", rect: "▭", reg: "®", REG: "®", ReverseElement: "∋", ReverseEquilibrium: "⇋", ReverseUpEquilibrium: "⥯", rfisht: "⥽", rfloor: "⌋", rfr: "𝔯", Rfr: "ℜ", rHar: "⥤", rhard: "⇁", rharu: "⇀", rharul: "⥬", rho: "ρ", Rho: "Ρ", rhov: "ϱ", RightAngleBracket: "⟩", rightarrow: "→", Rightarrow: "⇒", RightArrow: "→", RightArrowBar: "⇥", RightArrowLeftArrow: "⇄", rightarrowtail: "↣", RightCeiling: "⌉", RightDoubleBracket: "⟧", RightDownTeeVector: "⥝", RightDownVector: "⇂", RightDownVectorBar: "⥕", RightFloor: "⌋", rightharpoondown: "⇁", rightharpoonup: "⇀", rightleftarrows: "⇄", rightleftharpoons: "⇌", rightrightarrows: "⇉", rightsquigarrow: "↝", RightTee: "⊢", RightTeeArrow: "↦", RightTeeVector: "⥛", rightthreetimes: "⋌", RightTriangle: "⊳", RightTriangleBar: "⧐", RightTriangleEqual: "⊵", RightUpDownVector: "⥏", RightUpTeeVector: "⥜", RightUpVector: "↾", RightUpVectorBar: "⥔", RightVector: "⇀", RightVectorBar: "⥓", ring: "˚", risingdotseq: "≓", rlarr: "⇄", rlhar: "⇌", rlm: "‏", rmoust: "⎱", rmoustache: "⎱", rnmid: "⫮", roang: "⟭", roarr: "⇾", robrk: "⟧", ropar: "⦆", ropf: "𝕣", Ropf: "ℝ", roplus: "⨮", rotimes: "⨵", RoundImplies: "⥰", rpar: ")", rpargt: "⦔", rppolint: "⨒", rrarr: "⇉", Rrightarrow: "⇛", rsaquo: "›", rscr: "𝓇", Rscr: "ℛ", rsh: "↱", Rsh: "↱", rsqb: "]", rsquo: "’", rsquor: "’", rthree: "⋌", rtimes: "⋊", rtri: "▹", rtrie: "⊵", rtrif: "▸", rtriltri: "⧎", RuleDelayed: "⧴", ruluhar: "⥨", rx: "℞", sacute: "ś", Sacute: "Ś", sbquo: "‚", sc: "≻", Sc: "⪼", scap: "⪸", scaron: "š", Scaron: "Š", sccue: "≽", sce: "⪰", scE: "⪴", scedil: "ş", Scedil: "Ş", scirc: "ŝ", Scirc: "Ŝ", scnap: "⪺", scnE: "⪶", scnsim: "⋩", scpolint: "⨓", scsim: "≿", scy: "с", Scy: "С", sdot: "⋅", sdotb: "⊡", sdote: "⩦", searhk: "⤥", searr: "↘", seArr: "⇘", searrow: "↘", sect: "§", semi: ";", seswar: "⤩", setminus: "∖", setmn: "∖", sext: "✶", sfr: "𝔰", Sfr: "𝔖", sfrown: "⌢", sharp: "♯", shchcy: "щ", SHCHcy: "Щ", shcy: "ш", SHcy: "Ш", ShortDownArrow: "↓", ShortLeftArrow: "←", shortmid: "∣", shortparallel: "∥", ShortRightArrow: "→", ShortUpArrow: "↑", shy: "­", sigma: "σ", Sigma: "Σ", sigmaf: "ς", sigmav: "ς", sim: "∼", simdot: "⩪", sime: "≃", simeq: "≃", simg: "⪞", simgE: "⪠", siml: "⪝", simlE: "⪟", simne: "≆", simplus: "⨤", simrarr: "⥲", slarr: "←", SmallCircle: "∘", smallsetminus: "∖", smashp: "⨳", smeparsl: "⧤", smid: "∣", smile: "⌣", smt: "⪪", smte: "⪬", smtes: "⪬︀", softcy: "ь", SOFTcy: "Ь", sol: "/", solb: "⧄", solbar: "⌿", sopf: "𝕤", Sopf: "𝕊", spades: "♠", spadesuit: "♠", spar: "∥", sqcap: "⊓", sqcaps: "⊓︀", sqcup: "⊔", sqcups: "⊔︀", Sqrt: "√", sqsub: "⊏", sqsube: "⊑", sqsubset: "⊏", sqsubseteq: "⊑", sqsup: "⊐", sqsupe: "⊒", sqsupset: "⊐", sqsupseteq: "⊒", squ: "□", square: "□", Square: "□", SquareIntersection: "⊓", SquareSubset: "⊏", SquareSubsetEqual: "⊑", SquareSuperset: "⊐", SquareSupersetEqual: "⊒", SquareUnion: "⊔", squarf: "▪", squf: "▪", srarr: "→", sscr: "𝓈", Sscr: "𝒮", ssetmn: "∖", ssmile: "⌣", sstarf: "⋆", star: "☆", Star: "⋆", starf: "★", straightepsilon: "ϵ", straightphi: "ϕ", strns: "¯", sub: "⊂", Sub: "⋐", subdot: "⪽", sube: "⊆", subE: "⫅", subedot: "⫃", submult: "⫁", subne: "⊊", subnE: "⫋", subplus: "⪿", subrarr: "⥹", subset: "⊂", Subset: "⋐", subseteq: "⊆", subseteqq: "⫅", SubsetEqual: "⊆", subsetneq: "⊊", subsetneqq: "⫋", subsim: "⫇", subsub: "⫕", subsup: "⫓", succ: "≻", succapprox: "⪸", succcurlyeq: "≽", Succeeds: "≻", SucceedsEqual: "⪰", SucceedsSlantEqual: "≽", SucceedsTilde: "≿", succeq: "⪰", succnapprox: "⪺", succneqq: "⪶", succnsim: "⋩", succsim: "≿", SuchThat: "∋", sum: "∑", Sum: "∑", sung: "♪", sup: "⊃", Sup: "⋑", sup1: "¹", sup2: "²", sup3: "³", supdot: "⪾", supdsub: "⫘", supe: "⊇", supE: "⫆", supedot: "⫄", Superset: "⊃", SupersetEqual: "⊇", suphsol: "⟉", suphsub: "⫗", suplarr: "⥻", supmult: "⫂", supne: "⊋", supnE: "⫌", supplus: "⫀", supset: "⊃", Supset: "⋑", supseteq: "⊇", supseteqq: "⫆", supsetneq: "⊋", supsetneqq: "⫌", supsim: "⫈", supsub: "⫔", supsup: "⫖", swarhk: "⤦", swarr: "↙", swArr: "⇙", swarrow: "↙", swnwar: "⤪", szlig: "ß", Tab: "	", target: "⌖", tau: "τ", Tau: "Τ", tbrk: "⎴", tcaron: "ť", Tcaron: "Ť", tcedil: "ţ", Tcedil: "Ţ", tcy: "т", Tcy: "Т", tdot: "⃛", telrec: "⌕", tfr: "𝔱", Tfr: "𝔗", there4: "∴", therefore: "∴", Therefore: "∴", theta: "θ", Theta: "Θ", thetasym: "ϑ", thetav: "ϑ", thickapprox: "≈", thicksim: "∼", ThickSpace: "  ", thinsp: " ", ThinSpace: " ", thkap: "≈", thksim: "∼", thorn: "þ", THORN: "Þ", tilde: "˜", Tilde: "∼", TildeEqual: "≃", TildeFullEqual: "≅", TildeTilde: "≈", times: "×", timesb: "⊠", timesbar: "⨱", timesd: "⨰", tint: "∭", toea: "⤨", top: "⊤", topbot: "⌶", topcir: "⫱", topf: "𝕥", Topf: "𝕋", topfork: "⫚", tosa: "⤩", tprime: "‴", trade: "™", TRADE: "™", triangle: "▵", triangledown: "▿", triangleleft: "◃", trianglelefteq: "⊴", triangleq: "≜", triangleright: "▹", trianglerighteq: "⊵", tridot: "◬", trie: "≜", triminus: "⨺", TripleDot: "⃛", triplus: "⨹", trisb: "⧍", tritime: "⨻", trpezium: "⏢", tscr: "𝓉", Tscr: "𝒯", tscy: "ц", TScy: "Ц", tshcy: "ћ", TSHcy: "Ћ", tstrok: "ŧ", Tstrok: "Ŧ", twixt: "≬", twoheadleftarrow: "↞", twoheadrightarrow: "↠", uacute: "ú", Uacute: "Ú", uarr: "↑", uArr: "⇑", Uarr: "↟", Uarrocir: "⥉", ubrcy: "ў", Ubrcy: "Ў", ubreve: "ŭ", Ubreve: "Ŭ", ucirc: "û", Ucirc: "Û", ucy: "у", Ucy: "У", udarr: "⇅", udblac: "ű", Udblac: "Ű", udhar: "⥮", ufisht: "⥾", ufr: "𝔲", Ufr: "𝔘", ugrave: "ù", Ugrave: "Ù", uHar: "⥣", uharl: "↿", uharr: "↾", uhblk: "▀", ulcorn: "⌜", ulcorner: "⌜", ulcrop: "⌏", ultri: "◸", umacr: "ū", Umacr: "Ū", uml: "¨", UnderBar: "_", UnderBrace: "⏟", UnderBracket: "⎵", UnderParenthesis: "⏝", Union: "⋃", UnionPlus: "⊎", uogon: "ų", Uogon: "Ų", uopf: "𝕦", Uopf: "𝕌", uparrow: "↑", Uparrow: "⇑", UpArrow: "↑", UpArrowBar: "⤒", UpArrowDownArrow: "⇅", updownarrow: "↕", Updownarrow: "⇕", UpDownArrow: "↕", UpEquilibrium: "⥮", upharpoonleft: "↿", upharpoonright: "↾", uplus: "⊎", UpperLeftArrow: "↖", UpperRightArrow: "↗", upsi: "υ", Upsi: "ϒ", upsih: "ϒ", upsilon: "υ", Upsilon: "Υ", UpTee: "⊥", UpTeeArrow: "↥", upuparrows: "⇈", urcorn: "⌝", urcorner: "⌝", urcrop: "⌎", uring: "ů", Uring: "Ů", urtri: "◹", uscr: "𝓊", Uscr: "𝒰", utdot: "⋰", utilde: "ũ", Utilde: "Ũ", utri: "▵", utrif: "▴", uuarr: "⇈", uuml: "ü", Uuml: "Ü", uwangle: "⦧", vangrt: "⦜", varepsilon: "ϵ", varkappa: "ϰ", varnothing: "∅", varphi: "ϕ", varpi: "ϖ", varpropto: "∝", varr: "↕", vArr: "⇕", varrho: "ϱ", varsigma: "ς", varsubsetneq: "⊊︀", varsubsetneqq: "⫋︀", varsupsetneq: "⊋︀", varsupsetneqq: "⫌︀", vartheta: "ϑ", vartriangleleft: "⊲", vartriangleright: "⊳", vBar: "⫨", Vbar: "⫫", vBarv: "⫩", vcy: "в", Vcy: "В", vdash: "⊢", vDash: "⊨", Vdash: "⊩", VDash: "⊫", Vdashl: "⫦", vee: "∨", Vee: "⋁", veebar: "⊻", veeeq: "≚", vellip: "⋮", verbar: "|", Verbar: "‖", vert: "|", Vert: "‖", VerticalBar: "∣", VerticalLine: "|", VerticalSeparator: "❘", VerticalTilde: "≀", VeryThinSpace: " ", vfr: "𝔳", Vfr: "𝔙", vltri: "⊲", vnsub: "⊂⃒", vnsup: "⊃⃒", vopf: "𝕧", Vopf: "𝕍", vprop: "∝", vrtri: "⊳", vscr: "𝓋", Vscr: "𝒱", vsubne: "⊊︀", vsubnE: "⫋︀", vsupne: "⊋︀", vsupnE: "⫌︀", Vvdash: "⊪", vzigzag: "⦚", wcirc: "ŵ", Wcirc: "Ŵ", wedbar: "⩟", wedge: "∧", Wedge: "⋀", wedgeq: "≙", weierp: "℘", wfr: "𝔴", Wfr: "𝔚", wopf: "𝕨", Wopf: "𝕎", wp: "℘", wr: "≀", wreath: "≀", wscr: "𝓌", Wscr: "𝒲", xcap: "⋂", xcirc: "◯", xcup: "⋃", xdtri: "▽", xfr: "𝔵", Xfr: "𝔛", xharr: "⟷", xhArr: "⟺", xi: "ξ", Xi: "Ξ", xlarr: "⟵", xlArr: "⟸", xmap: "⟼", xnis: "⋻", xodot: "⨀", xopf: "𝕩", Xopf: "𝕏", xoplus: "⨁", xotime: "⨂", xrarr: "⟶", xrArr: "⟹", xscr: "𝓍", Xscr: "𝒳", xsqcup: "⨆", xuplus: "⨄", xutri: "△", xvee: "⋁", xwedge: "⋀", yacute: "ý", Yacute: "Ý", yacy: "я", YAcy: "Я", ycirc: "ŷ", Ycirc: "Ŷ", ycy: "ы", Ycy: "Ы", yen: "¥", yfr: "𝔶", Yfr: "𝔜", yicy: "ї", YIcy: "Ї", yopf: "𝕪", Yopf: "𝕐", yscr: "𝓎", Yscr: "𝒴", yucy: "ю", YUcy: "Ю", yuml: "ÿ", Yuml: "Ÿ", zacute: "ź", Zacute: "Ź", zcaron: "ž", Zcaron: "Ž", zcy: "з", Zcy: "З", zdot: "ż", Zdot: "Ż", zeetrf: "ℨ", ZeroWidthSpace: "​", zeta: "ζ", Zeta: "Ζ", zfr: "𝔷", Zfr: "ℨ", zhcy: "ж", ZHcy: "Ж", zigrarr: "⇝", zopf: "𝕫", Zopf: "ℤ", zscr: "𝓏", Zscr: "𝒵", zwj: "‍", zwnj: "‌" }, b3 = { aacute: "á", Aacute: "Á", acirc: "â", Acirc: "Â", acute: "´", aelig: "æ", AElig: "Æ", agrave: "à", Agrave: "À", amp: "&", AMP: "&", aring: "å", Aring: "Å", atilde: "ã", Atilde: "Ã", auml: "ä", Auml: "Ä", brvbar: "¦", ccedil: "ç", Ccedil: "Ç", cedil: "¸", cent: "¢", copy: "©", COPY: "©", curren: "¤", deg: "°", divide: "÷", eacute: "é", Eacute: "É", ecirc: "ê", Ecirc: "Ê", egrave: "è", Egrave: "È", eth: "ð", ETH: "Ð", euml: "ë", Euml: "Ë", frac12: "½", frac14: "¼", frac34: "¾", gt: ">", GT: ">", iacute: "í", Iacute: "Í", icirc: "î", Icirc: "Î", iexcl: "¡", igrave: "ì", Igrave: "Ì", iquest: "¿", iuml: "ï", Iuml: "Ï", laquo: "«", lt: "<", LT: "<", macr: "¯", micro: "µ", middot: "·", nbsp: " ", not: "¬", ntilde: "ñ", Ntilde: "Ñ", oacute: "ó", Oacute: "Ó", ocirc: "ô", Ocirc: "Ô", ograve: "ò", Ograve: "Ò", ordf: "ª", ordm: "º", oslash: "ø", Oslash: "Ø", otilde: "õ", Otilde: "Õ", ouml: "ö", Ouml: "Ö", para: "¶", plusmn: "±", pound: "£", quot: '"', QUOT: '"', raquo: "»", reg: "®", REG: "®", sect: "§", shy: "­", sup1: "¹", sup2: "²", sup3: "³", szlig: "ß", thorn: "þ", THORN: "Þ", times: "×", uacute: "ú", Uacute: "Ú", ucirc: "û", Ucirc: "Û", ugrave: "ù", Ugrave: "Ù", uml: "¨", uuml: "ü", Uuml: "Ü", yacute: "ý", Yacute: "Ý", yen: "¥", yuml: "ÿ" }, y3 = { 0: "�", 128: "€", 130: "‚", 131: "ƒ", 132: "„", 133: "…", 134: "†", 135: "‡", 136: "ˆ", 137: "‰", 138: "Š", 139: "‹", 140: "Œ", 142: "Ž", 145: "‘", 146: "’", 147: "“", 148: "”", 149: "•", 150: "–", 151: "—", 152: "˜", 153: "™", 154: "š", 155: "›", 156: "œ", 158: "ž", 159: "Ÿ" }, E3 = [1, 2, 3, 4, 5, 6, 7, 8, 11, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 64976, 64977, 64978, 64979, 64980, 64981, 64982, 64983, 64984, 64985, 64986, 64987, 64988, 64989, 64990, 64991, 64992, 64993, 64994, 64995, 64996, 64997, 64998, 64999, 65e3, 65001, 65002, 65003, 65004, 65005, 65006, 65007, 65534, 65535, 131070, 131071, 196606, 196607, 262142, 262143, 327678, 327679, 393214, 393215, 458750, 458751, 524286, 524287, 589822, 589823, 655358, 655359, 720894, 720895, 786430, 786431, 851966, 851967, 917502, 917503, 983038, 983039, 1048574, 1048575, 1114110, 1114111], A3 = String.fromCharCode, w3 = {}.hasOwnProperty, O3 = function(e3, r3) {
        return w3.call(e3, r3);
      }, C3 = function(e3, r3) {
        if (!e3) return r3;
        var t4, n4 = {};
        for (t4 in r3) n4[t4] = O3(e3, t4) ? e3[t4] : r3[t4];
        return n4;
      }, x3 = function(e3, r3) {
        var t4 = "";
        return e3 >= 55296 && e3 <= 57343 || e3 > 1114111 ? (r3 && k3("character reference outside the permissible Unicode range"), "�") : O3(y3, e3) ? (r3 && k3("disallowed character reference"), y3[e3]) : (r3 && function(e4, r4) {
          for (var t5 = -1, n4 = e4.length; ++t5 < n4; ) if (e4[t5] == r4) return true;
          return false;
        }(E3, e3) && k3("disallowed character reference"), e3 > 65535 && (t4 += A3((e3 -= 65536) >>> 10 & 1023 | 55296), e3 = 56320 | 1023 & e3), t4 += A3(e3));
      }, S3 = function(e3) {
        return "&#x" + e3.toString(16).toUpperCase() + ";";
      }, R3 = function(e3) {
        return "&#" + e3 + ";";
      }, k3 = function(e3) {
        throw Error("Parse error: " + e3);
      }, T3 = function(e3, r3) {
        (r3 = C3(r3, T3.options)).strict && g3.test(e3) && k3("forbidden code point");
        var t4 = r3.encodeEverything, n4 = r3.useNamedReferences, o4 = r3.allowUnsafeSymbols, i4 = r3.decimal ? R3 : S3, s2 = function(e4) {
          return i4(e4.charCodeAt(0));
        };
        return t4 ? (e3 = e3.replace(u3, function(e4) {
          return n4 && O3(p3, e4) ? "&" + p3[e4] + ";" : s2(e4);
        }), n4 && (e3 = e3.replace(/&gt;\u20D2/g, "&nvgt;").replace(/&lt;\u20D2/g, "&nvlt;").replace(/&#x66;&#x6A;/g, "&fjlig;")), n4 && (e3 = e3.replace(c3, function(e4) {
          return "&" + p3[e4] + ";";
        }))) : n4 ? (o4 || (e3 = e3.replace(f3, function(e4) {
          return "&" + p3[e4] + ";";
        })), e3 = (e3 = e3.replace(/&gt;\u20D2/g, "&nvgt;").replace(/&lt;\u20D2/g, "&nvlt;")).replace(c3, function(e4) {
          return "&" + p3[e4] + ";";
        })) : o4 || (e3 = e3.replace(f3, s2)), e3.replace(a3, function(e4) {
          var r4 = e4.charCodeAt(0), t5 = e4.charCodeAt(1);
          return i4(1024 * (r4 - 55296) + t5 - 56320 + 65536);
        }).replace(l3, s2);
      };
      T3.options = { allowUnsafeSymbols: false, encodeEverything: false, strict: false, useNamedReferences: false, decimal: false };
      var L3 = function(e3, r3) {
        var t4 = (r3 = C3(r3, L3.options)).strict;
        return t4 && m3.test(e3) && k3("malformed character reference"), e3.replace(h3, function(e4, n4, o4, i4, a4, u4, s2, l4, c4) {
          var p4, f4, d4, m4, g4, h4;
          return n4 ? v3[g4 = n4] : o4 ? (g4 = o4, (h4 = i4) && r3.isAttributeValue ? (t4 && "=" == h4 && k3("`&` did not start a character reference"), e4) : (t4 && k3("named character reference was not terminated by a semicolon"), b3[g4] + (h4 || ""))) : a4 ? (d4 = a4, f4 = u4, t4 && !f4 && k3("character reference was not terminated by a semicolon"), p4 = parseInt(d4, 10), x3(p4, t4)) : s2 ? (m4 = s2, f4 = l4, t4 && !f4 && k3("character reference was not terminated by a semicolon"), p4 = parseInt(m4, 16), x3(p4, t4)) : (t4 && k3("named character reference was not terminated by a semicolon"), e4);
        });
      };
      L3.options = { isAttributeValue: false, strict: false };
      var D3 = { version: "1.2.0", encode: T3, decode: L3, escape: function(e3) {
        return e3.replace(f3, function(e4) {
          return d3[e4];
        });
      }, unescape: L3 };
      if (n3 && !n3.nodeType) if (o3) o3.exports = D3;
      else for (var _3 in D3) O3(D3, _3) && (n3[_3] = D3[_3]);
      else t3.he = D3;
    }(ti)), ri.exports).decode, o2 = Ki().HTMLParser, i2 = Ji(), a2 = function() {
      if (Mi) return Vi;
      function e3() {
      }
      function r3() {
      }
      return Mi = 1, e3.prototype.sort = function(e4, r4) {
        r4 = r4 || 0;
        for (var t3 = 0, n3 = this.keys.length; t3 < n3; t3++) {
          var o3 = this.keys[t3], i3 = o3.slice(1), a3 = e4.indexOf(i3, r4);
          if (-1 !== a3) {
            do {
              a3 !== r4 && (e4.splice(a3, 1), e4.splice(r4, 0, i3)), r4++;
            } while (-1 !== (a3 = e4.indexOf(i3, r4)));
            return this[o3].sort(e4, r4);
          }
        }
        return e4;
      }, r3.prototype = { add: function(e4) {
        var r4 = this;
        e4.forEach(function(t3) {
          var n3 = "$" + t3;
          r4[n3] || (r4[n3] = [], r4[n3].processed = 0), r4[n3].push(e4);
        });
      }, createSorter: function() {
        var t3 = this, n3 = new e3();
        return n3.keys = Object.keys(t3).sort(function(e4, r4) {
          var n4 = t3[e4].length, o3 = t3[r4].length;
          return n4 < o3 ? 1 : n4 > o3 || e4 < r4 ? -1 : e4 > r4 ? 1 : 0;
        }).filter(function(e4) {
          if (t3[e4].processed < t3[e4].length) {
            var o3 = e4.slice(1), i3 = new r3();
            return t3[e4].forEach(function(e5) {
              for (var r4; -1 !== (r4 = e5.indexOf(o3)); ) e5.splice(r4, 1);
              e5.forEach(function(e6) {
                t3["$" + e6].processed++;
              }), i3.add(e5.slice(0));
            }), n3[e4] = i3.createSorter(), true;
          }
          return false;
        }), n3;
      } }, Vi = r3;
    }(), u2 = ba(), l2 = $i();
    function c2(e3) {
      return e3 && e3.replace(/^[ \n\r\t\f]+/, "").replace(/[ \n\r\t\f]+$/, "");
    }
    function p2(e3) {
      return e3 && e3.replace(/[ \n\r\t\f\xA0]+/g, function(e4) {
        return "	" === e4 ? "	" : e4.replace(/(^|\xA0+)[^\xA0]+/g, "$1 ");
      });
    }
    function f2(e3, r3, t3, n3, o3) {
      var i3 = "", a3 = "";
      return r3.preserveLineBreaks && (e3 = e3.replace(/^[ \n\r\t\f]*?[\n\r][ \n\r\t\f]*/, function() {
        return i3 = "\n", "";
      }).replace(/[ \n\r\t\f]*?[\n\r][ \n\r\t\f]*$/, function() {
        return a3 = "\n", "";
      })), t3 && (e3 = e3.replace(/^[ \n\r\t\f\xA0]+/, function(e4) {
        var t4 = !i3 && r3.conservativeCollapse;
        return t4 && "	" === e4 ? "	" : e4.replace(/^[^\xA0]+/, "").replace(/(\xA0+)[^\xA0]+/g, "$1 ") || (t4 ? " " : "");
      })), n3 && (e3 = e3.replace(/[ \n\r\t\f\xA0]+$/, function(e4) {
        var t4 = !a3 && r3.conservativeCollapse;
        return t4 && "	" === e4 ? "	" : e4.replace(/[^\xA0]+(\xA0+)/g, " $1").replace(/[^\xA0]+$/, "") || (t4 ? " " : "");
      })), o3 && (e3 = p2(e3)), i3 + e3 + a3;
    }
    var d2 = l2.createMapFromString, m2 = d2("a,abbr,acronym,b,bdi,bdo,big,button,cite,code,del,dfn,em,font,i,ins,kbd,label,mark,math,nobr,object,q,rp,rt,rtc,ruby,s,samp,select,small,span,strike,strong,sub,sup,svg,textarea,time,tt,u,var"), g2 = d2("a,abbr,acronym,b,big,del,em,font,i,ins,kbd,mark,nobr,rp,s,samp,small,span,strike,strong,sub,sup,time,tt,u,var"), h2 = d2("comment,img,input,wbr");
    function v2(e3, r3, t3, n3) {
      var o3 = r3 && !h2(r3);
      o3 && !n3.collapseInlineTagWhitespace && (o3 = "/" === r3.charAt(0) ? !m2(r3.slice(1)) : !g2(r3));
      var i3 = t3 && !h2(t3);
      return i3 && !n3.collapseInlineTagWhitespace && (i3 = "/" === t3.charAt(0) ? !g2(t3.slice(1)) : !m2(t3)), f2(e3, n3, o3, i3, r3 && t3);
    }
    function b2(e3, r3) {
      for (var t3 = e3.length; t3--; ) if (e3[t3].name.toLowerCase() === r3) return true;
      return false;
    }
    var y2 = l2.createMap(["text/javascript", "text/ecmascript", "text/jscript", "application/javascript", "application/x-javascript", "application/ecmascript"]);
    function E2(e3) {
      return "" === (e3 = c2(e3.split(/;/, 2)[0]).toLowerCase()) || y2(e3);
    }
    function A2(e3) {
      return "" === (e3 = c2(e3).toLowerCase()) || "text/css" === e3;
    }
    function w2(e3, r3) {
      if ("style" !== e3) return false;
      for (var t3 = 0, n3 = r3.length; t3 < n3; t3++) {
        if ("type" === r3[t3].name.toLowerCase()) return A2(r3[t3].value);
      }
      return true;
    }
    var O2 = d2("allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,default,defaultchecked,defaultmuted,defaultselected,defer,disabled,enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,required,reversed,scoped,seamless,selected,sortable,truespeed,typemustmatch,visible"), C2 = d2("true,false");
    function x2(e3, r3, t3) {
      if ("link" !== e3) return false;
      for (var n3 = 0, o3 = r3.length; n3 < o3; n3++) if ("rel" === r3[n3].name && r3[n3].value === t3) return true;
    }
    var S2 = d2("img,source");
    function R2(e3, r3, t3, n3, o3) {
      if (function(e4, r4) {
        var t4 = r4.customEventAttributes;
        if (t4) {
          for (var n4 = t4.length; n4--; ) if (t4[n4].test(e4)) return true;
          return false;
        }
        return /^on[a-z]{3,}$/.test(e4);
      }(r3, n3)) return t3 = c2(t3).replace(/^javascript:\s*/i, ""), n3.minifyJS(t3, true);
      if ("class" === r3) return t3 = c2(t3), t3 = n3.sortClassName ? n3.sortClassName(t3) : p2(t3);
      if (function(e4, r4) {
        return /^(?:a|area|link|base)$/.test(r4) && "href" === e4 || "img" === r4 && /^(?:src|longdesc|usemap)$/.test(e4) || "object" === r4 && /^(?:classid|codebase|data|usemap)$/.test(e4) || "q" === r4 && "cite" === e4 || "blockquote" === r4 && "cite" === e4 || ("ins" === r4 || "del" === r4) && "cite" === e4 || "form" === r4 && "action" === e4 || "input" === r4 && ("src" === e4 || "usemap" === e4) || "head" === r4 && "profile" === e4 || "script" === r4 && ("src" === e4 || "for" === e4);
      }(r3, e3)) return t3 = c2(t3), x2(e3, o3, "canonical") ? t3 : n3.minifyURLs(t3);
      if (function(e4, r4) {
        return /^(?:a|area|object|button)$/.test(r4) && "tabindex" === e4 || "input" === r4 && ("maxlength" === e4 || "tabindex" === e4) || "select" === r4 && ("size" === e4 || "tabindex" === e4) || "textarea" === r4 && /^(?:rows|cols|tabindex)$/.test(e4) || "colgroup" === r4 && "span" === e4 || "col" === r4 && "span" === e4 || ("th" === r4 || "td" === r4) && ("rowspan" === e4 || "colspan" === e4);
      }(r3, e3)) return c2(t3);
      if ("style" === r3) return (t3 = c2(t3)) && (/;$/.test(t3) && !/&#?[0-9a-zA-Z]+;$/.test(t3) && (t3 = t3.replace(/\s*;$/, ";")), t3 = n3.minifyCSS(t3, "inline")), t3;
      if (function(e4, r4) {
        return "srcset" === e4 && S2(r4);
      }(r3, e3)) t3 = c2(t3).split(/\s+,\s*|\s*,\s+/).map(function(e4) {
        var r4 = e4, t4 = "", o4 = e4.match(/\s+([1-9][0-9]*w|[0-9]+(?:\.[0-9]+)?x)$/);
        if (o4) {
          r4 = r4.slice(0, -o4[0].length);
          var i3 = +o4[1].slice(0, -1), a3 = o4[1].slice(-1);
          1 === i3 && "x" === a3 || (t4 = " " + i3 + a3);
        }
        return n3.minifyURLs(r4) + t4;
      }).join(", ");
      else if (function(e4, r4) {
        if ("meta" !== e4) return false;
        for (var t4 = 0, n4 = r4.length; t4 < n4; t4++) if ("name" === r4[t4].name && "viewport" === r4[t4].value) return true;
      }(e3, o3) && "content" === r3) t3 = t3.replace(/\s+/g, "").replace(/[0-9]+\.[0-9]+/g, function(e4) {
        return (+e4).toString();
      });
      else if (n3.customAttrCollapse && n3.customAttrCollapse.test(r3)) t3 = t3.replace(/\n+|\r+|\s{2,}/g, "");
      else if ("script" === e3 && "type" === r3) t3 = c2(t3.replace(/\s*;\s*/g, ";"));
      else if (function(e4, r4, t4) {
        return "media" === t4 && (x2(e4, r4, "stylesheet") || w2(e4, r4));
      }(e3, o3, r3)) return t3 = c2(t3), n3.minifyCSS(t3, "media");
      return t3;
    }
    function k2(e3) {
      return "/* clean-css ignore:start */" + e3 + "/* clean-css ignore:end */";
    }
    function T2(e3, r3) {
      switch (r3) {
        case "inline":
          return "*{" + e3 + "}";
        case "media":
          return "@media " + e3 + "{a{top:0}}";
        default:
          return e3;
      }
    }
    var L2 = d2("html,head,body,colgroup,tbody"), D2 = d2("html,head,body,li,dt,dd,p,rb,rt,rtc,rp,optgroup,option,colgroup,caption,thead,tbody,tfoot,tr,td,th"), _2 = d2("meta,link,script,style,template,noscript"), B2 = d2("dt,dd"), q2 = d2("address,article,aside,blockquote,details,div,dl,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,hr,main,menu,nav,ol,p,pre,section,table,ul"), P2 = d2("a,audio,del,ins,map,noscript,video"), N2 = d2("rb,rt,rtc,rp"), U2 = d2("rb,rtc,rp"), F2 = d2("option,optgroup"), V2 = d2("tbody,tfoot"), M2 = d2("thead,tbody,tfoot"), I2 = d2("td,th"), j2 = d2("html,head,body"), $2 = d2("html,body"), K2 = d2("head,colgroup,caption"), z2 = d2("dt,thead"), G2 = d2("a,abbr,acronym,address,applet,area,article,aside,audio,b,base,basefont,bdi,bdo,bgsound,big,blink,blockquote,body,br,button,canvas,caption,center,cite,code,col,colgroup,command,content,data,datalist,dd,del,details,dfn,dialog,dir,div,dl,dt,element,em,embed,fieldset,figcaption,figure,font,footer,form,frame,frameset,h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,i,iframe,image,img,input,ins,isindex,kbd,keygen,label,legend,li,link,listing,main,map,mark,marquee,menu,menuitem,meta,meter,multicol,nav,nobr,noembed,noframes,noscript,object,ol,optgroup,option,output,p,param,picture,plaintext,pre,progress,q,rb,rp,rt,rtc,ruby,s,samp,script,section,select,shadow,small,source,spacer,span,strike,strong,style,sub,summary,sup,table,tbody,td,template,textarea,tfoot,th,thead,time,title,tr,track,tt,u,ul,var,video,wbr,xmp");
    var H2 = new RegExp("^(?:class|id|style|title|lang|dir|on(?:focus|blur|change|click|dblclick|mouse(?:down|up|over|move|out)|key(?:press|down|up)))$");
    function Y2(e3, r3) {
      for (var t3 = r3.length - 1; t3 >= 0; t3--) if (r3[t3].name === e3) return true;
      return false;
    }
    function W2(e3) {
      return !/^(?:script|style|pre|textarea)$/.test(e3);
    }
    function Q2(e3) {
      return !/^(?:pre|textarea)$/.test(e3);
    }
    function Z2(e3, r3, t3, o3) {
      var i3 = o3.name(e3.name), a3 = e3.value;
      if (o3.decodeEntities && a3 && (a3 = n2(a3, { isAttributeValue: true })), !(o3.removeRedundantAttributes && function(e4, r4, t4, n3) {
        return t4 = t4 ? c2(t4.toLowerCase()) : "", "script" === e4 && "language" === r4 && "javascript" === t4 || "form" === e4 && "method" === r4 && "get" === t4 || "input" === e4 && "type" === r4 && "text" === t4 || "script" === e4 && "charset" === r4 && !b2(n3, "src") || "a" === e4 && "name" === r4 && b2(n3, "id") || "area" === e4 && "shape" === r4 && "rect" === t4;
      }(t3, i3, a3, r3) || o3.removeScriptTypeAttributes && "script" === t3 && "type" === i3 && E2(a3) || o3.removeStyleLinkTypeAttributes && ("style" === t3 || "link" === t3) && "type" === i3 && A2(a3) || (a3 && (a3 = R2(t3, i3, a3, o3, r3)), o3.removeEmptyAttributes && function(e4, r4, t4, n3) {
        return !(t4 && !/^\s*$/.test(t4)) && ("function" == typeof n3.removeEmptyAttributes ? n3.removeEmptyAttributes(r4, e4) : "input" === e4 && "value" === r4 || H2.test(r4));
      }(t3, i3, a3, o3)))) return o3.decodeEntities && a3 && (a3 = a3.replace(/&(#?[0-9a-zA-Z]+;)/g, "&amp;$1")), { attr: e3, name: i3, value: a3 };
    }
    function J2(e3, r3, t3, n3, o3) {
      var i3, a3, u3 = e3.name, s2 = e3.value, l3 = e3.attr, c3 = l3.quote;
      if (void 0 === s2 || t3.removeAttributeQuotes && !~s2.indexOf(o3) && /^[^ \t\n\f\r"'`=<>]+$/.test(s2)) a3 = !n3 || r3 || /\/$/.test(s2) ? s2 + " " : s2;
      else {
        if (!t3.preventAttributesEscaping) {
          if (void 0 === t3.quoteCharacter) c3 = (s2.match(/'/g) || []).length < (s2.match(/"/g) || []).length ? "'" : '"';
          else c3 = "'" === t3.quoteCharacter ? "'" : '"';
          s2 = '"' === c3 ? s2.replace(/"/g, "&#34;") : s2.replace(/'/g, "&#39;");
        }
        a3 = c3 + s2 + c3, n3 || t3.removeTagWhitespace || (a3 += " ");
      }
      return void 0 === s2 || t3.collapseBooleanAttributes && function(e4, r4) {
        return O2(e4) || "draggable" === e4 && !C2(r4);
      }(u3.toLowerCase(), s2.toLowerCase()) ? (i3 = u3, n3 || (i3 += " ")) : i3 = u3 + l3.customAssign + a3, l3.customOpen + i3 + l3.customClose;
    }
    function X2(e3) {
      return e3;
    }
    function ee2(e3) {
      var r3;
      do {
        r3 = Math.random().toString(36).replace(/^0\.[0-9]*/, "");
      } while (~e3.indexOf(r3));
      return r3;
    }
    var re2 = d2("script,style");
    function te2(e3, r3, i3) {
      r3.collapseWhitespace && (e3 = f2(e3, r3, true, true));
      var u3, s2, l3, d3, h3, b3 = [], y3 = "", A3 = "", O3 = [], C3 = [], x3 = [], S3 = "", R3 = "", H3 = [], ne2 = [];
      e3 = e3.replace(/<!-- htmlmin:ignore -->([\s\S]*?)<!-- htmlmin:ignore -->/g, function(t3, n3) {
        if (!l3) {
          l3 = ee2(e3);
          var o3 = new RegExp("^" + l3 + "([0-9]+)$");
          r3.ignoreCustomComments ? r3.ignoreCustomComments = r3.ignoreCustomComments.slice() : r3.ignoreCustomComments = [], r3.ignoreCustomComments.push(o3);
        }
        var i4 = "<!--" + l3 + H3.length + "-->";
        return H3.push(n3), i4;
      });
      var oe2 = r3.ignoreCustomFragments.map(function(e4) {
        return e4.source;
      });
      if (oe2.length) {
        var ie2 = new RegExp("\\s*(?:" + oe2.join("|") + ")+\\s*", "g");
        e3 = e3.replace(ie2, function(n3) {
          d3 || (d3 = ee2(e3), h3 = new RegExp("(\\s*)" + d3 + "([0-9]+)(\\s*)", "g"), r3.minifyCSS && (r3.minifyCSS = /* @__PURE__ */ function(e4) {
            return function(r4, n4) {
              r4 = r4.replace(h3, function(e5, r5, t3) {
                var n5 = ne2[+t3];
                return n5[1] + d3 + t3 + n5[2];
              });
              var o4 = [];
              return new t2().minify(T2(r4, n4)).warnings.forEach(function(e5) {
                var t3 = h3.exec(e5);
                if (t3) {
                  var n5 = d3 + t3[2];
                  r4 = r4.replace(n5, k2(n5)), o4.push(n5);
                }
              }), r4 = e4(r4, n4), o4.forEach(function(e5) {
                r4 = r4.replace(k2(e5), e5);
              }), r4;
            };
          }(r3.minifyCSS)), r3.minifyJS && (r3.minifyJS = /* @__PURE__ */ function(e4) {
            return function(r4, t3) {
              return e4(r4.replace(h3, function(e5, r5, t4) {
                var n4 = ne2[+t4];
                return n4[1] + d3 + t4 + n4[2];
              }), t3);
            };
          }(r3.minifyJS)));
          var o3 = d3 + ne2.length;
          return ne2.push(/^(\s*)[\s\S]*?(\s*)$/.exec(n3)), "	" + o3 + "	";
        });
      }
      function ae2(e4, t3) {
        return r3.canTrimWhitespace(e4, t3, Q2);
      }
      function ue2() {
        for (var e4 = b3.length - 1; e4 > 0 && !/^<[^/!]/.test(b3[e4]); ) e4--;
        b3.length = Math.max(0, e4);
      }
      function se2() {
        for (var e4 = b3.length - 1; e4 > 0 && !/^<\//.test(b3[e4]); ) e4--;
        b3.length = Math.max(0, e4);
      }
      function le2(e4, t3) {
        for (var n3 = null; e4 >= 0 && ae2(n3); e4--) {
          var o3 = b3[e4], i4 = o3.match(/^<\/([\w:-]+)>$/);
          if (i4) n3 = i4[1];
          else if (/>$/.test(o3) || (b3[e4] = v2(o3, null, t3, r3))) break;
        }
      }
      function ce2(e4) {
        var r4 = b3.length - 1;
        if (b3.length > 1) {
          var t3 = b3[b3.length - 1];
          /^(?:<!|$)/.test(t3) && -1 === t3.indexOf(l3) && r4--;
        }
        le2(r4, e4);
      }
      return (r3.sortAttributes && "function" != typeof r3.sortAttributes || r3.sortClassName && "function" != typeof r3.sortClassName) && function(e4, r4, t3, n3) {
        var i4 = r4.sortAttributes && /* @__PURE__ */ Object.create(null), u4 = r4.sortClassName && new a2();
        function s3(e5) {
          return e5.map(function(e6) {
            return r4.name(e6.name);
          });
        }
        function l4(e5, r5) {
          return !r5 || -1 === e5.indexOf(r5);
        }
        function p3(e5) {
          return l4(e5, t3) && l4(e5, n3);
        }
        var f3 = r4.log;
        if (r4.log = X2, r4.sortAttributes = false, r4.sortClassName = false, function e5(t4) {
          var n4, l5;
          new o2(t4, { start: function(e6, t5) {
            i4 && (i4[e6] || (i4[e6] = new a2()), i4[e6].add(s3(t5).filter(p3)));
            for (var o3 = 0, f4 = t5.length; o3 < f4; o3++) {
              var d5 = t5[o3];
              u4 && d5.value && "class" === r4.name(d5.name) ? u4.add(c2(d5.value).split(/[ \t\n\f\r]+/).filter(p3)) : r4.processScripts && "type" === d5.name.toLowerCase() && (n4 = e6, l5 = d5.value);
            }
          }, end: function() {
            n4 = "";
          }, chars: function(t5) {
            r4.processScripts && re2(n4) && r4.processScripts.indexOf(l5) > -1 && e5(t5);
          } });
        }(te2(e4, r4)), r4.log = f3, i4) {
          var d4 = /* @__PURE__ */ Object.create(null);
          for (var m3 in i4) d4[m3] = i4[m3].createSorter();
          r4.sortAttributes = function(e5, r5) {
            var t4 = d4[e5];
            if (t4) {
              var n4 = /* @__PURE__ */ Object.create(null), o3 = s3(r5);
              o3.forEach(function(e6, t5) {
                (n4[e6] || (n4[e6] = [])).push(r5[t5]);
              }), t4.sort(o3).forEach(function(e6, t5) {
                r5[t5] = n4[e6].shift();
              });
            }
          };
        }
        if (u4) {
          var g3 = u4.createSorter();
          r4.sortClassName = function(e5) {
            return g3.sort(e5.split(/[ \n\f\r]+/)).join(" ");
          };
        }
      }(e3, r3, l3, d3), new o2(e3, { partialMarkup: i3, html5: r3.html5, start: function(e4, t3, n3, o3, i4) {
        "svg" === e4.toLowerCase() && ((r3 = Object.create(r3)).caseSensitive = true, r3.keepClosingSlash = true, r3.name = X2), e4 = r3.name(e4), A3 = e4, u3 = e4, g2(e4) || (y3 = ""), s2 = false, O3 = t3;
        var a3 = r3.removeOptionalTags;
        if (a3) {
          var l4 = G2(e4);
          l4 && function(e5, r4) {
            switch (e5) {
              case "html":
              case "head":
                return true;
              case "body":
                return !_2(r4);
              case "colgroup":
                return "col" === r4;
              case "tbody":
                return "tr" === r4;
            }
            return false;
          }(S3, e4) && ue2(), S3 = "", l4 && function(e5, r4) {
            switch (e5) {
              case "html":
              case "head":
              case "body":
              case "colgroup":
              case "caption":
                return true;
              case "li":
              case "optgroup":
              case "tr":
                return r4 === e5;
              case "dt":
              case "dd":
                return B2(r4);
              case "p":
                return q2(r4);
              case "rb":
              case "rt":
              case "rp":
                return N2(r4);
              case "rtc":
                return U2(r4);
              case "option":
                return F2(r4);
              case "thead":
              case "tbody":
                return V2(r4);
              case "tfoot":
                return "tbody" === r4;
              case "td":
              case "th":
                return I2(r4);
            }
            return false;
          }(R3, e4) && (se2(), a3 = !function(e5, r4) {
            switch (r4) {
              case "colgroup":
                return "colgroup" === e5;
              case "tbody":
                return M2(e5);
            }
            return false;
          }(R3, e4)), R3 = "";
        }
        r3.collapseWhitespace && (C3.length || ce2(e4), n3 || (ae2(e4, t3) && !C3.length || C3.push(e4), function(e5, t4) {
          return r3.canCollapseWhitespace(e5, t4, W2);
        }(e4, t3) && !x3.length || x3.push(e4)));
        var c3 = "<" + e4, p3 = o3 && r3.keepClosingSlash;
        b3.push(c3), r3.sortAttributes && r3.sortAttributes(e4, t3);
        for (var f3 = [], m3 = t3.length, h4 = true; --m3 >= 0; ) {
          var v3 = Z2(t3[m3], t3, e4, r3);
          v3 && (f3.unshift(J2(v3, p3, r3, h4, d3)), h4 = false);
        }
        f3.length > 0 ? (b3.push(" "), b3.push.apply(b3, f3)) : a3 && L2(e4) && (S3 = e4), b3.push(b3.pop() + (p3 ? "/" : "") + ">"), i4 && !r3.includeAutoGeneratedTags && (ue2(), S3 = "");
      }, end: function(e4, t3, n3) {
        "svg" === e4.toLowerCase() && (r3 = Object.getPrototypeOf(r3)), e4 = r3.name(e4), r3.collapseWhitespace && (C3.length ? e4 === C3[C3.length - 1] && C3.pop() : ce2("/" + e4), x3.length && e4 === x3[x3.length - 1] && x3.pop());
        var o3 = false;
        e4 === A3 && (A3 = "", o3 = !s2), r3.removeOptionalTags && (o3 && j2(S3) && ue2(), S3 = "", !G2(e4) || !R3 || z2(R3) || "p" === R3 && P2(e4) || se2(), R3 = D2(e4) ? e4 : ""), r3.removeEmptyElements && o3 && function(e5, r4) {
          switch (e5) {
            case "textarea":
              return false;
            case "audio":
            case "script":
            case "video":
              if (Y2("src", r4)) return false;
              break;
            case "iframe":
              if (Y2("src", r4) || Y2("srcdoc", r4)) return false;
              break;
            case "object":
              if (Y2("data", r4)) return false;
              break;
            case "applet":
              if (Y2("code", r4)) return false;
          }
          return true;
        }(e4, t3) ? (ue2(), S3 = "", R3 = "") : (n3 && !r3.includeAutoGeneratedTags ? R3 = "" : b3.push("</" + e4 + ">"), u3 = "/" + e4, m2(e4) ? o3 && (y3 += "|") : y3 = "");
      }, chars: function(e4, t3, o3) {
        if (t3 = "" === t3 ? "comment" : t3, o3 = "" === o3 ? "comment" : o3, r3.decodeEntities && e4 && !re2(A3) && (e4 = n2(e4)), r3.collapseWhitespace) {
          if (!C3.length) {
            if ("comment" === t3) {
              var i4 = b3[b3.length - 1];
              if (-1 === i4.indexOf(l3) && (i4 || (t3 = u3), b3.length > 1 && (!i4 || !r3.conservativeCollapse && / $/.test(y3)))) {
                var a3 = b3.length - 2;
                b3[a3] = b3[a3].replace(/\s+$/, function(r4) {
                  return e4 = r4 + e4, "";
                });
              }
            }
            if (t3) if ("/nobr" === t3 || "wbr" === t3) {
              if (/^\s/.test(e4)) {
                for (var c3 = b3.length - 1; c3 > 0 && 0 !== b3[c3].lastIndexOf("<" + t3); ) c3--;
                le2(c3 - 1, "br");
              }
            } else g2("/" === t3.charAt(0) ? t3.slice(1) : t3) && (e4 = f2(e4, r3, /(?:^|\s)$/.test(y3)));
            !(e4 = t3 || o3 ? v2(e4, t3, o3, r3) : f2(e4, r3, true, true)) && /\s$/.test(y3) && t3 && "/" === t3.charAt(0) && le2(b3.length - 1, o3);
          }
          x3.length || "html" === o3 || t3 && o3 || (e4 = f2(e4, r3, false, false, true));
        }
        r3.processScripts && re2(A3) && (e4 = function(e5, r4, t4) {
          for (var n3 = 0, o4 = t4.length; n3 < o4; n3++) if ("type" === t4[n3].name.toLowerCase() && r4.processScripts.indexOf(t4[n3].value) > -1) return te2(e5, r4);
          return e5;
        }(e4, r3, O3)), function(e5, r4) {
          if ("script" !== e5) return false;
          for (var t4 = 0, n3 = r4.length; t4 < n3; t4++) if ("type" === r4[t4].name.toLowerCase()) return E2(r4[t4].value);
          return true;
        }(A3, O3) && (e4 = r3.minifyJS(e4)), w2(A3, O3) && (e4 = r3.minifyCSS(e4)), r3.removeOptionalTags && e4 && (("html" === S3 || "body" === S3 && !/^\s/.test(e4)) && ue2(), S3 = "", ($2(R3) || K2(R3) && !/^\s/.test(e4)) && se2(), R3 = ""), u3 = /^\s*$/.test(e4) ? t3 : "comment", r3.decodeEntities && e4 && !re2(A3) && (e4 = e4.replace(/&((?:Iacute|aacute|uacute|plusmn|Otilde|otilde|agrave|Agrave|Yacute|yacute|Oslash|oslash|atilde|Atilde|brvbar|ccedil|Ccedil|Ograve|curren|divide|eacute|Eacute|ograve|Oacute|egrave|Egrave|Ugrave|frac12|frac14|frac34|ugrave|oacute|iacute|Ntilde|ntilde|Uacute|middot|igrave|Igrave|iquest|Aacute|cedil|laquo|micro|iexcl|Icirc|icirc|acirc|Ucirc|Ecirc|ocirc|Ocirc|ecirc|ucirc|Aring|aring|AElig|aelig|acute|pound|raquo|Acirc|times|THORN|szlig|thorn|COPY|auml|ordf|ordm|Uuml|macr|uuml|Auml|ouml|Ouml|para|nbsp|euml|quot|QUOT|Euml|yuml|cent|sect|copy|sup1|sup2|sup3|iuml|Iuml|ETH|shy|reg|not|yen|amp|AMP|REG|uml|eth|deg|gt|GT|LT|lt)(?!;)|(?:#?[0-9a-zA-Z]+;))/g, "&amp$1").replace(/</g, "&lt;")), h3 && r3.collapseWhitespace && C3.length && (e4 = e4.replace(h3, function(e5, r4, t4) {
          return ne2[+t4][0];
        })), y3 += e4, e4 && (s2 = true), b3.push(e4);
      }, comment: function(e4, t3) {
        var n3 = t3 ? "<!" : "<!--", o3 = t3 ? ">" : "-->";
        e4 = function(e5) {
          return /^\[if\s[^\]]+]|\[endif]$/.test(e5);
        }(e4) ? n3 + function(e5, r4) {
          return r4.processConditionalComments ? e5.replace(/^(\[if\s[^\]]+]>)([\s\S]*?)(<!\[endif])$/, function(e6, t4, n4, o4) {
            return t4 + te2(n4, r4, true) + o4;
          }) : e5;
        }(e4, r3) + o3 : r3.removeComments ? function(e5, r4) {
          for (var t4 = 0, n4 = r4.ignoreCustomComments.length; t4 < n4; t4++) if (r4.ignoreCustomComments[t4].test(e5)) return true;
          return false;
        }(e4, r3) ? "<!--" + e4 + "-->" : "" : n3 + e4 + o3, r3.removeOptionalTags && e4 && (S3 = "", R3 = ""), b3.push(e4);
      }, doctype: function(e4) {
        b3.push(r3.useShortDoctype ? "<!doctype" + (r3.removeTagWhitespace ? "" : " ") + "html>" : p2(e4));
      }, customAttrAssign: r3.customAttrAssign, customAttrSurround: r3.customAttrSurround }), r3.removeOptionalTags && (j2(S3) && ue2(), R3 && !z2(R3) && se2()), r3.collapseWhitespace && ce2("br"), function(e4, r4, t3, n3) {
        var o3, i4 = r4.maxLineLength;
        if (i4) {
          for (var a3 = "", u4 = []; e4.length; ) {
            var s3 = a3.length, l4 = e4[0].indexOf("\n");
            l4 < 0 ? a3 += n3(t3(e4.shift())) : (a3 += n3(t3(e4[0].slice(0, l4))), e4[0] = e4[0].slice(l4 + 1)), s3 > 0 && a3.length > i4 ? (u4.push(a3.slice(0, s3)), a3 = a3.slice(s3)) : l4 >= 0 && (u4.push(a3), a3 = "");
          }
          a3 && u4.push(a3), o3 = u4.join("\n");
        } else o3 = n3(t3(e4.join("")));
        return r4.collapseWhitespace ? f2(o3, r4, true, true) : o3;
      }(b3, r3, h3 ? function(e4) {
        return e4.replace(h3, function(e5, t3, n3, o3) {
          var i4 = ne2[+n3][0];
          return r3.collapseWhitespace ? ("	" !== t3 && (i4 = t3 + i4), "	" !== o3 && (i4 += o3), f2(i4, { preserveLineBreaks: r3.preserveLineBreaks, conservativeCollapse: !r3.trimCustomFragments }, /^[ \n\r\t\f]/.test(i4), /[ \n\r\t\f]$/.test(i4))) : i4;
        });
      } : X2, l3 ? function(e4) {
        return e4.replace(new RegExp("<!--" + l3 + "([0-9]+)-->", "g"), function(e5, r4) {
          return H3[+r4];
        });
      } : X2);
    }
    return Ot.minify = function(e3, r3) {
      var n3 = Date.now();
      r3 = function(e4) {
        var r4 = { name: function(e5) {
          return e5.toLowerCase();
        }, canCollapseWhitespace: W2, canTrimWhitespace: Q2, html5: true, ignoreCustomComments: [/^!/], ignoreCustomFragments: [/<%[\s\S]*?%>/, /<\?[\s\S]*?\?>/], includeAutoGeneratedTags: true, log: X2, minifyCSS: X2, minifyJS: X2, minifyURLs: X2 };
        return Object.keys(e4).forEach(function(n4) {
          var o4 = e4[n4];
          if ("caseSensitive" === n4) o4 && (r4.name = X2);
          else if ("log" === n4) "function" == typeof o4 && (r4.log = o4);
          else if ("minifyCSS" === n4 && "function" != typeof o4) {
            if (!o4) return;
            "object" != typeof o4 && (o4 = {}), r4.minifyCSS = function(e5, n5) {
              e5 = e5.replace(/(url\s*\(\s*)("|'|)(.*?)\2(\s*\))/gi, function(e6, t3, n6, o5, i4) {
                return t3 + n6 + r4.minifyURLs(o5) + n6 + i4;
              });
              var i3 = new t2(o4).minify(T2(e5, n5));
              return i3.errors.length > 0 ? (i3.errors.forEach(r4.log), e5) : function(e6, r5) {
                var t3;
                switch (r5) {
                  case "inline":
                    t3 = e6.match(/^\*\{([\s\S]*)\}$/);
                    break;
                  case "media":
                    t3 = e6.match(/^@media ([\s\S]*?)\s*{[\s\S]*}$/);
                }
                return t3 ? t3[1] : e6;
              }(i3.styles, n5);
            };
          } else if ("minifyJS" === n4 && "function" != typeof o4) {
            if (!o4) return;
            "object" != typeof o4 && (o4 = {}), (o4.parse || (o4.parse = {})).bare_returns = false, r4.minifyJS = function(e5, t3) {
              var n5 = e5.match(/^\s*<!--.*/), i3 = n5 ? e5.slice(n5[0].length).replace(/\n\s*-->\s*$/, "") : e5;
              o4.parse.bare_returns = t3;
              var a3 = u2.minify(i3, o4);
              return a3.error ? (r4.log(a3.error), e5) : a3.code.replace(/;$/, "");
            };
          } else if ("minifyURLs" === n4 && "function" != typeof o4) {
            if (!o4) return;
            "string" == typeof o4 ? o4 = { site: o4 } : "object" != typeof o4 && (o4 = {}), r4.minifyURLs = function(e5) {
              try {
                return i2.relate(e5, o4);
              } catch (t3) {
                return r4.log(t3), e5;
              }
            };
          } else r4[n4] = o4;
        }), r4;
      }(r3 || {});
      var o3 = te2(e3, r3);
      return r3.log("minified in: " + (Date.now() - n3) + "ms"), o3;
    }, Ot;
  }
  function Ea() {
    if (aa) return ia;
    aa = 1;
    const r2 = U(), t2 = F(), n2 = w ? A : (w = 1, A = (e2, r3, t3, n3) => wa()(n3 = n3.$extend({ filename: n3.resolveFilename(e2, n3), bail: true, source: null }))(r3, t3)), o2 = C ? O : (C = 1, O = (e2) => {
      console.error(e2.name, e2.message);
    }), a2 = S ? x : (S = 1, x = { __data: /* @__PURE__ */ Object.create(null), set: function(e2, r3) {
      this.__data[e2] = r3;
    }, get: function(e2) {
      return this.__data[e2];
    }, reset: function() {
      this.__data = {};
    } }), u2 = function() {
      if (k) return R;
      k = 1;
      const r3 = "undefined" == typeof window;
      return R = (t3) => {
        if (r3) return e.readFileSync(t3, "utf8");
        {
          const e2 = document.getElementById(t3);
          return e2.value || e2.innerHTML;
        }
      };
    }(), s2 = function() {
      if (L) return T;
      L = 1;
      const e2 = { test: /{{([@#]?)[ \t]*(\/?)([\w\W]*?)[ \t]*}}/, use: function(r3, t3, n3, o3) {
        const i2 = this.options, a3 = this.getEsTokens(o3), u3 = a3.map((e3) => e3.value), s3 = {};
        let l3, c3 = !!t3 && "raw", p3 = n3 + u3.shift();
        const f3 = (e3, t4) => {
          console.warn(`${i2.filename || "anonymous"}:${r3.line + 1}:${r3.start + 1}
Template upgrade: {{${e3}}} -> {{${t4}}}`);
        };
        switch ("#" === t3 && f3("#value", "@value"), p3) {
          case "set":
            o3 = `var ${u3.join("").trim()}`;
            break;
          case "if":
            o3 = `if(${u3.join("").trim()}){`;
            break;
          case "else":
            const r4 = u3.indexOf("if");
            ~r4 ? (u3.splice(0, r4 + 1), o3 = `}else if(${u3.join("").trim()}){`) : o3 = "}else{";
            break;
          case "/if":
            o3 = "}";
            break;
          case "each":
            l3 = e2._split(a3), l3.shift(), "as" === l3[1] && (f3("each object as value index", "each object value index"), l3.splice(1, 1)), o3 = `$each(${l3[0] || "$data"},function(${l3[1] || "$value"},${l3[2] || "$index"}){`;
            break;
          case "/each":
            o3 = "})";
            break;
          case "block":
            l3 = e2._split(a3), l3.shift(), o3 = `block(${l3.join(",").trim()},function(){`;
            break;
          case "/block":
            o3 = "})";
            break;
          case "echo":
            p3 = "print", f3("echo value", "value");
          case "print":
          case "include":
          case "extend":
            if (0 !== u3.join("").trim().indexOf("(")) {
              l3 = e2._split(a3), l3.shift(), o3 = `${p3}(${l3.join(",")})`;
              break;
            }
          default:
            if (~u3.indexOf("|")) {
              const r5 = ":", t4 = a3.reduce((e3, t5) => {
                const { value: n4, type: o4 } = t5;
                return "|" === n4 ? e3.push([]) : "whitespace" !== o4 && "comment" !== o4 && (e3.length || e3.push([]), n4 === r5 && 1 === e3[e3.length - 1].length ? f3("value | filter: argv", "value | filter argv") : e3[e3.length - 1].push(t5)), e3;
              }, []).map((r6) => e2._split(r6));
              o3 = t4.reduce((e3, r6) => {
                const t5 = r6.shift();
                return r6.unshift(e3), `$imports.${t5}(${r6.join(",")})`;
              }, t4.shift().join(" ").trim());
            }
            c3 = c3 || "escape";
        }
        return s3.code = o3, s3.output = c3, s3;
      }, _split: (e3) => {
        let r3 = 0, t3 = (e3 = e3.filter(({ type: e4 }) => "whitespace" !== e4 && "comment" !== e4)).shift();
        const n3 = "punctuator", o3 = /\]|\)/, i2 = [[t3]];
        for (; r3 < e3.length; ) {
          const a3 = e3[r3];
          a3.type === n3 || t3.type === n3 && !o3.test(t3.value) ? i2[i2.length - 1].push(a3) : i2.push([a3]), t3 = a3, r3++;
        }
        return i2.map((e4) => e4.map((e5) => e5.value).join(""));
      } };
      return T = e2;
    }(), l2 = _ ? D : (_ = 1, D = { test: /<%(#?)((?:==|=#|[=-])?)[ \t]*([\w\W]*?)[ \t]*(-?)%>/, use: (e2, r3, t3, n3) => (t3 = { "-": "raw", "=": "escape", "": false, "==": "raw", "=#": "raw" }[t3], r3 && (n3 = `/*${n3}*/`, t3 = false), { code: n3, output: t3 }) }), c2 = function() {
      if (ta) return ra;
      ta = 1;
      const e2 = "undefined" == typeof window;
      return ra = (r3, t3) => {
        if (e2) {
          const e3 = ya().minify, n3 = t3.htmlMinifierOptions, o3 = t3.rules.map((e4) => e4.test);
          n3.ignoreCustomFragments.push(...o3), r3 = e3(r3, n3);
        }
        return r3;
      };
    }(), p2 = function() {
      if (oa) return na;
      oa = 1;
      const e2 = "undefined" == typeof window, r3 = /^\.+\//;
      return na = (t3, n3) => {
        if (e2) {
          const e3 = i, o3 = n3.root, a3 = n3.extname;
          if (r3.test(t3)) {
            const r4 = n3.filename, i2 = r4 && t3 !== r4 ? e3.dirname(r4) : o3;
            t3 = e3.resolve(i2, t3);
          } else t3 = e3.resolve(o3, t3);
          e3.extname(t3) || (t3 += a3);
        }
        return t3;
      };
    }(), f2 = { source: null, filename: null, rules: [l2, s2], escape: true, debug: !!("undefined" == typeof window) && "production" !== process.env.NODE_ENV, bail: true, cache: true, minimize: true, compileDebug: false, resolveFilename: p2, include: n2, htmlMinifier: c2, htmlMinifierOptions: { collapseWhitespace: true, minifyCSS: true, minifyJS: true, ignoreCustomFragments: [] }, onerror: o2, loader: u2, caches: a2, root: "/", extname: ".art", ignore: [], imports: r2 };
    function d2() {
      this.$extend = function(e2) {
        return t2(e2 = e2 || {}, e2 instanceof d2 ? e2 : this);
      };
    }
    return d2.prototype = f2, ia = new d2();
  }
  function Aa() {
    if (sa) return ua;
    sa = 1;
    class e2 extends Error {
      constructor(e3) {
        super(e3.message), this.name = "TemplateError", this.message = function({ name: e4, source: r2, path: t2, line: n2, column: o2, generated: i2, message: a2 }) {
          if (!r2) return a2;
          const u2 = r2.split(/\n/), s2 = Math.max(n2 - 3, 0), l2 = Math.min(u2.length, n2 + 3), c2 = u2.slice(s2, l2).map((e5, r3) => {
            const t3 = r3 + s2 + 1;
            return `${t3 === n2 ? " >> " : "    "}${t3}| ${e5}`;
          }).join("\n");
          return `${t2 || "anonymous"}:${n2}:${o2}
${c2}

${e4}: ${a2}` + (i2 ? `
   generated: ${i2}` : "");
        }(e3), Error.captureStackTrace && Error.captureStackTrace(this, this.constructor);
      }
    }
    return ua = e2;
  }
  function wa() {
    if (ca) return la;
    ca = 1;
    const e2 = N(), r2 = Ea(), t2 = Aa(), n2 = (e3, r3) => {
      r3.onerror(e3, r3);
      const t3 = () => "{Template Error}";
      return t3.mappings = [], t3.sourcesContent = [], t3;
    }, o2 = (i2, a2 = {}) => {
      "string" != typeof i2 ? a2 = i2 : a2.source = i2, i2 = (a2 = r2.$extend(a2)).source, true === a2.debug && (a2.cache = false, a2.minimize = false, a2.compileDebug = true), a2.compileDebug && (a2.minimize = false), a2.filename && (a2.filename = a2.resolveFilename(a2.filename, a2));
      const u2 = a2.filename, s2 = a2.cache, l2 = a2.caches;
      if (s2 && u2) {
        const e3 = l2.get(u2);
        if (e3) return e3;
      }
      if (!i2) try {
        i2 = a2.loader(u2, a2), a2.source = i2;
      } catch (d2) {
        const e3 = new t2({ name: "CompileError", path: u2, message: `template not found: ${d2.message}`, stack: d2.stack });
        if (a2.bail) throw e3;
        return n2(e3, a2);
      }
      let c2;
      const p2 = new e2(a2);
      try {
        c2 = p2.build();
      } catch (m2) {
        if (m2 = new t2(m2), a2.bail) throw m2;
        return n2(m2, a2);
      }
      const f2 = (e3, r3) => {
        try {
          return c2(e3, r3);
        } catch (m2) {
          if (!a2.compileDebug) return a2.cache = false, a2.compileDebug = true, o2(a2)(e3, r3);
          if (m2 = new t2(m2), a2.bail) throw m2;
          return n2(m2, a2)();
        }
      };
      return f2.mappings = c2.mappings, f2.sourcesContent = c2.sourcesContent, f2.toString = () => c2.toString(), s2 && u2 && l2.set(u2, f2), f2;
    };
    return o2.Compiler = e2, la = o2;
  }
  const Oa = l(function() {
    if (ha) return ga;
    ha = 1;
    const e2 = function() {
      if (fa) return pa;
      fa = 1;
      const e3 = wa();
      return pa = (r3, t3, n3) => e3(r3, n3)(t3);
    }(), r2 = wa(), t2 = ma ? da : (ma = 1, da = Ea()), n2 = (t3, n3) => n3 instanceof Object ? e2({ filename: t3 }, n3) : r2({ filename: t3, source: n3 });
    return n2.render = e2, n2.compile = r2, n2.defaults = t2, ga = n2;
  }());
  cjs = Oa;
  return cjs;
}
var cjsExports = requireCjs();
const index = /* @__PURE__ */ getDefaultExportFromCjs(cjsExports);
const videoStreamRouter = (req, res) => {
  const filename = req.params.filename;
  const videoPath = Common.validateVideoRequest(filename, res);
  if (!videoPath) {
    return;
  }
  try {
    const stats = fs$1.statSync(videoPath);
    const fileSize = stats.size;
    const range = req.headers.range;
    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      if (start >= fileSize || end >= fileSize || start > end) {
        res.status(416).send("Requested range not satisfiable");
        return;
      }
      const chunksize = end - start + 1;
      const file = fs$1.createReadStream(videoPath, { start, end });
      const head = {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type": "video/mp4"
      };
      res.writeHead(206, head);
      file.pipe(res);
      file.on("error", (err) => {
        logger$1.error(`读取视频文件流时出错 (Range: ${start}-${end}): ${err.message}`);
        if (!res.writableEnded) {
          res.end();
        }
      });
    } else {
      const head = {
        "Content-Length": fileSize,
        "Content-Type": "video/mp4",
        "Accept-Ranges": "bytes"
        // 仍然告知客户端支持 Range 请求
      };
      res.writeHead(200, head);
      const file = fs$1.createReadStream(videoPath);
      file.pipe(res);
      file.on("error", (err) => {
        logger$1.error(`读取视频文件流时出错 (Full): ${err.message}`);
        if (!res.headersSent) {
          try {
            createNotFoundResponse(res, "读取视频文件时出错");
          } catch (e) {
            logger$1.error("发送读取错误响应失败:", e);
            if (!res.writableEnded) {
              res.end();
            }
          }
        } else if (!res.writableEnded) {
          res.end();
        }
      });
    }
  } catch (error) {
    if (error.code === "ENOENT") {
      if (!res.headersSent) createNotFoundResponse(res, "视频文件未找到");
      else if (!res.writableEnded) res.end();
    } else {
      logger$1.error(`处理视频数据请求时发生错误: ${error.message}`);
      if (!res.headersSent) {
        createNotFoundResponse(res, "服务器内部错误");
      } else if (!res.writableEnded) {
        res.end();
      }
    }
  }
};
const getVideoRouter = (req, res) => {
  const filename = req.params.filename;
  const videoPath = Common.validateVideoRequest(filename, res);
  if (!videoPath) {
    return;
  }
  const videoDataUrl = `/api/kkk/stream/${encodeURIComponent(filename)}`;
  const resPath = path.join(Version.pluginPath, "/resources") + "/".replace(/\\/g, "/");
  const htmlContent = index(path.join(resPath, "template", "videoView", "index.html"), {
    videoDataUrl,
    filename
  });
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.send(htmlContent);
};
const server = express();
const proxyOptions = {
  target: "https://developer.huawei.com",
  changeOrigin: true
};
server.use(libExports());
server.use("/", distExports.createProxyMiddleware(proxyOptions));
server.listen(3780);
if (Config.app.APIServer && Config.app.APIServerMount) {
  app.use(logMiddleware(["/api/bilibili", "/api/douyin", "/api/kuaishou"]));
  app.use("/api/bilibili", registerBilibiliRoutes(Config.cookies.bilibili));
  app.use("/api/douyin", registerDouyinRoutes(Config.cookies.douyin));
  app.use("/api/kuaishou", registerKuaishouRoutes(Config.cookies.kuaishou));
  logger$2.mark(`Amagi server listening on ${logger$2.green("http://localhost:")}${logger$2.green(process.env.HTTP_PORT)} API docs: ${logger$2.yellow("https://amagi.apifox.cn")}`);
} else if (Config.app.APIServer) {
  const amagiServer = new Client({
    bilibili: Config.cookies.bilibili,
    douyin: Config.cookies.douyin,
    kuaishou: Config.cookies.kuaishou
  });
  amagiServer.startClient(Config.app.APIServerPort);
}
app.get("/api/kkk/stream/:filename", videoStreamRouter);
app.get("/api/kkk/video/:filename", getVideoRouter);
const base = `${karinPathBase}/${Version.pluginName}`;
mkdirSync(`${base}/data`);
mkdirSync(Common.tempDri.images);
mkdirSync(Common.tempDri.video);
logger$1.info(`${logger$1.green(`[插件:${Version.pluginName}]`)} ${logger$1.violet(`v${Version.pluginVersion}`)} 初始化完成~`);
