const express = require("express");
const app = express();
const mongoose = require("mongoose");

const mongoUrl = "database key";

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log("Error", err);
  });

app.get("/", (req, res) => {
  res.send({ Status: "Started" });
});

app.listen(5001, () => {
  console.log("Node.js Server running on port 5001");
});
