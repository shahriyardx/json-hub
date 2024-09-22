import React, { type RefObject } from "react"
import type { AssignmentJSON } from "@/pages/create"
import type { UseFormReturn } from "react-hook-form"
import { Form, FormMessage } from "@/components/ui/form"
import Sections from "./sections"
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
import { download, toLegacy } from "@/utils/json"

type Props = {
	form: UseFormReturn<AssignmentJSON>
	importRef: RefObject<HTMLInputElement>
}

const JSONForm = ({ form, importRef }: Props) => {
	const downloadJson = (data: AssignmentJSON) => {
		if (data.include) {
			download(toLegacy(data), "")
		} else {
			download(
				{
					type: "new",
					...data,
				},
				"",
			)
		}
	}

	return (
		<div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(downloadJson)} className="space-y-5">
					<Sections form={form} />

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
			</Form>

			<div className="flex gap-2 mt-5">
				<Button type="button" onClick={form.handleSubmit(downloadJson)}>
					Downlaod
				</Button>

				<Button
					type="button"
					variant="outline"
					onClick={() => importRef?.current?.click()}
				>
					Import
				</Button>
			</div>
		</div>
	)
}

export default JSONForm
