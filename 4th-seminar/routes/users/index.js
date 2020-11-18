const express = require('express');
const router = express.Router();
const userController = require('../../controller/userController');

router.post('/signup', userController.signup);

router.post('/signin', userController.signin);

router.get('/', userController.readAll);

router.get('/:id', userController.readOne);
//1. 모든 사용자 정보 (id, email, userName ) 리스폰스!
module.exports = router;