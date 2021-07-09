/**
 * Optimization levels.
 * @member
 * @private
 */
const level = {
	O1: "O1",
	O2: "O2",
	O3: "O3"
};

/**
 * Optimize the gif.
 *
 * @param {Object} [options]
 * @param {String} [options.level='1'] - the optimization level.
 * @param {Number} [options.lossiness=20] - the lossiness value to shrink the number of colors [0,200].
 * @returns {Gifsicle}
 * @throws {TypeError} Invalid parameters
 */
function optimize(options) {
	// Default options
	this.options.optimize = { level: level.O1, lossiness: 20 };

	// Process parameters
	if (options !== undefined) {
		// Level
		if (options.level !== undefined) {
			if (typeof level[options.level] === "string") {
				this.options.optimize.level = level[options.level];
			} else {
				throw new TypeError("Expected 'options.level' to be a valid optimization level");
			}
		}
		// Lossiness
		if (options.lossiness !== undefined) {
			if (Number.isInteger(options.lossiness) && 0 < options.lossiness && options.lossiness < 200) {
				this.options.optimize.lossiness = options.lossiness;
			} else {
				throw new TypeError("Expected 'lossiness' to be an integer in the range [0,200]");
			}
		}
	}
	return this;
}

/**
 * Decorate the Gifsicle prototype with output-related functions.
 * @private
 */
module.exports = function(Gifsicle) {
	Object.assign(Gifsicle.prototype, {
		optimize
	});
	Gifsicle.level = level;
};