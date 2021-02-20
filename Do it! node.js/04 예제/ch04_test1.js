var url = require('url'); // url 모듈 사용하기 위해 require로 호출

// 주소 문자열을 URL 객체로 만들기
var curURL = url.parse('https://m.search.naver.com/search.naver?query=steve+jobs&where=m&sm=mtp_hty'); // parse() : 주소 문자열 -> URL 객체

// URL 객체를 주소 문자열로 만들기
var curStr = url.format(curURL); // format() : URL 객체 -> 문자열

console.log('주소 문자열 : %s', curStr);
console.dir(curURL);

// 요청 파라미터 구분하기
var querystring = require('querystring'); // 요청 파라미터 쉽게 분리하기 위한 모듈 querystring 호출
var param = querystring.parse(curURL.query);

console.log('요청 파라미터 중 query의 값 : %s', param.query);
console.log('원본 요청 파라미터 : %s', querystring.stringify(param)); // stringify() : 객체 안에 있는 요청 파라미터를 다시 하나의 문자열로 바꿀 때 사용
