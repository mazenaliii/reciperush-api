const mongoose = require('mongoose')
require('dotenv').config()

const connectToDB = async () => {
    await mongoose.connect(`${process.env.MONGODB_URL}`, ).then(() => {
    mongoose.set('strictQuery', false);
    console.log('sucessfully connected to the database')
  }).catch(e => console.log)
}

module.exports = connectToDB;