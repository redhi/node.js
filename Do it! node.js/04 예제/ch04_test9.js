var fs = require('fs');

// 파일에서 데이터를 읽어 들입니다.
fs.open('./output.txt', 'r', function(err,fd) {
    if(err) throw err;
    
    var buf = new Buffer(10); // 버퍼 안에 들어갈 바이트 데이터 크기 지정
    console.log('버퍼 타입 : %s', Buffer.isBuffer(buf));
    
    fs.read(fd, buf, 0, buf.length, null, function(err, bytesRead, buffer) {
        if(err) throw err;
        
        var inStr = buffer.toString('utf8', 0, bytesRead); // 읽은 데이터를 inStr에 저장
        console.log('파일에서 읽은 데이터 : %s', inStr);
        
        console.log(err, bytesRead, buffer);
        
        fs.close(fd, function() {
            console.log('output.txt 파일을 열고 읽기 완료.');
        });
    });
});