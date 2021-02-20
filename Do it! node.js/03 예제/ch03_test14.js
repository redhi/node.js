var Users = [{name:'소녀시대', age:20}, {name:'걸스데이', age:22}, {name:'티아라', age:23}, {name:'애프터스쿨', age:25}];
console.log('delete 키워드로 배열 요소 삭제 전 배열 요소의 수 : %d', Users.length);

console.log('배열 요소의 수 : %d', Users.length);
console.log('원본 Users');
console.dir(Users);

var Users2 = Users.slice(1,3); // slice(a, b) : a(요소의 시작 위치), b(끝 위치)를 지정하여 객체 복사

console.log('splice()로 잘라낸 후 Users2');
console.dir(Users2);

var Users3 = Users2.slice(1);

console.log('splice()로 잘라낸 후 Users3');
console.dir(Users3);