import { require_follow_redirects, require_src, Config, logMiddleware, registerBilibiliRoutes, registerDouyinRoutes, registerKuaishouRoutes, logger, index_default, Version, Common } from './chunk-WBILSWM2.js';
import { __commonJS, init_esm_shims, __require, __toESM } from './chunk-VVJSJS3A.js';
import { app, mkdirSync, logger as logger$1 } from 'node-karin';
import express from 'node-karin/express';
import { karinPathBase } from 'node-karin/root';

// node_modules/.pnpm/object-assign@4.1.1/node_modules/object-assign/index.js
var require_object_assign = __commonJS({
  "node_modules/.pnpm/object-assign@4.1.1/node_modules/object-assign/index.js"(exports, module) {
    init_esm_shims();
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
    module.exports = shouldUseNative() ? Object.assign : function(target, source) {
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
  }
});

// node_modules/.pnpm/vary@1.1.2/node_modules/vary/index.js
var require_vary = __commonJS({
  "node_modules/.pnpm/vary@1.1.2/node_modules/vary/index.js"(exports, module) {
    init_esm_shims();
    module.exports = vary;
    module.exports.append = append;
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
    function vary(res, field) {
      if (!res || !res.getHeader || !res.setHeader) {
        throw new TypeError("res argument is required");
      }
      var val = res.getHeader("Vary") || "";
      var header = Array.isArray(val) ? val.join(", ") : String(val);
      if (val = append(header, field)) {
        res.setHeader("Vary", val);
      }
    }
  }
});

// node_modules/.pnpm/cors@2.8.5/node_modules/cors/lib/index.js
var require_lib = __commonJS({
  "node_modules/.pnpm/cors@2.8.5/node_modules/cors/lib/index.js"(exports, module) {
    init_esm_shims();
    (function() {
      var assign = require_object_assign();
      var vary = require_vary();
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
              vary(res, header.value);
            } else if (header.value) {
              res.setHeader(header.key, header.value);
            }
          }
        }
      }
      function cors2(options, req, res, next) {
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
                    cors2(corsOptions, req, res, next);
                  }
                });
              } else {
                next();
              }
            }
          });
        };
      }
      module.exports = middlewareWrapper;
    })();
  }
});

// node_modules/.pnpm/eventemitter3@4.0.7/node_modules/eventemitter3/index.js
var require_eventemitter3 = __commonJS({
  "node_modules/.pnpm/eventemitter3@4.0.7/node_modules/eventemitter3/index.js"(exports, module) {
    init_esm_shims();
    var has = Object.prototype.hasOwnProperty;
    var prefix = "~";
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
      var evt = prefix ? prefix + event : event, handlers = this._events[evt];
      if (!handlers) return [];
      if (handlers.fn) return [handlers.fn];
      for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
        ee[i] = handlers[i].fn;
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
    if ("undefined" !== typeof module) {
      module.exports = EventEmitter;
    }
  }
});

