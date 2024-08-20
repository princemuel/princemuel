/// <reference path="../.astro/types.d.ts" />
/// <reference path="../.astro/icon.d.ts" />
/// <reference types="vite-plugin-pwa/vanillajs" />
/// <reference types="vite-plugin-pwa/info" />
/// <reference types="vite-plugin-pwa/pwa-assets" />

type EdgeLocals = import("@astrojs/vercel").EdgeLocals;

// biome-ignore lint/suspicious/noEmptyInterface: <explanation>
interface ImportMetaEnv {}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

declare namespace App {
	interface Locals extends EdgeLocals {}
}

interface Window {
	ThemeProvider: { updateWidget(theme?: string): void };
	AnalyticsService: { dispatch(): void };
}

interface globalThis {
	__singletons: Map<string, unknown>;
}

declare module "*.astro" {
	type Props = import("astro").AstroGlobal["props"];
	const component: (_props: Props) => unknown;
	export default component;
}
