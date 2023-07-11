import path from 'node:path'
import {Buffer} from 'node:buffer'
import process from 'node:process'
import test from 'ava'
import {outdent} from 'outdent'
import format from '../index.js'

async function formatTester(t, {input, expected, options}) {
  expected += '\n'
  const actual = format(input, options)
  t.truthy(actual.then)
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
  })
})

test('support buffer', async (t) => {
  await formatTester(t, {
    input: Buffer.from('foo ( )'),
    expected: 'foo();',
  })
})

test('options.filePath', async (t) => {
  await formatTester(t, {
    input: outdent`
      // this should be single quoted and without semi
      var foo = "bar"
    `,
    expected: outdent`
      // this should be single quoted and without semi
      var foo = 'bar'
    `,
    options: {
      filePath: path.join(process.cwd(), 'foo.js'),
    },
  })
})
