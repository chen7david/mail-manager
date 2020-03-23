const { dd } = require('funx-js')
const { mail } = require('./../config')
const { template } = require('lodash')
const mailer = require('./mailer')(mail)
dd(require('./../config'))
module.exports = {

    send: async (req, res, next) => {
        const { cargo, validation } = req.tools
        const { body } = req.ctx 
        try {
            if(body.data) {
                body.template = template(body.template)(body.data)
            }else {
                body.template = body.template.replace(/\$\{/g, '').replace(/\}/g, '')
            }
        } catch (err) {
            let key = err.message.split(' ')[0]
            return next(validation('undefinded', key))
        }
        const result  = await mailer.send(body)
        if(!result) next(error('invalid', 'email'))
        result.sent = result.rejected.length > 0 ? false : true
        cargo.details(result)
        res.status(200).json(cargo)
    },
}



