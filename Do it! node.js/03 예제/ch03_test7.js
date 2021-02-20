var Person = { // 객체 생성과 속성 초기화를 동시에
    age: 20,
    name: '소녀시대',
    add: function(a,b) { 
    return a+b;
    }
};

console.log('더하기 : %d', Person.add(10,10));