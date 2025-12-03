import { connectDB } from './connectionMongoose.js'
import Usuarios from './schema/Usuarios.js'

const usuario = new Usuarios({
  nombre: 'Larruo AAA',
  edad: 1
})

try {
  await connectDB()

  await usuario.save()
} catch (err) {
  console.error(err)
}
