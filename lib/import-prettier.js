import process from 'node:process'
import path from 'node:path'
import {pathToFileURL} from 'node:url'
import {resolve} from 'import-meta-resolve'

async function importFromFile(specifier, parent) {
  const url = await resolve(specifier, pathToFileURL(parent))
  return import(url)
}

function importFromDirectory(specifier, directory) {
  return importFromFile(specifier, path.join(directory, 'noop.js'))
}

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
  } catch (error) {
    // No op
  }
}

export default importPrettier
