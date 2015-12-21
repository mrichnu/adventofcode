
var Ingredient = function(name, capacity, durability, flavor, texture, calories) {
  this.name = name;
  this.capacity = capacity;
  this.durability = durability;
  this.flavor = flavor;
  this.texture = texture;
  this.calories = calories;
}

var combinations = [];

var qualities = ['capacity', 'durability', 'flavor', 'texture'];

for (var i = 1; i <= 97; i++) {
  for (var j = 1; j <= 97; j++) {
    for (var k = 1; k <= 97; k++) {
      for (var l = 1; l <= 97; l++) {
        if (i + j + k + l === 100) {
          combinations.push([i, j, k, l]);
        }
      }
    }
  }
}

var ingredients = [
  new Ingredient('Sprinkles', 5, -1, 0, 0, 5),
  new Ingredient('PeanutButter', -1, 3, 0, 0, 1),
  new Ingredient('Frosting', 0, -1, 4, 0, 6),
  new Ingredient('Sugar', -1, 0, 0, 2, 8)
];

var calculateCookieScore = function(combination) {
  var score = 1;
  var qualityScore;
  
  qualities.forEach(function(quality) {
    qualityScore = 0;
    
    for (var i = 0; i < combination.length; i++) {
      qualityScore += combination[i] * ingredients[i][quality];
    }
    
    score *= Math.max(0, qualityScore);
  });
  
  return score; 
}

var countCalories = function(combination) {
  var calories = 0;
  
  for (var i = 0; i < combination.length; i++) {
    calories += combination[i] * ingredients[i]['calories'];
  }
  
  return calories;  
}

var score = combinations.reduce(function(memo, combination) {
  var thisScore = calculateCookieScore(combination);
  if (thisScore > memo) {
    return thisScore;
  }
  return memo;
}, 0);

console.log("Highest score is " + score.toString());

score = combinations.reduce(function(memo, combination) {
  var thisScore = calculateCookieScore(combination);
  if (thisScore > memo && countCalories(combination) == 500) {
    return thisScore;
  }
  return memo;
}, 0);

console.log("Highest 500 calorie score is " + score.toString());