const Gifsicle = function(input) {
	if (input === undefined) {
		throw new Error("Invalid input");
	}
	if (!(this instanceof Gifsicle)) {
		return new Gifsicle(input);
	}
	this.options = {
		// resize options
		kernel: "lanczos3",
		withoutEnlargement: false
	};
	this.input = this._readFile(input);
	return this;
};

/**
 * Export constructor.
 * @private
 */
module.exports = Gifsicle;