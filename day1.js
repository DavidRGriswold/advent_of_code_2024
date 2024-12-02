var fname = process.argv[2];
console.log(fname);
var fs = require('fs'),
    path = require('path'),
    filePath = path.join(__dirname, fname);

let lines = fs.readFileSync(filePath).toString().split("\n");
let l1 = [], l2 = [];
for (let line of lines) {
    let t = line.split(/\W+/);
    l1.push(Number(t[0]));
    l2.push(Number(t[1]));
}
l1.sort();
l2.sort();
let diffs = [];
let sum = 0;
for (let i  = 0 ; i < l1.length; i++) {
    diffs.push(Math.abs(l1[i]-l2[i]));
    sum+= diffs[i];
}
console.log(sum);
let sim = 0;
for (let num of l1) {
    sim += num * l2.filter((e)=>(e===num)).length;
}
console.log(sim);

