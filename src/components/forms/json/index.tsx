import React from "react"
import type { AssignmentJSON } from "@/pages/create"
import { useFieldArray, type UseFormReturn } from "react-hook-form"
import { Form, FormMessage } from "@/components/ui/form"
import Section from "./section"
import { Button } from "@/components/ui/button"
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

type Props = {
	form: UseFormReturn<AssignmentJSON>
}

const JSONForm = ({ form }: Props) => {
	const sections = useFieldArray({
		control: form.control,
		name: "sections",
	})

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(console.log)} className="space-y-5">
				{sections.fields.map((section, index) => (
					<Section
						key={section.id}
						form={form}
						sections={sections}
						section={section}
						index={index}
					/>
				))}

				<div className="grid grid-cols-2 gap-5">
					<FormField
						control={form.control}
						name="highestMark"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input placeholder="Highest Mark" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="include"
						render={({ field }) => (
							<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md ">
								<FormControl>
									<Checkbox
										checked={field.value}
										onCheckedChange={field.onChange}
									/>
								</FormControl>
								<div className="space-y-1 leading-none">
									<FormLabel>
										Include description with sub-requirement
									</FormLabel>
									<FormDescription>
										The sub-requirement description should also include with
										feedback
									</FormDescription>
								</div>
							</FormItem>
						)}
					/>
				</div>
			</form>

			<div className="flex gap-2 mt-5">
				{sections.fields.length > 0 && (
					<Button
						type="button"
						onClick={() => form.handleSubmit(console.log)()}
					>
						Downlaod
					</Button>
				)}
				<Button
					variant="secondary"
					onClick={() =>
						sections.append({
							name: "",
							requirements: [],
						})
					}
				>
					Add Section
				</Button>
			</div>
		</Form>
	)
}

export default JSONForm
