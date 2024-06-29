import { download } from "@/utils/json"
import { Download } from "lucide-react"
import React, { useState } from "react"

const SingleJsonPublic = ({ data }: { data: Record<string, string> }) => {
	const [downloads, setDownloads] = useState(
		Number.parseInt(data.downloads) || 0,
	)

	return (
		<div className="p-5 flex justify-between gap-5 bg-zinc-800 rounded-md">
			<div>
				<p>{data.filename}</p>
				<p className="text-xs text-zinc-400 flex items-center gap-2 mt-3">
					<span>
						by: <span className="font-bold">{data.username}</span>
					</span>
					<span>Batch: {data.batch}</span>
					<span>Assignment: {data.assignment}</span>
				</p>
			</div>

			<div className="flex items-center gap-3">
				<button
					onClick={() => {
						fetch(`/api/json/${data._id}/download`)
						download(data.data, data.filename)
						setDownloads((prev) => prev + 1)
					}}
					type="button"
					className="flex items-center gap-2"
				>
					<Download size={18} />
					<span className="text-xs p-2 bg-zinc-900 rounded-md">
						{downloads}
					</span>
				</button>
			</div>
		</div>
	)
}

export default SingleJsonPublic
