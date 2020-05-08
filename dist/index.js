module.exports = function (frequency) {
    /**
     * @func update: Check the master github repository of the project and try to update the code if their versions diverge.
     * @param frequency: miliseconds - Determine the frequency in which the update check will run
     */
    const { check } = require('./Update');
    return setInterval(() => check(), frequency);
};
//# sourceMappingURL=index.js.map