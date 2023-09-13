const express = require('express');
const User = require('../model/user');
const router = express.Router();

router.post('', (req, res, next) => {
  User.create(req.body)
    .then(() => res.status(201).send())
    .catch((error) => res.status(500).send(error));
});

router.get('', (req, res, next) => {
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

router.put('/:id', (req, res) => {
  User.update(req.params.id, req.body)
    .then(res.status(204).send())
    .catch((error) => res.status(500).send(error));
});

router.delete('/:id', (req, res) => {
  User.delete(req.params.id)
    .then(() => res.status(204).send())
    .catch((error) => res.status(500).send(error));
});

module.exports = router;
