const mongoose = require('mongoose')
const loginSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['Level1', 'Level2', 'Level3', 'Level4', 'Admin'], // allowed roles
        required: true,
    }
})

module.exports = mongoose.model('Login', loginSchema)