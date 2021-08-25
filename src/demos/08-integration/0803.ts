import { getRandomInt, Term, Fraction } from
  // 'math-edu';
  '../../../../math-edu/src/index';
import { encode, decode, integrateCosSquare, integrateSinSquare, integrateSinCos } from '../../index'
//import { ExpFn, PowerFn, bisection, simpsons, integrateByParts, encode, decode, getRandomInt, Expression } from 'math-edu-plus';

interface VariablesObject {
  type: number,
  subtype: string,
  a: number,
  bNum: number
  bDen: number,
}

/**
 * generate qn0803: integration techniques
 * @param options `{qnCode: string, type: number}`
 */
function qn0803(options?: { qnCode?: string, type?: number, subtype?: string }): qnOutput {
  // options
  const defaultOptions = {
    qnCode: '',
    type: 0,
    subtype: ''
  };
  const optionsObject = { ...defaultOptions, ...options };

  // generate variables
  let questions: QnContainer, answers: AnswerContainer, variables: VariablesObject;
  if (optionsObject.qnCode) {
    // qnCode provided
    const [type, subtype, a, bNum, bDen] = <[number, string, ...number[]]>decode(optionsObject.qnCode)
    variables = { type, bNum, bDen, a, subtype };
    [variables, questions, answers] = variablesToQn(variables);
  } else {
    // generate qn type
    [variables, questions, answers] = variablesToQn(optionsObject.type, optionsObject.subtype);
  }
  const variablesArray = [variables.type, variables.subtype, variables.a, variables.bNum, variables.bDen];
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
  integral1: string,
  integral2: string,
}
interface AnswerContainer {
  ans1: string,
  ans2: string,
}

function variablesToQn(variables: VariablesObject | number, subtype1?: string): [VariablesObject, QnContainer, AnswerContainer] {
  // variables
  if (typeof variables === 'number') {
    const abArray = ['a', 'b'];
    const type = variables === 0 ? getRandomInt(1, 2) : variables;
    subtype1 = subtype1 === '' ? abArray[getRandomInt(0, 1)] : subtype1;
    const bArray = [[1,2], [3,2], [1,3], [2,3], [4,3], [5,3], [1,4], [3,4], [5,4], [7,4], [1,6], [5,6], [7,6]];
    const [bNum, bDen] = bArray[getRandomInt(0, 12)];
    const a = getRandomInt(1, 9);
    variables = { type, subtype: subtype1!, a, bNum, bDen };
  }
  const { type, subtype, a, bNum, bDen } = variables;
  const b = new Fraction(bNum, bDen);

  // question & answer
  const ax = new Term(a, 'x');
  const bPi = new Term(b, '\\pi');
  const sin2Integral = `\\int_0^{${bPi}} \\sin^2 ${ax} \\, \\mathrm{d}x`;
  const cos2Integral = `\\int_0^{${bPi}} \\cos^2 ${ax} \\, \\mathrm{d}x`;
  const sinCosIntegral = `\\int_0^{${bPi}} \\sin ${ax} \\cos ${ax} \\, \\mathrm{d}x`;
  const sign = subtype === 'a' ? '+' : '-';
  const squareIntegral = `\\int_0^{${bPi}} (\\sin ${ax} ${sign} \\cos ${ax})^2 \\, \\mathrm{d}x`;
  let integral1: string, integral2: string, ans1: string, ans2: string;
  if (type === 1) {
    integral1 = subtype === 'a' ? sin2Integral : cos2Integral;
    integral2 = subtype === 'a' ? cos2Integral : sin2Integral;
    const cos2Answer = `${integrateCosSquare({ a, limits: [0, b.times(180).valueOf()] })}`;
    const sin2Answer = `${integrateSinSquare({ a, limits: [0, b.times(180).valueOf()] })}`;
    ans1 = subtype === 'a' ? sin2Answer : cos2Answer;
    ans2 = subtype === 'a' ? cos2Answer : sin2Answer;
  } else { // type === 2
    integral1 = sinCosIntegral;
    integral2 = squareIntegral;
    const integralAns = integrateSinCos({ a, limits: [0, b.times(180).valueOf()] });
    ans1 = `${integralAns}`;
    ans2 = subtype === 'a' ? `${integralAns.multiply(2).add(bPi)}` : `${integralAns.multiply(-2).add(bPi)}`;
  }

  const questions = { integral1, integral2 };
  const answers = { ans1, ans2 }
  return [variables as VariablesObject, questions, answers];
}

export { qn0803 };

