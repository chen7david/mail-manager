require('dotenv').config()
const express = require('express') 
const app = express()
const server = require('http').createServer(app)
const port = require('./../config').app.port || 4000
const { send } = require('./controller')
const { notifyStatusTo } = require('./notify')
const { invalidHandler, errorHandler, validationHandler } = require('./handlers')
const { validateBody, schema } = require('./validation')
const { cargo } = require('cargo-io')
const cors = require('cors')
const router = require('express-promise-router')()
const { dd } = require('funx-js')

// APP MIDDLEWARE
app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(cargo())
app.use(notifyStatusTo('info'))
app.use(notifyStatusTo('error'))
app.use(notifyStatusTo('validation'))


// APP ROUTES
router.route('/auth/mailer/send')
    .post(validateBody(schema.config), send)

// APP HANDLERS
app.use(router)
app.use(invalidHandler)
app.use(validationHandler)
app.use(errorHandler) 

server.listen(port, () => 
    dd(`server running at http://localhost:${port}`))