import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  output: {
    distPath: {
      root: './dist/rsbuild',
    },
  },
  plugins: [pluginReact()],
  dev: {
    writeToDisk: true,
  },
  server: {
    port: 5173,
  },
})
