var fs = require("fs");

var Reindeer = function(name, speed, endurance, recovery) {
  this.name = name;
  this.speed = speed;
  this.endurance = endurance;
  this.recovery = recovery;
  
  this.init();
}

Reindeer.prototype.init = function() {
  this.distance = 0;
  this.isMoving = true;
  this.currentStateCounter = 0;
  this.points = 0;
}

Reindeer.prototype.move = function() {
  if (this.isMoving) {
    this.distance += this.speed;
  }
  this.setState();
};

Reindeer.prototype.setState = function() {
  this.currentStateCounter += 1;
  if (this.isMoving && this.currentStateCounter === this.endurance) {
    this.isMoving = false;
    this.currentStateCounter = 0;
  } else if (!this.isMoving && this.currentStateCounter === this.recovery) {
    this.isMoving = true;
    this.currentStateCounter = 0;
  }
};

var parse_input = function(filename) {
  var reindeer = [];
  var lines = fs.readFileSync(filename, "utf8").split('\n');
  var result;
  
  // Vixen can fly 8 km/s for 8 seconds, but then must rest for 53 seconds.
  var re = /^(\w+) can fly (\d+) km\/s for (\d+) seconds, but then must rest for (\d+) seconds\./;
  for (var i = 0; i < lines.length; i++) {
    result = re.exec(lines[i]);
    reindeer.push(new Reindeer(result[1], +result[2], +result[3], +result[4]));
  }
  
  return reindeer;
}

var get_furthest_reindeer = function(reindeer) {
  var furthest = reindeer.reduce(function(memo, r) {
    if (memo === null || r.distance > memo.distance) {
      return r;
    }
    return memo;
  }, null);
  
  return furthest;
};

var main = function() {
  var reindeer = parse_input("input.txt");
  
  var tick = 0;
  var end = 2503;
  var furthest;
  var pointsWinner;

  while (tick <= end) {
    reindeer.forEach(function(r) {
      r.move();
    });
    
    furthest = get_furthest_reindeer(reindeer);
    furthest.points += 1;
    
    tick += 1;
  }
  
  pointsWinner = reindeer.reduce(function(memo, r) {
    if (memo === null || r.points > memo.points) {
      return r;
    }
    return memo;
  }, null);
  
  console.log("The furthest is " + furthest.name + " at " + furthest.distance.toString());
  console.log("The winner on points is " + pointsWinner.name + " with " + pointsWinner.points.toString());
};

main();