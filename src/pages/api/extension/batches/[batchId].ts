import { db } from "@/server/db"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const assignments = await db.assignments.findMany({
		select: {
			id: true,
			name: true,
		},
	})
	res.json(assignments)
}
