const jwt = require('jsonwebtoken');

function checkAuth(req, res, next) {
  const token = req.header('Authorization');

  jwt.verify(token, process.env.AUTH_SECRET, (err, decoded) => {
    if (err) {
      console.error('Error validating token', err);
      res.status(403).send('Invalid token');
    } else {
      next();
    }
  });
}

module.exports = checkAuth;