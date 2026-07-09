import { generateSync } from '@ikenxuan/qrcode'

/**
 * Generates a QR code image in base64 format for the given text.
 *
 * @param {string} text - The text to encode in the QR code.
 * @param {boolean} [useDarkTheme=false] - Whether to use a dark theme for the QR code.
 * @return {string} The base64-encoded QR code image.
 */
export const generateQRCode = (text: string, useDarkTheme: boolean = false) => {
  const base64 = generateSync(
    {
      data: text,
      size: 1000,
      dotsOptions: {
        dotType: 'extra-rounded',
        color: useDarkTheme ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.8)'
      },
      cornersSquareOptions: {
        cornerType: 'dot',
        color: useDarkTheme ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.8)'
      },
      cornersDotOptions: {
        cornerType: 'dot',
        color: useDarkTheme ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.8)'
      },
      backgroundOptions: {
        transparent: true
      }
    },
    'webp',
    'base64'
  )

  return `data:image/webp;base64,${base64}`
}
