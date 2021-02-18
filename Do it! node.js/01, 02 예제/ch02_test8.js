var path = require('path');
//디렉터리 이름 합치기
var directories = ["users", "mike", "docs"]; // 배열 객체 생성
var docsDirectory = directories.join(path.sep); // join() : 여러 이름 합쳐 하나의 파일 패스 만듦, 구분자 알아서 조정
console.log('문서 디렉터리 : %s', docsDirectory);
//디렉터리 이름과 파일 이름 합치기
var curPath = path.join('/Users/mike', 'notepad.exe');
console.log('파일 패스 : %s', curPath);
// 패스에서 디렉터리, 파일 이름, 확장자 구별하기
var filename = "C:\\Users\\mike\\notepad.exe";
var dirname = path.dirname(filename); // dirname() : 디렉터리 이름 반환
var basename = path.basename(filename); // basename() : 확장자 제외 이름 반환
var extname = path.extname(filename); // extname() : 확장자 반환

console.log('디렉터리 : %s, 파일 이름 : %s, 확장자 : %s', dirname, basename, extname);