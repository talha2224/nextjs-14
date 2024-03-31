// /** @type {import('next').NextConfig} */
// const nextConfig = {}

// module.exports = nextConfig
const nextConfig = {
    eslint: {
      ignoreDuringBuilds: true,
    },
    typescript: {
      ignoreBuildErrors: true,
   },
}
  
  module.exports = nextConfig