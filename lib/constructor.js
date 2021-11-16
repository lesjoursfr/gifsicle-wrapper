/**
 * Export constructor.
 * @private
 */
export default function Gifsicle (input) {
  if (input === undefined) {
    throw new Error('Invalid input');
  }
  if (!(this instanceof Gifsicle)) {
    return new Gifsicle(input);
  }
  this.options = {};
  this.input = this._readFile(input);
  return this;
};
