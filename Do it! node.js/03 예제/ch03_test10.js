var Users = [{name:'소녀시대', age:20}, {name:'걸스데이', age:22}, {name:'티아라', age:23}]; // 배열 객체 생성 후 변수 할당

console.log('배열 요소의 수 : %d', Users.length);
for(var i=0; i<Users.length; i++) { // for문으로 
    console.log('배열 요소 #'+i+' : %s', Users[i].name);
}

console.log('\nforEach 구문 사용하기');
Users.forEach(function(item, index) { // forEach문 item : 배열의 각 요소, index : 각 요소의 인덱스 값
              console.log('배열 요소 #'+i+' : %s', item.name);
});