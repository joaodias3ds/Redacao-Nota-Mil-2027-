import type { NextConfig } from 'next';
import path from 'node:path';

const nextConfig: NextConfig = {
  // Monorepo: raiz do workspace (pasta acima de "Redação Web")
  turbopack: {
    root: path.join(__dirname, '..'),
  },
  outputFileTracingRoot: path.join(__dirname, '..'),
};

export default nextConfig;
