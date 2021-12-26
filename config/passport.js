const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const db = require("../services/login");

let initPassportLocal = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        try {
          let match = await db
            .handleLogin(email, password)
            .then(async (user) => {
              if (match === true) {
                return done(null, user, null);
              } else {
                return done(null, false, req.flash("error", match));
              }
            });
        } catch (err) {
          console.log(err);
          return done(null, false, { message: err });
        }
      }
    )
  );
};

passport.serializeUser((user, done) => {
  done(null, user["id"]);
});

passport.deserializeUser((id, done) => {
  db.getUserInfo("id", id)
    .then((user) => {
      return done(null, user);
    })
    .catch((error) => {
      return done(error, null);
    });
});

module.exports = initPassportLocal;
