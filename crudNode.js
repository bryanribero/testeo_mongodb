import http from 'http'
import { connectDB } from './connectionMongoose.js'
import Usuario from './schema/Usuarios.js'
import Producto from './schema/Productos.js'

await connectDB()

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.writeHead(204)
    res.end()
    return
  }

  const getBody = (req) => {
    return new Promise((resolve, reject) => {
      let body = ''
      req.on('data', (chunk) => (body += chunk))
      req.on('end', () => resolve(body))
      req.on('error', (err) => reject(err))
    })
  }

  const url = new URL(req.url, `http://${req.headers.host}`)

  if (url.pathname.startsWith('/usuarios') && req.method === 'GET') {
    const parts = url.pathname.split('/')

    if (parts.length === 2) {
      try {
        const result = await Usuario.find()

        res.writeHead(200, { 'content-type': 'application/json' })

        res.end(
          JSON.stringify({
            title: 'Colleccion traida con exito',
            content: result
          })
        )
      } catch (err) {
        res.writeHead(500, { 'content-type': 'application/json' })

        res.end(
          JSON.stringify({
            error: `Error al cargar los datos: ${err}`
          })
        )
      }
    } else if (parts.length === 3) {
      try {
        const id = parts[2]
        const result = await Usuario.findById(id)

        res.writeHead(200, { 'content-type': 'application/json' })
        res.end(
          JSON.stringify({
            title: 'Usuario obtenido con exito!',
            content: result
          })
        )
      } catch (err) {
        res.writeHead(500, { 'content-type': 'application/json' })
        res.end(
          JSON.stringify({
            err: `Error al conseguir los datos: ${err}`
          })
        )
      }
    }
  }

  if (url.pathname === '/usuarios' && req.method === 'POST') {
    try {
      const body = await getBody(req)
      const usuario = JSON.parse(body)
      const result = await new Usuario(usuario).save()

      res.writeHead(200, { 'content-type': 'application/json' })
      res.end(
        JSON.stringify({
          title: 'Usuario ingresado con exito!',
          content: result
        })
      )
    } catch (err) {
      res.writeHead(500, { 'content-type': 'application/json' })

      res.end(JSON.stringify({ error: `Error al ingresar datos: ${err}` }))
    }
  }

  if (url.pathname.startsWith('/usuarios') && req.method === 'PATCH') {
    const parts = url.pathname.split('/')

    if (parts.length === 2) {
      let body = ''

      req.on('data', (chunk) => (body += chunk))

      req.on('end', async () => {
        try {
          const usuario = JSON.parse(body)

          await Usuario.updateMany({}, usuario, { new: true, runValidators: true })

          res.writeHead(200, { 'content-type': 'application/json' })

          res.end(
            JSON.stringify({
              title: 'Usuarios actualizados con exito!',
              content: usuario
            })
          )
        } catch (err) {
          res.writeHead(500, { 'content-type': 'application/json' })

          res.end(
            JSON.stringify({
              error: `Error al actualizar los datos: ${err}`
            })
          )
        }
      })
    } else if (parts.length === 3) {
      const id = parts[2]
      let body = ''

      req.on('data', (chunk) => (body += chunk))

      req.on('end', async () => {
        try {
          const usuario = JSON.parse(body)

          await Usuario.findByIdAndUpdate(id, usuario, { new: true, runValidators: true })
          const result = await Usuario.findById(id)

          res.writeHead(200, { 'content-type': 'application/json' })

          res.end(
            JSON.stringify({
              title: 'Dato actualizado con exito!',
              content: result
            })
          )
        } catch (err) {
          res.writeHead(500, { 'content-type': 'application/json' })

          res.end(JSON.stringify({ err: `Error al actualizar datos: ${err}` }))
        }
      })
    }
  }

  if (url.pathname.startsWith('/usuarios') && req.method === 'DELETE') {
    const parts = url.pathname.split('/')

    if (parts.length === 3) {
      const id = parts[2]

      try {
        const result = await Usuario.findByIdAndDelete(id)

        res.writeHead(200, { 'content-type': 'application/json' })

        res.end(
          JSON.stringify({
            title: 'Usuario eliminado con exito!',
            content: result
          })
        )
      } catch (err) {
        res.writeHead(500, { 'content-type': 'application/json' })

        res.end(JSON.stringify({ error: `Usuario imposible de eliminar: ${err}` }))
      }
    } else {
      res.writeHead(404, { 'content-type': 'application/json' })

      res.end(JSON.stringify({ error: 'Acción incorrecta en el metodo DELETE' }))
    }
  }

  if (url.pathname.startsWith('/productos') && req.method === 'GET') {
    try {
      const productos = await Producto.find().populate('usuarioId')

      res.writeHead(200, { 'content-type': 'application/json' })

      res.end(
        JSON.stringify({
          title: 'Productos cargados con exito!',
          content: productos
        })
      )
    } catch (err) {
      res.writeHead(500, { 'content-type': 'application/json' })

      res.end(JSON.stringify({ error: `error al cargar productos: ${err}` }))
    }
  }
})

server.listen(3000, () => {
  console.log('Servidor corriendo: http://localhost:3000')
})
