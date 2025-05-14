import DashboardLayout from "@/components/layouts/dashboard-layout"
import { Button } from "@/components/ui/button"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
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
import { Input } from "@/components/ui/input"
import { api } from "@/utils/api"
import { zodResolver } from "@hookform/resolvers/zod"
import React from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { sortByName } from "@/utils/sort"
import {
	type ColumnDef,
	getCoreRowModel,
	getFilteredRowModel,
	useReactTable,
} from "@tanstack/react-table"
import type { Assignments } from "@prisma/client"
import { DataTable } from "@/components/ui/data-table"

export const assignmentScheama = z.object({
	name: z.string().min(1),
})

export type AssignmentData = z.infer<typeof assignmentScheama>

const AssignmentsPage = () => {
	const form = useForm<AssignmentData>({
		resolver: zodResolver(assignmentScheama),
	})

	const { data: assignments, refetch } = api.assignment.all.useQuery()
	const { mutate: createAssignment } = api.assignment.create.useMutation({
		onSuccess: () => {
			form.reset({
				name: "",
			})
			toast.success("Assignment created")
			refetch()
		},
	})

	const { mutate: deleteAssignment } = api.assignment.delete.useMutation({
		onSuccess: () => {
			toast.success("Assignment deleted")
			refetch()
		},
	})

	const columns: ColumnDef<Assignments>[] = [
		{
			accessorKey: "name",
			header: "Name",
		},
		{
			header: "Actions",
			cell: ({ row }) => {
				return (
					<div className="flex gap-2">
						<AlertDialog>
							<AlertDialogTrigger asChild>
								<Button variant="destructive">Delete</Button>
							</AlertDialogTrigger>
							<AlertDialogContent>
								<AlertDialogHeader>
									<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
									<AlertDialogDescription>
										This action cannot be undone. This will permanently delete
										this json.
									</AlertDialogDescription>
								</AlertDialogHeader>
								<AlertDialogFooter>
									<AlertDialogCancel>Cancel</AlertDialogCancel>
									<AlertDialogAction
										onClick={() => deleteAssignment({ id: row.original.id })}
									>
										Continue
									</AlertDialogAction>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
					</div>
				)
			},
		},
	]
	const table = useReactTable({
		columns,
		data: assignments?.sort(sortByName) ?? [],
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		state: {
			columnVisibility: {
				batchId: false,
			},
		},
	})

	return (
		<DashboardLayout title="Assignments">
			<fieldset className="p-5 border rounded-md">
				<legend className="px-2">Create Assignment</legend>
				<div>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit((values) => createAssignment(values))}
						>
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Assignment Name</FormLabel>
										<FormControl>
											<Input placeholder="Name" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<Button className="mt-5">Create</Button>
						</form>
					</Form>
				</div>
			</fieldset>

			<div className="mt-10">
				<h4 className="text-xl font-bold">All Assignments</h4>
				<DataTable table={table} />
			</div>
		</DashboardLayout>
	)
}

export default AssignmentsPage
