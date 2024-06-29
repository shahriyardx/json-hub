import { jsonCollection } from "@/utils/db"
import type { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const session = await getServerSession(req, res, authOptions)
	if (!session) return res.json({ data: [] })
	const data = await jsonCollection
		.find({ email: session?.user?.email })
		.toArray()
	res.send({ data: data })
}
