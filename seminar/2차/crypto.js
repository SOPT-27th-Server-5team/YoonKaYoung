const crypto =require('crypto');

const password = '내비번';
// const password2 = 'mypassword';
// const base64 = crypto.createHash('sha512').update(password).digest('base64');
// const base64_ = crypto.createHash('sha512').update(password2).digest('base64');
// const hex = crypto.createHash('sha512').update(password).digest('hex');

// console.log(base64);
// console.log(base64_);
// console.log(hex);

//PBKDF2(Password-Based Key Derivation Function)
crypto.randomBytes(64, (err, buf) => {
  const salt = buf.toString(  );
  console.log(`salt : ${salt}`);
  crypto.pbkdf2(password, salt, 1000000, 64, 'sha512', (err, key) => {
    console.log(`password: ${key.toString('base64')}`);
  })
})

const buf = crypto.randomBytes(64)
const salt = buf.toString();
crypto.pbkdf2('비밀번호', salt, 100000, 64, 'sha512', (err, derivedKey) => {
  
})

