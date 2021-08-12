import { encode, decode } from '../../fns/encode/encoders';
import { getRandomPerp } from '../../fns/random/generateSpecialVectors';


//import {
//  getRandomFrac, TODO: update
//  getRandomInt, 
//  Fraction, getRandomLinear
//} from 'math-edu';
import {
  getRandomInt, getRandomVec, getRandomFrac, Vector, Fraction, Line, Plane
} from
  'math-edu';
// '../../../../math-edu/src/index';

interface variablesObjectA {
  ax: number, ay: number, az: number,
  bx: number, by: number, bz: number,
  nx: number, ny: number, nz: number,
  lambdaNum: number, lambdaDen: number,
  type: number
}
interface variablesObjectB {
  bx: number, by: number, bz: number,
  dx: number, dy: number, dz: number,
  dx1: number, dy1: number, dz1: number,
  dx2: number, dy2: number, dz2: number,
  lambdaNum: number, lambdaDen: number,
  type: number
}

/**
 * generate qn1204: vectors 2
 * @param options `{type: 1|2, qnCode: string}
 */
function qn1204(options?: qnOptions): qnOutput {
  // options
  const defaultOptions = {
    type: 0,
    qnCode: ''
  }
  const optionsObject = { ...defaultOptions, ...options };
  // generate variables
  let type: number;
  let questions: string[], answers: string[], variables: variablesObjectA | variablesObjectB;
  let variablesArray: (number | string)[];
  if (optionsObject.qnCode) { // qnCode provided
    let restOfVariables: number[];
    [type, ...restOfVariables] = decode(optionsObject.qnCode) as [number, ...number[]];
    [variables, questions, answers] = variablesToQn(type, restOfVariables);
  } else {
    // generate qn type
    type = (optionsObject.type === 0) ? getRandomInt(1, 2) : optionsObject.type;
    if (type === 1) {
      [variables, questions, answers] = typeAGenerator();
    } else { // type === 2
      [variables, questions, answers] = typeBGenerator();
    }
  }
  // prepare variablesArray for encoding
  if (type === 1) {
    variables = variables as variablesObjectA;
    variablesArray = [variables.type,
      variables.ax, variables.ay, variables.az,
      variables.bx, variables.by, variables.bz,
      variables.nx, variables.ny, variables.nz,
      variables.lambdaNum, variables.lambdaDen
    ];
  } else { // type === 2
    variables = variables as variablesObjectB;
    variablesArray = [variables.type,
      variables.bx, variables.by, variables.bz,
      variables.dx, variables.dy, variables.dz,
      variables.dx1, variables.dy1, variables.dz1,
      variables.dx2, variables.dy2, variables.dz2,
      variables.lambdaNum, variables.lambdaDen
    ];
  }
  return {
    variables: variables,
    qnCode: encode(...variablesArray),
    questions: questions,
    answers: answers
  }
}

interface qnOptions {
  type?: number,
  qnCode?: string
}
interface qnOutput {
  variables: variablesObjectA | variablesObjectB,
  qnCode: string,
  questions: string[],
  answers: string[]
}


function variablesToQn(type: number, restOfVariables: number[]): [variablesObjectA | variablesObjectB, string[], string[]] {
  let variables: variablesObjectA | variablesObjectB;
  if (type === 1) {
    variables = {
      ax: restOfVariables[0],
      ay: restOfVariables[1],
      az: restOfVariables[2],
      bx: restOfVariables[3],
      by: restOfVariables[4],
      bz: restOfVariables[5],
      nx: restOfVariables[6],
      ny: restOfVariables[7],
      nz: restOfVariables[8],
      lambdaNum: restOfVariables[9],
      lambdaDen: restOfVariables[10],
      type: 1
    }
    return typeAGenerator(variables);
  } else { // type 2
    variables = {
      bx: restOfVariables[0],
      by: restOfVariables[1],
      bz: restOfVariables[2],
      dx: restOfVariables[3],
      dy: restOfVariables[4],
      dz: restOfVariables[5],
      dx1: restOfVariables[6],
      dy1: restOfVariables[7],
      dz1: restOfVariables[8],
      dx2: restOfVariables[9],
      dy2: restOfVariables[10],
      dz2: restOfVariables[11],
      lambdaNum: restOfVariables[12],
      lambdaDen: restOfVariables[13],
      type: 2
    }
    return typeBGenerator(variables);
  }
}

