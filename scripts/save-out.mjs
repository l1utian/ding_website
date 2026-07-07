import { access, cp, mkdir, rm } from 'node:fs/promises'
import path from 'node:path'

// Next 16 writes the static export into the per-site distDir (see next.config.ts),
// not the legacy top-level out/ directory.
const SITE_EXPORT_DIRS = {
  jike: '.next-jike',
  alpha: '.next-alpha',
}
const [, , siteKey] = process.argv

await saveStaticExport({ siteKey, cwd: process.cwd() })

async function saveStaticExport({ siteKey, cwd }) {
  const exportDir = SITE_EXPORT_DIRS[siteKey]

  if (!exportDir) {
    throw new Error('Usage: node scripts/save-out.mjs <jike|alpha>')
  }

  const sourcePath = path.resolve(cwd, exportDir)
  const distRoot = path.resolve(cwd, 'dist')
  const targetPath = path.resolve(distRoot, siteKey)
  const distPrefix = `${distRoot}${path.sep}`

  if (!targetPath.startsWith(distPrefix)) {
    throw new Error(`Refusing to write outside dist: ${targetPath}`)
  }

  await access(path.join(sourcePath, 'index.html'))
  await mkdir(distRoot, { recursive: true })
  await rm(targetPath, { recursive: true, force: true })
  await cp(sourcePath, targetPath, { recursive: true })

  console.log(`Saved static export to ${targetPath}`)
}
