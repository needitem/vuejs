const mongoose = require('mongoose');

var MemberSchema = mongoose.Schema({   //회원 정보 스키마(Schema) 설정
  id: {type: String, require:true},
  pw: { type: String, require: true},
  name: { type: String, require: true},
});

module.exports = mongoose.model('Member', MemberSchema);
