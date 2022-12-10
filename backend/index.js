const express = require("express");
const { mongo } = require("mongoose");
const app = express();
const port = 3000;
const mongoConnect = require("./db");

mongoConnect();

//! Available Routes
app.use("/api/auth", require("./routes/auth.js"));
app.use("/api/notes", require("./routes/notes.js"));

app.get("/", (req, res) => {
  res.send("Hello Express...!");
});

app.listen(port, () => {
  console.log("Server running on port " + port);
});
