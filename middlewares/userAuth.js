<<<<<<< HEAD
const jwt = require('jsonwebtoken');
require('dotenv').config();

function authMiddleware(req, res, next) {
  // Access token from the Authorization header (not localStorage)
  const authHeader = req.headers['Authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    // Send appropriate unauthorized response
    return res.status(401).json({ errMessage: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    // Handle invalid or expired token
    return res.status(401).json({ errMessage: 'Invalid token' });
  }
}

module.exports = authMiddleware;
=======
const jwt = require('jsonwebtoken');
require('dotenv').config();

function authMiddleware(req, res, next) {
  // Access token from the Authorization header (not localStorage)
  const authHeader = req.headers['Authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    // Send appropriate unauthorized response
    return res.status(401).json({ errMessage: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    // Handle invalid or expired token
    return res.status(401).json({ errMessage: 'Invalid token' });
  }
}

module.exports = authMiddleware;
>>>>>>> 7ac540cd5ea224c7d6586b2dce3634c42b7e52be
