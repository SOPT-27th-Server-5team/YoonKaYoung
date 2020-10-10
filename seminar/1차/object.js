// Object 생성자 함수
const person = new Object();

//add property
person.name = '윤가영';
person.part = 'Server';
person['gender'] = 'female';
person.sayHello = function(){
  console.log(`안녕하세요 ${this.name}입니다.`);
}

console.log('"person" is type of:'+typeof person);
console.log('\nprint person:');
console.log(person);
console.log('\ncall sayHello():');
person.sayHello();