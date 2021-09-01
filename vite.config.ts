import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        target: 'node12',
        lib: {
            entry: 'src/index.ts',
            formats: ['cjs'],
            fileName: () => 'index.js',
        },
    },
});
