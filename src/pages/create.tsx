import React, { useRef } from "react"
import MainLayout from "@/components/layouts/main-layout"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Container from "@/components/shared/container"
import JSONForm from "@/components/forms/json"
import { getJsonData, loadJson } from "@/utils/json"
import { Notebook } from "lucide-react"

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

const CreateJson = () => {
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
		<MainLayout>
			<Container className="my-10">
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
										form.reset(validated_data.data)
									}
								},
							})
						}
					}}
					className="hidden"
				/>

				<JSONForm form={form} importRef={importRef} />
			</Container>
		</MainLayout>
	)
}

export default CreateJson
