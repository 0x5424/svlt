`svlt`
---

Minimal template for a new svelte(kit) project with first-class TypeScript support.

- Vite
- TypeScript[^1]

[^1]: Typescript not included :^)

This setup allows you to write in `*.ts` and `*.svelte`, which Vite (esbuild) will transpile to JS.

## Setup

1. Fork this project
2. Depending on whether/not SvelteKit is needed:
    - **NOT using SvelteKit:** Simply remove the `routes` dir
    - **USE SvelteKit:** [Follow the SvelteKit recipe](#adding-sveltekit)
3. (Optional) For IDE support install TS globally `npm i -g typescript@latest`, or save it to devDependencies

Then, here are a few (non-exhaustive) project-specific things to change according to your needs:
- This README
- `name` and `description` in package.json
- `title` in index.html
- The `app.css` css reset

## Recipes

After forking the project, here are a few common setups you can integrate in your project:
- [SvelteKit](#adding-sveltekit)
- [Tailwind](#using-tailwind)
- [TypeScript ESLint](#adding-eslint)
- [`bun` support](#using-bun)

### Adding `SvelteKit`

If using SvelteKit is preferred, first replace the `vite-plugin-svelte` dependency[^2] in package.json with sveltekit & an adapter:

[^2]: Sveltekit [already includes `vite-plugin-svelte`](https://kit.svelte.dev/docs/integrations#preprocessors-vitepreprocess), keeping our direct deps as slim as possible 🫡

```diff
package.json

   "devDependencies": {
-    "@sveltejs/vite-plugin-svelte": "latest",
+    "@sveltejs/adapter-auto": "latest",
+    "@sveltejs/kit": "latest",
```

Then update the svelte config:
```diff
svelte.config.js

-import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
+import { vitePreprocess } from '@sveltejs/kit/vite'
+import adapter from '@sveltejs/adapter-auto'

 export default {
   preprocess: [vitePreprocess()],
+  kit: { adapter: adapter() }
 }
```

The vite config:
```diff
vite.config.js

 import { defineConfig } from 'vite'
-import { svelte } from '@sveltejs/vite-plugin-svelte'
+import { sveltekit } from '@sveltejs/kit/vite'

 import svelteConfig from './svelte.config'

 export default defineConfig({
-  plugins: [svelte(svelteConfig)]
+  plugins: [sveltekit(svelteConfig)]
 })
```

And the tsconfig:
```diff
tsconfig.json

 {
+  "extends": "./.svelte-kit/tsconfig.json",
   "include": ["src/**/*"],
   "exclude": ["node_modules/*", "public/*"],
```

Next:
- Move the `routes` dir to `src/routes`
- Delete `src/app.ts`

Finally, create an entrypoint by renaming `index.html` to `src/app.html` with the following changes:

```diff
 index.html -> src/app.html

-    <title>svlt</title>
+    %sveltekit.head%

 ...

-  <body><script async type="module" src="/src/app.ts"></script></body>
+  <body>%sveltekit.body%</body>
```

### Adding `tailwind`

Follow [their guide](https://tailwindcss.com/docs/guides/sveltekit)... but for posterity:
```diff
package.json

   "devDependencies": {
+    "autoprefixer": "latest",
+    "postcss": "latest",
+    "tailwindcss": "latest",
```

Add the default tailwind config `tailwind.config.js`:
```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{svelte,ts}'],
  theme: { extend: {} },
  /** Optionally, add `"@tailwindcss/forms": "latest"` for improved form support */
  // plugins: [require('@tailwindcss/forms')]
  plugins: []
}
```

Add the initial `postcss.config.js`:
```js
export default {
  plugins: { tailwindcss: {}, autoprefixer: {} }
}
````

Then add the minimum required directives in the main css:
```diff
app.css

+@tailwind base;
+@tailwind components;
+@tailwind utilities;
+
 :root {
```

### Adding `eslint`

Install eslint and plugins for typescript+svelte:
```bash
npm i --save-dev eslint eslint-plugin-svelte3 @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

Add the minimum required config:
```bash
echo 'env: { browser: true }
extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"]
parser: "@typescript-eslint/parser"
parserOptions: { extraFileExtensions: [svelte] }
settings: {svelte3/typescript: true}' > .eslintrc.yml
```

### Using `bun`

Unfortunately, `vite` still requires a node environment to run properly. However, you can leverage bun's native TypeScript support to get IDE intellisense. (Check your IDE's documentation on language servers)

If a `bun` executable is available, you can write your unit tests in TypeScript **without any additional npm dependencies!**
```diff
package.json

 scripts: {
   start: "vite"
   check: "svelte-check"
+  test: "bun test"
```

The above will check for any files ending in `*.test.ts` to run (default behavior). Bun supports Jest-like matchers, [check upstream](https://github.com/oven-sh/bun/tree/main/test) for more info.

## Opinionated Parts

List of stuff that's opinionated or otherwise "looks weird" 😄

- `app.css` includes a [modern, gigabrain CSS reset](https://www.joshwcomeau.com/css/custom-css-reset/) (Thanks a ton!)
- TSconfig targets es6 by default
- package-lock.json is _not_ ignored by default
- A data URL is used for the icon in `index.html`. Without this many browsers make `GET /favicon` requests, polluting the dev console with 404s

### Motivation

Goal: Bootstrap new Svelte projects with the absolute minimum requirements to work with TypeScript.
Keeping the config and toolchain as slim as possible is key, and Vite is pivotal to this end. It comes with sensible defaults for both dev & production, and the Svelte ecosystem heavily leans into Vite's tooling.

Real motivation: Having used webpack+React for an eternity, I've decided I don't like them (and never did).
