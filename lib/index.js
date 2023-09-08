import {toPath} from 'url-or-path'
import importPrettier from './import-prettier.js'

/** @typedef {import("prettier")} Prettier */

/**
 * @param {string | Buffer} source
 * @param {Prettier.ResolveConfigOptions & Prettier.Options & {filepath?: string | URL}} options
 * @returns {string}
 */
async function format(source, options = {}) {
  const file = toPath(options.filepath)
  const prettier = await importPrettier(file)
  const config = file ? await prettier.resolveConfig(file, options) : undefined
  return prettier.format(String(source), {
    ...config,
    ...options,
    filepath: file,
  })
}

export default format
