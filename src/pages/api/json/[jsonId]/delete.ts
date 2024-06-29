import { jsonCollection } from "@/utils/db"
import type { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]"
import { ObjectId } from "mongodb"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const { jsonId } = req.query

	const session = await getServerSession(req, res, authOptions)
	if (!session) return res.status(401).json({ error: "unauthorized" })

	const data = await jsonCollection.deleteOne({
		_id: new ObjectId(jsonId as string),
		email: session.user?.email,
	})

	res.send({ data })
}
