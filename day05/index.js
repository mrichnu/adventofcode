var rl = require("readline").createInterface({
  input: require("fs").createReadStream("input.txt")
});

var vowels = ['a', 'e', 'i', 'o', 'u'];
var badStrings = ['ab', 'cd', 'pq', 'xy'];

function meets_min_vowel_count(str, minCount) {
  var found = 0;
  
  for (var i = 0; i < str.length; i++) {
    if (vowels.indexOf(str.charAt(i)) >= 0) {
      found += 1;
    }
  }
  
  return found >= minCount;
}

function contains_double_letter(str) {
  var prevChar = '';
  for (var i = 0; i < str.length; i++) {
    if (str.charAt(i) == prevChar) {
      return true;
    }
    prevChar = str.charAt(i);
  }
  return false;
}

function contains_bad_string(str) {
  for (var i = 0; i < badStrings.length; i++) {
    if (str.indexOf(badStrings[i]) >= 0) {
      return true;
    }
  }
  return false;
}

function contains_repeating_non_overlapping_pair(str) {
  var pair;
  for (var i = 0; i < str.length - 3; i++) {
    pair = str.substr(i, 2);
    if (str.substr(i+2).indexOf(pair) >= 0) {
      return true;
    }
  }
  
  return false;
}

function contains_letter_repeating_with_one_letter_between(str) {
  for (var i = 0; i < str.length - 2; i++) {
    if (str.charAt(i) === str.charAt(i+2)) {
      return true;
    }
  }
  
  return false;
}

function test1(str) {
  return meets_min_vowel_count(str, 3) && contains_double_letter(str) && !contains_bad_string(str); 
}

function test2(str) {
  return contains_repeating_non_overlapping_pair(str) && contains_letter_repeating_with_one_letter_between(str);
}

var goodCount1 = 0;
var goodCount2 = 0;

rl.
  on("line", function(line) {
    if (test1(line)) {
      goodCount1 += 1;
    }
    if (test2(line)) {
      goodCount2 += 1;
    }
  })
  .on("close", function() {
    console.log("Found " + goodCount1.toString() + " good strings using method 1");
    console.log("Found " + goodCount2.toString() + " good strings using method 2");
  });

console.log("qjhvhtzxzqqjkmpb: " + test2("qjhvhtzxzqqjkmpb"));
console.log("xxyxx: " + test2("xxyxx"));
console.log("uurcxstgmygtbstg: " + test2("uurcxstgmygtbstg"));
console.log("ieodomkazucvgmuy: " + test2("ieodomkazucvgmuy"));
