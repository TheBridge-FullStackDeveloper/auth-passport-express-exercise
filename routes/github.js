const express = require("express");
const passport = require("passport");
const router = express.Router();

router.get("/", passport.authenticate("github"));

router.get(
  "/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/");
  }
);

module.exports = router;
