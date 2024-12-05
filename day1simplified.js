/* To run this code, you need to have node.js installed on your computer.
 * You can then run the command `node day1.js data1.txt` to run your code on
 * input stored inside a file called data1.txt
 */

/* These first lines simply read the input into a single string called input */
var fname = process.argv[2];
console.log("Running with input data " + fname);
var fs = require('fs'),
    path = require('path'),
    filePath = path.join(__dirname, fname);

let input = fs.readFileSync(filePath).toString();

// split input into an array of strings, on per line
let lines = input.split("\n");

// create two empty lists
let l1 = [], l2 = [];

// iterate through each line
for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    // split the line by spaces, so t is an array of strings that
    // hold numeric values like ["2", "11"]
    let t = line.split(/\W+/);
    // convert the strings to numbers and add them to the lists
    l1[i] = Number(t[0]);
    l2[i] = Number(t[1]);
}

// sort the lists
l1.sort();
l2.sort();

// keep track of the sum of the differences
let sum = 0;
for (let i  = 0 ; i < l1.length; i++) {
    // push the difference into an array called diffs
    let diff = Math.abs(l1[i] - l2[i]);
    sum += diff;
}

// answer to part 1
console.log(sum);

// start part 2 now

let simValue = 0;
// this For Each loop lets us iterate through l1 without needing an index
for (let num of l1) {
    //count how many elements in l2 == num
    let count = 0;
    for (let i = 0; i < l2.length; i++) {
        if (l2[i] == num) {
            count++;
        }
    }
    simValue += num * count;
}

//answer to part 2
console.log(simValue);