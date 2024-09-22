import React, { type ComponentProps } from "react"
import Navbar from "../shared/navbar"
import { cn } from "@/lib/utils"

type Props = ComponentProps<"div">

const MainLayout = ({ children, className }: Props) => {
	return (
		<div className={cn(className)}>
			<Navbar />
			<main>{children}</main>
		</div>
	)
}

export default MainLayout
