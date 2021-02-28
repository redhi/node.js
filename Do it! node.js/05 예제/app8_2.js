// 에러 다시
// Express 기본 모듈 불러오기
var express = require('express'), http = require('http'), path = require('path');

// Express 미들웨어 불러오기
var bodyParser = require('body-parser'), static = require('serve-static');

var app = express();

// 라우터 객체 참조
var router = express.Router();
// 기본 속성 설정
app.set('port', process.env.PORT || 3000);
// body-parser를 사용해 application/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({extended:false}));

// body-parser를 사용해 application/json 파싱
app.use(bodyParser.json());

app.use('/public',static(path.join(__dirname, 'public'))); // static(): 특정 폴더 지정, 요청 패스와 특정 폴더가 매핑됨

// 라우팅 함수 등록
router.route('/process/login/:name').post(function(req, res) { // router.route(요청 패스).get/post(실행될함수)
    console.log('/process/login/:name 처리함.');
    
    var paramName = req.params.name;
    
    var paramId = req.body.id || req.query.id; // 요청 파라미터 참조
    var paramPassword = req.body.password || req.query.password; // GET 방식 POST 방식 요청할지 모르는 경우
    
    res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
    res.write('<h1>Express 서버에서 응답한 결과입니다.</h1>'); // 웹에 출력됨
    res.write('<div><p>Param name : '+paramName+'</p></div>');
    res.write('<div><p>Param id : '+paramId+'</p></div>');
    res.write('<div><p>Param password : '+paramPassword+'</p></div>');
    res.write(" <br><br><a href='/public/login3.html'>로그인 페이지로 돌아가기</a>");
    res.end();
    
});

// 등록되지 않은 패스에 대해 페이지 오류 응답
app.all('*', function(req, res) {
    res.status(404).send('<h1>ERROR - 페이지를 찾을 수 없습니다.</h1>');
});


// 라우터 객체를 app 객체에 등록
app.use('/', router);

http.createServer(app).listen(3000, function() { // express 서버 시작
    console.log('Express 서버가 3000번 포트에서 시작됨.'); 
}); 

