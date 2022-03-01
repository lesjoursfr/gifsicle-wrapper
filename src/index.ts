import { Gifsicle } from './gifsicle.js';
import { OptimizationLevel } from './optimize.js';
import { CroppingPosition, ReductionKernel } from './resize.js';

function gifsicle (input: string | Buffer): Gifsicle {
  return new Gifsicle(input);
}

gifsicle.kernel = ReductionKernel;
gifsicle.position = CroppingPosition;
gifsicle.level = OptimizationLevel;

export default gifsicle;
