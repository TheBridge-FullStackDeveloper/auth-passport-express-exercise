const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const morgan = require("morgan");
const methodOverride = require("method-override");
const { create } = require("express-handlebars");
const session = require("express-session");
const passport = require("passport");
const hbs = create({
  extname: "hbs",
  defaultLayout: "main",
  partialsDir: "views/partials",
  helpers: require("./utils/helpers"),
});
const flash = require('connect-flash');
const expressSession = require('express-session');
const pgSession = require('connect-pg-simple')(expressSession);

require('dotenv').config();

const pgPool = require("./config/pg-session");

app.use(expressSession({
  store: new pgSession({
    pool : pgPool,
    tableName : 'UserSession'
  }),
  secret: process.env.COOKIE_SECRET,
  resave: false,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
}));

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(flash());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport");

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "./views");

const router = require("./routes");
const isAuthenticated = require("./middleware/isAuthenticated");

app.use("/", router);
app.use("/", isAuthenticated, (req, res) => {
  res.render("profile", { user: req.user });
});

app.get("/health", (req, res) => {
  res.send("Servidor corriendo correctamente");
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
