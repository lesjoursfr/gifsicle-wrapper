import sizeOf from "image-size";
import { Gifsicle } from "../gifsicle.js";

/**
 * Reduction kernels.
 */
export enum ReductionKernel {
  sample = "sample",
  mix = "mix",
  catrom = "catrom",
  mitchell = "mitchell",
  lanczos2 = "lanczos2",
  lanczos3 = "lanczos3",
}

/**
 * Position modes for cropping.
 */
export enum CroppingPosition {
  center = "center",
  top = "top",
  right = "right",
  bottom = "bottom",
  left = "left",
  topRight = "topRight",
  bottomRight = "bottomRight",
  bottomLeft = "bottomLeft",
  topLeft = "topLeft",
}

/**
 * Resize options.
 */
export type ResizeOptions = {
  kernel: ReductionKernel | undefined;
  withoutEnlargement: boolean | undefined;
};

/**
 * Cropping options.
 */
export type CroppingOptions = {
  position: CroppingPosition | undefined;
};

/**
 * Resize image to `width`, `height` or `width x height`.
 *
 * @param {Number} [width] - pixels wide the resultant image should be. Use `null` or `undefined` to auto-scale the width to match the height.
 * @param {Number} [height] - pixels high the resultant image should be. Use `null` or `undefined` to auto-scale the height to match the width.
 * @param {Object} [options]
 * @param {ReductionKernel} [options.kernel=ReductionKernel.lanczos3] - the kernel to use for image reduction.
 * @param {Boolean} [options.withoutEnlargement=false] - do not enlarge if the width *or* height are already less than the specified dimensions, equivalent to GraphicsMagick's `>` geometry option. *
 * @returns {Gifsicle}
 * @throws {TypeError} Invalid parameters
 */
export function resize(
  this: Gifsicle,
  width: number | undefined,
  height: number | undefined,
  options: ResizeOptions | undefined
): Gifsicle {
  // Default options
  this.options.resize = { kernel: ReductionKernel.lanczos3, withoutEnlargement: false };

  // Process parameters
  if (width !== undefined) {
    if (Number.isInteger(width) && width > 0) {
      this.options.resize.width = width;
    } else {
      throw new TypeError("Expected 'width' to be a positive integer");
    }
  }
  if (height !== undefined) {
    if (Number.isInteger(height) && height > 0) {
      this.options.resize.height = height;
    } else {
      throw new TypeError("Expected 'height' to be a positive integer");
    }
  }
  if (options !== undefined) {
    // Kernel
    if (options.kernel !== undefined) {
      this.options.resize.kernel = options.kernel;
    }
    // Without enlargement
    if (options.withoutEnlargement !== undefined) {
      this.options.resize.withoutEnlargement = options.withoutEnlargement;
    }
  }
  return this;
}

/**
 * Crop the image to `width x height`.
 *
 * @param {number} [width] - pixels wide the resultant image should be.
 * @param {number} [height] - pixels high the resultant image should be.
 * @param {Object} [options]
 * @param {CroppingPosition} [options.position=CroppingPosition.center] - position of the cropping rectangle.
 * @returns {Gifsicle}
 * @throws {TypeError} Invalid parameters
 */
export function crop(this: Gifsicle, width: number, height: number, options: CroppingOptions | undefined): Gifsicle {
  // Default options
  this.options.crop = { width: 0, height: 0, position: CroppingPosition.center };

  // Process parameters
  if (Number.isInteger(width) && width > 0) {
    this.options.crop.width = width;
  } else {
    throw new TypeError("Expected 'width' to be a positive integer");
  }
  if (Number.isInteger(height) && height > 0) {
    this.options.crop.height = height;
  } else {
    throw new TypeError("Expected 'height' to be a positive integer");
  }
  if (options !== undefined) {
    // Position
    if (options.position !== undefined) {
      this.options.crop.position = options.position;
    }
  }
  return this;
}

export function computeCroppingPoint(
  input: Buffer,
  crop: { width: number; height: number; position: CroppingPosition }
): { x: number; y: number } {
  const size = sizeOf(input);
  if (size.width === undefined || size.height === undefined) {
    throw new Error("Can't compute the image size");
  }

  let px = 0;
  let py = 0;
  switch (crop.position) {
    case CroppingPosition.center:
      px = Math.floor((size.width - crop.width) / 2);
      py = Math.floor((size.height - crop.height) / 2);
      break;
    case CroppingPosition.top:
      px = Math.floor((size.width - crop.width) / 2);
      py = 0;
      break;
    case CroppingPosition.right:
      px = size.width - crop.width;
      py = Math.floor((size.height - crop.height) / 2);
      break;
    case CroppingPosition.bottom:
      px = Math.floor((size.width - crop.width) / 2);
      py = size.height - crop.height;
      break;
    case CroppingPosition.left:
      px = 0;
      py = Math.floor((size.height - crop.height) / 2);
      break;
    case CroppingPosition.topRight:
      px = size.width - crop.width;
      py = 0;
      break;
    case CroppingPosition.bottomRight:
      px = size.width - crop.width;
      py = size.height - crop.height;
      break;
    case CroppingPosition.bottomLeft:
      px = 0;
      py = size.height - crop.height;
      break;
    case CroppingPosition.topLeft:
      px = 0;
      py = 0;
      break;
  }
  return { x: px, y: py };
}
