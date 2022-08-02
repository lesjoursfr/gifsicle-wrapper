[![NPM version](https://badge.fury.io/js/gifsicle-wrapper.svg)](http://badge.fury.io/js/gifsicle-wrapper)
[![QC Checks](https://github.com/lesjoursfr/gifsicle-wrapper/actions/workflows/quality-control.yml/badge.svg)](https://github.com/lesjoursfr/gifsicle-wrapper/actions/workflows/quality-control.yml)

# gifsicle-wrapper

[Gifsicle](https://www.lcdf.org/gifsicle/) wrapper

## Usage

Resize a Gif :

```javascript
const Gifsicle = require("gifsicle-wrapper");

(async () => {
	await Gifsicle(path.join(__dirname, "test.gif"))
		.resize(600, 600, {
			kernel: gifsicle.kernel.lanczos3,
			withoutEnlargement: true,
		})
		.toFile(path.join(__dirname, "test-resized.gif"));
})();
```

Change colors to greyscale :

```javascript
const Gifsicle = require("gifsicle-wrapper");

(async () => {
	await Gifsicle(path.join(__dirname, "test.gif"))
		.greyscale(true)
		.toFile(path.join(__dirname, "test-resized.gif"));
})();
```

Optimize the output :

```javascript
const Gifsicle = require("gifsicle-wrapper");

(async () => {
	await Gifsicle(path.join(__dirname, "test.gif"))
		.optimize({ level: gifsicle.level.O2, lossiness: 20 })
		.toFile(path.join(__dirname, "test-optimized.gif"));
})();
```
