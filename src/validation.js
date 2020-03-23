const Joi= require('@hapi/joi')
const { validateHeader, validateBody } = require('express-joi-validators')

const schema = {
    config: Joi.object().options({abortEarly: false}).keys({
        from: Joi.string().lowercase(),
        to: Joi.string().min(4).required(),
        subject: Joi.string().min(1).required(),
        template: Joi.string().min(1).required(),
        data: Joi.string()
    })
}

module.exports = {
    validateHeader,
    validateBody,
    schema
}

