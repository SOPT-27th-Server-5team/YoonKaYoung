// 중학교 -> 고등학교 -> 대학교

const middleSchool = () => new Promise ((resolve, reject) => {
  setTimeout(() => {
    resolve('중학교');
  }, 1000)
});

const dropout = true;

const highSchool = school => new Promise((resolve, reject) => {
  if(dropout) {
    setTimeout(()=> {
      reject(`${school} => 자퇴`);
    }, 1000);
  }
  setTimeout(()=> {
    resolve(`${school} => 고등학교`);
  }, 1000)
});

const univ = school => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(`${school} => 대학교`);
  }, 1000);
});

middleSchool()
  .then(school => highSchool(school))
  .catch(error => {
    return error;
  })
  .then(school => univ(school))
  .then(result => console.log(result))
  .catch(error => console.error(error));