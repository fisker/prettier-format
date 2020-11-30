import babel from 'rollup-plugin-babel'

export default {
  input: 'src/index.mjs',
  output: {
    file: 'dist/index.js',
    format: 'cjs',
  },
  plugins: [babel()],
}
