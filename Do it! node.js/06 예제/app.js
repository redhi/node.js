// Express 기본 모듈 불러오기
var express = require('express'), http = require('http'), path = require('path');

// Express의 미들웨어 불러오기
var bodyParser = require('body-parser'), cookieParser = require('cookie-parser'), static = require('serve-static');

// 오류 핸들러 모듈 사용
var expressErrorHandler = require('express-error-handler');

// Session 미들웨어 불러오기
var expressSession = require('express-error-handler');

// 익스프레스 객체 생성
var app = express();

// 기본 속성 설정
app.set('port', process.env.PORT || 3000);

// body-parser를 사용해 application/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({ extended: false}));

// body-parser를 사용해 application/json 파싱
app.use(bodyParser.json());

// public 폴더를 static으로 오픈
app.use('/public', static(path.join(__dirname, 'public')));

// cookie-parser 설정
app.use(cookieParser());

// 세션 설정
app.use(expressSession({
    secret:'my key',
    resave:true,
    saveUninitialized:true
}));

// 몽고디비 모듈 사용
var MongoClient = require('mongodb').MongoClient;

// 데이터베이스 객체를 위한 변수 선언
var database;

// 데이터베이스에 연결
function connectDB() {
    // 데이터베이스 연결 정보
    var databaseUrl = 'mongodb://localhost:27017/local'; // //%ip정보%:%포트정보%/%데베이름%
    
    // 데이터베이스 연결
    MongoClient.connect(databaseUrl, function(err, db) { // db -> client로 바꾸면
        if (err) throw err;
        
        console.log('데이터베이스에 연결되었습니다. : '+ databaseUrl);
        
        // 데베 변수에 할당
        database = db.db('local'); // 선언 방식 변경 앞에 값 client.db로 변경됨
    });
}

// 라우터 객체 참조
var router = express.Router();

// javascript는 순서가 중요해!!
app.post('/process/login', function(req, res) {
    console.log('process/login 호출됨.');
    
    var paramId = req.body.id; // 대신 qurey, body 사용
    var paramPassword = req.body.password;
    
    if(database) {
        authUser(database, paramId, paramPassword, function(err, docs) {
            if(err) {throw err;}
        if(docs) {
            console.dir(docs);
            var username = docs[0].name;
            res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
            res.write('<h1>로그인 성공</h1>');
            res.write('<div><p>사용자 아이디 : '+paramId+'</p></div>');
            res.write('<div><p>사용자 이름 : '+username+'</p></div>');
            res.write("<br><br><a href='/public/login/html'>다시 로그인하기</a>");
            res.end();
        }
        else {
            res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
            res.write('<h1>로그인 실패</h1>');
            res.write('<div><p>아이디와 비밀번호를 다시 확인하십시오.</p></div>');
            res.write("<br><br><a href='/public/login/html'>다시 로그인하기</a>");
            res.end();
        }
        });
    } else {
         res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
            res.write('<h2>데이터베이스 연결 실패</h2>');
            res.write('<div><p>데이터베이스에 연결하지 못했습니다.</p></div>');
            res.end();
    }
});
/*// 로그인 라우팅 함수 - 데이터베이스의 정보와 비교
router.route('/process/login').post(function(req,res) {
    console.log('/process/login 호출됨.');
    
    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;
    console.log('요청 파라미터 : '+paramId+', '+paramPassword);
    
    if (database)
});*/

// 라우터 객체 등록
app.use('/', router);

// 사용자를 인증하는 함수
var authUser = function(database, id, password, callback) {
    console.log('authUser 호출됨.');
    
    // users 컬렉션 참조
    var users = database.collection('users');
    
    // 아이디와 비밀번호를 사용해 검색
    users.find({"id" : id, "password" : password}).toArray(function(err, docs) {
        if(err) {
            callback(err, null);
            return;
        }
        if(docs.length>0) { // 일치값 찾음
            console.log('아이디 [%s], 비밀번호 [%s]가 일치하는 사용자 찾음.', id, password);
            callback(null, docs);
        }  else {
                console.log("일치하는 사용자를 찾지 못함.");
                callback(null, null);
            }
    });
}
// 404 오류 페이지 처리
var errorHandler = expressErrorHandler({
    static: {
        '404': './public/404.html'
    }
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

// 서버 시작
http.createServer(app).listen(app.get('port'), function() {
    console.log('서버가 시작되었습니다. 포트 : '+app.get('port'));
    
    // 데베 연결
    connectDB();
});
