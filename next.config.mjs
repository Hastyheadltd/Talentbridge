/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXT_PUBLIC_BASE_URL: "https://talent-bridge-server.onrender.com",
        },
        images: {
          remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
             
            },
        ],
        },
};

export default nextConfig;
