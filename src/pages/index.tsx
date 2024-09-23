import React, { useEffect, useState } from "react"
import MainLayout from "@/components/layouts/main-layout"
import Container from "@/components/shared/container"
import { api } from "@/utils/api"
import JsonCard from "@/components/shared/json-card"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"

const Homepage = () => {
	const [batch, setBatch] = useState<string | undefined>("")
	const [assignment, setAssignment] = useState<string | undefined>("")

	const { data: batches } = api.batch.all.useQuery()
	const { data, refetch } = api.assignmentJson.all.useQuery({
		batch,
		assignment,
	})

	const availableAssignments =
		batch && batches
			? batches.find((b) => b.id === batch)?.Assignment || []
			: []

	useEffect(() => {
		if (batch) {
			setAssignment("")
		}
	}, [batch])
	return (
		<MainLayout>
			<div className="mt-5 mb-10">
				<Container>
					<div className="grid grid-cols-2 gap-5">
						<Select onValueChange={(val) => setBatch(val)}>
							<SelectTrigger className="">
								<SelectValue placeholder="Select Batch" />
							</SelectTrigger>
							<SelectContent>
								{batches?.map((batch) => (
									<SelectItem key={batch.id} value={batch.id}>
										{batch.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>

						{batch && (
							<Select
								value={assignment}
								onValueChange={(val) => setAssignment(val)}
							>
								<SelectTrigger className="">
									<SelectValue placeholder="Select Assignment" />
								</SelectTrigger>
								<SelectContent>
									{availableAssignments.map((aa) => (
										<SelectItem key={aa.id} value={aa.id}>
											{aa.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						)}
					</div>

					<div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
						{data?.map((jsn) => (
							<JsonCard json={jsn} key={jsn.id} onDownload={() => refetch()} />
						))}
					</div>
				</Container>
			</div>
		</MainLayout>
	)
}

export default Homepage
