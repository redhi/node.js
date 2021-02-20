var fs = require('fs');

// 파일에 데이터를 씁니다.
fs.writeFile('./output.txt', 'Hello World!', function(err) { // writeFile() : 첫 파라미터 파일 이름, 두번째 쓸 내용, 세번 째 끝나면 호출될 콜백 함수
    if(err) {
        console.log('Error : '+err);
    }
    
    console.log('output.txt 파일에 데이터 쓰기 완료.');
})