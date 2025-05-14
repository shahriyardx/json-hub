import { db } from "@/server/db"
import type { NextApiRequest, NextApiResponse } from "next"
import { kebabCase } from "lodash"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const oldJsons = await db.assignmentJson.findMany({
		include: {
			assignment: true,
		},
	})

	const assignments = await db.assignment.findMany({})

	for (const a of assignments) {
		const e = await db.assignments.findFirst({
			where: {
				name: a.name,
			},
		})

		if (!e) {
			await db.assignments.create({
				data: {
					name: a.name,
				},
			})
		}
	}

	oldJsons.forEach(async (json_data) => {
		const a = await db.assignments.findFirst({
			where: {
				name: json_data.assignment.name,
			},
		})

		if (a) {
			await db.jsonData.create({
				data: {
					batchId: json_data.batchId,
					userId: json_data.userId,
					downloads: json_data.downloads,
					assignmentId: a.id,
					category: json_data.category,
					data: json_data.data,
				},
			})
		}
	})

	return res.json({ migrated: true })
}
