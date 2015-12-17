var rl = require("readline").createInterface({
  input: require("fs").createReadStream("input.txt")
});

var Light = function() {
  this.state = false;
  this.brightness = 0;
}

Light.prototype.turnOn = function() {
  this.state = true;
  this.brightness = 1;
}

Light.prototype.turnOff = function() {
  this.state = false;
  this.brightness = 0;
}

Light.prototype.toggle = function() {
  this.state = !this.state;
  if (this.state) {
    this.brightness = 1;
  } else {
    this.brightness = 0;
  }
}

var VariableLight = function() {
  this.brightness = 0;
}

VariableLight.prototype.turnOn = function() {
  this.brightness += 1;
}

VariableLight.prototype.turnOff = function() {
  this.brightness = Math.max(0, this.brightness - 1);
}

VariableLight.prototype.toggle = function() {
  this.brightness += 2;
}

var Grid = function(size, lightConstructor) {
  this.size = size;
  this._grid = new Array(this.size);
  for (var i = 0; i < this.size; i++) {
    this._grid[i] = new Array(this.size);
    for (var j = 0; j < this.size; j++) {
      this._grid[i][j] = new lightConstructor();
    }
  }
}

Grid.prototype.turnOn = function(x1, y1, x2, y2) {
  this.getLightsInRect(x1, y1, x2, y2).forEach(function(light) {
    light.turnOn();
  });
}

Grid.prototype.turnOff = function(x1, y1, x2, y2) {
  this.getLightsInRect(x1, y1, x2, y2).forEach(function(light) {
    light.turnOff();
  });
}

Grid.prototype.toggle = function(x1, y1, x2, y2) {
  this.getLightsInRect(x1, y1, x2, y2).forEach(function(light) {
    light.toggle();
  });
}

Grid.prototype.getLightsInRect = function(x1, y1, x2, y2) {
  var lights = [];
  
  for (var x = x1; x <= x2; x++) {
    for (var y = y1; y <= y2; y++) {
      lights.push(this._grid[x][y]);
    }
  }
  
  return lights;
}

Grid.prototype.countLightsInState = function(state) {
  return this.getLightsInRect(0, 0, this.size - 1, this.size - 1).reduce(function(memo, light) {
    if (light.state === state) {
      memo += 1;
    }
    return memo;
  }, 0);
}

Grid.prototype.getTotalBrightness = function() {
  return this.getLightsInRect(0, 0, this.size - 1, this.size - 1).reduce(function(memo, light) {
    return memo + light.brightness;
  }, 0);
}

function parseLine(line) {
  var operation = '';
  var x1, x2, y1, y2;
  var re = /(\d+),(\d+) through (\d+),(\d+)/;
  
  if (line.indexOf("toggle") == 0) {
    operation = "toggle";
  } else if (line.indexOf("turn on") == 0) {
    operation = "turnOn";
  } else if (line.indexOf("turn off") == 0) {
    operation = "turnOff";
  } else {
    console.log("Could not understand " + line);
  }
  
  var result = re.exec(line);
  x1 = parseInt(result[1]);
  y1 = parseInt(result[2]);
  x2 = parseInt(result[3]);
  y2 = parseInt(result[4]);
  
  return {
    operation: operation,
    x1: x1,
    y1: y1,
    x2: x2,
    y2: y2
  };
}

var grid1 = new Grid(1000, Light);
var grid2 = new Grid(1000, VariableLight);

rl.
  on("line", function(line) {
    var o = parseLine(line);
    if (o.operation === "turnOn") {
      grid1.turnOn(o.x1, o.y1, o.x2, o.y2);
      grid2.turnOn(o.x1, o.y1, o.x2, o.y2);
    } else if (o.operation === "turnOff") {
      grid1.turnOff(o.x1, o.y1, o.x2, o.y2);
      grid2.turnOff(o.x1, o.y1, o.x2, o.y2);
    } else if (o.operation === "toggle") {
      grid1.toggle(o.x1, o.y1, o.x2, o.y2);
      grid2.toggle(o.x1, o.y1, o.x2, o.y2);
    }
  })
  .on("close", function() {
    console.log("grid1: " + grid1.countLightsInState(true).toString() + " lights are on");
    console.log("grid2: " + grid2.getTotalBrightness().toString() + " total brightness");
  });
