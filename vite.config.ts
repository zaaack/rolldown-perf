import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: `dist/vite${process.env.enableNativePlugin? 'NativePlugin': ''}`,
  },
  esbuild: false,
  experimental: {
    enableNativePlugin: !!process.env.enableNativePlugin,
  },
})
