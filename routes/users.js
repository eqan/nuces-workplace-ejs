const express = require("express");
const router = express.Router();
const db = require("../services/register");
const bcrypt = require("bcryptjs");
const hf = require("../utils/helperFunctions");
const passport = require("passport");
// const passwordValidator = require('../utils/passwordValidator');

// Login Page
router.get("/login", (req, res) => res.render("Login"));

// Register Page
router.get("/register", (req, res) => res.render("Register"));

//Register handle
router.post("/register", (req, res) => {
  let { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: "Please enter all fields" });
  }

  if (password != password2) {
    errors.push({ msg: "Passwords do not match" });
  }

  if (password.length < 6) {
    errors.push({ msg: "Password must be at least 6 characters" });
  }

  if (errors.length > 0) {
    res.render("register", {
      errors,
      name,
      email,
      password,
      password2,
    });
  }
  // Validation Passed, Now checking through database
  else {
    const result = db.getUserInfo(email) || {};
    if (!hf.isEmpty(result)) {
      errors.push({ msg: "Email already exists" });
      res.render("register", {
        errors,
        name,
        email,
        password,
        password2,
      });
    } else {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          hf.throwError(err);
          password = password2 = hash;
          db.insertUser(name, email, hash)
          req.flash("success_msg", "You are now registered and can log in");
          res.redirect("/users/login");
        });
      });
    }
    res.status('pass');
  }
});
// Login Handle
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
})

module.exports = router;