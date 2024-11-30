const jwt = require("jsonwebtoken");
const { SECRET } = require("./config");

function tokenExtractor(req, res, next) {
  const authorization = req.get("Authorization");

  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
    } catch {
      res.status(401).json({ error: "Invalid token" });
    }
  } else {
    res.status(401).json({ error: "Token missing" });
  }

  next();
}

module.exports = { tokenExtractor };
