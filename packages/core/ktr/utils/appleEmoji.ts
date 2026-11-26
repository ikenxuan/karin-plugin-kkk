import { APPLE_EMOJI_64_FILES } from '../../../richtext/src/parse/emojiAssets.generated'

export const APPLE_EMOJI_ASSET_PATH = '/__kkk/apple-emoji'
export const APPLE_EMOJI_MARKER = 'kkk-apple-emoji'

export const getAppleEmojiAssetUrl = (filename: string): string => `${APPLE_EMOJI_ASSET_PATH}/${filename}.png`

export const isAppleEmojiFilename = (filename: string): boolean =>
  /^[0-9a-f]+(?:-[0-9a-f]+)*$/.test(filename) && APPLE_EMOJI_64_FILES.has(filename)
