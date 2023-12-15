// routes/auth.js
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const passport = require("passport");
const flash = require('connect-flash');
const prisma = require("../prisma");




// Ruta de registro http://localhost:3000/auth/register-page
router.post("/register", async (req, res) => {
  console.log(req.body);
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await prisma.user.create({
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

// Ruta de inicio de sesión http://localhost:3000/auth/login-page
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/login-page",
    failureFlash: true,
  })
);

router.get("/login-page", (req, res) => {
  //console.log(JSON.stringify(req));
  const errors = req.flash('error');
  res.render("login", { errors });
});

//http://localhost:3000/auth/register-page
router.get("/register-page", (req, res) => {
  res.render("register");
});

router.get("/logout", (req, res, next) => { // Agregado 'next' aquí
  res.render("login")
  /*req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });*/
});

// ruta post


module.exports = router;
