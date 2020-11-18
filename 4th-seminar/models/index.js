const Sequelize = require('sequelize'); //sequelize 모듈 불러오기
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const db = {}; //모델들을 내보내기 위한 오브젝트입니다.

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

//db 모델 함수 불러오기!
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User = require('./user')(sequelize, Sequelize);
db.Post = require('./post')(sequelize, Sequelize);
db.Like = require('./like')(sequelize, Sequelize);

//1:N User:Post
db.User.hasMany(db.Post, { onDelete: 'cascade'});
db.Post.belongsTo(db.User);

//N:M User:Post => Like
//Post 입장에서는 User 모델이 두 분류로 나뉜다. 헷갈리지 않게 as를 사용하여 Liked 와 Liker 로 구분한다.
db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked' });
db.Post.belongsToMany(db.User, { through: 'Like', as: 'Liker' });

module.exports = db; //db 내보내기