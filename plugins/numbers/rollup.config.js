import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import babel from 'rollup-plugin-babel'
import sizeCheck from 'rollup-plugin-filesize-check'
const name = 'compromise-numbers'

import { version } from './package.json'
const banner = `/* ${name} ${version} MIT */`

export default [
  {
    input: 'src/index.js',
    output: [
      {
        file: `builds/${name}.mjs`,
        format: 'esm',
        banner: banner,
      },
    ],
    plugins: [resolve(), json(), commonjs(), terser(), sizeCheck()],
  },
  {
    input: 'src/index.js',
    output: [
      {
        file: `builds/${name}.js`,
        format: 'umd',
        sourcemap: false,
        name: 'compromiseNumbers',
        banner: banner,
      },
    ],
    plugins: [
      resolve(),
      json(),
      commonjs(),
      babel({
        babelrc: false,
        presets: ['@babel/preset-env'],
      }),
      sizeCheck(),
    ],
  },
  {
    input: 'src/index.js',
    output: [
      {
        file: `builds/${name}.min.js`,
        format: 'umd',
        name: 'compromiseNumbers',
      },
    ],
    plugins: [
      resolve(),
      json(),
      commonjs(),
      babel({
        babelrc: false,
        presets: ['@babel/preset-env'],
      }),
      terser(),
      sizeCheck(),
    ],
  },
]
