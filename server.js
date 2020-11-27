if (process.env.NODE_ENV != "Production") {
  const dotenv = require("dotenv");
  dotenv.config();
}

const express = require("express");
const path = require("path");
const expressLayout = require("express-ejs-layouts");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("express-flash");
const mongoDBStore = require("connect-mongo")(session);
const passport = require("passport");
const app = express();

const port = process.env.port || process.env.PORT || 3000;

// Database connection
mongoose
  .connect(process.env.DB_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connected"))
  .catch((error) => console.log(error));

const connection = mongoose.connection;

//Session store
let mongoStore = new mongoDBStore({
  mongooseConnection: connection,
  collection: "sessions",
});

//Session config
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: mongoStore,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);

//Passport config
const passportInit = require("./app/config/passport");
passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());

//Flash message
app.use(flash());

// Static file
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Global middleware
app.use((req, res, next) => {
  res.locals.session = req.session;
  res.locals.user = req.user;
  next();
});

//Set template engine
app.use(expressLayout);
app.set("views", path.join(__dirname, "/resources/views"));
app.set("view engine", "ejs");
app.set("layout", "layouts/layout");

require("./routes/web.js")(app);

app.listen(port, () => console.log(`listen on ${port}`));
