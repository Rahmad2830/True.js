// rollup.config.mjs
import esbuild from "rollup-plugin-esbuild"
import { dts } from "rollup-plugin-dts"

export default {
	input: 'src/main.js',
	output: [
  	{
  		file: 'dist/cjs.min.js',
  		format: 'cjs',
  	},
  	{
  		file: 'dist/esm.min.js',
  		format: 'esm',
  	},
  	{
  		file: 'dist/esm.min.d.ts',
  		format: 'esm',
  	},
  	{
  	  file: 'dist/cdn.min.js',
  	  format: 'iife',
  	  name: 'validation',
  	}
  ],
  plugins: [
    esbuild({
      minify: true
    }),
    dts()
  ]
};