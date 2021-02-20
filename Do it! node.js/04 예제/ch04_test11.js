var fs = require('fs');

var infile = fs.createReadStream('./output.txt', {flags: 'r'}); // 스트림 단위 
var outfile = fs.createWriteStream('./output2.txt', {flags: 'w'});

infile.on('data', function(data) {
    console.log('읽어 들인 데이터', data);
    outfile.write(data); // outfile에 data를 쓴다
});

infile.on('end', function() {
    console.log('파일 읽기 종료.');
    outfile.end(function() {
        console.log('파일 쓰기 종료.');
    });
});