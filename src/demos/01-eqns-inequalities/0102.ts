import { getRandomInt, Vector } from 'math-edu';
//import { performance } from 'perf_hooks';

//import { ExpFn, PowerFn, bisection, simpsons, integrateByParts, encode, decode, getRandomInt, Expression } from 'math-edu-plus';

/**
 * generate qn1002: equations and inequalities
 * @param options `{qnCode: string}
 */
function qn0102(options?: { qnCode?: string; position?: number }): qnOutput {
  // options
  const defaultOptions = {
    qnCode: '',
    position: getRandomInt(0, 3),
  };
  const optionsObject = { ...defaultOptions, ...options };

  // generate variables
  let questions: QnContainer, answers: AnswerContainer, variables: VariablesObject;
  if (optionsObject.qnCode) {
    // qnCode provided
    const numbers = decode(optionsObject.qnCode.substring(1));
    variables = {
      ax: numbers[0],
      ay: numbers[1],
      az: numbers[2],
      bx: numbers[3],
      by: numbers[4],
      bz: numbers[5],
      cx: numbers[6],
      cy: numbers[7],
      cz: numbers[8],
      dx: numbers[9],
      dy: numbers[10],
      dz: numbers[11],
      x: numbers[12],
      y: numbers[13],
      z: numbers[14],
      position: Number(optionsObject.qnCode[0]),
    };
    [variables, questions, answers] = variablesToQn(variables);
  } else {
    //const t1 = performance.now();
    variables = generateVariables(optionsObject.position);
    //const t2 = performance.now();
    //console.log(t2 - t1);
    // generate qn type
    [variables, questions, answers] = variablesToQn(variables);
  }
  const variablesArray = [
    variables.ax,
    variables.ay,
    variables.az,
    variables.bx,
    variables.by,
    variables.bz,
    variables.cx,
    variables.cy,
    variables.cz,
    variables.dx,
    variables.dy,
    variables.dz,
    variables.x,
    variables.y,
    variables.z,
  ];
  return {
    variables: variables,
    qnCode: encode(variables.position, ...variablesArray),
    questions: questions,
    answers: answers,
  };
}

interface VariablesObject {
  ax: number;
  ay: number;
  az: number;
  bx: number;
  by: number;
  bz: number;
  cx: number;
  cy: number;
  cz: number;
  dx: number;
  dy: number;
  dz: number;
  x: number;
  y: number;
  z: number;
  position: number;
}
interface qnOutput {
  variables: VariablesObject;
  qnCode: string;
  questions: QnContainer;
  answers: AnswerContainer;
}
interface QnContainer {
  ax: string;
  ay: string;
  az: string;
  bx: string;
  by: string;
  bz: string;
  cx: string;
  cy: string;
  cz: string;
  dx: string;
  dy: string;
  dz: string;
  ta: string;
  tb: string;
  tc: string;
  td: string;
}
interface AnswerContainer {
  ansX: string;
  ansY: string;
  ansZ: string;
  ansFinal: string;
}

function variablesToQn(variables: VariablesObject): [VariablesObject, QnContainer, AnswerContainer] {
  let ax: string | number, ay: string | number, az: string | number;
  let bx: string | number, by: string | number, bz: string | number;
  let cx: string | number, cy: string | number, cz: string | number;
  let dx: string | number, dy: string | number, dz: string | number;
  ({ ax, ay, az, bx, by, bz, cx, cy, cz, dx, dy, dz } = variables);
  const { x, y, z, position } = variables;
  const ta = ((ax * x + ay * y + az * z) / 10000).toFixed(2);
  const tb = ((bx * x + by * y + bz * z) / 10000).toFixed(2);
  const tc = ((cx * x + cy * y + cz * z) / 10000).toFixed(2);
  let td = ((dx * x + dy * y + dz * z) / 10000).toFixed(2);
  ax = (ax / 100).toFixed(2);
  ay = (ay / 100).toFixed(2);
  az = (az / 100).toFixed(2);
  bx = (bx / 100).toFixed(2);
  by = (by / 100).toFixed(2);
  bz = (bz / 100).toFixed(2);
  cx = (cx / 100).toFixed(2);
  cy = (cy / 100).toFixed(2);
  cz = (cz / 100).toFixed(2);
  dx = (dx / 100).toFixed(2);
  dy = (dy / 100).toFixed(2);
  dz = (dz / 100).toFixed(2);
  const dArray = [dx, dy, dz, td];
  dx = position === 0 ? '' : dx;
  dy = position === 1 ? '' : dy;
  dz = position === 2 ? '' : dz;
  td = position === 3 ? '' : td;

  // question
  const questions = { ax, ay, az, bx, by, bz, cx, cy, cz, dx, dy, dz, ta, tb, tc, td };

  // answer
  const answers = {
    ansX: (x / 100).toFixed(2),
    ansY: (y / 100).toFixed(2),
    ansZ: (z / 100).toFixed(2),
    ansFinal: dArray[position],
  };
  return [variables, questions, answers];
}

