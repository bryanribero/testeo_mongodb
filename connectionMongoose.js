import mongoose, { connect } from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

export const ConnectDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log('DB ya estaba conectada')

      return
    }

    await mongoose.connect(process.env.DB_URL)

    console.log('DB conectada')
  } catch (err) {
    console.log('Error conectando la DB:', err)

    process.exit(1)
  }
}

ConnectDB()
