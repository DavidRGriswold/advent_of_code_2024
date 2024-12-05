/* To run this code, you need to have nodejs installed on your computer.
 * You can then run the command `node day2.js data2.txt` to run your code on
 * input stored inside a file called data2.txt
 */

/* These first 7 lines simply read the input into a single string called input */

var fname = process.argv[2];
console.log(fname);
var fs = require('fs'),
    path = require('path'),
    filePath = path.join(__dirname, fname);

let input = fs.readFileSync(filePath).toString();
let lines = input.split("\n");

// converst line from an array of strings to an array of numeric arrays, using 
// the split and map functions
lines = lines.map((e)=>e.split(/\W+/).map(Number));

// lines.map(safe) creates an array of true/false based on whether each line is safe
// then .filter ((e)=>e) removes the false statements
// then .length tells us how many trues. So these two lines are the answers to
// parts 1 and 2

console.log(lines.map(safe).filter((e)=>e).length);
console.log(lines.map(pdSafe).filter((e)=>e).length);

/**  Returns true if a line is safe by part 1 definition
 * @param {Array<Number>} row */
function safe(row) {
    let dir = Math.sign(row[1]-row[0]);
    for (let i = 0; i < row.length-1; i++) {
        let diff = dir * (row[i+1] - row[i])
        if (diff < 1 || diff > 3) return false;
    }
    return true;
}

/** Returns true if a line is safe by part 2 definition 
 * @param {Array<Number>} row */
function pdSafe(row) {
    if (safe(row)) return true;
    for (let i = 0; i < row.length; i++) {
        if (safe(row.toSpliced(i,1))) return true;
    }
    return false;
}