/* eslint no-console: ["error", { allow: ["warn", "error"] }]  */

const passport = require('passport');
const expressSession = require('express-session');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');

const userModel = require('./user/model');

module.exports = (app) => {
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
    userModel.get({ id })
      .then((user) => {
        if (!user) {
          done('user not found');
        } else {
          done(null, user);
        }
      })
      .catch(err => done(err));
  });

  passport.use(
    new LocalStrategy((username, password, done) => {
      userModel.get({ username })
        .then((user) => {
          if (!user) {
            throw new Error('user not found');
          }

          return Promise.all([
            Promise.resolve(user),
            bcrypt.compare(password, user.password),
          ]);
        }).then(([user, hashOkay]) => {
          if (!hashOkay) {
            throw new Error('password not okay');
          }

          done(null, user);
        }).catch((err) => {
          console.warn('reason: ', err);
          done('Not allowed');
        });
    }),
  );

  app.use(
    expressSession({
      secret: 'test',
      resave: false,
      saveUninitialized: false,
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.post(
    '/login',
    passport.authenticate('local', { failureRedirect: '/login.html' }),
    (request, response) => {
      response.redirect('/');
    },
  );

  app.get('/logout', (request, response) => {
    request.logout();
    response.redirect('/');
  });
};
