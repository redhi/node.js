var fs = require('fs');
fs.mkdir('./docs', 0666, function(err) { // mkdir() : 새로운 폴더 만듦
    if(err) throw err;
    console.log('새로운 docs 폴더를 만들었습니다.');
    
    fs.rmdir('./docs', function(err) { /// rmdir() : 폴더 삭제
        if(err) throw err;
        console.log('docs 폴더를 삭제했습니다.');
    });
});