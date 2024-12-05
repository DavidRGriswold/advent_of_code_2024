var fname = process.argv[2];
console.log(fname);
var fs = require("fs"),
  path = require("path"),
  filePath = path.join(__dirname, fname);

let input = fs.readFileSync(filePath).toString();
let [ruleStrings, updates] = input.split("\n\n");
let rules = {}
// Build a rule object where the first page is the key, value is an array
// of required followup objects
for (let e of ruleStrings.split("\n").map((e)=>e.split("|").map(Number))) {
    if (rules[e[0]]) rules[e[0]].push(e[1]);
    else rules[e[0]] = [e[1]];
}

//updates to numbers
updates = updates.split("\n").map((e)=>e.split(",").map(Number));
let correctUpdates = [];
let incorrectUpdates = []
// split into correct and incorrect
for (let u of updates) {
    if (isCorrect(u)) correctUpdates.push(u.slice());
    else incorrectUpdates.push(u.slice());
}

// part 1
console.log(midSum(correctUpdates));

//part 2
incorrectUpdates.forEach((e)=>e.sort(orderFunction));
console.log(midSum(incorrectUpdates));

function isCorrect(update) {
    for (let i = update.length-1; i > 0; i--) {
        if (rules[update[i]]) {
            for (let j = i -1; j >=0; j--) {
                if (rules[update[i]].includes(update[j])) return false;
            }
        }
    }
    return true;
}

function midSum(updates) {
    let sum = 0;
    for (let u of updates) {
        sum += u[(u.length-1)/2];
    }
    return sum;
}

function orderFunction(v1, v2) {
    if (rules[v1] && rules[v1].includes(v2)) return -1;
    if (rules[v2] && rules[v2].includes(v1)) return 1;
    return 0;
}
