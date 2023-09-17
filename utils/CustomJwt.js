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

module.exports = { createAccessToken, createRefreshToken };
