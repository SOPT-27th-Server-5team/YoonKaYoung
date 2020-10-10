var variableVar = "123";
var variableVar = "321";

console.log(`variableVar: ${variableVar}`);

let variableLet = "123";
//let variableLet = "321";
//SyntaxError: Identifier 'variableLet' has already been declared

console.log(`variableLet: ${variableLet}`);

const variableConst = "123";
//const variableConst = "321";

console.log(`variableCons: ${variableConst}`);

if(true){
  var x = 'var';
}
console.log(`var: ${x}`);

if(true){
  let y = 'let';
}

//console.log(`let ${y}`);
//let은 blockscope이기 때문에 밖에서 사용 불가
console.log();
console.log('var를 함수 안에서 선언하고 밖에서 호출하면 어떻게 될까?');
function colorFunction(){
  if(true){
    var color  = 'blue';
    console.log('colorFunction 안, if블록 안에서 출력: '+color);
  }
  console.log('colorFunction 안, block 밖에서 출력: '+color);
}

colorFunction();
//console.log(color);
//에러가 뜬당.

console.log();