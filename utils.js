// @ts-check

const fs = require("fs");
const path = require("path");

function timer (func) {
    const start = performance.now()
    const result = func();
    const end = performance.now();
    return { result, time: end - start };
}
const u = {
    /** @param {Function} func */
    time: (func, its = 10) => {
        const results = []
        for (let i = 0; i < its; i++) results.push(timer(func))
        const average = results.reduce((p, c) => p + c.time, 0) / results.length
        console.log(`Results:\n${u.unique(results.map(r => r.result))}`)
        console.log(`Average: ${average}ms`)
        console.log(`Lowest: ${Math.min(...results.map(r => r.time))}ms`)
        console.log(`Highest: ${Math.max(...results.map(r => r.time))}ms`)
    },
    /** @param {Array} arr */
    unique: (arr) => {
        return [...new Set(arr)]
    },
    /** @param {string} p */
    readFile: (p) => {
        return fs.readFileSync(path.resolve(__dirname, p)).toString();
    }
}

module.exports = u;