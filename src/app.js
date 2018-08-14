/* eslint global-require: "off", no-console: "off" */
const app = require('express')()
const bodyParser = require('body-parser')
const rewrite = require('express-urlrewrite')

const { baseUrl } = require('./util')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Strip the base URL from all requests so we can resolve them properly
app.use(rewrite(`${baseUrl}/*`, '/$1'))

// Prettify all json by default
app.use(require('./middleware/pretty-print-json'))

// API routes
app.use(`/api/whoami`, require('./api/whoami'))
app.use(`/api/github`, require('./api/github'))

// Error handling! This middleware should always be the last one in the chain.
app.use(require('./middleware/handle-error'))

module.exports = app
