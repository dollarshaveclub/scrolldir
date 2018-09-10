// rollup bundle commands
// rollup -c => builds default scrolldir (default)
// rollup -c --environment entry:.auto => builds self envoking scrolldir

import babel from 'rollup-plugin-babel'
import replace from 'rollup-plugin-replace'
import { uglify } from 'rollup-plugin-uglify'

import {
  author,
  description,
  homepage,
  license,
  main,
  module,
  name,
  version,
} from './package.json'

const loose = true

const babelSetup = {
  babelrc: false,
  presets: [['@babel/preset-env', { modules: false, loose }]],
  exclude: 'node_modules/**',
}

const uglifyOutput = {
  output: {
    comments: (node, comment) => {
      const text = comment.value
      const type = comment.type
      if (type === 'comment2') {
        // multiline comment
        return /@preserve|@license|@cc_on/i.test(text)
      }
    },
  },
}

const banner = `/**
  ${name} - ${description}
  @version v${version}
  @link ${homepage}
  @author ${author}
  @license ${license}
**/`

const ensureArray = maybeArr => Array.isArray(maybeArr) ? maybeArr : [maybeArr]

const createConfig = ({ input, output, env } = {}) => {
  const plugins = [
    babel(babelSetup),
    replace({ 'VERSION': JSON.stringify(version).replace(/"/g, '') }),
  ]

  if (env === 'production') plugins.push(uglify(uglifyOutput))

  return {
    input,
    plugins,
    output: ensureArray(output).map(format =>
      Object.assign(
        {},
        format,
        {
          banner,
          name: 'scrollDir',
        }
      )
    ),
  }
}

export default [
  createConfig({
    input: 'src/scrolldir.js',
    output: [
      { file: main, format: 'umd' },
      { file: module, format: 'es' },
    ],
  }),
  createConfig({
    input: 'src/scrolldir.js',
    output: {
      file: 'dist/scrolldir.min.js',
      format: 'umd',
    },
    env: 'production',
  }),
  createConfig({
    input: 'src/scrolldir.auto.js',
    output: {
      file: 'dist/scrolldir.auto.js',
      format: 'umd',
    },
  }),
  createConfig({
    input: 'src/scrolldir.auto.js',
    output: {
      file: 'dist/scrolldir.auto.min.js',
      format: 'umd',
    },
    env: 'production',
  }),
]

