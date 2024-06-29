import { jsonCollection } from "@/utils/db"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const { batch, assignment } = req.query
	const query: Record<string, string | number | string[]> = {}

	if (batch) query.batch = batch
	if (assignment) query.assignment = assignment

	const allJsons = await jsonCollection.find(query).toArray()
	res.send({ data: allJsons })
}
