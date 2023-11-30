const mongoose = require('mongoose');

var charInfo = mongoose.Schema({   //회원 정보 스키마(Schema) 설정
  CharName: {type: String, require:true},
  Img: {type: String, require:false},
  Age: { type: String, require: true},
  Class: { type: String, require: true},
  Desc: { type: String, require: true},
  IsStarred: { type: Boolean, require: false},
  Story: { type: String, require: true},
  Realname: { type: String, require: true},
  HomeWorld: { type: String, require: true},
  TacticalSkill: { type: String, require: true},
  PassiveSkill: { type: String, require: true},
  UltimitSkill: { type: String, require: true},
});

module.exports = mongoose.model('CharInfo', charInfo);
