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

export const assignmentScheama = z.object({
	name: z.string().min(1),
	batch: z.string(),
})

export type Assignment = z.infer<typeof assignmentScheama>

const Assignments = () => {
	const form = useForm<Assignment>({
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
													{batches?.map((b) => (
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
				<Table className="mt-2">
					<TableHeader>
						<TableRow className="bg-secondary">
							<TableHead>Name</TableHead>
							<TableHead>Batch</TableHead>
							<TableHead>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{assignments?.map((b) => (
							<TableRow key={b.id}>
								<TableCell>{b.name}</TableCell>
								<TableCell>{b.batch.name}</TableCell>
								<TableCell>
									<AlertDialog>
										<AlertDialogTrigger>
											<Button variant="destructive">Delete</Button>
										</AlertDialogTrigger>
										<AlertDialogContent>
											<AlertDialogHeader>
												<AlertDialogTitle>
													Are you absolutely sure?
												</AlertDialogTitle>
												<AlertDialogDescription>
													This action cannot be undone. This will permanently
													delete this assignment and all associated json of it.
												</AlertDialogDescription>
											</AlertDialogHeader>
											<AlertDialogFooter>
												<AlertDialogCancel>Cancel</AlertDialogCancel>
												<AlertDialogAction
													onClick={() => deleteAssignment({ id: b.id })}
												>
													Confirm
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

export default Assignments
