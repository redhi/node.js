var nconf = require('nconf'); // 상대패스가 아니면 모듈의 이름으로 불러온다
nconf.env(); // 환경변수 정보 가져와 속성으로 보관

console.log('OS 환경 변수의 값 : %s', nconf.get('OS'));
/* npm install nconf : nconf 패키지 설치
npm init : package.json 파일 안에 설치한 패키지 정보 넣어둠
npm uninstall nconf
npm install nconf --save : 삭제 후 재설치, package.json 파일 안 dependencies 속성 추가
이 프로젝트에서 사용한 모듈을 다른 pc에서 사용 시 package 파일만 옮긴 후 npm install 입력하면 설치됨
*/