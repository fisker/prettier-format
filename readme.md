# prettier-format

[![Build Status][github_actions_badge]][github_actions_link]
[![Coverage][coveralls_badge]][coveralls_link]
[![Npm Version][package_version_badge]][package_link]
[![MIT License][license_badge]][license_link]

[github_actions_badge]: https://img.shields.io/github/workflow/status/fisker/prettier-format/CI/master?style=flat-square
[github_actions_link]: https://github.com/fisker/prettier-format/actions?query=branch%3Amaster
[coveralls_badge]: https://img.shields.io/coveralls/github/fisker/prettier-format/master?style=flat-square
[coveralls_link]: https://coveralls.io/github/fisker/prettier-format?branch=master
[license_badge]: https://img.shields.io/npm/l/prettier-format.svg?style=flat-square
[license_link]: https://github.com/fisker/prettier-format/blob/master/license
[package_version_badge]: https://img.shields.io/npm/v/prettier-format.svg?style=flat-square
[package_link]: https://www.npmjs.com/package/prettier-format

> auto load config and run prettier on code

## Motivation

To load config and format code with prettier, you have to do

```js
const config = await prettier.resolveConfig('path/to/file', {useCache: false})

const formatted = await prettier.format(source, {...config, semi: false})
```

I want it simple

```js
const formatted = await format(source, {
  filepath: 'path/to/file',
  useCache: false,
  semi: false,
})
```

## Install

```sh
yarn add prettier-format
```

## Usage

```js
import format from 'prettier-format'

await format(`hello (  'world' )`)
// => hello("world");\n
```

## API

### format(source, options?)

Returns `promise` resolves with formatted code.

#### source

Type: `string`

Source code you want to format.

#### options

Type: `object`

any value [`prettier.resolveConfig`](https://prettier.io/docs/en/api.html#prettierresolveconfigfilepath-options) takes

any value [`prettier.format`](https://prettier.io/docs/en/api.html#prettierformatsource-options) takes

#### options.filepath

Type: `string`

The filepath of source code, if filepath is not empty, config will load automaticly.

## Related

- [write-prettier-file](https://github.com/fisker/write-prettier-file) write formatted code to file.
