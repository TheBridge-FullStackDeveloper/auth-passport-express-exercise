const express = require("express");
const router = express.Router();

const postsRoutes = require("./posts");
router.use("/posts", postsRoutes);

const authRoutes = require("./auth");
router.use("/auth", authRoutes);

module.exports = router;
