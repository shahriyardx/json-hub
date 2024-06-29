import React from "react"
import { useMutation, useQuery } from "@tanstack/react-query"
import { Download, Loader2, Trash } from "lucide-react"
import { useSession } from "next-auth/react"
import { download } from "@/utils/json"

const MyJson = () => {
	const { data } = useSession()
	const { data: jsonData, refetch } = useQuery({
		queryKey: ["my-json", data?.user?.email],
		queryFn: () => fetch("/api/json/me").then((response) => response.json()),
		enabled: Boolean(data),
		initialData: { data: [] },
	})

	const { mutate, isPending } = useMutation({
		mutationKey: ["delete"],
		mutationFn: (_id: string) =>
			fetch(`/api/json/${_id}/delete`, {
				method: "DELETE",
			}),
		onSuccess: () => {
			refetch()
		},
	})

	return (
		<div className="grid grid-cols-2 gap-5">
			{jsonData.data.length === 0 && <p>No JSON to show</p>}
			{jsonData.data.map((data: Record<string, string>) => (
				<div
					key={data._id}
					className="p-5 flex justify-between gap-5 bg-zinc-800 rounded-md"
				>
					<div>
						<p>{data.filename}</p>
						<p className="text-xs text-zinc-400 flex items-center gap-2 mt-3">
							<span>Batch: {data.batch}</span>
							<span>Assignment: {data.assignment}</span>
						</p>
					</div>

					<div className="flex items-center gap-3">
						<button
							onClick={() => download(data.data, data.filename)}
							type="button"
						>
							<Download size={18} />
						</button>
						<button
							onClick={() => {
								const res = confirm("are you sure?")
								if (res) {
									mutate(data._id)
								}
							}}
							type="button"
						>
							{isPending ? (
								<Loader2 size={18} className="animate-spin" />
							) : (
								<Trash size={18} />
							)}
						</button>
					</div>
				</div>
			))}
		</div>
	)
}

export default MyJson
