const jwt = require('jsonwebtoken');
const errorHandler = require('./error');

const verifyAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check if Authorization header is present and starts with Bearer
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(errorHandler(401, "Unauthorized user: No token provided"));
    }

    // Extract token
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_KEY, (err, user) => {
      if (err) {
        return next(errorHandler(403, "Token verification failed"));
      }

      // Attach user payload to request
      req.user = user;
      next();
    });

  } catch (err) {
    next(errorHandler(500, "Server error during token verification"));
  }
};

module.exports = verifyAuth;
