const express = require('express');
const User = require('../model/user');
const checkUser = require('../utils/checkUser');
const router = express.Router();

router.post('/sign-in', (req, res) => {
  User.findByUsername(req.body.username)
    .then((user) => {
      if (!user) {
        res.status(401).send();
      }
      if (!user.isEqualPassword(req.body.password)) {
        res.status(401).send();
      }
      const token = user.generateToken();
      res
        .cookie('access_token', token, {
          maxAge: 1000 * 60 * 60 * 24, // 하루
          httpOnly: true,
        })
        .status(200)
        .send(user);
    })
    .catch(() => {});
});

router.post('/sign-up', (req, res, next) => {
  User.create(req.body)
    .then(() => {
      res.status(201).send();
    })
    .catch((error) => res.status(500).send(error));
});

router.get('', checkUser, (req, res, next) => {
  User.findAll()
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

router.get('/:id', checkUser, (req, res, next) => {
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

router.put('/:id', checkUser, (req, res) => {
  User.update(req.params.id, req.body)
    .then(res.status(204).send())
    .catch((error) => res.status(500).send(error));
});

router.delete('/:id', checkUser, (req, res) => {
  User.delete(req.params.id)
    .then(() => res.status(204).send())
    .catch((error) => res.status(500).send(error));
});

module.exports = router;
