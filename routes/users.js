const express = require('express');
const User = require('../model/user');
const router = express.Router();

router.get('', (req, res, next) => {
  res.send('respond with a resource!!');
});

router.post('/register', async (req, res, next) => {
  const user = new User({
    ...req.body,
  });
  try {
    await user.save();
  } catch (e) {
    res.throw(500, e);
  }
});

module.exports = router;
