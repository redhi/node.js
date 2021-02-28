var express = require('express'), http = require('http'), path = require('path');
var bodyParser = require('body-parser'), static = require('serve-static');
var cookieParser = require('cookie-parser'), expressSession = require('express-session');
var app = express();

var expressErrorHandler = require('express-error-handler');
var errorHandler = expressErrorHandler({
    static: {
        '404': './public/404.html'
    }
});

app.use(cookieParser());
app.use(expressSession({
   secret:'my key',
    resave:true,
    saveUninitialized:true
}));

var router = express.Router();

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/public',static(path.join(__dirname, 'public'))); // static(): 특정 폴더 지정, 요청 패스와 특정 폴더가 매핑됨

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


app.use( expressErrorHandler.httpError(404));
app.use(errorHandler);