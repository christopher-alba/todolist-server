const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  token: String,
  permission: String,
});

module.exports = {
  userSchema,
};
