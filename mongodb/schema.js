const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  listsIDs: [{ listId: String }],
  token: {
    type: String,
    default: undefined,
  },
});

const listSchema = new mongoose.Schema({
  itemsIDs: [{ itemId: String }],
  name: String,
});

const itemSchema = new mongoose.Schema({
  text: String,
  status: {
    type: String,
    enum: ["NEW", "IN PROGRESS", "COMPLETE"],
    default: "NEW",
  },
  dateCreated: {
    type: Date,
    default: new Date(),
    min: new Date(),
    max: new Date(),
  },
  dateDue: {
    type: Date,
    default: undefined,
    min: new Date(),
  },
});

module.exports = {
  userSchema,
  listSchema,
  itemSchema,
};
