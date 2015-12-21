var input = require("./input.json");

var parse_element = function(input) {
  var total = 0;
  for (var elem in input) {
    if (typeof input[elem] === 'number') {
      total += input[elem];
    } else if (typeof input[elem] === 'object') {
      total += parse_element(input[elem]);
    }
  }
  
  return total;
}

console.log("Total: " + parse_element(input));