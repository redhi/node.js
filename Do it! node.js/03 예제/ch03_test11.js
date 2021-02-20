var Users = [{name:'소녀시대', age:20}, {name:'걸스데이', age:22}];
console.log('push() 호출 전 배열 요소의 수 : %d', Users.length);

Users.push({name: '티아라', age:23}); // 배열의 가장 끝부분에 추가
console.log('push() 호출 후 배열 요소의 수 : %d', Users.length); 

Users.pop(); // 배열의 가장 끝부분 삭제
console.log('pop() 호출 후 배열 요소의 수 : %d', Users.length); 
