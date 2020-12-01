import importFrom from 'import-from'
import importCommonJs from 'import-commonjs'

const require = importCommonJs(import.meta.url)

function importPrettier(directories = []) {
  directories = [...directories, process.cwd()]

  for (const directory of directories) {
    const prettier = importFrom.silent(directory, 'prettier')

    if (prettier) {
      return prettier
    }
  }

  return require('prettier')
}

export default importPrettier
