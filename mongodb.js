import { ObjectId } from 'mongodb'
import { getConnection } from './connection.js'

const getUsuarios = async () => {
  try {
    const database = await getConnection()

    const usuarios = await database.collection('usuarios').find().toArray()

    console.table(usuarios)
  } catch (err) {
    console.error(err)
  }
}

const addUsuarios = async () => {
  try {
    const database = await getConnection()

    const usuarios = await database.collection('usuarios').insertOne({ nombre: 'Angela', appelido: 'LANUS', edad: 33 })

    console.log(usuarios)
  } catch (err) {
    console.error(err)
  }
}

const updateUsuarios = async () => {
  try {
    const database = await getConnection()

    const usuarios = await database
      .collection('usuarios')
      .updateOne({ _id: new ObjectId('692125128da011338c62a851') }, { $set: { apellido: 'LANUZ' } })

    console.log(usuarios)
  } catch (err) {
    console.error(err)
  }
}

const deleteUsuarios = async () => {
  try {
    const database = await getConnection()
    const usuarios = await database.collection('usuarios').deleteOne({ _id: new ObjectId('692125128da011338c62a851') })

    console.log(usuarios)
  } catch (err) {
    console.log(err)
  }
}

const getAll = async () => {
  //   await addUsuarios()
  //   await updateUsuarios()
  //   await deleteUsuarios()
  await getUsuarios()
}

getAll()
