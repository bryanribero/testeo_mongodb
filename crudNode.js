import http from 'http'
import { connectDB } from './connectionMongoose.js'
import Usuario from './schema/Usuarios.js'

await connectDB()

const server = http.createServer(async (req, res) => {
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
    let body = ''

    req.on('data', (chunk) => (body += chunk))

    req.on('end', async () => {
      try {
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

        res.end(
          JSON.stringify({
            error: `Error al ingresar datos: ${err}`
          })
        )
      }
    })
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
})

server.listen(3000, () => {
  console.log('Servidor corriendo: http://localhost:3000')
})
