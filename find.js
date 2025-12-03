import { connectDB } from './connectionMongoose.js'
import Usuario from './schema/Usuarios.js'

await connectDB()

const find = await Usuario.find({ nombre: { $regex: 'br', $options: 'i' } })

console.log(find)
