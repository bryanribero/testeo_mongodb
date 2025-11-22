import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'

dotenv.config()

let client
let db
export const getConnection = async () => {
  try {
    if (db) return

    const mongoUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.inkk27w.mongodb.net/eccomerce`

    client = await MongoClient.connect(mongoUrl)

    db = client.db('eccomerce')

    return db
  } catch (err) {
    console.error(err)
  }
}
