var fs = require("fs");

var instructions = fs.readFileSync("input.txt", "utf8").split('');

var floor = instructions.reduce(function(memo, char) {
  if (char == "(") {
    return memo + 1;
  } else if (char == ")") {
    return memo - 1;
  }
  return memo;
}, 0);

console.log("final floor: " + floor);

// do a simple loop to find the first time we enter the basement.
floor = 0;
for (var ix = 0; ix < instructions.length; ix++) {
  if (instructions[ix] == "(") {
    floor = floor + 1;
  } else if (instructions[ix] == ")") {
    floor = floor - 1;
  }
  
  if (floor == -1) {
    console.log("Hit basement at instruction " + (ix + 1));
    break;
  }
}