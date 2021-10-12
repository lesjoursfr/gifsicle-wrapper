const fs = require('fs');
const execa = require('execa');
const gifsicle = require('gifsicle');

async function _processFile () {
  const args = ['--no-warnings', '--no-app-extensions'];
  const input = this.input;

  if (this.options.greyscale === true) {
    args.push('--use-colormap=gray');
  }

  if (this.options.crop !== undefined) {
    const { x, y } = this._computeCroppingPoint();
    args.push(`--crop=${x}, ${y}+${this.options.crop.width}x${this.options.crop.height}`);
  }

  if (this.options.resize !== undefined) {
    if (this.options.resize.width !== undefined || this.options.resize.height !== undefined) {
      if (this.options.resize.withoutEnlargement === true) {
        args.push(`--resize-fit=${this.options.resize.width || '_'}x${this.options.resize.height || '_'}`);
      } else {
        args.push(`--resize-touch=${this.options.resize.width || '_'}x${this.options.resize.height || '_'}`);
      }
    }
  }

  if (this.options.optimize !== undefined) {
    if (this.options.optimize.level !== undefined) {
      args.push(`-${this.options.optimize.level}`);
    }
    if (this.options.optimize.lossiness !== undefined) {
      args.push(`--lossy=${this.options.optimize.lossiness}`);
    }
  }

  const { stdout } = await execa(gifsicle, args, {
    encoding: null,
    input
  });

  return stdout;
}

/**
 * Save the result in a file.
 *
 * @param {String} [fileOut]
 */
async function toFile (fileOut) {
  fs.writeFileSync(fileOut, await this._processFile());
}

/**
 * Get the result file as a Buffer.
 *
 * @returns {Buffer}
 */
async function toBuffer () {
  return this._processFile();
}

/**
 * Decorate the Gifsicle prototype with output-related functions.
 * @private
 */
module.exports = function (Gifsicle) {
  Object.assign(Gifsicle.prototype, {
    _processFile,
    toFile,
    toBuffer
  });
};
