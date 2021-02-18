var result = 0;

console.time('duration_sum'); // 실행 시간 측정 시작 시간 기록

for(var i = 1; i<= 1000; i++) {
    result += i;
}

console.timeEnd('duration_sum'); // 마지막 시간 기록
console.log('1부터 1000까지 더한 결과물 : %d', result);

console.log('현재 실행한 파일의 이름 : %s', __filename);
console.log('현재 실행한 파일의 패스 : %s', __dirname);

var Person = {name:"소녀시대", age:20};
console.dir(Person); // dir() : 자바스크립트 객체의 속성들 출력
