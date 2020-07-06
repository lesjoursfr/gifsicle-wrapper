# gifsicle-wrapper [![Build Status](https://travis-ci.org/lesjoursfr/gifsicle-wrapper.svg?branch=master)](https://travis-ci.org/lesjoursfr/gifsicle-wrapper)

> [Gifsicle](https://www.lcdf.org/gifsicle/) wrapper

## Install

```
$ npm install gifsicle-wrapper
```

## Usage

Resize a Gif :
```js
const Gifsicle = require('gifsicle-wrapper');

(async () => {
	await Gifsicle(path.join(__dirname, "test.gif"))
		.resize(600, 600, { kernel: gifsicle.kernel.lanczos3, withoutEnlargement: true })
		.toFile(path.join(__dirname, "test-resized.gif"));
})();
```

Change colors to greyscale :
```js
const Gifsicle = require('gifsicle-wrapper');

(async () => {
	await Gifsicle(path.join(__dirname, "test.gif"))
		.greyscale(true)
		.toFile(path.join(__dirname, "test-resized.gif"));
})();
```