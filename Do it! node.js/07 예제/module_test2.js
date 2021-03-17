// Reason : user2.js 파일에서 exports에 객체를 할당하였으므로, require()를 호출할 때 자바스크립트에서 새로운 변수로 처리함
// 결국 아무 속성도 없는 {} 객체가 반환됨
var user = require('./user2');

console.dir(user);

function showUser() {
    return user.getUser().name + ', ' + user.group.name; // 전역변수만 참고하는데 exports 변수내에 단순 변수로 선언되어 불러올 값이 없다.
}

console.log(showUser());