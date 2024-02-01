import config from "./config.js";

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DB_URI: config.DB_URI,
    API: config.API,
  },
};

export default nextConfig;
