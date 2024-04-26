// @ts-check
const u = require('../utils');

/**
 * Converts a line of `Game #: # red | # green | # blue; ...` to a useable object with the highest numbers from each round
 * @param {string} content
 */
function parse(content) {
    const idRegex = /Game (\d+): /i;
    const lines = content.split("\n");
    const res = [];
    for (const line of lines) {
        const id = idRegex.exec(line)?.[1];
        if (!id) throw new SyntaxError(`Bad ID: ${line}`);
        let red = 0,
            green = 0,
            blue = 0;
        line.split("; ").map(match => {
            const color = {
                red: parseInt(/(\d+) red/i.exec(match)?.[1] ?? "0"),
                green: parseInt(/(\d+) green/i.exec(match)?.[1] ?? "0"),
                blue: parseInt(/(\d+) blue/i.exec(match)?.[1] ?? "0"),
            };
            if (color.red > red) red = color.red;
            if (color.green > green) green = color.green;
            if (color.blue > blue) blue = color.blue;
        })
        res.push({ id: parseInt(id), colors: { red, blue, green }});
    }
    return res;
}

const possible = {
    red: 12,
    green: 13,
    blue: 14,
};

u.time(() => {
    const file = u.readFile("./inputs/day2.txt");
    const parsed = parse(file);
    return parsed.filter(p => (
        p.colors.red <= possible.red &&
        p.colors.green <= possible.green &&
        p.colors.blue <= possible.blue
    )).reduce((p, c) => p + c.id, 0);
})

u.time(() => {
    const file = u.readFile("./inputs/day2.txt");
    const parsed = parse(file);
    return parsed.map(p => p.colors.red * p.colors.green * p.colors.blue)
        .reduce((p, c) => p + c, 0);

})