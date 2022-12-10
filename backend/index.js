const express = require("express");
const { mongo } = require("mongoose");
const app = express();
const port = 3000;
const mongoConnect = require("./db");

mongoConnect();

app.get("/", (req, res) => {
  res.send("Hello Express...!");
});



app.listen(port, () => {
  console.log("Server running on port " + port);
});
