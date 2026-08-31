/**
 * Copyright AngelToms
 * SPDX-License-Identifier: Apache-2.0
 *
 * 由 ylcangel/douyin_sign 的 SM3 实现移植为 TypeScript。
 */
function t(index: number): number {
  return index < 16 ? 0x79cc4519 : 0x7a879d8a
}

function ff(index: number, x: number, y: number, z: number): number {
  return index < 16 ? (x ^ y ^ z) >>> 0 : ((x & y) | (x & z) | (y & z)) >>> 0
}

function gg(index: number, x: number, y: number, z: number): number {
  return index < 16 ? (x ^ y ^ z) >>> 0 : ((x & y) | (~x & z)) >>> 0
}

class SM3 {
  private readonly register = new Array<number>(8)
  private chunk: number[] = []
  private size = 0

  constructor() {
    this.reset()
  }

  private reset(): void {
    this.register[0] = 0x7380166f
    this.register[1] = 0x4914b2b9
    this.register[2] = 0x172442d7
    this.register[3] = 0xda8a0600
    this.register[4] = 0xa96f30bc
    this.register[5] = 0x163138aa
    this.register[6] = 0xe38dee4d
    this.register[7] = 0xb0fb0e4e
    this.chunk = []
    this.size = 0
  }

  private stringToBytes(value: string): number[] {
    const result: number[] = []
    for (let index = 0; index < value.length; index++) {
      let character = value.charCodeAt(index)
      const bytes: number[] = []
      do {
        bytes.push(character & 0xff)
        character >>= 8
      } while (character)
      result.push(...bytes.reverse())
    }
    return result
  }

  private write(message: string | number[]): void {
    const input = typeof message === 'string' ? this.stringToBytes(message) : message
    this.size += input.length
    let offset = 64 - this.chunk.length

    if (input.length < offset) {
      this.chunk = this.chunk.concat(input)
      return
    }

    this.chunk = this.chunk.concat(input.slice(0, offset))
    while (this.chunk.length >= 64) {
      this.compress(this.chunk)
      this.chunk = offset < input.length ? input.slice(offset, Math.min(offset + 64, input.length)) : []
      offset += 64
    }
  }

  sum(message: string | number[]): number[] {
    this.reset()
    this.write(message)
    this.fill()

    for (let offset = 0; offset < this.chunk.length; offset += 64) {
      this.compress(this.chunk.slice(offset, offset + 64))
    }

    const digest = new Array<number>(32)
    for (let index = 0; index < 8; index++) {
      let hash = this.register[index]
      digest[index * 4 + 3] = hash & 0xff
      hash >>>= 8
      digest[index * 4 + 2] = hash & 0xff
      hash >>>= 8
      digest[index * 4 + 1] = hash & 0xff
      hash >>>= 8
      digest[index * 4] = hash & 0xff
    }

    this.reset()
    return digest
  }

  private rotateLeft(value: number, offset: number): number {
    const normalized = offset % 32
    return ((value << normalized) | (value >>> (32 - normalized))) >>> 0
  }

  private compress(message: number[]): void {
    const expanded = this.expand(message)
    const register = this.register.slice()

    for (let index = 0; index < 64; index++) {
      let ss1 = this.rotateLeft(register[0], 12) + register[4] + this.rotateLeft(t(index), index)
      ss1 = (ss1 & 0xffffffff) >>> 0
      ss1 = this.rotateLeft(ss1, 7)
      const ss2 = (ss1 ^ this.rotateLeft(register[0], 12)) >>> 0
      let tt1 = ff(index, register[0], register[1], register[2]) + register[3] + ss2 + expanded[index + 68]
      tt1 = (tt1 & 0xffffffff) >>> 0
      let tt2 = gg(index, register[4], register[5], register[6]) + register[7] + ss1 + expanded[index]
      tt2 = (tt2 & 0xffffffff) >>> 0

      register[3] = register[2]
      register[2] = this.rotateLeft(register[1], 9)
      register[1] = register[0]
      register[0] = tt1
      register[7] = register[6]
      register[6] = this.rotateLeft(register[5], 19)
      register[5] = register[4]
      register[4] = (tt2 ^ this.rotateLeft(tt2, 9) ^ this.rotateLeft(tt2, 17)) >>> 0
    }

    for (let index = 0; index < 8; index++) {
      this.register[index] = (this.register[index] ^ register[index]) >>> 0
    }
  }

  private fill(): void {
    const bitLength = this.size * 8
    let length = this.chunk.push(0x80) % 64
    if (64 - length < 8) length -= 64
    for (; length < 56; length++) this.chunk.push(0)

    const high = Math.floor(bitLength / 0x100000000)
    for (let index = 0; index < 4; index++) this.chunk.push((high >>> ((3 - index) * 8)) & 0xff)
    for (let index = 0; index < 4; index++) this.chunk.push((bitLength >>> ((3 - index) * 8)) & 0xff)
  }

  private expand(bytes: number[]): number[] {
    const words = new Array<number>(132)
    for (let index = 0; index < 16; index++) {
      words[index] =
        ((bytes[index * 4] << 24) |
          (bytes[index * 4 + 1] << 16) |
          (bytes[index * 4 + 2] << 8) |
          bytes[index * 4 + 3]) >>>
        0
    }

    for (let index = 16; index < 68; index++) {
      let value = words[index - 16] ^ words[index - 9] ^ this.rotateLeft(words[index - 3], 15)
      value ^= this.rotateLeft(value, 15) ^ this.rotateLeft(value, 23)
      words[index] = (value ^ this.rotateLeft(words[index - 13], 7) ^ words[index - 6]) >>> 0
    }

    for (let index = 0; index < 64; index++) words[index + 68] = (words[index] ^ words[index + 4]) >>> 0
    return words
  }
}

export function sm3Digest(message: string | number[]): number[] {
  return new SM3().sum(message)
}

export function sm3DigestTwice(message: string | number[]): number[] {
  return new SM3().sum(new SM3().sum(message))
}
