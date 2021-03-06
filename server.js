const express = require("express");
var cors = require("cors");

const users = require("./routes/users");
const lists = require("./routes/lists");

const server = express();

// Middleware
server.use(express.json());
server.use(cors());

// Routes
server.use("/auth", users);
server.use("/", lists);

module.exports = server;
