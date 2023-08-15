import * as server from '../entries/pages/_page.server.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.js";
export const imports = ["_app/immutable/nodes/2.69c78212.js","_app/immutable/chunks/index.5d711ff9.js","_app/immutable/chunks/stores.c9cf4635.js","_app/immutable/chunks/singletons.95408253.js","_app/immutable/chunks/index.a06b4b82.js"];
export const stylesheets = [];
export const fonts = [];
