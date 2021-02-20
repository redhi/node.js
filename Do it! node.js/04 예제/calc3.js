var util = require('util');
var EventEmitter = require('events').EventEmitter; // events 모듈 안 정의된 EventEmitter 객체 참조

var Calc = function() {
    var self = this;
    
    this.on('stop', function() { // stop 이벤트 처리위해
        console.log('Calc에 stop event 전달됨.');
    });
};

util.inherits(Calc, EventEmitter); // util.inherits() : Calc이 EventEmitter를 상속

Calc.prototype.add = function(a,b) {
    return a+b;
}

module.exports = Calc; // 모듈 불러들이는 쪽에서 Calc 객체를 참조할 수 있도록
module.exports.title = 'calculator';