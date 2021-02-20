var fs = require('fs');
var http = require('http'); // http 모듈 사용
var server = http.createServer(function(req,res) {
    // 파일을 읽어 응답 스트림과 pipe()로 연결합니다.
    var instream = fs.createReadStream('./output.txt'); // 클라이언트 요청 시 output.txt 파일에서 스트림 만듦(읽기)
    instream.pip(res); // 데이터를 보낼 수 있는 스트림과 연결해줌(쓰기)
});
server.listen(7001, '127.0.0.1');