// node_modules/.pnpm/requires-port@1.0.0/node_modules/requires-port/index.js
var require_requires_port = __commonJS({
  "node_modules/.pnpm/requires-port@1.0.0/node_modules/requires-port/index.js"(exports, module) {
    init_esm_shims();
    module.exports = function required(port, protocol) {
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
  }
});

// node_modules/.pnpm/http-proxy@1.18.1_debug@4.4.0/node_modules/http-proxy/lib/http-proxy/common.js
var require_common = __commonJS({
  "node_modules/.pnpm/http-proxy@1.18.1_debug@4.4.0/node_modules/http-proxy/lib/http-proxy/common.js"(exports) {
    init_esm_shims();
    var common = exports;
    var url = __require("url");
    var extend = __require("util")._extend;
    var required = require_requires_port();
    var upgradeHeader = /(^|,)\s*upgrade\s*($|,)/i;
    var isSSL = /^https|wss/;
    common.isSSL = isSSL;
    common.setupOutgoing = function(outgoing, options, req, forward) {
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
      outgoing.path = common.urlJoin(targetPath, outgoingPath);
      if (options.changeOrigin) {
        outgoing.headers.host = required(outgoing.port, options[forward || "target"].protocol) && !hasPort(outgoing.host) ? outgoing.host + ":" + outgoing.port : outgoing.host;
      }
      return outgoing;
    };
    common.setupSocket = function(socket) {
      socket.setTimeout(0);
      socket.setNoDelay(true);
      socket.setKeepAlive(true, 0);
      return socket;
    };
    common.getPort = function(req) {
      var res = req.headers.host ? req.headers.host.match(/:(\d+)/) : "";
      return res ? res[1] : common.hasEncryptedConnection(req) ? "443" : "80";
    };
    common.hasEncryptedConnection = function(req) {
      return Boolean(req.connection.encrypted || req.connection.pair);
    };
    common.urlJoin = function() {
      var args = Array.prototype.slice.call(arguments), lastIndex = args.length - 1, last = args[lastIndex], lastSegs = last.split("?"), retSegs;
      args[lastIndex] = lastSegs.shift();
      retSegs = [
        args.filter(Boolean).join("/").replace(/\/+/g, "/").replace("http:/", "http://").replace("https:/", "https://")
      ];
      retSegs.push.apply(retSegs, lastSegs);
      return retSegs.join("?");
    };
    common.rewriteCookieProperty = function rewriteCookieProperty(header, config, property) {
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
  }
});

// node_modules/.pnpm/http-proxy@1.18.1_debug@4.4.0/node_modules/http-proxy/lib/http-proxy/passes/web-outgoing.js
var require_web_outgoing = __commonJS({
  "node_modules/.pnpm/http-proxy@1.18.1_debug@4.4.0/node_modules/http-proxy/lib/http-proxy/passes/web-outgoing.js"(exports, module) {
    init_esm_shims();
    var url = __require("url");
    var common = require_common();
    var redirectRegex = /^201|30(1|2|7|8)$/;
    module.exports = {
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
            header = common.rewriteCookieProperty(header, rewriteCookieDomainConfig, "domain");
          }
          if (rewriteCookiePathConfig && key2.toLowerCase() === "set-cookie") {
            header = common.rewriteCookieProperty(header, rewriteCookiePathConfig, "path");
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
  }
});

// node_modules/.pnpm/http-proxy@1.18.1_debug@4.4.0/node_modules/http-proxy/lib/http-proxy/passes/web-incoming.js
var require_web_incoming = __commonJS({
  "node_modules/.pnpm/http-proxy@1.18.1_debug@4.4.0/node_modules/http-proxy/lib/http-proxy/passes/web-incoming.js"(exports, module) {
    init_esm_shims();
    var httpNative = __require("http");
    var httpsNative = __require("https");
    var web_o = require_web_outgoing();
    var common = require_common();
    var followRedirects = require_follow_redirects();
    web_o = Object.keys(web_o).map(function(pass) {
      return web_o[pass];
    });
    var nativeAgents = { http: httpNative, https: httpsNative };
    module.exports = {
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
        var encrypted = req.isSpdy || common.hasEncryptedConnection(req);
        var values = {
          for: req.connection.remoteAddress || req.socket.remoteAddress,
          port: common.getPort(req),
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
      stream: function stream(req, res, options, _, server2, clb) {
        server2.emit("start", req, res, options.target || options.forward);
        var agents = options.followRedirects ? followRedirects : nativeAgents;
        var http = agents.http;
        var https = agents.https;
        if (options.forward) {
          var forwardReq = (options.forward.protocol === "https:" ? https : http).request(
            common.setupOutgoing(options.ssl || {}, options, req, "forward")
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
          common.setupOutgoing(options.ssl || {}, options, req)
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
  }
});

// node_modules/.pnpm/http-proxy@1.18.1_debug@4.4.0/node_modules/http-proxy/lib/http-proxy/passes/ws-incoming.js
var require_ws_incoming = __commonJS({
  "node_modules/.pnpm/http-proxy@1.18.1_debug@4.4.0/node_modules/http-proxy/lib/http-proxy/passes/ws-incoming.js"(exports, module) {
    init_esm_shims();
    var http = __require("http");
    var https = __require("https");
    var common = require_common();
    module.exports = {
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
          port: common.getPort(req),
          proto: common.hasEncryptedConnection(req) ? "wss" : "ws"
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
      stream: function stream(req, socket, options, head, server2, clb) {
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
        common.setupSocket(socket);
        if (head && head.length) socket.unshift(head);
        var proxyReq = (common.isSSL.test(options.target.protocol) ? https : http).request(
          common.setupOutgoing(options.ssl || {}, options, req)
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
          common.setupSocket(proxySocket);
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
  }
});

// node_modules/.pnpm/http-proxy@1.18.1_debug@4.4.0/node_modules/http-proxy/lib/http-proxy/index.js
var require_http_proxy = __commonJS({
  "node_modules/.pnpm/http-proxy@1.18.1_debug@4.4.0/node_modules/http-proxy/lib/http-proxy/index.js"(exports, module) {
    init_esm_shims();
    var httpProxy = module.exports;
    var extend = __require("util")._extend;
    var parse_url = __require("url").parse;
    var EE3 = require_eventemitter3();
    var http = __require("http");
    var https = __require("https");
    var web = require_web_incoming();
    var ws = require_ws_incoming();
    httpProxy.Server = ProxyServer;
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
    httpProxy.createRightProxy = createRightProxy;
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
    __require("util").inherits(ProxyServer, EE3);
    ProxyServer.prototype.onError = function(err) {
      if (this.listeners("error").length === 1) {
        throw err;
      }
    };
    ProxyServer.prototype.listen = function(port, hostname) {
      var self = this, closure = function(req, res) {
        self.web(req, res);
      };
      this._server = this.options.ssl ? https.createServer(this.options.ssl, closure) : http.createServer(closure);
      if (this.options.ws) {
        this._server.on("upgrade", function(req, socket, head) {
          self.ws(req, socket, head);
        });
      }
      this._server.listen(port, hostname);
      return this;
    };
    ProxyServer.prototype.close = function(callback) {
      var self = this;
      if (this._server) {
        this._server.close(done);
      }
      function done() {
        self._server = null;
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
  }
});

// node_modules/.pnpm/http-proxy@1.18.1_debug@4.4.0/node_modules/http-proxy/lib/http-proxy.js
var require_http_proxy2 = __commonJS({
  "node_modules/.pnpm/http-proxy@1.18.1_debug@4.4.0/node_modules/http-proxy/lib/http-proxy.js"(exports, module) {
    init_esm_shims();
    var ProxyServer = require_http_proxy().Server;
    function createProxyServer(options) {
      return new ProxyServer(options);
    }
    ProxyServer.createProxyServer = createProxyServer;
    ProxyServer.createServer = createProxyServer;
    ProxyServer.createProxy = createProxyServer;
    module.exports = ProxyServer;
  }
});

// node_modules/.pnpm/http-proxy@1.18.1_debug@4.4.0/node_modules/http-proxy/index.js
var require_http_proxy3 = __commonJS({
  "node_modules/.pnpm/http-proxy@1.18.1_debug@4.4.0/node_modules/http-proxy/index.js"(exports, module) {
    init_esm_shims();
    module.exports = require_http_proxy2();
  }
});

// node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/errors.js
var require_errors = __commonJS({
  "node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/errors.js"(exports) {
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ERRORS = void 0;
    var ERRORS;
    (function(ERRORS2) {
      ERRORS2["ERR_CONFIG_FACTORY_TARGET_MISSING"] = '[HPM] Missing "target" option. Example: {target: "http://www.example.org"}';
      ERRORS2["ERR_CONTEXT_MATCHER_GENERIC"] = '[HPM] Invalid pathFilter. Expecting something like: "/api" or ["/api", "/ajax"]';
      ERRORS2["ERR_CONTEXT_MATCHER_INVALID_ARRAY"] = '[HPM] Invalid pathFilter. Plain paths (e.g. "/api") can not be mixed with globs (e.g. "/api/**"). Expecting something like: ["/api", "/ajax"] or ["/api/**", "!**.html"].';
      ERRORS2["ERR_PATH_REWRITER_CONFIG"] = "[HPM] Invalid pathRewrite config. Expecting object with pathRewrite config or a rewrite function";
    })(ERRORS || (exports.ERRORS = ERRORS = {}));
  }
});

// node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/configuration.js
var require_configuration = __commonJS({
  "node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/configuration.js"(exports) {
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.verifyConfig = verifyConfig;
    var errors_1 = require_errors();
    function verifyConfig(options) {
      if (!options.target && !options.router) {
        throw new Error(errors_1.ERRORS.ERR_CONFIG_FACTORY_TARGET_MISSING);
      }
    }
  }
});

// node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/debug.js
var require_debug = __commonJS({
  "node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/debug.js"(exports) {
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Debug = void 0;
    var createDebug = require_src();
    exports.Debug = createDebug("http-proxy-middleware");
  }
});

// node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/plugins/default/debug-proxy-errors-plugin.js
var require_debug_proxy_errors_plugin = __commonJS({
  "node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/plugins/default/debug-proxy-errors-plugin.js"(exports) {
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.debugProxyErrorsPlugin = void 0;
    var debug_1 = require_debug();
    var debug = debug_1.Debug.extend("debug-proxy-errors-plugin");
    var debugProxyErrorsPlugin = (proxyServer) => {
      proxyServer.on("error", (error, req, res, target) => {
        debug(`http-proxy error event: 
%O`, error);
      });
      proxyServer.on("proxyReq", (proxyReq, req, socket) => {
        socket.on("error", (error) => {
          debug("Socket error in proxyReq event: \n%O", error);
        });
      });
      proxyServer.on("proxyRes", (proxyRes, req, res) => {
        res.on("close", () => {
          if (!res.writableEnded) {
            debug("Destroying proxyRes in proxyRes close event");
            proxyRes.destroy();
          }
        });
      });
      proxyServer.on("proxyReqWs", (proxyReq, req, socket) => {
        socket.on("error", (error) => {
          debug("Socket error in proxyReqWs event: \n%O", error);
        });
      });
      proxyServer.on("open", (proxySocket) => {
        proxySocket.on("error", (error) => {
          debug("Socket error in open event: \n%O", error);
        });
      });
      proxyServer.on("close", (req, socket, head) => {
        socket.on("error", (error) => {
          debug("Socket error in close event: \n%O", error);
        });
      });
      proxyServer.on("econnreset", (error, req, res, target) => {
        debug(`http-proxy econnreset event: 
%O`, error);
      });
    };
    exports.debugProxyErrorsPlugin = debugProxyErrorsPlugin;
  }
});

// node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/status-code.js
var require_status_code = __commonJS({
  "node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/status-code.js"(exports) {
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getStatusCode = getStatusCode;
    function getStatusCode(errorCode) {
      let statusCode;
      if (/HPE_INVALID/.test(errorCode)) {
        statusCode = 502;
      } else {
        switch (errorCode) {
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
      }
      return statusCode;
    }
  }
});

// node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/plugins/default/error-response-plugin.js
var require_error_response_plugin = __commonJS({
  "node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/plugins/default/error-response-plugin.js"(exports) {
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.errorResponsePlugin = void 0;
    var status_code_1 = require_status_code();
    function isResponseLike(obj) {
      return obj && typeof obj.writeHead === "function";
    }
    function isSocketLike(obj) {
      return obj && typeof obj.write === "function" && !("writeHead" in obj);
    }
    var errorResponsePlugin = (proxyServer, options) => {
      proxyServer.on("error", (err, req, res, target) => {
        if (!req && !res) {
          throw err;
        }
        if (isResponseLike(res)) {
          if (!res.headersSent) {
            const statusCode = (0, status_code_1.getStatusCode)(err.code);
            res.writeHead(statusCode);
          }
          const host = req.headers && req.headers.host;
          res.end(`Error occurred while trying to proxy: ${host}${req.url}`);
        } else if (isSocketLike(res)) {
          res.destroy();
        }
      });
    };
    exports.errorResponsePlugin = errorResponsePlugin;
  }
});

// node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/logger.js
var require_logger = __commonJS({
  "node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/logger.js"(exports) {
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getLogger = getLogger;
    var noopLogger = {
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
  }
});

// node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/utils/logger-plugin.js
var require_logger_plugin = __commonJS({
  "node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/utils/logger-plugin.js"(exports) {
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getPort = getPort;
    function getPort(sockets) {
      return Object.keys(sockets || {})?.[0]?.split(":")[1];
    }
  }
});

// node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/plugins/default/logger-plugin.js
var require_logger_plugin2 = __commonJS({
  "node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/plugins/default/logger-plugin.js"(exports) {
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.loggerPlugin = void 0;
    var url_1 = __require("url");
    var logger_1 = require_logger();
    var logger_plugin_1 = require_logger_plugin();
    var loggerPlugin = (proxyServer, options) => {
      const logger3 = (0, logger_1.getLogger)(options);
      proxyServer.on("error", (err, req, res, target) => {
        const hostname = req?.headers?.host;
        const requestHref = `${hostname}${req?.url}`;
        const targetHref = `${target?.href}`;
        const errorMessage = "[HPM] Error occurred while proxying request %s to %s [%s] (%s)";
        const errReference = "https://nodejs.org/api/errors.html#errors_common_system_errors";
        logger3.error(errorMessage, requestHref, targetHref, err.code || err, errReference);
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
        logger3.info(exchange);
      });
      proxyServer.on("open", (socket) => {
        logger3.info("[HPM] Client connected: %o", socket.address());
      });
      proxyServer.on("close", (req, proxySocket, proxyHead) => {
        logger3.info("[HPM] Client disconnected: %o", proxySocket.address());
      });
    };
    exports.loggerPlugin = loggerPlugin;
  }
});

// node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/utils/function.js
var require_function = __commonJS({
  "node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/utils/function.js"(exports) {
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getFunctionName = getFunctionName;
    function getFunctionName(fn) {
      return fn.name || "[anonymous Function]";
    }
  }
});

// node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/plugins/default/proxy-events.js
var require_proxy_events = __commonJS({
  "node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/plugins/default/proxy-events.js"(exports) {
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.proxyEventsPlugin = void 0;
    var debug_1 = require_debug();
    var function_1 = require_function();
    var debug = debug_1.Debug.extend("proxy-events-plugin");
    var proxyEventsPlugin = (proxyServer, options) => {
      Object.entries(options.on || {}).forEach(([eventName, handler]) => {
        debug(`register event handler: "${eventName}" -> "${(0, function_1.getFunctionName)(handler)}"`);
        proxyServer.on(eventName, handler);
      });
    };
    exports.proxyEventsPlugin = proxyEventsPlugin;
  }
});

// node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/plugins/default/index.js
var require_default = __commonJS({
  "node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/plugins/default/index.js"(exports) {
    init_esm_shims();
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
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
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_debug_proxy_errors_plugin(), exports);
    __exportStar(require_error_response_plugin(), exports);
    __exportStar(require_logger_plugin2(), exports);
    __exportStar(require_proxy_events(), exports);
  }
});

// node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/get-plugins.js
var require_get_plugins = __commonJS({
  "node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/get-plugins.js"(exports) {
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getPlugins = getPlugins;
    var default_1 = require_default();
    function getPlugins(options) {
      const maybeErrorResponsePlugin = options.on?.error ? [] : [default_1.errorResponsePlugin];
      const defaultPlugins = options.ejectPlugins ? [] : [default_1.debugProxyErrorsPlugin, default_1.proxyEventsPlugin, default_1.loggerPlugin, ...maybeErrorResponsePlugin];
      const userPlugins = options.plugins ?? [];
      return [...defaultPlugins, ...userPlugins];
    }
  }
});

// node_modules/.pnpm/is-extglob@2.1.1/node_modules/is-extglob/index.js
var require_is_extglob = __commonJS({
  "node_modules/.pnpm/is-extglob@2.1.1/node_modules/is-extglob/index.js"(exports, module) {
    init_esm_shims();
    module.exports = function isExtglob(str) {
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
  }
});

// node_modules/.pnpm/is-glob@4.0.3/node_modules/is-glob/index.js
var require_is_glob = __commonJS({
  "node_modules/.pnpm/is-glob@4.0.3/node_modules/is-glob/index.js"(exports, module) {
    init_esm_shims();
    var isExtglob = require_is_extglob();
    var chars = { "{": "}", "(": ")", "[": "]" };
    var strictCheck = function(str) {
      if (str[0] === "!") {
        return true;
      }
      var index = 0;
      var pipeIndex = -2;
      var closeSquareIndex = -2;
      var closeCurlyIndex = -2;
      var closeParenIndex = -2;
      var backSlashIndex = -2;
      while (index < str.length) {
        if (str[index] === "*") {
          return true;
        }
        if (str[index + 1] === "?" && /[\].+)]/.test(str[index])) {
          return true;
        }
        if (closeSquareIndex !== -1 && str[index] === "[" && str[index + 1] !== "]") {
          if (closeSquareIndex < index) {
            closeSquareIndex = str.indexOf("]", index);
          }
          if (closeSquareIndex > index) {
            if (backSlashIndex === -1 || backSlashIndex > closeSquareIndex) {
              return true;
            }
            backSlashIndex = str.indexOf("\\", index);
            if (backSlashIndex === -1 || backSlashIndex > closeSquareIndex) {
              return true;
            }
          }
        }
        if (closeCurlyIndex !== -1 && str[index] === "{" && str[index + 1] !== "}") {
          closeCurlyIndex = str.indexOf("}", index);
          if (closeCurlyIndex > index) {
            backSlashIndex = str.indexOf("\\", index);
            if (backSlashIndex === -1 || backSlashIndex > closeCurlyIndex) {
              return true;
            }
          }
        }
        if (closeParenIndex !== -1 && str[index] === "(" && str[index + 1] === "?" && /[:!=]/.test(str[index + 2]) && str[index + 3] !== ")") {
          closeParenIndex = str.indexOf(")", index);
          if (closeParenIndex > index) {
            backSlashIndex = str.indexOf("\\", index);
            if (backSlashIndex === -1 || backSlashIndex > closeParenIndex) {
              return true;
            }
          }
        }
        if (pipeIndex !== -1 && str[index] === "(" && str[index + 1] !== "|") {
          if (pipeIndex < index) {
            pipeIndex = str.indexOf("|", index);
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
        if (str[index] === "\\") {
          var open = str[index + 1];
          index += 2;
          var close = chars[open];
          if (close) {
            var n = str.indexOf(close, index);
            if (n !== -1) {
              index = n + 1;
            }
          }
          if (str[index] === "!") {
            return true;
          }
        } else {
          index++;
        }
      }
      return false;
    };
    var relaxedCheck = function(str) {
      if (str[0] === "!") {
        return true;
      }
      var index = 0;
      while (index < str.length) {
        if (/[*?{}()[\]]/.test(str[index])) {
          return true;
        }
        if (str[index] === "\\") {
          var open = str[index + 1];
          index += 2;
          var close = chars[open];
          if (close) {
            var n = str.indexOf(close, index);
            if (n !== -1) {
              index = n + 1;
            }
          }
          if (str[index] === "!") {
            return true;
          }
        } else {
          index++;
        }
      }
      return false;
    };
    module.exports = function isGlob(str, options) {
      if (typeof str !== "string" || str === "") {
        return false;
      }
      if (isExtglob(str)) {
        return true;
      }
      var check = strictCheck;
      if (options && options.strict === false) {
        check = relaxedCheck;
      }
      return check(str);
    };
  }
});

// node_modules/.pnpm/braces@3.0.3/node_modules/braces/lib/utils.js
var require_utils = __commonJS({
  "node_modules/.pnpm/braces@3.0.3/node_modules/braces/lib/utils.js"(exports) {
    init_esm_shims();
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
  }
});

// node_modules/.pnpm/braces@3.0.3/node_modules/braces/lib/stringify.js
var require_stringify = __commonJS({
  "node_modules/.pnpm/braces@3.0.3/node_modules/braces/lib/stringify.js"(exports, module) {
    init_esm_shims();
    var utils = require_utils();
    module.exports = (ast, options = {}) => {
      const stringify = (node, parent = {}) => {
        const invalidBlock = options.escapeInvalid && utils.isInvalidBrace(parent);
        const invalidNode = node.invalid === true && options.escapeInvalid === true;
        let output = "";
        if (node.value) {
          if ((invalidBlock || invalidNode) && utils.isOpenOrClose(node)) {
            return "\\" + node.value;
          }
          return node.value;
        }
        if (node.value) {
          return node.value;
        }
        if (node.nodes) {
          for (const child of node.nodes) {
            output += stringify(child);
          }
        }
        return output;
      };
      return stringify(ast);
    };
  }
});

// node_modules/.pnpm/is-number@7.0.0/node_modules/is-number/index.js
var require_is_number = __commonJS({
  "node_modules/.pnpm/is-number@7.0.0/node_modules/is-number/index.js"(exports, module) {
    init_esm_shims();
    module.exports = function(num) {
      if (typeof num === "number") {
        return num - num === 0;
      }
      if (typeof num === "string" && num.trim() !== "") {
        return Number.isFinite ? Number.isFinite(+num) : isFinite(+num);
      }
      return false;
    };
  }
});

// node_modules/.pnpm/to-regex-range@5.0.1/node_modules/to-regex-range/index.js
var require_to_regex_range = __commonJS({
  "node_modules/.pnpm/to-regex-range@5.0.1/node_modules/to-regex-range/index.js"(exports, module) {
    init_esm_shims();
    var isNumber = require_is_number();
    var toRegexRange = (min, max, options) => {
      if (isNumber(min) === false) {
        throw new TypeError("toRegexRange: expected the first argument to be a number");
      }
      if (max === void 0 || min === max) {
        return String(min);
      }
      if (isNumber(max) === false) {
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
    module.exports = toRegexRange;
  }
});

// node_modules/.pnpm/fill-range@7.1.1/node_modules/fill-range/index.js
var require_fill_range = __commonJS({
  "node_modules/.pnpm/fill-range@7.1.1/node_modules/fill-range/index.js"(exports, module) {
    init_esm_shims();
    var util = __require("util");
    var toRegexRange = require_to_regex_range();
    var isObject = (val) => val !== null && typeof val === "object" && !Array.isArray(val);
    var transform = (toNumber) => {
      return (value) => toNumber === true ? Number(value) : String(value);
    };
    var isValidValue = (value) => {
      return typeof value === "number" || typeof value === "string" && value !== "";
    };
    var isNumber = (num) => Number.isInteger(+num);
    var zeros = (input) => {
      let value = `${input}`;
      let index = -1;
      if (value[0] === "-") value = value.slice(1);
      if (value === "0") return false;
      while (value[++index] === "0") ;
      return index > 0;
    };
    var stringify = (start, end, options) => {
      if (typeof start === "string" || typeof end === "string") {
        return true;
      }
      return options.stringify === true;
    };
    var pad = (input, maxLength, toNumber) => {
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
    var toMaxLen = (input, maxLength) => {
      let negative = input[0] === "-" ? "-" : "";
      if (negative) {
        input = input.slice(1);
        maxLength--;
      }
      while (input.length < maxLength) input = "0" + input;
      return negative ? "-" + input : input;
    };
    var toSequence = (parts, options, maxLen) => {
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
    var toRange = (a, b, isNumbers, options) => {
      if (isNumbers) {
        return toRegexRange(a, b, { wrap: false, ...options });
      }
      let start = String.fromCharCode(a);
      if (a === b) return start;
      let stop = String.fromCharCode(b);
      return `[${start}-${stop}]`;
    };
    var toRegex = (start, end, options) => {
      if (Array.isArray(start)) {
        let wrap = options.wrap === true;
        let prefix = options.capture ? "" : "?:";
        return wrap ? `(${prefix}${start.join("|")})` : start.join("|");
      }
      return toRegexRange(start, end, options);
    };
    var rangeError = (...args) => {
      return new RangeError("Invalid range arguments: " + util.inspect(...args));
    };
    var invalidRange = (start, end, options) => {
      if (options.strictRanges === true) throw rangeError([start, end]);
      return [];
    };
    var invalidStep = (step, options) => {
      if (options.strictRanges === true) {
        throw new TypeError(`Expected step "${step}" to be a number`);
      }
      return [];
    };
    var fillNumbers = (start, end, step = 1, options = {}) => {
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
      let toNumber = padded === false && stringify(start, end, options) === false;
      let format = options.transform || transform(toNumber);
      if (options.toRegex && step === 1) {
        return toRange(toMaxLen(start, maxLen), toMaxLen(end, maxLen), true, options);
      }
      let parts = { negatives: [], positives: [] };
      let push = (num) => parts[num < 0 ? "negatives" : "positives"].push(Math.abs(num));
      let range = [];
      let index = 0;
      while (descending ? a >= b : a <= b) {
        if (options.toRegex === true && step > 1) {
          push(a);
        } else {
          range.push(pad(format(a, index), maxLen, toNumber));
        }
        a = descending ? a - step : a + step;
        index++;
      }
      if (options.toRegex === true) {
        return step > 1 ? toSequence(parts, options, maxLen) : toRegex(range, null, { wrap: false, ...options });
      }
      return range;
    };
    var fillLetters = (start, end, step = 1, options = {}) => {
      if (!isNumber(start) && start.length > 1 || !isNumber(end) && end.length > 1) {
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
      let index = 0;
      while (descending ? a >= b : a <= b) {
        range.push(format(a, index));
        a = descending ? a - step : a + step;
        index++;
      }
      if (options.toRegex === true) {
        return toRegex(range, null, { wrap: false, options });
      }
      return range;
    };
    var fill = (start, end, step, options = {}) => {
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
      if (!isNumber(step)) {
        if (step != null && !isObject(step)) return invalidStep(step, opts);
        return fill(start, end, 1, step);
      }
      if (isNumber(start) && isNumber(end)) {
        return fillNumbers(start, end, step, opts);
      }
      return fillLetters(start, end, Math.max(Math.abs(step), 1), opts);
    };
    module.exports = fill;
  }
});

// node_modules/.pnpm/braces@3.0.3/node_modules/braces/lib/compile.js
var require_compile = __commonJS({
  "node_modules/.pnpm/braces@3.0.3/node_modules/braces/lib/compile.js"(exports, module) {
    init_esm_shims();
    var fill = require_fill_range();
    var utils = require_utils();
    var compile = (ast, options = {}) => {
      const walk = (node, parent = {}) => {
        const invalidBlock = utils.isInvalidBrace(parent);
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
          const args = utils.reduce(node.nodes);
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
    module.exports = compile;
  }
});

// node_modules/.pnpm/braces@3.0.3/node_modules/braces/lib/expand.js
var require_expand = __commonJS({
  "node_modules/.pnpm/braces@3.0.3/node_modules/braces/lib/expand.js"(exports, module) {
    init_esm_shims();
    var fill = require_fill_range();
    var stringify = require_stringify();
    var utils = require_utils();
    var append = (queue = "", stash = "", enclose = false) => {
      const result = [];
      queue = [].concat(queue);
      stash = [].concat(stash);
      if (!stash.length) return queue;
      if (!queue.length) {
        return enclose ? utils.flatten(stash).map((ele) => `{${ele}}`) : stash;
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
      return utils.flatten(result);
    };
    var expand = (ast, options = {}) => {
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
          q.push(append(q.pop(), stringify(node, options)));
          return;
        }
        if (node.type === "brace" && node.invalid !== true && node.nodes.length === 2) {
          q.push(append(q.pop(), ["{}"]));
          return;
        }
        if (node.nodes && node.ranges > 0) {
          const args = utils.reduce(node.nodes);
          if (utils.exceedsLimit(...args, options.step, rangeLimit)) {
            throw new RangeError("expanded array length exceeds range limit. Use options.rangeLimit to increase or disable the limit.");
          }
          let range = fill(...args, options);
          if (range.length === 0) {
            range = stringify(node, options);
          }
          q.push(append(q.pop(), range));
          node.nodes = [];
          return;
        }
        const enclose = utils.encloseBrace(node);
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
      return utils.flatten(walk(ast));
    };
    module.exports = expand;
  }
});

// node_modules/.pnpm/braces@3.0.3/node_modules/braces/lib/constants.js
var require_constants = __commonJS({
  "node_modules/.pnpm/braces@3.0.3/node_modules/braces/lib/constants.js"(exports, module) {
    init_esm_shims();
    module.exports = {
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
      CHAR_NO_BREAK_SPACE: "\xA0",
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
  }
});

// node_modules/.pnpm/braces@3.0.3/node_modules/braces/lib/parse.js
var require_parse = __commonJS({
  "node_modules/.pnpm/braces@3.0.3/node_modules/braces/lib/parse.js"(exports, module) {
    init_esm_shims();
    var stringify = require_stringify();
    var {
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
    } = require_constants();
    var parse = (input, options = {}) => {
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
      let index = 0;
      let depth = 0;
      let value;
      const advance = () => input[index++];
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
      while (index < length) {
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
          while (index < length && (next = advance())) {
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
            block.nodes = [open, { type: "text", value: stringify(block) }];
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
          const index2 = parent.nodes.indexOf(block);
          parent.nodes.splice(index2, 1, ...block.nodes);
        }
      } while (stack.length > 0);
      push({ type: "eos" });
      return ast;
    };
    module.exports = parse;
  }
});

// node_modules/.pnpm/braces@3.0.3/node_modules/braces/index.js
var require_braces = __commonJS({
  "node_modules/.pnpm/braces@3.0.3/node_modules/braces/index.js"(exports, module) {
    init_esm_shims();
    var stringify = require_stringify();
    var compile = require_compile();
    var expand = require_expand();
    var parse = require_parse();
    var braces = (input, options = {}) => {
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
        return stringify(braces.parse(input, options), options);
      }
      return stringify(input, options);
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
    module.exports = braces;
  }
});

// node_modules/.pnpm/picomatch@2.3.1/node_modules/picomatch/lib/constants.js
var require_constants2 = __commonJS({
  "node_modules/.pnpm/picomatch@2.3.1/node_modules/picomatch/lib/constants.js"(exports, module) {
    init_esm_shims();
    var path = __require("path");
    var WIN_SLASH = "\\\\/";
    var WIN_NO_SLASH = `[^${WIN_SLASH}]`;
    var DOT_LITERAL = "\\.";
    var PLUS_LITERAL = "\\+";
    var QMARK_LITERAL = "\\?";
    var SLASH_LITERAL = "\\/";
    var ONE_CHAR = "(?=.)";
    var QMARK = "[^/]";
    var END_ANCHOR = `(?:${SLASH_LITERAL}|$)`;
    var START_ANCHOR = `(?:^|${SLASH_LITERAL})`;
    var DOTS_SLASH = `${DOT_LITERAL}{1,2}${END_ANCHOR}`;
    var NO_DOT = `(?!${DOT_LITERAL})`;
    var NO_DOTS = `(?!${START_ANCHOR}${DOTS_SLASH})`;
    var NO_DOT_SLASH = `(?!${DOT_LITERAL}{0,1}${END_ANCHOR})`;
    var NO_DOTS_SLASH = `(?!${DOTS_SLASH})`;
    var QMARK_NO_DOT = `[^.${SLASH_LITERAL}]`;
    var STAR = `${QMARK}*?`;
    var POSIX_CHARS = {
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
    var WINDOWS_CHARS = {
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
    var POSIX_REGEX_SOURCE = {
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
      SEP: path.sep,
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
  }
});

// node_modules/.pnpm/picomatch@2.3.1/node_modules/picomatch/lib/utils.js
var require_utils2 = __commonJS({
  "node_modules/.pnpm/picomatch@2.3.1/node_modules/picomatch/lib/utils.js"(exports) {
    init_esm_shims();
    var path = __require("path");
    var win32 = process.platform === "win32";
    var {
      REGEX_BACKSLASH,
      REGEX_REMOVE_BACKSLASH,
      REGEX_SPECIAL_CHARS,
      REGEX_SPECIAL_CHARS_GLOBAL
    } = require_constants2();
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
      return win32 === true || path.sep === "\\";
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
  }
});

// node_modules/.pnpm/picomatch@2.3.1/node_modules/picomatch/lib/scan.js
var require_scan = __commonJS({
  "node_modules/.pnpm/picomatch@2.3.1/node_modules/picomatch/lib/scan.js"(exports, module) {
    init_esm_shims();
    var utils = require_utils2();
    var {
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
    } = require_constants2();
    var isPathSeparator = (code) => {
      return code === CHAR_FORWARD_SLASH || code === CHAR_BACKWARD_SLASH;
    };
    var depth = (token) => {
      if (token.isPrefix !== true) {
        token.depth = token.isGlobstar ? Infinity : 1;
      }
    };
    var scan = (input, options) => {
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
      let isGlob = false;
      let isExtglob = false;
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
              isGlob = token.isGlob = true;
              finished = true;
              if (scanToEnd === true) {
                continue;
              }
              break;
            }
            if (braceEscaped !== true && code === CHAR_COMMA) {
              isBrace = token.isBrace = true;
              isGlob = token.isGlob = true;
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
          slashes.push(index);
          tokens.push(token);
          token = { value: "", depth: 0, isGlob: false };
          if (finished === true) continue;
          if (prev === CHAR_DOT && index === start + 1) {
            start += 2;
            continue;
          }
          lastIndex = index + 1;
          continue;
        }
        if (opts.noext !== true) {
          const isExtglobChar = code === CHAR_PLUS || code === CHAR_AT || code === CHAR_ASTERISK || code === CHAR_QUESTION_MARK || code === CHAR_EXCLAMATION_MARK;
          if (isExtglobChar === true && peek() === CHAR_LEFT_PARENTHESES) {
            isGlob = token.isGlob = true;
            isExtglob = token.isExtglob = true;
            finished = true;
            if (code === CHAR_EXCLAMATION_MARK && index === start) {
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
                  isGlob = token.isGlob = true;
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
          isGlob = token.isGlob = true;
          finished = true;
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
        if (code === CHAR_QUESTION_MARK) {
          isGlob = token.isGlob = true;
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
              isGlob = token.isGlob = true;
              finished = true;
              break;
            }
          }
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
        if (opts.nonegate !== true && code === CHAR_EXCLAMATION_MARK && index === start) {
          negated = token.negated = true;
          start++;
          continue;
        }
        if (opts.noparen !== true && code === CHAR_LEFT_PARENTHESES) {
          isGlob = token.isGlob = true;
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
        if (isGlob === true) {
          finished = true;
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
      }
      if (opts.noext === true) {
        isExtglob = false;
        isGlob = false;
      }
      let base2 = str;
      let prefix = "";
      let glob = "";
      if (start > 0) {
        prefix = str.slice(0, start);
        str = str.slice(start);
        lastIndex -= start;
      }
      if (base2 && isGlob === true && lastIndex > 0) {
        base2 = str.slice(0, lastIndex);
        glob = str.slice(lastIndex);
      } else if (isGlob === true) {
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
        if (glob) glob = utils.removeBackslashes(glob);
        if (base2 && backslashes === true) {
          base2 = utils.removeBackslashes(base2);
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
        isGlob,
        isExtglob,
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
    module.exports = scan;
  }
});

// node_modules/.pnpm/picomatch@2.3.1/node_modules/picomatch/lib/parse.js
var require_parse2 = __commonJS({
  "node_modules/.pnpm/picomatch@2.3.1/node_modules/picomatch/lib/parse.js"(exports, module) {
    init_esm_shims();
    var constants = require_constants2();
    var utils = require_utils2();
    var {
      MAX_LENGTH,
      POSIX_REGEX_SOURCE,
      REGEX_NON_SPECIAL_CHARS,
      REGEX_SPECIAL_CHARS_BACKREF,
      REPLACEMENTS
    } = constants;
    var expandRange = (args, options) => {
      if (typeof options.expandRange === "function") {
        return options.expandRange(...args, options);
      }
      args.sort();
      const value = `[${args.join("-")}]`;
      try {
        new RegExp(value);
      } catch (ex) {
        return args.map((v) => utils.escapeRegex(v)).join("..");
      }
      return value;
    };
    var syntaxError = (type, char) => {
      return `Missing ${type}: "${char}" - use "\\\\${char}" to match literal characters`;
    };
    var parse = (input, options) => {
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
      const win32 = utils.isWindows(options);
      const PLATFORM_CHARS = constants.globChars(win32);
      const EXTGLOB_CHARS = constants.extglobChars(PLATFORM_CHARS);
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
      input = utils.removePrefix(input, state);
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
          const isExtglob = tok.extglob === true || extglobs.length && (tok.type === "pipe" || tok.type === "paren");
          if (tok.type !== "slash" && tok.type !== "paren" && !isBrace && !isExtglob) {
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
        let output = input.replace(REGEX_SPECIAL_CHARS_BACKREF, (m, esc, chars, first, rest, index) => {
          if (first === "\\") {
            backslashes = true;
            return m;
          }
          if (first === "?") {
            if (esc) {
              return esc + first + (rest ? QMARK.repeat(rest.length) : "");
            }
            if (index === 0) {
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
        state.output = utils.wrapOutput(output, state, options);
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
          value = utils.escapeRegex(value);
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
          if (opts.literalBrackets === false || utils.hasRegexChars(prevValue)) {
            continue;
          }
          const escaped = utils.escapeRegex(prev.value);
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
            if (next === "<" && !utils.supportsLookbehinds()) {
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
          const isExtglob = extglobs.length && (prior.type === "pipe" || prior.type === "paren");
          if (!isStart && prior.type !== "paren" && !isBrace && !isExtglob) {
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
        state.output = utils.escapeLast(state.output, "[");
        decrement("brackets");
      }
      while (state.parens > 0) {
        if (opts.strictBrackets === true) throw new SyntaxError(syntaxError("closing", ")"));
        state.output = utils.escapeLast(state.output, "(");
        decrement("parens");
      }
      while (state.braces > 0) {
        if (opts.strictBrackets === true) throw new SyntaxError(syntaxError("closing", "}"));
        state.output = utils.escapeLast(state.output, "{");
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
      const win32 = utils.isWindows(options);
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
      } = constants.globChars(win32);
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
      const output = utils.removePrefix(input, state);
      let source = create(output);
      if (source && opts.strictSlashes !== true) {
        source += `${SLASH_LITERAL}?`;
      }
      return source;
    };
    module.exports = parse;
  }
});

// node_modules/.pnpm/picomatch@2.3.1/node_modules/picomatch/lib/picomatch.js
var require_picomatch = __commonJS({
  "node_modules/.pnpm/picomatch@2.3.1/node_modules/picomatch/lib/picomatch.js"(exports, module) {
    init_esm_shims();
    var path = __require("path");
    var scan = require_scan();
    var parse = require_parse2();
    var utils = require_utils2();
    var constants = require_constants2();
    var isObject = (val) => val && typeof val === "object" && !Array.isArray(val);
    var picomatch = (glob, options, returnState = false) => {
      if (Array.isArray(glob)) {
        const fns = glob.map((input) => picomatch(input, options, returnState));
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
      const posix = utils.isWindows(options);
      const regex = isState ? picomatch.compileRe(glob, options) : picomatch.makeRe(glob, options, false, true);
      const state = regex.state;
      delete regex.state;
      let isIgnored = () => false;
      if (opts.ignore) {
        const ignoreOpts = { ...options, ignore: null, onMatch: null, onResult: null };
        isIgnored = picomatch(opts.ignore, ignoreOpts, returnState);
      }
      const matcher = (input, returnObject = false) => {
        const { isMatch, match, output } = picomatch.test(input, regex, options, { glob, posix });
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
    picomatch.test = (input, regex, options, { glob, posix } = {}) => {
      if (typeof input !== "string") {
        throw new TypeError("Expected input to be a string");
      }
      if (input === "") {
        return { isMatch: false, output: "" };
      }
      const opts = options || {};
      const format = opts.format || (posix ? utils.toPosixSlashes : null);
      let match = input === glob;
      let output = match && format ? format(input) : input;
      if (match === false) {
        output = format ? format(input) : input;
        match = output === glob;
      }
      if (match === false || opts.capture === true) {
        if (opts.matchBase === true || opts.basename === true) {
          match = picomatch.matchBase(input, regex, options, posix);
        } else {
          match = regex.exec(output);
        }
      }
      return { isMatch: Boolean(match), match, output };
    };
    picomatch.matchBase = (input, glob, options, posix = utils.isWindows(options)) => {
      const regex = glob instanceof RegExp ? glob : picomatch.makeRe(glob, options);
      return regex.test(path.basename(input));
    };
    picomatch.isMatch = (str, patterns, options) => picomatch(patterns, options)(str);
    picomatch.parse = (pattern, options) => {
      if (Array.isArray(pattern)) return pattern.map((p) => picomatch.parse(p, options));
      return parse(pattern, { ...options, fastpaths: false });
    };
    picomatch.scan = (input, options) => scan(input, options);
    picomatch.compileRe = (state, options, returnOutput = false, returnState = false) => {
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
      const regex = picomatch.toRegex(source, options);
      if (returnState === true) {
        regex.state = state;
      }
      return regex;
    };
    picomatch.makeRe = (input, options = {}, returnOutput = false, returnState = false) => {
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
      return picomatch.compileRe(parsed, options, returnOutput, returnState);
    };
    picomatch.toRegex = (source, options) => {
      try {
        const opts = options || {};
        return new RegExp(source, opts.flags || (opts.nocase ? "i" : ""));
      } catch (err) {
        if (options && options.debug === true) throw err;
        return /$^/;
      }
    };
    picomatch.constants = constants;
    module.exports = picomatch;
  }
});

// node_modules/.pnpm/picomatch@2.3.1/node_modules/picomatch/index.js
var require_picomatch2 = __commonJS({
  "node_modules/.pnpm/picomatch@2.3.1/node_modules/picomatch/index.js"(exports, module) {
    init_esm_shims();
    module.exports = require_picomatch();
  }
});

// node_modules/.pnpm/micromatch@4.0.8/node_modules/micromatch/index.js
var require_micromatch = __commonJS({
  "node_modules/.pnpm/micromatch@4.0.8/node_modules/micromatch/index.js"(exports, module) {
    init_esm_shims();
    var util = __require("util");
    var braces = require_braces();
    var picomatch = require_picomatch2();
    var utils = require_utils2();
    var isEmptyString = (v) => v === "" || v === "./";
    var hasBraces = (v) => {
      const index = v.indexOf("{");
      return index > -1 && v.indexOf("}", index) > -1;
    };
    var micromatch = (list, patterns, options) => {
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
        let isMatch = picomatch(String(patterns[i]), { ...options, onResult }, true);
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
    micromatch.matcher = (pattern, options) => picomatch(pattern, options);
    micromatch.isMatch = (str, patterns, options) => picomatch(patterns, options)(str);
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
      if (!utils.isObject(obj)) {
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
        let isMatch = picomatch(String(pattern), options);
        if (items.some((item) => isMatch(item))) {
          return true;
        }
      }
      return false;
    };
    micromatch.every = (list, patterns, options) => {
      let items = [].concat(list);
      for (let pattern of [].concat(patterns)) {
        let isMatch = picomatch(String(pattern), options);
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
      return [].concat(patterns).every((p) => picomatch(p, options)(str));
    };
    micromatch.capture = (glob, input, options) => {
      let posix = utils.isWindows(options);
      let regex = picomatch.makeRe(String(glob), { ...options, capture: true });
      let match = regex.exec(posix ? utils.toPosixSlashes(input) : input);
      if (match) {
        return match.slice(1).map((v) => v === void 0 ? "" : v);
      }
    };
    micromatch.makeRe = (...args) => picomatch.makeRe(...args);
    micromatch.scan = (...args) => picomatch.scan(...args);
    micromatch.parse = (patterns, options) => {
      let res = [];
      for (let pattern of [].concat(patterns || [])) {
        for (let str of braces(String(pattern), options)) {
          res.push(picomatch.parse(str, options));
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
    module.exports = micromatch;
  }
});

// node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/path-filter.js
var require_path_filter = __commonJS({
  "node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/path-filter.js"(exports) {
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.matchPathFilter = matchPathFilter;
    var isGlob = require_is_glob();
    var micromatch = require_micromatch();
    var url = __require("url");
    var errors_1 = require_errors();
    function matchPathFilter(pathFilter = "/", uri, req) {
      if (isStringPath(pathFilter)) {
        return matchSingleStringPath(pathFilter, uri);
      }
      if (isGlobPath(pathFilter)) {
        return matchSingleGlobPath(pathFilter, uri);
      }
      if (Array.isArray(pathFilter)) {
        if (pathFilter.every(isStringPath)) {
          return matchMultiPath(pathFilter, uri);
        }
        if (pathFilter.every(isGlobPath)) {
          return matchMultiGlobPath(pathFilter, uri);
        }
        throw new Error(errors_1.ERRORS.ERR_CONTEXT_MATCHER_INVALID_ARRAY);
      }
      if (typeof pathFilter === "function") {
        const pathname = getUrlPathName(uri);
        return pathFilter(pathname, req);
      }
      throw new Error(errors_1.ERRORS.ERR_CONTEXT_MATCHER_GENERIC);
    }
    function matchSingleStringPath(pathFilter, uri) {
      const pathname = getUrlPathName(uri);
      return pathname?.indexOf(pathFilter) === 0;
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
    function isStringPath(pathFilter) {
      return typeof pathFilter === "string" && !isGlob(pathFilter);
    }
    function isGlobPath(pathFilter) {
      return isGlob(pathFilter);
    }
  }
});

// node_modules/.pnpm/is-plain-object@5.0.0/node_modules/is-plain-object/dist/is-plain-object.js
var require_is_plain_object = __commonJS({
  "node_modules/.pnpm/is-plain-object@5.0.0/node_modules/is-plain-object/dist/is-plain-object.js"(exports) {
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", { value: true });
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
      if (prot.hasOwnProperty("isPrototypeOf") === false) {
        return false;
      }
      return true;
    }
    exports.isPlainObject = isPlainObject;
  }
});

// node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/path-rewriter.js
var require_path_rewriter = __commonJS({
  "node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/path-rewriter.js"(exports) {
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createPathRewriter = createPathRewriter;
    var is_plain_object_1 = require_is_plain_object();
    var errors_1 = require_errors();
    var debug_1 = require_debug();
    var debug = debug_1.Debug.extend("path-rewriter");
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
      function rewritePath(path) {
        let result = path;
        for (const rule of rulesCache) {
          if (rule.regex.test(path)) {
            result = result.replace(rule.regex, rule.value);
            debug('rewriting path from "%s" to "%s"', path, result);
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
          debug('rewrite rule created: "%s" ~> "%s"', key, value);
        }
      }
      return rules;
    }
  }
});

// node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/router.js
var require_router = __commonJS({
  "node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/router.js"(exports) {
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getTarget = getTarget;
    var is_plain_object_1 = require_is_plain_object();
    var debug_1 = require_debug();
    var debug = debug_1.Debug.extend("router");
    async function getTarget(req, config) {
      let newTarget;
      const router = config.router;
      if ((0, is_plain_object_1.isPlainObject)(router)) {
        newTarget = getTargetFromProxyTable(req, router);
      } else if (typeof router === "function") {
        newTarget = await router(req);
      }
      return newTarget;
    }
    function getTargetFromProxyTable(req, table) {
      let result;
      const host = req.headers.host;
      const path = req.url;
      const hostAndPath = host + path;
      for (const [key, value] of Object.entries(table)) {
        if (containsPath(key)) {
          if (hostAndPath.indexOf(key) > -1) {
            result = value;
            debug('match: "%s" -> "%s"', key, result);
            break;
          }
        } else {
          if (key === host) {
            result = value;
            debug('match: "%s" -> "%s"', host, result);
            break;
          }
        }
      }
      return result;
    }
    function containsPath(v) {
      return v.indexOf("/") > -1;
    }
  }
});

// node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/http-proxy-middleware.js
var require_http_proxy_middleware = __commonJS({
  "node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/http-proxy-middleware.js"(exports) {
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HttpProxyMiddleware = void 0;
    var httpProxy = require_http_proxy3();
    var configuration_1 = require_configuration();
    var get_plugins_1 = require_get_plugins();
    var path_filter_1 = require_path_filter();
    var PathRewriter = require_path_rewriter();
    var Router = require_router();
    var debug_1 = require_debug();
    var function_1 = require_function();
    var logger_1 = require_logger();
    var HttpProxyMiddleware = class {
      constructor(options) {
        this.wsInternalSubscribed = false;
        this.serverOnCloseSubscribed = false;
        this.middleware = async (req, res, next) => {
          if (this.shouldProxy(this.proxyOptions.pathFilter, req)) {
            try {
              const activeProxyOptions = await this.prepareProxyRequest(req);
              (0, debug_1.Debug)(`proxy request to target: %O`, activeProxyOptions.target);
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
              (0, debug_1.Debug)("server close signal received: closing proxy server");
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
            (0, debug_1.Debug)("subscribing to server upgrade event");
            server2.on("upgrade", this.handleUpgrade);
            this.wsInternalSubscribed = true;
          }
        };
        this.handleUpgrade = async (req, socket, head) => {
          try {
            if (this.shouldProxy(this.proxyOptions.pathFilter, req)) {
              const activeProxyOptions = await this.prepareProxyRequest(req);
              this.proxy.ws(req, socket, head, activeProxyOptions);
              (0, debug_1.Debug)("server upgrade event received. Proxying WebSocket");
            }
          } catch (err) {
            this.proxy.emit("error", err, req, socket);
          }
        };
        this.shouldProxy = (pathFilter, req) => {
          try {
            return (0, path_filter_1.matchPathFilter)(pathFilter, req.url, req);
          } catch (err) {
            (0, debug_1.Debug)("Error: matchPathFilter() called with request url: ", `"${req.url}"`);
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
              (0, debug_1.Debug)('router new target: "%s"', newTarget);
              options2.target = newTarget;
            }
          }
        };
        this.applyPathRewrite = async (req, pathRewriter) => {
          if (pathRewriter) {
            const path = await pathRewriter(req.url, req);
            if (typeof path === "string") {
              (0, debug_1.Debug)("pathRewrite new path: %s", req.url);
              req.url = path;
            } else {
              (0, debug_1.Debug)("pathRewrite: no rewritten path found: %s", req.url);
            }
          }
        };
        (0, configuration_1.verifyConfig)(options);
        this.proxyOptions = options;
        this.logger = (0, logger_1.getLogger)(options);
        (0, debug_1.Debug)(`create proxy server`);
        this.proxy = httpProxy.createProxyServer({});
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
          (0, debug_1.Debug)(`register plugin: "${(0, function_1.getFunctionName)(plugin)}"`);
          plugin(proxy, options);
        });
      }
    };
    exports.HttpProxyMiddleware = HttpProxyMiddleware;
  }
});

// node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/factory.js
var require_factory = __commonJS({
  "node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/factory.js"(exports) {
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createProxyMiddleware = createProxyMiddleware2;
    var http_proxy_middleware_1 = require_http_proxy_middleware();
    function createProxyMiddleware2(options) {
      const { middleware } = new http_proxy_middleware_1.HttpProxyMiddleware(options);
      return middleware;
    }
  }
});

// node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/handlers/response-interceptor.js
var require_response_interceptor = __commonJS({
  "node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/handlers/response-interceptor.js"(exports) {
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.responseInterceptor = responseInterceptor;
    var zlib = __require("zlib");
    var debug_1 = require_debug();
    var function_1 = require_function();
    var debug = debug_1.Debug.extend("response-interceptor");
    function responseInterceptor(interceptor) {
      return async function proxyResResponseInterceptor(proxyRes, req, res) {
        debug("intercept proxy response");
        const originalProxyRes = proxyRes;
        let buffer = Buffer.from("", "utf8");
        const _proxyRes = decompress(proxyRes, proxyRes.headers["content-encoding"]);
        _proxyRes.on("data", (chunk) => buffer = Buffer.concat([buffer, chunk]));
        _proxyRes.on("end", async () => {
          copyHeaders(proxyRes, res);
          debug("call interceptor function: %s", (0, function_1.getFunctionName)(interceptor));
          const interceptedBuffer = Buffer.from(await interceptor(buffer, originalProxyRes, req, res));
          debug("set content-length: %s", Buffer.byteLength(interceptedBuffer, "utf8"));
          res.setHeader("content-length", Buffer.byteLength(interceptedBuffer, "utf8"));
          debug("write intercepted response");
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
          decompress2 = zlib.createGunzip();
          break;
        case "br":
          decompress2 = zlib.createBrotliDecompress();
          break;
        case "deflate":
          decompress2 = zlib.createInflate();
          break;
      }
      if (decompress2) {
        debug(`decompress proxy response with 'content-encoding': %s`, contentEncoding);
        _proxyRes.pipe(decompress2);
        _proxyRes = decompress2;
      }
      return _proxyRes;
    }
    function copyHeaders(originalResponse, response) {
      debug("copy original response headers");
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
  }
});

// node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/handlers/fix-request-body.js
var require_fix_request_body = __commonJS({
  "node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/handlers/fix-request-body.js"(exports) {
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.fixRequestBody = fixRequestBody;
    var querystring = __require("querystring");
    function fixRequestBody(proxyReq, req) {
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
  }
});

// node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/handlers/public.js
var require_public = __commonJS({
  "node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/handlers/public.js"(exports) {
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.fixRequestBody = exports.responseInterceptor = void 0;
    var response_interceptor_1 = require_response_interceptor();
    Object.defineProperty(exports, "responseInterceptor", { enumerable: true, get: function() {
      return response_interceptor_1.responseInterceptor;
    } });
    var fix_request_body_1 = require_fix_request_body();
    Object.defineProperty(exports, "fixRequestBody", { enumerable: true, get: function() {
      return fix_request_body_1.fixRequestBody;
    } });
  }
});

// node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/handlers/index.js
var require_handlers = __commonJS({
  "node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/handlers/index.js"(exports) {
    init_esm_shims();
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
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
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_public(), exports);
  }
});

// node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/legacy/options-adapter.js
var require_options_adapter = __commonJS({
  "node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/legacy/options-adapter.js"(exports) {
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.legacyOptionsAdapter = legacyOptionsAdapter;
    var url = __require("url");
    var debug_1 = require_debug();
    var logger_1 = require_logger();
    var debug = debug_1.Debug.extend("legacy-options-adapter");
    var proxyEventMap = {
      onError: "error",
      onProxyReq: "proxyReq",
      onProxyRes: "proxyRes",
      onProxyReqWs: "proxyReqWs",
      onOpen: "open",
      onClose: "close"
    };
    function legacyOptionsAdapter(legacyContext, legacyOptions) {
      let options = {};
      let logger3;
      if (typeof legacyContext === "string" && !!url.parse(legacyContext).host) {
        throw new Error(`Shorthand syntax is removed from legacyCreateProxyMiddleware().
      Please use "legacyCreateProxyMiddleware({ target: 'http://www.example.org' })" instead.

      More details: https://github.com/chimurai/http-proxy-middleware/blob/master/MIGRATION.md#removed-shorthand-usage
      `);
      }
      if (legacyContext && legacyOptions) {
        debug("map legacy context/filter to options.pathFilter");
        options = { ...legacyOptions, pathFilter: legacyContext };
        logger3 = getLegacyLogger(options);
        logger3.warn(`[http-proxy-middleware] Legacy "context" argument is deprecated. Migrate your "context" to "options.pathFilter":

      const options = {
        pathFilter: '${legacyContext}',
      }

      More details: https://github.com/chimurai/http-proxy-middleware/blob/master/MIGRATION.md#removed-context-argument
      `);
      } else if (legacyContext && !legacyOptions) {
        options = { ...legacyContext };
        logger3 = getLegacyLogger(options);
      } else {
        logger3 = getLegacyLogger({});
      }
      Object.entries(proxyEventMap).forEach(([legacyEventName, proxyEventName]) => {
        if (options[legacyEventName]) {
          options.on = { ...options.on };
          options.on[proxyEventName] = options[legacyEventName];
          debug('map legacy event "%s" to "on.%s"', legacyEventName, proxyEventName);
          logger3.warn(`[http-proxy-middleware] Legacy "${legacyEventName}" is deprecated. Migrate to "options.on.${proxyEventName}":

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
      debug("legacy logLevel", logLevel);
      debug("legacy logProvider: %O", logProvider);
      if (typeof logLevel === "string" && logLevel !== "silent") {
        debug('map "logProvider" to "logger"');
        logger3.warn(`[http-proxy-middleware] Legacy "logLevel" and "logProvider" are deprecated. Migrate to "options.logger":

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
  }
});

// node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/legacy/create-proxy-middleware.js
var require_create_proxy_middleware = __commonJS({
  "node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/legacy/create-proxy-middleware.js"(exports) {
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.legacyCreateProxyMiddleware = legacyCreateProxyMiddleware;
    var factory_1 = require_factory();
    var debug_1 = require_debug();
    var options_adapter_1 = require_options_adapter();
    var debug = debug_1.Debug.extend("legacy-create-proxy-middleware");
    function legacyCreateProxyMiddleware(legacyContext, legacyOptions) {
      debug("init");
      const options = (0, options_adapter_1.legacyOptionsAdapter)(legacyContext, legacyOptions);
      const proxyMiddleware = (0, factory_1.createProxyMiddleware)(options);
      debug("add marker for patching req.url (old behavior)");
      proxyMiddleware.__LEGACY_HTTP_PROXY_MIDDLEWARE__ = true;
      return proxyMiddleware;
    }
  }
});

// node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/legacy/public.js
var require_public2 = __commonJS({
  "node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/legacy/public.js"(exports) {
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.legacyCreateProxyMiddleware = void 0;
    var create_proxy_middleware_1 = require_create_proxy_middleware();
    Object.defineProperty(exports, "legacyCreateProxyMiddleware", { enumerable: true, get: function() {
      return create_proxy_middleware_1.legacyCreateProxyMiddleware;
    } });
  }
});

// node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/legacy/index.js
var require_legacy = __commonJS({
  "node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/legacy/index.js"(exports) {
    init_esm_shims();
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
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
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_public2(), exports);
  }
});

// node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/index.js
var require_dist = __commonJS({
  "node_modules/.pnpm/http-proxy-middleware@3.0.5/node_modules/http-proxy-middleware/dist/index.js"(exports) {
    init_esm_shims();
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
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
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_factory(), exports);
    __exportStar(require_handlers(), exports);
    __exportStar(require_default(), exports);
    __exportStar(require_legacy(), exports);
  }
});

// src/index.ts
init_esm_shims();
var import_cors = __toESM(require_lib(), 1);
var import_http_proxy_middleware = __toESM(require_dist(), 1);
var server = express();
var proxyOptions = {
  target: "https://developer.huawei.com",
  changeOrigin: true
};
server.use((0, import_cors.default)());
server.use("/", (0, import_http_proxy_middleware.createProxyMiddleware)(proxyOptions));
server.listen(3780);
if (Config.app.APIServer && Config.app.APIServerMount) {
  app.use(logMiddleware(["/api/bilibili", "/api/douyin", "/api/kuaishou"]));
  app.use("/api/bilibili", registerBilibiliRoutes(Config.cookies.bilibili));
  app.use("/api/douyin", registerDouyinRoutes(Config.cookies.douyin));
  app.use("/api/kuaishou", registerKuaishouRoutes(Config.cookies.kuaishou));
  logger.mark(`Amagi server listening on ${logger.green("http://localhost:")}${logger.green(process.env.HTTP_PORT)} API docs: ${logger.yellow("https://amagi.apifox.cn")}`);
} else if (Config.app.APIServer) {
  const amagiServer = new index_default({
    bilibili: Config.cookies.bilibili,
    douyin: Config.cookies.douyin,
    kuaishou: Config.cookies.kuaishou
  });
  amagiServer.startClient(Config.app.APIServerPort);
}
var base = `${karinPathBase}/${Version.pluginName}`;
mkdirSync(`${base}/data`);
mkdirSync(Common.tempDri.images);
mkdirSync(Common.tempDri.video);
logger$1.info(`${logger$1.green(`[\u63D2\u4EF6:${Version.pluginName}]`)} ${logger$1.violet(`${Version.pluginVersion}`)} \u521D\u59CB\u5316\u5B8C\u6210~`);
/*! Bundled license information:

object-assign/index.js:
  (*
  object-assign
  (c) Sindre Sorhus
  @license MIT
  *)

vary/index.js:
  (*!
   * vary
   * Copyright(c) 2014-2017 Douglas Christopher Wilson
   * MIT Licensed
   *)

http-proxy/lib/http-proxy/passes/web-outgoing.js:
http-proxy/lib/http-proxy/passes/web-incoming.js:
  (*!
   * Array of passes.
   *
   * A `pass` is just a function that is executed on `req, res, options`
   * so that you can easily add new checks while still keeping the base
   * flexible.
   *)

http-proxy/lib/http-proxy/passes/ws-incoming.js:
  (*!
   * Array of passes.
   *
   * A `pass` is just a function that is executed on `req, socket, options`
   * so that you can easily add new checks while still keeping the base
   * flexible.
   *)

http-proxy/index.js:
  (*!
   * Caron dimonio, con occhi di bragia
   * loro accennando, tutte le raccoglie;
   * batte col remo qualunque s’adagia 
   *
   * Charon the demon, with the eyes of glede,
   * Beckoning to them, collects them all together,
   * Beats with his oar whoever lags behind
   *          
   *          Dante - The Divine Comedy (Canto III)
   *)

is-extglob/index.js:
  (*!
   * is-extglob <https://github.com/jonschlinkert/is-extglob>
   *
   * Copyright (c) 2014-2016, Jon Schlinkert.
   * Licensed under the MIT License.
   *)

is-glob/index.js:
  (*!
   * is-glob <https://github.com/jonschlinkert/is-glob>
   *
   * Copyright (c) 2014-2017, Jon Schlinkert.
   * Released under the MIT License.
   *)

is-number/index.js:
  (*!
   * is-number <https://github.com/jonschlinkert/is-number>
   *
   * Copyright (c) 2014-present, Jon Schlinkert.
   * Released under the MIT License.
   *)

to-regex-range/index.js:
  (*!
   * to-regex-range <https://github.com/micromatch/to-regex-range>
   *
   * Copyright (c) 2015-present, Jon Schlinkert.
   * Released under the MIT License.
   *)

fill-range/index.js:
  (*!
   * fill-range <https://github.com/jonschlinkert/fill-range>
   *
   * Copyright (c) 2014-present, Jon Schlinkert.
   * Licensed under the MIT License.
   *)

is-plain-object/dist/is-plain-object.js:
  (*!
   * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
   *
   * Copyright (c) 2014-2017, Jon Schlinkert.
   * Released under the MIT License.
   *)
*/
