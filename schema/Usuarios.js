import { Schema, model } from 'mongoose'

const UsuariosSchema = new Schema({
  nombre: String,
  appellido: String,
  edad: Number,
  frutasFavoritas: {
    type: [String],
    default: undefined
  }
})

export default model('Usuario', UsuariosSchema, 'usuarios')
