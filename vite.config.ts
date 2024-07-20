import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    dts({
      exclude: ['*.test.ts', 'vite.config.ts'],
      rollupTypes: true,
    }),
  ],
  esbuild: {
    minifySyntax: true,
    minifyIdentifiers: true,
  },
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'js-array-pipe',
      // the proper extensions will be added
      fileName: 'array-pipe',
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      output: {
        globals: {},
      },
    },
  },
})
