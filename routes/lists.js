const express = require("express");
const router = express.Router();
const { getLists, createList } = require("../mongodb/db/lists");

router.get("/:username/lists", async (req, res) => {
  try {
    const lists = await getLists(req.params.username);
    console.log(lists);
    res.send({ lists }).status(200);
  } catch (err) {
    console.log(err);
    res.send({ err }).status(400);
  }
});

router.post("/:username/lists", async (req, res) => {
  try {
    const lists = await createList(req.body, req.params.username);
    res.send({ lists }).status(200);
  } catch (err) {
    console.log(err);
    res.send({ err }).status(400);
  }
});

module.exports = router;
