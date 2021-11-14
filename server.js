const express = require("express");
var cors = require("cors");

const users = require("./routes/users");

const server = express();

// Middleware
server.use(express.json());
server.use(cors());

// Routes
server.use("/auth", users);

module.exports = server;
