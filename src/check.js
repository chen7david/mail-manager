const JWT = require('jsonwebtoken')
module.exports = {
    requireAuth: async (req, res, next) => {
        const { error } = req.tools
        const token = req.body.authorization || req.headers['x-access-token']
        if(!token) return next(error('required', 'token'))
        try {
            const object = JWT.verify(token.replace('Bearer ', ''))
        } catch (err) {
            return next(error('invalid', 'token'))
        }
        return next()
    }
}