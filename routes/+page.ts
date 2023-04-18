/**
 * Tell Sveltekit to include the adjacent `+page.svelte` in compilation
 * This effectively makes `./index.html` a static asset in production
 */
export const prerender = true as const; // `as const` to showcase TS is working as intended
