import { MongoClient } from "mongodb"

const client = new MongoClient(process.env.MONGO_URI as string)
export const jsonCollection = client.db("json-hub").collection("json")
