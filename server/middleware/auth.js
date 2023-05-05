const { validateToken } = require("../services/authentication");

function authenticationMiddleware(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    if (req.url !== "/") {
      //console.log("client doesnt have a token and trying to access apart from login")
      return res.redirect("/");
    } else {
      return next();
    }
  }

  try {
    const payload = validateToken(token);
    req.user = payload;
    return next();
  } catch (err) {
    //return res.status(401).json({ message: 'Invalid token' });
    return res.redirect("/");
  }
}

function adminAuthentication(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    //console.log("client doesnt have a token and trying to access apart from login")
    return res.redirect("/");
  }

  try {
    const payload = validateToken(token);
    if (payload.role === "ADMIN") {
      req.user = payload;
      return next();
    } else {
      return res.redirect("/");
    }
  } catch (err) {
    return res.redirect("/");
  }
}

module.exports = { authenticationMiddleware, adminAuthentication };
