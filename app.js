const express = require("express");
const app = express();
const mongoose = require("mongoose");

require("dotenv").config();
const mongoUrl = process.env.MONGODB_URI;

if (!mongoUrl) {
  throw new Error("MONGODB_URI environment variable is not set.");
}

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
