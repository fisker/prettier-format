import {Buffer} from 'node:buffer'
import test from 'ava'
import {outdent} from 'outdent'
import format from '../index.js'

async function formatTester(t, {input, expected, options}) {
  expected += '\n'
  const actual = format(input, options)
  t.is(typeof actual.then, 'function')
  t.is(await actual, expected)
}

test('main', async (t) => {
  await formatTester(t, {
    input: outdent`
      var bar = function fooBarFooBarFooBarFooBarFooBarFooBarFooBarFooBarFooBar
      (fooBarFooBarFooBarFooBarFooBarFooBarFooBarFooBarFooBarFooBarFooBarFooBar
      , anotherParam)
      {
                var foo
                            =
                'bar'; // comment
      }
    `,
    expected: outdent`
      var bar = function fooBarFooBarFooBarFooBarFooBarFooBarFooBarFooBarFooBar(
        fooBarFooBarFooBarFooBarFooBarFooBarFooBarFooBarFooBarFooBarFooBarFooBar,
        anotherParam,
      ) {
        var foo = "bar"; // comment
      };
    `,
    options: {parser: 'babel'},
  })
})

test('accepts buffer', async (t) => {
  await formatTester(t, {
    input: Buffer.from('foo ( )'),
    expected: 'foo();',
    options: {parser: 'babel'},
  })
})

test('options.filepath', async (t) => {
  await formatTester(t, {
    input: outdent`
      // this should be single quoted and indent with 7 spaces
      a {content: ""}
    `,
    expected: outdent`
      // this should be single quoted and indent with 7 spaces
      a {
      ${' '.repeat(7)}content: '';
      }
    `,
    options: {filepath: new URL('./fixtures/scss/test.scss', import.meta.url)},
  })
})
