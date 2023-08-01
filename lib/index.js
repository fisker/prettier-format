import path from 'node:path'
import importPrettier from './import-prettier.js'

const defaultOptions = {parser: 'babel'}

async function format(source, options = {}) {
  source = String(source)

  const {resolveConfig, format} = await importPrettier(options.filePath)

  const config = options.filePath
    ? await resolveConfig(options.filePath, options)
    : undefined

  return format(source, {...defaultOptions, ...config, ...options})
}

export default format
