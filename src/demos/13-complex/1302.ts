import { encode, decode } from '../../fns/encode/encoders';
import { getRandomInts } from '../../fns/random/generateMultiple';


//import {
//  getRandomFrac, TODO: update
//  getRandomInt, 
//  Fraction, getRandomLinear
//} from 'math-edu';
import {
  Complex, Term, Expression, getRandomInt
} from '../../../../math-edu/src/index';

interface variablesObject {
  a: number,
  x: number,
  y: number,
  type: number
}

/**
 * generate qn0201: functions
 * @param options `{type: 1-4, qnCode: string}
 */
function qn1302(options?: qnOptions): qnOutput {
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
    type = (optionsObject.type === 0) ? getRandomInt(1, 4) : optionsObject.type;
    // generate variables
    const [a, x, y] = getRandomInts(3, { unique: false, avoid: [0] });
    [variables, questions, answers] = variablesToQn(type, [a, x, y]);
  }
  const variablesArray = [variables.type, variables.a, variables.x, variables.y];
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
  const a = restOfVariables[0], x = restOfVariables[1], y = restOfVariables[2];
  const variables: variablesObject = {
    a: a,
    x: x,
    y: y,
    type: type
  };
  // construct rhs of qn
  const z = new Complex(x, y);
  let secondComplexTerm: Complex;
  if (type === 1) {
    secondComplexTerm = z.clone();
  } else if (type === 2) {
    secondComplexTerm = z.conjugate();
  } else if (type === 3) {
    secondComplexTerm = z.times(Complex.I);
  } else { // type === 4
    secondComplexTerm = z.conjugate().times(Complex.I);
  }
  const rhs = z.times(z.conjugate()).plus(secondComplexTerm.times(a));
  // construct qn
  const secondTermVariables = ['z', 'z^*', 'iz', 'iz^*'];
  const secondTerm = new Term(a, secondTermVariables[type - 1]);
  const qnExpression = new Expression('zz^*', secondTerm);
  const qn = `${qnExpression} = ${rhs}`;
  // construct ans
  const ans = `z = ${z}`;

  return [variables, [qn], [ans]];
}

export { qn1302 };