const e = require('express');
const passport = require('passport');

module.exports = (app) => {
  const members = require('./member.controller.js');
  const character = require('./charinfo.controller.js');

  const authenticateUser = (req, res, next) => {
    if (req.isAuthenticated()) {
      console.log('인증되었습니다.');
      return next();
    }
    else {
      res.redirect('/Login');
    }
  }

  app.get('/members', members.findAll);
  app.get('/members/:id', members.findOne);
  app.post('/members', members.create);
  app.put('/members/:id', members.update);
  app.delete('/members/:id', members.delete);


  app.get('/character', character.findAll);
  app.get('/character/:CharName', character.findOne);
  app.post('/character', character.create);
  app.put('/character/:CharName', character.update);
  app.delete('/character/:CharName', character.delete);

}
