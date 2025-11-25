import {defineConfig} from 'vite';
import {resolve} from 'path';
import {ViteImageOptimizer} from 'vite-plugin-image-optimizer';
import libAssetsPlugin from '@laynezh/vite-plugin-lib-assets';


export default defineConfig({
    root: '.', 
    build: {
        target: 'esnext', 
        cssCodeSplit: true, 
        sourcemap: true, 
        minify: 'terser', 
        outDir: 'dist',     
        emptyOutDir: true,  
        rollupOptions: {
            input: {
                main: resolve('index.html'), 
                // admin: resolve(__dirname, 'admin.html') // Страница администратора
            }, // точка входа — index_vite.html
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        return 'vendor'; 
                    }
                }
            }
        },
        plugins: [
            ViteImageOptimizer({
                test: /\.(jpe?g|png|gif|tiff|webp|svg|avif)$/i,
                png: {quality: 80},
                jpeg: {quality: 75},
                webp: {lossless: true}
            }),
            libAssetsPlugin({ limit: 8192, outputPath: 'assets' })
        ]
    },
    server: {
        open: true,     
        port: 3000,   
    },
    base: './'
});