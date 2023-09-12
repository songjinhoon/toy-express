const express = require('express');
const User = require('../model/user');
const router = express.Router();

router.get('/', (req, res, next) => {
  User.findAll()
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

router.get('/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({});
      }
      res.status(200).send(user);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

router.post('', (req, res, next) => {
  User.create(req.body)
    .then((todo) => res.send(todo))
    .catch((err) => res.status(500).send(err));
});

module.exports = router;
