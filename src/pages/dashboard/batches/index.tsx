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
import { DataTable } from "@/components/ui/data-table"
import type { Batch, JsonData } from "@prisma/client"

export const batchScheama = z.object({
	name: z.string().min(1),
})

export type BatchData = z.infer<typeof batchScheama>

const Bathces = () => {
	const form = useForm<BatchData>({
		resolver: zodResolver(batchScheama),
	})
	const { data: batches, refetch } = api.batch.all.useQuery()
	const { mutate: createBatch } = api.batch.create.useMutation({
		onSuccess: () => {
			form.reset({
				name: "",
			})
			toast.success("Batch created")
			refetch()
		},
	})

	const { mutate: deleteBatch } = api.batch.delete.useMutation({
		onSuccess: () => {
			form.reset()
			toast.success("Batch deleted")
			refetch()
		},
	})

	const columns: ColumnDef<Batch & { jsons: Pick<JsonData, "id">[] }>[] = [
		{
			accessorKey: "name",
			header: "Name",
		},
		{
			header: "JSON",
			cell: ({ row }) => {
				return <span>{row.original.jsons.length}</span>
			},
		},
		{
			header: "Actions",
			cell: ({ row }) => {
				return (
					<AlertDialog>
						<AlertDialogTrigger asChild>
							<Button variant="destructive">Delete</Button>
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
								<AlertDialogDescription>
									This action cannot be undone. This will permanently delete the
									batch and all associated assignment and json data with it
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>Cancel</AlertDialogCancel>
								<AlertDialogAction
									onClick={() => deleteBatch({ id: row.original.id })}
								>
									Confirm
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				)
			},
		},
	]

	const table = useReactTable({
		columns,
		data: batches ? batches : [],
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
	})

	return (
		<DashboardLayout title="Batches">
			<fieldset className="p-5 border rounded-md">
				<legend className="px-2">Create Batch</legend>
				<div>
					<Form {...form}>
						<form onSubmit={form.handleSubmit((values) => createBatch(values))}>
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Batch Name</FormLabel>
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
				<h4 className="text-xl font-bold mb-2">All Batches</h4>
				<DataTable table={table} />
			</div>
		</DashboardLayout>
	)
}

export default Bathces
