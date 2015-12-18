var input = '3113322113';

var look_and_say = function(str) {
  var output = '';
  var digitCount = 0;
  var prevDigit = 0;
  
  var digits = str.split('');
  
  for (var i = 0; i < digits.length; i++) {
    if (prevDigit > 0 && digits[i] != prevDigit) {
      output = output + digitCount + prevDigit;
      digitCount = 0;
    }
    
    prevDigit = digits[i];
    digitCount += 1;
  }
  
  // once more to capture final digit
  output = output + digitCount + prevDigit
  
  return output;
}

for (var i = 0; i < 50; i++) {
  input = look_and_say(input);
  
  if (i == 40) {
    console.log("40x: input is " + input.length + " chars long");
  }
}

console.log("50x: input is " + input.length + " chars long");