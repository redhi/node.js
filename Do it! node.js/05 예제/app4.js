var express = require('express'), http = require('http');

var app = express(); // app 객체 생성

app.use(function(req, res, naxt) {
    console.log('첫 번째 미들웨어에서 요청을 처리함.');
    
    res.send({name:'소녀시대',age:20}); // send({body}) : 클라이언트에 응답 데이터를 보냄. 전달 데이터는 HTML 문자열, Buffer 객체, JSON 객체, JSON 배열,웹출
});

http.createServer(app).listen(3000, function() { // express 서버 시작
    console.log('Express 서버가 3000번 포트에서 시작됨.'); 
}); 



