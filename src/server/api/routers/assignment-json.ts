import { createTRPCRouter, publicProcedure } from "@/server/api/trpc"
import { z } from "zod"

export const assignmentJsonRouter = createTRPCRouter({
	batches: publicProcedure.query(async ({ ctx }) => {
		const data = await ctx.db.batch.findMany({ include: { Assignment: true } })
		return data
	}),

	all: publicProcedure
		.input(
			z.object({
				batch: z.string().optional(),
				assignment: z.string().optional(),
			}),
		)
		.query(async ({ ctx, input }) => {
			const where = { batchId: undefined, assignmentId: undefined } as {
				assignmentId?: string
				batchId?: string
			}

			if (input.batch) {
				where.batchId = input.batch
			}

			if (input.assignment) {
				where.assignmentId = input.assignment
			}
			const data = await ctx.db.assignmentJson.findMany({
				where: where,
				include: {
					user: true,
					assignment: true,
					batch: true,
				},
			})

			return data
		}),
})
