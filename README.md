`svlt`
---

Minimal SPA template for a new svelte project.

- Vite & Esbuild
- TypeScript Support[^1]

[^1]: Typescript not included :^)

This setup allows you to write in `*.ts` and `*.svelte`, which esbuild will transpile to JS, and Vite will serve

## Installation

1. Fork this project
2. (Optional) For IDE support install TS globally `npm i -g typescript@latest`, or save it to devDependencies

Here are a few items (non-exhaustive) you should change according to your project:
- This README
- `name` and `description` in package.json
- `title` in index.html

## Recipes

After forking the project, here are a few common setups you can integrate in your project:

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

As of 2-2023 it's still an upstream WIP, but if `bun` is available you can write your unit tests in TypeScript **without any additional dependencies!**
```diff
package.json

 scripts: {
   start: "vite"
   check: "svelte-check"
+  test: "bun wiptest"
```

The above will check for any files ending in `*.test.ts` to run (default behavior). Bun supports Jest-like matchers, check [their docs](https://github.com/oven-sh/bun/tree/main/test) for more info.

## Opinionated Parts

List of stuff that's opinionated or otherwise "looks weird" 😄

- `app.css` includes a [modern, gigabrain CSS reset](https://www.joshwcomeau.com/css/custom-css-reset/) (Thanks a ton!)
- TSconfig targets es6 by default
- package-lock.json is _not_ ignored by default
- Dependencies are marked `@latest`. Esbuild uses `@*` to use "any" version, defaulting Vite's peer requirement
- A data URL is used for the icon in `index.html`. Without this many browsers will cause annoying `GET /favicon` requests, polluting the network tab with 404s
