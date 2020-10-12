//member element: {"name", "part", "status", "gender"}
let memberCtn = require('./members'); //members.js 모듈?! 불러오기
const members = memberCtn.member; //불러온 모듈에서 배열 가져오기
ob = members.filter(item => item.status === "OB"); //ob list
yb = members.filter(item => item.status === "YB"); //yb list

const mixArr = function(arr) { // array mix function
    let rn, tmp;
    for(let i = 0; i < arr.length-1; i++) {
        rn = parseInt(Math.random()*(arr.length - i));
        tmp = arr[i];
        arr[i] = arr[rn];
        arr[rn] = tmp;
    }
    return arr;
}
const makeTeam = function(teamNum) {
    //1. ob, yb list 각각 랜덤 섞기
    mixedOB = mixArr(ob);
    mixedYB = mixArr(yb);

    result = []; //2. init result array
    for(let i = 0; i < teamNum; i++) result.push(["Team"+(i+1)]);
    
    //3. 인덱스 나누기 팀개수 나머지로 배정하기
    mixedOB.forEach(member => {
        result[mixedOB.indexOf(member)%teamNum].push(member);
    });
    mixedYB.forEach(member => {
        result[mixedYB.indexOf(member)%teamNum].push(member);
    })
    return result;
}

console.log(makeTeam(7));
