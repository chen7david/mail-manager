const { dd } = require('funx-js')
const { mail } = require('./../config')
const { template } = require('lodash')
const mailer = require('./mailer')(mail)


module.exports = {

    send: async (req, res, next) => {
        const { error } = req.tools
        const { body } = req.ctx 
        dd(body)
        dd(JSON.stringify(body))
        if(body.data){
            body.template = template(body.template)(body.data)
        }
        const result  = await mailer.send(body)
        // if(!result) next(error('invalid', 'email'))
        res.status(200).json(result)
    },
}



