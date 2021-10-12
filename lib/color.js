/**
 * Convert to 8-bit greyscale.
 *
 * @param {Boolean} [greyscale=true]
 * @returns {Gifsicle}
 * @throws {TypeError} Invalid parameters
 */
function greyscale (greyscale) {
  if (greyscale !== undefined) {
    if (typeof greyscale === 'boolean') {
      this.options.greyscale = greyscale;
    } else {
      throw new TypeError("Expected 'greyscale' to be a boolean value");
    }
  } else {
    this.options.greyscale = true;
  }
  return this;
}

/**
 * Alternative spelling of `greyscale`.
 *
 * @param {Boolean} [grayscale=true]
 * @returns {Gifsicle}
 * @throws {TypeError} Invalid parameters
 */
function grayscale (grayscale) {
  return this.greyscale(grayscale);
}

/**
 * Decorate the Gifsicle prototype with output-related functions.
 * @private
 */
module.exports = function (Gifsicle) {
  Object.assign(Gifsicle.prototype, {
    greyscale,
    grayscale
  });
};
