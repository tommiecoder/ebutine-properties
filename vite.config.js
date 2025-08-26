import { defineConfig } from "vite";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig(async () => {
  // Use dynamic imports for ESM-only packages
  const react = await import("@vitejs/plugin-react");
  
  const plugins = [react.default()];
  
  if (process.env.NODE_ENV !== "production" &&
      process.env.REPL_ID !== undefined) {
    try {
      const cartographer = await import("@replit/vite-plugin-cartographer");
      plugins.push(cartographer.cartographer());
    } catch (e) {
      // Cartographer plugin not available
    }
  }

  return {
    plugins,
    resolve: {
      alias: {
        "@": resolve(__dirname, "client", "src"),
        "@shared": resolve(__dirname, "shared"),
        "@assets": resolve(__dirname, "attached_assets"),
      },
    },
    root: resolve(__dirname, "client"),
    build: {
      outDir: resolve(__dirname, "dist/public"),
      emptyOutDir: true,
      rollupOptions: {
        input: resolve(__dirname, "client/index.html"),
      },
    },
  };
});