import { getRandomInt } from 'math-edu';
//import { performance } from 'perf_hooks';

//import { ExpFn, PowerFn, bisection, simpsons, integrateByParts, encode, decode, getRandomInt, Expression } from 'math-edu-plus';
import { binomPdf, binomCdf, binomCdfRange } from '../../index';

/**
 * generate qn2401: binomial distribution
 * @param options `{qnCode: string}
 */
function qn2401(options?: { qnCode?: string, type?: number }): qnOutput {
  // options
  const defaultOptions = {
    qnCode: '',
    type: 0,
  };
  const optionsObject = { ...defaultOptions, ...options };

  // generate variables
  let questions: QnContainer, answers: AnswerContainer, variables: VariablesObjectC|VariablesObjectB;
  if (optionsObject.qnCode) {
    // qnCode provided
    const numbers = decode(optionsObject.qnCode);
    if (optionsObject.qnCode[0] === '3') {      
      variables = {
        type: numbers[0],
        p1: numbers[1],
        sign: numbers[2],
        k: numbers[3],
        p2: numbers[4],
      };
    } else { // qnCode[0] === '2'
      variables = {
        type: numbers[0],
        p1: numbers[1],
        sign: numbers[2],
        k: numbers[3],
      };
    }
    [variables, questions, answers] = variablesToQn(variables);
  } else {
    const type = optionsObject.type === 0 ? getRandomInt(2, 3) : optionsObject.type;
    const p1 = getRandomInt(16, 84);
    const mu = 10 * p1 / 100;
    const sigma = Math.sqrt(10 * p1 / 100 * (1 - p1 / 100));
    const kMin = Math.max(1, Math.ceil(mu - 3 * sigma) + 1);
    const kMax = Math.min(9, Math.floor(mu + 3 * sigma) - 1);
    const k = getRandomInt(kMin, kMax);
    const sign = getRandomInt(1,4)
    variables = type === 2 ? { type, p1, sign, k } : { type, p1, sign, k, p2: getRandomInt(16, 84) };
    [variables, questions, answers] = variablesToQn(variables);
  }
  const variablesArray = [variables.type, variables.p1, variables.sign, variables.k];
  if (variables.type === 3) {
    const variables1 = variables as VariablesObjectC;
    variablesArray.push(variables1.p2);
  }
  return {
    variables,
    qnCode: encode(...variablesArray),
    questions: questions,
    answers: answers,
  };
}

interface VariablesObjectB {
  type: number,
  p1: number,
  sign: number,
  k: number
}

interface VariablesObjectC extends VariablesObjectB{
  p2: number,
}
interface qnOutput {
  variables: VariablesObjectC|VariablesObjectB,
  qnCode: string,
  questions: QnContainer,
  answers: AnswerContainer
}
interface QnContainer {
  p1: string,
  p2: string,
  k: string,
  x1?: string,
  x2?: string
  y?: string
  y1: string,
  y2: string,
}
interface AnswerContainer {
  ansA: string,
  ansB: string,
  ansC: string,
}

function variablesToQn(variables: VariablesObjectB|VariablesObjectC): [VariablesObjectB|VariablesObjectC, QnContainer, AnswerContainer] {
  const { type, p1, sign, k } = variables;
  let p2 = 0; // dummy
  if (type === 3) {
    const variables1 = variables as VariablesObjectC;
    ({ p2 } = variables1);
  }
  // question
  const signs = ['at most', 'at least', 'less than', 'more than']
  let newK: number;
  if (sign < 3) {
    newK = k;
  } else {
    newK = sign === 3 ? k + 1 : k - 1;
  }
  let questions: QnContainer = {
    p1: `${p1}%`,
    p2: `${p2 / 100}%`,
    k: `${signs[sign - 1]} ${newK}`,
    y1: '',
    y2: '',
  };
  // answer
  const pY = sign % 2 === 1 ? binomCdf(10, p1/100, k) : 1 - binomCdf(10, p1/100, k - 1);
  let answers: AnswerContainer = {
    ansA: (pY).toPrecision(3)+'.',
    ansB: '',
    ansC: ''
  }
  if (type === 2) {
    const y = Math.round(1000 * pY);
    const y1 = Math.max(1, y - 5);
    const y2 = Math.min(999, y + 5);
    questions = { ...questions, y: y.toString(), y1: y1.toString(), y2: y2.toString() };
    answers = { ...answers, ansB: binomPdf(1000, pY, y).toPrecision(3) + '.', ansC: binomCdfRange(1000, pY, y1, y2 - 1).toPrecision(3) + '.' };
  } else { // type === 3
    const x1 = ((10 * p1) - 10);
    const x2 = ((10 * p1) + 20);
    const y1Pre = p2 / 10;
    const y1 = Number.isInteger(y1Pre) ? y1Pre - 1 : Math.floor(y1Pre);
    const y2 = (y1 + 3);
    questions = { ...questions, x1: x1.toString(), x2: x2.toString(), y1: y1.toString(), y2: y2.toString() };
    answers = { ...answers, ansB: binomCdfRange(1000, p1 / 100, x1, x2).toPrecision(3) + '.', ansC: binomCdfRange(1000, p2 / 10000, y1, y2 - 1).toPrecision(3) + '.' }
  }
  return [variables, questions, answers];
}

export { qn2401, encode };

// a: 0-4, b: 1-9, c: 0 or 5 representing the digits of the number 'a.bc';
function encodeOne(x:number): string {
  return x > 9 ? String.fromCharCode(x + 42) : x.toString();
}
function encode(...args: number[]): string {
  let str = '';
  args.forEach(e => {
    str += encodeOne(e);
  })
  return str;
}
function decodeOne(x: string): number {
  const c = x.charCodeAt(0);
  return c > 57 ? c - 42 : Number(x);
}
function decode(x: string): number[] {
  const numbers: number[] = [];
  for (const char of x) {
    numbers.push(decodeOne(char));
  }
  return numbers;
}
