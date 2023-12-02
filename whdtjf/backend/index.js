const express = require('express');
//const bodyparser = require('body-parser');
const cors = require('cors'); //cors: 서버와 클라이언트의 도메인이 다를 때 발생하는 문제를 해결하는 미들웨어
const app = express();      //express app 생성
const webSocket = require('./socket.js'); //web socket 설정

app.use(express.json());  //json 형식 파싱하기
app.use(express.urlencoded({ extended: true })); //urlencoded 형식 파싱하기
app.use(cors({
    origin: 'http://localhost:8080', // Set to the exact origin
    credentials: true,
    optionsSuccessStatus: 200
}));

const dbconfig = require("./db.js");
const mongoose = require('mongoose');
//데이터베이스 연결 및 상태 로깅
mongoose.connect(dbconfig.url, { useNewUrlParser:true})
.then( () => {
    console.log("정상적으로 MongoDB 서버에 연결되었습니다.");
}).catch( err => {
    console.log("MongoDB에 연결되지 않았습니다.", err);
});

app.get('/', (req, res) => { 
    //log req db list
    res.json({"message": "여러분들을 환영합니다."}); 
  })
require('./passport-session.js')(app);

require('./router.js')(app);
var port = process.env.PORT || 8000;  //서버 포트(port) 설정

//클라이언트로부터 요청 듣기
const serve = app.listen(port, ()=> { console.log("포트 : " + port + " 을 열고 서버 동작 중...") });

webSocket(serve); // ws와 http 포트 공유
