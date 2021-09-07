import path from 'node:path'
import importPrettier from './import-prettier.js'

const defaultOptions = {}

function formatWithOptions(source, prettier, options) {
  options = {
    parser: 'babel',
    ...options,
  }

  return prettier.format(source, options)
}

function resolveConfig(prettier, options, sync) {
  return (sync ? prettier.resolveConfig.sync : prettier.resolveConfig)(
    options.filePath,
    options,
  )
}

function formatter(source, options, sync) {
  source = String(source)
  options = {
    ...defaultOptions,
    ...options,
  }

  const prettier = importPrettier(
    options.filePath ? [path.dirname(options.filePath)] : [],
  )
  const config = options.filePath
    ? resolveConfig(prettier, options, sync)
    : undefined

  if (sync) {
    return formatWithOptions(source, prettier, {
      ...config,
      ...options,
    })
  }

  return Promise.resolve(config).then((config) =>
    formatWithOptions(source, prettier, {
      ...config,
      ...options,
    }),
  )
}

function format(source, options) {
  return formatter(source, options, false)
}

function formatSync(source, options) {
  return formatter(source, options, true)
}

format.sync = formatSync
export default format
