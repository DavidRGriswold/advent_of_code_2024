var fname = process.argv[2];
console.log(fname);
var fs = require('fs'),
    path = require('path'),
    filePath = path.join(__dirname, fname);

let lines = fs.readFileSync(filePath).toString().split("\n");
lines = lines.map((e)=>e.split(/\W+/).map(Number));

console.log(lines.map(safe).filter((e)=>e).length);
console.log(lines.map(pdSafe).filter((e)=>e).length);

/** @param {Array<Number>} row */
function safe(row) {
    let dir = Math.sign(row[1]-row[0]);
    for (let i = 0; i < row.length-1; i++) {
        let diff = dir * (row[i+1] - row[i])
        if (diff < 1 || diff > 3) return false;
    }
    return true;
}

/** @param {Array<Number>} row */
function pdSafe(row) {
    if (safe(row)) return true;
    for (let i = 0; i < row.length; i++) {
        if (safe(row.toSpliced(i,1))) return true;
    }
    return false;
}