const cors = require('cors')
require('dotenv').config()

module.exports = cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:3000" || "http://localhost:3001" || "https://reciperushadv.vercel.app" || "https://reciperushadv.onrender.com", 'Access-Control-Allow-Credentials': true });
