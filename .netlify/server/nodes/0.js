

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.26f0339c.js","_app/immutable/chunks/index.5d711ff9.js","_app/immutable/chunks/index.a06b4b82.js"];
export const stylesheets = ["_app/immutable/assets/0.7ff65703.css"];
export const fonts = [];
