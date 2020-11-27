const express = require('express');
const router = express.Router();
const userController = require('../../controller/userController');
const authUtils = require('../../middlewares/authUtil');

router.post('/signup', userController.signup);

router.post('/signin', userController.signin);

router.get('/', userController.readAll);
router.get('/profile', authUtils.checkToken, userController.getProfile);
router.get('/:id', userController.readOne);
router.delete('/delete/:id', userController.deleteUser);
router.put('/update', userController.updateUser);

//1. 모든 사용자 정보 (id, email, userName ) 리스폰스!
module.exports = router;