import { ConnectDB } from './connectionMongoose.js'
import Usuarios from './schema/Usuarios.js'

const usuario = new Usuarios({
  nombre: 'Larruo AAA',
  edad: 1
})

try {
  await ConnectDB()

  await usuario.save()
} catch (err) {
  console.error(err)
}
