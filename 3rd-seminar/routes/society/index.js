//라우터 생성하기~~

const express = require('express'); //express 모듈 불러오기
const router = express.Router(); //라우터 변수 생성

router.get('/', (req, res) => { // 루트로 들어오는 get 요청에는 '사회 뉴스!'라는 응답을 보냄!
  res.status(200).send('사회 뉴스!');
});

module.exports = router; // 라우터 export하기.