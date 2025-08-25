const { defineConfig } = require("vite");
const path = require("path");

module.exports = defineConfig(async () => {
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
        "@": path.resolve(__dirname, "client", "src"),
        "@shared": path.resolve(__dirname, "shared"),
        "@assets": path.resolve(__dirname, "attached_assets"),
      },
    },
    root: path.resolve(__dirname, "client"),
    build: {
      outDir: path.resolve(__dirname, "dist/public"),
      emptyOutDir: true,
      rollupOptions: {
        input: path.resolve(__dirname, "client/index.html"),
      },
    },
  };
});