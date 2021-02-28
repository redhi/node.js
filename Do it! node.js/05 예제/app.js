// Express 기본 모듈 불러오기
var express = require('express'), http = require('http');

// 익스프레스 객체 생성
var app = express();

// 기본 포트를 app 객체에 속성으로 설정
app.set('port', process.env.PORT || 3000); // set(name, value) : 지정 속성은 get() 메소드를 꺼내 확인 가능

// Express 서버 시작
http.createServer(app).listen(app.get('port'), function() {
    console.log('익스프레스 서버를 시작했습니다 : '+ app.get('port'), function() { // get(name) : 서버 설정을 위해 지정한 속성
        console.log('익스프레스 서버를 시작')
    })
})

// 속성 설정
app.set('port', process.env.PORT || 3000); // env : 서버 모드를 설정
