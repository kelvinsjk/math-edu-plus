import { getRandomInt } from 'math-edu';
//import { performance } from 'perf_hooks';

//import { ExpFn, PowerFn, bisection, simpsons, integrateByParts, encode, decode, getRandomInt, Expression } from 'math-edu-plus';
import { zTest, invNorm } from '../../index';

interface VariablesObject {
  type: number,
  tail: number,
  n: number,
  mu: number,
  alpha: number,
  xJiggle: number,
  p1: number,
  p2: number,
  p3: number,
  p4: number,
}


/**
 * generate qn2701: hypothesis testing
 * @param options `{qnCode: string}
 */
function qn2701(options?: { qnCode?: string, type?: number }): qnOutput {
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
    const numbers = decode(optionsObject.qnCode);
    variables = {
      type: numbers[0],
      tail: numbers[1],
      n: numbers[2],
      mu: numbers[3],
      alpha: numbers[4],
      xJiggle: numbers[5],
      p1: numbers[6],
      p2: numbers[7],
      p3: numbers[8],
      p4: numbers[9],
    };
    [variables, questions, answers] = variablesToQn(variables);
  } else {
    const type = optionsObject.type === 0 ? getRandomInt(1, 2) : optionsObject.type;
    const tail = getRandomInt(1, 4);
    const n = getRandomInt(0, 9);
    const mu = getRandomInt(1, 9);
    const alpha = getRandomInt(3, 7);
    const xJiggle = getRandomInt(16, 84);
    const p = getRandomInt(1000, 9999).toString();
    const p1 = Number(p[0]), p2 = Number(p[1]), p3 = Number(p[2]), p4 = Number(p[3]);
    variables = { type, tail, n, mu, alpha, xJiggle, p1, p2, p3, p4 };
    [variables, questions, answers] = variablesToQn(variables);
  }
  const variablesArray = [variables.type, variables.tail, variables.n, variables.mu, variables.alpha, variables.xJiggle, variables.p1, variables.p2, variables.p3, variables.p4];
  return {
    variables,
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
  n: string,
  sums: string,
  alpha: string,
  exceeds: string,
  sufficient?: string
}
interface AnswerContainer {
  ansA: string,
  ansBMath?: string,
  ansBText?: string,
  ansB?: string,
}

function variablesToQn(variables: VariablesObject): [VariablesObject, QnContainer, AnswerContainer] {
  const {type, tail, p1, p2, p3, p4, alpha} = variables;
  let { n, mu, xJiggle } = variables;
  n = n * 10 + 100;
  mu = mu * 5;
  xJiggle = xJiggle / 100;
  const p = (p1 * 1000 + p2 * 100 + p3 * 10 + p4)/100000;
  const xBar = (tail % 2 === 1) ? mu - xJiggle : mu + xJiggle;
  const sumX = Math.round(n * xBar);
  const zCrit = tail < 3 ? invNorm(p) : invNorm(p / 2);
  const s = Math.sqrt(n) * (xBar - mu) / zCrit;
  const sumX2 = Math.round(s * s * (n - 1) + n * xBar * xBar);

  const newXBar = sumX / n;
  
  const newS2 = (sumX2 - sumX * sumX / n) / (n - 1);
  const newS = Math.sqrt(newS2);

  const tails = ['left', 'right', 'two', 'two'];
  const pValue = zTest(mu, newS, newXBar, n, tails[tail - 1]);

  const exceedsKeywords = ['is less than', 'exceeds', 'is', 'is']

  const alphaValue = alpha / 100;
  const sign = pValue <= alphaValue ? "\\leq" : ">";
  const not = pValue <= alphaValue ? "" : "not "
  const sufficient = pValue <= alphaValue ? "sufficient" : "insufficient"
  const that = pValue <= alphaValue ? "that" : "whether";
  const conclusion = `to conclude ${that} the population mean time for a student to prepare for the test ${exceedsKeywords[tail - 1]} ${mu} hours.`

  const questions: QnContainer = {
    n: n.toString(),
    sums: `\\sum x = ${sumX}, \\quad \\sum x^2 = ${sumX2}.`,
    alpha: `${alpha}\%`, // eslint-disable-line
    exceeds: `${exceedsKeywords[tail - 1]} ${mu}`,
  }
  let answers: AnswerContainer;
  const xBarAns = newXBar.toString().length > 5 ? newXBar.toPrecision(3) : newXBar.toString()
  if (type === 1) {
    answers = {
      ansA: `\\overline{x} = ${xBarAns}, s^2 = ${newS2.toPrecision(3)}.`,
      ansBMath: `p-\\textrm{value} = ${pValue.toPrecision(3)} ${sign} ${alpha/100} \\quad \\Rightarrow \\quad H_0 \\textrm{ ${not}rejected}.`, // eslint-disable-line
      ansBText: `Hence there is ${sufficient} evidence at the ${alpha}\% level of significance ${conclusion}`, // eslint-disable-line
    }
  } else { // type === 2: unknown alpha
    questions['sufficient'] = `${sufficient}`
    const sign = pValue <= alphaValue ? "\\geq" : "<";
    answers = {
      ansA: `\\overline{x} = ${xBarAns}, s^2 = ${newS2.toPrecision(3)}.`,
      ansB: `\\alpha ${sign} ${(pValue*100).toPrecision(3)}`, 
    }
  }
  return [variables, questions, answers];
}

export { qn2701, encode };

// 0-9: encode as itself, else change to ascii
function encodeOne(x: number): string {
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
