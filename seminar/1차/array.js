//1. 배열 선언하기

var arr1 = [];
console.log(arr1);
console.log(typeof arr1);

var arr2 = new Array(1,2,3,4,5);
console.log(arr2);
console.log(typeof arr2);

var arr3 = ['윤가영',1, 2, 3, null, {name: 'ky', age: 21}];
console.log(arr3);
console.log(typeof arr3);

//2. array prototype 메서드
console.log('**** Array 기본 함수들을 알아보자 ****');
var arr = [1, 2, 3, 4];

// 2-1 length 멤버..?
console.log(`arr의 길이 ${arr.length}`);

// 2-2 push, pop
arr.push('new item');
console.log('arr push:', arr);
console.log('popped element:'+arr.pop());
console.log('arr pop:', arr);

//2-3 shift, unshift