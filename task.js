const commonModule = require("./common/commonModule");
const gaussQ = require("gauss-quadrature");

module.exports.simonsFormula = (func, a, b) => {
    console.log(func(a));
    console.log(func((a + b) / 2));
    console.log(func(b));


    return ((b - a) / 6) * (func(a) + 4 * func((a + b) / 2) + func(b));
}

module.exports.errorTrapezoid = (func, a, b) => {
    let max = Number.MIN_VALUE;
    for (let i = a; i <= b; i+=0.1) {
        const value = Math.abs(func(i));
        if (value > max) {
            max =value;
        }
    }
    const result = (Math.pow(b - a, 3) / 12) * max;
    
    return result;
}

module.exports.rightRectangles = (func, a, b, eps) => {
    const s = 1;

    let m = 2;
    let epsM = Number.MAX_VALUE;

    let isFirst = true;

    let valueI = 0;
    let valueINext = 0;
    while (epsM > eps) {
        if (isFirst) {

            valueI = rightRectanglesGetResult(a, b, m, func);

            let nextM = 2 * m;

            valueINext = rightRectanglesGetResult(a, b, nextM, func);

            epsM = Math.abs(valueI - valueINext) / (Math.pow(2, s) - 1);

            m = nextM;
            valueI = valueINext;

            continue;
        }
        let nextM = 2 * m;

        valueINext = rightRectanglesGetResult(a, b, nextM, func);

        epsM = Math.abs(valueI - valueINext) / (Math.pow(2, s) - 1);

        m = nextM;
        valueI = valueINext;

    }

    const result = valueI + eps;

    return result;
}

const rightRectanglesGetResult = (a, b, m, func) => {
    const h = (b - a) / m;
    let sum = 0;
    for (let i = 1; i <= m; i++) {
        let x = a + i * h;
        sum += h * func(x);
    }
    return sum;
}


module.exports.gauss = (fn, n, a = -1, b = 1) => {
    const resultGauss = gaussQ(n, a, b);

    // Коэффициенты.
    const odds = resultGauss[0];
    // Узлы.
    const nodes = resultGauss[1];

    let result = 0;
    for (let i = 0; i < n; i++) {
        result += nodes[i] * fn(odds[i]);
    }

    return result;
}