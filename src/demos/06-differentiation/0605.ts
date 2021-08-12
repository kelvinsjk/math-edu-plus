import { encode, decode } from '../../fns/encode/encoders';
//import { getRandomInts } from '../../fns/random/generateMultiple';

//import {
//  getRandomFrac, TODO: update
//  getRandomInt,
//  Fraction, getRandomLinear
//} from 'math-edu';
import { getRandomInt, Fraction, factorize, Term } from '../../../../math-edu/src/index';

interface variablesObject {
  n: number;
  type: string; // 2 letter string made up of 'a's and 'b's
}

/**
 * generate qn0605: differentiation (parametric differentiation and integration)
 * @param options `{type1: 'a', type2: 'b', qnCode: string}`
 */
function qn0605(options?: qnOptions): qnOutput {
  // options
  const defaultOptions = {
    type1: '',
    type2: '',
    qnCode: '',
  };
  const optionsObject = { ...defaultOptions, ...options };
  // generate variables
  let type1: string, type2: string;
  let questions: string[], answers: string[], variables: variablesObject;
  if (optionsObject.qnCode) {
    // qnCode provided
    let restOfVariables: number[];
    [type1, type2, ...restOfVariables] = decode(optionsObject.qnCode) as [string, string, ...number[]];
    [variables, questions, answers] = variablesToQn(type1, type2, restOfVariables);
  } else {
    // generate qn type and subtype
    const abArray = ['a', 'b'];
    type1 = optionsObject.type1 === '' ? abArray[getRandomInt(0, 1)] : optionsObject.type1;
    type2 = optionsObject.type2 === '' ? abArray[getRandomInt(0, 1)] : optionsObject.type2;
    const n = getRandomInt(3, 9);
    const restOfVariables = [n];
    [variables, questions, answers] = variablesToQn(type1, type2, restOfVariables);
  }
  // prepare variablesArray for encoding
  const variablesArray = [variables.type[0], variables.type[1], variables.n];
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
  qnCode?: string;
}
interface qnOutput {
  variables: variablesObject;
  qnCode: string;
  questions: string[];
  answers: string[];
}

function variablesToQn(type1: string, type2: string, restOfVariables: number[]): [variablesObject, string[], string[]] {
  const n = restOfVariables[0];
  const variablesObject = {
    n,
    type: type1 + type2,
  };
  // generate qns
  const firstTrig = type1 === 'a' ? '\\cos' : '\\sin';
  const secondTrig = type1 === 'a' ? '\\sin' : '\\cos';
  const eqn = `x = ${firstTrig}^2 t, \\quad y = ${secondTrig}^${n} t, \\quad \\textrm{for } 0 \\leq t \\leq {\\textstyle \\frac{\\pi}{2}}`;
  const pt = `( ${firstTrig}^2 \\theta, ${secondTrig}^${n} \\theta )`;
  const powerNMinus2 = n === 3 ? '' : `^{${n - 2}}`;

  const [[n1, two1], divisor] = factorize(n, 2);
  let area: string, tangent: string;
  if (type2 === 'a') {
    // tangent
    const firstTrigTerm = new Term(n1, `${firstTrig}^2 \\theta`);
    const secondTrigTerm = new Term(two1, `${secondTrig}^2 \\theta`);
    area = `${new Fraction(
      divisor * divisor,
      4 * n,
    )} ${secondTrig}${powerNMinus2} \\theta ( ${firstTrigTerm} + ${secondTrigTerm} )^2`;
    tangent = 'tangent';
  } else {
    // normal
    const firstTrigTerm = new Term(n1, `${secondTrig}^{${2 * n - 2}} \\theta`);
    const secondTrigTerm = new Term(two1, `${firstTrig}^2 \\theta`);
    const frac = new Fraction(divisor * divisor, 4 * n);
    const denTerm = new Term(frac.den, `${secondTrig}${powerNMinus2} \\theta`);
    area = `\\frac{${frac.num}}{ ${denTerm} } | ${firstTrigTerm} - ${secondTrigTerm} |^2`;
    tangent = 'normal';
  }
  const integral = `2 \\int_0^{\\frac{\\pi}{2}} ${firstTrig} t ${secondTrig}^{${n + 1}} t \\, \\mathrm{d} t`;
  const substitution = `u = ${secondTrig} t`;
  // generate answers
  const ans = `${new Fraction(2, n + 2)} \\textrm{ units}^2`;

  return [variablesObject, [eqn, tangent, pt, area, integral, substitution], [ans]];
}

export { qn0605 };
