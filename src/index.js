require('dotenv').config()
const express = require('express')
const app = express()
const server = require('http').createServer(app)
const router = require('express-promise-router')()
const port = 5000
const Joi = require('@hapi/joi')
const { validateBody } = require('express-joi-validators')

const schema = Joi.object().options({abortEarly: false}).keys({
    from: Joi.string().lowercase(),
    to: Joi.string().min(4).required(),
    subject: Joi.string().min(1).required(),
    template: Joi.string().min(1).required(),
    data: Joi.string()
})


const requestHandler = (req, res, next) => {

}

const errorHandler = (err, req, res, next) => {
    res.status(422).json(err)
}




router.route('/auth/mailer/send')
    .post(validateBody(schema), requestHandler)

app.use(router)

app.use(errorHandler) 

server.listen(port, () => {
    console.log(`server running at http://localhost:${port}`)
})