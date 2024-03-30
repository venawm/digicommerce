import config from "./config.js";

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DB_URI: config.DB_URI,
    API: config.API,
    NEXTAUTH_SECRET: config.NEXTAUTH_SECRET,
    GOOGLE_CLIENT_ID: config.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: config.GOOGLE_CLIENT_SECRET,
    NEXTAUTH_URL: config.NEXTAUTH_URL,
    SMTP_PASSWORD: config.SMTP_PASSWORD,
    SMTP_EMAIL: config.SMTP_EMAIL,
    CLOUDINARY_CLOUD_NAME: config.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: config.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: config.CLOUDINARY_API_SECRET,
    STRIPE_PUBLISHABLE_KEY: config.STRIPE_PUBLISHABLE_KEY,
    STRIPE_SECRET_KEY: config.STRIPE_SECRET_KEY,
    STRIPE_TAX_RATE: config.STRIPE_TAX_RATE,
    DOMAIN: config.DOMAIN,
    STRIPE_SHIPPING_RATE: config.STRIPE_SHIPPING_RATE,
    STRIPE_WEBHOOK_SECRET: config.STRIPE_WEBHOOK_SECRET,
  },
  images: {
    domains: ["lh3.googleusercontent.com", "res.cloudinary.com"],
  },
};

export default nextConfig;
