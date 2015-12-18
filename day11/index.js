var input = 'vzbxkghb';

String.prototype.replaceAt = function(index, character) {
    return this.substr(0, index) + character + this.substr(index+character.length);
}

var incrementPassword = function(str) {
  var password = str;
  var i = str.length - 1;
  var currentCharCode, nextCharCode;
  while (true) {
    currentCharCode = str.charCodeAt(i);
    
    // z = 122
    if (currentCharCode === 122) {
      nextCharCode = 97;
      password = password.replaceAt(i, String.fromCharCode(nextCharCode));
      i -= 1;
      continue;

    } else {
      nextCharCode = currentCharCode + 1;
      password = password.replaceAt(i, String.fromCharCode(nextCharCode));
      break;
    }
  }

  return password;
};

var hasIncreasingStraightOfAtLeastThreeLetters = function(str) {
  // e.g. "abc"
  var char1, char2, char3; 
  
   for (var i = 2; i < str.length; i++) {
     char1 = str.charAt(i-2);
     char2 = str.charAt(i-1);
     char3 = str.charAt(i);
     
     if (char3.charCodeAt(0) - 1 == char2.charCodeAt(0) && char2.charCodeAt(0) - 1 == char1.charCodeAt(0)) {
       return true;
     }
   }
   
   return false;
};

var doesNotContainBadCharacters = function(str) {
  var badCharacters = ['i', 'o', 'l'];
  
  for (var i = 0; i < badCharacters.length; i++) {
    if (str.indexOf(badCharacters[i]) >= 0) {
      return false;
    }
  }
  
  return true;
};

var hasAtLeastTwoNonOverlappingPairs = function(str) {
  var re = /([a-z]{1})\1.+([a-z]{1})\2/;
  return re.test(str);
};

var isValid = function(str) {
  return hasIncreasingStraightOfAtLeastThreeLetters(str) && doesNotContainBadCharacters(str) && hasAtLeastTwoNonOverlappingPairs(str);
}

var main = function() {
  var password = input;
  while (true) {
    if (isValid(password)) {
      break;
    }
    password = incrementPassword(password);
  }
  
  console.log("next password is "+ password);
  
  password = incrementPassword(password);
  
  while (true) {
    if (isValid(password)) {
      break;
    }
    password = incrementPassword(password);
  }
  
  console.log("next password is "+ password);
};

main();