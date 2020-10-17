const getNumber = new Promise ((resolve, reject) => {
  console.log('getNumber Pending'); //pending state: 첫번째 then 호출 시에만 pending state에 들어선다.
  setTimeout(() => {
    console.log('1초 쉼');
    resolve(100);
  }, 1000); //1초 뒤에 100을 resolve: fulfilled state
}) //promise 생성

//promise chaining
getNumber
  .then(value => { //parameter: 100
    console.log(value);
    return value * 2;
  })
  .then(value => { //parameter: 100*2=200
    console.log(value);
    return value * 3;
  })
  .then(value =>{ //parameter: 200*3 = 600
    return new Promise((resolve, reject) => {
      setTimeout(() =>{
        console.log('1초 쉼');
        resolve(value + 1000);
      }, 1000)
    })
  })
  .then(value => console.log(value)); //value: promise의 value