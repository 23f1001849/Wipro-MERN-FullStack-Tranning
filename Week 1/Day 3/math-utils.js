

export const square = (value = 0) => Number(value) ** 2;

export const cube = (value = 0) => Number(value) ** 3;

export const power = (base = 1, exponent = 1) => Number(base) ** Number(exponent);

export const factorial = (value = 0) => {
    const n = Math.trunc(Number(value));
    if (Number.isNaN(n) || n < 0) {
        throw new TypeError("Factorial expects a non-negative integer");
    }
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let index = 2; index <= n; index += 1) {
        result *= index;
    }
    return result;
};

export const sum = (...values) => values.reduce((total, current) => total + Number(current || 0), 0);

export const sequence = (length = 0) => {
    const size = Math.max(0, Math.trunc(Number(length)));
    return Array.from({ length: size }, (_, index) => index + 1);
};
