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

// 사용자를 추가하는 함수
var addUser = function(database, id, password, name, callback) { // callback은 함수 호출 쪽에 결과 객체 보내기 위해 전달받음
    console.log('addUser 호출됨 : '+id+', '+password+', '+name);
    
    // users 컬렉션 참조
    var users = database.collection('users');
    
    // id, password, username을 사용해 사용자 추가
    users.insertMany([{"id":id, "password":password,"name":name}], function(err, result){
        if(err) { // 오류가 발생했을 때 콜백 함수를 호출하면서 오류 객체 전달
            callback(err,null);
            return;
            
        }
        
        // 오류가 아닌 경우, 콜백 함수를 호출하면서 결과 객체 전달
        if(result.insertedCount>0) {
            console.log("사용자 레코드 추가됨 : "+result.insertedCount);
        } else {
            console.log("추가된 레코드가 없음.");
        }
        callback(null,result);
    });
}

// 라우터 객체 참조
var router = express.Router();

// javascript는 순서가 중요해!!
router.route('/process/adduser').post( function(req, res) {
    console.log('/process/adduser 호출됨.');
    
    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;
    var paramName = req.body.name || req.query.name;
    
    console.log('요청 파라미터 : '+paramId+', '+paramPassword+', '+paramName);
    
    // 데이터베이스 객체가 초기화된 경우, addUser 함수 호출하여 사용자 추가
    
    if(database) {
        addUser(database, paramId, paramPassword, paramName, function(err, result) {
            if(err) {throw err;}
        // 결과 객체 확인하여 추가된 데이터 있으면 성공 응답 전송
        if(result && result.insertedCount>0) {
            console.dir(result);
            
            res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
            res.write('<h2>사용자 추가 성공</h2>');
            res.end();
        }
        else { // 결과 객체가 없으면 실패 응답 전송
            res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
            res.write('<h2>사용자 추가 실패</h2>');
            res.end();
        }
        });
    } else { // 데이터베이스 객체가 초기화되지 않은 경우 실패 응답 전송
         res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
            res.write('<h2>데이터베이스 연결 실패</h2>');
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
