var fname = process.argv[2];
console.log(fname);
var fs = require("fs"),
  path = require("path"),
  ß;
filePath = path.join(__dirname, fname);

let input = fs.readFileSync(filePath).toString();
let [goals, vals] = parseInput(input);

let sum = 0;
for (let i = 0; i < goals.length; i++) {
  if (works(goals[i], vals[i], 1, vals[i][0], false)) sum += goals[i];
}
console.log(sum); // part 1

sum = 0;
for (let i = 0; i < goals.length; i++) {
  if (works(goals[i], vals[i], 1, vals[i][0], true)) sum += goals[i];
}
console.log(sum); // part 2

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
    return (
      Number(current + "" + thisVal) == goal ||
      Number(current + "" + thisVal) == goal
    );
  }
  let b =
    works(goal, vals, i + 1, current + thisVal, allowCat) ||
    works(goal, vals, i + 1, current * thisVal, allowCat);
  if (b || !allowCat) return b;
  return works(goal, vals, i + 1, Number(current + "" + thisVal), allowCat);
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
