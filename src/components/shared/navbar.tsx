import React from "react"
import Container from "./container"
import Link from "next/link"
import { Button } from "../ui/button"
import { signIn, signOut, useSession } from "next-auth/react"

import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuIndicator,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
	NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const Navbar = () => {
	const { data: session } = useSession()

	return (
		<div>
			<Container className="py-5 flex items-center">
				<span className="font-bold text-xl">
					JSON<span className="text-normal">HUB</span>
				</span>

				<div className="ml-auto flex gap-5">
					<NavigationMenu>
						<NavigationMenuList>
							<NavigationMenuItem>
								<NavigationMenuLink
									asChild
									className={navigationMenuTriggerStyle()}
								>
									<Link href="/">Home</Link>
								</NavigationMenuLink>
								<NavigationMenuLink
									asChild
									className={navigationMenuTriggerStyle()}
								>
									<Link href="/create">Create</Link>
								</NavigationMenuLink>
							</NavigationMenuItem>
						</NavigationMenuList>
					</NavigationMenu>

					{session ? (
						<DropdownMenu>
							<DropdownMenuTrigger>
								<Avatar>
									<AvatarImage src={session.user.image as string} />
									<AvatarFallback>GH</AvatarFallback>
								</Avatar>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuLabel>My Account</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem>Dashboard</DropdownMenuItem>
								<DropdownMenuItem
									className="bg-destructive"
									onSelect={() => signOut()}
								>
									Logout
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					) : (
						<Button onClick={() => signIn("github")}>
							Sign In
						</Button>
					)}
				</div>
			</Container>
		</div>
	)
}

export default Navbar
