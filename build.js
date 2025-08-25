#!/usr/bin/env node

import { build } from 'esbuild';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function buildServer() {
  try {
    await build({
      entryPoints: [join(__dirname, 'server/index.ts')],
      bundle: true,
      platform: 'node',
      target: 'node18',
      format: 'cjs',
      outfile: 'dist/server/index.js',
      external: ['express', 'drizzle-orm', '@neondatabase/serverless'],
      minify: true,
      sourcemap: false,
      define: {
        'process.env.NODE_ENV': '"production"'
      }
    });
    console.log('✅ Server build completed');
  } catch (error) {
    console.error('❌ Server build failed:', error);
    process.exit(1);
  }
}

buildServer();