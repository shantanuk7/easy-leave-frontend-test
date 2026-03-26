import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    coverage: {
      provider: 'v8',
      include: ['src/**'],
      exclude: [
        '**/node_modules/**',
        'src/main.tsx',
        'src/components/ui/**',
        'src/hooks/use-mobile.ts',
        'src/lib/utils.ts',
        '**/*.css',
      ],
      thresholds: {
        branches: 90,
        functions: 100,
        lines: 100,
        statements: 100,
      }
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
