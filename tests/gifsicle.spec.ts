import assert from "assert";
import { readFileSync, writeFileSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import gifsicle from "../src/index.js";
import { isGif } from "../src/toolbox/is-gif.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

it("Resize (withoutEnlargement: true)", async () => {
  await gifsicle(resolve(__dirname, "test.gif"))
    .resize(600, 600, { kernel: gifsicle.kernel.lanczos3, withoutEnlargement: true })
    .toFile(resolve(__dirname, "test-resized-fit.gif"));

  assert.strictEqual(isGif(readFileSync(resolve(__dirname, "test-resized-fit.gif"))), true);
});

it("Resize (withoutEnlargement: false)", async () => {
  await gifsicle(resolve(__dirname, "test.gif"))
    .resize(600, 600, { kernel: gifsicle.kernel.lanczos3, withoutEnlargement: false })
    .toFile(resolve(__dirname, "test-resized-touch.gif"));

  assert.strictEqual(isGif(readFileSync(resolve(__dirname, "test-resized-touch.gif"))), true);
});

it("Crop", async () => {
  await gifsicle(resolve(__dirname, "test.gif"))
    .crop(600, 600, { position: gifsicle.position.center })
    .toFile(resolve(__dirname, "test-cropped.gif"));

  assert.strictEqual(isGif(readFileSync(resolve(__dirname, "test-cropped.gif"))), true);
});

it("Greyscale", async () => {
  await gifsicle(resolve(__dirname, "test.gif")).greyscale(true).toFile(resolve(__dirname, "test-greyscale.gif"));

  assert.strictEqual(isGif(readFileSync(resolve(__dirname, "test-greyscale.gif"))), true);
});

it("Output as a Buffer", async () => {
  const output = await gifsicle(resolve(__dirname, "test.gif"))
    .resize(600, 600, { kernel: gifsicle.kernel.lanczos3, withoutEnlargement: true })
    .toBuffer();
  writeFileSync(resolve(__dirname, "test-buffer.gif"), output);

  assert.strictEqual(isGif(readFileSync(resolve(__dirname, "test-buffer.gif"))), true);
});

it("O2 Compression", async () => {
  await gifsicle(resolve(__dirname, "test.gif"))
    .optimize({ level: gifsicle.level.O2 })
    .toFile(resolve(__dirname, "test-o2.gif"));

  assert.strictEqual(isGif(readFileSync(resolve(__dirname, "test-o2.gif"))), true);
});

it("O3 Compression", async () => {
  await gifsicle(resolve(__dirname, "test.gif"))
    .optimize({ level: gifsicle.level.O3 })
    .toFile(resolve(__dirname, "test-o3.gif"));

  assert.strictEqual(isGif(readFileSync(resolve(__dirname, "test-o3.gif"))), true);
});

it("Lossiness 20", async () => {
  await gifsicle(resolve(__dirname, "test.gif"))
    .optimize({ lossiness: 20 })
    .toFile(resolve(__dirname, "test-lossiness-20.gif"));

  assert.strictEqual(isGif(readFileSync(resolve(__dirname, "test-lossiness-20.gif"))), true);
});

it("Lossiness 120", async () => {
  await gifsicle(resolve(__dirname, "test.gif"))
    .optimize({ lossiness: 120 })
    .toFile(resolve(__dirname, "test-lossiness-120.gif"));

  assert.strictEqual(isGif(readFileSync(resolve(__dirname, "test-lossiness-120.gif"))), true);
});
