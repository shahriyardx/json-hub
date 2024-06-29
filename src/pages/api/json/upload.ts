import { jsonCollection } from "@/utils/db"
import type { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const session = await getServerSession(req, res, authOptions)
	if (!session) return res.status(401).json({ error: "unauthorized" })

	if (req.method === "POST") {
		const jsonData = {
			...JSON.parse(req.body),
			email: session.user?.email,
			username: session.user?.name,
		}
		const data = await jsonCollection.insertOne(jsonData)
		return res.send({ data })
	}

	res.send({ error: "invalid method" })
}
