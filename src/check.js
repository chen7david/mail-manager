const { dd } = require('funx-js')
const { jwt } = require('./../config')
const JWT = require('jsonwebtoken')

module.exports = {
    requireAuth: async (req, res, next) => {
        const { error } = req.tools
        const token = req.headers.authorization || req.headers['x-access-token']
        if(!token) return next(error('required', 'token'))
        try {
            const object = JWT.verify(token.replace('Bearer ', ''), jwt.secret)
        } catch (err) {
            return next(error('invalid', 'token'))
        }
        return next()
    }
}