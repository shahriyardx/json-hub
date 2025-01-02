import React, { useContext, useRef } from "react"
import { useForm } from "react-hook-form"
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
import { download, getJsonData, loadJson, toLegacy } from "@/utils/json"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { marksContext, type MarksContextProps } from "@/context/marks-context"

export const jsonSchema = z.object({
	highestMark: z.coerce.number().default(60),
	include: z.boolean().default(true),
	sections: z.array(
		z.object({
			name: z.string(),
			requirements: z
				.array(
					z.object({
						data: z.object({
							description: z.string(),
							number: z.coerce.number(),
							correct: z.boolean().default(true),
							okayMessage: z.string().default("okay"),
							notOkayMessage: z.string().default("not okay"),
						}),
						subRequirements: z.array(
							z.object({
								description: z.string(),
								number: z.coerce.number(),
								correct: z.boolean().default(true),
								okayMessage: z.string().default("okay"),
								notOkayMessage: z.string().default("not okay"),
							}),
						),
					}),
				)
				.default([]),
		}),
	),
})

export type AssignmentJSON = z.infer<typeof jsonSchema>

const JSONForm = () => {
	const { setRequirements, marks } = useContext(
		marksContext,
	) as MarksContextProps
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

	const importRef = useRef<HTMLInputElement>(null)
	const form = useForm<z.infer<typeof jsonSchema>>({
		resolver: zodResolver(jsonSchema),
		reValidateMode: "onChange",
		shouldUnregister: true,
		defaultValues: {
			include: true,
		},
	})

	return (
		<div>
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
								const jsonData = getJsonData(data)
								const validated_data = jsonSchema.safeParse(jsonData)

								if (validated_data.success) {
									const obj: Record<string, number> = {}
									validated_data.data.sections.forEach(
										(section, sectionIndex) => {
											section.requirements.forEach((req, reqIndex) => {
												obj[
													`sections.${sectionIndex}.requirements.${reqIndex}`
												] = req.data.number
											})
										},
									)

									setTimeout(() => {
										setRequirements(obj)
									}, 500) // Yeah! Weired. But it works

									form.reset(validated_data.data)
								}
							},
						})
					}
				}}
				className="hidden"
			/>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(downloadJson)} className="space-y-5">
					<Sections form={form} />

					<div className="whitespace-nowrap">
						<span className="text-zinc-400">Marks Added :</span> {marks}
					</div>

					<div className="grid grid-cols-2 gap-5 w-full">
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
