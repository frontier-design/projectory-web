import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

/** Faces used above the fold on every route. Matched against hashed bundle filenames. */
const CRITICAL_FONTS = ['FoundersGrotesk-Regular', 'FoundersGrotesk-Semibold'];

/**
 * Preloads the two above-the-fold woff2 faces so they are requested alongside the
 * stylesheet rather than after it parses.
 *
 * This plugin used to also inline hand-picked "critical CSS" and defer the real
 * stylesheet with `media="print" onload="this.media='all'"`. That was reverted:
 * the inline block covered a handful of rules while every layout rule, every
 * `@media` block and every CSS-module class lived in the deferred sheet, so the
 * app painted and mounted unstyled and then re-laid out — the site's CLS was
 * 0.641 desktop / 1.689 mobile, and off-canvas panels hidden only by `transform`
 * flashed on screen. The sheet is ~8 KB brotli; blocking on it is the cheaper
 * trade by a wide margin. Do not reintroduce the swap.
 */
function criticalFontPreloads(): Plugin {
  return {
    name: 'critical-font-preloads',
    enforce: 'post',
    transformIndexHtml(_html, ctx) {
      if (!ctx.bundle) return;

      return Object.keys(ctx.bundle)
        .filter((k) => k.endsWith('.woff2') && CRITICAL_FONTS.some((f) => k.includes(f)))
        .map((asset) => ({
          tag: 'link',
          attrs: {
            rel: 'preload',
            href: `/${asset}`,
            as: 'font',
            type: 'font/woff2',
            crossorigin: 'anonymous',
          },
          injectTo: 'head' as const,
        }));
    },
  };
}

export default defineConfig({
  base: '/',
  plugins: [react(), criticalFontPreloads()],
  resolve: {
    // Mirrors "paths" in tsconfig.app.json.
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    proxy: {
      '/api/combo-convo-form': {
        target:
          'https://script.google.com/macros/s/AKfycbyBjqgKCilAgqqpy_HkuyrrJ0HaLka-Ch6yea-swOFSKnfRu7dPO7dTc4yLNx2gQ0ZR/exec',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/combo-convo-form/, ''),
      },
      '/api/venting-machine-form': {
        target:
          'https://script.google.com/macros/s/AKfycbz9PRZKGHPK6YMt-f8FXUY5vnsDVW8g2xyUI9NDoFyVuT-NH05UWqsLxhf-7NqvAzKfHA/exec',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/venting-machine-form/, ''),
      },
      '/api/laser-focus-form': {
        target:
          'https://script.google.com/macros/s/AKfycbyPHYnixWbW2tKp2gK0LkAupBk89LDTDwOdCDy_DltvOvtgkq115bwUgRIDlG1eknJS/exec',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/laser-focus-form/, ''),
        configure: (proxy) => {
          proxy.on('proxyRes', (proxyRes) => {
            proxyRes.headers['access-control-allow-origin'] = '*';
            proxyRes.headers['access-control-allow-methods'] = 'GET,POST,OPTIONS';
            proxyRes.headers['access-control-allow-headers'] = 'Content-Type';
          });
        },
      },
    },
  },
  build: {
    outDir: 'docs',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-dom/client', 'react-router-dom'],
          'vendor-motion': ['framer-motion'],
          'vendor-d3': ['d3'],
        },
      },
    },
  },
});
