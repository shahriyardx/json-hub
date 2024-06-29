import Container from "@/components/container"
import Layout from "@/components/layout"
import { NotebookIcon, PlusIcon } from "lucide-react"
import Link from "next/link"
import React from "react"

const Home = () => {
	return (
		<Container className="grid place-items-center aspect-video">
			<div>
				<h1 className="text-center">
					<span className="font-extrabold">JSON</span>
					<span className="font-thin">HUB</span>
				</h1>
				<p className="text-zinc-400 text-center">
					download and create json files
				</p>
				<div className="flex items-center justify-center gap-3 mt-5">
					<div>
						<Link
							href="/create"
							type="button"
							className="w-32 bg-zinc-800 hover:bg-zinc-700 rounded-md aspect-square grid place-items-center gap-2"
						>
							<PlusIcon />
						</Link>
						<p className="text-center mt-2">create</p>
					</div>
					<div>
						<Link
							href="/explore"
							type="button"
							className="w-32 bg-zinc-800 hover:bg-zinc-700 rounded-md aspect-square grid place-items-center gap-2"
						>
							<NotebookIcon />
						</Link>
						<p className="text-center mt-2">explore</p>
					</div>
				</div>
			</div>
		</Container>
	)
}

export default Home
