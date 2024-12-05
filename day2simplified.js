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

let part1Count = 0;
let part2Count = 0;
for (let line of lines) {
    let splitLine = line.split(" ");
    //convert from strings to numbers
    for (let i = 0; i < splitLine.length; i++) {
        splitLine[i] = Number(splitLine[i]);
    }
    // the safe and pdSafe methods tell you if a line is safe
    // by the rules of part1 and part 2
    if (safe(splitLine)) part1Count++;
    if (pdSafe(splitLine)) part2Count++;

}
// output the results
 console.log(part1Count);
 console.log(part2Count);

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
        // toSpliced used this way makes a copy with an element removed
        if (safe(row.toSpliced(i,1))) return true;
    }
    return false;
}