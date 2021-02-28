var express = require('express'), http = require('http');

var app = express(); // app 객체 생성
app.use(function(req, res, next) {
    console.log('첫 번째 미들웨어에서 요청을 처리함.');
    
    req.user = 'mike';
    
    next(); // 두 번째 미들웨어로 처리 순서를 넘겨줌.
});
app.use(function(req, res, naxt) {
    console.log('두 번째 미들웨어에서 요청을 처리함.');
    
    var userAgent = req.header('User-Agent'); // heade(name) : 헤더를 확인
    var paramName = req.query.name; // query : 클라이언트에서 GET 방식으로 전송한 요청 파라미터를 확인
    
    res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
    res.write('<h1>Express 서버에서 응답한 결과입니다.</h1>'); // 웹에 출력됨
    res.write('<div><p>User-Agent : '+userAgent+'</p><div>');
    res.write('<div><p>Param Agent : '+paramName+'</p><div>');
    res.end();
});

http.createServer(app).listen(3000, function() { // express 서버 시작
    console.log('Express 서버가 3000번 포트에서 시작됨.'); 
}); 



