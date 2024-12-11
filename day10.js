let startTime = Date.now();
var fname = process.argv[2];
console.log(fname);
var fs = require("fs"),
  path = require("path");
filePath = path.join(__dirname, fname);

let input = fs.readFileSync(filePath).toString();
let numMap = input.split("\n").map((e)=>e.split("").map(Number));

let sum = 0;
let sum2 = 0;
for (let i =0; i < numMap.length; i++) {
    for (let j = 0; j < numMap[i].length; j++) {
        if (numMap[i][j]==0) {
            let nines = listOfNines(i,j);
            let uniq = [...new Set(nines)];
            sum+=uniq.length;
            let paths = listOfPaths(i,j);
            sum2 += paths.length;
        }
    }
}
console.log(sum);
console.log(sum2);

function listOfNines(i,j) {
    let val = numMap[i][j];
    let [r,c] = [numMap.length, numMap[i].length];
  
    if (numMap[i][j]==9) return [JSON.stringify([i,j])];
    let nines = [];
    let count = 0;
    if (i > 0 && numMap[i-1][j] == val + 1) nines = nines.concat(listOfNines(i-1,j));
    if (i < r-1 && numMap[i+1][j] == val + 1) nines = nines.concat(listOfNines(i+1,j));
    if (j > 0 && numMap[i][j-1] == val + 1) nines = nines.concat(listOfNines(i,j-1));
    if (j < c-1 && numMap[i][j+1] == val + 1) nines = nines.concat(listOfNines(i,j+1));
    return nines;
}

function listOfPaths(i,j) {
    let val = numMap[i][j];
    let [r,c] = [numMap.length, numMap[i].length];
    let thisNode = [[JSON.stringify([i,j])]];
    if (numMap[i][j]==9) return thisNode;
    let count = 0;
    //this is an array of arrays, each array representing a path to a 9
    let pathsFromHere = [];
    if (i > 0 && numMap[i-1][j] == val + 1) {
        let paths = listOfPaths(i-1,j); // example [["[0,1]","[1,1]"],["[0,1]","[0,2]"]
        paths.forEach((e)=>e.splice(0,0,JSON.stringify([i,j])));
        pathsFromHere.push(...paths);
    }
    if (i < r-1 && numMap[i+1][j] == val + 1) {
        let paths = listOfPaths(i+1,j); // example [["[0,1]","[1,1]"],["[0,1]","[0,2]"]
        paths.forEach((e)=>e.splice(0,0,JSON.stringify([i,j])));
        pathsFromHere.push(...paths);
    }
    if (j > 0 && numMap[i][j-1] == val + 1) {
        let paths = listOfPaths(i,j-1); // example [["[0,1]","[1,1]"],["[0,1]","[0,2]"]
        paths.forEach((e)=>e.splice(0,0,JSON.stringify([i,j])));
        pathsFromHere.push(...paths);
    }
    if (j < c-1 && numMap[i][j+1] == val + 1) {
        let paths = listOfPaths(i,j+1); // example [["[0,1]","[1,1]"],["[0,1]","[0,2]"]
        paths.forEach((e)=>e.splice(0,0,JSON.stringify([i,j])));
        pathsFromHere.push(...paths);
    }
    return pathsFromHere;
}