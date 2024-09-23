import { db } from "@/server/db"
import type { NextApiRequest, NextApiResponse } from "next"
import { kebabCase } from "lodash"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const { jsonId } = req.query
	const json = await db.assignmentJson.findFirst({
		where: {
			id: jsonId as string,
		},
		include: {
			assignment: true,
			batch: true,
		},
	})

	if (!json) {
		return res.status(404).json({ error: "JSON not found" })
	}

	const jsonData = JSON.stringify(json.data)

	// Set headers to force download of the JSON file
	res.setHeader("Content-Type", "application/json")
	res.setHeader(
		"Content-Disposition",
		`attachment; filename="${kebabCase(
			`${json.batch.name} ${json.assignment.name} ${json.category ? `category ${json.category}` : ``}`,
		)}.json"`,
	)

	// Send the JSON file to the client
	res.send(jsonData)
}
