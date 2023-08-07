import { Gifsicle } from "../gifsicle.js";

/**
 * Convert to 8-bit greyscale.
 *
 * @param {Boolean} [greyscale=true]
 * @returns {Gifsicle}
 * @throws {TypeError} Invalid parameters
 */
export function greyscale(this: Gifsicle, greyscale: boolean | undefined): Gifsicle {
  if (greyscale !== undefined) {
    this.options.greyscale = greyscale;
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
export function grayscale(this: Gifsicle, grayscale: boolean | undefined) {
  return this.greyscale(grayscale);
}
