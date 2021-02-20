function add(a,b,callback) { // 비동기 프로그래밍 시 함수를 파라미터로 전달, 콜백 함수 : 함수 실행 중간 호출, 상태정보전달 or 결과값 처리사용
    var result = a+b;
    callback(result); // result값을 callback 함수 호출 시 전달
    
}

add(10,10,function(result) {
    console.log('파라미터로 전달된 콜백 함수 호출됨.');
    console.log('더하기 (10, 10)의 결과 : %d', result);
});