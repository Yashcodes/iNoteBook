const mongoose = require("mongoose");

//Set up default mongoose connection
mongoose.set("strictQuery", true);
const url = "mongodb://localhost:27017/iNoteBook";

module.exports = mongoConnect = () => {
  mongoose.connect(url, { useNewUrlParser: true }, () => {
    console.log("Mongo Connected Successfully");
  });
};

