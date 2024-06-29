import { signIn, useSession } from "next-auth/react"
import Image from "next/image"
import Link, { type LinkProps } from "next/link"
import { useRouter } from "next/router"
import type React from "react"

const Header = () => {
	const { data } = useSession()
	return (
		<div>
			<div className="container mx-auto px-5 py-3 flex items-center">
				<Link href="/">
					<span className="font-extrabold">JSON</span>
					<span className="font-thin">HUB</span>
				</Link>

				<div className="flex items-center gap-5 ml-auto">
					<NavLink href="/create">create</NavLink>
					<NavLink href="/explore">explore</NavLink>

					{data ? (
						<Link href="/profile">
							<Image
								src={data.user?.image || ""}
								alt={data.user?.name as string}
								width={80}
								height={80}
								className="w-8 h-8 rounded-full"
							/>
						</Link>
					) : (
						<button
							type="button"
							onClick={() => signIn("github", { callbackUrl: "/profile" })}
							className="px-8 py-2 bg-zinc-700 rounded-md"
						>
							login
						</button>
					)}
				</div>
			</div>
		</div>
	)
}

const NavLink = ({
	href,
	children,
}: LinkProps & { children: React.ReactNode }) => {
	const router = useRouter()
	const active = router.pathname === href

	return (
		<Link href={href} className={`${active ? "font-bold" : "text-zinc-400"}`}>
			{children}
		</Link>
	)
}

export default Header
