import mongoose, { Schema, model } from 'mongoose'

const ProductoSchema = new Schema({
  nombre: { type: String },
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true }
})

export default model('Producto', ProductoSchema, 'productos')
