import Gifsicle from './lib/constructor.js';
import addColorFunctions from './lib/color.js';
import addInputFunctions from './lib/input.js';
import addOptimizeFunctions from './lib/optimize.js';
import addOutputFunctions from './lib/output.js';
import addResizeFunctions from './lib/resize.js';

addInputFunctions(Gifsicle);
addColorFunctions(Gifsicle);
addResizeFunctions(Gifsicle);
addOptimizeFunctions(Gifsicle);
addOutputFunctions(Gifsicle);

export default Gifsicle;
