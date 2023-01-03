let _ = require("lodash");

// let number = _.random(20, 40);
// console.log(number);

// let array = ["a", "b", "c", "d", "e", "f"];
// let che = _.chunk(array, 1);
// console.log(che);

let num = [23, 24, 20, 28, 10, 4, 5, 7, 8, 2];
let arr = [];
for (let i = 1; i <= num.length; i++) {
  let n = num[i];
  if (n % 2 == 0) {
    arr.push(n);
  }
}
let res = _.chunk(arr, 3);
// console.log(res);

let nums = _.random(0, 30);
console.log(Math.floor(Math.random(nums) * 100) );