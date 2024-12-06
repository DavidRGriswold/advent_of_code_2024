var fname = process.argv[2];
console.log(fname);
var fs = require("fs"),
  path = require("path"),
  filePath = path.join(__dirname, fname);

let input = fs.readFileSync(filePath).toString();

// separate the input into the rules and update strings
let [ruleStrings, updates] = input.split("\n\n");
let rules = {};

// Build a rule object where the first page is the key, value is an array
// of required followup objects. So it looks like:
// {
//   27: [78, 92, 11],
//   11: [32, 78]
// }

for (let e of ruleStrings.split("\n").map((e) => e.split("|").map(Number))) {
  if (rules[e[0]]) rules[e[0]].push(e[1]);
  else rules[e[0]] = [e[1]];
}

//Convert the update strings to number array
updates = updates.split("\n").map((e) => e.split(",").map(Number));
let correctUpdates = [];
let incorrectUpdates = [];

// split into correct and incorrect
for (let u of updates) {
  if (isCorrect(u)) correctUpdates.push(u.slice());
  else incorrectUpdates.push(u.slice());
}

// part 1
console.log(midSum(correctUpdates));

//part 2
incorrectUpdates.forEach((e) => e.sort(orderFunction));
console.log(midSum(incorrectUpdates));

/**
 * Checks if an update is in the correct order
 * @param {Array<Number>} update a single update array
 * @returns 
 */
function isCorrect(update) {
  for (let i = update.length - 1; i > 0; i--) {
    if (rules[update[i]]) {
      for (let j = i - 1; j >= 0; j--) {
        if (rules[update[i]].includes(update[j])) return false;
      }
    }
  }
  return true;
}

/**
 * Finds the sum of the middle values of an array of updates
 * @param {Arrray<Array<Number>>} updates 
 * @returns {Number} sum
 */
function midSum(updates) {
  let sum = 0;
  for (let u of updates) {
    sum += u[(u.length - 1) / 2];
  }
  return sum;
}

/**
 * Ordering function for "correct" sort. Returns -1 if v1 should 
 * come before v2, 1 if v1 should come after, 0 if it doesn't matter
 * @param {Number} v1 
 * @param {Number} v2 
 * @returns 
 */
function orderFunction(v1, v2, update) {
  if (rules[v1] && rules[v1].includes(v2)) return -1;
  if (rules[v2] && rules[v2].includes(v1)) return 1;
  console.log("no rule for " + v1 + " and " + v2);
    
  }

