import { getRandomInt, Fraction } from 'math-edu';
import { Polynomial } from '../../../../math-edu/src/index';
import { encode, decode } from '../../index'
//import { ExpFn, PowerFn, bisection, simpsons, integrateByParts, encode, decode, getRandomInt, Expression } from 'math-edu-plus';

interface VariablesObject {
  type: number,
  subtype: number,
  shift?: number,
  start?: number,
  k?: number
}


/**
 * generate qn0504: sigma notation
 * @param options `{qnCode: string, type: number, subtype: number}`
 */
function qn0504(options?: {qnCode?: string, type?: number, subtype?: number}): qnOutput {
  // options
  const defaultOptions = {
    qnCode: '',
    type: getRandomInt(1, 2),
    subtype: getRandomInt(1, 2)
  };
  const optionsObject = { ...defaultOptions, ...options };

  // generate variables
  let questions: QnContainer, answers: AnswerContainer, variables: VariablesObject;
  if (optionsObject.qnCode) {
    // qnCode provided
    const [type, subtype, shift, start, k] = <number[]>decode(optionsObject.qnCode);
    variables = { type, subtype, shift, start, k };
    [variables, questions, answers] = variablesToQn(variables);
  } else {
    // generate qn type
    [variables, questions, answers] = variablesToQn(optionsObject);
  }
  const variablesArray = [variables.type, variables.subtype, <number>variables.shift, <number>variables.start, <number>variables.k];
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
interface QnContainer{
  uN: string,
  difference: string,
  summation: string,
  newSummation: string
}
interface AnswerContainer{
  ansB: string,
  tendsToZero: string,
  sInf: string,
  ansD: string
}

function variablesToQn(variables: VariablesObject): [VariablesObject, QnContainer, AnswerContainer] {
  // variables
  if (variables['shift'] === undefined) {
    variables['shift'] = variables.subtype === 1 ? getRandomInt(0, 1) : getRandomInt(0, 2);
  }
  if (variables['start'] === undefined) {
    variables['start'] = getRandomInt(1, 3);
  }
  if (variables['k'] === undefined) {
    variables['k'] = getRandomInt(-2, Math.min(variables.start + variables.shift, 2), { avoid: [0] });
  }
  const { type, subtype, shift, start, k } = variables;
  
  // question
  const uN = type === 1 ? 'u_n = \\frac{1}{n}' : 'u_n = \\frac{1}{n^2}';
  // set up f(n)
  const n = new Polynomial([1], { initialDegree: 1, variableAtom: 'n' });
  const nPlus = new Polynomial([1, subtype], { variableAtom: 'n' });
  let startIndex = n.subtract(shift);
  let endIndex = nPlus.subtract(shift);
  let diffNum = type === 1 ? endIndex.subtract(startIndex) : endIndex.square().subtract(startIndex.square());
  let denOne = `${startIndex}`;
  denOne = denOne.length === 1 ? denOne : `( ${denOne} )`;
  denOne = type === 1 ? denOne : `${denOne}^2`
  let denTwo = `${endIndex}`;
  denTwo = denTwo.length === 1 ? denTwo : `( ${denTwo} )`;
  denTwo = type === 1 ? denTwo : `${denTwo}^2`
  const difference = `u_{ ${startIndex} } - u_{ ${endIndex} } = \\frac{ ${diffNum} }{ ${denOne} ${denTwo} }`;
  // summation
  const summation = `\\sum_{ n = ${start + shift} }^N \\frac{ ${diffNum} }{ ${denOne} ${denTwo} }`;
  // replacement
  startIndex = startIndex.add(k);
  endIndex = endIndex.add(k);
  diffNum = type === 1 ? endIndex.subtract(startIndex) : endIndex.square().subtract(startIndex.square());
  denOne = `${startIndex}`;
  denOne = denOne.length === 1 ? denOne : `( ${denOne} )`;
  denOne = type === 1 ? denOne : `${denOne}^2`
  denTwo = `${endIndex}`;
  denTwo = denTwo.length === 1 ? denTwo : `( ${denTwo} )`;
  denTwo = type === 1 ? denTwo : `${denTwo}^2`;
  const newSummation = `\\sum_{ n = ${start + shift - k } }^N \\frac{ ${diffNum} }{ ${denTwo} ${denOne} }`;
  
  const questions = {uN, difference, summation, newSummation};

  // answer
  const firstTerm = new Fraction(1, start).pow(type);
  const secondTerm = subtype === 1 ? 0 : new Fraction(1, start + 1).pow(type);
  const constant = firstTerm.plus(secondTerm);
  const N = new Polynomial([1], { initialDegree: 1, variableAtom: 'N' });
  let nEnd = N.add(subtype).subtract(shift);
  let ansDenOne = `${nEnd}`;
  ansDenOne = type === 1 || ansDenOne.length === 1 ? ansDenOne : `( ${ansDenOne} )`;
  ansDenOne = type === 1 ? ansDenOne : `${ansDenOne}^2`
  let nEnd2 = nEnd.subtract(1);
  let ansDenTwo = `${nEnd2}`;
  ansDenTwo = type === 1 || ansDenTwo.length === 1 ? ansDenTwo : `( ${ansDenTwo} )`;
  ansDenTwo = type === 1 ? ansDenTwo : `${ansDenTwo}^2`
  // part (ii)
  const ansB = subtype === 1 ? `${constant} - \\frac{1}{ ${ansDenOne} }` : `${constant} - \\frac{1}{ ${ansDenTwo} } - \\frac{1}{ ${ansDenOne} }`;
  // part (iii)
  const tendsToZero = subtype === 1 ? `\\frac{1}{ ${ansDenOne} } \\to 0` : `\\frac{1}{ ${ansDenTwo} }, \\frac{1}{ ${ansDenOne} } \\ to 0`;
  const sInf = `= ${constant}`;
  // part(iv)
  nEnd = N.add(subtype).subtract(shift).add(k);
  ansDenOne = `${nEnd}`;
  ansDenOne = type === 1 || ansDenOne.length === 1 ? ansDenOne : `( ${ansDenOne} )`;
  ansDenOne = type === 1 ? ansDenOne : `${ansDenOne}^2`
  nEnd2 = nEnd.subtract(1);
  ansDenTwo = `${nEnd2}`;
  ansDenTwo = type === 1 || ansDenTwo.length === 1 ? ansDenTwo : `( ${ansDenTwo} )`;
  ansDenTwo = type === 1 ? ansDenTwo : `${ansDenTwo}^2`
  const ansD = subtype === 1 ? `${constant} - \\frac{1}{ ${ansDenOne} }` : `${constant} - \\frac{1}{ ${ansDenTwo} } - \\frac{1}{ ${ansDenOne} }`;

  const answers = { ansB, tendsToZero, sInf, ansD}
  return [variables, questions, answers];
}

export { qn0504 };

