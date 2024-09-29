import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        sourcemap: true,
    },
    optimizeDeps: {
        exclude: ['chunk-JVVZIASD.js?v=84b97b9a'],
    },
});
