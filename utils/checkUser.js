const checkUser = (req, res, next) => {
  if (!req.state.user) {
    res.status(401).send();
    return;
  }
  return next();
};

module.exports = checkUser;
