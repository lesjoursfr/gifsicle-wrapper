/**
 * Reduction kernels.
 * @member
 * @private
 */
const kernel = {
	sample: "sample",
	mix: "mix",
	catrom: "catrom",
	mitchell: "mitchell",
	lanczos2: "lanczos2",
	lanczos3: "lanczos3"
};

/**
 * Resize image to `width`, `height` or `width x height`.
 *
 * @param {number} [width] - pixels wide the resultant image should be. Use `null` or `undefined` to auto-scale the width to match the height.
 * @param {number} [height] - pixels high the resultant image should be. Use `null` or `undefined` to auto-scale the height to match the width.
 * @param {Object} [options]
 * @param {String} [options.kernel='lanczos3'] - the kernel to use for image reduction.
 * @param {Boolean} [options.withoutEnlargement=false] - do not enlarge if the width *or* height are already less than the specified dimensions, equivalent to GraphicsMagick's `>` geometry option. *
 * @returns {Gifsicle}
 * @throws {TypeError} Invalid parameters
 */
function resize(width, height, options) {
	if (width !== undefined) {
		if (Number.isInteger(width) && width > 0) {
			this.options.width = width;
		} else {
			throw new TypeError("Expected 'width' to be a positive integer");
		}
	}
	if (height !== undefined) {
		if (Number.isInteger(height) && height > 0) {
			this.options.height = height;
		} else {
			throw new TypeError("Expected 'height' to be a positive integer");
		}
	}
	if (options !== undefined) {
		// Kernel
		if (options.kernel !== undefined) {
			if (typeof kernel[options.kernel] === "string") {
				this.options.kernel = kernel[options.kernel];
			} else {
				throw new TypeError("Expected 'options.kernel' to be a valid kernel name");
			}
		}
		// Without enlargement
		if (options.withoutEnlargement !== undefined) {
			if (typeof options.withoutEnlargement === "boolean") {
				this.options.withoutEnlargement = options.withoutEnlargement;
			} else {
				throw new TypeError("Expected 'options.withoutEnlargement' to be a boolean value");
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
		resize
	});
	Gifsicle.kernel = kernel;
};