# prettier-format

> auto load config and run prettier on code

## Motivation

To load config and format code with prettier, you have to do

```js
;(async () => {
  const config = await prettier.resolveConfig('path/to/file', {
    useCache: false,
  })
  // there is also a sync version of `prettier.resolveConfig`
  // called `prettier.resolveConfig.sync`

  const formatted = prettier.format(source, {
    ...config,
    semi: false,
  })
})()
```

I want it simple

```js
;(async () => {
  const formatted = format(source, {
    filePath: 'path/to/file',
    useCache: false,
    semi: false,
  })
})()
```

## Install

```sh
yarn add prettier-format
```

## Ustage

```js
import format from 'prettier-format'

format.sync(`hello (  'world' )`)
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

#### options.filePath

Type: `string`

The filePath of source code, if filePath is not empty, config will load automaticly.

### format.sync(source, options?)

Sync version.

## Related

- [write-prettier-file](https://github.com/fisker/write-prettier-file) write formatted code to file.
