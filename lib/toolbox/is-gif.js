// Based on isGif function from https://github.com/sindresorhus/is-gif
// https://github.com/sindresorhus/is-gif/blob/main/index.js
export default function isGif (buffer) {
  if (!buffer || buffer.length < 3) {
    return false;
  }

  return buffer[0] === 0x47 &&
        buffer[1] === 0x49 &&
        buffer[2] === 0x46;
};
