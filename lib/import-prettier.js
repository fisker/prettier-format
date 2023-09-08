import process from 'node:process'
import * as path from 'node:path'
import {toUrl} from 'url-or-path'
import {resolve} from 'import-meta-resolve'

/** @typedef {import('prettier')} PrettierModule */

/**
 * @param {string} specifier
 * @param {string | URL} parent
 */
async function importFromFile(specifier, parent) {
  const url = resolve(specifier, toUrl(parent).href)
  return import(url)
}

/**
 * @param {string} specifier
 * @param {string} directory
 */
function importFromDirectory(specifier, directory) {
  return importFromFile(specifier, path.join(directory, 'noop.js'))
}

/**
 * @param {string | URL} file
 * @returns {Promise<PrettierModule>}
 */
async function importPrettier(file) {
  if (file) {
    try {
      return await importFromFile('prettier', file)
    } catch {
      // No op
    }
  }

  try {
    return await importFromDirectory('prettier', process.cwd())
  } catch {
    // No op
  }

  return import('prettier')
}

export default importPrettier
