import { access, cp, mkdir, rm } from 'node:fs/promises'
import path from 'node:path'

const VALID_SITE_KEYS = new Set(['jike', 'alpha'])
const [, , siteKey] = process.argv

await saveStaticExport({ siteKey, cwd: process.cwd() })

async function saveStaticExport({ siteKey, cwd }) {
  if (!VALID_SITE_KEYS.has(siteKey)) {
    throw new Error('Usage: node scripts/save-out.mjs <jike|alpha>')
  }

  const sourcePath = path.resolve(cwd, 'out')
  const distRoot = path.resolve(cwd, 'dist')
  const targetPath = path.resolve(distRoot, siteKey)
  const distPrefix = `${distRoot}${path.sep}`

  if (!targetPath.startsWith(distPrefix)) {
    throw new Error(`Refusing to write outside dist: ${targetPath}`)
  }

  await access(sourcePath)
  await mkdir(distRoot, { recursive: true })
  await rm(targetPath, { recursive: true, force: true })
  await cp(sourcePath, targetPath, { recursive: true })

  console.log(`Saved static export to ${targetPath}`)
}
