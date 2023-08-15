import { init } from '../serverless.js';

export const handler = init((() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.8282c54c.js","app":"_app/immutable/entry/app.ab847658.js","imports":["_app/immutable/entry/start.8282c54c.js","_app/immutable/chunks/index.5d711ff9.js","_app/immutable/chunks/singletons.95408253.js","_app/immutable/chunks/index.a06b4b82.js","_app/immutable/entry/app.ab847658.js","_app/immutable/chunks/index.5d711ff9.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('../server/nodes/0.js')),
			__memo(() => import('../server/nodes/1.js')),
			__memo(() => import('../server/nodes/2.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})());
