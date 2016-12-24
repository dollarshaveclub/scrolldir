import babel from 'rollup-plugin-babel';
import eslint from 'rollup-plugin-eslint';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  entry: 'src/scrolldir.js',
  dest: 'dist/scrolldir.js',
  format: 'umd',
  moduleName: 'scrollDir',
  sourceMap: false, // removes the souremap at the bottom of the file
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    commonjs(),
    eslint({
      exclude: [],
    }),
    babel({
      exclude: 'node_modules/**',
    }),
  ],
};
