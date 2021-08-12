import { encode, decode } from '../../fns/encode/encoders';
//import { getRandomInts } from '../../fns/random/generateMultiple';


//import {
//  getRandomFrac, TODO: update
//  getRandomInt, 
//  Fraction, getRandomLinear
//} from 'math-edu';
import {
  Fraction, Term, Expression, Polynomial, getRandomInt, solveQuadratic
} from '../../../../math-edu/src/index';

interface variablesObject {
  m: number,
  mAdd: number,
  k: number,
  type: number
}

/**
 * generate qn0404: ap, gp
 * 
 * @returns `[qns, answers, qnCode]`
 * 
 * @param options `{type: 1-2, qnCode: string}`
 */
function qn0404(options?: qnOptions): qnOutput {
  // options
  const defaultOptions = {
    type: 0,
    qnCode: ''
  }
  const optionsObject = { ...defaultOptions, ...options };

  // generate variables
  let type: number;
  let questions: string[], answers: string[], variables: variablesObject;
  if (optionsObject.qnCode) { // qnCode provided
    let restOfVariables: number[];
    [type, ...restOfVariables] = decode(optionsObject.qnCode) as [number, ...number[]];
    [variables, questions, answers] = variablesToQn(type, restOfVariables);
  } else {
    // generate qn type
    type = (optionsObject.type === 0) ? getRandomInt(1, 2) : optionsObject.type;
    // generate variables
    const m = getRandomInt(2, 9);
    const mAdd = getRandomInt(1, Math.min(m - 1, 9));
    const n = m + mAdd;
    const kMax = Math.floor((Math.floor(m * m / (2 * m - n)) + 1) / 2);
    const k = getRandomInt(1, Math.min(kMax - 1, 9));
    [variables, questions, answers] = variablesToQn(type, [m, mAdd, k]);
  }
  const variablesArray = [variables.type, variables.m, variables.mAdd, variables.k];
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
  variables: variablesObject,
  qnCode: string,
  questions: string[],
  answers: string[]
}


function variablesToQn(type: number, restOfVariables: number[]): [variablesObject, string[], string[]] {
  const m = restOfVariables[0], mAdd = restOfVariables[1], k = restOfVariables[2];
  const variables: variablesObject = {
    m, mAdd, k, type
  };
  const n = m + mAdd;
  // construct eqn
  let eqn: string;
  if (type === 1) {
    const poly = new Polynomial([m, -n, n - m], { variableAtom: 'r' });
    eqn = `${poly} = 0`;
  } else { // type === 2
    const m2d2 = new Term(m * m, 'd^2');
    const adTerm = new Term(2 * m - n, 'ad');
    const exp = new Expression(m2d2, adTerm);
    eqn = `${exp} = 0`;
  }
  // ka
  const ka = new Term(k, 'a');

  /// construct answers
  // (b)
  const r = new Fraction(n - m, m);
  const sInf = Fraction.ONE.divide(Fraction.ONE.minus(r));
  const sInfTerm = new Term(sInf, 'a');
  const convergentReason = `-1 < r = ${r} < 1`;
  const sInfAns = `S_\\infty = ${sInfTerm}`;
  // (c)
  const d = r.minus(1).divide(m);
  // inequality in c simplifies to dn^2 + (2-d)n - 2k > 0
  const [root1, root2] = solveQuadratic(d, d.negative().plus(2), -2 * k);
  const root1String = Number.isInteger(root1) ? root1 + 1 : Math.ceil(root1);
  const root2String = Number.isInteger(root2) ? root2 - 1 : Math.floor(root2);
  const cAns = `\\{ n \\in \\mathbb{Z}: ${root1String} \\leq n \\leq ${root2String} \\}`;
  // combine answers
  const ans = [convergentReason, sInfAns, cAns];

  // nth term
  const numberToString = ['', 'first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth',
    'eleventh', 'twelfth', 'thirteenth', 'fourteenth', 'fifteenth', 'sixteenth', 'seventeenth', 'eighteenth', 'nineteenth'];

  return [variables, [numberToString[m+1], numberToString[n+1], eqn, `${ka}`], ans];
}

export { qn0404 };