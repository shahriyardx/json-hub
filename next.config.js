/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js")

/** @type {import("next").NextConfig} */
const config = {
	async headers() {
		return [
			{
				// matching all API routes
				source: "/api/:path*",
				headers: [
					{ key: "Access-Control-Allow-Origin", value: "*" },
					{
						key: "Access-Control-Allow-Methods",
						value: "*",
					},
					{
						key: "Access-Control-Allow-Headers",
						value: "*",
					},
				],
			},
		]
	},
	reactStrictMode: false,
	modularizeImports: {
		"@icons-pack/react-simple-icons": {
			transform: "@icons-pack/react-simple-icons/{{member}}",
		},
	},
	/**
	 * If you are using `appDir` then you must comment the below `i18n` config out.
	 *
	 * @see https://github.com/vercel/next.js/issues/41980
	 */
	i18n: {
		locales: ["en"],
		defaultLocale: "en",
	},
	transpilePackages: ["geist"],
	eslint: {
		ignoreDuringBuilds: true,
	},
	typescript: {
		ignoreBuildErrors: true,
	},
	output: "standalone",
}

export default config
