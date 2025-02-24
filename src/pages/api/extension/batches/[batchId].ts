import { db } from "@/server/db"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const { batchId } = req.query
	const assignments = await db.assignment.findMany({
		where: {
			batchId: batchId as string,
		},
		select: {
			id: true,
			name: true,
		},
	})
	res.json(assignments)
}
