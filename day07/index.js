
var Instruction = function(expr, wireName) {
  this.expr = expr;
  this.wireName = wireName;
}

Instruction.prototype.evaluate = function(wires) {
  // either returns a number or undefined
  
  if (this.isNumber()) {
    return +this.expr;
  }
  
  if (this.isWireName()) {
    return wires[this.expr];
  }

  // NOT
  if (this.isNotGate()) {
    return this.evaluateNotGate(wires);
  }
  
  // OR
  if (this.isOrGate()) {
    return this.evaluateOrGate(wires);
  }
  
  // AND
  if (this.isAndGate()) {
    return this.evaluateAndGate(wires);
  }
  
  // LSHIFT
  if (this.isLShiftGate()) {
    return this.evaluateLShiftGate(wires);
  }
  
  // RSHIFT
  if (this.isRShiftGate()) {
    return this.evaluateRShiftGate(wires);
  }

  return undefined;
}

Instruction.prototype.isRShiftGate = function() {
  var re = /RSHIFT/;
  return re.test(this.expr);
}

Instruction.prototype.evaluateRShiftGate = function(wires) {
  var re = /^(\w+) RSHIFT (\w+)$/;
  var result = re.exec(this.expr);
  var w1 = result[1];
  var w2 = result[2];
  
  var val1 = this.getValue(w1, wires);
  var val2 = this.getValue(w2, wires);
  
  if (val1 !== undefined && val2 !== undefined) {
    return val1 >> val2;
  }
  
  return undefined;
}

Instruction.prototype.isLShiftGate = function() {
  var re = /LSHIFT/;
  return re.test(this.expr);
}

Instruction.prototype.evaluateLShiftGate = function(wires) {
  var re = /^(\w+) LSHIFT (\w+)$/;
  var result = re.exec(this.expr);
  var w1 = result[1];
  var w2 = result[2];
  
  var val1 = this.getValue(w1, wires);
  var val2 = this.getValue(w2, wires);
  
  if (val1 !== undefined && val2 !== undefined) {
    return val1 << val2;
  }
  
  return undefined;
}

Instruction.prototype.isAndGate = function() {
  var re = /AND/;
  return re.test(this.expr);
}

Instruction.prototype.evaluateAndGate = function(wires) {
  var re = /^(\w+) AND (\w+)$/;
  var result = re.exec(this.expr);
  var w1 = result[1];
  var w2 = result[2];
  
  var val1 = this.getValue(w1, wires);
  var val2 = this.getValue(w2, wires);
  
  if (val1 !== undefined && val2 !== undefined) {
    return val1 & val2;
  }
  
  return undefined;
}

Instruction.prototype.isOrGate = function() {
  var re = /OR/;
  return re.test(this.expr);
}

Instruction.prototype.evaluateOrGate = function(wires) {
  var re = /^(\w+) OR (\w+)$/;
  var result = re.exec(this.expr);
  var w1 = result[1];
  var w2 = result[2];
  
  var val1 = this.getValue(w1, wires);
  var val2 = this.getValue(w2, wires);
  
  if (val1 !== undefined && val2 !== undefined) {
    return val1 | val2;
  }
  
  return undefined;
}

Instruction.prototype.isNotGate = function() {
  var re = /^NOT/;
  return re.test(this.expr);
}

Instruction.prototype.evaluateNotGate = function(wires) {
  var re = /^NOT (\w+)$/;
  var result = re.exec(this.expr);
  var wireName = result[1];
  
  var val = this.getValue(wireName, wires);
  
  if (val !== undefined) {
    return ~ val;
  }
  
  return undefined;
}

Instruction.prototype.isNumber = function() {
  var re = /^\d+$/;
  return re.test(this.expr);
}

Instruction.prototype.isWireName = function() {
  var re = /^[a-z]{1,2}$/;
  return re.test(this.expr);
}

Instruction.prototype.getValue = function(wireName, wires) {
  if (!isNaN(parseInt(wireName, 10))) {
    return parseInt(wireName, 10);
  } else {
    return wires[wireName];
  }
}

var Circuit = function() {
  this.instructions = [];
  this.wires = {};
}

Circuit.prototype.compute = function() {
  while(true) {
    this.instructions.forEach(function(instruction) {
      this.wires[instruction.wireName] = instruction.evaluate(this.wires); 
    }, this);
    
    if (this.isComputed()) {
      break;
    }
  }
}

Circuit.prototype.isComputed = function() {
  return Object.keys(this.wires).every(function(wireName) {
    return this.wires[wireName] !== undefined;
  }, this);
}

function parseLine(line) {
  // e.g. NOT dq -> dr
  var re = /(.+) -> (\w+)/;
  var result = re.exec(line);
  
  return {
    expr: result[1],
    wireName: result[2]
  };
}

var circuit = new Circuit();

var rl = require("readline").createInterface({
  input: require("fs").createReadStream("input.txt")
});

rl.
  on("line", function(line) {
    var l = parseLine(line);
    circuit.instructions.push(new Instruction(l.expr, l.wireName));
  })
  .on("close", function() {
    circuit.compute();
    console.log("wire a has value " + circuit.wires['a']);
    console.log("Recomputing after resetting wire b to wire a's value");
    
    var a = circuit.wires['a'];
    
    // find the instruction that sets wire 'b' and change its value to the current value of wire 'a'
    circuit.instructions.find(function(instruction) {
      return instruction.wireName === 'b';
    }).expr = a.toString();
    
    // clear out the value of each existing wire
    Object.keys(circuit.wires).forEach(function(wireName) {
      circuit.wires[wireName] = undefined;
    });

    circuit.compute();
    console.log("wire a has value " + circuit.wires['a']);
  });