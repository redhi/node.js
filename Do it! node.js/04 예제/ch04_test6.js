var fs = require('fs');

// 파일을 비동기식 IO로 읽어 들입니다.
fs.readFile('./package.json', 'utf8', function(err,data) { // readFile() : 세번째 파라미터로 전달된 함수는 작업 끝나면 호출, (err, data)를 통해 오류 발생했는지 아니면 제대로 실행됬는지 알 수 있음, 오류 발생 시 err에 오류 데이터들어감 아니면 err 값이 null이 됨
    // 읽어들인 데이터를 출력합니다.
    console.log(data);
});

console.log('프로젝트 폴더 안의 package.json 파일을 읽도록 요청했습니다.');