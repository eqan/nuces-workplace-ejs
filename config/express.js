const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require('passport');

const app = express();


// EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

// Express session middleware
app.use(
  session({
    secret: "secret",
    saveUninitialized: true,
    resave: true,
  })
);

// Passport config
require('./passport')(passport);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Flash middleware for flash messages
app.use(flash());

// Flash messages for session
app.use((req, res, next) => {
  // color code the message type
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

// Bodyparser
app.use(express.urlencoded({ extended: false }));

module.exports = app;