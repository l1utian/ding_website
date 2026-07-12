import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import { alphaSite } from '@/data/alpha'

import { FactoryGallery } from './FactoryGallery'

describe('FactoryGallery', () => {
  it('renders portrait factory images without cropping', () => {
    const markup = renderToStaticMarkup(<FactoryGallery site={alphaSite} />)

    expect(markup.match(/gallery-slide-contain/g)).toHaveLength(2)
    expect(markup.match(/gallery-image-backdrop/g)).toHaveLength(2)
    expect(markup.match(/gallery-thumb-contain/g)).toHaveLength(2)
  })
})
