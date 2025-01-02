import { JsonUploadSchema } from "@/components/forms/json-upload/types"
import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from "@/server/api/trpc"
import { z } from "zod"

export const assignmentJsonRouter = createTRPCRouter({
	download: publicProcedure
		.input(z.object({ id: z.string() }))
		.mutation(async ({ ctx, input }) => {
			await ctx.db.assignmentJson.update({
				where: {
					id: input.id,
				},
				data: {
					downloads: { increment: 1 },
				},
			})
		}),
	delete: protectedProcedure
		.input(z.object({ id: z.string() }))
		.mutation(async ({ ctx, input }) => {
			await ctx.db.assignmentJson.delete({
				where: {
					id: input.id,
					userId: ctx.session.user.id,
				},
			})
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
				orderBy: {
					createdAt: "desc",
				},
			})

			return data
		}),
	my: protectedProcedure.query(async ({ ctx }) => {
		const data = await ctx.db.assignmentJson.findMany({
			where: { userId: ctx.session.user.id },
			include: {
				user: true,
				assignment: true,
				batch: true,
			},
			orderBy: {
				createdAt: "desc",
			},
		})

		return data
	}),
	create: protectedProcedure
		.input(JsonUploadSchema)
		.mutation(async ({ ctx, input }) => {
			await ctx.db.assignmentJson.create({
				data: {
					data: input.data,
					batchId: input.batch,
					assignmentId: input.assignment,
					category: input.category,
					userId: ctx.session.user.id,
				},
			})
		}),
	update: protectedProcedure
		.input(
			z.object({
				id: z.string(),
				data: JsonUploadSchema,
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const data = input.data

			await ctx.db.assignmentJson.update({
				where: {
					id: input.id,
				},
				data: {
					data: data.data,
					batchId: data.batch,
					assignmentId: data.assignment,
					category: data.category,
					userId: ctx.session.user.id,
				},
			})
		}),
})
