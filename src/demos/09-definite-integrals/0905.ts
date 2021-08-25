import { getRandomInt, Term, Fraction } from
  // 'math-edu';
  '../../../../math-edu/src/index';
import { encode, decode, integrateByParts, CosFn, SinFn, ExpFn, LnFn, simpsons, PowerFn } from '../../index'
//import { ExpFn, PowerFn, bisection, simpsons, integrateByParts, encode, decode, getRandomInt, Expression } from 'math-edu-plus';

interface VariablesObject {
  type: number,
  a: number,
}

/**
 * generate qn0803: integration techniques
 * @param options `{qnCode: string, type: number}`
 */
function qn0905(options?: { qnCode?: string, type?: number }): qnOutput {
  // options
  const defaultOptions = {
    qnCode: '',
    type: 0,
  };
  const optionsObject = { ...defaultOptions, ...options };

  // generate variables
  let questions: QnContainer, answers: AnswerContainer, variables: VariablesObject;
  if (optionsObject.qnCode) {
    // qnCode provided
    const [type, a] = <number[]>decode(optionsObject.qnCode)
    variables = { type, a };
    [variables, questions, answers] = variablesToQn(variables);
  } else {
    // generate qn type
    [variables, questions, answers] = variablesToQn(optionsObject.type);
  }
  const variablesArray = [variables.type, variables.a];
  return {
    variables: variables,
    qnCode: encode(...variablesArray),
    questions: questions,
    answers: answers,
  };
}

interface qnOutput {
  variables: VariablesObject,
  qnCode: string,
  questions: QnContainer,
  answers: AnswerContainer
}
interface QnContainer {
  eqn: string,
  line: string,
  lowerLimit: string,
  upperLimit: string
}
interface AnswerContainer {
  ansA: string,
  ansB: string,
}

function variablesToQn(variables: VariablesObject | number): [VariablesObject, QnContainer, AnswerContainer] {
  // variables
  if (typeof variables === 'number') {
    const type = variables === 0 ? getRandomInt(1, 4) : variables;
    const a = getRandomInt(1, 9);
    variables = { type, a };
  }
  const { type, a } = variables;

  // question & answer
  let eqn: string, line: string, lowerLimit: string, upperLimit: string, ansA: string, ansB: string
  if (type === 1 || type === 2) {
    // question
    const ax = new Term(a, 'x');
    const a2x2 = new Term(a * a, 'x^2');
    eqn = type === 1 ? `${a2x2} \\sin ${ax}` : `${a2x2} \\cos ${ax}`;
    lowerLimit = '0';
    const halfPi = new Term(new Fraction(1, 2 * a), '\\pi');
    const oneThirdPi = new Term(new Fraction(1, 3 * a), '\\pi');
    upperLimit = type === 1 ? `${halfPi}` : `${oneThirdPi}`;
    line = `x = ${upperLimit}`;
    // answer
    // integral of a^3 x^2 sin ax is invariant so we just find integration of x^2 sin x (or cos x) and scale by 1/a to find answer
    const x2 = new PowerFn({ n: 2 });
    const sinX = new SinFn();
    const cosX = new CosFn();
    const area = integrateByParts(x2, type === 1 ? sinX : cosX, [0, type === 1 ? 90 : 60]);
    ansA = `${area.multiply(new Fraction(1, a))}`;
    ansB = simpsons((x) => Math.PI*Math.pow(a * x, 4) * Math.pow(type === 1 ? Math.sin(a * x) : Math.cos(a * x), 2), 0, Math.PI / a / (type === 1 ? 2 : 3)).toFixed(3);
  } else if (type===3) { 
    // question
    const ax = new Term(a, 'x');
    const a2x2 = new Term(a * a, 'x^2');
    eqn = `${a2x2} \\mathrm{e}^{ ${ax} }`;
    lowerLimit = '0';
    const oneOverA = new Fraction(1, a);
    upperLimit = `${oneOverA}`;
    line = `x = ${upperLimit}`;
    // answer
    // integral of a^3 x^2 e^ax is invariant so we just find integration of x^2 e^x and scale by 1/a
    const x2 = new PowerFn({ n: 2 });
    const eX = new ExpFn();
    const area = integrateByParts(x2, eX, [0, 1]);
    ansA = `${area.multiply(new Fraction(1, a))}`;
    ansB = simpsons((x) => Math.PI *Math.pow(a * x, 4) * Math.exp(2*a*x), 0, 1/a).toFixed(3);
  } else { // type === 4
    // question
    const ax = new Term(a, 'x');
    eqn = `\\left( \\ln ${ax} \\right)^2`;
    const oneOverA = new Fraction(1, a);
    const twoOverA = new Fraction(2, a);
    lowerLimit = `${oneOverA}`
    upperLimit = `${twoOverA}`;
    line = `x = ${upperLimit}`;
    // answer
    // integral of a (ln ax)^2 is invariant so we just find integration of (ln x)^2 and scale by 1/a
    const one = new PowerFn({ n: 0 });
    const lnX = new LnFn({n:2});
    const area = integrateByParts(lnX, one, [1, 2]);
    ansA = `${area.multiply(new Fraction(1, a))}`;
    ansB = simpsons((x) => Math.PI *Math.pow(Math.log(a*x), 4), 1/a, 2 / a).toFixed(3);
  }

  const questions = { eqn, line, lowerLimit, upperLimit };
  const answers = { ansA, ansB }
  return [variables as VariablesObject, questions, answers];
}

export { qn0905 };

