var add = function(a,b) {
    return a+b;
}; // 익명함수의 형태이므로 선언문아니고 표현식 -> 맨 뒤에 ; 붙이자 / 변수에 함수 할당

var result = add(10, 10);

console.log('더하기 (10,10) : %d', result);