function typeAGenerator(variables?: variablesObjectA): [variablesObjectA, string[], string[]] {
  let a: Vector, b: Vector, n: Vector, lambda: Fraction;
  let direction: Vector;
  // generate variables
  if (variables === undefined) {
    a = getRandomVec();
    b = getRandomVec();
    while (b.isEqual(a)
      || getRandomInt(0,8)===0 // to facilitate testing: triggers 1/9 of the time
    ) {
      b = getRandomVec(); 
    }
    direction = b.minus(a)
    direction.simplify(true);
    n = getRandomVec();
    while (direction.dot(n).isEqual(0)
      || getRandomInt(0, 8) === 0 // to facilitate testing: triggers 1/9 of the time
    ) {
      n = getRandomVec();
    }
    lambda = getRandomFrac({ denMax: 3, avoid: [0] });
    variables = {
      ax: a.x.num, ay: a.y.num, az: a.z.num,
      bx: b.x.num, by: b.y.num, bz: b.z.num,
      nx: n.x.num, ny: n.y.num, nz: n.z.num,
      lambdaNum: lambda.num, lambdaDen: lambda.den,
      type: 1
    }
  } else {
    const { ax, ay, az, bx, by, bz, nx, ny, nz, lambdaNum, lambdaDen } = variables;
    a = new Vector(ax, ay, az);
    b = new Vector(bx, by, bz);
    n = new Vector(nx, ny, nz);
    lambda = new Fraction(lambdaNum, lambdaDen);
    direction = b.minus(a)
    direction.simplify(true);
  }
  const intersection = a.plus(direction.multiply(lambda));
  const l = new Line(a, b, { twoPointsMode: true });
  const p = new Plane(n, { point: intersection, mode: 'pt' });

  // generate question
  const aPoint = a.toCoordinates('A');
  const bPoint = b.toCoordinates('B');
  const planeEquation = p.toString({ cartesianMode: true });

  // generate answer
  const angle = p.angle(l);
  const distance = p.distanceTo(a);
  const distanceString = distance.radicand > 100 ? distance.valueOf().toFixed(2) : distance.toString();
  const distanceQn = distance.radicand > 100 ? 'correct to 2 decimal places' : 'in exact form';

  // store qns, answers
  const qns = [
    aPoint, bPoint, planeEquation, distanceQn
  ]
  const answers = [
    intersection.toCoordinates(), angle, distanceString
  ]
  // return
  return [variables, qns, answers];
}

function typeBGenerator(variables?: variablesObjectB): [variablesObjectB, string[], string[]] {
  let b: Vector, direction: Vector, dp1: Vector, dp2: Vector, lambda: Fraction;
  let n: Vector;
  // generate variables
  if (variables === undefined) {
    b = getRandomVec();
    direction = getRandomVec();
    n = getRandomVec();
    while (direction.dot(n).isEqual(0)
      || getRandomInt(0, 8) === 0 // to facilitate testing: triggers 1/9 of the time
    ) {
      n = getRandomVec();
    }
    dp1 = getRandomPerp(n);
    dp2 = getRandomPerp(n);
    while (dp1.isParallelTo(dp2)) {
      dp2 = getRandomPerp(n);
    }
    dp1.simplify(true);
    dp2.simplify(true);
    lambda = getRandomFrac({ denMax: 3, avoid: [0] });
    variables = {
      bx: b.x.num, by: b.y.num, bz: b.z.num,
      dx: direction.x.num, dy: direction.y.num, dz: direction.z.num,
      dx1: dp1.x.num, dy1: dp1.y.num, dz1: dp1.z.num,
      dx2: dp2.x.num, dy2: dp2.y.num, dz2: dp2.z.num,
      lambdaNum: lambda.num, lambdaDen: lambda.den,
      type: 2
    }
  } else {
    const { bx, by, bz, dx, dy, dz, dx1, dy1, dz1, dx2, dy2, dz2, lambdaNum, lambdaDen } = variables;
    b = new Vector(bx, by, bz);
    direction = new Vector(dx, dy, dz);
    dp1 = new Vector(dx1, dy1, dz1);
    dp2 = new Vector(dx2, dy2, dz2);
    lambda = new Fraction(lambdaNum, lambdaDen);
  }
  n = dp1.cross(dp2);
  n.simplify(true);
  const a = b.plus(direction.multiply(lambda)).plus(dp1); // a = b + lambda d + dp1
  const l = new Line(b, direction);
  const p = new Plane(n, { point: a, mode: 'pt' });
  const intersection = b.plus(direction.multiply(lambda));

  // generate question
  const aPoint = a.toCoordinates('A');
  const dp1String = dp1.toString({ijkMode: true});
  const dp2String = dp2.toString({ijkMode: true});
  const lineEquation = l.toString({ mode: 'cartesian' });

  // generate answer
  const angle = p.angle(l);
  const distance = l.distanceTo(a);
  const distanceString = distance.radicand > 100 ? distance.valueOf().toFixed(2) : distance.toString();
  const distanceQn = distance.radicand > 100 ? 'correct to 2 decimal places' : 'in exact form';


  // store qns, answers
  const qns = [
    aPoint, dp1String, dp2String, lineEquation, distanceQn
  ]
  const answers = [
    intersection.toCoordinates(), angle, distanceString
  ]
  // return
  return [variables, qns, answers];
}

export { qn1204 };