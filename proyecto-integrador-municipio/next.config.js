/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    trailingSlash: true,
    basePath: '',
    publicRuntimeConfig: {
        contextPath: '',
        uploadPath: '/api/upload'
    }
};

module.exports = nextConfig;
