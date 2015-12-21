var fs = require("fs");

var Relationship = function(a, b, happiness) {
  this.a = a;
  this.b = b;
  this.happiness = happiness;
};

var parse_lines = function(lines) {
  var relationships = [];
  var result, amount;
  
  // e.g. Alice would lose 57 happiness units by sitting next to Bob.
  var re = /^(\w+) would (\w+) (\d+) happiness units by sitting next to (\w+)\.$/;
 
  for (var i = 0; i < lines.length; i++) {
    result = re.exec(lines[i]);
    
    if (result[2] === 'lose') {
      amount = -1 * +result[3];
    } else {
      amount = +result[3];
    }
    
    relationships.push(new Relationship(result[1], result[4], amount));
  }
  
   return relationships;
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

var create_relationship_matrix = function(relationships, add_me) {
  var matrix = [];

  // derive set of unique people
  var people = [];
  relationships.forEach(function(relationship) {
    if (people.indexOf(relationship.a) < 0) {
      people.push(relationship.a);
    }
    if (people.indexOf(relationship.b) < 0) {
      people.push(relationship.b);
    }
  });
  
  if (add_me) {
    people.push("foo");
  }
  
  matrix = permute(people);
  
  return matrix;
};

var get_happiness = function(arrangement, relationships) {
  var happiness = 0;
  var j;
  
  for (var i = 0; i < arrangement.length; i++) {
    j = i + 1;
    if (j == arrangement.length) {
      j = 0;
    }
    
    var relationship1 = relationships.find(function(relationship) {
      return relationship.a === this.a && relationship.b === this.b; 
    }, {a: arrangement[i], b: arrangement[j]});
    
    var relationship2 = relationships.find(function(relationship) {
      return relationship.a === this.b && relationship.b === this.a; 
    }, {a: arrangement[i], b: arrangement[j]});
    
    happiness += relationship1 ? relationship1.happiness : 0;
    happiness += relationship2 ? relationship2.happiness : 0;
  }
  
  return happiness;
};


var main = function() {
  var lines = fs.readFileSync("./input.txt", "utf8").split('\n');
  
  var relationships = parse_lines(lines);
  
  var matrix = create_relationship_matrix(relationships);
  
  var happiest = matrix.reduce(function(memo, arrangement) {
    var happiness = get_happiness(arrangement, relationships);
    if (memo === null || happiness > memo) {
      return happiness;
    }
    return memo;
  }, null);
  
  console.log("happiest arrangement is " + happiest.toString());
  
  matrix = create_relationship_matrix(relationships, true);
  
  happiest = matrix.reduce(function(memo, arrangement) {
    var happiness = get_happiness(arrangement, relationships);
    if (memo === null || happiness > memo) {
      return happiness;
    }
    return memo;
  }, null);
  
  console.log("happiest arrangement with me is " + happiest.toString());
};

main();