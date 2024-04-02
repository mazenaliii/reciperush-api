<<<<<<< HEAD
const cookieSession = require('cookie-session');
require('dotenv').config();


=======
const cookieSession = require('cookie-session');
require('dotenv').config();


>>>>>>> 7ac540cd5ea224c7d6586b2dce3634c42b7e52be
module.exports = cookieSession({ name: "reciperush-session", keys: [`${process.env.SESSION_SECRET}`, { httpOnly: true }]});