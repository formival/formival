import commonjs from '@rollup/plugin-commonjs';
import babel from 'rollup-plugin-babel';
import {terser} from 'rollup-plugin-terser';
import resolve from '@rollup/plugin-node-resolve';

export default {
  input: 'src/index.js',
  output: [
    {
      format: 'umd',
      name: 'formival',
      file: 'dist/formival.js',
      esModule: false
    },
    {
      format: 'umd',
      name: 'formival',
      file: 'dist/formival.min.js',
      esModule: false,
      plugins: [
        terser()
      ]
    },
    {
      file: "dist/formival.common.js",
      format: "cjs"
    },
    {
      file: 'dist/formival.esm.js',
      format: 'esm'
    }
  ],
  plugins: [
    babel({
      exclude: "node_modules/**",
      runtimeHelpers: true
    }),
    resolve(),
    commonjs()
  ]
};
