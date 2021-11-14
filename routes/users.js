const express = require("express");
const router = express.Router();
const { login, register } = require("../mongodb/db/auth");
router.post("/login", (req, res) => {
  login(req.body)
    .then((response) => {
      const userObj = response._doc;
      res
        .send({
          username: userObj.username,
          password: userObj.password,
          token: response.token,
        })
        .status(200);
    })
    .catch((err) => {
      return res
        .send({
          error: err,
        })
        .status(400);
    });
});

module.exports = router;
