import type { NextConfig } from 'next';
import { NextConfig as NextConfigType } from 'next';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

/** @type {import('next').NextConfig} */
const nextConfig: NextConfigType = {
  webpack(config) {
    config.module.rules.push({
      test: /pdf\.worker(\.min)?\.js$/,
      type: 'asset/resource',
    });

    return config;
  },
};

export default nextConfig;
