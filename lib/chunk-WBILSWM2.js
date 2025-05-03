import { __commonJS, init_esm_shims, __require, __toESM, __export } from './chunk-VVJSJS3A.js';
import crypto from 'crypto';
import express from 'express';
import require$$1$2 from 'fs';
import require$$0 from 'util';
import require$$1$1 from 'os';
import require$$1 from 'path';
import require$$4 from 'url';
import require$$0$1 from 'constants';
import stream3, { Readable } from 'stream';
import require$$5 from 'assert';
import zlib from 'zlib';
import require$$1$3 from 'net';
import fs4 from 'node:fs';
import path, { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { karinPathBase, karinPathRoot, karinPathTemp } from 'node-karin/root';
import karin, { logger as logger$1, karinPathBase as karinPathBase$1, copyConfigSync, filesByExt, watch, requireFileSync as requireFileSync$1, segment, ffmpeg, ffprobe, render } from 'node-karin';
import YAML from 'node-karin/yaml';
import { Sequelize, DataTypes, Op } from 'sequelize';
import http from 'http';
import https from 'https';
import { EventEmitter } from 'events';
import { pipeline } from 'stream/promises';

// node_modules/.pnpm/color-name@1.1.4/node_modules/color-name/index.js
var require_color_name = __commonJS({
  "node_modules/.pnpm/color-name@1.1.4/node_modules/color-name/index.js"(exports, module) {
    init_esm_shims();
    module.exports = {
      "aliceblue": [240, 248, 255],
      "antiquewhite": [250, 235, 215],
      "aqua": [0, 255, 255],
      "aquamarine": [127, 255, 212],
      "azure": [240, 255, 255],
      "beige": [245, 245, 220],
      "bisque": [255, 228, 196],
      "black": [0, 0, 0],
      "blanchedalmond": [255, 235, 205],
      "blue": [0, 0, 255],
      "blueviolet": [138, 43, 226],
      "brown": [165, 42, 42],
      "burlywood": [222, 184, 135],
      "cadetblue": [95, 158, 160],
      "chartreuse": [127, 255, 0],
      "chocolate": [210, 105, 30],
      "coral": [255, 127, 80],
      "cornflowerblue": [100, 149, 237],
      "cornsilk": [255, 248, 220],
      "crimson": [220, 20, 60],
      "cyan": [0, 255, 255],
      "darkblue": [0, 0, 139],
      "darkcyan": [0, 139, 139],
      "darkgoldenrod": [184, 134, 11],
      "darkgray": [169, 169, 169],
      "darkgreen": [0, 100, 0],
      "darkgrey": [169, 169, 169],
      "darkkhaki": [189, 183, 107],
      "darkmagenta": [139, 0, 139],
      "darkolivegreen": [85, 107, 47],
      "darkorange": [255, 140, 0],
      "darkorchid": [153, 50, 204],
      "darkred": [139, 0, 0],
      "darksalmon": [233, 150, 122],
      "darkseagreen": [143, 188, 143],
      "darkslateblue": [72, 61, 139],
      "darkslategray": [47, 79, 79],
      "darkslategrey": [47, 79, 79],
      "darkturquoise": [0, 206, 209],
      "darkviolet": [148, 0, 211],
      "deeppink": [255, 20, 147],
      "deepskyblue": [0, 191, 255],
      "dimgray": [105, 105, 105],
      "dimgrey": [105, 105, 105],
      "dodgerblue": [30, 144, 255],
      "firebrick": [178, 34, 34],
      "floralwhite": [255, 250, 240],
      "forestgreen": [34, 139, 34],
      "fuchsia": [255, 0, 255],
      "gainsboro": [220, 220, 220],
      "ghostwhite": [248, 248, 255],
      "gold": [255, 215, 0],
      "goldenrod": [218, 165, 32],
      "gray": [128, 128, 128],
      "green": [0, 128, 0],
      "greenyellow": [173, 255, 47],
      "grey": [128, 128, 128],
      "honeydew": [240, 255, 240],
      "hotpink": [255, 105, 180],
      "indianred": [205, 92, 92],
      "indigo": [75, 0, 130],
      "ivory": [255, 255, 240],
      "khaki": [240, 230, 140],
      "lavender": [230, 230, 250],
      "lavenderblush": [255, 240, 245],
      "lawngreen": [124, 252, 0],
      "lemonchiffon": [255, 250, 205],
      "lightblue": [173, 216, 230],
      "lightcoral": [240, 128, 128],
      "lightcyan": [224, 255, 255],
      "lightgoldenrodyellow": [250, 250, 210],
      "lightgray": [211, 211, 211],
      "lightgreen": [144, 238, 144],
      "lightgrey": [211, 211, 211],
      "lightpink": [255, 182, 193],
      "lightsalmon": [255, 160, 122],
      "lightseagreen": [32, 178, 170],
      "lightskyblue": [135, 206, 250],
      "lightslategray": [119, 136, 153],
      "lightslategrey": [119, 136, 153],
      "lightsteelblue": [176, 196, 222],
      "lightyellow": [255, 255, 224],
      "lime": [0, 255, 0],
      "limegreen": [50, 205, 50],
      "linen": [250, 240, 230],
      "magenta": [255, 0, 255],
      "maroon": [128, 0, 0],
      "mediumaquamarine": [102, 205, 170],
      "mediumblue": [0, 0, 205],
      "mediumorchid": [186, 85, 211],
      "mediumpurple": [147, 112, 219],
      "mediumseagreen": [60, 179, 113],
      "mediumslateblue": [123, 104, 238],
      "mediumspringgreen": [0, 250, 154],
      "mediumturquoise": [72, 209, 204],
      "mediumvioletred": [199, 21, 133],
      "midnightblue": [25, 25, 112],
      "mintcream": [245, 255, 250],
      "mistyrose": [255, 228, 225],
      "moccasin": [255, 228, 181],
      "navajowhite": [255, 222, 173],
      "navy": [0, 0, 128],
      "oldlace": [253, 245, 230],
      "olive": [128, 128, 0],
      "olivedrab": [107, 142, 35],
      "orange": [255, 165, 0],
      "orangered": [255, 69, 0],
      "orchid": [218, 112, 214],
      "palegoldenrod": [238, 232, 170],
      "palegreen": [152, 251, 152],
      "paleturquoise": [175, 238, 238],
      "palevioletred": [219, 112, 147],
      "papayawhip": [255, 239, 213],
      "peachpuff": [255, 218, 185],
      "peru": [205, 133, 63],
      "pink": [255, 192, 203],
      "plum": [221, 160, 221],
      "powderblue": [176, 224, 230],
      "purple": [128, 0, 128],
      "rebeccapurple": [102, 51, 153],
      "red": [255, 0, 0],
      "rosybrown": [188, 143, 143],
      "royalblue": [65, 105, 225],
      "saddlebrown": [139, 69, 19],
      "salmon": [250, 128, 114],
      "sandybrown": [244, 164, 96],
      "seagreen": [46, 139, 87],
      "seashell": [255, 245, 238],
      "sienna": [160, 82, 45],
      "silver": [192, 192, 192],
      "skyblue": [135, 206, 235],
      "slateblue": [106, 90, 205],
      "slategray": [112, 128, 144],
      "slategrey": [112, 128, 144],
      "snow": [255, 250, 250],
      "springgreen": [0, 255, 127],
      "steelblue": [70, 130, 180],
      "tan": [210, 180, 140],
      "teal": [0, 128, 128],
      "thistle": [216, 191, 216],
      "tomato": [255, 99, 71],
      "turquoise": [64, 224, 208],
      "violet": [238, 130, 238],
      "wheat": [245, 222, 179],
      "white": [255, 255, 255],
      "whitesmoke": [245, 245, 245],
      "yellow": [255, 255, 0],
      "yellowgreen": [154, 205, 50]
    };
  }
});

// node_modules/.pnpm/color-convert@2.0.1/node_modules/color-convert/conversions.js
var require_conversions = __commonJS({
  "node_modules/.pnpm/color-convert@2.0.1/node_modules/color-convert/conversions.js"(exports, module) {
    init_esm_shims();
    var cssKeywords = require_color_name();
    var reverseKeywords = {};
    for (const key of Object.keys(cssKeywords)) {
      reverseKeywords[cssKeywords[key]] = key;
    }
    var convert = {
      rgb: { channels: 3, labels: "rgb" },
      hsl: { channels: 3, labels: "hsl" },
      hsv: { channels: 3, labels: "hsv" },
      hwb: { channels: 3, labels: "hwb" },
      cmyk: { channels: 4, labels: "cmyk" },
      xyz: { channels: 3, labels: "xyz" },
      lab: { channels: 3, labels: "lab" },
      lch: { channels: 3, labels: "lch" },
      hex: { channels: 1, labels: ["hex"] },
      keyword: { channels: 1, labels: ["keyword"] },
      ansi16: { channels: 1, labels: ["ansi16"] },
      ansi256: { channels: 1, labels: ["ansi256"] },
      hcg: { channels: 3, labels: ["h", "c", "g"] },
      apple: { channels: 3, labels: ["r16", "g16", "b16"] },
      gray: { channels: 1, labels: ["gray"] }
    };
    module.exports = convert;
    for (const model of Object.keys(convert)) {
      if (!("channels" in convert[model])) {
        throw new Error("missing channels property: " + model);
      }
      if (!("labels" in convert[model])) {
        throw new Error("missing channel labels property: " + model);
      }
      if (convert[model].labels.length !== convert[model].channels) {
        throw new Error("channel and label counts mismatch: " + model);
      }
      const { channels, labels } = convert[model];
      delete convert[model].channels;
      delete convert[model].labels;
      Object.defineProperty(convert[model], "channels", { value: channels });
      Object.defineProperty(convert[model], "labels", { value: labels });
    }
    convert.rgb.hsl = function(rgb) {
      const r = rgb[0] / 255;
      const g = rgb[1] / 255;
      const b = rgb[2] / 255;
      const min = Math.min(r, g, b);
      const max = Math.max(r, g, b);
      const delta = max - min;
      let h;
      let s;
      if (max === min) {
        h = 0;
      } else if (r === max) {
        h = (g - b) / delta;
      } else if (g === max) {
        h = 2 + (b - r) / delta;
      } else if (b === max) {
        h = 4 + (r - g) / delta;
      }
      h = Math.min(h * 60, 360);
      if (h < 0) {
        h += 360;
      }
      const l = (min + max) / 2;
      if (max === min) {
        s = 0;
      } else if (l <= 0.5) {
        s = delta / (max + min);
      } else {
        s = delta / (2 - max - min);
      }
      return [h, s * 100, l * 100];
    };
    convert.rgb.hsv = function(rgb) {
      let rdif;
      let gdif;
      let bdif;
      let h;
      let s;
      const r = rgb[0] / 255;
      const g = rgb[1] / 255;
      const b = rgb[2] / 255;
      const v = Math.max(r, g, b);
      const diff = v - Math.min(r, g, b);
      const diffc = function(c) {
        return (v - c) / 6 / diff + 1 / 2;
      };
      if (diff === 0) {
        h = 0;
        s = 0;
      } else {
        s = diff / v;
        rdif = diffc(r);
        gdif = diffc(g);
        bdif = diffc(b);
        if (r === v) {
          h = bdif - gdif;
        } else if (g === v) {
          h = 1 / 3 + rdif - bdif;
        } else if (b === v) {
          h = 2 / 3 + gdif - rdif;
        }
        if (h < 0) {
          h += 1;
        } else if (h > 1) {
          h -= 1;
        }
      }
      return [
        h * 360,
        s * 100,
        v * 100
      ];
    };
    convert.rgb.hwb = function(rgb) {
      const r = rgb[0];
      const g = rgb[1];
      let b = rgb[2];
      const h = convert.rgb.hsl(rgb)[0];
      const w = 1 / 255 * Math.min(r, Math.min(g, b));
      b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));
      return [h, w * 100, b * 100];
    };
    convert.rgb.cmyk = function(rgb) {
      const r = rgb[0] / 255;
      const g = rgb[1] / 255;
      const b = rgb[2] / 255;
      const k = Math.min(1 - r, 1 - g, 1 - b);
      const c = (1 - r - k) / (1 - k) || 0;
      const m = (1 - g - k) / (1 - k) || 0;
      const y = (1 - b - k) / (1 - k) || 0;
      return [c * 100, m * 100, y * 100, k * 100];
    };
    function comparativeDistance(x, y) {
      return (x[0] - y[0]) ** 2 + (x[1] - y[1]) ** 2 + (x[2] - y[2]) ** 2;
    }
    convert.rgb.keyword = function(rgb) {
      const reversed = reverseKeywords[rgb];
      if (reversed) {
        return reversed;
      }
      let currentClosestDistance = Infinity;
      let currentClosestKeyword;
      for (const keyword of Object.keys(cssKeywords)) {
        const value = cssKeywords[keyword];
        const distance = comparativeDistance(rgb, value);
        if (distance < currentClosestDistance) {
          currentClosestDistance = distance;
          currentClosestKeyword = keyword;
        }
      }
      return currentClosestKeyword;
    };
    convert.keyword.rgb = function(keyword) {
      return cssKeywords[keyword];
    };
    convert.rgb.xyz = function(rgb) {
      let r = rgb[0] / 255;
      let g = rgb[1] / 255;
      let b = rgb[2] / 255;
      r = r > 0.04045 ? ((r + 0.055) / 1.055) ** 2.4 : r / 12.92;
      g = g > 0.04045 ? ((g + 0.055) / 1.055) ** 2.4 : g / 12.92;
      b = b > 0.04045 ? ((b + 0.055) / 1.055) ** 2.4 : b / 12.92;
      const x = r * 0.4124 + g * 0.3576 + b * 0.1805;
      const y = r * 0.2126 + g * 0.7152 + b * 0.0722;
      const z = r * 0.0193 + g * 0.1192 + b * 0.9505;
      return [x * 100, y * 100, z * 100];
    };
    convert.rgb.lab = function(rgb) {
      const xyz = convert.rgb.xyz(rgb);
      let x = xyz[0];
      let y = xyz[1];
      let z = xyz[2];
      x /= 95.047;
      y /= 100;
      z /= 108.883;
      x = x > 8856e-6 ? x ** (1 / 3) : 7.787 * x + 16 / 116;
      y = y > 8856e-6 ? y ** (1 / 3) : 7.787 * y + 16 / 116;
      z = z > 8856e-6 ? z ** (1 / 3) : 7.787 * z + 16 / 116;
      const l = 116 * y - 16;
      const a = 500 * (x - y);
      const b = 200 * (y - z);
      return [l, a, b];
    };
    convert.hsl.rgb = function(hsl) {
      const h = hsl[0] / 360;
      const s = hsl[1] / 100;
      const l = hsl[2] / 100;
      let t2;
      let t3;
      let val;
      if (s === 0) {
        val = l * 255;
        return [val, val, val];
      }
      if (l < 0.5) {
        t2 = l * (1 + s);
      } else {
        t2 = l + s - l * s;
      }
      const t1 = 2 * l - t2;
      const rgb = [0, 0, 0];
      for (let i = 0; i < 3; i++) {
        t3 = h + 1 / 3 * -(i - 1);
        if (t3 < 0) {
          t3++;
        }
        if (t3 > 1) {
          t3--;
        }
        if (6 * t3 < 1) {
          val = t1 + (t2 - t1) * 6 * t3;
        } else if (2 * t3 < 1) {
          val = t2;
        } else if (3 * t3 < 2) {
          val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
        } else {
          val = t1;
        }
        rgb[i] = val * 255;
      }
      return rgb;
    };
    convert.hsl.hsv = function(hsl) {
      const h = hsl[0];
      let s = hsl[1] / 100;
      let l = hsl[2] / 100;
      let smin = s;
      const lmin = Math.max(l, 0.01);
      l *= 2;
      s *= l <= 1 ? l : 2 - l;
      smin *= lmin <= 1 ? lmin : 2 - lmin;
      const v = (l + s) / 2;
      const sv = l === 0 ? 2 * smin / (lmin + smin) : 2 * s / (l + s);
      return [h, sv * 100, v * 100];
    };
    convert.hsv.rgb = function(hsv) {
      const h = hsv[0] / 60;
      const s = hsv[1] / 100;
      let v = hsv[2] / 100;
      const hi = Math.floor(h) % 6;
      const f = h - Math.floor(h);
      const p = 255 * v * (1 - s);
      const q = 255 * v * (1 - s * f);
      const t = 255 * v * (1 - s * (1 - f));
      v *= 255;
      switch (hi) {
        case 0:
          return [v, t, p];
        case 1:
          return [q, v, p];
        case 2:
          return [p, v, t];
        case 3:
          return [p, q, v];
        case 4:
          return [t, p, v];
        case 5:
          return [v, p, q];
      }
    };
    convert.hsv.hsl = function(hsv) {
      const h = hsv[0];
      const s = hsv[1] / 100;
      const v = hsv[2] / 100;
      const vmin = Math.max(v, 0.01);
      let sl;
      let l;
      l = (2 - s) * v;
      const lmin = (2 - s) * vmin;
      sl = s * vmin;
      sl /= lmin <= 1 ? lmin : 2 - lmin;
      sl = sl || 0;
      l /= 2;
      return [h, sl * 100, l * 100];
    };
    convert.hwb.rgb = function(hwb) {
      const h = hwb[0] / 360;
      let wh = hwb[1] / 100;
      let bl = hwb[2] / 100;
      const ratio = wh + bl;
      let f;
      if (ratio > 1) {
        wh /= ratio;
        bl /= ratio;
      }
      const i = Math.floor(6 * h);
      const v = 1 - bl;
      f = 6 * h - i;
      if ((i & 1) !== 0) {
        f = 1 - f;
      }
      const n = wh + f * (v - wh);
      let r;
      let g;
      let b;
      switch (i) {
        default:
        case 6:
        case 0:
          r = v;
          g = n;
          b = wh;
          break;
        case 1:
          r = n;
          g = v;
          b = wh;
          break;
        case 2:
          r = wh;
          g = v;
          b = n;
          break;
        case 3:
          r = wh;
          g = n;
          b = v;
          break;
        case 4:
          r = n;
          g = wh;
          b = v;
          break;
        case 5:
          r = v;
          g = wh;
          b = n;
          break;
      }
      return [r * 255, g * 255, b * 255];
    };
    convert.cmyk.rgb = function(cmyk) {
      const c = cmyk[0] / 100;
      const m = cmyk[1] / 100;
      const y = cmyk[2] / 100;
      const k = cmyk[3] / 100;
      const r = 1 - Math.min(1, c * (1 - k) + k);
      const g = 1 - Math.min(1, m * (1 - k) + k);
      const b = 1 - Math.min(1, y * (1 - k) + k);
      return [r * 255, g * 255, b * 255];
    };
    convert.xyz.rgb = function(xyz) {
      const x = xyz[0] / 100;
      const y = xyz[1] / 100;
      const z = xyz[2] / 100;
      let r;
      let g;
      let b;
      r = x * 3.2406 + y * -1.5372 + z * -0.4986;
      g = x * -0.9689 + y * 1.8758 + z * 0.0415;
      b = x * 0.0557 + y * -0.204 + z * 1.057;
      r = r > 31308e-7 ? 1.055 * r ** (1 / 2.4) - 0.055 : r * 12.92;
      g = g > 31308e-7 ? 1.055 * g ** (1 / 2.4) - 0.055 : g * 12.92;
      b = b > 31308e-7 ? 1.055 * b ** (1 / 2.4) - 0.055 : b * 12.92;
      r = Math.min(Math.max(0, r), 1);
      g = Math.min(Math.max(0, g), 1);
      b = Math.min(Math.max(0, b), 1);
      return [r * 255, g * 255, b * 255];
    };
    convert.xyz.lab = function(xyz) {
      let x = xyz[0];
      let y = xyz[1];
      let z = xyz[2];
      x /= 95.047;
      y /= 100;
      z /= 108.883;
      x = x > 8856e-6 ? x ** (1 / 3) : 7.787 * x + 16 / 116;
      y = y > 8856e-6 ? y ** (1 / 3) : 7.787 * y + 16 / 116;
      z = z > 8856e-6 ? z ** (1 / 3) : 7.787 * z + 16 / 116;
      const l = 116 * y - 16;
      const a = 500 * (x - y);
      const b = 200 * (y - z);
      return [l, a, b];
    };
    convert.lab.xyz = function(lab) {
      const l = lab[0];
      const a = lab[1];
      const b = lab[2];
      let x;
      let y;
      let z;
      y = (l + 16) / 116;
      x = a / 500 + y;
      z = y - b / 200;
      const y2 = y ** 3;
      const x2 = x ** 3;
      const z2 = z ** 3;
      y = y2 > 8856e-6 ? y2 : (y - 16 / 116) / 7.787;
      x = x2 > 8856e-6 ? x2 : (x - 16 / 116) / 7.787;
      z = z2 > 8856e-6 ? z2 : (z - 16 / 116) / 7.787;
      x *= 95.047;
      y *= 100;
      z *= 108.883;
      return [x, y, z];
    };
    convert.lab.lch = function(lab) {
      const l = lab[0];
      const a = lab[1];
      const b = lab[2];
      let h;
      const hr = Math.atan2(b, a);
      h = hr * 360 / 2 / Math.PI;
      if (h < 0) {
        h += 360;
      }
      const c = Math.sqrt(a * a + b * b);
      return [l, c, h];
    };
    convert.lch.lab = function(lch) {
      const l = lch[0];
      const c = lch[1];
      const h = lch[2];
      const hr = h / 360 * 2 * Math.PI;
      const a = c * Math.cos(hr);
      const b = c * Math.sin(hr);
      return [l, a, b];
    };
    convert.rgb.ansi16 = function(args, saturation = null) {
      const [r, g, b] = args;
      let value = saturation === null ? convert.rgb.hsv(args)[2] : saturation;
      value = Math.round(value / 50);
      if (value === 0) {
        return 30;
      }
      let ansi = 30 + (Math.round(b / 255) << 2 | Math.round(g / 255) << 1 | Math.round(r / 255));
      if (value === 2) {
        ansi += 60;
      }
      return ansi;
    };
    convert.hsv.ansi16 = function(args) {
      return convert.rgb.ansi16(convert.hsv.rgb(args), args[2]);
    };
    convert.rgb.ansi256 = function(args) {
      const r = args[0];
      const g = args[1];
      const b = args[2];
      if (r === g && g === b) {
        if (r < 8) {
          return 16;
        }
        if (r > 248) {
          return 231;
        }
        return Math.round((r - 8) / 247 * 24) + 232;
      }
      const ansi = 16 + 36 * Math.round(r / 255 * 5) + 6 * Math.round(g / 255 * 5) + Math.round(b / 255 * 5);
      return ansi;
    };
    convert.ansi16.rgb = function(args) {
      let color = args % 10;
      if (color === 0 || color === 7) {
        if (args > 50) {
          color += 3.5;
        }
        color = color / 10.5 * 255;
        return [color, color, color];
      }
      const mult = (~~(args > 50) + 1) * 0.5;
      const r = (color & 1) * mult * 255;
      const g = (color >> 1 & 1) * mult * 255;
      const b = (color >> 2 & 1) * mult * 255;
      return [r, g, b];
    };
    convert.ansi256.rgb = function(args) {
      if (args >= 232) {
        const c = (args - 232) * 10 + 8;
        return [c, c, c];
      }
      args -= 16;
      let rem;
      const r = Math.floor(args / 36) / 5 * 255;
      const g = Math.floor((rem = args % 36) / 6) / 5 * 255;
      const b = rem % 6 / 5 * 255;
      return [r, g, b];
    };
    convert.rgb.hex = function(args) {
      const integer = ((Math.round(args[0]) & 255) << 16) + ((Math.round(args[1]) & 255) << 8) + (Math.round(args[2]) & 255);
      const string = integer.toString(16).toUpperCase();
      return "000000".substring(string.length) + string;
    };
    convert.hex.rgb = function(args) {
      const match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
      if (!match) {
        return [0, 0, 0];
      }
      let colorString = match[0];
      if (match[0].length === 3) {
        colorString = colorString.split("").map((char) => {
          return char + char;
        }).join("");
      }
      const integer = parseInt(colorString, 16);
      const r = integer >> 16 & 255;
      const g = integer >> 8 & 255;
      const b = integer & 255;
      return [r, g, b];
    };
    convert.rgb.hcg = function(rgb) {
      const r = rgb[0] / 255;
      const g = rgb[1] / 255;
      const b = rgb[2] / 255;
      const max = Math.max(Math.max(r, g), b);
      const min = Math.min(Math.min(r, g), b);
      const chroma = max - min;
      let grayscale;
      let hue;
      if (chroma < 1) {
        grayscale = min / (1 - chroma);
      } else {
        grayscale = 0;
      }
      if (chroma <= 0) {
        hue = 0;
      } else if (max === r) {
        hue = (g - b) / chroma % 6;
      } else if (max === g) {
        hue = 2 + (b - r) / chroma;
      } else {
        hue = 4 + (r - g) / chroma;
      }
      hue /= 6;
      hue %= 1;
      return [hue * 360, chroma * 100, grayscale * 100];
    };
    convert.hsl.hcg = function(hsl) {
      const s = hsl[1] / 100;
      const l = hsl[2] / 100;
      const c = l < 0.5 ? 2 * s * l : 2 * s * (1 - l);
      let f = 0;
      if (c < 1) {
        f = (l - 0.5 * c) / (1 - c);
      }
      return [hsl[0], c * 100, f * 100];
    };
    convert.hsv.hcg = function(hsv) {
      const s = hsv[1] / 100;
      const v = hsv[2] / 100;
      const c = s * v;
      let f = 0;
      if (c < 1) {
        f = (v - c) / (1 - c);
      }
      return [hsv[0], c * 100, f * 100];
    };
    convert.hcg.rgb = function(hcg) {
      const h = hcg[0] / 360;
      const c = hcg[1] / 100;
      const g = hcg[2] / 100;
      if (c === 0) {
        return [g * 255, g * 255, g * 255];
      }
      const pure = [0, 0, 0];
      const hi = h % 1 * 6;
      const v = hi % 1;
      const w = 1 - v;
      let mg = 0;
      switch (Math.floor(hi)) {
        case 0:
          pure[0] = 1;
          pure[1] = v;
          pure[2] = 0;
          break;
        case 1:
          pure[0] = w;
          pure[1] = 1;
          pure[2] = 0;
          break;
        case 2:
          pure[0] = 0;
          pure[1] = 1;
          pure[2] = v;
          break;
        case 3:
          pure[0] = 0;
          pure[1] = w;
          pure[2] = 1;
          break;
        case 4:
          pure[0] = v;
          pure[1] = 0;
          pure[2] = 1;
          break;
        default:
          pure[0] = 1;
          pure[1] = 0;
          pure[2] = w;
      }
      mg = (1 - c) * g;
      return [
        (c * pure[0] + mg) * 255,
        (c * pure[1] + mg) * 255,
        (c * pure[2] + mg) * 255
      ];
    };
    convert.hcg.hsv = function(hcg) {
      const c = hcg[1] / 100;
      const g = hcg[2] / 100;
      const v = c + g * (1 - c);
      let f = 0;
      if (v > 0) {
        f = c / v;
      }
      return [hcg[0], f * 100, v * 100];
    };
    convert.hcg.hsl = function(hcg) {
      const c = hcg[1] / 100;
      const g = hcg[2] / 100;
      const l = g * (1 - c) + 0.5 * c;
      let s = 0;
      if (l > 0 && l < 0.5) {
        s = c / (2 * l);
      } else if (l >= 0.5 && l < 1) {
        s = c / (2 * (1 - l));
      }
      return [hcg[0], s * 100, l * 100];
    };
    convert.hcg.hwb = function(hcg) {
      const c = hcg[1] / 100;
      const g = hcg[2] / 100;
      const v = c + g * (1 - c);
      return [hcg[0], (v - c) * 100, (1 - v) * 100];
    };
    convert.hwb.hcg = function(hwb) {
      const w = hwb[1] / 100;
      const b = hwb[2] / 100;
      const v = 1 - b;
      const c = v - w;
      let g = 0;
      if (c < 1) {
        g = (v - c) / (1 - c);
      }
      return [hwb[0], c * 100, g * 100];
    };
    convert.apple.rgb = function(apple) {
      return [apple[0] / 65535 * 255, apple[1] / 65535 * 255, apple[2] / 65535 * 255];
    };
    convert.rgb.apple = function(rgb) {
      return [rgb[0] / 255 * 65535, rgb[1] / 255 * 65535, rgb[2] / 255 * 65535];
    };
    convert.gray.rgb = function(args) {
      return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
    };
    convert.gray.hsl = function(args) {
      return [0, 0, args[0]];
    };
    convert.gray.hsv = convert.gray.hsl;
    convert.gray.hwb = function(gray) {
      return [0, 100, gray[0]];
    };
    convert.gray.cmyk = function(gray) {
      return [0, 0, 0, gray[0]];
    };
    convert.gray.lab = function(gray) {
      return [gray[0], 0, 0];
    };
    convert.gray.hex = function(gray) {
      const val = Math.round(gray[0] / 100 * 255) & 255;
      const integer = (val << 16) + (val << 8) + val;
      const string = integer.toString(16).toUpperCase();
      return "000000".substring(string.length) + string;
    };
    convert.rgb.gray = function(rgb) {
      const val = (rgb[0] + rgb[1] + rgb[2]) / 3;
      return [val / 255 * 100];
    };
  }
});

// node_modules/.pnpm/color-convert@2.0.1/node_modules/color-convert/route.js
var require_route = __commonJS({
  "node_modules/.pnpm/color-convert@2.0.1/node_modules/color-convert/route.js"(exports, module) {
    init_esm_shims();
    var conversions = require_conversions();
    function buildGraph() {
      const graph = {};
      const models = Object.keys(conversions);
      for (let len = models.length, i = 0; i < len; i++) {
        graph[models[i]] = {
          // http://jsperf.com/1-vs-infinity
          // micro-opt, but this is simple.
          distance: -1,
          parent: null
        };
      }
      return graph;
    }
    function deriveBFS(fromModel) {
      const graph = buildGraph();
      const queue = [fromModel];
      graph[fromModel].distance = 0;
      while (queue.length) {
        const current = queue.pop();
        const adjacents = Object.keys(conversions[current]);
        for (let len = adjacents.length, i = 0; i < len; i++) {
          const adjacent = adjacents[i];
          const node = graph[adjacent];
          if (node.distance === -1) {
            node.distance = graph[current].distance + 1;
            node.parent = current;
            queue.unshift(adjacent);
          }
        }
      }
      return graph;
    }
    function link2(from, to) {
      return function(args) {
        return to(from(args));
      };
    }
    function wrapConversion(toModel, graph) {
      const path3 = [graph[toModel].parent, toModel];
      let fn = conversions[graph[toModel].parent][toModel];
      let cur = graph[toModel].parent;
      while (graph[cur].parent) {
        path3.unshift(graph[cur].parent);
        fn = link2(conversions[graph[cur].parent][cur], fn);
        cur = graph[cur].parent;
      }
      fn.conversion = path3;
      return fn;
    }
    module.exports = function(fromModel) {
      const graph = deriveBFS(fromModel);
      const conversion = {};
      const models = Object.keys(graph);
      for (let len = models.length, i = 0; i < len; i++) {
        const toModel = models[i];
        const node = graph[toModel];
        if (node.parent === null) {
          continue;
        }
        conversion[toModel] = wrapConversion(toModel, graph);
      }
      return conversion;
    };
  }
});

// node_modules/.pnpm/color-convert@2.0.1/node_modules/color-convert/index.js
var require_color_convert = __commonJS({
  "node_modules/.pnpm/color-convert@2.0.1/node_modules/color-convert/index.js"(exports, module) {
    init_esm_shims();
    var conversions = require_conversions();
    var route = require_route();
    var convert = {};
    var models = Object.keys(conversions);
    function wrapRaw(fn) {
      const wrappedFn = function(...args) {
        const arg0 = args[0];
        if (arg0 === void 0 || arg0 === null) {
          return arg0;
        }
        if (arg0.length > 1) {
          args = arg0;
        }
        return fn(args);
      };
      if ("conversion" in fn) {
        wrappedFn.conversion = fn.conversion;
      }
      return wrappedFn;
    }
    function wrapRounded(fn) {
      const wrappedFn = function(...args) {
        const arg0 = args[0];
        if (arg0 === void 0 || arg0 === null) {
          return arg0;
        }
        if (arg0.length > 1) {
          args = arg0;
        }
        const result = fn(args);
        if (typeof result === "object") {
          for (let len = result.length, i = 0; i < len; i++) {
            result[i] = Math.round(result[i]);
          }
        }
        return result;
      };
      if ("conversion" in fn) {
        wrappedFn.conversion = fn.conversion;
      }
      return wrappedFn;
    }
    models.forEach((fromModel) => {
      convert[fromModel] = {};
      Object.defineProperty(convert[fromModel], "channels", { value: conversions[fromModel].channels });
      Object.defineProperty(convert[fromModel], "labels", { value: conversions[fromModel].labels });
      const routes = route(fromModel);
      const routeModels = Object.keys(routes);
      routeModels.forEach((toModel) => {
        const fn = routes[toModel];
        convert[fromModel][toModel] = wrapRounded(fn);
        convert[fromModel][toModel].raw = wrapRaw(fn);
      });
    });
    module.exports = convert;
  }
});

// node_modules/.pnpm/ansi-styles@4.3.0/node_modules/ansi-styles/index.js
var require_ansi_styles = __commonJS({
  "node_modules/.pnpm/ansi-styles@4.3.0/node_modules/ansi-styles/index.js"(exports, module) {
    init_esm_shims();
    var wrapAnsi16 = (fn, offset) => (...args) => {
      const code = fn(...args);
      return `\x1B[${code + offset}m`;
    };
    var wrapAnsi256 = (fn, offset) => (...args) => {
      const code = fn(...args);
      return `\x1B[${38 + offset};5;${code}m`;
    };
    var wrapAnsi16m = (fn, offset) => (...args) => {
      const rgb = fn(...args);
      return `\x1B[${38 + offset};2;${rgb[0]};${rgb[1]};${rgb[2]}m`;
    };
    var ansi2ansi = (n) => n;
    var rgb2rgb = (r, g, b) => [r, g, b];
    var setLazyProperty = (object, property, get) => {
      Object.defineProperty(object, property, {
        get: () => {
          const value = get();
          Object.defineProperty(object, property, {
            value,
            enumerable: true,
            configurable: true
          });
          return value;
        },
        enumerable: true,
        configurable: true
      });
    };
    var colorConvert;
    var makeDynamicStyles = (wrap, targetSpace, identity, isBackground) => {
      if (colorConvert === void 0) {
        colorConvert = require_color_convert();
      }
      const offset = isBackground ? 10 : 0;
      const styles = {};
      for (const [sourceSpace, suite] of Object.entries(colorConvert)) {
        const name = sourceSpace === "ansi16" ? "ansi" : sourceSpace;
        if (sourceSpace === targetSpace) {
          styles[name] = wrap(identity, offset);
        } else if (typeof suite === "object") {
          styles[name] = wrap(suite[targetSpace], offset);
        }
      }
      return styles;
    };
    function assembleStyles() {
      const codes = /* @__PURE__ */ new Map();
      const styles = {
        modifier: {
          reset: [0, 0],
          // 21 isn't widely supported and 22 does the same thing
          bold: [1, 22],
          dim: [2, 22],
          italic: [3, 23],
          underline: [4, 24],
          inverse: [7, 27],
          hidden: [8, 28],
          strikethrough: [9, 29]
        },
        color: {
          black: [30, 39],
          red: [31, 39],
          green: [32, 39],
          yellow: [33, 39],
          blue: [34, 39],
          magenta: [35, 39],
          cyan: [36, 39],
          white: [37, 39],
          // Bright color
          blackBright: [90, 39],
          redBright: [91, 39],
          greenBright: [92, 39],
          yellowBright: [93, 39],
          blueBright: [94, 39],
          magentaBright: [95, 39],
          cyanBright: [96, 39],
          whiteBright: [97, 39]
        },
        bgColor: {
          bgBlack: [40, 49],
          bgRed: [41, 49],
          bgGreen: [42, 49],
          bgYellow: [43, 49],
          bgBlue: [44, 49],
          bgMagenta: [45, 49],
          bgCyan: [46, 49],
          bgWhite: [47, 49],
          // Bright color
          bgBlackBright: [100, 49],
          bgRedBright: [101, 49],
          bgGreenBright: [102, 49],
          bgYellowBright: [103, 49],
          bgBlueBright: [104, 49],
          bgMagentaBright: [105, 49],
          bgCyanBright: [106, 49],
          bgWhiteBright: [107, 49]
        }
      };
      styles.color.gray = styles.color.blackBright;
      styles.bgColor.bgGray = styles.bgColor.bgBlackBright;
      styles.color.grey = styles.color.blackBright;
      styles.bgColor.bgGrey = styles.bgColor.bgBlackBright;
      for (const [groupName, group] of Object.entries(styles)) {
        for (const [styleName, style] of Object.entries(group)) {
          styles[styleName] = {
            open: `\x1B[${style[0]}m`,
            close: `\x1B[${style[1]}m`
          };
          group[styleName] = styles[styleName];
          codes.set(style[0], style[1]);
        }
        Object.defineProperty(styles, groupName, {
          value: group,
          enumerable: false
        });
      }
      Object.defineProperty(styles, "codes", {
        value: codes,
        enumerable: false
      });
      styles.color.close = "\x1B[39m";
      styles.bgColor.close = "\x1B[49m";
      setLazyProperty(styles.color, "ansi", () => makeDynamicStyles(wrapAnsi16, "ansi16", ansi2ansi, false));
      setLazyProperty(styles.color, "ansi256", () => makeDynamicStyles(wrapAnsi256, "ansi256", ansi2ansi, false));
      setLazyProperty(styles.color, "ansi16m", () => makeDynamicStyles(wrapAnsi16m, "rgb", rgb2rgb, false));
      setLazyProperty(styles.bgColor, "ansi", () => makeDynamicStyles(wrapAnsi16, "ansi16", ansi2ansi, true));
      setLazyProperty(styles.bgColor, "ansi256", () => makeDynamicStyles(wrapAnsi256, "ansi256", ansi2ansi, true));
      setLazyProperty(styles.bgColor, "ansi16m", () => makeDynamicStyles(wrapAnsi16m, "rgb", rgb2rgb, true));
      return styles;
    }
    Object.defineProperty(module, "exports", {
      enumerable: true,
      get: assembleStyles
    });
  }
});

// node_modules/.pnpm/has-flag@4.0.0/node_modules/has-flag/index.js
var require_has_flag = __commonJS({
  "node_modules/.pnpm/has-flag@4.0.0/node_modules/has-flag/index.js"(exports, module) {
    init_esm_shims();
    module.exports = (flag, argv = process.argv) => {
      const prefix = flag.startsWith("-") ? "" : flag.length === 1 ? "-" : "--";
      const position = argv.indexOf(prefix + flag);
      const terminatorPosition = argv.indexOf("--");
      return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
    };
  }
});

// node_modules/.pnpm/supports-color@7.2.0/node_modules/supports-color/index.js
var require_supports_color = __commonJS({
  "node_modules/.pnpm/supports-color@7.2.0/node_modules/supports-color/index.js"(exports, module) {
    init_esm_shims();
    var os = __require("os");
    var tty = __require("tty");
    var hasFlag = require_has_flag();
    var { env } = process;
    var forceColor;
    if (hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false") || hasFlag("color=never")) {
      forceColor = 0;
    } else if (hasFlag("color") || hasFlag("colors") || hasFlag("color=true") || hasFlag("color=always")) {
      forceColor = 1;
    }
    if ("FORCE_COLOR" in env) {
      if (env.FORCE_COLOR === "true") {
        forceColor = 1;
      } else if (env.FORCE_COLOR === "false") {
        forceColor = 0;
      } else {
        forceColor = env.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(env.FORCE_COLOR, 10), 3);
      }
    }
    function translateLevel(level) {
      if (level === 0) {
        return false;
      }
      return {
        level,
        hasBasic: true,
        has256: level >= 2,
        has16m: level >= 3
      };
    }
    function supportsColor(haveStream, streamIsTTY) {
      if (forceColor === 0) {
        return 0;
      }
      if (hasFlag("color=16m") || hasFlag("color=full") || hasFlag("color=truecolor")) {
        return 3;
      }
      if (hasFlag("color=256")) {
        return 2;
      }
      if (haveStream && !streamIsTTY && forceColor === void 0) {
        return 0;
      }
      const min = forceColor || 0;
      if (env.TERM === "dumb") {
        return min;
      }
      if (process.platform === "win32") {
        const osRelease = os.release().split(".");
        if (Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
          return Number(osRelease[2]) >= 14931 ? 3 : 2;
        }
        return 1;
      }
      if ("CI" in env) {
        if (["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some((sign) => sign in env) || env.CI_NAME === "codeship") {
          return 1;
        }
        return min;
      }
      if ("TEAMCITY_VERSION" in env) {
        return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
      }
      if (env.COLORTERM === "truecolor") {
        return 3;
      }
      if ("TERM_PROGRAM" in env) {
        const version = parseInt((env.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
        switch (env.TERM_PROGRAM) {
          case "iTerm.app":
            return version >= 3 ? 3 : 2;
          case "Apple_Terminal":
            return 2;
        }
      }
      if (/-256(color)?$/i.test(env.TERM)) {
        return 2;
      }
      if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
        return 1;
      }
      if ("COLORTERM" in env) {
        return 1;
      }
      return min;
    }
    function getSupportLevel(stream4) {
      const level = supportsColor(stream4, stream4 && stream4.isTTY);
      return translateLevel(level);
    }
    module.exports = {
      supportsColor: getSupportLevel,
      stdout: translateLevel(supportsColor(true, tty.isatty(1))),
      stderr: translateLevel(supportsColor(true, tty.isatty(2)))
    };
  }
});

// node_modules/.pnpm/chalk@4.1.2/node_modules/chalk/source/util.js
var require_util = __commonJS({
  "node_modules/.pnpm/chalk@4.1.2/node_modules/chalk/source/util.js"(exports, module) {
    init_esm_shims();
    var stringReplaceAll = (string, substring, replacer) => {
      let index = string.indexOf(substring);
      if (index === -1) {
        return string;
      }
      const substringLength = substring.length;
      let endIndex = 0;
      let returnValue = "";
      do {
        returnValue += string.substr(endIndex, index - endIndex) + substring + replacer;
        endIndex = index + substringLength;
        index = string.indexOf(substring, endIndex);
      } while (index !== -1);
      returnValue += string.substr(endIndex);
      return returnValue;
    };
    var stringEncaseCRLFWithFirstIndex = (string, prefix, postfix, index) => {
      let endIndex = 0;
      let returnValue = "";
      do {
        const gotCR = string[index - 1] === "\r";
        returnValue += string.substr(endIndex, (gotCR ? index - 1 : index) - endIndex) + prefix + (gotCR ? "\r\n" : "\n") + postfix;
        endIndex = index + 1;
        index = string.indexOf("\n", endIndex);
      } while (index !== -1);
      returnValue += string.substr(endIndex);
      return returnValue;
    };
    module.exports = {
      stringReplaceAll,
      stringEncaseCRLFWithFirstIndex
    };
  }
});

// node_modules/.pnpm/chalk@4.1.2/node_modules/chalk/source/templates.js
var require_templates = __commonJS({
  "node_modules/.pnpm/chalk@4.1.2/node_modules/chalk/source/templates.js"(exports, module) {
    init_esm_shims();
    var TEMPLATE_REGEX = /(?:\\(u(?:[a-f\d]{4}|\{[a-f\d]{1,6}\})|x[a-f\d]{2}|.))|(?:\{(~)?(\w+(?:\([^)]*\))?(?:\.\w+(?:\([^)]*\))?)*)(?:[ \t]|(?=\r?\n)))|(\})|((?:.|[\r\n\f])+?)/gi;
    var STYLE_REGEX = /(?:^|\.)(\w+)(?:\(([^)]*)\))?/g;
    var STRING_REGEX = /^(['"])((?:\\.|(?!\1)[^\\])*)\1$/;
    var ESCAPE_REGEX = /\\(u(?:[a-f\d]{4}|{[a-f\d]{1,6}})|x[a-f\d]{2}|.)|([^\\])/gi;
    var ESCAPES = /* @__PURE__ */ new Map([
      ["n", "\n"],
      ["r", "\r"],
      ["t", "	"],
      ["b", "\b"],
      ["f", "\f"],
      ["v", "\v"],
      ["0", "\0"],
      ["\\", "\\"],
      ["e", "\x1B"],
      ["a", "\x07"]
    ]);
    function unescape2(c) {
      const u = c[0] === "u";
      const bracket = c[1] === "{";
      if (u && !bracket && c.length === 5 || c[0] === "x" && c.length === 3) {
        return String.fromCharCode(parseInt(c.slice(1), 16));
      }
      if (u && bracket) {
        return String.fromCodePoint(parseInt(c.slice(2, -1), 16));
      }
      return ESCAPES.get(c) || c;
    }
    function parseArguments(name, arguments_) {
      const results = [];
      const chunks = arguments_.trim().split(/\s*,\s*/g);
      let matches;
      for (const chunk of chunks) {
        const number = Number(chunk);
        if (!Number.isNaN(number)) {
          results.push(number);
        } else if (matches = chunk.match(STRING_REGEX)) {
          results.push(matches[2].replace(ESCAPE_REGEX, (m, escape, character) => escape ? unescape2(escape) : character));
        } else {
          throw new Error(`Invalid Chalk template style argument: ${chunk} (in style '${name}')`);
        }
      }
      return results;
    }
    function parseStyle(style) {
      STYLE_REGEX.lastIndex = 0;
      const results = [];
      let matches;
      while ((matches = STYLE_REGEX.exec(style)) !== null) {
        const name = matches[1];
        if (matches[2]) {
          const args = parseArguments(name, matches[2]);
          results.push([name].concat(args));
        } else {
          results.push([name]);
        }
      }
      return results;
    }
    function buildStyle(chalk2, styles) {
      const enabled = {};
      for (const layer of styles) {
        for (const style of layer.styles) {
          enabled[style[0]] = layer.inverse ? null : style.slice(1);
        }
      }
      let current = chalk2;
      for (const [styleName, styles2] of Object.entries(enabled)) {
        if (!Array.isArray(styles2)) {
          continue;
        }
        if (!(styleName in current)) {
          throw new Error(`Unknown Chalk style: ${styleName}`);
        }
        current = styles2.length > 0 ? current[styleName](...styles2) : current[styleName];
      }
      return current;
    }
    module.exports = (chalk2, temporary) => {
      const styles = [];
      const chunks = [];
      let chunk = [];
      temporary.replace(TEMPLATE_REGEX, (m, escapeCharacter, inverse, style, close, character) => {
        if (escapeCharacter) {
          chunk.push(unescape2(escapeCharacter));
        } else if (style) {
          const string = chunk.join("");
          chunk = [];
          chunks.push(styles.length === 0 ? string : buildStyle(chalk2, styles)(string));
          styles.push({ inverse, styles: parseStyle(style) });
        } else if (close) {
          if (styles.length === 0) {
            throw new Error("Found extraneous } in Chalk template literal");
          }
          chunks.push(buildStyle(chalk2, styles)(chunk.join("")));
          chunk = [];
          styles.pop();
        } else {
          chunk.push(character);
        }
      });
      chunks.push(chunk.join(""));
      if (styles.length > 0) {
        const errMessage = `Chalk template literal is missing ${styles.length} closing bracket${styles.length === 1 ? "" : "s"} (\`}\`)`;
        throw new Error(errMessage);
      }
      return chunks.join("");
    };
  }
});

// node_modules/.pnpm/chalk@4.1.2/node_modules/chalk/source/index.js
var require_source = __commonJS({
  "node_modules/.pnpm/chalk@4.1.2/node_modules/chalk/source/index.js"(exports, module) {
    init_esm_shims();
    var ansiStyles = require_ansi_styles();
    var { stdout: stdoutColor, stderr: stderrColor } = require_supports_color();
    var {
      stringReplaceAll,
      stringEncaseCRLFWithFirstIndex
    } = require_util();
    var { isArray: isArray3 } = Array;
    var levelMapping = [
      "ansi",
      "ansi",
      "ansi256",
      "ansi16m"
    ];
    var styles = /* @__PURE__ */ Object.create(null);
    var applyOptions = (object, options = {}) => {
      if (options.level && !(Number.isInteger(options.level) && options.level >= 0 && options.level <= 3)) {
        throw new Error("The `level` option should be an integer from 0 to 3");
      }
      const colorLevel = stdoutColor ? stdoutColor.level : 0;
      object.level = options.level === void 0 ? colorLevel : options.level;
    };
    var ChalkClass = class {
      constructor(options) {
        return chalkFactory(options);
      }
    };
    var chalkFactory = (options) => {
      const chalk3 = {};
      applyOptions(chalk3, options);
      chalk3.template = (...arguments_) => chalkTag(chalk3.template, ...arguments_);
      Object.setPrototypeOf(chalk3, Chalk.prototype);
      Object.setPrototypeOf(chalk3.template, chalk3);
      chalk3.template.constructor = () => {
        throw new Error("`chalk.constructor()` is deprecated. Use `new chalk.Instance()` instead.");
      };
      chalk3.template.Instance = ChalkClass;
      return chalk3.template;
    };
    function Chalk(options) {
      return chalkFactory(options);
    }
    for (const [styleName, style] of Object.entries(ansiStyles)) {
      styles[styleName] = {
        get() {
          const builder = createBuilder(this, createStyler(style.open, style.close, this._styler), this._isEmpty);
          Object.defineProperty(this, styleName, { value: builder });
          return builder;
        }
      };
    }
    styles.visible = {
      get() {
        const builder = createBuilder(this, this._styler, true);
        Object.defineProperty(this, "visible", { value: builder });
        return builder;
      }
    };
    var usedModels = ["rgb", "hex", "keyword", "hsl", "hsv", "hwb", "ansi", "ansi256"];
    for (const model of usedModels) {
      styles[model] = {
        get() {
          const { level } = this;
          return function(...arguments_) {
            const styler = createStyler(ansiStyles.color[levelMapping[level]][model](...arguments_), ansiStyles.color.close, this._styler);
            return createBuilder(this, styler, this._isEmpty);
          };
        }
      };
    }
    for (const model of usedModels) {
      const bgModel = "bg" + model[0].toUpperCase() + model.slice(1);
      styles[bgModel] = {
        get() {
          const { level } = this;
          return function(...arguments_) {
            const styler = createStyler(ansiStyles.bgColor[levelMapping[level]][model](...arguments_), ansiStyles.bgColor.close, this._styler);
            return createBuilder(this, styler, this._isEmpty);
          };
        }
      };
    }
    var proto = Object.defineProperties(() => {
    }, {
      ...styles,
      level: {
        enumerable: true,
        get() {
          return this._generator.level;
        },
        set(level) {
          this._generator.level = level;
        }
      }
    });
    var createStyler = (open, close, parent) => {
      let openAll;
      let closeAll;
      if (parent === void 0) {
        openAll = open;
        closeAll = close;
      } else {
        openAll = parent.openAll + open;
        closeAll = close + parent.closeAll;
      }
      return {
        open,
        close,
        openAll,
        closeAll,
        parent
      };
    };
    var createBuilder = (self2, _styler, _isEmpty) => {
      const builder = (...arguments_) => {
        if (isArray3(arguments_[0]) && isArray3(arguments_[0].raw)) {
          return applyStyle(builder, chalkTag(builder, ...arguments_));
        }
        return applyStyle(builder, arguments_.length === 1 ? "" + arguments_[0] : arguments_.join(" "));
      };
      Object.setPrototypeOf(builder, proto);
      builder._generator = self2;
      builder._styler = _styler;
      builder._isEmpty = _isEmpty;
      return builder;
    };
    var applyStyle = (self2, string) => {
      if (self2.level <= 0 || !string) {
        return self2._isEmpty ? "" : string;
      }
      let styler = self2._styler;
      if (styler === void 0) {
        return string;
      }
      const { openAll, closeAll } = styler;
      if (string.indexOf("\x1B") !== -1) {
        while (styler !== void 0) {
          string = stringReplaceAll(string, styler.close, styler.open);
          styler = styler.parent;
        }
      }
      const lfIndex = string.indexOf("\n");
      if (lfIndex !== -1) {
        string = stringEncaseCRLFWithFirstIndex(string, closeAll, openAll, lfIndex);
      }
      return openAll + string + closeAll;
    };
    var template;
    var chalkTag = (chalk3, ...strings) => {
      const [firstString] = strings;
      if (!isArray3(firstString) || !isArray3(firstString.raw)) {
        return strings.join(" ");
      }
      const arguments_ = strings.slice(1);
      const parts = [firstString.raw[0]];
      for (let i = 1; i < firstString.length; i++) {
        parts.push(
          String(arguments_[i - 1]).replace(/[{}\\]/g, "\\$&"),
          String(firstString.raw[i])
        );
      }
      if (template === void 0) {
        template = require_templates();
      }
      return template(chalk3, parts.join(""));
    };
    Object.defineProperties(Chalk.prototype, styles);
    var chalk2 = Chalk();
    chalk2.supportsColor = stdoutColor;
    chalk2.stderr = Chalk({ level: stderrColor ? stderrColor.level : 0 });
    chalk2.stderr.supportsColor = stderrColor;
    module.exports = chalk2;
  }
});

// node_modules/.pnpm/delayed-stream@1.0.0/node_modules/delayed-stream/lib/delayed_stream.js
var require_delayed_stream = __commonJS({
  "node_modules/.pnpm/delayed-stream@1.0.0/node_modules/delayed-stream/lib/delayed_stream.js"(exports, module) {
    init_esm_shims();
    var Stream = __require("stream").Stream;
    var util3 = __require("util");
    module.exports = DelayedStream;
    function DelayedStream() {
      this.source = null;
      this.dataSize = 0;
      this.maxDataSize = 1024 * 1024;
      this.pauseStream = true;
      this._maxDataSizeExceeded = false;
      this._released = false;
      this._bufferedEvents = [];
    }
    util3.inherits(DelayedStream, Stream);
    DelayedStream.create = function(source, options) {
      var delayedStream = new this();
      options = options || {};
      for (var option in options) {
        delayedStream[option] = options[option];
      }
      delayedStream.source = source;
      var realEmit = source.emit;
      source.emit = function() {
        delayedStream._handleEmit(arguments);
        return realEmit.apply(source, arguments);
      };
      source.on("error", function() {
      });
      if (delayedStream.pauseStream) {
        source.pause();
      }
      return delayedStream;
    };
    Object.defineProperty(DelayedStream.prototype, "readable", {
      configurable: true,
      enumerable: true,
      get: function() {
        return this.source.readable;
      }
    });
    DelayedStream.prototype.setEncoding = function() {
      return this.source.setEncoding.apply(this.source, arguments);
    };
    DelayedStream.prototype.resume = function() {
      if (!this._released) {
        this.release();
      }
      this.source.resume();
    };
    DelayedStream.prototype.pause = function() {
      this.source.pause();
    };
    DelayedStream.prototype.release = function() {
      this._released = true;
      this._bufferedEvents.forEach(function(args) {
        this.emit.apply(this, args);
      }.bind(this));
      this._bufferedEvents = [];
    };
    DelayedStream.prototype.pipe = function() {
      var r = Stream.prototype.pipe.apply(this, arguments);
      this.resume();
      return r;
    };
    DelayedStream.prototype._handleEmit = function(args) {
      if (this._released) {
        this.emit.apply(this, args);
        return;
      }
      if (args[0] === "data") {
        this.dataSize += args[1].length;
        this._checkIfMaxDataSizeExceeded();
      }
      this._bufferedEvents.push(args);
    };
    DelayedStream.prototype._checkIfMaxDataSizeExceeded = function() {
      if (this._maxDataSizeExceeded) {
        return;
      }
      if (this.dataSize <= this.maxDataSize) {
        return;
      }
      this._maxDataSizeExceeded = true;
      var message = "DelayedStream#maxDataSize of " + this.maxDataSize + " bytes exceeded.";
      this.emit("error", new Error(message));
    };
  }
});

// node_modules/.pnpm/combined-stream@1.0.8/node_modules/combined-stream/lib/combined_stream.js
var require_combined_stream = __commonJS({
  "node_modules/.pnpm/combined-stream@1.0.8/node_modules/combined-stream/lib/combined_stream.js"(exports, module) {
    init_esm_shims();
    var util3 = __require("util");
    var Stream = __require("stream").Stream;
    var DelayedStream = require_delayed_stream();
    module.exports = CombinedStream;
    function CombinedStream() {
      this.writable = false;
      this.readable = true;
      this.dataSize = 0;
      this.maxDataSize = 2 * 1024 * 1024;
      this.pauseStreams = true;
      this._released = false;
      this._streams = [];
      this._currentStream = null;
      this._insideLoop = false;
      this._pendingNext = false;
    }
    util3.inherits(CombinedStream, Stream);
    CombinedStream.create = function(options) {
      var combinedStream = new this();
      options = options || {};
      for (var option in options) {
        combinedStream[option] = options[option];
      }
      return combinedStream;
    };
    CombinedStream.isStreamLike = function(stream4) {
      return typeof stream4 !== "function" && typeof stream4 !== "string" && typeof stream4 !== "boolean" && typeof stream4 !== "number" && !Buffer.isBuffer(stream4);
    };
    CombinedStream.prototype.append = function(stream4) {
      var isStreamLike = CombinedStream.isStreamLike(stream4);
      if (isStreamLike) {
        if (!(stream4 instanceof DelayedStream)) {
          var newStream = DelayedStream.create(stream4, {
            maxDataSize: Infinity,
            pauseStream: this.pauseStreams
          });
          stream4.on("data", this._checkDataSize.bind(this));
          stream4 = newStream;
        }
        this._handleErrors(stream4);
        if (this.pauseStreams) {
          stream4.pause();
        }
      }
      this._streams.push(stream4);
      return this;
    };
    CombinedStream.prototype.pipe = function(dest, options) {
      Stream.prototype.pipe.call(this, dest, options);
      this.resume();
      return dest;
    };
    CombinedStream.prototype._getNext = function() {
      this._currentStream = null;
      if (this._insideLoop) {
        this._pendingNext = true;
        return;
      }
      this._insideLoop = true;
      try {
        do {
          this._pendingNext = false;
          this._realGetNext();
        } while (this._pendingNext);
      } finally {
        this._insideLoop = false;
      }
    };
    CombinedStream.prototype._realGetNext = function() {
      var stream4 = this._streams.shift();
      if (typeof stream4 == "undefined") {
        this.end();
        return;
      }
      if (typeof stream4 !== "function") {
        this._pipeNext(stream4);
        return;
      }
      var getStream = stream4;
      getStream(function(stream5) {
        var isStreamLike = CombinedStream.isStreamLike(stream5);
        if (isStreamLike) {
          stream5.on("data", this._checkDataSize.bind(this));
          this._handleErrors(stream5);
        }
        this._pipeNext(stream5);
      }.bind(this));
    };
    CombinedStream.prototype._pipeNext = function(stream4) {
      this._currentStream = stream4;
      var isStreamLike = CombinedStream.isStreamLike(stream4);
      if (isStreamLike) {
        stream4.on("end", this._getNext.bind(this));
        stream4.pipe(this, { end: false });
        return;
      }
      var value = stream4;
      this.write(value);
      this._getNext();
    };
    CombinedStream.prototype._handleErrors = function(stream4) {
      var self2 = this;
      stream4.on("error", function(err) {
        self2._emitError(err);
      });
    };
    CombinedStream.prototype.write = function(data2) {
      this.emit("data", data2);
    };
    CombinedStream.prototype.pause = function() {
      if (!this.pauseStreams) {
        return;
      }
      if (this.pauseStreams && this._currentStream && typeof this._currentStream.pause == "function") this._currentStream.pause();
      this.emit("pause");
    };
    CombinedStream.prototype.resume = function() {
      if (!this._released) {
        this._released = true;
        this.writable = true;
        this._getNext();
      }
      if (this.pauseStreams && this._currentStream && typeof this._currentStream.resume == "function") this._currentStream.resume();
      this.emit("resume");
    };
    CombinedStream.prototype.end = function() {
      this._reset();
      this.emit("end");
    };
    CombinedStream.prototype.destroy = function() {
      this._reset();
      this.emit("close");
    };
    CombinedStream.prototype._reset = function() {
      this.writable = false;
      this._streams = [];
      this._currentStream = null;
    };
    CombinedStream.prototype._checkDataSize = function() {
      this._updateDataSize();
      if (this.dataSize <= this.maxDataSize) {
        return;
      }
      var message = "DelayedStream#maxDataSize of " + this.maxDataSize + " bytes exceeded.";
      this._emitError(new Error(message));
    };
    CombinedStream.prototype._updateDataSize = function() {
      this.dataSize = 0;
      var self2 = this;
      this._streams.forEach(function(stream4) {
        if (!stream4.dataSize) {
          return;
        }
        self2.dataSize += stream4.dataSize;
      });
      if (this._currentStream && this._currentStream.dataSize) {
        this.dataSize += this._currentStream.dataSize;
      }
    };
    CombinedStream.prototype._emitError = function(err) {
      this._reset();
      this.emit("error", err);
    };
  }
});

// node_modules/.pnpm/mime-db@1.52.0/node_modules/mime-db/db.json
var require_db = __commonJS({
  "node_modules/.pnpm/mime-db@1.52.0/node_modules/mime-db/db.json"(exports, module) {
    module.exports = {
      "application/1d-interleaved-parityfec": {
        source: "iana"
      },
      "application/3gpdash-qoe-report+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/3gpp-ims+xml": {
        source: "iana",
        compressible: true
      },
      "application/3gpphal+json": {
        source: "iana",
        compressible: true
      },
      "application/3gpphalforms+json": {
        source: "iana",
        compressible: true
      },
      "application/a2l": {
        source: "iana"
      },
      "application/ace+cbor": {
        source: "iana"
      },
      "application/activemessage": {
        source: "iana"
      },
      "application/activity+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-costmap+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-costmapfilter+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-directory+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-endpointcost+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-endpointcostparams+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-endpointprop+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-endpointpropparams+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-error+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-networkmap+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-networkmapfilter+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-updatestreamcontrol+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-updatestreamparams+json": {
        source: "iana",
        compressible: true
      },
      "application/aml": {
        source: "iana"
      },
      "application/andrew-inset": {
        source: "iana",
        extensions: ["ez"]
      },
      "application/applefile": {
        source: "iana"
      },
      "application/applixware": {
        source: "apache",
        extensions: ["aw"]
      },
      "application/at+jwt": {
        source: "iana"
      },
      "application/atf": {
        source: "iana"
      },
      "application/atfx": {
        source: "iana"
      },
      "application/atom+xml": {
        source: "iana",
        compressible: true,
        extensions: ["atom"]
      },
      "application/atomcat+xml": {
        source: "iana",
        compressible: true,
        extensions: ["atomcat"]
      },
      "application/atomdeleted+xml": {
        source: "iana",
        compressible: true,
        extensions: ["atomdeleted"]
      },
      "application/atomicmail": {
        source: "iana"
      },
      "application/atomsvc+xml": {
        source: "iana",
        compressible: true,
        extensions: ["atomsvc"]
      },
      "application/atsc-dwd+xml": {
        source: "iana",
        compressible: true,
        extensions: ["dwd"]
      },
      "application/atsc-dynamic-event-message": {
        source: "iana"
      },
      "application/atsc-held+xml": {
        source: "iana",
        compressible: true,
        extensions: ["held"]
      },
      "application/atsc-rdt+json": {
        source: "iana",
        compressible: true
      },
      "application/atsc-rsat+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rsat"]
      },
      "application/atxml": {
        source: "iana"
      },
      "application/auth-policy+xml": {
        source: "iana",
        compressible: true
      },
      "application/bacnet-xdd+zip": {
        source: "iana",
        compressible: false
      },
      "application/batch-smtp": {
        source: "iana"
      },
      "application/bdoc": {
        compressible: false,
        extensions: ["bdoc"]
      },
      "application/beep+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/calendar+json": {
        source: "iana",
        compressible: true
      },
      "application/calendar+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xcs"]
      },
      "application/call-completion": {
        source: "iana"
      },
      "application/cals-1840": {
        source: "iana"
      },
      "application/captive+json": {
        source: "iana",
        compressible: true
      },
      "application/cbor": {
        source: "iana"
      },
      "application/cbor-seq": {
        source: "iana"
      },
      "application/cccex": {
        source: "iana"
      },
      "application/ccmp+xml": {
        source: "iana",
        compressible: true
      },
      "application/ccxml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["ccxml"]
      },
      "application/cdfx+xml": {
        source: "iana",
        compressible: true,
        extensions: ["cdfx"]
      },
      "application/cdmi-capability": {
        source: "iana",
        extensions: ["cdmia"]
      },
      "application/cdmi-container": {
        source: "iana",
        extensions: ["cdmic"]
      },
      "application/cdmi-domain": {
        source: "iana",
        extensions: ["cdmid"]
      },
      "application/cdmi-object": {
        source: "iana",
        extensions: ["cdmio"]
      },
      "application/cdmi-queue": {
        source: "iana",
        extensions: ["cdmiq"]
      },
      "application/cdni": {
        source: "iana"
      },
      "application/cea": {
        source: "iana"
      },
      "application/cea-2018+xml": {
        source: "iana",
        compressible: true
      },
      "application/cellml+xml": {
        source: "iana",
        compressible: true
      },
      "application/cfw": {
        source: "iana"
      },
      "application/city+json": {
        source: "iana",
        compressible: true
      },
      "application/clr": {
        source: "iana"
      },
      "application/clue+xml": {
        source: "iana",
        compressible: true
      },
      "application/clue_info+xml": {
        source: "iana",
        compressible: true
      },
      "application/cms": {
        source: "iana"
      },
      "application/cnrp+xml": {
        source: "iana",
        compressible: true
      },
      "application/coap-group+json": {
        source: "iana",
        compressible: true
      },
      "application/coap-payload": {
        source: "iana"
      },
      "application/commonground": {
        source: "iana"
      },
      "application/conference-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/cose": {
        source: "iana"
      },
      "application/cose-key": {
        source: "iana"
      },
      "application/cose-key-set": {
        source: "iana"
      },
      "application/cpl+xml": {
        source: "iana",
        compressible: true,
        extensions: ["cpl"]
      },
      "application/csrattrs": {
        source: "iana"
      },
      "application/csta+xml": {
        source: "iana",
        compressible: true
      },
      "application/cstadata+xml": {
        source: "iana",
        compressible: true
      },
      "application/csvm+json": {
        source: "iana",
        compressible: true
      },
      "application/cu-seeme": {
        source: "apache",
        extensions: ["cu"]
      },
      "application/cwt": {
        source: "iana"
      },
      "application/cybercash": {
        source: "iana"
      },
      "application/dart": {
        compressible: true
      },
      "application/dash+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mpd"]
      },
      "application/dash-patch+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mpp"]
      },
      "application/dashdelta": {
        source: "iana"
      },
      "application/davmount+xml": {
        source: "iana",
        compressible: true,
        extensions: ["davmount"]
      },
      "application/dca-rft": {
        source: "iana"
      },
      "application/dcd": {
        source: "iana"
      },
      "application/dec-dx": {
        source: "iana"
      },
      "application/dialog-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/dicom": {
        source: "iana"
      },
      "application/dicom+json": {
        source: "iana",
        compressible: true
      },
      "application/dicom+xml": {
        source: "iana",
        compressible: true
      },
      "application/dii": {
        source: "iana"
      },
      "application/dit": {
        source: "iana"
      },
      "application/dns": {
        source: "iana"
      },
      "application/dns+json": {
        source: "iana",
        compressible: true
      },
      "application/dns-message": {
        source: "iana"
      },
      "application/docbook+xml": {
        source: "apache",
        compressible: true,
        extensions: ["dbk"]
      },
      "application/dots+cbor": {
        source: "iana"
      },
      "application/dskpp+xml": {
        source: "iana",
        compressible: true
      },
      "application/dssc+der": {
        source: "iana",
        extensions: ["dssc"]
      },
      "application/dssc+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xdssc"]
      },
      "application/dvcs": {
        source: "iana"
      },
      "application/ecmascript": {
        source: "iana",
        compressible: true,
        extensions: ["es", "ecma"]
      },
      "application/edi-consent": {
        source: "iana"
      },
      "application/edi-x12": {
        source: "iana",
        compressible: false
      },
      "application/edifact": {
        source: "iana",
        compressible: false
      },
      "application/efi": {
        source: "iana"
      },
      "application/elm+json": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/elm+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.cap+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/emergencycalldata.comment+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.control+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.deviceinfo+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.ecall.msd": {
        source: "iana"
      },
      "application/emergencycalldata.providerinfo+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.serviceinfo+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.subscriberinfo+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.veds+xml": {
        source: "iana",
        compressible: true
      },
      "application/emma+xml": {
        source: "iana",
        compressible: true,
        extensions: ["emma"]
      },
      "application/emotionml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["emotionml"]
      },
      "application/encaprtp": {
        source: "iana"
      },
      "application/epp+xml": {
        source: "iana",
        compressible: true
      },
      "application/epub+zip": {
        source: "iana",
        compressible: false,
        extensions: ["epub"]
      },
      "application/eshop": {
        source: "iana"
      },
      "application/exi": {
        source: "iana",
        extensions: ["exi"]
      },
      "application/expect-ct-report+json": {
        source: "iana",
        compressible: true
      },
      "application/express": {
        source: "iana",
        extensions: ["exp"]
      },
      "application/fastinfoset": {
        source: "iana"
      },
      "application/fastsoap": {
        source: "iana"
      },
      "application/fdt+xml": {
        source: "iana",
        compressible: true,
        extensions: ["fdt"]
      },
      "application/fhir+json": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/fhir+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/fido.trusted-apps+json": {
        compressible: true
      },
      "application/fits": {
        source: "iana"
      },
      "application/flexfec": {
        source: "iana"
      },
      "application/font-sfnt": {
        source: "iana"
      },
      "application/font-tdpfr": {
        source: "iana",
        extensions: ["pfr"]
      },
      "application/font-woff": {
        source: "iana",
        compressible: false
      },
      "application/framework-attributes+xml": {
        source: "iana",
        compressible: true
      },
      "application/geo+json": {
        source: "iana",
        compressible: true,
        extensions: ["geojson"]
      },
      "application/geo+json-seq": {
        source: "iana"
      },
      "application/geopackage+sqlite3": {
        source: "iana"
      },
      "application/geoxacml+xml": {
        source: "iana",
        compressible: true
      },
      "application/gltf-buffer": {
        source: "iana"
      },
      "application/gml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["gml"]
      },
      "application/gpx+xml": {
        source: "apache",
        compressible: true,
        extensions: ["gpx"]
      },
      "application/gxf": {
        source: "apache",
        extensions: ["gxf"]
      },
      "application/gzip": {
        source: "iana",
        compressible: false,
        extensions: ["gz"]
      },
      "application/h224": {
        source: "iana"
      },
      "application/held+xml": {
        source: "iana",
        compressible: true
      },
      "application/hjson": {
        extensions: ["hjson"]
      },
      "application/http": {
        source: "iana"
      },
      "application/hyperstudio": {
        source: "iana",
        extensions: ["stk"]
      },
      "application/ibe-key-request+xml": {
        source: "iana",
        compressible: true
      },
      "application/ibe-pkg-reply+xml": {
        source: "iana",
        compressible: true
      },
      "application/ibe-pp-data": {
        source: "iana"
      },
      "application/iges": {
        source: "iana"
      },
      "application/im-iscomposing+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/index": {
        source: "iana"
      },
      "application/index.cmd": {
        source: "iana"
      },
      "application/index.obj": {
        source: "iana"
      },
      "application/index.response": {
        source: "iana"
      },
      "application/index.vnd": {
        source: "iana"
      },
      "application/inkml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["ink", "inkml"]
      },
      "application/iotp": {
        source: "iana"
      },
      "application/ipfix": {
        source: "iana",
        extensions: ["ipfix"]
      },
      "application/ipp": {
        source: "iana"
      },
      "application/isup": {
        source: "iana"
      },
      "application/its+xml": {
        source: "iana",
        compressible: true,
        extensions: ["its"]
      },
      "application/java-archive": {
        source: "apache",
        compressible: false,
        extensions: ["jar", "war", "ear"]
      },
      "application/java-serialized-object": {
        source: "apache",
        compressible: false,
        extensions: ["ser"]
      },
      "application/java-vm": {
        source: "apache",
        compressible: false,
        extensions: ["class"]
      },
      "application/javascript": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["js", "mjs"]
      },
      "application/jf2feed+json": {
        source: "iana",
        compressible: true
      },
      "application/jose": {
        source: "iana"
      },
      "application/jose+json": {
        source: "iana",
        compressible: true
      },
      "application/jrd+json": {
        source: "iana",
        compressible: true
      },
      "application/jscalendar+json": {
        source: "iana",
        compressible: true
      },
      "application/json": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["json", "map"]
      },
      "application/json-patch+json": {
        source: "iana",
        compressible: true
      },
      "application/json-seq": {
        source: "iana"
      },
      "application/json5": {
        extensions: ["json5"]
      },
      "application/jsonml+json": {
        source: "apache",
        compressible: true,
        extensions: ["jsonml"]
      },
      "application/jwk+json": {
        source: "iana",
        compressible: true
      },
      "application/jwk-set+json": {
        source: "iana",
        compressible: true
      },
      "application/jwt": {
        source: "iana"
      },
      "application/kpml-request+xml": {
        source: "iana",
        compressible: true
      },
      "application/kpml-response+xml": {
        source: "iana",
        compressible: true
      },
      "application/ld+json": {
        source: "iana",
        compressible: true,
        extensions: ["jsonld"]
      },
      "application/lgr+xml": {
        source: "iana",
        compressible: true,
        extensions: ["lgr"]
      },
      "application/link-format": {
        source: "iana"
      },
      "application/load-control+xml": {
        source: "iana",
        compressible: true
      },
      "application/lost+xml": {
        source: "iana",
        compressible: true,
        extensions: ["lostxml"]
      },
      "application/lostsync+xml": {
        source: "iana",
        compressible: true
      },
      "application/lpf+zip": {
        source: "iana",
        compressible: false
      },
      "application/lxf": {
        source: "iana"
      },
      "application/mac-binhex40": {
        source: "iana",
        extensions: ["hqx"]
      },
      "application/mac-compactpro": {
        source: "apache",
        extensions: ["cpt"]
      },
      "application/macwriteii": {
        source: "iana"
      },
      "application/mads+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mads"]
      },
      "application/manifest+json": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["webmanifest"]
      },
      "application/marc": {
        source: "iana",
        extensions: ["mrc"]
      },
      "application/marcxml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mrcx"]
      },
      "application/mathematica": {
        source: "iana",
        extensions: ["ma", "nb", "mb"]
      },
      "application/mathml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mathml"]
      },
      "application/mathml-content+xml": {
        source: "iana",
        compressible: true
      },
      "application/mathml-presentation+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-associated-procedure-description+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-deregister+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-envelope+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-msk+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-msk-response+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-protection-description+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-reception-report+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-register+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-register-response+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-schedule+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-user-service-description+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbox": {
        source: "iana",
        extensions: ["mbox"]
      },
      "application/media-policy-dataset+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mpf"]
      },
      "application/media_control+xml": {
        source: "iana",
        compressible: true
      },
      "application/mediaservercontrol+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mscml"]
      },
      "application/merge-patch+json": {
        source: "iana",
        compressible: true
      },
      "application/metalink+xml": {
        source: "apache",
        compressible: true,
        extensions: ["metalink"]
      },
      "application/metalink4+xml": {
        source: "iana",
        compressible: true,
        extensions: ["meta4"]
      },
      "application/mets+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mets"]
      },
      "application/mf4": {
        source: "iana"
      },
      "application/mikey": {
        source: "iana"
      },
      "application/mipc": {
        source: "iana"
      },
      "application/missing-blocks+cbor-seq": {
        source: "iana"
      },
      "application/mmt-aei+xml": {
        source: "iana",
        compressible: true,
        extensions: ["maei"]
      },
      "application/mmt-usd+xml": {
        source: "iana",
        compressible: true,
        extensions: ["musd"]
      },
      "application/mods+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mods"]
      },
      "application/moss-keys": {
        source: "iana"
      },
      "application/moss-signature": {
        source: "iana"
      },
      "application/mosskey-data": {
        source: "iana"
      },
      "application/mosskey-request": {
        source: "iana"
      },
      "application/mp21": {
        source: "iana",
        extensions: ["m21", "mp21"]
      },
      "application/mp4": {
        source: "iana",
        extensions: ["mp4s", "m4p"]
      },
      "application/mpeg4-generic": {
        source: "iana"
      },
      "application/mpeg4-iod": {
        source: "iana"
      },
      "application/mpeg4-iod-xmt": {
        source: "iana"
      },
      "application/mrb-consumer+xml": {
        source: "iana",
        compressible: true
      },
      "application/mrb-publish+xml": {
        source: "iana",
        compressible: true
      },
      "application/msc-ivr+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/msc-mixer+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/msword": {
        source: "iana",
        compressible: false,
        extensions: ["doc", "dot"]
      },
      "application/mud+json": {
        source: "iana",
        compressible: true
      },
      "application/multipart-core": {
        source: "iana"
      },
      "application/mxf": {
        source: "iana",
        extensions: ["mxf"]
      },
      "application/n-quads": {
        source: "iana",
        extensions: ["nq"]
      },
      "application/n-triples": {
        source: "iana",
        extensions: ["nt"]
      },
      "application/nasdata": {
        source: "iana"
      },
      "application/news-checkgroups": {
        source: "iana",
        charset: "US-ASCII"
      },
      "application/news-groupinfo": {
        source: "iana",
        charset: "US-ASCII"
      },
      "application/news-transmission": {
        source: "iana"
      },
      "application/nlsml+xml": {
        source: "iana",
        compressible: true
      },
      "application/node": {
        source: "iana",
        extensions: ["cjs"]
      },
      "application/nss": {
        source: "iana"
      },
      "application/oauth-authz-req+jwt": {
        source: "iana"
      },
      "application/oblivious-dns-message": {
        source: "iana"
      },
      "application/ocsp-request": {
        source: "iana"
      },
      "application/ocsp-response": {
        source: "iana"
      },
      "application/octet-stream": {
        source: "iana",
        compressible: false,
        extensions: ["bin", "dms", "lrf", "mar", "so", "dist", "distz", "pkg", "bpk", "dump", "elc", "deploy", "exe", "dll", "deb", "dmg", "iso", "img", "msi", "msp", "msm", "buffer"]
      },
      "application/oda": {
        source: "iana",
        extensions: ["oda"]
      },
      "application/odm+xml": {
        source: "iana",
        compressible: true
      },
      "application/odx": {
        source: "iana"
      },
      "application/oebps-package+xml": {
        source: "iana",
        compressible: true,
        extensions: ["opf"]
      },
      "application/ogg": {
        source: "iana",
        compressible: false,
        extensions: ["ogx"]
      },
      "application/omdoc+xml": {
        source: "apache",
        compressible: true,
        extensions: ["omdoc"]
      },
      "application/onenote": {
        source: "apache",
        extensions: ["onetoc", "onetoc2", "onetmp", "onepkg"]
      },
      "application/opc-nodeset+xml": {
        source: "iana",
        compressible: true
      },
      "application/oscore": {
        source: "iana"
      },
      "application/oxps": {
        source: "iana",
        extensions: ["oxps"]
      },
      "application/p21": {
        source: "iana"
      },
      "application/p21+zip": {
        source: "iana",
        compressible: false
      },
      "application/p2p-overlay+xml": {
        source: "iana",
        compressible: true,
        extensions: ["relo"]
      },
      "application/parityfec": {
        source: "iana"
      },
      "application/passport": {
        source: "iana"
      },
      "application/patch-ops-error+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xer"]
      },
      "application/pdf": {
        source: "iana",
        compressible: false,
        extensions: ["pdf"]
      },
      "application/pdx": {
        source: "iana"
      },
      "application/pem-certificate-chain": {
        source: "iana"
      },
      "application/pgp-encrypted": {
        source: "iana",
        compressible: false,
        extensions: ["pgp"]
      },
      "application/pgp-keys": {
        source: "iana",
        extensions: ["asc"]
      },
      "application/pgp-signature": {
        source: "iana",
        extensions: ["asc", "sig"]
      },
      "application/pics-rules": {
        source: "apache",
        extensions: ["prf"]
      },
      "application/pidf+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/pidf-diff+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/pkcs10": {
        source: "iana",
        extensions: ["p10"]
      },
      "application/pkcs12": {
        source: "iana"
      },
      "application/pkcs7-mime": {
        source: "iana",
        extensions: ["p7m", "p7c"]
      },
      "application/pkcs7-signature": {
        source: "iana",
        extensions: ["p7s"]
      },
      "application/pkcs8": {
        source: "iana",
        extensions: ["p8"]
      },
      "application/pkcs8-encrypted": {
        source: "iana"
      },
      "application/pkix-attr-cert": {
        source: "iana",
        extensions: ["ac"]
      },
      "application/pkix-cert": {
        source: "iana",
        extensions: ["cer"]
      },
      "application/pkix-crl": {
        source: "iana",
        extensions: ["crl"]
      },
      "application/pkix-pkipath": {
        source: "iana",
        extensions: ["pkipath"]
      },
      "application/pkixcmp": {
        source: "iana",
        extensions: ["pki"]
      },
      "application/pls+xml": {
        source: "iana",
        compressible: true,
        extensions: ["pls"]
      },
      "application/poc-settings+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/postscript": {
        source: "iana",
        compressible: true,
        extensions: ["ai", "eps", "ps"]
      },
      "application/ppsp-tracker+json": {
        source: "iana",
        compressible: true
      },
      "application/problem+json": {
        source: "iana",
        compressible: true
      },
      "application/problem+xml": {
        source: "iana",
        compressible: true
      },
      "application/provenance+xml": {
        source: "iana",
        compressible: true,
        extensions: ["provx"]
      },
      "application/prs.alvestrand.titrax-sheet": {
        source: "iana"
      },
      "application/prs.cww": {
        source: "iana",
        extensions: ["cww"]
      },
      "application/prs.cyn": {
        source: "iana",
        charset: "7-BIT"
      },
      "application/prs.hpub+zip": {
        source: "iana",
        compressible: false
      },
      "application/prs.nprend": {
        source: "iana"
      },
      "application/prs.plucker": {
        source: "iana"
      },
      "application/prs.rdf-xml-crypt": {
        source: "iana"
      },
      "application/prs.xsf+xml": {
        source: "iana",
        compressible: true
      },
      "application/pskc+xml": {
        source: "iana",
        compressible: true,
        extensions: ["pskcxml"]
      },
      "application/pvd+json": {
        source: "iana",
        compressible: true
      },
      "application/qsig": {
        source: "iana"
      },
      "application/raml+yaml": {
        compressible: true,
        extensions: ["raml"]
      },
      "application/raptorfec": {
        source: "iana"
      },
      "application/rdap+json": {
        source: "iana",
        compressible: true
      },
      "application/rdf+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rdf", "owl"]
      },
      "application/reginfo+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rif"]
      },
      "application/relax-ng-compact-syntax": {
        source: "iana",
        extensions: ["rnc"]
      },
      "application/remote-printing": {
        source: "iana"
      },
      "application/reputon+json": {
        source: "iana",
        compressible: true
      },
      "application/resource-lists+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rl"]
      },
      "application/resource-lists-diff+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rld"]
      },
      "application/rfc+xml": {
        source: "iana",
        compressible: true
      },
      "application/riscos": {
        source: "iana"
      },
      "application/rlmi+xml": {
        source: "iana",
        compressible: true
      },
      "application/rls-services+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rs"]
      },
      "application/route-apd+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rapd"]
      },
      "application/route-s-tsid+xml": {
        source: "iana",
        compressible: true,
        extensions: ["sls"]
      },
      "application/route-usd+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rusd"]
      },
      "application/rpki-ghostbusters": {
        source: "iana",
        extensions: ["gbr"]
      },
      "application/rpki-manifest": {
        source: "iana",
        extensions: ["mft"]
      },
      "application/rpki-publication": {
        source: "iana"
      },
      "application/rpki-roa": {
        source: "iana",
        extensions: ["roa"]
      },
      "application/rpki-updown": {
        source: "iana"
      },
      "application/rsd+xml": {
        source: "apache",
        compressible: true,
        extensions: ["rsd"]
      },
      "application/rss+xml": {
        source: "apache",
        compressible: true,
        extensions: ["rss"]
      },
      "application/rtf": {
        source: "iana",
        compressible: true,
        extensions: ["rtf"]
      },
      "application/rtploopback": {
        source: "iana"
      },
      "application/rtx": {
        source: "iana"
      },
      "application/samlassertion+xml": {
        source: "iana",
        compressible: true
      },
      "application/samlmetadata+xml": {
        source: "iana",
        compressible: true
      },
      "application/sarif+json": {
        source: "iana",
        compressible: true
      },
      "application/sarif-external-properties+json": {
        source: "iana",
        compressible: true
      },
      "application/sbe": {
        source: "iana"
      },
      "application/sbml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["sbml"]
      },
      "application/scaip+xml": {
        source: "iana",
        compressible: true
      },
      "application/scim+json": {
        source: "iana",
        compressible: true
      },
      "application/scvp-cv-request": {
        source: "iana",
        extensions: ["scq"]
      },
      "application/scvp-cv-response": {
        source: "iana",
        extensions: ["scs"]
      },
      "application/scvp-vp-request": {
        source: "iana",
        extensions: ["spq"]
      },
      "application/scvp-vp-response": {
        source: "iana",
        extensions: ["spp"]
      },
      "application/sdp": {
        source: "iana",
        extensions: ["sdp"]
      },
      "application/secevent+jwt": {
        source: "iana"
      },
      "application/senml+cbor": {
        source: "iana"
      },
      "application/senml+json": {
        source: "iana",
        compressible: true
      },
      "application/senml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["senmlx"]
      },
      "application/senml-etch+cbor": {
        source: "iana"
      },
      "application/senml-etch+json": {
        source: "iana",
        compressible: true
      },
      "application/senml-exi": {
        source: "iana"
      },
      "application/sensml+cbor": {
        source: "iana"
      },
      "application/sensml+json": {
        source: "iana",
        compressible: true
      },
      "application/sensml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["sensmlx"]
      },
      "application/sensml-exi": {
        source: "iana"
      },
      "application/sep+xml": {
        source: "iana",
        compressible: true
      },
      "application/sep-exi": {
        source: "iana"
      },
      "application/session-info": {
        source: "iana"
      },
      "application/set-payment": {
        source: "iana"
      },
      "application/set-payment-initiation": {
        source: "iana",
        extensions: ["setpay"]
      },
      "application/set-registration": {
        source: "iana"
      },
      "application/set-registration-initiation": {
        source: "iana",
        extensions: ["setreg"]
      },
      "application/sgml": {
        source: "iana"
      },
      "application/sgml-open-catalog": {
        source: "iana"
      },
      "application/shf+xml": {
        source: "iana",
        compressible: true,
        extensions: ["shf"]
      },
      "application/sieve": {
        source: "iana",
        extensions: ["siv", "sieve"]
      },
      "application/simple-filter+xml": {
        source: "iana",
        compressible: true
      },
      "application/simple-message-summary": {
        source: "iana"
      },
      "application/simplesymbolcontainer": {
        source: "iana"
      },
      "application/sipc": {
        source: "iana"
      },
      "application/slate": {
        source: "iana"
      },
      "application/smil": {
        source: "iana"
      },
      "application/smil+xml": {
        source: "iana",
        compressible: true,
        extensions: ["smi", "smil"]
      },
      "application/smpte336m": {
        source: "iana"
      },
      "application/soap+fastinfoset": {
        source: "iana"
      },
      "application/soap+xml": {
        source: "iana",
        compressible: true
      },
      "application/sparql-query": {
        source: "iana",
        extensions: ["rq"]
      },
      "application/sparql-results+xml": {
        source: "iana",
        compressible: true,
        extensions: ["srx"]
      },
      "application/spdx+json": {
        source: "iana",
        compressible: true
      },
      "application/spirits-event+xml": {
        source: "iana",
        compressible: true
      },
      "application/sql": {
        source: "iana"
      },
      "application/srgs": {
        source: "iana",
        extensions: ["gram"]
      },
      "application/srgs+xml": {
        source: "iana",
        compressible: true,
        extensions: ["grxml"]
      },
      "application/sru+xml": {
        source: "iana",
        compressible: true,
        extensions: ["sru"]
      },
      "application/ssdl+xml": {
        source: "apache",
        compressible: true,
        extensions: ["ssdl"]
      },
      "application/ssml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["ssml"]
      },
      "application/stix+json": {
        source: "iana",
        compressible: true
      },
      "application/swid+xml": {
        source: "iana",
        compressible: true,
        extensions: ["swidtag"]
      },
      "application/tamp-apex-update": {
        source: "iana"
      },
      "application/tamp-apex-update-confirm": {
        source: "iana"
      },
      "application/tamp-community-update": {
        source: "iana"
      },
      "application/tamp-community-update-confirm": {
        source: "iana"
      },
      "application/tamp-error": {
        source: "iana"
      },
      "application/tamp-sequence-adjust": {
        source: "iana"
      },
      "application/tamp-sequence-adjust-confirm": {
        source: "iana"
      },
      "application/tamp-status-query": {
        source: "iana"
      },
      "application/tamp-status-response": {
        source: "iana"
      },
      "application/tamp-update": {
        source: "iana"
      },
      "application/tamp-update-confirm": {
        source: "iana"
      },
      "application/tar": {
        compressible: true
      },
      "application/taxii+json": {
        source: "iana",
        compressible: true
      },
      "application/td+json": {
        source: "iana",
        compressible: true
      },
      "application/tei+xml": {
        source: "iana",
        compressible: true,
        extensions: ["tei", "teicorpus"]
      },
      "application/tetra_isi": {
        source: "iana"
      },
      "application/thraud+xml": {
        source: "iana",
        compressible: true,
        extensions: ["tfi"]
      },
      "application/timestamp-query": {
        source: "iana"
      },
      "application/timestamp-reply": {
        source: "iana"
      },
      "application/timestamped-data": {
        source: "iana",
        extensions: ["tsd"]
      },
      "application/tlsrpt+gzip": {
        source: "iana"
      },
      "application/tlsrpt+json": {
        source: "iana",
        compressible: true
      },
      "application/tnauthlist": {
        source: "iana"
      },
      "application/token-introspection+jwt": {
        source: "iana"
      },
      "application/toml": {
        compressible: true,
        extensions: ["toml"]
      },
      "application/trickle-ice-sdpfrag": {
        source: "iana"
      },
      "application/trig": {
        source: "iana",
        extensions: ["trig"]
      },
      "application/ttml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["ttml"]
      },
      "application/tve-trigger": {
        source: "iana"
      },
      "application/tzif": {
        source: "iana"
      },
      "application/tzif-leap": {
        source: "iana"
      },
      "application/ubjson": {
        compressible: false,
        extensions: ["ubj"]
      },
      "application/ulpfec": {
        source: "iana"
      },
      "application/urc-grpsheet+xml": {
        source: "iana",
        compressible: true
      },
      "application/urc-ressheet+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rsheet"]
      },
      "application/urc-targetdesc+xml": {
        source: "iana",
        compressible: true,
        extensions: ["td"]
      },
      "application/urc-uisocketdesc+xml": {
        source: "iana",
        compressible: true
      },
      "application/vcard+json": {
        source: "iana",
        compressible: true
      },
      "application/vcard+xml": {
        source: "iana",
        compressible: true
      },
      "application/vemmi": {
        source: "iana"
      },
      "application/vividence.scriptfile": {
        source: "apache"
      },
      "application/vnd.1000minds.decision-model+xml": {
        source: "iana",
        compressible: true,
        extensions: ["1km"]
      },
      "application/vnd.3gpp-prose+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp-prose-pc3ch+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp-v2x-local-service-information": {
        source: "iana"
      },
      "application/vnd.3gpp.5gnas": {
        source: "iana"
      },
      "application/vnd.3gpp.access-transfer-events+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.bsf+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.gmop+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.gtpc": {
        source: "iana"
      },
      "application/vnd.3gpp.interworking-data": {
        source: "iana"
      },
      "application/vnd.3gpp.lpp": {
        source: "iana"
      },
      "application/vnd.3gpp.mc-signalling-ear": {
        source: "iana"
      },
      "application/vnd.3gpp.mcdata-affiliation-command+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcdata-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcdata-payload": {
        source: "iana"
      },
      "application/vnd.3gpp.mcdata-service-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcdata-signalling": {
        source: "iana"
      },
      "application/vnd.3gpp.mcdata-ue-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcdata-user-profile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-affiliation-command+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-floor-request+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-location-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-mbms-usage-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-service-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-signed+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-ue-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-ue-init-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-user-profile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-affiliation-command+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-affiliation-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-location-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-mbms-usage-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-service-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-transmission-request+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-ue-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-user-profile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mid-call+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.ngap": {
        source: "iana"
      },
      "application/vnd.3gpp.pfcp": {
        source: "iana"
      },
      "application/vnd.3gpp.pic-bw-large": {
        source: "iana",
        extensions: ["plb"]
      },
      "application/vnd.3gpp.pic-bw-small": {
        source: "iana",
        extensions: ["psb"]
      },
      "application/vnd.3gpp.pic-bw-var": {
        source: "iana",
        extensions: ["pvb"]
      },
      "application/vnd.3gpp.s1ap": {
        source: "iana"
      },
      "application/vnd.3gpp.sms": {
        source: "iana"
      },
      "application/vnd.3gpp.sms+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.srvcc-ext+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.srvcc-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.state-and-event-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.ussd+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp2.bcmcsinfo+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp2.sms": {
        source: "iana"
      },
      "application/vnd.3gpp2.tcap": {
        source: "iana",
        extensions: ["tcap"]
      },
      "application/vnd.3lightssoftware.imagescal": {
        source: "iana"
      },
      "application/vnd.3m.post-it-notes": {
        source: "iana",
        extensions: ["pwn"]
      },
      "application/vnd.accpac.simply.aso": {
        source: "iana",
        extensions: ["aso"]
      },
      "application/vnd.accpac.simply.imp": {
        source: "iana",
        extensions: ["imp"]
      },
      "application/vnd.acucobol": {
        source: "iana",
        extensions: ["acu"]
      },
      "application/vnd.acucorp": {
        source: "iana",
        extensions: ["atc", "acutc"]
      },
      "application/vnd.adobe.air-application-installer-package+zip": {
        source: "apache",
        compressible: false,
        extensions: ["air"]
      },
      "application/vnd.adobe.flash.movie": {
        source: "iana"
      },
      "application/vnd.adobe.formscentral.fcdt": {
        source: "iana",
        extensions: ["fcdt"]
      },
      "application/vnd.adobe.fxp": {
        source: "iana",
        extensions: ["fxp", "fxpl"]
      },
      "application/vnd.adobe.partial-upload": {
        source: "iana"
      },
      "application/vnd.adobe.xdp+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xdp"]
      },
      "application/vnd.adobe.xfdf": {
        source: "iana",
        extensions: ["xfdf"]
      },
      "application/vnd.aether.imp": {
        source: "iana"
      },
      "application/vnd.afpc.afplinedata": {
        source: "iana"
      },
      "application/vnd.afpc.afplinedata-pagedef": {
        source: "iana"
      },
      "application/vnd.afpc.cmoca-cmresource": {
        source: "iana"
      },
      "application/vnd.afpc.foca-charset": {
        source: "iana"
      },
      "application/vnd.afpc.foca-codedfont": {
        source: "iana"
      },
      "application/vnd.afpc.foca-codepage": {
        source: "iana"
      },
      "application/vnd.afpc.modca": {
        source: "iana"
      },
      "application/vnd.afpc.modca-cmtable": {
        source: "iana"
      },
      "application/vnd.afpc.modca-formdef": {
        source: "iana"
      },
      "application/vnd.afpc.modca-mediummap": {
        source: "iana"
      },
      "application/vnd.afpc.modca-objectcontainer": {
        source: "iana"
      },
      "application/vnd.afpc.modca-overlay": {
        source: "iana"
      },
      "application/vnd.afpc.modca-pagesegment": {
        source: "iana"
      },
      "application/vnd.age": {
        source: "iana",
        extensions: ["age"]
      },
      "application/vnd.ah-barcode": {
        source: "iana"
      },
      "application/vnd.ahead.space": {
        source: "iana",
        extensions: ["ahead"]
      },
      "application/vnd.airzip.filesecure.azf": {
        source: "iana",
        extensions: ["azf"]
      },
      "application/vnd.airzip.filesecure.azs": {
        source: "iana",
        extensions: ["azs"]
      },
      "application/vnd.amadeus+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.amazon.ebook": {
        source: "apache",
        extensions: ["azw"]
      },
      "application/vnd.amazon.mobi8-ebook": {
        source: "iana"
      },
      "application/vnd.americandynamics.acc": {
        source: "iana",
        extensions: ["acc"]
      },
      "application/vnd.amiga.ami": {
        source: "iana",
        extensions: ["ami"]
      },
      "application/vnd.amundsen.maze+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.android.ota": {
        source: "iana"
      },
      "application/vnd.android.package-archive": {
        source: "apache",
        compressible: false,
        extensions: ["apk"]
      },
      "application/vnd.anki": {
        source: "iana"
      },
      "application/vnd.anser-web-certificate-issue-initiation": {
        source: "iana",
        extensions: ["cii"]
      },
      "application/vnd.anser-web-funds-transfer-initiation": {
        source: "apache",
        extensions: ["fti"]
      },
      "application/vnd.antix.game-component": {
        source: "iana",
        extensions: ["atx"]
      },
      "application/vnd.apache.arrow.file": {
        source: "iana"
      },
      "application/vnd.apache.arrow.stream": {
        source: "iana"
      },
      "application/vnd.apache.thrift.binary": {
        source: "iana"
      },
      "application/vnd.apache.thrift.compact": {
        source: "iana"
      },
      "application/vnd.apache.thrift.json": {
        source: "iana"
      },
      "application/vnd.api+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.aplextor.warrp+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.apothekende.reservation+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.apple.installer+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mpkg"]
      },
      "application/vnd.apple.keynote": {
        source: "iana",
        extensions: ["key"]
      },
      "application/vnd.apple.mpegurl": {
        source: "iana",
        extensions: ["m3u8"]
      },
      "application/vnd.apple.numbers": {
        source: "iana",
        extensions: ["numbers"]
      },
      "application/vnd.apple.pages": {
        source: "iana",
        extensions: ["pages"]
      },
      "application/vnd.apple.pkpass": {
        compressible: false,
        extensions: ["pkpass"]
      },
      "application/vnd.arastra.swi": {
        source: "iana"
      },
      "application/vnd.aristanetworks.swi": {
        source: "iana",
        extensions: ["swi"]
      },
      "application/vnd.artisan+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.artsquare": {
        source: "iana"
      },
      "application/vnd.astraea-software.iota": {
        source: "iana",
        extensions: ["iota"]
      },
      "application/vnd.audiograph": {
        source: "iana",
        extensions: ["aep"]
      },
      "application/vnd.autopackage": {
        source: "iana"
      },
      "application/vnd.avalon+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.avistar+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.balsamiq.bmml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["bmml"]
      },
      "application/vnd.balsamiq.bmpr": {
        source: "iana"
      },
      "application/vnd.banana-accounting": {
        source: "iana"
      },
      "application/vnd.bbf.usp.error": {
        source: "iana"
      },
      "application/vnd.bbf.usp.msg": {
        source: "iana"
      },
      "application/vnd.bbf.usp.msg+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.bekitzur-stech+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.bint.med-content": {
        source: "iana"
      },
      "application/vnd.biopax.rdf+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.blink-idb-value-wrapper": {
        source: "iana"
      },
      "application/vnd.blueice.multipass": {
        source: "iana",
        extensions: ["mpm"]
      },
      "application/vnd.bluetooth.ep.oob": {
        source: "iana"
      },
      "application/vnd.bluetooth.le.oob": {
        source: "iana"
      },
      "application/vnd.bmi": {
        source: "iana",
        extensions: ["bmi"]
      },
      "application/vnd.bpf": {
        source: "iana"
      },
      "application/vnd.bpf3": {
        source: "iana"
      },
      "application/vnd.businessobjects": {
        source: "iana",
        extensions: ["rep"]
      },
      "application/vnd.byu.uapi+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.cab-jscript": {
        source: "iana"
      },
      "application/vnd.canon-cpdl": {
        source: "iana"
      },
      "application/vnd.canon-lips": {
        source: "iana"
      },
      "application/vnd.capasystems-pg+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.cendio.thinlinc.clientconf": {
        source: "iana"
      },
      "application/vnd.century-systems.tcp_stream": {
        source: "iana"
      },
      "application/vnd.chemdraw+xml": {
        source: "iana",
        compressible: true,
        extensions: ["cdxml"]
      },
      "application/vnd.chess-pgn": {
        source: "iana"
      },
      "application/vnd.chipnuts.karaoke-mmd": {
        source: "iana",
        extensions: ["mmd"]
      },
      "application/vnd.ciedi": {
        source: "iana"
      },
      "application/vnd.cinderella": {
        source: "iana",
        extensions: ["cdy"]
      },
      "application/vnd.cirpack.isdn-ext": {
        source: "iana"
      },
      "application/vnd.citationstyles.style+xml": {
        source: "iana",
        compressible: true,
        extensions: ["csl"]
      },
      "application/vnd.claymore": {
        source: "iana",
        extensions: ["cla"]
      },
      "application/vnd.cloanto.rp9": {
        source: "iana",
        extensions: ["rp9"]
      },
      "application/vnd.clonk.c4group": {
        source: "iana",
        extensions: ["c4g", "c4d", "c4f", "c4p", "c4u"]
      },
      "application/vnd.cluetrust.cartomobile-config": {
        source: "iana",
        extensions: ["c11amc"]
      },
      "application/vnd.cluetrust.cartomobile-config-pkg": {
        source: "iana",
        extensions: ["c11amz"]
      },
      "application/vnd.coffeescript": {
        source: "iana"
      },
      "application/vnd.collabio.xodocuments.document": {
        source: "iana"
      },
      "application/vnd.collabio.xodocuments.document-template": {
        source: "iana"
      },
      "application/vnd.collabio.xodocuments.presentation": {
        source: "iana"
      },
      "application/vnd.collabio.xodocuments.presentation-template": {
        source: "iana"
      },
      "application/vnd.collabio.xodocuments.spreadsheet": {
        source: "iana"
      },
      "application/vnd.collabio.xodocuments.spreadsheet-template": {
        source: "iana"
      },
      "application/vnd.collection+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.collection.doc+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.collection.next+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.comicbook+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.comicbook-rar": {
        source: "iana"
      },
      "application/vnd.commerce-battelle": {
        source: "iana"
      },
      "application/vnd.commonspace": {
        source: "iana",
        extensions: ["csp"]
      },
      "application/vnd.contact.cmsg": {
        source: "iana",
        extensions: ["cdbcmsg"]
      },
      "application/vnd.coreos.ignition+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.cosmocaller": {
        source: "iana",
        extensions: ["cmc"]
      },
      "application/vnd.crick.clicker": {
        source: "iana",
        extensions: ["clkx"]
      },
      "application/vnd.crick.clicker.keyboard": {
        source: "iana",
        extensions: ["clkk"]
      },
      "application/vnd.crick.clicker.palette": {
        source: "iana",
        extensions: ["clkp"]
      },
      "application/vnd.crick.clicker.template": {
        source: "iana",
        extensions: ["clkt"]
      },
      "application/vnd.crick.clicker.wordbank": {
        source: "iana",
        extensions: ["clkw"]
      },
      "application/vnd.criticaltools.wbs+xml": {
        source: "iana",
        compressible: true,
        extensions: ["wbs"]
      },
      "application/vnd.cryptii.pipe+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.crypto-shade-file": {
        source: "iana"
      },
      "application/vnd.cryptomator.encrypted": {
        source: "iana"
      },
      "application/vnd.cryptomator.vault": {
        source: "iana"
      },
      "application/vnd.ctc-posml": {
        source: "iana",
        extensions: ["pml"]
      },
      "application/vnd.ctct.ws+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.cups-pdf": {
        source: "iana"
      },
      "application/vnd.cups-postscript": {
        source: "iana"
      },
      "application/vnd.cups-ppd": {
        source: "iana",
        extensions: ["ppd"]
      },
      "application/vnd.cups-raster": {
        source: "iana"
      },
      "application/vnd.cups-raw": {
        source: "iana"
      },
      "application/vnd.curl": {
        source: "iana"
      },
      "application/vnd.curl.car": {
        source: "apache",
        extensions: ["car"]
      },
      "application/vnd.curl.pcurl": {
        source: "apache",
        extensions: ["pcurl"]
      },
      "application/vnd.cyan.dean.root+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.cybank": {
        source: "iana"
      },
      "application/vnd.cyclonedx+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.cyclonedx+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.d2l.coursepackage1p0+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.d3m-dataset": {
        source: "iana"
      },
      "application/vnd.d3m-problem": {
        source: "iana"
      },
      "application/vnd.dart": {
        source: "iana",
        compressible: true,
        extensions: ["dart"]
      },
      "application/vnd.data-vision.rdz": {
        source: "iana",
        extensions: ["rdz"]
      },
      "application/vnd.datapackage+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dataresource+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dbf": {
        source: "iana",
        extensions: ["dbf"]
      },
      "application/vnd.debian.binary-package": {
        source: "iana"
      },
      "application/vnd.dece.data": {
        source: "iana",
        extensions: ["uvf", "uvvf", "uvd", "uvvd"]
      },
      "application/vnd.dece.ttml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["uvt", "uvvt"]
      },
      "application/vnd.dece.unspecified": {
        source: "iana",
        extensions: ["uvx", "uvvx"]
      },
      "application/vnd.dece.zip": {
        source: "iana",
        extensions: ["uvz", "uvvz"]
      },
      "application/vnd.denovo.fcselayout-link": {
        source: "iana",
        extensions: ["fe_launch"]
      },
      "application/vnd.desmume.movie": {
        source: "iana"
      },
      "application/vnd.dir-bi.plate-dl-nosuffix": {
        source: "iana"
      },
      "application/vnd.dm.delegation+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dna": {
        source: "iana",
        extensions: ["dna"]
      },
      "application/vnd.document+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dolby.mlp": {
        source: "apache",
        extensions: ["mlp"]
      },
      "application/vnd.dolby.mobile.1": {
        source: "iana"
      },
      "application/vnd.dolby.mobile.2": {
        source: "iana"
      },
      "application/vnd.doremir.scorecloud-binary-document": {
        source: "iana"
      },
      "application/vnd.dpgraph": {
        source: "iana",
        extensions: ["dpg"]
      },
      "application/vnd.dreamfactory": {
        source: "iana",
        extensions: ["dfac"]
      },
      "application/vnd.drive+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ds-keypoint": {
        source: "apache",
        extensions: ["kpxx"]
      },
      "application/vnd.dtg.local": {
        source: "iana"
      },
      "application/vnd.dtg.local.flash": {
        source: "iana"
      },
      "application/vnd.dtg.local.html": {
        source: "iana"
      },
      "application/vnd.dvb.ait": {
        source: "iana",
        extensions: ["ait"]
      },
      "application/vnd.dvb.dvbisl+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.dvbj": {
        source: "iana"
      },
      "application/vnd.dvb.esgcontainer": {
        source: "iana"
      },
      "application/vnd.dvb.ipdcdftnotifaccess": {
        source: "iana"
      },
      "application/vnd.dvb.ipdcesgaccess": {
        source: "iana"
      },
      "application/vnd.dvb.ipdcesgaccess2": {
        source: "iana"
      },
      "application/vnd.dvb.ipdcesgpdd": {
        source: "iana"
      },
      "application/vnd.dvb.ipdcroaming": {
        source: "iana"
      },
      "application/vnd.dvb.iptv.alfec-base": {
        source: "iana"
      },
      "application/vnd.dvb.iptv.alfec-enhancement": {
        source: "iana"
      },
      "application/vnd.dvb.notif-aggregate-root+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.notif-container+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.notif-generic+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.notif-ia-msglist+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.notif-ia-registration-request+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.notif-ia-registration-response+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.notif-init+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.pfr": {
        source: "iana"
      },
      "application/vnd.dvb.service": {
        source: "iana",
        extensions: ["svc"]
      },
      "application/vnd.dxr": {
        source: "iana"
      },
      "application/vnd.dynageo": {
        source: "iana",
        extensions: ["geo"]
      },
      "application/vnd.dzr": {
        source: "iana"
      },
      "application/vnd.easykaraoke.cdgdownload": {
        source: "iana"
      },
      "application/vnd.ecdis-update": {
        source: "iana"
      },
      "application/vnd.ecip.rlp": {
        source: "iana"
      },
      "application/vnd.eclipse.ditto+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ecowin.chart": {
        source: "iana",
        extensions: ["mag"]
      },
      "application/vnd.ecowin.filerequest": {
        source: "iana"
      },
      "application/vnd.ecowin.fileupdate": {
        source: "iana"
      },
      "application/vnd.ecowin.series": {
        source: "iana"
      },
      "application/vnd.ecowin.seriesrequest": {
        source: "iana"
      },
      "application/vnd.ecowin.seriesupdate": {
        source: "iana"
      },
      "application/vnd.efi.img": {
        source: "iana"
      },
      "application/vnd.efi.iso": {
        source: "iana"
      },
      "application/vnd.emclient.accessrequest+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.enliven": {
        source: "iana",
        extensions: ["nml"]
      },
      "application/vnd.enphase.envoy": {
        source: "iana"
      },
      "application/vnd.eprints.data+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.epson.esf": {
        source: "iana",
        extensions: ["esf"]
      },
      "application/vnd.epson.msf": {
        source: "iana",
        extensions: ["msf"]
      },
      "application/vnd.epson.quickanime": {
        source: "iana",
        extensions: ["qam"]
      },
      "application/vnd.epson.salt": {
        source: "iana",
        extensions: ["slt"]
      },
      "application/vnd.epson.ssf": {
        source: "iana",
        extensions: ["ssf"]
      },
      "application/vnd.ericsson.quickcall": {
        source: "iana"
      },
      "application/vnd.espass-espass+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.eszigno3+xml": {
        source: "iana",
        compressible: true,
        extensions: ["es3", "et3"]
      },
      "application/vnd.etsi.aoc+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.asic-e+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.etsi.asic-s+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.etsi.cug+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvcommand+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvdiscovery+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvprofile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvsad-bc+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvsad-cod+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvsad-npvr+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvservice+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvsync+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvueprofile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.mcid+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.mheg5": {
        source: "iana"
      },
      "application/vnd.etsi.overload-control-policy-dataset+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.pstn+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.sci+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.simservs+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.timestamp-token": {
        source: "iana"
      },
      "application/vnd.etsi.tsl+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.tsl.der": {
        source: "iana"
      },
      "application/vnd.eu.kasparian.car+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.eudora.data": {
        source: "iana"
      },
      "application/vnd.evolv.ecig.profile": {
        source: "iana"
      },
      "application/vnd.evolv.ecig.settings": {
        source: "iana"
      },
      "application/vnd.evolv.ecig.theme": {
        source: "iana"
      },
      "application/vnd.exstream-empower+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.exstream-package": {
        source: "iana"
      },
      "application/vnd.ezpix-album": {
        source: "iana",
        extensions: ["ez2"]
      },
      "application/vnd.ezpix-package": {
        source: "iana",
        extensions: ["ez3"]
      },
      "application/vnd.f-secure.mobile": {
        source: "iana"
      },
      "application/vnd.familysearch.gedcom+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.fastcopy-disk-image": {
        source: "iana"
      },
      "application/vnd.fdf": {
        source: "iana",
        extensions: ["fdf"]
      },
      "application/vnd.fdsn.mseed": {
        source: "iana",
        extensions: ["mseed"]
      },
      "application/vnd.fdsn.seed": {
        source: "iana",
        extensions: ["seed", "dataless"]
      },
      "application/vnd.ffsns": {
        source: "iana"
      },
      "application/vnd.ficlab.flb+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.filmit.zfc": {
        source: "iana"
      },
      "application/vnd.fints": {
        source: "iana"
      },
      "application/vnd.firemonkeys.cloudcell": {
        source: "iana"
      },
      "application/vnd.flographit": {
        source: "iana",
        extensions: ["gph"]
      },
      "application/vnd.fluxtime.clip": {
        source: "iana",
        extensions: ["ftc"]
      },
      "application/vnd.font-fontforge-sfd": {
        source: "iana"
      },
      "application/vnd.framemaker": {
        source: "iana",
        extensions: ["fm", "frame", "maker", "book"]
      },
      "application/vnd.frogans.fnc": {
        source: "iana",
        extensions: ["fnc"]
      },
      "application/vnd.frogans.ltf": {
        source: "iana",
        extensions: ["ltf"]
      },
      "application/vnd.fsc.weblaunch": {
        source: "iana",
        extensions: ["fsc"]
      },
      "application/vnd.fujifilm.fb.docuworks": {
        source: "iana"
      },
      "application/vnd.fujifilm.fb.docuworks.binder": {
        source: "iana"
      },
      "application/vnd.fujifilm.fb.docuworks.container": {
        source: "iana"
      },
      "application/vnd.fujifilm.fb.jfi+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.fujitsu.oasys": {
        source: "iana",
        extensions: ["oas"]
      },
      "application/vnd.fujitsu.oasys2": {
        source: "iana",
        extensions: ["oa2"]
      },
      "application/vnd.fujitsu.oasys3": {
        source: "iana",
        extensions: ["oa3"]
      },
      "application/vnd.fujitsu.oasysgp": {
        source: "iana",
        extensions: ["fg5"]
      },
      "application/vnd.fujitsu.oasysprs": {
        source: "iana",
        extensions: ["bh2"]
      },
      "application/vnd.fujixerox.art-ex": {
        source: "iana"
      },
      "application/vnd.fujixerox.art4": {
        source: "iana"
      },
      "application/vnd.fujixerox.ddd": {
        source: "iana",
        extensions: ["ddd"]
      },
      "application/vnd.fujixerox.docuworks": {
        source: "iana",
        extensions: ["xdw"]
      },
      "application/vnd.fujixerox.docuworks.binder": {
        source: "iana",
        extensions: ["xbd"]
      },
      "application/vnd.fujixerox.docuworks.container": {
        source: "iana"
      },
      "application/vnd.fujixerox.hbpl": {
        source: "iana"
      },
      "application/vnd.fut-misnet": {
        source: "iana"
      },
      "application/vnd.futoin+cbor": {
        source: "iana"
      },
      "application/vnd.futoin+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.fuzzysheet": {
        source: "iana",
        extensions: ["fzs"]
      },
      "application/vnd.genomatix.tuxedo": {
        source: "iana",
        extensions: ["txd"]
      },
      "application/vnd.gentics.grd+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.geo+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.geocube+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.geogebra.file": {
        source: "iana",
        extensions: ["ggb"]
      },
      "application/vnd.geogebra.slides": {
        source: "iana"
      },
      "application/vnd.geogebra.tool": {
        source: "iana",
        extensions: ["ggt"]
      },
      "application/vnd.geometry-explorer": {
        source: "iana",
        extensions: ["gex", "gre"]
      },
      "application/vnd.geonext": {
        source: "iana",
        extensions: ["gxt"]
      },
      "application/vnd.geoplan": {
        source: "iana",
        extensions: ["g2w"]
      },
      "application/vnd.geospace": {
        source: "iana",
        extensions: ["g3w"]
      },
      "application/vnd.gerber": {
        source: "iana"
      },
      "application/vnd.globalplatform.card-content-mgt": {
        source: "iana"
      },
      "application/vnd.globalplatform.card-content-mgt-response": {
        source: "iana"
      },
      "application/vnd.gmx": {
        source: "iana",
        extensions: ["gmx"]
      },
      "application/vnd.google-apps.document": {
        compressible: false,
        extensions: ["gdoc"]
      },
      "application/vnd.google-apps.presentation": {
        compressible: false,
        extensions: ["gslides"]
      },
      "application/vnd.google-apps.spreadsheet": {
        compressible: false,
        extensions: ["gsheet"]
      },
      "application/vnd.google-earth.kml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["kml"]
      },
      "application/vnd.google-earth.kmz": {
        source: "iana",
        compressible: false,
        extensions: ["kmz"]
      },
      "application/vnd.gov.sk.e-form+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.gov.sk.e-form+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.gov.sk.xmldatacontainer+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.grafeq": {
        source: "iana",
        extensions: ["gqf", "gqs"]
      },
      "application/vnd.gridmp": {
        source: "iana"
      },
      "application/vnd.groove-account": {
        source: "iana",
        extensions: ["gac"]
      },
      "application/vnd.groove-help": {
        source: "iana",
        extensions: ["ghf"]
      },
      "application/vnd.groove-identity-message": {
        source: "iana",
        extensions: ["gim"]
      },
      "application/vnd.groove-injector": {
        source: "iana",
        extensions: ["grv"]
      },
      "application/vnd.groove-tool-message": {
        source: "iana",
        extensions: ["gtm"]
      },
      "application/vnd.groove-tool-template": {
        source: "iana",
        extensions: ["tpl"]
      },
      "application/vnd.groove-vcard": {
        source: "iana",
        extensions: ["vcg"]
      },
      "application/vnd.hal+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.hal+xml": {
        source: "iana",
        compressible: true,
        extensions: ["hal"]
      },
      "application/vnd.handheld-entertainment+xml": {
        source: "iana",
        compressible: true,
        extensions: ["zmm"]
      },
      "application/vnd.hbci": {
        source: "iana",
        extensions: ["hbci"]
      },
      "application/vnd.hc+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.hcl-bireports": {
        source: "iana"
      },
      "application/vnd.hdt": {
        source: "iana"
      },
      "application/vnd.heroku+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.hhe.lesson-player": {
        source: "iana",
        extensions: ["les"]
      },
      "application/vnd.hl7cda+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/vnd.hl7v2+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/vnd.hp-hpgl": {
        source: "iana",
        extensions: ["hpgl"]
      },
      "application/vnd.hp-hpid": {
        source: "iana",
        extensions: ["hpid"]
      },
      "application/vnd.hp-hps": {
        source: "iana",
        extensions: ["hps"]
      },
      "application/vnd.hp-jlyt": {
        source: "iana",
        extensions: ["jlt"]
      },
      "application/vnd.hp-pcl": {
        source: "iana",
        extensions: ["pcl"]
      },
      "application/vnd.hp-pclxl": {
        source: "iana",
        extensions: ["pclxl"]
      },
      "application/vnd.httphone": {
        source: "iana"
      },
      "application/vnd.hydrostatix.sof-data": {
        source: "iana",
        extensions: ["sfd-hdstx"]
      },
      "application/vnd.hyper+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.hyper-item+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.hyperdrive+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.hzn-3d-crossword": {
        source: "iana"
      },
      "application/vnd.ibm.afplinedata": {
        source: "iana"
      },
      "application/vnd.ibm.electronic-media": {
        source: "iana"
      },
      "application/vnd.ibm.minipay": {
        source: "iana",
        extensions: ["mpy"]
      },
      "application/vnd.ibm.modcap": {
        source: "iana",
        extensions: ["afp", "listafp", "list3820"]
      },
      "application/vnd.ibm.rights-management": {
        source: "iana",
        extensions: ["irm"]
      },
      "application/vnd.ibm.secure-container": {
        source: "iana",
        extensions: ["sc"]
      },
      "application/vnd.iccprofile": {
        source: "iana",
        extensions: ["icc", "icm"]
      },
      "application/vnd.ieee.1905": {
        source: "iana"
      },
      "application/vnd.igloader": {
        source: "iana",
        extensions: ["igl"]
      },
      "application/vnd.imagemeter.folder+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.imagemeter.image+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.immervision-ivp": {
        source: "iana",
        extensions: ["ivp"]
      },
      "application/vnd.immervision-ivu": {
        source: "iana",
        extensions: ["ivu"]
      },
      "application/vnd.ims.imsccv1p1": {
        source: "iana"
      },
      "application/vnd.ims.imsccv1p2": {
        source: "iana"
      },
      "application/vnd.ims.imsccv1p3": {
        source: "iana"
      },
      "application/vnd.ims.lis.v2.result+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ims.lti.v2.toolconsumerprofile+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ims.lti.v2.toolproxy+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ims.lti.v2.toolproxy.id+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ims.lti.v2.toolsettings+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ims.lti.v2.toolsettings.simple+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.informedcontrol.rms+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.informix-visionary": {
        source: "iana"
      },
      "application/vnd.infotech.project": {
        source: "iana"
      },
      "application/vnd.infotech.project+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.innopath.wamp.notification": {
        source: "iana"
      },
      "application/vnd.insors.igm": {
        source: "iana",
        extensions: ["igm"]
      },
      "application/vnd.intercon.formnet": {
        source: "iana",
        extensions: ["xpw", "xpx"]
      },
      "application/vnd.intergeo": {
        source: "iana",
        extensions: ["i2g"]
      },
      "application/vnd.intertrust.digibox": {
        source: "iana"
      },
      "application/vnd.intertrust.nncp": {
        source: "iana"
      },
      "application/vnd.intu.qbo": {
        source: "iana",
        extensions: ["qbo"]
      },
      "application/vnd.intu.qfx": {
        source: "iana",
        extensions: ["qfx"]
      },
      "application/vnd.iptc.g2.catalogitem+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.iptc.g2.conceptitem+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.iptc.g2.knowledgeitem+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.iptc.g2.newsitem+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.iptc.g2.newsmessage+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.iptc.g2.packageitem+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.iptc.g2.planningitem+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ipunplugged.rcprofile": {
        source: "iana",
        extensions: ["rcprofile"]
      },
      "application/vnd.irepository.package+xml": {
        source: "iana",
        compressible: true,
        extensions: ["irp"]
      },
      "application/vnd.is-xpr": {
        source: "iana",
        extensions: ["xpr"]
      },
      "application/vnd.isac.fcs": {
        source: "iana",
        extensions: ["fcs"]
      },
      "application/vnd.iso11783-10+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.jam": {
        source: "iana",
        extensions: ["jam"]
      },
      "application/vnd.japannet-directory-service": {
        source: "iana"
      },
      "application/vnd.japannet-jpnstore-wakeup": {
        source: "iana"
      },
      "application/vnd.japannet-payment-wakeup": {
        source: "iana"
      },
      "application/vnd.japannet-registration": {
        source: "iana"
      },
      "application/vnd.japannet-registration-wakeup": {
        source: "iana"
      },
      "application/vnd.japannet-setstore-wakeup": {
        source: "iana"
      },
      "application/vnd.japannet-verification": {
        source: "iana"
      },
      "application/vnd.japannet-verification-wakeup": {
        source: "iana"
      },
      "application/vnd.jcp.javame.midlet-rms": {
        source: "iana",
        extensions: ["rms"]
      },
      "application/vnd.jisp": {
        source: "iana",
        extensions: ["jisp"]
      },
      "application/vnd.joost.joda-archive": {
        source: "iana",
        extensions: ["joda"]
      },
      "application/vnd.jsk.isdn-ngn": {
        source: "iana"
      },
      "application/vnd.kahootz": {
        source: "iana",
        extensions: ["ktz", "ktr"]
      },
      "application/vnd.kde.karbon": {
        source: "iana",
        extensions: ["karbon"]
      },
      "application/vnd.kde.kchart": {
        source: "iana",
        extensions: ["chrt"]
      },
      "application/vnd.kde.kformula": {
        source: "iana",
        extensions: ["kfo"]
      },
      "application/vnd.kde.kivio": {
        source: "iana",
        extensions: ["flw"]
      },
      "application/vnd.kde.kontour": {
        source: "iana",
        extensions: ["kon"]
      },
      "application/vnd.kde.kpresenter": {
        source: "iana",
        extensions: ["kpr", "kpt"]
      },
      "application/vnd.kde.kspread": {
        source: "iana",
        extensions: ["ksp"]
      },
      "application/vnd.kde.kword": {
        source: "iana",
        extensions: ["kwd", "kwt"]
      },
      "application/vnd.kenameaapp": {
        source: "iana",
        extensions: ["htke"]
      },
      "application/vnd.kidspiration": {
        source: "iana",
        extensions: ["kia"]
      },
      "application/vnd.kinar": {
        source: "iana",
        extensions: ["kne", "knp"]
      },
      "application/vnd.koan": {
        source: "iana",
        extensions: ["skp", "skd", "skt", "skm"]
      },
      "application/vnd.kodak-descriptor": {
        source: "iana",
        extensions: ["sse"]
      },
      "application/vnd.las": {
        source: "iana"
      },
      "application/vnd.las.las+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.las.las+xml": {
        source: "iana",
        compressible: true,
        extensions: ["lasxml"]
      },
      "application/vnd.laszip": {
        source: "iana"
      },
      "application/vnd.leap+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.liberty-request+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.llamagraphics.life-balance.desktop": {
        source: "iana",
        extensions: ["lbd"]
      },
      "application/vnd.llamagraphics.life-balance.exchange+xml": {
        source: "iana",
        compressible: true,
        extensions: ["lbe"]
      },
      "application/vnd.logipipe.circuit+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.loom": {
        source: "iana"
      },
      "application/vnd.lotus-1-2-3": {
        source: "iana",
        extensions: ["123"]
      },
      "application/vnd.lotus-approach": {
        source: "iana",
        extensions: ["apr"]
      },
      "application/vnd.lotus-freelance": {
        source: "iana",
        extensions: ["pre"]
      },
      "application/vnd.lotus-notes": {
        source: "iana",
        extensions: ["nsf"]
      },
      "application/vnd.lotus-organizer": {
        source: "iana",
        extensions: ["org"]
      },
      "application/vnd.lotus-screencam": {
        source: "iana",
        extensions: ["scm"]
      },
      "application/vnd.lotus-wordpro": {
        source: "iana",
        extensions: ["lwp"]
      },
      "application/vnd.macports.portpkg": {
        source: "iana",
        extensions: ["portpkg"]
      },
      "application/vnd.mapbox-vector-tile": {
        source: "iana",
        extensions: ["mvt"]
      },
      "application/vnd.marlin.drm.actiontoken+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.marlin.drm.conftoken+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.marlin.drm.license+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.marlin.drm.mdcf": {
        source: "iana"
      },
      "application/vnd.mason+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.maxar.archive.3tz+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.maxmind.maxmind-db": {
        source: "iana"
      },
      "application/vnd.mcd": {
        source: "iana",
        extensions: ["mcd"]
      },
      "application/vnd.medcalcdata": {
        source: "iana",
        extensions: ["mc1"]
      },
      "application/vnd.mediastation.cdkey": {
        source: "iana",
        extensions: ["cdkey"]
      },
      "application/vnd.meridian-slingshot": {
        source: "iana"
      },
      "application/vnd.mfer": {
        source: "iana",
        extensions: ["mwf"]
      },
      "application/vnd.mfmp": {
        source: "iana",
        extensions: ["mfm"]
      },
      "application/vnd.micro+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.micrografx.flo": {
        source: "iana",
        extensions: ["flo"]
      },
      "application/vnd.micrografx.igx": {
        source: "iana",
        extensions: ["igx"]
      },
      "application/vnd.microsoft.portable-executable": {
        source: "iana"
      },
      "application/vnd.microsoft.windows.thumbnail-cache": {
        source: "iana"
      },
      "application/vnd.miele+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.mif": {
        source: "iana",
        extensions: ["mif"]
      },
      "application/vnd.minisoft-hp3000-save": {
        source: "iana"
      },
      "application/vnd.mitsubishi.misty-guard.trustweb": {
        source: "iana"
      },
      "application/vnd.mobius.daf": {
        source: "iana",
        extensions: ["daf"]
      },
      "application/vnd.mobius.dis": {
        source: "iana",
        extensions: ["dis"]
      },
      "application/vnd.mobius.mbk": {
        source: "iana",
        extensions: ["mbk"]
      },
      "application/vnd.mobius.mqy": {
        source: "iana",
        extensions: ["mqy"]
      },
      "application/vnd.mobius.msl": {
        source: "iana",
        extensions: ["msl"]
      },
      "application/vnd.mobius.plc": {
        source: "iana",
        extensions: ["plc"]
      },
      "application/vnd.mobius.txf": {
        source: "iana",
        extensions: ["txf"]
      },
      "application/vnd.mophun.application": {
        source: "iana",
        extensions: ["mpn"]
      },
      "application/vnd.mophun.certificate": {
        source: "iana",
        extensions: ["mpc"]
      },
      "application/vnd.motorola.flexsuite": {
        source: "iana"
      },
      "application/vnd.motorola.flexsuite.adsi": {
        source: "iana"
      },
      "application/vnd.motorola.flexsuite.fis": {
        source: "iana"
      },
      "application/vnd.motorola.flexsuite.gotap": {
        source: "iana"
      },
      "application/vnd.motorola.flexsuite.kmr": {
        source: "iana"
      },
      "application/vnd.motorola.flexsuite.ttc": {
        source: "iana"
      },
      "application/vnd.motorola.flexsuite.wem": {
        source: "iana"
      },
      "application/vnd.motorola.iprm": {
        source: "iana"
      },
      "application/vnd.mozilla.xul+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xul"]
      },
      "application/vnd.ms-3mfdocument": {
        source: "iana"
      },
      "application/vnd.ms-artgalry": {
        source: "iana",
        extensions: ["cil"]
      },
      "application/vnd.ms-asf": {
        source: "iana"
      },
      "application/vnd.ms-cab-compressed": {
        source: "iana",
        extensions: ["cab"]
      },
      "application/vnd.ms-color.iccprofile": {
        source: "apache"
      },
      "application/vnd.ms-excel": {
        source: "iana",
        compressible: false,
        extensions: ["xls", "xlm", "xla", "xlc", "xlt", "xlw"]
      },
      "application/vnd.ms-excel.addin.macroenabled.12": {
        source: "iana",
        extensions: ["xlam"]
      },
      "application/vnd.ms-excel.sheet.binary.macroenabled.12": {
        source: "iana",
        extensions: ["xlsb"]
      },
      "application/vnd.ms-excel.sheet.macroenabled.12": {
        source: "iana",
        extensions: ["xlsm"]
      },
      "application/vnd.ms-excel.template.macroenabled.12": {
        source: "iana",
        extensions: ["xltm"]
      },
      "application/vnd.ms-fontobject": {
        source: "iana",
        compressible: true,
        extensions: ["eot"]
      },
      "application/vnd.ms-htmlhelp": {
        source: "iana",
        extensions: ["chm"]
      },
      "application/vnd.ms-ims": {
        source: "iana",
        extensions: ["ims"]
      },
      "application/vnd.ms-lrm": {
        source: "iana",
        extensions: ["lrm"]
      },
      "application/vnd.ms-office.activex+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ms-officetheme": {
        source: "iana",
        extensions: ["thmx"]
      },
      "application/vnd.ms-opentype": {
        source: "apache",
        compressible: true
      },
      "application/vnd.ms-outlook": {
        compressible: false,
        extensions: ["msg"]
      },
      "application/vnd.ms-package.obfuscated-opentype": {
        source: "apache"
      },
      "application/vnd.ms-pki.seccat": {
        source: "apache",
        extensions: ["cat"]
      },
      "application/vnd.ms-pki.stl": {
        source: "apache",
        extensions: ["stl"]
      },
      "application/vnd.ms-playready.initiator+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ms-powerpoint": {
        source: "iana",
        compressible: false,
        extensions: ["ppt", "pps", "pot"]
      },
      "application/vnd.ms-powerpoint.addin.macroenabled.12": {
        source: "iana",
        extensions: ["ppam"]
      },
      "application/vnd.ms-powerpoint.presentation.macroenabled.12": {
        source: "iana",
        extensions: ["pptm"]
      },
      "application/vnd.ms-powerpoint.slide.macroenabled.12": {
        source: "iana",
        extensions: ["sldm"]
      },
      "application/vnd.ms-powerpoint.slideshow.macroenabled.12": {
        source: "iana",
        extensions: ["ppsm"]
      },
      "application/vnd.ms-powerpoint.template.macroenabled.12": {
        source: "iana",
        extensions: ["potm"]
      },
      "application/vnd.ms-printdevicecapabilities+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ms-printing.printticket+xml": {
        source: "apache",
        compressible: true
      },
      "application/vnd.ms-printschematicket+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ms-project": {
        source: "iana",
        extensions: ["mpp", "mpt"]
      },
      "application/vnd.ms-tnef": {
        source: "iana"
      },
      "application/vnd.ms-windows.devicepairing": {
        source: "iana"
      },
      "application/vnd.ms-windows.nwprinting.oob": {
        source: "iana"
      },
      "application/vnd.ms-windows.printerpairing": {
        source: "iana"
      },
      "application/vnd.ms-windows.wsd.oob": {
        source: "iana"
      },
      "application/vnd.ms-wmdrm.lic-chlg-req": {
        source: "iana"
      },
      "application/vnd.ms-wmdrm.lic-resp": {
        source: "iana"
      },
      "application/vnd.ms-wmdrm.meter-chlg-req": {
        source: "iana"
      },
      "application/vnd.ms-wmdrm.meter-resp": {
        source: "iana"
      },
      "application/vnd.ms-word.document.macroenabled.12": {
        source: "iana",
        extensions: ["docm"]
      },
      "application/vnd.ms-word.template.macroenabled.12": {
        source: "iana",
        extensions: ["dotm"]
      },
      "application/vnd.ms-works": {
        source: "iana",
        extensions: ["wps", "wks", "wcm", "wdb"]
      },
      "application/vnd.ms-wpl": {
        source: "iana",
        extensions: ["wpl"]
      },
      "application/vnd.ms-xpsdocument": {
        source: "iana",
        compressible: false,
        extensions: ["xps"]
      },
      "application/vnd.msa-disk-image": {
        source: "iana"
      },
      "application/vnd.mseq": {
        source: "iana",
        extensions: ["mseq"]
      },
      "application/vnd.msign": {
        source: "iana"
      },
      "application/vnd.multiad.creator": {
        source: "iana"
      },
      "application/vnd.multiad.creator.cif": {
        source: "iana"
      },
      "application/vnd.music-niff": {
        source: "iana"
      },
      "application/vnd.musician": {
        source: "iana",
        extensions: ["mus"]
      },
      "application/vnd.muvee.style": {
        source: "iana",
        extensions: ["msty"]
      },
      "application/vnd.mynfc": {
        source: "iana",
        extensions: ["taglet"]
      },
      "application/vnd.nacamar.ybrid+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ncd.control": {
        source: "iana"
      },
      "application/vnd.ncd.reference": {
        source: "iana"
      },
      "application/vnd.nearst.inv+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.nebumind.line": {
        source: "iana"
      },
      "application/vnd.nervana": {
        source: "iana"
      },
      "application/vnd.netfpx": {
        source: "iana"
      },
      "application/vnd.neurolanguage.nlu": {
        source: "iana",
        extensions: ["nlu"]
      },
      "application/vnd.nimn": {
        source: "iana"
      },
      "application/vnd.nintendo.nitro.rom": {
        source: "iana"
      },
      "application/vnd.nintendo.snes.rom": {
        source: "iana"
      },
      "application/vnd.nitf": {
        source: "iana",
        extensions: ["ntf", "nitf"]
      },
      "application/vnd.noblenet-directory": {
        source: "iana",
        extensions: ["nnd"]
      },
      "application/vnd.noblenet-sealer": {
        source: "iana",
        extensions: ["nns"]
      },
      "application/vnd.noblenet-web": {
        source: "iana",
        extensions: ["nnw"]
      },
      "application/vnd.nokia.catalogs": {
        source: "iana"
      },
      "application/vnd.nokia.conml+wbxml": {
        source: "iana"
      },
      "application/vnd.nokia.conml+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.nokia.iptv.config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.nokia.isds-radio-presets": {
        source: "iana"
      },
      "application/vnd.nokia.landmark+wbxml": {
        source: "iana"
      },
      "application/vnd.nokia.landmark+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.nokia.landmarkcollection+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.nokia.n-gage.ac+xml": {
        source: "iana",
        compressible: true,
        extensions: ["ac"]
      },
      "application/vnd.nokia.n-gage.data": {
        source: "iana",
        extensions: ["ngdat"]
      },
      "application/vnd.nokia.n-gage.symbian.install": {
        source: "iana",
        extensions: ["n-gage"]
      },
      "application/vnd.nokia.ncd": {
        source: "iana"
      },
      "application/vnd.nokia.pcd+wbxml": {
        source: "iana"
      },
      "application/vnd.nokia.pcd+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.nokia.radio-preset": {
        source: "iana",
        extensions: ["rpst"]
      },
      "application/vnd.nokia.radio-presets": {
        source: "iana",
        extensions: ["rpss"]
      },
      "application/vnd.novadigm.edm": {
        source: "iana",
        extensions: ["edm"]
      },
      "application/vnd.novadigm.edx": {
        source: "iana",
        extensions: ["edx"]
      },
      "application/vnd.novadigm.ext": {
        source: "iana",
        extensions: ["ext"]
      },
      "application/vnd.ntt-local.content-share": {
        source: "iana"
      },
      "application/vnd.ntt-local.file-transfer": {
        source: "iana"
      },
      "application/vnd.ntt-local.ogw_remote-access": {
        source: "iana"
      },
      "application/vnd.ntt-local.sip-ta_remote": {
        source: "iana"
      },
      "application/vnd.ntt-local.sip-ta_tcp_stream": {
        source: "iana"
      },
      "application/vnd.oasis.opendocument.chart": {
        source: "iana",
        extensions: ["odc"]
      },
      "application/vnd.oasis.opendocument.chart-template": {
        source: "iana",
        extensions: ["otc"]
      },
      "application/vnd.oasis.opendocument.database": {
        source: "iana",
        extensions: ["odb"]
      },
      "application/vnd.oasis.opendocument.formula": {
        source: "iana",
        extensions: ["odf"]
      },
      "application/vnd.oasis.opendocument.formula-template": {
        source: "iana",
        extensions: ["odft"]
      },
      "application/vnd.oasis.opendocument.graphics": {
        source: "iana",
        compressible: false,
        extensions: ["odg"]
      },
      "application/vnd.oasis.opendocument.graphics-template": {
        source: "iana",
        extensions: ["otg"]
      },
      "application/vnd.oasis.opendocument.image": {
        source: "iana",
        extensions: ["odi"]
      },
      "application/vnd.oasis.opendocument.image-template": {
        source: "iana",
        extensions: ["oti"]
      },
      "application/vnd.oasis.opendocument.presentation": {
        source: "iana",
        compressible: false,
        extensions: ["odp"]
      },
      "application/vnd.oasis.opendocument.presentation-template": {
        source: "iana",
        extensions: ["otp"]
      },
      "application/vnd.oasis.opendocument.spreadsheet": {
        source: "iana",
        compressible: false,
        extensions: ["ods"]
      },
      "application/vnd.oasis.opendocument.spreadsheet-template": {
        source: "iana",
        extensions: ["ots"]
      },
      "application/vnd.oasis.opendocument.text": {
        source: "iana",
        compressible: false,
        extensions: ["odt"]
      },
      "application/vnd.oasis.opendocument.text-master": {
        source: "iana",
        extensions: ["odm"]
      },
      "application/vnd.oasis.opendocument.text-template": {
        source: "iana",
        extensions: ["ott"]
      },
      "application/vnd.oasis.opendocument.text-web": {
        source: "iana",
        extensions: ["oth"]
      },
      "application/vnd.obn": {
        source: "iana"
      },
      "application/vnd.ocf+cbor": {
        source: "iana"
      },
      "application/vnd.oci.image.manifest.v1+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oftn.l10n+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.contentaccessdownload+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.contentaccessstreaming+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.cspg-hexbinary": {
        source: "iana"
      },
      "application/vnd.oipf.dae.svg+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.dae.xhtml+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.mippvcontrolmessage+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.pae.gem": {
        source: "iana"
      },
      "application/vnd.oipf.spdiscovery+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.spdlist+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.ueprofile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.userprofile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.olpc-sugar": {
        source: "iana",
        extensions: ["xo"]
      },
      "application/vnd.oma-scws-config": {
        source: "iana"
      },
      "application/vnd.oma-scws-http-request": {
        source: "iana"
      },
      "application/vnd.oma-scws-http-response": {
        source: "iana"
      },
      "application/vnd.oma.bcast.associated-procedure-parameter+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.drm-trigger+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.imd+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.ltkm": {
        source: "iana"
      },
      "application/vnd.oma.bcast.notification+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.provisioningtrigger": {
        source: "iana"
      },
      "application/vnd.oma.bcast.sgboot": {
        source: "iana"
      },
      "application/vnd.oma.bcast.sgdd+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.sgdu": {
        source: "iana"
      },
      "application/vnd.oma.bcast.simple-symbol-container": {
        source: "iana"
      },
      "application/vnd.oma.bcast.smartcard-trigger+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.sprov+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.stkm": {
        source: "iana"
      },
      "application/vnd.oma.cab-address-book+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.cab-feature-handler+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.cab-pcc+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.cab-subs-invite+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.cab-user-prefs+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.dcd": {
        source: "iana"
      },
      "application/vnd.oma.dcdc": {
        source: "iana"
      },
      "application/vnd.oma.dd2+xml": {
        source: "iana",
        compressible: true,
        extensions: ["dd2"]
      },
      "application/vnd.oma.drm.risd+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.group-usage-list+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.lwm2m+cbor": {
        source: "iana"
      },
      "application/vnd.oma.lwm2m+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.lwm2m+tlv": {
        source: "iana"
      },
      "application/vnd.oma.pal+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.poc.detailed-progress-report+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.poc.final-report+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.poc.groups+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.poc.invocation-descriptor+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.poc.optimized-progress-report+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.push": {
        source: "iana"
      },
      "application/vnd.oma.scidm.messages+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.xcap-directory+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.omads-email+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/vnd.omads-file+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/vnd.omads-folder+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/vnd.omaloc-supl-init": {
        source: "iana"
      },
      "application/vnd.onepager": {
        source: "iana"
      },
      "application/vnd.onepagertamp": {
        source: "iana"
      },
      "application/vnd.onepagertamx": {
        source: "iana"
      },
      "application/vnd.onepagertat": {
        source: "iana"
      },
      "application/vnd.onepagertatp": {
        source: "iana"
      },
      "application/vnd.onepagertatx": {
        source: "iana"
      },
      "application/vnd.openblox.game+xml": {
        source: "iana",
        compressible: true,
        extensions: ["obgx"]
      },
      "application/vnd.openblox.game-binary": {
        source: "iana"
      },
      "application/vnd.openeye.oeb": {
        source: "iana"
      },
      "application/vnd.openofficeorg.extension": {
        source: "apache",
        extensions: ["oxt"]
      },
      "application/vnd.openstreetmap.data+xml": {
        source: "iana",
        compressible: true,
        extensions: ["osm"]
      },
      "application/vnd.opentimestamps.ots": {
        source: "iana"
      },
      "application/vnd.openxmlformats-officedocument.custom-properties+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.customxmlproperties+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawing+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawingml.chart+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawingml.diagramcolors+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawingml.diagramdata+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawingml.diagramlayout+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawingml.diagramstyle+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.extended-properties+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.commentauthors+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.comments+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.handoutmaster+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.notesmaster+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.notesslide+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.presentation": {
        source: "iana",
        compressible: false,
        extensions: ["pptx"]
      },
      "application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.presprops+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slide": {
        source: "iana",
        extensions: ["sldx"]
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slide+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slidelayout+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slidemaster+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slideshow": {
        source: "iana",
        extensions: ["ppsx"]
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slideshow.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slideupdateinfo+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.tablestyles+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.tags+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.template": {
        source: "iana",
        extensions: ["potx"]
      },
      "application/vnd.openxmlformats-officedocument.presentationml.template.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.viewprops+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.calcchain+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.externallink+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcachedefinition+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcacherecords+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.pivottable+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.querytable+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionheaders+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionlog+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedstrings+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
        source: "iana",
        compressible: false,
        extensions: ["xlsx"]
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheetmetadata+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.tablesinglecells+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.template": {
        source: "iana",
        extensions: ["xltx"]
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.usernames+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.volatiledependencies+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.theme+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.themeoverride+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.vmldrawing": {
        source: "iana"
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
        source: "iana",
        compressible: false,
        extensions: ["docx"]
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document.glossary+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.fonttable+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.template": {
        source: "iana",
        extensions: ["dotx"]
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.websettings+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-package.core-properties+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-package.digital-signature-xmlsignature+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-package.relationships+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oracle.resource+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.orange.indata": {
        source: "iana"
      },
      "application/vnd.osa.netdeploy": {
        source: "iana"
      },
      "application/vnd.osgeo.mapguide.package": {
        source: "iana",
        extensions: ["mgp"]
      },
      "application/vnd.osgi.bundle": {
        source: "iana"
      },
      "application/vnd.osgi.dp": {
        source: "iana",
        extensions: ["dp"]
      },
      "application/vnd.osgi.subsystem": {
        source: "iana",
        extensions: ["esa"]
      },
      "application/vnd.otps.ct-kip+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oxli.countgraph": {
        source: "iana"
      },
      "application/vnd.pagerduty+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.palm": {
        source: "iana",
        extensions: ["pdb", "pqa", "oprc"]
      },
      "application/vnd.panoply": {
        source: "iana"
      },
      "application/vnd.paos.xml": {
        source: "iana"
      },
      "application/vnd.patentdive": {
        source: "iana"
      },
      "application/vnd.patientecommsdoc": {
        source: "iana"
      },
      "application/vnd.pawaafile": {
        source: "iana",
        extensions: ["paw"]
      },
      "application/vnd.pcos": {
        source: "iana"
      },
      "application/vnd.pg.format": {
        source: "iana",
        extensions: ["str"]
      },
      "application/vnd.pg.osasli": {
        source: "iana",
        extensions: ["ei6"]
      },
      "application/vnd.piaccess.application-licence": {
        source: "iana"
      },
      "application/vnd.picsel": {
        source: "iana",
        extensions: ["efif"]
      },
      "application/vnd.pmi.widget": {
        source: "iana",
        extensions: ["wg"]
      },
      "application/vnd.poc.group-advertisement+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.pocketlearn": {
        source: "iana",
        extensions: ["plf"]
      },
      "application/vnd.powerbuilder6": {
        source: "iana",
        extensions: ["pbd"]
      },
      "application/vnd.powerbuilder6-s": {
        source: "iana"
      },
      "application/vnd.powerbuilder7": {
        source: "iana"
      },
      "application/vnd.powerbuilder7-s": {
        source: "iana"
      },
      "application/vnd.powerbuilder75": {
        source: "iana"
      },
      "application/vnd.powerbuilder75-s": {
        source: "iana"
      },
      "application/vnd.preminet": {
        source: "iana"
      },
      "application/vnd.previewsystems.box": {
        source: "iana",
        extensions: ["box"]
      },
      "application/vnd.proteus.magazine": {
        source: "iana",
        extensions: ["mgz"]
      },
      "application/vnd.psfs": {
        source: "iana"
      },
      "application/vnd.publishare-delta-tree": {
        source: "iana",
        extensions: ["qps"]
      },
      "application/vnd.pvi.ptid1": {
        source: "iana",
        extensions: ["ptid"]
      },
      "application/vnd.pwg-multiplexed": {
        source: "iana"
      },
      "application/vnd.pwg-xhtml-print+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.qualcomm.brew-app-res": {
        source: "iana"
      },
      "application/vnd.quarantainenet": {
        source: "iana"
      },
      "application/vnd.quark.quarkxpress": {
        source: "iana",
        extensions: ["qxd", "qxt", "qwd", "qwt", "qxl", "qxb"]
      },
      "application/vnd.quobject-quoxdocument": {
        source: "iana"
      },
      "application/vnd.radisys.moml+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-audit+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-audit-conf+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-audit-conn+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-audit-dialog+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-audit-stream+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-conf+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog-base+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog-fax-detect+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog-fax-sendrecv+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog-group+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog-speech+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog-transform+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.rainstor.data": {
        source: "iana"
      },
      "application/vnd.rapid": {
        source: "iana"
      },
      "application/vnd.rar": {
        source: "iana",
        extensions: ["rar"]
      },
      "application/vnd.realvnc.bed": {
        source: "iana",
        extensions: ["bed"]
      },
      "application/vnd.recordare.musicxml": {
        source: "iana",
        extensions: ["mxl"]
      },
      "application/vnd.recordare.musicxml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["musicxml"]
      },
      "application/vnd.renlearn.rlprint": {
        source: "iana"
      },
      "application/vnd.resilient.logic": {
        source: "iana"
      },
      "application/vnd.restful+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.rig.cryptonote": {
        source: "iana",
        extensions: ["cryptonote"]
      },
      "application/vnd.rim.cod": {
        source: "apache",
        extensions: ["cod"]
      },
      "application/vnd.rn-realmedia": {
        source: "apache",
        extensions: ["rm"]
      },
      "application/vnd.rn-realmedia-vbr": {
        source: "apache",
        extensions: ["rmvb"]
      },
      "application/vnd.route66.link66+xml": {
        source: "iana",
        compressible: true,
        extensions: ["link66"]
      },
      "application/vnd.rs-274x": {
        source: "iana"
      },
      "application/vnd.ruckus.download": {
        source: "iana"
      },
      "application/vnd.s3sms": {
        source: "iana"
      },
      "application/vnd.sailingtracker.track": {
        source: "iana",
        extensions: ["st"]
      },
      "application/vnd.sar": {
        source: "iana"
      },
      "application/vnd.sbm.cid": {
        source: "iana"
      },
      "application/vnd.sbm.mid2": {
        source: "iana"
      },
      "application/vnd.scribus": {
        source: "iana"
      },
      "application/vnd.sealed.3df": {
        source: "iana"
      },
      "application/vnd.sealed.csf": {
        source: "iana"
      },
      "application/vnd.sealed.doc": {
        source: "iana"
      },
      "application/vnd.sealed.eml": {
        source: "iana"
      },
      "application/vnd.sealed.mht": {
        source: "iana"
      },
      "application/vnd.sealed.net": {
        source: "iana"
      },
      "application/vnd.sealed.ppt": {
        source: "iana"
      },
      "application/vnd.sealed.tiff": {
        source: "iana"
      },
      "application/vnd.sealed.xls": {
        source: "iana"
      },
      "application/vnd.sealedmedia.softseal.html": {
        source: "iana"
      },
      "application/vnd.sealedmedia.softseal.pdf": {
        source: "iana"
      },
      "application/vnd.seemail": {
        source: "iana",
        extensions: ["see"]
      },
      "application/vnd.seis+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.sema": {
        source: "iana",
        extensions: ["sema"]
      },
      "application/vnd.semd": {
        source: "iana",
        extensions: ["semd"]
      },
      "application/vnd.semf": {
        source: "iana",
        extensions: ["semf"]
      },
      "application/vnd.shade-save-file": {
        source: "iana"
      },
      "application/vnd.shana.informed.formdata": {
        source: "iana",
        extensions: ["ifm"]
      },
      "application/vnd.shana.informed.formtemplate": {
        source: "iana",
        extensions: ["itp"]
      },
      "application/vnd.shana.informed.interchange": {
        source: "iana",
        extensions: ["iif"]
      },
      "application/vnd.shana.informed.package": {
        source: "iana",
        extensions: ["ipk"]
      },
      "application/vnd.shootproof+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.shopkick+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.shp": {
        source: "iana"
      },
      "application/vnd.shx": {
        source: "iana"
      },
      "application/vnd.sigrok.session": {
        source: "iana"
      },
      "application/vnd.simtech-mindmapper": {
        source: "iana",
        extensions: ["twd", "twds"]
      },
      "application/vnd.siren+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.smaf": {
        source: "iana",
        extensions: ["mmf"]
      },
      "application/vnd.smart.notebook": {
        source: "iana"
      },
      "application/vnd.smart.teacher": {
        source: "iana",
        extensions: ["teacher"]
      },
      "application/vnd.snesdev-page-table": {
        source: "iana"
      },
      "application/vnd.software602.filler.form+xml": {
        source: "iana",
        compressible: true,
        extensions: ["fo"]
      },
      "application/vnd.software602.filler.form-xml-zip": {
        source: "iana"
      },
      "application/vnd.solent.sdkm+xml": {
        source: "iana",
        compressible: true,
        extensions: ["sdkm", "sdkd"]
      },
      "application/vnd.spotfire.dxp": {
        source: "iana",
        extensions: ["dxp"]
      },
      "application/vnd.spotfire.sfs": {
        source: "iana",
        extensions: ["sfs"]
      },
      "application/vnd.sqlite3": {
        source: "iana"
      },
      "application/vnd.sss-cod": {
        source: "iana"
      },
      "application/vnd.sss-dtf": {
        source: "iana"
      },
      "application/vnd.sss-ntf": {
        source: "iana"
      },
      "application/vnd.stardivision.calc": {
        source: "apache",
        extensions: ["sdc"]
      },
      "application/vnd.stardivision.draw": {
        source: "apache",
        extensions: ["sda"]
      },
      "application/vnd.stardivision.impress": {
        source: "apache",
        extensions: ["sdd"]
      },
      "application/vnd.stardivision.math": {
        source: "apache",
        extensions: ["smf"]
      },
      "application/vnd.stardivision.writer": {
        source: "apache",
        extensions: ["sdw", "vor"]
      },
      "application/vnd.stardivision.writer-global": {
        source: "apache",
        extensions: ["sgl"]
      },
      "application/vnd.stepmania.package": {
        source: "iana",
        extensions: ["smzip"]
      },
      "application/vnd.stepmania.stepchart": {
        source: "iana",
        extensions: ["sm"]
      },
      "application/vnd.street-stream": {
        source: "iana"
      },
      "application/vnd.sun.wadl+xml": {
        source: "iana",
        compressible: true,
        extensions: ["wadl"]
      },
      "application/vnd.sun.xml.calc": {
        source: "apache",
        extensions: ["sxc"]
      },
      "application/vnd.sun.xml.calc.template": {
        source: "apache",
        extensions: ["stc"]
      },
      "application/vnd.sun.xml.draw": {
        source: "apache",
        extensions: ["sxd"]
      },
      "application/vnd.sun.xml.draw.template": {
        source: "apache",
        extensions: ["std"]
      },
      "application/vnd.sun.xml.impress": {
        source: "apache",
        extensions: ["sxi"]
      },
      "application/vnd.sun.xml.impress.template": {
        source: "apache",
        extensions: ["sti"]
      },
      "application/vnd.sun.xml.math": {
        source: "apache",
        extensions: ["sxm"]
      },
      "application/vnd.sun.xml.writer": {
        source: "apache",
        extensions: ["sxw"]
      },
      "application/vnd.sun.xml.writer.global": {
        source: "apache",
        extensions: ["sxg"]
      },
      "application/vnd.sun.xml.writer.template": {
        source: "apache",
        extensions: ["stw"]
      },
      "application/vnd.sus-calendar": {
        source: "iana",
        extensions: ["sus", "susp"]
      },
      "application/vnd.svd": {
        source: "iana",
        extensions: ["svd"]
      },
      "application/vnd.swiftview-ics": {
        source: "iana"
      },
      "application/vnd.sycle+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.syft+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.symbian.install": {
        source: "apache",
        extensions: ["sis", "sisx"]
      },
      "application/vnd.syncml+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["xsm"]
      },
      "application/vnd.syncml.dm+wbxml": {
        source: "iana",
        charset: "UTF-8",
        extensions: ["bdm"]
      },
      "application/vnd.syncml.dm+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["xdm"]
      },
      "application/vnd.syncml.dm.notification": {
        source: "iana"
      },
      "application/vnd.syncml.dmddf+wbxml": {
        source: "iana"
      },
      "application/vnd.syncml.dmddf+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["ddf"]
      },
      "application/vnd.syncml.dmtnds+wbxml": {
        source: "iana"
      },
      "application/vnd.syncml.dmtnds+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/vnd.syncml.ds.notification": {
        source: "iana"
      },
      "application/vnd.tableschema+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.tao.intent-module-archive": {
        source: "iana",
        extensions: ["tao"]
      },
      "application/vnd.tcpdump.pcap": {
        source: "iana",
        extensions: ["pcap", "cap", "dmp"]
      },
      "application/vnd.think-cell.ppttc+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.tmd.mediaflex.api+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.tml": {
        source: "iana"
      },
      "application/vnd.tmobile-livetv": {
        source: "iana",
        extensions: ["tmo"]
      },
      "application/vnd.tri.onesource": {
        source: "iana"
      },
      "application/vnd.trid.tpt": {
        source: "iana",
        extensions: ["tpt"]
      },
      "application/vnd.triscape.mxs": {
        source: "iana",
        extensions: ["mxs"]
      },
      "application/vnd.trueapp": {
        source: "iana",
        extensions: ["tra"]
      },
      "application/vnd.truedoc": {
        source: "iana"
      },
      "application/vnd.ubisoft.webplayer": {
        source: "iana"
      },
      "application/vnd.ufdl": {
        source: "iana",
        extensions: ["ufd", "ufdl"]
      },
      "application/vnd.uiq.theme": {
        source: "iana",
        extensions: ["utz"]
      },
      "application/vnd.umajin": {
        source: "iana",
        extensions: ["umj"]
      },
      "application/vnd.unity": {
        source: "iana",
        extensions: ["unityweb"]
      },
      "application/vnd.uoml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["uoml"]
      },
      "application/vnd.uplanet.alert": {
        source: "iana"
      },
      "application/vnd.uplanet.alert-wbxml": {
        source: "iana"
      },
      "application/vnd.uplanet.bearer-choice": {
        source: "iana"
      },
      "application/vnd.uplanet.bearer-choice-wbxml": {
        source: "iana"
      },
      "application/vnd.uplanet.cacheop": {
        source: "iana"
      },
      "application/vnd.uplanet.cacheop-wbxml": {
        source: "iana"
      },
      "application/vnd.uplanet.channel": {
        source: "iana"
      },
      "application/vnd.uplanet.channel-wbxml": {
        source: "iana"
      },
      "application/vnd.uplanet.list": {
        source: "iana"
      },
      "application/vnd.uplanet.list-wbxml": {
        source: "iana"
      },
      "application/vnd.uplanet.listcmd": {
        source: "iana"
      },
      "application/vnd.uplanet.listcmd-wbxml": {
        source: "iana"
      },
      "application/vnd.uplanet.signal": {
        source: "iana"
      },
      "application/vnd.uri-map": {
        source: "iana"
      },
      "application/vnd.valve.source.material": {
        source: "iana"
      },
      "application/vnd.vcx": {
        source: "iana",
        extensions: ["vcx"]
      },
      "application/vnd.vd-study": {
        source: "iana"
      },
      "application/vnd.vectorworks": {
        source: "iana"
      },
      "application/vnd.vel+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.verimatrix.vcas": {
        source: "iana"
      },
      "application/vnd.veritone.aion+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.veryant.thin": {
        source: "iana"
      },
      "application/vnd.ves.encrypted": {
        source: "iana"
      },
      "application/vnd.vidsoft.vidconference": {
        source: "iana"
      },
      "application/vnd.visio": {
        source: "iana",
        extensions: ["vsd", "vst", "vss", "vsw"]
      },
      "application/vnd.visionary": {
        source: "iana",
        extensions: ["vis"]
      },
      "application/vnd.vividence.scriptfile": {
        source: "iana"
      },
      "application/vnd.vsf": {
        source: "iana",
        extensions: ["vsf"]
      },
      "application/vnd.wap.sic": {
        source: "iana"
      },
      "application/vnd.wap.slc": {
        source: "iana"
      },
      "application/vnd.wap.wbxml": {
        source: "iana",
        charset: "UTF-8",
        extensions: ["wbxml"]
      },
      "application/vnd.wap.wmlc": {
        source: "iana",
        extensions: ["wmlc"]
      },
      "application/vnd.wap.wmlscriptc": {
        source: "iana",
        extensions: ["wmlsc"]
      },
      "application/vnd.webturbo": {
        source: "iana",
        extensions: ["wtb"]
      },
      "application/vnd.wfa.dpp": {
        source: "iana"
      },
      "application/vnd.wfa.p2p": {
        source: "iana"
      },
      "application/vnd.wfa.wsc": {
        source: "iana"
      },
      "application/vnd.windows.devicepairing": {
        source: "iana"
      },
      "application/vnd.wmc": {
        source: "iana"
      },
      "application/vnd.wmf.bootstrap": {
        source: "iana"
      },
      "application/vnd.wolfram.mathematica": {
        source: "iana"
      },
      "application/vnd.wolfram.mathematica.package": {
        source: "iana"
      },
      "application/vnd.wolfram.player": {
        source: "iana",
        extensions: ["nbp"]
      },
      "application/vnd.wordperfect": {
        source: "iana",
        extensions: ["wpd"]
      },
      "application/vnd.wqd": {
        source: "iana",
        extensions: ["wqd"]
      },
      "application/vnd.wrq-hp3000-labelled": {
        source: "iana"
      },
      "application/vnd.wt.stf": {
        source: "iana",
        extensions: ["stf"]
      },
      "application/vnd.wv.csp+wbxml": {
        source: "iana"
      },
      "application/vnd.wv.csp+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.wv.ssp+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.xacml+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.xara": {
        source: "iana",
        extensions: ["xar"]
      },
      "application/vnd.xfdl": {
        source: "iana",
        extensions: ["xfdl"]
      },
      "application/vnd.xfdl.webform": {
        source: "iana"
      },
      "application/vnd.xmi+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.xmpie.cpkg": {
        source: "iana"
      },
      "application/vnd.xmpie.dpkg": {
        source: "iana"
      },
      "application/vnd.xmpie.plan": {
        source: "iana"
      },
      "application/vnd.xmpie.ppkg": {
        source: "iana"
      },
      "application/vnd.xmpie.xlim": {
        source: "iana"
      },
      "application/vnd.yamaha.hv-dic": {
        source: "iana",
        extensions: ["hvd"]
      },
      "application/vnd.yamaha.hv-script": {
        source: "iana",
        extensions: ["hvs"]
      },
      "application/vnd.yamaha.hv-voice": {
        source: "iana",
        extensions: ["hvp"]
      },
      "application/vnd.yamaha.openscoreformat": {
        source: "iana",
        extensions: ["osf"]
      },
      "application/vnd.yamaha.openscoreformat.osfpvg+xml": {
        source: "iana",
        compressible: true,
        extensions: ["osfpvg"]
      },
      "application/vnd.yamaha.remote-setup": {
        source: "iana"
      },
      "application/vnd.yamaha.smaf-audio": {
        source: "iana",
        extensions: ["saf"]
      },
      "application/vnd.yamaha.smaf-phrase": {
        source: "iana",
        extensions: ["spf"]
      },
      "application/vnd.yamaha.through-ngn": {
        source: "iana"
      },
      "application/vnd.yamaha.tunnel-udpencap": {
        source: "iana"
      },
      "application/vnd.yaoweme": {
        source: "iana"
      },
      "application/vnd.yellowriver-custom-menu": {
        source: "iana",
        extensions: ["cmp"]
      },
      "application/vnd.youtube.yt": {
        source: "iana"
      },
      "application/vnd.zul": {
        source: "iana",
        extensions: ["zir", "zirz"]
      },
      "application/vnd.zzazz.deck+xml": {
        source: "iana",
        compressible: true,
        extensions: ["zaz"]
      },
      "application/voicexml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["vxml"]
      },
      "application/voucher-cms+json": {
        source: "iana",
        compressible: true
      },
      "application/vq-rtcpxr": {
        source: "iana"
      },
      "application/wasm": {
        source: "iana",
        compressible: true,
        extensions: ["wasm"]
      },
      "application/watcherinfo+xml": {
        source: "iana",
        compressible: true,
        extensions: ["wif"]
      },
      "application/webpush-options+json": {
        source: "iana",
        compressible: true
      },
      "application/whoispp-query": {
        source: "iana"
      },
      "application/whoispp-response": {
        source: "iana"
      },
      "application/widget": {
        source: "iana",
        extensions: ["wgt"]
      },
      "application/winhlp": {
        source: "apache",
        extensions: ["hlp"]
      },
      "application/wita": {
        source: "iana"
      },
      "application/wordperfect5.1": {
        source: "iana"
      },
      "application/wsdl+xml": {
        source: "iana",
        compressible: true,
        extensions: ["wsdl"]
      },
      "application/wspolicy+xml": {
        source: "iana",
        compressible: true,
        extensions: ["wspolicy"]
      },
      "application/x-7z-compressed": {
        source: "apache",
        compressible: false,
        extensions: ["7z"]
      },
      "application/x-abiword": {
        source: "apache",
        extensions: ["abw"]
      },
      "application/x-ace-compressed": {
        source: "apache",
        extensions: ["ace"]
      },
      "application/x-amf": {
        source: "apache"
      },
      "application/x-apple-diskimage": {
        source: "apache",
        extensions: ["dmg"]
      },
      "application/x-arj": {
        compressible: false,
        extensions: ["arj"]
      },
      "application/x-authorware-bin": {
        source: "apache",
        extensions: ["aab", "x32", "u32", "vox"]
      },
      "application/x-authorware-map": {
        source: "apache",
        extensions: ["aam"]
      },
      "application/x-authorware-seg": {
        source: "apache",
        extensions: ["aas"]
      },
      "application/x-bcpio": {
        source: "apache",
        extensions: ["bcpio"]
      },
      "application/x-bdoc": {
        compressible: false,
        extensions: ["bdoc"]
      },
      "application/x-bittorrent": {
        source: "apache",
        extensions: ["torrent"]
      },
      "application/x-blorb": {
        source: "apache",
        extensions: ["blb", "blorb"]
      },
      "application/x-bzip": {
        source: "apache",
        compressible: false,
        extensions: ["bz"]
      },
      "application/x-bzip2": {
        source: "apache",
        compressible: false,
        extensions: ["bz2", "boz"]
      },
      "application/x-cbr": {
        source: "apache",
        extensions: ["cbr", "cba", "cbt", "cbz", "cb7"]
      },
      "application/x-cdlink": {
        source: "apache",
        extensions: ["vcd"]
      },
      "application/x-cfs-compressed": {
        source: "apache",
        extensions: ["cfs"]
      },
      "application/x-chat": {
        source: "apache",
        extensions: ["chat"]
      },
      "application/x-chess-pgn": {
        source: "apache",
        extensions: ["pgn"]
      },
      "application/x-chrome-extension": {
        extensions: ["crx"]
      },
      "application/x-cocoa": {
        source: "nginx",
        extensions: ["cco"]
      },
      "application/x-compress": {
        source: "apache"
      },
      "application/x-conference": {
        source: "apache",
        extensions: ["nsc"]
      },
      "application/x-cpio": {
        source: "apache",
        extensions: ["cpio"]
      },
      "application/x-csh": {
        source: "apache",
        extensions: ["csh"]
      },
      "application/x-deb": {
        compressible: false
      },
      "application/x-debian-package": {
        source: "apache",
        extensions: ["deb", "udeb"]
      },
      "application/x-dgc-compressed": {
        source: "apache",
        extensions: ["dgc"]
      },
      "application/x-director": {
        source: "apache",
        extensions: ["dir", "dcr", "dxr", "cst", "cct", "cxt", "w3d", "fgd", "swa"]
      },
      "application/x-doom": {
        source: "apache",
        extensions: ["wad"]
      },
      "application/x-dtbncx+xml": {
        source: "apache",
        compressible: true,
        extensions: ["ncx"]
      },
      "application/x-dtbook+xml": {
        source: "apache",
        compressible: true,
        extensions: ["dtb"]
      },
      "application/x-dtbresource+xml": {
        source: "apache",
        compressible: true,
        extensions: ["res"]
      },
      "application/x-dvi": {
        source: "apache",
        compressible: false,
        extensions: ["dvi"]
      },
      "application/x-envoy": {
        source: "apache",
        extensions: ["evy"]
      },
      "application/x-eva": {
        source: "apache",
        extensions: ["eva"]
      },
      "application/x-font-bdf": {
        source: "apache",
        extensions: ["bdf"]
      },
      "application/x-font-dos": {
        source: "apache"
      },
      "application/x-font-framemaker": {
        source: "apache"
      },
      "application/x-font-ghostscript": {
        source: "apache",
        extensions: ["gsf"]
      },
      "application/x-font-libgrx": {
        source: "apache"
      },
      "application/x-font-linux-psf": {
        source: "apache",
        extensions: ["psf"]
      },
      "application/x-font-pcf": {
        source: "apache",
        extensions: ["pcf"]
      },
      "application/x-font-snf": {
        source: "apache",
        extensions: ["snf"]
      },
      "application/x-font-speedo": {
        source: "apache"
      },
      "application/x-font-sunos-news": {
        source: "apache"
      },
      "application/x-font-type1": {
        source: "apache",
        extensions: ["pfa", "pfb", "pfm", "afm"]
      },
      "application/x-font-vfont": {
        source: "apache"
      },
      "application/x-freearc": {
        source: "apache",
        extensions: ["arc"]
      },
      "application/x-futuresplash": {
        source: "apache",
        extensions: ["spl"]
      },
      "application/x-gca-compressed": {
        source: "apache",
        extensions: ["gca"]
      },
      "application/x-glulx": {
        source: "apache",
        extensions: ["ulx"]
      },
      "application/x-gnumeric": {
        source: "apache",
        extensions: ["gnumeric"]
      },
      "application/x-gramps-xml": {
        source: "apache",
        extensions: ["gramps"]
      },
      "application/x-gtar": {
        source: "apache",
        extensions: ["gtar"]
      },
      "application/x-gzip": {
        source: "apache"
      },
      "application/x-hdf": {
        source: "apache",
        extensions: ["hdf"]
      },
      "application/x-httpd-php": {
        compressible: true,
        extensions: ["php"]
      },
      "application/x-install-instructions": {
        source: "apache",
        extensions: ["install"]
      },
      "application/x-iso9660-image": {
        source: "apache",
        extensions: ["iso"]
      },
      "application/x-iwork-keynote-sffkey": {
        extensions: ["key"]
      },
      "application/x-iwork-numbers-sffnumbers": {
        extensions: ["numbers"]
      },
      "application/x-iwork-pages-sffpages": {
        extensions: ["pages"]
      },
      "application/x-java-archive-diff": {
        source: "nginx",
        extensions: ["jardiff"]
      },
      "application/x-java-jnlp-file": {
        source: "apache",
        compressible: false,
        extensions: ["jnlp"]
      },
      "application/x-javascript": {
        compressible: true
      },
      "application/x-keepass2": {
        extensions: ["kdbx"]
      },
      "application/x-latex": {
        source: "apache",
        compressible: false,
        extensions: ["latex"]
      },
      "application/x-lua-bytecode": {
        extensions: ["luac"]
      },
      "application/x-lzh-compressed": {
        source: "apache",
        extensions: ["lzh", "lha"]
      },
      "application/x-makeself": {
        source: "nginx",
        extensions: ["run"]
      },
      "application/x-mie": {
        source: "apache",
        extensions: ["mie"]
      },
      "application/x-mobipocket-ebook": {
        source: "apache",
        extensions: ["prc", "mobi"]
      },
      "application/x-mpegurl": {
        compressible: false
      },
      "application/x-ms-application": {
        source: "apache",
        extensions: ["application"]
      },
      "application/x-ms-shortcut": {
        source: "apache",
        extensions: ["lnk"]
      },
      "application/x-ms-wmd": {
        source: "apache",
        extensions: ["wmd"]
      },
      "application/x-ms-wmz": {
        source: "apache",
        extensions: ["wmz"]
      },
      "application/x-ms-xbap": {
        source: "apache",
        extensions: ["xbap"]
      },
      "application/x-msaccess": {
        source: "apache",
        extensions: ["mdb"]
      },
      "application/x-msbinder": {
        source: "apache",
        extensions: ["obd"]
      },
      "application/x-mscardfile": {
        source: "apache",
        extensions: ["crd"]
      },
      "application/x-msclip": {
        source: "apache",
        extensions: ["clp"]
      },
      "application/x-msdos-program": {
        extensions: ["exe"]
      },
      "application/x-msdownload": {
        source: "apache",
        extensions: ["exe", "dll", "com", "bat", "msi"]
      },
      "application/x-msmediaview": {
        source: "apache",
        extensions: ["mvb", "m13", "m14"]
      },
      "application/x-msmetafile": {
        source: "apache",
        extensions: ["wmf", "wmz", "emf", "emz"]
      },
      "application/x-msmoney": {
        source: "apache",
        extensions: ["mny"]
      },
      "application/x-mspublisher": {
        source: "apache",
        extensions: ["pub"]
      },
      "application/x-msschedule": {
        source: "apache",
        extensions: ["scd"]
      },
      "application/x-msterminal": {
        source: "apache",
        extensions: ["trm"]
      },
      "application/x-mswrite": {
        source: "apache",
        extensions: ["wri"]
      },
      "application/x-netcdf": {
        source: "apache",
        extensions: ["nc", "cdf"]
      },
      "application/x-ns-proxy-autoconfig": {
        compressible: true,
        extensions: ["pac"]
      },
      "application/x-nzb": {
        source: "apache",
        extensions: ["nzb"]
      },
      "application/x-perl": {
        source: "nginx",
        extensions: ["pl", "pm"]
      },
      "application/x-pilot": {
        source: "nginx",
        extensions: ["prc", "pdb"]
      },
      "application/x-pkcs12": {
        source: "apache",
        compressible: false,
        extensions: ["p12", "pfx"]
      },
      "application/x-pkcs7-certificates": {
        source: "apache",
        extensions: ["p7b", "spc"]
      },
      "application/x-pkcs7-certreqresp": {
        source: "apache",
        extensions: ["p7r"]
      },
      "application/x-pki-message": {
        source: "iana"
      },
      "application/x-rar-compressed": {
        source: "apache",
        compressible: false,
        extensions: ["rar"]
      },
      "application/x-redhat-package-manager": {
        source: "nginx",
        extensions: ["rpm"]
      },
      "application/x-research-info-systems": {
        source: "apache",
        extensions: ["ris"]
      },
      "application/x-sea": {
        source: "nginx",
        extensions: ["sea"]
      },
      "application/x-sh": {
        source: "apache",
        compressible: true,
        extensions: ["sh"]
      },
      "application/x-shar": {
        source: "apache",
        extensions: ["shar"]
      },
      "application/x-shockwave-flash": {
        source: "apache",
        compressible: false,
        extensions: ["swf"]
      },
      "application/x-silverlight-app": {
        source: "apache",
        extensions: ["xap"]
      },
      "application/x-sql": {
        source: "apache",
        extensions: ["sql"]
      },
      "application/x-stuffit": {
        source: "apache",
        compressible: false,
        extensions: ["sit"]
      },
      "application/x-stuffitx": {
        source: "apache",
        extensions: ["sitx"]
      },
      "application/x-subrip": {
        source: "apache",
        extensions: ["srt"]
      },
      "application/x-sv4cpio": {
        source: "apache",
        extensions: ["sv4cpio"]
      },
      "application/x-sv4crc": {
        source: "apache",
        extensions: ["sv4crc"]
      },
      "application/x-t3vm-image": {
        source: "apache",
        extensions: ["t3"]
      },
      "application/x-tads": {
        source: "apache",
        extensions: ["gam"]
      },
      "application/x-tar": {
        source: "apache",
        compressible: true,
        extensions: ["tar"]
      },
      "application/x-tcl": {
        source: "apache",
        extensions: ["tcl", "tk"]
      },
      "application/x-tex": {
        source: "apache",
        extensions: ["tex"]
      },
      "application/x-tex-tfm": {
        source: "apache",
        extensions: ["tfm"]
      },
      "application/x-texinfo": {
        source: "apache",
        extensions: ["texinfo", "texi"]
      },
      "application/x-tgif": {
        source: "apache",
        extensions: ["obj"]
      },
      "application/x-ustar": {
        source: "apache",
        extensions: ["ustar"]
      },
      "application/x-virtualbox-hdd": {
        compressible: true,
        extensions: ["hdd"]
      },
      "application/x-virtualbox-ova": {
        compressible: true,
        extensions: ["ova"]
      },
      "application/x-virtualbox-ovf": {
        compressible: true,
        extensions: ["ovf"]
      },
      "application/x-virtualbox-vbox": {
        compressible: true,
        extensions: ["vbox"]
      },
      "application/x-virtualbox-vbox-extpack": {
        compressible: false,
        extensions: ["vbox-extpack"]
      },
      "application/x-virtualbox-vdi": {
        compressible: true,
        extensions: ["vdi"]
      },
      "application/x-virtualbox-vhd": {
        compressible: true,
        extensions: ["vhd"]
      },
      "application/x-virtualbox-vmdk": {
        compressible: true,
        extensions: ["vmdk"]
      },
      "application/x-wais-source": {
        source: "apache",
        extensions: ["src"]
      },
      "application/x-web-app-manifest+json": {
        compressible: true,
        extensions: ["webapp"]
      },
      "application/x-www-form-urlencoded": {
        source: "iana",
        compressible: true
      },
      "application/x-x509-ca-cert": {
        source: "iana",
        extensions: ["der", "crt", "pem"]
      },
      "application/x-x509-ca-ra-cert": {
        source: "iana"
      },
      "application/x-x509-next-ca-cert": {
        source: "iana"
      },
      "application/x-xfig": {
        source: "apache",
        extensions: ["fig"]
      },
      "application/x-xliff+xml": {
        source: "apache",
        compressible: true,
        extensions: ["xlf"]
      },
      "application/x-xpinstall": {
        source: "apache",
        compressible: false,
        extensions: ["xpi"]
      },
      "application/x-xz": {
        source: "apache",
        extensions: ["xz"]
      },
      "application/x-zmachine": {
        source: "apache",
        extensions: ["z1", "z2", "z3", "z4", "z5", "z6", "z7", "z8"]
      },
      "application/x400-bp": {
        source: "iana"
      },
      "application/xacml+xml": {
        source: "iana",
        compressible: true
      },
      "application/xaml+xml": {
        source: "apache",
        compressible: true,
        extensions: ["xaml"]
      },
      "application/xcap-att+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xav"]
      },
      "application/xcap-caps+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xca"]
      },
      "application/xcap-diff+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xdf"]
      },
      "application/xcap-el+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xel"]
      },
      "application/xcap-error+xml": {
        source: "iana",
        compressible: true
      },
      "application/xcap-ns+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xns"]
      },
      "application/xcon-conference-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/xcon-conference-info-diff+xml": {
        source: "iana",
        compressible: true
      },
      "application/xenc+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xenc"]
      },
      "application/xhtml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xhtml", "xht"]
      },
      "application/xhtml-voice+xml": {
        source: "apache",
        compressible: true
      },
      "application/xliff+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xlf"]
      },
      "application/xml": {
        source: "iana",
        compressible: true,
        extensions: ["xml", "xsl", "xsd", "rng"]
      },
      "application/xml-dtd": {
        source: "iana",
        compressible: true,
        extensions: ["dtd"]
      },
      "application/xml-external-parsed-entity": {
        source: "iana"
      },
      "application/xml-patch+xml": {
        source: "iana",
        compressible: true
      },
      "application/xmpp+xml": {
        source: "iana",
        compressible: true
      },
      "application/xop+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xop"]
      },
      "application/xproc+xml": {
        source: "apache",
        compressible: true,
        extensions: ["xpl"]
      },
      "application/xslt+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xsl", "xslt"]
      },
      "application/xspf+xml": {
        source: "apache",
        compressible: true,
        extensions: ["xspf"]
      },
      "application/xv+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mxml", "xhvml", "xvml", "xvm"]
      },
      "application/yang": {
        source: "iana",
        extensions: ["yang"]
      },
      "application/yang-data+json": {
        source: "iana",
        compressible: true
      },
      "application/yang-data+xml": {
        source: "iana",
        compressible: true
      },
      "application/yang-patch+json": {
        source: "iana",
        compressible: true
      },
      "application/yang-patch+xml": {
        source: "iana",
        compressible: true
      },
      "application/yin+xml": {
        source: "iana",
        compressible: true,
        extensions: ["yin"]
      },
      "application/zip": {
        source: "iana",
        compressible: false,
        extensions: ["zip"]
      },
      "application/zlib": {
        source: "iana"
      },
      "application/zstd": {
        source: "iana"
      },
      "audio/1d-interleaved-parityfec": {
        source: "iana"
      },
      "audio/32kadpcm": {
        source: "iana"
      },
      "audio/3gpp": {
        source: "iana",
        compressible: false,
        extensions: ["3gpp"]
      },
      "audio/3gpp2": {
        source: "iana"
      },
      "audio/aac": {
        source: "iana"
      },
      "audio/ac3": {
        source: "iana"
      },
      "audio/adpcm": {
        source: "apache",
        extensions: ["adp"]
      },
      "audio/amr": {
        source: "iana",
        extensions: ["amr"]
      },
      "audio/amr-wb": {
        source: "iana"
      },
      "audio/amr-wb+": {
        source: "iana"
      },
      "audio/aptx": {
        source: "iana"
      },
      "audio/asc": {
        source: "iana"
      },
      "audio/atrac-advanced-lossless": {
        source: "iana"
      },
      "audio/atrac-x": {
        source: "iana"
      },
      "audio/atrac3": {
        source: "iana"
      },
      "audio/basic": {
        source: "iana",
        compressible: false,
        extensions: ["au", "snd"]
      },
      "audio/bv16": {
        source: "iana"
      },
      "audio/bv32": {
        source: "iana"
      },
      "audio/clearmode": {
        source: "iana"
      },
      "audio/cn": {
        source: "iana"
      },
      "audio/dat12": {
        source: "iana"
      },
      "audio/dls": {
        source: "iana"
      },
      "audio/dsr-es201108": {
        source: "iana"
      },
      "audio/dsr-es202050": {
        source: "iana"
      },
      "audio/dsr-es202211": {
        source: "iana"
      },
      "audio/dsr-es202212": {
        source: "iana"
      },
      "audio/dv": {
        source: "iana"
      },
      "audio/dvi4": {
        source: "iana"
      },
      "audio/eac3": {
        source: "iana"
      },
      "audio/encaprtp": {
        source: "iana"
      },
      "audio/evrc": {
        source: "iana"
      },
      "audio/evrc-qcp": {
        source: "iana"
      },
      "audio/evrc0": {
        source: "iana"
      },
      "audio/evrc1": {
        source: "iana"
      },
      "audio/evrcb": {
        source: "iana"
      },
      "audio/evrcb0": {
        source: "iana"
      },
      "audio/evrcb1": {
        source: "iana"
      },
      "audio/evrcnw": {
        source: "iana"
      },
      "audio/evrcnw0": {
        source: "iana"
      },
      "audio/evrcnw1": {
        source: "iana"
      },
      "audio/evrcwb": {
        source: "iana"
      },
      "audio/evrcwb0": {
        source: "iana"
      },
      "audio/evrcwb1": {
        source: "iana"
      },
      "audio/evs": {
        source: "iana"
      },
      "audio/flexfec": {
        source: "iana"
      },
      "audio/fwdred": {
        source: "iana"
      },
      "audio/g711-0": {
        source: "iana"
      },
      "audio/g719": {
        source: "iana"
      },
      "audio/g722": {
        source: "iana"
      },
      "audio/g7221": {
        source: "iana"
      },
      "audio/g723": {
        source: "iana"
      },
      "audio/g726-16": {
        source: "iana"
      },
      "audio/g726-24": {
        source: "iana"
      },
      "audio/g726-32": {
        source: "iana"
      },
      "audio/g726-40": {
        source: "iana"
      },
      "audio/g728": {
        source: "iana"
      },
      "audio/g729": {
        source: "iana"
      },
      "audio/g7291": {
        source: "iana"
      },
      "audio/g729d": {
        source: "iana"
      },
      "audio/g729e": {
        source: "iana"
      },
      "audio/gsm": {
        source: "iana"
      },
      "audio/gsm-efr": {
        source: "iana"
      },
      "audio/gsm-hr-08": {
        source: "iana"
      },
      "audio/ilbc": {
        source: "iana"
      },
      "audio/ip-mr_v2.5": {
        source: "iana"
      },
      "audio/isac": {
        source: "apache"
      },
      "audio/l16": {
        source: "iana"
      },
      "audio/l20": {
        source: "iana"
      },
      "audio/l24": {
        source: "iana",
        compressible: false
      },
      "audio/l8": {
        source: "iana"
      },
      "audio/lpc": {
        source: "iana"
      },
      "audio/melp": {
        source: "iana"
      },
      "audio/melp1200": {
        source: "iana"
      },
      "audio/melp2400": {
        source: "iana"
      },
      "audio/melp600": {
        source: "iana"
      },
      "audio/mhas": {
        source: "iana"
      },
      "audio/midi": {
        source: "apache",
        extensions: ["mid", "midi", "kar", "rmi"]
      },
      "audio/mobile-xmf": {
        source: "iana",
        extensions: ["mxmf"]
      },
      "audio/mp3": {
        compressible: false,
        extensions: ["mp3"]
      },
      "audio/mp4": {
        source: "iana",
        compressible: false,
        extensions: ["m4a", "mp4a"]
      },
      "audio/mp4a-latm": {
        source: "iana"
      },
      "audio/mpa": {
        source: "iana"
      },
      "audio/mpa-robust": {
        source: "iana"
      },
      "audio/mpeg": {
        source: "iana",
        compressible: false,
        extensions: ["mpga", "mp2", "mp2a", "mp3", "m2a", "m3a"]
      },
      "audio/mpeg4-generic": {
        source: "iana"
      },
      "audio/musepack": {
        source: "apache"
      },
      "audio/ogg": {
        source: "iana",
        compressible: false,
        extensions: ["oga", "ogg", "spx", "opus"]
      },
      "audio/opus": {
        source: "iana"
      },
      "audio/parityfec": {
        source: "iana"
      },
      "audio/pcma": {
        source: "iana"
      },
      "audio/pcma-wb": {
        source: "iana"
      },
      "audio/pcmu": {
        source: "iana"
      },
      "audio/pcmu-wb": {
        source: "iana"
      },
      "audio/prs.sid": {
        source: "iana"
      },
      "audio/qcelp": {
        source: "iana"
      },
      "audio/raptorfec": {
        source: "iana"
      },
      "audio/red": {
        source: "iana"
      },
      "audio/rtp-enc-aescm128": {
        source: "iana"
      },
      "audio/rtp-midi": {
        source: "iana"
      },
      "audio/rtploopback": {
        source: "iana"
      },
      "audio/rtx": {
        source: "iana"
      },
      "audio/s3m": {
        source: "apache",
        extensions: ["s3m"]
      },
      "audio/scip": {
        source: "iana"
      },
      "audio/silk": {
        source: "apache",
        extensions: ["sil"]
      },
      "audio/smv": {
        source: "iana"
      },
      "audio/smv-qcp": {
        source: "iana"
      },
      "audio/smv0": {
        source: "iana"
      },
      "audio/sofa": {
        source: "iana"
      },
      "audio/sp-midi": {
        source: "iana"
      },
      "audio/speex": {
        source: "iana"
      },
      "audio/t140c": {
        source: "iana"
      },
      "audio/t38": {
        source: "iana"
      },
      "audio/telephone-event": {
        source: "iana"
      },
      "audio/tetra_acelp": {
        source: "iana"
      },
      "audio/tetra_acelp_bb": {
        source: "iana"
      },
      "audio/tone": {
        source: "iana"
      },
      "audio/tsvcis": {
        source: "iana"
      },
      "audio/uemclip": {
        source: "iana"
      },
      "audio/ulpfec": {
        source: "iana"
      },
      "audio/usac": {
        source: "iana"
      },
      "audio/vdvi": {
        source: "iana"
      },
      "audio/vmr-wb": {
        source: "iana"
      },
      "audio/vnd.3gpp.iufp": {
        source: "iana"
      },
      "audio/vnd.4sb": {
        source: "iana"
      },
      "audio/vnd.audiokoz": {
        source: "iana"
      },
      "audio/vnd.celp": {
        source: "iana"
      },
      "audio/vnd.cisco.nse": {
        source: "iana"
      },
      "audio/vnd.cmles.radio-events": {
        source: "iana"
      },
      "audio/vnd.cns.anp1": {
        source: "iana"
      },
      "audio/vnd.cns.inf1": {
        source: "iana"
      },
      "audio/vnd.dece.audio": {
        source: "iana",
        extensions: ["uva", "uvva"]
      },
      "audio/vnd.digital-winds": {
        source: "iana",
        extensions: ["eol"]
      },
      "audio/vnd.dlna.adts": {
        source: "iana"
      },
      "audio/vnd.dolby.heaac.1": {
        source: "iana"
      },
      "audio/vnd.dolby.heaac.2": {
        source: "iana"
      },
      "audio/vnd.dolby.mlp": {
        source: "iana"
      },
      "audio/vnd.dolby.mps": {
        source: "iana"
      },
      "audio/vnd.dolby.pl2": {
        source: "iana"
      },
      "audio/vnd.dolby.pl2x": {
        source: "iana"
      },
      "audio/vnd.dolby.pl2z": {
        source: "iana"
      },
      "audio/vnd.dolby.pulse.1": {
        source: "iana"
      },
      "audio/vnd.dra": {
        source: "iana",
        extensions: ["dra"]
      },
      "audio/vnd.dts": {
        source: "iana",
        extensions: ["dts"]
      },
      "audio/vnd.dts.hd": {
        source: "iana",
        extensions: ["dtshd"]
      },
      "audio/vnd.dts.uhd": {
        source: "iana"
      },
      "audio/vnd.dvb.file": {
        source: "iana"
      },
      "audio/vnd.everad.plj": {
        source: "iana"
      },
      "audio/vnd.hns.audio": {
        source: "iana"
      },
      "audio/vnd.lucent.voice": {
        source: "iana",
        extensions: ["lvp"]
      },
      "audio/vnd.ms-playready.media.pya": {
        source: "iana",
        extensions: ["pya"]
      },
      "audio/vnd.nokia.mobile-xmf": {
        source: "iana"
      },
      "audio/vnd.nortel.vbk": {
        source: "iana"
      },
      "audio/vnd.nuera.ecelp4800": {
        source: "iana",
        extensions: ["ecelp4800"]
      },
      "audio/vnd.nuera.ecelp7470": {
        source: "iana",
        extensions: ["ecelp7470"]
      },
      "audio/vnd.nuera.ecelp9600": {
        source: "iana",
        extensions: ["ecelp9600"]
      },
      "audio/vnd.octel.sbc": {
        source: "iana"
      },
      "audio/vnd.presonus.multitrack": {
        source: "iana"
      },
      "audio/vnd.qcelp": {
        source: "iana"
      },
      "audio/vnd.rhetorex.32kadpcm": {
        source: "iana"
      },
      "audio/vnd.rip": {
        source: "iana",
        extensions: ["rip"]
      },
      "audio/vnd.rn-realaudio": {
        compressible: false
      },
      "audio/vnd.sealedmedia.softseal.mpeg": {
        source: "iana"
      },
      "audio/vnd.vmx.cvsd": {
        source: "iana"
      },
      "audio/vnd.wave": {
        compressible: false
      },
      "audio/vorbis": {
        source: "iana",
        compressible: false
      },
      "audio/vorbis-config": {
        source: "iana"
      },
      "audio/wav": {
        compressible: false,
        extensions: ["wav"]
      },
      "audio/wave": {
        compressible: false,
        extensions: ["wav"]
      },
      "audio/webm": {
        source: "apache",
        compressible: false,
        extensions: ["weba"]
      },
      "audio/x-aac": {
        source: "apache",
        compressible: false,
        extensions: ["aac"]
      },
      "audio/x-aiff": {
        source: "apache",
        extensions: ["aif", "aiff", "aifc"]
      },
      "audio/x-caf": {
        source: "apache",
        compressible: false,
        extensions: ["caf"]
      },
      "audio/x-flac": {
        source: "apache",
        extensions: ["flac"]
      },
      "audio/x-m4a": {
        source: "nginx",
        extensions: ["m4a"]
      },
      "audio/x-matroska": {
        source: "apache",
        extensions: ["mka"]
      },
      "audio/x-mpegurl": {
        source: "apache",
        extensions: ["m3u"]
      },
      "audio/x-ms-wax": {
        source: "apache",
        extensions: ["wax"]
      },
      "audio/x-ms-wma": {
        source: "apache",
        extensions: ["wma"]
      },
      "audio/x-pn-realaudio": {
        source: "apache",
        extensions: ["ram", "ra"]
      },
      "audio/x-pn-realaudio-plugin": {
        source: "apache",
        extensions: ["rmp"]
      },
      "audio/x-realaudio": {
        source: "nginx",
        extensions: ["ra"]
      },
      "audio/x-tta": {
        source: "apache"
      },
      "audio/x-wav": {
        source: "apache",
        extensions: ["wav"]
      },
      "audio/xm": {
        source: "apache",
        extensions: ["xm"]
      },
      "chemical/x-cdx": {
        source: "apache",
        extensions: ["cdx"]
      },
      "chemical/x-cif": {
        source: "apache",
        extensions: ["cif"]
      },
      "chemical/x-cmdf": {
        source: "apache",
        extensions: ["cmdf"]
      },
      "chemical/x-cml": {
        source: "apache",
        extensions: ["cml"]
      },
      "chemical/x-csml": {
        source: "apache",
        extensions: ["csml"]
      },
      "chemical/x-pdb": {
        source: "apache"
      },
      "chemical/x-xyz": {
        source: "apache",
        extensions: ["xyz"]
      },
      "font/collection": {
        source: "iana",
        extensions: ["ttc"]
      },
      "font/otf": {
        source: "iana",
        compressible: true,
        extensions: ["otf"]
      },
      "font/sfnt": {
        source: "iana"
      },
      "font/ttf": {
        source: "iana",
        compressible: true,
        extensions: ["ttf"]
      },
      "font/woff": {
        source: "iana",
        extensions: ["woff"]
      },
      "font/woff2": {
        source: "iana",
        extensions: ["woff2"]
      },
      "image/aces": {
        source: "iana",
        extensions: ["exr"]
      },
      "image/apng": {
        compressible: false,
        extensions: ["apng"]
      },
      "image/avci": {
        source: "iana",
        extensions: ["avci"]
      },
      "image/avcs": {
        source: "iana",
        extensions: ["avcs"]
      },
      "image/avif": {
        source: "iana",
        compressible: false,
        extensions: ["avif"]
      },
      "image/bmp": {
        source: "iana",
        compressible: true,
        extensions: ["bmp"]
      },
      "image/cgm": {
        source: "iana",
        extensions: ["cgm"]
      },
      "image/dicom-rle": {
        source: "iana",
        extensions: ["drle"]
      },
      "image/emf": {
        source: "iana",
        extensions: ["emf"]
      },
      "image/fits": {
        source: "iana",
        extensions: ["fits"]
      },
      "image/g3fax": {
        source: "iana",
        extensions: ["g3"]
      },
      "image/gif": {
        source: "iana",
        compressible: false,
        extensions: ["gif"]
      },
      "image/heic": {
        source: "iana",
        extensions: ["heic"]
      },
      "image/heic-sequence": {
        source: "iana",
        extensions: ["heics"]
      },
      "image/heif": {
        source: "iana",
        extensions: ["heif"]
      },
      "image/heif-sequence": {
        source: "iana",
        extensions: ["heifs"]
      },
      "image/hej2k": {
        source: "iana",
        extensions: ["hej2"]
      },
      "image/hsj2": {
        source: "iana",
        extensions: ["hsj2"]
      },
      "image/ief": {
        source: "iana",
        extensions: ["ief"]
      },
      "image/jls": {
        source: "iana",
        extensions: ["jls"]
      },
      "image/jp2": {
        source: "iana",
        compressible: false,
        extensions: ["jp2", "jpg2"]
      },
      "image/jpeg": {
        source: "iana",
        compressible: false,
        extensions: ["jpeg", "jpg", "jpe"]
      },
      "image/jph": {
        source: "iana",
        extensions: ["jph"]
      },
      "image/jphc": {
        source: "iana",
        extensions: ["jhc"]
      },
      "image/jpm": {
        source: "iana",
        compressible: false,
        extensions: ["jpm"]
      },
      "image/jpx": {
        source: "iana",
        compressible: false,
        extensions: ["jpx", "jpf"]
      },
      "image/jxr": {
        source: "iana",
        extensions: ["jxr"]
      },
      "image/jxra": {
        source: "iana",
        extensions: ["jxra"]
      },
      "image/jxrs": {
        source: "iana",
        extensions: ["jxrs"]
      },
      "image/jxs": {
        source: "iana",
        extensions: ["jxs"]
      },
      "image/jxsc": {
        source: "iana",
        extensions: ["jxsc"]
      },
      "image/jxsi": {
        source: "iana",
        extensions: ["jxsi"]
      },
      "image/jxss": {
        source: "iana",
        extensions: ["jxss"]
      },
      "image/ktx": {
        source: "iana",
        extensions: ["ktx"]
      },
      "image/ktx2": {
        source: "iana",
        extensions: ["ktx2"]
      },
      "image/naplps": {
        source: "iana"
      },
      "image/pjpeg": {
        compressible: false
      },
      "image/png": {
        source: "iana",
        compressible: false,
        extensions: ["png"]
      },
      "image/prs.btif": {
        source: "iana",
        extensions: ["btif"]
      },
      "image/prs.pti": {
        source: "iana",
        extensions: ["pti"]
      },
      "image/pwg-raster": {
        source: "iana"
      },
      "image/sgi": {
        source: "apache",
        extensions: ["sgi"]
      },
      "image/svg+xml": {
        source: "iana",
        compressible: true,
        extensions: ["svg", "svgz"]
      },
      "image/t38": {
        source: "iana",
        extensions: ["t38"]
      },
      "image/tiff": {
        source: "iana",
        compressible: false,
        extensions: ["tif", "tiff"]
      },
      "image/tiff-fx": {
        source: "iana",
        extensions: ["tfx"]
      },
      "image/vnd.adobe.photoshop": {
        source: "iana",
        compressible: true,
        extensions: ["psd"]
      },
      "image/vnd.airzip.accelerator.azv": {
        source: "iana",
        extensions: ["azv"]
      },
      "image/vnd.cns.inf2": {
        source: "iana"
      },
      "image/vnd.dece.graphic": {
        source: "iana",
        extensions: ["uvi", "uvvi", "uvg", "uvvg"]
      },
      "image/vnd.djvu": {
        source: "iana",
        extensions: ["djvu", "djv"]
      },
      "image/vnd.dvb.subtitle": {
        source: "iana",
        extensions: ["sub"]
      },
      "image/vnd.dwg": {
        source: "iana",
        extensions: ["dwg"]
      },
      "image/vnd.dxf": {
        source: "iana",
        extensions: ["dxf"]
      },
      "image/vnd.fastbidsheet": {
        source: "iana",
        extensions: ["fbs"]
      },
      "image/vnd.fpx": {
        source: "iana",
        extensions: ["fpx"]
      },
      "image/vnd.fst": {
        source: "iana",
        extensions: ["fst"]
      },
      "image/vnd.fujixerox.edmics-mmr": {
        source: "iana",
        extensions: ["mmr"]
      },
      "image/vnd.fujixerox.edmics-rlc": {
        source: "iana",
        extensions: ["rlc"]
      },
      "image/vnd.globalgraphics.pgb": {
        source: "iana"
      },
      "image/vnd.microsoft.icon": {
        source: "iana",
        compressible: true,
        extensions: ["ico"]
      },
      "image/vnd.mix": {
        source: "iana"
      },
      "image/vnd.mozilla.apng": {
        source: "iana"
      },
      "image/vnd.ms-dds": {
        compressible: true,
        extensions: ["dds"]
      },
      "image/vnd.ms-modi": {
        source: "iana",
        extensions: ["mdi"]
      },
      "image/vnd.ms-photo": {
        source: "apache",
        extensions: ["wdp"]
      },
      "image/vnd.net-fpx": {
        source: "iana",
        extensions: ["npx"]
      },
      "image/vnd.pco.b16": {
        source: "iana",
        extensions: ["b16"]
      },
      "image/vnd.radiance": {
        source: "iana"
      },
      "image/vnd.sealed.png": {
        source: "iana"
      },
      "image/vnd.sealedmedia.softseal.gif": {
        source: "iana"
      },
      "image/vnd.sealedmedia.softseal.jpg": {
        source: "iana"
      },
      "image/vnd.svf": {
        source: "iana"
      },
      "image/vnd.tencent.tap": {
        source: "iana",
        extensions: ["tap"]
      },
      "image/vnd.valve.source.texture": {
        source: "iana",
        extensions: ["vtf"]
      },
      "image/vnd.wap.wbmp": {
        source: "iana",
        extensions: ["wbmp"]
      },
      "image/vnd.xiff": {
        source: "iana",
        extensions: ["xif"]
      },
      "image/vnd.zbrush.pcx": {
        source: "iana",
        extensions: ["pcx"]
      },
      "image/webp": {
        source: "apache",
        extensions: ["webp"]
      },
      "image/wmf": {
        source: "iana",
        extensions: ["wmf"]
      },
      "image/x-3ds": {
        source: "apache",
        extensions: ["3ds"]
      },
      "image/x-cmu-raster": {
        source: "apache",
        extensions: ["ras"]
      },
      "image/x-cmx": {
        source: "apache",
        extensions: ["cmx"]
      },
      "image/x-freehand": {
        source: "apache",
        extensions: ["fh", "fhc", "fh4", "fh5", "fh7"]
      },
      "image/x-icon": {
        source: "apache",
        compressible: true,
        extensions: ["ico"]
      },
      "image/x-jng": {
        source: "nginx",
        extensions: ["jng"]
      },
      "image/x-mrsid-image": {
        source: "apache",
        extensions: ["sid"]
      },
      "image/x-ms-bmp": {
        source: "nginx",
        compressible: true,
        extensions: ["bmp"]
      },
      "image/x-pcx": {
        source: "apache",
        extensions: ["pcx"]
      },
      "image/x-pict": {
        source: "apache",
        extensions: ["pic", "pct"]
      },
      "image/x-portable-anymap": {
        source: "apache",
        extensions: ["pnm"]
      },
      "image/x-portable-bitmap": {
        source: "apache",
        extensions: ["pbm"]
      },
      "image/x-portable-graymap": {
        source: "apache",
        extensions: ["pgm"]
      },
      "image/x-portable-pixmap": {
        source: "apache",
        extensions: ["ppm"]
      },
      "image/x-rgb": {
        source: "apache",
        extensions: ["rgb"]
      },
      "image/x-tga": {
        source: "apache",
        extensions: ["tga"]
      },
      "image/x-xbitmap": {
        source: "apache",
        extensions: ["xbm"]
      },
      "image/x-xcf": {
        compressible: false
      },
      "image/x-xpixmap": {
        source: "apache",
        extensions: ["xpm"]
      },
      "image/x-xwindowdump": {
        source: "apache",
        extensions: ["xwd"]
      },
      "message/cpim": {
        source: "iana"
      },
      "message/delivery-status": {
        source: "iana"
      },
      "message/disposition-notification": {
        source: "iana",
        extensions: [
          "disposition-notification"
        ]
      },
      "message/external-body": {
        source: "iana"
      },
      "message/feedback-report": {
        source: "iana"
      },
      "message/global": {
        source: "iana",
        extensions: ["u8msg"]
      },
      "message/global-delivery-status": {
        source: "iana",
        extensions: ["u8dsn"]
      },
      "message/global-disposition-notification": {
        source: "iana",
        extensions: ["u8mdn"]
      },
      "message/global-headers": {
        source: "iana",
        extensions: ["u8hdr"]
      },
      "message/http": {
        source: "iana",
        compressible: false
      },
      "message/imdn+xml": {
        source: "iana",
        compressible: true
      },
      "message/news": {
        source: "iana"
      },
      "message/partial": {
        source: "iana",
        compressible: false
      },
      "message/rfc822": {
        source: "iana",
        compressible: true,
        extensions: ["eml", "mime"]
      },
      "message/s-http": {
        source: "iana"
      },
      "message/sip": {
        source: "iana"
      },
      "message/sipfrag": {
        source: "iana"
      },
      "message/tracking-status": {
        source: "iana"
      },
      "message/vnd.si.simp": {
        source: "iana"
      },
      "message/vnd.wfa.wsc": {
        source: "iana",
        extensions: ["wsc"]
      },
      "model/3mf": {
        source: "iana",
        extensions: ["3mf"]
      },
      "model/e57": {
        source: "iana"
      },
      "model/gltf+json": {
        source: "iana",
        compressible: true,
        extensions: ["gltf"]
      },
      "model/gltf-binary": {
        source: "iana",
        compressible: true,
        extensions: ["glb"]
      },
      "model/iges": {
        source: "iana",
        compressible: false,
        extensions: ["igs", "iges"]
      },
      "model/mesh": {
        source: "iana",
        compressible: false,
        extensions: ["msh", "mesh", "silo"]
      },
      "model/mtl": {
        source: "iana",
        extensions: ["mtl"]
      },
      "model/obj": {
        source: "iana",
        extensions: ["obj"]
      },
      "model/step": {
        source: "iana"
      },
      "model/step+xml": {
        source: "iana",
        compressible: true,
        extensions: ["stpx"]
      },
      "model/step+zip": {
        source: "iana",
        compressible: false,
        extensions: ["stpz"]
      },
      "model/step-xml+zip": {
        source: "iana",
        compressible: false,
        extensions: ["stpxz"]
      },
      "model/stl": {
        source: "iana",
        extensions: ["stl"]
      },
      "model/vnd.collada+xml": {
        source: "iana",
        compressible: true,
        extensions: ["dae"]
      },
      "model/vnd.dwf": {
        source: "iana",
        extensions: ["dwf"]
      },
      "model/vnd.flatland.3dml": {
        source: "iana"
      },
      "model/vnd.gdl": {
        source: "iana",
        extensions: ["gdl"]
      },
      "model/vnd.gs-gdl": {
        source: "apache"
      },
      "model/vnd.gs.gdl": {
        source: "iana"
      },
      "model/vnd.gtw": {
        source: "iana",
        extensions: ["gtw"]
      },
      "model/vnd.moml+xml": {
        source: "iana",
        compressible: true
      },
      "model/vnd.mts": {
        source: "iana",
        extensions: ["mts"]
      },
      "model/vnd.opengex": {
        source: "iana",
        extensions: ["ogex"]
      },
      "model/vnd.parasolid.transmit.binary": {
        source: "iana",
        extensions: ["x_b"]
      },
      "model/vnd.parasolid.transmit.text": {
        source: "iana",
        extensions: ["x_t"]
      },
      "model/vnd.pytha.pyox": {
        source: "iana"
      },
      "model/vnd.rosette.annotated-data-model": {
        source: "iana"
      },
      "model/vnd.sap.vds": {
        source: "iana",
        extensions: ["vds"]
      },
      "model/vnd.usdz+zip": {
        source: "iana",
        compressible: false,
        extensions: ["usdz"]
      },
      "model/vnd.valve.source.compiled-map": {
        source: "iana",
        extensions: ["bsp"]
      },
      "model/vnd.vtu": {
        source: "iana",
        extensions: ["vtu"]
      },
      "model/vrml": {
        source: "iana",
        compressible: false,
        extensions: ["wrl", "vrml"]
      },
      "model/x3d+binary": {
        source: "apache",
        compressible: false,
        extensions: ["x3db", "x3dbz"]
      },
      "model/x3d+fastinfoset": {
        source: "iana",
        extensions: ["x3db"]
      },
      "model/x3d+vrml": {
        source: "apache",
        compressible: false,
        extensions: ["x3dv", "x3dvz"]
      },
      "model/x3d+xml": {
        source: "iana",
        compressible: true,
        extensions: ["x3d", "x3dz"]
      },
      "model/x3d-vrml": {
        source: "iana",
        extensions: ["x3dv"]
      },
      "multipart/alternative": {
        source: "iana",
        compressible: false
      },
      "multipart/appledouble": {
        source: "iana"
      },
      "multipart/byteranges": {
        source: "iana"
      },
      "multipart/digest": {
        source: "iana"
      },
      "multipart/encrypted": {
        source: "iana",
        compressible: false
      },
      "multipart/form-data": {
        source: "iana",
        compressible: false
      },
      "multipart/header-set": {
        source: "iana"
      },
      "multipart/mixed": {
        source: "iana"
      },
      "multipart/multilingual": {
        source: "iana"
      },
      "multipart/parallel": {
        source: "iana"
      },
      "multipart/related": {
        source: "iana",
        compressible: false
      },
      "multipart/report": {
        source: "iana"
      },
      "multipart/signed": {
        source: "iana",
        compressible: false
      },
      "multipart/vnd.bint.med-plus": {
        source: "iana"
      },
      "multipart/voice-message": {
        source: "iana"
      },
      "multipart/x-mixed-replace": {
        source: "iana"
      },
      "text/1d-interleaved-parityfec": {
        source: "iana"
      },
      "text/cache-manifest": {
        source: "iana",
        compressible: true,
        extensions: ["appcache", "manifest"]
      },
      "text/calendar": {
        source: "iana",
        extensions: ["ics", "ifb"]
      },
      "text/calender": {
        compressible: true
      },
      "text/cmd": {
        compressible: true
      },
      "text/coffeescript": {
        extensions: ["coffee", "litcoffee"]
      },
      "text/cql": {
        source: "iana"
      },
      "text/cql-expression": {
        source: "iana"
      },
      "text/cql-identifier": {
        source: "iana"
      },
      "text/css": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["css"]
      },
      "text/csv": {
        source: "iana",
        compressible: true,
        extensions: ["csv"]
      },
      "text/csv-schema": {
        source: "iana"
      },
      "text/directory": {
        source: "iana"
      },
      "text/dns": {
        source: "iana"
      },
      "text/ecmascript": {
        source: "iana"
      },
      "text/encaprtp": {
        source: "iana"
      },
      "text/enriched": {
        source: "iana"
      },
      "text/fhirpath": {
        source: "iana"
      },
      "text/flexfec": {
        source: "iana"
      },
      "text/fwdred": {
        source: "iana"
      },
      "text/gff3": {
        source: "iana"
      },
      "text/grammar-ref-list": {
        source: "iana"
      },
      "text/html": {
        source: "iana",
        compressible: true,
        extensions: ["html", "htm", "shtml"]
      },
      "text/jade": {
        extensions: ["jade"]
      },
      "text/javascript": {
        source: "iana",
        compressible: true
      },
      "text/jcr-cnd": {
        source: "iana"
      },
      "text/jsx": {
        compressible: true,
        extensions: ["jsx"]
      },
      "text/less": {
        compressible: true,
        extensions: ["less"]
      },
      "text/markdown": {
        source: "iana",
        compressible: true,
        extensions: ["markdown", "md"]
      },
      "text/mathml": {
        source: "nginx",
        extensions: ["mml"]
      },
      "text/mdx": {
        compressible: true,
        extensions: ["mdx"]
      },
      "text/mizar": {
        source: "iana"
      },
      "text/n3": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["n3"]
      },
      "text/parameters": {
        source: "iana",
        charset: "UTF-8"
      },
      "text/parityfec": {
        source: "iana"
      },
      "text/plain": {
        source: "iana",
        compressible: true,
        extensions: ["txt", "text", "conf", "def", "list", "log", "in", "ini"]
      },
      "text/provenance-notation": {
        source: "iana",
        charset: "UTF-8"
      },
      "text/prs.fallenstein.rst": {
        source: "iana"
      },
      "text/prs.lines.tag": {
        source: "iana",
        extensions: ["dsc"]
      },
      "text/prs.prop.logic": {
        source: "iana"
      },
      "text/raptorfec": {
        source: "iana"
      },
      "text/red": {
        source: "iana"
      },
      "text/rfc822-headers": {
        source: "iana"
      },
      "text/richtext": {
        source: "iana",
        compressible: true,
        extensions: ["rtx"]
      },
      "text/rtf": {
        source: "iana",
        compressible: true,
        extensions: ["rtf"]
      },
      "text/rtp-enc-aescm128": {
        source: "iana"
      },
      "text/rtploopback": {
        source: "iana"
      },
      "text/rtx": {
        source: "iana"
      },
      "text/sgml": {
        source: "iana",
        extensions: ["sgml", "sgm"]
      },
      "text/shaclc": {
        source: "iana"
      },
      "text/shex": {
        source: "iana",
        extensions: ["shex"]
      },
      "text/slim": {
        extensions: ["slim", "slm"]
      },
      "text/spdx": {
        source: "iana",
        extensions: ["spdx"]
      },
      "text/strings": {
        source: "iana"
      },
      "text/stylus": {
        extensions: ["stylus", "styl"]
      },
      "text/t140": {
        source: "iana"
      },
      "text/tab-separated-values": {
        source: "iana",
        compressible: true,
        extensions: ["tsv"]
      },
      "text/troff": {
        source: "iana",
        extensions: ["t", "tr", "roff", "man", "me", "ms"]
      },
      "text/turtle": {
        source: "iana",
        charset: "UTF-8",
        extensions: ["ttl"]
      },
      "text/ulpfec": {
        source: "iana"
      },
      "text/uri-list": {
        source: "iana",
        compressible: true,
        extensions: ["uri", "uris", "urls"]
      },
      "text/vcard": {
        source: "iana",
        compressible: true,
        extensions: ["vcard"]
      },
      "text/vnd.a": {
        source: "iana"
      },
      "text/vnd.abc": {
        source: "iana"
      },
      "text/vnd.ascii-art": {
        source: "iana"
      },
      "text/vnd.curl": {
        source: "iana",
        extensions: ["curl"]
      },
      "text/vnd.curl.dcurl": {
        source: "apache",
        extensions: ["dcurl"]
      },
      "text/vnd.curl.mcurl": {
        source: "apache",
        extensions: ["mcurl"]
      },
      "text/vnd.curl.scurl": {
        source: "apache",
        extensions: ["scurl"]
      },
      "text/vnd.debian.copyright": {
        source: "iana",
        charset: "UTF-8"
      },
      "text/vnd.dmclientscript": {
        source: "iana"
      },
      "text/vnd.dvb.subtitle": {
        source: "iana",
        extensions: ["sub"]
      },
      "text/vnd.esmertec.theme-descriptor": {
        source: "iana",
        charset: "UTF-8"
      },
      "text/vnd.familysearch.gedcom": {
        source: "iana",
        extensions: ["ged"]
      },
      "text/vnd.ficlab.flt": {
        source: "iana"
      },
      "text/vnd.fly": {
        source: "iana",
        extensions: ["fly"]
      },
      "text/vnd.fmi.flexstor": {
        source: "iana",
        extensions: ["flx"]
      },
      "text/vnd.gml": {
        source: "iana"
      },
      "text/vnd.graphviz": {
        source: "iana",
        extensions: ["gv"]
      },
      "text/vnd.hans": {
        source: "iana"
      },
      "text/vnd.hgl": {
        source: "iana"
      },
      "text/vnd.in3d.3dml": {
        source: "iana",
        extensions: ["3dml"]
      },
      "text/vnd.in3d.spot": {
        source: "iana",
        extensions: ["spot"]
      },
      "text/vnd.iptc.newsml": {
        source: "iana"
      },
      "text/vnd.iptc.nitf": {
        source: "iana"
      },
      "text/vnd.latex-z": {
        source: "iana"
      },
      "text/vnd.motorola.reflex": {
        source: "iana"
      },
      "text/vnd.ms-mediapackage": {
        source: "iana"
      },
      "text/vnd.net2phone.commcenter.command": {
        source: "iana"
      },
      "text/vnd.radisys.msml-basic-layout": {
        source: "iana"
      },
      "text/vnd.senx.warpscript": {
        source: "iana"
      },
      "text/vnd.si.uricatalogue": {
        source: "iana"
      },
      "text/vnd.sosi": {
        source: "iana"
      },
      "text/vnd.sun.j2me.app-descriptor": {
        source: "iana",
        charset: "UTF-8",
        extensions: ["jad"]
      },
      "text/vnd.trolltech.linguist": {
        source: "iana",
        charset: "UTF-8"
      },
      "text/vnd.wap.si": {
        source: "iana"
      },
      "text/vnd.wap.sl": {
        source: "iana"
      },
      "text/vnd.wap.wml": {
        source: "iana",
        extensions: ["wml"]
      },
      "text/vnd.wap.wmlscript": {
        source: "iana",
        extensions: ["wmls"]
      },
      "text/vtt": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["vtt"]
      },
      "text/x-asm": {
        source: "apache",
        extensions: ["s", "asm"]
      },
      "text/x-c": {
        source: "apache",
        extensions: ["c", "cc", "cxx", "cpp", "h", "hh", "dic"]
      },
      "text/x-component": {
        source: "nginx",
        extensions: ["htc"]
      },
      "text/x-fortran": {
        source: "apache",
        extensions: ["f", "for", "f77", "f90"]
      },
      "text/x-gwt-rpc": {
        compressible: true
      },
      "text/x-handlebars-template": {
        extensions: ["hbs"]
      },
      "text/x-java-source": {
        source: "apache",
        extensions: ["java"]
      },
      "text/x-jquery-tmpl": {
        compressible: true
      },
      "text/x-lua": {
        extensions: ["lua"]
      },
      "text/x-markdown": {
        compressible: true,
        extensions: ["mkd"]
      },
      "text/x-nfo": {
        source: "apache",
        extensions: ["nfo"]
      },
      "text/x-opml": {
        source: "apache",
        extensions: ["opml"]
      },
      "text/x-org": {
        compressible: true,
        extensions: ["org"]
      },
      "text/x-pascal": {
        source: "apache",
        extensions: ["p", "pas"]
      },
      "text/x-processing": {
        compressible: true,
        extensions: ["pde"]
      },
      "text/x-sass": {
        extensions: ["sass"]
      },
      "text/x-scss": {
        extensions: ["scss"]
      },
      "text/x-setext": {
        source: "apache",
        extensions: ["etx"]
      },
      "text/x-sfv": {
        source: "apache",
        extensions: ["sfv"]
      },
      "text/x-suse-ymp": {
        compressible: true,
        extensions: ["ymp"]
      },
      "text/x-uuencode": {
        source: "apache",
        extensions: ["uu"]
      },
      "text/x-vcalendar": {
        source: "apache",
        extensions: ["vcs"]
      },
      "text/x-vcard": {
        source: "apache",
        extensions: ["vcf"]
      },
      "text/xml": {
        source: "iana",
        compressible: true,
        extensions: ["xml"]
      },
      "text/xml-external-parsed-entity": {
        source: "iana"
      },
      "text/yaml": {
        compressible: true,
        extensions: ["yaml", "yml"]
      },
      "video/1d-interleaved-parityfec": {
        source: "iana"
      },
      "video/3gpp": {
        source: "iana",
        extensions: ["3gp", "3gpp"]
      },
      "video/3gpp-tt": {
        source: "iana"
      },
      "video/3gpp2": {
        source: "iana",
        extensions: ["3g2"]
      },
      "video/av1": {
        source: "iana"
      },
      "video/bmpeg": {
        source: "iana"
      },
      "video/bt656": {
        source: "iana"
      },
      "video/celb": {
        source: "iana"
      },
      "video/dv": {
        source: "iana"
      },
      "video/encaprtp": {
        source: "iana"
      },
      "video/ffv1": {
        source: "iana"
      },
      "video/flexfec": {
        source: "iana"
      },
      "video/h261": {
        source: "iana",
        extensions: ["h261"]
      },
      "video/h263": {
        source: "iana",
        extensions: ["h263"]
      },
      "video/h263-1998": {
        source: "iana"
      },
      "video/h263-2000": {
        source: "iana"
      },
      "video/h264": {
        source: "iana",
        extensions: ["h264"]
      },
      "video/h264-rcdo": {
        source: "iana"
      },
      "video/h264-svc": {
        source: "iana"
      },
      "video/h265": {
        source: "iana"
      },
      "video/iso.segment": {
        source: "iana",
        extensions: ["m4s"]
      },
      "video/jpeg": {
        source: "iana",
        extensions: ["jpgv"]
      },
      "video/jpeg2000": {
        source: "iana"
      },
      "video/jpm": {
        source: "apache",
        extensions: ["jpm", "jpgm"]
      },
      "video/jxsv": {
        source: "iana"
      },
      "video/mj2": {
        source: "iana",
        extensions: ["mj2", "mjp2"]
      },
      "video/mp1s": {
        source: "iana"
      },
      "video/mp2p": {
        source: "iana"
      },
      "video/mp2t": {
        source: "iana",
        extensions: ["ts"]
      },
      "video/mp4": {
        source: "iana",
        compressible: false,
        extensions: ["mp4", "mp4v", "mpg4"]
      },
      "video/mp4v-es": {
        source: "iana"
      },
      "video/mpeg": {
        source: "iana",
        compressible: false,
        extensions: ["mpeg", "mpg", "mpe", "m1v", "m2v"]
      },
      "video/mpeg4-generic": {
        source: "iana"
      },
      "video/mpv": {
        source: "iana"
      },
      "video/nv": {
        source: "iana"
      },
      "video/ogg": {
        source: "iana",
        compressible: false,
        extensions: ["ogv"]
      },
      "video/parityfec": {
        source: "iana"
      },
      "video/pointer": {
        source: "iana"
      },
      "video/quicktime": {
        source: "iana",
        compressible: false,
        extensions: ["qt", "mov"]
      },
      "video/raptorfec": {
        source: "iana"
      },
      "video/raw": {
        source: "iana"
      },
      "video/rtp-enc-aescm128": {
        source: "iana"
      },
      "video/rtploopback": {
        source: "iana"
      },
      "video/rtx": {
        source: "iana"
      },
      "video/scip": {
        source: "iana"
      },
      "video/smpte291": {
        source: "iana"
      },
      "video/smpte292m": {
        source: "iana"
      },
      "video/ulpfec": {
        source: "iana"
      },
      "video/vc1": {
        source: "iana"
      },
      "video/vc2": {
        source: "iana"
      },
      "video/vnd.cctv": {
        source: "iana"
      },
      "video/vnd.dece.hd": {
        source: "iana",
        extensions: ["uvh", "uvvh"]
      },
      "video/vnd.dece.mobile": {
        source: "iana",
        extensions: ["uvm", "uvvm"]
      },
      "video/vnd.dece.mp4": {
        source: "iana"
      },
      "video/vnd.dece.pd": {
        source: "iana",
        extensions: ["uvp", "uvvp"]
      },
      "video/vnd.dece.sd": {
        source: "iana",
        extensions: ["uvs", "uvvs"]
      },
      "video/vnd.dece.video": {
        source: "iana",
        extensions: ["uvv", "uvvv"]
      },
      "video/vnd.directv.mpeg": {
        source: "iana"
      },
      "video/vnd.directv.mpeg-tts": {
        source: "iana"
      },
      "video/vnd.dlna.mpeg-tts": {
        source: "iana"
      },
      "video/vnd.dvb.file": {
        source: "iana",
        extensions: ["dvb"]
      },
      "video/vnd.fvt": {
        source: "iana",
        extensions: ["fvt"]
      },
      "video/vnd.hns.video": {
        source: "iana"
      },
      "video/vnd.iptvforum.1dparityfec-1010": {
        source: "iana"
      },
      "video/vnd.iptvforum.1dparityfec-2005": {
        source: "iana"
      },
      "video/vnd.iptvforum.2dparityfec-1010": {
        source: "iana"
      },
      "video/vnd.iptvforum.2dparityfec-2005": {
        source: "iana"
      },
      "video/vnd.iptvforum.ttsavc": {
        source: "iana"
      },
      "video/vnd.iptvforum.ttsmpeg2": {
        source: "iana"
      },
      "video/vnd.motorola.video": {
        source: "iana"
      },
      "video/vnd.motorola.videop": {
        source: "iana"
      },
      "video/vnd.mpegurl": {
        source: "iana",
        extensions: ["mxu", "m4u"]
      },
      "video/vnd.ms-playready.media.pyv": {
        source: "iana",
        extensions: ["pyv"]
      },
      "video/vnd.nokia.interleaved-multimedia": {
        source: "iana"
      },
      "video/vnd.nokia.mp4vr": {
        source: "iana"
      },
      "video/vnd.nokia.videovoip": {
        source: "iana"
      },
      "video/vnd.objectvideo": {
        source: "iana"
      },
      "video/vnd.radgamettools.bink": {
        source: "iana"
      },
      "video/vnd.radgamettools.smacker": {
        source: "iana"
      },
      "video/vnd.sealed.mpeg1": {
        source: "iana"
      },
      "video/vnd.sealed.mpeg4": {
        source: "iana"
      },
      "video/vnd.sealed.swf": {
        source: "iana"
      },
      "video/vnd.sealedmedia.softseal.mov": {
        source: "iana"
      },
      "video/vnd.uvvu.mp4": {
        source: "iana",
        extensions: ["uvu", "uvvu"]
      },
      "video/vnd.vivo": {
        source: "iana",
        extensions: ["viv"]
      },
      "video/vnd.youtube.yt": {
        source: "iana"
      },
      "video/vp8": {
        source: "iana"
      },
      "video/vp9": {
        source: "iana"
      },
      "video/webm": {
        source: "apache",
        compressible: false,
        extensions: ["webm"]
      },
      "video/x-f4v": {
        source: "apache",
        extensions: ["f4v"]
      },
      "video/x-fli": {
        source: "apache",
        extensions: ["fli"]
      },
      "video/x-flv": {
        source: "apache",
        compressible: false,
        extensions: ["flv"]
      },
      "video/x-m4v": {
        source: "apache",
        extensions: ["m4v"]
      },
      "video/x-matroska": {
        source: "apache",
        compressible: false,
        extensions: ["mkv", "mk3d", "mks"]
      },
      "video/x-mng": {
        source: "apache",
        extensions: ["mng"]
      },
      "video/x-ms-asf": {
        source: "apache",
        extensions: ["asf", "asx"]
      },
      "video/x-ms-vob": {
        source: "apache",
        extensions: ["vob"]
      },
      "video/x-ms-wm": {
        source: "apache",
        extensions: ["wm"]
      },
      "video/x-ms-wmv": {
        source: "apache",
        compressible: false,
        extensions: ["wmv"]
      },
      "video/x-ms-wmx": {
        source: "apache",
        extensions: ["wmx"]
      },
      "video/x-ms-wvx": {
        source: "apache",
        extensions: ["wvx"]
      },
      "video/x-msvideo": {
        source: "apache",
        extensions: ["avi"]
      },
      "video/x-sgi-movie": {
        source: "apache",
        extensions: ["movie"]
      },
      "video/x-smv": {
        source: "apache",
        extensions: ["smv"]
      },
      "x-conference/x-cooltalk": {
        source: "apache",
        extensions: ["ice"]
      },
      "x-shader/x-fragment": {
        compressible: true
      },
      "x-shader/x-vertex": {
        compressible: true
      }
    };
  }
});

// node_modules/.pnpm/mime-db@1.52.0/node_modules/mime-db/index.js
var require_mime_db = __commonJS({
  "node_modules/.pnpm/mime-db@1.52.0/node_modules/mime-db/index.js"(exports, module) {
    init_esm_shims();
    module.exports = require_db();
  }
});

// node_modules/.pnpm/mime-types@2.1.35/node_modules/mime-types/index.js
var require_mime_types = __commonJS({
  "node_modules/.pnpm/mime-types@2.1.35/node_modules/mime-types/index.js"(exports) {
    init_esm_shims();
    var db = require_mime_db();
    var extname = __require("path").extname;
    var EXTRACT_TYPE_REGEXP = /^\s*([^;\s]*)(?:;|\s|$)/;
    var TEXT_TYPE_REGEXP = /^text\//i;
    exports.charset = charset;
    exports.charsets = { lookup: charset };
    exports.contentType = contentType;
    exports.extension = extension;
    exports.extensions = /* @__PURE__ */ Object.create(null);
    exports.lookup = lookup;
    exports.types = /* @__PURE__ */ Object.create(null);
    populateMaps(exports.extensions, exports.types);
    function charset(type) {
      if (!type || typeof type !== "string") {
        return false;
      }
      var match = EXTRACT_TYPE_REGEXP.exec(type);
      var mime = match && db[match[1].toLowerCase()];
      if (mime && mime.charset) {
        return mime.charset;
      }
      if (match && TEXT_TYPE_REGEXP.test(match[1])) {
        return "UTF-8";
      }
      return false;
    }
    function contentType(str) {
      if (!str || typeof str !== "string") {
        return false;
      }
      var mime = str.indexOf("/") === -1 ? exports.lookup(str) : str;
      if (!mime) {
        return false;
      }
      if (mime.indexOf("charset") === -1) {
        var charset2 = exports.charset(mime);
        if (charset2) mime += "; charset=" + charset2.toLowerCase();
      }
      return mime;
    }
    function extension(type) {
      if (!type || typeof type !== "string") {
        return false;
      }
      var match = EXTRACT_TYPE_REGEXP.exec(type);
      var exts = match && exports.extensions[match[1].toLowerCase()];
      if (!exts || !exts.length) {
        return false;
      }
      return exts[0];
    }
    function lookup(path3) {
      if (!path3 || typeof path3 !== "string") {
        return false;
      }
      var extension2 = extname("x." + path3).toLowerCase().substr(1);
      if (!extension2) {
        return false;
      }
      return exports.types[extension2] || false;
    }
    function populateMaps(extensions, types) {
      var preference = ["nginx", "apache", void 0, "iana"];
      Object.keys(db).forEach(function forEachMimeType(type) {
        var mime = db[type];
        var exts = mime.extensions;
        if (!exts || !exts.length) {
          return;
        }
        extensions[type] = exts;
        for (var i = 0; i < exts.length; i++) {
          var extension2 = exts[i];
          if (types[extension2]) {
            var from = preference.indexOf(db[types[extension2]].source);
            var to = preference.indexOf(mime.source);
            if (types[extension2] !== "application/octet-stream" && (from > to || from === to && types[extension2].substr(0, 12) === "application/")) {
              continue;
            }
          }
          types[extension2] = type;
        }
      });
    }
  }
});

// node_modules/.pnpm/asynckit@0.4.0/node_modules/asynckit/lib/defer.js
var require_defer = __commonJS({
  "node_modules/.pnpm/asynckit@0.4.0/node_modules/asynckit/lib/defer.js"(exports, module) {
    init_esm_shims();
    module.exports = defer;
    function defer(fn) {
      var nextTick = typeof setImmediate == "function" ? setImmediate : typeof process == "object" && typeof process.nextTick == "function" ? process.nextTick : null;
      if (nextTick) {
        nextTick(fn);
      } else {
        setTimeout(fn, 0);
      }
    }
  }
});

// node_modules/.pnpm/asynckit@0.4.0/node_modules/asynckit/lib/async.js
var require_async = __commonJS({
  "node_modules/.pnpm/asynckit@0.4.0/node_modules/asynckit/lib/async.js"(exports, module) {
    init_esm_shims();
    var defer = require_defer();
    module.exports = async;
    function async(callback) {
      var isAsync = false;
      defer(function() {
        isAsync = true;
      });
      return function async_callback(err, result) {
        if (isAsync) {
          callback(err, result);
        } else {
          defer(function nextTick_callback() {
            callback(err, result);
          });
        }
      };
    }
  }
});

// node_modules/.pnpm/asynckit@0.4.0/node_modules/asynckit/lib/abort.js
var require_abort = __commonJS({
  "node_modules/.pnpm/asynckit@0.4.0/node_modules/asynckit/lib/abort.js"(exports, module) {
    init_esm_shims();
    module.exports = abort;
    function abort(state) {
      Object.keys(state.jobs).forEach(clean.bind(state));
      state.jobs = {};
    }
    function clean(key) {
      if (typeof this.jobs[key] == "function") {
        this.jobs[key]();
      }
    }
  }
});

// node_modules/.pnpm/asynckit@0.4.0/node_modules/asynckit/lib/iterate.js
var require_iterate = __commonJS({
  "node_modules/.pnpm/asynckit@0.4.0/node_modules/asynckit/lib/iterate.js"(exports, module) {
    init_esm_shims();
    var async = require_async();
    var abort = require_abort();
    module.exports = iterate;
    function iterate(list, iterator2, state, callback) {
      var key = state["keyedList"] ? state["keyedList"][state.index] : state.index;
      state.jobs[key] = runJob(iterator2, key, list[key], function(error, output2) {
        if (!(key in state.jobs)) {
          return;
        }
        delete state.jobs[key];
        if (error) {
          abort(state);
        } else {
          state.results[key] = output2;
        }
        callback(error, state.results);
      });
    }
    function runJob(iterator2, key, item, callback) {
      var aborter;
      if (iterator2.length == 2) {
        aborter = iterator2(item, async(callback));
      } else {
        aborter = iterator2(item, key, async(callback));
      }
      return aborter;
    }
  }
});

// node_modules/.pnpm/asynckit@0.4.0/node_modules/asynckit/lib/state.js
var require_state = __commonJS({
  "node_modules/.pnpm/asynckit@0.4.0/node_modules/asynckit/lib/state.js"(exports, module) {
    init_esm_shims();
    module.exports = state;
    function state(list, sortMethod) {
      var isNamedList = !Array.isArray(list), initState = {
        index: 0,
        keyedList: isNamedList || sortMethod ? Object.keys(list) : null,
        jobs: {},
        results: isNamedList ? {} : [],
        size: isNamedList ? Object.keys(list).length : list.length
      };
      if (sortMethod) {
        initState.keyedList.sort(isNamedList ? sortMethod : function(a, b) {
          return sortMethod(list[a], list[b]);
        });
      }
      return initState;
    }
  }
});

// node_modules/.pnpm/asynckit@0.4.0/node_modules/asynckit/lib/terminator.js
var require_terminator = __commonJS({
  "node_modules/.pnpm/asynckit@0.4.0/node_modules/asynckit/lib/terminator.js"(exports, module) {
    init_esm_shims();
    var abort = require_abort();
    var async = require_async();
    module.exports = terminator;
    function terminator(callback) {
      if (!Object.keys(this.jobs).length) {
        return;
      }
      this.index = this.size;
      abort(this);
      async(callback)(null, this.results);
    }
  }
});

// node_modules/.pnpm/asynckit@0.4.0/node_modules/asynckit/parallel.js
var require_parallel = __commonJS({
  "node_modules/.pnpm/asynckit@0.4.0/node_modules/asynckit/parallel.js"(exports, module) {
    init_esm_shims();
    var iterate = require_iterate();
    var initState = require_state();
    var terminator = require_terminator();
    module.exports = parallel;
    function parallel(list, iterator2, callback) {
      var state = initState(list);
      while (state.index < (state["keyedList"] || list).length) {
        iterate(list, iterator2, state, function(error, result) {
          if (error) {
            callback(error, result);
            return;
          }
          if (Object.keys(state.jobs).length === 0) {
            callback(null, state.results);
            return;
          }
        });
        state.index++;
      }
      return terminator.bind(state, callback);
    }
  }
});

// node_modules/.pnpm/asynckit@0.4.0/node_modules/asynckit/serialOrdered.js
var require_serialOrdered = __commonJS({
  "node_modules/.pnpm/asynckit@0.4.0/node_modules/asynckit/serialOrdered.js"(exports, module) {
    init_esm_shims();
    var iterate = require_iterate();
    var initState = require_state();
    var terminator = require_terminator();
    module.exports = serialOrdered;
    module.exports.ascending = ascending;
    module.exports.descending = descending;
    function serialOrdered(list, iterator2, sortMethod, callback) {
      var state = initState(list, sortMethod);
      iterate(list, iterator2, state, function iteratorHandler(error, result) {
        if (error) {
          callback(error, result);
          return;
        }
        state.index++;
        if (state.index < (state["keyedList"] || list).length) {
          iterate(list, iterator2, state, iteratorHandler);
          return;
        }
        callback(null, state.results);
      });
      return terminator.bind(state, callback);
    }
    function ascending(a, b) {
      return a < b ? -1 : a > b ? 1 : 0;
    }
    function descending(a, b) {
      return -1 * ascending(a, b);
    }
  }
});

// node_modules/.pnpm/asynckit@0.4.0/node_modules/asynckit/serial.js
var require_serial = __commonJS({
  "node_modules/.pnpm/asynckit@0.4.0/node_modules/asynckit/serial.js"(exports, module) {
    init_esm_shims();
    var serialOrdered = require_serialOrdered();
    module.exports = serial;
    function serial(list, iterator2, callback) {
      return serialOrdered(list, iterator2, null, callback);
    }
  }
});

// node_modules/.pnpm/asynckit@0.4.0/node_modules/asynckit/index.js
var require_asynckit = __commonJS({
  "node_modules/.pnpm/asynckit@0.4.0/node_modules/asynckit/index.js"(exports, module) {
    init_esm_shims();
    module.exports = {
      parallel: require_parallel(),
      serial: require_serial(),
      serialOrdered: require_serialOrdered()
    };
  }
});

// node_modules/.pnpm/es-object-atoms@1.1.1/node_modules/es-object-atoms/index.js
var require_es_object_atoms = __commonJS({
  "node_modules/.pnpm/es-object-atoms@1.1.1/node_modules/es-object-atoms/index.js"(exports, module) {
    init_esm_shims();
    module.exports = Object;
  }
});

// node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/index.js
var require_es_errors = __commonJS({
  "node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/index.js"(exports, module) {
    init_esm_shims();
    module.exports = Error;
  }
});

// node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/eval.js
var require_eval = __commonJS({
  "node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/eval.js"(exports, module) {
    init_esm_shims();
    module.exports = EvalError;
  }
});

// node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/range.js
var require_range = __commonJS({
  "node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/range.js"(exports, module) {
    init_esm_shims();
    module.exports = RangeError;
  }
});

// node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/ref.js
var require_ref = __commonJS({
  "node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/ref.js"(exports, module) {
    init_esm_shims();
    module.exports = ReferenceError;
  }
});

// node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/syntax.js
var require_syntax = __commonJS({
  "node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/syntax.js"(exports, module) {
    init_esm_shims();
    module.exports = SyntaxError;
  }
});

// node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/type.js
var require_type = __commonJS({
  "node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/type.js"(exports, module) {
    init_esm_shims();
    module.exports = TypeError;
  }
});

// node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/uri.js
var require_uri = __commonJS({
  "node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/uri.js"(exports, module) {
    init_esm_shims();
    module.exports = URIError;
  }
});

// node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/abs.js
var require_abs = __commonJS({
  "node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/abs.js"(exports, module) {
    init_esm_shims();
    module.exports = Math.abs;
  }
});

// node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/floor.js
var require_floor = __commonJS({
  "node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/floor.js"(exports, module) {
    init_esm_shims();
    module.exports = Math.floor;
  }
});

// node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/max.js
var require_max = __commonJS({
  "node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/max.js"(exports, module) {
    init_esm_shims();
    module.exports = Math.max;
  }
});

// node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/min.js
var require_min = __commonJS({
  "node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/min.js"(exports, module) {
    init_esm_shims();
    module.exports = Math.min;
  }
});

// node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/pow.js
var require_pow = __commonJS({
  "node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/pow.js"(exports, module) {
    init_esm_shims();
    module.exports = Math.pow;
  }
});

// node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/round.js
var require_round = __commonJS({
  "node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/round.js"(exports, module) {
    init_esm_shims();
    module.exports = Math.round;
  }
});

// node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/isNaN.js
var require_isNaN = __commonJS({
  "node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/isNaN.js"(exports, module) {
    init_esm_shims();
    module.exports = Number.isNaN || function isNaN2(a) {
      return a !== a;
    };
  }
});

// node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/sign.js
var require_sign = __commonJS({
  "node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/sign.js"(exports, module) {
    init_esm_shims();
    var $isNaN = require_isNaN();
    module.exports = function sign(number) {
      if ($isNaN(number) || number === 0) {
        return number;
      }
      return number < 0 ? -1 : 1;
    };
  }
});

// node_modules/.pnpm/gopd@1.2.0/node_modules/gopd/gOPD.js
var require_gOPD = __commonJS({
  "node_modules/.pnpm/gopd@1.2.0/node_modules/gopd/gOPD.js"(exports, module) {
    init_esm_shims();
    module.exports = Object.getOwnPropertyDescriptor;
  }
});

// node_modules/.pnpm/gopd@1.2.0/node_modules/gopd/index.js
var require_gopd = __commonJS({
  "node_modules/.pnpm/gopd@1.2.0/node_modules/gopd/index.js"(exports, module) {
    init_esm_shims();
    var $gOPD = require_gOPD();
    if ($gOPD) {
      try {
        $gOPD([], "length");
      } catch (e) {
        $gOPD = null;
      }
    }
    module.exports = $gOPD;
  }
});

// node_modules/.pnpm/es-define-property@1.0.1/node_modules/es-define-property/index.js
var require_es_define_property = __commonJS({
  "node_modules/.pnpm/es-define-property@1.0.1/node_modules/es-define-property/index.js"(exports, module) {
    init_esm_shims();
    var $defineProperty = Object.defineProperty || false;
    if ($defineProperty) {
      try {
        $defineProperty({}, "a", { value: 1 });
      } catch (e) {
        $defineProperty = false;
      }
    }
    module.exports = $defineProperty;
  }
});

// node_modules/.pnpm/has-symbols@1.1.0/node_modules/has-symbols/shams.js
var require_shams = __commonJS({
  "node_modules/.pnpm/has-symbols@1.1.0/node_modules/has-symbols/shams.js"(exports, module) {
    init_esm_shims();
    module.exports = function hasSymbols() {
      if (typeof Symbol !== "function" || typeof Object.getOwnPropertySymbols !== "function") {
        return false;
      }
      if (typeof Symbol.iterator === "symbol") {
        return true;
      }
      var obj = {};
      var sym = Symbol("test");
      var symObj = Object(sym);
      if (typeof sym === "string") {
        return false;
      }
      if (Object.prototype.toString.call(sym) !== "[object Symbol]") {
        return false;
      }
      if (Object.prototype.toString.call(symObj) !== "[object Symbol]") {
        return false;
      }
      var symVal = 42;
      obj[sym] = symVal;
      for (var _ in obj) {
        return false;
      }
      if (typeof Object.keys === "function" && Object.keys(obj).length !== 0) {
        return false;
      }
      if (typeof Object.getOwnPropertyNames === "function" && Object.getOwnPropertyNames(obj).length !== 0) {
        return false;
      }
      var syms = Object.getOwnPropertySymbols(obj);
      if (syms.length !== 1 || syms[0] !== sym) {
        return false;
      }
      if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) {
        return false;
      }
      if (typeof Object.getOwnPropertyDescriptor === "function") {
        var descriptor = (
          /** @type {PropertyDescriptor} */
          Object.getOwnPropertyDescriptor(obj, sym)
        );
        if (descriptor.value !== symVal || descriptor.enumerable !== true) {
          return false;
        }
      }
      return true;
    };
  }
});

// node_modules/.pnpm/has-symbols@1.1.0/node_modules/has-symbols/index.js
var require_has_symbols = __commonJS({
  "node_modules/.pnpm/has-symbols@1.1.0/node_modules/has-symbols/index.js"(exports, module) {
    init_esm_shims();
    var origSymbol = typeof Symbol !== "undefined" && Symbol;
    var hasSymbolSham = require_shams();
    module.exports = function hasNativeSymbols() {
      if (typeof origSymbol !== "function") {
        return false;
      }
      if (typeof Symbol !== "function") {
        return false;
      }
      if (typeof origSymbol("foo") !== "symbol") {
        return false;
      }
      if (typeof Symbol("bar") !== "symbol") {
        return false;
      }
      return hasSymbolSham();
    };
  }
});

// node_modules/.pnpm/get-proto@1.0.1/node_modules/get-proto/Reflect.getPrototypeOf.js
var require_Reflect_getPrototypeOf = __commonJS({
  "node_modules/.pnpm/get-proto@1.0.1/node_modules/get-proto/Reflect.getPrototypeOf.js"(exports, module) {
    init_esm_shims();
    module.exports = typeof Reflect !== "undefined" && Reflect.getPrototypeOf || null;
  }
});

// node_modules/.pnpm/get-proto@1.0.1/node_modules/get-proto/Object.getPrototypeOf.js
var require_Object_getPrototypeOf = __commonJS({
  "node_modules/.pnpm/get-proto@1.0.1/node_modules/get-proto/Object.getPrototypeOf.js"(exports, module) {
    init_esm_shims();
    var $Object = require_es_object_atoms();
    module.exports = $Object.getPrototypeOf || null;
  }
});

// node_modules/.pnpm/function-bind@1.1.2/node_modules/function-bind/implementation.js
var require_implementation = __commonJS({
  "node_modules/.pnpm/function-bind@1.1.2/node_modules/function-bind/implementation.js"(exports, module) {
    init_esm_shims();
    var ERROR_MESSAGE = "Function.prototype.bind called on incompatible ";
    var toStr = Object.prototype.toString;
    var max = Math.max;
    var funcType = "[object Function]";
    var concatty = function concatty2(a, b) {
      var arr = [];
      for (var i = 0; i < a.length; i += 1) {
        arr[i] = a[i];
      }
      for (var j = 0; j < b.length; j += 1) {
        arr[j + a.length] = b[j];
      }
      return arr;
    };
    var slicy = function slicy2(arrLike, offset) {
      var arr = [];
      for (var i = offset, j = 0; i < arrLike.length; i += 1, j += 1) {
        arr[j] = arrLike[i];
      }
      return arr;
    };
    var joiny = function(arr, joiner) {
      var str = "";
      for (var i = 0; i < arr.length; i += 1) {
        str += arr[i];
        if (i + 1 < arr.length) {
          str += joiner;
        }
      }
      return str;
    };
    module.exports = function bind3(that) {
      var target = this;
      if (typeof target !== "function" || toStr.apply(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
      }
      var args = slicy(arguments, 1);
      var bound;
      var binder = function() {
        if (this instanceof bound) {
          var result = target.apply(
            this,
            concatty(args, arguments)
          );
          if (Object(result) === result) {
            return result;
          }
          return this;
        }
        return target.apply(
          that,
          concatty(args, arguments)
        );
      };
      var boundLength = max(0, target.length - args.length);
      var boundArgs = [];
      for (var i = 0; i < boundLength; i++) {
        boundArgs[i] = "$" + i;
      }
      bound = Function("binder", "return function (" + joiny(boundArgs, ",") + "){ return binder.apply(this,arguments); }")(binder);
      if (target.prototype) {
        var Empty = function Empty2() {
        };
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
      }
      return bound;
    };
  }
});

// node_modules/.pnpm/function-bind@1.1.2/node_modules/function-bind/index.js
var require_function_bind = __commonJS({
  "node_modules/.pnpm/function-bind@1.1.2/node_modules/function-bind/index.js"(exports, module) {
    init_esm_shims();
    var implementation = require_implementation();
    module.exports = Function.prototype.bind || implementation;
  }
});

// node_modules/.pnpm/call-bind-apply-helpers@1.0.2/node_modules/call-bind-apply-helpers/functionCall.js
var require_functionCall = __commonJS({
  "node_modules/.pnpm/call-bind-apply-helpers@1.0.2/node_modules/call-bind-apply-helpers/functionCall.js"(exports, module) {
    init_esm_shims();
    module.exports = Function.prototype.call;
  }
});

// node_modules/.pnpm/call-bind-apply-helpers@1.0.2/node_modules/call-bind-apply-helpers/functionApply.js
var require_functionApply = __commonJS({
  "node_modules/.pnpm/call-bind-apply-helpers@1.0.2/node_modules/call-bind-apply-helpers/functionApply.js"(exports, module) {
    init_esm_shims();
    module.exports = Function.prototype.apply;
  }
});

// node_modules/.pnpm/call-bind-apply-helpers@1.0.2/node_modules/call-bind-apply-helpers/reflectApply.js
var require_reflectApply = __commonJS({
  "node_modules/.pnpm/call-bind-apply-helpers@1.0.2/node_modules/call-bind-apply-helpers/reflectApply.js"(exports, module) {
    init_esm_shims();
    module.exports = typeof Reflect !== "undefined" && Reflect && Reflect.apply;
  }
});

// node_modules/.pnpm/call-bind-apply-helpers@1.0.2/node_modules/call-bind-apply-helpers/actualApply.js
var require_actualApply = __commonJS({
  "node_modules/.pnpm/call-bind-apply-helpers@1.0.2/node_modules/call-bind-apply-helpers/actualApply.js"(exports, module) {
    init_esm_shims();
    var bind3 = require_function_bind();
    var $apply = require_functionApply();
    var $call = require_functionCall();
    var $reflectApply = require_reflectApply();
    module.exports = $reflectApply || bind3.call($call, $apply);
  }
});

// node_modules/.pnpm/call-bind-apply-helpers@1.0.2/node_modules/call-bind-apply-helpers/index.js
var require_call_bind_apply_helpers = __commonJS({
  "node_modules/.pnpm/call-bind-apply-helpers@1.0.2/node_modules/call-bind-apply-helpers/index.js"(exports, module) {
    init_esm_shims();
    var bind3 = require_function_bind();
    var $TypeError = require_type();
    var $call = require_functionCall();
    var $actualApply = require_actualApply();
    module.exports = function callBindBasic(args) {
      if (args.length < 1 || typeof args[0] !== "function") {
        throw new $TypeError("a function is required");
      }
      return $actualApply(bind3, $call, args);
    };
  }
});

// node_modules/.pnpm/dunder-proto@1.0.1/node_modules/dunder-proto/get.js
var require_get = __commonJS({
  "node_modules/.pnpm/dunder-proto@1.0.1/node_modules/dunder-proto/get.js"(exports, module) {
    init_esm_shims();
    var callBind = require_call_bind_apply_helpers();
    var gOPD = require_gopd();
    var hasProtoAccessor;
    try {
      hasProtoAccessor = /** @type {{ __proto__?: typeof Array.prototype }} */
      [].__proto__ === Array.prototype;
    } catch (e) {
      if (!e || typeof e !== "object" || !("code" in e) || e.code !== "ERR_PROTO_ACCESS") {
        throw e;
      }
    }
    var desc = !!hasProtoAccessor && gOPD && gOPD(
      Object.prototype,
      /** @type {keyof typeof Object.prototype} */
      "__proto__"
    );
    var $Object = Object;
    var $getPrototypeOf = $Object.getPrototypeOf;
    module.exports = desc && typeof desc.get === "function" ? callBind([desc.get]) : typeof $getPrototypeOf === "function" ? (
      /** @type {import('./get')} */
      function getDunder(value) {
        return $getPrototypeOf(value == null ? value : $Object(value));
      }
    ) : false;
  }
});

// node_modules/.pnpm/get-proto@1.0.1/node_modules/get-proto/index.js
var require_get_proto = __commonJS({
  "node_modules/.pnpm/get-proto@1.0.1/node_modules/get-proto/index.js"(exports, module) {
    init_esm_shims();
    var reflectGetProto = require_Reflect_getPrototypeOf();
    var originalGetProto = require_Object_getPrototypeOf();
    var getDunderProto = require_get();
    module.exports = reflectGetProto ? function getProto(O) {
      return reflectGetProto(O);
    } : originalGetProto ? function getProto(O) {
      if (!O || typeof O !== "object" && typeof O !== "function") {
        throw new TypeError("getProto: not an object");
      }
      return originalGetProto(O);
    } : getDunderProto ? function getProto(O) {
      return getDunderProto(O);
    } : null;
  }
});

// node_modules/.pnpm/hasown@2.0.2/node_modules/hasown/index.js
var require_hasown = __commonJS({
  "node_modules/.pnpm/hasown@2.0.2/node_modules/hasown/index.js"(exports, module) {
    init_esm_shims();
    var call = Function.prototype.call;
    var $hasOwn = Object.prototype.hasOwnProperty;
    var bind3 = require_function_bind();
    module.exports = bind3.call(call, $hasOwn);
  }
});

// node_modules/.pnpm/get-intrinsic@1.3.0/node_modules/get-intrinsic/index.js
var require_get_intrinsic = __commonJS({
  "node_modules/.pnpm/get-intrinsic@1.3.0/node_modules/get-intrinsic/index.js"(exports, module) {
    init_esm_shims();
    var undefined2;
    var $Object = require_es_object_atoms();
    var $Error = require_es_errors();
    var $EvalError = require_eval();
    var $RangeError = require_range();
    var $ReferenceError = require_ref();
    var $SyntaxError = require_syntax();
    var $TypeError = require_type();
    var $URIError = require_uri();
    var abs = require_abs();
    var floor = require_floor();
    var max = require_max();
    var min = require_min();
    var pow = require_pow();
    var round = require_round();
    var sign = require_sign();
    var $Function = Function;
    var getEvalledConstructor = function(expressionSyntax) {
      try {
        return $Function('"use strict"; return (' + expressionSyntax + ").constructor;")();
      } catch (e) {
      }
    };
    var $gOPD = require_gopd();
    var $defineProperty = require_es_define_property();
    var throwTypeError = function() {
      throw new $TypeError();
    };
    var ThrowTypeError = $gOPD ? function() {
      try {
        arguments.callee;
        return throwTypeError;
      } catch (calleeThrows) {
        try {
          return $gOPD(arguments, "callee").get;
        } catch (gOPDthrows) {
          return throwTypeError;
        }
      }
    }() : throwTypeError;
    var hasSymbols = require_has_symbols()();
    var getProto = require_get_proto();
    var $ObjectGPO = require_Object_getPrototypeOf();
    var $ReflectGPO = require_Reflect_getPrototypeOf();
    var $apply = require_functionApply();
    var $call = require_functionCall();
    var needsEval = {};
    var TypedArray = typeof Uint8Array === "undefined" || !getProto ? undefined2 : getProto(Uint8Array);
    var INTRINSICS = {
      __proto__: null,
      "%AggregateError%": typeof AggregateError === "undefined" ? undefined2 : AggregateError,
      "%Array%": Array,
      "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? undefined2 : ArrayBuffer,
      "%ArrayIteratorPrototype%": hasSymbols && getProto ? getProto([][Symbol.iterator]()) : undefined2,
      "%AsyncFromSyncIteratorPrototype%": undefined2,
      "%AsyncFunction%": needsEval,
      "%AsyncGenerator%": needsEval,
      "%AsyncGeneratorFunction%": needsEval,
      "%AsyncIteratorPrototype%": needsEval,
      "%Atomics%": typeof Atomics === "undefined" ? undefined2 : Atomics,
      "%BigInt%": typeof BigInt === "undefined" ? undefined2 : BigInt,
      "%BigInt64Array%": typeof BigInt64Array === "undefined" ? undefined2 : BigInt64Array,
      "%BigUint64Array%": typeof BigUint64Array === "undefined" ? undefined2 : BigUint64Array,
      "%Boolean%": Boolean,
      "%DataView%": typeof DataView === "undefined" ? undefined2 : DataView,
      "%Date%": Date,
      "%decodeURI%": decodeURI,
      "%decodeURIComponent%": decodeURIComponent,
      "%encodeURI%": encodeURI,
      "%encodeURIComponent%": encodeURIComponent,
      "%Error%": $Error,
      "%eval%": eval,
      // eslint-disable-line no-eval
      "%EvalError%": $EvalError,
      "%Float16Array%": typeof Float16Array === "undefined" ? undefined2 : Float16Array,
      "%Float32Array%": typeof Float32Array === "undefined" ? undefined2 : Float32Array,
      "%Float64Array%": typeof Float64Array === "undefined" ? undefined2 : Float64Array,
      "%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? undefined2 : FinalizationRegistry,
      "%Function%": $Function,
      "%GeneratorFunction%": needsEval,
      "%Int8Array%": typeof Int8Array === "undefined" ? undefined2 : Int8Array,
      "%Int16Array%": typeof Int16Array === "undefined" ? undefined2 : Int16Array,
      "%Int32Array%": typeof Int32Array === "undefined" ? undefined2 : Int32Array,
      "%isFinite%": isFinite,
      "%isNaN%": isNaN,
      "%IteratorPrototype%": hasSymbols && getProto ? getProto(getProto([][Symbol.iterator]())) : undefined2,
      "%JSON%": typeof JSON === "object" ? JSON : undefined2,
      "%Map%": typeof Map === "undefined" ? undefined2 : Map,
      "%MapIteratorPrototype%": typeof Map === "undefined" || !hasSymbols || !getProto ? undefined2 : getProto((/* @__PURE__ */ new Map())[Symbol.iterator]()),
      "%Math%": Math,
      "%Number%": Number,
      "%Object%": $Object,
      "%Object.getOwnPropertyDescriptor%": $gOPD,
      "%parseFloat%": parseFloat,
      "%parseInt%": parseInt,
      "%Promise%": typeof Promise === "undefined" ? undefined2 : Promise,
      "%Proxy%": typeof Proxy === "undefined" ? undefined2 : Proxy,
      "%RangeError%": $RangeError,
      "%ReferenceError%": $ReferenceError,
      "%Reflect%": typeof Reflect === "undefined" ? undefined2 : Reflect,
      "%RegExp%": RegExp,
      "%Set%": typeof Set === "undefined" ? undefined2 : Set,
      "%SetIteratorPrototype%": typeof Set === "undefined" || !hasSymbols || !getProto ? undefined2 : getProto((/* @__PURE__ */ new Set())[Symbol.iterator]()),
      "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? undefined2 : SharedArrayBuffer,
      "%String%": String,
      "%StringIteratorPrototype%": hasSymbols && getProto ? getProto(""[Symbol.iterator]()) : undefined2,
      "%Symbol%": hasSymbols ? Symbol : undefined2,
      "%SyntaxError%": $SyntaxError,
      "%ThrowTypeError%": ThrowTypeError,
      "%TypedArray%": TypedArray,
      "%TypeError%": $TypeError,
      "%Uint8Array%": typeof Uint8Array === "undefined" ? undefined2 : Uint8Array,
      "%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? undefined2 : Uint8ClampedArray,
      "%Uint16Array%": typeof Uint16Array === "undefined" ? undefined2 : Uint16Array,
      "%Uint32Array%": typeof Uint32Array === "undefined" ? undefined2 : Uint32Array,
      "%URIError%": $URIError,
      "%WeakMap%": typeof WeakMap === "undefined" ? undefined2 : WeakMap,
      "%WeakRef%": typeof WeakRef === "undefined" ? undefined2 : WeakRef,
      "%WeakSet%": typeof WeakSet === "undefined" ? undefined2 : WeakSet,
      "%Function.prototype.call%": $call,
      "%Function.prototype.apply%": $apply,
      "%Object.defineProperty%": $defineProperty,
      "%Object.getPrototypeOf%": $ObjectGPO,
      "%Math.abs%": abs,
      "%Math.floor%": floor,
      "%Math.max%": max,
      "%Math.min%": min,
      "%Math.pow%": pow,
      "%Math.round%": round,
      "%Math.sign%": sign,
      "%Reflect.getPrototypeOf%": $ReflectGPO
    };
    if (getProto) {
      try {
        null.error;
      } catch (e) {
        errorProto = getProto(getProto(e));
        INTRINSICS["%Error.prototype%"] = errorProto;
      }
    }
    var errorProto;
    var doEval = function doEval2(name) {
      var value;
      if (name === "%AsyncFunction%") {
        value = getEvalledConstructor("async function () {}");
      } else if (name === "%GeneratorFunction%") {
        value = getEvalledConstructor("function* () {}");
      } else if (name === "%AsyncGeneratorFunction%") {
        value = getEvalledConstructor("async function* () {}");
      } else if (name === "%AsyncGenerator%") {
        var fn = doEval2("%AsyncGeneratorFunction%");
        if (fn) {
          value = fn.prototype;
        }
      } else if (name === "%AsyncIteratorPrototype%") {
        var gen = doEval2("%AsyncGenerator%");
        if (gen && getProto) {
          value = getProto(gen.prototype);
        }
      }
      INTRINSICS[name] = value;
      return value;
    };
    var LEGACY_ALIASES = {
      __proto__: null,
      "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
      "%ArrayPrototype%": ["Array", "prototype"],
      "%ArrayProto_entries%": ["Array", "prototype", "entries"],
      "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
      "%ArrayProto_keys%": ["Array", "prototype", "keys"],
      "%ArrayProto_values%": ["Array", "prototype", "values"],
      "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
      "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
      "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
      "%BooleanPrototype%": ["Boolean", "prototype"],
      "%DataViewPrototype%": ["DataView", "prototype"],
      "%DatePrototype%": ["Date", "prototype"],
      "%ErrorPrototype%": ["Error", "prototype"],
      "%EvalErrorPrototype%": ["EvalError", "prototype"],
      "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
      "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
      "%FunctionPrototype%": ["Function", "prototype"],
      "%Generator%": ["GeneratorFunction", "prototype"],
      "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
      "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
      "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
      "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
      "%JSONParse%": ["JSON", "parse"],
      "%JSONStringify%": ["JSON", "stringify"],
      "%MapPrototype%": ["Map", "prototype"],
      "%NumberPrototype%": ["Number", "prototype"],
      "%ObjectPrototype%": ["Object", "prototype"],
      "%ObjProto_toString%": ["Object", "prototype", "toString"],
      "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
      "%PromisePrototype%": ["Promise", "prototype"],
      "%PromiseProto_then%": ["Promise", "prototype", "then"],
      "%Promise_all%": ["Promise", "all"],
      "%Promise_reject%": ["Promise", "reject"],
      "%Promise_resolve%": ["Promise", "resolve"],
      "%RangeErrorPrototype%": ["RangeError", "prototype"],
      "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
      "%RegExpPrototype%": ["RegExp", "prototype"],
      "%SetPrototype%": ["Set", "prototype"],
      "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
      "%StringPrototype%": ["String", "prototype"],
      "%SymbolPrototype%": ["Symbol", "prototype"],
      "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
      "%TypedArrayPrototype%": ["TypedArray", "prototype"],
      "%TypeErrorPrototype%": ["TypeError", "prototype"],
      "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
      "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
      "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
      "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
      "%URIErrorPrototype%": ["URIError", "prototype"],
      "%WeakMapPrototype%": ["WeakMap", "prototype"],
      "%WeakSetPrototype%": ["WeakSet", "prototype"]
    };
    var bind3 = require_function_bind();
    var hasOwn = require_hasown();
    var $concat = bind3.call($call, Array.prototype.concat);
    var $spliceApply = bind3.call($apply, Array.prototype.splice);
    var $replace = bind3.call($call, String.prototype.replace);
    var $strSlice = bind3.call($call, String.prototype.slice);
    var $exec = bind3.call($call, RegExp.prototype.exec);
    var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
    var reEscapeChar = /\\(\\)?/g;
    var stringToPath = function stringToPath2(string) {
      var first = $strSlice(string, 0, 1);
      var last = $strSlice(string, -1);
      if (first === "%" && last !== "%") {
        throw new $SyntaxError("invalid intrinsic syntax, expected closing `%`");
      } else if (last === "%" && first !== "%") {
        throw new $SyntaxError("invalid intrinsic syntax, expected opening `%`");
      }
      var result = [];
      $replace(string, rePropName, function(match, number, quote, subString) {
        result[result.length] = quote ? $replace(subString, reEscapeChar, "$1") : number || match;
      });
      return result;
    };
    var getBaseIntrinsic = function getBaseIntrinsic2(name, allowMissing) {
      var intrinsicName = name;
      var alias;
      if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
        alias = LEGACY_ALIASES[intrinsicName];
        intrinsicName = "%" + alias[0] + "%";
      }
      if (hasOwn(INTRINSICS, intrinsicName)) {
        var value = INTRINSICS[intrinsicName];
        if (value === needsEval) {
          value = doEval(intrinsicName);
        }
        if (typeof value === "undefined" && !allowMissing) {
          throw new $TypeError("intrinsic " + name + " exists, but is not available. Please file an issue!");
        }
        return {
          alias,
          name: intrinsicName,
          value
        };
      }
      throw new $SyntaxError("intrinsic " + name + " does not exist!");
    };
    module.exports = function GetIntrinsic(name, allowMissing) {
      if (typeof name !== "string" || name.length === 0) {
        throw new $TypeError("intrinsic name must be a non-empty string");
      }
      if (arguments.length > 1 && typeof allowMissing !== "boolean") {
        throw new $TypeError('"allowMissing" argument must be a boolean');
      }
      if ($exec(/^%?[^%]*%?$/, name) === null) {
        throw new $SyntaxError("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
      }
      var parts = stringToPath(name);
      var intrinsicBaseName = parts.length > 0 ? parts[0] : "";
      var intrinsic = getBaseIntrinsic("%" + intrinsicBaseName + "%", allowMissing);
      var intrinsicRealName = intrinsic.name;
      var value = intrinsic.value;
      var skipFurtherCaching = false;
      var alias = intrinsic.alias;
      if (alias) {
        intrinsicBaseName = alias[0];
        $spliceApply(parts, $concat([0, 1], alias));
      }
      for (var i = 1, isOwn = true; i < parts.length; i += 1) {
        var part = parts[i];
        var first = $strSlice(part, 0, 1);
        var last = $strSlice(part, -1);
        if ((first === '"' || first === "'" || first === "`" || (last === '"' || last === "'" || last === "`")) && first !== last) {
          throw new $SyntaxError("property names with quotes must have matching quotes");
        }
        if (part === "constructor" || !isOwn) {
          skipFurtherCaching = true;
        }
        intrinsicBaseName += "." + part;
        intrinsicRealName = "%" + intrinsicBaseName + "%";
        if (hasOwn(INTRINSICS, intrinsicRealName)) {
          value = INTRINSICS[intrinsicRealName];
        } else if (value != null) {
          if (!(part in value)) {
            if (!allowMissing) {
              throw new $TypeError("base intrinsic for " + name + " exists, but the property is not available.");
            }
            return void 0;
          }
          if ($gOPD && i + 1 >= parts.length) {
            var desc = $gOPD(value, part);
            isOwn = !!desc;
            if (isOwn && "get" in desc && !("originalValue" in desc.get)) {
              value = desc.get;
            } else {
              value = value[part];
            }
          } else {
            isOwn = hasOwn(value, part);
            value = value[part];
          }
          if (isOwn && !skipFurtherCaching) {
            INTRINSICS[intrinsicRealName] = value;
          }
        }
      }
      return value;
    };
  }
});

// node_modules/.pnpm/has-tostringtag@1.0.2/node_modules/has-tostringtag/shams.js
var require_shams2 = __commonJS({
  "node_modules/.pnpm/has-tostringtag@1.0.2/node_modules/has-tostringtag/shams.js"(exports, module) {
    init_esm_shims();
    var hasSymbols = require_shams();
    module.exports = function hasToStringTagShams() {
      return hasSymbols() && !!Symbol.toStringTag;
    };
  }
});

// node_modules/.pnpm/es-set-tostringtag@2.1.0/node_modules/es-set-tostringtag/index.js
var require_es_set_tostringtag = __commonJS({
  "node_modules/.pnpm/es-set-tostringtag@2.1.0/node_modules/es-set-tostringtag/index.js"(exports, module) {
    init_esm_shims();
    var GetIntrinsic = require_get_intrinsic();
    var $defineProperty = GetIntrinsic("%Object.defineProperty%", true);
    var hasToStringTag = require_shams2()();
    var hasOwn = require_hasown();
    var $TypeError = require_type();
    var toStringTag2 = hasToStringTag ? Symbol.toStringTag : null;
    module.exports = function setToStringTag(object, value) {
      var overrideIfSet = arguments.length > 2 && !!arguments[2] && arguments[2].force;
      var nonConfigurable = arguments.length > 2 && !!arguments[2] && arguments[2].nonConfigurable;
      if (typeof overrideIfSet !== "undefined" && typeof overrideIfSet !== "boolean" || typeof nonConfigurable !== "undefined" && typeof nonConfigurable !== "boolean") {
        throw new $TypeError("if provided, the `overrideIfSet` and `nonConfigurable` options must be booleans");
      }
      if (toStringTag2 && (overrideIfSet || !hasOwn(object, toStringTag2))) {
        if ($defineProperty) {
          $defineProperty(object, toStringTag2, {
            configurable: !nonConfigurable,
            enumerable: false,
            value,
            writable: false
          });
        } else {
          object[toStringTag2] = value;
        }
      }
    };
  }
});

// node_modules/.pnpm/form-data@4.0.2/node_modules/form-data/lib/populate.js
var require_populate = __commonJS({
  "node_modules/.pnpm/form-data@4.0.2/node_modules/form-data/lib/populate.js"(exports, module) {
    init_esm_shims();
    module.exports = function(dst, src) {
      Object.keys(src).forEach(function(prop) {
        dst[prop] = dst[prop] || src[prop];
      });
      return dst;
    };
  }
});

// node_modules/.pnpm/form-data@4.0.2/node_modules/form-data/lib/form_data.js
var require_form_data = __commonJS({
  "node_modules/.pnpm/form-data@4.0.2/node_modules/form-data/lib/form_data.js"(exports, module) {
    init_esm_shims();
    var CombinedStream = require_combined_stream();
    var util3 = __require("util");
    var path3 = __require("path");
    var http2 = __require("http");
    var https2 = __require("https");
    var parseUrl = __require("url").parse;
    var fs7 = __require("fs");
    var Stream = __require("stream").Stream;
    var mime = require_mime_types();
    var asynckit = require_asynckit();
    var setToStringTag = require_es_set_tostringtag();
    var populate = require_populate();
    module.exports = FormData3;
    util3.inherits(FormData3, CombinedStream);
    function FormData3(options) {
      if (!(this instanceof FormData3)) {
        return new FormData3(options);
      }
      this._overheadLength = 0;
      this._valueLength = 0;
      this._valuesToMeasure = [];
      CombinedStream.call(this);
      options = options || {};
      for (var option in options) {
        this[option] = options[option];
      }
    }
    FormData3.LINE_BREAK = "\r\n";
    FormData3.DEFAULT_CONTENT_TYPE = "application/octet-stream";
    FormData3.prototype.append = function(field, value, options) {
      options = options || {};
      if (typeof options == "string") {
        options = { filename: options };
      }
      var append3 = CombinedStream.prototype.append.bind(this);
      if (typeof value == "number") {
        value = "" + value;
      }
      if (Array.isArray(value)) {
        this._error(new Error("Arrays are not supported."));
        return;
      }
      var header = this._multiPartHeader(field, value, options);
      var footer = this._multiPartFooter();
      append3(header);
      append3(value);
      append3(footer);
      this._trackLength(header, value, options);
    };
    FormData3.prototype._trackLength = function(header, value, options) {
      var valueLength = 0;
      if (options.knownLength != null) {
        valueLength += +options.knownLength;
      } else if (Buffer.isBuffer(value)) {
        valueLength = value.length;
      } else if (typeof value === "string") {
        valueLength = Buffer.byteLength(value);
      }
      this._valueLength += valueLength;
      this._overheadLength += Buffer.byteLength(header) + FormData3.LINE_BREAK.length;
      if (!value || !value.path && !(value.readable && Object.prototype.hasOwnProperty.call(value, "httpVersion")) && !(value instanceof Stream)) {
        return;
      }
      if (!options.knownLength) {
        this._valuesToMeasure.push(value);
      }
    };
    FormData3.prototype._lengthRetriever = function(value, callback) {
      if (Object.prototype.hasOwnProperty.call(value, "fd")) {
        if (value.end != void 0 && value.end != Infinity && value.start != void 0) {
          callback(null, value.end + 1 - (value.start ? value.start : 0));
        } else {
          fs7.stat(value.path, function(err, stat2) {
            var fileSize;
            if (err) {
              callback(err);
              return;
            }
            fileSize = stat2.size - (value.start ? value.start : 0);
            callback(null, fileSize);
          });
        }
      } else if (Object.prototype.hasOwnProperty.call(value, "httpVersion")) {
        callback(null, +value.headers["content-length"]);
      } else if (Object.prototype.hasOwnProperty.call(value, "httpModule")) {
        value.on("response", function(response) {
          value.pause();
          callback(null, +response.headers["content-length"]);
        });
        value.resume();
      } else {
        callback("Unknown stream");
      }
    };
    FormData3.prototype._multiPartHeader = function(field, value, options) {
      if (typeof options.header == "string") {
        return options.header;
      }
      var contentDisposition = this._getContentDisposition(value, options);
      var contentType = this._getContentType(value, options);
      var contents = "";
      var headers2 = {
        // add custom disposition as third element or keep it two elements if not
        "Content-Disposition": ["form-data", 'name="' + field + '"'].concat(contentDisposition || []),
        // if no content type. allow it to be empty array
        "Content-Type": [].concat(contentType || [])
      };
      if (typeof options.header == "object") {
        populate(headers2, options.header);
      }
      var header;
      for (var prop in headers2) {
        if (Object.prototype.hasOwnProperty.call(headers2, prop)) {
          header = headers2[prop];
          if (header == null) {
            continue;
          }
          if (!Array.isArray(header)) {
            header = [header];
          }
          if (header.length) {
            contents += prop + ": " + header.join("; ") + FormData3.LINE_BREAK;
          }
        }
      }
      return "--" + this.getBoundary() + FormData3.LINE_BREAK + contents + FormData3.LINE_BREAK;
    };
    FormData3.prototype._getContentDisposition = function(value, options) {
      var filename, contentDisposition;
      if (typeof options.filepath === "string") {
        filename = path3.normalize(options.filepath).replace(/\\/g, "/");
      } else if (options.filename || value.name || value.path) {
        filename = path3.basename(options.filename || value.name || value.path);
      } else if (value.readable && Object.prototype.hasOwnProperty.call(value, "httpVersion")) {
        filename = path3.basename(value.client._httpMessage.path || "");
      }
      if (filename) {
        contentDisposition = 'filename="' + filename + '"';
      }
      return contentDisposition;
    };
    FormData3.prototype._getContentType = function(value, options) {
      var contentType = options.contentType;
      if (!contentType && value.name) {
        contentType = mime.lookup(value.name);
      }
      if (!contentType && value.path) {
        contentType = mime.lookup(value.path);
      }
      if (!contentType && value.readable && Object.prototype.hasOwnProperty.call(value, "httpVersion")) {
        contentType = value.headers["content-type"];
      }
      if (!contentType && (options.filepath || options.filename)) {
        contentType = mime.lookup(options.filepath || options.filename);
      }
      if (!contentType && typeof value == "object") {
        contentType = FormData3.DEFAULT_CONTENT_TYPE;
      }
      return contentType;
    };
    FormData3.prototype._multiPartFooter = function() {
      return function(next) {
        var footer = FormData3.LINE_BREAK;
        var lastPart = this._streams.length === 0;
        if (lastPart) {
          footer += this._lastBoundary();
        }
        next(footer);
      }.bind(this);
    };
    FormData3.prototype._lastBoundary = function() {
      return "--" + this.getBoundary() + "--" + FormData3.LINE_BREAK;
    };
    FormData3.prototype.getHeaders = function(userHeaders) {
      var header;
      var formHeaders = {
        "content-type": "multipart/form-data; boundary=" + this.getBoundary()
      };
      for (header in userHeaders) {
        if (Object.prototype.hasOwnProperty.call(userHeaders, header)) {
          formHeaders[header.toLowerCase()] = userHeaders[header];
        }
      }
      return formHeaders;
    };
    FormData3.prototype.setBoundary = function(boundary) {
      this._boundary = boundary;
    };
    FormData3.prototype.getBoundary = function() {
      if (!this._boundary) {
        this._generateBoundary();
      }
      return this._boundary;
    };
    FormData3.prototype.getBuffer = function() {
      var dataBuffer = new Buffer.alloc(0);
      var boundary = this.getBoundary();
      for (var i = 0, len = this._streams.length; i < len; i++) {
        if (typeof this._streams[i] !== "function") {
          if (Buffer.isBuffer(this._streams[i])) {
            dataBuffer = Buffer.concat([dataBuffer, this._streams[i]]);
          } else {
            dataBuffer = Buffer.concat([dataBuffer, Buffer.from(this._streams[i])]);
          }
          if (typeof this._streams[i] !== "string" || this._streams[i].substring(2, boundary.length + 2) !== boundary) {
            dataBuffer = Buffer.concat([dataBuffer, Buffer.from(FormData3.LINE_BREAK)]);
          }
        }
      }
      return Buffer.concat([dataBuffer, Buffer.from(this._lastBoundary())]);
    };
    FormData3.prototype._generateBoundary = function() {
      var boundary = "--------------------------";
      for (var i = 0; i < 24; i++) {
        boundary += Math.floor(Math.random() * 10).toString(16);
      }
      this._boundary = boundary;
    };
    FormData3.prototype.getLengthSync = function() {
      var knownLength = this._overheadLength + this._valueLength;
      if (this._streams.length) {
        knownLength += this._lastBoundary().length;
      }
      if (!this.hasKnownLength()) {
        this._error(new Error("Cannot calculate proper length in synchronous way."));
      }
      return knownLength;
    };
    FormData3.prototype.hasKnownLength = function() {
      var hasKnownLength = true;
      if (this._valuesToMeasure.length) {
        hasKnownLength = false;
      }
      return hasKnownLength;
    };
    FormData3.prototype.getLength = function(cb) {
      var knownLength = this._overheadLength + this._valueLength;
      if (this._streams.length) {
        knownLength += this._lastBoundary().length;
      }
      if (!this._valuesToMeasure.length) {
        process.nextTick(cb.bind(this, null, knownLength));
        return;
      }
      asynckit.parallel(this._valuesToMeasure, this._lengthRetriever, function(err, values) {
        if (err) {
          cb(err);
          return;
        }
        values.forEach(function(length) {
          knownLength += length;
        });
        cb(null, knownLength);
      });
    };
    FormData3.prototype.submit = function(params, cb) {
      var request, options, defaults3 = { method: "post" };
      if (typeof params == "string") {
        params = parseUrl(params);
        options = populate({
          port: params.port,
          path: params.pathname,
          host: params.hostname,
          protocol: params.protocol
        }, defaults3);
      } else {
        options = populate(params, defaults3);
        if (!options.port) {
          options.port = options.protocol == "https:" ? 443 : 80;
        }
      }
      options.headers = this.getHeaders(params.headers);
      if (options.protocol == "https:") {
        request = https2.request(options);
      } else {
        request = http2.request(options);
      }
      this.getLength(function(err, length) {
        if (err && err !== "Unknown stream") {
          this._error(err);
          return;
        }
        if (length) {
          request.setHeader("Content-Length", length);
        }
        this.pipe(request);
        if (cb) {
          var onResponse;
          var callback = function(error, responce) {
            request.removeListener("error", callback);
            request.removeListener("response", onResponse);
            return cb.call(this, error, responce);
          };
          onResponse = callback.bind(this, null);
          request.on("error", callback);
          request.on("response", onResponse);
        }
      }.bind(this));
      return request;
    };
    FormData3.prototype._error = function(err) {
      if (!this.error) {
        this.error = err;
        this.pause();
        this.emit("error", err);
      }
    };
    FormData3.prototype.toString = function() {
      return "[object FormData]";
    };
    setToStringTag(FormData3, "FormData");
  }
});

// node_modules/.pnpm/proxy-from-env@1.1.0/node_modules/proxy-from-env/index.js
var require_proxy_from_env = __commonJS({
  "node_modules/.pnpm/proxy-from-env@1.1.0/node_modules/proxy-from-env/index.js"(exports) {
    init_esm_shims();
    var parseUrl = __require("url").parse;
    var DEFAULT_PORTS = {
      ftp: 21,
      gopher: 70,
      http: 80,
      https: 443,
      ws: 80,
      wss: 443
    };
    var stringEndsWith = String.prototype.endsWith || function(s) {
      return s.length <= this.length && this.indexOf(s, this.length - s.length) !== -1;
    };
    function getProxyForUrl(url2) {
      var parsedUrl = typeof url2 === "string" ? parseUrl(url2) : url2 || {};
      var proto = parsedUrl.protocol;
      var hostname = parsedUrl.host;
      var port = parsedUrl.port;
      if (typeof hostname !== "string" || !hostname || typeof proto !== "string") {
        return "";
      }
      proto = proto.split(":", 1)[0];
      hostname = hostname.replace(/:\d*$/, "");
      port = parseInt(port) || DEFAULT_PORTS[proto] || 0;
      if (!shouldProxy(hostname, port)) {
        return "";
      }
      var proxy = getEnv("npm_config_" + proto + "_proxy") || getEnv(proto + "_proxy") || getEnv("npm_config_proxy") || getEnv("all_proxy");
      if (proxy && proxy.indexOf("://") === -1) {
        proxy = proto + "://" + proxy;
      }
      return proxy;
    }
    function shouldProxy(hostname, port) {
      var NO_PROXY = (getEnv("npm_config_no_proxy") || getEnv("no_proxy")).toLowerCase();
      if (!NO_PROXY) {
        return true;
      }
      if (NO_PROXY === "*") {
        return false;
      }
      return NO_PROXY.split(/[,\s]/).every(function(proxy) {
        if (!proxy) {
          return true;
        }
        var parsedProxy = proxy.match(/^(.+):(\d+)$/);
        var parsedProxyHostname = parsedProxy ? parsedProxy[1] : proxy;
        var parsedProxyPort = parsedProxy ? parseInt(parsedProxy[2]) : 0;
        if (parsedProxyPort && parsedProxyPort !== port) {
          return true;
        }
        if (!/^[.*]/.test(parsedProxyHostname)) {
          return hostname !== parsedProxyHostname;
        }
        if (parsedProxyHostname.charAt(0) === "*") {
          parsedProxyHostname = parsedProxyHostname.slice(1);
        }
        return !stringEndsWith.call(hostname, parsedProxyHostname);
      });
    }
    function getEnv(key) {
      return process.env[key.toLowerCase()] || process.env[key.toUpperCase()] || "";
    }
    exports.getProxyForUrl = getProxyForUrl;
  }
});

// node_modules/.pnpm/ms@2.1.3/node_modules/ms/index.js
var require_ms = __commonJS({
  "node_modules/.pnpm/ms@2.1.3/node_modules/ms/index.js"(exports, module) {
    init_esm_shims();
    var s = 1e3;
    var m = s * 60;
    var h = m * 60;
    var d = h * 24;
    var w = d * 7;
    var y = d * 365.25;
    module.exports = function(val, options) {
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
  }
});

// node_modules/.pnpm/debug@4.4.0/node_modules/debug/src/common.js
var require_common = __commonJS({
  "node_modules/.pnpm/debug@4.4.0/node_modules/debug/src/common.js"(exports, module) {
    init_esm_shims();
    function setup(env) {
      createDebug.debug = createDebug;
      createDebug.default = createDebug;
      createDebug.coerce = coerce;
      createDebug.disable = disable;
      createDebug.enable = enable;
      createDebug.enabled = enabled;
      createDebug.humanize = require_ms();
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
        function debug(...args) {
          if (!debug.enabled) {
            return;
          }
          const self2 = debug;
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
          let index = 0;
          args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
            if (match === "%%") {
              return "%";
            }
            index++;
            const formatter = createDebug.formatters[format];
            if (typeof formatter === "function") {
              const val = args[index];
              match = formatter.call(self2, val);
              args.splice(index, 1);
              index--;
            }
            return match;
          });
          createDebug.formatArgs.call(self2, args);
          const logFn = self2.log || createDebug.log;
          logFn.apply(self2, args);
        }
        debug.namespace = namespace;
        debug.useColors = createDebug.useColors();
        debug.color = createDebug.selectColor(namespace);
        debug.extend = extend3;
        debug.destroy = createDebug.destroy;
        Object.defineProperty(debug, "enabled", {
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
          createDebug.init(debug);
        }
        return debug;
      }
      function extend3(namespace, delimiter) {
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
    module.exports = setup;
  }
});

// node_modules/.pnpm/debug@4.4.0/node_modules/debug/src/browser.js
var require_browser = __commonJS({
  "node_modules/.pnpm/debug@4.4.0/node_modules/debug/src/browser.js"(exports, module) {
    init_esm_shims();
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
      let index = 0;
      let lastC = 0;
      args[0].replace(/%[a-zA-Z%]/g, (match) => {
        if (match === "%%") {
          return;
        }
        index++;
        if (match === "%c") {
          lastC = index;
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
    module.exports = require_common()(exports);
    var { formatters } = module.exports;
    formatters.j = function(v) {
      try {
        return JSON.stringify(v);
      } catch (error) {
        return "[UnexpectedJSONParseError]: " + error.message;
      }
    };
  }
});

// node_modules/.pnpm/debug@4.4.0/node_modules/debug/src/node.js
var require_node = __commonJS({
  "node_modules/.pnpm/debug@4.4.0/node_modules/debug/src/node.js"(exports, module) {
    init_esm_shims();
    var tty = __require("tty");
    var util3 = __require("util");
    exports.init = init;
    exports.log = log;
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.destroy = util3.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    );
    exports.colors = [6, 2, 3, 4, 5, 1];
    try {
      const supportsColor = require_supports_color();
      if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
        exports.colors = [
          20,
          21,
          26,
          27,
          32,
          33,
          38,
          39,
          40,
          41,
          42,
          43,
          44,
          45,
          56,
          57,
          62,
          63,
          68,
          69,
          74,
          75,
          76,
          77,
          78,
          79,
          80,
          81,
          92,
          93,
          98,
          99,
          112,
          113,
          128,
          129,
          134,
          135,
          148,
          149,
          160,
          161,
          162,
          163,
          164,
          165,
          166,
          167,
          168,
          169,
          170,
          171,
          172,
          173,
          178,
          179,
          184,
          185,
          196,
          197,
          198,
          199,
          200,
          201,
          202,
          203,
          204,
          205,
          206,
          207,
          208,
          209,
          214,
          215,
          220,
          221
        ];
      }
    } catch (error) {
    }
    exports.inspectOpts = Object.keys(process.env).filter((key) => {
      return /^debug_/i.test(key);
    }).reduce((obj, key) => {
      const prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, (_, k) => {
        return k.toUpperCase();
      });
      let val = process.env[key];
      if (/^(yes|on|true|enabled)$/i.test(val)) {
        val = true;
      } else if (/^(no|off|false|disabled)$/i.test(val)) {
        val = false;
      } else if (val === "null") {
        val = null;
      } else {
        val = Number(val);
      }
      obj[prop] = val;
      return obj;
    }, {});
    function useColors() {
      return "colors" in exports.inspectOpts ? Boolean(exports.inspectOpts.colors) : tty.isatty(process.stderr.fd);
    }
    function formatArgs(args) {
      const { namespace: name, useColors: useColors2 } = this;
      if (useColors2) {
        const c = this.color;
        const colorCode = "\x1B[3" + (c < 8 ? c : "8;5;" + c);
        const prefix = `  ${colorCode};1m${name} \x1B[0m`;
        args[0] = prefix + args[0].split("\n").join("\n" + prefix);
        args.push(colorCode + "m+" + module.exports.humanize(this.diff) + "\x1B[0m");
      } else {
        args[0] = getDate() + name + " " + args[0];
      }
    }
    function getDate() {
      if (exports.inspectOpts.hideDate) {
        return "";
      }
      return (/* @__PURE__ */ new Date()).toISOString() + " ";
    }
    function log(...args) {
      return process.stderr.write(util3.formatWithOptions(exports.inspectOpts, ...args) + "\n");
    }
    function save(namespaces) {
      if (namespaces) {
        process.env.DEBUG = namespaces;
      } else {
        delete process.env.DEBUG;
      }
    }
    function load() {
      return process.env.DEBUG;
    }
    function init(debug) {
      debug.inspectOpts = {};
      const keys = Object.keys(exports.inspectOpts);
      for (let i = 0; i < keys.length; i++) {
        debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
      }
    }
    module.exports = require_common()(exports);
    var { formatters } = module.exports;
    formatters.o = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util3.inspect(v, this.inspectOpts).split("\n").map((str) => str.trim()).join(" ");
    };
    formatters.O = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util3.inspect(v, this.inspectOpts);
    };
  }
});

// node_modules/.pnpm/debug@4.4.0/node_modules/debug/src/index.js
var require_src = __commonJS({
  "node_modules/.pnpm/debug@4.4.0/node_modules/debug/src/index.js"(exports, module) {
    init_esm_shims();
    if (typeof process === "undefined" || process.type === "renderer" || process.browser === true || process.__nwjs) {
      module.exports = require_browser();
    } else {
      module.exports = require_node();
    }
  }
});

// node_modules/.pnpm/follow-redirects@1.15.9_debug@4.4.0/node_modules/follow-redirects/debug.js
var require_debug = __commonJS({
  "node_modules/.pnpm/follow-redirects@1.15.9_debug@4.4.0/node_modules/follow-redirects/debug.js"(exports, module) {
    init_esm_shims();
    var debug;
    module.exports = function() {
      if (!debug) {
        try {
          debug = require_src()("follow-redirects");
        } catch (error) {
        }
        if (typeof debug !== "function") {
          debug = function() {
          };
        }
      }
      debug.apply(null, arguments);
    };
  }
});

// node_modules/.pnpm/follow-redirects@1.15.9_debug@4.4.0/node_modules/follow-redirects/index.js
var require_follow_redirects = __commonJS({
  "node_modules/.pnpm/follow-redirects@1.15.9_debug@4.4.0/node_modules/follow-redirects/index.js"(exports, module) {
    init_esm_shims();
    var url2 = __require("url");
    var URL2 = url2.URL;
    var http2 = __require("http");
    var https2 = __require("https");
    var Writable = __require("stream").Writable;
    var assert = __require("assert");
    var debug = require_debug();
    (function detectUnsupportedEnvironment() {
      var looksLikeNode = typeof process !== "undefined";
      var looksLikeBrowser = typeof window !== "undefined" && typeof document !== "undefined";
      var looksLikeV8 = isFunction3(Error.captureStackTrace);
      if (!looksLikeNode && (looksLikeBrowser || !looksLikeV8)) {
        console.warn("The follow-redirects package should be excluded from browser builds.");
      }
    })();
    var useNativeURL = false;
    try {
      assert(new URL2(""));
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
    var destroy = Writable.prototype.destroy || noop3;
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
    RedirectableRequest.prototype.write = function(data2, encoding, callback) {
      if (this._ending) {
        throw new WriteAfterEndError();
      }
      if (!isString3(data2) && !isBuffer3(data2)) {
        throw new TypeError("data should be a string, Buffer or Uint8Array");
      }
      if (isFunction3(encoding)) {
        callback = encoding;
        encoding = null;
      }
      if (data2.length === 0) {
        if (callback) {
          callback();
        }
        return;
      }
      if (this._requestBodyLength + data2.length <= this._options.maxBodyLength) {
        this._requestBodyLength += data2.length;
        this._requestBodyBuffers.push({ data: data2, encoding });
        this._currentRequest.write(data2, encoding, callback);
      } else {
        this.emit("error", new MaxBodyLengthExceededError());
        this.abort();
      }
    };
    RedirectableRequest.prototype.end = function(data2, encoding, callback) {
      if (isFunction3(data2)) {
        callback = data2;
        data2 = encoding = null;
      } else if (isFunction3(encoding)) {
        callback = encoding;
        encoding = null;
      }
      if (!data2) {
        this._ended = this._ending = true;
        this._currentRequest.end(null, null, callback);
      } else {
        var self2 = this;
        var currentRequest = this._currentRequest;
        this.write(data2, encoding, function() {
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
      this._currentUrl = /^\//.test(this._options.path) ? url2.format(this._options) : (
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
              var buffer2 = buffers[i++];
              if (!request.finished) {
                request.write(buffer2.data, buffer2.encoding, writeNext);
              }
            } else if (self2._ended) {
              request.end();
            }
          }
        })();
      }
    };
    RedirectableRequest.prototype._processResponse = function(response) {
      var statusCode = response.statusCode;
      if (this._options.trackRedirects) {
        this._redirects.push({
          url: this._currentUrl,
          headers: response.headers,
          statusCode
        });
      }
      var location = response.headers.location;
      if (!location || this._options.followRedirects === false || statusCode < 300 || statusCode >= 400) {
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
      if ((statusCode === 301 || statusCode === 302) && this._options.method === "POST" || // RFC7231§6.4.4: The 303 (See Other) status code indicates that
      // the server is redirecting the user agent to a different resource […]
      // A user agent can perform a retrieval request targeting that URI
      // (a GET or HEAD request if using HTTP) […]
      statusCode === 303 && !/^(?:GET|HEAD)$/.test(this._options.method)) {
        this._options.method = "GET";
        this._requestBodyBuffers = [];
        removeMatchingHeaders(/^content-/i, this._options.headers);
      }
      var currentHostHeader = removeMatchingHeaders(/^host$/i, this._options.headers);
      var currentUrlParts = parseUrl(this._currentUrl);
      var currentHost = currentHostHeader || currentUrlParts.host;
      var currentUrl = /^\w+:/.test(location) ? this._currentUrl : url2.format(Object.assign(currentUrlParts, { host: currentHost }));
      var redirectUrl = resolveUrl(location, currentUrl);
      debug("redirecting to", redirectUrl.href);
      this._isRedirect = true;
      spreadUrlObject(redirectUrl, this._options);
      if (redirectUrl.protocol !== currentUrlParts.protocol && redirectUrl.protocol !== "https:" || redirectUrl.host !== currentHost && !isSubdomain(redirectUrl.host, currentHost)) {
        removeMatchingHeaders(/^(?:(?:proxy-)?authorization|cookie)$/i, this._options.headers);
      }
      if (isFunction3(beforeRedirect)) {
        var responseDetails = {
          headers: response.headers,
          statusCode
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
      var exports2 = {
        maxRedirects: 21,
        maxBodyLength: 10 * 1024 * 1024
      };
      var nativeProtocols = {};
      Object.keys(protocols).forEach(function(scheme) {
        var protocol = scheme + ":";
        var nativeProtocol = nativeProtocols[protocol] = protocols[scheme];
        var wrappedProtocol = exports2[scheme] = Object.create(nativeProtocol);
        function request(input, options, callback) {
          if (isURL(input)) {
            input = spreadUrlObject(input);
          } else if (isString3(input)) {
            input = spreadUrlObject(parseUrl(input));
          } else {
            callback = options;
            options = validateUrl(input);
            input = { protocol };
          }
          if (isFunction3(options)) {
            callback = options;
            options = null;
          }
          options = Object.assign({
            maxRedirects: exports2.maxRedirects,
            maxBodyLength: exports2.maxBodyLength
          }, input, options);
          options.nativeProtocols = nativeProtocols;
          if (!isString3(options.host) && !isString3(options.hostname)) {
            options.hostname = "::1";
          }
          assert.equal(options.protocol, protocol, "protocol mismatch");
          debug("options", options);
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
      return exports2;
    }
    function noop3() {
    }
    function parseUrl(input) {
      var parsed;
      if (useNativeURL) {
        parsed = new URL2(input);
      } else {
        parsed = validateUrl(url2.parse(input));
        if (!isString3(parsed.protocol)) {
          throw new InvalidUrlError({ input });
        }
      }
      return parsed;
    }
    function resolveUrl(relative, base) {
      return useNativeURL ? new URL2(relative, base) : parseUrl(url2.resolve(base, relative));
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
      var spread4 = target || {};
      for (var key of preservedUrlFields) {
        spread4[key] = urlObject[key];
      }
      if (spread4.hostname.startsWith("[")) {
        spread4.hostname = spread4.hostname.slice(1, -1);
      }
      if (spread4.port !== "") {
        spread4.port = Number(spread4.port);
      }
      spread4.path = spread4.search ? spread4.pathname + spread4.search : spread4.pathname;
      return spread4;
    }
    function removeMatchingHeaders(regex, headers2) {
      var lastValue;
      for (var header in headers2) {
        if (regex.test(header)) {
          lastValue = headers2[header];
          delete headers2[header];
        }
      }
      return lastValue === null || typeof lastValue === "undefined" ? void 0 : String(lastValue).trim();
    }
    function createErrorType(code, message, baseClass) {
      function CustomError(properties) {
        if (isFunction3(Error.captureStackTrace)) {
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
      request.on("error", noop3);
      request.destroy(error);
    }
    function isSubdomain(subdomain, domain) {
      assert(isString3(subdomain) && isString3(domain));
      var dot = subdomain.length - domain.length - 1;
      return dot > 0 && subdomain[dot] === "." && subdomain.endsWith(domain);
    }
    function isString3(value) {
      return typeof value === "string" || value instanceof String;
    }
    function isFunction3(value) {
      return typeof value === "function";
    }
    function isBuffer3(value) {
      return typeof value === "object" && "length" in value;
    }
    function isURL(value) {
      return URL2 && value instanceof URL2;
    }
    module.exports = wrap({ http: http2, https: https2 });
    module.exports.wrap = wrap;
  }
});

// node_modules/.pnpm/@ikenxuan+amagi@4.4.9/node_modules/@ikenxuan/amagi/dist/default/esm/index.mjs
init_esm_shims();

// node_modules/.pnpm/@karinjs+axios@1.0.1/node_modules/@karinjs/axios/dist/index.mjs
init_esm_shims();
function bind(fn, thisArg) {
  return function wrap() {
    return fn.apply(thisArg, arguments);
  };
}
var { toString } = Object.prototype;
var { getPrototypeOf } = Object;
var kindOf = /* @__PURE__ */ ((cache) => (thing) => {
  const str = toString.call(thing);
  return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null));
var kindOfTest = (type) => {
  type = type.toLowerCase();
  return (thing) => kindOf(thing) === type;
};
var typeOfTest = (type) => (thing) => typeof thing === type;
var { isArray } = Array;
var isUndefined = typeOfTest("undefined");
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && isFunction(val.constructor.isBuffer) && val.constructor.isBuffer(val);
}
var isArrayBuffer = kindOfTest("ArrayBuffer");
function isArrayBufferView(val) {
  let result;
  if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
    result = ArrayBuffer.isView(val);
  } else {
    result = val && val.buffer && isArrayBuffer(val.buffer);
  }
  return result;
}
var isString = typeOfTest("string");
var isFunction = typeOfTest("function");
var isNumber = typeOfTest("number");
var isObject = (thing) => thing !== null && typeof thing === "object";
var isBoolean = (thing) => thing === true || thing === false;
var isPlainObject = (val) => {
  if (kindOf(val) !== "object") {
    return false;
  }
  const prototype22 = getPrototypeOf(val);
  return (prototype22 === null || prototype22 === Object.prototype || Object.getPrototypeOf(prototype22) === null) && !(Symbol.toStringTag in val) && !(Symbol.iterator in val);
};
var isDate = kindOfTest("Date");
var isFile = kindOfTest("File");
var isBlob = kindOfTest("Blob");
var isFileList = kindOfTest("FileList");
var isStream = (val) => isObject(val) && isFunction(val.pipe);
var isFormData = (thing) => {
  let kind;
  return thing && (typeof FormData === "function" && thing instanceof FormData || isFunction(thing.append) && ((kind = kindOf(thing)) === "formdata" || // detect form-data instance
  kind === "object" && isFunction(thing.toString) && thing.toString() === "[object FormData]"));
};
var isURLSearchParams = kindOfTest("URLSearchParams");
var [isReadableStream, isRequest, isResponse, isHeaders] = ["ReadableStream", "Request", "Response", "Headers"].map(kindOfTest);
var trim = (str) => str.trim ? str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function forEach(obj, fn, { allOwnKeys = false } = {}) {
  if (obj === null || typeof obj === "undefined") {
    return;
  }
  let i;
  let l;
  if (typeof obj !== "object") {
    obj = [obj];
  }
  if (isArray(obj)) {
    for (i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
    const len = keys.length;
    let key;
    for (i = 0; i < len; i++) {
      key = keys[i];
      fn.call(null, obj[key], key, obj);
    }
  }
}
function findKey(obj, key) {
  key = key.toLowerCase();
  const keys = Object.keys(obj);
  let i = keys.length;
  let _key;
  while (i-- > 0) {
    _key = keys[i];
    if (key === _key.toLowerCase()) {
      return _key;
    }
  }
  return null;
}
var _global = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  return typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : global;
})();
var isContextDefined = (context) => !isUndefined(context) && context !== _global;
function merge() {
  const { caseless } = isContextDefined(this) && this || {};
  const result = {};
  const assignValue = (val, key) => {
    const targetKey = caseless && findKey(result, key) || key;
    if (isPlainObject(result[targetKey]) && isPlainObject(val)) {
      result[targetKey] = merge(result[targetKey], val);
    } else if (isPlainObject(val)) {
      result[targetKey] = merge({}, val);
    } else if (isArray(val)) {
      result[targetKey] = val.slice();
    } else {
      result[targetKey] = val;
    }
  };
  for (let i = 0, l = arguments.length; i < l; i++) {
    arguments[i] && forEach(arguments[i], assignValue);
  }
  return result;
}
var extend = (a, b, thisArg, { allOwnKeys } = {}) => {
  forEach(b, (val, key) => {
    if (thisArg && isFunction(val)) {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  }, { allOwnKeys });
  return a;
};
var stripBOM = (content) => {
  if (content.charCodeAt(0) === 65279) {
    content = content.slice(1);
  }
  return content;
};
var inherits = (constructor, superConstructor, props, descriptors22) => {
  constructor.prototype = Object.create(superConstructor.prototype, descriptors22);
  constructor.prototype.constructor = constructor;
  Object.defineProperty(constructor, "super", {
    value: superConstructor.prototype
  });
  props && Object.assign(constructor.prototype, props);
};
var toFlatObject = (sourceObj, destObj, filter22, propFilter) => {
  let props;
  let i;
  let prop;
  const merged = {};
  destObj = destObj || {};
  if (sourceObj == null) return destObj;
  do {
    props = Object.getOwnPropertyNames(sourceObj);
    i = props.length;
    while (i-- > 0) {
      prop = props[i];
      if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
        destObj[prop] = sourceObj[prop];
        merged[prop] = true;
      }
    }
    sourceObj = filter22 !== false && getPrototypeOf(sourceObj);
  } while (sourceObj && (!filter22 || filter22(sourceObj, destObj)) && sourceObj !== Object.prototype);
  return destObj;
};
var endsWith = (str, searchString, position) => {
  str = String(str);
  if (position === void 0 || position > str.length) {
    position = str.length;
  }
  position -= searchString.length;
  const lastIndex = str.indexOf(searchString, position);
  return lastIndex !== -1 && lastIndex === position;
};
var toArray = (thing) => {
  if (!thing) return null;
  if (isArray(thing)) return thing;
  let i = thing.length;
  if (!isNumber(i)) return null;
  const arr = new Array(i);
  while (i-- > 0) {
    arr[i] = thing[i];
  }
  return arr;
};
var isTypedArray = /* @__PURE__ */ ((TypedArray) => {
  return (thing) => {
    return TypedArray && thing instanceof TypedArray;
  };
})(typeof Uint8Array !== "undefined" && getPrototypeOf(Uint8Array));
var forEachEntry = (obj, fn) => {
  const generator = obj && obj[Symbol.iterator];
  const iterator2 = generator.call(obj);
  let result;
  while ((result = iterator2.next()) && !result.done) {
    const pair = result.value;
    fn.call(obj, pair[0], pair[1]);
  }
};
var matchAll = (regExp, str) => {
  let matches;
  const arr = [];
  while ((matches = regExp.exec(str)) !== null) {
    arr.push(matches);
  }
  return arr;
};
var isHTMLForm = kindOfTest("HTMLFormElement");
var toCamelCase = (str) => {
  return str.toLowerCase().replace(
    /[-_\s]([a-z\d])(\w*)/g,
    function replacer(m, p1, p2) {
      return p1.toUpperCase() + p2;
    }
  );
};
var hasOwnProperty = (({ hasOwnProperty: hasOwnProperty22 }) => (obj, prop) => hasOwnProperty22.call(obj, prop))(Object.prototype);
var isRegExp = kindOfTest("RegExp");
var reduceDescriptors = (obj, reducer) => {
  const descriptors22 = Object.getOwnPropertyDescriptors(obj);
  const reducedDescriptors = {};
  forEach(descriptors22, (descriptor, name) => {
    let ret;
    if ((ret = reducer(descriptor, name, obj)) !== false) {
      reducedDescriptors[name] = ret || descriptor;
    }
  });
  Object.defineProperties(obj, reducedDescriptors);
};
var freezeMethods = (obj) => {
  reduceDescriptors(obj, (descriptor, name) => {
    if (isFunction(obj) && ["arguments", "caller", "callee"].indexOf(name) !== -1) {
      return false;
    }
    const value = obj[name];
    if (!isFunction(value)) return;
    descriptor.enumerable = false;
    if ("writable" in descriptor) {
      descriptor.writable = false;
      return;
    }
    if (!descriptor.set) {
      descriptor.set = () => {
        throw Error("Can not rewrite read-only method '" + name + "'");
      };
    }
  });
};
var toObjectSet = (arrayOrString, delimiter) => {
  const obj = {};
  const define = (arr) => {
    arr.forEach((value) => {
      obj[value] = true;
    });
  };
  isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));
  return obj;
};
var noop = () => {
};
var toFiniteNumber = (value, defaultValue) => {
  return value != null && Number.isFinite(value = +value) ? value : defaultValue;
};
function isSpecCompliantForm(thing) {
  return !!(thing && isFunction(thing.append) && thing[Symbol.toStringTag] === "FormData" && thing[Symbol.iterator]);
}
var toJSONObject = (obj) => {
  const stack = new Array(10);
  const visit = (source, i) => {
    if (isObject(source)) {
      if (stack.indexOf(source) >= 0) {
        return;
      }
      if (!("toJSON" in source)) {
        stack[i] = source;
        const target = isArray(source) ? [] : {};
        forEach(source, (value, key) => {
          const reducedValue = visit(value, i + 1);
          !isUndefined(reducedValue) && (target[key] = reducedValue);
        });
        stack[i] = void 0;
        return target;
      }
    }
    return source;
  };
  return visit(obj, 0);
};
var isAsyncFn = kindOfTest("AsyncFunction");
var isThenable = (thing) => thing && (isObject(thing) || isFunction(thing)) && isFunction(thing.then) && isFunction(thing.catch);
var _setImmediate = ((setImmediateSupported, postMessageSupported) => {
  if (setImmediateSupported) {
    return setImmediate;
  }
  return postMessageSupported ? ((token, callbacks) => {
    _global.addEventListener("message", ({ source, data: data2 }) => {
      if (source === _global && data2 === token) {
        callbacks.length && callbacks.shift()();
      }
    }, false);
    return (cb) => {
      callbacks.push(cb);
      _global.postMessage(token, "*");
    };
  })(`axios@${Math.random()}`, []) : (cb) => setTimeout(cb);
})(
  typeof setImmediate === "function",
  isFunction(_global.postMessage)
);
var asap = typeof queueMicrotask !== "undefined" ? queueMicrotask.bind(_global) : typeof process !== "undefined" && process.nextTick || _setImmediate;
var utils$1 = {
  isArray,
  isArrayBuffer,
  isBuffer,
  isFormData,
  isArrayBufferView,
  isString,
  isNumber,
  isBoolean,
  isObject,
  isPlainObject,
  isReadableStream,
  isRequest,
  isResponse,
  isHeaders,
  isUndefined,
  isDate,
  isFile,
  isBlob,
  isRegExp,
  isFunction,
  isStream,
  isURLSearchParams,
  isTypedArray,
  isFileList,
  forEach,
  merge,
  extend,
  trim,
  stripBOM,
  inherits,
  toFlatObject,
  kindOf,
  kindOfTest,
  endsWith,
  toArray,
  forEachEntry,
  matchAll,
  isHTMLForm,
  hasOwnProperty,
  hasOwnProp: hasOwnProperty,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors,
  freezeMethods,
  toObjectSet,
  toCamelCase,
  noop,
  toFiniteNumber,
  findKey,
  global: _global,
  isContextDefined,
  isSpecCompliantForm,
  toJSONObject,
  isAsyncFn,
  isThenable,
  setImmediate: _setImmediate,
  asap
};
function AxiosError$2(message, code, config, request, response) {
  Error.call(this);
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor);
  } else {
    this.stack = new Error().stack;
  }
  this.message = message;
  this.name = "AxiosError";
  code && (this.code = code);
  config && (this.config = config);
  request && (this.request = request);
  if (response) {
    this.response = response;
    this.status = response.status ? response.status : null;
  }
}
utils$1.inherits(AxiosError$2, Error, {
  toJSON: function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: utils$1.toJSONObject(this.config),
      code: this.code,
      status: this.status
    };
  }
});
var prototype$1 = AxiosError$2.prototype;
var descriptors = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL"
  // eslint-disable-next-line func-names
].forEach((code) => {
  descriptors[code] = { value: code };
});
Object.defineProperties(AxiosError$2, descriptors);
Object.defineProperty(prototype$1, "isAxiosError", { value: true });
AxiosError$2.from = (error, code, config, request, response, customProps) => {
  const axiosError = Object.create(prototype$1);
  utils$1.toFlatObject(error, axiosError, function filter22(obj) {
    return obj !== Error.prototype;
  }, (prop) => {
    return prop !== "isAxiosError";
  });
  AxiosError$2.call(axiosError, error.message, code, config, request, response);
  axiosError.cause = error;
  axiosError.name = error.name;
  customProps && Object.assign(axiosError, customProps);
  return axiosError;
};
var httpAdapter = null;
function isVisitable(thing) {
  return utils$1.isPlainObject(thing) || utils$1.isArray(thing);
}
function removeBrackets(key) {
  return utils$1.endsWith(key, "[]") ? key.slice(0, -2) : key;
}
function renderKey(path3, key, dots) {
  if (!path3) return key;
  return path3.concat(key).map(function each(token, i) {
    token = removeBrackets(token);
    return !dots && i ? "[" + token + "]" : token;
  }).join(dots ? "." : "");
}
function isFlatArray(arr) {
  return utils$1.isArray(arr) && !arr.some(isVisitable);
}
var predicates = utils$1.toFlatObject(utils$1, {}, null, function filter(prop) {
  return /^is[A-Z]/.test(prop);
});
function toFormData$2(obj, formData, options) {
  if (!utils$1.isObject(obj)) {
    throw new TypeError("target must be an object");
  }
  formData = formData || new FormData();
  options = utils$1.toFlatObject(options, {
    metaTokens: true,
    dots: false,
    indexes: false
  }, false, function defined(option, source) {
    return !utils$1.isUndefined(source[option]);
  });
  const metaTokens = options.metaTokens;
  const visitor = options.visitor || defaultVisitor;
  const dots = options.dots;
  const indexes = options.indexes;
  const _Blob = options.Blob || typeof Blob !== "undefined" && Blob;
  const useBlob = _Blob && utils$1.isSpecCompliantForm(formData);
  if (!utils$1.isFunction(visitor)) {
    throw new TypeError("visitor must be a function");
  }
  function convertValue(value) {
    if (value === null) return "";
    if (utils$1.isDate(value)) {
      return value.toISOString();
    }
    if (!useBlob && utils$1.isBlob(value)) {
      throw new AxiosError$2("Blob is not supported. Use a Buffer instead.");
    }
    if (utils$1.isArrayBuffer(value) || utils$1.isTypedArray(value)) {
      return useBlob && typeof Blob === "function" ? new Blob([value]) : Buffer.from(value);
    }
    return value;
  }
  function defaultVisitor(value, key, path3) {
    let arr = value;
    if (value && !path3 && typeof value === "object") {
      if (utils$1.endsWith(key, "{}")) {
        key = metaTokens ? key : key.slice(0, -2);
        value = JSON.stringify(value);
      } else if (utils$1.isArray(value) && isFlatArray(value) || (utils$1.isFileList(value) || utils$1.endsWith(key, "[]")) && (arr = utils$1.toArray(value))) {
        key = removeBrackets(key);
        arr.forEach(function each(el, index) {
          !(utils$1.isUndefined(el) || el === null) && formData.append(
            // eslint-disable-next-line no-nested-ternary
            indexes === true ? renderKey([key], index, dots) : indexes === null ? key : key + "[]",
            convertValue(el)
          );
        });
        return false;
      }
    }
    if (isVisitable(value)) {
      return true;
    }
    formData.append(renderKey(path3, key, dots), convertValue(value));
    return false;
  }
  const stack = [];
  const exposedHelpers = Object.assign(predicates, {
    defaultVisitor,
    convertValue,
    isVisitable
  });
  function build(value, path3) {
    if (utils$1.isUndefined(value)) return;
    if (stack.indexOf(value) !== -1) {
      throw Error("Circular reference detected in " + path3.join("."));
    }
    stack.push(value);
    utils$1.forEach(value, function each(el, key) {
      const result = !(utils$1.isUndefined(el) || el === null) && visitor.call(
        formData,
        el,
        utils$1.isString(key) ? key.trim() : key,
        path3,
        exposedHelpers
      );
      if (result === true) {
        build(el, path3 ? path3.concat(key) : [key]);
      }
    });
    stack.pop();
  }
  if (!utils$1.isObject(obj)) {
    throw new TypeError("data must be an object");
  }
  build(obj);
  return formData;
}
function encode$1(str) {
  const charMap = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(str).replace(/[!'()~]|%20|%00/g, function replacer(match) {
    return charMap[match];
  });
}
function AxiosURLSearchParams(params, options) {
  this._pairs = [];
  params && toFormData$2(params, this, options);
}
var prototype = AxiosURLSearchParams.prototype;
prototype.append = function append(name, value) {
  this._pairs.push([name, value]);
};
prototype.toString = function toString2(encoder) {
  const _encode = encoder ? function(value) {
    return encoder.call(this, value, encode$1);
  } : encode$1;
  return this._pairs.map(function each(pair) {
    return _encode(pair[0]) + "=" + _encode(pair[1]);
  }, "").join("&");
};
function encode(val) {
  return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function buildURL(url2, params, options) {
  if (!params) {
    return url2;
  }
  const _encode = options && options.encode || encode;
  if (utils$1.isFunction(options)) {
    options = {
      serialize: options
    };
  }
  const serializeFn = options && options.serialize;
  let serializedParams;
  if (serializeFn) {
    serializedParams = serializeFn(params, options);
  } else {
    serializedParams = utils$1.isURLSearchParams(params) ? params.toString() : new AxiosURLSearchParams(params, options).toString(_encode);
  }
  if (serializedParams) {
    const hashmarkIndex = url2.indexOf("#");
    if (hashmarkIndex !== -1) {
      url2 = url2.slice(0, hashmarkIndex);
    }
    url2 += (url2.indexOf("?") === -1 ? "?" : "&") + serializedParams;
  }
  return url2;
}
var InterceptorManager = class {
  constructor() {
    this.handlers = [];
  }
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(fulfilled, rejected, options) {
    this.handlers.push({
      fulfilled,
      rejected,
      synchronous: options ? options.synchronous : false,
      runWhen: options ? options.runWhen : null
    });
    return this.handlers.length - 1;
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
   */
  eject(id) {
    if (this.handlers[id]) {
      this.handlers[id] = null;
    }
  }
  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    if (this.handlers) {
      this.handlers = [];
    }
  }
  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(fn) {
    utils$1.forEach(this.handlers, function forEachHandler(h) {
      if (h !== null) {
        fn(h);
      }
    });
  }
};
var transitionalDefaults = {
  silentJSONParsing: true,
  forcedJSONParsing: true,
  clarifyTimeoutError: false
};
var URLSearchParams$1 = typeof URLSearchParams !== "undefined" ? URLSearchParams : AxiosURLSearchParams;
var FormData$1 = typeof FormData !== "undefined" ? FormData : null;
var Blob$1 = typeof Blob !== "undefined" ? Blob : null;
var platform$1 = {
  isBrowser: true,
  classes: {
    URLSearchParams: URLSearchParams$1,
    FormData: FormData$1,
    Blob: Blob$1
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
};
var hasBrowserEnv = typeof window !== "undefined" && typeof document !== "undefined";
var _navigator = typeof navigator === "object" && navigator || void 0;
var hasStandardBrowserEnv = hasBrowserEnv && (!_navigator || ["ReactNative", "NativeScript", "NS"].indexOf(_navigator.product) < 0);
var hasStandardBrowserWebWorkerEnv = (() => {
  return typeof WorkerGlobalScope !== "undefined" && // eslint-disable-next-line no-undef
  self instanceof WorkerGlobalScope && typeof self.importScripts === "function";
})();
var origin = hasBrowserEnv && window.location.href || "http://localhost";
var utils = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv,
  hasStandardBrowserEnv,
  hasStandardBrowserWebWorkerEnv,
  navigator: _navigator,
  origin
}, Symbol.toStringTag, { value: "Module" }));
var platform = {
  ...utils,
  ...platform$1
};
function toURLEncodedForm(data2, options) {
  return toFormData$2(data2, new platform.classes.URLSearchParams(), Object.assign({
    visitor: function(value, key, path3, helpers) {
      if (platform.isNode && utils$1.isBuffer(value)) {
        this.append(key, value.toString("base64"));
        return false;
      }
      return helpers.defaultVisitor.apply(this, arguments);
    }
  }, options));
}
function parsePropPath(name) {
  return utils$1.matchAll(/\w+|\[(\w*)]/g, name).map((match) => {
    return match[0] === "[]" ? "" : match[1] || match[0];
  });
}
function arrayToObject(arr) {
  const obj = {};
  const keys = Object.keys(arr);
  let i;
  const len = keys.length;
  let key;
  for (i = 0; i < len; i++) {
    key = keys[i];
    obj[key] = arr[key];
  }
  return obj;
}
function formDataToJSON(formData) {
  function buildPath(path3, value, target, index) {
    let name = path3[index++];
    if (name === "__proto__") return true;
    const isNumericKey = Number.isFinite(+name);
    const isLast = index >= path3.length;
    name = !name && utils$1.isArray(target) ? target.length : name;
    if (isLast) {
      if (utils$1.hasOwnProp(target, name)) {
        target[name] = [target[name], value];
      } else {
        target[name] = value;
      }
      return !isNumericKey;
    }
    if (!target[name] || !utils$1.isObject(target[name])) {
      target[name] = [];
    }
    const result = buildPath(path3, value, target[name], index);
    if (result && utils$1.isArray(target[name])) {
      target[name] = arrayToObject(target[name]);
    }
    return !isNumericKey;
  }
  if (utils$1.isFormData(formData) && utils$1.isFunction(formData.entries)) {
    const obj = {};
    utils$1.forEachEntry(formData, (name, value) => {
      buildPath(parsePropPath(name), value, obj, 0);
    });
    return obj;
  }
  return null;
}
function stringifySafely(rawValue, parser, encoder) {
  if (utils$1.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils$1.trim(rawValue);
    } catch (e) {
      if (e.name !== "SyntaxError") {
        throw e;
      }
    }
  }
  return (encoder || JSON.stringify)(rawValue);
}
var defaults = {
  transitional: transitionalDefaults,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [function transformRequest(data2, headers2) {
    const contentType = headers2.getContentType() || "";
    const hasJSONContentType = contentType.indexOf("application/json") > -1;
    const isObjectPayload = utils$1.isObject(data2);
    if (isObjectPayload && utils$1.isHTMLForm(data2)) {
      data2 = new FormData(data2);
    }
    const isFormData22 = utils$1.isFormData(data2);
    if (isFormData22) {
      return hasJSONContentType ? JSON.stringify(formDataToJSON(data2)) : data2;
    }
    if (utils$1.isArrayBuffer(data2) || utils$1.isBuffer(data2) || utils$1.isStream(data2) || utils$1.isFile(data2) || utils$1.isBlob(data2) || utils$1.isReadableStream(data2)) {
      return data2;
    }
    if (utils$1.isArrayBufferView(data2)) {
      return data2.buffer;
    }
    if (utils$1.isURLSearchParams(data2)) {
      headers2.setContentType("application/x-www-form-urlencoded;charset=utf-8", false);
      return data2.toString();
    }
    let isFileList22;
    if (isObjectPayload) {
      if (contentType.indexOf("application/x-www-form-urlencoded") > -1) {
        return toURLEncodedForm(data2, this.formSerializer).toString();
      }
      if ((isFileList22 = utils$1.isFileList(data2)) || contentType.indexOf("multipart/form-data") > -1) {
        const _FormData = this.env && this.env.FormData;
        return toFormData$2(
          isFileList22 ? { "files[]": data2 } : data2,
          _FormData && new _FormData(),
          this.formSerializer
        );
      }
    }
    if (isObjectPayload || hasJSONContentType) {
      headers2.setContentType("application/json", false);
      return stringifySafely(data2);
    }
    return data2;
  }],
  transformResponse: [function transformResponse(data2) {
    const transitional22 = this.transitional || defaults.transitional;
    const forcedJSONParsing = transitional22 && transitional22.forcedJSONParsing;
    const JSONRequested = this.responseType === "json";
    if (utils$1.isResponse(data2) || utils$1.isReadableStream(data2)) {
      return data2;
    }
    if (data2 && utils$1.isString(data2) && (forcedJSONParsing && !this.responseType || JSONRequested)) {
      const silentJSONParsing = transitional22 && transitional22.silentJSONParsing;
      const strictJSONParsing = !silentJSONParsing && JSONRequested;
      try {
        return JSON.parse(data2);
      } catch (e) {
        if (strictJSONParsing) {
          if (e.name === "SyntaxError") {
            throw AxiosError$2.from(e, AxiosError$2.ERR_BAD_RESPONSE, this, null, this.response);
          }
          throw e;
        }
      }
    }
    return data2;
  }],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: platform.classes.FormData,
    Blob: platform.classes.Blob
  },
  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },
  headers: {
    common: {
      "Accept": "application/json, text/plain, */*",
      "Content-Type": void 0
    }
  }
};
utils$1.forEach(["delete", "get", "head", "post", "put", "patch"], (method) => {
  defaults.headers[method] = {};
});
var ignoreDuplicateOf = utils$1.toObjectSet([
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
]);
var parseHeaders = (rawHeaders) => {
  const parsed = {};
  let key;
  let val;
  let i;
  rawHeaders && rawHeaders.split("\n").forEach(function parser(line) {
    i = line.indexOf(":");
    key = line.substring(0, i).trim().toLowerCase();
    val = line.substring(i + 1).trim();
    if (!key || parsed[key] && ignoreDuplicateOf[key]) {
      return;
    }
    if (key === "set-cookie") {
      if (parsed[key]) {
        parsed[key].push(val);
      } else {
        parsed[key] = [val];
      }
    } else {
      parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
    }
  });
  return parsed;
};
var $internals = Symbol("internals");
function normalizeHeader(header) {
  return header && String(header).trim().toLowerCase();
}
function normalizeValue(value) {
  if (value === false || value == null) {
    return value;
  }
  return utils$1.isArray(value) ? value.map(normalizeValue) : String(value);
}
function parseTokens(str) {
  const tokens = /* @__PURE__ */ Object.create(null);
  const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let match;
  while (match = tokensRE.exec(str)) {
    tokens[match[1]] = match[2];
  }
  return tokens;
}
var isValidHeaderName = (str) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());
function matchHeaderValue(context, value, header, filter22, isHeaderNameFilter) {
  if (utils$1.isFunction(filter22)) {
    return filter22.call(this, value, header);
  }
  if (isHeaderNameFilter) {
    value = header;
  }
  if (!utils$1.isString(value)) return;
  if (utils$1.isString(filter22)) {
    return value.indexOf(filter22) !== -1;
  }
  if (utils$1.isRegExp(filter22)) {
    return filter22.test(value);
  }
}
function formatHeader(header) {
  return header.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (w, char, str) => {
    return char.toUpperCase() + str;
  });
}
function buildAccessors(obj, header) {
  const accessorName = utils$1.toCamelCase(" " + header);
  ["get", "set", "has"].forEach((methodName) => {
    Object.defineProperty(obj, methodName + accessorName, {
      value: function(arg1, arg2, arg3) {
        return this[methodName].call(this, header, arg1, arg2, arg3);
      },
      configurable: true
    });
  });
}
var AxiosHeaders$2 = class AxiosHeaders {
  constructor(headers2) {
    headers2 && this.set(headers2);
  }
  set(header, valueOrRewrite, rewrite) {
    const self2 = this;
    function setHeader(_value, _header, _rewrite) {
      const lHeader = normalizeHeader(_header);
      if (!lHeader) {
        throw new Error("header name must be a non-empty string");
      }
      const key = utils$1.findKey(self2, lHeader);
      if (!key || self2[key] === void 0 || _rewrite === true || _rewrite === void 0 && self2[key] !== false) {
        self2[key || _header] = normalizeValue(_value);
      }
    }
    const setHeaders = (headers2, _rewrite) => utils$1.forEach(headers2, (_value, _header) => setHeader(_value, _header, _rewrite));
    if (utils$1.isPlainObject(header) || header instanceof this.constructor) {
      setHeaders(header, valueOrRewrite);
    } else if (utils$1.isString(header) && (header = header.trim()) && !isValidHeaderName(header)) {
      setHeaders(parseHeaders(header), valueOrRewrite);
    } else if (utils$1.isHeaders(header)) {
      for (const [key, value] of header.entries()) {
        setHeader(value, key, rewrite);
      }
    } else {
      header != null && setHeader(valueOrRewrite, header, rewrite);
    }
    return this;
  }
  get(header, parser) {
    header = normalizeHeader(header);
    if (header) {
      const key = utils$1.findKey(this, header);
      if (key) {
        const value = this[key];
        if (!parser) {
          return value;
        }
        if (parser === true) {
          return parseTokens(value);
        }
        if (utils$1.isFunction(parser)) {
          return parser.call(this, value, key);
        }
        if (utils$1.isRegExp(parser)) {
          return parser.exec(value);
        }
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(header, matcher) {
    header = normalizeHeader(header);
    if (header) {
      const key = utils$1.findKey(this, header);
      return !!(key && this[key] !== void 0 && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
    }
    return false;
  }
  delete(header, matcher) {
    const self2 = this;
    let deleted = false;
    function deleteHeader(_header) {
      _header = normalizeHeader(_header);
      if (_header) {
        const key = utils$1.findKey(self2, _header);
        if (key && (!matcher || matchHeaderValue(self2, self2[key], key, matcher))) {
          delete self2[key];
          deleted = true;
        }
      }
    }
    if (utils$1.isArray(header)) {
      header.forEach(deleteHeader);
    } else {
      deleteHeader(header);
    }
    return deleted;
  }
  clear(matcher) {
    const keys = Object.keys(this);
    let i = keys.length;
    let deleted = false;
    while (i--) {
      const key = keys[i];
      if (!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
        delete this[key];
        deleted = true;
      }
    }
    return deleted;
  }
  normalize(format) {
    const self2 = this;
    const headers2 = {};
    utils$1.forEach(this, (value, header) => {
      const key = utils$1.findKey(headers2, header);
      if (key) {
        self2[key] = normalizeValue(value);
        delete self2[header];
        return;
      }
      const normalized = format ? formatHeader(header) : String(header).trim();
      if (normalized !== header) {
        delete self2[header];
      }
      self2[normalized] = normalizeValue(value);
      headers2[normalized] = true;
    });
    return this;
  }
  concat(...targets) {
    return this.constructor.concat(this, ...targets);
  }
  toJSON(asStrings) {
    const obj = /* @__PURE__ */ Object.create(null);
    utils$1.forEach(this, (value, header) => {
      value != null && value !== false && (obj[header] = asStrings && utils$1.isArray(value) ? value.join(", ") : value);
    });
    return obj;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([header, value]) => header + ": " + value).join("\n");
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(thing) {
    return thing instanceof this ? thing : new this(thing);
  }
  static concat(first, ...targets) {
    const computed = new this(first);
    targets.forEach((target) => computed.set(target));
    return computed;
  }
  static accessor(header) {
    const internals = this[$internals] = this[$internals] = {
      accessors: {}
    };
    const accessors = internals.accessors;
    const prototype22 = this.prototype;
    function defineAccessor(_header) {
      const lHeader = normalizeHeader(_header);
      if (!accessors[lHeader]) {
        buildAccessors(prototype22, _header);
        accessors[lHeader] = true;
      }
    }
    utils$1.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);
    return this;
  }
};
AxiosHeaders$2.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
utils$1.reduceDescriptors(AxiosHeaders$2.prototype, ({ value }, key) => {
  let mapped = key[0].toUpperCase() + key.slice(1);
  return {
    get: () => value,
    set(headerValue) {
      this[mapped] = headerValue;
    }
  };
});
utils$1.freezeMethods(AxiosHeaders$2);
function transformData(fns, response) {
  const config = this || defaults;
  const context = response || config;
  const headers2 = AxiosHeaders$2.from(context.headers);
  let data2 = context.data;
  utils$1.forEach(fns, function transform(fn) {
    data2 = fn.call(config, data2, headers2.normalize(), response ? response.status : void 0);
  });
  headers2.normalize();
  return data2;
}
function isCancel$2(value) {
  return !!(value && value.__CANCEL__);
}
function CanceledError$2(message, config, request) {
  AxiosError$2.call(this, message == null ? "canceled" : message, AxiosError$2.ERR_CANCELED, config, request);
  this.name = "CanceledError";
}
utils$1.inherits(CanceledError$2, AxiosError$2, {
  __CANCEL__: true
});
function settle(resolve, reject, response) {
  const validateStatus22 = response.config.validateStatus;
  if (!response.status || !validateStatus22 || validateStatus22(response.status)) {
    resolve(response);
  } else {
    reject(new AxiosError$2(
      "Request failed with status code " + response.status,
      [AxiosError$2.ERR_BAD_REQUEST, AxiosError$2.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
      response.config,
      response.request,
      response
    ));
  }
}
function parseProtocol(url2) {
  const match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url2);
  return match && match[1] || "";
}
function speedometer(samplesCount, min) {
  samplesCount = samplesCount || 10;
  const bytes = new Array(samplesCount);
  const timestamps = new Array(samplesCount);
  let head = 0;
  let tail = 0;
  let firstSampleTS;
  min = min !== void 0 ? min : 1e3;
  return function push(chunkLength) {
    const now2 = Date.now();
    const startedAt = timestamps[tail];
    if (!firstSampleTS) {
      firstSampleTS = now2;
    }
    bytes[head] = chunkLength;
    timestamps[head] = now2;
    let i = tail;
    let bytesCount = 0;
    while (i !== head) {
      bytesCount += bytes[i++];
      i = i % samplesCount;
    }
    head = (head + 1) % samplesCount;
    if (head === tail) {
      tail = (tail + 1) % samplesCount;
    }
    if (now2 - firstSampleTS < min) {
      return;
    }
    const passed = startedAt && now2 - startedAt;
    return passed ? Math.round(bytesCount * 1e3 / passed) : void 0;
  };
}
function throttle(fn, freq) {
  let timestamp = 0;
  let threshold = 1e3 / freq;
  let lastArgs;
  let timer;
  const invoke = (args, now2 = Date.now()) => {
    timestamp = now2;
    lastArgs = null;
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    fn.apply(null, args);
  };
  const throttled = (...args) => {
    const now2 = Date.now();
    const passed = now2 - timestamp;
    if (passed >= threshold) {
      invoke(args, now2);
    } else {
      lastArgs = args;
      if (!timer) {
        timer = setTimeout(() => {
          timer = null;
          invoke(lastArgs);
        }, threshold - passed);
      }
    }
  };
  const flush = () => lastArgs && invoke(lastArgs);
  return [throttled, flush];
}
var progressEventReducer = (listener, isDownloadStream, freq = 3) => {
  let bytesNotified = 0;
  const _speedometer = speedometer(50, 250);
  return throttle((e) => {
    const loaded = e.loaded;
    const total = e.lengthComputable ? e.total : void 0;
    const progressBytes = loaded - bytesNotified;
    const rate = _speedometer(progressBytes);
    const inRange = loaded <= total;
    bytesNotified = loaded;
    const data2 = {
      loaded,
      total,
      progress: total ? loaded / total : void 0,
      bytes: progressBytes,
      rate: rate ? rate : void 0,
      estimated: rate && total && inRange ? (total - loaded) / rate : void 0,
      event: e,
      lengthComputable: total != null,
      [isDownloadStream ? "download" : "upload"]: true
    };
    listener(data2);
  }, freq);
};
var progressEventDecorator = (total, throttled) => {
  const lengthComputable = total != null;
  return [(loaded) => throttled[0]({
    lengthComputable,
    total,
    loaded
  }), throttled[1]];
};
var asyncDecorator = (fn) => (...args) => utils$1.asap(() => fn(...args));
var isURLSameOrigin = platform.hasStandardBrowserEnv ? /* @__PURE__ */ ((origin22, isMSIE) => (url2) => {
  url2 = new URL(url2, platform.origin);
  return origin22.protocol === url2.protocol && origin22.host === url2.host && (isMSIE || origin22.port === url2.port);
})(
  new URL(platform.origin),
  platform.navigator && /(msie|trident)/i.test(platform.navigator.userAgent)
) : () => true;
var cookies = platform.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(name, value, expires, path3, domain, secure) {
      const cookie = [name + "=" + encodeURIComponent(value)];
      utils$1.isNumber(expires) && cookie.push("expires=" + new Date(expires).toGMTString());
      utils$1.isString(path3) && cookie.push("path=" + path3);
      utils$1.isString(domain) && cookie.push("domain=" + domain);
      secure === true && cookie.push("secure");
      document.cookie = cookie.join("; ");
    },
    read(name) {
      const match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
      return match ? decodeURIComponent(match[3]) : null;
    },
    remove(name) {
      this.write(name, "", Date.now() - 864e5);
    }
  }
) : (
  // Non-standard browser env (web workers, react-native) lack needed support.
  {
    write() {
    },
    read() {
      return null;
    },
    remove() {
    }
  }
);
function isAbsoluteURL(url2) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url2);
}
function combineURLs(baseURL, relativeURL) {
  return relativeURL ? baseURL.replace(/\/?\/$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
}
function buildFullPath(baseURL, requestedURL, allowAbsoluteUrls) {
  let isRelativeUrl = !isAbsoluteURL(requestedURL);
  if (baseURL && (isRelativeUrl || allowAbsoluteUrls == false)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
}
var headersToObject = (thing) => thing instanceof AxiosHeaders$2 ? { ...thing } : thing;
function mergeConfig$2(config1, config2) {
  config2 = config2 || {};
  const config = {};
  function getMergedValue(target, source, prop, caseless) {
    if (utils$1.isPlainObject(target) && utils$1.isPlainObject(source)) {
      return utils$1.merge.call({ caseless }, target, source);
    } else if (utils$1.isPlainObject(source)) {
      return utils$1.merge({}, source);
    } else if (utils$1.isArray(source)) {
      return source.slice();
    }
    return source;
  }
  function mergeDeepProperties(a, b, prop, caseless) {
    if (!utils$1.isUndefined(b)) {
      return getMergedValue(a, b, prop, caseless);
    } else if (!utils$1.isUndefined(a)) {
      return getMergedValue(void 0, a, prop, caseless);
    }
  }
  function valueFromConfig2(a, b) {
    if (!utils$1.isUndefined(b)) {
      return getMergedValue(void 0, b);
    }
  }
  function defaultToConfig2(a, b) {
    if (!utils$1.isUndefined(b)) {
      return getMergedValue(void 0, b);
    } else if (!utils$1.isUndefined(a)) {
      return getMergedValue(void 0, a);
    }
  }
  function mergeDirectKeys(a, b, prop) {
    if (prop in config2) {
      return getMergedValue(a, b);
    } else if (prop in config1) {
      return getMergedValue(void 0, a);
    }
  }
  const mergeMap = {
    url: valueFromConfig2,
    method: valueFromConfig2,
    data: valueFromConfig2,
    baseURL: defaultToConfig2,
    transformRequest: defaultToConfig2,
    transformResponse: defaultToConfig2,
    paramsSerializer: defaultToConfig2,
    timeout: defaultToConfig2,
    timeoutMessage: defaultToConfig2,
    withCredentials: defaultToConfig2,
    withXSRFToken: defaultToConfig2,
    adapter: defaultToConfig2,
    responseType: defaultToConfig2,
    xsrfCookieName: defaultToConfig2,
    xsrfHeaderName: defaultToConfig2,
    onUploadProgress: defaultToConfig2,
    onDownloadProgress: defaultToConfig2,
    decompress: defaultToConfig2,
    maxContentLength: defaultToConfig2,
    maxBodyLength: defaultToConfig2,
    beforeRedirect: defaultToConfig2,
    transport: defaultToConfig2,
    httpAgent: defaultToConfig2,
    httpsAgent: defaultToConfig2,
    cancelToken: defaultToConfig2,
    socketPath: defaultToConfig2,
    responseEncoding: defaultToConfig2,
    validateStatus: mergeDirectKeys,
    headers: (a, b, prop) => mergeDeepProperties(headersToObject(a), headersToObject(b), prop, true)
  };
  utils$1.forEach(Object.keys(Object.assign({}, config1, config2)), function computeConfigValue(prop) {
    const merge22 = mergeMap[prop] || mergeDeepProperties;
    const configValue = merge22(config1[prop], config2[prop], prop);
    utils$1.isUndefined(configValue) && merge22 !== mergeDirectKeys || (config[prop] = configValue);
  });
  return config;
}
var resolveConfig = (config) => {
  const newConfig = mergeConfig$2({}, config);
  let { data: data2, withXSRFToken, xsrfHeaderName, xsrfCookieName, headers: headers2, auth } = newConfig;
  newConfig.headers = headers2 = AxiosHeaders$2.from(headers2);
  newConfig.url = buildURL(buildFullPath(newConfig.baseURL, newConfig.url, newConfig.allowAbsoluteUrls), config.params, config.paramsSerializer);
  if (auth) {
    headers2.set(
      "Authorization",
      "Basic " + btoa((auth.username || "") + ":" + (auth.password ? unescape(encodeURIComponent(auth.password)) : ""))
    );
  }
  let contentType;
  if (utils$1.isFormData(data2)) {
    if (platform.hasStandardBrowserEnv || platform.hasStandardBrowserWebWorkerEnv) {
      headers2.setContentType(void 0);
    } else if ((contentType = headers2.getContentType()) !== false) {
      const [type, ...tokens] = contentType ? contentType.split(";").map((token) => token.trim()).filter(Boolean) : [];
      headers2.setContentType([type || "multipart/form-data", ...tokens].join("; "));
    }
  }
  if (platform.hasStandardBrowserEnv) {
    withXSRFToken && utils$1.isFunction(withXSRFToken) && (withXSRFToken = withXSRFToken(newConfig));
    if (withXSRFToken || withXSRFToken !== false && isURLSameOrigin(newConfig.url)) {
      const xsrfValue = xsrfHeaderName && xsrfCookieName && cookies.read(xsrfCookieName);
      if (xsrfValue) {
        headers2.set(xsrfHeaderName, xsrfValue);
      }
    }
  }
  return newConfig;
};
var isXHRAdapterSupported = typeof XMLHttpRequest !== "undefined";
var xhrAdapter = isXHRAdapterSupported && function(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    const _config = resolveConfig(config);
    let requestData = _config.data;
    const requestHeaders = AxiosHeaders$2.from(_config.headers).normalize();
    let { responseType, onUploadProgress, onDownloadProgress } = _config;
    let onCanceled;
    let uploadThrottled, downloadThrottled;
    let flushUpload, flushDownload;
    function done() {
      flushUpload && flushUpload();
      flushDownload && flushDownload();
      _config.cancelToken && _config.cancelToken.unsubscribe(onCanceled);
      _config.signal && _config.signal.removeEventListener("abort", onCanceled);
    }
    let request = new XMLHttpRequest();
    request.open(_config.method.toUpperCase(), _config.url, true);
    request.timeout = _config.timeout;
    function onloadend() {
      if (!request) {
        return;
      }
      const responseHeaders = AxiosHeaders$2.from(
        "getAllResponseHeaders" in request && request.getAllResponseHeaders()
      );
      const responseData = !responseType || responseType === "text" || responseType === "json" ? request.responseText : request.response;
      const response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      };
      settle(function _resolve(value) {
        resolve(value);
        done();
      }, function _reject(err) {
        reject(err);
        done();
      }, response);
      request = null;
    }
    if ("onloadend" in request) {
      request.onloadend = onloadend;
    } else {
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        }
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf("file:") === 0)) {
          return;
        }
        setTimeout(onloadend);
      };
    }
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }
      reject(new AxiosError$2("Request aborted", AxiosError$2.ECONNABORTED, config, request));
      request = null;
    };
    request.onerror = function handleError() {
      reject(new AxiosError$2("Network Error", AxiosError$2.ERR_NETWORK, config, request));
      request = null;
    };
    request.ontimeout = function handleTimeout() {
      let timeoutErrorMessage = _config.timeout ? "timeout of " + _config.timeout + "ms exceeded" : "timeout exceeded";
      const transitional22 = _config.transitional || transitionalDefaults;
      if (_config.timeoutErrorMessage) {
        timeoutErrorMessage = _config.timeoutErrorMessage;
      }
      reject(new AxiosError$2(
        timeoutErrorMessage,
        transitional22.clarifyTimeoutError ? AxiosError$2.ETIMEDOUT : AxiosError$2.ECONNABORTED,
        config,
        request
      ));
      request = null;
    };
    requestData === void 0 && requestHeaders.setContentType(null);
    if ("setRequestHeader" in request) {
      utils$1.forEach(requestHeaders.toJSON(), function setRequestHeader(val, key) {
        request.setRequestHeader(key, val);
      });
    }
    if (!utils$1.isUndefined(_config.withCredentials)) {
      request.withCredentials = !!_config.withCredentials;
    }
    if (responseType && responseType !== "json") {
      request.responseType = _config.responseType;
    }
    if (onDownloadProgress) {
      [downloadThrottled, flushDownload] = progressEventReducer(onDownloadProgress, true);
      request.addEventListener("progress", downloadThrottled);
    }
    if (onUploadProgress && request.upload) {
      [uploadThrottled, flushUpload] = progressEventReducer(onUploadProgress);
      request.upload.addEventListener("progress", uploadThrottled);
      request.upload.addEventListener("loadend", flushUpload);
    }
    if (_config.cancelToken || _config.signal) {
      onCanceled = (cancel) => {
        if (!request) {
          return;
        }
        reject(!cancel || cancel.type ? new CanceledError$2(null, config, request) : cancel);
        request.abort();
        request = null;
      };
      _config.cancelToken && _config.cancelToken.subscribe(onCanceled);
      if (_config.signal) {
        _config.signal.aborted ? onCanceled() : _config.signal.addEventListener("abort", onCanceled);
      }
    }
    const protocol = parseProtocol(_config.url);
    if (protocol && platform.protocols.indexOf(protocol) === -1) {
      reject(new AxiosError$2("Unsupported protocol " + protocol + ":", AxiosError$2.ERR_BAD_REQUEST, config));
      return;
    }
    request.send(requestData || null);
  });
};
var composeSignals = (signals, timeout) => {
  const { length } = signals = signals ? signals.filter(Boolean) : [];
  if (timeout || length) {
    let controller = new AbortController();
    let aborted;
    const onabort = function(reason) {
      if (!aborted) {
        aborted = true;
        unsubscribe();
        const err = reason instanceof Error ? reason : this.reason;
        controller.abort(err instanceof AxiosError$2 ? err : new CanceledError$2(err instanceof Error ? err.message : err));
      }
    };
    let timer = timeout && setTimeout(() => {
      timer = null;
      onabort(new AxiosError$2(`timeout ${timeout} of ms exceeded`, AxiosError$2.ETIMEDOUT));
    }, timeout);
    const unsubscribe = () => {
      if (signals) {
        timer && clearTimeout(timer);
        timer = null;
        signals.forEach((signal2) => {
          signal2.unsubscribe ? signal2.unsubscribe(onabort) : signal2.removeEventListener("abort", onabort);
        });
        signals = null;
      }
    };
    signals.forEach((signal2) => signal2.addEventListener("abort", onabort));
    const { signal } = controller;
    signal.unsubscribe = () => utils$1.asap(unsubscribe);
    return signal;
  }
};
var streamChunk = function* (chunk, chunkSize) {
  let len = chunk.byteLength;
  if (len < chunkSize) {
    yield chunk;
    return;
  }
  let pos = 0;
  let end;
  while (pos < len) {
    end = pos + chunkSize;
    yield chunk.slice(pos, end);
    pos = end;
  }
};
var readBytes = async function* (iterable, chunkSize) {
  for await (const chunk of readStream(iterable)) {
    yield* streamChunk(chunk, chunkSize);
  }
};
var readStream = async function* (stream4) {
  if (stream4[Symbol.asyncIterator]) {
    yield* stream4;
    return;
  }
  const reader = stream4.getReader();
  try {
    for (; ; ) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      yield value;
    }
  } finally {
    await reader.cancel();
  }
};
var trackStream = (stream4, chunkSize, onProgress, onFinish) => {
  const iterator2 = readBytes(stream4, chunkSize);
  let bytes = 0;
  let done;
  let _onFinish = (e) => {
    if (!done) {
      done = true;
      onFinish && onFinish(e);
    }
  };
  return new ReadableStream({
    async pull(controller) {
      try {
        const { done: done2, value } = await iterator2.next();
        if (done2) {
          _onFinish();
          controller.close();
          return;
        }
        let len = value.byteLength;
        if (onProgress) {
          let loadedBytes = bytes += len;
          onProgress(loadedBytes);
        }
        controller.enqueue(new Uint8Array(value));
      } catch (err) {
        _onFinish(err);
        throw err;
      }
    },
    cancel(reason) {
      _onFinish(reason);
      return iterator2.return();
    }
  }, {
    highWaterMark: 2
  });
};
var isFetchSupported = typeof fetch === "function" && typeof Request === "function" && typeof Response === "function";
var isReadableStreamSupported = isFetchSupported && typeof ReadableStream === "function";
var encodeText = isFetchSupported && (typeof TextEncoder === "function" ? /* @__PURE__ */ ((encoder) => (str) => encoder.encode(str))(new TextEncoder()) : async (str) => new Uint8Array(await new Response(str).arrayBuffer()));
var test = (fn, ...args) => {
  try {
    return !!fn(...args);
  } catch (e) {
    return false;
  }
};
var supportsRequestStream = isReadableStreamSupported && test(() => {
  let duplexAccessed = false;
  const hasContentType = new Request(platform.origin, {
    body: new ReadableStream(),
    method: "POST",
    get duplex() {
      duplexAccessed = true;
      return "half";
    }
  }).headers.has("Content-Type");
  return duplexAccessed && !hasContentType;
});
var DEFAULT_CHUNK_SIZE = 64 * 1024;
var supportsResponseStream = isReadableStreamSupported && test(() => utils$1.isReadableStream(new Response("").body));
var resolvers = {
  stream: supportsResponseStream && ((res) => res.body)
};
isFetchSupported && ((res) => {
  ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((type) => {
    !resolvers[type] && (resolvers[type] = utils$1.isFunction(res[type]) ? (res2) => res2[type]() : (_, config) => {
      throw new AxiosError$2(`Response type '${type}' is not supported`, AxiosError$2.ERR_NOT_SUPPORT, config);
    });
  });
})(new Response());
var getBodyLength = async (body) => {
  if (body == null) {
    return 0;
  }
  if (utils$1.isBlob(body)) {
    return body.size;
  }
  if (utils$1.isSpecCompliantForm(body)) {
    const _request = new Request(platform.origin, {
      method: "POST",
      body
    });
    return (await _request.arrayBuffer()).byteLength;
  }
  if (utils$1.isArrayBufferView(body) || utils$1.isArrayBuffer(body)) {
    return body.byteLength;
  }
  if (utils$1.isURLSearchParams(body)) {
    body = body + "";
  }
  if (utils$1.isString(body)) {
    return (await encodeText(body)).byteLength;
  }
};
var resolveBodyLength = async (headers2, body) => {
  const length = utils$1.toFiniteNumber(headers2.getContentLength());
  return length == null ? getBodyLength(body) : length;
};
var fetchAdapter = isFetchSupported && (async (config) => {
  let {
    url: url2,
    method,
    data: data2,
    signal,
    cancelToken,
    timeout,
    onDownloadProgress,
    onUploadProgress,
    responseType,
    headers: headers2,
    withCredentials = "same-origin",
    fetchOptions
  } = resolveConfig(config);
  responseType = responseType ? (responseType + "").toLowerCase() : "text";
  let composedSignal = composeSignals([signal, cancelToken && cancelToken.toAbortSignal()], timeout);
  let request;
  const unsubscribe = composedSignal && composedSignal.unsubscribe && (() => {
    composedSignal.unsubscribe();
  });
  let requestContentLength;
  try {
    if (onUploadProgress && supportsRequestStream && method !== "get" && method !== "head" && (requestContentLength = await resolveBodyLength(headers2, data2)) !== 0) {
      let _request = new Request(url2, {
        method: "POST",
        body: data2,
        duplex: "half"
      });
      let contentTypeHeader;
      if (utils$1.isFormData(data2) && (contentTypeHeader = _request.headers.get("content-type"))) {
        headers2.setContentType(contentTypeHeader);
      }
      if (_request.body) {
        const [onProgress, flush] = progressEventDecorator(
          requestContentLength,
          progressEventReducer(asyncDecorator(onUploadProgress))
        );
        data2 = trackStream(_request.body, DEFAULT_CHUNK_SIZE, onProgress, flush);
      }
    }
    if (!utils$1.isString(withCredentials)) {
      withCredentials = withCredentials ? "include" : "omit";
    }
    const isCredentialsSupported = "credentials" in Request.prototype;
    request = new Request(url2, {
      ...fetchOptions,
      signal: composedSignal,
      method: method.toUpperCase(),
      headers: headers2.normalize().toJSON(),
      body: data2,
      duplex: "half",
      credentials: isCredentialsSupported ? withCredentials : void 0
    });
    let response = await fetch(request);
    const isStreamResponse = supportsResponseStream && (responseType === "stream" || responseType === "response");
    if (supportsResponseStream && (onDownloadProgress || isStreamResponse && unsubscribe)) {
      const options = {};
      ["status", "statusText", "headers"].forEach((prop) => {
        options[prop] = response[prop];
      });
      const responseContentLength = utils$1.toFiniteNumber(response.headers.get("content-length"));
      const [onProgress, flush] = onDownloadProgress && progressEventDecorator(
        responseContentLength,
        progressEventReducer(asyncDecorator(onDownloadProgress), true)
      ) || [];
      response = new Response(
        trackStream(response.body, DEFAULT_CHUNK_SIZE, onProgress, () => {
          flush && flush();
          unsubscribe && unsubscribe();
        }),
        options
      );
    }
    responseType = responseType || "text";
    let responseData = await resolvers[utils$1.findKey(resolvers, responseType) || "text"](response, config);
    !isStreamResponse && unsubscribe && unsubscribe();
    return await new Promise((resolve, reject) => {
      settle(resolve, reject, {
        data: responseData,
        headers: AxiosHeaders$2.from(response.headers),
        status: response.status,
        statusText: response.statusText,
        config,
        request
      });
    });
  } catch (err) {
    unsubscribe && unsubscribe();
    if (err && err.name === "TypeError" && /fetch/i.test(err.message)) {
      throw Object.assign(
        new AxiosError$2("Network Error", AxiosError$2.ERR_NETWORK, config, request),
        {
          cause: err.cause || err
        }
      );
    }
    throw AxiosError$2.from(err, err && err.code, config, request);
  }
});
var knownAdapters = {
  http: httpAdapter,
  xhr: xhrAdapter,
  fetch: fetchAdapter
};
utils$1.forEach(knownAdapters, (fn, value) => {
  if (fn) {
    try {
      Object.defineProperty(fn, "name", { value });
    } catch (e) {
    }
    Object.defineProperty(fn, "adapterName", { value });
  }
});
var renderReason = (reason) => `- ${reason}`;
var isResolvedHandle = (adapter) => utils$1.isFunction(adapter) || adapter === null || adapter === false;
var adapters = {
  getAdapter: (adapters22) => {
    adapters22 = utils$1.isArray(adapters22) ? adapters22 : [adapters22];
    const { length } = adapters22;
    let nameOrAdapter;
    let adapter;
    const rejectedReasons = {};
    for (let i = 0; i < length; i++) {
      nameOrAdapter = adapters22[i];
      let id;
      adapter = nameOrAdapter;
      if (!isResolvedHandle(nameOrAdapter)) {
        adapter = knownAdapters[(id = String(nameOrAdapter)).toLowerCase()];
        if (adapter === void 0) {
          throw new AxiosError$2(`Unknown adapter '${id}'`);
        }
      }
      if (adapter) {
        break;
      }
      rejectedReasons[id || "#" + i] = adapter;
    }
    if (!adapter) {
      const reasons = Object.entries(rejectedReasons).map(
        ([id, state]) => `adapter ${id} ` + (state === false ? "is not supported by the environment" : "is not available in the build")
      );
      let s = length ? reasons.length > 1 ? "since :\n" + reasons.map(renderReason).join("\n") : " " + renderReason(reasons[0]) : "as no adapter specified";
      throw new AxiosError$2(
        `There is no suitable adapter to dispatch the request ` + s,
        "ERR_NOT_SUPPORT"
      );
    }
    return adapter;
  },
  adapters: knownAdapters
};
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
  if (config.signal && config.signal.aborted) {
    throw new CanceledError$2(null, config);
  }
}
function dispatchRequest(config) {
  throwIfCancellationRequested(config);
  config.headers = AxiosHeaders$2.from(config.headers);
  config.data = transformData.call(
    config,
    config.transformRequest
  );
  if (["post", "put", "patch"].indexOf(config.method) !== -1) {
    config.headers.setContentType("application/x-www-form-urlencoded", false);
  }
  const adapter = adapters.getAdapter(config.adapter || defaults.adapter);
  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);
    response.data = transformData.call(
      config,
      config.transformResponse,
      response
    );
    response.headers = AxiosHeaders$2.from(response.headers);
    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel$2(reason)) {
      throwIfCancellationRequested(config);
      if (reason && reason.response) {
        reason.response.data = transformData.call(
          config,
          config.transformResponse,
          reason.response
        );
        reason.response.headers = AxiosHeaders$2.from(reason.response.headers);
      }
    }
    return Promise.reject(reason);
  });
}
var VERSION$2 = "1.8.4";
var validators$1 = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((type, i) => {
  validators$1[type] = function validator2(thing) {
    return typeof thing === type || "a" + (i < 1 ? "n " : " ") + type;
  };
});
var deprecatedWarnings = {};
validators$1.transitional = function transitional(validator2, version, message) {
  function formatMessage(opt, desc) {
    return "[Axios v" + VERSION$2 + "] Transitional option '" + opt + "'" + desc + (message ? ". " + message : "");
  }
  return (value, opt, opts) => {
    if (validator2 === false) {
      throw new AxiosError$2(
        formatMessage(opt, " has been removed" + (version ? " in " + version : "")),
        AxiosError$2.ERR_DEPRECATED
      );
    }
    if (version && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      console.warn(
        formatMessage(
          opt,
          " has been deprecated since v" + version + " and will be removed in the near future"
        )
      );
    }
    return validator2 ? validator2(value, opt, opts) : true;
  };
};
validators$1.spelling = function spelling(correctSpelling) {
  return (value, opt) => {
    console.warn(`${opt} is likely a misspelling of ${correctSpelling}`);
    return true;
  };
};
function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== "object") {
    throw new AxiosError$2("options must be an object", AxiosError$2.ERR_BAD_OPTION_VALUE);
  }
  const keys = Object.keys(options);
  let i = keys.length;
  while (i-- > 0) {
    const opt = keys[i];
    const validator2 = schema[opt];
    if (validator2) {
      const value = options[opt];
      const result = value === void 0 || validator2(value, opt, options);
      if (result !== true) {
        throw new AxiosError$2("option " + opt + " must be " + result, AxiosError$2.ERR_BAD_OPTION_VALUE);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw new AxiosError$2("Unknown option " + opt, AxiosError$2.ERR_BAD_OPTION);
    }
  }
}
var validator = {
  assertOptions,
  validators: validators$1
};
var validators = validator.validators;
var Axios$2 = class Axios {
  constructor(instanceConfig) {
    this.defaults = instanceConfig;
    this.interceptors = {
      request: new InterceptorManager(),
      response: new InterceptorManager()
    };
  }
  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  async request(configOrUrl, config) {
    try {
      return await this._request(configOrUrl, config);
    } catch (err) {
      if (err instanceof Error) {
        let dummy = {};
        Error.captureStackTrace ? Error.captureStackTrace(dummy) : dummy = new Error();
        const stack = dummy.stack ? dummy.stack.replace(/^.+\n/, "") : "";
        try {
          if (!err.stack) {
            err.stack = stack;
          } else if (stack && !String(err.stack).endsWith(stack.replace(/^.+\n.+\n/, ""))) {
            err.stack += "\n" + stack;
          }
        } catch (e) {
        }
      }
      throw err;
    }
  }
  _request(configOrUrl, config) {
    if (typeof configOrUrl === "string") {
      config = config || {};
      config.url = configOrUrl;
    } else {
      config = configOrUrl || {};
    }
    config = mergeConfig$2(this.defaults, config);
    const { transitional: transitional22, paramsSerializer, headers: headers2 } = config;
    if (transitional22 !== void 0) {
      validator.assertOptions(transitional22, {
        silentJSONParsing: validators.transitional(validators.boolean),
        forcedJSONParsing: validators.transitional(validators.boolean),
        clarifyTimeoutError: validators.transitional(validators.boolean)
      }, false);
    }
    if (paramsSerializer != null) {
      if (utils$1.isFunction(paramsSerializer)) {
        config.paramsSerializer = {
          serialize: paramsSerializer
        };
      } else {
        validator.assertOptions(paramsSerializer, {
          encode: validators.function,
          serialize: validators.function
        }, true);
      }
    }
    if (config.allowAbsoluteUrls !== void 0) ;
    else if (this.defaults.allowAbsoluteUrls !== void 0) {
      config.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls;
    } else {
      config.allowAbsoluteUrls = true;
    }
    validator.assertOptions(config, {
      baseUrl: validators.spelling("baseURL"),
      withXsrfToken: validators.spelling("withXSRFToken")
    }, true);
    config.method = (config.method || this.defaults.method || "get").toLowerCase();
    let contextHeaders = headers2 && utils$1.merge(
      headers2.common,
      headers2[config.method]
    );
    headers2 && utils$1.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (method) => {
        delete headers2[method];
      }
    );
    config.headers = AxiosHeaders$2.concat(contextHeaders, headers2);
    const requestInterceptorChain = [];
    let synchronousRequestInterceptors = true;
    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
      if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config) === false) {
        return;
      }
      synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
      requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
    });
    const responseInterceptorChain = [];
    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
      responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
    });
    let promise;
    let i = 0;
    let len;
    if (!synchronousRequestInterceptors) {
      const chain = [dispatchRequest.bind(this), void 0];
      chain.unshift.apply(chain, requestInterceptorChain);
      chain.push.apply(chain, responseInterceptorChain);
      len = chain.length;
      promise = Promise.resolve(config);
      while (i < len) {
        promise = promise.then(chain[i++], chain[i++]);
      }
      return promise;
    }
    len = requestInterceptorChain.length;
    let newConfig = config;
    i = 0;
    while (i < len) {
      const onFulfilled = requestInterceptorChain[i++];
      const onRejected = requestInterceptorChain[i++];
      try {
        newConfig = onFulfilled(newConfig);
      } catch (error) {
        onRejected.call(this, error);
        break;
      }
    }
    try {
      promise = dispatchRequest.call(this, newConfig);
    } catch (error) {
      return Promise.reject(error);
    }
    i = 0;
    len = responseInterceptorChain.length;
    while (i < len) {
      promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
    }
    return promise;
  }
  getUri(config) {
    config = mergeConfig$2(this.defaults, config);
    const fullPath = buildFullPath(config.baseURL, config.url, config.allowAbsoluteUrls);
    return buildURL(fullPath, config.params, config.paramsSerializer);
  }
};
utils$1.forEach(["delete", "get", "head", "options"], function forEachMethodNoData(method) {
  Axios$2.prototype[method] = function(url2, config) {
    return this.request(mergeConfig$2(config || {}, {
      method,
      url: url2,
      data: (config || {}).data
    }));
  };
});
utils$1.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
  function generateHTTPMethod(isForm) {
    return function httpMethod(url2, data2, config) {
      return this.request(mergeConfig$2(config || {}, {
        method,
        headers: isForm ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: url2,
        data: data2
      }));
    };
  }
  Axios$2.prototype[method] = generateHTTPMethod();
  Axios$2.prototype[method + "Form"] = generateHTTPMethod(true);
});
var CancelToken$2 = class CancelToken {
  constructor(executor) {
    if (typeof executor !== "function") {
      throw new TypeError("executor must be a function.");
    }
    let resolvePromise;
    this.promise = new Promise(function promiseExecutor(resolve) {
      resolvePromise = resolve;
    });
    const token = this;
    this.promise.then((cancel) => {
      if (!token._listeners) return;
      let i = token._listeners.length;
      while (i-- > 0) {
        token._listeners[i](cancel);
      }
      token._listeners = null;
    });
    this.promise.then = (onfulfilled) => {
      let _resolve;
      const promise = new Promise((resolve) => {
        token.subscribe(resolve);
        _resolve = resolve;
      }).then(onfulfilled);
      promise.cancel = function reject() {
        token.unsubscribe(_resolve);
      };
      return promise;
    };
    executor(function cancel(message, config, request) {
      if (token.reason) {
        return;
      }
      token.reason = new CanceledError$2(message, config, request);
      resolvePromise(token.reason);
    });
  }
  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason) {
      throw this.reason;
    }
  }
  /**
   * Subscribe to the cancel signal
   */
  subscribe(listener) {
    if (this.reason) {
      listener(this.reason);
      return;
    }
    if (this._listeners) {
      this._listeners.push(listener);
    } else {
      this._listeners = [listener];
    }
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(listener) {
    if (!this._listeners) {
      return;
    }
    const index = this._listeners.indexOf(listener);
    if (index !== -1) {
      this._listeners.splice(index, 1);
    }
  }
  toAbortSignal() {
    const controller = new AbortController();
    const abort = (err) => {
      controller.abort(err);
    };
    this.subscribe(abort);
    controller.signal.unsubscribe = () => this.unsubscribe(abort);
    return controller.signal;
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let cancel;
    const token = new CancelToken(function executor(c) {
      cancel = c;
    });
    return {
      token,
      cancel
    };
  }
};
function spread$2(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
}
function isAxiosError$2(payload) {
  return utils$1.isObject(payload) && payload.isAxiosError === true;
}
var HttpStatusCode$2 = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511
};
Object.entries(HttpStatusCode$2).forEach(([key, value]) => {
  HttpStatusCode$2[value] = key;
});
function createInstance(defaultConfig) {
  const context = new Axios$2(defaultConfig);
  const instance = bind(Axios$2.prototype.request, context);
  utils$1.extend(instance, Axios$2.prototype, context, { allOwnKeys: true });
  utils$1.extend(instance, context, null, { allOwnKeys: true });
  instance.create = function create(instanceConfig) {
    return createInstance(mergeConfig$2(defaultConfig, instanceConfig));
  };
  return instance;
}
var axios = createInstance(defaults);
axios.Axios = Axios$2;
axios.CanceledError = CanceledError$2;
axios.CancelToken = CancelToken$2;
axios.isCancel = isCancel$2;
axios.VERSION = VERSION$2;
axios.toFormData = toFormData$2;
axios.AxiosError = AxiosError$2;
axios.Cancel = axios.CanceledError;
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = spread$2;
axios.isAxiosError = isAxiosError$2;
axios.mergeConfig = mergeConfig$2;
axios.AxiosHeaders = AxiosHeaders$2;
axios.formToJSON = (thing) => formDataToJSON(utils$1.isHTMLForm(thing) ? new FormData(thing) : thing);
axios.getAdapter = adapters.getAdapter;
axios.HttpStatusCode = HttpStatusCode$2;
axios.default = axios;
var {
  Axios: Axios$1,
  AxiosError: AxiosError$1,
  CanceledError: CanceledError$1,
  isCancel: isCancel$1,
  CancelToken: CancelToken$1,
  VERSION: VERSION$1,
  all: all$1,
  Cancel: Cancel$1,
  isAxiosError: isAxiosError$1,
  spread: spread$1,
  toFormData: toFormData$1,
  AxiosHeaders: AxiosHeaders$1,
  HttpStatusCode: HttpStatusCode$1,
  formToJSON: formToJSON$1,
  getAdapter: getAdapter$1,
  mergeConfig: mergeConfig$1
} = axios;
var {
  Axios: Axios2,
  AxiosError,
  CanceledError,
  isCancel,
  CancelToken: CancelToken2,
  VERSION,
  all: all2,
  Cancel,
  isAxiosError,
  spread,
  toFormData,
  AxiosHeaders: AxiosHeaders2,
  HttpStatusCode,
  formToJSON,
  getAdapter,
  mergeConfig
} = axios;

// node_modules/.pnpm/@ikenxuan+amagi@4.4.9/node_modules/@ikenxuan/amagi/dist/default/esm/index.mjs
var import_chalk = __toESM(require_source(), 1);

// node_modules/.pnpm/@karinjs+log4js@1.1.4/node_modules/@karinjs/log4js/index.js
init_esm_shims();

// node_modules/.pnpm/@karinjs+log4js@1.1.4/node_modules/@karinjs/log4js/dist/log4js.js
init_esm_shims();
function _mergeNamespaces(n, m) {
  for (var i = 0; i < m.length; i++) {
    const e = m[i];
    if (typeof e !== "string" && !Array.isArray(e)) {
      for (const k in e) {
        if (k !== "default" && !(k in n)) {
          const d = Object.getOwnPropertyDescriptor(e, k);
          if (d) {
            Object.defineProperty(n, k, d.get ? d : {
              enumerable: true,
              get: () => e[k]
            });
          }
        }
      }
    }
  }
  return Object.freeze(Object.defineProperty(n, Symbol.toStringTag, { value: "Module" }));
}
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
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
      function debug(...args) {
        if (!debug.enabled) {
          return;
        }
        const self2 = debug;
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
        let index = 0;
        args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
          if (match === "%%") {
            return "%";
          }
          index++;
          const formatter = createDebug.formatters[format];
          if (typeof formatter === "function") {
            const val = args[index];
            match = formatter.call(self2, val);
            args.splice(index, 1);
            index--;
          }
          return match;
        });
        createDebug.formatArgs.call(self2, args);
        const logFn = self2.log || createDebug.log;
        logFn.apply(self2, args);
      }
      debug.namespace = namespace;
      debug.useColors = createDebug.useColors();
      debug.color = createDebug.selectColor(namespace);
      debug.extend = extend3;
      debug.destroy = createDebug.destroy;
      Object.defineProperty(debug, "enabled", {
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
        createDebug.init(debug);
      }
      return debug;
    }
    function extend3(namespace, delimiter) {
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
      let index = 0;
      let lastC = 0;
      args[0].replace(/%[a-zA-Z%]/g, (match) => {
        if (match === "%%") {
          return;
        }
        index++;
        if (match === "%c") {
          lastC = index;
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
var rfdc_1;
var hasRequiredRfdc;
function requireRfdc() {
  if (hasRequiredRfdc) return rfdc_1;
  hasRequiredRfdc = 1;
  rfdc_1 = rfdc;
  function copyBuffer(cur) {
    if (cur instanceof Buffer) {
      return Buffer.from(cur);
    }
    return new cur.constructor(cur.buffer.slice(), cur.byteOffset, cur.length);
  }
  function rfdc(opts) {
    opts = opts || {};
    if (opts.circles) return rfdcCircles(opts);
    const constructorHandlers = /* @__PURE__ */ new Map();
    constructorHandlers.set(Date, (o) => new Date(o));
    constructorHandlers.set(Map, (o, fn) => new Map(cloneArray(Array.from(o), fn)));
    constructorHandlers.set(Set, (o, fn) => new Set(cloneArray(Array.from(o), fn)));
    if (opts.constructorHandlers) {
      for (const handler2 of opts.constructorHandlers) {
        constructorHandlers.set(handler2[0], handler2[1]);
      }
    }
    let handler = null;
    return opts.proto ? cloneProto : clone;
    function cloneArray(a, fn) {
      const keys = Object.keys(a);
      const a2 = new Array(keys.length);
      for (let i = 0; i < keys.length; i++) {
        const k = keys[i];
        const cur = a[k];
        if (typeof cur !== "object" || cur === null) {
          a2[k] = cur;
        } else if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) {
          a2[k] = handler(cur, fn);
        } else if (ArrayBuffer.isView(cur)) {
          a2[k] = copyBuffer(cur);
        } else {
          a2[k] = fn(cur);
        }
      }
      return a2;
    }
    function clone(o) {
      if (typeof o !== "object" || o === null) return o;
      if (Array.isArray(o)) return cloneArray(o, clone);
      if (o.constructor !== Object && (handler = constructorHandlers.get(o.constructor))) {
        return handler(o, clone);
      }
      const o2 = {};
      for (const k in o) {
        if (Object.hasOwnProperty.call(o, k) === false) continue;
        const cur = o[k];
        if (typeof cur !== "object" || cur === null) {
          o2[k] = cur;
        } else if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) {
          o2[k] = handler(cur, clone);
        } else if (ArrayBuffer.isView(cur)) {
          o2[k] = copyBuffer(cur);
        } else {
          o2[k] = clone(cur);
        }
      }
      return o2;
    }
    function cloneProto(o) {
      if (typeof o !== "object" || o === null) return o;
      if (Array.isArray(o)) return cloneArray(o, cloneProto);
      if (o.constructor !== Object && (handler = constructorHandlers.get(o.constructor))) {
        return handler(o, cloneProto);
      }
      const o2 = {};
      for (const k in o) {
        const cur = o[k];
        if (typeof cur !== "object" || cur === null) {
          o2[k] = cur;
        } else if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) {
          o2[k] = handler(cur, cloneProto);
        } else if (ArrayBuffer.isView(cur)) {
          o2[k] = copyBuffer(cur);
        } else {
          o2[k] = cloneProto(cur);
        }
      }
      return o2;
    }
  }
  function rfdcCircles(opts) {
    const refs = [];
    const refsNew = [];
    const constructorHandlers = /* @__PURE__ */ new Map();
    constructorHandlers.set(Date, (o) => new Date(o));
    constructorHandlers.set(Map, (o, fn) => new Map(cloneArray(Array.from(o), fn)));
    constructorHandlers.set(Set, (o, fn) => new Set(cloneArray(Array.from(o), fn)));
    if (opts.constructorHandlers) {
      for (const handler2 of opts.constructorHandlers) {
        constructorHandlers.set(handler2[0], handler2[1]);
      }
    }
    let handler = null;
    return opts.proto ? cloneProto : clone;
    function cloneArray(a, fn) {
      const keys = Object.keys(a);
      const a2 = new Array(keys.length);
      for (let i = 0; i < keys.length; i++) {
        const k = keys[i];
        const cur = a[k];
        if (typeof cur !== "object" || cur === null) {
          a2[k] = cur;
        } else if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) {
          a2[k] = handler(cur, fn);
        } else if (ArrayBuffer.isView(cur)) {
          a2[k] = copyBuffer(cur);
        } else {
          const index = refs.indexOf(cur);
          if (index !== -1) {
            a2[k] = refsNew[index];
          } else {
            a2[k] = fn(cur);
          }
        }
      }
      return a2;
    }
    function clone(o) {
      if (typeof o !== "object" || o === null) return o;
      if (Array.isArray(o)) return cloneArray(o, clone);
      if (o.constructor !== Object && (handler = constructorHandlers.get(o.constructor))) {
        return handler(o, clone);
      }
      const o2 = {};
      refs.push(o);
      refsNew.push(o2);
      for (const k in o) {
        if (Object.hasOwnProperty.call(o, k) === false) continue;
        const cur = o[k];
        if (typeof cur !== "object" || cur === null) {
          o2[k] = cur;
        } else if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) {
          o2[k] = handler(cur, clone);
        } else if (ArrayBuffer.isView(cur)) {
          o2[k] = copyBuffer(cur);
        } else {
          const i = refs.indexOf(cur);
          if (i !== -1) {
            o2[k] = refsNew[i];
          } else {
            o2[k] = clone(cur);
          }
        }
      }
      refs.pop();
      refsNew.pop();
      return o2;
    }
    function cloneProto(o) {
      if (typeof o !== "object" || o === null) return o;
      if (Array.isArray(o)) return cloneArray(o, cloneProto);
      if (o.constructor !== Object && (handler = constructorHandlers.get(o.constructor))) {
        return handler(o, cloneProto);
      }
      const o2 = {};
      refs.push(o);
      refsNew.push(o2);
      for (const k in o) {
        const cur = o[k];
        if (typeof cur !== "object" || cur === null) {
          o2[k] = cur;
        } else if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) {
          o2[k] = handler(cur, cloneProto);
        } else if (ArrayBuffer.isView(cur)) {
          o2[k] = copyBuffer(cur);
        } else {
          const i = refs.indexOf(cur);
          if (i !== -1) {
            o2[k] = refsNew[i];
          } else {
            o2[k] = cloneProto(cur);
          }
        }
      }
      refs.pop();
      refsNew.pop();
      return o2;
    }
  }
  return rfdc_1;
}
var configuration;
var hasRequiredConfiguration;
function requireConfiguration() {
  if (hasRequiredConfiguration) return configuration;
  hasRequiredConfiguration = 1;
  const util3 = require$$0;
  const debug = requireBrowser()("log4js:configuration");
  const preProcessingListeners = [];
  const listeners = [];
  const not = (thing) => !thing;
  const anObject = (thing) => thing && typeof thing === "object" && !Array.isArray(thing);
  const validIdentifier = (thing) => /^[A-Za-z][A-Za-z0-9_]*$/g.test(thing);
  const anInteger = (thing) => thing && typeof thing === "number" && Number.isInteger(thing);
  const addListener = (fn) => {
    listeners.push(fn);
    debug(`Added listener, now ${listeners.length} listeners`);
  };
  const addPreProcessingListener = (fn) => {
    preProcessingListeners.push(fn);
    debug(
      `Added pre-processing listener, now ${preProcessingListeners.length} listeners`
    );
  };
  const throwExceptionIf = (config, checks, message) => {
    const tests = Array.isArray(checks) ? checks : [checks];
    tests.forEach((test3) => {
      if (test3) {
        throw new Error(
          `Problem with log4js configuration: (${util3.inspect(config, {
            depth: 5
          })}) - ${message}`
        );
      }
    });
  };
  const configure2 = (candidate) => {
    debug("New configuration to be validated: ", candidate);
    throwExceptionIf(candidate, not(anObject(candidate)), "must be an object.");
    debug(`Calling pre-processing listeners (${preProcessingListeners.length})`);
    preProcessingListeners.forEach((listener) => listener(candidate));
    debug("Configuration pre-processing finished.");
    debug(`Calling configuration listeners (${listeners.length})`);
    listeners.forEach((listener) => listener(candidate));
    debug("Configuration finished.");
  };
  configuration = {
    configure: configure2,
    addListener,
    addPreProcessingListener,
    throwExceptionIf,
    anObject,
    anInteger,
    validIdentifier,
    not
  };
  return configuration;
}
var lib$2 = { exports: {} };
var hasRequiredLib$2;
function requireLib$2() {
  if (hasRequiredLib$2) return lib$2.exports;
  hasRequiredLib$2 = 1;
  (function(module) {
    function padWithZeros(vNumber, width) {
      var numAsString = vNumber.toString();
      while (numAsString.length < width) {
        numAsString = "0" + numAsString;
      }
      return numAsString;
    }
    function addZero(vNumber) {
      return padWithZeros(vNumber, 2);
    }
    function offset(timezoneOffset) {
      var os = Math.abs(timezoneOffset);
      var h = String(Math.floor(os / 60));
      var m = String(os % 60);
      h = ("0" + h).slice(-2);
      m = ("0" + m).slice(-2);
      return timezoneOffset === 0 ? "Z" : (timezoneOffset < 0 ? "+" : "-") + h + ":" + m;
    }
    function asString(format, date) {
      if (typeof format !== "string") {
        date = format;
        format = module.exports.ISO8601_FORMAT;
      }
      if (!date) {
        date = module.exports.now();
      }
      var vDay = addZero(date.getDate());
      var vMonth = addZero(date.getMonth() + 1);
      var vYearLong = addZero(date.getFullYear());
      var vYearShort = addZero(vYearLong.substring(2, 4));
      var vYear = format.indexOf("yyyy") > -1 ? vYearLong : vYearShort;
      var vHour = addZero(date.getHours());
      var vMinute = addZero(date.getMinutes());
      var vSecond = addZero(date.getSeconds());
      var vMillisecond = padWithZeros(date.getMilliseconds(), 3);
      var vTimeZone = offset(date.getTimezoneOffset());
      var formatted = format.replace(/dd/g, vDay).replace(/MM/g, vMonth).replace(/y{1,4}/g, vYear).replace(/hh/g, vHour).replace(/mm/g, vMinute).replace(/ss/g, vSecond).replace(/SSS/g, vMillisecond).replace(/O/g, vTimeZone);
      return formatted;
    }
    function setDatePart(date, part, value, local) {
      date["set" + (local ? "" : "UTC") + part](value);
    }
    function extractDateParts(pattern, str, missingValuesDate) {
      var local = pattern.indexOf("O") < 0;
      var monthOverflow = false;
      var matchers = [
        {
          pattern: /y{1,4}/,
          regexp: "\\d{1,4}",
          fn: function(date2, value) {
            setDatePart(date2, "FullYear", value, local);
          }
        },
        {
          pattern: /MM/,
          regexp: "\\d{1,2}",
          fn: function(date2, value) {
            setDatePart(date2, "Month", value - 1, local);
            if (date2.getMonth() !== value - 1) {
              monthOverflow = true;
            }
          }
        },
        {
          pattern: /dd/,
          regexp: "\\d{1,2}",
          fn: function(date2, value) {
            if (monthOverflow) {
              setDatePart(date2, "Month", date2.getMonth() - 1, local);
            }
            setDatePart(date2, "Date", value, local);
          }
        },
        {
          pattern: /hh/,
          regexp: "\\d{1,2}",
          fn: function(date2, value) {
            setDatePart(date2, "Hours", value, local);
          }
        },
        {
          pattern: /mm/,
          regexp: "\\d\\d",
          fn: function(date2, value) {
            setDatePart(date2, "Minutes", value, local);
          }
        },
        {
          pattern: /ss/,
          regexp: "\\d\\d",
          fn: function(date2, value) {
            setDatePart(date2, "Seconds", value, local);
          }
        },
        {
          pattern: /SSS/,
          regexp: "\\d\\d\\d",
          fn: function(date2, value) {
            setDatePart(date2, "Milliseconds", value, local);
          }
        },
        {
          pattern: /O/,
          regexp: "[+-]\\d{1,2}:?\\d{2}?|Z",
          fn: function(date2, value) {
            if (value === "Z") {
              value = 0;
            } else {
              value = value.replace(":", "");
            }
            var offset2 = Math.abs(value);
            var timezoneOffset = (value > 0 ? -1 : 1) * (offset2 % 100 + Math.floor(offset2 / 100) * 60);
            date2.setUTCMinutes(date2.getUTCMinutes() + timezoneOffset);
          }
        }
      ];
      var parsedPattern = matchers.reduce(
        function(p, m) {
          if (m.pattern.test(p.regexp)) {
            m.index = p.regexp.match(m.pattern).index;
            p.regexp = p.regexp.replace(m.pattern, "(" + m.regexp + ")");
          } else {
            m.index = -1;
          }
          return p;
        },
        { regexp: pattern, index: [] }
      );
      var dateFns = matchers.filter(function(m) {
        return m.index > -1;
      });
      dateFns.sort(function(a, b) {
        return a.index - b.index;
      });
      var matcher = new RegExp(parsedPattern.regexp);
      var matches = matcher.exec(str);
      if (matches) {
        var date = missingValuesDate || module.exports.now();
        dateFns.forEach(function(f, i) {
          f.fn(date, matches[i + 1]);
        });
        return date;
      }
      throw new Error(
        "String '" + str + "' could not be parsed as '" + pattern + "'"
      );
    }
    function parse(pattern, str, missingValuesDate) {
      if (!pattern) {
        throw new Error("pattern must be supplied");
      }
      return extractDateParts(pattern, str, missingValuesDate);
    }
    function now2() {
      return /* @__PURE__ */ new Date();
    }
    module.exports = asString;
    module.exports.asString = asString;
    module.exports.parse = parse;
    module.exports.now = now2;
    module.exports.ISO8601_FORMAT = "yyyy-MM-ddThh:mm:ss.SSS";
    module.exports.ISO8601_WITH_TZ_OFFSET_FORMAT = "yyyy-MM-ddThh:mm:ss.SSSO";
    module.exports.DATETIME_FORMAT = "dd MM yyyy hh:mm:ss.SSS";
    module.exports.ABSOLUTETIME_FORMAT = "hh:mm:ss.SSS";
  })(lib$2);
  return lib$2.exports;
}
var layouts;
var hasRequiredLayouts;
function requireLayouts() {
  if (hasRequiredLayouts) return layouts;
  hasRequiredLayouts = 1;
  const dateFormat = requireLib$2();
  const os = require$$1$1;
  const util3 = require$$0;
  const path3 = require$$1;
  const url2 = require$$4;
  const debug = requireBrowser()("log4js:layouts");
  const styles = {
    // styles
    bold: [1, 22],
    italic: [3, 23],
    underline: [4, 24],
    inverse: [7, 27],
    // grayscale
    white: [37, 39],
    grey: [90, 39],
    black: [90, 39],
    // colors
    blue: [34, 39],
    cyan: [36, 39],
    green: [32, 39],
    magenta: [35, 39],
    red: [91, 39],
    yellow: [33, 39]
  };
  function colorizeStart(style) {
    return style ? `\x1B[${styles[style][0]}m` : "";
  }
  function colorizeEnd(style) {
    return style ? `\x1B[${styles[style][1]}m` : "";
  }
  function colorize(str, style) {
    return colorizeStart(style) + str + colorizeEnd(style);
  }
  function timestampLevelAndCategory(loggingEvent, colour) {
    return colorize(
      util3.format(
        "[%s] [%s] %s - ",
        dateFormat.asString(loggingEvent.startTime),
        loggingEvent.level.toString(),
        loggingEvent.categoryName
      ),
      colour
    );
  }
  function basicLayout(loggingEvent) {
    return timestampLevelAndCategory(loggingEvent) + util3.format(...loggingEvent.data);
  }
  function colouredLayout(loggingEvent) {
    return timestampLevelAndCategory(loggingEvent, loggingEvent.level.colour) + util3.format(...loggingEvent.data);
  }
  function messagePassThroughLayout(loggingEvent) {
    return util3.format(...loggingEvent.data);
  }
  function dummyLayout(loggingEvent) {
    return loggingEvent.data[0];
  }
  function patternLayout(pattern, tokens) {
    const TTCC_CONVERSION_PATTERN = "%r %p %c - %m%n";
    const regex = /%(-?[0-9]+)?(\.?-?[0-9]+)?([[\]cdhmnprzxXyflosCMAF%])(\{([^}]+)\})?|([^%]+)/;
    pattern = pattern || TTCC_CONVERSION_PATTERN;
    function categoryName(loggingEvent, specifier) {
      let loggerName = loggingEvent.categoryName;
      if (specifier) {
        const precision = parseInt(specifier, 10);
        const loggerNameBits = loggerName.split(".");
        if (precision < loggerNameBits.length) {
          loggerName = loggerNameBits.slice(loggerNameBits.length - precision).join(".");
        }
      }
      return loggerName;
    }
    function formatAsDate(loggingEvent, specifier) {
      let format = dateFormat.ISO8601_FORMAT;
      if (specifier) {
        format = specifier;
        switch (format) {
          case "ISO8601":
          case "ISO8601_FORMAT":
            format = dateFormat.ISO8601_FORMAT;
            break;
          case "ISO8601_WITH_TZ_OFFSET":
          case "ISO8601_WITH_TZ_OFFSET_FORMAT":
            format = dateFormat.ISO8601_WITH_TZ_OFFSET_FORMAT;
            break;
          case "ABSOLUTE":
            process.emitWarning(
              "Pattern %d{ABSOLUTE} is deprecated in favor of %d{ABSOLUTETIME}. Please use %d{ABSOLUTETIME} instead.",
              "DeprecationWarning",
              "log4js-node-DEP0003"
            );
            debug(
              "[log4js-node-DEP0003]",
              "DEPRECATION: Pattern %d{ABSOLUTE} is deprecated and replaced by %d{ABSOLUTETIME}."
            );
          // falls through
          case "ABSOLUTETIME":
          case "ABSOLUTETIME_FORMAT":
            format = dateFormat.ABSOLUTETIME_FORMAT;
            break;
          case "DATE":
            process.emitWarning(
              "Pattern %d{DATE} is deprecated due to the confusion it causes when used. Please use %d{DATETIME} instead.",
              "DeprecationWarning",
              "log4js-node-DEP0004"
            );
            debug(
              "[log4js-node-DEP0004]",
              "DEPRECATION: Pattern %d{DATE} is deprecated and replaced by %d{DATETIME}."
            );
          // falls through
          case "DATETIME":
          case "DATETIME_FORMAT":
            format = dateFormat.DATETIME_FORMAT;
            break;
        }
      }
      return dateFormat.asString(format, loggingEvent.startTime);
    }
    function hostname() {
      return os.hostname().toString();
    }
    function formatMessage(loggingEvent, specifier) {
      let dataSlice = loggingEvent.data;
      if (specifier) {
        const [lowerBound, upperBound] = specifier.split(",");
        dataSlice = dataSlice.slice(lowerBound, upperBound);
      }
      return util3.format(...dataSlice);
    }
    function endOfLine() {
      return os.EOL;
    }
    function logLevel(loggingEvent) {
      return loggingEvent.level.toString();
    }
    function startTime(loggingEvent) {
      return dateFormat.asString("hh:mm:ss", loggingEvent.startTime);
    }
    function startColour(loggingEvent) {
      return colorizeStart(loggingEvent.level.colour);
    }
    function endColour(loggingEvent) {
      return colorizeEnd(loggingEvent.level.colour);
    }
    function percent() {
      return "%";
    }
    function pid(loggingEvent) {
      return loggingEvent && loggingEvent.pid ? loggingEvent.pid.toString() : process.pid.toString();
    }
    function clusterInfo() {
      return pid();
    }
    function userDefined(loggingEvent, specifier) {
      if (typeof tokens[specifier] !== "undefined") {
        return typeof tokens[specifier] === "function" ? tokens[specifier](loggingEvent) : tokens[specifier];
      }
      return null;
    }
    function contextDefined(loggingEvent, specifier) {
      const resolver = loggingEvent.context[specifier];
      if (typeof resolver !== "undefined") {
        return typeof resolver === "function" ? resolver(loggingEvent) : resolver;
      }
      return null;
    }
    function fileName(loggingEvent, specifier) {
      let filename = loggingEvent.fileName || "";
      const convertFileURLToPath = function(filepath) {
        const urlPrefix = "file://";
        if (filepath.startsWith(urlPrefix)) {
          if (typeof url2.fileURLToPath === "function") {
            filepath = url2.fileURLToPath(filepath);
          } else {
            filepath = path3.normalize(
              filepath.replace(new RegExp(`^${urlPrefix}`), "")
            );
            if (process.platform === "win32") {
              if (filepath.startsWith("\\")) {
                filepath = filepath.slice(1);
              } else {
                filepath = path3.sep + path3.sep + filepath;
              }
            }
          }
        }
        return filepath;
      };
      filename = convertFileURLToPath(filename);
      if (specifier) {
        const fileDepth = parseInt(specifier, 10);
        const fileList = filename.split(path3.sep);
        if (fileList.length > fileDepth) {
          filename = fileList.slice(-fileDepth).join(path3.sep);
        }
      }
      return filename;
    }
    function lineNumber(loggingEvent) {
      return loggingEvent.lineNumber ? `${loggingEvent.lineNumber}` : "";
    }
    function columnNumber(loggingEvent) {
      return loggingEvent.columnNumber ? `${loggingEvent.columnNumber}` : "";
    }
    function callStack(loggingEvent) {
      return loggingEvent.callStack || "";
    }
    function className(loggingEvent) {
      return loggingEvent.className || "";
    }
    function functionName(loggingEvent) {
      return loggingEvent.functionName || "";
    }
    function functionAlias(loggingEvent) {
      return loggingEvent.functionAlias || "";
    }
    function callerName(loggingEvent) {
      return loggingEvent.callerName || "";
    }
    const replacers = {
      c: categoryName,
      d: formatAsDate,
      h: hostname,
      m: formatMessage,
      n: endOfLine,
      p: logLevel,
      r: startTime,
      "[": startColour,
      "]": endColour,
      y: clusterInfo,
      z: pid,
      "%": percent,
      x: userDefined,
      X: contextDefined,
      f: fileName,
      l: lineNumber,
      o: columnNumber,
      s: callStack,
      C: className,
      M: functionName,
      A: functionAlias,
      F: callerName
    };
    function replaceToken(conversionCharacter, loggingEvent, specifier) {
      return replacers[conversionCharacter](loggingEvent, specifier);
    }
    function truncate(truncation, toTruncate) {
      let len;
      if (truncation) {
        len = parseInt(truncation.slice(1), 10);
        return len > 0 ? toTruncate.slice(0, len) : toTruncate.slice(len);
      }
      return toTruncate;
    }
    function pad(padding, toPad) {
      let len;
      if (padding) {
        if (padding.charAt(0) === "-") {
          len = parseInt(padding.slice(1), 10);
          while (toPad.length < len) {
            toPad += " ";
          }
        } else {
          len = parseInt(padding, 10);
          while (toPad.length < len) {
            toPad = ` ${toPad}`;
          }
        }
      }
      return toPad;
    }
    function truncateAndPad(toTruncAndPad, truncation, padding) {
      let replacement = toTruncAndPad;
      replacement = truncate(truncation, replacement);
      replacement = pad(padding, replacement);
      return replacement;
    }
    return function(loggingEvent) {
      let formattedString = "";
      let result;
      let searchString = pattern;
      while ((result = regex.exec(searchString)) !== null) {
        const padding = result[1];
        const truncation = result[2];
        const conversionCharacter = result[3];
        const specifier = result[5];
        const text = result[6];
        if (text) {
          formattedString += text.toString();
        } else {
          const replacement = replaceToken(
            conversionCharacter,
            loggingEvent,
            specifier
          );
          formattedString += truncateAndPad(replacement, truncation, padding);
        }
        searchString = searchString.slice(result.index + result[0].length);
      }
      return formattedString;
    };
  }
  const layoutMakers = {
    messagePassThrough() {
      return messagePassThroughLayout;
    },
    basic() {
      return basicLayout;
    },
    colored() {
      return colouredLayout;
    },
    coloured() {
      return colouredLayout;
    },
    pattern(config) {
      return patternLayout(config && config.pattern, config && config.tokens);
    },
    dummy() {
      return dummyLayout;
    }
  };
  layouts = {
    basicLayout,
    messagePassThroughLayout,
    patternLayout,
    colouredLayout,
    coloredLayout: colouredLayout,
    dummyLayout,
    addLayout(name, serializerGenerator) {
      layoutMakers[name] = serializerGenerator;
    },
    layout(name, config) {
      return layoutMakers[name] && layoutMakers[name](config);
    }
  };
  return layouts;
}
var levels;
var hasRequiredLevels;
function requireLevels() {
  if (hasRequiredLevels) return levels;
  hasRequiredLevels = 1;
  const configuration2 = requireConfiguration();
  const validColours = [
    "white",
    "grey",
    "black",
    "blue",
    "cyan",
    "green",
    "magenta",
    "red",
    "yellow"
  ];
  class Level {
    constructor(level, levelStr, colour) {
      this.level = level;
      this.levelStr = levelStr;
      this.colour = colour;
    }
    toString() {
      return this.levelStr;
    }
    /**
     * converts given String to corresponding Level
     * @param {(Level|string)} sArg -- String value of Level OR Log4js.Level
     * @param {Level} [defaultLevel] -- default Level, if no String representation
     * @return {Level}
     */
    static getLevel(sArg, defaultLevel) {
      if (!sArg) {
        return defaultLevel;
      }
      if (sArg instanceof Level) {
        return sArg;
      }
      if (sArg instanceof Object && sArg.levelStr) {
        sArg = sArg.levelStr;
      }
      return Level[sArg.toString().toUpperCase()] || defaultLevel;
    }
    static addLevels(customLevels) {
      if (customLevels) {
        const levels2 = Object.keys(customLevels);
        levels2.forEach((l) => {
          const levelStr = l.toUpperCase();
          Level[levelStr] = new Level(
            customLevels[l].value,
            levelStr,
            customLevels[l].colour
          );
          const existingLevelIndex = Level.levels.findIndex(
            (lvl) => lvl.levelStr === levelStr
          );
          if (existingLevelIndex > -1) {
            Level.levels[existingLevelIndex] = Level[levelStr];
          } else {
            Level.levels.push(Level[levelStr]);
          }
        });
        Level.levels.sort((a, b) => a.level - b.level);
      }
    }
    isLessThanOrEqualTo(otherLevel) {
      if (typeof otherLevel === "string") {
        otherLevel = Level.getLevel(otherLevel);
      }
      return this.level <= otherLevel.level;
    }
    isGreaterThanOrEqualTo(otherLevel) {
      if (typeof otherLevel === "string") {
        otherLevel = Level.getLevel(otherLevel);
      }
      return this.level >= otherLevel.level;
    }
    isEqualTo(otherLevel) {
      if (typeof otherLevel === "string") {
        otherLevel = Level.getLevel(otherLevel);
      }
      return this.level === otherLevel.level;
    }
  }
  Level.levels = [];
  Level.addLevels({
    ALL: { value: Number.MIN_VALUE, colour: "grey" },
    TRACE: { value: 5e3, colour: "blue" },
    DEBUG: { value: 1e4, colour: "cyan" },
    INFO: { value: 2e4, colour: "green" },
    WARN: { value: 3e4, colour: "yellow" },
    ERROR: { value: 4e4, colour: "red" },
    FATAL: { value: 5e4, colour: "magenta" },
    MARK: { value: 9007199254740992, colour: "grey" },
    // 2^53
    OFF: { value: Number.MAX_VALUE, colour: "grey" }
  });
  configuration2.addListener((config) => {
    const levelConfig = config.levels;
    if (levelConfig) {
      configuration2.throwExceptionIf(
        config,
        configuration2.not(configuration2.anObject(levelConfig)),
        "levels must be an object"
      );
      const newLevels = Object.keys(levelConfig);
      newLevels.forEach((l) => {
        configuration2.throwExceptionIf(
          config,
          configuration2.not(configuration2.validIdentifier(l)),
          `level name "${l}" is not a valid identifier (must start with a letter, only contain A-Z,a-z,0-9,_)`
        );
        configuration2.throwExceptionIf(
          config,
          configuration2.not(configuration2.anObject(levelConfig[l])),
          `level "${l}" must be an object`
        );
        configuration2.throwExceptionIf(
          config,
          configuration2.not(levelConfig[l].value),
          `level "${l}" must have a 'value' property`
        );
        configuration2.throwExceptionIf(
          config,
          configuration2.not(configuration2.anInteger(levelConfig[l].value)),
          `level "${l}".value must have an integer value`
        );
        configuration2.throwExceptionIf(
          config,
          configuration2.not(levelConfig[l].colour),
          `level "${l}" must have a 'colour' property`
        );
        configuration2.throwExceptionIf(
          config,
          configuration2.not(validColours.indexOf(levelConfig[l].colour) > -1),
          `level "${l}".colour must be one of ${validColours.join(", ")}`
        );
      });
    }
  });
  configuration2.addListener((config) => {
    Level.addLevels(config.levels);
  });
  levels = Level;
  return levels;
}
function commonjsRequire(path3) {
  throw new Error('Could not dynamically require "' + path3 + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var appenders = { exports: {} };
var cjs = {};
var hasRequiredCjs;
function requireCjs() {
  if (hasRequiredCjs) return cjs;
  hasRequiredCjs = 1;
  const { parse: $parse, stringify: $stringify } = JSON;
  const { keys } = Object;
  const Primitive = String;
  const primitive = "string";
  const ignore = {};
  const object = "object";
  const noop3 = (_, value) => value;
  const primitives = (value) => value instanceof Primitive ? Primitive(value) : value;
  const Primitives = (_, value) => typeof value === primitive ? new Primitive(value) : value;
  const revive = (input, parsed, output2, $) => {
    const lazy = [];
    for (let ke = keys(output2), { length } = ke, y = 0; y < length; y++) {
      const k = ke[y];
      const value = output2[k];
      if (value instanceof Primitive) {
        const tmp = input[value];
        if (typeof tmp === object && !parsed.has(tmp)) {
          parsed.add(tmp);
          output2[k] = ignore;
          lazy.push({ k, a: [input, parsed, tmp, $] });
        } else
          output2[k] = $.call(output2, k, tmp);
      } else if (output2[k] !== ignore)
        output2[k] = $.call(output2, k, value);
    }
    for (let { length } = lazy, i = 0; i < length; i++) {
      const { k, a } = lazy[i];
      output2[k] = $.call(output2, k, revive.apply(null, a));
    }
    return output2;
  };
  const set = (known, input, value) => {
    const index = Primitive(input.push(value) - 1);
    known.set(value, index);
    return index;
  };
  const parse = (text, reviver) => {
    const input = $parse(text, Primitives).map(primitives);
    const value = input[0];
    const $ = reviver || noop3;
    const tmp = typeof value === object && value ? revive(input, /* @__PURE__ */ new Set(), value, $) : value;
    return $.call({ "": tmp }, "", tmp);
  };
  cjs.parse = parse;
  const stringify = (value, replacer, space) => {
    const $ = replacer && typeof replacer === object ? (k, v) => k === "" || -1 < replacer.indexOf(k) ? v : void 0 : replacer || noop3;
    const known = /* @__PURE__ */ new Map();
    const input = [];
    const output2 = [];
    let i = +set(known, input, $.call({ "": value }, "", value));
    let firstRun = !i;
    while (i < input.length) {
      firstRun = true;
      output2[i] = $stringify(input[i++], replace, space);
    }
    return "[" + output2.join(",") + "]";
    function replace(key, value2) {
      if (firstRun) {
        firstRun = !firstRun;
        return value2;
      }
      const after = $.call(this, key, value2);
      switch (typeof after) {
        case object:
          if (after === null) return after;
        case primitive:
          return known.get(after) || set(known, input, after);
      }
      return after;
    }
  };
  cjs.stringify = stringify;
  const toJSON3 = (value) => $parse(stringify(value));
  cjs.toJSON = toJSON3;
  const fromJSON = (value) => parse($stringify(value));
  cjs.fromJSON = fromJSON;
  return cjs;
}
var LoggingEvent_1;
var hasRequiredLoggingEvent;
function requireLoggingEvent() {
  if (hasRequiredLoggingEvent) return LoggingEvent_1;
  hasRequiredLoggingEvent = 1;
  const flatted = requireCjs();
  const levels2 = requireLevels();
  class SerDe {
    constructor() {
      const deserialise = {
        __LOG4JS_undefined__: void 0,
        __LOG4JS_NaN__: Number("abc"),
        __LOG4JS_Infinity__: 1 / 0,
        "__LOG4JS_-Infinity__": -1 / 0
      };
      this.deMap = deserialise;
      this.serMap = {};
      Object.keys(this.deMap).forEach((key) => {
        const value = this.deMap[key];
        this.serMap[value] = key;
      });
    }
    canSerialise(key) {
      if (typeof key === "string") return false;
      return key in this.serMap;
    }
    serialise(key) {
      if (this.canSerialise(key)) return this.serMap[key];
      return key;
    }
    canDeserialise(key) {
      return key in this.deMap;
    }
    deserialise(key) {
      if (this.canDeserialise(key)) return this.deMap[key];
      return key;
    }
  }
  const serde = new SerDe();
  class LoggingEvent {
    /**
     * Models a logging event.
     * @constructor
     * @param {string} categoryName name of category
     * @param {Log4js.Level} level level of message
     * @param {Array} data objects to log
     * @param {Error} [error]
     * @author Seth Chisamore
     */
    constructor(categoryName, level, data2, context, location, error) {
      this.startTime = /* @__PURE__ */ new Date();
      this.categoryName = categoryName;
      this.data = data2;
      this.level = level;
      this.context = Object.assign({}, context);
      this.pid = process.pid;
      this.error = error;
      if (typeof location !== "undefined") {
        if (!location || typeof location !== "object" || Array.isArray(location))
          throw new TypeError(
            "Invalid location type passed to LoggingEvent constructor"
          );
        this.constructor._getLocationKeys().forEach((key) => {
          if (typeof location[key] !== "undefined") this[key] = location[key];
        });
      }
    }
    /** @private */
    static _getLocationKeys() {
      return [
        "fileName",
        "lineNumber",
        "columnNumber",
        "callStack",
        "className",
        "functionName",
        "functionAlias",
        "callerName"
      ];
    }
    serialise() {
      return flatted.stringify(this, (key, value) => {
        if (value instanceof Error) {
          value = Object.assign(
            { message: value.message, stack: value.stack },
            value
          );
        }
        return serde.serialise(value);
      });
    }
    static deserialise(serialised) {
      let event;
      try {
        const rehydratedEvent = flatted.parse(serialised, (key, value) => {
          if (value && value.message && value.stack) {
            const fakeError = new Error(value);
            Object.keys(value).forEach((k) => {
              fakeError[k] = value[k];
            });
            value = fakeError;
          }
          return serde.deserialise(value);
        });
        this._getLocationKeys().forEach((key) => {
          if (typeof rehydratedEvent[key] !== "undefined") {
            if (!rehydratedEvent.location) rehydratedEvent.location = {};
            rehydratedEvent.location[key] = rehydratedEvent[key];
          }
        });
        event = new LoggingEvent(
          rehydratedEvent.categoryName,
          levels2.getLevel(rehydratedEvent.level.levelStr),
          rehydratedEvent.data,
          rehydratedEvent.context,
          rehydratedEvent.location,
          rehydratedEvent.error
        );
        event.startTime = new Date(rehydratedEvent.startTime);
        event.pid = rehydratedEvent.pid;
        if (rehydratedEvent.cluster) {
          event.cluster = rehydratedEvent.cluster;
        }
      } catch (e) {
        event = new LoggingEvent("log4js", levels2.ERROR, [
          "Unable to parse log:",
          serialised,
          "because: ",
          e
        ]);
      }
      return event;
    }
  }
  LoggingEvent_1 = LoggingEvent;
  return LoggingEvent_1;
}
var clustering;
var hasRequiredClustering;
function requireClustering() {
  if (hasRequiredClustering) return clustering;
  hasRequiredClustering = 1;
  const debug = requireBrowser()("log4js:clustering");
  const LoggingEvent = requireLoggingEvent();
  const configuration2 = requireConfiguration();
  let disabled = false;
  let cluster = null;
  try {
    cluster = __require("cluster");
  } catch (e) {
    debug("cluster module not present");
    disabled = true;
  }
  const listeners = [];
  let pm2 = false;
  let pm2InstanceVar = "NODE_APP_INSTANCE";
  const isPM2Master = () => pm2 && process.env[pm2InstanceVar] === "0";
  const isMaster = () => disabled || cluster && cluster.isMaster || isPM2Master();
  const sendToListeners = (logEvent) => {
    listeners.forEach((l) => l(logEvent));
  };
  const receiver = (worker, message) => {
    debug("cluster message received from worker ", worker, ": ", message);
    if (worker.topic && worker.data) {
      message = worker;
      worker = void 0;
    }
    if (message && message.topic && message.topic === "log4js:message") {
      debug("received message: ", message.data);
      const logEvent = LoggingEvent.deserialise(message.data);
      sendToListeners(logEvent);
    }
  };
  if (!disabled) {
    configuration2.addListener((config) => {
      listeners.length = 0;
      ({
        pm2,
        disableClustering: disabled,
        pm2InstanceVar = "NODE_APP_INSTANCE"
      } = config);
      debug(`clustering disabled ? ${disabled}`);
      debug(`cluster.isMaster ? ${cluster && cluster.isMaster}`);
      debug(`pm2 enabled ? ${pm2}`);
      debug(`pm2InstanceVar = ${pm2InstanceVar}`);
      debug(`process.env[${pm2InstanceVar}] = ${process.env[pm2InstanceVar]}`);
      if (pm2) {
        process.removeListener("message", receiver);
      }
      if (cluster && cluster.removeListener) {
        cluster.removeListener("message", receiver);
      }
      if (disabled || config.disableClustering) {
        debug("Not listening for cluster messages, because clustering disabled.");
      } else if (isPM2Master()) {
        debug("listening for PM2 broadcast messages");
        process.on("message", receiver);
      } else if (cluster && cluster.isMaster) {
        debug("listening for cluster messages");
        cluster.on("message", receiver);
      } else {
        debug("not listening for messages, because we are not a master process");
      }
    });
  }
  clustering = {
    onlyOnMaster: (fn, notMaster) => isMaster() ? fn() : notMaster,
    isMaster,
    send: (msg) => {
      if (isMaster()) {
        sendToListeners(msg);
      } else {
        if (!pm2) {
          msg.cluster = {
            workerId: cluster.worker.id,
            worker: process.pid
          };
        }
        process.send({ topic: "log4js:message", data: msg.serialise() });
      }
    },
    onMessage: (listener) => {
      listeners.push(listener);
    }
  };
  return clustering;
}
var adapters2 = {};
var hasRequiredAdapters;
function requireAdapters() {
  if (hasRequiredAdapters) return adapters2;
  hasRequiredAdapters = 1;
  function maxFileSizeUnitTransform(maxLogSize) {
    if (typeof maxLogSize === "number" && Number.isInteger(maxLogSize)) {
      return maxLogSize;
    }
    const units = {
      K: 1024,
      M: 1024 * 1024,
      G: 1024 * 1024 * 1024
    };
    const validUnit = Object.keys(units);
    const unit = maxLogSize.slice(-1).toLocaleUpperCase();
    const value = maxLogSize.slice(0, -1).trim();
    if (validUnit.indexOf(unit) < 0 || !Number.isInteger(Number(value))) {
      throw Error(`maxLogSize: "${maxLogSize}" is invalid`);
    } else {
      return value * units[unit];
    }
  }
  function adapter(configAdapter, config) {
    const newConfig = Object.assign({}, config);
    Object.keys(configAdapter).forEach((key) => {
      if (newConfig[key]) {
        newConfig[key] = configAdapter[key](config[key]);
      }
    });
    return newConfig;
  }
  function fileAppenderAdapter(config) {
    const configAdapter = {
      maxLogSize: maxFileSizeUnitTransform
    };
    return adapter(configAdapter, config);
  }
  const adapters$1 = {
    dateFile: fileAppenderAdapter,
    file: fileAppenderAdapter,
    fileSync: fileAppenderAdapter
  };
  adapters2.modifyConfig = (config) => adapters$1[config.type] ? adapters$1[config.type](config) : config;
  return adapters2;
}
var console$1 = {};
var hasRequiredConsole;
function requireConsole() {
  if (hasRequiredConsole) return console$1;
  hasRequiredConsole = 1;
  const consoleLog = console.log.bind(console);
  function consoleAppender(layout, timezoneOffset) {
    return (loggingEvent) => {
      consoleLog(layout(loggingEvent, timezoneOffset));
    };
  }
  function configure2(config, layouts2) {
    let layout = layouts2.colouredLayout;
    if (config.layout) {
      layout = layouts2.layout(config.layout.type, config.layout);
    }
    return consoleAppender(layout, config.timezoneOffset);
  }
  console$1.configure = configure2;
  return console$1;
}
var stdout = {};
var hasRequiredStdout;
function requireStdout() {
  if (hasRequiredStdout) return stdout;
  hasRequiredStdout = 1;
  function stdoutAppender(layout, timezoneOffset) {
    return (loggingEvent) => {
      process.stdout.write(`${layout(loggingEvent, timezoneOffset)}
`);
    };
  }
  function configure2(config, layouts2) {
    let layout = layouts2.colouredLayout;
    if (config.layout) {
      layout = layouts2.layout(config.layout.type, config.layout);
    }
    return stdoutAppender(layout, config.timezoneOffset);
  }
  stdout.configure = configure2;
  return stdout;
}
var stderr = {};
var hasRequiredStderr;
function requireStderr() {
  if (hasRequiredStderr) return stderr;
  hasRequiredStderr = 1;
  function stderrAppender(layout, timezoneOffset) {
    return (loggingEvent) => {
      process.stderr.write(`${layout(loggingEvent, timezoneOffset)}
`);
    };
  }
  function configure2(config, layouts2) {
    let layout = layouts2.colouredLayout;
    if (config.layout) {
      layout = layouts2.layout(config.layout.type, config.layout);
    }
    return stderrAppender(layout, config.timezoneOffset);
  }
  stderr.configure = configure2;
  return stderr;
}
var logLevelFilter = {};
var hasRequiredLogLevelFilter;
function requireLogLevelFilter() {
  if (hasRequiredLogLevelFilter) return logLevelFilter;
  hasRequiredLogLevelFilter = 1;
  function logLevelFilter$1(minLevelString, maxLevelString, appender, levels2) {
    const minLevel = levels2.getLevel(minLevelString);
    const maxLevel = levels2.getLevel(maxLevelString, levels2.FATAL);
    return (logEvent) => {
      const eventLevel = logEvent.level;
      if (minLevel.isLessThanOrEqualTo(eventLevel) && maxLevel.isGreaterThanOrEqualTo(eventLevel)) {
        appender(logEvent);
      }
    };
  }
  function configure2(config, layouts2, findAppender, levels2) {
    const appender = findAppender(config.appender);
    return logLevelFilter$1(config.level, config.maxLevel, appender, levels2);
  }
  logLevelFilter.configure = configure2;
  return logLevelFilter;
}
var categoryFilter = {};
var hasRequiredCategoryFilter;
function requireCategoryFilter() {
  if (hasRequiredCategoryFilter) return categoryFilter;
  hasRequiredCategoryFilter = 1;
  const debug = requireBrowser()("log4js:categoryFilter");
  function categoryFilter$1(excludes, appender) {
    if (typeof excludes === "string") excludes = [excludes];
    return (logEvent) => {
      debug(`Checking ${logEvent.categoryName} against ${excludes}`);
      if (excludes.indexOf(logEvent.categoryName) === -1) {
        debug("Not excluded, sending to appender");
        appender(logEvent);
      }
    };
  }
  function configure2(config, layouts2, findAppender) {
    const appender = findAppender(config.appender);
    return categoryFilter$1(config.exclude, appender);
  }
  categoryFilter.configure = configure2;
  return categoryFilter;
}
var noLogFilter = {};
var hasRequiredNoLogFilter;
function requireNoLogFilter() {
  if (hasRequiredNoLogFilter) return noLogFilter;
  hasRequiredNoLogFilter = 1;
  const debug = requireBrowser()("log4js:noLogFilter");
  function removeNullOrEmptyRegexp(regexp) {
    const filtered = regexp.filter((el) => el != null && el !== "");
    return filtered;
  }
  function noLogFilter$1(filters, appender) {
    return (logEvent) => {
      debug(`Checking data: ${logEvent.data} against filters: ${filters}`);
      if (typeof filters === "string") {
        filters = [filters];
      }
      filters = removeNullOrEmptyRegexp(filters);
      const regex = new RegExp(filters.join("|"), "i");
      if (filters.length === 0 || logEvent.data.findIndex((value) => regex.test(value)) < 0) {
        debug("Not excluded, sending to appender");
        appender(logEvent);
      }
    };
  }
  function configure2(config, layouts2, findAppender) {
    const appender = findAppender(config.appender);
    return noLogFilter$1(config.exclude, appender);
  }
  noLogFilter.configure = configure2;
  return noLogFilter;
}
var file$1 = {};
var lib$1 = { exports: {} };
var fs = {};
var universalify = {};
var hasRequiredUniversalify;
function requireUniversalify() {
  if (hasRequiredUniversalify) return universalify;
  hasRequiredUniversalify = 1;
  universalify.fromCallback = function(fn) {
    return Object.defineProperty(function() {
      if (typeof arguments[arguments.length - 1] === "function") fn.apply(this, arguments);
      else {
        return new Promise((resolve, reject) => {
          arguments[arguments.length] = (err, res) => {
            if (err) return reject(err);
            resolve(res);
          };
          arguments.length++;
          fn.apply(this, arguments);
        });
      }
    }, "name", { value: fn.name });
  };
  universalify.fromPromise = function(fn) {
    return Object.defineProperty(function() {
      const cb = arguments[arguments.length - 1];
      if (typeof cb !== "function") return fn.apply(this, arguments);
      else fn.apply(this, arguments).then((r) => cb(null, r), cb);
    }, "name", { value: fn.name });
  };
  return universalify;
}
var polyfills;
var hasRequiredPolyfills;
function requirePolyfills() {
  if (hasRequiredPolyfills) return polyfills;
  hasRequiredPolyfills = 1;
  var constants = require$$0$1;
  var origCwd = process.cwd;
  var cwd = null;
  var platform2 = process.env.GRACEFUL_FS_PLATFORM || process.platform;
  process.cwd = function() {
    if (!cwd)
      cwd = origCwd.call(process);
    return cwd;
  };
  try {
    process.cwd();
  } catch (er) {
  }
  if (typeof process.chdir === "function") {
    var chdir = process.chdir;
    process.chdir = function(d) {
      cwd = null;
      chdir.call(process, d);
    };
    if (Object.setPrototypeOf) Object.setPrototypeOf(process.chdir, chdir);
  }
  polyfills = patch;
  function patch(fs22) {
    if (constants.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./)) {
      patchLchmod(fs22);
    }
    if (!fs22.lutimes) {
      patchLutimes(fs22);
    }
    fs22.chown = chownFix(fs22.chown);
    fs22.fchown = chownFix(fs22.fchown);
    fs22.lchown = chownFix(fs22.lchown);
    fs22.chmod = chmodFix(fs22.chmod);
    fs22.fchmod = chmodFix(fs22.fchmod);
    fs22.lchmod = chmodFix(fs22.lchmod);
    fs22.chownSync = chownFixSync(fs22.chownSync);
    fs22.fchownSync = chownFixSync(fs22.fchownSync);
    fs22.lchownSync = chownFixSync(fs22.lchownSync);
    fs22.chmodSync = chmodFixSync(fs22.chmodSync);
    fs22.fchmodSync = chmodFixSync(fs22.fchmodSync);
    fs22.lchmodSync = chmodFixSync(fs22.lchmodSync);
    fs22.stat = statFix(fs22.stat);
    fs22.fstat = statFix(fs22.fstat);
    fs22.lstat = statFix(fs22.lstat);
    fs22.statSync = statFixSync(fs22.statSync);
    fs22.fstatSync = statFixSync(fs22.fstatSync);
    fs22.lstatSync = statFixSync(fs22.lstatSync);
    if (fs22.chmod && !fs22.lchmod) {
      fs22.lchmod = function(path3, mode, cb) {
        if (cb) process.nextTick(cb);
      };
      fs22.lchmodSync = function() {
      };
    }
    if (fs22.chown && !fs22.lchown) {
      fs22.lchown = function(path3, uid, gid, cb) {
        if (cb) process.nextTick(cb);
      };
      fs22.lchownSync = function() {
      };
    }
    if (platform2 === "win32") {
      fs22.rename = typeof fs22.rename !== "function" ? fs22.rename : function(fs$rename) {
        function rename(from, to, cb) {
          var start = Date.now();
          var backoff = 0;
          fs$rename(from, to, function CB(er) {
            if (er && (er.code === "EACCES" || er.code === "EPERM" || er.code === "EBUSY") && Date.now() - start < 6e4) {
              setTimeout(function() {
                fs22.stat(to, function(stater, st) {
                  if (stater && stater.code === "ENOENT")
                    fs$rename(from, to, CB);
                  else
                    cb(er);
                });
              }, backoff);
              if (backoff < 100)
                backoff += 10;
              return;
            }
            if (cb) cb(er);
          });
        }
        if (Object.setPrototypeOf) Object.setPrototypeOf(rename, fs$rename);
        return rename;
      }(fs22.rename);
    }
    fs22.read = typeof fs22.read !== "function" ? fs22.read : function(fs$read) {
      function read(fd, buffer2, offset, length, position, callback_) {
        var callback;
        if (callback_ && typeof callback_ === "function") {
          var eagCounter = 0;
          callback = function(er, _, __) {
            if (er && er.code === "EAGAIN" && eagCounter < 10) {
              eagCounter++;
              return fs$read.call(fs22, fd, buffer2, offset, length, position, callback);
            }
            callback_.apply(this, arguments);
          };
        }
        return fs$read.call(fs22, fd, buffer2, offset, length, position, callback);
      }
      if (Object.setPrototypeOf) Object.setPrototypeOf(read, fs$read);
      return read;
    }(fs22.read);
    fs22.readSync = typeof fs22.readSync !== "function" ? fs22.readSync : /* @__PURE__ */ function(fs$readSync) {
      return function(fd, buffer2, offset, length, position) {
        var eagCounter = 0;
        while (true) {
          try {
            return fs$readSync.call(fs22, fd, buffer2, offset, length, position);
          } catch (er) {
            if (er.code === "EAGAIN" && eagCounter < 10) {
              eagCounter++;
              continue;
            }
            throw er;
          }
        }
      };
    }(fs22.readSync);
    function patchLchmod(fs32) {
      fs32.lchmod = function(path3, mode, callback) {
        fs32.open(
          path3,
          constants.O_WRONLY | constants.O_SYMLINK,
          mode,
          function(err, fd) {
            if (err) {
              if (callback) callback(err);
              return;
            }
            fs32.fchmod(fd, mode, function(err2) {
              fs32.close(fd, function(err22) {
                if (callback) callback(err2 || err22);
              });
            });
          }
        );
      };
      fs32.lchmodSync = function(path3, mode) {
        var fd = fs32.openSync(path3, constants.O_WRONLY | constants.O_SYMLINK, mode);
        var threw = true;
        var ret;
        try {
          ret = fs32.fchmodSync(fd, mode);
          threw = false;
        } finally {
          if (threw) {
            try {
              fs32.closeSync(fd);
            } catch (er) {
            }
          } else {
            fs32.closeSync(fd);
          }
        }
        return ret;
      };
    }
    function patchLutimes(fs32) {
      if (constants.hasOwnProperty("O_SYMLINK") && fs32.futimes) {
        fs32.lutimes = function(path3, at, mt, cb) {
          fs32.open(path3, constants.O_SYMLINK, function(er, fd) {
            if (er) {
              if (cb) cb(er);
              return;
            }
            fs32.futimes(fd, at, mt, function(er2) {
              fs32.close(fd, function(er22) {
                if (cb) cb(er2 || er22);
              });
            });
          });
        };
        fs32.lutimesSync = function(path3, at, mt) {
          var fd = fs32.openSync(path3, constants.O_SYMLINK);
          var ret;
          var threw = true;
          try {
            ret = fs32.futimesSync(fd, at, mt);
            threw = false;
          } finally {
            if (threw) {
              try {
                fs32.closeSync(fd);
              } catch (er) {
              }
            } else {
              fs32.closeSync(fd);
            }
          }
          return ret;
        };
      } else if (fs32.futimes) {
        fs32.lutimes = function(_a, _b, _c, cb) {
          if (cb) process.nextTick(cb);
        };
        fs32.lutimesSync = function() {
        };
      }
    }
    function chmodFix(orig) {
      if (!orig) return orig;
      return function(target, mode, cb) {
        return orig.call(fs22, target, mode, function(er) {
          if (chownErOk(er)) er = null;
          if (cb) cb.apply(this, arguments);
        });
      };
    }
    function chmodFixSync(orig) {
      if (!orig) return orig;
      return function(target, mode) {
        try {
          return orig.call(fs22, target, mode);
        } catch (er) {
          if (!chownErOk(er)) throw er;
        }
      };
    }
    function chownFix(orig) {
      if (!orig) return orig;
      return function(target, uid, gid, cb) {
        return orig.call(fs22, target, uid, gid, function(er) {
          if (chownErOk(er)) er = null;
          if (cb) cb.apply(this, arguments);
        });
      };
    }
    function chownFixSync(orig) {
      if (!orig) return orig;
      return function(target, uid, gid) {
        try {
          return orig.call(fs22, target, uid, gid);
        } catch (er) {
          if (!chownErOk(er)) throw er;
        }
      };
    }
    function statFix(orig) {
      if (!orig) return orig;
      return function(target, options, cb) {
        if (typeof options === "function") {
          cb = options;
          options = null;
        }
        function callback(er, stats) {
          if (stats) {
            if (stats.uid < 0) stats.uid += 4294967296;
            if (stats.gid < 0) stats.gid += 4294967296;
          }
          if (cb) cb.apply(this, arguments);
        }
        return options ? orig.call(fs22, target, options, callback) : orig.call(fs22, target, callback);
      };
    }
    function statFixSync(orig) {
      if (!orig) return orig;
      return function(target, options) {
        var stats = options ? orig.call(fs22, target, options) : orig.call(fs22, target);
        if (stats) {
          if (stats.uid < 0) stats.uid += 4294967296;
          if (stats.gid < 0) stats.gid += 4294967296;
        }
        return stats;
      };
    }
    function chownErOk(er) {
      if (!er)
        return true;
      if (er.code === "ENOSYS")
        return true;
      var nonroot = !process.getuid || process.getuid() !== 0;
      if (nonroot) {
        if (er.code === "EINVAL" || er.code === "EPERM")
          return true;
      }
      return false;
    }
  }
  return polyfills;
}
var legacyStreams;
var hasRequiredLegacyStreams;
function requireLegacyStreams() {
  if (hasRequiredLegacyStreams) return legacyStreams;
  hasRequiredLegacyStreams = 1;
  var Stream = stream3.Stream;
  legacyStreams = legacy;
  function legacy(fs22) {
    return {
      ReadStream,
      WriteStream
    };
    function ReadStream(path3, options) {
      if (!(this instanceof ReadStream)) return new ReadStream(path3, options);
      Stream.call(this);
      var self2 = this;
      this.path = path3;
      this.fd = null;
      this.readable = true;
      this.paused = false;
      this.flags = "r";
      this.mode = 438;
      this.bufferSize = 64 * 1024;
      options = options || {};
      var keys = Object.keys(options);
      for (var index = 0, length = keys.length; index < length; index++) {
        var key = keys[index];
        this[key] = options[key];
      }
      if (this.encoding) this.setEncoding(this.encoding);
      if (this.start !== void 0) {
        if ("number" !== typeof this.start) {
          throw TypeError("start must be a Number");
        }
        if (this.end === void 0) {
          this.end = Infinity;
        } else if ("number" !== typeof this.end) {
          throw TypeError("end must be a Number");
        }
        if (this.start > this.end) {
          throw new Error("start must be <= end");
        }
        this.pos = this.start;
      }
      if (this.fd !== null) {
        process.nextTick(function() {
          self2._read();
        });
        return;
      }
      fs22.open(this.path, this.flags, this.mode, function(err, fd) {
        if (err) {
          self2.emit("error", err);
          self2.readable = false;
          return;
        }
        self2.fd = fd;
        self2.emit("open", fd);
        self2._read();
      });
    }
    function WriteStream(path3, options) {
      if (!(this instanceof WriteStream)) return new WriteStream(path3, options);
      Stream.call(this);
      this.path = path3;
      this.fd = null;
      this.writable = true;
      this.flags = "w";
      this.encoding = "binary";
      this.mode = 438;
      this.bytesWritten = 0;
      options = options || {};
      var keys = Object.keys(options);
      for (var index = 0, length = keys.length; index < length; index++) {
        var key = keys[index];
        this[key] = options[key];
      }
      if (this.start !== void 0) {
        if ("number" !== typeof this.start) {
          throw TypeError("start must be a Number");
        }
        if (this.start < 0) {
          throw new Error("start must be >= zero");
        }
        this.pos = this.start;
      }
      this.busy = false;
      this._queue = [];
      if (this.fd === null) {
        this._open = fs22.open;
        this._queue.push([this._open, this.path, this.flags, this.mode, void 0]);
        this.flush();
      }
    }
  }
  return legacyStreams;
}
var clone_1;
var hasRequiredClone;
function requireClone() {
  if (hasRequiredClone) return clone_1;
  hasRequiredClone = 1;
  clone_1 = clone;
  var getPrototypeOf3 = Object.getPrototypeOf || function(obj) {
    return obj.__proto__;
  };
  function clone(obj) {
    if (obj === null || typeof obj !== "object")
      return obj;
    if (obj instanceof Object)
      var copy2 = { __proto__: getPrototypeOf3(obj) };
    else
      var copy2 = /* @__PURE__ */ Object.create(null);
    Object.getOwnPropertyNames(obj).forEach(function(key) {
      Object.defineProperty(copy2, key, Object.getOwnPropertyDescriptor(obj, key));
    });
    return copy2;
  }
  return clone_1;
}
var gracefulFs;
var hasRequiredGracefulFs;
function requireGracefulFs() {
  if (hasRequiredGracefulFs) return gracefulFs;
  hasRequiredGracefulFs = 1;
  var fs22 = require$$1$2;
  var polyfills2 = requirePolyfills();
  var legacy = requireLegacyStreams();
  var clone = requireClone();
  var util3 = require$$0;
  var gracefulQueue;
  var previousSymbol;
  if (typeof Symbol === "function" && typeof Symbol.for === "function") {
    gracefulQueue = Symbol.for("graceful-fs.queue");
    previousSymbol = Symbol.for("graceful-fs.previous");
  } else {
    gracefulQueue = "___graceful-fs.queue";
    previousSymbol = "___graceful-fs.previous";
  }
  function noop3() {
  }
  function publishQueue(context, queue2) {
    Object.defineProperty(context, gracefulQueue, {
      get: function() {
        return queue2;
      }
    });
  }
  var debug = noop3;
  if (util3.debuglog)
    debug = util3.debuglog("gfs4");
  else if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || ""))
    debug = function() {
      var m = util3.format.apply(util3, arguments);
      m = "GFS4: " + m.split(/\n/).join("\nGFS4: ");
      console.error(m);
    };
  if (!fs22[gracefulQueue]) {
    var queue = commonjsGlobal[gracefulQueue] || [];
    publishQueue(fs22, queue);
    fs22.close = function(fs$close) {
      function close(fd, cb) {
        return fs$close.call(fs22, fd, function(err) {
          if (!err) {
            resetQueue();
          }
          if (typeof cb === "function")
            cb.apply(this, arguments);
        });
      }
      Object.defineProperty(close, previousSymbol, {
        value: fs$close
      });
      return close;
    }(fs22.close);
    fs22.closeSync = function(fs$closeSync) {
      function closeSync(fd) {
        fs$closeSync.apply(fs22, arguments);
        resetQueue();
      }
      Object.defineProperty(closeSync, previousSymbol, {
        value: fs$closeSync
      });
      return closeSync;
    }(fs22.closeSync);
    if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || "")) {
      process.on("exit", function() {
        debug(fs22[gracefulQueue]);
        require$$5.equal(fs22[gracefulQueue].length, 0);
      });
    }
  }
  if (!commonjsGlobal[gracefulQueue]) {
    publishQueue(commonjsGlobal, fs22[gracefulQueue]);
  }
  gracefulFs = patch(clone(fs22));
  if (process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !fs22.__patched) {
    gracefulFs = patch(fs22);
    fs22.__patched = true;
  }
  function patch(fs32) {
    polyfills2(fs32);
    fs32.gracefulify = patch;
    fs32.createReadStream = createReadStream;
    fs32.createWriteStream = createWriteStream;
    var fs$readFile = fs32.readFile;
    fs32.readFile = readFile;
    function readFile(path3, options, cb) {
      if (typeof options === "function")
        cb = options, options = null;
      return go$readFile(path3, options, cb);
      function go$readFile(path22, options2, cb2, startTime) {
        return fs$readFile(path22, options2, function(err) {
          if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
            enqueue([go$readFile, [path22, options2, cb2], err, startTime || Date.now(), Date.now()]);
          else {
            if (typeof cb2 === "function")
              cb2.apply(this, arguments);
          }
        });
      }
    }
    var fs$writeFile = fs32.writeFile;
    fs32.writeFile = writeFile;
    function writeFile(path3, data2, options, cb) {
      if (typeof options === "function")
        cb = options, options = null;
      return go$writeFile(path3, data2, options, cb);
      function go$writeFile(path22, data22, options2, cb2, startTime) {
        return fs$writeFile(path22, data22, options2, function(err) {
          if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
            enqueue([go$writeFile, [path22, data22, options2, cb2], err, startTime || Date.now(), Date.now()]);
          else {
            if (typeof cb2 === "function")
              cb2.apply(this, arguments);
          }
        });
      }
    }
    var fs$appendFile = fs32.appendFile;
    if (fs$appendFile)
      fs32.appendFile = appendFile;
    function appendFile(path3, data2, options, cb) {
      if (typeof options === "function")
        cb = options, options = null;
      return go$appendFile(path3, data2, options, cb);
      function go$appendFile(path22, data22, options2, cb2, startTime) {
        return fs$appendFile(path22, data22, options2, function(err) {
          if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
            enqueue([go$appendFile, [path22, data22, options2, cb2], err, startTime || Date.now(), Date.now()]);
          else {
            if (typeof cb2 === "function")
              cb2.apply(this, arguments);
          }
        });
      }
    }
    var fs$copyFile = fs32.copyFile;
    if (fs$copyFile)
      fs32.copyFile = copyFile;
    function copyFile(src, dest, flags, cb) {
      if (typeof flags === "function") {
        cb = flags;
        flags = 0;
      }
      return go$copyFile(src, dest, flags, cb);
      function go$copyFile(src2, dest2, flags2, cb2, startTime) {
        return fs$copyFile(src2, dest2, flags2, function(err) {
          if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
            enqueue([go$copyFile, [src2, dest2, flags2, cb2], err, startTime || Date.now(), Date.now()]);
          else {
            if (typeof cb2 === "function")
              cb2.apply(this, arguments);
          }
        });
      }
    }
    var fs$readdir = fs32.readdir;
    fs32.readdir = readdir;
    var noReaddirOptionVersions = /^v[0-5]\./;
    function readdir(path3, options, cb) {
      if (typeof options === "function")
        cb = options, options = null;
      var go$readdir = noReaddirOptionVersions.test(process.version) ? function go$readdir2(path22, options2, cb2, startTime) {
        return fs$readdir(path22, fs$readdirCallback(
          path22,
          options2,
          cb2,
          startTime
        ));
      } : function go$readdir2(path22, options2, cb2, startTime) {
        return fs$readdir(path22, options2, fs$readdirCallback(
          path22,
          options2,
          cb2,
          startTime
        ));
      };
      return go$readdir(path3, options, cb);
      function fs$readdirCallback(path22, options2, cb2, startTime) {
        return function(err, files) {
          if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
            enqueue([
              go$readdir,
              [path22, options2, cb2],
              err,
              startTime || Date.now(),
              Date.now()
            ]);
          else {
            if (files && files.sort)
              files.sort();
            if (typeof cb2 === "function")
              cb2.call(this, err, files);
          }
        };
      }
    }
    if (process.version.substr(0, 4) === "v0.8") {
      var legStreams = legacy(fs32);
      ReadStream = legStreams.ReadStream;
      WriteStream = legStreams.WriteStream;
    }
    var fs$ReadStream = fs32.ReadStream;
    if (fs$ReadStream) {
      ReadStream.prototype = Object.create(fs$ReadStream.prototype);
      ReadStream.prototype.open = ReadStream$open;
    }
    var fs$WriteStream = fs32.WriteStream;
    if (fs$WriteStream) {
      WriteStream.prototype = Object.create(fs$WriteStream.prototype);
      WriteStream.prototype.open = WriteStream$open;
    }
    Object.defineProperty(fs32, "ReadStream", {
      get: function() {
        return ReadStream;
      },
      set: function(val) {
        ReadStream = val;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(fs32, "WriteStream", {
      get: function() {
        return WriteStream;
      },
      set: function(val) {
        WriteStream = val;
      },
      enumerable: true,
      configurable: true
    });
    var FileReadStream = ReadStream;
    Object.defineProperty(fs32, "FileReadStream", {
      get: function() {
        return FileReadStream;
      },
      set: function(val) {
        FileReadStream = val;
      },
      enumerable: true,
      configurable: true
    });
    var FileWriteStream = WriteStream;
    Object.defineProperty(fs32, "FileWriteStream", {
      get: function() {
        return FileWriteStream;
      },
      set: function(val) {
        FileWriteStream = val;
      },
      enumerable: true,
      configurable: true
    });
    function ReadStream(path3, options) {
      if (this instanceof ReadStream)
        return fs$ReadStream.apply(this, arguments), this;
      else
        return ReadStream.apply(Object.create(ReadStream.prototype), arguments);
    }
    function ReadStream$open() {
      var that = this;
      open(that.path, that.flags, that.mode, function(err, fd) {
        if (err) {
          if (that.autoClose)
            that.destroy();
          that.emit("error", err);
        } else {
          that.fd = fd;
          that.emit("open", fd);
          that.read();
        }
      });
    }
    function WriteStream(path3, options) {
      if (this instanceof WriteStream)
        return fs$WriteStream.apply(this, arguments), this;
      else
        return WriteStream.apply(Object.create(WriteStream.prototype), arguments);
    }
    function WriteStream$open() {
      var that = this;
      open(that.path, that.flags, that.mode, function(err, fd) {
        if (err) {
          that.destroy();
          that.emit("error", err);
        } else {
          that.fd = fd;
          that.emit("open", fd);
        }
      });
    }
    function createReadStream(path3, options) {
      return new fs32.ReadStream(path3, options);
    }
    function createWriteStream(path3, options) {
      return new fs32.WriteStream(path3, options);
    }
    var fs$open = fs32.open;
    fs32.open = open;
    function open(path3, flags, mode, cb) {
      if (typeof mode === "function")
        cb = mode, mode = null;
      return go$open(path3, flags, mode, cb);
      function go$open(path22, flags2, mode2, cb2, startTime) {
        return fs$open(path22, flags2, mode2, function(err, fd) {
          if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
            enqueue([go$open, [path22, flags2, mode2, cb2], err, startTime || Date.now(), Date.now()]);
          else {
            if (typeof cb2 === "function")
              cb2.apply(this, arguments);
          }
        });
      }
    }
    return fs32;
  }
  function enqueue(elem) {
    debug("ENQUEUE", elem[0].name, elem[1]);
    fs22[gracefulQueue].push(elem);
    retry();
  }
  var retryTimer;
  function resetQueue() {
    var now2 = Date.now();
    for (var i = 0; i < fs22[gracefulQueue].length; ++i) {
      if (fs22[gracefulQueue][i].length > 2) {
        fs22[gracefulQueue][i][3] = now2;
        fs22[gracefulQueue][i][4] = now2;
      }
    }
    retry();
  }
  function retry() {
    clearTimeout(retryTimer);
    retryTimer = void 0;
    if (fs22[gracefulQueue].length === 0)
      return;
    var elem = fs22[gracefulQueue].shift();
    var fn = elem[0];
    var args = elem[1];
    var err = elem[2];
    var startTime = elem[3];
    var lastTime = elem[4];
    if (startTime === void 0) {
      debug("RETRY", fn.name, args);
      fn.apply(null, args);
    } else if (Date.now() - startTime >= 6e4) {
      debug("TIMEOUT", fn.name, args);
      var cb = args.pop();
      if (typeof cb === "function")
        cb.call(null, err);
    } else {
      var sinceAttempt = Date.now() - lastTime;
      var sinceStart = Math.max(lastTime - startTime, 1);
      var desiredDelay = Math.min(sinceStart * 1.2, 100);
      if (sinceAttempt >= desiredDelay) {
        debug("RETRY", fn.name, args);
        fn.apply(null, args.concat([startTime]));
      } else {
        fs22[gracefulQueue].push(elem);
      }
    }
    if (retryTimer === void 0) {
      retryTimer = setTimeout(retry, 0);
    }
  }
  return gracefulFs;
}
var hasRequiredFs;
function requireFs() {
  if (hasRequiredFs) return fs;
  hasRequiredFs = 1;
  (function(exports) {
    const u = requireUniversalify().fromCallback;
    const fs22 = requireGracefulFs();
    const api = [
      "access",
      "appendFile",
      "chmod",
      "chown",
      "close",
      "copyFile",
      "fchmod",
      "fchown",
      "fdatasync",
      "fstat",
      "fsync",
      "ftruncate",
      "futimes",
      "lchown",
      "lchmod",
      "link",
      "lstat",
      "mkdir",
      "mkdtemp",
      "open",
      "readFile",
      "readdir",
      "readlink",
      "realpath",
      "rename",
      "rmdir",
      "stat",
      "symlink",
      "truncate",
      "unlink",
      "utimes",
      "writeFile"
    ].filter((key) => {
      return typeof fs22[key] === "function";
    });
    Object.keys(fs22).forEach((key) => {
      if (key === "promises") {
        return;
      }
      exports[key] = fs22[key];
    });
    api.forEach((method) => {
      exports[method] = u(fs22[method]);
    });
    exports.exists = function(filename, callback) {
      if (typeof callback === "function") {
        return fs22.exists(filename, callback);
      }
      return new Promise((resolve) => {
        return fs22.exists(filename, resolve);
      });
    };
    exports.read = function(fd, buffer2, offset, length, position, callback) {
      if (typeof callback === "function") {
        return fs22.read(fd, buffer2, offset, length, position, callback);
      }
      return new Promise((resolve, reject) => {
        fs22.read(fd, buffer2, offset, length, position, (err, bytesRead, buffer3) => {
          if (err) return reject(err);
          resolve({ bytesRead, buffer: buffer3 });
        });
      });
    };
    exports.write = function(fd, buffer2, ...args) {
      if (typeof args[args.length - 1] === "function") {
        return fs22.write(fd, buffer2, ...args);
      }
      return new Promise((resolve, reject) => {
        fs22.write(fd, buffer2, ...args, (err, bytesWritten, buffer3) => {
          if (err) return reject(err);
          resolve({ bytesWritten, buffer: buffer3 });
        });
      });
    };
    if (typeof fs22.realpath.native === "function") {
      exports.realpath.native = u(fs22.realpath.native);
    }
  })(fs);
  return fs;
}
var win32;
var hasRequiredWin32;
function requireWin32() {
  if (hasRequiredWin32) return win32;
  hasRequiredWin32 = 1;
  const path3 = require$$1;
  function getRootPath(p) {
    p = path3.normalize(path3.resolve(p)).split(path3.sep);
    if (p.length > 0) return p[0];
    return null;
  }
  const INVALID_PATH_CHARS = /[<>:"|?*]/;
  function invalidWin32Path(p) {
    const rp = getRootPath(p);
    p = p.replace(rp, "");
    return INVALID_PATH_CHARS.test(p);
  }
  win32 = {
    getRootPath,
    invalidWin32Path
  };
  return win32;
}
var mkdirs_1$1;
var hasRequiredMkdirs$1;
function requireMkdirs$1() {
  if (hasRequiredMkdirs$1) return mkdirs_1$1;
  hasRequiredMkdirs$1 = 1;
  const fs22 = requireGracefulFs();
  const path3 = require$$1;
  const invalidWin32Path = requireWin32().invalidWin32Path;
  const o777 = parseInt("0777", 8);
  function mkdirs(p, opts, callback, made) {
    if (typeof opts === "function") {
      callback = opts;
      opts = {};
    } else if (!opts || typeof opts !== "object") {
      opts = { mode: opts };
    }
    if (process.platform === "win32" && invalidWin32Path(p)) {
      const errInval = new Error(p + " contains invalid WIN32 path characters.");
      errInval.code = "EINVAL";
      return callback(errInval);
    }
    let mode = opts.mode;
    const xfs = opts.fs || fs22;
    if (mode === void 0) {
      mode = o777 & ~process.umask();
    }
    if (!made) made = null;
    callback = callback || function() {
    };
    p = path3.resolve(p);
    xfs.mkdir(p, mode, (er) => {
      if (!er) {
        made = made || p;
        return callback(null, made);
      }
      switch (er.code) {
        case "ENOENT":
          if (path3.dirname(p) === p) return callback(er);
          mkdirs(path3.dirname(p), opts, (er2, made2) => {
            if (er2) callback(er2, made2);
            else mkdirs(p, opts, callback, made2);
          });
          break;
        // In the case of any other error, just see if there's a dir
        // there already.  If so, then hooray!  If not, then something
        // is borked.
        default:
          xfs.stat(p, (er2, stat2) => {
            if (er2 || !stat2.isDirectory()) callback(er, made);
            else callback(null, made);
          });
          break;
      }
    });
  }
  mkdirs_1$1 = mkdirs;
  return mkdirs_1$1;
}
var mkdirsSync_1;
var hasRequiredMkdirsSync;
function requireMkdirsSync() {
  if (hasRequiredMkdirsSync) return mkdirsSync_1;
  hasRequiredMkdirsSync = 1;
  const fs22 = requireGracefulFs();
  const path3 = require$$1;
  const invalidWin32Path = requireWin32().invalidWin32Path;
  const o777 = parseInt("0777", 8);
  function mkdirsSync(p, opts, made) {
    if (!opts || typeof opts !== "object") {
      opts = { mode: opts };
    }
    let mode = opts.mode;
    const xfs = opts.fs || fs22;
    if (process.platform === "win32" && invalidWin32Path(p)) {
      const errInval = new Error(p + " contains invalid WIN32 path characters.");
      errInval.code = "EINVAL";
      throw errInval;
    }
    if (mode === void 0) {
      mode = o777 & ~process.umask();
    }
    if (!made) made = null;
    p = path3.resolve(p);
    try {
      xfs.mkdirSync(p, mode);
      made = made || p;
    } catch (err0) {
      if (err0.code === "ENOENT") {
        if (path3.dirname(p) === p) throw err0;
        made = mkdirsSync(path3.dirname(p), opts, made);
        mkdirsSync(p, opts, made);
      } else {
        let stat2;
        try {
          stat2 = xfs.statSync(p);
        } catch (err1) {
          throw err0;
        }
        if (!stat2.isDirectory()) throw err0;
      }
    }
    return made;
  }
  mkdirsSync_1 = mkdirsSync;
  return mkdirsSync_1;
}
var mkdirs_1;
var hasRequiredMkdirs;
function requireMkdirs() {
  if (hasRequiredMkdirs) return mkdirs_1;
  hasRequiredMkdirs = 1;
  const u = requireUniversalify().fromCallback;
  const mkdirs = u(requireMkdirs$1());
  const mkdirsSync = requireMkdirsSync();
  mkdirs_1 = {
    mkdirs,
    mkdirsSync,
    // alias
    mkdirp: mkdirs,
    mkdirpSync: mkdirsSync,
    ensureDir: mkdirs,
    ensureDirSync: mkdirsSync
  };
  return mkdirs_1;
}
var utimes;
var hasRequiredUtimes;
function requireUtimes() {
  if (hasRequiredUtimes) return utimes;
  hasRequiredUtimes = 1;
  const fs22 = requireGracefulFs();
  const os = require$$1$1;
  const path3 = require$$1;
  function hasMillisResSync() {
    let tmpfile = path3.join("millis-test-sync" + Date.now().toString() + Math.random().toString().slice(2));
    tmpfile = path3.join(os.tmpdir(), tmpfile);
    const d = /* @__PURE__ */ new Date(1435410243862);
    fs22.writeFileSync(tmpfile, "https://github.com/jprichardson/node-fs-extra/pull/141");
    const fd = fs22.openSync(tmpfile, "r+");
    fs22.futimesSync(fd, d, d);
    fs22.closeSync(fd);
    return fs22.statSync(tmpfile).mtime > 1435410243e3;
  }
  function hasMillisRes(callback) {
    let tmpfile = path3.join("millis-test" + Date.now().toString() + Math.random().toString().slice(2));
    tmpfile = path3.join(os.tmpdir(), tmpfile);
    const d = /* @__PURE__ */ new Date(1435410243862);
    fs22.writeFile(tmpfile, "https://github.com/jprichardson/node-fs-extra/pull/141", (err) => {
      if (err) return callback(err);
      fs22.open(tmpfile, "r+", (err2, fd) => {
        if (err2) return callback(err2);
        fs22.futimes(fd, d, d, (err3) => {
          if (err3) return callback(err3);
          fs22.close(fd, (err4) => {
            if (err4) return callback(err4);
            fs22.stat(tmpfile, (err5, stats) => {
              if (err5) return callback(err5);
              callback(null, stats.mtime > 1435410243e3);
            });
          });
        });
      });
    });
  }
  function timeRemoveMillis(timestamp) {
    if (typeof timestamp === "number") {
      return Math.floor(timestamp / 1e3) * 1e3;
    } else if (timestamp instanceof Date) {
      return new Date(Math.floor(timestamp.getTime() / 1e3) * 1e3);
    } else {
      throw new Error("fs-extra: timeRemoveMillis() unknown parameter type");
    }
  }
  function utimesMillis(path22, atime, mtime, callback) {
    fs22.open(path22, "r+", (err, fd) => {
      if (err) return callback(err);
      fs22.futimes(fd, atime, mtime, (futimesErr) => {
        fs22.close(fd, (closeErr) => {
          if (callback) callback(futimesErr || closeErr);
        });
      });
    });
  }
  function utimesMillisSync(path22, atime, mtime) {
    const fd = fs22.openSync(path22, "r+");
    fs22.futimesSync(fd, atime, mtime);
    return fs22.closeSync(fd);
  }
  utimes = {
    hasMillisRes,
    hasMillisResSync,
    timeRemoveMillis,
    utimesMillis,
    utimesMillisSync
  };
  return utimes;
}
var stat;
var hasRequiredStat;
function requireStat() {
  if (hasRequiredStat) return stat;
  hasRequiredStat = 1;
  const fs22 = requireGracefulFs();
  const path3 = require$$1;
  const NODE_VERSION_MAJOR_WITH_BIGINT = 10;
  const NODE_VERSION_MINOR_WITH_BIGINT = 5;
  const NODE_VERSION_PATCH_WITH_BIGINT = 0;
  const nodeVersion = process.versions.node.split(".");
  const nodeVersionMajor = Number.parseInt(nodeVersion[0], 10);
  const nodeVersionMinor = Number.parseInt(nodeVersion[1], 10);
  const nodeVersionPatch = Number.parseInt(nodeVersion[2], 10);
  function nodeSupportsBigInt() {
    if (nodeVersionMajor > NODE_VERSION_MAJOR_WITH_BIGINT) {
      return true;
    } else if (nodeVersionMajor === NODE_VERSION_MAJOR_WITH_BIGINT) {
      if (nodeVersionMinor > NODE_VERSION_MINOR_WITH_BIGINT) {
        return true;
      } else if (nodeVersionMinor === NODE_VERSION_MINOR_WITH_BIGINT) {
        if (nodeVersionPatch >= NODE_VERSION_PATCH_WITH_BIGINT) {
          return true;
        }
      }
    }
    return false;
  }
  function getStats(src, dest, cb) {
    if (nodeSupportsBigInt()) {
      fs22.stat(src, { bigint: true }, (err, srcStat) => {
        if (err) return cb(err);
        fs22.stat(dest, { bigint: true }, (err2, destStat) => {
          if (err2) {
            if (err2.code === "ENOENT") return cb(null, { srcStat, destStat: null });
            return cb(err2);
          }
          return cb(null, { srcStat, destStat });
        });
      });
    } else {
      fs22.stat(src, (err, srcStat) => {
        if (err) return cb(err);
        fs22.stat(dest, (err2, destStat) => {
          if (err2) {
            if (err2.code === "ENOENT") return cb(null, { srcStat, destStat: null });
            return cb(err2);
          }
          return cb(null, { srcStat, destStat });
        });
      });
    }
  }
  function getStatsSync(src, dest) {
    let srcStat, destStat;
    if (nodeSupportsBigInt()) {
      srcStat = fs22.statSync(src, { bigint: true });
    } else {
      srcStat = fs22.statSync(src);
    }
    try {
      if (nodeSupportsBigInt()) {
        destStat = fs22.statSync(dest, { bigint: true });
      } else {
        destStat = fs22.statSync(dest);
      }
    } catch (err) {
      if (err.code === "ENOENT") return { srcStat, destStat: null };
      throw err;
    }
    return { srcStat, destStat };
  }
  function checkPaths(src, dest, funcName, cb) {
    getStats(src, dest, (err, stats) => {
      if (err) return cb(err);
      const { srcStat, destStat } = stats;
      if (destStat && destStat.ino && destStat.dev && destStat.ino === srcStat.ino && destStat.dev === srcStat.dev) {
        return cb(new Error("Source and destination must not be the same."));
      }
      if (srcStat.isDirectory() && isSrcSubdir(src, dest)) {
        return cb(new Error(errMsg(src, dest, funcName)));
      }
      return cb(null, { srcStat, destStat });
    });
  }
  function checkPathsSync(src, dest, funcName) {
    const { srcStat, destStat } = getStatsSync(src, dest);
    if (destStat && destStat.ino && destStat.dev && destStat.ino === srcStat.ino && destStat.dev === srcStat.dev) {
      throw new Error("Source and destination must not be the same.");
    }
    if (srcStat.isDirectory() && isSrcSubdir(src, dest)) {
      throw new Error(errMsg(src, dest, funcName));
    }
    return { srcStat, destStat };
  }
  function checkParentPaths(src, srcStat, dest, funcName, cb) {
    const srcParent = path3.resolve(path3.dirname(src));
    const destParent = path3.resolve(path3.dirname(dest));
    if (destParent === srcParent || destParent === path3.parse(destParent).root) return cb();
    if (nodeSupportsBigInt()) {
      fs22.stat(destParent, { bigint: true }, (err, destStat) => {
        if (err) {
          if (err.code === "ENOENT") return cb();
          return cb(err);
        }
        if (destStat.ino && destStat.dev && destStat.ino === srcStat.ino && destStat.dev === srcStat.dev) {
          return cb(new Error(errMsg(src, dest, funcName)));
        }
        return checkParentPaths(src, srcStat, destParent, funcName, cb);
      });
    } else {
      fs22.stat(destParent, (err, destStat) => {
        if (err) {
          if (err.code === "ENOENT") return cb();
          return cb(err);
        }
        if (destStat.ino && destStat.dev && destStat.ino === srcStat.ino && destStat.dev === srcStat.dev) {
          return cb(new Error(errMsg(src, dest, funcName)));
        }
        return checkParentPaths(src, srcStat, destParent, funcName, cb);
      });
    }
  }
  function checkParentPathsSync(src, srcStat, dest, funcName) {
    const srcParent = path3.resolve(path3.dirname(src));
    const destParent = path3.resolve(path3.dirname(dest));
    if (destParent === srcParent || destParent === path3.parse(destParent).root) return;
    let destStat;
    try {
      if (nodeSupportsBigInt()) {
        destStat = fs22.statSync(destParent, { bigint: true });
      } else {
        destStat = fs22.statSync(destParent);
      }
    } catch (err) {
      if (err.code === "ENOENT") return;
      throw err;
    }
    if (destStat.ino && destStat.dev && destStat.ino === srcStat.ino && destStat.dev === srcStat.dev) {
      throw new Error(errMsg(src, dest, funcName));
    }
    return checkParentPathsSync(src, srcStat, destParent, funcName);
  }
  function isSrcSubdir(src, dest) {
    const srcArr = path3.resolve(src).split(path3.sep).filter((i) => i);
    const destArr = path3.resolve(dest).split(path3.sep).filter((i) => i);
    return srcArr.reduce((acc, cur, i) => acc && destArr[i] === cur, true);
  }
  function errMsg(src, dest, funcName) {
    return `Cannot ${funcName} '${src}' to a subdirectory of itself, '${dest}'.`;
  }
  stat = {
    checkPaths,
    checkPathsSync,
    checkParentPaths,
    checkParentPathsSync,
    isSrcSubdir
  };
  return stat;
}
var buffer;
var hasRequiredBuffer;
function requireBuffer() {
  if (hasRequiredBuffer) return buffer;
  hasRequiredBuffer = 1;
  buffer = function(size) {
    if (typeof Buffer.allocUnsafe === "function") {
      try {
        return Buffer.allocUnsafe(size);
      } catch (e) {
        return new Buffer(size);
      }
    }
    return new Buffer(size);
  };
  return buffer;
}
var copySync_1;
var hasRequiredCopySync$1;
function requireCopySync$1() {
  if (hasRequiredCopySync$1) return copySync_1;
  hasRequiredCopySync$1 = 1;
  const fs22 = requireGracefulFs();
  const path3 = require$$1;
  const mkdirpSync = requireMkdirs().mkdirsSync;
  const utimesSync = requireUtimes().utimesMillisSync;
  const stat2 = requireStat();
  function copySync2(src, dest, opts) {
    if (typeof opts === "function") {
      opts = { filter: opts };
    }
    opts = opts || {};
    opts.clobber = "clobber" in opts ? !!opts.clobber : true;
    opts.overwrite = "overwrite" in opts ? !!opts.overwrite : opts.clobber;
    if (opts.preserveTimestamps && process.arch === "ia32") {
      console.warn(`fs-extra: Using the preserveTimestamps option in 32-bit node is not recommended;

    see https://github.com/jprichardson/node-fs-extra/issues/269`);
    }
    const { srcStat, destStat } = stat2.checkPathsSync(src, dest, "copy");
    stat2.checkParentPathsSync(src, srcStat, dest, "copy");
    return handleFilterAndCopy(destStat, src, dest, opts);
  }
  function handleFilterAndCopy(destStat, src, dest, opts) {
    if (opts.filter && !opts.filter(src, dest)) return;
    const destParent = path3.dirname(dest);
    if (!fs22.existsSync(destParent)) mkdirpSync(destParent);
    return startCopy(destStat, src, dest, opts);
  }
  function startCopy(destStat, src, dest, opts) {
    if (opts.filter && !opts.filter(src, dest)) return;
    return getStats(destStat, src, dest, opts);
  }
  function getStats(destStat, src, dest, opts) {
    const statSync = opts.dereference ? fs22.statSync : fs22.lstatSync;
    const srcStat = statSync(src);
    if (srcStat.isDirectory()) return onDir(srcStat, destStat, src, dest, opts);
    else if (srcStat.isFile() || srcStat.isCharacterDevice() || srcStat.isBlockDevice()) return onFile(srcStat, destStat, src, dest, opts);
    else if (srcStat.isSymbolicLink()) return onLink(destStat, src, dest, opts);
  }
  function onFile(srcStat, destStat, src, dest, opts) {
    if (!destStat) return copyFile(srcStat, src, dest, opts);
    return mayCopyFile(srcStat, src, dest, opts);
  }
  function mayCopyFile(srcStat, src, dest, opts) {
    if (opts.overwrite) {
      fs22.unlinkSync(dest);
      return copyFile(srcStat, src, dest, opts);
    } else if (opts.errorOnExist) {
      throw new Error(`'${dest}' already exists`);
    }
  }
  function copyFile(srcStat, src, dest, opts) {
    if (typeof fs22.copyFileSync === "function") {
      fs22.copyFileSync(src, dest);
      fs22.chmodSync(dest, srcStat.mode);
      if (opts.preserveTimestamps) {
        return utimesSync(dest, srcStat.atime, srcStat.mtime);
      }
      return;
    }
    return copyFileFallback(srcStat, src, dest, opts);
  }
  function copyFileFallback(srcStat, src, dest, opts) {
    const BUF_LENGTH = 64 * 1024;
    const _buff = requireBuffer()(BUF_LENGTH);
    const fdr = fs22.openSync(src, "r");
    const fdw = fs22.openSync(dest, "w", srcStat.mode);
    let pos = 0;
    while (pos < srcStat.size) {
      const bytesRead = fs22.readSync(fdr, _buff, 0, BUF_LENGTH, pos);
      fs22.writeSync(fdw, _buff, 0, bytesRead);
      pos += bytesRead;
    }
    if (opts.preserveTimestamps) fs22.futimesSync(fdw, srcStat.atime, srcStat.mtime);
    fs22.closeSync(fdr);
    fs22.closeSync(fdw);
  }
  function onDir(srcStat, destStat, src, dest, opts) {
    if (!destStat) return mkDirAndCopy(srcStat, src, dest, opts);
    if (destStat && !destStat.isDirectory()) {
      throw new Error(`Cannot overwrite non-directory '${dest}' with directory '${src}'.`);
    }
    return copyDir(src, dest, opts);
  }
  function mkDirAndCopy(srcStat, src, dest, opts) {
    fs22.mkdirSync(dest);
    copyDir(src, dest, opts);
    return fs22.chmodSync(dest, srcStat.mode);
  }
  function copyDir(src, dest, opts) {
    fs22.readdirSync(src).forEach((item) => copyDirItem(item, src, dest, opts));
  }
  function copyDirItem(item, src, dest, opts) {
    const srcItem = path3.join(src, item);
    const destItem = path3.join(dest, item);
    const { destStat } = stat2.checkPathsSync(srcItem, destItem, "copy");
    return startCopy(destStat, srcItem, destItem, opts);
  }
  function onLink(destStat, src, dest, opts) {
    let resolvedSrc = fs22.readlinkSync(src);
    if (opts.dereference) {
      resolvedSrc = path3.resolve(process.cwd(), resolvedSrc);
    }
    if (!destStat) {
      return fs22.symlinkSync(resolvedSrc, dest);
    } else {
      let resolvedDest;
      try {
        resolvedDest = fs22.readlinkSync(dest);
      } catch (err) {
        if (err.code === "EINVAL" || err.code === "UNKNOWN") return fs22.symlinkSync(resolvedSrc, dest);
        throw err;
      }
      if (opts.dereference) {
        resolvedDest = path3.resolve(process.cwd(), resolvedDest);
      }
      if (stat2.isSrcSubdir(resolvedSrc, resolvedDest)) {
        throw new Error(`Cannot copy '${resolvedSrc}' to a subdirectory of itself, '${resolvedDest}'.`);
      }
      if (fs22.statSync(dest).isDirectory() && stat2.isSrcSubdir(resolvedDest, resolvedSrc)) {
        throw new Error(`Cannot overwrite '${resolvedDest}' with '${resolvedSrc}'.`);
      }
      return copyLink(resolvedSrc, dest);
    }
  }
  function copyLink(resolvedSrc, dest) {
    fs22.unlinkSync(dest);
    return fs22.symlinkSync(resolvedSrc, dest);
  }
  copySync_1 = copySync2;
  return copySync_1;
}
var copySync;
var hasRequiredCopySync;
function requireCopySync() {
  if (hasRequiredCopySync) return copySync;
  hasRequiredCopySync = 1;
  copySync = {
    copySync: requireCopySync$1()
  };
  return copySync;
}
var pathExists_1;
var hasRequiredPathExists;
function requirePathExists() {
  if (hasRequiredPathExists) return pathExists_1;
  hasRequiredPathExists = 1;
  const u = requireUniversalify().fromPromise;
  const fs22 = requireFs();
  function pathExists(path3) {
    return fs22.access(path3).then(() => true).catch(() => false);
  }
  pathExists_1 = {
    pathExists: u(pathExists),
    pathExistsSync: fs22.existsSync
  };
  return pathExists_1;
}
var copy_1;
var hasRequiredCopy$1;
function requireCopy$1() {
  if (hasRequiredCopy$1) return copy_1;
  hasRequiredCopy$1 = 1;
  const fs22 = requireGracefulFs();
  const path3 = require$$1;
  const mkdirp = requireMkdirs().mkdirs;
  const pathExists = requirePathExists().pathExists;
  const utimes2 = requireUtimes().utimesMillis;
  const stat2 = requireStat();
  function copy2(src, dest, opts, cb) {
    if (typeof opts === "function" && !cb) {
      cb = opts;
      opts = {};
    } else if (typeof opts === "function") {
      opts = { filter: opts };
    }
    cb = cb || function() {
    };
    opts = opts || {};
    opts.clobber = "clobber" in opts ? !!opts.clobber : true;
    opts.overwrite = "overwrite" in opts ? !!opts.overwrite : opts.clobber;
    if (opts.preserveTimestamps && process.arch === "ia32") {
      console.warn(`fs-extra: Using the preserveTimestamps option in 32-bit node is not recommended;

    see https://github.com/jprichardson/node-fs-extra/issues/269`);
    }
    stat2.checkPaths(src, dest, "copy", (err, stats) => {
      if (err) return cb(err);
      const { srcStat, destStat } = stats;
      stat2.checkParentPaths(src, srcStat, dest, "copy", (err2) => {
        if (err2) return cb(err2);
        if (opts.filter) return handleFilter(checkParentDir, destStat, src, dest, opts, cb);
        return checkParentDir(destStat, src, dest, opts, cb);
      });
    });
  }
  function checkParentDir(destStat, src, dest, opts, cb) {
    const destParent = path3.dirname(dest);
    pathExists(destParent, (err, dirExists) => {
      if (err) return cb(err);
      if (dirExists) return startCopy(destStat, src, dest, opts, cb);
      mkdirp(destParent, (err2) => {
        if (err2) return cb(err2);
        return startCopy(destStat, src, dest, opts, cb);
      });
    });
  }
  function handleFilter(onInclude, destStat, src, dest, opts, cb) {
    Promise.resolve(opts.filter(src, dest)).then((include) => {
      if (include) return onInclude(destStat, src, dest, opts, cb);
      return cb();
    }, (error) => cb(error));
  }
  function startCopy(destStat, src, dest, opts, cb) {
    if (opts.filter) return handleFilter(getStats, destStat, src, dest, opts, cb);
    return getStats(destStat, src, dest, opts, cb);
  }
  function getStats(destStat, src, dest, opts, cb) {
    const stat3 = opts.dereference ? fs22.stat : fs22.lstat;
    stat3(src, (err, srcStat) => {
      if (err) return cb(err);
      if (srcStat.isDirectory()) return onDir(srcStat, destStat, src, dest, opts, cb);
      else if (srcStat.isFile() || srcStat.isCharacterDevice() || srcStat.isBlockDevice()) return onFile(srcStat, destStat, src, dest, opts, cb);
      else if (srcStat.isSymbolicLink()) return onLink(destStat, src, dest, opts, cb);
    });
  }
  function onFile(srcStat, destStat, src, dest, opts, cb) {
    if (!destStat) return copyFile(srcStat, src, dest, opts, cb);
    return mayCopyFile(srcStat, src, dest, opts, cb);
  }
  function mayCopyFile(srcStat, src, dest, opts, cb) {
    if (opts.overwrite) {
      fs22.unlink(dest, (err) => {
        if (err) return cb(err);
        return copyFile(srcStat, src, dest, opts, cb);
      });
    } else if (opts.errorOnExist) {
      return cb(new Error(`'${dest}' already exists`));
    } else return cb();
  }
  function copyFile(srcStat, src, dest, opts, cb) {
    if (typeof fs22.copyFile === "function") {
      return fs22.copyFile(src, dest, (err) => {
        if (err) return cb(err);
        return setDestModeAndTimestamps(srcStat, dest, opts, cb);
      });
    }
    return copyFileFallback(srcStat, src, dest, opts, cb);
  }
  function copyFileFallback(srcStat, src, dest, opts, cb) {
    const rs = fs22.createReadStream(src);
    rs.on("error", (err) => cb(err)).once("open", () => {
      const ws = fs22.createWriteStream(dest, { mode: srcStat.mode });
      ws.on("error", (err) => cb(err)).on("open", () => rs.pipe(ws)).once("close", () => setDestModeAndTimestamps(srcStat, dest, opts, cb));
    });
  }
  function setDestModeAndTimestamps(srcStat, dest, opts, cb) {
    fs22.chmod(dest, srcStat.mode, (err) => {
      if (err) return cb(err);
      if (opts.preserveTimestamps) {
        return utimes2(dest, srcStat.atime, srcStat.mtime, cb);
      }
      return cb();
    });
  }
  function onDir(srcStat, destStat, src, dest, opts, cb) {
    if (!destStat) return mkDirAndCopy(srcStat, src, dest, opts, cb);
    if (destStat && !destStat.isDirectory()) {
      return cb(new Error(`Cannot overwrite non-directory '${dest}' with directory '${src}'.`));
    }
    return copyDir(src, dest, opts, cb);
  }
  function mkDirAndCopy(srcStat, src, dest, opts, cb) {
    fs22.mkdir(dest, (err) => {
      if (err) return cb(err);
      copyDir(src, dest, opts, (err2) => {
        if (err2) return cb(err2);
        return fs22.chmod(dest, srcStat.mode, cb);
      });
    });
  }
  function copyDir(src, dest, opts, cb) {
    fs22.readdir(src, (err, items) => {
      if (err) return cb(err);
      return copyDirItems(items, src, dest, opts, cb);
    });
  }
  function copyDirItems(items, src, dest, opts, cb) {
    const item = items.pop();
    if (!item) return cb();
    return copyDirItem(items, item, src, dest, opts, cb);
  }
  function copyDirItem(items, item, src, dest, opts, cb) {
    const srcItem = path3.join(src, item);
    const destItem = path3.join(dest, item);
    stat2.checkPaths(srcItem, destItem, "copy", (err, stats) => {
      if (err) return cb(err);
      const { destStat } = stats;
      startCopy(destStat, srcItem, destItem, opts, (err2) => {
        if (err2) return cb(err2);
        return copyDirItems(items, src, dest, opts, cb);
      });
    });
  }
  function onLink(destStat, src, dest, opts, cb) {
    fs22.readlink(src, (err, resolvedSrc) => {
      if (err) return cb(err);
      if (opts.dereference) {
        resolvedSrc = path3.resolve(process.cwd(), resolvedSrc);
      }
      if (!destStat) {
        return fs22.symlink(resolvedSrc, dest, cb);
      } else {
        fs22.readlink(dest, (err2, resolvedDest) => {
          if (err2) {
            if (err2.code === "EINVAL" || err2.code === "UNKNOWN") return fs22.symlink(resolvedSrc, dest, cb);
            return cb(err2);
          }
          if (opts.dereference) {
            resolvedDest = path3.resolve(process.cwd(), resolvedDest);
          }
          if (stat2.isSrcSubdir(resolvedSrc, resolvedDest)) {
            return cb(new Error(`Cannot copy '${resolvedSrc}' to a subdirectory of itself, '${resolvedDest}'.`));
          }
          if (destStat.isDirectory() && stat2.isSrcSubdir(resolvedDest, resolvedSrc)) {
            return cb(new Error(`Cannot overwrite '${resolvedDest}' with '${resolvedSrc}'.`));
          }
          return copyLink(resolvedSrc, dest, cb);
        });
      }
    });
  }
  function copyLink(resolvedSrc, dest, cb) {
    fs22.unlink(dest, (err) => {
      if (err) return cb(err);
      return fs22.symlink(resolvedSrc, dest, cb);
    });
  }
  copy_1 = copy2;
  return copy_1;
}
var copy;
var hasRequiredCopy;
function requireCopy() {
  if (hasRequiredCopy) return copy;
  hasRequiredCopy = 1;
  const u = requireUniversalify().fromCallback;
  copy = {
    copy: u(requireCopy$1())
  };
  return copy;
}
var rimraf_1;
var hasRequiredRimraf;
function requireRimraf() {
  if (hasRequiredRimraf) return rimraf_1;
  hasRequiredRimraf = 1;
  const fs22 = requireGracefulFs();
  const path3 = require$$1;
  const assert = require$$5;
  const isWindows = process.platform === "win32";
  function defaults3(options) {
    const methods = [
      "unlink",
      "chmod",
      "stat",
      "lstat",
      "rmdir",
      "readdir"
    ];
    methods.forEach((m) => {
      options[m] = options[m] || fs22[m];
      m = m + "Sync";
      options[m] = options[m] || fs22[m];
    });
    options.maxBusyTries = options.maxBusyTries || 3;
  }
  function rimraf(p, options, cb) {
    let busyTries = 0;
    if (typeof options === "function") {
      cb = options;
      options = {};
    }
    assert(p, "rimraf: missing path");
    assert.strictEqual(typeof p, "string", "rimraf: path should be a string");
    assert.strictEqual(typeof cb, "function", "rimraf: callback function required");
    assert(options, "rimraf: invalid options argument provided");
    assert.strictEqual(typeof options, "object", "rimraf: options should be object");
    defaults3(options);
    rimraf_(p, options, function CB(er) {
      if (er) {
        if ((er.code === "EBUSY" || er.code === "ENOTEMPTY" || er.code === "EPERM") && busyTries < options.maxBusyTries) {
          busyTries++;
          const time = busyTries * 100;
          return setTimeout(() => rimraf_(p, options, CB), time);
        }
        if (er.code === "ENOENT") er = null;
      }
      cb(er);
    });
  }
  function rimraf_(p, options, cb) {
    assert(p);
    assert(options);
    assert(typeof cb === "function");
    options.lstat(p, (er, st) => {
      if (er && er.code === "ENOENT") {
        return cb(null);
      }
      if (er && er.code === "EPERM" && isWindows) {
        return fixWinEPERM(p, options, er, cb);
      }
      if (st && st.isDirectory()) {
        return rmdir(p, options, er, cb);
      }
      options.unlink(p, (er2) => {
        if (er2) {
          if (er2.code === "ENOENT") {
            return cb(null);
          }
          if (er2.code === "EPERM") {
            return isWindows ? fixWinEPERM(p, options, er2, cb) : rmdir(p, options, er2, cb);
          }
          if (er2.code === "EISDIR") {
            return rmdir(p, options, er2, cb);
          }
        }
        return cb(er2);
      });
    });
  }
  function fixWinEPERM(p, options, er, cb) {
    assert(p);
    assert(options);
    assert(typeof cb === "function");
    if (er) {
      assert(er instanceof Error);
    }
    options.chmod(p, 438, (er2) => {
      if (er2) {
        cb(er2.code === "ENOENT" ? null : er);
      } else {
        options.stat(p, (er3, stats) => {
          if (er3) {
            cb(er3.code === "ENOENT" ? null : er);
          } else if (stats.isDirectory()) {
            rmdir(p, options, er, cb);
          } else {
            options.unlink(p, cb);
          }
        });
      }
    });
  }
  function fixWinEPERMSync(p, options, er) {
    let stats;
    assert(p);
    assert(options);
    if (er) {
      assert(er instanceof Error);
    }
    try {
      options.chmodSync(p, 438);
    } catch (er2) {
      if (er2.code === "ENOENT") {
        return;
      } else {
        throw er;
      }
    }
    try {
      stats = options.statSync(p);
    } catch (er3) {
      if (er3.code === "ENOENT") {
        return;
      } else {
        throw er;
      }
    }
    if (stats.isDirectory()) {
      rmdirSync(p, options, er);
    } else {
      options.unlinkSync(p);
    }
  }
  function rmdir(p, options, originalEr, cb) {
    assert(p);
    assert(options);
    if (originalEr) {
      assert(originalEr instanceof Error);
    }
    assert(typeof cb === "function");
    options.rmdir(p, (er) => {
      if (er && (er.code === "ENOTEMPTY" || er.code === "EEXIST" || er.code === "EPERM")) {
        rmkids(p, options, cb);
      } else if (er && er.code === "ENOTDIR") {
        cb(originalEr);
      } else {
        cb(er);
      }
    });
  }
  function rmkids(p, options, cb) {
    assert(p);
    assert(options);
    assert(typeof cb === "function");
    options.readdir(p, (er, files) => {
      if (er) return cb(er);
      let n = files.length;
      let errState;
      if (n === 0) return options.rmdir(p, cb);
      files.forEach((f) => {
        rimraf(path3.join(p, f), options, (er2) => {
          if (errState) {
            return;
          }
          if (er2) return cb(errState = er2);
          if (--n === 0) {
            options.rmdir(p, cb);
          }
        });
      });
    });
  }
  function rimrafSync(p, options) {
    let st;
    options = options || {};
    defaults3(options);
    assert(p, "rimraf: missing path");
    assert.strictEqual(typeof p, "string", "rimraf: path should be a string");
    assert(options, "rimraf: missing options");
    assert.strictEqual(typeof options, "object", "rimraf: options should be object");
    try {
      st = options.lstatSync(p);
    } catch (er) {
      if (er.code === "ENOENT") {
        return;
      }
      if (er.code === "EPERM" && isWindows) {
        fixWinEPERMSync(p, options, er);
      }
    }
    try {
      if (st && st.isDirectory()) {
        rmdirSync(p, options, null);
      } else {
        options.unlinkSync(p);
      }
    } catch (er) {
      if (er.code === "ENOENT") {
        return;
      } else if (er.code === "EPERM") {
        return isWindows ? fixWinEPERMSync(p, options, er) : rmdirSync(p, options, er);
      } else if (er.code !== "EISDIR") {
        throw er;
      }
      rmdirSync(p, options, er);
    }
  }
  function rmdirSync(p, options, originalEr) {
    assert(p);
    assert(options);
    if (originalEr) {
      assert(originalEr instanceof Error);
    }
    try {
      options.rmdirSync(p);
    } catch (er) {
      if (er.code === "ENOTDIR") {
        throw originalEr;
      } else if (er.code === "ENOTEMPTY" || er.code === "EEXIST" || er.code === "EPERM") {
        rmkidsSync(p, options);
      } else if (er.code !== "ENOENT") {
        throw er;
      }
    }
  }
  function rmkidsSync(p, options) {
    assert(p);
    assert(options);
    options.readdirSync(p).forEach((f) => rimrafSync(path3.join(p, f), options));
    if (isWindows) {
      const startTime = Date.now();
      do {
        try {
          const ret = options.rmdirSync(p, options);
          return ret;
        } catch (er) {
        }
      } while (Date.now() - startTime < 500);
    } else {
      const ret = options.rmdirSync(p, options);
      return ret;
    }
  }
  rimraf_1 = rimraf;
  rimraf.sync = rimrafSync;
  return rimraf_1;
}
var remove;
var hasRequiredRemove;
function requireRemove() {
  if (hasRequiredRemove) return remove;
  hasRequiredRemove = 1;
  const u = requireUniversalify().fromCallback;
  const rimraf = requireRimraf();
  remove = {
    remove: u(rimraf),
    removeSync: rimraf.sync
  };
  return remove;
}
var empty;
var hasRequiredEmpty;
function requireEmpty() {
  if (hasRequiredEmpty) return empty;
  hasRequiredEmpty = 1;
  const u = requireUniversalify().fromCallback;
  const fs22 = requireGracefulFs();
  const path3 = require$$1;
  const mkdir = requireMkdirs();
  const remove2 = requireRemove();
  const emptyDir = u(function emptyDir2(dir, callback) {
    callback = callback || function() {
    };
    fs22.readdir(dir, (err, items) => {
      if (err) return mkdir.mkdirs(dir, callback);
      items = items.map((item) => path3.join(dir, item));
      deleteItem();
      function deleteItem() {
        const item = items.pop();
        if (!item) return callback();
        remove2.remove(item, (err2) => {
          if (err2) return callback(err2);
          deleteItem();
        });
      }
    });
  });
  function emptyDirSync(dir) {
    let items;
    try {
      items = fs22.readdirSync(dir);
    } catch (err) {
      return mkdir.mkdirsSync(dir);
    }
    items.forEach((item) => {
      item = path3.join(dir, item);
      remove2.removeSync(item);
    });
  }
  empty = {
    emptyDirSync,
    emptydirSync: emptyDirSync,
    emptyDir,
    emptydir: emptyDir
  };
  return empty;
}
var file;
var hasRequiredFile$1;
function requireFile$1() {
  if (hasRequiredFile$1) return file;
  hasRequiredFile$1 = 1;
  const u = requireUniversalify().fromCallback;
  const path3 = require$$1;
  const fs22 = requireGracefulFs();
  const mkdir = requireMkdirs();
  const pathExists = requirePathExists().pathExists;
  function createFile(file2, callback) {
    function makeFile() {
      fs22.writeFile(file2, "", (err) => {
        if (err) return callback(err);
        callback();
      });
    }
    fs22.stat(file2, (err, stats) => {
      if (!err && stats.isFile()) return callback();
      const dir = path3.dirname(file2);
      pathExists(dir, (err2, dirExists) => {
        if (err2) return callback(err2);
        if (dirExists) return makeFile();
        mkdir.mkdirs(dir, (err3) => {
          if (err3) return callback(err3);
          makeFile();
        });
      });
    });
  }
  function createFileSync(file2) {
    let stats;
    try {
      stats = fs22.statSync(file2);
    } catch (e) {
    }
    if (stats && stats.isFile()) return;
    const dir = path3.dirname(file2);
    if (!fs22.existsSync(dir)) {
      mkdir.mkdirsSync(dir);
    }
    fs22.writeFileSync(file2, "");
  }
  file = {
    createFile: u(createFile),
    createFileSync
  };
  return file;
}
var link;
var hasRequiredLink;
function requireLink() {
  if (hasRequiredLink) return link;
  hasRequiredLink = 1;
  const u = requireUniversalify().fromCallback;
  const path3 = require$$1;
  const fs22 = requireGracefulFs();
  const mkdir = requireMkdirs();
  const pathExists = requirePathExists().pathExists;
  function createLink(srcpath, dstpath, callback) {
    function makeLink(srcpath2, dstpath2) {
      fs22.link(srcpath2, dstpath2, (err) => {
        if (err) return callback(err);
        callback(null);
      });
    }
    pathExists(dstpath, (err, destinationExists) => {
      if (err) return callback(err);
      if (destinationExists) return callback(null);
      fs22.lstat(srcpath, (err2) => {
        if (err2) {
          err2.message = err2.message.replace("lstat", "ensureLink");
          return callback(err2);
        }
        const dir = path3.dirname(dstpath);
        pathExists(dir, (err3, dirExists) => {
          if (err3) return callback(err3);
          if (dirExists) return makeLink(srcpath, dstpath);
          mkdir.mkdirs(dir, (err4) => {
            if (err4) return callback(err4);
            makeLink(srcpath, dstpath);
          });
        });
      });
    });
  }
  function createLinkSync(srcpath, dstpath) {
    const destinationExists = fs22.existsSync(dstpath);
    if (destinationExists) return void 0;
    try {
      fs22.lstatSync(srcpath);
    } catch (err) {
      err.message = err.message.replace("lstat", "ensureLink");
      throw err;
    }
    const dir = path3.dirname(dstpath);
    const dirExists = fs22.existsSync(dir);
    if (dirExists) return fs22.linkSync(srcpath, dstpath);
    mkdir.mkdirsSync(dir);
    return fs22.linkSync(srcpath, dstpath);
  }
  link = {
    createLink: u(createLink),
    createLinkSync
  };
  return link;
}
var symlinkPaths_1;
var hasRequiredSymlinkPaths;
function requireSymlinkPaths() {
  if (hasRequiredSymlinkPaths) return symlinkPaths_1;
  hasRequiredSymlinkPaths = 1;
  const path3 = require$$1;
  const fs22 = requireGracefulFs();
  const pathExists = requirePathExists().pathExists;
  function symlinkPaths(srcpath, dstpath, callback) {
    if (path3.isAbsolute(srcpath)) {
      return fs22.lstat(srcpath, (err) => {
        if (err) {
          err.message = err.message.replace("lstat", "ensureSymlink");
          return callback(err);
        }
        return callback(null, {
          "toCwd": srcpath,
          "toDst": srcpath
        });
      });
    } else {
      const dstdir = path3.dirname(dstpath);
      const relativeToDst = path3.join(dstdir, srcpath);
      return pathExists(relativeToDst, (err, exists) => {
        if (err) return callback(err);
        if (exists) {
          return callback(null, {
            "toCwd": relativeToDst,
            "toDst": srcpath
          });
        } else {
          return fs22.lstat(srcpath, (err2) => {
            if (err2) {
              err2.message = err2.message.replace("lstat", "ensureSymlink");
              return callback(err2);
            }
            return callback(null, {
              "toCwd": srcpath,
              "toDst": path3.relative(dstdir, srcpath)
            });
          });
        }
      });
    }
  }
  function symlinkPathsSync(srcpath, dstpath) {
    let exists;
    if (path3.isAbsolute(srcpath)) {
      exists = fs22.existsSync(srcpath);
      if (!exists) throw new Error("absolute srcpath does not exist");
      return {
        "toCwd": srcpath,
        "toDst": srcpath
      };
    } else {
      const dstdir = path3.dirname(dstpath);
      const relativeToDst = path3.join(dstdir, srcpath);
      exists = fs22.existsSync(relativeToDst);
      if (exists) {
        return {
          "toCwd": relativeToDst,
          "toDst": srcpath
        };
      } else {
        exists = fs22.existsSync(srcpath);
        if (!exists) throw new Error("relative srcpath does not exist");
        return {
          "toCwd": srcpath,
          "toDst": path3.relative(dstdir, srcpath)
        };
      }
    }
  }
  symlinkPaths_1 = {
    symlinkPaths,
    symlinkPathsSync
  };
  return symlinkPaths_1;
}
var symlinkType_1;
var hasRequiredSymlinkType;
function requireSymlinkType() {
  if (hasRequiredSymlinkType) return symlinkType_1;
  hasRequiredSymlinkType = 1;
  const fs22 = requireGracefulFs();
  function symlinkType(srcpath, type, callback) {
    callback = typeof type === "function" ? type : callback;
    type = typeof type === "function" ? false : type;
    if (type) return callback(null, type);
    fs22.lstat(srcpath, (err, stats) => {
      if (err) return callback(null, "file");
      type = stats && stats.isDirectory() ? "dir" : "file";
      callback(null, type);
    });
  }
  function symlinkTypeSync(srcpath, type) {
    let stats;
    if (type) return type;
    try {
      stats = fs22.lstatSync(srcpath);
    } catch (e) {
      return "file";
    }
    return stats && stats.isDirectory() ? "dir" : "file";
  }
  symlinkType_1 = {
    symlinkType,
    symlinkTypeSync
  };
  return symlinkType_1;
}
var symlink;
var hasRequiredSymlink;
function requireSymlink() {
  if (hasRequiredSymlink) return symlink;
  hasRequiredSymlink = 1;
  const u = requireUniversalify().fromCallback;
  const path3 = require$$1;
  const fs22 = requireGracefulFs();
  const _mkdirs = requireMkdirs();
  const mkdirs = _mkdirs.mkdirs;
  const mkdirsSync = _mkdirs.mkdirsSync;
  const _symlinkPaths = requireSymlinkPaths();
  const symlinkPaths = _symlinkPaths.symlinkPaths;
  const symlinkPathsSync = _symlinkPaths.symlinkPathsSync;
  const _symlinkType = requireSymlinkType();
  const symlinkType = _symlinkType.symlinkType;
  const symlinkTypeSync = _symlinkType.symlinkTypeSync;
  const pathExists = requirePathExists().pathExists;
  function createSymlink(srcpath, dstpath, type, callback) {
    callback = typeof type === "function" ? type : callback;
    type = typeof type === "function" ? false : type;
    pathExists(dstpath, (err, destinationExists) => {
      if (err) return callback(err);
      if (destinationExists) return callback(null);
      symlinkPaths(srcpath, dstpath, (err2, relative) => {
        if (err2) return callback(err2);
        srcpath = relative.toDst;
        symlinkType(relative.toCwd, type, (err3, type2) => {
          if (err3) return callback(err3);
          const dir = path3.dirname(dstpath);
          pathExists(dir, (err4, dirExists) => {
            if (err4) return callback(err4);
            if (dirExists) return fs22.symlink(srcpath, dstpath, type2, callback);
            mkdirs(dir, (err5) => {
              if (err5) return callback(err5);
              fs22.symlink(srcpath, dstpath, type2, callback);
            });
          });
        });
      });
    });
  }
  function createSymlinkSync(srcpath, dstpath, type) {
    const destinationExists = fs22.existsSync(dstpath);
    if (destinationExists) return void 0;
    const relative = symlinkPathsSync(srcpath, dstpath);
    srcpath = relative.toDst;
    type = symlinkTypeSync(relative.toCwd, type);
    const dir = path3.dirname(dstpath);
    const exists = fs22.existsSync(dir);
    if (exists) return fs22.symlinkSync(srcpath, dstpath, type);
    mkdirsSync(dir);
    return fs22.symlinkSync(srcpath, dstpath, type);
  }
  symlink = {
    createSymlink: u(createSymlink),
    createSymlinkSync
  };
  return symlink;
}
var ensure;
var hasRequiredEnsure;
function requireEnsure() {
  if (hasRequiredEnsure) return ensure;
  hasRequiredEnsure = 1;
  const file2 = requireFile$1();
  const link2 = requireLink();
  const symlink2 = requireSymlink();
  ensure = {
    // file
    createFile: file2.createFile,
    createFileSync: file2.createFileSync,
    ensureFile: file2.createFile,
    ensureFileSync: file2.createFileSync,
    // link
    createLink: link2.createLink,
    createLinkSync: link2.createLinkSync,
    ensureLink: link2.createLink,
    ensureLinkSync: link2.createLinkSync,
    // symlink
    createSymlink: symlink2.createSymlink,
    createSymlinkSync: symlink2.createSymlinkSync,
    ensureSymlink: symlink2.createSymlink,
    ensureSymlinkSync: symlink2.createSymlinkSync
  };
  return ensure;
}
var jsonfile_1;
var hasRequiredJsonfile$1;
function requireJsonfile$1() {
  if (hasRequiredJsonfile$1) return jsonfile_1;
  hasRequiredJsonfile$1 = 1;
  var _fs;
  try {
    _fs = requireGracefulFs();
  } catch (_) {
    _fs = require$$1$2;
  }
  function readFile(file2, options, callback) {
    if (callback == null) {
      callback = options;
      options = {};
    }
    if (typeof options === "string") {
      options = { encoding: options };
    }
    options = options || {};
    var fs22 = options.fs || _fs;
    var shouldThrow = true;
    if ("throws" in options) {
      shouldThrow = options.throws;
    }
    fs22.readFile(file2, options, function(err, data2) {
      if (err) return callback(err);
      data2 = stripBom(data2);
      var obj;
      try {
        obj = JSON.parse(data2, options ? options.reviver : null);
      } catch (err2) {
        if (shouldThrow) {
          err2.message = file2 + ": " + err2.message;
          return callback(err2);
        } else {
          return callback(null, null);
        }
      }
      callback(null, obj);
    });
  }
  function readFileSync(file2, options) {
    options = options || {};
    if (typeof options === "string") {
      options = { encoding: options };
    }
    var fs22 = options.fs || _fs;
    var shouldThrow = true;
    if ("throws" in options) {
      shouldThrow = options.throws;
    }
    try {
      var content = fs22.readFileSync(file2, options);
      content = stripBom(content);
      return JSON.parse(content, options.reviver);
    } catch (err) {
      if (shouldThrow) {
        err.message = file2 + ": " + err.message;
        throw err;
      } else {
        return null;
      }
    }
  }
  function stringify(obj, options) {
    var spaces;
    var EOL = "\n";
    if (typeof options === "object" && options !== null) {
      if (options.spaces) {
        spaces = options.spaces;
      }
      if (options.EOL) {
        EOL = options.EOL;
      }
    }
    var str = JSON.stringify(obj, options ? options.replacer : null, spaces);
    return str.replace(/\n/g, EOL) + EOL;
  }
  function writeFile(file2, obj, options, callback) {
    if (callback == null) {
      callback = options;
      options = {};
    }
    options = options || {};
    var fs22 = options.fs || _fs;
    var str = "";
    try {
      str = stringify(obj, options);
    } catch (err) {
      if (callback) callback(err, null);
      return;
    }
    fs22.writeFile(file2, str, options, callback);
  }
  function writeFileSync(file2, obj, options) {
    options = options || {};
    var fs22 = options.fs || _fs;
    var str = stringify(obj, options);
    return fs22.writeFileSync(file2, str, options);
  }
  function stripBom(content) {
    if (Buffer.isBuffer(content)) content = content.toString("utf8");
    content = content.replace(/^\uFEFF/, "");
    return content;
  }
  var jsonfile2 = {
    readFile,
    readFileSync,
    writeFile,
    writeFileSync
  };
  jsonfile_1 = jsonfile2;
  return jsonfile_1;
}
var jsonfile;
var hasRequiredJsonfile;
function requireJsonfile() {
  if (hasRequiredJsonfile) return jsonfile;
  hasRequiredJsonfile = 1;
  const u = requireUniversalify().fromCallback;
  const jsonFile = requireJsonfile$1();
  jsonfile = {
    // jsonfile exports
    readJson: u(jsonFile.readFile),
    readJsonSync: jsonFile.readFileSync,
    writeJson: u(jsonFile.writeFile),
    writeJsonSync: jsonFile.writeFileSync
  };
  return jsonfile;
}
var outputJson_1;
var hasRequiredOutputJson;
function requireOutputJson() {
  if (hasRequiredOutputJson) return outputJson_1;
  hasRequiredOutputJson = 1;
  const path3 = require$$1;
  const mkdir = requireMkdirs();
  const pathExists = requirePathExists().pathExists;
  const jsonFile = requireJsonfile();
  function outputJson(file2, data2, options, callback) {
    if (typeof options === "function") {
      callback = options;
      options = {};
    }
    const dir = path3.dirname(file2);
    pathExists(dir, (err, itDoes) => {
      if (err) return callback(err);
      if (itDoes) return jsonFile.writeJson(file2, data2, options, callback);
      mkdir.mkdirs(dir, (err2) => {
        if (err2) return callback(err2);
        jsonFile.writeJson(file2, data2, options, callback);
      });
    });
  }
  outputJson_1 = outputJson;
  return outputJson_1;
}
var outputJsonSync_1;
var hasRequiredOutputJsonSync;
function requireOutputJsonSync() {
  if (hasRequiredOutputJsonSync) return outputJsonSync_1;
  hasRequiredOutputJsonSync = 1;
  const fs22 = requireGracefulFs();
  const path3 = require$$1;
  const mkdir = requireMkdirs();
  const jsonFile = requireJsonfile();
  function outputJsonSync(file2, data2, options) {
    const dir = path3.dirname(file2);
    if (!fs22.existsSync(dir)) {
      mkdir.mkdirsSync(dir);
    }
    jsonFile.writeJsonSync(file2, data2, options);
  }
  outputJsonSync_1 = outputJsonSync;
  return outputJsonSync_1;
}
var json;
var hasRequiredJson;
function requireJson() {
  if (hasRequiredJson) return json;
  hasRequiredJson = 1;
  const u = requireUniversalify().fromCallback;
  const jsonFile = requireJsonfile();
  jsonFile.outputJson = u(requireOutputJson());
  jsonFile.outputJsonSync = requireOutputJsonSync();
  jsonFile.outputJSON = jsonFile.outputJson;
  jsonFile.outputJSONSync = jsonFile.outputJsonSync;
  jsonFile.writeJSON = jsonFile.writeJson;
  jsonFile.writeJSONSync = jsonFile.writeJsonSync;
  jsonFile.readJSON = jsonFile.readJson;
  jsonFile.readJSONSync = jsonFile.readJsonSync;
  json = jsonFile;
  return json;
}
var moveSync_1;
var hasRequiredMoveSync$1;
function requireMoveSync$1() {
  if (hasRequiredMoveSync$1) return moveSync_1;
  hasRequiredMoveSync$1 = 1;
  const fs22 = requireGracefulFs();
  const path3 = require$$1;
  const copySync2 = requireCopySync().copySync;
  const removeSync = requireRemove().removeSync;
  const mkdirpSync = requireMkdirs().mkdirpSync;
  const stat2 = requireStat();
  function moveSync2(src, dest, opts) {
    opts = opts || {};
    const overwrite = opts.overwrite || opts.clobber || false;
    const { srcStat } = stat2.checkPathsSync(src, dest, "move");
    stat2.checkParentPathsSync(src, srcStat, dest, "move");
    mkdirpSync(path3.dirname(dest));
    return doRename(src, dest, overwrite);
  }
  function doRename(src, dest, overwrite) {
    if (overwrite) {
      removeSync(dest);
      return rename(src, dest, overwrite);
    }
    if (fs22.existsSync(dest)) throw new Error("dest already exists.");
    return rename(src, dest, overwrite);
  }
  function rename(src, dest, overwrite) {
    try {
      fs22.renameSync(src, dest);
    } catch (err) {
      if (err.code !== "EXDEV") throw err;
      return moveAcrossDevice(src, dest, overwrite);
    }
  }
  function moveAcrossDevice(src, dest, overwrite) {
    const opts = {
      overwrite,
      errorOnExist: true
    };
    copySync2(src, dest, opts);
    return removeSync(src);
  }
  moveSync_1 = moveSync2;
  return moveSync_1;
}
var moveSync;
var hasRequiredMoveSync;
function requireMoveSync() {
  if (hasRequiredMoveSync) return moveSync;
  hasRequiredMoveSync = 1;
  moveSync = {
    moveSync: requireMoveSync$1()
  };
  return moveSync;
}
var move_1;
var hasRequiredMove$1;
function requireMove$1() {
  if (hasRequiredMove$1) return move_1;
  hasRequiredMove$1 = 1;
  const fs22 = requireGracefulFs();
  const path3 = require$$1;
  const copy2 = requireCopy().copy;
  const remove2 = requireRemove().remove;
  const mkdirp = requireMkdirs().mkdirp;
  const pathExists = requirePathExists().pathExists;
  const stat2 = requireStat();
  function move2(src, dest, opts, cb) {
    if (typeof opts === "function") {
      cb = opts;
      opts = {};
    }
    const overwrite = opts.overwrite || opts.clobber || false;
    stat2.checkPaths(src, dest, "move", (err, stats) => {
      if (err) return cb(err);
      const { srcStat } = stats;
      stat2.checkParentPaths(src, srcStat, dest, "move", (err2) => {
        if (err2) return cb(err2);
        mkdirp(path3.dirname(dest), (err3) => {
          if (err3) return cb(err3);
          return doRename(src, dest, overwrite, cb);
        });
      });
    });
  }
  function doRename(src, dest, overwrite, cb) {
    if (overwrite) {
      return remove2(dest, (err) => {
        if (err) return cb(err);
        return rename(src, dest, overwrite, cb);
      });
    }
    pathExists(dest, (err, destExists) => {
      if (err) return cb(err);
      if (destExists) return cb(new Error("dest already exists."));
      return rename(src, dest, overwrite, cb);
    });
  }
  function rename(src, dest, overwrite, cb) {
    fs22.rename(src, dest, (err) => {
      if (!err) return cb();
      if (err.code !== "EXDEV") return cb(err);
      return moveAcrossDevice(src, dest, overwrite, cb);
    });
  }
  function moveAcrossDevice(src, dest, overwrite, cb) {
    const opts = {
      overwrite,
      errorOnExist: true
    };
    copy2(src, dest, opts, (err) => {
      if (err) return cb(err);
      return remove2(src, cb);
    });
  }
  move_1 = move2;
  return move_1;
}
var move;
var hasRequiredMove;
function requireMove() {
  if (hasRequiredMove) return move;
  hasRequiredMove = 1;
  const u = requireUniversalify().fromCallback;
  move = {
    move: u(requireMove$1())
  };
  return move;
}
var output;
var hasRequiredOutput;
function requireOutput() {
  if (hasRequiredOutput) return output;
  hasRequiredOutput = 1;
  const u = requireUniversalify().fromCallback;
  const fs22 = requireGracefulFs();
  const path3 = require$$1;
  const mkdir = requireMkdirs();
  const pathExists = requirePathExists().pathExists;
  function outputFile(file2, data2, encoding, callback) {
    if (typeof encoding === "function") {
      callback = encoding;
      encoding = "utf8";
    }
    const dir = path3.dirname(file2);
    pathExists(dir, (err, itDoes) => {
      if (err) return callback(err);
      if (itDoes) return fs22.writeFile(file2, data2, encoding, callback);
      mkdir.mkdirs(dir, (err2) => {
        if (err2) return callback(err2);
        fs22.writeFile(file2, data2, encoding, callback);
      });
    });
  }
  function outputFileSync(file2, ...args) {
    const dir = path3.dirname(file2);
    if (fs22.existsSync(dir)) {
      return fs22.writeFileSync(file2, ...args);
    }
    mkdir.mkdirsSync(dir);
    fs22.writeFileSync(file2, ...args);
  }
  output = {
    outputFile: u(outputFile),
    outputFileSync
  };
  return output;
}
var hasRequiredLib$1;
function requireLib$1() {
  if (hasRequiredLib$1) return lib$1.exports;
  hasRequiredLib$1 = 1;
  (function(module) {
    module.exports = Object.assign(
      {},
      // Export promiseified graceful-fs:
      requireFs(),
      // Export extra methods:
      requireCopySync(),
      requireCopy(),
      requireEmpty(),
      requireEnsure(),
      requireJson(),
      requireMkdirs(),
      requireMoveSync(),
      requireMove(),
      requireOutput(),
      requirePathExists(),
      requireRemove()
    );
    const fs22 = require$$1$2;
    if (Object.getOwnPropertyDescriptor(fs22, "promises")) {
      Object.defineProperty(module.exports, "promises", {
        get() {
          return fs22.promises;
        }
      });
    }
  })(lib$1);
  return lib$1.exports;
}
var now;
var hasRequiredNow;
function requireNow() {
  if (hasRequiredNow) return now;
  hasRequiredNow = 1;
  now = () => /* @__PURE__ */ new Date();
  return now;
}
var fileNameFormatter;
var hasRequiredFileNameFormatter;
function requireFileNameFormatter() {
  if (hasRequiredFileNameFormatter) return fileNameFormatter;
  hasRequiredFileNameFormatter = 1;
  const debug = requireBrowser()("streamroller:fileNameFormatter");
  const path3 = require$$1;
  const ZIP_EXT = ".gz";
  const DEFAULT_FILENAME_SEP = ".";
  fileNameFormatter = ({
    file: file2,
    keepFileExt,
    needsIndex,
    alwaysIncludeDate,
    compress,
    fileNameSep
  }) => {
    let FILENAME_SEP = fileNameSep || DEFAULT_FILENAME_SEP;
    const dirAndName = path3.join(file2.dir, file2.name);
    const ext = (f) => f + file2.ext;
    const index = (f, i, d) => (needsIndex || !d) && i ? f + FILENAME_SEP + i : f;
    const date = (f, i, d) => {
      return (i > 0 || alwaysIncludeDate) && d ? f + FILENAME_SEP + d : f;
    };
    const gzip = (f, i) => i && compress ? f + ZIP_EXT : f;
    const parts = keepFileExt ? [date, index, ext, gzip] : [ext, date, index, gzip];
    return ({ date: date2, index: index2 }) => {
      debug(`_formatFileName: date=${date2}, index=${index2}`);
      return parts.reduce(
        (filename, part) => part(filename, index2, date2),
        dirAndName
      );
    };
  };
  return fileNameFormatter;
}
var fileNameParser;
var hasRequiredFileNameParser;
function requireFileNameParser() {
  if (hasRequiredFileNameParser) return fileNameParser;
  hasRequiredFileNameParser = 1;
  const debug = requireBrowser()("streamroller:fileNameParser");
  const ZIP_EXT = ".gz";
  const format = requireLib$2();
  const DEFAULT_FILENAME_SEP = ".";
  fileNameParser = ({ file: file2, keepFileExt, pattern, fileNameSep }) => {
    let FILENAME_SEP = fileNameSep || DEFAULT_FILENAME_SEP;
    const zip = (f, p) => {
      if (f.endsWith(ZIP_EXT)) {
        debug("it is gzipped");
        p.isCompressed = true;
        return f.slice(0, -1 * ZIP_EXT.length);
      }
      return f;
    };
    const __NOT_MATCHING__ = "__NOT_MATCHING__";
    const extAtEnd = (f) => {
      if (f.startsWith(file2.name) && f.endsWith(file2.ext)) {
        debug("it starts and ends with the right things");
        return f.slice(file2.name.length + 1, -1 * file2.ext.length);
      }
      return __NOT_MATCHING__;
    };
    const extInMiddle = (f) => {
      if (f.startsWith(file2.base)) {
        debug("it starts with the right things");
        return f.slice(file2.base.length + 1);
      }
      return __NOT_MATCHING__;
    };
    const dateAndIndex = (f, p) => {
      const items = f.split(FILENAME_SEP);
      let indexStr = items[items.length - 1];
      debug("items: ", items, ", indexStr: ", indexStr);
      let dateStr = f;
      if (indexStr !== void 0 && indexStr.match(/^\d+$/)) {
        dateStr = f.slice(0, -1 * (indexStr.length + 1));
        debug(`dateStr is ${dateStr}`);
        if (pattern && !dateStr) {
          dateStr = indexStr;
          indexStr = "0";
        }
      } else {
        indexStr = "0";
      }
      try {
        const date = format.parse(pattern, dateStr, new Date(0, 0));
        if (format.asString(pattern, date) !== dateStr) return f;
        p.index = parseInt(indexStr, 10);
        p.date = dateStr;
        p.timestamp = date.getTime();
        return "";
      } catch (e) {
        debug(`Problem parsing ${dateStr} as ${pattern}, error was: `, e);
        return f;
      }
    };
    const index = (f, p) => {
      if (f.match(/^\d+$/)) {
        debug("it has an index");
        p.index = parseInt(f, 10);
        return "";
      }
      return f;
    };
    let parts = [
      zip,
      keepFileExt ? extAtEnd : extInMiddle,
      pattern ? dateAndIndex : index
    ];
    return (filename) => {
      let result = { filename, index: 0, isCompressed: false };
      let whatsLeftOver = parts.reduce(
        (remains, part) => part(remains, result),
        filename
      );
      return whatsLeftOver ? null : result;
    };
  };
  return fileNameParser;
}
var moveAndMaybeCompressFile_1;
var hasRequiredMoveAndMaybeCompressFile;
function requireMoveAndMaybeCompressFile() {
  if (hasRequiredMoveAndMaybeCompressFile) return moveAndMaybeCompressFile_1;
  hasRequiredMoveAndMaybeCompressFile = 1;
  const debug = requireBrowser()("streamroller:moveAndMaybeCompressFile");
  const fs22 = requireLib$1();
  const zlib2 = zlib;
  const _parseOption = function(rawOptions) {
    const defaultOptions = {
      mode: parseInt("0600", 8),
      compress: false
    };
    const options = Object.assign({}, defaultOptions, rawOptions);
    debug(`_parseOption: moveAndMaybeCompressFile called with option=${JSON.stringify(options)}`);
    return options;
  };
  const moveAndMaybeCompressFile = async (sourceFilePath, targetFilePath, options) => {
    options = _parseOption(options);
    if (sourceFilePath === targetFilePath) {
      debug(`moveAndMaybeCompressFile: source and target are the same, not doing anything`);
      return;
    }
    if (await fs22.pathExists(sourceFilePath)) {
      debug(
        `moveAndMaybeCompressFile: moving file from ${sourceFilePath} to ${targetFilePath} ${options.compress ? "with" : "without"} compress`
      );
      if (options.compress) {
        await new Promise((resolve, reject) => {
          let isCreated = false;
          const writeStream = fs22.createWriteStream(targetFilePath, { mode: options.mode, flags: "wx" }).on("open", () => {
            isCreated = true;
            const readStream3 = fs22.createReadStream(sourceFilePath).on("open", () => {
              readStream3.pipe(zlib2.createGzip()).pipe(writeStream);
            }).on("error", (e) => {
              debug(`moveAndMaybeCompressFile: error reading ${sourceFilePath}`, e);
              writeStream.destroy(e);
            });
          }).on("finish", () => {
            debug(`moveAndMaybeCompressFile: finished compressing ${targetFilePath}, deleting ${sourceFilePath}`);
            fs22.unlink(sourceFilePath).then(resolve).catch((e) => {
              debug(`moveAndMaybeCompressFile: error deleting ${sourceFilePath}, truncating instead`, e);
              fs22.truncate(sourceFilePath).then(resolve).catch((e2) => {
                debug(`moveAndMaybeCompressFile: error truncating ${sourceFilePath}`, e2);
                reject(e2);
              });
            });
          }).on("error", (e) => {
            if (!isCreated) {
              debug(`moveAndMaybeCompressFile: error creating ${targetFilePath}`, e);
              reject(e);
            } else {
              debug(`moveAndMaybeCompressFile: error writing ${targetFilePath}, deleting`, e);
              fs22.unlink(targetFilePath).then(() => {
                reject(e);
              }).catch((e2) => {
                debug(`moveAndMaybeCompressFile: error deleting ${targetFilePath}`, e2);
                reject(e2);
              });
            }
          });
        }).catch(() => {
        });
      } else {
        debug(`moveAndMaybeCompressFile: renaming ${sourceFilePath} to ${targetFilePath}`);
        try {
          await fs22.move(sourceFilePath, targetFilePath, { overwrite: true });
        } catch (e) {
          debug(`moveAndMaybeCompressFile: error renaming ${sourceFilePath} to ${targetFilePath}`, e);
          if (e.code !== "ENOENT") {
            debug(`moveAndMaybeCompressFile: trying copy+truncate instead`);
            try {
              await fs22.copy(sourceFilePath, targetFilePath, { overwrite: true });
              await fs22.truncate(sourceFilePath);
            } catch (e2) {
              debug(`moveAndMaybeCompressFile: error copy+truncate`, e2);
            }
          }
        }
      }
    }
  };
  moveAndMaybeCompressFile_1 = moveAndMaybeCompressFile;
  return moveAndMaybeCompressFile_1;
}
var RollingFileWriteStream_1;
var hasRequiredRollingFileWriteStream;
function requireRollingFileWriteStream() {
  if (hasRequiredRollingFileWriteStream) return RollingFileWriteStream_1;
  hasRequiredRollingFileWriteStream = 1;
  const debug = requireBrowser()("streamroller:RollingFileWriteStream");
  const fs22 = requireLib$1();
  const path3 = require$$1;
  const os = require$$1$1;
  const newNow = requireNow();
  const format = requireLib$2();
  const { Writable } = stream3;
  const fileNameFormatter2 = requireFileNameFormatter();
  const fileNameParser2 = requireFileNameParser();
  const moveAndMaybeCompressFile = requireMoveAndMaybeCompressFile();
  const deleteFiles = (fileNames) => {
    debug(`deleteFiles: files to delete: ${fileNames}`);
    return Promise.all(fileNames.map((f) => fs22.unlink(f).catch((e) => {
      debug(`deleteFiles: error when unlinking ${f}, ignoring. Error was ${e}`);
    })));
  };
  class RollingFileWriteStream extends Writable {
    /**
     * Create a RollingFileWriteStream
     * @constructor
     * @param {string} filePath - The file path to write.
     * @param {object} options - The extra options
     * @param {number} options.numToKeep - The max numbers of files to keep.
     * @param {number} options.maxSize - The maxSize one file can reach. Unit is Byte.
     *                                   This should be more than 1024. The default is 0.
     *                                   If not specified or 0, then no log rolling will happen.
     * @param {string} options.mode - The mode of the files. The default is '0600'. Refer to stream.writable for more.
     * @param {string} options.flags - The default is 'a'. Refer to stream.flags for more.
     * @param {boolean} options.compress - Whether to compress backup files.
     * @param {boolean} options.keepFileExt - Whether to keep the file extension.
     * @param {string} options.pattern - The date string pattern in the file name.
     * @param {boolean} options.alwaysIncludePattern - Whether to add date to the name of the first file.
     */
    constructor(filePath, options) {
      debug(`constructor: creating RollingFileWriteStream. path=${filePath}`);
      if (typeof filePath !== "string" || filePath.length === 0) {
        throw new Error(`Invalid filename: ${filePath}`);
      } else if (filePath.endsWith(path3.sep)) {
        throw new Error(`Filename is a directory: ${filePath}`);
      } else if (filePath.indexOf(`~${path3.sep}`) === 0) {
        filePath = filePath.replace("~", os.homedir());
      }
      super(options);
      this.options = this._parseOption(options);
      this.fileObject = path3.parse(filePath);
      if (this.fileObject.dir === "") {
        this.fileObject = path3.parse(path3.join(process.cwd(), filePath));
      }
      this.fileFormatter = fileNameFormatter2({
        file: this.fileObject,
        alwaysIncludeDate: this.options.alwaysIncludePattern,
        needsIndex: this.options.maxSize < Number.MAX_SAFE_INTEGER,
        compress: this.options.compress,
        keepFileExt: this.options.keepFileExt,
        fileNameSep: this.options.fileNameSep
      });
      this.fileNameParser = fileNameParser2({
        file: this.fileObject,
        keepFileExt: this.options.keepFileExt,
        pattern: this.options.pattern,
        fileNameSep: this.options.fileNameSep
      });
      this.state = {
        currentSize: 0
      };
      if (this.options.pattern) {
        this.state.currentDate = format(this.options.pattern, newNow());
      }
      this.filename = this.fileFormatter({
        index: 0,
        date: this.state.currentDate
      });
      if (["a", "a+", "as", "as+"].includes(this.options.flags)) {
        this._setExistingSizeAndDate();
      }
      debug(
        `constructor: create new file ${this.filename}, state=${JSON.stringify(
          this.state
        )}`
      );
      this._renewWriteStream();
    }
    _setExistingSizeAndDate() {
      try {
        const stats = fs22.statSync(this.filename);
        this.state.currentSize = stats.size;
        if (this.options.pattern) {
          this.state.currentDate = format(this.options.pattern, stats.mtime);
        }
      } catch (e) {
        return;
      }
    }
    _parseOption(rawOptions) {
      const defaultOptions = {
        maxSize: 0,
        numToKeep: Number.MAX_SAFE_INTEGER,
        encoding: "utf8",
        mode: parseInt("0600", 8),
        flags: "a",
        compress: false,
        keepFileExt: false,
        alwaysIncludePattern: false
      };
      const options = Object.assign({}, defaultOptions, rawOptions);
      if (!options.maxSize) {
        delete options.maxSize;
      } else if (options.maxSize <= 0) {
        throw new Error(`options.maxSize (${options.maxSize}) should be > 0`);
      }
      if (options.numBackups || options.numBackups === 0) {
        if (options.numBackups < 0) {
          throw new Error(`options.numBackups (${options.numBackups}) should be >= 0`);
        } else if (options.numBackups >= Number.MAX_SAFE_INTEGER) {
          throw new Error(`options.numBackups (${options.numBackups}) should be < Number.MAX_SAFE_INTEGER`);
        } else {
          options.numToKeep = options.numBackups + 1;
        }
      } else if (options.numToKeep <= 0) {
        throw new Error(`options.numToKeep (${options.numToKeep}) should be > 0`);
      }
      debug(
        `_parseOption: creating stream with option=${JSON.stringify(options)}`
      );
      return options;
    }
    _final(callback) {
      this.currentFileStream.end("", this.options.encoding, callback);
    }
    _write(chunk, encoding, callback) {
      this._shouldRoll().then(() => {
        debug(
          `_write: writing chunk. file=${this.currentFileStream.path} state=${JSON.stringify(this.state)} chunk=${chunk}`
        );
        this.currentFileStream.write(chunk, encoding, (e) => {
          this.state.currentSize += chunk.length;
          callback(e);
        });
      });
    }
    async _shouldRoll() {
      if (this._dateChanged() || this._tooBig()) {
        debug(
          `_shouldRoll: rolling because dateChanged? ${this._dateChanged()} or tooBig? ${this._tooBig()}`
        );
        await this._roll();
      }
    }
    _dateChanged() {
      return this.state.currentDate && this.state.currentDate !== format(this.options.pattern, newNow());
    }
    _tooBig() {
      return this.state.currentSize >= this.options.maxSize;
    }
    _roll() {
      debug(`_roll: closing the current stream`);
      return new Promise((resolve, reject) => {
        this.currentFileStream.end("", this.options.encoding, () => {
          this._moveOldFiles().then(resolve).catch(reject);
        });
      });
    }
    async _moveOldFiles() {
      const files = await this._getExistingFiles();
      const todaysFiles = this.state.currentDate ? files.filter((f) => f.date === this.state.currentDate) : files;
      for (let i = todaysFiles.length; i >= 0; i--) {
        debug(`_moveOldFiles: i = ${i}`);
        const sourceFilePath = this.fileFormatter({
          date: this.state.currentDate,
          index: i
        });
        const targetFilePath = this.fileFormatter({
          date: this.state.currentDate,
          index: i + 1
        });
        const moveAndCompressOptions = {
          compress: this.options.compress && i === 0,
          mode: this.options.mode
        };
        await moveAndMaybeCompressFile(
          sourceFilePath,
          targetFilePath,
          moveAndCompressOptions
        );
      }
      this.state.currentSize = 0;
      this.state.currentDate = this.state.currentDate ? format(this.options.pattern, newNow()) : null;
      debug(
        `_moveOldFiles: finished rolling files. state=${JSON.stringify(
          this.state
        )}`
      );
      this._renewWriteStream();
      await new Promise((resolve, reject) => {
        this.currentFileStream.write("", "utf8", () => {
          this._clean().then(resolve).catch(reject);
        });
      });
    }
    // Sorted from the oldest to the latest
    async _getExistingFiles() {
      const files = await fs22.readdir(this.fileObject.dir).catch(
        /* istanbul ignore next: will not happen on windows */
        () => []
      );
      debug(`_getExistingFiles: files=${files}`);
      const existingFileDetails = files.map((n) => this.fileNameParser(n)).filter((n) => n);
      const getKey = (n) => (n.timestamp ? n.timestamp : newNow().getTime()) - n.index;
      existingFileDetails.sort((a, b) => getKey(a) - getKey(b));
      return existingFileDetails;
    }
    _renewWriteStream() {
      const filePath = this.fileFormatter({
        date: this.state.currentDate,
        index: 0
      });
      const mkdir = (dir) => {
        try {
          return fs22.mkdirSync(dir, { recursive: true });
        } catch (e) {
          if (e.code === "ENOENT") {
            mkdir(path3.dirname(dir));
            return mkdir(dir);
          }
          if (e.code !== "EEXIST" && e.code !== "EROFS") {
            throw e;
          } else {
            try {
              if (fs22.statSync(dir).isDirectory()) {
                return dir;
              }
              throw e;
            } catch (err) {
              throw e;
            }
          }
        }
      };
      mkdir(this.fileObject.dir);
      const ops = {
        flags: this.options.flags,
        encoding: this.options.encoding,
        mode: this.options.mode
      };
      const renameKey = function(obj, oldKey, newKey) {
        obj[newKey] = obj[oldKey];
        delete obj[oldKey];
        return obj;
      };
      fs22.appendFileSync(filePath, "", renameKey({ ...ops }, "flags", "flag"));
      this.currentFileStream = fs22.createWriteStream(filePath, ops);
      this.currentFileStream.on("error", (e) => {
        this.emit("error", e);
      });
    }
    async _clean() {
      const existingFileDetails = await this._getExistingFiles();
      debug(
        `_clean: numToKeep = ${this.options.numToKeep}, existingFiles = ${existingFileDetails.length}`
      );
      debug("_clean: existing files are: ", existingFileDetails);
      if (this._tooManyFiles(existingFileDetails.length)) {
        const fileNamesToRemove = existingFileDetails.slice(0, existingFileDetails.length - this.options.numToKeep).map((f) => path3.format({ dir: this.fileObject.dir, base: f.filename }));
        await deleteFiles(fileNamesToRemove);
      }
    }
    _tooManyFiles(numFiles) {
      return this.options.numToKeep > 0 && numFiles > this.options.numToKeep;
    }
  }
  RollingFileWriteStream_1 = RollingFileWriteStream;
  return RollingFileWriteStream_1;
}
var RollingFileStream_1;
var hasRequiredRollingFileStream;
function requireRollingFileStream() {
  if (hasRequiredRollingFileStream) return RollingFileStream_1;
  hasRequiredRollingFileStream = 1;
  const RollingFileWriteStream = requireRollingFileWriteStream();
  class RollingFileStream extends RollingFileWriteStream {
    constructor(filename, size, backups, options) {
      if (!options) {
        options = {};
      }
      if (size) {
        options.maxSize = size;
      }
      if (!options.numBackups && options.numBackups !== 0) {
        if (!backups && backups !== 0) {
          backups = 1;
        }
        options.numBackups = backups;
      }
      super(filename, options);
      this.backups = options.numBackups;
      this.size = this.options.maxSize;
    }
    get theStream() {
      return this.currentFileStream;
    }
  }
  RollingFileStream_1 = RollingFileStream;
  return RollingFileStream_1;
}
var DateRollingFileStream_1;
var hasRequiredDateRollingFileStream;
function requireDateRollingFileStream() {
  if (hasRequiredDateRollingFileStream) return DateRollingFileStream_1;
  hasRequiredDateRollingFileStream = 1;
  const RollingFileWriteStream = requireRollingFileWriteStream();
  class DateRollingFileStream extends RollingFileWriteStream {
    constructor(filename, pattern, options) {
      if (pattern && typeof pattern === "object") {
        options = pattern;
        pattern = null;
      }
      if (!options) {
        options = {};
      }
      if (!pattern) {
        pattern = "yyyy-MM-dd";
      }
      options.pattern = pattern;
      if (!options.numBackups && options.numBackups !== 0) {
        if (!options.daysToKeep && options.daysToKeep !== 0) {
          options.daysToKeep = 1;
        } else {
          process.emitWarning(
            "options.daysToKeep is deprecated due to the confusion it causes when used together with file size rolling. Please use options.numBackups instead.",
            "DeprecationWarning",
            "streamroller-DEP0001"
          );
        }
        options.numBackups = options.daysToKeep;
      } else {
        options.daysToKeep = options.numBackups;
      }
      super(filename, options);
      this.mode = this.options.mode;
    }
    get theStream() {
      return this.currentFileStream;
    }
  }
  DateRollingFileStream_1 = DateRollingFileStream;
  return DateRollingFileStream_1;
}
var lib;
var hasRequiredLib;
function requireLib() {
  if (hasRequiredLib) return lib;
  hasRequiredLib = 1;
  lib = {
    RollingFileWriteStream: requireRollingFileWriteStream(),
    RollingFileStream: requireRollingFileStream(),
    DateRollingFileStream: requireDateRollingFileStream()
  };
  return lib;
}
var hasRequiredFile;
function requireFile() {
  if (hasRequiredFile) return file$1;
  hasRequiredFile = 1;
  const debug = requireBrowser()("log4js:file");
  const path3 = require$$1;
  const streams = requireLib();
  const os = require$$1$1;
  const eol = os.EOL;
  let mainSighupListenerStarted = false;
  const sighupListeners = /* @__PURE__ */ new Set();
  function mainSighupHandler() {
    sighupListeners.forEach((app2) => {
      app2.sighupHandler();
    });
  }
  function fileAppender(file2, layout, logSize, numBackups, options, timezoneOffset) {
    if (typeof file2 !== "string" || file2.length === 0) {
      throw new Error(`Invalid filename: ${file2}`);
    } else if (file2.endsWith(path3.sep)) {
      throw new Error(`Filename is a directory: ${file2}`);
    } else if (file2.indexOf(`~${path3.sep}`) === 0) {
      file2 = file2.replace("~", os.homedir());
    }
    file2 = path3.normalize(file2);
    numBackups = !numBackups && numBackups !== 0 ? 5 : numBackups;
    debug(
      "Creating file appender (",
      file2,
      ", ",
      logSize,
      ", ",
      numBackups,
      ", ",
      options,
      ", ",
      timezoneOffset,
      ")"
    );
    function openTheStream(filePath, fileSize, numFiles, opt) {
      const stream4 = new streams.RollingFileStream(
        filePath,
        fileSize,
        numFiles,
        opt
      );
      stream4.on("error", (err) => {
        console.error(
          "log4js.fileAppender - Writing to file %s, error happened ",
          filePath,
          err
        );
      });
      stream4.on("drain", () => {
        process.emit("log4js:pause", false);
      });
      return stream4;
    }
    let writer = openTheStream(file2, logSize, numBackups, options);
    const app2 = function(loggingEvent) {
      if (!writer.writable) {
        return;
      }
      if (options.removeColor === true) {
        const regex = /\x1b[[0-9;]*m/g;
        loggingEvent.data = loggingEvent.data.map((d) => {
          if (typeof d === "string") return d.replace(regex, "");
          return d;
        });
      }
      if (!writer.write(layout(loggingEvent, timezoneOffset) + eol, "utf8")) {
        process.emit("log4js:pause", true);
      }
    };
    app2.reopen = function() {
      writer.end(() => {
        writer = openTheStream(file2, logSize, numBackups, options);
      });
    };
    app2.sighupHandler = function() {
      debug("SIGHUP handler called.");
      app2.reopen();
    };
    app2.shutdown = function(complete) {
      sighupListeners.delete(app2);
      if (sighupListeners.size === 0 && mainSighupListenerStarted) {
        process.removeListener("SIGHUP", mainSighupHandler);
        mainSighupListenerStarted = false;
      }
      writer.end("", "utf-8", complete);
    };
    sighupListeners.add(app2);
    if (!mainSighupListenerStarted) {
      process.on("SIGHUP", mainSighupHandler);
      mainSighupListenerStarted = true;
    }
    return app2;
  }
  function configure2(config, layouts2) {
    let layout = layouts2.basicLayout;
    if (config.layout) {
      layout = layouts2.layout(config.layout.type, config.layout);
    }
    config.mode = config.mode || 384;
    return fileAppender(
      config.filename,
      layout,
      config.maxLogSize,
      config.backups,
      config,
      config.timezoneOffset
    );
  }
  file$1.configure = configure2;
  return file$1;
}
var dateFile = {};
var hasRequiredDateFile;
function requireDateFile() {
  if (hasRequiredDateFile) return dateFile;
  hasRequiredDateFile = 1;
  const streams = requireLib();
  const os = require$$1$1;
  const eol = os.EOL;
  function openTheStream(filename, pattern, options) {
    const stream4 = new streams.DateRollingFileStream(filename, pattern, options);
    stream4.on("error", (err) => {
      console.error(
        "log4js.dateFileAppender - Writing to file %s, error happened ",
        filename,
        err
      );
    });
    stream4.on("drain", () => {
      process.emit("log4js:pause", false);
    });
    return stream4;
  }
  function appender(filename, pattern, layout, options, timezoneOffset) {
    options.maxSize = options.maxLogSize;
    const writer = openTheStream(filename, pattern, options);
    const app2 = function(logEvent) {
      if (!writer.writable) {
        return;
      }
      if (!writer.write(layout(logEvent, timezoneOffset) + eol, "utf8")) {
        process.emit("log4js:pause", true);
      }
    };
    app2.shutdown = function(complete) {
      writer.end("", "utf-8", complete);
    };
    return app2;
  }
  function configure2(config, layouts2) {
    let layout = layouts2.basicLayout;
    if (config.layout) {
      layout = layouts2.layout(config.layout.type, config.layout);
    }
    if (!config.alwaysIncludePattern) {
      config.alwaysIncludePattern = false;
    }
    config.mode = config.mode || 384;
    return appender(
      config.filename,
      config.pattern,
      layout,
      config,
      config.timezoneOffset
    );
  }
  dateFile.configure = configure2;
  return dateFile;
}
var fileSync = {};
var hasRequiredFileSync;
function requireFileSync() {
  if (hasRequiredFileSync) return fileSync;
  hasRequiredFileSync = 1;
  const debug = requireBrowser()("log4js:fileSync");
  const path3 = require$$1;
  const fs22 = require$$1$2;
  const os = require$$1$1;
  const eol = os.EOL;
  function touchFile(file2, options) {
    const mkdir = (dir) => {
      try {
        return fs22.mkdirSync(dir, { recursive: true });
      } catch (e) {
        if (e.code === "ENOENT") {
          mkdir(path3.dirname(dir));
          return mkdir(dir);
        }
        if (e.code !== "EEXIST" && e.code !== "EROFS") {
          throw e;
        } else {
          try {
            if (fs22.statSync(dir).isDirectory()) {
              return dir;
            }
            throw e;
          } catch (err) {
            throw e;
          }
        }
      }
    };
    mkdir(path3.dirname(file2));
    fs22.appendFileSync(file2, "", { mode: options.mode, flag: options.flags });
  }
  class RollingFileSync {
    constructor(filename, maxLogSize, backups, options) {
      debug("In RollingFileStream");
      if (maxLogSize < 0) {
        throw new Error(`maxLogSize (${maxLogSize}) should be > 0`);
      }
      this.filename = filename;
      this.size = maxLogSize;
      this.backups = backups;
      this.options = options;
      this.currentSize = 0;
      function currentFileSize(file2) {
        let fileSize = 0;
        try {
          fileSize = fs22.statSync(file2).size;
        } catch (e) {
          touchFile(file2, options);
        }
        return fileSize;
      }
      this.currentSize = currentFileSize(this.filename);
    }
    shouldRoll() {
      debug(
        "should roll with current size %d, and max size %d",
        this.currentSize,
        this.size
      );
      return this.currentSize >= this.size;
    }
    roll(filename) {
      const that = this;
      const nameMatcher = new RegExp(`^${path3.basename(filename)}`);
      function justTheseFiles(item) {
        return nameMatcher.test(item);
      }
      function index(filename_) {
        return parseInt(filename_.slice(`${path3.basename(filename)}.`.length), 10) || 0;
      }
      function byIndex(a, b) {
        return index(a) - index(b);
      }
      function increaseFileIndex(fileToRename) {
        const idx = index(fileToRename);
        debug(`Index of ${fileToRename} is ${idx}`);
        if (that.backups === 0) {
          fs22.truncateSync(filename, 0);
        } else if (idx < that.backups) {
          try {
            fs22.unlinkSync(`${filename}.${idx + 1}`);
          } catch (e) {
          }
          debug(`Renaming ${fileToRename} -> ${filename}.${idx + 1}`);
          fs22.renameSync(
            path3.join(path3.dirname(filename), fileToRename),
            `${filename}.${idx + 1}`
          );
        }
      }
      function renameTheFiles() {
        debug("Renaming the old files");
        const files = fs22.readdirSync(path3.dirname(filename));
        files.filter(justTheseFiles).sort(byIndex).reverse().forEach(increaseFileIndex);
      }
      debug("Rolling, rolling, rolling");
      renameTheFiles();
    }
    // eslint-disable-next-line no-unused-vars
    write(chunk, encoding) {
      const that = this;
      function writeTheChunk() {
        debug("writing the chunk to the file");
        that.currentSize += chunk.length;
        fs22.appendFileSync(that.filename, chunk);
      }
      debug("in write");
      if (this.shouldRoll()) {
        this.currentSize = 0;
        this.roll(this.filename);
      }
      writeTheChunk();
    }
  }
  function fileAppender(file2, layout, logSize, numBackups, options, timezoneOffset) {
    if (typeof file2 !== "string" || file2.length === 0) {
      throw new Error(`Invalid filename: ${file2}`);
    } else if (file2.endsWith(path3.sep)) {
      throw new Error(`Filename is a directory: ${file2}`);
    } else if (file2.indexOf(`~${path3.sep}`) === 0) {
      file2 = file2.replace("~", os.homedir());
    }
    file2 = path3.normalize(file2);
    numBackups = !numBackups && numBackups !== 0 ? 5 : numBackups;
    debug(
      "Creating fileSync appender (",
      file2,
      ", ",
      logSize,
      ", ",
      numBackups,
      ", ",
      options,
      ", ",
      timezoneOffset,
      ")"
    );
    function openTheStream(filePath, fileSize, numFiles) {
      let stream4;
      if (fileSize) {
        stream4 = new RollingFileSync(filePath, fileSize, numFiles, options);
      } else {
        stream4 = ((f) => {
          touchFile(f, options);
          return {
            write(data2) {
              fs22.appendFileSync(f, data2);
            }
          };
        })(filePath);
      }
      return stream4;
    }
    const logFile = openTheStream(file2, logSize, numBackups);
    return (loggingEvent) => {
      logFile.write(layout(loggingEvent, timezoneOffset) + eol);
    };
  }
  function configure2(config, layouts2) {
    let layout = layouts2.basicLayout;
    if (config.layout) {
      layout = layouts2.layout(config.layout.type, config.layout);
    }
    const options = {
      flags: config.flags || "a",
      encoding: config.encoding || "utf8",
      mode: config.mode || 384
    };
    return fileAppender(
      config.filename,
      layout,
      config.maxLogSize,
      config.backups,
      options,
      config.timezoneOffset
    );
  }
  fileSync.configure = configure2;
  return fileSync;
}
var tcp = {};
var hasRequiredTcp;
function requireTcp() {
  if (hasRequiredTcp) return tcp;
  hasRequiredTcp = 1;
  const debug = requireBrowser()("log4js:tcp");
  const net = require$$1$3;
  function appender(config, layout) {
    let canWrite = false;
    const buffer2 = [];
    let socket;
    let shutdownAttempts = 3;
    let endMsg = "__LOG4JS__";
    function write(loggingEvent) {
      debug("Writing log event to socket");
      canWrite = socket.write(`${layout(loggingEvent)}${endMsg}`, "utf8");
    }
    function emptyBuffer() {
      let evt;
      debug("emptying buffer");
      while (evt = buffer2.shift()) {
        write(evt);
      }
    }
    function createSocket() {
      debug(
        `appender creating socket to ${config.host || "localhost"}:${config.port || 5e3}`
      );
      endMsg = `${config.endMsg || "__LOG4JS__"}`;
      socket = net.createConnection(
        config.port || 5e3,
        config.host || "localhost"
      );
      socket.on("connect", () => {
        debug("socket connected");
        emptyBuffer();
        canWrite = true;
      });
      socket.on("drain", () => {
        debug("drain event received, emptying buffer");
        canWrite = true;
        emptyBuffer();
      });
      socket.on("timeout", socket.end.bind(socket));
      socket.on("error", (e) => {
        debug("connection error", e);
        canWrite = false;
        emptyBuffer();
      });
      socket.on("close", createSocket);
    }
    createSocket();
    function log(loggingEvent) {
      if (canWrite) {
        write(loggingEvent);
      } else {
        debug("buffering log event because it cannot write at the moment");
        buffer2.push(loggingEvent);
      }
    }
    log.shutdown = function(cb) {
      debug("shutdown called");
      if (buffer2.length && shutdownAttempts) {
        debug("buffer has items, waiting 100ms to empty");
        shutdownAttempts -= 1;
        setTimeout(() => {
          log.shutdown(cb);
        }, 100);
      } else {
        socket.removeAllListeners("close");
        socket.end(cb);
      }
    };
    return log;
  }
  function configure2(config, layouts2) {
    debug(`configure with config = ${config}`);
    let layout = function(loggingEvent) {
      return loggingEvent.serialise();
    };
    if (config.layout) {
      layout = layouts2.layout(config.layout.type, config.layout);
    }
    return appender(config, layout);
  }
  tcp.configure = configure2;
  return tcp;
}
var hasRequiredAppenders;
function requireAppenders() {
  if (hasRequiredAppenders) return appenders.exports;
  hasRequiredAppenders = 1;
  const path3 = require$$1;
  const debug = requireBrowser()("log4js:appenders");
  const configuration2 = requireConfiguration();
  const clustering2 = requireClustering();
  const levels2 = requireLevels();
  const layouts2 = requireLayouts();
  const adapters22 = requireAdapters();
  const coreAppenders = /* @__PURE__ */ new Map();
  coreAppenders.set("console", requireConsole());
  coreAppenders.set("stdout", requireStdout());
  coreAppenders.set("stderr", requireStderr());
  coreAppenders.set("logLevelFilter", requireLogLevelFilter());
  coreAppenders.set("categoryFilter", requireCategoryFilter());
  coreAppenders.set("noLogFilter", requireNoLogFilter());
  coreAppenders.set("file", requireFile());
  coreAppenders.set("dateFile", requireDateFile());
  coreAppenders.set("fileSync", requireFileSync());
  coreAppenders.set("tcp", requireTcp());
  const appenders$1 = /* @__PURE__ */ new Map();
  const tryLoading = (modulePath, config) => {
    let resolvedPath;
    try {
      const modulePathCJS = `${modulePath}.cjs`;
      resolvedPath = __require.resolve(modulePathCJS);
      debug("Loading module from ", modulePathCJS);
    } catch (e) {
      resolvedPath = modulePath;
      debug("Loading module from ", modulePath);
    }
    try {
      return commonjsRequire(resolvedPath);
    } catch (e) {
      configuration2.throwExceptionIf(
        config,
        e.code !== "MODULE_NOT_FOUND",
        `appender "${modulePath}" could not be loaded (error was: ${e})`
      );
      return void 0;
    }
  };
  const loadAppenderModule = (type, config) => coreAppenders.get(type) || tryLoading(`./${type}`, config) || tryLoading(type, config) || __require.main && __require.main.filename && tryLoading(path3.join(path3.dirname(__require.main.filename), type), config) || tryLoading(path3.join(process.cwd(), type), config);
  const appendersLoading = /* @__PURE__ */ new Set();
  const getAppender = (name, config) => {
    if (appenders$1.has(name)) return appenders$1.get(name);
    if (!config.appenders[name]) return false;
    if (appendersLoading.has(name))
      throw new Error(`Dependency loop detected for appender ${name}.`);
    appendersLoading.add(name);
    debug(`Creating appender ${name}`);
    const appender = createAppender(name, config);
    appendersLoading.delete(name);
    appenders$1.set(name, appender);
    return appender;
  };
  const createAppender = (name, config) => {
    const appenderConfig = config.appenders[name];
    const appenderModule = appenderConfig.type.configure ? appenderConfig.type : loadAppenderModule(appenderConfig.type, config);
    configuration2.throwExceptionIf(
      config,
      configuration2.not(appenderModule),
      `appender "${name}" is not valid (type "${appenderConfig.type}" could not be found)`
    );
    if (appenderModule.appender) {
      process.emitWarning(
        `Appender ${appenderConfig.type} exports an appender function.`,
        "DeprecationWarning",
        "log4js-node-DEP0001"
      );
      debug(
        "[log4js-node-DEP0001]",
        `DEPRECATION: Appender ${appenderConfig.type} exports an appender function.`
      );
    }
    if (appenderModule.shutdown) {
      process.emitWarning(
        `Appender ${appenderConfig.type} exports a shutdown function.`,
        "DeprecationWarning",
        "log4js-node-DEP0002"
      );
      debug(
        "[log4js-node-DEP0002]",
        `DEPRECATION: Appender ${appenderConfig.type} exports a shutdown function.`
      );
    }
    debug(`${name}: clustering.isMaster ? ${clustering2.isMaster()}`);
    debug(
      // eslint-disable-next-line global-require
      `${name}: appenderModule is ${require$$0.inspect(appenderModule)}`
    );
    return clustering2.onlyOnMaster(
      () => {
        debug(
          `calling appenderModule.configure for ${name} / ${appenderConfig.type}`
        );
        return appenderModule.configure(
          adapters22.modifyConfig(appenderConfig),
          layouts2,
          (appender) => getAppender(appender, config),
          levels2
        );
      },
      /* istanbul ignore next: fn never gets called by non-master yet needed to pass config validation */
      () => {
      }
    );
  };
  const setup = (config) => {
    appenders$1.clear();
    appendersLoading.clear();
    if (!config) {
      return;
    }
    const usedAppenders = [];
    Object.values(config.categories).forEach((category) => {
      usedAppenders.push(...category.appenders);
    });
    Object.keys(config.appenders).forEach((name) => {
      if (usedAppenders.includes(name) || config.appenders[name].type === "tcp-server" || config.appenders[name].type === "multiprocess") {
        getAppender(name, config);
      }
    });
  };
  const init = () => {
    setup();
  };
  init();
  configuration2.addListener((config) => {
    configuration2.throwExceptionIf(
      config,
      configuration2.not(configuration2.anObject(config.appenders)),
      'must have a property "appenders" of type object.'
    );
    const appenderNames = Object.keys(config.appenders);
    configuration2.throwExceptionIf(
      config,
      configuration2.not(appenderNames.length),
      "must define at least one appender."
    );
    appenderNames.forEach((name) => {
      configuration2.throwExceptionIf(
        config,
        configuration2.not(config.appenders[name].type),
        `appender "${name}" is not valid (must be an object with property "type")`
      );
    });
  });
  configuration2.addListener(setup);
  appenders.exports = appenders$1;
  appenders.exports.init = init;
  return appenders.exports;
}
var categories = { exports: {} };
var hasRequiredCategories;
function requireCategories() {
  if (hasRequiredCategories) return categories.exports;
  hasRequiredCategories = 1;
  (function(module) {
    const debug = requireBrowser()("log4js:categories");
    const configuration2 = requireConfiguration();
    const levels2 = requireLevels();
    const appenders2 = requireAppenders();
    const categories2 = /* @__PURE__ */ new Map();
    function inheritFromParent(config, category, categoryName) {
      if (category.inherit === false) return;
      const lastDotIndex = categoryName.lastIndexOf(".");
      if (lastDotIndex < 0) return;
      const parentCategoryName = categoryName.slice(0, lastDotIndex);
      let parentCategory = config.categories[parentCategoryName];
      if (!parentCategory) {
        parentCategory = { inherit: true, appenders: [] };
      }
      inheritFromParent(config, parentCategory, parentCategoryName);
      if (!config.categories[parentCategoryName] && parentCategory.appenders && parentCategory.appenders.length && parentCategory.level) {
        config.categories[parentCategoryName] = parentCategory;
      }
      category.appenders = category.appenders || [];
      category.level = category.level || parentCategory.level;
      parentCategory.appenders.forEach((ap) => {
        if (!category.appenders.includes(ap)) {
          category.appenders.push(ap);
        }
      });
      category.parent = parentCategory;
    }
    function addCategoryInheritance(config) {
      if (!config.categories) return;
      const categoryNames = Object.keys(config.categories);
      categoryNames.forEach((name) => {
        const category = config.categories[name];
        inheritFromParent(config, category, name);
      });
    }
    configuration2.addPreProcessingListener(
      (config) => addCategoryInheritance(config)
    );
    configuration2.addListener((config) => {
      configuration2.throwExceptionIf(
        config,
        configuration2.not(configuration2.anObject(config.categories)),
        'must have a property "categories" of type object.'
      );
      const categoryNames = Object.keys(config.categories);
      configuration2.throwExceptionIf(
        config,
        configuration2.not(categoryNames.length),
        "must define at least one category."
      );
      categoryNames.forEach((name) => {
        const category = config.categories[name];
        configuration2.throwExceptionIf(
          config,
          [
            configuration2.not(category.appenders),
            configuration2.not(category.level)
          ],
          `category "${name}" is not valid (must be an object with properties "appenders" and "level")`
        );
        configuration2.throwExceptionIf(
          config,
          configuration2.not(Array.isArray(category.appenders)),
          `category "${name}" is not valid (appenders must be an array of appender names)`
        );
        configuration2.throwExceptionIf(
          config,
          configuration2.not(category.appenders.length),
          `category "${name}" is not valid (appenders must contain at least one appender name)`
        );
        if (Object.prototype.hasOwnProperty.call(category, "enableCallStack")) {
          configuration2.throwExceptionIf(
            config,
            typeof category.enableCallStack !== "boolean",
            `category "${name}" is not valid (enableCallStack must be boolean type)`
          );
        }
        category.appenders.forEach((appender) => {
          configuration2.throwExceptionIf(
            config,
            configuration2.not(appenders2.get(appender)),
            `category "${name}" is not valid (appender "${appender}" is not defined)`
          );
        });
        configuration2.throwExceptionIf(
          config,
          configuration2.not(levels2.getLevel(category.level)),
          `category "${name}" is not valid (level "${category.level}" not recognised; valid levels are ${levels2.levels.join(", ")})`
        );
      });
      configuration2.throwExceptionIf(
        config,
        configuration2.not(config.categories.default),
        'must define a "default" category.'
      );
    });
    const setup = (config) => {
      categories2.clear();
      if (!config) {
        return;
      }
      const categoryNames = Object.keys(config.categories);
      categoryNames.forEach((name) => {
        const category = config.categories[name];
        const categoryAppenders = [];
        category.appenders.forEach((appender) => {
          categoryAppenders.push(appenders2.get(appender));
          debug(`Creating category ${name}`);
          categories2.set(name, {
            appenders: categoryAppenders,
            level: levels2.getLevel(category.level),
            enableCallStack: category.enableCallStack || false
          });
        });
      });
    };
    const init = () => {
      setup();
    };
    init();
    configuration2.addListener(setup);
    const configForCategory = (category) => {
      debug(`configForCategory: searching for config for ${category}`);
      if (categories2.has(category)) {
        debug(`configForCategory: ${category} exists in config, returning it`);
        return categories2.get(category);
      }
      let sourceCategoryConfig;
      if (category.indexOf(".") > 0) {
        debug(`configForCategory: ${category} has hierarchy, cloning from parents`);
        sourceCategoryConfig = {
          ...configForCategory(category.slice(0, category.lastIndexOf(".")))
        };
      } else {
        if (!categories2.has("default")) {
          setup({ categories: { default: { appenders: ["out"], level: "OFF" } } });
        }
        debug("configForCategory: cloning default category");
        sourceCategoryConfig = { ...categories2.get("default") };
      }
      categories2.set(category, sourceCategoryConfig);
      return sourceCategoryConfig;
    };
    const appendersForCategory = (category) => configForCategory(category).appenders;
    const getLevelForCategory = (category) => configForCategory(category).level;
    const setLevelForCategory = (category, level) => {
      configForCategory(category).level = level;
    };
    const getEnableCallStackForCategory = (category) => configForCategory(category).enableCallStack === true;
    const setEnableCallStackForCategory = (category, useCallStack) => {
      configForCategory(category).enableCallStack = useCallStack;
    };
    module.exports = categories2;
    module.exports = Object.assign(module.exports, {
      appendersForCategory,
      getLevelForCategory,
      setLevelForCategory,
      getEnableCallStackForCategory,
      setEnableCallStackForCategory,
      init
    });
  })(categories);
  return categories.exports;
}
var logger;
var hasRequiredLogger;
function requireLogger() {
  if (hasRequiredLogger) return logger;
  hasRequiredLogger = 1;
  const debug = requireBrowser()("log4js:logger");
  const LoggingEvent = requireLoggingEvent();
  const levels2 = requireLevels();
  const clustering2 = requireClustering();
  const categories2 = requireCategories();
  const configuration2 = requireConfiguration();
  const stackReg = /^(?:\s*) at (?:(.+) \()?(?:([^(]+?):(\d+):(\d+))\)?$/;
  const baseCallStackSkip = 1;
  const defaultErrorCallStackSkip = 3;
  function defaultParseCallStack(data2, skipIdx = defaultErrorCallStackSkip + baseCallStackSkip) {
    try {
      const stacklines = data2.stack.split("\n").slice(skipIdx);
      if (!stacklines.length) {
        return null;
      }
      const lineMatch = stackReg.exec(stacklines[0]);
      if (lineMatch && lineMatch.length === 5) {
        let className = "";
        let functionName = "";
        let functionAlias = "";
        if (lineMatch[1] && lineMatch[1] !== "") {
          [functionName, functionAlias] = lineMatch[1].replace(/[[\]]/g, "").split(" as ");
          functionAlias = functionAlias || "";
          if (functionName.includes("."))
            [className, functionName] = functionName.split(".");
        }
        return {
          fileName: lineMatch[2],
          lineNumber: parseInt(lineMatch[3], 10),
          columnNumber: parseInt(lineMatch[4], 10),
          callStack: stacklines.join("\n"),
          className,
          functionName,
          functionAlias,
          callerName: lineMatch[1] || ""
        };
      } else {
        console.error("log4js.logger - defaultParseCallStack error");
      }
    } catch (err) {
      console.error("log4js.logger - defaultParseCallStack error", err);
    }
    return null;
  }
  class Logger {
    constructor(name) {
      if (!name) {
        throw new Error("No category provided.");
      }
      this.category = name;
      this.context = {};
      this.callStackSkipIndex = 0;
      this.parseCallStack = defaultParseCallStack;
      debug(`Logger created (${this.category}, ${this.level})`);
    }
    get level() {
      return levels2.getLevel(
        categories2.getLevelForCategory(this.category),
        levels2.OFF
      );
    }
    set level(level) {
      categories2.setLevelForCategory(
        this.category,
        levels2.getLevel(level, this.level)
      );
    }
    get useCallStack() {
      return categories2.getEnableCallStackForCategory(this.category);
    }
    set useCallStack(bool) {
      categories2.setEnableCallStackForCategory(this.category, bool === true);
    }
    get callStackLinesToSkip() {
      return this.callStackSkipIndex;
    }
    set callStackLinesToSkip(number) {
      if (typeof number !== "number") {
        throw new TypeError("Must be a number");
      }
      if (number < 0) {
        throw new RangeError("Must be >= 0");
      }
      this.callStackSkipIndex = number;
    }
    log(level, ...args) {
      const logLevel = levels2.getLevel(level);
      if (!logLevel) {
        if (configuration2.validIdentifier(level) && args.length > 0) {
          this.log(
            levels2.WARN,
            "log4js:logger.log: valid log-level not found as first parameter given:",
            level
          );
          this.log(levels2.INFO, `[${level}]`, ...args);
        } else {
          this.log(levels2.INFO, level, ...args);
        }
      } else if (this.isLevelEnabled(logLevel)) {
        this._log(logLevel, args);
      }
    }
    isLevelEnabled(otherLevel) {
      return this.level.isLessThanOrEqualTo(otherLevel);
    }
    _log(level, data2) {
      debug(`sending log data (${level}) to appenders`);
      const error = data2.find((item) => item instanceof Error);
      let callStack;
      if (this.useCallStack) {
        try {
          if (error) {
            callStack = this.parseCallStack(
              error,
              this.callStackSkipIndex + baseCallStackSkip
            );
          }
        } catch (_err) {
        }
        callStack = callStack || this.parseCallStack(
          new Error(),
          this.callStackSkipIndex + defaultErrorCallStackSkip + baseCallStackSkip
        );
      }
      const loggingEvent = new LoggingEvent(
        this.category,
        level,
        data2,
        this.context,
        callStack,
        error
      );
      clustering2.send(loggingEvent);
    }
    addContext(key, value) {
      this.context[key] = value;
    }
    removeContext(key) {
      delete this.context[key];
    }
    clearContext() {
      this.context = {};
    }
    setParseCallStackFunction(parseFunction) {
      if (typeof parseFunction === "function") {
        this.parseCallStack = parseFunction;
      } else if (typeof parseFunction === "undefined") {
        this.parseCallStack = defaultParseCallStack;
      } else {
        throw new TypeError("Invalid type passed to setParseCallStackFunction");
      }
    }
  }
  function addLevelMethods(target) {
    const level = levels2.getLevel(target);
    const levelStrLower = level.toString().toLowerCase();
    const levelMethod = levelStrLower.replace(
      /_([a-z])/g,
      (g) => g[1].toUpperCase()
    );
    const isLevelMethod = levelMethod[0].toUpperCase() + levelMethod.slice(1);
    Logger.prototype[`is${isLevelMethod}Enabled`] = function() {
      return this.isLevelEnabled(level);
    };
    Logger.prototype[levelMethod] = function(...args) {
      this.log(level, ...args);
    };
  }
  levels2.levels.forEach(addLevelMethods);
  configuration2.addListener(() => {
    levels2.levels.forEach(addLevelMethods);
  });
  logger = Logger;
  return logger;
}
var connectLogger;
var hasRequiredConnectLogger;
function requireConnectLogger() {
  if (hasRequiredConnectLogger) return connectLogger;
  hasRequiredConnectLogger = 1;
  const levels2 = requireLevels();
  const DEFAULT_FORMAT = ':remote-addr - - ":method :url HTTP/:http-version" :status :content-length ":referrer" ":user-agent"';
  function getUrl(req) {
    return req.originalUrl || req.url;
  }
  function assembleTokens(req, res, customTokens) {
    const arrayUniqueTokens = (array) => {
      const a = array.concat();
      for (let i = 0; i < a.length; ++i) {
        for (let j = i + 1; j < a.length; ++j) {
          if (a[i].token == a[j].token) {
            a.splice(j--, 1);
          }
        }
      }
      return a;
    };
    const defaultTokens = [];
    defaultTokens.push({ token: ":url", replacement: getUrl(req) });
    defaultTokens.push({ token: ":protocol", replacement: req.protocol });
    defaultTokens.push({ token: ":hostname", replacement: req.hostname });
    defaultTokens.push({ token: ":method", replacement: req.method });
    defaultTokens.push({
      token: ":status",
      replacement: res.__statusCode || res.statusCode
    });
    defaultTokens.push({
      token: ":response-time",
      replacement: res.responseTime
    });
    defaultTokens.push({ token: ":date", replacement: (/* @__PURE__ */ new Date()).toUTCString() });
    defaultTokens.push({
      token: ":referrer",
      replacement: req.headers.referer || req.headers.referrer || ""
    });
    defaultTokens.push({
      token: ":http-version",
      replacement: `${req.httpVersionMajor}.${req.httpVersionMinor}`
    });
    defaultTokens.push({
      token: ":remote-addr",
      replacement: req.headers["x-forwarded-for"] || req.ip || req._remoteAddress || req.socket && (req.socket.remoteAddress || req.socket.socket && req.socket.socket.remoteAddress)
    });
    defaultTokens.push({
      token: ":user-agent",
      replacement: req.headers["user-agent"]
    });
    defaultTokens.push({
      token: ":content-length",
      replacement: res.getHeader("content-length") || res.__headers && res.__headers["Content-Length"] || "-"
    });
    defaultTokens.push({
      token: /:req\[([^\]]+)]/g,
      replacement(_, field) {
        return req.headers[field.toLowerCase()];
      }
    });
    defaultTokens.push({
      token: /:res\[([^\]]+)]/g,
      replacement(_, field) {
        return res.getHeader(field.toLowerCase()) || res.__headers && res.__headers[field];
      }
    });
    return arrayUniqueTokens(customTokens.concat(defaultTokens));
  }
  function format(str, tokens) {
    for (let i = 0; i < tokens.length; i++) {
      str = str.replace(tokens[i].token, tokens[i].replacement);
    }
    return str;
  }
  function createNoLogCondition(nolog) {
    let regexp = null;
    if (nolog instanceof RegExp) {
      regexp = nolog;
    }
    if (typeof nolog === "string") {
      regexp = new RegExp(nolog);
    }
    if (Array.isArray(nolog)) {
      const regexpsAsStrings = nolog.map(
        (reg) => reg.source ? reg.source : reg
      );
      regexp = new RegExp(regexpsAsStrings.join("|"));
    }
    return regexp;
  }
  function matchRules(statusCode, currentLevel, ruleSet) {
    let level = currentLevel;
    if (ruleSet) {
      const matchedRule = ruleSet.find((rule) => {
        let ruleMatched = false;
        if (rule.from && rule.to) {
          ruleMatched = statusCode >= rule.from && statusCode <= rule.to;
        } else {
          ruleMatched = rule.codes.indexOf(statusCode) !== -1;
        }
        return ruleMatched;
      });
      if (matchedRule) {
        level = levels2.getLevel(matchedRule.level, level);
      }
    }
    return level;
  }
  connectLogger = function getLogger2(logger4js, options) {
    if (typeof options === "string" || typeof options === "function") {
      options = { format: options };
    } else {
      options = options || {};
    }
    const thisLogger = logger4js;
    let level = levels2.getLevel(options.level, levels2.INFO);
    const fmt = options.format || DEFAULT_FORMAT;
    return (req, res, next) => {
      if (typeof req._logging !== "undefined") return next();
      if (typeof options.nolog !== "function") {
        const nolog = createNoLogCondition(options.nolog);
        if (nolog && nolog.test(req.originalUrl)) return next();
      }
      if (thisLogger.isLevelEnabled(level) || options.level === "auto") {
        const start = /* @__PURE__ */ new Date();
        const { writeHead } = res;
        req._logging = true;
        res.writeHead = (code, headers2) => {
          res.writeHead = writeHead;
          res.writeHead(code, headers2);
          res.__statusCode = code;
          res.__headers = headers2 || {};
        };
        let finished = false;
        const handler = () => {
          if (finished) {
            return;
          }
          finished = true;
          if (typeof options.nolog === "function") {
            if (options.nolog(req, res) === true) {
              req._logging = false;
              return;
            }
          }
          res.responseTime = /* @__PURE__ */ new Date() - start;
          if (res.statusCode && options.level === "auto") {
            level = levels2.INFO;
            if (res.statusCode >= 300) level = levels2.WARN;
            if (res.statusCode >= 400) level = levels2.ERROR;
          }
          level = matchRules(res.statusCode, level, options.statusRules);
          const combinedTokens = assembleTokens(req, res, options.tokens || []);
          if (options.context) thisLogger.addContext("res", res);
          if (typeof fmt === "function") {
            const line = fmt(req, res, (str) => format(str, combinedTokens));
            if (line) thisLogger.log(level, line);
          } else {
            thisLogger.log(level, format(fmt, combinedTokens));
          }
          if (options.context) thisLogger.removeContext("res");
        };
        res.on("end", handler);
        res.on("finish", handler);
        res.on("error", handler);
        res.on("close", handler);
      }
      return next();
    };
  };
  return connectLogger;
}
var recording;
var hasRequiredRecording;
function requireRecording() {
  if (hasRequiredRecording) return recording;
  hasRequiredRecording = 1;
  const debug = requireBrowser()("log4js:recording");
  const recordedEvents = [];
  function configure2() {
    return function(logEvent) {
      debug(
        `received logEvent, number of events now ${recordedEvents.length + 1}`
      );
      debug("log event was ", logEvent);
      recordedEvents.push(logEvent);
    };
  }
  function replay() {
    return recordedEvents.slice();
  }
  function reset() {
    recordedEvents.length = 0;
  }
  recording = {
    configure: configure2,
    replay,
    playback: replay,
    reset,
    erase: reset
  };
  return recording;
}
var log4js_1;
var hasRequiredLog4js;
function requireLog4js() {
  if (hasRequiredLog4js) return log4js_1;
  hasRequiredLog4js = 1;
  const debug = requireBrowser()("log4js:main");
  const fs22 = require$$1$2;
  const deepClone = requireRfdc()({ proto: true });
  const configuration2 = requireConfiguration();
  const layouts2 = requireLayouts();
  const levels2 = requireLevels();
  const appenders2 = requireAppenders();
  const categories2 = requireCategories();
  const Logger = requireLogger();
  const clustering2 = requireClustering();
  const connectLogger2 = requireConnectLogger();
  const recordingModule = requireRecording();
  let enabled = false;
  function sendLogEventToAppender(logEvent) {
    if (!enabled) return;
    debug("Received log event ", logEvent);
    const categoryAppenders = categories2.appendersForCategory(
      logEvent.categoryName
    );
    categoryAppenders.forEach((appender) => {
      appender(logEvent);
    });
  }
  function loadConfigurationFile(filename) {
    debug(`Loading configuration from ${filename}`);
    try {
      return JSON.parse(fs22.readFileSync(filename, "utf8"));
    } catch (e) {
      throw new Error(
        `Problem reading config from file "${filename}". Error was ${e.message}`,
        e
      );
    }
  }
  function configure2(configurationFileOrObject) {
    if (enabled) {
      shutdown2();
    }
    let configObject = configurationFileOrObject;
    if (typeof configObject === "string") {
      configObject = loadConfigurationFile(configurationFileOrObject);
    }
    debug(`Configuration is ${configObject}`);
    configuration2.configure(deepClone(configObject));
    clustering2.onMessage(sendLogEventToAppender);
    enabled = true;
    return log4js2;
  }
  function isConfigured2() {
    return enabled;
  }
  function recording2() {
    return recordingModule;
  }
  function shutdown2(callback = () => {
  }) {
    if (typeof callback !== "function") {
      throw new TypeError("Invalid callback passed to shutdown");
    }
    debug("Shutdown called. Disabling all log writing.");
    enabled = false;
    const appendersToCheck = Array.from(appenders2.values());
    appenders2.init();
    categories2.init();
    const shutdownFunctions = appendersToCheck.reduce(
      (accum, next) => next.shutdown ? accum + 1 : accum,
      0
    );
    if (shutdownFunctions === 0) {
      debug("No appenders with shutdown functions found.");
      callback();
    }
    let completed = 0;
    let error;
    debug(`Found ${shutdownFunctions} appenders with shutdown functions.`);
    function complete(err) {
      error = error || err;
      completed += 1;
      debug(`Appender shutdowns complete: ${completed} / ${shutdownFunctions}`);
      if (completed >= shutdownFunctions) {
        debug("All shutdown functions completed.");
        callback(error);
      }
    }
    appendersToCheck.filter((a) => a.shutdown).forEach((a) => a.shutdown(complete));
  }
  function getLogger2(category) {
    if (!enabled) {
      configure2(
        process.env.LOG4JS_CONFIG || {
          appenders: { out: { type: "stdout" } },
          categories: { default: { appenders: ["out"], level: "OFF" } }
        }
      );
    }
    return new Logger(category || "default");
  }
  const log4js2 = {
    getLogger: getLogger2,
    configure: configure2,
    isConfigured: isConfigured2,
    shutdown: shutdown2,
    connectLogger: connectLogger2,
    levels: levels2,
    addLayout: layouts2.addLayout,
    recording: recording2
  };
  log4js_1 = log4js2;
  return log4js_1;
}
var log4jsExports = requireLog4js();
var log4js = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: log4jsExports
}, [log4jsExports]);
log4jsExports.addLayout;
log4jsExports.configure;
log4jsExports.connectLogger;
log4jsExports.getLogger;
log4jsExports.isConfigured;
log4jsExports.levels;
log4jsExports.recording;
log4jsExports.shutdown;

// node_modules/.pnpm/@karinjs+log4js@1.1.4/node_modules/@karinjs/log4js/index.js
var app = log4js.default;
var log4js_default = app;

// node_modules/.pnpm/@ikenxuan+amagi@4.4.9/node_modules/@ikenxuan/amagi/dist/default/esm/index.mjs
var BiLiBiLiAPI = class {
  \u767B\u5F55\u57FA\u672C\u4FE1\u606F() {
    return "https://api.bilibili.com/x/web-interface/nav";
  }
  \u89C6\u9891\u8BE6\u7EC6\u4FE1\u606F(data2) {
    return `https://api.bilibili.com/x/web-interface/view?bvid=${data2.bvid}`;
  }
  \u89C6\u9891\u6D41\u4FE1\u606F(data2) {
    return `https://api.bilibili.com/x/player/playurl?avid=${data2.avid}&cid=${data2.cid}`;
  }
  /** 评论区类型，type参数详见 [评论区类型代码](https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/docs/comment/readme.md#评论区类型代码) */
  \u8BC4\u8BBA\u533A\u660E\u7EC6(data2) {
    return `https://api.bilibili.com/x/v2/reply?sort=1&ps=${data2.number ?? 20}&type=${data2.type}&oid=${data2.oid}&pn=${data2.pn}`;
  }
  \u8BC4\u8BBA\u533A\u72B6\u6001(data2) {
    return `https://api.bilibili.com/x/v2/reply/subject/description?type=${data2.type}&oid=${data2.oid}`;
  }
  \u8868\u60C5\u5217\u8868() {
    return "https://api.bilibili.com/x/emote/user/panel/web?business=reply&web_location=0.0";
  }
  \u756A\u5267\u660E\u7EC6(data2) {
    if (data2.ep_id) {
      return `https://api.bilibili.com/pgc/view/web/season?ep_id=${data2.ep_id}`;
    } else if (data2.season_id) {
      return `https://api.bilibili.com/pgc/view/web/season?season_id=${data2.season_id}`;
    } else {
      throw new Error("\u62DF\u9020\u63A5\u53E3\u5730\u5740\u51FA\u9519\uFF0C\u7F3A\u5C11 ep_id \u6216 season_id \u53C2\u6570");
    }
  }
  \u756A\u5267\u89C6\u9891\u6D41\u4FE1\u606F(data2) {
    return `https://api.bilibili.com/pgc/player/web/playurl?cid=${data2.cid}&ep_id=${data2.ep_id}`;
  }
  \u7528\u6237\u7A7A\u95F4\u52A8\u6001(data2) {
    return `https://api.bilibili.com/x/polymer/web-dynamic/v1/feed/space?host_mid=${data2.host_mid}`;
  }
  \u52A8\u6001\u8BE6\u60C5(data2) {
    return `https://api.bilibili.com/x/polymer/web-dynamic/v1/detail?id=${data2.dynamic_id}`;
  }
  \u52A8\u6001\u5361\u7247\u4FE1\u606F(data2) {
    return `https://api.vc.bilibili.com/dynamic_svr/v1/dynamic_svr/get_dynamic_detail?dynamic_id=${data2.dynamic_id}`;
  }
  \u7528\u6237\u540D\u7247\u4FE1\u606F(data2) {
    return `https://api.bilibili.com/x/web-interface/card?mid=${data2.host_mid}&photo=true`;
  }
  \u76F4\u64AD\u95F4\u4FE1\u606F(data2) {
    return `https://api.live.bilibili.com/room/v1/Room/get_info?room_id=${data2.room_id}`;
  }
  \u76F4\u64AD\u95F4\u521D\u59CB\u5316\u4FE1\u606F(data2) {
    return `https://api.live.bilibili.com/room/v1/Room/room_init?id=${data2.room_id}`;
  }
  \u7533\u8BF7\u4E8C\u7EF4\u7801() {
    return "https://passport.bilibili.com/x/passport-login/web/qrcode/generate";
  }
  \u4E8C\u7EF4\u7801\u72B6\u6001(data2) {
    return `https://passport.bilibili.com/x/passport-login/web/qrcode/poll?qrcode_key=${data2.qrcode_key}`;
  }
  \u83B7\u53D6UP\u4E3B\u603B\u64AD\u653E\u91CF(data2) {
    return `https://api.bilibili.com/x/space/upstat?mid=${data2.host_mid}`;
  }
};
var bilibiliAPI = new BiLiBiLiAPI();
var bilibiliApiUrls = new BiLiBiLiAPI();
async function qtparam(BASEURL, cookie) {
  if (cookie === "") return { QUERY: "&platform=html5", STATUS: "!isLogin" };
  const logininfo = await new Networks({ url: bilibiliAPI.\u767B\u5F55\u57FA\u672C\u4FE1\u606F(), headers: { Cookie: cookie } }).getData();
  const sign = await wbi_sign(BASEURL, cookie);
  const qn = [6, 16, 32, 64, 74, 80, 112, 116, 120, 125, 126, 127];
  let isvip;
  logininfo.data.vipStatus === 1 ? isvip = true : isvip = false;
  if (isvip) {
    return { QUERY: `&fnval=16&fourk=1&${sign}`, STATUS: "isLogin", isvip };
  } else return { QUERY: `&qn=${qn[3]}&fnval=16`, STATUS: "isLogin", isvip };
}
var mixinKeyEncTab = [
  46,
  47,
  18,
  2,
  53,
  8,
  23,
  32,
  15,
  50,
  10,
  31,
  58,
  3,
  45,
  35,
  27,
  43,
  5,
  49,
  33,
  9,
  42,
  19,
  29,
  28,
  14,
  39,
  12,
  38,
  41,
  13,
  37,
  48,
  7,
  16,
  24,
  55,
  40,
  61,
  26,
  17,
  0,
  1,
  60,
  51,
  30,
  4,
  22,
  25,
  54,
  21,
  56,
  59,
  6,
  63,
  57,
  62,
  11,
  36,
  20,
  34,
  44,
  52
];
var getMixinKey = (orig) => mixinKeyEncTab.map((n) => orig[n]).join("").slice(0, 32);
function encWbi(params, img_key, sub_key) {
  const mixin_key = getMixinKey(img_key + sub_key);
  const curr_time = Math.round(Date.now() / 1e3);
  const chr_filter = /[!'()*]/g;
  Object.assign(params, { wts: curr_time });
  const query = Object.keys(params).sort().map((key) => {
    const value = params[key].toString().replace(chr_filter, "");
    return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
  }).join("&");
  const wbi_sign2 = crypto.createHash("md5").update(query + mixin_key).digest("hex");
  return `&wts=${curr_time}&w_rid=${wbi_sign2}`;
}
async function getWbiKeys(cookie) {
  const res = await axios("https://api.bilibili.com/x/web-interface/nav", {
    headers: {
      Cookie: cookie
    }
  });
  const responseJson = res.data;
  const response = responseJson;
  const {
    data: {
      wbi_img: { img_url, sub_url }
    }
  } = response;
  return {
    img_key: img_url.slice(img_url.lastIndexOf("/") + 1, img_url.lastIndexOf(".")),
    sub_key: sub_url.slice(sub_url.lastIndexOf("/") + 1, sub_url.lastIndexOf("."))
  };
}
async function wbi_sign(BASEURL, cookie) {
  const web_keys = await getWbiKeys(cookie);
  const url2 = new URL(BASEURL);
  const params = {};
  for (const [key, value] of url2.searchParams.entries()) {
    params[key] = value;
  }
  const query = encWbi(params, web_keys.img_key, web_keys.sub_key);
  return query;
}
var XOR_CODE = 23442827791579n;
var MASK_CODE = 2251799813685247n;
var MAX_AID = 1n << 51n;
var BASE = 58n;
var data = "FcwAPNKTMug3GV5Lj7EJnHpWsx4tb8haYeviqBz6rkCy12mUSDQX9RdoZf";
function av2bv(aid) {
  const bytes = ["B", "V", "1", "0", "0", "0", "0", "0", "0", "0", "0", "0"];
  let bvIndex = bytes.length - 1;
  let tmp = (MAX_AID | BigInt(aid)) ^ XOR_CODE;
  while (tmp > 0) {
    bytes[bvIndex] = data[Number(tmp % BigInt(BASE))];
    tmp = tmp / BASE;
    bvIndex -= 1;
  }
  [bytes[3], bytes[9]] = [bytes[9], bytes[3]];
  [bytes[4], bytes[7]] = [bytes[7], bytes[4]];
  return bytes.join("");
}
function bv2av(bvid) {
  const bvidArr = Array.from(bvid);
  [bvidArr[3], bvidArr[9]] = [bvidArr[9], bvidArr[3]];
  [bvidArr[4], bvidArr[7]] = [bvidArr[7], bvidArr[4]];
  bvidArr.splice(0, 3);
  const tmp = bvidArr.reduce((pre, bvidChar) => pre * BASE + BigInt(data.indexOf(bvidChar)), 0n);
  return Number(tmp & MASK_CODE ^ XOR_CODE);
}
var registerBilibiliRoutes = (cookie) => {
  const router = express.Router();
  router.get("/new_login_qrcode", async (req, res) => {
    const data2 = await BilibiliData({
      methodType: "\u7533\u8BF7\u4E8C\u7EF4\u7801"
    }, req.headers.cookie || cookie);
    res.json(data2);
  });
  router.get("/check_qrcode", async (req, res) => {
    const data2 = await BilibiliData({
      methodType: "\u4E8C\u7EF4\u7801\u72B6\u6001",
      qrcode_key: req.query.qrcode_key
    }, req.headers.cookie || cookie);
    res.json(data2);
  });
  router.get("/login_basic_info", async (req, res) => {
    const data2 = await BilibiliData({
      methodType: "\u767B\u5F55\u57FA\u672C\u4FE1\u606F"
    }, req.headers.cookie || cookie);
    res.json(data2);
  });
  router.get("/fetch_one_video", async (req, res) => {
    const data2 = await BilibiliData({
      methodType: "\u5355\u4E2A\u89C6\u9891\u4F5C\u54C1\u6570\u636E",
      bvid: req.query.bvid
    }, req.headers.cookie || cookie);
    res.json(data2);
  });
  router.get("/fetch_video_playurl", async (req, res) => {
    const data2 = await BilibiliData({
      methodType: "\u5355\u4E2A\u89C6\u9891\u4E0B\u8F7D\u4FE1\u606F\u6570\u636E",
      avid: parseInt(req.query.avid),
      cid: parseInt(req.query.cid)
    }, req.headers.cookie || cookie);
    res.json(data2);
  });
  router.get("/fetch_work_comments", async (req, res) => {
    const data2 = await BilibiliData({
      methodType: "\u8BC4\u8BBA\u6570\u636E",
      oid: Number(req.query.oid),
      number: Number(req.query.number),
      type: Number(req.query.type ?? 1)
    }, req.headers.cookie || cookie);
    res.json(data2);
  });
  router.get("/fetch_work_comments", async (req, res) => {
    const data2 = await BilibiliData({
      methodType: "Emoji\u6570\u636E"
    }, req.headers.cookie || cookie);
    res.json(data2);
  });
  router.get("/fetch_bangumi_video_info", async (req, res) => {
    const data2 = await BilibiliData({
      methodType: "\u756A\u5267\u57FA\u672C\u4FE1\u606F\u6570\u636E",
      ep_id: req.query.ep_id
    }, req.headers.cookie || cookie);
    res.json(data2);
  });
  router.get("/fetch_bangumi_video_playurl", async (req, res) => {
    const data2 = await BilibiliData({
      methodType: "\u756A\u5267\u4E0B\u8F7D\u4FE1\u606F\u6570\u636E",
      cid: parseInt(req.query.cid),
      ep_id: req.query.ep_id
    }, req.headers.cookie || cookie);
    res.json(data2);
  });
  router.get("/fetch_user_dynamic", async (req, res) => {
    const data2 = await BilibiliData({
      methodType: "\u7528\u6237\u4E3B\u9875\u52A8\u6001\u5217\u8868\u6570\u636E",
      host_mid: parseInt(req.query.host_mid)
    }, req.headers.cookie || cookie);
    res.json(data2);
  });
  router.get("/fetch_dynamic_info", async (req, res) => {
    const data2 = await BilibiliData({
      methodType: "\u52A8\u6001\u8BE6\u60C5\u6570\u636E",
      dynamic_id: req.query.dynamic_id
    }, req.headers.cookie || cookie);
    res.json(data2);
  });
  router.get("/fetch_dynamic_card", async (req, res) => {
    const data2 = await BilibiliData({
      methodType: "\u52A8\u6001\u5361\u7247\u6570\u636E",
      dynamic_id: req.query.dynamic_id
    }, req.headers.cookie || cookie);
    res.json(data2);
  });
  router.get("/fetch_user_profile", async (req, res) => {
    const data2 = await BilibiliData({
      methodType: "\u7528\u6237\u4E3B\u9875\u6570\u636E",
      host_mid: parseInt(req.query.host_mid)
    }, req.headers.cookie || cookie);
    res.json(data2);
  });
  router.get("/fetch_live_room_detail", async (req, res) => {
    const data2 = await BilibiliData({
      methodType: "\u76F4\u64AD\u95F4\u4FE1\u606F",
      room_id: req.query.room_id
    }, req.headers.cookie || cookie);
    res.json(data2);
  });
  router.get("/fetch_liveroom_def", async (req, res) => {
    const data2 = await BilibiliData({
      methodType: "\u76F4\u64AD\u95F4\u521D\u59CB\u5316\u4FE1\u606F",
      room_id: req.query.room_id
    }, req.headers.cookie || cookie);
    res.json(data2);
  });
  router.get("/bv_to_av", async (req, res) => {
    const data2 = await BilibiliData({
      methodType: "BV\u8F6CAV",
      bvid: req.query.bvid
    }, req.headers.cookie || cookie);
    res.json(data2);
  });
  router.get("/av_to_bv", async (req, res) => {
    const data2 = await BilibiliData({
      methodType: "AV\u8F6CBV",
      avid: parseInt(req.query.avid)
    }, req.headers.cookie || cookie);
    res.json(data2);
  });
  router.get("/fetch_user_full_view", async (req, res) => {
    const data2 = await BilibiliData({
      methodType: "\u83B7\u53D6UP\u4E3B\u603B\u64AD\u653E\u91CF",
      host_mid: parseInt(req.query.host_mid)
    }, req.headers.cookie || cookie);
    res.json(data2);
  });
  return router;
};
var defheaders = {
  accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
  "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
  "cache-control": "max-age=0",
  priority: "u=0, i",
  "sec-ch-ua": "'Microsoft Edge';v='131', 'Chromium';v='131', 'Not_A Brand';v='24'",
  "sec-ch-ua-mobile": "?0",
  "sec-ch-ua-platform": "'Windows'",
  "sec-fetch-dest": "document",
  "sec-fetch-mode": "navigate",
  "sec-fetch-site": "none",
  "sec-fetch-user": "?1",
  "upgrade-insecure-requests": "1",
  referer: "https://www.bilibili.com/"
};
var BilibiliData = async (data2, cookie) => {
  const headers2 = {
    ...defheaders,
    cookie: cookie ? cookie.replace(/\s+/g, "") : ""
  };
  switch (data2.methodType) {
    case "\u5355\u4E2A\u89C6\u9891\u4F5C\u54C1\u6570\u636E": {
      BilibiliValidateData(data2, ["bvid"]);
      const INFODATA = await GlobalGetData({
        url: bilibiliAPI.\u89C6\u9891\u8BE6\u7EC6\u4FE1\u606F({ bvid: data2.bvid }),
        ...data2
      });
      return INFODATA;
    }
    case "\u5355\u4E2A\u89C6\u9891\u4E0B\u8F7D\u4FE1\u606F\u6570\u636E": {
      BilibiliValidateData(data2, ["avid", "cid"]);
      const BASEURL = bilibiliAPI.\u89C6\u9891\u6D41\u4FE1\u606F({ avid: data2.avid, cid: data2.cid });
      const SIGN = await qtparam(BASEURL, headers2.cookie);
      const DATA = await GlobalGetData({
        url: bilibiliAPI.\u89C6\u9891\u6D41\u4FE1\u606F({ avid: data2.avid, cid: data2.cid }) + SIGN.QUERY,
        headers: headers2,
        ...data2
      });
      return DATA;
    }
    case "\u8BC4\u8BBA\u6570\u636E": {
      BilibiliValidateData(data2, ["oid", "type"]);
      let { oid, number, pn, type } = data2;
      let fetchedComments = [];
      pn = pn ?? 1;
      const maxRequestCount = 100;
      const commentGrowthStabilized = 5;
      let lastFetchedCount = 0;
      let stabilizedCount = 0;
      let requestCount = 0;
      let tmpresp;
      try {
        while (fetchedComments.length < Number(number ?? 20) && requestCount < maxRequestCount) {
          if (number === 0 || number === void 0) {
            requestCount = 0;
          } else {
            requestCount = Math.min(20, Number(number) - fetchedComments.length);
          }
          const url2 = bilibiliAPI.\u8BC4\u8BBA\u533A\u660E\u7EC6({
            type,
            oid,
            number: requestCount,
            pn
          });
          const checkStatusUrl = bilibiliAPI.\u8BC4\u8BBA\u533A\u72B6\u6001({ oid, type });
          const checkStatusRes = await GlobalGetData({
            url: checkStatusUrl,
            headers: headers2,
            ...data2
          });
          if (checkStatusRes.data === null) {
            logger2.error("\u8BC4\u8BBA\u533A\u672A\u5F00\u653E");
            return {
              code: 404,
              message: "\u8BC4\u8BBA\u533A\u672A\u5F00\u653E",
              data: null
            };
          }
          const response = await GlobalGetData({
            url: url2,
            headers: headers2,
            ...data2
          });
          tmpresp = response;
          const currentCount = response.data.replies ? response.data.replies.length : 0;
          fetchedComments.push(...response.data.replies || []);
          if (currentCount === lastFetchedCount) {
            stabilizedCount++;
          } else {
            stabilizedCount = 0;
          }
          lastFetchedCount = currentCount;
          if (stabilizedCount >= commentGrowthStabilized || requestCount >= maxRequestCount) {
            break;
          }
          pn++;
          requestCount++;
        }
      } catch {
        return false;
      }
      const finalResponse = {
        ...tmpresp,
        data: {
          ...tmpresp.data,
          // 去重
          replies: Array.from(new Map(fetchedComments.map((item) => [item.rpid, item])).values()).slice(0, Number(data2.number))
        }
      };
      return finalResponse;
    }
    case "Emoji\u6570\u636E": {
      return await GlobalGetData({
        url: bilibiliAPI.\u8868\u60C5\u5217\u8868(),
        ...data2
      });
    }
    case "\u756A\u5267\u57FA\u672C\u4FE1\u606F\u6570\u636E": {
      let id = data2.ep_id ? data2.ep_id : data2.season_id;
      if (!id) {
        BilibiliValidateData(data2, ["ep_id"]);
        return false;
      }
      const idType = id ? id.startsWith("ep") ? "ep_id" : "season_id" : "ep_id";
      const newId = idType === "ep_id" ? id.replace("ep", "") : id.replace("ss", "");
      const INFO = await GlobalGetData({
        url: bilibiliAPI.\u756A\u5267\u660E\u7EC6({ [idType]: newId }),
        headers: headers2,
        ...data2
      });
      return INFO;
    }
    case "\u756A\u5267\u4E0B\u8F7D\u4FE1\u606F\u6570\u636E": {
      BilibiliValidateData(data2, ["cid", "ep_id"]);
      const BASEURL = bilibiliAPI.\u756A\u5267\u89C6\u9891\u6D41\u4FE1\u606F({ cid: data2.cid, ep_id: data2.ep_id.replace("ep", "") });
      const SIGN = await qtparam(BASEURL, headers2.cookie);
      const DATA = await GlobalGetData({
        url: bilibiliAPI.\u756A\u5267\u89C6\u9891\u6D41\u4FE1\u606F({ cid: data2.cid, ep_id: data2.ep_id.replace("ep", "") }) + SIGN.QUERY,
        headers: headers2,
        ...data2
      });
      return DATA;
    }
    case "\u7528\u6237\u4E3B\u9875\u52A8\u6001\u5217\u8868\u6570\u636E": {
      BilibiliValidateData(data2, ["host_mid"]);
      delete headers2.referer;
      const { host_mid } = data2;
      const result = await GlobalGetData({
        url: bilibiliAPI.\u7528\u6237\u7A7A\u95F4\u52A8\u6001({ host_mid }),
        headers: headers2,
        ...data2
      });
      return result;
    }
    case "\u52A8\u6001\u8BE6\u60C5\u6570\u636E": {
      BilibiliValidateData(data2, ["dynamic_id"]);
      delete headers2.referer;
      const dynamicINFO = await GlobalGetData({
        url: bilibiliAPI.\u52A8\u6001\u8BE6\u60C5({ dynamic_id: data2.dynamic_id }),
        headers: headers2,
        ...data2
      });
      return dynamicINFO;
    }
    case "\u52A8\u6001\u5361\u7247\u6570\u636E": {
      BilibiliValidateData(data2, ["dynamic_id"]);
      delete headers2.referer;
      const { dynamic_id } = data2;
      const dynamicINFO_CARD = await GlobalGetData({
        url: bilibiliAPI.\u52A8\u6001\u5361\u7247\u4FE1\u606F({ dynamic_id }),
        headers: headers2,
        ...data2
      });
      return dynamicINFO_CARD;
    }
    case "\u7528\u6237\u4E3B\u9875\u6570\u636E": {
      BilibiliValidateData(data2, ["host_mid"]);
      const { host_mid } = data2;
      const result = await GlobalGetData({
        url: bilibiliAPI.\u7528\u6237\u540D\u7247\u4FE1\u606F({ host_mid }),
        headers: headers2,
        ...data2
      });
      return result;
    }
    case "\u76F4\u64AD\u95F4\u4FE1\u606F": {
      BilibiliValidateData(data2, ["room_id"]);
      const result = await GlobalGetData({
        url: bilibiliAPI.\u76F4\u64AD\u95F4\u4FE1\u606F({ room_id: data2.room_id }),
        headers: headers2,
        ...data2
      });
      return result;
    }
    case "\u76F4\u64AD\u95F4\u521D\u59CB\u5316\u4FE1\u606F": {
      BilibiliValidateData(data2, ["room_id"]);
      const result = await GlobalGetData({
        url: bilibiliAPI.\u76F4\u64AD\u95F4\u521D\u59CB\u5316\u4FE1\u606F({ room_id: data2.room_id }),
        headers: headers2,
        ...data2
      });
      return result;
    }
    case "\u7533\u8BF7\u4E8C\u7EF4\u7801": {
      const result = await GlobalGetData({
        url: bilibiliAPI.\u7533\u8BF7\u4E8C\u7EF4\u7801(),
        headers: headers2,
        ...data2
      });
      return result;
    }
    case "\u4E8C\u7EF4\u7801\u72B6\u6001": {
      BilibiliValidateData(data2, ["qrcode_key"]);
      const result = await new Networks({
        url: bilibiliAPI.\u4E8C\u7EF4\u7801\u72B6\u6001({ qrcode_key: data2.qrcode_key }),
        headers: headers2,
        ...data2
      }).getHeadersAndData();
      return result;
    }
    case "\u767B\u5F55\u57FA\u672C\u4FE1\u606F": {
      const result = await GlobalGetData({
        url: bilibiliAPI.\u767B\u5F55\u57FA\u672C\u4FE1\u606F(),
        headers: headers2,
        ...data2
      });
      return result;
    }
    case "\u83B7\u53D6UP\u4E3B\u603B\u64AD\u653E\u91CF": {
      BilibiliValidateData(data2, ["host_mid"]);
      const result = await GlobalGetData({
        url: bilibiliAPI.\u83B7\u53D6UP\u4E3B\u603B\u64AD\u653E\u91CF({ host_mid: data2.host_mid }),
        headers: headers2,
        ...data2
      });
      return result;
    }
    case "AV\u8F6CBV": {
      BilibiliValidateData(data2, ["avid"]);
      const result = av2bv(Number(data2.avid.toString().replace(/^av/i, "")));
      return {
        code: 0,
        message: "success",
        data: {
          bvid: result
        }
      };
    }
    case "BV\u8F6CAV": {
      BilibiliValidateData(data2, ["bvid"]);
      const result = "av" + bv2av(data2.bvid);
      return {
        code: 0,
        message: "success",
        data: {
          aid: result
        }
      };
    }
    default:
      logger2.warn(`\u672A\u77E5\u7684\u6296\u97F3\u6570\u636E\u63A5\u53E3\uFF1A\u300D${logger2.red(data2.methodType)}\u300D`);
      return null;
  }
};
var GlobalGetData = async (options) => {
  const result = await new Networks(options).getData();
  if (result && result.code === 0) {
    return result;
  } else if (result.code === 12061) {
    logger2.warn(`\u83B7\u53D6\u54CD\u5E94\u6570\u636E\u5931\u8D25\uFF01
\u8BF7\u6C42\u63A5\u53E3\u7C7B\u578B\uFF1A\u300C${options.methodType}\u300D
\u8BF7\u6C42URL\uFF1A${options.url}
\u9519\u8BEF\u4EE3\u7801\uFF1A${result.code}\uFF0C
\u542B\u4E49\uFF1A${result.message}`);
    return result;
  } else {
    const errorMessage = errorMap[result.code] || result.message || "\u672A\u77E5\u9519\u8BEF";
    logger2.warn(`\u83B7\u53D6\u54CD\u5E94\u6570\u636E\u5931\u8D25\uFF01
\u8BF7\u6C42\u63A5\u53E3\u7C7B\u578B\uFF1A\u300C${options.methodType}\u300D
\u8BF7\u6C42URL\uFF1A${options.url}
\u9519\u8BEF\u4EE3\u7801\uFF1A${result.code}\uFF0C
\u542B\u4E49\uFF1A${errorMessage}`);
    return result;
  }
};
var errorMap = {
  "-1": "\u5E94\u7528\u7A0B\u5E8F\u4E0D\u5B58\u5728\u6216\u5DF2\u88AB\u5C01\u7981",
  "-2": "Access Key \u9519\u8BEF",
  "-3": "API \u6821\u9A8C\u5BC6\u5319\u9519\u8BEF",
  "-4": "\u8C03\u7528\u65B9\u5BF9\u8BE5 Method \u6CA1\u6709\u6743\u9650",
  "-101": "\u8D26\u53F7\u672A\u767B\u5F55",
  "-102": "\u8D26\u53F7\u88AB\u5C01\u505C",
  "-103": "\u79EF\u5206\u4E0D\u8DB3",
  "-104": "\u786C\u5E01\u4E0D\u8DB3",
  "-105": "\u9A8C\u8BC1\u7801\u9519\u8BEF",
  "-106": "\u8D26\u53F7\u975E\u6B63\u5F0F\u4F1A\u5458\u6216\u5728\u9002\u5E94\u671F",
  "-107": "\u5E94\u7528\u4E0D\u5B58\u5728\u6216\u8005\u88AB\u5C01\u7981",
  "-108": "\u672A\u7ED1\u5B9A\u624B\u673A",
  "-110": "\u672A\u7ED1\u5B9A\u624B\u673A",
  "-111": "csrf \u6821\u9A8C\u5931\u8D25",
  "-112": "\u7CFB\u7EDF\u5347\u7EA7\u4E2D",
  "-113": "\u8D26\u53F7\u5C1A\u672A\u5B9E\u540D\u8BA4\u8BC1",
  "-114": "\u8BF7\u5148\u7ED1\u5B9A\u624B\u673A",
  "-115": "\u8BF7\u5148\u5B8C\u6210\u5B9E\u540D\u8BA4\u8BC1",
  "-304": "\u6728\u6709\u6539\u52A8",
  "-307": "\u649E\u8F66\u8DF3\u8F6C",
  "-352": "\u98CE\u63A7\u6821\u9A8C\u5931\u8D25 (UA \u6216 wbi \u53C2\u6570\u4E0D\u5408\u6CD5)",
  "-400": "\u8BF7\u6C42\u9519\u8BEF",
  "-401": "\u672A\u8BA4\u8BC1 (\u6216\u975E\u6CD5\u8BF7\u6C42)",
  "-403": "\u8BBF\u95EE\u6743\u9650\u4E0D\u8DB3",
  "-404": "\u5565\u90FD\u6728\u6709",
  "-405": "\u4E0D\u652F\u6301\u8BE5\u65B9\u6CD5",
  "-409": "\u51B2\u7A81",
  "-412": "\u8BF7\u6C42\u88AB\u62E6\u622A (\u5BA2\u6237\u7AEF ip \u88AB\u670D\u52A1\u7AEF\u98CE\u63A7)",
  "-500": "\u670D\u52A1\u5668\u9519\u8BEF",
  "-503": "\u8FC7\u8F7D\u4FDD\u62A4,\u670D\u52A1\u6682\u4E0D\u53EF\u7528",
  "-504": "\u670D\u52A1\u8C03\u7528\u8D85\u65F6",
  "-509": "\u8D85\u51FA\u9650\u5236",
  "-616": "\u4E0A\u4F20\u6587\u4EF6\u4E0D\u5B58\u5728",
  "-617": "\u4E0A\u4F20\u6587\u4EF6\u592A\u5927",
  "-625": "\u767B\u5F55\u5931\u8D25\u6B21\u6570\u592A\u591A",
  "-626": "\u7528\u6237\u4E0D\u5B58\u5728",
  "-628": "\u5BC6\u7801\u592A\u5F31",
  "-629": "\u7528\u6237\u540D\u6216\u5BC6\u7801\u9519\u8BEF",
  "-632": "\u64CD\u4F5C\u5BF9\u8C61\u6570\u91CF\u9650\u5236",
  "-643": "\u88AB\u9501\u5B9A",
  "-650": "\u7528\u6237\u7B49\u7EA7\u592A\u4F4E",
  "-652": "\u91CD\u590D\u7684\u7528\u6237",
  "-658": "Token \u8FC7\u671F",
  "-662": "\u5BC6\u7801\u65F6\u95F4\u6233\u8FC7\u671F",
  "-688": "\u5730\u7406\u533A\u57DF\u9650\u5236",
  "-689": "\u7248\u6743\u9650\u5236",
  "-701": "\u6263\u8282\u64CD\u5931\u8D25",
  "-799": "\u8BF7\u6C42\u8FC7\u4E8E\u9891\u7E41\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5",
  "-8888": "\u5BF9\u4E0D\u8D77\uFF0C\u670D\u52A1\u5668\u5F00\u5C0F\u5DEE\u4E86~ (\u0CA5\uFE4F\u0CA5)"
};
var SM3 = class {
  reg;
  chunk;
  size;
  constructor() {
    this.reg = [];
    this.chunk = [];
    this.size = 0;
    this.reset();
  }
  reset() {
    this.reg[0] = 1937774191;
    this.reg[1] = 1226093241;
    this.reg[2] = 388252375;
    this.reg[3] = 3666478592;
    this.reg[4] = 2842636476;
    this.reg[5] = 372324522;
    this.reg[6] = 3817729613;
    this.reg[7] = 2969243214;
    this.chunk = [];
    this.size = 0;
  }
  write(e) {
    const a = typeof e === "string" ? this.stringToBytes(e) : e;
    this.size += a.length;
    let f = 64 - this.chunk.length;
    if (a.length < f) {
      this.chunk = this.chunk.concat(a);
    } else {
      this.chunk = this.chunk.concat(a.slice(0, f));
      while (this.chunk.length >= 64) {
        this._compress(this.chunk);
        f < a.length ? this.chunk = a.slice(f, Math.min(f + 64, a.length)) : this.chunk = [];
        f += 64;
      }
    }
  }
  sum(e, t) {
    if (e) {
      this.reset();
      this.write(e);
    }
    this._fill();
    for (let f = 0; f < this.chunk.length; f += 64) {
      this._compress(this.chunk.slice(f, f + 64));
    }
    let i = null;
    if (t === "hex") {
      i = "";
      for (let f = 0; f < 8; f++) {
        i += this.padHex(this.reg[f].toString(16), 8);
      }
    } else {
      i = new Array(32);
      for (let f = 0; f < 8; f++) {
        let c = this.reg[f];
        i[4 * f + 3] = (255 & c) >>> 0;
        c >>>= 8;
        i[4 * f + 2] = (255 & c) >>> 0;
        c >>>= 8;
        i[4 * f + 1] = (255 & c) >>> 0;
        c >>>= 8;
        i[4 * f] = (255 & c) >>> 0;
      }
    }
    this.reset();
    return i;
  }
  _compress(t) {
    if (t.length < 64) {
      console.error("compress error: not enough data");
    } else {
      for (var f = ((e) => {
        for (var r = new Array(132), t2 = 0; t2 < 16; t2++) {
          r[t2] = e[4 * t2] << 24, r[t2] |= e[4 * t2 + 1] << 16, r[t2] |= e[4 * t2 + 2] << 8, r[t2] |= e[4 * t2 + 3], r[t2] >>>= 0;
        }
        for (var n = 16; n < 68; n++) {
          let a = r[n - 16] ^ r[n - 9] ^ this.le(r[n - 3], 15);
          a = a ^ this.le(a, 15) ^ this.le(a, 23), r[n] = (a ^ this.le(r[n - 13], 7) ^ r[n - 6]) >>> 0;
        }
        for (n = 0; n < 64; n++) r[n + 68] = (r[n] ^ r[n + 4]) >>> 0;
        return r;
      })(t), i = this.reg.slice(0), c = 0; c < 64; c++) {
        let o = this.le(i[0], 12) + i[4] + this.le(this.de(c), c);
        const s = ((o = this.le(o = (4294967295 & o) >>> 0, 7)) ^ this.le(i[0], 12)) >>> 0;
        let u = this.pe(c, i[0], i[1], i[2]);
        u = (4294967295 & (u = u + i[3] + s + f[c + 68])) >>> 0;
        let b = this.he(c, i[4], i[5], i[6]);
        b = (4294967295 & (b = b + i[7] + o + f[c])) >>> 0, i[3] = i[2], i[2] = this.le(i[1], 9), i[1] = i[0], i[0] = u, i[7] = i[6], i[6] = this.le(i[5], 19), i[5] = i[4], i[4] = (b ^ this.le(b, 9) ^ this.le(b, 17)) >>> 0;
      }
      for (let l = 0; l < 8; l++) this.reg[l] = (this.reg[l] ^ i[l]) >>> 0;
    }
  }
  _fill() {
    let a = 8 * this.size;
    let f = this.chunk.push(128) % 64;
    while (64 - f < 8) {
      f -= 64;
    }
    while (f < 56) {
      this.chunk.push(0);
      f++;
    }
    for (let i = 0; i < 4; i++) {
      const c = Math.floor(a / 4294967296);
      this.chunk.push(c >>> 8 * (3 - i) & 255);
    }
    for (let i = 0; i < 4; i++) {
      this.chunk.push(a >>> 8 * (3 - i) & 255);
    }
  }
  de(e) {
    return e >= 0 && e < 16 ? 2043430169 : e >= 16 && e < 64 ? 2055708042 : (console.error("invalid j for constant Tj"), 0);
  }
  pe(e, r, t, n) {
    return e >= 0 && e < 16 ? (r ^ t ^ n) >>> 0 : e >= 16 && e < 64 ? (r & t | r & n | t & n) >>> 0 : (console.error("invalid j for bool function FF"), 0);
  }
  he(e, r, t, n) {
    return e >= 0 && e < 16 ? (r ^ t ^ n) >>> 0 : e >= 16 && e < 64 ? (r & t | ~r & n) >>> 0 : (console.error("invalid j for bool function GG"), 0);
  }
  le(e, r) {
    return (e << (r %= 32) | e >>> 32 - r) >>> 0;
  }
  stringToBytes(str) {
    const n = encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, r) => String.fromCharCode(parseInt(r, 16)));
    const a = new Array(n.length);
    for (let i = 0; i < n.length; i++) {
      a[i] = n.charCodeAt(i);
    }
    return a;
  }
  padHex(num, size) {
    return num.padStart(size, "0");
  }
};
function rc4_encrypt(plaintext, key) {
  const s = [];
  for (var i = 0; i < 256; i++) {
    s[i] = i;
  }
  var j = 0;
  for (var i = 0; i < 256; i++) {
    j = (j + s[i] + key.charCodeAt(i % key.length)) % 256;
    var temp = s[i];
    s[i] = s[j];
    s[j] = temp;
  }
  var i = 0;
  var j = 0;
  const cipher = [];
  for (let k = 0; k < plaintext.length; k++) {
    i = (i + 1) % 256;
    j = (j + s[i]) % 256;
    var temp = s[i];
    s[i] = s[j];
    s[j] = temp;
    const t = (s[i] + s[j]) % 256;
    cipher.push(String.fromCharCode(s[t] ^ plaintext.charCodeAt(k)));
  }
  return cipher.join("");
}
function result_encrypt(long_str, num) {
  const s_obj = {
    s0: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    s1: "Dkdpgh4ZKsQB80/Mfvw36XI1R25+WUAlEi7NLboqYTOPuzmFjJnryx9HVGcaStCe=",
    s2: "Dkdpgh4ZKsQB80/Mfvw36XI1R25-WUAlEi7NLboqYTOPuzmFjJnryx9HVGcaStCe=",
    s3: "ckdp1h4ZKsUB80/Mfvw36XIgR25+WQAlEi7NLboqYTOPuzmFjJnryx9HVGDaStCe",
    s4: "Dkdpgh2ZmsQB80/MfvV36XI1R45-WUAlEixNLwoqYTOPuzKFjJnry79HbGcaStCe"
  };
  const constant = {
    0: 16515072,
    1: 258048,
    2: 4032,
    str: s_obj[num]
  };
  let result = "";
  let lound = 0;
  let long_int = get_long_int(lound, long_str);
  for (let i = 0; i < long_str.length / 3 * 4; i++) {
    if (Math.floor(i / 4) !== lound) {
      lound += 1;
      long_int = get_long_int(lound, long_str);
    }
    let key = i % 4;
    let temp_int;
    switch (key) {
      case 0:
        temp_int = (long_int & constant["0"]) >> 18;
        result += constant["str"].charAt(temp_int);
        break;
      case 1:
        temp_int = (long_int & constant["1"]) >> 12;
        result += constant["str"].charAt(temp_int);
        break;
      case 2:
        temp_int = (long_int & constant["2"]) >> 6;
        result += constant["str"].charAt(temp_int);
        break;
      case 3:
        temp_int = long_int & 63;
        result += constant["str"].charAt(temp_int);
        break;
    }
  }
  return result;
}
function get_long_int(round, long_str) {
  round = round * 3;
  return long_str.charCodeAt(round) << 16 | long_str.charCodeAt(round + 1) << 8 | long_str.charCodeAt(round + 2);
}
function gener_random(random, option) {
  return [
    random & 255 & 170 | option[0] & 85,
    // 163
    random & 255 & 85 | option[0] & 170,
    // 87
    random >> 8 & 255 & 170 | option[1] & 85,
    // 37
    random >> 8 & 255 & 85 | option[1] & 170
    // 41
  ];
}
function generate_rc4_bb_str(url_search_params, user_agent, window_env_str, suffix = "cus", Arguments = [0, 1, 14]) {
  let sm3 = new SM3();
  let start_time = Date.now();
  const url_search_params_list = sm3.sum(sm3.sum(url_search_params + suffix));
  const cus = sm3.sum(sm3.sum(suffix));
  const ua = sm3.sum(result_encrypt(rc4_encrypt(user_agent, String.fromCharCode.apply(null, [390625e-8, 1, 14])), "s3"));
  const end_time = Date.now();
  let b = {
    8: 3,
    // 固定
    10: end_time,
    // 3次加密结束时间
    15: {
      aid: 6383,
      pageId: 6241
    },
    16: start_time,
    // 3次加密开始时间
    18: 44
  };
  b[20] = b[16] >> 24 & 255;
  b[21] = b[16] >> 16 & 255;
  b[22] = b[16] >> 8 & 255;
  b[23] = b[16] & 255;
  b[24] = b[16] / 256 / 256 / 256 / 256 >> 0;
  b[25] = b[16] / 256 / 256 / 256 / 256 / 256 >> 0;
  b[26] = Arguments[0] >> 24 & 255;
  b[27] = Arguments[0] >> 16 & 255;
  b[28] = Arguments[0] >> 8 & 255;
  b[29] = Arguments[0] & 255;
  b[30] = Arguments[1] / 256 & 255;
  b[31] = Arguments[1] % 256 & 255;
  b[32] = Arguments[1] >> 24 & 255;
  b[33] = Arguments[1] >> 16 & 255;
  b[34] = Arguments[2] >> 24 & 255;
  b[35] = Arguments[2] >> 16 & 255;
  b[36] = Arguments[2] >> 8 & 255;
  b[37] = Arguments[2] & 255;
  b[38] = url_search_params_list[21];
  b[39] = url_search_params_list[22];
  b[40] = cus[21];
  b[41] = cus[22];
  b[42] = ua[23];
  b[43] = ua[24];
  b[44] = b[10] >> 24 & 255;
  b[45] = b[10] >> 16 & 255;
  b[46] = b[10] >> 8 & 255;
  b[47] = b[10] & 255;
  b[48] = b[8];
  b[49] = b[10] / 256 / 256 / 256 / 256 >> 0;
  b[50] = b[10] / 256 / 256 / 256 / 256 / 256 >> 0;
  b[51] = b[15].pageId;
  b[52] = b[15].pageId >> 24 & 255;
  b[53] = b[15].pageId >> 16 & 255;
  b[54] = b[15].pageId >> 8 & 255;
  b[55] = b[15].pageId & 255;
  b[56] = b[15].aid;
  b[57] = b[15].aid & 255;
  b[58] = b[15].aid >> 8 & 255;
  b[59] = b[15].aid >> 16 & 255;
  b[60] = b[15].aid >> 24 & 255;
  const window_env_list = [];
  for (let index = 0; index < window_env_str.length; index++) {
    window_env_list.push(window_env_str.charCodeAt(index));
  }
  b[64] = window_env_list.length;
  b[65] = b[64] & 255;
  b[66] = b[64] >> 8 & 255;
  b[69] = [].length;
  b[70] = b[69] & 255;
  b[71] = b[69] >> 8 & 255;
  b[72] = b[18] ^ b[20] ^ b[26] ^ b[30] ^ b[38] ^ b[40] ^ b[42] ^ b[21] ^ b[27] ^ b[31] ^ b[35] ^ b[39] ^ b[41] ^ b[43] ^ b[22] ^ b[28] ^ b[32] ^ b[36] ^ b[23] ^ b[29] ^ b[33] ^ b[37] ^ b[44] ^ b[45] ^ b[46] ^ b[47] ^ b[48] ^ b[49] ^ b[50] ^ b[24] ^ b[25] ^ b[52] ^ b[53] ^ b[54] ^ b[55] ^ b[57] ^ b[58] ^ b[59] ^ b[60] ^ b[65] ^ b[66] ^ b[70] ^ b[71];
  let bb = [
    b[18],
    b[20],
    b[52],
    b[26],
    b[30],
    b[34],
    b[58],
    b[38],
    b[40],
    b[53],
    b[42],
    b[21],
    b[27],
    b[54],
    b[55],
    b[31],
    b[35],
    b[57],
    b[39],
    b[41],
    b[43],
    b[22],
    b[28],
    b[32],
    b[60],
    b[36],
    b[23],
    b[29],
    b[33],
    b[37],
    b[44],
    b[45],
    b[59],
    b[46],
    b[47],
    b[48],
    b[49],
    b[50],
    b[24],
    b[25],
    b[65],
    b[66],
    b[70],
    b[71]
  ];
  bb = bb.concat(window_env_list).concat(b[72]);
  return rc4_encrypt(String.fromCharCode.apply(null, bb), String.fromCharCode.apply(null, [121]));
}
function generate_random_str() {
  let random_str_list = [];
  random_str_list = random_str_list.concat(gener_random(Math.random() * 1e4, [3, 45]));
  random_str_list = random_str_list.concat(gener_random(Math.random() * 1e4, [1, 0]));
  random_str_list = random_str_list.concat(gener_random(Math.random() * 1e4, [1, 5]));
  return String.fromCharCode.apply(null, random_str_list);
}
var a_bogus_default = (url2, user_agent) => {
  let result_str = generate_random_str() + generate_rc4_bb_str(new URLSearchParams(new URL(url2).search).toString(), user_agent, "1536|747|1536|834|0|30|0|0|1536|834|1536|864|1525|747|24|24|Win32");
  return result_encrypt(result_str, "s4") + "=";
};
var headers = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36"
};
var douyinSign = class {
  /** 生成一个指定长度的随机字符串 */
  static Mstoken(length) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const randomBytes = crypto.randomBytes(length);
    return Array.from(randomBytes, (byte) => characters[byte % characters.length]).join("");
  }
  /** a_bogus 签名算法 */
  static AB(url2) {
    return a_bogus_default(url2, headers["User-Agent"]);
  }
  /** 生成一个唯一的验证字符串 */
  static VerifyFpManager() {
    const e = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
    const t = e.length;
    const n = (/* @__PURE__ */ new Date()).getTime().toString(36);
    const r = [];
    r[8] = "_";
    r[13] = "_";
    r[18] = "_";
    r[23] = "_";
    r[14] = "4";
    for (let o, i = 0; i < 36; i++) {
      if (!r[i]) {
        o = 0 | Math.random() * t;
        r[i] = e[i === 19 ? 3 & o | 8 : o];
      }
    }
    return "verify_" + n + "_" + r.join("");
  }
};
var fp = douyinSign.VerifyFpManager();
var DouyinAPI = class {
  \u89C6\u9891\u6216\u56FE\u96C6(data2) {
    return `https://www.douyin.com/aweme/v1/web/aweme/detail/?device_platform=webapp&aid=6383&channel=channel_pc_web&aweme_id=${data2.aweme_id}&update_version_code=170400&pc_client_type=1&version_code=190500&version_name=19.5.0&cookie_enabled=true&screen_width=2328&screen_height=1310&browser_language=zh-CN&browser_platform=Win32&browser_name=Chrome&browser_version=125.0.0.0&browser_online=true&engine_name=Blink&engine_version=125.0.0.0&os_name=Windows&os_version=10&cpu_core_num=16&device_memory=8&platform=PC&downlink=10&effective_type=4g&round_trip_time=150&webid=7351848354471872041&msToken=${douyinSign.Mstoken(
      116
    )}&verifyFp=${fp}&fp=${fp}`;
  }
  \u8BC4\u8BBA(data2) {
    return `https://www.douyin.com/aweme/v1/web/comment/list/?device_platform=webapp&aid=6383&channel=channel_pc_web&aweme_id=${data2.aweme_id}&cursor=${data2.cursor ?? 0}&count=${data2.number ?? 50}&item_type=0&insert_ids=&whale_cut_token=&cut_version=1&rcFT=&pc_client_type=1&version_code=170400&version_name=17.4.0&cookie_enabled=true&screen_width=1552&screen_height=970&browser_language=zh-CN&browser_platform=Win32&browser_name=Chrome&browser_version=125.0.0.0&browser_online=true&engine_name=Blink&engine_version=125.0.0.0&os_name=Windows&os_version=10&cpu_core_num=16&device_memory=8&platform=PC&downlink=10&effective_type=4g&msToken=${douyinSign.Mstoken(
      116
    )}&verifyFp=${fp}&fp=${fp}`;
  }
  \u4E8C\u7EA7\u8BC4\u8BBA(data2) {
    return `https://www.douyin.com/aweme/v1/web/comment/list/reply/?device_platform=webapp&aid=6383&channel=channel_pc_web&item_id=${data2.aweme_id}&comment_id=${data2.comment_id}&cut_version=1&cursor=${data2.cursor}&count=${data2.number}&item_type=0&update_version_code=170400&pc_client_type=1&pc_libra_divert=Windows&support_h265=1&support_dash=1&version_code=170400&version_name=17.4.0&cookie_enabled=true&screen_width=1552&screen_height=970&browser_language=zh-CN&browser_platform=Win32&browser_name=Edge&browser_version=132.0.0.0&browser_online=true&engine_name=Blink&engine_version=132.0.0.0&os_name=Windows&os_version=10&cpu_core_num=16&device_memory=8&platform=PC&downlink=10&effective_type=4g&round_trip_time=50&webid=7386217876267796006&verifyFp=${fp}&fp=${fp}`;
  }
  \u52A8\u56FE(data2) {
    return `https://www.iesdouyin.com/web/api/v2/aweme/slidesinfo/?reflow_source=reflow_page&web_id=7326472315356857893&device_id=7326472315356857893&aweme_ids=[${data2.aweme_id}]&request_source=200&msToken=${douyinSign.Mstoken(
      116
    )}&verifyFp=${fp}&fp=${fp}`;
  }
  \u8868\u60C5() {
    return "https://www.douyin.com/aweme/v1/web/emoji/list";
  }
  \u7528\u6237\u4E3B\u9875\u89C6\u9891(data2) {
    return `https://www.douyin.com/aweme/v1/web/aweme/post/?device_platform=webapp&aid=6383&channel=channel_pc_web&sec_user_id=${data2.sec_uid}&max_cursor=0&locate_query=false&show_live_replay_strategy=1&need_time_list=1&time_list_query=0&whale_cut_token=&cut_version=1&count=18&publish_video_strategy_type=2&pc_client_type=1&version_code=170400&version_name=17.4.0&cookie_enabled=true&screen_width=1552&screen_height=970&browser_language=zh-CN&browser_platform=Win32&browser_name=Chrome&browser_version=125.0.0.0&browser_online=true&engine_name=Blink&engine_version=125.0.0.0&os_name=Windows&os_version=10&cpu_core_num=16&device_memory=8&platform=PC&downlink=10&effective_type=4g&round_trip_time=50&webid=7338423850134226495&msToken=${douyinSign.Mstoken(
      116
    )}&verifyFp=${fp}&fp=${fp}`;
  }
  \u7528\u6237\u4E3B\u9875\u4FE1\u606F(data2) {
    return `https://www.douyin.com/aweme/v1/web/user/profile/other/?device_platform=webapp&aid=6383&channel=channel_pc_web&publish_video_strategy_type=2&source=channel_pc_web&sec_user_id=${data2.sec_uid}&personal_center_strategy=1&pc_client_type=1&version_code=170400&version_name=17.4.0&cookie_enabled=true&screen_width=1552&screen_height=970&browser_language=zh-CN&browser_platform=Win32&browser_name=Chrome&browser_version=125.0.0.0&browser_online=true&engine_name=Blink&engine_version=125.0.0.0&os_name=Windows&os_version=10&cpu_core_num=16&device_memory=8&platform=PC&downlink=10&effective_type=4g&round_trip_time=0&webid=7327957959955580467&msToken=${douyinSign.Mstoken(
      116
    )}&verifyFp=${fp}&fp=${fp}`;
  }
  \u70ED\u70B9\u8BCD(data2) {
    return `https://www.douyin.com/aweme/v1/web/api/suggest_words/?device_platform=webapp&aid=6383&channel=channel_pc_web&query=${data2.query}&business_id=30088&from_group_id=7129543174929812767&pc_client_type=1&version_code=170400&version_name=17.4.0&cookie_enabled=true&screen_width=1552&screen_height=970&browser_language=zh - CN&browser_platform=Win32&browser_name=Chrome&browser_version=125.0.0.0&browser_online=true&engine_name=Blink&engine_version=125.0.0.0&os_name=Windows&os_version=10&cpu_core_num=16&device_memory=8&platform=PC&downlink=10&effective_type=4g&round_trip_time=50&webid=7327957959955580467&msToken=${douyinSign.Mstoken(
      116
    )}&verifyFp=${fp}&fp=${fp}`;
  }
  \u641C\u7D22(data2) {
    return `https://www.douyin.com/aweme/v1/web/general/search/single/?device_platform=webapp&aid=6383&channel=channel_pc_web&search_channel=aweme_general&sort_type=0&publish_time=0&keyword=${data2.query}&search_source=normal_search&query_correct_type=1&is_filter_search=0&from_group_id=&offset=0&count=15&pc_client_type=1&version_code=190600&version_name=19.6.0&cookie_enabled=true&screen_width=1552&screen_height=970&browser_language=zh-CN&browser_platform=Win32&browser_name=Chrome&browser_version=125.0.0.0&browser_online=true&engine_name=Blink&engine_version=125.0.0.0&os_name=Windows&os_version=10&cpu_core_num=16&device_memory=8&platform=PC&downlink=10&effective_type=4g&round_trip_time=50&webid=7338423850134226495&msToken=${douyinSign.Mstoken(
      116
    )}&verifyFp=${fp}&fp=${fp}&search_id=${data2.search_id ?? ""}&count=${data2.number ?? 10}`;
  }
  \u4E92\u52A8\u8868\u60C5() {
    return `https://www.douyin.com/aweme/v1/web/im/strategy/config?device_platform=webapp&aid=1128&channel=channel_pc_web&publish_video_strategy_type=2&app_id=1128&scenes=[%22interactive_resources%22]&pc_client_type=1&version_code=170400&version_name=17.4.0&cookie_enabled=true&screen_width=2328&screen_height=1310&browser_language=zh-CN&browser_platform=Win32&browser_name=Chrome&browser_version=126.0.0.0&browser_online=true&engine_name=Blink&engine_version=126.0.0.0&os_name=Windows&os_version=10&cpu_core_num=16&device_memory=8&platform=PC&downlink=1.5&effective_type=4g&round_trip_time=350&webid=7347329698282833447&msToken=${douyinSign.Mstoken(
      116
    )}&verifyFp=${fp}&fp=${fp}`;
  }
  \u80CC\u666F\u97F3\u4E50(data2) {
    return `https://www.douyin.com/aweme/v1/web/music/detail/?device_platform=webapp&aid=6383&channel=channel_pc_web&music_id=${data2.music_id}&scene=1&pc_client_type=1&version_code=170400&version_name=17.4.0&cookie_enabled=true&screen_width=2328&screen_height=1310&browser_language=zh-CN&browser_platform=Win32&browser_name=Chrome&browser_version=126.0.0.0&browser_online=true&engine_name=Blink&engine_version=126.0.0.0&os_name=Windows&os_version=10&cpu_core_num=16&device_memory=8&platform=PC&downlink=1.5&effective_type=4g&round_trip_time=350&webid=7347329698282833447&msToken=${douyinSign.Mstoken(
      116
    )}&verifyFp=${fp}&fp=${fp}`;
  }
  \u76F4\u64AD\u95F4\u4FE1\u606F(data2) {
    return `https://live.douyin.com/webcast/room/web/enter/?aid=6383&app_name=douyin_web&live_id=1&device_platform=web&language=zh-CN&enter_from=web_share_link&cookie_enabled=true&screen_width=2048&screen_height=1152&browser_language=zh-CN&browser_platform=Win32&browser_name=Chrome&browser_version=125.0.0.0&web_rid=${data2.web_rid}&room_id_str=${data2.room_id}&enter_source=&is_need_double_stream=false&insert_task_id=&live_reason=&msToken=${douyinSign.Mstoken(
      116
    )}&verifyFp=${fp}&fp=${fp}`;
  }
  \u7533\u8BF7\u4E8C\u7EF4\u7801(data2) {
    return `https://sso.douyin.com/get_qrcode/?verifyFp=${data2.verify_fp}&fp=${data2.verify_fp}`;
  }
};
var douyinAPI = new DouyinAPI();
var registerDouyinRoutes = (cookie) => {
  const router = express.Router();
  router.get("/fetch_one_work", async (req, res) => {
    const data2 = await DouyinData({
      methodType: "\u805A\u5408\u89E3\u6790",
      aweme_id: req.query.aweme_id
    }, req.headers.cookie || cookie);
    res.json(data2);
  });
  router.get("/fetch_work_comments", async (req, res) => {
    const data2 = await DouyinData({
      methodType: "\u8BC4\u8BBA\u6570\u636E",
      aweme_id: req.query.aweme_id,
      number: parseInt(req.query.number ?? "50"),
      cursor: parseInt(req.query.cursor ?? "0")
    }, req.headers.cookie || cookie);
    res.json(data2);
  });
  router.get("/fetch_video_comment_replies", async (req, res) => {
    const data2 = await DouyinData({
      methodType: "\u6307\u5B9A\u8BC4\u8BBA\u56DE\u590D\u6570\u636E",
      aweme_id: req.query.aweme_id,
      comment_id: req.query.comment_id
    }, req.headers.cookie || cookie);
    res.json(data2);
  });
  router.get("/fetch_user_info", async (req, res) => {
    const data2 = await DouyinData({
      methodType: "\u7528\u6237\u4E3B\u9875\u6570\u636E",
      sec_uid: req.query.sec_uid
    }, req.headers.cookie || cookie);
    res.json(data2);
  });
  router.get("/fetch_user_post_videos", async (req, res) => {
    const data2 = await DouyinData({
      methodType: "\u7528\u6237\u4E3B\u9875\u89C6\u9891\u5217\u8868\u6570\u636E",
      sec_uid: req.query.sec_uid
    }, req.headers.cookie || cookie);
    res.json(data2);
  });
  router.get("/fetch_suggest_words", async (req, res) => {
    const data2 = await DouyinData({
      methodType: "\u70ED\u70B9\u8BCD\u6570\u636E",
      query: req.query.query
    }, req.headers.cookie || cookie);
    res.json(data2);
  });
  router.get("/fetch_search_info", async (req, res) => {
    const data2 = await DouyinData({
      methodType: "\u641C\u7D22\u6570\u636E",
      query: req.query.query,
      number: parseInt(req.query.number ?? "10"),
      search_id: req.query.search_id
    }, req.headers.cookie || cookie);
    res.json(data2);
  });
  router.get("/fetch_emoji_list", async (req, res) => {
    const data2 = await DouyinData({
      methodType: "Emoji\u6570\u636E"
    }, req.headers.cookie || cookie);
    res.json(data2);
  });
  router.get("/fetch_emoji_pro_list", async (req, res) => {
    const data2 = await DouyinData({
      methodType: "\u52A8\u6001\u8868\u60C5\u6570\u636E"
    }, req.headers.cookie || cookie);
    res.json(data2);
  });
  router.get("/fetch_music_work", async (req, res) => {
    const data2 = await DouyinData({
      methodType: "\u97F3\u4E50\u6570\u636E",
      music_id: req.query.music_id
    }, req.headers.cookie || cookie);
    res.json(data2);
  });
  router.get("/fetch_user_mix_videos", async (req, res) => {
    const data2 = await DouyinData({
      methodType: "\u5408\u8F91\u4F5C\u54C1\u6570\u636E",
      aweme_id: req.query.aweme_id
    }, req.headers.cookie || cookie);
    res.json(data2);
  });
  router.get("/fetch_user_live_videos", async (req, res) => {
    const data2 = await DouyinData({
      methodType: "\u76F4\u64AD\u95F4\u4FE1\u606F\u6570\u636E",
      sec_uid: req.query.sec_uid
    }, req.headers.cookie || cookie);
    res.json(data2);
  });
  return router;
};
var defheaders2 = {
  accept: "*/*",
  priority: "u=0, i",
  "content-type": "application/json",
  "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
  "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
  referer: "https://www.douyin.com/",
  "accept-encoding": "gzip, deflate, br",
  connection: "keep-alive"
};
var DouyinData = async (data2, cookie) => {
  const headers2 = {
    ...defheaders2,
    cookie: cookie ? cookie.replace(/\s+/g, "") : ""
  };
  switch (data2.methodType) {
    case "\u805A\u5408\u89E3\u6790":
    case "\u89C6\u9891\u4F5C\u54C1\u6570\u636E":
    case "\u56FE\u96C6\u4F5C\u54C1\u6570\u636E":
    case "\u5408\u8F91\u4F5C\u54C1\u6570\u636E": {
      DouyinValidateData(data2, ["aweme_id"]);
      const url2 = douyinAPI.\u89C6\u9891\u6216\u56FE\u96C6({ aweme_id: data2.aweme_id });
      const VideoData = await GlobalGetData2({
        url: `${url2}&a_bogus=${douyinSign.AB(url2)}`,
        headers: headers2,
        ...data2
      });
      return VideoData;
    }
    case "\u8BC4\u8BBA\u6570\u636E": {
      DouyinValidateData(data2, ["aweme_id"]);
      const urlGenerator = (params) => douyinAPI.\u8BC4\u8BBA(params);
      const response = await fetchPaginatedData(urlGenerator, data2, 50, headers2);
      return response;
    }
    case "\u6307\u5B9A\u8BC4\u8BBA\u56DE\u590D\u6570\u636E": {
      DouyinValidateData(data2, ["aweme_id", "comment_id"]);
      const urlGenerator = (params) => douyinAPI.\u4E8C\u7EA7\u8BC4\u8BBA(params);
      const response = await fetchPaginatedData(
        urlGenerator,
        data2,
        3,
        {
          ...headers2,
          referer: `https://www.douyin.com/note/${data2.aweme_id}`
        }
      );
      return response;
    }
    case "\u7528\u6237\u4E3B\u9875\u6570\u636E": {
      DouyinValidateData(data2, ["sec_uid"]);
      const url2 = douyinAPI.\u7528\u6237\u4E3B\u9875\u4FE1\u606F({ sec_uid: data2.sec_uid });
      const UserInfoData = await GlobalGetData2({
        url: `${url2}&a_bogus=${douyinSign.AB(url2)}`,
        headers: {
          ...headers2,
          Referer: `https://www.douyin.com/user/${data2.sec_uid}`
        },
        ...data2
      });
      return UserInfoData;
    }
    case "Emoji\u6570\u636E": {
      const url2 = douyinAPI.\u8868\u60C5();
      const EmojiData = await GlobalGetData2({
        url: url2,
        headers: headers2,
        ...data2
      });
      return EmojiData;
    }
    case "\u7528\u6237\u4E3B\u9875\u89C6\u9891\u5217\u8868\u6570\u636E": {
      DouyinValidateData(data2, ["sec_uid"]);
      const url2 = douyinAPI.\u7528\u6237\u4E3B\u9875\u89C6\u9891({ sec_uid: data2.sec_uid });
      const UserVideoListData = await GlobalGetData2({
        url: `${url2}&a_bogus=${douyinSign.AB(url2)}`,
        headers: {
          ...headers2,
          Referer: `https://www.douyin.com/user/${data2.sec_uid}`
        },
        ...data2
      });
      return UserVideoListData;
    }
    case "\u70ED\u70B9\u8BCD\u6570\u636E": {
      DouyinValidateData(data2, ["query"]);
      const url2 = douyinAPI.\u70ED\u70B9\u8BCD({ query: data2.query, number: data2.number ?? 10 });
      const SuggestWordsData = await GlobalGetData2({
        url: `${url2}&a_bogus=${douyinSign.AB(url2)}`,
        headers: {
          ...headers2,
          Referer: `https://www.douyin.com/search/${encodeURIComponent(String(data2.query))}`
        },
        ...data2
      });
      return SuggestWordsData;
    }
    case "\u641C\u7D22\u6570\u636E": {
      DouyinValidateData(data2, ["query"]);
      let search_id = "";
      const maxPageSize = 15;
      let fetchedSearchList = [];
      let tmpresp = {};
      while (fetchedSearchList.length < Number(data2.number ?? 10)) {
        const requestCount = Math.min(Number(data2.number ?? 50) - fetchedSearchList.length, maxPageSize);
        const url2 = douyinAPI.\u641C\u7D22({
          query: data2.query,
          number: requestCount,
          search_id: search_id === "" ? void 0 : search_id
        });
        const response = await GlobalGetData2({
          url: `${url2}&a_bogus=${douyinSign.AB(url2)}`,
          headers: {
            ...headers2,
            Referer: `https://www.douyin.com/search/${encodeURIComponent(String(data2.query))}`
          },
          ...data2
        });
        if (response.data.length === 0) {
          logger2.warn("\u83B7\u53D6\u641C\u7D22\u6570\u636E\u5931\u8D25\uFF01\u8BF7\u6C42\u6210\u529F\u4F46\u63A5\u53E3\u8FD4\u56DE\u5185\u5BB9\u4E3A\u7A7A\n\u4F60\u7684\u6296\u97F3ck\u53EF\u80FD\u5DF2\u7ECF\u5931\u6548\uFF01\n\u8BF7\u6C42\u7C7B\u578B\uFF1A" + data2.methodType);
          return false;
        }
        if (!response.data) {
          response.data = [];
        }
        fetchedSearchList.push(...response.data);
        tmpresp = response;
        search_id = response.log_pb.impr_id;
      }
      const finalResponse = {
        ...tmpresp,
        data: data2.number === 0 ? [] : fetchedSearchList.slice(0, Number(data2.number ?? 10))
      };
      return finalResponse;
    }
    case "\u52A8\u6001\u8868\u60C5\u6570\u636E": {
      const url2 = douyinAPI.\u4E92\u52A8\u8868\u60C5();
      const ExpressionPlusData = await GlobalGetData2({
        url: `${url2}&a_bogus=${douyinSign.AB(url2)}`,
        headers: headers2,
        ...data2
      });
      return ExpressionPlusData;
    }
    case "\u97F3\u4E50\u6570\u636E": {
      DouyinValidateData(data2, ["music_id"]);
      const url2 = douyinAPI.\u80CC\u666F\u97F3\u4E50({ music_id: data2.music_id });
      const MusicData = await GlobalGetData2({
        url: `${url2}&a_bogus=${douyinSign.AB(url2)}`,
        headers: headers2,
        ...data2
      });
      return MusicData;
    }
    case "\u76F4\u64AD\u95F4\u4FE1\u606F\u6570\u636E": {
      DouyinValidateData(data2, ["sec_uid"]);
      let url2 = douyinAPI.\u7528\u6237\u4E3B\u9875\u4FE1\u606F({ sec_uid: data2.sec_uid });
      const UserInfoData = await GlobalGetData2({
        url: `${url2}&a_bogus=${douyinSign.AB(url2)}`,
        headers: {
          ...headers2,
          Referer: `https://www.douyin.com/user/${data2.sec_uid}`
        },
        ...data2
      });
      if (UserInfoData.user.live_status !== 1) logger2.error(UserInfoData.user.nickname + "\u672A\u5F00\u542F\u76F4\u64AD\uFF01");
      if (!UserInfoData.user.room_data) {
        logger2.error("\u672A\u83B7\u53D6\u5230\u76F4\u64AD\u95F4\u4FE1\u606F\uFF01");
        return {
          code: 500,
          message: "\u672A\u83B7\u53D6\u5230\u76F4\u64AD\u95F4\u4FE1\u606F\uFF01",
          data: null
        };
      }
      const room_data = JSON.parse(UserInfoData.user.room_data);
      url2 = douyinAPI.\u76F4\u64AD\u95F4\u4FE1\u606F({ room_id: UserInfoData.user.room_id_str, web_rid: room_data.owner.web_rid });
      const LiveRoomData = await GlobalGetData2({
        url: `${url2}&a_bogus=${douyinSign.AB(url2)}`,
        headers: {
          ...headers2,
          Referer: `https://live.douyin.com/${room_data.owner.web_rid}`
        },
        ...data2
      });
      return LiveRoomData;
    }
    case "\u7533\u8BF7\u4E8C\u7EF4\u7801\u6570\u636E": {
      DouyinValidateData(data2, ["verify_fp"]);
      const url2 = douyinAPI.\u7533\u8BF7\u4E8C\u7EF4\u7801({ verify_fp: data2.verify_fp });
      const LoginQrcodeStatusData = await GlobalGetData2({
        url: `${url2}&a_bogus=${douyinSign.AB(url2)}`,
        headers: headers2,
        ...data2
      });
      return LoginQrcodeStatusData;
    }
    default:
      logger2.warn(`\u672A\u77E5\u7684B\u7AD9\u6570\u636E\u63A5\u53E3\uFF1A\u300C${logger2.red(data2.methodType)}\u300D`);
      return null;
  }
};
async function fetchPaginatedData(apiUrlGenerator, params, maxPageSize, headers2) {
  let cursor = params.cursor ?? 0;
  let fetchedData = [];
  let tmpresp = {};
  while (fetchedData.length < Number(params.number ?? maxPageSize)) {
    const requestCount = Math.min(Number(params.number ?? maxPageSize) - fetchedData.length, maxPageSize);
    const url2 = apiUrlGenerator({
      ...params,
      number: requestCount,
      cursor
    });
    const response = await GlobalGetData2({
      url: `${url2}&a_bogus=${douyinSign.AB(url2)}`,
      headers: headers2,
      ...params
    });
    fetchedData.push(...response.comments || response.data || []);
    tmpresp = response;
    if ((response.comments || response.data || []).length < requestCount) {
      break;
    }
    cursor = response.cursor;
  }
  const finalResponse = {
    ...tmpresp,
    comments: params.number === 0 ? [] : fetchedData.slice(0, Number(params.number ?? maxPageSize)),
    cursor: params.number === 0 ? 0 : fetchedData.length
  };
  return finalResponse;
}
async function GlobalGetData2(options) {
  const ResponseData = await new Networks(options).getData();
  if (ResponseData === "" || !ResponseData) {
    logger2.warn(`\u83B7\u53D6\u54CD\u5E94\u6570\u636E\u5931\u8D25\uFF01\u63A5\u53E3\u8FD4\u56DE\u5185\u5BB9\u4E3A\u7A7A
\u4F60\u7684\u6296\u97F3ck\u53EF\u80FD\u5DF2\u7ECF\u5931\u6548\uFF01
\u8BF7\u6C42\u7C7B\u578B\uFF1A\u300C${options.methodType}\u300D
\u8BF7\u6C42URL\uFF1A options.url`);
    return false;
  }
  return ResponseData;
}
var API = class {
  \u5355\u4E2A\u4F5C\u54C1\u4FE1\u606F(data2) {
    return {
      /** 接口类型 */
      type: "visionVideoDetail",
      /** 请求url */
      url: "https://www.kuaishou.com/graphql",
      /** 请求参数 */
      body: {
        /** 接口类型 */
        operationName: "visionVideoDetail",
        variables: {
          /** 作品ID */
          photoId: data2.photoId,
          page: "detail"
        },
        query: "query visionVideoDetail($photoId: String, $type: String, $page: String, $webPageArea: String) {\n  visionVideoDetail(photoId: $photoId, type: $type, page: $page, webPageArea: $webPageArea) {\n    status\n    type\n    author {\n      id\n      name\n      following\n      headerUrl\n      __typename\n    }\n    photo {\n      id\n      duration\n      caption\n      likeCount\n      realLikeCount\n      coverUrl\n      photoUrl\n      liked\n      timestamp\n      expTag\n      llsid\n      viewCount\n      videoRatio\n      stereoType\n      musicBlocked\n      manifest {\n        mediaType\n        businessType\n        version\n        adaptationSet {\n          id\n          duration\n          representation {\n            id\n            defaultSelect\n            backupUrl\n            codecs\n            url\n            height\n            width\n            avgBitrate\n            maxBitrate\n            m3u8Slice\n            qualityType\n            qualityLabel\n            frameRate\n            featureP2sp\n            hidden\n            disableAdaptive\n            __typename\n          }\n          __typename\n        }\n        __typename\n      }\n      manifestH265\n      photoH265Url\n      coronaCropManifest\n      coronaCropManifestH265\n      croppedPhotoH265Url\n      croppedPhotoUrl\n      videoResource\n      __typename\n    }\n    tags {\n      type\n      name\n      __typename\n    }\n    commentLimit {\n      canAddComment\n      __typename\n    }\n    llsid\n    danmakuSwitch\n    __typename\n  }\n}\n"
      }
    };
  }
  \u4F5C\u54C1\u8BC4\u8BBA\u4FE1\u606F(data2) {
    return {
      type: "commentListQuery",
      url: "https://www.kuaishou.com/graphql",
      body: {
        operationName: "commentListQuery",
        variables: {
          photoId: data2.photoId,
          pcursor: ""
        },
        query: "query commentListQuery($photoId: String, $pcursor: String) {\n  visionCommentList(photoId: $photoId, pcursor: $pcursor) {\n    commentCount\n    pcursor\n    rootComments {\n      commentId\n      authorId\n      authorName\n      content\n      headurl\n      timestamp\n      likedCount\n      realLikedCount\n      liked\n      status\n      authorLiked\n      subCommentCount\n      subCommentsPcursor\n      subComments {\n        commentId\n        authorId\n        authorName\n        content\n        headurl\n        timestamp\n        likedCount\n        realLikedCount\n        liked\n        status\n        authorLiked\n        replyToUserName\n        replyTo\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n"
      }
    };
  }
  \u8868\u60C5() {
    return {
      type: "visionBaseEmoticons",
      url: "https://www.kuaishou.com/graphql",
      body: {
        operationName: "visionBaseEmoticons",
        variables: {},
        query: "query visionBaseEmoticons {\n  visionBaseEmoticons {\n    iconUrls\n    __typename\n  }\n}\n"
      }
    };
  }
};
var kuaishouAPI = new API();
var registerKuaishouRoutes = (cookie) => {
  const router = express.Router();
  router.get("/fetch_one_work", async (req, res) => {
    const data2 = await KuaishouData({
      methodType: "\u5355\u4E2A\u89C6\u9891\u4F5C\u54C1\u6570\u636E",
      photoId: req.query.photoId
    }, req.headers.cookie || cookie);
    res.json(data2);
  });
  router.get("/fetch_work_comments", async (req, res) => {
    const data2 = await KuaishouData({
      methodType: "\u8BC4\u8BBA\u6570\u636E",
      photoId: req.query.photoId
    }, req.headers.cookie || cookie);
    res.json(data2);
  });
  router.get("/fetch_emoji_list", async (req, res) => {
    const data2 = await KuaishouData({
      methodType: "Emoji\u6570\u636E"
    }, req.headers.cookie || cookie);
    res.json(data2);
  });
  return router;
};
var defheaders3 = {
  referer: "https://www.kuaishou.com/new-reco",
  origin: "https://www.kuaishou.com",
  accept: "*/*",
  "content-type": "application/json",
  "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
  "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36 Edg/130.0.0.0"
};
var KuaishouData = async (data2, cookie) => {
  const headers2 = {
    ...defheaders3,
    cookie: cookie ? cookie.replace(/\s+/g, "") : ""
  };
  switch (data2.methodType) {
    case "\u5355\u4E2A\u89C6\u9891\u4F5C\u54C1\u6570\u636E": {
      KusiahouValidateData(data2, ["photoId"]);
      const body = kuaishouAPI.\u5355\u4E2A\u4F5C\u54C1\u4FE1\u606F({ photoId: data2.photoId });
      const VideoData = await GlobalGetData3({
        url: body.url,
        method: "POST",
        headers: headers2,
        body: body.body,
        ...data2
      });
      return VideoData;
    }
    case "\u8BC4\u8BBA\u6570\u636E": {
      KusiahouValidateData(data2, ["photoId"]);
      const body = kuaishouAPI.\u4F5C\u54C1\u8BC4\u8BBA\u4FE1\u606F({ photoId: data2.photoId });
      const VideoData = await GlobalGetData3({
        url: body.url,
        method: "POST",
        headers: headers2,
        body: body.body,
        ...data2
      });
      return VideoData;
    }
    case "Emoji\u6570\u636E": {
      const body = kuaishouAPI.\u8868\u60C5();
      const EmojiData = await GlobalGetData3({
        url: body.url,
        method: "POST",
        headers: headers2,
        body: body.body,
        ...data2
      });
      return EmojiData;
    }
    default:
      logger2.warn(`\u672A\u77E5\u7684\u5FEB\u624B\u6570\u636E\u63A5\u53E3\uFF1A\u300C${logger2.red(data2.methodType)}\u300D`);
      return null;
  }
};
async function GlobalGetData3(options) {
  const ResponseData = await new Networks(options).getData();
  if (ResponseData.result === 2) {
    logger2.warn(`\u83B7\u53D6\u54CD\u5E94\u6570\u636E\u5931\u8D25\uFF01\u63A5\u53E3\u8FD4\u56DE\u5185\u5BB9\u4E3A\u7A7A
\u4F60\u7684\u5FEB\u624Bck\u53EF\u80FD\u5DF2\u7ECF\u5931\u6548\uFF01
\u8BF7\u6C42\u7C7B\u578B\uFF1A${options.methodType}
\u8BF7\u6C42URL\uFF1A${options.url}
\u8BF7\u6C42\u53C2\u6570\uFF1A${JSON.stringify(options.body, null, 2)}`);
    return false;
  }
  return ResponseData;
}
async function getDouyinData(type, arg2, arg3) {
  let cookie;
  let options;
  if (typeof arg2 === "string") {
    cookie = arg2;
    options = arg3;
  } else {
    options = arg2;
    cookie = arg3;
  }
  const data2 = await DouyinData({ ...options, methodType: type }, cookie);
  return data2;
}
async function getBilibiliData(methodType, arg2, arg3) {
  let cookie;
  let options;
  if (typeof arg2 === "string") {
    cookie = arg2;
    options = arg3;
  } else {
    options = arg2;
    cookie = arg3;
  }
  const data2 = await BilibiliData({ ...options, methodType }, cookie);
  return data2;
}
async function getKuaishouData(methodType, arg2, arg3) {
  let cookie;
  let options;
  if (typeof arg2 === "string") {
    cookie = arg2;
    options = arg3;
  } else {
    options = arg2;
    cookie = arg3;
  }
  const data2 = await KuaishouData({ ...options, methodType }, cookie);
  return data2;
}
log4js_default.configure({
  appenders: {
    console: {
      type: "stdout",
      layout: {
        type: "pattern",
        pattern: "%[[amagi][%d{hh:mm:ss.SSS}][%4.4p]%] %m"
      }
    },
    command: {
      type: "dateFile",
      filename: "logs/command",
      pattern: "yyyy-MM-dd.log",
      numBackups: 15,
      alwaysIncludePattern: true,
      layout: {
        type: "pattern",
        pattern: "[%d{hh:mm:ss.SSS}][%4.4p] %m"
      }
    },
    pluginConsole: {
      type: "stdout",
      layout: {
        type: "pattern",
        pattern: "%[[%d{hh:mm:ss.SSS}][%4.4p][plugin]%] %m"
      }
    },
    pluginCommand: {
      type: "dateFile",
      filename: "logs/pluginCommand",
      pattern: "yyyy-MM-dd.log",
      numBackups: 15,
      alwaysIncludePattern: true,
      layout: { type: "pattern", pattern: "[%d{hh:mm:ss.SSS}][%4.4p] %m" }
    }
  },
  categories: {
    default: { appenders: ["console", "command"], level: "info" }
    // 添加default类别
  },
  pm2: true
});
var CustomLogger = class {
  logger;
  chalk;
  red;
  green;
  yellow;
  blue;
  magenta;
  cyan;
  white;
  gray;
  constructor(name) {
    this.logger = log4js_default.getLogger(name);
    this.chalk = import_chalk.default;
    this.red = import_chalk.default.red.bind(import_chalk.default);
    this.green = import_chalk.default.green.bind(import_chalk.default);
    this.yellow = import_chalk.default.yellow.bind(import_chalk.default);
    this.blue = import_chalk.default.blue.bind(import_chalk.default);
    this.magenta = import_chalk.default.magenta.bind(import_chalk.default);
    this.cyan = import_chalk.default.cyan.bind(import_chalk.default);
    this.white = import_chalk.default.white.bind(import_chalk.default);
    this.gray = import_chalk.default.gray.bind(import_chalk.default);
  }
  // 代理 log4js.Logger 的方法
  info(message, ...args) {
    this.logger.info(message, ...args);
  }
  warn(message, ...args) {
    this.logger.warn(message, ...args);
  }
  error(message, ...args) {
    this.logger.error(message, ...args);
  }
  mark(message, ...args) {
    this.logger.mark(message, ...args);
  }
};
var logger2 = new CustomLogger("default");
var logMiddleware = (pathsToLog) => {
  return (req, res, next) => {
    if (!pathsToLog || pathsToLog.some((path3) => req.url.startsWith(path3))) {
      const startTime = Date.now();
      const url2 = req.url;
      const method = req.method;
      const clientIP = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
      res.on("finish", () => {
        const responseTime = Date.now() - startTime;
        const statusCode = res.statusCode;
        logger2.info(`[${method}] ${url2} (Status: ${statusCode}, Time: ${responseTime}ms, Client: ${clientIP})`);
      });
    }
    next();
  };
};
var Networks = class {
  url;
  method;
  headers;
  type;
  body;
  axiosInstance;
  isGetResult;
  timeout;
  timer;
  data;
  constructor(data2) {
    this.headers = data2.headers ?? {};
    this.url = data2.url ?? "";
    this.type = data2.responseType ?? "json";
    this.method = data2.method ?? "GET";
    this.body = data2.body ?? null;
    this.data = {};
    this.timeout = data2.timeout ?? 15e3;
    this.isGetResult = false;
    this.timer = void 0;
    this.axiosInstance = axios.create({
      timeout: this.timeout,
      headers: this.headers,
      maxRedirects: 5,
      validateStatus: (status) => {
        return status >= 200 && status < 600;
      }
    });
  }
  get config() {
    let config = {
      url: this.url,
      method: this.method,
      headers: this.headers
    };
    if (this.method === "POST" && this.body) {
      config.data = this.body;
    }
    return config;
  }
  async getfetch() {
    try {
      const result = await this.returnResult();
      if (result.status === 504) {
        return result;
      }
      this.isGetResult = true;
      return result;
    } catch (error) {
      logger2.info(error);
      return false;
    }
  }
  async returnResult() {
    return await this.axiosInstance(this.config);
  }
  /** 最终地址（跟随重定向） */
  async getLongLink() {
    try {
      const response = await this.axiosInstance({
        method: "GET",
        url: this.url
      });
      return response.request.res.responseUrl;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.stack);
      }
      return "";
    }
  }
  /** 获取首个302 */
  async getLocation() {
    try {
      const response = await this.axiosInstance({
        method: "GET",
        url: this.url,
        maxRedirects: 0,
        // 禁止跟随重定向
        validateStatus: (status) => status >= 300 && status < 400
        // 仅处理3xx响应
      });
      return response.headers["location"];
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.stack);
      }
      return "";
    }
  }
  /** 获取数据并处理数据的格式化，默认json */
  async getData(new_fetch = "") {
    try {
      if (!new_fetch) {
        const result = await this.returnResult();
        if (result.status === 504) {
          return result;
        }
        if (result.status === 429) {
          logger2.error("HTTP \u54CD\u5E94\u72B6\u6001\u7801: 429");
          throw new Error("ratelimit triggered, \u89E6\u53D1 https://www.douyin.com/ \u7684\u901F\u7387\u9650\u5236\uFF01\uFF01\uFF01");
        }
        this.axiosInstance = result;
        this.isGetResult = true;
      } else {
        this.axiosInstance = new_fetch;
      }
      return this.axiosInstance.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.stack);
      }
      return false;
    }
  }
  async getHeadersAndData() {
    try {
      const result = await this.axiosInstance(this.config);
      let headers2 = {};
      const fetchHeaders = result.headers;
      for (const [key, value] of Object.entries(fetchHeaders)) {
        headers2[key] = value;
      }
      return { headers: headers2, data: result.data };
    } catch (error) {
      console.error("\u83B7\u53D6\u54CD\u5E94\u5934\u548C\u6570\u636E\u5931\u8D25:", error);
      return { headers: null, data: null };
    }
  }
};
var DouyinValidateData = (data2, fields, atLeastOne = false) => {
  const checkField = (field) => Object.prototype.hasOwnProperty.call(data2, field);
  const isValid = atLeastOne ? fields.some(checkField) : fields.every(checkField);
  if (!isValid) {
    const missingFields = atLeastOne ? fields : fields.filter((f) => !checkField(f));
    const missingStr = missingFields.map((f) => `'${logger2.green(f.toString())}'`).join(", ");
    throw new Error(`\u83B7\u53D6\u300C${data2.methodType}\u300D${logger2.red("\u7F3A\u5C11\u53C2\u6570")}: ${missingStr}`);
  }
};
var BilibiliValidateData = (data2, fields, atLeastOne = false) => {
  const checkField = (field) => Object.prototype.hasOwnProperty.call(data2, field);
  const isValid = atLeastOne ? fields.some(checkField) : fields.every(checkField);
  if (!isValid) {
    const missingFields = atLeastOne ? fields : fields.filter((f) => !checkField(f));
    const missingStr = missingFields.map((f) => `'${logger2.green(f.toString())}'`).join(", ");
    throw new Error(`\u83B7\u53D6\u300C${data2.methodType}\u300D${logger2.red("\u7F3A\u5C11\u53C2\u6570")}: ${missingStr}`);
  }
};
var KusiahouValidateData = (data2, fields, atLeastOne = false) => {
  const checkField = (field) => Object.prototype.hasOwnProperty.call(data2, field);
  const isValid = atLeastOne ? fields.some(checkField) : fields.every(checkField);
  if (!isValid) {
    const missingFields = atLeastOne ? fields : fields.filter((f) => !checkField(f));
    const missingStr = missingFields.map((f) => `'${logger2.green(f.toString())}'`).join(", ");
    throw new Error(`\u83B7\u53D6\u300C${data2.methodType}\u300D${logger2.red("\u7F3A\u5C11\u53C2\u6570")}: ${missingStr}`);
  }
};
var amagiClient = class {
  douyin;
  bilibili;
  kuaishou;
  /**
   *
   * @param cookie - 包含抖音ck、B站ck、快手ck的对象
   */
  constructor(data2) {
    this.douyin = (data2 == null ? void 0 : data2.douyin) ?? "";
    this.bilibili = (data2 == null ? void 0 : data2.bilibili) ?? "";
    this.kuaishou = (data2 == null ? void 0 : data2.kuaishou) ?? "";
  }
  /**
   * 启动本地 HTTP 服务
   * @param port - 监听端口
   * @defaultValue `port` 4567
   * @returns Express 应用实例
   */
  startClient(port = 4567) {
    const app2 = express();
    app2.get("/", (_req, res) => {
      res.redirect(301, "https://amagi.apifox.cn");
    });
    app2.get("/docs", (_req, res) => {
      res.redirect(301, "https://amagi.apifox.cn");
    });
    app2.use(logMiddleware(["/api/douyin", "/api/bilibili", "/api/kuaishou"]));
    app2.use("/api/douyin", registerDouyinRoutes(this.douyin));
    app2.use("/api/bilibili", registerBilibiliRoutes(this.bilibili));
    app2.use("/api/kuaishou", registerKuaishouRoutes(this.kuaishou));
    app2.listen(port, "::", () => {
      logger2.mark(`Amagi server listening on ${logger2.green(`http://localhost:${port}`)} ${logger2.yellow("API docs: https://amagi.apifox.cn ")}`);
    });
    return app2;
  }
  /**
   * 快捷获取抖音数据
   * @param type - 请求数据类型
   * @param options - 请求参数，是一个对象
   * @returns 返回接口的原始数据
   * @example
   * ```ts
   * import Client from '@ikenxuan/amagi'
   *
   * const amagi = new Client({
   *   douyin: '' // 有效的抖音ck
   * })
   * const data = await amagi.getDouyinData('搜索数据', {
   *   query: '114514',
   *   number: 10
   * })
   * ```
   */
  getDouyinData = async (methodType, options) => {
    const fullOptions = {
      methodType,
      ...options
    };
    return await getDouyinData(methodType, this.douyin, fullOptions);
  };
  /**
   * 快捷获取B站数据
   * @param type - 请求数据类型
   * @param options - 请求参数，是一个对象
   * @returns 返回接口的原始数据
   * @example
   * ```ts
   * import Client from '@ikenxuan/amagi'
   *
   * const amagi = new Client({
   *   bilibili: '' // 有效的B站ck
   * })
   * const data = await amagi.getBilibiliData('单个视频作品数据', {
   *   bvid: 'BV1fK4y1q79u'
   * })
   * ```
   */
  getBilibiliData = async (methodType, options) => {
    const fullOptions = {
      methodType,
      ...options
    };
    return await getBilibiliData(methodType, this.bilibili, fullOptions);
  };
  /**
   * 快捷获取快手数据
   * @param type - 请求数据类型
   * @param options - 请求参数，是一个对象
   * @returns 返回接口的原始数据
   * @example
   * ```ts
   * import Client from '@ikenxuan/amagi'
   *
   * const amagi = new Client({
   *   kuaishou: '' // 有效的快手ck
   * })
   * const data = await amagi.getKuaishouData('单个视频作品数据', {
   *   photoId: '3xdpv6sfi8yjsqy'
   * })
   * ```
   */
  getKuaishouData = async (methodType, options) => {
    const fullOptions = {
      methodType,
      ...options
    };
    return await getKuaishouData(methodType, this.kuaishou, fullOptions);
  };
};
var index_default = amagiClient;

// src/Version.ts
init_esm_shims();
var pluginPath = path.join(fileURLToPath(import.meta.url), "../..");
var pkg = JSON.parse(fs4.readFileSync(path.join(pluginPath, "package.json"), "utf-8"));
var Version = {
  pluginName: pkg.name,
  pluginVersion: pkg.version,
  pluginPath,
  karinVersion: process.env.KARIN_VERSION,
  karinPath: karinPathRoot
};

// src/module/utils/Common.ts
init_esm_shims();

// src/module/utils/index.ts
init_esm_shims();

// src/module/utils/Base.ts
init_esm_shims();
var Base = class {
  e;
  headers;
  _path;
  amagi;
  constructor(e) {
    this.e = e;
    this.headers = {
      Accept: "*/*",
      "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36"
    };
    this._path = process.cwd()?.replace(/\\/g, "/");
    this.amagi = new index_default({ douyin: Config.cookies.douyin, bilibili: Config.cookies.bilibili, kuaishou: Config.cookies.kuaishou });
  }
  /** 获取适配器名称 */
  get botadapter() {
    return this.e.bot?.adapter?.name;
  }
  /**
   * 上传视频文件
   * @param file - 包含本地视频文件信息的对象。
   * @param videoUrl 视频直链，无则传空字符串
   * @param options 上传参数
   * @returns
   */
  async upload_file(file2, videoUrl, options) {
    let sendStatus = true;
    let File;
    let newFileSize = file2.totalBytes;
    const selfId = this.e.selfId || options?.activeOption?.uin;
    const contact = this.e.contact || karin.contactGroup(options?.activeOption?.group_id) || karin.contactFriend(selfId);
    if (Config.upload.compress && file2.totalBytes > Config.upload.compresstrigger) {
      const Duration = await mergeFile("\u83B7\u53D6\u6307\u5B9A\u89C6\u9891\u6587\u4EF6\u65F6\u957F", { path: file2.filepath });
      logger$1.warn(logger$1.yellow(`\u89C6\u9891\u5927\u5C0F (${file2.totalBytes} MB) \u89E6\u53D1\u538B\u7F29\u6761\u4EF6\uFF08\u8BBE\u5B9A\u503C\uFF1A${Config.upload.compresstrigger} MB\uFF09\uFF0C\u6B63\u5728\u8FDB\u884C\u538B\u7F29\u81F3${Config.upload.compressvalue} MB...`));
      const message = [
        segment.text(`\u89C6\u9891\u5927\u5C0F (${file2.totalBytes} MB) \u89E6\u53D1\u538B\u7F29\u6761\u4EF6\uFF08\u8BBE\u5B9A\u503C\uFF1A${Config.upload.compresstrigger} MB\uFF09\uFF0C\u6B63\u5728\u8FDB\u884C\u538B\u7F29\u81F3${Config.upload.compressvalue} MB...`),
        options?.message_id ? segment.reply(options.message_id) : segment.text("")
      ];
      const msg1 = await karin.sendMsg(selfId, contact, message);
      const targetBitrate = Common.calculateBitrate(Config.upload.compresstrigger, Duration) * 0.75;
      const startTime = Date.now();
      file2.filepath = await mergeFile("\u538B\u7F29\u89C6\u9891", { path: file2.filepath, targetBitrate, resultPath: `${Common.tempDri.video}tmp_${Date.now()}.mp4` });
      const endTime = Date.now();
      newFileSize = await Common.getVideoFileSize(file2.filepath);
      logger$1.debug(`\u539F\u59CB\u89C6\u9891\u5927\u5C0F\u4E3A: ${file2.totalBytes.toFixed(1)} MB, ${logger$1.green(`\u7ECF FFmpeg \u538B\u7F29\u540E\u6700\u7EC8\u89C6\u9891\u5927\u5C0F\u4E3A: ${newFileSize.toFixed(1)} MB\uFF0C\u539F\u89C6\u9891\u6587\u4EF6\u5DF2\u5220\u9664`)}`);
      const message2 = [
        segment.text(`\u538B\u7F29\u540E\u6700\u7EC8\u89C6\u9891\u5927\u5C0F\u4E3A: ${newFileSize.toFixed(1)} MB\uFF0C\u538B\u7F29\u8017\u65F6\uFF1A${((endTime - startTime) / 1e3).toFixed(1)} \u79D2`),
        segment.reply(msg1.messageId)
      ];
      await karin.sendMsg(selfId, contact, message2);
    }
    if (options) {
      options.useGroupFile = Config.upload.usegroupfile && newFileSize > Config.upload.groupfilevalue;
    }
    if (Config.upload.sendbase64 && !options?.useGroupFile) {
      const videoBuffer = await fs4.promises.readFile(file2.filepath);
      File = `base64://${videoBuffer.toString("base64")}`;
    } else File = "file://" + file2.filepath;
    try {
      if (options?.active) {
        if (options.useGroupFile) {
          const bot = karin.getBot(String(options.activeOption?.uin));
          const contact2 = karin.contactGroup(String(options.activeOption?.group_id));
          const status = await bot.uploadFile(contact2, File, file2.originTitle ? `${file2.originTitle}.mp4` : `${File.split("/").pop()}`);
          status ? sendStatus = true : sendStatus = false;
        } else {
          const status = await karin.sendMsg(selfId, contact, [segment.video(File)]);
          status.messageId ? sendStatus = true : sendStatus = false;
        }
      } else {
        if (options?.useGroupFile) {
          await this.e.reply(`\u89C6\u9891\u5927\u5C0F: ${newFileSize.toFixed(1)}MB \u6B63\u901A\u8FC7\u6587\u4EF6\u4E0A\u4F20\u4E2D...`);
          const status = await this.e.bot.uploadFile(this.e.contact, File, file2.originTitle ? `${file2.originTitle}.mp4` : `${File.split("/").pop()}`);
          status ? sendStatus = true : sendStatus = false;
        } else {
          const status = await this.e.reply(segment.video(File) || videoUrl);
          status.messageId ? sendStatus = true : sendStatus = false;
        }
      }
      return sendStatus;
    } catch (error) {
      if (options && options.active === false) {
        await this.e.reply("\u89C6\u9891\u6587\u4EF6\u4E0A\u4F20\u5931\u8D25" + JSON.stringify(error, null, 2));
      }
      logger$1.error("\u89C6\u9891\u6587\u4EF6\u4E0A\u4F20\u9519\u8BEF," + String(error));
      return false;
    } finally {
      await this.removeFile(file2.filepath);
    }
  }
  /**
   * 下载视频并上传到群
   * @param video_url 视频链接
   * @param title 文件名，是一个对象，时间戳或自定义
   * @param opt 上传参数
   * @returns
   */
  async DownLoadVideo(downloadOpt, uploadOpt) {
    const fileHeaders = await new Networks2({ url: downloadOpt.video_url, headers: downloadOpt.headers ?? this.headers }).getHeaders();
    const fileSizeContent = fileHeaders["content-range"]?.match(/\/(\d+)/) ? parseInt(fileHeaders["content-range"]?.match(/\/(\d+)/)[1], 10) : 0;
    const fileSizeInMB = (fileSizeContent / (1024 * 1024)).toFixed(2);
    const fileSize = parseInt(parseFloat(fileSizeInMB).toFixed(2));
    if (Config.upload.usefilelimit && fileSize > Config.upload.filelimit) {
      const message = segment.text(`\u89C6\u9891\uFF1A\u300C${downloadOpt.title.originTitle ?? "Error: \u6587\u4EF6\u540D\u83B7\u53D6\u5931\u8D25"}\u300D\u5927\u5C0F (${fileSizeInMB} MB) \u8D85\u51FA\u6700\u5927\u9650\u5236\uFF08\u8BBE\u5B9A\u503C\uFF1A${Config.upload.filelimit} MB\uFF09\uFF0C\u5DF2\u53D6\u6D88\u4E0A\u4F20`);
      const selfId = this.e.selfId || uploadOpt?.activeOption?.uin;
      const contact = this.e.contact || karin.contactGroup(uploadOpt?.activeOption?.group_id) || karin.contactFriend(selfId);
      await karin.sendMsg(selfId, contact, message);
      return false;
    }
    let res = await this.DownLoadFile(downloadOpt.video_url, {
      title: Config.app.rmmp4 ? downloadOpt.title.timestampTitle : downloadOpt.title.originTitle.substring(0, 50).replace(/[\\/:\*\?"<>\|\r\n\s]/g, " "),
      headers: downloadOpt.headers ?? this.headers
    });
    res = { ...res, ...downloadOpt.title };
    res.totalBytes = Number((res.totalBytes / (1024 * 1024)).toFixed(2));
    return await this.upload_file(res, downloadOpt.video_url, uploadOpt);
  }
  /**
   * 异步下载文件的函数。
   * @param videoUrl 下载地址。
   * @param opt 配置选项，包括标题、请求头等。
   * @returns 返回一个包含文件路径和总字节数的对象。
   */
  async DownLoadFile(videoUrl, opt) {
    const startTime = Date.now();
    const { filepath, totalBytes } = await new Networks2({
      url: videoUrl,
      // 视频地址
      headers: opt.headers ?? this.headers,
      // 请求头
      filepath: Common.tempDri.video + opt.title,
      // 文件保存路径
      timeout: 3e4
      // 设置 30 秒超时
    }).downloadStream((downloadedBytes, totalBytes2) => {
      const barLength = 45;
      function generateProgressBar(progressPercentage2) {
        const filledLength = Math.floor(progressPercentage2 / 100 * barLength);
        let progress = "";
        progress += "\u2588".repeat(filledLength);
        progress += "\u2591".repeat(Math.max(0, barLength - filledLength - 1));
        return `[${progress}]`;
      }
      const progressPercentage = downloadedBytes / totalBytes2 * 100;
      const red = Math.floor(255 - 255 * progressPercentage / 100);
      const coloredPercentage = logger$1.chalk.rgb(red, 255, 0)(`${progressPercentage.toFixed(1)}%`);
      const elapsedTime = (Date.now() - startTime) / 1e3;
      const speed = downloadedBytes / elapsedTime;
      const formattedSpeed = (speed / 1048576).toFixed(1) + " MB/s";
      const remainingBytes = totalBytes2 - downloadedBytes;
      const remainingTime = remainingBytes / speed;
      const formattedRemainingTime = remainingTime > 60 ? `${Math.floor(remainingTime / 60)}min ${Math.floor(remainingTime % 60)}s` : `${remainingTime.toFixed(0)}s`;
      const downloadedSizeMB = (downloadedBytes / 1048576).toFixed(1);
      const totalSizeMB = (totalBytes2 / 1048576).toFixed(1);
      console.log(
        `\u2B07\uFE0F  ${opt.title} ${generateProgressBar(progressPercentage)} ${coloredPercentage} ${downloadedSizeMB}/${totalSizeMB} MB | ${formattedSpeed} \u5269\u4F59: ${formattedRemainingTime}\r`
      );
    }, 3);
    return { filepath, totalBytes };
  }
  /** 删文件 */
  async removeFile(path3, force = false) {
    return await Common.removeFile(path3, force);
  }
  /** 过万整除 */
  count(count) {
    if (count > 1e4) {
      return (count / 1e4).toFixed(1) + "\u4E07";
    } else {
      return count?.toString() ?? "\u65E0\u6CD5\u83B7\u53D6";
    }
  }
};

// src/module/utils/Config.ts
init_esm_shims();

// src/module/db/index.ts
init_esm_shims();

// src/module/db/bilibili.ts
init_esm_shims();
var sequelize = new Sequelize({
  dialect: "sqlite",
  storage: join(`${karinPathBase}/${Version.pluginName}/data`, "bilibili.db"),
  logging: false,
  pool: {
    max: 5,
    // 连接池最大连接数
    min: 0,
    // 连接池最小连接数
    acquire: 3e4,
    // 获取连接的超时时间(毫秒)
    idle: 1e4
    // 连接在释放前可以空闲的最长时间(毫秒)
  },
  retry: {
    max: 3
    // 连接失败时的最大重试次数
  },
  isolationLevel: "READ COMMITTED"
  // 隔离级别
});
var Bot = sequelize.define("Bot", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    comment: "\u673A\u5668\u4EBAID"
  }
}, {
  timestamps: true
});
var Group = sequelize.define("Group", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    comment: "\u7FA4\u7EC4ID"
  },
  botId: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "\u6240\u5C5E\u673A\u5668\u4EBAID",
    references: {
      model: "Bots",
      key: "id"
    }
  }
}, {
  timestamps: true
});
var BilibiliUser = sequelize.define("BilibiliUser", {
  host_mid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    comment: "B\u7AD9\u7528\u6237UID"
  },
  remark: {
    type: DataTypes.STRING,
    comment: "B\u7AD9\u7528\u6237\u6635\u79F0"
  },
  filterMode: {
    type: DataTypes.ENUM("blacklist", "whitelist"),
    defaultValue: "blacklist",
    comment: "\u8FC7\u6EE4\u6A21\u5F0F\uFF1A\u9ED1\u540D\u5355\u6216\u767D\u540D\u5355"
  }
}, {
  timestamps: true
});
var GroupUserSubscription = sequelize.define("GroupUserSubscription", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: "\u8BA2\u9605ID"
  },
  groupId: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "\u7FA4\u7EC4ID",
    references: {
      model: "Groups",
      key: "id"
    }
  },
  host_mid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: "B\u7AD9\u7528\u6237UID",
    references: {
      model: "BilibiliUsers",
      key: "host_mid"
    }
  }
}, {
  timestamps: true
});
var DynamicCache = sequelize.define("DynamicCache", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: "\u7F13\u5B58ID"
  },
  dynamic_id: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "\u52A8\u6001ID"
  },
  host_mid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: "B\u7AD9\u7528\u6237UID",
    references: {
      model: "BilibiliUsers",
      key: "host_mid"
    }
  },
  groupId: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "\u7FA4\u7EC4ID",
    references: {
      model: "Groups",
      key: "id"
    }
  },
  dynamic_type: {
    type: DataTypes.STRING,
    comment: "\u52A8\u6001\u7C7B\u578B"
  }
}, {
  timestamps: true
});
var FilterWord = sequelize.define("FilterWord", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: "\u8FC7\u6EE4\u8BCDID"
  },
  host_mid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: "B\u7AD9\u7528\u6237UID",
    references: {
      model: "BilibiliUsers",
      key: "host_mid"
    }
  },
  word: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "\u8FC7\u6EE4\u8BCD"
  }
}, {
  timestamps: true
});
var FilterTag = sequelize.define("FilterTag", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: "\u8FC7\u6EE4\u6807\u7B7EID"
  },
  host_mid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: "B\u7AD9\u7528\u6237UID",
    references: {
      model: "BilibiliUsers",
      key: "host_mid"
    }
  },
  tag: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "\u8FC7\u6EE4\u6807\u7B7E"
  }
}, {
  timestamps: true
});
Bot.hasMany(Group, { foreignKey: "botId" });
Group.belongsTo(Bot, { foreignKey: "botId" });
Group.belongsToMany(BilibiliUser, { through: GroupUserSubscription, foreignKey: "groupId" });
BilibiliUser.belongsToMany(Group, { through: GroupUserSubscription, foreignKey: "host_mid" });
BilibiliUser.hasMany(DynamicCache, { foreignKey: "host_mid" });
DynamicCache.belongsTo(BilibiliUser, { foreignKey: "host_mid" });
Group.hasMany(DynamicCache, { foreignKey: "groupId" });
DynamicCache.belongsTo(Group, { foreignKey: "groupId" });
BilibiliUser.hasMany(FilterWord, { foreignKey: "host_mid" });
FilterWord.belongsTo(BilibiliUser, { foreignKey: "host_mid" });
BilibiliUser.hasMany(FilterTag, { foreignKey: "host_mid" });
FilterTag.belongsTo(BilibiliUser, { foreignKey: "host_mid" });
var BilibiliDBBase = class {
  /**
   * 初始化数据库
   */
  async init() {
    try {
      await sequelize.authenticate();
      try {
        const queryInterface = sequelize.getQueryInterface();
        const tables = await queryInterface.showAllTables();
        if (tables.includes("BilibiliUsers")) {
          const tableInfo = await queryInterface.describeTable("BilibiliUsers");
          if (!tableInfo.filterMode) {
            logger$1.warn("\u6B63\u5728\u6DFB\u52A0\u7F3A\u5931\u7684 filterMode \u5217\u5230 BilibiliUsers \u8868...");
            await queryInterface.addColumn("BilibiliUsers", "filterMode", {
              type: DataTypes.STRING,
              defaultValue: "blacklist",
              allowNull: false
            });
            logger$1.mark("\u6210\u529F\u6DFB\u52A0 filterMode \u5217");
          }
        } else {
          await sequelize.sync();
        }
      } catch (error) {
        logger$1.error("\u68C0\u67E5\u6216\u6DFB\u52A0 filterMode \u5217\u65F6\u51FA\u9519:", error);
        await sequelize.sync();
      }
    } catch (error) {
      logger$1.error("\u6570\u636E\u5E93\u521D\u59CB\u5316\u5931\u8D25:", error);
      throw error;
    }
    return this;
  }
  /**
   * 获取或创建机器人记录
   * @param botId 机器人ID
   */
  async getOrCreateBot(botId) {
    const [bot] = await Bot.findOrCreate({
      where: { id: botId }
    });
    return bot;
  }
  /**
   * 获取或创建群组记录
   * @param groupId 群组ID
   * @param botId 机器人ID
   */
  async getOrCreateGroup(groupId, botId) {
    await this.getOrCreateBot(botId);
    const [group] = await Group.findOrCreate({
      where: { id: groupId, botId }
    });
    return group;
  }
  /**
   * 获取或创建B站用户记录
   * @param host_mid B站用户UID
   * @param remark UP主昵称
   */
  async getOrCreateBilibiliUser(host_mid, remark = "") {
    const [user] = await BilibiliUser.findOrCreate({
      where: { host_mid },
      defaults: { remark }
    });
    if (remark && user.get("remark") !== remark) {
      await user.update({
        remark: remark || user.get("remark")
      });
    }
    return user;
  }
  /**
   * 订阅B站用户
   * @param groupId 群组ID
   * @param botId 机器人ID
   * @param host_mid B站用户UID
   * @param remark UP主昵称
   */
  async subscribeBilibiliUser(groupId, botId, host_mid, remark = "") {
    await this.getOrCreateGroup(groupId, botId);
    await this.getOrCreateBilibiliUser(host_mid, remark);
    const [subscription] = await GroupUserSubscription.findOrCreate({
      where: { groupId, host_mid }
    });
    return subscription;
  }
  /**
   * 取消订阅B站用户
   * @param groupId 群组ID
   * @param host_mid B站用户UID
   */
  async unsubscribeBilibiliUser(groupId, host_mid) {
    const result = await GroupUserSubscription.destroy({
      where: { groupId, host_mid }
    });
    await DynamicCache.destroy({
      where: { groupId, host_mid }
    });
    return result > 0;
  }
  /**
   * 添加动态缓存
   * @param dynamic_id 动态ID
   * @param host_mid B站用户UID
   * @param groupId 群组ID
   * @param dynamic_type 动态类型
   */
  async addDynamicCache(dynamic_id, host_mid, groupId, dynamic_type) {
    const [cache] = await DynamicCache.findOrCreate({
      where: { dynamic_id, host_mid, groupId },
      defaults: { dynamic_type }
    });
    return cache;
  }
  /**
   * 检查动态是否已推送
   * @param dynamic_id 动态ID
   * @param host_mid B站用户UID
   * @param groupId 群组ID
   */
  async isDynamicPushed(dynamic_id, host_mid, groupId) {
    const count = await DynamicCache.count({
      where: { dynamic_id, host_mid, groupId }
    });
    return count > 0;
  }
  /**
   * 获取机器人管理的所有群组
   * @param botId 机器人ID
   */
  async getBotGroups(botId) {
    return await Group.findAll({
      where: { botId }
    });
  }
  /**
   * 获取群组订阅的所有B站用户
   * @param groupId 群组ID
   */
  async getGroupSubscriptions(groupId) {
    return await GroupUserSubscription.findAll({
      where: { groupId }
    });
  }
  /**
   * 获取B站用户的所有订阅群组
   * @param host_mid B站用户UID
   */
  async getUserSubscribedGroups(host_mid) {
    return await GroupUserSubscription.findAll({
      where: { host_mid },
      include: [Group]
    });
  }
  /**
   * 获取群组的动态缓存
   * @param groupId 群组ID
   * @param host_mid 可选的B站用户UID过滤
   */
  async getGroupDynamicCache(groupId, host_mid) {
    const where = { groupId };
    if (host_mid) where.host_mid = host_mid;
    return await DynamicCache.findAll({
      where,
      order: [["createdAt", "DESC"]]
    });
  }
  /**
  * 检查群组是否已订阅B站用户
  * @param host_mid B站用户UID
  * @param groupId 群组ID
  */
  async isSubscribed(host_mid, groupId) {
    const count = await GroupUserSubscription.count({
      where: { host_mid, groupId }
    });
    return count > 0;
  }
  /**
   * 批量同步配置文件中的订阅到数据库
   * @param configItems 配置文件中的订阅项
   */
  async syncConfigSubscriptions(configItems) {
    if (!configItems || configItems.length === 0) return;
    for (const item of configItems) {
      const host_mid = item.host_mid;
      const remark = item.remark ?? "";
      await this.getOrCreateBilibiliUser(host_mid, remark);
      for (const groupWithBot of item.group_id) {
        const [groupId, botId] = groupWithBot.split(":");
        if (!groupId || !botId) continue;
        const isSubscribed = await this.isSubscribed(host_mid, groupId);
        if (!isSubscribed) {
          await this.subscribeBilibiliUser(groupId, botId, host_mid, remark);
        }
      }
    }
  }
  /**
  * 更新用户的过滤模式
  * @param host_mid B站用户UID
  * @param filterMode 过滤模式
  */
  async updateFilterMode(host_mid, filterMode) {
    const user = await this.getOrCreateBilibiliUser(host_mid);
    await user.update({ filterMode });
    return user;
  }
  /**
   * 添加过滤词
   * @param host_mid B站用户UID
   * @param word 过滤词
   */
  async addFilterWord(host_mid, word) {
    await this.getOrCreateBilibiliUser(host_mid);
    const [filterWord] = await FilterWord.findOrCreate({
      where: {
        host_mid,
        word
      }
    });
    return filterWord;
  }
  /**
   * 删除过滤词
   * @param host_mid B站用户UID
   * @param word 过滤词
   */
  async removeFilterWord(host_mid, word) {
    const result = await FilterWord.destroy({
      where: {
        host_mid,
        word
      }
    });
    return result > 0;
  }
  /**
   * 添加过滤标签
   * @param host_mid B站用户UID
   * @param tag 过滤标签
   */
  async addFilterTag(host_mid, tag) {
    await this.getOrCreateBilibiliUser(host_mid);
    const [filterTag] = await FilterTag.findOrCreate({
      where: {
        host_mid,
        tag
      }
    });
    return filterTag;
  }
  /**
   * 删除过滤标签
   * @param host_mid B站用户UID
   * @param tag 过滤标签
   */
  async removeFilterTag(host_mid, tag) {
    const result = await FilterTag.destroy({
      where: {
        host_mid,
        tag
      }
    });
    return result > 0;
  }
  /**
   * 获取用户的所有过滤词
   * @param host_mid B站用户UID
   */
  async getFilterWords(host_mid) {
    const filterWords = await FilterWord.findAll({
      where: { host_mid }
    });
    return filterWords.map((word) => word.get("word"));
  }
  /**
   * 获取用户的所有过滤标签
   * @param host_mid B站用户UID
   */
  async getFilterTags(host_mid) {
    const filterTags = await FilterTag.findAll({
      where: { host_mid }
    });
    return filterTags.map((tag) => tag.get("tag"));
  }
  /**
   * 获取用户的过滤配置
   * @param host_mid B站用户UID
   */
  async getFilterConfig(host_mid) {
    const user = await this.getOrCreateBilibiliUser(host_mid);
    const filterWords = await this.getFilterWords(host_mid);
    const filterTags = await this.getFilterTags(host_mid);
    return {
      filterMode: user.get("filterMode"),
      filterWords,
      filterTags
    };
  }
  /**
   * 从动态中提取文本内容和标签
   * @param dynamicData 动态数据
   * @returns 提取的文本内容和标签
   */
  extractTextAndTags(dynamicData) {
    let text = "";
    const tags = [];
    if (!dynamicData || !dynamicData.modules || !dynamicData.modules.module_dynamic) {
      return { text, tags };
    }
    const moduleDynamic = dynamicData.modules.module_dynamic;
    if (moduleDynamic.desc && moduleDynamic.desc.text) {
      text += moduleDynamic.desc.text + " ";
    }
    if (moduleDynamic.major && moduleDynamic.major.archive && moduleDynamic.major.archive.title) {
      text += moduleDynamic.major.archive.title + " ";
    }
    if (moduleDynamic.desc && moduleDynamic.desc.rich_text_nodes) {
      for (const node of moduleDynamic.desc.rich_text_nodes) {
        if (node.type !== "RICH_TEXT_NODE_TYPE_TEXT") {
          tags.push(node.orig_text);
        }
      }
    }
    if (dynamicData.type === "DYNAMIC_TYPE_FORWARD" && "orig" in dynamicData) {
      text += dynamicData.orig.modules.module_dynamic.desc.text + " ";
      for (const node of dynamicData.orig.modules.module_dynamic.desc.rich_text_nodes) {
        tags.push(node.orig_text);
      }
    }
    return { text: text.trim(), tags };
  }
  /**
   * 检查内容是否应该被过滤
   * @param PushItem 推送项
   * @param tags 额外的标签列表
   */
  async shouldFilter(PushItem, extraTags = []) {
    if (PushItem.Dynamic_Data.type === "DYNAMIC_TYPE_LIVE_RCMD") {
      return false;
    }
    const { filterMode, filterWords, filterTags } = await this.getFilterConfig(PushItem.host_mid);
    const { text: mainText, tags: mainTags } = this.extractTextAndTags(PushItem.Dynamic_Data);
    let allTags = [...mainTags, ...extraTags];
    let allText = mainText;
    if (PushItem.Dynamic_Data.type === "DYNAMIC_TYPE_FORWARD" && "orig" in PushItem.Dynamic_Data) {
      const { text: origText, tags: origTags } = this.extractTextAndTags(PushItem.Dynamic_Data.orig);
      allText += " " + origText;
      allTags = [...allTags, ...origTags];
    }
    const hasFilterWord = filterWords.some((word) => allText.includes(word));
    const hasFilterTag = filterTags.some(
      (filterTag) => allTags.some((tag) => tag.includes(filterTag))
    );
    logger$1.warn(`
    UP\u4E3BUID\uFF1A${PushItem.host_mid}\uFF0C
    \u68C0\u67E5\u5185\u5BB9\uFF1A${allText}\uFF0C
    \u68C0\u67E5\u6807\u7B7E\uFF1A${allTags.join(", ")}\uFF0C
    \u547D\u4E2D\u8BCD\uFF1A${filterWords.join(", ")}\uFF0C
    \u547D\u4E2D\u6807\u7B7E\uFF1A${filterTags.join(", ")}\uFF0C
    \u8FC7\u6EE4\u6A21\u5F0F\uFF1A${filterMode}\uFF0C
    \u662F\u5426\u8FC7\u6EE4\uFF1A${hasFilterWord || hasFilterTag ? logger$1.red(`${hasFilterWord || hasFilterTag}`) : logger$1.green(`${hasFilterWord || hasFilterTag}`)}\uFF0C
    \u52A8\u6001\u5730\u5740\uFF1A${logger$1.green(`https://t.bilibili.com/${PushItem.Dynamic_Data.id_str}`)}\uFF0C
    \u52A8\u6001\u7C7B\u578B\uFF1A${PushItem.dynamic_type}
    `);
    if (filterMode === "blacklist") {
      if (hasFilterWord) {
        return true;
      }
      if (hasFilterTag) {
        return true;
      }
      return false;
    } else {
      if (filterWords.length === 0 && filterTags.length === 0) {
        return false;
      }
      if (hasFilterWord || hasFilterTag) {
        return false;
      }
      return true;
    }
  }
};
var bilibiliDB;
var bilibiliModels = {
  /** DynamicCache表 - 存储已推送的动态ID */
  DynamicCache};
(async () => {
  bilibiliDB = await new BilibiliDBBase().init();
})();

// src/module/db/douyin.ts
init_esm_shims();
var sequelize2 = new Sequelize({
  dialect: "sqlite",
  storage: join(`${karinPathBase}/${Version.pluginName}/data`, "douyin.db"),
  logging: false,
  pool: {
    max: 5,
    // 连接池最大连接数
    min: 0,
    // 连接池最小连接数
    acquire: 3e4,
    // 获取连接的超时时间(毫秒)
    idle: 1e4
    // 连接在释放前可以空闲的最长时间(毫秒)
  },
  retry: {
    max: 3
    // 连接失败时的最大重试次数
  },
  isolationLevel: "READ COMMITTED"
  // 隔离级别
});
var Bot2 = sequelize2.define("Bot", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    comment: "\u673A\u5668\u4EBAID"
  }
}, {
  timestamps: true
});
var Group2 = sequelize2.define("Group", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    comment: "\u7FA4\u7EC4ID"
  },
  botId: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "\u6240\u5C5E\u673A\u5668\u4EBAID",
    references: {
      model: "Bots",
      key: "id"
    }
  }
}, {
  timestamps: true
});
var DouyinUser = sequelize2.define("DouyinUser", {
  sec_uid: {
    type: DataTypes.STRING,
    primaryKey: true,
    comment: "\u6296\u97F3\u7528\u6237sec_uid"
  },
  short_id: {
    type: DataTypes.STRING,
    comment: "\u6296\u97F3\u53F7"
  },
  remark: {
    type: DataTypes.STRING,
    comment: "\u6296\u97F3\u7528\u6237\u6635\u79F0"
  },
  living: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    comment: "\u662F\u5426\u6B63\u5728\u76F4\u64AD"
  },
  filterMode: {
    type: DataTypes.ENUM("blacklist", "whitelist"),
    defaultValue: "blacklist",
    comment: "\u8FC7\u6EE4\u6A21\u5F0F\uFF1A\u9ED1\u540D\u5355\u6216\u767D\u540D\u5355"
  }
}, {
  timestamps: true
});
var GroupUserSubscription2 = sequelize2.define("GroupUserSubscription", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: "\u8BA2\u9605ID"
  },
  groupId: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "\u7FA4\u7EC4ID",
    references: {
      model: "Groups",
      key: "id"
    }
  },
  sec_uid: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "\u6296\u97F3\u7528\u6237sec_uid",
    references: {
      model: "DouyinUsers",
      key: "sec_uid"
    }
  }
}, {
  timestamps: true
});
var AwemeCache = sequelize2.define("AwemeCache", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: "\u7F13\u5B58ID"
  },
  aweme_id: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "\u4F5C\u54C1ID"
  },
  sec_uid: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "\u6296\u97F3\u7528\u6237sec_uid",
    references: {
      model: "DouyinUsers",
      key: "sec_uid"
    }
  },
  groupId: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "\u7FA4\u7EC4ID",
    references: {
      model: "Groups",
      key: "id"
    }
  }
}, {
  timestamps: true
});
var FilterWord2 = sequelize2.define("FilterWord", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: "\u8FC7\u6EE4\u8BCDID"
  },
  sec_uid: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "\u6296\u97F3\u7528\u6237sec_uid",
    references: {
      model: "DouyinUsers",
      key: "sec_uid"
    }
  },
  word: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "\u8FC7\u6EE4\u8BCD"
  }
}, {
  timestamps: true
});
var FilterTag2 = sequelize2.define("FilterTag", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: "\u8FC7\u6EE4\u6807\u7B7EID"
  },
  sec_uid: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "\u6296\u97F3\u7528\u6237sec_uid",
    references: {
      model: "DouyinUsers",
      key: "sec_uid"
    }
  },
  tag: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "\u8FC7\u6EE4\u6807\u7B7E"
  }
}, {
  timestamps: true
});
Bot2.hasMany(Group2, { foreignKey: "botId" });
Group2.belongsTo(Bot2, { foreignKey: "botId" });
Group2.belongsToMany(DouyinUser, { through: GroupUserSubscription2, foreignKey: "groupId" });
DouyinUser.belongsToMany(Group2, { through: GroupUserSubscription2, foreignKey: "sec_uid" });
Group2.hasMany(GroupUserSubscription2, { foreignKey: "groupId" });
GroupUserSubscription2.belongsTo(Group2, { foreignKey: "groupId" });
DouyinUser.hasMany(GroupUserSubscription2, { foreignKey: "sec_uid" });
GroupUserSubscription2.belongsTo(DouyinUser, { foreignKey: "sec_uid" });
DouyinUser.hasMany(AwemeCache, { foreignKey: "sec_uid" });
AwemeCache.belongsTo(DouyinUser, { foreignKey: "sec_uid" });
Group2.hasMany(AwemeCache, { foreignKey: "groupId" });
AwemeCache.belongsTo(Group2, { foreignKey: "groupId" });
DouyinUser.hasMany(FilterWord2, { foreignKey: "sec_uid" });
FilterWord2.belongsTo(DouyinUser, { foreignKey: "sec_uid" });
DouyinUser.hasMany(FilterTag2, { foreignKey: "sec_uid" });
FilterTag2.belongsTo(DouyinUser, { foreignKey: "sec_uid" });
var DouyinDBBase = class {
  /**
   * 初始化数据库
   */
  async init() {
    try {
      await sequelize2.authenticate();
      try {
        const queryInterface = sequelize2.getQueryInterface();
        const tables = await queryInterface.showAllTables();
        if (tables.includes("DouyinUsers")) {
          const tableInfo = await queryInterface.describeTable("DouyinUsers");
          if (!tableInfo.filterMode) {
            logger$1.warn("\u6B63\u5728\u6DFB\u52A0\u7F3A\u5931\u7684 filterMode \u5217\u5230 DouyinUsers \u8868...");
            await queryInterface.addColumn("DouyinUsers", "filterMode", {
              type: DataTypes.STRING,
              defaultValue: "blacklist",
              allowNull: false
            });
            logger$1.mark("\u6210\u529F\u6DFB\u52A0 filterMode \u5217");
          }
        } else {
          await sequelize2.sync();
        }
      } catch (error) {
        logger$1.error("\u68C0\u67E5\u6216\u6DFB\u52A0 filterMode \u5217\u65F6\u51FA\u9519:", error);
        await sequelize2.sync();
      }
    } catch (error) {
      logger$1.error("\u6570\u636E\u5E93\u521D\u59CB\u5316\u5931\u8D25:", error);
      throw error;
    }
    return this;
  }
  /**
   * 获取或创建机器人记录
   * @param botId 机器人ID
   */
  async getOrCreateBot(botId) {
    const [bot] = await Bot2.findOrCreate({
      where: { id: botId }
    });
    return bot;
  }
  /**
   * 获取或创建群组记录
   * @param groupId 群组ID
   * @param botId 机器人ID
   */
  async getOrCreateGroup(groupId, botId) {
    await this.getOrCreateBot(botId);
    const [group] = await Group2.findOrCreate({
      where: { id: groupId, botId }
    });
    return group;
  }
  /**
   * 获取或创建抖音用户记录
   * @param sec_uid 抖音用户sec_uid
   * @param short_id 抖音号
   * @param remark 用户昵称
   */
  async getOrCreateDouyinUser(sec_uid, short_id = "", remark = "") {
    const [user] = await DouyinUser.findOrCreate({
      where: { sec_uid },
      defaults: { short_id, remark }
    });
    if (remark && user.get("remark") !== remark || short_id && user.get("short_id") !== short_id) {
      await user.update({
        remark: remark || user.get("remark"),
        short_id: short_id || user.get("short_id")
      });
    }
    return user;
  }
  /**
   * 订阅抖音用户
   * @param groupId 群组ID
   * @param botId 机器人ID
   * @param sec_uid 抖音用户sec_uid
   * @param short_id 抖音号
   * @param remark 用户昵称
   */
  async subscribeDouyinUser(groupId, botId, sec_uid, short_id = "", remark = "") {
    await this.getOrCreateGroup(groupId, botId);
    await this.getOrCreateDouyinUser(sec_uid, short_id, remark);
    const [subscription] = await GroupUserSubscription2.findOrCreate({
      where: { groupId, sec_uid }
    });
    return subscription;
  }
  /**
   * 取消订阅抖音用户
   * @param groupId 群组ID
   * @param sec_uid 抖音用户sec_uid
   */
  async unsubscribeDouyinUser(groupId, sec_uid) {
    const result = await GroupUserSubscription2.destroy({
      where: { groupId, sec_uid }
    });
    await AwemeCache.destroy({
      where: { groupId, sec_uid }
    });
    return result > 0;
  }
  /**
   * 添加作品缓存
   * @param aweme_id 作品ID
   * @param sec_uid 抖音用户sec_uid
   * @param groupId 群组ID
   */
  async addAwemeCache(aweme_id, sec_uid, groupId) {
    const [cache] = await AwemeCache.findOrCreate({
      where: { aweme_id, sec_uid, groupId }
    });
    return cache;
  }
  /**
   * 检查作品是否已推送
   * @param aweme_id 作品ID
   * @param sec_uid 抖音用户sec_uid
   * @param groupId 群组ID
   */
  async isAwemePushed(aweme_id, sec_uid, groupId) {
    const count = await AwemeCache.count({
      where: { aweme_id, sec_uid, groupId }
    });
    return count > 0;
  }
  /**
   * 获取机器人管理的所有群组
   * @param botId 机器人ID
   */
  async getBotGroups(botId) {
    return await Group2.findAll({
      where: { botId }
    });
  }
  /**
   * 获取群组订阅的所有抖音用户
   * @param groupId 群组ID
   */
  async getGroupSubscriptions(groupId) {
    return await GroupUserSubscription2.findAll({
      where: { groupId },
      include: [{
        model: DouyinUser,
        required: true
      }]
    });
  }
  /**
   * 获取抖音用户的所有订阅群组
   * @param sec_uid 抖音用户sec_uid
   */
  async getUserSubscribedGroups(sec_uid) {
    return await GroupUserSubscription2.findAll({
      where: { sec_uid },
      include: [{
        model: Group2,
        required: true
      }]
    });
  }
  /**
   * 检查群组是否已订阅抖音用户
   * @param sec_uid 抖音用户sec_uid
   * @param groupId 群组ID
   */
  async isSubscribed(sec_uid, groupId) {
    const count = await GroupUserSubscription2.count({
      where: { sec_uid, groupId }
    });
    return count > 0;
  }
  /**
   * 获取抖音用户信息
   * @param sec_uid 抖音用户sec_uid
   * @returns 返回用户信息，如果不存在则返回null
   */
  async getDouyinUser(sec_uid) {
    return await DouyinUser.findByPk(sec_uid);
  }
  /**
   * 更新用户直播状态
   * @param sec_uid 抖音用户sec_uid
   * @param living 是否正在直播
   */
  async updateLiveStatus(sec_uid, living) {
    const user = await DouyinUser.findByPk(sec_uid);
    if (!user) return false;
    await user.update({ living });
    return true;
  }
  /**
   * 获取用户直播状态
   * @param sec_uid 抖音用户sec_uid
   */
  async getLiveStatus(sec_uid) {
    const user = await DouyinUser.findByPk(sec_uid);
    if (!user) return { living: false };
    return {
      living: user.get("living")
    };
  }
  /**
   * 批量同步配置文件中的订阅到数据库
   * @param configItems 配置文件中的订阅项
   */
  async syncConfigSubscriptions(configItems) {
    if (!configItems || configItems.length === 0) return;
    for (const item of configItems) {
      const sec_uid = item.sec_uid;
      const short_id = item.short_id ?? "";
      const remark = item.remark ?? "";
      await this.getOrCreateDouyinUser(sec_uid, short_id, remark);
      for (const groupWithBot of item.group_id) {
        const [groupId, botId] = groupWithBot.split(":");
        if (!groupId || !botId) continue;
        const isSubscribed = await this.isSubscribed(sec_uid, groupId);
        if (!isSubscribed) {
          await this.subscribeDouyinUser(groupId, botId, sec_uid, short_id, remark);
        }
      }
    }
  }
  /**
   * 通过ID获取群组信息
   * @param groupId 群组ID
   */
  async getGroupById(groupId) {
    return await Group2.findByPk(groupId);
  }
  /**
   * 更新用户的过滤模式
   * @param sec_uid 抖音用户sec_uid
   * @param filterMode 过滤模式
   */
  async updateFilterMode(sec_uid, filterMode) {
    const user = await this.getOrCreateDouyinUser(sec_uid);
    await user.update({ filterMode });
    return user;
  }
  /**
   * 添加过滤词
   * @param sec_uid 抖音用户sec_uid
   * @param word 过滤词
   */
  async addFilterWord(sec_uid, word) {
    await this.getOrCreateDouyinUser(sec_uid);
    const [filterWord] = await FilterWord2.findOrCreate({
      where: {
        sec_uid,
        word
      }
    });
    return filterWord;
  }
  /**
   * 删除过滤词
   * @param sec_uid 抖音用户sec_uid
   * @param word 过滤词
   */
  async removeFilterWord(sec_uid, word) {
    const result = await FilterWord2.destroy({
      where: {
        sec_uid,
        word
      }
    });
    return result > 0;
  }
  /**
   * 添加过滤标签
   * @param sec_uid 抖音用户sec_uid
   * @param tag 过滤标签
   */
  async addFilterTag(sec_uid, tag) {
    await this.getOrCreateDouyinUser(sec_uid);
    const [filterTag] = await FilterTag2.findOrCreate({
      where: {
        sec_uid,
        tag
      }
    });
    return filterTag;
  }
  /**
   * 删除过滤标签
   * @param sec_uid 抖音用户sec_uid
   * @param tag 过滤标签
   */
  async removeFilterTag(sec_uid, tag) {
    const result = await FilterTag2.destroy({
      where: {
        sec_uid,
        tag
      }
    });
    return result > 0;
  }
  /**
   * 获取用户的所有过滤词
   * @param sec_uid 抖音用户sec_uid
   */
  async getFilterWords(sec_uid) {
    const filterWords = await FilterWord2.findAll({
      where: { sec_uid }
    });
    return filterWords.map((word) => word.get("word"));
  }
  /**
   * 获取用户的所有过滤标签
   * @param sec_uid 抖音用户sec_uid
   */
  async getFilterTags(sec_uid) {
    const filterTags = await FilterTag2.findAll({
      where: { sec_uid }
    });
    return filterTags.map((tag) => tag.get("tag"));
  }
  /**
   * 获取用户的过滤配置
   * @param sec_uid 抖音用户sec_uid
   */
  async getFilterConfig(sec_uid) {
    const user = await this.getOrCreateDouyinUser(sec_uid);
    const filterWords = await this.getFilterWords(sec_uid);
    const filterTags = await this.getFilterTags(sec_uid);
    return {
      filterMode: user.get("filterMode"),
      filterWords,
      filterTags
    };
  }
  /**
   * 检查内容是否应该被过滤
   * @param PushItem 推送项
   * @param tags 标签列表
   */
  async shouldFilter(PushItem, tags = []) {
    const sec_uid = PushItem.sec_uid;
    if (!sec_uid) {
      logger$1.warn(`\u63A8\u9001\u9879\u7F3A\u5C11 sec_uid \u53C2\u6570: ${JSON.stringify(PushItem)}`);
      return false;
    }
    const { filterMode, filterWords, filterTags } = await this.getFilterConfig(sec_uid);
    const desc = PushItem.Detail_Data.desc ?? "";
    const hasFilterWord = filterWords.some((word) => desc.includes(word));
    const hasFilterTag = filterTags.some(
      (filterTag) => tags.some((tag) => tag === filterTag)
    );
    logger$1.warn(`
      \u4F5C\u8005\uFF1A${PushItem.remark}\uFF0C
      \u68C0\u67E5\u5185\u5BB9\uFF1A${desc}\uFF0C
      \u547D\u4E2D\u8BCD\uFF1A${filterWords.join(", ")}\uFF0C
      \u547D\u4E2D\u6807\u7B7E\uFF1A${filterTags.join(", ")}\uFF0C
      \u8FC7\u6EE4\u6A21\u5F0F\uFF1A${filterMode}\uFF0C
      \u662F\u5426\u8FC7\u6EE4\uFF1A${hasFilterWord || hasFilterTag ? logger$1.red(`${hasFilterWord || hasFilterTag}`) : logger$1.green(`${hasFilterWord || hasFilterTag}`)}\uFF0C
      \u4F5C\u54C1\u5730\u5740\uFF1A${logger$1.green(`https://www.douyin.com/video/${PushItem.Detail_Data.aweme_id}`)}\uFF0C
      `);
    if (filterMode === "blacklist") {
      return hasFilterWord || hasFilterTag;
    } else {
      if (filterWords.length === 0 && filterTags.length === 0) {
        return false;
      }
      return !(hasFilterWord || hasFilterTag);
    }
  }
};
var douyinModels = {
  /** AwemeCache表 - 存储已推送的作品ID */
  AwemeCache};
var douyinDB;
(async () => {
  douyinDB = await new DouyinDBBase().init();
})();

// src/module/db/index.ts
var cleanOldDynamicCache = async (platform2, days = 7) => {
  const cutoffDate = /* @__PURE__ */ new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);
  const Cache = platform2 === "douyin" ? douyinModels.AwemeCache : bilibiliModels.DynamicCache;
  const result = await Cache.destroy({
    where: {
      createdAt: {
        [Op.lt]: cutoffDate
      }
    }
  });
  return result;
};

// src/module/utils/Config.ts
var Cfg = class {
  /** 用户配置文件路径 */
  dirCfgPath;
  /** 默认配置文件路径 */
  defCfgPath;
  constructor() {
    this.dirCfgPath = `${karinPathBase$1}/${Version.pluginName}/config`;
    this.defCfgPath = `${Version.pluginPath}/config/default_config/`;
  }
  /** 初始化配置 */
  initCfg() {
    copyConfigSync(this.defCfgPath, this.dirCfgPath);
    const files = filesByExt(this.dirCfgPath, ".yaml", "name");
    for (const file2 of files) {
      const config = YAML.parseDocument(fs4.readFileSync(`${this.dirCfgPath}/${file2}`, "utf8"));
      const defConfig = YAML.parseDocument(fs4.readFileSync(`${this.defCfgPath}/${file2}`, "utf8"));
      const { differences, result } = this.mergeObjectsWithPriority(config, defConfig);
      if (differences) {
        fs4.writeFileSync(`${this.dirCfgPath}/${file2}`, result.toString({ lineWidth: -1 }));
      }
    }
    setTimeout(() => {
      const list = filesByExt(this.dirCfgPath, ".yaml", "abs");
      list.forEach((file2) => watch(file2, (old, now2) => {
      }));
    }, 2e3);
    this.convertType();
    return this;
  }
  /**
   * 获取默认配置和用户配置
   * @param name 配置文件名
   * @returns 返回合并后的配置
   */
  getDefOrConfig(name) {
    const def = this.getYaml("default_config", name);
    const config = this.getYaml("config", name);
    return { ...def, ...config };
  }
  /** 获取所有配置文件 */
  async All() {
    const allConfig = {};
    const files = fs4.readdirSync(this.defCfgPath);
    for (const file2 of files) {
      const fileName = path.basename(file2, ".yaml");
      allConfig[fileName] = this.getDefOrConfig(fileName) || {};
    }
    if (allConfig.pushlist) {
      try {
        if (allConfig.pushlist.douyin) {
          for (const item of allConfig.pushlist.douyin) {
            const filterWords = await douyinDB.getFilterWords(item.sec_uid);
            const filterTags = await douyinDB.getFilterTags(item.sec_uid);
            const userInfo = await douyinDB.getDouyinUser(item.sec_uid);
            if (userInfo) {
              item.filterMode = userInfo.get("filterMode") || "blacklist";
            }
            item.Keywords = filterWords;
            item.Tags = filterTags;
          }
        }
        if (allConfig.pushlist.bilibili) {
          for (const item of allConfig.pushlist.bilibili) {
            const filterWords = await bilibiliDB.getFilterWords(item.host_mid);
            const filterTags = await bilibiliDB.getFilterTags(item.host_mid);
            const userInfo = await bilibiliDB.getOrCreateBilibiliUser(item.host_mid);
            if (userInfo) {
              item.filterMode = userInfo.get("filterMode") || "blacklist";
            }
            item.Keywords = filterWords;
            item.Tags = filterTags;
          }
        }
      } catch (error) {
        logger$1.error(`\u4ECE\u6570\u636E\u5E93\u83B7\u53D6\u8FC7\u6EE4\u914D\u7F6E\u65F6\u51FA\u9519: ${error}`);
      }
    }
    return allConfig;
  }
  /**
   * 获取 YAML 文件内容
   * @param type 配置文件类型
   * @param name 配置文件名
   * @returns 返回 YAML 文件内容
   */
  getYaml(type, name) {
    const file2 = type === "config" ? `${this.dirCfgPath}/${name}.yaml` : `${this.defCfgPath}/${name}.yaml`;
    return requireFileSync$1(file2, { force: true });
  }
  /** 由于上游类型定义错误，导致下游需要手动对已设置的内容进行类型转换。。。 */
  convertType() {
    const pushList = this.getYaml("config", "pushlist");
    pushList.bilibili.map((item) => {
      if (typeof item.host_mid === "string") {
        item.host_mid = parseInt(item.host_mid);
      }
      return item;
    });
    this.Modify("pushlist", "bilibili", pushList.bilibili);
  }
  /**
   * 修改配置文件
   * @param name 文件名
   * @param key 键
   * @param value 值
   * @param type 配置文件类型，默认为用户配置文件 `config`
   */
  Modify(name, key, value, type = "config") {
    const path3 = type === "config" ? `${this.dirCfgPath}/${name}.yaml` : `${this.defCfgPath}/${name}.yaml`;
    const yamlData = YAML.parseDocument(fs4.readFileSync(path3, "utf8"));
    const keys = key.split(".");
    this.setNestedValue(yamlData.contents, keys, value);
    fs4.writeFileSync(path3, yamlData.toString({ lineWidth: -1 }), "utf8");
  }
  /**
   * 修改整个配置文件，保留注释
   * @param name 文件名
   * @param config 完整的配置对象
   * @param type 配置文件类型，默认为用户配置文件 `config`
   */
  async ModifyPro(name, config, type = "config") {
    const filePath = type === "config" ? `${this.dirCfgPath}/${name}.yaml` : `${this.defCfgPath}/${name}.yaml`;
    try {
      const existingContent = fs4.readFileSync(filePath, "utf8");
      const doc = YAML.parseDocument(existingContent);
      let filterCfg = config;
      if (name === "pushlist" && ("douyin" in config || "bilibili" in config)) {
        const cleanedConfig = { ...config };
        if ("douyin" in cleanedConfig) {
          cleanedConfig.douyin = cleanedConfig.douyin.map((item) => {
            const { Keywords, Tags, filterMode, ...rest } = item;
            return rest;
          });
        }
        if ("bilibili" in cleanedConfig) {
          cleanedConfig.bilibili = cleanedConfig.bilibili.map((item) => {
            const { Keywords, Tags, filterMode, ...rest } = item;
            return rest;
          });
        }
        filterCfg = cleanedConfig;
      }
      const newConfigNode = YAML.parseDocument(YAML.stringify(filterCfg)).contents;
      this.deepMergeYaml(doc.contents, newConfigNode);
      fs4.writeFileSync(filePath, doc.toString({ lineWidth: -1 }), "utf8");
      if ("douyin" in config) {
        await this.syncFilterConfigToDb(config.douyin, douyinDB, "sec_uid");
        logger$1.debug("\u5DF2\u540C\u6B65\u6296\u97F3\u8FC7\u6EE4\u914D\u7F6E\u5230\u6570\u636E\u5E93");
      }
      if ("bilibili" in config) {
        await this.syncFilterConfigToDb(config.bilibili, bilibiliDB, "host_mid");
        logger$1.debug("\u5DF2\u540C\u6B65B\u7AD9\u8FC7\u6EE4\u914D\u7F6E\u5230\u6570\u636E\u5E93");
      }
      return true;
    } catch (error) {
      logger$1.error(`\u4FEE\u6539\u914D\u7F6E\u6587\u4EF6\u65F6\u53D1\u751F\u9519\u8BEF\uFF1A${error}`);
      return false;
    }
  }
  /**
  * 同步过滤配置到数据库
  * @param items 推送项列表
  * @param db 数据库实例
  * @param idField ID字段名称
  */
  async syncFilterConfigToDb(items, db, idField) {
    for (const item of items) {
      const id = item[idField];
      if (!id) continue;
      if (item.filterMode) {
        await db.updateFilterMode(id, item.filterMode);
      }
      if (item.Keywords && Array.isArray(item.Keywords)) {
        const existingWords = await db.getFilterWords(id);
        for (const word of existingWords) {
          if (!item.Keywords.includes(word)) {
            await db.removeFilterWord(id, word);
          }
        }
        for (const word of item.Keywords) {
          if (!existingWords.includes(word)) {
            await db.addFilterWord(id, word);
          }
        }
      }
      if (item.Tags && Array.isArray(item.Tags)) {
        const existingTags = await db.getFilterTags(id);
        for (const tag of existingTags) {
          if (!item.Tags.includes(tag)) {
            await db.removeFilterTag(id, tag);
          }
        }
        for (const tag of item.Tags) {
          if (!existingTags.includes(tag)) {
            await db.addFilterTag(id, tag);
          }
        }
      }
    }
  }
  /**
   * 深度合并YAML节点（保留目标注释）
   * @param target 目标节点（保留注释的原始节点）
   * @param source 源节点（提供新值的节点）
   */
  deepMergeYaml(target, source) {
    if (YAML.isMap(target) && YAML.isMap(source)) {
      for (const pair of source.items) {
        const key = pair.key;
        const sourceVal = pair.value;
        const targetVal = target.get(key);
        if (targetVal === void 0) {
          target.set(key, sourceVal);
        } else if (YAML.isMap(targetVal) && YAML.isMap(sourceVal)) {
          this.deepMergeYaml(targetVal, sourceVal);
        } else if (YAML.isSeq(targetVal) && YAML.isSeq(sourceVal)) {
          targetVal.items = sourceVal.items;
          targetVal.flow = sourceVal.flow;
        } else {
          target.set(key, sourceVal);
        }
      }
    }
  }
  /**
   * 在YAML映射中设置嵌套值
   *
   * 该函数用于在给定的YAML映射（map）中，根据指定的键路径（keys）设置值（value）
   * 如果键路径不存在，该函数会创建必要的嵌套映射结构并设置值
   *
   * @param map YAML映射，作为设置值的目标
   * @param keys 键路径，表示要设置的值的位置
   * @param value 要设置的值
   */
  setNestedValue(map, keys, value) {
    if (keys.length === 1) {
      map.set(keys[0], value);
      return;
    }
    const subKey = keys[0];
    let subMap = map.get(subKey);
    if (!subMap || !YAML.isMap(subMap)) {
      subMap = new YAML.YAMLMap();
      map.set(subKey, subMap);
    }
    this.setNestedValue(subMap, keys.slice(1), value);
  }
  mergeObjectsWithPriority(userDoc, defaultDoc) {
    let differences = false;
    const mergeYamlNodes = (target, source) => {
      if (YAML.isMap(target) && YAML.isMap(source)) {
        for (const pair of source.items) {
          const key = pair.key;
          const value = pair.value;
          const existing = target.get(key);
          if (existing === void 0) {
            differences = true;
            target.set(key, value);
          } else if (YAML.isMap(value) && YAML.isMap(existing)) {
            mergeYamlNodes(existing, value);
          } else if (existing !== value) {
            differences = true;
            target.set(key, value);
          }
        }
      }
    };
    mergeYamlNodes(defaultDoc.contents, userDoc.contents);
    return { differences, result: defaultDoc };
  }
};
var Config = new Proxy(new Cfg().initCfg(), {
  get(target, prop) {
    if (prop in target) return target[prop];
    return target.getDefOrConfig(prop);
  }
});

// src/module/utils/FFmpeg.ts
init_esm_shims();
var mergeFile = async (type, options) => {
  return await new FFmpeg(type).FFmpeg(options);
};
var FFmpeg = class {
  type;
  constructor(type) {
    this.type = type;
  }
  async FFmpeg(opt) {
    switch (this.type) {
      case "\u4E8C\u5408\u4E00\uFF08\u89C6\u9891 + \u97F3\u9891\uFF09": {
        const result = await ffmpeg(`-y -i ${opt.path} -i ${opt.path2} -c copy ${opt.resultPath}`);
        result.status ? logger$1.mark("\u89C6\u9891\u5408\u6210\u6210\u529F\uFF01") : logger$1.error(result);
        await opt.callback(result.status, opt.resultPath);
        return result;
      }
      case "\u89C6\u9891*3 + \u97F3\u9891": {
        const result = await ffmpeg(`-y -stream_loop 2 -i ${opt.path} -i ${opt.path2} -filter_complex "[0:v]setpts=N/FRAME_RATE/TB[v];[0:a][1:a]amix=inputs=2:duration=shortest:dropout_transition=3[aout]" -map "[v]" -map "[aout]" -c:v libx264 -c:a aac -b:a 192k -shortest ${opt.resultPath}`);
        result ? logger$1.mark("\u89C6\u9891\u5408\u6210\u6210\u529F\uFF01") : logger$1.error(result);
        await opt.callback(result.status, opt.resultPath);
        return result;
      }
      case "\u83B7\u53D6\u6307\u5B9A\u89C6\u9891\u6587\u4EF6\u65F6\u957F": {
        const { stdout: stdout2 } = await ffprobe(`-v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 ${opt.path}`);
        return parseFloat(parseFloat(stdout2.trim()).toFixed(2));
      }
      case "\u538B\u7F29\u89C6\u9891": {
        const result = await ffmpeg(`-y -i "${opt.path}" -b:v ${opt.targetBitrate}k -maxrate ${opt.maxRate ?? opt.targetBitrate * 1.5}k -bufsize ${opt.bufSize ?? opt.targetBitrate * 2}k -crf ${opt.crf ?? 35} -preset medium -c:v libx264 -vf "scale='if(gte(iw/ih,16/9),1280,-1)':'if(gte(iw/ih,16/9),-1,720)',scale=ceil(iw/2)*2:ceil(ih/2)*2" "${opt.resultPath}"`);
        if (result.status) {
          logger$1.mark(`\u89C6\u9891\u5DF2\u538B\u7F29\u5E76\u4FDD\u5B58\u5230: ${opt.resultPath}`);
          Common.removeFile(opt.path);
        } else {
          logger$1.error(opt.path + " \u538B\u7F29\u5931\u8D25\uFF01");
          logger$1.error(result);
        }
        return opt.resultPath;
      }
    }
  }
};

// src/module/utils/Networks.ts
init_esm_shims();

// node_modules/.pnpm/axios@1.9.0/node_modules/axios/index.js
init_esm_shims();

// node_modules/.pnpm/axios@1.9.0/node_modules/axios/lib/axios.js
init_esm_shims();

// node_modules/.pnpm/axios@1.9.0/node_modules/axios/lib/utils.js
init_esm_shims();

// node_modules/.pnpm/axios@1.9.0/node_modules/axios/lib/helpers/bind.js
init_esm_shims();
function bind2(fn, thisArg) {
  return function wrap() {
    return fn.apply(thisArg, arguments);
  };
}

// node_modules/.pnpm/axios@1.9.0/node_modules/axios/lib/utils.js
var { toString: toString3 } = Object.prototype;
var { getPrototypeOf: getPrototypeOf2 } = Object;
var { iterator, toStringTag } = Symbol;
var kindOf2 = /* @__PURE__ */ ((cache) => (thing) => {
  const str = toString3.call(thing);
  return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null));
var kindOfTest2 = (type) => {
  type = type.toLowerCase();
  return (thing) => kindOf2(thing) === type;
};
var typeOfTest2 = (type) => (thing) => typeof thing === type;
var { isArray: isArray2 } = Array;
var isUndefined2 = typeOfTest2("undefined");
function isBuffer2(val) {
  return val !== null && !isUndefined2(val) && val.constructor !== null && !isUndefined2(val.constructor) && isFunction2(val.constructor.isBuffer) && val.constructor.isBuffer(val);
}
var isArrayBuffer2 = kindOfTest2("ArrayBuffer");
function isArrayBufferView2(val) {
  let result;
  if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
    result = ArrayBuffer.isView(val);
  } else {
    result = val && val.buffer && isArrayBuffer2(val.buffer);
  }
  return result;
}
var isString2 = typeOfTest2("string");
var isFunction2 = typeOfTest2("function");
var isNumber2 = typeOfTest2("number");
var isObject2 = (thing) => thing !== null && typeof thing === "object";
var isBoolean2 = (thing) => thing === true || thing === false;
var isPlainObject2 = (val) => {
  if (kindOf2(val) !== "object") {
    return false;
  }
  const prototype4 = getPrototypeOf2(val);
  return (prototype4 === null || prototype4 === Object.prototype || Object.getPrototypeOf(prototype4) === null) && !(toStringTag in val) && !(iterator in val);
};
var isDate2 = kindOfTest2("Date");
var isFile2 = kindOfTest2("File");
var isBlob2 = kindOfTest2("Blob");
var isFileList2 = kindOfTest2("FileList");
var isStream2 = (val) => isObject2(val) && isFunction2(val.pipe);
var isFormData2 = (thing) => {
  let kind;
  return thing && (typeof FormData === "function" && thing instanceof FormData || isFunction2(thing.append) && ((kind = kindOf2(thing)) === "formdata" || // detect form-data instance
  kind === "object" && isFunction2(thing.toString) && thing.toString() === "[object FormData]"));
};
var isURLSearchParams2 = kindOfTest2("URLSearchParams");
var [isReadableStream2, isRequest2, isResponse2, isHeaders2] = ["ReadableStream", "Request", "Response", "Headers"].map(kindOfTest2);
var trim2 = (str) => str.trim ? str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function forEach2(obj, fn, { allOwnKeys = false } = {}) {
  if (obj === null || typeof obj === "undefined") {
    return;
  }
  let i;
  let l;
  if (typeof obj !== "object") {
    obj = [obj];
  }
  if (isArray2(obj)) {
    for (i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
    const len = keys.length;
    let key;
    for (i = 0; i < len; i++) {
      key = keys[i];
      fn.call(null, obj[key], key, obj);
    }
  }
}
function findKey2(obj, key) {
  key = key.toLowerCase();
  const keys = Object.keys(obj);
  let i = keys.length;
  let _key;
  while (i-- > 0) {
    _key = keys[i];
    if (key === _key.toLowerCase()) {
      return _key;
    }
  }
  return null;
}
var _global2 = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  return typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : global;
})();
var isContextDefined2 = (context) => !isUndefined2(context) && context !== _global2;
function merge2() {
  const { caseless } = isContextDefined2(this) && this || {};
  const result = {};
  const assignValue = (val, key) => {
    const targetKey = caseless && findKey2(result, key) || key;
    if (isPlainObject2(result[targetKey]) && isPlainObject2(val)) {
      result[targetKey] = merge2(result[targetKey], val);
    } else if (isPlainObject2(val)) {
      result[targetKey] = merge2({}, val);
    } else if (isArray2(val)) {
      result[targetKey] = val.slice();
    } else {
      result[targetKey] = val;
    }
  };
  for (let i = 0, l = arguments.length; i < l; i++) {
    arguments[i] && forEach2(arguments[i], assignValue);
  }
  return result;
}
var extend2 = (a, b, thisArg, { allOwnKeys } = {}) => {
  forEach2(b, (val, key) => {
    if (thisArg && isFunction2(val)) {
      a[key] = bind2(val, thisArg);
    } else {
      a[key] = val;
    }
  }, { allOwnKeys });
  return a;
};
var stripBOM2 = (content) => {
  if (content.charCodeAt(0) === 65279) {
    content = content.slice(1);
  }
  return content;
};
var inherits2 = (constructor, superConstructor, props, descriptors3) => {
  constructor.prototype = Object.create(superConstructor.prototype, descriptors3);
  constructor.prototype.constructor = constructor;
  Object.defineProperty(constructor, "super", {
    value: superConstructor.prototype
  });
  props && Object.assign(constructor.prototype, props);
};
var toFlatObject2 = (sourceObj, destObj, filter3, propFilter) => {
  let props;
  let i;
  let prop;
  const merged = {};
  destObj = destObj || {};
  if (sourceObj == null) return destObj;
  do {
    props = Object.getOwnPropertyNames(sourceObj);
    i = props.length;
    while (i-- > 0) {
      prop = props[i];
      if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
        destObj[prop] = sourceObj[prop];
        merged[prop] = true;
      }
    }
    sourceObj = filter3 !== false && getPrototypeOf2(sourceObj);
  } while (sourceObj && (!filter3 || filter3(sourceObj, destObj)) && sourceObj !== Object.prototype);
  return destObj;
};
var endsWith2 = (str, searchString, position) => {
  str = String(str);
  if (position === void 0 || position > str.length) {
    position = str.length;
  }
  position -= searchString.length;
  const lastIndex = str.indexOf(searchString, position);
  return lastIndex !== -1 && lastIndex === position;
};
var toArray2 = (thing) => {
  if (!thing) return null;
  if (isArray2(thing)) return thing;
  let i = thing.length;
  if (!isNumber2(i)) return null;
  const arr = new Array(i);
  while (i-- > 0) {
    arr[i] = thing[i];
  }
  return arr;
};
var isTypedArray2 = /* @__PURE__ */ ((TypedArray) => {
  return (thing) => {
    return TypedArray && thing instanceof TypedArray;
  };
})(typeof Uint8Array !== "undefined" && getPrototypeOf2(Uint8Array));
var forEachEntry2 = (obj, fn) => {
  const generator = obj && obj[iterator];
  const _iterator = generator.call(obj);
  let result;
  while ((result = _iterator.next()) && !result.done) {
    const pair = result.value;
    fn.call(obj, pair[0], pair[1]);
  }
};
var matchAll2 = (regExp, str) => {
  let matches;
  const arr = [];
  while ((matches = regExp.exec(str)) !== null) {
    arr.push(matches);
  }
  return arr;
};
var isHTMLForm2 = kindOfTest2("HTMLFormElement");
var toCamelCase2 = (str) => {
  return str.toLowerCase().replace(
    /[-_\s]([a-z\d])(\w*)/g,
    function replacer(m, p1, p2) {
      return p1.toUpperCase() + p2;
    }
  );
};
var hasOwnProperty2 = (({ hasOwnProperty: hasOwnProperty3 }) => (obj, prop) => hasOwnProperty3.call(obj, prop))(Object.prototype);
var isRegExp2 = kindOfTest2("RegExp");
var reduceDescriptors2 = (obj, reducer) => {
  const descriptors3 = Object.getOwnPropertyDescriptors(obj);
  const reducedDescriptors = {};
  forEach2(descriptors3, (descriptor, name) => {
    let ret;
    if ((ret = reducer(descriptor, name, obj)) !== false) {
      reducedDescriptors[name] = ret || descriptor;
    }
  });
  Object.defineProperties(obj, reducedDescriptors);
};
var freezeMethods2 = (obj) => {
  reduceDescriptors2(obj, (descriptor, name) => {
    if (isFunction2(obj) && ["arguments", "caller", "callee"].indexOf(name) !== -1) {
      return false;
    }
    const value = obj[name];
    if (!isFunction2(value)) return;
    descriptor.enumerable = false;
    if ("writable" in descriptor) {
      descriptor.writable = false;
      return;
    }
    if (!descriptor.set) {
      descriptor.set = () => {
        throw Error("Can not rewrite read-only method '" + name + "'");
      };
    }
  });
};
var toObjectSet2 = (arrayOrString, delimiter) => {
  const obj = {};
  const define = (arr) => {
    arr.forEach((value) => {
      obj[value] = true;
    });
  };
  isArray2(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));
  return obj;
};
var noop2 = () => {
};
var toFiniteNumber2 = (value, defaultValue) => {
  return value != null && Number.isFinite(value = +value) ? value : defaultValue;
};
function isSpecCompliantForm2(thing) {
  return !!(thing && isFunction2(thing.append) && thing[toStringTag] === "FormData" && thing[iterator]);
}
var toJSONObject2 = (obj) => {
  const stack = new Array(10);
  const visit = (source, i) => {
    if (isObject2(source)) {
      if (stack.indexOf(source) >= 0) {
        return;
      }
      if (!("toJSON" in source)) {
        stack[i] = source;
        const target = isArray2(source) ? [] : {};
        forEach2(source, (value, key) => {
          const reducedValue = visit(value, i + 1);
          !isUndefined2(reducedValue) && (target[key] = reducedValue);
        });
        stack[i] = void 0;
        return target;
      }
    }
    return source;
  };
  return visit(obj, 0);
};
var isAsyncFn2 = kindOfTest2("AsyncFunction");
var isThenable2 = (thing) => thing && (isObject2(thing) || isFunction2(thing)) && isFunction2(thing.then) && isFunction2(thing.catch);
var _setImmediate2 = ((setImmediateSupported, postMessageSupported) => {
  if (setImmediateSupported) {
    return setImmediate;
  }
  return postMessageSupported ? ((token, callbacks) => {
    _global2.addEventListener("message", ({ source, data: data2 }) => {
      if (source === _global2 && data2 === token) {
        callbacks.length && callbacks.shift()();
      }
    }, false);
    return (cb) => {
      callbacks.push(cb);
      _global2.postMessage(token, "*");
    };
  })(`axios@${Math.random()}`, []) : (cb) => setTimeout(cb);
})(
  typeof setImmediate === "function",
  isFunction2(_global2.postMessage)
);
var asap2 = typeof queueMicrotask !== "undefined" ? queueMicrotask.bind(_global2) : typeof process !== "undefined" && process.nextTick || _setImmediate2;
var isIterable = (thing) => thing != null && isFunction2(thing[iterator]);
var utils_default = {
  isArray: isArray2,
  isArrayBuffer: isArrayBuffer2,
  isBuffer: isBuffer2,
  isFormData: isFormData2,
  isArrayBufferView: isArrayBufferView2,
  isString: isString2,
  isNumber: isNumber2,
  isBoolean: isBoolean2,
  isObject: isObject2,
  isPlainObject: isPlainObject2,
  isReadableStream: isReadableStream2,
  isRequest: isRequest2,
  isResponse: isResponse2,
  isHeaders: isHeaders2,
  isUndefined: isUndefined2,
  isDate: isDate2,
  isFile: isFile2,
  isBlob: isBlob2,
  isRegExp: isRegExp2,
  isFunction: isFunction2,
  isStream: isStream2,
  isURLSearchParams: isURLSearchParams2,
  isTypedArray: isTypedArray2,
  isFileList: isFileList2,
  forEach: forEach2,
  merge: merge2,
  extend: extend2,
  trim: trim2,
  stripBOM: stripBOM2,
  inherits: inherits2,
  toFlatObject: toFlatObject2,
  kindOf: kindOf2,
  kindOfTest: kindOfTest2,
  endsWith: endsWith2,
  toArray: toArray2,
  forEachEntry: forEachEntry2,
  matchAll: matchAll2,
  isHTMLForm: isHTMLForm2,
  hasOwnProperty: hasOwnProperty2,
  hasOwnProp: hasOwnProperty2,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: reduceDescriptors2,
  freezeMethods: freezeMethods2,
  toObjectSet: toObjectSet2,
  toCamelCase: toCamelCase2,
  noop: noop2,
  toFiniteNumber: toFiniteNumber2,
  findKey: findKey2,
  global: _global2,
  isContextDefined: isContextDefined2,
  isSpecCompliantForm: isSpecCompliantForm2,
  toJSONObject: toJSONObject2,
  isAsyncFn: isAsyncFn2,
  isThenable: isThenable2,
  setImmediate: _setImmediate2,
  asap: asap2,
  isIterable
};

// node_modules/.pnpm/axios@1.9.0/node_modules/axios/lib/core/Axios.js
init_esm_shims();

// node_modules/.pnpm/axios@1.9.0/node_modules/axios/lib/helpers/buildURL.js
init_esm_shims();

// node_modules/.pnpm/axios@1.9.0/node_modules/axios/lib/helpers/AxiosURLSearchParams.js
init_esm_shims();

// node_modules/.pnpm/axios@1.9.0/node_modules/axios/lib/helpers/toFormData.js
init_esm_shims();

// node_modules/.pnpm/axios@1.9.0/node_modules/axios/lib/core/AxiosError.js
init_esm_shims();
function AxiosError2(message, code, config, request, response) {
  Error.call(this);
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor);
  } else {
    this.stack = new Error().stack;
  }
  this.message = message;
  this.name = "AxiosError";
  code && (this.code = code);
  config && (this.config = config);
  request && (this.request = request);
  if (response) {
    this.response = response;
    this.status = response.status ? response.status : null;
  }
}
utils_default.inherits(AxiosError2, Error, {
  toJSON: function toJSON2() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: utils_default.toJSONObject(this.config),
      code: this.code,
      status: this.status
    };
  }
});
var prototype2 = AxiosError2.prototype;
var descriptors2 = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL"
  // eslint-disable-next-line func-names
].forEach((code) => {
  descriptors2[code] = { value: code };
});
Object.defineProperties(AxiosError2, descriptors2);
Object.defineProperty(prototype2, "isAxiosError", { value: true });
AxiosError2.from = (error, code, config, request, response, customProps) => {
  const axiosError = Object.create(prototype2);
  utils_default.toFlatObject(error, axiosError, function filter3(obj) {
    return obj !== Error.prototype;
  }, (prop) => {
    return prop !== "isAxiosError";
  });
  AxiosError2.call(axiosError, error.message, code, config, request, response);
  axiosError.cause = error;
  axiosError.name = error.name;
  customProps && Object.assign(axiosError, customProps);
  return axiosError;
};
var AxiosError_default = AxiosError2;

// node_modules/.pnpm/axios@1.9.0/node_modules/axios/lib/platform/node/classes/FormData.js
init_esm_shims();
var import_form_data = __toESM(require_form_data(), 1);
var FormData_default = import_form_data.default;

// node_modules/.pnpm/axios@1.9.0/node_modules/axios/lib/helpers/toFormData.js
function isVisitable2(thing) {
  return utils_default.isPlainObject(thing) || utils_default.isArray(thing);
}
function removeBrackets2(key) {
  return utils_default.endsWith(key, "[]") ? key.slice(0, -2) : key;
}
function renderKey2(path3, key, dots) {
  if (!path3) return key;
  return path3.concat(key).map(function each(token, i) {
    token = removeBrackets2(token);
    return !dots && i ? "[" + token + "]" : token;
  }).join(dots ? "." : "");
}
function isFlatArray2(arr) {
  return utils_default.isArray(arr) && !arr.some(isVisitable2);
}
var predicates2 = utils_default.toFlatObject(utils_default, {}, null, function filter2(prop) {
  return /^is[A-Z]/.test(prop);
});
function toFormData2(obj, formData, options) {
  if (!utils_default.isObject(obj)) {
    throw new TypeError("target must be an object");
  }
  formData = formData || new (FormData_default || FormData)();
  options = utils_default.toFlatObject(options, {
    metaTokens: true,
    dots: false,
    indexes: false
  }, false, function defined(option, source) {
    return !utils_default.isUndefined(source[option]);
  });
  const metaTokens = options.metaTokens;
  const visitor = options.visitor || defaultVisitor;
  const dots = options.dots;
  const indexes = options.indexes;
  const _Blob = options.Blob || typeof Blob !== "undefined" && Blob;
  const useBlob = _Blob && utils_default.isSpecCompliantForm(formData);
  if (!utils_default.isFunction(visitor)) {
    throw new TypeError("visitor must be a function");
  }
  function convertValue(value) {
    if (value === null) return "";
    if (utils_default.isDate(value)) {
      return value.toISOString();
    }
    if (!useBlob && utils_default.isBlob(value)) {
      throw new AxiosError_default("Blob is not supported. Use a Buffer instead.");
    }
    if (utils_default.isArrayBuffer(value) || utils_default.isTypedArray(value)) {
      return useBlob && typeof Blob === "function" ? new Blob([value]) : Buffer.from(value);
    }
    return value;
  }
  function defaultVisitor(value, key, path3) {
    let arr = value;
    if (value && !path3 && typeof value === "object") {
      if (utils_default.endsWith(key, "{}")) {
        key = metaTokens ? key : key.slice(0, -2);
        value = JSON.stringify(value);
      } else if (utils_default.isArray(value) && isFlatArray2(value) || (utils_default.isFileList(value) || utils_default.endsWith(key, "[]")) && (arr = utils_default.toArray(value))) {
        key = removeBrackets2(key);
        arr.forEach(function each(el, index) {
          !(utils_default.isUndefined(el) || el === null) && formData.append(
            // eslint-disable-next-line no-nested-ternary
            indexes === true ? renderKey2([key], index, dots) : indexes === null ? key : key + "[]",
            convertValue(el)
          );
        });
        return false;
      }
    }
    if (isVisitable2(value)) {
      return true;
    }
    formData.append(renderKey2(path3, key, dots), convertValue(value));
    return false;
  }
  const stack = [];
  const exposedHelpers = Object.assign(predicates2, {
    defaultVisitor,
    convertValue,
    isVisitable: isVisitable2
  });
  function build(value, path3) {
    if (utils_default.isUndefined(value)) return;
    if (stack.indexOf(value) !== -1) {
      throw Error("Circular reference detected in " + path3.join("."));
    }
    stack.push(value);
    utils_default.forEach(value, function each(el, key) {
      const result = !(utils_default.isUndefined(el) || el === null) && visitor.call(
        formData,
        el,
        utils_default.isString(key) ? key.trim() : key,
        path3,
        exposedHelpers
      );
      if (result === true) {
        build(el, path3 ? path3.concat(key) : [key]);
      }
    });
    stack.pop();
  }
  if (!utils_default.isObject(obj)) {
    throw new TypeError("data must be an object");
  }
  build(obj);
  return formData;
}
var toFormData_default = toFormData2;

// node_modules/.pnpm/axios@1.9.0/node_modules/axios/lib/helpers/AxiosURLSearchParams.js
function encode2(str) {
  const charMap = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(str).replace(/[!'()~]|%20|%00/g, function replacer(match) {
    return charMap[match];
  });
}
function AxiosURLSearchParams2(params, options) {
  this._pairs = [];
  params && toFormData_default(params, this, options);
}
var prototype3 = AxiosURLSearchParams2.prototype;
prototype3.append = function append2(name, value) {
  this._pairs.push([name, value]);
};
prototype3.toString = function toString4(encoder) {
  const _encode = encoder ? function(value) {
    return encoder.call(this, value, encode2);
  } : encode2;
  return this._pairs.map(function each(pair) {
    return _encode(pair[0]) + "=" + _encode(pair[1]);
  }, "").join("&");
};
var AxiosURLSearchParams_default = AxiosURLSearchParams2;

// node_modules/.pnpm/axios@1.9.0/node_modules/axios/lib/helpers/buildURL.js
function encode3(val) {
  return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function buildURL2(url2, params, options) {
  if (!params) {
    return url2;
  }
  const _encode = options && options.encode || encode3;
  if (utils_default.isFunction(options)) {
    options = {
      serialize: options
    };
  }
  const serializeFn = options && options.serialize;
  let serializedParams;
  if (serializeFn) {
    serializedParams = serializeFn(params, options);
  } else {
    serializedParams = utils_default.isURLSearchParams(params) ? params.toString() : new AxiosURLSearchParams_default(params, options).toString(_encode);
  }
  if (serializedParams) {
    const hashmarkIndex = url2.indexOf("#");
    if (hashmarkIndex !== -1) {
      url2 = url2.slice(0, hashmarkIndex);
    }
    url2 += (url2.indexOf("?") === -1 ? "?" : "&") + serializedParams;
  }
  return url2;
}

// node_modules/.pnpm/axios@1.9.0/node_modules/axios/lib/core/InterceptorManager.js
init_esm_shims();
var InterceptorManager2 = class {
  constructor() {
    this.handlers = [];
  }
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(fulfilled, rejected, options) {
    this.handlers.push({
      fulfilled,
      rejected,
      synchronous: options ? options.synchronous : false,
      runWhen: options ? options.runWhen : null
    });
    return this.handlers.length - 1;
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
   */
  eject(id) {
    if (this.handlers[id]) {
      this.handlers[id] = null;
    }
  }
  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    if (this.handlers) {
      this.handlers = [];
    }
  }
  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(fn) {
    utils_default.forEach(this.handlers, function forEachHandler(h) {
      if (h !== null) {
        fn(h);
      }
    });
  }
};
var InterceptorManager_default = InterceptorManager2;

// node_modules/.pnpm/axios@1.9.0/node_modules/axios/lib/core/dispatchRequest.js
init_esm_shims();

// node_modules/.pnpm/axios@1.9.0/node_modules/axios/lib/core/transformData.js
init_esm_shims();

// node_modules/.pnpm/axios@1.9.0/node_modules/axios/lib/defaults/index.js
init_esm_shims();

// node_modules/.pnpm/axios@1.9.0/node_modules/axios/lib/defaults/transitional.js
init_esm_shims();
var transitional_default = {
  silentJSONParsing: true,
  forcedJSONParsing: true,
  clarifyTimeoutError: false
};

// node_modules/.pnpm/axios@1.9.0/node_modules/axios/lib/helpers/toURLEncodedForm.js
init_esm_shims();

// node_modules/.pnpm/axios@1.9.0/node_modules/axios/lib/platform/index.js
init_esm_shims();

// node_modules/.pnpm/axios@1.9.0/node_modules/axios/lib/platform/node/index.js
init_esm_shims();

// node_modules/.pnpm/axios@1.9.0/node_modules/axios/lib/platform/node/classes/URLSearchParams.js
init_esm_shims();
var URLSearchParams_default = require$$4.URLSearchParams;

// node_modules/.pnpm/axios@1.9.0/node_modules/axios/lib/platform/node/index.js
var ALPHA = "abcdefghijklmnopqrstuvwxyz";
var DIGIT = "0123456789";
var ALPHABET = {
  DIGIT,
  ALPHA,
  ALPHA_DIGIT: ALPHA + ALPHA.toUpperCase() + DIGIT
};
var generateString = (size = 16, alphabet = ALPHABET.ALPHA_DIGIT) => {
  let str = "";
  const { length } = alphabet;
  const randomValues = new Uint32Array(size);
  crypto.randomFillSync(randomValues);
  for (let i = 0; i < size; i++) {
    str += alphabet[randomValues[i] % length];
  }
  return str;
};
var node_default = {
  isNode: true,
  classes: {
    URLSearchParams: URLSearchParams_default,
    FormData: FormData_default,
    Blob: typeof Blob !== "undefined" && Blob || null
  },
  ALPHABET,
  generateString,
  protocols: ["http", "https", "file", "data"]
};

// node_modules/.pnpm/axios@1.9.0/node_modules/axios/lib/platform/common/utils.js
var utils_exports = {};
__export(utils_exports, {
  hasBrowserEnv: () => hasBrowserEnv2,
  hasStandardBrowserEnv: () => hasStandardBrowserEnv2,
  hasStandardBrowserWebWorkerEnv: () => hasStandardBrowserWebWorkerEnv2,
  navigator: () => _navigator2,
  origin: () => origin2
});
init_esm_shims();
var hasBrowserEnv2 = typeof window !== "undefined" && typeof document !== "undefined";
var _navigator2 = typeof navigator === "object" && navigator || void 0;
var hasStandardBrowserEnv2 = hasBrowserEnv2 && (!_navigator2 || ["ReactNative", "NativeScript", "NS"].indexOf(_navigator2.product) < 0);
var hasStandardBrowserWebWorkerEnv2 = (() => {
  return typeof WorkerGlobalScope !== "undefined" && // eslint-disable-next-line no-undef
  self instanceof WorkerGlobalScope && typeof self.importScripts === "function";
})();
var origin2 = hasBrowserEnv2 && window.location.href || "http://localhost";

// node_modules/.pnpm/axios@1.9.0/node_modules/axios/lib/platform/index.js
var platform_default = {
  ...utils_exports,
  ...node_default
};

// node_modules/.pnpm/axios@1.9.0/node_modules/axios/lib/helpers/toURLEncodedForm.js
function toURLEncodedForm2(data2, options) {
  return toFormData_default(data2, new platform_default.classes.URLSearchParams(), Object.assign({
    visitor: function(value, key, path3, helpers) {
      if (platform_default.isNode && utils_default.isBuffer(value)) {
        this.append(key, value.toString("base64"));
        return false;
      }
      return helpers.defaultVisitor.apply(this, arguments);
    }
  }, options));
}

// node_modules/.pnpm/axios@1.9.0/node_modules/axios/lib/helpers/formDataToJSON.js
init_esm_shims();
function parsePropPath2(name) {
  return utils_default.matchAll(/\w+|\[(\w*)]/g, name).map((match) => {
    return match[0] === "[]" ? "" : match[1] || match[0];
  });
}
function arrayToObject2(arr) {
  const obj = {};
  const keys = Object.keys(arr);
  let i;
  const len = keys.length;
  let key;
  for (i = 0; i < len; i++) {
    key = keys[i];
    obj[key] = arr[key];
  }
  return obj;
}
function formDataToJSON2(formData) {
  function buildPath(path3, value, target, index) {
    let name = path3[index++];
    if (name === "__proto__") return true;
    const isNumericKey = Number.isFinite(+name);
    const isLast = index >= path3.length;
    name = !name && utils_default.isArray(target) ? target.length : name;
    if (isLast) {
      if (utils_default.hasOwnProp(target, name)) {
        target[name] = [target[name], value];
      } else {
        target[name] = value;
      }
      return !isNumericKey;
    }
    if (!target[name] || !utils_default.isObject(target[name])) {
      target[name] = [];
    }
    const result = buildPath(path3, value, target[name], index);
    if (result && utils_default.isArray(target[name])) {
      target[name] = arrayToObject2(target[name]);
    }
    return !isNumericKey;
  }
  if (utils_default.isFormData(formData) && utils_default.isFunction(formData.entries)) {
    const obj = {};
    utils_default.forEachEntry(formData, (name, value) => {
      buildPath(parsePropPath2(name), value, obj, 0);
    });
    return obj;
  }
  return null;
}
var formDataToJSON_default = formDataToJSON2;

// node_modules/.pnpm/axios@1.9.0/node_modules/axios/lib/defaults/index.js
function stringifySafely2(rawValue, parser, encoder) {
  if (utils_default.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils_default.trim(rawValue);
    } catch (e) {
      if (e.name !== "SyntaxError") {
        throw e;
      }
    }
  }
  return (encoder || JSON.stringify)(rawValue);
}
var defaults2 = {
  transitional: transitional_default,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [function transformRequest2(data2, headers2) {
    const contentType = headers2.getContentType() || "";
    const hasJSONContentType = contentType.indexOf("application/json") > -1;
    const isObjectPayload = utils_default.isObject(data2);
    if (isObjectPayload && utils_default.isHTMLForm(data2)) {
      data2 = new FormData(data2);
    }
    const isFormData3 = utils_default.isFormData(data2);
    if (isFormData3) {
      return hasJSONContentType ? JSON.stringify(formDataToJSON_default(data2)) : data2;
    }
    if (utils_default.isArrayBuffer(data2) || utils_default.isBuffer(data2) || utils_default.isStream(data2) || utils_default.isFile(data2) || utils_default.isBlob(data2) || utils_default.isReadableStream(data2)) {
      return data2;
    }
    if (utils_default.isArrayBufferView(data2)) {
      return data2.buffer;
    }
    if (utils_default.isURLSearchParams(data2)) {
      headers2.setContentType("application/x-www-form-urlencoded;charset=utf-8", false);
      return data2.toString();
    }
    let isFileList3;
    if (isObjectPayload) {
      if (contentType.indexOf("application/x-www-form-urlencoded") > -1) {
        return toURLEncodedForm2(data2, this.formSerializer).toString();
      }
      if ((isFileList3 = utils_default.isFileList(data2)) || contentType.indexOf("multipart/form-data") > -1) {
        const _FormData = this.env && this.env.FormData;
        return toFormData_default(
          isFileList3 ? { "files[]": data2 } : data2,
          _FormData && new _FormData(),
          this.formSerializer
        );
      }
    }
    if (isObjectPayload || hasJSONContentType) {
      headers2.setContentType("application/json", false);
      return stringifySafely2(data2);
    }
    return data2;
  }],
  transformResponse: [function transformResponse2(data2) {
    const transitional3 = this.transitional || defaults2.transitional;
    const forcedJSONParsing = transitional3 && transitional3.forcedJSONParsing;
    const JSONRequested = this.responseType === "json";
    if (utils_default.isResponse(data2) || utils_default.isReadableStream(data2)) {
      return data2;
    }
    if (data2 && utils_default.isString(data2) && (forcedJSONParsing && !this.responseType || JSONRequested)) {
      const silentJSONParsing = transitional3 && transitional3.silentJSONParsing;
      const strictJSONParsing = !silentJSONParsing && JSONRequested;
      try {
        return JSON.parse(data2);
      } catch (e) {
        if (strictJSONParsing) {
          if (e.name === "SyntaxError") {
            throw AxiosError_default.from(e, AxiosError_default.ERR_BAD_RESPONSE, this, null, this.response);
          }
          throw e;
        }
      }
    }
    return data2;
  }],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: platform_default.classes.FormData,
    Blob: platform_default.classes.Blob
  },
  validateStatus: function validateStatus2(status) {
    return status >= 200 && status < 300;
  },
  headers: {
    common: {
      "Accept": "application/json, text/plain, */*",
      "Content-Type": void 0
    }
  }
};
utils_default.forEach(["delete", "get", "head", "post", "put", "patch"], (method) => {
  defaults2.headers[method] = {};
});
var defaults_default = defaults2;

// node_modules/.pnpm/axios@1.9.0/node_modules/axios/lib/core/AxiosHeaders.js
init_esm_shims();

// node_modules/.pnpm/axios@1.9.0/node_modules/axios/lib/helpers/parseHeaders.js
init_esm_shims();
var ignoreDuplicateOf2 = utils_default.toObjectSet([
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
]);
var parseHeaders_default = (rawHeaders) => {
  const parsed = {};
  let key;
  let val;
  let i;
  rawHeaders && rawHeaders.split("\n").forEach(function parser(line) {
    i = line.indexOf(":");
    key = line.substring(0, i).trim().toLowerCase();
    val = line.substring(i + 1).trim();
    if (!key || parsed[key] && ignoreDuplicateOf2[key]) {
      return;
    }
    if (key === "set-cookie") {
      if (parsed[key]) {
        parsed[key].push(val);
      } else {
        parsed[key] = [val];
      }
    } else {
      parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
    }
  });
  return parsed;
};

// node_modules/.pnpm/axios@1.9.0/node_modules/axios/lib/core/AxiosHeaders.js
var $internals2 = Symbol("internals");
function normalizeHeader2(header) {
  return header && String(header).trim().toLowerCase();
}
function normalizeValue2(value) {
  if (value === false || value == null) {
    return value;
  }
  return utils_default.isArray(value) ? value.map(normalizeValue2) : String(value);
}
function parseTokens2(str) {
  const tokens = /* @__PURE__ */ Object.create(null);
  const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let match;
  while (match = tokensRE.exec(str)) {
    tokens[match[1]] = match[2];
  }
  return tokens;
}
var isValidHeaderName2 = (str) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());
function matchHeaderValue2(context, value, header, filter3, isHeaderNameFilter) {
  if (utils_default.isFunction(filter3)) {
    return filter3.call(this, value, header);
  }
  if (isHeaderNameFilter) {
    value = header;
  }
  if (!utils_default.isString(value)) return;
  if (utils_default.isString(filter3)) {
    return value.indexOf(filter3) !== -1;
  }
  if (utils_default.isRegExp(filter3)) {
    return filter3.test(value);
  }
}
function formatHeader2(header) {
  return header.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (w, char, str) => {
    return char.toUpperCase() + str;
  });
}
function buildAccessors2(obj, header) {
  const accessorName = utils_default.toCamelCase(" " + header);
  ["get", "set", "has"].forEach((methodName) => {
    Object.defineProperty(obj, methodName + accessorName, {
      value: function(arg1, arg2, arg3) {
        return this[methodName].call(this, header, arg1, arg2, arg3);
      },
      configurable: true
    });
  });
}
var AxiosHeaders3 = class {
  constructor(headers2) {
    headers2 && this.set(headers2);
  }
  set(header, valueOrRewrite, rewrite) {
    const self2 = this;
    function setHeader(_value, _header, _rewrite) {
      const lHeader = normalizeHeader2(_header);
      if (!lHeader) {
        throw new Error("header name must be a non-empty string");
      }
      const key = utils_default.findKey(self2, lHeader);
      if (!key || self2[key] === void 0 || _rewrite === true || _rewrite === void 0 && self2[key] !== false) {
        self2[key || _header] = normalizeValue2(_value);
      }
    }
    const setHeaders = (headers2, _rewrite) => utils_default.forEach(headers2, (_value, _header) => setHeader(_value, _header, _rewrite));
    if (utils_default.isPlainObject(header) || header instanceof this.constructor) {
      setHeaders(header, valueOrRewrite);
    } else if (utils_default.isString(header) && (header = header.trim()) && !isValidHeaderName2(header)) {
      setHeaders(parseHeaders_default(header), valueOrRewrite);
    } else if (utils_default.isObject(header) && utils_default.isIterable(header)) {
      let obj = {}, dest, key;
      for (const entry of header) {
        if (!utils_default.isArray(entry)) {
          throw TypeError("Object iterator must return a key-value pair");
        }
        obj[key = entry[0]] = (dest = obj[key]) ? utils_default.isArray(dest) ? [...dest, entry[1]] : [dest, entry[1]] : entry[1];
      }
      setHeaders(obj, valueOrRewrite);
    } else {
      header != null && setHeader(valueOrRewrite, header, rewrite);
    }
    return this;
  }
  get(header, parser) {
    header = normalizeHeader2(header);
    if (header) {
      const key = utils_default.findKey(this, header);
      if (key) {
        const value = this[key];
        if (!parser) {
          return value;
        }
        if (parser === true) {
          return parseTokens2(value);
        }
        if (utils_default.isFunction(parser)) {
          return parser.call(this, value, key);
        }
        if (utils_default.isRegExp(parser)) {
          return parser.exec(value);
        }
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(header, matcher) {
    header = normalizeHeader2(header);
    if (header) {
      const key = utils_default.findKey(this, header);
      return !!(key && this[key] !== void 0 && (!matcher || matchHeaderValue2(this, this[key], key, matcher)));
    }
    return false;
  }
  delete(header, matcher) {
    const self2 = this;
    let deleted = false;
    function deleteHeader(_header) {
      _header = normalizeHeader2(_header);
      if (_header) {
        const key = utils_default.findKey(self2, _header);
        if (key && (!matcher || matchHeaderValue2(self2, self2[key], key, matcher))) {
          delete self2[key];
          deleted = true;
        }
      }
    }
    if (utils_default.isArray(header)) {
      header.forEach(deleteHeader);
    } else {
      deleteHeader(header);
    }
    return deleted;
  }
  clear(matcher) {
    const keys = Object.keys(this);
    let i = keys.length;
    let deleted = false;
    while (i--) {
      const key = keys[i];
      if (!matcher || matchHeaderValue2(this, this[key], key, matcher, true)) {
        delete this[key];
        deleted = true;
      }
    }
    return deleted;
  }
  normalize(format) {
    const self2 = this;
    const headers2 = {};
    utils_default.forEach(this, (value, header) => {
      const key = utils_default.findKey(headers2, header);
      if (key) {
        self2[key] = normalizeValue2(value);
        delete self2[header];
        return;
      }
      const normalized = format ? formatHeader2(header) : String(header).trim();
      if (normalized !== header) {
        delete self2[header];
      }
      self2[normalized] = normalizeValue2(value);
      headers2[normalized] = true;
    });
    return this;
  }
  concat(...targets) {
    return this.constructor.concat(this, ...targets);
  }
  toJSON(asStrings) {
    const obj = /* @__PURE__ */ Object.create(null);
    utils_default.forEach(this, (value, header) => {
      value != null && value !== false && (obj[header] = asStrings && utils_default.isArray(value) ? value.join(", ") : value);
    });
    return obj;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([header, value]) => header + ": " + value).join("\n");
  }
  getSetCookie() {
    return this.get("set-cookie") || [];
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(thing) {
    return thing instanceof this ? thing : new this(thing);
  }
  static concat(first, ...targets) {
    const computed = new this(first);
    targets.forEach((target) => computed.set(target));
    return computed;
  }
  static accessor(header) {
    const internals = this[$internals2] = this[$internals2] = {
      accessors: {}
    };
    const accessors = internals.accessors;
    const prototype4 = this.prototype;
    function defineAccessor(_header) {
      const lHeader = normalizeHeader2(_header);
      if (!accessors[lHeader]) {
        buildAccessors2(prototype4, _header);
        accessors[lHeader] = true;
      }
    }
    utils_default.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);
    return this;
  }
};
AxiosHeaders3.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
utils_default.reduceDescriptors(AxiosHeaders3.prototype, ({ value }, key) => {
  let mapped = key[0].toUpperCase() + key.slice(1);
  return {
    get: () => value,
    set(headerValue) {
      this[mapped] = headerValue;
    }
  };
});
utils_default.freezeMethods(AxiosHeaders3);
var AxiosHeaders_default = AxiosHeaders3;

// node_modules/.pnpm/axios@1.9.0/node_modules/axios/lib/core/transformData.js
function transformData2(fns, response) {
  const config = this || defaults_default;
  const context = response || config;
  const headers2 = AxiosHeaders_default.from(context.headers);
  let data2 = context.data;
  utils_default.forEach(fns, function transform(fn) {
    data2 = fn.call(config, data2, headers2.normalize(), response ? response.status : void 0);
  });
  headers2.normalize();
  return data2;
}

// node_modules/.pnpm/axios@1.9.0/node_modules/axios/lib/cancel/isCancel.js
init_esm_shims();
function isCancel2(value) {
  return !!(value && value.__CANCEL__);
}

// node_modules/.pnpm/axios@1.9.0/node_modules/axios/lib/cancel/CanceledError.js
init_esm_shims();
function CanceledError2(message, config, request) {
  AxiosError_default.call(this, message == null ? "canceled" : message, AxiosError_default.ERR_CANCELED, config, request);
  this.name = "CanceledError";
}
utils_default.inherits(CanceledError2, AxiosError_default, {
  __CANCEL__: true
});
var CanceledError_default = CanceledError2;

// node_modules/.pnpm/axios@1.9.0/node_modules/axios/lib/adapters/adapters.js
init_esm_shims();

// node_modules/.pnpm/axios@1.9.0/node_modules/axios/lib/adapters/http.js
init_esm_shims();

// node_modules/.pnpm/axios@1.9.0/node_modules/axios/lib/core/settle.js
init_esm_shims();
function settle2(resolve, reject, response) {
  const validateStatus3 = response.config.validateStatus;
  if (!response.status || !validateStatus3 || validateStatus3(response.status)) {
    resolve(response);
  } else {
    reject(new AxiosError_default(
      "Request failed with status code " + response.status,
      [AxiosError_default.ERR_BAD_REQUEST, AxiosError_default.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
      response.config,
      response.request,
      response
    ));
  }
}

// node_modules/.pnpm/axios@1.9.0/node_modules/axios/lib/core/buildFullPath.js
init_esm_shims();

// node_modules/.pnpm/axios@1.9.0/node_modules/axios/lib/helpers/isAbsoluteURL.js
init_esm_shims();
function isAbsoluteURL2(url2) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url2);
}

// node_modules/.pnpm/axios@1.9.0/node_modules/axios/lib/helpers/combineURLs.js
init_esm_shims();
function combineURLs2(baseURL, relativeURL) {
  return relativeURL ? baseURL.replace(/\/?\/$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
}

// node_modules/.pnpm/axios@1.9.0/node_modules/axios/lib/core/buildFullPath.js
function buildFullPath2(baseURL, requestedURL, allowAbsoluteUrls) {
  let isRelativeUrl = !isAbsoluteURL2(requestedURL);
  if (baseURL && (isRelativeUrl || allowAbsoluteUrls == false)) {
    return combineURLs2(baseURL, requestedURL);
  }
  return requestedURL;
}

// node_modules/.pnpm/axios@1.9.0/node_modules/axios/lib/adapters/http.js
var import_proxy_from_env = __toESM(require_proxy_from_env(), 1);
var import_follow_redirects = __toESM(require_follow_redirects(), 1);

// node_modules/.pnpm/axios@1.9.0/node_modules/axios/lib/env/data.js
init_esm_shims();
var VERSION2 = "1.9.0";

// node_modules/.pnpm/axios@1.9.0/node_modules/axios/lib/helpers/fromDataURI.js
init_esm_shims();

// node_modules/.pnpm/axios@1.9.0/node_modules/axios/lib/helpers/parseProtocol.js
init_esm_shims();
function parseProtocol2(url2) {
  const match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url2);
  return match && match[1] || "";
}

// node_modules/.pnpm/axios@1.9.0/node_modules/axios/lib/helpers/fromDataURI.js
var DATA_URL_PATTERN = /^(?:([^;]+);)?(?:[^;]+;)?(base64|),([\s\S]*)$/;
function fromDataURI(uri, asBlob, options) {
  const _Blob = options && options.Blob || platform_default.classes.Blob;
  const protocol = parseProtocol2(uri);
  if (asBlob === void 0 && _Blob) {
    asBlob = true;
  }
  if (protocol === "data") {
    uri = protocol.length ? uri.slice(protocol.length + 1) : uri;
    const match = DATA_URL_PATTERN.exec(uri);
    if (!match) {
      throw new AxiosError_default("Invalid URL", AxiosError_default.ERR_INVALID_URL);
    }
    const mime = match[1];
    const isBase64 = match[2];
    const body = match[3];
    const buffer2 = Buffer.from(decodeURIComponent(body), isBase64 ? "base64" : "utf8");
    if (asBlob) {
      if (!_Blob) {
        throw new AxiosError_default("Blob is not supported", AxiosError_default.ERR_NOT_SUPPORT);
      }
      return new _Blob([buffer2], { type: mime });
    }
    return buffer2;
  }
  throw new AxiosError_default("Unsupported protocol " + protocol, AxiosError_default.ERR_NOT_SUPPORT);
}

// node_modules/.pnpm/axios@1.9.0/node_modules/axios/lib/helpers/AxiosTransformStream.js
init_esm_shims();
var kInternals = Symbol("internals");
var AxiosTransformStream = class extends stream3.Transform {
  constructor(options) {
    options = utils_default.toFlatObject(options, {
      maxRate: 0,
      chunkSize: 64 * 1024,
      minChunkSize: 100,
      timeWindow: 500,
      ticksRate: 2,
      samplesCount: 15
    }, null, (prop, source) => {
      return !utils_default.isUndefined(source[prop]);
    });
    super({
      readableHighWaterMark: options.chunkSize
    });
    const internals = this[kInternals] = {
      timeWindow: options.timeWindow,
      chunkSize: options.chunkSize,
      maxRate: options.maxRate,
      minChunkSize: options.minChunkSize,
      bytesSeen: 0,
      isCaptured: false,
      notifiedBytesLoaded: 0,
      ts: Date.now(),
      bytes: 0,
      onReadCallback: null
    };
    this.on("newListener", (event) => {
      if (event === "progress") {
        if (!internals.isCaptured) {
          internals.isCaptured = true;
        }
      }
    });
  }
  _read(size) {
    const internals = this[kInternals];
    if (internals.onReadCallback) {
      internals.onReadCallback();
    }
    return super._read(size);
  }
  _transform(chunk, encoding, callback) {
    const internals = this[kInternals];
    const maxRate = internals.maxRate;
    const readableHighWaterMark = this.readableHighWaterMark;
    const timeWindow = internals.timeWindow;
    const divider = 1e3 / timeWindow;
    const bytesThreshold = maxRate / divider;
    const minChunkSize = internals.minChunkSize !== false ? Math.max(internals.minChunkSize, bytesThreshold * 0.01) : 0;
    const pushChunk = (_chunk, _callback) => {
      const bytes = Buffer.byteLength(_chunk);
      internals.bytesSeen += bytes;
      internals.bytes += bytes;
      internals.isCaptured && this.emit("progress", internals.bytesSeen);
      if (this.push(_chunk)) {
        process.nextTick(_callback);
      } else {
        internals.onReadCallback = () => {
          internals.onReadCallback = null;
          process.nextTick(_callback);
        };
      }
    };
    const transformChunk = (_chunk, _callback) => {
      const chunkSize = Buffer.byteLength(_chunk);
      let chunkRemainder = null;
      let maxChunkSize = readableHighWaterMark;
      let bytesLeft;
      let passed = 0;
      if (maxRate) {
        const now2 = Date.now();
        if (!internals.ts || (passed = now2 - internals.ts) >= timeWindow) {
          internals.ts = now2;
          bytesLeft = bytesThreshold - internals.bytes;
          internals.bytes = bytesLeft < 0 ? -bytesLeft : 0;
          passed = 0;
        }
        bytesLeft = bytesThreshold - internals.bytes;
      }
      if (maxRate) {
        if (bytesLeft <= 0) {
          return setTimeout(() => {
            _callback(null, _chunk);
          }, timeWindow - passed);
        }
        if (bytesLeft < maxChunkSize) {
          maxChunkSize = bytesLeft;
        }
      }
      if (maxChunkSize && chunkSize > maxChunkSize && chunkSize - maxChunkSize > minChunkSize) {
        chunkRemainder = _chunk.subarray(maxChunkSize);
        _chunk = _chunk.subarray(0, maxChunkSize);
      }
      pushChunk(_chunk, chunkRemainder ? () => {
        process.nextTick(_callback, null, chunkRemainder);
      } : _callback);
    };
    transformChunk(chunk, function transformNextChunk(err, _chunk) {
      if (err) {
        return callback(err);
      }
      if (_chunk) {
        transformChunk(_chunk, transformNextChunk);
      } else {
        callback(null);
      }
    });
  }
};
var AxiosTransformStream_default = AxiosTransformStream;

// node_modules/.pnpm/axios@1.9.0/node_modules/axios/lib/helpers/formDataToStream.js
init_esm_shims();

// node_modules/.pnpm/axios@1.9.0/node_modules/axios/lib/helpers/readBlob.js
init_esm_shims();
var { asyncIterator } = Symbol;
var readBlob = async function* (blob) {
  if (blob.stream) {
    yield* blob.stream();
  } else if (blob.arrayBuffer) {
    yield await blob.arrayBuffer();
  } else if (blob[asyncIterator]) {
    yield* blob[asyncIterator]();
  } else {
    yield blob;
  }
};
var readBlob_default = readBlob;

// node_modules/.pnpm/axios@1.9.0/node_modules/axios/lib/helpers/formDataToStream.js
var BOUNDARY_ALPHABET = platform_default.ALPHABET.ALPHA_DIGIT + "-_";
var textEncoder = typeof TextEncoder === "function" ? new TextEncoder() : new require$$0.TextEncoder();
var CRLF = "\r\n";
var CRLF_BYTES = textEncoder.encode(CRLF);
var CRLF_BYTES_COUNT = 2;
var FormDataPart = class {
  constructor(name, value) {
    const { escapeName } = this.constructor;
    const isStringValue = utils_default.isString(value);
    let headers2 = `Content-Disposition: form-data; name="${escapeName(name)}"${!isStringValue && value.name ? `; filename="${escapeName(value.name)}"` : ""}${CRLF}`;
    if (isStringValue) {
      value = textEncoder.encode(String(value).replace(/\r?\n|\r\n?/g, CRLF));
    } else {
      headers2 += `Content-Type: ${value.type || "application/octet-stream"}${CRLF}`;
    }
    this.headers = textEncoder.encode(headers2 + CRLF);
    this.contentLength = isStringValue ? value.byteLength : value.size;
    this.size = this.headers.byteLength + this.contentLength + CRLF_BYTES_COUNT;
    this.name = name;
    this.value = value;
  }
  async *encode() {
    yield this.headers;
    const { value } = this;
    if (utils_default.isTypedArray(value)) {
      yield value;
    } else {
      yield* readBlob_default(value);
    }
    yield CRLF_BYTES;
  }
  static escapeName(name) {
    return String(name).replace(/[\r\n"]/g, (match) => ({
      "\r": "%0D",
      "\n": "%0A",
      '"': "%22"
    })[match]);
  }
};
var formDataToStream = (form, headersHandler, options) => {
  const {
    tag = "form-data-boundary",
    size = 25,
    boundary = tag + "-" + platform_default.generateString(size, BOUNDARY_ALPHABET)
  } = options || {};
  if (!utils_default.isFormData(form)) {
    throw TypeError("FormData instance required");
  }
  if (boundary.length < 1 || boundary.length > 70) {
    throw Error("boundary must be 10-70 characters long");
  }
  const boundaryBytes = textEncoder.encode("--" + boundary + CRLF);
  const footerBytes = textEncoder.encode("--" + boundary + "--" + CRLF);
  let contentLength = footerBytes.byteLength;
  const parts = Array.from(form.entries()).map(([name, value]) => {
    const part = new FormDataPart(name, value);
    contentLength += part.size;
    return part;
  });
  contentLength += boundaryBytes.byteLength * parts.length;
  contentLength = utils_default.toFiniteNumber(contentLength);
  const computedHeaders = {
    "Content-Type": `multipart/form-data; boundary=${boundary}`
  };
  if (Number.isFinite(contentLength)) {
    computedHeaders["Content-Length"] = contentLength;
  }
  headersHandler && headersHandler(computedHeaders);
  return Readable.from(async function* () {
    for (const part of parts) {
      yield boundaryBytes;
      yield* part.encode();
    }
    yield footerBytes;
  }());
};
var formDataToStream_default = formDataToStream;

// node_modules/.pnpm/axios@1.9.0/node_modules/axios/lib/helpers/ZlibHeaderTransformStream.js
init_esm_shims();
var ZlibHeaderTransformStream = class extends stream3.Transform {
  __transform(chunk, encoding, callback) {
    this.push(chunk);
    callback();
  }
  _transform(chunk, encoding, callback) {
    if (chunk.length !== 0) {
      this._transform = this.__transform;
      if (chunk[0] !== 120) {
        const header = Buffer.alloc(2);
        header[0] = 120;
        header[1] = 156;
        this.push(header, encoding);
      }
    }
    this.__transform(chunk, encoding, callback);
  }
};
var ZlibHeaderTransformStream_default = ZlibHeaderTransformStream;

// node_modules/.pnpm/axios@1.9.0/node_modules/axios/lib/helpers/callbackify.js
init_esm_shims();
var callbackify = (fn, reducer) => {
  return utils_default.isAsyncFn(fn) ? function(...args) {
    const cb = args.pop();
    fn.apply(this, args).then((value) => {
      try {
        reducer ? cb(null, ...reducer(value)) : cb(null, value);
      } catch (err) {
        cb(err);
      }
    }, cb);
  } : fn;
};
var callbackify_default = callbackify;

// node_modules/.pnpm/axios@1.9.0/node_modules/axios/lib/helpers/progressEventReducer.js
init_esm_shims();

// node_modules/.pnpm/axios@1.9.0/node_modules/axios/lib/helpers/speedometer.js
init_esm_shims();
function speedometer2(samplesCount, min) {
  samplesCount = samplesCount || 10;
  const bytes = new Array(samplesCount);
  const timestamps = new Array(samplesCount);
  let head = 0;
  let tail = 0;
  let firstSampleTS;
  min = min !== void 0 ? min : 1e3;
  return function push(chunkLength) {
    const now2 = Date.now();
    const startedAt = timestamps[tail];
    if (!firstSampleTS) {
      firstSampleTS = now2;
    }
    bytes[head] = chunkLength;
    timestamps[head] = now2;
    let i = tail;
    let bytesCount = 0;
    while (i !== head) {
      bytesCount += bytes[i++];
      i = i % samplesCount;
    }
    head = (head + 1) % samplesCount;
    if (head === tail) {
      tail = (tail + 1) % samplesCount;
    }
    if (now2 - firstSampleTS < min) {
      return;
    }
    const passed = startedAt && now2 - startedAt;
    return passed ? Math.round(bytesCount * 1e3 / passed) : void 0;
  };
}
var speedometer_default = speedometer2;

// node_modules/.pnpm/axios@1.9.0/node_modules/axios/lib/helpers/throttle.js
init_esm_shims();
function throttle2(fn, freq) {
  let timestamp = 0;
  let threshold = 1e3 / freq;
  let lastArgs;
  let timer;
  const invoke = (args, now2 = Date.now()) => {
    timestamp = now2;
    lastArgs = null;
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    fn.apply(null, args);
  };
  const throttled = (...args) => {
    const now2 = Date.now();
    const passed = now2 - timestamp;
    if (passed >= threshold) {
      invoke(args, now2);
    } else {
      lastArgs = args;
      if (!timer) {
        timer = setTimeout(() => {
          timer = null;
          invoke(lastArgs);
        }, threshold - passed);
      }
    }
  };
  const flush = () => lastArgs && invoke(lastArgs);
  return [throttled, flush];
}
var throttle_default = throttle2;

// node_modules/.pnpm/axios@1.9.0/node_modules/axios/lib/helpers/progressEventReducer.js
var progressEventReducer2 = (listener, isDownloadStream, freq = 3) => {
  let bytesNotified = 0;
  const _speedometer = speedometer_default(50, 250);
  return throttle_default((e) => {
    const loaded = e.loaded;
    const total = e.lengthComputable ? e.total : void 0;
    const progressBytes = loaded - bytesNotified;
    const rate = _speedometer(progressBytes);
    const inRange = loaded <= total;
    bytesNotified = loaded;
    const data2 = {
      loaded,
      total,
      progress: total ? loaded / total : void 0,
      bytes: progressBytes,
      rate: rate ? rate : void 0,
      estimated: rate && total && inRange ? (total - loaded) / rate : void 0,
      event: e,
      lengthComputable: total != null,
      [isDownloadStream ? "download" : "upload"]: true
    };
    listener(data2);
  }, freq);
};
var progressEventDecorator2 = (total, throttled) => {
  const lengthComputable = total != null;
  return [(loaded) => throttled[0]({
    lengthComputable,
    total,
    loaded
  }), throttled[1]];
};
var asyncDecorator2 = (fn) => (...args) => utils_default.asap(() => fn(...args));

// node_modules/.pnpm/axios@1.9.0/node_modules/axios/lib/adapters/http.js
var zlibOptions = {
  flush: zlib.constants.Z_SYNC_FLUSH,
  finishFlush: zlib.constants.Z_SYNC_FLUSH
};
var brotliOptions = {
  flush: zlib.constants.BROTLI_OPERATION_FLUSH,
  finishFlush: zlib.constants.BROTLI_OPERATION_FLUSH
};
var isBrotliSupported = utils_default.isFunction(zlib.createBrotliDecompress);
var { http: httpFollow, https: httpsFollow } = import_follow_redirects.default;
var isHttps = /https:?/;
var supportedProtocols = platform_default.protocols.map((protocol) => {
  return protocol + ":";
});
var flushOnFinish = (stream4, [throttled, flush]) => {
  stream4.on("end", flush).on("error", flush);
  return throttled;
};
function dispatchBeforeRedirect(options, responseDetails) {
  if (options.beforeRedirects.proxy) {
    options.beforeRedirects.proxy(options);
  }
  if (options.beforeRedirects.config) {
    options.beforeRedirects.config(options, responseDetails);
  }
}
function setProxy(options, configProxy, location) {
  let proxy = configProxy;
  if (!proxy && proxy !== false) {
    const proxyUrl = import_proxy_from_env.default.getProxyForUrl(location);
    if (proxyUrl) {
      proxy = new URL(proxyUrl);
    }
  }
  if (proxy) {
    if (proxy.username) {
      proxy.auth = (proxy.username || "") + ":" + (proxy.password || "");
    }
    if (proxy.auth) {
      if (proxy.auth.username || proxy.auth.password) {
        proxy.auth = (proxy.auth.username || "") + ":" + (proxy.auth.password || "");
      }
      const base64 = Buffer.from(proxy.auth, "utf8").toString("base64");
      options.headers["Proxy-Authorization"] = "Basic " + base64;
    }
    options.headers.host = options.hostname + (options.port ? ":" + options.port : "");
    const proxyHost = proxy.hostname || proxy.host;
    options.hostname = proxyHost;
    options.host = proxyHost;
    options.port = proxy.port;
    options.path = location;
    if (proxy.protocol) {
      options.protocol = proxy.protocol.includes(":") ? proxy.protocol : `${proxy.protocol}:`;
    }
  }
  options.beforeRedirects.proxy = function beforeRedirect(redirectOptions) {
    setProxy(redirectOptions, configProxy, redirectOptions.href);
  };
}
var isHttpAdapterSupported = typeof process !== "undefined" && utils_default.kindOf(process) === "process";
var wrapAsync = (asyncExecutor) => {
  return new Promise((resolve, reject) => {
    let onDone;
    let isDone;
    const done = (value, isRejected) => {
      if (isDone) return;
      isDone = true;
      onDone && onDone(value, isRejected);
    };
    const _resolve = (value) => {
      done(value);
      resolve(value);
    };
    const _reject = (reason) => {
      done(reason, true);
      reject(reason);
    };
    asyncExecutor(_resolve, _reject, (onDoneHandler) => onDone = onDoneHandler).catch(_reject);
  });
};
var resolveFamily = ({ address, family }) => {
  if (!utils_default.isString(address)) {
    throw TypeError("address must be a string");
  }
  return {
    address,
    family: family || (address.indexOf(".") < 0 ? 6 : 4)
  };
};
var buildAddressEntry = (address, family) => resolveFamily(utils_default.isObject(address) ? address : { address, family });
var http_default = isHttpAdapterSupported && function httpAdapter2(config) {
  return wrapAsync(async function dispatchHttpRequest(resolve, reject, onDone) {
    let { data: data2, lookup, family } = config;
    const { responseType, responseEncoding } = config;
    const method = config.method.toUpperCase();
    let isDone;
    let rejected = false;
    let req;
    if (lookup) {
      const _lookup = callbackify_default(lookup, (value) => utils_default.isArray(value) ? value : [value]);
      lookup = (hostname, opt, cb) => {
        _lookup(hostname, opt, (err, arg0, arg1) => {
          if (err) {
            return cb(err);
          }
          const addresses = utils_default.isArray(arg0) ? arg0.map((addr) => buildAddressEntry(addr)) : [buildAddressEntry(arg0, arg1)];
          opt.all ? cb(err, addresses) : cb(err, addresses[0].address, addresses[0].family);
        });
      };
    }
    const emitter = new EventEmitter();
    const onFinished = () => {
      if (config.cancelToken) {
        config.cancelToken.unsubscribe(abort);
      }
      if (config.signal) {
        config.signal.removeEventListener("abort", abort);
      }
      emitter.removeAllListeners();
    };
    onDone((value, isRejected) => {
      isDone = true;
      if (isRejected) {
        rejected = true;
        onFinished();
      }
    });
    function abort(reason) {
      emitter.emit("abort", !reason || reason.type ? new CanceledError_default(null, config, req) : reason);
    }
    emitter.once("abort", reject);
    if (config.cancelToken || config.signal) {
      config.cancelToken && config.cancelToken.subscribe(abort);
      if (config.signal) {
        config.signal.aborted ? abort() : config.signal.addEventListener("abort", abort);
      }
    }
    const fullPath = buildFullPath2(config.baseURL, config.url, config.allowAbsoluteUrls);
    const parsed = new URL(fullPath, platform_default.hasBrowserEnv ? platform_default.origin : void 0);
    const protocol = parsed.protocol || supportedProtocols[0];
    if (protocol === "data:") {
      let convertedData;
      if (method !== "GET") {
        return settle2(resolve, reject, {
          status: 405,
          statusText: "method not allowed",
          headers: {},
          config
        });
      }
      try {
        convertedData = fromDataURI(config.url, responseType === "blob", {
          Blob: config.env && config.env.Blob
        });
      } catch (err) {
        throw AxiosError_default.from(err, AxiosError_default.ERR_BAD_REQUEST, config);
      }
      if (responseType === "text") {
        convertedData = convertedData.toString(responseEncoding);
        if (!responseEncoding || responseEncoding === "utf8") {
          convertedData = utils_default.stripBOM(convertedData);
        }
      } else if (responseType === "stream") {
        convertedData = stream3.Readable.from(convertedData);
      }
      return settle2(resolve, reject, {
        data: convertedData,
        status: 200,
        statusText: "OK",
        headers: new AxiosHeaders_default(),
        config
      });
    }
    if (supportedProtocols.indexOf(protocol) === -1) {
      return reject(new AxiosError_default(
        "Unsupported protocol " + protocol,
        AxiosError_default.ERR_BAD_REQUEST,
        config
      ));
    }
    const headers2 = AxiosHeaders_default.from(config.headers).normalize();
    headers2.set("User-Agent", "axios/" + VERSION2, false);
    const { onUploadProgress, onDownloadProgress } = config;
    const maxRate = config.maxRate;
    let maxUploadRate = void 0;
    let maxDownloadRate = void 0;
    if (utils_default.isSpecCompliantForm(data2)) {
      const userBoundary = headers2.getContentType(/boundary=([-_\w\d]{10,70})/i);
      data2 = formDataToStream_default(data2, (formHeaders) => {
        headers2.set(formHeaders);
      }, {
        tag: `axios-${VERSION2}-boundary`,
        boundary: userBoundary && userBoundary[1] || void 0
      });
    } else if (utils_default.isFormData(data2) && utils_default.isFunction(data2.getHeaders)) {
      headers2.set(data2.getHeaders());
      if (!headers2.hasContentLength()) {
        try {
          const knownLength = await require$$0.promisify(data2.getLength).call(data2);
          Number.isFinite(knownLength) && knownLength >= 0 && headers2.setContentLength(knownLength);
        } catch (e) {
        }
      }
    } else if (utils_default.isBlob(data2) || utils_default.isFile(data2)) {
      data2.size && headers2.setContentType(data2.type || "application/octet-stream");
      headers2.setContentLength(data2.size || 0);
      data2 = stream3.Readable.from(readBlob_default(data2));
    } else if (data2 && !utils_default.isStream(data2)) {
      if (Buffer.isBuffer(data2)) ; else if (utils_default.isArrayBuffer(data2)) {
        data2 = Buffer.from(new Uint8Array(data2));
      } else if (utils_default.isString(data2)) {
        data2 = Buffer.from(data2, "utf-8");
      } else {
        return reject(new AxiosError_default(
          "Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream",
          AxiosError_default.ERR_BAD_REQUEST,
          config
        ));
      }
      headers2.setContentLength(data2.length, false);
      if (config.maxBodyLength > -1 && data2.length > config.maxBodyLength) {
        return reject(new AxiosError_default(
          "Request body larger than maxBodyLength limit",
          AxiosError_default.ERR_BAD_REQUEST,
          config
        ));
      }
    }
    const contentLength = utils_default.toFiniteNumber(headers2.getContentLength());
    if (utils_default.isArray(maxRate)) {
      maxUploadRate = maxRate[0];
      maxDownloadRate = maxRate[1];
    } else {
      maxUploadRate = maxDownloadRate = maxRate;
    }
    if (data2 && (onUploadProgress || maxUploadRate)) {
      if (!utils_default.isStream(data2)) {
        data2 = stream3.Readable.from(data2, { objectMode: false });
      }
      data2 = stream3.pipeline([data2, new AxiosTransformStream_default({
        maxRate: utils_default.toFiniteNumber(maxUploadRate)
      })], utils_default.noop);
      onUploadProgress && data2.on("progress", flushOnFinish(
        data2,
        progressEventDecorator2(
          contentLength,
          progressEventReducer2(asyncDecorator2(onUploadProgress), false, 3)
        )
      ));
    }
    let auth = void 0;
    if (config.auth) {
      const username = config.auth.username || "";
      const password = config.auth.password || "";
      auth = username + ":" + password;
    }
    if (!auth && parsed.username) {
      const urlUsername = parsed.username;
      const urlPassword = parsed.password;
      auth = urlUsername + ":" + urlPassword;
    }
    auth && headers2.delete("authorization");
    let path3;
    try {
      path3 = buildURL2(
        parsed.pathname + parsed.search,
        config.params,
        config.paramsSerializer
      ).replace(/^\?/, "");
    } catch (err) {
      const customErr = new Error(err.message);
      customErr.config = config;
      customErr.url = config.url;
      customErr.exists = true;
      return reject(customErr);
    }
    headers2.set(
      "Accept-Encoding",
      "gzip, compress, deflate" + (isBrotliSupported ? ", br" : ""),
      false
    );
    const options = {
      path: path3,
      method,
      headers: headers2.toJSON(),
      agents: { http: config.httpAgent, https: config.httpsAgent },
      auth,
      protocol,
      family,
      beforeRedirect: dispatchBeforeRedirect,
      beforeRedirects: {}
    };
    !utils_default.isUndefined(lookup) && (options.lookup = lookup);
    if (config.socketPath) {
      options.socketPath = config.socketPath;
    } else {
      options.hostname = parsed.hostname.startsWith("[") ? parsed.hostname.slice(1, -1) : parsed.hostname;
      options.port = parsed.port;
      setProxy(options, config.proxy, protocol + "//" + parsed.hostname + (parsed.port ? ":" + parsed.port : "") + options.path);
    }
    let transport;
    const isHttpsRequest = isHttps.test(options.protocol);
    options.agent = isHttpsRequest ? config.httpsAgent : config.httpAgent;
    if (config.transport) {
      transport = config.transport;
    } else if (config.maxRedirects === 0) {
      transport = isHttpsRequest ? https : http;
    } else {
      if (config.maxRedirects) {
        options.maxRedirects = config.maxRedirects;
      }
      if (config.beforeRedirect) {
        options.beforeRedirects.config = config.beforeRedirect;
      }
      transport = isHttpsRequest ? httpsFollow : httpFollow;
    }
    if (config.maxBodyLength > -1) {
      options.maxBodyLength = config.maxBodyLength;
    } else {
      options.maxBodyLength = Infinity;
    }
    if (config.insecureHTTPParser) {
      options.insecureHTTPParser = config.insecureHTTPParser;
    }
    req = transport.request(options, function handleResponse(res) {
      if (req.destroyed) return;
      const streams = [res];
      const responseLength = +res.headers["content-length"];
      if (onDownloadProgress || maxDownloadRate) {
        const transformStream = new AxiosTransformStream_default({
          maxRate: utils_default.toFiniteNumber(maxDownloadRate)
        });
        onDownloadProgress && transformStream.on("progress", flushOnFinish(
          transformStream,
          progressEventDecorator2(
            responseLength,
            progressEventReducer2(asyncDecorator2(onDownloadProgress), true, 3)
          )
        ));
        streams.push(transformStream);
      }
      let responseStream = res;
      const lastRequest = res.req || req;
      if (config.decompress !== false && res.headers["content-encoding"]) {
        if (method === "HEAD" || res.statusCode === 204) {
          delete res.headers["content-encoding"];
        }
        switch ((res.headers["content-encoding"] || "").toLowerCase()) {
          /*eslint default-case:0*/
          case "gzip":
          case "x-gzip":
          case "compress":
          case "x-compress":
            streams.push(zlib.createUnzip(zlibOptions));
            delete res.headers["content-encoding"];
            break;
          case "deflate":
            streams.push(new ZlibHeaderTransformStream_default());
            streams.push(zlib.createUnzip(zlibOptions));
            delete res.headers["content-encoding"];
            break;
          case "br":
            if (isBrotliSupported) {
              streams.push(zlib.createBrotliDecompress(brotliOptions));
              delete res.headers["content-encoding"];
            }
        }
      }
      responseStream = streams.length > 1 ? stream3.pipeline(streams, utils_default.noop) : streams[0];
      const offListeners = stream3.finished(responseStream, () => {
        offListeners();
        onFinished();
      });
      const response = {
        status: res.statusCode,
        statusText: res.statusMessage,
        headers: new AxiosHeaders_default(res.headers),
        config,
        request: lastRequest
      };
      if (responseType === "stream") {
        response.data = responseStream;
        settle2(resolve, reject, response);
      } else {
        const responseBuffer = [];
        let totalResponseBytes = 0;
        responseStream.on("data", function handleStreamData(chunk) {
          responseBuffer.push(chunk);
          totalResponseBytes += chunk.length;
          if (config.maxContentLength > -1 && totalResponseBytes > config.maxContentLength) {
            rejected = true;
            responseStream.destroy();
            reject(new AxiosError_default(
              "maxContentLength size of " + config.maxContentLength + " exceeded",
              AxiosError_default.ERR_BAD_RESPONSE,
              config,
              lastRequest
            ));
          }
        });
        responseStream.on("aborted", function handlerStreamAborted() {
          if (rejected) {
            return;
          }
          const err = new AxiosError_default(
            "stream has been aborted",
            AxiosError_default.ERR_BAD_RESPONSE,
            config,
            lastRequest
          );
          responseStream.destroy(err);
          reject(err);
        });
        responseStream.on("error", function handleStreamError(err) {
          if (req.destroyed) return;
          reject(AxiosError_default.from(err, null, config, lastRequest));
        });
        responseStream.on("end", function handleStreamEnd() {
          try {
            let responseData = responseBuffer.length === 1 ? responseBuffer[0] : Buffer.concat(responseBuffer);
            if (responseType !== "arraybuffer") {
              responseData = responseData.toString(responseEncoding);
              if (!responseEncoding || responseEncoding === "utf8") {
                responseData = utils_default.stripBOM(responseData);
              }
            }
            response.data = responseData;
          } catch (err) {
            return reject(AxiosError_default.from(err, null, config, response.request, response));
          }
          settle2(resolve, reject, response);
        });
      }
      emitter.once("abort", (err) => {
        if (!responseStream.destroyed) {
          responseStream.emit("error", err);
          responseStream.destroy();
        }
      });
    });
    emitter.once("abort", (err) => {
      reject(err);
      req.destroy(err);
    });
    req.on("error", function handleRequestError(err) {
      reject(AxiosError_default.from(err, null, config, req));
    });
    req.on("socket", function handleRequestSocket(socket) {
      socket.setKeepAlive(true, 1e3 * 60);
    });
    if (config.timeout) {
      const timeout = parseInt(config.timeout, 10);
      if (Number.isNaN(timeout)) {
        reject(new AxiosError_default(
          "error trying to parse `config.timeout` to int",
          AxiosError_default.ERR_BAD_OPTION_VALUE,
          config,
          req
        ));
        return;
      }
      req.setTimeout(timeout, function handleRequestTimeout() {
        if (isDone) return;
        let timeoutErrorMessage = config.timeout ? "timeout of " + config.timeout + "ms exceeded" : "timeout exceeded";
        const transitional3 = config.transitional || transitional_default;
        if (config.timeoutErrorMessage) {
          timeoutErrorMessage = config.timeoutErrorMessage;
        }
        reject(new AxiosError_default(
          timeoutErrorMessage,
          transitional3.clarifyTimeoutError ? AxiosError_default.ETIMEDOUT : AxiosError_default.ECONNABORTED,
          config,
          req
        ));
        abort();
      });
    }
    if (utils_default.isStream(data2)) {
      let ended = false;
      let errored = false;
      data2.on("end", () => {
        ended = true;
      });
      data2.once("error", (err) => {
        errored = true;
        req.destroy(err);
      });
      data2.on("close", () => {
        if (!ended && !errored) {
          abort(new CanceledError_default("Request stream has been aborted", config, req));
        }
      });
      data2.pipe(req);
    } else {
      req.end(data2);
    }
  });
};

// node_modules/.pnpm/axios@1.9.0/node_modules/axios/lib/adapters/xhr.js
init_esm_shims();

// node_modules/.pnpm/axios@1.9.0/node_modules/axios/lib/helpers/resolveConfig.js
init_esm_shims();

// node_modules/.pnpm/axios@1.9.0/node_modules/axios/lib/helpers/isURLSameOrigin.js
init_esm_shims();
var isURLSameOrigin_default = platform_default.hasStandardBrowserEnv ? /* @__PURE__ */ ((origin3, isMSIE) => (url2) => {
  url2 = new URL(url2, platform_default.origin);
  return origin3.protocol === url2.protocol && origin3.host === url2.host && (isMSIE || origin3.port === url2.port);
})(
  new URL(platform_default.origin),
  platform_default.navigator && /(msie|trident)/i.test(platform_default.navigator.userAgent)
) : () => true;

// node_modules/.pnpm/axios@1.9.0/node_modules/axios/lib/helpers/cookies.js
init_esm_shims();
var cookies_default = platform_default.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(name, value, expires, path3, domain, secure) {
      const cookie = [name + "=" + encodeURIComponent(value)];
      utils_default.isNumber(expires) && cookie.push("expires=" + new Date(expires).toGMTString());
      utils_default.isString(path3) && cookie.push("path=" + path3);
      utils_default.isString(domain) && cookie.push("domain=" + domain);
      secure === true && cookie.push("secure");
      document.cookie = cookie.join("; ");
    },
    read(name) {
      const match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
      return match ? decodeURIComponent(match[3]) : null;
    },
    remove(name) {
      this.write(name, "", Date.now() - 864e5);
    }
  }
) : (
  // Non-standard browser env (web workers, react-native) lack needed support.
  {
    write() {
    },
    read() {
      return null;
    },
    remove() {
    }
  }
);

// node_modules/.pnpm/axios@1.9.0/node_modules/axios/lib/core/mergeConfig.js
init_esm_shims();
var headersToObject2 = (thing) => thing instanceof AxiosHeaders_default ? { ...thing } : thing;
function mergeConfig2(config1, config2) {
  config2 = config2 || {};
  const config = {};
  function getMergedValue(target, source, prop, caseless) {
    if (utils_default.isPlainObject(target) && utils_default.isPlainObject(source)) {
      return utils_default.merge.call({ caseless }, target, source);
    } else if (utils_default.isPlainObject(source)) {
      return utils_default.merge({}, source);
    } else if (utils_default.isArray(source)) {
      return source.slice();
    }
    return source;
  }
  function mergeDeepProperties(a, b, prop, caseless) {
    if (!utils_default.isUndefined(b)) {
      return getMergedValue(a, b, prop, caseless);
    } else if (!utils_default.isUndefined(a)) {
      return getMergedValue(void 0, a, prop, caseless);
    }
  }
  function valueFromConfig2(a, b) {
    if (!utils_default.isUndefined(b)) {
      return getMergedValue(void 0, b);
    }
  }
  function defaultToConfig2(a, b) {
    if (!utils_default.isUndefined(b)) {
      return getMergedValue(void 0, b);
    } else if (!utils_default.isUndefined(a)) {
      return getMergedValue(void 0, a);
    }
  }
  function mergeDirectKeys(a, b, prop) {
    if (prop in config2) {
      return getMergedValue(a, b);
    } else if (prop in config1) {
      return getMergedValue(void 0, a);
    }
  }
  const mergeMap = {
    url: valueFromConfig2,
    method: valueFromConfig2,
    data: valueFromConfig2,
    baseURL: defaultToConfig2,
    transformRequest: defaultToConfig2,
    transformResponse: defaultToConfig2,
    paramsSerializer: defaultToConfig2,
    timeout: defaultToConfig2,
    timeoutMessage: defaultToConfig2,
    withCredentials: defaultToConfig2,
    withXSRFToken: defaultToConfig2,
    adapter: defaultToConfig2,
    responseType: defaultToConfig2,
    xsrfCookieName: defaultToConfig2,
    xsrfHeaderName: defaultToConfig2,
    onUploadProgress: defaultToConfig2,
    onDownloadProgress: defaultToConfig2,
    decompress: defaultToConfig2,
    maxContentLength: defaultToConfig2,
    maxBodyLength: defaultToConfig2,
    beforeRedirect: defaultToConfig2,
    transport: defaultToConfig2,
    httpAgent: defaultToConfig2,
    httpsAgent: defaultToConfig2,
    cancelToken: defaultToConfig2,
    socketPath: defaultToConfig2,
    responseEncoding: defaultToConfig2,
    validateStatus: mergeDirectKeys,
    headers: (a, b, prop) => mergeDeepProperties(headersToObject2(a), headersToObject2(b), prop, true)
  };
  utils_default.forEach(Object.keys(Object.assign({}, config1, config2)), function computeConfigValue(prop) {
    const merge3 = mergeMap[prop] || mergeDeepProperties;
    const configValue = merge3(config1[prop], config2[prop], prop);
    utils_default.isUndefined(configValue) && merge3 !== mergeDirectKeys || (config[prop] = configValue);
  });
  return config;
}

// node_modules/.pnpm/axios@1.9.0/node_modules/axios/lib/helpers/resolveConfig.js
var resolveConfig_default = (config) => {
  const newConfig = mergeConfig2({}, config);
  let { data: data2, withXSRFToken, xsrfHeaderName, xsrfCookieName, headers: headers2, auth } = newConfig;
  newConfig.headers = headers2 = AxiosHeaders_default.from(headers2);
  newConfig.url = buildURL2(buildFullPath2(newConfig.baseURL, newConfig.url, newConfig.allowAbsoluteUrls), config.params, config.paramsSerializer);
  if (auth) {
    headers2.set(
      "Authorization",
      "Basic " + btoa((auth.username || "") + ":" + (auth.password ? unescape(encodeURIComponent(auth.password)) : ""))
    );
  }
  let contentType;
  if (utils_default.isFormData(data2)) {
    if (platform_default.hasStandardBrowserEnv || platform_default.hasStandardBrowserWebWorkerEnv) {
      headers2.setContentType(void 0);
    } else if ((contentType = headers2.getContentType()) !== false) {
      const [type, ...tokens] = contentType ? contentType.split(";").map((token) => token.trim()).filter(Boolean) : [];
      headers2.setContentType([type || "multipart/form-data", ...tokens].join("; "));
    }
  }
  if (platform_default.hasStandardBrowserEnv) {
    withXSRFToken && utils_default.isFunction(withXSRFToken) && (withXSRFToken = withXSRFToken(newConfig));
    if (withXSRFToken || withXSRFToken !== false && isURLSameOrigin_default(newConfig.url)) {
      const xsrfValue = xsrfHeaderName && xsrfCookieName && cookies_default.read(xsrfCookieName);
      if (xsrfValue) {
        headers2.set(xsrfHeaderName, xsrfValue);
      }
    }
  }
  return newConfig;
};

// node_modules/.pnpm/axios@1.9.0/node_modules/axios/lib/adapters/xhr.js
var isXHRAdapterSupported2 = typeof XMLHttpRequest !== "undefined";
var xhr_default = isXHRAdapterSupported2 && function(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    const _config = resolveConfig_default(config);
    let requestData = _config.data;
    const requestHeaders = AxiosHeaders_default.from(_config.headers).normalize();
    let { responseType, onUploadProgress, onDownloadProgress } = _config;
    let onCanceled;
    let uploadThrottled, downloadThrottled;
    let flushUpload, flushDownload;
    function done() {
      flushUpload && flushUpload();
      flushDownload && flushDownload();
      _config.cancelToken && _config.cancelToken.unsubscribe(onCanceled);
      _config.signal && _config.signal.removeEventListener("abort", onCanceled);
    }
    let request = new XMLHttpRequest();
    request.open(_config.method.toUpperCase(), _config.url, true);
    request.timeout = _config.timeout;
    function onloadend() {
      if (!request) {
        return;
      }
      const responseHeaders = AxiosHeaders_default.from(
        "getAllResponseHeaders" in request && request.getAllResponseHeaders()
      );
      const responseData = !responseType || responseType === "text" || responseType === "json" ? request.responseText : request.response;
      const response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      };
      settle2(function _resolve(value) {
        resolve(value);
        done();
      }, function _reject(err) {
        reject(err);
        done();
      }, response);
      request = null;
    }
    if ("onloadend" in request) {
      request.onloadend = onloadend;
    } else {
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        }
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf("file:") === 0)) {
          return;
        }
        setTimeout(onloadend);
      };
    }
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }
      reject(new AxiosError_default("Request aborted", AxiosError_default.ECONNABORTED, config, request));
      request = null;
    };
    request.onerror = function handleError() {
      reject(new AxiosError_default("Network Error", AxiosError_default.ERR_NETWORK, config, request));
      request = null;
    };
    request.ontimeout = function handleTimeout() {
      let timeoutErrorMessage = _config.timeout ? "timeout of " + _config.timeout + "ms exceeded" : "timeout exceeded";
      const transitional3 = _config.transitional || transitional_default;
      if (_config.timeoutErrorMessage) {
        timeoutErrorMessage = _config.timeoutErrorMessage;
      }
      reject(new AxiosError_default(
        timeoutErrorMessage,
        transitional3.clarifyTimeoutError ? AxiosError_default.ETIMEDOUT : AxiosError_default.ECONNABORTED,
        config,
        request
      ));
      request = null;
    };
    requestData === void 0 && requestHeaders.setContentType(null);
    if ("setRequestHeader" in request) {
      utils_default.forEach(requestHeaders.toJSON(), function setRequestHeader(val, key) {
        request.setRequestHeader(key, val);
      });
    }
    if (!utils_default.isUndefined(_config.withCredentials)) {
      request.withCredentials = !!_config.withCredentials;
    }
    if (responseType && responseType !== "json") {
      request.responseType = _config.responseType;
    }
    if (onDownloadProgress) {
      [downloadThrottled, flushDownload] = progressEventReducer2(onDownloadProgress, true);
      request.addEventListener("progress", downloadThrottled);
    }
    if (onUploadProgress && request.upload) {
      [uploadThrottled, flushUpload] = progressEventReducer2(onUploadProgress);
      request.upload.addEventListener("progress", uploadThrottled);
      request.upload.addEventListener("loadend", flushUpload);
    }
    if (_config.cancelToken || _config.signal) {
      onCanceled = (cancel) => {
        if (!request) {
          return;
        }
        reject(!cancel || cancel.type ? new CanceledError_default(null, config, request) : cancel);
        request.abort();
        request = null;
      };
      _config.cancelToken && _config.cancelToken.subscribe(onCanceled);
      if (_config.signal) {
        _config.signal.aborted ? onCanceled() : _config.signal.addEventListener("abort", onCanceled);
      }
    }
    const protocol = parseProtocol2(_config.url);
    if (protocol && platform_default.protocols.indexOf(protocol) === -1) {
      reject(new AxiosError_default("Unsupported protocol " + protocol + ":", AxiosError_default.ERR_BAD_REQUEST, config));
      return;
    }
    request.send(requestData || null);
  });
};

// node_modules/.pnpm/axios@1.9.0/node_modules/axios/lib/adapters/fetch.js
init_esm_shims();

// node_modules/.pnpm/axios@1.9.0/node_modules/axios/lib/helpers/composeSignals.js
init_esm_shims();
var composeSignals2 = (signals, timeout) => {
  const { length } = signals = signals ? signals.filter(Boolean) : [];
  if (timeout || length) {
    let controller = new AbortController();
    let aborted;
    const onabort = function(reason) {
      if (!aborted) {
        aborted = true;
        unsubscribe();
        const err = reason instanceof Error ? reason : this.reason;
        controller.abort(err instanceof AxiosError_default ? err : new CanceledError_default(err instanceof Error ? err.message : err));
      }
    };
    let timer = timeout && setTimeout(() => {
      timer = null;
      onabort(new AxiosError_default(`timeout ${timeout} of ms exceeded`, AxiosError_default.ETIMEDOUT));
    }, timeout);
    const unsubscribe = () => {
      if (signals) {
        timer && clearTimeout(timer);
        timer = null;
        signals.forEach((signal2) => {
          signal2.unsubscribe ? signal2.unsubscribe(onabort) : signal2.removeEventListener("abort", onabort);
        });
        signals = null;
      }
    };
    signals.forEach((signal2) => signal2.addEventListener("abort", onabort));
    const { signal } = controller;
    signal.unsubscribe = () => utils_default.asap(unsubscribe);
    return signal;
  }
};
var composeSignals_default = composeSignals2;

// node_modules/.pnpm/axios@1.9.0/node_modules/axios/lib/helpers/trackStream.js
init_esm_shims();
var streamChunk2 = function* (chunk, chunkSize) {
  let len = chunk.byteLength;
  if (len < chunkSize) {
    yield chunk;
    return;
  }
  let pos = 0;
  let end;
  while (pos < len) {
    end = pos + chunkSize;
    yield chunk.slice(pos, end);
    pos = end;
  }
};
var readBytes2 = async function* (iterable, chunkSize) {
  for await (const chunk of readStream2(iterable)) {
    yield* streamChunk2(chunk, chunkSize);
  }
};
var readStream2 = async function* (stream4) {
  if (stream4[Symbol.asyncIterator]) {
    yield* stream4;
    return;
  }
  const reader = stream4.getReader();
  try {
    for (; ; ) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      yield value;
    }
  } finally {
    await reader.cancel();
  }
};
var trackStream2 = (stream4, chunkSize, onProgress, onFinish) => {
  const iterator2 = readBytes2(stream4, chunkSize);
  let bytes = 0;
  let done;
  let _onFinish = (e) => {
    if (!done) {
      done = true;
      onFinish && onFinish(e);
    }
  };
  return new ReadableStream({
    async pull(controller) {
      try {
        const { done: done2, value } = await iterator2.next();
        if (done2) {
          _onFinish();
          controller.close();
          return;
        }
        let len = value.byteLength;
        if (onProgress) {
          let loadedBytes = bytes += len;
          onProgress(loadedBytes);
        }
        controller.enqueue(new Uint8Array(value));
      } catch (err) {
        _onFinish(err);
        throw err;
      }
    },
    cancel(reason) {
      _onFinish(reason);
      return iterator2.return();
    }
  }, {
    highWaterMark: 2
  });
};

// node_modules/.pnpm/axios@1.9.0/node_modules/axios/lib/adapters/fetch.js
var isFetchSupported2 = typeof fetch === "function" && typeof Request === "function" && typeof Response === "function";
var isReadableStreamSupported2 = isFetchSupported2 && typeof ReadableStream === "function";
var encodeText2 = isFetchSupported2 && (typeof TextEncoder === "function" ? /* @__PURE__ */ ((encoder) => (str) => encoder.encode(str))(new TextEncoder()) : async (str) => new Uint8Array(await new Response(str).arrayBuffer()));
var test2 = (fn, ...args) => {
  try {
    return !!fn(...args);
  } catch (e) {
    return false;
  }
};
var supportsRequestStream2 = isReadableStreamSupported2 && test2(() => {
  let duplexAccessed = false;
  const hasContentType = new Request(platform_default.origin, {
    body: new ReadableStream(),
    method: "POST",
    get duplex() {
      duplexAccessed = true;
      return "half";
    }
  }).headers.has("Content-Type");
  return duplexAccessed && !hasContentType;
});
var DEFAULT_CHUNK_SIZE2 = 64 * 1024;
var supportsResponseStream2 = isReadableStreamSupported2 && test2(() => utils_default.isReadableStream(new Response("").body));
var resolvers2 = {
  stream: supportsResponseStream2 && ((res) => res.body)
};
isFetchSupported2 && ((res) => {
  ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((type) => {
    !resolvers2[type] && (resolvers2[type] = utils_default.isFunction(res[type]) ? (res2) => res2[type]() : (_, config) => {
      throw new AxiosError_default(`Response type '${type}' is not supported`, AxiosError_default.ERR_NOT_SUPPORT, config);
    });
  });
})(new Response());
var getBodyLength2 = async (body) => {
  if (body == null) {
    return 0;
  }
  if (utils_default.isBlob(body)) {
    return body.size;
  }
  if (utils_default.isSpecCompliantForm(body)) {
    const _request = new Request(platform_default.origin, {
      method: "POST",
      body
    });
    return (await _request.arrayBuffer()).byteLength;
  }
  if (utils_default.isArrayBufferView(body) || utils_default.isArrayBuffer(body)) {
    return body.byteLength;
  }
  if (utils_default.isURLSearchParams(body)) {
    body = body + "";
  }
  if (utils_default.isString(body)) {
    return (await encodeText2(body)).byteLength;
  }
};
var resolveBodyLength2 = async (headers2, body) => {
  const length = utils_default.toFiniteNumber(headers2.getContentLength());
  return length == null ? getBodyLength2(body) : length;
};
var fetch_default = isFetchSupported2 && (async (config) => {
  let {
    url: url2,
    method,
    data: data2,
    signal,
    cancelToken,
    timeout,
    onDownloadProgress,
    onUploadProgress,
    responseType,
    headers: headers2,
    withCredentials = "same-origin",
    fetchOptions
  } = resolveConfig_default(config);
  responseType = responseType ? (responseType + "").toLowerCase() : "text";
  let composedSignal = composeSignals_default([signal, cancelToken && cancelToken.toAbortSignal()], timeout);
  let request;
  const unsubscribe = composedSignal && composedSignal.unsubscribe && (() => {
    composedSignal.unsubscribe();
  });
  let requestContentLength;
  try {
    if (onUploadProgress && supportsRequestStream2 && method !== "get" && method !== "head" && (requestContentLength = await resolveBodyLength2(headers2, data2)) !== 0) {
      let _request = new Request(url2, {
        method: "POST",
        body: data2,
        duplex: "half"
      });
      let contentTypeHeader;
      if (utils_default.isFormData(data2) && (contentTypeHeader = _request.headers.get("content-type"))) {
        headers2.setContentType(contentTypeHeader);
      }
      if (_request.body) {
        const [onProgress, flush] = progressEventDecorator2(
          requestContentLength,
          progressEventReducer2(asyncDecorator2(onUploadProgress))
        );
        data2 = trackStream2(_request.body, DEFAULT_CHUNK_SIZE2, onProgress, flush);
      }
    }
    if (!utils_default.isString(withCredentials)) {
      withCredentials = withCredentials ? "include" : "omit";
    }
    const isCredentialsSupported = "credentials" in Request.prototype;
    request = new Request(url2, {
      ...fetchOptions,
      signal: composedSignal,
      method: method.toUpperCase(),
      headers: headers2.normalize().toJSON(),
      body: data2,
      duplex: "half",
      credentials: isCredentialsSupported ? withCredentials : void 0
    });
    let response = await fetch(request);
    const isStreamResponse = supportsResponseStream2 && (responseType === "stream" || responseType === "response");
    if (supportsResponseStream2 && (onDownloadProgress || isStreamResponse && unsubscribe)) {
      const options = {};
      ["status", "statusText", "headers"].forEach((prop) => {
        options[prop] = response[prop];
      });
      const responseContentLength = utils_default.toFiniteNumber(response.headers.get("content-length"));
      const [onProgress, flush] = onDownloadProgress && progressEventDecorator2(
        responseContentLength,
        progressEventReducer2(asyncDecorator2(onDownloadProgress), true)
      ) || [];
      response = new Response(
        trackStream2(response.body, DEFAULT_CHUNK_SIZE2, onProgress, () => {
          flush && flush();
          unsubscribe && unsubscribe();
        }),
        options
      );
    }
    responseType = responseType || "text";
    let responseData = await resolvers2[utils_default.findKey(resolvers2, responseType) || "text"](response, config);
    !isStreamResponse && unsubscribe && unsubscribe();
    return await new Promise((resolve, reject) => {
      settle2(resolve, reject, {
        data: responseData,
        headers: AxiosHeaders_default.from(response.headers),
        status: response.status,
        statusText: response.statusText,
        config,
        request
      });
    });
  } catch (err) {
    unsubscribe && unsubscribe();
    if (err && err.name === "TypeError" && /Load failed|fetch/i.test(err.message)) {
      throw Object.assign(
        new AxiosError_default("Network Error", AxiosError_default.ERR_NETWORK, config, request),
        {
          cause: err.cause || err
        }
      );
    }
    throw AxiosError_default.from(err, err && err.code, config, request);
  }
});

// node_modules/.pnpm/axios@1.9.0/node_modules/axios/lib/adapters/adapters.js
var knownAdapters2 = {
  http: http_default,
  xhr: xhr_default,
  fetch: fetch_default
};
utils_default.forEach(knownAdapters2, (fn, value) => {
  if (fn) {
    try {
      Object.defineProperty(fn, "name", { value });
    } catch (e) {
    }
    Object.defineProperty(fn, "adapterName", { value });
  }
});
var renderReason2 = (reason) => `- ${reason}`;
var isResolvedHandle2 = (adapter) => utils_default.isFunction(adapter) || adapter === null || adapter === false;
var adapters_default = {
  getAdapter: (adapters3) => {
    adapters3 = utils_default.isArray(adapters3) ? adapters3 : [adapters3];
    const { length } = adapters3;
    let nameOrAdapter;
    let adapter;
    const rejectedReasons = {};
    for (let i = 0; i < length; i++) {
      nameOrAdapter = adapters3[i];
      let id;
      adapter = nameOrAdapter;
      if (!isResolvedHandle2(nameOrAdapter)) {
        adapter = knownAdapters2[(id = String(nameOrAdapter)).toLowerCase()];
        if (adapter === void 0) {
          throw new AxiosError_default(`Unknown adapter '${id}'`);
        }
      }
      if (adapter) {
        break;
      }
      rejectedReasons[id || "#" + i] = adapter;
    }
    if (!adapter) {
      const reasons = Object.entries(rejectedReasons).map(
        ([id, state]) => `adapter ${id} ` + (state === false ? "is not supported by the environment" : "is not available in the build")
      );
      let s = length ? reasons.length > 1 ? "since :\n" + reasons.map(renderReason2).join("\n") : " " + renderReason2(reasons[0]) : "as no adapter specified";
      throw new AxiosError_default(
        `There is no suitable adapter to dispatch the request ` + s,
        "ERR_NOT_SUPPORT"
      );
    }
    return adapter;
  },
  adapters: knownAdapters2
};

// node_modules/.pnpm/axios@1.9.0/node_modules/axios/lib/core/dispatchRequest.js
function throwIfCancellationRequested2(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
  if (config.signal && config.signal.aborted) {
    throw new CanceledError_default(null, config);
  }
}
function dispatchRequest2(config) {
  throwIfCancellationRequested2(config);
  config.headers = AxiosHeaders_default.from(config.headers);
  config.data = transformData2.call(
    config,
    config.transformRequest
  );
  if (["post", "put", "patch"].indexOf(config.method) !== -1) {
    config.headers.setContentType("application/x-www-form-urlencoded", false);
  }
  const adapter = adapters_default.getAdapter(config.adapter || defaults_default.adapter);
  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested2(config);
    response.data = transformData2.call(
      config,
      config.transformResponse,
      response
    );
    response.headers = AxiosHeaders_default.from(response.headers);
    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel2(reason)) {
      throwIfCancellationRequested2(config);
      if (reason && reason.response) {
        reason.response.data = transformData2.call(
          config,
          config.transformResponse,
          reason.response
        );
        reason.response.headers = AxiosHeaders_default.from(reason.response.headers);
      }
    }
    return Promise.reject(reason);
  });
}

// node_modules/.pnpm/axios@1.9.0/node_modules/axios/lib/helpers/validator.js
init_esm_shims();
var validators2 = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((type, i) => {
  validators2[type] = function validator2(thing) {
    return typeof thing === type || "a" + (i < 1 ? "n " : " ") + type;
  };
});
var deprecatedWarnings2 = {};
validators2.transitional = function transitional2(validator2, version, message) {
  function formatMessage(opt, desc) {
    return "[Axios v" + VERSION2 + "] Transitional option '" + opt + "'" + desc + (message ? ". " + message : "");
  }
  return (value, opt, opts) => {
    if (validator2 === false) {
      throw new AxiosError_default(
        formatMessage(opt, " has been removed" + (version ? " in " + version : "")),
        AxiosError_default.ERR_DEPRECATED
      );
    }
    if (version && !deprecatedWarnings2[opt]) {
      deprecatedWarnings2[opt] = true;
      console.warn(
        formatMessage(
          opt,
          " has been deprecated since v" + version + " and will be removed in the near future"
        )
      );
    }
    return validator2 ? validator2(value, opt, opts) : true;
  };
};
validators2.spelling = function spelling2(correctSpelling) {
  return (value, opt) => {
    console.warn(`${opt} is likely a misspelling of ${correctSpelling}`);
    return true;
  };
};
function assertOptions2(options, schema, allowUnknown) {
  if (typeof options !== "object") {
    throw new AxiosError_default("options must be an object", AxiosError_default.ERR_BAD_OPTION_VALUE);
  }
  const keys = Object.keys(options);
  let i = keys.length;
  while (i-- > 0) {
    const opt = keys[i];
    const validator2 = schema[opt];
    if (validator2) {
      const value = options[opt];
      const result = value === void 0 || validator2(value, opt, options);
      if (result !== true) {
        throw new AxiosError_default("option " + opt + " must be " + result, AxiosError_default.ERR_BAD_OPTION_VALUE);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw new AxiosError_default("Unknown option " + opt, AxiosError_default.ERR_BAD_OPTION);
    }
  }
}
var validator_default = {
  assertOptions: assertOptions2,
  validators: validators2
};

// node_modules/.pnpm/axios@1.9.0/node_modules/axios/lib/core/Axios.js
var validators3 = validator_default.validators;
var Axios3 = class {
  constructor(instanceConfig) {
    this.defaults = instanceConfig || {};
    this.interceptors = {
      request: new InterceptorManager_default(),
      response: new InterceptorManager_default()
    };
  }
  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  async request(configOrUrl, config) {
    try {
      return await this._request(configOrUrl, config);
    } catch (err) {
      if (err instanceof Error) {
        let dummy = {};
        Error.captureStackTrace ? Error.captureStackTrace(dummy) : dummy = new Error();
        const stack = dummy.stack ? dummy.stack.replace(/^.+\n/, "") : "";
        try {
          if (!err.stack) {
            err.stack = stack;
          } else if (stack && !String(err.stack).endsWith(stack.replace(/^.+\n.+\n/, ""))) {
            err.stack += "\n" + stack;
          }
        } catch (e) {
        }
      }
      throw err;
    }
  }
  _request(configOrUrl, config) {
    if (typeof configOrUrl === "string") {
      config = config || {};
      config.url = configOrUrl;
    } else {
      config = configOrUrl || {};
    }
    config = mergeConfig2(this.defaults, config);
    const { transitional: transitional3, paramsSerializer, headers: headers2 } = config;
    if (transitional3 !== void 0) {
      validator_default.assertOptions(transitional3, {
        silentJSONParsing: validators3.transitional(validators3.boolean),
        forcedJSONParsing: validators3.transitional(validators3.boolean),
        clarifyTimeoutError: validators3.transitional(validators3.boolean)
      }, false);
    }
    if (paramsSerializer != null) {
      if (utils_default.isFunction(paramsSerializer)) {
        config.paramsSerializer = {
          serialize: paramsSerializer
        };
      } else {
        validator_default.assertOptions(paramsSerializer, {
          encode: validators3.function,
          serialize: validators3.function
        }, true);
      }
    }
    if (config.allowAbsoluteUrls !== void 0) ; else if (this.defaults.allowAbsoluteUrls !== void 0) {
      config.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls;
    } else {
      config.allowAbsoluteUrls = true;
    }
    validator_default.assertOptions(config, {
      baseUrl: validators3.spelling("baseURL"),
      withXsrfToken: validators3.spelling("withXSRFToken")
    }, true);
    config.method = (config.method || this.defaults.method || "get").toLowerCase();
    let contextHeaders = headers2 && utils_default.merge(
      headers2.common,
      headers2[config.method]
    );
    headers2 && utils_default.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (method) => {
        delete headers2[method];
      }
    );
    config.headers = AxiosHeaders_default.concat(contextHeaders, headers2);
    const requestInterceptorChain = [];
    let synchronousRequestInterceptors = true;
    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
      if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config) === false) {
        return;
      }
      synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
      requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
    });
    const responseInterceptorChain = [];
    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
      responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
    });
    let promise;
    let i = 0;
    let len;
    if (!synchronousRequestInterceptors) {
      const chain = [dispatchRequest2.bind(this), void 0];
      chain.unshift.apply(chain, requestInterceptorChain);
      chain.push.apply(chain, responseInterceptorChain);
      len = chain.length;
      promise = Promise.resolve(config);
      while (i < len) {
        promise = promise.then(chain[i++], chain[i++]);
      }
      return promise;
    }
    len = requestInterceptorChain.length;
    let newConfig = config;
    i = 0;
    while (i < len) {
      const onFulfilled = requestInterceptorChain[i++];
      const onRejected = requestInterceptorChain[i++];
      try {
        newConfig = onFulfilled(newConfig);
      } catch (error) {
        onRejected.call(this, error);
        break;
      }
    }
    try {
      promise = dispatchRequest2.call(this, newConfig);
    } catch (error) {
      return Promise.reject(error);
    }
    i = 0;
    len = responseInterceptorChain.length;
    while (i < len) {
      promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
    }
    return promise;
  }
  getUri(config) {
    config = mergeConfig2(this.defaults, config);
    const fullPath = buildFullPath2(config.baseURL, config.url, config.allowAbsoluteUrls);
    return buildURL2(fullPath, config.params, config.paramsSerializer);
  }
};
utils_default.forEach(["delete", "get", "head", "options"], function forEachMethodNoData2(method) {
  Axios3.prototype[method] = function(url2, config) {
    return this.request(mergeConfig2(config || {}, {
      method,
      url: url2,
      data: (config || {}).data
    }));
  };
});
utils_default.forEach(["post", "put", "patch"], function forEachMethodWithData2(method) {
  function generateHTTPMethod(isForm) {
    return function httpMethod(url2, data2, config) {
      return this.request(mergeConfig2(config || {}, {
        method,
        headers: isForm ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: url2,
        data: data2
      }));
    };
  }
  Axios3.prototype[method] = generateHTTPMethod();
  Axios3.prototype[method + "Form"] = generateHTTPMethod(true);
});
var Axios_default = Axios3;

// node_modules/.pnpm/axios@1.9.0/node_modules/axios/lib/cancel/CancelToken.js
init_esm_shims();
var CancelToken3 = class _CancelToken {
  constructor(executor) {
    if (typeof executor !== "function") {
      throw new TypeError("executor must be a function.");
    }
    let resolvePromise;
    this.promise = new Promise(function promiseExecutor(resolve) {
      resolvePromise = resolve;
    });
    const token = this;
    this.promise.then((cancel) => {
      if (!token._listeners) return;
      let i = token._listeners.length;
      while (i-- > 0) {
        token._listeners[i](cancel);
      }
      token._listeners = null;
    });
    this.promise.then = (onfulfilled) => {
      let _resolve;
      const promise = new Promise((resolve) => {
        token.subscribe(resolve);
        _resolve = resolve;
      }).then(onfulfilled);
      promise.cancel = function reject() {
        token.unsubscribe(_resolve);
      };
      return promise;
    };
    executor(function cancel(message, config, request) {
      if (token.reason) {
        return;
      }
      token.reason = new CanceledError_default(message, config, request);
      resolvePromise(token.reason);
    });
  }
  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason) {
      throw this.reason;
    }
  }
  /**
   * Subscribe to the cancel signal
   */
  subscribe(listener) {
    if (this.reason) {
      listener(this.reason);
      return;
    }
    if (this._listeners) {
      this._listeners.push(listener);
    } else {
      this._listeners = [listener];
    }
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(listener) {
    if (!this._listeners) {
      return;
    }
    const index = this._listeners.indexOf(listener);
    if (index !== -1) {
      this._listeners.splice(index, 1);
    }
  }
  toAbortSignal() {
    const controller = new AbortController();
    const abort = (err) => {
      controller.abort(err);
    };
    this.subscribe(abort);
    controller.signal.unsubscribe = () => this.unsubscribe(abort);
    return controller.signal;
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let cancel;
    const token = new _CancelToken(function executor(c) {
      cancel = c;
    });
    return {
      token,
      cancel
    };
  }
};
var CancelToken_default = CancelToken3;

// node_modules/.pnpm/axios@1.9.0/node_modules/axios/lib/helpers/spread.js
init_esm_shims();
function spread2(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
}

// node_modules/.pnpm/axios@1.9.0/node_modules/axios/lib/helpers/isAxiosError.js
init_esm_shims();
function isAxiosError2(payload) {
  return utils_default.isObject(payload) && payload.isAxiosError === true;
}

// node_modules/.pnpm/axios@1.9.0/node_modules/axios/lib/helpers/HttpStatusCode.js
init_esm_shims();
var HttpStatusCode2 = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511
};
Object.entries(HttpStatusCode2).forEach(([key, value]) => {
  HttpStatusCode2[value] = key;
});
var HttpStatusCode_default = HttpStatusCode2;

// node_modules/.pnpm/axios@1.9.0/node_modules/axios/lib/axios.js
function createInstance2(defaultConfig) {
  const context = new Axios_default(defaultConfig);
  const instance = bind2(Axios_default.prototype.request, context);
  utils_default.extend(instance, Axios_default.prototype, context, { allOwnKeys: true });
  utils_default.extend(instance, context, null, { allOwnKeys: true });
  instance.create = function create(instanceConfig) {
    return createInstance2(mergeConfig2(defaultConfig, instanceConfig));
  };
  return instance;
}
var axios2 = createInstance2(defaults_default);
axios2.Axios = Axios_default;
axios2.CanceledError = CanceledError_default;
axios2.CancelToken = CancelToken_default;
axios2.isCancel = isCancel2;
axios2.VERSION = VERSION2;
axios2.toFormData = toFormData_default;
axios2.AxiosError = AxiosError_default;
axios2.Cancel = axios2.CanceledError;
axios2.all = function all3(promises) {
  return Promise.all(promises);
};
axios2.spread = spread2;
axios2.isAxiosError = isAxiosError2;
axios2.mergeConfig = mergeConfig2;
axios2.AxiosHeaders = AxiosHeaders_default;
axios2.formToJSON = (thing) => formDataToJSON_default(utils_default.isHTMLForm(thing) ? new FormData(thing) : thing);
axios2.getAdapter = adapters_default.getAdapter;
axios2.HttpStatusCode = HttpStatusCode_default;
axios2.default = axios2;
var axios_default = axios2;

// node_modules/.pnpm/axios@1.9.0/node_modules/axios/index.js
var {
  Axios: Axios4,
  AxiosError: AxiosError3,
  CanceledError: CanceledError3,
  isCancel: isCancel3,
  CancelToken: CancelToken4,
  VERSION: VERSION3,
  all: all4,
  Cancel: Cancel2,
  isAxiosError: isAxiosError3,
  spread: spread3,
  toFormData: toFormData3,
  AxiosHeaders: AxiosHeaders4,
  HttpStatusCode: HttpStatusCode3,
  formToJSON: formToJSON2,
  getAdapter: getAdapter2,
  mergeConfig: mergeConfig3
} = axios_default;
var Networks2 = class {
  url;
  method;
  headers;
  type;
  body;
  axiosInstance;
  timeout;
  filepath;
  maxRetries;
  constructor(data2) {
    this.headers = data2.headers ?? {};
    this.url = data2.url ?? "";
    this.type = data2.type ?? "json";
    this.method = data2.method ?? "GET";
    this.body = data2.body ?? null;
    this.timeout = data2.timeout ?? 15e3;
    this.filepath = data2.filepath ?? "";
    this.maxRetries = 0;
    this.axiosInstance = axios_default.create({
      timeout: this.timeout,
      headers: this.headers,
      maxRedirects: 5,
      validateStatus: (status) => {
        return status >= 200 && status < 300 || status === 406 || status >= 500;
      }
    });
  }
  get config() {
    const config = {
      url: this.url,
      method: this.method,
      headers: this.headers,
      responseType: this.type
    };
    if (this.method === "POST" && this.body) {
      config.data = this.body;
    }
    return config;
  }
  /**
   * 异步下载流方法
   *
   * @param progressCallback 下载进度回调函数，接收已下载字节数和总字节数作为参数
   * @param retryCount 重试次数，默认为0
   * @returns 返回一个Promise，解析为包含文件路径和总字节数的对象
   *
   * 此函数通过axios库发送HTTP请求，下载指定URL的资源，并将下载的资源流保存到本地文件系统中
   * 它还提供了一个回调函数来报告下载进度，并在下载失败时根据配置自动重试
   */
  async downloadStream(progressCallback, retryCount = 0) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);
    try {
      const response = await axios_default({
        ...this.config,
        url: this.url,
        responseType: "stream",
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      if (!(response.status >= 200 && response.status < 300)) {
        throw new Error(`\u65E0\u6CD5\u83B7\u53D6 ${this.url}\u3002\u72B6\u6001: ${response.status} ${response.statusText}`);
      }
      const totalBytes = parseInt(response.headers["content-length"] ?? "0", 10);
      if (isNaN(totalBytes)) {
        throw new Error("\u65E0\u6548\u7684 content-length \u5934");
      }
      let downloadedBytes = 0;
      let lastPrintedPercentage = -1;
      const writer = fs4.createWriteStream(this.filepath);
      const printProgress = () => {
        const progressPercentage = Math.floor(downloadedBytes / totalBytes * 100);
        if (progressPercentage !== lastPrintedPercentage) {
          progressCallback(downloadedBytes, totalBytes);
          lastPrintedPercentage = progressPercentage;
        }
      };
      const interval = totalBytes < 10 * 1024 * 1024 ? 1e3 : 500;
      const intervalId = setInterval(printProgress, interval);
      const onData = (chunk) => {
        downloadedBytes += chunk.length;
      };
      response.data.on("data", onData);
      await pipeline(
        response.data,
        writer
      );
      clearInterval(intervalId);
      response.data.off("data", onData);
      writer.end();
      return { filepath: this.filepath, totalBytes };
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof AxiosError3) {
        logger$1.error(`\u8BF7\u6C42\u5728 ${this.timeout / 1e3} \u79D2\u540E\u8D85\u65F6`);
      } else {
        logger$1.error("\u4E0B\u8F7D\u5931\u8D25:", error);
      }
      if (retryCount < this.maxRetries) {
        const delay = Math.min(Math.pow(2, retryCount) * 1e3, 1e3);
        logger$1.warn(`\u6B63\u5728\u91CD\u8BD5\u4E0B\u8F7D... (${retryCount + 1}/${this.maxRetries})\uFF0C\u5C06\u5728 ${delay / 1e3} \u79D2\u540E\u91CD\u8BD5`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        return this.downloadStream(progressCallback, retryCount + 1);
      } else {
        throw new Error(`\u5728 ${this.maxRetries} \u6B21\u5C1D\u8BD5\u540E\u4E0B\u8F7D\u5931\u8D25: ${error}`);
      }
    }
  }
  async getfetch() {
    try {
      const result = await this.returnResult();
      if (result.status === 504) {
        return result;
      }
      return result;
    } catch (error) {
      logger$1.info(error);
      return false;
    }
  }
  async returnResult() {
    let response = {};
    try {
      response = await this.axiosInstance(this.config);
    } catch (error) {
      logger$1.error(error);
    }
    return response;
  }
  /** 最终地址（跟随重定向） */
  async getLongLink(url2 = "") {
    try {
      const response = await this.axiosInstance.get(this.url || url2);
      return response.request.res.responseUrl;
    } catch (error) {
      const axiosError = error;
      if (axiosError.response && axiosError.response.status === 302) {
        const redirectUrl = axiosError.response.headers.location;
        return this.getLongLink(redirectUrl);
      }
      throw error;
    }
  }
  /** 获取首个302链接 */
  async getLocation() {
    try {
      const response = await this.axiosInstance({
        method: "GET",
        url: this.url,
        maxRedirects: 0,
        // 禁止跟随重定向
        validateStatus: (status) => status >= 300 && status < 400
        // 仅处理3xx响应
      });
      return response.headers.location;
    } catch (error) {
      if (error instanceof AxiosError3) {
        logger$1.error(`\u83B7\u53D6 ${this.url} \u91CD\u5B9A\u5411\u5730\u5740\u5931\u8D25\uFF0C\u63A5\u53E3\u54CD\u5E94\u72B6\u6001\u7801: ${error.response?.status}`);
        throw new Error(error.stack);
      }
    }
  }
  /** 获取数据并处理数据的格式化，默认json */
  async getData() {
    try {
      const result = await this.returnResult();
      if (result.status === 504) {
        return result;
      }
      if (result.status === 429) {
        logger$1.error("HTTP \u54CD\u5E94\u72B6\u6001\u7801: 429");
        throw new Error("ratelimit triggered, \u89E6\u53D1 https://www.douyin.com/ \u7684\u901F\u7387\u9650\u5236\uFF01\uFF01\uFF01");
      }
      return result.data;
    } catch (error) {
      if (error instanceof AxiosError3) {
        throw new Error(error.stack ?? error.message);
      }
      return false;
    }
  }
  /**
   * 获取响应头信息（仅首个字节）
   * 适用于获取视频流的完整大小
   * @returns
   */
  async getHeaders() {
    try {
      const response = await this.axiosInstance({
        ...this.config,
        method: "GET",
        headers: {
          ...this.config.headers,
          Range: "bytes=0-0"
        }
      });
      return response.headers;
    } catch (error) {
      logger$1.error(error);
      throw error;
    }
  }
  /**
   * 获取响应头信息（完整）
   * @returns
   */
  async getHeadersFull() {
    try {
      const response = await this.axiosInstance({
        ...this.config,
        method: "GET"
      });
      return response.headers;
    } catch (error) {
      logger$1.error(error);
      throw error;
    }
  }
};

// src/module/utils/Render.ts
init_esm_shims();

// src/module/index.ts
init_esm_shims();

// src/module/utils/Render.ts
function scale(pct = 1) {
  const scale2 = Math.min(2, Math.max(0.5, Number(Config.app.renderScale) / 100));
  pct = pct * scale2;
  return `style=transform:scale(${pct})`;
}
async function Render(path3, params) {
  const basePaths = {
    douyin: "douyin/html",
    bilibili: "bilibili/html",
    admin: "admin/html",
    kuaishou: "kuaishou/html",
    help: "help/html"
  };
  const platform2 = Object.keys(basePaths).find((key) => path3.startsWith(key));
  let newPath = path3.substring(platform2.length);
  if (newPath.startsWith("/")) {
    newPath = newPath.substring(1);
  }
  path3 = `${basePaths[platform2]}/${newPath}`;
  const renderOpt = {
    pageGotoParams: {
      waitUntil: "load",
      timeout: Config.app.RenderWaitTime * 1e3
    },
    name: `${Version.pluginName}/${platform2}/${newPath}/`.replace(/\\/g, "/"),
    file: `${Version.pluginPath}/resources/template/${path3}.html`,
    type: "jpeg"
  };
  const img = await render.render({
    ...renderOpt,
    multiPage: 12e3,
    encoding: "base64",
    data: {
      ...params,
      _res_path: (join(Version.pluginPath, "/resources") + "/").replace(/\\/g, "/"),
      _layout_path: (join(Version.pluginPath, "/resources", "template", "extend") + "/").replace(/\\/g, "/"),
      defaultLayout: (join(Version.pluginPath, "/resources", "template", "extend", "html") + "/default.html").replace(/\\/g, "/"),
      sys: {
        scale: scale(params?.scale ?? 1)
      },
      pluResPath: `${Version.pluginPath}/resources/`,
      copyright: Config.app.RemoveWatermark ? "" : `<span class="name">kkk</span><span class="version">${Version.pluginVersion} ${releaseType()}</span> Powered By <span class="name">Karin</span>`,
      useDarkTheme: Common.useDarkTheme()
    },
    screensEval: "#container"
  });
  const ret = [];
  for (const imgae of img) {
    ret.push(segment.image("base64://" + imgae));
  }
  return ret;
}
var releaseType = () => {
  const versionPattern = /^\d+\.\d+\.\d+$/;
  if (versionPattern.test(Version.pluginVersion)) {
    return "Stable";
  } else {
    return "Preview";
  }
};

// src/module/utils/Common.ts
var Tools = class {
  /**
   * 插件缓存目录
   */
  tempDri;
  constructor() {
    this.tempDri = {
      /** 插件缓存目录 */
      default: `${karinPathTemp}/${Version.pluginName}/`.replace(/\\/g, "/"),
      /** 视频缓存文件 */
      video: `${karinPathTemp}/${Version.pluginName}/kkkdownload/video/`.replace(/\\/g, "/"),
      /** 图片缓存文件 */
      images: `${karinPathTemp}/${Version.pluginName}/kkkdownload/images/`.replace(/\\/g, "/")
    };
  }
  /**
   * 获取引用消息
   * @param e event 消息事件
   * @returns 被引用的消息
   */
  async getReplyMessage(e) {
    if (e.replyId) {
      const reply = await e.bot.getMsg(e.contact, e.replyId);
      for (const v of reply.elements) {
        if (v.type === "text") {
          return v.text;
        } else if (v.type === "json") {
          return v.data;
        }
      }
    }
    return "";
  }
  /**
  * 将中文数字转换为阿拉伯数字的函数
  * @param chineseNumber 数字的中文
  * @returns 中文数字对应的阿拉伯数字映射
  */
  chineseToArabic(chineseNumber) {
    const chineseToArabicMap = {
      \u96F6: 0,
      \u4E00: 1,
      \u4E8C: 2,
      \u4E09: 3,
      \u56DB: 4,
      \u4E94: 5,
      \u516D: 6,
      \u4E03: 7,
      \u516B: 8,
      \u4E5D: 9
    };
    const units = {
      \u5341: 10,
      \u767E: 100,
      \u5343: 1e3,
      \u4E07: 1e4,
      \u4EBF: 1e8
    };
    let result = 0;
    let temp = 0;
    let unit = 1;
    for (let i = chineseNumber.length - 1; i >= 0; i--) {
      const char = chineseNumber[i];
      if (units[char] !== void 0) {
        unit = units[char];
        if (unit === 1e4 || unit === 1e8) {
          result += temp * unit;
          temp = 0;
        }
      } else {
        const num = chineseToArabicMap[char];
        if (unit > 1) {
          temp += num * unit;
        } else {
          temp += num;
        }
        unit = 1;
      }
    }
    return result + temp;
  }
  /**
  * 格式化cookie字符串
  * @param cookies cookie数组
  * @returns 格式化后的cookie字符串
  */
  formatCookies(cookies2) {
    return cookies2.map((cookie) => {
      const [nameValue] = cookie.split(";").map((part) => part.trim());
      const [name, value] = nameValue.split("=");
      return `${name}=${value}`;
    }).join("; ");
  }
  /**
  * 计算目标视频平均码率（单位：Kbps）
  * @param targetSizeMB 目标视频大小（MB）
  * @param duration 视频时长（秒）
  * @returns
  */
  calculateBitrate(targetSizeMB, duration) {
    const targetSizeBytes = targetSizeMB * 1024 * 1024;
    return targetSizeBytes * 8 / duration / 1024;
  }
  /**
   * 获取视频文件大小（单位MB）
   * @param filePath 视频文件绝对路径
   * @returns
   */
  async getVideoFileSize(filePath) {
    try {
      const stats = await fs4.promises.stat(filePath);
      const fileSizeInBytes = stats.size;
      const fileSizeInMB = fileSizeInBytes / (1024 * 1024);
      return fileSizeInMB;
    } catch (error) {
      console.error("\u83B7\u53D6\u6587\u4EF6\u5927\u5C0F\u65F6\u53D1\u751F\u9519\u8BEF:", error);
      throw error;
    }
  }
  /**
   * 根据配置文件的配置项，删除缓存文件
   * @param path 文件的绝对路径
   * @param force 是否强制删除，默认 `false`
   * @returns
   */
  async removeFile(path3, force = false) {
    path3 = path3.replace(/\\/g, "/");
    if (Config.app.rmmp4) {
      try {
        await fs4.promises.unlink(path3);
        logger$1.mark("\u7F13\u5B58\u6587\u4EF6: ", path3 + " \u5220\u9664\u6210\u529F\uFF01");
        return true;
      } catch (err) {
        logger$1.error("\u7F13\u5B58\u6587\u4EF6: ", path3 + " \u5220\u9664\u5931\u8D25\uFF01", err);
        return false;
      }
    } else if (force) {
      try {
        await fs4.promises.unlink(path3);
        logger$1.mark("\u7F13\u5B58\u6587\u4EF6: ", path3 + " \u5220\u9664\u6210\u529F\uFF01");
        return true;
      } catch (err) {
        logger$1.error("\u7F13\u5B58\u6587\u4EF6: ", path3 + " \u5220\u9664\u5931\u8D25\uFF01", err);
        return false;
      }
    }
    return true;
  }
  /**
  * 将时间戳转换为日期时间字符串
  * @param timestamp 时间戳
  * @returns 格式为YYYY-MM-DD HH:MM的日期时间字符串
  */
  convertTimestampToDateTime(timestamp) {
    const date = new Date(timestamp * 1e3);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }
  /**
  * 获取当前时间：年-月-日 时:分:秒
  * @returns
  */
  getCurrentTime() {
    const now2 = /* @__PURE__ */ new Date();
    const year = now2.getFullYear();
    const month = now2.getMonth() + 1;
    const day = now2.getDate();
    const hour = now2.getHours();
    const minute = now2.getMinutes();
    const second = now2.getSeconds();
    const formattedMonth = month < 10 ? "0" + month : "" + month;
    const formattedDay = day < 10 ? "0" + day : "" + day;
    const formattedHour = hour < 10 ? "0" + hour : "" + hour;
    const formattedMinute = minute < 10 ? "0" + minute : "" + minute;
    const formattedSecond = second < 10 ? "0" + second : "" + second;
    return `${year}-${formattedMonth}-${formattedDay} ${formattedHour}:${formattedMinute}:${formattedSecond}`;
  }
  /**
  * 评论图、推送图是否使用深色模式
  * @returns
  */
  useDarkTheme() {
    let dark = true;
    const configTheme = Config.app.Theme;
    if (configTheme === 0) {
      const date = (/* @__PURE__ */ new Date()).getHours();
      if (date >= 6 && date < 18) {
        dark = false;
      }
    } else if (configTheme === 1) {
      dark = false;
    } else if (configTheme === 2) {
      dark = true;
    }
    return dark;
  }
  /**
  * 传入一个时间戳（单位：毫秒），返回距离当前时间的相对的时间字符串
  * @param timestamp 时间戳
  * @returns 距离这个时间戳过去的多久的字符串
  */
  timeSince(timestamp) {
    const now2 = Date.now();
    const elapsed = now2 - timestamp;
    const seconds = Math.floor(elapsed / 1e3);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const remainingSeconds = seconds % 60;
    const remainingMinutes = minutes % 60;
    if (hours > 0) {
      return `${hours}\u5C0F\u65F6${remainingMinutes}\u5206\u949F${remainingSeconds}\u79D2`;
    } else if (minutes > 0) {
      return `${minutes}\u5206\u949F${remainingSeconds}\u79D2`;
    } else {
      return `${seconds}\u79D2`;
    }
  }
};
var Common = new Tools();
/*! Bundled license information:

mime-db/index.js:
  (*!
   * mime-db
   * Copyright(c) 2014 Jonathan Ong
   * Copyright(c) 2015-2022 Douglas Christopher Wilson
   * MIT Licensed
   *)

mime-types/index.js:
  (*!
   * mime-types
   * Copyright(c) 2014 Jonathan Ong
   * Copyright(c) 2015 Douglas Christopher Wilson
   * MIT Licensed
   *)
*/

export { Base, Common, Config, Networks2 as Networks, Render, Version, bilibiliApiUrls, bilibiliDB, cleanOldDynamicCache, douyinDB, getBilibiliData, getDouyinData, index_default, logMiddleware, logger2 as logger, mergeFile, registerBilibiliRoutes, registerDouyinRoutes, registerKuaishouRoutes, require_follow_redirects, require_src, wbi_sign };
