import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

export const getConnection = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log('Conecction already')

      return
    }

    mongoose.connect(process.env.DB_URL, {
      dbName: 'eccomerce'
    })

    console.log('DB coneccted')
  } catch (err) {
    console.error(err)

    process.exit(1)
  }
}
