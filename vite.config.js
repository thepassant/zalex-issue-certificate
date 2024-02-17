import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import { viteCommonjs } from "@originjs/vite-plugin-commonjs";

// https://vitejs.dev/config/
export default defineConfig({
  envDir: path.resolve(process.cwd(), "environments"),
  plugins: [react(), viteCommonjs()],
  server: {
    open: true,
    host: "localhost",
    port: 3000,
  },
});
