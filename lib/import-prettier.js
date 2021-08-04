import {createRequire} from 'node:module'
import process from 'node:process'
import importFrom from 'import-from'

function importPrettier(directories = []) {
  directories = [...directories, process.cwd()]

  for (const directory of directories) {
    const prettier = importFrom.silent(directory, 'prettier')

    if (prettier) {
      return prettier
    }
  }

  return createRequire(import.meta.url)('prettier')
}

export default importPrettier
