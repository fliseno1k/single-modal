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
			formats: ['es', 'cjs'],
		},
		rollupOptions: {
			external: ['react', 'react/jsx-runtime'],
			output: {
				globals: {
					react: 'react',
					'react/jsx-runtime': 'jsxRuntime',
				},
			},
		},
	},
	plugins: [react(), dts()],
});
