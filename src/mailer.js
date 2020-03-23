const mailer = require('nodemailer')

class Mail {
    constructor(options = {}){
        const { service, user, pass, from } = options

        if(!service) throw('service is required')
        if(!user) throw('user is required')
        if(!pass) throw('pass is required')

        this.from = from ? from : user
        this.to = null
        this.subject = null
        this.data = null
        this.template = null
        this.mailer = mailer.createTransport({
            service,
            auth: { user, pass }
        })
    }
}