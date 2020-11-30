import importFrom from 'import-from'
import importCommonJs from 'import-commonjs'

function importPrettier(directories = []) {
  directories = [...directories, process.cwd()]

  for (const directory of directories) {
    const prettier = importFrom.silent(directory, 'prettier')

    if (prettier) {
      return prettier
    }
  }

  return importCommonJs('prettier')
}

export default importPrettier
