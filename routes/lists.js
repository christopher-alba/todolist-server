const express = require("express");
const router = express.Router();
const {
  getLists,
  createList,
  deleteList,
  getListItems,
  createListItem,
  updateListItem,
  deleteListItem,
} = require("../mongodb/db/lists");

router.get("/:username/lists", async (req, res) => {
  try {
    const lists = await getLists(req.params.username);
    res.status(200).send({ lists });
  } catch (err) {
    console.log(err);
    res.status(400).send({ err });
  }
});

router.get("/:username/lists/:listID", async (req, res) => {
  try {
    const listItems = await getListItems(
      req.params.username,
      req.params.listID
    );
    res.status(200).send({ listItems });
  } catch (err) {
    console.log(err);
    res.status(400).send({ err });
  }
});

router.post("/:username/lists", async (req, res) => {
  try {
    const lists = await createList(req.body, req.params.username);
    res.status(200).send({ lists });
  } catch (err) {
    console.log(err);
    res.status(400).send({ err });
  }
});

router.post("/:username/lists/:listID", async (req, res) => {
  try {
    const listItem = await createListItem(
      req.body,
      req.params.username,
      req.params.listID
    );
    res.status(200).send({ listItem });
  } catch (err) {
    console.log(err);
    res.status(400).send({ err });
  }
});

router.put("/:username/items/:itemID", async (req, res) => {
  try {
    const listItem = await updateListItem(
      req.body,
      req.params.username,
      req.params.itemID
    );
    res.status(200).send({ listItem });
  } catch (err) {
    console.log(err);
    res.status(400).send({ err });
  }
});

router.delete("/:username/:listID/items/:itemID", async (req, res) => {
  try {
    const response = await deleteListItem(req.params.listID, req.params.itemID);
    res.status(200).send({ response });
  } catch (err) {
    console.log(err);
    res.status(400).send({ err });
  }
});

router.delete("/:username/lists/:listid", async (req, res) => {
  try {
    const response = await deleteList(req.params.listid, req.params.username);
    res.status(200).send({ response });
  } catch (err) {
    console.log(err);
    res.status(400).send({ err });
  }
});

module.exports = router;
