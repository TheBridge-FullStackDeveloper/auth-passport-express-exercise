const express = require("express");
const app = express();
const PORT = 3000;
const morgan = require("morgan");
const { create } = require("express-handlebars");
const session = require("express-session");
const passport = require("passport");
const hbs = create({
  extname: "hbs",
  defaultLayout: "main",
  partialsDir: "views/partials",
  helpers: require("./utils/helpers"),
});

app.use(
  session({
    secret: "tu_clave_secreta",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "./views");
app.use(passport.session());

require("./config/passport");

const router = require("./routes");
const isAuthenticated = require("./middleware/isAuthenticated");


app.use("/", router);

app.use("/", isAuthenticated, (req, res) => {
    console.log(req.user);
    res.render("profile", { user: req.user });
  });

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
