import { grayscale, greyscale } from "./core/color.js";
import { readFile } from "./core/input.js";
import { OptimizeOptions, optimize } from "./core/optimize.js";
import { toBuffer, toFile } from "./core/output.js";
import { CroppingPosition, ReductionKernel, crop, resize } from "./core/resize.js";

export interface GifsicleInternalOptions {
  greyscale?: boolean;
  resize?: { width?: number; height?: number; kernel: ReductionKernel; withoutEnlargement: boolean };
  crop?: { width: number; height: number; position: CroppingPosition };
  optimize?: OptimizeOptions;
}

/**
 * Export Gifsicle class.
 */
export class Gifsicle {
  options: GifsicleInternalOptions;
  input: Buffer;

  constructor(input: string | Buffer) {
    this.input = readFile(input);
    this.options = {};
  }

  public greyscale = greyscale;
  public grayscale = grayscale;
  public resize = resize;
  public crop = crop;
  public optimize = optimize;
  public toFile = toFile;
  public toBuffer = toBuffer;
}
