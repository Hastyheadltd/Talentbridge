/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXT_PUBLIC_BASE_URL: "https://talent-bridge-server.onrender.com",
        NEXT_PUBLIC_RECAPTCHA_SITE_KEY:"6LdnG6wqAAAAAHk1XeHAC6dY9pTI6uyzPo_3X8Zb",
        RECAPTCHA_SECRET_KEY:'6LdnG6wqAAAAAOPLLaXO-94wdvf7fKAieHR5534z',
        API_KEY:"AIzaSyAyTMPTM4NT_XMdww15jyi9AUcAHy_DzAw",
AUTH_DOMAIN:"talent-bridge-dd896.firebaseapp.com",
PROJECT_ID:"talent-bridge-dd896",
STORAGE_BUCKET:"talent-bridge-dd896.appspot.com",
MESSAGING_SENDER_ID:"167594097298",
APP_ID:"1:167594097298:web:1e143212f16ea07f01044b"
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
