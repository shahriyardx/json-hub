import { Head, Html, Main, NextScript } from "next/document"
import Script from "next/script"

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<title>JSON Hub</title>
			</Head>
			<body>
				<Main />
				<NextScript />
				<Script
					src="https://umami.shahriyar.dev/script.js"
					type="text/javascript"
					data-website-id="6262683a-a600-47ee-9357-37728d634fda"
					strategy="beforeInteractive"
				/>
			</body>
		</Html>
	)
}
