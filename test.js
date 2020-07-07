const fs = require("fs");
const path = require("path");
const isGif = require("is-gif");
const test = require("ava");
const gifsicle = require(".");

test("Resize", async t => {
	await gifsicle(path.join(__dirname, "test.gif"))
		.resize(600, 600, { kernel: gifsicle.kernel.lanczos3, withoutEnlargement: true })
		.toFile(path.join(__dirname, "test-resized.gif"));

	t.true(isGif(fs.readFileSync(path.join(__dirname, "test-resized.gif"))));
});

test("Greyscale", async t => {
	await gifsicle(path.join(__dirname, "test.gif"))
		.greyscale(true)
		.toFile(path.join(__dirname, "test-greyscale.gif"));

	t.true(isGif(fs.readFileSync(path.join(__dirname, "test-greyscale.gif"))));
});