const fs = require('fs');
const crypto = require('crypto');
  
const salt = crypto.randomBytes(64).toString(); //동기인데여

fs.readFile('./mypassword.txt', (err, data) => {
  data = data.toString();
  crypto.pbkdf2(data, salt, 100000, 64, 'sha512', (err, key) => {
    fs.writeFile('./myEncryptedPW.txt', key.toString(), () =>{
      console.log('complete');
    })
  })
})
