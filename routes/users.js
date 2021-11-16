const express = require("express");
const router = express.Router();
const { login, register } = require("../mongodb/db/auth");
router.post("/login", (req, res) => {
  login(req.body)
    .then((response) => {
      const userObj = response._doc;
      res.status(200).send({
        username: userObj.username,
        password: userObj.password,
        token: response.token,
      });
    })
    .catch((err) => {
      return res.status(400).send({
        error: err,
      });
    });
});

router.post("/register", (req, res) => {
  register(req.body)
    .then((response) => {
      const userObj = response._doc;
      res.status(200).send({
        username: userObj.username,
        password: userObj.password,
        token: response.token,
      });
    })
    .catch((err) => {
      return res.status(400).send({
        error: err,
      });
    });
});

module.exports = router;
