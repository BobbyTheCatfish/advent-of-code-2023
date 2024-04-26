// @ts-check
const u = require('../utils')
const input = u.readFile('./inputs/day3.txt').split('\n')

/** 
 * See if there's a symbol around the given number
 * If reverse is true, it searches for symbols (specifically gears)
 * @param {string} num
 * @param {number} index
 * @param {number} row
*/
function getAround(num, index, row, reverse = false) { 
    const reverseResults = [];
    for (let y = Math.max(0, row - 1); y < Math.min(input.length, row + 2); y++) {
        for (let x = Math.max(0, index - 1); x < Math.min(input[row].length, index + num.length + 1); x++) {
            const match = [...input[y][x].matchAll(/[\+\%\*\$\#\/\=\@\-\&]/g)]
            if (reverse) {
                const gears = match.filter(m => m[0] == '*')
                if (gears.length > 0) reverseResults.push(...gears.map(g => ({x, y, num: parseInt(num) })))
            }
            else if (match.length > 0) return match
        }
    }
    return reverse && reverseResults.length > 0 ? reverseResults : null;
}

function getNumbers(gears = false) {
    const gearList = [];
    const nums = [];
    const numRegex = /\d+/g
    for (let y = 0; y < input.length; y++) {
        const line = input[y];
        const matches = [...line.matchAll(numRegex)]
        for (const match of matches) {
            const num = match[0]
            const x = match.index;
            const around = getAround(num, x, y, gears)
            if (around) {
                if (gears) gearList.push(...around);
                else nums.push(parseInt(num))
            }
        }
    }
    if (!gears) return nums;
    else return calcGears(gearList);
}

/**
 * Calculates a list of multiplied gears
 * @param {Array} list 
 */
function calcGears(list) {
    /** @type {Map<string, number[]>} */
    const gears2 = new Map();
    for (const gear of list) {
        const key = `${gear["x"]}${gear["y"]}`
        if (gears2.has(key)) {
            gears2.get(key)?.push(gear["num"])
        } else {
            gears2.set(key, [gear["num"]])
        }
    }
    const onlyTwo = [...gears2.values()].filter(g => g.length == 2).map(g => g[0] * g[1])
    return onlyTwo
}

// part 1
u.time(() => {
    return getNumbers(false).reduce((p, c) => p + c, 0);
})

// part 2
u.time(() => {
    return getNumbers(true).reduce((p, c) => p + c, 0);
})