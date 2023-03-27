
const { validateToken } = require("../services/authentication");

function authenticationMiddleware(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
      return next();
    }

    try {
      const payload = validateToken(token);
      req.user = payload;
      return next();
    } catch (err) {
      //return res.status(401).json({ message: 'Invalid token' });
      return next();
    }

  }
  
  module.exports = authenticationMiddleware;