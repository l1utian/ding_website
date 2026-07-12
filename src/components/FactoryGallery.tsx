'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import type { CompanySite } from '@/data/types'

type FactoryGalleryProps = Readonly<{
  site: CompanySite
}>

const AUTOPLAY_MS = 5000

export function FactoryGallery({ site }: FactoryGalleryProps) {
  const images = site.factoryImages
  const total = images.length
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  const goTo = (index: number) => {
    setActive(((index % total) + total) % total)
  }

  useEffect(() => {
    if (paused || images.length <= 1) return
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % images.length)
    }, AUTOPLAY_MS)
    return () => clearInterval(timer)
  }, [images.length, paused])

  return (
    <div
      className="gallery"
      aria-roledescription="轮播图"
      aria-label={`${site.shortName}生产基地照片`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="gallery-stage">
        {images.map((image, index) => (
          <figure
            className={`gallery-slide gallery-slide-${image.fit}${index === active ? ' active' : ''}`}
            key={image.src}
            aria-hidden={index !== active}
          >
            {image.fit === 'contain' ? (
              <Image
                aria-hidden="true"
                alt=""
                className="gallery-image-backdrop"
                src={image.src}
                fill
                sizes="(max-width: 860px) 100vw, 1400px"
              />
            ) : null}
            <Image
              className="gallery-image"
              src={image.src}
              alt={`${site.shortName}工厂照片 ${index + 1}`}
              fill
              sizes="(max-width: 860px) 100vw, 1400px"
              priority={index === 0}
            />
          </figure>
        ))}
        <span className="gallery-counter" aria-hidden="true">
          {String(active + 1).padStart(2, '0')}
          <em>/ {String(total).padStart(2, '0')}</em>
        </span>
        {total > 1 ? (
          <>
            <button type="button" className="gallery-arrow prev" onClick={() => goTo(active - 1)} aria-label="上一张照片">
              <ChevronLeft aria-hidden="true" size={22} />
            </button>
            <button type="button" className="gallery-arrow next" onClick={() => goTo(active + 1)} aria-label="下一张照片">
              <ChevronRight aria-hidden="true" size={22} />
            </button>
          </>
        ) : null}
      </div>
      {total > 1 ? (
        <div className="gallery-thumbs" role="tablist" aria-label="选择照片">
          {images.map((image, index) => (
            <button
              type="button"
              key={image.src}
              role="tab"
              aria-selected={index === active}
              aria-label={`查看第 ${index + 1} 张照片`}
              className={`gallery-thumb gallery-thumb-${image.fit}${index === active ? ' active' : ''}`}
              onClick={() => goTo(index)}
            >
              <Image src={image.src} alt="" fill sizes="160px" loading="lazy" />
              {index === active && !paused ? <span className="gallery-thumb-progress" key={active} /> : null}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}
