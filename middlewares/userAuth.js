const jwt = require('jsonwebtoken');
require('dotenv').config()

function authMiddleware(req, res, next) {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ errMessage: "Unauthorized" });
    }
  
    const decode = jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ errMessage: "Invalid token" });
      }
      req.user = decoded; // Attach user information to request object
      next();
    });
    console.log(decode)
  }

  module.exports = authMiddleware