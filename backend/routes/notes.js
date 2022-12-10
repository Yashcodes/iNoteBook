const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("This is the router for populating notes")
});

module.exports = router
