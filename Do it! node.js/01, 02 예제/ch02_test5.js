var calc = require('./calc'); // require() : 모듈을 불러옴, 파라미터로 모듈 파일의 이름 전달, ./(상대패스), 여기서 calc 객체는 exports 객체와 같다
console.log('모듈을 분리한 후 - calc.add 함수 호출 결과 : %d', calc.add(10, 10));
/* 메인 파일 역할, calc.js 모듈 파일을 불러옴 */

var calc2 = require('./calc2');
console.log('모듈을 분리한 후 - calc2.add 함수 호출 결과 : %d', calc2.add(10, 10)); // calc2 객체는 module.exports에 할당했던 객체가 됨