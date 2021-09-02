import { defineConfig } from 'vite';
import { dependencies } from './package.json';

export default defineConfig({
    build: {
        target: 'node12',
        lib: {
            entry: 'src/index.ts',
            formats: ['cjs'],
            fileName: () => 'index.js',
        },
        minify: false,
        rollupOptions: {
            external: Object.keys(dependencies),
        },
    },
});
