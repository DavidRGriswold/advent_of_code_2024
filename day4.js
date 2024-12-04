var fname = process.argv[2];
console.log(fname);
var fs = require("fs"),
  path = require("path"),
  filePath = path.join(__dirname, fname);

let input = fs.readFileSync(filePath).toString();
let lines = input.split("\n");
let chars = lines.map((l) => l.split(""));
let horizCount = 0;
for (let j = 0; j < lines[0].length - 3; j++) {
  for (let i = 0; i < lines.length; i++) {
    let h = chars[i][j] + chars[i][j + 1] + chars[i][j + 2] + chars[i][j + 3];
    if (h == "XMAS" || h == "SAMX") horizCount++;
  }
}
let vertCount = 0;
for (let j = 0; j < lines[0].length; j++) {
  for (let i = 0; i < lines.length - 3; i++) {
    let v = chars[i][j] + chars[i + 1][j] + chars[i + 2][j] + chars[i + 3][j];
    if (v == "XMAS" || v == "SAMX") vertCount++;
  }
}
let diagCount = 0;
for (let i = 0; i < lines.length - 3; i++) {
  for (let j = 0; j < lines[0].length - 3; j++) {
    let d1 =
      chars[i][j] +
      chars[i + 1][j + 1] +
      chars[i + 2][j + 2] +
      chars[i + 3][j + 3];
    if (d1 == "XMAS" || d1 == "SAMX") diagCount++;
  }
  for (let j = 3; j < lines[0].length; j++) {
    let d2 =
      chars[i][j] +
      chars[i + 1][j - 1] +
      chars[i + 2][j - 2] +
      chars[i + 3][j - 3];
    if (d2 == "XMAS" || d2 == "SAMX") diagCount++;
  }
}

console.log(horizCount + vertCount + diagCount); // part 1 answer
let count = 0;
for (let i = 1; i < chars.length - 1; i++) {
  for (let j = 1; j < chars.length - 1; j++) {
    let s1 = chars[i - 1][j - 1] + chars[i][j] + chars[i + 1][j + 1];
    let s2 = chars[i - 1][j + 1] + chars[i][j] + chars[i + 1][j - 1];
    if ((s1 == "MAS" || s1 == "SAM") && (s2 == "MAS" || s2 == "SAM")) {
      count++;
    }
  }
}
console.log(count);
