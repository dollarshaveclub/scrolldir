// rollup bundle commands
// rollup -c => builds default scrolldir (default)
// rollup -c --environment entry:.auto => builds self envoking scrolldir

import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

const name = process.env.entry ? '.auto' : '';

export default {
  entry: `src/scrolldir${name}.js`,
  dest: `dist/scrolldir${name}.js`,
  format: 'umd',
  moduleName: `scrollDir${name}`,
  sourceMap: false, // removes the souremap at the bottom of the file
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    commonjs(),
    babel({
      exclude: 'node_modules/**',
    }),
  ],
};
