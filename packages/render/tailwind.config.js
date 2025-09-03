const {heroui} = require('@heroui/theme');
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/components/chip.js"
  ],
  theme: {
    extend: {
      colors: {
        // default主题色 - 支持黑白占比控制
        default: {
          // 纯黑到纯白的渐变色阶
          '0': '#000000',
          '5': '#0d0d0d',
          '10': '#1a1a1a',
          '15': '#262626',
          '20': '#333333',
          '25': '#404040',
          '30': '#4d4d4d',
          '35': '#595959',
          '40': '#666666',
          '45': '#737373',
          '50': '#808080',
          '55': '#8c8c8c',
          '60': '#999999',
          '65': '#a6a6a6',
          '70': '#b3b3b3',
          '75': '#bfbfbf',
          '80': '#cccccc',
          '85': '#d9d9d9',
          '90': '#e6e6e6',
          '95': '#f2f2f2',
          '100': '#ffffff',
          
          'black': '#000000',
          'dark': '#333333',
          'gray': '#808080',
          'light': '#cccccc',
          'white': '#ffffff',
        }
      }
    },
  },
  plugins: [heroui()],
}