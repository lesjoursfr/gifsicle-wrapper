import { readFileSync, writeFileSync } from 'fs';
import { join, resolve } from 'path';
import test from 'ava';
import Gifsicle from './index.js';
import isGif from './lib/toolbox/is-gif.js';

const __dirname = resolve();

test('Resize (withoutEnlargement: true)', async t => {
  await Gifsicle(join(__dirname, 'test.gif'))
    .resize(600, 600, { kernel: Gifsicle.kernel.lanczos3, withoutEnlargement: true })
    .toFile(join(__dirname, 'test-resized-fit.gif'));

  t.true(isGif(readFileSync(join(__dirname, 'test-resized-fit.gif'))));
});

test('Resize (withoutEnlargement: false)', async t => {
  await Gifsicle(join(__dirname, 'test.gif'))
    .resize(600, 600, { kernel: Gifsicle.kernel.lanczos3, withoutEnlargement: false })
    .toFile(join(__dirname, 'test-resized-touch.gif'));

  t.true(isGif(readFileSync(join(__dirname, 'test-resized-touch.gif'))));
});

test('Crop', async t => {
  await Gifsicle(join(__dirname, 'test.gif'))
    .crop(600, 600, { position: Gifsicle.position.center })
    .toFile(join(__dirname, 'test-cropped.gif'));

  t.true(isGif(readFileSync(join(__dirname, 'test-cropped.gif'))));
});

test('Greyscale', async t => {
  await Gifsicle(join(__dirname, 'test.gif'))
    .greyscale(true)
    .toFile(join(__dirname, 'test-greyscale.gif'));

  t.true(isGif(readFileSync(join(__dirname, 'test-greyscale.gif'))));
});

test('Output as a Buffer', async t => {
  const output = await Gifsicle(join(__dirname, 'test.gif'))
    .resize(600, 600, { kernel: Gifsicle.kernel.lanczos3, withoutEnlargement: true })
    .toBuffer();
  writeFileSync(join(__dirname, 'test-buffer.gif'), output);

  t.true(isGif(readFileSync(join(__dirname, 'test-buffer.gif'))));
});

test('O2 Compression', async t => {
  await Gifsicle(join(__dirname, 'test.gif'))
    .optimize({ level: Gifsicle.level.O2 })
    .toFile(join(__dirname, 'test-o2.gif'));

  t.true(isGif(readFileSync(join(__dirname, 'test-o2.gif'))));
});

test('O3 Compression', async t => {
  await Gifsicle(join(__dirname, 'test.gif'))
    .optimize({ level: Gifsicle.level.O3 })
    .toFile(join(__dirname, 'test-o3.gif'));

  t.true(isGif(readFileSync(join(__dirname, 'test-o3.gif'))));
});

test('Lossiness 20', async t => {
  await Gifsicle(join(__dirname, 'test.gif'))
    .optimize({ lossiness: 20 })
    .toFile(join(__dirname, 'test-lossiness-20.gif'));

  t.true(isGif(readFileSync(join(__dirname, 'test-lossiness-20.gif'))));
});

test('Lossiness 120', async t => {
  await Gifsicle(join(__dirname, 'test.gif'))
    .optimize({ lossiness: 120 })
    .toFile(join(__dirname, 'test-lossiness-120.gif'));

  t.true(isGif(readFileSync(join(__dirname, 'test-lossiness-120.gif'))));
});
