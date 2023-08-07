import { OptimizationLevel } from "./core/optimize.js";
import { CroppingPosition, ReductionKernel } from "./core/resize.js";
import { Gifsicle } from "./gifsicle.js";

function gifsicle(input: string | Buffer): Gifsicle {
  return new Gifsicle(input);
}

gifsicle.kernel = ReductionKernel;
gifsicle.position = CroppingPosition;
gifsicle.level = OptimizationLevel;

export default gifsicle;
