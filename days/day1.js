// @ts-check
const u = require('../utils');
/**
 * Gets the first and last digit and returns that as a number
 * @param {string} input 
 */
function calibrateConvert(input) {
    const str = input.replace(/[^0-9]/g, "");
    return parseInt(str[0] + str[str.length - 1]);
}

const numbers = [
    "one", "two", "three",
    "four", "five", "six",
    "seven", "eight", "nine"
]

/**
 * Takes text numbers into account
 * @param {string} input
*/
function includeText(input) {
    const nums = [];
    for (let i = 0; i < input.length; i++) {
        const substring = input.substring(i);
        const num = parseInt(substring.charAt(0)) || numbers.findIndex(n => substring.startsWith(n)) + 1
        if (num > 0) nums.push(num);
    }
    return calibrateConvert(nums.join(""))
}

// part 1
u.time(() => {
    const input = u.readFile("./inputs/day1.txt").split("\n")
    const results = input.map(i => calibrateConvert(i))
    return results.reduce((p, c) => p + c, 0);
})

// part 2
u.time(() => {
    const input = u.readFile("./inputs/day1.txt").split("\n")
    const results = input.map(i => includeText(i))
    return results.reduce((p, c) => p + c, 0);
})