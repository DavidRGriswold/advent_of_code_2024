let startTime = Date.now();
var fname = "inputs/" + process.argv[2];
console.log(fname);
var fs = require("fs"),
  path = require("path");
filePath = path.join(__dirname, fname);

let input = fs.readFileSync(filePath).toString();
let nums = input.split(" ").map(Number);
//blink(nums,25);
let counts = {};
for (let n of nums) {
  if (counts[n]) counts[n]++;
  else counts[n] = 1;
}
console.log(blink(Object.assign({}, counts), 25));
console.log(blink(counts, 75));

function blink(counts, n) {
  let sum = 0;
  for (let i = 0; i < n; i++) {
    let newObj = {};
    sum = 0;
    for (let [k, v] of Object.entries(counts)) {
      k = Number(k);
      if (k == 0) {
        if (newObj[1]) newObj[1] += v;
        else newObj[1] = v;
        sum += v;
      } else if (k.toString().length % 2 == 0) {
        let [a, b] = [
          k.toString().substring(0, k.toString().length / 2),
          k.toString().substring(k.toString().length / 2),
        ].map(Number);
        if (newObj[a]) newObj[a] += v;
        else newObj[a] = v;
        if (newObj[b]) newObj[b] += v;
        else newObj[b] = v;
        sum += v * 2;
      } else {
        if (newObj[k * 2024]) newObj[k * 2024] += v;
        else newObj[k * 2024] = v;
        sum += v;
      }
    }
    counts = newObj;
  }
  return sum;
}
