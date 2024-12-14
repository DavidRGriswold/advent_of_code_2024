let startTime = Date.now();
var fname = "inputs/" + process.argv[2];
console.log(fname);
var fs = require("fs"),
  path = require("path");
const { receiveMessageOnPort } = require("worker_threads");
filePath = path.join(__dirname, fname);

let input = fs.readFileSync(filePath).toString();
let machines = parseInput();

console.log(countTokens(0));
console.log(countTokens(10000000000000));

/* This is the algebra to find the solution for a machine 
Axk + Bxj = Px
Ayk + Byj = Py
---------------
(Px-Bxj)/Ax = k = (Py-Byj)/Ay  :: isolate k in both eqs then combine
Px/Ax - (Bx/Ax)j = Py/Ay - (By/Ay)j :: distribute
Px/Ax - Py/Ay = (Bx/Ax - By/Ay)j :: combine like terms 
j = (Px/Ax - Py/Ay)/(Bx/Ax - By/Ay) :: divide
j = (PxAy/AxAy - PyAx/AxAy)/(BxAy/AxAy - AxBy/AxAy) ::common denoms
j = (PxAy-PyAx)/(AyBx-AxBy) ::combine and divide - the AxAy cancels

Test: (8400*34 - 5400*94)/(34*22 - 94*67) = 40, yay
k = (Px - Bxj)/Ay and we are done
*/


/**
 * Calculates the tokens, first adding a specified amount to each prize
 * @param {number} add amount to add to prize
 * @return {number} tokens
 */
function countTokens(add) {
  let tokens = 0;
  for (let m of machines) {
    m.Px += add;
    m.Py += add;
    let bcount = (m.Px * m.Ay - m.Py * m.Ax) / (m.Ay * m.Bx - m.Ax * m.By);
    if (Number.isInteger(bcount)) {
      let acount = (m.Py - m.By * bcount) / m.Ay;
      if (Number.isInteger(acount)) {
        tokens += acount * 3 + bcount;
      }
    }
  }
  return tokens;
}
/**
 * Parses the input and returns as an array of machine objects
 * @returns {{Ax:number, Ay:number, Bx:number, By:number,Px: number, Py:number}[]} machines
 */
function parseInput() {
  let lines = input.split("\n");
  let machines = [];
  for (let i = 0; i < lines.length; i += 4) {
    let r1 = /(\d+)/g;
    let mx = [...lines[i].matchAll(r1)];
    let my = [...lines[i + 1].matchAll(r1)];
    let mp = [...lines[i + 2].matchAll(r1)];
    machines.push({
      Ax: Number(mx[0][0]),
      Ay: Number(mx[1][0]),
      Bx: Number(my[0][0]),
      By: Number(my[1][0]),
      Px: Number(mp[0][0]),
      Py: Number(mp[1][0]),
    });
  }
  return machines;
}
