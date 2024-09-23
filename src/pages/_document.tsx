import { Head, Html, Main, NextScript } from "next/document"
import Script from "next/script"

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<title>JSON HUB</title>
				<meta
					name="description"
					content="Create upload your json files with ease"
				/>
			</Head>
			<body>
				<Main />
				<NextScript />
				{process.env.NODE_ENV === "production" && (
					<Script
						src="https://stats.shahriyar.dev/script.js"
						type="text/javascript"
						data-website-id="fe4bdcfa-13d2-4c9f-86a6-cf60917fb1b0"
						strategy="beforeInteractive"
					/>
				)}
			</body>
		</Html>
	)
}
