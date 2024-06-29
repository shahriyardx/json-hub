import type React from "react"

interface Props extends React.ComponentProps<"div"> {
	children?: React.ReactNode
}

const Container = ({ children, className }: Props) => {
	return <div className={`container mx-auto px-5 ${className}`}>{children}</div>
}

export default Container
