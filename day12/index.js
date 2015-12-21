var input = require("./input.json");

var parse_element = function(input, skip) {
  var total = 0;
  
  // run through once to make sure "red" is not in input
  if (skip !== undefined && typeof input === 'object' && !Array.isArray(input)) {
    for (var e in input) {
      if (e === skip || input[e] === skip) {
        return total;
      }
    }
  }

  for (var elem in input) {
    if (typeof input[elem] === 'number') {
      total += input[elem];
    } else if (typeof input[elem] === 'object') {
      total += parse_element(input[elem], skip);
    }
  }
  
  return total;
}

console.log("Total: " + parse_element(input));

console.log("Total, skipping red: " + parse_element(input, "red"));