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

    async send(options){
        const { to, subject, template, from, cc, bcc } = options
        const config = {
            from: from ? from : this.from, 
            to: to ? to : this.to,
            subject: subject ? subject : this.subject,
            html: template ? template : 'we are just <p>testing</p> this'
        }

        if(cc) config.cc = cc
        if(bcc) config.bcc = bcc

        return await this.mailer.sendMail(config)
    }
}

module.exports = (options) => new Mail(options)