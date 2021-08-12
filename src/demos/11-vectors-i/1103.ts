import { encode, decode } from '../../fns/encode/encoders';
import { getRandomInts } from '../../fns/random/generateMultiple';
import { getRandomPerp } from '../../fns/random/generateSpecialVectors';

//import {
//  getRandomFrac, TODO: update
//  getRandomInt,
//  Fraction, getRandomLinear
//} from 'math-edu';
import { getRandomInt, getRandomVec, factorize, Vector, Fraction } from 'math-edu';
//  '../../../../math-edu/src/index';

interface variablesObject {
  ax: number;
  ay: number;
  az: number;
  bx: number;
  by: number;
  bz: number;
  cx: number;
  cy: number;
  cz: number;
  lambda: number;
  mu: number;
  type: string; // 3 letter string made up of 'a's and 'b's
}

/**
 * generate qn1103: vectors 1
 * @param options `{type1: 'a', type2: 'b', type3: 'a', qnCode: string}
 */
function qn1103(options?: qnOptions): qnOutput {
  // options
  const defaultOptions = {
    type1: '',
    type2: '',
    type3: '',
    qnCode: '',
  };
  const optionsObject = { ...defaultOptions, ...options };
  // generate variables
  let type1: string, type2: string, type3: string;
  let questions: string[], answers: string[], variables: variablesObject;
  if (optionsObject.qnCode) {
    // qnCode provided
    let restOfVariables: number[];
    [type1, type2, type3, ...restOfVariables] = decode(optionsObject.qnCode) as [string, string, string, ...number[]];
    [variables, questions, answers] = variablesToQn(type1, type2, type3, restOfVariables);
  } else {
    // generate qn type and subtype
    const abArray = ['a', 'b'];
    type1 = optionsObject.type1 === '' ? abArray[getRandomInt(0, 1)] : optionsObject.type1;
    type2 = optionsObject.type2 === '' ? abArray[getRandomInt(0, 1)] : optionsObject.type2;
    type3 = optionsObject.type3 === '' ? abArray[getRandomInt(0, 1)] : optionsObject.type3;
    const a = getRandomVec();
    const b = getRandomPerp(a);
    let c = getRandomVec();
    while (c.isParallelTo(a) || c.isParallelTo(b) || getRandomInt(0, 10) === 0) {
      // last condition to trigger test coverage
      c = getRandomVec();
    }
    let [lambda, mu] = getRandomInts(2, { unique: false, min: 1, max: 5 });
    [[lambda, mu]] = factorize(lambda, mu);
    const restOfVariables = [
      a.x.num,
      a.y.num,
      a.z.num,
      b.x.num,
      b.y.num,
      b.z.num,
      c.x.num,
      c.y.num,
      c.z.num,
      lambda,
      mu,
    ];
    [variables, questions, answers] = variablesToQn(type1, type2, type3, restOfVariables);
  }
  // prepare variablesArray for encoding
  const variablesArray = [
    variables.type[0],
    variables.type[1],
    variables.type[2],
    variables.ax,
    variables.ay,
    variables.az,
    variables.bx,
    variables.by,
    variables.bz,
    variables.cx,
    variables.cy,
    variables.cz,
    variables.lambda,
    variables.mu,
  ];
  return {
    variables: variables,
    qnCode: encode(...variablesArray),
    questions: questions,
    answers: answers,
  };
}

interface qnOptions {
  type1?: string;
  type2?: string;
  type3?: string;
  qnCode?: string;
}
interface qnOutput {
  variables: variablesObject;
  qnCode: string;
  questions: string[];
  answers: string[];
}

function variablesToQn(
  type1: string,
  type2: string,
  type3: string,
  restOfVariables: number[],
): [variablesObject, string[], string[]] {
  const a = new Vector(restOfVariables[0], restOfVariables[1], restOfVariables[2]);
  const b = new Vector(restOfVariables[3], restOfVariables[4], restOfVariables[5]);
  const c = new Vector(restOfVariables[6], restOfVariables[7], restOfVariables[8]);
  const lambda = restOfVariables[9],
    mu = restOfVariables[10];
  const variablesObject = {
    ax: restOfVariables[0],
    ay: restOfVariables[1],
    az: restOfVariables[2],
    bx: restOfVariables[3],
    by: restOfVariables[4],
    bz: restOfVariables[5],
    cx: restOfVariables[6],
    cy: restOfVariables[7],
    cz: restOfVariables[8],
    lambda: lambda,
    mu: mu,
    type: type1 + type2 + type3,
  };
  // generate question
  let ratio: string;
  if (type1 === 'a') {
    // V is on AB
    ratio = type2 === 'a' ? `AV:VB = ${lambda}:${mu}` : `AV:AB = ${lambda}:${lambda + mu}`;
  } else {
    // V is on AB extended
    ratio = type2 === 'a' ? `AB:BV = ${lambda}:${mu}` : `AB:AV = ${lambda}:${lambda + mu}`;
  }
  const triangle = type3 === 'a' ? 'OAC' : 'OBC';
  const qns = [
    a.toString({ ijkMode: true }),
    b.toString({ ijkMode: true }),
    ratio,
    c.toString({ ijkMode: true }),
    triangle,
  ];
  // generate answers
  const v =
    type1 === 'a'
      ? Vector.ratioTheorem(a, b, lambda, mu)
      : Vector.ratioTheorem(a, b, lambda, mu, { extendedMode: true });
  v.simplify();
  const v2 = type3 === 'a' ? a : b;
  const area = v2.multiply(new Fraction(1, 2)).cross(c).magnitude();
  const answers = [v.toString({ ijkMode: true }), area.toString()];
  return [variablesObject, qns, answers];
}

export { qn1103 };
