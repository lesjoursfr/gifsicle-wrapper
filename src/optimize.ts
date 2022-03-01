import { Gifsicle } from './gifsicle.js';

/**
 * Optimization levels.
 */
/* eslint-disable no-unused-vars */
export enum OptimizationLevel {
  O1 = 'O1',
  O2 = 'O2',
  O3 = 'O3'
}
/* eslint-enable no-unused-vars */

/**
 * Optimization options.
 */
export type OptimizeOptions = {
  level?: OptimizationLevel;
  lossiness?: number;
};

/**
 * Optimize the gif.
 *
 * @param {Object} [options]
 * @param {OptimizationLevel} [options.level=OptimizationLevel.O1] - the optimization level.
 * @param {Number} [options.lossiness=20] - the lossiness value to shrink the number of colors [0,200].
 * @returns {Gifsicle}
 * @throws {TypeError} Invalid parameters
 */
export function optimize (this: Gifsicle, options: OptimizeOptions | undefined): Gifsicle {
  // Default options
  this.options.optimize = { level: OptimizationLevel.O1, lossiness: 20 };

  // Process parameters
  if (options !== undefined) {
    // Level
    if (options.level !== undefined) {
      this.options.optimize.level = options.level;
    }
    // Lossiness
    if (options.lossiness !== undefined) {
      if (Number.isInteger(options.lossiness) && options.lossiness > 0 && options.lossiness < 200) {
        this.options.optimize.lossiness = options.lossiness;
      } else {
        throw new TypeError("Expected 'lossiness' to be an integer in the range [0,200]");
      }
    }
  }
  return this;
}
