const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const session = require('express-session');
const member = require('./member.model.js');

require('dotenv').config();
module.exports = (app) => {
    app.use(cookieParser(process.env.COOKIE_SECRET));
    app.use(session({
        resave: true,
        saveUninitialized: false,
        secret: process.env.COOKIE_SECRET,
        cookie: {
            httpOnly: true,
            secure: false,
            maxAge: 1000 * 60 * 30,
        },
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => { // Strategy 성공 시 호출됨
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => { // 매개변수 id는 req.session.passport.user에 저장된 값
        console.log('deserializeUser');
        member.findOne({ id: id })
            .then((user) => {
                done(null, user); // req.user에 저장
            })
            .catch((err) => {
                done(err);
            }   
        );
    });

    passport.use(new LocalStrategy(
        {
            usernameField: 'id',
            passwordField: 'pw',
            session: true,
            passReqToCallback: true,

        },
        async (req, id, pw, done) => {   
            try {
                const user = await member.findOne({ id: id });
                if (!user) {
                    return done(null, false, { message: 'Incorrect username.' });
                }
                if (user.pw != pw) {
                    return done(null, false, { message: 'Incorrect password.' });
                }
                else {
                    return done(null, user, { message: 'login success' })
                }

            }
            catch (err) {
                console.log(err);
                return done(err, false, { message: 'Error' });
            }
        }

    ));
}