export { qn0102, encode };

// a: 0-4, b: 1-9, c: 0 or 5 representing the digits of the number 'a.bc';
function encodeOne(a: number, b: number, c: number): string {
  b = b - 1;
  c = c / 5;
  const numberCode = c + b * 2 + a * 18;
  return String.fromCharCode(35 + numberCode);
}
function encode(pos: number, ...args: number[]): string {
  let str = '';
  args.forEach((e) => {
    const a = Math.floor(e / 100);
    const b = Math.floor((e - a * 100) / 10);
    const c = e - a * 100 - b * 10;
    str += encodeOne(a, b, c);
  });
  return pos.toString() + str;
}
function numberFromRandom(x: number): number {
  const c = x % 2;
  const b = ((x % 18) - c) / 2;
  const a = (x - c - b * 2) / 18;
  return a * 100 + (b + 1) * 10 + c * 5;
}
function decodeOne(x: string): number {
  const num = x.charCodeAt(0) - 35;
  return numberFromRandom(num);
}
function decode(x: string): number[] {
  const numbers: number[] = [];
  for (const char of x) {
    numbers.push(decodeOne(char));
  }
  return numbers;
}

function generateVariables(position: number): VariablesObject {
  const ax = numberFromRandom(getRandomInt(1, 89)),
    ay = numberFromRandom(getRandomInt(1, 89)),
    az = numberFromRandom(getRandomInt(1, 89));
  const aVec = new Vector(ax, ay, az);
  let bx = numberFromRandom(getRandomInt(1, 89)),
    by = numberFromRandom(getRandomInt(1, 89)),
    bz = numberFromRandom(getRandomInt(1, 89));
  let bVec = new Vector(bx, by, bz);
  while (
    aVec.isParallelTo(bVec) ||
    getRandomInt(0, 9) === 0 // to facilitate testing
  ) {
    bx = numberFromRandom(getRandomInt(1, 89));
    by = numberFromRandom(getRandomInt(1, 89));
    bz = numberFromRandom(getRandomInt(1, 89));
    bVec = new Vector(bx, by, bz);
  }
  const n = aVec.cross(bVec);
  let cx = numberFromRandom(getRandomInt(1, 89)),
    cy = numberFromRandom(getRandomInt(1, 89)),
    cz = numberFromRandom(getRandomInt(1, 89));
  let cVec = new Vector(cx, cy, cz);
  while (
    cVec.dot(n).isEqual(0) ||
    getRandomInt(0, 9) === 0 // to facilitate testing
  ) {
    cx = numberFromRandom(getRandomInt(1, 89));
    cy = numberFromRandom(getRandomInt(1, 89));
    cz = numberFromRandom(getRandomInt(1, 89));
    cVec = new Vector(cx, cy, cz);
  }
  let dx = numberFromRandom(getRandomInt(1, 89)),
    dy = numberFromRandom(getRandomInt(1, 89)),
    dz = numberFromRandom(getRandomInt(1, 89));
  let dVec = new Vector(dx, dy, dz);
  while (
    aVec.isParallelTo(dVec) ||
    bVec.isParallelTo(dVec) ||
    cVec.isParallelTo(dVec) ||
    getRandomInt(0, 9) === 0 // to facilitate testing
  ) {
    dx = numberFromRandom(getRandomInt(1, 89));
    dy = numberFromRandom(getRandomInt(1, 89));
    dz = numberFromRandom(getRandomInt(1, 89));
    dVec = new Vector(dx, dy, dz);
  }
  const x = numberFromRandom(getRandomInt(1, 89)),
    y = numberFromRandom(getRandomInt(1, 89)),
    z = numberFromRandom(getRandomInt(1, 89));
  const ta = ax * x + ay * y + az * z,
    tb = bx * x + by * y + bz * z,
    tc = cx * x + cy * y + cz * z,
    td = dx * x + dy * y + dz * z;

  if (ta % 100 !== 0 || tb % 100 !== 0 || tc % 100 !== 0 || td % 100 != 0) {
    return generateVariables(position);
  }
  return {
    ax,
    ay,
    az,
    bx,
    by,
    bz,
    cx,
    cy,
    cz,
    dx,
    dy,
    dz,
    x,
    y,
    z,
    position,
  };
}
