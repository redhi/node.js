function add(a,b,callback) {
    var result = a+b;
    callback(result);
    
    var history = function() {
        return a+'+'+b+'='+result;
    };
    return history;
}

var add_history = add(10,10,function(result) {
    console.log('파라미터로 전달된 콜백 함수 호출됨.'); // console.log는 호출되지 않아도 출력
    console.log('더하기 (10, 10)의 결과 : %d', result);
});

console.log('결과 값으로 받은 함수 실행 결과 : '+add_history()); // history 반환