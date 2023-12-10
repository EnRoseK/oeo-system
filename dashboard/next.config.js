/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'flowbite.com',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'flowbite-admin-dashboard.vercel.app',
				pathname: '/**',
			},
		],
	},
};

module.exports = nextConfig;
