import { batchScheama } from "@/pages/dashboard/batches"
import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from "@/server/api/trpc"
import { z } from "zod"

export const batchRouter = createTRPCRouter({
	all: publicProcedure.query(async ({ ctx }) => {
		const data = await ctx.db.batch.findMany({
			include: { Assignment: true },
			orderBy: {
				createdAt: "desc",
			},
		})
		return data
	}),
	create: protectedProcedure
		.input(batchScheama)
		.mutation(async ({ ctx, input }) => {
			await ctx.db.batch.create({
				data: {
					name: input.name,
				},
			})
		}),
	update: protectedProcedure
		.input(
			z.object({
				id: z.string(),
				data: batchScheama,
			}),
		)
		.mutation(async ({ ctx, input }) => {
			await ctx.db.batch.update({
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
			console.log(input)
			await ctx.db.batch.delete({
				where: {
					id: input.id,
				},
			})
		}),
})
