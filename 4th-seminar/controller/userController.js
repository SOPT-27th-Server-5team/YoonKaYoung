//우리가 썼던 모듈들을 다시 불러와야한당!
const crypto = require('crypto');
const util = require('../modules/util');
const responseMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');
const { User, Post } = require('../models');
const { userService } = require('../service');
const jwt = require('../modules/jwt');

//컨트롤러에서 로직 처리
module.exports = {
  signup: async (req, res) => {
    const { email, password, userName } = req.body; // 1. req.body에서 데이터 가져오기
  
    if(!email || !password || !userName) { //2. request data 확인하기, email, password, userName data가 없다면 NullValue 반환
      console.log('필요한 값이 없습니다!');
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }
    try { //3. 존재하는 이메일인지 확인하기. 이미 존재하는 이메일면 ALREADY ID 반환
      const alreadyEmail = await userService.readOneEmail(email);
  
      if (alreadyEmail) {
        console.log('이미 존재하는 이메일입니다.');
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.ALREADY_ID));
      }
    
      // //4. salt 생성
      // const salt = crypto.randomBytes(64).toString('base64');
      // //5. 2차 세미나때 배웠던 pbkdf2 방식으로 (비밀번호 + salt) => 암호화된 password
      // const hashedPassword = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('base64');
  
      // //6. User email, 암호화된 password, salt, userName 생성!
      // const user = await User.create({
      //   email: email,
      //   password: hashedPassword,
      //   userName: userName,
      //   salt: salt,
      // });
      
      // console.log(user);

      const user = await userService.signup(email, userName, password);
      //7. status: 200 message: SING_UP_SUCCESS, data: id, email, userName 반환! (비밀번호, salt 반환 금지!!)
      return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SIGN_UP_SUCCESS, {id : user.id, email, userName }));
    } catch(error){
      console.error(error);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.SIGN_UP_FAIL));
    }
  },
  signin : async (req, res) => {
    const { email, password } = req.body; // 1. req.body에서 데이터 가져오기
    //2. request data 확인하기, email, password, userName data가 없다면 NullValue 반환
    if(!email || !password) {
      console.log('필요한 값이 없습니다!');
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }
    try { //3. 존재하는 아이디인지 확인하기. 존재하지 않는 아이디면 NO USER 반환
      const user = await User.findOne({
        where: {
          email
        },
      });
  
      if(!user) {
        console.log('없는 이메일 입니다.');
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER));
      }
  
      //4. 비밀번호 확인하기 - 로그인할 email의 salt를 DB에서 가져와서 사용자가 request로 보낸 password와 암호화를 한후 디비에 저장되어있는 password와 일치하면 true
      // 일치하지 않으면 Miss Match password 반환
      const { salt, password: userPassword } = user;
      
      const inputPassword = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('base64');

      if(inputPassword !== userPassword) {
        console.log('비밀번호가 일치하지 않습니다.');
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.OK, responseMessage.MISS_MATCH_PW));
      }
      //5. status: 200 ,message: SIGN_IN_SUCCESS, data: id, email, userName 반환
      
      const { accessToken, refreshToken } = await jwt.sign(user);

      return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SIGN_IN_SUCCESS, {
        accessToken,
        refreshToken,
      }));
    } catch(error) {
      console.error(error);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.SIGN_IN_FAIL));
    }
  },
  readAll: async (req, res) => {
    // status: 200, message: READ_USER_ALL_SUCCESS, data: id, email, userName 반환
    try {
      const users = await User.findAll({
        attributes: ['id', 'email', 'userName'],
      });
      console.log(users);
      return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.READ_USER_ALL_SUCCESS, users));
    } catch(error) {
      console.error(error);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.READ_USER_ALL_FAIL));
    }
  },
  readOne : async (req, res) => {
    //1. parameter로 id값을 받아온다! (id값은 인덱스값)
    const { id } = req.params;
    if(!id) {
      console.log('필요한 값이 없습니다');
      return res
        .status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }
    //2. id값이 유효한지 체크! 존재하지 않는 아이디면 NO_USER 반환
    try {
      const userPost = await User.findAll({
        attributes: ['email', 'userName'],
        include: [{
          model: Post,
        }, {
          model: Post,
          as: 'Liked',
        }],
        where: {
          id
        }
      });
      if(!userPost) {
        console.log('해당 id를 가진 사용자가 없습니다.');
        return res
          .status(statusCode.BAD_REQUEST)
          .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER));
      }
      //7. status: 200 message: SING_UP_SUCCESS, data: id만 반환! (비밀번호, salt 반환 금지!!)
      return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.MEMBER_READ_SUCCESS, userPost));
    } catch(error) {
      console.error(error);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.READ_USER_ALL_FAIL));
    }
  },
  deleteUser : async (req, res) => {
    //요청 바디에 email과 password가 있어야 함
    const { email, password } = req.body;
    if(!email || !password) {
      console.log('필요한 값이 없습니다!');
      return res
        .status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }
    try {
      //해당 user 찾기
      const user = await User.findOne({
        where: {
          email: email,
        }
      });
      if (!user) { //email이 존재하지 않을 경우
        console.log('존재하지 않는 사용자입니다.');
        return res
          .status(statusCode.BAD_REQUEST)
          .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER));
      }
      //비밀번호 검증하기
      const inputPW = crypto.pbkdf2Sync(password, user.salt, 10000, 64, 'sha512').toString('base64');
      if(inputPW != user.password) {
        console.log('비밀번호가 일치하지 않습니다.');
        return res
          .status(statusCode.BAD_REQUEST)
          .send(util.fail(statusCode.BAD_REQUEST, responseMessage.MISS_MATCH_PW));
      }
      //user 삭제하기
      await User.destroy({
        where: {
          email: email,
        }
      });
      return res
        .status(statusCode.OK)
        .send(util.success(statusCode.OK, responseMessage.DELETE_USER_SUCCESS));
    } catch (err) {
      console.log(err);
      return res 
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.DELETE_USER_FAIL));
    }
  },
  //user 정보 수정하기
  updateUser : async (req, res) => {
    //요청 바디에 { 원래메일, 원래비번, 새메일, 새이름, 새비번 } 이 있어야함
    const { email, password, newEmail, newName, newPassword } = req.body;
    if(!email || !password || !newEmail || !newName || !newPassword) {
      console.log('필요한 값이 없습니다!');
      return res
        .status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }
    try {
      //해당 유저 찾기
      const user = await User.findOne({
        where: {
          email: email,
        }
      });
      //유저가 조회되지 않았을 경우
      if(!user) {
        console.log('존재하지 않는 사용자입니다.');
        return res
          .status(statusCode.BAD_REQUEST)
          .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER));
      }
      //비밀번호 검증
      const salt = user.salt;
      const hashedPassword = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('base64');
      if(user.password != hashedPassword) {
        console.log('비밀번호가 일치하지 않습니다.');
        return res
          .status(statusCode.BAD_REQUEST)
          .send(util.fail(statusCode.BAD_REQUEST, responseMessage.MISS_MATCH_PW));
      }
      const newSalt = crypto.randomBytes(64).toString('base64');
      const newHashedPassword = crypto.pbkdf2Sync(newPassword, newSalt, 10000, 64, 'sha512').toString('base64');

      const newUser = await User.update({ email: newEmail, password: newHashedPassword, userName: newName, salt: newSalt }, {
          where: {
            email: email,
          }
        }
      );
      return res
        .status(statusCode.OK)
        .send(util.success(statusCode.OK, responseMessage.UPDATE_USER_SUCCESS));
    } catch (err) {
      console.log(err);
      return res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.UPDATE_USER_FAIL));
    }
  },
  getProfile: async (req, res) => {
    const { id } = req.decoded;
    console.log(req.decoded);
    try {
      const user = await User.findOne({ where: { id }, attributes: ['id', 'userName', 'email'] });
      return res
        .status(statusCode.OK)
        .send(util.success(statusCode.OK, responseMessage.AUTH_SUCCESS, user));
    } catch (err) {
      console.log(err);
      return res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INVALID_TOKEN))
    }
  }

}
