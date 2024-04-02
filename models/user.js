<<<<<<< HEAD
const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const yup = require('yup');

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    min: 5,
    max: 20,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    min: 3,
    max: 20,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  role: {
    type: String,
  }
});


const User = model('User', userSchema);

module.exports = User;
=======
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
>>>>>>> 7ac540cd5ea224c7d6586b2dce3634c42b7e52be
