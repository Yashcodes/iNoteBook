const express = require("express");
const app = express();
const port = 5000;
const mongoConnect = require("./db");
 
//! Connect to MongoDB Database
mongoConnect();

app.use(express.json());

//! Available Routes
app.use("/api/auth", require("./routes/auth.js"));
app.use("/api/notes", require("./routes/notes.js"));

app.get("/", (req, res) => {
  res.send("Hello Express...!");
});

app.listen(port, () => {
  console.log("Server running on port " + port);
});
