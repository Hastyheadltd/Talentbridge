/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  swcMinify: true,
    env: {
      NEXT_PUBLIC_BASE_URL: "https://talent-bridge-backend-axvg.onrender.com",
    //  NEXT_PUBLIC_BASE_URL: "http://localhost:4100",
        NEXT_PUBLIC_RECAPTCHA_SITE_KEY:"6LdnG6wqAAAAAHk1XeHAC6dY9pTI6uyzPo_3X8Zb",
        RECAPTCHA_SECRET_KEY:'6LdnG6wqAAAAAOPLLaXO-94wdvf7fKAieHR5534z',
        API_KEY:"AIzaSyCT0VoLMLiuT5A2MIx9_C10EtaYH-_dQYM",
AUTH_DOMAIN:"flixrecruit.firebaseapp.com",
PROJECT_ID:"flixrecruit",
STORAGE_BUCKET:"flixrecruit.firebasestorage.app",
MESSAGING_SENDER_ID:"773533963782",
APP_ID:"1:773533963782:web:d6d4b1214bec1176861587",
LINKEDIN_CLIENT_ID:"77coonkee1ht0v"

        },
        images: {
          remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
             
            },
        ],
        },
        eslint: {
            ignoreDuringBuilds: true, 
          },

          async headers() {
            return [
              {
                source: '/(.*)',
                headers: [
                  { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
                  { key: 'Content-Security-Policy', value: "default-src 'self'" },
                  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
                ],
              },
            ];
          },
      
};

export default nextConfig;
