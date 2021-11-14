const mongoose = require("mongoose");
const { userSchema, listSchema, itemSchema } = require("./schema");

const User = mongoose.model("User", userSchema);
const List = mongoose.model("List", listSchema);
const Item = mongoose.model("Item", itemSchema);

module.exports = {
  User,
  List,
  Item,
};
