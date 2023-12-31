const express = require("express");
const app = express();
const connectToDB = require("./config/database");
const User = require("./models/user");
const bcrypt = require("bcrypt");
const setCookieSession = require('./middlewares/cookieSession')
const setCors = require('./middlewares/cors')
const authMiddleware = require('./middlewares/userAuth')
const cookieParser = require('cookie-parser')
require("dotenv").config();
const PORT = process.env.PORT || 8080;

// routers 
const createAcc = require('./routes/createAcc')
const login = require('./routes/login')

connectToDB();

// Middlewares (optimized order)
app.use(setCors);
app.use(setCookieSession);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Routes
app.use("/api", createAcc);
app.use("/api", login);

// auth middleware 
app.use((req, res, next) => {
  if (req.path !== '/api/create-acc') {  
    authMiddleware(req, res, next);
  } else {
    next();
  }
});

// Listener
app.listen(PORT, () => {
  console.log(`Successfully launched app at port ${PORT}`);
});
