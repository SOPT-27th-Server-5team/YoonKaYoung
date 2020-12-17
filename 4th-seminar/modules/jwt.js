const jwt = require('jsonwebtoken');
const { secretKey, options, refreshOptions } = require('../config/secretKey');
const { userService } = require('../service');
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

module.exports = {
  sign: async (user) => {
    const payload = {
      id: user.id,
      name: user.userName
    };
    const result = {
      accessToken: jwt.sign(payload, secretKey, options),
      refreshToken: jwt.sign(payload, secretKey, refreshOptions),
    };
    await userService.updateRefreshToken(user.id, result.refreshToken);
    return result;
  },
  verify: async (token) => {
    let decoded;
    try {
      decoded = jwt.verify(token, secretKey);
      if (!decoded) {
        throw err
      }
    } catch (err) {
      if (err.message === 'jwt expired') {
        console.log('expired token');
        return TOKEN_EXPIRED;
      } else if (err.message === 'invalid token') {
        console.log('invalid token');
        console.log(TOKEN_INVALID);
        return TOKEN_INVALID;
      } else {
        console.log("invalid token: unknown error");
        return TOKEN_INVALID;
      }
    }
    return decoded;
  },
  refresh: async (refreshToken) => {
    try {
      console.log(`refreshToken: ${refreshToken}`);
      
      const result = jwt.verify(refreshToken, secretKey);
      
      if (!result.id) { // if returned id is undefined(falsy) 
        console.log('result.id 오류: 토큰이 올바르지 않습니다.');
        return TOKEN_INVALID;
      }
      const user = await userService.getUserId(result.id); // 왜자꾸 여기서 안되는걸까?!?

      console.log(`user.refreshToken: ${user.refreshToken}`);
      if (refreshToken !== user.refreshToken) {
        console.log('invalid refresh token');
        return TOKEN_INVALID;
      }
      const payload = {
        id: user.id,
        name: user.userName
      };
      const dto = {
        token: jwt.sign(payload, secretKey, options) // new Access Token
      };
      return dto;
    } catch (err) {
      if (err.message === 'jwt expired') {
        console.log('TOKEN ERROR: expired token');
        return TOKEN_INVALID;
      } else if (err.message === 'invalid token') {
        console.log('invalid token');
        console.log(TOKEN_INVALID);
        return TOKEN_INVALID;
      } else {
        console.log('invalid token');
        return TOKEN_INVALID;
      }
    }
  }
}