// rollup.config.mjs
import esbuild from "rollup-plugin-esbuild"

export default {
	input: 'src/main.js',
	output: [
  	{
  		file: 'dist/bundle.min.js',
  		format: 'cjs',
  	},
  	{
  		file: 'dist/True.min.js',
  		format: 'esm',
  	},
  	{
  	  file: 'dist/Truejs.min.js',
  	  format: 'iife',
  	  name: 'Truejs',
  	}
  ],
  plugins: [
    esbuild({
      minify: true
    })
  ]
};