/** @type {import('next').NextConfig} */
const nextConfig = {
	eslint: {
		ignoreDuringBuilds: true,
	},
	images: {
		remotePatterns: [
			{ protocol: "https", hostname: "res.cloudinary.com" },
			{ protocol: "http", hostname: "res.cloudinary.com" },
			{ protocol: "https", hostname: "via.placeholder.com" },
		],
	},
};

export default nextConfig;
