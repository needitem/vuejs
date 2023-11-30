const http = require('http');   // socket.io 서버를 올리기 위해 필요
const express = require('express');
const cors = require('cors');
//const socketio = require('socket.io');
const app = express();      //express app 생성
const webSocket = require('./socket.js');

app.use(express.json());  //json 형식 파싱하기
app.use(cors()); //cors 적용

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
  console.log(req);
  res.json({"message": "여러분들을 환영합니다."}); 
})

require('./router.js')(app);
var port = process.env.PORT || 8000;  //서버 포트(port) 설정

//클라이언트로부터 요청 듣기
const server = app.listen(port, () => {
    console.log(app.get('port'), '번 포트에서 서버 실행 중 ..')
});
webSocket(server); // ws와 http 포트 공유

/*
const io = socketio(httpServer,{
    cors:{                              //socket 사용시에 CORS 허용 설정
        origin:'*',
        method:["GET","PUT","POST"]
    }
});
io.sockets.on('connection',function(socket){
    // 소켓 통신을 위한 소켓을 전역적으로 쓸 수 있도록 정의
    global.$socket = socket;
    // 소켓 이벤트 처리
    socket.on('rint',function(data){
        console.log('Client Data:',data);
    })
});
*/
