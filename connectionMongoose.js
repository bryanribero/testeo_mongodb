import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

export const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log('DB ya estaba conectada')

      return
    }

    await mongoose.connect(process.env.DB_URL, {
      dbName: 'eccomerce'
    })

    console.log('DB conectada')
  } catch (err) {
    console.log('Error conectando la DB:', err)

    process.exit(1)
  }
}
