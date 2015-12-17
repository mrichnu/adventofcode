var md5 = require("md5");

var input = "iwrupvqb";
var test = 0;

function produces_valid_hash(num, zeroCount) {
  return md5(input+num).substr(0, zeroCount) === "0".repeat(zeroCount);
}

while (true) {
  if (produces_valid_hash(test, 5)) {
    break;
  }
  test += 1;
}

console.log("5-zero hash for " + input + " + " + test.toString() + " is " + md5(input + test.toString()));

test = 0;

while (true) {
  if (produces_valid_hash(test, 6)) {
    break;
  }
  test += 1;
}

console.log("6-zero hash for " + input + " + " + test.toString() + " is " + md5(input + test.toString()));