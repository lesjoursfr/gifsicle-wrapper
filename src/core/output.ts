import { execa } from "execa";
import { writeFileSync } from "fs";
import { Gifsicle, GifsicleInternalOptions } from "../gifsicle.js";
import { gifsicleWrapper } from "../wrapper.js";
import { computeCroppingPoint } from "./resize.js";

async function processFile(input: Buffer, options: GifsicleInternalOptions) {
  const args = ["--no-warnings", "--no-app-extensions"];

  if (options.greyscale === true) {
    args.push("--use-colormap=gray");
  }

  if (options.crop !== undefined) {
    const { x, y } = computeCroppingPoint(input, options.crop);
    args.push(`--crop=${x}, ${y}+${options.crop.width}x${options.crop.height}`);
  }

  if (options.resize !== undefined) {
    if (options.resize.width !== undefined || options.resize.height !== undefined) {
      if (options.resize.withoutEnlargement === true) {
        args.push(`--resize-fit=${options.resize.width || "_"}x${options.resize.height || "_"}`);
      } else {
        args.push(`--resize-touch=${options.resize.width || "_"}x${options.resize.height || "_"}`);
      }
    }
  }

  if (options.optimize !== undefined) {
    if (options.optimize.level !== undefined) {
      args.push(`-${options.optimize.level}`);
    }
    if (options.optimize.lossiness !== undefined) {
      args.push(`--lossy=${options.optimize.lossiness}`);
    }
  }

  const { stdout } = await execa(gifsicleWrapper.path, args, {
    encoding: "buffer",
    input,
  });

  return stdout;
}

/**
 * Save the result in a file.
 *
 * @param {String} [fileOut]
 */
export async function toFile(this: Gifsicle, fileOut: string) {
  writeFileSync(fileOut, await processFile(this.input, this.options));
}

/**
 * Get the result file as a Buffer.
 *
 * @returns {Buffer}
 */
export async function toBuffer(this: Gifsicle) {
  return processFile(this.input, this.options);
}
