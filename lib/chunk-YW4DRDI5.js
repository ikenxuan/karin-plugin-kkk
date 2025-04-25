import { createRequire } from 'module';
import { __commonJS, init_esm_shims, __require, __toESM } from './chunk-U2PMGOCW.js';
import crypto from 'crypto';
import express from 'express';
import require$$1$2 from 'fs';
import require$$0 from 'util';
import require$$1$1 from 'os';
import require$$1 from 'path';
import require$$4 from 'url';
import require$$0$1 from 'constants';
import require$$0$2 from 'stream';
import require$$5 from 'assert';
import require$$2 from 'zlib';
import require$$1$3 from 'net';
import fs4 from 'node:fs';
import path, { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { karinPathBase, karinPathRoot, karinPathTemp } from 'node-karin/root';
import karin, { logger as logger$1, karinPathBase as karinPathBase$1, copyConfigSync, filesByExt, watch, requireFileSync as requireFileSync$1, segment, ffmpeg, ffprobe, render } from 'node-karin';
import YAML from 'node-karin/yaml';
import { Sequelize, DataTypes, Op } from 'sequelize';
import axios2, { AxiosError as AxiosError$3 } from 'node-karin/axios';
import { pipeline } from 'stream/promises';

createRequire(import.meta.url);

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
    function getSupportLevel(stream) {
      const level = supportsColor(stream, stream && stream.isTTY);
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
    var { isArray: isArray2 } = Array;
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
        if (isArray2(arguments_[0]) && isArray2(arguments_[0].raw)) {
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
      if (!isArray2(firstString) || !isArray2(firstString.raw)) {
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
  const prototype2 = getPrototypeOf(val);
  return (prototype2 === null || prototype2 === Object.prototype || Object.getPrototypeOf(prototype2) === null) && !(Symbol.toStringTag in val) && !(Symbol.iterator in val);
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
var inherits = (constructor, superConstructor, props, descriptors2) => {
  constructor.prototype = Object.create(superConstructor.prototype, descriptors2);
  constructor.prototype.constructor = constructor;
  Object.defineProperty(constructor, "super", {
    value: superConstructor.prototype
  });
  props && Object.assign(constructor.prototype, props);
};
var toFlatObject = (sourceObj, destObj, filter2, propFilter) => {
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
    sourceObj = filter2 !== false && getPrototypeOf(sourceObj);
  } while (sourceObj && (!filter2 || filter2(sourceObj, destObj)) && sourceObj !== Object.prototype);
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
  const iterator = generator.call(obj);
  let result;
  while ((result = iterator.next()) && !result.done) {
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
var hasOwnProperty = (({ hasOwnProperty: hasOwnProperty2 }) => (obj, prop) => hasOwnProperty2.call(obj, prop))(Object.prototype);
var isRegExp = kindOfTest("RegExp");
var reduceDescriptors = (obj, reducer) => {
  const descriptors2 = Object.getOwnPropertyDescriptors(obj);
  const reducedDescriptors = {};
  forEach(descriptors2, (descriptor, name) => {
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
  utils$1.toFlatObject(error, axiosError, function filter2(obj) {
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
function buildURL(url, params, options) {
  if (!params) {
    return url;
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
    const hashmarkIndex = url.indexOf("#");
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }
    url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
  }
  return url;
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
    const isFormData2 = utils$1.isFormData(data2);
    if (isFormData2) {
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
    let isFileList2;
    if (isObjectPayload) {
      if (contentType.indexOf("application/x-www-form-urlencoded") > -1) {
        return toURLEncodedForm(data2, this.formSerializer).toString();
      }
      if ((isFileList2 = utils$1.isFileList(data2)) || contentType.indexOf("multipart/form-data") > -1) {
        const _FormData = this.env && this.env.FormData;
        return toFormData$2(
          isFileList2 ? { "files[]": data2 } : data2,
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
    const transitional2 = this.transitional || defaults.transitional;
    const forcedJSONParsing = transitional2 && transitional2.forcedJSONParsing;
    const JSONRequested = this.responseType === "json";
    if (utils$1.isResponse(data2) || utils$1.isReadableStream(data2)) {
      return data2;
    }
    if (data2 && utils$1.isString(data2) && (forcedJSONParsing && !this.responseType || JSONRequested)) {
      const silentJSONParsing = transitional2 && transitional2.silentJSONParsing;
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
function matchHeaderValue(context, value, header, filter2, isHeaderNameFilter) {
  if (utils$1.isFunction(filter2)) {
    return filter2.call(this, value, header);
  }
  if (isHeaderNameFilter) {
    value = header;
  }
  if (!utils$1.isString(value)) return;
  if (utils$1.isString(filter2)) {
    return value.indexOf(filter2) !== -1;
  }
  if (utils$1.isRegExp(filter2)) {
    return filter2.test(value);
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
    const prototype2 = this.prototype;
    function defineAccessor(_header) {
      const lHeader = normalizeHeader(_header);
      if (!accessors[lHeader]) {
        buildAccessors(prototype2, _header);
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
  const validateStatus2 = response.config.validateStatus;
  if (!response.status || !validateStatus2 || validateStatus2(response.status)) {
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
function parseProtocol(url) {
  const match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
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
var isURLSameOrigin = platform.hasStandardBrowserEnv ? /* @__PURE__ */ ((origin2, isMSIE) => (url) => {
  url = new URL(url, platform.origin);
  return origin2.protocol === url.protocol && origin2.host === url.host && (isMSIE || origin2.port === url.port);
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
function isAbsoluteURL(url) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
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
    const merge2 = mergeMap[prop] || mergeDeepProperties;
    const configValue = merge2(config1[prop], config2[prop], prop);
    utils$1.isUndefined(configValue) && merge2 !== mergeDirectKeys || (config[prop] = configValue);
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
      const transitional2 = _config.transitional || transitionalDefaults;
      if (_config.timeoutErrorMessage) {
        timeoutErrorMessage = _config.timeoutErrorMessage;
      }
      reject(new AxiosError$2(
        timeoutErrorMessage,
        transitional2.clarifyTimeoutError ? AxiosError$2.ETIMEDOUT : AxiosError$2.ECONNABORTED,
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
var readStream = async function* (stream) {
  if (stream[Symbol.asyncIterator]) {
    yield* stream;
    return;
  }
  const reader = stream.getReader();
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
var trackStream = (stream, chunkSize, onProgress, onFinish) => {
  const iterator = readBytes(stream, chunkSize);
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
        const { done: done2, value } = await iterator.next();
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
      return iterator.return();
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
    url,
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
      let _request = new Request(url, {
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
    request = new Request(url, {
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
    const { transitional: transitional2, paramsSerializer, headers: headers2 } = config;
    if (transitional2 !== void 0) {
      validator.assertOptions(transitional2, {
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
  Axios$2.prototype[method] = function(url, config) {
    return this.request(mergeConfig$2(config || {}, {
      method,
      url,
      data: (config || {}).data
    }));
  };
});
utils$1.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
  function generateHTTPMethod(isForm) {
    return function httpMethod(url, data2, config) {
      return this.request(mergeConfig$2(config || {}, {
        method,
        headers: isForm ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url,
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
      debug.extend = extend2;
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
    function extend2(namespace, delimiter) {
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
  const util = require$$0;
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
    tests.forEach((test2) => {
      if (test2) {
        throw new Error(
          `Problem with log4js configuration: (${util.inspect(config, {
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
  const util = require$$0;
  const path3 = require$$1;
  const url = require$$4;
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
      util.format(
        "[%s] [%s] %s - ",
        dateFormat.asString(loggingEvent.startTime),
        loggingEvent.level.toString(),
        loggingEvent.categoryName
      ),
      colour
    );
  }
  function basicLayout(loggingEvent) {
    return timestampLevelAndCategory(loggingEvent) + util.format(...loggingEvent.data);
  }
  function colouredLayout(loggingEvent) {
    return timestampLevelAndCategory(loggingEvent, loggingEvent.level.colour) + util.format(...loggingEvent.data);
  }
  function messagePassThroughLayout(loggingEvent) {
    return util.format(...loggingEvent.data);
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
      return util.format(...dataSlice);
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
          if (typeof url.fileURLToPath === "function") {
            filepath = url.fileURLToPath(filepath);
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
  const noop2 = (_, value) => value;
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
    const $ = reviver || noop2;
    const tmp = typeof value === object && value ? revive(input, /* @__PURE__ */ new Set(), value, $) : value;
    return $.call({ "": tmp }, "", tmp);
  };
  cjs.parse = parse;
  const stringify = (value, replacer, space) => {
    const $ = replacer && typeof replacer === object ? (k, v) => k === "" || -1 < replacer.indexOf(k) ? v : void 0 : replacer || noop2;
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
  const toJSON2 = (value) => $parse(stringify(value));
  cjs.toJSON = toJSON2;
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
  var Stream = require$$0$2.Stream;
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
  var getPrototypeOf2 = Object.getPrototypeOf || function(obj) {
    return obj.__proto__;
  };
  function clone(obj) {
    if (obj === null || typeof obj !== "object")
      return obj;
    if (obj instanceof Object)
      var copy2 = { __proto__: getPrototypeOf2(obj) };
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
  var util = require$$0;
  var gracefulQueue;
  var previousSymbol;
  if (typeof Symbol === "function" && typeof Symbol.for === "function") {
    gracefulQueue = Symbol.for("graceful-fs.queue");
    previousSymbol = Symbol.for("graceful-fs.previous");
  } else {
    gracefulQueue = "___graceful-fs.queue";
    previousSymbol = "___graceful-fs.previous";
  }
  function noop2() {
  }
  function publishQueue(context, queue2) {
    Object.defineProperty(context, gracefulQueue, {
      get: function() {
        return queue2;
      }
    });
  }
  var debug = noop2;
  if (util.debuglog)
    debug = util.debuglog("gfs4");
  else if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || ""))
    debug = function() {
      var m = util.format.apply(util, arguments);
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
  function defaults2(options) {
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
    defaults2(options);
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
    defaults2(options);
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
  const zlib = require$$2;
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
            const readStream2 = fs22.createReadStream(sourceFilePath).on("open", () => {
              readStream2.pipe(zlib.createGzip()).pipe(writeStream);
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
  const { Writable } = require$$0$2;
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
      const stream = new streams.RollingFileStream(
        filePath,
        fileSize,
        numFiles,
        opt
      );
      stream.on("error", (err) => {
        console.error(
          "log4js.fileAppender - Writing to file %s, error happened ",
          filePath,
          err
        );
      });
      stream.on("drain", () => {
        process.emit("log4js:pause", false);
      });
      return stream;
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
    const stream = new streams.DateRollingFileStream(filename, pattern, options);
    stream.on("error", (err) => {
      console.error(
        "log4js.dateFileAppender - Writing to file %s, error happened ",
        filename,
        err
      );
    });
    stream.on("drain", () => {
      process.emit("log4js:pause", false);
    });
    return stream;
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
      let stream;
      if (fileSize) {
        stream = new RollingFileSync(filePath, fileSize, numFiles, options);
      } else {
        stream = ((f) => {
          touchFile(f, options);
          return {
            write(data2) {
              fs22.appendFileSync(f, data2);
            }
          };
        })(filePath);
      }
      return stream;
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
  const url = new URL(BASEURL);
  const params = {};
  for (const [key, value] of url.searchParams.entries()) {
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
          const url = bilibiliAPI.\u8BC4\u8BBA\u533A\u660E\u7EC6({
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
            url,
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
var a_bogus_default = (url, user_agent) => {
  let result_str = generate_random_str() + generate_rc4_bb_str(new URLSearchParams(new URL(url).search).toString(), user_agent, "1536|747|1536|834|0|30|0|0|1536|834|1536|864|1525|747|24|24|Win32");
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
  static AB(url) {
    return a_bogus_default(url, headers["User-Agent"]);
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
      const url = douyinAPI.\u89C6\u9891\u6216\u56FE\u96C6({ aweme_id: data2.aweme_id });
      const VideoData = await GlobalGetData2({
        url: `${url}&a_bogus=${douyinSign.AB(url)}`,
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
      const url = douyinAPI.\u7528\u6237\u4E3B\u9875\u4FE1\u606F({ sec_uid: data2.sec_uid });
      const UserInfoData = await GlobalGetData2({
        url: `${url}&a_bogus=${douyinSign.AB(url)}`,
        headers: {
          ...headers2,
          Referer: `https://www.douyin.com/user/${data2.sec_uid}`
        },
        ...data2
      });
      return UserInfoData;
    }
    case "Emoji\u6570\u636E": {
      const url = douyinAPI.\u8868\u60C5();
      const EmojiData = await GlobalGetData2({
        url,
        headers: headers2,
        ...data2
      });
      return EmojiData;
    }
    case "\u7528\u6237\u4E3B\u9875\u89C6\u9891\u5217\u8868\u6570\u636E": {
      DouyinValidateData(data2, ["sec_uid"]);
      const url = douyinAPI.\u7528\u6237\u4E3B\u9875\u89C6\u9891({ sec_uid: data2.sec_uid });
      const UserVideoListData = await GlobalGetData2({
        url: `${url}&a_bogus=${douyinSign.AB(url)}`,
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
      const url = douyinAPI.\u70ED\u70B9\u8BCD({ query: data2.query, number: data2.number ?? 10 });
      const SuggestWordsData = await GlobalGetData2({
        url: `${url}&a_bogus=${douyinSign.AB(url)}`,
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
        const url = douyinAPI.\u641C\u7D22({
          query: data2.query,
          number: requestCount,
          search_id: search_id === "" ? void 0 : search_id
        });
        const response = await GlobalGetData2({
          url: `${url}&a_bogus=${douyinSign.AB(url)}`,
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
      const url = douyinAPI.\u4E92\u52A8\u8868\u60C5();
      const ExpressionPlusData = await GlobalGetData2({
        url: `${url}&a_bogus=${douyinSign.AB(url)}`,
        headers: headers2,
        ...data2
      });
      return ExpressionPlusData;
    }
    case "\u97F3\u4E50\u6570\u636E": {
      DouyinValidateData(data2, ["music_id"]);
      const url = douyinAPI.\u80CC\u666F\u97F3\u4E50({ music_id: data2.music_id });
      const MusicData = await GlobalGetData2({
        url: `${url}&a_bogus=${douyinSign.AB(url)}`,
        headers: headers2,
        ...data2
      });
      return MusicData;
    }
    case "\u76F4\u64AD\u95F4\u4FE1\u606F\u6570\u636E": {
      DouyinValidateData(data2, ["sec_uid"]);
      let url = douyinAPI.\u7528\u6237\u4E3B\u9875\u4FE1\u606F({ sec_uid: data2.sec_uid });
      const UserInfoData = await GlobalGetData2({
        url: `${url}&a_bogus=${douyinSign.AB(url)}`,
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
      url = douyinAPI.\u76F4\u64AD\u95F4\u4FE1\u606F({ room_id: UserInfoData.user.room_id_str, web_rid: room_data.owner.web_rid });
      const LiveRoomData = await GlobalGetData2({
        url: `${url}&a_bogus=${douyinSign.AB(url)}`,
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
      const url = douyinAPI.\u7533\u8BF7\u4E8C\u7EF4\u7801({ verify_fp: data2.verify_fp });
      const LoginQrcodeStatusData = await GlobalGetData2({
        url: `${url}&a_bogus=${douyinSign.AB(url)}`,
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
    const url = apiUrlGenerator({
      ...params,
      number: requestCount,
      cursor
    });
    const response = await GlobalGetData2({
      url: `${url}&a_bogus=${douyinSign.AB(url)}`,
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
      const url = req.url;
      const method = req.method;
      const clientIP = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
      res.on("finish", () => {
        const responseTime = Date.now() - startTime;
        const statusCode = res.statusCode;
        logger2.info(`[${method}] ${url} (Status: ${statusCode}, Time: ${responseTime}ms, Client: ${clientIP})`);
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
          const status = await this.e.bot.uploadFile(this.e.contact, File, file2.originTitle ? `${file2.originTitle.replace(" - ", "_")}.mp4` : `${File.split("/").pop()}`);
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
      title: Config.app.rmmp4 ? downloadOpt.title.timestampTitle : downloadOpt.title.originTitle,
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
    this.axiosInstance = axios2.create({
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
      const response = await axios2({
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
      if (error instanceof AxiosError$3) {
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
  async getLongLink(url = "") {
    try {
      const response = await this.axiosInstance.get(this.url || url);
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
      if (error instanceof AxiosError$3) {
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
      if (error instanceof AxiosError$3) {
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

export { Base, Common, Config, Networks2 as Networks, Render, Version, bilibiliApiUrls, bilibiliDB, cleanOldDynamicCache, douyinDB, getBilibiliData, getDouyinData, index_default, logMiddleware, logger2 as logger, mergeFile, registerBilibiliRoutes, registerDouyinRoutes, registerKuaishouRoutes, wbi_sign };
