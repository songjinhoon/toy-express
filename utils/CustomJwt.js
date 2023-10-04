const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const createAccessToken = (user) => {
  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    secret,
    { expiresIn: '10m' },
  );
  return token;
};

const createRefreshToken = () => {
  const token = jwt.sign({}, secret, { expiresIn: '7d' });
  return token;
};

const isValidToken = (token) => {
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    console.log(data);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

module.exports = { createAccessToken, createRefreshToken, isValidToken };
