const express = require("express");
const app = express();
const port = 5000;
const mongoConnect = require("./db");

//! Connect to MongoDB Database
mongoConnect();

//! To use json data
app.use(express.json());

//! Available Routes
app.use("/api/auth", require("./routes/auth.js"));
app.use("/api/notes", require("./routes/notes.js"));

app.get("/", (req, res) => {
  res.send("<h1>Hello Express</h1>");
});

app.listen(port, () => {
  console.log("Server running on port " + port);
});
