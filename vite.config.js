import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * In dev, Vite pre-bundles all ~4,000 Lucide icons (~5 MB) into one file, which
 * makes page loads — especially on a phone over Wi-Fi — very slow.
 * This rewrites `import { ArrowUp } from 'lucide-react'` to per-icon imports.
 * Production builds already tree-shake unused icons, so it only runs in dev.
 */
function lucideDevIcons() {
  const importRe = /import\s*\{([^}]+)\}\s*from\s*['"]lucide-react['"];?/g
  const toKebab = (name) =>
    name
      .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
      .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
      .toLowerCase()

  return {
    name: 'lucide-dev-icons',
    apply: 'serve',
    enforce: 'pre',
    transform(code, id) {
      if (id.includes('node_modules') || !/\.[jt]sx?$/.test(id) || !code.includes('lucide-react')) return
      return code.replace(importRe, (_, names) =>
        names
          .split(',')
          .map((n) => n.trim())
          .filter(Boolean)
          .map((n) => {
            const [imported, local = imported] = n.split(/\s+as\s+/)
            return `import ${local} from 'lucide-react/dist/esm/icons/${toKebab(imported)}.mjs';`
          })
          .join('\n')
      )
    },
  }
}

export default defineConfig({
  plugins: [lucideDevIcons(), react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  optimizeDeps: {
    // Icons are imported per file (see lucideDevIcons), so skip bundling the whole set.
    exclude: ['lucide-react'],
  },
})
