const { dd } = require('funx-js')


module.exports = {

    send: (req, res, next) => {
        const { error } = req.tools
        next(error('invalid', 'request'))
    },
}