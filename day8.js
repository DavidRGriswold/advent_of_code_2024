let startTime = Date.now();
var fname = process.argv[2];
console.log(fname);
var fs = require("fs"),
  path = require("path"),
  ß;
filePath = path.join(__dirname, fname);

let input = fs.readFileSync(filePath).toString();
let chars = input.split("\n").map((e) => e.split(""));
let [w, h] = [chars[0].length, chars.length];

// We will store coordinates as [x,y] rather than [r,c] for my brain
/** @type {Object.<string,number[]} */
let antennaCoords = {};
for (let y = 0; y < h; y++) {
  for (let x = 0; x < w; x++) {
    let c = chars[y][x];
    if (c != ".") {
      if (antennaCoords[c]) antennaCoords[c].push([x, y]);
      else antennaCoords[c] = [[x, y]];
    }
  }
}
/** @type {Object.<string,number[]} */
let antinodes = {};
/** @type {string[]} Use string versions to make .includes work*/
let uniqueNodes = [];
for (let [c, v] of Object.entries(antennaCoords)) {
  for (let i = 0; i < v.length - 1; i++) {
    for (let j = i + 1; j < v.length; j++) {
      let [xd, yd] = [v[j][0] - v[i][0], v[j][1] - v[i][1]];
      let an1 = [v[i][0] - xd, v[i][1] - yd];
      let an2 = [v[j][0] + xd, v[j][1] + yd];
      if (an1[0] >= 0 && an1[0] < w && an1[1] >= 0 && an1[1] < h) {
        if (antinodes[c]) antinodes[c].push(an1);
        else antinodes[c] = [an1];
        if (!uniqueNodes.includes(JSON.stringify(an1)))
          uniqueNodes.push(JSON.stringify(an1));
      }
      if (an2[0] >= 0 && an2[0] < w && an2[1] >= 0 && an2[1] < h) {
        if (antinodes[c]) antinodes[c].push(an2);
        else antinodes[c] = [an2];
        if (!uniqueNodes.includes(JSON.stringify(an2)))
          uniqueNodes.push(JSON.stringify(an2));
      }
    }
  }
}
console.log(uniqueNodes.length); // part 1
// same idea, but loop the antenna movement rather than 
// simply counting once
for (let [c, v] of Object.entries(antennaCoords)) {
  for (let i = 0; i < v.length - 1; i++) {
    for (let j = i + 1; j < v.length; j++) {
      let [an1, an2] = [v[i], v[j]];
      let [xd, yd] = [an2[0] - an1[0], an2[1] - an1[1]];
      let aOff=false,bOff=false
      while (!aOff || !bOff) {
        if (an1[0] >= 0 && an1[0] < w && an1[1] >= 0 && an1[1] < h) {
          if (antinodes[c]) antinodes[c].push(an1);
          else antinodes[c] = [an1];
          if (!uniqueNodes.includes(JSON.stringify(an1)))
            uniqueNodes.push(JSON.stringify(an1));
        }else aOff=true;
        if (an2[0] >= 0 && an2[0] < w && an2[1] >= 0 && an2[1] < h) {
          if (antinodes[c]) antinodes[c].push(an2);
          else antinodes[c] = [an2];
          if (!uniqueNodes.includes(JSON.stringify(an2)))
            uniqueNodes.push(JSON.stringify(an2));
        }else bOff=true;
        an1 = [an1[0] - xd, an1[1] - yd];
        an2 = [an2[0] + xd, an2[1] + yd];
      }
    }
  }
}
console.log(uniqueNodes.length); // part 2
