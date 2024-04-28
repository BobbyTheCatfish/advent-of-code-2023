// @ts-check
const u = require('../utils');

/**
 * Converts a line of `Card #: # # # # | # # # #` to a useable object
 * @param {string} content
 */
function parse(content) {
    const numRegex = /\d+/g;
    const lines = content.replace(/Card +\d+: /g, "").split("\n");
    return lines.map(line => {
        const split = line.split(" | ");
        const winning = [...split[0].matchAll(numRegex)].map(w => parseInt(w[0]));
        const hand = [...split[1].matchAll(numRegex)].map(h => parseInt(h[0]));
        return { winning, hand };
    });
}

u.time(() => {
    const file = u.readFile("./inputs/day4.txt");
    const parsed = parse(file);
    return parsed.map(p => {
        const results = p.hand.filter(h => p.winning.includes(h));
        const points = results.reduce((p) => p * 2, 0.5);
        return points >= 1 ? points : 0;
    }).reduce((p, c) => p + c, 0);
}, 1);

u.time(() => {
    const file = u.readFile("./inputs/day4.txt");
    const parsed = parse(file);
    const cardCount = parsed.map(() => 1);
    parsed.forEach((p, i) => {
        const results = p.hand.filter(h => p.winning.includes(h));
        for (let i2 = 1; i2 <= results.length; i2++) {
            cardCount[i+i2] += cardCount[i];
        }
    });
    return cardCount.reduce((p, c) => p + c, 0);
}, 1);