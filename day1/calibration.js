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

u.timer(() => {
    const input = require("./inputs/calibration.json")
    const results = input.map(i => calibrateConvert(i))
    return results.reduce((p, c) => p + c, 0);
})