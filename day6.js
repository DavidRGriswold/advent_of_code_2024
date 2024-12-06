var fname = process.argv[2];
console.log(fname);
var fs = require("fs"),
  path = require("path"),
  filePath = path.join(__dirname, fname);

let input = fs.readFileSync(filePath).toString();

// create 2d character array
let chars = input.split("\n").map((e) => e.split(""));

let original = structuredClone(chars);
console.log(countOrLoop(chars)); // part 1

let loopCount = 0;
for (let r = 0; r < original.length; r++) {
  for (let c = 0; c < original.length; c++) {
    if (original[r][c] == ".") {
      // try the new one
      let newChars = structuredClone(original);
      newChars[r][c] = "#";
      let count = countOrLoop(newChars);
      if (count === -1) {
        loopCount++;
      }
    }
  }
}
console.log(loopCount); // part 2

function countOrLoop(chars) {
  //find guard
  let position;
  let direction;
  let guardchar;
  let directions = {
    "^": [-1, 0],
    v: [1, 0],
    ">": [0, 1],
    "<": [0, -1],
  };
  for (let r = 0; r < chars.length; r++) {
    for (let c = 0; c < chars[r].length; c++) {
      if (chars[r][c] == "." || chars[r][c] == "#") continue;
      else if (directions[chars[r][c]]) {
        guardchar = chars[r][c];
        position = [r, c];
        direction = directions[guardchar];
      }
    }
  }

  let count = 1;
  while (true) {
    let next = [position[0] + direction[0], position[1] + direction[1]];
    if (
      next[0] < 0 ||
      next[0] >= chars[0].length ||
      next[1] < 0 ||
      next[1] >= chars.length
    ) {
      break;
    } else if (chars[next[0]][next[1]] === ".") {
      count++;
      chars[next[0]][next[1]] = guardchar;
      position = next;
    } else if (chars[next[0]][next[1]] === guardchar) {
      //loop!
      count = -1;
      break;
    } else if (directions[chars[next[0]][next[1]]]) {
      position = next;
    } else {
      if (guardchar == "^") guardchar = ">";
      else if (guardchar == ">") guardchar = "v";
      else if (guardchar == "v") guardchar = "<";
      else guardchar = "^";
      direction = directions[guardchar];
    }
  }
  return count;
}
