/* eslint global-require: "off", no-console: "off" */
const app = require('express')()
const bodyParser = require('body-parser')
const rewrite = require('express-urlrewrite')

const { baseUrl } = require('./util')

const DEV = ['production', 'staging'].indexOf(process.env.NODE_ENV) === -1

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Forward next + statics requests to the right route handlers
app.use(rewrite(`${baseUrl}/_next/*`, '/_next/$1'))
app.use(rewrite(`${baseUrl}/static/*`, '/static/$1'))

// Prettify all json by default
app.use(require('./middleware/pretty-print-json'))

// API routes
app.use(`${baseUrl}/api/courses`, require('./api/courses'))

// Error handling! This middleware should always be the last one in the chain.
app.use(require('./middleware/handle-error'))

module.exports = app