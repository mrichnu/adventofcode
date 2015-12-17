var fs = require("fs");

var instructions = fs.readFileSync("input.txt", "utf8").split('');

var House = function() {
  this.presentCount = 0;
}

House.prototype.deliverPresent = function() {
  this.presentCount += 1;
}

var Map = function() {
  this._map = [];
}

Map.prototype.deliverPresent = function(loc) {
  this.getHouseAtLocation(loc).deliverPresent();
}

Map.prototype.getHouseAtLocation = function(loc) {
  if (this._map[loc.x] === undefined) {
    this._map[loc.x] = [];
  }
  if (this._map[loc.x][loc.y] === undefined) {
    this._map[loc.x][loc.y] = new House();
  }
  return this._map[loc.x][loc.y];
}

var Santa = function() {
  this.x = 0;
  this.y = 0;
}

Santa.prototype.move = function(char) {
  if (char === "^") {
    this.y += 1;
  } else if (char === ">") {
    this.x += 1;
  } else if (char === "v") {
    this.y -= 1;
  } else if (char === "<") {
    this.x -= 1;
  }
}

Santa.prototype.getLocation = function() {
  return {x: this.x, y: this.y};
}

var World = function() {
  this.map = new Map();
  this.santa = new Santa();
  this.roboSanta = new Santa();
}

var world = new World();
// deliver at initial location
world.map.deliverPresent(world.santa.getLocation());
world.map.deliverPresent(world.roboSanta.getLocation());

instructions.forEach(function(char, ix) {
  var whichSanta;
  if (ix % 2 == 0) {
    whichSanta = world.santa;
  } else {
    whichSanta = world.roboSanta;
  }
  whichSanta.move(char);
  this.map.deliverPresent(whichSanta.getLocation());
  // console.log("delivered at " + world.santa.getLocation().x + ", " + world.santa.getLocation().y);
}, world);

var deliveryCount = 0;

for (var x in world.map._map) {
  for (var y in world.map._map[x]) {
    var house = world.map.getHouseAtLocation({x: x, y: y});
    if (house.presentCount > 0) {
      deliveryCount += 1;
    }
  }
}

console.log("delivered to " + deliveryCount + " houses");