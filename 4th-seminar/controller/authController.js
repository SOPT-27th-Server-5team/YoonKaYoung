const statusCode = require('../modules/statusCode');
const responseMessage = require('../modules/responseMessage');
const util = require('../modules/util');
const jwt = require('../modules/jwt');
const TOKEN_EXPIRED = -3
const TOKEN_INVALID = -2

module.exports = {
  verifyJwt : async (req, res) => {
    const token = req.headers.jwt; //요청헤더에 있는 jwt토큰을
    if (!token) {
      return res.json(util.fail(statusCode.BAD_REQUEST, responseMessage.EMPTY_TOKEN));
    }
    const user = await jwt.verify(token); //jwt 메서드를 통해 디코딩한다.
    console.log(user);
    if (user === TOKEN_EXPIRED) {
      return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, responseMessage.EXPIRED_TOKEN));
    }
    if (user === TOKEN_INVALID) {
      return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, responseMessage.INVALID_TOKEN));
    }
    if (user.id === undefined) {
      return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, responseMessage.INVALID_TOKEN));
    }
    return res.status(statusCode.OK).send(util.fail(statusCode.OK, responseMessage.AUTH_SUCCESS, user));
  },
  reIssueJwt: async (req, res) => {
    try {
      const refreshToken = req.headers.refreshtoken;
      console.log(req.headers);
      if(!refreshToken) {
        console.log('refreshToken이 없습니다.');
        return res.json(util.fail(statusCode.BAD_REQUEST, responseMessage.EMPTY_TOKEN));
      }
      const { token } = await jwt.refresh(refreshToken);
      if (!token) {
        console.log('토큰이 없습니다.');
        return res
          .status(statusCode.INTERNAL_SERVER_ERROR)
          .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
      } else if(token === TOKEN_INVALID) {
        console.log('refreshToken이 만료되었습니다.');
        return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, responseMessage.INVALID_TOKEN));
      }
      return res
        .status(statusCode.OK)
        .send(util.success(statusCode.OK, responseMessage.ISSUE_SUCCESS, {
          accessToken: token
        }));
    } catch (err) {
      console.log(err);
      return res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
    }
  }
};
