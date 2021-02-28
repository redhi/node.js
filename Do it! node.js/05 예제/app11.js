var express = require('express'), http = require('http'), path = require('path');
var bodyParser = require('body-parser'), static = require('serve-static');
var cookieParser = require('cookie-parser');
var app = express();

var expressErrorHandler = require('express-error-handler');
var errorHandler = expressErrorHandler({
    static: {
        '404': './public/404.html'
    }
});

app.use(cookieParser());

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
 
router.route('/process/setUserCookie').get(function(req,res){
    console.log('/process/setUserCookie 호출됨.');
    
    // 쿠키 설정
    res.cookie('user',{
        id : 'mike',
        name : '소녀시대',
        authorized : true
    });
    
    // redirect 로 응답
    res.redirect('/process/showCookie');
});


// 라우터 객체를 app 객체에 등록
app.use('/', router);

http.createServer(app).listen(3000, function() { // express 서버 시작
    console.log('Express 서버가 3000번 포트에서 시작됨.'); 
}); 


app.use( expressErrorHandler.httpError(404));
app.use(errorHandler);