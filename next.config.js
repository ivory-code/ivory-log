/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: config => {
    const path = require('path')
    config.resolve.modules.push(path.resolve('./src'))
    return config
  },
}

module.exports = nextConfig
