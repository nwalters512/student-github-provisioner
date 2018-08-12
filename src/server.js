/* eslint global-require: "off", no-console: "off" */
require('dotenv').config()

const app = require('./app')
const server = require('http').Server(app)
const nextJs = require('next')


const PORT = process.env.PORT || 3000
const dev = process.env.NODE_ENV === 'development'
const nextApp = nextJs({ dev, dir: dev ? 'src' : 'build' })
const handler = nextApp.getRequestHandler()

nextApp.prepare().then(() => {
  app.use(handler)

  server.listen(PORT)
  console.log(`Listening on ${PORT}`)
})
