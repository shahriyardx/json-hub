import { cn } from "@/lib/utils"
import React, { type ComponentProps } from "react"

type Props = ComponentProps<"div">

const Container = ({ children, className }: Props) => {
	return (
		<div className={cn("container mx-auto px-5", className)}>{children}</div>
	)
}

export default Container
