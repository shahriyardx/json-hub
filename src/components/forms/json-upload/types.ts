import { z } from "zod"

export const JsonUploadSchema = z.object({
	batch: z.string(),
	assignment: z.string(),
	category: z.string().optional(),
	data: z.string(),
})

export type JsonUpload = z.infer<typeof JsonUploadSchema>
