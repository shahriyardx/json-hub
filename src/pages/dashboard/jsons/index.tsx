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
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { toast } from "sonner"

const MyJson = () => {
	const { data, refetch } = api.assignmentJson.my.useQuery()

	const { mutate: deleteJson } = api.assignmentJson.delete.useMutation({
		onSuccess: () => {
			toast.success("Json deleted")
			refetch()
		},
	})

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
										<Link href={`/dashboard/jsons/${json.id}`}>Edit</Link>
									</Button>
									<AlertDialog>
										<AlertDialogTrigger asChild>
											<Button variant="destructive">Delete</Button>
										</AlertDialogTrigger>
										<AlertDialogContent>
											<AlertDialogHeader>
												<AlertDialogTitle>
													Are you absolutely sure?
												</AlertDialogTitle>
												<AlertDialogDescription>
													This action cannot be undone. This will permanently
													delete this json.
												</AlertDialogDescription>
											</AlertDialogHeader>
											<AlertDialogFooter>
												<AlertDialogCancel>Cancel</AlertDialogCancel>
												<AlertDialogAction
													onClick={() => deleteJson({ id: json.id })}
												>
													Continue
												</AlertDialogAction>
											</AlertDialogFooter>
										</AlertDialogContent>
									</AlertDialog>
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
