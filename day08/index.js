var rawLength = 0;
var evaluatedLength = 0;
var encodedLength = 0;

function calculateEncodedLength(str) {
  // orig string plus double quotes for beginning and end
  var l = str.length + 2;
  
  // extra char (slash) for every quote
  l += countChars(str, '"');
  
  // extra char (slash) for every slash
  l += countChars(str, '\\');
  
  return l;
}

function countChars(str, char) {
  var count = 0;
  var pos = str.indexOf(char);
  while (pos !== -1) {
    count += 1;
    pos = str.indexOf(char, pos + 1);
  }
  return count;
}

var rl = require("readline").createInterface({
  input: require("fs").createReadStream("input.txt")
});

rl.
  on("line", function(line) {
    rawLength += line.length;
    evaluatedLength += eval("new String("+line+")").length;
    encodedLength += calculateEncodedLength(line);
  })
  .on("close", function() {
    console.log(rawLength.toString() + " - " + evaluatedLength.toString() + " = " + (rawLength - evaluatedLength).toString());
    console.log(encodedLength.toString() + " - " + rawLength.toString() + " = " + (encodedLength - rawLength).toString());
  });
