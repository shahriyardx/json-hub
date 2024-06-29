import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { Inter } from "next/font/google"
import { SessionProvider } from "next-auth/react"
import { Toaster } from "react-hot-toast"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const inter = Inter({ subsets: ["latin"] })
const queryClient = new QueryClient()

export default function App({
	Component,
	pageProps: { session, ...pageProps },
}: AppProps) {
	return (
		<div className={inter.className}>
			<Toaster />
			<QueryClientProvider client={queryClient}>
				<SessionProvider session={session}>
					<Component {...pageProps} />
				</SessionProvider>
			</QueryClientProvider>
		</div>
	)
}
