var fs = require('fs');

// 파일에 데이터를 씁니다.
fs.open('./output.txt', 'w', function(err, fd) { // open(path, flags(r:읽기, w:쓰기, w+:(읽기,쓰기,이전내용삭제), a+:(읽기,추가,새로운내용추가)), [mode], [callback]
    if(err) throw err;
    
    var buf = new Buffer('안녕!\n'); // 버퍼 객체를 만들고 안녕!이라는 글자 넣는다
    fs.write(fd, buf, 0, buf.length, null, function(err, written, buffer) { // write(fd,buffer,offset,length,position,[callback])
        // 파일 열리면 fd 객체 사용가능(파일 구별)
        if(err) throw err;
        
        console.log(err, written, buffer);
        
        fs.close(fd, function() { // close(fd,[callback])
            console.log('파일 열고 데이터 쓰고 파일 닫기 완료.');
        
        });
    });
});