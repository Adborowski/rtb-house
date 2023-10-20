/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        formats: ["image/avif", "image/webp"],
        domains: ["robohash.org"],
    },
};

module.exports = nextConfig;
