const passport = require('passport');
const expressSession = require('express-session');
const LocalStrategy = require('passport-local');

module.exports = app => {
    passport.serializeUser((user, done) => done(null, user.username));
    passport.deserializeUser((id, done) => {
        const user = {
            username: 'test',
            firstname: 'test',
            lastname: 'test'
        };
        done(null, user);
    });

    passport.use(
        new LocalStrategy((username, password, done) => {
            if (username === 'test' && password === 'test') {
                const user = {
                    username: 'test',
                    firstname: 'test',
                    lastname: 'test'
                };
                done(null, user);
            } else {
                done('Not allowed');
            }
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

