import { defineConfig } from 'vite'
import { fileURLToPath, URL } from "url";
import svgLoader from 'vite-svg-loader'
import vue from '@vitejs/plugin-vue'

//todo: убрать лишние алиасы
export default defineConfig({
  plugins: [vue(), svgLoader()],
  resolve: {
    alias: [
      { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
      { find: '@assets', replacement: fileURLToPath(new URL('./src/shared/assets', import.meta.url)) },
      { find: '@cmp', replacement: fileURLToPath(new URL('./src/shared/cmp', import.meta.url)) },
      { find: '@stores', replacement: fileURLToPath(new URL('./src/shared/stores', import.meta.url)) },
      { find: '@use', replacement: fileURLToPath(new URL('./src/shared/use', import.meta.url)) },
    ]
  }
})