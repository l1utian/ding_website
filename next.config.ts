import type { NextConfig } from 'next'

const SITE_DIST_DIRS = {
  jike: '.next-jike',
  alpha: '.next-alpha',
} as const

const nextConfig: NextConfig = {
  output: 'export',
  distDir: getSiteDistDir(process.env),
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
}

function getSiteDistDir(env: NodeJS.ProcessEnv) {
  const siteKey = env.SITE_KEY

  if (siteKey === 'jike' || siteKey === 'alpha') {
    return SITE_DIST_DIRS[siteKey]
  }

  throw new Error('SITE_KEY must be one of: jike, alpha')
}

export default nextConfig
