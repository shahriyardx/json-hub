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
		const data = await ctx.db.assignments.findMany({
			orderBy: {
				createdAt: "desc",
			},
		})
		return data
	}),
	create: protectedProcedure
		.input(assignmentScheama)
		.mutation(async ({ ctx, input }) => {
			await ctx.db.assignments.create({
				data: {
					name: input.name,
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
			await ctx.db.assignments.update({
				where: {
					id: input.id,
				},
				data: {
					name: input.data.name,
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
			await ctx.db.assignments.delete({
				where: {
					id: input.id,
				},
			})
		}),
})
