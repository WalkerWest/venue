import { resolve } from 'path'
export default { 
	base: './',
	build: {
		rollupOptions: {
			input: {
				main: resolve(__dirname,'index.html'),
				nested: resolve(__dirname,'short.html')
			}
   	},
		outDir: '../src/main/resources/www/r',
		assetsDir: './assets'
	}
}
