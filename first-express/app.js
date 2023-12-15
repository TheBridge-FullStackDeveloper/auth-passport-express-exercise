const express = require("express");
const app = express();
const PORT = 3000;
const morgan = require("morgan");
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const { create } = require('express-handlebars');
const authRoutes = require('./routes/auth');
const forumRoutes = require('./routes/post');
const isAuthenticated = require("./middleware/isAuthenticated");

// Set up handlebars
const hbs = create({
  extname: 'hbs',
  defaultLayout: 'main',
  partialsDir: 'views/partials',
  helpers: require('./utils/helpers')
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', './views');

// Morgan middleware for logging
app.use(morgan('dev'));

// Middlewares to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(session({
  secret: 'Pass2020!',
  resave: false,
  saveUninitialized: false
}));

// Initialize connect-flash for flash messages
app.use(flash());

// Passport configuration
require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', authRoutes);
app.use('/post', forumRoutes);

// Protected route example
app.use('/', isAuthenticated, (req, res) => {
  const skins = [
    { name: 'Red', value: 'red', userId: 1 },
    { name: 'Blue', value: 'blue', userId: 2 },
    { name: 'Green', value: 'green', userId: req.user.id },
    { name: 'Yellow', value: 'yellow', userId: 3 },
    { name: 'Purple', value: 'purple', userId: req.user.id },
  ];
  console.log(req.user);
  res.render('profile', { user: req.user, skins });
});

// Health check route
app.get("/health", (req, res) => {
  res.send("Servidor corriendo correctamente");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
