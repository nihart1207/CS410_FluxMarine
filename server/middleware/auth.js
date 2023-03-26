
const { validateToken } = require("../services/authentication");

function authenticationMiddleware(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'Missing token cookie' });
    }

    try {
      const payload = validateToken(token);
      req.user = payload;
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  }
  
  module.exports = authenticationMiddleware;