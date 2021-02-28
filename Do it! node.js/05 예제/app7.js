// Express 기본 모듈 불러오기
var express = require('express'), http = require('http'), path = require('path');

// Express 미들웨어 불러오기
var bodyParser = require('body-parser'), static = require('serve-static');

// 익스프레스 객체 생성
var app = express();

// 기본 속성 설정
app.set('port', process.env.PORT || 3000);

// body-parser를 사용해 application/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({extended:false}));

// body-parser를 사용해 application/json 파싱
app.use(bodyParser.json());

app.use('/public',static(path.join(__dirname, 'public'))); // static(): 특정 폴더 지정, 요청 패스와 특정 폴더가 매핑됨

// 미들웨어에서 파라미터 확인
app.use(function(req, res, next) {
    console.log('첫 번째 미들웨어에서 요청을 처리함.');
    
    var paramId = req.body.id || req.query.id; // 요청 파라미터 참조
    var paramPassword = req.body.password || req.query.password; // GET 방식 POST 방식 요청할지 모르는 경우
    
    res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
    res.write('<h1>Express 서버에서 응답한 결과입니다.</h1>'); // 웹에 출력됨
    res.write('<div><p>Param id : '+paramId+'</p><div>');
    res.write('<div><p>Param password : '+paramPassword+'</p><div>');
    res.end();
});

http.createServer(app).listen(3000, function() { // express 서버 시작
    console.log('Express 서버가 3000번 포트에서 시작됨.'); 
}); 

