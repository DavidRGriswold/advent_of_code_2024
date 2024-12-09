let startTime = Date.now();
var fname = process.argv[2];
console.log(fname);
var fs = require("fs"),
  path = require("path");
filePath = path.join(__dirname, fname);

let input = fs.readFileSync(filePath).toString();
let inputNums = input.split("").map(Number);

// for part 1 just use the actual file
let file = [];

// a file object looks like {id: id, len: length, i: start index}
let files = [];

// a space object should look like this: {i:index, len: length}
let spaces = [];

// create the file structures. Should probably have made this a function, oh well.
for (let i = 0; i < inputNums.length; i += 2) {
  let fileNum = i / 2;
  files.push({ id: fileNum, len: inputNums[i], i: file.length });
  file.push(...new Array(inputNums[i]).fill(fileNum));
  if (i + 1 >= inputNums.length) continue;
  spaces.push({ i: file.length, len: inputNums[i + 1] });
  file.push(...new Array(inputNums[i + 1]).fill(-1));
}

trimEnding(file);

compressPart1(file);
console.log(cs1(file));

compressPart2(files, spaces);
console.log(cs2(files));

/**
 * Remove any spaces (-1) at the end of the file o
 * @param {number[]} file
 */
function trimEnding(file) {
  let i = file.length - 1;
  while (file[i] === -1) i--;
  file.splice(i + 1);
}
/**
 * Compresses for part 1 by iterating through spaces
 * which are stored as -1 in the file object
 * @param {number[]} file
 */
function compressPart1(file) {
  let front = 0;
  let back = file.length - 1;
  while (front < back && front < file.length - 1) {
    if (file[front] == -1) {
      file[front] = file[back];
      file[back] = -1;
    }
    front++;
    while (file[back] == -1) back--;
  }
  trimEnding(file);
}

/**
 * Returns the checksum for part 1 based on file object
 * @param {number[]} file
 */
function cs1(file) {
  let sum = 0;
  for (let i = 0; i < file.length; i++) {
    if (file[i] != -1) sum += i * file[i];
  }
  return sum;
}

/**
 * Compresses for part 2 using the files and spaces objects
 * @param {{id:number,len:number,i:number}[]} files
 * @param {{len:number,i:number}} spaces
 */
function compressPart2(files, spaces) {
  for (let id = files.length - 1; id >= 0; id--) {
    let size = files[id].len;
    //find the first empty spot big enough for it
    for (let si = 0; si < spaces.length; si++) {
      if (spaces[si].len >= size && spaces[si].i < files[id].i) {
        // move it!
        files[id].i = spaces[si].i;
        spaces[si].len -= size;
        spaces[si].i += size;
        break;
      }
    }
  }
}
/**
 * Checksum for part 2
 * @param {{id:number,len:number,i:number}[]} files 
 * @returns sum
 */
function cs2(files) {
  let sum = 0;
  for (let file of files) {
    for (let i = file.i; i < file.i + file.len; i++) {
      sum += i * file.id;
    }
  }
  return sum;
}
