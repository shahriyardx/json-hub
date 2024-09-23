import React from "react"
import Container from "./container"
import Link from "next/link"

const Footer = () => {
	return (
		<div className="bg-zinc-900 py-10 ">
			<Container>
				Made with 💖 by{" "}
				<Link
					href="https://github.com/shahriyardx"
					className="text-indigo-500"
					target="_blank"
				>
					Shahriyar
				</Link>
			</Container>
		</div>
	)
}

export default Footer
