const commonModule = require("./common/commonModule");
const task = require("./task");
const gaussQ = require("gauss-quadrature");

// 1.

// const f1 = (value) => {
//     if (value === 0) {
//         return -1;
//     } else if (value === 0.5) {
//         return 1;
//     } else if (value === 1) {
//         return 2.5
//     } 
//     return 0;
// }

// const a1 = 0;
// const b1 = 1;

// const integral1 = (x) => {
//     return Math.pow(x, 2) * f1(x);
// }

// console.log(task.simonsFormula(integral1, a1, b1));


// // 2.

// const integral2 = (x) => {
//     return Math.sin(x);
// }

// console.log(task.errorTrapezoid(integral2, -1, 0));


// // 3.

// const n1 = 2;







// Задание.

const eps = Math.pow(10, -4);

console.log("Остаток = " + "ДаниловВладимирАлександрович".length % 15);

const func = (x) => {
    return Math.log(1 + Math.exp(1 / (1 + x * x)));
}

const a = 0;
const b = 1;
const n = 3;

console.log("1. Значение интеграла: ");
const result1 = task.rightRectangles(func, a, b, eps);
console.log(result1);

console.log("2. Значение интеграла по квадратурной формуле Гаусса");
const result2 = task.gauss(func, n, a, b);
console.log(result2);
