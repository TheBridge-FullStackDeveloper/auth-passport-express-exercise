const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middleware/isAuthenticated");

router.use("/auth", require("./auth"));
router.use("/posts", isAuthenticated, require("./posts"));

router.use("/auth/github", require("./github"));

module.exports = router;
