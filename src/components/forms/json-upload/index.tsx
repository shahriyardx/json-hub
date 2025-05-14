import { api } from "@/utils/api"
import React, { type ComponentProps, useEffect, useRef } from "react"
import type { UseFormReturn } from "react-hook-form"
import { isValid, z } from "zod"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { loadJson } from "@/utils/json"
import type { JsonUpload } from "./types"
import { sortByName } from "@/utils/sort"

type Props = ComponentProps<"div"> & {
	submitHandler: (values: JsonUpload) => void
	form: UseFormReturn<JsonUpload>
	type: "create" | "update"
}

const JsonUploadForm = ({ className, submitHandler, form, type }: Props) => {
	const importRef = useRef<HTMLInputElement>(null)

	const { data: batches } = api.batch.all.useQuery()
	const { data: assignments } = api.assignment.all.useQuery()

	return (
		<div className={className}>
			<input
				ref={importRef}
				type="file"
				accept="application/json"
				onChange={(e) => {
					const file = e.target.files?.[0]
					if (file) {
						loadJson({
							file,
							onload: (data) => {
								const values = form.getValues()

								form.reset({
									...values,
									data: JSON.stringify(data, undefined, 4),
								})
							},
						})
					}
				}}
				className="hidden"
			/>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit((values) => {
						submitHandler(values)
					})}
				>
					<div className="grid grid-cols-3 gap-5">
						<FormField
							control={form.control}
							name="batch"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Select Batch</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select Batch" />
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
							name="assignment"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Select Assignment</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select Assignment" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectContent>
												{assignments?.map((b) => (
													<SelectItem key={b.id} value={b.id}>
														{b.name}
													</SelectItem>
												))}
											</SelectContent>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="category"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Category</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<Input placeholder="Category (Optional)" {...field} />
										</FormControl>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<div className="mt-5">
						<FormField
							control={form.control}
							name="data"
							render={({ field }) => (
								<FormItem>
									<FormLabel>JSON Data</FormLabel>
									<FormControl>
										<Textarea
											rows={20}
											placeholder="insert json data here"
											className="resize-none"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<div className="mt-5 flex gap-2">
						<Button>Submit</Button>
						<Button
							variant="secondary"
							type="button"
							onClick={() => importRef?.current?.click()}
						>
							Import
						</Button>
					</div>
				</form>
			</Form>
		</div>
	)
}

export default JsonUploadForm
