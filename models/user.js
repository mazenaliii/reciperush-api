const mongoose = require('mongoose')
const { Schema, model } = mongoose;

const userInfo = new Schema({
    name: { type: String, required: true, },
    username: { type: String, required: false, unique: true, }, // دي مش ريكويرد عشان بتست حاجة
    email: { type: String, required: true, unique: true, },
    password: { type: String, required: true, },
    role: { type: String, }
})

module.exports = model('User', userInfo)