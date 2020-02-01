const express = require("express");
const router = express.Router();
const passport = require("passport");

// @route GET api/projects
// @desc Get all projects for a specific user
// @access Private
router.get(
  "/",
  async (req, res) => {
    res.send("yo")
    console.log("api hit")
  }
);

module.exports = router;
