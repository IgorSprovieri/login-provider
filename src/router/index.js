const express = require("express");
const { createUser } = require("./user/create");
const router = express.Router();

router.post("/user", createUser);

module.exports = { router };
