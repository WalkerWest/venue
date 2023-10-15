// npm install --save-dev rollup-plugin-node-resolve
import resolve from 'rollup-plugin-node-resolve';
export default {
	input: '/media/removable/SD Card/nblc/tea/ui5/node_modules/@ui5/webcomponents/dist/DatePicker.js',
	output: {
		file: './libs/DatePicker.js',
		format: 'esm',
		name: 'ui5'
	},
	plugins: [
		resolve({ jsnext: true })
	]
}
