const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const passport = require('passport');

// Ruta de registro
router.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await prisma.user.create({
      data: {
        username: req.body.username,
        password: hashedPassword
      }
    });
    res.redirect('/login');
  } catch (error) {
    console.log(error)
    res.redirect('/register');
  }
});

// Ruta de inicio de sesión
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true,
}));

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/register', (req, res) => {
  res.render('register');
});

module.exports = router;