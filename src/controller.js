const { dd } = require('funx-js')
const { mail } = require('./../config')
const mailer = require('./mailer')(mail)


module.exports = {

    send: async (req, res, next) => {
        const { error } = req.tools
        const { body } = req.ctx 
        const result  = await mailer.send(body)
        if(!result) next(error('invalid', 'email'))
        res.status(200).json(result)
    },
}