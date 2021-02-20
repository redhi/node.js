var Users = [{name:'소녀시대', age:20}, {name:'걸스데이', age:22}, {name:'티아라', age:23}];
console.log('delete 키워드로 배열 요소 삭제 전 배열 요소의 수 : %d', Users.length);

delete Users[1]; // 두 번째 요소 삭제, 요소를 담아두는 공간은 남고 객체만 삭제됨
console.log('delete 키워드로 배열 요소 삭제 후');
console.dir(Users);

Users.splice(1, 0, {name:'애프터스쿨', age:25}); // splice(a,b,c) : a(처리할 인덱스 값), b(삭제할 개수, 0이면 추가), c(추가하려는 객체)
console.log('splice()로 요소를 인덱스 1에 추가한 후');
console.dir(Users);

Users.splice(2, 1);
console.log('splice()로 인덱스 2의 요소를 1개 삭제한 후');
console.dir(Users);