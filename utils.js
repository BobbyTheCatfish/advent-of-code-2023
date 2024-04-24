// @ts-check
module.exports = {
    /** @param {Function} func */
    timer: (func) => {
        console.time("advent");
        console.log(func());
        console.timeEnd("advent");
    }
}