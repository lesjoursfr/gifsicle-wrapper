import { readFileSync } from 'fs';
import { isGif } from './toolbox/is-gif.js';

export function readFile (input: string | Buffer) : Buffer {
  if (typeof input === 'string') {
    input = readFileSync(input);
  }

  if (!isGif(input)) {
    throw new TypeError("Expected 'input' to be a gif file");
  }

  return input;
}
