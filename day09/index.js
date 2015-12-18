var fs = require("fs");

var Leg = function(begin, end, distance) {
  this.begin = begin;
  this.end = end;
  this.distance = distance;
};

// return list of Leg objects, one for each distance
var parse_legs = function(distances) {
  var legs = [];
  var result;
  
  // e.g. Straylight to Arbre = 127
  var re = /(.+) to (.+) = (\d+)/;
  
  for (var i = 0; i < distances.length; i++) {
    result = re.exec(distances[i]);
    legs.push(new Leg(result[1], result[2], +result[3]));
  }
  
   return legs;
};

var permute = function (list) {
	// Empty list has one permutation
	if (list.length == 0)
		return [[]];
		
	var result = [];
	
	for (var i=0; i<list.length; i++) {
		// Clone list (kind of)
		var copy = Object.create(list);

		// Cut one element from list
		var head = copy.splice(i, 1);
		
		// Permute rest of list
		var rest = permute(copy);
		
		// Add head to each permutation of rest of list
		for (var j=0; j<rest.length; j++) {
			var next = head.concat(rest[j]);
			result.push(next);
		}
	}
	
	return result;
}

// create matrix (list of lists)
// each list is a list of Leg objects
// representing every possible trip through all locations
var create_route_matrix = function(legs) {
  var matrix = [];

  // derive set of unique cities from legs
  var cities = [];
  legs.forEach(function(leg) {
    if (cities.indexOf(leg.begin) < 0) {
      cities.push(leg.begin);
    }
    if (cities.indexOf(leg.end) < 0) {
      cities.push(leg.end);
    }
  });
  
  matrix = permute(cities);
  
  return matrix;
};

var get_trip_distance = function(trip, legs) {
  var distance = 0;
  
  for (var i = 0; i < trip.length - 1; i++) {
    var leg = legs.find(function(leg) {
      return (leg.begin === this.a && leg.end === this.b) || (leg.begin === this.b && leg.end === this.a); 
    }, {a: trip[i], b: trip[i+1]});
    
    distance += leg.distance;
  }
  
  return distance;
};

var main = function() {
  var distances = fs.readFileSync("input.txt", "utf8").split('\n');
  
  var legs = parse_legs(distances);
  
  var matrix = create_route_matrix(legs);
  
  var shortest = matrix.reduce(function(memo, trip) {
    var distance = get_trip_distance(trip, legs);
    //console.log(trip + " distance = " + distance);
    if (memo === null || distance < memo) {
      return distance;
    }
    return memo;
  }, null);
  
  var longest = matrix.reduce(function(memo, trip) {
    var distance = get_trip_distance(trip, legs);
    if (memo === null || distance > memo) {
      return distance;
    }
    return memo;
  }, null);
  
  console.log("shortest distance is " + shortest.toString());
  console.log("longest distance is " + longest.toString());
};

main();