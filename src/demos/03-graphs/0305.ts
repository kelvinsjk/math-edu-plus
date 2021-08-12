import { encode, decode } from '../../fns/encode/encoders';
import { getRandomInts } from '../../fns/random/generateMultiple';

//import {
//  getRandomFrac, TODO: update
//  getRandomInt,
//  Fraction, getRandomLinear
//} from 'math-edu';
import { Polynomial, RationalFunction, getRandomInt } from '../../../../math-edu/src/index';
import { Fraction } from 'math-edu';

interface variablesObject {
  A: number;
  B: number;
  c: number;
  type: number;
}

/**
 * generate qn0305: transformations
 * @param options `{type: 1, qnCode: string}
 */
function qn0305(options?: qnOptions): qnOutput {
  // options
  const defaultOptions = {
    type: 0,
    qnCode: '',
  };
  const optionsObject = { ...defaultOptions, ...options };

  // generate variables
  let type: number;
  let questions: string[], answers: string[], variables: variablesObject;
  if (optionsObject.qnCode) {
    // qnCode provided
    let restOfVariables: number[];
    [type, ...restOfVariables] = decode(optionsObject.qnCode) as [number, ...number[]];
    [variables, questions, answers] = variablesToQn(type, restOfVariables);
  } else {
    // generate qn type and subtype
    type = optionsObject.type === 0 ? getRandomInt(1, 2) : optionsObject.type;
    const [A, c] = getRandomInts(2, { unique: false, avoid: [0] });
    const B = getRandomInt(2, 9);
    const restOfVariables = [A, B, c];
    [variables, questions, answers] = variablesToQn(type, restOfVariables);
  }
  // prepare variablesArray for encoding
  const variablesArray = [variables.type, variables.A, variables.B, variables.c];
  return {
    variables: variables,
    qnCode: encode(...variablesArray),
    questions: questions,
    answers: answers,
  };
}

interface qnOptions {
  type?: number;
  qnCode?: string;
}
interface qnOutput {
  variables: variablesObject;
  qnCode: string;
  questions: string[];
  answers: string[];
}

function variablesToQn(type: number, restOfVariables: number[]): [variablesObject, string[], string[]] {
  const A = restOfVariables[0],
    B = restOfVariables[1],
    c = restOfVariables[2];
  const variablesObject = { A: A, B: B, c: c, type: type };
  // generate question
  const B_over_x_plus_c = new RationalFunction(new Polynomial([B]), new Polynomial([1, c]));
  const ax_plus_b_over_x_plus_c = B_over_x_plus_c.add(new Polynomial([A]));
  const qnEquation1 = `y = ${ax_plus_b_over_x_plus_c}`;
  const qnEquation2 = `y = ${A} + ${B_over_x_plus_c}`;
  const one_over_x = 'y = \\frac{ 1 }{ x }';
  const qnGraph1 = type === 1 ? one_over_x : qnEquation1;
  const qnGraph2 = type === 1 ? qnEquation1 : one_over_x;
  const qns = [qnEquation1, qnEquation2, qnGraph1, qnGraph2];
  // generate answer
  const positiveOrNegativeOne = (c > 0 && type === 1) || (c < 0 && type === 2) ? 'negative' : 'positive';
  const positiveOrNegativeTwo = (A > 0 && type === 1) || (A < 0 && type === 2) ? 'positive' : 'negative';
  const transformation1Start = `Translate by ${Math.abs(c)} units in the ${positiveOrNegativeOne}`;
  const transformation1Axis = 'x';
  const scaleFactor = type === 1 ? `${B}` : `${new Fraction(1, B)}`;
  const transformation2Start = `Scale by a factor of ${scaleFactor} parallel to the`;
  const transformation2Axis = 'y';
  const transformation3Start = `Translate by ${Math.abs(A)} units in the ${positiveOrNegativeTwo}`;
  const transformation3Axis = 'y';
  const answers =
    type === 1
      ? [
          transformation1Start,
          transformation1Axis,
          transformation2Start,
          transformation2Axis,
          transformation3Start,
          transformation3Axis,
        ]
      : [
          transformation3Start,
          transformation3Axis,
          transformation2Start,
          transformation2Axis,
          transformation1Start,
          transformation1Axis,
        ];
  return [variablesObject, qns, answers];
}

export { qn0305 };
