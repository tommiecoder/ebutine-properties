#!/usr/bin/env node

import { execSync } from 'child_process';
import { existsSync, mkdirSync } from 'fs';
import path from 'path';

console.log('🏗️  Building application...');

try {
  // Build client first
  console.log('📦 Building client...');
  execSync('npm run build:client', { stdio: 'inherit' });

  // Ensure dist/server directory exists
  const distServerDir = path.resolve('./dist/server');
  if (!existsSync(distServerDir)) {
    mkdirSync(distServerDir, { recursive: true });
  }

  // Build server using TypeScript compiler
  console.log('🔧 Building server...');
  execSync('npx tsc --project tsconfig.server.json', { stdio: 'inherit' });

  console.log('✅ Build completed successfully!');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}