import { assignmentScheama } from "@/pages/dashboard/assignments"
import { batchScheama } from "@/pages/dashboard/batches"
import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from "@/server/api/trpc"
import { z } from "zod"

export const assignmentRouter = createTRPCRouter({
	all: publicProcedure.query(async ({ ctx }) => {
		const data = await ctx.db.assignment.findMany({
			include: { batch: true },
			orderBy: {
				createdAt: "desc",
			},
		})
		return data
	}),
	create: protectedProcedure
		.input(assignmentScheama)
		.mutation(async ({ ctx, input }) => {
			await ctx.db.assignment.create({
				data: {
					name: input.name,
					batchId: input.batch,
				},
			})
		}),
	update: protectedProcedure
		.input(
			z.object({
				id: z.string(),
				data: assignmentScheama,
			}),
		)
		.mutation(async ({ ctx, input }) => {
			await ctx.db.assignment.update({
				where: {
					id: input.id,
				},
				data: {
					name: input.data.name,
					batchId: input.data.batch,
				},
			})
		}),
	delete: protectedProcedure
		.input(
			z.object({
				id: z.string(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			console.log(input)
			await ctx.db.assignment.delete({
				where: {
					id: input.id,
				},
			})
		}),
})
