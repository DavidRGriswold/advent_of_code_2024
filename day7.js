let startTime = Date.now();
var fname = process.argv[2];
console.log(fname);
var fs = require("fs"),
  path = require("path"),
  ß;
filePath = path.join(__dirname, fname);

let input = fs.readFileSync(filePath).toString();
let [goals, vals] = parseInput(input);

// start part 1
let sum = 0;
for (let i = 0; i < goals.length; i++) {
  if (works(goals[i], vals[i], 1, vals[i][0], false)) sum += goals[i];
}
console.log(sum); // part 1
console.log("Part 1 in " + (Date.now() - startTime) + " ms");

// start part 2
sum = 0;
for (let i = 0; i < goals.length; i++) {
  if (works(goals[i], vals[i], 1, vals[i][0], true)) sum += goals[i];
}
console.log(sum); // part 2
console.log("Both parts in " + (Date.now() - startTime) + " ms");

/**
 * Recursively checks if a working solution can be found
 * @param {Number} goal The desired value
 * @param {Number[]} vals The values
 * @param {Number} i The index of the next thing to process
 * @param {Number} current Accumulated value
 * @param {boolean} allowCat whether to allow concatenation
 * @returns
 */
function works(goal, vals, i, current, allowCat) {
  let thisVal = vals[i];

  if (i == vals.length - 1) {
    let b = current + thisVal == goal || current * thisVal == goal;
    if (b || !allowCat) return b;
    return concat(current, thisVal) == goal || concat(current, thisVal) == goal;
  }
  let b =
    works(goal, vals, i + 1, current + thisVal, allowCat) ||
    works(goal, vals, i + 1, current * thisVal, allowCat);
  if (b || !allowCat) return b;
  return works(goal, vals, i + 1, concat(current, thisVal), allowCat);
}

function concat(a, b) {
  let digits = Math.floor(Math.log10(b)) + 1;
  return a * Math.pow(10,digits) + b;
}

function parseInput(input) {
  let goals = [];
  let vals = [];
  input.split("\n").map((e) => {
    let [first, second] = e.split(":");
    goals.push(Number(first));
    vals.push(second.trim().split(" ").map(Number));
  });
  return [goals, vals];
}
