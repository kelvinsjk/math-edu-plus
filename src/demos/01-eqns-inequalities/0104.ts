import { encode, decode } from '../../fns/encode/encoders';

import { getRandomInt, Expression } from '../../../../math-edu/src/index';

import {
  // getRandomInt, Expression,
  ExpFn, PowerFn, bisection, simpsons, integrateByParts
} from '../../index';

/**
 * generate qn1004: equations and inequalities
 * @param options `{qnCode: string}
 */
function qn0104(options?: qnOptions): qnOutput {
  // options
  const defaultOptions = {
    qnCode: '',
  };
  const optionsObject = { ...defaultOptions, ...options };

  // generate variables
  let questions: string[], answers: string[], variables: variablesObject;
  let n: number;
  if (optionsObject.qnCode) {
    // qnCode provided
    [n] = decode(optionsObject.qnCode) as [number];
    [variables, questions, answers] = variablesToQn(n);
  } else {
    // generate qn type
    n = getRandomInt(3, 9);
    [variables, questions, answers] = variablesToQn(n);
  }
  const variablesArray = [variables.n];
  return {
    variables: variables,
    qnCode: encode(...variablesArray),
    questions: questions,
    answers: answers,
  };
}

interface qnOptions {
  qnCode?: string;
}
interface variablesObject {
  n: number;
}
interface qnOutput {
  variables: variablesObject;
  qnCode: string;
  questions: string[];
  answers: string[];
}

function variablesToQn(n: number): [variablesObject, string[], string[]] {
  const variables: variablesObject = { n };

  // question
  const ex = new ExpFn();
  const nx = new PowerFn({ coeff: n });
  let expression = new Expression(ex);
  expression = expression.subtract(nx);
  const qn = `y = ${expression}`;

  // answer
  // (a) pi int_4^5 e^2x - 2n x + n^2 x^2
  const n2x2 = new PowerFn({ coeff: n * n, n: 2 });
  const exp2xIntegral = new ExpFn({ a: 2 }).definiteIntegral(4, 5);
  const nx_exIntegral = integrateByParts(nx, ex, [4, 5]).multiply(2);
  const n2x2Integral = n2x2.definiteIntegral(4, 5);

  const definite = exp2xIntegral.subtract(nx_exIntegral).add(n2x2Integral);
  const ansA = `\\pi \\left( ${definite} \\right)`;

  const alpha = bisection((x) => ex.toNumberFunction()(x) - nx.toNumberFunction()(x), 0, 1);
  const beta = bisection((x) => ex.toNumberFunction()(x) - nx.toNumberFunction()(x), 1, 4);
  const ansAlpha = `\\alpha = ${alpha.toFixed(3)}`;
  const ansBeta = `\\beta = ${beta.toFixed(3)}`;
  const ansC1 = `x < ${alpha.toFixed(3)}`;
  const ansC2 = `x > ${beta.toFixed(3)}`;

  const area = -simpsons((x) => ex.toNumberFunction()(x) - nx.toNumberFunction()(x), alpha, beta);

  const ans = [ansA, ansAlpha, ansBeta, ansC1, ansC2, area.toFixed(2)];

  return [variables, [qn], ans];
}

export { qn0104 };
