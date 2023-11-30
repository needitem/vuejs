const mongoose = require('mongoose');

var ContactSchema = mongoose.Schema({   //스키마(Schema) 설정
  name: {type: String, require:true},
  lat: { type: Number, require: true},
  lon: { type: Number, require: true},
  aqi: { type: Number, require: false},
  forecast: { type: Number, require: false},
  register_date: { type: Date, default:Date.now}
});

module.exports = mongoose.model('Contact', ContactSchema); //소문자화 후 복수형으로 바꾸어 contacts 컬렉션이 됨
