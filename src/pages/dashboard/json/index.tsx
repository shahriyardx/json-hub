import DashboardLayout from "@/components/layouts/dashboard-layout"
import { api } from "@/utils/api"
import React from "react"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const MyJson = () => {
	const { data } = api.assignmentJson.my.useQuery()

	return (
		<DashboardLayout title="My Json">
			<div>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Batch</TableHead>
							<TableHead>Assignment</TableHead>
							<TableHead>Category</TableHead>
							<TableHead>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{data?.map((json) => (
							<TableRow key={json.id}>
								<TableCell>{json.batch.name}</TableCell>
								<TableCell>{json.assignment.name}</TableCell>
								<TableCell>{json.category || "-"}</TableCell>
								<TableCell className="flex gap-2">
									<Button variant="outline" asChild>
										<Link href={`/dashboard/json/${json.id}`}>Edit</Link>
									</Button>
									<Button variant="destructive">Delete</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</DashboardLayout>
	)
}

export default MyJson
