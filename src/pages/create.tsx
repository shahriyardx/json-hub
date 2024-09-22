import React from "react"
import MainLayout from "@/components/layouts/main-layout"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Container from "@/components/shared/container"
import JSONForm from "@/components/forms/json"

export const jsonSchema = z.object({
	highestMark: z.coerce.number().default(60),
	include: z.boolean().default(true),
	sections: z.array(
		z.object({
			name: z.string(),
			requirements: z.array(
				z.object({
					data: z.object({
						description: z.string(),
						marks: z.coerce.number(),
						okayMessage: z.string().default("okay"),
						notOkayMessage: z.string().default("not okay"),
					}),
					subRequirements: z.array(
						z.object({
							description: z.string(),
							marks: z.coerce.number(),
							okayMessage: z.string().default("okay"),
							notOkayMessage: z.string().default("not okay"),
						}),
					),
				}),
			),
		}),
	),
})

export type AssignmentJSON = z.infer<typeof jsonSchema>

const CreateJson = () => {
	const form = useForm<z.infer<typeof jsonSchema>>({
		resolver: zodResolver(jsonSchema),
		reValidateMode: "onChange",
		shouldUnregister: true,
	})

	return (
		<MainLayout>
			<Container className="mt-10">
				<JSONForm form={form} />
			</Container>
		</MainLayout>
	)
}

export default CreateJson
