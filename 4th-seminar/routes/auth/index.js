const express = require('express');
const router = express.Router();
const authController = require('../../controller/authController');

router.get('/', authController.verifyJwt);
router.get('/newToken', authController.reIssueJwt);

module.exports = router;