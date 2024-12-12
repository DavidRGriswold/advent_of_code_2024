let startTime = Date.now();
var fname = "inputs/" + process.argv[2];
console.log(fname);
var fs = require("fs"),
  path = require("path");
const { receiveMessageOnPort } = require("worker_threads");
filePath = path.join(__dirname, fname);

let input = fs.readFileSync(filePath).toString();
let chars = input.split("\n").map((e) => e.split(""));
console.log(chars);
/**
 * Stores objects defining the regions
 * Sides is a list of lists of points - minimum two - that define the sides
 * @type {{positions: string[], area:number,sides:number,perimeter:number, hborders:string[],vborders:string[]}
 */
let regions = [];

/**
 * Stores which region each plot belongs to, -1 means not assigned
 * @type {number[][]}
 */
let plotAssignments = new Array(chars.length)
  .fill(0)
  .map((e) => new Array(chars[0].length).fill(-1));

//iterate through the plotAssignments, assigning as we go
for (let i = 0; i < plotAssignments.length; i++) {
  for (let j = 0; j < plotAssignments.length; j++) {
    if (plotAssignments[i][j] == -1) {
      assignPlots(i, j, regions.length);
    }
  }
}
let sum = 0;
let sides = 0;
for (let ass of regions) {
  sum += ass.perimeter * ass.area;
}

//counting sides oh noooooo

//count hborders first
for (let r of regions) {
  for (let i = 0; i <= chars.length; i++) {
    for (let j = 0; j < chars.length; j++)
      if (r.hborders.includes(JSON.stringify([i, j]))) {
        r.sides++;
        //now remove all the other ones that are in the same side
        r.hborders.splice(r.hborders.indexOf(JSON.stringify([i, j])), 1);
        let start = j + 1;
        while (r.hborders.includes(JSON.stringify([i, start]))) {
          if (
            (i < chars[0].length && start > 0 && chars[i][start] == chars[i][start - 1]) ||
            (start > 0 &&
              i > 0 &&
              chars[i - 1][start] == chars[i - 1][start - 1])
          ) {
            r.hborders.splice(
              r.hborders.indexOf(JSON.stringify([i, start])),
              1
            );
            start++;
          } else break;
        }
      }
  }
  for (let i = 0; i < chars.length; i++) {
    for (let j = 0; j <= chars.length; j++)
      if (r.vborders.includes(JSON.stringify([i, j]))) {
        r.sides++;
        //now remove all the other ones that are in the same side
        r.vborders.splice(r.vborders.indexOf(JSON.stringify([i, j])), 1);
        let start = i + 1;
        while (r.vborders.includes(JSON.stringify([start, j]))) {
          if (
            (j < chars.length && start > 0 && chars[start][j] == chars[start - 1][j]) ||
            (start > 0 &&
              j > 0 &&
              chars[start][j - 1] == chars[start - 1][j - 1])
          ) {
            r.vborders.splice(
              r.vborders.indexOf(JSON.stringify([start, j])),
              1
            );
            start++;
          }else break;
        }
      }
  }
}

let sum2 = 0;
for (let ass of regions) {
  sum2 += ass.sides * ass.area;
}
console.log(sum);
console.log(sum2);

/**
 * Recursively assigns plots starting at position i,j
 * @param {number} i row
 * @param {number} j col
 * @param {number} p plot
 */
function assignPlots(i, j, p) {
  if (plotAssignments[i][j] != -1) return;
  // assign this plot
  let pstr = JSON.stringify([i, j]);

  plotAssignments[i][j] = p;
  if (!regions[p])
    regions[p] = {
      positions: [pstr],
      area: 1,
      sides: 0,
      perimeter: 4,
      hborders: [JSON.stringify([i, j]), JSON.stringify([i + 1, j])],
      vborders: [JSON.stringify([i, j]), JSON.stringify([i, j + 1])],
    };
  else {
    if (regions[p].positions.includes(pstr)) return;
    regions[p].positions.push(pstr);
    regions[p].area++;
    if (!regions[p].hborders.includes(JSON.stringify([i, j]))) {
      regions[p].hborders.push(JSON.stringify([i, j]));
      regions[p].perimeter++;
    }
    if (!regions[p].hborders.includes(JSON.stringify([i + 1, j]))) {
      regions[p].hborders.push(JSON.stringify([i + 1, j]));
      regions[p].perimeter++;
    }
    if (!regions[p].vborders.includes(JSON.stringify([i, j]))) {
      regions[p].vborders.push(JSON.stringify([i, j]));
      regions[p].perimeter++;
    }
    if (!regions[p].vborders.includes(JSON.stringify([i, j + 1]))) {
      regions[p].vborders.push(JSON.stringify([i, j + 1]));
      regions[p].perimeter++;
    }
  }
  //look above
  if (i > 0 && chars[i - 1][j] == chars[i][j]) {
    if (regions[p].hborders.includes(JSON.stringify([i, j]))) {
      regions[p].perimeter--;
      regions[p].hborders.splice(
        regions[p].hborders.indexOf(JSON.stringify([i, j])),
        1
      );
    }
    assignPlots(i - 1, j, p);
  }
  if (j > 0 && chars[i][j - 1] == chars[i][j]) {
    if (regions[p].vborders.includes(JSON.stringify([i, j]))) {
      regions[p].perimeter--;
      regions[p].vborders.splice(
        regions[p].vborders.indexOf(JSON.stringify([i, j])),
        1
      );
    }

    assignPlots(i, j - 1, p);
  }
  if (j < plotAssignments[0].length - 1 && chars[i][j + 1] == chars[i][j]) {
    if (regions[p].vborders.includes(JSON.stringify([i, j + 1]))) {
      regions[p].perimeter--;
      regions[p].vborders.splice(
        regions[p].vborders.indexOf(JSON.stringify([i, j + 1])),
        1
      );
    }
    assignPlots(i, j + 1, p);
  }
  if (i < plotAssignments.length - 1 && chars[i + 1][j] == chars[i][j]) {
    if (regions[p].hborders.includes(JSON.stringify([i + 1, j]))) {
      regions[p].perimeter--;
      regions[p].hborders.splice(
        regions[p].hborders.indexOf(JSON.stringify([i + 1, j])),
        1
      );
    }
    assignPlots(i + 1, j, p);
  }
}
