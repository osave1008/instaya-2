const jwt = require("jsonwebtoken");

const checkAuth = (req, res, next) => {

  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json({ message: "Token Invalido ..." });
  }

  jwt.verify(token, process.env.JWT_KEY, (err, userId) => {

    if (err) {

      return res.status(401).json({ message: "Token Invalido ..." });

    }

    req.user = {

      id: userId,

    };

    next();

  });

};



module.exports = checkAuth;