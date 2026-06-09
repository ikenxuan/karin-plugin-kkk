import type { PushlistDevice } from './types'

export const getPushlistGridClass = (device: PushlistDevice) => (
  device === 'desktop' ? 'grid grid-cols-2 gap-4' : 'flex flex-col gap-4'
)

