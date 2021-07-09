const sizeOf = require("image-size");

/**
 * Reduction kernels.
 * @member
 * @private
 */
// eslint-disable-next-line one-var
const kernel = {
	sample: "sample",
	mix: "mix",
	catrom: "catrom",
	mitchell: "mitchell",
	lanczos2: "lanczos2",
	lanczos3: "lanczos3"
};

/**
 * Position modes for cropping.
 * @member
 * @private
 */
// eslint-disable-next-line one-var
const position = {
	center: "center",
	top: "top",
	right: "right",
	bottom: "bottom",
	left: "left",
	topRight: "topRight",
	bottomRight: "bottomRight",
	bottomLeft: "bottomLeft",
	topLeft: "topLeft",
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
	// Default options
	this.options.resize = { kernel: kernel.lanczos3, withoutEnlargement: false };

	// Process parameters
	if (width !== undefined) {
		if (Number.isInteger(width) && width > 0) {
			this.options.resize.width = width;
		} else {
			throw new TypeError("Expected 'width' to be a positive integer");
		}
	}
	if (height !== undefined) {
		if (Number.isInteger(height) && height > 0) {
			this.options.resize.height = height;
		} else {
			throw new TypeError("Expected 'height' to be a positive integer");
		}
	}
	if (options !== undefined) {
		// Kernel
		if (options.kernel !== undefined) {
			if (typeof kernel[options.kernel] === "string") {
				this.options.resize.kernel = kernel[options.kernel];
			} else {
				throw new TypeError("Expected 'options.kernel' to be a valid kernel name");
			}
		}
		// Without enlargement
		if (options.withoutEnlargement !== undefined) {
			if (typeof options.withoutEnlargement === "boolean") {
				this.options.resize.withoutEnlargement = options.withoutEnlargement;
			} else {
				throw new TypeError("Expected 'options.withoutEnlargement' to be a boolean value");
			}
		}
	}
	return this;
}

/**
 * Crop the image to `width x height`.
 *
 * @param {number} [width] - pixels wide the resultant image should be.
 * @param {number} [height] - pixels high the resultant image should be.
 * @param {Object} [options]
 * @param {number} [options.position=0] - position of the cropping rectangle.
 * @returns {Gifsicle}
 * @throws {TypeError} Invalid parameters
 */
function crop(width, height, options) {
	// Default options
	this.options.crop = { position: position.center };

	// Process parameters
	if (Number.isInteger(width) && width > 0) {
		this.options.crop.width = width;
	} else {
		throw new TypeError("Expected 'width' to be a positive integer");
	}
	if (Number.isInteger(height) && height > 0) {
		this.options.crop.height = height;
	} else {
		throw new TypeError("Expected 'height' to be a positive integer");
	}
	if (options !== undefined) {
		// Position
		if (options.position !== undefined) {
			if (typeof position[options.position] === "string") {
				this.options.crop.position = position[options.position];
			} else {
				throw new TypeError("Expected 'options.position' to be a valid position name");
			}
		}
	}
	return this;
}

function _computeCroppingPoint() {
	const size = sizeOf(this.input);
	let px, py;
	switch (this.options.crop.position) {
		case position.center:
			px = Math.floor((size.width - this.options.crop.width) / 2);
			py = Math.floor((size.height - this.options.crop.height) / 2);
			break;
		case position.top:
			px = Math.floor((size.width - this.options.crop.width) / 2);
			py = 0;
			break;
		case position.right:
			px = size.width - this.options.crop.width;
			py = Math.floor((size.height - this.options.crop.height) / 2);
			break;
		case position.bottom:
			px = Math.floor((size.width - this.options.crop.width) / 2);
			py = size.height - this.options.crop.height;
			break;
		case position.left:
			px = 0;
			py = Math.floor((size.height - this.options.crop.height) / 2);
			break;
	}
	return { x: px, y: py };
}

/**
 * Decorate the Gifsicle prototype with output-related functions.
 * @private
 */
module.exports = function(Gifsicle) {
	Object.assign(Gifsicle.prototype, {
		resize,
		crop,
		_computeCroppingPoint
	});
	Gifsicle.kernel = kernel;
	Gifsicle.position = position;
};