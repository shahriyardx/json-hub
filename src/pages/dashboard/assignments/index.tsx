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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
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
import type { Assignment, Batch } from "@prisma/client"
import { DataTable } from "@/components/ui/data-table"

export const assignmentScheama = z.object({
	name: z.string().min(1),
	batch: z.string(),
})

export type AssignmentData = z.infer<typeof assignmentScheama>

const Assignments = () => {
	const form = useForm<AssignmentData>({
		resolver: zodResolver(assignmentScheama),
	})

	const { data: batches } = api.batch.all.useQuery()
	const { data: assignments, refetch } = api.assignment.all.useQuery()
	const { mutate: createAssignment } = api.assignment.create.useMutation({
		onSuccess: () => {
			const values = form.getValues()
			form.reset({
				...values,
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

	const columns: ColumnDef<Assignment & { batch: Batch }>[] = [
		{
			accessorKey: "name",
			header: "Name",
		},
		{
			accessorKey: "batchId",
		},
		{
			accessorKey: "batch",
			header: "Batch",
			cell: ({ row }) => {
				return row.original.batch.name
			},
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
							<div className="grid grid-cols-2 gap-5">
								<FormField
									control={form.control}
									name="batch"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Batch</FormLabel>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Select batch" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{batches?.sort(sortByName).map((b) => (
														<SelectItem key={b.id} value={b.id}>
															{b.name}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>

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
							</div>

							<Button className="mt-5">Create</Button>
						</form>
					</Form>
				</div>
			</fieldset>

			<div className="mt-10">
				<h4 className="text-xl font-bold">All Assignments</h4>
				<Select
					onValueChange={(val) => {
						if (val === "all") {
							table.getColumn("batchId")?.setFilterValue(undefined)
						} else {
							table.getColumn("batchId")?.setFilterValue(val)
						}
					}}
				>
					<SelectTrigger className="my-4">
						<SelectValue placeholder="Select Batch" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All</SelectItem>
						{batches?.map((batch) => (
							<SelectItem value={batch.id} key={batch.id}>
								{batch.name}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				<DataTable table={table} />
			</div>
		</DashboardLayout>
	)
}

export default Assignments
