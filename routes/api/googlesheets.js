const express = require("express");
const router = express.Router();
const passport = require("passport");

// @route GET api/googlesheets/
// @desc Get accountability points for a specific user
// @access Private
router.get(
  "/",
  async (req, res) => {
    res.send("yo")
    console.log("api hit")
  }
);

// @route GET api/googlesheets/status
// @desc Get status for a specific user
// @access Private
router.status(
  "/get",
  async (req, res) => {
    res.send("yo")
    console.log("api hit")
  }
);

module.exports = router;
