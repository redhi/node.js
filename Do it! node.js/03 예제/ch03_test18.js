function Person(name,age) { // 생성자(constructor)
    this.name = name;
    this.age = age;
}

Person.prototype.walk = function(speed) { // 속성 추가 시 객체.prototype.속성의 형태로 작성 (메모리 효율적 관리 가능)
    console.log(speed+ 'km 속도로 걸어갑니다.');
}

var person01 = new Person('소녀시대', 20);
var person02 = new Person('걸스데이', 22);

console.log(person01.name+'객체의 walk(10)을 호출합니다.');
person01.walk(10);
