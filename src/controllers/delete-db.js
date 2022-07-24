const express = require("express");
const { formatDbData } = require("../database/global-variables.js");

const router = express.Router();

router.delete("/", (req, res) => {
  formatDbData();
  res.status(200).json({ response: "deleted data" });
});

module.exports = router;
