// @ts-check
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

export default defineConfig({
	site: 'https://mothivenkatesh.github.io',
	base: '/mothi-blog',
	integrations: [mdx(), sitemap()],

	// Prefetch links on hover — instant page transitions
	prefetch: {
		prefetchAll: false,
		defaultStrategy: 'hover',
	},

	build: {
		// Inline small CSS (< 4KB) to reduce round-trips
		inlineStylesheets: 'auto',
	},

	// Enable gzip/brotli compression when serving
	compressHTML: true,

	image: {
		// Use sharp for image optimization (already in deps)
		service: { entrypoint: 'astro/assets/services/sharp' },
	},

	vite: {
		build: {
			// CSS code splitting for smaller initial payloads
			cssCodeSplit: true,
			// Target modern browsers for smaller bundles
			target: 'es2022',
			// Minify aggressively
			minify: 'esbuild',
			// Smaller chunk names in production
			rollupOptions: {
				output: {
					assetFileNames: 'assets/[hash][extname]',
					chunkFileNames: 'chunks/[hash].js',
					entryFileNames: 'entry/[hash].js',
				},
			},
		},
		// Tree-shake aggressively
		esbuild: {
			drop: ['console', 'debugger'],
		},
	},
});
