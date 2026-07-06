import Image from 'next/image'

import type { CompanySite } from '@/data/types'

type FactoryGalleryProps = Readonly<{
  site: CompanySite
}>

export function FactoryGallery({ site }: FactoryGalleryProps) {
  return (
    <div className="gallery-grid">
      {site.factoryImages.map((image, index) => (
        <figure className="gallery-item" key={image}>
          <Image
            className="gallery-image"
            src={image}
            alt={`${site.shortName}工厂照片 ${index + 1}`}
            fill
            sizes="(max-width: 860px) 100vw, 33vw"
          />
        </figure>
      ))}
    </div>
  )
}
