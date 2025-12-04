import http from 'http'
import { connectDB } from './connectionMongoose.js'
import Usuario from './schema/Usuarios.js'

await connectDB()

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`)

  if (url.pathname === '/usuarios' && req.method === 'GET') {
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
})

server.listen(3000, () => {
  console.log('Servidor corriendo: http://localhost:3000')
})
