import { Schema, model } from 'mongoose'

const usuariosSchema = new Schema({
  nombre: String,
  appellido: String,
  edad: Number,
  frutasFavoritas: {
    type: [String],
    default: undefined
  }
})

export default model('Usuarios', usuariosSchema)
