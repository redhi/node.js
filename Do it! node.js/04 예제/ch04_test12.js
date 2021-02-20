var fs = require('fs');

var inname = './output.txt';
var outname = './output2.txt';

fs.exists(outname, function(exists) {
    if(exists) {
        fs.unlink(outname, function(err) { // unlink() : 같은 이름 가진 파일을 만들기 전 이전 파일 삭제하도록
            if(err) throw err;
            console.log('기존 파일 ['+outname+'] 삭제함.');
        });
    }
    var infile = fs.createReadStream(inname, {flags: 'r'});
    var outfile = fs.createWriteStream(outname, {flags: 'w'});
    infile.pipe(outfile); // pipe() : 두 개의 스트림 연결해줌, 파일 내용 저절로 복사
    console.log('파일 복사 ['+inname+'] -> ['+outname+']');
});