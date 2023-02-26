import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import sveltePreprocess from 'svelte-preprocess'
import { transformSync } from 'esbuild'

// Use built-in ts loader from esbuild (no direct TS dependency!)
const svelteConfig = {
  preprocess: sveltePreprocess({
    typescript: ({ content }) => transformSync(content, {
      loader: 'ts',
      tsconfigRaw: `{
        "compilerOptions": {
          "preserveValueImports": true
        },
      }`
    })
  })
}

export default defineConfig({
  plugins: svelte(svelteConfig)
})
