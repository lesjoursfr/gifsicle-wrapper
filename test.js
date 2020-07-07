const fs = require("fs");
const path = require("path");
const isGif = require("is-gif");
const test = require("ava");
const gifsicle = require(".");

test("Resize (withoutEnlargement: true)", async t => {
	await gifsicle(path.join(__dirname, "test.gif"))
		.resize(600, 600, { kernel: gifsicle.kernel.lanczos3, withoutEnlargement: true })
		.toFile(path.join(__dirname, "test-resized-fit.gif"));

	t.true(isGif(fs.readFileSync(path.join(__dirname, "test-resized-fit.gif"))));
});

test("Resize (withoutEnlargement: false)", async t => {
	await gifsicle(path.join(__dirname, "test.gif"))
		.resize(600, 600, { kernel: gifsicle.kernel.lanczos3, withoutEnlargement: false })
		.toFile(path.join(__dirname, "test-resized-touch.gif"));

	t.true(isGif(fs.readFileSync(path.join(__dirname, "test-resized-touch.gif"))));
});

test("Crop", async t => {
	await gifsicle(path.join(__dirname, "test.gif"))
		.crop(600, 600, { position: gifsicle.position.center })
		.toFile(path.join(__dirname, "test-cropped.gif"));

	t.true(isGif(fs.readFileSync(path.join(__dirname, "test-cropped.gif"))));
});

test("Greyscale", async t => {
	await gifsicle(path.join(__dirname, "test.gif"))
		.greyscale(true)
		.toFile(path.join(__dirname, "test-greyscale.gif"));

	t.true(isGif(fs.readFileSync(path.join(__dirname, "test-greyscale.gif"))));
});