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

## Opinionated Parts

List of stuff that's opinionated or otherwise "looks weird" 😄

- `app.css` includes a [modern, gigabrain CSS reset](https://www.joshwcomeau.com/css/custom-css-reset/) (Thanks a ton!)
- TSconfig targets es6 by default
- package-lock.json is _not_ ignored by default
- Dependencies are marked `@latest`. Esbuild uses `@*` to use "any" version, defaulting Vite's peer requirement
- A data URL is used for the icon in `index.html`. Without this many browsers will cause annoying `GET /favicon` requests, polluting the network tab with 404s
