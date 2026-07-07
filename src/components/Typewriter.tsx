'use client'

import { useEffect, useState } from 'react'

type TypewriterProps = Readonly<{
  text: string
  startDelay?: number
  charDelay?: number
}>

export function Typewriter({ text, startDelay = 600, charDelay = 140 }: TypewriterProps) {
  const chars = Array.from(text)
  // 服务端渲染输出完整文案，保证静态 HTML / 无 JS 环境可读
  const [typed, setTyped] = useState(chars.length)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const total = Array.from(text).length
    let current = 0
    let interval: number | undefined

    setTyped(0)
    const start = window.setTimeout(() => {
      interval = window.setInterval(() => {
        current += 1
        setTyped(current)
        if (current >= total) {
          window.clearInterval(interval)
        }
      }, charDelay)
    }, startDelay)

    return () => {
      window.clearTimeout(start)
      if (interval !== undefined) {
        window.clearInterval(interval)
      }
    }
  }, [text, startDelay, charDelay])

  return (
    <span className="typewriter" aria-label={text}>
      {/* 占位层撑起最终尺寸，避免打字过程中布局抖动 */}
      <span className="typewriter-ghost" aria-hidden="true">
        {text}
      </span>
      <span className="typewriter-live" aria-hidden="true">
        {chars.slice(0, typed).join('')}
        <span className="typewriter-caret" />
      </span>
    </span>
  )
}
