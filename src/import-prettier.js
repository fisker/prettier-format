import importFrom from 'import-from'

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
