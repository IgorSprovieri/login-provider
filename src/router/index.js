const express = require("express");
const router = express.Router();
const { createUser } = require("./user/create");
const { login } = require("./login");
const { authMiddleware } = require("../middlewares/auth");

router.post("/user", createUser);
router.post("/login", login);

router.use(authMiddleware);

router.get("/user", (req, res) => {
  return res.status(200).json(req.user);
});

module.exports = { router };
