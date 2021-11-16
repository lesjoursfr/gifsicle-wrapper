const fs = require('fs');
const path = require('path');
const isGif = require('./lib/toolbox/is-gif');
const test = require('ava');
const gifsicle = require('./index');

test('Resize (withoutEnlargement: true)', async t => {
  await gifsicle(path.join(__dirname, 'test.gif'))
    .resize(600, 600, { kernel: gifsicle.kernel.lanczos3, withoutEnlargement: true })
    .toFile(path.join(__dirname, 'test-resized-fit.gif'));

  t.true(isGif(fs.readFileSync(path.join(__dirname, 'test-resized-fit.gif'))));
});

test('Resize (withoutEnlargement: false)', async t => {
  await gifsicle(path.join(__dirname, 'test.gif'))
    .resize(600, 600, { kernel: gifsicle.kernel.lanczos3, withoutEnlargement: false })
    .toFile(path.join(__dirname, 'test-resized-touch.gif'));

  t.true(isGif(fs.readFileSync(path.join(__dirname, 'test-resized-touch.gif'))));
});

test('Crop', async t => {
  await gifsicle(path.join(__dirname, 'test.gif'))
    .crop(600, 600, { position: gifsicle.position.center })
    .toFile(path.join(__dirname, 'test-cropped.gif'));

  t.true(isGif(fs.readFileSync(path.join(__dirname, 'test-cropped.gif'))));
});

test('Greyscale', async t => {
  await gifsicle(path.join(__dirname, 'test.gif'))
    .greyscale(true)
    .toFile(path.join(__dirname, 'test-greyscale.gif'));

  t.true(isGif(fs.readFileSync(path.join(__dirname, 'test-greyscale.gif'))));
});

test('Output as a Buffer', async t => {
  const output = await gifsicle(path.join(__dirname, 'test.gif'))
    .resize(600, 600, { kernel: gifsicle.kernel.lanczos3, withoutEnlargement: true })
    .toBuffer();
  fs.writeFileSync(path.join(__dirname, 'test-buffer.gif'), output);

  t.true(isGif(fs.readFileSync(path.join(__dirname, 'test-buffer.gif'))));
});

test('O2 Compression', async t => {
  await gifsicle(path.join(__dirname, 'test.gif'))
    .optimize({ level: gifsicle.level.O2 })
    .toFile(path.join(__dirname, 'test-o2.gif'));

  t.true(isGif(fs.readFileSync(path.join(__dirname, 'test-o2.gif'))));
});

test('O3 Compression', async t => {
  await gifsicle(path.join(__dirname, 'test.gif'))
    .optimize({ level: gifsicle.level.O3 })
    .toFile(path.join(__dirname, 'test-o3.gif'));

  t.true(isGif(fs.readFileSync(path.join(__dirname, 'test-o3.gif'))));
});

test('Lossiness 20', async t => {
  await gifsicle(path.join(__dirname, 'test.gif'))
    .optimize({ lossiness: 20 })
    .toFile(path.join(__dirname, 'test-lossiness-20.gif'));

  t.true(isGif(fs.readFileSync(path.join(__dirname, 'test-lossiness-20.gif'))));
});

test('Lossiness 120', async t => {
  await gifsicle(path.join(__dirname, 'test.gif'))
    .optimize({ lossiness: 120 })
    .toFile(path.join(__dirname, 'test-lossiness-120.gif'));

  t.true(isGif(fs.readFileSync(path.join(__dirname, 'test-lossiness-120.gif'))));
});
