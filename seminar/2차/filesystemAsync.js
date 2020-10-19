const fs = require('fs');

const numArr = [1, 2, 3, 4, 5];
const 파일공통이름 = 'syncText';
numArr.forEach((num) => {
  const 파일이름 = 파일공통이름 + num;
  const data = `reserved message for the '${파일이름}'`;
  fs.writeFile(`${파일이름}.txt`, data, () => {
    console.log(`file[${파일이름}] write complete`);
  })
})

numArr.forEach((num) => {
  const 파일이름 = 파일공통이름 + num;
  fs.readFile(`${파일이름}.txt`, (err, data) => {
    console.log(`file[${파일이름}] with ${data}`);
  })
})