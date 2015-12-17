var rl = require("readline").createInterface({
  input: require("fs").createReadStream("input.txt")
})

var Present = function(line) {
  var bits = line.split("x");
  this.length = parseInt(bits[0]);
  this.width = parseInt(bits[1]);
  this.height = parseInt(bits[2]);
}

Present.prototype.getWrappingPaperAmount = function() {
  var side1 = this.length * this.width;
  var side2 = this.width * this.height;
  var side3 = this.length * this.height;
  return (2 * side1) + (2 * side2) + (2 * side3) + Math.min(side1, side2, side3);
}

Present.prototype.getRibbonAmount = function() {
  var perim1 = this.length + this.length + this.width + this.width;
  var perim2 = this.width + this.width + this.height + this.height;
  var perim3 = this.length + this.length + this.height + this.height;
  return Math.min(perim1, perim2, perim3) + (this.length * this.width * this.height);
}

var totalWrappingPaper = 0;
var totalRibbon = 0;

rl.
  on("line", function(line) {
    var present = new Present(line);
    totalWrappingPaper += present.getWrappingPaperAmount();
    totalRibbon += present.getRibbonAmount();
  })
  .on("close", function() {
    console.log("total wrapping paper needed: " + totalWrappingPaper);
    console.log("total ribbon needed: " + totalRibbon);
  });

var test1 = new Present("1x1x10");
console.log("test1 ribbon: " + test1.getRibbonAmount());