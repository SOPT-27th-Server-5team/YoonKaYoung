const symbol1 = Symbol('id');
const symbol2 = Symbol('id');

console.log(symbol1.description); //Symbol 값 출력
console.log(symbol1 === symbol2);  //description 값이 같아도 다른 것임!!

console.log('-----------------');

const includes = Symbol('커스텀 includes 함수');

Array.prototype[includes] = function() { //상속이랑 비슷한 거임
  return 'its Symbol';
}

var arr = [1,2,3];
console.log(arr.includes(1));
console.log(arr['includes'](1));
console.log(arr[includes]());