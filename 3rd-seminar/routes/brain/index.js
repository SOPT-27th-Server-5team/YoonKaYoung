const express = require('express');
const router = express.Router();

const util = require('../../modules/util');
const responseMessage = require('../../modules/responseMessage');
const statusCode = require('../../modules/statusCode');
const brainsDB = require('../../modules/brainMembers');

router.get('/', (req, res) => {
  const members = brainsDB;
  return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.MEMBER_READ_ALL_SUCCESS, members));
})

module.exports = router;