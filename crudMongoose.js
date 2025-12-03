import { ConnectDB } from './connectionMongoose.js'
import Usuarios from './schema/Usuarios.js'

await ConnectDB()

const usuario = new Usuarios({
  nombre: 'Larruo AAA',
  edad: 1
})

await usuario.save()
