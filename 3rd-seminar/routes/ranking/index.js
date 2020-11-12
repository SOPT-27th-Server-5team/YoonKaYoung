const express = require('express'); //express 모듈 불러오기
const router = express.Router(); //라우터 변수

router.get('/popular', (req, res) => { // popular에서 get 요청을 받는다 req, res 순서로 써줘야함!!
  res.status(200).send("인기많은 순 뉴스");
})

router.get('/bestreply', (req, res) => { // bestreply에서 get요청을 받는다.
  res.status(200).send("댓글 많은 순 뉴스");
});

router.get('/age', (req, res) => { // age에서 get요청을 받는다.
  res.status(200).send("나이 별 랭킹 뉴스");
});

module.exports = router; // 라우터를 export한다.