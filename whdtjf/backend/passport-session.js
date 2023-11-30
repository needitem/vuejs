const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const session = require('express-session');
const express = require('express');
//find user in db
const member = require('./member.model.js');

module.exports = (app) => {

    app.use(cookieParser('passportExample'));
    app.use(session({
        resave: false,              // 수정 false->true
        saveUninitialized: true,   // 수정 false->true
        secret: 'passportExample',
        //        proxy: true,//추가
        cookie: {
            httpOnly: true,
            secure: true,           //true이면 https에서만 올바르게 동작 ㅎㅎ
            maxAge: 1000 * 60 * 30,
            sameSite: "none",
        }
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => { // Strategy 성공 시 호출됨
        console.log('serializeUser');
        done(null, user); // 여기의 user가 deserializeUser의 첫 번째 매개변수로 이동
    });

    passport.deserializeUser((user, done) => { // 매개변수 user는 serializeUser의 done의 인자 user를 받은 것
        console.log('deserializeUser');
        done(null, user); // 여기의 user가 req.user가 됨
    });

    passport.use(new LocalStrategy(
        {
            usernameField: 'id',
            passwordField: 'pw',
            session: true,
            passReqToCallback: false,
        },
        async (id, pw, done) => {
            try {
                const user = await member.findOne({ id: id });
                if (!user) {
                    return done(null, false, { message: 'Incorrect username.' });
                }
                if(user.pw != pw){
                    return done(null, false, { message: 'Incorrect password.' });
                }
                else{
                    return done(null, user, { message: 'login success' })
                }
                
            }
            catch (err) {
                console.log(err);
                done(err);
            }
        }

    ));

    app.post('/members', passport.authenticate('local') , (req, res) => {
        console.log('login success');
        res.send('200');
        
        
    });
}