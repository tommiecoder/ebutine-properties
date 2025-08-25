#!/usr/bin/env node

import { build } from 'esbuild';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync, mkdirSync, existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read package.json to get dependencies that should stay external
const packageJson = JSON.parse(readFileSync("package.json", "utf8"));
const externals = [
  // Keep these as external since they're platform-specific
  "bufferutil",
  "utf-8-validate",
];

async function buildServer() {
  try {
    console.log("🔧 Building server...");

    // Ensure dist directory exists
    const distDir = join(__dirname, 'dist', 'server');
    if (!existsSync(distDir)) {
      mkdirSync(distDir, { recursive: true });
      console.log('📁 Created dist directory');
    }

    await build({
      entryPoints: [join(__dirname, "server/index.ts")],
      bundle: true,
      platform: "node",
      target: "node18",
      format: "cjs",
      outfile: "dist/server/index.js",
      external: externals,
      minify: false, // Disable minification for debugging
      sourcemap: true,
      resolveExtensions: [".ts", ".js"],
      define: {
        "process.env.NODE_ENV": '"production"',
      },

      loader: {
        ".ts": "ts",
      },
    });

    console.log("✅ Server build completed successfully");
  } catch (error) {
    console.error("❌ Server build failed:", error);
    process.exit(1);
  }
}

buildServer();