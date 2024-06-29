import type React from "react"

type Props = {
	label?: string
	children: React.ReactNode
	className?: string
}

const LabledInput = ({ label, children, className }: Props) => {
	return (
		<div className={`flex flex-col gap-1 ${className}`}>
			<label className="text-xs">{label}</label>
			{children}
		</div>
	)
}

export default LabledInput
