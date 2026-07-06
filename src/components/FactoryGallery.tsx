'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'

import type { CompanySite } from '@/data/types'

type FactoryGalleryProps = Readonly<{
  site: CompanySite
}>

export function FactoryGallery({ site }: FactoryGalleryProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const total = site.factoryImages.length

  const scrollTo = useCallback(
    (index: number) => {
      const track = trackRef.current
      if (!track) return
      const slide = track.children[index] as HTMLElement | undefined
      if (slide) {
        track.scrollTo({ left: slide.offsetLeft, behavior: 'smooth' })
      }
    },
    [],
  )

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const handleScroll = () => {
      const scrollLeft = track.scrollLeft
      const slideWidth = track.offsetWidth
      const index = Math.round(scrollLeft / slideWidth)
      setActiveIndex(Math.min(index, total - 1))
    }

    track.addEventListener('scroll', handleScroll, { passive: true })
    return () => track.removeEventListener('scroll', handleScroll)
  }, [total])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % total
        scrollTo(next)
        return next
      })
    }, 4000)
    return () => clearInterval(interval)
  }, [total, scrollTo])

  return (
    <div className="gallery-carousel">
      <div className="gallery-track" ref={trackRef}>
        {site.factoryImages.map((image, index) => (
          <figure className="gallery-slide" key={image}>
            <Image
              className="gallery-image"
              src={image}
              alt={`${site.shortName}工厂照片 ${index + 1}`}
              fill
              sizes="(max-width: 860px) 90vw, 60vw"
              loading={index === 0 ? 'eager' : 'lazy'}
            />
          </figure>
        ))}
      </div>
      <div className="gallery-dots">
        {site.factoryImages.map((image, index) => (
          <button
            key={image}
            className={`gallery-dot${index === activeIndex ? ' active' : ''}`}
            onClick={() => scrollTo(index)}
            aria-label={`查看第 ${index + 1} 张照片`}
          />
        ))}
      </div>
    </div>
  )
}
