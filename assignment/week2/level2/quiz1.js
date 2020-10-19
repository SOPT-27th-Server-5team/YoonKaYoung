const members = require('./members');

function getFemale(members) {
  return new Promise(function (resolve, reject) {
    setTimeout(function(){
      resolve(members.filter(member => member.gender === '여'));
    }, 500);
  })
}

function getYB(members) {
  return new Promise(function (resolve, reject) {
    setTimeout(function(){
      resolve(members.filter(member => member.status === 'YB'));
    }, 500);
  })
}

function getiOS(members) {
  return new Promise(function (resolve, reject) {
    setTimeout(function(){
      resolve(members.filter(member => member.part === 'iOS'));
    }, 500);
  })
}

getFemale(members)
  .then(members => getYB(members))
  .then(members => getiOS(members))
  .then(function(members){
    console.log(members);
  });