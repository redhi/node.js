var Calc = require('./Calc3');

var Calc = new Calc();
Calc.emit('stop');

console.log(Calc.title+'에 stop 이벤트 전달함.');