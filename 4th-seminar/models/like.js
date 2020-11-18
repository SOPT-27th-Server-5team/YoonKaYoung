const { User, Post } = require('../models');

//sequelize.define('모델이름', { 스키마 }, { 스키마 옵션 })

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Like', {
    //모델의 Attributes (Column)을 정의하는곳
    PostId: {
      type: DataTypes.INTEGER,
      reference: {
        model: Post,
        key: 'id',
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      reference: {
        model: User,
        key: 'id',
      }
    },
  }, {
    freezeTableName: true,
    timetables: true,
  })
}