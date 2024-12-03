var fname = process.argv[2];
console.log(fname);
var fs = require("fs"),
  path = require("path"),
  filePath = path.join(__dirname, fname);

let lines = fs.readFileSync(filePath).toString();
let r = /mul\((\d+),(\d+)\)/g;

let all = lines.matchAll(r);
let sum = 0;
for (let match of all) {
  sum += Number(match[1]) * Number(match[2]);
}
console.log(sum);

r = /do\(\)|don't\(\)|mul\((\d+),(\d+)\)/g;
all = lines.matchAll(r);
sum = 0;
let enabled = true;

for (let match of all) {
  console.log(match[0]);
  if (match[0] == "do()") enabled = true;
  else if (match[0] == "don't()") enabled = false;
  else if (enabled) sum += Number(match[1]) * Number(match[2]);
}
console.log(sum);
