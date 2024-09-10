require("dotenv").config();
const qs = require("qs");
const express = require("express");
const { connectToDB } = require("./db");
const { router } = require("./router");
const app = express();
const port = process.env.PORT || 3333;

app.use(express.json());

app.set("query parser", function (str) {
  qs.parse(str);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/", router);

app.listen(port, async () => {
  await connectToDB();
  console.log(`Login provider listening on port ${port}`);
});
