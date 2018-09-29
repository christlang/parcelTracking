const passport = require('passport');
const expressSession = require('express-session');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');

const userModel = require('./user/model');

const SALT_ROUNDS = 10;

module.exports = app => {
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((id, done) => {
        userModel.get({id})
            .then(user => {
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
            Promise.all([
                userModel.get({username}),
                bcrypt.hash(password, SALT_ROUNDS)
            ]).then(([user, hash]) => {

                if (!user) {
                    return Promise.reject('user not found');
                }

                return Promise.all([
                    Promise.resolve(user),
                    bcrypt.compare(password, hash)
                ]);
            }).then(([user, hashOkay]) => {

                if (!hashOkay) {
                    reject('password not okay');
                }

                done(null, user);
            }).catch(err => {
                console.log('reason: ', err);
                done('Not allowed');
            });
        })
    );

    app.use(
        expressSession({
            secret: 'test',
            resave: false,
            saveUninitialized: false
        })
    );

    app.use(passport.initialize());
    app.use(passport.session());

    app.post(
        '/login',
        passport.authenticate('local', { failureRedirect: '/login.html' }),
        (request, response) => {
            response.redirect('/');
        }
    );

    app.get('/logout', (request, response) => {
        request.logout();
        response.redirect('/');
    });
};

