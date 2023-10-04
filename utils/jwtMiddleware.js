const jwt = require("jsonwebtoken");

const jwtMiddleware = (req, res, next) => {
  try {
    req.state = {};
    // const token = req.cookies['access_token'];

    const token = req.headers.authorization?.substring(7) || "";

    console.log("[accessToken] ==> " + token);

    if (!token) {
      return next();
    }

    const user = {
      ...jwt.verify(token, process.env.JWT_SECRET)
    };
    req.state = { user };

    return next();
  } catch (error) {
    console.error(error);
    return next();
  }
};

module.exports = jwtMiddleware;

/*
export const isEqual = (param1, param2) => {
  return true;
};*/
