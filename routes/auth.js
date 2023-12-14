const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const passport = require('passport');
const prisma = require ('../prisma/seed');

// Ruta de registro
router.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await prisma.user.create({
      data: {
        userName: req.body.username,
        password: hashedPassword,
      }
    });
    res.redirect('/posts/login');
  } catch (error) {
    console.log(error)
    res.redirect('/posts/register');
  }
});

// Ruta de inicio de sesión
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/posts/login',
  failureFlash: true,
}));

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/register', (req, res) => {
  res.render('register');
});

module.exports = router;