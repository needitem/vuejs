const e = require('express');
const passport = require('passport');

module.exports = (app) => {
  const members = require('./member.controller.js');
  const character = require('./charinfo.controller.js');

  const authenticateUser = (req, res, next) => {
    // const session = req.sessionStore.sessions;
    // const parsedSession = JSON.parse(session[Object.keys(session)[0]]);
    // if (parsedSession.passport) {
    //   console.log('authenticated');
    //   return next();
    // }
    // else {
    //   console.log('not authenticated');
    //   return res.sendStatus(401);
    // }
    try{
      if(req.isAuthenticated()){
        console.log('from authenticateUser func. authenticated');
        return next();
      }
      else{
        console.log('from authenticateUser func. not authenticated');
        return res.sendStatus(401);
      }

    }
    catch(err){
      console.log(err);
      return next(err);
    }
  }


  app.get('/members', members.findAll);
  app.get('/members/:id', members.findOne);
  app.post('/members', members.create);
  app.put('/members/:id', members.update);
  app.delete('/members/:id', members.delete);


  app.get('/character', authenticateUser, character.findAll);
  app.get('/character/:CharName', authenticateUser, character.findOne);
  app.post('/character', authenticateUser, character.create);
  app.put('/character/:CharName', authenticateUser, character.update);
  app.delete('/character/:CharName', authenticateUser, character.delete);

  app.get('/Auth', function (req, res, next) {
    try{
      if(req.isAuthenticated()){
        console.log('from /auth: authenticated');
        return res.send({
          status: 200,
          name: req.session.passport.user,
        });
      }
      else{
        console.log('from /auth: not authenticated');
        return res.send({
          status: 201,
          name: null,
        });
      }
    }
    catch(err){
      console.log(err);
      return next(err);
    }

  });
  
  app.post('/Login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        console.log(err);
        return next(err);
      }
      if (!user) {
        return res.sendStatus(0);
      }
      req.login({
        id: user.id,
        pw: user.pw,
      }, (err) => {
        if (err) {
          console.log(err);
          return next(err);
        }
        req.session.save((err) => {
          if (err) {
            console.log(err);
            return next(err);
          }
          return res.send({
            status: 200,
            name: req.session.passport.user.id,
          });
        });
      });
    })(req, res, next);

  });

  app.get('/Logout', (req, res) => {
    res.clearCookie('connect.sid');
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
        return next(err);
      }
      return res.send({
        status: 200,
        name: null,
      });
    });
  });

}
