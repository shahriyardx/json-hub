import { jsonCollection } from "@/utils/db"
import type { NextApiRequest, NextApiResponse } from "next"
import { ObjectId } from "mongodb"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const { jsonId } = req.query
	const data = await jsonCollection.updateOne(
		{
			_id: new ObjectId(jsonId as string),
		},
		{
			$inc: {
				downloads: 1,
			},
		},
	)

	res.send({ data })
}
