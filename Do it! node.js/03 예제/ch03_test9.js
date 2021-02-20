var Users = [{name:'소녀시대', age:20}, {name:'걸스데이', age:22}]; // 배열 객체 생성 후 변수 할당

var add = function(a,b) {
    return a+b;
};

Users.push(add); // 변수(더하기 함수) 추가 할당, 함수 추가 가능

console.log('배열 요소의 수 : %d', Users.length); 
console.log('세 번째 요소로 추가된 함수 실행 : %d', Users[2](10,10));