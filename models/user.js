const mongoose = require('mongoose')
const { Schema, model } = mongoose;

const userInfo = new Schema({
    name: { type: String, required: true, min: 5, max: 25 },
    username: { type: String, required: true, unique: true, min: 5, max: 25 },
    email: { type: String, required: true, unique: true, },
    password: { type: String, required: true, min: 8, max: 25 },
    role: { type: String, }
})

module.exports = model('User', userInfo)