/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["picsum.photos", "cdn.sanity.io"],
  },
};

export default nextConfig;

// module.exports = {
//   images: {
//     domains: ['cdn.sanity.io'], // Add Sanity's domain here
//   },
//   // other configurations
// };
