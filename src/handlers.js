const { dd } = require('funx-js')
const { Notify } = require('notify-io')
const { ValidationError } = require('@hapi/joi')

module.exports = {

    invalidHandler: (req, res, next) => {
        const { error } = req.tools
        next(error('invalid', 'request'))
    },

    validationHandler: (err, req, res, next) => {
        if(!(err instanceof ValidationError)) return next(err)
        const { validation } = req.tools
        const { details, _original } = err

        validation().originalTo(_original)
        
        const USD = [
            'any.required',
            'string.empty',
            'boolean.base',
            'number.base',
            'number.integer',
            'array.base'
        ]
        
        const MSD = [
            'string.min',
            'string.max',
            'any.only'
        ]
       
        for (let detail of details) {
            const { type, context: { label, key, limit, valids } } = detail
            let ref = valids ? valids[0].key : null
            if(USD.includes(type)) validation(type, label, key)
            if(MSD.includes(type)) validation(type, { label, limit, ref }, key)
        }

        return next(validation())
    },

    errorHandler: (err, req, res, next) => {
        const { cargo, error } = req.tools
        const errId = cargo.serial
        let msg = null

        if(err instanceof Notify) msg = err
        if(!msg) {
            dd({errId:'ER' + errId, err})
            msg = error('unknown', errId)
        }

        cargo.details(msg.render())

        res.status(500).json(cargo)
    },
}