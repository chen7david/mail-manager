const { Notify, SchemaBuilder } = require('notify-io')
const { DefaultSchema, JoiSchema } = require('notify-io-schemas')


const schema = new SchemaBuilder().merege({
    DefaultSchema: DefaultSchema(SchemaBuilder),
    JoiSchema: JoiSchema(SchemaBuilder)
})

// console.log(schema.keys())

const instance = () => new Notify(schema)
const notifyStatusTo = require('express-notify-io')(instance)

module.exports = { notifyStatusTo }