const Gifsicle = require("./lib/constructor");
require("./lib/input")(Gifsicle);
require("./lib/color")(Gifsicle);
require("./lib/resize")(Gifsicle);
require("./lib/output")(Gifsicle);

module.exports = Gifsicle;