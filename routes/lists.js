const express = require("express");
const router = express.Router();
const {
  getLists,
  createList,
  deleteList,
  getListItems,
} = require("../mongodb/db/lists");

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

router.get("/:username/lists/:listID", async (req, res) => {
  try {
    const listItems = await getListItems(
      req.params.username,
      req.params.listID
    );
    res.send({ listItems }).status(200);
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

router.delete("/:username/lists/:listid", async (req, res) => {
  try {
    const response = await deleteList(req.params.listid, req.params.username);
    res.send({ response }).status(200);
  } catch (err) {
    console.log(err);
    res.send({ err }).status(400);
  }
});

module.exports = router;
