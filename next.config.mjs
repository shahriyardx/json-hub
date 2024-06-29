/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [{hostname: 'avatars.githubusercontent.com'}]
	}
}

export default nextConfig
