import { readFileSync } from 'fs';
import isGif from './toolbox/is-gif.js';

function _readFile (input) {
  if (!Buffer.isBuffer(input)) {
    if (typeof input === 'string') {
      input = readFileSync(input);
    } else {
      throw new TypeError(`Expected 'input' to be of type 'Buffer' or 'String' but received type '${typeof input}'`);
    }
  }

  if (!isGif(input)) {
    throw new TypeError("Expected 'input' to be a gif file");
  }

  return input;
}

/**
 * Decorate the Gifsicle prototype with output-related functions.
 * @private
 */
export default function addInputFunctions (Gifsicle) {
  Object.assign(Gifsicle.prototype, {
    _readFile
  });
};
