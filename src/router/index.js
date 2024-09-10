const express = require("express");
const { createUser } = require("./user/create");
const { login } = require("./login");
const router = express.Router();

router.post("/user", createUser);
router.post("/login", login);

module.exports = { router };
