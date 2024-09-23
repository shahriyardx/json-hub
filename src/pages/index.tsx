import React, { useEffect, useState } from "react"
import MainLayout from "@/components/layouts/main-layout"
import Container from "@/components/shared/container"
import { Badge } from "@/components/ui/badge"
import { DownloadIcon, Link } from "lucide-react"
import { Button } from "@/components/ui/button"
import { api } from "@/utils/api"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { AvatarImage } from "@radix-ui/react-avatar"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { download } from "@/utils/json"
import { kebabCase } from "lodash"
import { toast } from "sonner"

const Homepage = () => {
	const [batch, setBatch] = useState<string | undefined>("")
	const [assignment, setAssignment] = useState<string | undefined>("")

	const { data: batches } = api.batch.all.useQuery()
	const { data } = api.assignmentJson.all.useQuery({
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
			<div className="mt-5">
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
							<Card key={jsn.id}>
								<CardHeader>
									<div className="flex gap-2">
										<Avatar className="w-5 h-5">
											<AvatarImage src={jsn.user.image} />
											<AvatarFallback>GH</AvatarFallback>
										</Avatar>

										<span>{jsn.user.name}</span>
									</div>
								</CardHeader>
								<CardContent>
									<div className="flex gap-2">
										<Badge>{jsn.batch.name}</Badge>
										<Badge variant="secondary">{jsn.assignment.name}</Badge>
										{jsn.category && (
											<Badge variant="outline">Category {jsn.category}</Badge>
										)}
									</div>
								</CardContent>
								<CardFooter className="flex justify-between">
									<span className="flex items-center gap-2 text-muted-foreground text-sm">
										{jsn.downloads} Downloads
									</span>

									<div className="flex gap-2 items-center">
										<Button
											size="sm"
											onClick={() =>
												download(
													jsn.data,
													kebabCase(
														`${jsn.batch.name} ${jsn.assignment.name} ${jsn.category ? `category ${jsn.category}` : ``}`,
													),
												)
											}
										>
											<DownloadIcon className="mr-2" size={15} />
											Download
										</Button>
										<Button
											size="icon"
											variant="secondary"
											onClick={() => {
												window.navigator.clipboard.writeText(
													`${window.location.origin}/api/json/${jsn.id}`,
												)
												toast.success("Link copied to clipboard")
											}}
										>
											<Link size={15} />
										</Button>
									</div>
								</CardFooter>
							</Card>
						))}
					</div>
				</Container>
			</div>
		</MainLayout>
	)
}

export default Homepage
