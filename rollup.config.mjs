// rollup.config.mjs
import esbuild from "rollup-plugin-esbuild"

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
  	  file: 'dist/cdn.min.js',
  	  format: 'iife',
  	  name: 'validation',
  	}
  ],
  plugins: [
    esbuild({
      minify: true
    })
  ]
};