import { db } from "@/server/db"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const batches = await db.batch.findMany({
    select: {
      name: true,
      id: true,
    }
  })
  res.json(batches)
}
