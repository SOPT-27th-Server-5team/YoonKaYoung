//1-1. 함수 선언식
function add(x, y) {
  return x + y;
}

//1-2. 함수 표현식
var addStr = function(x, y) {
  return x + y;
}

console.log(addStr("안녕", "하세요"));

//2-1. 화살표 함수 표현식

var add = (x, y) => {
  return x + y;
}
console.log(add(2, 3));

//3. 화살표 함수
//로직이 한 줄일 때 생략 가능
var add = function(x, y) {
  return x + y;
}

var add = (x, y) => x + y;
var add = (x, y) => (x + y);

//매개변수가 하나일 때 이 형식으로 가능

//일단 그냥 표현식
var square = function(x) {
  return x*x;
}

//생략해서 쓴 화살표함수!
var square = x => x*x;

//객체를 리턴하는 화살표함수
//객체를 소괄호로 감싸지 않으면 인터프리터가 함수의 괄호와 구분하지 못해 error
var person = (name, age) => ({ name: name, age: age });