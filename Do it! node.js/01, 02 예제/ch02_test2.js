console.log('argv 속성의 파라미터 수 : ', +process.argv.length); // process : 프로세스의 실행에 대한 정보를 다루는 객체
console.dir(process.argv); // dir() : 객체가 가진 속성 출력, 배열 객체의 형식, 기본 2개(node 명령, 파일 패스)

if(process.argv.length > 2) {
    console.log('세 번째 파라미터의 값 : %s', process.argv[2]);
}

process.argv.forEach(function(item, index) {
                     console.log(index+' : ',item);
                     }); // forEach() : 배열 속성을 하나 씩 출력할 때, 아이템 값, 인덱스 함께 전달
/* cmd에 node ch02_test2.js __port 7001 입력 시
argv 속성의 파라미터 수 : 4
__port 7001 추가
세 번째 파라미터의 값 : __port
*/