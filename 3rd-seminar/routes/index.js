//전체 프로젝트 라우터!

var express = require('express'); //express 모듈 불러오기
var router = express.Router(); //라우터 변수 생성

router.use('/users', require('./users')); // use는 모든 요청을 처리할 수 있는 함수이다.
//그리고 require()는 우리가 index 파일에서 export했던 라우터를 불러온다.
router.use('/ranking', require('./ranking'));
router.use('/society', require('./society'));
router.use('/members', require('./members'));
router.use('/brain', require('./brain'));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
