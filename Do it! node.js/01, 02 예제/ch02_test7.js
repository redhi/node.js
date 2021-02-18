var os = require('os');
// 내장 모듈 활용, 모니터링 시 사용
console.log('시스템의 hostname : %s', os.hostname()); // hostname() : 운영체제 호스트 이름
console.log('시스템의 메모리 : %d', os.freemem(), os.totalmem()); // totalmem() : 전체 메모리 용량, freemem() : 사용 가능한 메모리 용량
console.log('시스템의 CPU 정보\n');
console.dir(os.cpus()); // cpus() : cpu 정보
console.log('시스템의 네트워크 인터페이스 정보\n');
console.dir(os.networkInterfaces()); // networkInterfaces() : 네트워크 인터페이스 정보를 담은 배열 객체 반환