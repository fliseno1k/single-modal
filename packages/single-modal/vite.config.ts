import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import dts from 'vite-plugin-dts';

export default defineConfig({
	build: {
		lib: {
			entry: resolve(__dirname, 'src/index.ts'),
			name: 'single-modal',
			fileName: 'single-modal',
		},
		rollupOptions: {
			external: ['react', 'react/jsx-runtime'],
			output: {
				globals: {
					react: 'React',
				},
			},
		},
	},
	plugins: [react(), dts()],
});
