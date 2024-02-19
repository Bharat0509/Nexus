const mongoose = require('mongoose')

const Schema = mongoose.Schema

const formSchema = new Schema({
    name: String,
    desc: String,
    deadline: Date,
    created_date: String,
    publish: Boolean,
    formFields: {
        type: [Object],
        default: []
    },
    responses: {
        type: [Object],
        default: []
    },
    _event: {
        type: String,
        ref: 'event'
    }
})

module.exports = mongoose.model('form', formSchema)
