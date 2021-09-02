import { getRandomInt } from 'math-edu';
import { Polynomial, Fraction, SquareRoot } from '../../../../math-edu/src/index';
import { encode, decode } from '../../index';
//import { ExpFn, PowerFn, bisection, simpsons, integrateByParts, encode, decode, getRandomInt, Expression } from 'math-edu-plus';

interface VariablesObjectA {
  type: number;
  a: number;
  b: number;
  nNum: number;
  nDen: number;
}
interface VariablesObjectB {
  type: number;
  a: number;
  b: number;
}

/**
 * generate qn0703: Maclaurin's
 * @param options `{qnCode: string, type: number}`
 */
function qn0703(options?: { qnCode?: string; type?: number }): qnOutput {
  // options
  const defaultOptions = {
    qnCode: '',
    type: 0,
  };
  const optionsObject = { ...defaultOptions, ...options };

  // generate variables
  let questions: QnContainer, answers: AnswerContainer, variables: VariablesObjectA | VariablesObjectB;
  if (optionsObject.qnCode) {
    // qnCode provided
    let type: number, nNum: number, nDen: number, a: number, b: number;
    if (optionsObject.qnCode[0] === '1') {
      [type, nNum, nDen, a, b] = <number[]>decode(optionsObject.qnCode);
      variables = { type, nNum, nDen, a, b };
    } else {
      [type, a, b] = <number[]>decode(optionsObject.qnCode);
      variables = { type, a, b };
    }
    [variables, questions, answers] = variablesToQn(variables);
  } else {
    // generate qn type
    [variables, questions, answers] = variablesToQn(optionsObject.type);
  }
  let variablesArray: number[];
  if (variables.type === 1) {
    const newVariables = variables as VariablesObjectA;
    variablesArray = [newVariables.type, newVariables.nNum, newVariables.nDen, newVariables.a, newVariables.b];
  } else {
    variables = variables as VariablesObjectB;
    variablesArray = [variables.type, variables.a, variables.b];
  }
  return {
    variables: variables,
    qnCode: encode(...variablesArray),
    questions: questions,
    answers: answers,
  };
}

interface qnOutput {
  variables: VariablesObjectA | VariablesObjectB;
  qnCode: string;
  questions: QnContainer;
  answers: AnswerContainer;
}
interface QnContainer {
  fn: string;
  expression: string;
}
interface AnswerContainer {
  ansA: string;
  ansB: string;
  ansC: string;
}

function variablesToQn(
  variables?: VariablesObjectA | VariablesObjectB | number,
): [VariablesObjectA | VariablesObjectB, QnContainer, AnswerContainer] {
  // variables
  if (typeof variables === 'number') {
    const type = variables === 0 ? getRandomInt(1, 2) : variables;
    let nNum: number, nDen: number;
    const a = type === 1 ? getRandomInt(2, 5) : getRandomInt(2, 9);
    const b = type === 1 ? getRandomInt(2, 5) : getRandomInt(2, 9);
    if (type === 1) {
      nDen = getRandomInt(2, 3);
      const twoNum = [3, 1, -1];
      const threeNum = [4, 2, 1, -1];
      nNum = nDen === 2 ? twoNum[getRandomInt(0, 2)] : threeNum[getRandomInt(0, 3)];
      variables = { type, nNum, nDen, a, b };
    } else {
      variables = { type, a, b };
    }
  }

  const { type, a, b } = variables as VariablesObjectA | VariablesObjectB;

  // question
  const fn = type === 1 ? '( 1 + x )^n' : '\\ln ( 1 + x )';
  // set up expression
  let aActual: number, nNum: number, nDen: number;
  let expression: string;
  let ansA: string, ansB: string;
  if (type === 1) {
    const newVariables = variables as VariablesObjectA;
    ({ nNum, nDen } = newVariables);
    aActual = Math.pow(a, nDen);
    const aMinusX = new Polynomial([aActual, -1], { ascending: true });
    const onePlusBX2 = new Polynomial([1, 0, b], { ascending: true });
    const n = new Fraction(nNum, nDen);
    expression = `( ${aMinusX} )^${n} ( ${onePlusBX2} )^${n}`;
    // answers
    ansA = '1 + n x + \\frac{n(n-1)}{2} x^2 + \\frac{n(n-1)(n-2)}{6} x^3 + \\ldots';
    const negativeOneOverA = new Fraction(-1, aActual);
    const x3Coefficient = negativeOneOverA.pow(3).times(n).times(n.minus(1)).times(n.minus(2)).divide(6);
    const expansionOne = new Polynomial(
      [1, negativeOneOverA.times(n), negativeOneOverA.square().times(n).times(n.minus(1)).divide(2), x3Coefficient],
      { ascending: true },
    );
    const expansionTwo = new Polynomial([1, 0, n.times(b)], { ascending: true });
    const aOutside = nNum < 0 ? new Fraction(1, a) : Math.pow(a, nNum);
    const answer = expansionOne.multiply(expansionTwo).multiply(aOutside);
    ansB = `${answer.truncate(3).reverse()} + \\ldots`;
  } else {
    const aMinusX = new Polynomial([a, -1], { ascending: true });
    const onePlusBX2 = new Polynomial([1, 0, b], { ascending: true });
    expression = `\\ln ( ${aMinusX} ) + \\ln ( ${onePlusBX2} )`;
    // answers
    ansA = 'x - \\frac{1}{2} x^2 + \\frac{1}{3} x^3 + \\ldots';
    const negativeOneOverA = new Fraction(-1, a);
    const expansionOne = new Polynomial(
      [0, negativeOneOverA, negativeOneOverA.square().divide(-2), negativeOneOverA.pow(3).divide(3)],
      { ascending: true },
    );
    const expansionTwo = new Polynomial([b], { initialDegree: 2 });
    const answer = expansionOne.add(expansionTwo).truncate(3);

    ansB = `\\ln ${a} ${answer} + \\ldots`;
  }
  const sign = type === 1 ? '<' : '\\leq';
  const oneOverRootB = new SquareRoot(b, new Fraction(1, b));
  const ansC = `- ${oneOverRootB} ${sign} x ${sign} ${oneOverRootB}.`;

  const questions = { fn, expression };
  const answers = { ansA, ansB, ansC };
  return [variables as VariablesObjectA | VariablesObjectB, questions, answers];
}

export { qn0703 };
