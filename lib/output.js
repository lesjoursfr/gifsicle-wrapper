const fs = require("fs");
const execa = require("execa");
const gifsicle = require("gifsicle");

async function toFile(fileOut) {
	let args = ["--no-warnings", "--no-app-extensions"],
		input = this.input;

	if (this.options.greyscale === true) {
		args.push("--use-colormap=gray");
	}

	if (this.options.width !== undefined || this.options.height !== undefined) {
		if (this.options.withoutEnlargement === true) {
			args.push(`--resize-fit=${this.options.width || "_"}x${this.options.height || "_"}`);
		} else {
			args.push(`--resize-touch=${this.options.width || "_"}x${this.options.height || "_"}`);
		}
	}

	const {stdout} = await execa(gifsicle, args, {
		encoding: null,
		input
	});

	fs.writeFileSync(fileOut, stdout);
}

/**
 * Decorate the Gifsicle prototype with output-related functions.
 * @private
 */
module.exports = function(Gifsicle) {
	Object.assign(Gifsicle.prototype, {
		toFile
	});
};