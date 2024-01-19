const cookieSession = require('cookie-session');
require('dotenv').config();


module.exports = cookieSession({ name: "reciperush-session", keys: [`${process.env.SESSION_SECRET}`, { httpOnly: true }]});