const jwt = require('jsonwebtoken');

const jwtMiddleware = (req, res, next) => {
  try {
    req.state = {};
    const token = req.cookies['access_token'];
    console.log('[debug::token] ==> ' + token);

    if (!token) {
      return next();
    }

    const user = {
      ...jwt.verify(token, process.env.JWT_SECRET),
    };
    req.state = { user };

    return next();
  } catch (error) {
    console.error(error);
    return next();
  }
};

module.exports = jwtMiddleware;
