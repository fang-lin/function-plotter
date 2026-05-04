import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    build: {
        outDir: 'build',
        sourcemap: false,
    },
    server: {
        open: true,
    },
    test: {
        environment: 'jsdom',
        globals: true,
    },
});
