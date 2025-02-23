import { db } from "@/server/db"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { assignmentId } = req.query
  const jsons = await db.assignmentJson.findMany({
    where: {
      assignmentId: assignmentId as string,
    },
    include: {
      assignment: true,
      batch: true,
      user: true,
    }
  })
  res.json(jsons)
}
