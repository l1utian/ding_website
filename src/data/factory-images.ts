import type { FactoryImage, NonEmptyReadonlyArray } from './types'

export const sharedFactoryImages = [
  { src: '/assets/shared/factory/1.png', fit: 'cover' },
  { src: '/assets/shared/factory/11.png', fit: 'cover' },
  { src: '/assets/shared/factory/12.png', fit: 'contain' },
  { src: '/assets/shared/factory/13.png', fit: 'contain' },
  { src: '/assets/shared/factory/14.jpg', fit: 'cover' },
] as const satisfies NonEmptyReadonlyArray<FactoryImage>
