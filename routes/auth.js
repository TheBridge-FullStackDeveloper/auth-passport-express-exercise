const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const passport = require("passport");
const prisma = require("../prisma");

// Ruta de registro
router.post("/register", async (req, res) => {
  try {
    //linea para encriptar la contraseña, ya que es una información sensible
    //cuanto más alto es el número (10), más tarda en encriptar
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await prisma.User.create({
      data: {
        username: req.body.username,
        password: hashedPassword,
      },
    });
    res.redirect("/auth/login-page");
  } catch (error) {
    console.log(error);
    res.redirect("/auth/register-page");
  }
});

//ejecuta la estrategia local de passport
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/posts",
    failureRedirect: "/auth/login-page",
    failureFlash: true,
  })
);

router.get("/login-page", (req, res) => {
  res.render("login", { error: req.flash("error") });
});

router.get("/register-page", (req, res) => {
  res.render("register", { error: req.flash("error") });
});

router.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = router;
