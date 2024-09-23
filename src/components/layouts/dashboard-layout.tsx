import React, { type ReactNode, type ComponentProps } from "react"
import Container from "../shared/container"
import type { LinkProps } from "next/link"
import Link from "next/link"
import {
	BookCheck,
	Braces,
	ListIcon,
	Plus,
	type LucideIcon,
} from "lucide-react"
import { Button } from "../ui/button"
import { useRouter } from "next/router"
import { ScrollArea } from "../ui/scroll-area"

type Props = ComponentProps<"div"> & {
	title?: string
}

const DashboardLayout = ({ children, title }: Props) => {
	return (
		<Container className="grid grid-cols-[300px_auto]">
			<div className="border-r h-screen">
				<div className="py-3">
					<p className="text-2xl font-bold">Dashboard</p>
					<p className="text-muted-foreground">V2.0.0</p>
				</div>

				<div className="mt-5">
					<SidebarLink href="/dashboard/jsons" Icon={Braces}>
						JSON
					</SidebarLink>
					<SidebarLink href="/dashboard/jsons/add" Icon={Plus}>
						Add JSON
					</SidebarLink>
					<SidebarLink href="/dashboard/batches" Icon={ListIcon}>
						Batches
					</SidebarLink>
					<SidebarLink href="/dashboard/assignments" Icon={BookCheck}>
						Assignments
					</SidebarLink>
				</div>
			</div>
			<div>
				<ScrollArea className="h-screen p-5">
					{title && <h2 className="text-xl font-bold">{title}</h2>}

					<div className="mt-5">{children}</div>
				</ScrollArea>
			</div>
		</Container>
	)
}

export default DashboardLayout

type SidebarLinkProps = LinkProps & {
	children: ReactNode
	Icon: LucideIcon
}
const SidebarLink = ({ href, children, Icon }: SidebarLinkProps) => {
	const router = useRouter()
	const active = router.asPath === href

	return (
		<Button
			asChild
			variant={active ? "secondary" : "ghost"}
			className="rounded-none w-full justify-start"
		>
			<Link href={href}>
				<>
					<Icon size={15} className="mr-2" />
					{children}
				</>
			</Link>
		</Button>
	)
}
