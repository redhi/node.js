var express = require('express'), http = require('http');

var app = express(); // app 객체 생성

http.createServer(app).listen(3000, function() { // express 서버 시작
    console.log('Express 서버가 3000번 포트에서 시작됨.'); 
}); 

app.use(function(req, res, next) {
    console.log('첫 번째 미들웨어에서 요청을 처리함.');
    
    req.user = 'mike';
    
    next(); // 두 번째 미들웨어로 처리 순서를 넘겨줌.
});

app.use('/', function(req, res, next) { // req : 요청객체, res : 응답객체
    console.log('두 번째 미들웨어에서 요청을 처리함.');
    
    res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
    res.end('<h1>Express 서버 '+req.user+'가 응답한 결과입니다.</h1>'); // 웹에 출력됨

})