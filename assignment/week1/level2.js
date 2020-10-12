let memCtn = require('./ourMember');
const team5 = memCtn.team5;
const printTeam = function(obj) {
  console.log("저희 팀원들을 소개해드릴게요>__<:\n")
  for(let mem of obj){
    console.log(mem);
  }
}

printTeam(team5);