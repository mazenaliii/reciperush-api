<<<<<<< HEAD
const cors = require('cors')
require('dotenv').config()

module.exports = cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:3000" || "http://localhost:3001", 'Access-Control-Allow-Credentials': true });
=======
const cors = require('cors')
require('dotenv').config()

module.exports = cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:3000" || "http://localhost:3001", 'Access-Control-Allow-Credentials': true });
>>>>>>> 7ac540cd5ea224c7d6586b2dce3634c42b7e52be
