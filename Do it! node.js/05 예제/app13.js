var express = require('express'), http = require('http'), path = require('path');
var bodyParser = require('body-parser'), static = require('serve-static');
var cookieParser = require('cookie-parser'), expressSession = require('express-session');
var errorHandler = require('errorhandler');
var app = express();

var expressErrorHandler = require('express-error-handler');


// 파일 업로드용 미들웨어
var multer = require('multer');
var fs = require('fs');
 
// 클라이언트에서 ajax로 요청했을 때 CORS(다중 서버 접속) 지원
var cors = require('cors');

var storage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, 'uploads')
    },
    filename: function(req, file, callback){
        callback(null, file.originalname + Date.now())
    }
});
 
var upload = multer({
    storage: storage,
    limits: {
        files: 10,
        fileSize: 1024*1024*1024
    }
});
 
// 라우터 사용하여 라우팅 함수 등록
var router = express.Router();

app.use(cookieParser());
app.use(expressSession({
   secret:'my key',
    resave:true,
    saveUninitialized:true
}));
app.use(cors());
var router = express.Router();

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/public',static(path.join(__dirname, 'public'))); // static(): 특정 폴더 지정, 요청 패스와 특정 폴더가 매핑됨
app.use('/uploads', static(path.join(__dirname, 'uploads')));

// 라우팅 함수 등록
router.route('/process/showCookie').get(function(req, res) { // router.route(요청 패스).get/post(실행될함수)
    console.log('/process/showCookie 처리함.');
    
    res.send(req.cookies);
});
 
// 상품 정보 라우팅 함수
router.route('/process/product').get(function(req,res){
    console.log('/process/product 호출됨.');
    
    if(req.session.user){
        res.redirect('/public/product.html');
    }else{
        res.redirect('/public/login2.html');
    }
});

router.route('/process/login').post(function(req,res){
    console.log('/process/login 호출됨.');
    
    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;
    
    if(req.session.user){
        //이미 로그인된 상태
        console.log('이미 로그인되어 상품 페이지로 이동합니다.');
        
        res.redirect('/public/product.html');
        
    }else{
        //세션 저장
        req.session.user = {
            id:paramId,
            name:'소녀시대',
            authorized:true
        };
        res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
        res.write('<h1>로그인 성공</h1>');
        res.write('<div><p>Param id : ' + paramId +  '</p></div>');
        res.write('<div><p>Param Password : '+ paramPassword +'</p></div>');
        res.write("<br><br><a href='/process/product'>상품 페이지로 이동하기</a>");
        res.end();
    }
});
// 로그아웃 라우팅 함수 - 로그아웃 후 세션 삭제함
router.route('/process/logout').get(function(req,res){
    console.log('/process/logout 호출됨.');
    
    if(req.session.user){
        //로그인된 상태
        console.log('로그아웃 합니다.');
        
        req.session.destroy(function(err){
            if (err) {throw err;}
            
            console.log('세션을 삭제하고 로그아웃되었습니다.');
            res.redirect('/public/login2.html');
        });
    }else{
        //로그인 안된 상태
        console.log('아직 로그인되지 않습니다.');
        
        res.redirect('/public/login2.html');
    }
});
// 라우터 객체를 app 객체에 등록
app.use('/', router);

http.createServer(app).listen(3000, function() { // express 서버 시작
    console.log('Express 서버가 3000번 포트에서 시작됨.'); 
}); 
// 사진 업로드하는 기능 라우팅 함수
router.route('/process/photo').post(upload.array('photo',1),function(req,res){
    
    try{
        var files = req.files;
        
        console.dir('#==== 업로드된 첫번째 파일 정보 ====#');
        console.dir(req.files[0]);
        console.dir('#=====#');
        
        // 현재의 파일 정보를 저장할 변수 선언
        var originalname = '',
            filename = '',
            mimetype= '',
            size = 0;
        
            if(Array.isArray(files)){
                console.log("배열에 들어있는 파일의 갯수 : %d",files.length);
                for(var index = 0; index < files.length; index++){
                    originalname = files[index].originalname;
                    filename = files[index].filename;
                    mimetype = files[index].mimetype;
                    size = files[index].size;
                }
            }else{
                // 배열에 들어가 있지 않은 경우 (현재 설정에서는 해당 없음)
                console.log('파일 갯수 : 1');
                
                originalname = files[index].originalname;
                filename = files[index].filename;
                mimetype = files[index].mimetype;
                size = files[index].size;
                
            }
        console.log('현재 파일 정보 : ' + originalname + ', ' + filename + ', ' + mimetype + ', ' + size);
        
        //클라이언트에 응답 전송
        res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
        res.write('<h3>파일 업로드 성공</h3>');
        res.write('<hr/>');
        res.write('<p>원본 파일 이름 : ' + originalname + '-> 저장 파일명 ' + filename + '</p>');
        res.write('<p>MIME TYPE : ' + mimetype + '</p>');
        res.write('<p>파일 크기 : ' + size + '</p>');
        res.end();
        
    }
    catch(err){
        console.dir(err.stack);
    }
});


app.use( expressErrorHandler.httpError(404));
app.use(errorHandler);